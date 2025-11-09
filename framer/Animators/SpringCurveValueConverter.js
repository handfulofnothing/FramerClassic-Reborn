const epsilon = 0.001;
const minDuration = 0.01;
const maxDuration = 10.0;
const minDamping = Number.MIN_VALUE;
const maxDamping = 1;

// Newton's method
const approximateRoot = (func, derivative, initialGuess, times = 12) => {
  let result = initialGuess;
  for (let i = 1; i < times; i++) {
    result -= func(result) / derivative(result);
  }
  return result;
};

const angularFrequency = (undampedFrequency, dampingRatio) =>
  undampedFrequency * Math.sqrt(1 - dampingRatio ** 2);

export const computeDampingRatio = (tension, friction, mass = 1) =>
  friction / (2 * Math.sqrt(mass * tension));

export const computeDuration = (tension, friction, velocity = 0, mass = 1) => {
  const dampingRatio = computeDampingRatio(tension, friction, mass);
  const undampedFrequency = Math.sqrt(tension / mass);

  if (dampingRatio >= 1) return null;

  const a = Math.sqrt(1 - dampingRatio ** 2);
  const b = velocity / (a * undampedFrequency);
  const c = dampingRatio / a;
  const d = -((b - c) / epsilon);

  if (d <= 0) return null;

  return Math.log(d) / (dampingRatio * undampedFrequency);
};

export const computeDerivedCurveOptions = (
  dampingRatio,
  duration,
  velocity = 0,
  mass = 1
) => {
  dampingRatio = Math.min(Math.max(dampingRatio, minDamping), maxDamping);
  duration = Math.min(Math.max(duration, minDuration), maxDuration);

  let envelope, derivative;

  if (dampingRatio < 1) {
    envelope = (undampedFrequency) => {
      const decay = undampedFrequency * dampingRatio;
      const displacement = decay * duration;
      const a = decay - velocity;
      const b = angularFrequency(undampedFrequency, dampingRatio);
      const c = Math.exp(-displacement);
      return epsilon - (a / b) * c;
    };

    derivative = (undampedFrequency) => {
      const decay = undampedFrequency * dampingRatio;
      const displacement = decay * duration;
      const d = displacement * velocity + velocity;
      const e = dampingRatio ** 2 * undampedFrequency ** 2 * duration;
      const f = Math.exp(-displacement);
      const g = angularFrequency(undampedFrequency ** 2, dampingRatio);
      const factor = envelope(undampedFrequency) < epsilon ? 1 : -1;
      return (factor * (d - e) * f) / g;
    };
  } else {
    envelope = (undampedFrequency) => {
      const a = Math.exp(-undampedFrequency * duration);
      const b = (undampedFrequency - velocity) * duration + 1;
      return -epsilon + a * b;
    };

    derivative = (undampedFrequency) => {
      const a = Math.exp(-undampedFrequency * duration);
      const b = (velocity - undampedFrequency) * duration ** 2;
      return a * b;
    };
  }

  const initialGuess = 5 / duration;
  const undampedFrequency = approximateRoot(envelope, derivative, initialGuess);

  const result = {
    tension: 100,
    friction: 10,
    velocity,
  };

  if (!isNaN(undampedFrequency)) {
    result.tension = undampedFrequency ** 2 * mass;
    result.friction = dampingRatio * 2 * Math.sqrt(mass * result.tension);
  }

  return result;
};
