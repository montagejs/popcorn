montageDefine("4d7f742","math/atanh/shim",{dependencies:[],factory:function(a,e,t){"use strict";var n=Math.log;t.exports=function(a){return isNaN(a)?NaN:(a=Number(a),a<-1?NaN:a>1?NaN:a===-1?-(1/0):1===a?1/0:0===a?a:.5*n((1+a)/(1-a)))}}});