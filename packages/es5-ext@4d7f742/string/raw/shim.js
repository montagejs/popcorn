"use strict";var toPosInt=require("../../number/to-pos-integer"),validValue=require("../../object/valid-value"),reduce=Array.prototype.reduce;module.exports=function(e){var r,t=Object(validValue(Object(validValue(e)).raw));return toPosInt(t.length)?(r=arguments,reduce.call(t,function(e,t,u){return e+String(r[u])+t})):""};