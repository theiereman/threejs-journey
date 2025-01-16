import {
  BoxGeometry,
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  SRGBColorSpace,
} from "three";
import App from "../App";
import Environment from "./environment";
import Fox from "./Fox";

export default class World {
  app: App;
  environment: Environment;
  fox: Fox;

  constructor(app: App) {
    this.app = app;

    const floor = new Mesh(
      new CircleGeometry(6),
      new MeshStandardMaterial({
        map: this.app.resources.loadedResources["floorColorTexture"],
        normalMap: this.app.resources.loadedResources["floorNormalTexture"],
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    if (floor.material.map) floor.material.map.colorSpace = SRGBColorSpace;
    this.app.scene.add(floor);

    this.fox = new Fox(this.app);
    this.environment = new Environment(this.app);
  }

  update() {
    this.fox.update();
  }
}
