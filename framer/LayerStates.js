import { _ } from "./Underscore";
import { LayerStateMachine } from "./LayerStateMachine";
const LayerStatesIgnoredKeys = ["ignoreEvents", "name", "id"];

const reservedStateError = function (name) {
  throw Error(`The state '${name}' is a reserved name.`);
};

const deprecatedWarning = function (name, suggestion) {
  let message = `layer.states.${name} is deprecated`;
  if (suggestion != null) {
    message += `, use '${suggestion}' instead.`;
  }
  return console.warn(message);
};

const namedState = (state, name) => _.extend({}, { name }, state);

export const LayerStates = (function () {
  let capture = undefined;
  let methods = undefined;
  LayerStates = class LayerStates {
    static initClass() {
      this.defineReserved("previous", {
        get() {
          return namedState(
            this[this.machine.previousName],
            this.machine.previousName
          );
        },
      });
      this.defineReserved("current", {
        get() {
          return namedState(
            this[this.machine.currentName],
            this.machine.currentName
          );
        },
      });

      capture = function (name) {
        return (this[name] = LayerStates.filterStateProperties(
          this.machine.layer.props
        ));
      };

      this.defineReserved("capture", {
        get() {
          return capture;
        },
      });

      //################################################################
      // Backwards compatibility

      methods = {
        add(states, object) {
          if (object == null) {
            object = {};
          }
          deprecatedWarning("add", "layer.states = ");
          if (_.isString(states)) {
            return (this[states] = object);
          } else {
            return (this.machine.layer.states = states);
          }
        },

        remove(stateName) {
          deprecatedWarning("remove", "delete layer.states.a");
          return delete this[stateName];
        },

        switch(stateName, options) {
          deprecatedWarning("switch", 'layer.animate("state")');
          return this.machine.switchTo(stateName, options);
        },

        switchInstant(stateName) {
          deprecatedWarning(
            "switchInstant",
            'layer.animate("state", {instant: true})'
          );
          return this.machine.switchTo(stateName, { instant: true });
        },

        next(...options) {
          deprecatedWarning("next", "layer.stateCycle()");
          options = _.flatten(options);
          return this.machine.layer.stateCycle(options);
        },
      };

      this.defineReserved("add", {
        get() {
          return methods.add;
        },
      });
      this.defineReserved("remove", {
        get() {
          return methods.remove;
        },
      });
      this.defineReserved("switch", {
        get() {
          return methods.switch;
        },
      });
      this.defineReserved("switchInstant", {
        get() {
          return methods.switchInstant;
        },
      });
      this.defineReserved("next", {
        get() {
          return methods.next;
        },
      });
      this.defineReserved("animationOptions", {
        get() {
          return this.machine.layer.animationOptions;
        },
        set(options) {
          return (this.machine.layer.animationOptions = options);
        },
      });
    }

    static defineReserved(propertyName, descriptor) {
      descriptor.configurable = true;
      if (descriptor.enumerable == null) {
        descriptor.enumerable = false;
      }
      if (descriptor.set == null) {
        descriptor.set = () => reservedStateError(propertyName);
      }
      return Object.defineProperty(this.prototype, propertyName, descriptor);
    }

    constructor(layer) {
      const _machine = new LayerStateMachine(layer, this);

      // A trick to include a reference to the state machine, without exposing
      // the key on the layer states object.

      Object.defineProperty(this, "machine", {
        enumerable: false,
        configurable: false,
        get() {
          return _machine;
        },
        set() {
          return reservedStateError("machine");
        },
      });

      this.capture("default");
    }

    static filterStateProperties(properties) {
      const stateProperties = {};

      for (var k in properties) {
        var v = properties[k];
        if (Array.from(LayerStatesIgnoredKeys).includes(k)) {
          continue;
        }

        if (Color.isValidColorProperty(k, v)) {
          stateProperties[k] = new Color(v);
          continue;
        }

        if (Gradient.isGradient(v)) {
          stateProperties[k] = v;
          continue;
        }

        if (this._isValidProperty(k, v)) {
          stateProperties[k] = v;
        }
      }

      return stateProperties;
    }

    static _isValidProperty(k, v) {
      if (_.isNumber(v)) {
        return true;
      }
      if (_.isFunction(v)) {
        return true;
      }
      if (_.isBoolean(v)) {
        return true;
      }
      if (_.isString(v)) {
        return true;
      }
      if (Color.isColorObject(v)) {
        return true;
      }
      if (Gradient.isGradient(v)) {
        return true;
      }
      if (v === null) {
        return true;
      }
      if (
        __guard__(v != null ? v.constructor : undefined, (x) => x.name) ===
        "Layer"
      ) {
        return true;
      }
      if (["template", "shadows"].includes(k)) {
        return true;
      }
      return false;
    }
  };
  LayerStates.initClass();
  return LayerStates;
})();

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined;
}
