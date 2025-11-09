import { Animator } from "./Animator.js";
import _ from "lodash"; // assuming lodash is available

export class SpringDHOAnimator extends Animator {
  _time = 0;
  _value = 0;
  _velocity = 0;
  options = {};

  constructor(...args) {
    super(...args);
    // bind finished if it will be used as a callback
    this.finished = this.finished.bind(this);
  }

  setup(options = {}) {
    this.options = _.defaults(options, {
      velocity: 0,
      tolerance: 1 / 10000,
      stiffness: 50,
      damping: 2,
      mass: 0.2,
      time: null,
    });

    this._time = 0;
    this._value = 0;
    this._velocity = this.options.velocity;
  }

  next(delta) {
    if (this.finished()) return 1;

    this._time += delta;

    const k = -this.options.stiffness;
    const b = -this.options.damping;

    const F_spring = k * (this._value - 1);
    const F_damper = b * this._velocity;

    this._velocity += ((F_spring + F_damper) / this.options.mass) * delta;
    this._value += this._velocity * delta;

    return this._value;
  }

  finished() {
    return this._time > 0 && Math.abs(this._velocity) < this.options.tolerance;
  }
}
