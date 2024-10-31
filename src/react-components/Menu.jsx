import React, { useState, useEffect } from "react";
import CharacterMenu from "./CharacterMenu";
import StartGameMenu from "./StartGameMenu";
import LevelCompleteMenu from "./LevelCompleteMenu";
import LevelSelect from "./LevelSelect";
import EndOfGameNavButtons from "./EndOfGameNavButtons";

const Menu = ({ game, songs }) => {
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
    game.play(selectedLevel.map, selectedLevel.midiName, selectedLevel.mp3Name);
    setPlaying(true);
  };

  const handleClickReplay = () => {
    setPlaying(true);
    setScoreDetails(null);
    game.replay(selectedLevel.midiName, selectedLevel.mp3Name);
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
              songs={songs}
            />
          </>
        ) : (
          <StartGameMenu handleClickPlay={handleClickPlay} />
        )}
      </>
    );
  } else if (scoreDetails && !isDead) {
    return (
      <div className="menu-container">
        <LevelCompleteMenu
          scoreDetails={scoreDetails}
          songID={selectedLevel.id}
        />
        <EndOfGameNavButtons
          isDead={isDead}
          handleResetLevel={handleResetLevel}
          handleClickReplay={handleClickReplay}
          handleChangeCharacter={handleChangeCharacter}
        />
      </div>
    );
  } else if (isDead) {
    return (
      <div className="menu-container">
        <h1 style={{ color: "#c50000da" }}>GAME OVER</h1>
        <h3 style={{ color: "white" }}>
          Oh no! You were squished by the disco anvil.
        </h3>

        <EndOfGameNavButtons
          isDead={isDead}
          handleResetLevel={handleResetLevel}
          handleClickReplay={handleClickReplay}
          handleChangeCharacter={handleChangeCharacter}
        />
      </div>
    );
  }
  return null;
};

export default Menu;
