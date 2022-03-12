import * as THREE from "three";
import Experience from "./Experience";

export default class Wall {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Wall");
      this.debugFolder.close();
    }

    this.setMaterial();
    this.setModel();
  }

  setMaterial() {
    const textureLoader = new THREE.TextureLoader();

    const colorTexture = textureLoader.load("/textures/metal-scratched/basecolor.jpg");
    const heightTexture = textureLoader.load("/textures/metal-scratched/height.png");
    const normalTexture = textureLoader.load("/textures/metal-scratched/normal.jpg");
    const ambientOcclusionTexture = textureLoader.load("/textures/metal-scratched/ambientOcclusion.jpg");
    const metallicTexture = textureLoader.load("/textures/metal-scratched/metallic.jpg");
    const roughnessTexture = textureLoader.load("/textures/metal-scratched/roughness.jpg");

    this.material = new THREE.MeshStandardMaterial({});

    if (this.debug) {
      this.debugFolder.add(this.material, "metalness", -20, 20);
      this.debugFolder.add(this.material, "roughness", -1, 1);
    }
  }

  setModel() {
    this.model = {};

    // Add the model
    this.model.group = this.resources.items.wall.scene;
    this.model.group.traverse((child) => {
      if (child.type === "Mesh") {
        child.material = this.material;
      }
    });
    this.model.group.scale.set(2, 2, 2);
    this.model.group.position.y = 3;
    this.model.group.position.z = -30;

    this.scene.add(this.model.group);
  }
}
