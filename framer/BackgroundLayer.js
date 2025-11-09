/*
 * decaffeinate suggestions:
 * DS002: Fix invalid constructor
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const {Layer} = require("./Layer");

`\
Todo: make it work in a parent layer\
`;

exports.BackgroundLayer = class BackgroundLayer extends Layer {

	constructor(options) {
		this.layout = this.layout.bind(this);
		if (options == null) { options = {}; }
		if (options.backgroundColor == null) { options.backgroundColor = "#fff"; }
		console.warn(`BackgroundLayer is deprecated, please use\n\nScreen.backgroundColor = \"${options.backgroundColor}\"\n\ninstead.`);

		super(options);

		this.sendToBack();
		this.layout();
		this._context.domEventManager.wrap(window).addEventListener("resize", this.layout);
		if (Framer.Device != null) {
			Framer.Device.on("change:orientation", this.layout);
		}
	}

	layout() {
		if (this.parent) {
			return this.frame = this.parent.frame;
		} else {
			return this.frame = this._context.frame;
		}
	}
};
