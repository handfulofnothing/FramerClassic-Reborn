window.chai = require("chai");

const previousReset = Framer.resetDefaults;

Framer.resetDefaults = function () {
  previousReset();
  // We don't want to update all the tests if we change these
  Framer.Defaults.Layer.width = 100;
  Framer.Defaults.Layer.height = 100;
  return (Framer.Defaults.Animation.time = 0.035);
};
Framer.resetDefaults();

Framer.Device = new Framer.DeviceView();

window.TESTING = true;
window.console.debug = function (v) {};
window.console.warn = function (v) {};

chai.should();
chai.config.truncateThreshold = 2;
chai.config.showDiff = true;

chai.Assertion.addChainableMethod("equalColor", function (color) {
  const expected = color;
  const actual = this._obj;

  return this.assert(
    Color.equal(expected, actual),
    `expected ${this._obj} to equal ${color}`,
    `expected ${this._obj} to not equal ${color}`
  );
});

chai.Assertion.addChainableMethod("equalShadow", function (shadow) {
  const expected = shadow;
  const actual = this._obj;

  let equal = true;
  for (var key in expected) {
    var value = expected[key];
    if (Color.isColor(value)) {
      equal = equal && Color.equal(value, actual[key]);
    } else {
      equal = equal && _.eq(value, actual[key]);
    }
  }

  return this.assert(
    equal,
    `expected ${Utils.inspect(this._obj)} to equal ${Utils.inspect(shadow)}`,
    `expected ${Utils.inspect(this._obj)} to not equal ${Utils.inspect(shadow)}`
  );
});

mocha.setup({ ui: "bdd", bail: true, reporter: "dot" });
mocha.globals(["__import__"]);

window.print = (...args) =>
  console.log("\n»", args.map((obj) => Utils.inspect(obj)).join(", "));

import "./tests/AlignTest.js";
import "./tests/CurvesTest.js";
import "./tests/EventEmitterTest.js";
import "./tests/UtilsTest.js";
import "./tests/BaseClassTest.js";
import "./tests/LayerTest.js";
import "./tests/LayerEventsTest.js";
import "./tests/LayerStatesTest.js";
import "./tests/LayerStatesBackwardsTest.js";
import "./tests/LayerGesturesTest.js";
import "./tests/VideoLayerTest.js";
import "./tests/ImporterTest.js";
import "./tests/LayerAnimationTest.js";
import "./tests/LayerDraggableTest.js";
import "./tests/ContextTest.js";
import "./tests/ScrollComponentTest.js";
import "./tests/TextLayerTest.js";
import "./tests/SVGLayerTest.js";
import "./tests/SVGPathTest.js";
import "./tests/PageComponentTest.js";
import "./tests/VersionTest.js";
import "./tests/ColorTest.js";
import "./tests/GradientTest.js";
import "./tests/DeviceComponentTest.js";
import "./tests/SliderComponentTest.js";
import "./tests/RangeSliderComponentTest.js";
import "./tests/FlowComponentTest.js";
import "./tests/PreloaderTest.js";

mocha.run();
