"use strict";var findIndex=require("../find-index/shim");module.exports=function(i){var e=findIndex.apply(this,arguments);return e===-1?void 0:this[e]};