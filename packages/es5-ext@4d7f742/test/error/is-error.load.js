montageDefine("4d7f742","test/error/is-error",{dependencies:[],factory:function(r,e,n){"use strict";n.exports=function(r,e){e(r(),!1,"Undefined"),e(r(1),!1,"Primitive"),e(r({}),!1,"Objectt"),e(r({toString:function(){return"[object Error]"}}),!1,"Fake error"),e(r(new Error),!0,"Error"),e(r(new EvalError),!0,"EvalError"),e(r(new RangeError),!0,"RangeError"),e(r(new ReferenceError),!0,"ReferenceError"),e(r(new SyntaxError),!0,"SyntaxError"),e(r(new TypeError),!0,"TypeError"),e(r(new URIError),!0,"URIError")}}});