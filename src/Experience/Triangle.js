import * as THREE from "three";
import Experience from "./Experience";

export default class Triangle {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.isPlaced = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("triangle");
      this.debugFolder.close();
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    // this.setPointLight();
  }

  setGeometry() {
    this.geometry = new THREE.TetrahedronGeometry(2);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: "white" });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.y = 7;
    this.mesh.position.z = -50;

    this.mesh.rotation.x = -0.292;
    this.mesh.rotation.y = 0.624;
    this.mesh.rotation.z = -0.088;
    this.scene.add(this.mesh);

    // Debug
    if (this.debug) {
      this.debugFolder.add(this.mesh.rotation, "x", -2, 2);
      this.debugFolder.add(this.mesh.rotation, "y", -2, 2);
      this.debugFolder.add(this.mesh.rotation, "z", -2, 2);
    }
  }

  setPointLight() {
    // Setup
    this.pointLight = {};
    this.pointLight.color = "#ffffff";

    // Instance
    this.pointLight.instance = new THREE.PointLight(0xffffff, 20, 0, 2.88);
    this.pointLight.instance.position.y = 7;
    this.pointLight.instance.position.z = -50;

    this.pointLight.helper = new THREE.PointLightHelper(this.pointLight.instance, 0.1);
    this.pointLight.helper.visible = false;
    this.scene.add(this.pointLight.helper);

    // Debug
    if (this.debug) {
      this.debugFolder.add(this.pointLight.instance.position, "x", -5, 5);
      this.debugFolder.add(this.pointLight.instance.position, "y", -5, 5);
      this.debugFolder.add(this.pointLight.instance.position, "z", -50, 50);
      this.debugFolder.add(this.pointLight.instance, "intensity", 0, 200);
      this.debugFolder.add(this.pointLight.instance, "decay", 0, 10);
    }

    this.scene.add(this.pointLight.instance);
  }

  update() {
    if (this.isPlaced) {
      this.mesh.position.y = Math.sin(this.time.elapsed * 0.001) * 10;
    }
  }
}
