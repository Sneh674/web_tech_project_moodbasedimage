import "../styles/Home.css";
import { useState } from "react";

const Home = () => {
    const [mood, setMood] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mood);
    };

    return (
        <div className="homeMain">
            <div className="title">Moodbased Artgallery</div>
            <div className="moodinput">
                <form onSubmit={handleSubmit}>
                    <select id="usermood" onChange={(e) => setMood(e.target.value)} defaultValue="">
                        <option value="" disabled>Select your mood</option>
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="angry">Angry</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="excited">Excited</option>
                    </select>
                    <input type="submit" value="Enter" />
                </form>
            </div>
        </div>
    );
};

export default Home;
