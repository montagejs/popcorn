montageDefine("4d7f742","object/ensure-plain-object",{dependencies:["../safe-to-string","./is-plain-object"],factory:function(e,t,n){"use strict";var i=e("../safe-to-string"),o=e("./is-plain-object");n.exports=function(e){if(!o(e))throw new TypeError(i(e)+" is not a plain object");return e}}});