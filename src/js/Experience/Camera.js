import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

const cameraPositions = [
  { x: -1.324016413271073, y: -1.893143970340581, z: 15.346169562910116 },
  { x: -0.28811425418095193, y: 1.8315053844194895, z: 93.42311900177073 },
  { x: -2.4230075651110043, y: 9.63992952014886, z: 43.876684099477544 },
  { x: 0.05267296227770709, y: 8.991981215481815, z: 49.68490827670818 },
  { x: -0.22946868832160813, y: -1.9171726788170678, z: 8.730205175662553 },
];

export default class Camera {
  constructor(_options) {
    // Options
    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.targetElement = this.experience.targetElement;
    this.scene = this.experience.scene;

    // Set up
    this.mode = "default"; // default\ debug

    this.setInstance();
    this.setModes();
  }

  setInstance() {
    // Set up
    this.group = new THREE.Group();
    this.instance = new THREE.PerspectiveCamera(25, this.config.width / this.config.height, 0.1, 350);
    this.instance.rotation.reorder("YXZ");

    // this.instance.position.set(0, 1.5, 20);
    // this.instance.rotation.x = 0.1;

    // this.group.add(this.instance);
    // this.group.position.set(0, 1.5, 20);
    // this.scene.add(this.group);
    this.instance.position.set(0, 1.5, 20);

    if (this.mode === "debug") {
      document.camera = { position: this.instance.position, rotation: this.instance.rotation };
    }
    this.group.add(this.instance);
    this.scene.add(this.group);
  }

  setModes() {
    this.modes = {};

    // Default
    this.modes.default = {};
    this.modes.default.instance = this.instance.clone();
    this.modes.default.instance.rotation.reorder("YXZ");

    // Debug
    this.modes.debug = {};
    this.modes.debug.instance = this.instance.clone();
    this.modes.debug.instance.rotation.reorder("YXZ");
    // this.modes.debug.instance.position.set(0, 1.5, 20);
    // this.modes.debug.instance.position.set(0, 1.5, 10);

    this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement);
    this.modes.debug.orbitControls.enabled = this.modes.debug.active;
    this.modes.debug.orbitControls.screenSpacePanning = true;
    this.modes.debug.orbitControls.enableKeys = false;
    this.modes.debug.orbitControls.zoomSpeed = 0.25;
    this.modes.debug.orbitControls.enableDamping = true;
    this.modes.debug.orbitControls.update();
  }

  resize() {
    this.instance.aspect = this.config.width / this.config.height;
    this.instance.updateProjectionMatrix();

    this.modes.default.instance.aspect = this.config.width / this.config.height;
    this.modes.default.instance.updateProjectionMatrix();

    this.modes.debug.instance.aspect = this.config.width / this.config.height;
    this.modes.debug.instance.updateProjectionMatrix();
  }

  updateScript(camera) {
    // Position
    gsap.to(this.group.position, {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
      duration: 1,
    });

    // Rotation
    gsap.to(this.group.rotation, {
      x: camera.rotation.x,
      y: camera.rotation.y,
      z: camera.rotation.z,
      duration: 1,
    });
  }

  update() {
    // Update debug orbit controls
    this.modes.debug.orbitControls.update();

    // Apply coordinates
    this.instance.position.copy(this.modes[this.mode].instance.position);
    this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion);
    this.instance.updateMatrixWorld(); // To be used in projection
  }

  destroy() {
    this.modes.debug.orbitControls.destroy();
  }
}
