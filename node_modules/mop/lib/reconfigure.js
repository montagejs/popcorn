
var URL = require("url2");

// Properties not to include in the built package.json files
var BLACKLIST = [
    // `readme` is added to the package.json of npm published packages
    "readme"
];

module.exports = reconfigure;
function reconfigure(appPackage) {
    // reconfigure. build locations must be computed first
    Object.forEach(appPackage.packages, reconfigurePackage);
}

function reconfigurePackage(package) {
    var config = package.config;
    var description = package.packageDescription;
    var reconfig = Object.clone(description);

    BLACKLIST.forEach(function (property) {
        if (property in reconfig) {
            reconfig[property] = void 0;
        }
    });

    reconfig.hash = package.hash;

    if (description.directories && description.directories.lib !== "lib") {
        reconfig.directories = reconfig.directories || {};
        reconfig.directories.lib = description.directories.lib;
    }
    var mappings = reconfig.mappings = {};
    Object.keys(config.mappings).forEach(function (name) {
        var mapping = package.packages[config.mappings[name].location];
        mappings[name] = {
            name: mapping.config.name,
            hash: mapping.hash.slice(0, 7),
            location: URL.relative(package.buildLocation, mapping.buildLocation)
        };
    });
    reconfig.production = true;
    reconfig.useScriptInjection = true;

    if (!package.files["package.json"]) {
        throw new Error("Can't find package.json in " + JSON.stringify(package.location));
    }
    package.files["package.json"].utf8 = JSON.stringify(reconfig);
}

