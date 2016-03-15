
var URL = require("url2");

module.exports = rebase;
function rebase(relativeLocation, source, config) {
    if (relativeLocation === "") {
        return relativeLocation;
    }
    if (relativeLocation === "#") {
        return relativeLocation;
    }
    var parsed = URL.parse(relativeLocation);
    // to not rebase fully qualified urls, unless they are fully qualified file
    // urls
    if (parsed.protocol != null && parsed.protocol !== "file:") {
        return relativeLocation;
    }
    // do not rebase urls qualified from the root of the domain
    if (parsed.root) {
        return relativeLocation;
    }
    var location = URL.resolve(source.location, relativeLocation);
    if (!config.files[location]) {
        return relativeLocation;
    }
    var target = config.files[location];
    parsed.pathname = URL.relative(source.buildLocation, target.buildLocation);
    return URL.format({
        pathname: URL.relative(source.buildLocation, target.buildLocation),
        query: parsed.query,
        search: parsed.search
    });
}

