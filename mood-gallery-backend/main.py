# main.py
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
import shutil, os, uuid
from datetime import datetime
from typing import Optional

# Import emotion prediction
from emotion_model import predict_emotion

app = FastAPI()

# Setup directories
os.makedirs("static/uploads", exist_ok=True)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://moodygallery.netlify.app"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
def read_root():
    return {"message": "Welcome to Mood-Based Art API"}

@app.post("/api/upload")
async def upload_file(
    image: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    if not image and not text:
        return JSONResponse(content={"error": "Either image or text must be provided."}, status_code=400)

    response_data = {
        "message": "Upload successful"
    }

    # Handle image saving
    if image:
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        unique_id = uuid.uuid4().hex[:8]
        file_extension = os.path.splitext(image.filename)[1]
        new_filename = f"{timestamp}-{unique_id}{file_extension}"
        file_path = f"static/uploads/{new_filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        response_data.update({
            "image_filename": new_filename,
            "image_url": f"/static/uploads/{new_filename}"
        })

    # Handle emotion prediction from text
    if text:
        emotion = predict_emotion(text)
        response_data.update({
            "text": text,
            "predicted_emotion": emotion
        })

    return JSONResponse(content=response_data)
