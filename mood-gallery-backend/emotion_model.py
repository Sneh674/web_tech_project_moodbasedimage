# emotion_model.py

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import TextVectorization, Embedding, GlobalAveragePooling1D, Dense, Dropout
from sklearn.preprocessing import LabelEncoder
import numpy as np

# Sample training data (expand this with more real-world examples for better accuracy)
texts = [
    "I am feeling great today!", "This is the worst day ever", "I am so angry right now",
    "Just an average day", "I love everything about this", "Nothing seems to matter anymore",
    "Why would they do this to me!", "It's okay, I guess", "I'm extremely excited!",
    "Feeling very low and depressed", "That was fantastic", "I can't take this anymore",
    "Everything is perfect", "I'm disappointed", "Not sure how I feel", "I feel empty"
]
labels = [
    'happy', 'sad', 'angry', 'neutral', 'happy', 'sad', 'angry', 'neutral',
    'happy', 'sad', 'happy', 'sad', 'happy', 'sad', 'neutral', 'sad'
]

# Encode labels
label_encoder = LabelEncoder()
labels_encoded = label_encoder.fit_transform(labels)

# Vectorize text
vectorizer = TextVectorization(max_tokens=2000, output_sequence_length=20)
vectorizer.adapt(texts)
vectorized_texts = vectorizer(np.array(texts))

# Build model
model = Sequential([
    Embedding(input_dim=2000, output_dim=32, input_length=20),
    GlobalAveragePooling1D(),
    Dropout(0.3),
    Dense(32, activation='relu'),
    Dense(len(label_encoder.classes_), activation='softmax')
])

model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train model
model.fit(vectorized_texts, np.array(labels_encoded), epochs=50, verbose=0)

# Prediction function
def predict_emotion(text: str) -> str:
    processed = vectorizer(np.array([text]))
    prediction = model.predict(processed, verbose=0)
    predicted_label = label_encoder.inverse_transform([np.argmax(prediction)])
    return predicted_label[0]

# For direct testing
if __name__ == "__main__":
    sample = "I’m so frustrated with everything!"
    emotion = predict_emotion(sample)
    print(f"Predicted Emotion: {emotion}")
