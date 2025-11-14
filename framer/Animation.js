import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { Defaults } from "./Defaults.js";
import { BaseClass } from "./BaseClass.js";
import { SVG } from "./SVG.js";
import * as Curves from "./Animators/Curves.js";

const numberRE = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;
const relativePropertyRE = new RegExp(
  `^(?:([+-])=|)(${numberRE.source})([a-z%]*)$`,
  "i"
);

export const isRelativeProperty = (v) =>
  _.isString(v) && relativePropertyRE.test(v);

export const evaluateRelativeProperty = (target, k, v) => {
  const match = relativePropertyRE.exec(v);
  if (!match) return +v;
  const [, sign, number, unit] = match;
  if (sign) return target[k] + Number(sign + 1) * Number(number);
  return +number;
};

export class Animation extends BaseClass {
  static initClass() {
    this.define("layer", {
      get() {
        return this._layer;
      },
    });

    this.define("isPending", {
      get() {
        return this._delayTimer != null;
      },
    });

    this.define("isAnimating", {
      get() {
        let needle;
        return (
          (needle = this), Array.from(this.layer.animations()).includes(needle)
        );
      },
    });

    this.define("looping", {
      get() {
        return this.options.looping;
      },
      set(value) {
        if (this.options != null) {
          this.options.looping = value;
        }
        if (
          (this.options != null ? this.options.looping : undefined) &&
          this.layer != null &&
          !this.isAnimating
        ) {
          return this.restart();
        }
      },
    });

    this.define("isNoop", this.simpleProperty("isNoop", false));
  }

  constructor(...args) {
    // Parse arguments first (no 'this' access)
    let layer = null;
    let properties = {};
    let options = {};

    // Actual current api
    if (arguments.length === 3) {
      layer = args[0];
      properties = args[1];

      options = {};

      if (properties.options != null) {
        options = _.clone(properties.options);
      }

      if (args[2]) {
        options = _.extend({}, options, args[2]);
      }
    }

    // Mix of current and old api
    if (arguments.length === 2) {
      layer = args[0];
      if (args[1].properties != null) {
        ({ properties } = args[1]);
      } else {
        properties = args[1];
      }
      if (args[1].options != null) {
        ({ options } = args[1]);
      }
    }

    // Old api
    if (arguments.length === 1) {
      ({ layer } = args[0]);
      ({ properties } = args[0]);
      if (args[0].options != null) {
        ({ options } = args[0]);
      } else {
        options = args[0];
      }
    }

    delete options.layer;
    delete options.properties;
    delete options.options;

    // Call super() FIRST before any 'this' access
    super();

    // Now safe to bind methods and set properties
    this.start = this.start.bind(this);
    this._instant = this._instant.bind(this);
    this._noop = this._noop.bind(this);
    this._start = this._start.bind(this);
    this.finish = this.finish.bind(this);
    this._update = this._update.bind(this);
    this._prepareUpdateValues = this._prepareUpdateValues.bind(this);
    this._updateValues = this._updateValues.bind(this);
    this._updateNumberValue = this._updateNumberValue.bind(this);
    this._calculateNumericObjectValue = this._calculateNumericObjectValue.bind(this);
    this._updateNumericObjectValue = this._updateNumericObjectValue.bind(this);
    this._updateColorValue = this._updateColorValue.bind(this);
    this._updateGradientValue = this._updateGradientValue.bind(this);
    this._updateShadows = this._updateShadows.bind(this);
    this._updateTemplateValue = this._updateTemplateValue.bind(this);

    this.options = _.cloneDeep(Defaults.getDefaults("Animation", options));
    this._layer = layer;

    if (!(layer instanceof _Layer)) {
      throw Error("Animation: missing layer");
    }

    this.properties = Animation.filterAnimatableProperties(properties, layer);

    if (properties.origin) {
      console.warn(
        "Animation.origin: please use layer.originX and layer.originY"
      );
    }

    if (_.isString(this.options.curve)) {
      this.options.curve = Curves.fromString(this.options.curve);
    }
    if (
      this.options.curve === Curves.Spring ||
      this.options.curve === Curves.Bezier
    ) {
      this.options.curve = this.options.curve.call();
    }
    this._originalState = this._currentState();
    this._repeatCounter = this.options.repeat;
  }

  start() {
    let k, start, v;
    this._animator = this.options.curve(this.options);
    this._target = this.layer;
    this._stateA = this._currentState();
    this._stateB = {};

    for (k in this.properties) {
      // Filter out properties that are literally equal
      v = this.properties[k];
      if (this._stateA[k] === v) {
        continue;
      }

      // Evaluate function properties
      if (_.isFunction(v)) {
        v = v(this.layer, k);

        // Evaluate relative properties
      } else if (isRelativeProperty(v)) {
        v = evaluateRelativeProperty(this._target, k, v);
      }

      // Filter out the properties that have equal values
      if (this._stateA[k] !== v) {
        this._stateB[k] = v;
      }
    }

    if (_.keys(this._stateA).length === 0) {
      console.warn("Animation: nothing to animate, no animatable properties");
      return this._noop();
    }

    if (_.isEqual(this._stateA, this._stateB)) {
      console.warn(
        "Animation: nothing to animate, all properties are equal to what it is now"
      );
      return this._noop();
    }

    if (_.keys(this._stateB).length === 0) {
      return this._noop();
    }

    // If this animation wants to animate a property that is already being animated, it stops
    // that currently running animation. If not, it allows them both to continue.
    const object = this._target.animatingProperties();
    for (var property in object) {
      var animation = object[property];
      if (this._stateA.hasOwnProperty(property)) {
        animation.stop();
      }

      // We also need to account for derivatives from x, y
      if (
        property === "x" &&
        (this._stateA.hasOwnProperty("minX") ||
          this._stateA.hasOwnProperty("midX") ||
          this._stateA.hasOwnProperty("maxX"))
      ) {
        animation.stop();
      }

      if (
        property === "y" &&
        (this._stateA.hasOwnProperty("minY") ||
          this._stateA.hasOwnProperty("midY") ||
          this._stateA.hasOwnProperty("maxY"))
      ) {
        animation.stop();
      }
    }

    if (this.options.debug) {
      console.log("Animation.start");
      for (k in this._stateB) {
        v = this._stateB[k];
        console.log(`\t${k}: ${this._stateA[k]} -> ${this._stateB[k]}`);
      }
    }

    // Add the callbacks
    if (_.isFunction(this.options.onStart)) {
      this.on(Events.AnimationStart, this.options.onStart);
    }
    if (_.isFunction(this.options.onHalt)) {
      this.on(Events.AnimationHalt, this.options.onHalt);
    }
    if (_.isFunction(this.options.onStop)) {
      this.on(Events.AnimationStop, this.options.onStop);
    }
    if (_.isFunction(this.options.onEnd)) {
      this.on(Events.AnimationEnd, this.options.onEnd);
    }

    // See if we need to repeat this animation
    // Todo: more repeat behaviours:
    // 1) add (from end position) 2) reverse (loop between a and b)
    this.once("end", () => {
      if (this._repeatCounter > 0 || this.looping) {
        this.restart();
        if (!this.looping) {
          return this._repeatCounter--;
        }
      }
    });

    // Figure out what kind of values we have so we don't have to do it in
    // the actual update loop. This saves a lot of frame budget.
    this._prepareUpdateValues();

    // The option keywords animate and instant trigger an instant animation
    if (this.options.animate === false || this.options.instant === true) {
      // If animate is false we set everything immediately and skip the actual animation
      start = this._instant;
    } else {
      start = this._start;
    }

    this.layer.context.addAnimation(this);
    // If we have a delay, we wait a bit for it to start
    if (this.options.delay) {
      this._delayTimer = Utils.delay(this.options.delay, start);
    } else {
      start();
    }

    return true;
  }

  stop(emit) {
    if (emit == null) {
      emit = true;
    }
    if (this._delayTimer != null) {
      Framer.CurrentContext.removeTimer(this._delayTimer);
      this._delayTimer = null;
    }

    this.layer.context.removeAnimation(this);
    if (emit) {
      this.emit(Events.AnimationHalt);
    }
    if (emit) {
      this.emit(Events.AnimationStop);
    }
    return Framer.Loop.off("update", this._update);
  }

  reverse() {
    // TODO: Add some tests
    const properties = _.clone(this._originalState);
    for (var key in this.properties) {
      var value = this.properties[key];
      if (SVG.isPath(value)) {
        value.reversed = !value.reversed;
        properties[key] = value;
      }
    }
    const options = _.clone(this.options);
    return new Animation(this.layer, properties, options);
  }

  reset() {
    return (() => {
      const result = [];
      for (var k in this._stateA) {
        var v = this._stateA[k];
        result.push((this._target[k] = v));
      }
      return result;
    })();
  }

  restart() {
    this.reset();
    return this.start();
  }

  copy() {
    const properties = _.clone(this.properties);
    const options = _.clone(this.options);
    return new Animation(this.layer, properties, options);
  }

  // A bunch of common aliases to minimize frustration
  revert() {
    return this.reverse();
  }
  inverse() {
    return this.reverse();
  }
  invert() {
    return this.reverse();
  }

  emit(event) {
    super.emit(...arguments);
    // Also emit this to the layer with self as argument
    return this.layer.emit(event, this);
  }

  animatingProperties() {
    return _.keys(this._stateA);
  }

  _instant() {
    this.emit(Events.AnimationStart);
    this._updateValues(1);
    this.emit(Events.AnimationStop);
    return this.emit(Events.AnimationEnd);
  }

  _noop() {
    this.isNoop = true;
    // We don't emit these so you can call layer.animate safely
    // from the same layers layer.onAnimationEnd handler
    // @emit(Events.AnimationStart)
    // @emit(Events.AnimationStop)
    // @emit(Events.AnimationEnd)
    return !this.isNoop;
  }

  _start() {
    this._delayTimer = null;
    this.emit(Events.AnimationStart);
    this._previousValue = 0;
    return Framer.Loop.on("update", this._update);
  }

  finish() {
    this.stop();
    return this._updateValues(1);
  }

  _update(delta) {
    if (this._animator.finished()) {
      let emit;
      this._updateValues(1);
      this.stop((emit = false));
      this.emit(Events.AnimationStop);
      return this.emit(Events.AnimationEnd);
    } else {
      return this._updateValues(this._animator.next(delta));
    }
  }

  _prepareUpdateValues() {
    this._valueUpdaters = {};
    return (() => {
      const result = [];
      for (var k in this._stateB) {
        var v = this._stateB[k];
        if (SVG.isPath(v)) {
          var path = v;
          var direction = null;
          var start = null;
          var end = null;
          switch (k) {
            case "x":
            case "minX":
            case "midX":
            case "maxX":
            case "width":
              direction = "horizontal";
              break;
            case "y":
            case "minY":
            case "midY":
            case "maxY":
            case "height":
              direction = "vertical";
              break;
            case "rotation":
            case "rotationZ":
            case "rotationX":
            case "rotationY":
              direction = "angle";
              break;
          }

          result.push(
            (this._valueUpdaters[k] = path.valueUpdater(
              direction,
              this._target,
              this._target[k]
            ))
          );
        } else if (
          Color.isColorObject(v) ||
          Color.isColorObject(this._stateA[k])
        ) {
          result.push((this._valueUpdaters[k] = this._updateColorValue));
        } else if (
          Gradient.isGradient(v) ||
          Gradient.isGradient(this._stateA[k])
        ) {
          this._valueUpdaters[k] = this._updateGradientValue;
          // If the begin state is not set, animate from the same state but with alpha 0
          result.push(
            this._stateA[k] != null
              ? this._stateA[k]
              : (this._stateA[k] = Gradient.multiplyAlpha(v, 0))
          );
        } else if (k === "borderWidth") {
          result.push(
            (this._valueUpdaters[k] = this._updateNumericObjectValue.bind(
              this,
              ["top", "left", "bottom", "right"]
            ))
          );
        } else if (k === "borderRadius") {
          result.push(
            (this._valueUpdaters[k] = this._updateNumericObjectValue.bind(
              this,
              ["topLeft", "topRight", "bottomRight", "bottomLeft"]
            ))
          );
        } else if (k === "template") {
          result.push((this._valueUpdaters[k] = this._updateTemplateValue));
        } else if (k === "shadows") {
          result.push((this._valueUpdaters[k] = this._updateShadows));
        } else {
          result.push((this._valueUpdaters[k] = this._updateNumberValue));
        }
      }
      return result;
    })();
  }

  _updateValues(value) {
    const delta = value - this._previousValue;
    this._previousValue = value;
    for (var k in this._stateB) {
      var v = this._stateB[k];
      this._valueUpdaters[k](k, value, delta);
    }
    return null;
  }

  _updateNumberValue(key, value) {
    return (this._target[key] = Utils.mapRange(
      value,
      0,
      1,
      this._stateA[key],
      this._stateB[key]
    ));
  }

  _interpolateNumericObjectValues(propKeys, valueA, valueB, value, flatten) {
    if (flatten == null) {
      flatten = true;
    }
    let result = {};

    for (var propKey of Array.from(propKeys)) {
      var keyValueA = _.isNumber(valueA)
        ? valueA
        : valueA != null
        ? valueA[propKey]
        : undefined;
      var keyValueB = _.isNumber(valueB)
        ? valueB
        : valueB != null
        ? valueB[propKey]
        : undefined;
      // If the key value is undefined in one state, use the value from the other
      if (keyValueA == null) {
        keyValueA = keyValueB;
      }
      if (keyValueB == null) {
        keyValueB = keyValueA;
      }
      result[propKey] = Utils.mapRange(value, 0, 1, keyValueA, keyValueB);
    }

    // Flatten to a single number if all properties have the same value
    if (flatten && _.uniq(_.values(result)).length === 1) {
      result = result[propKeys[0]];
    }
    return result;
  }

  _calculateNumericObjectValue(propKeys, key, value, flatten) {
    if (flatten == null) {
      flatten = true;
    }
    const valueA = this._stateA[key];
    const valueB = this._stateB[key];

    return this._interpolateNumericObjectValues(
      propKeys,
      valueA,
      valueB,
      value,
      flatten
    );
  }

  _updateNumericObjectValue(propKeys, key, value, flatten) {
    if (flatten == null) {
      flatten = true;
    }
    const result = this._calculateNumericObjectValue(
      propKeys,
      key,
      value,
      flatten
    );
    return (this._target[key] = result);
  }

  _updateColorValue(key, value) {
    return (this._target[key] = Color.mix(
      this._stateA[key],
      this._stateB[key],
      value,
      false,
      this.options.colorModel
    ));
  }

  _updateGradientValue(key, value) {
    if (!this._stateB[key] && value === 1) {
      this._target[key] = this._stateB[key];
      return;
    }

    const gradientA = Gradient._asPlainObject(this._stateA[key]);
    // If the end state is not set, animate to the same state but with alpha 0
    const gradientB = Gradient._asPlainObject(
      this._stateB[key] != null
        ? this._stateB[key]
        : Gradient.multiplyAlpha(gradientA, 0)
    );

    return (this._target[key] = Gradient.mix(
      _.defaults(gradientA, gradientB),
      _.defaults(gradientB, gradientA),
      value,
      this.options.colorModel
    ));
  }

  _updateShadows(key, value) {
    if (value === 1) {
      this._target[key] = this._stateB[key];
      return;
    }

    const result = [];
    const numShadows = Math.max(
      (this._stateA[key] != null ? this._stateA[key].length : undefined) != null
        ? this._stateA[key] != null
          ? this._stateA[key].length
          : undefined
        : 0,
      (this._stateB[key] != null ? this._stateB[key].length : undefined) != null
        ? this._stateB[key] != null
          ? this._stateB[key].length
          : undefined
        : 0
    );
    for (
      let index = 0, end = numShadows, asc = 0 <= end;
      asc ? index < end : index > end;
      asc ? index++ : index--
    ) {
      var left;
      var fromShadow =
        this._stateA[key] != null ? this._stateA[key][index] : undefined;
      var toShadow =
        this._stateB[key] != null ? this._stateB[key][index] : undefined;
      if (toShadow == null && fromShadow == null) {
        continue;
      }
      var type =
        (left =
          (toShadow != null ? toShadow.type : undefined) != null
            ? toShadow != null
              ? toShadow.type
              : undefined
            : fromShadow != null
            ? fromShadow.type
            : undefined) != null
          ? left
          : Framer.Defaults.Shadow.type;
      if (fromShadow == null) {
        fromShadow = _.defaults({ color: null, type }, Framer.Defaults.Shadow);
      }
      if (toShadow == null) {
        toShadow = _.defaults({ color: null, type }, Framer.Defaults.Shadow);
      }
      _.defaults(fromShadow, Framer.Defaults.Shadow);
      _.defaults(toShadow, Framer.Defaults.Shadow);
      result[index] = this._interpolateNumericObjectValues(
        ["x", "y", "blur", "spread"],
        fromShadow,
        toShadow,
        value,
        false
      );
      result[index].color = Color.mix(
        fromShadow.color,
        toShadow.color,
        value,
        false,
        this.options.colorModel
      );
      result[index].type = type;
    }
    return (this._target[key] = result);
  }

  // shallow mix all end state `{key: value}`s if `value` is a number, otherwise just takes `value`
  _updateTemplateValue(key, value) {
    let k, valueA, valueB;
    const fromData = this._stateA[key];
    const toData = this._stateB[key];
    const targetData = {};

    if (!_.isObject(toData)) {
      k =
        this._target._styledText != null
          ? this._target._styledText.buildTemplate()
          : undefined;
      if (!k) {
        return;
      }
      valueB = toData;
      if (_.isNumber(valueB)) {
        valueA = _.isObject(fromData) ? fromData[k] : fromData;
        if (!_.isNumber(valueA)) {
          valueA = 0;
        }
        valueB = Utils.mapRange(value, 0, 1, valueA, valueB);
      }
      targetData[k] = valueB;
      this._target.template = targetData;
      return;
    }

    for (k in toData) {
      valueB = toData[k];
      if (_.isNumber(valueB)) {
        valueA = _.isObject(fromData) ? fromData[k] : fromData;
        if (!_.isNumber(valueA)) {
          valueA = 0;
        }
        valueB = Utils.mapRange(value, 0, 1, valueA, valueB);
      }
      targetData[k] = valueB;
    }
    return (this._target.template = targetData);
  }

  _currentState() {
    return _.pick(this.layer, _.keys(this.properties));
  }

  static isAnimatable(v) {
    return (
      _.isNumber(v) ||
      _.isFunction(v) ||
      isRelativeProperty(v) ||
      Color.isColorObject(v) ||
      Gradient.isGradientObject(v) ||
      SVG.isPath(v)
    );
  }

  // Special cases that animate with different types of objects
  static isAnimatableKey(k) {
    return [
      "gradient",
      "borderWidth",
      "borderRadius",
      "template",
      "shadows",
    ].includes(k);
  }

  static filterAnimatableProperties(properties, layer) {
    // Function to filter only animatable properties out of a given set
    const animatableProperties = {};

    // Only animate numeric properties for now
    for (var k in properties) {
      var matches;
      var v = properties[k];
      if (["frame", "size", "point", "midPoint", "path"].includes(k)) {
        // Derived properties
        var derivedKey, derivedKeys;
        switch (k) {
          case "frame":
            derivedKeys = ["x", "y", "width", "height"];
            break;
          case "size":
            derivedKeys = ["width", "height"];
            break;
          case "point":
            derivedKeys = ["x", "y"];
            break;
          case "midPoint":
            derivedKeys = ["midX", "midY"];
            break;
          case "path":
            derivedKeys = ["x", "y", "rotation"];
            break;
          default:
            derivedKeys = [];
        }
        if (SVG.isPath(v)) {
          if (k === "path") {
            layer.midPoint = v.start;
          }
          for (derivedKey of Array.from(derivedKeys)) {
            animatableProperties[derivedKey] = v;
          }
        } else if (_.isObject(v)) {
          _.defaults(animatableProperties, _.pick(v, derivedKeys));
        } else if (_.isNumber(v)) {
          for (derivedKey of Array.from(derivedKeys)) {
            animatableProperties[derivedKey] = v;
          }
        }
      } else if (this.isAnimatable(v)) {
        animatableProperties[k] = v;
      } else if (Color.isValidColorProperty(k, v)) {
        animatableProperties[k] = new Color(v);
      } else if (this.isAnimatableKey(k)) {
        animatableProperties[k] = v;
      } else if ((matches = k.match(/^shadow([1-9])$/))) {
        if (animatableProperties.shadows == null) {
          var left;
          animatableProperties.shadows =
            (left = _.clone(layer.shadows)) != null ? left : [];
        }
        var shadowIndex = parseInt(matches[1]) - 1;
        if (animatableProperties.shadows[shadowIndex] != null) {
          _.defaults(v, animatableProperties.shadows[shadowIndex]);
        }
        animatableProperties.shadows[shadowIndex] = v;
      }
    }
    return animatableProperties;
  }

  toInspect() {
    return `<${this.constructor.name} id:${this.id} layer:${
      this.layer != null ? this.layer.toName() : undefined
    } [${_.keys(this.properties).join(", ")}] isAnimating:${this.isAnimating}>`;
  }

  //#############################################################
  //# EVENT HELPERS

  onAnimationStart(cb) {
    return this.on(Events.AnimationStart, cb);
  }
  onAnimationHalt(cb) {
    return this.on(Events.AnimationHalt, cb);
  }
  onAnimationStop(cb) {
    return this.on(Events.AnimationStop, cb);
  }
  onAnimationEnd(cb) {
    return this.on(Events.AnimationEnd, cb);
  }
  onAnimationDidStart(cb) {
    return this.on(Events.AnimationDidStart, cb);
  }
  onAnimationDidStop(cb) {
    return this.on(Events.AnimationDidStop, cb);
  }
  onAnimationDidEnd(cb) {
    return this.on(Events.AnimationDidEnd, cb);
  }
}
Animation.initClass();
