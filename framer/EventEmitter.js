/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {_} = require("./Underscore");

const EventEmitter3 = require("eventemitter3");

const EventKey = "_events";

exports.EventEmitter = class EventEmitter extends EventEmitter3 {

	listenerEvents() {
		return _.keys(this[EventKey]);
	}

	removeAllListeners(eventName) {

		// We override this method to make the eventName optional. If none
		// is given we remove all listeners for all event names.

		let eventNames;
		if (eventName) {
			eventNames = [eventName];
		} else {
			eventNames = this.listenerEvents();
		}

		return (() => {
			const result = [];
			for (eventName of Array.from(eventNames)) {
				result.push(Array.from(this.listeners(eventName)).map((listener) =>
					this.removeListener(eventName, listener)));
			}
			return result;
		})();
	}
};
