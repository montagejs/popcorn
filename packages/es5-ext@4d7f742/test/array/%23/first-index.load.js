montageDefine("4d7f742","test/array/%23/first-index",{dependencies:[],factory:function(l,a,e){"use strict";e.exports=function(l,a){var e;a(l.call([]),null,"Empty"),a(l.call([null]),0,"One value"),a(l.call([1,2,3]),0,"Many values"),a(l.call(new Array(1e3)),null,"Sparse empty"),e=[],e[883]=void 0,e[890]=null,a(l.call(e),883,"Manual sparse, distant value"),e=new Array(1e3),e[657]=void 0,e[700]=null,a(l.call(e),657,"Sparse, distant value")}}});