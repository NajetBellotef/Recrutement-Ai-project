from pydantic import BaseModel
from datetime import datetime


class MatchCreate(BaseModel):
    cv_id: int
    job_id: int
    score: float


class MatchResponse(BaseModel):
    id: int
    cv_id: int
    job_id: int
    score: float
    created_at: datetime

    class Config:
        from_attributes = True