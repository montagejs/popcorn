montageDefine("4d7f742","object/serialize",{dependencies:["./to-array","../date/is-date","../object/is-value","../reg-exp/is-reg-exp"],factory:function(e,r,t){"use strict";var n=e("./to-array"),a=e("../date/is-date"),i=e("../object/is-value"),o=e("../reg-exp/is-reg-exp"),s=Array.isArray,c=JSON.stringify,u=Object.prototype.hasOwnProperty,f=function(e,r){return c(r)+":"+t.exports(e)},p=function(e){var r,n=e.length,a=new Array(n);for(r=0;r<n;++r)u.call(e,r)&&(a[r]=t.exports(e[r]));return a};t.exports=function(e){if(!i(e))return String(e);switch(typeof e){case"string":return c(e);case"number":case"boolean":case"function":return String(e);case"object":return s(e)?"["+p(e)+"]":o(e)?String(e):a(e)?"new Date("+e.valueOf()+")":"{"+n(e,f)+"}";default:throw new TypeError("Serialization of "+String(e)+"is unsupported")}}}});