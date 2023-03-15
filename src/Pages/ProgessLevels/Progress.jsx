import React, { useState } from "react";
import "./Progress.css";
import bronze from "../../images/bronze.png";
import silver from "../../images/silver.png";
import gold from "../../images/gold.png";

function Progress() {
  const levelImages = [
    { level: 1, src: `${bronze}` },
    { level: 2, src: `${bronze}` },
    { level: 3, src: `${bronze}` },
    { level: 4, src: `${silver}` },
    { level: 5, src: `${silver}` },
    { level: 6, src: `${silver}` },
    { level: 7, src: `${gold}` },
  ];
  const [currentLevel, setCurrentLevel] = useState(1);

  const currentImage = levelImages.find(
    (image) => image.level === currentLevel
  ).src;

  const handleLevelUp = () => {
    setCurrentLevel(currentLevel + 1);
  };

  return (
    <div>
      <img src={currentImage} alt={`Level ${currentLevel}`} />
      <h3>{`You're a ${currentLevel}-level cook!`}</h3>
      <button onClick={handleLevelUp}>Level Up</button>
    </div>
  );
}

export default Progress;
