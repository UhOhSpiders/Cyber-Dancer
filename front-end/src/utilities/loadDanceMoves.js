import * as THREE from "three";

export function loadDanceMoves(characterName, gameScene, animationMixer){
    let danceMoveActions = []
    let character = gameScene.getObjectByName(characterName)
    character.animations.forEach(animation => {
        if(animation.name != "idle"){
            let clip = THREE.AnimationClip.findByName(character.animations,animation.name)
            let action = animationMixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce);
            danceMoveActions.push(action)
        }
    });
    return danceMoveActions
}