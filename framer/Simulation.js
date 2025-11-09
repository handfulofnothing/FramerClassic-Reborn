/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {_} = require("./Underscore");

const Utils = require("./Utils");

const {Config} = require("./Config");
const {Defaults} = require("./Defaults");
const {BaseClass} = require("./BaseClass");
const {Events} = require("./Events");

const {SpringSimulator} = require("./Simulators/SpringSimulator");
const {FrictionSimulator} = require("./Simulators/FrictionSimulator");
const {MomentumBounceSimulator} = require("./Simulators/MomentumBounceSimulator");

Events.SimulationStart = "simulationStart";
Events.SimulationStep = "simulationStep";
Events.SimulationStop = "simulationStop";

const SimulatorClasses = {
	"spring": SpringSimulator,
	"friction": FrictionSimulator,
	"inertial-scroll": MomentumBounceSimulator
};

const Cls = (exports.Simulation = class Simulation extends BaseClass {
	static initClass() {
	
		//#############################################################
		// Passthrough to simulator
	
		this.define("simulator",
			{get() { return this._simulator; }});
	}

	constructor(options) {

		// options = Defaults.getDefaults "Simulation", options

		this.start = this.start.bind(this);
		this._start = this._start.bind(this);
		this._update = this._update.bind(this);
		if (options == null) { options = {}; }
		super(options);

		this.options = _.defaults(options, {
			layer: null,
			properties: {},
			model: "spring",
			modelOptions: {},
			delay: 0,
			debug: false
		}
		);
		this.layer = this.options.layer;
		this.properties = this.options.properties;
		this._running = false;

		const SimulatorClass = SimulatorClasses[this.options.model] || SpringSimulator;

		this._simulator = new SimulatorClass(this.options.modelOptions);
	}

	// Though properties aren't modified directly by the simulation, it's still
	// necessary to return them so that conflicting animations/simulations can
	// detect one another and not run at the same time.
	animatingProperties() {
		return _.keys(this.properties);
	}

	start() {

		if (this.layer === null) {
			console.error("Simulation: missing layer");
		}

		if (this.options.debug) {
			console.log(`Simulation.start ${this._simulator.constructor.name}`, this.options.modelOptions);
		}

		const animatingProperties = this.animatingProperties();
		const object = this.layer.animatingProperties();
		for (var property in object) {
			var animation = object[property];
			if (Array.from(animatingProperties).includes(property)) {
				animation.stop();
			}
		}

		if (this.options.delay) {
			Utils.delay(this.options.delay, this._start);
		} else {
			this._start();
		}

		return true;
	}

	stop(emit) {
		if (emit == null) { emit = true; }
		if (!this._running) { return; }

		this._running = false;

		this.layer.context.removeAnimation(this);

		if (emit) { this.emit(Events.SimulationStop); }
		return Framer.Loop.off("update", this._update);
	}

	// copy: -> return new Simulation(_.clone(@options))

	emit(event) {
		super.emit(...arguments);
		// Also emit this to the layer with self as argument
		return this.layer.emit(event, this);
	}

	_start() {
		if (this._running) { return; }

		this._running = true;

		this.layer.context.addAnimation(this);

		this.emit(Events.SimulationStart);
		return Framer.Loop.on("update", this._update);
	}

	_update(delta) {
		let emit;
		if (this._simulator.finished()) {
			this.stop(emit=false);
			this.emit("end");
			return this.emit(Events.SimulationStop);
		} else {
			const result = this._simulator.next(delta);
			return this.emit(Events.SimulationStep, result, delta);
		}
	}

	finished() { return this._simulator.finished(); }
});
Cls.initClass();
