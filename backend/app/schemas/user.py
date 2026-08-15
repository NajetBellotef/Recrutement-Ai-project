from pydantic import BaseModel, EmailStr

#représente les données envoyées par React lors de l'inscription
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

#représente les données que FastAPI renverra après la création du compte
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool

    class Config:
        from_attributes = True