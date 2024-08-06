export default class Background{
    constructor(scene, gltf, levelName){
        this.scene = scene;
        this.gltf = gltf
        this.levelName = levelName
        this.create()
    }
    create(){
        let background = this.gltf.scene.getObjectByName(`${this.levelName}_background`)
        background.position.set(0,-0.55,1)
        this.scene.add(background)
    }
}