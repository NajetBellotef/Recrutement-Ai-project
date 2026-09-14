from pydantic import BaseModel, Field
from typing import List


# ==========================================
# REQUÊTE TEXTE
# ==========================================

class TextRequest(BaseModel):
    text: str = Field(
        ...,
        description="Texte à analyser"
    )


# ==========================================
# RÉPONSE ANALYSE
# ==========================================

class AnalysisResponse(BaseModel):
    analysis: str


# ==========================================
# RÉPONSE COMPÉTENCES
# ==========================================

class SkillsResponse(BaseModel):
    skills: List[str]


# ==========================================
# RÉPONSE EMBEDDING
# ==========================================

class EmbeddingResponse(BaseModel):
    embedding: List[float]