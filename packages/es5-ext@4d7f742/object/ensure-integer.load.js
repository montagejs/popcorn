montageDefine("4d7f742","object/ensure-integer",{dependencies:["../to-short-string-representation","./is-integer"],factory:function(e,t,r){"use strict";var n=e("../to-short-string-representation"),i=e("./is-integer");r.exports=function(e){if(!i(e))throw new TypeError(n(e)+" is not a integer");return Number(e)}}});