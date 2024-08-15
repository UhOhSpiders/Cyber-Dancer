import { createTransformScaleTween } from "./tweens/createTransformScaleTween";
import * as THREE from "three"

export function createHitEffect(effectObject, layerNumber, sceneGroup, position) {
  const effectTweenGroup = null;
  for (let i = 0; i < layerNumber; i++) {
    let layer = effectObject.clone();
    layer.position.set(position.x, position.y, position.z);
    sceneGroup.add(layer);
    layer.tween = createTransformScaleTween(
      layer,
      new THREE.Vector3(200, 200, 200),
      800
    )
      .delay(i * 50)
      .start();
  }
  return effectTweenGroup;
}
