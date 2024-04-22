from sqlmodel import SQLModel

class BaseUser(SQLModel):
    email: str
    
class LoginRequest(BaseUser):
    password: str

class SignupRequest(BaseUser):
    name: str
    password: str
    
class VerificationCode(BaseUser):
    verification_code: str
    
class ResendVerificationCode(BaseUser):
    pass

class ForgotPasswordModel(BaseUser):
    pass

class ResetPasswordRequest(BaseUser):
    verification_code: str
    new_password: str
    
class ResponseModel(SQLModel):
    message: str