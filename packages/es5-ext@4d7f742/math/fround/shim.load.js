montageDefine("4d7f742","math/fround/shim",{dependencies:["../_pack-ieee754","../_unpack-ieee754"],factory:function(e,n,r){"use strict";var t;t="undefined"==typeof Float32Array?function(){var n=e("../_pack-ieee754"),r=e("../_unpack-ieee754");return function(e){return r(n(e,8,23),8,23)}}():function(){var e=new Float32Array(1);return function(n){return e[0]=n,e[0]}}(),r.exports=function(e){return isNaN(e)?NaN:(e=Number(e),0===e?e:isFinite(e)?t(e):e)}}});