// Modern ES module imports
import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { BaseClass } from "./BaseClass.js";
import { Events as BaseEvents } from "./Events.js";

// Extend the Events object with new event types
export const Events = {
  ...BaseEvents,
  EventBufferReset: "eventbufferreset",
  EventBufferUpdated: "eventbufferupdated",
};

export class EventBuffer extends BaseClass {
  constructor(options = {}) {
    super();
    this.options = _.defaults(options, { velocityTimeout: 100 });
    this._events = [];
  }

  // Computed properties
  get length() {
    return this._events.length;
  }

  get first() {
    return this._events[0];
  }

  get events() {
    const timeout =
      (Utils.getTime?.() ?? Date.now()) - this.options.velocityTimeout;
    return _.filter(this._events, (event) => event.t > timeout);
  }

  get offset() {
    const events = this.events;
    if (events.length < 2) return { x: 0, y: 0 };

    const current = events[events.length - 1];
    const first = events[0];
    return {
      x: current.x - first.x,
      y: current.y - first.y,
    };
  }

  get angle() {
    const events = this.events;
    if (events.length < 2) return 0;

    const p1 = events[0];
    const p2 = events[1];
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  }

  get velocity() {
    const events = this.events;
    if (events.length < 2) return { x: 0, y: 0 };

    const current = events[events.length - 1];
    const first = events[0];
    const time = current.t - first.t;

    let velocity = {
      x: (current.x - first.x) / time,
      y: (current.y - first.y) / time,
    };

    if (!isFinite(velocity.x)) velocity.x = 0;
    if (!isFinite(velocity.y)) velocity.y = 0;

    return velocity;
  }

  // Methods
  push(event) {
    this._events.push(event);
    this.emit(Events.EventBufferUpdated, event);
  }

  reset() {
    this._events.length = 0;
    this.emit(Events.EventBufferReset);
  }

  // Simple emit helper (if BaseClass doesn't already have it)
  emit(eventName, payload) {
    if (typeof this.onEvent === "function") {
      this.onEvent(eventName, payload);
    }
  }
}
