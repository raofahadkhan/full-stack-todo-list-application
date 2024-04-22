from sqlmodel import SQLModel, Field, create_engine, Session, select
from app import settings
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from typing import AsyncGenerator
from fastapi import FastAPI, HTTPException, Depends, Response
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from typing import List
from todo.models import ResponseModel, CreateTodoRequest, GetTodoResponse, GetTodoRequest
import uuid
import json

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