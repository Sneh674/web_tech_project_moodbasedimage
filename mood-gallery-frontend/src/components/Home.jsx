import "../styles/home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [mood, setMood] = useState("");
  const [submittedMood, setSubmittedMood] = useState("");

  const moodImages = {
    happy: [
      "https://t4.ftcdn.net/jpg/01/32/61/93/240_F_132619387_pOcjcRMZ49pus3YR4SDKN7zNsiTmJOVy.jpg",
      "https://t3.ftcdn.net/jpg/02/63/38/72/240_F_263387277_Fho8MB0dcdyLmdchdH2kblkTtf7TGehL.jpg",
      "https://t3.ftcdn.net/jpg/10/21/10/16/240_F_1021101687_g3e2e5IXQxfQXfb3kZieiK0V5bJWWJyE.jpg",
      "https://t3.ftcdn.net/jpg/05/51/62/50/240_F_551625068_HNzespJkpR8O9ii2ayM85LwUCwO8aesd.jpg",
      "https://t3.ftcdn.net/jpg/00/45/94/62/240_F_45946229_KE9OSDqwxnvHsy9xwWQoDRxUa27Wjrou.jpg",
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3AxYmxja2s2YjV2MGg3MGh2aGptN3hqNjZsN3hoYXNqbmJjZHVxNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LXhVaax6NuXF5OLTAk/giphy.webp",
      "https://i.giphy.com/bQtUQ2bf0t5vau2OsY.webp",
      "https://i.giphy.com/VRriWO7dJgk50xy0g4.webp",
      "https://i.giphy.com/B0vFTrb0ZGDf2.webp",
    ],
    sad: [
          "https://t3.ftcdn.net/jpg/01/18/39/62/240_F_118396217_l02xTLRakFADBX5TY0CXjvDSh5BaW6y8.jpg",
          "https://t4.ftcdn.net/jpg/01/27/88/99/240_F_127889938_SAF0hYfvm3shr5qAWnR10aZgARsqllc3.jpg",
          "https://t4.ftcdn.net/jpg/04/44/19/55/240_F_444195543_V9ZmUpCe5EIvphGbr2UGn2Q4DYXxlXTB.jpg",
          "https://t4.ftcdn.net/jpg/10/30/86/21/240_F_1030862165_F8MQw7i8dc3eFql8QFiLELiOH6echzQw.jpg",
          "https://t3.ftcdn.net/jpg/02/10/24/92/240_F_210249202_rIlmyQxgw3YWqPo2lsmCXMK9BnIhwSEe.jpg",
          "https://i.giphy.com/9Y5BbDSkSTiY8.webp",
          "https://media2.giphy.com/media/uICJ57yPOo4TzXQ5Op/giphy.webp?cid=ecf05e47a9d9aw1aurel5ulvlwp5828f2k9iqkg4ktelm8x2&ep=v1_gifs_search&rid=giphy.webp&ct=g",
          "https://i.giphy.com/sPLHgWzikDMsinH8B0.webp",
          "https://i.giphy.com/67ThNXo0IVGY7bJDPx.webp",
          
         ],
    
    angry: ["https://t4.ftcdn.net/jpg/02/25/97/85/240_F_225978535_TeZHvgzemKoYUs0Gt55YZP9vFnpErZJB.jpg",
            "https://t3.ftcdn.net/jpg/01/69/24/64/240_F_169246402_jL8xyoXVIlVFJ1uBQPrCsUynnRTPRdS0.jpg",
            "https://t4.ftcdn.net/jpg/02/16/12/13/240_F_216121311_CjQcOUx8hdxAG1pEFMAKGxbmPkWqX7oa.jpg",
            "https://t4.ftcdn.net/jpg/00/56/93/53/240_F_56935312_NiqxkRKOdGSJd86Tc2uLycL9fkUsIlRW.jpg",
            "https://t4.ftcdn.net/jpg/01/94/44/45/240_F_194444574_bNpSxsM38mQweF2xEoXvu8XBPQyGbD62.jpg",
            "https://i.giphy.com/4qx6IRdg26uZ3MTtRn.webp",
            "https://i.giphy.com/l1J9u3TZfpmeDLkD6.webp",
            "https://i.giphy.com/Bw0OqBqf3dbwI.webp",
            "https://media1.giphy.com/media/ylPtheHeRlo5Zo08QV/200.webp?cid=ecf05e47xflw3mqf7zsurgtqk1vjywtdvzlyro9uhzeuhbea&ep=v1_gifs_search&rid=200.webp&ct=g",
            
           ],
    relaxed: [
      "https://t3.ftcdn.net/jpg/00/73/28/30/240_F_73283005_VETEzekeZJCEJ9JP1haDdB4i0CCV81eU.jpg",
      "https://t3.ftcdn.net/jpg/03/78/99/78/240_F_378997821_ewmuTrolmTxEFMx1BjmasO6m2NCR6bLa.jpg",
      "https://t4.ftcdn.net/jpg/07/70/73/97/240_F_770739749_OTxVBKdFrMiWzWKXqUL106353r7PXAdZ.jpg",
      "https://t3.ftcdn.net/jpg/06/13/26/06/240_F_613260671_GsDDsZsxbDEh54Agg2lHuEz65UB4qzwQ.jpg",
      "https://t4.ftcdn.net/jpg/01/82/02/65/240_F_182026597_JRKrGG8D6xkxtXErXJ0HT8Vs394RBDSK.jpg",
      "https://media4.giphy.com/media/suxScFjy0F5tK/200.webp?cid=ecf05e4776riq9t27kc6b8dp2sjoj7m97gugsk6qb556fp4x&ep=v1_gifs_search&rid=200.webp&ct=g",
      "https://i.giphy.com/POJDRdZJM032cD9f92.webp",
      "https://i.giphy.com/iAn1Wh7Fdnh6rKg4Tq.webp",
      "https://i.giphy.com/oMHBBmFZ8kQ2Q.webp",
    ],
    excited: [
      "https://t3.ftcdn.net/jpg/03/94/75/44/240_F_394754414_tSFgKGzZHAfVDWpbXIH5BiiTi6FtfPaO.jpg",
      "https://t4.ftcdn.net/jpg/02/15/79/67/240_F_215796715_vGTxeGcRC0GQkSaQVfs24R4DSlJ62zno.jpg",
      "https://t3.ftcdn.net/jpg/03/80/74/84/240_F_380748411_l9RIMh9K5OqYYh3UTNgwi9VAerLnRIw2.jpg",
      "https://t4.ftcdn.net/jpg/01/19/48/85/240_F_119488514_E4bh3UhRm9ZjmGAVDg9Ihb1z7gN01Fw6.jpg",
      "https://t3.ftcdn.net/jpg/01/76/67/58/240_F_176675805_1KmI5Bu9TstbjZDUfQxmAM8dP4NN7zDy.jpg",
      "https://i.giphy.com/5GoVLqeAOo6PK.webp",
      "https://i.giphy.com/BQCsG0FBYjeYkmQ5bs.webp",
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZldndpM2hjd3ZxeWdsN3l3ZzIzbTBzZnZrZG55NzllM2R1cmY2NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3UrhJOhsLpwuEWbesn/giphy.gif",
      "https://i.giphy.com/zdjQpEtni7XIX4ncNg.webp",
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
