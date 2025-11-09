/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
let computeDampingRatio;
const epsilon =  0.001;
const minDuration = 0.01;
const maxDuration = 10.0;
const minDamping = Number.MIN_VALUE;
const maxDamping = 1;

// Newton's method
const approximateRoot = function(func, derivative, initialGuess, times) {
	if (times == null) { times = 12; }
	let result = initialGuess;
	for (let i = 1, end = times, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
		result = result - (func(result) / derivative(result));
	}
	return result;
};

const angularFrequency = (undampedFrequency, dampingRatio) => undampedFrequency * Math.sqrt(1 - Math.pow(dampingRatio, 2));

exports.computeDampingRatio = (computeDampingRatio = function(tension, friction, mass) {
	if (mass == null) { mass = 1; }
	return friction / (2 * Math.sqrt(mass * tension));
});

// Tries to compute the duration of a spring,
// but can't for certain velocities and if dampingRatio >= 1
// In those cases it will return null
exports.computeDuration = function(tension, friction, velocity, mass) {
	let duration;
	if (velocity == null) { velocity = 0; }
	if (mass == null) { mass = 1; }
	const dampingRatio = computeDampingRatio(tension, friction);
	const undampedFrequency = Math.sqrt(tension / mass);
	// This is basically duration extracted out of the envelope functions
	if (dampingRatio < 1) {
		const a = Math.sqrt(1 - Math.pow(dampingRatio, 2));
		const b = velocity / (a * undampedFrequency);
		const c = dampingRatio / a;
		const d = - ((b - c) / epsilon);
		if (d <= 0) {
			return null;
		}
		duration = Math.log(d) / (dampingRatio * undampedFrequency);
	} else {
		return null;
	}
	return duration;
};

exports.computeDerivedCurveOptions = function(dampingRatio, duration, velocity, mass) {
	let derivative, envelope;
	if (velocity == null) { velocity = 0; }
	if (mass == null) { mass = 1; }
	dampingRatio = Math.max(Math.min(dampingRatio, maxDamping), minDamping);
	duration = Math.max(Math.min(duration, maxDuration), minDuration);

	if (dampingRatio < 1) {
		envelope = function(undampedFrequency) {
			const exponentialDecay = undampedFrequency * dampingRatio;
			const currentDisplacement = exponentialDecay * duration;
			const a = (exponentialDecay) - velocity;
			const b = angularFrequency(undampedFrequency, dampingRatio);
			const c = Math.exp(-currentDisplacement);
			return epsilon - ((a / b) * c);
		};

		derivative = function(undampedFrequency) {
			const exponentialDecay = undampedFrequency * dampingRatio;
			const currentDisplacement = exponentialDecay * duration;
			const d = (currentDisplacement * velocity) + velocity;
			const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFrequency, 2) * duration;
			const f = Math.exp(-currentDisplacement);
			const g = angularFrequency(Math.pow(undampedFrequency, 2), dampingRatio);
			const factor = (- envelope(undampedFrequency) + epsilon) > 0 ? -1 : 1;
			return (factor * ((d - e) * f)) / g;
		};
	} else {
		envelope = function(undampedFrequency) {
			const a = Math.exp(-undampedFrequency * duration);
			const b = ((undampedFrequency - velocity) * duration) + 1;
			return -epsilon + (a * b);
		};

		derivative = function(undampedFrequency) {
			const a = Math.exp(-undampedFrequency * duration);
			const b = (velocity - undampedFrequency) * Math.pow(duration, 2);
			return a * b;
		};
	}

	const result = {
		tension: 100,
		friction: 10,
		velocity
	};

	const initialGuess = 5 / duration;
	const undampedFrequency = approximateRoot(envelope, derivative, initialGuess);
	if (!isNaN(undampedFrequency)) {
		result.tension = Math.pow(undampedFrequency, 2) * mass;
		result.friction = dampingRatio * 2 * Math.sqrt(mass * result.tension);
	}
	return result;
};
