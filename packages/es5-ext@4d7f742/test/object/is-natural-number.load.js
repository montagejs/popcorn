montageDefine("4d7f742","test/object/is-natural-number",{dependencies:[],factory:function(e,n,t){"use strict";t.exports=function(e,n){n(e(void 0),!1,"Undefined"),n(e(null),!0,"Null"),n(e(2),!0,"Number"),n(e(-2),!1,"Negative"),n(e(2.34),!1,"Float"),n(e("23"),!0,"Numeric string"),n(e(NaN),!1,"NaN"),n(e(1/0),!1,"Infinity")}}});