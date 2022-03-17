import * as THREE from "three";
import Experience from "./Experience";

export default class Lights {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("lights");
      // this.debugFolder.close();
    }

    this.setPointLight();
  }

  setPointLight() {
    // Setup
    this.pointLight = {};
    this.pointLight.color = "#0f2048";

    // Instance
    this.pointLight.instance = new THREE.PointLight(this.pointLight.color, 164, 0, 2.38);
    this.pointLight.instance.position.y = 7.7;
    this.pointLight.instance.position.z = -28;

    // Shadow
    this.pointLight.instance.castShadow = true;
    this.pointLight.instance.shadow.bias = -0.001;
    this.pointLight.instance.shadow.radius = 50;
    this.pointLight.instance.shadow.mapSize.x = 2048;
    this.pointLight.instance.shadow.mapSize.y = 2048;

    // Helper
    this.pointLight.helper = new THREE.PointLightHelper(this.pointLight.instance, 0.1);
    this.pointLight.helper.visible = false;
    this.scene.add(this.pointLight.helper);

    // Debug
    if (this.debug) {
      this.debugFolder.add(this.pointLight.instance.shadow, "normalBias", -0.5, 0.5);
      this.debugFolder.add(this.pointLight.instance.shadow, "bias", -0.5, 0.5);
      this.debugFolder.add(this.pointLight.instance.position, "x", -5, 5);
      this.debugFolder.add(this.pointLight.instance.position, "y", -5, 20);
      this.debugFolder.add(this.pointLight.instance.position, "z", -45, 50);
      this.debugFolder.add(this.pointLight.instance, "intensity", 0, 4000);
      this.debugFolder.add(this.pointLight.instance, "decay", 0, 10);
      this.debugFolder.addColor(this.pointLight.instance, "color").onChange((color) => {
        this.pointLight.instance.color.set(color);
      });
    }

    this.scene.add(this.pointLight.instance);
  }
}
