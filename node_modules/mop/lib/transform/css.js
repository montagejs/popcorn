
var rebase = require("../rebase");
var CSSO = require("csso");

module.exports = transformCss;
function transformCss(file, config) {
    file.utf8 = rebaseCss(file.utf8, file, config);
}

transformCss.rebase = rebaseCss;
function rebaseCss(css, file, config) {
    // Handle empty CSS files
    if (config.noCss || !css.trim()) {
        return css;
    }
    var ast;
    try {
        ast = CSSO.parse(css);
    } catch (exception) {
        config.out.warn("CSS parse error: " + file.path);
        config.out.warn(exception.message);
        return css;
    }

    var worklist = [ast];
    while (worklist.length) {
        var node = worklist.pop(), quote;
        if (node[0] === "uri") {
            var value = node[1], uri;
            if (value[0] === "raw") {
                uri = value[1];
                quote = "";
            } else if (value[0] === "string") {
                // remove quotes (first and last character)
                quote = value[1].substring(0,1);
                uri = value[1].substring(1, value[1].length - 1);
                
                // turn quoted URIs into unquoted as special characters are
                // escaped by rebase
                node[1] = value = ["raw"];
            } else {
                config.out.warn("Unknown URI type:", value);
                continue;
            }

            value[1] = quote+rebase(uri, file, config)+quote;
        }

        for (var i = node.length - 1; i >= 0; i--) {
            if (Array.isArray(node[i])) {
                worklist.push(node[i]);
            }
        }
    }

    try {
        ast = CSSO.compress(ast);
    } catch (error) {
        config.out.warn("CSS compression error: " + file.path);
        config.out.warn(error.message);
    }

    try {
        ast = CSSO.cleanInfo(ast);
    } catch (error) {
        config.out.warn("CSS clean info error: " + file.path);
        config.out.warn(error.message);
    }

    return CSSO.translate(ast);
}

