import { test, beforeEach, afterEach, expect, vi } from "vitest";
import { Framer } from "../src/framer"; // adjust import path to your actual source
import { Color } from "../src/Color";
import { Utils } from "../src/Utils";
import _ from "lodash";

// --- Framer defaults reset handling ---
const previousReset = Framer.resetDefaults;

Framer.resetDefaults = function () {
  previousReset();
  Framer.Defaults.Layer.width = 100;
  Framer.Defaults.Layer.height = 100;
  Framer.Defaults.Animation.time = 0.035;
};

Framer.resetDefaults();

// --- Environment setup ---
globalThis.TESTING = true;

// Silence console spam during tests
vi.spyOn(console, "debug").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

// --- Custom matchers (replacing chai chainable methods) ---
expect.extend({
  toEqualColor(received, expected) {
    const pass = Color.equal(received, expected);
    if (pass) {
      return {
        message: () => `expected ${received} not to equal color ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to equal color ${expected}`,
        pass: false,
      };
    }
  },

  toEqualShadow(received, expected) {
    let equal = true;
    for (const key in expected) {
      const value = expected[key];
      if (Color.isColor(value)) {
        equal = equal && Color.equal(value, received[key]);
      } else {
        equal = equal && _.eq(value, received[key]);
      }
    }

    if (equal) {
      return {
        message: () =>
          `expected ${Utils.inspect(
            received
          )} not to equal shadow ${Utils.inspect(expected)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${Utils.inspect(received)} to equal shadow ${Utils.inspect(
            expected
          )}`,
        pass: false,
      };
    }
  },
});

// --- Helper print function (for debugging) ---
globalThis.print = (...args) =>
  console.log("\n»", args.map((obj) => Utils.inspect(obj)).join(", "));

// --- Optional: recreate Device if required by tests ---
Framer.Device = new Framer.DeviceView();

// --- Hooks for global resets ---
beforeEach(() => {
  Framer.resetDefaults();
});

afterEach(() => {
  vi.restoreAllMocks();
});
