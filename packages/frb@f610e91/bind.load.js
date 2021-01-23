montageDefine("f610e91","bind",{dependencies:["./parse","./algebra","./stringify","./compile-observer","./compile-binder","./compile-assigner","./observers","./binders","./scope"],factory:function(e,r,t){function n(e,r,t){t.target=e,t.targetPath=r;var n=t.source=t.source||e,g=t.twoWay=h in t,l=t.sourcePath=g?t[h]||"":t[v],u=t.parameters=t.parameters||n,E=t.document,N=t.components,p=t.trace,R=new T(n),O=new T(e);if(R.parameters=u,R.document=E,R.components=N,O.parameters=u,O.document=E,O.components=N,t.converter){var A=t.converter;A.convert&&(t.convert=A.convert.bind(A)),A.revert&&(t.revert=A.revert.bind(A))}else if(t.reverter){var f=t.reverter;f.convert&&(t.revert=f.convert.bind(f)),f.revert&&(t.convert=f.revert.bind(f))}var C=t.convert,d=t.revert,m=t.sourceSyntax=c(l),b=t.targetSyntax=c(r),G=s(b,m);if(b=G[0],m=G[1],g&&"rangeContent"===b.type)return a(O,b.args[0],R,m,C,d,t,p?{sourcePath:i(m),targetPath:i(b.args[0])}:null);p&&console.log("DEFINE BINDING",r,v,l,e);var I=o(O,b,R,m,C,t,p),G=s(m,b);m=G[0],b=G[1];var S=Function.noop;return g&&(p&&console.log("DEFINE BINDING",r,P,l,n),S=o(R,m,O,b,d,t,p)),function(){I(),S()}}function o(e,r,t,n,o,a,c){var s=g(n);o&&(s=E.makeConverterObserver(s,o,t));var u=l(r);return u(s,t,e,a,c?{sourcePath:i(n),targetPath:i(r)}:null)}function a(e,r,t,n,o,a,c,s){function i(e,r,t){R||(R=!0,s&&console.log("RANGE CONTENT PROPAGATED",s.targetPath,v,s.sourcePath,"PLUS",e,"MINUS",r,"AT",t),T.swap(t,r.length,e),R=!1)}function l(e,r,t){R||(R=!0,s&&console.log("RANGE CONTENT PROPAGATED",s.targetPath,P,s.sourcePath,"PLUS",e,"MINUS",r,"AT",t),p.swap(t,r.length,e),R=!1)}function E(){if(p!==T){s&&console.log("RANGE CONTENT BOUND",s.targetPath,h,s.sourcePath),R=!0;var r=N(p,i,t),n=N(T,l,e);return R=!1,function(){s&&console.log("RANGE CONTENT UNBOUND",s.targetPath,h,s.sourcePath),r(),n()}}}var T,p,R,O=g(n),A=g(r),f=u(n),C=u(r),d=Function.noop;R=!0;var m=A(function(e){d(),d=Function.noop,s&&console.log("RANGE CONTENT TARGET",s.targetPath,"SET TO",e),e&&e.addRangeChangeListener&&(T=e,p&&T?(s&&console.log("RANGE CONTENT TARGET REPLACES SOURCE",s.targetPath,P,s.sourcePath,"WITH",T),R=!0,p.swap(0,p.length,T),R=!1,d=E()):p||R||(s&&console.log("RANGE CONTENT TARGET INITIALIZED TO COPY OF SOURCE",s.targetPath,v,tarce.sourcePath,"WITH",p),f(T.clone(),t)))},e);R=!1;var b=O(function(r){d(),d=Function.noop,s&&console.log("RANGE CONTENT SOURCE",s.sourcePath,"SET TO",r),r&&r.addRangeChangeListener&&(p=r,T&&p?(s&&console.log("RANGE CONTENT SOURCE REPLACES TARGET",s.targetPath,v,s.sourcePath,"WITH",p),R=!0,T.swap(0,T.length,p),R=!1,d=E()):T||C(p.clone(),e))},t);return T||p||f([],t),function(){d(),m(),b()}}var c=e("./parse"),s=e("./algebra"),i=e("./stringify"),g=e("./compile-observer"),l=e("./compile-binder"),u=e("./compile-assigner"),E=e("./observers"),N=E.observeRangeChange,T=(e("./binders"),e("./scope")),v="<-",P="->",h="<->";t.exports=n}});