import { Animator } from "./Animator.js";
import _ from "lodash"; // assuming lodash is available

const BezierCurveDefaults = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
};

export class BezierCurveAnimator extends Animator {
  _time = 0;
  options = {};
  _unitBezier = null;

  setup(options) {
    // Input is a named bezier curve string
    if (
      _.isString(options) &&
      BezierCurveDefaults.hasOwnProperty(options.toLowerCase())
    ) {
      options = { values: BezierCurveDefaults[options.toLowerCase()] };
    }

    // Input.values is a named bezier curve string
    if (
      options.values &&
      _.isString(options.values) &&
      BezierCurveDefaults.hasOwnProperty(options.values.toLowerCase())
    ) {
      options = {
        values: BezierCurveDefaults[options.values.toLowerCase()],
        time: options.time,
      };
    }

    // Input is a single array of 4 values
    if (_.isArray(options) && options.length === 4) {
      options = { values: options };
    }

    this.options = _.defaults(options, {
      values: BezierCurveDefaults.ease,
      time: 1,
      precision: 1 / 1000,
    });

    this._time = 0;
    this._unitBezier = new UnitBezier(...this.options.values);
  }

  next(delta) {
    this._time += delta;

    if (this.finished()) {
      return 1;
    }

    return this._unitBezier.solve(this._time / this.options.time);
  }

  finished() {
    return this._time >= this.options.time - this.options.precision;
  }
}

// ES6 UnitBezier class
class UnitBezier {
  epsilon = 1e-6; // precision

  constructor(p1x, p1y, p2x, p2y) {
    // Pre-calculate polynomial coefficients
    this.cx = 3.0 * p1x;
    this.bx = 3.0 * (p2x - p1x) - this.cx;
    this.ax = 1.0 - this.cx - this.bx;

    this.cy = 3.0 * p1y;
    this.by = 3.0 * (p2y - p1y) - this.cy;
    this.ay = 1.0 - this.cy - this.by;
  }

  sampleCurveX(t) {
    return ((this.ax * t + this.bx) * t + this.cx) * t;
  }

  sampleCurveY(t) {
    return ((this.ay * t + this.by) * t + this.cy) * t;
  }

  sampleCurveDerivativeX(t) {
    return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  }

  solveCurveX(x) {
    let t2 = x;
    let x2;
    let d2;

    // Newton-Raphson method
    for (let i = 0; i < 8; i++) {
      x2 = this.sampleCurveX(t2) - x;
      if (Math.abs(x2) < this.epsilon) return t2;
      d2 = this.sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < this.epsilon) break;
      t2 -= x2 / d2;
    }

    // Bisection method
    let t0 = 0;
    let t1 = 1;
    t2 = x;

    if (t2 < t0) return t0;
    if (t2 > t1) return t1;

    while (t0 < t1) {
      x2 = this.sampleCurveX(t2);
      if (Math.abs(x2 - x) < this.epsilon) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 + t0) / 2;
    }

    return t2; // fallback
  }

  solve(x) {
    return this.sampleCurveY(this.solveCurveX(x));
  }
}
