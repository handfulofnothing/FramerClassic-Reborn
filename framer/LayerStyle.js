const filterFormat = function (name, value, unit, pixelMultiplier) {
  if (unit === "px") {
    value *= pixelMultiplier;
  }
  return `${name}(${Utils.round(value, 2)}${unit})`;
};
// "#{value}#{unit}"

const roundToZero = function (num) {
  if (-1e-6 < num && num < 1e-6) {
    return 0;
  }
  return num;
};

// TODO: Ideally these should be read out from the layer defined properties
const _WebkitProperties = [
  ["blur", "blur", 0, "px"],
  ["brightness", "brightness", 100, "%"],
  ["saturate", "saturate", 100, "%"],
  ["hue-rotate", "hueRotate", 0, "deg"],
  ["contrast", "contrast", 100, "%"],
  ["invert", "invert", 0, "%"],
  ["grayscale", "grayscale", 0, "%"],
  ["sepia", "sepia", 0, "%"],
];

const _BackdropProperties = [
  ["blur", "backgroundBlur", 0, "px"],
  ["brightness", "backgroundBrightness", 100, "%"],
  ["saturate", "backgroundSaturate", 100, "%"],
  ["hue-rotate", "backgroundHueRotate", 0, "deg"],
  ["contrast", "backgroundContrast", 100, "%"],
  ["invert", "backgroundInvert", 0, "%"],
  ["grayscale", "backgroundGrayscale", 0, "%"],
  ["sepia", "backgroundSepia", 0, "%"],
];

const _Force2DProperties = {
  z: 0,
  scaleZ: 1,
  skewX: 0,
  skewY: 0,
  rotationX: 0,
  rotationY: 0,
};

const getShadowStrings = function (layer, types, createString) {
  if (!_.isArray(types)) {
    types = [types];
  }
  const result = [];
  if (layer.shadows != null) {
    for (var shadow of Array.from(layer.shadows)) {
      if (shadow === null) {
        continue;
      }
      shadow = _.defaults(_.clone(shadow), Framer.Defaults.Shadow);
      if (shadow.type === "inner") {
        shadow.type = "inset";
      } else if (shadow.type === "outer") {
        if (layer.image != null && layer.image !== "") {
          shadow.type = "drop";
        } else {
          shadow.type = "box";
        }
      }
      if (
        !Array.from(types).includes(shadow.type) ||
        (shadow.x === 0 &&
          shadow.y === 0 &&
          shadow.blur === 0 &&
          shadow.spread === 0)
      ) {
        continue;
      }
      if (shadow.color === null) {
        shadow.color = new Color(null);
      }
      var dpr =
        layer._pixelMultiplierOverride != null
          ? layer._pixelMultiplierOverride
          : layer.context.pixelMultiplier;
      var shadowString = createString(shadow, dpr);
      result.push(shadowString);
    }
  }
  return result;
};

export const LayerStyle = {
  width(layer) {
    layer._updateHTMLScale();
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    return layer._properties.width * dpr + "px";
  },

  height(layer) {
    layer._updateHTMLScale();
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    return layer._properties.height * dpr + "px";
  },

  display(layer) {
    if (layer._properties.visible === true) {
      return "block";
    }
    return "none";
  },

  opacity(layer) {
    return layer._properties.opacity;
  },

  webkitTransformStyle(layer) {
    if (layer._properties.flat) {
      return "flat";
    } else {
      return "preserve-3d";
    }
  },

  webkitBackfaceVisibility(layer) {
    if (layer._properties.backfaceVisible) {
      return "visible";
    } else {
      return "hidden";
    }
  },

  overflow(layer) {
    if (
      layer._properties.scrollHorizontal === true ||
      layer._properties.scrollVertical === true
    ) {
      return "auto";
    }
    if (layer._properties.clip === true) {
      return "hidden";
    }
    return "visible";
  },

  overflowX(layer) {
    if (layer._properties.scrollHorizontal === true) {
      return "scroll";
    }
    if (layer._properties.clip === true) {
      return "hidden";
    }
    return "visible";
  },

  overflowY(layer) {
    if (layer._properties.scrollVertical === true) {
      return "scroll";
    }
    if (layer._properties.clip === true) {
      return "hidden";
    }
    return "visible";
  },

  zIndex(layer) {
    return layer._properties.index;
  },

  webkitFilter(layer) {
    // This is mostly an optimization for Chrome. If you pass in the Webkit filters
    // with the defaults, it still takes a shitty rendering path. So I compare them
    // first and only add the ones that have a non default value.

    let css = [];
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    for (var [cssName, layerPropertyName, fallback, unit] of Array.from(
      _WebkitProperties
    )) {
      if (
        layer._properties.hasOwnProperty(layerPropertyName) &&
        layer[layerPropertyName] !== fallback
      ) {
        var filter = filterFormat(cssName, layer[layerPropertyName], unit, dpr);
        css.push(filter);
      }
    }

    // filter shadow
    const shadowStrings = getShadowStrings(
      layer,
      "drop",
      (shadow, pixelMultiplier) =>
        `drop-shadow(${shadow.x * pixelMultiplier}px ${
          shadow.y * pixelMultiplier
        }px ${shadow.blur * pixelMultiplier}px ${shadow.color})`
    );

    css = css.concat(shadowStrings);
    return css.join(" ");
  },

  webkitBackdropFilter(layer) {
    const css = [];
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    for (var [cssName, layerPropertyName, fallback, unit] of Array.from(
      _BackdropProperties
    )) {
      if (
        layer._properties.hasOwnProperty(layerPropertyName) &&
        layer[layerPropertyName] !== fallback
      ) {
        var filter = filterFormat(cssName, layer[layerPropertyName], unit, dpr);
        css.push(filter);
      }
    }

    return css.join(" ");
  },

  webkitTransform(layer) {
    // We have a special rendering path for layers that prefer 2d rendering.
    // This definitely decreases performance, but is handy in complex drawing
    // scenarios with rounded corners and shadows where gpu drawing gets weird
    // results.

    if (layer._prefer2d || layer._properties.force2d) {
      return exports.LayerStyle.webkitTransformForce2d(layer);
    }
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    return `\
translate3d( \
${roundToZero(layer._properties.x * dpr)}px, \
${roundToZero(layer._properties.y * dpr)}px, \
${roundToZero(layer._properties.z * dpr)}px) \
scale3d( \
${roundToZero(layer._properties.scaleX * layer._properties.scale)}, \
${roundToZero(layer._properties.scaleY * layer._properties.scale)}, \
${roundToZero(layer._properties.scaleZ)}) \
skew(${roundToZero(layer._properties.skew)}deg,${roundToZero(
      layer._properties.skew
    )}deg) \
skewX(${roundToZero(layer._properties.skewX)}deg) \
skewY(${roundToZero(layer._properties.skewY)}deg) \
translateZ(${roundToZero(layer._properties.originZ * dpr)}px) \
rotateX(${roundToZero(layer._properties.rotationX)}deg) \
rotateY(${roundToZero(layer._properties.rotationY)}deg) \
rotateZ(${roundToZero(layer._properties.rotationZ)}deg) \
translateZ(${roundToZero(-layer._properties.originZ * dpr)}px)\
`;
  },

  webkitTransformForce2d(layer) {
    // This detects if we use 3d properties, if we don't it only uses
    // 2d properties to disable gpu rendering.

    const css = [];

    for (var p in _Force2DProperties) {
      var v = _Force2DProperties[p];
      if (layer._properties[p] !== v) {
        console.warn(
          `Layer property '${p}'' will be ignored with force2d enabled`
        );
      }
    }

    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    css.push(
      `translate(${roundToZero(layer._properties.x * dpr)}px,${roundToZero(
        layer._properties.y * dpr
      )}px)`
    );
    css.push(
      `scale(${roundToZero(
        layer._properties.scaleX * layer._properties.scale
      )},	${roundToZero(layer._properties.scaleY * layer._properties.scale)})`
    );
    css.push(
      `skew(${roundToZero(layer._properties.skew)}deg,${roundToZero(
        layer._properties.skew
      )}deg)`
    );
    css.push(`rotate(${roundToZero(layer._properties.rotationZ)}deg)`);

    return css.join(" ");
  },

  webkitTransformOrigin(layer) {
    return `${layer._properties.originX * 100}% ${
      layer._properties.originY * 100
    }%`;
  },

  webkitPerspective(layer) {
    let left;
    const value =
      (left = Utils.webkitPerspectiveForValue(layer._properties.perspective)) !=
      null
        ? left
        : "";
    if (_.isNumber(value)) {
      const dpr =
        layer._pixelMultiplierOverride != null
          ? layer._pixelMultiplierOverride
          : layer.context.pixelMultiplier;
      return `${value * dpr}`;
    } else {
      return value;
    }
  },

  webkitPerspectiveOrigin(layer) {
    return `${layer._properties.perspectiveOriginX * 100}% ${
      layer._properties.perspectiveOriginY * 100
    }%`;
  },

  mixBlendMode(layer) {
    let needle;
    if (
      ((needle = layer._properties.blending),
      Array.from(_.values(Blending)).includes(needle))
    ) {
      return layer._properties.blending;
    } else {
      return "";
    }
  },

  pointerEvents(layer) {
    if (layer._properties.ignoreEvents) {
      return "none";
    } else {
      return "auto";
    }
  },

  boxShadow(layer) {
    const shadowStrings = getShadowStrings(
      layer,
      ["box", "inset"],
      function (shadow, pixelMultiplier) {
        const insetString = shadow.type === "inset" ? "inset " : "";
        return `${insetString}${shadow.x * pixelMultiplier}px ${
          shadow.y * pixelMultiplier
        }px ${shadow.blur * pixelMultiplier}px ${
          shadow.spread * pixelMultiplier
        }px ${shadow.color}`;
      }
    );

    return shadowStrings.join(", ");
  },

  textShadow(layer) {
    const shadowStrings = getShadowStrings(
      layer,
      "text",
      (shadow, pixelMultiplier) =>
        `${shadow.x * pixelMultiplier}px ${shadow.y * pixelMultiplier}px ${
          shadow.blur * pixelMultiplier
        }px ${shadow.color}`
    );
    return shadowStrings.join(", ");
  },

  backgroundColor(layer) {
    return layer._properties.backgroundColor;
  },

  backgroundSize(layer) {
    switch (layer._properties.backgroundSize) {
      case "fill":
        return "cover";
        break;
      case "fit":
        return "contain";
        break;
      case "stretch":
        return "100% 100%";
        break;
    }
    return layer._properties.backgroundSize;
  },

  fill(layer) {
    return layer._properties.fill;
  },

  strokeWidth(layer) {
    const factor =
      layer.strokeWidthMultiplier != null ? layer.strokeWidthMultiplier : 1;
    return layer._properties.strokeWidth * factor;
  },

  strokeDasharray(layer) {
    return layer._properties.strokeDasharray.join(",");
  },

  color(layer) {
    return layer._properties.color;
  },

  borderRadius(layer) {
    const radius = layer._properties.borderRadius;
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;

    if (_.isNumber(radius)) {
      return radius * dpr + "px";
    }

    if (_.isObject(layer._properties.borderRadius)) {
      return (
        (radius.topLeft != null ? radius.topLeft : 0) * dpr +
        "px " +
        (radius.topRight != null ? radius.topRight : 0) * dpr +
        "px " +
        (radius.bottomRight != null ? radius.bottomRight : 0) * dpr +
        "px " +
        (radius.bottomLeft != null ? radius.bottomLeft : 0) * dpr +
        "px"
      );
    }

    // Custom values like strings are still allowed for compatibility reasons
    return layer._properties.borderRadius;
  },

  borderWidth(layer) {
    let left;
    const { borderWidth } = layer._properties;
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;

    if (_.isNumber(borderWidth)) {
      let left1;
      const borderTopBottom =
        ((left = Math.min(borderWidth, layer.height / 2)) != null ? left : 0) *
        dpr;
      const borderRightLeft =
        ((left1 = Math.min(borderWidth, layer.width / 2)) != null ? left1 : 0) *
        dpr;
      return (
        borderTopBottom +
        "px " +
        borderRightLeft +
        "px " +
        borderTopBottom +
        "px " +
        borderRightLeft +
        "px"
      );
    }

    if (_.isObject(borderWidth)) {
      let borderTop = borderWidth.top != null ? borderWidth.top : 0;
      let borderBottom = borderWidth.bottom != null ? borderWidth.bottom : 0;
      let borderLeft = borderWidth.left != null ? borderWidth.left : 0;
      let borderRight = borderWidth.right != null ? borderWidth.right : 0;

      if (borderTop + borderBottom > layer.height) {
        const topRatio = borderTop / (borderTop + borderBottom);
        borderTop = Math.round(topRatio * layer.height);
        borderBottom = layer.height - borderTop;
      }

      if (borderLeft + borderRight > layer.width) {
        const leftRatio = borderLeft / (borderLeft + borderRight);
        borderLeft = Math.round(leftRatio * layer.width);
        borderRight = layer.width - borderLeft;
      }

      return (
        borderTop * dpr +
        "px " +
        borderRight * dpr +
        "px " +
        borderBottom * dpr +
        "px " +
        borderLeft * dpr +
        "px"
      );
    }

    return borderWidth;
  },

  fontSize(layer) {
    return layer._properties.fontSize + "px";
  },

  letterSpacing(layer) {
    return layer._properties.letterSpacing + "px";
  },

  wordSpacing(layer) {
    return layer._properties.wordSpacing + "px";
  },

  textIndent(layer) {
    return layer._properties.textIndent + "px";
  },

  textAlign(layer) {
    const value = layer._properties.textAlign;
    if (value === Align.left) {
      return "left";
    }
    if (value === Align.center) {
      return "center";
    }
    if (value === Align.right) {
      return "right";
    } else {
      return value;
    }
  },

  direction(layer) {
    const value = layer._properties.direction;
    switch (value) {
      case "right-to-left":
        return "rtl";
      case "left-to-right":
        return "ltr";
      default:
        return value;
    }
  },

  padding(layer) {
    const padding = Utils.rectZero(Utils.parseRect(layer.padding));
    const dpr =
      layer._pixelMultiplierOverride != null
        ? layer._pixelMultiplierOverride
        : layer.context.pixelMultiplier;
    return `${padding.top * dpr}px ${padding.right * dpr}px ${
      padding.bottom * dpr
    }px ${padding.left * dpr}px`;
  },
};
