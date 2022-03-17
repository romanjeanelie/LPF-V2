import * as THREE from "three";
import Experience from "./Experience";

import { Text } from "troika-three-text";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import vertex from "./shaders/text/vertex.glsl";
import fragment from "./shaders/text/fragment.glsl";

import { gsap } from "gsap";

import EventEmitter from "./Utils/EventEmitter";

const times = [
  { label: "22H", link: "www.google.fr", color: 0xd5eef8 },
  { label: "23H", link: "www.google.fr", color: "#db7139" },
  { label: "00H", link: "www.google.fr", color: "#e048f4" },
  { label: "01H", link: "www.google.fr", color: "#84e6c0" },
  { label: "02H", link: "www.google.fr", color: "#8490e6" },
  { label: "03H", link: "www.google.fr", color: "#1714d2" },
  { label: "04H", link: "www.google.fr", color: "#ff80e8" },
  { label: "05H", link: "www.google.fr", color: "#fffb8f" },
  { label: "06H", link: "www.google.fr", color: "#a6ff80" },
];

export default class Texts extends EventEmitter {
  constructor() {
    super();

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
    this.activeTimeIndex = null;

    // Raycaster
    this.raycaster = new THREE.Raycaster();

    // DOM Elements
    this.timeLines = document.querySelectorAll(".control-times .line");
    this.cursorEl = document.querySelector(".control-times .cursor");

    this.textColor = { value: 0xd5eef8 };

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("Text");
      // this.debugFolder.close();
      this.setDebug();
    }

    this.setMouse();
    this.setText();

    this.setListeners();
  }

  setMouse() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    });
  }

  setMaterial() {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: this.time.elapsed },
        uHover: { value: 0 },
        uColor: { value: new THREE.Color(0xd5eef8) },
      },
      depthTest: false,
      needsUpdate: true,
      // wireframe: true,
    });
    return material;
  }

  setText() {
    this.addTextMesh();
  }

  addTextMesh() {
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
      textMesh.glyphGeometryDetail = 10;
      textMesh.fillOpacity = 0.01;
      textMesh.strokeWidth = 0.01;
      textMesh.strokeOpacity = 1;
      textMesh.strokeColor = this.textColor.value;

      this.textMeshes.push(textMesh);

      textMesh.sync();
      textMesh.material = this.setMaterial();
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

  setDebug() {
    this.debugFolder.addColor(this.textColor, "value").onChange((color) => {
      this.textMeshes.forEach((textMesh) => {
        textMesh.strokeColor = color;
        textMesh.material.uniforms.uColor.value = new THREE.Color(color);
      });
    });
  }

  setListeners() {
    // Mouse Enter
    this.timeLines.forEach((line, i) => {
      line.addEventListener("mouseenter", () => {
        this.activeTimeLine(i);
        this.activeTextMesh(i);
      });
    });

    // Scroll
    window.addEventListener("wheel", (e) => this.updateScroll(e.deltaY));
    this.isAnimating = false;
    this.factorParallax = 2;
  }

  updateScroll(deltaY) {
    this.textMeshes.forEach((textMesh) => {
      const index = Number(textMesh.name);
      const min = -8;
      const max = 1;

      textMesh.position.y += deltaY * 0.003;

      // Parallax
      // if (this.isAnimating) return;
      // gsap.to(textMesh.position, {
      //   y: `+=${this.textMeshes.length - index * 0.1}`,
      //   duration: 2,
      //   onStart: () => (this.isAnimating = true),
      // });
      // gsap.to(textMesh.position, {
      //   y: `+=0`,
      //   onComplete: () => (this.isAnimating = false),
      // });
    });
  }

  activeTextMesh(index) {
    const color = new THREE.Color(times[index].color);
    this.trigger("colorChange", [times[index].color]);

    // Reset
    this.textMeshes.forEach((textMesh) => {
      gsap.killTweensOf([textMesh.material.uniforms.uHover, textMesh]);
      gsap.to(textMesh, {
        fillOpacity: 0.01,
      });
      gsap.to(textMesh.material.uniforms.uHover, {
        value: 0,
      });

      // Color
      textMesh.strokeColor = color;

      gsap.to(textMesh.material.uniforms.uColor.value, {
        r: color.r,
        g: color.g,
        b: color.b,
      });
    });

    const tl = gsap.timeline();

    tl.to(this.textMeshes[index].material.uniforms.uHover, {
      value: 0.8,
      duration: 0.4,
    });

    tl.to(
      this.textMeshes[index],
      {
        fillOpacity: 1,
        duration: 2,
      },
      "<"
    );

    tl.to(
      this.textMeshes[index].material.uniforms.uHover,
      {
        value: 0,
        delay: 0.2,
        duration: 1,
        ease: "power2.in",
      },
      "<"
    );
  }

  activeTimeLine(index) {
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
      if (index === this.activeTimeIndex) return;
      this.activeTimeIndex = index;
      this.activeTimeLine(this.activeTimeIndex);
      this.activeTextMesh(this.activeTimeIndex);
    }
  }
}
