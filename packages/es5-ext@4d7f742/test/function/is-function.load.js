montageDefine("4d7f742","test/function/is-function",{dependencies:[],factory:function(require,exports,module){"use strict";var o={call:Function.prototype.call,apply:Function.prototype.apply};module.exports=function(t,a){a(t(function(){}),!0,"Function is function"),a(t(o),!1,"Plain object is not function");var asyncFunction;try{asyncFunction=eval("async () => {}")}catch(error){}asyncFunction&&a(t(asyncFunction),!0,"Async function is function")}}});