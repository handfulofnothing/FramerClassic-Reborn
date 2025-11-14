# Framer Library

Modern ES6 prototyping framework for interactive design.

## Quick Start

```bash
npm install
npm run dev    # Start development server
npm run build  # Build framer.js
npm test       # Run tests with Vitest
```

## Modern Stack (2025)

- ✅ **ES6 Modules**: Full ESM/ES6 syntax throughout
- ✅ **Vite 7.2.2**: Modern build tool
- ✅ **Vitest 4.0.8**: Modern test runner  
- ✅ **JSDOM 27**: Modern DOM simulation
- ❌ Removed: CoffeeScript, Gulp, Webpack, PhantomJS, Mocha, Chai

## Build Output

- **Development**: `npm run dev` - Vite dev server
- **Production**: `npm run build` - Generates `dist/framer.js` (~587 KB)

## Project Structure

```
framer/               # Core library (ES6 modules)
  ├── Framer.js      # Main entry point
  ├── Layer.js       # Core layer class
  ├── Animation.js   # Animation system
  └── Components/    # Built-in components
test/
  ├── setup.js       # Vitest setup
  └── tests/         # Test files (*.test.js)
vite.config.js       # Build configuration
```

## Development

The entire codebase has been modernized to ES6:
- All `.coffee` files removed
- ES6 classes with proper `super()` calls
- ES6 modules (`import`/`export`)
- Modern async/await patterns
- Vitest for testing (replaces Mocha/Chai)

## Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

## License

MIT

---

### Legacy Note

This is a modernized version of the original Framer.js library. The original was built with CoffeeScript and used legacy tools (Gulp, PhantomJS, Mocha, Chai). This version maintains compatibility while using modern JavaScript standards.

<br /><br />

## Contribute

###### Building

- Download or fork the repository
- Make sure you have the latest version of node and npm installed
- Run `make dist` to build the latest version
- Run `make` to rebuild the latest version on changes

###### Testing

- Run `make test` to run the unit tests in phantomjs
- Run `make` to retest the latest version on changes

###### Reporting Issues

- Please use the issue tracker
- Try to include an example and clearly describe expected behaviour
<br /><br />

## Others

- [Twitter](http://twitter.com/framer) — Follow us for updates & the latest work
- [The Community](https://www.facebook.com/groups/framerjs/) — Join over 20.000 designers for help and advice
- [The Newsletter](https://framer.com/newsletter/?utm_source=GitHub%2C%20framerjs%2C%20readme&utm_medium=Github) — Get the best work & latest news in your inbox
- [Featured Examples](https://framer.com/examples/featured/?utm_source=GitHub%2C%20framerjs%2C%20readme&utm_medium=Github) — The best Framer work from the community
- [Latest builds](http://builds.framerjs.com/?utm_source=GitHub%2C%20framerjs%2C%20readme&utm_medium=Github) — The latest builds of Framer.js
