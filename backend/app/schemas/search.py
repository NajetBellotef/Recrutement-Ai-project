from pydantic import BaseModel


class CandidateSearchResponse(BaseModel):

    id: int

    filename: str

    user_id: int

    full_name: str

    email: str

    phone: str | None = None

    city: str | None = None

    country: str | None = None

    profile_image: str | None = None


class JobSearchResponse(BaseModel):

    id: int

    title: str

    company: str