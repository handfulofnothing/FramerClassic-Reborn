/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("./Utils");

const {_} = require("./Underscore");
const {Config} = require("./Config");
const {BaseClass} = require("./BaseClass");

const Cls = (exports.Simulator = class Simulator extends BaseClass {
	static initClass() {
	
		`\
The simulator class runs a physics simulation based on a set of input values
at setup({input values}), and emits an output state {x, v}\
`;
	
		this.define("state", {
			get() { return _.clone(this._state); },
			set(state) { return this._state = _.clone(state); }
		}
		);
	}


	constructor(options) {
		if (options == null) { options = {}; }
		this._state = {x: 0, v: 0};
		this.options = null;
		this.setup(options);
	}

	setup(options) {
		throw Error("Not implemented");
	}

	next(delta) {
		throw Error("Not implemented");
	}

	finished() {
		throw Error("Not implemented");
	}

	setState(state) {
		return this._state = state;
	}
});
Cls.initClass();
