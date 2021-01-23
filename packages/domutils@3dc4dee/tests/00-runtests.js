function compare(r,e){if(typeof r!=typeof e)throw Error("types didn't match");if("object"==typeof r&&null!==r)for(var t in r){if(!(t in e))throw Error("result didn't contain property "+t);compare(r[t],e[t])}else if(r!==e)throw Error("result doesn't equal expected")}function runTests(r){fs.readdirSync(__dirname+r.dir).map(function(e){return"."!==e[0]&&(".json"===e.substr(-5)?JSON.parse(fs.readFileSync(__dirname+r.dir+e)):require(__dirname+r.dir+e))}).forEach(function(e){if(e){var t=!1;runCount++,console.log("Testing:",e.name),r.test(e,function(r,n){assert.ifError(r),compare(e.expected,n),t?(runCount--,testCount++):t=!0})}}),console.log("->",r.dir.slice(1,-1),"started")}var fs=require("fs"),assert=require("assert"),runCount=0,testCount=0;["./02-dom_utils.js"].map(require).forEach(runTests),function r(){return 0!==runCount?process.nextTick(r):void console.log("Total tests:",testCount)}();