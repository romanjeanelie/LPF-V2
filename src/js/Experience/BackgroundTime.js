import * as THREE from "three";
import Experience from "./Experience";

import vertex from "./shaders/backgroundTime/vertex.glsl";
import fragment from "./shaders/backgroundTime/fragment.glsl";

export default class BackgroundTime {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("BackgroundTime");
      this.debugFolder.close();
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
  }

  setMaterial() {
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load("/textures/oil/oil1.png");

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uTexture: { value: texture }, uTime: { value: 0 } },
      transparent: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.z = -10;
    this.mesh.scale.set(20, 20, 20);
    this.camera.group.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed;
  }
}
