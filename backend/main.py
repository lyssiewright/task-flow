from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, tasks
from auth.router import router as auth_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

@app.get("/")
def read_root():
    return {"message": "API is running 🚀"}

app.include_router(users.router)
app.include_router(tasks.router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)