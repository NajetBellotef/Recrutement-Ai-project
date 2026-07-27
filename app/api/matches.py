from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.schemas.match import MatchResponse

from app.services.match_service import (
    get_matches,
    get_match,
    get_matches_by_cv,
    get_matches_by_job,
    delete_match
)

router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)


# ==========================
# Tous les matchings
# ==========================
@router.get(
    "/",
    response_model=list[MatchResponse]
)
def read_all(
    db: Session = Depends(get_db)
):

    return get_matches(db)


# ==========================
# Un matching
# ==========================
@router.get(
    "/{match_id}",
    response_model=MatchResponse
)
def read_one(
    match_id: int,
    db: Session = Depends(get_db)
):

    match = get_match(
        db,
        match_id
    )

    if not match:
        raise HTTPException(
            status_code=404,
            detail="Matching introuvable."
        )

    return match


# ==========================
# Matchings d'un CV
# ==========================
@router.get(
    "/cv/{cv_id}",
    response_model=list[MatchResponse]
)
def read_cv_matches(
    cv_id: int,
    db: Session = Depends(get_db)
):

    return get_matches_by_cv(
        db,
        cv_id
    )


# ==========================
# Matchings d'une offre
# ==========================
@router.get(
    "/job/{job_id}",
    response_model=list[MatchResponse]
)
def read_job_matches(
    job_id: int,
    db: Session = Depends(get_db)
):

    return get_matches_by_job(
        db,
        job_id
    )


# ==========================
# Supprimer
# ==========================
@router.delete("/{match_id}")
def delete(
    match_id: int,
    db: Session = Depends(get_db)
):

    ok = delete_match(
        db,
        match_id
    )

    if not ok:
        raise HTTPException(
            status_code=404,
            detail="Matching introuvable."
        )

    return {
        "message": "Matching supprimé."
    }