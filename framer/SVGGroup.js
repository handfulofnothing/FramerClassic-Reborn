/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Layer, layerProperty} = require("./Layer");
const {Color} = require("./Color");
const {SVG} = require("./SVG");

const {SVGBaseLayer} = require("./SVGBaseLayer");
const {SVGPath} = require("./SVGPath");

class SVGGroup extends SVGBaseLayer {
	static initClass() {
	
		this.defineGroupProxyProp("fill");
		this.defineGroupProxyProp("stroke");
		this.defineGroupProxyProp("strokeWidth", _.isNumber, parseInt);
		this.defineGroupProxyProp("strokeWidthMultiplier", _.isNumber, parseInt);
		// coffeelint: disable=prefer_english_operator
		this.defineGroupProxyProp("ignoreEvents", _.isBoolean, value => !!value);
	}
	constructor(group, options) {
		options.element = group;
		super(options);
		const {children, targets} = SVG.constructSVGElements(this, this._element.childNodes, SVGPath, SVGGroup);
		this._children = children;
		this.elements = targets;
		SVG.updateGradientSVG(this);
	}

	static defineGroupProxyProp(propertyName, validator, transformer) {
		if (validator == null) { validator = SVG.validFill; }
		if (transformer == null) { transformer = SVG.toFill; }

		const privateProp = `_${propertyName}`;

		return this.define(propertyName, {
			get() {
				// If our value got set from the outside in, then that's the value that we return:
				if (this[privateProp] != null) { return this[privateProp]; }

				// When not set, try to reduce the value from our children:
				let value = null;
				for (var child of Array.from(this._children)) {
					var childPropertyValue = child[propertyName];
					if (value === null) {
						value = childPropertyValue;
					} else {
						if (!Utils.equal(childPropertyValue, value)) {
							// Stick to the internally set value; for the children
							// do not provide a homogeneous value:
							return this[privateProp] != null ? this[privateProp] : null;
						}
					}
				}

				// This child values are homogeneous; return their value as our value:
				return value;
			},

			set(value) {
				if (!validator(value)) { value = transformer(value); }
				if (validator(value)) {
					this[privateProp] = value;
				} else {
					this[privateProp] = null;
				}

				const persistedValue = this[privateProp];

				return Array.from(this._children).map((child) =>
					(child[propertyName] = persistedValue));
			}
		}
		);
	}
}
SVGGroup.initClass();
	// coffeelint: enable=prefer_english_operator

exports.SVGGroup = SVGGroup;
