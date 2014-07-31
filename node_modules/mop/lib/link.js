var URL = require("url2");
var Location = require("./location");

module.exports = link;
function link(package, config) {
    var linkLocation = URL.resolve(config.buildLocation, package.config.name + "/");
    var buildPath = Location.toPath(package.buildLocation).replace(/\/$/, "");
    var linkPath = Location.toPath(linkLocation).replace(/\/$/, "");

    return config.fs.remove(linkPath)
    .catch(function () {})
    .then(function () {
        return config.fs.symbolicCopy(buildPath, linkPath)
        .catch(function (error) {
            // Can't create symlinks on windows, so just copy the directory
            if (error.code === "EPERM") {
                return config.fs.copyTree(buildPath, linkPath);
            } else {
                throw error;
            }
        });
    })
    .then(function () {
        config.out.log(buildPath);
        return buildPath;
    });
}

