montageDefine("4d7f742","test/iterable/validate",{dependencies:["es6-symbol"],factory:function(r,n,t){"use strict";var e=r("es6-symbol").iterator;t.exports=function(r,n){var t;n["throws"](function(){r(0)},TypeError,"0"),n["throws"](function(){r(!1)},TypeError,"false"),n(r(""),"","''"),n["throws"](function(){r({})},TypeError,"Plain Object"),n["throws"](function(){r(function(){})},TypeError,"Function"),n(r(t=new String("raz")),t,"String object"),n(r(t={length:1}),t,"Array like"),n["throws"](function(){r()},TypeError,"Undefined"),n["throws"](function(){r(null)},TypeError,"null"),t={},t[e]=function(){},n(r(t),t,"Iterable")}}});