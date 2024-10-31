import * as TWEEN from "@tweenjs/tween.js";

export function createTransformPositionTween(object3D, targetPosition, duration) {
  const transformPositionTween = new TWEEN.Tween(object3D.position)
    .to(targetPosition, duration)
    .onUpdate(function (newPostion) {
      object3D.position.set(newPostion.x, newPostion.y, newPostion.z);
    });
  return transformPositionTween;
}
