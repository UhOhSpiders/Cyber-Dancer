import React from "react";

const StartGameMenu = ({ handleClickPlay }) => {
  return (
    <div className="menu-container">
      <h1>Are You Ready?</h1>
      <button onClick={handleClickPlay}>Yes</button>
    </div>
  );
};

export default StartGameMenu;
