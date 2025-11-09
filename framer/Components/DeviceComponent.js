import Utils from "../Utils.js";
import _ from "../Underscore.js";

import { BaseClass } from "../BaseClass.js";
import { Layer } from "../Layer.js";
import { Defaults } from "../Defaults.js";
import { Events } from "../Events.js";

export const centerLayer = (layer, snapToPixels = false) => {
  const { frame } = layer;

  if (layer.parent) {
    Utils.frameSetMidX(
      frame,
      layer.parent.width / 2.0 - layer.parent.borderWidth
    );
    Utils.frameSetMidY(
      frame,
      layer.parent.height / 2.0 - layer.parent.borderWidth
    );
  } else {
    Utils.frameSetMidX(frame, layer._context.innerWidth / 2.0);
    Utils.frameSetMidY(frame, layer._context.innerHeight / 2.0);
  }

  if (snapToPixels) {
    frame.x = Math.round(frame.x);
    frame.y = Math.round(frame.y);
  }

  layer.frame = frame;
  return layer.frame;
};

export class DeviceComponent extends BaseClass {
  static initClass() {
    this.define("context", {
      get() {
        return this._context;
      },
    });

    //##########################################################################
    // FULLSCREEN

    this.define("fullScreen", {
      get() {
        return this._fullScreen;
      },
      set(fullScreen) {
        return this._setFullScreen(fullScreen);
      },
    });

    this.define("screenSize", {
      get() {
        let size;
        if (this._shouldRenderFullScreen()) {
          ({ size } = Canvas);
        } else if (this.isLandscape) {
          size = {
            width: this._device.screenHeight,
            height: this._device.screenWidth,
          };
        } else {
          size = {
            width: this._device.screenWidth,
            height: this._device.screenHeight,
          };
        }
        size.width /= this._context.devicePixelRatio;
        size.height /= this._context.devicePixelRatio;
        return size;
      },
    });

    this.define("deviceType", {
      get() {
        return this._deviceType;
      },
      set(deviceType) {
        if (deviceType === this._deviceType && deviceType !== "custom") {
          return;
        }

        let device = null;

        if (_.isString(deviceType)) {
          const lDevicetype = deviceType.toLowerCase();
          for (var key of Array.from(_.keys(Devices))) {
            var lKey = key.toLowerCase();
            if (lDevicetype === lKey) {
              device = Devices[key];
            }
          }
        }

        if (!device) {
          throw Error(
            `No device named ${deviceType}. Options are: ${_.keys(Devices)}`
          );
        }

        if (this._device === device) {
          return;
        }

        // If we switch from fullscreen to a device, we should zoom to fit
        const shouldZoomToFit = this._deviceType === "fullscreen";

        this.screen.backgroundColor = "black";
        if (device.backgroundColor != null) {
          this.screen.backgroundColor = device.backgroundColor;
        }

        if (device.deviceType === "computer") {
          Utils.domComplete(() => (document.body.style.cursor = "auto"));
        }

        this._device = _.clone(device);
        this._deviceType = deviceType;
        this.fullscreen = false;
        this._updateDeviceImage();
        this._updateMaskImage();
        this._update();
        this.emit("change:deviceType");

        this.viewport.point = this._viewportOrientationOffset();

        if (shouldZoomToFit) {
          return (this.deviceScale = "fit");
        }
      },
    });

    this.define("hideBezel", {
      get() {
        if (this._forceHideBezel) {
          return true;
        }
        if (!Utils.isFramerStudio() && this._forceHide) {
          return false;
        }
        return this._hideBezel != null ? this._hideBezel : false;
      },
      set(hideBezel) {
        if (!Utils.isFramerStudio()) {
          return;
        }
        this._hideBezel = hideBezel;
        return this._update();
      },
    });

    //##########################################################################
    // DEVICE ZOOM

    this.define("deviceScale", {
      get() {
        if (this._shouldRenderFullScreen()) {
          return 1;
        }
        return this._deviceScale || 1;
      },
      set(deviceScale) {
        return this.setDeviceScale(deviceScale, false);
      },
    });

    //##########################################################################
    // CONTENT SCALE

    this.define("contentScale", {
      get() {
        return this._contentScale || 1;
      },
      set(contentScale) {
        return this.setContentScale(contentScale, false);
      },
    });

    //##########################################################################
    // PHONE ORIENTATION

    this.define("orientation", {
      get() {
        if (Utils.isMobile()) {
          return window.orientation;
        }
        return this._orientation || 0;
      },

      set(orientation) {
        return this.setOrientation(orientation, false);
      },
    });

    this.define("isPortrait", {
      get() {
        return Math.abs(this.orientation) % 180 === 0;
      },
    });
    this.define("isLandscape", {
      get() {
        return !this.isPortrait;
      },
    });

    this.define("orientationName", {
      get() {
        if (this.isPortrait) {
          return "portrait";
        }
        if (this.isLandscape) {
          return "landscape";
        }
      },
      set(orientationName) {
        return this.setOrientation(orientationName, false);
      },
    });
  }

  constructor(options) {
    this._update = this._update.bind(this);
    this.customize = this.customize.bind(this);
    this._updateDeviceImage = this._updateDeviceImage.bind(this);
    this._updateMaskImage = this._updateMaskImage.bind(this);
    this.forceHideBezel = this.forceHideBezel.bind(this);
    this._viewportOrientationOffset =
      this._viewportOrientationOffset.bind(this);
    this._orientationChange = this._orientationChange.bind(this);
    if (options == null) {
      options = {};
    }
    let defaults = Defaults.getDefaults("DeviceComponent", options);

    // If we have defaults for DeviceView, we are likely using an older version of
    // Framer Studio. It's best to default to those then for now.
    if (Framer.Defaults.hasOwnProperty("DeviceView")) {
      defaults = _.extend(defaults, Framer.Defaults.DeviceView);
    }

    this._setup();

    this.animationOptions = defaults.animationOptions;
    this.deviceType = defaults.deviceType;

    _.extend(this, _.defaults(options, defaults));

    this.Type = {
      Tablet: "tablet",
      Phone: "phone",
      Computer: "computer",
    };
  }

  _setup() {
    if (this._setupDone) {
      return;
    }

    this._setupDone = true;

    this.background = new Layer();
    this.background.clip = true;
    this.background.backgroundColor = "transparent";
    this.background.classList.add("DeviceBackground");

    this.hands = new Layer({ name: "hands" });
    this.handsImageLayer = new Layer({
      parent: this.hands,
      name: "handsImage",
    });
    this.phone = new Layer({ parent: this.hands, name: "phone" });
    // This background is made slightly bigger than the screen to prevent the background shining through cracks
    this.screenBackground = new Layer({
      parent: this.hands,
      name: "screenBackground",
      backgroundColor: "black",
    });
    this.screen = new Layer({ parent: this.hands, name: "phone" });
    this.viewport = new Layer({ parent: this.screen, name: "screen" });
    this.content = new Layer({ parent: this.viewport, name: "viewport" });
    this.screenMask = new Layer({
      parent: this.screen,
      name: "mask",
      backgroundColor: null,
    });

    this.content.classList.add("DeviceContent");

    this.hands.backgroundColor = "transparent";
    this.hands._alwaysUseImageCache = true;
    this.handsImageLayer.backgroundColor = "transparent";
    this.hands.classList.add("DeviceHands");

    this.phone.backgroundColor = "transparent";
    this.phone.classList.add("DevicePhone");

    this.screen.classList.add("DeviceScreen");
    this.screen.clip = true;

    this.viewport.backgroundColor = "transparent";
    this.viewport.classList.add("DeviceComponentPort");

    this.content.backgroundColor = "transparent";
    this.content.classList.add("DeviceContent");

    this.content.originX = 0;
    this.content.originY = 0;

    if (!Utils.isMobile()) {
      Framer.CurrentContext.domEventManager
        .wrap(window)
        .addEventListener("resize", this._update);
    }
    if (Utils.isMobile()) {
      Framer.CurrentContext.domEventManager
        .wrap(window)
        .addEventListener("resize", this._orientationChange);
    }

    // This avoids rubber banding on mobile
    for (var layer of [
      this.background,
      this.phone,
      this.viewport,
      this.content,
      this.screen,
      this.screenMask,
    ]) {
      layer.on("touchmove", (event) => event.preventDefault());
    }

    this.screenMask.ignoreEvents = true;
    this.phone.ignoreEvents = true;

    this._context = new Framer.Context({
      parent: this.content,
      name: "DeviceScreen",
    });
    this._context.perspective = 1200;
    this._context.device = this;
    return this.on("change:orientation", function () {
      if (Screen.size !== Screen.height) {
        return Screen.emit("resize");
      }
    });
  }

  _update() {
    // Todo: pixel align at zoom level 1, 0.5

    let height, width;
    let contentScaleFactor = this.contentScale;
    if (contentScaleFactor > 1) {
      contentScaleFactor = 1;
    }
    let screenSizeChanged = false;
    if (this._shouldRenderFullScreen()) {
      const { clientWidth } = document.documentElement;
      const { clientHeight } = document.documentElement;
      if (Utils.isMobile()) {
        // This uses the actual screen size, which only make sense if the prototype
        // takes up the whole screen of the device
        width = screen.width * window.devicePixelRatio;
        height = screen.height * window.devicePixelRatio;
        // If the width and height don't match up with the client width and height
        // the device is rotated, so flip them
        if (
          (clientWidth < clientHeight && width > height) ||
          (clientWidth > clientHeight && width < height)
        ) {
          const newHeight = width;
          width = height;
          height = newHeight;
        }
      } else {
        width = clientWidth / contentScaleFactor;
        height = clientHeight / contentScaleFactor;
      }
      screenSizeChanged =
        this.content.width !== width || this.content.height !== height;
      for (var layer of [
        this.background,
        this.hands,
        this.phone,
        this.viewport,
        this.content,
        this.screen,
        this.screenMask,
      ]) {
        layer.x = layer.y = 0;
        layer.width = width;
        layer.height = height;
        layer.scale = 1;
      }

      this.content.scale = contentScaleFactor;
      if (this.deviceType !== "fullscreen" || Utils.isMobile()) {
        screenSizeChanged =
          screenSizeChanged ||
          this._context.devicePixelRatio !== window.devicePixelRatio;
        this._context.devicePixelRatio = window.devicePixelRatio;
      }
      this.screenBackground.visible = this.deviceType !== "fullscreen";

      if (Utils.isMobile()) {
        this.screenMask.visible = false;
      } else {
        this._updateMaskImage();
      }
    } else {
      const backgroundOverlap = 100;

      this.background.x = 0 - backgroundOverlap;
      this.background.y = 0 - backgroundOverlap;
      this.background.width = window.innerWidth + 2 * backgroundOverlap;
      this.background.height = window.innerHeight + 2 * backgroundOverlap;
      if (this.disableSizeUpdates) {
        return;
      }
      this._updateDeviceImage();
      this._updateMaskImage();
      this.screenMask.visible = this.hideBezel;
      this.hands.scale = this._calculatePhoneScale();
      centerLayer(this.hands, true);
      centerLayer(this.phone);

      [width, height] = Array.from(
        this._getOrientationDimensions(
          this._device.screenWidth / contentScaleFactor,
          this._device.screenHeight / contentScaleFactor
        )
      );

      this.screenMask.width =
        this.screen.width =
        this.viewport.width =
          this._device.screenWidth;
      this.screenMask.height =
        this.screen.height =
        this.viewport.height =
          this._device.screenHeight;
      screenSizeChanged =
        this.content.width !== width || this.content.height !== height;
      this.content.width = width;
      this.content.height = height;
      this.screenBackground.width = this.screen.width + 40;
      this.screenBackground.height = this.screen.height + 40;
      if (this.selectedHand && this._orientation === 0) {
        this.setHand(this.selectedHand);
      }
      centerLayer(this.screenBackground, true);
      centerLayer(this.screen, true);
      centerLayer(this.screenMask, true);

      const pixelRatio =
        this._device.devicePixelRatio != null
          ? this._device.devicePixelRatio
          : 1;
      screenSizeChanged =
        screenSizeChanged || this._context.devicePixelRatio !== pixelRatio;
      this._context.devicePixelRatio = pixelRatio;
      if (window.devicePixelRatio === pixelRatio && Utils.isDesktop()) {
        // On desktop rendering natively without scaling looks better, so do that
        this._context.renderUsingNativePixelRatio = true;
        this.content.scale = pixelRatio;
      } else {
        this._context.renderUsingNativePixelRatio = false;
        this.content.scale = 1;
      }
    }

    if (screenSizeChanged) {
      return Screen.emit("resize");
    }
  }

  _shouldRenderFullScreen() {
    if (!this._device) {
      return true;
    }

    if (this.fullScreen === true) {
      return true;
    }

    if (this.deviceType === "fullscreen") {
      return true;
    }

    if (Utils.isInsideIframe()) {
      return false;
    }

    if (
      Utils.deviceType() === "phone" &&
      Utils.deviceType() === this._device.deviceType
    ) {
      return true;
    }

    if (
      Utils.deviceType() === "tablet" &&
      Utils.deviceType() === this._device.deviceType
    ) {
      return true;
    }

    if (
      Utils.deviceType() === "phone" &&
      this._device.deviceType === "tablet"
    ) {
      return true;
    }

    return false;
  }

  setupContext() {
    // Sets this device up as the default context so everything renders
    // into the device screen
    return (Framer.CurrentContext = this._context);
  }

  platform() {
    if (/google|nexus|htc|samsung|sony-smartwatch/.test(this.deviceType)) {
      return "Android";
    }
    if (/iphone|ipad/.test(this.deviceType)) {
      return "iOS";
    }
    if (/apple-watch|applewatch/.test(this.deviceType)) {
      return "watchOS";
    }
    if (/apple|safari/.test(this.deviceType)) {
      return "macOS";
    }
    if (/microsoft|dell/.test(this.deviceType)) {
      return "Windows";
    }
    return null;
  }

  _setFullScreen(fullScreen) {
    if (this._deviceType === "fullscreen") {
      return;
    }

    if (!_.isBoolean(fullScreen)) {
      return;
    }

    if (fullScreen === this._fullScreen) {
      return;
    }

    this._fullScreen = fullScreen;

    if (fullScreen === true) {
      this.phone.image = "";
      this.hands.image = "";
    } else {
      this._updateDeviceImage();
    }
    this._updateMaskImage();

    this._update();
    return this.emit("change:fullScreen");
  }

  //##########################################################################
  // DEVICE TYPE

  customize(deviceProps) {
    Devices.custom = _.defaults(deviceProps, Devices.custom);
    this.deviceType = "custom";
    return this._update();
  }

  _updateDeviceImage() {
    if (/PhantomJS/.test(navigator.userAgent)) {
      return;
    }

    if (this._shouldRenderFullScreen() || this.hideBezel) {
      this.phone.image = "";
      return (this.hands.image = "");
    } else if (!this._deviceImageUrl(this._deviceImageName())) {
      return (this.phone.image = "");
    } else {
      this.phone._alwaysUseImageCache = true;
      this.phone.image = this._deviceImageUrl(this._deviceImageName());
      this.phone.width = this._device.deviceImageWidth;
      this.phone.height = this._device.deviceImageHeight;
      this.hands.width = this.phone.width;
      return (this.hands.height = this.phone.height);
    }
  }

  _updateMaskImage() {
    if (this._device.screenMask) {
      this.phone.bringToFront();
      this.screenMask.image = this._deviceImageUrl(this._device.screenMask);
      return (this.screenMask.visible = true);
    } else {
      this.screenMask.image = null;
      this.screenMask.visible = false;
      return this.phone.placeBehind(this.screen);
    }
  }

  _deviceImageName() {
    if (this._device.hasOwnProperty("deviceImage")) {
      return this._device.deviceImage;
    }
    return `${this._deviceType}.png`;
  }

  _deviceImageUrl(name) {
    if (!name) {
      return null;
    }

    // If the image is externally hosted, we'd like to use that
    if (_.startsWith(name, "http://") || _.startsWith(name, "https://")) {
      return name;
    }

    // If this device is added by the user we use the name as it is
    if (
      !Array.from(BuiltInDevices).includes(this._deviceType) ||
      this._deviceType === "custom"
    ) {
      return name;
    }

    // We want to get these image from our public resources server
    let resourceUrl = "//resources.framerjs.com/static/DeviceResources";

    // If we are running a local copy of Framer from the drive, get the resource online
    if (Utils.isFileUrl(window.location.href)) {
      resourceUrl = `http:${resourceUrl}`;
    }

    // If we're running Framer Studio and have local files, we'd like to use those.
    // For now we always use jp2 inside framer stusio
    if (Utils.isFramerStudio() && window.FramerStudioInfo) {
      if (
        (this._device.minStudioVersion &&
          Utils.framerStudioVersion() >= this._device.minStudioVersion) ||
        !this._device.minStudioVersion
      ) {
        if (
          (this._device.maxStudioVersion &&
            Utils.framerStudioVersion() <= this._device.maxStudioVersion) ||
          !this._device.maxStudioVersion
        ) {
          resourceUrl = window.FramerStudioInfo.deviceImagesUrl;
          return `${resourceUrl}/${name.replace(".png", ".jp2")}`;
        }
      }
    }

    // We'd like to use jp2/webp if possible, or check if we don't for this specific device
    if (this._device.deviceImageCompression === true) {
      if (Utils.isWebPSupported()) {
        return `${resourceUrl}/${name.replace(".png", ".webp")}`;
      }
      if (Utils.isJP2Supported()) {
        return `${resourceUrl}/${name.replace(".png", ".jp2")}`;
      }
    }

    return `${resourceUrl}/${name}`;
  }

  forceHideBezel(forceHide) {
    if (forceHide == null) {
      forceHide = true;
    }
    this._forceHideBezel = forceHide;
    return this._update();
  }

  setDeviceScale(deviceScale, animate) {
    let phoneScale;
    if (animate == null) {
      animate = false;
    }
    if (deviceScale === "fit" || deviceScale < 0) {
      deviceScale = "fit";
    } else {
      deviceScale = parseFloat(deviceScale);
    }

    if (deviceScale === this._deviceScale) {
      return;
    }

    this._deviceScale = deviceScale;

    if (this._shouldRenderFullScreen()) {
      return;
    }

    if (deviceScale === "fit") {
      phoneScale = this._calculatePhoneScale();
    } else {
      phoneScale = deviceScale;
    }

    this.hands.animateStop();

    if (animate) {
      this.hands.animate(
        _.extend(this.animationOptions, { properties: { scale: phoneScale } })
      );
    } else {
      this.hands.scale = phoneScale;
      centerLayer(this.hands, true);
    }

    return this.emit("change:deviceScale");
  }

  _calculatePhoneScale(windowWidth, windowHeight) {
    // Calculates a phone scale that fits the screen unless a fixed value is set
    let padding;
    const dimension = this.hideBezel ? this.screen : this.phone;

    const [width, height] = Array.from(
      this._getOrientationDimensions(dimension.width, dimension.height)
    );

    if (this.hideBezel) {
      padding = 0;
    } else {
      const paddingOffset =
        (this._device != null ? this._device.paddingOffset : undefined) || 0;
      padding = (this.padding + paddingOffset) * 2;
    }

    if (windowWidth == null) {
      windowWidth = window.innerWidth;
    }
    if (windowHeight == null) {
      windowHeight = window.innerHeight;
    }
    let phoneScale = _.min([
      (windowWidth - padding) / width,
      (windowHeight - padding) / height,
    ]);

    // Only scale in fixed steps, to reduce blurriness, and pixel cracks
    phoneScale = Math.floor(phoneScale * 1024.0) / 1024.0;
    if (phoneScale < 1 / 64.0) {
      phoneScale = 1 / 64.0;
    }

    if (!Utils.isFramerStudio() || !this.hideBezel) {
      // If close to a nice round scaling, snap to it
      if (30 / 64 < phoneScale && phoneScale < 35 / 64) {
        phoneScale = 32 / 64;
      } else if (15 / 64 < phoneScale && phoneScale < 18 / 64) {
        phoneScale = 16 / 64;
      }
    }

    // Never scale the phone beyond 100%
    if (phoneScale > 1 && !this.hideBezel) {
      phoneScale = 1;
    }

    this.emit("change:phoneScale", phoneScale);

    // If the device has a set scale we use that one
    if (this._deviceScale && this._deviceScale !== "fit") {
      return this._deviceScale;
    }

    return phoneScale;
  }

  setContentScale(contentScale, animate) {
    if (animate == null) {
      animate = false;
    }
    contentScale = parseFloat(contentScale);

    if (contentScale <= 0) {
      return;
    }

    if (contentScale === this._contentScale) {
      return;
    }

    this._contentScale = contentScale;

    if (animate) {
      this.content.animate(
        _.extend(this.animationOptions, {
          properties: { scale: this._contentScale },
        })
      );
    } else {
      this.content.scale = this._contentScale;
    }

    this._update();

    return this.emit("change:contentScale");
  }

  setOrientation(orientation, animate, suggestedSize = null) {
    let scale;
    if (animate == null) {
      animate = false;
    }
    if (Utils.framerStudioVersion() === oldDeviceMaxVersion) {
      orientation *= -1;
    }

    if (orientation === "portrait") {
      orientation = 0;
    }

    if (orientation === "landscape") {
      orientation = 90;
    }

    if (this._shouldRenderFullScreen()) {
      return;
    }

    orientation = parseInt(orientation);

    if (![0, 90, -90].includes(orientation)) {
      return;
    }

    if (orientation === this._orientation) {
      return;
    }

    this._orientation = orientation;

    // Calculate properties for the phone
    const handsProperties = { rotationZ: -this._orientation };

    const options = _.clone(this.animationOptions);
    if (suggestedSize != null) {
      scale = this._calculatePhoneScale(
        suggestedSize.width,
        suggestedSize.height
      );
      handsProperties.x = suggestedSize.width / 2 - this.hands.width / 2.0;
      handsProperties.y = suggestedSize.height / 2 - this.hands.height / 2.0;
      options.time = null;
      // Converted with Origami from Bounciness 5, Speed 12
      options.curve = Spring({ tension: 342.10059, friction: 28.97662 });
    } else {
      scale = this._calculatePhoneScale();
    }

    handsProperties.scale = scale;
    const contentProperties = this._viewportOrientationOffset();

    this.hands.animateStop();
    this.viewport.animateStop();

    if (animate) {
      const previousBackgroundColor = this.background.backgroundColor;
      const previousScreenBackgroundVisiblity = this.screenBackground.visible;
      if (this.hideBezel) {
        this.screenBackground.visible = false;
        this.background.backgroundColor = this.screen.backgroundColor;
        this.disableSizeUpdates = true;
      }
      const animation = this.hands.animate(
        _.extend(options, { properties: handsProperties })
      );
      this.viewport.animate(
        _.extend(options, { properties: contentProperties })
      );

      animation.on(Events.AnimationEnd, () => {
        return this._update();
      });

      animation.on(Events.AnimationStop, () => {
        this.disableSizeUpdates = false;
        this.background.backgroundColor = previousBackgroundColor;
        return (this.screenBackground.visible =
          previousScreenBackgroundVisiblity);
      });
    } else {
      this.hands.props = handsProperties;
      this.viewport.props = contentProperties;
      this._update();
    }

    if (this._orientation !== 0) {
      this.handsImageLayer.image = "";
    }

    return this.emit("change:orientation", this._orientation);
  }

  _viewportOrientationOffset() {
    let contentProperties;
    const [width, height] = Array.from(
      this._getOrientationDimensions(
        this._device.screenWidth,
        this._device.screenHeight
      )
    );

    this.content.width = width;
    this.content.height = height;

    let offset = (this.screen.width - width) / 2;
    if (this._orientation === -90) {
      offset *= -1;
    }

    let [x, y] = Array.from([0, 0]);

    if (this.isLandscape) {
      x = offset;
      y = offset;
    }

    return (contentProperties = {
      rotationZ: this._orientation,
      x,
      y,
    });
  }

  _orientationChange() {
    this._orientation = window.orientation;
    this._update();
    return this.emit("change:orientation", window.orientation);
  }

  rotateLeft(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.orientation === 90) {
      return;
    }
    return this.setOrientation(this.orientation + 90, animate);
  }

  rotateRight(animate) {
    if (animate == null) {
      animate = true;
    }
    if (this.orientation === -90) {
      return;
    }
    return this.setOrientation(this.orientation - 90, animate);
  }

  _getOrientationDimensions(width, height) {
    if (this.isLandscape) {
      return [height, width];
    } else {
      return [width, height];
    }
  }

  //##########################################################################
  // HANDS

  handSwitchingSupported() {
    return this._device.hands !== undefined && !this.hideBezel;
  }

  nextHand() {
    if (this.hands.rotationZ !== 0) {
      return;
    }
    if (this.handSwitchingSupported()) {
      const hands = _.keys(this._device.hands);
      if (hands.length > 0) {
        const nextHandIndex = hands.indexOf(this.selectedHand) + 1;
        let nextHand = "";
        if (nextHandIndex < hands.length) {
          nextHand = hands[nextHandIndex];
        }
        const hand = this.setHand(nextHand);
        this._update();
        return hand;
      }
    }
    return false;
  }

  setHand(hand) {
    this.selectedHand = hand;
    if (!hand || !this.handSwitchingSupported()) {
      return (this.handsImageLayer.image = "");
    }

    const handData = this._device.hands[hand];
    if (handData) {
      this.hands.width = handData.width;
      this.hands.height = handData.height;
      centerLayer(this.hands, true);
      centerLayer(this.phone);
      this.handsImageLayer.size = this.hands.size;
      this.handsImageLayer.y = 0;
      if (handData.offset) {
        this.handsImageLayer.y = handData.offset;
      }
      this.handsImageLayer.image = this.handImageUrl(hand);
      return hand;
    }
  }

  handImageUrl(hand) {
    // We want to get these image from our public resources server
    let resourceUrl = "//resources.framerjs.com/static/DeviceResources";

    // If we are running a local copy of Framer from the drive, get the resource online
    if (Utils.isFileUrl(window.location.href)) {
      resourceUrl = `http://${resourceUrl}`;
    }

    // If we're running Framer Studio and have local files, we'd like to use those
    if (
      Utils.isFramerStudio() &&
      window.FramerStudioInfo &&
      Utils.framerStudioVersion() >= newDeviceMinVersion
    ) {
      resourceUrl = window.FramerStudioInfo.deviceImagesUrl;
      return `${resourceUrl}/${hand}.png`;
    }

    if (Utils.isWebPSupported()) {
      return `${resourceUrl}/${hand}.webp`;
    }
    if (Utils.isJP2Supported()) {
      return `${resourceUrl}/${hand}.jp2`;
    }

    return `${resourceUrl}/${hand}.png`;
  }

  toInspect() {
    return `<Device '${this.deviceType}' ${this.screenSize.width}x${this.screenSize.height}>`;
  }

  prepareForSnapshot() {
    this.hideBezel = true;
    this.setDeviceScale(-1, true);
    this.screenMask.visible = false;
    this.screenBackground.visible = false;
    return (this.background.backgroundColor = null);
  }
}
DeviceComponent.initClass();

//##########################################################################
// DEVICE CONFIGURATIONS

const iPhoneXReleaseVersion = 105;
const googlePixelReleaseVersion = 75;
const desktopReleaseVersion = 70;
var newDeviceMinVersion = 53;
var oldDeviceMaxVersion = 52;
const redesignMaxVersion = 92;

const iPadAir2BaseDevice = {
  deviceImageWidth: 1856,
  deviceImageHeight: 2608,
  deviceImageCompression: true,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion,
};

const iPadMini4BaseDevice = {
  deviceImageWidth: 1936,
  deviceImageHeight: 2688,
  deviceImageCompression: true,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion,
};

const iPadProBaseDevice = {
  deviceImageWidth: 2448,
  deviceImageHeight: 3432,
  deviceImageCompression: true,
  screenWidth: 2048,
  screenHeight: 2732,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion,
};

const iPhoneXBaseDevice = {
  deviceImageWidth: 1405,
  deviceImageHeight: 2796,
  deviceImageCompression: true,
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
      offset: -15,
    },
    "iphone-hands-1": {
      width: 3567,
      height: 5558,
      offset: -15,
    },
  },
};

const iPhone8BaseDevice = {
  deviceImageWidth: 871,
  deviceImageHeight: 1776,
  deviceImageCompression: true,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 2399,
      height: 3738,
    },
    "iphone-hands-1": {
      width: 2399,
      height: 3738,
    },
  },
};

const iPhone8PlusBaseDevice = {
  deviceImageWidth: 1436,
  deviceImageHeight: 2876,
  deviceImageCompression: true,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 3949,
      height: 6154,
      offset: -15,
    },
    "iphone-hands-1": {
      width: 3949,
      height: 6154,
      offset: -15,
    },
  },
};

const iPhone7BaseDevice = {
  deviceImageWidth: 874,
  deviceImageHeight: 1792,
  deviceImageCompression: true,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: 71,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 2400,
      height: 3740,
    },
    "iphone-hands-1": {
      width: 2400,
      height: 3740,
    },
  },
};

const iPhone7PlusBaseDevice = {
  deviceImageWidth: 1452,
  deviceImageHeight: 2968,
  deviceImageCompression: true,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: 71,
  maxStudioVersion: iPhoneXReleaseVersion - 1,
  hands: {
    "iphone-hands-2": {
      width: 3987,
      height: 6212,
    },
    "iphone-hands-1": {
      width: 3987,
      height: 6212,
    },
  },
};

const iPhone6BaseDevice = {
  deviceImageWidth: 874,
  deviceImageHeight: 1792,
  deviceImageCompression: true,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
  hands: {
    "iphone-hands-2": {
      width: 2400,
      height: 3740,
    },
    "iphone-hands-1": {
      width: 2400,
      height: 3740,
    },
  },
};

const iPhone6PlusBaseDevice = {
  deviceImageWidth: 1452,
  deviceImageHeight: 2968,
  deviceImageCompression: true,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
  hands: {
    "iphone-hands-2": {
      width: 3987,
      height: 6212,
    },
    "iphone-hands-1": {
      width: 3987,
      height: 6212,
    },
  },
};

const iPhoneSEBaseDevice = {
  deviceImageWidth: 768,
  deviceImageHeight: 1610,
  deviceImageCompression: true,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 19,
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 19,
    },
  },
};

const iPhone5BaseDevice = {
  deviceImageWidth: 768,
  deviceImageHeight: 1612,
  deviceImageCompression: true,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 19,
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 19,
    },
  },
};

const iPhone5CBaseDevice = {
  deviceImageWidth: 776,
  deviceImageHeight: 1620,
  deviceImageCompression: true,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 2098,
      height: 3269,
      offset: 28,
    },
    "iphone-hands-1": {
      width: 2098,
      height: 3269,
      offset: 28,
    },
  },
};

const Nexus4BaseDevice = {
  deviceImageWidth: 860,
  deviceImageHeight: 1668,
  deviceImageCompression: true,
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
      offset: -52,
    },
    "iphone-hands-1": {
      width: 2362,
      height: 3681,
      offset: -52,
    },
  },
};

const Nexus5BaseDevice = {
  deviceImageWidth: 1204,
  deviceImageHeight: 2432,
  deviceImageCompression: true,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3292,
      height: 5130,
      offset: 8,
    },
    "iphone-hands-1": {
      width: 3292,
      height: 5130,
      offset: 8,
    },
  },
};

const Nexus6BaseDevice = {
  deviceImageWidth: 1576,
  deviceImageHeight: 3220,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 3.5,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4304,
      height: 6707,
      offset: 8,
    },
    "iphone-hands-1": {
      width: 4304,
      height: 6707,
      offset: 8,
    },
  },
};

const PixelBaseDevice = {
  deviceImageWidth: 1224,
  deviceImageHeight: 2492,
  deviceImageCompression: true,
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
      offset: 23,
    },
    "iphone-hands-1": {
      width: 3344,
      height: 5211,
      offset: 23,
    },
  },
};

const Pixel2BaseDevice = {
  deviceImageWidth: 1210,
  deviceImageHeight: 2513,
  deviceImageCompression: true,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 2.627,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  hands: {
    "iphone-hands-2": {
      width: 3316,
      height: 5167,
    },
    "iphone-hands-1": {
      width: 3316,
      height: 5167,
    },
  },
};

const Pixel2XLBaseDevice = {
  deviceImageWidth: 1650,
  deviceImageHeight: 3364,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 2880,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  screenMask: "google-pixel-2-xl-mask.svg",
  hands: {
    "iphone-hands-2": {
      width: 4530,
      height: 7059,
    },
    "iphone-hands-1": {
      width: 4521,
      height: 7045,
    },
  },
};

const Nexus9BaseDevice = {
  deviceImageWidth: 1896,
  deviceImageHeight: 2648,
  deviceImageCompression: true,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: newDeviceMinVersion,
};

const HTCa9BaseDevice = {
  deviceImageWidth: 1252,
  deviceImageHeight: 2592,
  deviceImageCompression: true,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3436,
      height: 5354,
      offset: 36,
    },
    "iphone-hands-1": {
      width: 3436,
      height: 5354,
      offset: 36,
    },
  },
};

const HTCm8BaseDevice = {
  deviceImageWidth: 1232,
  deviceImageHeight: 2572,
  deviceImageCompression: true,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 3436,
      height: 5354,
      offset: 12,
    },
    "iphone-hands-1": {
      width: 3436,
      height: 5354,
      offset: 12,
    },
  },
};

const MSFTLumia950BaseDevice = {
  deviceImageWidth: 1660,
  deviceImageHeight: 3292,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4494,
      height: 7003,
      offset: -84,
    },
    "iphone-hands-1": {
      width: 4494,
      height: 7003,
      offset: -84,
    },
  },
};

const SamsungGalaxyNote5BaseDevice = {
  deviceImageWidth: 1572,
  deviceImageHeight: 3140,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 2560,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: newDeviceMinVersion,
  hands: {
    "iphone-hands-2": {
      width: 4279,
      height: 6668,
      offset: -24,
    },
    "iphone-hands-1": {
      width: 4279,
      height: 6668,
      offset: -84,
    },
  },
};

const SamsungGalaxyS8BaseDevice = {
  deviceImageWidth: 1536,
  deviceImageHeight: 3334,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 2960,
  devicePixelRatio: 4,
  deviceType: "phone",
  minStudioVersion: iPhoneXReleaseVersion,
  screenMask: "samsung-galaxy-s8-mask.svg",
  hands: {
    "iphone-hands-2": {
      width: 4210,
      height: 6560,
    },
    "iphone-hands-1": {
      width: 4210,
      height: 6560,
    },
  },
};

const AppleWatchSeries242Device = {
  deviceImageWidth: 512,
  deviceImageHeight: 990,
  deviceImageCompression: true,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  minStudioVersion: 71,
};

const AppleWatchSeries238Device = {
  deviceImageWidth: 472,
  deviceImageHeight: 772,
  deviceImageCompression: true,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: 71,
};

const AppleWatch42Device = {
  deviceImageWidth: 512,
  deviceImageHeight: 990,
  deviceImageCompression: true,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
};

const AppleWatch38Device = {
  deviceImageWidth: 472,
  deviceImageHeight: 772,
  deviceImageCompression: true,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
};

const AppleWatch38BlackLeatherDevice = {
  deviceImageWidth: 472,
  deviceImageHeight: 796,
  deviceImageCompression: true,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  minStudioVersion: newDeviceMinVersion,
  maxStudioVersion: redesignMaxVersion,
};

const SonySmartwatch3Base = {
  deviceImageWidth: 444,
  deviceImageHeight: 780,
  deviceImageCompression: true,
  screenWidth: 320,
  screenHeight: 320,
  devicePixelRatio: 1.5,
  minStudioVersion: iPhoneXReleaseVersion,
};

const AppleMacBook = {
  deviceImageWidth: 3084,
  deviceImageHeight: 1860,
  deviceImageCompression: true,
  screenWidth: 2304,
  screenHeight: 1440,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion,
};

const AppleMacBookAir = {
  deviceImageWidth: 2000,
  deviceImageHeight: 1220,
  deviceImageCompression: true,
  screenWidth: 1440,
  screenHeight: 900,
  devicePixelRatio: 1,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion,
};

const AppleMacBookPro = {
  deviceImageWidth: 3820,
  deviceImageHeight: 2320,
  deviceImageCompression: true,
  screenWidth: 2880,
  screenHeight: 1800,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion,
};

const AppleIMac = {
  deviceImageWidth: 5600,
  deviceImageHeight: 5880,
  deviceImageCompression: true,
  screenWidth: 5120,
  screenHeight: 2880,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion,
};

const AppleThunderboltDisplay = {
  deviceImageWidth: 2788,
  deviceImageHeight: 2580,
  deviceImageCompression: true,
  screenWidth: 2560,
  screenHeight: 1440,
  devicePixelRatio: 1,
  deviceType: "computer",
  minStudioVersion: iPhoneXReleaseVersion,
};

const DellXPS = {
  deviceImageWidth: 5200,
  deviceImageHeight: 3040,
  deviceImageCompression: true,
  screenWidth: 3840,
  screenHeight: 2160,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: desktopReleaseVersion,
};

const SonyW85OC = {
  deviceImageWidth: 1320,
  deviceImageHeight: 860,
  deviceImageCompression: true,
  screenWidth: 1280,
  screenHeight: 720,
  devicePixelRatio: 1,
  minStudioVersion: desktopReleaseVersion,
};

const MicrosoftSurfaceBook = {
  deviceImageWidth: 4102,
  deviceImageHeight: 2474,
  deviceImageCompression: true,
  screenWidth: 3000,
  screenHeight: 2000,
  devicePixelRatio: 2,
  deviceType: "computer",
  minStudioVersion: iPhoneXReleaseVersion,
};

const MicrosoftSurfacePro3 = {
  deviceImageWidth: 2472,
  deviceImageHeight: 1704,
  deviceImageCompression: true,
  screenWidth: 2160,
  screenHeight: 1440,
  devicePixelRatio: 1.5,
  deviceType: "tablet",
  minStudioVersion: iPhoneXReleaseVersion,
};

const MicrosoftSurfacePro4 = {
  deviceImageWidth: 3064,
  deviceImageHeight: 2120,
  deviceImageCompression: true,
  screenWidth: 2736,
  screenHeight: 1824,
  devicePixelRatio: 2,
  deviceType: "tablet",
  minStudioVersion: iPhoneXReleaseVersion,
};

//##########################################################################
// OLD DEVICE CONFIGURATIONS

const old_iPhone6BaseDevice = {
  deviceImageWidth: 870,
  deviceImageHeight: 1738,
  deviceImageCompression: true,
  screenWidth: 750,
  screenHeight: 1334,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPhone6BaseDeviceHand = _.extend({}, old_iPhone6BaseDevice, {
  deviceImageWidth: 1988,
  deviceImageHeight: 2368,
  deviceImageCompression: true,
  paddingOffset: -150,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_iPhone6PlusBaseDevice = {
  deviceImageWidth: 1460,
  deviceImageHeight: 2900,
  deviceImageCompression: true,
  screenWidth: 1242,
  screenHeight: 2208,
  devicePixelRatio: 3,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPhone6PlusBaseDeviceHand = _.extend({}, old_iPhone6PlusBaseDevice, {
  deviceImageWidth: 3128,
  deviceImageHeight: 3487,
  deviceImageCompression: true,
  paddingOffset: -150,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_iPhone5BaseDevice = {
  deviceImageWidth: 780,
  deviceImageHeight: 1608,
  deviceImageCompression: true,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPhone5BaseDeviceHand = _.extend({}, old_iPhone5BaseDevice, {
  deviceImageWidth: 1884,
  deviceImageHeight: 2234,
  deviceImageCompression: true,
  paddingOffset: -200,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_iPhone5CBaseDevice = {
  deviceImageWidth: 776,
  deviceImageHeight: 1612,
  deviceImageCompression: true,
  screenWidth: 640,
  screenHeight: 1136,
  devicePixelRatio: 2,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPhone5CBaseDeviceHand = _.extend({}, old_iPhone5CBaseDevice, {
  deviceImageWidth: 1894,
  deviceImageHeight: 2244,
  deviceImageCompression: true,
  paddingOffset: -200,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_iPadMiniBaseDevice = {
  deviceImageWidth: 872,
  deviceImageHeight: 1292,
  deviceImageCompression: true,
  screenWidth: 768,
  screenHeight: 1024,
  devicePixelRatio: 1,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPadMiniBaseDeviceHand = _.extend({}, old_iPadMiniBaseDevice, {
  deviceImageWidth: 1380,
  deviceImageHeight: 2072,
  deviceImageCompression: true,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_iPadAirBaseDevice = {
  deviceImageWidth: 1769,
  deviceImageHeight: 2509,
  deviceImageCompression: true,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_iPadAirBaseDeviceHand = _.extend({}, old_iPadAirBaseDevice, {
  deviceImageWidth: 4744,
  deviceImageHeight: 4101,
  deviceImageCompression: true,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_Nexus5BaseDevice = {
  deviceImageWidth: 1208,
  deviceImageHeight: 2440,
  deviceImageCompression: true,
  screenWidth: 1080,
  screenHeight: 1920,
  devicePixelRatio: 3,
  deviceType: "phone",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_Nexus5BaseDeviceHand = _.extend({}, old_Nexus5BaseDevice, {
  // 2692 × 2996
  deviceImageWidth: 2692,
  deviceImageHeight: 2996,
  deviceImageCompression: true,
  paddingOffset: -120,
  maxStudioVersion: oldDeviceMaxVersion,
});

const old_Nexus9BaseDevice = {
  deviceImageWidth: 1733,
  deviceImageHeight: 2575,
  deviceImageCompression: true,
  screenWidth: 1536,
  screenHeight: 2048,
  devicePixelRatio: 2,
  deviceType: "tablet",
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_AppleWatch42Device = {
  deviceImageWidth: 552,
  deviceImageHeight: 938,
  deviceImageCompression: true,
  screenWidth: 312,
  screenHeight: 390,
  devicePixelRatio: 2,
  maxStudioVersion: oldDeviceMaxVersion,
};

const old_AppleWatch38Device = {
  deviceImageWidth: 508,
  deviceImageHeight: 900,
  deviceImageCompression: true,
  screenWidth: 272,
  screenHeight: 340,
  devicePixelRatio: 2,
  maxStudioVersion: oldDeviceMaxVersion,
};

var Devices = {
  fullscreen: {
    name: "Fullscreen",
    deviceType: "desktop",
    backgroundColor: "transparent",
  },

  custom: {
    name: "Custom",
    deviceImageWidth: 874,
    deviceImageHeight: 1792,
    screenWidth: 750,
    screenHeight: 1334,
    devicePixelRatio: 2,
    deviceType: "phone",
  },

  // iPad Air
  "apple-ipad-air-2-silver": _.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-gold": _.clone(iPadAir2BaseDevice),
  "apple-ipad-air-2-space-gray": _.clone(iPadAir2BaseDevice),

  // iPad Mini
  "apple-ipad-mini-4-silver": _.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-gold": _.clone(iPadMini4BaseDevice),
  "apple-ipad-mini-4-space-gray": _.clone(iPadMini4BaseDevice),

  // iPad Pro
  "apple-ipad-pro-silver": _.clone(iPadProBaseDevice),
  "apple-ipad-pro-gold": _.clone(iPadProBaseDevice),
  "apple-ipad-pro-space-gray": _.clone(iPadProBaseDevice),

  // iPhone X
  "apple-iphone-x-silver": _.clone(iPhoneXBaseDevice),
  "apple-iphone-x-space-gray": _.clone(iPhoneXBaseDevice),

  // iPhone 8
  "apple-iphone-8-silver": _.clone(iPhone8BaseDevice),
  "apple-iphone-8-gold": _.clone(iPhone8BaseDevice),
  "apple-iphone-8-space-gray": _.clone(iPhone8BaseDevice),

  // iPhone 8 Plus
  "apple-iphone-8-plus-silver": _.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-gold": _.clone(iPhone8PlusBaseDevice),
  "apple-iphone-8-plus-space-gray": _.clone(iPhone8PlusBaseDevice),

  // iPhone 7
  "apple-iphone-7-gold": _.clone(iPhone7BaseDevice),
  "apple-iphone-7-rose-gold": _.clone(iPhone7BaseDevice),
  "apple-iphone-7-silver": _.clone(iPhone7BaseDevice),
  "apple-iphone-7-black": _.clone(iPhone7BaseDevice),
  "apple-iphone-7-jet-black": _.clone(iPhone7BaseDevice),

  // iPhone 7 Plus
  "apple-iphone-7-plus-gold": _.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-rose-gold": _.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-silver": _.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-black": _.clone(iPhone7PlusBaseDevice),
  "apple-iphone-7-plus-jet-black": _.clone(iPhone7PlusBaseDevice),

  // iPhone 6s
  "apple-iphone-6s-gold": _.clone(iPhone6BaseDevice),
  "apple-iphone-6s-rose-gold": _.clone(iPhone6BaseDevice),
  "apple-iphone-6s-silver": _.clone(iPhone6BaseDevice),
  "apple-iphone-6s-space-gray": _.clone(iPhone6BaseDevice),

  // iPhone 6s Plus
  "apple-iphone-6s-plus-gold": _.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-rose-gold": _.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-silver": _.clone(iPhone6PlusBaseDevice),
  "apple-iphone-6s-plus-space-gray": _.clone(iPhone6PlusBaseDevice),

  // iPhone SE
  "apple-iphone-se-gold": _.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-silver": _.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-space-gray": _.clone(iPhoneSEBaseDevice),
  "apple-iphone-se-rose-gold": _.clone(iPhoneSEBaseDevice),

  // iPhone 5S
  "apple-iphone-5s-gold": _.clone(iPhone5BaseDevice),
  "apple-iphone-5s-silver": _.clone(iPhone5BaseDevice),
  "apple-iphone-5s-space-gray": _.clone(iPhone5BaseDevice),

  // iPhone 5C
  "apple-iphone-5c-blue": _.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-green": _.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-red": _.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-white": _.clone(iPhone5CBaseDevice),
  "apple-iphone-5c-yellow": _.clone(iPhone5CBaseDevice),

  // Apple Watch Series 2 38mm
  "apple-watch-series-2-38mm-black-steel-black": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-edition": _.clone(AppleWatchSeries238Device),
  "apple-watch-series-2-38mm-rose-gold-aluminum-midnight-blue": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-cocoa": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-concrete": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-ocean-blue": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-red": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-turquoise": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-white": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-silver-aluminum-yellow": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-space-gray-aluminum-black": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-sport-aluminum-walnut": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-series-2-38mm-steel-white": _.clone(AppleWatchSeries238Device),

  // Apple Watch Series 2 42mm
  "apple-watch-series-2-42mm-edition": _.clone(AppleWatchSeries242Device),
  "apple-watch-series-2-42mm-gold-aluminum-cocoa": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-rose-gold-aluminum-midnight-blue": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-concrete": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-green": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-light-pink": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-ocean-blue": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-pink-sand": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-red": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-turquoise": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-white": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-silver-aluminum-yellow": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-black-steel-black": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-space-gray-aluminum-black": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-series-2-42mm-steel-white": _.clone(AppleWatchSeries242Device),

  // Apple Watch Nike+ 38mm
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-volt": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-silver-aluminum-flat-silver-white": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-cool-gray": _.clone(
    AppleWatchSeries238Device
  ),
  "apple-watch-nike-plus-38mm-space-gray-aluminum-black-volt": _.clone(
    AppleWatchSeries238Device
  ),

  // Apple Watch Nike+ 42mm
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-volt": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-silver-aluminum-flat-silver-white": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-cool-gray": _.clone(
    AppleWatchSeries242Device
  ),
  "apple-watch-nike-plus-42mm-space-gray-aluminum-black-volt": _.clone(
    AppleWatchSeries242Device
  ),

  // Apple Watch 38mm

  "apple-watch-38mm-gold-black-leather-closed": _.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-rose-gold-black-leather-closed": _.clone(
    AppleWatch38BlackLeatherDevice
  ),
  "apple-watch-38mm-stainless-steel-black-leather-closed": _.clone(
    AppleWatch38BlackLeatherDevice
  ),

  "apple-watch-38mm-black-steel-black-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-gold-midnight-blue-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-rose-gold-lavender-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-blue-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-fog-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-green-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-red-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-walnut-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-white-closed": _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-gold-antique-white-closed":
    _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-aluminum-rose-gold-stone-closed":
    _.clone(AppleWatch38Device),
  "apple-watch-38mm-sport-space-gray-black-closed": _.clone(AppleWatch38Device),

  // Apple Watch 42mm
  "apple-watch-42mm-black-steel-black-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-black-leather-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-gold-midnight-blue-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-black-leather-closed":
    _.clone(AppleWatch42Device),
  "apple-watch-42mm-rose-gold-lavender-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-blue-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-fog-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-green-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-red-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-walnut-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-white-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-gold-antique-white-closed":
    _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-aluminum-rose-gold-stone-closed":
    _.clone(AppleWatch42Device),
  "apple-watch-42mm-sport-space-gray-black-closed": _.clone(AppleWatch42Device),
  "apple-watch-42mm-stainless-steel-black-leather-closed":
    _.clone(AppleWatch42Device),

  // Sony SmartWatch 3
  "sony-smartwatch-3-black": _.clone(SonySmartwatch3Base),
  "sony-smartwatch-3-white": _.clone(SonySmartwatch3Base),

  // NEXUS
  "google-nexus-4": _.clone(Nexus4BaseDevice),
  "google-nexus-5x": _.clone(Nexus5BaseDevice),
  "google-nexus-6p": _.clone(Nexus6BaseDevice),
  "google-nexus-9": _.clone(Nexus9BaseDevice),

  // Pixel
  "google-pixel-quite-black": _.clone(PixelBaseDevice),
  "google-pixel-really-blue": _.clone(PixelBaseDevice),
  "google-pixel-very-silver": _.clone(PixelBaseDevice),

  // Pixel 2
  "google-pixel-2-clearly-white": _.clone(Pixel2BaseDevice),
  "google-pixel-2-just-black": _.clone(Pixel2BaseDevice),
  "google-pixel-2-kinda-blue": _.clone(Pixel2BaseDevice),
  "google-pixel-2-xl-black-and-white": _.clone(Pixel2XLBaseDevice),
  "google-pixel-2-xl-just-black": _.clone(Pixel2XLBaseDevice),

  // HTC ONE A9
  "htc-one-a9-black": _.clone(HTCa9BaseDevice),
  "htc-one-a9-white": _.clone(HTCa9BaseDevice),

  // HTC ONE M8
  "htc-one-m8-black": _.clone(HTCm8BaseDevice),
  "htc-one-m8-gold": _.clone(HTCm8BaseDevice),
  "htc-one-m8-silver": _.clone(HTCm8BaseDevice),

  // MICROSOFT LUMIA 950
  "microsoft-lumia-950-black": _.clone(MSFTLumia950BaseDevice),
  "microsoft-lumia-950-white": _.clone(MSFTLumia950BaseDevice),

  // SAMSUNG NOTE 5
  "samsung-galaxy-note-5-black": _.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-gold": _.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-pink": _.clone(SamsungGalaxyNote5BaseDevice),
  "samsung-galaxy-note-5-silver-titanium": _.clone(
    SamsungGalaxyNote5BaseDevice
  ),
  "samsung-galaxy-note-5-white": _.clone(SamsungGalaxyNote5BaseDevice),

  //Samsug Galaxy S8
  "samsung-galaxy-s8-orchid-gray": _.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-midnight-black": _.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-maple-gold": _.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-coral-blue": _.clone(SamsungGalaxyS8BaseDevice),
  "samsung-galaxy-s8-arctic-silver": _.clone(SamsungGalaxyS8BaseDevice),

  // Notebooks
  "apple-macbook": _.clone(AppleMacBook),
  "apple-macbook-air": _.clone(AppleMacBookAir),
  "apple-macbook-pro": _.clone(AppleMacBookPro),
  "dell-xps": _.clone(DellXPS),

  // Desktops
  "apple-imac": _.clone(AppleIMac),
  "apple-thunderbolt-display": _.clone(AppleThunderboltDisplay),
  "microsoft-surface-book": _.clone(MicrosoftSurfaceBook),
  "microsoft-surface-pro-3": _.clone(MicrosoftSurfacePro3),
  "microsoft-surface-pro-4": _.clone(MicrosoftSurfacePro4),

  // TV
  "sony-w85Oc": _.clone(SonyW85OC),

  // OLD DEVICES
  "desktop-safari-1024-600": {
    deviceType: "browser",
    name: "Desktop Safari 1024 x 600",
    screenWidth: 1024,
    screenHeight: 600,
    devicePixelRatio: 1,
    deviceImageWidth: 1136,
    deviceImageHeight: 760,
    deviceImageCompression: true,
    backgroundColor: "white",
  },
  "desktop-safari-1280-800": {
    deviceType: "browser",
    name: "Desktop Safari 1280 x 800",
    screenWidth: 1280,
    screenHeight: 800,
    devicePixelRatio: 1,
    deviceImageWidth: 1392,
    deviceImageHeight: 960,
    deviceImageCompression: true,
    backgroundColor: "white",
  },
  "desktop-safari-1440-900": {
    deviceType: "browser",
    name: "Desktop Safari 1440 x 900",
    screenWidth: 1440,
    screenHeight: 900,
    devicePixelRatio: 1,
    deviceImageWidth: 1552,
    deviceImageHeight: 1060,
    deviceImageCompression: true,
    backgroundColor: "white",
  },

  // iPhone 6
  "iphone-6-spacegray": _.clone(old_iPhone6BaseDevice),
  "iphone-6-spacegray-hand": _.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-silver": _.clone(old_iPhone6BaseDevice),
  "iphone-6-silver-hand": _.clone(old_iPhone6BaseDeviceHand),
  "iphone-6-gold": _.clone(old_iPhone6BaseDevice),
  "iphone-6-gold-hand": _.clone(old_iPhone6BaseDeviceHand),

  // iPhone 6+
  "iphone-6plus-spacegray": _.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-spacegray-hand": _.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-silver": _.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-silver-hand": _.clone(old_iPhone6PlusBaseDeviceHand),
  "iphone-6plus-gold": _.clone(old_iPhone6PlusBaseDevice),
  "iphone-6plus-gold-hand": _.clone(old_iPhone6PlusBaseDeviceHand),

  // iPhone 5S
  "iphone-5s-spacegray": _.clone(old_iPhone5BaseDevice),
  "iphone-5s-spacegray-hand": _.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-silver": _.clone(old_iPhone5BaseDevice),
  "iphone-5s-silver-hand": _.clone(old_iPhone5BaseDeviceHand),
  "iphone-5s-gold": _.clone(old_iPhone5BaseDevice),
  "iphone-5s-gold-hand": _.clone(old_iPhone5BaseDeviceHand),

  // iPhone 5C
  "iphone-5c-green": _.clone(old_iPhone5CBaseDevice),
  "iphone-5c-green-hand": _.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-blue": _.clone(old_iPhone5CBaseDevice),
  "iphone-5c-blue-hand": _.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-pink": _.clone(old_iPhone5CBaseDevice),
  "iphone-5c-pink-hand": _.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-white": _.clone(old_iPhone5CBaseDevice),
  "iphone-5c-white-hand": _.clone(old_iPhone5CBaseDeviceHand),
  "iphone-5c-yellow": _.clone(old_iPhone5CBaseDevice),
  "iphone-5c-yellow-hand": _.clone(old_iPhone5CBaseDeviceHand),

  // iPad Mini
  "ipad-mini-spacegray": _.clone(old_iPadMiniBaseDevice),
  "ipad-mini-spacegray-hand": _.clone(old_iPadMiniBaseDeviceHand),
  "ipad-mini-silver": _.clone(old_iPadMiniBaseDevice),
  "ipad-mini-silver-hand": _.clone(old_iPadMiniBaseDeviceHand),

  // iPad Air
  "ipad-air-spacegray": _.clone(old_iPadAirBaseDevice),
  "ipad-air-spacegray-hand": _.clone(old_iPadAirBaseDeviceHand),
  "ipad-air-silver": _.clone(old_iPadAirBaseDevice),
  "ipad-air-silver-hand": _.clone(old_iPadAirBaseDeviceHand),

  // Nexus 5
  "nexus-5-black": _.clone(old_Nexus5BaseDevice),
  "nexus-5-black-hand": _.clone(old_Nexus5BaseDeviceHand),

  // Nexus 9
  "nexus-9": _.clone(old_Nexus9BaseDevice),

  // Apple Watch 38mm
  "applewatchsport-38-aluminum-sportband-black": _.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-blue": _.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-green": _.clone(
    old_AppleWatch38Device
  ),
  "applewatchsport-38-aluminum-sportband-pink": _.clone(old_AppleWatch38Device),
  "applewatchsport-38-aluminum-sportband-white": _.clone(
    old_AppleWatch38Device
  ),
  "applewatch-38-black-bracelet": _.clone(old_AppleWatch38Device),
  "applewatch-38-steel-bracelet": _.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-blue": _.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-gray": _.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-buckle-red": _.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-black": _.clone(old_AppleWatch38Device),
  "applewatchedition-38-gold-sportband-white": _.clone(old_AppleWatch38Device),

  // Apple Watch 42mm
  "applewatchsport-42-aluminum-sportband-black": _.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-blue": _.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-green": _.clone(
    old_AppleWatch42Device
  ),
  "applewatchsport-42-aluminum-sportband-pink": _.clone(old_AppleWatch42Device),
  "applewatchsport-42-aluminum-sportband-white": _.clone(
    old_AppleWatch42Device
  ),
  "applewatch-42-black-bracelet": _.clone(old_AppleWatch42Device),
  "applewatch-42-steel-bracelet": _.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-blue": _.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-gray": _.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-buckle-red": _.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-black": _.clone(old_AppleWatch42Device),
  "applewatchedition-42-gold-sportband-white": _.clone(old_AppleWatch42Device),
};

exports.DeviceComponent.Devices = Devices;

var BuiltInDevices = _.keys(Devices);
