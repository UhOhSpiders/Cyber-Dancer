import * as TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";

export function createLightFlashTween(light, light2) {
  console.log(light)
  const lightFlashTween = new TWEEN.Tween({intensity:30}).to(
    {intensity:0},
    150
  );
  lightFlashTween.onUpdate(function (newInstensity) {
    console.log(newInstensity.intensity)
    light.intensity = newInstensity.intensity;
    light2.intensity = newInstensity.intensity
    
  });
  lightFlashTween.repeat(1);
  lightFlashTween.yoyo(true)

  return lightFlashTween;
}
