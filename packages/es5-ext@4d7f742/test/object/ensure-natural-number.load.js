montageDefine("4d7f742","test/object/ensure-natural-number",{dependencies:[],factory:function(r,n,e){"use strict";e.exports=function(r,n){n["throws"](function(){r(void 0)},TypeError,"Undefined"),n(r(null),0,"Null"),n(r(2),2,"Number"),n["throws"](function(){r(-2)},TypeError,"Negative"),n["throws"](function(){r(2.34)},TypeError,"Float"),n(r("23"),23,"Numeric string"),n["throws"](function(){r(NaN)},TypeError,"NaN"),n["throws"](function(){r(1/0)},TypeError,"Infinity")}}});