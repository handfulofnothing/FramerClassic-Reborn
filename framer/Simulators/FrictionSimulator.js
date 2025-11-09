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

exports.FrictionSimulator = class FrictionSimulator extends Simulator {

	constructor(...args) {
		this.finished = this.finished.bind(this);
		super(...args);
	}

	setup(options) {

		this.options = Defaults.getDefaults("FrictionSimulator", options);
		this.options = _.defaults(options, {
			velocity: 0,
			position: 0
		}
		);

		this._state = {
			x: this.options.position,
			v: this.options.velocity
		};

		return this._integrator = new Integrator(state => {
			return - (this.options.friction * state.v);
		});
	}

	next(delta) {

		this._state = this._integrator.integrateState(this._state, delta);

		return this._state;
	}

	finished() {

		return Math.abs(this._state.v) < this.options.tolerance;
	}
};
