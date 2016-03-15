
var Bundle = require("../bundle");
var MrBootstrap = require("mr/bootstrap-node");
var URL = require("url2");

module.exports = bundleMrHtml;
// returns new script location
function bundleMrHtml(element, file, config) {
    Bundle.verifyPackageLocation(element, file, config);
    return loadMrScript(element, file, config)
    .then(function (loader) {
        var bootstrapBundle = collectMrBootstrapBundle(loader, file.package, config);
        return Bundle.collectPreloadBundles(loader, file.package, config)
        .then(function (preloadPhases) {
            var preloadBundles = Bundle.createPreloadBundles(preloadPhases, file, config);
            bundleMrScript(bootstrapBundle, preloadBundles, element, file, config);
        });
    });
}

function loadMrScript(element, file, config) {

    if (!element.hasAttribute("data-module")) {
        throw new Error("Element needs data-module attribute in " + JSON.stringify(file.path));
    }

    var applicationLocation = file.package.location;

    return MrBootstrap.loadPackage(applicationLocation, config)
    .then(function (loader) {
        return loader.loadPackage({name: "mr"})
        .then(function (mrPackage) {
            return mrPackage.loadPackage({name: "q"});
        })
        .then(function () {
            return loader.deepLoad(element.getAttribute("data-module"));
        })
        .fail(function (error) {
            error.message = (
                "Can't find dependencies of Mr module in " +
                JSON.stringify(file.path) + " because " + error.message
            );
            throw error;
        })
        .thenResolve(loader);
    }, function (error) {
        error.message = (
            "Can't load package in " +
            JSON.stringify(file.path) + " because " + error.message
        );
        throw error;
    });
}

function collectMrBootstrapBundle(loader, bundler, config) {
    var requirePackage = bundler.getPackage({name: "mr"});
    var promisePackage = bundler.getPackage({name: "q"});

    var bundle = [
        requirePackage.files["bootstrap.js"].utf8,
        requirePackage.files["require.js"].utf8,
        requirePackage.files["browser.js"].utf8,
        promisePackage.files["q.js"].utf8
    ];

    // some of the modules used in bootstrapping get injected into the run-time
    // during the same process.  to avoid including duplicates of these
    // "modules", mark them as already bundled.
    loader.getPackage({name: "q"}).getModuleDescriptor("q").bundled = true;

    return Bundle.collectBundle(loader, bundler, config, bundle);
}

function bundleMrScript(bootstrapBundle, preloadFiles, element, file, config) {

    // inject the preloading plan into the bootstrapping bundle
    var plan = preloadFiles.map(function (phase) {
        return phase.map(function (shard) {
            config.out.log("Bundle:", shard.buildLocation, shard.utf8.length, "bytes");
            return URL.relative(file.buildLocation, shard.buildLocation);
        });
    });
    bootstrapBundle.unshift("preload=" + JSON.stringify(plan) + ";\n");

    // create and add the file to the build products
    var bundleFile = Bundle.createBundle(bootstrapBundle, file, config, 'bundle-0');

    config.out.log("Bundle:", bundleFile.buildLocation, bundleFile.utf8.length, "bytes (mr bootstrap)");

    // revise the HTML such that it loads the bundle script instead of the
    // montage bootstrapping script, and provide all the information it would
    // be able to infer in development mode using data attributes.
    var applicationPackage = file.package;
    var requirePackage = file.package.getPackage({name: "mr"});
    var promisePackage = file.package.getPackage({name: "q"});
    var toBundle = URL.relative(file.buildLocation, bundleFile.buildLocation);
    var toRequire = URL.relative(file.buildLocation, requirePackage.buildLocation);
    var toPromise = URL.relative(file.buildLocation, promisePackage.buildLocation);

    element.setAttribute("src", toBundle);
    element.setAttribute("data-mr-location", toRequire);
    element.setAttribute("data-q-location", toPromise);

    element.setAttribute("data-mr-hash", requirePackage.hash);
    element.setAttribute("data-q-hash", promisePackage.hash);
    element.setAttribute("data-application-hash", applicationPackage.hash);
}

