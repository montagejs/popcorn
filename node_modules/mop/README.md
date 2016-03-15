[![Build Status](https://travis-ci.org/montagejs/mop.png?branch=master)](http://travis-ci.org/montagejs/mop)

Montage Optimizer
=================

for **Montage** ~0.14.6 and **Mr** ~0.15.0, ~0.14.2 and ~0.13.0.

Optimizes Montage applications for production by minifying, to reduce file
size, and creating bundles, to reduce the number of requests.

Install Mop globally with NPM.

```
npm install -g mop
```

Mop can be run in any directory containing a Montage application.

```bash
$ ls
index.html    node_modules/ package.json  ui/
$ ls node_modules/
montage/
$ mop
# performs reading, processing and bundling steps
$ ls builds/
my-app        my-app@f7e7db2/
```

Features
========

-   writes whole packages into an incrementally updated builds
    directory, giving each package a consistent hash
-   optionally generates AppCache manifest files for every package
-   performs optimizing transformations on whole packages, whole files,
    and parts of files
    -   JavaScript minification using UglifyJS (including script
        blocks)
    -   HTML minification using JSDOM
    -   CSS using CSSOM (including style blocks)
    -   JSON files
    -   Montage serialization minification (and precompilation is a
        goal) (including ``text/montage-serialization`` script
        blocks)
    -   rewrites inter-package URL’s in HTML and CSS to use relative
        URL’s among the build products, regardless of where the
        dependencies are installed in development
    -   converts all modules into scripts, suitable for script
        injection, particularly for cross-origin dependencies and
        Content Security Policies.
    -   optionally bundles and shards applications
        -   aggregates the bootstrapping files and the transitive
            dependencies of each HTML file that has a `montage.js`
            bootstrapping script into a single script that gets loaded
            instead of `montage.js`
        -   can produce a sequence of preloading bundles, to start
            loading after the main application starts.  Each phase of
            the preload sequence can be optionally split into parallel
            downloads or "shards".
-   optionally, lints whole applications
    -   using JSHint for JavaScript in individual files and script
        blocks
    -   checks for broken links in HTML
    -   checks for unnecessary script block attributes
    -   checks for JavaScript parse errors in files and script blocks
    -   checks for JSON parse errors in files and script block,
        (planning to also check Montage serialization format)
    -   checks for copyright notices in HTML, CSS, and JavaScript
-   operates holistically on a package and all of its dependencies


Usage
=====

Creates a ``builds`` directory from one or more applications, packages,
and all their dependencies.	 The ``builds`` directory will be created in
your current working directory.

Usage:

	mop [-lfc] [-d @] [--target <build-dir>] <source-package>

e.g,

	$ mop calculator
	$ mop -t builds calculator

``-t`` or ``--target`` changes the default target build directory.
The default is ``builds`` relative to the current working directory.

``-o 0`` or ``--optimize 0`` disables optimizating transforms.

``-l`` or ``--lint`` provides per-file warnings if packaged files do
not pass JSLint or various other sanity checks like script MIME types
and known JSON schemas.

``-d`` or ``--delimiter`` allows you to override the symbol used between
package names and package hashes in the builds directory, which is ``@``
by default.

``--no-css`` allows you to disable CSS transforms.  CSSOM cannot handle
some modern CSS.

Your project will be assembled in the builds directory.

### Notes

The bootstrap bundle Mop creates is usually large, as it contains the
bootrapping code and the initial modules and all their dependencies. To
avoid the download of this file blocking the rendering of your page make
sure to include the `async` attribute in the bootstrap script tag:

```html
<!-- Mr -->
<script src="node_modules/mr/bootstrap.js" data-module="index" async></script>
<!-- Montage -->
<script src="node_modules/montage/montage.js" async></script>
```

API
---

```javascript
var optimize = require("mop");

optimize(process.cwd()).then(function () {
    console.log("Optimization done.");
});
```

### optimize(location, [config])

Optimize the package at the given location.

 * location `string` An absolute path to a directory containing an app
to optimize.
 * [config] `Object` Configuration for optimization.
     * [buildLocation="builds"] `string` An absolute or relative path for a directory to generate the optimized files in.
     * [minify=true] `boolean` Whether to minify the files.
     * [lint=false] `boolean` Whether to lint the files and output warnings.
     * [noCss=true] `boolean` Whether to optimize CSS. Cannot handle some modern CSS, and so disabled by default.
     * [delimiter="@"] `string` Symbol to use between the package name and the package hash, e.g. `my-app@f7e7db2`
     * [out=spinner] `Object` An object to use for logging.
         * [log] `Function` Variadic function that outputs a normal message.
         * [warn] `Function` Variadic function that outputs a warning.
         * [status] `Function` Variadic function that outputs a status message. These messages are temporary, high volume and should not be permanently displayed. If called with no arguments it should clear the displayed status.


Package JSON
============

The build system uses ``package.json`` files to discover dependencies.
These dependencies must always be packages themselves.

For a comprehensive view of what can be in a ``package.json``, see the
[UncommonJS specification][1].

[1]: https://github.com/kriskowal/uncommonjs/blob/master/packages/specification.md

For the purpose of the build system, the following properties are
important:

-   ``dependencies``: In the presence of a ``dependencies`` property,
    the build system assumes that the package was designed for NPM and
    that its dependencies were locally installed by NPM.  That means
    that they can be found by searching the ``node_modules`` directory
    of the package.  ``dependencies`` are internally transformed into
    ``mappings``, assuming that the package is in ``node_modules``, or
    the directory specified by ``directories.packages``.

-   ``mappings``: A more flexible dependency management block.  The
    local module identifier can be different than the registered package
    name.  The dependency can have `location`, `name`, `version`, and
    `hash` properties.  If the dependency is a string, it is coerced to
    an object with a location property.

    If a mapping has the same name as a dependency, the mapping
    overrides the dependency at run-time, but NPM will only use the
    `dependencies` block to install.

        {
            "mappings": {
                "montage": "../montage/"
            }
        }

-   ``bundle``: For application packages, configures how the optimizer
    will bundle modules so that they can be downloaded by the browser
    with HTTP requests.

    -   An array turns on bundling as above, but also sets up a
        prioritized preloading sequence.  Each element of the array
        corresponds to a preloading phase.  Between each phase, the
        run-time has an opportunity to use the newly loaded modules,
        while subsequent phases download in the background.

        Each element of the array can be a single module identifier or
        an array of module identifiers.  Each loading phase will include
        all of these modules and their transitive dependencies, but will
        exclude any modules that would already be loaded in a prior
        phase or the initial bundle.

        The run-time supresses all lazy loading until preloading has
        been finished to avoid issuing multiple requests for the same
        modules.  However, as a consequence, applications should plan to
        finish preloading before being provoked by the user to
        load modules on demand.

    For the purpose of bundling, Montage Optimizer has a broader view of
    what constitutes a dependency than the Montage run-time in
    development mode.

    -   For a JavaScript module, as with the Montage run-time in
        development, all modules mentioned in `require("")` calls with a
        string argument.

    -   Additionally, for an HTML file, dependencies include:

        -   The referenced serialization of a `<link
            rel="text/montage-serialization">` tag.
        -   The modules refered to in a `<script
            type="text/montage-serialization">` as defined by
            serialization dependencies.

    -   For a serialization, dependencies include every module mentioned
        in the serialization objects through the "prototype" property
        (or deprecated "module" property), unless the "lazy" property is
        true.

    -   For the eponymous JavaScript module in a Reel, like
        `main.reel/main.js`, the corresponding HTML template file, if it
        exists, such as `main.reel/main.html`.

-   ``shard``: In conjunction with bundling and preloading, "shard"
    specifies a maximum number of TCP connections to dedicate to
    downloading module bundles in parallel at run-time.  Without
    sharding, each phase of preloading is downloaded from a single
    bundle file with some number of modules.  With sharding, that bundle
    is divided into smaller files and the optimizer uses a heuristic
    packing algorithm to evenly distribute the modules among these
    bundles.

-   ``appcache``: For application packages, instructs the optimizer to
    generate an appcache manifest.  The manifest will contain all of the
    resources in an all used packages except those explicitly excluded
    in each package.  The `appcache` property can be either `true` or an
    object with additional configuration for manifests.

    -   ``fallback`` is an object that causes the browser to redirect
        from a network URL to a cached URL when the browser is offline.
        These get incorporated in the generated HTML5 appcache manifest
        under the ``FALLBACK:`` section.

-   ``exclude``: A list of glob patterns for files and directory trees
    in the package, relative to the package root, that must not be
    included in a production build and its appcache manifest. These
    exclusions may include ``*`` for zero or more wild card characters
    in a file name, ``?`` for a single wild card character in a file
    name, or ``**`` for recursive directory traversal.

        {
            "exclude": [
                "**/tests",
                "benchmarks",
                "examples",
                "docs"
            ]
        }

