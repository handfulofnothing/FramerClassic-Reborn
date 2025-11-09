import _ from "./Underscore.js";

const Originals = {
  Layer: {
    backgroundColor: "rgba(123, 123, 123, 0.5)",
    color: "white",
    borderColor: "rgba(123, 123, 123, 0.5)",
    width: 200,
    height: 200,
  },
  Animation: {
    curve: "ease", // or "spring(400, 40, 0)"
    time: 1,
    repeat: 0,
    delay: 0,
    debug: false,
    colorModel: "husl",
    animate: true,
    looping: false,
  },
  Context: {
    perspective: 0,
    perspectiveOriginX: 0.5,
    perspectiveOriginY: 0.5,
    parent: null,
    name: null,
  },
  DeviceComponent: {
    fullScreen: false,
    padding: 50,
    deviceType: "apple-iphone-8-silver",
    deviceZoom: "fit",
    contentZoom: 1,
    orientation: "portrait",
    keyboard: false,
    animationOptions: {
      time: 0.3,
      curve: "ease-in-out",
    },
  },
  LayerDraggable: {
    momentum: true,
    momentumOptions: { friction: 2.1, tolerance: 1 },
    bounce: true,
    bounceOptions: { friction: 40, tension: 200, tolerance: 1 },
    directionLock: false,
    directionLockThreshold: { x: 10, y: 10 },
    overdrag: true,
    overdragScale: 0.5,
    pixelAlign: true,
    velocityTimeout: 100,
    velocityScale: 890,
  },
  FrictionSimulator: { friction: 2, tolerance: 1 / 10 },
  Spring: { dampingRatio: 0.5, mass: 1, velocity: 0 },
  SpringSimulator: { tension: 500, friction: 10, tolerance: 1 / 10000 },
  MomentumBounceSimulator: {
    momentum: { friction: 2, tolerance: 10 },
    bounce: { tension: 500, friction: 10, tolerance: 1 },
  },
  GridComponent: {
    rows: 3,
    columns: 3,
    spacing: 0,
    backgroundColor: "transparent",
  },
  ScrollComponent: {
    clip: true,
    mouseWheelEnabled: false,
    backgroundColor: null,
  },
  Hints: { color: "rgba(144, 19, 254, 0.8)" },
  Shadow: {
    x: 0,
    y: 0,
    color: "rgba(123, 123, 123, 0.5)",
    type: "box",
    blur: 0,
    spread: 0,
  },
};

export const Defaults = {
  getDefaults(className, options = {}) {
    if (!Originals[className] || !Framer.Defaults?.[className]) return {};

    const optsClone = _.clone(options);
    const defaults = _.cloneDeep(Originals[className]);

    for (const [k, v] of Object.entries(Framer.Defaults[className])) {
      defaults[k] =
        _.isFunction(v) && !(className === "Animation" && k === "curve")
          ? v()
          : v;
    }

    for (const [k, v] of Object.entries(defaults)) {
      if (!optsClone.hasOwnProperty(k)) optsClone[k] = v;
    }

    return optsClone;
  },

  setup() {
    if (window.FramerDefaults) {
      for (const [className, classValues] of Object.entries(
        window.FramerDefaults
      )) {
        Object.assign(Originals[className], classValues);
      }
    }
    return this.reset();
  },

  reset() {
    window.Framer.Defaults = _.cloneDeep(Originals);
    return window.Framer.Defaults;
  },
};
