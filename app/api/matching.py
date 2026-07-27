from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.matching_service import match_cv_with_jobs

router = APIRouter(
    prefix="/matching",
    tags=["Matching"]
)


@router.get("/{cv_id}")
def match(
    cv_id: int,
    db: Session = Depends(get_db)
):

    results = match_cv_with_jobs(db, cv_id)

    if results is None:
        raise HTTPException(
            status_code=404,
            detail="CV introuvable."
        )

    return results