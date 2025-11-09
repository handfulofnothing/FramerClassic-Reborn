/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("../Utils");

exports.enable = function() {

	// If we touch the document directly we want to ignore scroll events
	document.ontouchmove = function(event) {
		if (event.target === document.body) {
			return event.preventDefault();
		}
	};


	// The second part is that when we scroll a div that is already at it's top
	// scroll position the scroll event will propagate up and enable elastic scrolling.

	const handleScrollingLayerTouchMove = event => event.stopPropagation();

	const handleScrollingLayerTouchStart = function(event) {

		const element = this._element;

		const startTopScroll = element.scrollTop;

		if (startTopScroll <= 0) {
			element.scrollTop = 1;
		}

		if ((startTopScroll + element.offsetHeight) >= element.scrollHeight) {
			return element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
		}
	};


	class MobileScrollFixLayer extends Framer.Layer {

		constructor(options) {
			this._updateScrollListeners = this._updateScrollListeners.bind(this);
			super(options);

			// Only do this for bare layers, it messes with the
			// Scroll and Page Component for now.
			if (this.constructor.name === "Layer") {
				this.on("change:scrollVertical", this._updateScrollListeners);
				this._updateScrollListeners();
			}
		}

		_updateScrollListeners() {

			if (this.scrollVertical === true) {
				this.on("touchmove", handleScrollingLayerTouchMove);
				return this.on("touchstart", handleScrollingLayerTouchStart);
			} else {
				this.off("touchmove", handleScrollingLayerTouchMove);
				return this.off("touchstart", handleScrollingLayerTouchStart);
			}
		}

		toInspect() {
			if (this.constructor.name === "MobileScrollFixLayer") {
				return super.toInspect("Layer");
			} else {
				return super.toInspect(...arguments);
			}
		}
	}


	// Override the standard window Layer with this patched one
	return window.Layer = (window.Framer.Layer = MobileScrollFixLayer);
};
