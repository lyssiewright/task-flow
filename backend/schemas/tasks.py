from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    task_content: str

class TaskRead(BaseModel):
    id: int
    title: str
    task_content: str
    user_id: int

    class Config:
        orm_mode = True