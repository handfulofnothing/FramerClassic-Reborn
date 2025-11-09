/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
exports.enable = function(module) {

	if (module == null) { module = window; }
	const ClassWrapper = Klass => (function(...args) {
		return this.prototype = new Klass(...Array.from(args || []));
	});

	module.Frame = ClassWrapper(Framer.Frame);
	module.Layer = ClassWrapper(Framer.Layer);
	module.BackgroundLayer = ClassWrapper(Framer.BackgroundLayer);
	module.VideoLayer = ClassWrapper(Framer.VideoLayer);
	return module.Animation = ClassWrapper(Framer.Animation);
};
