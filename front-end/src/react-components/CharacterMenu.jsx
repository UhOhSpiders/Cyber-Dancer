import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import LifeCounter from "../LifeCounter";


const CharacterMenu = ({ game, setIsCharacterSelected }) => {
  const [characterBlurb, setCharacterBlurb] = useState(
    game.characterSelector.characters[
      game.characterSelector.displayedCharacterIndex
    ].object3D.userData.blurb
  );
  const [characterName, setCharacterName] = useState(
    game.characterSelector.characters[
      game.characterSelector.displayedCharacterIndex
    ].object3D.name.split("_")[0]
  );

  const handleIncrement = (e) => {
    game.characterSelector.incrementPreview(e.target.id);
    setCharacterBlurb(
      game.characterSelector.characters[
        game.characterSelector.displayedCharacterIndex
      ].object3D.userData.blurb
    );
    let characterName =
      game.characterSelector.characters[
        game.characterSelector.displayedCharacterIndex
      ].object3D.name.split("_")[0];
    setCharacterName(characterName);
  };

  const handleSelect = () => {
    game.characterSelector.deletePreview();
    game.selectedCharacter =
      game.characterSelector.characters[
        game.characterSelector.displayedCharacterIndex
      ];
    game.scene.add(game.selectedCharacter.object3D);
    setIsCharacterSelected(true);
  };

  return (
    <div className="menu-container character-selector">
      <h3>Choose yr Dancer...</h3>
      <h2>{characterName}</h2>
      <div className="prev-next-button-container">
        <button id={-1} onClick={handleIncrement}>
        <IoIosArrowBack style={{ pointerEvents: 'none' }}/>
        </button>
        <button id={1} onClick={handleIncrement}>
        <IoIosArrowForward style={{ pointerEvents: 'none' }}/>
        </button>
      </div>
      <button onClick={handleSelect}>Select</button>
      {characterBlurb ? <h3>{characterBlurb}</h3> : null}
    </div>
  );
};

export default CharacterMenu;
