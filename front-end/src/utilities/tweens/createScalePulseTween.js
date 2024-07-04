import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

export function createScalePulseTween(mesh) {
  const scalePulseTween = new TWEEN.Tween(mesh.scale).to(
    new THREE.Vector3(
      mesh.scale.x + 0.2,
      mesh.scale.y + 0.2,
      mesh.scale.z + 0.2
    ),
    80
  );
  scalePulseTween.onUpdate(function (newScale) {
    mesh.scale.set(newScale.x, newScale.y, newScale.z);
  });
  scalePulseTween.repeat(1);
  scalePulseTween.yoyo(true);

  return scalePulseTween;
}
