"use strict";var isArrayLike=require("./is-array-like"),isObject=require("./is-object");module.exports=function(r){if(isObject(r)&&isArrayLike(r))return r;throw new TypeError(r+" is not array-like object")};