montageDefine("020234c","js/release/promisify",{dependencies:["./util","./nodeback","./errors"],factory:function(r,e,n){"use strict";n.exports=function(e,n){function t(r){return!w.test(r)}function a(r){try{return r.__isPromisified__===!0}catch(e){return!1}}function i(r,e,n){var t=m.getDataPropertyOrDefault(r,e+n,_);return!!t&&a(t)}function o(r,e,n){for(var t=0;t<r.length;t+=2){var a=r[t];if(n.test(a))for(var i=a.replace(n,""),o=0;o<r.length;o+=2)if(r[o]===i)throw new y("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",e))}}function c(r,e,n,t){for(var c=m.inheritedDataKeys(r),s=[],u=0;u<c.length;++u){var f=c[u],l=r[f],p=t===P||P(f,l,r);"function"!=typeof l||a(l)||i(r,f,e)||!t(f,l,r,p)||s.push(f,l)}return o(s,e,n),s}function s(r,t,a,i,o,c){function s(){var a=t;t===p&&(a=this);var i=new e(n);i._captureStackTrace();var o="string"==typeof f&&this!==u?this[f]:r,s=h(i,c);try{o.apply(a,g(arguments,s))}catch(l){i._rejectCallback(d(l),!0,!0)}return i._isFateSealed()||i._setAsyncGuaranteed(),i}var u=function(){return this}(),f=r;return"string"==typeof f&&(r=i),m.notEnumerableProp(s,"__isPromisified__",!0),s}function u(r,e,n,t,a){for(var i=new RegExp(A(e)+"$"),o=c(r,e,i,n),s=0,u=o.length;s<u;s+=2){var f=o[s],l=o[s+1],h=f+e;if(t===j)r[h]=j(f,p,f,l,e,a);else{var g=t(l,function(){return j(f,p,f,l,e,a)});m.notEnumerableProp(g,"__isPromisified__",!0),r[h]=g}}return m.toFastProperties(r),r}function f(r,e,n){return j(r,e,void 0,r,null,n)}var l,p={},m=r("./util"),h=r("./nodeback"),g=m.withAppended,d=m.maybeWrapAsError,v=m.canEvaluate,y=r("./errors").TypeError,b="Async",_={__isPromisified__:!0},k=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"],w=new RegExp("^(?:"+k.join("|")+")$"),P=function(r){return m.isIdentifier(r)&&"_"!==r.charAt(0)&&"constructor"!==r},A=function(r){return r.replace(/([$])/,"\\$")},C=function(r){for(var e=[r],n=Math.max(0,r-1-3),t=r-1;t>=n;--t)e.push(t);for(var t=r+1;t<=3;++t)e.push(t);return e},E=function(r){return m.filledRange(r,"_arg","")},F=function(r){return m.filledRange(Math.max(r,3),"_arg","")},x=function(r){return"number"==typeof r.length?Math.max(Math.min(r.length,1024),0):0};l=function(r,t,a,i,o,c){function s(r){var e,n=E(r).join(", "),a=r>0?", ":"";return e=v?"ret = callback.call(this, {{args}}, nodeback); break;\n":void 0===t?"ret = callback({{args}}, nodeback); break;\n":"ret = callback.call(receiver, {{args}}, nodeback); break;\n",e.replace("{{args}}",n).replace(", ",a)}function u(){for(var r="",e=0;e<l.length;++e)r+="case "+l[e]+":"+s(l[e]);return r+="                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = nodeback;                                              \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]",v?"ret = callback.apply(this, args);\n":"ret = callback.apply(receiver, args);\n")}var f=Math.max(0,x(i)-1),l=C(f),v="string"==typeof r||t===p,y="string"==typeof r?"this != null ? this['"+r+"'] : fn":"fn",b="'use strict';                                                \n        var ret = function (Parameters) {                                    \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._captureStackTrace();                                    \n            var nodeback = nodebackForPromise(promise, "+c+");   \n            var ret;                                                         \n            var callback = tryCatch([GetFunctionCode]);                      \n            switch(len) {                                                    \n                [CodeForSwitchCase]                                          \n            }                                                                \n            if (ret === errorObj) {                                          \n                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n            }                                                                \n            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n            return promise;                                                  \n        };                                                                   \n        notEnumerableProp(ret, '__isPromisified__', true);                   \n        return ret;                                                          \n    ".replace("[CodeForSwitchCase]",u()).replace("[GetFunctionCode]",y);return b=b.replace("Parameters",F(f)),new Function("Promise","fn","receiver","withAppended","maybeWrapAsError","nodebackForPromise","tryCatch","errorObj","notEnumerableProp","INTERNAL",b)(e,i,t,g,d,h,m.tryCatch,m.errorObj,m.notEnumerableProp,n)};var j=v?l:s;e.promisify=function(r,e){if("function"!=typeof r)throw new y("expecting a function but got "+m.classString(r));if(a(r))return r;e=Object(e);var n=void 0===e.context?p:e.context,i=!!e.multiArgs,o=f(r,n,i);return m.copyDescriptors(r,o,t),o},e.promisifyAll=function(r,e){if("function"!=typeof r&&"object"!=typeof r)throw new y("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");e=Object(e);var n=!!e.multiArgs,t=e.suffix;"string"!=typeof t&&(t=b);var a=e.filter;"function"!=typeof a&&(a=P);var i=e.promisifier;if("function"!=typeof i&&(i=j),!m.isIdentifier(t))throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for(var o=m.inheritedDataKeys(r),c=0;c<o.length;++c){var s=r[o[c]];"constructor"!==o[c]&&m.isClass(s)&&(u(s.prototype,t,a,i,n),u(s,t,a,i,n))}return u(r,t,a,i,n)}}}});