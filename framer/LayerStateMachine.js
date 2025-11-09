/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {BaseClass} = require("./BaseClass");

const Cls = (exports.LayerStateMachine = class LayerStateMachine extends BaseClass {
	static initClass() {
	
		this.define("layer",
			{get() { return this._layer; }});
	
		this.define("current",
			{get() { return this.currentName; }});
	
		this.define("previous",
			{get() { return this.previousName; }});
	
	
		this.define("currentName",
			{get() { return this._currentName; }});
	
		this.define("previousName",
			{get() { return _.last(this._previousNames) || "default"; }});
	
		this.define("stateNames",
			{get() { return Object.keys(this.states); }});
	
		this.define("states",
			{get() { return this._states; }});
	}

	constructor(_layer, _states) {
		this._layer = _layer;
		this._states = _states;
		super(...arguments);

		this.reset();
	}

	switchInstant(stateName) {
		return this.switchTo(stateName, {instant: true});
	}

	switchTo(stateName, options) {
		// Check if the state exists, if not this is a pretty serious error
		if (options == null) { options = {}; }
		if (!this.states[stateName]) { throw Error(`No such state: '${stateName}'`); }

		if (stateName === "previous") {
			stateName = this.previousName;
		}

		// Prep the properties and the options. The options come from the state, and can be overriden
		// with the function arguments here.
		const properties = _.clone(this.states[stateName]);
		options = _.clone(options);
		if (properties.animationOptions) { options = _.defaults({}, options, properties.animationOptions); }
		delete properties.animationOptions;

		const stateNameA = this.currentName;
		const stateNameB = stateName;

		// Note: even if the state is the current state we still want to switch because some properties
		// might be different as they could be set by hand on the layer object.

		// Grab the animation and make state switching have the same events (start, stop, end)
		const startAnimation = options.start != null ? options.start : true;
		options.start = false;
		const animation = this.layer.animate(properties, options);

		// In the case of instant: true, onStart and onStop are called from within animation.start()
		// This function is called once after animation.start() or in onStart, whichEver comes first.
		// We could fix this by adding another event that fires before a delayed animation is started
		let stateSwitched = false;
		const switchState = () => {
			if (stateSwitched) { return; }
			stateSwitched = true;
			this._previousNames.push(stateNameA);
			return this._currentName = stateNameB;
		};

		const onStart = () => {
			this.emit(Events.StateSwitchStart, stateNameA, stateNameB, this);
			return switchState();
		};

		const onStop = () => {
			return this.emit(Events.StateSwitchStop, stateNameA, stateNameB, this);
		};

		const onEnd = () => {
			const instantProperties = _.difference(
				_.keys(properties),
				_.keys(animation.properties));

			for (var k of Array.from(instantProperties)) {
				this.layer[k] = properties[k];
			}
			return this.emit(Events.StateSwitchEnd, stateNameA, stateNameB, this);
		};

		animation.on(Events.AnimationStart, onStart);
		animation.on(Events.AnimationStop, onStop);
		animation.on(Events.AnimationEnd, onEnd);

		if (startAnimation) {
			const started = animation.start();
			if (!started) {
				// When the animation didn't even start, the animation events will not be emitted,
				// so call the handlers manually
				onStart();
				onStop();
				onEnd();
			}
		}

		switchState();

		return animation;
	}

	next(states) {
		if (!states.length) {
			states = this.stateNames;
		}
		return Utils.arrayNext(states, this.currentName);
	}

	emit(...args) {
		super.emit(...arguments);
		// Also emit this to the layer with self as argument
		return this._layer.emit(...Array.from(args || []));
	}

	reset() {

		for (var k of Array.from(_.keys(this.states))) {
			if (k !== "default") { delete this.states[k]; }
		}

		this._previousNames = [];
		return this._currentName = "default";
	}

	// _namedState: (name) ->
	// 	return _.extend(_.clone(@states[name]), {name: name})

	toInspect(constructor) {
		return `<${this.constructor.name} id:${this.id} layer:${this.layer.id} current:'${this.currentName}'>`;
	}
});
Cls.initClass();
