"use strict";var value=require("./valid-value"),objPropertyIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=function(e){var r;value(e);for(r in e)if(objPropertyIsEnumerable.call(e,r))return r;return null};