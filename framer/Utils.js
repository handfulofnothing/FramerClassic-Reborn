import _ from "./Underscore.js";
import { Matrix } from "./Matrix.js";
import WebFont from "webfontloader";

export const Utils = {
  reset: () => Framer.CurrentContext.reset(),

  getValue: (value) => (_.isFunction(value) ? value() : value),

  getValueForKeyPath: (obj, key) => {
    if (!key.includes(".")) return obj[key];

    return key.split(".").reduce((result, part) => {
      return result?.[part];
    }, obj);
  },

  setValueForKeyPath: (obj, path, val) => {
    const fields = path.split(".");
    let result = obj;

    for (let i = 0; i < fields.length && result !== undefined; i++) {
      const field = fields[i];

      if (i === fields.length - 1) {
        const currentValue = result[field];

        if (
          _.isObject(currentValue) &&
          _.isObject(val) &&
          Object.getPrototypeOf(currentValue) === Object.prototype &&
          Object.getPrototypeOf(val) === Object.prototype
        ) {
          _.extend(currentValue, val);
        } else {
          result[field] = val;
        }
      } else {
        if (
          typeof result[field] === "undefined" ||
          !_.isObject(result[field])
        ) {
          result[field] = {};
        }
        result = result[field];
      }
    }
  },

  escapeForRegex: (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  valueOrDefault: (value, defaultValue) => {
    if ([undefined, null].includes(value)) {
      value = defaultValue;
    }

    return value;
  },

  arrayNext: (arr, item) => arr[arr.indexOf(item) + 1] || _.head(arr),
  arrayPrev: (arr, item) => arr[arr.indexOf(item) - 1] || _.last(arr),
  webkitPerspectiveForValue: (value) => {
    if (["none", null, 0].includes(value)) return "none";
    if (_.isNumber(value)) return value;
    return null;
  },

  sum: (arr) => _.reduce(arr, (a, b) => a + b),
  average: (arr) => (arr.length ? Utils.sum(arr) / arr.length : 0),
  mean: (arr) => (arr.length ? Utils.sum(arr) / arr.length : 0),
  median: (arr) => {
    if (!arr.length) return null;

    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  },

  nearestIncrement: (x, increment) =>
    increment ? Math.round(x * (1 / increment)) / (1 / increment) : x,

  delay: function (time, f) {
    const timer = setTimeout(f, time * 1000);
    Framer.CurrentContext.addTimer(timer);
    return timer;
  },

  interval: function (time, f) {
    const timer = setInterval(f, time * 1000);
    Framer.CurrentContext.addInterval(timer);
    return timer;
  },

  debounce: function (threshold, fn, immediate) {
    if (threshold == null) threshold = 0.1;
    let timeout = null;
    threshold *= 1000;
    return function (...args) {
      const obj = this;
      const delayed = function () {
        if (!immediate) fn.apply(obj, args);
        return (timeout = null);
      };
      if (timeout) {
        clearTimeout(timeout);
      } else if (immediate) {
        fn.apply(obj, args);
      }
      return (timeout = setTimeout(delayed, threshold));
    };
  },

  throttle: function (delay, fn) {
    if (delay === 0) return fn;
    delay *= 1000;
    let timer = false;
    return function (...args) {
      if (timer) return;
      timer = true;
      if (delay !== -1) setTimeout(() => (timer = false), delay);
      return fn(...args);
    };
  },

  memoize: (fn) => {
    return function (...args) {
      let hash = "";
      let i = args.length;
      let currentArg = null;
      while (i--) {
        currentArg = args[i];
        hash +=
          currentArg === Object(currentArg)
            ? JSON.stringify(currentArg)
            : currentArg;
        fn.memoize || (fn.memoize = {});
      }
      if (hash in fn.memoize) {
        return fn.memoize[hash];
      } else {
        return (fn.memoize[hash] = fn.apply(this, args));
      }
    };
  },

  randomColor: function (alpha = 1.0) {
    return Color.random(alpha);
  },

  randomChoice: (arr) => arr[Math.floor(Math.random() * arr.length)],

  randomNumber: function (a = 0, b = 1) {
    return Utils.mapRange(Math.random(), 0, 1, a, b);
  },

  randomImage: function (layer) {
    if (_.isNumber(layer)) layer = { id: layer };

    const photos = [
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
      "1414339372428-797ec111646d",
    ];

    let photo = Utils.randomChoice(photos);
    if (layer?.id != null) {
      photo = photos[layer.id % photos.length];
    }

    const increment = 100;
    let size = 1024;

    if (layer) {
      size = Math.max(layer.width, layer.height);
      size = Math.ceil(size / increment) * increment;
      if (size < increment) size = increment;
      size = Utils.devicePixelRatio() * size;
      size = parseInt(size, 10);
    }

    return `https://images.unsplash.com/photo-${photo}?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=${size}&h=${size}&fit=max`;
  },

  defineEnum: function (names = [], offset = 0, geometric = 0) {
    const Enum = {};
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      let j = i;
      j = offset ? j + offset : j;
      j = geometric ? Math.pow(geometric, j) : j;
      Enum[(Enum[name] = j)] = name;
    }
    return Enum;
  },

  labelLayer: function (layer, text, style = {}) {
    if (!text || typeof text !== "string") return;

    const fontSize = Math.max(Math.min(48, parseInt(layer.height / 3.2)), 14);

    style = _.extend(
      {
        font: `${fontSize}px/1em ${Utils.deviceFont()}`,
        lineHeight: `${layer.height}px`,
        textAlign: "center",
        color: "#fff",
      },
      style
    );

    layer.style = style;
    layer.html = text;
  },

  stringify: function (obj) {
    try {
      if (_.isObject(obj)) return JSON.stringify(obj);
    } catch (error) {}

    if (obj === null) return "null";
    if (obj === undefined) return "undefined";
    if (obj.toString) return obj.toString();
    return obj;
  },

  inspectObjectType: function (item) {
    // This is a hacky way to get nice object names, it tries to
    // parse them from the .toString methods for objects.

    let className;
    if (
      (item.constructor != null ? item.constructor.name : undefined) != null &&
      (item.constructor != null ? item.constructor.name : undefined) !==
        "Object"
    ) {
      return item.constructor.name;
    }

    const extract = function (str) {
      if (!str) {
        return null;
      }
      const regex = /\[object (\w+)\]/;
      const match = regex.exec(str);
      if (match) {
        return match[1];
      }
      return null;
    };

    if (item.toString) {
      className = extract(item.toString());
      if (className) {
        return className;
      }
    }

    if (item.constructor != null ? item.constructor.toString : undefined) {
      className = extract(
        item.constructor != null ? item.constructor.toString() : undefined
      );
      if (className) {
        return className.replace("Constructor", "");
      }
    }

    return "Object";
  },

  inspect: function (item, max, l) {
    if (max == null) {
      max = 5;
    }
    if (l == null) {
      l = 0;
    }
    if (item === null) {
      return "null";
    }
    if (item === undefined) {
      return "undefined";
    }

    if (_.isFunction(item.toInspect)) {
      return item.toInspect();
    }
    if (_.isString(item)) {
      return `\"${item}\"`;
    }
    if (_.isNumber(item)) {
      return `${item}`;
    }
    if (_.isFunction(item)) {
      let code = item
        .toString()
        .slice("function ".length)
        .replace(/\n/g, "")
        .replace(/\s+/g, " ");
      // We limit the size of a function body if it's in a strucutre
      const limit = 50;
      if (code.length > limit && l > 0) {
        code = `${_.trimEnd(code.slice(0, +limit + 1 || undefined))}… }`;
      }
      return `<Function ${code}>`;
    }
    if (_.isArray(item)) {
      if (l > max) {
        return "[...]";
      }
      return (
        "[" + _.map(item, (i) => Utils.inspect(i, max, l + 1)).join(", ") + "]"
      );
    }
    if (_.isObject(item)) {
      let objectInfo;
      const objectType = Utils.inspectObjectType(item);
      // We should not loop over dom trees because we will have a bad time
      if (/HTML\w+?Element/.test(objectType)) {
        return `<${objectType}>`;
      }
      if (l > max) {
        objectInfo = "{...}";
      } else {
        objectInfo =
          "{" +
          _.map(item, (v, k) => `${k}:${Utils.inspect(v, max, l + 1)}`).join(
            ", "
          ) +
          "}";
      }
      if (objectType === "Object") {
        return objectInfo;
      }
      return `<${objectType} ${objectInfo}>`;
    }

    return `${item}`;
  },

  uuid: function () {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    const output = new Array(36);
    let random = 0;

    for (let digit = 1; digit <= 32; digit++) {
      if (random <= 0x02) {
        random = (0x2000000 + Math.random() * 0x1000000) | 0;
      }
      var r = random & 0xf;
      random = random >> 4;
      output[digit] = chars[digit === 19 ? (r & 0x3) | 0x8 : r];
    }

    return output.join("");
  },

  findLayer: (layers, selector) =>
    _.find(layers, (layer) => Utils.layerMatchesSelector(layer, selector)),

  filterLayers: (layers, selector) =>
    _.filter(layers, (layer) => Utils.layerMatchesSelector(layer, selector)),

  layerMatchesSelector: (layer, selector) => {
    const getHierarchyString = (l) => {
      // create a string of the hierarchy so we can run regex on it
      const nameArr = _.pluck(l.ancestors().reverse(), "name");
      return nameArr.join(">") + `>${layer.name}`;
    };

    const hierarchyMatch = (hierarchy, string) => {
      string = string.replace(/\s*>\s*/g, ">"); // clean spaces around >
      string = string.split("*").join("[^>]*"); // anything but >
      string = string.split(" ").join("(?:.*)>"); // anything but ends with >
      string = string.split(",").join("$|"); // or
      const regexString = "(^|>)" + string + "$";
      const regExp = new RegExp(regexString);
      return regExp.test(hierarchy);
    };

    if (selector) {
      const hierarchy = getHierarchyString(layer, selector);
      return hierarchyMatch(hierarchy, selector);
    }
  },

  arrayFromArguments: (args) =>
    _.isArray(args[0]) ? args[0] : Array.from(args),

  cycle: (...args) => {
    let curr = -1;
    return () => {
      curr++;
      if (curr >= args.length) curr = 0;
      return args[curr];
    };
  },

  toggle: (...args) => Utils.cycle(...args),

  callAfterCount: (total, callback) => {
    let count = 0;
    return () => {
      count += 1;
      if (count === total)
        return typeof callback === "function" ? callback() : undefined;
    };
  },

  equal: (a, b) => {
    if (_.isFunction(a?.isEqual)) return a.isEqual(b);
    if (_.isFunction(b?.isEqual)) return b.isEqual(a);
    return _.isEqual(a, b);
  },

  isWebKit: () => window.WebKitCSSMatrix !== undefined && !Utils.isEdge(),

  webkitVersion: () => {
    let version = -1;
    const regexp = /AppleWebKit\/([\d.]+)/;
    const result = regexp.exec(navigator.userAgent);
    if (result) version = parseFloat(result[1]);
    return version;
  },

  isChrome: () =>
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),

  isSafari: () =>
    /Safari/.test(navigator.userAgent) &&
    /Apple Computer/.test(navigator.vendor),

  isFirefox: () => /^Mozilla.*Firefox\/\d+\.\d+$/.test(navigator.userAgent),

  isEdge: () => /Edge/.test(navigator.userAgent),

  isAndroid: () => /(android)/i.test(navigator.userAgent),

  isIOS: () => /(iPhone|iPod|iPad)/i.test(navigator.platform),

  isMacOS: () => /Mac/.test(navigator.platform),

  isWindows: () => /Win/.test(navigator.platform),

  isTouch: () =>
    window.ontouchstart === null &&
    window.ontouchmove === null &&
    window.ontouchend === null,

  isDesktop: () => Utils.deviceType() === "desktop",

  isPhone: () => Utils.deviceType() === "phone",

  isTablet: () => Utils.deviceType() === "tablet",

  isMobile: () => Utils.isPhone() || Utils.isTablet(),

  isFileUrl: (url) => _.startsWith(url, "file://"),

  isDataUrl: (url) => _.startsWith(url, "data:"),

  isRelativeUrl: (url) => !/^([a-zA-Z]{1,8}:\/\/).*$/.test(url),

  isLocalServerUrl: (url) =>
    /[a-zA-Z]{1,8}:\/\/127\.0\.0\.1/.test(url) ||
    /[a-zA-Z]{1,8}:\/\/localhost/.test(url),

  isLocalUrl: (url) => Utils.isFileUrl(url) || Utils.isLocalServerUrl(url),

  isLocalAssetUrl: (url, baseUrl = window.location.href) => {
    if (Utils.isDataUrl(url)) return false;
    if (Utils.isLocalUrl(url)) return true;
    if (Utils.isRelativeUrl(url) && Utils.isLocalUrl(baseUrl)) return true;
    return false;
  },

  isFramerStudio: () => navigator.userAgent.includes("FramerStudio"),

  framerStudioVersion: () => {
    if (Utils.isFramerStudio()) {
      const isBeta = navigator.userAgent.includes("FramerStudio/beta");
      const isLocal = navigator.userAgent.includes("FramerStudio/local");
      const isFuture = navigator.userAgent.includes("FramerStudio/future");

      if (isBeta || isLocal || isFuture) return Number.MAX_VALUE;

      const matches = navigator.userAgent.match(/\d+$/);
      const version =
        matches && matches.length > 0 ? parseInt(matches[0]) : undefined;

      if (_.isNumber(version)) return version;
    }

    return Number.MAX_VALUE;
  },

  devicePixelRatio: () => window.devicePixelRatio,

  isJP2Supported: () =>
    Utils.isWebKit() && !Utils.isChrome() && !Utils.isFirefox(),

  isWebPSupported: () => Utils.isChrome(),

  deviceType: () => {
    if (/(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent)) return "tablet";
    if (/(mobi)/i.test(navigator.userAgent)) return "phone";
    return "desktop";
  },

  pathJoin: (...args) => args.join("/"),

  deviceFont: (os) => {
    if (!os) {
      if (Utils.isMacOS()) os = "macOS";
      if (Utils.isIOS()) os = "iOS";
      if (Utils.isAndroid()) os = "Android";
      if (Utils.isWindows()) os = "Windows";
    }

    const appleFont =
      "-apple-system, BlinkMacSystemFont, SF UI Text, Helvetica Neue";
    const googleFont = "Roboto, Helvetica Neue";
    const microsoftFont = "Segoe UI, Helvetica Neue";

    switch (os) {
      case "Android":
        return googleFont;
      case "iOS":
      case "watchOS":
      case "macOS":
        return appleFont;
      case "Windows":
        return microsoftFont;
      default:
        return appleFont;
    }
  },

  isFontAvailable: (fonts) => {
    if (_isFontLoadedResults[fonts] === true) return true;

    if (monoWidth == null) monoWidth = getWidth("monospace");
    if (serifWidth == null) serifWidth = getWidth("serif");
    if (sansWidth == null) sansWidth = getWidth("sans-serif");

    if (
      monoWidth !== getWidth(`${fonts},monospace`) ||
      serifWidth !== getWidth(`${fonts},serif`) ||
      sansWidth !== getWidth(`${fonts},sans-serif`)
    ) {
      _isFontLoadedResults[fonts] = true;
      return true;
    }

    return false;
  },

  isFontFamilyLoaded: (fonts, timeout = 1000) => {
    if (!_.isArray(fonts)) fonts = [fonts];

    const unavailableFonts = fonts.filter(
      (font) => !Utils.isFontAvailable(font)
    );

    if (unavailableFonts.length === 0) return true;

    return Utils.loadWebFontConfig({
      custom: {
        families: unavailableFonts,
      },
      timeout,
    });
  },

  textSize: (text, style = {}, constraints = {}) => {
    let frame;
    const shouldCreateNode = !_textSizeNode;

    if (shouldCreateNode) {
      _textSizeNode = document.createElement("div");
      _textSizeNode.id = "_textSizeNode";
    }

    // Reset all previous styles and set the content
    _textSizeNode.removeAttribute("style");
    _textSizeNode.innerHTML = text;

    style = _.extend(_.clone(style), {
      position: "fixed",
      display: "inline",
      visibility: "hidden",
      top: "-10000px",
      left: "-10000px",
    });

    // Remove sizing properties that will interfere
    delete style.width;
    delete style.height;
    delete style.bottom;
    delete style.right;

    if (constraints.max) {
      if (constraints.width) style.maxWidth = `${constraints.width}px`;
      if (constraints.height) style.maxHeight = `${constraints.height}px`;
    } else {
      if (constraints.width) style.width = `${constraints.width}px`;
      if (constraints.height) style.height = `${constraints.height}px`;
    }

    _.extend(_textSizeNode.style, style);

    if (shouldCreateNode) {
      if (!document.body) {
        // In case document.body is not ready
        document.write(_textSizeNode.outerHTML);
        _textSizeNode = document.getElementById("_textSizeNode");
      } else {
        document.body.appendChild(_textSizeNode);
      }
    }

    const rect = _textSizeNode.getBoundingClientRect();

    return {
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    };
  },

  loadWebFontConfig: (config) => {
    const fonts = fontsFromConfig(config);
    let allLoadedResult = null;

    for (const currentFont of fonts) {
      const currentFontLoaded = _isFontLoadedResults[currentFont];
      if (currentFontLoaded == null) {
        allLoadedResult = null;
        break;
      }
      allLoadedResult =
        allLoadedResult === null
          ? currentFontLoaded
          : allLoadedResult && currentFontLoaded;
    }

    if (allLoadedResult != null) return allLoadedResult;

    const {
      active: customActive,
      inactive: customInactive,
      fontactive: customFontactive,
      fontinactive: customFontinactive,
    } = config;

    return new Promise((resolve, reject) => {
      config.fontactive = (font) => {
        _isFontLoadedResults[font] = true;
        if (typeof customFontactive === "function") customFontactive(font);
        if (fonts.length === 1) resolve();
      };

      config.fontinactive = (font) => {
        console.warn(`Tried to load unavailable font: '${font}'`);
        _isFontLoadedResults[font] = false;
        if (typeof customFontinactive === "function") customFontinactive(font);
        if (fonts.length === 1) reject(new Error(`${font} failed to load`));
      };

      config.active = () => {
        if (typeof customActive === "function") customActive();
        resolve();
      };

      config.inactive = () => {
        if (typeof customInactive === "function") customInactive();
        reject(new Error(`${fonts.join(", ")} failed to load`));
      };

      WebFont.load(config);
    });
  },

  loadWebFont: (font, weight, source = "google") => {
    if (
      _isFontLoadedResults[font] == null ||
      _isFontLoadedResults[font] === false
    ) {
      delete _isFontLoadedResults[font];
      const config = {};
      if (source === "google") {
        let fontToLoad = font;
        if (weight != null) fontToLoad += `:${weight}`;
        config.google = { families: [fontToLoad] };
      }
      Utils.loadWebFontConfig(config);
    }
    return { fontFamily: font, fontWeight: weight };
  },

  //#####################################################
  // MATH FUNCTIONS

  round: (value, decimals = 0, increment = null, min = null, max = null) => {
    const d = Math.pow(10, decimals);

    if (increment) value = Math.round(value / increment) * increment;
    value = Math.round(value * d) / d;

    if (min != null && value < min) value = min;
    if (max != null && value > max) value = max;

    return value;
  },

  roundWhole: (value, decimals = 1) =>
    parseInt(value) === value ? parseInt(value) : Utils.round(value, decimals),

  clamp: (value, a, b) => {
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return Math.min(Math.max(value, min), max);
  },

  mapRange: (value, fromLow, fromHigh, toLow, toHigh) =>
    toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow),

  modulate: (value, [fromLow, fromHigh], [toLow, toHigh], limit = false) => {
    let result =
      toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);

    if (limit) {
      if (toLow < toHigh) {
        result = Math.min(Math.max(result, toLow), toHigh);
      } else {
        result = Math.max(Math.min(result, toLow), toHigh);
      }
    }

    return result;
  },

  //#####################################################
  // STRING FUNCTIONS

  parseFunction: (str) => {
    const result = { name: "", args: [] };

    if (_.endsWith(str, ")")) {
      result.name = str.split("(")[0];
      result.args = str
        .split("(")[1]
        .split(",")
        .map((a) => _.trim(_.trimEnd(a, ")")));
    } else {
      result.name = str;
    }

    return result;
  },
};

if (window.requestAnimationFrame == null) {
  window.requestAnimationFrame = window.webkitRequestAnimationFrame;
}
if (window.requestAnimationFrame == null) {
  window.requestAnimationFrame = (f) => Utils.delay(1 / 60, f);
}

// Used by animation engine, needs to be very performant
if (window.performance) {
  Utils.getTime = () => window.performance.now() / 1000;
} else {
  Utils.getTime = () => Date.now() / 1000;
}

const _isFontLoadedResults = {};

const getWidth = (fontFamily) =>
  Utils.textSize("BESbswy", {
    fontFamily,
    fontSize: 300,
  }).width;

let monoWidth = null;
let serifWidth = null;
let sansWidth = null;

const fontsFromConfig = function (config) {
  let result = [];
  if (
    _.isArray(
      __guard__(config != null ? config.custom : undefined, (x) => x.families)
    )
  ) {
    result = result.concat(
      __guard__(config != null ? config.custom : undefined, (x1) => x1.families)
    );
  }
  if (
    _.isArray(
      __guard__(config != null ? config.google : undefined, (x2) => x2.families)
    )
  ) {
    result = result.concat(
      __guard__(config != null ? config.google : undefined, (x3) => x3.families)
    );
  }
  return result;
};
//#####################################################
// DOM FUNCTIONS

const __domCompleteState = "interactive";
let __domComplete = [];
let __domReady = false;

if (typeof document !== "undefined" && document !== null) {
  document.onreadystatechange = function (event) {
    if (document.readyState === __domCompleteState) {
      __domReady = true;
      return (() => {
        const result = [];
        while (__domComplete.length) {
          var f;
          result.push((f = __domComplete.shift()()));
        }
        return result;
      })();
    }
  };
}

Utils.domComplete = function (f) {
  if (__domReady) {
    return f();
  } else {
    return __domComplete.push(f);
  }
};

Utils.domCompleteCancel = (f) => (__domComplete = _.without(__domComplete, f));

Utils.domValidEvent = function (element, eventName) {
  if (!eventName) {
    return;
  }
  if (["touchstart", "touchmove", "touchend"].includes(eventName)) {
    return true;
  }
  return typeof element[`on${eventName.toLowerCase()}`] !== "undefined";
};

Utils.domLoadScript = function (url, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;

  script.onload = callback;

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);

  return script;
};

Utils.domLoadData = function (path, callback) {
  const request = new XMLHttpRequest();

  // request.addEventListener "progress", updateProgress, false
  // request.addEventListener "abort", transferCanceled, false

  request.addEventListener(
    "load",
    () => callback(null, request.responseText),
    false
  );

  request.addEventListener("error", () => callback(true, null), false);

  request.open("GET", path, true);
  return request.send(null);
};

Utils.domLoadJSON = (path, callback) =>
  Utils.domLoadData(path, (err, data) => callback(err, JSON.parse(data)));

Utils.domLoadDataSync = function (path) {
  const request = new XMLHttpRequest();
  request.open("GET", path, false);

  // This does not work in Safari, see below
  try {
    request.send(null);
  } catch (e) {
    console.debug("XMLHttpRequest.error", e);
  }

  const handleError = function () {
    throw Error(
      `Utils.domLoadDataSync: ${path} -> [${request.status} ${request.statusText}]`
    );
  };

  request.onerror = handleError;

  if (![200, 0].includes(request.status)) {
    handleError();
  }

  // Because I can't catch the actual 404 with Safari, I just assume something
  // went wrong if there is no text data returned from the request.
  if (!request.responseText) {
    handleError();
  }

  // console.log "domLoadDataSync", path
  // console.log "xhr.readyState", request.readyState
  // console.log "xhr.status", request.status
  // console.log "xhr.responseText", request.responseText

  return request.responseText;
};

Utils.domLoadJSONSync = (path) => JSON.parse(Utils.domLoadDataSync(path));

Utils.domLoadScriptSync = function (path) {
  const scriptData = Utils.domLoadDataSync(path);
  eval(scriptData);
  return scriptData;
};

Utils.insertCSS = function (css) {
  const styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.innerHTML = css;

  return Utils.domComplete(() => document.body.appendChild(styleElement));
};

Utils.loadImage = function (url, callback, context) {
  // Loads a single image and calls callback.
  // The callback will be called with true if there is an error.

  const element = new Image();
  if (context == null) {
    context = Framer.CurrentContext;
  }

  context.domEventManager
    .wrap(element)
    .addEventListener("load", (event) => callback());

  context.domEventManager
    .wrap(element)
    .addEventListener("error", (event) => callback(true));

  return (element.src = url);
};

Utils.isInsideIframe = function () {
  if (!Utils.isInsideFramerCloud()) {
    return window !== window.top;
  }
  return false;
};

Utils.isInsideFramerCloud = () => Utils.getQueryParameters()["cloud"] === "1";

Utils.getQueryParameters = () =>
  _.fromPairs(
    window.location.search
      .slice(1)
      .split("&")
      .map((val) => val.split("="))
  );

//#####################################################
// GEOMETRY FUNCTIONS

// Point

Utils.point = function (input) {
  if (_.isNumber(input)) {
    return Utils.pointZero(input);
  }
  if (!input) {
    return Utils.pointZero();
  }

  const result = Utils.pointZero();

  for (var k of ["x", "y"]) {
    if (_.isNumber(input[k])) {
      result[k] = input[k];
    }
  }

  return result;
};

Utils.pointZero = function (n) {
  if (n == null) {
    n = 0;
  }
  return { x: n, y: n };
};

Utils.pointDivide = (point, fraction) =>
  (point = {
    x: point.x / fraction,
    y: point.y / fraction,
  });

Utils.pointAdd = function (pointA, pointB) {
  let point;
  return (point = {
    x: pointA.x + pointB.x,
    y: pointA.y + pointB.y,
  });
};

Utils.pointSubtract = function (pointA, pointB) {
  let point;
  return (point = {
    x: pointA.x - pointB.x,
    y: pointA.y - pointB.y,
  });
};

Utils.pointMin = function () {
  let point;
  const points = Utils.arrayFromArguments(arguments);
  return (point = {
    x: _.min(points.map((size) => size.x)),
    y: _.min(points.map((size) => size.y)),
  });
};

Utils.pointMax = function () {
  let point;
  const points = Utils.arrayFromArguments(arguments);
  return (point = {
    x: _.max(points.map((size) => size.x)),
    y: _.max(points.map((size) => size.y)),
  });
};

Utils.pointDelta = function (pointA, pointB) {
  let delta;
  return (delta = {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
  });
};

Utils.pointDistance = function (pointA, pointB) {
  const a = pointA.x - pointB.x;
  const b = pointA.y - pointB.y;
  return Math.sqrt(a * a + b * b);
};

Utils.pointInvert = (point) =>
  (point = {
    x: 0 - point.x,
    y: 0 - point.y,
  });

Utils.pointTotal = (point) => point.x + point.y;

Utils.pointAbs = (point) =>
  (point = {
    x: Math.abs(point.x),
    y: Math.abs(point.y),
  });

Utils.pointInFrame = function (point, frame) {
  if (
    point.x < Utils.frameGetMinX(frame) ||
    point.x > Utils.frameGetMaxX(frame)
  ) {
    return false;
  }
  if (
    point.y < Utils.frameGetMinY(frame) ||
    point.y > Utils.frameGetMaxY(frame)
  ) {
    return false;
  }
  return true;
};

Utils.pointCenter = function (pointA, pointB) {
  let point;
  return (point = {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2,
  });
};

Utils.pointAngle = (pointA, pointB) =>
  (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) / Math.PI;

Utils.divideFrame = function (frame, scale) {
  frame.x /= scale;
  frame.y /= scale;
  frame.width /= scale;
  frame.height /= scale;
  return frame;
};

Utils.scaleFrames = function (layer, scale) {
  if (layer instanceof Layer) {
    layer.constraintValues = null;
    layer.children.map((l) => Utils.scaleFrames(l, scale));
    layer.frame = Utils.divideFrame(layer.frame, scale);
  }
  if (_.isArray(layer)) {
    return layer.map((l) => Utils.scaleFrames(l, scale));
  }
};
// Size

Utils.size = function (input) {
  if (_.isNumber(input)) {
    return Utils.sizeZero(input);
  }
  if (!input) {
    return Utils.sizeZero();
  }

  const result = Utils.sizeZero();

  for (var k of ["width", "height"]) {
    if (_.isNumber(input[k])) {
      result[k] = input[k];
    }
  }

  return result;
};

Utils.sizeZero = function (n) {
  if (n == null) {
    n = 0;
  }
  return { width: n, height: n };
};

Utils.sizeMin = function () {
  let size;
  const sizes = Utils.arrayFromArguments(arguments);
  return (size = {
    width: _.min(sizes.map((size) => size.width)),
    height: _.min(sizes.map((size) => size.height)),
  });
};

Utils.sizeMax = function () {
  let size;
  const sizes = Utils.arrayFromArguments(arguments);
  return (size = {
    width: _.max(sizes.map((size) => size.width)),
    height: _.max(sizes.map((size) => size.height)),
  });
};

// Rect

Utils.rectZero = function (args) {
  if (args == null) {
    args = {};
  }
  return _.defaults(args, { top: 0, right: 0, bottom: 0, left: 0 });
};

Utils.parseRect = function (args) {
  if (_.isArray(args) && _.isNumber(args[0])) {
    if (args.length === 1) {
      return Utils.parseRect({ top: args[0] });
    }
    if (args.length === 2) {
      return Utils.parseRect({ top: args[0], right: args[1] });
    }
    if (args.length === 3) {
      return Utils.parseRect({ top: args[0], right: args[1], bottom: args[2] });
    }
    if (args.length === 4) {
      return Utils.parseRect({
        top: args[0],
        right: args[1],
        bottom: args[2],
        left: args[3],
      });
    }
  }
  if (_.isArray(args) && _.isObject(args[0])) {
    return args[0];
  }
  if (_.isObject(args)) {
    return args;
  }
  if (_.isNumber(args)) {
    return { top: args, right: args, bottom: args, left: args };
  }

  return {};
};

// Frames

// min mid max * x, y

Utils.frameGetMinX = (frame) => frame.x;
Utils.frameSetMinX = (frame, value) => (frame.x = value);

Utils.frameGetMidX = function (frame) {
  if (frame.width === 0) {
    return frame.x;
  } else {
    return frame.x + frame.width / 2.0;
  }
};
Utils.frameSetMidX = (frame, value) =>
  (frame.x = frame.width === 0 ? value : value - frame.width / 2.0);

Utils.frameGetMaxX = function (frame) {
  if (frame.width === 0) {
    return 0;
  } else {
    return frame.x + frame.width;
  }
};
Utils.frameSetMaxX = (frame, value) =>
  (frame.x = frame.width === 0 ? 0 : value - frame.width);

Utils.frameGetMinY = (frame) => frame.y;
Utils.frameSetMinY = (frame, value) => (frame.y = value);

Utils.frameGetMidY = function (frame) {
  if (frame.height === 0) {
    return frame.y;
  } else {
    return frame.y + frame.height / 2.0;
  }
};
Utils.frameSetMidY = (frame, value) =>
  (frame.y = frame.height === 0 ? value : value - frame.height / 2.0);

Utils.frameGetMaxY = function (frame) {
  if (frame.height === 0) {
    return 0;
  } else {
    return frame.y + frame.height;
  }
};
Utils.frameSetMaxY = (frame, value) =>
  (frame.y = frame.height === 0 ? 0 : value - frame.height);

Utils.frame = function (input) {
  if (_.isNumber(input)) {
    return Utils.frameZero(input);
  }
  if (!input) {
    return Utils.frameZero();
  }

  const result = Utils.frameZero();

  for (var k of ["x", "y", "width", "height"]) {
    if (_.isNumber(input[k])) {
      result[k] = input[k];
    }
  }

  return result;
};

Utils.frameZero = function (n) {
  if (n == null) {
    n = 0;
  }
  return { x: n, y: n };
};

Utils.frameSize = function (frame) {
  let size;
  return (size = {
    width: frame.width,
    height: frame.height,
  });
};

Utils.framePoint = function (frame) {
  let point;
  return (point = {
    x: frame.x,
    y: frame.y,
  });
};

Utils.pointsFromFrame = function (frame) {
  const minX = Utils.frameGetMinX(frame);
  const maxX = Utils.frameGetMaxX(frame);
  const minY = Utils.frameGetMinY(frame);
  const maxY = Utils.frameGetMaxY(frame);
  const corner1 = { x: minX, y: minY };
  const corner2 = { x: minX, y: maxY };
  const corner3 = { x: maxX, y: maxY };
  const corner4 = { x: maxX, y: minY };
  return [corner1, corner2, corner3, corner4];
};

Utils.frameFromPoints = function (points) {
  let frame;
  const xValues = _.map(points, "x");
  const yValues = _.map(points, "y");

  const minX = _.min(xValues);
  const maxX = _.max(xValues);
  const minY = _.min(yValues);
  const maxY = _.max(yValues);

  return (frame = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  });
};

Utils.pixelAlignedFrame = function (frame) {
  const x = Math.round(frame.x);
  const y = Math.round(frame.y);
  const maxX = Math.round(frame.x + frame.width);
  const maxY = Math.round(frame.y + frame.height);
  const width = Math.max(maxX - x, 0);
  const height = Math.max(maxY - y, 0);
  return { x, y, width, height };
};

Utils.calculateLayoutFrame = function (parentFrame, child) {
  const { constraintValues } = child;

  let x = constraintValues.left || 0;
  let y = constraintValues.top || 0;
  let { width } = constraintValues;
  let { height } = constraintValues;

  if (parentFrame === null) {
    return Utils.pixelAlignedFrame({ x, y, width, height });
  }

  const ratio = width / height;

  if (constraintValues.widthFactor !== null) {
    width = parentFrame.width * constraintValues.widthFactor;
    if (constraintValues.aspectRatioLocked) {
      height = width / ratio;
    }
  }

  if (constraintValues.heightFactor !== null) {
    height = parentFrame.height * constraintValues.heightFactor;
    if (constraintValues.aspectRatioLocked) {
      width = height * ratio;
    }
  }

  if (constraintValues.left !== null && constraintValues.right !== null) {
    width = parentFrame.width - constraintValues.right - constraintValues.left;
    if (constraintValues.aspectRatioLocked) {
      height = width / ratio;
    }
  }

  if (constraintValues.top !== null && constraintValues.bottom !== null) {
    height =
      parentFrame.height - constraintValues.bottom - constraintValues.top;
    if (constraintValues.aspectRatioLocked) {
      width = height * ratio;
    }
  }

  x = Utils.calculateLayoutX(parentFrame, constraintValues, width);
  y = Utils.calculateLayoutY(parentFrame, constraintValues, height);

  return Utils.pixelAlignedFrame({ x, y, width, height });
};

Utils.calculateLayoutX = function (parentFrame, constraintValues, width) {
  let x = constraintValues.left || 0;
  if (constraintValues.left !== null) {
    x = constraintValues.left;
  } else if (constraintValues.right !== null) {
    x = parentFrame.width - constraintValues.right - width;
  } else {
    x = constraintValues.centerAnchorX * parentFrame.width - width / 2;
  }
  return x;
};

Utils.calculateLayoutY = function (parentFrame, constraintValues, height) {
  let y = constraintValues.top || 0;
  if (constraintValues.top !== null) {
    y = constraintValues.top;
  } else if (constraintValues.bottom !== null) {
    y = parentFrame.height - constraintValues.bottom - height;
  } else {
    y = constraintValues.centerAnchorY * parentFrame.height - height / 2;
  }
  return y;
};

Utils.frameMerge = function () {
  // Return a frame that fits all the input frames

  const frames = Utils.arrayFromArguments(arguments);

  const frame = {
    x: _.min(frames.map(Utils.frameGetMinX)),
    y: _.min(frames.map(Utils.frameGetMinY)),
  };

  frame.width = _.max(frames.map(Utils.frameGetMaxX)) - frame.x;
  frame.height = _.max(frames.map(Utils.frameGetMaxY)) - frame.y;

  return frame;
};

Utils.frameInFrame = function (frameA, frameB) {
  for (var point of Array.from(Utils.pointsFromFrame(frameA))) {
    if (!Utils.pointInFrame(point, frameB)) {
      return false;
    }
  }

  return true;
};

Utils.framePointForOrigin = (frame, originX, originY) =>
  (frame = {
    x: frame.x + originX * frame.width,
    y: frame.y + originY * frame.height,
    width: frame.width,
    height: frame.height,
  });

Utils.frameInset = function (frame, inset) {
  if (_.isNumber(inset)) {
    inset = { top: inset, right: inset, bottom: inset, left: inset };
  }

  frame = Utils.frame(frame);

  return (frame = {
    x: frame.x + inset.left,
    y: frame.y + inset.top,
    width: frame.width - inset.left - inset.right,
    height: frame.height - inset.top - inset.bottom,
  });
};

Utils.frameSortByAbsoluteDistance = function (point, frames, originX, originY) {
  if (originX == null) {
    originX = 0;
  }
  if (originY == null) {
    originY = 0;
  }
  const distance = function (frame) {
    let result = Utils.pointDelta(
      point,
      Utils.framePointForOrigin(frame, originX, originY)
    );
    result = Utils.pointAbs(result);
    result = Utils.pointTotal(result);
    return result;
  };

  return frames.sort((a, b) => distance(a) - distance(b));
};

Utils.pointInPolygon = function (point, vs) {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  const x = point[0];
  const y = point[1];
  let inside = false;
  let i = 0;
  let j = vs.length - 1;
  while (i < vs.length) {
    var xi = vs[i][0];
    var yi = vs[i][1];
    var xj = vs[j][0];
    var yj = vs[j][1];
    var intersect =
      yi > y &&
      y !== yj &&
      yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
    j = i++;
  }
  return inside;
};

Utils.frameIntersection = function (rectA, rect) {
  let x1 = rect.x;
  let y1 = rect.y;

  let x2 = x1 + rect.width;
  let y2 = y1 + rect.height;

  if (rectA.x > x1) {
    x1 = rectA.x;
  }
  if (rectA.y > y1) {
    y1 = rectA.y;
  }
  if (rectA.x + rectA.width < x2) {
    x2 = rectA.x + rectA.width;
  }
  if (rectA.y + rectA.height < y2) {
    y2 = rectA.y + rectA.height;
  }
  if (x2 <= x1 || y2 <= y1) {
    return null;
  }

  return (rect = {
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
  });
};

Utils.frameCenterPoint = function (frame) {
  let point;
  return (point = {
    x: Utils.frameGetMidX(frame),
    y: Utils.frameGetMidY(frame),
  });
};

Utils.frameInFrame = function (frameA, frameB) {
  for (var point of Array.from(Utils.pointsFromFrame(frameA))) {
    if (!Utils.pointInFrame(point, frameB)) {
      return false;
    }
  }

  return true;
};

// Rotation

Utils.rotationNormalizer = function () {
  let lastValue = null;

  return function (value) {
    if (lastValue == null) {
      lastValue = value;
    }

    const diff = lastValue - value;
    const maxDiff = Math.abs(diff) + 180;
    const nTimes = Math.floor(maxDiff / 360);

    if (diff < 180) {
      value -= nTimes * 360;
    }
    if (diff > 180) {
      value += nTimes * 360;
    }

    lastValue = value;
    return value;
  };
};

// Coordinate system

// convert a point from a layer to the context level, with rootContext enabled you can make it cross to the top context
Utils.convertPointToContext = function (
  point,
  layer,
  rootContext,
  includeLayer
) {
  if (point == null) {
    point = {};
  }
  if (rootContext == null) {
    rootContext = false;
  }
  if (includeLayer == null) {
    includeLayer = true;
  }
  point = _.defaults(point, { x: 0, y: 0, z: 0 });
  const containers = layer.containers(rootContext);
  if (includeLayer) {
    containers.unshift(layer);
  }

  for (var container of Array.from(containers)) {
    if (container.flat || container.clip) {
      point.z = 0;
    }
    if (container.matrix3d != null) {
      point = container.matrix3d.point(point);
    } else if (container.scale != null) {
      point = {
        x: point.x * container.scale,
        y: point.y * container.scale,
      };
    }
    if (!container.parent) {
      point.z = 0;
    }
  }

  return point;
};

Utils.convertFrameToContext = function (
  frame,
  layer,
  rootContext,
  includeLayer
) {
  if (frame == null) {
    frame = {};
  }
  if (rootContext == null) {
    rootContext = false;
  }
  if (includeLayer == null) {
    includeLayer = true;
  }
  frame = _.defaults(frame, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height,
  });
  const corners = Utils.pointsFromFrame(frame);
  const convertedCorners = corners.map((point) =>
    Utils.convertPointToContext(point, layer, rootContext, includeLayer)
  );
  return Utils.frameFromPoints(convertedCorners);
};

// convert a point from the context level to a layer, with rootContext enabled you can make it cross from the top context
Utils.convertPointFromContext = function (
  point,
  layer,
  rootContext,
  includeLayer
) {
  if (point == null) {
    point = {};
  }
  if (rootContext == null) {
    rootContext = false;
  }
  if (includeLayer == null) {
    includeLayer = true;
  }
  point = _.defaults(point, { x: 0, y: 0, z: 0 });

  if (
    rootContext &&
    typeof webkitConvertPointFromPageToNode !== "undefined" &&
    webkitConvertPointFromPageToNode !== null
  ) {
    let node;
    if (includeLayer) {
      node = layer._element;
    } else {
      const parent = layer.parent || layer.context;
      node = parent._element;
    }
    point = Utils.point(
      webkitConvertPointFromPageToNode(node, new WebKitPoint(point.x, point.y))
    );
    const context = layer.context != null ? layer.context : layer;
    point = {
      x: point.x / context.scale,
      y: point.y / context.scale,
    };
    return point;
  }

  const containers = layer.containers(rootContext);
  containers.reverse();
  if (includeLayer) {
    containers.push(layer);
  }

  for (var container of Array.from(containers)) {
    if (container.matrix3d != null) {
      point = container.matrix3d.inverse().point(point);
    } else if (container.scale != null) {
      point = {
        x: point.x / container.scale,
        y: point.y / container.scale,
      };
    }
  }
  return point;
};

// convert a frame from the context level to a layer, with rootContext enabled you can make it start from the top context
Utils.convertFrameFromContext = function (
  frame,
  layer,
  rootContext,
  includeLayer
) {
  if (frame == null) {
    frame = {};
  }
  if (rootContext == null) {
    rootContext = false;
  }
  if (includeLayer == null) {
    includeLayer = true;
  }
  frame = _.defaults(frame, {
    x: 0,
    y: 0,
    width: Framer.Defaults.Layer.width,
    height: Framer.Defaults.Layer.height,
  });
  const corners = Utils.pointsFromFrame(frame);
  const convertedCorners = corners.map((point) =>
    Utils.convertPointFromContext(point, layer, rootContext, includeLayer)
  );
  return Utils.frameFromPoints(convertedCorners);
};

// convert a point from layerA to layerB via the context
Utils.convertPoint = function (input, layerA, layerB, rootContext) {
  // Convert a point between two layer coordinate systems
  if (rootContext == null) {
    rootContext = false;
  }
  let point = _.defaults(input, { x: 0, y: 0, z: 0 });
  if (layerA) {
    point = Utils.convertPointToContext(point, layerA, rootContext);
  }
  if (layerB != null) {
    return Utils.convertPointFromContext(point, layerB, rootContext);
  } else if (
    layerA != null &&
    rootContext &&
    typeof webkitConvertPointFromPageToNode !== "undefined" &&
    webkitConvertPointFromPageToNode !== null
  ) {
    const node = layerA.context._element;
    return Utils.point(
      webkitConvertPointFromPageToNode(node, new WebKitPoint(point.x, point.y))
    );
  } else {
    return point;
  }
};

// get the bounding frame of a layer, either at the canvas (rootcontext) or screen level
Utils.boundingFrame = function (layer, rootContext) {
  if (rootContext == null) {
    rootContext = true;
  }
  const frame = { x: 0, y: 0, width: layer.width, height: layer.height };
  const cornerPoints = Utils.pointsFromFrame(frame);
  const contextCornerPoints = cornerPoints.map((point) =>
    Utils.convertPointToContext(point, layer, rootContext)
  );
  const boundingFrame = Utils.frameFromPoints(contextCornerPoints);
  return Utils.pixelAlignedFrame(boundingFrame);
};

Utils.perspectiveProjectionMatrix = function (element) {
  const p = element.perspective;

  const m = Matrix.identity3d();
  if (p != null && p !== 0) {
    m.m34 = -1 / p;
  }
  return m;
};

// matrix of perspective projection with perspective origin applied
Utils.perspectiveMatrix = function (element) {
  const ox = element.perspectiveOriginX * element.width;
  const oy = element.perspectiveOriginY * element.height;
  const ppm = Utils.perspectiveProjectionMatrix(element);
  return Matrix.identity3d()
    .translate(ox, oy)
    .multiply(ppm)
    .translate(-ox, -oy);
};

//##################################################################
// Beta additions, use with care

Utils.globalLayers = function (importedLayers) {
  // Beta. Not sure if we should push this but it's nice to have.
  // Use this to make all layers in an imported set available on
  // on the top level, so without the "importedLayers" prefix.

  for (var layerName in importedLayers) {
    // Replace all whitespace in layer names
    var layer = importedLayers[layerName];
    layerName = layerName.replace(/\s/g, "");

    // Check if there are global variables with the same name
    if (
      window.hasOwnProperty(layerName) &&
      !window.Framer._globalWarningGiven
    ) {
      print(
        `Warning: Cannot make layer '${layerName}' a global, a variable with that name already exists`
      );
    } else {
      window[layerName] = layer;
    }
  }

  return (window.Framer._globalWarningGiven = true);
};

let _textSizeNode = null;

Utils.throwInStudioOrWarnInProduction = function (message) {
  if (Utils.isFramerStudio()) {
    throw new Error(message);
  }
  // else
  console.warn(message);
  return null;
};

Utils.getIdAttributesFromString = function (string) {
  let m;
  const regex = /id=['"]([^'"]+)["']/g;
  const matches = [];
  while ((m = regex.exec(string))) {
    var id = m[1];
    if (id != null) {
      matches.push(id);
    }
  }
  return matches;
};

Utils.getUniqueId = function (prefix) {
  if (prefix == null) {
    prefix = "id";
  }
  let id = prefix;
  let count = 1;
  let existingElement = document.querySelector(`[id='${id}']`);
  while (existingElement != null) {
    id = `${prefix}${count}`;
    existingElement = document.querySelector(`[id='${id}']`);
    count++;
  }
  return id;
};

export default Utils;

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined;
}
