import * as THREE from "three";
import Experience from "./Experience";

import BackgroundTime from "./BackgroundTime.js";

import { gsap } from "gsap";

export default class Triangle {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.camera = this.experience.camera;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("triangle");
      // this.debugFolder.close();
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.TetrahedronGeometry(2);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: "white" });
  }

  setMesh() {
    this.group = new THREE.Group();
    const scale = { value: 0 };
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = -0.292;
    this.mesh.rotation.y = 0.624;
    this.mesh.rotation.z = -0.088;

    this.group.add(this.mesh);

    this.group.position.y = 7;
    this.group.position.z = -50;

    this.scene.add(this.group);

    this.setBackgroundTime();

    document.triangle = {
      position: this.mesh.position,
      rotation: this.mesh.rotation,
      scale: this.mesh.scale,
      color: this.mesh.material.color,
    };

    // Debug
    if (this.debug) {
      this.debugFolder.addColor(this.mesh.material, "color").onChange((color) => (this.mesh.material.color = color));
      this.debugFolder.add(this.mesh.rotation, "x", -20, 20).name("rotationX");
      this.debugFolder.add(this.mesh.rotation, "y", -2, 2).name("rotationY");
      this.debugFolder.add(this.mesh.rotation, "z", -2, 2).name("rotationZ");
      this.debugFolder.add(this.mesh.position, "x", -20, 2).name("positionX");
      this.debugFolder.add(this.mesh.position, "y", -10, 20).name("positionY");
      this.debugFolder.add(this.mesh.position, "z", -100, 80).name("positionZ");
      this.debugFolder
        .add(scale, "value", 0.5, 5)
        .name("scale")
        .onChange((scale) => {
          this.mesh.scale.set(scale, scale, scale);
        });
    }
  }

  setBackgroundTime() {
    this.backgroundTime = new BackgroundTime({ group: this.group });
  }

  updateScript(triangle) {
    // Position
    gsap.to(this.group.position, {
      x: triangle.position.x,
      y: triangle.position.y,
      z: triangle.position.z,
      duration: 1,
    });

    // Rotation
    gsap.to(this.mesh.rotation, {
      x: triangle.rotation.x,
      y: triangle.rotation.y,
      z: triangle.rotation.z,
      duration: 1,
    });

    // Scale
    gsap.to(this.mesh.scale, {
      x: triangle.scale.x,
      y: triangle.scale.y,
      z: triangle.scale.z,
      duration: 1,
    });

    // Color
    const color = triangle.color;
    gsap.to(this.mesh.material.color, {
      r: color.r,
      g: color.g,
      b: color.b,
      duration: 1,
    });
  }

  enterTime(triangle) {
    this.backgroundTime.enterTime();

    // Position
    gsap.to(this.group.position, {
      x: triangle.position.x,
      y: triangle.position.y,
      z: triangle.position.z,
      duration: 1,
    });

    // Rotation
    gsap.to(this.mesh.rotation, {
      x: triangle.rotation.x,
      y: triangle.rotation.y,
      z: triangle.rotation.z,
      duration: 1,
    });

    // Scale
    gsap.to(this.mesh.scale, {
      x: triangle.scale.x,
      y: triangle.scale.y,
      z: triangle.scale.z,
      duration: 1,
    });
  }

  leaveTime(triangle) {
    this.backgroundTime.leaveTime();

    // Position
    gsap.to(this.group.position, {
      x: triangle.position.x,
      y: triangle.position.y,
      z: triangle.position.z,
      duration: 1,
    });

    // Rotation
    gsap.to(this.mesh.rotation, {
      x: triangle.rotation.x,
      y: triangle.rotation.y,
      z: triangle.rotation.z,
      duration: 1,
    });

    // Scale
    gsap.to(this.mesh.scale, {
      x: triangle.scale.x,
      y: triangle.scale.y,
      z: triangle.scale.z,
      duration: 1,
    });
  }

  update() {
    this.backgroundTime.update();
  }
}
