import React from "react";

const ScoreCard = ({ scoreDetails, isDead }) => {
  return (
    <>
      {!isDead ? (
        <div className="score-card">
          <h1>Level Complete</h1>
          <h2>You scored: {scoreDetails.total}</h2>
          <h2>You missed: {scoreDetails.notesMissed}</h2>
          <h2>Your longest streak was: {scoreDetails.maxStreak}</h2>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "#c50000da" }}>GAME OVER</h1>
          <h3 style={{color:"white"}}>Oh no! You were squished by the disco anvil.</h3>
        </div>
      )}
    </>
  );
};

export default ScoreCard;
