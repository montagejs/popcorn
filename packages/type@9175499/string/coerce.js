"use strict";var isValue=require("../value/is"),isObject=require("../object/is"),objectToString=Object.prototype.toString;module.exports=function(t){if(!isValue(t))return null;if(isObject(t)){var r=t.toString;if("function"!=typeof r)return null;if(r===objectToString)return null}try{return""+t}catch(e){return null}};