from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import cv2
import os
import shutil
from tempfile import NamedTemporaryFile

app = FastAPI()

# Allow CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model once at startup
MODEL_PATH = 'M:/PROJECTS/WEB_PROJECT/FINAL/model/final.keras' # this is where you load the model.keras file
IMG_SIZE = (100, 100)
CLASS_LABELS = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

def preprocess_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Could not read the image.")
    img = cv2.resize(img, IMG_SIZE)
    img = img / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.post("/predict/")
async def predict_emotion(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    # Save the uploaded file to a temporary location
    try:
        with NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_file_path = temp_file.name
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {e}")
    finally:
        file.file.close()

    # Preprocess the image and make prediction
    try:
        img = preprocess_image(temp_file_path)
        preds = model.predict(img)
        predicted_class = np.argmax(preds)
        confidence = float(np.max(preds))
        emotion = CLASS_LABELS[predicted_class]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")
    finally:
        os.remove(temp_file_path)  # Clean up the temporary file

    return {"emotion": emotion, "confidence": confidence}
