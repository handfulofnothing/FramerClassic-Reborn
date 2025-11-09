import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { EventEmitter } from "./EventEmitter.js";

// Constants
const CounterKey = "_ObjectCounter";
const DefinedPropertiesValuesKey = "_DefinedPropertiesValuesKey";

let ObjectDescriptors = [];
let ObjectDescriptorsChanged = true;

const DefaultPropertyOrder = [];

export class BaseClass extends EventEmitter {
  static initClass() {
    this.define("props", {
      importable: false,
      exportable: false,
      get() {
        const keys = [];
        const propertyList = this._propertyList();
        for (var key in propertyList) {
          var descriptor = propertyList[key];
          if (descriptor.exportable) {
            keys.push(key);
          }
        }

        return _.pick(this, keys);
      },

      set(value) {
        const propertyList = this._propertyList();
        return (() => {
          const result = [];
          for (var k in value) {
            // We only apply properties that we know and are marked to be
            // importable.
            var v = value[k];
            if (
              propertyList[k] != null ? propertyList[k].importable : undefined
            ) {
              result.push((this[k] = v));
            } else {
              result.push(undefined);
            }
          }
          return result;
        })();
      },
    });

    this.define("id", {
      get() {
        return this._id;
      },
    });
  }

  //################################################################
  // Framer object properties

  static define(propertyName, descriptor) {
    // See if we need to add this property to the internal properties class
    if (this !== BaseClass) {
      this._addDescriptor(propertyName, descriptor);
    }

    if (descriptor.readonly) {
      descriptor.set = function (value) {
        throw Error(`${this.constructor.name}.${propertyName} is readonly`);
      };
    }

    // Define the property on the prototype
    return Object.defineProperty(this.prototype, propertyName, descriptor);
  }

  static undefine(propertyName) {
    if (_.isArray(propertyName)) {
      return propertyName.map((prop) => this.undefine(prop));
    } else {
      return this.define(
        propertyName,
        this.simpleProperty(propertyName, undefined, {
          importable: false,
          exportable: false,
          enumerable: false,
        })
      );
    }
  }

  static _addDescriptor(propertyName, descriptor) {
    // for key in ["enumerable", "exportable", "importable"]
    // 	if descriptor.hasOwnProperty(key)
    // 		throw Error("woops #{propertyName} #{descriptor[key]}") if not _.isBoolean(descriptor[key])

    descriptor.propertyName = propertyName;

    // Have the following flags set to true when undefined:
    if (descriptor.enumerable == null) {
      descriptor.enumerable = true;
    }
    if (descriptor.exportable == null) {
      descriptor.exportable = true;
    }
    if (descriptor.importable == null) {
      descriptor.importable = true;
    }
    if (descriptor.readonly == null) {
      descriptor.readonly = descriptor.set == null;
    }

    // We assume we don't import if there is no setter, because we can't
    descriptor.importable = descriptor.importable && !descriptor.readonly;
    // We also assume we don't export if there is no setter, because
    // it is likely a calculated property, and we can't set it.
    descriptor.exportable = descriptor.exportable && !descriptor.readonly;

    // We assume that every property with an underscore is private
    if (_.startsWith(propertyName, "_")) {
      return;
    }

    ObjectDescriptors.push([this, propertyName, descriptor]);
    ObjectDescriptorsChanged = true;

    // Only retain options that are importable, exportable or both:
    if (descriptor.exportable || descriptor.importable) {
      if (descriptor.depends) {
        for (var depend of Array.from(descriptor.depends)) {
          if (!Array.from(DefaultPropertyOrder).includes(depend)) {
            DefaultPropertyOrder.push(depend);
          }
        }
        const index = DefaultPropertyOrder.indexOf(propertyName);
        if (index !== -1) {
          DefaultPropertyOrder.splice(index, 1);
          DefaultPropertyOrder.push(propertyName);
        }
      }
      if (!Array.from(DefaultPropertyOrder).includes(propertyName)) {
        return DefaultPropertyOrder.push(propertyName);
      }
    }
  }

  static simpleProperty(name, fallback, options) {
    if (options == null) {
      options = {};
    }
    return _.extend(options, {
      default: fallback,
      get() {
        return this._getPropertyValue(name);
      },
      set(value) {
        this._setPropertyValue(name, value);
        return __guardMethod__(options, "didSet", (o) => o.didSet(this, value));
      },
    });
  }

  static proxyProperty(keyPath, options) {
    // Allows to easily proxy properties from an instance object
    // Object property is in the form of "object.property"

    let descriptor;
    if (options == null) {
      options = {};
    }
    const objectKey = keyPath.split(".")[0];

    return (descriptor = _.extend(options, {
      get() {
        if (!_.isObject(this[objectKey])) {
          return;
        }
        return Utils.getValueForKeyPath(this, keyPath);
      },
      set(value) {
        if (!_.isObject(this[objectKey])) {
          return;
        }
        Utils.setValueForKeyPath(this, keyPath, value);
        return __guardMethod__(options, "didSet", (o) => o.didSet(this, value));
      },
      proxy: true,
    }));
  }

  _setPropertyValue(k, v) {
    return (this[DefinedPropertiesValuesKey][k] = v);
  }

  _getPropertyValue(k) {
    return Utils.valueOrDefault(
      this[DefinedPropertiesValuesKey][k],
      this._getPropertyDefaultValue(k)
    );
  }

  _getPropertyDefaultValue(k) {
    return __guard__(this._propertyList()[k], (x) => x["default"]);
  }

  _propertyList() {
    if (!this._propertyListCache || ObjectDescriptorsChanged) {
      this._propertyListCache = this.__propertyList();
      ObjectDescriptorsChanged = false;
    }

    return this._propertyListCache;
  }

  __propertyList() {
    const result = {};

    for (var k of Array.from(ObjectDescriptors)) {
      var [Class, name, descriptor] = Array.from(k);
      if (this instanceof Class) {
        if (descriptor.exportable || descriptor.importable) {
          result[name] = descriptor;
        } else {
          delete result[name];
        }
      }
    }
    return result;
  }

  keys() {
    return _.keys(this.props);
  }

  toInspect() {
    return `<${this.constructor.name} id:${this.id || null}>`;
  }

  onChange(name, cb) {
    return this.on(`change:${name}`, cb);
  }

  //################################################################
  // Base constructor method

  constructor(options) {
    super(...arguments);

    this._setPropertyValue = this._setPropertyValue.bind(this);
    this._getPropertyValue = this._getPropertyValue.bind(this);
    this.toInspect = this.toInspect.bind(this);

    this._context =
      typeof Framer !== "undefined" && Framer !== null
        ? Framer.CurrentContext
        : undefined;

    // Create a holder for the property values
    this[DefinedPropertiesValuesKey] = {};

    this._applyDefaults(options);

    // Count the creation for these objects and set the id
    if (this.constructor[CounterKey] == null) {
      this.constructor[CounterKey] = 0;
    }
    this.constructor[CounterKey] += 1;

    // We set this last so if we print a layer during construction
    // we don't get confused because the id changes from global to context
    this._id = this.constructor[CounterKey];
  }

  _applyDefaults(options, proxy) {
    if (proxy == null) {
      proxy = false;
    }
    if (!options) {
      return;
    }

    const propertyList = this._propertyList();
    return (() => {
      const result = [];
      for (var k of Array.from(DefaultPropertyOrder)) {
        var descriptor = propertyList[k];
        if (descriptor != null) {
          if (proxy && !(descriptor.proxy === true)) {
            continue;
          }
          result.push(this._applyDefault(descriptor, k, options[k]));
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  _applyProxyDefaults(options) {
    return this._applyDefaults(options, true);
  }

  _applyDefault(descriptor, key, optionValue) {
    // For each known property (registered with @define) that has a setter, fetch
    // the value from the options object, unless the prop is not importable.
    // When there's no user value, apply the default value:

    let value;
    if (descriptor.readonly) {
      return;
    }

    if (descriptor.importable) {
      value = optionValue;
    }
    value = Utils.valueOrDefault(
      optionValue,
      this._getPropertyDefaultValue(key)
    );

    if ([null, undefined].includes(value)) {
      return;
    }

    return (this[key] = value);
  }
}
BaseClass.initClass();

function __guardMethod__(obj, methodName, transform) {
  if (
    typeof obj !== "undefined" &&
    obj !== null &&
    typeof obj[methodName] === "function"
  ) {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}
function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined;
}
