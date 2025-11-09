import Utils from "./Utils.js";
import { BaseClass } from "./BaseClass.js";
import { Events as BaseEvents } from "./Events.js";
import { Gestures } from "./Gestures.js";

// Extend Events
export const Events = {
  ...BaseEvents,
  PinchStart: "pinchstart",
  Pinch: "pinch",
  PinchEnd: "pinchend",
  RotateStart: "rotatestart",
  Rotate: "rotate",
  RotateEnd: "rotateend",
  ScaleStart: "scalestart",
  Scale: "scale",
  ScaleEnd: "scaleend",
};

export class LayerPinchable extends BaseClass {
  static initClass() {
    // Properties
    this.define("enabled", this.simpleProperty("enabled", true));
    this.define("threshold", this.simpleProperty("threshold", 0));
    this.define("centerOrigin", this.simpleProperty("centerOrigin", true));

    this.define("scale", this.simpleProperty("scale", true));
    this.define("scaleIncrements", this.simpleProperty("scaleIncrements", 0));
    this.define("minScale", this.simpleProperty("minScale", 0));
    this.define("maxScale", this.simpleProperty("maxScale", Number.MAX_VALUE));
    this.define("scaleFactor", this.simpleProperty("scaleFactor", 1));

    this.define("rotate", this.simpleProperty("rotate", true));
    this.define("rotateIncrements", this.simpleProperty("rotateIncrements", 0));
    this.define("rotateMin", this.simpleProperty("rotateMin", 0));
    this.define("rotateMax", this.simpleProperty("rotateMax", 0));
    this.define("rotateFactor", this.simpleProperty("rotateFactor", 1));
  }

  constructor(layer) {
    super();
    this.layer = layer;

    this._centerOrigin = this._centerOrigin.bind(this);
    this._pinchStart = this._pinchStart.bind(this);
    this._pinch = this._pinch.bind(this);
    this._pinchEnd = this._pinchEnd.bind(this);
    this._tapStart = this._tapStart?.bind(this);

    this._attach();
  }

  _attach() {
    this.layer.on(Gestures.PinchStart, this._pinchStart);
    this.layer.on(Gestures.Pinch, this._pinch);
    this.layer.on(Gestures.PinchEnd, this._pinchEnd);
    this.layer.on(Gestures.TapStart, this._tapStart);
  }

  _reset() {
    this._scaleStart = null;
    this._rotationStart = null;
    this._rotationOffset = null;
  }

  _tapStart(event) {
    // Placeholder for optional tap behavior
    // if (this.centerOrigin) this._centerOrigin(event);
  }

  _centerOrigin(event) {
    const topBefore = Utils.convertPoint({}, this.layer, this.layer.superLayer);
    const pinchLocation = Utils.convertPointFromContext(
      event.touchCenter,
      this.layer,
      true,
      true
    );

    this.layer.originX = pinchLocation.x / this.layer.width;
    this.layer.originY = pinchLocation.y / this.layer.height;

    const topAfter = Utils.convertPoint({}, this.layer, this.layer.superLayer);
    const originDelta = {
      x: topAfter.x - topBefore.x,
      y: topAfter.y - topBefore.y,
    };

    this.layer.x -= originDelta.x;
    this.layer.y -= originDelta.y;
  }

  _pinchStart(event) {
    this._reset();
    if (this.centerOrigin) this._centerOrigin(event);
    this.normalizeRotation = Utils.rotationNormalizer();
  }

  _pinch(event) {
    if (
      event.fingers !== 2 ||
      !this.enabled ||
      event.touchDistance <= this.threshold
    )
      return;

    // Handle scaling
    if (this.scale) {
      if (this._scaleStart == null) this._scaleStart = this.layer.scale;
      let scale = ((event.scale - 1) * this.scaleFactor + 1) * this._scaleStart;

      if (this.minScale && this.maxScale) {
        scale = Utils.clamp(scale, this.minScale, this.maxScale);
      } else if (this.minScale) {
        scale = Utils.clamp(scale, this.minScale, 1e6);
      } else if (this.maxScale) {
        scale = Utils.clamp(scale, 1e-5, this.maxScale);
      }

      if (this.scaleIncrements)
        scale = Utils.nearestIncrement(scale, this.scaleIncrements);
      this.layer.scale = scale;
      this.emit(Events.Scale, event);
    }

    // Handle rotation
    if (this.rotate) {
      if (this._rotationStart == null)
        this._rotationStart = this.layer.rotation;
      if (this._rotationOffset == null) this._rotationOffset = event.rotation;

      let rotation =
        event.rotation - this._rotationOffset + this._rotationStart;
      rotation *= this.rotateFactor;
      rotation = this.normalizeRotation(rotation);

      if (this.rotateMin && this.rotateMax)
        rotation = Utils.clamp(rotation, this.rotateMin, this.rotateMax);
      if (this.rotateIncrements)
        rotation = Utils.nearestIncrement(rotation, this.rotateIncrements);

      this.layer.rotation = rotation;
      this.emit(Events.Rotate, event);
    }
  }

  _pinchEnd(event) {
    this._reset();
  }
}

LayerPinchable.initClass();
