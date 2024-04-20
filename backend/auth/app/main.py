from sqlmodel import SQLModel, Field, create_engine, Session
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends, Cookie, Response
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

class Users(SQLModel, table=True):
    user_id: str = Field(primary_key=True, index=True)
    email: str = Field(max_length=40)
    password: str = Field(max_length=64)
    email_verified: bool = Field(default=False)
    verification_code: str = Field(max_length=6, default=None)
    code_created_date: int = Field(default=None)
    code_expiry_date: int = Field(default=None)
    created_date: int = Field(default=None)
    updated_date: int = Field(default=None)

class SignupRequest(SQLModel):
    name: str
    email: str
    password: str

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

def get_session():
    with Session(engine) as session:
        yield session
        
def verify_token(token: str = Cookie(None)):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Generate JWT access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt

# Generate JWT refresh token
def create_refresh_token(data: dict):
    return create_access_token(data, timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS))


        
@app.get("/")
def read_root():
    return {"API Name": "Authentication API"} 

