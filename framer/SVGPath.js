import { SVGBaseLayer } from "./SVGBaseLayer.js";
import { SVG } from "./SVG.js";
import { layerProperty } from "./Layer.js";

const dasharrayTransform = (value) => {
  if (typeof value === "string") {
    let values = value.includes(",") ? value.split(",") : value.split(" ");
    return values.map((v) => parseFloat(v.trim())).filter((v) => !isNaN(v));
  }
  return value;
};

const dashoffsetTransform = (value) => {
  const v = parseFloat(value);
  return isNaN(v) ? null : v;
};

export class SVGPath extends SVGBaseLayer {
  static initClass() {
    const defineProp = (name, validator, transformer, options = {}) =>
      this.define(
        name,
        layerProperty(this, name, name, null, validator, transformer, options)
      );

    defineProp("fill", SVG.validFill, SVG.toFill);
    defineProp("stroke", SVG.validFill, SVG.toFill);
    defineProp("strokeWidth", Number.isFinite, parseFloat);
    defineProp("strokeLinecap", (val) => typeof val === "string");
    defineProp("strokeLinejoin", (val) => typeof val === "string");
    defineProp("strokeMiterlimit", Number.isFinite, parseFloat);
    defineProp("strokeOpacity", Number.isFinite, parseFloat);
    defineProp("strokeDasharray", Array.isArray, dasharrayTransform);
    defineProp("strokeDashoffset", Number.isFinite, dashoffsetTransform);

    // strokeLength
    this.define(
      "strokeLength",
      layerProperty(
        this,
        "strokeLength",
        null,
        undefined,
        Number.isFinite,
        (value, path) => Math.max(0, Math.min(value, path.length)),
        {},
        (path, value) => {
          const strokeStart = path.strokeStart ?? 0;
          let strokeEnd = strokeStart + value;
          if (strokeEnd > path.length) strokeEnd -= path.length;
          Object.assign(path._properties, {
            strokeStart,
            strokeEnd,
            strokeFraction: value / path.length,
          });
          return path.updateStroke();
        }
      )
    );

    this.define(
      "strokeFraction",
      layerProperty(
        this,
        "strokeFraction",
        null,
        undefined,
        Number.isFinite,
        (value, path) => Math.max(0, Math.min(value, 1)),
        {},
        (path, value) => (path.strokeLength = path.length * value)
      )
    );

    const strokeStartEndUpdater = (path, value, isStart = true) => {
      const strokeStart = path.strokeStart ?? 0;
      const strokeEnd = path.strokeEnd ?? path.strokeLength;
      if (isStart) {
        const left = strokeEnd ?? path.length;
        path.strokeLength =
          left >= value ? left - value : path.length - value + left;
      } else {
        path.strokeLength =
          value >= strokeStart
            ? value - strokeStart
            : path.length - strokeStart + value;
      }
    };

    this.define(
      "strokeStart",
      layerProperty(
        this,
        "strokeStart",
        null,
        undefined,
        Number.isFinite,
        (v, p) => Math.max(0, Math.min(v, p.length)),
        {},
        (p, v) => strokeStartEndUpdater(p, v, true)
      )
    );
    this.define(
      "strokeEnd",
      layerProperty(
        this,
        "strokeEnd",
        null,
        undefined,
        Number.isFinite,
        (v, p) => Math.max(0, Math.min(v, p.length)),
        {},
        (p, v) => strokeStartEndUpdater(p, v, false)
      )
    );

    this.define("length", {
      get() {
        return this._length;
      },
    });
    this.define("reversed", this.simpleProperty("reversed", false));
  }

  constructor(path, options = {}) {
    super({ element: path, ...options });

    if (path instanceof SVGPath) path = path.element;

    if (path instanceof SVGPathElement) {
      this._path = path;
    } else if (path instanceof SVGUseElement) {
      const link = path.getAttribute("xlink:href");
      this._path = this._svg.querySelector(link);
    }

    this._length = this._path.getTotalLength();
  }

  updateStroke() {
    const startLength = this.strokeStart ?? 0;
    const endLength = this.strokeEnd ?? this.length;
    let dasharray = [];
    let remaining;

    if (endLength === startLength) {
      if (startLength) dasharray.push(0, startLength);
      remaining = this.length - endLength;
      if (remaining) dasharray.push(0, remaining);
    } else if (endLength < startLength) {
      const gap = startLength - endLength;
      remaining = this.length - startLength;
      dasharray.push(endLength, gap);
      if (remaining) dasharray.push(remaining, 0);
    } else {
      const length = endLength - startLength;
      remaining = this.length - endLength;
      if (startLength) dasharray.push(0, startLength);
      if (length !== this.length || length !== 0 || startLength === 0) {
        dasharray.push(length);
        if (length !== remaining && remaining) dasharray.push(remaining);
      }
    }

    if (this.reversed) {
      if (dasharray.length % 2 === 0) dasharray.push(0);
      dasharray.reverse();
    }

    this.strokeDasharray = dasharray;
  }

  pointAtFraction(fraction) {
    if (this.reversed) fraction = 1 - fraction;
    return this._path.getPointAtLength(this.length * fraction);
  }

  rotationAtFraction(fraction, delta = 0.01) {
    if (this.reversed) fraction = 1 - fraction;
    delta = Math.max(delta, 0.01);
    const from = this.pointAtFraction(Math.max(fraction - delta, 0));
    const to = this.pointAtFraction(Math.min(fraction + delta, 1));
    let angle = (Math.atan2(from.y - to.y, from.x - to.x) * 180) / Math.PI - 90;
    if (this.reversed) angle = 360 - angle;
    return angle;
  }

  start(relativeToLayer = null) {
    const point = this.convertPointToLayer(
      this.pointAtFraction(0),
      relativeToLayer?.parent,
      false
    );
    point.rotation = this.rotationAtFraction(0);
    return point;
  }

  end(relativeToLayer = null) {
    const point = this.convertPointToLayer(
      this.pointAtFraction(1),
      relativeToLayer?.parent,
      false
    );
    point.rotation = this.rotationAtFraction(1);
    return point;
  }

  valueUpdater(axis, target, offset) {
    switch (axis) {
      case "horizontal":
        offset -= this.pointAtFraction(0).x;
        return (key, value) =>
          (target[key] = offset + this.pointAtFraction(value).x);
      case "vertical":
        offset -= this.pointAtFraction(0).y;
        return (key, value) =>
          (target[key] = offset + this.pointAtFraction(value).y);
      case "angle":
        offset -= this.rotationAtFraction(0);
        return (key, value, delta = 0) => {
          if (delta === 0) return;
          target[key] = offset + this.rotationAtFraction(value, delta);
        };
    }
  }
}

SVGPath.initClass();
