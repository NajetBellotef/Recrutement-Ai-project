from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.dependencies import get_db

from app.schemas.candidate_matching import CandidateMatchingResponse

from app.services.candidate_matching_service import (
    get_candidate_matches
)

from app.services.auth_service import get_current_user

router = APIRouter(
    prefix="/candidate",
    tags=["Candidate Matching"]
)


@router.get(
    "/matching",
    response_model=List[CandidateMatchingResponse]
)
def candidate_matching(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return get_candidate_matches(
        db,
        current_user.id
    )