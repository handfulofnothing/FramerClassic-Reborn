/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Layer, layerProperty} = require("./Layer");
const {LayerStyle} = require("./LayerStyle");
const {StyledText} = require("./StyledText");

const validateFont = arg => _.isString(arg) || _.isObject(arg);

const fontFamilyFromObject = function(font) {
	if (_.isObject(font)) { return font.fontFamily; } else { return font; }
};

const textProperty = (obj, name, fallback, validator, transformer, set) => layerProperty(obj, name, name, fallback, validator, transformer, {}, set, "_elementHTML");

const asPadding = function(value) {
	if (_.isNumber(value)) { return value; }
	if (!_.isObject(value)) { return 0; }
	const result = {};
	let isValidObject = false;
	if (value.horizontal != null) {
		if (value.left == null) { value.left = value.horizontal; }
		if (value.right == null) { value.right = value.horizontal; }
	}
	if (value.vertical != null) {
		if (value.top == null) { value.top = value.vertical; }
		if (value.bottom == null) { value.bottom = value.vertical; }
	}
	for (var key of ["left", "right", "bottom", "top"]) {
		if (!isValidObject) { isValidObject = _.has(value, key); }
		result[key] = value[key] != null ? value[key] : 0;
	}
	if (!isValidObject) { return 0; } else { return result; }
};

const Cls = (exports.TextLayer = class TextLayer extends Layer {
	static initClass() {
		this._textProperties = [
			"text",
			"fontFamily",
			"fontSize",
			"fontWeight",
			"fontStyle",
			"lineHeight",
			"letterSpacing",
			"wordSpacing",
			"textAlign",
			"textTransform",
			"textIndent",
			"textDecoration",
			"textOverflow",
			"whiteSpace",
			"direction",
			"font",
			"borderWidth",
			"padding"
		];
	
		this._textStyleProperties = _.pull(_.clone(TextLayer._textProperties), "text").concat(["color", "shadowX", "shadowY", "shadowBlur", "shadowColor"]);
	
		this.define("_styledText", {
			get() {
				if ((this.__styledText == null)) {
					this.__styledText = new StyledText();
				}
				return this.__styledText;
			},
			set(value) {
				if (!(value instanceof StyledText)) { return; }
				return this.__styledText = value;
			}
		}
		);
	
		this.define("styledTextOptions", {
			get() { return (this._styledText != null ? this._styledText.getOptions() : undefined); },
			set(value) {
				this._styledText = new StyledText(value);
				this._styledText.setElement(this._elementHTML);
				const fonts = this._styledText.getFonts();
				const promise = Utils.isFontFamilyLoaded(fonts);
				if (_.isObject(promise)) {
					return promise.then(() => {
						return this.renderText();
					});
				}
			}
		}
		);
	
		//Vekter properties
		this.define("autoWidth", this.proxyProperty("_styledText.autoWidth", {
			didSet(layer, value) {
				return layer.renderText();
			}
		}
			)
		);
		this.define("autoHeight", this.proxyProperty("_styledText.autoHeight", {
			didSet(layer, value) {
				return layer.renderText();
			}
		}
			)
		);
	
		this.define("autoSize", {
			get() { return this.autoWidth && this.autoHeight; },
			set(value) {
				this.autoWidth = value;
				this.autoHeight = value;
				return this.renderText();
			}
		}
		);
	
		this.define("fontFamily", textProperty(this, "fontFamily", null, _.isString, fontFamilyFromObject, function(layer, value) {
			if (value === null) { return; }
			layer.font = value;
			const promise = Utils.isFontFamilyLoaded(value);
			if (_.isObject(promise)) {
				return promise.then(() => setTimeout(layer.renderText, 0));
			}
		})
		);
		this.define("fontWeight", textProperty(this, "fontWeight", null));
		this.define("fontStyle", textProperty(this, "fontStyle", "normal", _.isString));
		this.define("textDecoration", textProperty(this, "textDecoration", null, _.isString));
		this.define("fontSize", textProperty(this, "fontSize", null, _.isNumber, null, function(layer, value) {
			if ((value === null) || layer.__constructor) { return; }
			const style = LayerStyle["fontSize"](layer);
			return layer._styledText.setStyle("fontSize", style);
		})
		);
		this.define("textAlign", textProperty(this, "textAlign", null));
		this.define("letterSpacing", textProperty(this, "letterSpacing", null, _.isNumber));
		this.define("lineHeight", textProperty(this, "lineHeight", null, _.isNumber));
	
		//Custom properties
		this.define("wordSpacing", textProperty(this, "wordSpacing", null, _.isNumber));
		this.define("textTransform", textProperty(this, "textTransform", "none", _.isString));
		this.define("textIndent", textProperty(this, "textIndent", null, _.isNumber));
		this.define("wordWrap", textProperty(this, "wordWrap", null, _.isString));
	
		this.define("textOverflow", {
			get() { return this._styledText.textOverflow; },
			set(value) {
				this.clip = _.isString(value);
				this._styledText.setTextOverflow(value);
				return this.renderText(true);
			}
		}
		);
	
		this.define("truncate", {
			get() { return this.textOverflow === "ellipsis"; },
			set(truncate) {
				if (truncate) {
					this.autoSize = false;
					return this.textOverflow = "ellipsis";
				} else {
					return this.textOverflow = null;
				}
			}
		}
		);
	
		this.define("whiteSpace", textProperty(this, "whiteSpace", null, _.isString));
		this.define("direction", textProperty(this, "direction", null, _.isString));
	
		this.define("html", {
			get() {
				return (this._elementHTML != null ? this._elementHTML.innerHTML : undefined) || "";
			}
		}
		);
	
		this.define("font", layerProperty(this, "font", null, null, validateFont, null, {}, function(layer, value) {
			if (value === null) { return; }
			if (_.isObject(value)) {
				layer.fontFamily = value.fontFamily;
				layer.fontWeight = value.fontWeight;
				return;
			}
			// Check if value contains number. We then assume proper use of font.
			// Otherwise, we default to setting the fontFamily.
			if (/\d/.test(value)) {
				return layer._styledText.setStyle("font", value);
			} else {
				return layer.fontFamily = value;
			}
		}
		, "_elementHTML")
		);
	
		this.define("textDirection", {
			get() { return this.direction; },
			set(value) { return this.direction = value; }
		}
		);
	
		this.define("padding", layerProperty(this, "padding", "padding", 0, null, asPadding));
	
		this.define("text", {
			get() { return this._styledText.getText(); },
			set(value) {
				if (!_.isString(value)) { value = String(value); }
				this._styledText.setText(value);
				this.renderText();
				return this.emit("change:text", value);
			}
		}
		);
	
		// we remember the template data, and merge it with new data
		this.define("template", {
			get() { return _.clone(this._templateData); },
			set(data) {
				if (!this._templateData) { this._templateData = {}; }
	
				const firstName = this._styledText.buildTemplate();
				if (!_.isObject(data)) {
					if (!firstName) { return; }
					this._templateData[firstName] = data;
				} else {
					_.assign(this._templateData, data);
				}
	
				const oldText = this.text;
				this._styledText.template(this._templateData);
				if (this.text !== oldText) {
					this.renderText();
					return this.emit("change:text", this.text);
				}
			}
		}
		);
	
		this.define("templateFormatter", {
			get() { return this._templateFormatter; },
			set(data) {
				const firstName = this._styledText.buildTemplate();
				if (_.isFunction(data) || !_.isObject(data)) {
					if (!firstName) { return; }
					const tmp = {}; tmp[firstName] = data; data = tmp;
				}
				return this._styledText.templateFormatter(data);
			}
		}
		);
	}

	constructor(options) {
		let fontWeight, lineHeight;
		this.updateAutoWidth = this.updateAutoWidth.bind(this);
		this.updateAutoHeight = this.updateAutoHeight.bind(this);
		this.renderText = this.renderText.bind(this);
		if (options == null) { options = {}; }
		_.defaults(options, {
			shadowType: "text",
			clip: false,
			createHTMLElement: true
		}
		);
		if (options.styledTextOptions != null) {
			options.styledText = options.styledTextOptions;
			delete options.styledTextOptions;
		}
		if (options.styledText != null) {
			delete options.text;
			this.styledTextOptions = options.styledText;
			if (options.color == null) { options.color = this._styledText.getStyle("color"); }
			if (options.fontSize == null) { options.fontSize = parseFloat(this._styledText.getStyle("fontSize")); }
			if (options.fontFamily == null) { options.fontFamily = this._styledText.getStyle("fontFamily"); }
			if (options.letterSpacing == null) { options.letterSpacing = parseFloat(this._styledText.getStyle("letterSpacing")); }
			if (options.textAlign == null) { options.textAlign = this._styledText.textAlign; }
			fontWeight = this._styledText.getStyle("fontWeight");
			if (fontWeight != null) {
				options.fontWeight = parseFloat(fontWeight);
			}

			lineHeight = this._styledText.getStyle("lineHeight");
			if ((lineHeight == null) || (lineHeight === "normal")) {
				lineHeight = 1.25;
			} else {
				lineHeight = parseFloat(lineHeight);
			}
			if (options.lineHeight == null) { options.lineHeight = lineHeight; }
		} else {
			_.defaults(options, {
				backgroundColor: "transparent",
				text: "Hello World",
				color: "#888",
				fontSize: 40,
				fontWeight: 400,
				lineHeight: 1.25,
				padding: 0
			}
			);
			if ((options.font == null) && (options.fontFamily == null)) {
				options.fontFamily = this.defaultFont();
			}

			let {
                text
            } = options;
			if (!_.isString(text)) { text = String(text); }
			this._styledText.addBlock(text, {fontSize: `${options.fontSize}px`});
		}

		super(options);
		this.__constructor = true;

		// the goal is:
		// - autoSize elements should not soft wrap, only hard wrap (based on newlines)
		// - fixed (given a box) elements should soft wrap
		// - when the height is not fixed, it should be allowed to grow

		if (options.autoSize) {
			this.autoWidth = true;
			this.autoHeight = true;
		} else if ((options.autoSize !== false) && !options.truncate) {
			// if not explicitly disabled auto sizing, auto size width/height, unless they were explicitly set
			if ((options.autoWidth == null)) {
				const explicitWidth = (options.width != null) || _.isNumber(options.size) || ((options.size != null ? options.size.width : undefined) != null) || ((options.frame != null ? options.frame.width : undefined) != null);
				this.autoWidth = !explicitWidth;
			}
			if ((options.autoHeight == null)) {
				const explicitHeight = (options.height != null) || _.isNumber(options.size) || ((options.size != null ? options.size.height : undefined) != null) || ((options.frame != null ? options.frame.height : undefined) != null);
				this.autoHeight = !explicitHeight;
			}
		}

		// if constraints from design, autoHeight depends on if the element is allowed to grow in height
		const {
            constraintValues
        } = options;
		if (constraintValues) {
			const topAndBottom = _.isNumber(constraintValues.top) && _.isNumber(constraintValues.bottom);
			const heightFactor = _.isNumber(constraintValues.heightFactor);
			this.autoHeight = !(heightFactor || topAndBottom);
		}

		if ((options.styledText == null)) {
			if (this.font == null) { this.font = this.fontFamily; }
		}

		this._styledText.setElement(this._elementHTML);

		delete this.__constructor;

		this.renderText();

		// Executing function properties like Align.center again
		for (var key in options) {
			var value = options[key];
			if (_.isFunction(value) && (this[key] != null)) {
				this[key] = value;
			}
		}

		for (var property of Array.from(TextLayer._textStyleProperties)) {
			(property => {
				return this.on(`change:${property}`, value => {
					if (value === null) { return; }
					// make an exception for fontSize, as it needs to be set on the inner style
					if (!(["fontSize", "font"].includes(property))) {
						this._styledText.resetStyle(property);
					}
					return this.renderText();
				});
			})(property);
		}

		this.on("change:width", this.updateAutoWidth);
		this.on("change:height", this.updateAutoHeight);
		this.on("change:parent", this.renderText);
	}

	updateAutoWidth(value) {
		if (this.disableAutosizeUpdating) { return; }
		return this.autoWidth = false;
	}

	updateAutoHeight(value) {
		if (this.disableAutosizeUpdating) { return; }
		return this.autoHeight = false;
	}

	copySingle() {
		const {
            props
        } = this;
		if (this.autoWidth) { delete props["width"]; }
		if (this.autoHeight) { delete props["height"]; }
		const copy = new this.constructor(props);
		copy.style = this.style;
		return copy;
	}

	renderText(forceRender) {
		let constrainedHeight, constrainedWidth;
		if (forceRender == null) { forceRender = false; }
		if (this.__constructor) { return; }
		this._styledText.render();
		this._updateHTMLScale();
		if (!this.autoSize) {
			if ((this.width < this._elementHTML.clientWidth) || (this.height < this._elementHTML.clientHeight)) {
				this.clip = true;
			}
		}
		if (!forceRender && !this.autoHeight && !this.autoWidth && (this.textOverflow === null)) { return; }
		const padding = Utils.rectZero(Utils.parseRect(this.padding));
		if (this.autoWidth) {
			constrainedWidth = null;
		} else {
			constrainedWidth = this.size.width - (padding.left + padding.right);
		}
		if (this.autoHeight) {
			constrainedHeight = null;
		} else {
			constrainedHeight = this.size.height - (padding.top + padding.bottom);
		}
		const constraints = {
			width: constrainedWidth,
			height: constrainedHeight,
			multiplier: this.context.pixelMultiplier
		};

		const calculatedSize = this._styledText.measure(constraints);
		this.disableAutosizeUpdating = true;
		if (calculatedSize.width != null) {
			this.width = calculatedSize.width + padding.left + padding.right;
		}
		if (calculatedSize.height != null) {
			this.height = calculatedSize.height + padding.top + padding.bottom;
		}
		return this.disableAutosizeUpdating = false;
	}

	defaultFont() {
		return Utils.deviceFont(Framer.Device.platform());
	}

	textReplace(search, replace) {
		const oldText = this.text;
		this._styledText.textReplace(search, replace);
		if (this.text !== oldText) {
			this.renderText();
			return this.emit("change:text", this.text);
		}
	}
});
Cls.initClass();
