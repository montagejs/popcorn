montageDefine("4d7f742","math/_decimal-adjust",{dependencies:["../object/is-value","../object/ensure-integer"],factory:function(e,t,r){"use strict";var n=e("../object/is-value"),i=e("../object/ensure-integer"),u=String.prototype.split;r.exports=function(e){return function(t){t=Number(t);var r=arguments[1];if(n(r)&&(r=i(r)),!t)return t;if(!r)return Math[e](t);if(!isFinite(t))return t;var a=u.call(t,"e");return t=Math[e](a[0]+"e"+((a[1]||0)-r)),a=t.toString().split("e"),Number(a[0]+"e"+(Number(a[1]||0)+r))}}}});