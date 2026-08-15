from sqlalchemy.orm import Session

from app.models.match import Match
from app.models.cv import CV
from app.models.user import User


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

        # ==========================
        # Récupérer le CV
        # ==========================

        cv = (
            db.query(CV)
            .filter(CV.id == match.cv_id)
            .first()
        )

        if not cv:
            continue


        # ==========================
        # Récupérer le candidat
        # ==========================

        user = (
            db.query(User)
            .filter(User.id == cv.user_id)
            .first()
        )

        if not user:
            continue


        # ==========================
        # Résultat
        # ==========================

        results.append({

            "cv_id": cv.id,

            "user_id": user.id,

            "candidate": user.full_name,

            "email": user.email,

            "profile_image": user.profile_image,

            "filename": cv.filename,

            "file_path": cv.file_path,

            "score": round(match.score, 2),

            "comment": match.comment,

            "match_id": match.id,

        })

    return results