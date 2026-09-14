from pydantic import BaseModel, Field
from typing import List


# ==========================================
# DONNÉES ENVOYÉES PAR LE BACKEND
# ==========================================

class MatchingRequest(BaseModel):
    """
    Données nécessaires au calcul du matching.
    """

    cv_embedding: List[float] = Field(
        ...,
        description="Embedding du CV"
    )

    job_embedding: List[float] = Field(
        ...,
        description="Embedding de l'offre"
    )

    cv_skills: str = Field(
        default="[]",
        description="Compétences du CV au format JSON"
    )

    job_skills: str = Field(
        default="[]",
        description="Compétences de l'offre au format JSON"
    )

    cv_analysis: str = Field(
        default="",
        description="Analyse IA du CV"
    )

    job_analysis: str = Field(
        default="",
        description="Analyse IA de l'offre"
    )

    job_title: str = Field(
        ...,
        description="Titre de l'offre"
    )


# ==========================================
# RÉSULTAT DU MATCHING
# ==========================================

class MatchingResponse(BaseModel):
    """
    Résultat retourné par le service IA.
    """

    score: float = Field(
        ...,
        description="Score final du matching"
    )

    embedding_score: float = Field(
        ...,
        description="Score de similarité des embeddings"
    )

    skills_score: float = Field(
        ...,
        description="Score de correspondance des compétences"
    )

    common_skills: List[str] = Field(
        default_factory=list,
        description="Compétences communes"
    )

    missing_skills: List[str] = Field(
        default_factory=list,
        description="Compétences manquantes"
    )

    comment: str = Field(
        default="",
        description="Explication générée par Gemini"
    )