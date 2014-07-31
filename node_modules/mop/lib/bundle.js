
// must come first
module.exports = bundle;

require("collections/shim");
var Promise = require("q");
var URL = require("url2");
var forEach = require("./for-each");
require("./shim-minidom"); // FIXME
var Node = require("minidom/dom").Node;
var minifyJavaScript = require("./minify-javascript");
var File = require("./file");
var Location = require("./location");

var bundleMrHtml = require("./bundle/mr");
var bundleMontageHtml = require("./bundle/montage");

function bundle(appPackage, config) {

    return Promise.fcall(function () {
        // replace montage.js and mr/bootstrap.js references with bundles
        return forEach(Object.values(appPackage.files), function (file) {
            var extension = config.fs.extension(Location.toPath(file.location));
            if (extension === ".html") {
                config.out.status("Bundling", file.location);
                return bundleHtml(file, config);
            }
        });
    })
    .then(function () {
        // handle package.json-specified serialization entry points
    })
    .then(function () {
        config.out.status();
    });
}

// searches for oppotunities to bundle, then uses the appropriate bundler for
// either Montage or stand-alone Mr.
function bundleHtml(file, config) {
    var package = file.package;
    var montagePackage, montageLocation;
    if (package.hasPackage({name: "montage"})) {
        montagePackage = package.getPackage({name: "montage"});
        montageLocation = montagePackage.files['montage.js'].buildLocation;
    }
    var requirePackage, requireLocation;
    if (package.hasPackage({name: "mr"})) {
        requirePackage = package.getPackage({name: "mr"});
        requireLocation = requirePackage.files['bootstrap.js'].buildLocation;
    }

    var document;
    try {
        document = file.document;
    } catch (exception) {
        config.out.warn("HTML parse error: " + file.path);
        config.out.warn(exception.message);
        return;
    }

    var jobs = [];
    visit(document, function (element) {
        if (element.nodeType === Node.ELEMENT_NODE) {
            if (element.tagName === "SCRIPT") {
                if (element.hasAttribute("src")) {
                    var src = element.getAttribute("src");
                    var location = URL.resolve(file.buildLocation, src);
                    if (location === montageLocation) {
                        jobs.push(bundleMontageHtml.bind(
                            null,
                            element,
                            file,
                            config
                        ));
                    } else if (location === requireLocation) {
                        jobs.push(bundleMrHtml.bind(
                            null,
                            element,
                            file,
                            config
                        ));
                    }
                }
            }
        }
    });

    // executes jobs serially, to avoid excessive memory usage, overscheduling
    // the disk, and interleaving logs
    return forEach(jobs, Promise.fcall);
}

bundle.verifyPackageLocation = verifyPackageLocation;
function verifyPackageLocation(element, file, config) {
    // we already know the containing package.  verify the data-package or
    // data-auto-package if one exists.
    var packageLocation;
    if (element.hasAttribute("data-package")) {
        packageLocation = element.getAttribute("data-package");
        if (!/\/$/.test(packageLocation)) {
            packageLocation += "/";
        }
        packageLocation = URL.resolve(file.buildLocation, packageLocation);
        if (packageLocation !== file.package.buildLocation) {
            config.out.warn("Montage bootstrapping script reports innacurate data-package location.");
            config.out.warn("In file: " + file.path);
            config.out.warn("Expected: " + file.package.buildLocation);
            config.out.warn("Actual: " + packageLocation);
            // don't process this file; don't change the reference to it
            return element.getAttribute("src");
        }
    } else if (!element.hasAttribute("data-auto-package")) {
        // if this is the case, the package.json must be in the same directory
        packageLocation = URL.resolve(file.buildLocation, "./");
        if (packageLocation !== file.package.buildLocation) {
            config.out.warn("Montage bootstrapping script needs a data-package attribute.");
            config.out.warn("In file: " + file.path);
            config.out.warn("Expected: " + URL.relative(file.location, file.package.location));
            // continue processing this file since we already know the package
            // that contains the file.
        }
    }
}

bundle.collectPreloadBundles = collectPreloadBundles;
function collectPreloadBundles(loader, bundler, config) {
    var batches;
    var bundleConfig = bundler.packageDescription.bundle;
    if (bundleConfig == null || typeof bundleConfig === "boolean") {
        batches = [];
    } else if (Array.isArray(bundleConfig)) {
        batches = bundleConfig.map(function (batch) {
            if (typeof batch === "string") {
                return [[batch]];
            } else if (Array.isArray(batch)) {
                return batch.map(function (ids) {
                    if (typeof ids === "string") {
                        return [ids];
                    } else if (Array.isArray(ids)) {
                        return ids;
                    } else {
                        throw new Error(
                            "Every batch in package.json \"bundle\" array " +
                            "must be a module identifier or an array of " +
                            "identifiers."
                        );
                    }
                });
            } else {
                throw new Error(
                    "Every batch in package.json \"bundle\" array must be " +
                    "either a module identifier or array of module " +
                    "identifiers"
                );
            }
        });
    } else {
        throw new Error(
            "package.json \"bundle\" must be true or an array of bundle " +
            "module identifiers. Got: " + bundler.packageDescription.bundle
        );
    }

    var phases = [];
    // batches is an array of arrays of module identifiers.
    // each batch contains the seed modules for a loading phase.
    // this routine collects the transitive dependencies for each phase into
    // the phases array.
    return forEach(batches, function (batch) {
        return forEach(batch, function (ids) {
            return forEach(ids, function (id) {
                return loader.deepLoad(id)
                .fail(function (error) {
                    error.message = "Can't collect the dependencies of " + JSON.stringify(id) + " in package " + loader.location + " because " + error.message;
                    throw error;
                });
            });
        }).then(function () {
            var phase = collectBundle(loader, bundler, config);
            phases.push(phase);
        });
    })
    .then(function () {
        // phases is an array of arrays of strings (module texts).
        // each phase contains all the modules needed to be loaded in parallel
        // for that phase.
        // these need to be distributed into shards.
        return phases.map(function (phase) {
            return shardBundle(phase, loader.packageDescription.shard || loader.packageDescription.shards || 1);
        });
    });
}

bundle.collectBundle = collectBundle;
function collectBundle(loader, bundler, config, bundle) {
    bundle = bundle || [];

    // add any missing package.json loaders to the bundle
    Object.forEach(loader.packages, function (loaderPackage, location) {
        if (loaderPackage.bundled) {
            return;
        }
        loaderPackage.bundled = true;
        var bundlerPackage = bundler.getPackage(location);
        bundle.push(bundlerPackage.files['package.json.load.js'].utf8);
    });

    Object.forEach(loader.packages, function (loaderPackage, location) {
        var bundlerPackage = bundler.getPackage(location);
        Object.forEach(loaderPackage.modules, function (loaderModule, id) {
            // add any missing modules to the bundle
            if (loaderModule.bundled) {
                return;
            }
            loaderModule.bundled = true;
            if (loaderModule.location !== void 0 && loaderModule.type === "javascript") {
                var relocation = URL.resolve(bundlerPackage.location, id + '.load.js');
                if (config.files[relocation]) {
                    bundle.push(config.files[relocation].utf8);
                }
            }
        });
    });

    return bundle;
}

bundle.createPreloadBundles = createPreloadBundles;
function createPreloadBundles(phases, file, config) {
    return phases.map(function (phase, phaseNumber) {
        return phase.map(function (shard, shardNumber) {
            var shardFile = createBundle(shard, file, config, 'bundle-' + (phaseNumber + 1) + '-' + shardNumber);
            // TODO consider changing the protocol to "montageBundleLoaded("
            var path = URL.relative(URL.resolve(shardFile.relativeLocation, "./"), shardFile.relativeLocation);
            shardFile.utf8 += '\nbundleLoaded(' + JSON.stringify(path) + ')';
            return shardFile;
        });
    });
}

bundle.createBundle = createBundle;
function createBundle(bundle, file, config, label) {
    if (label) {
        label = "." + label;
    } else {
        label = "";
    }

    bundle = bundle.join("\n;\n//*/\n");
    if (config.minify) {
        bundle = minifyJavaScript(bundle);
    }

    // add to the build products
    var relativeLocation = file.relativeLocation + label + '.js';
    var buildLocation = URL.resolve(file.package.buildLocation, relativeLocation);

    file = new File({
        fs: config.fs,
        utf8: bundle,
        buildLocation: buildLocation,
        relativeLocation: relativeLocation,
        package: file.package
    });

    // config.files and buildLocation are the only important values for the writer
    config.files[buildLocation] = file;

    return file;
}

// this is an optimal packing algorithm that takes an array of module texts and
// generates a two dimensional array of module texts.  each of the shards will
// be as close to evenly distributed as possible.
function shardBundle(bundle, shardCount) {
    var shards = [];
    var i;
    for (i = 0; i < shardCount; i++) {
        shards.push({length: 0, parts: []});
    }
    bundle.sort(byDescendingLength);
    for (i = 0; i < bundle.length; i++) {
        var part = bundle[i];
        shards[0].parts.push(part);
        shards[0].length += part.length;
        shards.sort(byLength);
    }
    return shards.filter(function (shard) {
        return shard.length;
    }).map(function (shard) {
        return shard.parts;
    });
}

var byLength = function (a, b) {
    return a.length - b.length;
};

var byDescendingLength = function (a, b) {
    return -(a.length - b.length);
};

function visit(element, visitor) {
    visitor(element);
    element = element.firstChild;
    while (element) {
        visit(element, visitor);
        element = element.nextSibling;
    }
}

