import _ from "./Underscore.js";
import Utils from "./Utils.js";
import { Layer } from "./Layer.js";

const ChromeAlert = `Importing layers is currently only supported on Safari. 
For Chrome, run: open -a "Google Chrome" --allow-file-access-from-files`;

const resizeFrame = (scale, frame) => {
  if (scale === 1 || !frame) return frame;
  const result = {};
  ["x", "y", "width", "height"].forEach((key) => {
    if (frame.hasOwnProperty(key)) result[key] = frame[key] * scale;
  });
  return result;
};

const startsWithNumber = (str) => /^[0-9]/.test(str);

const sanitizeLayerName = (name) => {
  for (const suffix of ["*", "-", ".png", ".jpg", ".pdf"]) {
    if (name.toLowerCase().endsWith(suffix)) {
      name = name.slice(0, -suffix.length);
    }
  }
  return name;
};

export class Importer {
  constructor(path, options = {}, extraLayerProperties = {}) {
    this.path = path;
    this.options = options;
    this.extraLayerProperties = extraLayerProperties;
    this.scale = options.scale ?? 1;
    this.paths = {
      layerInfo: Utils.pathJoin(this.path, "layers.json"),
      images: Utils.pathJoin(this.path, "images"),
      documentName: decodeURIComponent(this.path.split("/").pop()),
    };
    this._createdLayers = [];
    this._createdLayersByName = {};
  }

  async load() {
    const layerInfo = await this._loadLayerInfo();
    if (!layerInfo || layerInfo.length === 0) {
      throw new Error("Importer: no layers. Ensure at least one layer exists.");
    }

    // Pass 1: create all layers recursively
    layerInfo.forEach((info) => this._createLayer(info));

    // Pass 2: correct hierarchy and positions
    this._createdLayers.forEach((layer) => this._correctLayer(layer));
    this._correctArtboards(this._createdLayers);

    // Pass 3: ensure all layers are inserted
    this._createdLayers.forEach((layer) => {
      if (!layer.parent) layer.parent = null;
    });

    return this._createdLayersByName;
  }

  async _loadLayerInfo() {
    try {
      // Check preloaded global variable
      const importedKey = `${this.paths.documentName}/layers.json.js`;
      if (window.__imported__?.[importedKey]) {
        return _.cloneDeep(window.__imported__[importedKey]);
      }

      // Load JSON asynchronously
      const response = await fetch(this.paths.layerInfo);
      if (!response.ok)
        throw new Error(`Failed to load layers: ${response.statusText}`);
      return await response.json();
    } catch (err) {
      console.warn(ChromeAlert);
      throw err;
    }
  }

  _createLayer(info, parent) {
    // Scale frames
    if (info.layerFrame)
      info.layerFrame = resizeFrame(this.scale, info.layerFrame);
    if (info.maskFrame)
      info.maskFrame = resizeFrame(this.scale, info.maskFrame);
    if (info.image?.frame)
      info.image.frame = resizeFrame(this.scale, info.image.frame);

    if (!info.children) info.children = [];

    const LayerClass = Layer;
    const layerInfo = {
      shadow: true,
      name: sanitizeLayerName(info.name),
      frame: info.layerFrame,
      clip: false,
      backgroundColor: null,
      visible: info.visible ?? true,
      ...this.extraLayerProperties,
    };

    if (info.image) {
      layerInfo.frame = info.image.frame;
      layerInfo.image = Utils.pathJoin(this.path, info.image.path);
    }

    if (info.maskFrame) layerInfo.clip = true;
    if (info.kind === "artboard")
      layerInfo.backgroundColor = info.backgroundColor;

    if (parent?.contentLayer) layerInfo.parent = parent.contentLayer;
    else if (parent) layerInfo.parent = parent;

    if (startsWithNumber(layerInfo.name)) {
      throw new Error(
        `Layer/Artboard names cannot start with a number: '${layerInfo.name}'`
      );
    }

    const layer = new LayerClass(layerInfo);
    layer.name = layerInfo.name;
    layer.__framerImportedFromPath = this.path;

    if (layerInfo.name.toLowerCase().includes("scroll")) layer.scroll = true;
    if (layerInfo.name.toLowerCase().includes("draggable"))
      layer.draggable.enabled = true;

    if (!layer.image && !info.children.length && !info.maskFrame) {
      layer.frame = Utils.frameZero();
    }

    [...info.children]
      .reverse()
      .forEach((childInfo) => this._createLayer(childInfo, layer));

    if (info.kind === "artboard") layer.point = { x: 0, y: 0 };
    else if (!layer.image && !info.maskFrame)
      layer.frame = layer.contentFrame();

    layer._info = info;
    this._createdLayers.push(layer);
    this._createdLayersByName[layer.name] = layer;

    return layer;
  }

  _correctArtboards(layers) {
    const artboards = layers.filter((l) => l._info.kind === "artboard");
    if (!artboards.length) return;

    const leftMostLayer = artboards.reduce(
      (left, layer) => (!left || layer.x < left.x ? layer : left),
      null
    );
    const offset = leftMostLayer.point;

    artboards.forEach((layer) => {
      layer.x -= offset.x;
      layer.y -= offset.y;
      layer.visible = true;
    });
  }

  _correctLayer(layer) {
    const traverse = (l) => {
      if (l.parent) l.frame = Utils.convertPoint(l.frame, null, l.parent);
      l.children.forEach(traverse);
    };
    if (!layer.parent) traverse(layer);
  }
}

// Static helper
Importer.load = async function (path, scale = 1) {
  const importer = new Importer(path, { scale });
  return await importer.load();
};
