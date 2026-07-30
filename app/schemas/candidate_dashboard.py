from pydantic import BaseModel


class CandidateDashboardStats(BaseModel):
    matching_score: float
    ranking: int
    cv_uploaded: bool
    applications: int