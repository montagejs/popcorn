"use strict";

const path = require("path"),
    mop = require("mop");

var srcPath = path.resolve(__dirname),
	distPath = path.resolve(__dirname, './dist');

mop(srcPath, {
	minify: true,
	buildLocation: distPath
}).then(function (buildPath) {
    console.log(buildPath);
}, function (err) {
    console.error(err);
})