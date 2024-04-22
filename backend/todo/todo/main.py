from sqlmodel import SQLModel, Field, create_engine, Session, select
from todo import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from todo.models import ResponseModel, CreateTodoRequest, GetTodoResponse, GetTodoRequest, DeleteTodoRequest
import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from sqlmodel import Session, select
from datetime import datetime
from jose import JWTError, jwt

class Users(SQLModel, table=True):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True} 
    user_id: str = Field(primary_key=True, index=True)
    name: str = Field(max_length=40)
    email: str = Field(max_length=40)
    password: str = Field(max_length=64)
    email_verified: bool = Field(default=False)
    verification_code: str = Field(max_length=6, default=None)
    code_expiry_timestamp: int = Field(default=None)
    created_date: int = Field(default=datetime.now().timestamp())
    refresh_token: str = Field(default=None)

class Todo(SQLModel, table=True):
    todo_id: str = Field(primary_key=True, index=True)
    user_id: str = Field(index=True)
    todo_description: str = Field(max_length=120)


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
    "http://localhost:1000",
    "http://localhost:2000",
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

# class AuthenticationMiddleware(BaseHTTPMiddleware):
#     async def dispatch(self, request: Request, call_next):
        
#         excluded_routes = ['/', '/docs', '/openapi.json']
        
#         # Check if the request path is in the excluded paths
#         if request.url.path not in excluded_routes:
#             token = request.cookies.get("access_token")
#             if not token:
#                 raise HTTPException(status_code=401, detail="Not Authorized")

#             try:
#                 payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
#                 email = payload.get("sub")
#                 if not email:
#                     raise HTTPException(status_code=401, detail="Invalid token")
                
#                 # Get database session
#                 with Session() as session:
#                     # Query the user
#                     user = session.exec(select(Users).where(Users.email == email)).first()
                
#                 if not user:
#                     raise HTTPException(status_code=401, detail="User not found")
            
#             except jwt.JWTError:
#                 raise HTTPException(status_code=401, detail="Invalid token")

#         response = await call_next(request)
#         return response

# app.add_middleware(AuthenticationMiddleware)

def get_session():
    with Session(engine) as session:
        yield session

@app.get("/")
def read_root():
    return {"API Name": "TODO API"}

@app.post("/addtodos", response_model=ResponseModel)
def create_todo(todo: CreateTodoRequest, session: Session = Depends(get_session)):
    
     # Generate a UUID for user_id
    todo_id = str(uuid.uuid4())
    
    # Create a new todo object with the generated todo_id
    new_todo = Todo(
        todo_id=todo_id,
        user_id=todo.user_id,
        todo_description=todo.todo_description
    )
    
    session.add(new_todo)
    session.commit()
    session.refresh(new_todo)
    
    message = {"message": "todo added successfully"}
    return message

@app.post("/gettodos", response_model=List[GetTodoResponse])
def read_todos(getTodoRequest: GetTodoRequest,session: Session = Depends(get_session)):
    todos = session.exec(select(Todo).where(Todo.user_id == getTodoRequest.user_id)).all()
    return todos

@app.delete("/todos", response_model=ResponseModel)
def delete_todo(deleteTodoRequest: DeleteTodoRequest, session: Session = Depends(get_session)):
    statement = select(Todo).where(Todo.todo_id == deleteTodoRequest.todo_id)
    results = session.exec(statement)
    todo = results.first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    session.delete(todo)
    session.commit()
    
    message = {"message": "todo deleted successfully"}
    return message