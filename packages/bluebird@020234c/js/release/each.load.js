montageDefine("020234c","js/release/each",{dependencies:[],factory:function(e,t,n){"use strict";n.exports=function(e,t){function n(){return r(this)}function i(e,n){return o(e,n,t,t)}var o=e.reduce,r=e.all;e.prototype.each=function(e){return o(this,e,t,0)._then(n,void 0,void 0,this,void 0)},e.prototype.mapSeries=function(e){return o(this,e,t,t)},e.each=function(e,i){return o(e,i,t,0)._then(n,void 0,void 0,e,void 0)},e.mapSeries=i}}});