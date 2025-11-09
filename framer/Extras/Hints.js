import { Context } from "../Context";
import Utils from "../Utils";

let hints = null;

export default class Hints {
  _context = null;
  _target = null;

  constructor() {
    this._handleDown = this._handleDown.bind(this);
    this._handleUp = this._handleUp.bind(this);

    this._context = new Framer.Context({ name: "Hints" });
    this._context.index = 10000;

    this._context.run(() => {
      const wrappedDoc = Events.wrap(document);
      wrappedDoc.addEventListener(Events.TouchStart, this._handleDown, true);
      wrappedDoc.addEventListener(Events.TouchEnd, this._handleUp, true);
    });
  }

  _handleDown(event) {
    if (this._isPreloading()) return;
    this._target = event.target;
  }

  _handleUp(event) {
    if (this._isPreloading()) return;

    const layer = Framer.CurrentContext.layerForElement(this._target);

    if (!layer) {
      for (const context of Context.all()) {
        if (
          context !== Framer.DefaultContext &&
          context !== Framer.CurrentContext &&
          context.layerForElement(this._target)
        ) {
          return;
        }
      }
    }

    if (layer?.willSeemToDoSomething()) return;

    this.showHints();
  }

  _isPreloading() {
    return Framer.Preloader?.isLoading === true;
  }

  showHints() {
    const context = Framer.CurrentContext;
    this._context.run(() => {
      _.invokeMap(context.rootLayers, "_showHint");
    });
  }

  destroy() {
    this._context?.destroy();
  }
}

export const enable = () => {
  if (hints) return hints;
  hints = new Hints(Framer.CurrentContext);
  return hints;
};

export const disable = () => {
  if (!hints) return;
  hints.destroy();
  hints = null;
};

export const showHints = () => {
  if (!hints) return;
  Utils.delay(0.5, () => hints.showHints());
};
