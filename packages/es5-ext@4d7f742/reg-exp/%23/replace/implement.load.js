montageDefine("4d7f742","reg-exp/%23/replace/implement",{dependencies:["./is-implemented","./shim"],factory:function(e,i,t){"use strict";e("./is-implemented")()||Object.defineProperty(RegExp.prototype,"replace",{value:e("./shim"),configurable:!0,enumerable:!1,writable:!0})}});