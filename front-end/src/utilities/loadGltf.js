import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadGltf(){
    const loader = new GLTFLoader();
return new Promise((resolve, reject) => {
    loader.load(
      `/graphics.gltf`,
      (gltf) => {
          resolve(gltf);
      },
      undefined,
      (error) => {
        reject(error)
      }
    );
  });}