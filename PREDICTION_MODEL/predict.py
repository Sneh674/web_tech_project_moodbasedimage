import tensorflow as tf
import numpy as np
import cv2
import os

MODEL_PATH = 'M:/PROJECTS/WEB_PROJECT/FINAL/model/final.keras'
IMG_SIZE = (100, 100)
CLASS_LABELS = ['Angry', 'Disgust', 'Fear', 'Happiness', 'Neutral', 'Sadness', 'Surprise']

# image path
#IMAGE_PATH = r"M:/PROJECTS/WEB_PROJECT/FINAL/dataset/test/Angry/test_0216_aligned.jpg"
#IMAGE_PATH = r"M:/PROJECTS/WEB_PROJECT/FINAL/dataset/test/Neutral/test_2403_aligned.jpg"
#IMAGE_PATH = r"M:/PROJECTS/WEB_PROJECT/FINAL/dataset/test/Sadness/test_0080_aligned.jpg"


# Load model
model = tf.keras.models.load_model(MODEL_PATH)
print("Model loaded successfully.")

# Function to preprocess image
def preprocess_image(image_path):
    if not os.path.exists(image_path):
        raise ValueError(f"File does not exist: {image_path}")
    
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"cv2.imread failed to read image: {image_path}")
    
    img = cv2.resize(img, IMG_SIZE)
    img = img / 255.0  # Normalize
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Predict function
def predict_emotion(image_path):
    img = preprocess_image(image_path)
    preds = model.predict(img)
    predicted_class = np.argmax(preds)
    confidence = np.max(preds)
    
    print(f"Predicted Emotion: {CLASS_LABELS[predicted_class]} (Confidence: {confidence:.2f})")

# Run prediction
predict_emotion(IMAGE_PATH)
