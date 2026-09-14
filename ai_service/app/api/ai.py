from fastapi import APIRouter, HTTPException

from app.schemas.ai import (
    TextRequest,
    AnalysisResponse,
    SkillsResponse,
    EmbeddingResponse
)

from app.services.gemini_service import (
    analyze_cv,
    analyze_job
)

from app.services.skill_extractor import (
    extract_skills
)

from app.services.embedding_service import (
    generate_embedding
)


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# ==========================================
# ANALYSE CV
# ==========================================

@router.post(
    "/analyze-cv",
    response_model=AnalysisResponse
)
def analyze_cv_endpoint(request: TextRequest):

    try:

        analysis = analyze_cv(request.text)

        return {
            "analysis": analysis
        }

    except Exception as e:

        print("Erreur analyse CV :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de l'analyse du CV."
        )


# ==========================================
# ANALYSE OFFRE
# ==========================================

@router.post(
    "/analyze-job",
    response_model=AnalysisResponse
)
def analyze_job_endpoint(request: TextRequest):

    try:

        analysis = analyze_job(request.text)

        return {
            "analysis": analysis
        }

    except Exception as e:

        print("Erreur analyse offre :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de l'analyse de l'offre."
        )


# ==========================================
# EXTRACTION COMPÉTENCES CV
# ==========================================

@router.post(
    "/extract-cv-skills",
    response_model=SkillsResponse
)
def extract_cv_skills_endpoint(request: TextRequest):

    try:

        skills = extract_skills(request.text)

        return {
            "skills": skills
        }

    except Exception as e:

        print("Erreur extraction compétences CV :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de l'extraction des compétences."
        )


# ==========================================
# EXTRACTION COMPÉTENCES OFFRE
# ==========================================

@router.post(
    "/extract-job-skills",
    response_model=SkillsResponse
)
def extract_job_skills_endpoint(request: TextRequest):

    try:

        skills = extract_skills(request.text)

        return {
            "skills": skills
        }

    except Exception as e:

        print("Erreur extraction compétences offre :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de l'extraction des compétences."
        )


# ==========================================
# GÉNÉRATION EMBEDDING
# ==========================================

@router.post(
    "/embedding",
    response_model=EmbeddingResponse
)
def embedding_endpoint(request: TextRequest):

    try:

        embedding = generate_embedding(request.text)

        return {
            "embedding": embedding
        }

    except Exception as e:

        print("Erreur génération embedding :", e)

        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la génération de l'embedding."
        )