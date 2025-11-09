import Utils from "../Utils";
import { BaseClass } from "../BaseClass";
import { Context } from "../Context";
import { Layer } from "../Layer";

let errorDisplay = null;

const Config = Utils.isMobile()
  ? { height: 100, textInset: 20, fontSize: 32 }
  : { height: 40, textInset: 12, fontSize: 14 };

export default class ErrorDisplay extends BaseClass {
  _context = null;
  _errorLayer = null;

  constructor() {
    super();
    this.resize = this.resize.bind(this);

    this._context ??= new Context({ name: "ErrorDisplay" });
    this._context.index = 1000;

    this._context.run(() => {
      Events.wrap(window).addEventListener("error", (e) =>
        this.showError(e.message)
      );
      Events.wrap(window).addEventListener("resize", this.resize);
    });
  }

  createLayer() {
    if (this._errorLayer) return this._errorLayer;

    this._context.run(() => {
      const error = new Layer({
        name: "error",
        y: Align.bottom,
        width: Canvas.width,
        height: Config.height,
        backgroundColor: "rgba(255, 0, 0, 1)",
      });

      error.text = new Layer({
        name: "text",
        parent: error,
        size: Utils.frameInset(error, Config.textInset),
        point: Align.center,
        backgroundColor: null,
        clip: true,
      });

      error.text.style = {
        font: `${Config.fontSize}px/1em ${Utils.deviceFont()}`,
        lineHeight: `${parseInt(error.text.height - 2)}px`,
        textAlign: "center",
        wordWrap: "break-word",
        textOverflow: "ellipsis",
      };

      error.onTap(() => {
        this._errorLayer?.destroy();
        this._errorLayer = null;
      });

      this._errorLayer = error;
      this.resize();
    });

    return this._errorLayer;
  }

  resize() {
    if (!this._errorLayer) return;

    this._errorLayer.width = Canvas.width;
    this._errorLayer.y = Canvas.height - this._errorLayer.height;
    this._errorLayer.text.size = Utils.frameInset(
      this._errorLayer,
      Config.textInset
    );
    this._errorLayer.text.point = Align.center;
  }

  showError(message) {
    const error = this.createLayer();
    error.scale = 1.1;
    error.text.html = message;

    return error.animate({
      scale: 1,
      options: {
        curve: "spring(800, 55, 10)",
      },
    });
  }

  destroy() {
    this._context?.destroy();
  }
}

export const enable = () => {
  if (errorDisplay) return;
  errorDisplay = new ErrorDisplay();
};

export const disable = () => {
  if (!errorDisplay) return;
  errorDisplay.destroy();
  errorDisplay = null;
};
