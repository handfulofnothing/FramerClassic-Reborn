// Static site configuration for resources.framerjs.com
// Converted from CoffeeScript to modern ES6

exports.config = {
  before() {
    // Called before every pages build
  },

  page(path, file) {
    // Called with every page build and is expected to return a context
    return {
      date: new Date(),
      domain: "domain.com",
      path,
    };
  },
};
