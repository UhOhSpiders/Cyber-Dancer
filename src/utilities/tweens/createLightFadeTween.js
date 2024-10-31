import * as TWEEN from "@tweenjs/tween.js";

export function createLightFade(light, startValue, endValue, duration) {
  const lightFadeTween = new TWEEN.Tween({ intensity: startValue }).to(
    { intensity: endValue },
    duration
  );
  lightFadeTween.onUpdate(function (newInstensity) {
    light.intensity = newInstensity.intensity;
  });

  return lightFadeTween;
}
