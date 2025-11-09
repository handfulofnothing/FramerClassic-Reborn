/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Layer, layerProperty} = require("./Layer");
const {Color} = require("./Color");
const {SVGBaseLayer} = require("./SVGBaseLayer");
const {SVG} = require("./SVG");

const dasharrayTransform = function(value) {
	if (_.isString(value)) {
		let values = [];
		if (value.indexOf(",") !== -1) {
			values = value.split(',');
		} else {
			values = value.split(" ");
		}
		values = values.map(v => v.trim())
						.filter(v => v.length > 0)
						.map(v => parseFloat(v));
		return values;
	}
	return value;
};

const dashoffsetTransform = function(value) {
	const v = parseFloat(value);
	if (isNaN(v)) {
		return null;
	}
	return v;
};

const Cls = (exports.SVGPath = class SVGPath extends SVGBaseLayer {
	static initClass() {
	
		// Custom properties
		this.define("fill", layerProperty(this, "fill", "fill", null, SVG.validFill, SVG.toFill));
		this.define("stroke", layerProperty(this, "stroke", "stroke", null, SVG.validFill, SVG.toFill));
		this.define("strokeWidth", layerProperty(this, "strokeWidth", "strokeWidth", null, _.isNumber, parseFloat));
		this.define("strokeLinecap", layerProperty(this, "strokeLinecap", "strokeLinecap", null, _.isString));
		this.define("strokeLinejoin", layerProperty(this, "strokeLinejoin", "strokeLinejoin", null, _.isString));
		this.define("strokeMiterlimit", layerProperty(this, "strokeMiterlimit", "strokeMiterlimit", null, _.isNumber, parseFloat));
		this.define("strokeOpacity", layerProperty(this, "strokeOpacity", "strokeOpacity", null, _.isNumber, parseFloat));
		this.define("strokeDasharray", layerProperty(this, "strokeDasharray", "strokeDasharray", [], _.isArray, dasharrayTransform));
		this.define("strokeDashoffset", layerProperty(this, "strokeDashoffset", "strokeDashoffset", null, _.isNumber, dashoffsetTransform));
		this.define("strokeLength", layerProperty(this, "strokeLength", null, undefined, _.isNumber, ((value, path) => Math.max(0, Math.min(value, path.length))), {}, function(path, value) {
			const strokeStart = path.strokeStart != null ? path.strokeStart : 0;
			let strokeEnd = strokeStart + value;
			if (strokeEnd > path.length) {
				strokeEnd -= path.length;
			}
			path._properties.strokeStart = strokeStart;
			path._properties.strokeEnd = strokeEnd;
			path._properties.strokeFraction = value / path.length;
			return path.updateStroke();
		})
		);
	
		this.define("strokeFraction", layerProperty(this, "strokeFraction", null, undefined, _.isNumber, ((value, path) => Math.max(0, Math.min(value, 1))), {}, (path, value) => path.strokeLength = path.length * value)
		);
	
		this.define("strokeStart", layerProperty(this, "strokeStart", null, undefined, _.isNumber, ((value, path) => Math.max(0, Math.min(value, path.length))), {}, function(path, value) {
			let left;
			const strokeStart = value;
			const strokeEnd = (left = path.strokeEnd != null ? path.strokeEnd : path.strokeLength) != null ? left : path.length;
			if (strokeEnd >= strokeStart) {
				return path.strokeLength = strokeEnd - strokeStart;
			} else {
				return path.strokeLength = (path.length - strokeStart) + strokeEnd;
			}
		})
		);
	
		this.define("strokeEnd", layerProperty(this, "strokeEnd", null, undefined, _.isNumber, ((value, path) => Math.max(0, Math.min(value, path.length))), {}, function(path, value) {
			const strokeStart = path.strokeStart != null ? path.strokeStart : 0;
			const strokeEnd = value;
			if (strokeEnd >= strokeStart) {
				return path.strokeLength = strokeEnd - strokeStart;
			} else {
				return path.strokeLength = (path.length - strokeStart) + strokeEnd;
			}
		})
		);
	
		this.define("length", {get() { return this._length; }});
	
		this.define("reversed", this.simpleProperty("reversed", false));
	}
	constructor(path, options) {

		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
		this.valueUpdater = this.valueUpdater.bind(this);
		if (path instanceof SVGPath) {
			path = path.element;
		}

		options.element = path;
		super(options);

		if (path instanceof SVGPathElement) {
			this._path = path;
		} else if (path instanceof SVGUseElement) {
			const link = path.getAttribute("xlink:href");
			this._path = this._svg.querySelector(link);
		}
		this._length = this._path.getTotalLength();
	}

	updateStroke() {
		let length, remaining;
		const startLength = this.strokeStart != null ? this.strokeStart : 0;
		const endLength = this.strokeEnd != null ? this.strokeEnd : this.length;
		const dasharray = [];
		if (endLength === startLength) {
			if (startLength !== 0) {
				dasharray.push(0);
				dasharray.push(startLength);
			}
			remaining = this.length - endLength;
			if (remaining !== 0) {
				dasharray.push(0);
				dasharray.push(remaining);
			}
		} else if (endLength < startLength) {
			const gap = startLength - endLength;
			remaining = this.length - startLength;
			dasharray.push(endLength);
			dasharray.push(gap);
			if (remaining !== 0) {
				dasharray.push(remaining);
				dasharray.push(0);
			}
		} else {
			length = endLength - startLength;
			remaining = this.length - endLength;
			if (startLength !== 0) {
				dasharray.push(0);
				dasharray.push(startLength);
			}
			if ((length !== this.length) && ((length !== 0) || (startLength === 0))) {
				dasharray.push(length);
				if ((length !== remaining) && (remaining !== 0)) {
					dasharray.push(remaining);
				}
			}
		}
		if (this.reversed) {
			if ((dasharray.length % 2) === 0) {
				dasharray.push(0);
			}
			dasharray.reverse();
		}
		return this.strokeDasharray = dasharray;
	}

	pointAtFraction(fraction) {
		if (this.reversed) {
			fraction = 1 - fraction;
		}
		return this._path.getPointAtLength(this.length * fraction);
	}

	rotationAtFraction(fraction, delta) {
		if (delta == null) { delta = 0.01; }
		if (this.reversed) {
			fraction = 1 - fraction;
		}
		if (delta <= 0) {
			delta = 0.01;
		}
		const fromPoint = this.pointAtFraction(Math.max(fraction - delta, 0));
		const toPoint = this.pointAtFraction(Math.min(fraction + delta, 1));
		let angle = ((Math.atan2(fromPoint.y - toPoint.y, fromPoint.x - toPoint.x) * 180) / Math.PI) - 90;
		if (this.reversed) {
			angle = 360 - angle;
		}
		return angle;
	}

	start(relativeToLayer = null) {
		let point = this.pointAtFraction(0);
		point = this.convertPointToLayer(point, relativeToLayer != null ? relativeToLayer.parent : undefined, false);
		point.rotation = this.rotationAtFraction(0);
		return point;
	}

	end(relativeToLayer = null) {
		let point = this.pointAtFraction(0);
		point = this.convertPointToLayer(point, relativeToLayer != null ? relativeToLayer.parent : undefined, false);
		point.rotation = this.rotationAtFraction(1);
		return point;
	}


	valueUpdater(axis, target, offset) {
		switch (axis) {
			case "horizontal":
				offset -= this.pointAtFraction(0).x;
				return (key, value) => {
					return target[key] = offset + this.pointAtFraction(value).x;
				};
			case "vertical":
				offset -= this.pointAtFraction(0).y;
				return (key, value) => {
					return target[key] = offset + this.pointAtFraction(value).y;
				};
			case "angle":
				offset -= this.rotationAtFraction(0);
				return (key, value, delta) => {
					if (delta == null) { delta = 0; }
					if (delta === 0) { return; }
					return target[key] = offset + this.rotationAtFraction(value, delta);
				};
		}
	}
});
Cls.initClass();
