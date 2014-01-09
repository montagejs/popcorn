chrome.app.runtime.onLaunched.addListener(function(launchData) {
    var opt = {
        minWidth: 1024,
        minHeight: 672,
        resizable: false
    };

    chrome.app.window.create('chrome-app/sandbox.html', opt, function (win) {
        win.launchData = launchData;
    });

});
