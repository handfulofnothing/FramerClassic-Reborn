/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("../Utils");
const {Defaults}   = require("../Defaults");

const {Simulator} = require("../Simulator");
const {Integrator} = require("../Integrator");

exports.SpringSimulator = class SpringSimulator extends Simulator {

	constructor(...args) {
		this.finished = this.finished.bind(this);
		super(...args);
	}

	setup(options) {

		this.options = Defaults.getDefaults("SpringSimulator", options);
		this.options = _.defaults(options, {
			velocity: 0,
			position: 0,
			offset: 0
		}
		);

		this._state = {
			x: this.options.position,
			v: this.options.velocity
		};

		return this._integrator = new Integrator(state => {
			return (- this.options.tension * state.x) - (this.options.friction * state.v);
		});
	}

	next(delta) {
		this._state = this._integrator.integrateState(this._state, delta);

		// Return a copy of the state so it cannot be modified
		return this.getState();
	}

	finished() {
		const positionNearZero = Math.abs(this._state.x) < this.options.tolerance;
		const velocityNearZero = Math.abs(this._state.v) < this.options.tolerance;
		return positionNearZero && velocityNearZero;
	}

	// Internally, the spring always rests at state.x == 0. However, since it's a
	// common use case to rest at a non-zero position, offset is automatically
	// applied to position for convenience when interfacing with the outside world.
	setState(state) {
		return this._state = {
			x: state.x - this.options.offset,
			v: state.v
		};
	}

	getState() {
		let state;
		return state = {
			x: this._state.x + this.options.offset,
			v: this._state.v
		};
	}
};
