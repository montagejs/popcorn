"use strict";module.exports=function(t,e){function n(t,e){return{promise:e}}function r(){return!1}function o(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+P.toString(t));r._attachCancellationCallback(t)})}catch(o){return o}}function i(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?P.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function a(){return this._onCancelField}function c(t){this._onCancelField=t}function s(){this._cancellationParent=void 0,this._onCancelField=void 0}function l(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function u(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function f(){var e=this._boundTo;return void 0!==e&&e instanceof t?e.isFulfilled()?e.value():void 0:e}function p(){this._trace=new N(this._peekContext())}function d(t,e){if(G(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=T(t);P.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),P.notEnumerableProp(t,"__stackCleaned__",!0)}}}function h(){this._trace=void 0}function v(t,e,n,r,o){if(void 0===t&&null!==e&&z){if(void 0!==o&&o._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var i="",a="";if(e._trace){for(var c=e._trace.stack.split("\n"),s=E(c),l=s.length-1;l>=0;--l){var u=s[l];if(!q.test(u)){var f=u.match(W);f&&(i="at "+f[1]+":"+f[2]+":"+f[3]+" ");break}}if(s.length>0)for(var p=s[0],l=0;l<c.length;++l)if(c[l]===p){l>0&&(a="\n"+c[l-1]);break}}var d="a promise was created in a "+n+"handler "+i+"but was not returned from it, see http://goo.gl/rRqMUw"+a;r._warn(d,!0,e)}}function _(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),g(n)}function g(e,n,r){if(at.warnings){var o,i=new O(e);if(n)r._attachExtraTrace(i);else if(at.longStackTraces&&(o=t._peekContext()))o.attachExtraTrace(i);else{var a=T(i);i.stack=a.message+"\n"+a.stack.join("\n")}et("warning",i)||w(i,"",!0)}}function y(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function m(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function k(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],o=e.length-1,i=e[o],a=-1,c=r.length-1;c>=0;--c)if(r[c]===i){a=c;break}for(var c=a;c>=0;--c){var s=r[c];if(e[o]!==s)break;e.pop(),o--}e=r}}function E(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],o="    (No stack trace)"===r||$.test(r),i=o&&rt(r);o&&!i&&(Q&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function b(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||$.test(r))break}return n>0&&"SyntaxError"!=t.name&&(e=e.slice(n)),e}function T(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?b(t):["    (No stack trace)"],{message:n,stack:"SyntaxError"==t.name?e:E(e)}}function w(t,e,n){if("undefined"!=typeof console){var r;if(P.isObject(t)){var o=t.stack;r=e+M(o,t)}else r=e+String(t);"function"==typeof I?I(r,n):"function"!=typeof console.log&&"object"!=typeof console.log||console.log(r)}}function C(t,e,n,r){var o=!1;try{"function"==typeof e&&(o=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(i){D.throwLater(i)}"unhandledRejection"===t?et(t,n,r)||o||w(n,"Unhandled rejection "):et(t,r)}function R(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():P.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(o){}0===e.length&&(e="(empty array)")}return"(<"+S(e)+">, no stack trace)"}function S(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function j(){return"function"==typeof it}function U(t){var e=t.match(ot);if(e)return{fileName:e[1],line:parseInt(e[2],10)}}function F(t,e){if(j()){for(var n,r,o=(t.stack||"").split("\n"),i=(e.stack||"").split("\n"),a=-1,c=-1,s=0;s<o.length;++s){var l=U(o[s]);if(l){n=l.fileName,a=l.line;break}}for(var s=0;s<i.length;++s){var l=U(i[s]);if(l){r=l.fileName,c=l.line;break}}a<0||c<0||!n||!r||n!==r||a>=c||(rt=function(t){if(H.test(t))return!0;var e=U(t);return!!(e&&e.fileName===n&&a<=e.line&&e.line<=c)})}}function N(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,N),e>32&&this.uncycle()}var L,B,I,x=t._getDomain,D=t._async,O=require("./errors").Warning,P=require("./util"),A=require("./es5"),G=P.canAttachTrace,H=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,q=/\((?:timers\.js):\d+:\d+\)/,W=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,$=null,M=null,Q=!1,V=!(0==P.env("BLUEBIRD_DEBUG")||!P.env("BLUEBIRD_DEBUG")&&"development"!==P.env("NODE_ENV")),K=!(0==P.env("BLUEBIRD_WARNINGS")||!V&&!P.env("BLUEBIRD_WARNINGS")),X=!(0==P.env("BLUEBIRD_LONG_STACK_TRACES")||!V&&!P.env("BLUEBIRD_LONG_STACK_TRACES")),z=0!=P.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&(K||!!P.env("BLUEBIRD_W_FORGOTTEN_RETURN"));t.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=t._bitField&-1048577|524288},t.prototype._ensurePossibleRejectionHandled=function(){if(0===(524288&this._bitField)){this._setRejectionIsUnhandled();var t=this;setTimeout(function(){t._notifyUnhandledRejection()},1)}},t.prototype._notifyUnhandledRejectionIsHandled=function(){C("rejectionHandled",L,void 0,this)},t.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},t.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},t.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),C("unhandledRejection",B,t,this)}},t.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},t.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=this._bitField&-262145},t.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},t.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},t.prototype._unsetRejectionIsUnhandled=function(){this._bitField=this._bitField&-1048577,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},t.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},t.prototype._warn=function(t,e,n){return g(t,e,n||this)},t.onPossiblyUnhandledRejection=function(t){var e=x();B="function"==typeof t?null===e?t:P.domainBind(e,t):void 0},t.onUnhandledRejectionHandled=function(t){var e=x();L="function"==typeof t?null===e?t:P.domainBind(e,t):void 0};var J=function(){};t.longStackTraces=function(){if(D.haveItemsQueued()&&!at.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!at.longStackTraces&&j()){var n=t.prototype._captureStackTrace,r=t.prototype._attachExtraTrace,o=t.prototype._dereferenceTrace;at.longStackTraces=!0,J=function(){if(D.haveItemsQueued()&&!at.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");t.prototype._captureStackTrace=n,t.prototype._attachExtraTrace=r,t.prototype._dereferenceTrace=o,e.deactivateLongStackTraces(),D.enableTrampoline(),at.longStackTraces=!1},t.prototype._captureStackTrace=p,t.prototype._attachExtraTrace=d,t.prototype._dereferenceTrace=h,e.activateLongStackTraces(),D.disableTrampolineIfNecessary()}},t.hasLongStackTraces=function(){return at.longStackTraces&&j()};var Y=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return P.global.dispatchEvent(t),function(t,e){var n={detail:e,cancelable:!0};A.defineProperty(n,"promise",{value:e.promise}),A.defineProperty(n,"reason",{value:e.reason});var r=new CustomEvent(t.toLowerCase(),n);return!P.global.dispatchEvent(r)}}if("function"==typeof Event){var t=new Event("CustomEvent");return P.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,A.defineProperty(n,"promise",{value:e.promise}),A.defineProperty(n,"reason",{value:e.reason}),!P.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),P.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!P.global.dispatchEvent(n)}}catch(e){}return function(){return!1}}(),Z=function(){return P.isNode?function(){return process.emit.apply(process,arguments)}:P.global?function(t){var e="on"+t.toLowerCase(),n=P.global[e];return!!n&&(n.apply(P.global,[].slice.call(arguments,1)),!0)}:function(){return!1}}(),tt={promiseCreated:n,promiseFulfilled:n,promiseRejected:n,promiseResolved:n,promiseCancelled:n,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:n},et=function(t){var e=!1;try{e=Z.apply(null,arguments)}catch(n){D.throwLater(n),e=!0}var r=!1;try{r=Y(t,tt[t].apply(null,arguments))}catch(n){D.throwLater(n),r=!0}return r||e};t.config=function(e){if(e=Object(e),"longStackTraces"in e&&(e.longStackTraces?t.longStackTraces():!e.longStackTraces&&t.hasLongStackTraces()&&J()),"warnings"in e){var n=e.warnings;at.warnings=!!n,z=at.warnings,P.isObject(n)&&"wForgottenReturn"in n&&(z=!!n.wForgottenReturn)}if("cancellation"in e&&e.cancellation&&!at.cancellation){if(D.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");t.prototype._clearCancellationData=s,t.prototype._propagateFrom=l,t.prototype._onCancel=a,t.prototype._setOnCancel=c,t.prototype._attachCancellationCallback=i,t.prototype._execute=o,nt=l,at.cancellation=!0}return"monitoring"in e&&(e.monitoring&&!at.monitoring?(at.monitoring=!0,t.prototype._fireEvent=et):!e.monitoring&&at.monitoring&&(at.monitoring=!1,t.prototype._fireEvent=r)),t},t.prototype._fireEvent=r,t.prototype._execute=function(t,e,n){try{t(e,n)}catch(r){return r}},t.prototype._onCancel=function(){},t.prototype._setOnCancel=function(t){},t.prototype._attachCancellationCallback=function(t){},t.prototype._captureStackTrace=function(){},t.prototype._attachExtraTrace=function(){},t.prototype._dereferenceTrace=function(){},t.prototype._clearCancellationData=function(){},t.prototype._propagateFrom=function(t,e){};var nt=u,rt=function(){return!1},ot=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;P.inherits(N,Error),e.CapturedTrace=N,N.prototype.uncycle=function(){var t=this._length;if(!(t<2)){for(var e=[],n={},r=0,o=this;void 0!==o;++r)e.push(o),o=o._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var i=e[r].stack;void 0===n[i]&&(n[i]=r)}for(var r=0;r<t;++r){var a=e[r].stack,c=n[a];if(void 0!==c&&c!==r){c>0&&(e[c-1]._parent=void 0,e[c-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var s=r>0?e[r-1]:this;c<t-1?(s._parent=e[c+1],s._parent.uncycle(),s._length=s._parent._length+1):(s._parent=void 0,s._length=1);for(var l=s._length+1,u=r-2;u>=0;--u)e[u]._length=l,l++;return}}}},N.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=T(t),n=e.message,r=[e.stack],o=this;void 0!==o;)r.push(E(o.stack.split("\n"))),o=o._parent;k(r),m(r),P.notEnumerableProp(t,"stack",y(n,r)),P.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():R(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,$=t,M=e;var n=Error.captureStackTrace;return rt=function(t){return H.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return $=/@/,M=e,Q=!0,function(t){t.stack=(new Error).stack};var o;try{throw new Error}catch(i){o="stack"in i}return"stack"in r||!o||"number"!=typeof Error.stackTraceLimit?(M=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?R(e):e.toString()},null):($=t,M=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(I=function(t){console.warn(t)},P.isNode&&process.stderr.isTTY?I=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:P.isNode||"string"!=typeof(new Error).stack||(I=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var at={warnings:K,longStackTraces:!1,cancellation:!1,monitoring:!1};return X&&t.longStackTraces(),{longStackTraces:function(){return at.longStackTraces},warnings:function(){return at.warnings},cancellation:function(){return at.cancellation},monitoring:function(){return at.monitoring},propagateFromFunction:function(){return nt},boundValueFunction:function(){return f},checkForgottenReturns:v,setBounds:F,warn:g,deprecated:_,CapturedTrace:N,fireDomEvent:Y,fireGlobalEvent:Z}};