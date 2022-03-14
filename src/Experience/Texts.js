import * as THREE from "three";
import Experience from "./Experience";

import { Text } from "troika-three-text";

import WebFont, { WebFontConfig } from "webfontloader";

console.log(WebFont, WebFontConfig);
const times = [
  { label: "22H", link: "www.google.fr" },
  { label: "23H", link: "www.google.fr" },
  { label: "00H", link: "www.google.fr" },
  { label: "01H", link: "www.google.fr" },
  { label: "02H", link: "www.google.fr" },
  { label: "03H", link: "www.google.fr" },
  { label: "04H", link: "www.google.fr" },
  { label: "05H", link: "www.google.fr" },
  { label: "06H", link: "www.google.fr" },
];
export default class Texts {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Text");
      this.debugFolder.close();
    }

    this.setText();
  }

  setText() {
    const textColor = 0xd5eef8;
    const positionX = 4;
    const positionY = 4.5;
    const margin = 1.6;
    // Create:
    times.forEach((time, i) => {
      const textMesh = new Text();
      this.scene.add(textMesh);

      textMesh.text = time.label;
      textMesh.fontSize = 1;
      textMesh.position.y = positionY - i * margin;
      textMesh.position.x = positionX;
      textMesh.color = textColor;
      textMesh.material.depthTest = false;

      // Update the rendering:
      textMesh.sync();
    });
  }
}
