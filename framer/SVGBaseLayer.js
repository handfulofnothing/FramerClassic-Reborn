import { LayerStyle } from "./LayerStyle.js";
import { Layer, layerProperty } from "./Layer.js";
import Utils from "./Utils.js";

let _svgMeasureElement = null;

const denyCopy = () =>
  Utils.throwInStudioOrWarnInProduction(
    "SVGGroup and SVGPath do not support the `copy` method"
  );

const getSVGMeasureElement = (constraints = {}) => {
  if (!_svgMeasureElement) {
    _svgMeasureElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    _svgMeasureElement.id = "_svgMeasure";
    Object.assign(_svgMeasureElement.style, {
      position: "fixed",
      visibility: "hidden",
      top: "-10000px",
      left: "-10000px",
    });

    if (!document.body) {
      document.write(_svgMeasureElement.outerHTML);
      _svgMeasureElement = document.getElementById("_svgMeasure");
    } else {
      document.body.appendChild(_svgMeasureElement);
    }
  }

  while (_svgMeasureElement.firstChild) {
    _svgMeasureElement.removeChild(_svgMeasureElement.lastChild);
  }

  return _svgMeasureElement;
};

const originTransform = (value, layer, name) => {
  const sizeProp =
    name === "originX" ? "width" : name === "originY" ? "height" : null;
  if (!sizeProp) return value;

  const layerSize = layer[sizeProp];
  const svgSize = layer._svgSize[sizeProp];
  if (!(layerSize >= 0) || !(svgSize > 0)) return value;

  return (layerSize / svgSize) * value;
};

export class SVGBaseLayer extends Layer {
  static initClass() {
    this.define("parent", {
      enumerable: false,
      exportable: false,
      importable: false,
      get() {
        if (this._parent instanceof SVGLayer) return this._parent.parent;
        return this._parent ?? null;
      },
    });

    this.define("html", { get: () => this._element.outerHTML || "" });

    this.define("width", { get: () => this._width });
    this.define("height", { get: () => this._height });
    this.define(
      "originX",
      layerProperty(
        this,
        "originX",
        "webkitTransformOrigin",
        0.5,
        Number.isFinite,
        originTransform
      )
    );
    this.define(
      "originY",
      layerProperty(
        this,
        "originY",
        "webkitTransformOrigin",
        0.5,
        Number.isFinite,
        originTransform
      )
    );

    // Disabled properties
    this.undefine([
      "label",
      "blending",
      "image",
      "blur",
      "brightness",
      "saturate",
      "hueRotate",
      "contrast",
      "invert",
      "grayscale",
      "sepia",
      "backgroundBlur",
      "backgroundBrightness",
      "backgroundSaturate",
      "backgroundHueRotate",
      "backgroundContrast",
      "backgroundInvert",
      "backgroundGrayscale",
      "backgroundSepia",
      ...Array.from({ length: 9 }, (_, i) => `shadow${i + 1}`),
      "shadows",
      "borderRadius",
      "cornerRadius",
      "borderStyle",
      "constraintValues",
      "htmlIntrinsicSize",
      "gradient",
    ]);

    // Aliases
    this.alias("borderColor", "stroke");
    this.alias("strokeColor", "stroke");
    this.alias("borderWidth", "strokeWidth");
    this.alias("backgroundColor", "fill");
    this.alias("color", "fill");

    // Disabled layer tree functions
    [
      "addChild",
      "removeChild",
      "addSubLayer",
      "removeSubLayer",
      "bringToFront",
      "sendToBack",
      "placeBefore",
      "placeBehind",
    ].forEach((fn) => (this.prototype[fn] = undefined));
  }

  static alias(propName, proxiedName) {
    return this.define(propName, {
      get() {
        return this[proxiedName];
      },
      set(value) {
        if (!this.__applyingDefaults) this[proxiedName] = value;
      },
    });
  }

  constructor(options = {}) {
    super(options);

    this.updateForDevicePixelRatioChange =
      this.updateForDevicePixelRatioChange.bind(this);
    this.resetViewbox = this.resetViewbox.bind(this);

    const { element } = options;
    this._element = element;
    this._elementBorder = element;
    this._elementHTML = element;
    this._parent = options.parent;

    delete options.parent;
    delete options.element;

    if (this._parent instanceof SVGLayer) {
      this._stylesAppliedToParent = [
        "webkitTransform",
        "webkitTransformOrigin",
      ];
      [
        "x",
        "y",
        "z",
        "scaleX",
        "scaleY",
        "scaleZ",
        "scale",
        "skewX",
        "skewY",
        "skew",
        "rotationX",
        "rotationY",
        "rotationZ",
        "force2d",
        "originX",
        "originY",
      ].forEach((prop) => {
        if (options[prop] == null) options[prop] = this._parent[prop];
      });
    } else {
      this._pixelMultiplierOverride = 1;
    }

    let svgLayer = this._parent;
    while (svgLayer && !(svgLayer instanceof SVGLayer))
      svgLayer = svgLayer._parent;

    this._svgLayer = svgLayer;
    this._svg = svgLayer.svg;
    this._svgSize = svgLayer.size;

    const pathProps = [
      "fill",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-dasharray",
      "stroke-dashoffset",
      "name",
      "opacity",
    ];

    Object.assign(
      options,
      this.constructor.attributesFromElement(pathProps, element)
    );

    // Extract transforms
    if (this._element.transform.baseVal.numberOfItems > 0) {
      let transform,
        indicesToRemove = [];
      options.x ??= 0;
      options.y ??= 0;
      options.rotationZ ??= 0;

      for (let i = 0; i < this._element.transform.baseVal.numberOfItems; i++) {
        transform = this._element.transform.baseVal.getItem(i);
        const { matrix } = transform;
        switch (transform.type) {
          case 2: // SVG_TRANSFORM_TRANSLATE
            options.x += matrix.e;
            options.y += matrix.f;
            indicesToRemove.push(i);
            break;
          case 4: // SVG_TRANSFORM_ROTATE
            options.rotationZ +=
              -(Math.atan2(matrix.c, matrix.d) / Math.PI) * 180;
            indicesToRemove.push(i);
            break;
        }
      }

      indicesToRemove
        .reverse()
        .forEach((i) => this._element.transform.baseVal.removeItem(i));
    }

    this.calculateSize();
    super(options);
    this.resetViewbox();

    [
      "frame",
      "stroke",
      "strokeWidth",
      "strokeLinecap",
      "strokeLinejoin",
      "strokeMiterlimit",
      "strokeDasharray",
      "strokeDashoffset",
      "rotation",
      "scale",
    ].forEach((prop) => this.on(`change:${prop}`, this.resetViewbox));
  }

  calculateSize() {
    let parent,
      reference,
      measuredElement = null;
    let scaleX = 1,
      scaleY = 1;
    let element = this._element;

    if (typeof Framer !== "undefined" && Framer?.CurrentContext?.elementInDOM) {
      scaleX = this._parent.canvasScaleX();
      scaleY = this._parent.canvasScaleY();
    } else {
      parent = element.parentElement;
      reference = element.nextSibling;
      const svgMeasure = getSVGMeasureElement();
      svgMeasure.appendChild(element);
      measuredElement = svgMeasure.firstChild;
      element = measuredElement;
    }

    const rect = element.getBoundingClientRect();
    this._width = rect.width / scaleX;
    this._height = rect.height / scaleY;

    if (measuredElement) {
      if (reference) parent.insertBefore(measuredElement, reference);
      else parent.appendChild(measuredElement);
    }
  }

  resetViewbox() {
    this._svg.setAttribute("viewBox", `0,0,${this.width},${this.height}`);
    this._svg.removeAttribute("viewBox");
  }

  updateForDevicePixelRatioChange() {
    ["width", "height", "webkitTransform"].forEach((cssProp) => {
      this._element.style[cssProp] = LayerStyle[cssProp](this);
    });
  }

  copy() {
    return denyCopy();
  }
  copySingle() {
    return denyCopy();
  }

  static attributesFromElement(attributes, element) {
    const options = {};
    for (const attribute of attributes) {
      const key = attribute.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase()
      );
      options[key] = element.getAttribute(attribute);
    }
    return options;
  }
}

SVGBaseLayer.initClass();
