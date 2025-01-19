import { AnimationAction, AnimationMixer, Mesh } from "three";
import App from "../App";

export default class Fox {
  app: App;
  model: any;
  animation: AnimationAction | null = null;
  modelResource: any;
  mixer: AnimationMixer;

  constructor(app: App) {
    this.app = app;
    this.setModel();
    this.loadAnimations();
    // this.setAnimation();
  }

  private setModel() {
    this.modelResource = this.app.resources.loadedResources["foxModel"];
    this.model = this.modelResource.scene;

    this.model.scale.set(0.02, 0.02, 0.02);
    this.app.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
  }

  private loadAnimations() {
    this.mixer = new AnimationMixer(this.model);
    this.modelResource.animations.forEach((clip) => {
      this.app.debug
        .add(
          { play: () => this.playAnimation(this.mixer.clipAction(clip)) },
          "play"
        )
        ?.name(clip.name);
    });
  }

  private playAnimation(action: AnimationAction) {
    //this.model = any = bad idea but helps me for doing it easily by adding currentAnimation on it :)
    if (action === this.animation) {
      this.animation.fadeOut(1);
      this.animation = null;
      return;
    }

    if (this.animation) {
      this.animation.fadeOut(1);
    }
    this.animation = action;
    this.animation.reset();
    this.animation.fadeIn(1);
    this.animation.play();
  }

  update() {
    //mixer handles seconds
    this.mixer.update(this.app.time.delta / 1000);
  }
}
