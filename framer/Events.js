import Utils from "./Utils.js";
import _ from "./Underscore.js";
import { Gestures } from "./Gestures.js";

const Events = {
  // Standard DOM events
  MouseUp: "mouseup",
  MouseDown: "mousedown",
  MouseOver: "mouseover",
  MouseOut: "mouseout",
  MouseEnter: "mouseenter",
  MouseLeave: "mouseleave",
  MouseMove: "mousemove",
  MouseWheel: "mousewheel",
  DoubleClick: "dblclick",
  MouseDoubleClick: "dblclick", // Alias
};

// Pointer support detection
const supportsPointerEvents =
  window.onpointerdown === null &&
  window.onpointermove === null &&
  window.onpointerup === null;

Events.PointerUp = "pointerup";
Events.PointerDown = "pointerdown";
Events.PointerOver = "pointerover";
Events.PointerOut = "pointerout";
Events.PointerMove = "pointermove";

// Touch events
Events.enableEmulatedTouchEvents = (enable = true) => {
  if (supportsPointerEvents) return;

  if (enable) {
    Events.TouchStart = Events.MouseDown;
    Events.TouchEnd = Events.MouseUp;
    Events.TouchMove = Events.MouseMove;
    Events.Click = "touchend";
  } else {
    Events.TouchStart = "touchstart";
    Events.TouchEnd = "touchend";
    Events.TouchMove = "touchmove";
    Events.Click = Utils.isTouch() ? "touchend" : "mouseup";
  }
};

// Ensure touch events work on desktop too
Events.enableEmulatedTouchEvents(!Utils.isTouch());

// Use pointer events if supported
if (supportsPointerEvents) {
  Events.MouseUp = Events.PointerUp;
  Events.MouseDown = Events.PointerDown;
  Events.MouseOver = Events.PointerOver;
  Events.MouseOut = Events.PointerOut;
  Events.MouseMove = Events.PointerMove;

  Events.TouchStart = Events.PointerDown;
  Events.TouchEnd = Events.PointerUp;
  Events.TouchMove = Events.PointerMove;
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

// Sensor events
Events.DeviceOrientation = "deviceorientation";
Events.DeviceMotion = "devicemotion";

// Merge gesture events
Object.assign(Events, Gestures);

// Extract touch from any event
Events.touchEvent = (event) => {
  return event.touches?.[0] ?? event.changedTouches?.[0] ?? event;
};

// Wrapping for Framer
Events.wrap = (element) => Framer.CurrentContext.domEventManager.wrap(element);

// Check if an event is a gesture
Events.isGesture = (eventName) => Object.values(Gestures).includes(eventName);

// Interactive events
const interactiveEvents = [
  ...Object.values(Gestures),
  Events.TouchStart,
  Events.TouchEnd,
  Events.MouseUp,
  Events.MouseDown,
  Events.MouseWheel,
  Events.DoubleClick,
];

Events.isInteractive = (eventName) => interactiveEvents.includes(eventName);

export { Events };
