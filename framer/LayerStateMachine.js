import { BaseClass } from "./BaseClass.js";
import _ from "./Underscore.js"; // keep underscore if your Utils still depends on it
import { Events } from "./Events.js"; // assuming Events is imported from somewhere
import { Utils } from "./Utils.js"; // assuming Utils is available

export class LayerStateMachine extends BaseClass {
  static initClass() {
    this.define("layer", {
      get() {
        return this._layer;
      },
    });

    this.define("current", {
      get() {
        return this.currentName;
      },
    });

    this.define("previous", {
      get() {
        return this.previousName;
      },
    });

    this.define("currentName", {
      get() {
        return this._currentName;
      },
    });

    this.define("previousName", {
      get() {
        return _.last(this._previousNames) || "default";
      },
    });

    this.define("stateNames", {
      get() {
        return Object.keys(this.states);
      },
    });

    this.define("states", {
      get() {
        return this._states;
      },
    });
  }

  constructor(layer, states) {
    super();
    this._layer = layer;
    this._states = states;
    this.reset();
  }

  switchInstant(stateName) {
    return this.switchTo(stateName, { instant: true });
  }

  switchTo(stateName, options = {}) {
    if (!this.states[stateName]) {
      throw new Error(`No such state: '${stateName}'`);
    }

    if (stateName === "previous") {
      stateName = this.previousName;
    }

    // Clone and merge animation properties
    const properties = { ...this.states[stateName] };
    let opts = { ...options };

    if (properties.animationOptions) {
      opts = { ...properties.animationOptions, ...opts };
      delete properties.animationOptions;
    }

    const stateNameA = this.currentName;
    const stateNameB = stateName;

    const startAnimation = opts.start ?? true;
    opts.start = false;

    const animation = this.layer.animate(properties, opts);

    let stateSwitched = false;
    const switchState = () => {
      if (stateSwitched) return;
      stateSwitched = true;
      this._previousNames.push(stateNameA);
      this._currentName = stateNameB;
    };

    const onStart = () => {
      this.emit(Events.StateSwitchStart, stateNameA, stateNameB, this);
      switchState();
    };

    const onStop = () => {
      this.emit(Events.StateSwitchStop, stateNameA, stateNameB, this);
    };

    const onEnd = () => {
      const instantProps = _.difference(
        Object.keys(properties),
        Object.keys(animation.properties)
      );

      for (const k of instantProps) {
        this.layer[k] = properties[k];
      }

      this.emit(Events.StateSwitchEnd, stateNameA, stateNameB, this);
    };

    animation.on(Events.AnimationStart, onStart);
    animation.on(Events.AnimationStop, onStop);
    animation.on(Events.AnimationEnd, onEnd);

    if (startAnimation) {
      const started = animation.start();
      if (!started) {
        onStart();
        onStop();
        onEnd();
      }
    }

    switchState();
    return animation;
  }

  next(states = this.stateNames) {
    return Utils.arrayNext(states, this.currentName);
  }

  emit(...args) {
    super.emit(...args);
    return this._layer.emit(...args);
  }

  reset() {
    for (const key of Object.keys(this.states)) {
      if (key !== "default") delete this.states[key];
    }

    this._previousNames = [];
    this._currentName = "default";
  }

  toInspect() {
    return `<${this.constructor.name} id:${this.id} layer:${this.layer.id} current:'${this.currentName}'>`;
  }
}
LayerStateMachine.initClass();
