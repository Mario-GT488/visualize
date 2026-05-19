from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.routers import posts

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "Visualize API",
    description = "API para guardar y descubrir inspiración visual",
    version = "1.0.0"
)

app.include_router(posts.router)

@app.get("/")
def root():
    return{
        "message": "Welcome to Visualize API"
    }

@app.get("/")
def health():
    return{
        "status": "ok",
        "app": "Visualize API",
        "databse": "pending",
        "external_api": "pending"
    }