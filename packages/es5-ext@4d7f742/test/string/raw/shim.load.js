montageDefine("4d7f742","test/string/raw/shim",{dependencies:[],factory:function(t,a,o){"use strict";o.exports=function(t,a){var o=[];o.raw=["The total is "," ($"," with tax)"],a(t(o,"{total}","{total * 1.01}"),"The total is {total} (${total * 1.01} with tax)"),o.raw=[],a(t(o,"{total}","{total * 1.01}"),"")}}});