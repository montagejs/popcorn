"use strict";

require("collections/shim");
var Map = require("collections/map");
var Promise = require("q");
var Location = require("./location");

module.exports = transform;
function transform(appPackage, config) {
    var spinner = function() { config.out.status.apply(config.out, ["Processing"].concat(Array.prototype.slice.call(arguments))); };
    return Promise.all(Object.map(config.files, function (file) {
        spinner(file.path);
        return transformFile(file, config, spinner);
    }))
    .then(function () {
        config.out.status();
    });
}

transform.extensions = new Map({
    ".html": require("./transform/html"),
    ".css": require("./transform/css"),
    ".json": require("./transform/json"),
    ".js": require("./transform/javascript")
});

function transformFile(file, config, spinner) {
    var extension = config.fs.extension(Location.toPath(file.location));
    //if (file.relativeLocation === "package.json") {
    if (transform.extensions.has(extension)) {
        return transform.extensions.get(extension)(file, config, spinner);
    }
}

