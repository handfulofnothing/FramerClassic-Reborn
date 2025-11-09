import Utils from "./Utils.js";
import { EventEmitter } from "./EventEmitter.js";

const getTime = () => Utils.getTime() * 1000;

export class AnimationLoop extends EventEmitter {
  constructor() {
    super();

    this.delta = 1 / 60;
    this.raf = true;

    // Disable RAF for certain WebKit versions in Framer Studio or Desktop
    const webkitVersion = Utils.webkitVersion();
    if (webkitVersion > 600 && webkitVersion < 601) {
      if (Utils.isFramerStudio() || Utils.isDesktop()) {
        this.raf = false;
      }
    }

    // To avoid EventEmitter warning
    this.maximumListeners = Infinity;

    // Bind start method
    this.start = this.start.bind(this);
  }

  start() {
    let previousTime = getTime();

    const update = () => {
      let deltaTime;
      if (this.delta) {
        deltaTime = this.delta;
      } else {
        const currentTime = getTime();
        deltaTime = (currentTime - previousTime) / 1000;
        previousTime = currentTime;
      }

      this.emit("update", deltaTime);
      this.emit("render", deltaTime);
    };

    const tick = () => {
      if (this.raf) {
        window.requestAnimationFrame(tick);
        update();
      } else {
        setTimeout(() => {
          window.requestAnimationFrame(tick);
          update();
        }, 0);
      }
    };

    tick();
  }
}
