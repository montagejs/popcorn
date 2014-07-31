var URL = require("url2");

var currentLocation = URL.format({
    protocol: "file:",
    slashes: true,
    pathname: process.cwd() + "/"
});

exports.relativeToWorkingLocation = relativeToWorkingLocation;
function relativeToWorkingLocation(location) {
    return URL.relative(currentLocation, location);
}
