montageDefine("4d7f742","test/array/%23/splice/shim",{dependencies:["../../../../array/_sub-array-dummy-safe"],factory:function(a,e,r){"use strict";var s=a("../../../../array/_sub-array-dummy-safe");r.exports=function(a,e){var r,n,l,o={};r=["foo",void 0,0,"2d",!1,o,null],e.deep(a.call(r,2,2,"bar"),[0,"2d"],"Plain array: result"),e.deep(r,["foo",void 0,"bar",!1,o,null],"Plain array: change"),n=new s("foo",(void 0),0,"2d",(!1),o,null),l=a.call(n,2,2,"bar"),e(l instanceof s,!0,"Instance of subclass"),e.deep(l,[0,"2d"],"Subclass: result"),e.deep(n,["foo",void 0,"bar",!1,o,null],"Subclass: change")}}});