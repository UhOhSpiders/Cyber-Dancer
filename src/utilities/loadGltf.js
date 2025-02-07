import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadGltf(path) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        gltf.scene.children[0].animations = gltf.animations;
        resolve(gltf.scene.children[0]);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
}
