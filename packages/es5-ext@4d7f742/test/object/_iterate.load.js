montageDefine("4d7f742","test/object/_iterate",{dependencies:[],factory:function(e,t,n){"use strict";n.exports=function(e,t){var n,o={raz:1,dwa:2,trzy:3},r={},c={},f=-1;e=e("forEach"),e(o,function(e,n,i,d){r[n]=e,t(d,++f,"Index"),t(i,o,"Self"),t(this,c,"Scope")},c),t.deep(r,o),n=[],r={},f=-1,e(o,function(e,i,d,s){n.push(e),r[i]=e,t(s,++f,"Index"),t(d,o,"Self"),t(this,c,"Scope")},c,function(e,t){return o[t]-o[e]}),t.deep(r,o,"Sort by Values: Content"),t.deep(n,[3,2,1],"Sort by Values: Order")}}});