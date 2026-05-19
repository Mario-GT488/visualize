from typing import List
from fastapi import APIRouter, Depends, Header, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/v1/posts", 
    tags=["Posts"]
)

@router.get("/", response_model=List[schemas.PostResponse])
def list_posts(page: int = Query(1, ge=1), limit: int = Query(10, ge=1, le=50), db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    return crud.get_posts(db=db, skip=skip, limit=limit)

@router.get("/{post_id}", response_model=schemas.PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = crud.get_post_by_id(db=db, post_id=post_id)

    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post

@router.post("/", response_model=schemas.PostResponse)
def create_post(post: schemas.PostCreate, x_user: str = Header(..., alias="X-User"), db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post, current_user=x_user)

@router.patch("/{post_id}", response_model=schemas.PostResponse)
def update_post(post_id: int, post_update: schemas.PostUpdate, x_user: str = Header(..., alias="X-User"), db: Session = Depends(get_db)):
    
    result = crud.update_post(
        db = db, 
        post_id = post_id,
        post_update = post_update,
        current_user = x_user
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if result == "forbidden":
        raise HTTPException(status_code=403, detail="You cannot edit this post")
    
    return result

@router.delete("/{post_id}", response_model=schemas.PostResponse)
def delete_post(post_id: int, x_user: str = Header(..., alias="X-User"), db: Session = Depends(get_db)):

    result = crud.delete_post(
        db = db,
        post_id = post_id,
        current_user = x_user
    )

    if result is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if result == "forbidden":
        raise HTTPException(status_code=403, detail="You cannot delete this post")
    
    return result