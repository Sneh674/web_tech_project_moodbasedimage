# emotion_predictor.py

import tensorflow as tf
import numpy as np
import cv2
import os
from fastapi import UploadFile
import io

# --- Configuration ---
MODEL_PATH = './model/final.keras'  # Update path to your model location within the project
IMG_SIZE = (100, 100)
CLASS_LABELS = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']

# Load model once when module is imported
model = None

def load_model():
    global model
    if model is None:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("Emotion prediction model loaded successfully.")
    return model

# Function to preprocess uploaded image
async def preprocess_image(file: UploadFile):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        raise ValueError("Failed to decode image")
    
    img = cv2.resize(img, IMG_SIZE)
    img = img / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Predict function for FastAPI
async def predict_emotion(file: UploadFile):
    # Ensure model is loaded
    model = load_model()
    
    # Process image
    try:
        img = await preprocess_image(file)
        preds = model.predict(img)
        predicted_class = np.argmax(preds)
        confidence = float(np.max(preds))
        
        # Return prediction result
        return {
            "emotion": CLASS_LABELS[predicted_class],
            "confidence": round(confidence, 2),
            "all_scores": {emotion: float(score) for emotion, score in zip(CLASS_LABELS, preds[0].tolist())}
        }
    except Exception as e:
        return {"error": str(e)}
