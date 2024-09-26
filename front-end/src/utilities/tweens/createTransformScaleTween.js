import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

export function createTransformScaleTween(object3D, targetScale, duration) {
    console.log(object3D)
  const transformScaleTween = new TWEEN.Tween(object3D.scale)
    .to(new THREE.Vector3(targetScale.x, targetScale.y, targetScale.z), duration)
    .onUpdate(function (newScale) {
      object3D.scale.set(newScale.x, newScale.y, newScale.z);
    });
  return transformScaleTween;
}
