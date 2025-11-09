/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Utils = require("../Utils");
const {BaseClass} = require("../BaseClass");

const createTouch = function(event, identifier, offset) {
	if (offset == null) { offset = {x: 0, y: 0}; }
	const touch = {
		identifier,
		target: event.target,
		pageX: event.pageX - offset.x,
		pageY: event.pageY - offset.y,
		clientX: event.clientX - offset.x,
		clientY: event.clientY - offset.y,
		screenX: event.screenX - offset.x,
		screenY: event.screenY - offset.y
	};
	touch.point = {
		x: touch.pageX,
		y: touch.pageY
	};
	return touch;
};

const dispatchTouchEvent = function(type, target, event, offset) {

	if (target == null) { ({
        target
    } = event); }

	const touchEvent = document.createEvent("MouseEvent");
	touchEvent.initMouseEvent(type, true, true, window,
		event.detail, event.screenX, event.screenY,
		event.clientX, event.clientY,
		event.ctrlKey, event.shiftKey, event.altKey, event.metaKey,
		event.button, event.relatedTarget);

	const touches = [];
	touches.push(createTouch(event, 1));
	if (offset) { touches.push(createTouch(event, 2, offset)); }

	touchEvent.touches = (touchEvent.changedTouches = (touchEvent.targetTouches = touches));

	return target.dispatchEvent(touchEvent);
};

const cancelEvent = function(event) {
	event.preventDefault();
	return event.stopPropagation();
};

class TouchEmulator extends BaseClass {

	constructor() {

		this.keydown = this.keydown.bind(this);
		this.keyup = this.keyup.bind(this);
		this.mousedown = this.mousedown.bind(this);
		this.mousemove = this.mousemove.bind(this);
		this.mouseup = this.mouseup.bind(this);
		this.mouseout = this.mouseout.bind(this);
		this.mousemovePosition = this.mousemovePosition.bind(this);
		this.touchPointerImage = "url('framer/images/cursor@2x.png')";
		this.touchPointerImageActive = "url('framer/images/cursor-active@2x.png')";
		this.touchPointerImageSize = 64;
		this.touchPointerInitialOffset = {x: 0, y: 0};

		this.keyPinchCode = 18; // Alt
		this.keyPanCode = 91; // Command

		this.context = new Framer.Context({name: "TouchEmulator"});
		this.context._element.style.zIndex = 10000;
		this.wrap = this.context.domEventManager.wrap;

		this.wrap(document).addEventListener("mousedown", this.mousedown, true);
		this.wrap(document).addEventListener("mousemove", this.mousemove, true);
		this.wrap(document).addEventListener("mouseup", this.mouseup, true);
		this.wrap(document).addEventListener("keydown", this.keydown, true);
		this.wrap(document).addEventListener("keyup", this.keyup, true);
		this.wrap(document).addEventListener("mouseout", this.mouseout, true);

		this.isMouseDown = false;
		this.isPinchKeyDown = false;
		this.isPanKeyDown = false;

		const {
            touchPointerInitialOffset
        } = this;

		this.context.run(() => {
			this.touchPointLayer = new Layer({
				width: this.touchPointerImageSize,
				height: this.touchPointerImageSize,
				backgroundColor: null,
				opacity: 0
			});
			return this.touchPointLayer.style.backgroundImage = this.touchPointerImage;
		});
	}

	destroy() {
		this.context.reset();
		return this.context = null;
	}

	// Event handlers

	keydown(event) {

		if (event.keyCode === this.keyPinchCode) {
			this.isPinchKeyDown = true;
			this.startPoint = (this.centerPoint = null);
			this.showTouchCursor();
			this.touchPointLayer.midX = this.point.x;
			this.touchPointLayer.midY = this.point.y;
		}

		if (event.keyCode === this.keyPanCode) {
			this.isPanKeyDown = true;
			return cancelEvent(event);
		}
	}

	keyup(event) {

		if (event.keyCode === this.keyPinchCode) {
			cancelEvent(event);
			this.isPinchKeyDown = false;
			this.hideTouchCursor();
		}

		if (event.keyCode === this.keyPanCode) {
			cancelEvent(event);
			if (this.touchPoint && this.point) {
				this.centerPoint = Utils.pointCenter(this.touchPoint, this.point);
				return this.isPanKeyDown = false;
			}
		}
	}


	mousedown(event) {

		// cancelEvent(event)

		this.isMouseDown = true;
		this.target = event.target;

		if (this.isPinchKeyDown) {
			dispatchTouchEvent("touchstart", this.target, event, this.touchPointDelta);
		} else {
			dispatchTouchEvent("touchstart", this.target, event);
		}

		return this.touchPointLayer.style.backgroundImage = this.touchPointerImageActive;
	}

	mousemove(event) {

		this.point = {
			x: event.pageX,
			y: event.pageY
		};

		// cancelEvent(event)

		if (this.startPoint == null) { this.startPoint = this.point; }
		if (this.centerPoint == null) { this.centerPoint = this.point; }

		if (this.isPinchKeyDown && !this.isPanKeyDown) {
			if (this.touchPointerInitialOffset && this.centerPoint) {
				this.touchPoint = Utils.pointAdd(this.touchPointerInitialOffset, this.pinchPoint(this.point, this.centerPoint));
				this.touchPointDelta = Utils.pointSubtract(this.point, this.touchPoint);
			}
		}

		if (this.isPinchKeyDown && this.isPanKeyDown) {
			if (this.touchPoint && this.touchPointDelta) {
				this.touchPoint = this.panPoint(this.point, this.touchPointDelta);
			}
		}

		if (this.isPinchKeyDown || this.isPanKeyDown) {
			if (this.touchPoint) {
				this.touchPointLayer.visible = true;
				this.touchPointLayer.midX = this.touchPoint.x;
				this.touchPointLayer.midY = this.touchPoint.y;
			}
		}

		if (this.isMouseDown) {
			if ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPointDelta) {
				return dispatchTouchEvent("touchmove", this.target, event, this.touchPointDelta);
			} else {
				return dispatchTouchEvent("touchmove", this.target, event);
			}
		}
	}

	mouseup(event) {

		// cancelEvent(event)

		if (this.isPinchKeyDown || this.isPanKeyDown) {
			dispatchTouchEvent("touchend", this.target, event, this.touchPointDelta);
		} else {
			dispatchTouchEvent("touchend", this.target, event);
		}

		return this.endMultiTouch();
	}

	mouseout(event) {

		if (this.isMouseDown) { return; }

		const fromElement = event.relatedTarget || event.toElement;

		if (!fromElement || (fromElement.nodeName === "HTML")) {
			return this.endMultiTouch();
		}
	}

	// Utilities

	showTouchCursor() {

		// If the mouse did not move yet, we capture the point here
		if (!this.point) {
			this.point = {
				x: event.pageX,
				y: event.pageY
			};
		}

		this.touchPointLayer.animateStop();
		this.touchPointLayer.midX = this.point.x;
		this.touchPointLayer.midY = this.point.y;
		this.touchPointLayer.scale = 1.8;
		return this.touchPointLayer.animate({
			opacity: 1,
			scale: 1,
			// midX: @point.x + @touchPointerInitialOffset.x
			// midY: @point.y + @touchPointerInitialOffset.y
			options: {
				time: 0.1,
				curve: "ease-out"
			}
		});
	}

	hideTouchCursor() {
		if (!(this.touchPointLayer.opacity > 0)) { return; }
		this.touchPointLayer.animateStop();
		return this.touchPointLayer.animate({
			opacity: 0,
			scale: 1.2,
			options: {
				time: 0.08
			}
		});
	}

	mousemovePosition(event) {
		return this.point = {
			x: event.pageX,
			y: event.pageY
		};
	}

	endMultiTouch() {
		this.isMouseDown = false;
		this.touchPointLayer.style.backgroundImage = this.touchPointerImage;
		return this.hideTouchCursor();
	}

	pinchPoint(point, centerPoint) {
		return Utils.pointSubtract(centerPoint,
			Utils.pointSubtract(point, centerPoint));
	}

	panPoint(point, offsetPoint) {
		return Utils.pointSubtract(point, offsetPoint);
	}
}

let touchEmulator = null;

exports.enable = function() {
	if (Utils.isTouch()) { return; }
	if (touchEmulator == null) { touchEmulator = new TouchEmulator(); }
	return Events.enableEmulatedTouchEvents(true);
};

exports.disable = function() {
	if (!touchEmulator) { return; }
	touchEmulator.destroy();
	touchEmulator = null;
	return Events.enableEmulatedTouchEvents(false);
};

// resets the emulator, useful if the webview can loose/regain focus without being aware
// in such scenarios it can miss mouseup, mouseout events and such
// it can also be fixed by checking event.buttons in mousemove, but that is not available on safari
exports.reset = function() {
	if (!touchEmulator) { return; }
	return touchEmulator.endMultiTouch();
};
