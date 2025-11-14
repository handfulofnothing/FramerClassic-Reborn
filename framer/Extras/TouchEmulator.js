import Utils from "../Utils.js";
import { BaseClass } from "../BaseClass.js";
import { Context } from "../Context.js";
import { Layer } from "../Layer.js";
import { Events } from "../Events.js";

const createTouch = (event, identifier, offset = { x: 0, y: 0 }) => {
  const touch = {
    identifier,
    target: event.target,
    pageX: event.pageX - offset.x,
    pageY: event.pageY - offset.y,
    clientX: event.clientX - offset.x,
    clientY: event.clientY - offset.y,
    screenX: event.screenX - offset.x,
    screenY: event.screenY - offset.y,
    point: {
      x: event.pageX - offset.x,
      y: event.pageY - offset.y,
    },
  };
  return touch;
};

const dispatchTouchEvent = (type, target, event, offset) => {
  if (!target) ({ target } = event);

  const touchEvent = document.createEvent("MouseEvent");
  touchEvent.initMouseEvent(
    type,
    true,
    true,
    window,
    event.detail,
    event.screenX,
    event.screenY,
    event.clientX,
    event.clientY,
    event.ctrlKey,
    event.shiftKey,
    event.altKey,
    event.metaKey,
    event.button,
    event.relatedTarget
  );

  const touches = [createTouch(event, 1)];
  if (offset) touches.push(createTouch(event, 2, offset));

  touchEvent.touches =
    touchEvent.changedTouches =
    touchEvent.targetTouches =
      touches;

  return target.dispatchEvent(touchEvent);
};

const cancelEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

class TouchEmulator extends BaseClass {
  constructor(context) {
    super();

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
    this.touchPointerInitialOffset = { x: 0, y: 0 };

    this.keyPinchCode = 18; // Alt
    this.keyPanCode = 91; // Command

    this.context = context || new Context({ name: "TouchEmulator" });
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

    this.context.run(() => {
      this.touchPointLayer = new Layer({
        width: this.touchPointerImageSize,
        height: this.touchPointerImageSize,
        backgroundColor: null,
        opacity: 0,
      });
      this.touchPointLayer.style.backgroundImage = this.touchPointerImage;
    });
  }

  destroy() {
    this.context?.reset();
    this.context = null;
  }

  keydown(event) {
    if (event.keyCode === this.keyPinchCode) {
      this.isPinchKeyDown = true;
      this.startPoint = this.centerPoint = null;
      this.showTouchCursor();
      this.touchPointLayer.midX = this.point?.x ?? 0;
      this.touchPointLayer.midY = this.point?.y ?? 0;
    }

    if (event.keyCode === this.keyPanCode) {
      this.isPanKeyDown = true;
      cancelEvent(event);
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
        this.isPanKeyDown = false;
      }
    }
  }

  mousedown(event) {
    this.isMouseDown = true;
    this.target = event.target;

    if (this.isPinchKeyDown) {
      dispatchTouchEvent(
        "touchstart",
        this.target,
        event,
        this.touchPointDelta
      );
    } else {
      dispatchTouchEvent("touchstart", this.target, event);
    }

    this.touchPointLayer.style.backgroundImage = this.touchPointerImageActive;
  }

  mousemove(event) {
    this.point = { x: event.pageX, y: event.pageY };

    this.startPoint ??= this.point;
    this.centerPoint ??= this.point;

    if (this.isPinchKeyDown && !this.isPanKeyDown && this.centerPoint) {
      this.touchPoint = Utils.pointAdd(
        this.touchPointerInitialOffset,
        this.pinchPoint(this.point, this.centerPoint)
      );
      this.touchPointDelta = Utils.pointSubtract(this.point, this.touchPoint);
    }

    if (
      this.isPinchKeyDown &&
      this.isPanKeyDown &&
      this.touchPoint &&
      this.touchPointDelta
    ) {
      this.touchPoint = this.panPoint(this.point, this.touchPointDelta);
    }

    if ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPoint) {
      this.touchPointLayer.visible = true;
      this.touchPointLayer.midX = this.touchPoint.x;
      this.touchPointLayer.midY = this.touchPoint.y;
    }

    if (this.isMouseDown) {
      if ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPointDelta) {
        dispatchTouchEvent(
          "touchmove",
          this.target,
          event,
          this.touchPointDelta
        );
      } else {
        dispatchTouchEvent("touchmove", this.target, event);
      }
    }
  }

  mouseup(event) {
    if (this.isPinchKeyDown || this.isPanKeyDown) {
      dispatchTouchEvent("touchend", this.target, event, this.touchPointDelta);
    } else {
      dispatchTouchEvent("touchend", this.target, event);
    }

    this.endMultiTouch();
  }

  mouseout(event) {
    if (this.isMouseDown) return;

    const fromElement = event.relatedTarget || event.toElement;
    if (!fromElement || fromElement.nodeName === "HTML") {
      this.endMultiTouch();
    }
  }

  showTouchCursor() {
    if (!this.point) {
      this.point = { x: 0, y: 0 };
    }

    this.touchPointLayer.animateStop();
    this.touchPointLayer.midX = this.point.x;
    this.touchPointLayer.midY = this.point.y;
    this.touchPointLayer.scale = 1.8;

    this.touchPointLayer.animate({
      opacity: 1,
      scale: 1,
      options: { time: 0.1, curve: "ease-out" },
    });
  }

  hideTouchCursor() {
    if (this.touchPointLayer.opacity <= 0) return;

    this.touchPointLayer.animateStop();
    this.touchPointLayer.animate({
      opacity: 0,
      scale: 1.2,
      options: { time: 0.08 },
    });
  }

  mousemovePosition(event) {
    this.point = { x: event.pageX, y: event.pageY };
  }

  endMultiTouch() {
    this.isMouseDown = false;
    this.touchPointLayer.style.backgroundImage = this.touchPointerImage;
    this.hideTouchCursor();
  }

  pinchPoint(point, centerPoint) {
    return Utils.pointSubtract(
      centerPoint,
      Utils.pointSubtract(point, centerPoint)
    );
  }

  panPoint(point, offsetPoint) {
    return Utils.pointSubtract(point, offsetPoint);
  }
}

let touchEmulator = null;

export const enable = () => {
  if (Utils.isTouch()) return;
  if (!touchEmulator) touchEmulator = new TouchEmulator();
  return Events.enableEmulatedTouchEvents(true);
};

export const disable = () => {
  if (!touchEmulator) return;
  touchEmulator.destroy();
  touchEmulator = null;
  return Events.enableEmulatedTouchEvents(false);
};

export const reset = () => {
  touchEmulator?.endMultiTouch();
};

export default TouchEmulator;
