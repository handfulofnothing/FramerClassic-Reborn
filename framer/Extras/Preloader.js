import { _ } from "../Underscore.js";
import { BaseClass } from "../BaseClass.js";
import { Context } from "../Context.js";
import { Layer } from "../Layer.js";
import { Gradient } from "../Gradient.js";
import { Color } from "../Color.js";
import { Align } from "../Align.js";
import { Canvas } from "../Canvas.js";
import { Events } from "../Events.js";
import { CircularProgressComponent } from "../Components/CircularProgressComponent.js";
import Utils from "../Utils.js";

class Preloader extends BaseClass {
  static initClass() {
    this.define("progress", {
      get() {
        return this._mediaLoaded.length / this._media.length || 0;
      },
    });

    this.define("time", {
      get() {
        return (Date.now() - this._startTime) / 1000;
      },
    });

    this.define("isLoading", {
      get() {
        return this._isLoading;
      },
    });

    this.define("isReady", {
      get() {
        if (!this.isLoading) {
          return false;
        }
        return this._mediaLoaded.length === this._media.length;
      },
    });
  }

  constructor(options) {
    super();
    this.setLogo = this.setLogo.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.start = this.start.bind(this);
    this._start = this._start.bind(this);
    this.end = this.end.bind(this);
    this._end = this._end.bind(this);
    this._handleProgress = this._handleProgress.bind(this);
    this._handleTimeout = this._handleTimeout.bind(this);
    this._setupContext = this._setupContext.bind(this);
    if (options == null) {
      options = {};
    }
    this._media = [];
    this._mediaLoaded = [];
    this._isLoading = false;

    this.timeout = 30;

    this.start();
  }

  setupContext() {
    this.context = new Context({ name: "Preloader" });
    return this.context.run(this._setupContext);
  }

  setLogo(url) {
    this._logo = url;
    // Set directly via style, to avoid inclusion in the preloader list
    if (this.brand) {
      return (this.brand.style["background-image"] = `url('${url}')`);
    }
  }

  addImagesFromContext(context) {
    return _.map(context.layers, "image").map(this.addImage);
  }

  addPlayersFromContext(context) {
    return _.map(context.layers, "player").map(this.addPlayer);
  }

  addImage(image) {
    if (image instanceof Gradient) {
      return;
    }
    if (image && !Array.from(this._media).includes(image)) {
      this._media.push(image);
      // We simply count failed images as loaded for now so that we avoid
      // being in some loading state forever.
      return Utils.loadImage(image, (error) => {
        this._mediaLoaded.push(image);
        return this._handleProgress();
      });
    }
  }

  addPlayer(player) {
    if (!player || Array.from(this._media).includes(player)) {
      return;
    }
    if (player.src == null || player.getAttribute("src") === "undefined") {
      return;
    }
    if (player.readyState == null || !(player.readyState < 3)) {
      return;
    }
    // … else
    this._media.push(player);
    // Wait until there is enough data for playback to start playing
    return Events.wrap(player).addEventListener("canplaythrough", () => {
      this._mediaLoaded.push(player);
      return this._handleProgress();
    });
  }

  start() {
    if (this.isLoading) {
      return;
    }

    this._isLoading = true;
    this._startTime = Date.now();

    this.emit("start");
    this.setupContext();

    // We need a little delay for the contexts to build up so we can
    // actually find the images in it.
    return Utils.delay(0.2, this._start);
  }

  _start() {
    // Another bit of delay to find out if the images are already cached
    // so we avoid a mini flickr of the progress indicator.
    Utils.delay(0.2, () => {
      this.progressIndicator.visible = true;
      return (this.brand.visible = true);
    });

    // By default we take the image from the prototype and the device
    this.addImagesFromContext(Framer.DefaultContext);
    this.addImagesFromContext(Framer.CurrentContext);
    this.addPlayersFromContext(Framer.DefaultContext);
    this.addPlayersFromContext(Framer.CurrentContext);

    // If we don't need any images to be preloaded we can stop
    if (!this._media.length) {
      return this.end();
    }

    // Make sure we always show the prototype after n seconds, even if not
    // all the images managed to load at all.
    return Utils.delay(this.timeout, this._handleTimeout);
  }

  end() {
    if (!this.isLoading) {
      return;
    }
    return this._end();
  }

  _end(animated) {
    if (animated == null) {
      animated = true;
    }
    Framer.DefaultContext.visible = true;

    const finalize = () => {
      this.emit("end");
      this._isLoading = false;
      return this.context != null ? this.context.destroy() : undefined;
    };

    if (
      (this.progressIndicator != null
        ? this.progressIndicator.visible
        : undefined) &&
      animated
    ) {
      if (this.cover != null) {
        this.cover.animate({
          properties: { opacity: 0 },
          time: 0.13,
        });
      }
      return this.cover.onAnimationDidEnd(finalize);
    } else {
      return finalize();
    }
  }

  _handleProgress() {
    this.emit("progress", this.progress);
    if (this.progressIndicator != null) {
      this.progressIndicator.setProgress(this.progress);
    }
    if (this.isReady) {
      return this._handleLoaded();
    }
  }

  _handleLoaded() {
    if (this.time > 0.5) {
      return Utils.delay(0.2, this.end);
    } else {
      return this.end();
    }
  }

  _handleTimeout() {
    if (!this.isLoading) {
      return;
    }
    console.warn("Preloader timeout, ending");
    return this.end();
  }

  _setupContext() {
    let layout;
    this.cover = new Layer({
      frame: Canvas,
      backgroundColor: "white",
    });

    this.progressIndicator = new CircularProgressComponent({
      size: 160,
      point: Align.center,
      parent: this.cover,
      visible: false,
    });

    this.progressIndicator.railsColor = Color.grey(0, 0.1);
    this.progressIndicator.progressColor = "rgb(75, 169, 248)";
    this.progressIndicator.setProgress(this.progress);

    this.brand = new Layer({
      size: 96,
      parent: this.cover,
      backgroundColor: null,
      visible: false,
      style: {
        backgroundSize: "50%",
      },
    });

    // We display it a tad larger on mobile
    if (Utils.isMobile()) {
      this.progressIndicator.scale = 1.25;
      this.brand.scale = 1.25;
    }

    if (this._logo) {
      this.setLogo(this._logo);
    } else {
      // Use the online logo, make sure we don't use the file:// protocol
      let logoUrl =
        "//resources.framerjs.com/static/images/preloader/framer-logo.png";
      if (_.startsWith(window.location.href, "file://")) {
        logoUrl = "http:" + logoUrl;
      }
      this.setLogo(logoUrl);
    }

    (layout = () => {
      this.cover.frame = Canvas;
      this.progressIndicator.point = Align.center;
      this.brand.x = Align.center;
      return (this.brand.y = Align.center(2));
    })();

    return Canvas.onResize(layout);
  }
}
Preloader.initClass();

export const enable = () => {
  return (Framer.Preloader ??= new Preloader());
};

export const disable = () => {
  Framer.Preloader?._end(false);
  Framer.Preloader = null;
};

export const addImage = (url) => {
  return Framer.Preloader?.addImage(url);
};

export const setLogo = (url) => {
  return Framer.Preloader?.setLogo(url);
};

export default Preloader;
