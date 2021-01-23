"use strict";module.exports=function(t,e,i,r,s,n){function o(t){setTimeout(function(){throw t},0)}function u(t){var e=i(t);return e!==t&&"function"==typeof t._isDisposable&&"function"==typeof t._getDisposer&&t._isDisposable()&&e._setDisposable(t._getDisposer()),e}function p(e,r){function n(){if(p>=l)return a._fulfill();var s=u(e[p++]);if(s instanceof t&&s._isDisposable()){try{s=i(s._getDisposer().tryDispose(r),e.promise)}catch(c){return o(c)}if(s instanceof t)return s._then(n,o,null,null,null)}n()}var p=0,l=e.length,a=new t(s);return n(),a}function l(t,e,i){this._data=t,this._promise=e,this._context=i}function a(t,e,i){this.constructor$(t,e,i)}function c(t){return l.isDisposer(t)?(this.resources[this.index]._setDisposable(t),t.promise()):t}function f(t){this.length=t,this.promise=null,this[t-1]=null}var h=require("./util"),_=require("./errors").TypeError,v=require("./util").inherits,d=h.errorObj,y=h.tryCatch,D={};l.prototype.data=function(){return this._data},l.prototype.promise=function(){return this._promise},l.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():D},l.prototype.tryDispose=function(t){var e=this.resource(),i=this._context;void 0!==i&&i._pushContext();var r=e!==D?this.doDispose(e,t):null;return void 0!==i&&i._popContext(),this._promise._unsetDisposable(),this._data=null,r},l.isDisposer=function(t){return null!=t&&"function"==typeof t.resource&&"function"==typeof t.tryDispose},v(a,l),a.prototype.doDispose=function(t,e){var i=this.data();return i.call(t,t,e)},f.prototype._resultCancelled=function(){for(var e=this.length,i=0;i<e;++i){var r=this[i];r instanceof t&&r.cancel()}},t.using=function(){var r=arguments.length;if(r<2)return e("you must pass at least 2 arguments to Promise.using");var s=arguments[r-1];if("function"!=typeof s)return e("expecting a function but got "+h.classString(s));var o,u=!0;2===r&&Array.isArray(arguments[0])?(o=arguments[0],r=o.length,u=!1):(o=arguments,r--);for(var a=new f(r),_=0;_<r;++_){var v=o[_];if(l.isDisposer(v)){var D=v;v=v.promise(),v._setDisposable(D)}else{var g=i(v);g instanceof t&&(v=g._then(c,null,null,{resources:a,index:_},void 0))}a[_]=v}for(var m=new Array(a.length),_=0;_<m.length;++_)m[_]=t.resolve(a[_]).reflect();var b=t.all(m).then(function(t){for(var e=0;e<t.length;++e){var i=t[e];if(i.isRejected())return d.e=i.error(),d;if(!i.isFulfilled())return void b.cancel();t[e]=i.value()}x._pushContext(),s=y(s);var r=u?s.apply(void 0,t):s(t),o=x._popContext();return n.checkForgottenReturns(r,o,"Promise.using",x),r}),x=b.lastly(function(){var e=new t.PromiseInspection(b);return p(a,e)});return a.promise=x,x._setOnCancel(a),x},t.prototype._setDisposable=function(t){this._bitField=131072|this._bitField,this._disposer=t},t.prototype._isDisposable=function(){return(131072&this._bitField)>0},t.prototype._getDisposer=function(){return this._disposer},t.prototype._unsetDisposable=function(){this._bitField=this._bitField&-131073,this._disposer=void 0},t.prototype.disposer=function(t){if("function"==typeof t)return new a(t,this,r());throw new _}};