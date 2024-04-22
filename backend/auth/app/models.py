from sqlmodel import SQLModel

class BaseUser(SQLModel):
    email: str

class SignupRequest(BaseUser):
    name: str
    password: str
    
class VerificationCode(BaseUser):
    verification_code: str
    
class ResendVerificationCode(BaseUser):
    pass

class ForgotPasswordModel(BaseUser):
    pass
    
class ResponseModel(SQLModel):
    message: str