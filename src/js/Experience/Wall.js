import * as THREE from "three";
import Experience from "./Experience";

import { gsap } from "gsap";

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
    this.setBackground();
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
    this.model = this.resources.items.wall.scene;
    this.model.traverse((child) => {
      if (child.type === "Mesh") {
        child.material = this.material;
      }
    });
    this.model.scale.set(2, 2, 2);
    this.model.position.y = 3;
    this.model.position.z = -30;

    this.scene.add(this.model);
  }

  setBackground() {
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color("black") });
    this.background = new THREE.Mesh(geometry, material);
    this.background.position.y = 10;
    this.background.position.z = -55;
    this.background.scale.set(25, 25, 25);
    this.scene.add(this.background);
  }

  enterTime() {
    gsap.to(this.model.position, {
      z: -60,
      duration: 1,
    });
  }

  leaveTime() {
    gsap.to(this.model.position, {
      z: -30,
      duration: 2,
      ease: "power2.out",
    });
  }
}
