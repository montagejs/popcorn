montageDefine("4d7f742","string/%23/count",{dependencies:["../../object/validate-stringifiable-value"],factory:function(e,t,n){"use strict";var i=e("../../object/validate-stringifiable-value");n.exports=function(e){var t=i(this),n=0,r=0;if(e=i(e),!e)throw new TypeError("Search string cannot be empty");for(;(r=t.indexOf(e,r))!==-1;)++n,r+=e.length;return n}}});