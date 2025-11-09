import _ from "../Underscore.js";
import { BaseClass } from "../BaseClass.js";
import { Events } from "../Events.js";
import { MIDIInput } from "../MIDIInput.js";
import Utils from "../Utils.js";

Events.MIDIComponentValueChange = "MIDIComponentValueChange";

export class MIDIComponent extends BaseClass {
  static initClass() {
    this.define("min", this.simpleProperty("min", 0));
    this.define("max", this.simpleProperty("max", 127));
    this.define("control", this.simpleProperty("control", null));
    this.define("channel", this.simpleProperty("channel", null));
    this.define("source", this.simpleProperty("source", null));
  }

  constructor(options = {}) {
    super(options);

    MIDIInput.enabled = true;

    MIDIInput.onCommand((source, timeStamp, data) => {
      const [b1, b2, b3] = data;

      const command = b1 & 0xf0;
      const channel = (b1 & 0x0f) + 1; // 1-16
      const data1 = b2 & 0x7f;
      const data2 = b3 & 0x7f;

      if (![0xb0, 0x90, 0x80].includes(command)) return;
      if (this.source != null && this.source !== source) return;
      if (this.channel != null && this.channel !== channel) return;
      if (this.control != null && this.control !== data1) return;

      let info = { source, channel, control: data1 };

      if ([0x90, 0x80].includes(command)) {
        info = _.defaults(info, { type: "note" });
      }

      this.emit(Events.MIDIComponentValueChange, this._modulate(data2), info);
    });
  }

  _modulate(value) {
    return Utils.modulate(value, [0, 127], [this.min, this.max]);
  }

  onValueChange(cb) {
    return this.on(Events.MIDIComponentValueChange, cb);
  }
}

MIDIComponent.initClass();
