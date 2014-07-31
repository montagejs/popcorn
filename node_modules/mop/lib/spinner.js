
var lastTime = Date.now();
var frames = ["⡿⣾", "⢿⣷", "⣻⣯", "⣽⣟", "⣾⡿", "⣷⢿"];
var i = 0;
var period = 50;
var active = false;

var slice = Array.prototype.slice;

function clear() {
    if (active) {
        // up one, clear line
        process.stdout.write("\u001b[A\u001b[2K");
        active = false;
    }
}

exports.log = log;
function log() {
    clear();
    console.log.apply(console, arguments);
}

exports.warn = warn;
function warn() {
    clear();
    console.log.apply(console, ["(warn)"].concat(slice.call(arguments)));
}

function status() {
    if (!arguments.length) {
        return clear();
    }

    if (!active) {
        process.stdout.write("\n");
        active = true;
    }

    var args = slice.call(arguments);
    var before = args.shift();
    var after = args.join(" ");

    var message = before + " " + frames[i] + (after ? " " + after : "");
    message = message.slice(0, process.stdout.columns - 1);
    var now = Date.now();
    if (now > lastTime + period) {
        i = (i + 1) % frames.length;
        lastTime = Date.now();
    }
    // up one, clear line, write message, next line
    process.stdout.write("\u001b[A\u001b[2K" + message + "\n");
}

function noop() {}

// Assumes that process.stdout cannot change at runtime.
// From my tests with Node v0.8.14 process.stdout is not writable
exports.status = process.stdout.isTTY ? status : noop;