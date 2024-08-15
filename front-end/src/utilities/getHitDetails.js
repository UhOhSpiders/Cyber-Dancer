import * as THREE from "three";
export function getHitDetails(noteAttempt, hitMargin, noteTargetPosition) {
  const noteAttemptWorldPosition = noteAttempt.getWorldPosition(
    new THREE.Vector3()
  );

  const isHit =
    noteAttemptWorldPosition.y < noteTargetPosition.y + hitMargin.upper &&
    noteAttemptWorldPosition.y > noteTargetPosition.y + hitMargin.lower;

  const isGood =
    noteAttemptWorldPosition.y < noteTargetPosition.y + hitMargin.upper / 4 &&
    noteAttemptWorldPosition.y > noteTargetPosition.y + hitMargin.lower / 4;

  const isPerfect =
    noteAttemptWorldPosition.y < noteTargetPosition.y + hitMargin.upper / 8 &&
    noteAttemptWorldPosition.y > noteTargetPosition.y + hitMargin.lower / 8;


  let hitDetails = {
    isHit: isHit,
    isGood: isGood,
    isPerfect: isPerfect,
    pitch: noteAttempt.name.split("_")[0],
    name: noteAttempt.name
  };
  return hitDetails;
}
