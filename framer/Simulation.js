// Modern ES module imports
import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { BaseClass } from "./BaseClass.js";
import { Events as BaseEvents } from "./Events.js";

import { SpringSimulator } from "./Simulators/SpringSimulator.js";
import { FrictionSimulator } from "./Simulators/FrictionSimulator.js";
import { MomentumBounceSimulator } from "./Simulators/MomentumBounceSimulator.js";

// Extend the Events object
export const Events = {
  ...BaseEvents,
  SimulationStart: "simulationStart",
  SimulationStep: "simulationStep",
  SimulationStop: "simulationStop",
};

const SimulatorClasses = {
  spring: SpringSimulator,
  friction: FrictionSimulator,
  "inertial-scroll": MomentumBounceSimulator,
};

export class Simulation extends BaseClass {
  // Pass-through to simulator
  static initClass() {
    this.define("simulator", {
      get() {
        return this._simulator;
      },
    });
  }

  constructor(options = {}) {
    super(options);

    this.start = this.start.bind(this);
    this._start = this._start.bind(this);
    this._update = this._update.bind(this);

    // Modern default options
    this.options = {
      layer: null,
      properties: {},
      model: "spring",
      modelOptions: {},
      delay: 0,
      debug: false,
      ...options,
    };

    this.layer = this.options.layer;
    this.properties = this.options.properties;
    this._running = false;

    const SimulatorClass =
      SimulatorClasses[this.options.model] || SpringSimulator;
    this._simulator = new SimulatorClass(this.options.modelOptions);
  }

  animatingProperties() {
    return Object.keys(this.properties);
  }

  start() {
    if (!this.layer) {
      console.error("Simulation: missing layer");
      return false;
    }

    if (this.options.debug) {
      console.log(
        `Simulation.start ${this._simulator.constructor.name}`,
        this.options.modelOptions
      );
    }

    const animatingProperties = this.animatingProperties();
    const layerProperties = this.layer.animatingProperties();

    for (const property in layerProperties) {
      if (animatingProperties.includes(property)) {
        layerProperties[property].stop();
      }
    }

    if (this.options.delay) {
      Utils.delay(this.options.delay, this._start);
    } else {
      this._start();
    }

    return true;
  }

  stop(emit = true) {
    if (!this._running) return;

    this._running = false;
    this.layer.context.removeAnimation(this);

    if (emit) this.emit(Events.SimulationStop);
    return Framer.Loop.off("update", this._update);
  }

  emit(event, ...args) {
    super.emit(event, ...args);
    this.layer?.emit(event, this, ...args);
  }

  _start() {
    if (this._running) return;

    this._running = true;
    this.layer.context.addAnimation(this);

    this.emit(Events.SimulationStart);
    Framer.Loop.on("update", this._update);
  }

  _update(delta) {
    if (this._simulator.finished()) {
      this.stop(false);
      this.emit("end");
      this.emit(Events.SimulationStop);
    } else {
      const result = this._simulator.next(delta);
      this.emit(Events.SimulationStep, result, delta);
    }
  }

  finished() {
    return this._simulator.finished();
  }
}

Simulation.initClass();
