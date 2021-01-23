montageDefine("c2ad217","set",{dependencies:["./_set","./listen/property-changes","./listen/range-changes","./listen/map-changes","./list","./fast-set"],factory:function(e,t,a){"use strict";function s(){var t=i.CollectionsSet,s=function c(e,a,s,r){return t._init(c,this,e,a,s,r)};s.Set=s,s.from=t.from,i.CollectionsSet=s,s.prototype=new t,s.prototype.constructor=s;var r=e("./list"),o=e("./fast-set");s.prototype.Order=r,s.prototype.Store=o,Object.defineProperty(s.prototype,"_dispatchEmptyArray",{value:[]}),s.prototype.add=function(e){var t=new this.order.Node(e);if(!this.store.has(t)){var a=this.length,s=[e];return this.dispatchBeforeOwnPropertyChange(p,a),this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(s,this._dispatchEmptyArray,a),this.order.add(e),t=this.order.head.prev,this.store.add(t),this.length++,this.dispatchesRangeChanges&&this.dispatchRangeChange(s,this._dispatchEmptyArray,a),this.dispatchOwnPropertyChange(p,a+1),!0}return!1},s.prototype["delete"]=function(e,t){if(t)throw new Error("Set#delete does not support second argument: equals");var a=new this.order.Node(e);if(this.store.has(a)){a=this.store.get(a);var s=[e];return this.dispatchBeforeOwnPropertyChange(p,this.length),this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(this._dispatchEmptyArray,s,a.index),this.store["delete"](a),this.order.splice(a,1),this.length--,this.dispatchesRangeChanges&&this.dispatchRangeChange(this._dispatchEmptyArray,s,a.index),this.dispatchOwnPropertyChange(p,this.length),!0}return!1},s.prototype.clear=function(){var e,t=this.length;t&&this.dispatchBeforeOwnPropertyChange(p,t),this.dispatchesRangeChanges&&(e=this.toArray(),this.dispatchBeforeRangeChange(this._dispatchEmptyArray,e,0)),this._clear(),this.dispatchesRangeChanges&&this.dispatchRangeChange(this._dispatchEmptyArray,e,0),t&&this.dispatchOwnPropertyChange(p,0)},Object.addEach(i.CollectionsSet.prototype,h.prototype),Object.addEach(i.CollectionsSet.prototype,n.prototype),i.CollectionsSet.prototype.makeObservable=function(){this.order.makeObservable()},a.exports=s}var r,i=e("./_set"),h=e("./listen/property-changes"),n=e("./listen/range-changes"),o=e("./listen/map-changes"),p="size";if(void 0!==global.Set&&"function"==typeof global.Set.prototype.values){r=global.Set,a.exports=i;var c,d={}.__proto__===Object.prototype;c=d?function(){this.__proto__=u}:function(){Object.defineProperties(this,f)},Object.defineProperty(r.prototype,"makeObservable",{value:c,writable:!0,configurable:!0,enumerable:!1});var g=r.prototype.clear,l=r.prototype.add,y=r.prototype["delete"],f={_dispatchEmptyArray:{value:[]},clear:{value:function(){var e,t=this.size;t&&this.dispatchBeforeOwnPropertyChange(p,t),this.dispatchesRangeChanges&&(e=this.toArray(),this.dispatchBeforeRangeChange(this._dispatchEmptyArray,e,0)),g.call(this),this.dispatchesRangeChanges&&this.dispatchRangeChange(this._dispatchEmptyArray,e,0),t&&this.dispatchOwnPropertyChange(p,0)},writable:!0,configurable:!0},add:{value:function(e){if(!this.has(e)){var t=this.size,a=[e];return this.dispatchBeforeOwnPropertyChange(p,t),this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(a,this._dispatchEmptyArray,t),l.call(this,e),this.dispatchesRangeChanges&&this.dispatchRangeChange(a,this._dispatchEmptyArray,t),this.dispatchOwnPropertyChange(p,t+1),!0}return!1},writable:!0,configurable:!0},"delete":{value:function(e,t){if(this.has(e)){var a=this.size;if(void 0===t){var s=this.values();for(t=0;s.next().value!==e;)t++}this.dispatchBeforeOwnPropertyChange(p,a);var r=[e];return this.dispatchesRangeChanges&&this.dispatchBeforeRangeChange(this._dispatchEmptyArray,r,t),y.call(this,e),this.dispatchesRangeChanges&&this.dispatchRangeChange(this._dispatchEmptyArray,r,t),this.dispatchOwnPropertyChange(p,a-1),!0}return!1}}},u=Object.create(r.prototype,f);Object.defineEach(i.prototype,h.prototype,!1,!0,!1,!0),Object.defineProperty(i.prototype,"makePropertyObservable",{value:function(){},writable:!0,configurable:!0,enumerable:!1}),Object.defineEach(i.prototype,n.prototype,!1,!0,!1,!0),Object.defineEach(i.prototype,o.prototype,!1,!0,!1,!0),Object.defineProperty(i,"_setupCollectionSet",{value:s,writable:!0,configurable:!0,enumerable:!1})}else s()}});