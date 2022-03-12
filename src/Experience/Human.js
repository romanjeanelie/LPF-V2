import * as THREE from "three";
import Experience from "./Experience";

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
    this.model = {};

    // Add the model
    this.model.group = this.resources.items.human.scene;
    this.model.group.traverse((child) => {
      if (child.type === "Mesh") {
        // Add shadow
        child.castShadow = true;
      }
    });
    this.model.group.scale.set(0.6, 0.6, 0.6);
    this.model.group.position.y = -2.13;
    // this.model.group.position.z = -30;

    // Animations
    this.mixer = new THREE.AnimationMixer(this.model.group);
    const actions = this.resources.items.human.animations.map((animation) => this.mixer.clipAction(animation));
    actions.forEach((action) => {
      action.play();
      console.log(action);
      //   action.setDuration(1);
      action.setLoop(THREE.LoopPingPong, 0);
      //   action.clampWhenFinished = true;
    });

    this.scene.add(this.model.group);
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.time.elapsed);
    }
  }
}
