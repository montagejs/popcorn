montageDefine("4d7f742","test/array/from/shim",{dependencies:[],factory:function(e,n,t){"use strict";t.exports=function(e,n){var t,r=[1,2,3];n.not(e(r),r,"Array"),n.deep(e(r),r,"Array: same content"),n.deep(e("12r3v"),["1","2","r","3","v"],"String"),n.deep(e(function(){return arguments}(3,r,"raz")),[3,r,"raz"],"Arguments"),n.deep(e(function(){return arguments}(3)),[3],"Arguments with one numeric value"),n.deep(e({0:"raz",1:"dwa",length:2}),["raz","dwa"],"Other"),n.deep(e(r,function(e){return 10*(e+2)},10),[30,40,50],"Mapping"),n["throws"](function(){e()},TypeError,"Undefined"),n.deep(e(3),[],"Primitive"),n(e.length,1,"Length"),n.deep(e({length:0}),[],"No values Array-like"),n.deep(e({length:-1}),[],"Invalid length Array-like"),n.deep(e({length:-(1/0)}),[],"Invalid length Array-like #2"),n["throws"](function(){e(void 0)},TypeError,"Undefined"),n["throws"](function(){e(null)},TypeError,"Null"),n.deep(e(!1),[],"Boolean"),n.deep(e(-(1/0)),[],"Inifity"),n.deep(e(-0),[],"-0"),n.deep(e(0),[],"+0"),n.deep(e(1),[],"1"),n.deep(e(Number(1/0)),[],"+Infinity"),n.deep(e({}),[],"Plain object"),n.deep(e({length:1}),[void 0],"Sparse array-like"),n.deep(e({0:"a",1:"b",length:2},function(e){return e+e}),["aa","bb"],"Map"),n.deep(e({0:"a",1:"b",length:2},function(){return String(this)},void 0),["undefined","undefined"],"Map context"),n.deep(e({0:"a",1:"b",length:2},function(){return String(this)},"x"),["x","x"],"Map primitive context"),n["throws"](function(){e({},"foo","x")},TypeError,"Non callable for map"),n.deep(e({length:1,0:"a"}),["a"],"Null context"),n(e({__proto__:{0:"abc",length:1}})[0],"abc","Values on prototype"),n["throws"](function(){e.call(function(){return Object.freeze({})},{})},TypeError,"Contructor producing freezed objects"),t=function(){},Object.defineProperty(t.prototype,"0",{set:function(e){throw new Error("Setter called: "+e)}}),n.deep(e.call(t,{0:"abc",length:1}),{0:"abc",length:1},"Defined not set")}}});