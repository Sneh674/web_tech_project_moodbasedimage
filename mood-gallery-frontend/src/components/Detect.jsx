import { useState } from "react";
import axios from "axios";
import "../styles/detect.css";
import { Link } from "react-router-dom";

const Detect = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [imageEmotion, setImageEmotion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("text", text);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const res = await axios.post("https://web-tech-project-moodbasedimage.onrender.com/api/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      setImageEmotion(res.data.image_predicted_emotion);
      setEmotion(res.data.image_predicted_emotion);
      // setEmotion(res.data.predicted_emotion);
      setResponse(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="detect-container">
      <Link to="/">Go to Home</Link>
      <form onSubmit={handleSubmit} className="detect-form">
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        {/* <input type="file" name="image2" accept="image/*" capture="camera" /> */}
        {/* <input
          type="text"
          name="text22222"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          autoComplete="off"
          // required
        /> */}
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="upload-response">
          <p>
            <strong>Message:</strong> {response.message}
          </p>
          {/* <p>
            <strong>Entered Text:</strong> {response.text}
          </p>
          <p>
            <strong>Predicted Emotion:</strong> {response.predicted_emotion}
          </p> */}
          {/* <p>
            <strong>Image URL:</strong> {response.image_url}
          </p> */}
          <p>
            <strong>Predicted emotion from image:</strong> {imageEmotion}
          </p>
          {/* <img
            src={`http://localhost:8000${response.image_url}`}
            alt="Uploaded"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          /> */}
        </div>
      )}

      {emotion && (
        <div className="book-suggestions">
          <h3>Book Suggestions for "{emotion}" Mood</h3>
          <ul>
            {(emotion === "happy" ||
              emotion === "Happy" ||
              emotion === "Happiness") && (
              <>
                <li>The Alchemist – Paulo Coelho</li>
                <li>Eleanor Oliphant Is Completely Fine – Gail Honeyman</li>
                <li>Little Women – Louisa May Alcott</li>
                <li>Pride and Prejudice – Jane Austen</li>
              </>
            )}
            {(emotion === "sad" || emotion === "Sad") && (
              <>
                <li>The Fault in Our Stars – John Green</li>
                <li>A Man Called Ove – Fredrik Backman</li>
                <li>Me Before You – Jojo Moyes</li>
                <li>The Perks of Being a Wallflower – Stephen Chbosky</li>
              </>
            )}
            {(emotion === "angry" || emotion === "Angry") && (
              <>
                <li>The Art of War – Sun Tzu</li>
                <li>Anger: Wisdom for Cooling the Flames – Thich Nhat Hanh</li>
                <li>Emotional Intelligence – Daniel Goleman</li>
                <li>Letting Go – David R. Hawkins</li>
              </>
            )}
            {(emotion === "relaxed" || emotion === "Relaxed") && (
              <>
                <li>The Power of Now – Eckhart Tolle</li>
                <li>Where the Crawdads Sing – Delia Owens</li>
                <li>Big Magic – Elizabeth Gilbert</li>
                <li>Eat, Pray, Love – Elizabeth Gilbert</li>
              </>
            )}
            {(emotion === "scared" || emotion === "Scared") && (
              <>
                <li>The Shining – Stephen King</li>
                <li>Coraline – Neil Gaiman</li>
                <li>Bird Box – Josh Malerman</li>
                <li>Dracula – Bram Stoker</li>
              </>
            )}
            {(emotion === "neutral" || emotion === "Neutral") && (
              <>
                <li>Sapiens – Yuval Noah Harari</li>
                <li>Educated – Tara Westover</li>
                <li>Thinking, Fast and Slow – Daniel Kahneman</li>
                <li>Atomic Habits – James Clear</li>
              </>
            )}
            {(emotion === "surprise" || emotion === "Surprise") && (
              <>
                <li>Gone Girl – Gillian Flynn</li>
                <li>The Girl with the Dragon Tattoo – Stieg Larsson</li>
                <li>The Silent Patient – Alex Michaelides</li>
                <li>Behind Her Eyes – Sarah Pinborough</li>
              </>
            )}
            {(emotion === "fear" || emotion === "Fear") && (
              <>
                <li>It – Stephen King</li>
                <li>The Haunting of Hill House – Shirley Jackson</li>
                <li>The Exorcist – William Peter Blatty</li>
                <li>Pet Sematary – Stephen King</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Detect;
