var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var lodash$1 = { exports: {} };
var lodash = lodash$1.exports, hasRequiredLodash;
function requireLodash() {
  return hasRequiredLodash || (hasRequiredLodash = 1, (function(r, e) {
    (function() {
      var t, s = "4.17.21", a = 200, h = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", u = "Expected a function", p = "Invalid `variable` option passed into `_.template`", y = "__lodash_hash_undefined__", S = 500, L = "__lodash_placeholder__", M = 1, R = 2, k = 4, q = 1, le = 2, j = 1, it = 2, nt = 4, Ne = 8, xe = 16, rt = 32, Ct = 64, pe = 128, At = 256, bi = 512, Vn = 30, Bn = "...", Vi = 800, Dt = 16, Bi = 1, Hn = 2, ii = 3, Xe = 1 / 0, Oe = 9007199254740991, Hi = 17976931348623157e292, Bt = NaN, Ce = 4294967295, $i = Ce - 1, zi = Ce >>> 1, Gi = [
        ["ary", pe],
        ["bind", j],
        ["bindKey", it],
        ["curry", Ne],
        ["curryRight", xe],
        ["flip", bi],
        ["partial", rt],
        ["partialRight", Ct],
        ["rearg", At]
      ], mt = "[object Arguments]", ni = "[object Array]", Si = "[object AsyncFunction]", gt = "[object Boolean]", ut = "[object Date]", Ni = "[object DOMException]", Ht = "[object Error]", ri = "[object Function]", Xi = "[object GeneratorFunction]", Le = "[object Map]", Tt = "[object Number]", zn = "[object Null]", st = "[object Object]", Yi = "[object Promise]", Gn = "[object Proxy]", zt = "[object RegExp]", Me = "[object Set]", Gt = "[object String]", si = "[object Symbol]", Nn = "[object Undefined]", Nt = "[object WeakMap]", Ki = "[object WeakSet]", Xt = "[object ArrayBuffer]", _t = "[object DataView]", oi = "[object Float32Array]", Ye = "[object Float64Array]", ai = "[object Int8Array]", m = "[object Int16Array]", w = "[object Int32Array]", D = "[object Uint8Array]", P = "[object Uint8ClampedArray]", F = "[object Uint16Array]", O = "[object Uint32Array]", V = /\b__p \+= '';/g, te = /\b(__p \+=) '' \+/g, ie = /(__e\(.*?\)|\b__t\)) \+\n'';/g, he = /&(?:amp|lt|gt|quot|#39);/g, ue = /[&<>"']/g, be = RegExp(he.source), We = RegExp(ue.source), Lt = /<%-([\s\S]+?)%>/g, Xn = /<%([\s\S]+?)%>/g, ss = /<%=([\s\S]+?)%>/g, Ia = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ka = /^\w*$/, Ua = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Yn = /[\\^$.*+?()[\]{}|]/g, Oa = RegExp(Yn.source), Kn = /^\s+/, Wa = /\s/, Ra = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Va = /\{\n\/\* \[wrapped with (.+)\] \*/, Ba = /,? & /, Ha = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, za = /[()=,{}\[\]\/\s]/, Ga = /\\(\\)?/g, Na = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, os = /\w*$/, Xa = /^[-+]0x[0-9a-f]+$/i, Ya = /^0b[01]+$/i, Ka = /^\[object .+?Constructor\]$/, qa = /^0o[0-7]+$/i, Za = /^(?:0|[1-9]\d*)$/, ja = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, qi = /($^)/, Ja = /['\n\r\u2028\u2029\\]/g, Zi = "\\ud800-\\udfff", Qa = "\\u0300-\\u036f", el = "\\ufe20-\\ufe2f", tl = "\\u20d0-\\u20ff", as = Qa + el + tl, ls = "\\u2700-\\u27bf", hs = "a-z\\xdf-\\xf6\\xf8-\\xff", il = "\\xac\\xb1\\xd7\\xf7", nl = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rl = "\\u2000-\\u206f", sl = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", us = "A-Z\\xc0-\\xd6\\xd8-\\xde", cs = "\\ufe0e\\ufe0f", ds = il + nl + rl + sl, qn = "['’]", ol = "[" + Zi + "]", fs = "[" + ds + "]", ji = "[" + as + "]", ps = "\\d+", al = "[" + ls + "]", ms = "[" + hs + "]", gs = "[^" + Zi + ds + ps + ls + hs + us + "]", Zn = "\\ud83c[\\udffb-\\udfff]", ll = "(?:" + ji + "|" + Zn + ")", _s = "[^" + Zi + "]", jn = "(?:\\ud83c[\\udde6-\\uddff]){2}", Jn = "[\\ud800-\\udbff][\\udc00-\\udfff]", li = "[" + us + "]", vs = "\\u200d", ys = "(?:" + ms + "|" + gs + ")", hl = "(?:" + li + "|" + gs + ")", ws = "(?:" + qn + "(?:d|ll|m|re|s|t|ve))?", xs = "(?:" + qn + "(?:D|LL|M|RE|S|T|VE))?", bs = ll + "?", $s = "[" + cs + "]?", ul = "(?:" + vs + "(?:" + [_s, jn, Jn].join("|") + ")" + $s + bs + ")*", cl = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", dl = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Ss = $s + bs + ul, fl = "(?:" + [al, jn, Jn].join("|") + ")" + Ss, pl = "(?:" + [_s + ji + "?", ji, jn, Jn, ol].join("|") + ")", ml = RegExp(qn, "g"), gl = RegExp(ji, "g"), Qn = RegExp(Zn + "(?=" + Zn + ")|" + pl + Ss, "g"), _l = RegExp([
        li + "?" + ms + "+" + ws + "(?=" + [fs, li, "$"].join("|") + ")",
        hl + "+" + xs + "(?=" + [fs, li + ys, "$"].join("|") + ")",
        li + "?" + ys + "+" + ws,
        li + "+" + xs,
        dl,
        cl,
        ps,
        fl
      ].join("|"), "g"), vl = RegExp("[" + vs + Zi + as + cs + "]"), yl = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, wl = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ], xl = -1, ce = {};
      ce[oi] = ce[Ye] = ce[ai] = ce[m] = ce[w] = ce[D] = ce[P] = ce[F] = ce[O] = !0, ce[mt] = ce[ni] = ce[Xt] = ce[gt] = ce[_t] = ce[ut] = ce[Ht] = ce[ri] = ce[Le] = ce[Tt] = ce[st] = ce[zt] = ce[Me] = ce[Gt] = ce[Nt] = !1;
      var ae = {};
      ae[mt] = ae[ni] = ae[Xt] = ae[_t] = ae[gt] = ae[ut] = ae[oi] = ae[Ye] = ae[ai] = ae[m] = ae[w] = ae[Le] = ae[Tt] = ae[st] = ae[zt] = ae[Me] = ae[Gt] = ae[si] = ae[D] = ae[P] = ae[F] = ae[O] = !0, ae[Ht] = ae[ri] = ae[Nt] = !1;
      var bl = {
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
      }, $l = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }, Sl = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      }, El = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      }, Pl = parseFloat, Cl = parseInt, Es = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, Al = typeof self == "object" && self && self.Object === Object && self, $e = Es || Al || Function("return this")(), er = e && !e.nodeType && e, Yt = er && !0 && r && !r.nodeType && r, Ps = Yt && Yt.exports === er, tr = Ps && Es.process, Ke = (function() {
        try {
          var x = Yt && Yt.require && Yt.require("util").types;
          return x || tr && tr.binding && tr.binding("util");
        } catch {
        }
      })(), Cs = Ke && Ke.isArrayBuffer, As = Ke && Ke.isDate, Ds = Ke && Ke.isMap, Ts = Ke && Ke.isRegExp, Ls = Ke && Ke.isSet, Ms = Ke && Ke.isTypedArray;
      function Re(x, E, $) {
        switch ($.length) {
          case 0:
            return x.call(E);
          case 1:
            return x.call(E, $[0]);
          case 2:
            return x.call(E, $[0], $[1]);
          case 3:
            return x.call(E, $[0], $[1], $[2]);
        }
        return x.apply(E, $);
      }
      function Dl(x, E, $, U) {
        for (var G = -1, ne = x == null ? 0 : x.length; ++G < ne; ) {
          var ve = x[G];
          E(U, ve, $(ve), x);
        }
        return U;
      }
      function qe(x, E) {
        for (var $ = -1, U = x == null ? 0 : x.length; ++$ < U && E(x[$], $, x) !== !1; )
          ;
        return x;
      }
      function Tl(x, E) {
        for (var $ = x == null ? 0 : x.length; $-- && E(x[$], $, x) !== !1; )
          ;
        return x;
      }
      function Fs(x, E) {
        for (var $ = -1, U = x == null ? 0 : x.length; ++$ < U; )
          if (!E(x[$], $, x))
            return !1;
        return !0;
      }
      function Mt(x, E) {
        for (var $ = -1, U = x == null ? 0 : x.length, G = 0, ne = []; ++$ < U; ) {
          var ve = x[$];
          E(ve, $, x) && (ne[G++] = ve);
        }
        return ne;
      }
      function Ji(x, E) {
        var $ = x == null ? 0 : x.length;
        return !!$ && hi(x, E, 0) > -1;
      }
      function ir(x, E, $) {
        for (var U = -1, G = x == null ? 0 : x.length; ++U < G; )
          if ($(E, x[U]))
            return !0;
        return !1;
      }
      function de(x, E) {
        for (var $ = -1, U = x == null ? 0 : x.length, G = Array(U); ++$ < U; )
          G[$] = E(x[$], $, x);
        return G;
      }
      function Ft(x, E) {
        for (var $ = -1, U = E.length, G = x.length; ++$ < U; )
          x[G + $] = E[$];
        return x;
      }
      function nr(x, E, $, U) {
        var G = -1, ne = x == null ? 0 : x.length;
        for (U && ne && ($ = x[++G]); ++G < ne; )
          $ = E($, x[G], G, x);
        return $;
      }
      function Ll(x, E, $, U) {
        var G = x == null ? 0 : x.length;
        for (U && G && ($ = x[--G]); G--; )
          $ = E($, x[G], G, x);
        return $;
      }
      function rr(x, E) {
        for (var $ = -1, U = x == null ? 0 : x.length; ++$ < U; )
          if (E(x[$], $, x))
            return !0;
        return !1;
      }
      var Ml = sr("length");
      function Fl(x) {
        return x.split("");
      }
      function Il(x) {
        return x.match(Ha) || [];
      }
      function Is(x, E, $) {
        var U;
        return $(x, function(G, ne, ve) {
          if (E(G, ne, ve))
            return U = ne, !1;
        }), U;
      }
      function Qi(x, E, $, U) {
        for (var G = x.length, ne = $ + (U ? 1 : -1); U ? ne-- : ++ne < G; )
          if (E(x[ne], ne, x))
            return ne;
        return -1;
      }
      function hi(x, E, $) {
        return E === E ? Xl(x, E, $) : Qi(x, ks, $);
      }
      function kl(x, E, $, U) {
        for (var G = $ - 1, ne = x.length; ++G < ne; )
          if (U(x[G], E))
            return G;
        return -1;
      }
      function ks(x) {
        return x !== x;
      }
      function Us(x, E) {
        var $ = x == null ? 0 : x.length;
        return $ ? ar(x, E) / $ : Bt;
      }
      function sr(x) {
        return function(E) {
          return E == null ? t : E[x];
        };
      }
      function or(x) {
        return function(E) {
          return x == null ? t : x[E];
        };
      }
      function Os(x, E, $, U, G) {
        return G(x, function(ne, ve, oe) {
          $ = U ? (U = !1, ne) : E($, ne, ve, oe);
        }), $;
      }
      function Ul(x, E) {
        var $ = x.length;
        for (x.sort(E); $--; )
          x[$] = x[$].value;
        return x;
      }
      function ar(x, E) {
        for (var $, U = -1, G = x.length; ++U < G; ) {
          var ne = E(x[U]);
          ne !== t && ($ = $ === t ? ne : $ + ne);
        }
        return $;
      }
      function lr(x, E) {
        for (var $ = -1, U = Array(x); ++$ < x; )
          U[$] = E($);
        return U;
      }
      function Ol(x, E) {
        return de(E, function($) {
          return [$, x[$]];
        });
      }
      function Ws(x) {
        return x && x.slice(0, Hs(x) + 1).replace(Kn, "");
      }
      function Ve(x) {
        return function(E) {
          return x(E);
        };
      }
      function hr(x, E) {
        return de(E, function($) {
          return x[$];
        });
      }
      function Ei(x, E) {
        return x.has(E);
      }
      function Rs(x, E) {
        for (var $ = -1, U = x.length; ++$ < U && hi(E, x[$], 0) > -1; )
          ;
        return $;
      }
      function Vs(x, E) {
        for (var $ = x.length; $-- && hi(E, x[$], 0) > -1; )
          ;
        return $;
      }
      function Wl(x, E) {
        for (var $ = x.length, U = 0; $--; )
          x[$] === E && ++U;
        return U;
      }
      var Rl = or(bl), Vl = or($l);
      function Bl(x) {
        return "\\" + El[x];
      }
      function Hl(x, E) {
        return x == null ? t : x[E];
      }
      function ui(x) {
        return vl.test(x);
      }
      function zl(x) {
        return yl.test(x);
      }
      function Gl(x) {
        for (var E, $ = []; !(E = x.next()).done; )
          $.push(E.value);
        return $;
      }
      function ur(x) {
        var E = -1, $ = Array(x.size);
        return x.forEach(function(U, G) {
          $[++E] = [G, U];
        }), $;
      }
      function Bs(x, E) {
        return function($) {
          return x(E($));
        };
      }
      function It(x, E) {
        for (var $ = -1, U = x.length, G = 0, ne = []; ++$ < U; ) {
          var ve = x[$];
          (ve === E || ve === L) && (x[$] = L, ne[G++] = $);
        }
        return ne;
      }
      function en(x) {
        var E = -1, $ = Array(x.size);
        return x.forEach(function(U) {
          $[++E] = U;
        }), $;
      }
      function Nl(x) {
        var E = -1, $ = Array(x.size);
        return x.forEach(function(U) {
          $[++E] = [U, U];
        }), $;
      }
      function Xl(x, E, $) {
        for (var U = $ - 1, G = x.length; ++U < G; )
          if (x[U] === E)
            return U;
        return -1;
      }
      function Yl(x, E, $) {
        for (var U = $ + 1; U--; )
          if (x[U] === E)
            return U;
        return U;
      }
      function ci(x) {
        return ui(x) ? ql(x) : Ml(x);
      }
      function ot(x) {
        return ui(x) ? Zl(x) : Fl(x);
      }
      function Hs(x) {
        for (var E = x.length; E-- && Wa.test(x.charAt(E)); )
          ;
        return E;
      }
      var Kl = or(Sl);
      function ql(x) {
        for (var E = Qn.lastIndex = 0; Qn.test(x); )
          ++E;
        return E;
      }
      function Zl(x) {
        return x.match(Qn) || [];
      }
      function jl(x) {
        return x.match(_l) || [];
      }
      var Jl = (function x(E) {
        E = E == null ? $e : di.defaults($e.Object(), E, di.pick($e, wl));
        var $ = E.Array, U = E.Date, G = E.Error, ne = E.Function, ve = E.Math, oe = E.Object, cr = E.RegExp, Ql = E.String, Ze = E.TypeError, tn = $.prototype, eh = ne.prototype, fi = oe.prototype, nn = E["__core-js_shared__"], rn = eh.toString, se = fi.hasOwnProperty, th = 0, zs = (function() {
          var i = /[^.]+$/.exec(nn && nn.keys && nn.keys.IE_PROTO || "");
          return i ? "Symbol(src)_1." + i : "";
        })(), sn = fi.toString, ih = rn.call(oe), nh = $e._, rh = cr(
          "^" + rn.call(se).replace(Yn, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        ), on = Ps ? E.Buffer : t, kt = E.Symbol, an = E.Uint8Array, Gs = on ? on.allocUnsafe : t, ln = Bs(oe.getPrototypeOf, oe), Ns = oe.create, Xs = fi.propertyIsEnumerable, hn = tn.splice, Ys = kt ? kt.isConcatSpreadable : t, Pi = kt ? kt.iterator : t, Kt = kt ? kt.toStringTag : t, un = (function() {
          try {
            var i = Qt(oe, "defineProperty");
            return i({}, "", {}), i;
          } catch {
          }
        })(), sh = E.clearTimeout !== $e.clearTimeout && E.clearTimeout, oh = U && U.now !== $e.Date.now && U.now, ah = E.setTimeout !== $e.setTimeout && E.setTimeout, cn = ve.ceil, dn = ve.floor, dr = oe.getOwnPropertySymbols, lh = on ? on.isBuffer : t, Ks = E.isFinite, hh = tn.join, uh = Bs(oe.keys, oe), ye = ve.max, Ee = ve.min, ch = U.now, dh = E.parseInt, qs = ve.random, fh = tn.reverse, fr = Qt(E, "DataView"), Ci = Qt(E, "Map"), pr = Qt(E, "Promise"), pi = Qt(E, "Set"), Ai = Qt(E, "WeakMap"), Di = Qt(oe, "create"), fn = Ai && new Ai(), mi = {}, ph = ei(fr), mh = ei(Ci), gh = ei(pr), _h = ei(pi), vh = ei(Ai), pn = kt ? kt.prototype : t, Ti = pn ? pn.valueOf : t, Zs = pn ? pn.toString : t;
        function d(i) {
          if (me(i) && !N(i) && !(i instanceof J)) {
            if (i instanceof je)
              return i;
            if (se.call(i, "__wrapped__"))
              return Jo(i);
          }
          return new je(i);
        }
        var gi = /* @__PURE__ */ (function() {
          function i() {
          }
          return function(n) {
            if (!fe(n))
              return {};
            if (Ns)
              return Ns(n);
            i.prototype = n;
            var o = new i();
            return i.prototype = t, o;
          };
        })();
        function mn() {
        }
        function je(i, n) {
          this.__wrapped__ = i, this.__actions__ = [], this.__chain__ = !!n, this.__index__ = 0, this.__values__ = t;
        }
        d.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          escape: Lt,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          evaluate: Xn,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          interpolate: ss,
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
            _: d
          }
        }, d.prototype = mn.prototype, d.prototype.constructor = d, je.prototype = gi(mn.prototype), je.prototype.constructor = je;
        function J(i) {
          this.__wrapped__ = i, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Ce, this.__views__ = [];
        }
        function yh() {
          var i = new J(this.__wrapped__);
          return i.__actions__ = Fe(this.__actions__), i.__dir__ = this.__dir__, i.__filtered__ = this.__filtered__, i.__iteratees__ = Fe(this.__iteratees__), i.__takeCount__ = this.__takeCount__, i.__views__ = Fe(this.__views__), i;
        }
        function wh() {
          if (this.__filtered__) {
            var i = new J(this);
            i.__dir__ = -1, i.__filtered__ = !0;
          } else
            i = this.clone(), i.__dir__ *= -1;
          return i;
        }
        function xh() {
          var i = this.__wrapped__.value(), n = this.__dir__, o = N(i), l = n < 0, c = o ? i.length : 0, f = Fu(0, c, this.__views__), g = f.start, v = f.end, b = v - g, C = l ? v : g - 1, A = this.__iteratees__, T = A.length, I = 0, W = Ee(b, this.__takeCount__);
          if (!o || !l && c == b && W == b)
            return xo(i, this.__actions__);
          var H = [];
          e:
            for (; b-- && I < W; ) {
              C += n;
              for (var Y = -1, z = i[C]; ++Y < T; ) {
                var Z = A[Y], ee = Z.iteratee, ze = Z.type, Te = ee(z);
                if (ze == Hn)
                  z = Te;
                else if (!Te) {
                  if (ze == Bi)
                    continue e;
                  break e;
                }
              }
              H[I++] = z;
            }
          return H;
        }
        J.prototype = gi(mn.prototype), J.prototype.constructor = J;
        function qt(i) {
          var n = -1, o = i == null ? 0 : i.length;
          for (this.clear(); ++n < o; ) {
            var l = i[n];
            this.set(l[0], l[1]);
          }
        }
        function bh() {
          this.__data__ = Di ? Di(null) : {}, this.size = 0;
        }
        function $h(i) {
          var n = this.has(i) && delete this.__data__[i];
          return this.size -= n ? 1 : 0, n;
        }
        function Sh(i) {
          var n = this.__data__;
          if (Di) {
            var o = n[i];
            return o === y ? t : o;
          }
          return se.call(n, i) ? n[i] : t;
        }
        function Eh(i) {
          var n = this.__data__;
          return Di ? n[i] !== t : se.call(n, i);
        }
        function Ph(i, n) {
          var o = this.__data__;
          return this.size += this.has(i) ? 0 : 1, o[i] = Di && n === t ? y : n, this;
        }
        qt.prototype.clear = bh, qt.prototype.delete = $h, qt.prototype.get = Sh, qt.prototype.has = Eh, qt.prototype.set = Ph;
        function vt(i) {
          var n = -1, o = i == null ? 0 : i.length;
          for (this.clear(); ++n < o; ) {
            var l = i[n];
            this.set(l[0], l[1]);
          }
        }
        function Ch() {
          this.__data__ = [], this.size = 0;
        }
        function Ah(i) {
          var n = this.__data__, o = gn(n, i);
          if (o < 0)
            return !1;
          var l = n.length - 1;
          return o == l ? n.pop() : hn.call(n, o, 1), --this.size, !0;
        }
        function Dh(i) {
          var n = this.__data__, o = gn(n, i);
          return o < 0 ? t : n[o][1];
        }
        function Th(i) {
          return gn(this.__data__, i) > -1;
        }
        function Lh(i, n) {
          var o = this.__data__, l = gn(o, i);
          return l < 0 ? (++this.size, o.push([i, n])) : o[l][1] = n, this;
        }
        vt.prototype.clear = Ch, vt.prototype.delete = Ah, vt.prototype.get = Dh, vt.prototype.has = Th, vt.prototype.set = Lh;
        function yt(i) {
          var n = -1, o = i == null ? 0 : i.length;
          for (this.clear(); ++n < o; ) {
            var l = i[n];
            this.set(l[0], l[1]);
          }
        }
        function Mh() {
          this.size = 0, this.__data__ = {
            hash: new qt(),
            map: new (Ci || vt)(),
            string: new qt()
          };
        }
        function Fh(i) {
          var n = An(this, i).delete(i);
          return this.size -= n ? 1 : 0, n;
        }
        function Ih(i) {
          return An(this, i).get(i);
        }
        function kh(i) {
          return An(this, i).has(i);
        }
        function Uh(i, n) {
          var o = An(this, i), l = o.size;
          return o.set(i, n), this.size += o.size == l ? 0 : 1, this;
        }
        yt.prototype.clear = Mh, yt.prototype.delete = Fh, yt.prototype.get = Ih, yt.prototype.has = kh, yt.prototype.set = Uh;
        function Zt(i) {
          var n = -1, o = i == null ? 0 : i.length;
          for (this.__data__ = new yt(); ++n < o; )
            this.add(i[n]);
        }
        function Oh(i) {
          return this.__data__.set(i, y), this;
        }
        function Wh(i) {
          return this.__data__.has(i);
        }
        Zt.prototype.add = Zt.prototype.push = Oh, Zt.prototype.has = Wh;
        function at(i) {
          var n = this.__data__ = new vt(i);
          this.size = n.size;
        }
        function Rh() {
          this.__data__ = new vt(), this.size = 0;
        }
        function Vh(i) {
          var n = this.__data__, o = n.delete(i);
          return this.size = n.size, o;
        }
        function Bh(i) {
          return this.__data__.get(i);
        }
        function Hh(i) {
          return this.__data__.has(i);
        }
        function zh(i, n) {
          var o = this.__data__;
          if (o instanceof vt) {
            var l = o.__data__;
            if (!Ci || l.length < a - 1)
              return l.push([i, n]), this.size = ++o.size, this;
            o = this.__data__ = new yt(l);
          }
          return o.set(i, n), this.size = o.size, this;
        }
        at.prototype.clear = Rh, at.prototype.delete = Vh, at.prototype.get = Bh, at.prototype.has = Hh, at.prototype.set = zh;
        function js(i, n) {
          var o = N(i), l = !o && ti(i), c = !o && !l && Vt(i), f = !o && !l && !c && wi(i), g = o || l || c || f, v = g ? lr(i.length, Ql) : [], b = v.length;
          for (var C in i)
            (n || se.call(i, C)) && !(g && // Safari 9 has enumerable `arguments.length` in strict mode.
            (C == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            c && (C == "offset" || C == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            f && (C == "buffer" || C == "byteLength" || C == "byteOffset") || // Skip index properties.
            $t(C, b))) && v.push(C);
          return v;
        }
        function Js(i) {
          var n = i.length;
          return n ? i[Er(0, n - 1)] : t;
        }
        function Gh(i, n) {
          return Dn(Fe(i), jt(n, 0, i.length));
        }
        function Nh(i) {
          return Dn(Fe(i));
        }
        function mr(i, n, o) {
          (o !== t && !lt(i[n], o) || o === t && !(n in i)) && wt(i, n, o);
        }
        function Li(i, n, o) {
          var l = i[n];
          (!(se.call(i, n) && lt(l, o)) || o === t && !(n in i)) && wt(i, n, o);
        }
        function gn(i, n) {
          for (var o = i.length; o--; )
            if (lt(i[o][0], n))
              return o;
          return -1;
        }
        function Xh(i, n, o, l) {
          return Ut(i, function(c, f, g) {
            n(l, c, o(c), g);
          }), l;
        }
        function Qs(i, n) {
          return i && dt(n, we(n), i);
        }
        function Yh(i, n) {
          return i && dt(n, ke(n), i);
        }
        function wt(i, n, o) {
          n == "__proto__" && un ? un(i, n, {
            configurable: !0,
            enumerable: !0,
            value: o,
            writable: !0
          }) : i[n] = o;
        }
        function gr(i, n) {
          for (var o = -1, l = n.length, c = $(l), f = i == null; ++o < l; )
            c[o] = f ? t : Zr(i, n[o]);
          return c;
        }
        function jt(i, n, o) {
          return i === i && (o !== t && (i = i <= o ? i : o), n !== t && (i = i >= n ? i : n)), i;
        }
        function Je(i, n, o, l, c, f) {
          var g, v = n & M, b = n & R, C = n & k;
          if (o && (g = c ? o(i, l, c, f) : o(i)), g !== t)
            return g;
          if (!fe(i))
            return i;
          var A = N(i);
          if (A) {
            if (g = ku(i), !v)
              return Fe(i, g);
          } else {
            var T = Pe(i), I = T == ri || T == Xi;
            if (Vt(i))
              return So(i, v);
            if (T == st || T == mt || I && !c) {
              if (g = b || I ? {} : zo(i), !v)
                return b ? Su(i, Yh(g, i)) : $u(i, Qs(g, i));
            } else {
              if (!ae[T])
                return c ? i : {};
              g = Uu(i, T, v);
            }
          }
          f || (f = new at());
          var W = f.get(i);
          if (W)
            return W;
          f.set(i, g), va(i) ? i.forEach(function(z) {
            g.add(Je(z, n, o, z, i, f));
          }) : ga(i) && i.forEach(function(z, Z) {
            g.set(Z, Je(z, n, o, Z, i, f));
          });
          var H = C ? b ? Ur : kr : b ? ke : we, Y = A ? t : H(i);
          return qe(Y || i, function(z, Z) {
            Y && (Z = z, z = i[Z]), Li(g, Z, Je(z, n, o, Z, i, f));
          }), g;
        }
        function Kh(i) {
          var n = we(i);
          return function(o) {
            return eo(o, i, n);
          };
        }
        function eo(i, n, o) {
          var l = o.length;
          if (i == null)
            return !l;
          for (i = oe(i); l--; ) {
            var c = o[l], f = n[c], g = i[c];
            if (g === t && !(c in i) || !f(g))
              return !1;
          }
          return !0;
        }
        function to(i, n, o) {
          if (typeof i != "function")
            throw new Ze(u);
          return Wi(function() {
            i.apply(t, o);
          }, n);
        }
        function Mi(i, n, o, l) {
          var c = -1, f = Ji, g = !0, v = i.length, b = [], C = n.length;
          if (!v)
            return b;
          o && (n = de(n, Ve(o))), l ? (f = ir, g = !1) : n.length >= a && (f = Ei, g = !1, n = new Zt(n));
          e:
            for (; ++c < v; ) {
              var A = i[c], T = o == null ? A : o(A);
              if (A = l || A !== 0 ? A : 0, g && T === T) {
                for (var I = C; I--; )
                  if (n[I] === T)
                    continue e;
                b.push(A);
              } else f(n, T, l) || b.push(A);
            }
          return b;
        }
        var Ut = Do(ct), io = Do(vr, !0);
        function qh(i, n) {
          var o = !0;
          return Ut(i, function(l, c, f) {
            return o = !!n(l, c, f), o;
          }), o;
        }
        function _n(i, n, o) {
          for (var l = -1, c = i.length; ++l < c; ) {
            var f = i[l], g = n(f);
            if (g != null && (v === t ? g === g && !He(g) : o(g, v)))
              var v = g, b = f;
          }
          return b;
        }
        function Zh(i, n, o, l) {
          var c = i.length;
          for (o = X(o), o < 0 && (o = -o > c ? 0 : c + o), l = l === t || l > c ? c : X(l), l < 0 && (l += c), l = o > l ? 0 : wa(l); o < l; )
            i[o++] = n;
          return i;
        }
        function no(i, n) {
          var o = [];
          return Ut(i, function(l, c, f) {
            n(l, c, f) && o.push(l);
          }), o;
        }
        function Se(i, n, o, l, c) {
          var f = -1, g = i.length;
          for (o || (o = Wu), c || (c = []); ++f < g; ) {
            var v = i[f];
            n > 0 && o(v) ? n > 1 ? Se(v, n - 1, o, l, c) : Ft(c, v) : l || (c[c.length] = v);
          }
          return c;
        }
        var _r = To(), ro = To(!0);
        function ct(i, n) {
          return i && _r(i, n, we);
        }
        function vr(i, n) {
          return i && ro(i, n, we);
        }
        function vn(i, n) {
          return Mt(n, function(o) {
            return St(i[o]);
          });
        }
        function Jt(i, n) {
          n = Wt(n, i);
          for (var o = 0, l = n.length; i != null && o < l; )
            i = i[ft(n[o++])];
          return o && o == l ? i : t;
        }
        function so(i, n, o) {
          var l = n(i);
          return N(i) ? l : Ft(l, o(i));
        }
        function Ae(i) {
          return i == null ? i === t ? Nn : zn : Kt && Kt in oe(i) ? Mu(i) : Nu(i);
        }
        function yr(i, n) {
          return i > n;
        }
        function jh(i, n) {
          return i != null && se.call(i, n);
        }
        function Jh(i, n) {
          return i != null && n in oe(i);
        }
        function Qh(i, n, o) {
          return i >= Ee(n, o) && i < ye(n, o);
        }
        function wr(i, n, o) {
          for (var l = o ? ir : Ji, c = i[0].length, f = i.length, g = f, v = $(f), b = 1 / 0, C = []; g--; ) {
            var A = i[g];
            g && n && (A = de(A, Ve(n))), b = Ee(A.length, b), v[g] = !o && (n || c >= 120 && A.length >= 120) ? new Zt(g && A) : t;
          }
          A = i[0];
          var T = -1, I = v[0];
          e:
            for (; ++T < c && C.length < b; ) {
              var W = A[T], H = n ? n(W) : W;
              if (W = o || W !== 0 ? W : 0, !(I ? Ei(I, H) : l(C, H, o))) {
                for (g = f; --g; ) {
                  var Y = v[g];
                  if (!(Y ? Ei(Y, H) : l(i[g], H, o)))
                    continue e;
                }
                I && I.push(H), C.push(W);
              }
            }
          return C;
        }
        function eu(i, n, o, l) {
          return ct(i, function(c, f, g) {
            n(l, o(c), f, g);
          }), l;
        }
        function Fi(i, n, o) {
          n = Wt(n, i), i = Yo(i, n);
          var l = i == null ? i : i[ft(et(n))];
          return l == null ? t : Re(l, i, o);
        }
        function oo(i) {
          return me(i) && Ae(i) == mt;
        }
        function tu(i) {
          return me(i) && Ae(i) == Xt;
        }
        function iu(i) {
          return me(i) && Ae(i) == ut;
        }
        function Ii(i, n, o, l, c) {
          return i === n ? !0 : i == null || n == null || !me(i) && !me(n) ? i !== i && n !== n : nu(i, n, o, l, Ii, c);
        }
        function nu(i, n, o, l, c, f) {
          var g = N(i), v = N(n), b = g ? ni : Pe(i), C = v ? ni : Pe(n);
          b = b == mt ? st : b, C = C == mt ? st : C;
          var A = b == st, T = C == st, I = b == C;
          if (I && Vt(i)) {
            if (!Vt(n))
              return !1;
            g = !0, A = !1;
          }
          if (I && !A)
            return f || (f = new at()), g || wi(i) ? Vo(i, n, o, l, c, f) : Tu(i, n, b, o, l, c, f);
          if (!(o & q)) {
            var W = A && se.call(i, "__wrapped__"), H = T && se.call(n, "__wrapped__");
            if (W || H) {
              var Y = W ? i.value() : i, z = H ? n.value() : n;
              return f || (f = new at()), c(Y, z, o, l, f);
            }
          }
          return I ? (f || (f = new at()), Lu(i, n, o, l, c, f)) : !1;
        }
        function ru(i) {
          return me(i) && Pe(i) == Le;
        }
        function xr(i, n, o, l) {
          var c = o.length, f = c, g = !l;
          if (i == null)
            return !f;
          for (i = oe(i); c--; ) {
            var v = o[c];
            if (g && v[2] ? v[1] !== i[v[0]] : !(v[0] in i))
              return !1;
          }
          for (; ++c < f; ) {
            v = o[c];
            var b = v[0], C = i[b], A = v[1];
            if (g && v[2]) {
              if (C === t && !(b in i))
                return !1;
            } else {
              var T = new at();
              if (l)
                var I = l(C, A, b, i, n, T);
              if (!(I === t ? Ii(A, C, q | le, l, T) : I))
                return !1;
            }
          }
          return !0;
        }
        function ao(i) {
          if (!fe(i) || Vu(i))
            return !1;
          var n = St(i) ? rh : Ka;
          return n.test(ei(i));
        }
        function su(i) {
          return me(i) && Ae(i) == zt;
        }
        function ou(i) {
          return me(i) && Pe(i) == Me;
        }
        function au(i) {
          return me(i) && kn(i.length) && !!ce[Ae(i)];
        }
        function lo(i) {
          return typeof i == "function" ? i : i == null ? Ue : typeof i == "object" ? N(i) ? co(i[0], i[1]) : uo(i) : La(i);
        }
        function br(i) {
          if (!Oi(i))
            return uh(i);
          var n = [];
          for (var o in oe(i))
            se.call(i, o) && o != "constructor" && n.push(o);
          return n;
        }
        function lu(i) {
          if (!fe(i))
            return Gu(i);
          var n = Oi(i), o = [];
          for (var l in i)
            l == "constructor" && (n || !se.call(i, l)) || o.push(l);
          return o;
        }
        function $r(i, n) {
          return i < n;
        }
        function ho(i, n) {
          var o = -1, l = Ie(i) ? $(i.length) : [];
          return Ut(i, function(c, f, g) {
            l[++o] = n(c, f, g);
          }), l;
        }
        function uo(i) {
          var n = Wr(i);
          return n.length == 1 && n[0][2] ? No(n[0][0], n[0][1]) : function(o) {
            return o === i || xr(o, i, n);
          };
        }
        function co(i, n) {
          return Vr(i) && Go(n) ? No(ft(i), n) : function(o) {
            var l = Zr(o, i);
            return l === t && l === n ? jr(o, i) : Ii(n, l, q | le);
          };
        }
        function yn(i, n, o, l, c) {
          i !== n && _r(n, function(f, g) {
            if (c || (c = new at()), fe(f))
              hu(i, n, g, o, yn, l, c);
            else {
              var v = l ? l(Hr(i, g), f, g + "", i, n, c) : t;
              v === t && (v = f), mr(i, g, v);
            }
          }, ke);
        }
        function hu(i, n, o, l, c, f, g) {
          var v = Hr(i, o), b = Hr(n, o), C = g.get(b);
          if (C) {
            mr(i, o, C);
            return;
          }
          var A = f ? f(v, b, o + "", i, n, g) : t, T = A === t;
          if (T) {
            var I = N(b), W = !I && Vt(b), H = !I && !W && wi(b);
            A = b, I || W || H ? N(v) ? A = v : ge(v) ? A = Fe(v) : W ? (T = !1, A = So(b, !0)) : H ? (T = !1, A = Eo(b, !0)) : A = [] : Ri(b) || ti(b) ? (A = v, ti(v) ? A = xa(v) : (!fe(v) || St(v)) && (A = zo(b))) : T = !1;
          }
          T && (g.set(b, A), c(A, b, l, f, g), g.delete(b)), mr(i, o, A);
        }
        function fo(i, n) {
          var o = i.length;
          if (o)
            return n += n < 0 ? o : 0, $t(n, o) ? i[n] : t;
        }
        function po(i, n, o) {
          n.length ? n = de(n, function(f) {
            return N(f) ? function(g) {
              return Jt(g, f.length === 1 ? f[0] : f);
            } : f;
          }) : n = [Ue];
          var l = -1;
          n = de(n, Ve(B()));
          var c = ho(i, function(f, g, v) {
            var b = de(n, function(C) {
              return C(f);
            });
            return { criteria: b, index: ++l, value: f };
          });
          return Ul(c, function(f, g) {
            return bu(f, g, o);
          });
        }
        function uu(i, n) {
          return mo(i, n, function(o, l) {
            return jr(i, l);
          });
        }
        function mo(i, n, o) {
          for (var l = -1, c = n.length, f = {}; ++l < c; ) {
            var g = n[l], v = Jt(i, g);
            o(v, g) && ki(f, Wt(g, i), v);
          }
          return f;
        }
        function cu(i) {
          return function(n) {
            return Jt(n, i);
          };
        }
        function Sr(i, n, o, l) {
          var c = l ? kl : hi, f = -1, g = n.length, v = i;
          for (i === n && (n = Fe(n)), o && (v = de(i, Ve(o))); ++f < g; )
            for (var b = 0, C = n[f], A = o ? o(C) : C; (b = c(v, A, b, l)) > -1; )
              v !== i && hn.call(v, b, 1), hn.call(i, b, 1);
          return i;
        }
        function go(i, n) {
          for (var o = i ? n.length : 0, l = o - 1; o--; ) {
            var c = n[o];
            if (o == l || c !== f) {
              var f = c;
              $t(c) ? hn.call(i, c, 1) : Ar(i, c);
            }
          }
          return i;
        }
        function Er(i, n) {
          return i + dn(qs() * (n - i + 1));
        }
        function du(i, n, o, l) {
          for (var c = -1, f = ye(cn((n - i) / (o || 1)), 0), g = $(f); f--; )
            g[l ? f : ++c] = i, i += o;
          return g;
        }
        function Pr(i, n) {
          var o = "";
          if (!i || n < 1 || n > Oe)
            return o;
          do
            n % 2 && (o += i), n = dn(n / 2), n && (i += i);
          while (n);
          return o;
        }
        function K(i, n) {
          return zr(Xo(i, n, Ue), i + "");
        }
        function fu(i) {
          return Js(xi(i));
        }
        function pu(i, n) {
          var o = xi(i);
          return Dn(o, jt(n, 0, o.length));
        }
        function ki(i, n, o, l) {
          if (!fe(i))
            return i;
          n = Wt(n, i);
          for (var c = -1, f = n.length, g = f - 1, v = i; v != null && ++c < f; ) {
            var b = ft(n[c]), C = o;
            if (b === "__proto__" || b === "constructor" || b === "prototype")
              return i;
            if (c != g) {
              var A = v[b];
              C = l ? l(A, b, v) : t, C === t && (C = fe(A) ? A : $t(n[c + 1]) ? [] : {});
            }
            Li(v, b, C), v = v[b];
          }
          return i;
        }
        var _o = fn ? function(i, n) {
          return fn.set(i, n), i;
        } : Ue, mu = un ? function(i, n) {
          return un(i, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Qr(n),
            writable: !0
          });
        } : Ue;
        function gu(i) {
          return Dn(xi(i));
        }
        function Qe(i, n, o) {
          var l = -1, c = i.length;
          n < 0 && (n = -n > c ? 0 : c + n), o = o > c ? c : o, o < 0 && (o += c), c = n > o ? 0 : o - n >>> 0, n >>>= 0;
          for (var f = $(c); ++l < c; )
            f[l] = i[l + n];
          return f;
        }
        function _u(i, n) {
          var o;
          return Ut(i, function(l, c, f) {
            return o = n(l, c, f), !o;
          }), !!o;
        }
        function wn(i, n, o) {
          var l = 0, c = i == null ? l : i.length;
          if (typeof n == "number" && n === n && c <= zi) {
            for (; l < c; ) {
              var f = l + c >>> 1, g = i[f];
              g !== null && !He(g) && (o ? g <= n : g < n) ? l = f + 1 : c = f;
            }
            return c;
          }
          return Cr(i, n, Ue, o);
        }
        function Cr(i, n, o, l) {
          var c = 0, f = i == null ? 0 : i.length;
          if (f === 0)
            return 0;
          n = o(n);
          for (var g = n !== n, v = n === null, b = He(n), C = n === t; c < f; ) {
            var A = dn((c + f) / 2), T = o(i[A]), I = T !== t, W = T === null, H = T === T, Y = He(T);
            if (g)
              var z = l || H;
            else C ? z = H && (l || I) : v ? z = H && I && (l || !W) : b ? z = H && I && !W && (l || !Y) : W || Y ? z = !1 : z = l ? T <= n : T < n;
            z ? c = A + 1 : f = A;
          }
          return Ee(f, $i);
        }
        function vo(i, n) {
          for (var o = -1, l = i.length, c = 0, f = []; ++o < l; ) {
            var g = i[o], v = n ? n(g) : g;
            if (!o || !lt(v, b)) {
              var b = v;
              f[c++] = g === 0 ? 0 : g;
            }
          }
          return f;
        }
        function yo(i) {
          return typeof i == "number" ? i : He(i) ? Bt : +i;
        }
        function Be(i) {
          if (typeof i == "string")
            return i;
          if (N(i))
            return de(i, Be) + "";
          if (He(i))
            return Zs ? Zs.call(i) : "";
          var n = i + "";
          return n == "0" && 1 / i == -Xe ? "-0" : n;
        }
        function Ot(i, n, o) {
          var l = -1, c = Ji, f = i.length, g = !0, v = [], b = v;
          if (o)
            g = !1, c = ir;
          else if (f >= a) {
            var C = n ? null : Au(i);
            if (C)
              return en(C);
            g = !1, c = Ei, b = new Zt();
          } else
            b = n ? [] : v;
          e:
            for (; ++l < f; ) {
              var A = i[l], T = n ? n(A) : A;
              if (A = o || A !== 0 ? A : 0, g && T === T) {
                for (var I = b.length; I--; )
                  if (b[I] === T)
                    continue e;
                n && b.push(T), v.push(A);
              } else c(b, T, o) || (b !== v && b.push(T), v.push(A));
            }
          return v;
        }
        function Ar(i, n) {
          return n = Wt(n, i), i = Yo(i, n), i == null || delete i[ft(et(n))];
        }
        function wo(i, n, o, l) {
          return ki(i, n, o(Jt(i, n)), l);
        }
        function xn(i, n, o, l) {
          for (var c = i.length, f = l ? c : -1; (l ? f-- : ++f < c) && n(i[f], f, i); )
            ;
          return o ? Qe(i, l ? 0 : f, l ? f + 1 : c) : Qe(i, l ? f + 1 : 0, l ? c : f);
        }
        function xo(i, n) {
          var o = i;
          return o instanceof J && (o = o.value()), nr(n, function(l, c) {
            return c.func.apply(c.thisArg, Ft([l], c.args));
          }, o);
        }
        function Dr(i, n, o) {
          var l = i.length;
          if (l < 2)
            return l ? Ot(i[0]) : [];
          for (var c = -1, f = $(l); ++c < l; )
            for (var g = i[c], v = -1; ++v < l; )
              v != c && (f[c] = Mi(f[c] || g, i[v], n, o));
          return Ot(Se(f, 1), n, o);
        }
        function bo(i, n, o) {
          for (var l = -1, c = i.length, f = n.length, g = {}; ++l < c; ) {
            var v = l < f ? n[l] : t;
            o(g, i[l], v);
          }
          return g;
        }
        function Tr(i) {
          return ge(i) ? i : [];
        }
        function Lr(i) {
          return typeof i == "function" ? i : Ue;
        }
        function Wt(i, n) {
          return N(i) ? i : Vr(i, n) ? [i] : jo(re(i));
        }
        var vu = K;
        function Rt(i, n, o) {
          var l = i.length;
          return o = o === t ? l : o, !n && o >= l ? i : Qe(i, n, o);
        }
        var $o = sh || function(i) {
          return $e.clearTimeout(i);
        };
        function So(i, n) {
          if (n)
            return i.slice();
          var o = i.length, l = Gs ? Gs(o) : new i.constructor(o);
          return i.copy(l), l;
        }
        function Mr(i) {
          var n = new i.constructor(i.byteLength);
          return new an(n).set(new an(i)), n;
        }
        function yu(i, n) {
          var o = n ? Mr(i.buffer) : i.buffer;
          return new i.constructor(o, i.byteOffset, i.byteLength);
        }
        function wu(i) {
          var n = new i.constructor(i.source, os.exec(i));
          return n.lastIndex = i.lastIndex, n;
        }
        function xu(i) {
          return Ti ? oe(Ti.call(i)) : {};
        }
        function Eo(i, n) {
          var o = n ? Mr(i.buffer) : i.buffer;
          return new i.constructor(o, i.byteOffset, i.length);
        }
        function Po(i, n) {
          if (i !== n) {
            var o = i !== t, l = i === null, c = i === i, f = He(i), g = n !== t, v = n === null, b = n === n, C = He(n);
            if (!v && !C && !f && i > n || f && g && b && !v && !C || l && g && b || !o && b || !c)
              return 1;
            if (!l && !f && !C && i < n || C && o && c && !l && !f || v && o && c || !g && c || !b)
              return -1;
          }
          return 0;
        }
        function bu(i, n, o) {
          for (var l = -1, c = i.criteria, f = n.criteria, g = c.length, v = o.length; ++l < g; ) {
            var b = Po(c[l], f[l]);
            if (b) {
              if (l >= v)
                return b;
              var C = o[l];
              return b * (C == "desc" ? -1 : 1);
            }
          }
          return i.index - n.index;
        }
        function Co(i, n, o, l) {
          for (var c = -1, f = i.length, g = o.length, v = -1, b = n.length, C = ye(f - g, 0), A = $(b + C), T = !l; ++v < b; )
            A[v] = n[v];
          for (; ++c < g; )
            (T || c < f) && (A[o[c]] = i[c]);
          for (; C--; )
            A[v++] = i[c++];
          return A;
        }
        function Ao(i, n, o, l) {
          for (var c = -1, f = i.length, g = -1, v = o.length, b = -1, C = n.length, A = ye(f - v, 0), T = $(A + C), I = !l; ++c < A; )
            T[c] = i[c];
          for (var W = c; ++b < C; )
            T[W + b] = n[b];
          for (; ++g < v; )
            (I || c < f) && (T[W + o[g]] = i[c++]);
          return T;
        }
        function Fe(i, n) {
          var o = -1, l = i.length;
          for (n || (n = $(l)); ++o < l; )
            n[o] = i[o];
          return n;
        }
        function dt(i, n, o, l) {
          var c = !o;
          o || (o = {});
          for (var f = -1, g = n.length; ++f < g; ) {
            var v = n[f], b = l ? l(o[v], i[v], v, o, i) : t;
            b === t && (b = i[v]), c ? wt(o, v, b) : Li(o, v, b);
          }
          return o;
        }
        function $u(i, n) {
          return dt(i, Rr(i), n);
        }
        function Su(i, n) {
          return dt(i, Bo(i), n);
        }
        function bn(i, n) {
          return function(o, l) {
            var c = N(o) ? Dl : Xh, f = n ? n() : {};
            return c(o, i, B(l, 2), f);
          };
        }
        function _i(i) {
          return K(function(n, o) {
            var l = -1, c = o.length, f = c > 1 ? o[c - 1] : t, g = c > 2 ? o[2] : t;
            for (f = i.length > 3 && typeof f == "function" ? (c--, f) : t, g && De(o[0], o[1], g) && (f = c < 3 ? t : f, c = 1), n = oe(n); ++l < c; ) {
              var v = o[l];
              v && i(n, v, l, f);
            }
            return n;
          });
        }
        function Do(i, n) {
          return function(o, l) {
            if (o == null)
              return o;
            if (!Ie(o))
              return i(o, l);
            for (var c = o.length, f = n ? c : -1, g = oe(o); (n ? f-- : ++f < c) && l(g[f], f, g) !== !1; )
              ;
            return o;
          };
        }
        function To(i) {
          return function(n, o, l) {
            for (var c = -1, f = oe(n), g = l(n), v = g.length; v--; ) {
              var b = g[i ? v : ++c];
              if (o(f[b], b, f) === !1)
                break;
            }
            return n;
          };
        }
        function Eu(i, n, o) {
          var l = n & j, c = Ui(i);
          function f() {
            var g = this && this !== $e && this instanceof f ? c : i;
            return g.apply(l ? o : this, arguments);
          }
          return f;
        }
        function Lo(i) {
          return function(n) {
            n = re(n);
            var o = ui(n) ? ot(n) : t, l = o ? o[0] : n.charAt(0), c = o ? Rt(o, 1).join("") : n.slice(1);
            return l[i]() + c;
          };
        }
        function vi(i) {
          return function(n) {
            return nr(Da(Aa(n).replace(ml, "")), i, "");
          };
        }
        function Ui(i) {
          return function() {
            var n = arguments;
            switch (n.length) {
              case 0:
                return new i();
              case 1:
                return new i(n[0]);
              case 2:
                return new i(n[0], n[1]);
              case 3:
                return new i(n[0], n[1], n[2]);
              case 4:
                return new i(n[0], n[1], n[2], n[3]);
              case 5:
                return new i(n[0], n[1], n[2], n[3], n[4]);
              case 6:
                return new i(n[0], n[1], n[2], n[3], n[4], n[5]);
              case 7:
                return new i(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
            }
            var o = gi(i.prototype), l = i.apply(o, n);
            return fe(l) ? l : o;
          };
        }
        function Pu(i, n, o) {
          var l = Ui(i);
          function c() {
            for (var f = arguments.length, g = $(f), v = f, b = yi(c); v--; )
              g[v] = arguments[v];
            var C = f < 3 && g[0] !== b && g[f - 1] !== b ? [] : It(g, b);
            if (f -= C.length, f < o)
              return Uo(
                i,
                n,
                $n,
                c.placeholder,
                t,
                g,
                C,
                t,
                t,
                o - f
              );
            var A = this && this !== $e && this instanceof c ? l : i;
            return Re(A, this, g);
          }
          return c;
        }
        function Mo(i) {
          return function(n, o, l) {
            var c = oe(n);
            if (!Ie(n)) {
              var f = B(o, 3);
              n = we(n), o = function(v) {
                return f(c[v], v, c);
              };
            }
            var g = i(n, o, l);
            return g > -1 ? c[f ? n[g] : g] : t;
          };
        }
        function Fo(i) {
          return bt(function(n) {
            var o = n.length, l = o, c = je.prototype.thru;
            for (i && n.reverse(); l--; ) {
              var f = n[l];
              if (typeof f != "function")
                throw new Ze(u);
              if (c && !g && Cn(f) == "wrapper")
                var g = new je([], !0);
            }
            for (l = g ? l : o; ++l < o; ) {
              f = n[l];
              var v = Cn(f), b = v == "wrapper" ? Or(f) : t;
              b && Br(b[0]) && b[1] == (pe | Ne | rt | At) && !b[4].length && b[9] == 1 ? g = g[Cn(b[0])].apply(g, b[3]) : g = f.length == 1 && Br(f) ? g[v]() : g.thru(f);
            }
            return function() {
              var C = arguments, A = C[0];
              if (g && C.length == 1 && N(A))
                return g.plant(A).value();
              for (var T = 0, I = o ? n[T].apply(this, C) : A; ++T < o; )
                I = n[T].call(this, I);
              return I;
            };
          });
        }
        function $n(i, n, o, l, c, f, g, v, b, C) {
          var A = n & pe, T = n & j, I = n & it, W = n & (Ne | xe), H = n & bi, Y = I ? t : Ui(i);
          function z() {
            for (var Z = arguments.length, ee = $(Z), ze = Z; ze--; )
              ee[ze] = arguments[ze];
            if (W)
              var Te = yi(z), Ge = Wl(ee, Te);
            if (l && (ee = Co(ee, l, c, W)), f && (ee = Ao(ee, f, g, W)), Z -= Ge, W && Z < C) {
              var _e = It(ee, Te);
              return Uo(
                i,
                n,
                $n,
                z.placeholder,
                o,
                ee,
                _e,
                v,
                b,
                C - Z
              );
            }
            var ht = T ? o : this, Pt = I ? ht[i] : i;
            return Z = ee.length, v ? ee = Xu(ee, v) : H && Z > 1 && ee.reverse(), A && b < Z && (ee.length = b), this && this !== $e && this instanceof z && (Pt = Y || Ui(Pt)), Pt.apply(ht, ee);
          }
          return z;
        }
        function Io(i, n) {
          return function(o, l) {
            return eu(o, i, n(l), {});
          };
        }
        function Sn(i, n) {
          return function(o, l) {
            var c;
            if (o === t && l === t)
              return n;
            if (o !== t && (c = o), l !== t) {
              if (c === t)
                return l;
              typeof o == "string" || typeof l == "string" ? (o = Be(o), l = Be(l)) : (o = yo(o), l = yo(l)), c = i(o, l);
            }
            return c;
          };
        }
        function Fr(i) {
          return bt(function(n) {
            return n = de(n, Ve(B())), K(function(o) {
              var l = this;
              return i(n, function(c) {
                return Re(c, l, o);
              });
            });
          });
        }
        function En(i, n) {
          n = n === t ? " " : Be(n);
          var o = n.length;
          if (o < 2)
            return o ? Pr(n, i) : n;
          var l = Pr(n, cn(i / ci(n)));
          return ui(n) ? Rt(ot(l), 0, i).join("") : l.slice(0, i);
        }
        function Cu(i, n, o, l) {
          var c = n & j, f = Ui(i);
          function g() {
            for (var v = -1, b = arguments.length, C = -1, A = l.length, T = $(A + b), I = this && this !== $e && this instanceof g ? f : i; ++C < A; )
              T[C] = l[C];
            for (; b--; )
              T[C++] = arguments[++v];
            return Re(I, c ? o : this, T);
          }
          return g;
        }
        function ko(i) {
          return function(n, o, l) {
            return l && typeof l != "number" && De(n, o, l) && (o = l = t), n = Et(n), o === t ? (o = n, n = 0) : o = Et(o), l = l === t ? n < o ? 1 : -1 : Et(l), du(n, o, l, i);
          };
        }
        function Pn(i) {
          return function(n, o) {
            return typeof n == "string" && typeof o == "string" || (n = tt(n), o = tt(o)), i(n, o);
          };
        }
        function Uo(i, n, o, l, c, f, g, v, b, C) {
          var A = n & Ne, T = A ? g : t, I = A ? t : g, W = A ? f : t, H = A ? t : f;
          n |= A ? rt : Ct, n &= ~(A ? Ct : rt), n & nt || (n &= -4);
          var Y = [
            i,
            n,
            c,
            W,
            T,
            H,
            I,
            v,
            b,
            C
          ], z = o.apply(t, Y);
          return Br(i) && Ko(z, Y), z.placeholder = l, qo(z, i, n);
        }
        function Ir(i) {
          var n = ve[i];
          return function(o, l) {
            if (o = tt(o), l = l == null ? 0 : Ee(X(l), 292), l && Ks(o)) {
              var c = (re(o) + "e").split("e"), f = n(c[0] + "e" + (+c[1] + l));
              return c = (re(f) + "e").split("e"), +(c[0] + "e" + (+c[1] - l));
            }
            return n(o);
          };
        }
        var Au = pi && 1 / en(new pi([, -0]))[1] == Xe ? function(i) {
          return new pi(i);
        } : is;
        function Oo(i) {
          return function(n) {
            var o = Pe(n);
            return o == Le ? ur(n) : o == Me ? Nl(n) : Ol(n, i(n));
          };
        }
        function xt(i, n, o, l, c, f, g, v) {
          var b = n & it;
          if (!b && typeof i != "function")
            throw new Ze(u);
          var C = l ? l.length : 0;
          if (C || (n &= -97, l = c = t), g = g === t ? g : ye(X(g), 0), v = v === t ? v : X(v), C -= c ? c.length : 0, n & Ct) {
            var A = l, T = c;
            l = c = t;
          }
          var I = b ? t : Or(i), W = [
            i,
            n,
            o,
            l,
            c,
            A,
            T,
            f,
            g,
            v
          ];
          if (I && zu(W, I), i = W[0], n = W[1], o = W[2], l = W[3], c = W[4], v = W[9] = W[9] === t ? b ? 0 : i.length : ye(W[9] - C, 0), !v && n & (Ne | xe) && (n &= -25), !n || n == j)
            var H = Eu(i, n, o);
          else n == Ne || n == xe ? H = Pu(i, n, v) : (n == rt || n == (j | rt)) && !c.length ? H = Cu(i, n, o, l) : H = $n.apply(t, W);
          var Y = I ? _o : Ko;
          return qo(Y(H, W), i, n);
        }
        function Wo(i, n, o, l) {
          return i === t || lt(i, fi[o]) && !se.call(l, o) ? n : i;
        }
        function Ro(i, n, o, l, c, f) {
          return fe(i) && fe(n) && (f.set(n, i), yn(i, n, t, Ro, f), f.delete(n)), i;
        }
        function Du(i) {
          return Ri(i) ? t : i;
        }
        function Vo(i, n, o, l, c, f) {
          var g = o & q, v = i.length, b = n.length;
          if (v != b && !(g && b > v))
            return !1;
          var C = f.get(i), A = f.get(n);
          if (C && A)
            return C == n && A == i;
          var T = -1, I = !0, W = o & le ? new Zt() : t;
          for (f.set(i, n), f.set(n, i); ++T < v; ) {
            var H = i[T], Y = n[T];
            if (l)
              var z = g ? l(Y, H, T, n, i, f) : l(H, Y, T, i, n, f);
            if (z !== t) {
              if (z)
                continue;
              I = !1;
              break;
            }
            if (W) {
              if (!rr(n, function(Z, ee) {
                if (!Ei(W, ee) && (H === Z || c(H, Z, o, l, f)))
                  return W.push(ee);
              })) {
                I = !1;
                break;
              }
            } else if (!(H === Y || c(H, Y, o, l, f))) {
              I = !1;
              break;
            }
          }
          return f.delete(i), f.delete(n), I;
        }
        function Tu(i, n, o, l, c, f, g) {
          switch (o) {
            case _t:
              if (i.byteLength != n.byteLength || i.byteOffset != n.byteOffset)
                return !1;
              i = i.buffer, n = n.buffer;
            case Xt:
              return !(i.byteLength != n.byteLength || !f(new an(i), new an(n)));
            case gt:
            case ut:
            case Tt:
              return lt(+i, +n);
            case Ht:
              return i.name == n.name && i.message == n.message;
            case zt:
            case Gt:
              return i == n + "";
            case Le:
              var v = ur;
            case Me:
              var b = l & q;
              if (v || (v = en), i.size != n.size && !b)
                return !1;
              var C = g.get(i);
              if (C)
                return C == n;
              l |= le, g.set(i, n);
              var A = Vo(v(i), v(n), l, c, f, g);
              return g.delete(i), A;
            case si:
              if (Ti)
                return Ti.call(i) == Ti.call(n);
          }
          return !1;
        }
        function Lu(i, n, o, l, c, f) {
          var g = o & q, v = kr(i), b = v.length, C = kr(n), A = C.length;
          if (b != A && !g)
            return !1;
          for (var T = b; T--; ) {
            var I = v[T];
            if (!(g ? I in n : se.call(n, I)))
              return !1;
          }
          var W = f.get(i), H = f.get(n);
          if (W && H)
            return W == n && H == i;
          var Y = !0;
          f.set(i, n), f.set(n, i);
          for (var z = g; ++T < b; ) {
            I = v[T];
            var Z = i[I], ee = n[I];
            if (l)
              var ze = g ? l(ee, Z, I, n, i, f) : l(Z, ee, I, i, n, f);
            if (!(ze === t ? Z === ee || c(Z, ee, o, l, f) : ze)) {
              Y = !1;
              break;
            }
            z || (z = I == "constructor");
          }
          if (Y && !z) {
            var Te = i.constructor, Ge = n.constructor;
            Te != Ge && "constructor" in i && "constructor" in n && !(typeof Te == "function" && Te instanceof Te && typeof Ge == "function" && Ge instanceof Ge) && (Y = !1);
          }
          return f.delete(i), f.delete(n), Y;
        }
        function bt(i) {
          return zr(Xo(i, t, ta), i + "");
        }
        function kr(i) {
          return so(i, we, Rr);
        }
        function Ur(i) {
          return so(i, ke, Bo);
        }
        var Or = fn ? function(i) {
          return fn.get(i);
        } : is;
        function Cn(i) {
          for (var n = i.name + "", o = mi[n], l = se.call(mi, n) ? o.length : 0; l--; ) {
            var c = o[l], f = c.func;
            if (f == null || f == i)
              return c.name;
          }
          return n;
        }
        function yi(i) {
          var n = se.call(d, "placeholder") ? d : i;
          return n.placeholder;
        }
        function B() {
          var i = d.iteratee || es;
          return i = i === es ? lo : i, arguments.length ? i(arguments[0], arguments[1]) : i;
        }
        function An(i, n) {
          var o = i.__data__;
          return Ru(n) ? o[typeof n == "string" ? "string" : "hash"] : o.map;
        }
        function Wr(i) {
          for (var n = we(i), o = n.length; o--; ) {
            var l = n[o], c = i[l];
            n[o] = [l, c, Go(c)];
          }
          return n;
        }
        function Qt(i, n) {
          var o = Hl(i, n);
          return ao(o) ? o : t;
        }
        function Mu(i) {
          var n = se.call(i, Kt), o = i[Kt];
          try {
            i[Kt] = t;
            var l = !0;
          } catch {
          }
          var c = sn.call(i);
          return l && (n ? i[Kt] = o : delete i[Kt]), c;
        }
        var Rr = dr ? function(i) {
          return i == null ? [] : (i = oe(i), Mt(dr(i), function(n) {
            return Xs.call(i, n);
          }));
        } : ns, Bo = dr ? function(i) {
          for (var n = []; i; )
            Ft(n, Rr(i)), i = ln(i);
          return n;
        } : ns, Pe = Ae;
        (fr && Pe(new fr(new ArrayBuffer(1))) != _t || Ci && Pe(new Ci()) != Le || pr && Pe(pr.resolve()) != Yi || pi && Pe(new pi()) != Me || Ai && Pe(new Ai()) != Nt) && (Pe = function(i) {
          var n = Ae(i), o = n == st ? i.constructor : t, l = o ? ei(o) : "";
          if (l)
            switch (l) {
              case ph:
                return _t;
              case mh:
                return Le;
              case gh:
                return Yi;
              case _h:
                return Me;
              case vh:
                return Nt;
            }
          return n;
        });
        function Fu(i, n, o) {
          for (var l = -1, c = o.length; ++l < c; ) {
            var f = o[l], g = f.size;
            switch (f.type) {
              case "drop":
                i += g;
                break;
              case "dropRight":
                n -= g;
                break;
              case "take":
                n = Ee(n, i + g);
                break;
              case "takeRight":
                i = ye(i, n - g);
                break;
            }
          }
          return { start: i, end: n };
        }
        function Iu(i) {
          var n = i.match(Va);
          return n ? n[1].split(Ba) : [];
        }
        function Ho(i, n, o) {
          n = Wt(n, i);
          for (var l = -1, c = n.length, f = !1; ++l < c; ) {
            var g = ft(n[l]);
            if (!(f = i != null && o(i, g)))
              break;
            i = i[g];
          }
          return f || ++l != c ? f : (c = i == null ? 0 : i.length, !!c && kn(c) && $t(g, c) && (N(i) || ti(i)));
        }
        function ku(i) {
          var n = i.length, o = new i.constructor(n);
          return n && typeof i[0] == "string" && se.call(i, "index") && (o.index = i.index, o.input = i.input), o;
        }
        function zo(i) {
          return typeof i.constructor == "function" && !Oi(i) ? gi(ln(i)) : {};
        }
        function Uu(i, n, o) {
          var l = i.constructor;
          switch (n) {
            case Xt:
              return Mr(i);
            case gt:
            case ut:
              return new l(+i);
            case _t:
              return yu(i, o);
            case oi:
            case Ye:
            case ai:
            case m:
            case w:
            case D:
            case P:
            case F:
            case O:
              return Eo(i, o);
            case Le:
              return new l();
            case Tt:
            case Gt:
              return new l(i);
            case zt:
              return wu(i);
            case Me:
              return new l();
            case si:
              return xu(i);
          }
        }
        function Ou(i, n) {
          var o = n.length;
          if (!o)
            return i;
          var l = o - 1;
          return n[l] = (o > 1 ? "& " : "") + n[l], n = n.join(o > 2 ? ", " : " "), i.replace(Ra, `{
/* [wrapped with ` + n + `] */
`);
        }
        function Wu(i) {
          return N(i) || ti(i) || !!(Ys && i && i[Ys]);
        }
        function $t(i, n) {
          var o = typeof i;
          return n = n ?? Oe, !!n && (o == "number" || o != "symbol" && Za.test(i)) && i > -1 && i % 1 == 0 && i < n;
        }
        function De(i, n, o) {
          if (!fe(o))
            return !1;
          var l = typeof n;
          return (l == "number" ? Ie(o) && $t(n, o.length) : l == "string" && n in o) ? lt(o[n], i) : !1;
        }
        function Vr(i, n) {
          if (N(i))
            return !1;
          var o = typeof i;
          return o == "number" || o == "symbol" || o == "boolean" || i == null || He(i) ? !0 : ka.test(i) || !Ia.test(i) || n != null && i in oe(n);
        }
        function Ru(i) {
          var n = typeof i;
          return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? i !== "__proto__" : i === null;
        }
        function Br(i) {
          var n = Cn(i), o = d[n];
          if (typeof o != "function" || !(n in J.prototype))
            return !1;
          if (i === o)
            return !0;
          var l = Or(o);
          return !!l && i === l[0];
        }
        function Vu(i) {
          return !!zs && zs in i;
        }
        var Bu = nn ? St : rs;
        function Oi(i) {
          var n = i && i.constructor, o = typeof n == "function" && n.prototype || fi;
          return i === o;
        }
        function Go(i) {
          return i === i && !fe(i);
        }
        function No(i, n) {
          return function(o) {
            return o == null ? !1 : o[i] === n && (n !== t || i in oe(o));
          };
        }
        function Hu(i) {
          var n = Fn(i, function(l) {
            return o.size === S && o.clear(), l;
          }), o = n.cache;
          return n;
        }
        function zu(i, n) {
          var o = i[1], l = n[1], c = o | l, f = c < (j | it | pe), g = l == pe && o == Ne || l == pe && o == At && i[7].length <= n[8] || l == (pe | At) && n[7].length <= n[8] && o == Ne;
          if (!(f || g))
            return i;
          l & j && (i[2] = n[2], c |= o & j ? 0 : nt);
          var v = n[3];
          if (v) {
            var b = i[3];
            i[3] = b ? Co(b, v, n[4]) : v, i[4] = b ? It(i[3], L) : n[4];
          }
          return v = n[5], v && (b = i[5], i[5] = b ? Ao(b, v, n[6]) : v, i[6] = b ? It(i[5], L) : n[6]), v = n[7], v && (i[7] = v), l & pe && (i[8] = i[8] == null ? n[8] : Ee(i[8], n[8])), i[9] == null && (i[9] = n[9]), i[0] = n[0], i[1] = c, i;
        }
        function Gu(i) {
          var n = [];
          if (i != null)
            for (var o in oe(i))
              n.push(o);
          return n;
        }
        function Nu(i) {
          return sn.call(i);
        }
        function Xo(i, n, o) {
          return n = ye(n === t ? i.length - 1 : n, 0), function() {
            for (var l = arguments, c = -1, f = ye(l.length - n, 0), g = $(f); ++c < f; )
              g[c] = l[n + c];
            c = -1;
            for (var v = $(n + 1); ++c < n; )
              v[c] = l[c];
            return v[n] = o(g), Re(i, this, v);
          };
        }
        function Yo(i, n) {
          return n.length < 2 ? i : Jt(i, Qe(n, 0, -1));
        }
        function Xu(i, n) {
          for (var o = i.length, l = Ee(n.length, o), c = Fe(i); l--; ) {
            var f = n[l];
            i[l] = $t(f, o) ? c[f] : t;
          }
          return i;
        }
        function Hr(i, n) {
          if (!(n === "constructor" && typeof i[n] == "function") && n != "__proto__")
            return i[n];
        }
        var Ko = Zo(_o), Wi = ah || function(i, n) {
          return $e.setTimeout(i, n);
        }, zr = Zo(mu);
        function qo(i, n, o) {
          var l = n + "";
          return zr(i, Ou(l, Yu(Iu(l), o)));
        }
        function Zo(i) {
          var n = 0, o = 0;
          return function() {
            var l = ch(), c = Dt - (l - o);
            if (o = l, c > 0) {
              if (++n >= Vi)
                return arguments[0];
            } else
              n = 0;
            return i.apply(t, arguments);
          };
        }
        function Dn(i, n) {
          var o = -1, l = i.length, c = l - 1;
          for (n = n === t ? l : n; ++o < n; ) {
            var f = Er(o, c), g = i[f];
            i[f] = i[o], i[o] = g;
          }
          return i.length = n, i;
        }
        var jo = Hu(function(i) {
          var n = [];
          return i.charCodeAt(0) === 46 && n.push(""), i.replace(Ua, function(o, l, c, f) {
            n.push(c ? f.replace(Ga, "$1") : l || o);
          }), n;
        });
        function ft(i) {
          if (typeof i == "string" || He(i))
            return i;
          var n = i + "";
          return n == "0" && 1 / i == -Xe ? "-0" : n;
        }
        function ei(i) {
          if (i != null) {
            try {
              return rn.call(i);
            } catch {
            }
            try {
              return i + "";
            } catch {
            }
          }
          return "";
        }
        function Yu(i, n) {
          return qe(Gi, function(o) {
            var l = "_." + o[0];
            n & o[1] && !Ji(i, l) && i.push(l);
          }), i.sort();
        }
        function Jo(i) {
          if (i instanceof J)
            return i.clone();
          var n = new je(i.__wrapped__, i.__chain__);
          return n.__actions__ = Fe(i.__actions__), n.__index__ = i.__index__, n.__values__ = i.__values__, n;
        }
        function Ku(i, n, o) {
          (o ? De(i, n, o) : n === t) ? n = 1 : n = ye(X(n), 0);
          var l = i == null ? 0 : i.length;
          if (!l || n < 1)
            return [];
          for (var c = 0, f = 0, g = $(cn(l / n)); c < l; )
            g[f++] = Qe(i, c, c += n);
          return g;
        }
        function qu(i) {
          for (var n = -1, o = i == null ? 0 : i.length, l = 0, c = []; ++n < o; ) {
            var f = i[n];
            f && (c[l++] = f);
          }
          return c;
        }
        function Zu() {
          var i = arguments.length;
          if (!i)
            return [];
          for (var n = $(i - 1), o = arguments[0], l = i; l--; )
            n[l - 1] = arguments[l];
          return Ft(N(o) ? Fe(o) : [o], Se(n, 1));
        }
        var ju = K(function(i, n) {
          return ge(i) ? Mi(i, Se(n, 1, ge, !0)) : [];
        }), Ju = K(function(i, n) {
          var o = et(n);
          return ge(o) && (o = t), ge(i) ? Mi(i, Se(n, 1, ge, !0), B(o, 2)) : [];
        }), Qu = K(function(i, n) {
          var o = et(n);
          return ge(o) && (o = t), ge(i) ? Mi(i, Se(n, 1, ge, !0), t, o) : [];
        });
        function ec(i, n, o) {
          var l = i == null ? 0 : i.length;
          return l ? (n = o || n === t ? 1 : X(n), Qe(i, n < 0 ? 0 : n, l)) : [];
        }
        function tc(i, n, o) {
          var l = i == null ? 0 : i.length;
          return l ? (n = o || n === t ? 1 : X(n), n = l - n, Qe(i, 0, n < 0 ? 0 : n)) : [];
        }
        function ic(i, n) {
          return i && i.length ? xn(i, B(n, 3), !0, !0) : [];
        }
        function nc(i, n) {
          return i && i.length ? xn(i, B(n, 3), !0) : [];
        }
        function rc(i, n, o, l) {
          var c = i == null ? 0 : i.length;
          return c ? (o && typeof o != "number" && De(i, n, o) && (o = 0, l = c), Zh(i, n, o, l)) : [];
        }
        function Qo(i, n, o) {
          var l = i == null ? 0 : i.length;
          if (!l)
            return -1;
          var c = o == null ? 0 : X(o);
          return c < 0 && (c = ye(l + c, 0)), Qi(i, B(n, 3), c);
        }
        function ea(i, n, o) {
          var l = i == null ? 0 : i.length;
          if (!l)
            return -1;
          var c = l - 1;
          return o !== t && (c = X(o), c = o < 0 ? ye(l + c, 0) : Ee(c, l - 1)), Qi(i, B(n, 3), c, !0);
        }
        function ta(i) {
          var n = i == null ? 0 : i.length;
          return n ? Se(i, 1) : [];
        }
        function sc(i) {
          var n = i == null ? 0 : i.length;
          return n ? Se(i, Xe) : [];
        }
        function oc(i, n) {
          var o = i == null ? 0 : i.length;
          return o ? (n = n === t ? 1 : X(n), Se(i, n)) : [];
        }
        function ac(i) {
          for (var n = -1, o = i == null ? 0 : i.length, l = {}; ++n < o; ) {
            var c = i[n];
            l[c[0]] = c[1];
          }
          return l;
        }
        function ia(i) {
          return i && i.length ? i[0] : t;
        }
        function lc(i, n, o) {
          var l = i == null ? 0 : i.length;
          if (!l)
            return -1;
          var c = o == null ? 0 : X(o);
          return c < 0 && (c = ye(l + c, 0)), hi(i, n, c);
        }
        function hc(i) {
          var n = i == null ? 0 : i.length;
          return n ? Qe(i, 0, -1) : [];
        }
        var uc = K(function(i) {
          var n = de(i, Tr);
          return n.length && n[0] === i[0] ? wr(n) : [];
        }), cc = K(function(i) {
          var n = et(i), o = de(i, Tr);
          return n === et(o) ? n = t : o.pop(), o.length && o[0] === i[0] ? wr(o, B(n, 2)) : [];
        }), dc = K(function(i) {
          var n = et(i), o = de(i, Tr);
          return n = typeof n == "function" ? n : t, n && o.pop(), o.length && o[0] === i[0] ? wr(o, t, n) : [];
        });
        function fc(i, n) {
          return i == null ? "" : hh.call(i, n);
        }
        function et(i) {
          var n = i == null ? 0 : i.length;
          return n ? i[n - 1] : t;
        }
        function pc(i, n, o) {
          var l = i == null ? 0 : i.length;
          if (!l)
            return -1;
          var c = l;
          return o !== t && (c = X(o), c = c < 0 ? ye(l + c, 0) : Ee(c, l - 1)), n === n ? Yl(i, n, c) : Qi(i, ks, c, !0);
        }
        function mc(i, n) {
          return i && i.length ? fo(i, X(n)) : t;
        }
        var gc = K(na);
        function na(i, n) {
          return i && i.length && n && n.length ? Sr(i, n) : i;
        }
        function _c(i, n, o) {
          return i && i.length && n && n.length ? Sr(i, n, B(o, 2)) : i;
        }
        function vc(i, n, o) {
          return i && i.length && n && n.length ? Sr(i, n, t, o) : i;
        }
        var yc = bt(function(i, n) {
          var o = i == null ? 0 : i.length, l = gr(i, n);
          return go(i, de(n, function(c) {
            return $t(c, o) ? +c : c;
          }).sort(Po)), l;
        });
        function wc(i, n) {
          var o = [];
          if (!(i && i.length))
            return o;
          var l = -1, c = [], f = i.length;
          for (n = B(n, 3); ++l < f; ) {
            var g = i[l];
            n(g, l, i) && (o.push(g), c.push(l));
          }
          return go(i, c), o;
        }
        function Gr(i) {
          return i == null ? i : fh.call(i);
        }
        function xc(i, n, o) {
          var l = i == null ? 0 : i.length;
          return l ? (o && typeof o != "number" && De(i, n, o) ? (n = 0, o = l) : (n = n == null ? 0 : X(n), o = o === t ? l : X(o)), Qe(i, n, o)) : [];
        }
        function bc(i, n) {
          return wn(i, n);
        }
        function $c(i, n, o) {
          return Cr(i, n, B(o, 2));
        }
        function Sc(i, n) {
          var o = i == null ? 0 : i.length;
          if (o) {
            var l = wn(i, n);
            if (l < o && lt(i[l], n))
              return l;
          }
          return -1;
        }
        function Ec(i, n) {
          return wn(i, n, !0);
        }
        function Pc(i, n, o) {
          return Cr(i, n, B(o, 2), !0);
        }
        function Cc(i, n) {
          var o = i == null ? 0 : i.length;
          if (o) {
            var l = wn(i, n, !0) - 1;
            if (lt(i[l], n))
              return l;
          }
          return -1;
        }
        function Ac(i) {
          return i && i.length ? vo(i) : [];
        }
        function Dc(i, n) {
          return i && i.length ? vo(i, B(n, 2)) : [];
        }
        function Tc(i) {
          var n = i == null ? 0 : i.length;
          return n ? Qe(i, 1, n) : [];
        }
        function Lc(i, n, o) {
          return i && i.length ? (n = o || n === t ? 1 : X(n), Qe(i, 0, n < 0 ? 0 : n)) : [];
        }
        function Mc(i, n, o) {
          var l = i == null ? 0 : i.length;
          return l ? (n = o || n === t ? 1 : X(n), n = l - n, Qe(i, n < 0 ? 0 : n, l)) : [];
        }
        function Fc(i, n) {
          return i && i.length ? xn(i, B(n, 3), !1, !0) : [];
        }
        function Ic(i, n) {
          return i && i.length ? xn(i, B(n, 3)) : [];
        }
        var kc = K(function(i) {
          return Ot(Se(i, 1, ge, !0));
        }), Uc = K(function(i) {
          var n = et(i);
          return ge(n) && (n = t), Ot(Se(i, 1, ge, !0), B(n, 2));
        }), Oc = K(function(i) {
          var n = et(i);
          return n = typeof n == "function" ? n : t, Ot(Se(i, 1, ge, !0), t, n);
        });
        function Wc(i) {
          return i && i.length ? Ot(i) : [];
        }
        function Rc(i, n) {
          return i && i.length ? Ot(i, B(n, 2)) : [];
        }
        function Vc(i, n) {
          return n = typeof n == "function" ? n : t, i && i.length ? Ot(i, t, n) : [];
        }
        function Nr(i) {
          if (!(i && i.length))
            return [];
          var n = 0;
          return i = Mt(i, function(o) {
            if (ge(o))
              return n = ye(o.length, n), !0;
          }), lr(n, function(o) {
            return de(i, sr(o));
          });
        }
        function ra(i, n) {
          if (!(i && i.length))
            return [];
          var o = Nr(i);
          return n == null ? o : de(o, function(l) {
            return Re(n, t, l);
          });
        }
        var Bc = K(function(i, n) {
          return ge(i) ? Mi(i, n) : [];
        }), Hc = K(function(i) {
          return Dr(Mt(i, ge));
        }), zc = K(function(i) {
          var n = et(i);
          return ge(n) && (n = t), Dr(Mt(i, ge), B(n, 2));
        }), Gc = K(function(i) {
          var n = et(i);
          return n = typeof n == "function" ? n : t, Dr(Mt(i, ge), t, n);
        }), Nc = K(Nr);
        function Xc(i, n) {
          return bo(i || [], n || [], Li);
        }
        function Yc(i, n) {
          return bo(i || [], n || [], ki);
        }
        var Kc = K(function(i) {
          var n = i.length, o = n > 1 ? i[n - 1] : t;
          return o = typeof o == "function" ? (i.pop(), o) : t, ra(i, o);
        });
        function sa(i) {
          var n = d(i);
          return n.__chain__ = !0, n;
        }
        function qc(i, n) {
          return n(i), i;
        }
        function Tn(i, n) {
          return n(i);
        }
        var Zc = bt(function(i) {
          var n = i.length, o = n ? i[0] : 0, l = this.__wrapped__, c = function(f) {
            return gr(f, i);
          };
          return n > 1 || this.__actions__.length || !(l instanceof J) || !$t(o) ? this.thru(c) : (l = l.slice(o, +o + (n ? 1 : 0)), l.__actions__.push({
            func: Tn,
            args: [c],
            thisArg: t
          }), new je(l, this.__chain__).thru(function(f) {
            return n && !f.length && f.push(t), f;
          }));
        });
        function jc() {
          return sa(this);
        }
        function Jc() {
          return new je(this.value(), this.__chain__);
        }
        function Qc() {
          this.__values__ === t && (this.__values__ = ya(this.value()));
          var i = this.__index__ >= this.__values__.length, n = i ? t : this.__values__[this.__index__++];
          return { done: i, value: n };
        }
        function ed() {
          return this;
        }
        function td(i) {
          for (var n, o = this; o instanceof mn; ) {
            var l = Jo(o);
            l.__index__ = 0, l.__values__ = t, n ? c.__wrapped__ = l : n = l;
            var c = l;
            o = o.__wrapped__;
          }
          return c.__wrapped__ = i, n;
        }
        function id() {
          var i = this.__wrapped__;
          if (i instanceof J) {
            var n = i;
            return this.__actions__.length && (n = new J(this)), n = n.reverse(), n.__actions__.push({
              func: Tn,
              args: [Gr],
              thisArg: t
            }), new je(n, this.__chain__);
          }
          return this.thru(Gr);
        }
        function nd() {
          return xo(this.__wrapped__, this.__actions__);
        }
        var rd = bn(function(i, n, o) {
          se.call(i, o) ? ++i[o] : wt(i, o, 1);
        });
        function sd(i, n, o) {
          var l = N(i) ? Fs : qh;
          return o && De(i, n, o) && (n = t), l(i, B(n, 3));
        }
        function od(i, n) {
          var o = N(i) ? Mt : no;
          return o(i, B(n, 3));
        }
        var ad = Mo(Qo), ld = Mo(ea);
        function hd(i, n) {
          return Se(Ln(i, n), 1);
        }
        function ud(i, n) {
          return Se(Ln(i, n), Xe);
        }
        function cd(i, n, o) {
          return o = o === t ? 1 : X(o), Se(Ln(i, n), o);
        }
        function oa(i, n) {
          var o = N(i) ? qe : Ut;
          return o(i, B(n, 3));
        }
        function aa(i, n) {
          var o = N(i) ? Tl : io;
          return o(i, B(n, 3));
        }
        var dd = bn(function(i, n, o) {
          se.call(i, o) ? i[o].push(n) : wt(i, o, [n]);
        });
        function fd(i, n, o, l) {
          i = Ie(i) ? i : xi(i), o = o && !l ? X(o) : 0;
          var c = i.length;
          return o < 0 && (o = ye(c + o, 0)), Un(i) ? o <= c && i.indexOf(n, o) > -1 : !!c && hi(i, n, o) > -1;
        }
        var pd = K(function(i, n, o) {
          var l = -1, c = typeof n == "function", f = Ie(i) ? $(i.length) : [];
          return Ut(i, function(g) {
            f[++l] = c ? Re(n, g, o) : Fi(g, n, o);
          }), f;
        }), md = bn(function(i, n, o) {
          wt(i, o, n);
        });
        function Ln(i, n) {
          var o = N(i) ? de : ho;
          return o(i, B(n, 3));
        }
        function gd(i, n, o, l) {
          return i == null ? [] : (N(n) || (n = n == null ? [] : [n]), o = l ? t : o, N(o) || (o = o == null ? [] : [o]), po(i, n, o));
        }
        var _d = bn(function(i, n, o) {
          i[o ? 0 : 1].push(n);
        }, function() {
          return [[], []];
        });
        function vd(i, n, o) {
          var l = N(i) ? nr : Os, c = arguments.length < 3;
          return l(i, B(n, 4), o, c, Ut);
        }
        function yd(i, n, o) {
          var l = N(i) ? Ll : Os, c = arguments.length < 3;
          return l(i, B(n, 4), o, c, io);
        }
        function wd(i, n) {
          var o = N(i) ? Mt : no;
          return o(i, In(B(n, 3)));
        }
        function xd(i) {
          var n = N(i) ? Js : fu;
          return n(i);
        }
        function bd(i, n, o) {
          (o ? De(i, n, o) : n === t) ? n = 1 : n = X(n);
          var l = N(i) ? Gh : pu;
          return l(i, n);
        }
        function $d(i) {
          var n = N(i) ? Nh : gu;
          return n(i);
        }
        function Sd(i) {
          if (i == null)
            return 0;
          if (Ie(i))
            return Un(i) ? ci(i) : i.length;
          var n = Pe(i);
          return n == Le || n == Me ? i.size : br(i).length;
        }
        function Ed(i, n, o) {
          var l = N(i) ? rr : _u;
          return o && De(i, n, o) && (n = t), l(i, B(n, 3));
        }
        var Pd = K(function(i, n) {
          if (i == null)
            return [];
          var o = n.length;
          return o > 1 && De(i, n[0], n[1]) ? n = [] : o > 2 && De(n[0], n[1], n[2]) && (n = [n[0]]), po(i, Se(n, 1), []);
        }), Mn = oh || function() {
          return $e.Date.now();
        };
        function Cd(i, n) {
          if (typeof n != "function")
            throw new Ze(u);
          return i = X(i), function() {
            if (--i < 1)
              return n.apply(this, arguments);
          };
        }
        function la(i, n, o) {
          return n = o ? t : n, n = i && n == null ? i.length : n, xt(i, pe, t, t, t, t, n);
        }
        function ha(i, n) {
          var o;
          if (typeof n != "function")
            throw new Ze(u);
          return i = X(i), function() {
            return --i > 0 && (o = n.apply(this, arguments)), i <= 1 && (n = t), o;
          };
        }
        var Xr = K(function(i, n, o) {
          var l = j;
          if (o.length) {
            var c = It(o, yi(Xr));
            l |= rt;
          }
          return xt(i, l, n, o, c);
        }), ua = K(function(i, n, o) {
          var l = j | it;
          if (o.length) {
            var c = It(o, yi(ua));
            l |= rt;
          }
          return xt(n, l, i, o, c);
        });
        function ca(i, n, o) {
          n = o ? t : n;
          var l = xt(i, Ne, t, t, t, t, t, n);
          return l.placeholder = ca.placeholder, l;
        }
        function da(i, n, o) {
          n = o ? t : n;
          var l = xt(i, xe, t, t, t, t, t, n);
          return l.placeholder = da.placeholder, l;
        }
        function fa(i, n, o) {
          var l, c, f, g, v, b, C = 0, A = !1, T = !1, I = !0;
          if (typeof i != "function")
            throw new Ze(u);
          n = tt(n) || 0, fe(o) && (A = !!o.leading, T = "maxWait" in o, f = T ? ye(tt(o.maxWait) || 0, n) : f, I = "trailing" in o ? !!o.trailing : I);
          function W(_e) {
            var ht = l, Pt = c;
            return l = c = t, C = _e, g = i.apply(Pt, ht), g;
          }
          function H(_e) {
            return C = _e, v = Wi(Z, n), A ? W(_e) : g;
          }
          function Y(_e) {
            var ht = _e - b, Pt = _e - C, Ma = n - ht;
            return T ? Ee(Ma, f - Pt) : Ma;
          }
          function z(_e) {
            var ht = _e - b, Pt = _e - C;
            return b === t || ht >= n || ht < 0 || T && Pt >= f;
          }
          function Z() {
            var _e = Mn();
            if (z(_e))
              return ee(_e);
            v = Wi(Z, Y(_e));
          }
          function ee(_e) {
            return v = t, I && l ? W(_e) : (l = c = t, g);
          }
          function ze() {
            v !== t && $o(v), C = 0, l = b = c = v = t;
          }
          function Te() {
            return v === t ? g : ee(Mn());
          }
          function Ge() {
            var _e = Mn(), ht = z(_e);
            if (l = arguments, c = this, b = _e, ht) {
              if (v === t)
                return H(b);
              if (T)
                return $o(v), v = Wi(Z, n), W(b);
            }
            return v === t && (v = Wi(Z, n)), g;
          }
          return Ge.cancel = ze, Ge.flush = Te, Ge;
        }
        var Ad = K(function(i, n) {
          return to(i, 1, n);
        }), Dd = K(function(i, n, o) {
          return to(i, tt(n) || 0, o);
        });
        function Td(i) {
          return xt(i, bi);
        }
        function Fn(i, n) {
          if (typeof i != "function" || n != null && typeof n != "function")
            throw new Ze(u);
          var o = function() {
            var l = arguments, c = n ? n.apply(this, l) : l[0], f = o.cache;
            if (f.has(c))
              return f.get(c);
            var g = i.apply(this, l);
            return o.cache = f.set(c, g) || f, g;
          };
          return o.cache = new (Fn.Cache || yt)(), o;
        }
        Fn.Cache = yt;
        function In(i) {
          if (typeof i != "function")
            throw new Ze(u);
          return function() {
            var n = arguments;
            switch (n.length) {
              case 0:
                return !i.call(this);
              case 1:
                return !i.call(this, n[0]);
              case 2:
                return !i.call(this, n[0], n[1]);
              case 3:
                return !i.call(this, n[0], n[1], n[2]);
            }
            return !i.apply(this, n);
          };
        }
        function Ld(i) {
          return ha(2, i);
        }
        var Md = vu(function(i, n) {
          n = n.length == 1 && N(n[0]) ? de(n[0], Ve(B())) : de(Se(n, 1), Ve(B()));
          var o = n.length;
          return K(function(l) {
            for (var c = -1, f = Ee(l.length, o); ++c < f; )
              l[c] = n[c].call(this, l[c]);
            return Re(i, this, l);
          });
        }), Yr = K(function(i, n) {
          var o = It(n, yi(Yr));
          return xt(i, rt, t, n, o);
        }), pa = K(function(i, n) {
          var o = It(n, yi(pa));
          return xt(i, Ct, t, n, o);
        }), Fd = bt(function(i, n) {
          return xt(i, At, t, t, t, n);
        });
        function Id(i, n) {
          if (typeof i != "function")
            throw new Ze(u);
          return n = n === t ? n : X(n), K(i, n);
        }
        function kd(i, n) {
          if (typeof i != "function")
            throw new Ze(u);
          return n = n == null ? 0 : ye(X(n), 0), K(function(o) {
            var l = o[n], c = Rt(o, 0, n);
            return l && Ft(c, l), Re(i, this, c);
          });
        }
        function Ud(i, n, o) {
          var l = !0, c = !0;
          if (typeof i != "function")
            throw new Ze(u);
          return fe(o) && (l = "leading" in o ? !!o.leading : l, c = "trailing" in o ? !!o.trailing : c), fa(i, n, {
            leading: l,
            maxWait: n,
            trailing: c
          });
        }
        function Od(i) {
          return la(i, 1);
        }
        function Wd(i, n) {
          return Yr(Lr(n), i);
        }
        function Rd() {
          if (!arguments.length)
            return [];
          var i = arguments[0];
          return N(i) ? i : [i];
        }
        function Vd(i) {
          return Je(i, k);
        }
        function Bd(i, n) {
          return n = typeof n == "function" ? n : t, Je(i, k, n);
        }
        function Hd(i) {
          return Je(i, M | k);
        }
        function zd(i, n) {
          return n = typeof n == "function" ? n : t, Je(i, M | k, n);
        }
        function Gd(i, n) {
          return n == null || eo(i, n, we(n));
        }
        function lt(i, n) {
          return i === n || i !== i && n !== n;
        }
        var Nd = Pn(yr), Xd = Pn(function(i, n) {
          return i >= n;
        }), ti = oo(/* @__PURE__ */ (function() {
          return arguments;
        })()) ? oo : function(i) {
          return me(i) && se.call(i, "callee") && !Xs.call(i, "callee");
        }, N = $.isArray, Yd = Cs ? Ve(Cs) : tu;
        function Ie(i) {
          return i != null && kn(i.length) && !St(i);
        }
        function ge(i) {
          return me(i) && Ie(i);
        }
        function Kd(i) {
          return i === !0 || i === !1 || me(i) && Ae(i) == gt;
        }
        var Vt = lh || rs, qd = As ? Ve(As) : iu;
        function Zd(i) {
          return me(i) && i.nodeType === 1 && !Ri(i);
        }
        function jd(i) {
          if (i == null)
            return !0;
          if (Ie(i) && (N(i) || typeof i == "string" || typeof i.splice == "function" || Vt(i) || wi(i) || ti(i)))
            return !i.length;
          var n = Pe(i);
          if (n == Le || n == Me)
            return !i.size;
          if (Oi(i))
            return !br(i).length;
          for (var o in i)
            if (se.call(i, o))
              return !1;
          return !0;
        }
        function Jd(i, n) {
          return Ii(i, n);
        }
        function Qd(i, n, o) {
          o = typeof o == "function" ? o : t;
          var l = o ? o(i, n) : t;
          return l === t ? Ii(i, n, t, o) : !!l;
        }
        function Kr(i) {
          if (!me(i))
            return !1;
          var n = Ae(i);
          return n == Ht || n == Ni || typeof i.message == "string" && typeof i.name == "string" && !Ri(i);
        }
        function ef(i) {
          return typeof i == "number" && Ks(i);
        }
        function St(i) {
          if (!fe(i))
            return !1;
          var n = Ae(i);
          return n == ri || n == Xi || n == Si || n == Gn;
        }
        function ma(i) {
          return typeof i == "number" && i == X(i);
        }
        function kn(i) {
          return typeof i == "number" && i > -1 && i % 1 == 0 && i <= Oe;
        }
        function fe(i) {
          var n = typeof i;
          return i != null && (n == "object" || n == "function");
        }
        function me(i) {
          return i != null && typeof i == "object";
        }
        var ga = Ds ? Ve(Ds) : ru;
        function tf(i, n) {
          return i === n || xr(i, n, Wr(n));
        }
        function nf(i, n, o) {
          return o = typeof o == "function" ? o : t, xr(i, n, Wr(n), o);
        }
        function rf(i) {
          return _a(i) && i != +i;
        }
        function sf(i) {
          if (Bu(i))
            throw new G(h);
          return ao(i);
        }
        function of(i) {
          return i === null;
        }
        function af(i) {
          return i == null;
        }
        function _a(i) {
          return typeof i == "number" || me(i) && Ae(i) == Tt;
        }
        function Ri(i) {
          if (!me(i) || Ae(i) != st)
            return !1;
          var n = ln(i);
          if (n === null)
            return !0;
          var o = se.call(n, "constructor") && n.constructor;
          return typeof o == "function" && o instanceof o && rn.call(o) == ih;
        }
        var qr = Ts ? Ve(Ts) : su;
        function lf(i) {
          return ma(i) && i >= -Oe && i <= Oe;
        }
        var va = Ls ? Ve(Ls) : ou;
        function Un(i) {
          return typeof i == "string" || !N(i) && me(i) && Ae(i) == Gt;
        }
        function He(i) {
          return typeof i == "symbol" || me(i) && Ae(i) == si;
        }
        var wi = Ms ? Ve(Ms) : au;
        function hf(i) {
          return i === t;
        }
        function uf(i) {
          return me(i) && Pe(i) == Nt;
        }
        function cf(i) {
          return me(i) && Ae(i) == Ki;
        }
        var df = Pn($r), ff = Pn(function(i, n) {
          return i <= n;
        });
        function ya(i) {
          if (!i)
            return [];
          if (Ie(i))
            return Un(i) ? ot(i) : Fe(i);
          if (Pi && i[Pi])
            return Gl(i[Pi]());
          var n = Pe(i), o = n == Le ? ur : n == Me ? en : xi;
          return o(i);
        }
        function Et(i) {
          if (!i)
            return i === 0 ? i : 0;
          if (i = tt(i), i === Xe || i === -Xe) {
            var n = i < 0 ? -1 : 1;
            return n * Hi;
          }
          return i === i ? i : 0;
        }
        function X(i) {
          var n = Et(i), o = n % 1;
          return n === n ? o ? n - o : n : 0;
        }
        function wa(i) {
          return i ? jt(X(i), 0, Ce) : 0;
        }
        function tt(i) {
          if (typeof i == "number")
            return i;
          if (He(i))
            return Bt;
          if (fe(i)) {
            var n = typeof i.valueOf == "function" ? i.valueOf() : i;
            i = fe(n) ? n + "" : n;
          }
          if (typeof i != "string")
            return i === 0 ? i : +i;
          i = Ws(i);
          var o = Ya.test(i);
          return o || qa.test(i) ? Cl(i.slice(2), o ? 2 : 8) : Xa.test(i) ? Bt : +i;
        }
        function xa(i) {
          return dt(i, ke(i));
        }
        function pf(i) {
          return i ? jt(X(i), -Oe, Oe) : i === 0 ? i : 0;
        }
        function re(i) {
          return i == null ? "" : Be(i);
        }
        var mf = _i(function(i, n) {
          if (Oi(n) || Ie(n)) {
            dt(n, we(n), i);
            return;
          }
          for (var o in n)
            se.call(n, o) && Li(i, o, n[o]);
        }), ba = _i(function(i, n) {
          dt(n, ke(n), i);
        }), On = _i(function(i, n, o, l) {
          dt(n, ke(n), i, l);
        }), gf = _i(function(i, n, o, l) {
          dt(n, we(n), i, l);
        }), _f = bt(gr);
        function vf(i, n) {
          var o = gi(i);
          return n == null ? o : Qs(o, n);
        }
        var yf = K(function(i, n) {
          i = oe(i);
          var o = -1, l = n.length, c = l > 2 ? n[2] : t;
          for (c && De(n[0], n[1], c) && (l = 1); ++o < l; )
            for (var f = n[o], g = ke(f), v = -1, b = g.length; ++v < b; ) {
              var C = g[v], A = i[C];
              (A === t || lt(A, fi[C]) && !se.call(i, C)) && (i[C] = f[C]);
            }
          return i;
        }), wf = K(function(i) {
          return i.push(t, Ro), Re($a, t, i);
        });
        function xf(i, n) {
          return Is(i, B(n, 3), ct);
        }
        function bf(i, n) {
          return Is(i, B(n, 3), vr);
        }
        function $f(i, n) {
          return i == null ? i : _r(i, B(n, 3), ke);
        }
        function Sf(i, n) {
          return i == null ? i : ro(i, B(n, 3), ke);
        }
        function Ef(i, n) {
          return i && ct(i, B(n, 3));
        }
        function Pf(i, n) {
          return i && vr(i, B(n, 3));
        }
        function Cf(i) {
          return i == null ? [] : vn(i, we(i));
        }
        function Af(i) {
          return i == null ? [] : vn(i, ke(i));
        }
        function Zr(i, n, o) {
          var l = i == null ? t : Jt(i, n);
          return l === t ? o : l;
        }
        function Df(i, n) {
          return i != null && Ho(i, n, jh);
        }
        function jr(i, n) {
          return i != null && Ho(i, n, Jh);
        }
        var Tf = Io(function(i, n, o) {
          n != null && typeof n.toString != "function" && (n = sn.call(n)), i[n] = o;
        }, Qr(Ue)), Lf = Io(function(i, n, o) {
          n != null && typeof n.toString != "function" && (n = sn.call(n)), se.call(i, n) ? i[n].push(o) : i[n] = [o];
        }, B), Mf = K(Fi);
        function we(i) {
          return Ie(i) ? js(i) : br(i);
        }
        function ke(i) {
          return Ie(i) ? js(i, !0) : lu(i);
        }
        function Ff(i, n) {
          var o = {};
          return n = B(n, 3), ct(i, function(l, c, f) {
            wt(o, n(l, c, f), l);
          }), o;
        }
        function If(i, n) {
          var o = {};
          return n = B(n, 3), ct(i, function(l, c, f) {
            wt(o, c, n(l, c, f));
          }), o;
        }
        var kf = _i(function(i, n, o) {
          yn(i, n, o);
        }), $a = _i(function(i, n, o, l) {
          yn(i, n, o, l);
        }), Uf = bt(function(i, n) {
          var o = {};
          if (i == null)
            return o;
          var l = !1;
          n = de(n, function(f) {
            return f = Wt(f, i), l || (l = f.length > 1), f;
          }), dt(i, Ur(i), o), l && (o = Je(o, M | R | k, Du));
          for (var c = n.length; c--; )
            Ar(o, n[c]);
          return o;
        });
        function Of(i, n) {
          return Sa(i, In(B(n)));
        }
        var Wf = bt(function(i, n) {
          return i == null ? {} : uu(i, n);
        });
        function Sa(i, n) {
          if (i == null)
            return {};
          var o = de(Ur(i), function(l) {
            return [l];
          });
          return n = B(n), mo(i, o, function(l, c) {
            return n(l, c[0]);
          });
        }
        function Rf(i, n, o) {
          n = Wt(n, i);
          var l = -1, c = n.length;
          for (c || (c = 1, i = t); ++l < c; ) {
            var f = i == null ? t : i[ft(n[l])];
            f === t && (l = c, f = o), i = St(f) ? f.call(i) : f;
          }
          return i;
        }
        function Vf(i, n, o) {
          return i == null ? i : ki(i, n, o);
        }
        function Bf(i, n, o, l) {
          return l = typeof l == "function" ? l : t, i == null ? i : ki(i, n, o, l);
        }
        var Ea = Oo(we), Pa = Oo(ke);
        function Hf(i, n, o) {
          var l = N(i), c = l || Vt(i) || wi(i);
          if (n = B(n, 4), o == null) {
            var f = i && i.constructor;
            c ? o = l ? new f() : [] : fe(i) ? o = St(f) ? gi(ln(i)) : {} : o = {};
          }
          return (c ? qe : ct)(i, function(g, v, b) {
            return n(o, g, v, b);
          }), o;
        }
        function zf(i, n) {
          return i == null ? !0 : Ar(i, n);
        }
        function Gf(i, n, o) {
          return i == null ? i : wo(i, n, Lr(o));
        }
        function Nf(i, n, o, l) {
          return l = typeof l == "function" ? l : t, i == null ? i : wo(i, n, Lr(o), l);
        }
        function xi(i) {
          return i == null ? [] : hr(i, we(i));
        }
        function Xf(i) {
          return i == null ? [] : hr(i, ke(i));
        }
        function Yf(i, n, o) {
          return o === t && (o = n, n = t), o !== t && (o = tt(o), o = o === o ? o : 0), n !== t && (n = tt(n), n = n === n ? n : 0), jt(tt(i), n, o);
        }
        function Kf(i, n, o) {
          return n = Et(n), o === t ? (o = n, n = 0) : o = Et(o), i = tt(i), Qh(i, n, o);
        }
        function qf(i, n, o) {
          if (o && typeof o != "boolean" && De(i, n, o) && (n = o = t), o === t && (typeof n == "boolean" ? (o = n, n = t) : typeof i == "boolean" && (o = i, i = t)), i === t && n === t ? (i = 0, n = 1) : (i = Et(i), n === t ? (n = i, i = 0) : n = Et(n)), i > n) {
            var l = i;
            i = n, n = l;
          }
          if (o || i % 1 || n % 1) {
            var c = qs();
            return Ee(i + c * (n - i + Pl("1e-" + ((c + "").length - 1))), n);
          }
          return Er(i, n);
        }
        var Zf = vi(function(i, n, o) {
          return n = n.toLowerCase(), i + (o ? Ca(n) : n);
        });
        function Ca(i) {
          return Jr(re(i).toLowerCase());
        }
        function Aa(i) {
          return i = re(i), i && i.replace(ja, Rl).replace(gl, "");
        }
        function jf(i, n, o) {
          i = re(i), n = Be(n);
          var l = i.length;
          o = o === t ? l : jt(X(o), 0, l);
          var c = o;
          return o -= n.length, o >= 0 && i.slice(o, c) == n;
        }
        function Jf(i) {
          return i = re(i), i && We.test(i) ? i.replace(ue, Vl) : i;
        }
        function Qf(i) {
          return i = re(i), i && Oa.test(i) ? i.replace(Yn, "\\$&") : i;
        }
        var ep = vi(function(i, n, o) {
          return i + (o ? "-" : "") + n.toLowerCase();
        }), tp = vi(function(i, n, o) {
          return i + (o ? " " : "") + n.toLowerCase();
        }), ip = Lo("toLowerCase");
        function np(i, n, o) {
          i = re(i), n = X(n);
          var l = n ? ci(i) : 0;
          if (!n || l >= n)
            return i;
          var c = (n - l) / 2;
          return En(dn(c), o) + i + En(cn(c), o);
        }
        function rp(i, n, o) {
          i = re(i), n = X(n);
          var l = n ? ci(i) : 0;
          return n && l < n ? i + En(n - l, o) : i;
        }
        function sp(i, n, o) {
          i = re(i), n = X(n);
          var l = n ? ci(i) : 0;
          return n && l < n ? En(n - l, o) + i : i;
        }
        function op(i, n, o) {
          return o || n == null ? n = 0 : n && (n = +n), dh(re(i).replace(Kn, ""), n || 0);
        }
        function ap(i, n, o) {
          return (o ? De(i, n, o) : n === t) ? n = 1 : n = X(n), Pr(re(i), n);
        }
        function lp() {
          var i = arguments, n = re(i[0]);
          return i.length < 3 ? n : n.replace(i[1], i[2]);
        }
        var hp = vi(function(i, n, o) {
          return i + (o ? "_" : "") + n.toLowerCase();
        });
        function up(i, n, o) {
          return o && typeof o != "number" && De(i, n, o) && (n = o = t), o = o === t ? Ce : o >>> 0, o ? (i = re(i), i && (typeof n == "string" || n != null && !qr(n)) && (n = Be(n), !n && ui(i)) ? Rt(ot(i), 0, o) : i.split(n, o)) : [];
        }
        var cp = vi(function(i, n, o) {
          return i + (o ? " " : "") + Jr(n);
        });
        function dp(i, n, o) {
          return i = re(i), o = o == null ? 0 : jt(X(o), 0, i.length), n = Be(n), i.slice(o, o + n.length) == n;
        }
        function fp(i, n, o) {
          var l = d.templateSettings;
          o && De(i, n, o) && (n = t), i = re(i), n = On({}, n, l, Wo);
          var c = On({}, n.imports, l.imports, Wo), f = we(c), g = hr(c, f), v, b, C = 0, A = n.interpolate || qi, T = "__p += '", I = cr(
            (n.escape || qi).source + "|" + A.source + "|" + (A === ss ? Na : qi).source + "|" + (n.evaluate || qi).source + "|$",
            "g"
          ), W = "//# sourceURL=" + (se.call(n, "sourceURL") ? (n.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++xl + "]") + `
`;
          i.replace(I, function(z, Z, ee, ze, Te, Ge) {
            return ee || (ee = ze), T += i.slice(C, Ge).replace(Ja, Bl), Z && (v = !0, T += `' +
__e(` + Z + `) +
'`), Te && (b = !0, T += `';
` + Te + `;
__p += '`), ee && (T += `' +
((__t = (` + ee + `)) == null ? '' : __t) +
'`), C = Ge + z.length, z;
          }), T += `';
`;
          var H = se.call(n, "variable") && n.variable;
          if (!H)
            T = `with (obj) {
` + T + `
}
`;
          else if (za.test(H))
            throw new G(p);
          T = (b ? T.replace(V, "") : T).replace(te, "$1").replace(ie, "$1;"), T = "function(" + (H || "obj") + `) {
` + (H ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (v ? ", __e = _.escape" : "") + (b ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + T + `return __p
}`;
          var Y = Ta(function() {
            return ne(f, W + "return " + T).apply(t, g);
          });
          if (Y.source = T, Kr(Y))
            throw Y;
          return Y;
        }
        function pp(i) {
          return re(i).toLowerCase();
        }
        function mp(i) {
          return re(i).toUpperCase();
        }
        function gp(i, n, o) {
          if (i = re(i), i && (o || n === t))
            return Ws(i);
          if (!i || !(n = Be(n)))
            return i;
          var l = ot(i), c = ot(n), f = Rs(l, c), g = Vs(l, c) + 1;
          return Rt(l, f, g).join("");
        }
        function _p(i, n, o) {
          if (i = re(i), i && (o || n === t))
            return i.slice(0, Hs(i) + 1);
          if (!i || !(n = Be(n)))
            return i;
          var l = ot(i), c = Vs(l, ot(n)) + 1;
          return Rt(l, 0, c).join("");
        }
        function vp(i, n, o) {
          if (i = re(i), i && (o || n === t))
            return i.replace(Kn, "");
          if (!i || !(n = Be(n)))
            return i;
          var l = ot(i), c = Rs(l, ot(n));
          return Rt(l, c).join("");
        }
        function yp(i, n) {
          var o = Vn, l = Bn;
          if (fe(n)) {
            var c = "separator" in n ? n.separator : c;
            o = "length" in n ? X(n.length) : o, l = "omission" in n ? Be(n.omission) : l;
          }
          i = re(i);
          var f = i.length;
          if (ui(i)) {
            var g = ot(i);
            f = g.length;
          }
          if (o >= f)
            return i;
          var v = o - ci(l);
          if (v < 1)
            return l;
          var b = g ? Rt(g, 0, v).join("") : i.slice(0, v);
          if (c === t)
            return b + l;
          if (g && (v += b.length - v), qr(c)) {
            if (i.slice(v).search(c)) {
              var C, A = b;
              for (c.global || (c = cr(c.source, re(os.exec(c)) + "g")), c.lastIndex = 0; C = c.exec(A); )
                var T = C.index;
              b = b.slice(0, T === t ? v : T);
            }
          } else if (i.indexOf(Be(c), v) != v) {
            var I = b.lastIndexOf(c);
            I > -1 && (b = b.slice(0, I));
          }
          return b + l;
        }
        function wp(i) {
          return i = re(i), i && be.test(i) ? i.replace(he, Kl) : i;
        }
        var xp = vi(function(i, n, o) {
          return i + (o ? " " : "") + n.toUpperCase();
        }), Jr = Lo("toUpperCase");
        function Da(i, n, o) {
          return i = re(i), n = o ? t : n, n === t ? zl(i) ? jl(i) : Il(i) : i.match(n) || [];
        }
        var Ta = K(function(i, n) {
          try {
            return Re(i, t, n);
          } catch (o) {
            return Kr(o) ? o : new G(o);
          }
        }), bp = bt(function(i, n) {
          return qe(n, function(o) {
            o = ft(o), wt(i, o, Xr(i[o], i));
          }), i;
        });
        function $p(i) {
          var n = i == null ? 0 : i.length, o = B();
          return i = n ? de(i, function(l) {
            if (typeof l[1] != "function")
              throw new Ze(u);
            return [o(l[0]), l[1]];
          }) : [], K(function(l) {
            for (var c = -1; ++c < n; ) {
              var f = i[c];
              if (Re(f[0], this, l))
                return Re(f[1], this, l);
            }
          });
        }
        function Sp(i) {
          return Kh(Je(i, M));
        }
        function Qr(i) {
          return function() {
            return i;
          };
        }
        function Ep(i, n) {
          return i == null || i !== i ? n : i;
        }
        var Pp = Fo(), Cp = Fo(!0);
        function Ue(i) {
          return i;
        }
        function es(i) {
          return lo(typeof i == "function" ? i : Je(i, M));
        }
        function Ap(i) {
          return uo(Je(i, M));
        }
        function Dp(i, n) {
          return co(i, Je(n, M));
        }
        var Tp = K(function(i, n) {
          return function(o) {
            return Fi(o, i, n);
          };
        }), Lp = K(function(i, n) {
          return function(o) {
            return Fi(i, o, n);
          };
        });
        function ts(i, n, o) {
          var l = we(n), c = vn(n, l);
          o == null && !(fe(n) && (c.length || !l.length)) && (o = n, n = i, i = this, c = vn(n, we(n)));
          var f = !(fe(o) && "chain" in o) || !!o.chain, g = St(i);
          return qe(c, function(v) {
            var b = n[v];
            i[v] = b, g && (i.prototype[v] = function() {
              var C = this.__chain__;
              if (f || C) {
                var A = i(this.__wrapped__), T = A.__actions__ = Fe(this.__actions__);
                return T.push({ func: b, args: arguments, thisArg: i }), A.__chain__ = C, A;
              }
              return b.apply(i, Ft([this.value()], arguments));
            });
          }), i;
        }
        function Mp() {
          return $e._ === this && ($e._ = nh), this;
        }
        function is() {
        }
        function Fp(i) {
          return i = X(i), K(function(n) {
            return fo(n, i);
          });
        }
        var Ip = Fr(de), kp = Fr(Fs), Up = Fr(rr);
        function La(i) {
          return Vr(i) ? sr(ft(i)) : cu(i);
        }
        function Op(i) {
          return function(n) {
            return i == null ? t : Jt(i, n);
          };
        }
        var Wp = ko(), Rp = ko(!0);
        function ns() {
          return [];
        }
        function rs() {
          return !1;
        }
        function Vp() {
          return {};
        }
        function Bp() {
          return "";
        }
        function Hp() {
          return !0;
        }
        function zp(i, n) {
          if (i = X(i), i < 1 || i > Oe)
            return [];
          var o = Ce, l = Ee(i, Ce);
          n = B(n), i -= Ce;
          for (var c = lr(l, n); ++o < i; )
            n(o);
          return c;
        }
        function Gp(i) {
          return N(i) ? de(i, ft) : He(i) ? [i] : Fe(jo(re(i)));
        }
        function Np(i) {
          var n = ++th;
          return re(i) + n;
        }
        var Xp = Sn(function(i, n) {
          return i + n;
        }, 0), Yp = Ir("ceil"), Kp = Sn(function(i, n) {
          return i / n;
        }, 1), qp = Ir("floor");
        function Zp(i) {
          return i && i.length ? _n(i, Ue, yr) : t;
        }
        function jp(i, n) {
          return i && i.length ? _n(i, B(n, 2), yr) : t;
        }
        function Jp(i) {
          return Us(i, Ue);
        }
        function Qp(i, n) {
          return Us(i, B(n, 2));
        }
        function em(i) {
          return i && i.length ? _n(i, Ue, $r) : t;
        }
        function tm(i, n) {
          return i && i.length ? _n(i, B(n, 2), $r) : t;
        }
        var im = Sn(function(i, n) {
          return i * n;
        }, 1), nm = Ir("round"), rm = Sn(function(i, n) {
          return i - n;
        }, 0);
        function sm(i) {
          return i && i.length ? ar(i, Ue) : 0;
        }
        function om(i, n) {
          return i && i.length ? ar(i, B(n, 2)) : 0;
        }
        return d.after = Cd, d.ary = la, d.assign = mf, d.assignIn = ba, d.assignInWith = On, d.assignWith = gf, d.at = _f, d.before = ha, d.bind = Xr, d.bindAll = bp, d.bindKey = ua, d.castArray = Rd, d.chain = sa, d.chunk = Ku, d.compact = qu, d.concat = Zu, d.cond = $p, d.conforms = Sp, d.constant = Qr, d.countBy = rd, d.create = vf, d.curry = ca, d.curryRight = da, d.debounce = fa, d.defaults = yf, d.defaultsDeep = wf, d.defer = Ad, d.delay = Dd, d.difference = ju, d.differenceBy = Ju, d.differenceWith = Qu, d.drop = ec, d.dropRight = tc, d.dropRightWhile = ic, d.dropWhile = nc, d.fill = rc, d.filter = od, d.flatMap = hd, d.flatMapDeep = ud, d.flatMapDepth = cd, d.flatten = ta, d.flattenDeep = sc, d.flattenDepth = oc, d.flip = Td, d.flow = Pp, d.flowRight = Cp, d.fromPairs = ac, d.functions = Cf, d.functionsIn = Af, d.groupBy = dd, d.initial = hc, d.intersection = uc, d.intersectionBy = cc, d.intersectionWith = dc, d.invert = Tf, d.invertBy = Lf, d.invokeMap = pd, d.iteratee = es, d.keyBy = md, d.keys = we, d.keysIn = ke, d.map = Ln, d.mapKeys = Ff, d.mapValues = If, d.matches = Ap, d.matchesProperty = Dp, d.memoize = Fn, d.merge = kf, d.mergeWith = $a, d.method = Tp, d.methodOf = Lp, d.mixin = ts, d.negate = In, d.nthArg = Fp, d.omit = Uf, d.omitBy = Of, d.once = Ld, d.orderBy = gd, d.over = Ip, d.overArgs = Md, d.overEvery = kp, d.overSome = Up, d.partial = Yr, d.partialRight = pa, d.partition = _d, d.pick = Wf, d.pickBy = Sa, d.property = La, d.propertyOf = Op, d.pull = gc, d.pullAll = na, d.pullAllBy = _c, d.pullAllWith = vc, d.pullAt = yc, d.range = Wp, d.rangeRight = Rp, d.rearg = Fd, d.reject = wd, d.remove = wc, d.rest = Id, d.reverse = Gr, d.sampleSize = bd, d.set = Vf, d.setWith = Bf, d.shuffle = $d, d.slice = xc, d.sortBy = Pd, d.sortedUniq = Ac, d.sortedUniqBy = Dc, d.split = up, d.spread = kd, d.tail = Tc, d.take = Lc, d.takeRight = Mc, d.takeRightWhile = Fc, d.takeWhile = Ic, d.tap = qc, d.throttle = Ud, d.thru = Tn, d.toArray = ya, d.toPairs = Ea, d.toPairsIn = Pa, d.toPath = Gp, d.toPlainObject = xa, d.transform = Hf, d.unary = Od, d.union = kc, d.unionBy = Uc, d.unionWith = Oc, d.uniq = Wc, d.uniqBy = Rc, d.uniqWith = Vc, d.unset = zf, d.unzip = Nr, d.unzipWith = ra, d.update = Gf, d.updateWith = Nf, d.values = xi, d.valuesIn = Xf, d.without = Bc, d.words = Da, d.wrap = Wd, d.xor = Hc, d.xorBy = zc, d.xorWith = Gc, d.zip = Nc, d.zipObject = Xc, d.zipObjectDeep = Yc, d.zipWith = Kc, d.entries = Ea, d.entriesIn = Pa, d.extend = ba, d.extendWith = On, ts(d, d), d.add = Xp, d.attempt = Ta, d.camelCase = Zf, d.capitalize = Ca, d.ceil = Yp, d.clamp = Yf, d.clone = Vd, d.cloneDeep = Hd, d.cloneDeepWith = zd, d.cloneWith = Bd, d.conformsTo = Gd, d.deburr = Aa, d.defaultTo = Ep, d.divide = Kp, d.endsWith = jf, d.eq = lt, d.escape = Jf, d.escapeRegExp = Qf, d.every = sd, d.find = ad, d.findIndex = Qo, d.findKey = xf, d.findLast = ld, d.findLastIndex = ea, d.findLastKey = bf, d.floor = qp, d.forEach = oa, d.forEachRight = aa, d.forIn = $f, d.forInRight = Sf, d.forOwn = Ef, d.forOwnRight = Pf, d.get = Zr, d.gt = Nd, d.gte = Xd, d.has = Df, d.hasIn = jr, d.head = ia, d.identity = Ue, d.includes = fd, d.indexOf = lc, d.inRange = Kf, d.invoke = Mf, d.isArguments = ti, d.isArray = N, d.isArrayBuffer = Yd, d.isArrayLike = Ie, d.isArrayLikeObject = ge, d.isBoolean = Kd, d.isBuffer = Vt, d.isDate = qd, d.isElement = Zd, d.isEmpty = jd, d.isEqual = Jd, d.isEqualWith = Qd, d.isError = Kr, d.isFinite = ef, d.isFunction = St, d.isInteger = ma, d.isLength = kn, d.isMap = ga, d.isMatch = tf, d.isMatchWith = nf, d.isNaN = rf, d.isNative = sf, d.isNil = af, d.isNull = of, d.isNumber = _a, d.isObject = fe, d.isObjectLike = me, d.isPlainObject = Ri, d.isRegExp = qr, d.isSafeInteger = lf, d.isSet = va, d.isString = Un, d.isSymbol = He, d.isTypedArray = wi, d.isUndefined = hf, d.isWeakMap = uf, d.isWeakSet = cf, d.join = fc, d.kebabCase = ep, d.last = et, d.lastIndexOf = pc, d.lowerCase = tp, d.lowerFirst = ip, d.lt = df, d.lte = ff, d.max = Zp, d.maxBy = jp, d.mean = Jp, d.meanBy = Qp, d.min = em, d.minBy = tm, d.stubArray = ns, d.stubFalse = rs, d.stubObject = Vp, d.stubString = Bp, d.stubTrue = Hp, d.multiply = im, d.nth = mc, d.noConflict = Mp, d.noop = is, d.now = Mn, d.pad = np, d.padEnd = rp, d.padStart = sp, d.parseInt = op, d.random = qf, d.reduce = vd, d.reduceRight = yd, d.repeat = ap, d.replace = lp, d.result = Rf, d.round = nm, d.runInContext = x, d.sample = xd, d.size = Sd, d.snakeCase = hp, d.some = Ed, d.sortedIndex = bc, d.sortedIndexBy = $c, d.sortedIndexOf = Sc, d.sortedLastIndex = Ec, d.sortedLastIndexBy = Pc, d.sortedLastIndexOf = Cc, d.startCase = cp, d.startsWith = dp, d.subtract = rm, d.sum = sm, d.sumBy = om, d.template = fp, d.times = zp, d.toFinite = Et, d.toInteger = X, d.toLength = wa, d.toLower = pp, d.toNumber = tt, d.toSafeInteger = pf, d.toString = re, d.toUpper = mp, d.trim = gp, d.trimEnd = _p, d.trimStart = vp, d.truncate = yp, d.unescape = wp, d.uniqueId = Np, d.upperCase = xp, d.upperFirst = Jr, d.each = oa, d.eachRight = aa, d.first = ia, ts(d, (function() {
          var i = {};
          return ct(d, function(n, o) {
            se.call(d.prototype, o) || (i[o] = n);
          }), i;
        })(), { chain: !1 }), d.VERSION = s, qe(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(i) {
          d[i].placeholder = d;
        }), qe(["drop", "take"], function(i, n) {
          J.prototype[i] = function(o) {
            o = o === t ? 1 : ye(X(o), 0);
            var l = this.__filtered__ && !n ? new J(this) : this.clone();
            return l.__filtered__ ? l.__takeCount__ = Ee(o, l.__takeCount__) : l.__views__.push({
              size: Ee(o, Ce),
              type: i + (l.__dir__ < 0 ? "Right" : "")
            }), l;
          }, J.prototype[i + "Right"] = function(o) {
            return this.reverse()[i](o).reverse();
          };
        }), qe(["filter", "map", "takeWhile"], function(i, n) {
          var o = n + 1, l = o == Bi || o == ii;
          J.prototype[i] = function(c) {
            var f = this.clone();
            return f.__iteratees__.push({
              iteratee: B(c, 3),
              type: o
            }), f.__filtered__ = f.__filtered__ || l, f;
          };
        }), qe(["head", "last"], function(i, n) {
          var o = "take" + (n ? "Right" : "");
          J.prototype[i] = function() {
            return this[o](1).value()[0];
          };
        }), qe(["initial", "tail"], function(i, n) {
          var o = "drop" + (n ? "" : "Right");
          J.prototype[i] = function() {
            return this.__filtered__ ? new J(this) : this[o](1);
          };
        }), J.prototype.compact = function() {
          return this.filter(Ue);
        }, J.prototype.find = function(i) {
          return this.filter(i).head();
        }, J.prototype.findLast = function(i) {
          return this.reverse().find(i);
        }, J.prototype.invokeMap = K(function(i, n) {
          return typeof i == "function" ? new J(this) : this.map(function(o) {
            return Fi(o, i, n);
          });
        }), J.prototype.reject = function(i) {
          return this.filter(In(B(i)));
        }, J.prototype.slice = function(i, n) {
          i = X(i);
          var o = this;
          return o.__filtered__ && (i > 0 || n < 0) ? new J(o) : (i < 0 ? o = o.takeRight(-i) : i && (o = o.drop(i)), n !== t && (n = X(n), o = n < 0 ? o.dropRight(-n) : o.take(n - i)), o);
        }, J.prototype.takeRightWhile = function(i) {
          return this.reverse().takeWhile(i).reverse();
        }, J.prototype.toArray = function() {
          return this.take(Ce);
        }, ct(J.prototype, function(i, n) {
          var o = /^(?:filter|find|map|reject)|While$/.test(n), l = /^(?:head|last)$/.test(n), c = d[l ? "take" + (n == "last" ? "Right" : "") : n], f = l || /^find/.test(n);
          c && (d.prototype[n] = function() {
            var g = this.__wrapped__, v = l ? [1] : arguments, b = g instanceof J, C = v[0], A = b || N(g), T = function(Z) {
              var ee = c.apply(d, Ft([Z], v));
              return l && I ? ee[0] : ee;
            };
            A && o && typeof C == "function" && C.length != 1 && (b = A = !1);
            var I = this.__chain__, W = !!this.__actions__.length, H = f && !I, Y = b && !W;
            if (!f && A) {
              g = Y ? g : new J(this);
              var z = i.apply(g, v);
              return z.__actions__.push({ func: Tn, args: [T], thisArg: t }), new je(z, I);
            }
            return H && Y ? i.apply(this, v) : (z = this.thru(T), H ? l ? z.value()[0] : z.value() : z);
          });
        }), qe(["pop", "push", "shift", "sort", "splice", "unshift"], function(i) {
          var n = tn[i], o = /^(?:push|sort|unshift)$/.test(i) ? "tap" : "thru", l = /^(?:pop|shift)$/.test(i);
          d.prototype[i] = function() {
            var c = arguments;
            if (l && !this.__chain__) {
              var f = this.value();
              return n.apply(N(f) ? f : [], c);
            }
            return this[o](function(g) {
              return n.apply(N(g) ? g : [], c);
            });
          };
        }), ct(J.prototype, function(i, n) {
          var o = d[n];
          if (o) {
            var l = o.name + "";
            se.call(mi, l) || (mi[l] = []), mi[l].push({ name: n, func: o });
          }
        }), mi[$n(t, it).name] = [{
          name: "wrapper",
          func: t
        }], J.prototype.clone = yh, J.prototype.reverse = wh, J.prototype.value = xh, d.prototype.at = Zc, d.prototype.chain = jc, d.prototype.commit = Jc, d.prototype.next = Qc, d.prototype.plant = td, d.prototype.reverse = id, d.prototype.toJSON = d.prototype.valueOf = d.prototype.value = nd, d.prototype.first = d.prototype.head, Pi && (d.prototype[Pi] = ed), d;
      }), di = Jl();
      Yt ? ((Yt.exports = di)._ = di, er._ = di) : $e._ = di;
    }).call(lodash);
  })(lodash$1, lodash$1.exports)), lodash$1.exports;
}
var lodashExports = requireLodash();
const _$1 = /* @__PURE__ */ getDefaultExportFromCjs(lodashExports);
_$1.pluck = _$1.map;
WebKitCSSMatrix.prototype.skew = function(r) {
  if (!r) return this;
  const e = r * Math.PI / 180, t = Math.tan(e), s = new WebKitCSSMatrix();
  return s.m12 = t, s.m21 = t, this.multiply(s);
};
WebKitCSSMatrix.prototype.point = function(r = {}) {
  const { x: e = 0, y: t = 0, z: s = 0 } = _$1.defaults(r, { x: 0, y: 0, z: 0 });
  let a = this.m14 * e + this.m24 * t + this.m34 * s + this.m44;
  return a ||= 1, {
    x: (this.m11 * e + this.m21 * t + this.m31 * s + this.m41) / a,
    y: (this.m12 * e + this.m22 * t + this.m32 * s + this.m42) / a,
    z: (this.m13 * e + this.m23 * t + this.m33 * s + this.m43) / a
  };
};
WebKitCSSMatrix.identity3d = () => new WebKitCSSMatrix("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
const Matrix = WebKitCSSMatrix;
var webfontloader = { exports: {} }, hasRequiredWebfontloader;
function requireWebfontloader() {
  return hasRequiredWebfontloader || (hasRequiredWebfontloader = 1, (function(r) {
    (function() {
      function e(m, w, D) {
        return m.call.apply(m.bind, arguments);
      }
      function t(m, w, D) {
        if (!m) throw Error();
        if (2 < arguments.length) {
          var P = Array.prototype.slice.call(arguments, 2);
          return function() {
            var F = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(F, P), m.apply(w, F);
          };
        }
        return function() {
          return m.apply(w, arguments);
        };
      }
      function s(m, w, D) {
        return s = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? e : t, s.apply(null, arguments);
      }
      var a = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function h(m, w) {
        this.a = m, this.o = w || m, this.c = this.o.document;
      }
      var u = !!window.FontFace;
      function p(m, w, D, P) {
        if (w = m.c.createElement(w), D) for (var F in D) D.hasOwnProperty(F) && (F == "style" ? w.style.cssText = D[F] : w.setAttribute(F, D[F]));
        return P && w.appendChild(m.c.createTextNode(P)), w;
      }
      function y(m, w, D) {
        m = m.c.getElementsByTagName(w)[0], m || (m = document.documentElement), m.insertBefore(D, m.lastChild);
      }
      function S(m) {
        m.parentNode && m.parentNode.removeChild(m);
      }
      function L(m, w, D) {
        w = w || [], D = D || [];
        for (var P = m.className.split(/\s+/), F = 0; F < w.length; F += 1) {
          for (var O = !1, V = 0; V < P.length; V += 1) if (w[F] === P[V]) {
            O = !0;
            break;
          }
          O || P.push(w[F]);
        }
        for (w = [], F = 0; F < P.length; F += 1) {
          for (O = !1, V = 0; V < D.length; V += 1) if (P[F] === D[V]) {
            O = !0;
            break;
          }
          O || w.push(P[F]);
        }
        m.className = w.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function M(m, w) {
        for (var D = m.className.split(/\s+/), P = 0, F = D.length; P < F; P++) if (D[P] == w) return !0;
        return !1;
      }
      function R(m) {
        return m.o.location.hostname || m.a.location.hostname;
      }
      function k(m, w, D) {
        function P() {
          te && F && O && (te(V), te = null);
        }
        w = p(m, "link", { rel: "stylesheet", href: w, media: "all" });
        var F = !1, O = !0, V = null, te = D || null;
        u ? (w.onload = function() {
          F = !0, P();
        }, w.onerror = function() {
          F = !0, V = Error("Stylesheet failed to load"), P();
        }) : setTimeout(function() {
          F = !0, P();
        }, 0), y(m, "head", w);
      }
      function q(m, w, D, P) {
        var F = m.c.getElementsByTagName("head")[0];
        if (F) {
          var O = p(m, "script", { src: w }), V = !1;
          return O.onload = O.onreadystatechange = function() {
            V || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (V = !0, D && D(null), O.onload = O.onreadystatechange = null, O.parentNode.tagName == "HEAD" && F.removeChild(O));
          }, F.appendChild(O), setTimeout(function() {
            V || (V = !0, D && D(Error("Script load timeout")));
          }, P || 5e3), O;
        }
        return null;
      }
      function le() {
        this.a = 0, this.c = null;
      }
      function j(m) {
        return m.a++, function() {
          m.a--, nt(m);
        };
      }
      function it(m, w) {
        m.c = w, nt(m);
      }
      function nt(m) {
        m.a == 0 && m.c && (m.c(), m.c = null);
      }
      function Ne(m) {
        this.a = m || "-";
      }
      Ne.prototype.c = function(m) {
        for (var w = [], D = 0; D < arguments.length; D++) w.push(arguments[D].replace(/[\W_]+/g, "").toLowerCase());
        return w.join(this.a);
      };
      function xe(m, w) {
        this.c = m, this.f = 4, this.a = "n";
        var D = (w || "n4").match(/^([nio])([1-9])$/i);
        D && (this.a = D[1], this.f = parseInt(D[2], 10));
      }
      function rt(m) {
        return At(m) + " " + (m.f + "00") + " 300px " + Ct(m.c);
      }
      function Ct(m) {
        var w = [];
        m = m.split(/,\s*/);
        for (var D = 0; D < m.length; D++) {
          var P = m[D].replace(/['"]/g, "");
          P.indexOf(" ") != -1 || /^\d/.test(P) ? w.push("'" + P + "'") : w.push(P);
        }
        return w.join(",");
      }
      function pe(m) {
        return m.a + m.f;
      }
      function At(m) {
        var w = "normal";
        return m.a === "o" ? w = "oblique" : m.a === "i" && (w = "italic"), w;
      }
      function bi(m) {
        var w = 4, D = "n", P = null;
        return m && ((P = m.match(/(normal|oblique|italic)/i)) && P[1] && (D = P[1].substr(0, 1).toLowerCase()), (P = m.match(/([1-9]00|normal|bold)/i)) && P[1] && (/bold/i.test(P[1]) ? w = 7 : /[1-9]00/.test(P[1]) && (w = parseInt(P[1].substr(0, 1), 10)))), D + w;
      }
      function Vn(m, w) {
        this.c = m, this.f = m.o.document.documentElement, this.h = w, this.a = new Ne("-"), this.j = w.events !== !1, this.g = w.classes !== !1;
      }
      function Bn(m) {
        m.g && L(m.f, [m.a.c("wf", "loading")]), Dt(m, "loading");
      }
      function Vi(m) {
        if (m.g) {
          var w = M(m.f, m.a.c("wf", "active")), D = [], P = [m.a.c("wf", "loading")];
          w || D.push(m.a.c("wf", "inactive")), L(m.f, D, P);
        }
        Dt(m, "inactive");
      }
      function Dt(m, w, D) {
        m.j && m.h[w] && (D ? m.h[w](D.c, pe(D)) : m.h[w]());
      }
      function Bi() {
        this.c = {};
      }
      function Hn(m, w, D) {
        var P = [], F;
        for (F in w) if (w.hasOwnProperty(F)) {
          var O = m.c[F];
          O && P.push(O(w[F], D));
        }
        return P;
      }
      function ii(m, w) {
        this.c = m, this.f = w, this.a = p(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function Xe(m) {
        y(m.c, "body", m.a);
      }
      function Oe(m) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + Ct(m.c) + ";" + ("font-style:" + At(m) + ";font-weight:" + (m.f + "00") + ";");
      }
      function Hi(m, w, D, P, F, O) {
        this.g = m, this.j = w, this.a = P, this.c = D, this.f = F || 3e3, this.h = O || void 0;
      }
      Hi.prototype.start = function() {
        var m = this.c.o.document, w = this, D = a(), P = new Promise(function(V, te) {
          function ie() {
            a() - D >= w.f ? te() : m.fonts.load(rt(w.a), w.h).then(function(he) {
              1 <= he.length ? V() : setTimeout(ie, 25);
            }, function() {
              te();
            });
          }
          ie();
        }), F = null, O = new Promise(function(V, te) {
          F = setTimeout(te, w.f);
        });
        Promise.race([O, P]).then(function() {
          F && (clearTimeout(F), F = null), w.g(w.a);
        }, function() {
          w.j(w.a);
        });
      };
      function Bt(m, w, D, P, F, O, V) {
        this.v = m, this.B = w, this.c = D, this.a = P, this.s = V || "BESbswy", this.f = {}, this.w = F || 3e3, this.u = O || null, this.m = this.j = this.h = this.g = null, this.g = new ii(this.c, this.s), this.h = new ii(this.c, this.s), this.j = new ii(this.c, this.s), this.m = new ii(this.c, this.s), m = new xe(this.a.c + ",serif", pe(this.a)), m = Oe(m), this.g.a.style.cssText = m, m = new xe(this.a.c + ",sans-serif", pe(this.a)), m = Oe(m), this.h.a.style.cssText = m, m = new xe("serif", pe(this.a)), m = Oe(m), this.j.a.style.cssText = m, m = new xe("sans-serif", pe(this.a)), m = Oe(m), this.m.a.style.cssText = m, Xe(this.g), Xe(this.h), Xe(this.j), Xe(this.m);
      }
      var Ce = { D: "serif", C: "sans-serif" }, $i = null;
      function zi() {
        if ($i === null) {
          var m = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          $i = !!m && (536 > parseInt(m[1], 10) || parseInt(m[1], 10) === 536 && 11 >= parseInt(m[2], 10));
        }
        return $i;
      }
      Bt.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = a(), mt(this);
      };
      function Gi(m, w, D) {
        for (var P in Ce) if (Ce.hasOwnProperty(P) && w === m.f[Ce[P]] && D === m.f[Ce[P]]) return !0;
        return !1;
      }
      function mt(m) {
        var w = m.g.a.offsetWidth, D = m.h.a.offsetWidth, P;
        (P = w === m.f.serif && D === m.f["sans-serif"]) || (P = zi() && Gi(m, w, D)), P ? a() - m.A >= m.w ? zi() && Gi(m, w, D) && (m.u === null || m.u.hasOwnProperty(m.a.c)) ? Si(m, m.v) : Si(m, m.B) : ni(m) : Si(m, m.v);
      }
      function ni(m) {
        setTimeout(s(function() {
          mt(this);
        }, m), 50);
      }
      function Si(m, w) {
        setTimeout(s(function() {
          S(this.g.a), S(this.h.a), S(this.j.a), S(this.m.a), w(this.a);
        }, m), 0);
      }
      function gt(m, w, D) {
        this.c = m, this.a = w, this.f = 0, this.m = this.j = !1, this.s = D;
      }
      var ut = null;
      gt.prototype.g = function(m) {
        var w = this.a;
        w.g && L(w.f, [w.a.c("wf", m.c, pe(m).toString(), "active")], [w.a.c("wf", m.c, pe(m).toString(), "loading"), w.a.c("wf", m.c, pe(m).toString(), "inactive")]), Dt(w, "fontactive", m), this.m = !0, Ni(this);
      }, gt.prototype.h = function(m) {
        var w = this.a;
        if (w.g) {
          var D = M(w.f, w.a.c("wf", m.c, pe(m).toString(), "active")), P = [], F = [w.a.c("wf", m.c, pe(m).toString(), "loading")];
          D || P.push(w.a.c("wf", m.c, pe(m).toString(), "inactive")), L(w.f, P, F);
        }
        Dt(w, "fontinactive", m), Ni(this);
      };
      function Ni(m) {
        --m.f == 0 && m.j && (m.m ? (m = m.a, m.g && L(m.f, [m.a.c("wf", "active")], [m.a.c("wf", "loading"), m.a.c("wf", "inactive")]), Dt(m, "active")) : Vi(m.a));
      }
      function Ht(m) {
        this.j = m, this.a = new Bi(), this.h = 0, this.f = this.g = !0;
      }
      Ht.prototype.load = function(m) {
        this.c = new h(this.j, m.context || this.j), this.g = m.events !== !1, this.f = m.classes !== !1, Xi(this, new Vn(this.c, m), m);
      };
      function ri(m, w, D, P, F) {
        var O = --m.h == 0;
        (m.f || m.g) && setTimeout(function() {
          var V = F || null, te = P || null || {};
          if (D.length === 0 && O) Vi(w.a);
          else {
            w.f += D.length, O && (w.j = O);
            var ie, he = [];
            for (ie = 0; ie < D.length; ie++) {
              var ue = D[ie], be = te[ue.c], We = w.a, Lt = ue;
              if (We.g && L(We.f, [We.a.c("wf", Lt.c, pe(Lt).toString(), "loading")]), Dt(We, "fontloading", Lt), We = null, ut === null) if (window.FontFace) {
                var Lt = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Xn = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                ut = Lt ? 42 < parseInt(Lt[1], 10) : !Xn;
              } else ut = !1;
              ut ? We = new Hi(s(w.g, w), s(w.h, w), w.c, ue, w.s, be) : We = new Bt(s(w.g, w), s(w.h, w), w.c, ue, w.s, V, be), he.push(We);
            }
            for (ie = 0; ie < he.length; ie++) he[ie].start();
          }
        }, 0);
      }
      function Xi(m, w, D) {
        var F = [], P = D.timeout;
        Bn(w);
        var F = Hn(m.a, D, m.c), O = new gt(m.c, w, P);
        for (m.h = F.length, w = 0, D = F.length; w < D; w++) F[w].load(function(V, te, ie) {
          ri(m, O, V, te, ie);
        });
      }
      function Le(m, w) {
        this.c = m, this.a = w;
      }
      Le.prototype.load = function(m) {
        function w() {
          if (O["__mti_fntLst" + P]) {
            var V = O["__mti_fntLst" + P](), te = [], ie;
            if (V) for (var he = 0; he < V.length; he++) {
              var ue = V[he].fontfamily;
              V[he].fontStyle != null && V[he].fontWeight != null ? (ie = V[he].fontStyle + V[he].fontWeight, te.push(new xe(ue, ie))) : te.push(new xe(ue));
            }
            m(te);
          } else setTimeout(function() {
            w();
          }, 50);
        }
        var D = this, P = D.a.projectId, F = D.a.version;
        if (P) {
          var O = D.c.o;
          q(this.c, (D.a.api || "https://fast.fonts.net/jsapi") + "/" + P + ".js" + (F ? "?v=" + F : ""), function(V) {
            V ? m([]) : (O["__MonotypeConfiguration__" + P] = function() {
              return D.a;
            }, w());
          }).id = "__MonotypeAPIScript__" + P;
        } else m([]);
      };
      function Tt(m, w) {
        this.c = m, this.a = w;
      }
      Tt.prototype.load = function(m) {
        var w, D, P = this.a.urls || [], F = this.a.families || [], O = this.a.testStrings || {}, V = new le();
        for (w = 0, D = P.length; w < D; w++) k(this.c, P[w], j(V));
        var te = [];
        for (w = 0, D = F.length; w < D; w++) if (P = F[w].split(":"), P[1]) for (var ie = P[1].split(","), he = 0; he < ie.length; he += 1) te.push(new xe(P[0], ie[he]));
        else te.push(new xe(P[0]));
        it(V, function() {
          m(te, O);
        });
      };
      function zn(m, w) {
        m ? this.c = m : this.c = st, this.a = [], this.f = [], this.g = w || "";
      }
      var st = "https://fonts.googleapis.com/css";
      function Yi(m, w) {
        for (var D = w.length, P = 0; P < D; P++) {
          var F = w[P].split(":");
          F.length == 3 && m.f.push(F.pop());
          var O = "";
          F.length == 2 && F[1] != "" && (O = ":"), m.a.push(F.join(O));
        }
      }
      function Gn(m) {
        if (m.a.length == 0) throw Error("No fonts to load!");
        if (m.c.indexOf("kit=") != -1) return m.c;
        for (var w = m.a.length, D = [], P = 0; P < w; P++) D.push(m.a[P].replace(/ /g, "+"));
        return w = m.c + "?family=" + D.join("%7C"), 0 < m.f.length && (w += "&subset=" + m.f.join(",")), 0 < m.g.length && (w += "&text=" + encodeURIComponent(m.g)), w;
      }
      function zt(m) {
        this.f = m, this.a = [], this.c = {};
      }
      var Me = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, Gt = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, si = { i: "i", italic: "i", n: "n", normal: "n" }, Nn = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function Nt(m) {
        for (var w = m.f.length, D = 0; D < w; D++) {
          var P = m.f[D].split(":"), F = P[0].replace(/\+/g, " "), O = ["n4"];
          if (2 <= P.length) {
            var V, te = P[1];
            if (V = [], te) for (var te = te.split(","), ie = te.length, he = 0; he < ie; he++) {
              var ue;
              if (ue = te[he], ue.match(/^[\w-]+$/)) {
                var be = Nn.exec(ue.toLowerCase());
                if (be == null) ue = "";
                else {
                  if (ue = be[2], ue = ue == null || ue == "" ? "n" : si[ue], be = be[1], be == null || be == "") be = "4";
                  else var We = Gt[be], be = We || (isNaN(be) ? "4" : be.substr(0, 1));
                  ue = [ue, be].join("");
                }
              } else ue = "";
              ue && V.push(ue);
            }
            0 < V.length && (O = V), P.length == 3 && (P = P[2], V = [], P = P ? P.split(",") : V, 0 < P.length && (P = Me[P[0]]) && (m.c[F] = P));
          }
          for (m.c[F] || (P = Me[F]) && (m.c[F] = P), P = 0; P < O.length; P += 1) m.a.push(new xe(F, O[P]));
        }
      }
      function Ki(m, w) {
        this.c = m, this.a = w;
      }
      var Xt = { Arimo: !0, Cousine: !0, Tinos: !0 };
      Ki.prototype.load = function(m) {
        var w = new le(), D = this.c, P = new zn(this.a.api, this.a.text), F = this.a.families;
        Yi(P, F);
        var O = new zt(F);
        Nt(O), k(D, Gn(P), j(w)), it(w, function() {
          m(O.a, O.c, Xt);
        });
      };
      function _t(m, w) {
        this.c = m, this.a = w;
      }
      _t.prototype.load = function(m) {
        var w = this.a.id, D = this.c.o;
        w ? q(this.c, (this.a.api || "https://use.typekit.net") + "/" + w + ".js", function(P) {
          if (P) m([]);
          else if (D.Typekit && D.Typekit.config && D.Typekit.config.fn) {
            P = D.Typekit.config.fn;
            for (var F = [], O = 0; O < P.length; O += 2) for (var V = P[O], te = P[O + 1], ie = 0; ie < te.length; ie++) F.push(new xe(V, te[ie]));
            try {
              D.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            m(F);
          }
        }, 2e3) : m([]);
      };
      function oi(m, w) {
        this.c = m, this.f = w, this.a = [];
      }
      oi.prototype.load = function(m) {
        var w = this.f.id, D = this.c.o, P = this;
        w ? (D.__webfontfontdeckmodule__ || (D.__webfontfontdeckmodule__ = {}), D.__webfontfontdeckmodule__[w] = function(F, O) {
          for (var V = 0, te = O.fonts.length; V < te; ++V) {
            var ie = O.fonts[V];
            P.a.push(new xe(ie.name, bi("font-weight:" + ie.weight + ";font-style:" + ie.style)));
          }
          m(P.a);
        }, q(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + R(this.c) + "/" + w + ".js", function(F) {
          F && m([]);
        })) : m([]);
      };
      var Ye = new Ht(window);
      Ye.a.c.custom = function(m, w) {
        return new Tt(w, m);
      }, Ye.a.c.fontdeck = function(m, w) {
        return new oi(w, m);
      }, Ye.a.c.monotype = function(m, w) {
        return new Le(w, m);
      }, Ye.a.c.typekit = function(m, w) {
        return new _t(w, m);
      }, Ye.a.c.google = function(m, w) {
        return new Ki(w, m);
      };
      var ai = { load: s(Ye.load, Ye) };
      r.exports ? r.exports = ai : (window.WebFont = ai, window.WebFontConfig && Ye.load(window.WebFontConfig));
    })();
  })(webfontloader)), webfontloader.exports;
}
var webfontloaderExports = requireWebfontloader();
const WebFont = /* @__PURE__ */ getDefaultExportFromCjs(webfontloaderExports), Utils$2 = {
  reset: () => Framer.CurrentContext.reset(),
  getValue: (r) => _$1.isFunction(r) ? r() : r,
  getValueForKeyPath: (r, e) => e.includes(".") ? e.split(".").reduce((t, s) => t?.[s], r) : r[e],
  setValueForKeyPath: (r, e, t) => {
    const s = e.split(".");
    let a = r;
    for (let h = 0; h < s.length && a !== void 0; h++) {
      const u = s[h];
      if (h === s.length - 1) {
        const p = a[u];
        _$1.isObject(p) && _$1.isObject(t) && Object.getPrototypeOf(p) === Object.prototype && Object.getPrototypeOf(t) === Object.prototype ? _$1.extend(p, t) : a[u] = t;
      } else
        (typeof a[u] > "u" || !_$1.isObject(a[u])) && (a[u] = {}), a = a[u];
    }
  },
  escapeForRegex: (r) => r.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  valueOrDefault: (r, e) => ([void 0, null].includes(r) && (r = e), r),
  arrayNext: (r, e) => r[r.indexOf(e) + 1] || _$1.head(r),
  arrayPrev: (r, e) => r[r.indexOf(e) - 1] || _$1.last(r),
  webkitPerspectiveForValue: (r) => ["none", null, 0].includes(r) ? "none" : _$1.isNumber(r) ? r : null,
  sum: (r) => _$1.reduce(r, (e, t) => e + t),
  average: (r) => r.length ? Utils$2.sum(r) / r.length : 0,
  mean: (r) => r.length ? Utils$2.sum(r) / r.length : 0,
  median: (r) => {
    if (!r.length) return null;
    const e = [...r].sort((s, a) => s - a), t = Math.floor(e.length / 2);
    return e.length % 2 ? e[t] : (e[t - 1] + e[t]) / 2;
  },
  nearestIncrement: (r, e) => e ? Math.round(r * (1 / e)) / (1 / e) : r,
  delay: function(r, e) {
    const t = setTimeout(e, r * 1e3);
    return Framer.CurrentContext.addTimer(t), t;
  },
  interval: function(r, e) {
    const t = setInterval(e, r * 1e3);
    return Framer.CurrentContext.addInterval(t), t;
  },
  debounce: function(r, e, t) {
    r == null && (r = 0.1);
    let s = null;
    return r *= 1e3, function(...a) {
      const h = this, u = function() {
        return t || e.apply(h, a), s = null;
      };
      return s ? clearTimeout(s) : t && e.apply(h, a), s = setTimeout(u, r);
    };
  },
  throttle: function(r, e) {
    if (r === 0) return e;
    r *= 1e3;
    let t = !1;
    return function(...s) {
      if (!t)
        return t = !0, r !== -1 && setTimeout(() => t = !1, r), e(...s);
    };
  },
  memoize: (r) => function(...e) {
    let t = "", s = e.length, a = null;
    for (; s--; )
      a = e[s], t += a === Object(a) ? JSON.stringify(a) : a, r.memoize || (r.memoize = {});
    return t in r.memoize ? r.memoize[t] : r.memoize[t] = r.apply(this, e);
  },
  randomColor: function(r = 1) {
    return Color.random(r);
  },
  randomChoice: (r) => r[Math.floor(Math.random() * r.length)],
  randomNumber: function(r = 0, e = 1) {
    return Utils$2.mapRange(Math.random(), 0, 1, r, e);
  },
  randomImage: function(r) {
    _$1.isNumber(r) && (r = { id: r });
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
    let t = Utils$2.randomChoice(e);
    r?.id != null && (t = e[r.id % e.length]);
    const s = 100;
    let a = 1024;
    return r && (a = Math.max(r.width, r.height), a = Math.ceil(a / s) * s, a < s && (a = s), a = Utils$2.devicePixelRatio() * a, a = parseInt(a, 10)), `https://images.unsplash.com/photo-${t}?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=${a}&h=${a}&fit=max`;
  },
  defineEnum: function(r = [], e = 0, t = 0) {
    const s = {};
    for (let a = 0; a < r.length; a++) {
      const h = r[a];
      let u = a;
      u = e ? u + e : u, u = t ? Math.pow(t, u) : u, s[s[h] = u] = h;
    }
    return s;
  },
  labelLayer: function(r, e, t = {}) {
    if (!e || typeof e != "string") return;
    const s = Math.max(Math.min(48, parseInt(r.height / 3.2)), 14);
    t = _$1.extend(
      {
        font: `${s}px/1em ${Utils$2.deviceFont()}`,
        lineHeight: `${r.height}px`,
        textAlign: "center",
        color: "#fff"
      },
      t
    ), r.style = t, r.html = e;
  },
  stringify: function(r) {
    try {
      if (_$1.isObject(r)) return JSON.stringify(r);
    } catch {
    }
    return r === null ? "null" : r === void 0 ? "undefined" : r.toString ? r.toString() : r;
  },
  inspectObjectType: function(r) {
    let e;
    if ((r.constructor != null ? r.constructor.name : void 0) != null && (r.constructor != null ? r.constructor.name : void 0) !== "Object")
      return r.constructor.name;
    const t = function(s) {
      if (!s)
        return null;
      const h = /\[object (\w+)\]/.exec(s);
      return h ? h[1] : null;
    };
    return r.toString && (e = t(r.toString()), e) ? e : r.constructor != null && r.constructor.toString && (e = t(
      r.constructor != null ? r.constructor.toString() : void 0
    ), e) ? e.replace("Constructor", "") : "Object";
  },
  inspect: function(r, e, t) {
    if (e == null && (e = 5), t == null && (t = 0), r === null)
      return "null";
    if (r === void 0)
      return "undefined";
    if (_$1.isFunction(r.toInspect))
      return r.toInspect();
    if (_$1.isString(r))
      return `"${r}"`;
    if (_$1.isNumber(r))
      return `${r}`;
    if (_$1.isFunction(r)) {
      let s = r.toString().slice(9).replace(/\n/g, "").replace(/\s+/g, " ");
      const a = 50;
      return s.length > a && t > 0 && (s = `${_$1.trimEnd(s.slice(0, +a + 1))}… }`), `<Function ${s}>`;
    }
    if (_$1.isArray(r))
      return t > e ? "[...]" : "[" + _$1.map(r, (s) => Utils$2.inspect(s, e, t + 1)).join(", ") + "]";
    if (_$1.isObject(r)) {
      let s;
      const a = Utils$2.inspectObjectType(r);
      return /HTML\w+?Element/.test(a) ? `<${a}>` : (t > e ? s = "{...}" : s = "{" + _$1.map(r, (h, u) => `${u}:${Utils$2.inspect(h, e, t + 1)}`).join(
        ", "
      ) + "}", a === "Object" ? s : `<${a} ${s}>`);
    }
    return `${r}`;
  },
  uuid: function() {
    const r = "0123456789abcdefghijklmnopqrstuvwxyz".split(""), e = new Array(36);
    let t = 0;
    for (let a = 1; a <= 32; a++) {
      t <= 2 && (t = 33554432 + Math.random() * 16777216 | 0);
      var s = t & 15;
      t = t >> 4, e[a] = r[a === 19 ? s & 3 | 8 : s];
    }
    return e.join("");
  },
  findLayer: (r, e) => _$1.find(r, (t) => Utils$2.layerMatchesSelector(t, e)),
  filterLayers: (r, e) => _$1.filter(r, (t) => Utils$2.layerMatchesSelector(t, e)),
  layerMatchesSelector: (r, e) => {
    const t = (a) => _$1.pluck(a.ancestors().reverse(), "name").join(">") + `>${r.name}`, s = (a, h) => {
      h = h.replace(/\s*>\s*/g, ">"), h = h.split("*").join("[^>]*"), h = h.split(" ").join("(?:.*)>"), h = h.split(",").join("$|");
      const u = "(^|>)" + h + "$";
      return new RegExp(u).test(a);
    };
    if (e) {
      const a = t(r);
      return s(a, e);
    }
  },
  arrayFromArguments: (r) => _$1.isArray(r[0]) ? r[0] : Array.from(r),
  cycle: (...r) => {
    let e = -1;
    return () => (e++, e >= r.length && (e = 0), r[e]);
  },
  toggle: (...r) => Utils$2.cycle(...r),
  callAfterCount: (r, e) => {
    let t = 0;
    return () => {
      if (t += 1, t === r)
        return typeof e == "function" ? e() : void 0;
    };
  },
  equal: (r, e) => _$1.isFunction(r?.isEqual) ? r.isEqual(e) : _$1.isFunction(e?.isEqual) ? e.isEqual(r) : _$1.isEqual(r, e),
  isWebKit: () => window.WebKitCSSMatrix !== void 0 && !Utils$2.isEdge(),
  webkitVersion: () => {
    let r = -1;
    const t = /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);
    return t && (r = parseFloat(t[1])), r;
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
  isDesktop: () => Utils$2.deviceType() === "desktop",
  isPhone: () => Utils$2.deviceType() === "phone",
  isTablet: () => Utils$2.deviceType() === "tablet",
  isMobile: () => Utils$2.isPhone() || Utils$2.isTablet(),
  isFileUrl: (r) => _$1.startsWith(r, "file://"),
  isDataUrl: (r) => _$1.startsWith(r, "data:"),
  isRelativeUrl: (r) => !/^([a-zA-Z]{1,8}:\/\/).*$/.test(r),
  isLocalServerUrl: (r) => /[a-zA-Z]{1,8}:\/\/127\.0\.0\.1/.test(r) || /[a-zA-Z]{1,8}:\/\/localhost/.test(r),
  isLocalUrl: (r) => Utils$2.isFileUrl(r) || Utils$2.isLocalServerUrl(r),
  isLocalAssetUrl: (r, e = window.location.href) => Utils$2.isDataUrl(r) ? !1 : !!(Utils$2.isLocalUrl(r) || Utils$2.isRelativeUrl(r) && Utils$2.isLocalUrl(e)),
  isFramerStudio: () => navigator.userAgent.includes("FramerStudio"),
  framerStudioVersion: () => {
    if (Utils$2.isFramerStudio()) {
      const r = navigator.userAgent.includes("FramerStudio/beta"), e = navigator.userAgent.includes("FramerStudio/local"), t = navigator.userAgent.includes("FramerStudio/future");
      if (r || e || t) return Number.MAX_VALUE;
      const s = navigator.userAgent.match(/\d+$/), a = s && s.length > 0 ? parseInt(s[0]) : void 0;
      if (_$1.isNumber(a)) return a;
    }
    return Number.MAX_VALUE;
  },
  devicePixelRatio: () => window.devicePixelRatio,
  isJP2Supported: () => Utils$2.isWebKit() && !Utils$2.isChrome() && !Utils$2.isFirefox(),
  isWebPSupported: () => Utils$2.isChrome(),
  deviceType: () => /(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent) ? "tablet" : /(mobi)/i.test(navigator.userAgent) ? "phone" : "desktop",
  pathJoin: (...r) => r.join("/"),
  deviceFont: (r) => {
    r || (Utils$2.isMacOS() && (r = "macOS"), Utils$2.isIOS() && (r = "iOS"), Utils$2.isAndroid() && (r = "Android"), Utils$2.isWindows() && (r = "Windows"));
    const e = "-apple-system, BlinkMacSystemFont, SF UI Text, Helvetica Neue", t = "Roboto, Helvetica Neue", s = "Segoe UI, Helvetica Neue";
    switch (r) {
      case "Android":
        return t;
      case "iOS":
      case "watchOS":
      case "macOS":
        return e;
      case "Windows":
        return s;
      default:
        return e;
    }
  },
  isFontAvailable: (r) => _isFontLoadedResults[r] === !0 ? !0 : (monoWidth == null && (monoWidth = getWidth("monospace")), serifWidth == null && (serifWidth = getWidth("serif")), sansWidth == null && (sansWidth = getWidth("sans-serif")), monoWidth !== getWidth(`${r},monospace`) || serifWidth !== getWidth(`${r},serif`) || sansWidth !== getWidth(`${r},sans-serif`) ? (_isFontLoadedResults[r] = !0, !0) : !1),
  isFontFamilyLoaded: (r, e = 1e3) => {
    _$1.isArray(r) || (r = [r]);
    const t = r.filter(
      (s) => !Utils$2.isFontAvailable(s)
    );
    return t.length === 0 ? !0 : Utils$2.loadWebFontConfig({
      custom: {
        families: t
      },
      timeout: e
    });
  },
  textSize: (r, e = {}, t = {}) => {
    const s = !_textSizeNode;
    s && (_textSizeNode = document.createElement("div"), _textSizeNode.id = "_textSizeNode"), _textSizeNode.removeAttribute("style"), _textSizeNode.innerHTML = r, e = _$1.extend(_$1.clone(e), {
      position: "fixed",
      display: "inline",
      visibility: "hidden",
      top: "-10000px",
      left: "-10000px"
    }), delete e.width, delete e.height, delete e.bottom, delete e.right, t.max ? (t.width && (e.maxWidth = `${t.width}px`), t.height && (e.maxHeight = `${t.height}px`)) : (t.width && (e.width = `${t.width}px`), t.height && (e.height = `${t.height}px`)), _$1.extend(_textSizeNode.style, e), s && (document.body ? document.body.appendChild(_textSizeNode) : (document.write(_textSizeNode.outerHTML), _textSizeNode = document.getElementById("_textSizeNode")));
    const a = _textSizeNode.getBoundingClientRect();
    return {
      width: a.right - a.left,
      height: a.bottom - a.top
    };
  },
  loadWebFontConfig: (r) => {
    const e = fontsFromConfig(r);
    let t = null;
    for (const p of e) {
      const y = _isFontLoadedResults[p];
      if (y == null) {
        t = null;
        break;
      }
      t = (t === null || t) && y;
    }
    if (t != null) return t;
    const {
      active: s,
      inactive: a,
      fontactive: h,
      fontinactive: u
    } = r;
    return new Promise((p, y) => {
      r.fontactive = (S) => {
        _isFontLoadedResults[S] = !0, typeof h == "function" && h(S), e.length === 1 && p();
      }, r.fontinactive = (S) => {
        console.warn(`Tried to load unavailable font: '${S}'`), _isFontLoadedResults[S] = !1, typeof u == "function" && u(S), e.length === 1 && y(new Error(`${S} failed to load`));
      }, r.active = () => {
        typeof s == "function" && s(), p();
      }, r.inactive = () => {
        typeof a == "function" && a(), y(new Error(`${e.join(", ")} failed to load`));
      }, WebFont.load(r);
    });
  },
  loadWebFont: (r, e, t = "google") => {
    if (_isFontLoadedResults[r] == null || _isFontLoadedResults[r] === !1) {
      delete _isFontLoadedResults[r];
      const s = {};
      if (t === "google") {
        let a = r;
        e != null && (a += `:${e}`), s.google = { families: [a] };
      }
      Utils$2.loadWebFontConfig(s);
    }
    return { fontFamily: r, fontWeight: e };
  },
  //#####################################################
  // MATH FUNCTIONS
  round: (r, e = 0, t = null, s = null, a = null) => {
    const h = Math.pow(10, e);
    return t && (r = Math.round(r / t) * t), r = Math.round(r * h) / h, s != null && r < s && (r = s), a != null && r > a && (r = a), r;
  },
  roundWhole: (r, e = 1) => parseInt(r) === r ? parseInt(r) : Utils$2.round(r, e),
  clamp: (r, e, t) => {
    const s = Math.min(e, t), a = Math.max(e, t);
    return Math.min(Math.max(r, s), a);
  },
  mapRange: (r, e, t, s, a) => s + (r - e) / (t - e) * (a - s),
  modulate: (r, [e, t], [s, a], h = !1) => {
    let u = s + (r - e) / (t - e) * (a - s);
    return h && (s < a ? u = Math.min(Math.max(u, s), a) : u = Math.max(Math.min(u, s), a)), u;
  },
  //#####################################################
  // STRING FUNCTIONS
  parseFunction: (r) => {
    const e = { name: "", args: [] };
    return _$1.endsWith(r, ")") ? (e.name = r.split("(")[0], e.args = r.split("(")[1].split(",").map((t) => _$1.trim(_$1.trimEnd(t, ")")))) : e.name = r, e;
  }
};
window.requestAnimationFrame == null && (window.requestAnimationFrame = window.webkitRequestAnimationFrame);
window.requestAnimationFrame == null && (window.requestAnimationFrame = (r) => Utils$2.delay(1 / 60, r));
window.performance ? Utils$2.getTime = () => window.performance.now() / 1e3 : Utils$2.getTime = () => Date.now() / 1e3;
const _isFontLoadedResults = {}, getWidth = (r) => Utils$2.textSize("BESbswy", {
  fontFamily: r,
  fontSize: 300
}).width;
let monoWidth = null, serifWidth = null, sansWidth = null;
const fontsFromConfig = function(r) {
  let e = [];
  return _$1.isArray(
    __guard__$6(r?.custom, (t) => t.families)
  ) && (e = e.concat(
    __guard__$6(r?.custom, (t) => t.families)
  )), _$1.isArray(
    __guard__$6(r?.google, (t) => t.families)
  ) && (e = e.concat(
    __guard__$6(r?.google, (t) => t.families)
  )), e;
}, __domCompleteState = "interactive";
let __domComplete = [], __domReady = !1;
typeof document < "u" && document !== null && (document.onreadystatechange = function(r) {
  if (document.readyState === __domCompleteState)
    return __domReady = !0, (() => {
      const e = [];
      for (; __domComplete.length; )
        e.push(__domComplete.shift()());
      return e;
    })();
});
Utils$2.domComplete = function(r) {
  return __domReady ? r() : __domComplete.push(r);
};
Utils$2.domCompleteCancel = (r) => __domComplete = _$1.without(__domComplete, r);
Utils$2.domValidEvent = function(r, e) {
  if (e)
    return ["touchstart", "touchmove", "touchend"].includes(e) ? !0 : typeof r[`on${e.toLowerCase()}`] < "u";
};
Utils$2.domLoadScript = function(r, e) {
  const t = document.createElement("script");
  return t.type = "text/javascript", t.src = r, t.onload = e, document.getElementsByTagName("head")[0].appendChild(t), t;
};
Utils$2.domLoadData = function(r, e) {
  const t = new XMLHttpRequest();
  return t.addEventListener(
    "load",
    () => e(null, t.responseText),
    !1
  ), t.addEventListener("error", () => e(!0, null), !1), t.open("GET", r, !0), t.send(null);
};
Utils$2.domLoadJSON = (r, e) => Utils$2.domLoadData(r, (t, s) => e(t, JSON.parse(s)));
Utils$2.domLoadDataSync = function(r) {
  const e = new XMLHttpRequest();
  e.open("GET", r, !1);
  try {
    e.send(null);
  } catch (s) {
    console.debug("XMLHttpRequest.error", s);
  }
  const t = function() {
    throw Error(
      `Utils.domLoadDataSync: ${r} -> [${e.status} ${e.statusText}]`
    );
  };
  return e.onerror = t, [200, 0].includes(e.status) || t(), e.responseText || t(), e.responseText;
};
Utils$2.domLoadJSONSync = (r) => JSON.parse(Utils$2.domLoadDataSync(r));
Utils$2.domLoadScriptSync = function(path) {
  const scriptData = Utils$2.domLoadDataSync(path);
  return eval(scriptData), scriptData;
};
Utils$2.insertCSS = function(r) {
  const e = document.createElement("style");
  return e.type = "text/css", e.innerHTML = r, Utils$2.domComplete(() => document.body.appendChild(e));
};
Utils$2.loadImage = function(r, e, t) {
  const s = new Image();
  return t == null && (t = Framer.CurrentContext), t.domEventManager.wrap(s).addEventListener("load", (a) => e()), t.domEventManager.wrap(s).addEventListener("error", (a) => e(!0)), s.src = r;
};
Utils$2.isInsideIframe = function() {
  return Utils$2.isInsideFramerCloud() ? !1 : window !== window.top;
};
Utils$2.isInsideFramerCloud = () => Utils$2.getQueryParameters().cloud === "1";
Utils$2.getQueryParameters = () => _$1.fromPairs(
  window.location.search.slice(1).split("&").map((r) => r.split("="))
);
Utils$2.point = function(r) {
  if (_$1.isNumber(r))
    return Utils$2.pointZero(r);
  if (!r)
    return Utils$2.pointZero();
  const e = Utils$2.pointZero();
  for (var t of ["x", "y"])
    _$1.isNumber(r[t]) && (e[t] = r[t]);
  return e;
};
Utils$2.pointZero = function(r) {
  return r == null && (r = 0), { x: r, y: r };
};
Utils$2.pointDivide = (r, e) => r = {
  x: r.x / e,
  y: r.y / e
};
Utils$2.pointAdd = function(r, e) {
  return {
    x: r.x + e.x,
    y: r.y + e.y
  };
};
Utils$2.pointSubtract = function(r, e) {
  return {
    x: r.x - e.x,
    y: r.y - e.y
  };
};
Utils$2.pointMin = function() {
  const r = Utils$2.arrayFromArguments(arguments);
  return {
    x: _$1.min(r.map((e) => e.x)),
    y: _$1.min(r.map((e) => e.y))
  };
};
Utils$2.pointMax = function() {
  const r = Utils$2.arrayFromArguments(arguments);
  return {
    x: _$1.max(r.map((e) => e.x)),
    y: _$1.max(r.map((e) => e.y))
  };
};
Utils$2.pointDelta = function(r, e) {
  return {
    x: e.x - r.x,
    y: e.y - r.y
  };
};
Utils$2.pointDistance = function(r, e) {
  const t = r.x - e.x, s = r.y - e.y;
  return Math.sqrt(t * t + s * s);
};
Utils$2.pointInvert = (r) => r = {
  x: 0 - r.x,
  y: 0 - r.y
};
Utils$2.pointTotal = (r) => r.x + r.y;
Utils$2.pointAbs = (r) => r = {
  x: Math.abs(r.x),
  y: Math.abs(r.y)
};
Utils$2.pointInFrame = function(r, e) {
  return !(r.x < Utils$2.frameGetMinX(e) || r.x > Utils$2.frameGetMaxX(e) || r.y < Utils$2.frameGetMinY(e) || r.y > Utils$2.frameGetMaxY(e));
};
Utils$2.pointCenter = function(r, e) {
  return {
    x: (r.x + e.x) / 2,
    y: (r.y + e.y) / 2
  };
};
Utils$2.pointAngle = (r, e) => Math.atan2(e.y - r.y, e.x - r.x) * 180 / Math.PI;
Utils$2.divideFrame = function(r, e) {
  return r.x /= e, r.y /= e, r.width /= e, r.height /= e, r;
};
Utils$2.scaleFrames = function(r, e) {
  if (r instanceof Layer && (r.constraintValues = null, r.children.map((t) => Utils$2.scaleFrames(t, e)), r.frame = Utils$2.divideFrame(r.frame, e)), _$1.isArray(r))
    return r.map((t) => Utils$2.scaleFrames(t, e));
};
Utils$2.size = function(r) {
  if (_$1.isNumber(r))
    return Utils$2.sizeZero(r);
  if (!r)
    return Utils$2.sizeZero();
  const e = Utils$2.sizeZero();
  for (var t of ["width", "height"])
    _$1.isNumber(r[t]) && (e[t] = r[t]);
  return e;
};
Utils$2.sizeZero = function(r) {
  return r == null && (r = 0), { width: r, height: r };
};
Utils$2.sizeMin = function() {
  const r = Utils$2.arrayFromArguments(arguments);
  return {
    width: _$1.min(r.map((e) => e.width)),
    height: _$1.min(r.map((e) => e.height))
  };
};
Utils$2.sizeMax = function() {
  const r = Utils$2.arrayFromArguments(arguments);
  return {
    width: _$1.max(r.map((e) => e.width)),
    height: _$1.max(r.map((e) => e.height))
  };
};
Utils$2.rectZero = function(r) {
  return r == null && (r = {}), _$1.defaults(r, { top: 0, right: 0, bottom: 0, left: 0 });
};
Utils$2.parseRect = function(r) {
  if (_$1.isArray(r) && _$1.isNumber(r[0])) {
    if (r.length === 1)
      return Utils$2.parseRect({ top: r[0] });
    if (r.length === 2)
      return Utils$2.parseRect({ top: r[0], right: r[1] });
    if (r.length === 3)
      return Utils$2.parseRect({ top: r[0], right: r[1], bottom: r[2] });
    if (r.length === 4)
      return Utils$2.parseRect({
        top: r[0],
        right: r[1],
        bottom: r[2],
        left: r[3]
      });
  }
  return _$1.isArray(r) && _$1.isObject(r[0]) ? r[0] : _$1.isObject(r) ? r : _$1.isNumber(r) ? { top: r, right: r, bottom: r, left: r } : {};
};
Utils$2.frameGetMinX = (r) => r.x;
Utils$2.frameSetMinX = (r, e) => r.x = e;
Utils$2.frameGetMidX = function(r) {
  return r.width === 0 ? r.x : r.x + r.width / 2;
};
Utils$2.frameSetMidX = (r, e) => r.x = r.width === 0 ? e : e - r.width / 2;
Utils$2.frameGetMaxX = function(r) {
  return r.width === 0 ? 0 : r.x + r.width;
};
Utils$2.frameSetMaxX = (r, e) => r.x = r.width === 0 ? 0 : e - r.width;
Utils$2.frameGetMinY = (r) => r.y;
Utils$2.frameSetMinY = (r, e) => r.y = e;
Utils$2.frameGetMidY = function(r) {
  return r.height === 0 ? r.y : r.y + r.height / 2;
};
Utils$2.frameSetMidY = (r, e) => r.y = r.height === 0 ? e : e - r.height / 2;
Utils$2.frameGetMaxY = function(r) {
  return r.height === 0 ? 0 : r.y + r.height;
};
Utils$2.frameSetMaxY = (r, e) => r.y = r.height === 0 ? 0 : e - r.height;
Utils$2.frame = function(r) {
  if (_$1.isNumber(r))
    return Utils$2.frameZero(r);
  if (!r)
    return Utils$2.frameZero();
  const e = Utils$2.frameZero();
  for (var t of ["x", "y", "width", "height"])
    _$1.isNumber(r[t]) && (e[t] = r[t]);
  return e;
};
Utils$2.frameZero = function(r) {
  return r == null && (r = 0), { x: r, y: r };
};
Utils$2.frameSize = function(r) {
  return {
    width: r.width,
    height: r.height
  };
};
Utils$2.framePoint = function(r) {
  return {
    x: r.x,
    y: r.y
  };
};
Utils$2.pointsFromFrame = function(r) {
  const e = Utils$2.frameGetMinX(r), t = Utils$2.frameGetMaxX(r), s = Utils$2.frameGetMinY(r), a = Utils$2.frameGetMaxY(r);
  return [{ x: e, y: s }, { x: e, y: a }, { x: t, y: a }, { x: t, y: s }];
};
Utils$2.frameFromPoints = function(r) {
  const e = _$1.map(r, "x"), t = _$1.map(r, "y"), s = _$1.min(e), a = _$1.max(e), h = _$1.min(t), u = _$1.max(t);
  return {
    x: s,
    y: h,
    width: a - s,
    height: u - h
  };
};
Utils$2.pixelAlignedFrame = function(r) {
  const e = Math.round(r.x), t = Math.round(r.y), s = Math.round(r.x + r.width), a = Math.round(r.y + r.height), h = Math.max(s - e, 0), u = Math.max(a - t, 0);
  return { x: e, y: t, width: h, height: u };
};
Utils$2.calculateLayoutFrame = function(r, e) {
  const { constraintValues: t } = e;
  let s = t.left || 0, a = t.top || 0, { width: h } = t, { height: u } = t;
  if (r === null)
    return Utils$2.pixelAlignedFrame({ x: s, y: a, width: h, height: u });
  const p = h / u;
  return t.widthFactor !== null && (h = r.width * t.widthFactor, t.aspectRatioLocked && (u = h / p)), t.heightFactor !== null && (u = r.height * t.heightFactor, t.aspectRatioLocked && (h = u * p)), t.left !== null && t.right !== null && (h = r.width - t.right - t.left, t.aspectRatioLocked && (u = h / p)), t.top !== null && t.bottom !== null && (u = r.height - t.bottom - t.top, t.aspectRatioLocked && (h = u * p)), s = Utils$2.calculateLayoutX(r, t, h), a = Utils$2.calculateLayoutY(r, t, u), Utils$2.pixelAlignedFrame({ x: s, y: a, width: h, height: u });
};
Utils$2.calculateLayoutX = function(r, e, t) {
  let s = e.left || 0;
  return e.left !== null ? s = e.left : e.right !== null ? s = r.width - e.right - t : s = e.centerAnchorX * r.width - t / 2, s;
};
Utils$2.calculateLayoutY = function(r, e, t) {
  let s = e.top || 0;
  return e.top !== null ? s = e.top : e.bottom !== null ? s = r.height - e.bottom - t : s = e.centerAnchorY * r.height - t / 2, s;
};
Utils$2.frameMerge = function() {
  const r = Utils$2.arrayFromArguments(arguments), e = {
    x: _$1.min(r.map(Utils$2.frameGetMinX)),
    y: _$1.min(r.map(Utils$2.frameGetMinY))
  };
  return e.width = _$1.max(r.map(Utils$2.frameGetMaxX)) - e.x, e.height = _$1.max(r.map(Utils$2.frameGetMaxY)) - e.y, e;
};
Utils$2.frameInFrame = function(r, e) {
  for (var t of Array.from(Utils$2.pointsFromFrame(r)))
    if (!Utils$2.pointInFrame(t, e))
      return !1;
  return !0;
};
Utils$2.framePointForOrigin = (r, e, t) => r = {
  x: r.x + e * r.width,
  y: r.y + t * r.height,
  width: r.width,
  height: r.height
};
Utils$2.frameInset = function(r, e) {
  return _$1.isNumber(e) && (e = { top: e, right: e, bottom: e, left: e }), r = Utils$2.frame(r), r = {
    x: r.x + e.left,
    y: r.y + e.top,
    width: r.width - e.left - e.right,
    height: r.height - e.top - e.bottom
  };
};
Utils$2.frameSortByAbsoluteDistance = function(r, e, t, s) {
  t == null && (t = 0), s == null && (s = 0);
  const a = function(h) {
    let u = Utils$2.pointDelta(
      r,
      Utils$2.framePointForOrigin(h, t, s)
    );
    return u = Utils$2.pointAbs(u), u = Utils$2.pointTotal(u), u;
  };
  return e.sort((h, u) => a(h) - a(u));
};
Utils$2.pointInPolygon = function(r, e) {
  const t = r[0], s = r[1];
  let a = !1, h = 0, u = e.length - 1;
  for (; h < e.length; ) {
    var p = e[h][0], y = e[h][1], S = e[u][0], L = e[u][1], M = y > s && s !== L && L > s && t < (S - p) * (s - y) / (L - y) + p;
    M && (a = !a), u = h++;
  }
  return a;
};
Utils$2.frameIntersection = function(r, e) {
  let t = e.x, s = e.y, a = t + e.width, h = s + e.height;
  return r.x > t && (t = r.x), r.y > s && (s = r.y), r.x + r.width < a && (a = r.x + r.width), r.y + r.height < h && (h = r.y + r.height), a <= t || h <= s ? null : e = {
    x: t,
    y: s,
    width: a - t,
    height: h - s
  };
};
Utils$2.frameCenterPoint = function(r) {
  return {
    x: Utils$2.frameGetMidX(r),
    y: Utils$2.frameGetMidY(r)
  };
};
Utils$2.frameInFrame = function(r, e) {
  for (var t of Array.from(Utils$2.pointsFromFrame(r)))
    if (!Utils$2.pointInFrame(t, e))
      return !1;
  return !0;
};
Utils$2.rotationNormalizer = function() {
  let r = null;
  return function(e) {
    r == null && (r = e);
    const t = r - e, s = Math.abs(t) + 180, a = Math.floor(s / 360);
    return t < 180 && (e -= a * 360), t > 180 && (e += a * 360), r = e, e;
  };
};
Utils$2.convertPointToContext = function(r, e, t, s) {
  r == null && (r = {}), t == null && (t = !1), s == null && (s = !0), r = _$1.defaults(r, { x: 0, y: 0, z: 0 });
  const a = e.containers(t);
  s && a.unshift(e);
  for (var h of Array.from(a))
    (h.flat || h.clip) && (r.z = 0), h.matrix3d != null ? r = h.matrix3d.point(r) : h.scale != null && (r = {
      x: r.x * h.scale,
      y: r.y * h.scale
    }), h.parent || (r.z = 0);
  return r;
};
Utils$2.convertFrameToContext = function(r, e, t, s) {
  r == null && (r = {}), t == null && (t = !1), s == null && (s = !0), r = _$1.defaults(r, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height
  });
  const h = Utils$2.pointsFromFrame(r).map(
    (u) => Utils$2.convertPointToContext(u, e, t, s)
  );
  return Utils$2.frameFromPoints(h);
};
Utils$2.convertPointFromContext = function(r, e, t, s) {
  if (r == null && (r = {}), t == null && (t = !1), s == null && (s = !0), r = _$1.defaults(r, { x: 0, y: 0, z: 0 }), t && typeof webkitConvertPointFromPageToNode < "u" && webkitConvertPointFromPageToNode !== null) {
    let u;
    s ? u = e._element : u = (e.parent || e.context)._element, r = Utils$2.point(
      webkitConvertPointFromPageToNode(u, new WebKitPoint(r.x, r.y))
    );
    const p = e.context != null ? e.context : e;
    return r = {
      x: r.x / p.scale,
      y: r.y / p.scale
    }, r;
  }
  const a = e.containers(t);
  a.reverse(), s && a.push(e);
  for (var h of Array.from(a))
    h.matrix3d != null ? r = h.matrix3d.inverse().point(r) : h.scale != null && (r = {
      x: r.x / h.scale,
      y: r.y / h.scale
    });
  return r;
};
Utils$2.convertFrameFromContext = function(r, e, t, s) {
  r == null && (r = {}), t == null && (t = !1), s == null && (s = !0), r = _$1.defaults(r, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height
  });
  const h = Utils$2.pointsFromFrame(r).map(
    (u) => Utils$2.convertPointFromContext(u, e, t, s)
  );
  return Utils$2.frameFromPoints(h);
};
Utils$2.convertPoint = function(r, e, t, s) {
  s == null && (s = !1);
  let a = _$1.defaults(r, { x: 0, y: 0, z: 0 });
  if (e && (a = Utils$2.convertPointToContext(a, e, s)), t != null)
    return Utils$2.convertPointFromContext(a, t, s);
  if (e != null && s && typeof webkitConvertPointFromPageToNode < "u" && webkitConvertPointFromPageToNode !== null) {
    const h = e.context._element;
    return Utils$2.point(
      webkitConvertPointFromPageToNode(h, new WebKitPoint(a.x, a.y))
    );
  } else
    return a;
};
Utils$2.boundingFrame = function(r, e) {
  e == null && (e = !0);
  const t = { x: 0, y: 0, width: r.width, height: r.height }, a = Utils$2.pointsFromFrame(t).map(
    (u) => Utils$2.convertPointToContext(u, r, e)
  ), h = Utils$2.frameFromPoints(a);
  return Utils$2.pixelAlignedFrame(h);
};
Utils$2.perspectiveProjectionMatrix = function(r) {
  const e = r.perspective, t = Matrix.identity3d();
  return e != null && e !== 0 && (t.m34 = -1 / e), t;
};
Utils$2.perspectiveMatrix = function(r) {
  const e = r.perspectiveOriginX * r.width, t = r.perspectiveOriginY * r.height, s = Utils$2.perspectiveProjectionMatrix(r);
  return Matrix.identity3d().translate(e, t).multiply(s).translate(-e, -t);
};
Utils$2.globalLayers = function(r) {
  for (var e in r) {
    var t = r[e];
    e = e.replace(/\s/g, ""), window.hasOwnProperty(e) && !window.Framer._globalWarningGiven ? print(
      `Warning: Cannot make layer '${e}' a global, a variable with that name already exists`
    ) : window[e] = t;
  }
  return window.Framer._globalWarningGiven = !0;
};
let _textSizeNode = null;
Utils$2.throwInStudioOrWarnInProduction = function(r) {
  if (Utils$2.isFramerStudio())
    throw new Error(r);
  return console.warn(r), null;
};
Utils$2.getIdAttributesFromString = function(r) {
  let e;
  const t = /id=['"]([^'"]+)["']/g, s = [];
  for (; e = t.exec(r); ) {
    var a = e[1];
    a != null && s.push(a);
  }
  return s;
};
Utils$2.getUniqueId = function(r) {
  r == null && (r = "id");
  let e = r, t = 1, s = document.querySelector(`[id='${e}']`);
  for (; s != null; )
    e = `${r}${t}`, s = document.querySelector(`[id='${e}']`), t++;
  return e;
};
function __guard__$6(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
var eventemitter3 = { exports: {} }, hasRequiredEventemitter3;
function requireEventemitter3() {
  return hasRequiredEventemitter3 || (hasRequiredEventemitter3 = 1, (function(r) {
    var e = Object.prototype.hasOwnProperty, t = typeof Object.create != "function" ? "~" : !1;
    function s(h, u, p) {
      this.fn = h, this.context = u, this.once = p || !1;
    }
    function a() {
    }
    a.prototype._events = void 0, a.prototype.eventNames = function() {
      var u = this._events, p = [], y;
      if (!u) return p;
      for (y in u)
        e.call(u, y) && p.push(t ? y.slice(1) : y);
      return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(u)) : p;
    }, a.prototype.listeners = function(u, p) {
      var y = t ? t + u : u, S = this._events && this._events[y];
      if (p) return !!S;
      if (!S) return [];
      if (S.fn) return [S.fn];
      for (var L = 0, M = S.length, R = new Array(M); L < M; L++)
        R[L] = S[L].fn;
      return R;
    }, a.prototype.emit = function(u, p, y, S, L, M) {
      var R = t ? t + u : u;
      if (!this._events || !this._events[R]) return !1;
      var k = this._events[R], q = arguments.length, le, j;
      if (typeof k.fn == "function") {
        switch (k.once && this.removeListener(u, k.fn, void 0, !0), q) {
          case 1:
            return k.fn.call(k.context), !0;
          case 2:
            return k.fn.call(k.context, p), !0;
          case 3:
            return k.fn.call(k.context, p, y), !0;
          case 4:
            return k.fn.call(k.context, p, y, S), !0;
          case 5:
            return k.fn.call(k.context, p, y, S, L), !0;
          case 6:
            return k.fn.call(k.context, p, y, S, L, M), !0;
        }
        for (j = 1, le = new Array(q - 1); j < q; j++)
          le[j - 1] = arguments[j];
        k.fn.apply(k.context, le);
      } else {
        var it = k.length, nt;
        for (j = 0; j < it; j++)
          switch (k[j].once && this.removeListener(u, k[j].fn, void 0, !0), q) {
            case 1:
              k[j].fn.call(k[j].context);
              break;
            case 2:
              k[j].fn.call(k[j].context, p);
              break;
            case 3:
              k[j].fn.call(k[j].context, p, y);
              break;
            default:
              if (!le) for (nt = 1, le = new Array(q - 1); nt < q; nt++)
                le[nt - 1] = arguments[nt];
              k[j].fn.apply(k[j].context, le);
          }
      }
      return !0;
    }, a.prototype.on = function(u, p, y) {
      var S = new s(p, y || this), L = t ? t + u : u;
      return this._events || (this._events = t ? {} : /* @__PURE__ */ Object.create(null)), this._events[L] ? this._events[L].fn ? this._events[L] = [
        this._events[L],
        S
      ] : this._events[L].push(S) : this._events[L] = S, this;
    }, a.prototype.once = function(u, p, y) {
      var S = new s(p, y || this, !0), L = t ? t + u : u;
      return this._events || (this._events = t ? {} : /* @__PURE__ */ Object.create(null)), this._events[L] ? this._events[L].fn ? this._events[L] = [
        this._events[L],
        S
      ] : this._events[L].push(S) : this._events[L] = S, this;
    }, a.prototype.removeListener = function(u, p, y, S) {
      var L = t ? t + u : u;
      if (!this._events || !this._events[L]) return this;
      var M = this._events[L], R = [];
      if (p)
        if (M.fn)
          (M.fn !== p || S && !M.once || y && M.context !== y) && R.push(M);
        else
          for (var k = 0, q = M.length; k < q; k++)
            (M[k].fn !== p || S && !M[k].once || y && M[k].context !== y) && R.push(M[k]);
      return R.length ? this._events[L] = R.length === 1 ? R[0] : R : delete this._events[L], this;
    }, a.prototype.removeAllListeners = function(u) {
      return this._events ? (u ? delete this._events[t ? t + u : u] : this._events = t ? {} : /* @__PURE__ */ Object.create(null), this) : this;
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prototype.setMaxListeners = function() {
      return this;
    }, a.prefixed = t, r.exports = a;
  })(eventemitter3)), eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const EventEmitter3 = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports), EventKey = "_events";
class EventEmitter extends EventEmitter3 {
  listenerEvents() {
    return _$1.keys(this[EventKey] ?? {});
  }
  removeAllListeners(e) {
    const t = e ? [e] : this.listenerEvents();
    for (const s of t) {
      const a = this.listeners(s);
      for (const h of a)
        this.removeListener(s, h);
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
        const e = [], t = this._propertyList();
        for (var s in t) {
          var a = t[s];
          a.exportable && e.push(s);
        }
        return _$1.pick(this, e);
      },
      set(e) {
        const t = this._propertyList();
        return (() => {
          const s = [];
          for (var a in e) {
            var h = e[a];
            t[a] != null && t[a].importable ? s.push(this[a] = h) : s.push(void 0);
          }
          return s;
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
  static define(e, t) {
    return this !== BaseClass && this._addDescriptor(e, t), t.readonly && (t.set = function(s) {
      throw Error(`${this.constructor.name}.${e} is readonly`);
    }), Object.defineProperty(this.prototype, e, t);
  }
  static undefine(e) {
    return _$1.isArray(e) ? e.map((t) => this.undefine(t)) : this.define(
      e,
      this.simpleProperty(e, void 0, {
        importable: !1,
        exportable: !1,
        enumerable: !1
      })
    );
  }
  static _addDescriptor(e, t) {
    if (t.propertyName = e, t.enumerable == null && (t.enumerable = !0), t.exportable == null && (t.exportable = !0), t.importable == null && (t.importable = !0), t.readonly == null && (t.readonly = t.set == null), t.importable = t.importable && !t.readonly, t.exportable = t.exportable && !t.readonly, !_$1.startsWith(e, "_") && (ObjectDescriptors.push([this, e, t]), ObjectDescriptorsChanged = !0, t.exportable || t.importable)) {
      if (t.depends) {
        for (var s of Array.from(t.depends))
          Array.from(DefaultPropertyOrder).includes(s) || DefaultPropertyOrder.push(s);
        const a = DefaultPropertyOrder.indexOf(e);
        a !== -1 && (DefaultPropertyOrder.splice(a, 1), DefaultPropertyOrder.push(e));
      }
      if (!Array.from(DefaultPropertyOrder).includes(e))
        return DefaultPropertyOrder.push(e);
    }
  }
  static simpleProperty(e, t, s) {
    return s == null && (s = {}), _$1.extend(s, {
      default: t,
      get() {
        return this._getPropertyValue(e);
      },
      set(a) {
        return this._setPropertyValue(e, a), __guardMethod__$1(s, "didSet", (h) => h.didSet(this, a));
      }
    });
  }
  static proxyProperty(e, t) {
    t == null && (t = {});
    const s = e.split(".")[0];
    return _$1.extend(t, {
      get() {
        if (_$1.isObject(this[s]))
          return Utils$2.getValueForKeyPath(this, e);
      },
      set(a) {
        if (_$1.isObject(this[s]))
          return Utils$2.setValueForKeyPath(this, e, a), __guardMethod__$1(t, "didSet", (h) => h.didSet(this, a));
      },
      proxy: !0
    });
  }
  _setPropertyValue(e, t) {
    return this[DefinedPropertiesValuesKey][e] = t;
  }
  _getPropertyValue(e) {
    return Utils$2.valueOrDefault(
      this[DefinedPropertiesValuesKey][e],
      this._getPropertyDefaultValue(e)
    );
  }
  _getPropertyDefaultValue(e) {
    return __guard__$5(this._propertyList()[e], (t) => t.default);
  }
  _propertyList() {
    return (!this._propertyListCache || ObjectDescriptorsChanged) && (this._propertyListCache = this.__propertyList(), ObjectDescriptorsChanged = !1), this._propertyListCache;
  }
  __propertyList() {
    const e = {};
    for (var t of Array.from(ObjectDescriptors)) {
      var [s, a, h] = Array.from(t);
      this instanceof s && (h.exportable || h.importable ? e[a] = h : delete e[a]);
    }
    return e;
  }
  keys() {
    return _$1.keys(this.props);
  }
  toInspect() {
    return `<${this.constructor.name} id:${this.id || null}>`;
  }
  onChange(e, t) {
    return this.on(`change:${e}`, t);
  }
  //################################################################
  // Base constructor method
  constructor(e) {
    super(...arguments), this._setPropertyValue = this._setPropertyValue.bind(this), this._getPropertyValue = this._getPropertyValue.bind(this), this.toInspect = this.toInspect.bind(this), this._context = typeof Framer < "u" && Framer !== null ? Framer.CurrentContext : void 0, this[DefinedPropertiesValuesKey] = {}, this._applyDefaults(e), this.constructor[CounterKey] == null && (this.constructor[CounterKey] = 0), this.constructor[CounterKey] += 1, this._id = this.constructor[CounterKey];
  }
  _applyDefaults(e, t) {
    if (t == null && (t = !1), !e)
      return;
    const s = this._propertyList();
    return (() => {
      const a = [];
      for (var h of Array.from(DefaultPropertyOrder)) {
        var u = s[h];
        if (u != null) {
          if (t && u.proxy !== !0)
            continue;
          a.push(this._applyDefault(u, h, e[h]));
        } else
          a.push(void 0);
      }
      return a;
    })();
  }
  _applyProxyDefaults(e) {
    return this._applyDefaults(e, !0);
  }
  _applyDefault(e, t, s) {
    let a;
    if (!e.readonly && (e.importable && (a = s), a = Utils$2.valueOrDefault(
      s,
      this._getPropertyDefaultValue(t)
    ), ![null, void 0].includes(a)))
      return this[t] = a;
  }
}
BaseClass.initClass();
function __guardMethod__$1(r, e, t) {
  if (typeof r < "u" && r !== null && typeof r[e] == "function")
    return t(r, e);
}
function __guard__$5(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
const { rgbToHsluv } = "hsluv", ColorType = {
  RGB: "rgb",
  HSL: "hsl",
  HEX: "hex",
  NAME: "name"
};
let Color$1 = class Q extends BaseClass {
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
    }), this.isColor = (e) => _$1.isString(e) ? this.isColorString(e) : this.isColorObject(e);
  }
  constructor(e, t, s, a) {
    this.toInspect = this.toInspect.bind(this), this.color = e, this.color === "" && (this.color = null);
    const { color: h } = this;
    if (Q.isColorObject(h))
      return h;
    const u = inputData(h, t, s, a);
    this._type = u.type, this._r = u.r, this._g = u.g, this._b = u.b, this._a = u.a, this._h = u.h, this._s = u.s, this._l = u.l, this._roundA = Math.round(100 * this._a) / 100;
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
    }), _$1.clone(this._rgb);
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
    }), _$1.clone(this._hsl);
  }
  toHusl() {
    if (this._husl === void 0) {
      const e = [this.r / 255, this.g / 255, this.b / 255], t = rgbToHsluv(e);
      this._husl = { h: t[0], s: t[1], l: t[2] };
    }
    return _$1.clone(this._husl);
  }
  toHslString() {
    if (this._hslString === void 0) {
      const e = this.toHsl(), t = Math.round(e.h), s = Math.round(e.s * 100), a = Math.round(e.l * 100);
      this._a === 1 ? this._hslString = `hsl(${t}, ${s}%, ${a}%)` : this._hslString = `hsla(${t}, ${s}%, ${a}%, ${this._roundA})`;
    }
    return this._hslString;
  }
  toName() {
    if (this._a === 0)
      return "transparent";
    if (this._a < 1)
      return !1;
    const e = rgbToHex(this._r, this._g, this._b, !0);
    for (var t of Array.from(_$1.keys(cssNames))) {
      var s = cssNames[t];
      if (s === e)
        return t;
    }
    return !1;
  }
  lighten(e) {
    e == null && (e = 10);
    const t = this.toHsl();
    return t.l += e / 100, t.l = Math.min(1, Math.max(0, t.l)), new Q(t);
  }
  brighten(e) {
    e == null && (e = 10);
    const t = this.toRgb();
    return t.r = Math.max(
      0,
      Math.min(255, t.r - Math.round(255 * -(e / 100)))
    ), t.g = Math.max(
      0,
      Math.min(255, t.g - Math.round(255 * -(e / 100)))
    ), t.b = Math.max(
      0,
      Math.min(255, t.b - Math.round(255 * -(e / 100)))
    ), new Q(t);
  }
  darken(e) {
    e == null && (e = 10);
    const t = this.toHsl();
    return t.l -= e / 100, t.l = Math.min(1, Math.max(0, t.l)), new Q(t);
  }
  desaturate(e) {
    e == null && (e = 10);
    const t = this.toHsl();
    return t.s -= e / 100, t.s = Math.min(1, Math.max(0, t.s)), new Q(t);
  }
  saturate(e) {
    e == null && (e = 10);
    const t = this.toHsl();
    return t.s += e / 100, t.s = Math.min(1, Math.max(0, t.s)), new Q(t);
  }
  grayscale() {
    const e = this.toHsl();
    return new Q(e).desaturate(100);
  }
  toString() {
    return this.toRgbString();
  }
  alpha(e) {
    return e == null && (e = 1), new Q({
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
  mix(e, t, s, a) {
    return s == null && (s = !1), Q.mix(this, e, t, s, a);
  }
  copy() {
    return new Q(this);
  }
  isEqual(e) {
    return Q.equal(this, e);
  }
  toInspect() {
    return this._type === ColorType.HSL ? `<${this.constructor.name} h:${this.h} s:${this.s} l:${this.l} a:${this.a}>` : this._type === ColorType.HEX || this._type === ColorType.NAME ? `<${this.constructor.name} "${this.color}">` : `<${this.constructor.name} r:${this.r} g:${this.g} b:${this.b} a:${this.a}>`;
  }
  //#############################################################
  //# Class methods
  static mix(e, t, s, a, h) {
    s == null && (s = 0.5), a == null && (a = !1);
    let u = null;
    if (typeof e == "string" && this.isColorString(e) && (e = new Q(e)), typeof t == "string" && this.isColorString(t) && (t = new Q(t)), !(e instanceof Q) && t instanceof Q || e instanceof Q && e._a === 0 && t instanceof Q && t._a !== 0 ? e = t.transparent() : (!(t instanceof Q) && e instanceof Q || t instanceof Q && t._a === 0 && e instanceof Q && e._a !== 0) && (t = e.transparent()), t instanceof Q)
      if (ColorModel.isRGB(h))
        u = new Q({
          r: Utils.modulate(s, [0, 1], [e._r, t._r], a),
          g: Utils.modulate(s, [0, 1], [e._g, t._g], a),
          b: Utils.modulate(s, [0, 1], [e._b, t._b], a),
          a: Utils.modulate(s, [0, 1], [e._a, t._a], a)
        });
      else {
        let p, y;
        ColorModel.isHSL(h) ? (p = e.toHsl(), y = t.toHsl()) : (p = e.toHusl(), y = t.toHusl()), p.s === 0 ? p.h = y.h : y.s === 0 && (y.h = p.h);
        const S = p.h, L = y.h;
        let M = L - S;
        M > 180 ? M = L - 360 - S : M < -180 && (M = L + 360 - S);
        const R = {
          h: Utils.modulate(s, [0, 1], [S, S + M], a),
          s: Utils.modulate(s, [0, 1], [p.s, y.s], a),
          l: Utils.modulate(s, [0, 1], [p.l, y.l], a),
          a: Utils.modulate(s, [0, 1], [e.a, t.a], a)
        };
        ColorModel.isHSL(h) ? u = new Q(R) : u = new Q(rgbaFromHusl(R));
      }
    return u;
  }
  static random(e) {
    e == null && (e = 1);
    const t = () => parseInt(Math.random() * 255);
    return new Q(`rgba(${t()}, ${t()}, ${t()}, ${e})`);
  }
  static grey(e, t) {
    return e == null && (e = 0.5), t == null && (t = 1), e = parseInt(e * 255), new Q(`rgba(${e}, ${e}, ${e}, ${t})`);
  }
  static gray(...e) {
    return this.grey(...Array.from(e || []));
  }
  static toColor(e) {
    return new Q(e);
  }
  static validColorValue(e) {
    return e instanceof Q || e === null;
  }
  static isColorObject(e) {
    return e instanceof Q;
  }
  static isColorString(e) {
    return _$1.isString(e) ? stringToObject(e) !== !1 : !1;
  }
  static isValidColorProperty(e, t) {
    return !!((_$1.endsWith(e.toLowerCase(), "color") || ["fill", "stroke"].includes(e)) && _$1.isString(t) && Q.isColorString(t));
  }
  static equal(e, t) {
    if (!this.validColorValue(e) && !Q.isColorString(e) || !this.validColorValue(t) && !Q.isColorString(t))
      return !1;
    e = new Q(e), t = new Q(t);
    const s = 0.01;
    return !(Math.abs(e.r - t.r) >= s || Math.abs(e.g - t.g) >= s || Math.abs(e.b - t.b) >= s || Math.abs(e.a - t.a) >= s);
  }
  static rgbToHsl(e, t, s) {
    return rgbToHsl(e, t, s);
  }
};
var ColorModel = {
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla"
};
ColorModel.isRGB = function(r) {
  if (_$1.isString(r)) {
    let e;
    return e = r.toLowerCase(), [ColorModel.RGB, ColorModel.RGBA].includes(e);
  }
  return !1;
};
ColorModel.isHSL = function(r) {
  if (_$1.isString(r)) {
    let e;
    return e = r.toLowerCase(), [ColorModel.HSL, ColorModel.HSLA].includes(e);
  }
  return !1;
};
const rgbaFromHusl = (r) => {
  const e = r.hsluvToRgb([r.h, r.s, r.l]);
  return {
    r: e[0] * 255,
    g: e[1] * 255,
    b: e[2] * 255,
    a: r.a
    // keep alpha if it exists
  };
};
var inputData = function(r, e, t, s) {
  let a, h, u, p = { r: 0, g: 0, b: 0 }, y = { h: 0, s: 0, l: 0 }, S = 1, L = ColorType.RGB;
  return r === null ? S = 0 : _$1.isNumber(r) ? (p.r = r, _$1.isNumber(e) && (p.g = e), _$1.isNumber(t) && (p.b = t), _$1.isNumber(s) && (S = s)) : (typeof r == "string" && (r = stringToObject(r), r || (r = {
    r: 0,
    g: 0,
    b: 0,
    a: 0
  }), r.hasOwnProperty("type") && ({ type: L } = r)), typeof r == "object" && (r.hasOwnProperty("r") || r.hasOwnProperty("g") || r.hasOwnProperty("b") ? p = rgbToRgb(r.r, r.g, r.b) : (r.hasOwnProperty("h") || r.hasOwnProperty("s") || r.hasOwnProperty("l")) && (a = isNumeric(r.h) ? parseFloat(r.h) : 0, a = (a + 360) % 360, u = isNumeric(r.s) ? r.s : 1, _$1.isString(r.s) && (u = numberFromString(r.s)), h = isNumeric(r.l) ? r.l : 0.5, _$1.isString(r.l) && (h = numberFromString(r.l)), p = hslToRgb(a, u, h), L = ColorType.HSL, y = {
    h: a,
    s: u,
    l: h
  }), r.hasOwnProperty("a") && ({ a: S } = r))), S = correctAlpha(S), L !== ColorType.HSL && (y = rgbToHsl(p.r, p.g, p.b)), {
    type: L,
    r: Math.min(255, Math.max(p.r, 0)),
    g: Math.min(255, Math.max(p.g, 0)),
    b: Math.min(255, Math.max(p.b, 0)),
    h: Utils.clamp(y.h, 0, 360),
    s: Utils.clamp(y.s, 0, 1),
    l: Utils.clamp(y.l, 0, 1),
    a: S
  };
}, numberFromString = (r) => r.match(/\d+/)[0], rgbToRgb = (r, e, t) => ({
  r: isNumeric(r) ? bound01(r, 255) * 255 : 0,
  g: isNumeric(e) ? bound01(e, 255) * 255 : 0,
  b: isNumeric(t) ? bound01(t, 255) * 255 : 0
}), rgbToHex = function(r, e, t, s) {
  const a = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(e).toString(16)),
    pad2(Math.round(t).toString(16))
  ];
  return s && a[0].charAt(0) === a[0].charAt(1) && a[1].charAt(0) === a[1].charAt(1) && a[2].charAt(0) === a[2].charAt(1) ? a[0].charAt(0) + a[1].charAt(0) + a[2].charAt(0) : a.join("");
}, rgbToHsl = function(r, e, t) {
  let s, a;
  r = bound01(r, 255), e = bound01(e, 255), t = bound01(t, 255);
  const h = Math.max(r, e, t), u = Math.min(r, e, t);
  let p = a = s = (h + u) / 2;
  if (h === u)
    p = a = 0;
  else {
    const y = h - u;
    switch (a = s > 0.5 ? y / (2 - h - u) : y / (h + u), h) {
      case r:
        p = (e - t) / y + (e < t ? 6 : 0);
        break;
      case e:
        p = (t - r) / y + 2;
        break;
      case t:
        p = (r - e) / y + 4;
        break;
    }
    p /= 6;
  }
  return { h: p * 360, s: a, l: s };
}, hslToRgb = function(r, e, t) {
  let s, a, h;
  r = bound01(r, 360), e = bound01(e * 100, 100), t = bound01(t * 100, 100);
  const u = function(p, y, S) {
    return S < 0 && (S += 1), S > 1 && (S -= 1), S < 1 / 6 ? p + (y - p) * 6 * S : S < 1 / 2 ? y : S < 2 / 3 ? p + (y - p) * (2 / 3 - S) * 6 : p;
  };
  if (e === 0)
    s = a = h = t;
  else {
    const p = t < 0.5 ? t * (1 + e) : t + e - t * e, y = 2 * t - p;
    s = u(y, p, r + 1 / 3), a = u(y, p, r), h = u(y, p, r - 1 / 3);
  }
  return { r: s * 255, g: a * 255, b: h * 255 };
}, correctAlpha = function(r) {
  return r = parseFloat(r), r < 0 && (r = 0), (isNaN(r) || r > 1) && (r = 1), r;
}, bound01 = function(r, e) {
  isOnePointZero(r) && (r = "100%");
  const t = isPercentage(r);
  return r = Math.min(e, Math.max(0, parseFloat(r))), t && (r = parseInt(r * e, 10) / 100), Math.abs(r - e) < 1e-6 ? 1 : r % e / parseFloat(e);
}, isOnePointZero = (r) => typeof r == "string" && r.indexOf(".") !== -1 && parseFloat(r) === 1, isPercentage = (r) => typeof r == "string" && r.indexOf("%") !== -1, pad2 = function(r) {
  return r.length === 1 ? "0" + r : "" + r;
};
const matchers = (function() {
  const t = "(?:" + "[-\\+]?\\d*\\.\\d+%?" + ")|(?:" + "[-\\+]?\\d+%?" + ")", s = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?", a = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?";
  return {
    rgb: new RegExp("rgb" + s),
    rgba: new RegExp("rgba" + a),
    hsl: new RegExp("hsl" + s),
    hsla: new RegExp("hsla" + a),
    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
})();
var isNumeric = (r) => !isNaN(r) && isFinite(r);
const percentToFraction = (r) => numberFromString(r) / 100;
var stringToObject = function(r) {
  const e = /^[\s,#]+/, t = /\s+$/;
  if (r = r.replace(e, "").replace(t, "").toLowerCase(), cssNames[r])
    r = cssNames[r];
  else if (r === "transparent")
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      type: ColorType.NAME
    };
  let s;
  return (s = matchers.rgb.exec(r)) ? {
    r: s[1],
    g: s[2],
    b: s[3]
  } : (s = matchers.rgba.exec(r)) ? {
    r: s[1],
    g: s[2],
    b: s[3],
    a: s[4]
  } : (s = matchers.hsl.exec(r)) ? {
    h: s[1],
    s: percentToFraction(s[2]),
    l: percentToFraction(s[3])
  } : (s = matchers.hsla.exec(r)) ? {
    h: s[1],
    s: percentToFraction(s[2]),
    l: percentToFraction(s[3]),
    a: s[4]
  } : (s = matchers.hex6.exec(r) || (s = matchers.hex6.exec(cssNames[r]))) ? {
    r: parseInt(s[1], 16),
    g: parseInt(s[2], 16),
    b: parseInt(s[3], 16),
    a: 1,
    type: ColorType.HEX
  } : (s = matchers.hex3.exec(r) || (s = matchers.hex3.exec(cssNames[r]))) ? {
    r: parseInt(s[1] + "" + s[1], 16),
    g: parseInt(s[2] + "" + s[2], 16),
    b: parseInt(s[3] + "" + s[3], 16),
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
let Gradient$1 = class pt extends BaseClass {
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
        _$1.isNumber(e) && (this._angle = e);
      }
    });
  }
  constructor(e = {}) {
    const t = {
      start: "black",
      end: "white",
      angle: 0
    };
    super({ ...t, ...e });
  }
  toCSS() {
    return `linear-gradient(${this.angle}deg, ${this.start}, ${this.end})`;
  }
  mix(e, t, s) {
    return pt.mix(this, e, t, s);
  }
  isEqual(e) {
    return pt.equal(this, e);
  }
  toInspect() {
    return `<${this.constructor.name} start:${this.start} end:${this.end} angle:${this.angle}>`;
  }
  static mix(e, t, s = 0.5, a) {
    s = Utils$2.clamp(s, 0, 1);
    const h = Color$1.mix(
      e.start,
      t.start,
      s,
      !1,
      a
    ), u = Color$1.mix(e.end, t.end, s, !1, a), p = e.angle + (t.angle - e.angle) * s;
    return new pt({ start: h, end: u, angle: p });
  }
  static random() {
    const e = Math.random() * 360, t = new Color$1({ h: e }), s = new Color$1({ h: e + 40 });
    return new pt({
      start: t,
      end: s,
      angle: Math.round(Math.random() * 360)
    });
  }
  static isGradient(e) {
    return !_$1.isEmpty(this._asPlainObject(e));
  }
  static isGradientObject(e) {
    return e instanceof pt;
  }
  static equal(e, t) {
    if (!pt.isGradient(e) || !pt.isGradient(t)) return !1;
    const s = Math.abs(e.angle - t.angle) % 360 === 0, a = Color$1.equal(e.start, t.start), h = Color$1.equal(e.end, t.end);
    return s && a && h;
  }
  static multiplyAlpha(e, t) {
    return this.isGradientObject(e) || (e = new pt(e)), new pt({
      start: e.start.multiplyAlpha(t),
      end: e.end.multiplyAlpha(t),
      angle: e.angle
    });
  }
  static _asPlainObject(e) {
    return _$1.pick(e, ["start", "end", "angle"]);
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
}), Events$6 = {
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
Events$6.PointerUp = "pointerup";
Events$6.PointerDown = "pointerdown";
Events$6.PointerOver = "pointerover";
Events$6.PointerOut = "pointerout";
Events$6.PointerMove = "pointermove";
Events$6.enableEmulatedTouchEvents = (r = !0) => {
  supportsPointerEvents || (r ? (Events$6.TouchStart = Events$6.MouseDown, Events$6.TouchEnd = Events$6.MouseUp, Events$6.TouchMove = Events$6.MouseMove, Events$6.Click = "touchend") : (Events$6.TouchStart = "touchstart", Events$6.TouchEnd = "touchend", Events$6.TouchMove = "touchmove", Events$6.Click = Utils$2.isTouch() ? "touchend" : "mouseup"));
};
Events$6.enableEmulatedTouchEvents(!Utils$2.isTouch());
supportsPointerEvents && (Events$6.MouseUp = Events$6.PointerUp, Events$6.MouseDown = Events$6.PointerDown, Events$6.MouseOver = Events$6.PointerOver, Events$6.MouseOut = Events$6.PointerOut, Events$6.MouseMove = Events$6.PointerMove, Events$6.TouchStart = Events$6.PointerDown, Events$6.TouchEnd = Events$6.PointerUp, Events$6.TouchMove = Events$6.PointerMove, Events$6.Click = Events$6.PointerUp);
Events$6.AnimationStart = "start";
Events$6.AnimationHalt = "halt";
Events$6.AnimationStop = "stop";
Events$6.AnimationEnd = "end";
Events$6.AnimationDidStart = Events$6.AnimationStart;
Events$6.AnimationDidStop = Events$6.AnimationStop;
Events$6.AnimationDidEnd = Events$6.AnimationEnd;
Events$6.StateSwitchStart = "stateswitchstart";
Events$6.StateSwitchStop = "stateswitchstop";
Events$6.StateSwitchEnd = "stateswitchend";
Events$6.StateWillSwitch = Events$6.StateSwitchStart;
Events$6.StateDidSwitch = Events$6.StateSwitchEnd;
Events$6.Scroll = "scroll";
Events$6.ImageLoaded = "imageload";
Events$6.ImageLoadError = "imageerror";
Events$6.ImageLoadCancelled = "imagecancelled";
Events$6.DeviceOrientation = "deviceorientation";
Events$6.DeviceMotion = "devicemotion";
Object.assign(Events$6, Gestures);
Events$6.touchEvent = (r) => r.touches?.[0] ?? r.changedTouches?.[0] ?? r;
Events$6.wrap = (r) => Framer.CurrentContext.domEventManager.wrap(r);
Events$6.isGesture = (r) => Object.values(Gestures).includes(r);
const interactiveEvents = [
  ...Object.values(Gestures),
  Events$6.TouchStart,
  Events$6.TouchEnd,
  Events$6.MouseUp,
  Events$6.MouseDown,
  Events$6.MouseWheel,
  Events$6.DoubleClick
];
Events$6.isInteractive = (r) => interactiveEvents.includes(r);
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
}, Defaults$1 = {
  getDefaults(r, e = {}) {
    if (!Originals[r] || !Framer.Defaults?.[r]) return {};
    const t = _$1.clone(e), s = _$1.cloneDeep(Originals[r]);
    for (const [a, h] of Object.entries(Framer.Defaults[r]))
      s[a] = _$1.isFunction(h) && !(r === "Animation" && a === "curve") ? h() : h;
    for (const [a, h] of Object.entries(s))
      t.hasOwnProperty(a) || (t[a] = h);
    return t;
  },
  setup() {
    if (window.FramerDefaults)
      for (const [r, e] of Object.entries(
        window.FramerDefaults
      ))
        Object.assign(Originals[r], e);
    return this.reset();
  },
  reset() {
    return window.Framer.Defaults = _$1.cloneDeep(Originals), window.Framer.Defaults;
  }
};
class SVG {
  static validFill(e) {
    return Color$1.validColorValue(e) || _$1.startsWith(e, "url(");
  }
  static toFill(e) {
    return _$1.startsWith(e, "url(") ? e : Color$1.toColor(e);
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
    const t = `gradient-${e.id}`;
    return e._elementGradientSVG.innerHTML = `<linearGradient id='${t}' gradientTransform='rotate(${e.gradient.angle - 90}, 0.5, 0.5)' >
	<stop offset="0" stop-color='#${e.gradient.start.toHex()}' stop-opacity='${e.gradient.start.a}' />
	<stop offset="1" stop-color='#${e.gradient.end.toHex()}' stop-opacity='${e.gradient.end.a}' />
</linearGradient>`, e.fill = `url(#${t})`;
  }
  static updateImagePatternSVG(e) {
    if (e.__constructor)
      return;
    if (!e.image) {
      e._elementImagePatternSVG != null && (e._elementImagePatternSVG.innerHTML = "");
      return;
    }
    let t = "";
    if (["fill", "fit", "contain", "cover"].includes(e.backgroundSize) && e.imageSize) {
      let a = 1, h = 1, u = 0, p = 0;
      const y = e.imageSize.width, S = e.imageSize.height, L = y / S, M = e.height * L, R = e.width / L, k = M / e.width, q = R / e.height, le = ["fill", "cover"].includes(
        e.backgroundSize
      );
      le && q > k || !le && q < k ? (h = q, p = (1 - q) / 2) : (a = k, u = (1 - k) / 2), t = `transform="translate(${u}, ${p}) scale(${a}, ${h})" `;
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
    const s = `image-pattern-${e.id}`;
    return e._elementImagePatternSVG.innerHTML = `<pattern id="${s}" width="100%" height="100%" patternContentUnits="objectBoundingBox">
	<image width="1" height="1" xlink:href=${e.image} preserveAspectRatio="none" ${t} />
</pattern>`, window.requestAnimationFrame(
      () => window.requestAnimationFrame(() => e.fill = `url(#${s})`)
    );
  }
  // Utils.delay 0.1, -> svgLayer.fill = "url(##{id})"
  static constructSVGElements(e, t, s, a) {
    const h = {};
    let u = [];
    if (t != null) {
      for (var p of Array.from(t))
        if (p instanceof SVGElement) {
          var y = p.getAttribute("name");
          if (y == null) {
            if (p instanceof SVGGElement) {
              var S = this.constructSVGElements(
                e,
                p.childNodes,
                s,
                a
              );
              _$1.extend(h, S.targets), u = u.concat(S.children);
              continue;
            }
            continue;
          }
          var L = {};
          if (L.name = y, L.parent = e, p instanceof SVGGElement) {
            var M = new a(p, L);
            u.push(M), _$1.extend(h, M.elements), p.id != null && p.id !== "" && (h[p.id] = M);
            continue;
          }
          if (p instanceof SVGPathElement || p instanceof SVGUseElement) {
            var R = new s(p, L);
            if (u.push(R), R._path.id != null && R._path.id !== "") {
              var { id: k } = R._path;
              h[k] = R;
            }
            continue;
          }
        }
    }
    return { targets: h, children: u };
  }
  static isPath(e) {
    return e instanceof Framer.SVGPath;
  }
}
const { BezierCurveAnimator: BezierCurveAnimator$1 } = require("./BezierCurveAnimator"), {
  computeDerivedCurveOptions,
  computeDuration,
  computeDampingRatio
} = require("./SpringCurveValueConverter"), { SpringRK4Animator: SpringRK4Animator$1 } = require("./SpringRK4Animator"), { Defaults } = require("../Defaults"), Bezier = (...r) => function(e) {
  return e == null && (e = {}), r.length > 0 && (e.values = r), new BezierCurveAnimator$1(e);
}, BezierDefaults = {
  linear(r) {
    return r == null && (r = {}), Bezier(0, 0, 1, 1)(r);
  },
  ease(r) {
    return r == null && (r = {}), Bezier(0.25, 0.1, 0.25, 1)(r);
  },
  easeIn(r) {
    return r == null && (r = {}), Bezier(0.42, 0, 1, 1)(r);
  },
  easeOut(r) {
    return r == null && (r = {}), Bezier(0, 0, 0.58, 1)(r);
  },
  easeInOut(r) {
    return r == null && (r = {}), Bezier(0.42, 0, 0.58, 1)(r);
  }
}, Spring$1 = function(r, e, t) {
  let s = {};
  return r != null && _.isFinite(r) && (s.dampingRatio = r), e != null && (s.mass = e), t != null && (s.velocity = t), !_.isFinite(r) && typeof r == "object" && (s = r, s.damping != null && s.dampingRatio == null && (s.dampingRatio = s.damping)), s.tension == null && s.friction == null && (s = Defaults.getDefaults("Spring", s)), function(a) {
    let h;
    if (s.dampingRatio != null) {
      h = a?.time != null ? a?.time : 1;
      const p = computeDerivedCurveOptions(
        s.dampingRatio,
        h,
        s.velocity,
        s.mass
      );
      s = _.defaults(p, s);
    } else
      a != null && delete a.time;
    a = _.defaults(s, a);
    const u = new SpringRK4Animator$1(a);
    return h != null && (u.time = h), u;
  };
};
_.assign(Bezier, BezierDefaults);
Spring$1.computeDerivedCurveOptions = computeDerivedCurveOptions;
Spring$1.computeDuration = computeDuration;
Spring$1.computeDampingRatio = computeDampingRatio;
const parseFunction = function(r) {
  let e;
  if (!_.isString(r))
    return null;
  let s = /.*(Spring|Bezier)(?:\(\s*{?([\w:\s,.]*)}?\s*\)|\.(\w+))?/.exec(r);
  if (s == null)
    return null;
  let [a, h, u, p] = Array.from(s);
  const y = { name: h, property: null, arguments: null };
  if (p != null)
    return y.property = p, y;
  if (u == null)
    return y;
  u.length === 0 && (y.arguments = []);
  const S = /\s*([\w]+)\s*:\s*([\d.]+)\s*,?/g, L = {};
  for (; s = S.exec(u); ) {
    let k;
    [a, k, e] = Array.from(s), e = parseFloat(e), isNaN(e) || (L[k] = e);
  }
  if (_.size(L) > 0)
    return y.arguments = L, y;
  const M = /\s*([.\d]+)\s*/g, R = [];
  for (; s = M.exec(u); )
    [a, e] = Array.from(s), e = parseFloat(e), R.push(e);
  return y.arguments = R, y;
}, fromDefinition = function(r) {
  if (r == null)
    return null;
  const e = Framer.Curves[r.name];
  return e == null ? null : r.property != null ? e[r.property] : r.arguments == null ? e : _.isArray(r.arguments) ? e(...Array.from(r.arguments || [])) : e(r.arguments);
}, fromString = (r) => {
  if (!_.isString(r))
    return null;
  let e = fromDefinition(parseFunction(r));
  if (e != null)
    return e;
  e = Utils.parseFunction(r);
  const t = e.args.map(parseFloat);
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
      return Bezier(...Array.from(t || []));
    case "spring":
    case "spring-rk4":
    case "spring-dho":
      var s = _.zipWith(
        ["tension", "friction", "velocity", "tolerance"],
        t,
        [250, 25, 0, 1 / 100],
        (h, u, p) => [h, u ?? p]
      ), a = _.fromPairs(s);
      return Spring$1(a);
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
), isRelativeProperty = (r) => _$1.isString(r) && relativePropertyRE.test(r), evaluateRelativeProperty = (r, e, t) => {
  const s = relativePropertyRE.exec(t);
  if (!s) return +t;
  const [, a, h, u] = s;
  return a ? r[e] + Number(a + 1) * Number(h) : +h;
};
let Animation$1 = class Wn extends BaseClass {
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
    this.start = this.start.bind(this), this._instant = this._instant.bind(this), this._noop = this._noop.bind(this), this._start = this._start.bind(this), this.finish = this.finish.bind(this), this._update = this._update.bind(this), this._prepareUpdateValues = this._prepareUpdateValues.bind(this), this._updateValues = this._updateValues.bind(this), this._updateNumberValue = this._updateNumberValue.bind(this), this._calculateNumericObjectValue = this._calculateNumericObjectValue.bind(this), this._updateNumericObjectValue = this._updateNumericObjectValue.bind(this), this._updateColorValue = this._updateColorValue.bind(this), this._updateGradientValue = this._updateGradientValue.bind(this), this._updateShadows = this._updateShadows.bind(this), this._updateTemplateValue = this._updateTemplateValue.bind(this);
    let t = null, s = {}, a = {};
    if (arguments.length === 3 && (t = e[0], s = e[1], a = {}, s.options != null && (a = _$1.clone(s.options)), e[2] && (a = _$1.extend({}, a, e[2]))), arguments.length === 2 && (t = e[0], e[1].properties != null ? { properties: s } = e[1] : s = e[1], e[1].options != null && ({ options: a } = e[1])), arguments.length === 1 && ({ layer: t } = e[0], { properties: s } = e[0], e[0].options != null ? { options: a } = e[0] : a = e[0]), delete a.layer, delete a.properties, delete a.options, this.options = _$1.cloneDeep(Defaults$1.getDefaults("Animation", a)), super(...arguments), this._layer = t, !(t instanceof _Layer))
      throw Error("Animation: missing layer");
    this.properties = Wn.filterAnimatableProperties(s, t), s.origin && console.warn(
      "Animation.origin: please use layer.originX and layer.originY"
    ), _$1.isString(this.options.curve) && (this.options.curve = fromString(this.options.curve)), (this.options.curve === Spring$1 || this.options.curve === Bezier) && (this.options.curve = this.options.curve.call()), this._originalState = this._currentState(), this._repeatCounter = this.options.repeat;
  }
  start() {
    let e, t, s;
    this._animator = this.options.curve(this.options), this._target = this.layer, this._stateA = this._currentState(), this._stateB = {};
    for (e in this.properties)
      s = this.properties[e], this._stateA[e] !== s && (_$1.isFunction(s) ? s = s(this.layer, e) : isRelativeProperty(s) && (s = evaluateRelativeProperty(this._target, e, s)), this._stateA[e] !== s && (this._stateB[e] = s));
    if (_$1.keys(this._stateA).length === 0)
      return console.warn("Animation: nothing to animate, no animatable properties"), this._noop();
    if (_$1.isEqual(this._stateA, this._stateB))
      return console.warn(
        "Animation: nothing to animate, all properties are equal to what it is now"
      ), this._noop();
    if (_$1.keys(this._stateB).length === 0)
      return this._noop();
    const a = this._target.animatingProperties();
    for (var h in a) {
      var u = a[h];
      this._stateA.hasOwnProperty(h) && u.stop(), h === "x" && (this._stateA.hasOwnProperty("minX") || this._stateA.hasOwnProperty("midX") || this._stateA.hasOwnProperty("maxX")) && u.stop(), h === "y" && (this._stateA.hasOwnProperty("minY") || this._stateA.hasOwnProperty("midY") || this._stateA.hasOwnProperty("maxY")) && u.stop();
    }
    if (this.options.debug) {
      console.log("Animation.start");
      for (e in this._stateB)
        s = this._stateB[e], console.log(`	${e}: ${this._stateA[e]} -> ${this._stateB[e]}`);
    }
    return _$1.isFunction(this.options.onStart) && this.on(Events.AnimationStart, this.options.onStart), _$1.isFunction(this.options.onHalt) && this.on(Events.AnimationHalt, this.options.onHalt), _$1.isFunction(this.options.onStop) && this.on(Events.AnimationStop, this.options.onStop), _$1.isFunction(this.options.onEnd) && this.on(Events.AnimationEnd, this.options.onEnd), this.once("end", () => {
      if ((this._repeatCounter > 0 || this.looping) && (this.restart(), !this.looping))
        return this._repeatCounter--;
    }), this._prepareUpdateValues(), this.options.animate === !1 || this.options.instant === !0 ? t = this._instant : t = this._start, this.layer.context.addAnimation(this), this.options.delay ? this._delayTimer = Utils$2.delay(this.options.delay, t) : t(), !0;
  }
  stop(e) {
    return e == null && (e = !0), this._delayTimer != null && (Framer.CurrentContext.removeTimer(this._delayTimer), this._delayTimer = null), this.layer.context.removeAnimation(this), e && this.emit(Events.AnimationHalt), e && this.emit(Events.AnimationStop), Framer.Loop.off("update", this._update);
  }
  reverse() {
    const e = _$1.clone(this._originalState);
    for (var t in this.properties) {
      var s = this.properties[t];
      SVG.isPath(s) && (s.reversed = !s.reversed, e[t] = s);
    }
    const a = _$1.clone(this.options);
    return new Wn(this.layer, e, a);
  }
  reset() {
    return (() => {
      const e = [];
      for (var t in this._stateA) {
        var s = this._stateA[t];
        e.push(this._target[t] = s);
      }
      return e;
    })();
  }
  restart() {
    return this.reset(), this.start();
  }
  copy() {
    const e = _$1.clone(this.properties), t = _$1.clone(this.options);
    return new Wn(this.layer, e, t);
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
    return _$1.keys(this._stateA);
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
      for (var t in this._stateB) {
        var s = this._stateB[t];
        if (SVG.isPath(s)) {
          var a = s, h = null;
          switch (t) {
            case "x":
            case "minX":
            case "midX":
            case "maxX":
            case "width":
              h = "horizontal";
              break;
            case "y":
            case "minY":
            case "midY":
            case "maxY":
            case "height":
              h = "vertical";
              break;
            case "rotation":
            case "rotationZ":
            case "rotationX":
            case "rotationY":
              h = "angle";
              break;
          }
          e.push(
            this._valueUpdaters[t] = a.valueUpdater(
              h,
              this._target,
              this._target[t]
            )
          );
        } else Color.isColorObject(s) || Color.isColorObject(this._stateA[t]) ? e.push(this._valueUpdaters[t] = this._updateColorValue) : Gradient.isGradient(s) || Gradient.isGradient(this._stateA[t]) ? (this._valueUpdaters[t] = this._updateGradientValue, e.push(
          this._stateA[t] != null ? this._stateA[t] : this._stateA[t] = Gradient.multiplyAlpha(s, 0)
        )) : t === "borderWidth" ? e.push(
          this._valueUpdaters[t] = this._updateNumericObjectValue.bind(
            this,
            ["top", "left", "bottom", "right"]
          )
        ) : t === "borderRadius" ? e.push(
          this._valueUpdaters[t] = this._updateNumericObjectValue.bind(
            this,
            ["topLeft", "topRight", "bottomRight", "bottomLeft"]
          )
        ) : t === "template" ? e.push(this._valueUpdaters[t] = this._updateTemplateValue) : t === "shadows" ? e.push(this._valueUpdaters[t] = this._updateShadows) : e.push(this._valueUpdaters[t] = this._updateNumberValue);
      }
      return e;
    })();
  }
  _updateValues(e) {
    const t = e - this._previousValue;
    this._previousValue = e;
    for (var s in this._stateB)
      this._stateB[s], this._valueUpdaters[s](s, e, t);
    return null;
  }
  _updateNumberValue(e, t) {
    return this._target[e] = Utils$2.mapRange(
      t,
      0,
      1,
      this._stateA[e],
      this._stateB[e]
    );
  }
  _interpolateNumericObjectValues(e, t, s, a, h) {
    h == null && (h = !0);
    let u = {};
    for (var p of Array.from(e)) {
      var y = _$1.isNumber(t) ? t : t?.[p], S = _$1.isNumber(s) ? s : s?.[p];
      y == null && (y = S), S == null && (S = y), u[p] = Utils$2.mapRange(a, 0, 1, y, S);
    }
    return h && _$1.uniq(_$1.values(u)).length === 1 && (u = u[e[0]]), u;
  }
  _calculateNumericObjectValue(e, t, s, a) {
    a == null && (a = !0);
    const h = this._stateA[t], u = this._stateB[t];
    return this._interpolateNumericObjectValues(
      e,
      h,
      u,
      s,
      a
    );
  }
  _updateNumericObjectValue(e, t, s, a) {
    a == null && (a = !0);
    const h = this._calculateNumericObjectValue(
      e,
      t,
      s,
      a
    );
    return this._target[t] = h;
  }
  _updateColorValue(e, t) {
    return this._target[e] = Color.mix(
      this._stateA[e],
      this._stateB[e],
      t,
      !1,
      this.options.colorModel
    );
  }
  _updateGradientValue(e, t) {
    if (!this._stateB[e] && t === 1) {
      this._target[e] = this._stateB[e];
      return;
    }
    const s = Gradient._asPlainObject(this._stateA[e]), a = Gradient._asPlainObject(
      this._stateB[e] != null ? this._stateB[e] : Gradient.multiplyAlpha(s, 0)
    );
    return this._target[e] = Gradient.mix(
      _$1.defaults(s, a),
      _$1.defaults(a, s),
      t,
      this.options.colorModel
    );
  }
  _updateShadows(e, t) {
    if (t === 1) {
      this._target[e] = this._stateB[e];
      return;
    }
    const s = [], a = Math.max(
      (this._stateA[e] != null ? this._stateA[e].length : void 0) != null ? this._stateA[e] != null ? this._stateA[e].length : void 0 : 0,
      (this._stateB[e] != null ? this._stateB[e].length : void 0) != null ? this._stateB[e] != null ? this._stateB[e].length : void 0 : 0
    );
    for (let S = 0, L = a, M = 0 <= L; M ? S < L : S > L; M ? S++ : S--) {
      var h, u = this._stateA[e] != null ? this._stateA[e][S] : void 0, p = this._stateB[e] != null ? this._stateB[e][S] : void 0;
      if (!(p == null && u == null)) {
        var y = (h = p?.type != null ? p?.type : u?.type) != null ? h : Framer.Defaults.Shadow.type;
        u == null && (u = _$1.defaults({ color: null, type: y }, Framer.Defaults.Shadow)), p == null && (p = _$1.defaults({ color: null, type: y }, Framer.Defaults.Shadow)), _$1.defaults(u, Framer.Defaults.Shadow), _$1.defaults(p, Framer.Defaults.Shadow), s[S] = this._interpolateNumericObjectValues(
          ["x", "y", "blur", "spread"],
          u,
          p,
          t,
          !1
        ), s[S].color = Color.mix(
          u.color,
          p.color,
          t,
          !1,
          this.options.colorModel
        ), s[S].type = y;
      }
    }
    return this._target[e] = s;
  }
  // shallow mix all end state `{key: value}`s if `value` is a number, otherwise just takes `value`
  _updateTemplateValue(e, t) {
    let s, a, h;
    const u = this._stateA[e], p = this._stateB[e], y = {};
    if (!_$1.isObject(p)) {
      if (s = this._target._styledText != null ? this._target._styledText.buildTemplate() : void 0, !s)
        return;
      h = p, _$1.isNumber(h) && (a = _$1.isObject(u) ? u[s] : u, _$1.isNumber(a) || (a = 0), h = Utils$2.mapRange(t, 0, 1, a, h)), y[s] = h, this._target.template = y;
      return;
    }
    for (s in p)
      h = p[s], _$1.isNumber(h) && (a = _$1.isObject(u) ? u[s] : u, _$1.isNumber(a) || (a = 0), h = Utils$2.mapRange(t, 0, 1, a, h)), y[s] = h;
    return this._target.template = y;
  }
  _currentState() {
    return _$1.pick(this.layer, _$1.keys(this.properties));
  }
  static isAnimatable(e) {
    return _$1.isNumber(e) || _$1.isFunction(e) || isRelativeProperty(e) || Color.isColorObject(e) || Gradient.isGradientObject(e) || SVG.isPath(e);
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
  static filterAnimatableProperties(e, t) {
    const s = {};
    for (var a in e) {
      var h, u = e[a];
      if (["frame", "size", "point", "midPoint", "path"].includes(a)) {
        var p, y;
        switch (a) {
          case "frame":
            y = ["x", "y", "width", "height"];
            break;
          case "size":
            y = ["width", "height"];
            break;
          case "point":
            y = ["x", "y"];
            break;
          case "midPoint":
            y = ["midX", "midY"];
            break;
          case "path":
            y = ["x", "y", "rotation"];
            break;
          default:
            y = [];
        }
        if (SVG.isPath(u)) {
          a === "path" && (t.midPoint = u.start);
          for (p of Array.from(y))
            s[p] = u;
        } else if (_$1.isObject(u))
          _$1.defaults(s, _$1.pick(u, y));
        else if (_$1.isNumber(u))
          for (p of Array.from(y))
            s[p] = u;
      } else if (this.isAnimatable(u))
        s[a] = u;
      else if (Color.isValidColorProperty(a, u))
        s[a] = new Color(u);
      else if (this.isAnimatableKey(a))
        s[a] = u;
      else if (h = a.match(/^shadow([1-9])$/)) {
        if (s.shadows == null) {
          var S;
          s.shadows = (S = _$1.clone(t.shadows)) != null ? S : [];
        }
        var L = parseInt(h[1]) - 1;
        s.shadows[L] != null && _$1.defaults(u, s.shadows[L]), s.shadows[L] = u;
      }
    }
    return s;
  }
  toInspect() {
    return `<${this.constructor.name} id:${this.id} layer:${this.layer != null ? this.layer.toName() : void 0} [${_$1.keys(this.properties).join(", ")}] isAnimating:${this.isAnimating}>`;
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
const filterFormat = function(r, e, t, s) {
  return t === "px" && (e *= s), `${r}(${Utils.round(e, 2)}${t})`;
}, roundToZero = function(r) {
  return -1e-6 < r && r < 1e-6 ? 0 : r;
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
}, getShadowStrings = function(r, e, t) {
  _.isArray(e) || (e = [e]);
  const s = [];
  if (r.shadows != null) {
    for (var a of Array.from(r.shadows))
      if (a !== null && (a = _.defaults(_.clone(a), Framer.Defaults.Shadow), a.type === "inner" ? a.type = "inset" : a.type === "outer" && (r.image != null && r.image !== "" ? a.type = "drop" : a.type = "box"), !(!Array.from(e).includes(a.type) || a.x === 0 && a.y === 0 && a.blur === 0 && a.spread === 0))) {
        a.color === null && (a.color = new Color(null));
        var h = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier, u = t(a, h);
        s.push(u);
      }
  }
  return s;
}, LayerStyle = {
  width(r) {
    r._updateHTMLScale();
    const e = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return r._properties.width * e + "px";
  },
  height(r) {
    r._updateHTMLScale();
    const e = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return r._properties.height * e + "px";
  },
  display(r) {
    return r._properties.visible === !0 ? "block" : "none";
  },
  opacity(r) {
    return r._properties.opacity;
  },
  webkitTransformStyle(r) {
    return r._properties.flat ? "flat" : "preserve-3d";
  },
  webkitBackfaceVisibility(r) {
    return r._properties.backfaceVisible ? "visible" : "hidden";
  },
  overflow(r) {
    return r._properties.scrollHorizontal === !0 || r._properties.scrollVertical === !0 ? "auto" : r._properties.clip === !0 ? "hidden" : "visible";
  },
  overflowX(r) {
    return r._properties.scrollHorizontal === !0 ? "scroll" : r._properties.clip === !0 ? "hidden" : "visible";
  },
  overflowY(r) {
    return r._properties.scrollVertical === !0 ? "scroll" : r._properties.clip === !0 ? "hidden" : "visible";
  },
  zIndex(r) {
    return r._properties.index;
  },
  webkitFilter(r) {
    let e = [];
    const t = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    for (var [s, a, h, u] of Array.from(
      _WebkitProperties
    ))
      if (r._properties.hasOwnProperty(a) && r[a] !== h) {
        var p = filterFormat(s, r[a], u, t);
        e.push(p);
      }
    const y = getShadowStrings(
      r,
      "drop",
      (S, L) => `drop-shadow(${S.x * L}px ${S.y * L}px ${S.blur * L}px ${S.color})`
    );
    return e = e.concat(y), e.join(" ");
  },
  webkitBackdropFilter(r) {
    const e = [], t = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    for (var [s, a, h, u] of Array.from(
      _BackdropProperties
    ))
      if (r._properties.hasOwnProperty(a) && r[a] !== h) {
        var p = filterFormat(s, r[a], u, t);
        e.push(p);
      }
    return e.join(" ");
  },
  webkitTransform(r) {
    if (r._prefer2d || r._properties.force2d)
      return exports.LayerStyle.webkitTransformForce2d(r);
    const e = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return `translate3d( ${roundToZero(r._properties.x * e)}px, ${roundToZero(r._properties.y * e)}px, ${roundToZero(r._properties.z * e)}px) scale3d( ${roundToZero(r._properties.scaleX * r._properties.scale)}, ${roundToZero(r._properties.scaleY * r._properties.scale)}, ${roundToZero(r._properties.scaleZ)}) skew(${roundToZero(r._properties.skew)}deg,${roundToZero(
      r._properties.skew
    )}deg) skewX(${roundToZero(r._properties.skewX)}deg) skewY(${roundToZero(r._properties.skewY)}deg) translateZ(${roundToZero(r._properties.originZ * e)}px) rotateX(${roundToZero(r._properties.rotationX)}deg) rotateY(${roundToZero(r._properties.rotationY)}deg) rotateZ(${roundToZero(r._properties.rotationZ)}deg) translateZ(${roundToZero(-r._properties.originZ * e)}px)`;
  },
  webkitTransformForce2d(r) {
    const e = [];
    for (var t in _Force2DProperties) {
      var s = _Force2DProperties[t];
      r._properties[t] !== s && console.warn(
        `Layer property '${t}'' will be ignored with force2d enabled`
      );
    }
    const a = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return e.push(
      `translate(${roundToZero(r._properties.x * a)}px,${roundToZero(
        r._properties.y * a
      )}px)`
    ), e.push(
      `scale(${roundToZero(
        r._properties.scaleX * r._properties.scale
      )},	${roundToZero(r._properties.scaleY * r._properties.scale)})`
    ), e.push(
      `skew(${roundToZero(r._properties.skew)}deg,${roundToZero(
        r._properties.skew
      )}deg)`
    ), e.push(`rotate(${roundToZero(r._properties.rotationZ)}deg)`), e.join(" ");
  },
  webkitTransformOrigin(r) {
    return `${r._properties.originX * 100}% ${r._properties.originY * 100}%`;
  },
  webkitPerspective(r) {
    let e;
    const t = (e = Utils.webkitPerspectiveForValue(r._properties.perspective)) != null ? e : "";
    if (_.isNumber(t)) {
      const s = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
      return `${t * s}`;
    } else
      return t;
  },
  webkitPerspectiveOrigin(r) {
    return `${r._properties.perspectiveOriginX * 100}% ${r._properties.perspectiveOriginY * 100}%`;
  },
  mixBlendMode(r) {
    let e;
    return e = r._properties.blending, Array.from(_.values(Blending)).includes(e) ? r._properties.blending : "";
  },
  pointerEvents(r) {
    return r._properties.ignoreEvents ? "none" : "auto";
  },
  boxShadow(r) {
    return getShadowStrings(
      r,
      ["box", "inset"],
      function(t, s) {
        return `${t.type === "inset" ? "inset " : ""}${t.x * s}px ${t.y * s}px ${t.blur * s}px ${t.spread * s}px ${t.color}`;
      }
    ).join(", ");
  },
  textShadow(r) {
    return getShadowStrings(
      r,
      "text",
      (t, s) => `${t.x * s}px ${t.y * s}px ${t.blur * s}px ${t.color}`
    ).join(", ");
  },
  backgroundColor(r) {
    return r._properties.backgroundColor;
  },
  backgroundSize(r) {
    switch (r._properties.backgroundSize) {
      case "fill":
        return "cover";
      case "fit":
        return "contain";
      case "stretch":
        return "100% 100%";
    }
    return r._properties.backgroundSize;
  },
  fill(r) {
    return r._properties.fill;
  },
  strokeWidth(r) {
    const e = r.strokeWidthMultiplier != null ? r.strokeWidthMultiplier : 1;
    return r._properties.strokeWidth * e;
  },
  strokeDasharray(r) {
    return r._properties.strokeDasharray.join(",");
  },
  color(r) {
    return r._properties.color;
  },
  borderRadius(r) {
    const e = r._properties.borderRadius, t = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return _.isNumber(e) ? e * t + "px" : _.isObject(r._properties.borderRadius) ? (e.topLeft != null ? e.topLeft : 0) * t + "px " + (e.topRight != null ? e.topRight : 0) * t + "px " + (e.bottomRight != null ? e.bottomRight : 0) * t + "px " + (e.bottomLeft != null ? e.bottomLeft : 0) * t + "px" : r._properties.borderRadius;
  },
  borderWidth(r) {
    let e;
    const { borderWidth: t } = r._properties, s = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    if (_.isNumber(t)) {
      let a;
      const h = ((e = Math.min(t, r.height / 2)) != null ? e : 0) * s, u = ((a = Math.min(t, r.width / 2)) != null ? a : 0) * s;
      return h + "px " + u + "px " + h + "px " + u + "px";
    }
    if (_.isObject(t)) {
      let a = t.top != null ? t.top : 0, h = t.bottom != null ? t.bottom : 0, u = t.left != null ? t.left : 0, p = t.right != null ? t.right : 0;
      if (a + h > r.height) {
        const y = a / (a + h);
        a = Math.round(y * r.height), h = r.height - a;
      }
      if (u + p > r.width) {
        const y = u / (u + p);
        u = Math.round(y * r.width), p = r.width - u;
      }
      return a * s + "px " + p * s + "px " + h * s + "px " + u * s + "px";
    }
    return t;
  },
  fontSize(r) {
    return r._properties.fontSize + "px";
  },
  letterSpacing(r) {
    return r._properties.letterSpacing + "px";
  },
  wordSpacing(r) {
    return r._properties.wordSpacing + "px";
  },
  textIndent(r) {
    return r._properties.textIndent + "px";
  },
  textAlign(r) {
    const e = r._properties.textAlign;
    return e === Align.left ? "left" : e === Align.center ? "center" : e === Align.right ? "right" : e;
  },
  direction(r) {
    const e = r._properties.direction;
    switch (e) {
      case "right-to-left":
        return "rtl";
      case "left-to-right":
        return "ltr";
      default:
        return e;
    }
  },
  padding(r) {
    const e = Utils.rectZero(Utils.parseRect(r.padding)), t = r._pixelMultiplierOverride != null ? r._pixelMultiplierOverride : r.context.pixelMultiplier;
    return `${e.top * t}px ${e.right * t}px ${e.bottom * t}px ${e.left * t}px`;
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
        return _$1.last(this._previousNames) || "default";
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
  constructor(e, t) {
    super(), this._layer = e, this._states = t, this.reset();
  }
  switchInstant(e) {
    return this.switchTo(e, { instant: !0 });
  }
  switchTo(e, t = {}) {
    if (!this.states[e])
      throw new Error(`No such state: '${e}'`);
    e === "previous" && (e = this.previousName);
    const s = { ...this.states[e] };
    let a = { ...t };
    s.animationOptions && (a = { ...s.animationOptions, ...a }, delete s.animationOptions);
    const h = this.currentName, u = e, p = a.start ?? !0;
    a.start = !1;
    const y = this.layer.animate(s, a);
    let S = !1;
    const L = () => {
      S || (S = !0, this._previousNames.push(h), this._currentName = u);
    }, M = () => {
      this.emit(Events$6.StateSwitchStart, h, u, this), L();
    }, R = () => {
      this.emit(Events$6.StateSwitchStop, h, u, this);
    }, k = () => {
      const q = _$1.difference(
        Object.keys(s),
        Object.keys(y.properties)
      );
      for (const le of q)
        this.layer[le] = s[le];
      this.emit(Events$6.StateSwitchEnd, h, u, this);
    };
    return y.on(Events$6.AnimationStart, M), y.on(Events$6.AnimationStop, R), y.on(Events$6.AnimationEnd, k), p && (y.start() || (M(), R(), k())), L(), y;
  }
  next(e = this.stateNames) {
    return Utils$2.arrayNext(e, this.currentName);
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
const LayerStatesIgnoredKeys = ["ignoreEvents", "name", "id"], reservedStateError = function(r) {
  throw Error(`The state '${r}' is a reserved name.`);
}, deprecatedWarning = function(r, e) {
  let t = `layer.states.${r} is deprecated`;
  return e != null && (t += `, use '${e}' instead.`), console.warn(t);
}, namedState = (r, e) => _$1.extend({}, { name: e }, r), LayerStates = (function() {
  let r, e;
  return LayerStates = class Fa {
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
      }), r = function(s) {
        return this[s] = Fa.filterStateProperties(
          this.machine.layer.props
        );
      }, this.defineReserved("capture", {
        get() {
          return r;
        }
      }), e = {
        add(s, a) {
          return a == null && (a = {}), deprecatedWarning("add", "layer.states = "), _$1.isString(s) ? this[s] = a : this.machine.layer.states = s;
        },
        remove(s) {
          return deprecatedWarning("remove", "delete layer.states.a"), delete this[s];
        },
        switch(s, a) {
          return deprecatedWarning("switch", 'layer.animate("state")'), this.machine.switchTo(s, a);
        },
        switchInstant(s) {
          return deprecatedWarning(
            "switchInstant",
            'layer.animate("state", {instant: true})'
          ), this.machine.switchTo(s, { instant: !0 });
        },
        next(...s) {
          return deprecatedWarning("next", "layer.stateCycle()"), s = _$1.flatten(s), this.machine.layer.stateCycle(s);
        }
      }, this.defineReserved("add", {
        get() {
          return e.add;
        }
      }), this.defineReserved("remove", {
        get() {
          return e.remove;
        }
      }), this.defineReserved("switch", {
        get() {
          return e.switch;
        }
      }), this.defineReserved("switchInstant", {
        get() {
          return e.switchInstant;
        }
      }), this.defineReserved("next", {
        get() {
          return e.next;
        }
      }), this.defineReserved("animationOptions", {
        get() {
          return this.machine.layer.animationOptions;
        },
        set(s) {
          return this.machine.layer.animationOptions = s;
        }
      });
    }
    static defineReserved(s, a) {
      return a.configurable = !0, a.enumerable == null && (a.enumerable = !1), a.set == null && (a.set = () => reservedStateError(s)), Object.defineProperty(this.prototype, s, a);
    }
    constructor(s) {
      const a = new LayerStateMachine(s, this);
      Object.defineProperty(this, "machine", {
        enumerable: !1,
        configurable: !1,
        get() {
          return a;
        },
        set() {
          return reservedStateError("machine");
        }
      }), this.capture("default");
    }
    static filterStateProperties(s) {
      const a = {};
      for (var h in s) {
        var u = s[h];
        if (!Array.from(LayerStatesIgnoredKeys).includes(h)) {
          if (Color.isValidColorProperty(h, u)) {
            a[h] = new Color(u);
            continue;
          }
          if (Gradient.isGradient(u)) {
            a[h] = u;
            continue;
          }
          this._isValidProperty(h, u) && (a[h] = u);
        }
      }
      return a;
    }
    static _isValidProperty(s, a) {
      return !!(_$1.isNumber(a) || _$1.isFunction(a) || _$1.isBoolean(a) || _$1.isString(a) || Color.isColorObject(a) || Gradient.isGradient(a) || a === null || __guard__$4(a?.constructor, (h) => h.name) === "Layer" || ["template", "shadows"].includes(s));
    }
  }, LayerStates.initClass(), LayerStates;
})();
function __guard__$4(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
class Simulator extends BaseClass {
  static initClass() {
    this.define("state", {
      get() {
        return _$1.clone(this._state);
      },
      set(e) {
        return this._state = _$1.clone(e);
      }
    });
  }
  constructor(e) {
    e == null && (e = {}), this._state = { x: 0, v: 0 }, this.options = null, this.setup(e);
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
class Integrator {
  static initClass() {
  }
  constructor(e) {
    this._accelerationForState = e, _$1.isFunction(this._accelerationForState) || (console.warn(
      "Integrator: an integrator must be constructed with an acceleration function"
    ), this._accelerationForState = () => 0);
  }
  integrateState(e, t) {
    const s = this._evaluateState(e), a = this._evaluateStateWithDerivative(e, t * 0.5, s), h = this._evaluateStateWithDerivative(e, t * 0.5, a), u = this._evaluateStateWithDerivative(e, t, h), p = 1 / 6 * (s.dx + 2 * (a.dx + h.dx) + u.dx), y = 1 / 6 * (s.dv + 2 * (a.dv + h.dv) + u.dv);
    return e.x += p * t, e.v += y * t, e;
  }
  _evaluateState(e) {
    return {
      dx: e.v,
      dv: this._accelerationForState(e)
    };
  }
  _evaluateStateWithDerivative(e, t, s) {
    const a = {
      x: e.x + s.dx * t,
      v: e.v + s.dv * t
    };
    return {
      dx: a.v,
      dv: this._accelerationForState(a)
    };
  }
}
class SpringSimulator extends Simulator {
  constructor(...e) {
    this.finished = this.finished.bind(this), super(...e);
  }
  setup(e) {
    return this.options = Defaults$1.getDefaults("SpringSimulator", e), this.options = _.defaults(e, {
      velocity: 0,
      position: 0,
      offset: 0
    }), this._state = {
      x: this.options.position,
      v: this.options.velocity
    }, this._integrator = new Integrator((t) => -this.options.tension * t.x - this.options.friction * t.v);
  }
  next(e) {
    return this._state = this._integrator.integrateState(this._state, e), this.getState();
  }
  finished() {
    const e = Math.abs(this._state.x) < this.options.tolerance, t = Math.abs(this._state.v) < this.options.tolerance;
    return e && t;
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
    return this.options = Defaults$1.getDefaults("FrictionSimulator", e), this.options = _.defaults(e, {
      velocity: 0,
      position: 0
    }), this._state = {
      x: this.options.position,
      v: this.options.velocity
    }, this._integrator = new Integrator((t) => -(this.options.friction * t.v));
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
    return this.options = Defaults$1.getDefaults("MomentumBounceSimulator", e), this.options = _.defaults(e, {
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
      let t;
      return this._state.x <= this.options.min && (t = this.options.min), this._state.x >= this.options.max && (t = this.options.max), this._transitionToSpring(t);
    }
  }
  // If the position is outside the min and max bounds, and traveling
  // further away, then transition from friction to spring simulation
  _tryTransitionToSpring(e) {
    const t = this._state.x < this.options.min && this._state.v <= 0, s = this._state.x > this.options.max && this._state.v >= 0;
    if (t || s) {
      let a;
      return t && (a = this.options.min), s && (a = this.options.max), this._transitionToSpring(a);
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
    const t = this._state.x < this.options.min && this._state.v > 0, s = this._state.x > this.options.max && this._state.v < 0;
    let a = !1;
    if (t ? (e = this.options.min, a = !0) : s && (e = this.options.max, a = !0), a) {
      const { friction: h } = this._frictionSimulator.options;
      return 1 - h * (e - this._state.x) / this._state.v > 0;
    }
    return !0;
  }
}
const Events$5 = {
  ...Events$6,
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
    const t = SimulatorClasses[this.options.model] || SpringSimulator;
    this._simulator = new t(this.options.modelOptions);
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
    const e = this.animatingProperties(), t = this.layer.animatingProperties();
    for (const s in t)
      e.includes(s) && t[s].stop();
    return this.options.delay ? Utils$2.delay(this.options.delay, this._start) : this._start(), !0;
  }
  stop(e = !0) {
    if (this._running)
      return this._running = !1, this.layer.context.removeAnimation(this), e && this.emit(Events$5.SimulationStop), Framer.Loop.off("update", this._update);
  }
  emit(e, ...t) {
    super.emit(e, ...t), this.layer?.emit(e, this, ...t);
  }
  _start() {
    this._running || (this._running = !0, this.layer.context.addAnimation(this), this.emit(Events$5.SimulationStart), Framer.Loop.on("update", this._update));
  }
  _update(e) {
    if (this._simulator.finished())
      this.stop(!1), this.emit("end"), this.emit(Events$5.SimulationStop);
    else {
      const t = this._simulator.next(e);
      this.emit(Events$5.SimulationStep, t, e);
    }
  }
  finished() {
    return this._simulator.finished();
  }
}
Simulation.initClass();
const Events$4 = {
  ...Events$6,
  EventBufferReset: "eventbufferreset",
  EventBufferUpdated: "eventbufferupdated"
};
class EventBuffer extends BaseClass {
  constructor(e = {}) {
    super(), this.options = _$1.defaults(e, { velocityTimeout: 100 }), this._events = [];
  }
  // Computed properties
  get length() {
    return this._events.length;
  }
  get first() {
    return this._events[0];
  }
  get events() {
    const e = (Utils$2.getTime?.() ?? Date.now()) - this.options.velocityTimeout;
    return _$1.filter(this._events, (t) => t.t > e);
  }
  get offset() {
    const e = this.events;
    if (e.length < 2) return { x: 0, y: 0 };
    const t = e[e.length - 1], s = e[0];
    return {
      x: t.x - s.x,
      y: t.y - s.y
    };
  }
  get angle() {
    const e = this.events;
    if (e.length < 2) return 0;
    const t = e[0], s = e[1];
    return Math.atan2(s.y - t.y, s.x - t.x) * 180 / Math.PI;
  }
  get velocity() {
    const e = this.events;
    if (e.length < 2) return { x: 0, y: 0 };
    const t = e[e.length - 1], s = e[0], a = t.t - s.t;
    let h = {
      x: (t.x - s.x) / a,
      y: (t.y - s.y) / a
    };
    return isFinite(h.x) || (h.x = 0), isFinite(h.y) || (h.y = 0), h;
  }
  // Methods
  push(e) {
    this._events.push(e), this.emit(Events$4.EventBufferUpdated, e);
  }
  reset() {
    this._events.length = 0, this.emit(Events$4.EventBufferReset);
  }
  // Simple emit helper (if BaseClass doesn't already have it)
  emit(e, t) {
    typeof this.onEvent == "function" && this.onEvent(e, t);
  }
}
const Events$3 = {
  ...Events$6,
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
        if (e && _$1.isObject(e) ? (e = _$1.pick(e, ["x", "y", "width", "height"]), e = _$1.defaults(e, { x: 0, y: 0, width: 0, height: 0 }), this._constraints = e) : this._constraints = { x: 0, y: 0, width: 0, height: 0 }, this._constraints)
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
        const { minX: e, maxX: t, minY: s, maxY: a } = this._calculateConstraints(
          this.constraints
        ), { point: h } = this.layer, u = {
          x: Utils$2.clamp(h.x, e, t),
          y: Utils$2.clamp(h.y, s, a)
        };
        return {
          x: h.x - u.x,
          y: h.y - u.y
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
          const t = this._lastEvent != null ? this._lastEvent.delta : void 0;
          return t ? Math.abs(t.x) > Math.abs(t.y) ? t.x > 0 ? "right" : "left" : t.y > 0 ? "down" : "up" : null;
        }
        return Math.abs(e.x) > Math.abs(e.y) ? e.x > 0 ? "right" : "left" : e.y > 0 ? "down" : "up";
      }
    });
  }
  constructor(e) {
    this.panStart = this.panStart.bind(this), this.touchStart = this.touchStart.bind(this), this.tapStart = this.tapStart.bind(this), this._updateLayerPosition = this._updateLayerPosition.bind(this), this._panStart = this._panStart.bind(this), this._panMove = this._panMove.bind(this), this._tapEnd = this._tapEnd.bind(this), this._panEnd = this._panEnd.bind(this), this._onSimulationStep = this._onSimulationStep.bind(this), this._onSimulationStop = this._onSimulationStop.bind(this), this._stopSimulation = this._stopSimulation.bind(this), this.layer = e;
    const t = Defaults$1.getDefaults("LayerDraggable", {});
    super(t), _$1.extend(this, t), this.enabled = !0, this._eventBuffer = new EventBuffer(), this._constraints = null, this._ignoreUpdateLayerPosition = !0, this.attach();
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
        (t) => t.cancelTap = !0
      ), this._panStart(e);
  }
  _updateLayerPosition() {
    if (this._ignoreUpdateLayerPosition !== !0)
      return this._point = this.layer.point;
  }
  _panStart(e) {
    if (!this.enabled)
      return;
    LayerDraggable._globalDidDrag = !1, Events$3.wrap(document).addEventListener(Gestures.Pan, this._panMove), Events$3.wrap(document).addEventListener(Gestures.TapEnd, this._tapEnd), this._isMoving = this._isAnimating;
    for (var t of Array.from(this.layer.animations())) {
      var { properties: s } = t;
      (s.hasOwnProperty("x") || s.hasOwnProperty("y")) && t.stop();
    }
    this._stopSimulation(), this._resetdirectionLock(), e.preventDefault(), this.propagateEvents === !1 && e.stopPropagation();
    const a = Events$3.touchEvent(e);
    return this._eventBuffer.push({
      x: a.clientX,
      y: a.clientY,
      t: Date.now()
    }), this._layerStartPoint = this.layer.point, this._correctedLayerStartPoint = this.layer.point, this.constraints && this.bounce && (this._correctedLayerStartPoint = this._constrainPosition(
      this._correctedLayerStartPoint,
      this.constraints,
      1 / this.overdragScale
    )), this._cursorStartPoint = {
      x: a.clientX,
      y: a.clientY
    }, this._layerCursorOffset = {
      x: a.clientX - this._correctedLayerStartPoint.x,
      y: a.clientY - this._correctedLayerStartPoint.y
    }, this._point = this._correctedLayerStartPoint, this._ignoreUpdateLayerPosition = !1, this.emit(Events$3.DragSessionStart, e);
  }
  _panMove(e) {
    if (!this.enabled)
      return;
    this._point || this.touchStart(e), e.preventDefault(), this.propagateEvents === !1 && e.stopPropagation();
    const t = Events$3.touchEvent(e);
    this._lastEvent = t, this._eventBuffer.push({
      x: t.clientX,
      y: t.clientY,
      t: Date.now()
    });
    let s = _$1.clone(this._point);
    if (this.horizontal && (s.x = this._point.x + e.delta.x * this.speedX * (1 / this.layer.screenScaleX(!1))), this.vertical && (s.y = this._point.y + e.delta.y * this.speedY * (1 / this.layer.screenScaleY(!1))), this._point = _$1.clone(s), this._constraints && (s = this._constrainPosition(
      s,
      this._constraints,
      this.overdragScale
    )), this.directionLock)
      if (!this._directionLockEnabledX && !this._directionLockEnabledY) {
        const { offset: a } = e;
        a.x = a.x * this.speedX * (1 / this.layer.canvasScaleX()) * this.layer.scaleX * this.layer.scale, a.y = a.y * this.speedY * (1 / this.layer.canvasScaleY()) * this.layer.scaleY * this.layer.scale, this._updatedirectionLock(a);
        return;
      } else
        this._directionLockEnabledX && (s.x = this._layerStartPoint.x), this._directionLockEnabledY && (s.y = this._layerStartPoint.y);
    return (s.x !== this._layerStartPoint.x || s.y !== this._layerStartPoint.y) && (LayerDraggable._globalDidDrag = !0, this._isDragging || (this._isDragging = !0, this._isMoving = !0, this.emit(Events$3.DragStart, e))), this.isDragging && this.emit(Events$3.DragWillMove, e), this.pixelAlign && (this.horizontal && (s.x = Math.round(s.x)), this.vertical && (s.y = Math.round(s.y))), this._ignoreUpdateLayerPosition = !0, this.layer.point = this.updatePosition(s), this._ignoreUpdateLayerPosition = !1, this.isDragging && (this.emit(Events$3.Move, this.layer.point), this.emit(Events$3.DragDidMove, e)), this.emit(Events$3.DragSessionMove, e);
  }
  _tapEnd(e) {
    return this._panEnd(e);
  }
  _panEnd(e) {
    if (this.enabled)
      return LayerDraggable._globalDidDrag = !1, Events$3.wrap(document).removeEventListener(Gestures.Pan, this._panMove), Events$3.wrap(document).removeEventListener(Gestures.TapEnd, this._tapEnd), e.stopPropagation(), this.propagateEvents === !1 && e.stopPropagation(), this._startSimulation(), this.emit(Events$3.DragSessionEnd, e), this._isDragging && this.emit(Events$3.DragEnd, e), this._isDragging = !1, this._isMoving = this._isAnimating, this._ignoreUpdateLayerPosition = !0, this._lastEvent = null, this._eventBuffer.reset();
  }
  _clampAndScale(e, t, s, a) {
    return e < t && (e = t + (e - t) * a), e > s && (e = s + (e - s) * a), e;
  }
  _calculateConstraints(e) {
    let t;
    return e ? (e.width < this.layer.width && (e.width = this.layer.width), e.height < this.layer.height && (e.height = this.layer.height), t = {
      minX: Utils$2.frameGetMinX(e),
      maxX: Utils$2.frameGetMaxX(e),
      minY: Utils$2.frameGetMinY(e),
      maxY: Utils$2.frameGetMaxY(e)
    }, t.maxX -= this.layer.width, t.maxY -= this.layer.height, t) : t = {
      minX: 1 / 0,
      maxX: 1 / 0,
      minY: 1 / 0,
      maxY: 1 / 0
    };
  }
  _constrainPosition(e, t, s) {
    let a;
    const { minX: h, maxX: u, minY: p, maxY: y } = this._calculateConstraints(
      this._constraints
    );
    return this.overdrag ? a = {
      x: this._clampAndScale(e.x, h, u, s),
      y: this._clampAndScale(e.y, p, y, s)
    } : a = {
      x: Utils$2.clamp(e.x, h, u),
      y: Utils$2.clamp(e.y, p, y)
    }, (this.speedX === 0 || this.horizontal === !1) && (a.x = e.x), (this.speedY === 0 || this.vertical === !1) && (a.y = e.y), a;
  }
  calculateVelocity() {
    return this.velocity;
  }
  _calculateSimulationVelocity() {
    const e = this._simulation.x.finished(), t = this._simulation.y.finished(), s = { x: 0, y: 0 };
    return e || (s.x = this._simulation.x.simulator.state.v / this.momentumVelocityMultiplier), t || (s.y = this._simulation.y.simulator.state.v / this.momentumVelocityMultiplier), s;
  }
  //#############################################################
  // Event Handling
  emit(e, t) {
    return this.layer.emit(e, t), super.emit(e, t);
  }
  //#############################################################
  // Lock Direction
  _updatedirectionLock(e) {
    if (this._directionLockEnabledX = Math.abs(e.y) > this.directionLockThreshold.y, this._directionLockEnabledY = Math.abs(e.x) > this.directionLockThreshold.x, this._directionLockEnabledX || this._directionLockEnabledY)
      return this.emit(Events$3.DirectionLockStart, {
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
    const t = {};
    t[e] = !0;
    const s = new Simulation({
      layer: this.layer,
      properties: t,
      model: "inertial-scroll",
      modelOptions: {
        momentum: this.momentumOptions,
        bounce: this.bounceOptions
      }
    });
    return s.on(
      Events$3.SimulationStep,
      (a) => this._onSimulationStep(e, a)
    ), s.on(
      Events$3.SimulationStop,
      (a) => this._onSimulationStop(e, a)
    ), s;
  }
  _updateSimulationConstraints(e) {
    if (this._simulation)
      if (e) {
        const { minX: t, maxX: s, minY: a, maxY: h } = this._calculateConstraints(
          this._constraints
        );
        return this._simulation.x.simulator.options = { min: t, max: s }, this._simulation.y.simulator.options = { min: a, max: h };
      } else
        return this._simulation.x.simulator.options = { min: -1 / 0, max: 1 / 0 }, this._simulation.y.simulator.options = {
          min: -1 / 0,
          max: 1 / 0
        };
  }
  _onSimulationStep(e, t) {
    let s;
    if (e === "x" && this.horizontal === !1 || e === "y" && this.vertical === !1)
      return;
    if (this.constraints)
      if (this.bounce)
        s = t.x - this.layer[e];
      else {
        const { minX: h, maxX: u, minY: p, maxY: y } = this._calculateConstraints(
          this._constraints
        );
        e === "x" && (s = Utils$2.clamp(t.x, h, u) - this.layer[e]), e === "y" && (s = Utils$2.clamp(t.x, p, y) - this.layer[e]);
      }
    else
      s = t.x - this.layer[e];
    const a = this.layer.point;
    return e === "x" && (a[e] = a[e] + s), e === "y" && (a[e] = a[e] + s), this.updatePosition(a), this.layer[e] = this.updatePosition(a)[e], this.emit(Events$3.Move, this.layer.point);
  }
  _onSimulationStop(e, t) {
    if (!(e === "x" && this.horizontal === !1) && !(e === "y" && this.vertical === !1) && this._simulation && (this.pixelAlign && (this.layer[e] = Math.round(this.layer[e])), this._simulation.x.finished() && this._simulation.y.finished()))
      return this._stopSimulation();
  }
  _startSimulation() {
    if (!this.momentum && !this.bounce || this.isBeyondConstraints === !1 && this.momentum === !1 || this.isBeyondConstraints === !1 && this.isDragging === !1)
      return;
    const { minX: e, maxX: t, minY: s, maxY: a } = this._calculateConstraints(
      this._constraints
    ), h = this.overdrag === !0 || this.layer.x > e && this.layer.x < t, u = this.overdrag === !0 || this.layer.y > s && this.layer.y < a;
    if (h === u && u === !1)
      return;
    const { velocity: p } = this, y = p.x * this.momentumVelocityMultiplier * this.speedX * (1 / this.layer.canvasScaleX()) * this.layer.scaleX * this.layer.scale, S = p.y * this.momentumVelocityMultiplier * this.speedY * (1 / this.layer.canvasScaleY()) * this.layer.scaleY * this.layer.scale;
    return this._setupSimulation(), this._isAnimating = !0, this._isMoving = !0, this._simulation.x.simulator.setState({
      x: this.layer.x,
      v: y
    }), h && this._simulation.x.start(), this._simulation.y.simulator.setState({
      x: this.layer.y,
      v: S
    }), u && this._simulation.y.start(), this.emit(Events$3.DragAnimationStart);
  }
  _stopSimulation() {
    if (this._isMoving && this.emit(Events$3.Move, this.layer.point), this._isAnimating = !1, this._isMoving = !1, !!this._simulation)
      return this._simulation != null && this._simulation.x.stop(), this._simulation != null && this._simulation.y.stop(), this._simulation = null, this.emit(Events$3.DragAnimationEnd);
  }
  animateStop() {
    return this._stopSimulation();
  }
  onMove(e) {
    return this.on(Events$3.Move, e);
  }
  onDragStart(e) {
    return this.on(Events$3.DragStart, e);
  }
  onDragWillMove(e) {
    return this.on(Events$3.DragWillMove, e);
  }
  onDragMove(e) {
    return this.on(Events$3.DragMove, e);
  }
  onDragDidMove(e) {
    return this.on(Events$3.DragDidMove, e);
  }
  onDrag(e) {
    return this.on(Events$3.Drag, e);
  }
  onDragEnd(e) {
    return this.on(Events$3.DragEnd, e);
  }
  onDragAnimationStart(e) {
    return this.on(Events$3.DragAnimationStart, e);
  }
  onDragAnimationEnd(e) {
    return this.on(Events$3.DragAnimationEnd, e);
  }
  onDirectionLockStart(e) {
    return this.on(Events$3.DirectionLockStart, e);
  }
}
function __guard__$3(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
LayerDraggable.initClass();
const Events$2 = {
  ...Events$6,
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
    const t = Utils$2.convertPoint({}, this.layer, this.layer.superLayer), s = Utils$2.convertPointFromContext(
      e.touchCenter,
      this.layer,
      !0,
      !0
    );
    this.layer.originX = s.x / this.layer.width, this.layer.originY = s.y / this.layer.height;
    const a = Utils$2.convertPoint({}, this.layer, this.layer.superLayer), h = {
      x: a.x - t.x,
      y: a.y - t.y
    };
    this.layer.x -= h.x, this.layer.y -= h.y;
  }
  _pinchStart(e) {
    this._reset(), this.centerOrigin && this._centerOrigin(e), this.normalizeRotation = Utils$2.rotationNormalizer();
  }
  _pinch(e) {
    if (!(e.fingers !== 2 || !this.enabled || e.touchDistance <= this.threshold)) {
      if (this.scale) {
        this._scaleStart == null && (this._scaleStart = this.layer.scale);
        let t = ((e.scale - 1) * this.scaleFactor + 1) * this._scaleStart;
        this.minScale && this.maxScale ? t = Utils$2.clamp(t, this.minScale, this.maxScale) : this.minScale ? t = Utils$2.clamp(t, this.minScale, 1e6) : this.maxScale && (t = Utils$2.clamp(t, 1e-5, this.maxScale)), this.scaleIncrements && (t = Utils$2.nearestIncrement(t, this.scaleIncrements)), this.layer.scale = t, this.emit(Events$2.Scale, e);
      }
      if (this.rotate) {
        this._rotationStart == null && (this._rotationStart = this.layer.rotation), this._rotationOffset == null && (this._rotationOffset = e.rotation);
        let t = e.rotation - this._rotationOffset + this._rotationStart;
        t *= this.rotateFactor, t = this.normalizeRotation(t), this.rotateMin && this.rotateMax && (t = Utils$2.clamp(t, this.rotateMin, this.rotateMax)), this.rotateIncrements && (t = Utils$2.nearestIncrement(t, this.rotateIncrements)), this.layer.rotation = t, this.emit(Events$2.Rotate, e);
      }
    }
  }
  _pinchEnd(e) {
    this._reset();
  }
}
LayerPinchable.initClass();
class LayerPropertyProxy {
  constructor(e, t) {
    const s = this, a = function(S) {
      return this[S];
    }, h = function(S, L) {
      return t(this, S, L, s);
    };
    for (var u of Array.from(Object.getOwnPropertyNames(e))) {
      var p = Object.getOwnPropertyDescriptor(e, u), y = {
        enumerable: p.enumerable,
        get: a.bind(e, u),
        set: h.bind(e, u)
      };
      Object.defineProperty(s, u, y);
    }
    s.__proto__ = e.__proto__;
  }
}
const NoCacheDateKey = Date.now(), delayedStyles = [
  "webkitTransform",
  "webkitFilter",
  "webkitPerspectiveOrigin",
  "webkitTransformOrigin",
  "webkitBackdropFilter"
], layerValueTypeError = function(r, e) {
  throw new Error(
    `Layer.${r}: value '${e}' of type '${typeof e}' is not valid`
  );
}, layerProperty$1 = function(r, e, t, s, a, h, u, p, y, S) {
  h == null && (h = {});
  let L = {
    default: t,
    get() {
      let M;
      return this._properties.hasOwnProperty(r) && (M = this._properties[r]), M == null && (M = t), S ? layerProxiedValue(M, this, r) : M;
    },
    set(M) {
      a && (M = a(M, this, r));
      const R = this._properties[r];
      if (M !== R) {
        if (M && s && !s(M) && layerValueTypeError(r, M), this._properties[r] = M, e !== null) {
          let k, q, le = this;
          if (Array.from(this._stylesAppliedToParent).includes(e) && (le = this._parent, this._parent._properties[r] = t), (y || !p) && (k = le._element), p != null && (q = le[p]), r === e && LayerStyle[e] == null)
            k != null && (k.style[e] = this._properties[r]), q != null && (q.style[e] = this._properties[r]);
          else if (!this.__applyingDefaults || !Array.from(delayedStyles).includes(e)) {
            const j = LayerStyle[e](this);
            k != null && (k.style[e] = j), q != null && (q.style[e] = j);
          }
        }
        if (typeof u == "function" && u(this, M), !this.__constructor && (this.emit(`change:${r}`, M, R), ["x", "y"].includes(r) && this.emit("change:point", M), ["width", "height"].includes(r) && this.emit("change:size", M), ["x", "y", "width", "height"].includes(r) && this.emit("change:frame", M), ["rotationZ"].includes(r)))
          return this.emit("change:rotation", M);
      }
    }
  };
  return L = _$1.extend(L, h);
};
var layerProxiedValue = function(r, e, t) {
  return _$1.isObject(r) ? new LayerPropertyProxy(r, function(s, a, h) {
    return s[a] = h, e[t] = s;
  }) : r;
};
exports.layerProxiedValue = layerProxiedValue;
const layerPropertyPointTransformer = function(r, e, t) {
  return _$1.isFunction(r) && (r = r(e, t)), r;
}, layerPropertyIgnore = function(r, e, t) {
  if (!r.hasOwnProperty(e))
    return r;
  for (var s of Array.from(t))
    if (r.hasOwnProperty(s))
      return delete r[e], r;
  return r;
}, asBorderRadius = function(r) {
  if (_$1.isNumber(r))
    return r;
  if (_$1.isString(r))
    return _$1.endsWith(r, "%") || console.error(
      "Layer.borderRadius only correctly supports percentages in strings"
    ), r;
  if (!_$1.isObject(r))
    return 0;
  const e = {};
  let t = !1;
  for (var s of ["topLeft", "topRight", "bottomRight", "bottomLeft"])
    t || (t = _$1.has(r, s)), e[s] = r[s] != null ? r[s] : 0;
  return t ? e : 0;
}, asBorderWidth = function(r) {
  if (_$1.isNumber(r))
    return r;
  if (!_$1.isObject(r))
    return 0;
  const e = {};
  let t = !1;
  for (var s of ["left", "right", "bottom", "top"])
    t || (t = _$1.has(r, s)), e[s] = r[s] != null ? r[s] : 0;
  return t ? e : 0;
}, parentOrContext = function(r) {
  return r.parent != null ? r.parent : r.context;
}, proxiedShadowValue = function(r, e, t) {
  t == null && (t = 0);
  const s = _$1.defaults(_$1.clone(e), Framer.Defaults.Shadow);
  return s.color !== null && s != null && (s.color = new Color$1(s.color)), layerProxiedValue(s, r, `shadow${t + 1}`);
};
let Layer$2 = class Rn extends BaseClass {
  static initClass() {
    this.define("context", {
      get() {
        return this._context;
      }
    }), this.define("label", {
      get() {
        return this._label;
      },
      set(t) {
        if (t !== this._label)
          return this._label = t, Utils$2.labelLayer(this, this._label);
      }
    }), this.define("custom", this.simpleProperty("custom", void 0)), this.define(
      "animationOptions",
      this.simpleProperty("animationOptions", {})
    ), this.define(
      "ignoreEvents",
      layerProperty$1(this, "ignoreEvents", "pointerEvents", !0, _$1.isBoolean)
    ), this.define(
      "width",
      layerProperty$1(
        this,
        "width",
        "width",
        100,
        _$1.isNumber,
        null,
        {},
        function(t, s) {
          if (!(t.constraintValues == null || t.isLayouting))
            return t.constraintValues.width = s, t.constraintValues.aspectRatioLocked = !1, t.constraintValues.widthFactor = null, t._layoutX();
        }
      )
    ), this.define(
      "height",
      layerProperty$1(
        this,
        "height",
        "height",
        100,
        _$1.isNumber,
        null,
        {},
        function(t, s) {
          if (!(t.constraintValues == null || t.isLayouting))
            return t.constraintValues.height = s, t.constraintValues.aspectRatioLocked = !1, t.constraintValues.heightFactor = null, t._layoutY();
        }
      )
    ), this.define(
      "visible",
      layerProperty$1(this, "visible", "display", !0, _$1.isBoolean)
    ), this.define(
      "opacity",
      layerProperty$1(this, "opacity", "opacity", 1, _$1.isNumber, parseFloat)
    ), this.define(
      "index",
      layerProperty$1(this, "index", "zIndex", 0, _$1.isNumber, null, {
        importable: !1,
        exportable: !1
      })
    ), this.define(
      "clip",
      layerProperty$1(
        this,
        "clip",
        "overflow",
        !1,
        _$1.isBoolean,
        null,
        {},
        null,
        "_elementHTML",
        !0
      )
    ), this.define(
      "scrollHorizontal",
      layerProperty$1(
        this,
        "scrollHorizontal",
        "overflowX",
        !1,
        _$1.isBoolean,
        null,
        {},
        function(t, s) {
          if (s === !0)
            return t.ignoreEvents = !1;
        }
      )
    ), this.define(
      "scrollVertical",
      layerProperty$1(
        this,
        "scrollVertical",
        "overflowY",
        !1,
        _$1.isBoolean,
        null,
        {},
        function(t, s) {
          if (s === !0)
            return t.ignoreEvents = !1;
        }
      )
    ), this.define("scroll", {
      get() {
        return this.scrollHorizontal === !0 || this.scrollVertical === !0;
      },
      set(t) {
        return this.scrollHorizontal = this.scrollVertical = t;
      }
    }), this.define(
      "x",
      layerProperty$1(
        this,
        "x",
        "webkitTransform",
        0,
        _$1.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function(t) {
          if (!t.isLayouting)
            return t.constraintValues = null;
        }
      )
    ), this.define(
      "y",
      layerProperty$1(
        this,
        "y",
        "webkitTransform",
        0,
        _$1.isNumber,
        layerPropertyPointTransformer,
        { depends: ["width", "height"] },
        function(t) {
          if (!t.isLayouting)
            return t.constraintValues = null;
        }
      )
    ), this.define(
      "z",
      layerProperty$1(this, "z", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "scaleX",
      layerProperty$1(this, "scaleX", "webkitTransform", 1, _$1.isNumber)
    ), this.define(
      "scaleY",
      layerProperty$1(this, "scaleY", "webkitTransform", 1, _$1.isNumber)
    ), this.define(
      "scaleZ",
      layerProperty$1(this, "scaleZ", "webkitTransform", 1, _$1.isNumber)
    ), this.define(
      "scale",
      layerProperty$1(this, "scale", "webkitTransform", 1, _$1.isNumber)
    ), this.define(
      "skewX",
      layerProperty$1(this, "skewX", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "skewY",
      layerProperty$1(this, "skewY", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "skew",
      layerProperty$1(this, "skew", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "originX",
      layerProperty$1(this, "originX", "webkitTransformOrigin", 0.5, _$1.isNumber)
    ), this.define(
      "originY",
      layerProperty$1(this, "originY", "webkitTransformOrigin", 0.5, _$1.isNumber)
    ), this.define("originZ", layerProperty$1(this, "originZ", null, 0, _$1.isNumber)), this.define(
      "perspective",
      layerProperty$1(
        this,
        "perspective",
        "webkitPerspective",
        0,
        (t) => Utils$2.webkitPerspectiveForValue(t) !== null
      )
    ), this.define(
      "perspectiveOriginX",
      layerProperty$1(
        this,
        "perspectiveOriginX",
        "webkitPerspectiveOrigin",
        0.5,
        _$1.isNumber
      )
    ), this.define(
      "perspectiveOriginY",
      layerProperty$1(
        this,
        "perspectiveOriginY",
        "webkitPerspectiveOrigin",
        0.5,
        _$1.isNumber
      )
    ), this.define(
      "rotationX",
      layerProperty$1(this, "rotationX", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "rotationY",
      layerProperty$1(this, "rotationY", "webkitTransform", 0, _$1.isNumber)
    ), this.define(
      "rotationZ",
      layerProperty$1(this, "rotationZ", "webkitTransform", 0, _$1.isNumber)
    ), this.define("rotation", {
      //exportable: false
      get() {
        return this.rotationZ;
      },
      set(t) {
        return this.rotationZ = t;
      }
    }), this.define(
      "blur",
      layerProperty$1(this, "blur", "webkitFilter", 0, _$1.isNumber)
    ), this.define(
      "brightness",
      layerProperty$1(this, "brightness", "webkitFilter", 100, _$1.isNumber)
    ), this.define(
      "saturate",
      layerProperty$1(this, "saturate", "webkitFilter", 100, _$1.isNumber)
    ), this.define(
      "hueRotate",
      layerProperty$1(this, "hueRotate", "webkitFilter", 0, _$1.isNumber)
    ), this.define(
      "contrast",
      layerProperty$1(this, "contrast", "webkitFilter", 100, _$1.isNumber)
    ), this.define(
      "invert",
      layerProperty$1(this, "invert", "webkitFilter", 0, _$1.isNumber)
    ), this.define(
      "grayscale",
      layerProperty$1(this, "grayscale", "webkitFilter", 0, _$1.isNumber)
    ), this.define(
      "sepia",
      layerProperty$1(this, "sepia", "webkitFilter", 0, _$1.isNumber)
    ), this.define(
      "blending",
      layerProperty$1(this, "blending", "mixBlendMode", null, _$1.isString)
    ), this.define(
      "backgroundBlur",
      layerProperty$1(
        this,
        "backgroundBlur",
        "webkitBackdropFilter",
        0,
        _$1.isNumber
      )
    ), this.define(
      "backgroundBrightness",
      layerProperty$1(
        this,
        "backgroundBrightness",
        "webkitBackdropFilter",
        100,
        _$1.isNumber
      )
    ), this.define(
      "backgroundSaturate",
      layerProperty$1(
        this,
        "backgroundSaturate",
        "webkitBackdropFilter",
        100,
        _$1.isNumber
      )
    ), this.define(
      "backgroundHueRotate",
      layerProperty$1(
        this,
        "backgroundHueRotate",
        "webkitBackdropFilter",
        0,
        _$1.isNumber
      )
    ), this.define(
      "backgroundContrast",
      layerProperty$1(
        this,
        "backgroundContrast",
        "webkitBackdropFilter",
        100,
        _$1.isNumber
      )
    ), this.define(
      "backgroundInvert",
      layerProperty$1(
        this,
        "backgroundInvert",
        "webkitBackdropFilter",
        0,
        _$1.isNumber
      )
    ), this.define(
      "backgroundGrayscale",
      layerProperty$1(
        this,
        "backgroundGrayscale",
        "webkitBackdropFilter",
        0,
        _$1.isNumber
      )
    ), this.define(
      "backgroundSepia",
      layerProperty$1(
        this,
        "backgroundSepia",
        "webkitBackdropFilter",
        0,
        _$1.isNumber
      )
    ), this.define(
      "backgroundSize",
      layerProperty$1(
        this,
        "backgroundSize",
        "backgroundSize",
        "fill",
        _$1.isString
      )
    );
    for (let t = 0; t <= 8; t++)
      ((s) => this.define(`shadow${s + 1}`, {
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
          return this.shadows == null && (this.shadows = []), this.shadows[s] == null && (this.shadows[s] = proxiedShadowValue(this, {}, s)), this.shadows[s];
        },
        set(a) {
          return this.shadows == null && (this.shadows = []), this.shadows[s] = proxiedShadowValue(this, a, s), this.updateShadowStyle();
        }
      }))(t);
    for (var e of ["X", "Y", "Blur", "Spread", "Color", "Type"])
      ((t) => this.define(`shadow${t}`, {
        get() {
          return this.shadows == null || this.shadows.length === 0 ? null : this.shadows[0][t.toLowerCase()];
        },
        set(s) {
          return this.updateShadowsProperty(t.toLowerCase(), s);
        }
      }))(e);
    this.define("shadows", {
      default: null,
      get() {
        return this._getPropertyValue("shadows");
      },
      set(t) {
        t == null && (t = []);
        const s = [];
        for (let h = 0; h < t.length; h++) {
          var a = t[h];
          a === null ? s.push(null) : s.push(proxiedShadowValue(this, a, h));
        }
        return this._setPropertyValue("shadows", s), this.updateShadowStyle();
      }
    }), this.define(
      "backgroundColor",
      layerProperty$1(
        this,
        "backgroundColor",
        "backgroundColor",
        null,
        Color$1.validColorValue,
        Color$1.toColor
      )
    ), this.define(
      "color",
      layerProperty$1(
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
      layerProperty$1(
        this,
        "borderRadius",
        "borderRadius",
        0,
        null,
        asBorderRadius,
        null,
        null,
        "_elementBorder",
        !0
      )
    ), this.define(
      "borderColor",
      layerProperty$1(
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
      layerProperty$1(
        this,
        "borderWidth",
        "borderWidth",
        0,
        null,
        asBorderWidth,
        null,
        null,
        "_elementBorder",
        !1
      )
    ), this.define(
      "borderStyle",
      layerProperty$1(
        this,
        "borderStyle",
        "borderStyle",
        "solid",
        _$1.isString,
        null,
        null,
        null,
        "_elementBorder"
      )
    ), this.define(
      "force2d",
      layerProperty$1(this, "force2d", "webkitTransform", !1, _$1.isBoolean)
    ), this.define(
      "flat",
      layerProperty$1(this, "flat", "webkitTransformStyle", !1, _$1.isBoolean)
    ), this.define(
      "backfaceVisible",
      layerProperty$1(
        this,
        "backfaceVisible",
        "webkitBackfaceVisibility",
        !0,
        _$1.isBoolean
      )
    ), this.define("name", {
      default: "",
      get() {
        const t = this._getPropertyValue("name");
        return t != null ? `${t}` : "";
      },
      set(t) {
        return this._setPropertyValue("name", t), this._element.setAttribute("name", t);
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
        const t = this.parent || this.context, s = Utils$2.perspectiveMatrix(t);
        return Matrix.identity3d().multiply(s).multiply(this.transformMatrix);
      }
    }), this.define("cornerRadius", {
      importable: !1,
      exportable: !1,
      // exportable: no
      get() {
        return this.borderRadius;
      },
      set(t) {
        return this.borderRadius = t;
      }
    }), this.define("point", {
      importable: !0,
      exportable: !1,
      depends: ["width", "height", "size", "parent"],
      get() {
        return Utils$2.point(this);
      },
      set(t) {
        return t = layerPropertyPointTransformer(t, this, "point"), this._setGeometryValues(t, ["x", "y"]);
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
      set(t) {
        return t = layerPropertyPointTransformer(t, this, "midPoint"), _$1.isNumber(t) || (t = _$1.pick(t, ["x", "y", "midX", "midY"]), t.x != null && t.midX == null && (t.midX = t.x, delete t.x), t.y != null && t.midY == null && (t.midY = t.y, delete t.y)), this._setGeometryValues(t, ["midX", "midY"]);
      }
    }), this.define("size", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.size(this);
      },
      set(t) {
        return this._setGeometryValues(t, ["width", "height"]);
      }
    }), this.define("frame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.frame(this);
      },
      set(t) {
        return this._setGeometryValues(t, ["x", "y", "width", "height"]);
      }
    }), this.define("minX", {
      importable: !0,
      exportable: !1,
      get() {
        return this.x;
      },
      set(t) {
        return this.x = t;
      }
    }), this.define("midX", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.frameGetMidX(this);
      },
      set(t) {
        return Utils$2.frameSetMidX(this, t);
      }
    }), this.define("maxX", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.frameGetMaxX(this);
      },
      set(t) {
        return Utils$2.frameSetMaxX(this, t);
      }
    }), this.define("minY", {
      importable: !0,
      exportable: !1,
      get() {
        return this.y;
      },
      set(t) {
        return this.y = t;
      }
    }), this.define("midY", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.frameGetMidY(this);
      },
      set(t) {
        return Utils$2.frameSetMidY(this, t);
      }
    }), this.define("maxY", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.frameGetMaxY(this);
      },
      set(t) {
        return Utils$2.frameSetMaxY(this, t);
      }
    }), this.define("constraintValues", {
      importable: !0,
      exportable: !1,
      default: null,
      get() {
        return this._getPropertyValue("constraintValues");
      },
      set(t) {
        let s;
        if (t === null)
          s = null, this.off("change:parent", this.parentChanged), Screen.off("resize", this.layout);
        else {
          let a;
          if (s = _$1.defaults(_$1.clone(t), {
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
            let h, u;
            h = this.layout, !Array.from(this.parent.listeners("change:width")).includes(
              h
            ) && this.parent.on("change:width", this.layout), u = this.layout, !Array.from(this.parent.listeners("change:height")).includes(
              u
            ) && this.parent.on("change:height", this.layout);
          } else {
            let h;
            h = this.layout, !Array.from(Screen.listeners("resize")).includes(h) && Screen.on("resize", this.layout);
          }
          a = this.parentChanged, !Array.from(this.listeners("change:parent")).includes(a) && this.on("change:parent", this.parentChanged);
        }
        return this._setPropertyValue("constraintValues", s);
      }
    }), this.define("htmlIntrinsicSize", {
      importable: !0,
      exportable: !0,
      default: null,
      get() {
        return this._getPropertyValue("htmlIntrinsicSize");
      },
      set(t) {
        return t === null ? this._setPropertyValue("htmlIntrinsicSize", t) : !_$1.isFinite(t.width) || !_$1.isFinite(t.height) ? void 0 : this._setPropertyValue("htmlIntrinsicSize", {
          width: t.width,
          height: t.height
        });
      }
    }), this.define("canvasFrame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.boundingFrame(this);
      },
      set(t) {
        return this.frame = Utils$2.convertFrameFromContext(
          t,
          this,
          !0,
          !1
        );
      }
    }), this.define("screenFrame", {
      importable: !0,
      exportable: !1,
      get() {
        return Utils$2.boundingFrame(this, !1);
      },
      set(t) {
        return this.frame = Utils$2.convertFrameFromContext(
          t,
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
      set(t) {
        return _$1.extend(this._element.style, t), this.emit("change:style");
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
      set(t) {
        this._createHTMLElementIfNeeded();
        const s = Utils$2.getIdAttributesFromString(t);
        for (var a of Array.from(s)) {
          var h = document.querySelector(`[id='${a}']`);
          if (h != null) {
            Utils$2.throwInStudioOrWarnInProduction(
              Rn.ExistingIdMessage("html", a)
            );
            return;
          }
        }
        return this._elementHTML.innerHTML = t, this._updateHTMLScale(), this.emit("change:html");
      }
    }), this.define("image", {
      default: "",
      get() {
        return this._getPropertyValue("image");
      },
      set(t) {
        const s = this._getPropertyValue("image"), a = Defaults$1.getDefaults("Layer", {}), h = this.backgroundColor != null ? this.backgroundColor.isEqual(a.backgroundColor) : void 0;
        if (Gradient$1.isGradientObject(t)) {
          this.emit("change:gradient", t, s), this.emit("change:image", t, s), this._setPropertyValue("image", t), this.style["background-image"] = t.toCSS(), h && (this.backgroundColor = null);
          return;
        }
        if (_$1.isString(t) || t === null || layerValueTypeError("image", t), s === t)
          return this.emit("load");
        if (h && (this.backgroundColor = null), this._setPropertyValue("image", t), [null, ""].includes(t)) {
          this._imageLoader != null && (this._imageEventManager.removeAllListeners(), this._imageLoader.src = null), this.style["background-image"] = null, this._imageLoader != null && (this.emit(Events$6.ImageLoadCancelled, this._imageLoader), this._cleanupImageLoader());
          return;
        }
        if (_$1.endsWith(
          typeof t.toLowerCase == "function" ? t.toLowerCase() : void 0,
          ".pdf"
        ) && (!Utils$2.isWebKit() || Utils$2.isChrome())) {
          this.style["background-image"] = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAVlJREFUaAXtlwEOwiAMRdF4Cr3/0fQaSre9ZFSYLCrQpSSG/FLW9v92agghXJdP3KZlCp/J2up+WiUuzMt6zNukzPDYvALCsKme1/maV8BnQHqw9/IZ6KmAz0BP9ontMwATPXafgR6s65g+A5qRlrhmBu6FhG6LXf9/+JU/YclROkVWEs/8r9FLrChb2apSqVqWZgKmtRKz9/f+CdPxoVl8CAWylcWKUQZGwfhjB3OOHcw5djDn2MH6fBNLC42yaEnyoTXB2V36+lPlz+zN9x6HKfxrZwZ/HUbf5/lJviMpoBPWBWWxFJCtLNqplItIWuvPffx5Dphz7GB9vonNv4X2zICWuMTM3p7Gv/b5iVLmFaiZgb3M/Ns/Ud68AvIGkJ6ir8xh8wrQrzAve9Jjo2PzCsC8z4Aw0WP5DPRgXcf07wHNSEvsM9CS7VIsn4ESMy3sPgMtWN6K8QKfubDo2UqVogAAAABJRU5ErkJggg==')";
          return;
        }
        let u = t;
        return this._alwaysUseImageCache === !1 && Utils$2.isLocalAssetUrl(u) && (u += /\?/.test(u) ? "&" : "?", u += `nocache=${NoCacheDateKey}`), this.listeners(Events$6.ImageLoaded, !0) || this.listeners(Events$6.ImageLoadError, !0) || this.listeners(Events$6.ImageLoadCancelled, !0) ? (this._imageLoader = new Image(), this._imageLoader.name = u, this._imageLoader.src = u, this._imageEventManager = this._context.domEventManager.wrap(
          this._imageLoader
        ), this._imageEventManager.addEventListener("load", () => (this.style["background-image"] = `url('${u}')`, this.emit(Events$6.ImageLoaded, this._imageLoader), this._cleanupImageLoader())), this._imageEventManager.addEventListener("error", () => (this.emit(Events$6.ImageLoadError, this._imageLoader), this._cleanupImageLoader()))) : this.style["background-image"] = `url('${u}')`;
      }
    }), this.define("gradient", {
      get() {
        return Gradient$1.isGradientObject(this.image) ? layerProxiedValue(this.image, this, "gradient") : null;
      },
      set(t) {
        if (Gradient$1.isGradient(t))
          return this.image = new Gradient$1(t);
        if (!t && Gradient$1.isGradientObject(this.image))
          return this.image = null;
      }
    }), this.define("parent", {
      enumerable: !1,
      exportable: !1,
      importable: !0,
      get() {
        return this._parent || null;
      },
      set(t) {
        if (t === this._parent)
          return;
        if (t === this)
          throw Error("Layer.parent: a layer cannot be it's own parent.");
        if (!t instanceof Rn)
          throw Error("Layer.parent needs to be a Layer object");
        Utils$2.domCompleteCancel(this.__insertElement), this._parent && (this._parent._children = _$1.pull(this._parent._children, this), this._parent._element.removeChild(this._element), this._parent.emit("change:children", { added: [], removed: [this] }), this._parent.emit("change:subLayers", { added: [], removed: [this] })), t ? (t._element.appendChild(this._element), t._children.push(this), t.emit("change:children", { added: [this], removed: [] }), t.emit("change:subLayers", { added: [this], removed: [] })) : this._insertElement();
        const s = this._parent;
        return this._parent = t, this.bringToFront(), this.emit("change:parent", this._parent, s), this.emit("change:superLayer", this._parent, s);
      }
    }), this.define("children", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this._children.map(function(t) {
          return t instanceof SVGLayer && t.children.length === 1 && _$1.startsWith(t.name, ".") ? t.children[0] : t;
        });
      }
    }), this.define("siblings", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.parent === null ? _$1.filter(this._context.layers, (t) => t !== this && t.parent === null) : _$1.without(this.parent.children, this);
      }
    }), this.define("descendants", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        const t = [];
        var s = function(a) {
          return t.push(a), a.children.map(s);
        };
        return this.children.map(s), t;
      }
    }), this.define("superLayer", {
      enumerable: !1,
      exportable: !1,
      importable: !1,
      get() {
        return this.parent;
      },
      set(t) {
        return this.parent = t;
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
      set(t) {
        return this.states.machine.reset(), _$1.extend(this.states, t);
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
      set(t) {
        if (_$1.isBoolean(t))
          return this.draggable.enabled = t;
      }
    }), this.define("pinchable", {
      importable: !1,
      exportable: !1,
      get() {
        return this._pinchable != null ? this._pinchable : this._pinchable = new LayerPinchable(this);
      },
      set(t) {
        if (_$1.isBoolean(t))
          return this.pinchable.enabled = t;
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
      set(t) {
        return this.scrollX = t.x, this.scrollY = t.y;
      }
    }), this.define("scrollX", {
      get() {
        return this._element.scrollLeft;
      },
      set(t) {
        return _$1.isNumber(t) || layerValueTypeError("scrollX", t), this._element.scrollLeft = t;
      }
    }), this.define("scrollY", {
      get() {
        return this._element.scrollTop;
      },
      set(t) {
        return _$1.isNumber(t) || layerValueTypeError("scrollY", t), this._element.scrollTop = t;
      }
    }), this.define("_domEventManager", {
      get() {
        return this._context.domEventManager.wrap(this._element);
      }
    }), this.prototype.on = this.prototype.addListener, this.prototype.off = this.prototype.removeListener;
  }
  constructor(e) {
    if (this.parentChanged = this.parentChanged.bind(this), this._layoutX = this._layoutX.bind(this), this._layoutY = this._layoutY.bind(this), this.layout = this.layout.bind(this), this.convertPointToScreen = this.convertPointToScreen.bind(this), this.convertPointToCanvas = this.convertPointToCanvas.bind(this), this.convertPointToLayer = this.convertPointToLayer.bind(this), this.updateForDevicePixelRatioChange = this.updateForDevicePixelRatioChange.bind(this), this.updateForSizeChange = this.updateForSizeChange.bind(this), this.once = this.once.bind(this), this.addListener = this.addListener.bind(this), e == null && (e = {}), this.__constructorCalled)
      throw Error(`Layer.constructor ${this.toInspect()} called twice`);
    this.__constructorCalled = !0, this.__constructor = !0, this._properties = {}, this._style = {}, this._children = [], this._stylesAppliedToParent == null && (this._stylesAppliedToParent = []), this._prefer2d = !1, this._alwaysUseImageCache = !1, this._cancelClickEventInDragSession = !0, this._createElement(), e.createHTMLElement && this._createHTMLElementIfNeeded(), this._createBorderElement(), layerPropertyIgnore(e, "point", ["x", "y"]), layerPropertyIgnore(e, "midPoint", ["midX", "midY"]), layerPropertyIgnore(e, "size", ["width", "height"]), layerPropertyIgnore(e, "frame", ["x", "y", "width", "height"]), !e.hasOwnProperty("parent") && e.hasOwnProperty("superLayer") && (e.parent = e.superLayer, delete e.superLayer), this.__applyingDefaults = !0, super(Defaults$1.getDefaults("Layer", e)), delete this.__applyingDefaults;
    for (var t of Array.from(delayedStyles)) {
      var s = this._element;
      Array.from(this._stylesAppliedToParent).includes(t) && (s = this._parent._element), s.style[t] = LayerStyle[t](this);
    }
    this._context.addLayer(this), this._id = this._context.layerCounter, e.parent ? this.parent = e.parent : e.shadow || this._insertElement(), e.hasOwnProperty("index") && (this.index = e.index);
    for (var a of ["x", "y", "width", "height"])
      e.hasOwnProperty(a) && (this[a] = e[a]);
    this._context.emit("layer:create", this), this.label = this.label, delete this.__constructor, this.updateShadowStyle(), this.onChange("size", this.updateForSizeChange);
  }
  static ExistingIdMessage(e, t) {
    return `Can not set ${e}: There's already an element with id '${t}' in this document'`;
  }
  updateShadowsProperty(e, t) {
    this.shadows == null && (this.shadows = []), this.shadows.filter((a) => a !== null).length === 0 && (this.shadows[0] = proxiedShadowValue(this, Framer.Defaults.Shadow));
    for (var s of Array.from(this.shadows))
      s != null && (s[e] = t);
    return this.updateShadowStyle();
  }
  updateShadowStyle() {
    if (!this.__constructor)
      return this._element.style.boxShadow = LayerStyle.boxShadow(this), this._element.style.textShadow = LayerStyle.textShadow(this), this._element.style.webkitFilter = LayerStyle.webkitFilter(this);
  }
  //#############################################################
  // Geometry
  _setGeometryValues(e, t) {
    return _$1.isNumber(e) ? (() => {
      const s = [];
      for (var a of Array.from(t))
        this[a] !== e ? s.push(this[a] = e) : s.push(void 0);
      return s;
    })() : e ? (() => {
      const s = [];
      for (var a of Array.from(t))
        _$1.isNumber(e[a]) && this[a] !== e[a] ? s.push(this[a] = e[a]) : s.push(void 0);
      return s;
    })() : void 0;
  }
  parentChanged(e, t) {
    return t != null ? (t.off("change:width", this.layout), t.off("change:height", this.layout)) : Screen.off("resize", this.layout), this.constraintValues = null;
  }
  setParentPreservingConstraintValues(e) {
    const t = this.constraintValues;
    return this.parent = e, this.constraintValues = t, this.layout();
  }
  _layoutX() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.x = Utils$2.calculateLayoutX(
      e,
      this.constraintValues,
      this.width
    ), this.isLayouting = !1;
  }
  _layoutY() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.y = Utils$2.calculateLayoutY(
      e,
      this.constraintValues,
      this.height
    ), this.isLayouting = !1;
  }
  layout() {
    if (this.constraintValues == null || this.parent == null && !this.context.autoLayout)
      return;
    const e = (this.parent != null ? this.parent.frame : void 0) != null ? this.parent != null ? this.parent.frame : void 0 : this.context.innerFrame;
    return this.isLayouting = !0, this.frame = Utils$2.calculateLayoutFrame(e, this), this.isLayouting = !1;
  }
  convertPointToScreen(e) {
    return Utils$2.convertPointToContext(e, this, !1);
  }
  convertPointToCanvas(e) {
    return Utils$2.convertPointToContext(e, this, !0);
  }
  convertPointToLayer(e, t, s) {
    return s == null && (s = !0), Utils$2.convertPoint(e, this, t, s);
  }
  contentFrame() {
    return this._children.length ? Utils$2.frameMerge(_$1.map(this._children, "frame")) : { x: 0, y: 0, width: 0, height: 0 };
  }
  totalFrame() {
    return Utils$2.frameMerge(this.frame, this.contentFrame());
  }
  centerFrame() {
    let e;
    return this.parent ? ({ frame: e } = this, Utils$2.frameSetMidX(
      e,
      parseInt(this.parent.width / 2 - this.parent.borderWidth)
    ), Utils$2.frameSetMidY(
      e,
      parseInt(this.parent.height / 2 - this.parent.borderWidth)
    ), e) : ({ frame: e } = this, Utils$2.frameSetMidX(e, parseInt(this._context.innerWidth / 2)), Utils$2.frameSetMidY(e, parseInt(this._context.innerHeight / 2)), e);
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
    let t = 1;
    e && (t = this.scale * this.scaleX);
    for (var s of Array.from(this.containers(!0)))
      t *= s.scale, s.scaleX != null && (t *= s.scaleX);
    return t;
  }
  canvasScaleY(e) {
    e == null && (e = !0);
    let t = 1;
    e && (t = this.scale * this.scaleY);
    for (var s of Array.from(this.containers(!0)))
      t *= s.scale, s.scaleY != null && (t *= s.scaleY);
    return t;
  }
  screenScaleX(e) {
    e == null && (e = !0);
    let t = 1;
    e && (t = this.scale * this.scaleX);
    for (var s of Array.from(this.containers(!1)))
      t *= s.scale * s.scaleX;
    return t;
  }
  screenScaleY(e) {
    e == null && (e = !0);
    let t = 1;
    e && (t = this.scale * this.scaleY);
    for (var s of Array.from(this.containers(!1)))
      t *= s.scale * s.scaleY;
    return t;
  }
  screenScaledFrame() {
    const e = {
      x: 0,
      y: 0,
      width: this.width * this.screenScaleX(),
      height: this.height * this.screenScaleY()
    }, t = this.containers(!0);
    t.push(this), t.reverse();
    for (var s of Array.from(t)) {
      var a, h, u, p = parentOrContext(s), y = (a = __guardMethod__(p, "screenScaleX", (M) => M.screenScaleX())) != null ? a : 1, S = (h = __guardMethod__(
        p,
        "screenScaleY",
        (M) => M.screenScaleY()
      )) != null ? h : 1, L = (u = typeof s.scaledFrame == "function" ? s.scaledFrame() : void 0) != null ? u : { x: 0, y: 0 };
      e.x += L.x * y, e.y += L.y * S;
    }
    return e;
  }
  scaledFrame() {
    const { frame: e } = this, t = this.scale * this.scaleX, s = this.scale * this.scaleY;
    return e.width *= t, e.height *= s, e.x += (1 - t) * this.originX * this.width, e.y += (1 - s) * this.originY * this.height, e;
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
    return Utils$2.findLayer(this.descendants, e);
  }
  selectAllChildren(e) {
    return Utils$2.filterLayers(this.descendants, e);
  }
  static select(e) {
    return Framer.CurrentContext.selectLayer(e);
  }
  static selectAll(e) {
    return Framer.CurrentContext.selectAllLayers(e);
  }
  destroy() {
    return this.parent && (this.parent._children = _$1.without(this.parent._children, this)), this._element.parentNode != null && this._element.parentNode.removeChild(this._element), this.removeAllListeners(), this._context.removeLayer(this), this._context.emit("layer:destroy", this), this._context.domEventManager.remove(this._element);
  }
  //#############################################################
  //# COPYING
  copy() {
    const e = this.copySingle();
    for (var t of Array.from(this._children)) {
      var s = t.copy();
      s !== null && (s.parent = e);
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
    return _$1.filter(this.children, (t) => t.name === e);
  }
  siblingsWithName(e) {
    return _$1.filter(this.siblingLayers, (t) => t.name === e);
  }
  // Get all containers of this layer, including containing contexts
  // `toRoot` specifies if you want to bubble up across contexts,
  // so specifiying `false` will stop at the first context
  // and thus the results will never contain any context
  containers(e, t) {
    return e == null && (e = !1), t == null && (t = []), this.parent != null ? (t.push(this.parent), this.parent.containers(e, t)) : e ? (t.push(this.context), this.context.containers(!0, t)) : t;
  }
  ancestors() {
    return this.containers();
  }
  root() {
    return this.parent === null ? this : _$1.last(this.ancestors());
  }
  childrenAbove(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), _$1.filter(
      this.children,
      (a) => Utils$2.framePointForOrigin(a.frame, t, s).y < e.y
    );
  }
  childrenBelow(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), _$1.filter(
      this.children,
      (a) => Utils$2.framePointForOrigin(a.frame, t, s).y > e.y
    );
  }
  childrenLeft(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), _$1.filter(
      this.children,
      (a) => Utils$2.framePointForOrigin(a.frame, t, s).x < e.x
    );
  }
  childrenRight(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), _$1.filter(
      this.children,
      (a) => Utils$2.framePointForOrigin(a.frame, t, s).x > e.x
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
  subLayersAbove(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), this.childrenAbove(e, t, s);
  }
  subLayersBelow(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), this.childrenBelow(e, t, s);
  }
  subLayersLeft(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), this.childrenLeft(e, t, s);
  }
  subLayersRight(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), this.childrenRight(e, t, s);
  }
  //#############################################################
  //# ANIMATION
  animate(e, t) {
    if (t == null && (t = {}), _$1.isString(e)) {
      const a = e;
      return t.options != null && ({ options: t } = t), this.states.machine.switchTo(a, t);
    }
    e = _$1.clone(e), e.properties != null && (t = e, { properties: e } = t, delete t.properties), e.options != null && (t = _$1.defaults({}, t, e.options), delete e.options), t = _$1.defaults({}, t, this.animationOptions), t.start == null && (t.start = !0);
    const s = new Animation$1(this, e, t);
    return t.start && s.start(), s;
  }
  stateCycle(...e) {
    let t;
    const s = _$1.flatten(e);
    return _$1.isObject(_$1.last(s)) && (t = s.pop()), this.animate(this.states.machine.next(s), t);
  }
  stateSwitch(e, t) {
    if (t == null && (t = {}), e == null)
      throw new Error("Missing required argument 'stateName' in stateSwitch()");
    return t.animate === !0 ? this.animate(e, t) : this.animate(e, _$1.defaults({}, t, { instant: !0 }));
  }
  animations(e) {
    return e == null && (e = !1), _$1.filter(this._context.animations, (t) => t.layer !== this ? !1 : e || !t.isPending);
  }
  animatingProperties() {
    const e = {};
    for (var t of Array.from(this.animations()))
      for (var s of Array.from(t.animatingProperties()))
        e[s] = t;
    return e;
  }
  animateStop() {
    return _$1.invokeMap(this.animations(), "stop"), this._draggable != null ? this._draggable.animateStop() : void 0;
  }
  //#############################################################
  //# INDEX ORDERING
  bringToFront() {
    let e = null;
    const t = (this.parent != null ? this.parent._children : void 0) != null ? this.parent != null ? this.parent._children : void 0 : this.context._layers;
    if (!(t.count <= 1)) {
      for (var s of Array.from(t))
        s !== this && (e == null && (e = s.index), s.index > e && (e = s.index));
      if (e != null)
        return this.index = e + 1;
    }
  }
  sendToBack() {
    let e = null;
    const t = (this.parent != null ? this.parent._children : void 0) != null ? this.parent != null ? this.parent._children : void 0 : this.context._layers;
    if (!(t.count <= 1)) {
      for (var s of Array.from(t))
        s !== this && (e == null && (e = s.index), s.index < e && (e = s.index));
      if (e != null)
        return this.index = e - 1;
    }
  }
  placeBefore(e) {
    if (Array.from(this.siblingLayers).includes(e)) {
      for (var t of Array.from(this.siblingLayers))
        t.index <= e.index && (t.index -= 1);
      return this.index = e.index + 1;
    }
  }
  placeBehind(e) {
    if (Array.from(this.siblingLayers).includes(e)) {
      for (var t of Array.from(this.siblingLayers))
        t.index >= e.index && (t.index += 1);
      return this.index = e.index - 1;
    }
  }
  emit(e, ...t) {
    if (!(this._cancelClickEventInDragSession && !this._draggable && [
      Events$6.Click,
      Events$6.Tap,
      Events$6.TapStart,
      Events$6.TapEnd,
      Events$6.LongPress,
      Events$6.LongPressStart,
      Events$6.LongPressEnd
    ].includes(e) && LayerDraggable._globalDidDrag === !0)) {
      if ((t[0] != null ? t[0].clientX : void 0) != null || (t[0] != null ? t[0].clientY : void 0) != null) {
        const a = t[0];
        let h = { x: a.clientX, y: a.clientY };
        if (a.point = Utils$2.convertPointFromContext(h, this, !0), a.contextPoint = Utils$2.convertPointFromContext(
          h,
          this.context,
          !0
        ), a.touches != null)
          for (var s of Array.from(a.touches))
            h = { x: s.clientX, y: s.clientY }, s.point = Utils$2.convertPointFromContext(h, this, !0), s.contextPoint = Utils$2.convertPointFromContext(
              h,
              this.context,
              !0
            );
      }
      return super.emit(e, ...Array.from(t), this);
    }
  }
  once(e, t) {
    return super.once(e, t), this._addListener(e, t);
  }
  addListener(e, t) {
    if (!e)
      throw Error("Layer.on needs a valid event name");
    if (!t)
      throw Error("Layer.on needs an event listener");
    return super.addListener(e, t), this._addListener(e, t);
  }
  removeListener(e, t) {
    if (!e)
      throw Error("Layer.off needs a valid event name");
    return super.removeListener(e, t), this._removeListener(e, t);
  }
  _addListener(e, t) {
    let s;
    if (_$1.startsWith(e, "change:") || (this.ignoreEvents = !1), (Utils$2.domValidEvent(this._element, e) || (s = e, Array.from(_$1.values(Gestures)).includes(s))) && !this._domEventManager.listeners(e).length)
      return this._domEventManager.addEventListener(e, (a) => this.emit(e, a));
  }
  _removeListener(e, t) {
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
    return this.on(Events$6.Click, e);
  }
  onDoubleClick(e) {
    return this.on(Events$6.DoubleClick, e);
  }
  onScrollStart(e) {
    return this.on(Events$6.ScrollStart, e);
  }
  onScroll(e) {
    return this.on(Events$6.Scroll, e);
  }
  onScrollEnd(e) {
    return this.on(Events$6.ScrollEnd, e);
  }
  onScrollAnimationDidStart(e) {
    return this.on(Events$6.ScrollAnimationDidStart, e);
  }
  onScrollAnimationDidEnd(e) {
    return this.on(Events$6.ScrollAnimationDidEnd, e);
  }
  onTouchStart(e) {
    return this.on(Events$6.TouchStart, e);
  }
  onTouchEnd(e) {
    return this.on(Events$6.TouchEnd, e);
  }
  onTouchMove(e) {
    return this.on(Events$6.TouchMove, e);
  }
  onMouseUp(e) {
    return this.on(Events$6.MouseUp, e);
  }
  onMouseDown(e) {
    return this.on(Events$6.MouseDown, e);
  }
  onMouseOver(e) {
    return this.on(Events$6.MouseOver, e);
  }
  onMouseOut(e) {
    return this.on(Events$6.MouseOut, e);
  }
  onMouseEnter(e) {
    return this.on(Events$6.MouseEnter, e);
  }
  onMouseLeave(e) {
    return this.on(Events$6.MouseLeave, e);
  }
  onMouseMove(e) {
    return this.on(Events$6.MouseMove, e);
  }
  onMouseWheel(e) {
    return this.on(Events$6.MouseWheel, e);
  }
  onAnimationStart(e) {
    return this.on(Events$6.AnimationStart, e);
  }
  onAnimationStop(e) {
    return this.on(Events$6.AnimationStop, e);
  }
  onAnimationEnd(e) {
    return this.on(Events$6.AnimationEnd, e);
  }
  onAnimationDidStart(e) {
    return this.on(Events$6.AnimationDidStart, e);
  }
  // Deprecated
  onAnimationDidStop(e) {
    return this.on(Events$6.AnimationDidStop, e);
  }
  // Deprecated
  onAnimationDidEnd(e) {
    return this.on(Events$6.AnimationDidEnd, e);
  }
  // Deprecated
  onImageLoaded(e) {
    return this.on(Events$6.ImageLoaded, e);
  }
  onImageLoadError(e) {
    return this.on(Events$6.ImageLoadError, e);
  }
  onImageLoadCancelled(e) {
    return this.on(Events$6.ImageLoadCancelled, e);
  }
  onMove(e) {
    return this.on(Events$6.Move, e);
  }
  onDragStart(e) {
    return this.on(Events$6.DragStart, e);
  }
  onDragWillMove(e) {
    return this.on(Events$6.DragWillMove, e);
  }
  onDragMove(e) {
    return this.on(Events$6.DragMove, e);
  }
  onDragDidMove(e) {
    return this.on(Events$6.DragDidMove, e);
  }
  onDrag(e) {
    return this.on(Events$6.Drag, e);
  }
  onDragEnd(e) {
    return this.on(Events$6.DragEnd, e);
  }
  onDragAnimationStart(e) {
    return this.on(Events$6.DragAnimationStart, e);
  }
  onDragAnimationEnd(e) {
    return this.on(Events$6.DragAnimationEnd, e);
  }
  onDirectionLockStart(e) {
    return this.on(Events$6.DirectionLockStart, e);
  }
  onStateSwitchStart(e) {
    return this.on(Events$6.StateSwitchStart, e);
  }
  onStateSwitchStop(e) {
    return this.on(Events$6.StateSwitchStop, e);
  }
  onStateSwitchEnd(e) {
    return this.on(Events$6.StateSwitchEnd, e);
  }
  onStateWillSwitch(e) {
    return this.on(Events$6.StateSwitchStart, e);
  }
  // Deprecated
  onStateDidSwitch(e) {
    return this.on(Events$6.StateSwitchEnd, e);
  }
  // Deprecated
  // Gestures
  // Tap
  onTap(e) {
    return this.on(Events$6.Tap, e);
  }
  onTapStart(e) {
    return this.on(Events$6.TapStart, e);
  }
  onTapEnd(e) {
    return this.on(Events$6.TapEnd, e);
  }
  onDoubleTap(e) {
    return this.on(Events$6.DoubleTap, e);
  }
  // Force Tap
  onForceTap(e) {
    return this.on(Events$6.ForceTap, e);
  }
  onForceTapChange(e) {
    return this.on(Events$6.ForceTapChange, e);
  }
  onForceTapStart(e) {
    return this.on(Events$6.ForceTapStart, e);
  }
  onForceTapEnd(e) {
    return this.on(Events$6.ForceTapEnd, e);
  }
  // Press
  onLongPress(e) {
    return this.on(Events$6.LongPress, e);
  }
  onLongPressStart(e) {
    return this.on(Events$6.LongPressStart, e);
  }
  onLongPressEnd(e) {
    return this.on(Events$6.LongPressEnd, e);
  }
  // Swipe
  onSwipe(e) {
    return this.on(Events$6.Swipe, e);
  }
  onSwipeStart(e) {
    return this.on(Events$6.SwipeStart, e);
  }
  onSwipeEnd(e) {
    return this.on(Events$6.SwipeEnd, e);
  }
  onSwipeUp(e) {
    return this.on(Events$6.SwipeUp, e);
  }
  onSwipeUpStart(e) {
    return this.on(Events$6.SwipeUpStart, e);
  }
  onSwipeUpEnd(e) {
    return this.on(Events$6.SwipeUpEnd, e);
  }
  onSwipeDown(e) {
    return this.on(Events$6.SwipeDown, e);
  }
  onSwipeDownStart(e) {
    return this.on(Events$6.SwipeDownStart, e);
  }
  onSwipeDownEnd(e) {
    return this.on(Events$6.SwipeDownEnd, e);
  }
  onSwipeLeft(e) {
    return this.on(Events$6.SwipeLeft, e);
  }
  onSwipeLeftStart(e) {
    return this.on(Events$6.SwipeLeftStart, e);
  }
  onSwipeLeftEnd(e) {
    return this.on(Events$6.SwipeLeftEnd, e);
  }
  onSwipeRight(e) {
    return this.on(Events$6.SwipeRight, e);
  }
  onSwipeRightStart(e) {
    return this.on(Events$6.SwipeRightStart, e);
  }
  onSwipeRightEnd(e) {
    return this.on(Events$6.SwipeRightEnd, e);
  }
  // Pan
  onPan(e) {
    return this.on(Events$6.Pan, e);
  }
  onPanStart(e) {
    return this.on(Events$6.PanStart, e);
  }
  onPanEnd(e) {
    return this.on(Events$6.PanEnd, e);
  }
  onPanLeft(e) {
    return this.on(Events$6.PanLeft, e);
  }
  onPanRight(e) {
    return this.on(Events$6.PanRight, e);
  }
  onPanUp(e) {
    return this.on(Events$6.PanUp, e);
  }
  onPanDown(e) {
    return this.on(Events$6.PanDown, e);
  }
  // Pinch
  onPinch(e) {
    return this.on(Events$6.Pinch, e);
  }
  onPinchStart(e) {
    return this.on(Events$6.PinchStart, e);
  }
  onPinchEnd(e) {
    return this.on(Events$6.PinchEnd, e);
  }
  // Scale
  onScale(e) {
    return this.on(Events$6.Scale, e);
  }
  onScaleStart(e) {
    return this.on(Events$6.ScaleStart, e);
  }
  onScaleEnd(e) {
    return this.on(Events$6.ScaleEnd, e);
  }
  // Rotate
  onRotate(e) {
    return this.on(Events$6.Rotate, e);
  }
  onRotateStart(e) {
    return this.on(Events$6.RotateStart, e);
  }
  onRotateEnd(e) {
    return this.on(Events$6.RotateEnd, e);
  }
  //#############################################################
  //# HINT
  _showHint(e) {
    if (!this.visible || this.opacity === 0)
      return;
    if (!this.shouldShowHint(e)) {
      for (var t of Array.from(this.children))
        t._showHint(e);
      return null;
    }
    let s = this.canvasFrame;
    for (var a of Array.from(this.ancestors()))
      if (a.clip && (s = Utils$2.frameIntersection(s, a.canvasFrame)), !s)
        return;
    return this.showHint(s), _$1.invokeMap(this.children, "_showHint");
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
    for (var t of Array.from(this.listenerEvents()))
      if (Events$6.isInteractive(t))
        return !0;
    return !1;
  }
  showHint(e) {
    const t = new Rn({
      frame: Utils$2.frameInset(e, -1),
      backgroundColor: null,
      borderColor: Framer.Defaults.Hints.color,
      borderRadius: this.borderRadius * Utils$2.average([this.canvasScaleX(), this.canvasScaleY()]),
      borderWidth: 3
    });
    return this._draggable && (t.backgroundColor = null), Utils$2.frameInFrame(this.context.canvasFrame, e) && (t.backgroundColor = null), t.animate({
      properties: { opacity: 0 },
      curve: "ease-out",
      time: 0.5
    }).onAnimationEnd(() => t.destroy());
  }
  //#############################################################
  //# DESCRIPTOR
  toName() {
    return this.name ? name : (this.__framerInstanceInfo != null ? this.__framerInstanceInfo.name : void 0) || "";
  }
  toInspect(e) {
    e == null && (e = this.constructor.name);
    const t = this.name ? `name:${this.name} ` : "";
    return `<${e} ${this.toName()} id:${this.id} ${t} (${Utils$2.roundWhole(this.x)}, ${Utils$2.roundWhole(this.y)}) ${Utils$2.roundWhole(this.width)}x${Utils$2.roundWhole(this.height)}>`;
  }
};
Layer$2.initClass();
function __guardMethod__(r, e, t) {
  if (typeof r < "u" && r !== null && typeof r[e] == "function")
    return t(r, e);
}
class BackgroundLayer extends Layer$2 {
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
class VideoLayer extends Layer$2 {
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
  set(r) {
    this.player.src = r;
  }
});
let _svgMeasureElement = null;
const denyCopy = () => Utils$2.throwInStudioOrWarnInProduction(
  "SVGGroup and SVGPath do not support the `copy` method"
), getSVGMeasureElement = (r = {}) => {
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
}, originTransform = (r, e, t) => {
  const s = t === "originX" ? "width" : t === "originY" ? "height" : null;
  if (!s) return r;
  const a = e[s], h = e._svgSize[s];
  return !(a >= 0) || !(h > 0) ? r : a / h * r;
};
class SVGBaseLayer extends Layer$2 {
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
      layerProperty$1(
        this,
        "originX",
        "webkitTransformOrigin",
        0.5,
        Number.isFinite,
        originTransform
      )
    ), this.define(
      "originY",
      layerProperty$1(
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
      ...Array.from({ length: 9 }, (e, t) => `shadow${t + 1}`),
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
  static alias(e, t) {
    return this.define(e, {
      get() {
        return this[t];
      },
      set(s) {
        this.__applyingDefaults || (this[t] = s);
      }
    });
  }
  constructor(e = {}) {
    super(e), this.updateForDevicePixelRatioChange = this.updateForDevicePixelRatioChange.bind(this), this.resetViewbox = this.resetViewbox.bind(this);
    const { element: t } = e;
    this._element = t, this._elementBorder = t, this._elementHTML = t, this._parent = e.parent, delete e.parent, delete e.element, this._parent instanceof SVGLayer ? (this._stylesAppliedToParent = [
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
    ].forEach((h) => {
      e[h] == null && (e[h] = this._parent[h]);
    })) : this._pixelMultiplierOverride = 1;
    let s = this._parent;
    for (; s && !(s instanceof SVGLayer); )
      s = s._parent;
    this._svgLayer = s, this._svg = s.svg, this._svgSize = s.size;
    const a = [
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
      this.constructor.attributesFromElement(a, t)
    ), this._element.transform.baseVal.numberOfItems > 0) {
      let h, u = [];
      e.x ??= 0, e.y ??= 0, e.rotationZ ??= 0;
      for (let p = 0; p < this._element.transform.baseVal.numberOfItems; p++) {
        h = this._element.transform.baseVal.getItem(p);
        const { matrix: y } = h;
        switch (h.type) {
          case 2:
            e.x += y.e, e.y += y.f, u.push(p);
            break;
          case 4:
            e.rotationZ += -(Math.atan2(y.c, y.d) / Math.PI) * 180, u.push(p);
            break;
        }
      }
      u.reverse().forEach((p) => this._element.transform.baseVal.removeItem(p));
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
    ].forEach((h) => this.on(`change:${h}`, this.resetViewbox));
  }
  calculateSize() {
    let e, t, s = null, a = 1, h = 1, u = this._element;
    if (typeof Framer < "u" && Framer?.CurrentContext?.elementInDOM)
      a = this._parent.canvasScaleX(), h = this._parent.canvasScaleY();
    else {
      e = u.parentElement, t = u.nextSibling;
      const y = getSVGMeasureElement();
      y.appendChild(u), s = y.firstChild, u = s;
    }
    const p = u.getBoundingClientRect();
    this._width = p.width / a, this._height = p.height / h, s && (t ? e.insertBefore(s, t) : e.appendChild(s));
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
  static attributesFromElement(e, t) {
    const s = {};
    for (const a of e) {
      const h = a.replace(
        /-([a-z])/g,
        (u, p) => p.toUpperCase()
      );
      s[h] = t.getAttribute(a);
    }
    return s;
  }
}
SVGBaseLayer.initClass();
const dasharrayTransform = (r) => typeof r == "string" ? (r.includes(",") ? r.split(",") : r.split(" ")).map((t) => parseFloat(t.trim())).filter((t) => !isNaN(t)) : r, dashoffsetTransform = (r) => {
  const e = parseFloat(r);
  return isNaN(e) ? null : e;
};
class SVGPath extends SVGBaseLayer {
  static initClass() {
    const e = (s, a, h, u = {}) => this.define(
      s,
      layerProperty(this, s, s, null, a, h, u)
    );
    e("fill", SVG.validFill, SVG.toFill), e("stroke", SVG.validFill, SVG.toFill), e("strokeWidth", Number.isFinite, parseFloat), e("strokeLinecap", (s) => typeof s == "string"), e("strokeLinejoin", (s) => typeof s == "string"), e("strokeMiterlimit", Number.isFinite, parseFloat), e("strokeOpacity", Number.isFinite, parseFloat), e("strokeDasharray", Array.isArray, dasharrayTransform), e("strokeDashoffset", Number.isFinite, dashoffsetTransform), this.define(
      "strokeLength",
      layerProperty(
        this,
        "strokeLength",
        null,
        void 0,
        Number.isFinite,
        (s, a) => Math.max(0, Math.min(s, a.length)),
        {},
        (s, a) => {
          const h = s.strokeStart ?? 0;
          let u = h + a;
          return u > s.length && (u -= s.length), Object.assign(s._properties, {
            strokeStart: h,
            strokeEnd: u,
            strokeFraction: a / s.length
          }), s.updateStroke();
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
        (s, a) => Math.max(0, Math.min(s, 1)),
        {},
        (s, a) => s.strokeLength = s.length * a
      )
    );
    const t = (s, a, h = !0) => {
      const u = s.strokeStart ?? 0, p = s.strokeEnd ?? s.strokeLength;
      if (h) {
        const y = p ?? s.length;
        s.strokeLength = y >= a ? y - a : s.length - a + y;
      } else
        s.strokeLength = a >= u ? a - u : s.length - u + a;
    };
    this.define(
      "strokeStart",
      layerProperty(
        this,
        "strokeStart",
        null,
        void 0,
        Number.isFinite,
        (s, a) => Math.max(0, Math.min(s, a.length)),
        {},
        (s, a) => t(s, a, !0)
      )
    ), this.define(
      "strokeEnd",
      layerProperty(
        this,
        "strokeEnd",
        null,
        void 0,
        Number.isFinite,
        (s, a) => Math.max(0, Math.min(s, a.length)),
        {},
        (s, a) => t(s, a, !1)
      )
    ), this.define("length", {
      get() {
        return this._length;
      }
    }), this.define("reversed", this.simpleProperty("reversed", !1));
  }
  constructor(e, t = {}) {
    if (super({ element: e, ...t }), e instanceof SVGPath && (e = e.element), e instanceof SVGPathElement)
      this._path = e;
    else if (e instanceof SVGUseElement) {
      const s = e.getAttribute("xlink:href");
      this._path = this._svg.querySelector(s);
    }
    this._length = this._path.getTotalLength();
  }
  updateStroke() {
    const e = this.strokeStart ?? 0, t = this.strokeEnd ?? this.length;
    let s = [], a;
    if (t === e)
      e && s.push(0, e), a = this.length - t, a && s.push(0, a);
    else if (t < e) {
      const h = e - t;
      a = this.length - e, s.push(t, h), a && s.push(a, 0);
    } else {
      const h = t - e;
      a = this.length - t, e && s.push(0, e), (h !== this.length || h !== 0 || e === 0) && (s.push(h), h !== a && a && s.push(a));
    }
    this.reversed && (s.length % 2 === 0 && s.push(0), s.reverse()), this.strokeDasharray = s;
  }
  pointAtFraction(e) {
    return this.reversed && (e = 1 - e), this._path.getPointAtLength(this.length * e);
  }
  rotationAtFraction(e, t = 0.01) {
    this.reversed && (e = 1 - e), t = Math.max(t, 0.01);
    const s = this.pointAtFraction(Math.max(e - t, 0)), a = this.pointAtFraction(Math.min(e + t, 1));
    let h = Math.atan2(s.y - a.y, s.x - a.x) * 180 / Math.PI - 90;
    return this.reversed && (h = 360 - h), h;
  }
  start(e = null) {
    const t = this.convertPointToLayer(
      this.pointAtFraction(0),
      e?.parent,
      !1
    );
    return t.rotation = this.rotationAtFraction(0), t;
  }
  end(e = null) {
    const t = this.convertPointToLayer(
      this.pointAtFraction(1),
      e?.parent,
      !1
    );
    return t.rotation = this.rotationAtFraction(1), t;
  }
  valueUpdater(e, t, s) {
    switch (e) {
      case "horizontal":
        return s -= this.pointAtFraction(0).x, (a, h) => t[a] = s + this.pointAtFraction(h).x;
      case "vertical":
        return s -= this.pointAtFraction(0).y, (a, h) => t[a] = s + this.pointAtFraction(h).y;
      case "angle":
        return s -= this.rotationAtFraction(0), (a, h, u = 0) => {
          u !== 0 && (t[a] = s + this.rotationAtFraction(h, u));
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
  constructor(e, t = {}) {
    t.element = e, super(t);
    const { children: s, targets: a } = SVG.constructSVGElements(
      this,
      this._element.childNodes,
      SVGPath,
      SVGGroup
    );
    this._children = s, this.elements = a, SVG.updateGradientSVG(this);
  }
  static defineGroupProxyProp(e, t = SVG.validFill, s = SVG.toFill) {
    const a = `_${e}`;
    return this.define(e, {
      get() {
        if (this[a] != null) return this[a];
        let h = null;
        for (const u of this._children) {
          const p = u[e];
          if (h === null)
            h = p;
          else if (!Utils$2.equal(p, h))
            return this[a] ?? null;
        }
        return h;
      },
      set(h) {
        t(h) || (h = s(h)), this[a] = t(h) ? h : null;
        const u = this[a];
        this._children.forEach(
          (p) => p[e] = u
        );
      }
    });
  }
}
SVGGroup.initClass();
const updateIdsToBeUnique = function(r) {
  const e = Utils$2.getIdAttributesFromString(r);
  for (var t of Array.from(e)) {
    var s = Utils$2.getUniqueId(t);
    t !== s && (t = Utils$2.escapeForRegex(t), r = r.replace(
      new RegExp(`((id|xlink:href)=["'']\\#?)${t}(["'])`, "g"),
      `$1${s}$3`
    ), r = r.replace(
      new RegExp(`(["'']url\\(\\#)${t}(\\)["'])`, "g"),
      `$1${s}$2`
    ));
  }
  return r;
};
let SVGLayer$1 = class extends Layer$2 {
  static initClass() {
    this.define("elements", this.simpleProperty("elements", {})), this.define(
      "fill",
      layerProperty$1(this, "fill", "fill", null, SVG.validFill, SVG.toFill)
    ), this.define(
      "stroke",
      layerProperty$1(this, "stroke", "stroke", null, SVG.validFill, SVG.toFill)
    ), this.define(
      "strokeWidthMultiplier",
      layerProperty$1(this, "strokeWidthMultiplier", null, null, _$1.isNumber)
    ), this.define(
      "strokeWidth",
      layerProperty$1(
        this,
        "strokeWidth",
        "strokeWidth",
        null,
        _$1.isNumber,
        null,
        { depends: ["strokeWidthMultiplier"] }
      )
    ), this.define(
      "color",
      layerProperty$1(
        this,
        "color",
        "color",
        null,
        Color$1.validColorValue,
        Color$1.toColor,
        null,
        (e, t) => e.fill = t,
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
        return e === null ? this._setPropertyValue("imageSize", e) : !_$1.isFinite(e.width) || !_$1.isFinite(e.height) ? void 0 : (this._setPropertyValue("imageSize", {
          width: e.width,
          height: e.height
        }), SVG.updateImagePatternSVG(this));
      }
    }), this.define("svg", {
      get() {
        const e = _$1.first(
          this._elementHTML != null ? this._elementHTML.children : void 0
        );
        return e instanceof SVGElement ? e : null;
      },
      set(e) {
        if (typeof e == "string")
          return this.html = updateIdsToBeUnique(e);
        if (e instanceof SVGElement) {
          const a = e.querySelectorAll("[id]");
          for (var t of Array.from(a)) {
            var s = document.querySelector(
              `[id='${t.id}']`
            );
            if (s != null) {
              Utils$2.throwInStudioOrWarnInProduction(
                Layer$2.ExistingIdMessage("svg", t.id)
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
    const { svg: t } = this;
    if (t != null) {
      const { targets: s, children: a } = SVG.constructSVGElements(
        this,
        t.childNodes,
        SVGPath,
        SVGGroup
      );
      this.elements = s, this._children = a;
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
    const t = new this.constructor(e);
    return t.style = this.style, t;
  }
};
SVGLayer$1.initClass();
let _measureElement = null;
const getMeasureElement = function(r) {
  for (r == null && (r = {}), !_measureElement && (_measureElement = document.createElement("div"), _measureElement.id = "_measureElement", _measureElement.style.position = "fixed", _measureElement.style.visibility = "hidden", _measureElement.style.top = "-10000px", _measureElement.style.left = "-10000px", window.document.body ? window.document.body.appendChild(_measureElement) : (document.write(_measureElement.outerHTML), _measureElement = document.getElementById("_measureElement"))); _measureElement.hasChildNodes(); )
    _measureElement.removeChild(_measureElement.lastChild);
  return _measureElement.style.width = "10000px", r.max ? (r.width && (_measureElement.style.maxWidth = `${r.width}px`), r.height && (_measureElement.style.maxHeight = `${r.height}px`)) : (r.width && (_measureElement.style.width = `${r.width}px`), r.height && (_measureElement.style.height = `${r.height}px`)), _measureElement;
};
class InlineStyle {
  static initClass() {
    this.prototype.startIndex = 0, this.prototype.endIndex = 0, this.prototype.css = null, this.prototype.text = "", this.prototype.element = null;
  }
  constructor(e, t) {
    _.isString(e) ? (this.text = e, this.startIndex = 0, this.endIndex = this.text.length, this.css = t) : (this.startIndex = e.startIndex, this.endIndex = e.endIndex, this.css = e.css, this.text = t.substring(this.startIndex, this.endIndex));
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
    const t = document.createElement("span");
    for (var s in this.css) {
      var a = this.css[s];
      t.style[s] = a;
    }
    return this.text === "" && e ? t.innerHTML = "<br/>" : t.textContent = this.text, t;
  }
  setText(e) {
    return this.text = e, this.endIndex = this.startIndex + e.length;
  }
  resetStyle(e) {
    if (delete this.css[e], e === "color")
      return delete this.css.WebkitTextFillColor;
  }
  setStyle(e, t) {
    return this.css[e] = t, this.element != null ? this.element.style[e] = t : void 0;
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
  replaceText(e, t) {
    let s = null;
    if (_.isString(e) ? s = new RegExp(Utils.escapeForRegex(e), "g") : e instanceof RegExp && (s = e), s != null)
      return this.text = this.text.replace(s, t), this.endIndex = this.startIndex + this.text.length;
  }
  addRangesFrom(e, t, s, a) {
    const { text: h } = this;
    for (e.lastIndex = 0; ; ) {
      var u = e.exec(h);
      if (!u)
        return;
      var p = u[1];
      if (!p)
        return;
      a[p] || (a[p] = {
        block: t,
        inline: s,
        start: u.index,
        length: u[0].length,
        name: p
      });
    }
  }
  replaceRange(e, t, s) {
    return this.text = this.text.slice(0, e) + s + this.text.slice(e + t), this.endIndex = this.startIndex + this.text.length;
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
    const { text: t } = e;
    if (this.text = t, e.inlineStyles != null)
      this.inlineStyles = e.inlineStyles.map(
        (s) => new InlineStyle(s, t)
      );
    else if (e.css != null) {
      const s = new InlineStyle(this.text, e.css);
      this.inlineStyles = [s];
    } else
      throw new Error("Should specify inlineStyles or css");
  }
  copy() {
    const e = new StyledTextBlock({ text: this.text, inlineStyles: [] });
    return e.inlineStyles = this.inlineStyles.map((t) => t.copy()), e;
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
    const t = this.inlineStyles.length === 1;
    for (var s of Array.from(this.inlineStyles)) {
      var a = s.createElement(t);
      s.element = a, e.appendChild(a);
    }
    return e;
  }
  measure() {
    let e = 0;
    for (var t of Array.from(this.inlineStyles))
      e += t.measure().width;
    const s = this.element.getBoundingClientRect();
    return {
      width: e,
      height: s.bottom - s.top
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
    const t = _.first(this.inlineStyles);
    return t.setText(e), this.inlineStyles = [t];
  }
  setTextOverflow(e, t) {
    return t == null && (t = 1), ["ellipsis", "clip"].includes(e) ? (this.setStyle("overflow", "hidden"), e === "ellipsis" ? (this.setStyle("WebkitLineClamp", t), this.setStyle("WebkitBoxOrient", "vertical"), this.setStyle("display", "-webkit-box")) : (this.resetStyle("WebkitLineClamp"), this.resetStyle("WebkitBoxOrient"), this.setStyle("display", "block"), this.setStyle("whiteSpace", "nowrap"), this.setStyle("textOverflow", e))) : (this.resetStyle("whiteSpace"), this.resetStyle("textOverflow"), this.resetStyle("display"), this.resetStyle("overflow"), this.resetStyle("WebkitLineClamp"), this.resetStyle("WebkitBoxOrient"));
  }
  resetStyle(e) {
    return this.inlineStyles.map(
      (t) => t.resetStyle(e)
    );
  }
  setStyle(e, t) {
    return this.inlineStyles.map(
      (s) => s.setStyle(e, t)
    );
  }
  getStyle(e) {
    return _.first(this.inlineStyles).getStyle(e);
  }
  getFonts() {
    const e = [];
    for (var t of Array.from(this.inlineStyles)) {
      var s = t.getStyle("fontFamily");
      s != null && e.push(s);
    }
    return e;
  }
  replaceText(e, t) {
    let s = 0;
    for (var a of Array.from(this.inlineStyles))
      a.startIndex = s, a.replaceText(e, t), s = a.endIndex;
    const h = this.inlineStyles.map((u) => u.text).join("");
    return this.text = h, h !== this.text;
  }
  addRangesFrom(e, t, s) {
    return this.inlineStyles.forEach(
      (a, h) => a.addRangesFrom(e, t, h, s)
    );
  }
  replaceRange(e, t, s, a) {
    let h = 0;
    for (let y = 0; y < this.inlineStyles.length; y++) {
      var u = this.inlineStyles[y];
      u.startIndex = h, y === e && u.replaceRange(t, s, a), h += u.text.length, u.endIndex = h;
    }
    const p = this.inlineStyles.map((y) => y.text).join("");
    return this.text = p;
  }
  validate() {
    let e = "", t = 0;
    for (var s of Array.from(this.inlineStyles)) {
      if (t !== s.startIndex || !s.validate())
        return !1;
      t = s.endIndex, e += s.text;
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
    this.textAlign = e?.alignment != null ? e?.alignment : "left", e?.blocks != null ? this.blocks = e.blocks.map((t) => new StyledTextBlock(t)) : this.blocks = [];
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
    let t;
    if (e != null) {
      this.element = e;
      for (t in StyledText.defaultStyles) {
        var s = StyledText.defaultStyles[t];
        this.element.style[t] || (this.element.style[t] = s);
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
        for (var t of Array.from(this.blocks)) {
          var s = t.createElement();
          t.element = s, e.push(this.element.appendChild(s));
        }
        return e;
      })();
    }
  }
  addBlock(e, t = null) {
    let s;
    return t != null ? s = new StyledTextBlock({
      text: e,
      css: t
    }) : this.blocks.length > 0 ? (s = _.last(this.blocks).clone(), s.setText(e)) : s = new StyledTextBlock({
      text: e,
      css: {}
    }), this.blocks.push(s);
  }
  getText() {
    return this.blocks.map((e) => e.text).join(`
`);
  }
  setText(e) {
    const t = e.split(`
`);
    return this.blocks = this.blocks.slice(0, t.length), (() => {
      const s = [];
      for (let u = 0; u < t.length; u++) {
        var a = t[u];
        if (this.blocks[u] != null) {
          var h = this.blocks[u];
          s.push(h.setText(a));
        } else
          s.push(this.addBlock(a));
      }
      return s;
    })();
  }
  setTextOverflow(e) {
    return this.textOverflow = e;
  }
  setStyle(e, t) {
    return this.blocks.map((s) => s.setStyle(e, t));
  }
  resetStyle(e) {
    return this.blocks.map((t) => t.resetStyle(e));
  }
  getStyle(e, t = null) {
    let s;
    return (s = __guard__$2(
      t ?? _.first(this.blocks),
      (a) => a.getStyle(e)
    )) != null ? s : this.element != null ? this.element.style[e] : void 0;
  }
  getFonts() {
    let e = [];
    const t = this.element != null ? this.element.style.fontFamily : void 0;
    t != null && e.push(t);
    for (var s of Array.from(this.blocks))
      e = e.concat(s.getFonts());
    return _.uniq(e);
  }
  measure(e) {
    const t = {};
    t.width = e.width * e.multiplier, t.height = e.height * e.multiplier;
    const s = getMeasureElement(t);
    let a = 0, h = 0;
    const u = this.element.parentNode;
    s.appendChild(this.element);
    for (var p of Array.from(this.blocks)) {
      var y = p.measure();
      a = Math.max(a, y.width);
      var S = t.height != null ? t.height / e.multiplier : null;
      if (!this.autoWidth && this.textOverflow != null && ["clip", "ellipsis"].includes(this.textOverflow) && S != null && h + y.height > S) {
        var L = parseFloat(this.getStyle("fontSize", p)), M = parseFloat(this.getStyle("lineHeight", p)), R = S - h;
        if (R > 0) {
          var k = Math.max(
            1,
            Math.floor(R / (L * M))
          );
          p.setTextOverflow(this.textOverflow, k);
        } else
          p.setStyle("visibility", "hidden");
        y.height = R;
      } else
        p.setTextOverflow(null);
      h += y.height;
    }
    s.removeChild(this.element), u?.appendChild(this.element);
    const q = {};
    return this.autoWidth && (q.width = Math.ceil(a)), this.autoHeight && (q.height = Math.ceil(h)), q;
  }
  textReplace(e, t) {
    return this.blocks.map((s) => s.replaceText(e, t));
  }
  // must be called first, calling it repeatedly does nothing, returns the first name from the templates
  buildTemplate() {
    if (this._templateRanges)
      return this._firstTemplateName;
    const e = /\{\s*(\w+)\s*\}/g, t = {};
    this.blocks.forEach(
      (a, h) => a.addRangesFrom(e, h, t)
    ), this._templateRanges = Object.keys(t).map((a) => t[a]).sort(function(a, h) {
      const u = h.block - a.block;
      if (u !== 0)
        return u;
      const p = h.inline - a.inline;
      return p !== 0 ? p : h.start - a.start;
    });
    const s = this._templateRanges[this._templateRanges.length - 1];
    return this._firstTemplateName = s ? s.name : null, this._templateBlocks = this.blocks.map((a) => a.copy()), this._firstTemplateName;
  }
  template(e) {
    return this.blocks = this._templateBlocks.map((t) => t.copy()), (() => {
      const t = [];
      for (var s of Array.from(this._templateRanges)) {
        var a = e[s.name];
        if (a != null) {
          _.isFunction(s.formatter) && (a = s.formatter.call(this, a));
          var h = this.blocks[s.block];
          t.push(
            h.replaceRange(s.inline, s.start, s.length, a)
          );
        }
      }
      return t;
    })();
  }
  templateFormatter(e) {
    return (() => {
      const t = [];
      for (var s of Array.from(this._templateRanges)) {
        var a = e[s.name];
        a != null && t.push(s.formatter = a);
      }
      return t;
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
function __guard__$2(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
const validateFont = (r) => _.isString(r) || _.isObject(r), fontFamilyFromObject = function(r) {
  return _.isObject(r) ? r.fontFamily : r;
}, textProperty = (r, e, t, s, a, h) => layerProperty$1(
  r,
  e,
  e,
  t,
  s,
  a,
  {},
  h,
  "_elementHTML"
), asPadding = function(r) {
  if (_.isNumber(r))
    return r;
  if (!_.isObject(r))
    return 0;
  const e = {};
  let t = !1;
  r.horizontal != null && (r.left == null && (r.left = r.horizontal), r.right == null && (r.right = r.horizontal)), r.vertical != null && (r.top == null && (r.top = r.vertical), r.bottom == null && (r.bottom = r.vertical));
  for (var s of ["left", "right", "bottom", "top"])
    t || (t = _.has(r, s)), e[s] = r[s] != null ? r[s] : 0;
  return t ? e : 0;
};
class TextLayer extends Layer$2 {
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
    ], this._textStyleProperties = _.pull(
      _.clone(TextLayer._textProperties),
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
        const t = this._styledText.getFonts(), s = Utils.isFontFamilyLoaded(t);
        if (_.isObject(s))
          return s.then(() => this.renderText());
      }
    }), this.define(
      "autoWidth",
      this.proxyProperty("_styledText.autoWidth", {
        didSet(e, t) {
          return e.renderText();
        }
      })
    ), this.define(
      "autoHeight",
      this.proxyProperty("_styledText.autoHeight", {
        didSet(e, t) {
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
        _.isString,
        fontFamilyFromObject,
        function(e, t) {
          if (t === null)
            return;
          e.font = t;
          const s = Utils.isFontFamilyLoaded(t);
          if (_.isObject(s))
            return s.then(() => setTimeout(e.renderText, 0));
        }
      )
    ), this.define("fontWeight", textProperty(this, "fontWeight", null)), this.define(
      "fontStyle",
      textProperty(this, "fontStyle", "normal", _.isString)
    ), this.define(
      "textDecoration",
      textProperty(this, "textDecoration", null, _.isString)
    ), this.define(
      "fontSize",
      textProperty(
        this,
        "fontSize",
        null,
        _.isNumber,
        null,
        function(e, t) {
          if (t === null || e.__constructor)
            return;
          const s = LayerStyle.fontSize(e);
          return e._styledText.setStyle("fontSize", s);
        }
      )
    ), this.define("textAlign", textProperty(this, "textAlign", null)), this.define(
      "letterSpacing",
      textProperty(this, "letterSpacing", null, _.isNumber)
    ), this.define(
      "lineHeight",
      textProperty(this, "lineHeight", null, _.isNumber)
    ), this.define(
      "wordSpacing",
      textProperty(this, "wordSpacing", null, _.isNumber)
    ), this.define(
      "textTransform",
      textProperty(this, "textTransform", "none", _.isString)
    ), this.define(
      "textIndent",
      textProperty(this, "textIndent", null, _.isNumber)
    ), this.define("wordWrap", textProperty(this, "wordWrap", null, _.isString)), this.define("textOverflow", {
      get() {
        return this._styledText.textOverflow;
      },
      set(e) {
        return this.clip = _.isString(e), this._styledText.setTextOverflow(e), this.renderText(!0);
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
      textProperty(this, "whiteSpace", null, _.isString)
    ), this.define("direction", textProperty(this, "direction", null, _.isString)), this.define("html", {
      get() {
        return (this._elementHTML != null ? this._elementHTML.innerHTML : void 0) || "";
      }
    }), this.define(
      "font",
      layerProperty$1(
        this,
        "font",
        null,
        null,
        validateFont,
        null,
        {},
        function(e, t) {
          if (t !== null) {
            if (_.isObject(t)) {
              e.fontFamily = t.fontFamily, e.fontWeight = t.fontWeight;
              return;
            }
            return /\d/.test(t) ? e._styledText.setStyle("font", t) : e.fontFamily = t;
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
      layerProperty$1(this, "padding", "padding", 0, null, asPadding)
    ), this.define("text", {
      get() {
        return this._styledText.getText();
      },
      set(e) {
        return _.isString(e) || (e = String(e)), this._styledText.setText(e), this.renderText(), this.emit("change:text", e);
      }
    }), this.define("template", {
      get() {
        return _.clone(this._templateData);
      },
      set(e) {
        this._templateData || (this._templateData = {});
        const t = this._styledText.buildTemplate();
        if (_.isObject(e))
          _.assign(this._templateData, e);
        else {
          if (!t)
            return;
          this._templateData[t] = e;
        }
        const s = this.text;
        if (this._styledText.template(this._templateData), this.text !== s)
          return this.renderText(), this.emit("change:text", this.text);
      }
    }), this.define("templateFormatter", {
      get() {
        return this._templateFormatter;
      },
      set(e) {
        const t = this._styledText.buildTemplate();
        if (_.isFunction(e) || !_.isObject(e)) {
          if (!t)
            return;
          const s = {};
          s[t] = e, e = s;
        }
        return this._styledText.templateFormatter(e);
      }
    });
  }
  constructor(e) {
    let t, s;
    if (this.updateAutoWidth = this.updateAutoWidth.bind(this), this.updateAutoHeight = this.updateAutoHeight.bind(this), this.renderText = this.renderText.bind(this), e == null && (e = {}), _.defaults(e, {
      shadowType: "text",
      clip: !1,
      createHTMLElement: !0
    }), e.styledTextOptions != null && (e.styledText = e.styledTextOptions, delete e.styledTextOptions), e.styledText != null)
      delete e.text, this.styledTextOptions = e.styledText, e.color == null && (e.color = this._styledText.getStyle("color")), e.fontSize == null && (e.fontSize = parseFloat(this._styledText.getStyle("fontSize"))), e.fontFamily == null && (e.fontFamily = this._styledText.getStyle("fontFamily")), e.letterSpacing == null && (e.letterSpacing = parseFloat(
        this._styledText.getStyle("letterSpacing")
      )), e.textAlign == null && (e.textAlign = this._styledText.textAlign), t = this._styledText.getStyle("fontWeight"), t != null && (e.fontWeight = parseFloat(t)), s = this._styledText.getStyle("lineHeight"), s == null || s === "normal" ? s = 1.25 : s = parseFloat(s), e.lineHeight == null && (e.lineHeight = s);
    else {
      _.defaults(e, {
        backgroundColor: "transparent",
        text: "Hello World",
        color: "#888",
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 1.25,
        padding: 0
      }), e.font == null && e.fontFamily == null && (e.fontFamily = this.defaultFont());
      let { text: y } = e;
      _.isString(y) || (y = String(y)), this._styledText.addBlock(y, { fontSize: `${e.fontSize}px` });
    }
    if (super(e), this.__constructor = !0, e.autoSize)
      this.autoWidth = !0, this.autoHeight = !0;
    else if (e.autoSize !== !1 && !e.truncate) {
      if (e.autoWidth == null) {
        const y = e.width != null || _.isNumber(e.size) || (e.size != null ? e.size.width : void 0) != null || (e.frame != null ? e.frame.width : void 0) != null;
        this.autoWidth = !y;
      }
      if (e.autoHeight == null) {
        const y = e.height != null || _.isNumber(e.size) || (e.size != null ? e.size.height : void 0) != null || (e.frame != null ? e.frame.height : void 0) != null;
        this.autoHeight = !y;
      }
    }
    const { constraintValues: a } = e;
    if (a) {
      const y = _.isNumber(a.top) && _.isNumber(a.bottom), S = _.isNumber(a.heightFactor);
      this.autoHeight = !(S || y);
    }
    e.styledText == null && this.font == null && (this.font = this.fontFamily), this._styledText.setElement(this._elementHTML), delete this.__constructor, this.renderText();
    for (var h in e) {
      var u = e[h];
      _.isFunction(u) && this[h] != null && (this[h] = u);
    }
    for (var p of Array.from(TextLayer._textStyleProperties))
      ((y) => this.on(`change:${y}`, (S) => {
        if (S !== null)
          return ["fontSize", "font"].includes(y) || this._styledText.resetStyle(y), this.renderText();
      }))(p);
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
    const t = new this.constructor(e);
    return t.style = this.style, t;
  }
  renderText(e) {
    let t, s;
    if (e == null && (e = !1), this.__constructor || (this._styledText.render(), this._updateHTMLScale(), this.autoSize || (this.width < this._elementHTML.clientWidth || this.height < this._elementHTML.clientHeight) && (this.clip = !0), !e && !this.autoHeight && !this.autoWidth && this.textOverflow === null))
      return;
    const a = Utils.rectZero(Utils.parseRect(this.padding));
    this.autoWidth ? s = null : s = this.size.width - (a.left + a.right), this.autoHeight ? t = null : t = this.size.height - (a.top + a.bottom);
    const h = {
      width: s,
      height: t,
      multiplier: this.context.pixelMultiplier
    }, u = this._styledText.measure(h);
    return this.disableAutosizeUpdating = !0, u.width != null && (this.width = u.width + a.left + a.right), u.height != null && (this.height = u.height + a.top + a.bottom), this.disableAutosizeUpdating = !1;
  }
  defaultFont() {
    return Utils.deviceFont(Framer.Device.platform());
  }
  textReplace(e, t) {
    const s = this.text;
    if (this._styledText.textReplace(e, t), this.text !== s)
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
    return this.stop(), this._onStart(), e.map((t) => (this._started.push(t), t.onAnimationHalt(() => {
      this._halted.push(t), !(this._halted.length > 1) && (this._stop(), this._onHalt());
    }), t.onAnimationStop(() => {
      this._stopped.push(t), this._stopped.length === this._started.length && this._onStop();
    }), t.onAnimationEnd(() => {
      this._ended.push(t), this._ended.length === this._started.length && this._onEnd();
    }), t.start()));
  }
  _stop() {
    if (!(!this._started || !this.stopAnimations))
      return this._started.map((e) => e.isAnimating ? e.stop() : void 0);
  }
  _onStart() {
    this.emit(Events$6.AnimationStart);
  }
  _onHalt() {
    this.emit(Events$6.AnimationHalt);
  }
  _onStop() {
    this.emit(Events$6.AnimationStop);
  }
  _onEnd() {
    this.emit(Events$6.AnimationEnd);
  }
  onAnimationStart(e) {
    return this.on(Events$6.AnimationStart, e);
  }
  onAnimationHalt(e) {
    return this.on(Events$6.AnimationHalt, e);
  }
  onAnimationStop(e) {
    return this.on(Events$6.AnimationStop, e);
  }
  onAnimationEnd(e) {
    return this.on(Events$6.AnimationEnd, e);
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
        for (const t of this._layers ?? [])
          for (const s of Object.keys(t.states ?? {}))
            e.includes(s) || e.push(s);
        return e;
      }
    });
  }
  constructor(...e) {
    super(...e), this._layers = e.flat(), this._state = "default";
  }
  animate(e) {
    const t = [];
    for (const s of this._layers)
      s.states?.[e] && t.push(s.animate(e, { start: !1 }));
    t.length && (this._start(t), this._state = e);
  }
  stateCycle(...e) {
    let t = e.flat();
    return t.length || (t = this.states), this.animate(Utils$2.arrayNext(t, this.state));
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
  convertPointToLayer(e, t) {
    return Utils.convertPointFromContext(e, t, !1, !0);
  }
  convertPointToCanvas(e) {
    const t = Framer.Device.context;
    return Utils.convertPointToContext(e, t, !0, !1);
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
const Screen$1 = new ScreenClass(), pixelRound = parseInt, center = (r, e, t = 0) => {
  let s = r.parent ?? Screen;
  const a = s.borderWidth ?? 0, h = pixelRound(
    s.width / 2 - r.width / 2 - a + t
  ), u = pixelRound(
    s.height / 2 - r.height / 2 - a + t
  );
  return e === "x" ? h : e === "y" ? u : e === "point" ? { x: h, y: u } : 0;
}, left = (r, e, t = 0) => {
  if (e !== "x") throw new Error("Align.left only works for x");
  return pixelRound(t);
}, right = (r, e, t = 0) => {
  if (e !== "x") throw new Error("Align.right only works for x");
  const s = r.parent ?? Screen, a = s.borderWidth ?? 0;
  return pixelRound(s.width - 2 * a - r.width + t);
}, top = (r, e, t = 0) => {
  if (e !== "y") throw new Error("Align.top only works for y");
  return pixelRound(t);
}, bottom = (r, e, t = 0) => {
  if (e !== "y") throw new Error("Align.bottom only works for y");
  const s = r.parent ?? Screen, a = s.borderWidth ?? 0;
  return pixelRound(s.height - 2 * a - r.height + t);
}, wrapper = (r, e) => {
  const t = (s, a) => s == null || typeof s == "number" ? (h, u) => r(h, u, s ?? 0) : r(s, a, 0);
  return t.toInspect = () => `Align.${e}`, t;
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
  addListener(e, t, s = !1) {
    t.capture = s, super.addListener(e, t), this.element.addEventListener(e, t, s);
  }
  removeListener(e, t, s = !1) {
    super.removeListener(e, t), this.element.removeEventListener(e, t.capture);
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
            (t) => t.updateForDevicePixelRatioChange()
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
        return _$1.clone(this._layers);
      }
    }), this.define("layerCounter", {
      get() {
        return this._layerCounter;
      }
    }), this.define("rootLayers", {
      get() {
        return _$1.filter(this._layers, (e) => e.parent === null);
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
        return _$1.clone(this._animations);
      }
    }), this.define("timers", {
      get() {
        return _$1.clone(this._timers);
      }
    }), this.define("intervals", {
      get() {
        return _$1.clone(this._intervals);
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
        return _$1.pick(this.frame, ["width", "height"]);
      }
    }), this.define("point", {
      get() {
        return _$1.pick(this.frame, ["x", "y"]);
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
        const t = Utils$2.webkitPerspectiveForValue(e);
        if (t != null)
          return this._perspective = e, this._element != null ? this._element.style.webkitPerspective = t : void 0;
      }
    }), this.define("perspectiveOriginX", {
      get() {
        return _$1.isNumber(this._perspectiveOriginX) ? this._perspectiveOriginX : 0.5;
      },
      set(e) {
        if (_$1.isNumber(e))
          return this._perspectiveOriginX = e, this._updatePerspective();
      }
    }), this.define("perspectiveOriginY", {
      get() {
        return _$1.isNumber(this._perspectiveOriginY) ? this._perspectiveOriginY : 0.5;
      },
      set(e) {
        if (_$1.isNumber(e))
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
    return _$1.clone(Contexts);
  }
  constructor(e) {
    if (this.layout = this.layout.bind(this), e == null && (e = {}), e = Defaults$1.getDefaults("Context", e), super(...arguments), !e.name)
      throw Error("Contexts need a name");
    this._parent = e.parent, this._name = e.name, this.perspective = e.perspective, this.perspectiveOriginX = e.perspectiveOriginX, this.perspectiveOriginY = e.perspectiveOriginY, this.elementInDOM = !1, this.reset(), e.hasOwnProperty("index") ? this.index = e.index : this.index = this.id, Contexts.push(this);
  }
  reset() {
    return this._createDOMEventManager(), this._createRootElement(), this.resetFrozenEvents(), this.resetLayers(), this.resetAnimations(), this.resetTimers(), this.resetIntervals(), this.emit("reset", this);
  }
  destroy() {
    return this.reset(), this._destroyRootElement(), _$1.remove(Contexts, this);
  }
  addLayer(e) {
    if (!Array.from(this._layers).includes(e))
      return this._layerCounter++, this._layers.push(e);
  }
  removeLayer(e) {
    return this._layers = _$1.without(this._layers, e);
  }
  resetLayers() {
    return this.resetGestures(), this._layers = [], this._layerCounter = 0;
  }
  layerForId(e) {
    for (var t of Array.from(this._layers))
      if (t.id === e)
        return t;
    return null;
  }
  _layerForElement(e) {
    for (var t of Array.from(this._layers))
      if (t._element === e)
        return t;
    return null;
  }
  layerForElement(e) {
    if (!e)
      return null;
    const t = this._layerForElement(e);
    return t || this.layerForElement(e.parentNode);
  }
  selectLayer(e) {
    return Utils$2.findLayer(this._layers, e);
  }
  selectAllLayers(e) {
    return Utils$2.filterLayers(this._layers, e);
  }
  layout() {
    return this.rootLayers.map((e) => e.layout());
  }
  addAnimation(e) {
    if (!Array.from(this._animations).includes(e))
      return this._animations.push(e);
  }
  removeAnimation(e) {
    return this._animations = _$1.without(this._animations, e);
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
    return window.clearTimeout(e), this._timers = _$1.without(this._timers, e);
  }
  resetTimers() {
    return this._timers && this._timers.map(window.clearTimeout), this._timers = [];
  }
  addInterval(e) {
    if (!Array.from(this._intervals).includes(e))
      return this._intervals.push(e);
  }
  removeInterval(e) {
    return this._intervals = _$1.without(this._intervals, e);
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
    const t = Framer.CurrentContext;
    return Framer.CurrentContext = this, e(), Framer.CurrentContext = t;
  }
  //#############################################################
  // Freezing
  freeze() {
    if (this._frozenEvents != null)
      throw new Error("Context is already frozen");
    this._frozenEvents = {};
    for (var e of Array.from(this._layers)) {
      var t = {};
      for (var s of Array.from(e.listenerEvents()))
        t[s] = e.listeners(s);
      e.removeAllListeners();
      var a = this._layers.indexOf(e);
      this._frozenEvents[a] = t;
    }
    return this.stopAnimations(), this.resetTimers(), this.resetIntervals();
  }
  resume() {
    if (this._frozenEvents == null)
      throw new Error("Context is not frozen, cannot resume");
    for (var e in this._frozenEvents) {
      var t = this._frozenEvents[e], s = this._layers[e];
      for (var a in t) {
        var h = t[a];
        for (var u of Array.from(h))
          s.on(a, u);
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
    const e = Utils$2.webkitPerspectiveForValue(this.perspective);
    return e != null && (this._element.style.webkitPerspective = e), this._element.style.backgroundColor = this.backgroundColor, this.__pendingElementAppend = () => {
      let t = this._parent != null ? this._parent._element : void 0;
      return t == null && (t = document.body), t.appendChild(this._element), this.elementInDOM = !0, this._layers != null ? this._layers.map((s) => s.elementInsertedIntoDocument()) : void 0;
    }, Utils$2.domComplete(this.__pendingElementAppend);
  }
  _destroyRootElement() {
    return this._element != null && this._element.parentNode && (this._element.parentNode.removeChild(this._element), this.elementInDOM = !1), this.__pendingElementAppend && (Utils$2.domCompleteCancel(this.__pendingElementAppend), this.__pendingElementAppend = null), this._element = null;
  }
  _updatePerspective() {
    return this._element != null ? this._element.style.webkitPerspectiveOrigin = `${this.perspectiveOriginX * 100}% ${this.perspectiveOriginY * 100}%` : void 0;
  }
  containers(e, t) {
    return t == null && (t = []), this._parent != null ? (t.push(this._parent), this._parent != null ? this._parent.containers(!0, t) : void 0) : t;
  }
  toInspect() {
    const e = function(t) {
      return parseInt(t) === t ? parseInt(t) : Utils$2.round(t, 1);
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
      this._container = new Layer$2({
        backgroundColor: null
      }), this._container.style.zIndex = 999, this._printLayer = new Layer$2({
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
      }), this._closeButton = new Layer$2({
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
    const t = "» ", s = document.createElement("div");
    return s.style.userSelect = "text", s.style.cursor = "auto", s.innerHTML = Utils$2.escape(
      t + e.map((a) => Utils$2.inspect(a)).join(", ")
    ) + "<br>", this._printLayer._element.appendChild(s), this.scrollToBottom(), Utils$2.delay(0, this.scrollToBottom);
  }
  scrollToBottom() {
    this._printLayer && (this._printLayer._element.scrollTop = this._printLayer._element.scrollHeight);
  }
}
let _printer = null;
function print$1(...r) {
  return _printer || (_printer = new Printer()), _printer.print(...r);
}
Events$6.ScrollStart = "scrollstart";
Events$6.Scroll = "scroll";
Events$6.ScrollMove = Events$6.Scroll;
Events$6.ScrollEnd = "scrollend";
Events$6.ScrollAnimationDidStart = "scrollanimationdidstart";
Events$6.ScrollAnimationDidEnd = "scrollanimationdidend";
const EventMappers = {};
EventMappers[Events$6.Move] = Events$6.Move;
EventMappers[Events$6.ScrollStart] = Events$6.DragStart;
EventMappers[Events$6.ScrollMove] = Events$6.DragMove;
EventMappers[Events$6.ScrollEnd] = Events$6.DragEnd;
EventMappers[Events$6.ScrollAnimationDidStart] = Events$6.DragAnimationStart;
EventMappers[Events$6.ScrollAnimationDidEnd] = Events$6.DragAnimationEnd;
EventMappers[Events$6.DirectionLockStart] = Events$6.DirectionLockStart;
let ScrollComponent$1 = class extends Layer$2 {
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
        return _$1.clone(this._contentInset);
      },
      set(e) {
        if (this._contentInset = Utils$2.rectZero(Utils$2.parseRect(e)), !this.content)
          return;
        const t = this.calculateContentFrame();
        return t.x = t.x + this._contentInset.left, t.y = t.y + this._contentInset.top, this.content.frame = t, this.updateContent();
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
    }), this.prototype._onMouseWheelEnd = Utils$2.debounce(0.3, function(e) {
      return this.emit(Events$6.ScrollEnd, e), this._mouseWheelScrolling = !1;
    });
  }
  constructor(e) {
    this.updateContent = this.updateContent.bind(this), this._onAnimationStart = this._onAnimationStart.bind(this), this._onAnimationStep = this._onAnimationStep.bind(this), this._onAnimationStop = this._onAnimationStop.bind(this), this._onMouseWheel = this._onMouseWheel.bind(this), e == null && (e = {}), super(Defaults$1.getDefaults("ScrollComponent", e)), this._contentInset = e.contentInset || Utils$2.rectZero(), this.setContentLayer(new Layer$2()), this._applyProxyDefaults(e), this._enableMouseWheelHandling(e.mouseWheelEnabled), e.hasOwnProperty("wrap") && wrapComponent(this, e.wrap);
  }
  calculateContentFrame() {
    if (!this.content)
      return Utils$2.rectZero();
    const e = this.content.contentFrame();
    return {
      x: 0,
      y: 0,
      width: Math.max(this.width, e.x + e.width),
      height: Math.max(this.height, e.y + e.height)
    };
  }
  setContentLayer(e) {
    return this.content && (this._onAnimationStop(), this.content.off(Events$6.AnimationStart, this._onAnimationStart), this.content.off(Events$6.AnimationStop, this._onAnimationStop), this._content.destroy()), this._content = e, this._content.parent = this, this._content.name = "content", this._content.clip = !0, this._content.draggable.enabled = !0, this._content.draggable.momentum = !0, this._content.on("change:children", this.updateContent), this.on("change:width", this.updateContent), this.on("change:height", this.updateContent), this.updateContent(), this.scrollPoint = { x: 0, y: 0 }, this.content.on(Events$6.AnimationStart, this._onAnimationStart), this.content.on(Events$6.AnimationStop, this._onAnimationStop), this._content;
  }
  updateContent() {
    if (!this.content)
      return;
    const e = this.calculateContentFrame();
    this.content.width = e.width, this.content.height = e.height;
    let t = this.calculateContentFrame();
    if (t = {
      x: -t.width + this.width - this._contentInset.right,
      y: -t.height + this.height - this._contentInset.bottom,
      width: t.width + t.width - this.width + this._contentInset.left + this._contentInset.right,
      height: t.height + t.height - this.height + this._contentInset.top + this._contentInset.bottom
    }, this.content.draggable.constraints = t, this.scrollPoint = this.scrollPoint, this.content.children.length && this.content.backgroundColor != null && this.content.backgroundColor.isEqual(
      Framer.Defaults.Layer.backgroundColor
    ))
      return this.content.backgroundColor = null;
  }
  _calculateContentPoint(e) {
    e = _$1.defaults(e, { x: 0, y: 0 }), e.x -= this.contentInset.left, e.y -= this.contentInset.top;
    const t = this._pointInConstraints(e);
    return Utils$2.pointInvert(t);
  }
  scrollToPoint(e, t, s) {
    t == null && (t = !0), s == null && (s = { curve: "spring(500, 50, 0)" });
    const a = this._calculateContentPoint(e);
    return this.content.draggable.animateStop(), t ? (e = {}, a.hasOwnProperty("x") && (e.x = a.x), a.hasOwnProperty("y") && (e.y = a.y), this.content.animateStop(), this.content.animate(e, s)) : this.content.point = a;
  }
  scrollToTop(e, t) {
    return e == null && (e = !0), t == null && (t = { curve: "spring(500, 50, 0)" }), this.scrollToPoint({ x: 0, y: 0 }, e, t);
  }
  scrollToLayer(e, t, s, a, h) {
    let u;
    if (t == null && (t = 0), s == null && (s = 0), a == null && (a = !0), h == null && (h = { curve: "spring(500, 50, 0)" }), e && e.parent !== this.content)
      throw Error(
        "Can't scroll to this layer because it's not in the ScrollComponent. Add it to the content like layer.parent = scroll.content."
      );
    return !e || this.content.children.length === 0 ? u = { x: 0, y: 0 } : (u = this._scrollPointForLayer(e, t, s), u.x -= this.width * t, u.y -= this.height * s), this.scrollToPoint(u, a, h), e;
  }
  scrollToClosestLayer(e, t, s, a) {
    e == null && (e = 0), t == null && (t = 0), s == null && (s = !0), a == null && (a = { curve: "spring(500, 50, 0)" });
    const h = this.closestContentLayer(
      e,
      t,
      s,
      a
    );
    return h ? (this.scrollToLayer(h, e, t), h) : (h || this.scrollToPoint({ x: 0, y: 0 }), null);
  }
  closestContentLayer(e, t) {
    e == null && (e = 0), t == null && (t = 0);
    const s = Utils$2.framePointForOrigin(
      this.scrollFrame,
      e,
      t
    );
    return this.closestContentLayerForScrollPoint(
      s,
      e,
      t
    );
  }
  closestContentLayerForScrollPoint(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), _$1.head(
      this._contentLayersSortedByDistanceForScrollPoint(
        e,
        t,
        s
      )
    );
  }
  _onAnimationStart(e) {
    return this.content.on("change:frame", this._onAnimationStep);
  }
  _onAnimationStep(e) {
    return this.content.emit(Events$6.Move, this.content.point), this.emit(Events$6.Scroll, e);
  }
  _onAnimationStop() {
    return this.content.off("change:frame", this._onAnimationStep);
  }
  _scrollPointForLayer(e, t, s, a) {
    return t == null && (t = 0), s == null && (s = 0), Utils$2.framePointForOrigin(e, t, s);
  }
  _contentLayersSortedByDistanceForScrollPoint(e, t, s) {
    return t == null && (t = 0), s == null && (s = 0), Utils$2.frameSortByAbsoluteDistance(
      e,
      this.content.children,
      t,
      s
    );
  }
  _pointInConstraints(e) {
    const { minX: t, maxX: s, minY: a, maxY: h } = this.content.draggable._calculateConstraints(
      this.content.draggable.constraints
    );
    return e = {
      x: -Utils$2.clamp(-e.x, t, s),
      y: -Utils$2.clamp(-e.y, a, h)
    }, e;
  }
  //#############################################################
  // Map scroll events to content.draggable
  addListener(...e) {
    const t = Math.max(e.length, 1), s = e.slice(0, t - 1), a = e[t - 1];
    return super.addListener(...arguments), (() => {
      const h = [];
      for (var u of Array.from(s)) {
        var p;
        p = u, Array.from(_$1.keys(EventMappers)).includes(p) ? h.push(this.content.on(EventMappers[u], a)) : h.push(void 0);
      }
      return h;
    })();
  }
  removeListener(...e) {
    const t = Math.max(e.length, 1), s = e.slice(0, t - 1), a = e[t - 1];
    return super.removeListener(...arguments), (() => {
      const h = [];
      for (var u of Array.from(s)) {
        var p;
        p = u, Array.from(_$1.keys(EventMappers)).includes(p) ? h.push(this.content.off(EventMappers[u], a)) : h.push(void 0);
      }
      return h;
    })();
  }
  _enableMouseWheelHandling(e) {
    return e ? this.on(Events$6.MouseWheel, this._onMouseWheel) : this.off(Events$6.MouseWheel, this._onMouseWheel);
  }
  _onMouseWheel(e) {
    let t = 0, s = 0;
    if (this.scrollHorizontal && (t = e.wheelDeltaX), this.scrollVertical && (s = e.wheelDeltaY), t === 0 && s === 0)
      return;
    this._mouseWheelScrolling || (this._mouseWheelScrolling = !0, this.emit(Events$6.ScrollStart, e)), this.content.animateStop();
    const { minX: a, maxX: h, minY: u, maxY: p } = this.content.draggable._calculateConstraints(
      this.content.draggable.constraints
    ), y = {
      x: Utils$2.clamp(
        this.content.x + t * this.mouseWheelSpeedMultiplier,
        a,
        h
      ),
      y: Utils$2.clamp(
        this.content.y + s * this.mouseWheelSpeedMultiplier,
        u,
        p
      )
    };
    return this.content.point = y, this.content.emit(Events$6.Move, y), this.emit(Events$6.Scroll, e), this._onMouseWheelEnd(e);
  }
  //#############################################################
  // Copying
  copy() {
    const e = super.copy(...arguments), t = _$1.head(_$1.without(e.children, e.content));
    return e.setContentLayer(t), e.props = this.props, e;
  }
  //#############################################################
  // Convenience function to make a single layer scrollable
  static wrap(e, t) {
    return wrapComponent(new this(t), e, t);
  }
};
ScrollComponent$1.initClass();
var wrapComponent = function(r, e, t) {
  if (t == null && (t = { correct: !0 }), !(e instanceof Layer$2))
    throw new Error(
      `ScrollComponent.wrap expects a layer, not ${e}. Are you sure the layer exists?`
    );
  const s = r, a = r.constructor.name === "PageComponent";
  if (t.correct === !0 && e.children.length === 0 && !a) {
    const h = new Layer$2();
    h.frame = e.frame, e.parent = h, e.x = e.y = 0, e = h;
  }
  if (s.frame = e.frame, s.parent = e.parent, s.index = e.index, e.name != null && !a && (s.name = e.name), s.__framerInstanceInfo == null && (s.__framerInstanceInfo = {}), s.__framerInstanceInfo != null && (s.__framerInstanceInfo.name = r.constructor.name), e.image && !a && (s.image = e.image, e.image = null), a ? s.addPage(e) : s.setContentLayer(e), t.correct === !0) {
    const { screenFrame: h } = s;
    h.x < Screen.width && h.x + h.width > Screen.width && (s.width = Screen.width - h.x), h.y < Screen.height && h.y + h.height > Screen.height && (s.height = Screen.height - h.y);
  }
  return s;
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
    ), this.content.draggable.momentum = !1, this.content.draggable.bounce = !1, this.content.on(Events$6.DragSessionStart, this._scrollStart), this.content.on(Events$6.DragSessionEnd, this._scrollEnd), this.content.on("change:frame", _.debounce(this._scrollMove, 16)), this.content.on("change:children", this._resetHistory), this._resetHistory();
  }
  nextPage(e, t = null, s) {
    let a;
    e == null && (e = "right"), s == null && (s = !0), t == null && ({ currentPage: t } = this);
    let h = { x: 0, y: 0 };
    return t && (h = Utils.framePointForOrigin(
      t,
      this.originX,
      this.originY
    )), s || (h = {
      x: this.scrollX + this.originX * this.width,
      y: this.scrollY + this.originY * this.height
    }), ["up", "top", "north"].includes(e) && (a = this.content.childrenAbove(h, this.originX, this.originY)), ["down", "bottom", "south"].includes(e) && (a = this.content.childrenBelow(h, this.originX, this.originY)), ["left", "west"].includes(e) && (a = this.content.childrenLeft(h, this.originX, this.originY)), ["right", "east"].includes(e) && (a = this.content.childrenRight(h, this.originX, this.originY)), s && (a = _.without(a, t)), a = Utils.frameSortByAbsoluteDistance(
      h,
      a,
      this.originX,
      this.originY
    ), _.head(a);
  }
  snapToPage(e, t, s = null) {
    if (t == null && (t = !0), this.scrollToLayer(
      e,
      this.originX,
      this.originY,
      t,
      s
    ), this.currentPage !== e)
      return this._previousPages.push(e), this.emit("change:previousPage", this.previousPage), this.emit("change:currentPage", this.currentPage);
  }
  snapToNextPage(e, t, s = null) {
    e == null && (e = "right"), t == null && (t = !0), s == null && ({ animationOptions: s } = this);
    let a = this.nextPage(e);
    return a == null && (a = this.closestPage), this.snapToPage(a, t, s);
  }
  snapToPreviousPage(e, t = null) {
    if (e == null && (e = !0), !!this.previousPage)
      return t == null && ({ animationOptions: t } = this), this.snapToPage(this.previousPage, e, t), this._previousPages = this._previousPages.slice(
        0,
        +(this._previousPages.length - 3) + 1 || void 0
      );
  }
  addPage(e, t) {
    t == null && (t = "right");
    const s = "down,bottom,southright,east";
    if (Array.from(s).includes(!t))
      throw t = "right", new Error(`${t} should be in ${s}`);
    const a = { x: 0, y: 0 };
    return this.content.children.length && (["right", "east"].includes(t) && (a.x = Utils.frameGetMaxX(this.content.contentFrame())), ["down", "bottom", "south"].includes(t) && (a.y = Utils.frameGetMaxY(this.content.contentFrame()))), e.point = a, e.parent !== this.content ? e.parent = this.content : this.updateContent();
  }
  horizontalPageIndex(e) {
    return _.sortBy(this.content.children, (t) => t.x).indexOf(e);
  }
  verticalPageIndex(e) {
    return _.sortBy(this.content.children, (t) => t.y).indexOf(e);
  }
  _scrollStart() {
    return this._currentPage = this.currentPage;
  }
  _scrollMove() {
    let e;
    const { currentPage: t } = this;
    if (e = t, ![_.last(this._previousPages), void 0].includes(e))
      return this._previousPages.push(t), this.emit("change:currentPage", {
        old: this.previousPage,
        new: t
      });
  }
  _scrollEnd() {
    if (this.content.isAnimating)
      return;
    const { velocity: e } = this.content.draggable, t = !this.scrollHorizontal && (this.direction === "right" || this.direction === "left"), s = !this.scrollVertical && (this.direction === "down" || this.direction === "up"), a = this.content.draggable._directionLockEnabledX && (this.direction === "right" || this.direction === "left"), h = this.content.draggable._directionLockEnabledY && (this.direction === "down" || this.direction === "up");
    if (Math.max(
      Math.abs(e.x),
      Math.abs(e.y)
    ) < this.velocityThreshold || a || h || t || s)
      return this.snapToPage(this.closestPage, !0, this.animationOptions);
    let p = this.nextPage(this.direction, this._currentPage, !1);
    return p == null && (p = this.closestPage), this.snapToPage(p, !0, this.animationOptions);
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
const Utils$1 = require("../Utils"), { Layer: Layer$1 } = require("../Layer"), { Events: Events$1 } = require("../Events");
Events$1.SliderValueChange = "sliderValueChange";
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
        const t = this.knob.borderRadius * 2 === this._knobSize;
        return this._knobSize = e, this.knob.width = this._knobSize, this.knob.height = this._knobSize, t && (this.knob.borderRadius = this._knobSize / 2), this._updateFrame();
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
    }), super(e), this.knobSize = e.knobSize, this.knob.parent = this.fill.parent = this.sliderOverlay.parent = this, this.width > this.height ? this.fill.height = this.height : this.fill.width = this.width, this.fill.borderRadius = this.sliderOverlay.borderRadius = this.borderRadius, this.knob.draggable.enabled = !0, this.knob.draggable.overdrag = !1, this.knob.draggable.momentum = !0, this.knob.draggable.momentumOptions = { friction: 5, tolerance: 0.25 }, this.knob.draggable.bounce = !1, this.knob.borderRadius = this.knobSize / 2, this._updateFrame(), this._updateKnob(), this._updateFill(), this.on("change:frame", this._updateFrame), this.on("change:borderRadius", this._setRadius), this.knob.on("change:size", this._updateKnob), this.knob.on("change:frame", this._updateFill), this.knob.on("change:frame", this._knobDidMove), this.sliderOverlay.on(Events$1.TapStart, this._tapStart), this.sliderOverlay.on(Events$1.TapEnd, this._tapEnd);
  }
  _tapStart(e) {
    if (e.preventDefault(), this.width > this.height) {
      const t = Events$1.touchEvent(e).clientX - Screen.canvasFrame.x, s = this.canvasScaleX();
      this.value = this.valueForPoint(t / s - this.screenFrame.x);
    } else {
      const t = Events$1.touchEvent(e).clientY - Screen.canvasFrame.y, s = this.canvasScaleY();
      this.value = this.valueForPoint(t / s - this.screenFrame.y);
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
      return this._lastUpdatedValue = this.value, this.emit("change:value", this.value), this.emit(Events$1.SliderValueChange, this.value);
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
  animateToValue(e, t) {
    if (t == null && (t = { curve: "spring(300, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? t.properties = {
        x: this.pointForValue(e) - this.knob.width / 2
      } : t.properties = {
        y: this.pointForValue(e) - this.knob.height / 2
      }, this.knob.animate(t);
  }
  //#############################################################
  //# EVENT HELPERS
  onValueChange(e) {
    return this.on(Events$1.SliderValueChange, e);
  }
}
SliderComponent.initClass();
Events$6.SliderValueChange = "sliderValueChange";
Events$6.SliderMinValueChange = "sliderMinValueChange";
Events$6.SliderMaxValueChange = "sliderMaxValueChange";
class Knob extends Layer$2 {
  constructor(e) {
    e == null && (e = {}), _.defaults(e, {
      backgroundColor: "#fff",
      shadowY: 2,
      shadowBlur: 4,
      shadowColor: "rgba(0, 0, 0, 0.3)"
    }), super(e);
  }
}
class RangeSliderComponent extends Layer$2 {
  static initClass() {
    this.define("constrained", this.simpleProperty("constrained", !1)), this.define("knobSize", {
      get() {
        return this._knobSize;
      },
      set(e) {
        for (var t of [this.minKnob, this.maxKnob]) {
          var s = t.borderRadius * 2 === this._knobSize;
          this._knobSize = e, t.size = this._knobSize, s && (t.borderRadius = this._knobSize / 2);
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
    }), this.fill = new Layer$2({
      backgroundColor: "#333",
      width: 0,
      force2d: !0,
      name: "fill"
    }), this.sliderOverlay = new Layer$2({
      backgroundColor: null,
      name: "sliderOverlay"
    }), super(e), this.width > this.height ? this.fill.height = this.height : this.fill.width = this.width, this.fill.borderRadius = this.sliderOverlay.borderRadius = this.borderRadius, this.knobSize = e.knobSize, this._styleKnob(this.minKnob), this._styleKnob(this.maxKnob), this._updateFrame(), this._updateFill(), this._updateKnob(), this.on("change:frame", this._updateFrame), this.on("change:borderRadius", this._setRadius);
    for (var t of [this.minKnob, this.maxKnob])
      t.on("change:size", this._updateKnob), t.on("change:frame", this._updateFill), t.on("change:frame", this._knobDidMove), t.on("change:frame", this._updateFrame);
    this.sliderOverlay.on(Events$6.TapStart, this._tapStart), this.sliderOverlay.on(Events$6.TapEnd, this._tapEnd);
  }
  _tapStart(e) {
    let t;
    if (e.preventDefault(), this.width > this.height) {
      const s = Events$6.touchEvent(e).clientX - Screen.canvasFrame.x, a = this.canvasScaleX();
      t = this.valueForPoint(s / a - this.x), t > this.maxValue && (this.maxValue = t, this.maxKnob.draggable._panStart(e), this.emit(Events$6.SliderMaxValueChange, this.maxValue)), t < this.minValue && (this.minValue = t, this.minKnob.draggable._panStart(e), this.emit(Events$6.SliderMinValueChange, this.minValue));
    } else {
      const s = Events$6.touchEvent(e).clientY - Screen.canvasFrame.y, a = this.canvasScaleY();
      t = this.valueForPoint(s / a - this.y), t > this.maxValue && (this.maxValue = t, this.maxKnob.draggable._panStart(e), this.emit(Events$6.SliderMaxValueChange, this.maxValue)), t < this.minValue && (this.minValue = t, this.minKnob.draggable._panStart(e), this.emit(Events$6.SliderMinValueChange, this.minValue));
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
    if (this.emit(Events$6.SliderValueChange), this.minKnob.draggable.isMoving && this.emit(Events$6.SliderMinValueChange, this.minValue), this.maxKnob.draggable.isMoving)
      return this.emit(Events$6.SliderMaxValueChange, this.maxValue);
  }
  // Retrieve the point (x or y coordinate) of a certain numeric value.
  pointForValue(e) {
    for (var t of [this.minKnob, this.maxKnob])
      return this.width > this.height ? this.constrained ? Utils$2.modulate(
        e,
        [this.min, this.max],
        [0 + t.width / 2, this.width - t.width / 2],
        !0
      ) : Utils$2.modulate(
        e,
        [this.min, this.max],
        [0, this.width],
        !0
      ) : this.constrained ? Utils$2.modulate(
        e,
        [this.min, this.max],
        [0 + t.height / 2, this.height - t.height / 2],
        !0
      ) : Utils$2.modulate(
        e,
        [this.min, this.max],
        [0, this.height],
        !0
      );
  }
  // Retrieve the numeric value of a certain point (x or y coordinate).
  valueForPoint(e) {
    for (var t of [this.minKnob, this.maxKnob])
      return this.width > this.height ? this.constrained ? Utils$2.modulate(
        e,
        [0 + t.width / 2, this.width - t.width / 2],
        [this.min, this.max],
        !0
      ) : Utils$2.modulate(
        e,
        [0, this.width],
        [this.min, this.max],
        !0
      ) : this.constrained ? Utils$2.modulate(
        e,
        [0 + t.height / 2, this.height - t.height / 2],
        [this.min, this.max],
        !0
      ) : Utils$2.modulate(
        e,
        [0, this.height],
        [this.min, this.max],
        !0
      );
  }
  animateToMinValue(e, t) {
    if (t == null && (t = { curve: "spring(250, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? t.properties = {
        x: this.pointForValue(e) - this.minKnob.width / 2
      } : t.properties = {
        y: this.pointForValue(e) - this.minKnob.height / 2
      }, this.minKnob.animate(t);
  }
  animateToMaxValue(e, t) {
    if (t == null && (t = { curve: "spring(250, 25, 0)" }), !!_.isFinite(e))
      return this.width > this.height ? t.properties = {
        x: this.pointForValue(e) - this.maxKnob.width / 2
      } : t.properties = {
        y: this.pointForValue(e) - this.maxKnob.height / 2
      }, this.maxKnob.animate(t);
  }
  //#############################################################
  //# EVENT HELPERS
  onValueChange(e) {
    return this.on(Events$6.SliderValueChange, e);
  }
  onMinValueChange(e) {
    return this.on(Events$6.SliderMinValueChange, e);
  }
  onMaxValueChange(e) {
    return this.on(Events$6.SliderMaxValueChange, e);
  }
}
RangeSliderComponent.initClass();
const centerLayer = (r, e = !1) => {
  const { frame: t } = r;
  return r.parent ? (Utils$2.frameSetMidX(
    t,
    r.parent.width / 2 - r.parent.borderWidth
  ), Utils$2.frameSetMidY(
    t,
    r.parent.height / 2 - r.parent.borderWidth
  )) : (Utils$2.frameSetMidX(t, r._context.innerWidth / 2), Utils$2.frameSetMidY(t, r._context.innerHeight / 2)), e && (t.x = Math.round(t.x), t.y = Math.round(t.y)), r.frame = t, r.frame;
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
        let t = null;
        if (_$1.isString(e)) {
          const u = e.toLowerCase();
          for (var s of Array.from(_$1.keys(Devices))) {
            var a = s.toLowerCase();
            u === a && (t = Devices[s]);
          }
        }
        if (!t)
          throw Error(
            `No device named ${e}. Options are: ${_$1.keys(Devices)}`
          );
        if (this._device === t)
          return;
        const h = this._deviceType === "fullscreen";
        if (this.screen.backgroundColor = "black", t.backgroundColor != null && (this.screen.backgroundColor = t.backgroundColor), t.deviceType === "computer" && Utils$2.domComplete(() => document.body.style.cursor = "auto"), this._device = _$1.clone(t), this._deviceType = e, this.fullscreen = !1, this._updateDeviceImage(), this._updateMaskImage(), this._update(), this.emit("change:deviceType"), this.viewport.point = this._viewportOrientationOffset(), h)
          return this.deviceScale = "fit";
      }
    }), this.define("hideBezel", {
      get() {
        return this._forceHideBezel ? !0 : !Utils$2.isFramerStudio() && this._forceHide ? !1 : this._hideBezel != null ? this._hideBezel : !1;
      },
      set(e) {
        if (Utils$2.isFramerStudio())
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
        return Utils$2.isMobile() ? window.orientation : this._orientation || 0;
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
    this._update = this._update.bind(this), this.customize = this.customize.bind(this), this._updateDeviceImage = this._updateDeviceImage.bind(this), this._updateMaskImage = this._updateMaskImage.bind(this), this.forceHideBezel = this.forceHideBezel.bind(this), this._viewportOrientationOffset = this._viewportOrientationOffset.bind(this), this._orientationChange = this._orientationChange.bind(this), e == null && (e = {});
    let t = Defaults$1.getDefaults("DeviceComponent", e);
    Framer.Defaults.hasOwnProperty("DeviceView") && (t = _$1.extend(t, Framer.Defaults.DeviceView)), this._setup(), this.animationOptions = t.animationOptions, this.deviceType = t.deviceType, _$1.extend(this, _$1.defaults(e, t)), this.Type = {
      Tablet: "tablet",
      Phone: "phone",
      Computer: "computer"
    };
  }
  _setup() {
    if (!this._setupDone) {
      this._setupDone = !0, this.background = new Layer$2(), this.background.clip = !0, this.background.backgroundColor = "transparent", this.background.classList.add("DeviceBackground"), this.hands = new Layer$2({ name: "hands" }), this.handsImageLayer = new Layer$2({
        parent: this.hands,
        name: "handsImage"
      }), this.phone = new Layer$2({ parent: this.hands, name: "phone" }), this.screenBackground = new Layer$2({
        parent: this.hands,
        name: "screenBackground",
        backgroundColor: "black"
      }), this.screen = new Layer$2({ parent: this.hands, name: "phone" }), this.viewport = new Layer$2({ parent: this.screen, name: "screen" }), this.content = new Layer$2({ parent: this.viewport, name: "viewport" }), this.screenMask = new Layer$2({
        parent: this.screen,
        name: "mask",
        backgroundColor: null
      }), this.content.classList.add("DeviceContent"), this.hands.backgroundColor = "transparent", this.hands._alwaysUseImageCache = !0, this.handsImageLayer.backgroundColor = "transparent", this.hands.classList.add("DeviceHands"), this.phone.backgroundColor = "transparent", this.phone.classList.add("DevicePhone"), this.screen.classList.add("DeviceScreen"), this.screen.clip = !0, this.viewport.backgroundColor = "transparent", this.viewport.classList.add("DeviceComponentPort"), this.content.backgroundColor = "transparent", this.content.classList.add("DeviceContent"), this.content.originX = 0, this.content.originY = 0, Utils$2.isMobile() || Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this._update), Utils$2.isMobile() && Framer.CurrentContext.domEventManager.wrap(window).addEventListener("resize", this._orientationChange);
      for (var e of [
        this.background,
        this.phone,
        this.viewport,
        this.content,
        this.screen,
        this.screenMask
      ])
        e.on("touchmove", (t) => t.preventDefault());
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
    let e, t, s = this.contentScale;
    s > 1 && (s = 1);
    let a = !1;
    if (this._shouldRenderFullScreen()) {
      const { clientWidth: u } = document.documentElement, { clientHeight: p } = document.documentElement;
      if (Utils$2.isMobile()) {
        if (t = screen.width * window.devicePixelRatio, e = screen.height * window.devicePixelRatio, u < p && t > e || u > p && t < e) {
          const y = t;
          t = e, e = y;
        }
      } else
        t = u / s, e = p / s;
      a = this.content.width !== t || this.content.height !== e;
      for (var h of [
        this.background,
        this.hands,
        this.phone,
        this.viewport,
        this.content,
        this.screen,
        this.screenMask
      ])
        h.x = h.y = 0, h.width = t, h.height = e, h.scale = 1;
      this.content.scale = s, (this.deviceType !== "fullscreen" || Utils$2.isMobile()) && (a = a || this._context.devicePixelRatio !== window.devicePixelRatio, this._context.devicePixelRatio = window.devicePixelRatio), this.screenBackground.visible = this.deviceType !== "fullscreen", Utils$2.isMobile() ? this.screenMask.visible = !1 : this._updateMaskImage();
    } else {
      if (this.background.x = -100, this.background.y = -100, this.background.width = window.innerWidth + 200, this.background.height = window.innerHeight + 200, this.disableSizeUpdates)
        return;
      this._updateDeviceImage(), this._updateMaskImage(), this.screenMask.visible = this.hideBezel, this.hands.scale = this._calculatePhoneScale(), centerLayer(this.hands, !0), centerLayer(this.phone), [t, e] = Array.from(
        this._getOrientationDimensions(
          this._device.screenWidth / s,
          this._device.screenHeight / s
        )
      ), this.screenMask.width = this.screen.width = this.viewport.width = this._device.screenWidth, this.screenMask.height = this.screen.height = this.viewport.height = this._device.screenHeight, a = this.content.width !== t || this.content.height !== e, this.content.width = t, this.content.height = e, this.screenBackground.width = this.screen.width + 40, this.screenBackground.height = this.screen.height + 40, this.selectedHand && this._orientation === 0 && this.setHand(this.selectedHand), centerLayer(this.screenBackground, !0), centerLayer(this.screen, !0), centerLayer(this.screenMask, !0);
      const p = this._device.devicePixelRatio != null ? this._device.devicePixelRatio : 1;
      a = a || this._context.devicePixelRatio !== p, this._context.devicePixelRatio = p, window.devicePixelRatio === p && Utils$2.isDesktop() ? (this._context.renderUsingNativePixelRatio = !0, this.content.scale = p) : (this._context.renderUsingNativePixelRatio = !1, this.content.scale = 1);
    }
    if (a)
      return Screen.emit("resize");
  }
  _shouldRenderFullScreen() {
    return !this._device || this.fullScreen === !0 || this.deviceType === "fullscreen" ? !0 : Utils$2.isInsideIframe() ? !1 : Utils$2.deviceType() === "phone" && Utils$2.deviceType() === this._device.deviceType || Utils$2.deviceType() === "tablet" && Utils$2.deviceType() === this._device.deviceType || Utils$2.deviceType() === "phone" && this._device.deviceType === "tablet";
  }
  setupContext() {
    return Framer.CurrentContext = this._context;
  }
  platform() {
    return /google|nexus|htc|samsung|sony-smartwatch/.test(this.deviceType) ? "Android" : /iphone|ipad/.test(this.deviceType) ? "iOS" : /apple-watch|applewatch/.test(this.deviceType) ? "watchOS" : /apple|safari/.test(this.deviceType) ? "macOS" : /microsoft|dell/.test(this.deviceType) ? "Windows" : null;
  }
  _setFullScreen(e) {
    if (this._deviceType !== "fullscreen" && _$1.isBoolean(e) && e !== this._fullScreen)
      return this._fullScreen = e, e === !0 ? (this.phone.image = "", this.hands.image = "") : this._updateDeviceImage(), this._updateMaskImage(), this._update(), this.emit("change:fullScreen");
  }
  //##########################################################################
  // DEVICE TYPE
  customize(e) {
    return Devices.custom = _$1.defaults(e, Devices.custom), this.deviceType = "custom", this._update();
  }
  _updateDeviceImage() {
    if (!/PhantomJS/.test(navigator.userAgent))
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
    if (_$1.startsWith(e, "http://") || _$1.startsWith(e, "https://") || !Array.from(BuiltInDevices).includes(this._deviceType) || this._deviceType === "custom")
      return e;
    let t = "//resources.framerjs.com/static/DeviceResources";
    if (Utils$2.isFileUrl(window.location.href) && (t = `http:${t}`), Utils$2.isFramerStudio() && window.FramerStudioInfo && (this._device.minStudioVersion && Utils$2.framerStudioVersion() >= this._device.minStudioVersion || !this._device.minStudioVersion) && (this._device.maxStudioVersion && Utils$2.framerStudioVersion() <= this._device.maxStudioVersion || !this._device.maxStudioVersion))
      return t = window.FramerStudioInfo.deviceImagesUrl, `${t}/${e.replace(".png", ".jp2")}`;
    if (this._device.deviceImageCompression === !0) {
      if (Utils$2.isWebPSupported())
        return `${t}/${e.replace(".png", ".webp")}`;
      if (Utils$2.isJP2Supported())
        return `${t}/${e.replace(".png", ".jp2")}`;
    }
    return `${t}/${e}`;
  }
  forceHideBezel(e) {
    return e == null && (e = !0), this._forceHideBezel = e, this._update();
  }
  setDeviceScale(e, t) {
    let s;
    if (t == null && (t = !1), e === "fit" || e < 0 ? e = "fit" : e = parseFloat(e), e !== this._deviceScale && (this._deviceScale = e, !this._shouldRenderFullScreen()))
      return e === "fit" ? s = this._calculatePhoneScale() : s = e, this.hands.animateStop(), t ? this.hands.animate(
        _$1.extend(this.animationOptions, { properties: { scale: s } })
      ) : (this.hands.scale = s, centerLayer(this.hands, !0)), this.emit("change:deviceScale");
  }
  _calculatePhoneScale(e, t) {
    let s;
    const a = this.hideBezel ? this.screen : this.phone, [h, u] = Array.from(
      this._getOrientationDimensions(a.width, a.height)
    );
    if (this.hideBezel)
      s = 0;
    else {
      const y = (this._device != null ? this._device.paddingOffset : void 0) || 0;
      s = (this.padding + y) * 2;
    }
    e == null && (e = window.innerWidth), t == null && (t = window.innerHeight);
    let p = _$1.min([
      (e - s) / h,
      (t - s) / u
    ]);
    return p = Math.floor(p * 1024) / 1024, p < 1 / 64 && (p = 1 / 64), (!Utils$2.isFramerStudio() || !this.hideBezel) && (30 / 64 < p && p < 35 / 64 ? p = 32 / 64 : 15 / 64 < p && p < 18 / 64 && (p = 16 / 64)), p > 1 && !this.hideBezel && (p = 1), this.emit("change:phoneScale", p), this._deviceScale && this._deviceScale !== "fit" ? this._deviceScale : p;
  }
  setContentScale(e, t) {
    if (t == null && (t = !1), e = parseFloat(e), !(e <= 0) && e !== this._contentScale)
      return this._contentScale = e, t ? this.content.animate(
        _$1.extend(this.animationOptions, {
          properties: { scale: this._contentScale }
        })
      ) : this.content.scale = this._contentScale, this._update(), this.emit("change:contentScale");
  }
  setOrientation(e, t, s = null) {
    let a;
    if (t == null && (t = !1), Utils$2.framerStudioVersion() === oldDeviceMaxVersion && (e *= -1), e === "portrait" && (e = 0), e === "landscape" && (e = 90), this._shouldRenderFullScreen() || (e = parseInt(e), ![0, 90, -90].includes(e)) || e === this._orientation)
      return;
    this._orientation = e;
    const h = { rotationZ: -this._orientation }, u = _$1.clone(this.animationOptions);
    s != null ? (a = this._calculatePhoneScale(
      s.width,
      s.height
    ), h.x = s.width / 2 - this.hands.width / 2, h.y = s.height / 2 - this.hands.height / 2, u.time = null, u.curve = Spring({ tension: 342.10059, friction: 28.97662 })) : a = this._calculatePhoneScale(), h.scale = a;
    const p = this._viewportOrientationOffset();
    if (this.hands.animateStop(), this.viewport.animateStop(), t) {
      const y = this.background.backgroundColor, S = this.screenBackground.visible;
      this.hideBezel && (this.screenBackground.visible = !1, this.background.backgroundColor = this.screen.backgroundColor, this.disableSizeUpdates = !0);
      const L = this.hands.animate(
        _$1.extend(u, { properties: h })
      );
      this.viewport.animate(
        _$1.extend(u, { properties: p })
      ), L.on(Events$6.AnimationEnd, () => this._update()), L.on(Events$6.AnimationStop, () => (this.disableSizeUpdates = !1, this.background.backgroundColor = y, this.screenBackground.visible = S));
    } else
      this.hands.props = h, this.viewport.props = p, this._update();
    return this._orientation !== 0 && (this.handsImageLayer.image = ""), this.emit("change:orientation", this._orientation);
  }
  _viewportOrientationOffset() {
    const [e, t] = Array.from(
      this._getOrientationDimensions(
        this._device.screenWidth,
        this._device.screenHeight
      )
    );
    this.content.width = e, this.content.height = t;
    let s = (this.screen.width - e) / 2;
    this._orientation === -90 && (s *= -1);
    let [a, h] = Array.from([0, 0]);
    return this.isLandscape && (a = s, h = s), {
      rotationZ: this._orientation,
      x: a,
      y: h
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
  _getOrientationDimensions(e, t) {
    return this.isLandscape ? [t, e] : [e, t];
  }
  //##########################################################################
  // HANDS
  handSwitchingSupported() {
    return this._device.hands !== void 0 && !this.hideBezel;
  }
  nextHand() {
    if (this.hands.rotationZ === 0) {
      if (this.handSwitchingSupported()) {
        const e = _$1.keys(this._device.hands);
        if (e.length > 0) {
          const t = e.indexOf(this.selectedHand) + 1;
          let s = "";
          t < e.length && (s = e[t]);
          const a = this.setHand(s);
          return this._update(), a;
        }
      }
      return !1;
    }
  }
  setHand(e) {
    if (this.selectedHand = e, !e || !this.handSwitchingSupported())
      return this.handsImageLayer.image = "";
    const t = this._device.hands[e];
    if (t)
      return this.hands.width = t.width, this.hands.height = t.height, centerLayer(this.hands, !0), centerLayer(this.phone), this.handsImageLayer.size = this.hands.size, this.handsImageLayer.y = 0, t.offset && (this.handsImageLayer.y = t.offset), this.handsImageLayer.image = this.handImageUrl(e), e;
  }
  handImageUrl(e) {
    let t = "//resources.framerjs.com/static/DeviceResources";
    return Utils$2.isFileUrl(window.location.href) && (t = `http://${t}`), Utils$2.isFramerStudio() && window.FramerStudioInfo && Utils$2.framerStudioVersion() >= newDeviceMinVersion ? (t = window.FramerStudioInfo.deviceImagesUrl, `${t}/${e}.png`) : Utils$2.isWebPSupported() ? `${t}/${e}.webp` : Utils$2.isJP2Supported() ? `${t}/${e}.jp2` : `${t}/${e}.png`;
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
}, old_iPhone6BaseDeviceHand = _$1.extend({}, old_iPhone6BaseDevice, {
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
}, old_iPhone6PlusBaseDeviceHand = _$1.extend({}, old_iPhone6PlusBaseDevice, {
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
}, old_iPhone5BaseDeviceHand = _$1.extend({}, old_iPhone5BaseDevice, {
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
}, old_iPhone5CBaseDeviceHand = _$1.extend({}, old_iPhone5CBaseDevice, {
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
}, old_iPadMiniBaseDeviceHand = _$1.extend({}, old_iPadMiniBaseDevice, {
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
}, old_iPadAirBaseDeviceHand = _$1.extend({}, old_iPadAirBaseDevice, {
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
}, old_Nexus5BaseDeviceHand = _$1.extend({}, old_Nexus5BaseDevice, {
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
  "apple-ipad-air-2-silver": _$1.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-gold": _$1.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-space-gray": _$1.clone(iPadAir2BaseDevice),
  // iPad Mini
  "apple-ipad-mini-4-silver": _$1.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-gold": _$1.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-space-gray": _$1.clone(iPadMini4BaseDevice),
  // iPad Pro
  "apple-ipad-pro-silver": _$1.clone(iPadProBaseDevice),
  "apple-ipad-pro-gold": _$1.clone(iPadProBaseDevice),
  "apple-ipad-pro-space-gray": _$1.clone(iPadProBaseDevice),
  // iPhone X
  "apple-iphone-x-silver": _$1.clone(iPhoneXBaseDevice),
  "apple-iphone-x-space-gray": _$1.clone(iPhoneXBaseDevice),
  // iPhone 8
  "apple-iphone-8-silver": _$1.clone(iPhone8BaseDevice),
  "apple-iphone-8-gold": _$1.clone(iPhone8BaseDevice),
  "apple-iphone-8-space-gray": _$1.clone(iPhone8BaseDevice),
  // iPhone 8 Plus
  "apple-iphone-8-plus-silver": _$1.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-gold": _$1.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-space-gray": _$1.clone(iPhone8PlusBaseDevice),
  // iPhone 7
  "apple-iphone-7-gold": _$1.clone(iPhone7BaseDevice),
  "apple-iphone-7-rose-gold": _$1.clone(iPhone7BaseDevice),
  "apple-iphone-7-silver": _$1.clone(iPhone7BaseDevice),
  "apple-iphone-7-black": _$1.clone(iPhone7BaseDevice),
  "apple-iphone-7-jet-black": _$1.clone(iPhone7BaseDevice),
  // iPhone 7 Plus
  "apple-iphone-7-plus-gold": _$1.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-rose-gold": _$1.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-silver": _$1.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-black": _$1.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-jet-black": _$1.clone(iPhone7PlusBaseDevice),
  // iPhone 6s
  "apple-iphone-6s-gold": _$1.clone(iPhone6BaseDevice),
  "apple-iphone-6s-rose-gold": _$1.clone(iPhone6BaseDevice),
  "apple-iphone-6s-silver": _$1.clone(iPhone6BaseDevice),
  "apple-iphone-6s-space-gray": _$1.clone(iPhone6BaseDevice),
  // iPhone 6s Plus
  "apple-iphone-6s-plus-gold": _$1.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-rose-gold": _$1.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-silver": _$1.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-space-gray": _$1.clone(iPhone6PlusBaseDevice),
  // iPhone SE
  "apple-iphone-se-gold": _$1.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-silver": _$1.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-space-gray": _$1.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-rose-gold": _$1.clone(iPhoneSEBaseDevice),
  // iPhone 5S
  "apple-iphone-5s-gold": _$1.clone(iPhone5BaseDevice),
  "apple-iphone-5s-silver": _$1.clone(iPhone5BaseDevice),
  "apple-iphone-5s-space-gray": _$1.clone(iPhone5BaseDevice),
  // iPhone 5C
  "apple-iphone-5c-blue": _$1.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-green": _$1.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-red": _$1.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-white": _$1.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-yellow": _$1.clone(iPhone5CBaseDevice),
  // Apple Watch Series 2 38mm
  "apple-watch-series-2-38mm-black-steel-black": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-edition": _$1.clone(AppleWatchSeries238Device),
  "apple-watch-series-2-38mm-rose-gold-aluminum-midnight-blue": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-cocoa": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-concrete": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-ocean-blue": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-red": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-turquoise": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-white": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-yellow": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-space-gray-aluminum-black": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-sport-aluminum-walnut": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-steel-white": _$1.clone(AppleWatchSeries238Device),
  // Apple Watch Series 2 42mm
  "apple-watch-series-2-42mm-edition": _$1.clone(AppleWatchSeries242Device),
  "apple-watch-series-2-42mm-gold-aluminum-cocoa": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-rose-gold-aluminum-midnight-blue": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-concrete": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-green": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-light-pink": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-ocean-blue": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-pink-sand": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-red": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-turquoise": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-white": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-yellow": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-black-steel-black": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-gray-aluminum-black": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-steel-white": _$1.clone(AppleWatchSeries242Device),
  // Apple Watch Nike+ 38mm
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": _$1.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": _$1.clone(
    AppleWatchSeries238Device
  ),
  // Apple Watch Nike+ 42mm
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": _$1.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": _$1.clone(
    AppleWatchSeries242Device
  ),
  // Apple Watch 38mm
  "apple-watch-38mm-gold-black-leather-closed": _$1.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-rose-gold-black-leather-closed": _$1.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-stainless-steel-black-leather-closed": _$1.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-black-steel-black-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-gold-midnight-blue-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-rose-gold-lavender-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-blue-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-fog-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-green-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-red-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-walnut-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-white-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-gold-antique-white-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-rose-gold-stone-closed": _$1.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-space-gray-black-closed": _$1.clone(AppleWatch38Device),
  // Apple Watch 42mm
  "apple-watch-42mm-black-steel-black-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-black-leather-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-midnight-blue-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-black-leather-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-lavender-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-blue-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-fog-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-green-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-red-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-walnut-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-white-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-gold-antique-white-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-rose-gold-stone-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-space-gray-black-closed": _$1.clone(AppleWatch42Device),
  "apple-watch-42mm-stainless-steel-black-leather-closed": _$1.clone(AppleWatch42Device),
  // Sony SmartWatch 3
  "sony-smartwatch-3-black": _$1.clone(SonySmartwatch3Base),
  "sony-smartwatch-3-white": _$1.clone(SonySmartwatch3Base),
  // NEXUS
  "google-nexus-4": _$1.clone(Nexus4BaseDevice),
  "google-nexus-5x": _$1.clone(Nexus5BaseDevice),
  "google-nexus-6p": _$1.clone(Nexus6BaseDevice),
  "google-nexus-9": _$1.clone(Nexus9BaseDevice),
  // Pixel
  "google-pixel-quite-black": _$1.clone(PixelBaseDevice),
  "google-pixel-really-blue": _$1.clone(PixelBaseDevice),
  "google-pixel-very-silver": _$1.clone(PixelBaseDevice),
  // Pixel 2
  "google-pixel-2-clearly-white": _$1.clone(Pixel2BaseDevice),
  "google-pixel-2-just-black": _$1.clone(Pixel2BaseDevice),
  "google-pixel-2-kinda-blue": _$1.clone(Pixel2BaseDevice),
  "google-pixel-2-xl-black-and-white": _$1.clone(Pixel2XLBaseDevice),
  "google-pixel-2-xl-just-black": _$1.clone(Pixel2XLBaseDevice),
  // HTC ONE A9
  "htc-one-a9-black": _$1.clone(HTCa9BaseDevice),
  "htc-one-a9-white": _$1.clone(HTCa9BaseDevice),
  // HTC ONE M8
  "htc-one-m8-black": _$1.clone(HTCm8BaseDevice),
  "htc-one-m8-gold": _$1.clone(HTCm8BaseDevice),
  "htc-one-m8-silver": _$1.clone(HTCm8BaseDevice),
  // MICROSOFT LUMIA 950
  "microsoft-lumia-950-black": _$1.clone(MSFTLumia950BaseDevice),
  "microsoft-lumia-950-white": _$1.clone(MSFTLumia950BaseDevice),
  // SAMSUNG NOTE 5
  "samsung-galaxy-note-5-black": _$1.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-gold": _$1.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-pink": _$1.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-silver-titanium": _$1.clone(
    SamsungGalaxyNote5BaseDevice
  ),
  "samsung-galaxy-note-5-white": _$1.clone(SamsungGalaxyNote5BaseDevice),
  //Samsug Galaxy S8
  "samsung-galaxy-s8-orchid-gray": _$1.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-midnight-black": _$1.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-maple-gold": _$1.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-coral-blue": _$1.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-arctic-silver": _$1.clone(SamsungGalaxyS8BaseDevice),
  // Notebooks
  "apple-macbook": _$1.clone(AppleMacBook),
  "apple-macbook-air": _$1.clone(AppleMacBookAir),
  "apple-macbook-pro": _$1.clone(AppleMacBookPro),
  "dell-xps": _$1.clone(DellXPS),
  // Desktops
  "apple-imac": _$1.clone(AppleIMac),
  "apple-thunderbolt-display": _$1.clone(AppleThunderboltDisplay),
  "microsoft-surface-book": _$1.clone(MicrosoftSurfaceBook),
  "microsoft-surface-pro-3": _$1.clone(MicrosoftSurfacePro3),
  "microsoft-surface-pro-4": _$1.clone(MicrosoftSurfacePro4),
  // TV
  "sony-w85Oc": _$1.clone(SonyW85OC),
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
  "iphone-6-spacegray": _$1.clone(old_iPhone6BaseDevice),
  "iphone-6-spacegray-hand": _$1.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-silver": _$1.clone(old_iPhone6BaseDevice),
  "iphone-6-silver-hand": _$1.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-gold": _$1.clone(old_iPhone6BaseDevice),
  "iphone-6-gold-hand": _$1.clone(old_iPhone6BaseDeviceHand),
  // iPhone 6+
  "iphone-6plus-spacegray": _$1.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-spacegray-hand": _$1.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-silver": _$1.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-silver-hand": _$1.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-gold": _$1.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-gold-hand": _$1.clone(old_iPhone6PlusBaseDeviceHand),
  // iPhone 5S
  "iphone-5s-spacegray": _$1.clone(old_iPhone5BaseDevice),
  "iphone-5s-spacegray-hand": _$1.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-silver": _$1.clone(old_iPhone5BaseDevice),
  "iphone-5s-silver-hand": _$1.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-gold": _$1.clone(old_iPhone5BaseDevice),
  "iphone-5s-gold-hand": _$1.clone(old_iPhone5BaseDeviceHand),
  // iPhone 5C
  "iphone-5c-green": _$1.clone(old_iPhone5CBaseDevice),
  "iphone-5c-green-hand": _$1.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-blue": _$1.clone(old_iPhone5CBaseDevice),
  "iphone-5c-blue-hand": _$1.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-pink": _$1.clone(old_iPhone5CBaseDevice),
  "iphone-5c-pink-hand": _$1.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-white": _$1.clone(old_iPhone5CBaseDevice),
  "iphone-5c-white-hand": _$1.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-yellow": _$1.clone(old_iPhone5CBaseDevice),
  "iphone-5c-yellow-hand": _$1.clone(old_iPhone5CBaseDeviceHand),
  // iPad Mini
  "ipad-mini-spacegray": _$1.clone(old_iPadMiniBaseDevice),
  "ipad-mini-spacegray-hand": _$1.clone(old_iPadMiniBaseDeviceHand),
  "ipad-mini-silver": _$1.clone(old_iPadMiniBaseDevice),
  "ipad-mini-silver-hand": _$1.clone(old_iPadMiniBaseDeviceHand),
  // iPad Air
  "ipad-air-spacegray": _$1.clone(old_iPadAirBaseDevice),
  "ipad-air-spacegray-hand": _$1.clone(old_iPadAirBaseDeviceHand),
  "ipad-air-silver": _$1.clone(old_iPadAirBaseDevice),
  "ipad-air-silver-hand": _$1.clone(old_iPadAirBaseDeviceHand),
  // Nexus 5
  "nexus-5-black": _$1.clone(old_Nexus5BaseDevice),
  "nexus-5-black-hand": _$1.clone(old_Nexus5BaseDeviceHand),
  // Nexus 9
  "nexus-9": _$1.clone(old_Nexus9BaseDevice),
  // Apple Watch 38mm
  "applewatchsport-38-aluminum-sportband-black": _$1.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-blue": _$1.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-green": _$1.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-pink": _$1.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-white": _$1.clone(
    old_AppleWatch38Device
  ),
  "applewatch-38-black-bracelet": _$1.clone(old_AppleWatch38Device),
  "applewatch-38-steel-bracelet": _$1.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-blue": _$1.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-gray": _$1.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-red": _$1.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-black": _$1.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-white": _$1.clone(old_AppleWatch38Device),
  // Apple Watch 42mm
  "applewatchsport-42-aluminum-sportband-black": _$1.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-blue": _$1.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-green": _$1.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-pink": _$1.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-white": _$1.clone(
    old_AppleWatch42Device
  ),
  "applewatch-42-black-bracelet": _$1.clone(old_AppleWatch42Device),
  "applewatch-42-steel-bracelet": _$1.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-blue": _$1.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-gray": _$1.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-red": _$1.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-black": _$1.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-white": _$1.clone(old_AppleWatch42Device)
};
exports.DeviceComponent.Devices = Devices;
var BuiltInDevices = _$1.keys(Devices);
class GridComponent extends Layer$2 {
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
        _$1.isNumber(e) && (e = { horizontal: e, vertical: e }), this._spacing = e, this._render();
      }
    }), this.define("renderCell", {
      get: function() {
        return this._renderCell || this._defaultRenderCell;
      },
      set: function(e) {
        if (e !== this._renderCell) {
          if (!_$1.isFunction(e))
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
        return _$1.values(this._cells);
      }
    });
  }
  constructor(e = {}) {
    super(Defaults$1.getDefaults("GridComponent", e));
  }
  cellX(e) {
    return e * (this.cellWidth + this.spacing.horizontal);
  }
  cellY(e) {
    return e * (this.cellHeight + this.spacing.vertical);
  }
  cellFrame(e, t) {
    return {
      x: this.cellX(e),
      y: this.cellY(t),
      width: this.cellWidth,
      height: this.cellHeight
    };
  }
  cell(e, t) {
    return this._cells[`${e}:${t}`];
  }
  render() {
    return this._render();
  }
  _render() {
    this._reset();
    for (let e = 0; e < this.rows; e++)
      for (let t = 0; t < this.columns; t++) {
        const s = this.cellFrame(t, e), a = new Layer$2({
          parent: this,
          frame: s,
          name: `Cell ${t}:${e}`
        });
        this.renderCell(a, e, t), this._cells[`${t}:${e}`] = a;
      }
    return this._cells;
  }
  _defaultRenderCell(e, t, s) {
    return e.backgroundColor = "#28affa", e.hueRotate = s * 20 + t % this.columns * (20 / (this.columns + 1)), Utils$2.labelLayer(e, `${t}:${s}`), e.style.fontSize = "30px", e;
  }
  _reset() {
    _$1.invokeMap(this.cells, "destroy"), this._cells = {};
  }
}
GridComponent.initClass();
Events$6.TransitionStart = "transitionstart";
Events$6.TransitionHalt = "transitionhalt";
Events$6.TransitionStop = "transitionstop";
Events$6.TransitionEnd = "transitionend";
class FlowComponent extends Layer$2 {
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
        if (e instanceof Layer$2 && (this._header = e, this._header.name = "header", this._header.width = this.width, this._header.setParentPreservingConstraintValues(this), this._header.constraintValues == null && (this._header.x = Align.center, this._header.y = Align.top), this.current))
          return this._wrapLayer(this.current);
      }
    }), this.define("footer", {
      get() {
        return this._footer;
      },
      set(e) {
        if (e instanceof Layer$2 && (this._footer = e, this._footer.name = "footer", this._footer.width = this.width, this._footer.setParentPreservingConstraintValues(this), this._footer.constraintValues == null && (this._footer.x = Align.center, this._footer.y = Align.bottom), this.current))
          return this._wrapLayer(this.current);
      }
    });
  }
  constructor(e, t) {
    this.showPrevious = this.showPrevious.bind(this), this._handleOverlayTap = this._handleOverlayTap.bind(this), this._forwardScrollEvents = this._forwardScrollEvents.bind(this), this._runTransition = this._runTransition.bind(this), e == null && (e = {}), t == null && (t = {});
    let s = null;
    e instanceof Layer$2 ? (s = e, t = t) : t = e, t = _.defaults({}, t, { backgroundColor: "black" }), t.size || (t.width == null && (t.width = Screen.width), t.height == null && (t.height = Screen.height)), t.clip == null && (t.clip = !0), super(t), this.reset(), this.overlay = new Layer$2({
      name: "overlay",
      parent: this,
      size: 0,
      backgroundColor: "black",
      visible: !1
    }), this.overlay.onTap(this._handleOverlayTap), s ? this.showNext(s) : this._tempScroll = new ScrollComponent({
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
  transition(e, t, s) {
    if (s == null && (s = {}), !(e instanceof Layer$2))
      throw new Error("FlowComponent.transition expects a layer");
    if (!t)
      throw new Error("FlowComponent.transition expects transitionFunction");
    if (e === this.current)
      return;
    this._tempScroll != null && this._tempScroll.destroy(), s = _.defaults({}, s, {
      animate: this._firstTransition === !0,
      scroll: !0,
      wrap: !0,
      modal: !1
    }), this._isModal = s.modal, e.visible = !0, e.opacity = 1, e.ignoreEvents = !1;
    let a = e;
    s.scroll && s.wrap && (a = this._wrapLayer(e)), a.parent = this, a.visible = !s.animate;
    const h = this.current, u = a, { overlay: p } = this, y = t(this, h, u, p), S = this._buildTransition(y, h, u, p);
    return this._runTransition(
      S,
      "forward",
      s.animate,
      this.current,
      e
    ), this._stack.push({ layer: e, transition: S });
  }
  showNext(e, t) {
    return t == null && (t = {}), this._initial == null && (this._initial = e), this.transition(e, Transitions.show, t);
  }
  showPrevious(e) {
    if (e == null && (e = {}), !this.previous || this.isTransitioning)
      return;
    if (e instanceof Framer._Layer && (e = {}), e = _.defaults({}, e, { count: 1, animate: !0 }), e.count > 1) {
      const { count: s } = e;
      for (let a = 2, h = s, u = 2 <= h; u ? a <= h : a >= h; u ? a++ : a--)
        this.showPrevious({ animate: !1, count: 1 });
    }
    const t = this._stack.pop();
    return this._runTransition(
      t?.transition,
      "back",
      e.animate,
      this.current,
      t.layer
    );
  }
  showOverlayCenter(e, t) {
    return t == null && (t = {}), this._showOverlay(e, Transitions.overlayCenter, t);
  }
  showOverlayTop(e, t) {
    return t == null && (t = {}), this._showOverlay(e, Transitions.overlayTop, t);
  }
  showOverlayRight(e, t) {
    return t == null && (t = {}), this._showOverlay(e, Transitions.overlayRight, t);
  }
  showOverlayBottom(e, t) {
    return t == null && (t = {}), this._showOverlay(e, Transitions.overlayBottom, t);
  }
  showOverlayLeft(e, t) {
    return t == null && (t = {}), this._showOverlay(e, Transitions.overlayLeft, t);
  }
  //#############################################################
  // Internal methods
  _showOverlay(e, t, s) {
    return s == null && (s = {}), this.transition(
      e,
      t,
      _.defaults({}, s, { animate: !0, scroll: !1, modal: !1 })
    );
  }
  _handleOverlayTap() {
    if (!this.isModal)
      return this.showPrevious();
  }
  _wrapLayer(e) {
    let t, s, a, h;
    if (e._flowLayer = e, e instanceof ScrollComponent || e._flowWrapped)
      return e;
    e.width = Math.max(e.width, this.width), e.height = Math.max(e.height, this.height);
    const { size: u } = this;
    if (t = this, Array.from(e.ancestors()).includes(t)) {
      const S = e?.parent;
      h = S?.parent, h instanceof ScrollComponent && (a = h, s = S);
    }
    let p = layoutPage(e, u);
    p = layoutScroll(p, u), e !== p && s?.children.length === 0 && a?.children.length === 1 && a?.children[0] === s && a.destroy(), p._flowLayer = e;
    for (h of [p, ...Array.from(p.children)])
      if (this._forwardScrollEvents(h), h instanceof ScrollComponent) {
        var y = {};
        h.y === 0 && (y.top = (this.header != null ? this.header.height : void 0) || 0), h.maxY === this.height && (y.bottom = (this.footer != null ? this.footer.height : void 0) || 0), h.contentInset = y, e._flowScroll = h, h.mouseWheelEnabled = this._mouseWheelEnabled;
      }
    return p instanceof ScrollComponent && (p.backgroundColor = this.backgroundColor), p;
  }
  _forwardScrollEvents(e) {
    if (e instanceof ScrollComponent && e._flowForward !== !0) {
      for (var t of [
        Events$6.Move,
        Events$6.ScrollStart,
        Events$6.ScrollMove,
        Events$6.ScrollEnd,
        Events$6.ScrollAnimationDidStart,
        Events$6.ScrollAnimationDidEnd
      ])
        ((s) => e.on(s, () => this.emit(s, e)))(t);
      return e._flowForward = !0;
    }
  }
  _runTransition(e, t, s, a, h) {
    let u, p;
    return t === "forward" ? (u = a, p = h) : (u = h, p = a), this.emit(Events$6.TransitionStart, u, p, t), Utils$2.delay(0, () => (this._firstTransition = !0, e[t](s)));
  }
  _buildTransition(e, t, s, a) {
    const h = {};
    return h.forward = (u, p) => {
      u == null && (u = !0);
      const y = (R, k) => (R.once(
        Events$6.AnimationHalt,
        () => this.emit(Events$6.TransitionHalt, t, s, k)
      ), R.once(
        Events$6.AnimationStop,
        () => this.emit(Events$6.TransitionStop, t, s, k)
      ), R.once(
        Events$6.AnimationEnd,
        () => this.emit(Events$6.TransitionEnd, t, s, k)
      )), S = [], L = { instant: !u };
      t && e.layerA && (t.visible = !0, S.push(new Animation(t, e.layerA.hide, L))), s && e.layerB && (s.props = e.layerB.hide, s.bringToFront(), s.visible = !0, S.push(new Animation(s, e.layerB.show, L))), a && e.overlay && (a.visible = !0, a.ignoreEvents = !1, a.placeBehind(s), a.props = e.overlay.hide, S.push(new Animation(a, e.overlay.show, L))), a && e.overlay ? (this.header && this.header.placeBehind(a), this.footer && this.footer.placeBehind(a)) : (this.header && this.header.bringToFront(), this.footer && this.footer.bringToFront());
      const M = new AnimationGroup(S);
      return y(M, "forward"), M.once(Events$6.AnimationEnd, function() {
        if (t && e.layerA && !(a && e.overlay))
          return t.visible = !1;
      }), M.start();
    }, h.back = (u, p) => {
      u == null && (u = !0);
      const y = (R, k) => (R.once(
        Events$6.AnimationHalt,
        () => this.emit(Events$6.TransitionHalt, s, t, k)
      ), R.once(
        Events$6.AnimationStop,
        () => this.emit(Events$6.TransitionStop, s, t, k)
      ), R.once(
        Events$6.AnimationEnd,
        () => this.emit(Events$6.TransitionEnd, s, t, k)
      )), S = [], L = { instant: !u };
      a && e.overlay && (a.visible = !0, a.ignoreEvents = !0, S.push(new Animation(a, e.overlay.hide, L))), t && e.layerA && (t.visible = !0, S.push(new Animation(t, e.layerA.show, L))), s && e.layerB && (s.visible = !0, S.push(new Animation(s, e.layerB.hide, L)));
      const M = new AnimationGroup(S);
      return M.stopAnimations = !1, y(M, "back"), M.once(Events$6.AnimationEnd, function() {
        if (s && e.layerB)
          return s.visible = !1;
      }), M.start();
    }, h;
  }
  //#############################################################
  // Event helpers
  onTransitionStart(e) {
    return this.on(Events$6.TransitionStart, e);
  }
  onTransitionHalt(e) {
    return this.on(Events$6.TransitionHalt, e);
  }
  onTransitionStop(e) {
    return this.on(Events$6.TransitionStop, e);
  }
  onTransitionEnd(e) {
    return this.on(Events$6.TransitionEnd, e);
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
const findPossibleHeader = function(r) {
  let e, t = null;
  for (e of Array.from(r.children)) {
    var s = e.x === 0 || (e.constraintValues != null ? e.constraintValues.left : void 0) === 0, a = e.width === r.width || (e.constraintValues != null ? e.constraintValues.right : void 0) === 0, h = e.y === 0 || (e.constraintValues != null ? e.constraintValues.top : void 0) === 0;
    if (s && a && h) {
      if (t)
        return;
      t = e;
    }
  }
  if (t) {
    for (e of Array.from(r.children))
      if (t !== e && e.minY < t.maxY)
        return;
    return t;
  }
}, findPossibleFooter = function(r) {
  let e, t = null;
  for (e of Array.from(r.children)) {
    var s = e.x === 0 || (e.constraintValues != null ? e.constraintValues.left : void 0) === 0, a = e.width === r.width || (e.constraintValues != null ? e.constraintValues.right : void 0) === 0, h = e.maxY === r.height || (e.constraintValues != null ? e.constraintValues.bottom : void 0) === 0;
    if (s && a && h) {
      if (t)
        return;
      t = e;
    }
  }
  if (t) {
    for (e of Array.from(r.children))
      if (t !== e && e.maxY > t.minY)
        return;
    return t;
  }
}, findHeader = function(r) {
  const e = findPossibleHeader(r), t = findPossibleFooter(r);
  if (!(e && t && e.maxY === t.minY && e.height >= t.height))
    return e;
}, findFooter = function(r) {
  const e = findPossibleHeader(r), t = findPossibleFooter(r);
  if (!(e && t && e.maxY === t.minY && t.height >= e.height))
    return t;
}, findBody = function(r, e, t) {
  if (!(!e && !t)) {
    for (var s of Array.from(r.children))
      if (s !== e && s !== t && s.x === 0 && s.width === r.width) {
        if (e && t && s.minY === e.maxY && s.maxY === t.minY)
          return s;
        if (e && s.minY === e.maxY && s.maxY === r.height)
          return s;
        if (t && s.minY === 0 && s.maxY === t.minY)
          return s;
      }
  }
}, guessBodyFrame = function(r, e, t) {
  let s;
  if (!(!e && !t) && e?.maxY !== t?.minY) {
    if (e && t)
      s = {
        x: 0,
        y: e.height,
        width: r.width,
        height: r.height - e.height - t.height
      };
    else if (e)
      s = {
        x: 0,
        y: e.height,
        width: r.width,
        height: r.height - e.height
      };
    else if (t)
      s = {
        x: 0,
        y: 0,
        width: r.width,
        height: r.height - t.height
      };
    else
      return;
    if (!((e?.height || 0) > s.height) && !((t?.height || 0) > s.height))
      return s;
  }
};
var layoutPage = function(r, e) {
  let t;
  const s = findHeader(r), a = findFooter(r);
  if (!s && !a)
    return r;
  let h = findBody(r, s, a);
  if (!h && (t = guessBodyFrame(r, s, a), t)) {
    h = new Layer$2({
      frame: t,
      backgroundColor: null
    });
    for (var u of Array.from(r.children))
      if (u !== s && u !== a) {
        u.setParentPreservingConstraintValues(h);
        var p = s?.height || 0;
        u.constraintValues != null ? (u.constraintValues != null ? u.constraintValues.top : void 0) != null && (u.constraintValues != null && (u.constraintValues.top -= p), u.layout()) : u.y -= p;
      }
  }
  if (!h)
    return r;
  t = h.frame, t.width = e.width, t.height = e.height - (s?.height || 0) - (a?.height || 0), h.point = 0, h.width = e.width;
  const y = layoutScroll(h, t);
  return y.parent = r, y.frame = t, r.size = e, a?.maxY > e.height && (a.maxY = e.height), s?.bringToFront(), a?.bringToFront(), r;
}, layoutScroll = function(r, e) {
  if (r.width <= e.width && r.height <= e.height)
    return r;
  const t = new ScrollComponent({
    size: e,
    name: "scroll"
  }), { height: s } = r;
  t.propagateEvents = !1;
  const a = r.constraintValues;
  return r.point = 0, r.parent = t.content, r.constraintValues = a, t.scrollHorizontal = r.maxX > e.width, t.scrollVertical = r.maxY > e.height, t;
}, Transitions = {};
Transitions.show = function(r, e, t, s) {
  const a = { curve: "spring(300, 35, 0)" };
  return {
    layerA: {
      show: { options: a, x: 0, y: 0 },
      hide: {
        options: a,
        x: 0 - e?.width / 2,
        y: 0
      }
    },
    layerB: {
      show: { options: a, x: 0, y: 0 },
      hide: { options: a, x: t.width, y: 0 }
    }
  };
};
Transitions.overlayCenter = function(r, e, t, s) {
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
        size: r.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: r.size }
    }
  };
};
Transitions.overlayLeft = function(r, e, t, s) {
  return {
    layerB: {
      show: { options: { curve: "spring(300, 35, 0)" }, y: 0, x: 0 },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: 0 - t?.width
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: r.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: r.size }
    }
  };
};
Transitions.overlayRight = function(r, e, t, s) {
  return {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: r?.width - t?.width
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        y: 0,
        x: r?.width
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: r.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: r.size }
    }
  };
};
Transitions.overlayTop = function(r, e, t, s) {
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
        size: r.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: r.size }
    }
  };
};
Transitions.overlayBottom = function(r, e, t, s) {
  return {
    layerB: {
      show: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y: r?.height - t?.height
      },
      hide: {
        options: { curve: "spring(300, 35, 0)" },
        x: Align.center,
        y: r?.height
      }
    },
    overlay: {
      show: {
        options: { time: 0.1 },
        opacity: 0.5,
        x: 0,
        y: 0,
        size: r.size
      },
      hide: { options: { time: 0.1 }, opacity: 0, x: 0, y: 0, size: r.size }
    }
  };
};
function __guard__$1(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
let CircularProgressComponent$1 = class extends Layer$2 {
  // Class fields with defaults
  _strokeWidth = 1;
  _progress = 0;
  _progressColor = Color$1.grey(1);
  constructor(e = {}) {
    super(e), this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.svg.setAttribute("width", "100%"), this.svg.setAttribute("height", "100%"), this.svg.setAttributeNS(
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
  set strokeWidth(e) {
    this._strokeWidth = e, this.rails.cx.baseVal.value = this.width / 2, this.rails.cy.baseVal.value = this.width / 2, this.rails.r.baseVal.value = this.radius, this.rails.setAttribute("stroke-width", e), this.circle.cx.baseVal.value = this.width / 2, this.circle.cy.baseVal.value = this.width / 2, this.circle.r.baseVal.value = this.radius, this.circle.setAttribute("stroke-width", e);
  }
  get progressColor() {
    return this._progressColor;
  }
  set progressColor(e) {
    this._progressColor = e, this.circle.setAttribute("stroke", e);
  }
  get railsColor() {
    return this._railsColor || Color$1.grey(0.1);
  }
  set railsColor(e) {
    this._railsColor = e, this.rails.setAttribute("stroke", e);
  }
  get progress() {
    return this._progress;
  }
  set progress(e) {
    this._progress = Utils$2.clamp(e, 0, 1);
    const t = this.radius * Math.PI * 2, s = (1 - this._progress) * t;
    this.circle.setAttribute("stroke-dasharray", t), this.circle.setAttribute("stroke-dashoffset", s);
  }
  addShape(e) {
    const t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    return this.svg.appendChild(t), t;
  }
  setProgress(e, t = !0, s = {}) {
    if (!t) {
      this.progress = e;
      return;
    }
    const a = Math.abs(this.progress - e) * 0.3;
    s = _$1.defaults(s, {
      curve: "linear",
      time: a
    });
    const h = { progress: Utils$2.clamp(e, 0, 1) };
    return this.animate(h, s);
  }
};
Events$6.MIDICommand = "midiCommand";
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
          e ? this._request = navigator.requestMIDIAccess().then(this._requestResolved, this._requestRejected) : (this._inputs?.forEach((t) => t.close?.()), this._request = null, this._inputs = []);
        }
      }
    });
  }
  // Success handler
  _requestResolved(e) {
    this._inputs = [], e.inputs.forEach((t) => {
      this._inputs.push(t), t.onmidimessage = this._onMidiMessage(t.id);
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
    return (t) => {
      this.emit(Events$6.MIDICommand, e, t.timeStamp, t.data);
    };
  }
  // Event shortcut
  onCommand(e) {
    return this.on(Events$6.MIDICommand, e);
  }
}
MIDIInput.initClass();
new MIDIInput();
Events$6.MIDIComponentValueChange = "MIDIComponentValueChange";
class MIDIComponent extends BaseClass {
  static initClass() {
    this.define("min", this.simpleProperty("min", 0)), this.define("max", this.simpleProperty("max", 127)), this.define("control", this.simpleProperty("control", null)), this.define("channel", this.simpleProperty("channel", null)), this.define("source", this.simpleProperty("source", null));
  }
  constructor(e = {}) {
    super(e), MIDIInput.enabled = !0, MIDIInput.onCommand((t, s, a) => {
      const [h, u, p] = a, y = h & 240, S = (h & 15) + 1, L = u & 127, M = p & 127;
      if (![176, 144, 128].includes(y) || this.source != null && this.source !== t || this.channel != null && this.channel !== S || this.control != null && this.control !== L) return;
      let R = { source: t, channel: S, control: L };
      [144, 128].includes(y) && (R = _$1.defaults(R, { type: "note" })), this.emit(Events$6.MIDIComponentValueChange, this._modulate(M), R);
    });
  }
  _modulate(e) {
    return Utils$2.modulate(e, [0, 127], [this.min, this.max]);
  }
  onValueChange(e) {
    return this.on(Events$6.MIDIComponentValueChange, e);
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
Utils$2.domComplete(() => {
  Utils$2.insertCSS(FramerCSS);
});
const Config$1 = {
  FramerCSS
}, getTime = () => Utils$2.getTime() * 1e3;
class AnimationLoop extends EventEmitter {
  constructor() {
    super(), this.delta = 1 / 60, this.raf = !0;
    const e = Utils$2.webkitVersion();
    e > 600 && e < 601 && (Utils$2.isFramerStudio() || Utils$2.isDesktop()) && (this.raf = !1), this.maximumListeners = 1 / 0, this.start = this.start.bind(this);
  }
  start() {
    let e = getTime();
    const t = () => {
      let a;
      if (this.delta)
        a = this.delta;
      else {
        const h = getTime();
        a = (h - e) / 1e3, e = h;
      }
      this.emit("update", a), this.emit("render", a);
    }, s = () => {
      this.raf ? (window.requestAnimationFrame(s), t()) : setTimeout(() => {
        window.requestAnimationFrame(s), t();
      }, 0);
    };
    s();
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
  values(e = 1 / 60, t = 100) {
    const s = [];
    for (let a = 0; a <= t && (s.push(this.next(e)), !this.finished()); a++)
      ;
    return s;
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
const BezierCurveDefaults = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1]
};
class BezierCurveAnimator extends Animator {
  _time = 0;
  options = {};
  _unitBezier = null;
  setup(e) {
    _$1.isString(e) && BezierCurveDefaults.hasOwnProperty(e.toLowerCase()) && (e = { values: BezierCurveDefaults[e.toLowerCase()] }), e.values && _$1.isString(e.values) && BezierCurveDefaults.hasOwnProperty(e.values.toLowerCase()) && (e = {
      values: BezierCurveDefaults[e.values.toLowerCase()],
      time: e.time
    }), _$1.isArray(e) && e.length === 4 && (e = { values: e }), this.options = _$1.defaults(e, {
      values: BezierCurveDefaults.ease,
      time: 1,
      precision: 1 / 1e3
    }), this._time = 0, this._unitBezier = new UnitBezier(...this.options.values);
  }
  next(e) {
    return this._time += e, this.finished() ? 1 : this._unitBezier.solve(this._time / this.options.time);
  }
  finished() {
    return this._time >= this.options.time - this.options.precision;
  }
}
class UnitBezier {
  epsilon = 1e-6;
  // precision
  constructor(e, t, s, a) {
    this.cx = 3 * e, this.bx = 3 * (s - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * t, this.by = 3 * (a - t) - this.cy, this.ay = 1 - this.cy - this.by;
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
    let t = e, s, a;
    for (let p = 0; p < 8; p++) {
      if (s = this.sampleCurveX(t) - e, Math.abs(s) < this.epsilon) return t;
      if (a = this.sampleCurveDerivativeX(t), Math.abs(a) < this.epsilon) break;
      t -= s / a;
    }
    let h = 0, u = 1;
    if (t = e, t < h) return h;
    if (t > u) return u;
    for (; h < u; ) {
      if (s = this.sampleCurveX(t), Math.abs(s - e) < this.epsilon) return t;
      e > s ? h = t : u = t, t = (u + h) / 2;
    }
    return t;
  }
  solve(e) {
    return this.sampleCurveY(this.solveCurveX(e));
  }
}
class SpringDHOAnimator extends Animator {
  _time = 0;
  _value = 0;
  _velocity = 0;
  options = {};
  constructor(...e) {
    super(...e), this.finished = this.finished.bind(this);
  }
  setup(e = {}) {
    this.options = _$1.defaults(e, {
      velocity: 0,
      tolerance: 1 / 1e4,
      stiffness: 50,
      damping: 2,
      mass: 0.2,
      time: null
    }), this._time = 0, this._value = 0, this._velocity = this.options.velocity;
  }
  next(e) {
    if (this.finished()) return 1;
    this._time += e;
    const t = -this.options.stiffness, s = -this.options.damping, a = t * (this._value - 1), h = s * this._velocity;
    return this._velocity += (a + h) / this.options.mass * e, this._value += this._velocity * e, this._value;
  }
  finished() {
    return this._time > 0 && Math.abs(this._velocity) < this.options.tolerance;
  }
}
class SpringRK4Animator extends Animator {
  _time = 0;
  _value = 0;
  _velocity = 0;
  _stopSpring = !1;
  _integrator = null;
  options = {};
  constructor(...e) {
    super(...e), this.finished = this.finished.bind(this);
  }
  setup(e = {}) {
    this.options = _$1.defaults(e, {
      tension: 250,
      friction: 25,
      velocity: 0,
      tolerance: 1 / 1e3
    }), this._time = 0, this._value = 0, this._velocity = this.options.velocity, this._stopSpring = !1, this._integrator = new Integrator((t) => -this.options.tension * t.x - this.options.friction * t.v);
  }
  next(e) {
    if (this.finished()) return 1;
    this._time += e;
    const t = {
      x: this._value - 1,
      v: this._velocity
    }, s = this._integrator.integrateState(t, e);
    this._value = 1 + s.x, this._velocity = s.v;
    const a = Math.abs(s.x) < this.options.tolerance, h = Math.abs(s.v) < this.options.tolerance;
    return this._stopSpring = a && h, this._value;
  }
  finished() {
    return this._stopSpring;
  }
}
const ChromeAlert = `Importing layers is currently only supported on Safari. 
For Chrome, run: open -a "Google Chrome" --allow-file-access-from-files`, resizeFrame = (r, e) => {
  if (r === 1 || !e) return e;
  const t = {};
  return ["x", "y", "width", "height"].forEach((s) => {
    e.hasOwnProperty(s) && (t[s] = e[s] * r);
  }), t;
}, startsWithNumber = (r) => /^[0-9]/.test(r), sanitizeLayerName = (r) => {
  for (const e of ["*", "-", ".png", ".jpg", ".pdf"])
    r.toLowerCase().endsWith(e) && (r = r.slice(0, -e.length));
  return r;
};
class Importer {
  constructor(e, t = {}, s = {}) {
    this.path = e, this.options = t, this.extraLayerProperties = s, this.scale = t.scale ?? 1, this.paths = {
      layerInfo: Utils$2.pathJoin(this.path, "layers.json"),
      images: Utils$2.pathJoin(this.path, "images"),
      documentName: decodeURIComponent(this.path.split("/").pop())
    }, this._createdLayers = [], this._createdLayersByName = {};
  }
  async load() {
    const e = await this._loadLayerInfo();
    if (!e || e.length === 0)
      throw new Error("Importer: no layers. Ensure at least one layer exists.");
    return e.forEach((t) => this._createLayer(t)), this._createdLayers.forEach((t) => this._correctLayer(t)), this._correctArtboards(this._createdLayers), this._createdLayers.forEach((t) => {
      t.parent || (t.parent = null);
    }), this._createdLayersByName;
  }
  async _loadLayerInfo() {
    try {
      const e = `${this.paths.documentName}/layers.json.js`;
      if (window.__imported__?.[e])
        return _$1.cloneDeep(window.__imported__[e]);
      const t = await fetch(this.paths.layerInfo);
      if (!t.ok)
        throw new Error(`Failed to load layers: ${t.statusText}`);
      return await t.json();
    } catch (e) {
      throw console.warn(ChromeAlert), e;
    }
  }
  _createLayer(e, t) {
    e.layerFrame && (e.layerFrame = resizeFrame(this.scale, e.layerFrame)), e.maskFrame && (e.maskFrame = resizeFrame(this.scale, e.maskFrame)), e.image?.frame && (e.image.frame = resizeFrame(this.scale, e.image.frame)), e.children || (e.children = []);
    const s = Layer$2, a = {
      shadow: !0,
      name: sanitizeLayerName(e.name),
      frame: e.layerFrame,
      clip: !1,
      backgroundColor: null,
      visible: e.visible ?? !0,
      ...this.extraLayerProperties
    };
    if (e.image && (a.frame = e.image.frame, a.image = Utils$2.pathJoin(this.path, e.image.path)), e.maskFrame && (a.clip = !0), e.kind === "artboard" && (a.backgroundColor = e.backgroundColor), t?.contentLayer ? a.parent = t.contentLayer : t && (a.parent = t), startsWithNumber(a.name))
      throw new Error(
        `Layer/Artboard names cannot start with a number: '${a.name}'`
      );
    const h = new s(a);
    return h.name = a.name, h.__framerImportedFromPath = this.path, a.name.toLowerCase().includes("scroll") && (h.scroll = !0), a.name.toLowerCase().includes("draggable") && (h.draggable.enabled = !0), !h.image && !e.children.length && !e.maskFrame && (h.frame = Utils$2.frameZero()), [...e.children].reverse().forEach((u) => this._createLayer(u, h)), e.kind === "artboard" ? h.point = { x: 0, y: 0 } : !h.image && !e.maskFrame && (h.frame = h.contentFrame()), h._info = e, this._createdLayers.push(h), this._createdLayersByName[h.name] = h, h;
  }
  _correctArtboards(e) {
    const t = e.filter((h) => h._info.kind === "artboard");
    if (!t.length) return;
    const a = t.reduce(
      (h, u) => !h || u.x < h.x ? u : h,
      null
    ).point;
    t.forEach((h) => {
      h.x -= a.x, h.y -= a.y, h.visible = !0;
    });
  }
  _correctLayer(e) {
    const t = (s) => {
      s.parent && (s.frame = Utils$2.convertPoint(s.frame, null, s.parent)), s.children.forEach(t);
    };
    e.parent || t(e);
  }
}
Importer.load = async function(r, e = 1) {
  return await new Importer(r, { scale: e }).load();
};
const createTouch = (r, e, t = { x: 0, y: 0 }) => ({
  identifier: e,
  target: r.target,
  pageX: r.pageX - t.x,
  pageY: r.pageY - t.y,
  clientX: r.clientX - t.x,
  clientY: r.clientY - t.y,
  screenX: r.screenX - t.x,
  screenY: r.screenY - t.y,
  point: {
    x: r.pageX - t.x,
    y: r.pageY - t.y
  }
}), dispatchTouchEvent = (r, e, t, s) => {
  e || ({ target: e } = t);
  const a = document.createEvent("MouseEvent");
  a.initMouseEvent(
    r,
    !0,
    !0,
    window,
    t.detail,
    t.screenX,
    t.screenY,
    t.clientX,
    t.clientY,
    t.ctrlKey,
    t.shiftKey,
    t.altKey,
    t.metaKey,
    t.button,
    t.relatedTarget
  );
  const h = [createTouch(t, 1)];
  return s && h.push(createTouch(t, 2, s)), a.touches = a.changedTouches = a.targetTouches = h, e.dispatchEvent(a);
}, cancelEvent = (r) => {
  r.preventDefault(), r.stopPropagation();
};
class TouchEmulator extends BaseClass {
  constructor() {
    super(), this.keydown = this.keydown.bind(this), this.keyup = this.keyup.bind(this), this.mousedown = this.mousedown.bind(this), this.mousemove = this.mousemove.bind(this), this.mouseup = this.mouseup.bind(this), this.mouseout = this.mouseout.bind(this), this.mousemovePosition = this.mousemovePosition.bind(this), this.touchPointerImage = "url('framer/images/cursor@2x.png')", this.touchPointerImageActive = "url('framer/images/cursor-active@2x.png')", this.touchPointerImageSize = 64, this.touchPointerInitialOffset = { x: 0, y: 0 }, this.keyPinchCode = 18, this.keyPanCode = 91, this.context = new Framer.Context({ name: "TouchEmulator" }), this.context._element.style.zIndex = 1e4, this.wrap = this.context.domEventManager.wrap, this.wrap(document).addEventListener("mousedown", this.mousedown, !0), this.wrap(document).addEventListener("mousemove", this.mousemove, !0), this.wrap(document).addEventListener("mouseup", this.mouseup, !0), this.wrap(document).addEventListener("keydown", this.keydown, !0), this.wrap(document).addEventListener("keyup", this.keyup, !0), this.wrap(document).addEventListener("mouseout", this.mouseout, !0), this.isMouseDown = !1, this.isPinchKeyDown = !1, this.isPanKeyDown = !1, this.context.run(() => {
      this.touchPointLayer = new Layer({
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
    e.keyCode === this.keyPinchCode && (cancelEvent(e), this.isPinchKeyDown = !1, this.hideTouchCursor()), e.keyCode === this.keyPanCode && (cancelEvent(e), this.touchPoint && this.point && (this.centerPoint = Utils$2.pointCenter(this.touchPoint, this.point), this.isPanKeyDown = !1));
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
    this.point = { x: e.pageX, y: e.pageY }, this.startPoint ??= this.point, this.centerPoint ??= this.point, this.isPinchKeyDown && !this.isPanKeyDown && this.centerPoint && (this.touchPoint = Utils$2.pointAdd(
      this.touchPointerInitialOffset,
      this.pinchPoint(this.point, this.centerPoint)
    ), this.touchPointDelta = Utils$2.pointSubtract(this.point, this.touchPoint)), this.isPinchKeyDown && this.isPanKeyDown && this.touchPoint && this.touchPointDelta && (this.touchPoint = this.panPoint(this.point, this.touchPointDelta)), (this.isPinchKeyDown || this.isPanKeyDown) && this.touchPoint && (this.touchPointLayer.visible = !0, this.touchPointLayer.midX = this.touchPoint.x, this.touchPointLayer.midY = this.touchPoint.y), this.isMouseDown && ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPointDelta ? dispatchTouchEvent(
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
    const t = e.relatedTarget || e.toElement;
    (!t || t.nodeName === "HTML") && this.endMultiTouch();
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
  pinchPoint(e, t) {
    return Utils$2.pointSubtract(
      t,
      Utils$2.pointSubtract(e, t)
    );
  }
  panPoint(e, t) {
    return Utils$2.pointSubtract(e, t);
  }
}
const handleScrollingLayerTouchMove = (r) => r.stopPropagation(), handleScrollingLayerTouchStart = function() {
  const r = this._element, e = r.scrollTop;
  e <= 0 && (r.scrollTop = 1), e + r.offsetHeight >= r.scrollHeight && (r.scrollTop = r.scrollHeight - r.offsetHeight - 1);
};
class MobileScrollFixLayer extends Framer.Layer {
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
const Config = Utils$2.isMobile() ? { height: 100, textInset: 20, fontSize: 32 } : { height: 40, textInset: 12, fontSize: 14 };
class ErrorDisplay extends BaseClass {
  _context = null;
  _errorLayer = null;
  constructor() {
    super(), this.resize = this.resize.bind(this), this._context ??= new Context({ name: "ErrorDisplay" }), this._context.index = 1e3, this._context.run(() => {
      Events.wrap(window).addEventListener(
        "error",
        (e) => this.showError(e.message)
      ), Events.wrap(window).addEventListener("resize", this.resize);
    });
  }
  createLayer() {
    return this._errorLayer ? this._errorLayer : (this._context.run(() => {
      const e = new Layer$2({
        name: "error",
        y: Align.bottom,
        width: Canvas.width,
        height: Config.height,
        backgroundColor: "rgba(255, 0, 0, 1)"
      });
      e.text = new Layer$2({
        name: "text",
        parent: e,
        size: Utils$2.frameInset(e, Config.textInset),
        point: Align.center,
        backgroundColor: null,
        clip: !0
      }), e.text.style = {
        font: `${Config.fontSize}px/1em ${Utils$2.deviceFont()}`,
        lineHeight: `${parseInt(e.text.height - 2)}px`,
        textAlign: "center",
        wordWrap: "break-word",
        textOverflow: "ellipsis"
      }, e.onTap(() => {
        this._errorLayer?.destroy(), this._errorLayer = null;
      }), this._errorLayer = e, this.resize();
    }), this._errorLayer);
  }
  resize() {
    this._errorLayer && (this._errorLayer.width = Canvas.width, this._errorLayer.y = Canvas.height - this._errorLayer.height, this._errorLayer.text.size = Utils$2.frameInset(
      this._errorLayer,
      Config.textInset
    ), this._errorLayer.text.point = Align.center);
  }
  showError(e) {
    const t = this.createLayer();
    return t.scale = 1.1, t.text.html = e, t.animate({
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
const enable = (r = window) => {
  const e = (t) => (...s) => {
    const a = new t(...s);
    return Object.setPrototypeOf(() => {
    }, a);
  };
  return r.Frame = e(Framer.Frame), r.Layer = e(Framer.Layer), r.BackgroundLayer = e(Framer.BackgroundLayer), r.VideoLayer = e(Framer.VideoLayer), r.Animation = e(Framer.Animation), r;
};
class Hints {
  _context = null;
  _target = null;
  constructor() {
    this._handleDown = this._handleDown.bind(this), this._handleUp = this._handleUp.bind(this), this._context = new Framer.Context({ name: "Hints" }), this._context.index = 1e4, this._context.run(() => {
      const e = Events.wrap(document);
      e.addEventListener(Events.TouchStart, this._handleDown, !0), e.addEventListener(Events.TouchEnd, this._handleUp, !0);
    });
  }
  _handleDown(e) {
    this._isPreloading() || (this._target = e.target);
  }
  _handleUp(e) {
    if (this._isPreloading()) return;
    const t = Framer.CurrentContext.layerForElement(this._target);
    if (!t) {
      for (const s of Context.all())
        if (s !== Framer.DefaultContext && s !== Framer.CurrentContext && s.layerForElement(this._target))
          return;
    }
    t?.willSeemToDoSomething() || this.showHints();
  }
  _isPreloading() {
    return Framer.Preloader?.isLoading === !0;
  }
  showHints() {
    const e = Framer.CurrentContext;
    this._context.run(() => {
      _.invokeMap(e.rootLayers, "_showHint");
    });
  }
  destroy() {
    this._context?.destroy();
  }
}
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
    this.setLogo = this.setLogo.bind(this), this.addImage = this.addImage.bind(this), this.addPlayer = this.addPlayer.bind(this), this.start = this.start.bind(this), this._start = this._start.bind(this), this.end = this.end.bind(this), this._end = this._end.bind(this), this._handleProgress = this._handleProgress.bind(this), this._handleTimeout = this._handleTimeout.bind(this), this._setupContext = this._setupContext.bind(this), this._media = [], this._mediaLoaded = [], this._isLoading = !1, this.timeout = 30, this.start();
  }
  setupContext() {
    return this.context = new Context({ name: "Preloader" }), this.context.run(this._setupContext);
  }
  setLogo(e) {
    if (this._logo = e, this.brand)
      return this.brand.style["background-image"] = `url('${e}')`;
  }
  addImagesFromContext(e) {
    return _.map(e.layers, "image").map(this.addImage);
  }
  addPlayersFromContext(e) {
    return _.map(e.layers, "player").map(this.addPlayer);
  }
  addImage(e) {
    if (!(e instanceof Gradient) && e && !Array.from(this._media).includes(e))
      return this._media.push(e), Utils$2.loadImage(e, (t) => (this._mediaLoaded.push(e), this._handleProgress()));
  }
  addPlayer(e) {
    if (!(!e || Array.from(this._media).includes(e)) && !(e.src == null || e.getAttribute("src") === "undefined") && !(e.readyState == null || !(e.readyState < 3)))
      return this._media.push(e), Events.wrap(e).addEventListener("canplaythrough", () => (this._mediaLoaded.push(e), this._handleProgress()));
  }
  start() {
    if (!this.isLoading)
      return this._isLoading = !0, this._startTime = Date.now(), this.emit("start"), this.setupContext(), Utils$2.delay(0.2, this._start);
  }
  _start() {
    return Utils$2.delay(0.2, () => (this.progressIndicator.visible = !0, this.brand.visible = !0)), this.addImagesFromContext(Framer.DefaultContext), this.addImagesFromContext(Framer.CurrentContext), this.addPlayersFromContext(Framer.DefaultContext), this.addPlayersFromContext(Framer.CurrentContext), this._media.length ? Utils$2.delay(this.timeout, this._handleTimeout) : this.end();
  }
  end() {
    if (this.isLoading)
      return this._end();
  }
  _end(e) {
    e == null && (e = !0), Framer.DefaultContext.visible = !0;
    const t = () => (this.emit("end"), this._isLoading = !1, this.context != null ? this.context.destroy() : void 0);
    return this.progressIndicator != null && this.progressIndicator.visible && e ? (this.cover != null && this.cover.animate({
      properties: { opacity: 0 },
      time: 0.13
    }), this.cover.onAnimationDidEnd(t)) : t();
  }
  _handleProgress() {
    if (this.emit("progress", this.progress), this.progressIndicator != null && this.progressIndicator.setProgress(this.progress), this.isReady)
      return this._handleLoaded();
  }
  _handleLoaded() {
    return this.time > 0.5 ? Utils$2.delay(0.2, this.end) : this.end();
  }
  _handleTimeout() {
    if (this.isLoading)
      return console.warn("Preloader timeout, ending"), this.end();
  }
  _setupContext() {
    let e;
    if (this.cover = new Layer({
      frame: Canvas,
      backgroundColor: "white"
    }), this.progressIndicator = new CircularProgressComponent({
      size: 160,
      point: Align.center,
      parent: this.cover,
      visible: !1
    }), this.progressIndicator.railsColor = Color.grey(0, 0.1), this.progressIndicator.progressColor = "rgb(75, 169, 248)", this.progressIndicator.setProgress(this.progress), this.brand = new Layer({
      size: 96,
      parent: this.cover,
      backgroundColor: null,
      visible: !1,
      style: {
        backgroundSize: "50%"
      }
    }), Utils$2.isMobile() && (this.progressIndicator.scale = 1.25, this.brand.scale = 1.25), this._logo)
      this.setLogo(this._logo);
    else {
      let t = "//resources.framerjs.com/static/images/preloader/framer-logo.png";
      _.startsWith(window.location.href, "file://") && (t = "http:" + t), this.setLogo(t);
    }
    return (e = () => (this.cover.frame = Canvas, this.progressIndicator.point = Align.center, this.brand.x = Align.center, this.brand.y = Align.center(2)))(), Canvas.onResize(e);
  }
}
Preloader.initClass();
const Extras = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorDisplay,
  Hints,
  MobileScrollFix: MobileScrollFixLayer,
  OmitNew: enable,
  Preloader,
  TouchEmulator
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
    }, e = this._getGestureEvent(e), this.tapstart(e), Date.now() - this.doubleTapTime < GestureInputDoubleTapTime * 1e3 ? this.doubletap(e) : this.doubleTapTime = Date.now(), this._process(e), Utils$2.isTouch()))
      return this._updateTouchForce();
  }
  touchmove(e) {
    return this._process(this._getGestureEvent(e));
  }
  touchend(e) {
    if (e.touches != null) {
      if (Utils$2.isTouch()) {
        if (e.touches.length !== 0)
          return;
      } else if (e.touches.length !== e.changedTouches.length)
        return;
    }
    this.em.wrap(window).removeEventListener("mousemove", this.touchmove), this.em.wrap(window).removeEventListener("mouseup", this.touchend), this.em.wrap(window).removeEventListener("touchmove", this.touchmove), this.em.wrap(window).removeEventListener("touchend", this.touchend), this.em.wrap(window).removeEventListener("webkitmouseforcechanged", this._updateMacForce), e = this._getGestureEvent(e);
    for (var t in this.session.started) {
      var s = this.session.started[t];
      s && this[`${t}end`](e);
    }
    return this.shouldFireTapEvent(e) && this.tap(e), this.tapend(e), this.cancel();
  }
  reset() {
    if (this.session)
      return this.touchend(this.session.lastEvent);
  }
  // Tap
  shouldFireTapEvent(e) {
    const t = this.session != null ? this.session.startEvent : void 0;
    if (t != null) {
      const s = t.target === e.target, a = e.time - this.session.startTime < 750, h = Utils$2.pointDistance(t.touchCenter, e.touchCenter) < 45;
      return s && a && h && !this.session.cancelTap;
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
        (t) => t.touches
      ),
      (t) => t.length
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
      return this.session.force = Utils$2.modulate(e.webkitForce, [0, 3], [0, 1]), this.forcetapchange(this._getGestureEvent(e)), e.webkitForce >= GestureInputForceTapDesktop ? this.forcetapstart(e) : this.forcetapend(e);
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
    const t = this._getDirection(e.delta);
    if (t)
      return this[`pan${t}`](e);
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
    const t = this.session.started.swipedirection.offsetDirection;
    this._dispatchEvent(`swipe${t}start`, e);
    const s = this._edgeForSwipeDirection(t);
    if (s === "top" && 0 < e.start.y && e.start.y < GestureInputEdgeSwipeDistance && this.edgeswipedirectionstart(e), s === "right" && Screen.width - GestureInputEdgeSwipeDistance < e.start.x && e.start.x < Screen.width && this.edgeswipedirectionstart(e), s === "bottom" && Screen.height - GestureInputEdgeSwipeDistance < e.start.y && e.start.y < Screen.height && this.edgeswipedirectionstart(e), s === "left" && 0 < e.start.x && e.start.x < GestureInputEdgeSwipeDistance)
      return this.edgeswipedirectionstart(e);
  }
  swipedirection(e) {
    if (!this.session.started.swipedirection)
      return;
    const t = this.session.started.swipedirection.offsetDirection;
    if (this._dispatchEvent(`swipe${t}`, e), this.session.started.edgeswipedirection)
      return this.edgeswipedirection(e);
  }
  swipedirectionend(e) {
    if (!this.session.started.swipedirection)
      return;
    const t = this.session.started.swipedirection.offsetDirection;
    return this._dispatchEvent(`swipe${t}end`, e);
  }
  // Edge swipe
  edgeswipedirection(e) {
    const t = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipe", this._createEvent("edgeswipe", e)), Screen.emit(
      `edgeswipe${t}`,
      this._createEvent(`edgeswipe${t}`, e)
    );
  }
  edgeswipedirectionstart(e) {
    if (this.session.started.edgeswipedirection)
      return;
    this.session.started.edgeswipedirection = e;
    const t = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipestart", this._createEvent("edgeswipestart", e)), Screen.emit(
      `edgeswipe${t}start`,
      this._createEvent(`edgeswipe${t}start`, e)
    );
  }
  edgeswipedirectionend(e) {
    const t = this._edgeForSwipeDirection(
      this.session.started.edgeswipedirection.offsetDirection
    );
    return Screen.emit("edgeswipeend", this._createEvent("edgeswipeend", e)), Screen.emit(
      `edgeswipe${t}end`,
      this._createEvent(`edgeswipe${t}end`, e)
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
    const t = Utils$2.convertPointFromContext(
      this._getEventPoint(e),
      Framer.CurrentContext,
      !0,
      !0
    );
    if (_.extend(e, {
      time: Date.now(),
      // Current time √
      point: t,
      // Current point √
      start: t,
      // Start point √
      previous: t,
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
      touchCenter: t,
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
    }), this.session != null && this.session.startEvent && (e.start = this.session.startEvent.point, e.offset = Utils$2.pointSubtract(e.point, e.start), e.offsetTime = e.time - this.session.startEvent.time, e.offsetAngle = Utils$2.pointAngle(
      this.session.startEvent.point,
      e.point
    ), e.offsetDirection = this._getDirection(e.offset), e.touchCenterStart = this.session.startEvent.touchCenter), this.session != null && this.session.lastEvent && (e.previous = this.session.lastEvent.point, e.deltaTime = e.time - this.session.lastEvent.time, e.delta = Utils$2.pointSubtract(
      e.point,
      this.session.lastEvent.point
    ), e.deltaAngle = Utils$2.pointAngle(
      e.point,
      this.session.lastEvent.point
    ), e.deltaDirection = this._getDirection(e.delta)), e.fingers > 1) {
      const a = this._getTouchPoint(e, 0), h = this._getTouchPoint(e, 1);
      e.touchCenter = Utils$2.pointCenter(h, a), e.touchOffset = Utils$2.pointSubtract(h, a), e.touchDistance = _.max([
        GestureInputMinimumFingerDistance,
        Utils$2.pointDistance(a, h)
      ]), e.rotation = Utils$2.pointAngle(a, h);
    }
    if (this.session != null && this.session.events) {
      const a = _.filter(this.session.events, function(h) {
        return h.eventCount === 0 ? !1 : h.time > e.time - GestureInputVelocityTime * 1e3;
      });
      e.velocity = this._getVelocity(a);
    }
    this.session != null && this.session.started.pinch && (e.scale = e.touchDistance / this.session.started.pinch.touchDistance, e.scaleDirection = this._getScaleDirection(
      e.scale - this.session.lastEvent.scale
    ), !e.scaleDirection && (this.session != null && this.session.lastEvent) && (e.scaleDirection = this.session.lastEvent.scaleDirection)), this.session != null && this.session.lastEvent && (e.fingers !== this.session.lastEvent.fingers && this.session.lastEvent.fingers === 2 && (e.delta = { x: 0, y: 0 }), e.fingers === 2 && this.session.lastEvent.fingers === 2 && (e.delta = Utils$2.pointSubtract(
      e.touchCenter,
      this.session.lastEvent.touchCenter
    ))), this.session != null && this.session.lastEvent && this.session.force && (e.force = this.session.force);
    for (var s of [
      "point",
      "start",
      "previous",
      "offset",
      "delta",
      "velocity",
      "touchCenter",
      "touchOffset"
    ])
      e[`${s}X`] = e[s].x, e[`${s}Y`] = e[s].y;
    return e;
  }
  _getTouchPoint(e, t) {
    return {
      x: e.touches[t].pageX,
      y: e.touches[t].pageY
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
  _createEvent(e, t) {
    const s = document.createEvent("MouseEvent");
    s.initMouseEvent(
      e,
      !0,
      !0,
      window,
      t.detail,
      t.screenX,
      t.screenY,
      t.clientX,
      t.clientY,
      t.ctrlKey,
      t.shiftKey,
      t.altKey,
      t.metaKey,
      t.button,
      t.relatedTarget
    ), s.touches = t.touches, s.changedTouches = t.touches, s.targetTouches = t.touches;
    for (var a in t) {
      var h = t[a];
      s[a] = h;
    }
    return s;
  }
  _dispatchEvent(e, t, s) {
    const a = this._createEvent(e, t);
    return s == null && (s = __guard__(
      this.session != null ? this.session.startEvent : void 0,
      (h) => h.target
    )), s == null && ({ target: s } = t), s.dispatchEvent(a);
  }
  _getVelocity(e) {
    if (e.length < 2)
      return { x: 0, y: 0 };
    const t = e[e.length - 1], s = e[0], a = t.time - s.time, h = {
      x: (t.point.x - s.point.x) / a,
      y: (t.point.y - s.point.y) / a
    };
    return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
  }
}
function __guard__(r, e) {
  return typeof r < "u" && r !== null ? e(r) : void 0;
}
let Canvas$1 = class extends BaseClass {
  static initClass() {
    this.define("width", { get: () => window.innerWidth }), this.define("height", { get: () => window.innerHeight }), this.define("size", { get: () => Utils$2.size(this) }), this.define("frame", { get: () => Utils$2.frame(this) }), this.define("backgroundColor", {
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
    super(e), this._handleResize = this._handleResize.bind(this), Events$6.wrap(window).addEventListener("resize", this._handleResize);
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
  convertPointToLayer(e, t) {
    return Utils$2.convertPointFromContext(e, t, !0, !0);
  }
  convertPointToScreen(e) {
    const t = Framer.Device.context;
    return Utils$2.convertPointFromContext(e, t, !0, !0);
  }
};
Canvas$1.initClass();
exports.date = 1762655598;
exports.branch = "main";
exports.hash = "ad96cba2-dirty";
exports.build = 3296;
exports.version = `${exports.branch}/${exports.hash}`;
const Version = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), Framer$1 = {};
Framer$1._ = _$1;
Framer$1.Utils = Utils$2;
Framer$1.Color = Color$1;
Framer$1.Gradient = Gradient$1;
Framer$1.Layer = Layer$2;
Framer$1._Layer = Layer$2;
Framer$1.BackgroundLayer = BackgroundLayer;
Framer$1.VideoLayer = VideoLayer;
Framer$1.SVGLayer = SVGLayer$1;
Framer$1.SVGPath = SVGPath;
Framer$1.SVGGroup = SVGGroup;
Framer$1.TextLayer = TextLayer;
Framer$1.Events = Events$6;
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
Framer$1.CircularProgressComponent = CircularProgressComponent$1;
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
Framer$1.LayerDraggable = Layer$2;
Framer$1.Curves = Curves;
typeof window < "u" && (window.Bezier = Bezier, window.Spring = Spring$1);
Framer$1.Importer = Importer;
Framer$1.Extras = Extras;
Framer$1.GestureInputRecognizer = new GestureInputRecognizer();
Framer$1.Version = Version;
Framer$1.Loop = new AnimationLoop();
Framer$1.Info = {};
typeof window < "u" && (_$1.extend(window, Framer$1), window.Framer = Framer$1);
Defaults$1.setup();
Framer$1.resetDefaults = Defaults$1.reset;
Framer$1.DefaultContext = new Context({ name: "Default" });
Framer$1.DefaultContext.backgroundColor = "white";
Framer$1.CurrentContext = Framer$1.DefaultContext;
typeof window < "u" && (window.Canvas = new Canvas$1());
Utils$2.isMobile() && Framer$1.Extras.MobileScrollFix.enable();
Utils$2.isTouch() || Framer$1.Extras.TouchEmulator.enable();
Utils$2.isFramerStudio() || Framer$1.Extras.ErrorDisplay.enable();
Utils$2.isFramerStudio() || Framer$1.Extras.Preloader.enable();
Utils$2.isFramerStudio() || Framer$1.Extras.Hints.enable();
Utils$2.domComplete(() => Framer$1.Loop.start());
export {
  Framer$1 as default
};
//# sourceMappingURL=framer.mjs.map
