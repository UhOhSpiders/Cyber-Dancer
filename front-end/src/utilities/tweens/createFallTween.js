import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { fallTime } from "../../constants/constants.js"

export function createFallTween(mesh, targetPosition) {
  const fallTween = new TWEEN.Tween(mesh.position)
    .to(targetPosition, fallTime * 1000)
    .onUpdate(function (newPostion) {
      mesh.position.set(newPostion.x, newPostion.y, newPostion.z);
    });

  const exitPosition = new THREE.Vector3(
    mesh.position.x,
    targetPosition.y - (mesh.position.y - targetPosition.y),
    mesh.position.z
  );
  const exitTween = new TWEEN.Tween(mesh.position)
    .to(exitPosition, fallTime * 1000)
    .onUpdate(function (newPostion) {
      mesh.position.set(newPostion.x, newPostion.y, newPostion.z);
    });
  fallTween.chain(exitTween);

  return fallTween;
}
