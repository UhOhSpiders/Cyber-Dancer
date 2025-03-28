import React from "react";
import {LEVELS} from "../constants/levels"

const LevelSelect = ({ setSelectedLevel, isDead, game, songs }) => {
  const handleClick = (e) => {
    game.lights.reset()
    setSelectedLevel(LEVELS[e.target.id]);
    game.previewLevel(LEVELS[e.target.id]);
  };
  const levelList = LEVELS.map((level, index) => {
    return (
      <div className="level-card" key={index} onClick={handleClick} id={index}>
        <div>
          <h3>{level.name}</h3>
        </div>
        <img src={`./thumbnails/${level.assetName}_thumbnail.png`} />
      </div>
    );
  });
  return (
    <div className="menu-container">
      <h2 style={{color: isDead ? "white" : "black"}}>Select Track</h2>
      <div className="card-container">
      {levelList}
      </div>
    </div>
  );
};

export default LevelSelect;
