import * as THREE from "three";
import { FALL_TIME } from "../../constants/constants.js";
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
    FALL_TIME * 1000
  );

  const exitTween = createTransformPositionTween(
    mesh,
    exitPosition,
    FALL_TIME * 1000
  );

  fallTween.chain(exitTween);

  return fallTween;
}
