"use strict";var isObject=require("../object/is-object"),is=require("./is");module.exports=function(e){if(is(e)&&isObject(e))return e;throw new TypeError(e+" is not an iterable or array-like object")};