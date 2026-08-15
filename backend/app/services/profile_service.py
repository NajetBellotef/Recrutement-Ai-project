from sqlalchemy.orm import Session

from app.models.user import User
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.services.auth_service import (
    verify_password,
    hash_password
)

def get_profile(
    db: Session,
    user_id: int
):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )
def update_profile(
    db: Session,
    user: User,
    full_name: str,
    phone: str,
    city: str,
    country: str
):

    user.full_name = full_name
    user.phone = phone
    user.city = city
    user.country = country

    db.commit()
    db.refresh(user)

    return user

def change_password(
    db: Session,
    user: User,
    current_password: str,
    new_password: str
):

    if not verify_password(
        current_password,
        user.password
    ):
        raise HTTPException(
            status_code=400,
            detail="Mot de passe actuel incorrect."
        )

    user.password = hash_password(new_password)

    db.commit()

    return {
        "message": "Mot de passe modifié avec succès."
    }

def update_profile_image(
    db: Session,
    user: User,
    image_path: str
):

    user.profile_image = image_path

    db.commit()
    db.refresh(user)

    return user