/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Context} = require("../Context");

class Hints {

	constructor() {

		this._handleDown = this._handleDown.bind(this);
		this._handleUp = this._handleUp.bind(this);
		this._context = new Framer.Context({name: "Hints"});
		this._context.index = 10000;

		this._context.run(() => {
			// Events.TouchStart and TouchEnd are mapped to Mouse or Pointer events automatically
			let capture;
			Events.wrap(document).addEventListener(Events.TouchStart, this._handleDown, (capture=true));
			return Events.wrap(document).addEventListener(Events.TouchEnd, this._handleUp, (capture=true));
		});
	}

	_handleDown(event) {
		if (this._isPreloading()) { return; }
		return this._target = event.target;
	}

	_handleUp(event) {
		if (this._isPreloading()) { return; }

		// See what layer we actually tapped
		const layer = Framer.CurrentContext.layerForElement(this._target);

		// If this is not a layer in this context, we see if it belongs
		// to another. If so we don't really have to throw a hint, because
		// you are very likely clicking on print or share info.
		if (!layer) {
			for (var context of Array.from(Context.all())) {
				if (context === Framer.DefaultContext) { continue; }
				if (context === Framer.CurrentContext) { continue; }
				if (context.layerForElement(this._target)) { return; }
			}
		}

		// If this is a layer with interaction, we do not show any hints
		if (layer && layer.willSeemToDoSomething()) {
			return;
		}

		return this.showHints();
	}

	_isPreloading() {
		return (Framer.Preloader != null ? Framer.Preloader.isLoading : undefined) === true;
	}

	showHints() {
		const context = Framer.CurrentContext;
		return this._context.run(() => _.invokeMap(context.rootLayers, "_showHint"));
	}

	destroy() {
		return this._context.destroy();
	}
}

let hints = null;

exports.enable = () => hints != null ? hints : (hints = new Hints(Framer.CurrentContext));

exports.disable = function() {
	if (!hints) { return; }
	hints.destroy();
	return hints = null;
};

exports.showHints = function() {
	if (!hints) { return; }
	return Utils.delay(0.5, () => hints.showHints());
};
