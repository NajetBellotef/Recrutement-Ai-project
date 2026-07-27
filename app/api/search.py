from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.services.search_service import (
    search_candidates,
    search_jobs
)

from app.schemas.search import (
    CandidateSearchResponse,
    JobSearchResponse
)

router = APIRouter(
    prefix="/search",
    tags=["Search"]
)


@router.get(
    "/candidates",
    response_model=list[CandidateSearchResponse]
)
def candidates(
    skill: str,
    db: Session = Depends(get_db)
):

    return search_candidates(db, skill)


@router.get(
    "/jobs",
    response_model=list[JobSearchResponse]
)
def jobs(
    skill: str,
    db: Session = Depends(get_db)
):

    return search_jobs(db, skill)