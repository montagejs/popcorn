
var Bundle = require("../bundle");
var MontageBootstrap = require("montage"); // perhaps make this montage/bootstrap in the future
var URL = require("url2");
var Promise = require("q");

module.exports = bundleMontageHtml;
// returns new script location
function bundleMontageHtml(element, file, config) {
    Bundle.verifyPackageLocation(element, file, config);
    return loadMontageScript(element, file, config)
    .then(function (loader) {
        var bootstrapBundle = collectMontageBootstrapBundle(loader, file.package, config);
        return Bundle.collectPreloadBundles(loader, file.package, config)
        .then(function (preloadPhases) {
            var preloadBundles = Bundle.createPreloadBundles(preloadPhases, file, config);
            bundleMontageScript(bootstrapBundle, preloadBundles, element, file, config);
        });
    });
}

function bundleMontageScript(bootstrapBundle, preloadFiles, element, file, config) {

    // inject the preloading plan into the bootstrapping bundle
    var plan = preloadFiles.map(function (phase) {
        return phase.map(function (shard) {
            config.out.log("Bundle:", shard.buildLocation, shard.utf8.length, "bytes");
            return URL.relative(file.buildLocation, shard.buildLocation);
        });
    });
    bootstrapBundle.unshift("BUNDLE=" + JSON.stringify(plan) + ";");

    // create and add the file to the build products
    var bundleFile = Bundle.createBundle(bootstrapBundle, file, config, 'bundle-0');

    config.out.log("Bundle:", bundleFile.buildLocation, bundleFile.utf8.length, "bytes (montage bootstrap)");

    // revise the HTML such that it loads the bundle script instead of the
    // montage bootstrapping script, and provide all the information it would
    // be able to infer in development mode using data attributes.
    var applicationPackage = file.package;
    var montagePackage = file.package.getPackage({name: "montage"});
    var promisePackage = file.package.getPackage({name: "q"});
    var toBundle = URL.relative(file.buildLocation, bundleFile.buildLocation);
    var toMontage = URL.relative(file.buildLocation, montagePackage.buildLocation);
    var toPromise = URL.relative(file.buildLocation, promisePackage.buildLocation);

    element.setAttribute("src", toBundle);
    // data-montage is usually inferred by the montage.js script src
    element.setAttribute("data-montage-location", toMontage);
    // hashes are necessary in production to connect define() calls from the
    // package.json.load.js files with the corresponding package
    element.setAttribute("data-promise-location", toPromise);

    element.setAttribute("data-montage-hash", montagePackage.hash);
    element.setAttribute("data-promise-hash", promisePackage.hash);
    element.setAttribute("data-application-hash", applicationPackage.hash);

}

function loadMontageScript(element, file, config) {
    // emulates bootstrapping in montage.js, to reveal which modules will be
    // needed in the primary bundle.

    // instantiate a new package loader so we can track which files would be
    // loaded at each stage of bundling
    var applicationLocation = file.package.location;
    var montageLocation = file.package.getPackage({name: "montage"}).location;
    return MontageBootstrap.loadPackage(applicationLocation, config)
    .then(function (applicationPackage) {
        return applicationPackage.loadPackage(montageLocation)
        .then(function (montagePackage) {
            return Promise.all([
                "core/core",
                "core/event/event-manager",
                "core/serialization/deserializer/montage-reviver",
                "core/logger"
            ].map(montagePackage.deepLoad));
        })
        .then(function () {
            return Promise.fcall(function () {
                return applicationPackage.deepLoad(file.relativeLocation)
                .fail(function (error) {
                    error.message = "Can't find dependencies of HTML application " + JSON.stringify(file.location) + " because " + error.message;
                    throw error;
                });
            })
            .then(function () {
                if (element.hasAttribute("data-module")) {
                    return applicationPackage.deepLoad(element.getAttribute("data-module"))
                    .fail(function (error) {
                        error.message = "Can't find dependencies of HTML application data-module " + JSON.stringify(element.getAttribute("data-module")) + " because " + error.message;
                        throw error;
                    });
                }
            })
            .thenResolve(applicationPackage);
        });
    });
}

function collectMontageBootstrapBundle(loader, bundler, config) {
    var montagePackage = bundler.getPackage({name: "montage"});
    var requirePackage = bundler.getPackage({name: "mr"});
    var promisePackage = bundler.getPackage({name: "q"});

    var bundle = [
        montagePackage.files["montage.js"].utf8,
        requirePackage.files["require.js"].utf8,
        requirePackage.files["browser.js"].utf8,
        promisePackage.files["q.js"].utf8
    ];

    // some of the modules used in bootstrapping get injected into the run-time
    // during the same process.  to avoid including duplicates of these
    // "modules", mark them as already bundled.
    loader.getPackage({name: "montage"}).getModuleDescriptor("core/promise").bundled = true;
    loader.getPackage({name: "q"}).getModuleDescriptor("q").bundled = true;

    return Bundle.collectBundle(loader, bundler, config, bundle);
}

// returns the initial bundle location, suitable for embedding as a script in a
// page
// function bundleMontageSerialization(serialization, appPackage, config) {
//     // TODO
// }

