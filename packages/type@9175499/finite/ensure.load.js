montageDefine("9175499","finite/ensure",{dependencies:["../lib/resolve-exception","./coerce"],factory:function(e,n,i){"use strict";var r=e("../lib/resolve-exception"),t=e("./coerce");i.exports=function(e){var n=t(e);return null!==n?n:r(e,"%v is not a finite number",arguments[1])}}});