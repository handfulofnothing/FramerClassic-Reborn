import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { Events } from "./Events.js";
import { Defaults } from "./Defaults.js";
import { BaseClass } from "./BaseClass.js";
import { Color } from "./Color.js";
import { Gradient } from "./Gradient.js";
import { Matrix } from "./Matrix.js";
import { Animation } from "./Animation.js";
import { LayerStyle } from "./LayerStyle.js";
import { LayerStates } from "./LayerStates.js";
import { LayerDraggable } from "./LayerDraggable.js";
import { LayerPinchable } from "./LayerPinchable.js";
import { Gestures } from "./Gestures.js";
import { LayerPropertyProxy } from "./LayerPropertyProxy.js";

const NoCacheDateKey = Date.now();

const delayedStyles = [
  "webkitTransform",
  "webkitFilter",
  "webkitPerspectiveOrigin",
  "webkitTransformOrigin",
  "webkitBackdropFilter",
];

const layerValueTypeError = function (name, value) {
  throw new Error(
    `Layer.${name}: value '${value}' of type '${typeof value}' is not valid`
  );
};

export const layerProperty = function (
  name,
  cssProperty,
  fallback,
  validator,
  transformer,
  options,
  set,
  targetElement,
  includeMainElement,
  useSubpropertyProxy
) {
  if (options == null) {
    options = {};
  }
  let result = {
    default: fallback,
    get() {
      // console.log "Layer.#{name}.get #{@_properties[name]}", @_properties.hasOwnProperty(name)

      let value;
      if (this._properties.hasOwnProperty(name)) {
        value = this._properties[name];
      }
      if (value == null) {
        value = fallback;
      }

      if (useSubpropertyProxy) {
        return layerProxiedValue(value, this, name);
      }
      return value;
    },

    set(value) {
      if (transformer) {
        value = transformer(value, this, name);
      }

      const oldValue = this._properties[name];
      if (value === oldValue) {
        return;
      }

      if (value && validator && !validator(value)) {
        layerValueTypeError(name, value);
      }

      this._properties[name] = value;

      if (cssProperty !== null) {
        let mainElement, subElement;
        let elementContainer = this;
        if (Array.from(this._stylesAppliedToParent).includes(cssProperty)) {
          elementContainer = this._parent;
          this._parent._properties[name] = fallback;
        }
        if (includeMainElement || !targetElement) {
          mainElement = elementContainer._element;
        }
        if (targetElement != null) {
          subElement = elementContainer[targetElement];
        }
        if (name === cssProperty && LayerStyle[cssProperty] == null) {
          if (mainElement != null) {
            mainElement.style[cssProperty] = this._properties[name];
          }
          if (subElement != null) {
            subElement.style[cssProperty] = this._properties[name];
          }
          // These values are set multiple times during applyDefaults, so ignore them here, and set the style in the constructor
        } else if (
          !this.__applyingDefaults ||
          !Array.from(delayedStyles).includes(cssProperty)
        ) {
          const style = LayerStyle[cssProperty](this);
          if (mainElement != null) {
            mainElement.style[cssProperty] = style;
          }
          if (subElement != null) {
            subElement.style[cssProperty] = style;
          }
        }
      }
      if (typeof set === "function") {
        set(this, value);
      }

      // We try to not send any events while we run the constructor, it just
      // doesn't make sense, because no one can listen to use yet.
      if (this.__constructor) {
        return;
      }

      this.emit(`change:${name}`, value, oldValue);
      if (["x", "y"].includes(name)) {
        this.emit("change:point", value);
      }
      if (["width", "height"].includes(name)) {
        this.emit("change:size", value);
      }
      if (["x", "y", "width", "height"].includes(name)) {
        this.emit("change:frame", value);
      }
      if (["rotationZ"].includes(name)) {
        return this.emit("change:rotation", value);
      }
    },
  };

  return (result = _.extend(result, options));
};

export var layerProxiedValue = function (value, layer, property) {
  if (!_.isObject(value)) {
    return value;
  }
  return new LayerPropertyProxy(value, function (
    proxiedValue,
    subProperty,
    subValue
  ) {
    proxiedValue[subProperty] = subValue;
    return (layer[property] = proxiedValue);
  });
};

exports.layerProxiedValue = layerProxiedValue;

const layerPropertyPointTransformer = function (value, layer, property) {
  if (_.isFunction(value)) {
    value = value(layer, property);
  }

  return value;
};

const layerPropertyIgnore = function (options, propertyName, properties) {
  if (!options.hasOwnProperty(propertyName)) {
    return options;
  }

  for (var p of Array.from(properties)) {
    if (options.hasOwnProperty(p)) {
      delete options[propertyName];
      return options;
    }
  }

  return options;
};

const asBorderRadius = function (value) {
  if (_.isNumber(value)) {
    return value;
  }

  if (_.isString(value)) {
    if (!_.endsWith(value, "%")) {
      console.error(
        "Layer.borderRadius only correctly supports percentages in strings"
      );
    }
    return value;
  }

  if (!_.isObject(value)) {
    return 0;
  }

  const result = {};
  let isValidObject = false;
  for (var key of ["topLeft", "topRight", "bottomRight", "bottomLeft"]) {
    if (!isValidObject) {
      isValidObject = _.has(value, key);
    }
    result[key] = value[key] != null ? value[key] : 0;
  }
  if (!isValidObject) {
    return 0;
  } else {
    return result;
  }
};

const asBorderWidth = function (value) {
  if (_.isNumber(value)) {
    return value;
  }
  if (!_.isObject(value)) {
    return 0;
  }
  const result = {};
  let isValidObject = false;
  for (var key of ["left", "right", "bottom", "top"]) {
    if (!isValidObject) {
      isValidObject = _.has(value, key);
    }
    result[key] = value[key] != null ? value[key] : 0;
  }
  if (!isValidObject) {
    return 0;
  } else {
    return result;
  }
};

const parentOrContext = function (layerOrContext) {
  if (layerOrContext.parent != null) {
    return layerOrContext.parent;
  } else {
    return layerOrContext.context;
  }
};

const proxiedShadowValue = function (layer, value, index) {
  if (index == null) {
    index = 0;
  }
  const v = _.defaults(_.clone(value), Framer.Defaults.Shadow);
  if (v.color !== null) {
    if (v != null) {
      v.color = new Color(v.color);
    }
  }
  return layerProxiedValue(v, layer, `shadow${index + 1}`);
};

export class Layer extends BaseClass {
  static initClass() {
    this.define("context", {
      get() {
        return this._context;
      },
    });

    this.define("label", {
      get() {
        return this._label;
      },
      set(value) {
        if (value === this._label) {
          return;
        }
        this._label = value;
        return Utils.labelLayer(this, this._label);
      },
    });

    // A placeholder for layer bound properties defined by the user:
    this.define("custom", this.simpleProperty("custom", undefined));

    // Default animation options for every animation of this layer
    this.define(
      "animationOptions",
      this.simpleProperty("animationOptions", {})
    );

    // Behaviour properties
    this.define(
      "ignoreEvents",
      layerProperty(this, "ignoreEvents", "pointerEvents", true, _.isBoolean)
    );

    // Css properties
    this.define(
      "width",
      layerProperty(
        this,
        "width",
        "width",
        100,
        _.isNumber,
        null,
        {},
        function (layer, value) {
          if (layer.constraintValues == null || layer.isLayouting) {
            return;
          }
          layer.constraintValues.width = value;
          layer.constraintValues.aspectRatioLocked = false;
          layer.constraintValues.widthFactor = null;
          return layer._layoutX();
        }
      )
    );

    this.define(
      "height",
      layerProperty(
        this,
        "height",
        "height",
        100,
        _.isNumber,
        null,
        {},
        function (layer, value) {
          if (layer.constraintValues == null || layer.isLayouting) {
            return;
          }
          layer.constraintValues.height = value;
          layer.constraintValues.aspectRatioLocked = false;
          layer.constraintValues.heightFactor = null;
          return layer._layoutY();
        }
      )
    );

    this.define(
      "visible",
      layerProperty(this, "visible", "display", true, _.isBoolean)
    );
    this.define(
      "opacity",
      layerProperty(this, "opacity", "opacity", 1, _.isNumber, parseFloat)
    );
    this.define(
      "index",
      layerProperty(this, "index", "zIndex", 0, _.isNumber, null, {
        importable: false,
        exportable: false,
      })
    );
    this.define(
      "clip",
      layerProperty(
        this,
        "clip",
        "overflow",
        false,
        _.isBoolean,
        null,
        {},
        null,
        "_elementHTML",
        true
      )
    );

    this.define(
      "scrollHorizontal",
      layerProperty(
        this,
        "scrollHorizontal",
        "overflowX",
        false,
        _.isBoolean,
        null,
        {},
        function (layer, value) {
          if (value === true) {
            return (layer.ignoreEvents = false);
          }
        }
      )
    );

    this.define(
      "scrollVertical",
      layerProperty(
        this,
        "scrollVertical",
        "overflowY",
        false,
        _.isBoolean,
        null,
        {},
        function (layer, value) {
          if (value === true) {
            return (layer.ignoreEvents = false);
          }
        }
      )
    );

    this.define("scroll", {
      get() {
        return this.scrollHorizontal === true || this.scrollVertical === true;
      },
      set(value) {
        return (this.scrollHorizontal = this.scrollVertical = value);
      },
    });

    // Matrix properties
    this.define(
      "x",
      layerProperty(
        this,
        "x",
        "webkitTransform",
        0,
        _.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function (layer) {
          if (layer.isLayouting) {
            return;
          }
          return (layer.constraintValues = null);
        }
      )
    );
    this.define(
      "y",
      layerProperty(
        this,
        "y",
        "webkitTransform",
        0,
        _.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function (layer) {
          if (layer.isLayouting) {
            return;
          }
          return (layer.constraintValues = null);
        }
      )
    );
    this.define(
      "z",
      layerProperty(this, "z", "webkitTransform", 0, _.isNumber)
    );

    this.define(
      "scaleX",
      layerProperty(this, "scaleX", "webkitTransform", 1, _.isNumber)
    );
    this.define(
      "scaleY",
      layerProperty(this, "scaleY", "webkitTransform", 1, _.isNumber)
    );
    this.define(
      "scaleZ",
      layerProperty(this, "scaleZ", "webkitTransform", 1, _.isNumber)
    );
    this.define(
      "scale",
      layerProperty(this, "scale", "webkitTransform", 1, _.isNumber)
    );

    this.define(
      "skewX",
      layerProperty(this, "skewX", "webkitTransform", 0, _.isNumber)
    );
    this.define(
      "skewY",
      layerProperty(this, "skewY", "webkitTransform", 0, _.isNumber)
    );
    this.define(
      "skew",
      layerProperty(this, "skew", "webkitTransform", 0, _.isNumber)
    );

    // @define "scale",
    // 	get: -> (@scaleX + @scaleY + @scaleZ) / 3.0
    // 	set: (value) -> @scaleX = @scaleY = @scaleZ = value

    this.define(
      "originX",
      layerProperty(this, "originX", "webkitTransformOrigin", 0.5, _.isNumber)
    );
    this.define(
      "originY",
      layerProperty(this, "originY", "webkitTransformOrigin", 0.5, _.isNumber)
    );
    this.define("originZ", layerProperty(this, "originZ", null, 0, _.isNumber));

    this.define(
      "perspective",
      layerProperty(
        this,
        "perspective",
        "webkitPerspective",
        0,
        (v) => Utils.webkitPerspectiveForValue(v) !== null
      )
    );
    this.define(
      "perspectiveOriginX",
      layerProperty(
        this,
        "perspectiveOriginX",
        "webkitPerspectiveOrigin",
        0.5,
        _.isNumber
      )
    );
    this.define(
      "perspectiveOriginY",
      layerProperty(
        this,
        "perspectiveOriginY",
        "webkitPerspectiveOrigin",
        0.5,
        _.isNumber
      )
    );

    this.define(
      "rotationX",
      layerProperty(this, "rotationX", "webkitTransform", 0, _.isNumber)
    );
    this.define(
      "rotationY",
      layerProperty(this, "rotationY", "webkitTransform", 0, _.isNumber)
    );
    this.define(
      "rotationZ",
      layerProperty(this, "rotationZ", "webkitTransform", 0, _.isNumber)
    );
    this.define("rotation", {
      //exportable: false
      get() {
        return this.rotationZ;
      },
      set(value) {
        return (this.rotationZ = value);
      },
    });

    // Filter properties
    this.define(
      "blur",
      layerProperty(this, "blur", "webkitFilter", 0, _.isNumber)
    );
    this.define(
      "brightness",
      layerProperty(this, "brightness", "webkitFilter", 100, _.isNumber)
    );
    this.define(
      "saturate",
      layerProperty(this, "saturate", "webkitFilter", 100, _.isNumber)
    );
    this.define(
      "hueRotate",
      layerProperty(this, "hueRotate", "webkitFilter", 0, _.isNumber)
    );
    this.define(
      "contrast",
      layerProperty(this, "contrast", "webkitFilter", 100, _.isNumber)
    );
    this.define(
      "invert",
      layerProperty(this, "invert", "webkitFilter", 0, _.isNumber)
    );
    this.define(
      "grayscale",
      layerProperty(this, "grayscale", "webkitFilter", 0, _.isNumber)
    );
    this.define(
      "sepia",
      layerProperty(this, "sepia", "webkitFilter", 0, _.isNumber)
    );

    this.define(
      "blending",
      layerProperty(this, "blending", "mixBlendMode", null, _.isString)
    );

    this.define(
      "backgroundBlur",
      layerProperty(
        this,
        "backgroundBlur",
        "webkitBackdropFilter",
        0,
        _.isNumber
      )
    );
    this.define(
      "backgroundBrightness",
      layerProperty(
        this,
        "backgroundBrightness",
        "webkitBackdropFilter",
        100,
        _.isNumber
      )
    );
    this.define(
      "backgroundSaturate",
      layerProperty(
        this,
        "backgroundSaturate",
        "webkitBackdropFilter",
        100,
        _.isNumber
      )
    );
    this.define(
      "backgroundHueRotate",
      layerProperty(
        this,
        "backgroundHueRotate",
        "webkitBackdropFilter",
        0,
        _.isNumber
      )
    );
    this.define(
      "backgroundContrast",
      layerProperty(
        this,
        "backgroundContrast",
        "webkitBackdropFilter",
        100,
        _.isNumber
      )
    );
    this.define(
      "backgroundInvert",
      layerProperty(
        this,
        "backgroundInvert",
        "webkitBackdropFilter",
        0,
        _.isNumber
      )
    );
    this.define(
      "backgroundGrayscale",
      layerProperty(
        this,
        "backgroundGrayscale",
        "webkitBackdropFilter",
        0,
        _.isNumber
      )
    );
    this.define(
      "backgroundSepia",
      layerProperty(
        this,
        "backgroundSepia",
        "webkitBackdropFilter",
        0,
        _.isNumber
      )
    );

    this.define(
      "backgroundSize",
      layerProperty(
        this,
        "backgroundSize",
        "backgroundSize",
        "fill",
        _.isString
      )
    );

    for (let i = 0; i <= 8; i++) {
      ((i) => {
        return this.define(`shadow${i + 1}`, {
          exportable: false,
          depends: [
            "shadowX",
            "shadowY",
            "shadowBlur",
            "shadowSpread",
            "shadowColor",
            "shadowType",
          ],
          get() {
            if (this.shadows == null) {
              this.shadows = [];
            }
            if (this.shadows[i] == null) {
              this.shadows[i] = proxiedShadowValue(this, {}, i);
            }
            return this.shadows[i];
          },
          set(value) {
            if (this.shadows == null) {
              this.shadows = [];
            }
            this.shadows[i] = proxiedShadowValue(this, value, i);
            return this.updateShadowStyle();
          },
        });
      })(i);
    }

    // Shadow properties
    for (var shadowProp of ["X", "Y", "Blur", "Spread", "Color", "Type"]) {
      ((shadowProp) => {
        return this.define(`shadow${shadowProp}`, {
          get() {
            if (this.shadows == null || this.shadows.length === 0) {
              return null;
            }
            return this.shadows[0][shadowProp.toLowerCase()];
          },
          set(value) {
            return this.updateShadowsProperty(shadowProp.toLowerCase(), value);
          },
        });
      })(shadowProp);
    }

    this.define("shadows", {
      default: null,
      get() {
        return this._getPropertyValue("shadows");
      },
      set(value) {
        if (value == null) {
          value = [];
        }
        const shadows = [];
        for (let index = 0; index < value.length; index++) {
          var shadow = value[index];
          if (shadow === null) {
            shadows.push(null);
          } else {
            shadows.push(proxiedShadowValue(this, shadow, index));
          }
        }
        this._setPropertyValue("shadows", shadows);
        return this.updateShadowStyle();
      },
    });

    // Color properties
    this.define(
      "backgroundColor",
      layerProperty(
        this,
        "backgroundColor",
        "backgroundColor",
        null,
        Color.validColorValue,
        Color.toColor
      )
    );
    this.define(
      "color",
      layerProperty(
        this,
        "color",
        "color",
        null,
        Color.validColorValue,
        Color.toColor,
        null,
        null,
        "_elementHTML",
        true
      )
    );

    // Border properties
    this.define(
      "borderRadius",
      layerProperty(
        this,
        "borderRadius",
        "borderRadius",
        0,
        null,
        asBorderRadius,
        null,
        null,
        "_elementBorder",
        true,
        true
      )
    );
    this.define(
      "borderColor",
      layerProperty(
        this,
        "borderColor",
        "borderColor",
        null,
        Color.validColorValue,
        Color.toColor,
        null,
        null,
        "_elementBorder"
      )
    );
    this.define(
      "borderWidth",
      layerProperty(
        this,
        "borderWidth",
        "borderWidth",
        0,
        null,
        asBorderWidth,
        null,
        null,
        "_elementBorder",
        false,
        true
      )
    );
    this.define(
      "borderStyle",
      layerProperty(
        this,
        "borderStyle",
        "borderStyle",
        "solid",
        _.isString,
        null,
        null,
        null,
        "_elementBorder"
      )
    );

    this.define(
      "force2d",
      layerProperty(this, "force2d", "webkitTransform", false, _.isBoolean)
    );
    this.define(
      "flat",
      layerProperty(this, "flat", "webkitTransformStyle", false, _.isBoolean)
    );
    this.define(
      "backfaceVisible",
      layerProperty(
        this,
        "backfaceVisible",
        "webkitBackfaceVisibility",
        true,
        _.isBoolean
      )
    );

    //#############################################################
    // Identity

    this.define("name", {
      default: "",
      get() {
        const name = this._getPropertyValue("name");
        if (name != null) {
          return `${name}`;
        } else {
          return "";
        }
      },

      set(value) {
        this._setPropertyValue("name", value);
        // Set the name attribute of the dom element too
        // See: https://github.com/koenbok/Framer/issues/63
        return this._element.setAttribute("name", value);
      },
    });

    //#############################################################
    // Matrices

    // matrix of layer transforms
    this.define("matrix", {
      get() {
        if (this.force2d) {
          return this._matrix2d;
        }
        return Matrix.identity3d()
          .translate(this.x, this.y, this.z)
          .scale(this.scale)
          .scale(this.scaleX, this.scaleY, this.scaleZ)
          .skew(this.skew)
          .skewX(this.skewX)
          .skewY(this.skewY)
          .translate(0, 0, this.originZ)
          .rotate(this.rotationX, 0, 0)
          .rotate(0, this.rotationY, 0)
          .rotate(0, 0, this.rotationZ)
          .translate(0, 0, -this.originZ);
      },
    });

    // matrix of layer transforms when 2d is forced
    this.define("_matrix2d", {
      get() {
        return Matrix.identity3d()
          .translate(this.x, this.y)
          .scale(this.scale)
          .scale(this.scaleX, this.scaleY)
          .skewX(this.skew)
          .skewY(this.skew)
          .rotate(0, 0, this.rotationZ);
      },
    });

    // matrix of layer transforms with transform origin applied
    this.define("transformMatrix", {
      get() {
        return Matrix.identity3d()
          .translate(this.originX * this.width, this.originY * this.height)
          .multiply(this.matrix)
          .translate(-this.originX * this.width, -this.originY * this.height);
      },
    });

    // matrix of layer transforms with perspective applied
    this.define("matrix3d", {
      get() {
        const parent = this.parent || this.context;
        const ppm = Utils.perspectiveMatrix(parent);
        return Matrix.identity3d().multiply(ppm).multiply(this.transformMatrix);
      },
    });

    //#############################################################
    // Border radius compatibility

    // Because it should be cornerRadius, we alias it here
    this.define("cornerRadius", {
      importable: false,
      exportable: false,
      // exportable: no
      get() {
        return this.borderRadius;
      },
      set(value) {
        return (this.borderRadius = value);
      },
    });

    this.define("point", {
      importable: true,
      exportable: false,
      depends: ["width", "height", "size", "parent"],
      get() {
        return Utils.point(this);
      },
      set(input) {
        input = layerPropertyPointTransformer(input, this, "point");
        return this._setGeometryValues(input, ["x", "y"]);
      },
    });

    this.define("midPoint", {
      importable: true,
      exportable: false,
      depends: ["width", "height", "size", "parent", "point"],
      get() {
        return {
          x: this.midX,
          y: this.midY,
        };
      },
      set(input) {
        input = layerPropertyPointTransformer(input, this, "midPoint");
        if (!_.isNumber(input)) {
          input = _.pick(input, ["x", "y", "midX", "midY"]);
          if (input.x != null && input.midX == null) {
            input.midX = input.x;
            delete input.x;
          }
          if (input.y != null && input.midY == null) {
            input.midY = input.y;
            delete input.y;
          }
        }
        return this._setGeometryValues(input, ["midX", "midY"]);
      },
    });

    this.define("size", {
      importable: true,
      exportable: false,
      get() {
        return Utils.size(this);
      },
      set(input) {
        return this._setGeometryValues(input, ["width", "height"]);
      },
    });

    this.define("frame", {
      importable: true,
      exportable: false,
      get() {
        return Utils.frame(this);
      },
      set(input) {
        return this._setGeometryValues(input, ["x", "y", "width", "height"]);
      },
    });

    this.define("minX", {
      importable: true,
      exportable: false,
      get() {
        return this.x;
      },
      set(value) {
        return (this.x = value);
      },
    });

    this.define("midX", {
      importable: true,
      exportable: false,
      get() {
        return Utils.frameGetMidX(this);
      },
      set(value) {
        return Utils.frameSetMidX(this, value);
      },
    });

    this.define("maxX", {
      importable: true,
      exportable: false,
      get() {
        return Utils.frameGetMaxX(this);
      },
      set(value) {
        return Utils.frameSetMaxX(this, value);
      },
    });

    this.define("minY", {
      importable: true,
      exportable: false,
      get() {
        return this.y;
      },
      set(value) {
        return (this.y = value);
      },
    });

    this.define("midY", {
      importable: true,
      exportable: false,
      get() {
        return Utils.frameGetMidY(this);
      },
      set(value) {
        return Utils.frameSetMidY(this, value);
      },
    });

    this.define("maxY", {
      importable: true,
      exportable: false,
      get() {
        return Utils.frameGetMaxY(this);
      },
      set(value) {
        return Utils.frameSetMaxY(this, value);
      },
    });

    this.define("constraintValues", {
      importable: true,
      exportable: false,
      default: null,
      get() {
        return this._getPropertyValue("constraintValues");
      },
      set(value) {
        let newValue;
        if (value === null) {
          newValue = null;
          this.off("change:parent", this.parentChanged);
          Screen.off("resize", this.layout);
        } else {
          let needle3;
          newValue = _.defaults(_.clone(value), {
            left: 0,
            right: null,
            top: 0,
            bottom: null,
            centerAnchorX: 0,
            centerAnchorY: 0,
            widthFactor: null,
            heightFactor: null,
            aspectRatioLocked: false,
            width: this.width,
            height: this.height,
          });
          if (this.parent != null) {
            let needle, needle1;
            if (
              !((needle = this.layout),
              Array.from(this.parent.listeners("change:width")).includes(
                needle
              ))
            ) {
              this.parent.on("change:width", this.layout);
            }
            if (
              !((needle1 = this.layout),
              Array.from(this.parent.listeners("change:height")).includes(
                needle1
              ))
            ) {
              this.parent.on("change:height", this.layout);
            }
          } else {
            let needle2;
            if (
              !((needle2 = this.layout),
              Array.from(Screen.listeners("resize")).includes(needle2))
            ) {
              Screen.on("resize", this.layout);
            }
          }
          if (
            !((needle3 = this.parentChanged),
            Array.from(this.listeners("change:parent")).includes(needle3))
          ) {
            this.on("change:parent", this.parentChanged);
          }
        }
        return this._setPropertyValue("constraintValues", newValue);
      },
    });

    this.define("htmlIntrinsicSize", {
      importable: true,
      exportable: true,
      default: null,
      get() {
        return this._getPropertyValue("htmlIntrinsicSize");
      },
      set(value) {
        if (value === null) {
          return this._setPropertyValue("htmlIntrinsicSize", value);
        } else {
          if (!_.isFinite(value.width) || !_.isFinite(value.height)) {
            return;
          }
          return this._setPropertyValue("htmlIntrinsicSize", {
            width: value.width,
            height: value.height,
          });
        }
      },
    });

    this.define("canvasFrame", {
      importable: true,
      exportable: false,
      get() {
        return Utils.boundingFrame(this);
      },
      set(frame) {
        return (this.frame = Utils.convertFrameFromContext(
          frame,
          this,
          true,
          false
        ));
      },
    });

    this.define("screenFrame", {
      importable: true,
      exportable: false,
      get() {
        return Utils.boundingFrame(this, false);
      },
      set(frame) {
        return (this.frame = Utils.convertFrameFromContext(
          frame,
          this,
          false,
          false
        ));
      },
    });

    //#############################################################
    // CSS

    this.define("style", {
      importable: true,
      exportable: false,
      get() {
        return this._element.style;
      },
      set(value) {
        _.extend(this._element.style, value);
        return this.emit("change:style");
      },
    });

    this.define("classList", {
      importable: true,
      exportable: false,
      get() {
        return this._element.classList;
      },
    });

    this.define("html", {
      get() {
        return (
          (this._elementHTML != null
            ? this._elementHTML.innerHTML
            : undefined) || ""
        );
      },

      set(value) {
        // Insert some html directly into this layer. We actually create
        // a child node to insert it in, so it won't mess with Framers
        // layer hierarchy.
        this._createHTMLElementIfNeeded();
        const ids = Utils.getIdAttributesFromString(value);
        for (var id of Array.from(ids)) {
          var existingElement = document.querySelector(`[id='${id}']`);
          if (existingElement != null) {
            Utils.throwInStudioOrWarnInProduction(
              Layer.ExistingIdMessage("html", id)
            );
            return;
          }
        }

        this._elementHTML.innerHTML = value;
        this._updateHTMLScale();

        // If the contents contains something else than plain text
        // then we turn off ignoreEvents so buttons etc will work.

        // if not (
        // 	@_elementHTML.childNodes.length is 1 and
        // 	@_elementHTML.childNodes[0].nodeName is "#text")
        // 	@ignoreEvents = false

        return this.emit("change:html");
      },
    });

    this.define("image", {
      default: "",
      get() {
        return this._getPropertyValue("image");
      },
      set(value) {
        const currentValue = this._getPropertyValue("image");
        const defaults = Defaults.getDefaults("Layer", {});
        const isBackgroundColorDefault =
          this.backgroundColor != null
            ? this.backgroundColor.isEqual(defaults.backgroundColor)
            : undefined;

        if (Gradient.isGradientObject(value)) {
          this.emit("change:gradient", value, currentValue);
          this.emit("change:image", value, currentValue);
          this._setPropertyValue("image", value);
          this.style["background-image"] = value.toCSS();
          if (isBackgroundColorDefault) {
            this.backgroundColor = null;
          }
          return;
        }

        if (!(_.isString(value) || value === null)) {
          layerValueTypeError("image", value);
        }

        if (currentValue === value) {
          return this.emit("load");
        }

        // Unset the background color only if it’s the default color
        if (isBackgroundColorDefault) {
          this.backgroundColor = null;
        }

        // Set the property value
        this._setPropertyValue("image", value);
        if ([null, ""].includes(value)) {
          if (this._imageLoader != null) {
            this._imageEventManager.removeAllListeners();
            this._imageLoader.src = null;
          }

          this.style["background-image"] = null;

          if (this._imageLoader != null) {
            this.emit(Events.ImageLoadCancelled, this._imageLoader);
            this._cleanupImageLoader();
          }

          return;
        }

        // Show placeholder image on any browser that doesn't support inline pdf
        if (
          _.endsWith(
            typeof value.toLowerCase === "function"
              ? value.toLowerCase()
              : undefined,
            ".pdf"
          ) &&
          (!Utils.isWebKit() || Utils.isChrome())
        ) {
          this.style["background-image"] =
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAVlJREFUaAXtlwEOwiAMRdF4Cr3/0fQaSre9ZFSYLCrQpSSG/FLW9v92agghXJdP3KZlCp/J2up+WiUuzMt6zNukzPDYvALCsKme1/maV8BnQHqw9/IZ6KmAz0BP9ontMwATPXafgR6s65g+A5qRlrhmBu6FhG6LXf9/+JU/YclROkVWEs/8r9FLrChb2apSqVqWZgKmtRKz9/f+CdPxoVl8CAWylcWKUQZGwfhjB3OOHcw5djDn2MH6fBNLC42yaEnyoTXB2V36+lPlz+zN9x6HKfxrZwZ/HUbf5/lJviMpoBPWBWWxFJCtLNqplItIWuvPffx5Dphz7GB9vonNv4X2zICWuMTM3p7Gv/b5iVLmFaiZgb3M/Ns/Ud68AvIGkJ6ir8xh8wrQrzAve9Jjo2PzCsC8z4Aw0WP5DPRgXcf07wHNSEvsM9CS7VIsn4ESMy3sPgMtWN6K8QKfubDo2UqVogAAAABJRU5ErkJggg==')";
          return;
        }

        let imageUrl = value;

        // Optional base image value
        // imageUrl = Config.baseUrl + imageUrl

        if (
          this._alwaysUseImageCache === false &&
          Utils.isLocalAssetUrl(imageUrl)
        ) {
          imageUrl += /\?/.test(imageUrl) ? "&" : "?";
          imageUrl += `nocache=${NoCacheDateKey}`;
        }

        // As an optimization, we will only use a loader
        // if something is explicitly listening to the load event

        if (
          this.listeners(Events.ImageLoaded, true) ||
          this.listeners(Events.ImageLoadError, true) ||
          this.listeners(Events.ImageLoadCancelled, true)
        ) {
          this._imageLoader = new Image();
          this._imageLoader.name = imageUrl;
          this._imageLoader.src = imageUrl;
          this._imageEventManager = this._context.domEventManager.wrap(
            this._imageLoader
          );
          this._imageEventManager.addEventListener("load", () => {
            this.style["background-image"] = `url('${imageUrl}')`;
            this.emit(Events.ImageLoaded, this._imageLoader);
            return this._cleanupImageLoader();
          });

          return this._imageEventManager.addEventListener("error", () => {
            this.emit(Events.ImageLoadError, this._imageLoader);
            return this._cleanupImageLoader();
          });
        } else {
          return (this.style["background-image"] = `url('${imageUrl}')`);
        }
      },
    });

    this.define("gradient", {
      get() {
        if (Gradient.isGradientObject(this.image)) {
          return layerProxiedValue(this.image, this, "gradient");
        }
        return null;
      },
      set(value) {
        // Copy semantics!
        if (Gradient.isGradient(value)) {
          return (this.image = new Gradient(value));
        } else if (!value && Gradient.isGradientObject(this.image)) {
          return (this.image = null);
        }
      },
    });

    //#############################################################
    //# HIERARCHY

    this.define("parent", {
      enumerable: false,
      exportable: false,
      importable: true,
      get() {
        return this._parent || null;
      },
      set(layer) {
        if (layer === this._parent) {
          return;
        }

        if (layer === this) {
          throw Error("Layer.parent: a layer cannot be it's own parent.");
        }

        // Check the type
        if (!layer instanceof Layer) {
          throw Error("Layer.parent needs to be a Layer object");
        }

        // Cancel previous pending insertions
        Utils.domCompleteCancel(this.__insertElement);

        // Remove from previous parent children
        if (this._parent) {
          this._parent._children = _.pull(this._parent._children, this);
          this._parent._element.removeChild(this._element);
          this._parent.emit("change:children", { added: [], removed: [this] });
          this._parent.emit("change:subLayers", { added: [], removed: [this] });
        }

        // Either insert the element to the new parent element or into dom
        if (layer) {
          layer._element.appendChild(this._element);
          layer._children.push(this);
          layer.emit("change:children", { added: [this], removed: [] });
          layer.emit("change:subLayers", { added: [this], removed: [] });
        } else {
          this._insertElement();
        }

        const oldParent = this._parent;
        // Set the parent
        this._parent = layer;

        // Place this layer on top of its siblings
        this.bringToFront();

        this.emit("change:parent", this._parent, oldParent);
        return this.emit("change:superLayer", this._parent, oldParent);
      },
    });

    this.define("children", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        return this._children.map(function (c) {
          if (
            c instanceof SVGLayer &&
            c.children.length === 1 &&
            _.startsWith(c.name, ".")
          ) {
            return c.children[0];
          } else {
            return c;
          }
        });
      },
    });

    this.define("siblings", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        // If there is no parent we need to walk through the root
        if (this.parent === null) {
          return _.filter(this._context.layers, (layer) => {
            return layer !== this && layer.parent === null;
          });
        }

        return _.without(this.parent.children, this);
      },
    });

    this.define("descendants", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        const result = [];

        var f = function (layer) {
          result.push(layer);
          return layer.children.map(f);
        };

        this.children.map(f);

        return result;
      },
    });

    //#############################################################
    // Backwards superLayer and children compatibility

    this.define("superLayer", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        return this.parent;
      },
      set(value) {
        return (this.parent = value);
      },
    });

    this.define("subLayers", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        return this.children;
      },
    });

    this.define("siblingLayers", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        return this.siblings;
      },
    });

    this.define("isAnimating", {
      enumerable: false,
      exportable: false,
      get() {
        return this.animations().length !== 0;
      },
    });

    //#############################################################
    //# STATES

    this.define("states", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        if (this._states == null) {
          this._states = new LayerStates(this);
        }
        return this._states;
      },
      set(states) {
        this.states.machine.reset();
        return _.extend(this.states, states);
      },
    });

    this.define("stateNames", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        return this.states.machine.stateNames;
      },
    });

    //############################################################################
    //# Draggable, Pinchable

    this.define("draggable", {
      importable: false,
      exportable: false,
      get() {
        return this._draggable != null
          ? this._draggable
          : (this._draggable = new LayerDraggable(this));
      },
      set(value) {
        if (_.isBoolean(value)) {
          return (this.draggable.enabled = value);
        }
      },
    });

    this.define("pinchable", {
      importable: false,
      exportable: false,
      get() {
        return this._pinchable != null
          ? this._pinchable
          : (this._pinchable = new LayerPinchable(this));
      },
      set(value) {
        if (_.isBoolean(value)) {
          return (this.pinchable.enabled = value);
        }
      },
    });

    //#############################################################
    //# SCROLLING

    this.define("scrollFrame", {
      importable: false,
      get() {
        let frame;
        return (frame = {
          x: this.scrollX,
          y: this.scrollY,
          width: this.width,
          height: this.height,
        });
      },
      set(frame) {
        this.scrollX = frame.x;
        return (this.scrollY = frame.y);
      },
    });

    this.define("scrollX", {
      get() {
        return this._element.scrollLeft;
      },
      set(value) {
        if (!_.isNumber(value)) {
          layerValueTypeError("scrollX", value);
        }
        return (this._element.scrollLeft = value);
      },
    });

    this.define("scrollY", {
      get() {
        return this._element.scrollTop;
      },
      set(value) {
        if (!_.isNumber(value)) {
          layerValueTypeError("scrollY", value);
        }
        return (this._element.scrollTop = value);
      },
    });

    //#############################################################
    //# EVENTS

    this.define("_domEventManager", {
      get() {
        return this._context.domEventManager.wrap(this._element);
      },
    });

    this.prototype.on = this.prototype.addListener;
    this.prototype.off = this.prototype.removeListener;
  }

  constructor(options) {
    // Make sure we never call the constructor twice
    this.parentChanged = this.parentChanged.bind(this);
    this._layoutX = this._layoutX.bind(this);
    this._layoutY = this._layoutY.bind(this);
    this.layout = this.layout.bind(this);
    this.convertPointToScreen = this.convertPointToScreen.bind(this);
    this.convertPointToCanvas = this.convertPointToCanvas.bind(this);
    this.convertPointToLayer = this.convertPointToLayer.bind(this);
    this.updateForDevicePixelRatioChange =
      this.updateForDevicePixelRatioChange.bind(this);
    this.updateForSizeChange = this.updateForSizeChange.bind(this);
    this.once = this.once.bind(this);
    this.addListener = this.addListener.bind(this);
    if (options == null) {
      options = {};
    }
    if (this.__constructorCalled) {
      throw Error(`Layer.constructor ${this.toInspect()} called twice`);
    }
    this.__constructorCalled = true;
    this.__constructor = true;

    // Set needed private variables
    this._properties = {};
    this._style = {};
    this._children = [];

    if (this._stylesAppliedToParent == null) {
      this._stylesAppliedToParent = [];
    }

    // Special power setting for 2d rendering path. Only enable this
    // if you know what you are doing. See LayerStyle for more info.
    this._prefer2d = false;
    this._alwaysUseImageCache = false;

    // Private setting for canceling of click event if wrapped in moved draggable
    this._cancelClickEventInDragSession = true;

    // We have to create the element before we set the defaults
    this._createElement();

    if (options.createHTMLElement) {
      this._createHTMLElementIfNeeded();
    }

    // Create border element
    this._createBorderElement();

    // Sanitize calculated property setters so direct properties always win
    layerPropertyIgnore(options, "point", ["x", "y"]);
    layerPropertyIgnore(options, "midPoint", ["midX", "midY"]);
    layerPropertyIgnore(options, "size", ["width", "height"]);
    layerPropertyIgnore(options, "frame", ["x", "y", "width", "height"]);

    // Backwards compatibility for superLayer
    if (
      !options.hasOwnProperty("parent") &&
      options.hasOwnProperty("superLayer")
    ) {
      options.parent = options.superLayer;
      delete options.superLayer;
    }

    this.__applyingDefaults = true;
    super(Defaults.getDefaults("Layer", options));
    delete this.__applyingDefaults;

    for (var cssProperty of Array.from(delayedStyles)) {
      var element = this._element;
      if (Array.from(this._stylesAppliedToParent).includes(cssProperty)) {
        element = this._parent._element;
      }
      element.style[cssProperty] = LayerStyle[cssProperty](this);
    }

    // Add this layer to the current context
    this._context.addLayer(this);
    this._id = this._context.layerCounter;

    // Insert the layer into the dom or the parent element
    if (!options.parent) {
      if (!options.shadow) {
        this._insertElement();
      }
    } else {
      this.parent = options.parent;
    }

    // Set some calculated properties
    // Make sure we set the right index
    if (options.hasOwnProperty("index")) {
      this.index = options.index;
    }

    // x and y always win from point, frame or size
    for (var p of ["x", "y", "width", "height"]) {
      if (options.hasOwnProperty(p)) {
        this[p] = options[p];
      }
    }

    this._context.emit("layer:create", this);

    // Make sure the layer is always centered
    this.label = this.label;

    delete this.__constructor;

    this.updateShadowStyle();

    this.onChange("size", this.updateForSizeChange);
  }

  static ExistingIdMessage(type, id) {
    return `Can not set ${type}: There's already an element with id '${id}' in this document'`;
  }

  updateShadowsProperty(prop, value) {
    if (this.shadows == null) {
      this.shadows = [];
    }
    if (this.shadows.filter((s) => s !== null).length === 0) {
      this.shadows[0] = proxiedShadowValue(this, Framer.Defaults.Shadow);
    }
    for (var shadow of Array.from(this.shadows)) {
      if (shadow != null) {
        shadow[prop] = value;
      }
    }
    return this.updateShadowStyle();
  }

  updateShadowStyle() {
    if (this.__constructor) {
      return;
    }
    this._element.style.boxShadow = LayerStyle["boxShadow"](this);
    this._element.style.textShadow = LayerStyle["textShadow"](this);
    return (this._element.style.webkitFilter =
      LayerStyle["webkitFilter"](this));
  }

  //#############################################################
  // Geometry

  _setGeometryValues(input, keys) {
    // If this is a number, we set everything to that number
    if (_.isNumber(input)) {
      return (() => {
        const result = [];
        for (var k of Array.from(keys)) {
          if (this[k] !== input) {
            result.push((this[k] = input));
          } else {
            result.push(undefined);
          }
        }
        return result;
      })();
    } else {
      // If there is nothing to work with we exit
      if (!input) {
        return;
      }

      // Set every numeric value for eacht key
      return (() => {
        const result1 = [];
        for (var k of Array.from(keys)) {
          if (_.isNumber(input[k]) && this[k] !== input[k]) {
            result1.push((this[k] = input[k]));
          } else {
            result1.push(undefined);
          }
        }
        return result1;
      })();
    }
  }

  parentChanged(newParent, oldParent) {
    if (oldParent != null) {
      oldParent.off("change:width", this.layout);
      oldParent.off("change:height", this.layout);
    } else {
      Screen.off("resize", this.layout);
    }
    return (this.constraintValues = null);
  }

  setParentPreservingConstraintValues(parent) {
    const tmp = this.constraintValues;
    this.parent = parent;
    this.constraintValues = tmp;
    return this.layout();
  }

  _layoutX() {
    if (this.constraintValues == null) {
      return;
    }
    if (this.parent == null && !this.context.autoLayout) {
      return;
    }
    const parentFrame =
      (this.parent != null ? this.parent.frame : undefined) != null
        ? this.parent != null
          ? this.parent.frame
          : undefined
        : this.context.innerFrame;
    this.isLayouting = true;
    this.x = Utils.calculateLayoutX(
      parentFrame,
      this.constraintValues,
      this.width
    );
    return (this.isLayouting = false);
  }

  _layoutY() {
    if (this.constraintValues == null) {
      return;
    }
    if (this.parent == null && !this.context.autoLayout) {
      return;
    }
    const parentFrame =
      (this.parent != null ? this.parent.frame : undefined) != null
        ? this.parent != null
          ? this.parent.frame
          : undefined
        : this.context.innerFrame;
    this.isLayouting = true;
    this.y = Utils.calculateLayoutY(
      parentFrame,
      this.constraintValues,
      this.height
    );
    return (this.isLayouting = false);
  }

  layout() {
    if (this.constraintValues == null) {
      return;
    }
    if (this.parent == null && !this.context.autoLayout) {
      return;
    }
    const parentFrame =
      (this.parent != null ? this.parent.frame : undefined) != null
        ? this.parent != null
          ? this.parent.frame
          : undefined
        : this.context.innerFrame;
    this.isLayouting = true;
    this.frame = Utils.calculateLayoutFrame(parentFrame, this);
    return (this.isLayouting = false);
  }

  convertPointToScreen(point) {
    return Utils.convertPointToContext(point, this, false);
  }

  convertPointToCanvas(point) {
    return Utils.convertPointToContext(point, this, true);
  }

  convertPointToLayer(point, layer, rootContext) {
    if (rootContext == null) {
      rootContext = true;
    }
    return Utils.convertPoint(point, this, layer, rootContext);
  }

  contentFrame() {
    if (!this._children.length) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }
    return Utils.frameMerge(_.map(this._children, "frame"));
  }

  totalFrame() {
    return Utils.frameMerge(this.frame, this.contentFrame());
  }

  centerFrame() {
    // Get the centered frame for its parent
    let frame;
    if (this.parent) {
      ({ frame } = this);
      Utils.frameSetMidX(
        frame,
        parseInt(this.parent.width / 2.0 - this.parent.borderWidth)
      );
      Utils.frameSetMidY(
        frame,
        parseInt(this.parent.height / 2.0 - this.parent.borderWidth)
      );
      return frame;
    } else {
      ({ frame } = this);
      Utils.frameSetMidX(frame, parseInt(this._context.innerWidth / 2.0));
      Utils.frameSetMidY(frame, parseInt(this._context.innerHeight / 2.0));
      return frame;
    }
  }

  center() {
    if (this.constraintValues != null) {
      this.constraintValues.left = null;
      this.constraintValues.right = null;
      this.constraintValues.top = null;
      this.constraintValues.bottom = null;
      this.constraintValues.centerAnchorX = 0.5;
      this.constraintValues.centerAnchorY = 0.5;
      this._layoutX();
      this._layoutY();
    } else {
      this.frame = this.centerFrame(); // Center  in parent
    }
    return this;
  }

  centerX(offset) {
    if (offset == null) {
      offset = 0;
    }
    if (this.constraintValues != null) {
      this.constraintValues.left = null;
      this.constraintValues.right = null;
      this.constraintValues.centerAnchorX = 0.5;
      this._layoutX();
    } else {
      this.x = this.centerFrame().x + offset; // Center x in parent
    }
    return this;
  }

  centerY(offset) {
    if (offset == null) {
      offset = 0;
    }
    if (this.constraintValues != null) {
      this.constraintValues.top = null;
      this.constraintValues.bottom = null;
      this.constraintValues.centerAnchorY = 0.5;
      this._layoutY();
    } else {
      this.y = this.centerFrame().y + offset; // Center y in parent
    }
    return this;
  }

  pixelAlign() {
    this.x = parseInt(this.x);
    return (this.y = parseInt(this.y));
  }

  updateForDevicePixelRatioChange() {
    return [
      "width",
      "height",
      "webkitTransform",
      "boxShadow",
      "textShadow",
      "webkitFilter",
      "borderRadius",
      "borderWidth",
      "fontSize",
      "letterSpacing",
      "wordSpacing",
      "textIndent",
    ].map(
      (cssProperty) =>
        (this._element.style[cssProperty] = LayerStyle[cssProperty](this))
    );
  }

  updateForSizeChange() {
    return (this._elementBorder.style.borderWidth =
      LayerStyle["borderWidth"](this));
  }

  //#############################################################
  // SCREEN GEOMETRY

  // TODO: Rotation/Skew

  // screenOriginX = ->
  // 	if @_parentOrContext()
  // 		return @_parentOrContext().screenOriginX()
  // 	return @originX

  // screenOriginY = ->
  // 	if @_parentOrContext()
  // 		return @_parentOrContext().screenOriginY()
  // 	return @originY

  canvasScaleX(self) {
    if (self == null) {
      self = true;
    }
    let scale = 1;
    if (self) {
      scale = this.scale * this.scaleX;
    }
    for (var parent of Array.from(this.containers(true))) {
      scale *= parent.scale;
      if (parent.scaleX != null) {
        scale *= parent.scaleX;
      }
    }
    return scale;
  }

  canvasScaleY(self) {
    if (self == null) {
      self = true;
    }
    let scale = 1;
    if (self) {
      scale = this.scale * this.scaleY;
    }
    for (var parent of Array.from(this.containers(true))) {
      scale *= parent.scale;
      if (parent.scaleY != null) {
        scale *= parent.scaleY;
      }
    }
    return scale;
  }

  screenScaleX(self) {
    if (self == null) {
      self = true;
    }
    let scale = 1;
    if (self) {
      scale = this.scale * this.scaleX;
    }
    for (var parent of Array.from(this.containers(false))) {
      scale *= parent.scale * parent.scaleX;
    }
    return scale;
  }

  screenScaleY(self) {
    if (self == null) {
      self = true;
    }
    let scale = 1;
    if (self) {
      scale = this.scale * this.scaleY;
    }
    for (var parent of Array.from(this.containers(false))) {
      scale *= parent.scale * parent.scaleY;
    }
    return scale;
  }

  screenScaledFrame() {
    // TODO: Scroll position

    const frame = {
      x: 0,
      y: 0,
      width: this.width * this.screenScaleX(),
      height: this.height * this.screenScaleY(),
    };

    const layers = this.containers(true);
    layers.push(this);
    layers.reverse();

    for (var parent of Array.from(layers)) {
      var left, left1, left2;
      var p = parentOrContext(parent);
      var factorX =
        (left = __guardMethod__(p, "screenScaleX", (o) => o.screenScaleX())) !=
        null
          ? left
          : 1;
      var factorY =
        (left1 = __guardMethod__(p, "screenScaleY", (o1) =>
          o1.screenScaleY()
        )) != null
          ? left1
          : 1;
      var layerScaledFrame =
        (left2 =
          typeof parent.scaledFrame === "function"
            ? parent.scaledFrame()
            : undefined) != null
          ? left2
          : { x: 0, y: 0 };
      frame.x += layerScaledFrame.x * factorX;
      frame.y += layerScaledFrame.y * factorY;
    }

    return frame;
  }

  scaledFrame() {
    // Get the scaled frame for a layer, taking into account
    // the transform origins.

    const { frame } = this;
    const scaleX = this.scale * this.scaleX;
    const scaleY = this.scale * this.scaleY;

    frame.width *= scaleX;
    frame.height *= scaleY;
    frame.x += (1 - scaleX) * this.originX * this.width;
    frame.y += (1 - scaleY) * this.originY * this.height;

    return frame;
  }

  computedStyle() {
    // This is an expensive operation

    let { getComputedStyle } = document.defaultView;
    if (getComputedStyle == null) {
      ({ getComputedStyle } = window);
    }

    return getComputedStyle(this._element);
  }

  //#############################################################
  // DOM ELEMENTS

  _createElement() {
    if (this._element != null) {
      return;
    }
    this._element = document.createElement("div");
    return this._element.classList.add("framerLayer");
  }

  _createBorderElement() {
    if (this._elementBorder != null) {
      return;
    }
    this._elementBorder = document.createElement("div");
    this._elementBorder.style.position = "absolute";
    this._elementBorder.style.top = "0";
    this._elementBorder.style.bottom = "0";
    this._elementBorder.style.left = "0";
    this._elementBorder.style.right = "0";
    this._elementBorder.style.boxSizing = "border-box";
    this._elementBorder.style.zIndex = "1000";
    this._elementBorder.style.pointerEvents = "none";
    return this._element.appendChild(this._elementBorder);
  }

  _insertElement() {
    this.bringToFront();
    return this._context.element.appendChild(this._element);
  }

  // This method is called as soon as the @_element is part of the DOM
  // If layers are initialized before the DOM is complete,
  // the contexts calls this methods on all Layers as soon as it appends itself to the document
  elementInsertedIntoDocument() {}

  _createHTMLElementIfNeeded() {
    if (!this._elementHTML) {
      this._elementHTML = document.createElement("div");
      return this._element.insertBefore(this._elementHTML, this._elementBorder);
    }
  }

  _updateHTMLScale() {
    if (this._elementHTML == null) {
      return;
    }

    if (this.htmlIntrinsicSize == null) {
      return (this._elementHTML.style.zoom = this.context.scale);
    } else {
      this._elementHTML.style.transformOrigin = "0 0";
      this._elementHTML.style.transform = `scale(${
        (this.context.scale * this.width) / this.htmlIntrinsicSize.width
      }, ${
        (this.context.scale * this.height) / this.htmlIntrinsicSize.height
      })`;
      this._elementHTML.style.width = `${this.htmlIntrinsicSize.width}px`;
      return (this._elementHTML.style.height = `${this.htmlIntrinsicSize.height}px`);
    }
  }

  querySelector(query) {
    return this._element.querySelector(query);
  }
  querySelectorAll(query) {
    return this._element.querySelectorAll(query);
  }

  selectChild(selector) {
    return Utils.findLayer(this.descendants, selector);
  }

  selectAllChildren(selector) {
    return Utils.filterLayers(this.descendants, selector);
  }

  static select(selector) {
    return Framer.CurrentContext.selectLayer(selector);
  }

  static selectAll(selector) {
    return Framer.CurrentContext.selectAllLayers(selector);
  }

  destroy() {
    // Todo: check this

    if (this.parent) {
      this.parent._children = _.without(this.parent._children, this);
    }

    if (this._element.parentNode != null) {
      this._element.parentNode.removeChild(this._element);
    }
    this.removeAllListeners();

    this._context.removeLayer(this);
    this._context.emit("layer:destroy", this);
    return this._context.domEventManager.remove(this._element);
  }

  //#############################################################
  //# COPYING

  copy() {
    const layer = this.copySingle();

    for (var child of Array.from(this._children)) {
      var copiedChild = child.copy();
      if (copiedChild !== null) {
        copiedChild.parent = layer;
      }
    }

    return layer;
  }

  copySingle() {
    const copy = new this.constructor(this.props);
    copy.style = this.style;
    return copy;
  }

  //#############################################################
  //# IMAGE

  _cleanupImageLoader() {
    if (this._imageEventManager != null) {
      this._imageEventManager.removeAllListeners();
    }
    this._imageEventManager = null;
    return (this._imageLoader = null);
  }

  addChild(layer) {
    return (layer.parent = this);
  }

  removeChild(layer) {
    if (!Array.from(this._children).includes(layer)) {
      return;
    }

    return (layer.parent = null);
  }

  childrenWithName(name) {
    return _.filter(this.children, (layer) => layer.name === name);
  }

  siblingsWithName(name) {
    return _.filter(this.siblingLayers, (layer) => layer.name === name);
  }

  // Get all containers of this layer, including containing contexts
  // `toRoot` specifies if you want to bubble up across contexts,
  // so specifiying `false` will stop at the first context
  // and thus the results will never contain any context
  containers(toRoot, result) {
    if (toRoot == null) {
      toRoot = false;
    }
    if (result == null) {
      result = [];
    }
    if (this.parent != null) {
      result.push(this.parent);
      return this.parent.containers(toRoot, result);
    } else if (toRoot) {
      result.push(this.context);
      return this.context.containers(true, result);
    }
    return result;
  }

  ancestors() {
    return this.containers();
  }

  root() {
    if (this.parent === null) {
      return this;
    }
    return _.last(this.ancestors());
  }

  childrenAbove(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return _.filter(
      this.children,
      (layer) =>
        Utils.framePointForOrigin(layer.frame, originX, originY).y < point.y
    );
  }
  childrenBelow(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return _.filter(
      this.children,
      (layer) =>
        Utils.framePointForOrigin(layer.frame, originX, originY).y > point.y
    );
  }
  childrenLeft(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return _.filter(
      this.children,
      (layer) =>
        Utils.framePointForOrigin(layer.frame, originX, originY).x < point.x
    );
  }
  childrenRight(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return _.filter(
      this.children,
      (layer) =>
        Utils.framePointForOrigin(layer.frame, originX, originY).x > point.x
    );
  }

  _parentOrContext() {
    if (this.parent) {
      return this.parent;
    }
    if (this._context._parent) {
      return this._context._parent;
    }
  }

  addSubLayer(layer) {
    return this.addChild(layer);
  }
  removeSubLayer(layer) {
    return this.removeChild(layer);
  }
  subLayersByName(name) {
    return this.childrenWithName(name);
  }
  siblingLayersByName(name) {
    return this.siblingsWithName(name);
  }
  subLayersAbove(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.childrenAbove(point, originX, originY);
  }
  subLayersBelow(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.childrenBelow(point, originX, originY);
  }
  subLayersLeft(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.childrenLeft(point, originX, originY);
  }
  subLayersRight(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.childrenRight(point, originX, originY);
  }

  //#############################################################
  //# ANIMATION

  animate(properties, options) {
    // If the properties are a string, we assume it's a state name
    if (options == null) {
      options = {};
    }
    if (_.isString(properties)) {
      const stateName = properties;

      // Support options as an object
      if (options.options != null) {
        ({ options } = options);
      }

      return this.states.machine.switchTo(stateName, options);
    }
    // We need to clone the properties so we don't modify them unexpectedly
    properties = _.clone(properties);

    // Support the old properties syntax, we add all properties top level and
    // move the options into an options property.
    if (properties.properties != null) {
      options = properties;
      ({ properties } = options);
      delete options.properties;
    }

    // With the new api we treat the properties as animatable properties, and use
    // the special options keyword for animation options.
    if (properties.options != null) {
      options = _.defaults({}, options, properties.options);
      delete properties.options;
    }

    // Merge the animation options with the default animation options for this layer
    options = _.defaults({}, options, this.animationOptions);
    if (options.start == null) {
      options.start = true;
    }

    const animation = new Animation(this, properties, options);
    if (options.start) {
      animation.start();
    }

    return animation;
  }

  stateCycle(...args) {
    let options;
    const states = _.flatten(args);
    if (_.isObject(_.last(states))) {
      options = states.pop();
    }
    return this.animate(this.states.machine.next(states), options);
  }

  stateSwitch(stateName, options) {
    if (options == null) {
      options = {};
    }
    if (stateName == null) {
      throw new Error("Missing required argument 'stateName' in stateSwitch()");
    }
    if (options.animate === true) {
      return this.animate(stateName, options);
    }
    return this.animate(stateName, _.defaults({}, options, { instant: true }));
  }

  animations(includePending) {
    // Current running animations on this layer
    if (includePending == null) {
      includePending = false;
    }
    return _.filter(this._context.animations, (animation) => {
      if (animation.layer !== this) {
        return false;
      }
      return includePending || !animation.isPending;
    });
  }

  animatingProperties() {
    const properties = {};

    for (var animation of Array.from(this.animations())) {
      for (var propertyName of Array.from(animation.animatingProperties())) {
        properties[propertyName] = animation;
      }
    }

    return properties;
  }

  animateStop() {
    _.invokeMap(this.animations(), "stop");
    return this._draggable != null ? this._draggable.animateStop() : undefined;
  }

  //#############################################################
  //# INDEX ORDERING

  bringToFront() {
    let maxIndex = null;
    const siblings =
      (this.parent != null ? this.parent._children : undefined) != null
        ? this.parent != null
          ? this.parent._children
          : undefined
        : this.context._layers;
    if (siblings.count <= 1) {
      return;
    }
    for (var layer of Array.from(siblings)) {
      if (layer === this) {
        continue;
      }
      if (maxIndex == null) {
        maxIndex = layer.index;
      }
      if (layer.index > maxIndex) {
        maxIndex = layer.index;
      }
    }
    if (maxIndex != null) {
      return (this.index = maxIndex + 1);
    }
  }

  sendToBack() {
    let minIndex = null;
    const siblings =
      (this.parent != null ? this.parent._children : undefined) != null
        ? this.parent != null
          ? this.parent._children
          : undefined
        : this.context._layers;
    if (siblings.count <= 1) {
      return;
    }
    for (var layer of Array.from(siblings)) {
      if (layer === this) {
        continue;
      }
      if (minIndex == null) {
        minIndex = layer.index;
      }
      if (layer.index < minIndex) {
        minIndex = layer.index;
      }
    }
    if (minIndex != null) {
      return (this.index = minIndex - 1);
    }
  }

  placeBefore(layer) {
    if (!Array.from(this.siblingLayers).includes(layer)) {
      return;
    }

    for (var l of Array.from(this.siblingLayers)) {
      if (l.index <= layer.index) {
        l.index -= 1;
      }
    }

    return (this.index = layer.index + 1);
  }

  placeBehind(layer) {
    if (!Array.from(this.siblingLayers).includes(layer)) {
      return;
    }

    for (var l of Array.from(this.siblingLayers)) {
      if (l.index >= layer.index) {
        l.index += 1;
      }
    }

    return (this.index = layer.index - 1);
  }

  emit(eventName, ...args) {
    // If this layer has a parent draggable view and its position moved
    // while dragging we automatically cancel click events. This is what
    // you expect when you add a button to a scroll content layer. We only
    // want to do this if this layer is not draggable itself because that
    // would break nested ScrollComponents.

    if (this._cancelClickEventInDragSession && !this._draggable) {
      if (
        [
          Events.Click,
          Events.Tap,
          Events.TapStart,
          Events.TapEnd,
          Events.LongPress,
          Events.LongPressStart,
          Events.LongPressEnd,
        ].includes(eventName)
      ) {
        // If we dragged any layer, we should cancel click events
        if (LayerDraggable._globalDidDrag === true) {
          return;
        }
      }
    }

    // See if we need to convert coordinates for this event. Mouse events by
    // default have the screen coordinates so we make sure that event.point and
    // event.contextPoint always have the proper coordinates.

    if (
      (args[0] != null ? args[0].clientX : undefined) != null ||
      (args[0] != null ? args[0].clientY : undefined) != null
    ) {
      const event = args[0];
      let point = { x: event.clientX, y: event.clientY };

      event.point = Utils.convertPointFromContext(point, this, true);
      event.contextPoint = Utils.convertPointFromContext(
        point,
        this.context,
        true
      );

      if (event.touches != null) {
        for (var touch of Array.from(event.touches)) {
          point = { x: touch.clientX, y: touch.clientY };
          touch.point = Utils.convertPointFromContext(point, this, true);
          touch.contextPoint = Utils.convertPointFromContext(
            point,
            this.context,
            true
          );
        }
      }
    }

    // Always scope the event this to the layer and pass the layer as
    // last argument for every event.
    return super.emit(eventName, ...Array.from(args), this);
  }

  once(eventName, listener) {
    super.once(eventName, listener);
    return this._addListener(eventName, listener);
  }

  addListener(eventName, listener) {
    if (!eventName) {
      throw Error("Layer.on needs a valid event name");
    }
    if (!listener) {
      throw Error("Layer.on needs an event listener");
    }
    super.addListener(eventName, listener);
    return this._addListener(eventName, listener);
  }

  removeListener(eventName, listener) {
    if (!eventName) {
      throw Error("Layer.off needs a valid event name");
    }
    super.removeListener(eventName, listener);
    return this._removeListener(eventName, listener);
  }

  _addListener(eventName, listener) {
    // Make sure we stop ignoring events once we add a user event listener
    let needle;
    if (!_.startsWith(eventName, "change:")) {
      this.ignoreEvents = false;
    }

    // If this is a dom event, we want the actual dom node to let us know
    // when it gets triggered, so we can emit the event through the system.
    if (
      Utils.domValidEvent(this._element, eventName) ||
      ((needle = eventName), Array.from(_.values(Gestures)).includes(needle))
    ) {
      if (!this._domEventManager.listeners(eventName).length) {
        return this._domEventManager.addEventListener(eventName, (event) => {
          return this.emit(eventName, event);
        });
      }
    }
  }

  _removeListener(eventName, listener) {
    // Do cleanup for dom events if this is the last one of it's type.
    // We are assuming we're the only ones adding dom events to the manager.
    if (!this.listeners(eventName).length) {
      return this._domEventManager.removeAllListeners(eventName);
    }
  }

  _parentDraggableLayer() {
    for (var layer of Array.from(this.ancestors())) {
      if (layer._draggable != null ? layer._draggable.enabled : undefined) {
        return layer;
      }
    }
    return null;
  }

  //#############################################################
  //# EVENT HELPERS

  onClick(cb) {
    return this.on(Events.Click, cb);
  }
  onDoubleClick(cb) {
    return this.on(Events.DoubleClick, cb);
  }
  onScrollStart(cb) {
    return this.on(Events.ScrollStart, cb);
  }
  onScroll(cb) {
    return this.on(Events.Scroll, cb);
  }
  onScrollEnd(cb) {
    return this.on(Events.ScrollEnd, cb);
  }
  onScrollAnimationDidStart(cb) {
    return this.on(Events.ScrollAnimationDidStart, cb);
  }
  onScrollAnimationDidEnd(cb) {
    return this.on(Events.ScrollAnimationDidEnd, cb);
  }

  onTouchStart(cb) {
    return this.on(Events.TouchStart, cb);
  }
  onTouchEnd(cb) {
    return this.on(Events.TouchEnd, cb);
  }
  onTouchMove(cb) {
    return this.on(Events.TouchMove, cb);
  }

  onMouseUp(cb) {
    return this.on(Events.MouseUp, cb);
  }
  onMouseDown(cb) {
    return this.on(Events.MouseDown, cb);
  }
  onMouseOver(cb) {
    return this.on(Events.MouseOver, cb);
  }
  onMouseOut(cb) {
    return this.on(Events.MouseOut, cb);
  }
  onMouseEnter(cb) {
    return this.on(Events.MouseEnter, cb);
  }
  onMouseLeave(cb) {
    return this.on(Events.MouseLeave, cb);
  }
  onMouseMove(cb) {
    return this.on(Events.MouseMove, cb);
  }
  onMouseWheel(cb) {
    return this.on(Events.MouseWheel, cb);
  }

  onAnimationStart(cb) {
    return this.on(Events.AnimationStart, cb);
  }
  onAnimationStop(cb) {
    return this.on(Events.AnimationStop, cb);
  }
  onAnimationEnd(cb) {
    return this.on(Events.AnimationEnd, cb);
  }
  onAnimationDidStart(cb) {
    return this.on(Events.AnimationDidStart, cb);
  } // Deprecated
  onAnimationDidStop(cb) {
    return this.on(Events.AnimationDidStop, cb);
  } // Deprecated
  onAnimationDidEnd(cb) {
    return this.on(Events.AnimationDidEnd, cb);
  } // Deprecated

  onImageLoaded(cb) {
    return this.on(Events.ImageLoaded, cb);
  }
  onImageLoadError(cb) {
    return this.on(Events.ImageLoadError, cb);
  }
  onImageLoadCancelled(cb) {
    return this.on(Events.ImageLoadCancelled, cb);
  }

  onMove(cb) {
    return this.on(Events.Move, cb);
  }
  onDragStart(cb) {
    return this.on(Events.DragStart, cb);
  }
  onDragWillMove(cb) {
    return this.on(Events.DragWillMove, cb);
  }
  onDragMove(cb) {
    return this.on(Events.DragMove, cb);
  }
  onDragDidMove(cb) {
    return this.on(Events.DragDidMove, cb);
  }
  onDrag(cb) {
    return this.on(Events.Drag, cb);
  }
  onDragEnd(cb) {
    return this.on(Events.DragEnd, cb);
  }
  onDragAnimationStart(cb) {
    return this.on(Events.DragAnimationStart, cb);
  }
  onDragAnimationEnd(cb) {
    return this.on(Events.DragAnimationEnd, cb);
  }
  onDirectionLockStart(cb) {
    return this.on(Events.DirectionLockStart, cb);
  }

  onStateSwitchStart(cb) {
    return this.on(Events.StateSwitchStart, cb);
  }
  onStateSwitchStop(cb) {
    return this.on(Events.StateSwitchStop, cb);
  }
  onStateSwitchEnd(cb) {
    return this.on(Events.StateSwitchEnd, cb);
  }

  onStateWillSwitch(cb) {
    return this.on(Events.StateSwitchStart, cb);
  } // Deprecated
  onStateDidSwitch(cb) {
    return this.on(Events.StateSwitchEnd, cb);
  } // Deprecated

  // Gestures

  // Tap
  onTap(cb) {
    return this.on(Events.Tap, cb);
  }
  onTapStart(cb) {
    return this.on(Events.TapStart, cb);
  }
  onTapEnd(cb) {
    return this.on(Events.TapEnd, cb);
  }
  onDoubleTap(cb) {
    return this.on(Events.DoubleTap, cb);
  }

  // Force Tap
  onForceTap(cb) {
    return this.on(Events.ForceTap, cb);
  }
  onForceTapChange(cb) {
    return this.on(Events.ForceTapChange, cb);
  }
  onForceTapStart(cb) {
    return this.on(Events.ForceTapStart, cb);
  }
  onForceTapEnd(cb) {
    return this.on(Events.ForceTapEnd, cb);
  }

  // Press
  onLongPress(cb) {
    return this.on(Events.LongPress, cb);
  }
  onLongPressStart(cb) {
    return this.on(Events.LongPressStart, cb);
  }
  onLongPressEnd(cb) {
    return this.on(Events.LongPressEnd, cb);
  }

  // Swipe
  onSwipe(cb) {
    return this.on(Events.Swipe, cb);
  }
  onSwipeStart(cb) {
    return this.on(Events.SwipeStart, cb);
  }
  onSwipeEnd(cb) {
    return this.on(Events.SwipeEnd, cb);
  }

  onSwipeUp(cb) {
    return this.on(Events.SwipeUp, cb);
  }
  onSwipeUpStart(cb) {
    return this.on(Events.SwipeUpStart, cb);
  }
  onSwipeUpEnd(cb) {
    return this.on(Events.SwipeUpEnd, cb);
  }

  onSwipeDown(cb) {
    return this.on(Events.SwipeDown, cb);
  }
  onSwipeDownStart(cb) {
    return this.on(Events.SwipeDownStart, cb);
  }
  onSwipeDownEnd(cb) {
    return this.on(Events.SwipeDownEnd, cb);
  }

  onSwipeLeft(cb) {
    return this.on(Events.SwipeLeft, cb);
  }
  onSwipeLeftStart(cb) {
    return this.on(Events.SwipeLeftStart, cb);
  }
  onSwipeLeftEnd(cb) {
    return this.on(Events.SwipeLeftEnd, cb);
  }

  onSwipeRight(cb) {
    return this.on(Events.SwipeRight, cb);
  }
  onSwipeRightStart(cb) {
    return this.on(Events.SwipeRightStart, cb);
  }
  onSwipeRightEnd(cb) {
    return this.on(Events.SwipeRightEnd, cb);
  }

  // Pan
  onPan(cb) {
    return this.on(Events.Pan, cb);
  }
  onPanStart(cb) {
    return this.on(Events.PanStart, cb);
  }
  onPanEnd(cb) {
    return this.on(Events.PanEnd, cb);
  }
  onPanLeft(cb) {
    return this.on(Events.PanLeft, cb);
  }
  onPanRight(cb) {
    return this.on(Events.PanRight, cb);
  }
  onPanUp(cb) {
    return this.on(Events.PanUp, cb);
  }
  onPanDown(cb) {
    return this.on(Events.PanDown, cb);
  }

  // Pinch
  onPinch(cb) {
    return this.on(Events.Pinch, cb);
  }
  onPinchStart(cb) {
    return this.on(Events.PinchStart, cb);
  }
  onPinchEnd(cb) {
    return this.on(Events.PinchEnd, cb);
  }

  // Scale
  onScale(cb) {
    return this.on(Events.Scale, cb);
  }
  onScaleStart(cb) {
    return this.on(Events.ScaleStart, cb);
  }
  onScaleEnd(cb) {
    return this.on(Events.ScaleEnd, cb);
  }

  // Rotate
  onRotate(cb) {
    return this.on(Events.Rotate, cb);
  }
  onRotateStart(cb) {
    return this.on(Events.RotateStart, cb);
  }
  onRotateEnd(cb) {
    return this.on(Events.RotateEnd, cb);
  }

  //#############################################################
  //# HINT

  _showHint(targetLayer) {
    // If this layer isnt visible we can just exit
    if (!this.visible) {
      return;
    }
    if (this.opacity === 0) {
      return;
    }

    // If we don't need to show a hint exit but pass to children
    if (!this.shouldShowHint(targetLayer)) {
      for (var layer of Array.from(this.children)) {
        layer._showHint(targetLayer);
      }
      return null;
    }

    // Figure out the frame we want to show the hint in, if any of the
    // parent layers clip, we need to intersect the rectangle with it.
    let frame = this.canvasFrame;

    for (var parent of Array.from(this.ancestors())) {
      if (parent.clip) {
        frame = Utils.frameIntersection(frame, parent.canvasFrame);
      }
      if (!frame) {
        return;
      }
    }

    // Show the actual hint
    this.showHint(frame);

    // Tell the children to show their hints
    return _.invokeMap(this.children, "_showHint");
  }

  willSeemToDoSomething() {
    if (this.ignoreEvents) {
      return false;
    }

    if (this._draggable) {
      if (
        this._draggable.isDragging === false &&
        this._draggable.isMoving === false
      ) {
        return false;
      }
    }

    return true;
  }

  shouldShowHint() {
    // Don't show hints if the layer is not interactive
    if (this.ignoreEvents === true) {
      return false;
    }

    // Don't show any hints while we are animating
    if (this.isAnimating) {
      return false;
    }

    for (var parent of Array.from(this.ancestors())) {
      if (parent.isAnimating) {
        return false;
      }
    }

    // Don't show hints if there is a draggable that cannot be dragged.
    if (
      this._draggable &&
      this._draggable.horizontal === false &&
      this._draggable.vertical === false
    ) {
      return false;
    }

    // Don't show hint if this layer is invisible
    if (this.opacity === 0) {
      return false;
    }

    // If we don't ignore events on this layer, make sure the layer is listening to
    // an interactive event so there is a decent change something is happening after
    // we click it.

    for (var eventName of Array.from(this.listenerEvents())) {
      if (Events.isInteractive(eventName)) {
        return true;
      }
    }

    return false;
  }

  showHint(highlightFrame) {
    // Don't show anything if this element covers the entire screen
    // if Utils.frameInFrame(@context.canvasFrame, highlightFrame)
    //	return

    // Start an animation with a rectangle fading out over time
    const layer = new Layer({
      frame: Utils.frameInset(highlightFrame, -1),
      backgroundColor: null,
      borderColor: Framer.Defaults.Hints.color,
      borderRadius:
        this.borderRadius *
        Utils.average([this.canvasScaleX(), this.canvasScaleY()]),
      borderWidth: 3,
    });

    // Only show outlines for draggables
    if (this._draggable) {
      layer.backgroundColor = null;
    }

    // Only show outlines if a highlight is fullscreen
    if (Utils.frameInFrame(this.context.canvasFrame, highlightFrame)) {
      layer.backgroundColor = null;
    }

    const animation = layer.animate({
      properties: { opacity: 0 },
      curve: "ease-out",
      time: 0.5,
    });

    return animation.onAnimationEnd(() => layer.destroy());
  }

  //#############################################################
  //# DESCRIPTOR

  toName() {
    if (this.name) {
      return name;
    }
    return (
      (this.__framerInstanceInfo != null
        ? this.__framerInstanceInfo.name
        : undefined) || ""
    );
  }

  toInspect(constructor) {
    if (constructor == null) {
      constructor = this.constructor.name;
    }
    const name = this.name ? `name:${this.name} ` : "";
    return `<${constructor} ${this.toName()} id:${this.id} ${name} \
(${Utils.roundWhole(this.x)}, ${Utils.roundWhole(this.y)}) \
${Utils.roundWhole(this.width)}x${Utils.roundWhole(this.height)}>`;
  }
}

Layer.initClass();

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
