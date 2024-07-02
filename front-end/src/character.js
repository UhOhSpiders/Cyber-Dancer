import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export default class Character {
  constructor(loadedGltf, gltfName, position, scene, animationMixer) {
    this.loadedGltf = loadedGltf;
    this.gltfName = gltfName
    this.position = position
    this.scene = scene;
    this.animationMixer = animationMixer;
  }
  create() {
    return new Promise((resolve)=>{
      this.loadedGltf.scene.position.set(this.position.x,this.position.y,this.position.z)
      this.loadedGltf.scene.name = this.gltfName
      this.loadedGltf.scene.animations = this.loadedGltf.animations;
      console.log(this.loadedGltf);
      const idleClip = THREE.AnimationClip.findByName(
        this.loadedGltf.animations,
        "idle"
      );
      const idleAction = this.animationMixer.clipAction(idleClip);
      idleAction.loop = THREE.LoopPingPong;
      this.scene.add(this.loadedGltf.scene);
      idleAction.play();
      resolve()
    },
    undefined
    )
  }
}
