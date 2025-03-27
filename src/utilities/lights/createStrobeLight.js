import * as THREE from "three";
import { createLightFade } from "../tweens/createLightFadeTween";
export function createStrobeLight() {
  const pointLight = new THREE.AmbientLight(0xffbe0b);
  pointLight.intensity = 0;
  const strobeTween = createLightFade(pointLight, 0, 5, 120);
  strobeTween.repeat(1);
  strobeTween.yoyo(true);
  pointLight.strobeTween = strobeTween;
  return pointLight;
}
