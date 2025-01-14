import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Camera from "./camera";

import { Scene } from "three";

declare global {
  interface Window {
    app: App;
  }
}

export default class App {
  static instance: App | null = null;

  canvas: HTMLCanvasElement | null;
  sizes: Sizes;
  time: Time;
  scene: Scene;
  camera: Camera;

  constructor() {
    //Singleton
    if (App.instance) return App.instance;
    App.instance = this;

    //access it from the console
    window.app = this;

    //Setup
    this.canvas = document.querySelector("canvas.webgl");
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();
    this.camera = new Camera();

    this.sizes.addEventListener("resize", () => {
      this.resize();
    });

    this.time.addEventListener("tick", () => {
      this.update();
    });
  }

  resize() {}

  update() {}
}
