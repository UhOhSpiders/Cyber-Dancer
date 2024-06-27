import * as THREE from "three";

export function assignDanceMovesToNotes(
  characterName,
  gameScene,
  animationMixer,
  noteColumns
) {
  let danceMoveActions = [];
  let character = gameScene.getObjectByName(characterName);
  character.animations.forEach((animation) => {
    if (animation.name != "idle") {
      let clip = THREE.AnimationClip.findByName(
        character.animations,
        animation.name
      );
      let action = animationMixer.clipAction(clip);
      action.setLoop(THREE.LoopOnce);
      danceMoveActions.push(action);
    }
  });
  let danceMoveIndex = 0

  for (const noteName in noteColumns) {
    const noteData = noteColumns[noteName];

    // Assign the dance move at the current index, handling potential array overflow
    noteData.danceMove = danceMoveActions[danceMoveIndex % danceMoveActions.length];

    // Increment the dance move index, wrapping around if necessary
    danceMoveIndex++;
  }

  return noteColumns;
}
