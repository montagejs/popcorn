montageDefine("c2ad217","sorted-array-map",{dependencies:["./shim","./sorted-array-set","./generic-collection","./generic-map","./listen/property-changes","./listen/map-changes"],factory:function(t,e,o){"use strict";function n(t,e,o,c){return this instanceof n?(e=e||Object.equals,o=o||Object.compare,c=c||Function.noop,this.contentEquals=e,this.contentCompare=o,this.getDefault=c,this.store=new r(null,function(t,o){return e(t.key,o.key)},function(t,e){return o(t.key,e.key)}),this.length=0,void this.addEach(t)):new n(t,e,o,c)}var r=(t("./shim"),t("./sorted-array-set")),c=t("./generic-collection"),a=t("./generic-map"),s=t("./listen/property-changes"),p=t("./listen/map-changes");o.exports=n,n.SortedArrayMap=n,Object.addEach(n.prototype,c.prototype),Object.addEach(n.prototype,a.prototype),Object.addEach(n.prototype,s.prototype),Object.addEach(n.prototype,p.prototype),n.from=c.from,n.prototype.isSorted=!0,n.prototype.constructClone=function(t){return new this.constructor(t,this.contentEquals,this.contentCompare,this.getDefault)}}});