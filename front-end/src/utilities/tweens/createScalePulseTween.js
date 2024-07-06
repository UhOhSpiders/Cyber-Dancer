import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

export function createScalePulseTween(mesh) {
  console.log(mesh)
  const scalePulseTween = new TWEEN.Tween(new THREE.Vector3(0.2, 0.2, 0.2)).to(
    new THREE.Vector3(0.4, 0.4, 0.4),
    80
  );
  scalePulseTween.onUpdate(function (newScale) {
    mesh.scale.set(newScale.x, newScale.y, newScale.z);
  });
  scalePulseTween.repeat(1);
  scalePulseTween.yoyo(true);

  return scalePulseTween;
}
