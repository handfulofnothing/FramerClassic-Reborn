import _ from "./Underscore.js";
import { EventEmitter } from "./EventEmitter.js";
import * as Utils from "./Utils.js";

let EventManagerIdCounter = 1;

class DOMEventManagerElement extends EventEmitter {
  static initClass() {
    // Keep the DOM API working
    this.prototype.addEventListener = this.prototype.addListener;
    this.prototype.removeEventListener = this.prototype.removeListener;

    // Keep the Node API working
    this.prototype.on = this.prototype.addListener;
    this.prototype.off = this.prototype.removeListener;
  }

  constructor(element) {
    super();
    this.element = element;
  }

  addListener(eventName, listener, capture = false) {
    listener.capture = capture; // store capture too
    super.addListener(eventName, listener);
    this.element.addEventListener(eventName, listener, capture);
  }

  removeListener(eventName, listener, capture = false) {
    super.removeListener(eventName, listener);
    this.element.removeEventListener(eventName, listener.capture);
  }
}

DOMEventManagerElement.initClass();

export class DOMEventManager {
  constructor() {
    this.wrap = this.wrap.bind(this);
    this.remove = this.remove.bind(this);
    this._elements = {};
  }

  wrap(element) {
    if (!element._eventManagerId) {
      element._eventManagerId = EventManagerIdCounter++;
    }

    if (!this._elements[element._eventManagerId]) {
      this._elements[element._eventManagerId] = new DOMEventManagerElement(
        element
      );
    }

    return this._elements[element._eventManagerId];
  }

  remove(element) {
    if (!element._eventManagerId) return;
    delete this._elements[element._eventManagerId];
    element._eventManagerId = 0;
  }

  reset() {
    for (const key in this._elements) {
      this._elements[key].removeAllListeners();
    }
  }
}
