montageDefine("4d7f742","test/object/set-prototype-of/shim",{dependencies:["../../../object/create"],factory:function(t,e,o){"use strict";var l=t("../../../object/create"),n=Object.getPrototypeOf;o.exports=function(t,e){var o={},r={};null!==t&&(e(t(o,r),o,"Return self object"),e(n(o),r,"Object"),e["throws"](function(){t(o)},TypeError,"Undefined"),e["throws"](function(){t("foo")},TypeError,"Primitive"),e(n(t(o,null)),t.nullPolyfill||null,"Null"),o=l(null),e.h1("Change null prototype"),e(t(o,r),o,"Result"),e(n(o),r,"Prototype"),e.h1("Set null prototype"),e(t(r,null),r,"Result"),e(n(r),t.nullPolyfill||null,"Prototype"))}}});