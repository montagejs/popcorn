
var Promise = require("q");

// stages
var read = require("./read");
var relocate = require("./relocate");
var reconfigure = require("./reconfigure");
var transform = require("./transform");
var bundle = require("./bundle");
var appcache = require("./appcache");
var write = require("./write");
var link = require("./link");

module.exports = build;
function build(location, config) {
    // needs seed and overlays
    return read(location, config)
    // produces files and hashes
    .then(function (package) {
        return Promise.fcall(function () {
            return relocate(package, config);
            // creates buildLocations for all packages and files
        })
        .then(function () {
            // needs the delimiter, buildLocation, and hashes
            return reconfigure(package, config);
            // rewrites and rebases package.jsons
        })
        .then(function () {
            // converts json, js, and html modules to script-injection format
            // minifies html, scripts, and html in general (not just modules).
            // package.json's must be reconfigured first
            return transform(package, config);
        })
        .then(function () {
            return bundle(package, config);
        })
        .then(function () {
            // TODO collects garbage
            // respect includes
        })
        .then(function () {
            // creates a manifest.appcache
            return appcache(package, config);
        })
        .then(function () {
            return write(package, config);
        })
        .then(function () {
            return link(package, config);
        });
    });
}

