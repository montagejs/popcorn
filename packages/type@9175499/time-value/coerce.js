"use strict";var coerceToInteger=require("../integer/coerce"),abs=Math.abs;module.exports=function(e){return e=coerceToInteger(e),e&&abs(e)>864e13?null:e};