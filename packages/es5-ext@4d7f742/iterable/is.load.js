montageDefine("4d7f742","iterable/is",{dependencies:["es6-symbol","../object/is-value","../object/is-array-like"],factory:function(e,t,i){"use strict";var o=e("es6-symbol").iterator,r=e("../object/is-value"),s=e("../object/is-array-like");i.exports=function(e){return!!r(e)&&("function"==typeof e[o]||s(e))}}});