import * as TWEEN from "@tweenjs/tween.js";
export function createFadeTween(text, startValue, endValue, duration) {
  let fadeTween = new TWEEN.Tween({opacity:startValue}).to(
    {opacity: endValue},
    duration
  );
  fadeTween.onUpdate(function (newOpacity) {
    text.material.opacity = newOpacity.opacity;
    text.sync();
  });
  return fadeTween;
}
