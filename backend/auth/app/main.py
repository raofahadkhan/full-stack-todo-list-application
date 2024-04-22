from sqlmodel import SQLModel, Field, create_engine, Session, select
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional
import uuid
from app.helpers import generate_otp, send_email_smtplib, create_access_token, create_refresh_token
from app.models import SignupRequest, VerificationCode
import json

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

@app.get("/")
def read_root():
    return {"API Name": "Authentication API"} 

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

    message = {"message": "User created successfully"}
    response = Response(content=json.dumps(message),status_code=201)

    # Set access token and refresh token as cookies with expiration time
    # access_token_expires = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    # refresh_token_expires = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    
    # response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=access_token_expires)
    # response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, max_age=refresh_token_expires)

    return response

@app.post("/verify-email")
async def verify_email(verification_data: VerificationCode, session: Session = Depends(get_session)):
    # Find the user with the provided email
    user = session.exec(select(Users).where(Users.email == verification_data.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the verification code matches
    if user.verification_code != verification_data.verification_code:
        raise HTTPException(status_code=400, detail="Invalid verification code")

    # Check if the verification code is expired
    current_timestamp = int(datetime.now().timestamp())
    if user.code_expiry_timestamp and user.code_expiry_timestamp < current_timestamp:
        raise HTTPException(status_code=400, detail="Verification code expired")

    # Update the email_verified field
    user.email_verified = True
    session.commit()

    return {"message": "Email verified successfully"}