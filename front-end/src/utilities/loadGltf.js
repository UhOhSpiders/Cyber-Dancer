import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function loadGltf(gltfName){
    const loader = new GLTFLoader();
return new Promise((resolve, reject) => {
    loader.load(
      `/${gltfName}.gltf`,
      (gltf) => {
          resolve(gltf);
      },
      undefined,
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });}