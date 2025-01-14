import { EventDispatcher } from "three";

export default class Sizes extends EventDispatcher {
  height: number;
  width: number;

  constructor() {
    super();
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    window.addEventListener("resize", () => {
      // Update sizes
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.dispatchEvent({
        type: "resize",
        height: this.height,
        width: this.width,
      });
    });
  }
}
