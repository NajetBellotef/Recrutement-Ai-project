from fastapi import APIRouter
from app.schemas.auth import UserLogin, Token
from app.services.auth_service import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from app.services.auth_service import (
    authenticate_user,
    create_access_token
)

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_service import create_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post(
    "/register",
    response_model=UserResponse
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    print(">>> Endpoint register appelé")
    print(user)
    new_user = create_user(
        db=db,
        full_name=user.full_name,
        email=user.email,
        password=user.password
    )

    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="Cet email existe déjà."
        )

    return new_user
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = authenticate_user(
        db=db,
        email=form_data.username,
        password=form_data.password
    )

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="Email ou mot de passe incorrect."
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
from app.schemas.user import UserResponse

@router.get(
    "/me",
    response_model=UserResponse
)
def me(
    current_user=Depends(get_current_user)
):
    return current_user