import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

export function createScalePulseTween(mesh, baseScale) {
  // console.log(mesh)
  const scalePulseTween = new TWEEN.Tween(baseScale).to(
    new THREE.Vector3(baseScale.x + 0.2, baseScale.y + 0.2, baseScale.z + 0.2),
    80
  );
  scalePulseTween.onUpdate(function (newScale) {
    mesh.scale.set(newScale.x, newScale.y, newScale.z);
  });
  
  scalePulseTween.repeat(1);
  scalePulseTween.yoyo(true);

  return scalePulseTween;
}
