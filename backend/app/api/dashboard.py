from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.services.dashboard_service import get_dashboard_stats

from app.schemas.dashboard import DashboardStats

from app.services.auth_service import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/stats",
    response_model=DashboardStats
)
def stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Accès réservé aux recruteurs."
        )

    return get_dashboard_stats(
        db,
        current_user.id
    )