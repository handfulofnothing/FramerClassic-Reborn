import { BezierCurveAnimator } from "./BezierCurveAnimator.js";
import {
  computeDerivedCurveOptions,
  computeDuration,
  computeDampingRatio,
} from "./SpringCurveValueConverter.js";
import { SpringRK4Animator } from "./SpringRK4Animator.js";
import { Defaults } from "../Defaults.js";
import { _ } from "../Underscore.js";

const Bezier = (...values) =>
  function (options) {
    if (options == null) {
      options = {};
    }
    if (values.length > 0) {
      options.values = values;
    }
    const animator = new BezierCurveAnimator();
    animator.setup(options);
    return animator;
  };

// We define each in a seperate function here
// so they become named functions
// and Framer.Curves.Bezier.ease.name is set
const BezierDefaults = {
  linear(options) {
    if (options == null) {
      options = {};
    }
    return Bezier(0, 0, 1, 1)(options);
  },
  ease(options) {
    if (options == null) {
      options = {};
    }
    return Bezier(0.25, 0.1, 0.25, 1)(options);
  },
  easeIn(options) {
    if (options == null) {
      options = {};
    }
    return Bezier(0.42, 0, 1, 1)(options);
  },
  easeOut(options) {
    if (options == null) {
      options = {};
    }
    return Bezier(0, 0, 0.58, 1)(options);
  },
  easeInOut(options) {
    if (options == null) {
      options = {};
    }
    return Bezier(0.42, 0, 0.58, 1)(options);
  },
};

const Spring = function (dampingRatio, mass, velocity) {
  let curveOptions = {};
  if (dampingRatio != null && _.isFinite(dampingRatio)) {
    curveOptions.dampingRatio = dampingRatio;
  }
  if (mass != null) {
    curveOptions.mass = mass;
  }
  if (velocity != null) {
    curveOptions.velocity = velocity;
  }
  if (!_.isFinite(dampingRatio) && typeof dampingRatio === "object") {
    curveOptions = dampingRatio;
    if (curveOptions.damping != null && curveOptions.dampingRatio == null) {
      curveOptions.dampingRatio = curveOptions.damping;
    }
  }
  if (curveOptions.tension == null && curveOptions.friction == null) {
    curveOptions = Defaults.getDefaults("Spring", curveOptions);
  }

  return function (options) {
    let duration;
    if (curveOptions.dampingRatio != null) {
      duration =
        (options != null ? options.time : undefined) != null
          ? options != null
            ? options.time
            : undefined
          : 1;
      const derivedOptions = computeDerivedCurveOptions(
        curveOptions.dampingRatio,
        duration,
        curveOptions.velocity,
        curveOptions.mass
      );
      curveOptions = _.defaults(derivedOptions, curveOptions);
    } else {
      if (options != null) {
        delete options.time;
      }
    }
    options = _.defaults(curveOptions, options);
    const animator = new SpringRK4Animator();
    animator.setup(options);
    if (duration != null) {
      animator.time = duration;
    }
    return animator;
  };
};

_.assign(Bezier, BezierDefaults);
Spring.computeDerivedCurveOptions = computeDerivedCurveOptions;
Spring.computeDuration = computeDuration;
Spring.computeDampingRatio = computeDampingRatio;

const parseFunction = function (string) {
  let value;
  if (!_.isString(string)) {
    return null;
  }

  // This parses functions with or without arguments like Bezier(0.1, 0.2, 0.3, 0.4) and Spring(damping: 0.5)
  const regex = /.*(Spring|Bezier)(?:\(\s*{?([\w:\s,.]*)}?\s*\)|\.(\w+))?/;
  let matches = regex.exec(string);
  if (matches == null) {
    return null;
  }
  let [match, type, args, prop] = Array.from(matches);
  const result = { name: type, property: null, arguments: null };
  if (prop != null) {
    result.property = prop;
    return result;
  }
  if (args == null) {
    return result;
  }
  if (args.length === 0) {
    result.arguments = [];
  }

  const argumentsRegex = /\s*([\w]+)\s*:\s*([\d.]+)\s*,?/g;
  const argumentObject = {};
  while ((matches = argumentsRegex.exec(args))) {
    let property;
    [match, property, value] = Array.from(matches);
    value = parseFloat(value);
    if (!isNaN(value)) {
      argumentObject[property] = value;
    }
  }
  if (_.size(argumentObject) > 0) {
    result.arguments = argumentObject;
    return result;
  }

  const numbersRegex = /\s*([.\d]+)\s*/g;
  const numbers = [];
  while ((matches = numbersRegex.exec(args))) {
    [match, value] = Array.from(matches);
    value = parseFloat(value);
    numbers.push(value);
  }
  result.arguments = numbers;
  return result;
};

const fromDefinition = function (definition) {
  if (definition == null) {
    return null;
  }
  const curve = Framer.Curves[definition.name];
  if (curve == null) {
    return null;
  }

  if (definition.property != null) {
    return curve[definition.property];
  }
  if (definition.arguments == null) {
    return curve;
  }

  if (_.isArray(definition.arguments)) {
    return curve(...Array.from(definition.arguments || []));
  }

  return curve(definition.arguments);
};
export { parseFunction, fromDefinition, Spring, Bezier };

export const fromString = (string) => {
  if (!_.isString(string)) {
    return null;
  }
  let func = fromDefinition(parseFunction(string));
  if (func != null) {
    return func;
  }
  func = Utils.parseFunction(string);
  const args = func.args.map(parseFloat);
  switch (func.name) {
    case "linear":
      return Bezier.linear;
    case "ease":
      return Bezier.ease;
    case "ease-in":
      return Bezier.easeIn;
    case "ease-out":
      return Bezier.easeOut;
    case "ease-in-out":
      return Bezier.easeInOut;
    case "bezier-curve":
    case "cubic-bezier":
      return Bezier(...Array.from(args || []));
    case "spring":
    case "spring-rk4":
    case "spring-dho":
      var pairs = _.zipWith(
        ["tension", "friction", "velocity", "tolerance"],
        args,
        [250, 25, 0, 1 / 100],
        (key, value, defaults) => [key, value != null ? value : defaults]
      );
      var object = _.fromPairs(pairs);
      return Spring(object);
    default:
      return Bezier.linear;
  }
};
