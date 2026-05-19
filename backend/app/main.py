from fastapi import FastAPI

app = FastAPI(
    title = "Visualize API",
    description = "API para guardar y descubrir inspiración visual",
    version = "1.0.0"
)

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