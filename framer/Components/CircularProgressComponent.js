/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Layer} = require("../Layer");

const Cls = (exports.CircularProgressComponent = class CircularProgressComponent extends Layer {
	static initClass() {
	
		this.define("radius",
			{get() { return (this.width / 2) - (this.strokeWidth / 2); }});
	
		this.define("strokeWidth", {
			get() { return this._strokeWidth || 1; },
			set(value) {
				
				this._strokeWidth = value;
				
				this.rails.cx.baseVal.value = this.width / 2;
				this.rails.cy.baseVal.value = this.width / 2;
				this.rails.r.baseVal.value = this.radius;
				this.rails.setAttribute("stroke-width", value);
				
				this.circle.cx.baseVal.value = this.width / 2;
				this.circle.cy.baseVal.value = this.width / 2;
				this.circle.r.baseVal.value = this.radius;
				return this.circle.setAttribute("stroke-width", value);
			}
		}
		);
	
		this.define("progressColor", {
			get() { return this._progressColor || Color.grey(1); },
			set(value) { return this.circle.setAttribute("stroke", value); }
		}
		);
	
		this.define("railsColor", {
			get() { return this._progressColor || Color.grey(.1); },
			set(value) { return this.rails.setAttribute("stroke", value); }
		}
		);
		
		this.define("progress", {
			get() { return this._progress || 0; },
			set(value) {
				this._progress = Utils.clamp(value, 0, 1);
				const strokeDashArray = (this.radius * Math.PI * 2);
				const strokeDashOffset = (1 - this.progress) * strokeDashArray;
				this.circle.setAttribute("stroke-dasharray", strokeDashArray);
				return this.circle.setAttribute("stroke-dashoffset", strokeDashOffset);
			}
		}
		);
	}
	
	constructor(options) {
		if (options == null) { options = {}; }
		super(...arguments);
		
		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.svg.setAttribute("width", "100%");
		this.svg.setAttribute("height", "100%");
		this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

		this.backgroundColor = null;
		this.rotation = -90;
		
		this.rails = this.addShape("circle");
		this.rails.setAttribute("fill", "transparent");
		this.circle = this.addShape("circle");
		this.circle.setAttribute("fill", "transparent");
		
		this.strokeWidth = 1;
		this.progress = 0;
		
		this.railsColor = Color.grey(.2);
		this.progressColor = Color.grey(1);
		
		this._element.appendChild(this.svg);
	}

	addShape(type) {
		const shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.svg.appendChild(shape);
		return shape;
	}

	setProgress(value, animated, animationOptions) {
		if (animated == null) { animated = true; }
		if (animationOptions == null) { animationOptions = {}; }
		if (!animated) { return this.progress = value; }

		// If no time was given we use a dynamic time based on the relative distance
		// to animate based on the progress delta. The full circle time is 0.3 by default.
		const dynamicTime = Math.abs(this.progress - value) * 0.3;

		animationOptions = _.defaults(animationOptions, {
			curve: "linear",
			time: dynamicTime
		}
		);

		const animationProperties =
			{progress: Utils.clamp(value, 0, 1)};

		return this.animate(animationProperties, animationOptions);
	}
});
Cls.initClass();
