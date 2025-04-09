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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDchHNSrA1bfcmv7K1p6ERitDmxxEmtpA2S8s5PczpB96zRpgS-TeNvhc&s",
    ],
    sad: ["https://example.com/sad1.jpg", "https://example.com/sad2.jpg",
          "https://t3.ftcdn.net/jpg/02/94/78/20/360_F_294782061_mGGShSiRjTbOdj9lT25tmTGUDwQl3yGg.webp",
          "https://t3.ftcdn.net/jpg/02/10/24/92/360_F_210249202_rIlmyQxgw3YWqPo2lsmCXMK9BnIhwSEe.webp",
          "https://t3.ftcdn.net/jpg/06/03/31/10/360_F_603311014_qyxMDIjJkgknDYSqdLO5GahBoeW5l3i6.webp",
          "https://media.istockphoto.com/id/1015957180/photo/young-girl-covering-her-face-with-her-hands.jpg?s=612x612&w=0&k=20&c=Mey1NU4Oq1j6vrYEUXXYVDYiW8Dt9gEWr41vnvlhANY=",
          "https://t4.ftcdn.net/jpg/01/71/77/55/240_F_171775542_RvalSl5S077SLOpU9a7OkjurM0Q0sQBA.jpg",
         ],
    
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
