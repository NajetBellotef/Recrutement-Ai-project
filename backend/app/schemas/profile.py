from pydantic import BaseModel, EmailStr


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    phone: str | None = None
    city: str | None = None
    country: str | None = None
    profile_image: str | None = None

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    full_name: str
    phone: str | None = None
    city: str | None = None
    country: str | None = None


class ChangePassword(BaseModel):
    current_password: str
    new_password: str