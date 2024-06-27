import * as THREE from "three";
import { Text } from "troika-three-text";
import { keyCodes } from "../constants/constants";
export function createNoteTargets(
  targetYPosition,
  columnXPositions,
  width,
  keys
) {
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
  for (let step = 0; step < columnXPositions.length; step++) {
    let newTarget = targetMesh.clone();
    let text = new Text();
    noteDropperGroup.add(text);
    text.text = keyCodes[keys[step]];
    text.position.x = columnXPositions[step];
    text.position.y = targetYPosition;
    text.color = "white";
    text.anchorX = "center";
    text.anchorY = "middle";
    text.fontSize = 0.03;
    text.sync();
    newTarget.position.set(columnXPositions[step], targetYPosition, 0);
    noteDropperGroup.add(newTarget);
  }

  noteDropperGroup.add(line);

  return noteDropperGroup;
}
