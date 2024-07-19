import React from 'react'

const ScoreCard = ({scoreDetails, handleClickReplay}) => {
  return (
    <div >
    <h1>Level Complete</h1>
    <p>
      You scored {scoreDetails.total} points. You missed{" "}
      {scoreDetails.notesMissed} notes. Your longest streak was{" "}
      {scoreDetails.maxStreak}.
    </p>
    
  </div>
  )
}

export default ScoreCard