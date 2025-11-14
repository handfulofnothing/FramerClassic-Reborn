import { test, beforeEach, afterEach, expect, vi } from "vitest";
import Framer from "../framer/Framer.js";
import { Color } from "../framer/Color.js";
import Utils from "../framer/Utils.js";
import { _ } from "../framer/Underscore.js";

// --- Browser API polyfills for JSDOM ---
// WebKitCSSMatrix polyfill for JSDOM environment
if (typeof globalThis.WebKitCSSMatrix === 'undefined') {
  globalThis.WebKitCSSMatrix = class WebKitCSSMatrix {
    constructor(transform) {
      this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
      this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
      
      if (transform && typeof transform === 'string') {
        // Basic transform string parsing (simplified)
        this._parseTransformString(transform);
      }
    }
    
    _parseTransformString(str) {
      // Simplified parsing - in real implementation would parse CSS transform
      // For tests, identity matrix is usually sufficient
    }
    
    multiply(other) {
      const result = new WebKitCSSMatrix();
      // Matrix multiplication (simplified for 2D transforms)
      result.m11 = this.m11 * other.m11 + this.m12 * other.m21;
      result.m12 = this.m11 * other.m12 + this.m12 * other.m22;
      result.m21 = this.m21 * other.m11 + this.m22 * other.m21;
      result.m22 = this.m21 * other.m12 + this.m22 * other.m22;
      result.m41 = this.m41 * other.m11 + this.m42 * other.m21 + other.m41;
      result.m42 = this.m41 * other.m12 + this.m42 * other.m22 + other.m42;
      return result;
    }
    
    translate(x, y, z) {
      const result = new WebKitCSSMatrix();
      Object.assign(result, this);
      result.m41 += x || 0;
      result.m42 += y || 0;
      result.m43 += z || 0;
      return result;
    }
    
    scale(scaleX, scaleY, scaleZ) {
      const result = new WebKitCSSMatrix();
      Object.assign(result, this);
      result.m11 *= scaleX || 1;
      result.m22 *= scaleY || scaleX || 1;
      result.m33 *= scaleZ || 1;
      return result;
    }
    
    rotate(rotX, rotY, rotZ) {
      // Simplified rotation
      const result = new WebKitCSSMatrix();
      Object.assign(result, this);
      return result;
    }

    skewX(angle) {
      if (!angle) return this;
      const rad = (angle * Math.PI) / 180;
      const tan = Math.tan(rad);
      const result = new WebKitCSSMatrix();
      result.m21 = tan;
      return this.multiply(result);
    }

    skewY(angle) {
      if (!angle) return this;
      const rad = (angle * Math.PI) / 180;
      const tan = Math.tan(rad);
      const result = new WebKitCSSMatrix();
      result.m12 = tan;
      return this.multiply(result);
    }

    skew(angle) {
      if (!angle) return this;
      return this.skewX(angle).skewY(angle);
    }

    inverse() {
      // Simplified inverse for basic transforms
      const result = new WebKitCSSMatrix();
      const det = this.m11 * this.m22 - this.m12 * this.m21;
      if (Math.abs(det) < 1e-10) {
        return this; // Singular matrix, return identity
      }
      result.m11 = this.m22 / det;
      result.m12 = -this.m12 / det;
      result.m21 = -this.m21 / det;
      result.m22 = this.m11 / det;
      result.m41 = (this.m21 * this.m42 - this.m22 * this.m41) / det;
      result.m42 = (this.m12 * this.m41 - this.m11 * this.m42) / det;
      return result;
    }

    point(p) {
      const x = p.x || 0;
      const y = p.y || 0;
      const z = p.z || 0;
      return {
        x: this.m11 * x + this.m21 * y + this.m31 * z + this.m41,
        y: this.m12 * x + this.m22 * y + this.m32 * z + this.m42,
        z: this.m13 * x + this.m23 * y + this.m33 * z + this.m43,
      };
    }
  };
}

// --- Framer defaults reset handling ---
const previousReset = Framer.resetDefaults;

if (Framer.resetDefaults) {
  Framer.resetDefaults = function () {
    if (previousReset) previousReset.call(Framer);
    if (Framer.Defaults && Framer.Defaults.Layer) {
      Framer.Defaults.Layer.width = 100;
      Framer.Defaults.Layer.height = 100;
    }
    if (Framer.Defaults && Framer.Defaults.Animation) {
      Framer.Defaults.Animation.time = 0.035;
    }
  };
  
  Framer.resetDefaults();
}

// --- Environment setup ---
globalThis.TESTING = true;

// Silence console spam during tests
vi.spyOn(console, "debug").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});

// --- Modern Vitest custom matchers ---

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

// --- Add Node.js assert module for backward compatibility ---
globalThis.assert = {
  equal(actual, expected, message) {
    expect(actual, message).toBe(expected);
  },
  notEqual(actual, expected, message) {
    expect(actual, message).not.toBe(expected);
  },
  deepEqual(actual, expected, message) {
    expect(actual, message).toEqual(expected);
  },
  strictEqual(actual, expected, message) {
    expect(actual, message).toBe(expected);
  },
  ok(value, message) {
    expect(value, message).toBeTruthy();
  },
  fail(message) {
    throw new Error(message || 'Assertion failed');
  }
};

// --- Optional: recreate Device if required by tests ---
if (Framer.DeviceComponent) {
  Framer.Device = new Framer.DeviceComponent();
}

// --- Hooks for global resets ---
beforeEach(() => {
  if (Framer.resetDefaults) {
    Framer.resetDefaults();
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});
