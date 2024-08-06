import React from "react";
import { levels } from "../constants/levels";

const LevelSelect = ({ setSelectedLevel, isDead, game }) => {
  const handleClick = (e) => {
    game.lights.reset()
    setSelectedLevel(levels[e.target.id]);
  };
  const levelList = levels.map((level, index) => {
    return (
      <div className="level-card" key={index} onClick={handleClick} id={index}>
        <div>
          <h3>{level.name}</h3>
          <h3>by {level.artist}</h3>
          <p>{level.blurb}</p>
        </div>
        <img src={level.thumbnail} />
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
