import { SVG } from "./SVG.js";
import { SVGBaseLayer } from "./SVGBaseLayer.js";
import { SVGPath } from "./SVGPath.js";
import Utils from "./Utils.js";

export class SVGGroup extends SVGBaseLayer {
  static initClass() {
    this.defineGroupProxyProp("fill");
    this.defineGroupProxyProp("stroke");
    this.defineGroupProxyProp("strokeWidth", Number.isFinite, parseInt);
    this.defineGroupProxyProp(
      "strokeWidthMultiplier",
      Number.isFinite,
      parseInt
    );
    this.defineGroupProxyProp(
      "ignoreEvents",
      (val) => typeof val === "boolean",
      (val) => !!val
    );
  }

  constructor(group, options = {}) {
    options.element = group;
    super(options);

    const { children, targets } = SVG.constructSVGElements(
      this,
      this._element.childNodes,
      SVGPath,
      SVGGroup
    );
    this._children = children;
    this.elements = targets;

    SVG.updateGradientSVG(this);
  }

  static defineGroupProxyProp(
    propertyName,
    validator = SVG.validFill,
    transformer = SVG.toFill
  ) {
    const privateProp = `_${propertyName}`;

    return this.define(propertyName, {
      get() {
        // Return externally set value if exists
        if (this[privateProp] != null) return this[privateProp];

        // Check children's values for homogeneous value
        let value = null;
        for (const child of this._children) {
          const childValue = child[propertyName];
          if (value === null) {
            value = childValue;
          } else if (!Utils.equal(childValue, value)) {
            return this[privateProp] ?? null;
          }
        }

        return value;
      },

      set(value) {
        if (!validator(value)) value = transformer(value);
        this[privateProp] = validator(value) ? value : null;

        const persistedValue = this[privateProp];
        this._children.forEach(
          (child) => (child[propertyName] = persistedValue)
        );
      },
    });
  }
}

SVGGroup.initClass();
