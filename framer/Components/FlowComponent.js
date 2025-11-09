import Utils from "../Utils.js";
import { Layer } from "../Layer.js";
import { Events } from "../Events.js";
import { AnimationGroup } from "../AnimationGroup.js";

Events.TransitionStart = "transitionstart";
Events.TransitionHalt = "transitionhalt";
Events.TransitionStop = "transitionstop";
Events.TransitionEnd = "transitionend";

export class FlowComponent extends Layer {
  static initClass() {
    // @define "isTransitioning",
    // 	get: -> @_runningTransition

    this.define("isModal", {
      get() {
        return this._isModal;
      },
    });

    this.define("stack", {
      get() {
        return this._stack.map((item) => item.layer);
      },
    });

    this.define("current", {
      get() {
        return __guard__(this._stack[this._stack.length - 1], (x) => x.layer);
      },
    });

    this.define("previous", {
      get() {
        return __guard__(this._stack[this._stack.length - 2], (x) => x.layer);
      },
    });

    this.define("scroll", {
      get() {
        return this.current != null ? this.current._flowScroll : undefined;
      },
    });

    this.define("mouseWheelEnabled", {
      default: false,
      get() {
        return this._mouseWheelEnabled;
      },
      set(value) {
        return (this._mouseWheelEnabled = value);
      },
    });

    //#############################################################
    // Header and footer

    this.define("header", {
      get() {
        return this._header;
      },
      set(layer) {
        if (!(layer instanceof Layer)) {
          return;
        }
        this._header = layer;
        this._header.name = "header";
        this._header.width = this.width;
        this._header.setParentPreservingConstraintValues(this);
        if (this._header.constraintValues == null) {
          this._header.x = Align.center;
          this._header.y = Align.top;
        }
        if (this.current) {
          return this._wrapLayer(this.current);
        }
      },
    });

    this.define("footer", {
      get() {
        return this._footer;
      },
      set(layer) {
        if (!(layer instanceof Layer)) {
          return;
        }
        this._footer = layer;
        this._footer.name = "footer";
        this._footer.width = this.width;
        this._footer.setParentPreservingConstraintValues(this);
        if (this._footer.constraintValues == null) {
          this._footer.x = Align.center;
          this._footer.y = Align.bottom;
        }
        if (this.current) {
          return this._wrapLayer(this.current);
        }
      },
    });
  }

  constructor(layerOrOptions, options) {
    this.showPrevious = this.showPrevious.bind(this);
    this._handleOverlayTap = this._handleOverlayTap.bind(this);
    this._forwardScrollEvents = this._forwardScrollEvents.bind(this);
    this._runTransition = this._runTransition.bind(this);
    if (layerOrOptions == null) {
      layerOrOptions = {};
    }
    if (options == null) {
      options = {};
    }
    let layer = null;

    if (layerOrOptions instanceof Layer) {
      layer = layerOrOptions;
      options = options;
    } else {
      options = layerOrOptions;
    }

    options = _.defaults({}, options, { backgroundColor: "black" });

    if (!options.size) {
      if (options.width == null) {
        options.width = Screen.width;
      }
      if (options.height == null) {
        options.height = Screen.height;
      }
    }

    if (options.clip == null) {
      options.clip = true;
    }

    super(options);

    this.reset();

    this.overlay = new Layer({
      name: "overlay",
      parent: this,
      size: 0,
      backgroundColor: "black",
      visible: false,
    });

    this.overlay.onTap(this._handleOverlayTap);

    if (layer) {
      this.showNext(layer);
    } else {
      this._tempScroll = new ScrollComponent({
        name: "scrollComponent",
        parent: this,
        width: this.width,
        height: this.height,
      });
    }
  }

  reset() {
    if (this._stack) {
      for (var item of Array.from(this._stack)) {
        if (item.layer !== this._initial) {
          item.layer.visible = false;
        }
      }
    }

    this._stack = [];
    this._seen = [];
    this._current = null;
    this._isModal = false;

    if (this._initial) {
      return this.showNext(this._initial, { animate: false });
    }
  }

  //#############################################################
  // Transitions

  transition(layer, transitionFunction, options) {
    // Transition over to a new layer using a specific transtition function.

    // Some basic error checking
    if (options == null) {
      options = {};
    }
    if (!(layer instanceof Layer)) {
      throw new Error("FlowComponent.transition expects a layer");
    }
    if (!transitionFunction) {
      throw new Error("FlowComponent.transition expects transitionFunction");
    }

    if (layer === this.current) {
      return;
    }

    // Remove the temporary scroll component when the first layer gets added
    if (this._tempScroll != null) {
      this._tempScroll.destroy();
    }

    // Set the default values so we get some expected results (visibility,
    // correct parent, events, wrapping, etcetera).

    // If this is the first layer we navigate to, we skip the animation

    options = _.defaults({}, options, {
      animate: this._firstTransition === true ? true : false,
      scroll: true,
      wrap: true,
      modal: false,
    });

    // Deal with modal transitions, where a click on the overlay goes back
    this._isModal = options.modal;

    // Make sure the layer is visible
    layer.visible = true;
    layer.opacity = 1;

    // We want the layer to block events so you can't click on layers
    // that end up behind it without knowing it.
    layer.ignoreEvents = false;

    // Wrap the layer into a ScrollComponent if it exceeds the size
    // and correct the parent if needed.
    let wrappedLayer = layer;
    if (options.scroll && options.wrap) {
      wrappedLayer = this._wrapLayer(layer);
    }

    wrappedLayer.parent = this;
    wrappedLayer.visible = !options.animate;

    const layerA = this.current;
    const layerB = wrappedLayer;
    const { overlay } = this;

    // Get the executed template data by passing in the layers for this transition
    const template = transitionFunction(this, layerA, layerB, overlay);

    // Build the transition function to setup all the states, using the
    // transition, current and new layer, and optionally a background.
    const transition = this._buildTransition(template, layerA, layerB, overlay);

    // Run the transition and update the history
    this._runTransition(
      transition,
      "forward",
      options.animate,
      this.current,
      layer
    );

    return this._stack.push({ layer, transition });
  }

  showNext(layer, options) {
    if (options == null) {
      options = {};
    }
    if (this._initial == null) {
      this._initial = layer;
    }
    return this.transition(layer, Transitions.show, options);
  }

  showPrevious(options) {
    if (options == null) {
      options = {};
    }
    if (!this.previous) {
      return;
    }
    if (this.isTransitioning) {
      return;
    }

    // Maybe people (Jorn) pass in a layer accidentally
    if (options instanceof Framer._Layer) {
      options = {};
    }
    options = _.defaults({}, options, { count: 1, animate: true });

    if (options.count > 1) {
      const { count } = options;
      for (
        let n = 2, end = count, asc = 2 <= end;
        asc ? n <= end : n >= end;
        asc ? n++ : n--
      ) {
        this.showPrevious({ animate: false, count: 1 });
      }
    }

    const previous = this._stack.pop();
    return this._runTransition(
      previous != null ? previous.transition : undefined,
      "back",
      options.animate,
      this.current,
      previous.layer
    );
  }

  showOverlayCenter(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._showOverlay(layer, Transitions.overlayCenter, options);
  }

  showOverlayTop(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._showOverlay(layer, Transitions.overlayTop, options);
  }

  showOverlayRight(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._showOverlay(layer, Transitions.overlayRight, options);
  }

  showOverlayBottom(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._showOverlay(layer, Transitions.overlayBottom, options);
  }

  showOverlayLeft(layer, options) {
    if (options == null) {
      options = {};
    }
    return this._showOverlay(layer, Transitions.overlayLeft, options);
  }

  //#############################################################
  // Internal methods

  _showOverlay(layer, transition, options) {
    if (options == null) {
      options = {};
    }
    return this.transition(
      layer,
      transition,
      _.defaults({}, options, { animate: true, scroll: false, modal: false })
    );
  }

  _handleOverlayTap() {
    if (!this.isModal) {
      return this.showPrevious();
    }
  }

  _wrapLayer(flowLayer) {
    let needle, previousWrappingContent, previousWrappingScroll, scroll;
    flowLayer._flowLayer = flowLayer;

    if (flowLayer instanceof ScrollComponent) {
      return flowLayer;
    }
    if (flowLayer._flowWrapped) {
      return flowLayer;
    }

    // Make the layer at least match the device size
    flowLayer.width = Math.max(flowLayer.width, this.width);
    flowLayer.height = Math.max(flowLayer.height, this.height);

    const { size } = this;
    // Save the parent so we can clean up when we re-wrap this layer
    if (((needle = this), Array.from(flowLayer.ancestors()).includes(needle))) {
      const content = flowLayer != null ? flowLayer.parent : undefined;
      scroll = content != null ? content.parent : undefined;
      if (scroll instanceof ScrollComponent) {
        previousWrappingScroll = scroll;
        previousWrappingContent = content;
      }
    }
    let layer = layoutPage(flowLayer, size);
    layer = layoutScroll(layer, size);
    if (
      flowLayer !== layer &&
      (previousWrappingContent != null
        ? previousWrappingContent.children.length
        : undefined) === 0 &&
      (previousWrappingScroll != null
        ? previousWrappingScroll.children.length
        : undefined) === 1 &&
      (previousWrappingScroll != null
        ? previousWrappingScroll.children[0]
        : undefined) === previousWrappingContent
    ) {
      // we wrapped the layer
      previousWrappingScroll.destroy();
    }

    // Mark the layer so we don't layout it twice'
    layer._flowLayer = flowLayer;

    // Forward the scroll events from created scroll components
    for (scroll of [layer, ...Array.from(layer.children)]) {
      this._forwardScrollEvents(scroll);

      if (scroll instanceof ScrollComponent) {
        var inset = {};
        if (scroll.y === 0) {
          inset.top =
            (this.header != null ? this.header.height : undefined) || 0;
        }
        if (scroll.maxY === this.height) {
          inset.bottom =
            (this.footer != null ? this.footer.height : undefined) || 0;
        }
        scroll.contentInset = inset;
        flowLayer._flowScroll = scroll;
        scroll.mouseWheelEnabled = this._mouseWheelEnabled;
      }
    }

    // Set the background color for he created scroll component
    if (layer instanceof ScrollComponent) {
      layer.backgroundColor = this.backgroundColor;
    }

    return layer;
  }

  _forwardScrollEvents(scroll) {
    if (!(scroll instanceof ScrollComponent)) {
      return;
    }
    if (scroll._flowForward === true) {
      return;
    }

    // But only the actual scroll events
    for (var event of [
      Events.Move,
      Events.ScrollStart,
      Events.ScrollMove,
      Events.ScrollEnd,
      Events.ScrollAnimationDidStart,
      Events.ScrollAnimationDidEnd,
    ]) {
      ((event) => scroll.on(event, () => this.emit(event, scroll)))(event);
    }

    return (scroll._flowForward = true);
  }

  _runTransition(transition, direction, animate, from, to) {
    let a, b;
    if (direction === "forward") {
      a = from;
      b = to;
    } else {
      a = to;
      b = from;
    }

    this.emit(Events.TransitionStart, a, b, direction);

    // Start the transition with a small delay added so it only runs after all
    // js has been processed. It's also important for hints, as they rely on
    // ignoreEvents to be false at the moment of a click.

    return Utils.delay(0, () => {
      this._firstTransition = true;
      return transition[direction](animate);
    });
  }

  _buildTransition(template, layerA, layerB, overlay) {
    // # Buld a new transtition object with empty states
    const transition = {};

    // Add the forward function for this state to transition forward
    transition.forward = (animate, callback) => {
      if (animate == null) {
        animate = true;
      }
      const forwardEvents = (group, direction) => {
        group.once(Events.AnimationHalt, () =>
          this.emit(Events.TransitionHalt, layerA, layerB, direction)
        );
        group.once(Events.AnimationStop, () =>
          this.emit(Events.TransitionStop, layerA, layerB, direction)
        );
        return group.once(Events.AnimationEnd, () =>
          this.emit(Events.TransitionEnd, layerA, layerB, direction)
        );
      };

      const animations = [];
      const options = { instant: !animate };

      if (layerA && template.layerA) {
        layerA.visible = true;
        animations.push(new Animation(layerA, template.layerA.hide, options));
      }

      if (layerB && template.layerB) {
        layerB.props = template.layerB.hide;
        // layerB.props = template.layerB.hide if animate # This breaks events now
        layerB.bringToFront();
        layerB.visible = true;
        animations.push(new Animation(layerB, template.layerB.show, options));
      }

      if (overlay && template.overlay) {
        overlay.visible = true;
        overlay.ignoreEvents = false;
        overlay.placeBehind(layerB);
        overlay.props = template.overlay.hide;
        animations.push(new Animation(overlay, template.overlay.show, options));
      }

      // Set the right layer indexes for the header and footer if they are there.
      if (overlay && template.overlay) {
        if (this.header) {
          this.header.placeBehind(overlay);
        }
        if (this.footer) {
          this.footer.placeBehind(overlay);
        }
      } else {
        if (this.header) {
          this.header.bringToFront();
        }
        if (this.footer) {
          this.footer.bringToFront();
        }
      }

      const group = new AnimationGroup(animations);
      forwardEvents(group, "forward");

      group.once(Events.AnimationEnd, function () {
        if (layerA && template.layerA && !(overlay && template.overlay)) {
          return (layerA.visible = false);
        }
      });

      return group.start();
    };

    transition.back = (animate, callback) => {
      if (animate == null) {
        animate = true;
      }
      const forwardEvents = (group, direction) => {
        group.once(Events.AnimationHalt, () =>
          this.emit(Events.TransitionHalt, layerB, layerA, direction)
        );
        group.once(Events.AnimationStop, () =>
          this.emit(Events.TransitionStop, layerB, layerA, direction)
        );
        return group.once(Events.AnimationEnd, () =>
          this.emit(Events.TransitionEnd, layerB, layerA, direction)
        );
      };

      const animations = [];
      const options = { instant: !animate };

      if (overlay && template.overlay) {
        overlay.visible = true;
        overlay.ignoreEvents = true;
        animations.push(new Animation(overlay, template.overlay.hide, options));
      }

      if (layerA && template.layerA) {
        layerA.visible = true;
        animations.push(new Animation(layerA, template.layerA.show, options));
      }

      if (layerB && template.layerB) {
        layerB.visible = true;
        animations.push(new Animation(layerB, template.layerB.hide, options));
      }

      const group = new AnimationGroup(animations);
      group.stopAnimations = false;
      forwardEvents(group, "back");

      group.once(Events.AnimationEnd, function () {
        if (layerB && template.layerB) {
          return (layerB.visible = false);
        }
      });

      return group.start();
    };

    return transition;
  }

  //#############################################################
  // Event helpers

  onTransitionStart(cb) {
    return this.on(Events.TransitionStart, cb);
  }
  onTransitionHalt(cb) {
    return this.on(Events.TransitionHalt, cb);
  }
  onTransitionStop(cb) {
    return this.on(Events.TransitionStop, cb);
  }
  onTransitionEnd(cb) {
    return this.on(Events.TransitionEnd, cb);
  }

  onStart(cb) {
    return this.onTransitionStart(cb);
  }
  onHalt(cb) {
    return this.onTransitionHalt(cb);
  }
  onStop(cb) {
    return this.onTransitionStop(cb);
  }
  onEnd(cb) {
    return this.onTransitionEnd(cb);
  }
}
FlowComponent.initClass();

//#############################################################
// Layout helpers

const findPossibleHeader = function (layer) {
  let child;
  let candidate = null;

  for (child of Array.from(layer.children)) {
    var attachedLeft =
      child.x === 0 ||
      (child.constraintValues != null
        ? child.constraintValues.left
        : undefined) === 0;
    var atttachedRight =
      child.width === layer.width ||
      (child.constraintValues != null
        ? child.constraintValues.right
        : undefined) === 0;
    var attachedTop =
      child.y === 0 ||
      (child.constraintValues != null
        ? child.constraintValues.top
        : undefined) === 0;
    if (attachedLeft && atttachedRight && attachedTop) {
      if (candidate) {
        return;
      }
      candidate = child;
    }
  }

  if (!candidate) {
    return;
  }

  for (child of Array.from(layer.children)) {
    if (candidate === child) {
      continue;
    }
    if (child.minY < candidate.maxY) {
      return;
    }
  }

  return candidate;
};

const findPossibleFooter = function (layer) {
  let child;
  let candidate = null;

  for (child of Array.from(layer.children)) {
    var attachedLeft =
      child.x === 0 ||
      (child.constraintValues != null
        ? child.constraintValues.left
        : undefined) === 0;
    var atttachedRight =
      child.width === layer.width ||
      (child.constraintValues != null
        ? child.constraintValues.right
        : undefined) === 0;
    var attachedBottom =
      child.maxY === layer.height ||
      (child.constraintValues != null
        ? child.constraintValues.bottom
        : undefined) === 0;
    if (attachedLeft && atttachedRight && attachedBottom) {
      if (candidate) {
        return;
      }
      candidate = child;
    }
  }

  if (!candidate) {
    return;
  }

  for (child of Array.from(layer.children)) {
    if (candidate === child) {
      continue;
    }
    if (child.maxY > candidate.minY) {
      return;
    }
  }

  return candidate;
};

const findHeader = function (layer) {
  const header = findPossibleHeader(layer);
  const footer = findPossibleFooter(layer);

  if (header && footer) {
    if (header.maxY === footer.minY) {
      if (header.height >= footer.height) {
        return;
      }
    }
  }

  return header;
};

const findFooter = function (layer) {
  const header = findPossibleHeader(layer);
  const footer = findPossibleFooter(layer);

  if (header && footer) {
    if (header.maxY === footer.minY) {
      if (footer.height >= header.height) {
        return;
      }
    }
  }

  return footer;
};

const findBody = function (layer, header, footer) {
  if (!header && !footer) {
    return;
  }

  for (var child of Array.from(layer.children)) {
    if (child === header) {
      continue;
    }
    if (child === footer) {
      continue;
    }

    if (child.x === 0 && child.width === layer.width) {
      if (
        header &&
        footer &&
        child.minY === header.maxY &&
        child.maxY === footer.minY
      ) {
        return child;
      } else if (
        header &&
        child.minY === header.maxY &&
        child.maxY === layer.height
      ) {
        return child;
      } else if (footer && child.minY === 0 && child.maxY === footer.minY) {
        return child;
      }
    }
  }
};

const guessBodyFrame = function (layer, header, footer) {
  let frame;
  if (!header && !footer) {
    return;
  }
  if (
    (header != null ? header.maxY : undefined) ===
    (footer != null ? footer.minY : undefined)
  ) {
    return;
  }

  if (header && footer) {
    frame = {
      x: 0,
      y: header.height,
      width: layer.width,
      height: layer.height - header.height - footer.height,
    };
  } else if (header) {
    frame = {
      x: 0,
      y: header.height,
      width: layer.width,
      height: layer.height - header.height,
    };
  } else if (footer) {
    frame = {
      x: 0,
      y: 0,
      width: layer.width,
      height: layer.height - footer.height,
    };
  } else {
    return;
  }

  if (((header != null ? header.height : undefined) || 0) > frame.height) {
    return;
  }
  if (((footer != null ? footer.height : undefined) || 0) > frame.height) {
    return;
  }

  return frame;
};

var layoutPage = function (layer, size) {
  let bodyFrame;
  const header = findHeader(layer);
  const footer = findFooter(layer);
  if (!header && !footer) {
    return layer;
  }

  let body = findBody(layer, header, footer);

  if (!body) {
    bodyFrame = guessBodyFrame(layer, header, footer);

    if (bodyFrame) {
      body = new Layer({
        frame: bodyFrame,
        backgroundColor: null,
      });

      for (var child of Array.from(layer.children)) {
        if (child === header) {
          continue;
        }
        if (child === footer) {
          continue;
        }
        child.setParentPreservingConstraintValues(body);
        var headerHeight = (header != null ? header.height : undefined) || 0;
        if (child.constraintValues != null) {
          if (
            (child.constraintValues != null
              ? child.constraintValues.top
              : undefined) != null
          ) {
            if (child.constraintValues != null) {
              child.constraintValues.top -= headerHeight;
            }
            child.layout();
          }
        } else {
          child.y -= headerHeight;
        }
      }
    }
  }

  if (!body) {
    return layer;
  }

  bodyFrame = body.frame;
  bodyFrame.width = size.width;
  bodyFrame.height =
    size.height -
    ((header != null ? header.height : undefined) || 0) -
    ((footer != null ? footer.height : undefined) || 0);

  body.point = 0;
  // Not scroll vertically if there's a header or footer
  body.width = size.width;

  const scroll = layoutScroll(body, bodyFrame);
  scroll.parent = layer;
  scroll.frame = bodyFrame;

  layer.size = size;

  if ((footer != null ? footer.maxY : undefined) > size.height) {
    footer.maxY = size.height;
  }

  if (header != null) {
    header.bringToFront();
  }
  if (footer != null) {
    footer.bringToFront();
  }

  return layer;
};

var layoutScroll = function (layer, size) {
  if (layer.width <= size.width && layer.height <= size.height) {
    return layer;
  }

  const scroll = new ScrollComponent({
    size,
    name: "scroll",
  });

  const { height } = layer;
  scroll.propagateEvents = false;

  const constraints = layer.constraintValues;

  layer.point = 0;
  layer.parent = scroll.content;
  layer.constraintValues = constraints;

  scroll.scrollHorizontal = layer.maxX > size.width;
  scroll.scrollVertical = layer.maxY > size.height;

  return scroll;
};

var Transitions = {};

Transitions.show = function (nav, layerA, layerB, overlay) {
  let transition;
  const options = { curve: "spring(300, 35, 0)" };
  return (transition = {
    layerA: {
      show: { options, x: 0, y: 0 },
      hide: {
        options,
        x: 0 - (layerA != null ? layerA.width : undefined) / 2,
        y: 0,
      },
    },
    layerB: {
      show: { options, x: 0, y: 0 },
      hide: { options, x: layerB.width, y: 0 },
    },
  });
};

Transitions.overlayCenter = function (nav, layerA, layerB, overlay) {
  let transition;
  return (transition = {
    layerB: {
      show: {
        options: { curve: "spring(500, 35, 0)" },
        x: Align.center,
        y: Align.center,
        scale: 1.0,
        opacity: 1,
      },
      hide: {
        options: { curve: "spring(500, 35, 0)" },
        x: Align.center,
        y: Align.center,
        scale: 0.5,
        opacity: 0,
      },
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: nav.size,
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: nav.size },
    },
  });
};

Transitions.overlayLeft = function (nav, layerA, layerB, overlay) {
  let transition;
  return (transition = {
    layerB: {
      show: { options: { curve: "spring(300, 35, 0)" }, y: 0, x: 0 },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: 0 - (layerB != null ? layerB.width : undefined),
      },
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: nav.size,
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: nav.size },
    },
  });
};

Transitions.overlayRight = function (nav, layerA, layerB, overlay) {
  let transition;
  return (transition = {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x:
          (nav != null ? nav.width : undefined) -
          (layerB != null ? layerB.width : undefined),
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: nav != null ? nav.width : undefined,
      },
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: nav.size,
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: nav.size },
    },
  });
};

Transitions.overlayTop = function (nav, layerA, layerB, overlay) {
  let transition;
  return (transition = {
    layerB: {
      show: { options: { curve: "spring(300, 35, 0)" }, x: Align.center, y: 0 },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        maxY: 0,
      },
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: nav.size,
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: nav.size },
    },
  });
};

Transitions.overlayBottom = function (nav, layerA, layerB, overlay) {
  let transition;
  return (transition = {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y:
          (nav != null ? nav.height : undefined) -
          (layerB != null ? layerB.height : undefined),
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y: nav != null ? nav.height : undefined,
      },
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: nav.size,
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: nav.size },
    },
  });
};

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined;
}
