import { BaseClass } from "./BaseClass.js";
import { Events } from "./Events.js";

Events.MIDICommand = "midiCommand";

export class MIDIInput extends BaseClass {
  constructor(...args) {
    super(...args);
    this._requestResolved = this._requestResolved.bind(this);
    this._onMidiMessage = this._onMidiMessage.bind(this);
    this._requestRejected = this._requestRejected.bind(this);
  }

  static initClass() {
    this.define("enabled", {
      get() {
        return (this._inputs?.length ?? undefined) || this._request;
      },
      set(value) {
        if (value === this.enabled) return;

        if (!navigator.requestMIDIAccess) {
          return this._requestRejected();
        }

        if (value) {
          this._request = navigator
            .requestMIDIAccess()
            .then(this._requestResolved, this._requestRejected);
        } else {
          this._inputs?.forEach((input) => input.close?.());
          this._request = null;
          this._inputs = [];
        }
      },
    });
  }

  // Success handler
  _requestResolved(access) {
    this._inputs = [];
    access.inputs.forEach((input) => {
      this._inputs.push(input);
      input.onmidimessage = this._onMidiMessage(input.id);
    });
  }

  // Failure handler
  _requestRejected(error) {
    throw new Error(
      `Requesting MIDI access failed: ${error ?? "not supported by browser"}`
    );
  }

  // Event handler
  _onMidiMessage(sourceID) {
    return (message) => {
      this.emit(Events.MIDICommand, sourceID, message.timeStamp, message.data);
    };
  }

  // Event shortcut
  onCommand(cb) {
    return this.on(Events.MIDICommand, cb);
  }
}

// Initialize static properties
MIDIInput.initClass();

// Export a singleton instance
export const midiInput = new MIDIInput();
