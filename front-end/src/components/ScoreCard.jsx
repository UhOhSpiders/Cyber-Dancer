import React from 'react'

const ScoreCard = ({scoreDetails, handleClickReplay}) => {
  return (
    <div className="menu-container">
    <h1>Level Complete</h1>
    <p>
      You scored {scoreDetails.total} points. You missed{" "}
      {scoreDetails.notesMissed} notes. Your longest streak was{" "}
      {scoreDetails.maxStreak}.
    </p>
    <button onClick={handleClickReplay}>Replay</button>
  </div>
  )
}

export default ScoreCard