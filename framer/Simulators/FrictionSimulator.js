import { Defaults } from "../Defaults.js";
import { Simulator } from "../Simulator.js";
import { Integrator } from "../Integrator.js";

export class FrictionSimulator extends Simulator {
  constructor(...args) {
    super(...args);
    this.finished = this.finished.bind(this);
  }

  setup(options) {
    this.options = Defaults.getDefaults("FrictionSimulator", options);
    this.options = _.defaults(options, {
      velocity: 0,
      position: 0,
    });

    this._state = {
      x: this.options.position,
      v: this.options.velocity,
    };

    return (this._integrator = new Integrator((state) => {
      return -(this.options.friction * state.v);
    }));
  }

  next(delta) {
    this._state = this._integrator.integrateState(this._state, delta);

    return this._state;
  }

  finished() {
    return Math.abs(this._state.v) < this.options.tolerance;
  }
}
