import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { GiLightningShield } from "react-icons/gi";
import "./Profile.css";
import bronze from "../../images/bronze.png";
import silver from "../../images/silver.png";
import gold from "../../images/gold.png";

function Profile() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [progressBar, setProgressBar] = useState(0);
  const levelImages = [
    { level: 1, src: `${bronze}`, status: "bronze" },
    { level: 2, src: `${bronze}`, status: "bronze" },
    { level: 3, src: `${bronze}`, status: "bronze" },
    { level: 4, src: `${silver}`, status: "silver" },
    { level: 5, src: `${silver}`, status: "silver" },
    { level: 6, src: `${silver}`, status: "silver" },
    { level: 7, src: `${gold}`, status: "gold" },
  ];
  const currentImage = levelImages.find(
    (image) => image.level === currentLevel
  ).src;

  const handleLevelUp = () => {
    setCurrentLevel(currentLevel + 1);
    setProgressBar(progressBar + 10);
  };
  return (
    <div>
      <div className="profile-top">
        <div className="profile-photo">Photo</div>

        <div className="profile-level container">
          <div>
            <div className="profile-bar-div top">
              <AiFillHeart />
              <div className="profile-level-bar one">
                {" "}
                <div>
                  <progress value={progressBar} max="100"></progress>
                </div>
              </div>{" "}
            </div>

            <div className="profile-bar-div bottom">
              <GiLightningShield />
              <div className="profile-level-bar two">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        {" "}
        <h2>Your Achievement</h2>
        <div className="achievement-image">
          {" "}
          <div>
            <img src={currentImage} alt={`Level ${currentLevel}`} />

            <h3>{`You're a ${currentLevel}-level cook!`}</h3>
          </div>
          <button onClick={handleLevelUp}>I cooked at home today!</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
