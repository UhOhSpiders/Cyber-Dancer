import * as THREE from "three";
import { fallTime } from "../../constants/constants.js";
import { createTransformPositionTween } from "./createTransformPositionTween.js";

export function createFallTween(mesh, targetPosition) {

  const exitPosition = new THREE.Vector3(
    mesh.position.x,
    targetPosition.y - (mesh.position.y - targetPosition.y),
    mesh.position.z
  );

  const fallTween = createTransformPositionTween(
    mesh,
    targetPosition,
    fallTime * 1000
  );

  const exitTween = createTransformPositionTween(
    mesh,
    exitPosition,
    fallTime * 1000
  );

  fallTween.chain(exitTween);

  return fallTween;
}
