"use strict";var global=require("es5-ext/global"),polyfill=require("../polyfill");module.exports=function(l,e){var o;e(typeof l(),"boolean"),o=global.Set,global.Set=polyfill,e(l(),!0),void 0===o?delete global.Set:global.Set=o};