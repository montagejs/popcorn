"use strict";var toInteger=require("../../../number/to-integer"),value=require("../../../object/valid-value"),isValue=require("../../../object/is-value"),min=Math.min,max=Math.max;module.exports=function(e){var t,r,i;return t=String(value(this)),e=String(e),i=arguments[1],r=(isValue(i)?min(max(toInteger(i),0),t.length):t.length)-e.length,!(r<0)&&t.indexOf(e,r)===r};