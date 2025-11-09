/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// This is a subset polyfill for ES6’s Proxy
// Because we only use it for setters, the only callback available is when
// a (sub)property is set.

exports.LayerPropertyProxy = class LayerPropertyProxy {
	constructor(target, callback) {
		const proxy = this;
		const getter = function(prop) {
			return this[prop];
		};
		const setter = function(prop, value) {
			return callback(this, prop, value, proxy);
		};
		for (var prop of Array.from(Object.getOwnPropertyNames(target))) {
			var targetDesc = Object.getOwnPropertyDescriptor(target, prop);
			var desc = {
				enumerable: targetDesc.enumerable,
				get: getter.bind(target, prop),
				set: setter.bind(target, prop)
			};
			Object.defineProperty(proxy, prop, desc);
		}
		proxy.__proto__ = target.__proto__;
	}
};
