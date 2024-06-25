import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export async function loadCharacter(gltfPath, gameScene, animationMixer) {
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(
      `${gltfPath}`,
      (gltf) => {
        gltf.scene.name = "ddrman";
        let fleshMaterial = new THREE.MeshPhongMaterial({
          color: "darkorange",
        });
        gltf.scene.children[0].children[0].material = fleshMaterial;
        gltf.scene.position.z = -5;
        gltf.scene.position.y = -2;
        gltf.scene.position.x = -1;
        gltf.scene.animations = gltf.animations;
        const idleClip = THREE.AnimationClip.findByName(
          gltf.scenes[0].animations,
          "idle"
        );

        const idleAction = animationMixer.clipAction(idleClip);

        idleAction.loop = THREE.LoopPingPong;
        gameScene.add(gltf.scenes[0]);
        idleAction.play();
        resolve(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
}
