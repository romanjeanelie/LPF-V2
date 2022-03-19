import * as THREE from "three";
import Experience from "./Experience";

import { gsap } from "gsap";

export default class Human {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.mixer = null;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Human");
      this.debugFolder.close();
    }

    this.setModel();
  }

  setModel() {
    // Add the model
    this.model = this.resources.items.human.scene;
    this.model.traverse((child) => {
      if (child.type === "Mesh") {
        // Add shadow
        child.castShadow = true;
      }
    });
    this.model.scale.set(0.6, 0.6, 0.6);
    this.model.position.y = -2.13;

    // Animations
    this.mixer = new THREE.AnimationMixer(this.model);
    const actions = this.resources.items.human.animations.map((animation) => this.mixer.clipAction(animation));
    actions.forEach((action) => {
      action.play();
      //   action.setDuration(1);
      action.setLoop(THREE.LoopRepeat, 0);
      //   action.clampWhenFinished = true;
    });

    this.scene.add(this.model);
  }

  enterTime() {
    gsap.to(this.model.position, {
      y: -10,
      duration: 1,
      ease: "power2.in",
    });
  }

  leaveTime() {
    gsap.to(this.model.position, {
      y: -2.13,
      duration: 2,
      ease: "power2.out",
    });
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.time.elapsed);
    }
  }
}
