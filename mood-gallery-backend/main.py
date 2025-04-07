from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from datetime import datetime
from typing import Optional
import uuid

# to run server use: uvicorn main:app --reload
app = FastAPI()

# Create static directory if it doesn't exist
os.makedirs("static/uploads", exist_ok=True)

# Setup CORS middleware to allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/upload")
async def upload_file(
    image: UploadFile = File(...),
    text: str = Form(...)
):
    # Generate a unique filename to prevent overwriting
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    unique_id = uuid.uuid4().hex[:8]
    file_extension = os.path.splitext(image.filename)[1]
    new_filename = f"{timestamp}-{unique_id}{file_extension}"
    
    # Save the uploaded file
    file_path = f"static/uploads/{new_filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    # Prepare response
    return {
        "message": "Upload successful",
        "text": text,
        "image_filename": new_filename,
        "image_url": f"/static/uploads/{new_filename}"
    }