//alert("Launch Inspector");
document.write('<script src="base/node_modules/montage/montage.js" data-package="base" data-module="test/all"></script>');

// Skip the first call to this function.
var originalLoaded = window.__testacular__.loaded;
window.__testacular__.loaded = function() {
    console.warn("skip");
    window.__testacular__.loaded = originalLoaded;
}