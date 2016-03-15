
var URL = require("url2");

// assigns a build location to each package and file
module.exports = relocate;
function relocate(appPackage, config) {
    var packages = appPackage.packages;

    // app package
    appPackage.buildLocation = URL.resolve(
        config.buildLocation,
        appPackage.config.name + config.delimiter + appPackage.hash + "/"
    );
    // all other packages
    Object.forEach(packages, function (package) {
        if (package.config.name !== appPackage.config.name) {
            package.buildLocation = URL.resolve(
                appPackage.buildLocation,
                "packages/" +
                    package.config.name +
                    config.delimiter +
                    package.hash + "/"
            );
        }

        // files
        Object.forEach(package.files, function (file, relativeLocation) {
            file.buildLocation = URL.resolve(package.buildLocation, relativeLocation);
        });
    });

}

