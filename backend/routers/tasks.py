from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Task, User
from schemas.tasks import TaskCreate, TaskRead
from auth.security import get_current_user

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.post("/", response_model=TaskRead)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_task = Task(
        title=task.title,
        task_content=task.task_content,
        user_id=current_user.id  # 🔥 use token user
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task    

@router.get("/", response_model=list[TaskRead])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Task).filter(Task.user_id == current_user.id).all()

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}