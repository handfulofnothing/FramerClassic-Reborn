/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
const _ = require("lodash");
const async = require("async");
const gulp = require("gulp");
const phantomjs = require("gulp-mocha-phantomjs");
const istanbulReport = require('gulp-istanbul-report');
const webpack = require("webpack");
const rename = require("gulp-rename");
const template = require("gulp-template");
const gutil = require("gulp-util");
const {exec} = require("child_process");
const coffeelint = require('gulp-coffeelint');

const DEBUG_TARGET = process.env.TARGET != null ? process.env.TARGET : "extras/Studio.framer";

//###############################################################################
// Base webpack config

const WEBPACK = {
	entry: "./framer/Framer.coffee",
	module: {
		loaders: [{test: /\.coffee$/, loader: "coffee-loader"}]
	},
	resolve: {
		extensions: ["", ".web.coffee", ".web.js", ".coffee", ".js"]
	},
	devtool: "sourcemap",
	cache: true,
	quiet: true
};

//###############################################################################
// Gulp tasks

gulp.task("watch", ["test"], () => gulp.watch(["./*.coffee", "framer/**", "test/tests/**", "!Version.coffee"], ["test"]));

gulp.task("test", ["webpack:tests", "lint"], () => gulp
    .src("test/phantomjs/index.html")
    .pipe(phantomjs({
        reporter: "dot",
        phantomjs: {
            viewportSize: {width: 400, height: 300},
            useColors: true,
            loadImages: false
        }
    })));

gulp.task('lint', () => gulp.src(["./framer/**/*.coffee", "!./framer/Version.coffee.template", "./test/tests/**", "./test/tests.coffee", "./gulpfile.coffee", "scripts/site.coffee"])
    .pipe(coffeelint())
    .pipe(coffeelint.reporter()));

gulp.task("version", callback => versionInfo(function(info) {

    // If we are on the wercker platform, we need to get the branch
    // name from the env variables and remove the dirty from version.
    if (process.env.WERCKER_GIT_BRANCH) {
        info.branch = process.env.WERCKER_GIT_BRANCH;
        info.hash = info.hash.replace("-dirty", "");
    }

    log("version", `${info.branch}/${info.hash} @${info.build}`);

    const task = gulp.src("framer/Version.coffee.template")
        .pipe(template(info))
        .pipe(rename({
            basename: "Version",
            extname: ".coffee"
        }))
        .pipe(gulp.dest("build"));

    return callback(null, task);
}));

//###############################################################################
// Webpack tasks

gulp.task("webpack:debug", ["version"], function(callback) {

	const config = _.extend(WEBPACK, {
		debug: true,
		output: {
			filename: "build/framer.debug.js",
			sourceMapFilename: "[file].map?hash=[hash]"
		}
	}
	);

	return webpackDev("webpack:debug", config, function() {
		command(`cp build/framer.debug.* '${DEBUG_TARGET}/framer/'`);
		return callback();
	});
});

gulp.task("webpack:release", ["version"], function(callback) {

	const config = _.extend(WEBPACK, {
		output: {
			filename: "build/framer.js",
			sourceMapFilename: "[file].map",
			pathinfo: false
		},
		plugins: [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				mangle: false,
				compress: {warnings: true}
			})
		]
	});

	return webpackDev("webpack:release", config, callback);
});

gulp.task("webpack:tests", ["webpack:debug"], function(callback) {

	const config = _.extend(WEBPACK, {
		entry: "./test/tests.coffee",
		output: {
			filename: "test/phantomjs/tests.js"
		}
	}
	);
	({debug: true});

	return webpackDev("webpack:tests", config, callback);
});


gulp.task("webpack:coverage", ["version"], function(callback) {

	const config = _.extend(WEBPACK, {
		entry: "./build/instrumented/Framer.js",
		output: {
			filename: "build/framer.debug.js"
		},
		debug: true
	}
	);

	return webpackDev("webpack:coverage", config, callback);
});

gulp.task("coverage", ["version", "webpack:coverage", "webpack:tests"], function() {
	const coverageFile = "build/coverage/coverage.json";
	return gulp
		.src("test/phantomjs/index.html")
		.pipe(phantomjs({
			reporter: "dot",
			phantomjs: {
				hooks: "mocha-phantomjs-istanbul",
				coverageFile,
				viewportSize: {width: 400, height: 300},
				useColors: true,
				loadImages: false
			}
		}))
		.on("finish", function() {
			gulp.src(coverageFile)
				.pipe(istanbulReport({
					reporterOpts: {
						dir: './build/coverage'
					},
					reporters: [
						'text',
						{'name': 'lcov', file: 'lcov.info'},
						{'name': 'json', file: 'coverage-final.json'},
						{'name': 'clover', file: 'clover.xml'},
					]
				}));
			return console.log("done");
	});
});



//###############################################################################
// Utilities

var log = (task, ...args) => gutil.log(`[${gutil.colors.yellow(task)}]`, ...Array.from(args));

var command = (cmd, cb) => exec(cmd, {cwd: __dirname}, (err, stdout, stderr) => typeof cb === 'function' ? cb(null, stdout.split("\n").join("")) : undefined);

var webpackDev = function(name, config, callback) {
	if (webpackDev._instances == null) { webpackDev._instances = {}; }
	if (webpackDev._instances[name] == null) { webpackDev._instances[name] = webpack(_.clone(config)); }
	const webpackBuilder = webpackDev._instances[name];
	return webpackBuilder.run(function(err, stats) {
		if (err) { throw new gutil.PluginError(`${name}`, err); }
		log(name, gutil.colors.green("All ok"));
		return callback();
	});
};

var versionInfo = callback => async.series([
    cb => command("git rev-parse --abbrev-ref HEAD", cb), // branch
    cb => command("git describe --always --dirty", cb), // hash
    cb => command("git rev-list --count HEAD", cb) // build
], (err, results) => callback({
    branch: results[0],
    hash: results[1],
    build: results[2],
    date: Math.floor(Date.now() / 1000)
}));
