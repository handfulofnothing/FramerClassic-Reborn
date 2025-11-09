/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
exports.config = {
	before() {}, 
		// Called before every pages build 
	page(path, file) {
		// Called with every page build and is expecterd to return a context
		return {
			date: new Date(),
			domain: "domain.com",
			path
		};
	}
};