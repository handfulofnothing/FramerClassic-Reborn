import { Layer } from "../Layer.js";
import { Color } from "../Color.js"; // Assuming you have a Color utility
import { Utils } from "../Utils.js";
import _ from "lodash-es";

export class CircularProgressComponent extends Layer {
  // Class fields with defaults
  _strokeWidth = 1;
  _progress = 0;
  _progressColor = Color.grey(1);

  constructor(options = {}) {
    super(options);

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
    this.svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );

    this.backgroundColor = null;
    this.rotation = -90;

    this.rails = this.addShape("circle");
    this.rails.setAttribute("fill", "transparent");

    this.circle = this.addShape("circle");
    this.circle.setAttribute("fill", "transparent");

    this.strokeWidth = 1;
    this.progress = 0;

    this.railsColor = Color.grey(0.2);
    this.progressColor = Color.grey(1);

    this._element.appendChild(this.svg);
  }

  // Computed radius
  get radius() {
    return this.width / 2 - this.strokeWidth / 2;
  }

  get strokeWidth() {
    return this._strokeWidth;
  }

  set strokeWidth(value) {
    this._strokeWidth = value;

    // Update rails
    this.rails.cx.baseVal.value = this.width / 2;
    this.rails.cy.baseVal.value = this.width / 2;
    this.rails.r.baseVal.value = this.radius;
    this.rails.setAttribute("stroke-width", value);

    // Update circle
    this.circle.cx.baseVal.value = this.width / 2;
    this.circle.cy.baseVal.value = this.width / 2;
    this.circle.r.baseVal.value = this.radius;
    this.circle.setAttribute("stroke-width", value);
  }

  get progressColor() {
    return this._progressColor;
  }

  set progressColor(value) {
    this._progressColor = value;
    this.circle.setAttribute("stroke", value);
  }

  get railsColor() {
    return this._railsColor || Color.grey(0.1);
  }

  set railsColor(value) {
    this._railsColor = value;
    this.rails.setAttribute("stroke", value);
  }

  get progress() {
    return this._progress;
  }

  set progress(value) {
    this._progress = Utils.clamp(value, 0, 1);
    const strokeDashArray = this.radius * Math.PI * 2;
    const strokeDashOffset = (1 - this._progress) * strokeDashArray;
    this.circle.setAttribute("stroke-dasharray", strokeDashArray);
    this.circle.setAttribute("stroke-dashoffset", strokeDashOffset);
  }

  addShape(type) {
    const shape = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.svg.appendChild(shape);
    return shape;
  }

  setProgress(value, animated = true, animationOptions = {}) {
    if (!animated) {
      this.progress = value;
      return;
    }

    const dynamicTime = Math.abs(this.progress - value) * 0.3;
    animationOptions = _.defaults(animationOptions, {
      curve: "linear",
      time: dynamicTime,
    });
    const animationProperties = { progress: Utils.clamp(value, 0, 1) };

    return this.animate(animationProperties, animationOptions);
  }
}
