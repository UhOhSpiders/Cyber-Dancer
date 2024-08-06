import * as THREE from "three";
import { createLightFade } from "../tweens/createLightFadeTween";
export function createDefaultLights(targetObject) {
  const hemisphereLight = new THREE.HemisphereLight(0x1c51ff, 0xff3bba, 2);
  hemisphereLight.fadeOutTween = createLightFade(hemisphereLight, 2, 0, 1000)
  hemisphereLight.fadeInTween = createLightFade(hemisphereLight, 0, 2, 500)

  const directionalLight1 = new THREE.DirectionalLight(0x1c51ff, 30);
  directionalLight1.position.set(-3, 9, -5);
  directionalLight1.fadeOutTween = createLightFade(directionalLight1, 30, 0, 1000)
directionalLight1.fadeInTween = createLightFade(directionalLight1, 0, 30, 500)

  const directionalLight2 = new THREE.DirectionalLight(0xff3bba, 30);
  directionalLight2.position.set(3, 9, -5);
  directionalLight2.fadeOutTween = createLightFade(directionalLight2, 30, 0, 1000)
  directionalLight2.fadeInTween = createLightFade(directionalLight2, 0, 30, 500)

  const directionalLight3 = new THREE.DirectionalLight(0xffdcad, 5);
  directionalLight3.position.set(2, 4, 5);
  directionalLight3.fadeOutTween = createLightFade(directionalLight3, 5, 0, 1000)
  directionalLight3.fadeInTween = createLightFade(directionalLight3, 0, 5, 500)

  directionalLight1.target = targetObject;
  directionalLight2.target = targetObject;
  directionalLight3.target = targetObject;

  const defaultLightGroup = new THREE.Group();
  defaultLightGroup.add(hemisphereLight);
  defaultLightGroup.add(directionalLight1);
  defaultLightGroup.add(directionalLight2);
  defaultLightGroup.add(directionalLight3);
  return defaultLightGroup;
}
