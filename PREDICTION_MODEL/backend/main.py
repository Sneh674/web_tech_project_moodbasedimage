from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from emotion_predictor import predict_emotion, load_model

# Include any other imports you already have in main.py

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development - restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
async def startup_event():
    load_model()

# Your existing endpoints here...

# New endpoint for emotion prediction
@app.post("/predict-emotion/")
async def emotion_prediction(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    try:
        result = await predict_emotion(file)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
