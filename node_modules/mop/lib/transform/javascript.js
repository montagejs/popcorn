
var MontageRequire = require("mr/require");
var File = require("../file");
var minifyJavaScript = require("../minify-javascript");
var jshint = require("../jshint").JSHINT;
var relativeToWorkingLocation = require("../util").relativeToWorkingLocation;

module.exports = transformJavaScript;
function transformJavaScript(file, config) {

    file.utf8 = file.utf8.replace(/^#!/, "//#!");

    if (config.lint && file.package.isMainPackage() && !jshint(file.utf8)) {
        config.out.warn("jshint " + relativeToWorkingLocation(file.location));
    }

    var id = file.relativeLocation.replace(/\.js$/, "");
    var dependencies = MontageRequire.parseDependencies(file.utf8);

    if (file.package.isMainPackage()) {
        if (id.toLowerCase() !== id) {
            config.out.warn("Module file name should be all lower-case " + relativeToWorkingLocation(file.location));
        }
        dependencies.forEach(function (dependency) {
            if (dependency.toLowerCase() !== dependency) {
                config.out.warn("Module identifier " + JSON.stringify(dependency) + " should be lower-case in " + relativeToWorkingLocation(file.location));
            }
        });
    }

    var definedContent = (
        "montageDefine(" +
            JSON.stringify(file.package.hash) + "," +
            JSON.stringify(id) + "," +
            "{" +
                "dependencies:" + JSON.stringify(dependencies) + "," +
                "factory:function(require,exports,module){" +
                    file.utf8 +
                "\n}" +
            "}" +
        ")"
    );
    var definedFile = new File({
        fs: config.fs,
        utf8: definedContent,
        path: file.path ? file.path.replace(/\.js$/, ".load.js") : "",
        location: file.location.replace(/\.js$/, ".load.js"),
        relativeLocation: file.relativeLocation.replace(/\.js$/, ".load.js"),
        buildLocation: file.buildLocation.replace(/\.js$/, ".load.js"),
        package: file.package
    });
    config.files[definedFile.location] = definedFile;
    file.package.files[definedFile.relativeLocation] = definedFile;

    if (config.minify) {

        // minify original
        try {
            file.utf8 = minifyJavaScript(file.utf8, file.path);
        } catch (exception) {
            config.out.warn("JavaScript parse error in " + relativeToWorkingLocation(file.location) + ": " + exception.message);
        }

        // minify defined .load.js
        try {
            definedFile.utf8 = minifyJavaScript(definedFile.utf8, definedFile.path);
        } catch (exception) {
            config.out.warn("JavaScript parse error in " + definedFile.path + ": " + exception.message);
        }

    }
}

