montageDefine("594c740","test/polyfill",{dependencies:["d","../is-symbol"],factory:function(e,o,t){"use strict";var r=e("d"),i=e("../is-symbol"),a=Object.defineProperty;t.exports=function(e,o){var t=e("test"),n={};a(n,t,r("foo")),o(n.test,void 0,"Name"),o(n[t],"foo","Get"),o(n instanceof e,!1),o(i(t),!0,"Symbol"),o(i(e.iterator),!0,"iterator"),o(i(e.toStringTag),!0,"toStringTag"),n={},n[t]="foo","symbol"!=typeof t&&o.deep(Object.getOwnPropertyDescriptor(n,t),{configurable:!0,enumerable:!1,value:"foo",writable:!0}),t=e["for"]("marko"),o(i(t),!0),o(e["for"]("marko"),t),o(e.keyFor(t),"marko")}}});