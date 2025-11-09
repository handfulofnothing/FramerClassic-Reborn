/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {_} = require("./Underscore");
const {Color} = require("./Color");
const {Layer, layerProperty, layerProxiedValue} = require("./Layer");
const {SVG} = require("./SVG");
const {SVGGroup} = require("./SVGGroup");
const {SVGPath} = require("./SVGPath");
const Utils = require("./Utils");

const updateIdsToBeUnique = function(htmlString) {
	const ids = Utils.getIdAttributesFromString(htmlString);
	for (var id of Array.from(ids)) {
		var uniqueId = Utils.getUniqueId(id);
		if (id !== uniqueId) {
			id = Utils.escapeForRegex(id);
			htmlString = htmlString.replace(new RegExp(`((id|xlink:href)=["'']\\#?)${id}(["'])`, 'g'), `$1${uniqueId}$3`);
			htmlString = htmlString.replace(new RegExp(`(["'']url\\(\\#)${id}(\\)["'])`, 'g'), `$1${uniqueId}$2`);
		}
	}
	return htmlString;
};

const Cls = (exports.SVGLayer = class SVGLayer extends Layer {
	static initClass() {
	
		this.define("elements", this.simpleProperty("elements", {}));
	
		this.define("fill", layerProperty(this, "fill", "fill", null, SVG.validFill, SVG.toFill));
		this.define("stroke", layerProperty(this, "stroke", "stroke", null, SVG.validFill, SVG.toFill));
		this.define("strokeWidthMultiplier", layerProperty(this, "strokeWidthMultiplier", null, null, _.isNumber));
		this.define("strokeWidth", layerProperty(this, "strokeWidth", "strokeWidth", null, _.isNumber, null, {depends: ["strokeWidthMultiplier"]}));
		this.define("color", layerProperty(this, "color", "color", null, Color.validColorValue, Color.toColor, null, ((layer, value) => layer.fill = value), "_elementHTML", true));
	
		this.define("gradient", {
			get() {
				if (Gradient.isGradientObject(this._gradient)) { return layerProxiedValue(this._gradient, this, "gradient"); }
				return null;
			},
			set(value) { // Copy semantics!
				if (Gradient.isGradient(value)) {
					this._gradient = new Gradient(value);
				} else if (!value && Gradient.isGradientObject(this._gradient)) {
					this._gradient = null;
				}
				return SVG.updateGradientSVG(this);
			}
		}
		);
	
		this.define("image", {
			get() {
				return this._image;
			},
			set(value) {
				this._image = value;
				return SVG.updateImagePatternSVG(this);
			}
		}
		);
	
		this.define("imageSize", {
			importable: true,
			exportable: true,
			default: null,
			get() { return this._getPropertyValue("imageSize"); },
			set(value) {
				if (value === null) {
					return this._setPropertyValue("imageSize", value);
				} else {
					if (!_.isFinite(value.width) || !_.isFinite(value.height)) { return; }
					this._setPropertyValue("imageSize", {width: value.width, height: value.height});
					return SVG.updateImagePatternSVG(this);
				}
			}
		}
		);
	
		this.define("svg", {
			get() {
				const svgNode = _.first(this._elementHTML != null ? this._elementHTML.children : undefined);
				if (svgNode instanceof SVGElement) {
					return svgNode;
				} else {
					return null;
				}
			},
			set(value) {
				if (typeof value === "string") {
					return this.html = updateIdsToBeUnique(value);
				} else if (value instanceof SVGElement) {
					const idElements = value.querySelectorAll('[id]');
					for (var element of Array.from(idElements)) {
						var existingElement = document.querySelector(`[id='${element.id}']`);
						if (existingElement != null) {
							Utils.throwInStudioOrWarnInProduction(Layer.ExistingIdMessage("svg", element.id));
							return;
						}
					}
					this._createHTMLElementIfNeeded();
					while (this._elementHTML.firstChild) {
						this._elementHTML.removeChild(this._elementHTML.firstChild);
					}
					if (value.parentNode != null) {
						value = value.cloneNode(true);
					}
					return this._elementHTML.appendChild(value);
				}
			}
		}
		);
	}
	constructor(options) {
		// Ugly: detect Vekter export with html intrinsic size
		if (options == null) { options = {}; }
		if ((options.htmlIntrinsicSize != null) && (options.backgroundColor != null)) {
			// Backwards compatibility for old Vekter exporter that would
			// set backgroundColor instead of color
			if (options.color == null) { options.color = options.backgroundColor; }
			options.backgroundColor = null;
		}
		if (options.clip == null) { options.clip = false; }
		if ((options.svg != null) || (options.html != null)) {
			if (options.backgroundColor == null) { options.backgroundColor = null; }
		}
		super(options);

		const {
            svg
        } = this;
		if (svg != null) {
			const {targets, children} = SVG.constructSVGElements(this, svg.childNodes, SVGPath, SVGGroup);
			this.elements = targets;
			this._children = children;
		} else {
			this.elements = [];
		}

		SVG.updateImagePatternSVG(this);
		SVG.updateGradientSVG(this);

		this.onChange("backgroundSize", () => SVG.updateImagePatternSVG(this));
		this.onChange("image", () => SVG.updateImagePatternSVG(this));
	}

	copy() {
		const layer = this.copySingle();
		return layer;
	}

	copySingle() {
		const {
            props
        } = this;
		if ((props.html != null) && (props.svg != null)) {
			delete props.svg;
		}
		props.html = updateIdsToBeUnique(props.html);
		const copy = new this.constructor(props);
		copy.style = this.style;
		return copy;
	}
});
Cls.initClass();
