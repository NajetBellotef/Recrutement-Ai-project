import json

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.cv import CV
from app.models.job import Job
from app.models.match import Match


def get_dashboard_stats(
    db: Session,
    recruiter_id: int
):

    # --------------------------
    # Utilisateurs
    # --------------------------

    users = db.query(User).count()

    # --------------------------
    # CV
    # --------------------------

    cvs = db.query(CV).count()

    # --------------------------
    # Offres du recruteur
    # --------------------------

    jobs = db.query(Job).filter(
        Job.recruiter_id == recruiter_id
    ).count()

    # --------------------------
    # Matchings du recruteur
    # --------------------------

    matches = (
        db.query(Match)
        .join(
            Job,
            Match.job_id == Job.id
        )
        .filter(
            Job.recruiter_id == recruiter_id
        )
        .all()
    )

    # --------------------------
    # Score moyen
    # --------------------------

    if matches:

        average_score = round(
            sum(m.score for m in matches) / len(matches),
            2
        )

        best_match = round(
            max(m.score for m in matches),
            2
        )

    else:

        average_score = 0
        best_match = 0

    # --------------------------
    # Compétence la plus fréquente
    # --------------------------

    skills_counter = {}

    all_cvs = db.query(CV).all()

    for cv in all_cvs:

        if not cv.skills:
            continue

        try:

            skills = json.loads(cv.skills)

            for skill in skills:

                skills_counter[skill] = (
                    skills_counter.get(skill, 0) + 1
                )

        except Exception:

            continue

    if skills_counter:

        top_skill = max(
            skills_counter,
            key=skills_counter.get
        )

    else:

        top_skill = "Aucune"

    return {

        "users": users,

        "cvs": cvs,

        "jobs": jobs,

        "matches": len(matches),

        "average_score": average_score,

        "best_match": best_match,

        "top_skill": top_skill

    }