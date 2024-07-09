import * as THREE from "three";

export function assignDanceMovesToNotes(
  object3D,
  gameScene,
  animationMixer,
  noteColumns
) {
  let danceMoveActions = [];
  let character = object3D
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
  let danceMoveIndex = 0;

  // A: {XPosition: -0.11666666666666667, keyEvent: 'KeyS', daceMove: danceMoveAction}
  // assigns a danceMove to each note in the noteColumns object to be accessed in the dance() function

  for (const noteName in noteColumns) {
    const noteData = noteColumns[noteName];

    noteData.danceMove =
      danceMoveActions[danceMoveIndex % danceMoveActions.length];

    danceMoveIndex++;
  }

  return noteColumns;
}
