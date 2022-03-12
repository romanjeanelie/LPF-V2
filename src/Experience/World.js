import * as THREE from "three";
import Experience from "./Experience.js";
import Triangle from "./Triangle.js";
import Ground from "./Ground.js";
import Wall from "./Wall.js";
import Human from "./Human.js";
import Lights from "./Lights.js";

import { gsap } from "gsap";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        this.setTriangle();
        this.setGround();
        this.setWall();
        this.setHuman();
        this.setLights();

        this.start();
      }
    });
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

  resize() {}

  update() {
    if (this.triangle) {
      this.triangle.update();
    }
    if (this.human) {
      this.human.update();
    }
  }

  start() {
    if (this.triangle) {
      this.triangle.mesh.position.y = 40;
      this.triangle.mesh.position.z = -50;
    }
    this.camera.modes.default.instance.lookAt(this.triangle.mesh.position);

    this.lights.pointLight.instance.position.z = 40;

    gsap.to(this.camera.modes.default.instance.position, {
      z: 20,
      duration: 5,
    });
    gsap.to(this.camera.modes.default.instance.rotation, {
      x: 0,
      duration: 5,
      ease: "power2.inOut",
    });

    gsap.to(this.triangle.mesh.position, {
      y: 7,
      z: -50,
      duration: 5,
      delay: 3,
      ease: "power2.out",
    });

    gsap.to(this.triangle.mesh.rotation, {
      x: -0.292,
      duration: 7,
      delay: 3,
      ease: "power2.inOut",
    });

    gsap.to(this.lights.pointLight.instance.position, {
      z: -28,
      duration: 10,
    });
  }

  destroy() {}
}
