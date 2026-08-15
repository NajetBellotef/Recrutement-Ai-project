from sqlalchemy.orm import Session

from app.models.cv import CV
from app.models.match import Match
from app.models.job import Job


def get_candidate_matches(
    db: Session,
    user_id: int
):

    cvs = db.query(CV).filter(
        CV.user_id == user_id
    ).all()

    if not cvs:
        return []

    cv_ids = [cv.id for cv in cvs]

    matches = (
        db.query(Match, Job)
        .join(Job, Match.job_id == Job.id)
        .filter(Match.cv_id.in_(cv_ids))
        .order_by(Match.score.desc())
        .all()
    )

    results = []

    for match, job in matches:

        results.append({

            "match_id": match.id,

            "job_id": job.id,

            "title": job.title,

            "company": job.company,

            "location": job.location,

            "score": match.score,

            "embedding_score": match.embedding_score,

            "skills_score": match.skills_score,

            "common_skills": match.common_skills,

            "missing_skills": match.missing_skills,

            "comment": match.comment

        })

    return results