montageDefine("020234c","js/release/schedule",{dependencies:["./util"],factory:function(e,t,n){"use strict";var o,i=e("./util"),s=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},c=i.getNativePromise();if(i.isNode&&"undefined"==typeof MutationObserver){var r=global.setImmediate,a=process.nextTick;o=i.isRecentNode?function(e){r.call(global,e)}:function(e){a.call(process,e)}}else if("function"==typeof c&&"function"==typeof c.resolve){var u=c.resolve();o=function(e){u.then(e)}}else o="undefined"!=typeof MutationObserver&&("undefined"==typeof window||!window.navigator||!window.navigator.standalone&&!window.cordova)&&"classList"in document.documentElement?function(){var e=document.createElement("div"),t={attributes:!0},n=!1,o=document.createElement("div"),i=new MutationObserver(function(){e.classList.toggle("foo"),n=!1});i.observe(o,t);var s=function(){n||(n=!0,o.classList.toggle("foo"))};return function(n){var o=new MutationObserver(function(){o.disconnect(),n()});o.observe(e,t),s()}}():"undefined"!=typeof setImmediate?function(e){setImmediate(e)}:"undefined"!=typeof setTimeout?function(e){setTimeout(e,0)}:s;n.exports=o}});