/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Animator} = require("./Animator");

const BezierCurveDefaults = {
	"linear": [0, 0, 1, 1],
	"ease": [.25, .1, .25, 1],
	"ease-in": [.42, 0, 1, 1],
	"ease-out": [0, 0, .58, 1],
	"ease-in-out": [.42, 0, .58, 1]
};

exports.BezierCurveAnimator = class BezierCurveAnimator extends Animator {

	setup(options) {

		// Input is a one of the named bezier curves
		if (_.isString(options) && BezierCurveDefaults.hasOwnProperty(options.toLowerCase())) {
			options = {values: BezierCurveDefaults[options.toLowerCase()]};
		}

		// Input values is one of the named bezier curves
		if (options.values && _.isString(options.values) && BezierCurveDefaults.hasOwnProperty(options.values.toLowerCase())) {
			options = {values: BezierCurveDefaults[options.values.toLowerCase()], time: options.time};
		}

		// Input is a single array of 4 values
		if (_.isArray(options) && (options.length === 4)) {
			options = {values: options};
		}

		this.options = _.defaults(options, {
			values: BezierCurveDefaults["ease"],
			time: 1,
			precision: 1 / 1000
		}
		);

		return this._unitBezier = new UnitBezier( 
			this.options.values[0],
			this.options.values[1],
			this.options.values[2],
			this.options.values[3],

		(this._time = 0));
	}


	next(delta) {

		this._time += delta;

		if (this.finished()) {
			return 1;
		}

		return this._unitBezier.solve(this._time / this.options.time);
	}

	finished() {
		return this._time >= (this.options.time - this.options.precision);
	}
};


// WebKit implementation found on http://stackoverflow.com/a/11697909

class UnitBezier {
	static initClass() {
	
		this.prototype.epsilon = 1e-6;
		 // Precision
	}

	constructor(p1x, p1y, p2x, p2y) {

		// pre-calculate the polynomial coefficients
		// First and last control points are implied to be (0, 0) and (1.0, 1.0)
		this.cx = 3.0 * p1x;
		this.bx = (3.0 * (p2x - p1x)) - this.cx;
		this.ax = 1.0 - this.cx - this.bx;
		this.cy = 3.0 * p1y;
		this.by = (3.0 * (p2y - p1y)) - this.cy;
		this.ay = 1.0 - this.cy - this.by;
	}

	sampleCurveX(t) {
		return ((((this.ax * t) + this.bx) * t) + this.cx) * t;
	}

	sampleCurveY(t) {
		return ((((this.ay * t) + this.by) * t) + this.cy) * t;
	}

	sampleCurveDerivativeX(t) {
		return (((3.0 * this.ax * t) + (2.0 * this.bx)) * t) + this.cx;
	}

	solveCurveX(x) {

		// First try a few iterations of Newton's method -- normally very fast.
		let x2;
		let t2 = x;
		let i = 0;

		while (i < 8) {
			x2 = this.sampleCurveX(t2) - x;
			if (Math.abs(x2) < this.epsilon) { return t2; }
			var d2 = this.sampleCurveDerivativeX(t2);
			if (Math.abs(d2) < this.epsilon) { break; }
			t2 = t2 - (x2 / d2);
			i++;
		}

		// No solution found - use bi-section
		let t0 = 0.0;
		let t1 = 1.0;
		t2 = x;
		if (t2 < t0) { return t0; }
		if (t2 > t1) { return t1; }
		while (t0 < t1) {
			x2 = this.sampleCurveX(t2);
			if (Math.abs(x2 - x) < this.epsilon) { return t2; }
			if (x > x2) {
				t0 = t2;
			} else {
				t1 = t2;
			}
			t2 = ((t1 - t0) * .5) + t0;
		}

		// Give up
		return t2;
	}

	solve(x) {
		return this.sampleCurveY(this.solveCurveX(x));
	}
}
UnitBezier.initClass();
