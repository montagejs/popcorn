montageDefine("99f03e0","reader",{dependencies:["q"],factory:function(e,n,r){function o(e,n){function r(){var e;return e=n?s.join(""):t.constructor.join(s),s.splice(0,s.length),e}var t=Object.create(o.prototype);n&&e.setEncoding&&e.setEncoding(n);var i=c.defer(),f=c.defer();e.on("error",function(e){i.reject(e)});var u,s=[];return e.on("end",function(){i.resolve(t),f.resolve()}),e.on("data",function(e){i.resolve(t),u?u(e):s.push(e)}),t.read=function(){u=void 0;var e=c.defer();return c.done(f.promise,function(){e.resolve(r())}),e.promise},t.forEach=function(e){return s&&s.length&&e(r()),u=e,c.when(f.promise,function(){u=void 0})},t.close=function(){e.destroy()},t.node=e,i.promise}function t(e,n){var r=[];return e.forEach(function(e){r.push(e)}),n?r.join(""):i(r)}function i(e){var n,r,o,t,i=0,c=e.length;for(r=0;r<c;r++)o=e[r],i+=o.length;for(t=new Buffer(i),n=0,r=0;r<c;r++)o=e[r],o.copy(t,n,0),n+=o.length;return e.splice(0,c,t),t}var c=e("q");r.exports=o,o.read=t,o.join=i}});