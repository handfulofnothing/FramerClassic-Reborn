import { BaseClass } from "./BaseClass";
import { Events } from "./Events";
import { Utils } from "./Utils";

export class AnimationGroup extends BaseClass {
  constructor(...args) {
    super(...args);
    this._animations = args.flat();
    this.stopAnimations = true;
    this.stop();
  }

  start() {
    return this._start(this._animations);
  }

  stop() {
    this._stop();
    this._started = [];
    this._halted = [];
    this._stopped = [];
    this._ended = [];
  }

  _start(animations) {
    this.stop();
    this._onStart();

    return animations.map((animation) => {
      this._started.push(animation);

      animation.onAnimationHalt(() => {
        this._halted.push(animation);
        if (this._halted.length > 1) return;
        this._stop();
        this._onHalt();
      });

      animation.onAnimationStop(() => {
        this._stopped.push(animation);
        if (this._stopped.length === this._started.length) this._onStop();
      });

      animation.onAnimationEnd(() => {
        this._ended.push(animation);
        if (this._ended.length === this._started.length) this._onEnd();
      });

      return animation.start();
    });
  }

  _stop() {
    if (!this._started || !this.stopAnimations) return;
    return this._started.map((a) => (a.isAnimating ? a.stop() : undefined));
  }

  _onStart() {
    this.emit(Events.AnimationStart);
  }
  _onHalt() {
    this.emit(Events.AnimationHalt);
  }
  _onStop() {
    this.emit(Events.AnimationStop);
  }
  _onEnd() {
    this.emit(Events.AnimationEnd);
  }

  onAnimationStart(cb) {
    return this.on(Events.AnimationStart, cb);
  }
  onAnimationHalt(cb) {
    return this.on(Events.AnimationHalt, cb);
  }
  onAnimationStop(cb) {
    return this.on(Events.AnimationStop, cb);
  }
  onAnimationEnd(cb) {
    return this.on(Events.AnimationEnd, cb);
  }

  onStart(cb) {
    return this.onAnimationStart(cb);
  }
  onHalt(cb) {
    return this.onAnimationHalt(cb);
  }
  onStop(cb) {
    return this.onAnimationStop(cb);
  }
  onEnd(cb) {
    return this.onAnimationEnd(cb);
  }
}

export class AnimationStateGroup extends AnimationGroup {
  static initClass() {
    this.define("state", { get: () => this._state });

    this.define("states", {
      get() {
        const states = [];
        for (const layer of this._layers ?? []) {
          for (const state of Object.keys(layer.states ?? {})) {
            if (!states.includes(state)) states.push(state);
          }
        }
        return states;
      },
    });
  }

  constructor(...layers) {
    super(...layers);
    this._layers = layers.flat();
    this._state = "default";
  }

  animate(state) {
    const animations = [];
    for (const layer of this._layers) {
      if (layer.states?.[state]) {
        animations.push(layer.animate(state, { start: false }));
      }
    }
    if (!animations.length) return;
    this._start(animations);
    this._state = state;
  }

  stateCycle(...args) {
    let states = args.flat();
    if (!states.length) states = this.states;
    return this.animate(Utils.arrayNext(states, this.state));
  }
}

AnimationStateGroup.initClass();
