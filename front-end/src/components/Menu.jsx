import React, { useState, useEffect } from "react";
import CharacterMenu from "./CharacterMenu";

const Menu = ({ game, midi }) => {
  const [playing, setPlaying] = useState(false);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);

  useEffect(() => {
    const handlePlayerStop = (scoreDetails) => {
      setPlaying(false);
      scoreDetails.maxStreak = scoreDetails.allStreaks.reduce((a, b) => Math.max(a, b), -Infinity)
      setScoreDetails(scoreDetails);
    };
    document.addEventListener(
      "playerStopped",
      function (evt) {
        console.log(evt.detail.scoreDetails)
        handlePlayerStop(evt.detail.scoreDetails);
      },
      false
    );
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, [playing]);

  const handleClickPlay = () => {
    game.play(midi, "psych_test");
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScoreDetails(null);
    game.replay(midi);
  };

  if (!isCharacterSelected) {
    return (
      <CharacterMenu
        game={game}
        setIsCharacterSelected={setIsCharacterSelected}
      />
    );
  }
  if (!playing && !scoreDetails) {
    return (
      <div className="menu-container">
        <h3>(hold me closer)</h3>
        <h1>Cyber Dancer</h1>
        <button onClick={handleClickPlay}>Start Game</button>
      </div>
    );
  } else if (scoreDetails) {
    return (
      <div className="menu-container">
        <h1>Level Complete</h1>
        <p>
          Congratulations. You scored {scoreDetails.total} points. You missed{" "}
          {scoreDetails.notesMissed} notes. Your longest streak was{" "}
          {scoreDetails.maxStreak}.
        </p>
        <button onClick={handleClickReplay}>Replay</button>
      </div>
    );
  }
  return null;
};

export default Menu;
