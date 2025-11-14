import { Animator } from "./Animator.js";
import { Integrator } from "../Integrator.js";
import _ from "lodash-es"; // assuming lodash-es is available

export class SpringRK4Animator extends Animator {
  _time = 0;
  _value = 0;
  _velocity = 0;
  _stopSpring = false;
  _integrator = null;
  options = {};

  constructor(...args) {
    super(...args);
    // bind finished if used as a callback
    this.finished = this.finished.bind(this);
  }

  setup(options = {}) {
    this.options = _.defaults(options, {
      tension: 250,
      friction: 25,
      velocity: 0,
      tolerance: 1 / 1000,
    });

    this._time = 0;
    this._value = 0;
    this._velocity = this.options.velocity;
    this._stopSpring = false;

    this._integrator = new Integrator((state) => {
      return -this.options.tension * state.x - this.options.friction * state.v;
    });
  }

  next(delta) {
    if (this.finished()) return 1;

    this._time += delta;

    const stateBefore = {
      x: this._value - 1,
      v: this._velocity,
    };

    const stateAfter = this._integrator.integrateState(stateBefore, delta);

    this._value = 1 + stateAfter.x;
    this._velocity = stateAfter.v;

    const netValueIsLow = Math.abs(stateAfter.x) < this.options.tolerance;
    const netVelocityIsLow = Math.abs(stateAfter.v) < this.options.tolerance;

    this._stopSpring = netValueIsLow && netVelocityIsLow;

    return this._value;
  }

  finished() {
    return this._stopSpring;
  }
}
