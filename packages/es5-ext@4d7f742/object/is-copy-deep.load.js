montageDefine("4d7f742","object/is-copy-deep",{dependencies:["./eq","./is-plain-object","./valid-value"],factory:function(e,r,t){"use strict";var n,i,u,c=e("./eq"),f=e("./is-plain-object"),o=e("./valid-value"),a=Array.isArray,l=Object.keys,p=Object.prototype.propertyIsEnumerable,s=Object.prototype.hasOwnProperty;n=function(e,r,t){var n,u=e.length;if(u!==r.length)return!1;for(n=0;n<u;++n){if(s.call(e,n)!==s.call(r,n))return!1;if(!i(e[n],r[n],t))return!1}return!0},u=function(e,r,t){var n=l(e),u=l(r);return n.length===u.length&&n.every(function(n){return!!p.call(r,n)&&i(e[n],r[n],t)})},i=function(e,r,t){var i,o,l,p;if(c(e,r))return!0;if(f(e)){if(!f(r))return!1;o=u}else{if(!a(e)||!a(r))return!1;o=n}if(l=t[0],p=t[1],i=l.indexOf(e),i===-1)i=l.push(e)-1,p[i]=[];else if(p[i].indexOf(r)!==-1)return!0;return p[i].push(r),o(e,r,t)},t.exports=function(e,r){return!!c(o(e),o(r))||i(Object(e),Object(r),[[],[]])}}});