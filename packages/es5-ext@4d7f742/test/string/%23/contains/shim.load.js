montageDefine("4d7f742","test/string/%23/contains/shim",{dependencies:[],factory:function(a,t,l){"use strict";l.exports=function(a,t){t(a.call("raz",""),!0,"Empty"),t(a.call("",""),!0,"Both Empty"),t(a.call("raz","raz"),!0,"Same"),t(a.call("razdwa","raz"),!0,"Starts with"),t(a.call("razdwa","dwa"),!0,"Ends with"),t(a.call("razdwa","zdw"),!0,"In middle"),t(a.call("","raz"),!1,"Something in empty"),t(a.call("az","raz"),!1,"Longer"),t(a.call("azasdfasdf","azff"),!1,"Not found"),t(a.call("razdwa","raz",1),!1,"Position")}}});