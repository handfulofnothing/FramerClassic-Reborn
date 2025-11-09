const Utils = require("../Utils");
const { Layer } = require("../Layer");
const { Events } = require("../Events");

`\
SliderComponent

knob <layer>
knobSize <width, height>
fill <layer>
min <number>
max <number>

pointForValue(<n>)
valueForPoint(<n>)

animateToValue(value, animationOptions={})\
`;

Events.SliderValueChange = "sliderValueChange";

class Knob extends Layer {
  constructor(options) {
    super(options);
  }
}

export class SliderComponent extends Layer {
  static initClass() {
    this.define("constrained", this.simpleProperty("constrained", false));

    this.define("knobSize", {
      get() {
        return this._knobSize;
      },
      set(value) {
        const isRound = this.knob.borderRadius * 2 === this._knobSize;
        this._knobSize = value;
        this.knob.width = this._knobSize;
        this.knob.height = this._knobSize;
        if (isRound) {
          this.knob.borderRadius = this._knobSize / 2;
        }
        return this._updateFrame();
      },
    });

    this.define("hitArea", {
      get() {
        return this._hitArea;
      },
      set(value) {
        this._hitArea = value;
        if (this.width > this.height) {
          this.sliderOverlay.width = this.width + this.hitArea;
          return (this.sliderOverlay.height = this.hitArea);
        } else {
          this.sliderOverlay.width = this.hitArea;
          return (this.sliderOverlay.height = this.height + this.hitArea);
        }
      },
    });

    this.define("min", {
      get() {
        return this._min || 0;
      },
      set(value) {
        if (_.isFinite(value)) {
          return (this._min = value);
        }
      },
    });

    this.define("max", {
      get() {
        return this._max || 1;
      },
      set(value) {
        if (_.isFinite(value)) {
          return (this._max = value);
        }
      },
    });

    this.define("value", {
      get() {
        return this._value;
      },
      set(value) {
        if (!_.isFinite(value)) {
          return;
        }

        this._value = Utils.clamp(value, this.min, this.max);

        if (this.width > this.height) {
          this.knob.midX = this.pointForValue(value);
        } else {
          this.knob.midY = this.pointForValue(value);
        }

        this._updateFill();
        return this._updateValue();
      },
    });
  }

  constructor(options) {
    this._tapStart = this._tapStart.bind(this);
    this._tapEnd = this._tapEnd.bind(this);
    this._updateFill = this._updateFill.bind(this);
    this._updateKnob = this._updateKnob.bind(this);
    this._updateFrame = this._updateFrame.bind(this);
    this._setRadius = this._setRadius.bind(this);
    this._knobDidMove = this._knobDidMove.bind(this);
    this._updateValue = this._updateValue.bind(this);
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      backgroundColor: "#ccc",
      borderRadius: 50,
      clip: false,
      width: 300,
      height: 10,
      value: 0,
      knobSize: 30,
    });

    // Set some sensible default for the hit area
    if (options.hitArea == null) {
      options.hitArea = options.knobSize;
    }

    this.knob = new Knob({
      backgroundColor: "#fff",
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      name: "knob",
    });

    this.fill = new Layer({
      backgroundColor: "#333",
      width: 0,
      force2d: true,
      name: "fill",
    });

    this.sliderOverlay = new Layer({
      backgroundColor: null,
      name: "sliderOverlay",
    });

    super(options);

    this.knobSize = options.knobSize;
    this.knob.parent = this.fill.parent = this.sliderOverlay.parent = this;

    // Set fill initially
    if (this.width > this.height) {
      this.fill.height = this.height;
    } else {
      this.fill.width = this.width;
    }

    this.fill.borderRadius = this.sliderOverlay.borderRadius =
      this.borderRadius;

    this.knob.draggable.enabled = true;
    this.knob.draggable.overdrag = false;
    this.knob.draggable.momentum = true;
    this.knob.draggable.momentumOptions = { friction: 5, tolerance: 0.25 };
    this.knob.draggable.bounce = false;
    this.knob.borderRadius = this.knobSize / 2;

    this._updateFrame();
    this._updateKnob();
    this._updateFill();

    this.on("change:frame", this._updateFrame);
    this.on("change:borderRadius", this._setRadius);
    this.knob.on("change:size", this._updateKnob);
    this.knob.on("change:frame", this._updateFill);
    this.knob.on("change:frame", this._knobDidMove);

    this.sliderOverlay.on(Events.TapStart, this._tapStart);
    this.sliderOverlay.on(Events.TapEnd, this._tapEnd);
  }

  _tapStart(event) {
    event.preventDefault();

    if (this.width > this.height) {
      const touchX = Events.touchEvent(event).clientX - Screen.canvasFrame.x;
      const scaleX = this.canvasScaleX();
      this.value = this.valueForPoint(touchX / scaleX - this.screenFrame.x);
    } else {
      const touchY = Events.touchEvent(event).clientY - Screen.canvasFrame.y;
      const scaleY = this.canvasScaleY();
      this.value = this.valueForPoint(touchY / scaleY - this.screenFrame.y);
    }

    this.knob.draggable._panStart(event);
    return this._updateValue();
  }

  _tapEnd(event) {
    return this._updateValue();
  }

  _updateFill() {
    if (this.width > this.height) {
      return (this.fill.width = this.knob.midX);
    } else {
      return (this.fill.height = this.knob.midY);
    }
  }

  _updateKnob() {
    if (this.width > this.height) {
      this.knob.midX = this.fill.width;
      return this.knob.centerY();
    } else {
      this.knob.midY = this.fill.height;
      return this.knob.centerX();
    }
  }

  _updateFrame() {
    this.knob.draggable.constraints = {
      x: -this.knob.width / 2,
      y: -this.knob.height / 2,
      width: this.width + this.knob.width,
      height: this.height + this.knob.height,
    };

    if (this.constrained) {
      this.knob.draggable.constraints = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      };
    }

    this.hitArea = this.hitArea;

    if (this.width > this.height) {
      this.fill.height = this.height;
      this.knob.midX = this.pointForValue(this.value);
      this.knob.centerY();
    } else {
      this.fill.width = this.width;
      this.knob.midY = this.pointForValue(this.value);
      this.knob.centerX();
    }

    if (this.width > this.height) {
      this.knob.draggable.speedY = 0;
      this.knob.draggable.speedX = 1;
    } else {
      this.knob.draggable.speedX = 0;
      this.knob.draggable.speedY = 1;
    }

    return this.sliderOverlay.center();
  }

  _setRadius() {
    const radius = this.borderRadius;
    return (this.fill.borderRadius = {
      topLeft: radius,
      bottomLeft: radius,
    });
  }

  _knobDidMove() {
    if (this.width > this.height) {
      return (this.value = this.valueForPoint(this.knob.midX));
    } else {
      return (this.value = this.valueForPoint(this.knob.midY));
    }
  }

  _updateValue() {
    if (this._lastUpdatedValue === this.value) {
      return;
    }

    this._lastUpdatedValue = this.value;
    this.emit("change:value", this.value);
    return this.emit(Events.SliderValueChange, this.value);
  }

  pointForValue(value) {
    if (this.width > this.height) {
      if (this.constrained) {
        return Utils.modulate(
          value,
          [this.min, this.max],
          [0 + this.knob.width / 2, this.width - this.knob.width / 2],
          true
        );
      } else {
        return Utils.modulate(
          value,
          [this.min, this.max],
          [0, this.width],
          true
        );
      }
    } else {
      if (this.constrained) {
        return Utils.modulate(
          value,
          [this.min, this.max],
          [0 + this.knob.height / 2, this.height - this.knob.height / 2],
          true
        );
      } else {
        return Utils.modulate(
          value,
          [this.min, this.max],
          [0, this.height],
          true
        );
      }
    }
  }

  valueForPoint(value) {
    if (this.width > this.height) {
      if (this.constrained) {
        return Utils.modulate(
          value,
          [0 + this.knob.width / 2, this.width - this.knob.width / 2],
          [this.min, this.max],
          true
        );
      } else {
        return Utils.modulate(
          value,
          [0, this.width],
          [this.min, this.max],
          true
        );
      }
    } else {
      if (this.constrained) {
        return Utils.modulate(
          value,
          [0 + this.knob.height / 2, this.height - this.knob.height / 2],
          [this.min, this.max],
          true
        );
      } else {
        return Utils.modulate(
          value,
          [0, this.height],
          [this.min, this.max],
          true
        );
      }
    }
  }

  animateToValue(value, animationOptions) {
    if (animationOptions == null) {
      animationOptions = { curve: "spring(300, 25, 0)" };
    }
    if (!_.isFinite(value)) {
      return;
    }
    if (this.width > this.height) {
      animationOptions.properties = {
        x: this.pointForValue(value) - this.knob.width / 2,
      };
    } else {
      animationOptions.properties = {
        y: this.pointForValue(value) - this.knob.height / 2,
      };
    }

    return this.knob.animate(animationOptions);
  }

  //#############################################################
  //# EVENT HELPERS

  onValueChange(cb) {
    return this.on(Events.SliderValueChange, cb);
  }
}
SliderComponent.initClass();
