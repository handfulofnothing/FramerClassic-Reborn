/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * DS104: Avoid inline assignments
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
let _measureElement = null;


const getMeasureElement = function(constraints) {
	if (constraints == null) { constraints = {}; }
	const shouldCreateElement = !_measureElement;
	if (shouldCreateElement) {
		_measureElement = document.createElement("div");
		_measureElement.id = "_measureElement";
		_measureElement.style.position = "fixed";
		_measureElement.style.visibility = "hidden";
		_measureElement.style.top = "-10000px";
		_measureElement.style.left = "-10000px";

		// This is a trick to call this function before the document ready event
		if (!window.document.body) {
			document.write(_measureElement.outerHTML);
			_measureElement = document.getElementById("_measureElement");
		} else {
			window.document.body.appendChild(_measureElement);
		}
	}

	while (_measureElement.hasChildNodes()) {
		_measureElement.removeChild(_measureElement.lastChild);
	}

	_measureElement.style.width = "10000px";
	if (constraints.max) {
		if (constraints.width) { _measureElement.style.maxWidth = `${constraints.width}px`; }
		if (constraints.height) { _measureElement.style.maxHeight = `${constraints.height}px`; }
	} else {
		if (constraints.width) { _measureElement.style.width = `${constraints.width}px`; }
		if (constraints.height) { _measureElement.style.height = `${constraints.height}px`; }
	}

	return _measureElement;
};

class InlineStyle {
	static initClass() {
		this.prototype.startIndex = 0;
		this.prototype.endIndex = 0;
		this.prototype.css = null;
		this.prototype.text = "";
		this.prototype.element = null;
	}

	constructor(configuration, text) {
		if (_.isString(configuration)) {
			this.text = configuration;
			this.startIndex = 0;
			this.endIndex = this.text.length;
			this.css = text;
		} else {
			this.startIndex = configuration.startIndex;
			this.endIndex = configuration.endIndex;
			this.css = configuration.css;
			this.text = text.substring(this.startIndex, this.endIndex);
		}
	}

	copy() {
		const c = new InlineStyle(this.text, this.css);
		c.startIndex = this.startIndex;
		c.endIndex = this.endIndex;
		return c;
	}

	getOptions() {
		return {
			startIndex: this.startIndex,
			endIndex: this.endIndex,
			css: _.clone(this.css)
		};
	}

	createElement(maybeLineBreak) {
		const span = document.createElement("span");
		for (var prop in this.css) {
			var value = this.css[prop];
			span.style[prop] = value;
		}
		if ((this.text === "") && maybeLineBreak) {
			span.innerHTML = "<br/>";
		} else {
			span.textContent = this.text;
		}
		return span;
	}

	setText(text) {
		this.text = text;
		return this.endIndex = this.startIndex + text.length;
	}

	resetStyle(style) {
		delete this.css[style];
		if (style === "color") {
			return delete this.css["WebkitTextFillColor"];
		}
	}

	setStyle(style, value) {
		this.css[style] = value;
		return (this.element != null ? this.element.style[style] = value : undefined);
	}

	getStyle(style) {
		if (style === "color") {
			return this.css["color"] != null ? this.css["color"] : this.css["WebkitTextFillColor"];
		}
		return this.css[style];
	}

	measure() {
		const rect = this.element.getBoundingClientRect();
		const size = {
			width: rect.right - rect.left,
			height: rect.bottom - rect.top
		};
		return size;
	}

	replaceText(search, replace) {
		let regex = null;
		if (_.isString(search)) {
			regex = new RegExp(Utils.escapeForRegex(search), 'g');
		} else if (search instanceof RegExp) {
			regex = search;
		}
		if (regex != null) {
			this.text = this.text.replace(regex, replace);
			return this.endIndex = this.startIndex + this.text.length;
		}
	}

	addRangesFrom(regex, block, inline, templateRanges) {
		const {
            text
        } = this;
		regex.lastIndex = 0;
		while (true) {
			var m = regex.exec(text);
			if (!m) { return; }
			var name = m[1];
			if (!name) { return; }
			if (templateRanges[name]) { continue; }
			templateRanges[name] = {block, inline, start: m.index, length: m[0].length, name};
		}
	}

	replaceRange(start, length, text) {
		this.text = this.text.slice(0, start) + text + this.text.slice(start + length);
		return this.endIndex = this.startIndex + this.text.length;
	}

	validate() {
		return (this.startIndex !== this.endIndex) && (this.endIndex === (this.startIndex + this.text.length));
	}
}
InlineStyle.initClass();

class StyledTextBlock {
	static initClass() {
		this.prototype.text = "";
		this.prototype.inlineStyles = [];
		this.prototype.element = null;
	}

	constructor(configuration) {
		const {
            text
        } = configuration;
		this.text = text;
		if (configuration.inlineStyles != null) {
			this.inlineStyles = configuration.inlineStyles.map(i => new InlineStyle(i, text));
		} else if (configuration.css != null) {
			const inlineStyle = new InlineStyle(this.text, configuration.css);
			this.inlineStyles = [inlineStyle];
		} else {
			throw new Error("Should specify inlineStyles or css");
		}
	}

	copy() {
		const c = new StyledTextBlock({text: this.text, inlineStyles: []});
		c.inlineStyles = this.inlineStyles.map(inline => inline.copy());
		return c;
	}

	getOptions() {
		return {
			text: this.text,
			inlineStyles: this.inlineStyles.map(i => i.getOptions())
		};
	}

	createElement() {
		const div = document.createElement("div");
		div.style.fontSize = "1px";
		div.style.webkitFontSmoothing = "antialiased";
		const maybeLineBreak = this.inlineStyles.length === 1;
		for (var style of Array.from(this.inlineStyles)) {
			var span = style.createElement(maybeLineBreak);
			style.element = span;
			div.appendChild(span);
		}
		return div;
	}

	measure() {
		let totalWidth = 0;
		for (var style of Array.from(this.inlineStyles)) {
			totalWidth += style.measure().width;
		}
		const rect = this.element.getBoundingClientRect();
		const size = {
			width: totalWidth,
			height: rect.bottom - rect.top
		};
		return size;
	}

	clone() {
		return new StyledTextBlock({
			text: "",
			css: _.clone(_.first(this.inlineStyles).css)
		});
	}

	setText(text) {
		this.text = text;
		const firstStyle = _.first(this.inlineStyles);
		firstStyle.setText(text);
		return this.inlineStyles = [firstStyle];
	}

	setTextOverflow(textOverflow, maxLines) {
		if (maxLines == null) { maxLines = 1; }
		if (["ellipsis", "clip"].includes(textOverflow)) {
			this.setStyle("overflow", "hidden");

			const multiLineOverflow = textOverflow === "ellipsis";
			if (multiLineOverflow) {
				this.setStyle("WebkitLineClamp", maxLines);
				this.setStyle("WebkitBoxOrient", "vertical");
				return this.setStyle("display", "-webkit-box");
			} else {
				this.resetStyle("WebkitLineClamp");
				this.resetStyle("WebkitBoxOrient");
				this.setStyle("display", "block");
				this.setStyle("whiteSpace", "nowrap");
				return this.setStyle("textOverflow", textOverflow);
			}
		} else {
			this.resetStyle("whiteSpace");
			this.resetStyle("textOverflow");

			this.resetStyle("display");
			this.resetStyle("overflow");
			this.resetStyle("WebkitLineClamp");
			return this.resetStyle("WebkitBoxOrient");
		}
	}

	resetStyle(style) {
		return this.inlineStyles.map(inlineStyle => inlineStyle.resetStyle(style));
	}

	setStyle(style, value) {
		return this.inlineStyles.map(inlineStyle => inlineStyle.setStyle(style, value));
	}

	getStyle(style) {
		return _.first(this.inlineStyles).getStyle(style);
	}

	getFonts() {
		const fonts = [];
		for (var style of Array.from(this.inlineStyles)) {
			var font = style.getStyle("fontFamily");
			if (font != null) {
				fonts.push(font);
			}
		}
		return fonts;
	}

	replaceText(search, replace) {
		let currentIndex = 0;
		for (var style of Array.from(this.inlineStyles)) {
			style.startIndex = currentIndex;
			style.replaceText(search, replace);
			currentIndex = style.endIndex;
		}
		const newText = this.inlineStyles.map(i => i.text).join('');
		this.text = newText;
		return newText !== this.text;
	}

	addRangesFrom(regex, block, templateRanges) {
		return this.inlineStyles.forEach((inline, index) => inline.addRangesFrom(regex, block, index, templateRanges));
	}

	replaceRange(inline, start, length, text) {
		let currentIndex = 0;
		for (let index = 0; index < this.inlineStyles.length; index++) {
			var style = this.inlineStyles[index];
			style.startIndex = currentIndex;
			if (index === inline) { style.replaceRange(start, length, text); }
			currentIndex += style.text.length;
			style.endIndex = currentIndex;
		}
		const newText = this.inlineStyles.map(i => i.text).join('');
		return this.text = newText;
	}

	validate() {
		let combinedText = '';
		let currentIndex = 0;
		for (var style of Array.from(this.inlineStyles)) {
			if (!(currentIndex === style.startIndex)) { return false; }
			if (!style.validate()) { return false; }
			currentIndex = style.endIndex;
			combinedText += style.text;
		}
		return this.text === combinedText;
	}
}
StyledTextBlock.initClass();

const Cls = (exports.StyledText = class StyledText {
	static initClass() {
		this.prototype.blocks = null;
		this.prototype.textAlign = null;
		this.prototype.element = null;
		this.prototype.autoWidth = false;
		this.prototype.autoHeight = false;
		this.prototype.textOverflow = null;
	
		this.defaultStyles = {
			fontStyle: "normal",
			fontVariantCaps: "normal",
			fontWeight: "normal",
			fontSize: "16px",
			lineHeight: "normal",
			fontFamily: "-apple-system, BlinkMacSystemFont",
			outline: "none",
			whiteSpace: "pre-wrap",
			wordWrap: "break-word"
		};
	}

	constructor(configuration) {
		this.textAlign = (configuration != null ? configuration.alignment : undefined) != null ? (configuration != null ? configuration.alignment : undefined) : "left";
		if ((configuration != null ? configuration.blocks : undefined) != null) {
			this.blocks = configuration.blocks.map(b => new StyledTextBlock(b));
		} else {
			this.blocks = [];
		}
	}

	getOptions() {
		return {
			blocks: this.blocks.map(b => b.getOptions()),
			alignment: this.textAlign
		};
	}

	static isStyledText(styledText) {
		return ((styledText != null ? styledText.blocks : undefined) != null) && ((styledText != null ? styledText.alignment : undefined) != null) && _.isArray(styledText.blocks) && _.isString(styledText.alignment);
	}

	setElement(element) {
		let style;
		if ((element == null)) { return; }
		this.element = element;
		for (style in StyledText.defaultStyles) {
			var value = StyledText.defaultStyles[style];
			if (!this.element.style[style]) {
				this.element.style[style] = value;
			}
		}
		if ((this.textAlign != null) && !this.element.style["textAlign"]) {
			return this.element.style["textAlign"] = this.textAlign;
		}
	}

	render() {
		if ((this.element == null)) { return; }

		while (this.element.hasChildNodes()) {
			this.element.removeChild(this.element.lastChild);
		}

		return (() => {
			const result = [];
			for (var block of Array.from(this.blocks)) {
				var blockDiv = block.createElement();
				block.element = blockDiv;
				result.push(this.element.appendChild(blockDiv));
			}
			return result;
		})();
	}

	addBlock(text, css = null) {
		let block;
		if (css != null) {
			block = new StyledTextBlock({
				text,
				css
			});
		} else if (this.blocks.length > 0) {
			block = _.last(this.blocks).clone();
			block.setText(text);
		} else {
			block = new StyledTextBlock({
				text,
				css: {}});
		}

		return this.blocks.push(block);
	}

	getText() {
		return this.blocks.map(b => b.text).join("\n");
	}

	setText(text) {
		const values = text.split("\n");
		this.blocks = this.blocks.slice(0, values.length);
		return (() => {
			const result = [];
			for (let index = 0; index < values.length; index++) {
				var value = values[index];
				if (this.blocks[index] != null) {
					var block = this.blocks[index];
					result.push(block.setText(value));
				} else {
					result.push(this.addBlock(value));
				}
			}
			return result;
		})();
	}

	setTextOverflow(textOverflow) {
		return this.textOverflow = textOverflow;
	}

	setStyle(style, value) {
		return this.blocks.map(block => block.setStyle(style, value));
	}

	resetStyle(style) {
		return this.blocks.map(block => block.resetStyle(style));
	}

	getStyle(style, block=null) {
		let left;
		return (left = __guard__((block != null ? block : _.first(this.blocks)), x => x.getStyle(style))) != null ? left : (this.element != null ? this.element.style[style] : undefined);
	}

	getFonts() {
		let fonts = [];
		const elementFont = this.element != null ? this.element.style["fontFamily"] : undefined;
		if (elementFont != null) {
			fonts.push(elementFont);
		}
		for (var block of Array.from(this.blocks)) {
			fonts = fonts.concat(block.getFonts());
		}
		return _.uniq(fonts);
	}

	measure(currentSize) {
		const constraints = {};
		constraints.width = currentSize.width * currentSize.multiplier;
		constraints.height = currentSize.height * currentSize.multiplier;
		const m = getMeasureElement(constraints);
		let measuredWidth = 0;
		let measuredHeight = 0;
		const parent = this.element.parentNode;
		m.appendChild(this.element);
		for (var block of Array.from(this.blocks)) {
			var size = block.measure();
			measuredWidth = Math.max(measuredWidth, size.width);
			var constrainedHeight = (constraints.height != null) ? constraints.height / currentSize.multiplier : null;
			if  (!this.autoWidth &&
				(this.textOverflow != null) && ["clip", "ellipsis"].includes(this.textOverflow) &&
				(constrainedHeight != null) && ((measuredHeight + size.height) > constrainedHeight)) {
					var fontSize = parseFloat(this.getStyle("fontSize", block));
					var lineHeight = parseFloat(this.getStyle("lineHeight", block));
					var availableHeight = constrainedHeight - measuredHeight;
					if (availableHeight > 0) {
						var visibleLines = Math.max(1, Math.floor(availableHeight / (fontSize*lineHeight)));
						block.setTextOverflow(this.textOverflow, visibleLines);
					} else {
						block.setStyle("visibility", "hidden");
					}
					size.height = availableHeight;
			} else {
				block.setTextOverflow(null);
			}
			measuredHeight += size.height;
		}

		m.removeChild(this.element);
		if (parent != null) {
			parent.appendChild(this.element);
		}
		const result = {};
		if (this.autoWidth) {
			result.width = Math.ceil(measuredWidth);
		}
		if (this.autoHeight) {
			result.height = Math.ceil(measuredHeight);
		}
		return result;
	}

	textReplace(search, replace) {
		return this.blocks.map( b => b.replaceText(search, replace));
	}

	// must be called first, calling it repeatedly does nothing, returns the first name from the templates
	buildTemplate() {
		if (this._templateRanges) { return this._firstTemplateName; }

		// find all "{name}"" text ranges, building a name->{blocks.index,inlines.index,start,length,start} index
		const regex = /\{\s*(\w+)\s*\}/g;
		const templateRanges = {};
		this.blocks.forEach((b, index) => b.addRangesFrom(regex, index, templateRanges));

		// turn that into a reverse sorted list of ranges
		this._templateRanges = Object.keys(templateRanges).map(k => templateRanges[k]).sort(function(l, r) {
			const b = r.block - l.block;
			if (b !== 0) { return b; }
			const i = r.inline - l.inline;
			if (i !== 0) { return i; }
			return r.start - l.start;
		});
		const firstRange = this._templateRanges[this._templateRanges.length - 1];
		this._firstTemplateName = firstRange ? firstRange.name : null;

		// we store the initial template data, so template() can be called more than once
		this._templateBlocks = this.blocks.map(b => b.copy());
		return this._firstTemplateName;
	}

	template(data) {
		// restore the original template
		this.blocks = this._templateBlocks.map(b => b.copy());

		// replace all ranges that are in data; @_templateRanges is reverse sorted, so ranges stay valid throughout
		return (() => {
			const result = [];
			for (var range of Array.from(this._templateRanges)) {
				var text = data[range.name];
				if (text == null) { continue; }
				if (_.isFunction(range.formatter)) { text = range.formatter.call(this, text); }
				var block = this.blocks[range.block];
				result.push(block.replaceRange(range.inline, range.start, range.length, text));
			}
			return result;
		})();
	}

	templateFormatter(data) {
		return (() => {
			const result = [];
			for (var range of Array.from(this._templateRanges)) {
				var formatter = data[range.name];
				if (formatter == null) { continue; }
				result.push(range.formatter = formatter);
			}
			return result;
		})();
	}

	validate() {
		for (var block of Array.from(this.blocks)) {
			if (!block.validate()) { return false; }
		}
		return true;
	}
});
Cls.initClass();

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}