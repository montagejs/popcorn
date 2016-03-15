#!/usr/bin/env node
/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.
3-Clause BSD License
</copyright> */

var URL = require("url2");
var Path = require("path");
var build = require("./lib/build");
var spinner = require("./lib/spinner");
var Location = require("./lib/location");

/**
 * Optimize the package at the given location.
 * @function
 * @param {string} location An absolute path to a directory containing an app
 * to optimize.
 * @param {Object}  [config] Configuration for optimization.
 * @param {string}  [config.buildLocation="builds"] An absolute or relative path for a
 * directory to generate the optimized files in.
 * @param {boolean} [config.minify=true] Whether to minify the files.
 * @param {boolean} [config.lint=false] Whether to lint the files and output
 * warnings.
 * @param {boolean} [config.noCss=true] Whether to optimize CSS. Cannot handle
 * some modern CSS, and so disabled by default.
 * @param {string}  [config.delimiter="@"] Symbol to use between the package
 * name and the package hash, e.g. my-app@f7e7db2
 * @param {Object}  [config.out=spinner] An object to use for logging.
 * @param {Function} [config.out.log] Variadic function that outputs a normal message.
 * @param {Function} [config.out.warn] Variadic function that outputs a warning.
 * @param {Function} [config.out.status] Variadic function that outputs a status
 * message. These messages are temporary, high volume and should not be
 * permanently displayed. If called with no arguments it should clear the
 * displayed status.
 * @return {Promise.<string>} A promise for the absolute path to the directory
 * containing the built app.
 */
module.exports = optimize;
function optimize(location, config) {
    config = config || {};

    location =  Location.fromPath(location, true);

    if (config.out) {
        // Fill in any missing output functions
        if (!config.out.log) {
            config.out.log = noop;
        }
        if (!config.out.warn) {
            config.out.warn = noop;
        }
        if (!config.out.status) {
            config.out.status = noop;
        }
    }

    // mainly here so that fs can be mocked out for testing
    var fs = config.fs || require("q-io/fs");
    function read(location) {
        var path = Location.toPath(location);
        return fs.read(path);
    }

    return build(location, {
        // configurable
        buildLocation: URL.resolve(location, (config.buildLocation || "builds") + "/"),
        minify:     config.minify !== void 0 ? !!config.minify      : true,
        lint:       config.lint !== void 0 ? !!config.lint          : false,
        noCss:      config.noCss !== void 0 ? !!config.noCss        : false,
        delimiter:  config.delimiter !== void 0 ? config.delimiter  : "@",
        out:        config.out                                      || spinner,

        fs:         fs,
        read:       read,

        // non-configurable
        overlays: ["browser"],
        production: true
    });

    // Once implemented but currently disabled options:
    //incremental: true,
    //bundle: !!bundle,
    //copyright: !!copyright,
    //shared: !!shared,
    //manifest: !!manifest,
    //force: !!force,
}

function usage() {
    console.log("Usage: mop [options] [<application> ...]");
    console.log("");
    //console.log("    -f --force");
    //console.log("    -t --target ./builds/");
    //console.log("    -s --shared for overlapping dependencies to be shared");
    console.log("    -o --optimize 0 to disable optimizations");
    console.log("    -l --lint to enable linter warnings");
    //console.log("    -c --copyright to enable copyright message check");
    //console.log("    -m --manifest to force an application cache to be made");
    console.log("    -d --delimiter @ to use a different symbol");
    console.log("       --no-css to disable CSS compression.");
    console.log("");
}

function version() {
    var config = require("./package.json");
    console.log(config.title + " version " + config.version);
}

function main() {
    var Options = require("optimist");

    var argv = Options
    .boolean([
        //"f", "force",
        //"l", "lint",
        //"c", "copyright",
        //"s", "shared",
        //"m", "manifest",
        //"b", "bundle",
        "h", "help",
        "v", "version",
        "css"
    ])
    .default("optimize", "1")
    .alias("o", "optimize")
    .default("delimiter", "@")
    .alias("d", "delimiter")
    .default("css", true)
    .argv;

    if (argv.h || argv.help) {
        return usage();
    }
    if (argv.v || argv.version) {
        return version();
    }

    //var force = argv.f || argv.force;
    //var shared = argv.s || argv.shared;
    //var manifest = argv.m || argv.manifest;
    //var copyright = argv.c || argv.copyright;
    //var bundle = argv.b || argv.bundle;

    var location = argv._.length ? argv._[0] : ".";
    // convert path to locations
    location = Path.resolve(process.cwd(), location);

    optimize(location, {
        buildLocation: argv.t || argv.target,
        minify: argv.optimize > 0,
        lint: argv.l || argv.lint,
        noCss: !argv.css,
        delimiter: argv.delimiter
    })
    .done();
}

function noop() {}

if (module === require.main) {
    main();
}

