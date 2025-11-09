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
const {DOMEventManager} = require("./DOMEventManager");

/*

An easy way to think of the context is a bucket of things related to a set of layers. There
is always at least one context on the screen, but often many more. For example, the device has
a special context and replaces the default one (so it renders in the screen), and the print
function uses on to draw the console.

The default context lives under Framer.DefaultContext and the current one in
Framer.CurrentContext. You can create layers in any context by using the run function.

A context keeps track of everyting around those layers, so it can clean it up again. We use
this a lot in Framer Studio's autocomplete function. Async things like running animations and
timers get stopped too.

Contexts can live inside another context (with a layer as a parent) so you can only reload
a part of a prototype. This is mainly how device works.

Another feature is to temporarily freeze/resume a context. If you freeze it, all user event
will temporarily get blocked so in theory nothing will change in the context. You can restore
these at any time.

*/

const Contexts = [];

const Cls = (exports.Context = class Context extends BaseClass {
	static initClass() {
	
		this.define("parent", {get() { return this._parent; }});
	
		this.define("element", {get() { return this._element; }});
	
		this.define("devicePixelRatio", {
			get() { return this._devicePixelRatio != null ? this._devicePixelRatio : 1; },
			set(value) {
				if (value === this._devicePixelRatio) { return; }
				this._devicePixelRatio = value;
				return Array.from(this._layers).map((l) =>
					l.updateForDevicePixelRatioChange());
			}
		}
		);
	
		this.define("renderUsingNativePixelRatio", this.simpleProperty("renderUsingNativePixelRatio", false));
		this.define("autoLayout", this.simpleProperty("autoLayout", true));
	
		this.define("pixelMultiplier", {
			get() {
				if (this.renderUsingNativePixelRatio) {
					return 1;
				} else {
					return this.devicePixelRatio;
				}
			}
		}
		);
	
		this.define("scale",
			{get() { return this.pixelMultiplier; }});
	
		//#############################################################
		// Collections
	
		// Layers
		this.define("layers", {get() { return _.clone(this._layers); }});
		this.define("layerCounter", {get() { return this._layerCounter; }});
		this.define("rootLayers", {get() { return _.filter(this._layers, layer => layer.parent === null); }});
	
		this.define("visible", {
			get() { return this._visible || true; },
			set(value) {
				if (value === this._visible) { return; }
				if (this._element != null) {
					this._element.style.visibility = value ? "visible" : "hidden";
				}
				return this._visible = value;
			}
		}
		);
	
		// Animations
		this.define("animations", {get() { return _.clone(this._animations); }});
	
		// Timers
		this.define("timers", {get() { return _.clone(this._timers); }});
	
	
		// Intervals
		this.define("intervals", {get() { return _.clone(this._intervals); }});
	
	
		//#############################################################
		// Geometry
	
		// Remember the context doesn't really have height. These are just a reference
		// to it's parent or document.
	
		this.define("width", {
			get() {
				if (this.parent != null) { return this.parent.width; }
				return window.innerWidth;
			}
		}
		);
	
		this.define("height", {
			get() {
				if (this.parent != null) { return this.parent.height; }
				return window.innerHeight;
			}
		}
		);
	
		this.define("innerWidth", {
			get() {
				if (this.parent != null) { return this.parent.width / this.devicePixelRatio; }
				return window.innerWidth;
			}
		}
		);
	
		this.define("innerHeight", {
			get() {
				if (this.parent != null) { return this.parent.height / this.devicePixelRatio; }
				return window.innerHeight;
			}
		}
		);
	
		this.define("frame", {get() { return {x: 0, y: 0, width: this.width, height: this.height}; }});
		this.define("innerFrame", {get() { return {x: 0, y: 0, width: this.innerWidth, height: this.innerHeight}; }});
		this.define("size",  {get() { return _.pick(this.frame, ["width", "height"]); }});
		this.define("point", {get() { return _.pick(this.frame, ["x", "y"]); }});
		this.define("canvasFrame", {
			get() {
				if ((this.parent == null)) { return this.frame; }
				return this.parent.canvasFrame;
			}
		}
		);
	
		this.define("backgroundColor", {
			get() {
				if (Color.isColor(this._backgroundColor)) { return this._backgroundColor; }
				return "transparent";
			},
			set(value) {
				if (Color.isColor(value)) {
					this._backgroundColor = value;
					return (this._element != null ? this._element.style["backgroundColor"] = new Color(value.toString()) : undefined);
				}
			}
		}
		);
	
		this.define("perspective", {
			get() {
				return this._perspective;
			},
			set(value) {
				const webkitPerspective = Utils.webkitPerspectiveForValue(value);
				if (webkitPerspective != null) {
					this._perspective = value;
					return (this._element != null ? this._element.style["webkitPerspective"] = webkitPerspective : undefined);
				}
			}
		}
		);
	
		this.define("perspectiveOriginX", {
			get() {
				if (_.isNumber(this._perspectiveOriginX)) { return this._perspectiveOriginX; }
				return 0.5;
			},
			set(value) {
				if (_.isNumber(value)) {
					this._perspectiveOriginX = value;
					return this._updatePerspective();
				}
			}
		}
		);
	
		this.define("perspectiveOriginY", {
			get() {
				if (_.isNumber(this._perspectiveOriginY)) { return this._perspectiveOriginY; }
				return .5;
			},
			set(value) {
				if (_.isNumber(value)) {
					this._perspectiveOriginY = value;
					return this._updatePerspective();
				}
			}
		}
		);
	
		this.define("index", {
			get() { return (this._element != null ? this._element.style["z-index"] : undefined) || 0 || 0; },
			set(value) {
				if (!this._element) { return; }
				return this._element.style["z-index"] = value;
			}
		}
		);
	}

	static all() { return _.clone(Contexts); }

	constructor(options) {

		this.layout = this.layout.bind(this);
		if (options == null) { options = {}; }
		options = Defaults.getDefaults("Context", options);

		super(...arguments);

		if (!options.name) {
			throw Error("Contexts need a name");
		}

		this._parent = options.parent;
		this._name = options.name;

		this.perspective = options.perspective;
		this.perspectiveOriginX = options.perspectiveOriginX;
		this.perspectiveOriginY = options.perspectiveOriginY;

		this.elementInDOM = false;
		this.reset();

		if (options.hasOwnProperty("index")) {
			this.index = options.index;
		} else {
			this.index = this.id;
		}

		Contexts.push(this);
	}

	reset() {

		this._createDOMEventManager();
		this._createRootElement();

		this.resetFrozenEvents();
		this.resetLayers();
		this.resetAnimations();
		this.resetTimers();
		this.resetIntervals();

		return this.emit("reset", this);
	}

	destroy() {
		this.reset();
		this._destroyRootElement();
		return _.remove(Contexts, this);
	}

	addLayer(layer) {
		if (Array.from(this._layers).includes(layer)) { return; }
		this._layerCounter++;
		return this._layers.push(layer);
	}

	removeLayer(layer) {
		return this._layers = _.without(this._layers, layer);
	}

	resetLayers() {
		this.resetGestures();
		this._layers = [];
		return this._layerCounter = 0;
	}

	layerForId(layerId) {
		for (var layer of Array.from(this._layers)) {
			if (layer.id === layerId) { return layer; }
		}
		return null;
	}

	_layerForElement(element) {
		for (var layer of Array.from(this._layers)) {
			if (layer._element === element) { return layer; }
		}
		return null;
	}

	layerForElement(element) {
		// Returns the framer layer containing the element
		if (!element) { return null; }
		const layer = this._layerForElement(element);
		if (layer) { return layer; }
		return this.layerForElement(element.parentNode);
	}

	selectLayer(selector) {
		return Utils.findLayer(this._layers, selector);
	}

	selectAllLayers(selector) {
		return Utils.filterLayers(this._layers, selector);
	}

	layout() {
		return this.rootLayers.map(l => l.layout());
	}

	addAnimation(animation) {
		if (Array.from(this._animations).includes(animation)) { return; }
		return this._animations.push(animation);
	}

	removeAnimation(animation) {
		return this._animations = _.without(this._animations, animation);
	}

	resetAnimations() {
		this.stopAnimations();
		return this._animations = [];
	}

	stopAnimations() {
		if (!this._animations) { return; }
		return this._animations.map(animation => animation.stop(true));
	}

	resetFrozenEvents() {
		return delete this._frozenEvents;
	}

	addTimer(timer) {
		if (Array.from(this._timers).includes(timer)) { return; }
		return this._timers.push(timer);
	}

	removeTimer(timer) {
		window.clearTimeout(timer);
		return this._timers = _.without(this._timers, timer);
	}

	resetTimers() {
		if (this._timers) { this._timers.map(window.clearTimeout); }
		return this._timers = [];
	}

	addInterval(interval) {
		if (Array.from(this._intervals).includes(interval)) { return; }
		return this._intervals.push(interval);
	}

	removeInterval(interval) {
		return this._intervals = _.without(this._intervals, interval);
	}

	resetIntervals() {
		if (this._intervals) { this._intervals.map(window.clearInterval); }
		return this._intervals = [];
	}

	// Gestures
	resetGestures() {
		if (!this._layers) { return; }
		for (var layer of Array.from(this._layers)) {
			if (layer._gestures) {
				layer._gestures.destroy();
			}
		}

	}

	//#############################################################
	// Run

	run(fn) {
		const previousContext = Framer.CurrentContext;
		Framer.CurrentContext = this;
		fn();
		return Framer.CurrentContext = previousContext;
	}


	//#############################################################
	// Freezing

	freeze() {

		if (this._frozenEvents != null) {
			throw new Error("Context is already frozen");
		}

		this._frozenEvents = {};

		for (var layer of Array.from(this._layers)) {

			var layerListeners = {};

			for (var eventName of Array.from(layer.listenerEvents())) {
				layerListeners[eventName] = layer.listeners(eventName);
			}

			layer.removeAllListeners();
			var layerId = this._layers.indexOf(layer);

			this._frozenEvents[layerId] = layerListeners;
		}

		this.stopAnimations();

		// TODO: It would be nice to continue at least intervals after a resume
		this.resetTimers();
		return this.resetIntervals();
	}

	resume() {

		if ((this._frozenEvents == null)) {
			throw new Error("Context is not frozen, cannot resume");
		}

		for (var layerId in this._frozenEvents) {
			var events = this._frozenEvents[layerId];
			var layer = this._layers[layerId];
			for (var eventName in events) {
				var listeners = events[eventName];
				for (var listener of Array.from(listeners)) {
					layer.on(eventName, listener);
				}
			}
		}

		return this.resetFrozenEvents();
	}


	//#############################################################
	// DOM

	_createDOMEventManager() {

		// This manages all dom events for any node in this context centrally,
		// so we can clean them up on a reset, avoiding memory leaks and whatnot.

		if (this.domEventManager != null) {
			this.domEventManager.reset();
		}
		return this.domEventManager = new DOMEventManager;
	}

	_createRootElement() {

		// Everything under the context lives in a single div that we either insert
		// directly on the root, or attach to the parent layer. The element append
		// can be pending if the document isn't ready yet.

		this._destroyRootElement();

		this._element = document.createElement("div");
		this._element.id = `FramerContextRoot-${this._name}`;
		this._element.classList.add("framerContext");
		const webkitPerspective = Utils.webkitPerspectiveForValue(this.perspective);
		if (webkitPerspective != null) {
			this._element.style["webkitPerspective"] = webkitPerspective;
		}
		this._element.style["backgroundColor"] = this.backgroundColor;

		this.__pendingElementAppend = () => {
			let parentElement = this._parent != null ? this._parent._element : undefined;
			if (parentElement == null) { parentElement = document.body; }
			parentElement.appendChild(this._element);
			this.elementInDOM = true;
			return this._layers != null ? this._layers.map(l => l.elementInsertedIntoDocument()) : undefined;
		};

		return Utils.domComplete(this.__pendingElementAppend);
	}

	_destroyRootElement() {

		// This removes the context element and cancels async insertion if the
		// document wasn't ready yet.

		if (this._element != null ? this._element.parentNode : undefined) {
			this._element.parentNode.removeChild(this._element);
			this.elementInDOM = false;
		}

		if (this.__pendingElementAppend) {
			Utils.domCompleteCancel(this.__pendingElementAppend);
			this.__pendingElementAppend = null;
		}

		return this._element = null;
	}

	_updatePerspective() {
		return (this._element != null ? this._element.style["webkitPerspectiveOrigin"] = `${this.perspectiveOriginX * 100}% ${this.perspectiveOriginY * 100}%` : undefined);
	}

	containers(ignoredArgument, result) {
		if (ignoredArgument == null) { ignoredArgument = true; }
		if (result == null) { result = []; }
		if (this._parent != null) {
			result.push(this._parent);
			return (this._parent != null ? this._parent.containers(true, result) : undefined);
		} else {
			return result;
		}
	}


	toInspect() {

		const round = function(value) {
			if (parseInt(value) === value) {
				return parseInt(value);
			}
			return Utils.round(value, 1);
		};

		return `<${this.constructor.name} id:${this.id} name:${this._name} ${round(this.width)}x${round(this.height)}>`;
	}
});
Cls.initClass();
