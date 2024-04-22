from sqlmodel import SQLModel, Field, create_engine, Session, select
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends, Cookie, Response
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import uuid
from fastapi.responses import JSONResponse
from app.helpers import generate_otp, send_email_smtplib


class Users(SQLModel, table=True):
    user_id: str = Field(primary_key=True, index=True)
    name: str = Field(max_length=40)
    email: str = Field(max_length=40)
    password: str = Field(max_length=64)
    email_verified: bool = Field(default=False)
    verification_code: str = Field(max_length=6, default=None)
    code_expiry_timestamp: int = Field(default=None)
    created_date: int = Field(default=datetime.now().timestamp())
    refresh_token: str = Field(default=None)

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
                "url": "http://localhost:8000",
                "description": "Development Server"
            }
          ]
        )

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
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

# Signup API endpoint
@app.post("/signup/")
async def signup(request: SignupRequest, session: Session = Depends(get_session)):
    # Check if user already exists
    existing_user = session.exec(select(Users).where(Users.email == request.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")


    # Generate a UUID for user_id
    user_id = str(uuid.uuid4())

    # Generate access token and refresh token
    access_token = create_access_token(data={"sub": request.email})
    refresh_token = create_refresh_token(data={"sub": request.email})
    
    # Generated and Sent Otp Via Email
    otp = generate_otp()

    await send_email_smtplib(
        "Todo List - Email Verificaion Otp",
        "t55484278@gmail.com",
         request.email,
        "dtys apkz kbun wtmp",
        f"<h3>The OTP to reset your password is {otp} and it will be expired in 5 minutes.</h3>"
    )
    
    # Calculate the validity time (5 minutes)
    validity_time = datetime.now() + timedelta(minutes=5)

    # Convert the datetime objects to Unix timestamps
    validity_timestamp = int(validity_time.timestamp())

    # Create a new user with the generated user_id
    new_user = Users(
        user_id=user_id,
        name=request.name,
        email=request.email,
        password=request.password,
        verification_code=otp,
        code_expiry_timestamp=validity_timestamp,
        refresh_token=refresh_token
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    # Set access token and refresh token as cookies with expiration time
    response = Response()
    
    # Set expiration time for cookies
    access_token_expires = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    refresh_token_expires = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=access_token_expires)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, max_age=refresh_token_expires)

      # Return success message
    message = {"message": "User created successfully"}
    return JSONResponse(content=message, status_code=201)
