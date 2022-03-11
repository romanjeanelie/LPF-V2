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

    // this.setGeometry();
    this.setMaterial();
    // this.setMesh();
    this.setModel();
    // this.setDummy();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1);
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

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.scale.set(30, 30, 1);

    this.mesh.position.y = -3;
    this.mesh.position.z = -5;

    this.mesh.rotation.x = -1.5;
    this.scene.add(this.mesh);

    // Debug
    if (this.debug) {
      this.debugFolder.add(this.mesh.position, "x", -2, 2);
      this.debugFolder.add(this.mesh.position, "y", -2, 2);
      this.debugFolder.add(this.mesh.position, "z", -2, 2);
      this.debugFolder.add(this.mesh.rotation, "x", -2, 2);
      this.debugFolder.add(this.mesh.rotation, "y", -2, 2);
      this.debugFolder.add(this.mesh.rotation, "z", -2, 2);
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

  setDummy() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    this.dummy = new THREE.Mesh(geometry, material);
    this.dummy.position.x = -2;
    this.dummy.position.y = 0.4;
    this.dummy.castShadow = true;
    // this.dummy.receiveShadow = true;
    this.scene.add(this.dummy);
  }
}
