import "../styles/home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mood, setMood] = useState("");
  const [submittedMood, setSubmittedMood] = useState("");

  const moodImages = {
    happy: [
      "https://th.bing.com/th/id/R.6f95eeb3d29b3573d7203000cb128ea0?rik=rhCZ0r8GqI4Qlg&riu=http%3a%2f%2fw3.wallls.com%2fuploads%2foriginal%2f201602%2f23%2fwallls.com_80398.jpg&ehk=85AHBeFuTmjv70mdRPNNyM6Jjy2ztD4e1Tn163qeucE%3d&risl=&pid=ImgRaw&r=0",
      "https://www.thelist.com/img/gallery/ways-to-start-your-day-in-a-good-mood/intro.jpg",
      "https://images5.alphacoders.com/433/433455.jpg",
      "https://media.istockphoto.com/id/2196087139/photo/dog-gives-paw-to-a-woman-making-high-five-gesture.webp?s=2048x2048&w=is&k=20&c=eCMmC9mx7HEA0rXrKo4FAp3G4_Qonh_kPF8MQVRMfZU=",
    ],
    sad: ["https://example.com/sad1.jpg", "https://example.com/sad2.jpg"],
    angry: ["https://example.com/angry1.jpg", "https://example.com/angry2.jpg"],
    relaxed: [
      "https://example.com/relaxed1.jpg",
      "https://example.com/relaxed2.jpg",
    ],
    excited: [
      "https://example.com/excited1.jpg",
      "https://example.com/excited2.jpg",
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMood(mood);
  };

  return (
    <div className="homeMain">
      <div className="link-container">
        <Link to="/detect">Go to AI based emotion detection</Link>
      </div>
      <div className="title">Mood-based Art Gallery</div>
      <div className="moodinput">
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => setMood(e.target.value)} defaultValue="">
            <option value="" disabled>
              Select your mood
            </option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="relaxed">Relaxed</option>
            <option value="excited">Excited</option>
          </select>
          <input type="submit" value="Enter" />
        </form>
      </div>
      {submittedMood && (
        <div className="gallery">
          {moodImages[submittedMood]?.map((img, index) => (
            <a key={index} href={img} target="_blank" rel="noopener noreferrer">
              <img
                src={img}
                alt={submittedMood}
                className="gallery-image"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
