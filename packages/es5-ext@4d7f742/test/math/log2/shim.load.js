montageDefine("4d7f742","test/math/log2/shim",{dependencies:[],factory:function(t,e,n){"use strict";n.exports=function(t,e){e(t({}),NaN,"NaN"),e(t(-.5),NaN,"Less than 0"),e(t(0),-(1/0),"0"),e(t(1),0,"1"),e(t(1/0),1/0,"Infinity"),e(t(3).toFixed(15),"1.584962500721156","Other")}}});