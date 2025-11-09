const handleScrollingLayerTouchMove = (event) => event.stopPropagation();

const handleScrollingLayerTouchStart = function () {
  const element = this._element;
  const startTopScroll = element.scrollTop;

  if (startTopScroll <= 0) {
    element.scrollTop = 1;
  }

  if (startTopScroll + element.offsetHeight >= element.scrollHeight) {
    element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
  }
};

export class MobileScrollFixLayer extends Framer.Layer {
  constructor(options) {
    super(options);
    this._updateScrollListeners = this._updateScrollListeners.bind(this);

    // Only apply to base Layer, not Scroll/Page components
    if (this.constructor.name === "Layer") {
      this.on("change:scrollVertical", this._updateScrollListeners);
      this._updateScrollListeners();
    }
  }

  _updateScrollListeners() {
    if (this.scrollVertical === true) {
      this.on("touchmove", handleScrollingLayerTouchMove);
      this.on("touchstart", handleScrollingLayerTouchStart);
    } else {
      this.off("touchmove", handleScrollingLayerTouchMove);
      this.off("touchstart", handleScrollingLayerTouchStart);
    }
  }

  toInspect(...args) {
    return this.constructor.name === "MobileScrollFixLayer"
      ? super.toInspect("Layer")
      : super.toInspect(...args);
  }
}

export const enableMobileScrollFix = () => {
  document.ontouchmove = (event) => {
    if (event.target === document.body) {
      event.preventDefault();
    }
  };
};

export default MobileScrollFixLayer;
