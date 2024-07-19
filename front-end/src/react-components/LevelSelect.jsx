import React from "react";
import { levels } from "../constants/levels"

const LevelSelect = ({setSelectedLevel}) => {
  const handleClick = (e) => {
    setSelectedLevel(levels[e.target.id])
  }
  const levelList = levels.map((level, index) => {
    return <button onClick={handleClick}id={index} key={index}>{level.name}</button>
  })
  return <div className="menu-container"><h2>Select Track</h2>{levelList}</div>;
};

export default LevelSelect;
