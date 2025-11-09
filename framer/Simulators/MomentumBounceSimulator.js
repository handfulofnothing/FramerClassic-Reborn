/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */

const Utils = require("../Utils");

const {Defaults}   = require("../Defaults");
const {Simulator} = require("../Simulator");

const {SpringSimulator} = require("./SpringSimulator");
const {FrictionSimulator} = require("./FrictionSimulator");

exports.MomentumBounceSimulator = class MomentumBounceSimulator extends Simulator {

	constructor(...args) {
		this.finished = this.finished.bind(this);
		super(...args);
	}

	setup(options) {

		this.options = Defaults.getDefaults("MomentumBounceSimulator", options);
		this.options = _.defaults(options, {
			velocity: 0,
			position: 0,
			min: 0,
			max: 0
		}
		);

		this._frictionSimulator = new FrictionSimulator({
			friction: this.options.momentum.friction,
			tolerance: this.options.momentum.tolerance,
			velocity: this.options.velocity,
			position: this.options.position
		});

		this._springSimulator = new SpringSimulator({
			tension: this.options.bounce.tension,
			friction: this.options.bounce.friction,
			tolerance: this.options.bounce.tolerance,
			velocity: this.options.velocity,
			position: this.options.position
		});

		this._state = {
			x: this.options.position,
			v: this.options.velocity
		};

		return this._useSpring = false;
	}

	next(delta) {

		if (this._useSpring) {
			this._state = this._springSimulator.next(delta);
		} else {
			this._state = this._frictionSimulator.next(delta);
			this._tryTransitionToSpring(this._state);
		}

		return this._state;
	}

	finished() {
		if (this._useSpring) { return this._springSimulator.finished(); }
		return this._frictionSimulator.finished();
	}

	setState(state) {

		this._state = {
			x: state.x,
			v: state.v
		};

		this._frictionSimulator.setState(this._state);

		if (this._isValidState()) {
			return this._tryTransitionToSpring();
		} else {
			let bound;
			if (this._state.x <= this.options.min) { bound = this.options.min; }
			if (this._state.x >= this.options.max) { bound = this.options.max; }
			return this._transitionToSpring(bound);
		}
	}

	// If the position is outside the min and max bounds, and traveling
	// further away, then transition from friction to spring simulation
	_tryTransitionToSpring(force) {

		const belowMinWithVelocity = (this._state.x < this.options.min) && (this._state.v <= 0);
		const aboveMaxWithVelocity = (this._state.x > this.options.max) && (this._state.v >= 0);

		if (belowMinWithVelocity || aboveMaxWithVelocity) {
			let bound;
			if (belowMinWithVelocity) { bound = this.options.min; }
			if (aboveMaxWithVelocity) { bound = this.options.max; }
			return this._transitionToSpring(bound);
		} else {
			return this._useSpring = false;
		}
	}

	_transitionToSpring(bound) {
		this._useSpring = true;
		this._springSimulator.options.offset = bound;
		return this._springSimulator.setState(this._state);
	}

	// If the position is outside the min and max bounds, but traveling
	// back towards the bounds, check if the velocity is sufficient to
	// carry the position back within bounds. If it is, let friction do the
	// work. If not, the state is invalid, so use the spring.
	_isValidState() {

		// Note that if velocity is 0, the state is still valid (should use spring,
		// not friction), and we don't want to divide by 0 later in the check.
		let bound;
		const belowMinTravelingBack = (this._state.x < this.options.min) && (this._state.v > 0);
		const aboveMaxTravelingBack = (this._state.x > this.options.max) && (this._state.v < 0);

		let check = false;

		if (belowMinTravelingBack) {
			bound = this.options.min;
			check = true;
		} else if (aboveMaxTravelingBack) {
			bound = this.options.max;
			check = true;
		}

		if (check) {
			const {
                friction
            } = this._frictionSimulator.options;
			const solution = 1 - ((friction * (bound - this._state.x)) / this._state.v);

			return solution > 0;
		}

		return true;
	}
};

	// The math behind _isValidState:
	//
	// 1. Integrate the friction simulator's acceleration to find velocity
	//
	//         a = - k * v
	//     dv/dt = - k * v
	// Int(dv/v) = - k * Int(dt)
	//      ln v = - k * t + C
	//
	// => Solve for C at t = 0
	//
	// ln v(0) = - k * 0 + C
	// ln v(0) = C
	//
	// => Plug C back into v(t)
	//
	//     ln v = - k * t + ln v(0)
	// e^(ln v) = e^(- k * t) + e^(ln v(0))
	//        v = v(0) * e^(- k * t)
	//
	// 2. Integrate velocity to find position
	//
	// Int(v) = v(0) * Int(e^(- k * t))
	//      x = - v(0) * e^(-k * t) / k + C
	//
	// => Solve for C at t = 0
	//
	//            x(0) = - v(0) * e^(-k * 0) / k + C
	//            x(0) = - v(0) / k + C
	// x(0) + v(0) / k = C
	//
	// => Plug C back into x(t)
	//
	// x = - v(0) * e^(-k * t) / k + x(0) + v(0) / k
	//
	// 3. Check if a (real) solution exists for t for position x
	//
	//                                x = - v(0) * e^(-k * t) / k + x(0) + v(0) / k
	//                         x - x(0) = - v(0) * e^(-k * t) / k + v(0) / k
	//                   k * (x - x(0)) = - v(0) * e^(-k * t) + v(0)
	//            k * (x - x(0)) - v(0) = - v(0) * e^(-k * t)
	// (k * (x - x(0)) - v(0)) / - v(0) = e^(-k * t)
	//       1 - (k * (x - x(0)) / v(0) = e^(-k * t)
	//   ln(1 - (k * (x - x(0)) / v(0)) = -k * t
	//
	// Therefore, a real solution exists if 1 - (k * (x - x(0)) / v(0) > 0
