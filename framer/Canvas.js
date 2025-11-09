import { BaseClass } from "./BaseClass.js";
import { Events } from "./Events.js";
import Utils from "./Utils.js";

export class Canvas extends BaseClass {
  static initClass() {
    this.define("width", { get: () => window.innerWidth });
    this.define("height", { get: () => window.innerHeight });
    this.define("size", { get: () => Utils.size(this) });
    this.define("frame", { get: () => Utils.frame(this) });

    this.define("backgroundColor", {
      importable: false,
      exportable: false,
      get: () => Framer.Device.background.backgroundColor,
      set: (value) => (Framer.Device.background.backgroundColor = value),
    });

    this.define("image", {
      importable: false,
      exportable: false,
      get: () => Framer.Device.background.image,
      set: (value) => (Framer.Device.background.image = value),
    });
  }

  constructor(options = {}) {
    super(options);
    this._handleResize = this._handleResize.bind(this);
    Events.wrap(window).addEventListener("resize", this._handleResize);
  }

  onResize(cb) {
    return this.on("resize", cb);
  }

  _handleResize(event) {
    if (!Screen.device) {
      Screen.emit("resize");
    }
    this.emit("resize");
    this.emit("change:width");
    this.emit("change:height");
    this.emit("change:size");
    this.emit("change:frame");
  }

  toInspect() {
    return `<${this.constructor.name} ${this.width}x${this.height}>`;
  }

  // Point Conversion
  convertPointToLayer(point, layer) {
    return Utils.convertPointFromContext(point, layer, true, true);
  }

  convertPointToScreen(point) {
    const ctx = Framer.Device.context;
    return Utils.convertPointFromContext(point, ctx, true, true);
  }
}

// Initialize static definitions
Canvas.initClass();
