montageDefine("4d7f742","test/math/log1p/shim",{dependencies:[],factory:function(t,e,n){"use strict";n.exports=function(t,e){e(t({}),NaN,"NaN"),e(t(-1.5),NaN,"Less than -1"),e(t(-1),-(1/0),"-1"),e(t(0),0,"0"),e(t(1/0),1/0,"Infinity"),e(t(1),.6931471805599453,"Other")}}});