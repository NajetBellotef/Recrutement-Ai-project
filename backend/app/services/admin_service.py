from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.services.auth_service import (
    hash_password,
    verify_password
)

# ==========================
# Dashboard
# ==========================

def get_dashboard_stats(db: Session):

    return {

        "total_users":
            db.query(User).count(),

        "total_candidates":
            db.query(User)
            .filter(User.role == "candidate")
            .count(),

        "total_recruiters":
            db.query(User)
            .filter(User.role == "recruiter")
            .count(),

        "total_admins":
            db.query(User)
            .filter(User.role == "admin")
            .count()

    }


# ==========================
# Tous les utilisateurs
# ==========================

def get_users(db: Session):

    return (

        db.query(User)

        .order_by(User.created_at.desc())

        .all()

    )


# ==========================
# Créer un recruteur
# ==========================

def create_recruiter(

    db: Session,

    full_name: str,

    email: str,

    password: str

):

    existing = (

        db.query(User)

        .filter(User.email == email)

        .first()

    )

    if existing:

        return None

    recruiter = User(

        full_name=full_name,

        email=email,

        password=hash_password(password),

        role="recruiter",

        is_active=True

    )

    db.add(recruiter)

    db.commit()

    db.refresh(recruiter)

    return recruiter


# ==========================
# Supprimer utilisateur
# ==========================

def delete_user(

    db: Session,

    user_id: int

):

    user = (

        db.query(User)

        .filter(User.id == user_id)

        .first()

    )

    if not user:

        return False

    db.delete(user)

    db.commit()

    return True
# =========================================================
# MODIFIER LE PROFIL ADMIN
# =========================================================

def update_admin_profile(
    db: Session,
    admin: User,
    full_name: str | None = None,
    email: str | None = None
):

    # -----------------------------------------
    # Nom
    # -----------------------------------------

    if full_name is not None:

        full_name = full_name.strip()

        if full_name:

            admin.full_name = full_name


    # -----------------------------------------
    # Email
    # -----------------------------------------

    if email is not None:

        email = email.strip().lower()


        existing_user = (
            db.query(User)
            .filter(
                User.email == email,
                User.id != admin.id
            )
            .first()
        )


        if existing_user:

            raise HTTPException(
                status_code=400,
                detail="Cet email est déjà utilisé."
            )


        admin.email = email


    # -----------------------------------------
    # Sauvegarde
    # -----------------------------------------

    try:

        db.commit()

        db.refresh(admin)

        return admin

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la mise à jour du profil."
        )


# =========================================================
# MODIFIER LE MOT DE PASSE
# =========================================================

def update_admin_password(
    db: Session,
    admin: User,
    current_password: str,
    new_password: str
):

    # -----------------------------------------
    # Vérifier ancien mot de passe
    # -----------------------------------------

    if not verify_password(
        current_password,
        admin.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Le mot de passe actuel est incorrect."
        )


    # -----------------------------------------
    # Vérifier nouveau mot de passe
    # -----------------------------------------

    if len(new_password) < 8:

        raise HTTPException(
            status_code=400,
            detail="Le nouveau mot de passe doit contenir au moins 8 caractères."
        )


    # -----------------------------------------
    # Hasher le nouveau mot de passe
    # -----------------------------------------

    admin.password = hash_password(
        new_password
    )


    # -----------------------------------------
    # Sauvegarder
    # -----------------------------------------

    try:

        db.commit()

        db.refresh(admin)

        return {
            "message": "Mot de passe modifié avec succès."
        }

    except Exception:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la modification du mot de passe."
        )