montageDefine("b2c6b9c","lib/ProxyHandler",{dependencies:["./"],factory:function(t,o,n){n.exports=e;var e=function(t){this._cbs=t||{}},s=t("./").EVENTS;Object.keys(s).forEach(function(t){if(0===s[t])t="on"+t,e.prototype[t]=function(){this._cbs[t]&&this._cbs[t]()};else if(1===s[t])t="on"+t,e.prototype[t]=function(o){this._cbs[t]&&this._cbs[t](o)};else{if(2!==s[t])throw Error("wrong number of arguments");t="on"+t,e.prototype[t]=function(o,n){this._cbs[t]&&this._cbs[t](o,n)}}})}});