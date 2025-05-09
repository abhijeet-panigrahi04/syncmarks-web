from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class Bookmark(BaseModel):
    title: str
    url: str

bookmarks: List[Bookmark] = []

@app.get("/bookmarks", response_model=List[Bookmark])
def get_bookmarks():
    """Retrieve all bookmarks."""
    return bookmarks

@app.post("/bookmarks", response_model=Bookmark)
def add_bookmark(bookmark: Bookmark):
    """Add a new bookmark."""
    bookmarks.append(bookmark)
    return bookmark

@app.delete("/bookmarks/{index}", response_model=Bookmark)
def delete_bookmark(index: int):
    """Delete a bookmark by its index."""
    if index < 0 or index >= len(bookmarks):
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return bookmarks.pop(index)