import os
import requests
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(
    prefix="/v1/discovery",
    tags=["Discovery"]
)

UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")

@router.get("/")
def search_images(query: str = Query(default="inspiration", min_length=1), per_page: int = Query(default=6, ge=1, le=12)):
    if not UNSPLASH_ACCESS_KEY:
        raise HTTPException(
            status_code=500,
            detail="Unsplash access key is not configured"
        )
    
    url = "https://api.unsplash.com/search/photos"

    params = {
        "query" : query,
        "per_page": per_page,
        "orientation": "landscape"
    }

    headers = {
        "Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"
    }

    response = requests.get(url, params=params, headers=headers, timeout=10)

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Error fetching images from Unsplash"
        )
    
    data = response.json()

    images = []

    for item in data.get("results", []):
        images.append({
            "id": item.get("id"),
            "description": item.get("description") or item.get("alt_description") or "Unsplash image",
            "image_url": item.get("urls", {}).get("regular"),
            "thumb_url": item.get("user", {}).get("name"),
            "source": "Unsplash",
            "source_url": item.get("links", {}).get("html")
        })

    return images