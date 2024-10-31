import React from 'react'

const EndOfGameNavButtons = ({isDead, handleResetLevel, handleClickReplay, handleChangeCharacter}) => {
  return (
    <div className="end-of-game-nav-button-container">
          <button
            style={{ color: isDead ? "white" : "black" }}
            onClick={handleResetLevel}
          >
            Change Track
          </button>
          <button
            style={{ color: isDead ? "white" : "black" }}
            onClick={handleClickReplay}
          >
            Replay
          </button>
          <button
            style={{ color: isDead ? "white" : "black" }}
            onClick={handleChangeCharacter}
          >
            Change Character
          </button>
        </div>
  )
}

export default EndOfGameNavButtons