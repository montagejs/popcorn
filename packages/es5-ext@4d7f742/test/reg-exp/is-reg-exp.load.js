montageDefine("4d7f742","test/reg-exp/is-reg-exp",{dependencies:[],factory:function(e,n,r){"use strict";r.exports=function(e,n){n(e("arar"),!1,"String"),n(e(12),!1,"Number"),n(e(!0),!1,"Boolean"),n(e(new Date),!1,"Date"),n(e(new String("raz")),!1,"String object"),n(e({}),!1,"Plain object"),n(e(/a/),!0,"Regular expression"),n(e(new RegExp("a")),!0,"Regular expression via constructor")}}});