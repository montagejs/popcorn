montageDefine("4d7f742","test/math/fround/shim",{dependencies:[],factory:function(n,t,e){"use strict";e.exports=function(n,t){t(n({}),NaN,"NaN"),t(n(0),0,"Zero"),t(n(1/0),1/0,"Infinity"),t(n(-(1/0)),-(1/0),"-Infinity"),t(n(1.337),1.3370000123977661,"1")}}});