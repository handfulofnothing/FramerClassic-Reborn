import path from "path";
import { fileURLToPath } from "url";
import gulp from "gulp";
import mochaPhantomJS from "gulp-mocha-phantomjs";
import istanbulReport from "gulp-istanbul-report";
import webpack from "webpack";
import rename from "gulp-rename";
import template from "gulp-template";
import log from "fancy-log";
import colors from "ansi-colors";
import { exec } from "child_process";
import coffeelint from "gulp-coffeelint";
import { promisify } from "util";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execAsync = promisify(exec);
const DEBUG_TARGET = "extras/Studio.framer";

//###############################################################################
// Base webpack config

const WEBPACK = {
  entry: "./framer/Framer.coffee",
  module: {
    rules: [{ test: /\.coffee$/, loader: "coffee-loader" }],
  },
  resolve: {
    extensions: [".web.coffee", ".web.js", ".coffee", ".js"],
  },
  devtool: "source-map",
  cache: true,
  stats: "errors-only",
};

//###############################################################################
// Utilities

const logTask = (task, ...args) => log(`[${colors.yellow(task)}]`, ...args);

const command = async (cmd) => {
  const { stdout } = await execAsync(cmd, { cwd: __dirname });
  return stdout.trim();
};

const versionInfo = async () => {
  const [branch, hash, build] = await Promise.all([
    command("git rev-parse --abbrev-ref HEAD"),
    command("git describe --always --dirty"),
    command("git rev-list --count HEAD"),
  ]);

  return {
    branch: branch,
    hash: hash.replace("-dirty", ""),
    build,
    date: Math.floor(Date.now() / 1000),
  };
};

const webpackDev = (name, config) => {
  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) return reject(err);
      logTask(name, colors.green("All ok"));
      resolve();
    });
  });
};

//###############################################################################
// Gulp tasks

export const lint = () =>
  gulp
    .src([
      "./framer/**/*.coffee",
      "!./framer/Version.coffee.template",
      "./test/tests/**",
      "./test/tests.coffee",
      "./gulpfile.coffee",
      "scripts/site.coffee",
    ])
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());

export const version = async () => {
  const info = await versionInfo();
  logTask("version", `${info.branch}/${info.hash} @${info.build}`);

  return gulp
    .src("framer/Version.coffee.template")
    .pipe(template(info))
    .pipe(rename({ basename: "Version", extname: ".coffee" }))
    .pipe(gulp.dest("build"));
};

export const webpackDebug = async () => {
  await version();
  const config = {
    ...WEBPACK,
    mode: "development",
    output: {
      filename: "build/framer.debug.js",
      sourceMapFilename: "[file].map?hash=[hash]",
    },
  };
  await webpackDev("webpack:debug", config);
  await command(`cp build/framer.debug.* '${DEBUG_TARGET}/framer/'`);
};

export const webpackRelease = async () => {
  await version();
  const config = {
    ...WEBPACK,
    mode: "production",
    output: {
      filename: "build/framer.js",
      sourceMapFilename: "[file].map",
      pathinfo: false,
    },
    optimization: {
      minimize: true,
    },
  };
  await webpackDev("webpack:release", config);
};

export const webpackTests = async () => {
  await webpackDebug();
  const config = {
    ...WEBPACK,
    entry: "./test/tests.coffee",
    output: {
      filename: "test/phantomjs/tests.js",
    },
    mode: "development",
  };
  await webpackDev("webpack:tests", config);
};

export const webpackCoverage = async () => {
  await version();
  const config = {
    ...WEBPACK,
    entry: "./build/instrumented/Framer.js",
    output: {
      filename: "build/framer.debug.js",
    },
    mode: "development",
  };
  await webpackDev("webpack:coverage", config);
};

export const test = gulp.series(webpackTests, lint, () =>
  gulp.src("test/phantomjs/index.html").pipe(
    mochaPhantomJS({
      reporter: "dot",
      phantomjs: {
        viewportSize: { width: 400, height: 300 },
        useColors: true,
        loadImages: false,
      },
    })
  )
);

export const coverage = gulp.series(
  version,
  webpackCoverage,
  webpackTests,
  () => {
    const coverageFile = "build/coverage/coverage.json";
    return gulp
      .src("test/phantomjs/index.html")
      .pipe(
        mochaPhantomJS({
          reporter: "dot",
          phantomjs: {
            hooks: "mocha-phantomjs-istanbul",
            coverageFile,
            viewportSize: { width: 400, height: 300 },
            useColors: true,
            loadImages: false,
          },
        })
      )
      .on("finish", () => {
        gulp.src(coverageFile).pipe(
          istanbulReport({
            reporterOpts: { dir: "./build/coverage" },
            reporters: [
              "text",
              { name: "lcov", file: "lcov.info" },
              { name: "json", file: "coverage-final.json" },
              { name: "clover", file: "clover.xml" },
            ],
          })
        );
        console.log("done");
      });
  }
);

export const watch = gulp.series(test, () =>
  gulp.watch(
    ["./*.coffee", "framer/**", "test/tests/**", "!Version.coffee"],
    test
  )
);

// Default task
export default watch;
