from sqlmodel import SQLModel, Field, create_engine
from app import settings

class User(SQLModel):
    user_id: str = Field(primary_key=True, index=True)
    name: str = Field(max_length=20)
    email: str = Field(max_length=40)
    password: str = Field(max_length=64)
    email_verified: bool = Field(default=False)
    verification_code: str = Field(max_length=6, default=None)
    code_created_date: int = Field(default=None)
    code_expiry_date: int = Field(default=None)
    created_date: int = Field(default=None)
    updated_date: int = Field(default=None)

    class Config:
        tablename = "users"
