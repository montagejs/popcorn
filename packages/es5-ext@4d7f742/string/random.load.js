montageDefine("4d7f742","string/random",{dependencies:["../object/is-value","../number/to-pos-integer"],factory:function(e,n,r){"use strict";var t=e("../object/is-value"),i=e("../number/to-pos-integer"),o=Object.create(null),a=Math.random,s=100,u=function(){return a().toString(36).slice(2)},c=function(){var e=u(),n=arguments[0];if(!t(n))return e;for(;e.length<n;)e+=u();return e.slice(0,n)};r.exports=function(){var e=Object(arguments[0]),n=e.length,r=e.isUnique;t(n)&&(n=i(n));var a=c(n);if(r){for(var u=0;o[a];){if(++u===s)throw new Error("Cannot generate random string.\nString.random is not designed to effectively generate many short and unique random strings");a=c(n)}o[a]=!0}return a}}});