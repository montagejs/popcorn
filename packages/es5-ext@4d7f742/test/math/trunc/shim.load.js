montageDefine("4d7f742","test/math/trunc/shim",{dependencies:["../../../object/is"],factory:function(e,t,i){"use strict";var n=e("../../../object/is");i.exports=function(e,t){t(e({}),NaN,"NaN"),t(e(0),0,"Zero"),t(e(1/0),1/0,"Infinity"),t(e(-(1/0)),-(1/0),"-Infinity"),t(n(e(.234),0),!0,"0"),t(n(e(-.234),-0),!0,"-0"),t(e(13.7),13,"Positive #1"),t(e(12.3),12,"Positive #2"),t(e(-12.3),-12,"Negative #1"),t(e(-14.7),-14,"Negative #2")}}});