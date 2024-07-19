import React from "react";

const StartGameMenu = ({ handleClickPlay }) => {
  return (
    <div className="menu-container">
      <h3>(hold me closer)</h3>
      <h1>Cyber Dancer</h1>
      <button onClick={handleClickPlay}>Start Game</button>
    </div>
  );
};

export default StartGameMenu;
