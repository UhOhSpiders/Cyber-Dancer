import React, { useState, useEffect } from "react";
import CharacterMenu from "./CharacterMenu";
import StartGameMenu from "./StartGameMenu";
import ScoreCard from "./ScoreCard";
import LevelSelect from "./LevelSelect";

const Menu = ({ game }) => {
  const [playing, setPlaying] = useState(false);
  const [scoreDetails, setScoreDetails] = useState(null);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  useEffect(() => {
    const handlePlayerStop = (details) => {
      setPlaying(false);
      {
        details.scoreDetails.allStreaks.length > 1
          ? (details.scoreDetails.maxStreak =
              details.scoreDetails.allStreaks.reduce(
                (a, b) => Math.max(a, b),
                -Infinity
              ))
          : details.scoreDetails.allStreaks.length
          ? (details.scoreDetails.maxStreak =
              details.scoreDetails.allStreaks[0])
          : (details.scoreDetails.maxStreak = 0);
      }
      setScoreDetails(details.scoreDetails);
      setIsDead(details.isDead);
    };
    document.addEventListener(
      "playerStopped",
      function (evt) {
        handlePlayerStop(evt.detail);
      },
      false
    );
    return () =>
      document.removeEventListener("playerStopped", handlePlayerStop);
  }, [playing]);

  const handleClickPlay = () => {
    game.play("psych_test", selectedLevel.midiName, selectedLevel.mp3Name);
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScoreDetails(null);
    game.replay("midi-to-click-test.MID", "midi-to-click-test.mp3");
  };

  const handleResetLevel = () => {
    setSelectedLevel(null);
    setScoreDetails(null);
  };

  const handleChangeCharacter = () => {
    game.squisher.delete();
    game.selectedCharacter.object3D.visible = true;
    game.selectedCharacter.delete();
    game.lights.reset();
    game.characterSelector.incrementPreview(0);
    game.cameraController.craneDown();
    setScoreDetails(null);
    setIsCharacterSelected(false);
  };

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
            <LevelSelect
              setSelectedLevel={setSelectedLevel}
              isDead={isDead}
              game={game}
            />
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
          isDead={isDead}
          handleClickReplay={handleClickReplay}
        />
        <div className="button-container">
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
      </div>
    );
  }
  return null;
};

export default Menu;
