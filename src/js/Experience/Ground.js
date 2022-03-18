import * as THREE from "three";
import Experience from "./Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("ground");
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

    this.material = new THREE.MeshStandardMaterial({
      map: colorTexture,
      bumpMap: heightTexture,
      normalMap: normalTexture,
      aoMap: ambientOcclusionTexture,
      metalnessMap: metallicTexture,
      roughnessMap: roughnessTexture,
      side: THREE.DoubleSide,
    });

    if (this.debug) {
      this.debugFolder.add(this.material, "metalness", -20, 20);
      this.debugFolder.add(this.material, "roughness", -1, 1);
    }
  }

  setModel() {
    this.model = {};
    // // Add the model
    this.model.group = this.resources.items.ground.scene;
    this.model.group.traverse((child) => {
      if (child.type === "Mesh") {
        child.material = this.material;

        // Add shadow
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.model.group.position.z = -30;

    this.scene.add(this.model.group);
  }
}
