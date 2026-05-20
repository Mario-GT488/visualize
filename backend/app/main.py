from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models
from app.routers import posts, discovery
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title = "Visualize API",
    description = "API para guardar y descubrir inspiración visual",
    version = "1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(posts.router)
app.include_router(discovery.router)

@app.get("/")
def root():
    return{
        "message": "Welcome to Visualize API"
    }

@app.get("/health")
def health():
    external_api_status = "configured" if os.getenv("UNSPLASH_ACCESS_KEY") else "missing"

    return{
        "status": "ok",
        "app": "Visualize API",
        "databse": "connected",
        "external_api": external_api_status
    }