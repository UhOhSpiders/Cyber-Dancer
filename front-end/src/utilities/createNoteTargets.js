import * as THREE from "three";

export function createNoteTargets(targetYPosition, noteXPositions, width) {
  let linePoints = [];
  let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  linePoints.push(new THREE.Vector3(width / 2, targetYPosition, 0));
  linePoints.push(new THREE.Vector3(width / -2, targetYPosition, 0));
  let lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
  let line = new THREE.Line(lineGeometry, lineMaterial);
  let noteDropperGroup = new THREE.Group();

  let targetGeometry = new THREE.CircleGeometry(0.02, 8);
  let targetMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
  let targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
  for (let step = 0; step < noteXPositions.length; step++) {
    let newTarget = targetMesh.clone();
    newTarget.position.set(noteXPositions[step], targetYPosition,0)
    noteDropperGroup.add(newTarget)
   
  }

  noteDropperGroup.add(line);

  return noteDropperGroup;
}
