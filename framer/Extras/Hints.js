import { _ } from "../Underscore.js";
import { Context } from "../Context.js";
import { Events } from "../Events.js";
import Utils from "../Utils.js";

let hints = null;

export default class Hints {
  _context = null;
  _target = null;
  _framerContext = null;

  constructor(framerContext) {
    this._framerContext = framerContext;
    this._handleDown = this._handleDown.bind(this);
    this._handleUp = this._handleUp.bind(this);

    this._context = new Context({ name: "Hints" });
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

    const currentContext = this._framerContext || (typeof Framer !== 'undefined' ? Framer.CurrentContext : null);
    if (!currentContext) return;

    const layer = currentContext.layerForElement(this._target);

    if (!layer) {
      for (const context of Context.all()) {
        const defaultContext = typeof Framer !== 'undefined' ? Framer.DefaultContext : null;
        if (
          context !== defaultContext &&
          context !== currentContext &&
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
    if (typeof Framer === 'undefined') return false;
    return Framer.Preloader?.isLoading === true;
  }

  showHints() {
    const currentContext = this._framerContext || (typeof Framer !== 'undefined' ? Framer.CurrentContext : null);
    if (!currentContext) return;

    this._context.run(() => {
      _.invokeMap(currentContext.rootLayers, "_showHint");
    });
  }

  destroy() {
    this._context?.destroy();
  }
}

export const enable = (framerContext) => {
  if (hints) return hints;
  hints = new Hints(framerContext);
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
