
var File = require("../file");
var minifyJavaScript = require("../minify-javascript");
var relativeToWorkingLocation = require("../util").relativeToWorkingLocation;

module.exports = transformJson;
function transformJson(file, config) {

    var definedContent = (
        'montageDefine(' +
            JSON.stringify(file.package.hash) + "," +
            JSON.stringify(file.relativeLocation) + "," +
            "{exports: " + file.utf8 + "}" +
        ')'
    );

    var definedFile = new File({
        fs: config.fs,
        utf8: definedContent,
        path: file.path + ".load.js",
        location: file.location + ".load.js",
        relativeLocation: file.relativeLocation + ".load.js",
        buildLocation: file.buildLocation + ".load.js",
        package: file.package
    });
    config.files[definedFile.location] = definedFile;
    file.package.files[definedFile.relativeLocation] = definedFile;

    if (config.minify) {

        // minify original json
        try {
            file.utf8 = JSON.stringify(JSON.parse(file.utf8));
        } catch (exception) {
            if (exception instanceof SyntaxError) {
                config.out.warn("JSON parse error in " + relativeToWorkingLocation(file.location) + ": " + exception.message);
            } else {
                throw exception;
            }
        }

        // minify created json.load.js
        try {
            definedFile.utf8 = minifyJavaScript(definedFile.utf8, definedFile.path);
        } catch (exception) {
            config.out.warn("JSON parse error in " + definedFile.path + ": " + exception.message);
        }
    }
}

