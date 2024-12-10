import React from "react";

const StartGameMenu = ({ handleClickPlay, handleResetLevel }) => {
  return (
    <div className="menu-container">
      <div className="start-game-menu">
        <button className="back-button" onClick={handleResetLevel}>
          &larr; Go Back
        </button>
        <h1 >Are You Ready?</h1>
        <ol>
          <li>Don't miss 8 notes in a row</li>
          <li>Double points for a perfect hit</li>
          <li>Streaks are rewarded</li>
        </ol>

        <button onClick={handleClickPlay}>Start Game</button>
      </div>
    </div>
  );
};

export default StartGameMenu;
