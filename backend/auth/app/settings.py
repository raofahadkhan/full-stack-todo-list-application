from starlette.config import Config
from starlette.datastructures import Secret

try:
    config = Config(".env")
except FileNotFoundError:
    config = Config()
    
DATABASE_URL = config("DATABASE_URL",cast=Secret)
REFRESH_TOKEN_EXPIRE_DAYS = config("REFRESH_TOKEN_EXPIRE_DAYS",cast=int)
ACCESS_TOKEN_EXPIRE_MINUTES = config("ACCESS_TOKEN_EXPIRE_MINUTES",cast=int)
JWT_ALGORITHM = config("JWT_ALGORITHM",cast=str)
JWT_SECRET = config("JWT_SECRET",cast=str)