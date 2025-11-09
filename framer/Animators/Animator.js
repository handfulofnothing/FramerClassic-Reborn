export class Animator {
  static initClass() {
    // Static initialization or metadata can go here if needed
  }

  constructor(options = {}) {
    this.setup(options);
  }

  setup(options) {
    throw new Error("Not implemented");
  }

  /**
   * Return the next value based on delta progress
   * Must be implemented by subclasses
   */
  next(delta) {
    throw new Error("Not implemented");
  }

  finished() {
    throw new Error("Not implemented");
  }

  /**
   * Generate an array of values by repeatedly calling next()
   * @param {number} delta Time step per frame
   * @param {number} limit Maximum number of frames to calculate
   * @returns {Array} Array of values produced by next()
   */
  values(delta = 1 / 60, limit = 100) {
    const values = [];
    for (let i = 0; i <= limit; i++) {
      values.push(this.next(delta));
      if (this.finished()) break;
    }
    return values;
  }
}

// Optional: run static initializer
Animator.initClass();
