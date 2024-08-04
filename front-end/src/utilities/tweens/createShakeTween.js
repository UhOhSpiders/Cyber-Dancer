import * as TWEEN from "@tweenjs/tween.js";

export function createShakeTween(object3D, targetPosition, duration) {
  const shakeTween = new TWEEN.Tween(object3D.position)
    .to(targetPosition, duration)
    .onUpdate(function (newPostion) {
      object3D.position.set(newPostion.x, newPostion.y, newPostion.z);
    });
    shakeTween.easing(TWEEN.Easing.Bounce)
  return shakeTween;
}