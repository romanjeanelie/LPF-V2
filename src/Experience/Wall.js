import * as THREE from "three";
import Experience from "./Experience";

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

    this.setModel();
  }

  setModel() {
    this.model = {};

    // Add the model
    this.model.group = this.resources.items.wall.scene;
    this.model.group.scale.set(2, 2, 2);
    this.model.group.position.y = 3;
    this.model.group.position.z = -30;

    this.scene.add(this.model.group);
  }
}
