import { AnimationAction, AnimationMixer, Mesh } from "three";
import App from "../App";
import { log } from "three/tsl";

export default class Fox {
  app: App;
  model: any;
  animation: {
    action: any;
    mixer: any;
  };

  constructor(app: App) {
    this.app = app;
    this.setModel();
    this.setAnimation();
  }

  setModel() {
    const foxModelResource = this.app.resources.loadedResources["foxModel"];
    this.model = foxModelResource.scene;

    this.model.scale.set(0.02, 0.02, 0.02);
    this.app.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {
      action: null,
      mixer: null,
    };
    this.animation.mixer = new AnimationMixer(this.model);

    this.animation.action = this.animation.mixer.clipAction(
      this.app.resources.loadedResources["foxModel"].animations[1]
    );
    this.animation.action.play();
  }

  update() {
    //mixer handles seconds
    this.animation.mixer.update(this.app.time.delta / 1000);
  }
}
