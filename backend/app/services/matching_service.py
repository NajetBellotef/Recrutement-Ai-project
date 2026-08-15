import json

from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session

from app.models.cv import CV
from app.models.job import Job
from app.models.match import Match

from app.services.match_service import create_match
from app.services.gemini_service import explain_match
from app.services.skills_service import skills_similarity


def match_cv_with_jobs(
    db: Session,
    cv_id: int
):
    print("\n==============================")
    print("===== MATCHING LANCE =====")
    print("CV ID :", cv_id)
    print("==============================")

    # ==========================
    # Récupération du CV
    # ==========================
    cv = db.query(CV).filter(
        CV.id == cv_id
    ).first()

    if not cv:
        print("❌ CV introuvable")
        return None

    print("✅ CV trouvé :", cv.filename)

    if not cv.embedding:
        print("❌ Aucun embedding pour le CV")
        return []

    print("✅ Embedding CV trouvé")

    cv_embedding = json.loads(cv.embedding)

    # ==========================
    # Supprimer les anciens matchings
    # ==========================
    db.query(Match).filter(
        Match.cv_id == cv_id
    ).delete()

    db.commit()

    print("✅ Anciens matchings supprimés")

    jobs = db.query(Job).all()

    print("📋 Nombre d'offres :", len(jobs))

    results = []

    # ==========================
    # Matching avec chaque offre
    # ==========================
    for job in jobs:

        print("--------------------------------")
        print("Offre :", job.title)

        if not job.embedding:
            print("❌ Pas d'embedding pour cette offre")
            continue

        print("✅ Embedding offre trouvé")

        job_embedding = json.loads(job.embedding)

        # -------------------------
        # Similarité des embeddings
        # -------------------------
        embedding_score = cosine_similarity(
            [cv_embedding],
            [job_embedding]
        )[0][0] * 100

        print("Embedding Score :", round(float(embedding_score), 2))

        # -------------------------
        # Similarité des compétences
        # -------------------------
        skills_score, common_skills, required_skills = skills_similarity(
            cv.skills,
            job.skills
        )

        print("Skills Score :", round(float(skills_score), 2))

        # -------------------------
        # Score final
        # -------------------------
        score = (
            embedding_score * 0.7
            +
            skills_score * 0.3
        )

        score_percent = round(float(score), 2)

        print("Score final :", score_percent)

        # -------------------------
        # Compétences manquantes
        # -------------------------
        missing_skills = list(
            set(required_skills) - set(common_skills)
        )

        # -------------------------
        # Analyse IA
        # -------------------------
        ai_comment = explain_match(
            cv_analysis=cv.analysis,
            job_analysis=job.analysis,
            job_title=job.title,
            embedding_score=round(float(embedding_score), 2),
            skills_score=round(float(skills_score), 2),
            common_skills=common_skills,
            missing_skills=missing_skills
        )

        comment = ai_comment

        # -------------------------
        # Sauvegarde en base
        # -------------------------
        create_match(
            db=db,
            cv_id=cv.id,
            job_id=job.id,
            score=score_percent,
            embedding_score=round(float(embedding_score), 2),
            skills_score=round(float(skills_score), 2),
            common_skills=common_skills,
            missing_skills=missing_skills,
            comment=comment
        )

        print("✅ Matching enregistré")

        # -------------------------
        # Résultat API
        # -------------------------
        results.append({
            "job_id": job.id,
            "title": job.title,
            "company": job.company,
            "score": score_percent,
            "embedding_score": round(float(embedding_score), 2),
            "skills_score": round(float(skills_score), 2),
            "common_skills": common_skills,
            "missing_skills": missing_skills,
            "comment": comment
        })

    print("==============================")
    print("Nombre de matchings créés :", len(results))
    print("==============================")

    # ==========================
    # Trier par score décroissant
    # ==========================
    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results