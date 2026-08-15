from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# ==========================
# Consulter un profil
# ==========================

@router.get("/{user_id}")
def get_user_profile(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Utilisateur introuvable."
        )

    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "city": user.city,
        "country": user.country,
        "profile_image": user.profile_image,

        "cvs": [
            {
                "id": cv.id,
                "filename": cv.filename,
                "file_path": cv.file_path,
                "skills": cv.skills,
                "analysis": cv.analysis
            }
            for cv in user.cvs
        ]
    }