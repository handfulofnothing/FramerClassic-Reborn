import _ from "./Underscore.js";
import EventEmitter3 from "eventemitter3";

const EventKey = "_events";

export class EventEmitter extends EventEmitter3 {
  listenerEvents() {
    return _.keys(this[EventKey] ?? {});
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
