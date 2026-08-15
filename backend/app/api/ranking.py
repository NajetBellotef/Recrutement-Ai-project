from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.ranking import RankingResponse

from app.services.ranking_service import get_job_ranking

router = APIRouter(
    prefix="/jobs",
    tags=["Ranking"]
)


@router.get(
    "/{job_id}/ranking",
    response_model=list[RankingResponse]
)
def ranking(
    job_id: int,
    db: Session = Depends(get_db)
):

    return get_job_ranking(
        db,
        job_id
    )