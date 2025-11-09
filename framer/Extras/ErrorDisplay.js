/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("../Utils");

const {BaseClass} = require("../BaseClass");
const {Context} = require("../Context");
const {Layer} = require("../Layer");

const _error = null;
const _context = null;

const Config = {};

if (Utils.isMobile()) {
	Config.height = 100;
	Config.textInset = 20;
	Config.fontSize = 32;
} else {
	Config.height = 40;
	Config.textInset = 12;
	Config.fontSize = 14;
}


class ErrorDisplay extends BaseClass {

	constructor() {

		this.resize = this.resize.bind(this);
		if (this._context == null) { this._context = new Context({name: "ErrorDisplay"}); }
		this._context.index = 1000;

		this._context.run(() => {

			Events.wrap(window).addEventListener("error", e => {
				return this.showError(e.message);
			});

			return Events.wrap(window).addEventListener("resize", e => {
				return this.resize();
			});
		});
	}

	createLayer() {

		if (this._errorLayer) { return this._errorLayer; }

		this._context.run(() => {

			const error = new Layer({
				name: "error",
				y: Align.bottom,
				width: Canvas.width,
				height: Config.height,
				backgroundColor: "rgba(255, 0, 0, 1)"
			});

			error.text = new Layer({
				name: "text",
				parent: error,
				size: Utils.frameInset(error, Config.textInset),
				point: Align.center,
				backgroundColor: null,
				clip: true
			});

			error.text.style = {
				font: `${Config.fontSize}px/1em ${Utils.deviceFont()}`,
				lineHeight: `${parseInt(error.text.height - 2)}px`,
				textAlign: "center",
				wordWrap: "break-word",
				textOverflow: "ellipsis"
			};

			error.onTap(() => {
				if (this._errorLayer != null) {
					this._errorLayer.destroy();
				}
				return this._errorLayer = null;
			});

			this._errorLayer = error;
			return this.resize();
		});

		return this._errorLayer;
	}

	resize() {
		if (!this._errorLayer) { return; }
		this._errorLayer.width = Canvas.width;
		this._errorLayer.y = Canvas.height - this._errorLayer.height;
		this._errorLayer.text.size = Utils.frameInset(this._errorLayer, Config.textInset);
		return this._errorLayer.text.point = Align.center;
	}

	showError(message) {

		let animation;
		const error = this.createLayer();
		error.scale = 1.1;
		error.text.html = message;

		return animation = error.animate({
			scale: 1,
			options: {
				curve: "spring(800, 55, 10)"
			}
		});
	}

	destroy() {
		return (this._context != null ? this._context.destroy() : undefined);
	}
}

let _errorDisplay = null;

exports.enable = function() {
	if (_errorDisplay) { return; }
	return _errorDisplay = new ErrorDisplay;
};

exports.disable = function() {
	if (!_errorDisplay) { return; }
	_errorDisplay.destroy();
	return _errorDisplay = null;
};
