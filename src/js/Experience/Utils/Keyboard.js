import EventEmitter from "./EventEmitter";
import { areEqual } from "../../utils";

function roundTwoDecimals(number) {
  return Math.ceil(number * 100) / 100;
}

export default class Keyboard extends EventEmitter {
  constructor() {
    super();

    this.keysPressed = [];
    this.shortcuts = [
      { keys: ["Control", "c"], command: "copyCamera" },
      { keys: ["Control", "l"], command: "copyLights" },
      { keys: ["Control", "t"], command: "copyTriangle" },
    ];

    this.setListeners();
  }

  setListeners() {
    window.addEventListener("keydown", (e) => {
      this.keysPressed.push(e.key);
      this.checkShortCut();
    });
    window.addEventListener("keyup", (e) => {
      this.keysPressed = [];
    });
  }

  checkShortCut() {
    this.shortcuts.forEach((shortcut) => {
      if (areEqual(shortcut.keys, this.keysPressed)) {
        switch (shortcut.command) {
          case "copyCamera":
            this.copyCamera();
            break;
          case "copyLights":
            this.copyLights();
            break;
          case "copyTriangle":
            this.copyTriangle();
            break;
        }
      }
    });
  }

  copyCamera() {
    const positionCamera = document.camera.position;
    const rotationCamera = document.camera.rotation;
    const cameraToCopy = `
      position: {
        x: ${roundTwoDecimals(positionCamera.x)},
        y: ${roundTwoDecimals(positionCamera.y)},
        z: ${roundTwoDecimals(positionCamera.z)}
      },
      rotation: {
        x: ${roundTwoDecimals(rotationCamera.x)},
        y: ${roundTwoDecimals(rotationCamera.y)},
        z: ${roundTwoDecimals(rotationCamera.z)}
      },
      `;

    console.log("/// COPY CAMERA ///", cameraToCopy, "////////");
    navigator.clipboard.writeText(cameraToCopy);
  }

  copyLights() {
    const positionPointLight = document.pointLight.position;
    const color = document.pointLight.color;
    const pointLightToCopy = `
      position: {
        x: ${roundTwoDecimals(positionPointLight.x)},
        y: ${roundTwoDecimals(positionPointLight.y)},
        z: ${roundTwoDecimals(positionPointLight.z)}
      },
      intensity: ${document.pointLight.intensity}, 
      decay: ${document.pointLight.decay}, 
      color: {
        r: ${roundTwoDecimals(color.r)},
        g: ${roundTwoDecimals(color.g)},
        b: ${roundTwoDecimals(color.b)}
      }, 
      `;

    console.log("/// COPY LIGHTS ///", pointLightToCopy, "////////");
    navigator.clipboard.writeText(pointLightToCopy);
  }

  copyTriangle() {
    const positionTriangle = document.triangle.position;
    const rotationTriangle = document.triangle.rotation;
    const color = document.triangle.color;
    const scale = document.triangle.scale;
    const triangleToCopy = `
      position: {
        x: ${roundTwoDecimals(positionTriangle.x)},
        y: ${roundTwoDecimals(positionTriangle.y)},
        z: ${roundTwoDecimals(positionTriangle.z)}
      },
      rotation: {
        x: ${roundTwoDecimals(rotationTriangle.x)},
        y: ${roundTwoDecimals(rotationTriangle.y)},
        z: ${roundTwoDecimals(rotationTriangle.z)}
      },
      color: {
        r: ${roundTwoDecimals(color.r)},
        g: ${roundTwoDecimals(color.g)},
        b: ${roundTwoDecimals(color.b)}
      }, 
      scale: {
        x: ${scale.x},
        y: ${scale.y},
        z: ${scale.z}
      }
      `;

    console.log("/// COPY TRIANGLE ///", triangleToCopy, "////////");
    navigator.clipboard.writeText(triangleToCopy);
  }
}
