/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {BaseClass} = require("./BaseClass");
const {Events} = require("./Events");

Events.MIDICommand = "midiCommand";

class MIDIInput extends BaseClass {
	constructor(...args) {
		this._requestResolved = this._requestResolved.bind(this);
		this._onmidimessage = this._onmidimessage.bind(this);
		super(...args);
	}

	static initClass() {
	
		this.define("enabled", {
			get() { return (this._inputs != null ? this._inputs.length : undefined) || this._request; },
			set(value) {
				if (value === this.enabled) { return; }
				if (!window.parent.navigator.requestMIDIAccess) { return this._requestRejected(); }
				if (value) {
					return this._request = window.parent.navigator.requestMIDIAccess().then(this._requestResolved, this._requestRejected);
				} else {
					if (this._inputs != null) {
						this._inputs.map(close);
					}
					this._request = null;
					return this._inputs = [];
				}
			}
		});
	}

	// Success handlers

	_requestResolved(access) {
		if (this._inputs == null) { this._inputs = []; }
		return access.inputs.forEach(input => {
			this._inputs.push(input);
			return input.onmidimessage = this._onmidimessage(input.id);
		});
	}

	// Failure handlers

	_requestRejected(error) {
		throw Error(`Requesting MIDI access failed: ${error != null ? error : "not supported by browser"}`);
	}

	// Event handlers

	_onmidimessage(sourceID) {
		return message => this.emit(Events.MIDICommand, sourceID, message.timeStamp, message.data);
	}

	// Event shortcuts

	onCommand(cb) { return this.on(Events.MIDICommand, cb); }
}
MIDIInput.initClass();

exports.MIDIInput = new MIDIInput;
