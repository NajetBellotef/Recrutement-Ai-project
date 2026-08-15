from pydantic import BaseModel


class DashboardStats(BaseModel):
    users: int
    cvs: int
    jobs: int
    matches: int

    average_score: float
    best_match: float

    top_skill: str