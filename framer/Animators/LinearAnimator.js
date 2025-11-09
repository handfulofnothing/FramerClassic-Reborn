/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Animator} = require("./Animator");

exports.LinearAnimator = class LinearAnimator extends Animator {

	setup(options) {

		this.options = _.defaults(options, {
			time: 1,
			precision: 1 / 1000
		}
		);

		return this._time = 0;
	}

	next(delta) {

		this._time += delta;

		if (this.finished()) {
			return 1;
		}

		return this._time / this.options.time;
	}

	finished() {
		return this._time >= (this.options.time - this.options.precision);
	}
};
