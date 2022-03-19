import * as THREE from "three";
import Experience from "./Experience";

import vertex from "./shaders/backgroundTime/vertex.glsl";
import fragment from "./shaders/backgroundTime/fragment.glsl";

import { gsap } from "gsap";

export default class BackgroundTime {
  constructor(options) {
    this.group = options.group;
    console.log(this.group);

    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("BackgroundTime");
      // this.debugFolder.close();
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
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uOpacity: { value: 0 },
      },
      transparent: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 0;
    this.mesh.position.z = -4;
    this.mesh.scale.set(24, 24, 24);
    this.group.add(this.mesh);

    if (this.debug) {
      this.debugFolder.add(this.mesh.position, "y", -10, 10);
      this.debugFolder.add(this.mesh.position, "z", -100, 0);
    }
  }

  enterTime() {
    gsap.to(this.material.uniforms.uOpacity, {
      value: 1,
      delay: 0.6,
      duration: 2,
    });
  }

  leaveTime() {
    gsap.to(this.material.uniforms.uOpacity, {
      value: 0,
      duration: 0.5,
    });
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed;
  }
}
