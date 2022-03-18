import Experience from "./Experience";
import { timesScripts } from "./TimeScripts.js";

import { gsap } from "gsap";

export default class Animations {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    this.world = this.experience.world;
    this.texts = this.world.texts;
    this.lights = this.world.lights;
    this.triangle = this.world.triangle;

    // DOM Elements
    this.closeBtn = document.getElementById("close-btn");
    this.controlTimesEl = document.querySelector(".control-times");

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Animations");
      this.debugFolder.close();
    }

    this.setListeners();
    // this.setIntro();
  }

  setIntro() {
    if (this.triangle) {
      this.triangle.mesh.position.y = 40;
      this.triangle.mesh.position.z = -50;
    }
    this.camera.group.rotation.x = 0.6;

    this.lights.pointLight.instance.position.z = 40;

    gsap.to(this.camera.group.position, {
      z: 20,
      duration: 5,
    });
    gsap.to(this.camera.group.rotation, {
      x: 0,
      duration: 5,
      ease: "power2.inOut",
      onComplete: () => {
        this.controlTimesEl.classList.add("active");
      },
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

  setListeners() {
    this.texts.on("changeTime", (time) => this.onChangeTime(time));
    this.texts.on("clickTime", (time) => this.enterTime(time));
    this.closeBtn.addEventListener("click", () => this.leaveTime("22H"));
  }

  onChangeTime(time) {
    const timeScript = timesScripts.filter((el) => el.label === time)[0];
    if (!timeScript) return;
    this.camera.updateScript(timeScript.camera);
    this.triangle.updateScript(timeScript.triangle);
    this.lights.updateScript(timeScript.light);
  }

  enterTime(time) {
    this.closeBtn.classList.remove("hide");
    this.controlTimesEl.classList.add("hide");

    const timeScript = timesScripts.filter((el) => el.label === time)[0];

    this.lights.enterTime();
    this.triangle.updateScript(timeScript.triangleOnEnter);
    this.texts.enterTime();
  }

  leaveTime(time) {
    this.closeBtn.classList.add("hide");
    this.controlTimesEl.classList.remove("hide");

    const timeScript = timesScripts.filter((el) => el.label === time)[0];

    this.lights.updateScript(timeScript.light);
    this.triangle.updateScript(timeScript.triangle);
    this.texts.leaveTime();
  }
}
