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
    # ==========================
    # Récupération du CV
    # ==========================
    cv = db.query(CV).filter(
        CV.id == cv_id
    ).first()

    if not cv:
        return None

    if not cv.embedding:
        return []

    cv_embedding = json.loads(cv.embedding)

    # ==========================
    # Supprimer les anciens matchings
    # ==========================
    db.query(Match).filter(
        Match.cv_id == cv_id
    ).delete()

    db.commit()

    jobs = db.query(Job).all()

    results = []

    # ==========================
    # Matching avec chaque offre
    # ==========================
    for job in jobs:

        if not job.embedding:
            continue

        job_embedding = json.loads(job.embedding)

        # -------------------------
        # Similarité des embeddings
        # -------------------------
        embedding_score = cosine_similarity(
            [cv_embedding],
            [job_embedding]
        )[0][0] * 100

        # -------------------------
        # Similarité des compétences
        # -------------------------
        skills_score, common_skills, required_skills = skills_similarity(
            cv.skills,
            job.skills
        )

        # -------------------------
        # Score final
        # -------------------------
        score = (
            embedding_score * 0.7
            +
            skills_score * 0.3
        )

        score_percent = round(float(score), 2)

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

        # Le commentaire contient uniquement l'analyse IA.
        # Les scores et compétences sont affichés ailleurs
        # dans le rapport PDF.
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

    # ==========================
    # Trier par score décroissant
    # ==========================
    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results