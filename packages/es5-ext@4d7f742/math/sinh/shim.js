"use strict";var expm1=require("../expm1"),abs=Math.abs,exp=Math.exp,e=Math.E;module.exports=function(a){return isNaN(a)?NaN:(a=Number(a),0===a?a:isFinite(a)?abs(a)<1?(expm1(a)-expm1(-a))/2:(exp(a-1)-exp(-a-1))*e/2:a)};