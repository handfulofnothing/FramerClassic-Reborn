var Oe = Object.defineProperty;
var ke = (t, e, i) => e in t ? Oe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var F = (t, e, i) => ke(t, typeof e != "symbol" ? e + "" : e, i);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global, freeSelf = typeof self == "object" && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")(), Symbol$1 = root.Symbol, objectProto$s = Object.prototype, hasOwnProperty$o = objectProto$s.hasOwnProperty, nativeObjectToString$3 = objectProto$s.toString, symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(t) {
  var e = hasOwnProperty$o.call(t, symToStringTag$1), i = t[symToStringTag$1];
  try {
    t[symToStringTag$1] = void 0;
    var n = !0;
  } catch {
  }
  var r = nativeObjectToString$3.call(t);
  return n && (e ? t[symToStringTag$1] = i : delete t[symToStringTag$1]), r;
}
var objectProto$r = Object.prototype, nativeObjectToString$2 = objectProto$r.toString;
function objectToString(t) {
  return nativeObjectToString$2.call(t);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]", symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(t) {
  return t == null ? t === void 0 ? undefinedTag : nullTag : symToStringTag && symToStringTag in Object(t) ? getRawTag(t) : objectToString(t);
}
function isObjectLike(t) {
  return t != null && typeof t == "object";
}
var symbolTag$3 = "[object Symbol]";
function isSymbol(t) {
  return typeof t == "symbol" || isObjectLike(t) && baseGetTag(t) == symbolTag$3;
}
var NAN$2 = NaN;
function baseToNumber(t) {
  return typeof t == "number" ? t : isSymbol(t) ? NAN$2 : +t;
}
function arrayMap(t, e) {
  for (var i = -1, n = t == null ? 0 : t.length, r = Array(n); ++i < n; )
    r[i] = e(t[i], i, t);
  return r;
}
var isArray = Array.isArray, symbolProto$2 = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto$2 ? symbolProto$2.toString : void 0;
function baseToString(t) {
  if (typeof t == "string")
    return t;
  if (isArray(t))
    return arrayMap(t, baseToString) + "";
  if (isSymbol(t))
    return symbolToString ? symbolToString.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function createMathOperation(t, e) {
  return function(i, n) {
    var r;
    if (i === void 0 && n === void 0)
      return e;
    if (i !== void 0 && (r = i), n !== void 0) {
      if (r === void 0)
        return n;
      typeof i == "string" || typeof n == "string" ? (i = baseToString(i), n = baseToString(n)) : (i = baseToNumber(i), n = baseToNumber(n)), r = t(i, n);
    }
    return r;
  };
}
var add = createMathOperation(function(t, e) {
  return t + e;
}, 0), reWhitespace = /\s/;
function trimmedEndIndex(t) {
  for (var e = t.length; e-- && reWhitespace.test(t.charAt(e)); )
    ;
  return e;
}
var reTrimStart$2 = /^\s+/;
function baseTrim(t) {
  return t && t.slice(0, trimmedEndIndex(t) + 1).replace(reTrimStart$2, "");
}
function isObject(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var NAN$1 = NaN, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
function toNumber(t) {
  if (typeof t == "number")
    return t;
  if (isSymbol(t))
    return NAN$1;
  if (isObject(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = isObject(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = baseTrim(t);
  var i = reIsBinary.test(t);
  return i || reIsOctal.test(t) ? freeParseInt(t.slice(2), i ? 2 : 8) : reIsBadHex.test(t) ? NAN$1 : +t;
}
var INFINITY$3 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = toNumber(t), t === INFINITY$3 || t === -INFINITY$3) {
    var e = t < 0 ? -1 : 1;
    return e * MAX_INTEGER;
  }
  return t === t ? t : 0;
}
function toInteger(t) {
  var e = toFinite(t), i = e % 1;
  return e === e ? i ? e - i : e : 0;
}
var FUNC_ERROR_TEXT$b = "Expected a function";
function after(t, e) {
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT$b);
  return t = toInteger(t), function() {
    if (--t < 1)
      return e.apply(this, arguments);
  };
}
function identity(t) {
  return t;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(t) {
  if (!isObject(t))
    return !1;
  var e = baseGetTag(t);
  return e == funcTag$2 || e == genTag$1 || e == asyncTag || e == proxyTag;
}
var coreJsData = root["__core-js_shared__"], maskSrcKey = (function() {
  var t = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
})();
function isMasked(t) {
  return !!maskSrcKey && maskSrcKey in t;
}
var funcProto$2 = Function.prototype, funcToString$2 = funcProto$2.toString;
function toSource(t) {
  if (t != null) {
    try {
      return funcToString$2.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g, reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto$1 = Function.prototype, objectProto$q = Object.prototype, funcToString$1 = funcProto$1.toString, hasOwnProperty$n = objectProto$q.hasOwnProperty, reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$n).replace(reRegExpChar$1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(t) {
  if (!isObject(t) || isMasked(t))
    return !1;
  var e = isFunction(t) ? reIsNative : reIsHostCtor;
  return e.test(toSource(t));
}
function getValue(t, e) {
  return t?.[e];
}
function getNative(t, e) {
  var i = getValue(t, e);
  return baseIsNative(i) ? i : void 0;
}
var WeakMap = getNative(root, "WeakMap"), metaMap = WeakMap && new WeakMap(), baseSetData = metaMap ? function(t, e) {
  return metaMap.set(t, e), t;
} : identity, objectCreate = Object.create, baseCreate = /* @__PURE__ */ (function() {
  function t() {
  }
  return function(e) {
    if (!isObject(e))
      return {};
    if (objectCreate)
      return objectCreate(e);
    t.prototype = e;
    var i = new t();
    return t.prototype = void 0, i;
  };
})();
function createCtor(t) {
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return new t();
      case 1:
        return new t(e[0]);
      case 2:
        return new t(e[0], e[1]);
      case 3:
        return new t(e[0], e[1], e[2]);
      case 4:
        return new t(e[0], e[1], e[2], e[3]);
      case 5:
        return new t(e[0], e[1], e[2], e[3], e[4]);
      case 6:
        return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
      case 7:
        return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
    }
    var i = baseCreate(t.prototype), n = t.apply(i, e);
    return isObject(n) ? n : i;
  };
}
var WRAP_BIND_FLAG$7 = 1;
function createBind(t, e, i) {
  var n = e & WRAP_BIND_FLAG$7, r = createCtor(t);
  function s() {
    var a = this && this !== root && this instanceof s ? r : t;
    return a.apply(n ? i : this, arguments);
  }
  return s;
}
function apply(t, e, i) {
  switch (i.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, i[0]);
    case 2:
      return t.call(e, i[0], i[1]);
    case 3:
      return t.call(e, i[0], i[1], i[2]);
  }
  return t.apply(e, i);
}
var nativeMax$g = Math.max;
function composeArgs(t, e, i, n) {
  for (var r = -1, s = t.length, a = i.length, o = -1, l = e.length, u = nativeMax$g(s - a, 0), c = Array(l + u), f = !n; ++o < l; )
    c[o] = e[o];
  for (; ++r < a; )
    (f || r < s) && (c[i[r]] = t[r]);
  for (; u--; )
    c[o++] = t[r++];
  return c;
}
var nativeMax$f = Math.max;
function composeArgsRight(t, e, i, n) {
  for (var r = -1, s = t.length, a = -1, o = i.length, l = -1, u = e.length, c = nativeMax$f(s - o, 0), f = Array(c + u), p = !n; ++r < c; )
    f[r] = t[r];
  for (var y = r; ++l < u; )
    f[y + l] = e[l];
  for (; ++a < o; )
    (p || r < s) && (f[y + i[a]] = t[r++]);
  return f;
}
function countHolders(t, e) {
  for (var i = t.length, n = 0; i--; )
    t[i] === e && ++n;
  return n;
}
function baseLodash() {
}
var MAX_ARRAY_LENGTH$6 = 4294967295;
function LazyWrapper(t) {
  this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH$6, this.__views__ = [];
}
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
function noop() {
}
var getData = metaMap ? function(t) {
  return metaMap.get(t);
} : noop, realNames = {}, objectProto$p = Object.prototype, hasOwnProperty$m = objectProto$p.hasOwnProperty;
function getFuncName(t) {
  for (var e = t.name + "", i = realNames[e], n = hasOwnProperty$m.call(realNames, e) ? i.length : 0; n--; ) {
    var r = i[n], s = r.func;
    if (s == null || s == t)
      return r.name;
  }
  return e;
}
function LodashWrapper(t, e) {
  this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e, this.__index__ = 0, this.__values__ = void 0;
}
LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
function copyArray(t, e) {
  var i = -1, n = t.length;
  for (e || (e = Array(n)); ++i < n; )
    e[i] = t[i];
  return e;
}
function wrapperClone(t) {
  if (t instanceof LazyWrapper)
    return t.clone();
  var e = new LodashWrapper(t.__wrapped__, t.__chain__);
  return e.__actions__ = copyArray(t.__actions__), e.__index__ = t.__index__, e.__values__ = t.__values__, e;
}
var objectProto$o = Object.prototype, hasOwnProperty$l = objectProto$o.hasOwnProperty;
function lodash(t) {
  if (isObjectLike(t) && !isArray(t) && !(t instanceof LazyWrapper)) {
    if (t instanceof LodashWrapper)
      return t;
    if (hasOwnProperty$l.call(t, "__wrapped__"))
      return wrapperClone(t);
  }
  return new LodashWrapper(t);
}
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;
function isLaziable(t) {
  var e = getFuncName(t), i = lodash[e];
  if (typeof i != "function" || !(e in LazyWrapper.prototype))
    return !1;
  if (t === i)
    return !0;
  var n = getData(i);
  return !!n && t === n[0];
}
var HOT_COUNT = 800, HOT_SPAN = 16, nativeNow = Date.now;
function shortOut(t) {
  var e = 0, i = 0;
  return function() {
    var n = nativeNow(), r = HOT_SPAN - (n - i);
    if (i = n, r > 0) {
      if (++e >= HOT_COUNT)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var setData = shortOut(baseSetData), reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
function getWrapDetails(t) {
  var e = t.match(reWrapDetails);
  return e ? e[1].split(reSplitDetails) : [];
}
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
function insertWrapDetails(t, e) {
  var i = e.length;
  if (!i)
    return t;
  var n = i - 1;
  return e[n] = (i > 1 ? "& " : "") + e[n], e = e.join(i > 2 ? ", " : " "), t.replace(reWrapComment, `{
/* [wrapped with ` + e + `] */
`);
}
function constant(t) {
  return function() {
    return t;
  };
}
var defineProperty = (function() {
  try {
    var t = getNative(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
})(), baseSetToString = defineProperty ? function(t, e) {
  return defineProperty(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: constant(e),
    writable: !0
  });
} : identity, setToString = shortOut(baseSetToString);
function arrayEach(t, e) {
  for (var i = -1, n = t == null ? 0 : t.length; ++i < n && e(t[i], i, t) !== !1; )
    ;
  return t;
}
function baseFindIndex(t, e, i, n) {
  for (var r = t.length, s = i + (n ? 1 : -1); n ? s-- : ++s < r; )
    if (e(t[s], s, t))
      return s;
  return -1;
}
function baseIsNaN(t) {
  return t !== t;
}
function strictIndexOf(t, e, i) {
  for (var n = i - 1, r = t.length; ++n < r; )
    if (t[n] === e)
      return n;
  return -1;
}
function baseIndexOf(t, e, i) {
  return e === e ? strictIndexOf(t, e, i) : baseFindIndex(t, baseIsNaN, i);
}
function arrayIncludes(t, e) {
  var i = t == null ? 0 : t.length;
  return !!i && baseIndexOf(t, e, 0) > -1;
}
var WRAP_BIND_FLAG$6 = 1, WRAP_BIND_KEY_FLAG$5 = 2, WRAP_CURRY_FLAG$6 = 8, WRAP_CURRY_RIGHT_FLAG$3 = 16, WRAP_PARTIAL_FLAG$6 = 32, WRAP_PARTIAL_RIGHT_FLAG$3 = 64, WRAP_ARY_FLAG$4 = 128, WRAP_REARG_FLAG$3 = 256, WRAP_FLIP_FLAG$2 = 512, wrapFlags = [
  ["ary", WRAP_ARY_FLAG$4],
  ["bind", WRAP_BIND_FLAG$6],
  ["bindKey", WRAP_BIND_KEY_FLAG$5],
  ["curry", WRAP_CURRY_FLAG$6],
  ["curryRight", WRAP_CURRY_RIGHT_FLAG$3],
  ["flip", WRAP_FLIP_FLAG$2],
  ["partial", WRAP_PARTIAL_FLAG$6],
  ["partialRight", WRAP_PARTIAL_RIGHT_FLAG$3],
  ["rearg", WRAP_REARG_FLAG$3]
];
function updateWrapDetails(t, e) {
  return arrayEach(wrapFlags, function(i) {
    var n = "_." + i[0];
    e & i[1] && !arrayIncludes(t, n) && t.push(n);
  }), t.sort();
}
function setWrapToString(t, e, i) {
  var n = e + "";
  return setToString(t, insertWrapDetails(n, updateWrapDetails(getWrapDetails(n), i)));
}
var WRAP_CURRY_BOUND_FLAG$1 = 4, WRAP_CURRY_FLAG$5 = 8, WRAP_PARTIAL_FLAG$5 = 32, WRAP_PARTIAL_RIGHT_FLAG$2 = 64;
function createRecurry(t, e, i, n, r, s, a, o, l, u) {
  var c = e & WRAP_CURRY_FLAG$5, f = c ? a : void 0, p = c ? void 0 : a, y = c ? s : void 0, b = c ? void 0 : s;
  e |= c ? WRAP_PARTIAL_FLAG$5 : WRAP_PARTIAL_RIGHT_FLAG$2, e &= ~(c ? WRAP_PARTIAL_RIGHT_FLAG$2 : WRAP_PARTIAL_FLAG$5), e & WRAP_CURRY_BOUND_FLAG$1 || (e &= -4);
  var x = [
    t,
    e,
    r,
    y,
    f,
    b,
    p,
    o,
    l,
    u
  ], w = i.apply(void 0, x);
  return isLaziable(t) && setData(w, x), w.placeholder = n, setWrapToString(w, t, e);
}
function getHolder(t) {
  var e = t;
  return e.placeholder;
}
var MAX_SAFE_INTEGER$5 = 9007199254740991, reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(t, e) {
  var i = typeof t;
  return e = e ?? MAX_SAFE_INTEGER$5, !!e && (i == "number" || i != "symbol" && reIsUint.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var nativeMin$e = Math.min;
function reorder(t, e) {
  for (var i = t.length, n = nativeMin$e(e.length, i), r = copyArray(t); n--; ) {
    var s = e[n];
    t[n] = isIndex(s, i) ? r[s] : void 0;
  }
  return t;
}
var PLACEHOLDER$1 = "__lodash_placeholder__";
function replaceHolders(t, e) {
  for (var i = -1, n = t.length, r = 0, s = []; ++i < n; ) {
    var a = t[i];
    (a === e || a === PLACEHOLDER$1) && (t[i] = PLACEHOLDER$1, s[r++] = i);
  }
  return s;
}
var WRAP_BIND_FLAG$5 = 1, WRAP_BIND_KEY_FLAG$4 = 2, WRAP_CURRY_FLAG$4 = 8, WRAP_CURRY_RIGHT_FLAG$2 = 16, WRAP_ARY_FLAG$3 = 128, WRAP_FLIP_FLAG$1 = 512;
function createHybrid(t, e, i, n, r, s, a, o, l, u) {
  var c = e & WRAP_ARY_FLAG$3, f = e & WRAP_BIND_FLAG$5, p = e & WRAP_BIND_KEY_FLAG$4, y = e & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2), b = e & WRAP_FLIP_FLAG$1, x = p ? void 0 : createCtor(t);
  function w() {
    for (var A = arguments.length, E = Array(A), O = A; O--; )
      E[O] = arguments[O];
    if (y)
      var L = getHolder(w), k = countHolders(E, L);
    if (n && (E = composeArgs(E, n, r, y)), s && (E = composeArgsRight(E, s, a, y)), A -= k, y && A < u) {
      var I = replaceHolders(E, L);
      return createRecurry(
        t,
        e,
        createHybrid,
        w.placeholder,
        i,
        E,
        I,
        o,
        l,
        u - A
      );
    }
    var M = f ? i : this, U = p ? M[t] : t;
    return A = E.length, o ? E = reorder(E, o) : b && A > 1 && E.reverse(), c && l < A && (E.length = l), this && this !== root && this instanceof w && (U = x || createCtor(U)), U.apply(M, E);
  }
  return w;
}
function createCurry(t, e, i) {
  var n = createCtor(t);
  function r() {
    for (var s = arguments.length, a = Array(s), o = s, l = getHolder(r); o--; )
      a[o] = arguments[o];
    var u = s < 3 && a[0] !== l && a[s - 1] !== l ? [] : replaceHolders(a, l);
    if (s -= u.length, s < i)
      return createRecurry(
        t,
        e,
        createHybrid,
        r.placeholder,
        void 0,
        a,
        u,
        void 0,
        void 0,
        i - s
      );
    var c = this && this !== root && this instanceof r ? n : t;
    return apply(c, this, a);
  }
  return r;
}
var WRAP_BIND_FLAG$4 = 1;
function createPartial(t, e, i, n) {
  var r = e & WRAP_BIND_FLAG$4, s = createCtor(t);
  function a() {
    for (var o = -1, l = arguments.length, u = -1, c = n.length, f = Array(c + l), p = this && this !== root && this instanceof a ? s : t; ++u < c; )
      f[u] = n[u];
    for (; l--; )
      f[u++] = arguments[++o];
    return apply(p, r ? i : this, f);
  }
  return a;
}
var PLACEHOLDER = "__lodash_placeholder__", WRAP_BIND_FLAG$3 = 1, WRAP_BIND_KEY_FLAG$3 = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG$3 = 8, WRAP_ARY_FLAG$2 = 128, WRAP_REARG_FLAG$2 = 256, nativeMin$d = Math.min;
function mergeData(t, e) {
  var i = t[1], n = e[1], r = i | n, s = r < (WRAP_BIND_FLAG$3 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2), a = n == WRAP_ARY_FLAG$2 && i == WRAP_CURRY_FLAG$3 || n == WRAP_ARY_FLAG$2 && i == WRAP_REARG_FLAG$2 && t[7].length <= e[8] || n == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$2) && e[7].length <= e[8] && i == WRAP_CURRY_FLAG$3;
  if (!(s || a))
    return t;
  n & WRAP_BIND_FLAG$3 && (t[2] = e[2], r |= i & WRAP_BIND_FLAG$3 ? 0 : WRAP_CURRY_BOUND_FLAG);
  var o = e[3];
  if (o) {
    var l = t[3];
    t[3] = l ? composeArgs(l, o, e[4]) : o, t[4] = l ? replaceHolders(t[3], PLACEHOLDER) : e[4];
  }
  return o = e[5], o && (l = t[5], t[5] = l ? composeArgsRight(l, o, e[6]) : o, t[6] = l ? replaceHolders(t[5], PLACEHOLDER) : e[6]), o = e[7], o && (t[7] = o), n & WRAP_ARY_FLAG$2 && (t[8] = t[8] == null ? e[8] : nativeMin$d(t[8], e[8])), t[9] == null && (t[9] = e[9]), t[0] = e[0], t[1] = r, t;
}
var FUNC_ERROR_TEXT$a = "Expected a function", WRAP_BIND_FLAG$2 = 1, WRAP_BIND_KEY_FLAG$2 = 2, WRAP_CURRY_FLAG$2 = 8, WRAP_CURRY_RIGHT_FLAG$1 = 16, WRAP_PARTIAL_FLAG$4 = 32, WRAP_PARTIAL_RIGHT_FLAG$1 = 64, nativeMax$e = Math.max;
function createWrap(t, e, i, n, r, s, a, o) {
  var l = e & WRAP_BIND_KEY_FLAG$2;
  if (!l && typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$a);
  var u = n ? n.length : 0;
  if (u || (e &= -97, n = r = void 0), a = a === void 0 ? a : nativeMax$e(toInteger(a), 0), o = o === void 0 ? o : toInteger(o), u -= r ? r.length : 0, e & WRAP_PARTIAL_RIGHT_FLAG$1) {
    var c = n, f = r;
    n = r = void 0;
  }
  var p = l ? void 0 : getData(t), y = [
    t,
    e,
    i,
    n,
    r,
    c,
    f,
    s,
    a,
    o
  ];
  if (p && mergeData(y, p), t = y[0], e = y[1], i = y[2], n = y[3], r = y[4], o = y[9] = y[9] === void 0 ? l ? 0 : t.length : nativeMax$e(y[9] - u, 0), !o && e & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1) && (e &= -25), !e || e == WRAP_BIND_FLAG$2)
    var b = createBind(t, e, i);
  else e == WRAP_CURRY_FLAG$2 || e == WRAP_CURRY_RIGHT_FLAG$1 ? b = createCurry(t, e, o) : (e == WRAP_PARTIAL_FLAG$4 || e == (WRAP_BIND_FLAG$2 | WRAP_PARTIAL_FLAG$4)) && !r.length ? b = createPartial(t, e, i, n) : b = createHybrid.apply(void 0, y);
  var x = p ? baseSetData : setData;
  return setWrapToString(x(b, y), t, e);
}
var WRAP_ARY_FLAG$1 = 128;
function ary(t, e, i) {
  return e = i ? void 0 : e, e = t && e == null ? t.length : e, createWrap(t, WRAP_ARY_FLAG$1, void 0, void 0, void 0, void 0, e);
}
function baseAssignValue(t, e, i) {
  e == "__proto__" && defineProperty ? defineProperty(t, e, {
    configurable: !0,
    enumerable: !0,
    value: i,
    writable: !0
  }) : t[e] = i;
}
function eq(t, e) {
  return t === e || t !== t && e !== e;
}
var objectProto$n = Object.prototype, hasOwnProperty$k = objectProto$n.hasOwnProperty;
function assignValue(t, e, i) {
  var n = t[e];
  (!(hasOwnProperty$k.call(t, e) && eq(n, i)) || i === void 0 && !(e in t)) && baseAssignValue(t, e, i);
}
function copyObject(t, e, i, n) {
  var r = !i;
  i || (i = {});
  for (var s = -1, a = e.length; ++s < a; ) {
    var o = e[s], l = n ? n(i[o], t[o], o, i, t) : void 0;
    l === void 0 && (l = t[o]), r ? baseAssignValue(i, o, l) : assignValue(i, o, l);
  }
  return i;
}
var nativeMax$d = Math.max;
function overRest(t, e, i) {
  return e = nativeMax$d(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, r = -1, s = nativeMax$d(n.length - e, 0), a = Array(s); ++r < s; )
      a[r] = n[e + r];
    r = -1;
    for (var o = Array(e + 1); ++r < e; )
      o[r] = n[r];
    return o[e] = i(a), apply(t, this, o);
  };
}
function baseRest(t, e) {
  return setToString(overRest(t, e, identity), t + "");
}
var MAX_SAFE_INTEGER$4 = 9007199254740991;
function isLength(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= MAX_SAFE_INTEGER$4;
}
function isArrayLike(t) {
  return t != null && isLength(t.length) && !isFunction(t);
}
function isIterateeCall(t, e, i) {
  if (!isObject(i))
    return !1;
  var n = typeof e;
  return (n == "number" ? isArrayLike(i) && isIndex(e, i.length) : n == "string" && e in i) ? eq(i[e], t) : !1;
}
function createAssigner(t) {
  return baseRest(function(e, i) {
    var n = -1, r = i.length, s = r > 1 ? i[r - 1] : void 0, a = r > 2 ? i[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (r--, s) : void 0, a && isIterateeCall(i[0], i[1], a) && (s = r < 3 ? void 0 : s, r = 1), e = Object(e); ++n < r; ) {
      var o = i[n];
      o && t(e, o, n, s);
    }
    return e;
  });
}
var objectProto$m = Object.prototype;
function isPrototype(t) {
  var e = t && t.constructor, i = typeof e == "function" && e.prototype || objectProto$m;
  return t === i;
}
function baseTimes(t, e) {
  for (var i = -1, n = Array(t); ++i < t; )
    n[i] = e(i);
  return n;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(t) {
  return isObjectLike(t) && baseGetTag(t) == argsTag$3;
}
var objectProto$l = Object.prototype, hasOwnProperty$j = objectProto$l.hasOwnProperty, propertyIsEnumerable$1 = objectProto$l.propertyIsEnumerable, isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(t) {
  return isObjectLike(t) && hasOwnProperty$j.call(t, "callee") && !propertyIsEnumerable$1.call(t, "callee");
};
function getDefaultExportFromCjs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function stubFalse() {
  return !1;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module, moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2, Buffer$1 = moduleExports$2 ? root.Buffer : void 0, nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0, isBuffer = nativeIsBuffer || stubFalse, argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$4 = "[object Boolean]", dateTag$4 = "[object Date]", errorTag$3 = "[object Error]", funcTag$1 = "[object Function]", mapTag$9 = "[object Map]", numberTag$4 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$4 = "[object RegExp]", setTag$9 = "[object Set]", stringTag$4 = "[object String]", weakMapTag$3 = "[object WeakMap]", arrayBufferTag$4 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]", typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = !0;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$4] = typedArrayTags[boolTag$4] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$4] = typedArrayTags[errorTag$3] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$9] = typedArrayTags[numberTag$4] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$4] = typedArrayTags[setTag$9] = typedArrayTags[stringTag$4] = typedArrayTags[weakMapTag$3] = !1;
function baseIsTypedArray(t) {
  return isObjectLike(t) && isLength(t.length) && !!typedArrayTags[baseGetTag(t)];
}
function baseUnary(t) {
  return function(e) {
    return t(e);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module, moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1, freeProcess = moduleExports$1 && freeGlobal.process, nodeUtil = (function() {
  try {
    var t = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    return t || freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch {
  }
})(), nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray, isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray, objectProto$k = Object.prototype, hasOwnProperty$i = objectProto$k.hasOwnProperty;
function arrayLikeKeys(t, e) {
  var i = isArray(t), n = !i && isArguments(t), r = !i && !n && isBuffer(t), s = !i && !n && !r && isTypedArray(t), a = i || n || r || s, o = a ? baseTimes(t.length, String) : [], l = o.length;
  for (var u in t)
    (e || hasOwnProperty$i.call(t, u)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    isIndex(u, l))) && o.push(u);
  return o;
}
function overArg(t, e) {
  return function(i) {
    return t(e(i));
  };
}
var nativeKeys = overArg(Object.keys, Object), objectProto$j = Object.prototype, hasOwnProperty$h = objectProto$j.hasOwnProperty;
function baseKeys(t) {
  if (!isPrototype(t))
    return nativeKeys(t);
  var e = [];
  for (var i in Object(t))
    hasOwnProperty$h.call(t, i) && i != "constructor" && e.push(i);
  return e;
}
function keys(t) {
  return isArrayLike(t) ? arrayLikeKeys(t) : baseKeys(t);
}
var objectProto$i = Object.prototype, hasOwnProperty$g = objectProto$i.hasOwnProperty, assign = createAssigner(function(t, e) {
  if (isPrototype(e) || isArrayLike(e)) {
    copyObject(e, keys(e), t);
    return;
  }
  for (var i in e)
    hasOwnProperty$g.call(e, i) && assignValue(t, i, e[i]);
});
function nativeKeysIn(t) {
  var e = [];
  if (t != null)
    for (var i in Object(t))
      e.push(i);
  return e;
}
var objectProto$h = Object.prototype, hasOwnProperty$f = objectProto$h.hasOwnProperty;
function baseKeysIn(t) {
  if (!isObject(t))
    return nativeKeysIn(t);
  var e = isPrototype(t), i = [];
  for (var n in t)
    n == "constructor" && (e || !hasOwnProperty$f.call(t, n)) || i.push(n);
  return i;
}
function keysIn(t) {
  return isArrayLike(t) ? arrayLikeKeys(t, !0) : baseKeysIn(t);
}
var assignIn = createAssigner(function(t, e) {
  copyObject(e, keysIn(e), t);
}), assignInWith = createAssigner(function(t, e, i, n) {
  copyObject(e, keysIn(e), t, n);
}), assignWith = createAssigner(function(t, e, i, n) {
  copyObject(e, keys(e), t, n);
}), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(t, e) {
  if (isArray(t))
    return !1;
  var i = typeof t;
  return i == "number" || i == "symbol" || i == "boolean" || t == null || isSymbol(t) ? !0 : reIsPlainProp.test(t) || !reIsDeepProp.test(t) || e != null && t in Object(e);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
}
function hashDelete(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__", objectProto$g = Object.prototype, hasOwnProperty$e = objectProto$g.hasOwnProperty;
function hashGet(t) {
  var e = this.__data__;
  if (nativeCreate) {
    var i = e[t];
    return i === HASH_UNDEFINED$2 ? void 0 : i;
  }
  return hasOwnProperty$e.call(e, t) ? e[t] : void 0;
}
var objectProto$f = Object.prototype, hasOwnProperty$d = objectProto$f.hasOwnProperty;
function hashHas(t) {
  var e = this.__data__;
  return nativeCreate ? e[t] !== void 0 : hasOwnProperty$d.call(e, t);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(t, e) {
  var i = this.__data__;
  return this.size += this.has(t) ? 0 : 1, i[t] = nativeCreate && e === void 0 ? HASH_UNDEFINED$1 : e, this;
}
function Hash(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [], this.size = 0;
}
function assocIndexOf(t, e) {
  for (var i = t.length; i--; )
    if (eq(t[i][0], e))
      return i;
  return -1;
}
var arrayProto$5 = Array.prototype, splice$2 = arrayProto$5.splice;
function listCacheDelete(t) {
  var e = this.__data__, i = assocIndexOf(e, t);
  if (i < 0)
    return !1;
  var n = e.length - 1;
  return i == n ? e.pop() : splice$2.call(e, i, 1), --this.size, !0;
}
function listCacheGet(t) {
  var e = this.__data__, i = assocIndexOf(e, t);
  return i < 0 ? void 0 : e[i][1];
}
function listCacheHas(t) {
  return assocIndexOf(this.__data__, t) > -1;
}
function listCacheSet(t, e) {
  var i = this.__data__, n = assocIndexOf(i, t);
  return n < 0 ? (++this.size, i.push([t, e])) : i[n][1] = e, this;
}
function ListCache(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root, "Map");
function mapCacheClear() {
  this.size = 0, this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash()
  };
}
function isKeyable(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function getMapData(t, e) {
  var i = t.__data__;
  return isKeyable(e) ? i[typeof e == "string" ? "string" : "hash"] : i.map;
}
function mapCacheDelete(t) {
  var e = getMapData(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function mapCacheGet(t) {
  return getMapData(this, t).get(t);
}
function mapCacheHas(t) {
  return getMapData(this, t).has(t);
}
function mapCacheSet(t, e) {
  var i = getMapData(this, t), n = i.size;
  return i.set(t, e), this.size += i.size == n ? 0 : 1, this;
}
function MapCache(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.clear(); ++e < i; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT$9 = "Expected a function";
function memoize(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT$9);
  var i = function() {
    var n = arguments, r = e ? e.apply(this, n) : n[0], s = i.cache;
    if (s.has(r))
      return s.get(r);
    var a = t.apply(this, n);
    return i.cache = s.set(r, a) || s, a;
  };
  return i.cache = new (memoize.Cache || MapCache)(), i;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(t) {
  var e = memoize(t, function(n) {
    return i.size === MAX_MEMOIZE_SIZE && i.clear(), n;
  }), i = e.cache;
  return e;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(rePropName, function(i, n, r, s) {
    e.push(r ? s.replace(reEscapeChar, "$1") : n || i);
  }), e;
});
function toString(t) {
  return t == null ? "" : baseToString(t);
}
function castPath(t, e) {
  return isArray(t) ? t : isKey(t, e) ? [t] : stringToPath(toString(t));
}
function toKey(t) {
  if (typeof t == "string" || isSymbol(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -1 / 0 ? "-0" : e;
}
function baseGet(t, e) {
  e = castPath(e, t);
  for (var i = 0, n = e.length; t != null && i < n; )
    t = t[toKey(e[i++])];
  return i && i == n ? t : void 0;
}
function get(t, e, i) {
  var n = t == null ? void 0 : baseGet(t, e);
  return n === void 0 ? i : n;
}
function baseAt(t, e) {
  for (var i = -1, n = e.length, r = Array(n), s = t == null; ++i < n; )
    r[i] = s ? void 0 : get(t, e[i]);
  return r;
}
function arrayPush(t, e) {
  for (var i = -1, n = e.length, r = t.length; ++i < n; )
    t[r + i] = e[i];
  return t;
}
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
function isFlattenable(t) {
  return isArray(t) || isArguments(t) || !!(spreadableSymbol && t && t[spreadableSymbol]);
}
function baseFlatten(t, e, i, n, r) {
  var s = -1, a = t.length;
  for (i || (i = isFlattenable), r || (r = []); ++s < a; ) {
    var o = t[s];
    e > 0 && i(o) ? e > 1 ? baseFlatten(o, e - 1, i, n, r) : arrayPush(r, o) : n || (r[r.length] = o);
  }
  return r;
}
function flatten(t) {
  var e = t == null ? 0 : t.length;
  return e ? baseFlatten(t, 1) : [];
}
function flatRest(t) {
  return setToString(overRest(t, void 0, flatten), t + "");
}
var at = flatRest(baseAt), getPrototype = overArg(Object.getPrototypeOf, Object), objectTag$3 = "[object Object]", funcProto = Function.prototype, objectProto$e = Object.prototype, funcToString = funcProto.toString, hasOwnProperty$c = objectProto$e.hasOwnProperty, objectCtorString = funcToString.call(Object);
function isPlainObject(t) {
  if (!isObjectLike(t) || baseGetTag(t) != objectTag$3)
    return !1;
  var e = getPrototype(t);
  if (e === null)
    return !0;
  var i = hasOwnProperty$c.call(e, "constructor") && e.constructor;
  return typeof i == "function" && i instanceof i && funcToString.call(i) == objectCtorString;
}
var domExcTag = "[object DOMException]", errorTag$2 = "[object Error]";
function isError(t) {
  if (!isObjectLike(t))
    return !1;
  var e = baseGetTag(t);
  return e == errorTag$2 || e == domExcTag || typeof t.message == "string" && typeof t.name == "string" && !isPlainObject(t);
}
var attempt = baseRest(function(t, e) {
  try {
    return apply(t, void 0, e);
  } catch (i) {
    return isError(i) ? i : new Error(i);
  }
}), FUNC_ERROR_TEXT$8 = "Expected a function";
function before(t, e) {
  var i;
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT$8);
  return t = toInteger(t), function() {
    return --t > 0 && (i = e.apply(this, arguments)), t <= 1 && (e = void 0), i;
  };
}
var WRAP_BIND_FLAG$1 = 1, WRAP_PARTIAL_FLAG$3 = 32, bind = baseRest(function(t, e, i) {
  var n = WRAP_BIND_FLAG$1;
  if (i.length) {
    var r = replaceHolders(i, getHolder(bind));
    n |= WRAP_PARTIAL_FLAG$3;
  }
  return createWrap(t, n, e, i, r);
});
bind.placeholder = {};
var bindAll = flatRest(function(t, e) {
  return arrayEach(e, function(i) {
    i = toKey(i), baseAssignValue(t, i, bind(t[i], t));
  }), t;
}), WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG$1 = 2, WRAP_PARTIAL_FLAG$2 = 32, bindKey = baseRest(function(t, e, i) {
  var n = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG$1;
  if (i.length) {
    var r = replaceHolders(i, getHolder(bindKey));
    n |= WRAP_PARTIAL_FLAG$2;
  }
  return createWrap(e, n, t, i, r);
});
bindKey.placeholder = {};
function baseSlice(t, e, i) {
  var n = -1, r = t.length;
  e < 0 && (e = -e > r ? 0 : r + e), i = i > r ? r : i, i < 0 && (i += r), r = e > i ? 0 : i - e >>> 0, e >>>= 0;
  for (var s = Array(r); ++n < r; )
    s[n] = t[n + e];
  return s;
}
function castSlice(t, e, i) {
  var n = t.length;
  return i = i === void 0 ? n : i, !e && i >= n ? t : baseSlice(t, e, i);
}
var rsAstralRange$3 = "\\ud800-\\udfff", rsComboMarksRange$4 = "\\u0300-\\u036f", reComboHalfMarksRange$4 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$4 = "\\u20d0-\\u20ff", rsComboRange$4 = rsComboMarksRange$4 + reComboHalfMarksRange$4 + rsComboSymbolsRange$4, rsVarRange$3 = "\\ufe0e\\ufe0f", rsZWJ$3 = "\\u200d", reHasUnicode = RegExp("[" + rsZWJ$3 + rsAstralRange$3 + rsComboRange$4 + rsVarRange$3 + "]");
function hasUnicode(t) {
  return reHasUnicode.test(t);
}
function asciiToArray(t) {
  return t.split("");
}
var rsAstralRange$2 = "\\ud800-\\udfff", rsComboMarksRange$3 = "\\u0300-\\u036f", reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$3 = "\\u20d0-\\u20ff", rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3, rsVarRange$2 = "\\ufe0e\\ufe0f", rsAstral$1 = "[" + rsAstralRange$2 + "]", rsCombo$3 = "[" + rsComboRange$3 + "]", rsFitz$2 = "\\ud83c[\\udffb-\\udfff]", rsModifier$2 = "(?:" + rsCombo$3 + "|" + rsFitz$2 + ")", rsNonAstral$2 = "[^" + rsAstralRange$2 + "]", rsRegional$2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ$2 = "\\u200d", reOptMod$2 = rsModifier$2 + "?", rsOptVar$2 = "[" + rsVarRange$2 + "]?", rsOptJoin$2 = "(?:" + rsZWJ$2 + "(?:" + [rsNonAstral$2, rsRegional$2, rsSurrPair$2].join("|") + ")" + rsOptVar$2 + reOptMod$2 + ")*", rsSeq$2 = rsOptVar$2 + reOptMod$2 + rsOptJoin$2, rsSymbol$1 = "(?:" + [rsNonAstral$2 + rsCombo$3 + "?", rsCombo$3, rsRegional$2, rsSurrPair$2, rsAstral$1].join("|") + ")", reUnicode$1 = RegExp(rsFitz$2 + "(?=" + rsFitz$2 + ")|" + rsSymbol$1 + rsSeq$2, "g");
function unicodeToArray(t) {
  return t.match(reUnicode$1) || [];
}
function stringToArray(t) {
  return hasUnicode(t) ? unicodeToArray(t) : asciiToArray(t);
}
function createCaseFirst(t) {
  return function(e) {
    e = toString(e);
    var i = hasUnicode(e) ? stringToArray(e) : void 0, n = i ? i[0] : e.charAt(0), r = i ? castSlice(i, 1).join("") : e.slice(1);
    return n[t]() + r;
  };
}
var upperFirst = createCaseFirst("toUpperCase");
function capitalize(t) {
  return upperFirst(toString(t).toLowerCase());
}
function arrayReduce(t, e, i, n) {
  var r = -1, s = t == null ? 0 : t.length;
  for (n && s && (i = t[++r]); ++r < s; )
    i = e(i, t[r], r, t);
  return i;
}
function basePropertyOf(t) {
  return function(e) {
    return t?.[e];
  };
}
var deburredLetters = {
  // Latin-1 Supplement block.
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  // Latin Extended-A block.
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
}, deburrLetter = basePropertyOf(deburredLetters), reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, rsComboMarksRange$2 = "\\u0300-\\u036f", reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$2 = "\\u20d0-\\u20ff", rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2, rsCombo$2 = "[" + rsComboRange$2 + "]", reComboMark = RegExp(rsCombo$2, "g");
function deburr(t) {
  return t = toString(t), t && t.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(t) {
  return t.match(reAsciiWord) || [];
}
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(t) {
  return reHasUnicodeWord.test(t);
}
var rsAstralRange$1 = "\\ud800-\\udfff", rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange$1 = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange, rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo$1 = "[" + rsComboRange$1 + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange$1 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz$1 = "\\ud83c[\\udffb-\\udfff]", rsModifier$1 = "(?:" + rsCombo$1 + "|" + rsFitz$1 + ")", rsNonAstral$1 = "[^" + rsAstralRange$1 + "]", rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ$1 = "\\u200d", rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod$1 = rsModifier$1 + "?", rsOptVar$1 = "[" + rsVarRange$1 + "]?", rsOptJoin$1 = "(?:" + rsZWJ$1 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1, rsEmoji = "(?:" + [rsDingbat, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsSeq$1, reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(t) {
  return t.match(reUnicodeWord) || [];
}
function words(t, e, i) {
  return t = toString(t), e = i ? void 0 : e, e === void 0 ? hasUnicodeWord(t) ? unicodeWords(t) : asciiWords(t) : t.match(e) || [];
}
var rsApos = "['’]", reApos = RegExp(rsApos, "g");
function createCompounder(t) {
  return function(e) {
    return arrayReduce(words(deburr(e).replace(reApos, "")), t, "");
  };
}
var camelCase = createCompounder(function(t, e, i) {
  return e = e.toLowerCase(), t + (i ? capitalize(e) : e);
});
function castArray() {
  if (!arguments.length)
    return [];
  var t = arguments[0];
  return isArray(t) ? t : [t];
}
var nativeIsFinite$1 = root.isFinite, nativeMin$c = Math.min;
function createRound(t) {
  var e = Math[t];
  return function(i, n) {
    if (i = toNumber(i), n = n == null ? 0 : nativeMin$c(toInteger(n), 292), n && nativeIsFinite$1(i)) {
      var r = (toString(i) + "e").split("e"), s = e(r[0] + "e" + (+r[1] + n));
      return r = (toString(s) + "e").split("e"), +(r[0] + "e" + (+r[1] - n));
    }
    return e(i);
  };
}
var ceil = createRound("ceil");
function chain(t) {
  var e = lodash(t);
  return e.__chain__ = !0, e;
}
var nativeCeil$3 = Math.ceil, nativeMax$c = Math.max;
function chunk(t, e, i) {
  (i ? isIterateeCall(t, e, i) : e === void 0) ? e = 1 : e = nativeMax$c(toInteger(e), 0);
  var n = t == null ? 0 : t.length;
  if (!n || e < 1)
    return [];
  for (var r = 0, s = 0, a = Array(nativeCeil$3(n / e)); r < n; )
    a[s++] = baseSlice(t, r, r += e);
  return a;
}
function baseClamp(t, e, i) {
  return t === t && (i !== void 0 && (t = t <= i ? t : i), e !== void 0 && (t = t >= e ? t : e)), t;
}
function clamp(t, e, i) {
  return i === void 0 && (i = e, e = void 0), i !== void 0 && (i = toNumber(i), i = i === i ? i : 0), e !== void 0 && (e = toNumber(e), e = e === e ? e : 0), baseClamp(toNumber(t), e, i);
}
function stackClear() {
  this.__data__ = new ListCache(), this.size = 0;
}
function stackDelete(t) {
  var e = this.__data__, i = e.delete(t);
  return this.size = e.size, i;
}
function stackGet(t) {
  return this.__data__.get(t);
}
function stackHas(t) {
  return this.__data__.has(t);
}
var LARGE_ARRAY_SIZE$2 = 200;
function stackSet(t, e) {
  var i = this.__data__;
  if (i instanceof ListCache) {
    var n = i.__data__;
    if (!Map || n.length < LARGE_ARRAY_SIZE$2 - 1)
      return n.push([t, e]), this.size = ++i.size, this;
    i = this.__data__ = new MapCache(n);
  }
  return i.set(t, e), this.size = i.size, this;
}
function Stack(t) {
  var e = this.__data__ = new ListCache(t);
  this.size = e.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype.delete = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(t, e) {
  return t && copyObject(e, keys(e), t);
}
function baseAssignIn(t, e) {
  return t && copyObject(e, keysIn(e), t);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports, freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module, moduleExports = freeModule && freeModule.exports === freeExports, Buffer = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(t, e) {
  if (e)
    return t.slice();
  var i = t.length, n = allocUnsafe ? allocUnsafe(i) : new t.constructor(i);
  return t.copy(n), n;
}
function arrayFilter(t, e) {
  for (var i = -1, n = t == null ? 0 : t.length, r = 0, s = []; ++i < n; ) {
    var a = t[i];
    e(a, i, t) && (s[r++] = a);
  }
  return s;
}
function stubArray() {
  return [];
}
var objectProto$d = Object.prototype, propertyIsEnumerable = objectProto$d.propertyIsEnumerable, nativeGetSymbols$1 = Object.getOwnPropertySymbols, getSymbols = nativeGetSymbols$1 ? function(t) {
  return t == null ? [] : (t = Object(t), arrayFilter(nativeGetSymbols$1(t), function(e) {
    return propertyIsEnumerable.call(t, e);
  }));
} : stubArray;
function copySymbols(t, e) {
  return copyObject(t, getSymbols(t), e);
}
var nativeGetSymbols = Object.getOwnPropertySymbols, getSymbolsIn = nativeGetSymbols ? function(t) {
  for (var e = []; t; )
    arrayPush(e, getSymbols(t)), t = getPrototype(t);
  return e;
} : stubArray;
function copySymbolsIn(t, e) {
  return copyObject(t, getSymbolsIn(t), e);
}
function baseGetAllKeys(t, e, i) {
  var n = e(t);
  return isArray(t) ? n : arrayPush(n, i(t));
}
function getAllKeys(t) {
  return baseGetAllKeys(t, keys, getSymbols);
}
function getAllKeysIn(t) {
  return baseGetAllKeys(t, keysIn, getSymbolsIn);
}
var DataView = getNative(root, "DataView"), Promise$1 = getNative(root, "Promise"), Set = getNative(root, "Set"), mapTag$8 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$8 = "[object Set]", weakMapTag$2 = "[object WeakMap]", dataViewTag$3 = "[object DataView]", dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap), getTag = baseGetTag;
(DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map && getTag(new Map()) != mapTag$8 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set && getTag(new Set()) != setTag$8 || WeakMap && getTag(new WeakMap()) != weakMapTag$2) && (getTag = function(t) {
  var e = baseGetTag(t), i = e == objectTag$2 ? t.constructor : void 0, n = i ? toSource(i) : "";
  if (n)
    switch (n) {
      case dataViewCtorString:
        return dataViewTag$3;
      case mapCtorString:
        return mapTag$8;
      case promiseCtorString:
        return promiseTag;
      case setCtorString:
        return setTag$8;
      case weakMapCtorString:
        return weakMapTag$2;
    }
  return e;
});
var objectProto$c = Object.prototype, hasOwnProperty$b = objectProto$c.hasOwnProperty;
function initCloneArray(t) {
  var e = t.length, i = new t.constructor(e);
  return e && typeof t[0] == "string" && hasOwnProperty$b.call(t, "index") && (i.index = t.index, i.input = t.input), i;
}
var Uint8Array = root.Uint8Array;
function cloneArrayBuffer(t) {
  var e = new t.constructor(t.byteLength);
  return new Uint8Array(e).set(new Uint8Array(t)), e;
}
function cloneDataView(t, e) {
  var i = e ? cloneArrayBuffer(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.byteLength);
}
var reFlags$1 = /\w*$/;
function cloneRegExp(t) {
  var e = new t.constructor(t.source, reFlags$1.exec(t));
  return e.lastIndex = t.lastIndex, e;
}
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(t) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(t)) : {};
}
function cloneTypedArray(t, e) {
  var i = e ? cloneArrayBuffer(t.buffer) : t.buffer;
  return new t.constructor(i, t.byteOffset, t.length);
}
var boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", mapTag$7 = "[object Map]", numberTag$3 = "[object Number]", regexpTag$3 = "[object RegExp]", setTag$7 = "[object Set]", stringTag$3 = "[object String]", symbolTag$2 = "[object Symbol]", arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(t, e, i) {
  var n = t.constructor;
  switch (e) {
    case arrayBufferTag$3:
      return cloneArrayBuffer(t);
    case boolTag$3:
    case dateTag$3:
      return new n(+t);
    case dataViewTag$2:
      return cloneDataView(t, i);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(t, i);
    case mapTag$7:
      return new n();
    case numberTag$3:
    case stringTag$3:
      return new n(t);
    case regexpTag$3:
      return cloneRegExp(t);
    case setTag$7:
      return new n();
    case symbolTag$2:
      return cloneSymbol(t);
  }
}
function initCloneObject(t) {
  return typeof t.constructor == "function" && !isPrototype(t) ? baseCreate(getPrototype(t)) : {};
}
var mapTag$6 = "[object Map]";
function baseIsMap(t) {
  return isObjectLike(t) && getTag(t) == mapTag$6;
}
var nodeIsMap = nodeUtil && nodeUtil.isMap, isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap, setTag$6 = "[object Set]";
function baseIsSet(t) {
  return isObjectLike(t) && getTag(t) == setTag$6;
}
var nodeIsSet = nodeUtil && nodeUtil.isSet, isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet, CLONE_DEEP_FLAG$7 = 1, CLONE_FLAT_FLAG$1 = 2, CLONE_SYMBOLS_FLAG$5 = 4, argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$5 = "[object Map]", numberTag$2 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$2 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag$1 = "[object WeakMap]", arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$5] = cloneableTags[numberTag$2] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$2] = cloneableTags[setTag$5] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag$1] = !1;
function baseClone(t, e, i, n, r, s) {
  var a, o = e & CLONE_DEEP_FLAG$7, l = e & CLONE_FLAT_FLAG$1, u = e & CLONE_SYMBOLS_FLAG$5;
  if (i && (a = r ? i(t, n, r, s) : i(t)), a !== void 0)
    return a;
  if (!isObject(t))
    return t;
  var c = isArray(t);
  if (c) {
    if (a = initCloneArray(t), !o)
      return copyArray(t, a);
  } else {
    var f = getTag(t), p = f == funcTag || f == genTag;
    if (isBuffer(t))
      return cloneBuffer(t, o);
    if (f == objectTag$1 || f == argsTag$1 || p && !r) {
      if (a = l || p ? {} : initCloneObject(t), !o)
        return l ? copySymbolsIn(t, baseAssignIn(a, t)) : copySymbols(t, baseAssign(a, t));
    } else {
      if (!cloneableTags[f])
        return r ? t : {};
      a = initCloneByTag(t, f, o);
    }
  }
  s || (s = new Stack());
  var y = s.get(t);
  if (y)
    return y;
  s.set(t, a), isSet(t) ? t.forEach(function(w) {
    a.add(baseClone(w, e, i, w, t, s));
  }) : isMap(t) && t.forEach(function(w, A) {
    a.set(A, baseClone(w, e, i, A, t, s));
  });
  var b = u ? l ? getAllKeysIn : getAllKeys : l ? keysIn : keys, x = c ? void 0 : b(t);
  return arrayEach(x || t, function(w, A) {
    x && (A = w, w = t[A]), assignValue(a, A, baseClone(w, e, i, A, t, s));
  }), a;
}
var CLONE_SYMBOLS_FLAG$4 = 4;
function clone(t) {
  return baseClone(t, CLONE_SYMBOLS_FLAG$4);
}
var CLONE_DEEP_FLAG$6 = 1, CLONE_SYMBOLS_FLAG$3 = 4;
function cloneDeep(t) {
  return baseClone(t, CLONE_DEEP_FLAG$6 | CLONE_SYMBOLS_FLAG$3);
}
var CLONE_DEEP_FLAG$5 = 1, CLONE_SYMBOLS_FLAG$2 = 4;
function cloneDeepWith(t, e) {
  return e = typeof e == "function" ? e : void 0, baseClone(t, CLONE_DEEP_FLAG$5 | CLONE_SYMBOLS_FLAG$2, e);
}
var CLONE_SYMBOLS_FLAG$1 = 4;
function cloneWith(t, e) {
  return e = typeof e == "function" ? e : void 0, baseClone(t, CLONE_SYMBOLS_FLAG$1, e);
}
function wrapperCommit() {
  return new LodashWrapper(this.value(), this.__chain__);
}
function compact(t) {
  for (var e = -1, i = t == null ? 0 : t.length, n = 0, r = []; ++e < i; ) {
    var s = t[e];
    s && (r[n++] = s);
  }
  return r;
}
function concat() {
  var t = arguments.length;
  if (!t)
    return [];
  for (var e = Array(t - 1), i = arguments[0], n = t; n--; )
    e[n - 1] = arguments[n];
  return arrayPush(isArray(i) ? copyArray(i) : [i], baseFlatten(e, 1));
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(t) {
  return this.__data__.set(t, HASH_UNDEFINED), this;
}
function setCacheHas(t) {
  return this.__data__.has(t);
}
function SetCache(t) {
  var e = -1, i = t == null ? 0 : t.length;
  for (this.__data__ = new MapCache(); ++e < i; )
    this.add(t[e]);
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(t, e) {
  for (var i = -1, n = t == null ? 0 : t.length; ++i < n; )
    if (e(t[i], i, t))
      return !0;
  return !1;
}
function cacheHas(t, e) {
  return t.has(e);
}
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(t, e, i, n, r, s) {
  var a = i & COMPARE_PARTIAL_FLAG$5, o = t.length, l = e.length;
  if (o != l && !(a && l > o))
    return !1;
  var u = s.get(t), c = s.get(e);
  if (u && c)
    return u == e && c == t;
  var f = -1, p = !0, y = i & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  for (s.set(t, e), s.set(e, t); ++f < o; ) {
    var b = t[f], x = e[f];
    if (n)
      var w = a ? n(x, b, f, e, t, s) : n(b, x, f, t, e, s);
    if (w !== void 0) {
      if (w)
        continue;
      p = !1;
      break;
    }
    if (y) {
      if (!arraySome(e, function(A, E) {
        if (!cacheHas(y, E) && (b === A || r(b, A, i, n, s)))
          return y.push(E);
      })) {
        p = !1;
        break;
      }
    } else if (!(b === x || r(b, x, i, n, s))) {
      p = !1;
      break;
    }
  }
  return s.delete(t), s.delete(e), p;
}
function mapToArray(t) {
  var e = -1, i = Array(t.size);
  return t.forEach(function(n, r) {
    i[++e] = [r, n];
  }), i;
}
function setToArray(t) {
  var e = -1, i = Array(t.size);
  return t.forEach(function(n) {
    i[++e] = n;
  }), i;
}
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2, boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag = "[object Error]", mapTag$4 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$1 = "[object String]", symbolTag = "[object Symbol]", arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag = "[object DataView]", symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(t, e, i, n, r, s, a) {
  switch (i) {
    case dataViewTag:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case arrayBufferTag$1:
      return !(t.byteLength != e.byteLength || !s(new Uint8Array(t), new Uint8Array(e)));
    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      return eq(+t, +e);
    case errorTag:
      return t.name == e.name && t.message == e.message;
    case regexpTag$1:
    case stringTag$1:
      return t == e + "";
    case mapTag$4:
      var o = mapToArray;
    case setTag$4:
      var l = n & COMPARE_PARTIAL_FLAG$4;
      if (o || (o = setToArray), t.size != e.size && !l)
        return !1;
      var u = a.get(t);
      if (u)
        return u == e;
      n |= COMPARE_UNORDERED_FLAG$2, a.set(t, e);
      var c = equalArrays(o(t), o(e), n, r, s, a);
      return a.delete(t), c;
    case symbolTag:
      if (symbolValueOf)
        return symbolValueOf.call(t) == symbolValueOf.call(e);
  }
  return !1;
}
var COMPARE_PARTIAL_FLAG$3 = 1, objectProto$b = Object.prototype, hasOwnProperty$a = objectProto$b.hasOwnProperty;
function equalObjects(t, e, i, n, r, s) {
  var a = i & COMPARE_PARTIAL_FLAG$3, o = getAllKeys(t), l = o.length, u = getAllKeys(e), c = u.length;
  if (l != c && !a)
    return !1;
  for (var f = l; f--; ) {
    var p = o[f];
    if (!(a ? p in e : hasOwnProperty$a.call(e, p)))
      return !1;
  }
  var y = s.get(t), b = s.get(e);
  if (y && b)
    return y == e && b == t;
  var x = !0;
  s.set(t, e), s.set(e, t);
  for (var w = a; ++f < l; ) {
    p = o[f];
    var A = t[p], E = e[p];
    if (n)
      var O = a ? n(E, A, p, e, t, s) : n(A, E, p, t, e, s);
    if (!(O === void 0 ? A === E || r(A, E, i, n, s) : O)) {
      x = !1;
      break;
    }
    w || (w = p == "constructor");
  }
  if (x && !w) {
    var L = t.constructor, k = e.constructor;
    L != k && "constructor" in t && "constructor" in e && !(typeof L == "function" && L instanceof L && typeof k == "function" && k instanceof k) && (x = !1);
  }
  return s.delete(t), s.delete(e), x;
}
var COMPARE_PARTIAL_FLAG$2 = 1, argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]", objectProto$a = Object.prototype, hasOwnProperty$9 = objectProto$a.hasOwnProperty;
function baseIsEqualDeep(t, e, i, n, r, s) {
  var a = isArray(t), o = isArray(e), l = a ? arrayTag : getTag(t), u = o ? arrayTag : getTag(e);
  l = l == argsTag ? objectTag : l, u = u == argsTag ? objectTag : u;
  var c = l == objectTag, f = u == objectTag, p = l == u;
  if (p && isBuffer(t)) {
    if (!isBuffer(e))
      return !1;
    a = !0, c = !1;
  }
  if (p && !c)
    return s || (s = new Stack()), a || isTypedArray(t) ? equalArrays(t, e, i, n, r, s) : equalByTag(t, e, l, i, n, r, s);
  if (!(i & COMPARE_PARTIAL_FLAG$2)) {
    var y = c && hasOwnProperty$9.call(t, "__wrapped__"), b = f && hasOwnProperty$9.call(e, "__wrapped__");
    if (y || b) {
      var x = y ? t.value() : t, w = b ? e.value() : e;
      return s || (s = new Stack()), r(x, w, i, n, s);
    }
  }
  return p ? (s || (s = new Stack()), equalObjects(t, e, i, n, r, s)) : !1;
}
function baseIsEqual(t, e, i, n, r) {
  return t === e ? !0 : t == null || e == null || !isObjectLike(t) && !isObjectLike(e) ? t !== t && e !== e : baseIsEqualDeep(t, e, i, n, baseIsEqual, r);
}
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(t, e, i, n) {
  var r = i.length, s = r, a = !n;
  if (t == null)
    return !s;
  for (t = Object(t); r--; ) {
    var o = i[r];
    if (a && o[2] ? o[1] !== t[o[0]] : !(o[0] in t))
      return !1;
  }
  for (; ++r < s; ) {
    o = i[r];
    var l = o[0], u = t[l], c = o[1];
    if (a && o[2]) {
      if (u === void 0 && !(l in t))
        return !1;
    } else {
      var f = new Stack();
      if (n)
        var p = n(u, c, l, t, e, f);
      if (!(p === void 0 ? baseIsEqual(c, u, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, n, f) : p))
        return !1;
    }
  }
  return !0;
}
function isStrictComparable(t) {
  return t === t && !isObject(t);
}
function getMatchData(t) {
  for (var e = keys(t), i = e.length; i--; ) {
    var n = e[i], r = t[n];
    e[i] = [n, r, isStrictComparable(r)];
  }
  return e;
}
function matchesStrictComparable(t, e) {
  return function(i) {
    return i == null ? !1 : i[t] === e && (e !== void 0 || t in Object(i));
  };
}
function baseMatches(t) {
  var e = getMatchData(t);
  return e.length == 1 && e[0][2] ? matchesStrictComparable(e[0][0], e[0][1]) : function(i) {
    return i === t || baseIsMatch(i, t, e);
  };
}
function baseHasIn(t, e) {
  return t != null && e in Object(t);
}
function hasPath(t, e, i) {
  e = castPath(e, t);
  for (var n = -1, r = e.length, s = !1; ++n < r; ) {
    var a = toKey(e[n]);
    if (!(s = t != null && i(t, a)))
      break;
    t = t[a];
  }
  return s || ++n != r ? s : (r = t == null ? 0 : t.length, !!r && isLength(r) && isIndex(a, r) && (isArray(t) || isArguments(t)));
}
function hasIn(t, e) {
  return t != null && hasPath(t, e, baseHasIn);
}
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(t, e) {
  return isKey(t) && isStrictComparable(e) ? matchesStrictComparable(toKey(t), e) : function(i) {
    var n = get(i, t);
    return n === void 0 && n === e ? hasIn(i, t) : baseIsEqual(e, n, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
function baseProperty(t) {
  return function(e) {
    return e?.[t];
  };
}
function basePropertyDeep(t) {
  return function(e) {
    return baseGet(e, t);
  };
}
function property(t) {
  return isKey(t) ? baseProperty(toKey(t)) : basePropertyDeep(t);
}
function baseIteratee(t) {
  return typeof t == "function" ? t : t == null ? identity : typeof t == "object" ? isArray(t) ? baseMatchesProperty(t[0], t[1]) : baseMatches(t) : property(t);
}
var FUNC_ERROR_TEXT$7 = "Expected a function";
function cond(t) {
  var e = t == null ? 0 : t.length, i = baseIteratee;
  return t = e ? arrayMap(t, function(n) {
    if (typeof n[1] != "function")
      throw new TypeError(FUNC_ERROR_TEXT$7);
    return [i(n[0]), n[1]];
  }) : [], baseRest(function(n) {
    for (var r = -1; ++r < e; ) {
      var s = t[r];
      if (apply(s[0], this, n))
        return apply(s[1], this, n);
    }
  });
}
function baseConformsTo(t, e, i) {
  var n = i.length;
  if (t == null)
    return !n;
  for (t = Object(t); n--; ) {
    var r = i[n], s = e[r], a = t[r];
    if (a === void 0 && !(r in t) || !s(a))
      return !1;
  }
  return !0;
}
function baseConforms(t) {
  var e = keys(t);
  return function(i) {
    return baseConformsTo(i, t, e);
  };
}
var CLONE_DEEP_FLAG$4 = 1;
function conforms(t) {
  return baseConforms(baseClone(t, CLONE_DEEP_FLAG$4));
}
function conformsTo(t, e) {
  return e == null || baseConformsTo(t, e, keys(e));
}
function arrayAggregator(t, e, i, n) {
  for (var r = -1, s = t == null ? 0 : t.length; ++r < s; ) {
    var a = t[r];
    e(n, a, i(a), t);
  }
  return n;
}
function createBaseFor(t) {
  return function(e, i, n) {
    for (var r = -1, s = Object(e), a = n(e), o = a.length; o--; ) {
      var l = a[t ? o : ++r];
      if (i(s[l], l, s) === !1)
        break;
    }
    return e;
  };
}
var baseFor = createBaseFor();
function baseForOwn(t, e) {
  return t && baseFor(t, e, keys);
}
function createBaseEach(t, e) {
  return function(i, n) {
    if (i == null)
      return i;
    if (!isArrayLike(i))
      return t(i, n);
    for (var r = i.length, s = e ? r : -1, a = Object(i); (e ? s-- : ++s < r) && n(a[s], s, a) !== !1; )
      ;
    return i;
  };
}
var baseEach = createBaseEach(baseForOwn);
function baseAggregator(t, e, i, n) {
  return baseEach(t, function(r, s, a) {
    e(n, r, i(r), a);
  }), n;
}
function createAggregator(t, e) {
  return function(i, n) {
    var r = isArray(i) ? arrayAggregator : baseAggregator, s = e ? e() : {};
    return r(i, t, baseIteratee(n), s);
  };
}
var objectProto$9 = Object.prototype, hasOwnProperty$8 = objectProto$9.hasOwnProperty, countBy = createAggregator(function(t, e, i) {
  hasOwnProperty$8.call(t, i) ? ++t[i] : baseAssignValue(t, i, 1);
});
function create(t, e) {
  var i = baseCreate(t);
  return e == null ? i : baseAssign(i, e);
}
var WRAP_CURRY_FLAG$1 = 8;
function curry(t, e, i) {
  e = i ? void 0 : e;
  var n = createWrap(t, WRAP_CURRY_FLAG$1, void 0, void 0, void 0, void 0, void 0, e);
  return n.placeholder = curry.placeholder, n;
}
curry.placeholder = {};
var WRAP_CURRY_RIGHT_FLAG = 16;
function curryRight(t, e, i) {
  e = i ? void 0 : e;
  var n = createWrap(t, WRAP_CURRY_RIGHT_FLAG, void 0, void 0, void 0, void 0, void 0, e);
  return n.placeholder = curryRight.placeholder, n;
}
curryRight.placeholder = {};
var now = function() {
  return root.Date.now();
}, FUNC_ERROR_TEXT$6 = "Expected a function", nativeMax$b = Math.max, nativeMin$b = Math.min;
function debounce(t, e, i) {
  var n, r, s, a, o, l, u = 0, c = !1, f = !1, p = !0;
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$6);
  e = toNumber(e) || 0, isObject(i) && (c = !!i.leading, f = "maxWait" in i, s = f ? nativeMax$b(toNumber(i.maxWait) || 0, e) : s, p = "trailing" in i ? !!i.trailing : p);
  function y(I) {
    var M = n, U = r;
    return n = r = void 0, u = I, a = t.apply(U, M), a;
  }
  function b(I) {
    return u = I, o = setTimeout(A, e), c ? y(I) : a;
  }
  function x(I) {
    var M = I - l, U = I - u, j = e - M;
    return f ? nativeMin$b(j, s - U) : j;
  }
  function w(I) {
    var M = I - l, U = I - u;
    return l === void 0 || M >= e || M < 0 || f && U >= s;
  }
  function A() {
    var I = now();
    if (w(I))
      return E(I);
    o = setTimeout(A, x(I));
  }
  function E(I) {
    return o = void 0, p && n ? y(I) : (n = r = void 0, a);
  }
  function O() {
    o !== void 0 && clearTimeout(o), u = 0, n = l = r = o = void 0;
  }
  function L() {
    return o === void 0 ? a : E(now());
  }
  function k() {
    var I = now(), M = w(I);
    if (n = arguments, r = this, l = I, M) {
      if (o === void 0)
        return b(l);
      if (f)
        return clearTimeout(o), o = setTimeout(A, e), y(l);
    }
    return o === void 0 && (o = setTimeout(A, e)), a;
  }
  return k.cancel = O, k.flush = L, k;
}
function defaultTo(t, e) {
  return t == null || t !== t ? e : t;
}
var objectProto$8 = Object.prototype, hasOwnProperty$7 = objectProto$8.hasOwnProperty, defaults = baseRest(function(t, e) {
  t = Object(t);
  var i = -1, n = e.length, r = n > 2 ? e[2] : void 0;
  for (r && isIterateeCall(e[0], e[1], r) && (n = 1); ++i < n; )
    for (var s = e[i], a = keysIn(s), o = -1, l = a.length; ++o < l; ) {
      var u = a[o], c = t[u];
      (c === void 0 || eq(c, objectProto$8[u]) && !hasOwnProperty$7.call(t, u)) && (t[u] = s[u]);
    }
  return t;
});
function assignMergeValue(t, e, i) {
  (i !== void 0 && !eq(t[e], i) || i === void 0 && !(e in t)) && baseAssignValue(t, e, i);
}
function isArrayLikeObject(t) {
  return isObjectLike(t) && isArrayLike(t);
}
function safeGet(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
function toPlainObject(t) {
  return copyObject(t, keysIn(t));
}
function baseMergeDeep(t, e, i, n, r, s, a) {
  var o = safeGet(t, i), l = safeGet(e, i), u = a.get(l);
  if (u) {
    assignMergeValue(t, i, u);
    return;
  }
  var c = s ? s(o, l, i + "", t, e, a) : void 0, f = c === void 0;
  if (f) {
    var p = isArray(l), y = !p && isBuffer(l), b = !p && !y && isTypedArray(l);
    c = l, p || y || b ? isArray(o) ? c = o : isArrayLikeObject(o) ? c = copyArray(o) : y ? (f = !1, c = cloneBuffer(l, !0)) : b ? (f = !1, c = cloneTypedArray(l, !0)) : c = [] : isPlainObject(l) || isArguments(l) ? (c = o, isArguments(o) ? c = toPlainObject(o) : (!isObject(o) || isFunction(o)) && (c = initCloneObject(l))) : f = !1;
  }
  f && (a.set(l, c), r(c, l, n, s, a), a.delete(l)), assignMergeValue(t, i, c);
}
function baseMerge(t, e, i, n, r) {
  t !== e && baseFor(e, function(s, a) {
    if (r || (r = new Stack()), isObject(s))
      baseMergeDeep(t, e, a, i, baseMerge, n, r);
    else {
      var o = n ? n(safeGet(t, a), s, a + "", t, e, r) : void 0;
      o === void 0 && (o = s), assignMergeValue(t, a, o);
    }
  }, keysIn);
}
function customDefaultsMerge(t, e, i, n, r, s) {
  return isObject(t) && isObject(e) && (s.set(e, t), baseMerge(t, e, void 0, customDefaultsMerge, s), s.delete(e)), t;
}
var mergeWith = createAssigner(function(t, e, i, n) {
  baseMerge(t, e, i, n);
}), defaultsDeep = baseRest(function(t) {
  return t.push(void 0, customDefaultsMerge), apply(mergeWith, void 0, t);
}), FUNC_ERROR_TEXT$5 = "Expected a function";
function baseDelay(t, e, i) {
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$5);
  return setTimeout(function() {
    t.apply(void 0, i);
  }, e);
}
var defer = baseRest(function(t, e) {
  return baseDelay(t, 1, e);
}), delay = baseRest(function(t, e, i) {
  return baseDelay(t, toNumber(e) || 0, i);
});
function arrayIncludesWith(t, e, i) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (i(e, t[n]))
      return !0;
  return !1;
}
var LARGE_ARRAY_SIZE$1 = 200;
function baseDifference(t, e, i, n) {
  var r = -1, s = arrayIncludes, a = !0, o = t.length, l = [], u = e.length;
  if (!o)
    return l;
  i && (e = arrayMap(e, baseUnary(i))), n ? (s = arrayIncludesWith, a = !1) : e.length >= LARGE_ARRAY_SIZE$1 && (s = cacheHas, a = !1, e = new SetCache(e));
  e:
    for (; ++r < o; ) {
      var c = t[r], f = i == null ? c : i(c);
      if (c = n || c !== 0 ? c : 0, a && f === f) {
        for (var p = u; p--; )
          if (e[p] === f)
            continue e;
        l.push(c);
      } else s(e, f, n) || l.push(c);
    }
  return l;
}
var difference = baseRest(function(t, e) {
  return isArrayLikeObject(t) ? baseDifference(t, baseFlatten(e, 1, isArrayLikeObject, !0)) : [];
});
function last(t) {
  var e = t == null ? 0 : t.length;
  return e ? t[e - 1] : void 0;
}
var differenceBy = baseRest(function(t, e) {
  var i = last(e);
  return isArrayLikeObject(i) && (i = void 0), isArrayLikeObject(t) ? baseDifference(t, baseFlatten(e, 1, isArrayLikeObject, !0), baseIteratee(i)) : [];
}), differenceWith = baseRest(function(t, e) {
  var i = last(e);
  return isArrayLikeObject(i) && (i = void 0), isArrayLikeObject(t) ? baseDifference(t, baseFlatten(e, 1, isArrayLikeObject, !0), void 0, i) : [];
}), divide = createMathOperation(function(t, e) {
  return t / e;
}, 1);
function drop(t, e, i) {
  var n = t == null ? 0 : t.length;
  return n ? (e = i || e === void 0 ? 1 : toInteger(e), baseSlice(t, e < 0 ? 0 : e, n)) : [];
}
function dropRight(t, e, i) {
  var n = t == null ? 0 : t.length;
  return n ? (e = i || e === void 0 ? 1 : toInteger(e), e = n - e, baseSlice(t, 0, e < 0 ? 0 : e)) : [];
}
function baseWhile(t, e, i, n) {
  for (var r = t.length, s = n ? r : -1; (n ? s-- : ++s < r) && e(t[s], s, t); )
    ;
  return i ? baseSlice(t, n ? 0 : s, n ? s + 1 : r) : baseSlice(t, n ? s + 1 : 0, n ? r : s);
}
function dropRightWhile(t, e) {
  return t && t.length ? baseWhile(t, baseIteratee(e), !0, !0) : [];
}
function dropWhile(t, e) {
  return t && t.length ? baseWhile(t, baseIteratee(e), !0) : [];
}
function castFunction(t) {
  return typeof t == "function" ? t : identity;
}
function forEach(t, e) {
  var i = isArray(t) ? arrayEach : baseEach;
  return i(t, castFunction(e));
}
function arrayEachRight(t, e) {
  for (var i = t == null ? 0 : t.length; i-- && e(t[i], i, t) !== !1; )
    ;
  return t;
}
var baseForRight = createBaseFor(!0);
function baseForOwnRight(t, e) {
  return t && baseForRight(t, e, keys);
}
var baseEachRight = createBaseEach(baseForOwnRight, !0);
function forEachRight(t, e) {
  var i = isArray(t) ? arrayEachRight : baseEachRight;
  return i(t, castFunction(e));
}
function endsWith(t, e, i) {
  t = toString(t), e = baseToString(e);
  var n = t.length;
  i = i === void 0 ? n : baseClamp(toInteger(i), 0, n);
  var r = i;
  return i -= e.length, i >= 0 && t.slice(i, r) == e;
}
function baseToPairs(t, e) {
  return arrayMap(e, function(i) {
    return [i, t[i]];
  });
}
function setToPairs(t) {
  var e = -1, i = Array(t.size);
  return t.forEach(function(n) {
    i[++e] = [n, n];
  }), i;
}
var mapTag$3 = "[object Map]", setTag$3 = "[object Set]";
function createToPairs(t) {
  return function(e) {
    var i = getTag(e);
    return i == mapTag$3 ? mapToArray(e) : i == setTag$3 ? setToPairs(e) : baseToPairs(e, t(e));
  };
}
var toPairs = createToPairs(keys), toPairsIn = createToPairs(keysIn), htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, escapeHtmlChar = basePropertyOf(htmlEscapes), reUnescapedHtml = /[&<>"']/g, reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(t) {
  return t = toString(t), t && reHasUnescapedHtml.test(t) ? t.replace(reUnescapedHtml, escapeHtmlChar) : t;
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(t) {
  return t = toString(t), t && reHasRegExpChar.test(t) ? t.replace(reRegExpChar, "\\$&") : t;
}
function arrayEvery(t, e) {
  for (var i = -1, n = t == null ? 0 : t.length; ++i < n; )
    if (!e(t[i], i, t))
      return !1;
  return !0;
}
function baseEvery(t, e) {
  var i = !0;
  return baseEach(t, function(n, r, s) {
    return i = !!e(n, r, s), i;
  }), i;
}
function every(t, e, i) {
  var n = isArray(t) ? arrayEvery : baseEvery;
  return i && isIterateeCall(t, e, i) && (e = void 0), n(t, baseIteratee(e));
}
var MAX_ARRAY_LENGTH$5 = 4294967295;
function toLength(t) {
  return t ? baseClamp(toInteger(t), 0, MAX_ARRAY_LENGTH$5) : 0;
}
function baseFill(t, e, i, n) {
  var r = t.length;
  for (i = toInteger(i), i < 0 && (i = -i > r ? 0 : r + i), n = n === void 0 || n > r ? r : toInteger(n), n < 0 && (n += r), n = i > n ? 0 : toLength(n); i < n; )
    t[i++] = e;
  return t;
}
function fill(t, e, i, n) {
  var r = t == null ? 0 : t.length;
  return r ? (i && typeof i != "number" && isIterateeCall(t, e, i) && (i = 0, n = r), baseFill(t, e, i, n)) : [];
}
function baseFilter(t, e) {
  var i = [];
  return baseEach(t, function(n, r, s) {
    e(n, r, s) && i.push(n);
  }), i;
}
function filter(t, e) {
  var i = isArray(t) ? arrayFilter : baseFilter;
  return i(t, baseIteratee(e));
}
function createFind(t) {
  return function(e, i, n) {
    var r = Object(e);
    if (!isArrayLike(e)) {
      var s = baseIteratee(i);
      e = keys(e), i = function(o) {
        return s(r[o], o, r);
      };
    }
    var a = t(e, i, n);
    return a > -1 ? r[s ? e[a] : a] : void 0;
  };
}
var nativeMax$a = Math.max;
function findIndex(t, e, i) {
  var n = t == null ? 0 : t.length;
  if (!n)
    return -1;
  var r = i == null ? 0 : toInteger(i);
  return r < 0 && (r = nativeMax$a(n + r, 0)), baseFindIndex(t, baseIteratee(e), r);
}
var find = createFind(findIndex);
function baseFindKey(t, e, i) {
  var n;
  return i(t, function(r, s, a) {
    if (e(r, s, a))
      return n = s, !1;
  }), n;
}
function findKey(t, e) {
  return baseFindKey(t, baseIteratee(e), baseForOwn);
}
var nativeMax$9 = Math.max, nativeMin$a = Math.min;
function findLastIndex(t, e, i) {
  var n = t == null ? 0 : t.length;
  if (!n)
    return -1;
  var r = n - 1;
  return i !== void 0 && (r = toInteger(i), r = i < 0 ? nativeMax$9(n + r, 0) : nativeMin$a(r, n - 1)), baseFindIndex(t, baseIteratee(e), r, !0);
}
var findLast = createFind(findLastIndex);
function findLastKey(t, e) {
  return baseFindKey(t, baseIteratee(e), baseForOwnRight);
}
function head(t) {
  return t && t.length ? t[0] : void 0;
}
function baseMap(t, e) {
  var i = -1, n = isArrayLike(t) ? Array(t.length) : [];
  return baseEach(t, function(r, s, a) {
    n[++i] = e(r, s, a);
  }), n;
}
function map(t, e) {
  var i = isArray(t) ? arrayMap : baseMap;
  return i(t, baseIteratee(e));
}
function flatMap(t, e) {
  return baseFlatten(map(t, e), 1);
}
var INFINITY$2 = 1 / 0;
function flatMapDeep(t, e) {
  return baseFlatten(map(t, e), INFINITY$2);
}
function flatMapDepth(t, e, i) {
  return i = i === void 0 ? 1 : toInteger(i), baseFlatten(map(t, e), i);
}
var INFINITY$1 = 1 / 0;
function flattenDeep(t) {
  var e = t == null ? 0 : t.length;
  return e ? baseFlatten(t, INFINITY$1) : [];
}
function flattenDepth(t, e) {
  var i = t == null ? 0 : t.length;
  return i ? (e = e === void 0 ? 1 : toInteger(e), baseFlatten(t, e)) : [];
}
var WRAP_FLIP_FLAG = 512;
function flip(t) {
  return createWrap(t, WRAP_FLIP_FLAG);
}
var floor = createRound("floor"), FUNC_ERROR_TEXT$4 = "Expected a function", WRAP_CURRY_FLAG = 8, WRAP_PARTIAL_FLAG$1 = 32, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG$1 = 256;
function createFlow(t) {
  return flatRest(function(e) {
    var i = e.length, n = i, r = LodashWrapper.prototype.thru;
    for (t && e.reverse(); n--; ) {
      var s = e[n];
      if (typeof s != "function")
        throw new TypeError(FUNC_ERROR_TEXT$4);
      if (r && !a && getFuncName(s) == "wrapper")
        var a = new LodashWrapper([], !0);
    }
    for (n = a ? n : i; ++n < i; ) {
      s = e[n];
      var o = getFuncName(s), l = o == "wrapper" ? getData(s) : void 0;
      l && isLaziable(l[0]) && l[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG$1 | WRAP_REARG_FLAG$1) && !l[4].length && l[9] == 1 ? a = a[getFuncName(l[0])].apply(a, l[3]) : a = s.length == 1 && isLaziable(s) ? a[o]() : a.thru(s);
    }
    return function() {
      var u = arguments, c = u[0];
      if (a && u.length == 1 && isArray(c))
        return a.plant(c).value();
      for (var f = 0, p = i ? e[f].apply(this, u) : c; ++f < i; )
        p = e[f].call(this, p);
      return p;
    };
  });
}
var flow = createFlow(), flowRight = createFlow(!0);
function forIn(t, e) {
  return t == null ? t : baseFor(t, castFunction(e), keysIn);
}
function forInRight(t, e) {
  return t == null ? t : baseForRight(t, castFunction(e), keysIn);
}
function forOwn(t, e) {
  return t && baseForOwn(t, castFunction(e));
}
function forOwnRight(t, e) {
  return t && baseForOwnRight(t, castFunction(e));
}
function fromPairs(t) {
  for (var e = -1, i = t == null ? 0 : t.length, n = {}; ++e < i; ) {
    var r = t[e];
    n[r[0]] = r[1];
  }
  return n;
}
function baseFunctions(t, e) {
  return arrayFilter(e, function(i) {
    return isFunction(t[i]);
  });
}
function functions(t) {
  return t == null ? [] : baseFunctions(t, keys(t));
}
function functionsIn(t) {
  return t == null ? [] : baseFunctions(t, keysIn(t));
}
var objectProto$7 = Object.prototype, hasOwnProperty$6 = objectProto$7.hasOwnProperty, groupBy = createAggregator(function(t, e, i) {
  hasOwnProperty$6.call(t, i) ? t[i].push(e) : baseAssignValue(t, i, [e]);
});
function baseGt(t, e) {
  return t > e;
}
function createRelationalOperation(t) {
  return function(e, i) {
    return typeof e == "string" && typeof i == "string" || (e = toNumber(e), i = toNumber(i)), t(e, i);
  };
}
var gt = createRelationalOperation(baseGt), gte = createRelationalOperation(function(t, e) {
  return t >= e;
}), objectProto$6 = Object.prototype, hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function baseHas(t, e) {
  return t != null && hasOwnProperty$5.call(t, e);
}
function has(t, e) {
  return t != null && hasPath(t, e, baseHas);
}
var nativeMax$8 = Math.max, nativeMin$9 = Math.min;
function baseInRange(t, e, i) {
  return t >= nativeMin$9(e, i) && t < nativeMax$8(e, i);
}
function inRange(t, e, i) {
  return e = toFinite(e), i === void 0 ? (i = e, e = 0) : i = toFinite(i), t = toNumber(t), baseInRange(t, e, i);
}
var stringTag = "[object String]";
function isString(t) {
  return typeof t == "string" || !isArray(t) && isObjectLike(t) && baseGetTag(t) == stringTag;
}
function baseValues(t, e) {
  return arrayMap(e, function(i) {
    return t[i];
  });
}
function values(t) {
  return t == null ? [] : baseValues(t, keys(t));
}
var nativeMax$7 = Math.max;
function includes(t, e, i, n) {
  t = isArrayLike(t) ? t : values(t), i = i && !n ? toInteger(i) : 0;
  var r = t.length;
  return i < 0 && (i = nativeMax$7(r + i, 0)), isString(t) ? i <= r && t.indexOf(e, i) > -1 : !!r && baseIndexOf(t, e, i) > -1;
}
var nativeMax$6 = Math.max;
function indexOf(t, e, i) {
  var n = t == null ? 0 : t.length;
  if (!n)
    return -1;
  var r = i == null ? 0 : toInteger(i);
  return r < 0 && (r = nativeMax$6(n + r, 0)), baseIndexOf(t, e, r);
}
function initial(t) {
  var e = t == null ? 0 : t.length;
  return e ? baseSlice(t, 0, -1) : [];
}
var nativeMin$8 = Math.min;
function baseIntersection(t, e, i) {
  for (var n = i ? arrayIncludesWith : arrayIncludes, r = t[0].length, s = t.length, a = s, o = Array(s), l = 1 / 0, u = []; a--; ) {
    var c = t[a];
    a && e && (c = arrayMap(c, baseUnary(e))), l = nativeMin$8(c.length, l), o[a] = !i && (e || r >= 120 && c.length >= 120) ? new SetCache(a && c) : void 0;
  }
  c = t[0];
  var f = -1, p = o[0];
  e:
    for (; ++f < r && u.length < l; ) {
      var y = c[f], b = e ? e(y) : y;
      if (y = i || y !== 0 ? y : 0, !(p ? cacheHas(p, b) : n(u, b, i))) {
        for (a = s; --a; ) {
          var x = o[a];
          if (!(x ? cacheHas(x, b) : n(t[a], b, i)))
            continue e;
        }
        p && p.push(b), u.push(y);
      }
    }
  return u;
}
function castArrayLikeObject(t) {
  return isArrayLikeObject(t) ? t : [];
}
var intersection = baseRest(function(t) {
  var e = arrayMap(t, castArrayLikeObject);
  return e.length && e[0] === t[0] ? baseIntersection(e) : [];
}), intersectionBy = baseRest(function(t) {
  var e = last(t), i = arrayMap(t, castArrayLikeObject);
  return e === last(i) ? e = void 0 : i.pop(), i.length && i[0] === t[0] ? baseIntersection(i, baseIteratee(e)) : [];
}), intersectionWith = baseRest(function(t) {
  var e = last(t), i = arrayMap(t, castArrayLikeObject);
  return e = typeof e == "function" ? e : void 0, e && i.pop(), i.length && i[0] === t[0] ? baseIntersection(i, void 0, e) : [];
});
function baseInverter(t, e, i, n) {
  return baseForOwn(t, function(r, s, a) {
    e(n, i(r), s, a);
  }), n;
}
function createInverter(t, e) {
  return function(i, n) {
    return baseInverter(i, t, e(n), {});
  };
}
var objectProto$5 = Object.prototype, nativeObjectToString$1 = objectProto$5.toString, invert = createInverter(function(t, e, i) {
  e != null && typeof e.toString != "function" && (e = nativeObjectToString$1.call(e)), t[e] = i;
}, constant(identity)), objectProto$4 = Object.prototype, hasOwnProperty$4 = objectProto$4.hasOwnProperty, nativeObjectToString = objectProto$4.toString, invertBy = createInverter(function(t, e, i) {
  e != null && typeof e.toString != "function" && (e = nativeObjectToString.call(e)), hasOwnProperty$4.call(t, e) ? t[e].push(i) : t[e] = [i];
}, baseIteratee);
function parent(t, e) {
  return e.length < 2 ? t : baseGet(t, baseSlice(e, 0, -1));
}
function baseInvoke(t, e, i) {
  e = castPath(e, t), t = parent(t, e);
  var n = t == null ? t : t[toKey(last(e))];
  return n == null ? void 0 : apply(n, t, i);
}
var invoke = baseRest(baseInvoke), invokeMap = baseRest(function(t, e, i) {
  var n = -1, r = typeof e == "function", s = isArrayLike(t) ? Array(t.length) : [];
  return baseEach(t, function(a) {
    s[++n] = r ? apply(e, a, i) : baseInvoke(a, e, i);
  }), s;
}), arrayBufferTag = "[object ArrayBuffer]";
function baseIsArrayBuffer(t) {
  return isObjectLike(t) && baseGetTag(t) == arrayBufferTag;
}
var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer, boolTag = "[object Boolean]";
function isBoolean(t) {
  return t === !0 || t === !1 || isObjectLike(t) && baseGetTag(t) == boolTag;
}
var dateTag = "[object Date]";
function baseIsDate(t) {
  return isObjectLike(t) && baseGetTag(t) == dateTag;
}
var nodeIsDate = nodeUtil && nodeUtil.isDate, isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
function isElement(t) {
  return isObjectLike(t) && t.nodeType === 1 && !isPlainObject(t);
}
var mapTag$2 = "[object Map]", setTag$2 = "[object Set]", objectProto$3 = Object.prototype, hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function isEmpty(t) {
  if (t == null)
    return !0;
  if (isArrayLike(t) && (isArray(t) || typeof t == "string" || typeof t.splice == "function" || isBuffer(t) || isTypedArray(t) || isArguments(t)))
    return !t.length;
  var e = getTag(t);
  if (e == mapTag$2 || e == setTag$2)
    return !t.size;
  if (isPrototype(t))
    return !baseKeys(t).length;
  for (var i in t)
    if (hasOwnProperty$3.call(t, i))
      return !1;
  return !0;
}
function isEqual(t, e) {
  return baseIsEqual(t, e);
}
function isEqualWith(t, e, i) {
  i = typeof i == "function" ? i : void 0;
  var n = i ? i(t, e) : void 0;
  return n === void 0 ? baseIsEqual(t, e, void 0, i) : !!n;
}
var nativeIsFinite = root.isFinite;
function isFinite$1(t) {
  return typeof t == "number" && nativeIsFinite(t);
}
function isInteger(t) {
  return typeof t == "number" && t == toInteger(t);
}
function isMatch(t, e) {
  return t === e || baseIsMatch(t, e, getMatchData(e));
}
function isMatchWith(t, e, i) {
  return i = typeof i == "function" ? i : void 0, baseIsMatch(t, e, getMatchData(e), i);
}
var numberTag = "[object Number]";
function isNumber(t) {
  return typeof t == "number" || isObjectLike(t) && baseGetTag(t) == numberTag;
}
function isNaN$1(t) {
  return isNumber(t) && t != +t;
}
var isMaskable = coreJsData ? isFunction : stubFalse, CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.";
function isNative(t) {
  if (isMaskable(t))
    throw new Error(CORE_ERROR_TEXT);
  return baseIsNative(t);
}
function isNil(t) {
  return t == null;
}
function isNull(t) {
  return t === null;
}
var regexpTag = "[object RegExp]";
function baseIsRegExp(t) {
  return isObjectLike(t) && baseGetTag(t) == regexpTag;
}
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp, MAX_SAFE_INTEGER$3 = 9007199254740991;
function isSafeInteger(t) {
  return isInteger(t) && t >= -MAX_SAFE_INTEGER$3 && t <= MAX_SAFE_INTEGER$3;
}
function isUndefined(t) {
  return t === void 0;
}
var weakMapTag = "[object WeakMap]";
function isWeakMap(t) {
  return isObjectLike(t) && getTag(t) == weakMapTag;
}
var weakSetTag = "[object WeakSet]";
function isWeakSet(t) {
  return isObjectLike(t) && baseGetTag(t) == weakSetTag;
}
var CLONE_DEEP_FLAG$3 = 1;
function iteratee(t) {
  return baseIteratee(typeof t == "function" ? t : baseClone(t, CLONE_DEEP_FLAG$3));
}
var arrayProto$4 = Array.prototype, nativeJoin = arrayProto$4.join;
function join(t, e) {
  return t == null ? "" : nativeJoin.call(t, e);
}
var kebabCase = createCompounder(function(t, e, i) {
  return t + (i ? "-" : "") + e.toLowerCase();
}), keyBy = createAggregator(function(t, e, i) {
  baseAssignValue(t, i, e);
});
function strictLastIndexOf(t, e, i) {
  for (var n = i + 1; n--; )
    if (t[n] === e)
      return n;
  return n;
}
var nativeMax$5 = Math.max, nativeMin$7 = Math.min;
function lastIndexOf(t, e, i) {
  var n = t == null ? 0 : t.length;
  if (!n)
    return -1;
  var r = n;
  return i !== void 0 && (r = toInteger(i), r = r < 0 ? nativeMax$5(n + r, 0) : nativeMin$7(r, n - 1)), e === e ? strictLastIndexOf(t, e, r) : baseFindIndex(t, baseIsNaN, r, !0);
}
var lowerCase = createCompounder(function(t, e, i) {
  return t + (i ? " " : "") + e.toLowerCase();
}), lowerFirst = createCaseFirst("toLowerCase");
function baseLt(t, e) {
  return t < e;
}
var lt = createRelationalOperation(baseLt), lte = createRelationalOperation(function(t, e) {
  return t <= e;
});
function mapKeys(t, e) {
  var i = {};
  return e = baseIteratee(e), baseForOwn(t, function(n, r, s) {
    baseAssignValue(i, e(n, r, s), n);
  }), i;
}
function mapValues(t, e) {
  var i = {};
  return e = baseIteratee(e), baseForOwn(t, function(n, r, s) {
    baseAssignValue(i, r, e(n, r, s));
  }), i;
}
var CLONE_DEEP_FLAG$2 = 1;
function matches(t) {
  return baseMatches(baseClone(t, CLONE_DEEP_FLAG$2));
}
var CLONE_DEEP_FLAG$1 = 1;
function matchesProperty(t, e) {
  return baseMatchesProperty(t, baseClone(e, CLONE_DEEP_FLAG$1));
}
function baseExtremum(t, e, i) {
  for (var n = -1, r = t.length; ++n < r; ) {
    var s = t[n], a = e(s);
    if (a != null && (o === void 0 ? a === a && !isSymbol(a) : i(a, o)))
      var o = a, l = s;
  }
  return l;
}
function max(t) {
  return t && t.length ? baseExtremum(t, identity, baseGt) : void 0;
}
function maxBy(t, e) {
  return t && t.length ? baseExtremum(t, baseIteratee(e), baseGt) : void 0;
}
function baseSum(t, e) {
  for (var i, n = -1, r = t.length; ++n < r; ) {
    var s = e(t[n]);
    s !== void 0 && (i = i === void 0 ? s : i + s);
  }
  return i;
}
var NAN = NaN;
function baseMean(t, e) {
  var i = t == null ? 0 : t.length;
  return i ? baseSum(t, e) / i : NAN;
}
function mean(t) {
  return baseMean(t, identity);
}
function meanBy(t, e) {
  return baseMean(t, baseIteratee(e));
}
var merge = createAssigner(function(t, e, i) {
  baseMerge(t, e, i);
}), method = baseRest(function(t, e) {
  return function(i) {
    return baseInvoke(i, t, e);
  };
}), methodOf = baseRest(function(t, e) {
  return function(i) {
    return baseInvoke(t, i, e);
  };
});
function min(t) {
  return t && t.length ? baseExtremum(t, identity, baseLt) : void 0;
}
function minBy(t, e) {
  return t && t.length ? baseExtremum(t, baseIteratee(e), baseLt) : void 0;
}
function mixin$1(t, e, i) {
  var n = keys(e), r = baseFunctions(e, n), s = !(isObject(i) && "chain" in i) || !!i.chain, a = isFunction(t);
  return arrayEach(r, function(o) {
    var l = e[o];
    t[o] = l, a && (t.prototype[o] = function() {
      var u = this.__chain__;
      if (s || u) {
        var c = t(this.__wrapped__), f = c.__actions__ = copyArray(this.__actions__);
        return f.push({ func: l, args: arguments, thisArg: t }), c.__chain__ = u, c;
      }
      return l.apply(t, arrayPush([this.value()], arguments));
    });
  }), t;
}
var multiply = createMathOperation(function(t, e) {
  return t * e;
}, 1), FUNC_ERROR_TEXT$3 = "Expected a function";
function negate(t) {
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$3);
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return !t.call(this);
      case 1:
        return !t.call(this, e[0]);
      case 2:
        return !t.call(this, e[0], e[1]);
      case 3:
        return !t.call(this, e[0], e[1], e[2]);
    }
    return !t.apply(this, e);
  };
}
function iteratorToArray(t) {
  for (var e, i = []; !(e = t.next()).done; )
    i.push(e.value);
  return i;
}
var mapTag$1 = "[object Map]", setTag$1 = "[object Set]", symIterator$1 = Symbol$1 ? Symbol$1.iterator : void 0;
function toArray(t) {
  if (!t)
    return [];
  if (isArrayLike(t))
    return isString(t) ? stringToArray(t) : copyArray(t);
  if (symIterator$1 && t[symIterator$1])
    return iteratorToArray(t[symIterator$1]());
  var e = getTag(t), i = e == mapTag$1 ? mapToArray : e == setTag$1 ? setToArray : values;
  return i(t);
}
function wrapperNext() {
  this.__values__ === void 0 && (this.__values__ = toArray(this.value()));
  var t = this.__index__ >= this.__values__.length, e = t ? void 0 : this.__values__[this.__index__++];
  return { done: t, value: e };
}
function baseNth(t, e) {
  var i = t.length;
  if (i)
    return e += e < 0 ? i : 0, isIndex(e, i) ? t[e] : void 0;
}
function nth(t, e) {
  return t && t.length ? baseNth(t, toInteger(e)) : void 0;
}
function nthArg(t) {
  return t = toInteger(t), baseRest(function(e) {
    return baseNth(e, t);
  });
}
function baseUnset(t, e) {
  return e = castPath(e, t), t = parent(t, e), t == null || delete t[toKey(last(e))];
}
function customOmitClone(t) {
  return isPlainObject(t) ? void 0 : t;
}
var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4, omit = flatRest(function(t, e) {
  var i = {};
  if (t == null)
    return i;
  var n = !1;
  e = arrayMap(e, function(s) {
    return s = castPath(s, t), n || (n = s.length > 1), s;
  }), copyObject(t, getAllKeysIn(t), i), n && (i = baseClone(i, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone));
  for (var r = e.length; r--; )
    baseUnset(i, e[r]);
  return i;
});
function baseSet(t, e, i, n) {
  if (!isObject(t))
    return t;
  e = castPath(e, t);
  for (var r = -1, s = e.length, a = s - 1, o = t; o != null && ++r < s; ) {
    var l = toKey(e[r]), u = i;
    if (l === "__proto__" || l === "constructor" || l === "prototype")
      return t;
    if (r != a) {
      var c = o[l];
      u = n ? n(c, l, o) : void 0, u === void 0 && (u = isObject(c) ? c : isIndex(e[r + 1]) ? [] : {});
    }
    assignValue(o, l, u), o = o[l];
  }
  return t;
}
function basePickBy(t, e, i) {
  for (var n = -1, r = e.length, s = {}; ++n < r; ) {
    var a = e[n], o = baseGet(t, a);
    i(o, a) && baseSet(s, castPath(a, t), o);
  }
  return s;
}
function pickBy(t, e) {
  if (t == null)
    return {};
  var i = arrayMap(getAllKeysIn(t), function(n) {
    return [n];
  });
  return e = baseIteratee(e), basePickBy(t, i, function(n, r) {
    return e(n, r[0]);
  });
}
function omitBy(t, e) {
  return pickBy(t, negate(baseIteratee(e)));
}
function once(t) {
  return before(2, t);
}
function baseSortBy(t, e) {
  var i = t.length;
  for (t.sort(e); i--; )
    t[i] = t[i].value;
  return t;
}
function compareAscending(t, e) {
  if (t !== e) {
    var i = t !== void 0, n = t === null, r = t === t, s = isSymbol(t), a = e !== void 0, o = e === null, l = e === e, u = isSymbol(e);
    if (!o && !u && !s && t > e || s && a && l && !o && !u || n && a && l || !i && l || !r)
      return 1;
    if (!n && !s && !u && t < e || u && i && r && !n && !s || o && i && r || !a && r || !l)
      return -1;
  }
  return 0;
}
function compareMultiple(t, e, i) {
  for (var n = -1, r = t.criteria, s = e.criteria, a = r.length, o = i.length; ++n < a; ) {
    var l = compareAscending(r[n], s[n]);
    if (l) {
      if (n >= o)
        return l;
      var u = i[n];
      return l * (u == "desc" ? -1 : 1);
    }
  }
  return t.index - e.index;
}
function baseOrderBy(t, e, i) {
  e.length ? e = arrayMap(e, function(s) {
    return isArray(s) ? function(a) {
      return baseGet(a, s.length === 1 ? s[0] : s);
    } : s;
  }) : e = [identity];
  var n = -1;
  e = arrayMap(e, baseUnary(baseIteratee));
  var r = baseMap(t, function(s, a, o) {
    var l = arrayMap(e, function(u) {
      return u(s);
    });
    return { criteria: l, index: ++n, value: s };
  });
  return baseSortBy(r, function(s, a) {
    return compareMultiple(s, a, i);
  });
}
function orderBy(t, e, i, n) {
  return t == null ? [] : (isArray(e) || (e = e == null ? [] : [e]), i = n ? void 0 : i, isArray(i) || (i = i == null ? [] : [i]), baseOrderBy(t, e, i));
}
function createOver(t) {
  return flatRest(function(e) {
    return e = arrayMap(e, baseUnary(baseIteratee)), baseRest(function(i) {
      var n = this;
      return t(e, function(r) {
        return apply(r, n, i);
      });
    });
  });
}
var over = createOver(arrayMap), castRest = baseRest, nativeMin$6 = Math.min, overArgs = castRest(function(t, e) {
  e = e.length == 1 && isArray(e[0]) ? arrayMap(e[0], baseUnary(baseIteratee)) : arrayMap(baseFlatten(e, 1), baseUnary(baseIteratee));
  var i = e.length;
  return baseRest(function(n) {
    for (var r = -1, s = nativeMin$6(n.length, i); ++r < s; )
      n[r] = e[r].call(this, n[r]);
    return apply(t, this, n);
  });
}), overEvery = createOver(arrayEvery), overSome = createOver(arraySome), MAX_SAFE_INTEGER$2 = 9007199254740991, nativeFloor$3 = Math.floor;
function baseRepeat(t, e) {
  var i = "";
  if (!t || e < 1 || e > MAX_SAFE_INTEGER$2)
    return i;
  do
    e % 2 && (i += t), e = nativeFloor$3(e / 2), e && (t += t);
  while (e);
  return i;
}
var asciiSize = baseProperty("length"), rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f", rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")", reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
function unicodeSize(t) {
  for (var e = reUnicode.lastIndex = 0; reUnicode.test(t); )
    ++e;
  return e;
}
function stringSize(t) {
  return hasUnicode(t) ? unicodeSize(t) : asciiSize(t);
}
var nativeCeil$2 = Math.ceil;
function createPadding(t, e) {
  e = e === void 0 ? " " : baseToString(e);
  var i = e.length;
  if (i < 2)
    return i ? baseRepeat(e, t) : e;
  var n = baseRepeat(e, nativeCeil$2(t / stringSize(e)));
  return hasUnicode(e) ? castSlice(stringToArray(n), 0, t).join("") : n.slice(0, t);
}
var nativeCeil$1 = Math.ceil, nativeFloor$2 = Math.floor;
function pad(t, e, i) {
  t = toString(t), e = toInteger(e);
  var n = e ? stringSize(t) : 0;
  if (!e || n >= e)
    return t;
  var r = (e - n) / 2;
  return createPadding(nativeFloor$2(r), i) + t + createPadding(nativeCeil$1(r), i);
}
function padEnd(t, e, i) {
  t = toString(t), e = toInteger(e);
  var n = e ? stringSize(t) : 0;
  return e && n < e ? t + createPadding(e - n, i) : t;
}
function padStart(t, e, i) {
  t = toString(t), e = toInteger(e);
  var n = e ? stringSize(t) : 0;
  return e && n < e ? createPadding(e - n, i) + t : t;
}
var reTrimStart$1 = /^\s+/, nativeParseInt = root.parseInt;
function parseInt$1(t, e, i) {
  return i || e == null ? e = 0 : e && (e = +e), nativeParseInt(toString(t).replace(reTrimStart$1, ""), e || 0);
}
var WRAP_PARTIAL_FLAG = 32, partial = baseRest(function(t, e) {
  var i = replaceHolders(e, getHolder(partial));
  return createWrap(t, WRAP_PARTIAL_FLAG, void 0, e, i);
});
partial.placeholder = {};
var WRAP_PARTIAL_RIGHT_FLAG = 64, partialRight = baseRest(function(t, e) {
  var i = replaceHolders(e, getHolder(partialRight));
  return createWrap(t, WRAP_PARTIAL_RIGHT_FLAG, void 0, e, i);
});
partialRight.placeholder = {};
var partition = createAggregator(function(t, e, i) {
  t[i ? 0 : 1].push(e);
}, function() {
  return [[], []];
});
function basePick(t, e) {
  return basePickBy(t, e, function(i, n) {
    return hasIn(t, n);
  });
}
var pick = flatRest(function(t, e) {
  return t == null ? {} : basePick(t, e);
});
function wrapperPlant(t) {
  for (var e, i = this; i instanceof baseLodash; ) {
    var n = wrapperClone(i);
    n.__index__ = 0, n.__values__ = void 0, e ? r.__wrapped__ = n : e = n;
    var r = n;
    i = i.__wrapped__;
  }
  return r.__wrapped__ = t, e;
}
function propertyOf(t) {
  return function(e) {
    return t == null ? void 0 : baseGet(t, e);
  };
}
function baseIndexOfWith(t, e, i, n) {
  for (var r = i - 1, s = t.length; ++r < s; )
    if (n(t[r], e))
      return r;
  return -1;
}
var arrayProto$3 = Array.prototype, splice$1 = arrayProto$3.splice;
function basePullAll(t, e, i, n) {
  var r = n ? baseIndexOfWith : baseIndexOf, s = -1, a = e.length, o = t;
  for (t === e && (e = copyArray(e)), i && (o = arrayMap(t, baseUnary(i))); ++s < a; )
    for (var l = 0, u = e[s], c = i ? i(u) : u; (l = r(o, c, l, n)) > -1; )
      o !== t && splice$1.call(o, l, 1), splice$1.call(t, l, 1);
  return t;
}
function pullAll(t, e) {
  return t && t.length && e && e.length ? basePullAll(t, e) : t;
}
var pull = baseRest(pullAll);
function pullAllBy(t, e, i) {
  return t && t.length && e && e.length ? basePullAll(t, e, baseIteratee(i)) : t;
}
function pullAllWith(t, e, i) {
  return t && t.length && e && e.length ? basePullAll(t, e, void 0, i) : t;
}
var arrayProto$2 = Array.prototype, splice = arrayProto$2.splice;
function basePullAt(t, e) {
  for (var i = t ? e.length : 0, n = i - 1; i--; ) {
    var r = e[i];
    if (i == n || r !== s) {
      var s = r;
      isIndex(r) ? splice.call(t, r, 1) : baseUnset(t, r);
    }
  }
  return t;
}
var pullAt = flatRest(function(t, e) {
  var i = t == null ? 0 : t.length, n = baseAt(t, e);
  return basePullAt(t, arrayMap(e, function(r) {
    return isIndex(r, i) ? +r : r;
  }).sort(compareAscending)), n;
}), nativeFloor$1 = Math.floor, nativeRandom$1 = Math.random;
function baseRandom(t, e) {
  return t + nativeFloor$1(nativeRandom$1() * (e - t + 1));
}
var freeParseFloat = parseFloat, nativeMin$5 = Math.min, nativeRandom = Math.random;
function random(t, e, i) {
  if (i && typeof i != "boolean" && isIterateeCall(t, e, i) && (e = i = void 0), i === void 0 && (typeof e == "boolean" ? (i = e, e = void 0) : typeof t == "boolean" && (i = t, t = void 0)), t === void 0 && e === void 0 ? (t = 0, e = 1) : (t = toFinite(t), e === void 0 ? (e = t, t = 0) : e = toFinite(e)), t > e) {
    var n = t;
    t = e, e = n;
  }
  if (i || t % 1 || e % 1) {
    var r = nativeRandom();
    return nativeMin$5(t + r * (e - t + freeParseFloat("1e-" + ((r + "").length - 1))), e);
  }
  return baseRandom(t, e);
}
var nativeCeil = Math.ceil, nativeMax$4 = Math.max;
function baseRange(t, e, i, n) {
  for (var r = -1, s = nativeMax$4(nativeCeil((e - t) / (i || 1)), 0), a = Array(s); s--; )
    a[n ? s : ++r] = t, t += i;
  return a;
}
function createRange(t) {
  return function(e, i, n) {
    return n && typeof n != "number" && isIterateeCall(e, i, n) && (i = n = void 0), e = toFinite(e), i === void 0 ? (i = e, e = 0) : i = toFinite(i), n = n === void 0 ? e < i ? 1 : -1 : toFinite(n), baseRange(e, i, n, t);
  };
}
var range = createRange(), rangeRight = createRange(!0), WRAP_REARG_FLAG = 256, rearg = flatRest(function(t, e) {
  return createWrap(t, WRAP_REARG_FLAG, void 0, void 0, void 0, e);
});
function baseReduce(t, e, i, n, r) {
  return r(t, function(s, a, o) {
    i = n ? (n = !1, s) : e(i, s, a, o);
  }), i;
}
function reduce(t, e, i) {
  var n = isArray(t) ? arrayReduce : baseReduce, r = arguments.length < 3;
  return n(t, baseIteratee(e), i, r, baseEach);
}
function arrayReduceRight(t, e, i, n) {
  var r = t == null ? 0 : t.length;
  for (n && r && (i = t[--r]); r--; )
    i = e(i, t[r], r, t);
  return i;
}
function reduceRight(t, e, i) {
  var n = isArray(t) ? arrayReduceRight : baseReduce, r = arguments.length < 3;
  return n(t, baseIteratee(e), i, r, baseEachRight);
}
function reject(t, e) {
  var i = isArray(t) ? arrayFilter : baseFilter;
  return i(t, negate(baseIteratee(e)));
}
function remove(t, e) {
  var i = [];
  if (!(t && t.length))
    return i;
  var n = -1, r = [], s = t.length;
  for (e = baseIteratee(e); ++n < s; ) {
    var a = t[n];
    e(a, n, t) && (i.push(a), r.push(n));
  }
  return basePullAt(t, r), i;
}
function repeat(t, e, i) {
  return (i ? isIterateeCall(t, e, i) : e === void 0) ? e = 1 : e = toInteger(e), baseRepeat(toString(t), e);
}
function replace() {
  var t = arguments, e = toString(t[0]);
  return t.length < 3 ? e : e.replace(t[1], t[2]);
}
var FUNC_ERROR_TEXT$2 = "Expected a function";
function rest(t, e) {
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$2);
  return e = e === void 0 ? e : toInteger(e), baseRest(t, e);
}
function result(t, e, i) {
  e = castPath(e, t);
  var n = -1, r = e.length;
  for (r || (r = 1, t = void 0); ++n < r; ) {
    var s = t?.[toKey(e[n])];
    s === void 0 && (n = r, s = i), t = isFunction(s) ? s.call(t) : s;
  }
  return t;
}
var arrayProto$1 = Array.prototype, nativeReverse = arrayProto$1.reverse;
function reverse(t) {
  return t == null ? t : nativeReverse.call(t);
}
var round = createRound("round");
function arraySample(t) {
  var e = t.length;
  return e ? t[baseRandom(0, e - 1)] : void 0;
}
function baseSample(t) {
  return arraySample(values(t));
}
function sample(t) {
  var e = isArray(t) ? arraySample : baseSample;
  return e(t);
}
function shuffleSelf(t, e) {
  var i = -1, n = t.length, r = n - 1;
  for (e = e === void 0 ? n : e; ++i < e; ) {
    var s = baseRandom(i, r), a = t[s];
    t[s] = t[i], t[i] = a;
  }
  return t.length = e, t;
}
function arraySampleSize(t, e) {
  return shuffleSelf(copyArray(t), baseClamp(e, 0, t.length));
}
function baseSampleSize(t, e) {
  var i = values(t);
  return shuffleSelf(i, baseClamp(e, 0, i.length));
}
function sampleSize(t, e, i) {
  (i ? isIterateeCall(t, e, i) : e === void 0) ? e = 1 : e = toInteger(e);
  var n = isArray(t) ? arraySampleSize : baseSampleSize;
  return n(t, e);
}
function set(t, e, i) {
  return t == null ? t : baseSet(t, e, i);
}
function setWith(t, e, i, n) {
  return n = typeof n == "function" ? n : void 0, t == null ? t : baseSet(t, e, i, n);
}
function arrayShuffle(t) {
  return shuffleSelf(copyArray(t));
}
function baseShuffle(t) {
  return shuffleSelf(values(t));
}
function shuffle(t) {
  var e = isArray(t) ? arrayShuffle : baseShuffle;
  return e(t);
}
var mapTag = "[object Map]", setTag = "[object Set]";
function size(t) {
  if (t == null)
    return 0;
  if (isArrayLike(t))
    return isString(t) ? stringSize(t) : t.length;
  var e = getTag(t);
  return e == mapTag || e == setTag ? t.size : baseKeys(t).length;
}
function slice(t, e, i) {
  var n = t == null ? 0 : t.length;
  return n ? (i && typeof i != "number" && isIterateeCall(t, e, i) ? (e = 0, i = n) : (e = e == null ? 0 : toInteger(e), i = i === void 0 ? n : toInteger(i)), baseSlice(t, e, i)) : [];
}
var snakeCase = createCompounder(function(t, e, i) {
  return t + (i ? "_" : "") + e.toLowerCase();
});
function baseSome(t, e) {
  var i;
  return baseEach(t, function(n, r, s) {
    return i = e(n, r, s), !i;
  }), !!i;
}
function some(t, e, i) {
  var n = isArray(t) ? arraySome : baseSome;
  return i && isIterateeCall(t, e, i) && (e = void 0), n(t, baseIteratee(e));
}
var sortBy = baseRest(function(t, e) {
  if (t == null)
    return [];
  var i = e.length;
  return i > 1 && isIterateeCall(t, e[0], e[1]) ? e = [] : i > 2 && isIterateeCall(e[0], e[1], e[2]) && (e = [e[0]]), baseOrderBy(t, baseFlatten(e, 1), []);
}), MAX_ARRAY_LENGTH$4 = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH$4 - 1, nativeFloor = Math.floor, nativeMin$4 = Math.min;
function baseSortedIndexBy(t, e, i, n) {
  var r = 0, s = t == null ? 0 : t.length;
  if (s === 0)
    return 0;
  e = i(e);
  for (var a = e !== e, o = e === null, l = isSymbol(e), u = e === void 0; r < s; ) {
    var c = nativeFloor((r + s) / 2), f = i(t[c]), p = f !== void 0, y = f === null, b = f === f, x = isSymbol(f);
    if (a)
      var w = n || b;
    else u ? w = b && (n || p) : o ? w = b && p && (n || !y) : l ? w = b && p && !y && (n || !x) : y || x ? w = !1 : w = n ? f <= e : f < e;
    w ? r = c + 1 : s = c;
  }
  return nativeMin$4(s, MAX_ARRAY_INDEX);
}
var MAX_ARRAY_LENGTH$3 = 4294967295, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH$3 >>> 1;
function baseSortedIndex(t, e, i) {
  var n = 0, r = t == null ? n : t.length;
  if (typeof e == "number" && e === e && r <= HALF_MAX_ARRAY_LENGTH) {
    for (; n < r; ) {
      var s = n + r >>> 1, a = t[s];
      a !== null && !isSymbol(a) && (i ? a <= e : a < e) ? n = s + 1 : r = s;
    }
    return r;
  }
  return baseSortedIndexBy(t, e, identity, i);
}
function sortedIndex(t, e) {
  return baseSortedIndex(t, e);
}
function sortedIndexBy(t, e, i) {
  return baseSortedIndexBy(t, e, baseIteratee(i));
}
function sortedIndexOf(t, e) {
  var i = t == null ? 0 : t.length;
  if (i) {
    var n = baseSortedIndex(t, e);
    if (n < i && eq(t[n], e))
      return n;
  }
  return -1;
}
function sortedLastIndex(t, e) {
  return baseSortedIndex(t, e, !0);
}
function sortedLastIndexBy(t, e, i) {
  return baseSortedIndexBy(t, e, baseIteratee(i), !0);
}
function sortedLastIndexOf(t, e) {
  var i = t == null ? 0 : t.length;
  if (i) {
    var n = baseSortedIndex(t, e, !0) - 1;
    if (eq(t[n], e))
      return n;
  }
  return -1;
}
function baseSortedUniq(t, e) {
  for (var i = -1, n = t.length, r = 0, s = []; ++i < n; ) {
    var a = t[i], o = e ? e(a) : a;
    if (!i || !eq(o, l)) {
      var l = o;
      s[r++] = a === 0 ? 0 : a;
    }
  }
  return s;
}
function sortedUniq(t) {
  return t && t.length ? baseSortedUniq(t) : [];
}
function sortedUniqBy(t, e) {
  return t && t.length ? baseSortedUniq(t, baseIteratee(e)) : [];
}
var MAX_ARRAY_LENGTH$2 = 4294967295;
function split(t, e, i) {
  return i && typeof i != "number" && isIterateeCall(t, e, i) && (e = i = void 0), i = i === void 0 ? MAX_ARRAY_LENGTH$2 : i >>> 0, i ? (t = toString(t), t && (typeof e == "string" || e != null && !isRegExp(e)) && (e = baseToString(e), !e && hasUnicode(t)) ? castSlice(stringToArray(t), 0, i) : t.split(e, i)) : [];
}
var FUNC_ERROR_TEXT$1 = "Expected a function", nativeMax$3 = Math.max;
function spread(t, e) {
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT$1);
  return e = e == null ? 0 : nativeMax$3(toInteger(e), 0), baseRest(function(i) {
    var n = i[e], r = castSlice(i, 0, e);
    return n && arrayPush(r, n), apply(t, this, r);
  });
}
var startCase = createCompounder(function(t, e, i) {
  return t + (i ? " " : "") + upperFirst(e);
});
function startsWith(t, e, i) {
  return t = toString(t), i = i == null ? 0 : baseClamp(toInteger(i), 0, t.length), e = baseToString(e), t.slice(i, i + e.length) == e;
}
function stubObject() {
  return {};
}
function stubString() {
  return "";
}
function stubTrue() {
  return !0;
}
var subtract = createMathOperation(function(t, e) {
  return t - e;
}, 0);
function sum(t) {
  return t && t.length ? baseSum(t, identity) : 0;
}
function sumBy(t, e) {
  return t && t.length ? baseSum(t, baseIteratee(e)) : 0;
}
function tail(t) {
  var e = t == null ? 0 : t.length;
  return e ? baseSlice(t, 1, e) : [];
}
function take(t, e, i) {
  return t && t.length ? (e = i || e === void 0 ? 1 : toInteger(e), baseSlice(t, 0, e < 0 ? 0 : e)) : [];
}
function takeRight(t, e, i) {
  var n = t == null ? 0 : t.length;
  return n ? (e = i || e === void 0 ? 1 : toInteger(e), e = n - e, baseSlice(t, e < 0 ? 0 : e, n)) : [];
}
function takeRightWhile(t, e) {
  return t && t.length ? baseWhile(t, baseIteratee(e), !1, !0) : [];
}
function takeWhile(t, e) {
  return t && t.length ? baseWhile(t, baseIteratee(e)) : [];
}
function tap(t, e) {
  return e(t), t;
}
var objectProto$2 = Object.prototype, hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function customDefaultsAssignIn(t, e, i, n) {
  return t === void 0 || eq(t, objectProto$2[i]) && !hasOwnProperty$2.call(n, i) ? e : t;
}
var stringEscapes = {
  "\\": "\\",
  "'": "'",
  "\n": "n",
  "\r": "r",
  "\u2028": "u2028",
  "\u2029": "u2029"
};
function escapeStringChar(t) {
  return "\\" + stringEscapes[t];
}
var reInterpolate = /<%=([\s\S]+?)%>/g, reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, templateSettings = {
  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  escape: reEscape,
  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  evaluate: reEvaluate,
  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  interpolate: reInterpolate,
  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type {string}
   */
  variable: "",
  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type {Object}
   */
  imports: {
    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type {Function}
     */
    _: { escape }
  }
}, INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`", reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g, reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/, reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, reNoMatch = /($^)/, reUnescapedString = /['\n\r\u2028\u2029\\]/g, objectProto$1 = Object.prototype, hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function template(t, e, i) {
  var n = templateSettings.imports._.templateSettings || templateSettings;
  i && isIterateeCall(t, e, i) && (e = void 0), t = toString(t), e = assignInWith({}, e, n, customDefaultsAssignIn);
  var r = assignInWith({}, e.imports, n.imports, customDefaultsAssignIn), s = keys(r), a = baseValues(r, s), o, l, u = 0, c = e.interpolate || reNoMatch, f = "__p += '", p = RegExp(
    (e.escape || reNoMatch).source + "|" + c.source + "|" + (c === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (e.evaluate || reNoMatch).source + "|$",
    "g"
  ), y = hasOwnProperty$1.call(e, "sourceURL") ? "//# sourceURL=" + (e.sourceURL + "").replace(/\s/g, " ") + `
` : "";
  t.replace(p, function(w, A, E, O, L, k) {
    return E || (E = O), f += t.slice(u, k).replace(reUnescapedString, escapeStringChar), A && (o = !0, f += `' +
__e(` + A + `) +
'`), L && (l = !0, f += `';
` + L + `;
__p += '`), E && (f += `' +
((__t = (` + E + `)) == null ? '' : __t) +
'`), u = k + w.length, w;
  }), f += `';
`;
  var b = hasOwnProperty$1.call(e, "variable") && e.variable;
  if (!b)
    f = `with (obj) {
` + f + `
}
`;
  else if (reForbiddenIdentifierChars.test(b))
    throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
  f = (l ? f.replace(reEmptyStringLeading, "") : f).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), f = "function(" + (b || "obj") + `) {
` + (b ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + f + `return __p
}`;
  var x = attempt(function() {
    return Function(s, y + "return " + f).apply(void 0, a);
  });
  if (x.source = f, isError(x))
    throw x;
  return x;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(t, e, i) {
  var n = !0, r = !0;
  if (typeof t != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  return isObject(i) && (n = "leading" in i ? !!i.leading : n, r = "trailing" in i ? !!i.trailing : r), debounce(t, e, {
    leading: n,
    maxWait: e,
    trailing: r
  });
}
function thru(t, e) {
  return e(t);
}
var MAX_SAFE_INTEGER$1 = 9007199254740991, MAX_ARRAY_LENGTH$1 = 4294967295, nativeMin$3 = Math.min;
function times(t, e) {
  if (t = toInteger(t), t < 1 || t > MAX_SAFE_INTEGER$1)
    return [];
  var i = MAX_ARRAY_LENGTH$1, n = nativeMin$3(t, MAX_ARRAY_LENGTH$1);
  e = castFunction(e), t -= MAX_ARRAY_LENGTH$1;
  for (var r = baseTimes(n, e); ++i < t; )
    e(i);
  return r;
}
function wrapperToIterator() {
  return this;
}
function baseWrapperValue(t, e) {
  var i = t;
  return i instanceof LazyWrapper && (i = i.value()), arrayReduce(e, function(n, r) {
    return r.func.apply(r.thisArg, arrayPush([n], r.args));
  }, i);
}
function wrapperValue() {
  return baseWrapperValue(this.__wrapped__, this.__actions__);
}
function toLower(t) {
  return toString(t).toLowerCase();
}
function toPath(t) {
  return isArray(t) ? arrayMap(t, toKey) : isSymbol(t) ? [t] : copyArray(stringToPath(toString(t)));
}
var MAX_SAFE_INTEGER = 9007199254740991;
function toSafeInteger(t) {
  return t ? baseClamp(toInteger(t), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : t === 0 ? t : 0;
}
function toUpper(t) {
  return toString(t).toUpperCase();
}
function transform(t, e, i) {
  var n = isArray(t), r = n || isBuffer(t) || isTypedArray(t);
  if (e = baseIteratee(e), i == null) {
    var s = t && t.constructor;
    r ? i = n ? new s() : [] : isObject(t) ? i = isFunction(s) ? baseCreate(getPrototype(t)) : {} : i = {};
  }
  return (r ? arrayEach : baseForOwn)(t, function(a, o, l) {
    return e(i, a, o, l);
  }), i;
}
function charsEndIndex(t, e) {
  for (var i = t.length; i-- && baseIndexOf(e, t[i], 0) > -1; )
    ;
  return i;
}
function charsStartIndex(t, e) {
  for (var i = -1, n = t.length; ++i < n && baseIndexOf(e, t[i], 0) > -1; )
    ;
  return i;
}
function trim(t, e, i) {
  if (t = toString(t), t && (i || e === void 0))
    return baseTrim(t);
  if (!t || !(e = baseToString(e)))
    return t;
  var n = stringToArray(t), r = stringToArray(e), s = charsStartIndex(n, r), a = charsEndIndex(n, r) + 1;
  return castSlice(n, s, a).join("");
}
function trimEnd(t, e, i) {
  if (t = toString(t), t && (i || e === void 0))
    return t.slice(0, trimmedEndIndex(t) + 1);
  if (!t || !(e = baseToString(e)))
    return t;
  var n = stringToArray(t), r = charsEndIndex(n, stringToArray(e)) + 1;
  return castSlice(n, 0, r).join("");
}
var reTrimStart = /^\s+/;
function trimStart(t, e, i) {
  if (t = toString(t), t && (i || e === void 0))
    return t.replace(reTrimStart, "");
  if (!t || !(e = baseToString(e)))
    return t;
  var n = stringToArray(t), r = charsStartIndex(n, stringToArray(e));
  return castSlice(n, r).join("");
}
var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...", reFlags = /\w*$/;
function truncate(t, e) {
  var i = DEFAULT_TRUNC_LENGTH, n = DEFAULT_TRUNC_OMISSION;
  if (isObject(e)) {
    var r = "separator" in e ? e.separator : r;
    i = "length" in e ? toInteger(e.length) : i, n = "omission" in e ? baseToString(e.omission) : n;
  }
  t = toString(t);
  var s = t.length;
  if (hasUnicode(t)) {
    var a = stringToArray(t);
    s = a.length;
  }
  if (i >= s)
    return t;
  var o = i - stringSize(n);
  if (o < 1)
    return n;
  var l = a ? castSlice(a, 0, o).join("") : t.slice(0, o);
  if (r === void 0)
    return l + n;
  if (a && (o += l.length - o), isRegExp(r)) {
    if (t.slice(o).search(r)) {
      var u, c = l;
      for (r.global || (r = RegExp(r.source, toString(reFlags.exec(r)) + "g")), r.lastIndex = 0; u = r.exec(c); )
        var f = u.index;
      l = l.slice(0, f === void 0 ? o : f);
    }
  } else if (t.indexOf(baseToString(r), o) != o) {
    var p = l.lastIndexOf(r);
    p > -1 && (l = l.slice(0, p));
  }
  return l + n;
}
function unary(t) {
  return ary(t, 1);
}
var htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
}, unescapeHtmlChar = basePropertyOf(htmlUnescapes), reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(t) {
  return t = toString(t), t && reHasEscapedHtml.test(t) ? t.replace(reEscapedHtml, unescapeHtmlChar) : t;
}
var INFINITY = 1 / 0, createSet = Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY ? function(t) {
  return new Set(t);
} : noop, LARGE_ARRAY_SIZE = 200;
function baseUniq(t, e, i) {
  var n = -1, r = arrayIncludes, s = t.length, a = !0, o = [], l = o;
  if (i)
    a = !1, r = arrayIncludesWith;
  else if (s >= LARGE_ARRAY_SIZE) {
    var u = e ? null : createSet(t);
    if (u)
      return setToArray(u);
    a = !1, r = cacheHas, l = new SetCache();
  } else
    l = e ? [] : o;
  e:
    for (; ++n < s; ) {
      var c = t[n], f = e ? e(c) : c;
      if (c = i || c !== 0 ? c : 0, a && f === f) {
        for (var p = l.length; p--; )
          if (l[p] === f)
            continue e;
        e && l.push(f), o.push(c);
      } else r(l, f, i) || (l !== o && l.push(f), o.push(c));
    }
  return o;
}
var union = baseRest(function(t) {
  return baseUniq(baseFlatten(t, 1, isArrayLikeObject, !0));
}), unionBy = baseRest(function(t) {
  var e = last(t);
  return isArrayLikeObject(e) && (e = void 0), baseUniq(baseFlatten(t, 1, isArrayLikeObject, !0), baseIteratee(e));
}), unionWith = baseRest(function(t) {
  var e = last(t);
  return e = typeof e == "function" ? e : void 0, baseUniq(baseFlatten(t, 1, isArrayLikeObject, !0), void 0, e);
});
function uniq(t) {
  return t && t.length ? baseUniq(t) : [];
}
function uniqBy(t, e) {
  return t && t.length ? baseUniq(t, baseIteratee(e)) : [];
}
function uniqWith(t, e) {
  return e = typeof e == "function" ? e : void 0, t && t.length ? baseUniq(t, void 0, e) : [];
}
var idCounter = 0;
function uniqueId(t) {
  var e = ++idCounter;
  return toString(t) + e;
}
function unset(t, e) {
  return t == null ? !0 : baseUnset(t, e);
}
var nativeMax$2 = Math.max;
function unzip(t) {
  if (!(t && t.length))
    return [];
  var e = 0;
  return t = arrayFilter(t, function(i) {
    if (isArrayLikeObject(i))
      return e = nativeMax$2(i.length, e), !0;
  }), baseTimes(e, function(i) {
    return arrayMap(t, baseProperty(i));
  });
}
function unzipWith(t, e) {
  if (!(t && t.length))
    return [];
  var i = unzip(t);
  return e == null ? i : arrayMap(i, function(n) {
    return apply(e, void 0, n);
  });
}
function baseUpdate(t, e, i, n) {
  return baseSet(t, e, i(baseGet(t, e)), n);
}
function update(t, e, i) {
  return t == null ? t : baseUpdate(t, e, castFunction(i));
}
function updateWith(t, e, i, n) {
  return n = typeof n == "function" ? n : void 0, t == null ? t : baseUpdate(t, e, castFunction(i), n);
}
var upperCase = createCompounder(function(t, e, i) {
  return t + (i ? " " : "") + e.toUpperCase();
});
function valuesIn(t) {
  return t == null ? [] : baseValues(t, keysIn(t));
}
var without = baseRest(function(t, e) {
  return isArrayLikeObject(t) ? baseDifference(t, e) : [];
});
function wrap(t, e) {
  return partial(castFunction(e), t);
}
var wrapperAt = flatRest(function(t) {
  var e = t.length, i = e ? t[0] : 0, n = this.__wrapped__, r = function(s) {
    return baseAt(s, t);
  };
  return e > 1 || this.__actions__.length || !(n instanceof LazyWrapper) || !isIndex(i) ? this.thru(r) : (n = n.slice(i, +i + (e ? 1 : 0)), n.__actions__.push({
    func: thru,
    args: [r],
    thisArg: void 0
  }), new LodashWrapper(n, this.__chain__).thru(function(s) {
    return e && !s.length && s.push(void 0), s;
  }));
});
function wrapperChain() {
  return chain(this);
}
function wrapperReverse() {
  var t = this.__wrapped__;
  if (t instanceof LazyWrapper) {
    var e = t;
    return this.__actions__.length && (e = new LazyWrapper(this)), e = e.reverse(), e.__actions__.push({
      func: thru,
      args: [reverse],
      thisArg: void 0
    }), new LodashWrapper(e, this.__chain__);
  }
  return this.thru(reverse);
}
function baseXor(t, e, i) {
  var n = t.length;
  if (n < 2)
    return n ? baseUniq(t[0]) : [];
  for (var r = -1, s = Array(n); ++r < n; )
    for (var a = t[r], o = -1; ++o < n; )
      o != r && (s[r] = baseDifference(s[r] || a, t[o], e, i));
  return baseUniq(baseFlatten(s, 1), e, i);
}
var xor = baseRest(function(t) {
  return baseXor(arrayFilter(t, isArrayLikeObject));
}), xorBy = baseRest(function(t) {
  var e = last(t);
  return isArrayLikeObject(e) && (e = void 0), baseXor(arrayFilter(t, isArrayLikeObject), baseIteratee(e));
}), xorWith = baseRest(function(t) {
  var e = last(t);
  return e = typeof e == "function" ? e : void 0, baseXor(arrayFilter(t, isArrayLikeObject), void 0, e);
}), zip = baseRest(unzip);
function baseZipObject(t, e, i) {
  for (var n = -1, r = t.length, s = e.length, a = {}; ++n < r; ) {
    var o = n < s ? e[n] : void 0;
    i(a, t[n], o);
  }
  return a;
}
function zipObject(t, e) {
  return baseZipObject(t || [], e || [], assignValue);
}
function zipObjectDeep(t, e) {
  return baseZipObject(t || [], e || [], baseSet);
}
var zipWith = baseRest(function(t) {
  var e = t.length, i = e > 1 ? t[e - 1] : void 0;
  return i = typeof i == "function" ? (t.pop(), i) : void 0, unzipWith(t, i);
});
const array = {
  chunk,
  compact,
  concat,
  difference,
  differenceBy,
  differenceWith,
  drop,
  dropRight,
  dropRightWhile,
  dropWhile,
  fill,
  findIndex,
  findLastIndex,
  flatten,
  flattenDeep,
  flattenDepth,
  fromPairs,
  head,
  indexOf,
  initial,
  intersection,
  intersectionBy,
  intersectionWith,
  join,
  lastIndexOf,
  nth,
  pull,
  pullAll,
  pullAllBy,
  pullAllWith,
  pullAt,
  remove,
  reverse,
  slice,
  sortedIndex,
  sortedIndexBy,
  sortedIndexOf,
  sortedLastIndex,
  sortedLastIndexBy,
  sortedLastIndexOf,
  sortedUniq,
  sortedUniqBy,
  tail,
  take,
  takeRight,
  takeRightWhile,
  takeWhile,
  union,
  unionBy,
  unionWith,
  uniq,
  uniqBy,
  uniqWith,
  unzip,
  unzipWith,
  without,
  xor,
  xorBy,
  xorWith,
  zip,
  zipObject,
  zipObjectDeep,
  zipWith
}, collection = {
  countBy,
  every,
  filter,
  find,
  findLast,
  flatMap,
  flatMapDeep,
  flatMapDepth,
  forEach,
  forEachRight,
  groupBy,
  includes,
  invokeMap,
  keyBy,
  map,
  orderBy,
  partition,
  reduce,
  reduceRight,
  reject,
  sample,
  sampleSize,
  shuffle,
  size,
  some,
  sortBy
}, date$1 = {
  now
}, func = {
  after,
  ary,
  before,
  bind,
  bindKey,
  curry,
  curryRight,
  debounce,
  defer,
  delay,
  flip,
  memoize,
  once,
  overArgs,
  partial,
  partialRight,
  rearg,
  rest,
  spread,
  throttle,
  unary,
  wrap
}, lang = {
  castArray,
  clone,
  cloneDeep,
  cloneDeepWith,
  cloneWith,
  conformsTo,
  eq,
  gt,
  gte,
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBoolean,
  isBuffer,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFinite: isFinite$1,
  isFunction,
  isInteger,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNaN: isNaN$1,
  isNative,
  isNil,
  isNull,
  isNumber,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
  lt,
  lte,
  toArray,
  toFinite,
  toLength,
  toNumber,
  toPlainObject,
  toSafeInteger,
  toString
}, math = {
  add,
  ceil,
  divide,
  floor,
  max,
  maxBy,
  mean,
  meanBy,
  min,
  minBy,
  multiply,
  round,
  subtract,
  sum,
  sumBy
}, number = {
  clamp,
  inRange,
  random
}, object = {
  assign,
  assignIn,
  assignInWith,
  assignWith,
  at,
  create,
  defaults,
  defaultsDeep,
  findKey,
  findLastKey,
  forIn,
  forInRight,
  forOwn,
  forOwnRight,
  functions,
  functionsIn,
  get,
  has,
  hasIn,
  invert,
  invertBy,
  invoke,
  keysIn,
  mapKeys,
  mapValues,
  merge,
  mergeWith,
  omit,
  omitBy,
  pick,
  pickBy,
  result,
  set,
  setWith,
  toPairs,
  toPairsIn,
  transform,
  unset,
  update,
  updateWith,
  values,
  valuesIn
}, seq = {
  at: wrapperAt,
  chain,
  commit: wrapperCommit,
  next: wrapperNext,
  plant: wrapperPlant,
  reverse: wrapperReverse,
  tap,
  toIterator: wrapperToIterator,
  value: wrapperValue,
  wrapperChain
}, string = {
  camelCase,
  capitalize,
  deburr,
  endsWith,
  escape,
  escapeRegExp,
  kebabCase,
  lowerCase,
  lowerFirst,
  pad,
  padEnd,
  padStart,
  parseInt: parseInt$1,
  repeat,
  replace,
  snakeCase,
  split,
  startCase,
  startsWith,
  template,
  templateSettings,
  toLower,
  toUpper,
  trim,
  trimEnd,
  trimStart,
  truncate,
  unescape,
  upperCase,
  upperFirst,
  words
}, util = {
  attempt,
  bindAll,
  cond,
  conforms,
  constant,
  defaultTo,
  flow,
  flowRight,
  iteratee,
  matches,
  matchesProperty,
  method,
  methodOf,
  noop,
  nthArg,
  over,
  overEvery,
  overSome,
  property,
  propertyOf,
  range,
  rangeRight,
  stubArray,
  stubFalse,
  stubObject,
  stubString,
  stubTrue,
  times,
  toPath,
  uniqueId
};
function lazyClone() {
  var t = new LazyWrapper(this.__wrapped__);
  return t.__actions__ = copyArray(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = copyArray(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = copyArray(this.__views__), t;
}
function lazyReverse() {
  if (this.__filtered__) {
    var t = new LazyWrapper(this);
    t.__dir__ = -1, t.__filtered__ = !0;
  } else
    t = this.clone(), t.__dir__ *= -1;
  return t;
}
var nativeMax$1 = Math.max, nativeMin$2 = Math.min;
function getView(t, e, i) {
  for (var n = -1, r = i.length; ++n < r; ) {
    var s = i[n], a = s.size;
    switch (s.type) {
      case "drop":
        t += a;
        break;
      case "dropRight":
        e -= a;
        break;
      case "take":
        e = nativeMin$2(e, t + a);
        break;
      case "takeRight":
        t = nativeMax$1(t, e - a);
        break;
    }
  }
  return { start: t, end: e };
}
var LAZY_FILTER_FLAG$1 = 1, LAZY_MAP_FLAG = 2, nativeMin$1 = Math.min;
function lazyValue() {
  var t = this.__wrapped__.value(), e = this.__dir__, i = isArray(t), n = e < 0, r = i ? t.length : 0, s = getView(0, r, this.__views__), a = s.start, o = s.end, l = o - a, u = n ? o : a - 1, c = this.__iteratees__, f = c.length, p = 0, y = nativeMin$1(l, this.__takeCount__);
  if (!i || !n && r == l && y == l)
    return baseWrapperValue(t, this.__actions__);
  var b = [];
  e:
    for (; l-- && p < y; ) {
      u += e;
      for (var x = -1, w = t[u]; ++x < f; ) {
        var A = c[x], E = A.iteratee, O = A.type, L = E(w);
        if (O == LAZY_MAP_FLAG)
          w = L;
        else if (!L) {
          if (O == LAZY_FILTER_FLAG$1)
            continue e;
          break e;
        }
      }
      b[p++] = w;
    }
  return b;
}
var VERSION = "4.17.21", WRAP_BIND_KEY_FLAG = 2, LAZY_FILTER_FLAG = 1, LAZY_WHILE_FLAG = 3, MAX_ARRAY_LENGTH = 4294967295, arrayProto = Array.prototype, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, symIterator = Symbol$1 ? Symbol$1.iterator : void 0, nativeMax = Math.max, nativeMin = Math.min, mixin = /* @__PURE__ */ (function(t) {
  return function(e, i, n) {
    if (n == null) {
      var r = isObject(i), s = r && keys(i), a = s && s.length && baseFunctions(i, s);
      (a ? a.length : r) || (n = i, i = e, e = this);
    }
    return t(e, i, n);
  };
})(mixin$1);
lodash.after = func.after;
lodash.ary = func.ary;
lodash.assign = object.assign;
lodash.assignIn = object.assignIn;
lodash.assignInWith = object.assignInWith;
lodash.assignWith = object.assignWith;
lodash.at = object.at;
lodash.before = func.before;
lodash.bind = func.bind;
lodash.bindAll = util.bindAll;
lodash.bindKey = func.bindKey;
lodash.castArray = lang.castArray;
lodash.chain = seq.chain;
lodash.chunk = array.chunk;
lodash.compact = array.compact;
lodash.concat = array.concat;
lodash.cond = util.cond;
lodash.conforms = util.conforms;
lodash.constant = util.constant;
lodash.countBy = collection.countBy;
lodash.create = object.create;
lodash.curry = func.curry;
lodash.curryRight = func.curryRight;
lodash.debounce = func.debounce;
lodash.defaults = object.defaults;
lodash.defaultsDeep = object.defaultsDeep;
lodash.defer = func.defer;
lodash.delay = func.delay;
lodash.difference = array.difference;
lodash.differenceBy = array.differenceBy;
lodash.differenceWith = array.differenceWith;
lodash.drop = array.drop;
lodash.dropRight = array.dropRight;
lodash.dropRightWhile = array.dropRightWhile;
lodash.dropWhile = array.dropWhile;
lodash.fill = array.fill;
lodash.filter = collection.filter;
lodash.flatMap = collection.flatMap;
lodash.flatMapDeep = collection.flatMapDeep;
lodash.flatMapDepth = collection.flatMapDepth;
lodash.flatten = array.flatten;
lodash.flattenDeep = array.flattenDeep;
lodash.flattenDepth = array.flattenDepth;
lodash.flip = func.flip;
lodash.flow = util.flow;
lodash.flowRight = util.flowRight;
lodash.fromPairs = array.fromPairs;
lodash.functions = object.functions;
lodash.functionsIn = object.functionsIn;
lodash.groupBy = collection.groupBy;
lodash.initial = array.initial;
lodash.intersection = array.intersection;
lodash.intersectionBy = array.intersectionBy;
lodash.intersectionWith = array.intersectionWith;
lodash.invert = object.invert;
lodash.invertBy = object.invertBy;
lodash.invokeMap = collection.invokeMap;
lodash.iteratee = util.iteratee;
lodash.keyBy = collection.keyBy;
lodash.keys = keys;
lodash.keysIn = object.keysIn;
lodash.map = collection.map;
lodash.mapKeys = object.mapKeys;
lodash.mapValues = object.mapValues;
lodash.matches = util.matches;
lodash.matchesProperty = util.matchesProperty;
lodash.memoize = func.memoize;
lodash.merge = object.merge;
lodash.mergeWith = object.mergeWith;
lodash.method = util.method;
lodash.methodOf = util.methodOf;
lodash.mixin = mixin;
lodash.negate = negate;
lodash.nthArg = util.nthArg;
lodash.omit = object.omit;
lodash.omitBy = object.omitBy;
lodash.once = func.once;
lodash.orderBy = collection.orderBy;
lodash.over = util.over;
lodash.overArgs = func.overArgs;
lodash.overEvery = util.overEvery;
lodash.overSome = util.overSome;
lodash.partial = func.partial;
lodash.partialRight = func.partialRight;
lodash.partition = collection.partition;
lodash.pick = object.pick;
lodash.pickBy = object.pickBy;
lodash.property = util.property;
lodash.propertyOf = util.propertyOf;
lodash.pull = array.pull;
lodash.pullAll = array.pullAll;
lodash.pullAllBy = array.pullAllBy;
lodash.pullAllWith = array.pullAllWith;
lodash.pullAt = array.pullAt;
lodash.range = util.range;
lodash.rangeRight = util.rangeRight;
lodash.rearg = func.rearg;
lodash.reject = collection.reject;
lodash.remove = array.remove;
lodash.rest = func.rest;
lodash.reverse = array.reverse;
lodash.sampleSize = collection.sampleSize;
lodash.set = object.set;
lodash.setWith = object.setWith;
lodash.shuffle = collection.shuffle;
lodash.slice = array.slice;
lodash.sortBy = collection.sortBy;
lodash.sortedUniq = array.sortedUniq;
lodash.sortedUniqBy = array.sortedUniqBy;
lodash.split = string.split;
lodash.spread = func.spread;
lodash.tail = array.tail;
lodash.take = array.take;
lodash.takeRight = array.takeRight;
lodash.takeRightWhile = array.takeRightWhile;
lodash.takeWhile = array.takeWhile;
lodash.tap = seq.tap;
lodash.throttle = func.throttle;
lodash.thru = thru;
lodash.toArray = lang.toArray;
lodash.toPairs = object.toPairs;
lodash.toPairsIn = object.toPairsIn;
lodash.toPath = util.toPath;
lodash.toPlainObject = lang.toPlainObject;
lodash.transform = object.transform;
lodash.unary = func.unary;
lodash.union = array.union;
lodash.unionBy = array.unionBy;
lodash.unionWith = array.unionWith;
lodash.uniq = array.uniq;
lodash.uniqBy = array.uniqBy;
lodash.uniqWith = array.uniqWith;
lodash.unset = object.unset;
lodash.unzip = array.unzip;
lodash.unzipWith = array.unzipWith;
lodash.update = object.update;
lodash.updateWith = object.updateWith;
lodash.values = object.values;
lodash.valuesIn = object.valuesIn;
lodash.without = array.without;
lodash.words = string.words;
lodash.wrap = func.wrap;
lodash.xor = array.xor;
lodash.xorBy = array.xorBy;
lodash.xorWith = array.xorWith;
lodash.zip = array.zip;
lodash.zipObject = array.zipObject;
lodash.zipObjectDeep = array.zipObjectDeep;
lodash.zipWith = array.zipWith;
lodash.entries = object.toPairs;
lodash.entriesIn = object.toPairsIn;
lodash.extend = object.assignIn;
lodash.extendWith = object.assignInWith;
mixin(lodash, lodash);
lodash.add = math.add;
lodash.attempt = util.attempt;
lodash.camelCase = string.camelCase;
lodash.capitalize = string.capitalize;
lodash.ceil = math.ceil;
lodash.clamp = number.clamp;
lodash.clone = lang.clone;
lodash.cloneDeep = lang.cloneDeep;
lodash.cloneDeepWith = lang.cloneDeepWith;
lodash.cloneWith = lang.cloneWith;
lodash.conformsTo = lang.conformsTo;
lodash.deburr = string.deburr;
lodash.defaultTo = util.defaultTo;
lodash.divide = math.divide;
lodash.endsWith = string.endsWith;
lodash.eq = lang.eq;
lodash.escape = string.escape;
lodash.escapeRegExp = string.escapeRegExp;
lodash.every = collection.every;
lodash.find = collection.find;
lodash.findIndex = array.findIndex;
lodash.findKey = object.findKey;
lodash.findLast = collection.findLast;
lodash.findLastIndex = array.findLastIndex;
lodash.findLastKey = object.findLastKey;
lodash.floor = math.floor;
lodash.forEach = collection.forEach;
lodash.forEachRight = collection.forEachRight;
lodash.forIn = object.forIn;
lodash.forInRight = object.forInRight;
lodash.forOwn = object.forOwn;
lodash.forOwnRight = object.forOwnRight;
lodash.get = object.get;
lodash.gt = lang.gt;
lodash.gte = lang.gte;
lodash.has = object.has;
lodash.hasIn = object.hasIn;
lodash.head = array.head;
lodash.identity = identity;
lodash.includes = collection.includes;
lodash.indexOf = array.indexOf;
lodash.inRange = number.inRange;
lodash.invoke = object.invoke;
lodash.isArguments = lang.isArguments;
lodash.isArray = isArray;
lodash.isArrayBuffer = lang.isArrayBuffer;
lodash.isArrayLike = lang.isArrayLike;
lodash.isArrayLikeObject = lang.isArrayLikeObject;
lodash.isBoolean = lang.isBoolean;
lodash.isBuffer = lang.isBuffer;
lodash.isDate = lang.isDate;
lodash.isElement = lang.isElement;
lodash.isEmpty = lang.isEmpty;
lodash.isEqual = lang.isEqual;
lodash.isEqualWith = lang.isEqualWith;
lodash.isError = lang.isError;
lodash.isFinite = lang.isFinite;
lodash.isFunction = lang.isFunction;
lodash.isInteger = lang.isInteger;
lodash.isLength = lang.isLength;
lodash.isMap = lang.isMap;
lodash.isMatch = lang.isMatch;
lodash.isMatchWith = lang.isMatchWith;
lodash.isNaN = lang.isNaN;
lodash.isNative = lang.isNative;
lodash.isNil = lang.isNil;
lodash.isNull = lang.isNull;
lodash.isNumber = lang.isNumber;
lodash.isObject = isObject;
lodash.isObjectLike = lang.isObjectLike;
lodash.isPlainObject = lang.isPlainObject;
lodash.isRegExp = lang.isRegExp;
lodash.isSafeInteger = lang.isSafeInteger;
lodash.isSet = lang.isSet;
lodash.isString = lang.isString;
lodash.isSymbol = lang.isSymbol;
lodash.isTypedArray = lang.isTypedArray;
lodash.isUndefined = lang.isUndefined;
lodash.isWeakMap = lang.isWeakMap;
lodash.isWeakSet = lang.isWeakSet;
lodash.join = array.join;
lodash.kebabCase = string.kebabCase;
lodash.last = last;
lodash.lastIndexOf = array.lastIndexOf;
lodash.lowerCase = string.lowerCase;
lodash.lowerFirst = string.lowerFirst;
lodash.lt = lang.lt;
lodash.lte = lang.lte;
lodash.max = math.max;
lodash.maxBy = math.maxBy;
lodash.mean = math.mean;
lodash.meanBy = math.meanBy;
lodash.min = math.min;
lodash.minBy = math.minBy;
lodash.stubArray = util.stubArray;
lodash.stubFalse = util.stubFalse;
lodash.stubObject = util.stubObject;
lodash.stubString = util.stubString;
lodash.stubTrue = util.stubTrue;
lodash.multiply = math.multiply;
lodash.nth = array.nth;
lodash.noop = util.noop;
lodash.now = date$1.now;
lodash.pad = string.pad;
lodash.padEnd = string.padEnd;
lodash.padStart = string.padStart;
lodash.parseInt = string.parseInt;
lodash.random = number.random;
lodash.reduce = collection.reduce;
lodash.reduceRight = collection.reduceRight;
lodash.repeat = string.repeat;
lodash.replace = string.replace;
lodash.result = object.result;
lodash.round = math.round;
lodash.sample = collection.sample;
lodash.size = collection.size;
lodash.snakeCase = string.snakeCase;
lodash.some = collection.some;
lodash.sortedIndex = array.sortedIndex;
lodash.sortedIndexBy = array.sortedIndexBy;
lodash.sortedIndexOf = array.sortedIndexOf;
lodash.sortedLastIndex = array.sortedLastIndex;
lodash.sortedLastIndexBy = array.sortedLastIndexBy;
lodash.sortedLastIndexOf = array.sortedLastIndexOf;
lodash.startCase = string.startCase;
lodash.startsWith = string.startsWith;
lodash.subtract = math.subtract;
lodash.sum = math.sum;
lodash.sumBy = math.sumBy;
lodash.template = string.template;
lodash.times = util.times;
lodash.toFinite = lang.toFinite;
lodash.toInteger = toInteger;
lodash.toLength = lang.toLength;
lodash.toLower = string.toLower;
lodash.toNumber = lang.toNumber;
lodash.toSafeInteger = lang.toSafeInteger;
lodash.toString = lang.toString;
lodash.toUpper = string.toUpper;
lodash.trim = string.trim;
lodash.trimEnd = string.trimEnd;
lodash.trimStart = string.trimStart;
lodash.truncate = string.truncate;
lodash.unescape = string.unescape;
lodash.uniqueId = util.uniqueId;
lodash.upperCase = string.upperCase;
lodash.upperFirst = string.upperFirst;
lodash.each = collection.forEach;
lodash.eachRight = collection.forEachRight;
lodash.first = array.head;
mixin(lodash, (function() {
  var t = {};
  return baseForOwn(lodash, function(e, i) {
    hasOwnProperty.call(lodash.prototype, i) || (t[i] = e);
  }), t;
})(), { chain: !1 });
lodash.VERSION = VERSION;
(lodash.templateSettings = string.templateSettings).imports._ = lodash;
arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(t) {
  lodash[t].placeholder = lodash;
});
arrayEach(["drop", "take"], function(t, e) {
  LazyWrapper.prototype[t] = function(i) {
    i = i === void 0 ? 1 : nativeMax(toInteger(i), 0);
    var n = this.__filtered__ && !e ? new LazyWrapper(this) : this.clone();
    return n.__filtered__ ? n.__takeCount__ = nativeMin(i, n.__takeCount__) : n.__views__.push({
      size: nativeMin(i, MAX_ARRAY_LENGTH),
      type: t + (n.__dir__ < 0 ? "Right" : "")
    }), n;
  }, LazyWrapper.prototype[t + "Right"] = function(i) {
    return this.reverse()[t](i).reverse();
  };
});
arrayEach(["filter", "map", "takeWhile"], function(t, e) {
  var i = e + 1, n = i == LAZY_FILTER_FLAG || i == LAZY_WHILE_FLAG;
  LazyWrapper.prototype[t] = function(r) {
    var s = this.clone();
    return s.__iteratees__.push({
      iteratee: baseIteratee(r),
      type: i
    }), s.__filtered__ = s.__filtered__ || n, s;
  };
});
arrayEach(["head", "last"], function(t, e) {
  var i = "take" + (e ? "Right" : "");
  LazyWrapper.prototype[t] = function() {
    return this[i](1).value()[0];
  };
});
arrayEach(["initial", "tail"], function(t, e) {
  var i = "drop" + (e ? "" : "Right");
  LazyWrapper.prototype[t] = function() {
    return this.__filtered__ ? new LazyWrapper(this) : this[i](1);
  };
});
LazyWrapper.prototype.compact = function() {
  return this.filter(identity);
};
LazyWrapper.prototype.find = function(t) {
  return this.filter(t).head();
};
LazyWrapper.prototype.findLast = function(t) {
  return this.reverse().find(t);
};
LazyWrapper.prototype.invokeMap = baseRest(function(t, e) {
  return typeof t == "function" ? new LazyWrapper(this) : this.map(function(i) {
    return baseInvoke(i, t, e);
  });
});
LazyWrapper.prototype.reject = function(t) {
  return this.filter(negate(baseIteratee(t)));
};
LazyWrapper.prototype.slice = function(t, e) {
  t = toInteger(t);
  var i = this;
  return i.__filtered__ && (t > 0 || e < 0) ? new LazyWrapper(i) : (t < 0 ? i = i.takeRight(-t) : t && (i = i.drop(t)), e !== void 0 && (e = toInteger(e), i = e < 0 ? i.dropRight(-e) : i.take(e - t)), i);
};
LazyWrapper.prototype.takeRightWhile = function(t) {
  return this.reverse().takeWhile(t).reverse();
};
LazyWrapper.prototype.toArray = function() {
  return this.take(MAX_ARRAY_LENGTH);
};
baseForOwn(LazyWrapper.prototype, function(t, e) {
  var i = /^(?:filter|find|map|reject)|While$/.test(e), n = /^(?:head|last)$/.test(e), r = lodash[n ? "take" + (e == "last" ? "Right" : "") : e], s = n || /^find/.test(e);
  r && (lodash.prototype[e] = function() {
    var a = this.__wrapped__, o = n ? [1] : arguments, l = a instanceof LazyWrapper, u = o[0], c = l || isArray(a), f = function(A) {
      var E = r.apply(lodash, arrayPush([A], o));
      return n && p ? E[0] : E;
    };
    c && i && typeof u == "function" && u.length != 1 && (l = c = !1);
    var p = this.__chain__, y = !!this.__actions__.length, b = s && !p, x = l && !y;
    if (!s && c) {
      a = x ? a : new LazyWrapper(this);
      var w = t.apply(a, o);
      return w.__actions__.push({ func: thru, args: [f], thisArg: void 0 }), new LodashWrapper(w, p);
    }
    return b && x ? t.apply(this, o) : (w = this.thru(f), b ? n ? w.value()[0] : w.value() : w);
  });
});
arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(t) {
  var e = arrayProto[t], i = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru", n = /^(?:pop|shift)$/.test(t);
  lodash.prototype[t] = function() {
    var r = arguments;
    if (n && !this.__chain__) {
      var s = this.value();
      return e.apply(isArray(s) ? s : [], r);
    }
    return this[i](function(a) {
      return e.apply(isArray(a) ? a : [], r);
    });
  };
});
baseForOwn(LazyWrapper.prototype, function(t, e) {
  var i = lodash[e];
  if (i) {
    var n = i.name + "";
    hasOwnProperty.call(realNames, n) || (realNames[n] = []), realNames[n].push({ name: e, func: i });
  }
});
realNames[createHybrid(void 0, WRAP_BIND_KEY_FLAG).name] = [{
  name: "wrapper",
  func: void 0
}];
LazyWrapper.prototype.clone = lazyClone;
LazyWrapper.prototype.reverse = lazyReverse;
LazyWrapper.prototype.value = lazyValue;
lodash.prototype.at = seq.at;
lodash.prototype.chain = seq.wrapperChain;
lodash.prototype.commit = seq.commit;
lodash.prototype.next = seq.next;
lodash.prototype.plant = seq.plant;
lodash.prototype.reverse = seq.reverse;
lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = seq.value;
lodash.prototype.first = lodash.prototype.head;
symIterator && (lodash.prototype[symIterator] = seq.toIterator);
lodash.pluck = lodash.map;
typeof globalThis.WebKitCSSMatrix > "u" && (globalThis.WebKitCSSMatrix = class z {
  constructor(e) {
    this.m11 = 1, this.m12 = 0, this.m13 = 0, this.m14 = 0, this.m21 = 0, this.m22 = 1, this.m23 = 0, this.m24 = 0, this.m31 = 0, this.m32 = 0, this.m33 = 1, this.m34 = 0, this.m41 = 0, this.m42 = 0, this.m43 = 0, this.m44 = 1, e && typeof e == "string" && this._parseTransformString(e);
  }
  _parseTransformString(e) {
    if (e.includes("matrix3d")) {
      const i = e.match(/matrix3d\(([^)]+)\)/)?.[1].split(",").map((n) => parseFloat(n.trim()));
      i && i.length === 16 && (this.m11 = i[0], this.m12 = i[1], this.m13 = i[2], this.m14 = i[3], this.m21 = i[4], this.m22 = i[5], this.m23 = i[6], this.m24 = i[7], this.m31 = i[8], this.m32 = i[9], this.m33 = i[10], this.m34 = i[11], this.m41 = i[12], this.m42 = i[13], this.m43 = i[14], this.m44 = i[15]);
    }
  }
  multiply(e) {
    const i = new z();
    return i.m11 = this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31 + this.m14 * e.m41, i.m12 = this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32 + this.m14 * e.m42, i.m13 = this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33 + this.m14 * e.m43, i.m14 = this.m11 * e.m14 + this.m12 * e.m24 + this.m13 * e.m34 + this.m14 * e.m44, i.m21 = this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31 + this.m24 * e.m41, i.m22 = this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32 + this.m24 * e.m42, i.m23 = this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33 + this.m24 * e.m43, i.m24 = this.m21 * e.m14 + this.m22 * e.m24 + this.m23 * e.m34 + this.m24 * e.m44, i.m31 = this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31 + this.m34 * e.m41, i.m32 = this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32 + this.m34 * e.m42, i.m33 = this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33 + this.m34 * e.m43, i.m34 = this.m31 * e.m14 + this.m32 * e.m24 + this.m33 * e.m34 + this.m34 * e.m44, i.m41 = this.m41 * e.m11 + this.m42 * e.m21 + this.m43 * e.m31 + this.m44 * e.m41, i.m42 = this.m41 * e.m12 + this.m42 * e.m22 + this.m43 * e.m32 + this.m44 * e.m42, i.m43 = this.m41 * e.m13 + this.m42 * e.m23 + this.m43 * e.m33 + this.m44 * e.m43, i.m44 = this.m41 * e.m14 + this.m42 * e.m24 + this.m43 * e.m34 + this.m44 * e.m44, i;
  }
  translate(e, i, n) {
    const r = new z();
    return Object.assign(r, this), r.m41 += e || 0, r.m42 += i || 0, r.m43 += n || 0, r;
  }
  scale(e, i, n) {
    const r = new z();
    return Object.assign(r, this), r.m11 *= e || 1, r.m22 *= i || e || 1, r.m33 *= n || 1, r;
  }
  rotate(e, i, n) {
    const r = new z();
    return Object.assign(r, this), r;
  }
});
WebKitCSSMatrix.prototype.skew = function(t) {
  if (!t) return this;
  const e = t * Math.PI / 180, i = Math.tan(e), n = new WebKitCSSMatrix();
  return n.m12 = i, n.m21 = i, this.multiply(n);
};
WebKitCSSMatrix.prototype.skewX = function(t) {
  if (!t) return this;
  const e = t * Math.PI / 180, i = Math.tan(e), n = new WebKitCSSMatrix();
  return n.m21 = i, this.multiply(n);
};
WebKitCSSMatrix.prototype.skewY = function(t) {
  if (!t) return this;
  const e = t * Math.PI / 180, i = Math.tan(e), n = new WebKitCSSMatrix();
  return n.m12 = i, this.multiply(n);
};
WebKitCSSMatrix.prototype.inverse = function() {
  const t = this.m11 * this.m22 - this.m12 * this.m21;
  if (Math.abs(t) < 1e-10)
    return WebKitCSSMatrix.identity3d();
  const e = new WebKitCSSMatrix();
  return e.m11 = this.m22 / t, e.m12 = -this.m12 / t, e.m21 = -this.m21 / t, e.m22 = this.m11 / t, e.m41 = (this.m21 * this.m42 - this.m22 * this.m41) / t, e.m42 = (this.m12 * this.m41 - this.m11 * this.m42) / t, e.m13 = this.m13, e.m14 = this.m14, e.m23 = this.m23, e.m24 = this.m24, e.m31 = this.m31, e.m32 = this.m32, e.m33 = this.m33, e.m34 = this.m34, e.m43 = this.m43, e.m44 = this.m44, e;
};
WebKitCSSMatrix.prototype.point = function(t = {}) {
  const { x: e = 0, y: i = 0, z: n = 0 } = lodash.defaults(t, { x: 0, y: 0, z: 0 });
  let r = this.m14 * e + this.m24 * i + this.m34 * n + this.m44;
  return r || (r = 1), {
    x: (this.m11 * e + this.m21 * i + this.m31 * n + this.m41) / r,
    y: (this.m12 * e + this.m22 * i + this.m32 * n + this.m42) / r,
    z: (this.m13 * e + this.m23 * i + this.m33 * n + this.m43) / r
  };
};
WebKitCSSMatrix.identity3d = () => new WebKitCSSMatrix("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
const Matrix = WebKitCSSMatrix;
var webfontloader = { exports: {} }, hasRequiredWebfontloader;
function requireWebfontloader() {
  return hasRequiredWebfontloader || (hasRequiredWebfontloader = 1, (function(t) {
    (function() {
      function e(h, d, m) {
        return h.call.apply(h.bind, arguments);
      }
      function i(h, d, m) {
        if (!h) throw Error();
        if (2 < arguments.length) {
          var g = Array.prototype.slice.call(arguments, 2);
          return function() {
            var v = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(v, g), h.apply(d, v);
          };
        }
        return function() {
          return h.apply(d, arguments);
        };
      }
      function n(h, d, m) {
        return n = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : i, n.apply(null, arguments);
      }
      var r = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function s(h, d) {
        this.a = h, this.o = d || h, this.c = this.o.document;
      }
      var a = !!window.FontFace;
      function o(h, d, m, g) {
        if (d = h.c.createElement(d), m) for (var v in m) m.hasOwnProperty(v) && (v == "style" ? d.style.cssText = m[v] : d.setAttribute(v, m[v]));
        return g && d.appendChild(h.c.createTextNode(g)), d;
      }
      function l(h, d, m) {
        h = h.c.getElementsByTagName(d)[0], h || (h = document.documentElement), h.insertBefore(m, h.lastChild);
      }
      function u(h) {
        h.parentNode && h.parentNode.removeChild(h);
      }
      function c(h, d, m) {
        d = d || [], m = m || [];
        for (var g = h.className.split(/\s+/), v = 0; v < d.length; v += 1) {
          for (var S = !1, $ = 0; $ < g.length; $ += 1) if (d[v] === g[$]) {
            S = !0;
            break;
          }
          S || g.push(d[v]);
        }
        for (d = [], v = 0; v < g.length; v += 1) {
          for (S = !1, $ = 0; $ < m.length; $ += 1) if (g[v] === m[$]) {
            S = !0;
            break;
          }
          S || d.push(g[v]);
        }
        h.className = d.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function f(h, d) {
        for (var m = h.className.split(/\s+/), g = 0, v = m.length; g < v; g++) if (m[g] == d) return !0;
        return !1;
      }
      function p(h) {
        return h.o.location.hostname || h.a.location.hostname;
      }
      function y(h, d, m) {
        function g() {
          C && v && S && (C($), C = null);
        }
        d = o(h, "link", { rel: "stylesheet", href: d, media: "all" });
        var v = !1, S = !0, $ = null, C = m || null;
        a ? (d.onload = function() {
          v = !0, g();
        }, d.onerror = function() {
          v = !0, $ = Error("Stylesheet failed to load"), g();
        }) : setTimeout(function() {
          v = !0, g();
        }, 0), l(h, "head", d);
      }
      function b(h, d, m, g) {
        var v = h.c.getElementsByTagName("head")[0];
        if (v) {
          var S = o(h, "script", { src: d }), $ = !1;
          return S.onload = S.onreadystatechange = function() {
            $ || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || ($ = !0, m && m(null), S.onload = S.onreadystatechange = null, S.parentNode.tagName == "HEAD" && v.removeChild(S));
          }, v.appendChild(S), setTimeout(function() {
            $ || ($ = !0, m && m(Error("Script load timeout")));
          }, g || 5e3), S;
        }
        return null;
      }
      function x() {
        this.a = 0, this.c = null;
      }
      function w(h) {
        return h.a++, function() {
          h.a--, E(h);
        };
      }
      function A(h, d) {
        h.c = d, E(h);
      }
      function E(h) {
        h.a == 0 && h.c && (h.c(), h.c = null);
      }
      function O(h) {
        this.a = h || "-";
      }
      O.prototype.c = function(h) {
        for (var d = [], m = 0; m < arguments.length; m++) d.push(arguments[m].replace(/[\W_]+/g, "").toLowerCase());
        return d.join(this.a);
      };
      function L(h, d) {
        this.c = h, this.f = 4, this.a = "n";
        var m = (d || "n4").match(/^([nio])([1-9])$/i);
        m && (this.a = m[1], this.f = parseInt(m[2], 10));
      }
      function k(h) {
        return U(h) + " " + (h.f + "00") + " 300px " + I(h.c);
      }
      function I(h) {
        var d = [];
        h = h.split(/,\s*/);
        for (var m = 0; m < h.length; m++) {
          var g = h[m].replace(/['"]/g, "");
          g.indexOf(" ") != -1 || /^\d/.test(g) ? d.push("'" + g + "'") : d.push(g);
        }
        return d.join(",");
      }
      function M(h) {
        return h.a + h.f;
      }
      function U(h) {
        var d = "normal";
        return h.a === "o" ? d = "oblique" : h.a === "i" && (d = "italic"), d;
      }
      function j(h) {
        var d = 4, m = "n", g = null;
        return h && ((g = h.match(/(normal|oblique|italic)/i)) && g[1] && (m = g[1].substr(0, 1).toLowerCase()), (g = h.match(/([1-9]00|normal|bold)/i)) && g[1] && (/bold/i.test(g[1]) ? d = 7 : /[1-9]00/.test(g[1]) && (d = parseInt(g[1].substr(0, 1), 10)))), m + d;
      }
      function ye(h, d) {
        this.c = h, this.f = h.o.document.documentElement, this.h = d, this.a = new O("-"), this.j = d.events !== !1, this.g = d.classes !== !1;
      }
      function ve(h) {
        h.g && c(h.f, [h.a.c("wf", "loading")]), N(h, "loading");
      }
      function ne(h) {
        if (h.g) {
          var d = f(h.f, h.a.c("wf", "active")), m = [], g = [h.a.c("wf", "loading")];
          d || m.push(h.a.c("wf", "inactive")), c(h.f, m, g);
        }
        N(h, "inactive");
      }
      function N(h, d, m) {
        h.j && h.h[d] && (m ? h.h[d](m.c, M(m)) : h.h[d]());
      }
      function be() {
        this.c = {};
      }
      function we(h, d, m) {
        var g = [], v;
        for (v in d) if (d.hasOwnProperty(v)) {
          var S = h.c[v];
          S && g.push(S(d[v], m));
        }
        return g;
      }
      function Y(h, d) {
        this.c = h, this.f = d, this.a = o(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function X(h) {
        l(h.c, "body", h.a);
      }
      function K(h) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(h.c) + ";" + ("font-style:" + U(h) + ";font-weight:" + (h.f + "00") + ";");
      }
      function re(h, d, m, g, v, S) {
        this.g = h, this.j = d, this.a = g, this.c = m, this.f = v || 3e3, this.h = S || void 0;
      }
      re.prototype.start = function() {
        var h = this.c.o.document, d = this, m = r(), g = new Promise(function($, C) {
          function T() {
            r() - m >= d.f ? C() : h.fonts.load(k(d.a), d.h).then(function(R) {
              1 <= R.length ? $() : setTimeout(T, 25);
            }, function() {
              C();
            });
          }
          T();
        }), v = null, S = new Promise(function($, C) {
          v = setTimeout(C, d.f);
        });
        Promise.race([S, g]).then(function() {
          v && (clearTimeout(v), v = null), d.g(d.a);
        }, function() {
          d.j(d.a);
        });
      };
      function se(h, d, m, g, v, S, $) {
        this.v = h, this.B = d, this.c = m, this.a = g, this.s = $ || "BESbswy", this.f = {}, this.w = v || 3e3, this.u = S || null, this.m = this.j = this.h = this.g = null, this.g = new Y(this.c, this.s), this.h = new Y(this.c, this.s), this.j = new Y(this.c, this.s), this.m = new Y(this.c, this.s), h = new L(this.a.c + ",serif", M(this.a)), h = K(h), this.g.a.style.cssText = h, h = new L(this.a.c + ",sans-serif", M(this.a)), h = K(h), this.h.a.style.cssText = h, h = new L("serif", M(this.a)), h = K(h), this.j.a.style.cssText = h, h = new L("sans-serif", M(this.a)), h = K(h), this.m.a.style.cssText = h, X(this.g), X(this.h), X(this.j), X(this.m);
      }
      var q = { D: "serif", C: "sans-serif" }, ee = null;
      function ae() {
        if (ee === null) {
          var h = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          ee = !!h && (536 > parseInt(h[1], 10) || parseInt(h[1], 10) === 536 && 11 >= parseInt(h[2], 10));
        }
        return ee;
      }
      se.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = r(), le(this);
      };
      function oe(h, d, m) {
        for (var g in q) if (q.hasOwnProperty(g) && d === h.f[q[g]] && m === h.f[q[g]]) return !0;
        return !1;
      }
      function le(h) {
        var d = h.g.a.offsetWidth, m = h.h.a.offsetWidth, g;
        (g = d === h.f.serif && m === h.f["sans-serif"]) || (g = ae() && oe(h, d, m)), g ? r() - h.A >= h.w ? ae() && oe(h, d, m) && (h.u === null || h.u.hasOwnProperty(h.a.c)) ? te(h, h.v) : te(h, h.B) : xe(h) : te(h, h.v);
      }
      function xe(h) {
        setTimeout(n(function() {
          le(this);
        }, h), 50);
      }
      function te(h, d) {
        setTimeout(n(function() {
          u(this.g.a), u(this.h.a), u(this.j.a), u(this.m.a), d(this.a);
        }, h), 0);
      }
      function ie(h, d, m) {
        this.c = h, this.a = d, this.f = 0, this.m = this.j = !1, this.s = m;
      }
      var Z = null;
      ie.prototype.g = function(h) {
        var d = this.a;
        d.g && c(d.f, [d.a.c("wf", h.c, M(h).toString(), "active")], [d.a.c("wf", h.c, M(h).toString(), "loading"), d.a.c("wf", h.c, M(h).toString(), "inactive")]), N(d, "fontactive", h), this.m = !0, he(this);
      }, ie.prototype.h = function(h) {
        var d = this.a;
        if (d.g) {
          var m = f(d.f, d.a.c("wf", h.c, M(h).toString(), "active")), g = [], v = [d.a.c("wf", h.c, M(h).toString(), "loading")];
          m || g.push(d.a.c("wf", h.c, M(h).toString(), "inactive")), c(d.f, g, v);
        }
        N(d, "fontinactive", h), he(this);
      };
      function he(h) {
        --h.f == 0 && h.j && (h.m ? (h = h.a, h.g && c(h.f, [h.a.c("wf", "active")], [h.a.c("wf", "loading"), h.a.c("wf", "inactive")]), N(h, "active")) : ne(h.a));
      }
      function ue(h) {
        this.j = h, this.a = new be(), this.h = 0, this.f = this.g = !0;
      }
      ue.prototype.load = function(h) {
        this.c = new s(this.j, h.context || this.j), this.g = h.events !== !1, this.f = h.classes !== !1, $e(this, new ye(this.c, h), h);
      };
      function Se(h, d, m, g, v) {
        var S = --h.h == 0;
        (h.f || h.g) && setTimeout(function() {
          var $ = v || null, C = g || null || {};
          if (m.length === 0 && S) ne(d.a);
          else {
            d.f += m.length, S && (d.j = S);
            var T, R = [];
            for (T = 0; T < m.length; T++) {
              var D = m[T], W = C[D.c], B = d.a, H = D;
              if (B.g && c(B.f, [B.a.c("wf", H.c, M(H).toString(), "loading")]), N(B, "fontloading", H), B = null, Z === null) if (window.FontFace) {
                var H = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), De = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                Z = H ? 42 < parseInt(H[1], 10) : !De;
              } else Z = !1;
              Z ? B = new re(n(d.g, d), n(d.h, d), d.c, D, d.s, W) : B = new se(n(d.g, d), n(d.h, d), d.c, D, d.s, $, W), R.push(B);
            }
            for (T = 0; T < R.length; T++) R[T].start();
          }
        }, 0);
      }
      function $e(h, d, m) {
        var v = [], g = m.timeout;
        ve(d);
        var v = we(h.a, m, h.c), S = new ie(h.c, d, g);
        for (h.h = v.length, d = 0, m = v.length; d < m; d++) v[d].load(function($, C, T) {
          Se(h, S, $, C, T);
        });
      }
      function ce(h, d) {
        this.c = h, this.a = d;
      }
      ce.prototype.load = function(h) {
        function d() {
          if (S["__mti_fntLst" + g]) {
            var $ = S["__mti_fntLst" + g](), C = [], T;
            if ($) for (var R = 0; R < $.length; R++) {
              var D = $[R].fontfamily;
              $[R].fontStyle != null && $[R].fontWeight != null ? (T = $[R].fontStyle + $[R].fontWeight, C.push(new L(D, T))) : C.push(new L(D));
            }
            h(C);
          } else setTimeout(function() {
            d();
          }, 50);
        }
        var m = this, g = m.a.projectId, v = m.a.version;
        if (g) {
          var S = m.c.o;
          b(this.c, (m.a.api || "https://fast.fonts.net/jsapi") + "/" + g + ".js" + (v ? "?v=" + v : ""), function($) {
            $ ? h([]) : (S["__MonotypeConfiguration__" + g] = function() {
              return m.a;
            }, d());
          }).id = "__MonotypeAPIScript__" + g;
        } else h([]);
      };
      function de(h, d) {
        this.c = h, this.a = d;
      }
      de.prototype.load = function(h) {
        var d, m, g = this.a.urls || [], v = this.a.families || [], S = this.a.testStrings || {}, $ = new x();
        for (d = 0, m = g.length; d < m; d++) y(this.c, g[d], w($));
        var C = [];
        for (d = 0, m = v.length; d < m; d++) if (g = v[d].split(":"), g[1]) for (var T = g[1].split(","), R = 0; R < T.length; R += 1) C.push(new L(g[0], T[R]));
        else C.push(new L(g[0]));
        A($, function() {
          h(C, S);
        });
      };
      function Ae(h, d) {
        h ? this.c = h : this.c = Ee, this.a = [], this.f = [], this.g = d || "";
      }
      var Ee = "https://fonts.googleapis.com/css";
      function Pe(h, d) {
        for (var m = d.length, g = 0; g < m; g++) {
          var v = d[g].split(":");
          v.length == 3 && h.f.push(v.pop());
          var S = "";
          v.length == 2 && v[1] != "" && (S = ":"), h.a.push(v.join(S));
        }
      }
      function Ce(h) {
        if (h.a.length == 0) throw Error("No fonts to load!");
        if (h.c.indexOf("kit=") != -1) return h.c;
        for (var d = h.a.length, m = [], g = 0; g < d; g++) m.push(h.a[g].replace(/ /g, "+"));
        return d = h.c + "?family=" + m.join("%7C"), 0 < h.f.length && (d += "&subset=" + h.f.join(",")), 0 < h.g.length && (d += "&text=" + encodeURIComponent(h.g)), d;
      }
      function Te(h) {
        this.f = h, this.a = [], this.c = {};
      }
      var fe = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, Le = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, Ie = { i: "i", italic: "i", n: "n", normal: "n" }, Me = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function Fe(h) {
        for (var d = h.f.length, m = 0; m < d; m++) {
          var g = h.f[m].split(":"), v = g[0].replace(/\+/g, " "), S = ["n4"];
          if (2 <= g.length) {
            var $, C = g[1];
            if ($ = [], C) for (var C = C.split(","), T = C.length, R = 0; R < T; R++) {
              var D;
              if (D = C[R], D.match(/^[\w-]+$/)) {
                var W = Me.exec(D.toLowerCase());
                if (W == null) D = "";
                else {
                  if (D = W[2], D = D == null || D == "" ? "n" : Ie[D], W = W[1], W == null || W == "") W = "4";
                  else var B = Le[W], W = B || (isNaN(W) ? "4" : W.substr(0, 1));
                  D = [D, W].join("");
                }
              } else D = "";
              D && $.push(D);
            }
            0 < $.length && (S = $), g.length == 3 && (g = g[2], $ = [], g = g ? g.split(",") : $, 0 < g.length && (g = fe[g[0]]) && (h.c[v] = g));
          }
          for (h.c[v] || (g = fe[v]) && (h.c[v] = g), g = 0; g < S.length; g += 1) h.a.push(new L(v, S[g]));
        }
      }
      function pe(h, d) {
        this.c = h, this.a = d;
      }
      var Re = { Arimo: !0, Cousine: !0, Tinos: !0 };
      pe.prototype.load = function(h) {
        var d = new x(), m = this.c, g = new Ae(this.a.api, this.a.text), v = this.a.families;
        Pe(g, v);
        var S = new Te(v);
        Fe(S), y(m, Ce(g), w(d)), A(d, function() {
          h(S.a, S.c, Re);
        });
      };
      function ge(h, d) {
        this.c = h, this.a = d;
      }
      ge.prototype.load = function(h) {
        var d = this.a.id, m = this.c.o;
        d ? b(this.c, (this.a.api || "https://use.typekit.net") + "/" + d + ".js", function(g) {
          if (g) h([]);
          else if (m.Typekit && m.Typekit.config && m.Typekit.config.fn) {
            g = m.Typekit.config.fn;
            for (var v = [], S = 0; S < g.length; S += 2) for (var $ = g[S], C = g[S + 1], T = 0; T < C.length; T++) v.push(new L($, C[T]));
            try {
              m.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            h(v);
          }
        }, 2e3) : h([]);
      };
      function me(h, d) {
        this.c = h, this.f = d, this.a = [];
      }
      me.prototype.load = function(h) {
        var d = this.f.id, m = this.c.o, g = this;
        d ? (m.__webfontfontdeckmodule__ || (m.__webfontfontdeckmodule__ = {}), m.__webfontfontdeckmodule__[d] = function(v, S) {
          for (var $ = 0, C = S.fonts.length; $ < C; ++$) {
            var T = S.fonts[$];
            g.a.push(new L(T.name, j("font-weight:" + T.weight + ";font-style:" + T.style)));
          }
          h(g.a);
        }, b(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + p(this.c) + "/" + d + ".js", function(v) {
          v && h([]);
        })) : h([]);
      };
      var G = new ue(window);
      G.a.c.custom = function(h, d) {
        return new de(d, h);
      }, G.a.c.fontdeck = function(h, d) {
        return new me(d, h);
      }, G.a.c.monotype = function(h, d) {
        return new ce(d, h);
      }, G.a.c.typekit = function(h, d) {
        return new ge(d, h);
      }, G.a.c.google = function(h, d) {
        return new pe(d, h);
      };
      var _e = { load: n(G.load, G) };
      t.exports ? t.exports = _e : (window.WebFont = _e, window.WebFontConfig && G.load(window.WebFontConfig));
    })();
  })(webfontloader)), webfontloader.exports;
}
var webfontloaderExports = requireWebfontloader();
const WebFont = /* @__PURE__ */ getDefaultExportFromCjs(webfontloaderExports), Utils$1 = {
  reset: () => Framer.CurrentContext.reset(),
  getValue: (t) => lodash.isFunction(t) ? t() : t,
  getValueForKeyPath: (t, e) => e.includes(".") ? e.split(".").reduce((i, n) => i?.[n], t) : t[e],
  setValueForKeyPath: (t, e, i) => {
    const n = e.split(".");
    let r = t;
    for (let s = 0; s < n.length && r !== void 0; s++) {
      const a = n[s];
      if (s === n.length - 1) {
        const o = r[a];
        lodash.isObject(o) && lodash.isObject(i) && Object.getPrototypeOf(o) === Object.prototype && Object.getPrototypeOf(i) === Object.prototype ? lodash.extend(o, i) : r[a] = i;
      } else
        (typeof r[a] > "u" || !lodash.isObject(r[a])) && (r[a] = {}), r = r[a];
    }
  },
  escapeForRegex: (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  valueOrDefault: (t, e) => ([void 0, null].includes(t) && (t = e), t),
  arrayNext: (t, e) => t[t.indexOf(e) + 1] || lodash.head(t),
  arrayPrev: (t, e) => t[t.indexOf(e) - 1] || lodash.last(t),
  webkitPerspectiveForValue: (t) => ["none", null, 0].includes(t) ? "none" : lodash.isNumber(t) ? t : null,
  sum: (t) => lodash.reduce(t, (e, i) => e + i),
  average: (t) => t.length ? Utils$1.sum(t) / t.length : 0,
  mean: (t) => t.length ? Utils$1.sum(t) / t.length : 0,
  median: (t) => {
    if (!t.length) return null;
    const e = [...t].sort((n, r) => n - r), i = Math.floor(e.length / 2);
    return e.length % 2 ? e[i] : (e[i - 1] + e[i]) / 2;
  },
  nearestIncrement: (t, e) => e ? Math.round(t * (1 / e)) / (1 / e) : t,
  delay: function(t, e) {
    const i = setTimeout(e, t * 1e3);
    return Framer.CurrentContext.addTimer(i), i;
  },
  interval: function(t, e) {
    const i = setInterval(e, t * 1e3);
    return Framer.CurrentContext.addInterval(i), i;
  },
  debounce: function(t, e, i) {
    t == null && (t = 0.1);
    let n = null;
    return t *= 1e3, function(...r) {
      const s = this, a = function() {
        return i || e.apply(s, r), n = null;
      };
      return n ? clearTimeout(n) : i && e.apply(s, r), n = setTimeout(a, t);
    };
  },
  throttle: function(t, e) {
    if (t === 0) return e;
    t *= 1e3;
    let i = !1;
    return function(...n) {
      if (!i)
        return i = !0, t !== -1 && setTimeout(() => i = !1, t), e(...n);
    };
  },
  memoize: (t) => function(...e) {
    let i = "", n = e.length, r = null;
    for (; n--; )
      r = e[n], i += r === Object(r) ? JSON.stringify(r) : r, t.memoize || (t.memoize = {});
    return i in t.memoize ? t.memoize[i] : t.memoize[i] = t.apply(this, e);
  },
  randomColor: function(t = 1) {
    return Color.random(t);
  },
  randomChoice: (t) => t[Math.floor(Math.random() * t.length)],
  randomNumber: function(t = 0, e = 1) {
    return Utils$1.mapRange(Math.random(), 0, 1, t, e);
  },
  randomImage: function(t) {
    lodash.isNumber(t) && (t = { id: t });
    const e = [
      "1417733403748-83bbc7c05140",
      "1423841265803-dfac59ebf718",
      "1433689056001-018e493576bc",
      "1430812411929-de4cf1d1fe73",
      "1457269449834-928af64c684d",
      "1443616839562-036bb2afd9a2",
      "1461535676131-2de1f7054d3f",
      "1462393582935-1ac76b85dcf1",
      "1414589530802-cb54ce0575d9",
      "1422908132590-117a051fc5cd",
      "1438522014717-d7ce32b9bab9",
      "1462058164249-2dcdcda67ce7",
      "1456757014009-0614a080ff7f",
      "1434238255348-4fb0d9caa0a4",
      "1448071792026-7064a01897e7",
      "1458681842652-019f4eeda5e5",
      "1460919920543-d8c45f4bd621",
      "1447767961238-038617b84a2b",
      "1449089299624-89ce41e8306c",
      "1414777410116-81e404502b52",
      "1433994349623-0a18966ee9c0",
      "1452567772283-91d67178f409",
      "1458245229726-a8ba04cb5969",
      "1422246719650-cb30d19825e3",
      "1417392639864-2c88dd07f460",
      "1442328166075-47fe7153c128",
      "1448467258552-6b3982373a13",
      "1447023362548-250f3a7b80ed",
      "1451486242265-24b0c0ef9a51",
      "1414339372428-797ec111646d"
    ];
    let i = Utils$1.randomChoice(e);
    t?.id != null && (i = e[t.id % e.length]);
    const n = 100;
    let r = 1024;
    return t && (r = Math.max(t.width, t.height), r = Math.ceil(r / n) * n, r < n && (r = n), r = Utils$1.devicePixelRatio() * r, r = parseInt(r, 10)), `https://images.unsplash.com/photo-${i}?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=${r}&h=${r}&fit=max`;
  },
  defineEnum: function(t = [], e = 0, i = 0) {
    const n = {};
    for (let r = 0; r < t.length; r++) {
      const s = t[r];
      let a = r;
      a = e ? a + e : a, a = i ? Math.pow(i, a) : a, n[n[s] = a] = s;
    }
    return n;
  },
  labelLayer: function(t, e, i = {}) {
    if (!e || typeof e != "string") return;
    const n = Math.max(Math.min(48, parseInt(t.height / 3.2)), 14);
    i = lodash.extend(
      {
        font: `${n}px/1em ${Utils$1.deviceFont()}`,
        lineHeight: `${t.height}px`,
        textAlign: "center",
        color: "#fff"
      },
      i
    ), t.style = i, t.html = e;
  },
  stringify: function(t) {
    try {
      if (lodash.isObject(t)) return JSON.stringify(t);
    } catch {
    }
    return t === null ? "null" : t === void 0 ? "undefined" : t.toString ? t.toString() : t;
  },
  inspectObjectType: function(t) {
    let e;
    if ((t.constructor != null ? t.constructor.name : void 0) != null && (t.constructor != null ? t.constructor.name : void 0) !== "Object")
      return t.constructor.name;
    const i = function(n) {
      if (!n)
        return null;
      const s = /\[object (\w+)\]/.exec(n);
      return s ? s[1] : null;
    };
    return t.toString && (e = i(t.toString()), e) ? e : t.constructor != null && t.constructor.toString && (e = i(
      t.constructor != null ? t.constructor.toString() : void 0
    ), e) ? e.replace("Constructor", "") : "Object";
  },
  inspect: function(t, e, i) {
    if (e == null && (e = 5), i == null && (i = 0), t === null)
      return "null";
    if (t === void 0)
      return "undefined";
    if (lodash.isFunction(t.toInspect))
      return t.toInspect();
    if (lodash.isString(t))
      return `"${t}"`;
    if (lodash.isNumber(t))
      return `${t}`;
    if (lodash.isFunction(t)) {
      let n = t.toString().slice(9).replace(/\n/g, "").replace(/\s+/g, " ");
      const r = 50;
      return n.length > r && i > 0 && (n = `${lodash.trimEnd(n.slice(0, +r + 1))}… }`), `<Function ${n}>`;
    }
    if (lodash.isArray(t))
      return i > e ? "[...]" : "[" + lodash.map(t, (n) => Utils$1.inspect(n, e, i + 1)).join(", ") + "]";
    if (lodash.isObject(t)) {
      let n;
      const r = Utils$1.inspectObjectType(t);
      return /HTML\w+?Element/.test(r) ? `<${r}>` : (i > e ? n = "{...}" : n = "{" + lodash.map(t, (s, a) => `${a}:${Utils$1.inspect(s, e, i + 1)}`).join(
        ", "
      ) + "}", r === "Object" ? n : `<${r} ${n}>`);
    }
    return `${t}`;
  },
  uuid: function() {
    const t = "0123456789abcdefghijklmnopqrstuvwxyz".split(""), e = new Array(36);
    let i = 0;
    for (let r = 1; r <= 32; r++) {
      i <= 2 && (i = 33554432 + Math.random() * 16777216 | 0);
      var n = i & 15;
      i = i >> 4, e[r] = t[r === 19 ? n & 3 | 8 : n];
    }
    return e.join("");
  },
  findLayer: (t, e) => lodash.find(t, (i) => Utils$1.layerMatchesSelector(i, e)),
  filterLayers: (t, e) => lodash.filter(t, (i) => Utils$1.layerMatchesSelector(i, e)),
  layerMatchesSelector: (t, e) => {
    const i = (r) => lodash.pluck(r.ancestors().reverse(), "name").join(">") + `>${t.name}`, n = (r, s) => {
      s = s.replace(/\s*>\s*/g, ">"), s = s.split("*").join("[^>]*"), s = s.split(" ").join("(?:.*)>"), s = s.split(",").join("$|");
      const a = "(^|>)" + s + "$";
      return new RegExp(a).test(r);
    };
    if (e) {
      const r = i(t);
      return n(r, e);
    }
  },
  arrayFromArguments: (t) => lodash.isArray(t[0]) ? t[0] : Array.from(t),
  cycle: (...t) => {
    let e = -1;
    return () => (e++, e >= t.length && (e = 0), t[e]);
  },
  toggle: (...t) => Utils$1.cycle(...t),
  callAfterCount: (t, e) => {
    let i = 0;
    return () => {
      if (i += 1, i === t)
        return typeof e == "function" ? e() : void 0;
    };
  },
  equal: (t, e) => lodash.isFunction(t?.isEqual) ? t.isEqual(e) : lodash.isFunction(e?.isEqual) ? e.isEqual(t) : lodash.isEqual(t, e),
  isWebKit: () => window.WebKitCSSMatrix !== void 0 && !Utils$1.isEdge(),
  webkitVersion: () => {
    let t = -1;
    const i = /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);
    return i && (t = parseFloat(i[1])), t;
  },
  isChrome: () => /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  isSafari: () => /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
  isFirefox: () => /^Mozilla.*Firefox\/\d+\.\d+$/.test(navigator.userAgent),
  isEdge: () => /Edge/.test(navigator.userAgent),
  isAndroid: () => /(android)/i.test(navigator.userAgent),
  isIOS: () => /(iPhone|iPod|iPad)/i.test(navigator.platform),
  isMacOS: () => /Mac/.test(navigator.platform),
  isWindows: () => /Win/.test(navigator.platform),
  isTouch: () => window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null,
  isDesktop: () => Utils$1.deviceType() === "desktop",
  isPhone: () => Utils$1.deviceType() === "phone",
  isTablet: () => Utils$1.deviceType() === "tablet",
  isMobile: () => Utils$1.isPhone() || Utils$1.isTablet(),
  isFileUrl: (t) => lodash.startsWith(t, "file://"),
  isDataUrl: (t) => lodash.startsWith(t, "data:"),
  isRelativeUrl: (t) => !/^([a-zA-Z]{1,8}:\/\/).*$/.test(t),
  isLocalServerUrl: (t) => /[a-zA-Z]{1,8}:\/\/127\.0\.0\.1/.test(t) || /[a-zA-Z]{1,8}:\/\/localhost/.test(t),
  isLocalUrl: (t) => Utils$1.isFileUrl(t) || Utils$1.isLocalServerUrl(t),
  isLocalAssetUrl: (t, e = window.location.href) => Utils$1.isDataUrl(t) ? !1 : !!(Utils$1.isLocalUrl(t) || Utils$1.isRelativeUrl(t) && Utils$1.isLocalUrl(e)),
  isFramerStudio: () => navigator.userAgent.includes("FramerStudio"),
  framerStudioVersion: () => {
    if (Utils$1.isFramerStudio()) {
      const t = navigator.userAgent.includes("FramerStudio/beta"), e = navigator.userAgent.includes("FramerStudio/local"), i = navigator.userAgent.includes("FramerStudio/future");
      if (t || e || i) return Number.MAX_VALUE;
      const n = navigator.userAgent.match(/\d+$/), r = n && n.length > 0 ? parseInt(n[0]) : void 0;
      if (lodash.isNumber(r)) return r;
    }
    return Number.MAX_VALUE;
  },
  devicePixelRatio: () => window.devicePixelRatio,
  isJP2Supported: () => Utils$1.isWebKit() && !Utils$1.isChrome() && !Utils$1.isFirefox(),
  isWebPSupported: () => Utils$1.isChrome(),
  deviceType: () => /(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent) ? "tablet" : /(mobi)/i.test(navigator.userAgent) ? "phone" : "desktop",
  pathJoin: (...t) => t.join("/"),
  deviceFont: (t) => {
    t || (Utils$1.isMacOS() && (t = "macOS"), Utils$1.isIOS() && (t = "iOS"), Utils$1.isAndroid() && (t = "Android"), Utils$1.isWindows() && (t = "Windows"));
    const e = "-apple-system, BlinkMacSystemFont, SF UI Text, Helvetica Neue", i = "Roboto, Helvetica Neue", n = "Segoe UI, Helvetica Neue";
    switch (t) {
      case "Android":
        return i;
      case "iOS":
      case "watchOS":
      case "macOS":
        return e;
      case "Windows":
        return n;
      default:
        return e;
    }
  },
  isFontAvailable: (t) => _isFontLoadedResults[t] === !0 ? !0 : (monoWidth == null && (monoWidth = getWidth("monospace")), serifWidth == null && (serifWidth = getWidth("serif")), sansWidth == null && (sansWidth = getWidth("sans-serif")), monoWidth !== getWidth(`${t},monospace`) || serifWidth !== getWidth(`${t},serif`) || sansWidth !== getWidth(`${t},sans-serif`) ? (_isFontLoadedResults[t] = !0, !0) : !1),
  isFontFamilyLoaded: (t, e = 1e3) => {
    lodash.isArray(t) || (t = [t]);
    const i = t.filter(
      (n) => !Utils$1.isFontAvailable(n)
    );
    return i.length === 0 ? !0 : Utils$1.loadWebFontConfig({
      custom: {
        families: i
      },
      timeout: e
    });
  },
  textSize: (t, e = {}, i = {}) => {
    const n = !_textSizeNode;
    n && (_textSizeNode = document.createElement("div"), _textSizeNode.id = "_textSizeNode"), _textSizeNode.removeAttribute("style"), _textSizeNode.innerHTML = t, e = lodash.extend(lodash.clone(e), {
      position: "fixed",
      display: "inline",
      visibility: "hidden",
      top: "-10000px",
      left: "-10000px"
    }), delete e.width, delete e.height, delete e.bottom, delete e.right, i.max ? (i.width && (e.maxWidth = `${i.width}px`), i.height && (e.maxHeight = `${i.height}px`)) : (i.width && (e.width = `${i.width}px`), i.height && (e.height = `${i.height}px`)), lodash.extend(_textSizeNode.style, e), n && (document.body ? document.body.appendChild(_textSizeNode) : (document.write(_textSizeNode.outerHTML), _textSizeNode = document.getElementById("_textSizeNode")));
    const r = _textSizeNode.getBoundingClientRect();
    return {
      width: r.right - r.left,
      height: r.bottom - r.top
    };
  },
  loadWebFontConfig: (t) => {
    const e = fontsFromConfig(t);
    let i = null;
    for (const o of e) {
      const l = _isFontLoadedResults[o];
      if (l == null) {
        i = null;
        break;
      }
      i = (i === null || i) && l;
    }
    if (i != null) return i;
    const {
      active: n,
      inactive: r,
      fontactive: s,
      fontinactive: a
    } = t;
    return new Promise((o, l) => {
      t.fontactive = (u) => {
        _isFontLoadedResults[u] = !0, typeof s == "function" && s(u), e.length === 1 && o();
      }, t.fontinactive = (u) => {
        console.warn(`Tried to load unavailable font: '${u}'`), _isFontLoadedResults[u] = !1, typeof a == "function" && a(u), e.length === 1 && l(new Error(`${u} failed to load`));
      }, t.active = () => {
        typeof n == "function" && n(), o();
      }, t.inactive = () => {
        typeof r == "function" && r(), l(new Error(`${e.join(", ")} failed to load`));
      }, WebFont.load(t);
    });
  },
  loadWebFont: (t, e, i = "google") => {
    if (_isFontLoadedResults[t] == null || _isFontLoadedResults[t] === !1) {
      delete _isFontLoadedResults[t];
      const n = {};
      if (i === "google") {
        let r = t;
        e != null && (r += `:${e}`), n.google = { families: [r] };
      }
      Utils$1.loadWebFontConfig(n);
    }
    return { fontFamily: t, fontWeight: e };
  },
  //#####################################################
  // MATH FUNCTIONS
  round: (t, e = 0, i = null, n = null, r = null) => {
    const s = Math.pow(10, e);
    return i && (t = Math.round(t / i) * i), t = Math.round(t * s) / s, n != null && t < n && (t = n), r != null && t > r && (t = r), t;
  },
  roundWhole: (t, e = 1) => parseInt(t) === t ? parseInt(t) : Utils$1.round(t, e),
  clamp: (t, e, i) => {
    const n = Math.min(e, i), r = Math.max(e, i);
    return Math.min(Math.max(t, n), r);
  },
  mapRange: (t, e, i, n, r) => n + (t - e) / (i - e) * (r - n),
  modulate: (t, [e, i], [n, r], s = !1) => {
    let a = n + (t - e) / (i - e) * (r - n);
    return s && (n < r ? a = Math.min(Math.max(a, n), r) : a = Math.max(Math.min(a, n), r)), a;
  },
  //#####################################################
  // STRING FUNCTIONS
  parseFunction: (t) => {
    const e = { name: "", args: [] };
    return lodash.endsWith(t, ")") ? (e.name = t.split("(")[0], e.args = t.split("(")[1].split(",").map((i) => lodash.trim(lodash.trimEnd(i, ")")))) : e.name = t, e;
  }
};
window.requestAnimationFrame == null && (window.requestAnimationFrame = window.webkitRequestAnimationFrame);
window.requestAnimationFrame == null && (window.requestAnimationFrame = (t) => Utils$1.delay(1 / 60, t));
window.performance ? Utils$1.getTime = () => window.performance.now() / 1e3 : Utils$1.getTime = () => Date.now() / 1e3;
const _isFontLoadedResults = {}, getWidth = (t) => Utils$1.textSize("BESbswy", {
  fontFamily: t,
  fontSize: 300
}).width;
let monoWidth = null, serifWidth = null, sansWidth = null;
const fontsFromConfig = function(t) {
  let e = [];
  return lodash.isArray(
    __guard__$6(t?.custom, (i) => i.families)
  ) && (e = e.concat(
    __guard__$6(t?.custom, (i) => i.families)
  )), lodash.isArray(
    __guard__$6(t?.google, (i) => i.families)
  ) && (e = e.concat(
    __guard__$6(t?.google, (i) => i.families)
  )), e;
}, __domCompleteState = "interactive";
let __domComplete = [], __domReady = !1;
typeof document < "u" && document !== null && (document.onreadystatechange = function(t) {
  if (document.readyState === __domCompleteState)
    return __domReady = !0, (() => {
      const e = [];
      for (; __domComplete.length; )
        e.push(__domComplete.shift()());
      return e;
    })();
});
Utils$1.domComplete = function(t) {
  return __domReady ? t() : __domComplete.push(t);
};
Utils$1.domCompleteCancel = (t) => __domComplete = lodash.without(__domComplete, t);
Utils$1.domValidEvent = function(t, e) {
  if (e)
    return ["touchstart", "touchmove", "touchend"].includes(e) ? !0 : typeof t[`on${e.toLowerCase()}`] < "u";
};
Utils$1.domLoadScript = function(t, e) {
  const i = document.createElement("script");
  return i.type = "text/javascript", i.src = t, i.onload = e, document.getElementsByTagName("head")[0].appendChild(i), i;
};
Utils$1.domLoadData = function(t, e) {
  const i = new XMLHttpRequest();
  return i.addEventListener(
    "load",
    () => e(null, i.responseText),
    !1
  ), i.addEventListener("error", () => e(!0, null), !1), i.open("GET", t, !0), i.send(null);
};
Utils$1.domLoadJSON = (t, e) => Utils$1.domLoadData(t, (i, n) => e(i, JSON.parse(n)));
Utils$1.domLoadDataSync = function(t) {
  const e = new XMLHttpRequest();
  e.open("GET", t, !1);
  try {
    e.send(null);
  } catch (n) {
    console.debug("XMLHttpRequest.error", n);
  }
  const i = function() {
    throw Error(
      `Utils.domLoadDataSync: ${t} -> [${e.status} ${e.statusText}]`
    );
  };
  return e.onerror = i, [200, 0].includes(e.status) || i(), e.responseText || i(), e.responseText;
};
Utils$1.domLoadJSONSync = (t) => JSON.parse(Utils$1.domLoadDataSync(t));
Utils$1.domLoadScriptSync = function(path) {
  const scriptData = Utils$1.domLoadDataSync(path);
  return eval(scriptData), scriptData;
};
Utils$1.insertCSS = function(t) {
  const e = document.createElement("style");
  return e.type = "text/css", e.innerHTML = t, Utils$1.domComplete(() => document.body.appendChild(e));
};
Utils$1.loadImage = function(t, e, i) {
  const n = new Image();
  return i == null && (i = Framer.CurrentContext), i.domEventManager.wrap(n).addEventListener("load", (r) => e()), i.domEventManager.wrap(n).addEventListener("error", (r) => e(!0)), n.src = t;
};
Utils$1.isInsideIframe = function() {
  return Utils$1.isInsideFramerCloud() ? !1 : window !== window.top;
};
Utils$1.isInsideFramerCloud = () => Utils$1.getQueryParameters().cloud === "1";
Utils$1.getQueryParameters = () => lodash.fromPairs(
  window.location.search.slice(1).split("&").map((t) => t.split("="))
);
Utils$1.point = function(t) {
  if (lodash.isNumber(t))
    return Utils$1.pointZero(t);
  if (!t)
    return Utils$1.pointZero();
  const e = Utils$1.pointZero();
  for (var i of ["x", "y"])
    lodash.isNumber(t[i]) && (e[i] = t[i]);
  return e;
};
Utils$1.pointZero = function(t) {
  return t == null && (t = 0), { x: t, y: t };
};
Utils$1.pointDivide = (t, e) => t = {
  x: t.x / e,
  y: t.y / e
};
Utils$1.pointAdd = function(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
};
Utils$1.pointSubtract = function(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
};
Utils$1.pointMin = function() {
  const t = Utils$1.arrayFromArguments(arguments);
  return {
    x: lodash.min(t.map((e) => e.x)),
    y: lodash.min(t.map((e) => e.y))
  };
};
Utils$1.pointMax = function() {
  const t = Utils$1.arrayFromArguments(arguments);
  return {
    x: lodash.max(t.map((e) => e.x)),
    y: lodash.max(t.map((e) => e.y))
  };
};
Utils$1.pointDelta = function(t, e) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
};
Utils$1.pointDistance = function(t, e) {
  const i = t.x - e.x, n = t.y - e.y;
  return Math.sqrt(i * i + n * n);
};
Utils$1.pointInvert = (t) => t = {
  x: 0 - t.x,
  y: 0 - t.y
};
Utils$1.pointTotal = (t) => t.x + t.y;
Utils$1.pointAbs = (t) => t = {
  x: Math.abs(t.x),
  y: Math.abs(t.y)
};
Utils$1.pointInFrame = function(t, e) {
  return !(t.x < Utils$1.frameGetMinX(e) || t.x > Utils$1.frameGetMaxX(e) || t.y < Utils$1.frameGetMinY(e) || t.y > Utils$1.frameGetMaxY(e));
};
Utils$1.pointCenter = function(t, e) {
  return {
    x: (t.x + e.x) / 2,
    y: (t.y + e.y) / 2
  };
};
Utils$1.pointAngle = (t, e) => Math.atan2(e.y - t.y, e.x - t.x) * 180 / Math.PI;
Utils$1.divideFrame = function(t, e) {
  return t.x /= e, t.y /= e, t.width /= e, t.height /= e, t;
};
Utils$1.scaleFrames = function(t, e) {
  if (t instanceof Layer && (t.constraintValues = null, t.children.map((i) => Utils$1.scaleFrames(i, e)), t.frame = Utils$1.divideFrame(t.frame, e)), lodash.isArray(t))
    return t.map((i) => Utils$1.scaleFrames(i, e));
};
Utils$1.size = function(t) {
  if (lodash.isNumber(t))
    return Utils$1.sizeZero(t);
  if (!t)
    return Utils$1.sizeZero();
  const e = Utils$1.sizeZero();
  for (var i of ["width", "height"])
    lodash.isNumber(t[i]) && (e[i] = t[i]);
  return e;
};
Utils$1.sizeZero = function(t) {
  return t == null && (t = 0), { width: t, height: t };
};
Utils$1.sizeMin = function() {
  const t = Utils$1.arrayFromArguments(arguments);
  return {
    width: lodash.min(t.map((e) => e.width)),
    height: lodash.min(t.map((e) => e.height))
  };
};
Utils$1.sizeMax = function() {
  const t = Utils$1.arrayFromArguments(arguments);
  return {
    width: lodash.max(t.map((e) => e.width)),
    height: lodash.max(t.map((e) => e.height))
  };
};
Utils$1.rectZero = function(t) {
  return t == null && (t = {}), lodash.defaults(t, { top: 0, right: 0, bottom: 0, left: 0 });
};
Utils$1.parseRect = function(t) {
  if (lodash.isArray(t) && lodash.isNumber(t[0])) {
    if (t.length === 1)
      return Utils$1.parseRect({ top: t[0] });
    if (t.length === 2)
      return Utils$1.parseRect({ top: t[0], right: t[1] });
    if (t.length === 3)
      return Utils$1.parseRect({ top: t[0], right: t[1], bottom: t[2] });
    if (t.length === 4)
      return Utils$1.parseRect({
        top: t[0],
        right: t[1],
        bottom: t[2],
        left: t[3]
      });
  }
  return lodash.isArray(t) && lodash.isObject(t[0]) ? t[0] : lodash.isObject(t) ? t : lodash.isNumber(t) ? { top: t, right: t, bottom: t, left: t } : {};
};
Utils$1.frameGetMinX = (t) => t.x;
Utils$1.frameSetMinX = (t, e) => t.x = e;
Utils$1.frameGetMidX = function(t) {
  return t.width === 0 ? t.x : t.x + t.width / 2;
};
Utils$1.frameSetMidX = (t, e) => t.x = t.width === 0 ? e : e - t.width / 2;
Utils$1.frameGetMaxX = function(t) {
  return t.width === 0 ? 0 : t.x + t.width;
};
Utils$1.frameSetMaxX = (t, e) => t.x = t.width === 0 ? 0 : e - t.width;
Utils$1.frameGetMinY = (t) => t.y;
Utils$1.frameSetMinY = (t, e) => t.y = e;
Utils$1.frameGetMidY = function(t) {
  return t.height === 0 ? t.y : t.y + t.height / 2;
};
Utils$1.frameSetMidY = (t, e) => t.y = t.height === 0 ? e : e - t.height / 2;
Utils$1.frameGetMaxY = function(t) {
  return t.height === 0 ? 0 : t.y + t.height;
};
Utils$1.frameSetMaxY = (t, e) => t.y = t.height === 0 ? 0 : e - t.height;
Utils$1.frame = function(t) {
  if (lodash.isNumber(t))
    return Utils$1.frameZero(t);
  if (!t)
    return Utils$1.frameZero();
  const e = Utils$1.frameZero();
  for (var i of ["x", "y", "width", "height"])
    lodash.isNumber(t[i]) && (e[i] = t[i]);
  return e;
};
Utils$1.frameZero = function(t) {
  return t == null && (t = 0), { x: t, y: t };
};
Utils$1.frameSize = function(t) {
  return {
    width: t.width,
    height: t.height
  };
};
Utils$1.framePoint = function(t) {
  return {
    x: t.x,
    y: t.y
  };
};
Utils$1.pointsFromFrame = function(t) {
  const e = Utils$1.frameGetMinX(t), i = Utils$1.frameGetMaxX(t), n = Utils$1.frameGetMinY(t), r = Utils$1.frameGetMaxY(t);
  return [{ x: e, y: n }, { x: e, y: r }, { x: i, y: r }, { x: i, y: n }];
};
Utils$1.frameFromPoints = function(t) {
  const e = lodash.map(t, "x"), i = lodash.map(t, "y"), n = lodash.min(e), r = lodash.max(e), s = lodash.min(i), a = lodash.max(i);
  return {
    x: n,
    y: s,
    width: r - n,
    height: a - s
  };
};
Utils$1.pixelAlignedFrame = function(t) {
  const e = Math.round(t.x), i = Math.round(t.y), n = Math.round(t.x + t.width), r = Math.round(t.y + t.height), s = Math.max(n - e, 0), a = Math.max(r - i, 0);
  return { x: e, y: i, width: s, height: a };
};
Utils$1.calculateLayoutFrame = function(t, e) {
  const { constraintValues: i } = e;
  let n = i.left || 0, r = i.top || 0, { width: s } = i, { height: a } = i;
  if (t === null)
    return Utils$1.pixelAlignedFrame({ x: n, y: r, width: s, height: a });
  const o = s / a;
  return i.widthFactor !== null && (s = t.width * i.widthFactor, i.aspectRatioLocked && (a = s / o)), i.heightFactor !== null && (a = t.height * i.heightFactor, i.aspectRatioLocked && (s = a * o)), i.left !== null && i.right !== null && (s = t.width - i.right - i.left, i.aspectRatioLocked && (a = s / o)), i.top !== null && i.bottom !== null && (a = t.height - i.bottom - i.top, i.aspectRatioLocked && (s = a * o)), n = Utils$1.calculateLayoutX(t, i, s), r = Utils$1.calculateLayoutY(t, i, a), Utils$1.pixelAlignedFrame({ x: n, y: r, width: s, height: a });
};
Utils$1.calculateLayoutX = function(t, e, i) {
  let n = e.left || 0;
  return e.left !== null ? n = e.left : e.right !== null ? n = t.width - e.right - i : n = e.centerAnchorX * t.width - i / 2, n;
};
Utils$1.calculateLayoutY = function(t, e, i) {
  let n = e.top || 0;
  return e.top !== null ? n = e.top : e.bottom !== null ? n = t.height - e.bottom - i : n = e.centerAnchorY * t.height - i / 2, n;
};
Utils$1.frameMerge = function() {
  const t = Utils$1.arrayFromArguments(arguments), e = {
    x: lodash.min(t.map(Utils$1.frameGetMinX)),
    y: lodash.min(t.map(Utils$1.frameGetMinY))
  };
  return e.width = lodash.max(t.map(Utils$1.frameGetMaxX)) - e.x, e.height = lodash.max(t.map(Utils$1.frameGetMaxY)) - e.y, e;
};
Utils$1.frameInFrame = function(t, e) {
  for (var i of Array.from(Utils$1.pointsFromFrame(t)))
    if (!Utils$1.pointInFrame(i, e))
      return !1;
  return !0;
};
Utils$1.framePointForOrigin = (t, e, i) => t = {
  x: t.x + e * t.width,
  y: t.y + i * t.height,
  width: t.width,
  height: t.height
};
Utils$1.frameInset = function(t, e) {
  return lodash.isNumber(e) && (e = { top: e, right: e, bottom: e, left: e }), t = Utils$1.frame(t), t = {
    x: t.x + e.left,
    y: t.y + e.top,
    width: t.width - e.left - e.right,
    height: t.height - e.top - e.bottom
  };
};
Utils$1.frameSortByAbsoluteDistance = function(t, e, i, n) {
  i == null && (i = 0), n == null && (n = 0);
  const r = function(s) {
    let a = Utils$1.pointDelta(
      t,
      Utils$1.framePointForOrigin(s, i, n)
    );
    return a = Utils$1.pointAbs(a), a = Utils$1.pointTotal(a), a;
  };
  return e.sort((s, a) => r(s) - r(a));
};
Utils$1.pointInPolygon = function(t, e) {
  const i = t[0], n = t[1];
  let r = !1, s = 0, a = e.length - 1;
  for (; s < e.length; ) {
    var o = e[s][0], l = e[s][1], u = e[a][0], c = e[a][1], f = l > n && n !== c && c > n && i < (u - o) * (n - l) / (c - l) + o;
    f && (r = !r), a = s++;
  }
  return r;
};
Utils$1.frameIntersection = function(t, e) {
  let i = e.x, n = e.y, r = i + e.width, s = n + e.height;
  return t.x > i && (i = t.x), t.y > n && (n = t.y), t.x + t.width < r && (r = t.x + t.width), t.y + t.height < s && (s = t.y + t.height), r <= i || s <= n ? null : e = {
    x: i,
    y: n,
    width: r - i,
    height: s - n
  };
};
Utils$1.frameCenterPoint = function(t) {
  return {
    x: Utils$1.frameGetMidX(t),
    y: Utils$1.frameGetMidY(t)
  };
};
Utils$1.frameInFrame = function(t, e) {
  for (var i of Array.from(Utils$1.pointsFromFrame(t)))
    if (!Utils$1.pointInFrame(i, e))
      return !1;
  return !0;
};
Utils$1.rotationNormalizer = function() {
  let t = null;
  return function(e) {
    t == null && (t = e);
    const i = t - e, n = Math.abs(i) + 180, r = Math.floor(n / 360);
    return i < 180 && (e -= r * 360), i > 180 && (e += r * 360), t = e, e;
  };
};
Utils$1.convertPointToContext = function(t, e, i, n) {
  t == null && (t = {}), i == null && (i = !1), n == null && (n = !0), t = lodash.defaults(t, { x: 0, y: 0, z: 0 });
  const r = e.containers(i);
  n && r.unshift(e);
  for (var s of Array.from(r))
    (s.flat || s.clip) && (t.z = 0), s.matrix3d != null ? t = s.matrix3d.point(t) : s.scale != null && (t = {
      x: t.x * s.scale,
      y: t.y * s.scale
    }), s.parent || (t.z = 0);
  return t;
};
Utils$1.convertFrameToContext = function(t, e, i, n) {
  t == null && (t = {}), i == null && (i = !1), n == null && (n = !0), t = lodash.defaults(t, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height
  });
  const s = Utils$1.pointsFromFrame(t).map(
    (a) => Utils$1.convertPointToContext(a, e, i, n)
  );
  return Utils$1.frameFromPoints(s);
};
Utils$1.convertPointFromContext = function(t, e, i, n) {
  if (t == null && (t = {}), i == null && (i = !1), n == null && (n = !0), t = lodash.defaults(t, { x: 0, y: 0, z: 0 }), i && typeof webkitConvertPointFromPageToNode < "u" && webkitConvertPointFromPageToNode !== null) {
    let a;
    n ? a = e._element : a = (e.parent || e.context)._element, t = Utils$1.point(
      webkitConvertPointFromPageToNode(a, new WebKitPoint(t.x, t.y))
    );
    const o = e.context != null ? e.context : e;
    return t = {
      x: t.x / o.scale,
      y: t.y / o.scale
    }, t;
  }
  const r = e.containers(i);
  r.reverse(), n && r.push(e);
  for (var s of Array.from(r))
    s.matrix3d != null ? t = s.matrix3d.inverse().point(t) : s.scale != null && (t = {
      x: t.x / s.scale,
      y: t.y / s.scale
    });
  return t;
};
Utils$1.convertFrameFromContext = function(t, e, i, n) {
  t == null && (t = {}), i == null && (i = !1), n == null && (n = !0), t = lodash.defaults(t, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height
  });
  const s = Utils$1.pointsFromFrame(t).map(
    (a) => Utils$1.convertPointFromContext(a, e, i, n)
  );
  return Utils$1.frameFromPoints(s);
};
Utils$1.convertPoint = function(t, e, i, n) {
  n == null && (n = !1);
  let r = lodash.defaults(t, { x: 0, y: 0, z: 0 });
  if (e && (r = Utils$1.convertPointToContext(r, e, n)), i != null)
    return Utils$1.convertPointFromContext(r, i, n);
  if (e != null && n && typeof webkitConvertPointFromPageToNode < "u" && webkitConvertPointFromPageToNode !== null) {
    const s = e.context._element;
    return Utils$1.point(
      webkitConvertPointFromPageToNode(s, new WebKitPoint(r.x, r.y))
    );
  } else
    return r;
};
Utils$1.boundingFrame = function(t, e) {
  e == null && (e = !0);
  const i = { x: 0, y: 0, width: t.width, height: t.height }, r = Utils$1.pointsFromFrame(i).map(
    (a) => Utils$1.convertPointToContext(a, t, e)
  ), s = Utils$1.frameFromPoints(r);
  return Utils$1.pixelAlignedFrame(s);
};
Utils$1.perspectiveProjectionMatrix = function(t) {
  const e = t.perspective, i = Matrix.identity3d();
  return e != null && e !== 0 && (i.m34 = -1 / e), i;
};
Utils$1.perspectiveMatrix = function(t) {
  const e = t.perspectiveOriginX * t.width, i = t.perspectiveOriginY * t.height, n = Utils$1.perspectiveProjectionMatrix(t);
  return Matrix.identity3d().translate(e, i).multiply(n).translate(-e, -i);
};
Utils$1.globalLayers = function(t) {
  for (var e in t) {
    var i = t[e];
    e = e.replace(/\s/g, ""), window.hasOwnProperty(e) && !window.Framer._globalWarningGiven ? print(
      `Warning: Cannot make layer '${e}' a global, a variable with that name already exists`
    ) : window[e] = i;
  }
  return window.Framer._globalWarningGiven = !0;
};
let _textSizeNode = null;
Utils$1.throwInStudioOrWarnInProduction = function(t) {
  if (Utils$1.isFramerStudio())
    throw new Error(t);
  return console.warn(t), null;
};
Utils$1.getIdAttributesFromString = function(t) {
  let e;
  const i = /id=['"]([^'"]+)["']/g, n = [];
  for (; e = i.exec(t); ) {
    var r = e[1];
    r != null && n.push(r);
  }
  return n;
};
Utils$1.getUniqueId = function(t) {
  t == null && (t = "id");
  let e = t, i = 1, n = document.querySelector(`[id='${e}']`);
  for (; n != null; )
    e = `${t}${i}`, n = document.querySelector(`[id='${e}']`), i++;
  return e;
};
function __guard__$6(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
class EventEmitter3 {
  constructor() {
    this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0;
  }
  /**
   * Add a listener for a given event
   */
  on(e, i, n) {
    return this._addListener(e, i, n, !1);
  }
  /**
   * Add a one-time listener for a given event
   */
  once(e, i, n) {
    return this._addListener(e, i, n, !0);
  }
  /**
   * Remove the listeners of a given event
   */
  off(e, i, n, r) {
    if (!this._events[e]) return this;
    if (!i)
      return this._clearEvent(e), this;
    const s = this._events[e], a = [];
    for (let o = 0; o < s.length; o++)
      (s[o].fn !== i || r && !s[o].once || n && s[o].context !== n) && a.push(s[o]);
    return a.length ? this._events[e] = a.length === 1 ? a[0] : a : this._clearEvent(e), this;
  }
  /**
   * Remove all listeners, or those of the specified event
   */
  removeAllListeners(e) {
    return e !== void 0 ? this._events[e] && this._clearEvent(e) : (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this;
  }
  /**
   * Emit an event to all registered listeners
   */
  emit(e, ...i) {
    if (!this._events[e]) return !1;
    const n = this._events[e], r = i.length;
    if (Array.isArray(n))
      for (let s = 0; s < n.length; s++)
        n[s].once && this.off(e, n[s].fn, void 0, !0), this._emitListener(n[s], r, i);
    else
      n.once && this.off(e, n.fn, void 0, !0), this._emitListener(n, r, i);
    return !0;
  }
  /**
   * Get all listener function names for an event
   */
  listeners(e) {
    const i = this._events[e];
    return i ? Array.isArray(i) ? i.map((n) => n.fn) : [i.fn] : [];
  }
  /**
   * Get the number of listeners for an event
   */
  listenerCount(e) {
    const i = this._events[e];
    return i ? Array.isArray(i) ? i.length : 1 : 0;
  }
  /**
   * Return an array listing the events for which the emitter has registered listeners
   */
  eventNames() {
    return this._eventsCount === 0 ? [] : Object.keys(this._events);
  }
  /**
   * Internal: Add a listener
   */
  _addListener(e, i, n, r) {
    if (typeof i != "function")
      throw new TypeError("The listener must be a function");
    const s = { fn: i, context: n || this, once: r || !1 }, a = this._events[e];
    return a ? Array.isArray(a) ? a.push(s) : this._events[e] = [a, s] : (this._events[e] = s, this._eventsCount++), this;
  }
  /**
   * Internal: Clear a specific event
   */
  _clearEvent(e) {
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete this._events[e];
  }
  /**
   * Internal: Call a listener with arguments
   */
  _emitListener(e, i, n) {
    switch (i) {
      case 0:
        return e.fn.call(e.context);
      case 1:
        return e.fn.call(e.context, n[0]);
      case 2:
        return e.fn.call(e.context, n[0], n[1]);
      case 3:
        return e.fn.call(e.context, n[0], n[1], n[2]);
      default:
        return e.fn.apply(e.context, n);
    }
  }
}
EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
EventEmitter3.prototype.removeListener = EventEmitter3.prototype.off;
class EventEmitter extends EventEmitter3 {
  constructor() {
    super();
  }
  listenerEvents() {
    return this.eventNames();
  }
  removeAllListeners(e) {
    const i = e ? [e] : this.listenerEvents();
    for (const n of i) {
      const r = this.listeners(n);
      for (const s of r)
        this.removeListener(n, s);
    }
  }
}
const CounterKey = "_ObjectCounter", DefinedPropertiesValuesKey = "_DefinedPropertiesValuesKey";
let ObjectDescriptors = [], ObjectDescriptorsChanged = !0;
const DefaultPropertyOrder = [];
class BaseClass extends EventEmitter {
  static initClass() {
    this.define("props", {
      importable: !1,
      exportable: !1,
      get() {
        const e = [], i = this._propertyList();
        for (var n in i) {
          var r = i[n];
          r.exportable && e.push(n);
        }
        return lodash.pick(this, e);
      },
      set(e) {
        const i = this._propertyList();
        return (() => {
          const n = [];
          for (var r in e) {
            var s = e[r];
            i[r] != null && i[r].importable ? n.push(this[r] = s) : n.push(void 0);
          }
          return n;
        })();
      }
    }), this.define("id", {
      get() {
        return this._id;
      }
    });
  }
  //################################################################
  // Framer object properties
  static define(e, i) {
    return this !== BaseClass && this._addDescriptor(e, i), i.readonly && (i.set = function(n) {
      throw Error(`${this.constructor.name}.${e} is readonly`);
    }), Object.defineProperty(this.prototype, e, i);
  }
  static undefine(e) {
    return lodash.isArray(e) ? e.map((i) => this.undefine(i)) : this.define(
      e,
      this.simpleProperty(e, void 0, {
        importable: !1,
        exportable: !1,
        enumerable: !1
      })
    );
  }
  static _addDescriptor(e, i) {
    if (i.propertyName = e, i.enumerable == null && (i.enumerable = !0), i.exportable == null && (i.exportable = !0), i.importable == null && (i.importable = !0), i.readonly == null && (i.readonly = i.set == null), i.importable = i.importable && !i.readonly, i.exportable = i.exportable && !i.readonly, !lodash.startsWith(e, "_") && (ObjectDescriptors.push([this, e, i]), ObjectDescriptorsChanged = !0, i.exportable || i.importable)) {
      if (i.depends) {
        for (var n of Array.from(i.depends))
          Array.from(DefaultPropertyOrder).includes(n) || DefaultPropertyOrder.push(n);
        const r = DefaultPropertyOrder.indexOf(e);
        r !== -1 && (DefaultPropertyOrder.splice(r, 1), DefaultPropertyOrder.push(e));
      }
      if (!Array.from(DefaultPropertyOrder).includes(e))
        return DefaultPropertyOrder.push(e);
    }
  }
  static simpleProperty(e, i, n) {
    return n == null && (n = {}), lodash.extend(n, {
      default: i,
      get() {
        return this._getPropertyValue(e);
      },
      set(r) {
        return this._setPropertyValue(e, r), __guardMethod__$1(n, "didSet", (s) => s.didSet(this, r));
      }
    });
  }
  static proxyProperty(e, i) {
    i == null && (i = {});
    const n = e.split(".")[0];
    return lodash.extend(i, {
      get() {
        if (lodash.isObject(this[n]))
          return Utils$1.getValueForKeyPath(this, e);
      },
      set(r) {
        if (lodash.isObject(this[n]))
          return Utils$1.setValueForKeyPath(this, e, r), __guardMethod__$1(i, "didSet", (s) => s.didSet(this, r));
      },
      proxy: !0
    });
  }
  _setPropertyValue(e, i) {
    return this[DefinedPropertiesValuesKey][e] = i;
  }
  _getPropertyValue(e) {
    return Utils$1.valueOrDefault(
      this[DefinedPropertiesValuesKey][e],
      this._getPropertyDefaultValue(e)
    );
  }
  _getPropertyDefaultValue(e) {
    return __guard__$5(this._propertyList()[e], (i) => i.default);
  }
  _propertyList() {
    return (!this._propertyListCache || ObjectDescriptorsChanged) && (this._propertyListCache = this.__propertyList(), ObjectDescriptorsChanged = !1), this._propertyListCache;
  }
  __propertyList() {
    const e = {};
    for (var i of Array.from(ObjectDescriptors)) {
      var [n, r, s] = Array.from(i);
      this instanceof n && (s.exportable || s.importable ? e[r] = s : delete e[r]);
    }
    return e;
  }
  keys() {
    return lodash.keys(this.props);
  }
  toInspect() {
    return `<${this.constructor.name} id:${this.id || null}>`;
  }
  onChange(e, i) {
    return this.on(`change:${e}`, i);
  }
  //################################################################
  // Base constructor method
  constructor(e) {
    super(...arguments), this._setPropertyValue = this._setPropertyValue.bind(this), this._getPropertyValue = this._getPropertyValue.bind(this), this.toInspect = this.toInspect.bind(this), this._context = void 0, typeof window < "u" && window.Framer?.CurrentContext ? this._context = window.Framer.CurrentContext : typeof globalThis < "u" && globalThis.Framer?.CurrentContext && (this._context = globalThis.Framer.CurrentContext), this[DefinedPropertiesValuesKey] = {}, this._applyDefaults(e), this.constructor[CounterKey] == null && (this.constructor[CounterKey] = 0), this.constructor[CounterKey] += 1, this._id = this.constructor[CounterKey];
  }
  _applyDefaults(e, i) {
    if (i == null && (i = !1), !e)
      return;
    const n = this._propertyList();
    return (() => {
      const r = [];
      for (var s of Array.from(DefaultPropertyOrder)) {
        var a = n[s];
        if (a != null) {
          if (i && a.proxy !== !0)
            continue;
          r.push(this._applyDefault(a, s, e[s]));
        } else
          r.push(void 0);
      }
      return r;
    })();
  }
  _applyProxyDefaults(e) {
    return this._applyDefaults(e, !0);
  }
  _applyDefault(e, i, n) {
    let r;
    if (!e.readonly && (e.importable && (r = n), r = Utils$1.valueOrDefault(
      n,
      this._getPropertyDefaultValue(i)
    ), ![null, void 0].includes(r)))
      return this[i] = r;
  }
}
BaseClass.initClass();
function __guardMethod__$1(t, e, i) {
  if (typeof t < "u" && t !== null && typeof t[e] == "function")
    return i(t, e);
}
function __guard__$5(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
const { rgbToHsluv } = "hsluv", ColorType = {
  RGB: "rgb",
  HSL: "hsl",
  HEX: "hex",
  NAME: "name"
};
let Color$1 = class P extends BaseClass {
  static initClass() {
    this.define("r", {
      get() {
        return this._r;
      }
    }), this.define("g", {
      get() {
        return this._g;
      }
    }), this.define("b", {
      get() {
        return this._b;
      }
    }), this.define("a", {
      get() {
        return this._a;
      }
    }), this.define("h", {
      get() {
        return this._h;
      }
    }), this.define("s", {
      get() {
        return this._s;
      }
    }), this.define("l", {
      get() {
        return this._l;
      }
    }), this.isColor = (e) => lodash.isString(e) ? this.isColorString(e) : this.isColorObject(e);
  }
  constructor(e, i, n, r) {
    super(), this.toInspect = this.toInspect.bind(this), this.color = e, this.color === "" && (this.color = null);
    const { color: s } = this;
    if (P.isColorObject(s))
      return s;
    const a = inputData(s, i, n, r);
    this._type = a.type, this._r = a.r, this._g = a.g, this._b = a.b, this._a = a.a, this._h = a.h, this._s = a.s, this._l = a.l, this._roundA = Math.round(100 * this._a) / 100;
  }
  toHex(e) {
    return rgbToHex(this._r, this._g, this._b, e);
  }
  toHexString(e) {
    return "#" + this.toHex(e);
  }
  toRgb() {
    return this._rgb === void 0 && (this._rgb = {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    }), lodash.clone(this._rgb);
  }
  toRgbString() {
    return this._a === 1 ? `rgb(${Utils.round(this._r, 0)}, ${Utils.round(
      this._g,
      0
    )}, ${Utils.round(this._b, 0)})` : `rgba(${Utils.round(this._r, 0)}, ${Utils.round(
      this._g,
      0
    )}, ${Utils.round(this._b, 0)}, ${this._roundA})`;
  }
  toHsl() {
    return this._hsl === void 0 && (this._hsl = {
      h: this.h,
      s: this.s,
      l: this.l,
      a: this.a
    }), lodash.clone(this._hsl);
  }
  toHusl() {
    if (this._husl === void 0) {
      const e = [this.r / 255, this.g / 255, this.b / 255], i = rgbToHsluv(e);
      this._husl = { h: i[0], s: i[1], l: i[2] };
    }
    return lodash.clone(this._husl);
  }
  toHslString() {
    if (this._hslString === void 0) {
      const e = this.toHsl(), i = Math.round(e.h), n = Math.round(e.s * 100), r = Math.round(e.l * 100);
      this._a === 1 ? this._hslString = `hsl(${i}, ${n}%, ${r}%)` : this._hslString = `hsla(${i}, ${n}%, ${r}%, ${this._roundA})`;
    }
    return this._hslString;
  }
  toName() {
    if (this._a === 0)
      return "transparent";
    if (this._a < 1)
      return !1;
    const e = rgbToHex(this._r, this._g, this._b, !0);
    for (var i of Array.from(lodash.keys(cssNames))) {
      var n = cssNames[i];
      if (n === e)
        return i;
    }
    return !1;
  }
  lighten(e) {
    e == null && (e = 10);
    const i = this.toHsl();
    return i.l += e / 100, i.l = Math.min(1, Math.max(0, i.l)), new P(i);
  }
  brighten(e) {
    e == null && (e = 10);
    const i = this.toRgb();
    return i.r = Math.max(
      0,
      Math.min(255, i.r - Math.round(255 * -(e / 100)))
    ), i.g = Math.max(
      0,
      Math.min(255, i.g - Math.round(255 * -(e / 100)))
    ), i.b = Math.max(
      0,
      Math.min(255, i.b - Math.round(255 * -(e / 100)))
    ), new P(i);
  }
  darken(e) {
    e == null && (e = 10);
    const i = this.toHsl();
    return i.l -= e / 100, i.l = Math.min(1, Math.max(0, i.l)), new P(i);
  }
  desaturate(e) {
    e == null && (e = 10);
    const i = this.toHsl();
    return i.s -= e / 100, i.s = Math.min(1, Math.max(0, i.s)), new P(i);
  }
  saturate(e) {
    e == null && (e = 10);
    const i = this.toHsl();
    return i.s += e / 100, i.s = Math.min(1, Math.max(0, i.s)), new P(i);
  }
  grayscale() {
    const e = this.toHsl();
    return new P(e).desaturate(100);
  }
  toString() {
    return this.toRgbString();
  }
  alpha(e) {
    return e == null && (e = 1), new P({
      r: this.r,
      g: this.g,
      b: this.b,
      a: e
    });
  }
  multiplyAlpha(e) {
    return this.alpha(this.a * e);
  }
  transparent() {
    return this.alpha(0);
  }
  mix(e, i, n, r) {
    return n == null && (n = !1), P.mix(this, e, i, n, r);
  }
  copy() {
    return new P(this);
  }
  isEqual(e) {
    return P.equal(this, e);
  }
  toInspect() {
    return this._type === ColorType.HSL ? `<${this.constructor.name} h:${this.h} s:${this.s} l:${this.l} a:${this.a}>` : this._type === ColorType.HEX || this._type === ColorType.NAME ? `<${this.constructor.name} "${this.color}">` : `<${this.constructor.name} r:${this.r} g:${this.g} b:${this.b} a:${this.a}>`;
  }
  //#############################################################
  //# Class methods
  static mix(e, i, n, r, s) {
    n == null && (n = 0.5), r == null && (r = !1);
    let a = null;
    if (typeof e == "string" && this.isColorString(e) && (e = new P(e)), typeof i == "string" && this.isColorString(i) && (i = new P(i)), !(e instanceof P) && i instanceof P || e instanceof P && e._a === 0 && i instanceof P && i._a !== 0 ? e = i.transparent() : (!(i instanceof P) && e instanceof P || i instanceof P && i._a === 0 && e instanceof P && e._a !== 0) && (i = e.transparent()), i instanceof P)
      if (ColorModel.isRGB(s))
        a = new P({
          r: Utils.modulate(n, [0, 1], [e._r, i._r], r),
          g: Utils.modulate(n, [0, 1], [e._g, i._g], r),
          b: Utils.modulate(n, [0, 1], [e._b, i._b], r),
          a: Utils.modulate(n, [0, 1], [e._a, i._a], r)
        });
      else {
        let o, l;
        ColorModel.isHSL(s) ? (o = e.toHsl(), l = i.toHsl()) : (o = e.toHusl(), l = i.toHusl()), o.s === 0 ? o.h = l.h : l.s === 0 && (l.h = o.h);
        const u = o.h, c = l.h;
        let f = c - u;
        f > 180 ? f = c - 360 - u : f < -180 && (f = c + 360 - u);
        const p = {
          h: Utils.modulate(n, [0, 1], [u, u + f], r),
          s: Utils.modulate(n, [0, 1], [o.s, l.s], r),
          l: Utils.modulate(n, [0, 1], [o.l, l.l], r),
          a: Utils.modulate(n, [0, 1], [e.a, i.a], r)
        };
        ColorModel.isHSL(s) ? a = new P(p) : a = new P(rgbaFromHusl(p));
      }
    return a;
  }
  static random(e) {
    e == null && (e = 1);
    const i = () => parseInt(Math.random() * 255);
    return new P(`rgba(${i()}, ${i()}, ${i()}, ${e})`);
  }
  static grey(e, i) {
    return e == null && (e = 0.5), i == null && (i = 1), e = parseInt(e * 255), new P(`rgba(${e}, ${e}, ${e}, ${i})`);
  }
  static gray(...e) {
    return this.grey(...Array.from(e || []));
  }
  static toColor(e) {
    return new P(e);
  }
  static validColorValue(e) {
    return e instanceof P || e === null;
  }
  static isColorObject(e) {
    return e instanceof P;
  }
  static isColorString(e) {
    return lodash.isString(e) ? stringToObject(e) !== !1 : !1;
  }
  static isValidColorProperty(e, i) {
    return !!((lodash.endsWith(e.toLowerCase(), "color") || ["fill", "stroke"].includes(e)) && lodash.isString(i) && P.isColorString(i));
  }
  static equal(e, i) {
    if (!this.validColorValue(e) && !P.isColorString(e) || !this.validColorValue(i) && !P.isColorString(i))
      return !1;
    e = new P(e), i = new P(i);
    const n = 0.01;
    return !(Math.abs(e.r - i.r) >= n || Math.abs(e.g - i.g) >= n || Math.abs(e.b - i.b) >= n || Math.abs(e.a - i.a) >= n);
  }
  static rgbToHsl(e, i, n) {
    return rgbToHsl(e, i, n);
  }
};
var ColorModel = {
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla"
};
ColorModel.isRGB = function(t) {
  if (lodash.isString(t)) {
    let e;
    return e = t.toLowerCase(), [ColorModel.RGB, ColorModel.RGBA].includes(e);
  }
  return !1;
};
ColorModel.isHSL = function(t) {
  if (lodash.isString(t)) {
    let e;
    return e = t.toLowerCase(), [ColorModel.HSL, ColorModel.HSLA].includes(e);
  }
  return !1;
};
const rgbaFromHusl = (t) => {
  const e = t.hsluvToRgb([t.h, t.s, t.l]);
  return {
    r: e[0] * 255,
    g: e[1] * 255,
    b: e[2] * 255,
    a: t.a
    // keep alpha if it exists
  };
};
var inputData = function(t, e, i, n) {
  let r, s, a, o = { r: 0, g: 0, b: 0 }, l = { h: 0, s: 0, l: 0 }, u = 1, c = ColorType.RGB;
  return t === null ? u = 0 : lodash.isNumber(t) ? (o.r = t, lodash.isNumber(e) && (o.g = e), lodash.isNumber(i) && (o.b = i), lodash.isNumber(n) && (u = n)) : (typeof t == "string" && (t = stringToObject(t), t || (t = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  }), t.hasOwnProperty("type") && ({ type: c } = t)), typeof t == "object" && (t.hasOwnProperty("r") || t.hasOwnProperty("g") || t.hasOwnProperty("b") ? o = rgbToRgb(t.r, t.g, t.b) : (t.hasOwnProperty("h") || t.hasOwnProperty("s") || t.hasOwnProperty("l")) && (r = isNumeric(t.h) ? parseFloat(t.h) : 0, r = (r + 360) % 360, a = isNumeric(t.s) ? t.s : 1, lodash.isString(t.s) && (a = numberFromString(t.s)), s = isNumeric(t.l) ? t.l : 0.5, lodash.isString(t.l) && (s = numberFromString(t.l)), o = hslToRgb(r, a, s), c = ColorType.HSL, l = {
    h: r,
    s: a,
    l: s
  }), t.hasOwnProperty("a") && ({ a: u } = t))), u = correctAlpha(u), c !== ColorType.HSL && (l = rgbToHsl(o.r, o.g, o.b)), {
    type: c,
    r: Math.min(255, Math.max(o.r, 0)),
    g: Math.min(255, Math.max(o.g, 0)),
    b: Math.min(255, Math.max(o.b, 0)),
    h: Utils.clamp(l.h, 0, 360),
    s: Utils.clamp(l.s, 0, 1),
    l: Utils.clamp(l.l, 0, 1),
    a: u
  };
}, numberFromString = (t) => t.match(/\d+/)[0], rgbToRgb = (t, e, i) => ({
  r: isNumeric(t) ? bound01(t, 255) * 255 : 0,
  g: isNumeric(e) ? bound01(e, 255) * 255 : 0,
  b: isNumeric(i) ? bound01(i, 255) * 255 : 0
}), rgbToHex = function(t, e, i, n) {
  const r = [
    pad2(Math.round(t).toString(16)),
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(i).toString(16))
  ];
  return n && r[0].charAt(0) === r[0].charAt(1) && r[1].charAt(0) === r[1].charAt(1) && r[2].charAt(0) === r[2].charAt(1) ? r[0].charAt(0) + r[1].charAt(0) + r[2].charAt(0) : r.join("");
}, rgbToHsl = function(t, e, i) {
  let n, r;
  t = bound01(t, 255), e = bound01(e, 255), i = bound01(i, 255);
  const s = Math.max(t, e, i), a = Math.min(t, e, i);
  let o = r = n = (s + a) / 2;
  if (s === a)
    o = r = 0;
  else {
    const l = s - a;
    switch (r = n > 0.5 ? l / (2 - s - a) : l / (s + a), s) {
      case t:
        o = (e - i) / l + (e < i ? 6 : 0);
        break;
      case e:
        o = (i - t) / l + 2;
        break;
      case i:
        o = (t - e) / l + 4;
        break;
    }
    o /= 6;
  }
  return { h: o * 360, s: r, l: n };
}, hslToRgb = function(t, e, i) {
  let n, r, s;
  t = bound01(t, 360), e = bound01(e * 100, 100), i = bound01(i * 100, 100);
  const a = function(o, l, u) {
    return u < 0 && (u += 1), u > 1 && (u -= 1), u < 1 / 6 ? o + (l - o) * 6 * u : u < 1 / 2 ? l : u < 2 / 3 ? o + (l - o) * (2 / 3 - u) * 6 : o;
  };
  if (e === 0)
    n = r = s = i;
  else {
    const o = i < 0.5 ? i * (1 + e) : i + e - i * e, l = 2 * i - o;
    n = a(l, o, t + 1 / 3), r = a(l, o, t), s = a(l, o, t - 1 / 3);
  }
  return { r: n * 255, g: r * 255, b: s * 255 };
}, correctAlpha = function(t) {
  return t = parseFloat(t), t < 0 && (t = 0), (isNaN(t) || t > 1) && (t = 1), t;
}, bound01 = function(t, e) {
  isOnePointZero(t) && (t = "100%");
  const i = isPercentage(t);
  return t = Math.min(e, Math.max(0, parseFloat(t))), i && (t = parseInt(t * e, 10) / 100), Math.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e);
}, isOnePointZero = (t) => typeof t == "string" && t.indexOf(".") !== -1 && parseFloat(t) === 1, isPercentage = (t) => typeof t == "string" && t.indexOf("%") !== -1, pad2 = function(t) {
  return t.length === 1 ? "0" + t : "" + t;
};
const matchers = (function() {
  const i = "(?:" + "[-\\+]?\\d*\\.\\d+%?" + ")|(?:" + "[-\\+]?\\d+%?" + ")", n = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?", r = "[\\s|\\(]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")[,|\\s]+(" + i + ")\\s*\\)?";
  return {
    rgb: new RegExp("rgb" + n),
    rgba: new RegExp("rgba" + r),
    hsl: new RegExp("hsl" + n),
    hsla: new RegExp("hsla" + r),
    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
})();
var isNumeric = (t) => !isNaN(t) && isFinite(t);
const percentToFraction = (t) => numberFromString(t) / 100;
var stringToObject = function(t) {
  const e = /^[\s,#]+/, i = /\s+$/;
  if (t = t.replace(e, "").replace(i, "").toLowerCase(), cssNames[t])
    t = cssNames[t];
  else if (t === "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      type: ColorType.NAME
    };
  let n;
  return (n = matchers.rgb.exec(t)) ? {
    r: n[1],
    g: n[2],
    b: n[3]
  } : (n = matchers.rgba.exec(t)) ? {
    r: n[1],
    g: n[2],
    b: n[3],
    a: n[4]
  } : (n = matchers.hsl.exec(t)) ? {
    h: n[1],
    s: percentToFraction(n[2]),
    l: percentToFraction(n[3])
  } : (n = matchers.hsla.exec(t)) ? {
    h: n[1],
    s: percentToFraction(n[2]),
    l: percentToFraction(n[3]),
    a: n[4]
  } : (n = matchers.hex6.exec(t) || (n = matchers.hex6.exec(cssNames[t]))) ? {
    r: parseInt(n[1], 16),
    g: parseInt(n[2], 16),
    b: parseInt(n[3], 16),
    a: 1,
    type: ColorType.HEX
  } : (n = matchers.hex3.exec(t) || (n = matchers.hex3.exec(cssNames[t]))) ? {
    r: parseInt(n[1] + "" + n[1], 16),
    g: parseInt(n[2] + "" + n[2], 16),
    b: parseInt(n[3] + "" + n[3], 16),
    type: ColorType.HEX
  } : !1;
}, cssNames = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
Color$1.initClass();
let Gradient$1 = class V extends BaseClass {
  static initClass() {
    this.define("start", {
      get() {
        return this._start;
      },
      set(e) {
        this._start = new Color$1(e);
      }
    }), this.define("end", {
      get() {
        return this._end;
      },
      set(e) {
        this._end = new Color$1(e);
      }
    }), this.define("angle", {
      get() {
        return this._angle;
      },
      set(e) {
        lodash.isNumber(e) && (this._angle = e);
      }
    });
  }
  constructor(e = {}) {
    const i = {
      start: "black",
      end: "white",
      angle: 0
    };
    super({ ...i, ...e });
  }
  toCSS() {
    return `linear-gradient(${this.angle}deg, ${this.start}, ${this.end})`;
  }
  mix(e, i, n) {
    return V.mix(this, e, i, n);
  }
  isEqual(e) {
    return V.equal(this, e);
  }
  toInspect() {
    return `<${this.constructor.name} start:${this.start} end:${this.end} angle:${this.angle}>`;
  }
  static mix(e, i, n = 0.5, r) {
    n = Utils$1.clamp(n, 0, 1);
    const s = Color$1.mix(
      e.start,
      i.start,
      n,
      !1,
      r
    ), a = Color$1.mix(e.end, i.end, n, !1, r), o = e.angle + (i.angle - e.angle) * n;
    return new V({ start: s, end: a, angle: o });
  }
  static random() {
    const e = Math.random() * 360, i = new Color$1({ h: e }), n = new Color$1({ h: e + 40 });
    return new V({
      start: i,
      end: n,
      angle: Math.round(Math.random() * 360)
    });
  }
  static isGradient(e) {
    return !lodash.isEmpty(this._asPlainObject(e));
  }
  static isGradientObject(e) {
    return e instanceof V;
  }
  static equal(e, i) {
    if (!V.isGradient(e) || !V.isGradient(i)) return !1;
    const n = Math.abs(e.angle - i.angle) % 360 === 0, r = Color$1.equal(e.start, i.start), s = Color$1.equal(e.end, i.end);
    return n && r && s;
  }
  static multiplyAlpha(e, i) {
    return this.isGradientObject(e) || (e = new V(e)), new V({
      start: e.start.multiplyAlpha(i),
      end: e.end.multiplyAlpha(i),
      angle: e.angle
    });
  }
  static _asPlainObject(e) {
    return lodash.pick(e, ["start", "end", "angle"]);
  }
};
Gradient$1.initClass();
const Gestures = Object.freeze({
  // Tap
  Tap: "tap",
  TapStart: "tapstart",
  TapEnd: "tapend",
  DoubleTap: "doubletap",
  // Force Tap
  ForceTap: "forcetap",
  ForceTapChange: "forcetapchange",
  ForceTapStart: "forcetapstart",
  ForceTapEnd: "forcetapend",
  // Long Press
  LongPress: "longpress",
  LongPressStart: "longpressstart",
  LongPressEnd: "longpressend",
  // Swipe
  Swipe: "swipe",
  SwipeStart: "swipestart",
  SwipeEnd: "swipeend",
  SwipeUp: "swipeup",
  SwipeUpStart: "swipeupstart",
  SwipeUpEnd: "swipeupend",
  SwipeDown: "swipedown",
  SwipeDownStart: "swipedownstart",
  SwipeDownEnd: "swipedownend",
  SwipeLeft: "swipeleft",
  SwipeLeftStart: "swipeleftstart",
  SwipeLeftEnd: "swipeleftend",
  SwipeRight: "swiperight",
  SwipeRightStart: "swiperightstart",
  SwipeRightEnd: "swiperightend",
  // Edge Swipe
  EdgeSwipe: "edgeswipe",
  EdgeSwipeStart: "edgeswipestart",
  EdgeSwipeEnd: "edgeswipeend",
  EdgeSwipeTop: "edgeswipetop",
  EdgeSwipeTopStart: "edgeswipetopstart",
  EdgeSwipeTopEnd: "edgeswipetopend",
  EdgeSwipeRight: "edgeswiperight",
  EdgeSwipeRightStart: "edgeswiperightstart",
  EdgeSwipeRightEnd: "edgeswiperightend",
  EdgeSwipeBottom: "edgeswipebottom",
  EdgeSwipeBottomStart: "edgeswipebottomstart",
  EdgeSwipeBottomEnd: "edgeswipebottomend",
  EdgeSwipeLeft: "edgeswipeleft",
  EdgeSwipeLeftStart: "edgeswipeleftstart",
  EdgeSwipeLeftEnd: "edgeswipeleftend",
  // Pan
  Pan: "pan",
  PanStart: "panstart",
  PanEnd: "panend",
  PanLeft: "panleft",
  PanRight: "panright",
  PanUp: "panup",
  PanDown: "pandown",
  // Pinch
  Pinch: "pinch",
  PinchStart: "pinchstart",
  PinchEnd: "pinchend",
  // Scale
  Scale: "scale",
  ScaleStart: "scalestart",
  ScaleEnd: "scaleend",
  // Rotate
  Rotate: "rotate",
  RotateStart: "rotatestart",
  RotateEnd: "rotateend"
}), Events$5 = {
  // Standard DOM events
  MouseUp: "mouseup",
  MouseDown: "mousedown",
  MouseOver: "mouseover",
  MouseOut: "mouseout",
  MouseEnter: "mouseenter",
  MouseLeave: "mouseleave",
  MouseMove: "mousemove",
  MouseWheel: "mousewheel",
  DoubleClick: "dblclick",
  MouseDoubleClick: "dblclick"
  // Alias
}, supportsPointerEvents = window.onpointerdown === null && window.onpointermove === null && window.onpointerup === null;
Events$5.PointerUp = "pointerup";
Events$5.PointerDown = "pointerdown";
Events$5.PointerOver = "pointerover";
Events$5.PointerOut = "pointerout";
Events$5.PointerMove = "pointermove";
Events$5.enableEmulatedTouchEvents = (t = !0) => {
  supportsPointerEvents || (t ? (Events$5.TouchStart = Events$5.MouseDown, Events$5.TouchEnd = Events$5.MouseUp, Events$5.TouchMove = Events$5.MouseMove, Events$5.Click = "touchend") : (Events$5.TouchStart = "touchstart", Events$5.TouchEnd = "touchend", Events$5.TouchMove = "touchmove", Events$5.Click = Utils$1.isTouch() ? "touchend" : "mouseup"));
};
Events$5.enableEmulatedTouchEvents(!Utils$1.isTouch());
supportsPointerEvents && (Events$5.MouseUp = Events$5.PointerUp, Events$5.MouseDown = Events$5.PointerDown, Events$5.MouseOver = Events$5.PointerOver, Events$5.MouseOut = Events$5.PointerOut, Events$5.MouseMove = Events$5.PointerMove, Events$5.TouchStart = Events$5.PointerDown, Events$5.TouchEnd = Events$5.PointerUp, Events$5.TouchMove = Events$5.PointerMove, Events$5.Click = Events$5.PointerUp);
Events$5.AnimationStart = "start";
Events$5.AnimationHalt = "halt";
Events$5.AnimationStop = "stop";
Events$5.AnimationEnd = "end";
Events$5.AnimationDidStart = Events$5.AnimationStart;
Events$5.AnimationDidStop = Events$5.AnimationStop;
Events$5.AnimationDidEnd = Events$5.AnimationEnd;
Events$5.StateSwitchStart = "stateswitchstart";
Events$5.StateSwitchStop = "stateswitchstop";
Events$5.StateSwitchEnd = "stateswitchend";
Events$5.StateWillSwitch = Events$5.StateSwitchStart;
Events$5.StateDidSwitch = Events$5.StateSwitchEnd;
Events$5.Scroll = "scroll";
Events$5.ImageLoaded = "imageload";
Events$5.ImageLoadError = "imageerror";
Events$5.ImageLoadCancelled = "imagecancelled";
Events$5.DeviceOrientation = "deviceorientation";
Events$5.DeviceMotion = "devicemotion";
Object.assign(Events$5, Gestures);
Events$5.touchEvent = (t) => t.touches?.[0] ?? t.changedTouches?.[0] ?? t;
Events$5.wrap = (t) => Framer.CurrentContext.domEventManager.wrap(t);
Events$5.isGesture = (t) => Object.values(Gestures).includes(t);
const interactiveEvents = [
  ...Object.values(Gestures),
  Events$5.TouchStart,
  Events$5.TouchEnd,
  Events$5.MouseUp,
  Events$5.MouseDown,
  Events$5.MouseWheel,
  Events$5.DoubleClick
];
Events$5.isInteractive = (t) => interactiveEvents.includes(t);
const Originals = {
  Layer: {
    backgroundColor: "rgba(123, 123, 123, 0.5)",
    color: "white",
    borderColor: "rgba(123, 123, 123, 0.5)",
    width: 200,
    height: 200
  },
  Animation: {
    curve: "ease",
    // or "spring(400, 40, 0)"
    time: 1,
    repeat: 0,
    delay: 0,
    debug: !1,
    colorModel: "husl",
    animate: !0,
    looping: !1
  },
  Context: {
    perspective: 0,
    perspectiveOriginX: 0.5,
    perspectiveOriginY: 0.5,
    parent: null,
    name: null
  },
  DeviceComponent: {
    fullScreen: !1,
    padding: 50,
    deviceType: "apple-iphone-8-silver",
    deviceZoom: "fit",
    contentZoom: 1,
    orientation: "portrait",
    keyboard: !1,
    animationOptions: {
      time: 0.3,
      curve: "ease-in-out"
    }
  },
  LayerDraggable: {
    momentum: !0,
    momentumOptions: { friction: 2.1, tolerance: 1 },
    bounce: !0,
    bounceOptions: { friction: 40, tension: 200, tolerance: 1 },
    directionLock: !1,
    directionLockThreshold: { x: 10, y: 10 },
    overdrag: !0,
    overdragScale: 0.5,
    pixelAlign: !0,
    velocityTimeout: 100,
    velocityScale: 890
  },
  FrictionSimulator: { friction: 2, tolerance: 1 / 10 },
  Spring: { dampingRatio: 0.5, mass: 1, velocity: 0 },
  SpringSimulator: { tension: 500, friction: 10, tolerance: 1 / 1e4 },
  MomentumBounceSimulator: {
    momentum: { friction: 2, tolerance: 10 },
    bounce: { tension: 500, friction: 10, tolerance: 1 }
  },
  GridComponent: {
    rows: 3,
    columns: 3,
    spacing: 0,
    backgroundColor: "transparent"
  },
  ScrollComponent: {
    clip: !0,
    mouseWheelEnabled: !1,
    backgroundColor: null
  },
  Hints: { color: "rgba(144, 19, 254, 0.8)" },
  Shadow: {
    x: 0,
    y: 0,
    color: "rgba(123, 123, 123, 0.5)",
    type: "box",
    blur: 0,
    spread: 0
  }
}, Defaults = {
  getDefaults(t, e = {}) {
    if (!Originals[t] || !Framer.Defaults?.[t]) return {};
    const i = lodash.clone(e), n = lodash.cloneDeep(Originals[t]);
    for (const [r, s] of Object.entries(Framer.Defaults[t]))
      n[r] = lodash.isFunction(s) && !(t === "Animation" && r === "curve") ? s() : s;
    for (const [r, s] of Object.entries(n))
      i.hasOwnProperty(r) || (i[r] = s);
    return i;
  },
  setup() {
    if (window.FramerDefaults)
      for (const [t, e] of Object.entries(
        window.FramerDefaults
      ))
        Object.assign(Originals[t], e);
    return this.reset();
  },
  reset() {
    return window.Framer.Defaults = lodash.cloneDeep(Originals), window.Framer.Defaults;
  }
};
class SVG {
  static validFill(e) {
    return Color$1.validColorValue(e) || lodash.startsWith(e, "url(");
  }
  static toFill(e) {
    return lodash.startsWith(e, "url(") ? e : Color$1.toColor(e);
  }
  static updateGradientSVG(e) {
    if (e.__constructor)
      return;
    if (!Gradient.isGradient(e.gradient)) {
      e._elementGradientSVG != null && (e._elementGradientSVG.innerHTML = "");
      return;
    }
    e._elementGradientSVG || (e._elementGradientSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    ), e._element.appendChild(e._elementGradientSVG));
    const i = `gradient-${e.id}`;
    return e._elementGradientSVG.innerHTML = `<linearGradient id='${i}' gradientTransform='rotate(${e.gradient.angle - 90}, 0.5, 0.5)' >
	<stop offset="0" stop-color='#${e.gradient.start.toHex()}' stop-opacity='${e.gradient.start.a}' />
	<stop offset="1" stop-color='#${e.gradient.end.toHex()}' stop-opacity='${e.gradient.end.a}' />
</linearGradient>`, e.fill = `url(#${i})`;
  }
  static updateImagePatternSVG(e) {
    if (e.__constructor)
      return;
    if (!e.image) {
      e._elementImagePatternSVG != null && (e._elementImagePatternSVG.innerHTML = "");
      return;
    }
    let i = "";
    if (["fill", "fit", "contain", "cover"].includes(e.backgroundSize) && e.imageSize) {
      let r = 1, s = 1, a = 0, o = 0;
      const l = e.imageSize.width, u = e.imageSize.height, c = l / u, f = e.height * c, p = e.width / c, y = f / e.width, b = p / e.height, x = ["fill", "cover"].includes(
        e.backgroundSize
      );
      x && b > y || !x && b < y ? (s = b, o = (1 - b) / 2) : (r = y, a = (1 - y) / 2), i = `transform="translate(${a}, ${o}) scale(${r}, ${s})" `;
    }
    e._elementImagePatternSVG || (e._elementImagePatternSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    ), e._elementImagePatternSVG.setAttribute(
      "xmlns",
      "http://www.w3.org/2000/svg"
    ), e._elementImagePatternSVG.setAttribute(
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    ), e._elementImagePatternSVG.setAttribute("width", "100%"), e._elementImagePatternSVG.setAttribute("height", "100%"), e._element.appendChild(e._elementImagePatternSVG));
    const n = `image-pattern-${e.id}`;
    return e._elementImagePatternSVG.innerHTML = `<pattern id="${n}" width="100%" height="100%" patternContentUnits="objectBoundingBox">
	<image width="1" height="1" xlink:href=${e.image} preserveAspectRatio="none" ${i} />
</pattern>`, window.requestAnimationFrame(
      () => window.requestAnimationFrame(() => e.fill = `url(#${n})`)
    );
  }
  // Utils.delay 0.1, -> svgLayer.fill = "url(##{id})"
  static constructSVGElements(e, i, n, r) {
    const s = {};
    let a = [];
    if (i != null) {
      for (var o of Array.from(i))
        if (o instanceof SVGElement) {
          var l = o.getAttribute("name");
          if (l == null) {
            if (o instanceof SVGGElement) {
              var u = this.constructSVGElements(
                e,
                o.childNodes,
                n,
                r
              );
              lodash.extend(s, u.targets), a = a.concat(u.children);
              continue;
            }
            continue;
          }
          var c = {};
          if (c.name = l, c.parent = e, o instanceof SVGGElement) {
            var f = new r(o, c);
            a.push(f), lodash.extend(s, f.elements), o.id != null && o.id !== "" && (s[o.id] = f);
            continue;
          }
          if (o instanceof SVGPathElement || o instanceof SVGUseElement) {
            var p = new n(o, c);
            if (a.push(p), p._path.id != null && p._path.id !== "") {
              var { id: y } = p._path;
              s[y] = p;
            }
            continue;
          }
        }
    }
    return { targets: s, children: a };
  }
  static isPath(e) {
    return e instanceof Framer.SVGPath;
  }
}
class Animator {
  static initClass() {
  }
  constructor(e = {}) {
    this.setup(e);
  }
  setup(e) {
    throw new Error("Not implemented");
  }
  /**
   * Return the next value based on delta progress
   * Must be implemented by subclasses
   */
  next(e) {
    throw new Error("Not implemented");
  }
  finished() {
    throw new Error("Not implemented");
  }
  /**
   * Generate an array of values by repeatedly calling next()
   * @param {number} delta Time step per frame
   * @param {number} limit Maximum number of frames to calculate
   * @returns {Array} Array of values produced by next()
   */
  values(e = 1 / 60, i = 100) {
    const n = [];
    for (let r = 0; r <= i && (n.push(this.next(e)), !this.finished()); r++)
      ;
    return n;
  }
}
const BezierCurveDefaults = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1]
};
class BezierCurveAnimator extends Animator {
  constructor() {
    super(...arguments);
    F(this, "_time", 0);
    F(this, "options", {});
    F(this, "_unitBezier", null);
  }
  setup(i) {
    lodash.isString(i) && BezierCurveDefaults.hasOwnProperty(i.toLowerCase()) && (i = { values: BezierCurveDefaults[i.toLowerCase()] }), i.values && lodash.isString(i.values) && BezierCurveDefaults.hasOwnProperty(i.values.toLowerCase()) && (i = {
      values: BezierCurveDefaults[i.values.toLowerCase()],
      time: i.time
    }), lodash.isArray(i) && i.length === 4 && (i = { values: i }), this.options = lodash.defaults(i, {
      values: BezierCurveDefaults.ease,
      time: 1,
      precision: 1 / 1e3
    }), this._time = 0, this._unitBezier = new UnitBezier(...this.options.values);
  }
  next(i) {
    return this._time += i, this.finished() ? 1 : this._unitBezier.solve(this._time / this.options.time);
  }
  finished() {
    return this._time >= this.options.time - this.options.precision;
  }
}
class UnitBezier {
  // precision
  constructor(e, i, n, r) {
    F(this, "epsilon", 1e-6);
    this.cx = 3 * e, this.bx = 3 * (n - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * i, this.by = 3 * (r - i) - this.cy, this.ay = 1 - this.cy - this.by;
  }
  sampleCurveX(e) {
    return ((this.ax * e + this.bx) * e + this.cx) * e;
  }
  sampleCurveY(e) {
    return ((this.ay * e + this.by) * e + this.cy) * e;
  }
  sampleCurveDerivativeX(e) {
    return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
  }
  solveCurveX(e) {
    let i = e, n, r;
    for (let o = 0; o < 8; o++) {
      if (n = this.sampleCurveX(i) - e, Math.abs(n) < this.epsilon) return i;
      if (r = this.sampleCurveDerivativeX(i), Math.abs(r) < this.epsilon) break;
      i -= n / r;
    }
    let s = 0, a = 1;
    if (i = e, i < s) return s;
    if (i > a) return a;
    for (; s < a; ) {
      if (n = this.sampleCurveX(i), Math.abs(n - e) < this.epsilon) return i;
      e > n ? s = i : a = i, i = (a + s) / 2;
    }
    return i;
  }
  solve(e) {
    return this.sampleCurveY(this.solveCurveX(e));
  }
}
const epsilon = 1e-3, minDuration = 0.01, maxDuration = 10, minDamping = Number.MIN_VALUE, maxDamping = 1, approximateRoot = (t, e, i, n = 12) => {
  let r = i;
  for (let s = 1; s < n; s++)
    r -= t(r) / e(r);
  return r;
}, angularFrequency = (t, e) => t * Math.sqrt(1 - e ** 2), computeDampingRatio = (t, e, i = 1) => e / (2 * Math.sqrt(i * t)), computeDuration = (t, e, i = 0, n = 1) => {
  const r = computeDampingRatio(t, e, n), s = Math.sqrt(t / n);
  if (r >= 1) return null;
  const a = Math.sqrt(1 - r ** 2), o = i / (a * s), l = r / a, u = -((o - l) / epsilon);
  return u <= 0 ? null : Math.log(u) / (r * s);
}, computeDerivedCurveOptions = (t, e, i = 0, n = 1) => {
  t = Math.min(Math.max(t, minDamping), maxDamping), e = Math.min(Math.max(e, minDuration), maxDuration);
  let r, s;
  t < 1 ? (r = (u) => {
    const c = u * t, f = c * e, p = c - i, y = angularFrequency(u, t), b = Math.exp(-f);
    return epsilon - p / y * b;
  }, s = (u) => {
    const f = u * t * e, p = f * i + i, y = t ** 2 * u ** 2 * e, b = Math.exp(-f), x = angularFrequency(u ** 2, t);
    return (r(u) < epsilon ? 1 : -1) * (p - y) * b / x;
  }) : (r = (u) => {
    const c = Math.exp(-u * e), f = (u - i) * e + 1;
    return -epsilon + c * f;
  }, s = (u) => {
    const c = Math.exp(-u * e), f = (i - u) * e ** 2;
    return c * f;
  });
  const a = 5 / e, o = approximateRoot(r, s, a), l = {
    tension: 100,
    friction: 10,
    velocity: i
  };
  return isNaN(o) || (l.tension = o ** 2 * n, l.friction = t * 2 * Math.sqrt(n * l.tension)), l;
};
class Integrator {
  static initClass() {
  }
  constructor(e) {
    this._accelerationForState = e, lodash.isFunction(this._accelerationForState) || (console.warn(
      "Integrator: an integrator must be constructed with an acceleration function"
    ), this._accelerationForState = () => 0);
  }
  integrateState(e, i) {
    const n = this._evaluateState(e), r = this._evaluateStateWithDerivative(e, i * 0.5, n), s = this._evaluateStateWithDerivative(e, i * 0.5, r), a = this._evaluateStateWithDerivative(e, i, s), o = 1 / 6 * (n.dx + 2 * (r.dx + s.dx) + a.dx), l = 1 / 6 * (n.dv + 2 * (r.dv + s.dv) + a.dv);
    return e.x += o * i, e.v += l * i, e;
  }
  _evaluateState(e) {
    return {
      dx: e.v,
      dv: this._accelerationForState(e)
    };
  }
  _evaluateStateWithDerivative(e, i, n) {
    const r = {
      x: e.x + n.dx * i,
      v: e.v + n.dv * i
    };
    return {
      dx: r.v,
      dv: this._accelerationForState(r)
    };
  }
}
class SpringRK4Animator extends Animator {
  constructor(...i) {
    super(...i);
    F(this, "_time", 0);
    F(this, "_value", 0);
    F(this, "_velocity", 0);
    F(this, "_stopSpring", !1);
    F(this, "_integrator", null);
    F(this, "options", {});
    this.finished = this.finished.bind(this);
  }
  setup(i = {}) {
    this.options = lodash.defaults(i, {
      tension: 250,
      friction: 25,
      velocity: 0,
      tolerance: 1 / 1e3
    }), this._time = 0, this._value = 0, this._velocity = this.options.velocity, this._stopSpring = !1, this._integrator = new Integrator((n) => -this.options.tension * n.x - this.options.friction * n.v);
  }
  next(i) {
    if (this.finished()) return 1;
    this._time += i;
    const n = {
      x: this._value - 1,
      v: this._velocity
    }, r = this._integrator.integrateState(n, i);
    this._value = 1 + r.x, this._velocity = r.v;
    const s = Math.abs(r.x) < this.options.tolerance, a = Math.abs(r.v) < this.options.tolerance;
    return this._stopSpring = s && a, this._value;
  }
  finished() {
    return this._stopSpring;
  }
}
const Bezier = (...t) => function(e) {
  e == null && (e = {}), t.length > 0 && (e.values = t);
  const i = new BezierCurveAnimator();
  return i.setup(e), i;
}, BezierDefaults = {
  linear(t) {
    return t == null && (t = {}), Bezier(0, 0, 1, 1)(t);
  },
  ease(t) {
    return t == null && (t = {}), Bezier(0.25, 0.1, 0.25, 1)(t);
  },
  easeIn(t) {
    return t == null && (t = {}), Bezier(0.42, 0, 1, 1)(t);
  },
  easeOut(t) {
    return t == null && (t = {}), Bezier(0, 0, 0.58, 1)(t);
  },
  easeInOut(t) {
    return t == null && (t = {}), Bezier(0.42, 0, 0.58, 1)(t);
  }
}, Spring$1 = function(t, e, i) {
  let n = {};
  return t != null && lodash.isFinite(t) && (n.dampingRatio = t), e != null && (n.mass = e), i != null && (n.velocity = i), !lodash.isFinite(t) && typeof t == "object" && (n = t, n.damping != null && n.dampingRatio == null && (n.dampingRatio = n.damping)), n.tension == null && n.friction == null && (n = Defaults.getDefaults("Spring", n)), function(r) {
    let s;
    if (n.dampingRatio != null) {
      s = r?.time != null ? r?.time : 1;
      const o = computeDerivedCurveOptions(
        n.dampingRatio,
        s,
        n.velocity,
        n.mass
      );
      n = lodash.defaults(o, n);
    } else
      r != null && delete r.time;
    r = lodash.defaults(n, r);
    const a = new SpringRK4Animator();
    return a.setup(r), s != null && (a.time = s), a;
  };
};
lodash.assign(Bezier, BezierDefaults);
Spring$1.computeDerivedCurveOptions = computeDerivedCurveOptions;
Spring$1.computeDuration = computeDuration;
Spring$1.computeDampingRatio = computeDampingRatio;
const parseFunction = function(t) {
  let e;
  if (!lodash.isString(t))
    return null;
  let n = /.*(Spring|Bezier)(?:\(\s*{?([\w:\s,.]*)}?\s*\)|\.(\w+))?/.exec(t);
  if (n == null)
    return null;
  let [r, s, a, o] = Array.from(n);
  const l = { name: s, property: null, arguments: null };
  if (o != null)
    return l.property = o, l;
  if (a == null)
    return l;
  a.length === 0 && (l.arguments = []);
  const u = /\s*([\w]+)\s*:\s*([\d.]+)\s*,?/g, c = {};
  for (; n = u.exec(a); ) {
    let y;
    [r, y, e] = Array.from(n), e = parseFloat(e), isNaN(e) || (c[y] = e);
  }
  if (lodash.size(c) > 0)
    return l.arguments = c, l;
  const f = /\s*([.\d]+)\s*/g, p = [];
  for (; n = f.exec(a); )
    [r, e] = Array.from(n), e = parseFloat(e), p.push(e);
  return l.arguments = p, l;
}, fromDefinition = function(t) {
  if (t == null)
    return null;
  const e = Framer.Curves[t.name];
  return e == null ? null : t.property != null ? e[t.property] : t.arguments == null ? e : lodash.isArray(t.arguments) ? e(...Array.from(t.arguments || [])) : e(t.arguments);
}, fromString = (t) => {
  if (!lodash.isString(t))
    return null;
  let e = fromDefinition(parseFunction(t));
  if (e != null)
    return e;
  e = Utils.parseFunction(t);
  const i = e.args.map(parseFloat);
  switch (e.name) {
    case "linear":
      return Bezier.linear;
    case "ease":
      return Bezier.ease;
    case "ease-in":
      return Bezier.easeIn;
    case "ease-out":
      return Bezier.easeOut;
    case "ease-in-out":
      return Bezier.easeInOut;
    case "bezier-curve":
    case "cubic-bezier":
      return Bezier(...Array.from(i || []));
    case "spring":
    case "spring-rk4":
    case "spring-dho":
      var n = lodash.zipWith(
        ["tension", "friction", "velocity", "tolerance"],
        i,
        [250, 25, 0, 1 / 100],
        (s, a, o) => [s, a ?? o]
      ), r = lodash.fromPairs(n);
      return Spring$1(r);
    default:
      return Bezier.linear;
  }
}, Curves = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bezier,
  Spring: Spring$1,
  fromDefinition,
  fromString,
  parseFunction
}, Symbol.toStringTag, { value: "Module" })), numberRE = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/, relativePropertyRE = new RegExp(
  `^(?:([+-])=|)(${numberRE.source})([a-z%]*)$`,
  "i"
), isRelativeProperty = (t) => lodash.isString(t) && relativePropertyRE.test(t), evaluateRelativeProperty = (t, e, i) => {
  const n = relativePropertyRE.exec(i);
  if (!n) return +i;
  const [, r, s, a] = n;
  return r ? t[e] + Number(r + 1) * Number(s) : +s;
};
let Animation$1 = class J extends BaseClass {
  static initClass() {
    this.define("layer", {
      get() {
        return this._layer;
      }
    }), this.define("isPending", {
      get() {
        return this._delayTimer != null;
      }
    }), this.define("isAnimating", {
      get() {
        let e;
        return e = this, Array.from(this.layer.animations()).includes(e);
      }
    }), this.define("looping", {
      get() {
        return this.options.looping;
      },
      set(e) {
        if (this.options != null && (this.options.looping = e), this.options != null && this.options.looping && this.layer != null && !this.isAnimating)
          return this.restart();
      }
    }), this.define("isNoop", this.simpleProperty("isNoop", !1));
  }
  constructor(...e) {
    let i = null, n = {}, r = {};
    if (arguments.length === 3 && (i = e[0], n = e[1], r = {}, n.options != null && (r = lodash.clone(n.options)), e[2] && (r = lodash.extend({}, r, e[2]))), arguments.length === 2 && (i = e[0], e[1].properties != null ? { properties: n } = e[1] : n = e[1], e[1].options != null && ({ options: r } = e[1])), arguments.length === 1 && ({ layer: i } = e[0], { properties: n } = e[0], e[0].options != null ? { options: r } = e[0] : r = e[0]), delete r.layer, delete r.properties, delete r.options, super(), this.start = this.start.bind(this), this._instant = this._instant.bind(this), this._noop = this._noop.bind(this), this._start = this._start.bind(this), this.finish = this.finish.bind(this), this._update = this._update.bind(this), this._prepareUpdateValues = this._prepareUpdateValues.bind(this), this._updateValues = this._updateValues.bind(this), this._updateNumberValue = this._updateNumberValue.bind(this), this._calculateNumericObjectValue = this._calculateNumericObjectValue.bind(this), this._updateNumericObjectValue = this._updateNumericObjectValue.bind(this), this._updateColorValue = this._updateColorValue.bind(this), this._updateGradientValue = this._updateGradientValue.bind(this), this._updateShadows = this._updateShadows.bind(this), this._updateTemplateValue = this._updateTemplateValue.bind(this), this.options = lodash.cloneDeep(Defaults.getDefaults("Animation", r)), this._layer = i, !(i instanceof _Layer))
      throw Error("Animation: missing layer");
    this.properties = J.filterAnimatableProperties(n, i), n.origin && console.warn(
      "Animation.origin: please use layer.originX and layer.originY"
    ), lodash.isString(this.options.curve) && (this.options.curve = fromString(this.options.curve)), (this.options.curve === Spring$1 || this.options.curve === Bezier) && (this.options.curve = this.options.curve.call()), this._originalState = this._currentState(), this._repeatCounter = this.options.repeat;
  }
  start() {
    let e, i, n;
    this._animator = this.options.curve(this.options), this._target = this.layer, this._stateA = this._currentState(), this._stateB = {};
    for (e in this.properties)
      n = this.properties[e], this._stateA[e] !== n && (lodash.isFunction(n) ? n = n(this.layer, e) : isRelativeProperty(n) && (n = evaluateRelativeProperty(this._target, e, n)), this._stateA[e] !== n && (this._stateB[e] = n));
    if (lodash.keys(this._stateA).length === 0)
      return console.warn("Animation: nothing to animate, no animatable properties"), this._noop();
    if (lodash.isEqual(this._stateA, this._stateB))
      return console.warn(
        "Animation: nothing to animate, all properties are equal to what it is now"
      ), this._noop();
    if (lodash.keys(this._stateB).length === 0)
      return this._noop();
    const r = this._target.animatingProperties();
    for (var s in r) {
      var a = r[s];
      this._stateA.hasOwnProperty(s) && a.stop(), s === "x" && (this._stateA.hasOwnProperty("minX") || this._stateA.hasOwnProperty("midX") || this._stateA.hasOwnProperty("maxX")) && a.stop(), s === "y" && (this._stateA.hasOwnProperty("minY") || this._stateA.hasOwnProperty("midY") || this._stateA.hasOwnProperty("maxY")) && a.stop();
    }
    if (this.options.debug) {
      console.log("Animation.start");
      for (e in this._stateB)
        n = this._stateB[e], console.log(`	${e}: ${this._stateA[e]} -> ${this._stateB[e]}`);
    }
    return lodash.isFunction(this.options.onStart) && this.on(Events.AnimationStart, this.options.onStart), lodash.isFunction(this.options.onHalt) && this.on(Events.AnimationHalt, this.options.onHalt), lodash.isFunction(this.options.onStop) && this.on(Events.AnimationStop, this.options.onStop), lodash.isFunction(this.options.onEnd) && this.on(Events.AnimationEnd, this.options.onEnd), this.once("end", () => {
      if ((this._repeatCounter > 0 || this.looping) && (this.restart(), !this.looping))
        return this._repeatCounter--;
    }), this._prepareUpdateValues(), this.options.animate === !1 || this.options.instant === !0 ? i = this._instant : i = this._start, this.layer.context.addAnimation(this), this.options.delay ? this._delayTimer = Utils$1.delay(this.options.delay, i) : i(), !0;
  }
  stop(e) {
    return e == null && (e = !0), this._delayTimer != null && (Framer.CurrentContext.removeTimer(this._delayTimer), this._delayTimer = null), this.layer.context.removeAnimation(this), e && this.emit(Events.AnimationHalt), e && this.emit(Events.AnimationStop), Framer.Loop.off("update", this._update);
  }
  reverse() {
    const e = lodash.clone(this._originalState);
    for (var i in this.properties) {
      var n = this.properties[i];
      SVG.isPath(n) && (n.reversed = !n.reversed, e[i] = n);
    }
    const r = lodash.clone(this.options);
    return new J(this.layer, e, r);
  }
  reset() {
    return (() => {
      const e = [];
      for (var i in this._stateA) {
        var n = this._stateA[i];
        e.push(this._target[i] = n);
      }
      return e;
    })();
  }
  restart() {
    return this.reset(), this.start();
  }
  copy() {
    const e = lodash.clone(this.properties), i = lodash.clone(this.options);
    return new J(this.layer, e, i);
  }
  // A bunch of common aliases to minimize frustration
  revert() {
    return this.reverse();
  }
  inverse() {
    return this.reverse();
  }
  invert() {
    return this.reverse();
  }
  emit(e) {
    return super.emit(...arguments), this.layer.emit(e, this);
  }
  animatingProperties() {
    return lodash.keys(this._stateA);
  }
  _instant() {
    return this.emit(Events.AnimationStart), this._updateValues(1), this.emit(Events.AnimationStop), this.emit(Events.AnimationEnd);
  }
  _noop() {
    return this.isNoop = !0, !this.isNoop;
  }
  _start() {
    return this._delayTimer = null, this.emit(Events.AnimationStart), this._previousValue = 0, Framer.Loop.on("update", this._update);
  }
  finish() {
    return this.stop(), this._updateValues(1);
  }
  _update(e) {
    return this._animator.finished() ? (this._updateValues(1), this.stop(!1), this.emit(Events.AnimationStop), this.emit(Events.AnimationEnd)) : this._updateValues(this._animator.next(e));
  }
  _prepareUpdateValues() {
    return this._valueUpdaters = {}, (() => {
      const e = [];
      for (var i in this._stateB) {
        var n = this._stateB[i];
        if (SVG.isPath(n)) {
          var r = n, s = null;
          switch (i) {
            case "x":
            case "minX":
            case "midX":
            case "maxX":
            case "width":
              s = "horizontal";
              break;
            case "y":
            case "minY":
            case "midY":
            case "maxY":
            case "height":
              s = "vertical";
              break;
            case "rotation":
            case "rotationZ":
            case "rotationX":
            case "rotationY":
              s = "angle";
              break;
          }
          e.push(
            this._valueUpdaters[i] = r.valueUpdater(
              s,
              this._target,
              this._target[i]
            )
          );
        } else Color.isColorObject(n) || Color.isColorObject(this._stateA[i]) ? e.push(this._valueUpdaters[i] = this._updateColorValue) : Gradient.isGradient(n) || Gradient.isGradient(this._stateA[i]) ? (this._valueUpdaters[i] = this._updateGradientValue, e.push(
          this._stateA[i] != null ? this._stateA[i] : this._stateA[i] = Gradient.multiplyAlpha(n, 0)
        )) : i === "borderWidth" ? e.push(
          this._valueUpdaters[i] = this._updateNumericObjectValue.bind(
            this,
            ["top", "left", "bottom", "right"]
          )
        ) : i === "borderRadius" ? e.push(
          this._valueUpdaters[i] = this._updateNumericObjectValue.bind(
            this,
            ["topLeft", "topRight", "bottomRight", "bottomLeft"]
          )
        ) : i === "template" ? e.push(this._valueUpdaters[i] = this._updateTemplateValue) : i === "shadows" ? e.push(this._valueUpdaters[i] = this._updateShadows) : e.push(this._valueUpdaters[i] = this._updateNumberValue);
      }
      return e;
    })();
  }
  _updateValues(e) {
    const i = e - this._previousValue;
    this._previousValue = e;
    for (var n in this._stateB)
      this._stateB[n], this._valueUpdaters[n](n, e, i);
    return null;
  }
  _updateNumberValue(e, i) {
    return this._target[e] = Utils$1.mapRange(
      i,
      0,
      1,
      this._stateA[e],
      this._stateB[e]
    );
  }
  _interpolateNumericObjectValues(e, i, n, r, s) {
    s == null && (s = !0);
    let a = {};
    for (var o of Array.from(e)) {
      var l = lodash.isNumber(i) ? i : i?.[o], u = lodash.isNumber(n) ? n : n?.[o];
      l == null && (l = u), u == null && (u = l), a[o] = Utils$1.mapRange(r, 0, 1, l, u);
    }
    return s && lodash.uniq(lodash.values(a)).length === 1 && (a = a[e[0]]), a;
  }
  _calculateNumericObjectValue(e, i, n, r) {
    r == null && (r = !0);
    const s = this._stateA[i], a = this._stateB[i];
    return this._interpolateNumericObjectValues(
      e,
      s,
      a,
      n,
      r
    );
  }
  _updateNumericObjectValue(e, i, n, r) {
    r == null && (r = !0);
    const s = this._calculateNumericObjectValue(
      e,
      i,
      n,
      r
    );
    return this._target[i] = s;
  }
  _updateColorValue(e, i) {
    return this._target[e] = Color.mix(
      this._stateA[e],
      this._stateB[e],
      i,
      !1,
      this.options.colorModel
    );
  }
  _updateGradientValue(e, i) {
    if (!this._stateB[e] && i === 1) {
      this._target[e] = this._stateB[e];
      return;
    }
    const n = Gradient._asPlainObject(this._stateA[e]), r = Gradient._asPlainObject(
      this._stateB[e] != null ? this._stateB[e] : Gradient.multiplyAlpha(n, 0)
    );
    return this._target[e] = Gradient.mix(
      lodash.defaults(n, r),
      lodash.defaults(r, n),
      i,
      this.options.colorModel
    );
  }
  _updateShadows(e, i) {
    if (i === 1) {
      this._target[e] = this._stateB[e];
      return;
    }
    const n = [], r = Math.max(
      (this._stateA[e] != null ? this._stateA[e].length : void 0) != null ? this._stateA[e] != null ? this._stateA[e].length : void 0 : 0,
      (this._stateB[e] != null ? this._stateB[e].length : void 0) != null ? this._stateB[e] != null ? this._stateB[e].length : void 0 : 0
    );
    for (let u = 0, c = r, f = 0 <= c; f ? u < c : u > c; f ? u++ : u--) {
      var s, a = this._stateA[e] != null ? this._stateA[e][u] : void 0, o = this._stateB[e] != null ? this._stateB[e][u] : void 0;
      if (!(o == null && a == null)) {
        var l = (s = o?.type != null ? o?.type : a?.type) != null ? s : Framer.Defaults.Shadow.type;
        a == null && (a = lodash.defaults({ color: null, type: l }, Framer.Defaults.Shadow)), o == null && (o = lodash.defaults({ color: null, type: l }, Framer.Defaults.Shadow)), lodash.defaults(a, Framer.Defaults.Shadow), lodash.defaults(o, Framer.Defaults.Shadow), n[u] = this._interpolateNumericObjectValues(
          ["x", "y", "blur", "spread"],
          a,
          o,
          i,
          !1
        ), n[u].color = Color.mix(
          a.color,
          o.color,
          i,
          !1,
          this.options.colorModel
        ), n[u].type = l;
      }
    }
    return this._target[e] = n;
  }
  // shallow mix all end state `{key: value}`s if `value` is a number, otherwise just takes `value`
  _updateTemplateValue(e, i) {
    let n, r, s;
    const a = this._stateA[e], o = this._stateB[e], l = {};
    if (!lodash.isObject(o)) {
      if (n = this._target._styledText != null ? this._target._styledText.buildTemplate() : void 0, !n)
        return;
      s = o, lodash.isNumber(s) && (r = lodash.isObject(a) ? a[n] : a, lodash.isNumber(r) || (r = 0), s = Utils$1.mapRange(i, 0, 1, r, s)), l[n] = s, this._target.template = l;
      return;
    }
    for (n in o)
      s = o[n], lodash.isNumber(s) && (r = lodash.isObject(a) ? a[n] : a, lodash.isNumber(r) || (r = 0), s = Utils$1.mapRange(i, 0, 1, r, s)), l[n] = s;
    return this._target.template = l;
  }
  _currentState() {
    return lodash.pick(this.layer, lodash.keys(this.properties));
  }
  static isAnimatable(e) {
    return lodash.isNumber(e) || lodash.isFunction(e) || isRelativeProperty(e) || Color.isColorObject(e) || Gradient.isGradientObject(e) || SVG.isPath(e);
  }
  // Special cases that animate with different types of objects
  static isAnimatableKey(e) {
    return [
      "gradient",
      "borderWidth",
      "borderRadius",
      "template",
      "shadows"
    ].includes(e);
  }
  static filterAnimatableProperties(e, i) {
    const n = {};
    for (var r in e) {
      var s, a = e[r];
      if (["frame", "size", "point", "midPoint", "path"].includes(r)) {
        var o, l;
        switch (r) {
          case "frame":
            l = ["x", "y", "width", "height"];
            break;
          case "size":
            l = ["width", "height"];
            break;
          case "point":
            l = ["x", "y"];
            break;
          case "midPoint":
            l = ["midX", "midY"];
            break;
          case "path":
            l = ["x", "y", "rotation"];
            break;
          default:
            l = [];
        }
        if (SVG.isPath(a)) {
          r === "path" && (i.midPoint = a.start);
          for (o of Array.from(l))
            n[o] = a;
        } else if (lodash.isObject(a))
          lodash.defaults(n, lodash.pick(a, l));
        else if (lodash.isNumber(a))
          for (o of Array.from(l))
            n[o] = a;
      } else if (this.isAnimatable(a))
        n[r] = a;
      else if (Color.isValidColorProperty(r, a))
        n[r] = new Color(a);
      else if (this.isAnimatableKey(r))
        n[r] = a;
      else if (s = r.match(/^shadow([1-9])$/)) {
        if (n.shadows == null) {
          var u;
          n.shadows = (u = lodash.clone(i.shadows)) != null ? u : [];
        }
        var c = parseInt(s[1]) - 1;
        n.shadows[c] != null && lodash.defaults(a, n.shadows[c]), n.shadows[c] = a;
      }
    }
    return n;
  }
  toInspect() {
    return `<${this.constructor.name} id:${this.id} layer:${this.layer != null ? this.layer.toName() : void 0} [${lodash.keys(this.properties).join(", ")}] isAnimating:${this.isAnimating}>`;
  }
  //#############################################################
  //# EVENT HELPERS
  onAnimationStart(e) {
    return this.on(Events.AnimationStart, e);
  }
  onAnimationHalt(e) {
    return this.on(Events.AnimationHalt, e);
  }
  onAnimationStop(e) {
    return this.on(Events.AnimationStop, e);
  }
  onAnimationEnd(e) {
    return this.on(Events.AnimationEnd, e);
  }
  onAnimationDidStart(e) {
    return this.on(Events.AnimationDidStart, e);
  }
  onAnimationDidStop(e) {
    return this.on(Events.AnimationDidStop, e);
  }
  onAnimationDidEnd(e) {
    return this.on(Events.AnimationDidEnd, e);
  }
};
Animation$1.initClass();
const filterFormat = function(t, e, i, n) {
  return i === "px" && (e *= n), `${t}(${Utils.round(e, 2)}${i})`;
}, roundToZero = function(t) {
  return -1e-6 < t && t < 1e-6 ? 0 : t;
}, _WebkitProperties = [
  ["blur", "blur", 0, "px"],
  ["brightness", "brightness", 100, "%"],
  ["saturate", "saturate", 100, "%"],
  ["hue-rotate", "hueRotate", 0, "deg"],
  ["contrast", "contrast", 100, "%"],
  ["invert", "invert", 0, "%"],
  ["grayscale", "grayscale", 0, "%"],
  ["sepia", "sepia", 0, "%"]
], _BackdropProperties = [
  ["blur", "backgroundBlur", 0, "px"],
  ["brightness", "backgroundBrightness", 100, "%"],
  ["saturate", "backgroundSaturate", 100, "%"],
  ["hue-rotate", "backgroundHueRotate", 0, "deg"],
  ["contrast", "backgroundContrast", 100, "%"],
  ["invert", "backgroundInvert", 0, "%"],
  ["grayscale", "backgroundGrayscale", 0, "%"],
  ["sepia", "backgroundSepia", 0, "%"]
], _Force2DProperties = {
  z: 0,
  scaleZ: 1,
  skewX: 0,
  skewY: 0,
  rotationX: 0,
  rotationY: 0
}, getShadowStrings = function(t, e, i) {
  _.isArray(e) || (e = [e]);
  const n = [];
  if (t.shadows != null) {
    for (var r of Array.from(t.shadows))
      if (r !== null && (r = _.defaults(_.clone(r), Framer.Defaults.Shadow), r.type === "inner" ? r.type = "inset" : r.type === "outer" && (t.image != null && t.image !== "" ? r.type = "drop" : r.type = "box"), !(!Array.from(e).includes(r.type) || r.x === 0 && r.y === 0 && r.blur === 0 && r.spread === 0))) {
        r.color === null && (r.color = new Color(null));
        var s = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier, a = i(r, s);
        n.push(a);
      }
  }
  return n;
}, LayerStyle = {
  width(t) {
    t._updateHTMLScale();
    const e = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return t._properties.width * e + "px";
  },
  height(t) {
    t._updateHTMLScale();
    const e = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return t._properties.height * e + "px";
  },
  display(t) {
    return t._properties.visible === !0 ? "block" : "none";
  },
  opacity(t) {
    return t._properties.opacity;
  },
  webkitTransformStyle(t) {
    return t._properties.flat ? "flat" : "preserve-3d";
  },
  webkitBackfaceVisibility(t) {
    return t._properties.backfaceVisible ? "visible" : "hidden";
  },
  overflow(t) {
    return t._properties.scrollHorizontal === !0 || t._properties.scrollVertical === !0 ? "auto" : t._properties.clip === !0 ? "hidden" : "visible";
  },
  overflowX(t) {
    return t._properties.scrollHorizontal === !0 ? "scroll" : t._properties.clip === !0 ? "hidden" : "visible";
  },
  overflowY(t) {
    return t._properties.scrollVertical === !0 ? "scroll" : t._properties.clip === !0 ? "hidden" : "visible";
  },
  zIndex(t) {
    return t._properties.index;
  },
  webkitFilter(t) {
    let e = [];
    const i = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    for (var [n, r, s, a] of Array.from(
      _WebkitProperties
    ))
      if (t._properties.hasOwnProperty(r) && t[r] !== s) {
        var o = filterFormat(n, t[r], a, i);
        e.push(o);
      }
    const l = getShadowStrings(
      t,
      "drop",
      (u, c) => `drop-shadow(${u.x * c}px ${u.y * c}px ${u.blur * c}px ${u.color})`
    );
    return e = e.concat(l), e.join(" ");
  },
  webkitBackdropFilter(t) {
    const e = [], i = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    for (var [n, r, s, a] of Array.from(
      _BackdropProperties
    ))
      if (t._properties.hasOwnProperty(r) && t[r] !== s) {
        var o = filterFormat(n, t[r], a, i);
        e.push(o);
      }
    return e.join(" ");
  },
  webkitTransform(t) {
    if (t._prefer2d || t._properties.force2d)
      return LayerStyle.webkitTransformForce2d(t);
    const e = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return `translate3d( ${roundToZero(t._properties.x * e)}px, ${roundToZero(t._properties.y * e)}px, ${roundToZero(t._properties.z * e)}px) scale3d( ${roundToZero(t._properties.scaleX * t._properties.scale)}, ${roundToZero(t._properties.scaleY * t._properties.scale)}, ${roundToZero(t._properties.scaleZ)}) skew(${roundToZero(t._properties.skew)}deg,${roundToZero(
      t._properties.skew
    )}deg) skewX(${roundToZero(t._properties.skewX)}deg) skewY(${roundToZero(t._properties.skewY)}deg) translateZ(${roundToZero(t._properties.originZ * e)}px) rotateX(${roundToZero(t._properties.rotationX)}deg) rotateY(${roundToZero(t._properties.rotationY)}deg) rotateZ(${roundToZero(t._properties.rotationZ)}deg) translateZ(${roundToZero(-t._properties.originZ * e)}px)`;
  },
  webkitTransformForce2d(t) {
    const e = [];
    for (var i in _Force2DProperties) {
      var n = _Force2DProperties[i];
      t._properties[i] !== n && console.warn(
        `Layer property '${i}'' will be ignored with force2d enabled`
      );
    }
    const r = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return e.push(
      `translate(${roundToZero(t._properties.x * r)}px,${roundToZero(
        t._properties.y * r
      )}px)`
    ), e.push(
      `scale(${roundToZero(
        t._properties.scaleX * t._properties.scale
      )},	${roundToZero(t._properties.scaleY * t._properties.scale)})`
    ), e.push(
      `skew(${roundToZero(t._properties.skew)}deg,${roundToZero(
        t._properties.skew
      )}deg)`
    ), e.push(`rotate(${roundToZero(t._properties.rotationZ)}deg)`), e.join(" ");
  },
  webkitTransformOrigin(t) {
    return `${t._properties.originX * 100}% ${t._properties.originY * 100}%`;
  },
  webkitPerspective(t) {
    let e;
    const i = (e = Utils.webkitPerspectiveForValue(t._properties.perspective)) != null ? e : "";
    if (_.isNumber(i)) {
      const n = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
      return `${i * n}`;
    } else
      return i;
  },
  webkitPerspectiveOrigin(t) {
    return `${t._properties.perspectiveOriginX * 100}% ${t._properties.perspectiveOriginY * 100}%`;
  },
  mixBlendMode(t) {
    let e;
    return e = t._properties.blending, Array.from(_.values(Blending)).includes(e) ? t._properties.blending : "";
  },
  pointerEvents(t) {
    return t._properties.ignoreEvents ? "none" : "auto";
  },
  boxShadow(t) {
    return getShadowStrings(
      t,
      ["box", "inset"],
      function(i, n) {
        return `${i.type === "inset" ? "inset " : ""}${i.x * n}px ${i.y * n}px ${i.blur * n}px ${i.spread * n}px ${i.color}`;
      }
    ).join(", ");
  },
  textShadow(t) {
    return getShadowStrings(
      t,
      "text",
      (i, n) => `${i.x * n}px ${i.y * n}px ${i.blur * n}px ${i.color}`
    ).join(", ");
  },
  backgroundColor(t) {
    return t._properties.backgroundColor;
  },
  backgroundSize(t) {
    switch (t._properties.backgroundSize) {
      case "fill":
        return "cover";
      case "fit":
        return "contain";
      case "stretch":
        return "100% 100%";
    }
    return t._properties.backgroundSize;
  },
  fill(t) {
    return t._properties.fill;
  },
  strokeWidth(t) {
    const e = t.strokeWidthMultiplier != null ? t.strokeWidthMultiplier : 1;
    return t._properties.strokeWidth * e;
  },
  strokeDasharray(t) {
    return t._properties.strokeDasharray.join(",");
  },
  color(t) {
    return t._properties.color;
  },
  borderRadius(t) {
    const e = t._properties.borderRadius, i = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return _.isNumber(e) ? e * i + "px" : _.isObject(t._properties.borderRadius) ? (e.topLeft != null ? e.topLeft : 0) * i + "px " + (e.topRight != null ? e.topRight : 0) * i + "px " + (e.bottomRight != null ? e.bottomRight : 0) * i + "px " + (e.bottomLeft != null ? e.bottomLeft : 0) * i + "px" : t._properties.borderRadius;
  },
  borderWidth(t) {
    let e;
    const { borderWidth: i } = t._properties, n = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    if (_.isNumber(i)) {
      let r;
      const s = ((e = Math.min(i, t.height / 2)) != null ? e : 0) * n, a = ((r = Math.min(i, t.width / 2)) != null ? r : 0) * n;
      return s + "px " + a + "px " + s + "px " + a + "px";
    }
    if (_.isObject(i)) {
      let r = i.top != null ? i.top : 0, s = i.bottom != null ? i.bottom : 0, a = i.left != null ? i.left : 0, o = i.right != null ? i.right : 0;
      if (r + s > t.height) {
        const l = r / (r + s);
        r = Math.round(l * t.height), s = t.height - r;
      }
      if (a + o > t.width) {
        const l = a / (a + o);
        a = Math.round(l * t.width), o = t.width - a;
      }
      return r * n + "px " + o * n + "px " + s * n + "px " + a * n + "px";
    }
    return i;
  },
  fontSize(t) {
    return t._properties.fontSize + "px";
  },
  letterSpacing(t) {
    return t._properties.letterSpacing + "px";
  },
  wordSpacing(t) {
    return t._properties.wordSpacing + "px";
  },
  textIndent(t) {
    return t._properties.textIndent + "px";
  },
  textAlign(t) {
    const e = t._properties.textAlign;
    return e === Align.left ? "left" : e === Align.center ? "center" : e === Align.right ? "right" : e;
  },
  direction(t) {
    const e = t._properties.direction;
    switch (e) {
      case "right-to-left":
        return "rtl";
      case "left-to-right":
        return "ltr";
      default:
        return e;
    }
  },
  padding(t) {
    const e = Utils.rectZero(Utils.parseRect(t.padding)), i = t._pixelMultiplierOverride != null ? t._pixelMultiplierOverride : t.context.pixelMultiplier;
    return `${e.top * i}px ${e.right * i}px ${e.bottom * i}px ${e.left * i}px`;
  }
};
class LayerStateMachine extends BaseClass {
  static initClass() {
    this.define("layer", {
      get() {
        return this._layer;
      }
    }), this.define("current", {
      get() {
        return this.currentName;
      }
    }), this.define("previous", {
      get() {
        return this.previousName;
      }
    }), this.define("currentName", {
      get() {
        return this._currentName;
      }
    }), this.define("previousName", {
      get() {
        return lodash.last(this._previousNames) || "default";
      }
    }), this.define("stateNames", {
      get() {
        return Object.keys(this.states);
      }
    }), this.define("states", {
      get() {
        return this._states;
      }
    });
  }
  constructor(e, i) {
    super(), this._layer = e, this._states = i, this.reset();
  }
  switchInstant(e) {
    return this.switchTo(e, { instant: !0 });
  }
  switchTo(e, i = {}) {
    if (!this.states[e])
      throw new Error(`No such state: '${e}'`);
    e === "previous" && (e = this.previousName);
    const n = { ...this.states[e] };
    let r = { ...i };
    n.animationOptions && (r = { ...n.animationOptions, ...r }, delete n.animationOptions);
    const s = this.currentName, a = e, o = r.start ?? !0;
    r.start = !1;
    const l = this.layer.animate(n, r);
    let u = !1;
    const c = () => {
      u || (u = !0, this._previousNames.push(s), this._currentName = a);
    }, f = () => {
      this.emit(Events$5.StateSwitchStart, s, a, this), c();
    }, p = () => {
      this.emit(Events$5.StateSwitchStop, s, a, this);
    }, y = () => {
      const b = lodash.difference(
        Object.keys(n),
        Object.keys(l.properties)
      );
      for (const x of b)
        this.layer[x] = n[x];
      this.emit(Events$5.StateSwitchEnd, s, a, this);
    };
    return l.on(Events$5.AnimationStart, f), l.on(Events$5.AnimationStop, p), l.on(Events$5.AnimationEnd, y), o && (l.start() || (f(), p(), y())), c(), l;
  }
  next(e = this.stateNames) {
    return Utils$1.arrayNext(e, this.currentName);
  }
  emit(...e) {
    return super.emit(...e), this._layer.emit(...e);
  }
  reset() {
    for (const e of Object.keys(this.states))
      e !== "default" && delete this.states[e];
    this._previousNames = [], this._currentName = "default";
  }
  toInspect() {
    return `<${this.constructor.name} id:${this.id} layer:${this.layer.id} current:'${this.currentName}'>`;
  }
}
LayerStateMachine.initClass();
const LayerStatesIgnoredKeys = ["ignoreEvents", "name", "id"], reservedStateError = function(t) {
  throw Error(`The state '${t}' is a reserved name.`);
}, deprecatedWarning = function(t, e) {
  let i = `layer.states.${t} is deprecated`;
  return e != null && (i += `, use '${e}' instead.`), console.warn(i);
}, namedState = (t, e) => lodash.extend({}, { name: e }, t);
let capture, methods;
class LayerStatesClass {
  static initClass() {
    this.defineReserved("previous", {
      get() {
        return namedState(
          this[this.machine.previousName],
          this.machine.previousName
        );
      }
    }), this.defineReserved("current", {
      get() {
        return namedState(
          this[this.machine.currentName],
          this.machine.currentName
        );
      }
    }), capture = function(e) {
      return this[e] = LayerStatesClass.filterStateProperties(
        this.machine.layer.props
      );
    }, this.defineReserved("capture", {
      get() {
        return capture;
      }
    }), methods = {
      add(e, i) {
        return i == null && (i = {}), deprecatedWarning("add", "layer.states = "), lodash.isString(e) ? this[e] = i : this.machine.layer.states = e;
      },
      remove(e) {
        return deprecatedWarning("remove", "delete layer.states.a"), delete this[e];
      },
      switch(e, i) {
        return deprecatedWarning("switch", 'layer.animate("state")'), this.machine.switchTo(e, i);
      },
      switchInstant(e) {
        return deprecatedWarning(
          "switchInstant",
          'layer.animate("state", {instant: true})'
        ), this.machine.switchTo(e, { instant: !0 });
      },
      next(...e) {
        return deprecatedWarning("next", "layer.stateCycle()"), e = lodash.flatten(e), this.machine.layer.stateCycle(e);
      }
    }, this.defineReserved("add", {
      get() {
        return methods.add;
      }
    }), this.defineReserved("remove", {
      get() {
        return methods.remove;
      }
    }), this.defineReserved("switch", {
      get() {
        return methods.switch;
      }
    }), this.defineReserved("switchInstant", {
      get() {
        return methods.switchInstant;
      }
    }), this.defineReserved("next", {
      get() {
        return methods.next;
      }
    }), this.defineReserved("animationOptions", {
      get() {
        return this.machine.layer.animationOptions;
      },
      set(e) {
        return this.machine.layer.animationOptions = e;
      }
    });
  }
  static defineReserved(e, i) {
    return i.configurable = !0, i.enumerable == null && (i.enumerable = !1), i.set == null && (i.set = () => reservedStateError(e)), Object.defineProperty(this.prototype, e, i);
  }
  constructor(e) {
    const i = new LayerStateMachine(e, this);
    Object.defineProperty(this, "machine", {
      enumerable: !1,
      configurable: !1,
      get() {
        return i;
      },
      set() {
        return reservedStateError("machine");
      }
    }), this.capture("default");
  }
  static filterStateProperties(e) {
    const i = {};
    for (const n in e) {
      const r = e[n];
      if (!Array.from(LayerStatesIgnoredKeys).includes(n)) {
        if (Color.isValidColorProperty(n, r)) {
          i[n] = new Color(r);
          continue;
        }
        if (Gradient.isGradient(r)) {
          i[n] = r;
          continue;
        }
        this._isValidProperty(n, r) && (i[n] = r);
      }
    }
    return i;
  }
  static _isValidProperty(e, i) {
    return !!(lodash.isNumber(i) || lodash.isFunction(i) || lodash.isBoolean(i) || lodash.isString(i) || Color.isColorObject(i) || Gradient.isGradient(i) || i === null || __guard__$4(i?.constructor, (n) => n.name) === "Layer" || ["template", "shadows"].includes(e));
  }
}
LayerStatesClass.initClass();
const LayerStates = LayerStatesClass;
function __guard__$4(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
class Simulator extends BaseClass {
  static initClass() {
    this.define("state", {
      get() {
        return lodash.clone(this._state);
      },
      set(e) {
        return this._state = lodash.clone(e);
      }
    });
  }
  constructor(e) {
    super(), e == null && (e = {}), this._state = { x: 0, v: 0 }, this.options = null, this.setup(e);
  }
  setup(e) {
    throw Error("Not implemented");
  }
  next(e) {
    throw Error("Not implemented");
  }
  finished() {
    throw Error("Not implemented");
  }
  setState(e) {
    return this._state = e;
  }
}
class SpringSimulator extends Simulator {
  constructor(...e) {
    this.finished = this.finished.bind(this), super(...e);
  }
  setup(e) {
    return this.options = Defaults.getDefaults("SpringSimulator", e), this.options = _.defaults(e, {
      velocity: 0,
      position: 0,
      offset: 0
    }), this._state = {
      x: this.options.position,
      v: this.options.velocity
    }, this._integrator = new Integrator((i) => -this.options.tension * i.x - this.options.friction * i.v);
  }
  next(e) {
    return this._state = this._integrator.integrateState(this._state, e), this.getState();
  }
  finished() {
    const e = Math.abs(this._state.x) < this.options.tolerance, i = Math.abs(this._state.v) < this.options.tolerance;
    return e && i;
  }
  setState(e) {
    return this._state = {
      x: e.x - this.options.offset,
      v: e.v
    };
  }
  getState() {
    return {
      x: this._state.x + this.options.offset,
      v: this._state.v
    };
  }
}
class FrictionSimulator extends Simulator {
  constructor(...e) {
    this.finished = this.finished.bind(this), super(...e);
  }
  setup(e) {
    return this.options = Defaults.getDefaults("FrictionSimulator", e), this.options = _.defaults(e, {
      velocity: 0,
      position: 0
    }), this._state = {
      x: this.options.position,
      v: this.options.velocity
    }, this._integrator = new Integrator((i) => -(this.options.friction * i.v));
  }
  next(e) {
    return this._state = this._integrator.integrateState(this._state, e), this._state;
  }
  finished() {
    return Math.abs(this._state.v) < this.options.tolerance;
  }
}
class MomentumBounceSimulator extends Simulator {
  constructor(...e) {
    this.finished = this.finished.bind(this), super(...e);
  }
  setup(e) {
    return this.options = Defaults.getDefaults("MomentumBounceSimulator", e), this.options = _.defaults(e, {
      velocity: 0,
      position: 0,
      min: 0,
      max: 0
    }), this._frictionSimulator = new FrictionSimulator({
      friction: this.options.momentum.friction,
      tolerance: this.options.momentum.tolerance,
      velocity: this.options.velocity,
      position: this.options.position
    }), this._springSimulator = new SpringSimulator({
      tension: this.options.bounce.tension,
      friction: this.options.bounce.friction,
      tolerance: this.options.bounce.tolerance,
      velocity: this.options.velocity,
      position: this.options.position
    }), this._state = {
      x: this.options.position,
      v: this.options.velocity
    }, this._useSpring = !1;
  }
  next(e) {
    return this._useSpring ? this._state = this._springSimulator.next(e) : (this._state = this._frictionSimulator.next(e), this._tryTransitionToSpring(this._state)), this._state;
  }
  finished() {
    return this._useSpring ? this._springSimulator.finished() : this._frictionSimulator.finished();
  }
  setState(e) {
    if (this._state = {
      x: e.x,
      v: e.v
    }, this._frictionSimulator.setState(this._state), this._isValidState())
      return this._tryTransitionToSpring();
    {
      let i;
      return this._state.x <= this.options.min && (i = this.options.min), this._state.x >= this.options.max && (i = this.options.max), this._transitionToSpring(i);
    }
  }
  // If the position is outside the min and max bounds, and traveling
  // further away, then transition from friction to spring simulation
  _tryTransitionToSpring(e) {
    const i = this._state.x < this.options.min && this._state.v <= 0, n = this._state.x > this.options.max && this._state.v >= 0;
    if (i || n) {
      let r;
      return i && (r = this.options.min), n && (r = this.options.max), this._transitionToSpring(r);
    } else
      return this._useSpring = !1;
  }
  _transitionToSpring(e) {
    return this._useSpring = !0, this._springSimulator.options.offset = e, this._springSimulator.setState(this._state);
  }
  // If the position is outside the min and max bounds, but traveling
  // back towards the bounds, check if the velocity is sufficient to
  // carry the position back within bounds. If it is, let friction do the
  // work. If not, the state is invalid, so use the spring.
  _isValidState() {
    let e;
    const i = this._state.x < this.options.min && this._state.v > 0, n = this._state.x > this.options.max && this._state.v < 0;
    let r = !1;
    if (i ? (e = this.options.min, r = !0) : n && (e = this.options.max, r = !0), r) {
      const { friction: s } = this._frictionSimulator.options;
      return 1 - s * (e - this._state.x) / this._state.v > 0;
    }
    return !0;
  }
}
const Events$4 = {
  ...Events$5,
  SimulationStart: "simulationStart",
  SimulationStep: "simulationStep",
  SimulationStop: "simulationStop"
}, SimulatorClasses = {
  spring: SpringSimulator,
  friction: FrictionSimulator,
  "inertial-scroll": MomentumBounceSimulator
};
class Simulation extends BaseClass {
  // Pass-through to simulator
  static initClass() {
    this.define("simulator", {
      get() {
        return this._simulator;
      }
    });
  }
  constructor(e = {}) {
    super(e), this.start = this.start.bind(this), this._start = this._start.bind(this), this._update = this._update.bind(this), this.options = {
      layer: null,
      properties: {},
      model: "spring",
      modelOptions: {},
      delay: 0,
      debug: !1,
      ...e
    }, this.layer = this.options.layer, this.properties = this.options.properties, this._running = !1;
    const i = SimulatorClasses[this.options.model] || SpringSimulator;
    this._simulator = new i(this.options.modelOptions);
  }
  animatingProperties() {
    return Object.keys(this.properties);
  }
  start() {
    if (!this.layer)
      return console.error("Simulation: missing layer"), !1;
    this.options.debug && console.log(
      `Simulation.start ${this._simulator.constructor.name}`,
      this.options.modelOptions
    );
    const e = this.animatingProperties(), i = this.layer.animatingProperties();
    for (const n in i)
      e.includes(n) && i[n].stop();
    return this.options.delay ? Utils$1.delay(this.options.delay, this._start) : this._start(), !0;
  }
  stop(e = !0) {
    if (this._running)
      return this._running = !1, this.layer.context.removeAnimation(this), e && this.emit(Events$4.SimulationStop), Framer.Loop.off("update", this._update);
  }
  emit(e, ...i) {
    super.emit(e, ...i), this.layer?.emit(e, this, ...i);
  }
  _start() {
    this._running || (this._running = !0, this.layer.context.addAnimation(this), this.emit(Events$4.SimulationStart), Framer.Loop.on("update", this._update));
  }
  _update(e) {
    if (this._simulator.finished())
      this.stop(!1), this.emit("end"), this.emit(Events$4.SimulationStop);
    else {
      const i = this._simulator.next(e);
      this.emit(Events$4.SimulationStep, i, e);
    }
  }
  finished() {
    return this._simulator.finished();
  }
}
Simulation.initClass();
const Events$3 = {
  ...Events$5,
  EventBufferReset: "eventbufferreset",
  EventBufferUpdated: "eventbufferupdated"
};
class EventBuffer extends BaseClass {
  constructor(e = {}) {
    super(), this.options = lodash.defaults(e, { velocityTimeout: 100 }), this._events = [];
  }
  // Computed properties
  get length() {
    return this._events.length;
  }
  get first() {
    return this._events[0];
  }
  get events() {
    const e = (Utils$1.getTime?.() ?? Date.now()) - this.options.velocityTimeout;
    return lodash.filter(this._events, (i) => i.t > e);
  }
  get offset() {
    const e = this.events;
    if (e.length < 2) return { x: 0, y: 0 };
    const i = e[e.length - 1], n = e[0];
    return {
      x: i.x - n.x,
      y: i.y - n.y
    };
  }
  get angle() {
    const e = this.events;
    if (e.length < 2) return 0;
    const i = e[0], n = e[1];
    return Math.atan2(n.y - i.y, n.x - i.x) * 180 / Math.PI;
  }
  get velocity() {
    const e = this.events;
    if (e.length < 2) return { x: 0, y: 0 };
    const i = e[e.length - 1], n = e[0], r = i.t - n.t;
    let s = {
      x: (i.x - n.x) / r,
      y: (i.y - n.y) / r
    };
    return isFinite(s.x) || (s.x = 0), isFinite(s.y) || (s.y = 0), s;
  }
  // Methods
  push(e) {
    this._events.push(e), this.emit(Events$3.EventBufferUpdated, e);
  }
  reset() {
    this._events.length = 0, this.emit(Events$3.EventBufferReset);
  }
  // Simple emit helper (if BaseClass doesn't already have it)
  emit(e, i) {
    typeof this.onEvent == "function" && this.onEvent(e, i);
  }
}
const Events$2 = {
  ...Events$5,
  // keep existing events
  Move: "move",
  DragStart: "dragstart",
  DragWillMove: "dragwillmove",
  DragMove: "dragmove",
  DragDidMove: "dragmove",
  Drag: "dragmove",
  DragEnd: "dragend",
  DragAnimationStart: "draganimationstart",
  DragAnimationEnd: "draganimationend",
  DirectionLockStart: "directionlockstart",
  // Special cases
  DragSessionStart: "dragsessionstart",
  DragSessionMove: "dragsessionmove",
  DragSessionEnd: "dragsessionend",
  // Deprecated aliases
  DragAnimationDidStart: "draganimationstart",
  DragAnimationDidEnd: "draganimationend",
  DirectionLockDidStart: "directionlockstart"
};
class LayerDraggable extends BaseClass {
  static initClass() {
    this._globalDidDrag = !1, this.define("speedX", this.simpleProperty("speedX", 1)), this.define("speedY", this.simpleProperty("speedY", 1)), this.define("horizontal", this.simpleProperty("horizontal", !0)), this.define("vertical", this.simpleProperty("vertical", !0)), this.define(
      "momentumVelocityMultiplier",
      this.simpleProperty("momentumVelocityMultiplier", 800)
    ), this.define("directionLock", this.simpleProperty("directionLock", !0)), this.define(
      "directionLockThreshold",
      this.simpleProperty("directionLockThreshold", { x: 10, y: 10 })
    ), this.define(
      "propagateEvents",
      this.simpleProperty("propagateEvents", !0)
    ), this.define("constraints", {
      get() {
        return this._constraints;
      },
      set(e) {
        if (e && lodash.isObject(e) ? (e = lodash.pick(e, ["x", "y", "width", "height"]), e = lodash.defaults(e, { x: 0, y: 0, width: 0, height: 0 }), this._constraints = e) : this._constraints = { x: 0, y: 0, width: 0, height: 0 }, this._constraints)
          return this._updateSimulationConstraints(this._constraints);
      }
    }), this.define("isDragging", {
      get() {
        return this._isDragging || !1;
      }
    }), this.define("isAnimating", {
      get() {
        return this._isAnimating || !1;
      }
    }), this.define("isMoving", {
      get() {
        return this._isMoving || !1;
      }
    }), this.define("layerStartPoint", {
      get() {
        return this._layerStartPoint || this.layer.point;
      }
    }), this.define("cursorStartPoint", {
      get() {
        return this._cursorStartPoint || { x: 0, y: 0 };
      }
    }), this.define("layerCursorOffset", {
      get() {
        return this._layerCursorOffset || { x: 0, y: 0 };
      }
    }), this.define("offset", {
      get() {
        return this._correctedLayerStartPoint ? {
          x: this.layer.x - this._correctedLayerStartPoint.x,
          y: this.layer.y - this._correctedLayerStartPoint.y
        } : { x: 0, y: 0 };
      }
    }), this.define("constraintsOffset", {
      get() {
        if (!this.constraints)
          return { x: 0, y: 0 };
        const { minX: e, maxX: i, minY: n, maxY: r } = this._calculateConstraints(
          this.constraints
        ), { point: s } = this.layer, a = {
          x: Utils$1.clamp(s.x, e, i),
          y: Utils$1.clamp(s.y, n, r)
        };
        return {
          x: s.x - a.x,
          y: s.y - a.y
        };
      }
    }), this.define("isBeyondConstraints", {
      get() {
        const { constraintsOffset: e } = this;
        return e.x !== 0 || e.y !== 0;
      }
    }), this.define("velocity", {
      get() {
        return this.isAnimating ? this._calculateSimulationVelocity() : this._eventBuffer.velocity;
      }
    }), this.define("angle", {
      get() {
        return this._eventBuffer.angle;
      }
    }), this.define("direction", {
      get() {
        const { velocity: e } = this;
        if (e.x === 0 && e.y === 0) {
          const i = this._lastEvent != null ? this._lastEvent.delta : void 0;
          return i ? Math.abs(i.x) > Math.abs(i.y) ? i.x > 0 ? "right" : "left" : i.y > 0 ? "down" : "up" : null;
        }
        return Math.abs(e.x) > Math.abs(e.y) ? e.x > 0 ? "right" : "left" : e.y > 0 ? "down" : "up";
      }
    });
  }
  constructor(e) {
    super(), this.panStart = this.panStart.bind(this), this.touchStart = this.touchStart.bind(this), this.tapStart = this.tapStart.bind(this), this._updateLayerPosition = this._updateLayerPosition.bind(this), this._panStart = this._panStart.bind(this), this._panMove = this._panMove.bind(this), this._tapEnd = this._tapEnd.bind(this), this._panEnd = this._panEnd.bind(this), this._onSimulationStep = this._onSimulationStep.bind(this), this._onSimulationStop = this._onSimulationStop.bind(this), this._stopSimulation = this._stopSimulation.bind(this), this.layer = e;
    const i = Defaults.getDefaults("LayerDraggable", {});
    lodash.extend(this, i), this.enabled = !0, this._eventBuffer = new EventBuffer(), this._constraints = null, this._ignoreUpdateLayerPosition = !0, this.attach();
  }
  attach() {
    return this.layer.on(Gestures.TapStart, this.tapStart), this.layer.on(Gestures.PanStart, this.panStart), this.layer.on("change:x", this._updateLayerPosition), this.layer.on("change:y", this._updateLayerPosition);
  }
  remove() {
    return this.layer.off(Gestures.TapStart, this.tapStart), this.layer.off(Gestures.PanStart, this.panStart), this.layer.off(Gestures.Pan, this._panMove), this.layer.off(Gestures.TapEnd, this._tapEnd);
  }
  updatePosition(e) {
    return e;
  }
  panStart(e) {
    return this.touchStart(e);
  }
  touchStart(e) {
    return this._panStart(e);
  }
  // Stop the simulation if we touch the layer again
  tapStart(e) {
    if (this._isAnimating)
      return __guard__$3(
        Framer.GestureInputRecognizer != null ? Framer.GestureInputRecognizer.session : void 0,
        (i) => i.cancelTap = !0
      ), this._panStart(e);
  }
  _updateLayerPosition() {
    if (this._ignoreUpdateLayerPosition !== !0)
      return this._point = this.layer.point;
  }
  _panStart(e) {
    if (!this.enabled)
      return;
    LayerDraggable._globalDidDrag = !1, Events$2.wrap(document).addEventListener(Gestures.Pan, this._panMove), Events$2.wrap(document).addEventListener(Gestures.TapEnd, this._tapEnd), this._isMoving = this._isAnimating;
    for (var i of Array.from(this.layer.animations())) {
      var { properties: n } = i;
      (n.hasOwnProperty("x") || n.hasOwnProperty("y")) && i.stop();
    }
    this._stopSimulation(), this._resetdirectionLock(), e.preventDefault(), this.propagateEvents === !1 && e.stopPropagation();
    const r = Events$2.touchEvent(e);
    return this._eventBuffer.push({
      x: r.clientX,
      y: r.clientY,
      t: Date.now()
    }), this._layerStartPoint = this.layer.point, this._correctedLayerStartPoint = this.layer.point, this.constraints && this.bounce && (this._correctedLayerStartPoint = this._constrainPosition(
      this._correctedLayerStartPoint,
      this.constraints,
      1 / this.overdragScale
    )), this._cursorStartPoint = {
      x: r.clientX,
      y: r.clientY
    }, this._layerCursorOffset = {
      x: r.clientX - this._correctedLayerStartPoint.x,
      y: r.clientY - this._correctedLayerStartPoint.y
    }, this._point = this._correctedLayerStartPoint, this._ignoreUpdateLayerPosition = !1, this.emit(Events$2.DragSessionStart, e);
  }
  _panMove(e) {
    if (!this.enabled)
      return;
    this._point || this.touchStart(e), e.preventDefault(), this.propagateEvents === !1 && e.stopPropagation();
    const i = Events$2.touchEvent(e);
    this._lastEvent = i, this._eventBuffer.push({
      x: i.clientX,
      y: i.clientY,
      t: Date.now()
    });
    let n = lodash.clone(this._point);
    if (this.horizontal && (n.x = this._point.x + e.delta.x * this.speedX * (1 / this.layer.screenScaleX(!1))), this.vertical && (n.y = this._point.y + e.delta.y * this.speedY * (1 / this.layer.screenScaleY(!1))), this._point = lodash.clone(n), this._constraints && (n = this._constrainPosition(
      n,
      this._constraints,
      this.overdragScale
    )), this.directionLock)
      if (!this._directionLockEnabledX && !this._directionLockEnabledY) {
        const { offset: r } = e;
        r.x = r.x * this.speedX * (1 / this.layer.canvasScaleX()) * this.layer.scaleX * this.layer.scale, r.y = r.y * this.speedY * (1 / this.layer.canvasScaleY()) * this.layer.scaleY * this.layer.scale, this._updatedirectionLock(r);
        return;
      } else
        this._directionLockEnabledX && (n.x = this._layerStartPoint.x), this._directionLockEnabledY && (n.y = this._layerStartPoint.y);
    return (n.x !== this._layerStartPoint.x || n.y !== this._layerStartPoint.y) && (LayerDraggable._globalDidDrag = !0, this._isDragging || (this._isDragging = !0, this._isMoving = !0, this.emit(Events$2.DragStart, e))), this.isDragging && this.emit(Events$2.DragWillMove, e), this.pixelAlign && (this.horizontal && (n.x = Math.round(n.x)), this.vertical && (n.y = Math.round(n.y))), this._ignoreUpdateLayerPosition = !0, this.layer.point = this.updatePosition(n), this._ignoreUpdateLayerPosition = !1, this.isDragging && (this.emit(Events$2.Move, this.layer.point), this.emit(Events$2.DragDidMove, e)), this.emit(Events$2.DragSessionMove, e);
  }
  _tapEnd(e) {
    return this._panEnd(e);
  }
  _panEnd(e) {
    if (this.enabled)
      return LayerDraggable._globalDidDrag = !1, Events$2.wrap(document).removeEventListener(Gestures.Pan, this._panMove), Events$2.wrap(document).removeEventListener(Gestures.TapEnd, this._tapEnd), e.stopPropagation(), this.propagateEvents === !1 && e.stopPropagation(), this._startSimulation(), this.emit(Events$2.DragSessionEnd, e), this._isDragging && this.emit(Events$2.DragEnd, e), this._isDragging = !1, this._isMoving = this._isAnimating, this._ignoreUpdateLayerPosition = !0, this._lastEvent = null, this._eventBuffer.reset();
  }
  _clampAndScale(e, i, n, r) {
    return e < i && (e = i + (e - i) * r), e > n && (e = n + (e - n) * r), e;
  }
  _calculateConstraints(e) {
    let i;
    return e ? (e.width < this.layer.width && (e.width = this.layer.width), e.height < this.layer.height && (e.height = this.layer.height), i = {
      minX: Utils$1.frameGetMinX(e),
      maxX: Utils$1.frameGetMaxX(e),
      minY: Utils$1.frameGetMinY(e),
      maxY: Utils$1.frameGetMaxY(e)
    }, i.maxX -= this.layer.width, i.maxY -= this.layer.height, i) : i = {
      minX: 1 / 0,
      maxX: 1 / 0,
      minY: 1 / 0,
      maxY: 1 / 0
    };
  }
  _constrainPosition(e, i, n) {
    let r;
    const { minX: s, maxX: a, minY: o, maxY: l } = this._calculateConstraints(
      this._constraints
    );
    return this.overdrag ? r = {
      x: this._clampAndScale(e.x, s, a, n),
      y: this._clampAndScale(e.y, o, l, n)
    } : r = {
      x: Utils$1.clamp(e.x, s, a),
      y: Utils$1.clamp(e.y, o, l)
    }, (this.speedX === 0 || this.horizontal === !1) && (r.x = e.x), (this.speedY === 0 || this.vertical === !1) && (r.y = e.y), r;
  }
  calculateVelocity() {
    return this.velocity;
  }
  _calculateSimulationVelocity() {
    const e = this._simulation.x.finished(), i = this._simulation.y.finished(), n = { x: 0, y: 0 };
    return e || (n.x = this._simulation.x.simulator.state.v / this.momentumVelocityMultiplier), i || (n.y = this._simulation.y.simulator.state.v / this.momentumVelocityMultiplier), n;
  }
  //#############################################################
  // Event Handling
  emit(e, i) {
    return this.layer.emit(e, i), super.emit(e, i);
  }
  //#############################################################
  // Lock Direction
  _updatedirectionLock(e) {
    if (this._directionLockEnabledX = Math.abs(e.y) > this.directionLockThreshold.y, this._directionLockEnabledY = Math.abs(e.x) > this.directionLockThreshold.x, this._directionLockEnabledX || this._directionLockEnabledY)
      return this.emit(Events$2.DirectionLockStart, {
        x: this._directionLockEnabledX,
        y: this._directionLockEnabledY
      });
  }
  _resetdirectionLock() {
    return this._directionLockEnabledX = !1, this._directionLockEnabledY = !1;
  }
  //#############################################################
  // Inertial scroll simulation
  _setupSimulation() {
    if (!this._simulation)
      return this._simulation = {
        x: this._setupSimulationForAxis("x"),
        y: this._setupSimulationForAxis("y")
      }, this._updateSimulationConstraints(this.constraints);
  }
  _setupSimulationForAxis(e) {
    const i = {};
    i[e] = !0;
    const n = new Simulation({
      layer: this.layer,
      properties: i,
      model: "inertial-scroll",
      modelOptions: {
        momentum: this.momentumOptions,
        bounce: this.bounceOptions
      }
    });
    return n.on(
      Events$2.SimulationStep,
      (r) => this._onSimulationStep(e, r)
    ), n.on(
      Events$2.SimulationStop,
      (r) => this._onSimulationStop(e, r)
    ), n;
  }
  _updateSimulationConstraints(e) {
    if (this._simulation)
      if (e) {
        const { minX: i, maxX: n, minY: r, maxY: s } = this._calculateConstraints(
          this._constraints
        );
        return this._simulation.x.simulator.options = { min: i, max: n }, this._simulation.y.simulator.options = { min: r, max: s };
      } else
        return this._simulation.x.simulator.options = { min: -1 / 0, max: 1 / 0 }, this._simulation.y.simulator.options = {
          min: -1 / 0,
          max: 1 / 0
        };
  }
  _onSimulationStep(e, i) {
    let n;
    if (e === "x" && this.horizontal === !1 || e === "y" && this.vertical === !1)
      return;
    if (this.constraints)
      if (this.bounce)
        n = i.x - this.layer[e];
      else {
        const { minX: s, maxX: a, minY: o, maxY: l } = this._calculateConstraints(
          this._constraints
        );
        e === "x" && (n = Utils$1.clamp(i.x, s, a) - this.layer[e]), e === "y" && (n = Utils$1.clamp(i.x, o, l) - this.layer[e]);
      }
    else
      n = i.x - this.layer[e];
    const r = this.layer.point;
    return e === "x" && (r[e] = r[e] + n), e === "y" && (r[e] = r[e] + n), this.updatePosition(r), this.layer[e] = this.updatePosition(r)[e], this.emit(Events$2.Move, this.layer.point);
  }
  _onSimulationStop(e, i) {
    if (!(e === "x" && this.horizontal === !1) && !(e === "y" && this.vertical === !1) && this._simulation && (this.pixelAlign && (this.layer[e] = Math.round(this.layer[e])), this._simulation.x.finished() && this._simulation.y.finished()))
      return this._stopSimulation();
  }
  _startSimulation() {
    if (!this.momentum && !this.bounce || this.isBeyondConstraints === !1 && this.momentum === !1 || this.isBeyondConstraints === !1 && this.isDragging === !1)
      return;
    const { minX: e, maxX: i, minY: n, maxY: r } = this._calculateConstraints(
      this._constraints
    ), s = this.overdrag === !0 || this.layer.x > e && this.layer.x < i, a = this.overdrag === !0 || this.layer.y > n && this.layer.y < r;
    if (s === a && a === !1)
      return;
    const { velocity: o } = this, l = o.x * this.momentumVelocityMultiplier * this.speedX * (1 / this.layer.canvasScaleX()) * this.layer.scaleX * this.layer.scale, u = o.y * this.momentumVelocityMultiplier * this.speedY * (1 / this.layer.canvasScaleY()) * this.layer.scaleY * this.layer.scale;
    return this._setupSimulation(), this._isAnimating = !0, this._isMoving = !0, this._simulation.x.simulator.setState({
      x: this.layer.x,
      v: l
    }), s && this._simulation.x.start(), this._simulation.y.simulator.setState({
      x: this.layer.y,
      v: u
    }), a && this._simulation.y.start(), this.emit(Events$2.DragAnimationStart);
  }
  _stopSimulation() {
    if (this._isMoving && this.emit(Events$2.Move, this.layer.point), this._isAnimating = !1, this._isMoving = !1, !!this._simulation)
      return this._simulation != null && this._simulation.x.stop(), this._simulation != null && this._simulation.y.stop(), this._simulation = null, this.emit(Events$2.DragAnimationEnd);
  }
  animateStop() {
    return this._stopSimulation();
  }
  onMove(e) {
    return this.on(Events$2.Move, e);
  }
  onDragStart(e) {
    return this.on(Events$2.DragStart, e);
  }
  onDragWillMove(e) {
    return this.on(Events$2.DragWillMove, e);
  }
  onDragMove(e) {
    return this.on(Events$2.DragMove, e);
  }
  onDragDidMove(e) {
    return this.on(Events$2.DragDidMove, e);
  }
  onDrag(e) {
    return this.on(Events$2.Drag, e);
  }
  onDragEnd(e) {
    return this.on(Events$2.DragEnd, e);
  }
  onDragAnimationStart(e) {
    return this.on(Events$2.DragAnimationStart, e);
  }
  onDragAnimationEnd(e) {
    return this.on(Events$2.DragAnimationEnd, e);
  }
  onDirectionLockStart(e) {
    return this.on(Events$2.DirectionLockStart, e);
  }
}
function __guard__$3(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
LayerDraggable.initClass();
const Events$1 = {
  ...Events$5,
  Rotate: "rotate",
  Scale: "scale"
};
class LayerPinchable extends BaseClass {
  static initClass() {
    this.define("enabled", this.simpleProperty("enabled", !0)), this.define("threshold", this.simpleProperty("threshold", 0)), this.define("centerOrigin", this.simpleProperty("centerOrigin", !0)), this.define("scale", this.simpleProperty("scale", !0)), this.define("scaleIncrements", this.simpleProperty("scaleIncrements", 0)), this.define("minScale", this.simpleProperty("minScale", 0)), this.define("maxScale", this.simpleProperty("maxScale", Number.MAX_VALUE)), this.define("scaleFactor", this.simpleProperty("scaleFactor", 1)), this.define("rotate", this.simpleProperty("rotate", !0)), this.define("rotateIncrements", this.simpleProperty("rotateIncrements", 0)), this.define("rotateMin", this.simpleProperty("rotateMin", 0)), this.define("rotateMax", this.simpleProperty("rotateMax", 0)), this.define("rotateFactor", this.simpleProperty("rotateFactor", 1));
  }
  constructor(e) {
    super(), this.layer = e, this._centerOrigin = this._centerOrigin.bind(this), this._pinchStart = this._pinchStart.bind(this), this._pinch = this._pinch.bind(this), this._pinchEnd = this._pinchEnd.bind(this), this._tapStart = this._tapStart?.bind(this), this._attach();
  }
  _attach() {
    this.layer.on(Gestures.PinchStart, this._pinchStart), this.layer.on(Gestures.Pinch, this._pinch), this.layer.on(Gestures.PinchEnd, this._pinchEnd), this.layer.on(Gestures.TapStart, this._tapStart);
  }
  _reset() {
    this._scaleStart = null, this._rotationStart = null, this._rotationOffset = null;
  }
  _tapStart(e) {
  }
  _centerOrigin(e) {
    const i = Utils$1.convertPoint({}, this.layer, this.layer.superLayer), n = Utils$1.convertPointFromContext(
      e.touchCenter,
      this.layer,
      !0,
      !0
    );
    this.layer.originX = n.x / this.layer.width, this.layer.originY = n.y / this.layer.height;
    const r = Utils$1.convertPoint({}, this.layer, this.layer.superLayer), s = {
      x: r.x - i.x,
      y: r.y - i.y
    };
    this.layer.x -= s.x, this.layer.y -= s.y;
  }
  _pinchStart(e) {
    this._reset(), this.centerOrigin && this._centerOrigin(e), this.normalizeRotation = Utils$1.rotationNormalizer();
  }
  _pinch(e) {
    if (!(e.fingers !== 2 || !this.enabled || e.touchDistance <= this.threshold)) {
      if (this.scale) {
        this._scaleStart == null && (this._scaleStart = this.layer.scale);
        let i = ((e.scale - 1) * this.scaleFactor + 1) * this._scaleStart;
        this.minScale && this.maxScale ? i = Utils$1.clamp(i, this.minScale, this.maxScale) : this.minScale ? i = Utils$1.clamp(i, this.minScale, 1e6) : this.maxScale && (i = Utils$1.clamp(i, 1e-5, this.maxScale)), this.scaleIncrements && (i = Utils$1.nearestIncrement(i, this.scaleIncrements)), this.layer.scale = i, this.emit(Events$1.Scale, e);
      }
      if (this.rotate) {
        this._rotationStart == null && (this._rotationStart = this.layer.rotation), this._rotationOffset == null && (this._rotationOffset = e.rotation);
        let i = e.rotation - this._rotationOffset + this._rotationStart;
        i *= this.rotateFactor, i = this.normalizeRotation(i), this.rotateMin && this.rotateMax && (i = Utils$1.clamp(i, this.rotateMin, this.rotateMax)), this.rotateIncrements && (i = Utils$1.nearestIncrement(i, this.rotateIncrements)), this.layer.rotation = i, this.emit(Events$1.Rotate, e);
      }
    }
  }
  _pinchEnd(e) {
    this._reset();
  }
}
LayerPinchable.initClass();
class LayerPropertyProxy {
  constructor(e, i) {
    const n = this, r = function(u) {
      return this[u];
    }, s = function(u, c) {
      return i(this, u, c, n);
    };
    for (var a of Array.from(Object.getOwnPropertyNames(e))) {
      var o = Object.getOwnPropertyDescriptor(e, a), l = {
        enumerable: o.enumerable,
        get: r.bind(e, a),
        set: s.bind(e, a)
      };
      Object.defineProperty(n, a, l);
    }
    n.__proto__ = e.__proto__;
  }
}
const NoCacheDateKey = Date.now(), delayedStyles = [
  "webkitTransform",
  "webkitFilter",
  "webkitPerspectiveOrigin",
  "webkitTransformOrigin",
  "webkitBackdropFilter"
], layerValueTypeError = function(t, e) {
  throw new Error(
    `Layer.${t}: value '${e}' of type '${typeof e}' is not valid`
  );
}, layerProperty = function(t, e, i, n, r, s, a, o, l, u, c) {
  a == null && (a = {});
  let f = {
    default: n,
    get() {
      let p;
      return this._properties.hasOwnProperty(e) && (p = this._properties[e]), p == null && (p = n), c ? layerProxiedValue(p, this, e) : p;
    },
    set(p) {
      s && (p = s(p, this, e));
      const y = this._properties[e];
      if (p !== y) {
        if (p && r && typeof r == "function" && !r(p) && layerValueTypeError(e, p), this._properties[e] = p, i !== null) {
          let b, x, w = this;
          if (Array.from(this._stylesAppliedToParent).includes(i) && (w = this._parent, this._parent._properties[e] = n), (u || !l) && (b = w._element), l != null && (x = w[l]), e === i && (LayerStyle[i] == null || typeof LayerStyle[i] != "function"))
            b != null && (b.style[i] = this._properties[e]), x != null && (x.style[i] = this._properties[e]);
          else if (typeof LayerStyle[i] == "function" && (!this.__applyingDefaults || !Array.from(delayedStyles).includes(i))) {
            const A = LayerStyle[i](this);
            b != null && (b.style[i] = A), x != null && (x.style[i] = A);
          }
        }
        if (typeof o == "function" && o(this, p), !this.__constructor && (this.emit(`change:${e}`, p, y), ["x", "y"].includes(e) && this.emit("change:point", p), ["width", "height"].includes(e) && this.emit("change:size", p), ["x", "y", "width", "height"].includes(e) && this.emit("change:frame", p), ["rotationZ"].includes(e)))
          return this.emit("change:rotation", p);
      }
    }
  };
  return f = lodash.extend(f, a);
};
var layerProxiedValue = function(t, e, i) {
  return lodash.isObject(t) ? new LayerPropertyProxy(t, function(n, r, s) {
    return n[r] = s, e[i] = n;
  }) : t;
};
const layerPropertyPointTransformer = function(t, e, i) {
  return lodash.isFunction(t) && (t = t(e, i)), t;
}, layerPropertyIgnore = function(t, e, i) {
  if (!t.hasOwnProperty(e))
    return t;
  for (var n of Array.from(i))
    if (t.hasOwnProperty(n))
      return delete t[e], t;
  return t;
}, asBorderRadius = function(t) {
  if (lodash.isNumber(t))
    return t;
  if (lodash.isString(t))
    return lodash.endsWith(t, "%") || console.error(
      "Layer.borderRadius only correctly supports percentages in strings"
    ), t;
  if (!lodash.isObject(t))
    return 0;
  const e = {};
  let i = !1;
  for (var n of ["topLeft", "topRight", "bottomRight", "bottomLeft"])
    i || (i = lodash.has(t, n)), e[n] = t[n] != null ? t[n] : 0;
  return i ? e : 0;
}, asBorderWidth = function(t) {
  if (lodash.isNumber(t))
    return t;
  if (!lodash.isObject(t))
    return 0;
  const e = {};
  let i = !1;
  for (var n of ["left", "right", "bottom", "top"])
    i || (i = lodash.has(t, n)), e[n] = t[n] != null ? t[n] : 0;
  return i ? e : 0;
}, parentOrContext = function(t) {
  return t.parent != null ? t.parent : t.context;
}, proxiedShadowValue = function(t, e, i) {
  i == null && (i = 0);
  const n = lodash.defaults(lodash.clone(e), Framer.Defaults.Shadow);
  return n.color !== null && n != null && (n.color = new Color$1(n.color)), layerProxiedValue(n, t, `shadow${i + 1}`);
};
let Layer$1 = class Q extends BaseClass {
  static initClass() {
    this.define("context", {
      get() {
        return this._context;
      }
    }), this.define("label", {
      get() {
        return this._label;
      },
      set(i) {
        if (i !== this._label)
          return this._label = i, Utils$1.labelLayer(this, this._label);
      }
    }), this.define("custom", this.simpleProperty("custom", void 0)), this.define(
      "animationOptions",
      this.simpleProperty("animationOptions", {})
    ), this.define(
      "ignoreEvents",
      layerProperty(this, "ignoreEvents", "pointerEvents", !0, lodash.isBoolean)
    ), this.define(
      "width",
      layerProperty(
        this,
        "width",
        "width",
        100,
        lodash.isNumber,
        null,
        {},
        function(i, n) {
          if (!(i.constraintValues == null || i.isLayouting))
            return i.constraintValues.width = n, i.constraintValues.aspectRatioLocked = !1, i.constraintValues.widthFactor = null, i._layoutX();
        }
      )
    ), this.define(
      "height",
      layerProperty(
        this,
        "height",
        "height",
        100,
        lodash.isNumber,
        null,
        {},
        function(i, n) {
          if (!(i.constraintValues == null || i.isLayouting))
            return i.constraintValues.height = n, i.constraintValues.aspectRatioLocked = !1, i.constraintValues.heightFactor = null, i._layoutY();
        }
      )
    ), this.define(
      "visible",
      layerProperty(this, "visible", "display", !0, lodash.isBoolean)
    ), this.define(
      "opacity",
      layerProperty(this, "opacity", "opacity", 1, lodash.isNumber, parseFloat)
    ), this.define(
      "index",
      layerProperty(this, "index", "zIndex", 0, lodash.isNumber, null, {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "clip",
      layerProperty(
        this,
        "clip",
        "overflow",
        !1,
        lodash.isBoolean,
        null,
        {},
        null,
        "_elementHTML",
        !0
      )
    ), this.define(
      "scrollHorizontal",
      layerProperty(
        this,
        "scrollHorizontal",
        "overflowX",
        !1,
        lodash.isBoolean,
        null,
        {},
        function(i, n) {
          if (n === !0)
            return i.ignoreEvents = !1;
        }
      )
    ), this.define(
      "scrollVertical",
      layerProperty(
        this,
        "scrollVertical",
        "overflowY",
        !1,
        lodash.isBoolean,
        null,
        {},
        function(i, n) {
          if (n === !0)
            return i.ignoreEvents = !1;
        }
      )
    ), this.define("scroll", {
      get() {
        return this.scrollHorizontal === !0 || this.scrollVertical === !0;
      },
      set(i) {
        return this.scrollHorizontal = this.scrollVertical = i;
      }
    }), this.define(
      "x",
      layerProperty(
        this,
        "x",
        "webkitTransform",
        0,
        lodash.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function(i) {
          if (!i.isLayouting)
            return i.constraintValues = null;
        }
      )
    ), this.define(
      "y",
      layerProperty(
        this,
        "y",
        "webkitTransform",
        0,
        lodash.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function(i) {
          if (!i.isLayouting)
            return i.constraintValues = null;
        }
      )
    ), this.define(
      "z",
      layerProperty(this, "z", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "scaleX",
      layerProperty(this, "scaleX", "webkitTransform", 1, lodash.isNumber)
    ), this.define(
      "scaleY",
      layerProperty(this, "scaleY", "webkitTransform", 1, lodash.isNumber)
    ), this.define(
      "scaleZ",
      layerProperty(this, "scaleZ", "webkitTransform", 1, lodash.isNumber)
    ), this.define(
      "scale",
      layerProperty(this, "scale", "webkitTransform", 1, lodash.isNumber)
    ), this.define(
      "skewX",
      layerProperty(this, "skewX", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "skewY",
      layerProperty(this, "skewY", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "skew",
      layerProperty(this, "skew", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "originX",
      layerProperty(this, "originX", "webkitTransformOrigin", 0.5, lodash.isNumber)
    ), this.define(
      "originY",
      layerProperty(this, "originY", "webkitTransformOrigin", 0.5, lodash.isNumber)
    ), this.define("originZ", layerProperty(this, "originZ", null, 0, lodash.isNumber)), this.define(
      "perspective",
      layerProperty(
        this,
        "perspective",
        "webkitPerspective",
        0,
        (i) => Utils$1.webkitPerspectiveForValue(i) !== null
      )
    ), this.define(
      "perspectiveOriginX",
      layerProperty(
        this,
        "perspectiveOriginX",
        "webkitPerspectiveOrigin",
        0.5,
        lodash.isNumber
      )
    ), this.define(
      "perspectiveOriginY",
      layerProperty(
        this,
        "perspectiveOriginY",
        "webkitPerspectiveOrigin",
        0.5,
        lodash.isNumber
      )
    ), this.define(
      "rotationX",
      layerProperty(this, "rotationX", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "rotationY",
      layerProperty(this, "rotationY", "webkitTransform", 0, lodash.isNumber)
    ), this.define(
      "rotationZ",
      layerProperty(this, "rotationZ", "webkitTransform", 0, lodash.isNumber)
    ), this.define("rotation", {
      //exportable: false
      get() {
        return this.rotationZ;
      },
      set(i) {
        return this.rotationZ = i;
      }
    }), this.define(
      "blur",
      layerProperty(this, "blur", "webkitFilter", 0, lodash.isNumber)
    ), this.define(
      "brightness",
      layerProperty(this, "brightness", "webkitFilter", 100, lodash.isNumber)
    ), this.define(
      "saturate",
      layerProperty(this, "saturate", "webkitFilter", 100, lodash.isNumber)
    ), this.define(
      "hueRotate",
      layerProperty(this, "hueRotate", "webkitFilter", 0, lodash.isNumber)
    ), this.define(
      "contrast",
      layerProperty(this, "contrast", "webkitFilter", 100, lodash.isNumber)
    ), this.define(
      "invert",
      layerProperty(this, "invert", "webkitFilter", 0, lodash.isNumber)
    ), this.define(
      "grayscale",
      layerProperty(this, "grayscale", "webkitFilter", 0, lodash.isNumber)
    ), this.define(
      "sepia",
      layerProperty(this, "sepia", "webkitFilter", 0, lodash.isNumber)
    ), this.define(
      "blending",
      layerProperty(this, "blending", "mixBlendMode", null, lodash.isString)
    ), this.define(
      "backgroundBlur",
      layerProperty(
        this,
        "backgroundBlur",
        "webkitBackdropFilter",
        0,
        lodash.isNumber
      )
    ), this.define(
      "backgroundBrightness",
      layerProperty(
        this,
        "backgroundBrightness",
        "webkitBackdropFilter",
        100,
        lodash.isNumber
      )
    ), this.define(
      "backgroundSaturate",
      layerProperty(
        this,
        "backgroundSaturate",
        "webkitBackdropFilter",
        100,
        lodash.isNumber
      )
    ), this.define(
      "backgroundHueRotate",
      layerProperty(
        this,
        "backgroundHueRotate",
        "webkitBackdropFilter",
        0,
        lodash.isNumber
      )
    ), this.define(
      "backgroundContrast",
      layerProperty(
        this,
        "backgroundContrast",
        "webkitBackdropFilter",
        100,
        lodash.isNumber
      )
    ), this.define(
      "backgroundInvert",
      layerProperty(
        this,
        "backgroundInvert",
        "webkitBackdropFilter",
        0,
        lodash.isNumber
      )
    ), this.define(
      "backgroundGrayscale",
      layerProperty(
        this,
        "backgroundGrayscale",
        "webkitBackdropFilter",
        0,
        lodash.isNumber
      )
    ), this.define(
      "backgroundSepia",
      layerProperty(
        this,
        "backgroundSepia",
        "webkitBackdropFilter",
        0,
        lodash.isNumber
      )
    ), this.define(
      "backgroundSize",
      layerProperty(
        this,
        "backgroundSize",
        "backgroundSize",
        "fill",
        lodash.isString
      )
    );
    for (let i = 0; i <= 8; i++)
      ((n) => this.define(`shadow${n + 1}`, {
        exportable: !1,
        depends: [
          "shadowX",
          "shadowY",
          "shadowBlur",
          "shadowSpread",
          "shadowColor",
          "shadowType"
        ],
        get() {
          return this.shadows == null && (this.shadows = []), this.shadows[n] == null && (this.shadows[n] = proxiedShadowValue(this, {}, n)), this.shadows[n];
        },
        set(r) {
          return this.shadows == null && (this.shadows = []), this.shadows[n] = proxiedShadowValue(this, r, n), this.updateShadowStyle();
        }
      }))(i);
    for (var e of ["X", "Y", "Blur", "Spread", "Color", "Type"])
      ((i) => this.define(`shadow${i}`, {
        get() {
          return this.shadows == null || this.shadows.length === 0 ? null : this.shadows[0][i.toLowerCase()];
        },
        set(n) {
          return this.updateShadowsProperty(i.toLowerCase(), n);
        }
      }))(e);
    this.define("shadows", {
      default: null,
      get() {
        return this._getPropertyValue("shadows");
      },
      set(i) {
        i == null && (i = []);
        const n = [];
        for (let s = 0; s < i.length; s++) {
          var r = i[s];
          r === null ? n.push(null) : n.push(proxiedShadowValue(this, r, s));
        }
        return this._setPropertyValue("shadows", n), this.updateShadowStyle();
      }
    }), this.define(
      "backgroundColor",
      layerProperty(
        this,
        "backgroundColor",
        "backgroundColor",
        null,
        Color$1.validColorValue,
        Color$1.toColor
      )
    ), this.define(
      "color",
      layerProperty(
        this,
        "color",
        "color",
        null,
        Color$1.validColorValue,
        Color$1.toColor,
        null,
        null,
        "_elementHTML",
        !0
      )
    ), this.define(
      "borderRadius",
      layerProperty(
        this,
        "borderRadius",
        "borderRadius",
        0,
        null,
        asBorderRadius,
        null,
        null,
        "_elementBorder",
        !0,
        !0
      )
    ), this.define(
      "borderColor",
      layerProperty(
        this,
        "borderColor",
        "borderColor",
        null,
        Color$1.validColorValue,
        Color$1.toColor,
        null,
        null,
        "_elementBorder"
      )
    ), this.define(
      "borderWidth",
      layerProperty(
        this,
        "borderWidth",
        "borderWidth",
        0,
        null,
        asBorderWidth,
        null,
        null,
        "_elementBorder",
        !1,
        !0
      )
    ), this.define(
      "borderStyle",
      layerProperty(
        this,
        "borderStyle",
        "borderStyle",
        "solid",
        lodash.isString,
        null,
        null,
        null,
        "_elementBorder"
      )
    ), this.define(
      "force2d",
      layerProperty(this, "force2d", "webkitTransform", !1, lodash.isBoolean)
    ), this.define(
      "flat",
      layerProperty(this, "flat", "webkitTransformStyle", !1, lodash.isBoolean)
    ), this.define(
      "backfaceVisible",
      layerProperty(
        this,
        "backfaceVisible",
        "webkitBackfaceVisibility",
        !0,
        lodash.isBoolean
      )
    ), this.define("name", {
      default: "",
      get() {
        const i = this._getPropertyValue("name");
        return i != null ? `${i}` : "";
      },
      set(i) {
        return this._setPropertyValue("name", i), this._element.setAttribute("name", i);
      }
    }), this.define("matrix", {
      get() {
        return this.force2d ? this._matrix2d : Matrix.identity3d().translate(this.x, this.y, this.z).scale(this.scale).scale(this.scaleX, this.scaleY, this.scaleZ).skew(this.skew).skewX(this.skewX).skewY(this.skewY).translate(0, 0, this.originZ).rotate(this.rotationX, 0, 0).rotate(0, this.rotationY, 0).rotate(0, 0, this.rotationZ).translate(0, 0, -this.originZ);
      }
    }), this.define("_matrix2d", {
      get() {
        return Matrix.identity3d().translate(this.x, this.y).scale(this.scale).scale(this.scaleX, this.scaleY).skewX(this.skew).skewY(this.skew).rotate(0, 0, this.rotationZ);
      }
    }), this.define("transformMatrix", {
      get() {
        return Matrix.identity3d().translate(this.originX * this.width, this.originY * this.height).multiply(this.matrix).translate(-this.originX * this.width, -this.originY * this.height);
      }
    }), this.define("matrix3d", {
      get() {
        const i = this.parent || this.context, n = Utils$1.perspectiveMatrix(i);
        return Matrix.identity3d().multiply(n).multiply(this.transformMatrix);
      }
    }), this.define("cornerRadius", {
      importable: !1,
      exportable: !1,
      // exportable: no
      get() {
        return this.borderRadius;
      },
      set(i) {
        return this.borderRadius = i;
      }
    }), this.define("point", {
      importable: !0,
      exportable: !1,
      depends: ["width", "height", "size", "parent"],
      get() {
        return Utils$1.point(this);
      },
      set(i) {
        return i = layerPropertyPointTransformer(i, this, "point"), this._setGeometryValues(i, ["x", "y"]);
      }
    }), this.define("midPoint", {
      importable: !0,
      exportable: !1,
      depends: ["width", "height", "size", "parent", "point"],
      get() {
        return {
          x: this.midX,
          y: this.midY
        };
      },
      set(i) {
        return i = layerPropertyPointTransformer(i, this, "midPoint"), lodash.isNumber(i) || (i = lodash.pick(i, ["x", "y", "midX", "midY"]), i.x != null && i.midX == null && (i.midX = i.x, delete i.x), i.y != null && i.midY == null && (i.midY = i.y, delete i.y)), this._setGeometryValues(i, ["midX", "midY"]);
      }
    }), this.define("size", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.size(this);
      },
      set(i) {
        return this._setGeometryValues(i, ["width", "height"]);
      }
    }), this.define("frame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.frame(this);
      },
      set(i) {
        return this._setGeometryValues(i, ["x", "y", "width", "height"]);
      }
    }), this.define("minX", {
      importable: !0,
      exportable: !1,
      get() {
        return this.x;
      },
      set(i) {
        return this.x = i;
      }
    }), this.define("midX", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.frameGetMidX(this);
      },
      set(i) {
        return Utils$1.frameSetMidX(this, i);
      }
    }), this.define("maxX", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.frameGetMaxX(this);
      },
      set(i) {
        return Utils$1.frameSetMaxX(this, i);
      }
    }), this.define("minY", {
      importable: !0,
      exportable: !1,
      get() {
        return this.y;
      },
      set(i) {
        return this.y = i;
      }
    }), this.define("midY", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.frameGetMidY(this);
      },
      set(i) {
        return Utils$1.frameSetMidY(this, i);
      }
    }), this.define("maxY", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.frameGetMaxY(this);
      },
      set(i) {
        return Utils$1.frameSetMaxY(this, i);
      }
    }), this.define("constraintValues", {
      importable: !0,
      exportable: !1,
      default: null,
      get() {
        return this._getPropertyValue("constraintValues");
      },
      set(i) {
        let n;
        if (i === null)
          n = null, this.off("change:parent", this.parentChanged), Screen.off("resize", this.layout);
        else {
          let r;
          if (n = lodash.defaults(lodash.clone(i), {
            left: 0,
            right: null,
            top: 0,
            bottom: null,
            centerAnchorX: 0,
            centerAnchorY: 0,
            widthFactor: null,
            heightFactor: null,
            aspectRatioLocked: !1,
            width: this.width,
            height: this.height
          }), this.parent != null) {
            let s, a;
            s = this.layout, !Array.from(this.parent.listeners("change:width")).includes(
              s
            ) && this.parent.on("change:width", this.layout), a = this.layout, !Array.from(this.parent.listeners("change:height")).includes(
              a
            ) && this.parent.on("change:height", this.layout);
          } else {
            let s;
            s = this.layout, !Array.from(Screen.listeners("resize")).includes(s) && Screen.on("resize", this.layout);
          }
          r = this.parentChanged, !Array.from(this.listeners("change:parent")).includes(r) && this.on("change:parent", this.parentChanged);
        }
        return this._setPropertyValue("constraintValues", n);
      }
    }), this.define("htmlIntrinsicSize", {
      importable: !0,
      exportable: !0,
      default: null,
      get() {
        return this._getPropertyValue("htmlIntrinsicSize");
      },
      set(i) {
        return i === null ? this._setPropertyValue("htmlIntrinsicSize", i) : !lodash.isFinite(i.width) || !lodash.isFinite(i.height) ? void 0 : this._setPropertyValue("htmlIntrinsicSize", {
          width: i.width,
          height: i.height
        });
      }
    }), this.define("canvasFrame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.boundingFrame(this);
      },
      set(i) {
        return this.frame = Utils$1.convertFrameFromContext(
          i,
          this,
          !0,
          !1
        );
      }
    }), this.define("screenFrame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$1.boundingFrame(this, !1);
      },
      set(i) {
        return this.frame = Utils$1.convertFrameFromContext(
          i,
          this,
          !1,
          !1
        );
      }
    }), this.define("style", {
      importable: !0,
      exportable: !1,
      get() {
        return this._element.style;
      },
      set(i) {
        return lodash.extend(this._element.style, i), this.emit("change:style");
      }
    }), this.define("classList", {
      importable: !0,
      exportable: !1,
      get() {
        return this._element.classList;
      }
    }), this.define("html", {
      get() {
        return (this._elementHTML != null ? this._elementHTML.innerHTML : void 0) || "";
      },
      set(i) {
        this._createHTMLElementIfNeeded();
        const n = Utils$1.getIdAttributesFromString(i);
        for (var r of Array.from(n)) {
          var s = document.querySelector(`[id='${r}']`);
          if (s != null) {
            Utils$1.throwInStudioOrWarnInProduction(
              Q.ExistingIdMessage("html", r)
            );
            return;
          }
        }
        return this._elementHTML.innerHTML = i, this._updateHTMLScale(), this.emit("change:html");
      }
    }), this.define("image", {
      default: "",
      get() {
        return this._getPropertyValue("image");
      },
      set(i) {
        const n = this._getPropertyValue("image"), r = Defaults.getDefaults("Layer", {}), s = this.backgroundColor != null && typeof this.backgroundColor.isEqual == "function" ? this.backgroundColor.isEqual(r.backgroundColor) : void 0;
        if (Gradient$1.isGradientObject(i)) {
          this.emit("change:gradient", i, n), this.emit("change:image", i, n), this._setPropertyValue("image", i), this.style["background-image"] = i.toCSS(), s && (this.backgroundColor = null);
          return;
        }
        if (lodash.isString(i) || i === null || layerValueTypeError("image", i), n === i)
          return this.emit("load");
        if (s && (this.backgroundColor = null), this._setPropertyValue("image", i), [null, ""].includes(i)) {
          this._imageLoader != null && (this._imageEventManager.removeAllListeners(), this._imageLoader.src = null), this.style["background-image"] = null, this._imageLoader != null && (this.emit(Events$5.ImageLoadCancelled, this._imageLoader), this._cleanupImageLoader());
          return;
        }
        if (lodash.endsWith(
          typeof i.toLowerCase == "function" ? i.toLowerCase() : void 0,
          ".pdf"
        ) && (!Utils$1.isWebKit() || Utils$1.isChrome())) {
          this.style["background-image"] = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAVlJREFUaAXtlwEOwiAMRdF4Cr3/0fQaSre9ZFSYLCrQpSSG/FLW9v92agghXJdP3KZlCp/J2up+WiUuzMt6zNukzPDYvALCsKme1/maV8BnQHqw9/IZ6KmAz0BP9ontMwATPXafgR6s65g+A5qRlrhmBu6FhG6LXf9/+JU/YclROkVWEs/8r9FLrChb2apSqVqWZgKmtRKz9/f+CdPxoVl8CAWylcWKUQZGwfhjB3OOHcw5djDn2MH6fBNLC42yaEnyoTXB2V36+lPlz+zN9x6HKfxrZwZ/HUbf5/lJviMpoBPWBWWxFJCtLNqplItIWuvPffx5Dphz7GB9vonNv4X2zICWuMTM3p7Gv/b5iVLmFaiZgb3M/Ns/Ud68AvIGkJ6ir8xh8wrQrzAve9Jjo2PzCsC8z4Aw0WP5DPRgXcf07wHNSEvsM9CS7VIsn4ESMy3sPgMtWN6K8QKfubDo2UqVogAAAABJRU5ErkJggg==')";
          return;
        }
        let a = i;
        return this._alwaysUseImageCache === !1 && Utils$1.isLocalAssetUrl(a) && (a += /\?/.test(a) ? "&" : "?", a += `nocache=${NoCacheDateKey}`), this.listeners(Events$5.ImageLoaded, !0) || this.listeners(Events$5.ImageLoadError, !0) || this.listeners(Events$5.ImageLoadCancelled, !0) ? (this._imageLoader = new Image(), this._imageLoader.name = a, this._imageLoader.src = a, this._imageEventManager = this._context.domEventManager.wrap(
          this._imageLoader
        ), this._imageEventManager.addEventListener("load", () => (this.style["background-image"] = `url('${a}')`, this.emit(Events$5.ImageLoaded, this._imageLoader), this._cleanupImageLoader())), this._imageEventManager.addEventListener("error", () => (this.emit(Events$5.ImageLoadError, this._imageLoader), this._cleanupImageLoader()))) : this.style["background-image"] = `url('${a}')`;
      }
    }), this.define("gradient", {
      get() {
        return Gradient$1.isGradientObject(this.image) ? layerProxiedValue(this.image, this, "gradient") : null;
      },
      set(i) {
        if (Gradient$1.isGradient(i))
          return this.image = new Gradient$1(i);
        if (!i && Gradient$1.isGradientObject(this.image))
          return this.image = null;
      }
    }), this.define("parent", {
      enumerable: !1,
      exportable: !1,
      importable: !0,
      get() {
        return this._parent || null;
      },
      set(i) {
        if (i === this._parent)
          return;
        if (i === this)
          throw Error("Layer.parent: a layer cannot be it's own parent.");
        if (i && !(i instanceof Q))
          throw Error("Layer.parent needs to be a Layer object");
        if (Utils$1.domCompleteCancel(this.__insertElement), this._parent && (this._parent._children = lodash.pull(this._parent._children, this), this._parent._element.removeChild(this._element), this._parent.emit("change:children", { added: [], removed: [this] }), this._parent.emit("change:subLayers", { added: [], removed: [this] })), i) {
          if (!i._element) {
            console.warn("Layer.parent: parent layer not properly initialized, skipping appendChild"), this._parent = i;
            return;
          }
          i._element.appendChild(this._element), i._children.push(this), i.emit("change:children", { added: [this], removed: [] }), i.emit("change:subLayers", { added: [this], removed: [] });
        } else
          this._insertElement();
        const n = this._parent;
        return this._parent = i, this.bringToFront(), this.emit("change:parent", this._parent, n), this.emit("change:superLayer", this._parent, n);
      }
    }), this.define("children", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this._children.map(function(i) {
          return i instanceof SVGLayer && i.children.length === 1 && lodash.startsWith(i.name, ".") ? i.children[0] : i;
        });
      }
    }), this.define("siblings", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.parent === null ? lodash.filter(this._context.layers, (i) => i !== this && i.parent === null) : lodash.without(this.parent.children, this);
      }
    }), this.define("descendants", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        const i = [];
        var n = function(r) {
          return i.push(r), r.children.map(n);
        };
        return this.children.map(n), i;
      }
    }), this.define("superLayer", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.parent;
      },
      set(i) {
        return this.parent = i;
      }
    }), this.define("subLayers", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.children;
      }
    }), this.define("siblingLayers", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.siblings;
      }
    }), this.define("isAnimating", {
      enumerable: !1,
      exportable: !1,
      get() {
        return this.animations().length !== 0;
      }
    }), this.define("states", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this._states == null && (this._states = new LayerStates(this)), this._states;
      },
      set(i) {
        return this.states.machine.reset(), lodash.extend(this.states, i);
      }
    }), this.define("stateNames", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.states.machine.stateNames;
      }
    }), this.define("draggable", {
      importable: !1,
      exportable: !1,
      get() {
        return this._draggable != null ? this._draggable : this._draggable = new LayerDraggable(this);
      },
      set(i) {
        if (lodash.isBoolean(i))
          return this.draggable.enabled = i;
      }
    }), this.define("pinchable", {
      importable: !1,
      exportable: !1,
      get() {
        return this._pinchable != null ? this._pinchable : this._pinchable = new LayerPinchable(this);
      },
      set(i) {
        if (lodash.isBoolean(i))
          return this.pinchable.enabled = i;
      }
    }), this.define("scrollFrame", {
      importable: !1,
      get() {
        return {
          x: this.scrollX,
          y: this.scrollY,
          width: this.width,
          height: this.height
        };
      },
      set(i) {
        return this.scrollX = i.x, this.scrollY = i.y;
      }
    }), this.define("scrollX", {
      get() {
        return this._element.scrollLeft;
      },
      set(i) {
        return lodash.isNumber(i) || layerValueTypeError("scrollX", i), this._element.scrollLeft = i;
      }
    }), this.define("scrollY", {
      get() {
        return this._element.scrollTop;
      },
      set(i) {
        return lodash.isNumber(i) || layerValueTypeError("scrollY", i), this._element.scrollTop = i;
      }
    }), this.define("_domEventManager", {
      get() {
        return this._context.domEventManager.wrap(this._element);
      }
    }), this.prototype.on = this.prototype.addListener, this.prototype.off = this.prototype.removeListener;
  }
  constructor(e) {
    if (super(), this.parentChanged = this.parentChanged.bind(this), this._layoutX = this._layoutX.bind(this), this._layoutY = this._layoutY.bind(this), this.layout = this.layout.bind(this), this.convertPointToScreen = this.convertPointToScreen.bind(this), this.convertPointToCanvas = this.convertPointToCanvas.bind(this), this.convertPointToLayer = this.convertPointToLayer.bind(this), this.updateForDevicePixelRatioChange = this.updateForDevicePixelRatioChange.bind(this), this.updateForSizeChange = this.updateForSizeChange.bind(this), this.once = this.once.bind(this), this.addListener = this.addListener.bind(this), e == null && (e = {}), this.__constructorCalled)
      throw Error(`Layer.constructor ${this.toInspect()} called twice`);
    this.__constructorCalled = !0, this.__constructor = !0, this._properties = {}, this._style = {}, this._children = [], this._stylesAppliedToParent == null && (this._stylesAppliedToParent = []), this._prefer2d = !1, this._alwaysUseImageCache = !1, this._cancelClickEventInDragSession = !0, this._createElement(), e.createHTMLElement && this._createHTMLElementIfNeeded(), this._createBorderElement(), layerPropertyIgnore(e, "point", ["x", "y"]), layerPropertyIgnore(e, "midPoint", ["midX", "midY"]), layerPropertyIgnore(e, "size", ["width", "height"]), layerPropertyIgnore(e, "frame", ["x", "y", "width", "height"]), !e.hasOwnProperty("parent") && e.hasOwnProperty("superLayer") && (e.parent = e.superLayer, delete e.superLayer), this.__applyingDefaults = !0, this._applyDefaults(Defaults.getDefaults("Layer", e)), delete this.__applyingDefaults;
    for (var i of Array.from(delayedStyles)) {
      var n = this._element;
      Array.from(this._stylesAppliedToParent).includes(i) && (n = this._parent._element), n.style[i] = LayerStyle[i](this);
    }
    this._context.addLayer(this), this._id = this._context.layerCounter, e.parent ? this.parent = e.parent : e.shadow || this._insertElement(), e.hasOwnProperty("index") && (this.index = e.index);
    for (var r of ["x", "y", "width", "height"])
      e.hasOwnProperty(r) && (this[r] = e[r]);
    this._context.emit("layer:create", this), this.label = this.label, delete this.__constructor, this.updateShadowStyle(), this.onChange("size", this.updateForSizeChange);
  }
  static ExistingIdMessage(e, i) {
    return `Can not set ${e}: There's already an element with id '${i}' in this document'`;
  }
  updateShadowsProperty(e, i) {
    this.shadows == null && (this.shadows = []), this.shadows.filter((r) => r !== null).length === 0 && (this.shadows[0] = proxiedShadowValue(this, Framer.Defaults.Shadow));
    for (var n of Array.from(this.shadows))
      n != null && (n[e] = i);
    return this.updateShadowStyle();
  }
  updateShadowStyle() {
    if (!this.__constructor)
      return this._element.style.boxShadow = LayerStyle.boxShadow(this), this._element.style.textShadow = LayerStyle.textShadow(this), this._element.style.webkitFilter = LayerStyle.webkitFilter(this);
  }
  //#############################################################
  // Geometry
  _setGeometryValues(e, i) {
    return lodash.isNumber(e) ? (() => {
      const n = [];
      for (var r of Array.from(i))
        this[r] !== e ? n.push(this[r] = e) : n.push(void 0);
      return n;
    })() : e ? (() => {
      const n = [];
      for (var r of Array.from(i))
        lodash.isNumber(e[r]) && this[r] !== e[r] ? n.push(this[r] = e[r]) : n.push(void 0);
      return n;
    })() : void 0;
  }
  parentChanged(e, i) {
    return i != null ? (i.off("change:width", this.layout), i.off("change:height", this.layout)) : Screen.off("resize", this.layout), this.constraintValues = null;
  }
  setParentPreservingConstraintValues(e) {
    const i = this.constraintValues;
    return this.parent = e, this.constraintValues = i, this.layout();
  }
  _layoutX() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.x = Utils$1.calculateLayoutX(
      e,
      this.constraintValues,
      this.width
    ), this.isLayouting = !1;
  }
  _layoutY() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.y = Utils$1.calculateLayoutY(
      e,
      this.constraintValues,
      this.height
    ), this.isLayouting = !1;
  }
  layout() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.frame = Utils$1.calculateLayoutFrame(e, this), this.isLayouting = !1;
  }
  convertPointToScreen(e) {
    return Utils$1.convertPointToContext(e, this, !1);
  }
  convertPointToCanvas(e) {
    return Utils$1.convertPointToContext(e, this, !0);
  }
  convertPointToLayer(e, i, n) {
    return n == null && (n = !0), Utils$1.convertPoint(e, this, i, n);
  }
  contentFrame() {
    return this._children.length ? Utils$1.frameMerge(lodash.map(this._children, "frame")) : { x: 0, y: 0, width: 0, height: 0 };
  }
  totalFrame() {
    return Utils$1.frameMerge(this.frame, this.contentFrame());
  }
  centerFrame() {
    let e;
    return this.parent ? ({ frame: e } = this, Utils$1.frameSetMidX(
      e,
      parseInt(this.parent.width / 2 - this.parent.borderWidth)
    ), Utils$1.frameSetMidY(
      e,
      parseInt(this.parent.height / 2 - this.parent.borderWidth)
    ), e) : ({ frame: e } = this, Utils$1.frameSetMidX(e, parseInt(this._context.innerWidth / 2)), Utils$1.frameSetMidY(e, parseInt(this._context.innerHeight / 2)), e);
  }
  center() {
    return this.constraintValues != null ? (this.constraintValues.left = null, this.constraintValues.right = null, this.constraintValues.top = null, this.constraintValues.bottom = null, this.constraintValues.centerAnchorX = 0.5, this.constraintValues.centerAnchorY = 0.5, this._layoutX(), this._layoutY()) : this.frame = this.centerFrame(), this;
  }
  centerX(e) {
    return e == null && (e = 0), this.constraintValues != null ? (this.constraintValues.left = null, this.constraintValues.right = null, this.constraintValues.centerAnchorX = 0.5, this._layoutX()) : this.x = this.centerFrame().x + e, this;
  }
  centerY(e) {
    return e == null && (e = 0), this.constraintValues != null ? (this.constraintValues.top = null, this.constraintValues.bottom = null, this.constraintValues.centerAnchorY = 0.5, this._layoutY()) : this.y = this.centerFrame().y + e, this;
  }
  pixelAlign() {
    return this.x = parseInt(this.x), this.y = parseInt(this.y);
  }
  updateForDevicePixelRatioChange() {
    return [
      "width",
      "height",
      "webkitTransform",
      "boxShadow",
      "textShadow",
      "webkitFilter",
      "borderRadius",
      "borderWidth",
      "fontSize",
      "letterSpacing",
      "wordSpacing",
      "textIndent"
    ].map(
      (e) => this._element.style[e] = LayerStyle[e](this)
    );
  }
  updateForSizeChange() {
    return this._elementBorder.style.borderWidth = LayerStyle.borderWidth(this);
  }
  //#############################################################
  // SCREEN GEOMETRY
  // TODO: Rotation/Skew
  // screenOriginX = ->
  // 	if @_parentOrContext()
  // 		return @_parentOrContext().screenOriginX()
  // 	return @originX
  // screenOriginY = ->
  // 	if @_parentOrContext()
  // 		return @_parentOrContext().screenOriginY()
  // 	return @originY
  canvasScaleX(e) {
    e == null && (e = !0);
    let i = 1;
    e && (i = this.scale * this.scaleX);
    for (var n of Array.from(this.containers(!0)))
      i *= n.scale, n.scaleX != null && (i *= n.scaleX);
    return i;
  }
  canvasScaleY(e) {
    e == null && (e = !0);
    let i = 1;
    e && (i = this.scale * this.scaleY);
    for (var n of Array.from(this.containers(!0)))
      i *= n.scale, n.scaleY != null && (i *= n.scaleY);
    return i;
  }
  screenScaleX(e) {
    e == null && (e = !0);
    let i = 1;
    e && (i = this.scale * this.scaleX);
    for (var n of Array.from(this.containers(!1)))
      i *= n.scale * n.scaleX;
    return i;
  }
  screenScaleY(e) {
    e == null && (e = !0);
    let i = 1;
    e && (i = this.scale * this.scaleY);
    for (var n of Array.from(this.containers(!1)))
      i *= n.scale * n.scaleY;
    return i;
  }
  screenScaledFrame() {
    const e = {
      x: 0,
      y: 0,
      width: this.width * this.screenScaleX(),
      height: this.height * this.screenScaleY()
    }, i = this.containers(!0);
    i.push(this), i.reverse();
    for (var n of Array.from(i)) {
      var r, s, a, o = parentOrContext(n), l = (r = __guardMethod__(o, "screenScaleX", (f) => f.screenScaleX())) != null ? r : 1, u = (s = __guardMethod__(
        o,
        "screenScaleY",
        (f) => f.screenScaleY()
      )) != null ? s : 1, c = (a = typeof n.scaledFrame == "function" ? n.scaledFrame() : void 0) != null ? a : { x: 0, y: 0 };
      e.x += c.x * l, e.y += c.y * u;
    }
    return e;
  }
  scaledFrame() {
    const { frame: e } = this, i = this.scale * this.scaleX, n = this.scale * this.scaleY;
    return e.width *= i, e.height *= n, e.x += (1 - i) * this.originX * this.width, e.y += (1 - n) * this.originY * this.height, e;
  }
  computedStyle() {
    let { getComputedStyle: e } = document.defaultView;
    return e == null && ({ getComputedStyle: e } = window), e(this._element);
  }
  //#############################################################
  // DOM ELEMENTS
  _createElement() {
    if (this._element == null)
      return this._element = document.createElement("div"), this._element.classList.add("framerLayer");
  }
  _createBorderElement() {
    if (this._elementBorder == null)
      return this._elementBorder = document.createElement("div"), this._elementBorder.style.position = "absolute", this._elementBorder.style.top = "0", this._elementBorder.style.bottom = "0", this._elementBorder.style.left = "0", this._elementBorder.style.right = "0", this._elementBorder.style.boxSizing = "border-box", this._elementBorder.style.zIndex = "1000", this._elementBorder.style.pointerEvents = "none", this._element.appendChild(this._elementBorder);
  }
  _insertElement() {
    return this.bringToFront(), this._context.element.appendChild(this._element);
  }
  // This method is called as soon as the @_element is part of the DOM
  // If layers are initialized before the DOM is complete,
  // the contexts calls this methods on all Layers as soon as it appends itself to the document
  elementInsertedIntoDocument() {
  }
  _createHTMLElementIfNeeded() {
    if (!this._elementHTML)
      return this._elementHTML = document.createElement("div"), this._element.insertBefore(this._elementHTML, this._elementBorder);
  }
  _updateHTMLScale() {
    if (this._elementHTML != null)
      return this.htmlIntrinsicSize == null ? this._elementHTML.style.zoom = this.context.scale : (this._elementHTML.style.transformOrigin = "0 0", this._elementHTML.style.transform = `scale(${this.context.scale * this.width / this.htmlIntrinsicSize.width}, ${this.context.scale * this.height / this.htmlIntrinsicSize.height})`, this._elementHTML.style.width = `${this.htmlIntrinsicSize.width}px`, this._elementHTML.style.height = `${this.htmlIntrinsicSize.height}px`);
  }
  querySelector(e) {
    return this._element.querySelector(e);
  }
  querySelectorAll(e) {
    return this._element.querySelectorAll(e);
  }
  selectChild(e) {
    return Utils$1.findLayer(this.descendants, e);
  }
  selectAllChildren(e) {
    return Utils$1.filterLayers(this.descendants, e);
  }
  static select(e) {
    return Framer.CurrentContext.selectLayer(e);
  }
  static selectAll(e) {
    return Framer.CurrentContext.selectAllLayers(e);
  }
  destroy() {
    return this.parent && (this.parent._children = lodash.without(this.parent._children, this)), this._element.parentNode != null && this._element.parentNode.removeChild(this._element), this.removeAllListeners(), this._context.removeLayer(this), this._context.emit("layer:destroy", this), this._context.domEventManager.remove(this._element);
  }
  //#############################################################
  //# COPYING
  copy() {
    const e = this.copySingle();
    for (var i of Array.from(this._children)) {
      var n = i.copy();
      n !== null && (n.parent = e);
    }
    return e;
  }
  copySingle() {
    const e = new this.constructor(this.props);
    return e.style = this.style, e;
  }
  //#############################################################
  //# IMAGE
  _cleanupImageLoader() {
    return this._imageEventManager != null && this._imageEventManager.removeAllListeners(), this._imageEventManager = null, this._imageLoader = null;
  }
  addChild(e) {
    return e.parent = this;
  }
  removeChild(e) {
    if (Array.from(this._children).includes(e))
      return e.parent = null;
  }
  childrenWithName(e) {
    return lodash.filter(this.children, (i) => i.name === e);
  }
  siblingsWithName(e) {
    return lodash.filter(this.siblingLayers, (i) => i.name === e);
  }
  // Get all containers of this layer, including containing contexts
  // `toRoot` specifies if you want to bubble up across contexts,
  // so specifiying `false` will stop at the first context
  // and thus the results will never contain any context
  containers(e, i) {
    return e == null && (e = !1), i == null && (i = []), this.parent != null ? (i.push(this.parent), this.parent.containers(e, i)) : e ? (i.push(this.context), this.context.containers(!0, i)) : i;
  }
  ancestors() {
    return this.containers();
  }
  root() {
    return this.parent === null ? this : lodash.last(this.ancestors());
  }
  childrenAbove(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), lodash.filter(
      this.children,
      (r) => Utils$1.framePointForOrigin(r.frame, i, n).y < e.y
    );
  }
  childrenBelow(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), lodash.filter(
      this.children,
      (r) => Utils$1.framePointForOrigin(r.frame, i, n).y > e.y
    );
  }
  childrenLeft(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), lodash.filter(
      this.children,
      (r) => Utils$1.framePointForOrigin(r.frame, i, n).x < e.x
    );
  }
  childrenRight(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), lodash.filter(
      this.children,
      (r) => Utils$1.framePointForOrigin(r.frame, i, n).x > e.x
    );
  }
  _parentOrContext() {
    if (this.parent)
      return this.parent;
    if (this._context._parent)
      return this._context._parent;
  }
  addSubLayer(e) {
    return this.addChild(e);
  }
  removeSubLayer(e) {
    return this.removeChild(e);
  }
  subLayersByName(e) {
    return this.childrenWithName(e);
  }
  siblingLayersByName(e) {
    return this.siblingsWithName(e);
  }
  subLayersAbove(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), this.childrenAbove(e, i, n);
  }
  subLayersBelow(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), this.childrenBelow(e, i, n);
  }
  subLayersLeft(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), this.childrenLeft(e, i, n);
  }
  subLayersRight(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), this.childrenRight(e, i, n);
  }
  //#############################################################
  //# ANIMATION
  animate(e, i) {
    if (i == null && (i = {}), lodash.isString(e)) {
      const r = e;
      return i.options != null && ({ options: i } = i), this.states.machine.switchTo(r, i);
    }
    e = lodash.clone(e), e.properties != null && (i = e, { properties: e } = i, delete i.properties), e.options != null && (i = lodash.defaults({}, i, e.options), delete e.options), i = lodash.defaults({}, i, this.animationOptions), i.start == null && (i.start = !0);
    const n = new Animation$1(this, e, i);
    return i.start && n.start(), n;
  }
  stateCycle(...e) {
    let i;
    const n = lodash.flatten(e);
    return lodash.isObject(lodash.last(n)) && (i = n.pop()), this.animate(this.states.machine.next(n), i);
  }
  stateSwitch(e, i) {
    if (i == null && (i = {}), e == null)
      throw new Error("Missing required argument 'stateName' in stateSwitch()");
    return i.animate === !0 ? this.animate(e, i) : this.animate(e, lodash.defaults({}, i, { instant: !0 }));
  }
  animations(e) {
    return e == null && (e = !1), lodash.filter(this._context.animations, (i) => i.layer !== this ? !1 : e || !i.isPending);
  }
  animatingProperties() {
    const e = {};
    for (var i of Array.from(this.animations()))
      for (var n of Array.from(i.animatingProperties()))
        e[n] = i;
    return e;
  }
  animateStop() {
    return lodash.invokeMap(this.animations(), "stop"), this._draggable != null ? this._draggable.animateStop() : void 0;
  }
  //#############################################################
  //# INDEX ORDERING
  bringToFront() {
    let e = null;
    const i = (this.parent != null ? this.parent._children : void 0) != null ? this.parent != null ? this.parent._children : void 0 : this.context._layers;
    if (!(i.count <= 1)) {
      for (var n of Array.from(i))
        n !== this && (e == null && (e = n.index), n.index > e && (e = n.index));
      if (e != null)
        return this.index = e + 1;
    }
  }
  sendToBack() {
    let e = null;
    const i = (this.parent != null ? this.parent._children : void 0) != null ? this.parent != null ? this.parent._children : void 0 : this.context._layers;
    if (!(i.count <= 1)) {
      for (var n of Array.from(i))
        n !== this && (e == null && (e = n.index), n.index < e && (e = n.index));
      if (e != null)
        return this.index = e - 1;
    }
  }
  placeBefore(e) {
    if (Array.from(this.siblingLayers).includes(e)) {
      for (var i of Array.from(this.siblingLayers))
        i.index <= e.index && (i.index -= 1);
      return this.index = e.index + 1;
    }
  }
  placeBehind(e) {
    if (Array.from(this.siblingLayers).includes(e)) {
      for (var i of Array.from(this.siblingLayers))
        i.index >= e.index && (i.index += 1);
      return this.index = e.index - 1;
    }
  }
  emit(e, ...i) {
    if (!(this._cancelClickEventInDragSession && !this._draggable && [
      Events$5.Click,
      Events$5.Tap,
      Events$5.TapStart,
      Events$5.TapEnd,
      Events$5.LongPress,
      Events$5.LongPressStart,
      Events$5.LongPressEnd
    ].includes(e) && LayerDraggable._globalDidDrag === !0)) {
      if ((i[0] != null ? i[0].clientX : void 0) != null || (i[0] != null ? i[0].clientY : void 0) != null) {
        const r = i[0];
        let s = { x: r.clientX, y: r.clientY };
        if (r.point = Utils$1.convertPointFromContext(s, this, !0), r.contextPoint = Utils$1.convertPointFromContext(
          s,
          this.context,
          !0
        ), r.touches != null)
          for (var n of Array.from(r.touches))
            s = { x: n.clientX, y: n.clientY }, n.point = Utils$1.convertPointFromContext(s, this, !0), n.contextPoint = Utils$1.convertPointFromContext(
              s,
              this.context,
              !0
            );
      }
      return super.emit(e, ...Array.from(i), this);
    }
  }
  once(e, i) {
    return super.once(e, i), this._addListener(e, i);
  }
  addListener(e, i) {
    if (!e)
      throw Error("Layer.on needs a valid event name");
    if (!i)
      throw Error("Layer.on needs an event listener");
    return super.addListener(e, i), this._addListener(e, i);
  }
  removeListener(e, i) {
    if (!e)
      throw Error("Layer.off needs a valid event name");
    return super.removeListener(e, i), this._removeListener(e, i);
  }
  _addListener(e, i) {
    let n;
    if (lodash.startsWith(e, "change:") || (this.ignoreEvents = !1), (Utils$1.domValidEvent(this._element, e) || (n = e, Array.from(lodash.values(Gestures)).includes(n))) && !this._domEventManager.listeners(e).length)
      return this._domEventManager.addEventListener(e, (r) => this.emit(e, r));
  }
  _removeListener(e, i) {
    if (!this.listeners(e).length)
      return this._domEventManager.removeAllListeners(e);
  }
  _parentDraggableLayer() {
    for (var e of Array.from(this.ancestors()))
      if (e._draggable != null && e._draggable.enabled)
        return e;
    return null;
  }
  //#############################################################
  //# EVENT HELPERS
  onClick(e) {
    return this.on(Events$5.Click, e);
  }
  onDoubleClick(e) {
    return this.on(Events$5.DoubleClick, e);
  }
  onScrollStart(e) {
    return this.on(Events$5.ScrollStart, e);
  }
  onScroll(e) {
    return this.on(Events$5.Scroll, e);
  }
  onScrollEnd(e) {
    return this.on(Events$5.ScrollEnd, e);
  }
  onScrollAnimationDidStart(e) {
    return this.on(Events$5.ScrollAnimationDidStart, e);
  }
  onScrollAnimationDidEnd(e) {
    return this.on(Events$5.ScrollAnimationDidEnd, e);
  }
  onTouchStart(e) {
    return this.on(Events$5.TouchStart, e);
  }
  onTouchEnd(e) {
    return this.on(Events$5.TouchEnd, e);
  }
  onTouchMove(e) {
    return this.on(Events$5.TouchMove, e);
  }
  onMouseUp(e) {
    return this.on(Events$5.MouseUp, e);
  }
  onMouseDown(e) {
    return this.on(Events$5.MouseDown, e);
  }
  onMouseOver(e) {
    return this.on(Events$5.MouseOver, e);
  }
  onMouseOut(e) {
    return this.on(Events$5.MouseOut, e);
  }
  onMouseEnter(e) {
    return this.on(Events$5.MouseEnter, e);
  }
  onMouseLeave(e) {
    return this.on(Events$5.MouseLeave, e);
  }
  onMouseMove(e) {
    return this.on(Events$5.MouseMove, e);
  }
  onMouseWheel(e) {
    return this.on(Events$5.MouseWheel, e);
  }
  onAnimationStart(e) {
    return this.on(Events$5.AnimationStart, e);
  }
  onAnimationStop(e) {
    return this.on(Events$5.AnimationStop, e);
  }
  onAnimationEnd(e) {
    return this.on(Events$5.AnimationEnd, e);
  }
  onAnimationDidStart(e) {
    return this.on(Events$5.AnimationDidStart, e);
  }
  // Deprecated
  onAnimationDidStop(e) {
    return this.on(Events$5.AnimationDidStop, e);
  }
  // Deprecated
  onAnimationDidEnd(e) {
    return this.on(Events$5.AnimationDidEnd, e);
  }
  // Deprecated
  onImageLoaded(e) {
    return this.on(Events$5.ImageLoaded, e);
  }
  onImageLoadError(e) {
    return this.on(Events$5.ImageLoadError, e);
  }
  onImageLoadCancelled(e) {
    return this.on(Events$5.ImageLoadCancelled, e);
  }
  onMove(e) {
    return this.on(Events$5.Move, e);
  }
  onDragStart(e) {
    return this.on(Events$5.DragStart, e);
  }
  onDragWillMove(e) {
    return this.on(Events$5.DragWillMove, e);
  }
  onDragMove(e) {
    return this.on(Events$5.DragMove, e);
  }
  onDragDidMove(e) {
    return this.on(Events$5.DragDidMove, e);
  }
  onDrag(e) {
    return this.on(Events$5.Drag, e);
  }
  onDragEnd(e) {
    return this.on(Events$5.DragEnd, e);
  }
  onDragAnimationStart(e) {
    return this.on(Events$5.DragAnimationStart, e);
  }
  onDragAnimationEnd(e) {
    return this.on(Events$5.DragAnimationEnd, e);
  }
  onDirectionLockStart(e) {
    return this.on(Events$5.DirectionLockStart, e);
  }
  onStateSwitchStart(e) {
    return this.on(Events$5.StateSwitchStart, e);
  }
  onStateSwitchStop(e) {
    return this.on(Events$5.StateSwitchStop, e);
  }
  onStateSwitchEnd(e) {
    return this.on(Events$5.StateSwitchEnd, e);
  }
  onStateWillSwitch(e) {
    return this.on(Events$5.StateSwitchStart, e);
  }
  // Deprecated
  onStateDidSwitch(e) {
    return this.on(Events$5.StateSwitchEnd, e);
  }
  // Deprecated
  // Gestures
  // Tap
  onTap(e) {
    return this.on(Events$5.Tap, e);
  }
  onTapStart(e) {
    return this.on(Events$5.TapStart, e);
  }
  onTapEnd(e) {
    return this.on(Events$5.TapEnd, e);
  }
  onDoubleTap(e) {
    return this.on(Events$5.DoubleTap, e);
  }
  // Force Tap
  onForceTap(e) {
    return this.on(Events$5.ForceTap, e);
  }
  onForceTapChange(e) {
    return this.on(Events$5.ForceTapChange, e);
  }
  onForceTapStart(e) {
    return this.on(Events$5.ForceTapStart, e);
  }
  onForceTapEnd(e) {
    return this.on(Events$5.ForceTapEnd, e);
  }
  // Press
  onLongPress(e) {
    return this.on(Events$5.LongPress, e);
  }
  onLongPressStart(e) {
    return this.on(Events$5.LongPressStart, e);
  }
  onLongPressEnd(e) {
    return this.on(Events$5.LongPressEnd, e);
  }
  // Swipe
  onSwipe(e) {
    return this.on(Events$5.Swipe, e);
  }
  onSwipeStart(e) {
    return this.on(Events$5.SwipeStart, e);
  }
  onSwipeEnd(e) {
    return this.on(Events$5.SwipeEnd, e);
  }
  onSwipeUp(e) {
    return this.on(Events$5.SwipeUp, e);
  }
  onSwipeUpStart(e) {
    return this.on(Events$5.SwipeUpStart, e);
  }
  onSwipeUpEnd(e) {
    return this.on(Events$5.SwipeUpEnd, e);
  }
  onSwipeDown(e) {
    return this.on(Events$5.SwipeDown, e);
  }
  onSwipeDownStart(e) {
    return this.on(Events$5.SwipeDownStart, e);
  }
  onSwipeDownEnd(e) {
    return this.on(Events$5.SwipeDownEnd, e);
  }
  onSwipeLeft(e) {
    return this.on(Events$5.SwipeLeft, e);
  }
  onSwipeLeftStart(e) {
    return this.on(Events$5.SwipeLeftStart, e);
  }
  onSwipeLeftEnd(e) {
    return this.on(Events$5.SwipeLeftEnd, e);
  }
  onSwipeRight(e) {
    return this.on(Events$5.SwipeRight, e);
  }
  onSwipeRightStart(e) {
    return this.on(Events$5.SwipeRightStart, e);
  }
  onSwipeRightEnd(e) {
    return this.on(Events$5.SwipeRightEnd, e);
  }
  // Pan
  onPan(e) {
    return this.on(Events$5.Pan, e);
  }
  onPanStart(e) {
    return this.on(Events$5.PanStart, e);
  }
  onPanEnd(e) {
    return this.on(Events$5.PanEnd, e);
  }
  onPanLeft(e) {
    return this.on(Events$5.PanLeft, e);
  }
  onPanRight(e) {
    return this.on(Events$5.PanRight, e);
  }
  onPanUp(e) {
    return this.on(Events$5.PanUp, e);
  }
  onPanDown(e) {
    return this.on(Events$5.PanDown, e);
  }
  // Pinch
  onPinch(e) {
    return this.on(Events$5.Pinch, e);
  }
  onPinchStart(e) {
    return this.on(Events$5.PinchStart, e);
  }
  onPinchEnd(e) {
    return this.on(Events$5.PinchEnd, e);
  }
  // Scale
  onScale(e) {
    return this.on(Events$5.Scale, e);
  }
  onScaleStart(e) {
    return this.on(Events$5.ScaleStart, e);
  }
  onScaleEnd(e) {
    return this.on(Events$5.ScaleEnd, e);
  }
  // Rotate
  onRotate(e) {
    return this.on(Events$5.Rotate, e);
  }
  onRotateStart(e) {
    return this.on(Events$5.RotateStart, e);
  }
  onRotateEnd(e) {
    return this.on(Events$5.RotateEnd, e);
  }
  //#############################################################
  //# HINT
  _showHint(e) {
    if (!this.visible || this.opacity === 0)
      return;
    if (!this.shouldShowHint(e)) {
      for (var i of Array.from(this.children))
        i._showHint(e);
      return null;
    }
    let n = this.canvasFrame;
    for (var r of Array.from(this.ancestors()))
      if (r.clip && (n = Utils$1.frameIntersection(n, r.canvasFrame)), !n)
        return;
    return this.showHint(n), lodash.invokeMap(this.children, "_showHint");
  }
  willSeemToDoSomething() {
    return !(this.ignoreEvents || this._draggable && this._draggable.isDragging === !1 && this._draggable.isMoving === !1);
  }
  shouldShowHint() {
    if (this.ignoreEvents === !0 || this.isAnimating)
      return !1;
    for (var e of Array.from(this.ancestors()))
      if (e.isAnimating)
        return !1;
    if (this._draggable && this._draggable.horizontal === !1 && this._draggable.vertical === !1 || this.opacity === 0)
      return !1;
    for (var i of Array.from(this.listenerEvents()))
      if (Events$5.isInteractive(i))
        return !0;
    return !1;
  }
  showHint(e) {
    const i = new Q({
      frame: Utils$1.frameInset(e, -1),
      backgroundColor: null,
      borderColor: Framer.Defaults.Hints.color,
      borderRadius: this.borderRadius * Utils$1.average([this.canvasScaleX(), this.canvasScaleY()]),
      borderWidth: 3
    });
    return this._draggable && (i.backgroundColor = null), Utils$1.frameInFrame(this.context.canvasFrame, e) && (i.backgroundColor = null), i.animate({
      properties: { opacity: 0 },
      curve: "ease-out",
      time: 0.5
    }).onAnimationEnd(() => i.destroy());
  }
  //#############################################################
  //# DESCRIPTOR
  toName() {
    return this.name ? name : (this.__framerInstanceInfo != null ? this.__framerInstanceInfo.name : void 0) || "";
  }
  toInspect(e) {
    e == null && (e = this.constructor.name);
    const i = this.name ? `name:${this.name} ` : "";
    return `<${e} ${this.toName()} id:${this.id} ${i} (${Utils$1.roundWhole(this.x)}, ${Utils$1.roundWhole(this.y)}) ${Utils$1.roundWhole(this.width)}x${Utils$1.roundWhole(this.height)}>`;
  }
};
Layer$1.initClass();
function __guardMethod__(t, e, i) {
  if (typeof t < "u" && t !== null && typeof t[e] == "function")
    return i(t, e);
}
class BackgroundLayer extends Layer$1 {
  constructor(e) {
    this.layout = this.layout.bind(this), e == null && (e = {}), e.backgroundColor == null && (e.backgroundColor = "#fff"), console.warn(
      `BackgroundLayer is deprecated, please use

Screen.backgroundColor = "${e.backgroundColor}"

instead.`
    ), super(e), this.sendToBack(), this.layout(), this._context.domEventManager.wrap(window).addEventListener("resize", this.layout), Framer.Device != null && Framer.Device.on("change:orientation", this.layout);
  }
  layout() {
    return this.parent ? this.frame = this.parent.frame : this.frame = this._context.frame;
  }
}
class VideoLayer extends Layer$1 {
  constructor(e = {}) {
    super(e), this.player = document.createElement("video"), this.player.setAttribute("webkit-playsinline", "true"), this.player.setAttribute("playsinline", ""), this.player.style.width = "100%", this.player.style.height = "100%", this.player.on = this._context?.domEventManager?.wrap(
      this.player
    ).addEventListener, this.player.off = this._context?.domEventManager?.wrap(
      this.player
    ).removeEventListener, e.video && (this.video = e.video), this._element.appendChild(this.player);
  }
}
VideoLayer.define("video", {
  get() {
    return this.player.src;
  },
  set(t) {
    this.player.src = t;
  }
});
let _svgMeasureElement = null;
const denyCopy = () => Utils$1.throwInStudioOrWarnInProduction(
  "SVGGroup and SVGPath do not support the `copy` method"
), getSVGMeasureElement = (t = {}) => {
  for (_svgMeasureElement || (_svgMeasureElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  ), _svgMeasureElement.id = "_svgMeasure", Object.assign(_svgMeasureElement.style, {
    position: "fixed",
    visibility: "hidden",
    top: "-10000px",
    left: "-10000px"
  }), document.body ? document.body.appendChild(_svgMeasureElement) : (document.write(_svgMeasureElement.outerHTML), _svgMeasureElement = document.getElementById("_svgMeasure"))); _svgMeasureElement.firstChild; )
    _svgMeasureElement.removeChild(_svgMeasureElement.lastChild);
  return _svgMeasureElement;
}, originTransform = (t, e, i) => {
  const n = i === "originX" ? "width" : i === "originY" ? "height" : null;
  if (!n) return t;
  const r = e[n], s = e._svgSize[n];
  return !(r >= 0) || !(s > 0) ? t : r / s * t;
};
class SVGBaseLayer extends Layer$1 {
  static initClass() {
    this.define("parent", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this._parent instanceof SVGLayer ? this._parent.parent : this._parent ?? null;
      }
    }), this.define("html", { get: () => this._element.outerHTML || "" }), this.define("width", { get: () => this._width }), this.define("height", { get: () => this._height }), this.define(
      "originX",
      layerProperty(
        this,
        "originX",
        "webkitTransformOrigin",
        0.5,
        Number.isFinite,
        originTransform
      )
    ), this.define(
      "originY",
      layerProperty(
        this,
        "originY",
        "webkitTransformOrigin",
        0.5,
        Number.isFinite,
        originTransform
      )
    ), this.undefine([
      "label",
      "blending",
      "image",
      "blur",
      "brightness",
      "saturate",
      "hueRotate",
      "contrast",
      "invert",
      "grayscale",
      "sepia",
      "backgroundBlur",
      "backgroundBrightness",
      "backgroundSaturate",
      "backgroundHueRotate",
      "backgroundContrast",
      "backgroundInvert",
      "backgroundGrayscale",
      "backgroundSepia",
      ...Array.from({ length: 9 }, (e, i) => `shadow${i + 1}`),
      "shadows",
      "borderRadius",
      "cornerRadius",
      "borderStyle",
      "constraintValues",
      "htmlIntrinsicSize",
      "gradient"
    ]), this.alias("borderColor", "stroke"), this.alias("strokeColor", "stroke"), this.alias("borderWidth", "strokeWidth"), this.alias("backgroundColor", "fill"), this.alias("color", "fill"), [
      "addChild",
      "removeChild",
      "addSubLayer",
      "removeSubLayer",
      "bringToFront",
      "sendToBack",
      "placeBefore",
      "placeBehind"
    ].forEach((e) => this.prototype[e] = void 0);
  }
  static alias(e, i) {
    return this.define(e, {
      get() {
        return this[i];
      },
      set(n) {
        this.__applyingDefaults || (this[i] = n);
      }
    });
  }
  constructor(e = {}) {
    super(e), this.updateForDevicePixelRatioChange = this.updateForDevicePixelRatioChange.bind(this), this.resetViewbox = this.resetViewbox.bind(this);
    const { element: i } = e;
    this._element = i, this._elementBorder = i, this._elementHTML = i, this._parent = e.parent, delete e.parent, delete e.element, this._parent instanceof SVGLayer ? (this._stylesAppliedToParent = [
      "webkitTransform",
      "webkitTransformOrigin"
    ], [
      "x",
      "y",
      "z",
      "scaleX",
      "scaleY",
      "scaleZ",
      "scale",
      "skewX",
      "skewY",
      "skew",
      "rotationX",
      "rotationY",
      "rotationZ",
      "force2d",
      "originX",
      "originY"
    ].forEach((s) => {
      e[s] == null && (e[s] = this._parent[s]);
    })) : this._pixelMultiplierOverride = 1;
    let n = this._parent;
    for (; n && !(n instanceof SVGLayer); )
      n = n._parent;
    this._svgLayer = n, this._svg = n.svg, this._svgSize = n.size;
    const r = [
      "fill",
      "stroke",
      "stroke-width",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-dasharray",
      "stroke-dashoffset",
      "name",
      "opacity"
    ];
    if (Object.assign(
      e,
      this.constructor.attributesFromElement(r, i)
    ), this._element.transform.baseVal.numberOfItems > 0) {
      let s, a = [];
      e.x ?? (e.x = 0), e.y ?? (e.y = 0), e.rotationZ ?? (e.rotationZ = 0);
      for (let o = 0; o < this._element.transform.baseVal.numberOfItems; o++) {
        s = this._element.transform.baseVal.getItem(o);
        const { matrix: l } = s;
        switch (s.type) {
          case 2:
            e.x += l.e, e.y += l.f, a.push(o);
            break;
          case 4:
            e.rotationZ += -(Math.atan2(l.c, l.d) / Math.PI) * 180, a.push(o);
            break;
        }
      }
      a.reverse().forEach((o) => this._element.transform.baseVal.removeItem(o));
    }
    this.calculateSize(), super(e), this.resetViewbox(), [
      "frame",
      "stroke",
      "strokeWidth",
      "strokeLinecap",
      "strokeLinejoin",
      "strokeMiterlimit",
      "strokeDasharray",
      "strokeDashoffset",
      "rotation",
      "scale"
    ].forEach((s) => this.on(`change:${s}`, this.resetViewbox));
  }
  calculateSize() {
    let e, i, n = null, r = 1, s = 1, a = this._element;
    if (typeof Framer < "u" && Framer?.CurrentContext?.elementInDOM)
      r = this._parent.canvasScaleX(), s = this._parent.canvasScaleY();
    else {
      e = a.parentElement, i = a.nextSibling;
      const l = getSVGMeasureElement();
      l.appendChild(a), n = l.firstChild, a = n;
    }
    const o = a.getBoundingClientRect();
    this._width = o.width / r, this._height = o.height / s, n && (i ? e.insertBefore(n, i) : e.appendChild(n));
  }
  resetViewbox() {
    this._svg.setAttribute("viewBox", `0,0,${this.width},${this.height}`), this._svg.removeAttribute("viewBox");
  }
  updateForDevicePixelRatioChange() {
    ["width", "height", "webkitTransform"].forEach((e) => {
      this._element.style[e] = LayerStyle[e](this);
    });
  }
  copy() {
    return denyCopy();
  }
  copySingle() {
    return denyCopy();
  }
  static attributesFromElement(e, i) {
    const n = {};
    for (const r of e) {
      const s = r.replace(
        /-([a-z])/g,
        (a, o) => o.toUpperCase()
      );
      n[s] = i.getAttribute(r);
    }
    return n;
  }
}
SVGBaseLayer.initClass();
const dasharrayTransform = (t) => typeof t == "string" ? (t.includes(",") ? t.split(",") : t.split(" ")).map((i) => parseFloat(i.trim())).filter((i) => !isNaN(i)) : t, dashoffsetTransform = (t) => {
  const e = parseFloat(t);
  return isNaN(e) ? null : e;
};
class SVGPath extends SVGBaseLayer {
  static initClass() {
    const e = (n, r, s, a = {}) => this.define(
      n,
      layerProperty(this, n, n, null, r, s, a)
    );
    e("fill", SVG.validFill, SVG.toFill), e("stroke", SVG.validFill, SVG.toFill), e("strokeWidth", Number.isFinite, parseFloat), e("strokeLinecap", (n) => typeof n == "string"), e("strokeLinejoin", (n) => typeof n == "string"), e("strokeMiterlimit", Number.isFinite, parseFloat), e("strokeOpacity", Number.isFinite, parseFloat), e("strokeDasharray", Array.isArray, dasharrayTransform), e("strokeDashoffset", Number.isFinite, dashoffsetTransform), this.define(
      "strokeLength",
      layerProperty(
        this,
        "strokeLength",
        null,
        void 0,
        Number.isFinite,
        (n, r) => Math.max(0, Math.min(n, r.length)),
        {},
        (n, r) => {
          const s = n.strokeStart ?? 0;
          let a = s + r;
          return a > n.length && (a -= n.length), Object.assign(n._properties, {
            strokeStart: s,
            strokeEnd: a,
            strokeFraction: r / n.length
          }), n.updateStroke();
        }
      )
    ), this.define(
      "strokeFraction",
      layerProperty(
        this,
        "strokeFraction",
        null,
        void 0,
        Number.isFinite,
        (n, r) => Math.max(0, Math.min(n, 1)),
        {},
        (n, r) => n.strokeLength = n.length * r
      )
    );
    const i = (n, r, s = !0) => {
      const a = n.strokeStart ?? 0, o = n.strokeEnd ?? n.strokeLength;
      if (s) {
        const l = o ?? n.length;
        n.strokeLength = l >= r ? l - r : n.length - r + l;
      } else
        n.strokeLength = r >= a ? r - a : n.length - a + r;
    };
    this.define(
      "strokeStart",
      layerProperty(
        this,
        "strokeStart",
        null,
        void 0,
        Number.isFinite,
        (n, r) => Math.max(0, Math.min(n, r.length)),
        {},
        (n, r) => i(n, r, !0)
      )
    ), this.define(
      "strokeEnd",
      layerProperty(
        this,
        "strokeEnd",
        null,
        void 0,
        Number.isFinite,
        (n, r) => Math.max(0, Math.min(n, r.length)),
        {},
        (n, r) => i(n, r, !1)
      )
    ), this.define("length", {
      get() {
        return this._length;
      }
    }), this.define("reversed", this.simpleProperty("reversed", !1));
  }
  constructor(e, i = {}) {
    if (super({ element: e, ...i }), e instanceof SVGPath && (e = e.element), e instanceof SVGPathElement)
      this._path = e;
    else if (e instanceof SVGUseElement) {
      const n = e.getAttribute("xlink:href");
      this._path = this._svg.querySelector(n);
    }
    this._length = this._path.getTotalLength();
  }
  updateStroke() {
    const e = this.strokeStart ?? 0, i = this.strokeEnd ?? this.length;
    let n = [], r;
    if (i === e)
      e && n.push(0, e), r = this.length - i, r && n.push(0, r);
    else if (i < e) {
      const s = e - i;
      r = this.length - e, n.push(i, s), r && n.push(r, 0);
    } else {
      const s = i - e;
      r = this.length - i, e && n.push(0, e), (s !== this.length || s !== 0 || e === 0) && (n.push(s), s !== r && r && n.push(r));
    }
    this.reversed && (n.length % 2 === 0 && n.push(0), n.reverse()), this.strokeDasharray = n;
  }
  pointAtFraction(e) {
    return this.reversed && (e = 1 - e), this._path.getPointAtLength(this.length * e);
  }
  rotationAtFraction(e, i = 0.01) {
    this.reversed && (e = 1 - e), i = Math.max(i, 0.01);
    const n = this.pointAtFraction(Math.max(e - i, 0)), r = this.pointAtFraction(Math.min(e + i, 1));
    let s = Math.atan2(n.y - r.y, n.x - r.x) * 180 / Math.PI - 90;
    return this.reversed && (s = 360 - s), s;
  }
  start(e = null) {
    const i = this.convertPointToLayer(
      this.pointAtFraction(0),
      e?.parent,
      !1
    );
    return i.rotation = this.rotationAtFraction(0), i;
  }
  end(e = null) {
    const i = this.convertPointToLayer(
      this.pointAtFraction(1),
      e?.parent,
      !1
    );
    return i.rotation = this.rotationAtFraction(1), i;
  }
  valueUpdater(e, i, n) {
    switch (e) {
      case "horizontal":
        return n -= this.pointAtFraction(0).x, (r, s) => i[r] = n + this.pointAtFraction(s).x;
      case "vertical":
        return n -= this.pointAtFraction(0).y, (r, s) => i[r] = n + this.pointAtFraction(s).y;
      case "angle":
        return n -= this.rotationAtFraction(0), (r, s, a = 0) => {
          a !== 0 && (i[r] = n + this.rotationAtFraction(s, a));
        };
    }
  }
}
SVGPath.initClass();
class SVGGroup extends SVGBaseLayer {
  static initClass() {
    this.defineGroupProxyProp("fill"), this.defineGroupProxyProp("stroke"), this.defineGroupProxyProp("strokeWidth", Number.isFinite, parseInt), this.defineGroupProxyProp(
      "strokeWidthMultiplier",
      Number.isFinite,
      parseInt
    ), this.defineGroupProxyProp(
      "ignoreEvents",
      (e) => typeof e == "boolean",
      (e) => !!e
    );
  }
  constructor(e, i = {}) {
    i.element = e, super(i);
    const { children: n, targets: r } = SVG.constructSVGElements(
      this,
      this._element.childNodes,
      SVGPath,
      SVGGroup
    );
    this._children = n, this.elements = r, SVG.updateGradientSVG(this);
  }
  static defineGroupProxyProp(e, i = SVG.validFill, n = SVG.toFill) {
    const r = `_${e}`;
    return this.define(e, {
      get() {
        if (this[r] != null) return this[r];
        let s = null;
        for (const a of this._children) {
          const o = a[e];
          if (s === null)
            s = o;
          else if (!Utils$1.equal(o, s))
            return this[r] ?? null;
        }
        return s;
      },
      set(s) {
        i(s) || (s = n(s)), this[r] = i(s) ? s : null;
        const a = this[r];
        this._children.forEach(
          (o) => o[e] = a
        );
      }
    });
  }
}
SVGGroup.initClass();
const updateIdsToBeUnique = function(t) {
  const e = Utils$1.getIdAttributesFromString(t);
  for (var i of Array.from(e)) {
    var n = Utils$1.getUniqueId(i);
    i !== n && (i = Utils$1.escapeForRegex(i), t = t.replace(
      new RegExp(`((id|xlink:href)=["'']\\#?)${i}(["'])`, "g"),
      `$1${n}$3`
    ), t = t.replace(
      new RegExp(`(["'']url\\(\\#)${i}(\\)["'])`, "g"),
      `$1${n}$2`
    ));
  }
  return t;
};
let SVGLayer$1 = class extends Layer$1 {
  static initClass() {
    this.define("elements", this.simpleProperty("elements", {})), this.define(
      "fill",
      layerProperty(this, "fill", "fill", null, SVG.validFill, SVG.toFill)
    ), this.define(
      "stroke",
      layerProperty(this, "stroke", "stroke", null, SVG.validFill, SVG.toFill)
    ), this.define(
      "strokeWidthMultiplier",
      layerProperty(this, "strokeWidthMultiplier", null, null, lodash.isNumber)
    ), this.define(
      "strokeWidth",
      layerProperty(
        this,
        "strokeWidth",
        "strokeWidth",
        null,
        lodash.isNumber,
        null,
        { depends: ["strokeWidthMultiplier"] }
      )
    ), this.define(
      "color",
      layerProperty(
        this,
        "color",
        "color",
        null,
        Color$1.validColorValue,
        Color$1.toColor,
        null,
        (e, i) => e.fill = i,
        "_elementHTML",
        !0
      )
    ), this.define("gradient", {
      get() {
        return Gradient.isGradientObject(this._gradient) ? layerProxiedValue(this._gradient, this, "gradient") : null;
      },
      set(e) {
        return Gradient.isGradient(e) ? this._gradient = new Gradient(e) : !e && Gradient.isGradientObject(this._gradient) && (this._gradient = null), SVG.updateGradientSVG(this);
      }
    }), this.define("image", {
      get() {
        return this._image;
      },
      set(e) {
        return this._image = e, SVG.updateImagePatternSVG(this);
      }
    }), this.define("imageSize", {
      importable: !0,
      exportable: !0,
      default: null,
      get() {
        return this._getPropertyValue("imageSize");
      },
      set(e) {
        return e === null ? this._setPropertyValue("imageSize", e) : !lodash.isFinite(e.width) || !lodash.isFinite(e.height) ? void 0 : (this._setPropertyValue("imageSize", {
          width: e.width,
          height: e.height
        }), SVG.updateImagePatternSVG(this));
      }
    }), this.define("svg", {
      get() {
        const e = lodash.first(
          this._elementHTML != null ? this._elementHTML.children : void 0
        );
        return e instanceof SVGElement ? e : null;
      },
      set(e) {
        if (typeof e == "string")
          return this.html = updateIdsToBeUnique(e);
        if (e instanceof SVGElement) {
          const r = e.querySelectorAll("[id]");
          for (var i of Array.from(r)) {
            var n = document.querySelector(
              `[id='${i.id}']`
            );
            if (n != null) {
              Utils$1.throwInStudioOrWarnInProduction(
                Layer$1.ExistingIdMessage("svg", i.id)
              );
              return;
            }
          }
          for (this._createHTMLElementIfNeeded(); this._elementHTML.firstChild; )
            this._elementHTML.removeChild(this._elementHTML.firstChild);
          return e.parentNode != null && (e = e.cloneNode(!0)), this._elementHTML.appendChild(e);
        }
      }
    });
  }
  constructor(e) {
    e == null && (e = {}), e.htmlIntrinsicSize != null && e.backgroundColor != null && (e.color == null && (e.color = e.backgroundColor), e.backgroundColor = null), e.clip == null && (e.clip = !1), (e.svg != null || e.html != null) && e.backgroundColor == null && (e.backgroundColor = null), super(e);
    const { svg: i } = this;
    if (i != null) {
      const { targets: n, children: r } = SVG.constructSVGElements(
        this,
        i.childNodes,
        SVGPath,
        SVGGroup
      );
      this.elements = n, this._children = r;
    } else
      this.elements = [];
    SVG.updateImagePatternSVG(this), SVG.updateGradientSVG(this), this.onChange("backgroundSize", () => SVG.updateImagePatternSVG(this)), this.onChange("image", () => SVG.updateImagePatternSVG(this));
  }
  copy() {
    return this.copySingle();
  }
  copySingle() {
    const { props: e } = this;
    e.html != null && e.svg != null && delete e.svg, e.html = updateIdsToBeUnique(e.html);
    const i = new this.constructor(e);
    return i.style = this.style, i;
  }
};
SVGLayer$1.initClass();
let _measureElement = null;
const getMeasureElement = function(t) {
  for (t == null && (t = {}), !_measureElement && (_measureElement = document.createElement("div"), _measureElement.id = "_measureElement", _measureElement.style.position = "fixed", _measureElement.style.visibility = "hidden", _measureElement.style.top = "-10000px", _measureElement.style.left = "-10000px", window.document.body ? window.document.body.appendChild(_measureElement) : (document.write(_measureElement.outerHTML), _measureElement = document.getElementById("_measureElement"))); _measureElement.hasChildNodes(); )
    _measureElement.removeChild(_measureElement.lastChild);
  return _measureElement.style.width = "10000px", t.max ? (t.width && (_measureElement.style.maxWidth = `${t.width}px`), t.height && (_measureElement.style.maxHeight = `${t.height}px`)) : (t.width && (_measureElement.style.width = `${t.width}px`), t.height && (_measureElement.style.height = `${t.height}px`)), _measureElement;
};
class InlineStyle {
  static initClass() {
    this.prototype.startIndex = 0, this.prototype.endIndex = 0, this.prototype.css = null, this.prototype.text = "", this.prototype.element = null;
  }
  constructor(e, i) {
    _.isString(e) ? (this.text = e, this.startIndex = 0, this.endIndex = this.text.length, this.css = i) : (this.startIndex = e.startIndex, this.endIndex = e.endIndex, this.css = e.css, this.text = i.substring(this.startIndex, this.endIndex));
  }
  copy() {
    const e = new InlineStyle(this.text, this.css);
    return e.startIndex = this.startIndex, e.endIndex = this.endIndex, e;
  }
  getOptions() {
    return {
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      css: _.clone(this.css)
    };
  }
  createElement(e) {
    const i = document.createElement("span");
    for (var n in this.css) {
      var r = this.css[n];
      i.style[n] = r;
    }
    return this.text === "" && e ? i.innerHTML = "<br/>" : i.textContent = this.text, i;
  }
  setText(e) {
    return this.text = e, this.endIndex = this.startIndex + e.length;
  }
  resetStyle(e) {
    if (delete this.css[e], e === "color")
      return delete this.css.WebkitTextFillColor;
  }
  setStyle(e, i) {
    return this.css[e] = i, this.element != null ? this.element.style[e] = i : void 0;
  }
  getStyle(e) {
    return e === "color" ? this.css.color != null ? this.css.color : this.css.WebkitTextFillColor : this.css[e];
  }
  measure() {
    const e = this.element.getBoundingClientRect();
    return {
      width: e.right - e.left,
      height: e.bottom - e.top
    };
  }
  replaceText(e, i) {
    let n = null;
    if (_.isString(e) ? n = new RegExp(Utils.escapeForRegex(e), "g") : e instanceof RegExp && (n = e), n != null)
      return this.text = this.text.replace(n, i), this.endIndex = this.startIndex + this.text.length;
  }
  addRangesFrom(e, i, n, r) {
    const { text: s } = this;
    for (e.lastIndex = 0; ; ) {
      var a = e.exec(s);
      if (!a)
        return;
      var o = a[1];
      if (!o)
        return;
      r[o] || (r[o] = {
        block: i,
        inline: n,
        start: a.index,
        length: a[0].length,
        name: o
      });
    }
  }
  replaceRange(e, i, n) {
    return this.text = this.text.slice(0, e) + n + this.text.slice(e + i), this.endIndex = this.startIndex + this.text.length;
  }
  validate() {
    return this.startIndex !== this.endIndex && this.endIndex === this.startIndex + this.text.length;
  }
}
InlineStyle.initClass();
class StyledTextBlock {
  static initClass() {
    this.prototype.text = "", this.prototype.inlineStyles = [], this.prototype.element = null;
  }
  constructor(e) {
    const { text: i } = e;
    if (this.text = i, e.inlineStyles != null)
      this.inlineStyles = e.inlineStyles.map(
        (n) => new InlineStyle(n, i)
      );
    else if (e.css != null) {
      const n = new InlineStyle(this.text, e.css);
      this.inlineStyles = [n];
    } else
      throw new Error("Should specify inlineStyles or css");
  }
  copy() {
    const e = new StyledTextBlock({ text: this.text, inlineStyles: [] });
    return e.inlineStyles = this.inlineStyles.map((i) => i.copy()), e;
  }
  getOptions() {
    return {
      text: this.text,
      inlineStyles: this.inlineStyles.map((e) => e.getOptions())
    };
  }
  createElement() {
    const e = document.createElement("div");
    e.style.fontSize = "1px", e.style.webkitFontSmoothing = "antialiased";
    const i = this.inlineStyles.length === 1;
    for (var n of Array.from(this.inlineStyles)) {
      var r = n.createElement(i);
      n.element = r, e.appendChild(r);
    }
    return e;
  }
  measure() {
    let e = 0;
    for (var i of Array.from(this.inlineStyles))
      e += i.measure().width;
    const n = this.element.getBoundingClientRect();
    return {
      width: e,
      height: n.bottom - n.top
    };
  }
  clone() {
    return new StyledTextBlock({
      text: "",
      css: _.clone(_.first(this.inlineStyles).css)
    });
  }
  setText(e) {
    this.text = e;
    const i = _.first(this.inlineStyles);
    return i.setText(e), this.inlineStyles = [i];
  }
  setTextOverflow(e, i) {
    return i == null && (i = 1), ["ellipsis", "clip"].includes(e) ? (this.setStyle("overflow", "hidden"), e === "ellipsis" ? (this.setStyle("WebkitLineClamp", i), this.setStyle("WebkitBoxOrient", "vertical"), this.setStyle("display", "-webkit-box")) : (this.resetStyle("WebkitLineClamp"), this.resetStyle("WebkitBoxOrient"), this.setStyle("display", "block"), this.setStyle("whiteSpace", "nowrap"), this.setStyle("textOverflow", e))) : (this.resetStyle("whiteSpace"), this.resetStyle("textOverflow"), this.resetStyle("display"), this.resetStyle("overflow"), this.resetStyle("WebkitLineClamp"), this.resetStyle("WebkitBoxOrient"));
  }
  resetStyle(e) {
    return this.inlineStyles.map(
      (i) => i.resetStyle(e)
    );
  }
  setStyle(e, i) {
    return this.inlineStyles.map(
      (n) => n.setStyle(e, i)
    );
  }
  getStyle(e) {
    return _.first(this.inlineStyles).getStyle(e);
  }
  getFonts() {
    const e = [];
    for (var i of Array.from(this.inlineStyles)) {
      var n = i.getStyle("fontFamily");
      n != null && e.push(n);
    }
    return e;
  }
  replaceText(e, i) {
    let n = 0;
    for (var r of Array.from(this.inlineStyles))
      r.startIndex = n, r.replaceText(e, i), n = r.endIndex;
    const s = this.inlineStyles.map((a) => a.text).join("");
    return this.text = s, s !== this.text;
  }
  addRangesFrom(e, i, n) {
    return this.inlineStyles.forEach(
      (r, s) => r.addRangesFrom(e, i, s, n)
    );
  }
  replaceRange(e, i, n, r) {
    let s = 0;
    for (let l = 0; l < this.inlineStyles.length; l++) {
      var a = this.inlineStyles[l];
      a.startIndex = s, l === e && a.replaceRange(i, n, r), s += a.text.length, a.endIndex = s;
    }
    const o = this.inlineStyles.map((l) => l.text).join("");
    return this.text = o;
  }
  validate() {
    let e = "", i = 0;
    for (var n of Array.from(this.inlineStyles)) {
      if (i !== n.startIndex || !n.validate())
        return !1;
      i = n.endIndex, e += n.text;
    }
    return this.text === e;
  }
}
StyledTextBlock.initClass();
class StyledText {
  static initClass() {
    this.prototype.blocks = null, this.prototype.textAlign = null, this.prototype.element = null, this.prototype.autoWidth = !1, this.prototype.autoHeight = !1, this.prototype.textOverflow = null, this.defaultStyles = {
      fontStyle: "normal",
      fontVariantCaps: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "normal",
      fontFamily: "-apple-system, BlinkMacSystemFont",
      outline: "none",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word"
    };
  }
  constructor(e) {
    this.textAlign = e?.alignment != null ? e?.alignment : "left", e?.blocks != null ? this.blocks = e.blocks.map((i) => new StyledTextBlock(i)) : this.blocks = [];
  }
  getOptions() {
    return {
      blocks: this.blocks.map((e) => e.getOptions()),
      alignment: this.textAlign
    };
  }
  static isStyledText(e) {
    return e?.blocks != null && e?.alignment != null && _.isArray(e.blocks) && _.isString(e.alignment);
  }
  setElement(e) {
    let i;
    if (e != null) {
      this.element = e;
      for (i in StyledText.defaultStyles) {
        var n = StyledText.defaultStyles[i];
        this.element.style[i] || (this.element.style[i] = n);
      }
      if (this.textAlign != null && !this.element.style.textAlign)
        return this.element.style.textAlign = this.textAlign;
    }
  }
  render() {
    if (this.element != null) {
      for (; this.element.hasChildNodes(); )
        this.element.removeChild(this.element.lastChild);
      return (() => {
        const e = [];
        for (var i of Array.from(this.blocks)) {
          var n = i.createElement();
          i.element = n, e.push(this.element.appendChild(n));
        }
        return e;
      })();
    }
  }
  addBlock(e, i = null) {
    let n;
    return i != null ? n = new StyledTextBlock({
      text: e,
      css: i
    }) : this.blocks.length > 0 ? (n = _.last(this.blocks).clone(), n.setText(e)) : n = new StyledTextBlock({
      text: e,
      css: {}
    }), this.blocks.push(n);
  }
  getText() {
    return this.blocks.map((e) => e.text).join(`
`);
  }
  setText(e) {
    const i = e.split(`
`);
    return this.blocks = this.blocks.slice(0, i.length), (() => {
      const n = [];
      for (let a = 0; a < i.length; a++) {
        var r = i[a];
        if (this.blocks[a] != null) {
          var s = this.blocks[a];
          n.push(s.setText(r));
        } else
          n.push(this.addBlock(r));
      }
      return n;
    })();
  }
  setTextOverflow(e) {
    return this.textOverflow = e;
  }
  setStyle(e, i) {
    return this.blocks.map((n) => n.setStyle(e, i));
  }
  resetStyle(e) {
    return this.blocks.map((i) => i.resetStyle(e));
  }
  getStyle(e, i = null) {
    let n;
    return (n = __guard__$2(
      i ?? _.first(this.blocks),
      (r) => r.getStyle(e)
    )) != null ? n : this.element != null ? this.element.style[e] : void 0;
  }
  getFonts() {
    let e = [];
    const i = this.element != null ? this.element.style.fontFamily : void 0;
    i != null && e.push(i);
    for (var n of Array.from(this.blocks))
      e = e.concat(n.getFonts());
    return _.uniq(e);
  }
  measure(e) {
    const i = {};
    i.width = e.width * e.multiplier, i.height = e.height * e.multiplier;
    const n = getMeasureElement(i);
    let r = 0, s = 0;
    const a = this.element.parentNode;
    n.appendChild(this.element);
    for (var o of Array.from(this.blocks)) {
      var l = o.measure();
      r = Math.max(r, l.width);
      var u = i.height != null ? i.height / e.multiplier : null;
      if (!this.autoWidth && this.textOverflow != null && ["clip", "ellipsis"].includes(this.textOverflow) && u != null && s + l.height > u) {
        var c = parseFloat(this.getStyle("fontSize", o)), f = parseFloat(this.getStyle("lineHeight", o)), p = u - s;
        if (p > 0) {
          var y = Math.max(
            1,
            Math.floor(p / (c * f))
          );
          o.setTextOverflow(this.textOverflow, y);
        } else
          o.setStyle("visibility", "hidden");
        l.height = p;
      } else
        o.setTextOverflow(null);
      s += l.height;
    }
    n.removeChild(this.element), a?.appendChild(this.element);
    const b = {};
    return this.autoWidth && (b.width = Math.ceil(r)), this.autoHeight && (b.height = Math.ceil(s)), b;
  }
  textReplace(e, i) {
    return this.blocks.map((n) => n.replaceText(e, i));
  }
  // must be called first, calling it repeatedly does nothing, returns the first name from the templates
  buildTemplate() {
    if (this._templateRanges)
      return this._firstTemplateName;
    const e = /\{\s*(\w+)\s*\}/g, i = {};
    this.blocks.forEach(
      (r, s) => r.addRangesFrom(e, s, i)
    ), this._templateRanges = Object.keys(i).map((r) => i[r]).sort(function(r, s) {
      const a = s.block - r.block;
      if (a !== 0)
        return a;
      const o = s.inline - r.inline;
      return o !== 0 ? o : s.start - r.start;
    });
    const n = this._templateRanges[this._templateRanges.length - 1];
    return this._firstTemplateName = n ? n.name : null, this._templateBlocks = this.blocks.map((r) => r.copy()), this._firstTemplateName;
  }
  template(e) {
    return this.blocks = this._templateBlocks.map((i) => i.copy()), (() => {
      const i = [];
      for (var n of Array.from(this._templateRanges)) {
        var r = e[n.name];
        if (r != null) {
          _.isFunction(n.formatter) && (r = n.formatter.call(this, r));
          var s = this.blocks[n.block];
          i.push(
            s.replaceRange(n.inline, n.start, n.length, r)
          );
        }
      }
      return i;
    })();
  }
  templateFormatter(e) {
    return (() => {
      const i = [];
      for (var n of Array.from(this._templateRanges)) {
        var r = e[n.name];
        r != null && i.push(n.formatter = r);
      }
      return i;
    })();
  }
  validate() {
    for (var e of Array.from(this.blocks))
      if (!e.validate())
        return !1;
    return !0;
  }
}
StyledText.initClass();
function __guard__$2(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
const validateFont = (t) => lodash.isString(t) || lodash.isObject(t), fontFamilyFromObject = function(t) {
  return lodash.isObject(t) ? t.fontFamily : t;
}, textProperty = (t, e, i, n, r, s) => layerProperty(
  t,
  e,
  e,
  i,
  n,
  r,
  {},
  s,
  "_elementHTML"
), asPadding = function(t) {
  if (lodash.isNumber(t))
    return t;
  if (!lodash.isObject(t))
    return 0;
  const e = {};
  let i = !1;
  t.horizontal != null && (t.left == null && (t.left = t.horizontal), t.right == null && (t.right = t.horizontal)), t.vertical != null && (t.top == null && (t.top = t.vertical), t.bottom == null && (t.bottom = t.vertical));
  for (var n of ["left", "right", "bottom", "top"])
    i || (i = lodash.has(t, n)), e[n] = t[n] != null ? t[n] : 0;
  return i ? e : 0;
};
class TextLayer extends Layer$1 {
  static initClass() {
    this._textProperties = [
      "text",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "lineHeight",
      "letterSpacing",
      "wordSpacing",
      "textAlign",
      "textTransform",
      "textIndent",
      "textDecoration",
      "textOverflow",
      "whiteSpace",
      "direction",
      "font",
      "borderWidth",
      "padding"
    ], this._textStyleProperties = lodash.pull(
      lodash.clone(TextLayer._textProperties),
      "text"
    ).concat(["color", "shadowX", "shadowY", "shadowBlur", "shadowColor"]), this.define("_styledText", {
      get() {
        return this.__styledText == null && (this.__styledText = new StyledText()), this.__styledText;
      },
      set(e) {
        if (e instanceof StyledText)
          return this.__styledText = e;
      }
    }), this.define("styledTextOptions", {
      get() {
        return this._styledText != null ? this._styledText.getOptions() : void 0;
      },
      set(e) {
        this._styledText = new StyledText(e), this._styledText.setElement(this._elementHTML);
        const i = this._styledText.getFonts(), n = Utils.isFontFamilyLoaded(i);
        if (lodash.isObject(n))
          return n.then(() => this.renderText());
      }
    }), this.define(
      "autoWidth",
      this.proxyProperty("_styledText.autoWidth", {
        didSet(e, i) {
          return e.renderText();
        }
      })
    ), this.define(
      "autoHeight",
      this.proxyProperty("_styledText.autoHeight", {
        didSet(e, i) {
          return e.renderText();
        }
      })
    ), this.define("autoSize", {
      get() {
        return this.autoWidth && this.autoHeight;
      },
      set(e) {
        return this.autoWidth = e, this.autoHeight = e, this.renderText();
      }
    }), this.define(
      "fontFamily",
      textProperty(
        this,
        "fontFamily",
        null,
        lodash.isString,
        fontFamilyFromObject,
        function(e, i) {
          if (i === null)
            return;
          e.font = i;
          const n = Utils.isFontFamilyLoaded(i);
          if (lodash.isObject(n))
            return n.then(() => setTimeout(e.renderText, 0));
        }
      )
    ), this.define("fontWeight", textProperty(this, "fontWeight", null)), this.define(
      "fontStyle",
      textProperty(this, "fontStyle", "normal", lodash.isString)
    ), this.define(
      "textDecoration",
      textProperty(this, "textDecoration", null, lodash.isString)
    ), this.define(
      "fontSize",
      textProperty(
        this,
        "fontSize",
        null,
        lodash.isNumber,
        null,
        function(e, i) {
          if (i === null || e.__constructor)
            return;
          const n = LayerStyle.fontSize(e);
          return e._styledText.setStyle("fontSize", n);
        }
      )
    ), this.define("textAlign", textProperty(this, "textAlign", null)), this.define(
      "letterSpacing",
      textProperty(this, "letterSpacing", null, lodash.isNumber)
    ), this.define(
      "lineHeight",
      textProperty(this, "lineHeight", null, lodash.isNumber)
    ), this.define(
      "wordSpacing",
      textProperty(this, "wordSpacing", null, lodash.isNumber)
    ), this.define(
      "textTransform",
      textProperty(this, "textTransform", "none", lodash.isString)
    ), this.define(
      "textIndent",
      textProperty(this, "textIndent", null, lodash.isNumber)
    ), this.define("wordWrap", textProperty(this, "wordWrap", null, lodash.isString)), this.define("textOverflow", {
      get() {
        return this._styledText.textOverflow;
      },
      set(e) {
        return this.clip = lodash.isString(e), this._styledText.setTextOverflow(e), this.renderText(!0);
      }
    }), this.define("truncate", {
      get() {
        return this.textOverflow === "ellipsis";
      },
      set(e) {
        return e ? (this.autoSize = !1, this.textOverflow = "ellipsis") : this.textOverflow = null;
      }
    }), this.define(
      "whiteSpace",
      textProperty(this, "whiteSpace", null, lodash.isString)
    ), this.define("direction", textProperty(this, "direction", null, lodash.isString)), this.define("html", {
      get() {
        return (this._elementHTML != null ? this._elementHTML.innerHTML : void 0) || "";
      }
    }), this.define(
      "font",
      layerProperty(
        this,
        "font",
        null,
        null,
        validateFont,
        null,
        {},
        function(e, i) {
          if (i !== null) {
            if (lodash.isObject(i)) {
              e.fontFamily = i.fontFamily, e.fontWeight = i.fontWeight;
              return;
            }
            return /\d/.test(i) ? e._styledText.setStyle("font", i) : e.fontFamily = i;
          }
        },
        "_elementHTML"
      )
    ), this.define("textDirection", {
      get() {
        return this.direction;
      },
      set(e) {
        return this.direction = e;
      }
    }), this.define(
      "padding",
      layerProperty(this, "padding", "padding", 0, null, asPadding)
    ), this.define("text", {
      get() {
        return this._styledText.getText();
      },
      set(e) {
        return lodash.isString(e) || (e = String(e)), this._styledText.setText(e), this.renderText(), this.emit("change:text", e);
      }
    }), this.define("template", {
      get() {
        return lodash.clone(this._templateData);
      },
      set(e) {
        this._templateData || (this._templateData = {});
        const i = this._styledText.buildTemplate();
        if (lodash.isObject(e))
          lodash.assign(this._templateData, e);
        else {
          if (!i)
            return;
          this._templateData[i] = e;
        }
        const n = this.text;
        if (this._styledText.template(this._templateData), this.text !== n)
          return this.renderText(), this.emit("change:text", this.text);
      }
    }), this.define("templateFormatter", {
      get() {
        return this._templateFormatter;
      },
      set(e) {
        const i = this._styledText.buildTemplate();
        if (lodash.isFunction(e) || !lodash.isObject(e)) {
          if (!i)
            return;
          const n = {};
          n[i] = e, e = n;
        }
        return this._styledText.templateFormatter(e);
      }
    });
  }
  constructor(e) {
    let i, n;
    if (this.updateAutoWidth = this.updateAutoWidth.bind(this), this.updateAutoHeight = this.updateAutoHeight.bind(this), this.renderText = this.renderText.bind(this), e == null && (e = {}), lodash.defaults(e, {
      shadowType: "text",
      clip: !1,
      createHTMLElement: !0
    }), e.styledTextOptions != null && (e.styledText = e.styledTextOptions, delete e.styledTextOptions), e.styledText != null)
      delete e.text, this.styledTextOptions = e.styledText, e.color == null && (e.color = this._styledText.getStyle("color")), e.fontSize == null && (e.fontSize = parseFloat(this._styledText.getStyle("fontSize"))), e.fontFamily == null && (e.fontFamily = this._styledText.getStyle("fontFamily")), e.letterSpacing == null && (e.letterSpacing = parseFloat(
        this._styledText.getStyle("letterSpacing")
      )), e.textAlign == null && (e.textAlign = this._styledText.textAlign), i = this._styledText.getStyle("fontWeight"), i != null && (e.fontWeight = parseFloat(i)), n = this._styledText.getStyle("lineHeight"), n == null || n === "normal" ? n = 1.25 : n = parseFloat(n), e.lineHeight == null && (e.lineHeight = n);
    else {
      lodash.defaults(e, {
        backgroundColor: "transparent",
        text: "Hello World",
        color: "#888",
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 1.25,
        padding: 0
      }), e.font == null && e.fontFamily == null && (e.fontFamily = this.defaultFont());
      let { text: a } = e;
      lodash.isString(a) || (a = String(a)), this._styledText.addBlock(a, { fontSize: `${e.fontSize}px` });
    }
    if (super(e), this.__constructor = !0, e.autoSize)
      this.autoWidth = !0, this.autoHeight = !0;
    else if (e.autoSize !== !1 && !e.truncate) {
      if (e.autoWidth == null) {
        const a = e.width != null || lodash.isNumber(e.size) || (e.size != null ? e.size.width : void 0) != null || (e.frame != null ? e.frame.width : void 0) != null;
        this.autoWidth = !a;
      }
      if (e.autoHeight == null) {
        const a = e.height != null || lodash.isNumber(e.size) || (e.size != null ? e.size.height : void 0) != null || (e.frame != null ? e.frame.height : void 0) != null;
        this.autoHeight = !a;
      }
    }
    const { constraintValues: r } = e;
    if (r) {
      const a = lodash.isNumber(r.top) && lodash.isNumber(r.bottom), o = lodash.isNumber(r.heightFactor);
      this.autoHeight = !(o || a);
    }
    e.styledText == null && this.font == null && (this.font = this.fontFamily), this._styledText.setElement(this._elementHTML), delete this.__constructor, this.renderText();
    for (const a in e) {
      const o = e[a];
      lodash.isFunction(o) && this[a] != null && (this[a] = o);
    }
    for (var s of Array.from(TextLayer._textStyleProperties))
      ((a) => this.on(`change:${a}`, (o) => {
        if (o !== null)
          return ["fontSize", "font"].includes(a) || this._styledText.resetStyle(a), this.renderText();
      }))(s);
    this.on("change:width", this.updateAutoWidth), this.on("change:height", this.updateAutoHeight), this.on("change:parent", this.renderText);
  }
  updateAutoWidth(e) {
    if (!this.disableAutosizeUpdating)
      return this.autoWidth = !1;
  }
  updateAutoHeight(e) {
    if (!this.disableAutosizeUpdating)
      return this.autoHeight = !1;
  }
  copySingle() {
    const { props: e } = this;
    this.autoWidth && delete e.width, this.autoHeight && delete e.height;
    const i = new this.constructor(e);
    return i.style = this.style, i;
  }
  renderText(e) {
    let i, n;
    if (e == null && (e = !1), this.__constructor || (this._styledText.render(), this._updateHTMLScale(), this.autoSize || (this.width < this._elementHTML.clientWidth || this.height < this._elementHTML.clientHeight) && (this.clip = !0), !e && !this.autoHeight && !this.autoWidth && this.textOverflow === null))
      return;
    const r = Utils.rectZero(Utils.parseRect(this.padding));
    this.autoWidth ? n = null : n = this.size.width - (r.left + r.right), this.autoHeight ? i = null : i = this.size.height - (r.top + r.bottom);
    const s = {
      width: n,
      height: i,
      multiplier: this.context.pixelMultiplier
    }, a = this._styledText.measure(s);
    return this.disableAutosizeUpdating = !0, a.width != null && (this.width = a.width + r.left + r.right), a.height != null && (this.height = a.height + r.top + r.bottom), this.disableAutosizeUpdating = !1;
  }
  defaultFont() {
    return Utils.deviceFont(Framer.Device.platform());
  }
  textReplace(e, i) {
    const n = this.text;
    if (this._styledText.textReplace(e, i), this.text !== n)
      return this.renderText(), this.emit("change:text", this.text);
  }
}
TextLayer.initClass();
class AnimationGroup extends BaseClass {
  constructor(...e) {
    super(...e), this._animations = e.flat(), this.stopAnimations = !0, this.stop();
  }
  start() {
    return this._start(this._animations);
  }
  stop() {
    this._stop(), this._started = [], this._halted = [], this._stopped = [], this._ended = [];
  }
  _start(e) {
    return this.stop(), this._onStart(), e.map((i) => (this._started.push(i), i.onAnimationHalt(() => {
      this._halted.push(i), !(this._halted.length > 1) && (this._stop(), this._onHalt());
    }), i.onAnimationStop(() => {
      this._stopped.push(i), this._stopped.length === this._started.length && this._onStop();
    }), i.onAnimationEnd(() => {
      this._ended.push(i), this._ended.length === this._started.length && this._onEnd();
    }), i.start()));
  }
  _stop() {
    if (!(!this._started || !this.stopAnimations))
      return this._started.map((e) => e.isAnimating ? e.stop() : void 0);
  }
  _onStart() {
    this.emit(Events$5.AnimationStart);
  }
  _onHalt() {
    this.emit(Events$5.AnimationHalt);
  }
  _onStop() {
    this.emit(Events$5.AnimationStop);
  }
  _onEnd() {
    this.emit(Events$5.AnimationEnd);
  }
  onAnimationStart(e) {
    return this.on(Events$5.AnimationStart, e);
  }
  onAnimationHalt(e) {
    return this.on(Events$5.AnimationHalt, e);
  }
  onAnimationStop(e) {
    return this.on(Events$5.AnimationStop, e);
  }
  onAnimationEnd(e) {
    return this.on(Events$5.AnimationEnd, e);
  }
  onStart(e) {
    return this.onAnimationStart(e);
  }
  onHalt(e) {
    return this.onAnimationHalt(e);
  }
  onStop(e) {
    return this.onAnimationStop(e);
  }
  onEnd(e) {
    return this.onAnimationEnd(e);
  }
}
class AnimationStateGroup extends AnimationGroup {
  static initClass() {
    this.define("state", { get: () => this._state }), this.define("states", {
      get() {
        const e = [];
        for (const i of this._layers ?? [])
          for (const n of Object.keys(i.states ?? {}))
            e.includes(n) || e.push(n);
        return e;
      }
    });
  }
  constructor(...e) {
    super(...e), this._layers = e.flat(), this._state = "default";
  }
  animate(e) {
    const i = [];
    for (const n of this._layers)
      n.states?.[e] && i.push(n.animate(e, { start: !1 }));
    i.length && (this._start(i), this._state = e);
  }
  stateCycle(...e) {
    let i = e.flat();
    return i.length || (i = this.states), this.animate(Utils$1.arrayNext(i, this.state));
  }
}
AnimationStateGroup.initClass();
class ScreenClass extends BaseClass {
  static initClass() {
    this.define("width", {
      get() {
        return this.device ? this.device.screenSize.width : Canvas.width;
      }
    }), this.define("height", {
      get() {
        return this.device ? this.device.screenSize.height : Canvas.height;
      }
    }), this.define("canvasFrame", {
      get() {
        return this.device ? this.device.context.canvasFrame : this.frame;
      }
    }), this.define("midX", {
      get() {
        return Utils.frameGetMidX(this.frame);
      }
    }), this.define("midY", {
      get() {
        return Utils.frameGetMidY(this.frame);
      }
    }), this.define("size", {
      get() {
        return Utils.size(this);
      }
    }), this.define("frame", {
      get() {
        return Utils.frame(this);
      }
    }), this.define("device", {
      get() {
        return Framer.CurrentContext.device;
      }
    }), this.define(
      "backgroundColor",
      this.proxyProperty("device.screen.backgroundColor")
    ), this.define(
      "perspective",
      this.proxyProperty("device.context.perspective")
    ), this.define(
      "perspectiveOriginX",
      this.proxyProperty("device.context.perspectiveOriginX")
    ), this.define(
      "perspectiveOriginY",
      this.proxyProperty("device.context.perspectiveOriginY")
    );
  }
  toInspect() {
    return `<Screen ${Utils.roundWhole(this.width)}x${Utils.roundWhole(
      this.height
    )}>`;
  }
  // Triggered from outside by Canvas and DeviceComponent
  onResize(e) {
    return this.on("resize", e);
  }
  // Point Conversion
  convertPointToLayer(e, i) {
    return Utils.convertPointFromContext(e, i, !1, !0);
  }
  convertPointToCanvas(e) {
    const i = Framer.Device.context;
    return Utils.convertPointToContext(e, i, !0, !1);
  }
  // Edge Swipe
  onEdgeSwipe(e) {
    return this.on(Events.EdgeSwipe, e);
  }
  onEdgeSwipeStart(e) {
    return this.on(Events.EdgeSwipeStart, e);
  }
  onEdgeSwipeEnd(e) {
    return this.on(Events.EdgeSwipeEnd, e);
  }
  onEdgeSwipeTop(e) {
    return this.on(Events.EdgeSwipeTop, e);
  }
  onEdgeSwipeTopStart(e) {
    return this.on(Events.EdgeSwipeTopStart, e);
  }
  onEdgeSwipeTopEnd(e) {
    return this.on(Events.EdgeSwipeTopEnd, e);
  }
  onEdgeSwipeRight(e) {
    return this.on(Events.EdgeSwipeRight, e);
  }
  onEdgeSwipeRightStart(e) {
    return this.on(Events.EdgeSwipeRightStart, e);
  }
  onEdgeSwipeRightEnd(e) {
    return this.on(Events.EdgeSwipeRightEnd, e);
  }
  onEdgeSwipeBottom(e) {
    return this.on(Events.EdgeSwipeBottom, e);
  }
  onEdgeSwipeBottomStart(e) {
    return this.on(Events.EdgeSwipeBottomStart, e);
  }
  onEdgeSwipeBottomEnd(e) {
    return this.on(Events.EdgeSwipeBottomEnd, e);
  }
  onEdgeSwipeLeft(e) {
    return this.on(Events.EdgeSwipeLeft, e);
  }
  onEdgeSwipeLeftStart(e) {
    return this.on(Events.EdgeSwipeLeftStart, e);
  }
  onEdgeSwipeLeftEnd(e) {
    return this.on(Events.EdgeSwipeLeftEnd, e);
  }
}
ScreenClass.initClass();
const Screen$1 = new ScreenClass(), pixelRound = parseInt, center = (t, e, i = 0) => {
  let n = t.parent ?? Screen;
  const r = n.borderWidth ?? 0, s = pixelRound(
    n.width / 2 - t.width / 2 - r + i
  ), a = pixelRound(
    n.height / 2 - t.height / 2 - r + i
  );
  return e === "x" ? s : e === "y" ? a : e === "point" ? { x: s, y: a } : 0;
}, left = (t, e, i = 0) => {
  if (e !== "x") throw new Error("Align.left only works for x");
  return pixelRound(i);
}, right = (t, e, i = 0) => {
  if (e !== "x") throw new Error("Align.right only works for x");
  const n = t.parent ?? Screen, r = n.borderWidth ?? 0;
  return pixelRound(n.width - 2 * r - t.width + i);
}, top = (t, e, i = 0) => {
  if (e !== "y") throw new Error("Align.top only works for y");
  return pixelRound(i);
}, bottom = (t, e, i = 0) => {
  if (e !== "y") throw new Error("Align.bottom only works for y");
  const n = t.parent ?? Screen, r = n.borderWidth ?? 0;
  return pixelRound(n.height - 2 * r - t.height + i);
}, wrapper = (t, e) => {
  const i = (n, r) => n == null || typeof n == "number" ? (s, a) => t(s, a, n ?? 0) : t(n, r, 0);
  return i.toInspect = () => `Align.${e}`, i;
}, Align$1 = {
  center: wrapper(center, "center"),
  left: wrapper(left, "left"),
  right: wrapper(right, "right"),
  top: wrapper(top, "top"),
  bottom: wrapper(bottom, "bottom")
}, Blending$1 = {
  normal: "normal",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity"
};
let EventManagerIdCounter = 1;
class DOMEventManagerElement extends EventEmitter {
  static initClass() {
    this.prototype.addEventListener = this.prototype.addListener, this.prototype.removeEventListener = this.prototype.removeListener, this.prototype.on = this.prototype.addListener, this.prototype.off = this.prototype.removeListener;
  }
  constructor(e) {
    super(), this.element = e;
  }
  addListener(e, i, n = !1) {
    i.capture = n, super.addListener(e, i), this.element.addEventListener(e, i, n);
  }
  removeListener(e, i, n = !1) {
    super.removeListener(e, i);
    const r = i.capture !== void 0 ? i.capture : n;
    this.element.removeEventListener(e, i, r);
  }
}
DOMEventManagerElement.initClass();
class DOMEventManager {
  constructor() {
    this.wrap = this.wrap.bind(this), this.remove = this.remove.bind(this), this._elements = {};
  }
  wrap(e) {
    return e._eventManagerId || (e._eventManagerId = EventManagerIdCounter++), this._elements[e._eventManagerId] || (this._elements[e._eventManagerId] = new DOMEventManagerElement(
      e
    )), this._elements[e._eventManagerId];
  }
  remove(e) {
    e._eventManagerId && (delete this._elements[e._eventManagerId], e._eventManagerId = 0);
  }
  reset() {
    for (const e in this._elements)
      this._elements[e].removeAllListeners();
  }
}
const Contexts = [];
class Context extends BaseClass {
  static initClass() {
    this.define("parent", {
      get() {
        return this._parent;
      }
    }), this.define("element", {
      get() {
        return this._element;
      }
    }), this.define("devicePixelRatio", {
      get() {
        return this._devicePixelRatio != null ? this._devicePixelRatio : 1;
      },
      set(e) {
        if (e !== this._devicePixelRatio)
          return this._devicePixelRatio = e, Array.from(this._layers).map(
            (i) => i.updateForDevicePixelRatioChange()
          );
      }
    }), this.define(
      "renderUsingNativePixelRatio",
      this.simpleProperty("renderUsingNativePixelRatio", !1)
    ), this.define("autoLayout", this.simpleProperty("autoLayout", !0)), this.define("pixelMultiplier", {
      get() {
        return this.renderUsingNativePixelRatio ? 1 : this.devicePixelRatio;
      }
    }), this.define("scale", {
      get() {
        return this.pixelMultiplier;
      }
    }), this.define("layers", {
      get() {
        return lodash.clone(this._layers);
      }
    }), this.define("layerCounter", {
      get() {
        return this._layerCounter;
      }
    }), this.define("rootLayers", {
      get() {
        return lodash.filter(this._layers, (e) => e.parent === null);
      }
    }), this.define("visible", {
      get() {
        return this._visible || !0;
      },
      set(e) {
        if (e !== this._visible)
          return this._element != null && (this._element.style.visibility = e ? "visible" : "hidden"), this._visible = e;
      }
    }), this.define("animations", {
      get() {
        return lodash.clone(this._animations);
      }
    }), this.define("timers", {
      get() {
        return lodash.clone(this._timers);
      }
    }), this.define("intervals", {
      get() {
        return lodash.clone(this._intervals);
      }
    }), this.define("width", {
      get() {
        return this.parent != null ? this.parent.width : window.innerWidth;
      }
    }), this.define("height", {
      get() {
        return this.parent != null ? this.parent.height : window.innerHeight;
      }
    }), this.define("innerWidth", {
      get() {
        return this.parent != null ? this.parent.width / this.devicePixelRatio : window.innerWidth;
      }
    }), this.define("innerHeight", {
      get() {
        return this.parent != null ? this.parent.height / this.devicePixelRatio : window.innerHeight;
      }
    }), this.define("frame", {
      get() {
        return { x: 0, y: 0, width: this.width, height: this.height };
      }
    }), this.define("innerFrame", {
      get() {
        return { x: 0, y: 0, width: this.innerWidth, height: this.innerHeight };
      }
    }), this.define("size", {
      get() {
        return lodash.pick(this.frame, ["width", "height"]);
      }
    }), this.define("point", {
      get() {
        return lodash.pick(this.frame, ["x", "y"]);
      }
    }), this.define("canvasFrame", {
      get() {
        return this.parent == null ? this.frame : this.parent.canvasFrame;
      }
    }), this.define("backgroundColor", {
      get() {
        return Color.isColor(this._backgroundColor) ? this._backgroundColor : "transparent";
      },
      set(e) {
        if (Color.isColor(e))
          return this._backgroundColor = e, this._element != null ? this._element.style.backgroundColor = new Color(
            e.toString()
          ) : void 0;
      }
    }), this.define("perspective", {
      get() {
        return this._perspective;
      },
      set(e) {
        const i = Utils$1.webkitPerspectiveForValue(e);
        if (i != null)
          return this._perspective = e, this._element != null ? this._element.style.webkitPerspective = i : void 0;
      }
    }), this.define("perspectiveOriginX", {
      get() {
        return lodash.isNumber(this._perspectiveOriginX) ? this._perspectiveOriginX : 0.5;
      },
      set(e) {
        if (lodash.isNumber(e))
          return this._perspectiveOriginX = e, this._updatePerspective();
      }
    }), this.define("perspectiveOriginY", {
      get() {
        return lodash.isNumber(this._perspectiveOriginY) ? this._perspectiveOriginY : 0.5;
      },
      set(e) {
        if (lodash.isNumber(e))
          return this._perspectiveOriginY = e, this._updatePerspective();
      }
    }), this.define("index", {
      get() {
        return (this._element != null ? this._element.style["z-index"] : void 0) || 0 || 0;
      },
      set(e) {
        if (this._element)
          return this._element.style["z-index"] = e;
      }
    });
  }
  static all() {
    return lodash.clone(Contexts);
  }
  constructor(e) {
    if (e == null && (e = {}), e = Defaults.getDefaults("Context", e), super(e), this.layout = this.layout.bind(this), !e.name)
      throw Error("Contexts need a name");
    this._parent = e.parent, this._name = e.name, this.perspective = e.perspective, this.perspectiveOriginX = e.perspectiveOriginX, this.perspectiveOriginY = e.perspectiveOriginY, this.elementInDOM = !1, this.reset(), e.hasOwnProperty("index") ? this.index = e.index : this.index = this.id, Contexts.push(this);
  }
  reset() {
    return this._createDOMEventManager(), this._createRootElement(), this.resetFrozenEvents(), this.resetLayers(), this.resetAnimations(), this.resetTimers(), this.resetIntervals(), this.emit("reset", this);
  }
  destroy() {
    return this.reset(), this._destroyRootElement(), lodash.remove(Contexts, this);
  }
  addLayer(e) {
    if (!Array.from(this._layers).includes(e))
      return this._layerCounter++, this._layers.push(e);
  }
  removeLayer(e) {
    return this._layers = lodash.without(this._layers, e);
  }
  resetLayers() {
    return this.resetGestures(), this._layers = [], this._layerCounter = 0;
  }
  layerForId(e) {
    for (var i of Array.from(this._layers))
      if (i.id === e)
        return i;
    return null;
  }
  _layerForElement(e) {
    for (var i of Array.from(this._layers))
      if (i._element === e)
        return i;
    return null;
  }
  layerForElement(e) {
    if (!e)
      return null;
    const i = this._layerForElement(e);
    return i || this.layerForElement(e.parentNode);
  }
  selectLayer(e) {
    return Utils$1.findLayer(this._layers, e);
  }
  selectAllLayers(e) {
    return Utils$1.filterLayers(this._layers, e);
  }
  layout() {
    return this.rootLayers.map((e) => e.layout());
  }
  addAnimation(e) {
    if (!Array.from(this._animations).includes(e))
      return this._animations.push(e);
  }
  removeAnimation(e) {
    return this._animations = lodash.without(this._animations, e);
  }
  resetAnimations() {
    return this.stopAnimations(), this._animations = [];
  }
  stopAnimations() {
    if (this._animations)
      return this._animations.map((e) => e.stop(!0));
  }
  resetFrozenEvents() {
    return delete this._frozenEvents;
  }
  addTimer(e) {
    if (!Array.from(this._timers).includes(e))
      return this._timers.push(e);
  }
  removeTimer(e) {
    return window.clearTimeout(e), this._timers = lodash.without(this._timers, e);
  }
  resetTimers() {
    return this._timers && this._timers.map(window.clearTimeout), this._timers = [];
  }
  addInterval(e) {
    if (!Array.from(this._intervals).includes(e))
      return this._intervals.push(e);
  }
  removeInterval(e) {
    return this._intervals = lodash.without(this._intervals, e);
  }
  resetIntervals() {
    return this._intervals && this._intervals.map(window.clearInterval), this._intervals = [];
  }
  // Gestures
  resetGestures() {
    if (this._layers)
      for (var e of Array.from(this._layers))
        e._gestures && e._gestures.destroy();
  }
  //#############################################################
  // Run
  run(e) {
    const i = Framer.CurrentContext;
    return Framer.CurrentContext = this, e(), Framer.CurrentContext = i;
  }
  //#############################################################
  // Freezing
  freeze() {
    if (this._frozenEvents != null)
      throw new Error("Context is already frozen");
    this._frozenEvents = {};
    for (var e of Array.from(this._layers)) {
      var i = {};
      for (var n of Array.from(e.listenerEvents()))
        i[n] = e.listeners(n);
      e.removeAllListeners();
      var r = this._layers.indexOf(e);
      this._frozenEvents[r] = i;
    }
    return this.stopAnimations(), this.resetTimers(), this.resetIntervals();
  }
  resume() {
    if (this._frozenEvents == null)
      throw new Error("Context is not frozen, cannot resume");
    for (var e in this._frozenEvents) {
      var i = this._frozenEvents[e], n = this._layers[e];
      for (var r in i) {
        var s = i[r];
        for (var a of Array.from(s))
          n.on(r, a);
      }
    }
    return this.resetFrozenEvents();
  }
  //#############################################################
  // DOM
  _createDOMEventManager() {
    return this.domEventManager != null && this.domEventManager.reset(), this.domEventManager = new DOMEventManager();
  }
  _createRootElement() {
    this._destroyRootElement(), this._element = document.createElement("div"), this._element.id = `FramerContextRoot-${this._name}`, this._element.classList.add("framerContext");
    const e = Utils$1.webkitPerspectiveForValue(this.perspective);
    return e != null && (this._element.style.webkitPerspective = e), this._element.style.backgroundColor = this.backgroundColor, this.__pendingElementAppend = () => {
      let i = this._parent != null ? this._parent._element : void 0;
      return i == null && (i = document.body), i.appendChild(this._element), this.elementInDOM = !0, this._layers != null ? this._layers.map((n) => n.elementInsertedIntoDocument()) : void 0;
    }, Utils$1.domComplete(this.__pendingElementAppend);
  }
  _destroyRootElement() {
    return this._element != null && this._element.parentNode && (this._element.parentNode.removeChild(this._element), this.elementInDOM = !1), this.__pendingElementAppend && (Utils$1.domCompleteCancel(this.__pendingElementAppend), this.__pendingElementAppend = null), this._element = null;
  }
  _updatePerspective() {
    return this._element != null ? this._element.style.webkitPerspectiveOrigin = `${this.perspectiveOriginX * 100}% ${this.perspectiveOriginY * 100}%` : void 0;
  }
  containers(e, i) {
    return i == null && (i = []), this._parent != null ? (i.push(this._parent), this._parent != null ? this._parent.containers(!0, i) : void 0) : i;
  }
  toInspect() {
    const e = function(i) {
      return parseInt(i) === i ? parseInt(i) : Utils$1.round(i, 1);
    };
    return `<${this.constructor.name} id:${this.id} name:${this._name} ${e(
      this.width
    )}x${e(this.height)}>`;
  }
}
Context.initClass();
class Printer {
  constructor() {
    this.createLayer = this.createLayer.bind(this), this.resize = this.resize.bind(this), this.print = this.print.bind(this), this.scrollToBottom = this.scrollToBottom.bind(this), this._context = new Context({ name: "PrintConsole" }), this._context.run(() => {
      window.addEventListener("resize", this.resize);
    });
  }
  createLayer() {
    return this._printLayer ? this._printLayer : (this._context.run(() => {
      this._container = new Layer$1({
        backgroundColor: null
      }), this._container.style.zIndex = 999, this._printLayer = new Layer$1({
        parent: this._container,
        scrollVertical: !0,
        ignoreEvents: !1,
        html: "",
        style: {
          font: "12px/1.35em Menlo, Consolas, monospace",
          color: "rgba(0, 0, 0, .7)",
          padding: "8px",
          paddingBottom: "30px",
          borderTop: "1px solid #d9d9d9"
        },
        opacity: 0.9,
        visible: !0,
        backgroundColor: "white"
      }), this._closeButton = new Layer$1({
        parent: this._container,
        html: `
          <svg>
            <g stroke="#B8B8B8">
              <path d="M1,1 L8,8"></path>
              <path d="M1,8 L8,1"></path>
            </g>
          </svg>
        `,
        y: 9,
        width: 9,
        height: 9,
        backgroundColor: null,
        style: { cursor: "auto" }
      }), this._closeButton.onClick(() => this.hide());
    }), this.resize(), this._printLayer);
  }
  resize() {
    this._printLayer && (this._container.width = window.innerWidth, this._container.height = 160, this._container.maxY = window.innerHeight, this._printLayer.size = this._container.size, this._closeButton.maxX = this._container.maxX - this._closeButton.y + 1);
  }
  hide() {
    this._context.visible = !1;
  }
  print(...e) {
    this.createLayer(), this._context.visible = !0;
    const i = "» ", n = document.createElement("div");
    return n.style.userSelect = "text", n.style.cursor = "auto", n.innerHTML = Utils$1.escape(
      i + e.map((r) => Utils$1.inspect(r)).join(", ")
    ) + "<br>", this._printLayer._element.appendChild(n), this.scrollToBottom(), Utils$1.delay(0, this.scrollToBottom);
  }
  scrollToBottom() {
    this._printLayer && (this._printLayer._element.scrollTop = this._printLayer._element.scrollHeight);
  }
}
let _printer = null;
function print$1(...t) {
  return _printer || (_printer = new Printer()), _printer.print(...t);
}
Events$5.ScrollStart = "scrollstart";
Events$5.Scroll = "scroll";
Events$5.ScrollMove = Events$5.Scroll;
Events$5.ScrollEnd = "scrollend";
Events$5.ScrollAnimationDidStart = "scrollanimationdidstart";
Events$5.ScrollAnimationDidEnd = "scrollanimationdidend";
const EventMappers = {};
EventMappers[Events$5.Move] = Events$5.Move;
EventMappers[Events$5.ScrollStart] = Events$5.DragStart;
EventMappers[Events$5.ScrollMove] = Events$5.DragMove;
EventMappers[Events$5.ScrollEnd] = Events$5.DragEnd;
EventMappers[Events$5.ScrollAnimationDidStart] = Events$5.DragAnimationStart;
EventMappers[Events$5.ScrollAnimationDidEnd] = Events$5.DragAnimationEnd;
EventMappers[Events$5.DirectionLockStart] = Events$5.DirectionLockStart;
let ScrollComponent$1 = class extends Layer$1 {
  static initClass() {
    this.define(
      "velocity",
      this.proxyProperty("content.draggable.velocity", {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "scrollHorizontal",
      this.proxyProperty("content.draggable.horizontal")
    ), this.define(
      "scrollVertical",
      this.proxyProperty("content.draggable.vertical")
    ), this.define("speedX", this.proxyProperty("content.draggable.speedX")), this.define("speedY", this.proxyProperty("content.draggable.speedY")), this.define(
      "isDragging",
      this.proxyProperty("content.draggable.isDragging", {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "isMoving",
      this.proxyProperty("content.draggable.isMoving", {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "isAnimating",
      this.proxyProperty("content.draggable.isAnimating", {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "propagateEvents",
      this.proxyProperty("content.draggable.propagateEvents")
    ), this.define(
      "directionLock",
      this.proxyProperty("content.draggable.directionLock")
    ), this.define(
      "directionLockThreshold",
      this.proxyProperty("content.draggable.directionLockThreshold")
    ), this.define("content", {
      importable: !1,
      exportable: !1,
      get() {
        return this._content;
      }
    }), this.define(
      "mouseWheelSpeedMultiplier",
      this.simpleProperty("mouseWheelSpeedMultiplier", 1)
    ), this.define("scroll", {
      exportable: !1,
      get() {
        return this.scrollHorizontal === !0 || this.scrollVertical === !0;
      },
      set(e) {
        if (this.content)
          return e === !1 && this.content.animateStop(), this.scrollHorizontal = this.scrollVertical = e;
      }
    }), this.define("scrollX", {
      get() {
        return this.content ? 0 - this.content.x + this.contentInset.left : 0;
      },
      set(e) {
        if (this.content)
          return this.content.draggable.animateStop(), this.content.x = this._calculateContentPoint({
            x: e,
            y: 0
          }).x;
      }
    }), this.define("scrollY", {
      get() {
        return this.content ? 0 - this.content.y + this.contentInset.top : 0;
      },
      set(e) {
        if (this.content)
          return this.content.draggable.animateStop(), this.content.y = this._calculateContentPoint({
            x: 0,
            y: e
          }).y;
      }
    }), this.define("scrollPoint", {
      importable: !0,
      exportable: !1,
      get() {
        return {
          x: this.scrollX,
          y: this.scrollY
        };
      },
      set(e) {
        if (this.content)
          return this.scrollX = e.x, this.scrollY = e.y;
      }
    }), this.define("scrollFrame", {
      importable: !0,
      exportable: !1,
      get() {
        const e = this.scrollPoint;
        return e.width = this.width, e.height = this.height, e;
      },
      set(e) {
        return this.scrollPoint = e;
      }
    }), this.define("contentInset", {
      get() {
        return lodash.clone(this._contentInset);
      },
      set(e) {
        if (this._contentInset = Utils$1.rectZero(Utils$1.parseRect(e)), !this.content)
          return;
        const i = this.calculateContentFrame();
        return i.x = i.x + this._contentInset.left, i.y = i.y + this._contentInset.top, this.content.frame = i, this.updateContent();
      }
    }), this.define("direction", {
      importable: !1,
      exportable: !1,
      get() {
        const { direction: e } = this.content.draggable;
        return e === "down" ? "up" : e === "up" ? "down" : e === "right" ? "left" : e === "left" ? "right" : e;
      }
    }), this.define("angle", {
      importable: !1,
      exportable: !1,
      get() {
        return this.content ? -this.content.draggable.angle : 0;
      }
    }), this.prototype.on = this.prototype.addListener, this.prototype.off = this.prototype.removeListener, this.define("mouseWheelEnabled", {
      get() {
        return this._mouseWheelEnabled;
      },
      set(e) {
        return this._mouseWheelEnabled = e, this._enableMouseWheelHandling(e);
      }
    }), this.prototype._onMouseWheelEnd = Utils$1.debounce(0.3, function(e) {
      return this.emit(Events$5.ScrollEnd, e), this._mouseWheelScrolling = !1;
    });
  }
  constructor(e) {
    this.updateContent = this.updateContent.bind(this), this._onAnimationStart = this._onAnimationStart.bind(this), this._onAnimationStep = this._onAnimationStep.bind(this), this._onAnimationStop = this._onAnimationStop.bind(this), this._onMouseWheel = this._onMouseWheel.bind(this), e == null && (e = {}), super(Defaults.getDefaults("ScrollComponent", e)), this._contentInset = e.contentInset || Utils$1.rectZero(), this.setContentLayer(new Layer$1()), this._applyProxyDefaults(e), this._enableMouseWheelHandling(e.mouseWheelEnabled), e.hasOwnProperty("wrap") && wrapComponent(this, e.wrap);
  }
  calculateContentFrame() {
    if (!this.content)
      return Utils$1.rectZero();
    const e = this.content.contentFrame();
    return {
      x: 0,
      y: 0,
      width: Math.max(this.width, e.x + e.width),
      height: Math.max(this.height, e.y + e.height)
    };
  }
  setContentLayer(e) {
    return this.content && (this._onAnimationStop(), this.content.off(Events$5.AnimationStart, this._onAnimationStart), this.content.off(Events$5.AnimationStop, this._onAnimationStop), this._content.destroy()), this._content = e, this._content.parent = this, this._content.name = "content", this._content.clip = !0, this._content.draggable.enabled = !0, this._content.draggable.momentum = !0, this._content.on("change:children", this.updateContent), this.on("change:width", this.updateContent), this.on("change:height", this.updateContent), this.updateContent(), this.scrollPoint = { x: 0, y: 0 }, this.content.on(Events$5.AnimationStart, this._onAnimationStart), this.content.on(Events$5.AnimationStop, this._onAnimationStop), this._content;
  }
  updateContent() {
    if (!this.content)
      return;
    const e = this.calculateContentFrame();
    this.content.width = e.width, this.content.height = e.height;
    let i = this.calculateContentFrame();
    if (i = {
      x: -i.width + this.width - this._contentInset.right,
      y: -i.height + this.height - this._contentInset.bottom,
      width: i.width + i.width - this.width + this._contentInset.left + this._contentInset.right,
      height: i.height + i.height - this.height + this._contentInset.top + this._contentInset.bottom
    }, this.content.draggable.constraints = i, this.scrollPoint = this.scrollPoint, this.content.children.length && this.content.backgroundColor != null && this.content.backgroundColor.isEqual(
      Framer.Defaults.Layer.backgroundColor
    ))
      return this.content.backgroundColor = null;
  }
  _calculateContentPoint(e) {
    e = lodash.defaults(e, { x: 0, y: 0 }), e.x -= this.contentInset.left, e.y -= this.contentInset.top;
    const i = this._pointInConstraints(e);
    return Utils$1.pointInvert(i);
  }
  scrollToPoint(e, i, n) {
    i == null && (i = !0), n == null && (n = { curve: "spring(500, 50, 0)" });
    const r = this._calculateContentPoint(e);
    return this.content.draggable.animateStop(), i ? (e = {}, r.hasOwnProperty("x") && (e.x = r.x), r.hasOwnProperty("y") && (e.y = r.y), this.content.animateStop(), this.content.animate(e, n)) : this.content.point = r;
  }
  scrollToTop(e, i) {
    return e == null && (e = !0), i == null && (i = { curve: "spring(500, 50, 0)" }), this.scrollToPoint({ x: 0, y: 0 }, e, i);
  }
  scrollToLayer(e, i, n, r, s) {
    let a;
    if (i == null && (i = 0), n == null && (n = 0), r == null && (r = !0), s == null && (s = { curve: "spring(500, 50, 0)" }), e && e.parent !== this.content)
      throw Error(
        "Can't scroll to this layer because it's not in the ScrollComponent. Add it to the content like layer.parent = scroll.content."
      );
    return !e || this.content.children.length === 0 ? a = { x: 0, y: 0 } : (a = this._scrollPointForLayer(e, i, n), a.x -= this.width * i, a.y -= this.height * n), this.scrollToPoint(a, r, s), e;
  }
  scrollToClosestLayer(e, i, n, r) {
    e == null && (e = 0), i == null && (i = 0), n == null && (n = !0), r == null && (r = { curve: "spring(500, 50, 0)" });
    const s = this.closestContentLayer(
      e,
      i,
      n,
      r
    );
    return s ? (this.scrollToLayer(s, e, i), s) : (s || this.scrollToPoint({ x: 0, y: 0 }), null);
  }
  closestContentLayer(e, i) {
    e == null && (e = 0), i == null && (i = 0);
    const n = Utils$1.framePointForOrigin(
      this.scrollFrame,
      e,
      i
    );
    return this.closestContentLayerForScrollPoint(
      n,
      e,
      i
    );
  }
  closestContentLayerForScrollPoint(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), lodash.head(
      this._contentLayersSortedByDistanceForScrollPoint(
        e,
        i,
        n
      )
    );
  }
  _onAnimationStart(e) {
    return this.content.on("change:frame", this._onAnimationStep);
  }
  _onAnimationStep(e) {
    return this.content.emit(Events$5.Move, this.content.point), this.emit(Events$5.Scroll, e);
  }
  _onAnimationStop() {
    return this.content.off("change:frame", this._onAnimationStep);
  }
  _scrollPointForLayer(e, i, n, r) {
    return i == null && (i = 0), n == null && (n = 0), Utils$1.framePointForOrigin(e, i, n);
  }
  _contentLayersSortedByDistanceForScrollPoint(e, i, n) {
    return i == null && (i = 0), n == null && (n = 0), Utils$1.frameSortByAbsoluteDistance(
      e,
      this.content.children,
      i,
      n
    );
  }
  _pointInConstraints(e) {
    const { minX: i, maxX: n, minY: r, maxY: s } = this.content.draggable._calculateConstraints(
      this.content.draggable.constraints
    );
    return e = {
      x: -Utils$1.clamp(-e.x, i, n),
      y: -Utils$1.clamp(-e.y, r, s)
    }, e;
  }
  //#############################################################
  // Map scroll events to content.draggable
  addListener(...e) {
    const i = Math.max(e.length, 1), n = e.slice(0, i - 1), r = e[i - 1];
    return super.addListener(...arguments), (() => {
      const s = [];
      for (var a of Array.from(n)) {
        var o;
        o = a, Array.from(lodash.keys(EventMappers)).includes(o) ? s.push(this.content.on(EventMappers[a], r)) : s.push(void 0);
      }
      return s;
    })();
  }
  removeListener(...e) {
    const i = Math.max(e.length, 1), n = e.slice(0, i - 1), r = e[i - 1];
    return super.removeListener(...arguments), (() => {
      const s = [];
      for (var a of Array.from(n)) {
        var o;
        o = a, Array.from(lodash.keys(EventMappers)).includes(o) ? s.push(this.content.off(EventMappers[a], r)) : s.push(void 0);
      }
      return s;
    })();
  }
  _enableMouseWheelHandling(e) {
    return e ? this.on(Events$5.MouseWheel, this._onMouseWheel) : this.off(Events$5.MouseWheel, this._onMouseWheel);
  }
  _onMouseWheel(e) {
    let i = 0, n = 0;
    if (this.scrollHorizontal && (i = e.wheelDeltaX), this.scrollVertical && (n = e.wheelDeltaY), i === 0 && n === 0)
      return;
    this._mouseWheelScrolling || (this._mouseWheelScrolling = !0, this.emit(Events$5.ScrollStart, e)), this.content.animateStop();
    const { minX: r, maxX: s, minY: a, maxY: o } = this.content.draggable._calculateConstraints(
      this.content.draggable.constraints
    ), l = {
      x: Utils$1.clamp(
        this.content.x + i * this.mouseWheelSpeedMultiplier,
        r,
        s
      ),
      y: Utils$1.clamp(
        this.content.y + n * this.mouseWheelSpeedMultiplier,
        a,
        o
      )
    };
    return this.content.point = l, this.content.emit(Events$5.Move, l), this.emit(Events$5.Scroll, e), this._onMouseWheelEnd(e);
  }
  //#############################################################
  // Copying
  copy() {
    const e = super.copy(...arguments), i = lodash.head(lodash.without(e.children, e.content));
    return e.setContentLayer(i), e.props = this.props, e;
  }
  //#############################################################
  // Convenience function to make a single layer scrollable
  static wrap(e, i) {
    return wrapComponent(new this(i), e, i);
  }
};
ScrollComponent$1.initClass();
var wrapComponent = function(t, e, i) {
  if (i == null && (i = { correct: !0 }), !(e instanceof Layer$1))
    throw new Error(
      `ScrollComponent.wrap expects a layer, not ${e}. Are you sure the layer exists?`
    );
  const n = t, r = t.constructor.name === "PageComponent";
  if (i.correct === !0 && e.children.length === 0 && !r) {
    const s = new Layer$1();
    s.frame = e.frame, e.parent = s, e.x = e.y = 0, e = s;
  }
  if (n.frame = e.frame, n.parent = e.parent, n.index = e.index, e.name != null && !r && (n.name = e.name), n.__framerInstanceInfo == null && (n.__framerInstanceInfo = {}), n.__framerInstanceInfo != null && (n.__framerInstanceInfo.name = t.constructor.name), e.image && !r && (n.image = e.image, e.image = null), r ? n.addPage(e) : n.setContentLayer(e), i.correct === !0) {
    const { screenFrame: s } = n;
    s.x < Screen.width && s.x + s.width > Screen.width && (n.width = Screen.width - s.x), s.y < Screen.height && s.y + s.height > Screen.height && (n.height = Screen.height - s.y);
  }
  return n;
};
class PageComponent extends ScrollComponent$1 {
  static initClass() {
    this.define("originX", this.simpleProperty("originX", 0.5)), this.define("originY", this.simpleProperty("originY", 0.5)), this.define(
      "velocityThreshold",
      this.simpleProperty("velocityThreshold", 0.1)
    ), this.define("closestPage", {
      get() {
        return this.closestContentLayerForScrollPoint(
          this._originScrollPoint(),
          this.originX,
          this.originY
        );
      }
    }), this.define("currentPage", {
      get() {
        return _.last(this._previousPages);
      }
    }), this.define("previousPage", {
      get() {
        return this._previousPages[this._previousPages.length - 2];
      }
    });
  }
  constructor(e) {
    this._scrollStart = this._scrollStart.bind(this), this._scrollMove = this._scrollMove.bind(this), this._scrollEnd = this._scrollEnd.bind(this), this._resetHistory = this._resetHistory.bind(this), super(
      _.defaults(e, {
        animationOptions: {
          curve: "spring(500, 50, 0)"
        }
      })
    ), this.content.draggable.momentum = !1, this.content.draggable.bounce = !1, this.content.on(Events$5.DragSessionStart, this._scrollStart), this.content.on(Events$5.DragSessionEnd, this._scrollEnd), this.content.on("change:frame", _.debounce(this._scrollMove, 16)), this.content.on("change:children", this._resetHistory), this._resetHistory();
  }
  nextPage(e, i = null, n) {
    let r;
    e == null && (e = "right"), n == null && (n = !0), i == null && ({ currentPage: i } = this);
    let s = { x: 0, y: 0 };
    return i && (s = Utils.framePointForOrigin(
      i,
      this.originX,
      this.originY
    )), n || (s = {
      x: this.scrollX + this.originX * this.width,
      y: this.scrollY + this.originY * this.height
    }), ["up", "top", "north"].includes(e) && (r = this.content.childrenAbove(s, this.originX, this.originY)), ["down", "bottom", "south"].includes(e) && (r = this.content.childrenBelow(s, this.originX, this.originY)), ["left", "west"].includes(e) && (r = this.content.childrenLeft(s, this.originX, this.originY)), ["right", "east"].includes(e) && (r = this.content.childrenRight(s, this.originX, this.originY)), n && (r = _.without(r, i)), r = Utils.frameSortByAbsoluteDistance(
      s,
      r,
      this.originX,
      this.originY
    ), _.head(r);
  }
  snapToPage(e, i, n = null) {
    if (i == null && (i = !0), this.scrollToLayer(
      e,
      this.originX,
      this.originY,
      i,
      n
    ), this.currentPage !== e)
      return this._previousPages.push(e), this.emit("change:previousPage", this.previousPage), this.emit("change:currentPage", this.currentPage);
  }
  snapToNextPage(e, i, n = null) {
    e == null && (e = "right"), i == null && (i = !0), n == null && ({ animationOptions: n } = this);
    let r = this.nextPage(e);
    return r == null && (r = this.closestPage), this.snapToPage(r, i, n);
  }
  snapToPreviousPage(e, i = null) {
    if (e == null && (e = !0), !!this.previousPage)
      return i == null && ({ animationOptions: i } = this), this.snapToPage(this.previousPage, e, i), this._previousPages = this._previousPages.slice(
        0,
        +(this._previousPages.length - 3) + 1 || void 0
      );
  }
  addPage(e, i) {
    i == null && (i = "right");
    const n = "down,bottom,southright,east";
    if (Array.from(n).includes(!i))
      throw i = "right", new Error(`${i} should be in ${n}`);
    const r = { x: 0, y: 0 };
    return this.content.children.length && (["right", "east"].includes(i) && (r.x = Utils.frameGetMaxX(this.content.contentFrame())), ["down", "bottom", "south"].includes(i) && (r.y = Utils.frameGetMaxY(this.content.contentFrame()))), e.point = r, e.parent !== this.content ? e.parent = this.content : this.updateContent();
  }
  horizontalPageIndex(e) {
    return _.sortBy(this.content.children, (i) => i.x).indexOf(e);
  }
  verticalPageIndex(e) {
    return _.sortBy(this.content.children, (i) => i.y).indexOf(e);
  }
  _scrollStart() {
    return this._currentPage = this.currentPage;
  }
  _scrollMove() {
    let e;
    const { currentPage: i } = this;
    if (e = i, ![_.last(this._previousPages), void 0].includes(e))
      return this._previousPages.push(i), this.emit("change:currentPage", {
        old: this.previousPage,
        new: i
      });
  }
  _scrollEnd() {
    if (this.content.isAnimating)
      return;
    const { velocity: e } = this.content.draggable, i = !this.scrollHorizontal && (this.direction === "right" || this.direction === "left"), n = !this.scrollVertical && (this.direction === "down" || this.direction === "up"), r = this.content.draggable._directionLockEnabledX && (this.direction === "right" || this.direction === "left"), s = this.content.draggable._directionLockEnabledY && (this.direction === "down" || this.direction === "up");
    if (Math.max(
      Math.abs(e.x),
      Math.abs(e.y)
    ) < this.velocityThreshold || r || s || i || n)
      return this.snapToPage(this.closestPage, !0, this.animationOptions);
    let o = this.nextPage(this.direction, this._currentPage, !1);
    return o == null && (o = this.closestPage), this.snapToPage(o, !0, this.animationOptions);
  }
  _originScrollPoint() {
    const { scrollPoint: e } = this;
    return e.x += this.width * this.originX, e.y += this.height * this.originY, e;
  }
  _resetHistory() {
    return this._currentPage = this.closestPage, this._previousPages = [this._currentPage];
  }
}
PageComponent.initClass();
Events$5.SliderValueChange = "sliderValueChange";
let Knob$1 = class extends Layer$1 {
  constructor(e) {
    super(e);
  }
};
class SliderComponent extends Layer$1 {
  static initClass() {
    this.define("constrained", this.simpleProperty("constrained", !1)), this.define("knobSize", {
      get() {
        return this._knobSize;
      },
      set(e) {
        const i = this.knob.borderRadius * 2 === this._knobSize;
        return this._knobSize = e, this.knob.width = this._knobSize, this.knob.height = this._knobSize, i && (this.knob.borderRadius = this._knobSize / 2), this._updateFrame();
      }
    }), this.define("hitArea", {
      get() {
        return this._hitArea;
      },
      set(e) {
        return this._hitArea = e, this.width > this.height ? (this.sliderOverlay.width = this.width + this.hitArea, this.sliderOverlay.height = this.hitArea) : (this.sliderOverlay.width = this.hitArea, this.sliderOverlay.height = this.height + this.hitArea);
      }
    }), this.define("min", {
      get() {
        return this._min || 0;
      },
      set(e) {
        if (_.isFinite(e))
          return this._min = e;
      }
    }), this.define("max", {
      get() {
        return this._max || 1;
      },
      set(e) {
        if (_.isFinite(e))
          return this._max = e;
      }
    }), this.define("value", {
      get() {
        return this._value;
      },
      set(e) {
        if (_.isFinite(e))
          return this._value = Utils$1.clamp(e, this.min, this.max), this.width > this.height ? this.knob.midX = this.pointForValue(e) : this.knob.midY = this.pointForValue(e), this._updateFill(), this._updateValue();
      }
    });
  }
  constructor(e) {
    this._tapStart = this._tapStart.bind(this), this._tapEnd = this._tapEnd.bind(this), this._updateFill = this._updateFill.bind(this), this._updateKnob = this._updateKnob.bind(this), this._updateFrame = this._updateFrame.bind(this), this._setRadius = this._setRadius.bind(this), this._knobDidMove = this._knobDidMove.bind(this), this._updateValue = this._updateValue.bind(this), e == null && (e = {}), _.defaults(e, {
      backgroundColor: "#ccc",
      borderRadius: 50,
      clip: !1,
      width: 300,
      height: 10,
      value: 0,
      knobSize: 30
    }), e.hitArea == null && (e.hitArea = e.knobSize), this.knob = new Knob$1({
      backgroundColor: "#fff",
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: "rgba(0, 0, 0, 0.3)",
      name: "knob"
    }), this.fill = new Layer$1({
      backgroundColor: "#333",
      width: 0,
      force2d: !0,
      name: "fill"
    }), this.sliderOverlay = new Layer$1({
      backgroundColor: null,
      name: "sliderOverlay"
    }), super(e), this.knobSize = e.knobSize, this.knob.parent = this.fill.parent = this.sliderOverlay.parent = this, this.width > this.height ? this.fill.height = this.height : this.fill.width = this.width, this.fill.borderRadius = this.sliderOverlay.borderRadius = this.borderRadius, this.knob.draggable.enabled = !0, this.knob.draggable.overdrag = !1, this.knob.draggable.momentum = !0, this.knob.draggable.momentumOptions = { friction: 5, tolerance: 0.25 }, this.knob.draggable.bounce = !1, this.knob.borderRadius = this.knobSize / 2, this._updateFrame(), this._updateKnob(), this._updateFill(), this.on("change:frame", this._updateFrame), this.on("change:borderRadius", this._setRadius), this.knob.on("change:size", this._updateKnob), this.knob.on("change:frame", this._updateFill), this.knob.on("change:frame", this._knobDidMove), this.sliderOverlay.on(Events$5.TapStart, this._tapStart), this.sliderOverlay.on(Events$5.TapEnd, this._tapEnd);
  }
  _tapStart(e) {
    if (e.preventDefault(), this.width > this.height) {
      const i = Events$5.touchEvent(e).clientX - Screen.canvasFrame.x, n = this.canvasScaleX();
      this.value = this.valueForPoint(i / n - this.screenFrame.x);
    } else {
      const i = Events$5.touchEvent(e).clientY - Screen.canvasFrame.y, n = this.canvasScaleY();
      this.value = this.valueForPoint(i / n - this.screenFrame.y);
    }
    return this.knob.draggable._panStart(e), this._updateValue();
  }
  _tapEnd(e) {
    return this._updateValue();
  }
  _updateFill() {
    return this.width > this.height ? this.fill.width = this.knob.midX : this.fill.height = this.knob.midY;
  }
  _updateKnob() {
    return this.width > this.height ? (this.knob.midX = this.fill.width, this.knob.centerY()) : (this.knob.midY = this.fill.height, this.knob.centerX());
  }
  _updateFrame() {
    return this.knob.draggable.constraints = {
      x: -this.knob.width / 2,
      y: -this.knob.height / 2,
      width: this.width + this.knob.width,
      height: this.height + this.knob.height
    }, this.constrained && (this.knob.draggable.constraints = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }), this.hitArea = this.hitArea, this.width > this.height ? (this.fill.height = this.height, this.knob.midX = this.pointForValue(this.value), this.knob.centerY()) : (this.fill.width = this.width, this.knob.midY = this.pointForValue(this.value), this.knob.centerX()), this.width > this.height ? (this.knob.draggable.speedY = 0, this.knob.draggable.speedX = 1) : (this.knob.draggable.speedX = 0, this.knob.draggable.speedY = 1), this.sliderOverlay.center();
  }
  _setRadius() {
    const e = this.borderRadius;
    return this.fill.borderRadius = {
      topLeft: e,
      bottomLeft: e
    };
  }
  _knobDidMove() {
    return this.width > this.height ? this.value = this.valueForPoint(this.knob.midX) : this.value = this.valueForPoint(this.knob.midY);
  }
  _updateValue() {
    if (this._lastUpdatedValue !== this.value)
      return this._lastUpdatedValue = this.value, this.emit("change:value", this.value), this.emit(Events$5.SliderValueChange, this.value);
  }
  pointForValue(e) {
    return this.width > this.height ? this.constrained ? Utils$1.modulate(
      e,
      [this.min, this.max],
      [0 + this.knob.width / 2, this.width - this.knob.width / 2],
      !0
    ) : Utils$1.modulate(
      e,
      [this.min, this.max],
      [0, this.width],
      !0
    ) : this.constrained ? Utils$1.modulate(
      e,
      [this.min, this.max],
      [0 + this.knob.height / 2, this.height - this.knob.height / 2],
      !0
    ) : Utils$1.modulate(
      e,
      [this.min, this.max],
      [0, this.height],
      !0
    );
  }
  valueForPoint(e) {
    return this.width > this.height ? this.constrained ? Utils$1.modulate(
      e,
      [0 + this.knob.width / 2, this.width - this.knob.width / 2],
      [this.min, this.max],
      !0
    ) : Utils$1.modulate(
      e,
      [0, this.width],
      [this.min, this.max],
      !0
    ) : this.constrained ? Utils$1.modulate(
      e,
      [0 + this.knob.height / 2, this.height - this.knob.height / 2],
      [this.min, this.max],
      !0
    ) : Utils$1.modulate(
      e,
      [0, this.height],
      [this.min, this.max],
      !0
    );
  }
  animateToValue(e, i) {
    if (i == null && (i = { curve: "spring(300, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? i.properties = {
        x: this.pointForValue(e) - this.knob.width / 2
      } : i.properties = {
        y: this.pointForValue(e) - this.knob.height / 2
      }, this.knob.animate(i);
  }
  //#############################################################
  //# EVENT HELPERS
  onValueChange(e) {
    return this.on(Events$5.SliderValueChange, e);
  }
}
SliderComponent.initClass();
Events$5.SliderValueChange = "sliderValueChange";
Events$5.SliderMinValueChange = "sliderMinValueChange";
Events$5.SliderMaxValueChange = "sliderMaxValueChange";
class Knob extends Layer$1 {
  constructor(e) {
    e == null && (e = {}), _.defaults(e, {
      backgroundColor: "#fff",
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: "rgba(0, 0, 0, 0.3)"
    }), super(e);
  }
}
class RangeSliderComponent extends Layer$1 {
  static initClass() {
    this.define("constrained", this.simpleProperty("constrained", !1)), this.define("knobSize", {
      get() {
        return this._knobSize;
      },
      set(e) {
        for (var i of [this.minKnob, this.maxKnob]) {
          var n = i.borderRadius * 2 === this._knobSize;
          this._knobSize = e, i.size = this._knobSize, n && (i.borderRadius = this._knobSize / 2);
        }
        return this._updateFrame();
      }
    }), this.define("hitArea", {
      get() {
        return this._hitArea;
      },
      set(e) {
        return this._hitArea = e, this.width > this.height ? (this.sliderOverlay.width = this.width + this.hitArea, this.sliderOverlay.height = this.hitArea) : (this.sliderOverlay.width = this.hitArea, this.sliderOverlay.height = this.height + this.hitArea);
      }
    }), this.define("min", {
      get() {
        return this._min || 0;
      },
      set(e) {
        if (_.isFinite(e))
          return this._min = e;
      }
    }), this.define("max", {
      get() {
        return this._max || 1;
      },
      set(e) {
        if (_.isFinite(e))
          return this._max = e;
      }
    }), this.define("minValue", {
      get() {
        return this._minValue || 0;
      },
      set(e) {
        if (_.isFinite(e))
          return this._minValue = e, this.width > this.height ? this.minKnob.midX = this.pointForValue(e) : this.minKnob.midY = this.pointForValue(e), this._updateFill(), this._updateValue();
      }
    }), this.define("maxValue", {
      get() {
        return this._maxValue || 0.5;
      },
      set(e) {
        if (_.isFinite(e))
          return this._maxValue = e, this.width > this.height ? this.maxKnob.midX = this.pointForValue(e) : this.maxKnob.midY = this.pointForValue(e), this._updateFill(), this._updateValue();
      }
    });
  }
  constructor(e) {
    this._tapStart = this._tapStart.bind(this), this._tapEnd = this._tapEnd.bind(this), this._styleKnob = this._styleKnob.bind(this), this._updateFill = this._updateFill.bind(this), this._updateKnob = this._updateKnob.bind(this), this._updateFrame = this._updateFrame.bind(this), this._setRadius = this._setRadius.bind(this), this._knobDidMove = this._knobDidMove.bind(this), this._updateValue = this._updateValue.bind(this), e == null && (e = {}), _.defaults(e, {
      backgroundColor: "#ccc",
      borderRadius: 50,
      clip: !1,
      width: 300,
      height: 10,
      value: 0,
      knobSize: 30
    }), e.hitArea == null && (e.hitArea = e.knobSize), this.minKnob = new Knob({
      name: "minKnob",
      size: this.knobSize || 30
    }), this.maxKnob = new Knob({
      name: "maxKnob",
      size: this.knobSize || 30
    }), this.fill = new Layer$1({
      backgroundColor: "#333",
      width: 0,
      force2d: !0,
      name: "fill"
    }), this.sliderOverlay = new Layer$1({
      backgroundColor: null,
      name: "sliderOverlay"
    }), super(e), this.width > this.height ? this.fill.height = this.height : this.fill.width = this.width, this.fill.borderRadius = this.sliderOverlay.borderRadius = this.borderRadius, this.knobSize = e.knobSize, this._styleKnob(this.minKnob), this._styleKnob(this.maxKnob), this._updateFrame(), this._updateFill(), this._updateKnob(), this.on("change:frame", this._updateFrame), this.on("change:borderRadius", this._setRadius);
    for (var i of [this.minKnob, this.maxKnob])
      i.on("change:size", this._updateKnob), i.on("change:frame", this._updateFill), i.on("change:frame", this._knobDidMove), i.on("change:frame", this._updateFrame);
    this.sliderOverlay.on(Events$5.TapStart, this._tapStart), this.sliderOverlay.on(Events$5.TapEnd, this._tapEnd);
  }
  _tapStart(e) {
    let i;
    if (e.preventDefault(), this.width > this.height) {
      const n = Events$5.touchEvent(e).clientX - Screen.canvasFrame.x, r = this.canvasScaleX();
      i = this.valueForPoint(n / r - this.x), i > this.maxValue && (this.maxValue = i, this.maxKnob.draggable._panStart(e), this.emit(Events$5.SliderMaxValueChange, this.maxValue)), i < this.minValue && (this.minValue = i, this.minKnob.draggable._panStart(e), this.emit(Events$5.SliderMinValueChange, this.minValue));
    } else {
      const n = Events$5.touchEvent(e).clientY - Screen.canvasFrame.y, r = this.canvasScaleY();
      i = this.valueForPoint(n / r - this.y), i > this.maxValue && (this.maxValue = i, this.maxKnob.draggable._panStart(e), this.emit(Events$5.SliderMaxValueChange, this.maxValue)), i < this.minValue && (this.minValue = i, this.minKnob.draggable._panStart(e), this.emit(Events$5.SliderMinValueChange, this.minValue));
    }
    return this._updateValue();
  }
  _tapEnd(e) {
    return this._updateValue();
  }
  _styleKnob(e) {
    return e.parent = this.fill.parent = this.sliderOverlay.parent = this, e.borderRadius = this.knobSize / 2, _.extend(e.draggable, {
      enabled: !0,
      overdrag: !1,
      momentum: !0,
      bounce: !1,
      momentumOptions: { friction: 5, tolerance: 0.25 }
    });
  }
  _updateFill() {
    return this.width > this.height ? (this.fill.x = this.minKnob.midX, this.fill.width = this.maxKnob.midX - this.minKnob.midX) : (this.fill.y = this.minKnob.midY, this.fill.height = this.maxKnob.midY - this.minKnob.midY);
  }
  _updateKnob() {
    return this.width > this.height ? (this.minKnob.midX = this.fill.x, this.minKnob.centerY(), this.maxKnob.midX = this.fill.x + this.fill.width, this.maxKnob.centerY()) : (this.minKnob.midY = this.fill.y, this.minKnob.centerX(), this.maxKnob.midY = this.fill.y + this.fill.height, this.maxKnob.centerX());
  }
  _updateFrame() {
    let e;
    if (this.minKnob.draggable.constraints = {
      x: -this.minKnob.width / 2,
      y: -this.minKnob.height / 2,
      width: this.maxKnob.midX,
      height: this.maxKnob.midY
    }, this.maxKnob.draggable.constraints = {
      x: this.minKnob.maxX,
      y: this.minKnob.maxY,
      width: this.width + this.maxKnob.width,
      height: this.height + this.maxKnob.height
    }, this.hitArea = this.hitArea, this.width > this.height ? (this.fill.height = this.height, this.minKnob.midX = this.pointForValue(this.minValue), this.maxKnob.midX = this.pointForValue(this.maxValue), this.minKnob.centerY()) : (this.fill.width = this.width, this.minKnob.midY = this.pointForValue(this.minValue), this.maxKnob.midY = this.pointForValue(this.maxValue), this.minKnob.centerX()), this.width > this.height)
      for (e of [this.minKnob, this.maxKnob])
        e.draggable.speedY = 0, e.draggable.speedX = 1;
    else
      for (e of [this.minKnob, this.maxKnob])
        e.draggable.speedX = 0, e.draggable.speedY = 1;
    return this.sliderOverlay.center();
  }
  _setRadius() {
    const e = this.borderRadius;
    return this.fill.borderRadius = {
      topLeft: e,
      bottomLeft: e
    };
  }
  _knobDidMove() {
    return this.width > this.height ? (this.minValue = this.valueForPoint(this.minKnob.midX), this.maxValue = this.valueForPoint(this.maxKnob.midX)) : (this.minValue = this.valueForPoint(this.minKnob.midY), this.maxValue = this.valueForPoint(this.maxKnob.midY));
  }
  _updateValue() {
    if (this.emit(Events$5.SliderValueChange), this.minKnob.draggable.isMoving && this.emit(Events$5.SliderMinValueChange, this.minValue), this.maxKnob.draggable.isMoving)
      return this.emit(Events$5.SliderMaxValueChange, this.maxValue);
  }
  // Retrieve the point (x or y coordinate) of a certain numeric value.
  pointForValue(e) {
    for (var i of [this.minKnob, this.maxKnob])
      return this.width > this.height ? this.constrained ? Utils$1.modulate(
        e,
        [this.min, this.max],
        [0 + i.width / 2, this.width - i.width / 2],
        !0
      ) : Utils$1.modulate(
        e,
        [this.min, this.max],
        [0, this.width],
        !0
      ) : this.constrained ? Utils$1.modulate(
        e,
        [this.min, this.max],
        [0 + i.height / 2, this.height - i.height / 2],
        !0
      ) : Utils$1.modulate(
        e,
        [this.min, this.max],
        [0, this.height],
        !0
      );
  }
  // Retrieve the numeric value of a certain point (x or y coordinate).
  valueForPoint(e) {
    for (var i of [this.minKnob, this.maxKnob])
      return this.width > this.height ? this.constrained ? Utils$1.modulate(
        e,
        [0 + i.width / 2, this.width - i.width / 2],
        [this.min, this.max],
        !0
      ) : Utils$1.modulate(
        e,
        [0, this.width],
        [this.min, this.max],
        !0
      ) : this.constrained ? Utils$1.modulate(
        e,
        [0 + i.height / 2, this.height - i.height / 2],
        [this.min, this.max],
        !0
      ) : Utils$1.modulate(
        e,
        [0, this.height],
        [this.min, this.max],
        !0
      );
  }
  animateToMinValue(e, i) {
    if (i == null && (i = { curve: "spring(250, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? i.properties = {
        x: this.pointForValue(e) - this.minKnob.width / 2
      } : i.properties = {
        y: this.pointForValue(e) - this.minKnob.height / 2
      }, this.minKnob.animate(i);
  }
  animateToMaxValue(e, i) {
    if (i == null && (i = { curve: "spring(250, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? i.properties = {
        x: this.pointForValue(e) - this.maxKnob.width / 2
      } : i.properties = {
        y: this.pointForValue(e) - this.maxKnob.height / 2
      }, this.maxKnob.animate(i);
  }
  //#############################################################
  //# EVENT HELPERS
  onValueChange(e) {
    return this.on(Events$5.SliderValueChange, e);
  }
  onMinValueChange(e) {
    return this.on(Events$5.SliderMinValueChange, e);
  }
  onMaxValueChange(e) {
    return this.on(Events$5.SliderMaxValueChange, e);
  }
}
RangeSliderComponent.initClass();
const centerLayer = (t, e = !1) => {
  const { frame: i } = t;
  return t.parent ? (Utils$1.frameSetMidX(
    i,
    t.parent.width / 2 - t.parent.borderWidth
  ), Utils$1.frameSetMidY(
    i,
    t.parent.height / 2 - t.parent.borderWidth
  )) : (Utils$1.frameSetMidX(i, t._context.innerWidth / 2), Utils$1.frameSetMidY(i, t._context.innerHeight / 2)), e && (i.x = Math.round(i.x), i.y = Math.round(i.y)), t.frame = i, t.frame;
};
class DeviceComponent extends BaseClass {
  static initClass() {
    this.define("context", {
      get() {
        return this._context;
      }
    }), this.define("fullScreen", {
      get() {
        return this._fullScreen;
      },
      set(e) {
        return this._setFullScreen(e);
      }
    }), this.define("screenSize", {
      get() {
        let e;
        return this._shouldRenderFullScreen() ? { size: e } = Canvas : this.isLandscape ? e = {
          width: this._device.screenHeight,
          height: this._device.screenWidth
        } : e = {
          width: this._device.screenWidth,
          height: this._device.screenHeight
        }, e.width /= this._context.devicePixelRatio, e.height /= this._context.devicePixelRatio, e;
      }
    }), this.define("deviceType", {
      get() {
        return this._deviceType;
      },
      set(e) {
        if (e === this._deviceType && e !== "custom")
          return;
        let i = null;
        if (lodash.isString(e)) {
          const a = e.toLowerCase();
          for (var n of Array.from(lodash.keys(Devices))) {
            var r = n.toLowerCase();
            a === r && (i = Devices[n]);
          }
        }
        if (!i)
          throw Error(
            `No device named ${e}. Options are: ${lodash.keys(Devices)}`
          );
        if (this._device === i)
          return;
        const s = this._deviceType === "fullscreen";
        if (this.screen.backgroundColor = "black", i.backgroundColor != null && (this.screen.backgroundColor = i.backgroundColor), i.deviceType === "computer" && Utils$1.domComplete(() => document.body.style.cursor = "auto"), this._device = lodash.clone(i), this._deviceType = e, this.fullscreen = !1, this._updateDeviceImage(), this._updateMaskImage(), this._update(), this.emit("change:deviceType"), this.viewport.point = this._viewportOrientationOffset(), s)
          return this.deviceScale = "fit";
      }
    }), this.define("hideBezel", {
      get() {
        return this._forceHideBezel ? !0 : !Utils$1.isFramerStudio() && this._forceHide ? !1 : this._hideBezel != null ? this._hideBezel : !1;
      },
      set(e) {
        if (Utils$1.isFramerStudio())
          return this._hideBezel = e, this._update();
      }
    }), this.define("deviceScale", {
      get() {
        return this._shouldRenderFullScreen() ? 1 : this._deviceScale || 1;
      },
      set(e) {
        return this.setDeviceScale(e, !1);
      }
    }), this.define("contentScale", {
      get() {
        return this._contentScale || 1;
      },
      set(e) {
        return this.setContentScale(e, !1);
      }
    }), this.define("orientation", {
      get() {
        return Utils$1.isMobile() ? window.orientation : this._orientation || 0;
      },
      set(e) {
        return this.setOrientation(e, !1);
      }
    }), this.define("isPortrait", {
      get() {
        return Math.abs(this.orientation) % 180 === 0;
      }
    }), this.define("isLandscape", {
      get() {
        return !this.isPortrait;
      }
    }), this.define("orientationName", {
      get() {
        if (this.isPortrait)
          return "portrait";
        if (this.isLandscape)
          return "landscape";
      },
      set(e) {
        return this.setOrientation(e, !1);
      }
    });
  }
  constructor(e) {
    super(), this._update = this._update.bind(this), this.customize = this.customize.bind(this), this._updateDeviceImage = this._updateDeviceImage.bind(this), this._updateMaskImage = this._updateMaskImage.bind(this), this.forceHideBezel = this.forceHideBezel.bind(this), this._viewportOrientationOffset = this._viewportOrientationOffset.bind(this), this._orientationChange = this._orientationChange.bind(this), e == null && (e = {});
    let i = Defaults.getDefaults("DeviceComponent", e);
    Framer.Defaults.hasOwnProperty("DeviceView") && (i = lodash.extend(i, Framer.Defaults.DeviceView)), this._setup(), this.animationOptions = i.animationOptions, this.deviceType = i.deviceType, lodash.extend(this, lodash.defaults(e, i)), this.Type = {
      Tablet: "tablet",
      Phone: "phone",
      Computer: "computer"
    };
  }
  _setup() {
    if (!this._setupDone) {
      this._setupDone = !0, this.background = new Layer$1(), this.background.clip = !0, this.background.backgroundColor = "transparent", this.background.classList.add("DeviceBackground"), this.hands = new Layer$1({ name: "hands" }), this.handsImageLayer = new Layer$1({
        parent: this.hands,
        name: "handsImage"
      }), this.phone = new Layer$1({ parent: this.hands, name: "phone" }), this.screenBackground = new Layer$1({
        parent: this.hands,
        name: "screenBackground",
        backgroundColor: "black"
      }), this.screen = new Layer$1({ parent: this.hands, name: "phone" }), this.viewport = new Layer$1({ parent: this.screen, name: "screen" }), this.content = new Layer$1({ parent: this.viewport, name: "viewport" }), this.screenMask = new Layer$1({
        parent: this.screen,
        name: "mask",
        backgroundColor: null
      }), this.content.classList.add("DeviceContent"), this.hands.backgroundColor = "transparent", this.hands._alwaysUseImageCache = !0, this.handsImageLayer.backgroundColor = "transparent", this.hands.classList.add("DeviceHands"), this.phone.backgroundColor = "transparent", this.phone.classList.add("DevicePhone"), this.screen.classList.add("DeviceScreen"), this.screen.clip = !0, this.viewport.backgroundColor = "transparent", this.viewport.classList.add("DeviceComponentPort"), this.content.backgroundColor = "transparent", this.content.classList.add("DeviceContent"), this.content.originX = 0, this.content.originY = 0, Utils$1.isMobile() || Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this._update), Utils$1.isMobile() && Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this._orientationChange);
      for (var e of [
        this.background,
        this.phone,
        this.viewport,
        this.content,
        this.screen,
        this.screenMask
      ])
        e.on("touchmove", (i) => i.preventDefault());
      return this.screenMask.ignoreEvents = !0, this.phone.ignoreEvents = !0, this._context = new Framer.Context({
        parent: this.content,
        name: "DeviceScreen"
      }), this._context.perspective = 1200, this._context.device = this, this.on("change:orientation", function() {
        if (Screen.size !== Screen.height)
          return Screen.emit("resize");
      });
    }
  }
  _update() {
    let e, i, n = this.contentScale;
    n > 1 && (n = 1);
    let r = !1;
    if (this._shouldRenderFullScreen()) {
      const { clientWidth: a } = document.documentElement, { clientHeight: o } = document.documentElement;
      if (Utils$1.isMobile()) {
        if (i = screen.width * window.devicePixelRatio, e = screen.height * window.devicePixelRatio, a < o && i > e || a > o && i < e) {
          const l = i;
          i = e, e = l;
        }
      } else
        i = a / n, e = o / n;
      r = this.content.width !== i || this.content.height !== e;
      for (var s of [
        this.background,
        this.hands,
        this.phone,
        this.viewport,
        this.content,
        this.screen,
        this.screenMask
      ])
        s.x = s.y = 0, s.width = i, s.height = e, s.scale = 1;
      this.content.scale = n, (this.deviceType !== "fullscreen" || Utils$1.isMobile()) && (r = r || this._context.devicePixelRatio !== window.devicePixelRatio, this._context.devicePixelRatio = window.devicePixelRatio), this.screenBackground.visible = this.deviceType !== "fullscreen", Utils$1.isMobile() ? this.screenMask.visible = !1 : this._updateMaskImage();
    } else {
      if (this.background.x = -100, this.background.y = -100, this.background.width = window.innerWidth + 200, this.background.height = window.innerHeight + 200, this.disableSizeUpdates)
        return;
      this._updateDeviceImage(), this._updateMaskImage(), this.screenMask.visible = this.hideBezel, this.hands.scale = this._calculatePhoneScale(), centerLayer(this.hands, !0), centerLayer(this.phone), [i, e] = Array.from(
        this._getOrientationDimensions(
          this._device.screenWidth / n,
          this._device.screenHeight / n
        )
      ), this.screenMask.width = this.screen.width = this.viewport.width = this._device.screenWidth, this.screenMask.height = this.screen.height = this.viewport.height = this._device.screenHeight, r = this.content.width !== i || this.content.height !== e, this.content.width = i, this.content.height = e, this.screenBackground.width = this.screen.width + 40, this.screenBackground.height = this.screen.height + 40, this.selectedHand && this._orientation === 0 && this.setHand(this.selectedHand), centerLayer(this.screenBackground, !0), centerLayer(this.screen, !0), centerLayer(this.screenMask, !0);
      const o = this._device.devicePixelRatio != null ? this._device.devicePixelRatio : 1;
      r = r || this._context.devicePixelRatio !== o, this._context.devicePixelRatio = o, window.devicePixelRatio === o && Utils$1.isDesktop() ? (this._context.renderUsingNativePixelRatio = !0, this.content.scale = o) : (this._context.renderUsingNativePixelRatio = !1, this.content.scale = 1);
    }
    if (r)
      return Screen.emit("resize");
  }
  _shouldRenderFullScreen() {
    return !this._device || this.fullScreen === !0 || this.deviceType === "fullscreen" ? !0 : Utils$1.isInsideIframe() ? !1 : Utils$1.deviceType() === "phone" && Utils$1.deviceType() === this._device.deviceType || Utils$1.deviceType() === "tablet" && Utils$1.deviceType() === this._device.deviceType || Utils$1.deviceType() === "phone" && this._device.deviceType === "tablet";
  }
  setupContext() {
    return Framer.CurrentContext = this._context;
  }
  platform() {
    return /google|nexus|htc|samsung|sony-smartwatch/.test(this.deviceType) ? "Android" : /iphone|ipad/.test(this.deviceType) ? "iOS" : /apple-watch|applewatch/.test(this.deviceType) ? "watchOS" : /apple|safari/.test(this.deviceType) ? "macOS" : /microsoft|dell/.test(this.deviceType) ? "Windows" : null;
  }
  _setFullScreen(e) {
    if (this._deviceType !== "fullscreen" && lodash.isBoolean(e) && e !== this._fullScreen)
      return this._fullScreen = e, e === !0 ? (this.phone.image = "", this.hands.image = "") : this._updateDeviceImage(), this._updateMaskImage(), this._update(), this.emit("change:fullScreen");
  }
  //##########################################################################
  // DEVICE TYPE
  customize(e) {
    return Devices.custom = lodash.defaults(e, Devices.custom), this.deviceType = "custom", this._update();
  }
  _updateDeviceImage() {
    if (!(typeof navigator > "u" || /Headless/.test(navigator.userAgent)))
      return this._shouldRenderFullScreen() || this.hideBezel ? (this.phone.image = "", this.hands.image = "") : this._deviceImageUrl(this._deviceImageName()) ? (this.phone._alwaysUseImageCache = !0, this.phone.image = this._deviceImageUrl(this._deviceImageName()), this.phone.width = this._device.deviceImageWidth, this.phone.height = this._device.deviceImageHeight, this.hands.width = this.phone.width, this.hands.height = this.phone.height) : this.phone.image = "";
  }
  _updateMaskImage() {
    return this._device.screenMask ? (this.phone.bringToFront(), this.screenMask.image = this._deviceImageUrl(this._device.screenMask), this.screenMask.visible = !0) : (this.screenMask.image = null, this.screenMask.visible = !1, this.phone.placeBehind(this.screen));
  }
  _deviceImageName() {
    return this._device.hasOwnProperty("deviceImage") ? this._device.deviceImage : `${this._deviceType}.png`;
  }
  _deviceImageUrl(e) {
    if (!e)
      return null;
    if (lodash.startsWith(e, "http://") || lodash.startsWith(e, "https://") || !Array.from(BuiltInDevices).includes(this._deviceType) || this._deviceType === "custom")
      return e;
    let i = "//resources.framerjs.com/static/DeviceResources";
    if (Utils$1.isFileUrl(window.location.href) && (i = `http:${i}`), Utils$1.isFramerStudio() && window.FramerStudioInfo && (this._device.minStudioVersion && Utils$1.framerStudioVersion() >= this._device.minStudioVersion || !this._device.minStudioVersion) && (this._device.maxStudioVersion && Utils$1.framerStudioVersion() <= this._device.maxStudioVersion || !this._device.maxStudioVersion))
      return i = window.FramerStudioInfo.deviceImagesUrl, `${i}/${e.replace(".png", ".jp2")}`;
    if (this._device.deviceImageCompression === !0) {
      if (Utils$1.isWebPSupported())
        return `${i}/${e.replace(".png", ".webp")}`;
      if (Utils$1.isJP2Supported())
        return `${i}/${e.replace(".png", ".jp2")}`;
    }
    return `${i}/${e}`;
  }
  forceHideBezel(e) {
    return e == null && (e = !0), this._forceHideBezel = e, this._update();
  }
  setDeviceScale(e, i) {
    let n;
    if (i == null && (i = !1), e === "fit" || e < 0 ? e = "fit" : e = parseFloat(e), e !== this._deviceScale && (this._deviceScale = e, !this._shouldRenderFullScreen()))
      return e === "fit" ? n = this._calculatePhoneScale() : n = e, this.hands.animateStop(), i ? this.hands.animate(
        lodash.extend(this.animationOptions, { properties: { scale: n } })
      ) : (this.hands.scale = n, centerLayer(this.hands, !0)), this.emit("change:deviceScale");
  }
  _calculatePhoneScale(e, i) {
    let n;
    const r = this.hideBezel ? this.screen : this.phone, [s, a] = Array.from(
      this._getOrientationDimensions(r.width, r.height)
    );
    if (this.hideBezel)
      n = 0;
    else {
      const l = (this._device != null ? this._device.paddingOffset : void 0) || 0;
      n = (this.padding + l) * 2;
    }
    e == null && (e = window.innerWidth), i == null && (i = window.innerHeight);
    let o = lodash.min([
      (e - n) / s,
      (i - n) / a
    ]);
    return o = Math.floor(o * 1024) / 1024, o < 1 / 64 && (o = 1 / 64), (!Utils$1.isFramerStudio() || !this.hideBezel) && (30 / 64 < o && o < 35 / 64 ? o = 32 / 64 : 15 / 64 < o && o < 18 / 64 && (o = 16 / 64)), o > 1 && !this.hideBezel && (o = 1), this.emit("change:phoneScale", o), this._deviceScale && this._deviceScale !== "fit" ? this._deviceScale : o;
  }
  setContentScale(e, i) {
    if (i == null && (i = !1), e = parseFloat(e), !(e <= 0) && e !== this._contentScale)
      return this._contentScale = e, i ? this.content.animate(
        lodash.extend(this.animationOptions, {
          properties: { scale: this._contentScale }
        })
      ) : this.content.scale = this._contentScale, this._update(), this.emit("change:contentScale");
  }
  setOrientation(e, i, n = null) {
    let r;
    if (i == null && (i = !1), Utils$1.framerStudioVersion() === oldDeviceMaxVersion && (e *= -1), e === "portrait" && (e = 0), e === "landscape" && (e = 90), this._shouldRenderFullScreen() || (e = parseInt(e), ![0, 90, -90].includes(e)) || e === this._orientation)
      return;
    this._orientation = e;
    const s = { rotationZ: -this._orientation }, a = lodash.clone(this.animationOptions);
    n != null ? (r = this._calculatePhoneScale(
      n.width,
      n.height
    ), s.x = n.width / 2 - this.hands.width / 2, s.y = n.height / 2 - this.hands.height / 2, a.time = null, a.curve = Spring({ tension: 342.10059, friction: 28.97662 })) : r = this._calculatePhoneScale(), s.scale = r;
    const o = this._viewportOrientationOffset();
    if (this.hands.animateStop(), this.viewport.animateStop(), i) {
      const l = this.background.backgroundColor, u = this.screenBackground.visible;
      this.hideBezel && (this.screenBackground.visible = !1, this.background.backgroundColor = this.screen.backgroundColor, this.disableSizeUpdates = !0);
      const c = this.hands.animate(
        lodash.extend(a, { properties: s })
      );
      this.viewport.animate(
        lodash.extend(a, { properties: o })
      ), c.on(Events$5.AnimationEnd, () => this._update()), c.on(Events$5.AnimationStop, () => (this.disableSizeUpdates = !1, this.background.backgroundColor = l, this.screenBackground.visible = u));
    } else
      this.hands.props = s, this.viewport.props = o, this._update();
    return this._orientation !== 0 && (this.handsImageLayer.image = ""), this.emit("change:orientation", this._orientation);
  }
  _viewportOrientationOffset() {
    const [e, i] = Array.from(
      this._getOrientationDimensions(
        this._device.screenWidth,
        this._device.screenHeight
      )
    );
    this.content.width = e, this.content.height = i;
    let n = (this.screen.width - e) / 2;
    this._orientation === -90 && (n *= -1);
    let [r, s] = Array.from([0, 0]);
    return this.isLandscape && (r = n, s = n), {
      rotationZ: this._orientation,
      x: r,
      y: s
    };
  }
  _orientationChange() {
    return this._orientation = window.orientation, this._update(), this.emit("change:orientation", window.orientation);
  }
  rotateLeft(e) {
    if (e == null && (e = !0), this.orientation !== 90)
      return this.setOrientation(this.orientation + 90, e);
  }
  rotateRight(e) {
    if (e == null && (e = !0), this.orientation !== -90)
      return this.setOrientation(this.orientation - 90, e);
  }
  _getOrientationDimensions(e, i) {
    return this.isLandscape ? [i, e] : [e, i];
  }
  //##########################################################################
  // HANDS
  handSwitchingSupported() {
    return this._device.hands !== void 0 && !this.hideBezel;
  }
  nextHand() {
    if (this.hands.rotationZ === 0) {
      if (this.handSwitchingSupported()) {
        const e = lodash.keys(this._device.hands);
        if (e.length > 0) {
          const i = e.indexOf(this.selectedHand) + 1;
          let n = "";
          i < e.length && (n = e[i]);
          const r = this.setHand(n);
          return this._update(), r;
        }
      }
      return !1;
    }
  }
  setHand(e) {
    if (this.selectedHand = e, !e || !this.handSwitchingSupported())
      return this.handsImageLayer.image = "";
    const i = this._device.hands[e];
    if (i)
      return this.hands.width = i.width, this.hands.height = i.height, centerLayer(this.hands, !0), centerLayer(this.phone), this.handsImageLayer.size = this.hands.size, this.handsImageLayer.y = 0, i.offset && (this.handsImageLayer.y = i.offset), this.handsImageLayer.image = this.handImageUrl(e), e;
  }
  handImageUrl(e) {
    let i = "//resources.framerjs.com/static/DeviceResources";
    return Utils$1.isFileUrl(window.location.href) && (i = `http://${i}`), Utils$1.isFramerStudio() && window.FramerStudioInfo && Utils$1.framerStudioVersion() >= newDeviceMinVersion ? (i = window.FramerStudioInfo.deviceImagesUrl, `${i}/${e}.png`) : Utils$1.isWebPSupported() ? `${i}/${e}.webp` : Utils$1.isJP2Supported() ? `${i}/${e}.jp2` : `${i}/${e}.png`;
  }
  toInspect() {
    return `<Device '${this.deviceType}' ${this.screenSize.width}x${this.screenSize.height}>`;
  }
  prepareForSnapshot() {
    return this.hideBezel = !0, this.setDeviceScale(-1, !0), this.screenMask.visible = !1, this.screenBackground.visible = !1, this.background.backgroundColor = null;
  }
}
DeviceComponent.initClass();
const iPhoneXReleaseVersion = 105, googlePixelReleaseVersion = 75, desktopReleaseVersion = 70;
var newDeviceMinVersion = 53, oldDeviceMaxVersion = 52;
const redesignMaxVersion = 92, iPadAir2BaseDevice = {
  deviceImageWidth: 1856,
  deviceImageHeight: 2608,
  deviceImageCompression: !0,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion
}, iPadMini4BaseDevice = {
  deviceImageWidth: 1936,
  deviceImageHeight: 2688,
  deviceImageCompression: !0,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion
}, iPadProBaseDevice = {
  deviceImageWidth: 2448,
  deviceImageHeight: 3432,
  deviceImageCompression: !0,
  screenWidth: 2048,
  screenHeight: 2732,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion
}, iPhoneXBaseDevice = {
  deviceImageWidth: 1405,
  deviceImageHeight: 2796,
  deviceImageCompression: !0,
  screenWidth: 1125,
  screenHeight: 2436,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  screenMask: "apple-iphone-x-mask.svg",
  hands: {
    "iphone-hands-2": {
      width: 3567,
      height: 5558,
      offset: -15
    },
    "iphone-hands-1": {
      width: 3567,
      height: 5558,
      offset: -15
    }
  }
}, iPhone8BaseDevice = {
  deviceImageWidth: 871,
  deviceImageHeight: 1776,
  deviceImageCompression: !0,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 2399,
      height: 3738
    },
    "iphone-hands-1": {
      width: 2399,
      height: 3738
    }
  }
}, iPhone8PlusBaseDevice = {
  deviceImageWidth: 1436,
  deviceImageHeight: 2876,
  deviceImageCompression: !0,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 3949,
      height: 6154,
      offset: -15
    },
    "iphone-hands-1": {
      width: 3949,
      height: 6154,
      offset: -15
    }
  }
}, iPhone7BaseDevice = {
  deviceImageWidth: 874,
  deviceImageHeight: 1792,
  deviceImageCompression: !0,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: 71,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 2400,
      height: 3740
    },
    "iphone-hands-1": {
      width: 2400,
      height: 3740
    }
  }
}, iPhone7PlusBaseDevice = {
  deviceImageWidth: 1452,
  deviceImageHeight: 2968,
  deviceImageCompression: !0,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: 71,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 3987,
      height: 6212
    },
    "iphone-hands-1": {
      width: 3987,
      height: 6212
    }
  }
}, iPhone6BaseDevice = {
  deviceImageWidth: 874,
  deviceImageHeight: 1792,
  deviceImageCompression: !0,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
  hands: {
    "iphone-hands-2": {
      width: 2400,
      height: 3740
    },
    "iphone-hands-1": {
      width: 2400,
      height: 3740
    }
  }
}, iPhone6PlusBaseDevice = {
  deviceImageWidth: 1452,
  deviceImageHeight: 2968,
  deviceImageCompression: !0,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
  hands: {
    "iphone-hands-2": {
      width: 3987,
      height: 6212
    },
    "iphone-hands-1": {
      width: 3987,
      height: 6212
    }
  }
}, iPhoneSEBaseDevice = {
  deviceImageWidth: 768,
  deviceImageHeight: 1610,
  deviceImageCompression: !0,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 19
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 19
    }
  }
}, iPhone5BaseDevice = {
  deviceImageWidth: 768,
  deviceImageHeight: 1612,
  deviceImageCompression: !0,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 19
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 19
    }
  }
}, iPhone5CBaseDevice = {
  deviceImageWidth: 776,
  deviceImageHeight: 1620,
  deviceImageCompression: !0,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 28
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 28
    }
  }
}, Nexus4BaseDevice = {
  deviceImageWidth: 860,
  deviceImageHeight: 1668,
  deviceImageCompression: !0,
  screenWidth: 768,
  screenHeight: 1280,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 2362,
      height: 3681,
      offset: -52
    },
    "iphone-hands-1": {
      width: 2362,
      height: 3681,
      offset: -52
    }
  }
}, Nexus5BaseDevice = {
  deviceImageWidth: 1204,
  deviceImageHeight: 2432,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3292,
      height: 5130,
      offset: 8
    },
    "iphone-hands-1": {
      width: 3292,
      height: 5130,
      offset: 8
    }
  }
}, Nexus6BaseDevice = {
  deviceImageWidth: 1576,
  deviceImageHeight: 3220,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 3.5,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4304,
      height: 6707,
      offset: 8
    },
    "iphone-hands-1": {
      width: 4304,
      height: 6707,
      offset: 8
    }
  }
}, PixelBaseDevice = {
  deviceImageWidth: 1224,
  deviceImageHeight: 2492,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 2.627,
  deviceType: "phone",
  minStudioVersion: googlePixelReleaseVersion,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 3344,
      height: 5211,
      offset: 23
    },
    "iphone-hands-1": {
      width: 3344,
      height: 5211,
      offset: 23
    }
  }
}, Pixel2BaseDevice = {
  deviceImageWidth: 1210,
  deviceImageHeight: 2513,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 2.627,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 3316,
      height: 5167
    },
    "iphone-hands-1": {
      width: 3316,
      height: 5167
    }
  }
}, Pixel2XLBaseDevice = {
  deviceImageWidth: 1650,
  deviceImageHeight: 3364,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 2880,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  screenMask: "google-pixel-2-xl-mask.svg",
  hands: {
    "iphone-hands-2": {
      width: 4530,
      height: 7059
    },
    "iphone-hands-1": {
      width: 4521,
      height: 7045
    }
  }
}, Nexus9BaseDevice = {
  deviceImageWidth: 1896,
  deviceImageHeight: 2648,
  deviceImageCompression: !0,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion
}, HTCa9BaseDevice = {
  deviceImageWidth: 1252,
  deviceImageHeight: 2592,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3436,
      height: 5354,
      offset: 36
    },
    "iphone-hands-1": {
      width: 3436,
      height: 5354,
      offset: 36
    }
  }
}, HTCm8BaseDevice = {
  deviceImageWidth: 1232,
  deviceImageHeight: 2572,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3436,
      height: 5354,
      offset: 12
    },
    "iphone-hands-1": {
      width: 3436,
      height: 5354,
      offset: 12
    }
  }
}, MSFTLumia950BaseDevice = {
  deviceImageWidth: 1660,
  deviceImageHeight: 3292,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4494,
      height: 7003,
      offset: -84
    },
    "iphone-hands-1": {
      width: 4494,
      height: 7003,
      offset: -84
    }
  }
}, SamsungGalaxyNote5BaseDevice = {
  deviceImageWidth: 1572,
  deviceImageHeight: 3140,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4279,
      height: 6668,
      offset: -24
    },
    "iphone-hands-1": {
      width: 4279,
      height: 6668,
      offset: -84
    }
  }
}, SamsungGalaxyS8BaseDevice = {
  deviceImageWidth: 1536,
  deviceImageHeight: 3334,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 2960,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  screenMask: "samsung-galaxy-s8-mask.svg",
  hands: {
    "iphone-hands-2": {
      width: 4210,
      height: 6560
    },
    "iphone-hands-1": {
      width: 4210,
      height: 6560
    }
  }
}, AppleWatchSeries242Device = {
  deviceImageWidth: 512,
  deviceImageHeight: 990,
  deviceImageCompression: !0,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  minStudioVersion: 71
}, AppleWatchSeries238Device = {
  deviceImageWidth: 472,
  deviceImageHeight: 772,
  deviceImageCompression: !0,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: 71
}, AppleWatch42Device = {
  deviceImageWidth: 512,
  deviceImageHeight: 990,
  deviceImageCompression: !0,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion
}, AppleWatch38Device = {
  deviceImageWidth: 472,
  deviceImageHeight: 772,
  deviceImageCompression: !0,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion
}, AppleWatch38BlackLeatherDevice = {
  deviceImageWidth: 472,
  deviceImageHeight: 796,
  deviceImageCompression: !0,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion
}, SonySmartwatch3Base = {
  deviceImageWidth: 444,
  deviceImageHeight: 780,
  deviceImageCompression: !0,
  screenWidth: 320,
  screenHeight: 320,
  devicePixelRatio: 1.5,
  minStudioVersion: iPhoneXReleaseVersion
}, AppleMacBook = {
  deviceImageWidth: 3084,
  deviceImageHeight: 1860,
  deviceImageCompression: !0,
  screenWidth: 2304,
  screenHeight: 1440,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion
}, AppleMacBookAir = {
  deviceImageWidth: 2e3,
  deviceImageHeight: 1220,
  deviceImageCompression: !0,
  screenWidth: 1440,
  screenHeight: 900,
  devicePixelRatio: 1,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion
}, AppleMacBookPro = {
  deviceImageWidth: 3820,
  deviceImageHeight: 2320,
  deviceImageCompression: !0,
  screenWidth: 2880,
  screenHeight: 1800,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion
}, AppleIMac = {
  deviceImageWidth: 5600,
  deviceImageHeight: 5880,
  deviceImageCompression: !0,
  screenWidth: 5120,
  screenHeight: 2880,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion
}, AppleThunderboltDisplay = {
  deviceImageWidth: 2788,
  deviceImageHeight: 2580,
  deviceImageCompression: !0,
  screenWidth: 2560,
  screenHeight: 1440,
  devicePixelRatio: 1,
  deviceType: "computer",
  minStudioVersion: iPhoneXReleaseVersion
}, DellXPS = {
  deviceImageWidth: 5200,
  deviceImageHeight: 3040,
  deviceImageCompression: !0,
  screenWidth: 3840,
  screenHeight: 2160,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion
}, SonyW85OC = {
  deviceImageWidth: 1320,
  deviceImageHeight: 860,
  deviceImageCompression: !0,
  screenWidth: 1280,
  screenHeight: 720,
  devicePixelRatio: 1,
  minStudioVersion: desktopReleaseVersion
}, MicrosoftSurfaceBook = {
  deviceImageWidth: 4102,
  deviceImageHeight: 2474,
  deviceImageCompression: !0,
  screenWidth: 3e3,
  screenHeight: 2e3,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: iPhoneXReleaseVersion
}, MicrosoftSurfacePro3 = {
  deviceImageWidth: 2472,
  deviceImageHeight: 1704,
  deviceImageCompression: !0,
  screenWidth: 2160,
  screenHeight: 1440,
  devicePixelRatio: 1.5,
  deviceType: "tablet",
  minStudioVersion: iPhoneXReleaseVersion
}, MicrosoftSurfacePro4 = {
  deviceImageWidth: 3064,
  deviceImageHeight: 2120,
  deviceImageCompression: !0,
  screenWidth: 2736,
  screenHeight: 1824,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: iPhoneXReleaseVersion
}, old_iPhone6BaseDevice = {
  deviceImageWidth: 870,
  deviceImageHeight: 1738,
  deviceImageCompression: !0,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPhone6BaseDeviceHand = lodash.extend({}, old_iPhone6BaseDevice, {
  deviceImageWidth: 1988,
  deviceImageHeight: 2368,
  deviceImageCompression: !0,
  paddingOffset: -150,
  maxStudioVersion: oldDeviceMaxVersion
}), old_iPhone6PlusBaseDevice = {
  deviceImageWidth: 1460,
  deviceImageHeight: 2900,
  deviceImageCompression: !0,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPhone6PlusBaseDeviceHand = lodash.extend({}, old_iPhone6PlusBaseDevice, {
  deviceImageWidth: 3128,
  deviceImageHeight: 3487,
  deviceImageCompression: !0,
  paddingOffset: -150,
  maxStudioVersion: oldDeviceMaxVersion
}), old_iPhone5BaseDevice = {
  deviceImageWidth: 780,
  deviceImageHeight: 1608,
  deviceImageCompression: !0,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPhone5BaseDeviceHand = lodash.extend({}, old_iPhone5BaseDevice, {
  deviceImageWidth: 1884,
  deviceImageHeight: 2234,
  deviceImageCompression: !0,
  paddingOffset: -200,
  maxStudioVersion: oldDeviceMaxVersion
}), old_iPhone5CBaseDevice = {
  deviceImageWidth: 776,
  deviceImageHeight: 1612,
  deviceImageCompression: !0,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPhone5CBaseDeviceHand = lodash.extend({}, old_iPhone5CBaseDevice, {
  deviceImageWidth: 1894,
  deviceImageHeight: 2244,
  deviceImageCompression: !0,
  paddingOffset: -200,
  maxStudioVersion: oldDeviceMaxVersion
}), old_iPadMiniBaseDevice = {
  deviceImageWidth: 872,
  deviceImageHeight: 1292,
  deviceImageCompression: !0,
  screenWidth: 768,
  screenHeight: 1024,
  devicePixelRatio: 1,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPadMiniBaseDeviceHand = lodash.extend({}, old_iPadMiniBaseDevice, {
  deviceImageWidth: 1380,
  deviceImageHeight: 2072,
  deviceImageCompression: !0,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion
}), old_iPadAirBaseDevice = {
  deviceImageWidth: 1769,
  deviceImageHeight: 2509,
  deviceImageCompression: !0,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion
}, old_iPadAirBaseDeviceHand = lodash.extend({}, old_iPadAirBaseDevice, {
  deviceImageWidth: 4744,
  deviceImageHeight: 4101,
  deviceImageCompression: !0,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion
}), old_Nexus5BaseDevice = {
  deviceImageWidth: 1208,
  deviceImageHeight: 2440,
  deviceImageCompression: !0,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion
}, old_Nexus5BaseDeviceHand = lodash.extend({}, old_Nexus5BaseDevice, {
  // 2692 × 2996
  deviceImageWidth: 2692,
  deviceImageHeight: 2996,
  deviceImageCompression: !0,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion
}), old_Nexus9BaseDevice = {
  deviceImageWidth: 1733,
  deviceImageHeight: 2575,
  deviceImageCompression: !0,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion
}, old_AppleWatch42Device = {
  deviceImageWidth: 552,
  deviceImageHeight: 938,
  deviceImageCompression: !0,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  maxStudioVersion: oldDeviceMaxVersion
}, old_AppleWatch38Device = {
  deviceImageWidth: 508,
  deviceImageHeight: 900,
  deviceImageCompression: !0,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  maxStudioVersion: oldDeviceMaxVersion
};
var Devices = {
  fullscreen: {
    name: "Fullscreen",
    deviceType: "desktop",
    backgroundColor: "transparent"
  },
  custom: {
    name: "Custom",
    deviceImageWidth: 874,
    deviceImageHeight: 1792,
    screenWidth: 750,
    screenHeight: 1334,
    devicePixelRatio: 2,
    deviceType: "phone"
  },
  // iPad Air
  "apple-ipad-air-2-silver": lodash.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-gold": lodash.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-space-gray": lodash.clone(iPadAir2BaseDevice),
  // iPad Mini
  "apple-ipad-mini-4-silver": lodash.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-gold": lodash.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-space-gray": lodash.clone(iPadMini4BaseDevice),
  // iPad Pro
  "apple-ipad-pro-silver": lodash.clone(iPadProBaseDevice),
  "apple-ipad-pro-gold": lodash.clone(iPadProBaseDevice),
  "apple-ipad-pro-space-gray": lodash.clone(iPadProBaseDevice),
  // iPhone X
  "apple-iphone-x-silver": lodash.clone(iPhoneXBaseDevice),
  "apple-iphone-x-space-gray": lodash.clone(iPhoneXBaseDevice),
  // iPhone 8
  "apple-iphone-8-silver": lodash.clone(iPhone8BaseDevice),
  "apple-iphone-8-gold": lodash.clone(iPhone8BaseDevice),
  "apple-iphone-8-space-gray": lodash.clone(iPhone8BaseDevice),
  // iPhone 8 Plus
  "apple-iphone-8-plus-silver": lodash.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-gold": lodash.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-space-gray": lodash.clone(iPhone8PlusBaseDevice),
  // iPhone 7
  "apple-iphone-7-gold": lodash.clone(iPhone7BaseDevice),
  "apple-iphone-7-rose-gold": lodash.clone(iPhone7BaseDevice),
  "apple-iphone-7-silver": lodash.clone(iPhone7BaseDevice),
  "apple-iphone-7-black": lodash.clone(iPhone7BaseDevice),
  "apple-iphone-7-jet-black": lodash.clone(iPhone7BaseDevice),
  // iPhone 7 Plus
  "apple-iphone-7-plus-gold": lodash.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-rose-gold": lodash.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-silver": lodash.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-black": lodash.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-jet-black": lodash.clone(iPhone7PlusBaseDevice),
  // iPhone 6s
  "apple-iphone-6s-gold": lodash.clone(iPhone6BaseDevice),
  "apple-iphone-6s-rose-gold": lodash.clone(iPhone6BaseDevice),
  "apple-iphone-6s-silver": lodash.clone(iPhone6BaseDevice),
  "apple-iphone-6s-space-gray": lodash.clone(iPhone6BaseDevice),
  // iPhone 6s Plus
  "apple-iphone-6s-plus-gold": lodash.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-rose-gold": lodash.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-silver": lodash.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-space-gray": lodash.clone(iPhone6PlusBaseDevice),
  // iPhone SE
  "apple-iphone-se-gold": lodash.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-silver": lodash.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-space-gray": lodash.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-rose-gold": lodash.clone(iPhoneSEBaseDevice),
  // iPhone 5S
  "apple-iphone-5s-gold": lodash.clone(iPhone5BaseDevice),
  "apple-iphone-5s-silver": lodash.clone(iPhone5BaseDevice),
  "apple-iphone-5s-space-gray": lodash.clone(iPhone5BaseDevice),
  // iPhone 5C
  "apple-iphone-5c-blue": lodash.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-green": lodash.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-red": lodash.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-white": lodash.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-yellow": lodash.clone(iPhone5CBaseDevice),
  // Apple Watch Series 2 38mm
  "apple-watch-series-2-38mm-black-steel-black": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-edition": lodash.clone(AppleWatchSeries238Device),
  "apple-watch-series-2-38mm-rose-gold-aluminum-midnight-blue": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-cocoa": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-concrete": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-ocean-blue": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-red": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-turquoise": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-white": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-yellow": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-space-gray-aluminum-black": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-sport-aluminum-walnut": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-steel-white": lodash.clone(AppleWatchSeries238Device),
  // Apple Watch Series 2 42mm
  "apple-watch-series-2-42mm-edition": lodash.clone(AppleWatchSeries242Device),
  "apple-watch-series-2-42mm-gold-aluminum-cocoa": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-rose-gold-aluminum-midnight-blue": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-concrete": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-green": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-light-pink": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-ocean-blue": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-pink-sand": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-red": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-turquoise": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-white": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-yellow": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-black-steel-black": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-gray-aluminum-black": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-steel-white": lodash.clone(AppleWatchSeries242Device),
  // Apple Watch Nike+ 38mm
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": lodash.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": lodash.clone(
    AppleWatchSeries238Device
  ),
  // Apple Watch Nike+ 42mm
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": lodash.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": lodash.clone(
    AppleWatchSeries242Device
  ),
  // Apple Watch 38mm
  "apple-watch-38mm-gold-black-leather-closed": lodash.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-rose-gold-black-leather-closed": lodash.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-stainless-steel-black-leather-closed": lodash.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-black-steel-black-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-gold-midnight-blue-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-rose-gold-lavender-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-blue-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-fog-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-green-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-red-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-walnut-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-white-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-gold-antique-white-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-rose-gold-stone-closed": lodash.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-space-gray-black-closed": lodash.clone(AppleWatch38Device),
  // Apple Watch 42mm
  "apple-watch-42mm-black-steel-black-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-black-leather-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-midnight-blue-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-black-leather-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-lavender-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-blue-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-fog-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-green-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-red-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-walnut-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-white-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-gold-antique-white-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-rose-gold-stone-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-space-gray-black-closed": lodash.clone(AppleWatch42Device),
  "apple-watch-42mm-stainless-steel-black-leather-closed": lodash.clone(AppleWatch42Device),
  // Sony SmartWatch 3
  "sony-smartwatch-3-black": lodash.clone(SonySmartwatch3Base),
  "sony-smartwatch-3-white": lodash.clone(SonySmartwatch3Base),
  // NEXUS
  "google-nexus-4": lodash.clone(Nexus4BaseDevice),
  "google-nexus-5x": lodash.clone(Nexus5BaseDevice),
  "google-nexus-6p": lodash.clone(Nexus6BaseDevice),
  "google-nexus-9": lodash.clone(Nexus9BaseDevice),
  // Pixel
  "google-pixel-quite-black": lodash.clone(PixelBaseDevice),
  "google-pixel-really-blue": lodash.clone(PixelBaseDevice),
  "google-pixel-very-silver": lodash.clone(PixelBaseDevice),
  // Pixel 2
  "google-pixel-2-clearly-white": lodash.clone(Pixel2BaseDevice),
  "google-pixel-2-just-black": lodash.clone(Pixel2BaseDevice),
  "google-pixel-2-kinda-blue": lodash.clone(Pixel2BaseDevice),
  "google-pixel-2-xl-black-and-white": lodash.clone(Pixel2XLBaseDevice),
  "google-pixel-2-xl-just-black": lodash.clone(Pixel2XLBaseDevice),
  // HTC ONE A9
  "htc-one-a9-black": lodash.clone(HTCa9BaseDevice),
  "htc-one-a9-white": lodash.clone(HTCa9BaseDevice),
  // HTC ONE M8
  "htc-one-m8-black": lodash.clone(HTCm8BaseDevice),
  "htc-one-m8-gold": lodash.clone(HTCm8BaseDevice),
  "htc-one-m8-silver": lodash.clone(HTCm8BaseDevice),
  // MICROSOFT LUMIA 950
  "microsoft-lumia-950-black": lodash.clone(MSFTLumia950BaseDevice),
  "microsoft-lumia-950-white": lodash.clone(MSFTLumia950BaseDevice),
  // SAMSUNG NOTE 5
  "samsung-galaxy-note-5-black": lodash.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-gold": lodash.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-pink": lodash.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-silver-titanium": lodash.clone(
    SamsungGalaxyNote5BaseDevice
  ),
  "samsung-galaxy-note-5-white": lodash.clone(SamsungGalaxyNote5BaseDevice),
  //Samsug Galaxy S8
  "samsung-galaxy-s8-orchid-gray": lodash.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-midnight-black": lodash.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-maple-gold": lodash.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-coral-blue": lodash.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-arctic-silver": lodash.clone(SamsungGalaxyS8BaseDevice),
  // Notebooks
  "apple-macbook": lodash.clone(AppleMacBook),
  "apple-macbook-air": lodash.clone(AppleMacBookAir),
  "apple-macbook-pro": lodash.clone(AppleMacBookPro),
  "dell-xps": lodash.clone(DellXPS),
  // Desktops
  "apple-imac": lodash.clone(AppleIMac),
  "apple-thunderbolt-display": lodash.clone(AppleThunderboltDisplay),
  "microsoft-surface-book": lodash.clone(MicrosoftSurfaceBook),
  "microsoft-surface-pro-3": lodash.clone(MicrosoftSurfacePro3),
  "microsoft-surface-pro-4": lodash.clone(MicrosoftSurfacePro4),
  // TV
  "sony-w85Oc": lodash.clone(SonyW85OC),
  // OLD DEVICES
  "desktop-safari-1024-600": {
    deviceType: "browser",
    name: "Desktop Safari 1024 x 600",
    screenWidth: 1024,
    screenHeight: 600,
    devicePixelRatio: 1,
    deviceImageWidth: 1136,
    deviceImageHeight: 760,
    deviceImageCompression: !0,
    backgroundColor: "white"
  },
  "desktop-safari-1280-800": {
    deviceType: "browser",
    name: "Desktop Safari 1280 x 800",
    screenWidth: 1280,
    screenHeight: 800,
    devicePixelRatio: 1,
    deviceImageWidth: 1392,
    deviceImageHeight: 960,
    deviceImageCompression: !0,
    backgroundColor: "white"
  },
  "desktop-safari-1440-900": {
    deviceType: "browser",
    name: "Desktop Safari 1440 x 900",
    screenWidth: 1440,
    screenHeight: 900,
    devicePixelRatio: 1,
    deviceImageWidth: 1552,
    deviceImageHeight: 1060,
    deviceImageCompression: !0,
    backgroundColor: "white"
  },
  // iPhone 6
  "iphone-6-spacegray": lodash.clone(old_iPhone6BaseDevice),
  "iphone-6-spacegray-hand": lodash.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-silver": lodash.clone(old_iPhone6BaseDevice),
  "iphone-6-silver-hand": lodash.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-gold": lodash.clone(old_iPhone6BaseDevice),
  "iphone-6-gold-hand": lodash.clone(old_iPhone6BaseDeviceHand),
  // iPhone 6+
  "iphone-6plus-spacegray": lodash.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-spacegray-hand": lodash.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-silver": lodash.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-silver-hand": lodash.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-gold": lodash.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-gold-hand": lodash.clone(old_iPhone6PlusBaseDeviceHand),
  // iPhone 5S
  "iphone-5s-spacegray": lodash.clone(old_iPhone5BaseDevice),
  "iphone-5s-spacegray-hand": lodash.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-silver": lodash.clone(old_iPhone5BaseDevice),
  "iphone-5s-silver-hand": lodash.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-gold": lodash.clone(old_iPhone5BaseDevice),
  "iphone-5s-gold-hand": lodash.clone(old_iPhone5BaseDeviceHand),
  // iPhone 5C
  "iphone-5c-green": lodash.clone(old_iPhone5CBaseDevice),
  "iphone-5c-green-hand": lodash.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-blue": lodash.clone(old_iPhone5CBaseDevice),
  "iphone-5c-blue-hand": lodash.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-pink": lodash.clone(old_iPhone5CBaseDevice),
  "iphone-5c-pink-hand": lodash.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-white": lodash.clone(old_iPhone5CBaseDevice),
  "iphone-5c-white-hand": lodash.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-yellow": lodash.clone(old_iPhone5CBaseDevice),
  "iphone-5c-yellow-hand": lodash.clone(old_iPhone5CBaseDeviceHand),
  // iPad Mini
  "ipad-mini-spacegray": lodash.clone(old_iPadMiniBaseDevice),
  "ipad-mini-spacegray-hand": lodash.clone(old_iPadMiniBaseDeviceHand),
  "ipad-mini-silver": lodash.clone(old_iPadMiniBaseDevice),
  "ipad-mini-silver-hand": lodash.clone(old_iPadMiniBaseDeviceHand),
  // iPad Air
  "ipad-air-spacegray": lodash.clone(old_iPadAirBaseDevice),
  "ipad-air-spacegray-hand": lodash.clone(old_iPadAirBaseDeviceHand),
  "ipad-air-silver": lodash.clone(old_iPadAirBaseDevice),
  "ipad-air-silver-hand": lodash.clone(old_iPadAirBaseDeviceHand),
  // Nexus 5
  "nexus-5-black": lodash.clone(old_Nexus5BaseDevice),
  "nexus-5-black-hand": lodash.clone(old_Nexus5BaseDeviceHand),
  // Nexus 9
  "nexus-9": lodash.clone(old_Nexus9BaseDevice),
  // Apple Watch 38mm
  "applewatchsport-38-aluminum-sportband-black": lodash.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-blue": lodash.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-green": lodash.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-pink": lodash.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-white": lodash.clone(
    old_AppleWatch38Device
  ),
  "applewatch-38-black-bracelet": lodash.clone(old_AppleWatch38Device),
  "applewatch-38-steel-bracelet": lodash.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-blue": lodash.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-gray": lodash.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-red": lodash.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-black": lodash.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-white": lodash.clone(old_AppleWatch38Device),
  // Apple Watch 42mm
  "applewatchsport-42-aluminum-sportband-black": lodash.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-blue": lodash.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-green": lodash.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-pink": lodash.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-white": lodash.clone(
    old_AppleWatch42Device
  ),
  "applewatch-42-black-bracelet": lodash.clone(old_AppleWatch42Device),
  "applewatch-42-steel-bracelet": lodash.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-blue": lodash.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-gray": lodash.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-red": lodash.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-black": lodash.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-white": lodash.clone(old_AppleWatch42Device)
};
DeviceComponent.Devices = Devices;
var BuiltInDevices = lodash.keys(Devices);
class GridComponent extends Layer$1 {
  static initClass() {
    this.define("rows", {
      get: () => this._rows,
      set: function(e) {
        this._rows = e, this._render();
      }
    }), this.define("columns", {
      get: () => this._columns,
      set: function(e) {
        this._columns = e, this._render();
      }
    }), this.define("spacing", {
      get: function() {
        return this._spacing || { horizontal: 0, vertical: 0 };
      },
      set: function(e) {
        lodash.isNumber(e) && (e = { horizontal: e, vertical: e }), this._spacing = e, this._render();
      }
    }), this.define("renderCell", {
      get: function() {
        return this._renderCell || this._defaultRenderCell;
      },
      set: function(e) {
        if (e !== this._renderCell) {
          if (!lodash.isFunction(e))
            throw new Error(
              `GridComponent.renderCell should be a function, not ${typeof e}`
            );
          this._renderCell = e, this.render();
        }
      }
    }), this.define("cellWidth", {
      get: function() {
        return (this.width - this.spacing.horizontal * (this.columns - 1)) / this.columns;
      }
    }), this.define("cellHeight", {
      get: function() {
        return (this.height - this.spacing.vertical * (this.rows - 1)) / this.rows;
      }
    }), this.define("cells", {
      get: function() {
        return lodash.values(this._cells);
      }
    });
  }
  constructor(e = {}) {
    super(Defaults.getDefaults("GridComponent", e));
  }
  cellX(e) {
    return e * (this.cellWidth + this.spacing.horizontal);
  }
  cellY(e) {
    return e * (this.cellHeight + this.spacing.vertical);
  }
  cellFrame(e, i) {
    return {
      x: this.cellX(e),
      y: this.cellY(i),
      width: this.cellWidth,
      height: this.cellHeight
    };
  }
  cell(e, i) {
    return this._cells[`${e}:${i}`];
  }
  render() {
    return this._render();
  }
  _render() {
    this._reset();
    for (let e = 0; e < this.rows; e++)
      for (let i = 0; i < this.columns; i++) {
        const n = this.cellFrame(i, e), r = new Layer$1({
          parent: this,
          frame: n,
          name: `Cell ${i}:${e}`
        });
        this.renderCell(r, e, i), this._cells[`${i}:${e}`] = r;
      }
    return this._cells;
  }
  _defaultRenderCell(e, i, n) {
    return e.backgroundColor = "#28affa", e.hueRotate = n * 20 + i % this.columns * (20 / (this.columns + 1)), Utils$1.labelLayer(e, `${i}:${n}`), e.style.fontSize = "30px", e;
  }
  _reset() {
    lodash.invokeMap(this.cells, "destroy"), this._cells = {};
  }
}
GridComponent.initClass();
Events$5.TransitionStart = "transitionstart";
Events$5.TransitionHalt = "transitionhalt";
Events$5.TransitionStop = "transitionstop";
Events$5.TransitionEnd = "transitionend";
class FlowComponent extends Layer$1 {
  static initClass() {
    this.define("isModal", {
      get() {
        return this._isModal;
      }
    }), this.define("stack", {
      get() {
        return this._stack.map((e) => e.layer);
      }
    }), this.define("current", {
      get() {
        return __guard__$1(this._stack[this._stack.length - 1], (e) => e.layer);
      }
    }), this.define("previous", {
      get() {
        return __guard__$1(this._stack[this._stack.length - 2], (e) => e.layer);
      }
    }), this.define("scroll", {
      get() {
        return this.current != null ? this.current._flowScroll : void 0;
      }
    }), this.define("mouseWheelEnabled", {
      default: !1,
      get() {
        return this._mouseWheelEnabled;
      },
      set(e) {
        return this._mouseWheelEnabled = e;
      }
    }), this.define("header", {
      get() {
        return this._header;
      },
      set(e) {
        if (e instanceof Layer$1 && (this._header = e, this._header.name = "header", this._header.width = this.width, this._header.setParentPreservingConstraintValues(this), this._header.constraintValues == null && (this._header.x = Align.center, this._header.y = Align.top), this.current))
          return this._wrapLayer(this.current);
      }
    }), this.define("footer", {
      get() {
        return this._footer;
      },
      set(e) {
        if (e instanceof Layer$1 && (this._footer = e, this._footer.name = "footer", this._footer.width = this.width, this._footer.setParentPreservingConstraintValues(this), this._footer.constraintValues == null && (this._footer.x = Align.center, this._footer.y = Align.bottom), this.current))
          return this._wrapLayer(this.current);
      }
    });
  }
  constructor(e, i) {
    this.showPrevious = this.showPrevious.bind(this), this._handleOverlayTap = this._handleOverlayTap.bind(this), this._forwardScrollEvents = this._forwardScrollEvents.bind(this), this._runTransition = this._runTransition.bind(this), e == null && (e = {}), i == null && (i = {});
    let n = null;
    e instanceof Layer$1 ? (n = e, i = i) : i = e, i = _.defaults({}, i, { backgroundColor: "black" }), i.size || (i.width == null && (i.width = Screen.width), i.height == null && (i.height = Screen.height)), i.clip == null && (i.clip = !0), super(i), this.reset(), this.overlay = new Layer$1({
      name: "overlay",
      parent: this,
      size: 0,
      backgroundColor: "black",
      visible: !1
    }), this.overlay.onTap(this._handleOverlayTap), n ? this.showNext(n) : this._tempScroll = new ScrollComponent({
      name: "scrollComponent",
      parent: this,
      width: this.width,
      height: this.height
    });
  }
  reset() {
    if (this._stack)
      for (var e of Array.from(this._stack))
        e.layer !== this._initial && (e.layer.visible = !1);
    if (this._stack = [], this._seen = [], this._current = null, this._isModal = !1, this._initial)
      return this.showNext(this._initial, { animate: !1 });
  }
  //#############################################################
  // Transitions
  transition(e, i, n) {
    if (n == null && (n = {}), !(e instanceof Layer$1))
      throw new Error("FlowComponent.transition expects a layer");
    if (!i)
      throw new Error("FlowComponent.transition expects transitionFunction");
    if (e === this.current)
      return;
    this._tempScroll != null && this._tempScroll.destroy(), n = _.defaults({}, n, {
      animate: this._firstTransition === !0,
      scroll: !0,
      wrap: !0,
      modal: !1
    }), this._isModal = n.modal, e.visible = !0, e.opacity = 1, e.ignoreEvents = !1;
    let r = e;
    n.scroll && n.wrap && (r = this._wrapLayer(e)), r.parent = this, r.visible = !n.animate;
    const s = this.current, a = r, { overlay: o } = this, l = i(this, s, a, o), u = this._buildTransition(l, s, a, o);
    return this._runTransition(
      u,
      "forward",
      n.animate,
      this.current,
      e
    ), this._stack.push({ layer: e, transition: u });
  }
  showNext(e, i) {
    return i == null && (i = {}), this._initial == null && (this._initial = e), this.transition(e, Transitions.show, i);
  }
  showPrevious(e) {
    if (e == null && (e = {}), !this.previous || this.isTransitioning)
      return;
    if (e instanceof Framer._Layer && (e = {}), e = _.defaults({}, e, { count: 1, animate: !0 }), e.count > 1) {
      const { count: n } = e;
      for (let r = 2, s = n, a = 2 <= s; a ? r <= s : r >= s; a ? r++ : r--)
        this.showPrevious({ animate: !1, count: 1 });
    }
    const i = this._stack.pop();
    return this._runTransition(
      i?.transition,
      "back",
      e.animate,
      this.current,
      i.layer
    );
  }
  showOverlayCenter(e, i) {
    return i == null && (i = {}), this._showOverlay(e, Transitions.overlayCenter, i);
  }
  showOverlayTop(e, i) {
    return i == null && (i = {}), this._showOverlay(e, Transitions.overlayTop, i);
  }
  showOverlayRight(e, i) {
    return i == null && (i = {}), this._showOverlay(e, Transitions.overlayRight, i);
  }
  showOverlayBottom(e, i) {
    return i == null && (i = {}), this._showOverlay(e, Transitions.overlayBottom, i);
  }
  showOverlayLeft(e, i) {
    return i == null && (i = {}), this._showOverlay(e, Transitions.overlayLeft, i);
  }
  //#############################################################
  // Internal methods
  _showOverlay(e, i, n) {
    return n == null && (n = {}), this.transition(
      e,
      i,
      _.defaults({}, n, { animate: !0, scroll: !1, modal: !1 })
    );
  }
  _handleOverlayTap() {
    if (!this.isModal)
      return this.showPrevious();
  }
  _wrapLayer(e) {
    let i, n, r, s;
    if (e._flowLayer = e, e instanceof ScrollComponent || e._flowWrapped)
      return e;
    e.width = Math.max(e.width, this.width), e.height = Math.max(e.height, this.height);
    const { size: a } = this;
    if (i = this, Array.from(e.ancestors()).includes(i)) {
      const u = e?.parent;
      s = u?.parent, s instanceof ScrollComponent && (r = s, n = u);
    }
    let o = layoutPage(e, a);
    o = layoutScroll(o, a), e !== o && n?.children.length === 0 && r?.children.length === 1 && r?.children[0] === n && r.destroy(), o._flowLayer = e;
    for (s of [o, ...Array.from(o.children)])
      if (this._forwardScrollEvents(s), s instanceof ScrollComponent) {
        var l = {};
        s.y === 0 && (l.top = (this.header != null ? this.header.height : void 0) || 0), s.maxY === this.height && (l.bottom = (this.footer != null ? this.footer.height : void 0) || 0), s.contentInset = l, e._flowScroll = s, s.mouseWheelEnabled = this._mouseWheelEnabled;
      }
    return o instanceof ScrollComponent && (o.backgroundColor = this.backgroundColor), o;
  }
  _forwardScrollEvents(e) {
    if (e instanceof ScrollComponent && e._flowForward !== !0) {
      for (var i of [
        Events$5.Move,
        Events$5.ScrollStart,
        Events$5.ScrollMove,
        Events$5.ScrollEnd,
        Events$5.ScrollAnimationDidStart,
        Events$5.ScrollAnimationDidEnd
      ])
        ((n) => e.on(n, () => this.emit(n, e)))(i);
      return e._flowForward = !0;
    }
  }
  _runTransition(e, i, n, r, s) {
    let a, o;
    return i === "forward" ? (a = r, o = s) : (a = s, o = r), this.emit(Events$5.TransitionStart, a, o, i), Utils$1.delay(0, () => (this._firstTransition = !0, e[i](n)));
  }
  _buildTransition(e, i, n, r) {
    const s = {};
    return s.forward = (a, o) => {
      a == null && (a = !0);
      const l = (p, y) => (p.once(
        Events$5.AnimationHalt,
        () => this.emit(Events$5.TransitionHalt, i, n, y)
      ), p.once(
        Events$5.AnimationStop,
        () => this.emit(Events$5.TransitionStop, i, n, y)
      ), p.once(
        Events$5.AnimationEnd,
        () => this.emit(Events$5.TransitionEnd, i, n, y)
      )), u = [], c = { instant: !a };
      i && e.layerA && (i.visible = !0, u.push(new Animation(i, e.layerA.hide, c))), n && e.layerB && (n.props = e.layerB.hide, n.bringToFront(), n.visible = !0, u.push(new Animation(n, e.layerB.show, c))), r && e.overlay && (r.visible = !0, r.ignoreEvents = !1, r.placeBehind(n), r.props = e.overlay.hide, u.push(new Animation(r, e.overlay.show, c))), r && e.overlay ? (this.header && this.header.placeBehind(r), this.footer && this.footer.placeBehind(r)) : (this.header && this.header.bringToFront(), this.footer && this.footer.bringToFront());
      const f = new AnimationGroup(u);
      return l(f, "forward"), f.once(Events$5.AnimationEnd, function() {
        if (i && e.layerA && !(r && e.overlay))
          return i.visible = !1;
      }), f.start();
    }, s.back = (a, o) => {
      a == null && (a = !0);
      const l = (p, y) => (p.once(
        Events$5.AnimationHalt,
        () => this.emit(Events$5.TransitionHalt, n, i, y)
      ), p.once(
        Events$5.AnimationStop,
        () => this.emit(Events$5.TransitionStop, n, i, y)
      ), p.once(
        Events$5.AnimationEnd,
        () => this.emit(Events$5.TransitionEnd, n, i, y)
      )), u = [], c = { instant: !a };
      r && e.overlay && (r.visible = !0, r.ignoreEvents = !0, u.push(new Animation(r, e.overlay.hide, c))), i && e.layerA && (i.visible = !0, u.push(new Animation(i, e.layerA.show, c))), n && e.layerB && (n.visible = !0, u.push(new Animation(n, e.layerB.hide, c)));
      const f = new AnimationGroup(u);
      return f.stopAnimations = !1, l(f, "back"), f.once(Events$5.AnimationEnd, function() {
        if (n && e.layerB)
          return n.visible = !1;
      }), f.start();
    }, s;
  }
  //#############################################################
  // Event helpers
  onTransitionStart(e) {
    return this.on(Events$5.TransitionStart, e);
  }
  onTransitionHalt(e) {
    return this.on(Events$5.TransitionHalt, e);
  }
  onTransitionStop(e) {
    return this.on(Events$5.TransitionStop, e);
  }
  onTransitionEnd(e) {
    return this.on(Events$5.TransitionEnd, e);
  }
  onStart(e) {
    return this.onTransitionStart(e);
  }
  onHalt(e) {
    return this.onTransitionHalt(e);
  }
  onStop(e) {
    return this.onTransitionStop(e);
  }
  onEnd(e) {
    return this.onTransitionEnd(e);
  }
}
FlowComponent.initClass();
const findPossibleHeader = function(t) {
  let e, i = null;
  for (e of Array.from(t.children)) {
    var n = e.x === 0 || (e.constraintValues != null ? e.constraintValues.left : void 0) === 0, r = e.width === t.width || (e.constraintValues != null ? e.constraintValues.right : void 0) === 0, s = e.y === 0 || (e.constraintValues != null ? e.constraintValues.top : void 0) === 0;
    if (n && r && s) {
      if (i)
        return;
      i = e;
    }
  }
  if (i) {
    for (e of Array.from(t.children))
      if (i !== e && e.minY < i.maxY)
        return;
    return i;
  }
}, findPossibleFooter = function(t) {
  let e, i = null;
  for (e of Array.from(t.children)) {
    var n = e.x === 0 || (e.constraintValues != null ? e.constraintValues.left : void 0) === 0, r = e.width === t.width || (e.constraintValues != null ? e.constraintValues.right : void 0) === 0, s = e.maxY === t.height || (e.constraintValues != null ? e.constraintValues.bottom : void 0) === 0;
    if (n && r && s) {
      if (i)
        return;
      i = e;
    }
  }
  if (i) {
    for (e of Array.from(t.children))
      if (i !== e && e.maxY > i.minY)
        return;
    return i;
  }
}, findHeader = function(t) {
  const e = findPossibleHeader(t), i = findPossibleFooter(t);
  if (!(e && i && e.maxY === i.minY && e.height >= i.height))
    return e;
}, findFooter = function(t) {
  const e = findPossibleHeader(t), i = findPossibleFooter(t);
  if (!(e && i && e.maxY === i.minY && i.height >= e.height))
    return i;
}, findBody = function(t, e, i) {
  if (!(!e && !i)) {
    for (var n of Array.from(t.children))
      if (n !== e && n !== i && n.x === 0 && n.width === t.width) {
        if (e && i && n.minY === e.maxY && n.maxY === i.minY)
          return n;
        if (e && n.minY === e.maxY && n.maxY === t.height)
          return n;
        if (i && n.minY === 0 && n.maxY === i.minY)
          return n;
      }
  }
}, guessBodyFrame = function(t, e, i) {
  let n;
  if (!(!e && !i) && e?.maxY !== i?.minY) {
    if (e && i)
      n = {
        x: 0,
        y: e.height,
        width: t.width,
        height: t.height - e.height - i.height
      };
    else if (e)
      n = {
        x: 0,
        y: e.height,
        width: t.width,
        height: t.height - e.height
      };
    else if (i)
      n = {
        x: 0,
        y: 0,
        width: t.width,
        height: t.height - i.height
      };
    else
      return;
    if (!((e?.height || 0) > n.height) && !((i?.height || 0) > n.height))
      return n;
  }
};
var layoutPage = function(t, e) {
  let i;
  const n = findHeader(t), r = findFooter(t);
  if (!n && !r)
    return t;
  let s = findBody(t, n, r);
  if (!s && (i = guessBodyFrame(t, n, r), i)) {
    s = new Layer$1({
      frame: i,
      backgroundColor: null
    });
    for (var a of Array.from(t.children))
      if (a !== n && a !== r) {
        a.setParentPreservingConstraintValues(s);
        var o = n?.height || 0;
        a.constraintValues != null ? (a.constraintValues != null ? a.constraintValues.top : void 0) != null && (a.constraintValues != null && (a.constraintValues.top -= o), a.layout()) : a.y -= o;
      }
  }
  if (!s)
    return t;
  i = s.frame, i.width = e.width, i.height = e.height - (n?.height || 0) - (r?.height || 0), s.point = 0, s.width = e.width;
  const l = layoutScroll(s, i);
  return l.parent = t, l.frame = i, t.size = e, r?.maxY > e.height && (r.maxY = e.height), n?.bringToFront(), r?.bringToFront(), t;
}, layoutScroll = function(t, e) {
  if (t.width <= e.width && t.height <= e.height)
    return t;
  const i = new ScrollComponent({
    size: e,
    name: "scroll"
  }), { height: n } = t;
  i.propagateEvents = !1;
  const r = t.constraintValues;
  return t.point = 0, t.parent = i.content, t.constraintValues = r, i.scrollHorizontal = t.maxX > e.width, i.scrollVertical = t.maxY > e.height, i;
}, Transitions = {};
Transitions.show = function(t, e, i, n) {
  const r = { curve: "spring(300, 35, 0)" };
  return {
    layerA: {
      show: { options: r, x: 0, y: 0 },
      hide: {
        options: r,
        x: 0 - e?.width / 2,
        y: 0
      }
    },
    layerB: {
      show: { options: r, x: 0, y: 0 },
      hide: { options: r, x: i.width, y: 0 }
    }
  };
};
Transitions.overlayCenter = function(t, e, i, n) {
  return {
    layerB: {
      show: {
        options: { curve: "spring(500, 35, 0)" },
        x: Align.center,
        y: Align.center,
        scale: 1,
        opacity: 1
      },
      hide: {
        options: { curve: "spring(500, 35, 0)" },
        x: Align.center,
        y: Align.center,
        scale: 0.5,
        opacity: 0
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: t.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: t.size }
    }
  };
};
Transitions.overlayLeft = function(t, e, i, n) {
  return {
    layerB: {
      show: { options: { curve: "spring(300, 35, 0)" }, y: 0, x: 0 },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: 0 - i?.width
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: t.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: t.size }
    }
  };
};
Transitions.overlayRight = function(t, e, i, n) {
  return {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: t?.width - i?.width
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: t?.width
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: t.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: t.size }
    }
  };
};
Transitions.overlayTop = function(t, e, i, n) {
  return {
    layerB: {
      show: { options: { curve: "spring(300, 35, 0)" }, x: Align.center, y: 0 },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        maxY: 0
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: t.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: t.size }
    }
  };
};
Transitions.overlayBottom = function(t, e, i, n) {
  return {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y: t?.height - i?.height
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y: t?.height
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: t.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: t.size }
    }
  };
};
function __guard__$1(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
class CircularProgressComponent extends Layer$1 {
  constructor(i = {}) {
    super(i);
    // Class fields with defaults
    F(this, "_strokeWidth", 1);
    F(this, "_progress", 0);
    F(this, "_progressColor", Color$1.grey(1));
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.setAttribute("width", "100%"), this.svg.setAttribute("height", "100%"), this.svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    ), this.backgroundColor = null, this.rotation = -90, this.rails = this.addShape("circle"), this.rails.setAttribute("fill", "transparent"), this.circle = this.addShape("circle"), this.circle.setAttribute("fill", "transparent"), this.strokeWidth = 1, this.progress = 0, this.railsColor = Color$1.grey(0.2), this.progressColor = Color$1.grey(1), this._element.appendChild(this.svg);
  }
  // Computed radius
  get radius() {
    return this.width / 2 - this.strokeWidth / 2;
  }
  get strokeWidth() {
    return this._strokeWidth;
  }
  set strokeWidth(i) {
    this._strokeWidth = i, this.rails.cx.baseVal.value = this.width / 2, this.rails.cy.baseVal.value = this.width / 2, this.rails.r.baseVal.value = this.radius, this.rails.setAttribute("stroke-width", i), this.circle.cx.baseVal.value = this.width / 2, this.circle.cy.baseVal.value = this.width / 2, this.circle.r.baseVal.value = this.radius, this.circle.setAttribute("stroke-width", i);
  }
  get progressColor() {
    return this._progressColor;
  }
  set progressColor(i) {
    this._progressColor = i, this.circle.setAttribute("stroke", i);
  }
  get railsColor() {
    return this._railsColor || Color$1.grey(0.1);
  }
  set railsColor(i) {
    this._railsColor = i, this.rails.setAttribute("stroke", i);
  }
  get progress() {
    return this._progress;
  }
  set progress(i) {
    this._progress = Utils$1.clamp(i, 0, 1);
    const n = this.radius * Math.PI * 2, r = (1 - this._progress) * n;
    this.circle.setAttribute("stroke-dasharray", n), this.circle.setAttribute("stroke-dashoffset", r);
  }
  addShape(i) {
    const n = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    return this.svg.appendChild(n), n;
  }
  setProgress(i, n = !0, r = {}) {
    if (!n) {
      this.progress = i;
      return;
    }
    const s = Math.abs(this.progress - i) * 0.3;
    r = lodash.defaults(r, {
      curve: "linear",
      time: s
    });
    const a = { progress: Utils$1.clamp(i, 0, 1) };
    return this.animate(a, r);
  }
}
Events$5.MIDICommand = "midiCommand";
class MIDIInput extends BaseClass {
  constructor(...e) {
    super(...e), this._requestResolved = this._requestResolved.bind(this), this._onMidiMessage = this._onMidiMessage.bind(this), this._requestRejected = this._requestRejected.bind(this);
  }
  static initClass() {
    this.define("enabled", {
      get() {
        return (this._inputs?.length ?? void 0) || this._request;
      },
      set(e) {
        if (e !== this.enabled) {
          if (!navigator.requestMIDIAccess)
            return this._requestRejected();
          e ? this._request = navigator.requestMIDIAccess().then(this._requestResolved, this._requestRejected) : (this._inputs?.forEach((i) => i.close?.()), this._request = null, this._inputs = []);
        }
      }
    });
  }
  // Success handler
  _requestResolved(e) {
    this._inputs = [], e.inputs.forEach((i) => {
      this._inputs.push(i), i.onmidimessage = this._onMidiMessage(i.id);
    });
  }
  // Failure handler
  _requestRejected(e) {
    throw new Error(
      `Requesting MIDI access failed: ${e ?? "not supported by browser"}`
    );
  }
  // Event handler
  _onMidiMessage(e) {
    return (i) => {
      this.emit(Events$5.MIDICommand, e, i.timeStamp, i.data);
    };
  }
  // Event shortcut
  onCommand(e) {
    return this.on(Events$5.MIDICommand, e);
  }
}
MIDIInput.initClass();
new MIDIInput();
Events$5.MIDIComponentValueChange = "MIDIComponentValueChange";
class MIDIComponent extends BaseClass {
  static initClass() {
    this.define("min", this.simpleProperty("min", 0)), this.define("max", this.simpleProperty("max", 127)), this.define("control", this.simpleProperty("control", null)), this.define("channel", this.simpleProperty("channel", null)), this.define("source", this.simpleProperty("source", null));
  }
  constructor(e = {}) {
    super(e), MIDIInput.enabled = !0, MIDIInput.onCommand((i, n, r) => {
      const [s, a, o] = r, l = s & 240, u = (s & 15) + 1, c = a & 127, f = o & 127;
      if (![176, 144, 128].includes(l) || this.source != null && this.source !== i || this.channel != null && this.channel !== u || this.control != null && this.control !== c) return;
      let p = { source: i, channel: u, control: c };
      [144, 128].includes(l) && (p = lodash.defaults(p, { type: "note" })), this.emit(Events$5.MIDIComponentValueChange, this._modulate(f), p);
    });
  }
  _modulate(e) {
    return Utils$1.modulate(e, [0, 127], [this.min, this.max]);
  }
  onValueChange(e) {
    return this.on(Events$5.MIDIComponentValueChange, e);
  }
}
MIDIComponent.initClass();
const FramerCSS = `
body {
	margin: 0;
}

.framerContext {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}

.framerLayer {
	display: block;
	position: absolute;
	left: 0;
	top: 0;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	-webkit-overflow-scrolling: touch;
	box-sizing: border-box;
	user-select: none;
}

.framerLayer input,
.framerLayer textarea,
.framerLayer select,
.framerLayer option,
.framerLayer div[contenteditable="true"] {
	pointer-events: auto;
	user-select: auto;
}

.framerLayer svg {
	overflow: visible;
	display: block;
	-webkit-font-smoothing: antialiased;
}

.framerDebug {
	padding: 6px;
	color: #fff;
	font: 10px/1em Monaco, monospace;
}
`;
Utils$1.domComplete(() => {
  Utils$1.insertCSS(FramerCSS);
});
const Config$1 = {
  FramerCSS
}, getTime = () => Utils$1.getTime() * 1e3;
class AnimationLoop extends EventEmitter {
  constructor() {
    super(), this.delta = 1 / 60, this.raf = !0;
    const e = Utils$1.webkitVersion();
    e > 600 && e < 601 && (Utils$1.isFramerStudio() || Utils$1.isDesktop()) && (this.raf = !1), this.maximumListeners = 1 / 0, this.start = this.start.bind(this);
  }
  start() {
    let e = getTime();
    const i = () => {
      let r;
      if (this.delta)
        r = this.delta;
      else {
        const s = getTime();
        r = (s - e) / 1e3, e = s;
      }
      this.emit("update", r), this.emit("render", r);
    }, n = () => {
      this.raf ? (window.requestAnimationFrame(n), i()) : setTimeout(() => {
        window.requestAnimationFrame(n), i();
      }, 0);
    };
    n();
  }
}
class LinearAnimator extends Animator {
  setup(e) {
    return this.options = _.defaults(e, {
      time: 1,
      precision: 1 / 1e3
    }), this._time = 0;
  }
  next(e) {
    return this._time += e, this.finished() ? 1 : this._time / this.options.time;
  }
  finished() {
    return this._time >= this.options.time - this.options.precision;
  }
}
class SpringDHOAnimator extends Animator {
  constructor(...i) {
    super(...i);
    F(this, "_time", 0);
    F(this, "_value", 0);
    F(this, "_velocity", 0);
    F(this, "options", {});
    this.finished = this.finished.bind(this);
  }
  setup(i = {}) {
    this.options = lodash.defaults(i, {
      velocity: 0,
      tolerance: 1 / 1e4,
      stiffness: 50,
      damping: 2,
      mass: 0.2,
      time: null
    }), this._time = 0, this._value = 0, this._velocity = this.options.velocity;
  }
  next(i) {
    if (this.finished()) return 1;
    this._time += i;
    const n = -this.options.stiffness, r = -this.options.damping, s = n * (this._value - 1), a = r * this._velocity;
    return this._velocity += (s + a) / this.options.mass * i, this._value += this._velocity * i, this._value;
  }
  finished() {
    return this._time > 0 && Math.abs(this._velocity) < this.options.tolerance;
  }
}
const ChromeAlert = `Importing layers is currently only supported on Safari. 
For Chrome, run: open -a "Google Chrome" --allow-file-access-from-files`, resizeFrame = (t, e) => {
  if (t === 1 || !e) return e;
  const i = {};
  return ["x", "y", "width", "height"].forEach((n) => {
    e.hasOwnProperty(n) && (i[n] = e[n] * t);
  }), i;
}, startsWithNumber = (t) => /^[0-9]/.test(t), sanitizeLayerName = (t) => {
  for (const e of ["*", "-", ".png", ".jpg", ".pdf"])
    t.toLowerCase().endsWith(e) && (t = t.slice(0, -e.length));
  return t;
};
class Importer {
  constructor(e, i = {}, n = {}) {
    this.path = e, this.options = i, this.extraLayerProperties = n, this.scale = i.scale ?? 1, this.paths = {
      layerInfo: Utils$1.pathJoin(this.path, "layers.json"),
      images: Utils$1.pathJoin(this.path, "images"),
      documentName: decodeURIComponent(this.path.split("/").pop())
    }, this._createdLayers = [], this._createdLayersByName = {};
  }
  async load() {
    const e = await this._loadLayerInfo();
    if (!e || e.length === 0)
      throw new Error("Importer: no layers. Ensure at least one layer exists.");
    return e.forEach((i) => this._createLayer(i)), this._createdLayers.forEach((i) => this._correctLayer(i)), this._correctArtboards(this._createdLayers), this._createdLayers.forEach((i) => {
      i.parent || (i.parent = null);
    }), this._createdLayersByName;
  }
  async _loadLayerInfo() {
    try {
      const e = `${this.paths.documentName}/layers.json.js`;
      if (window.__imported__?.[e])
        return lodash.cloneDeep(window.__imported__[e]);
      const i = await fetch(this.paths.layerInfo);
      if (!i.ok)
        throw new Error(`Failed to load layers: ${i.statusText}`);
      return await i.json();
    } catch (e) {
      throw console.warn(ChromeAlert), e;
    }
  }
  _createLayer(e, i) {
    e.layerFrame && (e.layerFrame = resizeFrame(this.scale, e.layerFrame)), e.maskFrame && (e.maskFrame = resizeFrame(this.scale, e.maskFrame)), e.image?.frame && (e.image.frame = resizeFrame(this.scale, e.image.frame)), e.children || (e.children = []);
    const n = Layer$1, r = {
      shadow: !0,
      name: sanitizeLayerName(e.name),
      frame: e.layerFrame,
      clip: !1,
      backgroundColor: null,
      visible: e.visible ?? !0,
      ...this.extraLayerProperties
    };
    if (e.image && (r.frame = e.image.frame, r.image = Utils$1.pathJoin(this.path, e.image.path)), e.maskFrame && (r.clip = !0), e.kind === "artboard" && (r.backgroundColor = e.backgroundColor), i?.contentLayer ? r.parent = i.contentLayer : i && (r.parent = i), startsWithNumber(r.name))
      throw new Error(
        `Layer/Artboard names cannot start with a number: '${r.name}'`
      );
    const s = new n(r);
    return s.name = r.name, s.__framerImportedFromPath = this.path, r.name.toLowerCase().includes("scroll") && (s.scroll = !0), r.name.toLowerCase().includes("draggable") && (s.draggable.enabled = !0), !s.image && !e.children.length && !e.maskFrame && (s.frame = Utils$1.frameZero()), [...e.children].reverse().forEach((a) => this._createLayer(a, s)), e.kind === "artboard" ? s.point = { x: 0, y: 0 } : !s.image && !e.maskFrame && (s.frame = s.contentFrame()), s._info = e, this._createdLayers.push(s), this._createdLayersByName[s.name] = s, s;
  }
  _correctArtboards(e) {
    const i = e.filter((s) => s._info.kind === "artboard");
    if (!i.length) return;
    const r = i.reduce(
      (s, a) => !s || a.x < s.x ? a : s,
      null
    ).point;
    i.forEach((s) => {
      s.x -= r.x, s.y -= r.y, s.visible = !0;
    });
  }
  _correctLayer(e) {
    const i = (n) => {
      n.parent && (n.frame = Utils$1.convertPoint(n.frame, null, n.parent)), n.children.forEach(i);
    };
    e.parent || i(e);
  }
}
Importer.load = async function(t, e = 1) {
  return await new Importer(t, { scale: e }).load();
};
const createTouch = (t, e, i = { x: 0, y: 0 }) => ({
  identifier: e,
  target: t.target,
  pageX: t.pageX - i.x,
  pageY: t.pageY - i.y,
  clientX: t.clientX - i.x,
  clientY: t.clientY - i.y,
  screenX: t.screenX - i.x,
  screenY: t.screenY - i.y,
  point: {
    x: t.pageX - i.x,
    y: t.pageY - i.y
  }
}), dispatchTouchEvent = (t, e, i, n) => {
  e || ({ target: e } = i);
  const r = document.createEvent("MouseEvent");
  r.initMouseEvent(
    t,
    !0,
    !0,
    window,
    i.detail,
    i.screenX,
    i.screenY,
    i.clientX,
    i.clientY,
    i.ctrlKey,
    i.shiftKey,
    i.altKey,
    i.metaKey,
    i.button,
    i.relatedTarget
  );
  const s = [createTouch(i, 1)];
  return n && s.push(createTouch(i, 2, n)), r.touches = r.changedTouches = r.targetTouches = s, e.dispatchEvent(r);
}, cancelEvent = (t) => {
  t.preventDefault(), t.stopPropagation();
};
class TouchEmulator extends BaseClass {
  constructor(e) {
    super(), this.keydown = this.keydown.bind(this), this.keyup = this.keyup.bind(this), this.mousedown = this.mousedown.bind(this), this.mousemove = this.mousemove.bind(this), this.mouseup = this.mouseup.bind(this), this.mouseout = this.mouseout.bind(this), this.mousemovePosition = this.mousemovePosition.bind(this), this.touchPointerImage = "url('framer/images/cursor@2x.png')", this.touchPointerImageActive = "url('framer/images/cursor-active@2x.png')", this.touchPointerImageSize = 64, this.touchPointerInitialOffset = { x: 0, y: 0 }, this.keyPinchCode = 18, this.keyPanCode = 91, this.context = e || new Context({ name: "TouchEmulator" }), this.context._element.style.zIndex = 1e4, this.wrap = this.context.domEventManager.wrap, this.wrap(document).addEventListener("mousedown", this.mousedown, !0), this.wrap(document).addEventListener("mousemove", this.mousemove, !0), this.wrap(document).addEventListener("mouseup", this.mouseup, !0), this.wrap(document).addEventListener("keydown", this.keydown, !0), this.wrap(document).addEventListener("keyup", this.keyup, !0), this.wrap(document).addEventListener("mouseout", this.mouseout, !0), this.isMouseDown = !1, this.isPinchKeyDown = !1, this.isPanKeyDown = !1, this.context.run(() => {
      this.touchPointLayer = new Layer$1({
        width: this.touchPointerImageSize,
        height: this.touchPointerImageSize,
        backgroundColor: null,
        opacity: 0
      }), this.touchPointLayer.style.backgroundImage = this.touchPointerImage;
    });
  }
  destroy() {
    this.context?.reset(), this.context = null;
  }
  keydown(e) {
    e.keyCode === this.keyPinchCode && (this.isPinchKeyDown = !0, this.startPoint = this.centerPoint = null, this.showTouchCursor(), this.touchPointLayer.midX = this.point?.x ?? 0, this.touchPointLayer.midY = this.point?.y ?? 0), e.keyCode === this.keyPanCode && (this.isPanKeyDown = !0, cancelEvent(e));
  }
  keyup(e) {
    e.keyCode === this.keyPinchCode && (cancelEvent(e), this.isPinchKeyDown = !1, this.hideTouchCursor()), e.keyCode === this.keyPanCode && (cancelEvent(e), this.touchPoint && this.point && (this.centerPoint = Utils$1.pointCenter(this.touchPoint, this.point), this.isPanKeyDown = !1));
  }
  mousedown(e) {
    this.isMouseDown = !0, this.target = e.target, this.isPinchKeyDown ? dispatchTouchEvent(
      "touchstart",
      this.target,
      e,
      this.touchPointDelta
    ) : dispatchTouchEvent("touchstart", this.target, e), this.touchPointLayer.style.backgroundImage = this.touchPointerImageActive;
  }
  mousemove(e) {
    this.point = { x: e.pageX, y: e.pageY }, this.startPoint ?? (this.startPoint = this.point), this.centerPoint ?? (this.centerPoint = this.point), this.isPinchKeyDown && !this.isPanKeyDown && this.centerPoint && (this.touchPoint = Utils$1.pointAdd(
      this.touchPointerInitialOffset,
      this.pinchPoint(this.point, this.centerPoint)
    ), this.touchPointDelta = Utils$1.pointSubtract(this.point, this.touchPoint)), this.isPinchKeyDown && this.isPanKeyDown && this.touchPoint && this.touchPointDelta && (this.touchPoint = this.panPoint(this.point, this.touchPointDelta)), (this.isPinchKeyDown || this.isPanKeyDown) && this.touchPoint && (this.touchPointLayer.visible = !0, this.touchPointLayer.midX = this.touchPoint.x, this.touchPointLayer.midY = this.touchPoint.y), this.isMouseDown && ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPointDelta ? dispatchTouchEvent(
      "touchmove",
      this.target,
      e,
      this.touchPointDelta
    ) : dispatchTouchEvent("touchmove", this.target, e));
  }
  mouseup(e) {
    this.isPinchKeyDown || this.isPanKeyDown ? dispatchTouchEvent("touchend", this.target, e, this.touchPointDelta) : dispatchTouchEvent("touchend", this.target, e), this.endMultiTouch();
  }
  mouseout(e) {
    if (this.isMouseDown) return;
    const i = e.relatedTarget || e.toElement;
    (!i || i.nodeName === "HTML") && this.endMultiTouch();
  }
  showTouchCursor() {
    this.point || (this.point = { x: 0, y: 0 }), this.touchPointLayer.animateStop(), this.touchPointLayer.midX = this.point.x, this.touchPointLayer.midY = this.point.y, this.touchPointLayer.scale = 1.8, this.touchPointLayer.animate({
      opacity: 1,
      scale: 1,
      options: { time: 0.1, curve: "ease-out" }
    });
  }
  hideTouchCursor() {
    this.touchPointLayer.opacity <= 0 || (this.touchPointLayer.animateStop(), this.touchPointLayer.animate({
      opacity: 0,
      scale: 1.2,
      options: { time: 0.08 }
    }));
  }
  mousemovePosition(e) {
    this.point = { x: e.pageX, y: e.pageY };
  }
  endMultiTouch() {
    this.isMouseDown = !1, this.touchPointLayer.style.backgroundImage = this.touchPointerImage, this.hideTouchCursor();
  }
  pinchPoint(e, i) {
    return Utils$1.pointSubtract(
      i,
      Utils$1.pointSubtract(e, i)
    );
  }
  panPoint(e, i) {
    return Utils$1.pointSubtract(e, i);
  }
}
let touchEmulator = null;
const enable$5 = () => {
  if (!Utils$1.isTouch())
    return touchEmulator || (touchEmulator = new TouchEmulator()), Events$5.enableEmulatedTouchEvents(!0);
}, disable$3 = () => {
  if (touchEmulator)
    return touchEmulator.destroy(), touchEmulator = null, Events$5.enableEmulatedTouchEvents(!1);
}, reset = () => {
  touchEmulator?.endMultiTouch();
}, TouchEmulator$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TouchEmulator,
  disable: disable$3,
  enable: enable$5,
  reset
}, Symbol.toStringTag, { value: "Module" })), handleScrollingLayerTouchMove = (t) => t.stopPropagation(), handleScrollingLayerTouchStart = function() {
  const t = this._element, e = t.scrollTop;
  e <= 0 && (t.scrollTop = 1), e + t.offsetHeight >= t.scrollHeight && (t.scrollTop = t.scrollHeight - t.offsetHeight - 1);
};
class MobileScrollFixLayer extends Layer$1 {
  constructor(e) {
    super(e), this._updateScrollListeners = this._updateScrollListeners.bind(this), this.constructor.name === "Layer" && (this.on("change:scrollVertical", this._updateScrollListeners), this._updateScrollListeners());
  }
  _updateScrollListeners() {
    this.scrollVertical === !0 ? (this.on("touchmove", handleScrollingLayerTouchMove), this.on("touchstart", handleScrollingLayerTouchStart)) : (this.off("touchmove", handleScrollingLayerTouchMove), this.off("touchstart", handleScrollingLayerTouchStart));
  }
  toInspect(...e) {
    return this.constructor.name === "MobileScrollFixLayer" ? super.toInspect("Layer") : super.toInspect(...e);
  }
}
const enableMobileScrollFix = () => {
  document.ontouchmove = (t) => {
    t.target === document.body && t.preventDefault();
  };
}, enable$4 = enableMobileScrollFix, MobileScrollFix = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MobileScrollFixLayer,
  default: MobileScrollFixLayer,
  enable: enable$4,
  enableMobileScrollFix
}, Symbol.toStringTag, { value: "Module" }));
let Canvas$1 = class extends BaseClass {
  static initClass() {
    this.define("width", { get: () => window.innerWidth }), this.define("height", { get: () => window.innerHeight }), this.define("size", { get: () => Utils$1.size(this) }), this.define("frame", { get: () => Utils$1.frame(this) }), this.define("backgroundColor", {
      importable: !1,
      exportable: !1,
      get: () => Framer.Device.background.backgroundColor,
      set: (e) => Framer.Device.background.backgroundColor = e
    }), this.define("image", {
      importable: !1,
      exportable: !1,
      get: () => Framer.Device.background.image,
      set: (e) => Framer.Device.background.image = e
    });
  }
  constructor(e = {}) {
    super(e), this._handleResize = this._handleResize.bind(this), Events$5.wrap(window).addEventListener("resize", this._handleResize);
  }
  onResize(e) {
    return this.on("resize", e);
  }
  _handleResize(e) {
    Screen.device || Screen.emit("resize"), this.emit("resize"), this.emit("change:width"), this.emit("change:height"), this.emit("change:size"), this.emit("change:frame");
  }
  toInspect() {
    return `<${this.constructor.name} ${this.width}x${this.height}>`;
  }
  // Point Conversion
  convertPointToLayer(e, i) {
    return Utils$1.convertPointFromContext(e, i, !0, !0);
  }
  convertPointToScreen(e) {
    const i = Framer.Device.context;
    return Utils$1.convertPointFromContext(e, i, !0, !0);
  }
};
Canvas$1.initClass();
let errorDisplay = null;
const Config = Utils$1.isMobile() ? { height: 100, textInset: 20, fontSize: 32 } : { height: 40, textInset: 12, fontSize: 14 };
class ErrorDisplay extends BaseClass {
  constructor() {
    super();
    F(this, "_context", null);
    F(this, "_errorLayer", null);
    this.resize = this.resize.bind(this), this._context ?? (this._context = new Context({ name: "ErrorDisplay" })), this._context.index = 1e3, this._context.run(() => {
      Events$5.wrap(window).addEventListener(
        "error",
        (i) => this.showError(i.message)
      ), Events$5.wrap(window).addEventListener("resize", this.resize);
    });
  }
  createLayer() {
    return this._errorLayer ? this._errorLayer : (this._context.run(() => {
      const i = new Layer$1({
        name: "error",
        y: Align$1.bottom,
        width: Canvas$1.width,
        height: Config.height,
        backgroundColor: "rgba(255, 0, 0, 1)"
      });
      i.text = new Layer$1({
        name: "text",
        parent: i,
        size: Utils$1.frameInset(i, Config.textInset),
        point: Align$1.center,
        backgroundColor: null,
        clip: !0
      }), i.text.style = {
        font: `${Config.fontSize}px/1em ${Utils$1.deviceFont()}`,
        lineHeight: `${parseInt(i.text.height - 2)}px`,
        textAlign: "center",
        wordWrap: "break-word",
        textOverflow: "ellipsis"
      }, i.onTap(() => {
        this._errorLayer?.destroy(), this._errorLayer = null;
      }), this._errorLayer = i, this.resize();
    }), this._errorLayer);
  }
  resize() {
    this._errorLayer && (this._errorLayer.width = Canvas$1.width, this._errorLayer.y = Canvas$1.height - this._errorLayer.height, this._errorLayer.text.size = Utils$1.frameInset(
      this._errorLayer,
      Config.textInset
    ), this._errorLayer.text.point = Align$1.center);
  }
  showError(i) {
    const n = this.createLayer();
    return n.scale = 1.1, n.text.html = i, n.animate({
      scale: 1,
      options: {
        curve: "spring(800, 55, 10)"
      }
    });
  }
  destroy() {
    this._context?.destroy();
  }
}
const enable$3 = () => {
  errorDisplay || (errorDisplay = new ErrorDisplay());
}, disable$2 = () => {
  errorDisplay && (errorDisplay.destroy(), errorDisplay = null);
}, ErrorDisplay$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ErrorDisplay,
  disable: disable$2,
  enable: enable$3
}, Symbol.toStringTag, { value: "Module" })), enable$2 = (t = window) => {
  const e = (i) => (...n) => {
    const r = new i(...n);
    return Object.setPrototypeOf(() => {
    }, r);
  };
  return t.Frame = e(Framer.Frame), t.Layer = e(Framer.Layer), t.BackgroundLayer = e(Framer.BackgroundLayer), t.VideoLayer = e(Framer.VideoLayer), t.Animation = e(Framer.Animation), t;
};
let hints = null;
class Hints {
  constructor(e) {
    F(this, "_context", null);
    F(this, "_target", null);
    F(this, "_framerContext", null);
    this._framerContext = e, this._handleDown = this._handleDown.bind(this), this._handleUp = this._handleUp.bind(this), this._context = new Context({ name: "Hints" }), this._context.index = 1e4, this._context.run(() => {
      const i = Events$5.wrap(document);
      i.addEventListener(Events$5.TouchStart, this._handleDown, !0), i.addEventListener(Events$5.TouchEnd, this._handleUp, !0);
    });
  }
  _handleDown(e) {
    this._isPreloading() || (this._target = e.target);
  }
  _handleUp(e) {
    if (this._isPreloading()) return;
    const i = this._framerContext || (typeof Framer < "u" ? Framer.CurrentContext : null);
    if (!i) return;
    const n = i.layerForElement(this._target);
    if (!n)
      for (const r of Context.all()) {
        const s = typeof Framer < "u" ? Framer.DefaultContext : null;
        if (r !== s && r !== i && r.layerForElement(this._target))
          return;
      }
    n?.willSeemToDoSomething() || this.showHints();
  }
  _isPreloading() {
    return typeof Framer > "u" ? !1 : Framer.Preloader?.isLoading === !0;
  }
  showHints() {
    const e = this._framerContext || (typeof Framer < "u" ? Framer.CurrentContext : null);
    e && this._context.run(() => {
      lodash.invokeMap(e.rootLayers, "_showHint");
    });
  }
  destroy() {
    this._context?.destroy();
  }
}
const enable$1 = (t) => hints || (hints = new Hints(t), hints), disable$1 = () => {
  hints && (hints.destroy(), hints = null);
}, showHints = () => {
  hints && Utils$1.delay(0.5, () => hints.showHints());
}, Hints$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Hints,
  disable: disable$1,
  enable: enable$1,
  showHints
}, Symbol.toStringTag, { value: "Module" }));
class Preloader extends BaseClass {
  static initClass() {
    this.define("progress", {
      get() {
        return this._mediaLoaded.length / this._media.length || 0;
      }
    }), this.define("time", {
      get() {
        return (Date.now() - this._startTime) / 1e3;
      }
    }), this.define("isLoading", {
      get() {
        return this._isLoading;
      }
    }), this.define("isReady", {
      get() {
        return this.isLoading ? this._mediaLoaded.length === this._media.length : !1;
      }
    });
  }
  constructor(e) {
    super(), this.setLogo = this.setLogo.bind(this), this.addImage = this.addImage.bind(this), this.addPlayer = this.addPlayer.bind(this), this.start = this.start.bind(this), this._start = this._start.bind(this), this.end = this.end.bind(this), this._end = this._end.bind(this), this._handleProgress = this._handleProgress.bind(this), this._handleTimeout = this._handleTimeout.bind(this), this._setupContext = this._setupContext.bind(this), this._media = [], this._mediaLoaded = [], this._isLoading = !1, this.timeout = 30, this.start();
  }
  setupContext() {
    return this.context = new Context({ name: "Preloader" }), this.context.run(this._setupContext);
  }
  setLogo(e) {
    if (this._logo = e, this.brand)
      return this.brand.style["background-image"] = `url('${e}')`;
  }
  addImagesFromContext(e) {
    return lodash.map(e.layers, "image").map(this.addImage);
  }
  addPlayersFromContext(e) {
    return lodash.map(e.layers, "player").map(this.addPlayer);
  }
  addImage(e) {
    if (!(e instanceof Gradient$1) && e && !Array.from(this._media).includes(e))
      return this._media.push(e), Utils$1.loadImage(e, (i) => (this._mediaLoaded.push(e), this._handleProgress()));
  }
  addPlayer(e) {
    if (!(!e || Array.from(this._media).includes(e)) && !(e.src == null || e.getAttribute("src") === "undefined") && !(e.readyState == null || !(e.readyState < 3)))
      return this._media.push(e), Events$5.wrap(e).addEventListener("canplaythrough", () => (this._mediaLoaded.push(e), this._handleProgress()));
  }
  start() {
    if (!this.isLoading)
      return this._isLoading = !0, this._startTime = Date.now(), this.emit("start"), this.setupContext(), Utils$1.delay(0.2, this._start);
  }
  _start() {
    return Utils$1.delay(0.2, () => (this.progressIndicator.visible = !0, this.brand.visible = !0)), this.addImagesFromContext(Framer.DefaultContext), this.addImagesFromContext(Framer.CurrentContext), this.addPlayersFromContext(Framer.DefaultContext), this.addPlayersFromContext(Framer.CurrentContext), this._media.length ? Utils$1.delay(this.timeout, this._handleTimeout) : this.end();
  }
  end() {
    if (this.isLoading)
      return this._end();
  }
  _end(e) {
    e == null && (e = !0), Framer.DefaultContext.visible = !0;
    const i = () => (this.emit("end"), this._isLoading = !1, this.context != null ? this.context.destroy() : void 0);
    return this.progressIndicator != null && this.progressIndicator.visible && e ? (this.cover != null && this.cover.animate({
      properties: { opacity: 0 },
      time: 0.13
    }), this.cover.onAnimationDidEnd(i)) : i();
  }
  _handleProgress() {
    if (this.emit("progress", this.progress), this.progressIndicator != null && this.progressIndicator.setProgress(this.progress), this.isReady)
      return this._handleLoaded();
  }
  _handleLoaded() {
    return this.time > 0.5 ? Utils$1.delay(0.2, this.end) : this.end();
  }
  _handleTimeout() {
    if (this.isLoading)
      return console.warn("Preloader timeout, ending"), this.end();
  }
  _setupContext() {
    let e;
    if (this.cover = new Layer$1({
      frame: Canvas$1,
      backgroundColor: "white"
    }), this.progressIndicator = new CircularProgressComponent({
      size: 160,
      point: Align$1.center,
      parent: this.cover,
      visible: !1
    }), this.progressIndicator.railsColor = Color$1.grey(0, 0.1), this.progressIndicator.progressColor = "rgb(75, 169, 248)", this.progressIndicator.setProgress(this.progress), this.brand = new Layer$1({
      size: 96,
      parent: this.cover,
      backgroundColor: null,
      visible: !1,
      style: {
        backgroundSize: "50%"
      }
    }), Utils$1.isMobile() && (this.progressIndicator.scale = 1.25, this.brand.scale = 1.25), this._logo)
      this.setLogo(this._logo);
    else {
      let i = "//resources.framerjs.com/static/images/preloader/framer-logo.png";
      lodash.startsWith(window.location.href, "file://") && (i = "http:" + i), this.setLogo(i);
    }
    return (e = () => (this.cover.frame = Canvas$1, this.progressIndicator.point = Align$1.center, this.brand.x = Align$1.center, this.brand.y = Align$1.center(2)))(), Canvas$1.onResize(e);
  }
}
Preloader.initClass();
const enable = () => Framer.Preloader ?? (Framer.Preloader = new Preloader()), disable = () => {
  Framer.Preloader?._end(!1), Framer.Preloader = null;
}, addImage = (t) => Framer.Preloader?.addImage(t), setLogo = (t) => Framer.Preloader?.setLogo(t), Preloader$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addImage,
  default: Preloader,
  disable,
  enable,
  setLogo
}, Symbol.toStringTag, { value: "Module" })), Extras = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorDisplay: ErrorDisplay$1,
  Hints: Hints$1,
  MobileScrollFix,
  OmitNew: enable$2,
  Preloader: Preloader$1,
  TouchEmulator: TouchEmulator$1
}, Symbol.toStringTag, { value: "Module" })), GestureInputLongPressTime = 0.5, GestureInputDoubleTapTime = 0.25, GestureInputSwipeThreshold = 30, GestureInputEdgeSwipeDistance = 30, GestureInputVelocityTime = 0.1, GestureInputForceTapDesktop = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN, GestureInputForceTapMobile = 0.7, GestureInputForceTapMobilePollTime = 1 / 30, GestureInputMinimumFingerDistance = 30;
class GestureInputRecognizer {
  constructor() {
    this.startMouse = this.startMouse.bind(this), this.startTouch = this.startTouch.bind(this), this.touchstart = this.touchstart.bind(this), this.touchmove = this.touchmove.bind(this), this.touchend = this.touchend.bind(this), this.reset = this.reset.bind(this), this.tap = this.tap.bind(this), this.tapstart = this.tapstart.bind(this), this.tapend = this.tapend.bind(this), this.doubletap = this.doubletap.bind(this), this.longpressstart = this.longpressstart.bind(this), this.longpressend = this.longpressend.bind(this), this._updateTouchForce = this._updateTouchForce.bind(this), this._updateMacForce = this._updateMacForce.bind(this), this.forcetapchange = this.forcetapchange.bind(this), this.forcetapstart = this.forcetapstart.bind(this), this.forcetapend = this.forcetapend.bind(this), this.panstart = this.panstart.bind(this), this.pan = this.pan.bind(this), this.panend = this.panend.bind(this), this.panup = this.panup.bind(this), this.pandown = this.pandown.bind(this), this.panleft = this.panleft.bind(this), this.panright = this.panright.bind(this), this.pinchstart = this.pinchstart.bind(this), this.pinch = this.pinch.bind(this), this.pinchend = this.pinchend.bind(this), this.scalestart = this.scalestart.bind(this), this.scale = this.scale.bind(this), this.scaleend = this.scaleend.bind(this), this.rotatestart = this.rotatestart.bind(this), this.rotate = this.rotate.bind(this), this.rotateend = this.rotateend.bind(this), this.swipestart = this.swipestart.bind(this), this.swipe = this.swipe.bind(this), this.swipeend = this.swipeend.bind(this), this.swipedirectionstart = this.swipedirectionstart.bind(this), this.swipedirection = this.swipedirection.bind(this), this.swipedirectionend = this.swipedirectionend.bind(this), this.edgeswipedirection = this.edgeswipedirection.bind(this), this.edgeswipedirectionstart = this.edgeswipedirectionstart.bind(this), this.edgeswipedirectionend = this.edgeswipedirectionend.bind(this), this._process = this._process.bind(this), this.em = new DOMEventManager(), this.em.wrap(window).addEventListener("mousedown", this.startMouse), this.em.wrap(window).addEventListener("touchstart", this.startTouch), this.session = null;
  }
  destroy() {
    return this.em.removeAllListeners();
  }
  cancel() {
    return window.clearTimeout(this.session.pressTimer), this.session = null;
  }
  startMouse(e) {
    if (!this.session)
      return this.em.wrap(window).addEventListener("mousemove", this.touchmove), this.em.wrap(window).addEventListener("mouseup", this.touchend), this.touchstart(e);
  }
  startTouch(e) {
    if (!this.session)
      return this.em.wrap(window).addEventListener("touchmove", this.touchmove), this.em.wrap(window).addEventListener("touchend", this.touchend), this.touchstart(e);
  }
  touchstart(e) {
    if (!this.session && (this.em.wrap(window).addEventListener("webkitmouseforcechanged", this._updateMacForce), this.session = {
      startEvent: this._getGestureEvent(e),
      lastEvent: null,
      startMultiEvent: null,
      startTime: Date.now(),
      pressTimer: window.setTimeout(
        this.longpressstart,
        GestureInputLongPressTime * 1e3
      ),
      started: {},
      events: [],
      eventCount: 0,
      cancelTap: !1
    }, e = this._getGestureEvent(e), this.tapstart(e), Date.now() - this.doubleTapTime < GestureInputDoubleTapTime * 1e3 ? this.doubletap(e) : this.doubleTapTime = Date.now(), this._process(e), Utils$1.isTouch()))
      return this._updateTouchForce();
  }
  touchmove(e) {
    return this._process(this._getGestureEvent(e));
  }
  touchend(e) {
    if (e.touches != null) {
      if (Utils$1.isTouch()) {
        if (e.touches.length !== 0)
          return;
      } else if (e.touches.length !== e.changedTouches.length)
        return;
    }
    this.em.wrap(window).removeEventListener("mousemove", this.touchmove), this.em.wrap(window).removeEventListener("mouseup", this.touchend), this.em.wrap(window).removeEventListener("touchmove", this.touchmove), this.em.wrap(window).removeEventListener("touchend", this.touchend), this.em.wrap(window).removeEventListener("webkitmouseforcechanged", this._updateMacForce), e = this._getGestureEvent(e);
    for (var i in this.session.started) {
      var n = this.session.started[i];
      n && this[`${i}end`](e);
    }
    return this.shouldFireTapEvent(e) && this.tap(e), this.tapend(e), this.cancel();
  }
  reset() {
    if (this.session)
      return this.touchend(this.session.lastEvent);
  }
  // Tap
  shouldFireTapEvent(e) {
    const i = this.session != null ? this.session.startEvent : void 0;
    if (i != null) {
      const n = i.target === e.target, r = e.time - this.session.startTime < 750, s = Utils$1.pointDistance(i.touchCenter, e.touchCenter) < 45;
      return n && r && s && !this.session.cancelTap;
    } else
      return !0;
  }
  tap(e) {
    return this._dispatchEvent("tap", e);
  }
  tapstart(e) {
    return this._dispatchEvent("tapstart", e);
  }
  tapend(e) {
    return this._dispatchEvent("tapend", e);
  }
  doubletap(e) {
    return this._dispatchEvent("doubletap", e);
  }
  // Press
  longpressstart() {
    if (!this.session || this.session.started.longpress)
      return;
    const e = this._getGestureEvent(this.session.startEvent);
    return this.session.started.longpress = e, this._dispatchEvent("longpressstart", e), this._dispatchEvent("longpress", e);
  }
  longpressend(e) {
    return this._dispatchEvent("longpressend", e);
  }
  // ForceTap
  _updateTouchForce() {
    if (!__guard__(
      __guard__(
        this.session != null ? this.session.lastEvent : void 0,
        (i) => i.touches
      ),
      (i) => i.length
    ))
      return;
    this.session.force = this.session.lastEvent.touches[0].force || 0;
    const e = this._getGestureEvent(this.session.lastEvent);
    return this.forcetapchange(e), this.session.force >= GestureInputForceTapMobile ? this.forcetapstart(e) : this.forcetapend(e), setTimeout(
      this._updateTouchForce,
      GestureInputForceTapMobilePollTime
    );
  }
  _updateMacForce(e) {
    if (this.session)
      return this.session.force = Utils$1.modulate(e.webkitForce, [0, 3], [0, 1]), this.forcetapchange(this._getGestureEvent(e)), e.webkitForce >= GestureInputForceTapDesktop ? this.forcetapstart(e) : this.forcetapend(e);
  }
  forcetapchange(e) {
    return this._dispatchEvent("forcetapchange", e);
  }
  forcetapstart(e) {
    if (this.session && !this.session.started.forcetap)
      return this.session.started.forcetap = e, this._dispatchEvent("forcetapstart", e), this._dispatchEvent("forcetap", e);
  }
  forcetapend(e) {
    if (this.session && this.session.started.forcetap)
      return this.session.started.forcetap = null, this._dispatchEvent("forcetapend", e);
  }
  // Pan
  panstart(e) {
    return this.session.started.pan = e, this._dispatchEvent(
      "panstart",
      e,
      this.session.started.pan.target
    );
  }
  pan(e) {
    this._dispatchEvent("pan", e, this.session.started.pan.target);
    const i = this._getDirection(e.delta);
    if (i)
      return this[`pan${i}`](e);
  }
  panend(e) {
    return this._dispatchEvent("panend", e, this.session.started.pan.target), this.session.started.pan = null;
  }
  panup(e) {
    return this._dispatchEvent("panup", e, this.session.started.pan.target);
  }
  pandown(e) {
    return this._dispatchEvent(
      "pandown",
      e,
      this.session.started.pan.target
    );
  }
  panleft(e) {
    return this._dispatchEvent(
      "panleft",
      e,
      this.session.started.pan.target
    );
  }
  panright(e) {
    return this._dispatchEvent(
      "panright",
      e,
      this.session.started.pan.target
    );
  }
  // Pinch
  pinchstart(e) {
    return this.session.started.pinch = e, this.scalestart(e, this.session.started.pinch.target), this.rotatestart(e, this.session.started.pinch.target), this._dispatchEvent("pinchstart", e);
  }
  pinch(e) {
    return this._dispatchEvent("pinch", e), this.scale(e, this.session.started.pinch.target), this.rotate(e, this.session.started.pinch.target);
  }
  pinchend(e) {
    return this._dispatchEvent("pinchend", e), this.scaleend(e, this.session.started.pinch.target), this.rotateend(e, this.session.started.pinch.target), this.session.started.pinch = null;
  }
  scalestart(e) {
    return this._dispatchEvent("scalestart", e);
  }
  scale(e) {
    return this._dispatchEvent("scale", e);
  }
  scaleend(e) {
    return this._dispatchEvent("scaleend", e);
  }
  rotatestart(e) {
    return this._dispatchEvent("rotatestart", e);
  }
  rotate(e) {
    return this._dispatchEvent("rotate", e);
  }
  rotateend(e) {
    return this._dispatchEvent("rotateend", e);
  }
  // Swipe
  swipestart(e) {
    return this._dispatchEvent("swipestart", e), this.session.started.swipe = e, this.swipedirectionstart(e);
  }
  swipe(e) {
    return this._dispatchEvent("swipe", e), this.swipedirection(e);
  }
  swipeend(e) {
    return this._dispatchEvent("swipeend", e);
  }
  // Direction swipe
  swipedirectionstart(e) {
    if (!e.offsetDirection || this.session.started.swipedirection)
      return;
    this.session.started.swipedirection = e;
    const i = this.session.started.swipedirection.offsetDirection;
    this._dispatchEvent(`swipe${i}start`, e);
    const n = this._edgeForSwipeDirection(i);
    if (n === "top" && 0 < e.start.y && e.start.y < GestureInputEdgeSwipeDistance && this.edgeswipedirectionstart(e), n === "right" && Screen.width - GestureInputEdgeSwipeDistance < e.start.x && e.start.x < Screen.width && this.edgeswipedirectionstart(e), n === "bottom" && Screen.height - GestureInputEdgeSwipeDistance < e.start.y && e.start.y < Screen.height && this.edgeswipedirectionstart(e), n === "left" && 0 < e.start.x && e.start.x < GestureInputEdgeSwipeDistance)
      return this.edgeswipedirectionstart(e);
  }
  swipedirection(e) {
    if (!this.session.started.swipedirection)
      return;
    const i = this.session.started.swipedirection.offsetDirection;
    if (this._dispatchEvent(`swipe${i}`, e), this.session.started.edgeswipedirection)
      return this.edgeswipedirection(e);
  }
  swipedirectionend(e) {
    if (!this.session.started.swipedirection)
      return;
    const i = this.session.started.swipedirection.offsetDirection;
    return this._dispatchEvent(`swipe${i}end`, e);
  }
  // Edge swipe
  edgeswipedirection(e) {
    const i = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipe", this._createEvent("edgeswipe", e)), Screen.emit(
      `edgeswipe${i}`,
      this._createEvent(`edgeswipe${i}`, e)
    );
  }
  edgeswipedirectionstart(e) {
    if (this.session.started.edgeswipedirection)
      return;
    this.session.started.edgeswipedirection = e;
    const i = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipestart", this._createEvent("edgeswipestart", e)), Screen.emit(
      `edgeswipe${i}start`,
      this._createEvent(`edgeswipe${i}start`, e)
    );
  }
  edgeswipedirectionend(e) {
    const i = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipeend", this._createEvent("edgeswipeend", e)), Screen.emit(
      `edgeswipe${i}end`,
      this._createEvent(`edgeswipe${i}end`, e)
    );
  }
  // Utilities
  _process(e) {
    if (this.session)
      return this.session.events.push(e), e.eventCount = this.session.eventCount++, (Math.abs(e.delta.x) > 0 || Math.abs(e.delta.y) > 0) && (this.session.started.pan ? this.pan(e) : this.panstart(e)), this.session.started.pinch && e.fingers === 1 ? this.pinchend(e) : !this.session.started.pinch && e.fingers === 2 ? this.pinchstart(e) : this.session.started.pinch && this.pinch(e), !this.session.started.swipe && (Math.abs(e.offset.x) > GestureInputSwipeThreshold || Math.abs(e.offset.y) > GestureInputSwipeThreshold) ? this.swipestart(e) : this.session.started.swipe && this.swipe(e), this.session.lastEvent = e;
  }
  _getEventPoint(e) {
    return e.touches != null && e.touches.length ? this._getTouchPoint(e, 0) : { x: e.pageX, y: e.pageY };
  }
  _getGestureEvent(e) {
    const i = Utils$1.convertPointFromContext(
      this._getEventPoint(e),
      Framer.CurrentContext,
      !0,
      !0
    );
    if (_.extend(e, {
      time: Date.now(),
      // Current time √
      point: i,
      // Current point √
      start: i,
      // Start point √
      previous: i,
      // Previous point √
      offset: { x: 0, y: 0 },
      // Offset since start √
      offsetTime: 0,
      // Time since start √
      offsetAngle: 0,
      // Angle from start √
      offsetDirection: null,
      // Direction from start (up, down, left, right) √
      delta: { x: 0, y: 0 },
      // Offset since last event √
      deltaTime: 0,
      // Time since last event √
      deltaAngle: 0,
      // Angle from last event √
      deltaDirection: null,
      // Direction from last event √
      force: 0,
      // 3d touch or force touch, iOS/Mac only √
      velocity: { x: 0, y: 0 },
      // Velocity average over the last few events √
      fingers: (e.touches != null ? e.touches.length : void 0) || 0,
      // Number of fingers used √
      touchCenter: i,
      // Center between two fingers √
      touchOffset: { x: 0, y: 0 },
      // Offset between two fingers √
      touchDistance: 0,
      // Distance between two fingers √
      scale: 1,
      // Scale value from two fingers √
      scaleDirection: null,
      // Direction for scale: up or down √
      rotation: 0
    }), this.session != null && this.session.startEvent && (e.start = this.session.startEvent.point, e.offset = Utils$1.pointSubtract(e.point, e.start), e.offsetTime = e.time - this.session.startEvent.time, e.offsetAngle = Utils$1.pointAngle(
      this.session.startEvent.point,
      e.point
    ), e.offsetDirection = this._getDirection(e.offset), e.touchCenterStart = this.session.startEvent.touchCenter), this.session != null && this.session.lastEvent && (e.previous = this.session.lastEvent.point, e.deltaTime = e.time - this.session.lastEvent.time, e.delta = Utils$1.pointSubtract(
      e.point,
      this.session.lastEvent.point
    ), e.deltaAngle = Utils$1.pointAngle(
      e.point,
      this.session.lastEvent.point
    ), e.deltaDirection = this._getDirection(e.delta)), e.fingers > 1) {
      const r = this._getTouchPoint(e, 0), s = this._getTouchPoint(e, 1);
      e.touchCenter = Utils$1.pointCenter(s, r), e.touchOffset = Utils$1.pointSubtract(s, r), e.touchDistance = _.max([
        GestureInputMinimumFingerDistance,
        Utils$1.pointDistance(r, s)
      ]), e.rotation = Utils$1.pointAngle(r, s);
    }
    if (this.session != null && this.session.events) {
      const r = _.filter(this.session.events, function(s) {
        return s.eventCount === 0 ? !1 : s.time > e.time - GestureInputVelocityTime * 1e3;
      });
      e.velocity = this._getVelocity(r);
    }
    this.session != null && this.session.started.pinch && (e.scale = e.touchDistance / this.session.started.pinch.touchDistance, e.scaleDirection = this._getScaleDirection(
      e.scale - this.session.lastEvent.scale
    ), !e.scaleDirection && (this.session != null && this.session.lastEvent) && (e.scaleDirection = this.session.lastEvent.scaleDirection)), this.session != null && this.session.lastEvent && (e.fingers !== this.session.lastEvent.fingers && this.session.lastEvent.fingers === 2 && (e.delta = { x: 0, y: 0 }), e.fingers === 2 && this.session.lastEvent.fingers === 2 && (e.delta = Utils$1.pointSubtract(
      e.touchCenter,
      this.session.lastEvent.touchCenter
    ))), this.session != null && this.session.lastEvent && this.session.force && (e.force = this.session.force);
    try {
      for (var n of [
        "point",
        "start",
        "previous",
        "offset",
        "delta",
        "velocity",
        "touchCenter",
        "touchOffset"
      ]) {
        const r = e[n];
        if (r)
          try {
            e[`${n}X`] = r.x, e[`${n}Y`] = r.y;
          } catch {
            Object.defineProperty(e, `${n}X`, { value: r.x, writable: !1, enumerable: !0 }), Object.defineProperty(e, `${n}Y`, { value: r.y, writable: !1, enumerable: !0 });
          }
      }
    } catch (r) {
      console.warn("GestureInputRecognizer: Could not set event properties", r);
    }
    return e;
  }
  _getTouchPoint(e, i) {
    return {
      x: e.touches[i].pageX,
      y: e.touches[i].pageY
    };
  }
  _getDirection(e) {
    if (Math.abs(e.x) > Math.abs(e.y)) {
      if (e.x > 0)
        return "right";
      if (e.x < 0)
        return "left";
    }
    if (Math.abs(e.x) < Math.abs(e.y)) {
      if (e.y < 0)
        return "up";
      if (e.y > 0)
        return "down";
    }
    return null;
  }
  _edgeForSwipeDirection(e) {
    return e === "down" ? "top" : e === "left" ? "right" : e === "up" ? "bottom" : e === "right" ? "left" : null;
  }
  _getScaleDirection(e) {
    return e > 0 ? "up" : e < 0 ? "down" : null;
  }
  _createEvent(e, i) {
    const n = document.createEvent("MouseEvent");
    n.initMouseEvent(
      e,
      !0,
      !0,
      window,
      i.detail,
      i.screenX,
      i.screenY,
      i.clientX,
      i.clientY,
      i.ctrlKey,
      i.shiftKey,
      i.altKey,
      i.metaKey,
      i.button,
      i.relatedTarget
    ), n.touches = i.touches, n.changedTouches = i.touches, n.targetTouches = i.touches;
    const r = [
      "isTrusted",
      "type",
      "target",
      "currentTarget",
      "eventPhase",
      "bubbles",
      "cancelable",
      "defaultPrevented",
      "composed",
      "timeStamp",
      "srcElement",
      "returnValue",
      "cancelBubble"
    ];
    for (var s in i)
      if (!r.includes(s))
        try {
          var a = i[s];
          n[s] = a;
        } catch {
        }
    return n;
  }
  _dispatchEvent(e, i, n) {
    const r = this._createEvent(e, i);
    return n == null && (n = __guard__(
      this.session != null ? this.session.startEvent : void 0,
      (s) => s.target
    )), n == null && ({ target: n } = i), n.dispatchEvent(r);
  }
  _getVelocity(e) {
    if (e.length < 2)
      return { x: 0, y: 0 };
    const i = e[e.length - 1], n = e[0], r = i.time - n.time, s = {
      x: (i.point.x - n.point.x) / r,
      y: (i.point.y - n.point.y) / r
    };
    return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
  }
}
function __guard__(t, e) {
  return typeof t < "u" && t !== null ? e(t) : void 0;
}
const date = 1762882460, branch = "main", hash = "4c17489c-dirty", build = 3300, version = `${branch}/${hash}`, Version = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  branch,
  build,
  date,
  hash,
  version
}, Symbol.toStringTag, { value: "Module" })), Framer$1 = {};
Framer$1._ = lodash;
Framer$1.Utils = Utils$1;
Framer$1.Color = Color$1;
Framer$1.Gradient = Gradient$1;
Framer$1.Layer = Layer$1;
Framer$1._Layer = Layer$1;
Framer$1.BackgroundLayer = BackgroundLayer;
Framer$1.VideoLayer = VideoLayer;
Framer$1.SVGLayer = SVGLayer$1;
Framer$1.SVGPath = SVGPath;
Framer$1.SVGGroup = SVGGroup;
Framer$1.TextLayer = TextLayer;
Framer$1.Events = Events$5;
Framer$1.Gestures = Gestures;
Framer$1.Animation = Animation$1;
Framer$1.AnimationGroup = AnimationGroup;
Framer$1.AnimationStateGroup = AnimationStateGroup;
Framer$1.Screen = Screen$1;
Framer$1.Align = Align$1;
Framer$1.Blending = Blending$1;
Framer$1.print = print$1;
Framer$1.ScrollComponent = ScrollComponent$1;
Framer$1.PageComponent = PageComponent;
Framer$1.SliderComponent = SliderComponent;
Framer$1.RangeSliderComponent = RangeSliderComponent;
Framer$1.DeviceComponent = DeviceComponent;
Framer$1.DeviceView = DeviceComponent;
Framer$1.GridComponent = GridComponent;
Framer$1.FlowComponent = FlowComponent;
Framer$1.CircularProgressComponent = CircularProgressComponent;
Framer$1.MIDIComponent = MIDIComponent;
Framer$1.Context = Context;
Framer$1.Config = Config$1;
Framer$1.EventEmitter = EventEmitter;
Framer$1.BaseClass = BaseClass;
Framer$1.LayerStyle = LayerStyle;
Framer$1.AnimationLoop = AnimationLoop;
Framer$1.LinearAnimator = LinearAnimator;
Framer$1.BezierCurveAnimator = BezierCurveAnimator;
Framer$1.SpringDHOAnimator = SpringDHOAnimator;
Framer$1.SpringRK4Animator = SpringRK4Animator;
Framer$1.LayerDraggable = Layer$1;
Framer$1.Curves = Curves;
typeof window < "u" && (window.Bezier = Bezier, window.Spring = Spring$1);
Framer$1.Importer = Importer;
Framer$1.Extras = Extras;
Framer$1.GestureInputRecognizer = new GestureInputRecognizer();
Framer$1.Version = Version;
Framer$1.Loop = new AnimationLoop();
Framer$1.Info = {};
typeof window < "u" && (lodash.extend(window, Framer$1), window.Framer = Framer$1);
Defaults.setup();
Framer$1.resetDefaults = Defaults.reset;
Framer$1.DefaultContext = new Context({ name: "Default" });
Framer$1.DefaultContext.backgroundColor = "white";
Framer$1.CurrentContext = Framer$1.DefaultContext;
typeof window < "u" && (window.Canvas = new Canvas$1());
Utils$1.domComplete(() => Framer$1.Loop.start());
export {
  Framer$1 as default
};
//# sourceMappingURL=framer.js.map
