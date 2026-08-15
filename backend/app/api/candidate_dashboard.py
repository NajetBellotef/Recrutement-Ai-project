from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.user import User
from app.schemas.candidate_dashboard import CandidateDashboardStats
from app.services.auth_service import get_current_user
from app.services.candidate_dashboard_service import (
    get_candidate_dashboard_stats
)

router = APIRouter(
    prefix="/candidate/dashboard",
    tags=["Candidate Dashboard"]
)


@router.get(
    "/stats",
    response_model=CandidateDashboardStats
)
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_candidate_dashboard_stats(
        db=db,
        user_id=current_user.id
    )