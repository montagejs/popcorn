montageDefine("4d7f742","string/%23/ends-with/shim",{dependencies:["../../../number/to-integer","../../../object/valid-value","../../../object/is-value"],factory:function(e,t,n){"use strict";var i=e("../../../number/to-integer"),r=e("../../../object/valid-value"),a=e("../../../object/is-value"),o=Math.min,s=Math.max;n.exports=function(e){var t,n,u;return t=String(r(this)),e=String(e),u=arguments[1],n=(a(u)?o(s(i(u),0),t.length):t.length)-e.length,!(n<0)&&t.indexOf(e,n)===n}}});