/*
 * decaffeinate suggestions:
 * DS202: Simplify dynamic range loops
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const Cls = (exports.Animator = class Animator {
	static initClass() {
	
		`\
The animator class is a very simple class that
	- Takes a set of input values at setup({input values})
	- Emits an output value for progress (0 -> 1) in value(progress)\
`;
	}

	constructor(options) {
		if (options == null) { options = {}; }
		this.setup(options);
	}

	setup(options) {
		throw Error("Not implemented");
	}

	next(delta) {
		throw Error("Not implemented");
	}

	finished() {
		throw Error("Not implemented");
	}

	values(delta, limit) {
		if (delta == null) { delta = 1/60; }
		if (limit == null) { limit = 100; }
		const values = [];
		for (let i = 0, end = limit, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
			values.push(this.next(delta));
			if (this.finished()) {
				break;
			}
		}
		return values;
	}
});
Cls.initClass();
