import _ from "./Underscore.js";
import EventEmitter3 from "./EventEmitter3.js";

export class EventEmitter extends EventEmitter3 {
  constructor() {
    super();
  }

  listenerEvents() {
    return this.eventNames();
  }

  removeAllListeners(eventName) {
    const eventNames = eventName ? [eventName] : this.listenerEvents();

    for (const name of eventNames) {
      const listeners = this.listeners(name);
      for (const listener of listeners) {
        this.removeListener(name, listener);
      }
    }
  }
}
