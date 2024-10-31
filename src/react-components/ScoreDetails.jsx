import React from "react";

const ScoreDetails = ({ scoreDetails }) => {
  return (
    <div className="score-details">
      <h3 style={{fontWeight:"bold"}}>The Stats</h3>
      <h3>Your longest streak was: {scoreDetails.maxStreak}</h3>
      <h3>Perfect Hits: {scoreDetails.total}</h3>
      <h3>Good Hits: {scoreDetails.notesMissed}</h3>
      <h3>Basic Hits: {scoreDetails.maxStreak}</h3>
      <h3>Misses: {scoreDetails.notesMissed}</h3>
      <h3>Good Hits: {scoreDetails.notesMissed}</h3>
      <h3>Basic Hits: {scoreDetails.maxStreak}</h3>
      <h3>Misses: {scoreDetails.notesMissed}</h3>
    </div>
  );
};

export default ScoreDetails;
