montageDefine("f19da95","test/lib/iterator",{dependencies:["../../polyfill","es5-ext/array/to-array"],factory:function(e,a,r){"use strict";var t=e("../../polyfill"),n=e("es5-ext/array/to-array");r.exports=function(e,a){var r=new t(["raz","dwa"]);a.deep(n(new e(r)),["raz","dwa"],"Default"),a.deep(n(new e(r,"key+value")),[["raz","raz"],["dwa","dwa"]],"Key & Value"),a.deep(n(new e(r,"value")),["raz","dwa"],"Other")}}});