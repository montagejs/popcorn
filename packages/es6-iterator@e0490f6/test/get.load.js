montageDefine("e0490f6","test/get",{dependencies:["es6-symbol","../"],factory:function(r,t,e){"use strict";var n=r("es6-symbol").iterator,o=r("../");e.exports=function(r,t){var e;t["throws"](function(){r()},TypeError,"Null"),t["throws"](function(){r({})},TypeError,"Plain object"),t["throws"](function(){r({length:0})},TypeError,"Array-like"),e={},e[n]=function(){return new o([])},t(r(e)instanceof o,!0,"Iterator"),t(String(r([])),"[object Array Iterator]"," Array"),t(String(r(function(){return arguments}())),"[object Array Iterator]"," Arguments"),t(String(r("foo")),"[object String Iterator]","String")}}});