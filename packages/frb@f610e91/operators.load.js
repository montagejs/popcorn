montageDefine("f610e91","operators",{dependencies:["collections/shim-object","collections/shim-regexp","collections/map","collections/set"],factory:function(n,t,e){n("collections/shim-object"),n("collections/shim-regexp");var r=n("collections/map"),o=n("collections/set");t.toNumber=function(n){return+n},t.toString=function(n){return null==n?n:"string"==typeof n||"number"==typeof n?""+n:null},t.toArray=Array.from,t.toMap=r.from.bind(r),t.toSet=o.from.bind(o),t.not=function(n){return!n},t.neg=function(n){return-n},t.pow=function(n,t){return Math.pow(n,t)},t.root=function(n,t){return Math.pow(n,1/t)},t.log=function(n,t){return Math.log(n)/Math.log(t)},t.mul=function(n,t){return n*t},t.div=function(n,t){return n/t},t.mod=function(n,t){return(n%t+t)%t},t.rem=function(n,t){return n%t},t.add=function(n,t){return n+t},t.sub=function(n,t){return n-t},t.ceil=function(n){return Math.ceil(n)},t.floor=function(n){return Math.floor(n)},t.round=function(n){return Math.round(n)},t.lt=function(n,t){return Object.compare(n,t)<0},t.gt=function(n,t){return Object.compare(n,t)>0},t.le=function(n,t){return Object.compare(n,t)<=0},t.ge=function(n,t){return Object.compare(n,t)>=0},t.equals=Object.equals,t.compare=Object.compare,t.and=function(n,t){return n&&t},t.or=function(n,t){return n||t},t.defined=function(n){return null!=n},t.startsWith=function(n,t){var e=new RegExp("^"+RegExp.escape(t));return e.test(n)},t.endsWith=function(n,t){var e=new RegExp(RegExp.escape(t)+"$");return e.test(n)},t.contains=function(n,t){var e=new RegExp(RegExp.escape(t));return e.test(n)},t.join=function(n,t){return n.join(t||"")},t.split=function(n,t){return n.split(t||"")},t.range=function(n){for(var t=[],e=0;e<n;e++)t.push(e);return t},t.last=function(n){return n.get(n.length-1)}}});