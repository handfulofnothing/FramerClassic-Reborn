/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Animator} = require("./Animator");

exports.SpringDHOAnimator = class SpringDHOAnimator extends Animator {

	constructor(...args) {
		this.finished = this.finished.bind(this);
		super(...args);
	}

	setup(options) {

		this.options = _.defaults(options, {
			velocity: 0,
			tolerance: 1 / 10000,
			stiffness: 50,
			damping: 2,
			mass: 0.2,
			time: null
		}
		); // Hack

		this._time = 0;
		this._value = 0;
		return this._velocity = this.options.velocity;
	}

	next(delta) {

		if (this.finished()) {
			return 1;
		}

		this._time += delta;

		// See the not science comment above
		const k = 0 - this.options.stiffness;
		const b = 0 - this.options.damping;

		const F_spring = k * ((this._value) - 1);
		const F_damper = b * (this._velocity);

		this._velocity += ((F_spring + F_damper) / this.options.mass) * delta;
		this._value += this._velocity * delta;

		return this._value;
	}

	finished() {
		return (this._time > 0) && (Math.abs(this._velocity) < this.options.tolerance);
	}
};
