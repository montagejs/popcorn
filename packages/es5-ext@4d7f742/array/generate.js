"use strict";var toPosInt=require("../number/to-pos-integer"),value=require("../object/valid-value"),slice=Array.prototype.slice;module.exports=function(e){var r,t;if(e=toPosInt(value(e)),0===e)return[];for(r=arguments.length<2?[void 0]:slice.call(arguments,1,1+e);(t=r.length)<e;)r=r.concat(r.slice(0,e-t));return r};