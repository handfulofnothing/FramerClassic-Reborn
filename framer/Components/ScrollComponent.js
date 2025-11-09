import _ from "../Underscore.js";
import Utils from "../Utils.js";

import { Layer } from "../Layer.js";
import { Events } from "../Events.js";
import { Defaults } from "../Defaults.js";

`\
ScrollComponent

content <Layer>
contentSize <{width:n, height:n}>
contentInset <{top:n, right:n, bottom:n, left:n}> TODO
contentOffset <{x:n, y:n}> TODO
scrollFrame <{x:n, y:n, width:n, height:n}>
scrollPoint <{x:n, y:n}>
scrollHorizontal <bool>
scrollVertical <bool>
speedX <number>
speedY <number>
delaysContentTouches <bool> TODO
loadPreset(<"ios"|"android">) TODO
scrollToPoint(<{x:n, y:n}>, animate=true, animationOptions={})
scrollToLayer(contentLayer, originX=0, originY=0)
scrollFrameForContentLayer(<x:n, y:n>) <{x:n, y:n, width:n, height:n}> TODO
closestContentLayer(<x:n, y:n>) <Layer> TODO

ScrollComponent Events

(all of the draggable events)
ScrollStart -> DragStart
ScrollWillMove -> DragWillMove
ScrollDidMove -> DragDidMove
scroll -> DragMove (html compat)
ScrollEnd -> DragEnd\
`;

// Define new scroll-related events
Events.ScrollStart = "scrollstart";
Events.Scroll = "scroll";
Events.ScrollMove = Events.Scroll;
Events.ScrollEnd = "scrollend";
Events.ScrollAnimationDidStart = "scrollanimationdidstart";
Events.ScrollAnimationDidEnd = "scrollanimationdidend";

// Map scroll events to drag events
const EventMappers = {};
EventMappers[Events.Move] = Events.Move;
EventMappers[Events.ScrollStart] = Events.DragStart;
EventMappers[Events.ScrollMove] = Events.DragMove;
EventMappers[Events.ScrollEnd] = Events.DragEnd;
EventMappers[Events.ScrollAnimationDidStart] = Events.DragAnimationStart;
EventMappers[Events.ScrollAnimationDidEnd] = Events.DragAnimationEnd;
EventMappers[Events.DirectionLockStart] = Events.DirectionLockStart;

export class ScrollComponent extends Layer {
  static initClass() {
    // Proxy properties directly from the draggable
    this.define(
      "velocity",
      this.proxyProperty("content.draggable.velocity", {
        importable: false,
        exportable: false,
      })
    );
    this.define(
      "scrollHorizontal",
      this.proxyProperty("content.draggable.horizontal")
    );
    this.define(
      "scrollVertical",
      this.proxyProperty("content.draggable.vertical")
    );
    this.define("speedX", this.proxyProperty("content.draggable.speedX"));
    this.define("speedY", this.proxyProperty("content.draggable.speedY"));
    this.define(
      "isDragging",
      this.proxyProperty("content.draggable.isDragging", {
        importable: false,
        exportable: false,
      })
    );
    this.define(
      "isMoving",
      this.proxyProperty("content.draggable.isMoving", {
        importable: false,
        exportable: false,
      })
    );
    this.define(
      "isAnimating",
      this.proxyProperty("content.draggable.isAnimating", {
        importable: false,
        exportable: false,
      })
    );
    this.define(
      "propagateEvents",
      this.proxyProperty("content.draggable.propagateEvents")
    );
    this.define(
      "directionLock",
      this.proxyProperty("content.draggable.directionLock")
    );
    this.define(
      "directionLockThreshold",
      this.proxyProperty("content.draggable.directionLockThreshold")
    );

    this.define("content", {
      importable: false,
      exportable: false,
      get() {
        return this._content;
      },
    });

    this.define(
      "mouseWheelSpeedMultiplier",
      this.simpleProperty("mouseWheelSpeedMultiplier", 1)
    );

    this.define("scroll", {
      exportable: false,
      get() {
        return this.scrollHorizontal === true || this.scrollVertical === true;
      },
      set(value) {
        if (!this.content) {
          return;
        }
        if (value === false) {
          this.content.animateStop();
        }
        return (this.scrollHorizontal = this.scrollVertical = value);
      },
    });

    this.define("scrollX", {
      get() {
        if (!this.content) {
          return 0;
        }
        return 0 - this.content.x + this.contentInset.left;
      },
      set(value) {
        if (!this.content) {
          return;
        }
        this.content.draggable.animateStop();
        return (this.content.x = this._calculateContentPoint({
          x: value,
          y: 0,
        }).x);
      },
    });

    this.define("scrollY", {
      get() {
        if (!this.content) {
          return 0;
        }
        return 0 - this.content.y + this.contentInset.top;
      },
      set(value) {
        if (!this.content) {
          return;
        }
        this.content.draggable.animateStop();
        return (this.content.y = this._calculateContentPoint({
          x: 0,
          y: value,
        }).y);
      },
    });

    this.define("scrollPoint", {
      importable: true,
      exportable: false,
      get() {
        let point;
        return (point = {
          x: this.scrollX,
          y: this.scrollY,
        });
      },
      set(point) {
        if (!this.content) {
          return;
        }
        this.scrollX = point.x;
        return (this.scrollY = point.y);
      },
    });

    this.define("scrollFrame", {
      importable: true,
      exportable: false,
      get() {
        const rect = this.scrollPoint;
        rect.width = this.width;
        rect.height = this.height;
        return rect;
      },
      set(value) {
        return (this.scrollPoint = value);
      },
    });

    this.define("contentInset", {
      get() {
        return _.clone(this._contentInset);
      },
      set(contentInset) {
        this._contentInset = Utils.rectZero(Utils.parseRect(contentInset));

        if (!this.content) {
          return;
        }

        // If we reset the content inset, we need to reset the content position
        const contentFrame = this.calculateContentFrame();
        contentFrame.x = contentFrame.x + this._contentInset.left;
        contentFrame.y = contentFrame.y + this._contentInset.top;
        this.content.frame = contentFrame;
        return this.updateContent();
      },
    });

    this.define("direction", {
      importable: false,
      exportable: false,
      get() {
        const { direction } = this.content.draggable;
        if (direction === "down") {
          return "up";
        }
        if (direction === "up") {
          return "down";
        }
        if (direction === "right") {
          return "left";
        }
        if (direction === "left") {
          return "right";
        }
        return direction;
      },
    });

    this.define("angle", {
      importable: false,
      exportable: false,
      get() {
        if (!this.content) {
          return 0;
        }
        return -this.content.draggable.angle;
      },
    });

    this.prototype.on = this.prototype.addListener;
    this.prototype.off = this.prototype.removeListener;

    //#############################################################
    // MouseWheel handling

    this.define("mouseWheelEnabled", {
      get() {
        return this._mouseWheelEnabled;
      },
      set(value) {
        this._mouseWheelEnabled = value;
        return this._enableMouseWheelHandling(value);
      },
    });

    // Because there is no real scroll end event on a mousewheel, we use a timeout to see if
    // events stop coming in, and throw a scroll event after. Better than nothing.
    this.prototype._onMouseWheelEnd = Utils.debounce(0.3, function (event) {
      this.emit(Events.ScrollEnd, event);
      return (this._mouseWheelScrolling = false);
    });
  }

  constructor(options) {
    this.updateContent = this.updateContent.bind(this);
    this._onAnimationStart = this._onAnimationStart.bind(this);
    this._onAnimationStep = this._onAnimationStep.bind(this);
    this._onAnimationStop = this._onAnimationStop.bind(this);
    this._onMouseWheel = this._onMouseWheel.bind(this);
    if (options == null) {
      options = {};
    }
    super(Defaults.getDefaults("ScrollComponent", options));

    this._contentInset = options.contentInset || Utils.rectZero();
    this.setContentLayer(new Layer());

    // Only at this point we can set all the proxy properties, because before
    // this the content layer did not exist. So we have to apply those again.
    this._applyProxyDefaults(options);

    this._enableMouseWheelHandling(options.mouseWheelEnabled);

    if (options.hasOwnProperty("wrap")) {
      wrapComponent(this, options.wrap);
    }
  }

  calculateContentFrame() {
    let size;
    if (!this.content) {
      return Utils.rectZero();
    }

    // Calculates the size of the content. By default this returns the total
    // size of all the content layers based on width and height. You can override
    // this for example to take scaling into account.

    const contentFrame = this.content.contentFrame();

    return (size = {
      x: 0,
      y: 0,
      width: Math.max(this.width, contentFrame.x + contentFrame.width),
      height: Math.max(this.height, contentFrame.y + contentFrame.height),
    });
  }

  setContentLayer(layer) {
    // Sets the content layer if you happen to want to replace the default one
    // yourself. Sets some sane defaults too.

    if (this.content) {
      this._onAnimationStop();
      this.content.off(Events.AnimationStart, this._onAnimationStart);
      this.content.off(Events.AnimationStop, this._onAnimationStop);
      this._content.destroy();
    }

    this._content = layer;
    this._content.parent = this;
    this._content.name = "content";
    this._content.clip = true;
    this._content.draggable.enabled = true;
    this._content.draggable.momentum = true;
    this._content.on("change:children", this.updateContent);

    // Update the content view size on resizing the ScrollComponent
    this.on("change:width", this.updateContent);
    this.on("change:height", this.updateContent);

    this.updateContent();

    this.scrollPoint = { x: 0, y: 0 };

    this.content.on(Events.AnimationStart, this._onAnimationStart);
    this.content.on(Events.AnimationStop, this._onAnimationStop);

    return this._content;
  }

  updateContent() {
    // This function re-calculates the size of the content, updates the content layer
    // size and the dragging constraints based on the content size and contentInset.
    // It defaults to just the direct sub layers of the content, not recursive.

    // This function automatically gets called when you add or remove content layers,
    // but not when you change the size of the content layers. It's totally okay to
    // call it yourself, but make sure you don't overdo it.

    if (!this.content) {
      return;
    }

    const contentFrame = this.calculateContentFrame();
    this.content.width = contentFrame.width;
    this.content.height = contentFrame.height;

    let constraintsFrame = this.calculateContentFrame();
    constraintsFrame = {
      x: -constraintsFrame.width + this.width - this._contentInset.right,
      y: -constraintsFrame.height + this.height - this._contentInset.bottom,
      width:
        constraintsFrame.width +
        constraintsFrame.width -
        this.width +
        this._contentInset.left +
        this._contentInset.right,
      height:
        constraintsFrame.height +
        constraintsFrame.height -
        this.height +
        this._contentInset.top +
        this._contentInset.bottom,
    };

    this.content.draggable.constraints = constraintsFrame;

    // Reset the scroll points to the right postions, this is needed so it can calculate
    // the new scroll points within the updated constraints for this new size.
    this.scrollPoint = this.scrollPoint;

    // Change the default background color if we added children. We keep the default
    // color around until you set a content layer so you can see the ScrollComponent
    // on your screen after creation.
    if (this.content.children.length) {
      if (
        this.content.backgroundColor != null
          ? this.content.backgroundColor.isEqual(
              Framer.Defaults.Layer.backgroundColor
            )
          : undefined
      ) {
        return (this.content.backgroundColor = null);
      }
    }
  }

  _calculateContentPoint(scrollPoint) {
    scrollPoint = _.defaults(scrollPoint, { x: 0, y: 0 });
    scrollPoint.x -= this.contentInset.left;
    scrollPoint.y -= this.contentInset.top;
    const point = this._pointInConstraints(scrollPoint);
    return Utils.pointInvert(point);
  }

  scrollToPoint(point, animate, animationOptions) {
    // We never let you scroll to a point that does not make sense (out of bounds). If you still
    // would like to do that, access the .content.y directly.
    if (animate == null) {
      animate = true;
    }
    if (animationOptions == null) {
      animationOptions = { curve: "spring(500, 50, 0)" };
    }
    const contentPoint = this._calculateContentPoint(point);
    this.content.draggable.animateStop();

    if (animate) {
      point = {};
      if (contentPoint.hasOwnProperty("x")) {
        point.x = contentPoint.x;
      }
      if (contentPoint.hasOwnProperty("y")) {
        point.y = contentPoint.y;
      }
      this.content.animateStop();
      return this.content.animate(point, animationOptions);
    } else {
      return (this.content.point = contentPoint);
    }
  }

  scrollToTop(animate, animationOptions) {
    if (animate == null) {
      animate = true;
    }
    if (animationOptions == null) {
      animationOptions = { curve: "spring(500, 50, 0)" };
    }
    return this.scrollToPoint({ x: 0, y: 0 }, animate, animationOptions);
  }

  scrollToLayer(contentLayer, originX, originY, animate, animationOptions) {
    let scrollPoint;
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    if (animate == null) {
      animate = true;
    }
    if (animationOptions == null) {
      animationOptions = { curve: "spring(500, 50, 0)" };
    }
    if (contentLayer && contentLayer.parent !== this.content) {
      throw Error(
        "Can't scroll to this layer because it's not in the ScrollComponent. Add it to the content like layer.parent = scroll.content."
      );
    }

    if (!contentLayer || this.content.children.length === 0) {
      scrollPoint = { x: 0, y: 0 };
    } else {
      scrollPoint = this._scrollPointForLayer(contentLayer, originX, originY);
      scrollPoint.x -= this.width * originX;
      scrollPoint.y -= this.height * originY;
    }

    this.scrollToPoint(scrollPoint, animate, animationOptions);

    return contentLayer;
  }

  scrollToClosestLayer(originX, originY, animate, animationOptions) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    if (animate == null) {
      animate = true;
    }
    if (animationOptions == null) {
      animationOptions = { curve: "spring(500, 50, 0)" };
    }
    const closestLayer = this.closestContentLayer(
      originX,
      originY,
      animate,
      animationOptions
    );
    if (closestLayer) {
      this.scrollToLayer(closestLayer, originX, originY);
      return closestLayer;
    } else {
      if (!closestLayer) {
        this.scrollToPoint({ x: 0, y: 0 });
      }
      return null;
    }
  }

  closestContentLayer(originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    const scrollPoint = Utils.framePointForOrigin(
      this.scrollFrame,
      originX,
      originY
    );
    return this.closestContentLayerForScrollPoint(
      scrollPoint,
      originX,
      originY
    );
  }

  closestContentLayerForScrollPoint(scrollPoint, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return _.head(
      this._contentLayersSortedByDistanceForScrollPoint(
        scrollPoint,
        originX,
        originY
      )
    );
  }

  _onAnimationStart(event) {
    return this.content.on("change:frame", this._onAnimationStep);
  }

  _onAnimationStep(event) {
    this.content.emit(Events.Move, this.content.point);
    return this.emit(Events.Scroll, event);
  }

  _onAnimationStop() {
    return this.content.off("change:frame", this._onAnimationStep);
  }

  _scrollPointForLayer(layer, originX, originY, clamp) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    if (clamp == null) {
      clamp = true;
    }
    return Utils.framePointForOrigin(layer, originX, originY);
  }

  _contentLayersSortedByDistanceForScrollPoint(scrollPoint, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return Utils.frameSortByAbsoluteDistance(
      scrollPoint,
      this.content.children,
      originX,
      originY
    );
  }

  _pointInConstraints(point) {
    const { minX, maxX, minY, maxY } =
      this.content.draggable._calculateConstraints(
        this.content.draggable.constraints
      );

    point = {
      x: -Utils.clamp(-point.x, minX, maxX),
      y: -Utils.clamp(-point.y, minY, maxY),
    };

    return point;
  }

  //#############################################################
  // Map scroll events to content.draggable

  addListener(...args) {
    const adjustedLength = Math.max(args.length, 1),
      eventNames = args.slice(0, adjustedLength - 1),
      listener = args[adjustedLength - 1];
    super.addListener(...arguments);
    return (() => {
      const result = [];
      for (var eventName of Array.from(eventNames)) {
        var needle;
        if (
          ((needle = eventName),
          Array.from(_.keys(EventMappers)).includes(needle))
        ) {
          result.push(this.content.on(EventMappers[eventName], listener));
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  removeListener(...args) {
    const adjustedLength = Math.max(args.length, 1),
      eventNames = args.slice(0, adjustedLength - 1),
      listener = args[adjustedLength - 1];
    super.removeListener(...arguments);
    return (() => {
      const result = [];
      for (var eventName of Array.from(eventNames)) {
        var needle;
        if (
          ((needle = eventName),
          Array.from(_.keys(EventMappers)).includes(needle))
        ) {
          result.push(this.content.off(EventMappers[eventName], listener));
        } else {
          result.push(undefined);
        }
      }
      return result;
    })();
  }

  _enableMouseWheelHandling(enable) {
    if (enable) {
      return this.on(Events.MouseWheel, this._onMouseWheel);
    } else {
      return this.off(Events.MouseWheel, this._onMouseWheel);
    }
  }

  _onMouseWheel(event) {
    let deltaX = 0;
    let deltaY = 0;
    if (this.scrollHorizontal) {
      deltaX = event.wheelDeltaX;
    }
    if (this.scrollVertical) {
      deltaY = event.wheelDeltaY;
    }

    if (deltaX === 0 && deltaY === 0) {
      return;
    }

    if (!this._mouseWheelScrolling) {
      this._mouseWheelScrolling = true;
      this.emit(Events.ScrollStart, event);
    }

    this.content.animateStop();

    const { minX, maxX, minY, maxY } =
      this.content.draggable._calculateConstraints(
        this.content.draggable.constraints
      );

    const point = {
      x: Utils.clamp(
        this.content.x + deltaX * this.mouseWheelSpeedMultiplier,
        minX,
        maxX
      ),
      y: Utils.clamp(
        this.content.y + deltaY * this.mouseWheelSpeedMultiplier,
        minY,
        maxY
      ),
    };

    this.content.point = point;

    this.content.emit(Events.Move, point);
    this.emit(Events.Scroll, event);
    return this._onMouseWheelEnd(event);
  }

  //#############################################################
  // Copying

  copy() {
    const copy = super.copy(...arguments);
    const contentLayer = _.head(_.without(copy.children, copy.content));
    copy.setContentLayer(contentLayer);
    copy.props = this.props;
    return copy;
  }

  //#############################################################
  // Convenience function to make a single layer scrollable

  static wrap(layer, options) {
    return wrapComponent(new this(options), layer, options);
  }
}
ScrollComponent.initClass();

var wrapComponent = function (instance, layer, options) {
  if (options == null) {
    options = { correct: true };
  }
  if (!(layer instanceof Layer)) {
    throw new Error(
      `ScrollComponent.wrap expects a layer, not ${layer}. Are you sure the layer exists?`
    );
  }

  // This function wraps the given layer into a scroll or page component. This is
  // great for importing from Sketch or Photoshop.

  const scroll = instance;

  // Do some special case handling for the PageComponent subclass
  // as this function is outside of the class scope so we can’t simply
  // override
  const isPageComponent = instance.constructor.name === "PageComponent";

  // If we actually forgot to add a sub layer, so for example if
  // there is just one layer and we want to make it scrollable we
  // correct that here.

  if (options.correct === true) {
    if (layer.children.length === 0 && !isPageComponent) {
      const wrapper = new Layer();
      wrapper.frame = layer.frame;
      layer.parent = wrapper;
      layer.x = layer.y = 0;
      layer = wrapper;
    }
  }

  // console.info "Corrected the scroll component without sub layers"

  scroll.frame = layer.frame;
  scroll.parent = layer.parent;
  scroll.index = layer.index;

  if (layer.name != null && !isPageComponent) {
    scroll.name = layer.name;
  }
  if (scroll.__framerInstanceInfo == null) {
    scroll.__framerInstanceInfo = {};
  }
  if (scroll.__framerInstanceInfo != null) {
    scroll.__framerInstanceInfo.name = instance.constructor.name;
  }

  // If we have an image set, it makes way more sense to add it to the
  // background of the wrapper then the content.
  // Note: I ran into a situation where this had a weird result, maybe
  // we should revise this in the future.
  if (layer.image && !isPageComponent) {
    scroll.image = layer.image;
    layer.image = null;
  }

  if (isPageComponent) {
    // Just add the layer as a page
    scroll.addPage(layer);
  } else {
    // Set the original layer as the content layer for the scroll
    scroll.setContentLayer(layer);
  }

  // https://github.com/motif/Company/issues/208

  // This could potentially be smart to avoid an unexpected state if
  // you forgot to add a mask in sketch or photoshop and the scroll
  // component size becomes the same as it's content.

  // This only makes sense if your scroll component is on the screen
  // to begin with so we check that first. Because maybe you put it
  // offscreen to move it onscreen later.

  // You can turn this off by setting correct to false

  if (options.correct === true) {
    const { screenFrame } = scroll;

    if (screenFrame.x < Screen.width) {
      if (screenFrame.x + screenFrame.width > Screen.width) {
        scroll.width = Screen.width - screenFrame.x;
      }
    }
    // console.info "Corrected the scroll width to #{scroll.width}"

    if (screenFrame.y < Screen.height) {
      if (screenFrame.y + screenFrame.height > Screen.height) {
        scroll.height = Screen.height - screenFrame.y;
      }
    }
  }
  // console.info "Corrected the scroll height to #{scroll.height}"

  return scroll;
};
