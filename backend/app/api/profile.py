from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException
)

from sqlalchemy.orm import Session
import os
import uuid

from app.database.dependencies import get_db
from app.services.auth_service import get_current_user

from app.schemas.profile import (
    ProfileResponse,
    ProfileUpdate,
    ChangePassword
)

from app.services.profile_service import (
    get_profile,
    update_profile,
    change_password,
    update_profile_image
)
router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)
@router.get(
    "/me",
    response_model=ProfileResponse
)
def me(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return get_profile(
        db,
        current_user.id
    )

@router.put(
    "/update",
    response_model=ProfileResponse
)
def update(
    data: ProfileUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return update_profile(
        db=db,
        user=current_user,
        full_name=data.full_name,
        phone=data.phone,
        city=data.city,
        country=data.country
    )
@router.put("/change-password")
def password(
    data: ChangePassword,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return change_password(
        db=db,
        user=current_user,
        current_password=data.current_password,
        new_password=data.new_password
    )

@router.post("/upload-image")
def upload_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Le fichier doit être une image."
        )

    os.makedirs("uploads/profile", exist_ok=True)

    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid.uuid4()}{extension}"

    path = os.path.join(
        "uploads/profile",
        filename
    )

    with open(path, "wb") as buffer:
        buffer.write(file.file.read())

    return update_profile_image(
        db=db,
        user=current_user,
        image_path=path
    )