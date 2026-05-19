from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class PostBase(BaseModel):
    username: str
    image_url: str
    tags: str
    description: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    username: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[str] = None
    description: Optional[str] = None

class PostResponse(PostBase):
    id: int
    created_by: str
    created_at: datetime
    updated_at: datetime

class Config: 
    from_attributes: True