import _ from "./Underscore.js";
import { Color } from "./Color.js";

export class SVG {
  static validFill(value) {
    return Color.validColorValue(value) || _.startsWith(value, "url(");
  }

  static toFill(value) {
    if (_.startsWith(value, "url(")) {
      return value;
    } else {
      return Color.toColor(value);
    }
  }

  static updateGradientSVG(svgLayer) {
    if (svgLayer.__constructor) {
      return;
    }
    if (!Gradient.isGradient(svgLayer.gradient)) {
      if (svgLayer._elementGradientSVG != null) {
        svgLayer._elementGradientSVG.innerHTML = "";
      }
      return;
    }

    if (!svgLayer._elementGradientSVG) {
      svgLayer._elementGradientSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgLayer._element.appendChild(svgLayer._elementGradientSVG);
    }

    const id = `gradient-${svgLayer.id}`;
    svgLayer._elementGradientSVG.innerHTML = `\
<linearGradient id='${id}' gradientTransform='rotate(${
      svgLayer.gradient.angle - 90
    }, 0.5, 0.5)' >
	<stop offset="0" stop-color='#${svgLayer.gradient.start.toHex()}' stop-opacity='${
      svgLayer.gradient.start.a
    }' />
	<stop offset="1" stop-color='#${svgLayer.gradient.end.toHex()}' stop-opacity='${
      svgLayer.gradient.end.a
    }' />
</linearGradient>\
`;
    return (svgLayer.fill = `url(#${id})`);
  }

  static updateImagePatternSVG(svgLayer) {
    if (svgLayer.__constructor) {
      return;
    }

    if (!svgLayer.image) {
      if (svgLayer._elementImagePatternSVG != null) {
        svgLayer._elementImagePatternSVG.innerHTML = "";
      }
      return;
    }

    let transform = "";

    if (
      ["fill", "fit", "contain", "cover"].includes(svgLayer.backgroundSize) &&
      svgLayer.imageSize
    ) {
      let scaleX = 1;
      let scaleY = 1;
      let offsetX = 0;
      let offsetY = 0;

      const imageWidth = svgLayer.imageSize.width;
      const imageHeight = svgLayer.imageSize.height;

      const imageRatio = imageWidth / imageHeight;
      const realWidth = svgLayer.height * imageRatio;
      const realHeight = svgLayer.width / imageRatio;
      const validScaleX = realWidth / svgLayer.width;
      const validScaleY = realHeight / svgLayer.height;

      const fillBackground = ["fill", "cover"].includes(
        svgLayer.backgroundSize
      );

      if (
        (fillBackground && validScaleY > validScaleX) ||
        (!fillBackground && validScaleY < validScaleX)
      ) {
        scaleY = validScaleY;
        offsetY = (1 - validScaleY) / 2;
      } else {
        scaleX = validScaleX;
        offsetX = (1 - validScaleX) / 2;
      }

      transform = `transform="translate(${offsetX}, ${offsetY}) scale(${scaleX}, ${scaleY})" `;
    }

    if (!svgLayer._elementImagePatternSVG) {
      svgLayer._elementImagePatternSVG = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgLayer._elementImagePatternSVG.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
      );
      svgLayer._elementImagePatternSVG.setAttribute(
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink"
      );
      svgLayer._elementImagePatternSVG.setAttribute("width", "100%");
      svgLayer._elementImagePatternSVG.setAttribute("height", "100%");
      svgLayer._element.appendChild(svgLayer._elementImagePatternSVG);
    }

    const id = `image-pattern-${svgLayer.id}`;
    svgLayer._elementImagePatternSVG.innerHTML = `\
<pattern id="${id}" width="100%" height="100%" patternContentUnits="objectBoundingBox">
	<image width="1" height="1" xlink:href=${svgLayer.image} preserveAspectRatio="none" ${transform} />
</pattern>\
`;
    return window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => (svgLayer.fill = `url(#${id})`))
    );
  }
  // Utils.delay 0.1, -> svgLayer.fill = "url(##{id})"

  static constructSVGElements(root, elements, PathClass, GroupClass) {
    const targets = {};
    let children = [];

    if (elements != null) {
      for (var element of Array.from(elements)) {
        if (!(element instanceof SVGElement)) {
          // Children can contain text nodes
          continue;
        }
        var name = element.getAttribute("name");
        if (name == null) {
          if (element instanceof SVGGElement) {
            var defsResult = this.constructSVGElements(
              root,
              element.childNodes,
              PathClass,
              GroupClass
            );
            _.extend(targets, defsResult.targets);
            children = children.concat(defsResult.children);
            continue;
          }
          continue;
        }

        var options = {};
        options.name = name;
        options.parent = root;

        if (element instanceof SVGGElement) {
          var group = new GroupClass(element, options);
          children.push(group);
          _.extend(targets, group.elements);
          if (element.id != null && element.id !== "") {
            targets[element.id] = group;
          }
          continue;
        }
        if (
          element instanceof SVGPathElement ||
          element instanceof SVGUseElement
        ) {
          var path = new PathClass(element, options);
          children.push(path);
          if (path._path.id != null && path._path.id !== "") {
            var { id } = path._path;
            targets[id] = path;
          }
          continue;
        }
      }
    }
    return { targets, children };
  }

  static isPath(path) {
    return path instanceof Framer.SVGPath;
  }
}
