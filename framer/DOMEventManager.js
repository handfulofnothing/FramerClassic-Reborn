/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {_} = require("./Underscore");
const {EventEmitter} = require("./EventEmitter");

const Utils = require("./Utils");

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
		this.element = element;
	}

	addListener(eventName, listener, capture) {
		if (capture == null) { capture = false; }
		listener.capture = capture; // Make sure we store capture too
		super.addListener(eventName, listener);
		return this.element.addEventListener(eventName, listener, capture);
	}

	removeListener(eventName, listener, capture) {
		if (capture == null) { capture = false; }
		super.removeListener(eventName, listener);
		return this.element.removeEventListener(eventName, listener, listener.capture);
	}
}
DOMEventManagerElement.initClass();


exports.DOMEventManager = class DOMEventManager {

	constructor(element) {
		this.wrap = this.wrap.bind(this);
		this.remove = this.remove.bind(this);
		this._elements = {};
	}

	wrap(element) {

		if (!element._eventManagerId) {
			element._eventManagerId = EventManagerIdCounter++;
		}

		if (!this._elements[element._eventManagerId]) {
			this._elements[element._eventManagerId] = new DOMEventManagerElement(element);
		}

		return this._elements[element._eventManagerId];
	}

	remove(element) {
		if (!element._eventManagerId) { return; }
		delete this._elements[element._eventManagerId];
		return element._eventManagerId = 0;
	}

	reset() {
		return (() => {
			const result = [];
			for (var element in this._elements) {
				var elementEventManager = this._elements[element];
				result.push(elementEventManager.removeAllListeners());
			}
			return result;
		})();
	}
};
