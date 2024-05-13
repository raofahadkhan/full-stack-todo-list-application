from sqlmodel import SQLModel, Field, create_engine, Session, select
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import uuid
from app.helpers import generate_otp, send_email_smtplib, create_access_token, create_refresh_token
from app.models import SignupRequest, VerificationCode, ResendVerificationCode, ResponseModel, ForgotPasswordModel, ResetPasswordRequest, LoginRequest
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

@app.post("/signup", response_model=ResponseModel)
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
        f"<h3>The OTP to verify your email is {otp} and it will be expired in 5 minutes.</h3>"
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

@app.post("/verify-email", response_model=ResponseModel)
async def verify_email(verification_data: VerificationCode, session: Session = Depends(get_session)):
    # Find the user with the provided email
    user = session.exec(select(Users).where(Users.email == verification_data.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.email_verified == True:
        raise HTTPException(status_code=400, detail="Email is Verified Already")

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
    
    message = {"message": "Email verified successfully"}
    response = Response(content=json.dumps(message),status_code=201)

    return response

@app.post("/resend-verification-code", response_model=ResponseModel)
async def resend_verification_code(resend_data: ResendVerificationCode, session: Session = Depends(get_session)):
    # Find the user with the provided email
    user = session.exec(select(Users).where(Users.email == resend_data.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.email_verified == True:
        raise HTTPException(status_code=400, detail="Email is Verified Already")

    # Generate a new verification code
    new_verification_code = generate_otp()

    # Update the user's verification code and expiry timestamp
    user.verification_code = str(new_verification_code)
    user.code_expiry_timestamp = int((datetime.now() + timedelta(minutes=5)).timestamp())
    session.commit()

    # Send the new verification code via email
    await send_email_smtplib(
        "Todo List - Email Verificaion Otp",
        "t55484278@gmail.com",
         resend_data.email,
        "dtys apkz kbun wtmp",
        f"<h3>The OTP to verify your email is {new_verification_code} and it will be expired in 5 minutes.</h3>"
    )

    message = {"message": "Email is Verified Already!"}
    response = Response(content=json.dumps(message),status_code=201)

    return response

@app.post("/forgot_password", response_model=ResponseModel)
async def forgot_password(request_model: ForgotPasswordModel, session: Session = Depends(get_session)):
    # Check if user exists
    user = session.exec(select(Users).where(Users.email == request_model.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Generate an OTP
    otp = generate_otp()
    
    # Save OTP in user's data
    user.verification_code = str(otp)
    user.code_expiry_timestamp = int((datetime.now() + timedelta(minutes=5)).timestamp())
    session.commit()
    
    # Send the new verification code via email
    await send_email_smtplib(
        "Todo List - Password Reset Otp",
        "t55484278@gmail.com",
         request_model.email,
        "dtys apkz kbun wtmp",
        f"<h3>The OTP to reset your password is {otp} and it will be expired in 5 minutes.</h3>"
    )
    
    message = {"message": "OTP sent successfully"}
    return Response(content=json.dumps(message), status_code=200)

@app.post("/reset_password", response_model=ResponseModel)
async def reset_password(request: ResetPasswordRequest, session: Session = Depends(get_session)):
    # Find the user with the provided email
    user = session.exec(select(Users).where(Users.email == request.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the verification code matches
    if user.verification_code != request.verification_code:
        raise HTTPException(status_code=400, detail="Invalid verification code")

    # Check if the verification code is expired
    current_timestamp = int(datetime.now().timestamp())
    if user.code_expiry_timestamp and user.code_expiry_timestamp < current_timestamp:
        raise HTTPException(status_code=400, detail="Verification code expired")

    # Reset the user's password
    user.password = request.new_password
    session.commit()

    message = {"message": "Password reset successfully"}
    return Response(content=json.dumps(message), status_code=200)

@app.post("/login", response_model=ResponseModel)
async def login(request: LoginRequest, response: Response, session: Session = Depends(get_session)):
    # Find the user with the provided email
    user = session.exec(select(Users).where(Users.email == request.email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify the password
    if user.password != request.password:
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Check if the user's email is verified
    if not user.email_verified:
        raise HTTPException(status_code=401, detail="Email not verified")

    # Generate new access token and refresh token
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    # Set access token and refresh token as cookies with expiration time
    access_token_expires = settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
    refresh_token_expires = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    
    response = Response()
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=access_token_expires)
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, max_age=refresh_token_expires)

    return response