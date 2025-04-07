import { useState } from "react";
import axios from "axios";
import "../styles/detect.css"; // Make sure this path matches your folder structure

const Detect = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
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
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="detect-container">
      <form onSubmit={handleSubmit} className="detect-form">
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="upload-response">
          <p>
            <strong>Message:</strong> {response.message}
          </p>
          <p>
            <strong>Text:</strong> {response.text}
          </p>
          <p>
            <strong>Image URL:</strong> {response.image_url}
          </p>
          <img
            src={`http://localhost:8000${response.image_url}`}
            alt="Uploaded"
          />
        </div>
      )}
    </div>
  );
};

export default Detect;
