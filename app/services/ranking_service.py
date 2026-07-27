from sqlalchemy.orm import Session

from app.models.match import Match
from app.models.cv import CV


def get_job_ranking(
    db: Session,
    job_id: int
):

    matches = (
        db.query(Match)
        .filter(Match.job_id == job_id)
        .order_by(Match.score.desc())
        .all()
    )

    results = []

    for match in matches:

        cv = db.query(CV).filter(
            CV.id == match.cv_id
        ).first()

        if not cv:
            continue

        results.append({
            "cv_id": cv.id,
            "candidate": cv.filename,
            "score": round(match.score, 2),
            "comment": match.comment
        })

    return results