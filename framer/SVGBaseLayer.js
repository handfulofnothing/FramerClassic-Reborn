/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {LayerStyle} = require("./LayerStyle");
const {Layer, layerProperty} = require("./Layer");
const {Color} = require("./Color");
const Utils = require("./Utils");

let _svgMeasureElement = null;

const denyCopy = () => Utils.throwInStudioOrWarnInProduction("SVGGroup and SVGPath do not support the `copy` method");

const getSVGMeasureElement = function(constraints) {
	if (constraints == null) { constraints = {}; }
	if ((_svgMeasureElement == null)) {
		_svgMeasureElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		_svgMeasureElement.id = "_svgMeasure";
		_svgMeasureElement.style.position = "fixed";
		_svgMeasureElement.style.visibility = "hidden";
		_svgMeasureElement.style.top = "-10000px";
		_svgMeasureElement.style.left = "-10000px";

		if (!window.document.body) {
			document.write(_svgMeasureElement.outerHTML);
			_svgMeasureElement = document.getElementById("_svgMeasure");
		} else {
			window.document.body.appendChild(_svgMeasureElement);
		}
	}


	while (_svgMeasureElement.hasChildNodes()) {
		_svgMeasureElement.removeChild(_svgMeasureElement.lastChild);
	}

	return _svgMeasureElement;
};


const originTransform = function(value, layer, name) {
	let sizeProp = undefined;
	switch (name) {
		case "originX": sizeProp = "width"; break;
		case "originY": sizeProp = "height"; break;
	}
	if (sizeProp == null) { return value; }
	const layerSize = layer[sizeProp];
	const svgSize = layer._svgSize[sizeProp];
	if (!(layerSize >= 0) || !(svgSize > 0)) { return value; }
	return (layerSize / svgSize) * value;
};

const Cls = (exports.SVGBaseLayer = class SVGBaseLayer extends Layer {
	static initClass() {
		// Overridden Layer properties
	
		this.define("parent", {
			enumerable: false,
			exportable: false,
			importable: false,
			get() {
				if (this._parent instanceof SVGLayer) { return this._parent.parent; }
				return this._parent || null;
			}
		}
		);
		this.define("html",	{get() {	return this._element.outerHTML || ""; }});
	
	
		this.define("width", {get() { return this._width; }});
		this.define("height", {get() { return this._height; }});
		this.define("originX", layerProperty(this, "originX", "webkitTransformOrigin", 0.5, _.isNumber, originTransform));
		this.define("originY", layerProperty(this, "originY", "webkitTransformOrigin", 0.5, _.isNumber, originTransform));
	
		// Disabled properties
		this.undefine(["label", "blending", "image"]);
		this.undefine(["blur", "brightness", "saturate", "hueRotate", "contrast", "invert", "grayscale", "sepia"]); // webkitFilter properties
		this.undefine(["backgroundBlur", "backgroundBrightness", "backgroundSaturate", "backgroundHueRotate", "backgroundContrast", "backgroundInvert", "backgroundGrayscale", "backgroundSepia"]); // webkitBackdropFilter properties
		for (let i = 0; i <= 8; i++) {
			(i => {
				return this.undefine(`shadow${i+1}`);
			})(i);
		}
		this.undefine("shadows");
		this.undefine(["borderRadius", "cornerRadius", "borderStyle"]);
		this.undefine(["constraintValues", "htmlIntrinsicSize"]);
	
		this.undefine("gradient");
	
		this.alias("borderColor", "stroke");
		this.alias("strokeColor", "stroke");
		this.alias("borderWidth", "strokeWidth");
		this.alias("backgroundColor", "fill");
		this.alias("color", "fill");
	
		this.prototype.addChild = undefined;
		this.prototype.removeChild = undefined;
		this.prototype.addSubLayer = undefined;
		this.prototype.removeSubLayer = undefined;
		this.prototype.bringToFront = undefined;
		this.prototype.sendToBack = undefined;
		this.prototype.placeBefore = undefined;
		this.prototype.placeBehind = undefined;
	}

	// Aliassed helpers
	static alias(propertyName, proxiedName) {
		return this.define(propertyName, {
			get() {
				return this[proxiedName];
			},
			set(value) {
				if (this.__applyingDefaults) { return; }
				return this[proxiedName] = value;
			}
		}
		);
	}

	// Overridden functions from Layer
	_insertElement() {}
	updateForSizeChange() {}
	updateForDevicePixelRatioChange() {
		return ["width", "height", "webkitTransform"].map((cssProperty) =>
			(this._element.style[cssProperty] = LayerStyle[cssProperty](this)));
	}

	static attributesFromElement(attributes, element) {
		const options = {};
		for (var attribute of Array.from(attributes)) {
			var key = _.camelCase(attribute);
			options[key] = element.getAttribute(attribute);
		}
		return options;
	}

	constructor(options) {
		let prop;
		this.updateForDevicePixelRatioChange = this.updateForDevicePixelRatioChange.bind(this);
		this.resetViewbox = this.resetViewbox.bind(this);
		const {
            element
        } = options;
		this._element = element;
		this._elementBorder = element;
		this._elementHTML = element;
		this._parent = options.parent;

		delete options.parent;
		delete options.element;
		if (this._parent instanceof SVGLayer) {
			this._stylesAppliedToParent = ["webkitTransform", "webkitTransformOrigin"];
			for (prop of ["x", "y", "z", "scaleX", "scaleY", "scaleZ", "scale", "skewX", "skewY", "skew", "rotationX", "rotationY", "rotationZ", "force2d", "originX", "originY"]) {
				if (options[prop] == null) { options[prop] = this._parent[prop]; }
			}
		} else {
			this._pixelMultiplierOverride = 1;
		}
		let svgLayer = this._parent;
		while ((svgLayer != null) && !(svgLayer instanceof SVGLayer)) {
			svgLayer = svgLayer._parent;
		}
		this._svgLayer = svgLayer;
		this._svg = this._svgLayer.svg;
		this._svgSize = svgLayer.size;

		const pathProperties = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-dasharray", "stroke-dashoffset", "name", "opacity"];
		_.defaults(options, this.constructor.attributesFromElement(pathProperties, element));
		if (this._element.transform.baseVal.numberOfItems > 0) {
			let transform;
			if (options.x == null) { options.x = 0; }
			if (options.y == null) { options.y = 0; }
			if (options.rotationZ == null) { options.rotationZ = 0; }
			const indicesToRemove = [];
			for (let i = 0, end = this._element.transform.baseVal.numberOfItems, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
				transform = this._element.transform.baseVal.getItem(i);
				var {
                    matrix
                } = transform;
				switch (transform.type) {
					case 2: //SVG_TRANSFORM_TRANSLATE
						options.x += matrix.e;
						options.y += matrix.f;
						indicesToRemove.push(i);
						break;
					case 4: //SVG_TRANSFORM_ROTATE
						// We willingly ignore the translation from this matrix
						options.rotationZ += - (Math.atan2(matrix.c, matrix.d) / Math.PI) * 180;
						indicesToRemove.push(i);
						break;
				}
			}

			for (var index of Array.from(indicesToRemove.reverse())) {
				this._element.transform.baseVal.removeItem(index);
			}
		}
		this.calculateSize();
		super(options);

		this.resetViewbox();

		for (prop of ["frame", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "strokeMiterlimit", "strokeDasharray", "strokeDashoffset", "rotation", "scale"]) {
			this.on(`change:${prop}`, this.resetViewbox);
		}
	}

	calculateSize() {
		let parent, reference;
		let element = this._element;
		let measuredElement = null;
		let scaleX = 1;
		let scaleY = 1;
		if (typeof Framer !== 'undefined' && Framer !== null ? Framer.CurrentContext.elementInDOM : undefined) {
			scaleX = this._parent.canvasScaleX();
			scaleY = this._parent.canvasScaleY();
		} else {
			parent = this._element.parentElement;
			reference = this._element.nextSibling;
			const svgMeasure = getSVGMeasureElement();
			svgMeasure.appendChild(this._element);
			measuredElement = svgMeasure.firstChild;
			element = measuredElement;
		}

		const rect = element.getBoundingClientRect();
		this._width = rect.width / scaleX;
		this._height = rect.height / scaleY;

		if (measuredElement != null) {
			if (reference != null) {
				return parent.insertBefore(measuredElement, reference);
			} else {
				return parent.appendChild(measuredElement);
			}
		}
	}

	resetViewbox() {
		this._svg.setAttribute("viewBox", `0,0,${this.width},${this.height}`);
		return this._svg.removeAttribute("viewBox");
	}

	copy() { return denyCopy(); }
	copySingle() { return denyCopy(); }
});
Cls.initClass();
