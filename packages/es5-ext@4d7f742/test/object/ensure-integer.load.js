montageDefine("4d7f742","test/object/ensure-integer",{dependencies:[],factory:function(r,e,n){"use strict";n.exports=function(r,e){e["throws"](function(){r(void 0)},TypeError,"Undefined"),e["throws"](function(){r(null)},TypeError,"Null"),e(r(2),2,"Number"),e(r(-2),-2,"Negative"),e["throws"](function(){r(2.34)},TypeError,"Float"),e(r("23"),23,"Numeric string"),e["throws"](function(){r(NaN)},TypeError,"NaN"),e["throws"](function(){r(1/0)},TypeError,"Infinity")}}});