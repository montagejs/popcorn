
require("collections/shim"); // Object.map, et al
var File = require("./file");
var URL = require("url2");

module.exports = appcache;
function appcache(appPackage, config) {
    var appcacheConfig = appPackage.packageDescription.appcache;
    if (!appcacheConfig) {
        return;
    }
    // coerce the appcache to {fallback, network}
    if (typeof appcacheConfig === "boolean") {
        appcacheConfig = {};
    }

    var locations = Object.keys(config.files).sort();
    var urls = locations.map(function (location) {
        var file = config.files[location];
        return URL.relative(appPackage.buildLocation, file.buildLocation);
    });

    var lines = ["CACHE MANIFEST"];
    if (appPackage.packageDescription.version) {
        lines.push("#version " + appPackage.packageDescription.version);
    }
    lines.push("#hash " + appPackage.hash);

    // MANIFEST:
    lines.push.apply(lines, urls);

    // FALLBACK:
    var fallback = appcacheConfig.fallback || {};
    if (Object.keys(fallback).length) {
        lines.push("");
        lines.push("FALLBACK:");
        lines.push.apply(
            lines,
            Object.keys(fallback).map(function (from) {
                return from + " " + fallback[from];
            })
        );
    }

    // NETWORK:
    // ignore provided network lines
    lines.push("");
    lines.push("NETWORK:");
    lines.push("*");

    // construct the file
    var content = lines.map(function (line) {
        return line + "\n";
    }).join("");
    var file = new File({
        fs: config.fs,
        utf8: content,
        buildLocation: URL.resolve(appPackage.buildLocation, "manifest.appcache")
    });
    config.out.log("Appcache manifest: " + file.buildLocation);
    config.files[file.buildLocation] = file;
}

