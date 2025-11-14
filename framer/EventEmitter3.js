/**
 * Pure ES Module EventEmitter implementation
 * No external dependencies, fully compatible with ES6 class inheritance
 */
export default class EventEmitter3 {
	constructor() {
		this._events = Object.create(null);
		this._eventsCount = 0;
	}

	/**
	 * Add a listener for a given event
	 */
	on(event, fn, context) {
		return this._addListener(event, fn, context, false);
	}

	/**
	 * Add a one-time listener for a given event
	 */
	once(event, fn, context) {
		return this._addListener(event, fn, context, true);
	}

	/**
	 * Remove the listeners of a given event
	 */
	off(event, fn, context, once) {
		if (!this._events[event]) return this;

		if (!fn) {
			this._clearEvent(event);
			return this;
		}

		const listeners = this._events[event];
		const events = [];

		for (let i = 0; i < listeners.length; i++) {
			if (
				listeners[i].fn !== fn ||
				(once && !listeners[i].once) ||
				(context && listeners[i].context !== context)
			) {
				events.push(listeners[i]);
			}
		}

		if (events.length) {
			this._events[event] = events.length === 1 ? events[0] : events;
		} else {
			this._clearEvent(event);
		}

		return this;
	}

	/**
	 * Remove all listeners, or those of the specified event
	 */
	removeAllListeners(event) {
		if (event !== undefined) {
			if (this._events[event]) this._clearEvent(event);
		} else {
			this._events = Object.create(null);
			this._eventsCount = 0;
		}

		return this;
	}

	/**
	 * Emit an event to all registered listeners
	 */
	emit(event, ...args) {
		if (!this._events[event]) return false;

		const listeners = this._events[event];
		const length = args.length;

		if (Array.isArray(listeners)) {
			for (let i = 0; i < listeners.length; i++) {
				if (listeners[i].once) {
					this.off(event, listeners[i].fn, undefined, true);
				}

				this._emitListener(listeners[i], length, args);
			}
		} else {
			if (listeners.once) this.off(event, listeners.fn, undefined, true);
			this._emitListener(listeners, length, args);
		}

		return true;
	}

	/**
	 * Get all listener function names for an event
	 */
	listeners(event) {
		const listeners = this._events[event];

		if (!listeners) return [];
		if (Array.isArray(listeners)) {
			return listeners.map((listener) => listener.fn);
		}
		return [listeners.fn];
	}

	/**
	 * Get the number of listeners for an event
	 */
	listenerCount(event) {
		const listeners = this._events[event];

		if (!listeners) return 0;
		if (Array.isArray(listeners)) return listeners.length;
		return 1;
	}

	/**
	 * Return an array listing the events for which the emitter has registered listeners
	 */
	eventNames() {
		if (this._eventsCount === 0) return [];
		return Object.keys(this._events);
	}

	/**
	 * Internal: Add a listener
	 */
	_addListener(event, fn, context, once) {
		if (typeof fn !== 'function') {
			throw new TypeError('The listener must be a function');
		}

		const listener = { fn, context: context || this, once: once || false };
		const existing = this._events[event];

		if (!existing) {
			this._events[event] = listener;
			this._eventsCount++;
		} else if (Array.isArray(existing)) {
			existing.push(listener);
		} else {
			this._events[event] = [existing, listener];
		}

		return this;
	}

	/**
	 * Internal: Clear a specific event
	 */
	_clearEvent(event) {
		if (--this._eventsCount === 0) {
			this._events = Object.create(null);
		} else {
			delete this._events[event];
		}
	}

	/**
	 * Internal: Call a listener with arguments
	 */
	_emitListener(listener, argLength, args) {
		switch (argLength) {
			case 0:
				return listener.fn.call(listener.context);
			case 1:
				return listener.fn.call(listener.context, args[0]);
			case 2:
				return listener.fn.call(listener.context, args[0], args[1]);
			case 3:
				return listener.fn.call(listener.context, args[0], args[1], args[2]);
			default:
				return listener.fn.apply(listener.context, args);
		}
	}
}

// Aliases for compatibility
EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
EventEmitter3.prototype.removeListener = EventEmitter3.prototype.off;
