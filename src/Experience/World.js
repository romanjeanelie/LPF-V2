import * as THREE from "three";
import Experience from "./Experience.js";
import Triangle from "./Triangle.js";
import Ground from "./Ground.js";
import Background from "./Background.js";
import Wall from "./Wall.js";
import Lights from "./Lights.js";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setTriangle();
        this.setGround();
        this.setBackground();
        this.setWall();
        this.setLights();
      }
    });
  }

  setTriangle() {
    this.triangle = new Triangle();
  }

  setGround() {
    this.ground = new Ground();
  }

  setBackground() {
    // this.background = new Background();
  }

  setWall() {
    this.wall = new Wall();
  }

  setLights() {
    this.lights = new Lights();
  }

  resize() {}

  update() {}

  destroy() {}
}
