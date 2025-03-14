import Sizes from "./utils/sizes";
import Time from "./utils/time";
import Camera from "./camera";
import Renderer from "./renderer";
import Debug from "./utils/debug";

import * as THREE from "three";
import World from "./world/world";
import Resources from "./utils/resources";

declare global {
  interface Window {
    app: App;
  }
}

export default class App {
  static instance: App | null = null;

  canvas: HTMLCanvasElement | undefined;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  camera: Camera;
  renderer: Renderer;
  world: World;
  resources: Resources;
  debug: Debug;

  constructor() {
    //access it from the console
    window.app = this;

    //Setup
    this.canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.resources = new Resources();

    this.sizes.addEventListener("resize", () => {
      this.resize();
    });

    this.time.addEventListener("tick", () => {
      this.tick();
    });

    this.resources.addEventListener("resourcesLoaded", () => {
      this.world = new World(this);
    });
  }

  resize() {
    this.camera.onResize();
    this.renderer.onResize();
  }

  tick() {
    this.camera.onTick();
    this.renderer.onTick();
    if (this.world) {
      this.world.update();
    }
  }
}
