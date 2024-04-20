from sqlmodel import SQLModel, Field, create_engine
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI
from typing import AsyncGenerator

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

connection_string = str(settings.DATABASE_URL).replace(
    "postgresql", "postgresql+psycopg"
)

engine = create_engine(
    connection_string, connect_args={"sslmode": "require"}, pool_recycle=300
)

def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)
    
@asynccontextmanager
async def lifespan(app:FastAPI)->AsyncGenerator[None, None]:
    print('Creating Tables...')
    create_db_and_tables()
    yield
    
app = FastAPI(lifespan=lifespan, title="Todo Api", version="0.0.1", 
              servers=[
                  {
                      "url": "http://0.0.0.0:8000",
                      "description": "Development Server"
                  }
               ]
              )