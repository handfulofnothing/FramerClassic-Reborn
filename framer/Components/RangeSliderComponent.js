import Utils from "../Utils.js";
import { Layer } from "../Layer.js";
import { Events } from "../Events.js";
`\
RangeSliderComponent

minKnob <layer>
maxKnob <layer>
knobSize <width, height>
fill <layer>

min <number>
max <number>
minValue <number>
maxValue <number>

pointForValue(<n>)
valueForPoint(<n>)

animateToMinValue(value, animationOptions={})
animateToMaxValue(value, animationOptions={})\
`;

Events.SliderValueChange = "sliderValueChange";
Events.SliderMinValueChange = "sliderMinValueChange";
Events.SliderMaxValueChange = "sliderMaxValueChange";

class Knob extends Layer {
  constructor(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, {
      backgroundColor: "#fff",
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: "rgba(0, 0, 0, 0.3)",
    });

    super(options);
  }
}
export class RangeSliderComponent extends Layer {
  static initClass() {
    this.define("constrained", this.simpleProperty("constrained", false));

    this.define("knobSize", {
      get() {
        return this._knobSize;
      },
      set(value) {
        for (var knob of [this.minKnob, this.maxKnob]) {
          var isRound = knob.borderRadius * 2 === this._knobSize;
          this._knobSize = value;
          knob.size = this._knobSize;
          if (isRound) {
            knob.borderRadius = this._knobSize / 2;
          }
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

    this.define("minValue", {
      get() {
        return this._minValue || 0;
      },
      set(value) {
        if (!_.isFinite(value)) {
          return;
        }
        this._minValue = value;

        if (this.width > this.height) {
          this.minKnob.midX = this.pointForValue(value);
        } else {
          this.minKnob.midY = this.pointForValue(value);
        }

        this._updateFill();
        return this._updateValue();
      },
    });

    this.define("maxValue", {
      get() {
        return this._maxValue || 0.5;
      },
      set(value) {
        if (!_.isFinite(value)) {
          return;
        }
        this._maxValue = value;

        if (this.width > this.height) {
          this.maxKnob.midX = this.pointForValue(value);
        } else {
          this.maxKnob.midY = this.pointForValue(value);
        }

        this._updateFill();
        return this._updateValue();
      },
    });
  }

  constructor(options) {
    this._tapStart = this._tapStart.bind(this);
    this._tapEnd = this._tapEnd.bind(this);
    this._styleKnob = this._styleKnob.bind(this);
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

    this.minKnob = new Knob({
      name: "minKnob",
      size: this.knobSize || 30,
    });

    this.maxKnob = new Knob({
      name: "maxKnob",
      size: this.knobSize || 30,
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

    // Set fill initially
    if (this.width > this.height) {
      this.fill.height = this.height;
    } else {
      this.fill.width = this.width;
    }

    this.fill.borderRadius = this.sliderOverlay.borderRadius =
      this.borderRadius;
    this.knobSize = options.knobSize;

    this._styleKnob(this.minKnob);
    this._styleKnob(this.maxKnob);
    this._updateFrame();
    this._updateFill();
    this._updateKnob();

    this.on("change:frame", this._updateFrame);
    this.on("change:borderRadius", this._setRadius);

    for (var knob of [this.minKnob, this.maxKnob]) {
      knob.on("change:size", this._updateKnob);
      knob.on("change:frame", this._updateFill);
      knob.on("change:frame", this._knobDidMove);
      knob.on("change:frame", this._updateFrame);
    }

    this.sliderOverlay.on(Events.TapStart, this._tapStart);
    this.sliderOverlay.on(Events.TapEnd, this._tapEnd);
  }

  _tapStart(event) {
    let clickedValue;
    event.preventDefault();

    if (this.width > this.height) {
      const touchX = Events.touchEvent(event).clientX - Screen.canvasFrame.x;
      const scaleX = this.canvasScaleX();
      clickedValue = this.valueForPoint(touchX / scaleX - this.x);

      if (clickedValue > this.maxValue) {
        this.maxValue = clickedValue;
        this.maxKnob.draggable._panStart(event);
        this.emit(Events.SliderMaxValueChange, this.maxValue);
      }

      if (clickedValue < this.minValue) {
        this.minValue = clickedValue;
        this.minKnob.draggable._panStart(event);
        this.emit(Events.SliderMinValueChange, this.minValue);
      }
    } else {
      const touchY = Events.touchEvent(event).clientY - Screen.canvasFrame.y;
      const scaleY = this.canvasScaleY();
      clickedValue = this.valueForPoint(touchY / scaleY - this.y);

      if (clickedValue > this.maxValue) {
        this.maxValue = clickedValue;
        this.maxKnob.draggable._panStart(event);
        this.emit(Events.SliderMaxValueChange, this.maxValue);
      }

      if (clickedValue < this.minValue) {
        this.minValue = clickedValue;
        this.minKnob.draggable._panStart(event);
        this.emit(Events.SliderMinValueChange, this.minValue);
      }
    }

    return this._updateValue();
  }

  _tapEnd(event) {
    return this._updateValue();
  }

  _styleKnob(knob) {
    knob.parent = this.fill.parent = this.sliderOverlay.parent = this;
    knob.borderRadius = this.knobSize / 2;

    return _.extend(knob.draggable, {
      enabled: true,
      overdrag: false,
      momentum: true,
      bounce: false,
      momentumOptions: { friction: 5, tolerance: 0.25 },
    });
  }

  _updateFill() {
    if (this.width > this.height) {
      this.fill.x = this.minKnob.midX;
      return (this.fill.width = this.maxKnob.midX - this.minKnob.midX);
    } else {
      this.fill.y = this.minKnob.midY;
      return (this.fill.height = this.maxKnob.midY - this.minKnob.midY);
    }
  }

  _updateKnob() {
    if (this.width > this.height) {
      this.minKnob.midX = this.fill.x;
      this.minKnob.centerY();

      this.maxKnob.midX = this.fill.x + this.fill.width;
      return this.maxKnob.centerY();
    } else {
      this.minKnob.midY = this.fill.y;
      this.minKnob.centerX();

      this.maxKnob.midY = this.fill.y + this.fill.height;
      return this.maxKnob.centerX();
    }
  }

  _updateFrame() {
    let knob;
    this.minKnob.draggable.constraints = {
      x: -this.minKnob.width / 2,
      y: -this.minKnob.height / 2,
      width: this.maxKnob.midX,
      height: this.maxKnob.midY,
    };

    this.maxKnob.draggable.constraints = {
      x: this.minKnob.maxX,
      y: this.minKnob.maxY,
      width: this.width + this.maxKnob.width,
      height: this.height + this.maxKnob.height,
    };

    this.hitArea = this.hitArea;

    if (this.width > this.height) {
      this.fill.height = this.height;
      this.minKnob.midX = this.pointForValue(this.minValue);
      this.maxKnob.midX = this.pointForValue(this.maxValue);
      this.minKnob.centerY();
    } else {
      this.fill.width = this.width;
      this.minKnob.midY = this.pointForValue(this.minValue);
      this.maxKnob.midY = this.pointForValue(this.maxValue);
      this.minKnob.centerX();
    }

    if (this.width > this.height) {
      for (knob of [this.minKnob, this.maxKnob]) {
        knob.draggable.speedY = 0;
        knob.draggable.speedX = 1;
      }
    } else {
      for (knob of [this.minKnob, this.maxKnob]) {
        knob.draggable.speedX = 0;
        knob.draggable.speedY = 1;
      }
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
      this.minValue = this.valueForPoint(this.minKnob.midX);
      return (this.maxValue = this.valueForPoint(this.maxKnob.midX));
    } else {
      this.minValue = this.valueForPoint(this.minKnob.midY);
      return (this.maxValue = this.valueForPoint(this.maxKnob.midY));
    }
  }

  _updateValue() {
    this.emit(Events.SliderValueChange);

    if (this.minKnob.draggable.isMoving) {
      this.emit(Events.SliderMinValueChange, this.minValue);
    }

    if (this.maxKnob.draggable.isMoving) {
      return this.emit(Events.SliderMaxValueChange, this.maxValue);
    }
  }

  // Retrieve the point (x or y coordinate) of a certain numeric value.
  pointForValue(value) {
    for (var knob of [this.minKnob, this.maxKnob]) {
      // For horizontal (default) sliders.
      if (this.width > this.height) {
        if (this.constrained) {
          return Utils.modulate(
            value,
            [this.min, this.max],
            [0 + knob.width / 2, this.width - knob.width / 2],
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

        // For vertical sliders.
      } else {
        if (this.constrained) {
          return Utils.modulate(
            value,
            [this.min, this.max],
            [0 + knob.height / 2, this.height - knob.height / 2],
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
  }

  // Retrieve the numeric value of a certain point (x or y coordinate).
  valueForPoint(value) {
    for (var knob of [this.minKnob, this.maxKnob]) {
      // For horizontal (default) sliders.
      if (this.width > this.height) {
        if (this.constrained) {
          return Utils.modulate(
            value,
            [0 + knob.width / 2, this.width - knob.width / 2],
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

        // For vertical sliders.
      } else {
        if (this.constrained) {
          return Utils.modulate(
            value,
            [0 + knob.height / 2, this.height - knob.height / 2],
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
  }

  animateToMinValue(value, animationOptions) {
    if (animationOptions == null) {
      animationOptions = { curve: "spring(250, 25, 0)" };
    }
    if (!_.isFinite(value)) {
      return;
    }
    if (this.width > this.height) {
      animationOptions.properties = {
        x: this.pointForValue(value) - this.minKnob.width / 2,
      };
    } else {
      animationOptions.properties = {
        y: this.pointForValue(value) - this.minKnob.height / 2,
      };
    }

    return this.minKnob.animate(animationOptions);
  }

  animateToMaxValue(value, animationOptions) {
    if (animationOptions == null) {
      animationOptions = { curve: "spring(250, 25, 0)" };
    }
    if (!_.isFinite(value)) {
      return;
    }
    if (this.width > this.height) {
      animationOptions.properties = {
        x: this.pointForValue(value) - this.maxKnob.width / 2,
      };
    } else {
      animationOptions.properties = {
        y: this.pointForValue(value) - this.maxKnob.height / 2,
      };
    }

    return this.maxKnob.animate(animationOptions);
  }

  //#############################################################
  //# EVENT HELPERS

  onValueChange(cb) {
    return this.on(Events.SliderValueChange, cb);
  }
  onMinValueChange(cb) {
    return this.on(Events.SliderMinValueChange, cb);
  }
  onMaxValueChange(cb) {
    return this.on(Events.SliderMaxValueChange, cb);
  }
}
RangeSliderComponent.initClass();
