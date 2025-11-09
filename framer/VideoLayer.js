import { Layer } from "./Layer.js";

export class VideoLayer extends Layer {
  constructor(options = {}) {
    // Create video element before adding options
    super(options);

    this.player = document.createElement("video");
    this.player.setAttribute("webkit-playsinline", "true");
    this.player.setAttribute("playsinline", "");
    this.player.style.width = "100%";
    this.player.style.height = "100%";

    // Wrap with DOM event manager for .on/.off
    this.player.on = this._context?.domEventManager?.wrap(
      this.player
    ).addEventListener;
    this.player.off = this._context?.domEventManager?.wrap(
      this.player
    ).removeEventListener;

    // Set initial video if provided
    if (options.video) this.video = options.video;

    // Append player to the layer element
    this._element.appendChild(this.player);
  }
}

VideoLayer.define("video", {
  get() {
    return this.player.src;
  },
  set(video) {
    this.player.src = video;
  },
});
