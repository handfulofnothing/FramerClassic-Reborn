import _ from "./Underscore.js";

export class Integrator {
  static initClass() {
    `
Usage:
  - Instantiate with a function that takes (state) -> acceleration
  - Call integrateState with state={x, v} and delta
    `;
  }

  constructor(accelerationForState) {
    this._accelerationForState = accelerationForState;

    if (!_.isFunction(this._accelerationForState)) {
      console.warn(
        "Integrator: an integrator must be constructed with an acceleration function"
      );
      this._accelerationForState = () => 0;
    }
  }

  integrateState(state, dt) {
    const a = this._evaluateState(state);
    const b = this._evaluateStateWithDerivative(state, dt * 0.5, a);
    const c = this._evaluateStateWithDerivative(state, dt * 0.5, b);
    const d = this._evaluateStateWithDerivative(state, dt, c);

    const dxdt = (1 / 6) * (a.dx + 2 * (b.dx + c.dx) + d.dx);
    const dvdt = (1 / 6) * (a.dv + 2 * (b.dv + c.dv) + d.dv);

    state.x += dxdt * dt;
    state.v += dvdt * dt;

    return state;
  }

  _evaluateState(initialState) {
    return {
      dx: initialState.v,
      dv: this._accelerationForState(initialState),
    };
  }

  _evaluateStateWithDerivative(initialState, dt, derivative) {
    const state = {
      x: initialState.x + derivative.dx * dt,
      v: initialState.v + derivative.dv * dt,
    };

    return {
      dx: state.v,
      dv: this._accelerationForState(state),
    };
  }
}

Integrator.initClass();
