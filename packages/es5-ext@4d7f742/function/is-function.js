"use strict";var objToString=Object.prototype.toString,isFunctionStringTag=RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);module.exports=function(t){return"function"==typeof t&&isFunctionStringTag(objToString.call(t))};