montageDefine("9175499","time-value/coerce",{dependencies:["../integer/coerce"],factory:function(e,n,t){"use strict";var c=e("../integer/coerce"),r=Math.abs;t.exports=function(e){return e=c(e),e&&r(e)>864e13?null:e}}});