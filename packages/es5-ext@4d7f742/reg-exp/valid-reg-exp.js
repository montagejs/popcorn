"use strict";var isRegExp=require("./is-reg-exp");module.exports=function(e){if(!isRegExp(e))throw new TypeError(e+" is not a RegExp object");return e};