import App from "./App";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  app: App;
  instance: THREE.PerspectiveCamera;
  controls: any;

  constructor(app: App) {
    this.app = app;

    this.setInstance();
    this.setOrbitControls();
  }

  private setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.app.sizes.width / this.app.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.app.scene.add(this.instance);
  }

  private setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  onResize() {
    this.instance.aspect = this.app.sizes.width / this.app.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  onTick() {
    this.controls.update();
  }
}
