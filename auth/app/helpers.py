import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jose import JWTError, jwt
from fastapi import  HTTPException, Cookie
from app import settings
from datetime import datetime, timedelta
from typing import Optional

def generate_otp(length=6)->int:
    """Generate a 6-digit OTP"""
    digits = "0123456789"
    otp = int("".join(random.choice(digits) for _ in range(length)))
    return otp

async def send_email_smtplib(subject, sender_email, recipient_email, password, message_body)->None:
    # Create the container email message.
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(message_body, "plain"))

    try:
        # Connect to the Gmail SMTP server and send the email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(sender_email, password)  # Log in to the server
            smtp.send_message(message)  # Send the email
            print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")
        
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