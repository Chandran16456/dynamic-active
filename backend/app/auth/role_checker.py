from fastapi import Depends, HTTPException, status

from app.models import User
from app.routes.auth_routes import get_current_user


def require_roles(*allowed_roles: str):
    def checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action.",
            )

        return current_user

    return checker


def is_admin(user: User) -> bool:
    return user.role == "admin"


def admin_or_owner(user: User, owner_id: int) -> bool:
    return user.role == "admin" or user.id == owner_id
