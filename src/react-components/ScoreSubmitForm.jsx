import React, { useState } from "react";
import addScoreToSong from "../utilities/api-helpers/addScore";

const ScoreSubmitForm = ({
  scoreDetails,
  songID,
  scoreIsSubmitted,
  setScoreIsSubmitted,
}) => {
  const [scoreSubmission, setScoreSubmission] = useState({
    songID: songID,
    points: scoreDetails.total,
    user: null,
  });

  const handleChange = (event) => {
    const copyScoreSubmission = { ...scoreSubmission };
    copyScoreSubmission.user = event.target.value;
    setScoreSubmission(copyScoreSubmission);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addScoreToSong(scoreSubmission).then(() => {
      setScoreIsSubmitted(true);
    });
  };
  return (
    <div className="score-submit-form">
      {!scoreIsSubmitted ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="insert disco alias here"
              onChange={handleChange}
              value={scoreSubmission.user}
              required
            ></input>
            <button type="submit">submit yr score</button>
          </form>
        </>
      ) : (
        <p>score submitted!</p>
      )}
    </div>
  );
};

export default ScoreSubmitForm;
