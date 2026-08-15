from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ==========================
# Réponse après upload d'un CV
# ==========================
class CVResponse(BaseModel):
    id: int
    filename: str
    file_path: str
    extracted_text: Optional[str] = None
    analysis: Optional[str] = None
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True