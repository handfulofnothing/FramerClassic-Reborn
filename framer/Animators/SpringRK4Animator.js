/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Animator} = require("./Animator");
const {Integrator} = require("../Integrator");

exports.SpringRK4Animator = class SpringRK4Animator extends Animator {

	constructor(...args) {
		this.finished = this.finished.bind(this);
		super(...args);
	}

	setup(options) {

		this.options = _.defaults(options, {
			tension: 250,
			friction: 25,
			velocity: 0,
			tolerance: 1 / 1000
		}
		);

		this._time = 0;
		this._value = 0;
		this._velocity = this.options.velocity;
		this._stopSpring = false;

		return this._integrator = new Integrator(state => {
			return (- this.options.tension * state.x) - (this.options.friction * state.v);
		});
	}

	next(delta) {

		if (this.finished()) {
			return 1;
		}

		this._time += delta;

		const stateBefore = {};
		let stateAfter = {};

		// Calculate previous state
		stateBefore.x = this._value - 1;
		stateBefore.v = this._velocity;

		// Calculate new state
		stateAfter = this._integrator.integrateState(stateBefore, delta);
		this._value = 1 + stateAfter.x;
		const finalVelocity = stateAfter.v;
		const netFloat = stateAfter.x;
		const net1DVelocity = stateAfter.v;

		// See if we reached the end state
		const netValueIsLow = Math.abs(netFloat) < this.options.tolerance;
		const netVelocityIsLow = Math.abs(net1DVelocity) < this.options.tolerance;

		this._stopSpring = netValueIsLow && netVelocityIsLow;
		this._velocity = finalVelocity;

		return this._value;
	}

	finished() {
		return this._stopSpring;
	}
};
