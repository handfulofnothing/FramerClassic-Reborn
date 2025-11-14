import _ from "./Underscore.js";

// Polyfill for WebKitCSSMatrix in non-browser environments (e.g., JSDOM for testing)
if (typeof globalThis.WebKitCSSMatrix === 'undefined') {
  globalThis.WebKitCSSMatrix = class WebKitCSSMatrix {
    constructor(transform) {
      this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
      this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
      
      if (transform && typeof transform === 'string') {
        this._parseTransformString(transform);
      }
    }
    
    _parseTransformString(str) {
      // Parse CSS transform string (simplified for testing)
      if (str.includes('matrix3d')) {
        const values = str.match(/matrix3d\(([^)]+)\)/)?.[1].split(',').map(v => parseFloat(v.trim()));
        if (values && values.length === 16) {
          this.m11 = values[0]; this.m12 = values[1]; this.m13 = values[2]; this.m14 = values[3];
          this.m21 = values[4]; this.m22 = values[5]; this.m23 = values[6]; this.m24 = values[7];
          this.m31 = values[8]; this.m32 = values[9]; this.m33 = values[10]; this.m34 = values[11];
          this.m41 = values[12]; this.m42 = values[13]; this.m43 = values[14]; this.m44 = values[15];
        }
      }
    }
    
    multiply(other) {
      const result = new WebKitCSSMatrix();
      result.m11 = this.m11 * other.m11 + this.m12 * other.m21 + this.m13 * other.m31 + this.m14 * other.m41;
      result.m12 = this.m11 * other.m12 + this.m12 * other.m22 + this.m13 * other.m32 + this.m14 * other.m42;
      result.m13 = this.m11 * other.m13 + this.m12 * other.m23 + this.m13 * other.m33 + this.m14 * other.m43;
      result.m14 = this.m11 * other.m14 + this.m12 * other.m24 + this.m13 * other.m34 + this.m14 * other.m44;
      
      result.m21 = this.m21 * other.m11 + this.m22 * other.m21 + this.m23 * other.m31 + this.m24 * other.m41;
      result.m22 = this.m21 * other.m12 + this.m22 * other.m22 + this.m23 * other.m32 + this.m24 * other.m42;
      result.m23 = this.m21 * other.m13 + this.m22 * other.m23 + this.m23 * other.m33 + this.m24 * other.m43;
      result.m24 = this.m21 * other.m14 + this.m22 * other.m24 + this.m23 * other.m34 + this.m24 * other.m44;
      
      result.m31 = this.m31 * other.m11 + this.m32 * other.m21 + this.m33 * other.m31 + this.m34 * other.m41;
      result.m32 = this.m31 * other.m12 + this.m32 * other.m22 + this.m33 * other.m32 + this.m34 * other.m42;
      result.m33 = this.m31 * other.m13 + this.m32 * other.m23 + this.m33 * other.m33 + this.m34 * other.m43;
      result.m34 = this.m31 * other.m14 + this.m32 * other.m24 + this.m33 * other.m34 + this.m34 * other.m44;
      
      result.m41 = this.m41 * other.m11 + this.m42 * other.m21 + this.m43 * other.m31 + this.m44 * other.m41;
      result.m42 = this.m41 * other.m12 + this.m42 * other.m22 + this.m43 * other.m32 + this.m44 * other.m42;
      result.m43 = this.m41 * other.m13 + this.m42 * other.m23 + this.m43 * other.m33 + this.m44 * other.m43;
      result.m44 = this.m41 * other.m14 + this.m42 * other.m24 + this.m43 * other.m34 + this.m44 * other.m44;
      
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
      // Simplified rotation implementation
      const result = new WebKitCSSMatrix();
      Object.assign(result, this);
      return result;
    }
  };
}

WebKitCSSMatrix.prototype.skew = function (skew) {
  if (!skew) return this;

  const rad = (skew * Math.PI) / 180;
  const value = Math.tan(rad);
  const m = new WebKitCSSMatrix();
  m.m12 = value;
  m.m21 = value;

  return this.multiply(m);
};

WebKitCSSMatrix.prototype.skewX = function (angle) {
  if (!angle) return this;
  const rad = (angle * Math.PI) / 180;
  const tan = Math.tan(rad);
  const m = new WebKitCSSMatrix();
  m.m21 = tan;
  return this.multiply(m);
};

WebKitCSSMatrix.prototype.skewY = function (angle) {
  if (!angle) return this;
  const rad = (angle * Math.PI) / 180;
  const tan = Math.tan(rad);
  const m = new WebKitCSSMatrix();
  m.m12 = tan;
  return this.multiply(m);
};

WebKitCSSMatrix.prototype.inverse = function () {
  // Simplified 2D matrix inverse for transforms
  const det = this.m11 * this.m22 - this.m12 * this.m21;
  if (Math.abs(det) < 1e-10) {
    return WebKitCSSMatrix.identity3d(); // Singular matrix, return identity
  }
  const result = new WebKitCSSMatrix();
  result.m11 = this.m22 / det;
  result.m12 = -this.m12 / det;
  result.m21 = -this.m21 / det;
  result.m22 = this.m11 / det;
  result.m41 = (this.m21 * this.m42 - this.m22 * this.m41) / det;
  result.m42 = (this.m12 * this.m41 - this.m11 * this.m42) / det;
  // Copy 3D components
  result.m13 = this.m13;
  result.m14 = this.m14;
  result.m23 = this.m23;
  result.m24 = this.m24;
  result.m31 = this.m31;
  result.m32 = this.m32;
  result.m33 = this.m33;
  result.m34 = this.m34;
  result.m43 = this.m43;
  result.m44 = this.m44;
  return result;
};

WebKitCSSMatrix.prototype.point = function (point = {}) {
  const { x = 0, y = 0, z = 0 } = _.defaults(point, { x: 0, y: 0, z: 0 });

  let w = this.m14 * x + this.m24 * y + this.m34 * z + this.m44;
  w ||= 1;

  return {
    x: (this.m11 * x + this.m21 * y + this.m31 * z + this.m41) / w,
    y: (this.m12 * x + this.m22 * y + this.m32 * z + this.m42) / w,
    z: (this.m13 * x + this.m23 * y + this.m33 * z + this.m43) / w,
  };
};

WebKitCSSMatrix.identity3d = () =>
  new WebKitCSSMatrix("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");

export const Matrix = WebKitCSSMatrix;
