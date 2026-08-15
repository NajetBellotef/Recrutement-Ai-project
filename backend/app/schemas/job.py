from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ==========================
# Création d'une offre
# ==========================
class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    required_skills: str


# ==========================
# Modification d'une offre
# ==========================
class JobUpdate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    required_skills: str


# ==========================
# Réponse API
# ==========================
class JobResponse(BaseModel):

    id: int

    title: str

    company: str

    location: str

    description: str

    required_skills: str

    analysis: Optional[str] = None

    created_at: datetime

    class Config:
        from_attributes = True