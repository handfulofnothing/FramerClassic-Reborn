/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {_} = require("./Underscore");
const {BaseClass} = require("./BaseClass");
const {Color} = require("./Color");

const Cls = (exports.Gradient = class Gradient extends BaseClass {
	static initClass() {
	
		this.define("start", {
			get() { return this._start; },
			set(value) {
				return this._start = new Color(value);
			}
		}
		);
	
		this.define("end", {
			get() { return this._end; },
			set(value) {
				return this._end = new Color(value);
			}
		}
		);
	
		this.define("angle", {
			get() { return this._angle; },
			set(value) {
				if (_.isNumber(value)) { return this._angle = value; }
			}
		}
		);
	}
	constructor(options) {

		if (options == null) { options = {}; }
		if (options.start == null) { options.start = "black"; }
		if (options.end == null) { options.end = "white"; }
		if (options.angle == null) { options.angle = 0; }
		super(options);
	}

	toCSS() {
		return `linear-gradient(${this.angle}deg, ${this.start}, ${this.end})`;
	}

	mix(gradientB, fraction, model) {
		return Gradient.mix(this, gradientB, fraction, model);
	}

	isEqual(gradientB) {
		return Gradient.equal(this, gradientB);
	}

	toInspect() {
		return `<${this.constructor.name} start:${this.start} end:${this.end} angle:${this.angle}>`;
	}

	//#############################################################
	//# Class methods

	static mix(gradientA, gradientB, fraction, model) {
		if (fraction == null) { fraction = 0.5; }
		fraction = Utils.clamp(fraction, 0, 1);
		const start = Color.mix(gradientA.start, gradientB.start, fraction, false, model);
		const end = Color.mix(gradientA.end, gradientB.end, fraction, false, model);
		const startAngle = gradientA.angle;
		const endAngle = gradientB.angle;
		const angle = startAngle + ((endAngle - startAngle) * fraction);

		return new Gradient({
			start,
			end,
			angle
		});
	}

	static random() {
		const hue = Math.random() * 360;
		const colorA = new Color({h: hue});
		const colorB = new Color({h: hue + 40});
		return new Gradient({
			start: colorA,
			end: colorB,
			angle: Math.round(Math.random() * 360)
		});
	}

	static isGradient(gradient) { return !_.isEmpty(this._asPlainObject(gradient)); }

	static isGradientObject(gradient) { return gradient instanceof Gradient; }

	static equal(gradientA, gradientB) {
		if (!Gradient.isGradient(gradientA)) { return false; }
		if (!Gradient.isGradient(gradientB)) { return false; }
		const equalAngle = (Math.abs(gradientA.angle - gradientB.angle) % 360) === 0;
		const equalStart = Color.equal(gradientA.start, gradientB.start);
		const equalEnd = Color.equal(gradientA.end, gradientB.end);
		return equalAngle && equalStart && equalEnd;
	}

	static multiplyAlpha(gradient, alpha) {
		if (!this.isGradientObject(gradient)) { gradient = new Gradient(gradient); }
		return new Gradient({
			start: gradient.start.multiplyAlpha(alpha),
			end: gradient.end.multiplyAlpha(alpha),
			angle: gradient.angle
		});
	}

	static _asPlainObject(gradient) {
		return _.pick(gradient, ["start", "end", "angle"]);
	}
});
Cls.initClass();
