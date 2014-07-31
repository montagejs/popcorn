var Path = require("path");
var URL = require("url2");

exports.fromPath = function (path, isDirectory) {
	var location =  URL.format({
        protocol: "file:",
        slashes: true,
        host: drive(path),
        pathname: pathname(isDirectory ? directory(path) : path)
    }).replace(/\\/g, "/");

	return location;
};

exports.toPath = function (location) {
    var parts = URL.parse(location);
    var path = parts.pathname;
    if (parts.hostname) {
        path = parts.hostname.toUpperCase() + ":" + path;
    }

    return path;
};

var DRIVE_RE = /^([a-z]):(\/|\\)/i;
function drive(path) {
    var match = DRIVE_RE.exec(path);
    if (match) {
        return match[1].toLowerCase();
    }
}

function pathname(path) {
    if (path.length) {
        var match = DRIVE_RE.exec(path);
        if (match) {
            path = path.replace(match[0], "");
        }
        return path;
    } else {
        return "." + Path.sep;
    }
}

var DIRECTORY_RE = /(?:\/|\\)$/;
function directory(path) {
    if (path.length) {
        if (DIRECTORY_RE.test(path)) {
            return path;
        } else {
            return path + Path.sep;
        }
    } else {
        return "." + Path.sep;
    }
}

