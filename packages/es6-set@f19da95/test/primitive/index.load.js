montageDefine("f19da95","test/primitive/index",{dependencies:["es5-ext/array/from","es6-iterator/get","es5-ext/array/to-array"],factory:function(e,r,t){"use strict";var a=e("es5-ext/array/from"),s=e("es6-iterator/get"),o=e("es5-ext/array/to-array");t.exports=function(e,r){var t=["raz","dwa","trzy"],i=new e(t),d="other",n="other2",z=0,y=[];r(i instanceof e,!0,"Set"),r(i.size,3,"Size"),r(i.has("raz"),!0,"Has: true"),r(i.has(d),!1,"Has: false"),r(i.add(d),i,"Add: return"),r(i.has(d),!0,"Add"),r(i.size,4,"Add: Size"),r(i["delete"]("else"),!1,"Delete: false"),r(i.get("raz"),"raz","Get"),t.push(d),i.forEach(function(){y.push(a(arguments)),r(this,n,"ForEach: Context: #"+z)},n),r.deep(y.sort(function(e,r){return e[0].localeCompare(r[0])}),t.sort().map(function(e){return[e,e,i]})),r.deep(o(i.entries()).sort(),[["dwa","dwa"],["trzy","trzy"],[d,d],["raz","raz"]].sort(),"Entries"),r.deep(o(i.keys()).sort(),["dwa","trzy",d,"raz"].sort(),"Keys"),r.deep(o(i.values()).sort(),["dwa","trzy",d,"raz"].sort(),"Values"),r.deep(o(s(i)).sort(),["dwa","trzy",d,"raz"].sort(),"Iterator"),i.clear(),r(i.size,0,"Clear: size"),r(i.has("trzy"),!1,"Clear: has"),r.deep(o(i.values()),[],"Clear: Values"),r.h1("Empty initialization"),i=new e,i.add("foo"),r(i.size,1),r(i.has("foo"),!0)}}});