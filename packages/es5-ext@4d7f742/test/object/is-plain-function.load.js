montageDefine("4d7f742","test/object/is-plain-function",{dependencies:["../../object/set-prototype-of"],factory:function(require,exports,module){"use strict";var setPrototypeOf=require("../../object/set-prototype-of");module.exports=function(t,a){a(t(function(){}),!0,"Function"),a(t({}),!1,"Object"),a(t(),!1,"Undefined"),a(t(null),!1,"Null"),setPrototypeOf&&a(t(Object.setPrototypeOf(function(){},Object.prototype)),!1,"Function with non-function prototype");var arrowfn;try{arrowfn=eval("(() => {})")}catch(e){}arrowfn&&a(t(arrowfn),!0,"Arrow function");var classFn;try{classFn=eval("(class {})")}catch(e){}classFn&&a(t(classFn),!1,"Class");var commentedClassFn;try{commentedClassFn=eval("(class/*kkk*/\n//blah\n Bar\n//blah\n {})")}catch(e){}commentedClassFn&&a(t(commentedClassFn,!1,"Class"),!1,"Class with comments")}}});