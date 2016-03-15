
var Path = require("path");

function escape(pattern) {
    return pattern.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&");
}

function globToRegExp(pattern) {
    var inner = pattern.replace(
        /(\*\*\/)|(\*)|(\?)|(.)/g,
        function (_, ss, s, q, other) {
            if (ss) {
                return "([^/\\\\]*(?:/|\\\\))*";
            } else if (s) {
                return "[^/\\\\]*?";
            } else if (q) {
                return "[^/\\\\]";
            } else {
                return escape(other);
            }
        }
    );
    var outer = new RegExp("^" + inner + "$");
    return outer;
}

function testRegExp(expression) {
    return function (text) {
        return expression.test(text);
    };
}

exports.compileGlob = compileGlob;
function compileGlob(pattern) {
    return testRegExp(globToRegExp(pattern));
}

exports.compileGlobs = compileGlobs;
function compileGlobs(patterns) {
    var test = returnFalse;
    patterns.forEach(function (pattern) {
        test = composeOr(test, compileGlob(pattern));
    });
    return test;
}

exports.returnFalse = returnFalse;
function returnFalse() {
    return false;
}

exports.composeOr = composeOr;
function composeOr(a, b) {
    return function () {
        return a.apply(this, arguments) || b.apply(this, arguments);
    };
}

var isHidden = testRegExp(globToRegExp("**/.*"));

exports.makeFilter = makeFilter;
function makeFilter(location, excludeGlobs) {
    var exclude = isHidden;
    (excludeGlobs || []).forEach(function (pattern) {
        exclude = composeOr(exclude, testRegExp(globToRegExp(pattern)));
    });
    return function (name, stat) {
        if (Path.basename(name) === "node_modules") {
            return null;
        } else if (exclude(Path.relative(location, name))) {
            if (stat.isDirectory()) {
                return null;
            } else {
                return false;
            }
        } else if (stat.isDirectory()) {
            return false;
        } else {
            return true;
        }
    };
}

