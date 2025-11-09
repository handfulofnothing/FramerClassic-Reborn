/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("./Utils");

const {_} = require("./Underscore");
const {Gestures} = require("./Gestures");

const Events = {};


// Standard dom events
Events.MouseUp = "mouseup";
Events.MouseDown = "mousedown";
Events.MouseOver = "mouseover";
Events.MouseOut = "mouseout";
Events.MouseEnter = "mouseenter";
Events.MouseLeave = "mouseleave";
Events.MouseMove = "mousemove";
Events.MouseWheel = "mousewheel";
Events.DoubleClick = "dblclick";
Events.MouseDoubleClick = "dblclick"; // Alias for consistent naming

const supportsPointerEvents = (window.onpointerdown === null) && (window.onpointermove === null) && (window.onpointerup === null);

Events.PointerUp = "pointerup";
Events.PointerDown = "pointerdown";
Events.PointerOver = "pointerover";
Events.PointerOut = "pointerout";
Events.PointerMove = "pointermove";

// Standard touch events
Events.enableEmulatedTouchEvents = function(enable) {
	// never emulate if the browsers supports pointer events
	if (enable == null) { enable = true; }
	if (supportsPointerEvents) { return; }
	if (enable) {
		Events.TouchStart = Events.MouseDown;
		Events.TouchEnd = Events.MouseUp;
		Events.TouchMove = Events.MouseMove;
		// When we are simulating touch events, click should use the simulated touch-event
		return Events.Click = "touchend";
	} else {
		Events.TouchStart = "touchstart";
		Events.TouchEnd = "touchend";
		Events.TouchMove = "touchmove";
		// When not simulating, click should be based on if touch is supported or not
		return Events.Click = Utils.isTouch() ? "touchend" : "mouseup";
	}
};

// Let's make sure the touch events work on desktop too
Events.enableEmulatedTouchEvents(!Utils.isTouch());

if (supportsPointerEvents) {
	Events.MouseUp = Events.PointerUp;
	Events.MouseDown = Events.PointerDown;
	Events.MouseOver = Events.PointerOver;
	Events.MouseOut = Events.PointerOut;
	Events.MouseMove = Events.PointerMove;
	Events.TouchStart = Events.PointerDown;
	Events.TouchEnd = Events.PointerUp;
	Events.TouchMove = Events.PointerMove;
	// Use pointerEvents for click
	Events.Click = Events.PointerUp;
}

// Animation events
Events.AnimationStart = "start";
Events.AnimationHalt = "halt";
Events.AnimationStop = "stop";
Events.AnimationEnd = "end";

Events.AnimationDidStart = Events.AnimationStart; // Deprecated
Events.AnimationDidStop = Events.AnimationStop; // Deprecated
Events.AnimationDidEnd = Events.AnimationEnd; // Deprecated

// State events
Events.StateSwitchStart = "stateswitchstart";
Events.StateSwitchStop = "stateswitchstop";
Events.StateSwitchEnd = "stateswitchend";

Events.StateWillSwitch = Events.StateSwitchStart; // Deprecated
Events.StateDidSwitch = Events.StateSwitchEnd; // Deprecated

// Scroll events
Events.Scroll = "scroll";

// Image events
Events.ImageLoaded = "imageload";
Events.ImageLoadError = "imageerror";
Events.ImageLoadCancelled = "imagecancelled";

// Sensor Events
Events.DeviceOrientation = "deviceorientation";
Events.DeviceMotion = "devicemotion";

// Add all gesture events
_.extend(Events, Gestures);

// Extract touch events for any event
Events.touchEvent = function(event) {
	let touchEvent = event.touches != null ? event.touches[0] : undefined;
	if (touchEvent == null) { touchEvent = event.changedTouches != null ? event.changedTouches[0] : undefined; }
	if (touchEvent == null) { touchEvent = event; }
	return touchEvent;
};

Events.wrap = element => Framer.CurrentContext.domEventManager.wrap(element);

Events.isGesture = eventName => Array.from(Gestures).includes(eventName);

const interactiveEvents = _.values(Gestures).concat([
	Events.TouchStart,
	Events.TouchEnd,
	Events.MouseUp,
	Events.MouseDown,
	Events.MouseWheel,
	Events.DoubleClick
]);

Events.isInteractive = eventName => Array.from(interactiveEvents).includes(eventName);

exports.Events = Events;
