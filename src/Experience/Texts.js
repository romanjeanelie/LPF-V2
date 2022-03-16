import * as THREE from "three";
import Experience from "./Experience";

import { Text } from "troika-three-text";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import vertex from "./shaders/text/vertex.glsl";
import fragment from "./shaders/text/fragment.glsl";

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
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;

    this.loader = new FontLoader();

    this.textMeshes = [];
    this.mouse = new THREE.Vector2();

    // DOM Elements
    this.timeLines = document.querySelectorAll(".control-times .line");
    this.cursorEl = document.querySelector(".control-times .cursor");

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Text");
      this.debugFolder.close();
    }

    this.setMouse();
    this.setRaycaster();
    this.setMaterial();
    this.setText();

    this.setListeners();
  }

  setMouse() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    });
  }

  setRaycaster() {
    this.raycaster = new THREE.Raycaster();
    let currentIntersect = null;
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: this.time.elapsed },
        uHover: { value: 0 },
      },
      depthTest: false,
      // wireframe: true,
    });
  }

  setText() {
    this.addTextMesh();
    // this.loader.load("/fonts/Moniqa-Display_Bold.json", (font) => {
    //   times.forEach((time) => {
    //     this.addTextMeshThree(font, time.label);
    //   });
    // });
  }

  addTextMesh() {
    const textColor = 0xd5eef8;
    const positionX = 3.8;
    const positionY = 4.5;
    const margin = 1.6;

    // Create
    times.forEach((time, i) => {
      const textMesh = new Text();
      this.scene.add(textMesh);

      textMesh.text = time.label;
      textMesh.name = i;
      textMesh.font = "fonts/LeagueGothic-Regular.woff";
      textMesh.fontSize = 1.4;
      textMesh.position.y = positionY - i * margin;
      textMesh.position.x = positionX;
      textMesh.color = textColor;
      textMesh.glyphGeometryDetail = 10;
      textMesh.fillOpacity = 0.01;
      textMesh.strokeWidth = 0.01;
      textMesh.strokeOpacity = 1;
      textMesh.strokeColor = textColor;
      textMesh.fillColor = textColor;

      this.textMeshes.push(textMesh);

      textMesh.sync();
      textMesh.material = this.material;
    });
  }

  // addTextMeshThree(font, text) {
  //   const textGeometry = new TextGeometry(text, {
  //     font: font,
  //     size: 3,
  //     height: 0,
  //     curveSegments: 10,
  //     bevelEnabled: false,
  //   });

  //   textGeometry.center();
  //   const textMesh = new THREE.Mesh(textGeometry, this.material);
  //   this.textMeshes.push(textMesh);
  // }

  setListeners() {
    this.timeLines.forEach((line, i) => {
      line.addEventListener("mouseenter", () => {
        this.updateControls(i);
        this.updateTextMeshes(i);
      });
    });
  }

  updateTextMeshes(index) {
    // Reset
    this.textMeshes.forEach((textMesh) => {
      textMesh.fillOpacity = 0.01;
    });
    this.textMeshes[index].fillOpacity = 1;
  }

  updateControls(index) {
    const offsetCursor = 12;

    // Reset lines
    this.timeLines.forEach((line) => line.classList.remove("active"));

    this.timeLines[index].classList.add("active");
    this.cursorEl.style.transform = `translateY(calc(-100% +  ${offsetCursor * index}px))`;
  }

  update() {
    // Update time
    for (const textMesh of this.textMeshes) {
      textMesh.material.uniforms.uTime.value = this.time.elapsed;
    }

    // Raycaster
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const objectsToTest = this.textMeshes;
    const intersects = this.raycaster.intersectObjects(objectsToTest);

    if (intersects.length) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "inherit";
    }

    for (const intersect of intersects) {
      const index = Number(intersect.object.name);
      this.updateControls(index);
      this.updateTextMeshes(index);
    }
  }
}
