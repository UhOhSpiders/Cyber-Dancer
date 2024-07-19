import React, { useState, useEffect } from "react";
import CharacterMenu from "./CharacterMenu";
import StartGameMenu from "./StartGameMenu";
import ScoreCard from "./ScoreCard";
import LevelSelect from "./LevelSelect";

const Menu = ({ game }) => {
  const [playing, setPlaying] = useState(false);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
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
        handlePlayerStop(evt.detail.scoreDetails);
      },
      false
    );
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, [playing]);

  const handleClickPlay = () => {
    game.play("psych_test",selectedLevel.midiName,selectedLevel.mp3Name);
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScoreDetails(null);
    game.replay("midi-to-click-test.MID","midi-to-click-test.mp3");
  };

  const handleResetLevel = () => {
    setSelectedLevel(null)
    setScoreDetails(null)
  }

  const handleChangeCharacter = () => {
    game.selectedCharacter.delete()
    game.characterSelector.incrementPreview(0)
    setScoreDetails(null)
    setIsCharacterSelected(false)
  }

  if (!playing && !scoreDetails) {
    return (
      <>
        {!isCharacterSelected ? (
          
        <CharacterMenu
        game={game}
        setIsCharacterSelected={setIsCharacterSelected}
      />
     
        ) : !selectedLevel ? (
         <>
          <LevelSelect setSelectedLevel={setSelectedLevel}/>
          </>
        ) : (
          <StartGameMenu handleClickPlay={handleClickPlay}/>
        )}
      </>
    );
  } else if (scoreDetails) {
    return (
      <div className="menu-container">
      <ScoreCard
        scoreDetails={scoreDetails}
        handleClickReplay={handleClickReplay}
      />
      <button onClick={handleClickReplay}>Replay</button>
      <button onClick={handleResetLevel}>Change Track</button>
      <button onClick={handleChangeCharacter}>Change Character</button>
      </div>
    );
  }
  return null;
};

export default Menu;
