from sqlalchemy.orm import Session

from app.models.cv import CV
from app.models.match import Match


def get_candidate_dashboard_stats(db: Session, user_id: int):

    cvs = db.query(CV).filter(
        CV.user_id == user_id
    ).all()

    if not cvs:
        return {
            "matching_score": 0,
            "ranking": 0,
            "cv_uploaded": False,
            "applications": 0
        }

    cv_ids = [cv.id for cv in cvs]

    matches = db.query(Match).filter(
        Match.cv_id.in_(cv_ids)
    ).all()

    applications = len(matches)

    if matches:
        matching_score = round(
            max(match.score for match in matches),
            2
        )
    else:
        matching_score = 0

    return {
        "matching_score": matching_score,
        "ranking": 0,
        "cv_uploaded": True,
        "applications": applications
    }