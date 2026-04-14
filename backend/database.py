from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://lyssiewright@localhost:5432/task_flow_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

Base = declarative_base()

# THIS is the function FastAPI depends on
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()