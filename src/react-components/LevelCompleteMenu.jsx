import React, { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import ScoreSubmitForm from "./ScoreSubmitForm";
import fetchScores from "../utilities/api-helpers/fetchScores";
import ScoreDetails from "./ScoreDetails";

const LevelCompleteMenu = ({ scoreDetails, songID }) => {
  const [scoreboardToggle, setScoreboardToggle] = useState(false);
  const [scoreIsSubmitted, setScoreIsSubmitted] = useState(false);
  const [highScores, setHighScores] = useState(null);

  useEffect(() => {
    fetchScores(songID).then((scores) => {
      setHighScores(scores);
    });
  }, [scoreIsSubmitted]);
  return (
    <>
      {!scoreboardToggle ? (
        <div className="level-complete-menu splash">
          <h1>Level Complete</h1>
          <ScoreDetails scoreDetails={scoreDetails} />
          <h2>You scored: {scoreDetails.total}</h2>
          <button onClick={() => setScoreboardToggle(!scoreboardToggle)} class>
            add score to world dance rankings
          </button>
        </div>
      ) : (
        <>
          <div className="level-complete-menu">
            {highScores ? <ScoreBoard scores={highScores} /> : null}

            <ScoreSubmitForm
              songID={songID}
              scoreDetails={scoreDetails}
              scoreIsSubmitted={scoreIsSubmitted}
              setScoreIsSubmitted={setScoreIsSubmitted}
            />
          </div>
        </>
      )}
    </>
  );
};

export default LevelCompleteMenu;
