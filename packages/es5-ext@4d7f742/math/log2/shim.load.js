montageDefine("4d7f742","math/log2/shim",{dependencies:[],factory:function(e,t,a){"use strict";var n=Math.log,i=Math.LOG2E;a.exports=function(e){return isNaN(e)?NaN:(e=Number(e),e<0?NaN:0===e?-(1/0):1===e?0:e===1/0?1/0:n(e)*i)}}});