from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, Task
from pydantic import BaseModel, EmailStr

# -----------------------------
# Pydantic schemas
# -----------------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserRead(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True

class TaskRead(BaseModel):
    id: int
    title: str
    task_content: str
    user_id: int
    class Config:
        orm_mode = True

class TaskCreate(BaseModel):
    title: str
    task_content: str
    user_id: int

# -----------------------------
# FastAPI app
# -----------------------------
app = FastAPI()

# -----------------------------
# DB dependency
# -----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def read_root():
    return {"message": "API is running 🚀"}

# Create user
@app.post("/users", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # hashed_password = hash_password(user.password)

    db_user = User(email=user.email, password_hash=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# Get all users
@app.get("/users", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Create task
@app.post("/task", response_model=TaskRead)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.id == task.user_id).first()
    if not existing_user:
        raise HTTPException(status_code=400, detail="User does not exist")

    db_task = Task(title=task.title, task_content=task.task_content, user_id=task.user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task

# Get all users
@app.get("/tasks", response_model=list[TaskRead])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()