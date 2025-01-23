import * as THREE from "three";
import { createLightFade } from "../tweens/createLightFadeTween";

export function createSpotLight(color, position) {
  const spotLights = new THREE.Group();
  const directionalLight3 = new THREE.DirectionalLight(0xff0033, 0.02);
  directionalLight3.position.set(2, 4, 5);
  const spotLight = new THREE.SpotLight(color);
  spotLight.position.set(position.x, position.y, position.z);
  spotLight.penumbra = 0.7;
  spotLight.angle = Math.PI / 5;
  spotLight.intensity = 0;
  spotLight.fadeTween = createLightFade(spotLight, 0, 3, 3000);
  spotLights.add(spotLight);
  spotLights.add(directionalLight3);
  return spotLights;
}
