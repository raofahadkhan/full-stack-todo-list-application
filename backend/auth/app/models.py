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
from app.helpers import generate_otp, send_email_smtplib

class SignupRequest(SQLModel):
    name: str
    email: str
    password: str
    
class VerificationCode(SQLModel):
    email: str
    verification_code: str