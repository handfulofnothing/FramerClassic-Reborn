export class LayerPropertyProxy {
  constructor(target, callback) {
    const proxy = this;
    const getter = function (prop) {
      return this[prop];
    };
    const setter = function (prop, value) {
      return callback(this, prop, value, proxy);
    };
    for (var prop of Array.from(Object.getOwnPropertyNames(target))) {
      var targetDesc = Object.getOwnPropertyDescriptor(target, prop);
      var desc = {
        enumerable: targetDesc.enumerable,
        get: getter.bind(target, prop),
        set: setter.bind(target, prop),
      };
      Object.defineProperty(proxy, prop, desc);
    }
    proxy.__proto__ = target.__proto__;
  }
}
