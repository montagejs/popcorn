montageDefine("4d7f742","test/number/is-natural",{dependencies:[],factory:function(e,t,n){"use strict";n.exports=function(e,t){t(e(2),!0,"Number"),t(e(-2),!1,"Negative"),t(e(2.34),!1,"Float"),t(e("23"),!1,"Not numeric"),t(e(NaN),!1,"NaN"),t(e(1/0),!1,"Infinity")}}});