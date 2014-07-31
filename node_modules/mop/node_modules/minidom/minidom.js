var Parser = require("parse5").Parser;
var Handler = require("./handler");
var dom = require("./dom");

module.exports = function minidom(html) {
    if (!html) {
        html = "<!doctype html><html><head></head><body></body></html>";
    }

    var handler = new Handler(dom);
    var parser = new Parser(handler);

    parser.parse(html);

    return handler.document;
};
