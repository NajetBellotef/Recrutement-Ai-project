from fastapi import APIRouter, HTTPException

from app.schemas.matching import (
    MatchingRequest,
    MatchingResponse
)

from app.services.matching_service import (
    calculate_matching
)


# ==========================================
# ROUTER
# ==========================================

router = APIRouter(
    prefix="/matching",
    tags=["AI Matching"]
)


# ==========================================
# ENDPOINT MATCHING
# ==========================================

@router.post(
    "",
    response_model=MatchingResponse
)
def matching(request: MatchingRequest):

    try:

        result = calculate_matching(
            cv_embedding=request.cv_embedding,
            job_embedding=request.job_embedding,
            cv_skills=request.cv_skills,
            job_skills=request.job_skills,
            cv_analysis=request.cv_analysis,
            job_analysis=request.job_analysis,
            job_title=request.job_title
        )

        if result is None:
            raise HTTPException(
                status_code=400,
                detail="Impossible de calculer le matching."
            )

        return result

    except HTTPException:
        raise

    except Exception as e:

        print("Erreur API Matching :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur interne du service IA."
        )