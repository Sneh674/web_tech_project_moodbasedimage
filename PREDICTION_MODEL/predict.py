from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

model = load_model('/content/drive/MyDrive/fer_model.h5')

def predict_emotion(image_path):
    img = Image.open(image_path).convert('L').resize((48, 48))
    img_array = np.array(img).reshape(1, 48, 48, 1) / 255.0
    prediction = model.predict(img_array)
    label = emotion_labels[np.argmax(prediction)]

    # Show
    plt.imshow(img, cmap='gray')
    plt.title(f'Predicted: {label}')
    plt.axis('off')
    plt.show()

# Example: put a test image at this path
predict_emotion('/content/drive/MyDrive/Screenshot 2025-04-08 011913.png')
