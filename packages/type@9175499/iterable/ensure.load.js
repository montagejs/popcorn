montageDefine("9175499","iterable/ensure",{dependencies:["../lib/resolve-exception","../value/is","./is"],factory:function(e,r,t){"use strict";var n=e("../lib/resolve-exception"),i=e("../value/is"),o=e("./is"),a=function(e,r){for(var t,n=[],o=e[Symbol.iterator]();!(t=o.next()).done;){var a=r(t.value);if(!i(a))throw new Error("Stop propagation");n.push(a)}return n};t.exports=function(e){var r=arguments[1];if(o(e,r)){if(!r)return e;if("function"!=typeof r.coerceItem)return e;try{return a(e,r.coerceItem)}catch(t){}}return n(e,"%v is not expected iterable value",r)}}});