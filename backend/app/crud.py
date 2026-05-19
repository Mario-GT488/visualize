from sqlalchemy.orm import Session
from app import models, schemas

def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Post).offset(skip).limit(limit).all()

def get_post_by_id(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def create_post(db: Session, post: schemas.PostCreate, current_user: str):
    db_post = models.Post(
        username = post.username,
        image_url = post.image_url,
        tags = post.tags,
        description = post.description,
        created_by = current_user
    )
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post

def update_post(db: Session, post_id: int, post_update: schemas.PostUpdate, current_user: str):
    db_post = get_post_by_id(db, post_id)

    if db_post is None:
        return None
    
    if db_post.created_by != current_user:
        return "forbidden"
    
    update_data = post_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(db_post, field, value)

    db.commit()
    db.refresh(db_post)

    return db_post

def delete_post(db: Session, post_id: int, current_user: str):
    db_post = get_post_by_id(db, post_id)

    if db_post is None:
        return None
    
    if db_post.created_by != current_user:
        return "forbidden"
    
    db.delete(db_post)
    db.commit()

    return db_post