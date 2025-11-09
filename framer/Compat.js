import { Layer } from "./Layer.js";

const compatWarning = (msg) => console.warn(msg);

const compatProperty = (name, originalName) => ({
  enumerable: false,
  get() {
    compatWarning(`${originalName} is a deprecated property`);
    return this[name];
  },
  set(value) {
    compatWarning(`${originalName} is a deprecated property`);
    this[name] = value;
  },
});

export class CompatLayer extends Layer {
  constructor(options = {}) {
    if (options.superView) {
      options.parent = options.superView;
    }
    super(options);
  }

  addSubView(layer) {
    return this.addChild(layer);
  }
  removeSubView(layer) {
    return this.removeChild(layer);
  }

  get superView() {
    return this.parent;
  }
  set superView(value) {
    compatWarning("superView is deprecated");
    this.parent = value;
  }

  get subViews() {
    return this.children;
  }
  set subViews(value) {
    compatWarning("subViews is deprecated"); /* no-op */
  }

  get siblingViews() {
    return this.siblingLayers;
  }
  set siblingViews(value) {
    compatWarning("siblingViews is deprecated"); /* no-op */
  }
}

export class CompatView extends CompatLayer {
  constructor(options = {}) {
    compatWarning("Views are now called Layers");
    super(options);
  }
}

export class CompatImageView extends CompatView {}

export class CompatScrollView extends CompatView {
  constructor(...args) {
    super(...args);
    this.scroll = true;
  }
}

// Expose globally for legacy support
window.Layer = CompatLayer;
window.View = CompatView;
window.ImageView = CompatImageView;
window.ScrollView = CompatScrollView;

// Utils alias for legacy Framer 2 code
window.utils = window.Utils;
