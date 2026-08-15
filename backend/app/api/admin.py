from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.user import User

from app.schemas.admin import (
    RecruiterCreate,
    UserResponse,
    DashboardStats,
    AdminProfileUpdate,
    AdminPasswordUpdate
)

from app.services.admin_service import (
    get_dashboard_stats,
    get_users,
    create_recruiter,
    delete_user,
    update_admin_profile,
    update_admin_password
)

from app.services.auth_service import get_current_admin


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# =========================================================
# DASHBOARD
# =========================================================

@router.get(
    "/dashboard",
    response_model=DashboardStats
)
def dashboard(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    return get_dashboard_stats(db)


# =========================================================
# TOUS LES UTILISATEURS
# =========================================================

@router.get(
    "/users",
    response_model=list[UserResponse]
)
def users(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    return get_users(db)


# =========================================================
# CRÉER UN RECRUTEUR
# =========================================================

@router.post(
    "/recruiters",
    response_model=UserResponse
)
def recruiter(
    data: RecruiterCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    user = create_recruiter(

        db=db,

        full_name=data.full_name,

        email=data.email,

        password=data.password

    )

    if user is None:

        raise HTTPException(
            status_code=400,
            detail="Cet email existe déjà."
        )

    return user


# =========================================================
# SUPPRIMER UN UTILISATEUR
# =========================================================

@router.delete(
    "/users/{user_id}"
)
def delete(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    # -----------------------------------------
    # Empêcher l'admin de supprimer son propre
    # compte
    # -----------------------------------------

    if user_id == current_admin.id:

        raise HTTPException(
            status_code=400,
            detail="Vous ne pouvez pas supprimer votre propre compte administrateur."
        )


    ok = delete_user(
        db,
        user_id
    )


    if not ok:

        raise HTTPException(
            status_code=404,
            detail="Utilisateur introuvable."
        )


    return {
        "message": "Utilisateur supprimé."
    }


# =========================================================
# MODIFIER LE PROFIL ADMIN
# =========================================================

@router.put(
    "/settings/profile"
)
def update_profile(
    data: AdminProfileUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    admin = update_admin_profile(

        db=db,

        admin=current_admin,

        full_name=data.full_name,

        email=data.email

    )


    return {
        "message": "Profil modifié avec succès.",

        "user": {
            "id": admin.id,
            "full_name": admin.full_name,
            "email": admin.email,
            "role": admin.role,
            "is_active": admin.is_active
        }
    }


# =========================================================
# MODIFIER LE MOT DE PASSE ADMIN
# =========================================================

@router.put(
    "/settings/password"
)
def update_password(
    data: AdminPasswordUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    result = update_admin_password(

        db=db,

        admin=current_admin,

        current_password=data.current_password,

        new_password=data.new_password

    )

    return result