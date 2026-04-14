from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password_hash: str

class UserRead(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True