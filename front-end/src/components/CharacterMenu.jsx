import React from "react";

const CharacterMenu = ({ game, setIsCharacterSelected }) => {
  const handleClick = (e) => {
    game.selectedCharacter = game.characterSelector.characters[e.target.id];
    game.selectedCharacter.create();
    setIsCharacterSelected(true);
  };

  let characterOptions = game.characterSelector.characters.map(
    (character, index) => {
      let characterName = character.object3D.name.split("_");
      return (
        <button id={index} key={index} onClick={handleClick}>
          {characterName[0]}
        </button>
      );
    }
  );

  return (
    <div className="menu-container">
      <h3>Select Character</h3>
      {characterOptions}
    </div>
  );
};

export default CharacterMenu;
