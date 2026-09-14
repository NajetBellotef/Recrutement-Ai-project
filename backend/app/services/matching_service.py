import json
from sqlalchemy.orm import Session

from app.models.cv import CV
from app.models.job import Job
from app.models.match import Match

from app.services.match_service import create_match
from app.services.ai_service import calculate_matching


def match_cv_with_jobs(db: Session, cv_id: int):

    print("\n==============================")
    print("===== MATCHING LANCE =====")
    print("CV ID :", cv_id)
    print("==============================")

    # ==========================================
    # RÉCUPÉRER LE CV
    # ==========================================

    cv = db.query(CV).filter(CV.id == cv_id).first()

    if not cv:
        print("❌ CV introuvable")
        return None

    print("✅ CV trouvé :", cv.filename)

    if not cv.embedding:
        print("❌ Aucun embedding pour le CV")
        return []

    print("✅ Embedding CV trouvé")

    cv_embedding = json.loads(cv.embedding)

    # ==========================================
    # SUPPRIMER LES ANCIENS MATCHINGS
    # ==========================================

    db.query(Match).filter(
        Match.cv_id == cv_id
    ).delete()

    db.commit()

    print("✅ Anciens matchings supprimés")

    # ==========================================
    # RÉCUPÉRER LES OFFRES
    # ==========================================

    jobs = db.query(Job).all()

    print("📋 Nombre d'offres :", len(jobs))

    results = []

    # ==========================================
    # MATCHING AVEC AI SERVICE
    # ==========================================

    for job in jobs:

        print("--------------------------------")
        print("Offre :", job.title)

        if not job.embedding:
            print("❌ Pas d'embedding pour cette offre")
            continue

        print("✅ Embedding offre trouvé")

        job_embedding = json.loads(job.embedding)

        # ======================================
        # DONNÉES ENVOYÉES AU AI SERVICE
        # ======================================

        data = {
            "cv_embedding": cv_embedding,
            "job_embedding": job_embedding,
            "cv_skills": cv.skills or "[]",
            "job_skills": job.skills or "[]",
            "cv_analysis": cv.analysis or "",
            "job_analysis": job.analysis or "",
            "job_title": job.title
        }

        try:

            ai_result = calculate_matching(data)

            print("✅ Résultat reçu du AI Service")

            score_percent = ai_result["score"]
            embedding_score = ai_result["embedding_score"]
            skills_score = ai_result["skills_score"]
            common_skills = ai_result["common_skills"]
            missing_skills = ai_result["missing_skills"]
            comment = ai_result["comment"]

            print(
                "Embedding Score :",
                embedding_score
            )

            print(
                "Skills Score :",
                skills_score
            )

            print(
                "Score final :",
                score_percent
            )

            # ==================================
            # ENREGISTRER LE MATCH
            # ==================================

            create_match(
                db=db,
                cv_id=cv.id,
                job_id=job.id,
                score=score_percent,
                embedding_score=embedding_score,
                skills_score=skills_score,
                common_skills=common_skills,
                missing_skills=missing_skills,
                comment=comment
            )

            print("✅ Matching enregistré")

            # ==================================
            # RÉSULTAT
            # ==================================

            results.append({
                "job_id": job.id,
                "title": job.title,
                "company": job.company,
                "score": score_percent,
                "embedding_score": embedding_score,
                "skills_score": skills_score,
                "common_skills": common_skills,
                "missing_skills": missing_skills,
                "comment": comment
            })

        except Exception as e:

            print(
                "❌ Erreur AI Service pour l'offre",
                job.title,
                ":",
                e
            )

            continue

    # ==========================================
    # TRI PAR SCORE
    # ==========================================

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    print("==============================")
    print(
        "Nombre de matchings créés :",
        len(results)
    )
    print("==============================")

    return results