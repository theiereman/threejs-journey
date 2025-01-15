import App from "./App";
import * as THREE from "three";

export default class Renderer {
  instance: THREE.WebGLRenderer;
  app: App;

  constructor(app: App) {
    this.app = app;

    this.instance = new THREE.WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.onResize();
  }

  onResize() {
    console.log("resize renderer");

    this.instance.setSize(this.app.sizes.width, this.app.sizes.height);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onTick() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
