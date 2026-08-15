from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.services.dashboard_service import get_dashboard_stats

from app.schemas.dashboard import DashboardStats


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/stats",
    response_model=DashboardStats
)
def stats(
    db: Session = Depends(get_db)
):

    return get_dashboard_stats(db)