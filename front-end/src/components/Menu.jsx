import React, { useState, useEffect } from "react";
import CharacterMenu from "./CharacterMenu";
import StartGameMenu from "./StartGameMenu";
import ScoreCard from "./ScoreCard";

const Menu = ({ game, midi }) => {
  const [playing, setPlaying] = useState(false);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);

  useEffect(() => {
    const handlePlayerStop = (scoreDetails) => {
      setPlaying(false);
      {
        scoreDetails.allStreaks.length > 1
          ? (scoreDetails.maxStreak = scoreDetails.allStreaks.reduce(
              (a, b) => Math.max(a, b),
              -Infinity
            ))
          : scoreDetails.allStreaks.length
          ? (scoreDetails.maxStreak = scoreDetails.allStreaks[0])
          : (scoreDetails.maxStreak = 0);
      }
      setScoreDetails(scoreDetails);
    };
    document.addEventListener(
      "playerStopped",
      function (evt) {
        console.log(evt.detail.scoreDetails);
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

  if (!playing && !scoreDetails) {
    return (
      <>
        {isCharacterSelected ? (
          <StartGameMenu handleClickPlay={handleClickPlay} />
        ) : (
          <CharacterMenu
            game={game}
            setIsCharacterSelected={setIsCharacterSelected}
          />
        )}
      </>
    );
  } else if (scoreDetails) {
    return (
      <ScoreCard
        scoreDetails={scoreDetails}
        handleClickReplay={handleClickReplay}
      />
    );
  }
  return null;
};

export default Menu;
