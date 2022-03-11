import * as THREE from "three";
import Experience from "./Experience";

export default class Background {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Background");
      this.debugFolder.close();
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({ color: "red" });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.scale.set(60, 30, 1);

    this.mesh.position.y = 9;
    this.mesh.position.z = -70;

    // this.mesh.rotation.x = -1.5;
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
}
