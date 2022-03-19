import * as THREE from "three";
import Experience from "./Experience.js";
import Triangle from "./Triangle.js";
import Ground from "./Ground.js";
import Wall from "./Wall.js";
import Human from "./Human.js";
import Lights from "./Lights.js";
import Texts from "./Texts.js";

import { timesScripts } from "./TimeScripts.js";

import { gsap } from "gsap";
export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.textScene = this.experience.textScene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("world");
    }

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setTriangle();
        this.setGround();
        this.setWall();
        this.setHuman();
        this.setLights();
        this.setTexts();
      }
    });
  }

  setListeners() {
    this.closeBtn.addEventListener("click", () => this.leaveTime("22H"));
  }

  setTriangle() {
    this.triangle = new Triangle();
  }

  setGround() {
    this.ground = new Ground();
  }

  setWall() {
    this.wall = new Wall();
  }

  setHuman() {
    this.human = new Human();
  }

  setLights() {
    this.lights = new Lights();
  }

  setTexts() {
    this.texts = new Texts();
  }

  resize() {}

  update() {
    if (this.triangle) {
      this.triangle.update();
    }
    if (this.human) {
      this.human.update();
    }

    if (this.texts) {
      this.texts.update();
    }
  }

  destroy() {}
}
