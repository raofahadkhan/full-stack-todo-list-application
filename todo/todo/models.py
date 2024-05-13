from sqlmodel import SQLModel

class BaseTodo(SQLModel):
    user_id: str
    
class CreateTodoRequest(BaseTodo):
    todo_description: str
    
    
class GetTodoRequest(BaseTodo):
    pass

class GetTodoResponse(BaseTodo):
    todo_id: str
    todo_description: str

class ResponseModel(SQLModel):
    message: str
    
class DeleteTodoRequest(SQLModel):
    todo_id: str