"use strict";var isPlainObject=require("./is-plain-object"),forEach=require("./for-each"),process;process=function r(e,s){isPlainObject(e)?forEach(e,r,this):this[s]=e},module.exports=function(r){var e={};return forEach(r,process,e),e};