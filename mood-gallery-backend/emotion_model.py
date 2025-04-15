# from tensorflow.keras.models import load_model
# from tensorflow.keras.layers import TextVectorization
# from sklearn.preprocessing import LabelEncoder
# import numpy as np

# # Reuse the same training texts and labels
# texts = [
#     # Happy (16 examples)
#     "I am feeling great today!", 
#     "I love everything about this",
#     "I'm extremely excited!",
#     "That was fantastic",
#     "Everything is perfect",
#     "Today is absolutely wonderful",
#     "I'm overjoyed with this news",
#     "This makes me so happy",
#     "Best day of my life!",
#     "I'm thrilled beyond words",
#     "What a delightful surprise!",
#     "My heart is full of joy",
#     "This is pure happiness",
#     "I'm walking on sunshine",
#     "Couldn't be happier right now",
#     "This brings me so much joy",
    
#     # Sad (16 examples)
#     "This is the worst day ever", 
#     "Nothing seems to matter anymore",
#     "Feeling very low and depressed",
#     "I can't take this anymore",
#     "I'm disappointed",
#     "I feel empty",
#     "I just want to cry all day",
#     "Life feels meaningless right now",
#     "The sadness is overwhelming",
#     "I've never felt so alone",
#     "This grief is too much to bear",
#     "Tears won't stop coming",
#     "My heart is broken",
#     "Why does everything hurt so much",
#     "The pain is unbearable",
#     "I've lost all hope",
    
#     # Angry (16 examples)
#     "I am so angry right now",
#     "Why would they do this to me!",
#     "This makes my blood boil",
#     "I'm absolutely furious about this",
#     "How dare they treat me this way!",
#     "I'm seeing red right now",
#     "This injustice infuriates me",
#     "I can't believe their audacity",
#     "My anger is uncontrollable",
#     "They'll regret crossing me",
#     "This is completely unacceptable",
#     "I'm boiling with rage",
#     "How could they be so thoughtless",
#     "I'm about to lose my temper",
#     "This disrespect is appalling",
#     "I'm seething with anger",
    
#     # Neutral (16 examples)
#     "Just an average day", 
#     "It's okay, I guess",
#     "Not sure how I feel",
#     "Nothing special happening today",
#     "Same as usual",
#     "I don't have strong feelings either way",
#     "Today is neither good nor bad",
#     "Just going through the motions",
#     "Everything seems normal",
#     "No particular emotions right now",
#     "I feel indifferent about this",
#     "It is what it is",
#     "Nothing to report",
#     "Status quo maintained",
#     "Neither happy nor sad",
#     "Just another regular day"
# ]

# labels = [
#     # Happy
#     'happy', 'happy', 'happy', 'happy', 'happy', 
#     'happy', 'happy', 'happy', 'happy', 'happy',
#     'happy', 'happy', 'happy', 'happy', 'happy', 'happy',
    
#     # Sad
#     'sad', 'sad', 'sad', 'sad', 'sad', 
#     'sad', 'sad', 'sad', 'sad', 'sad',
#     'sad', 'sad', 'sad', 'sad', 'sad', 'sad',
    
#     # Angry
#     'angry', 'angry', 'angry', 'angry', 'angry', 
#     'angry', 'angry', 'angry', 'angry', 'angry',
#     'angry', 'angry', 'angry', 'angry', 'angry', 'angry',
    
#     # Neutral
#     'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 
#     'neutral', 'neutral', 'neutral', 'neutral', 'neutral',
#     'neutral', 'neutral', 'neutral', 'neutral', 'neutral', 'neutral'
# ]

# # Restore label encoder and vectorizer
# label_encoder = LabelEncoder()
# labels_encoded = label_encoder.fit_transform(labels)

# vectorizer = TextVectorization(max_tokens=2000, output_sequence_length=20)
# vectorizer.adapt(texts)

# # Load the model
# model = load_model('emotion_model.h5')

# # Define the function outside the model
# def predict_emotion(text: str) -> str:
#     processed = vectorizer(np.array([text]))
#     prediction = model.predict(processed, verbose=0)
#     predicted_label = label_encoder.inverse_transform([np.argmax(prediction)])
#     return predicted_label[0]

# # Call it like this
# # prediction = predict_emotion("I was so angry yesterday")
# # print("Predicted Emotion:", prediction)


from tensorflow.keras.models import load_model
import numpy as np
import pickle

# Load model
model = load_model("emotion_model.h5")

# Load vectorizer and label encoder
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)
with open("label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

# Predict function
def predict_emotion(text: str) -> str:
    processed = vectorizer(np.array([text]))
    prediction = model.predict(processed, verbose=0)
    predicted_label = label_encoder.inverse_transform([np.argmax(prediction)])
    return predicted_label[0]
