import { EventEmitter } from "./EventEmitter.js";
import Utils from "./Utils.js";

export const calculateFrame = (layer, rules) => {
  const val = (rule) => {
    let value = rules[rule];
    return typeof value === "function" ? value() : value;
  };

  const def = (rule) => typeof val(rule) === "number";

  // Center shorthand
  if (def("center")) {
    rules.centerX = val("center");
    rules.centerY = val("center");
  }

  const parent = layer.parent ?? Screen;
  const frame = layer.frame;

  // Horizontal positioning
  if (def("left") && def("right")) {
    frame.x = val("left");
    frame.width = parent.width - val("left") - val("right");
  } else if (def("left")) {
    frame.x = val("left");
  } else if (def("right")) {
    frame.x = parent.width - frame.width - val("right");
  } else if (def("centerX")) {
    frame.x = (parent.width - frame.width) / 2 + val("centerX");
  }

  // Vertical positioning
  if (def("top") && def("bottom")) {
    frame.y = val("top");
    frame.height = parent.height - val("top") - val("bottom");
  } else if (def("top")) {
    frame.y = val("top");
  } else if (def("bottom")) {
    frame.y = parent.height - frame.height - val("bottom");
  } else if (def("centerY")) {
    frame.y = (parent.height - frame.height) / 2 + val("centerY");
  }

  return frame;
};

export class LayerAnchor extends EventEmitter {
  constructor(layer, rules) {
    super();
    this.layer = layer;
    this._currentListeners = {};

    this._setupListener = this._setupListener.bind(this);
    this._addListener = this._addListener.bind(this);
    this._setNeedsUpdate = this._setNeedsUpdate.bind(this);

    this.updateRules(rules);
  }

  updateRules(rules) {
    this.rules = this._parseRules(rules);
    this.layer.on("change:parent", this._setupListener);
    this._setNeedsUpdate();
    this._removeListeners();
    this._setupListener();
  }

  _setupListener() {
    this._removeListeners();
    const target = this.layer.parent ?? Canvas;
    const event = this.layer.parent ? "change:frame" : "resize";
    this._addListener(target, event, this._setNeedsUpdate);
  }

  _addListener(obj, eventName, listener) {
    obj.on(eventName, listener);
    if (!this._currentListeners[obj]) this._currentListeners[obj] = [];
    this._currentListeners[obj].push(eventName);
  }

  _removeListeners() {
    for (const obj in this._currentListeners) {
      const events = this._currentListeners[obj];
      events.forEach((event) => obj.off(event, this._setNeedsUpdate));
    }
    this._currentListeners = {};
  }

  _setNeedsUpdate() {
    this.layer.frame = calculateFrame(this.layer, this.rules);
  }

  _parseRules(...args) {
    return Utils.parseRect(Utils.arrayFromArguments(args));
  }
}
