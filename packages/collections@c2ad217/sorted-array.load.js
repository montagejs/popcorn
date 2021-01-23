montageDefine("c2ad217","sorted-array",{dependencies:["./shim","./generic-collection","./listen/property-changes","./listen/range-changes"],factory:function(t,r,e){"use strict";function n(t,r,e,a){return this instanceof n?(Array.isArray(t)?(this.array=t,t=t.splice(0,t.length)):this.array=[],this.contentEquals=r||Object.equals,this.contentCompare=e||Object.compare,this.getDefault=a||Function.noop,this.length=0,void this.addEach(t)):new n(t,r,e,a)}function a(t,r,e){for(var n=0,a=t.length-1;n<=a;){var o=n+a>>1,s=e(r,t[o]);if(s>0)n=o+1;else{if(!(s<0))return o;a=o-1}}return-(n+1)}function o(t,r,e,n,a){for(var o=t,s=t;o>0&&0===n(e,r[o-1]);)o--;for(;s<r.length-1&&0===n(e,r[s+1]);)s++;return{start:o,end:s}}function s(t,r,e,n){var s=a(t,r,e);if(s<0)return-1;for(var i=o(s,t,r,e,n),h=i.start;h<=i.end;h++)if(n(r,t[h]))return h;return-1}function i(t,r,e,n){var s=a(t,r,e);if(s<0)return-1;for(var i=o(s,t,r,e,n),h=i.end;h>=i.start;h--)if(n(r,t[h]))return h;return-1}function h(t,r,e){var n=a(t,r,e);if(n<0)return-n-1;for(var o=t.length-1;n<o&&0===e(r,t[n+1]);)n++;return n}function p(t,r){"undefined"!=typeof console&&"function"==typeof console.warn&&r!==!0&&d.hasOwnProperty(t)===!1&&(console.warn(t),d[t]++)}e.exports=n;var c=(t("./shim"),t("./generic-collection")),u=t("./listen/property-changes"),y=t("./listen/range-changes");n.SortedArray=n,n.from=c.from,Object.addEach(n.prototype,c.prototype),Object.addEach(n.prototype,u.prototype),Object.addEach(n.prototype,y.prototype),n.prototype.isSorted=!0,n.prototype.constructClone=function(t){return new this.constructor(t,this.contentEquals,this.contentCompare,this.getDefault)},n.prototype.has=function(t,r){if(r)throw new Error("SortedSet#has does not support second argument: equals");var e=s(this.array,t,this.contentCompare,this.contentEquals);return e!==-1},n.prototype.get=function(t,r){if(r)throw new Error("SortedArray#get does not support second argument: equals");var e=s(this.array,t,this.contentCompare,this.contentEquals);return e!==-1?this.array[e]:this.getDefault(t)},n.prototype.add=function(t){var r=h(this.array,t,this.contentCompare);return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange([t],Array.empty,r),this.array.splice(r,0,t),this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange([t],Array.empty,r),!0},n.prototype["delete"]=function(t,r){if(r)throw new Error("SortedArray#delete does not support second argument: equals");var e=s(this.array,t,this.contentCompare,this.contentEquals);return e!==-1&&(this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(Array.empty,[t],e),this.array.spliceOne(e),this.length--,this.dispatchesRangeChanges&&this.dispatchRangeChange(Array.empty,[t],e),!0)},n.prototype.deleteAll=function(t,r){if(r){var e=this.array.deleteAll(t,r);return this.length-=e,e}var n=s(this.array,t,this.contentCompare,this.contentEquals);if(n!==-1){for(var a=n;this.contentEquals(t,this.array[a]);)a++;var o=this.slice(n,a);return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(Array.empty,o,n),this.array.splice(n,o.length),this.length-=o.length,this.dispatchesRangeChanges&&this.dispatchRangeChange(Array.empty,o,n),o.length}return 0},n.prototype.indexOf=function(t){return s(this.array,t,this.contentCompare,this.contentEquals)},n.prototype.lastIndexOf=function(t){return i(this.array,t,this.contentCompare,this.contentEquals)};var d={};n.prototype.find=function(t,r,e){return p("This SortedArray#find usage is deprecated please use SortedArray#findValue"),this.findValue.apply(this,arguments)},n.prototype.findValue=function(t,r,e){if(r)throw new Error("SortedArray#findValue does not support second argument: equals");if(e)throw new Error("SortedArray#findValue does not support third argument: index");return s(this.array,t,this.contentCompare,this.contentEquals)},n.prototype.findLast=function(t,r,e){return p("This SortedArray#findLast usage is deprecated please use SortedArray#findLastValue"),this.findLastValue.apply(this,arguments)},n.prototype.findLastValue=function(t,r,e){if(r)throw new Error("SortedArray#findLastValue does not support second argument: equals");if(e)throw new Error("SortedArray#findLastValue does not support third argument: index");return i(this.array,t,this.contentCompare,this.contentEquals)},n.prototype.push=function(){this.addEach(arguments)},n.prototype.unshift=function(){this.addEach(arguments)},n.prototype.pop=function(){var t=this.array.pop();return this.length=this.array.length,t},n.prototype.shift=function(){var t=this.array.shift();return this.length=this.array.length,t},n.prototype.slice=function(){return this.array.slice.apply(this.array,arguments)},n.prototype.splice=function(t,r){return this.swap(t,r,Array.prototype.slice.call(arguments,2))},n.prototype.swap=function(t,r,e){if(void 0===t&&void 0===r)return Array.empty;t=t||0,t<0&&(t+=this.length),void 0===r&&(r=1/0);var n=this.slice(t,t+r);return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(e,n,t),this.array.splice(t,r),this.length-=n.length,this.dispatchesRangeChanges&&this.dispatchRangeChange(Array.empty,n,t),this.addEach(e),n},n.prototype.reduce=function(t,r){var e=arguments[2];return this.array.reduce(function(r,n,a){return t.call(e,r,n,a,this)},r,this)},n.prototype.reduceRight=function(){var t=arguments[2];return this.array.reduceRight(function(r,e,n){return callback.call(t,r,e,n,this)},basis,this)},n.prototype.min=function(){if(this.length)return this.array[0]},n.prototype.max=function(){if(this.length)return this.array[this.length-1]},n.prototype.one=function(){return this.array.one()},n.prototype.clear=function(){var t;this.dispatchesRangeChanges&&(t=this.array.slice(),this.dispatchBeforeRangeChange(Array.empty,t,0)),this.length=0,this.array.clear(),this.dispatchesRangeChanges&&this.dispatchRangeChange(Array.empty,t,0)},n.prototype.equals=function(t,r){return this.array.equals(t,r)},n.prototype.compare=function(t,r){return this.array.compare(t,r)},n.prototype.iterate=function(t,r){return new this.Iterator(this.array,t,r)},n.prototype.toJSON=function(){return this.toArray()},n.prototype.Iterator=Array.prototype.Iterator}});