from sqlmodel import SQLModel

class SignupRequest(SQLModel):
    name: str
    email: str
    password: str
    
class VerificationCode(SQLModel):
    email: str
    verification_code: str
    
class ResendVerificationCode(SQLModel):
    email: str