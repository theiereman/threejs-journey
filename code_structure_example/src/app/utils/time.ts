import { EventDispatcher } from "three";
import { EventType } from "../types/event-type";

export default class Time extends EventDispatcher<EventType> {
  start: number;
  current: number;
  delta: number;
  elapsed: number;

  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;

    this.tick();
  }

  tick() {
    const currentTime: number = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.dispatchEvent({
      type: "tick",
    });

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
