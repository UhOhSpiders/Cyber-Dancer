import * as TWEEN from "@tweenjs/tween.js";

export function createRotateTween(object3D, targetQuaternion, duration){
    const rotateTween = new TWEEN.Tween(object3D.quaternion).to(
targetQuaternion, duration
    ).onUpdate(function(newRotation){
        object3D.setRotationFromQuaternion(newRotation)
    })
    return rotateTween
}