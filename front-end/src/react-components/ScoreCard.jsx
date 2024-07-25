import React from "react";

const ScoreCard = ({ scoreDetails, isDead }) => {
  return (
    <>
      {!isDead ? (
        <div>
          <h1>Level Complete</h1>
          <p>
            You scored {scoreDetails.total} points. You missed{" "}
            {scoreDetails.notesMissed} notes. Your longest streak was{" "}
            {scoreDetails.maxStreak}.
          </p>
        </div>
      ) : (
        <div>
          <h1>YOU DIED</h1>
        </div>
      )}
    </>
  );
};

export default ScoreCard;
