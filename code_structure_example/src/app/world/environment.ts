import App from "../App";

import * as THREE from "three";

export default class Environment {
  app: App;
  constructor(app: App) {
    this.app = app;
    this.setSunlight();
    this.setEnvironmentMap();
  }

  setEnvironmentMap() {
    const environmentMapTexture =
      this.app.resources.loadedResources["environmentMapTexture"];
    environmentMapTexture.colorSpace = THREE.SRGBColorSpace;
    this.app.scene.environment = environmentMapTexture;
  }

  setSunlight() {
    const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.normalBias = 0.05;
    directionalLight.position.set(3.5, 2, -1.25);
    this.app.scene.add(directionalLight);
  }
}
