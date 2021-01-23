"use strict";function List(t,e,i){return List._init(List,this,t,e,i)}function ListIterator(t){this.head=t,this.at=t.next}function Node(t){this.value=t,this.prev=null,this.next=null}module.exports=List;var Shim=require("./shim"),GenericCollection=require("./generic-collection"),GenericOrder=require("./generic-order");List._init=function(t,e,i,r,n){if(!(e instanceof t))return new t(i,r,n);var o=e.head=new e.Node;o.next=o,o.prev=o,e.contentEquals=r||Object.equals,e.getDefault=n||Function.noop,e.length=0,e.addEach(i)},List.List=List,Object.addEach(List.prototype,GenericCollection.prototype),Object.addEach(List.prototype,GenericOrder.prototype),List.from=GenericCollection.from,List.prototype.constructClone=function(t){return new this.constructor(t,this.contentEquals,this.getDefault)},List.prototype.find=function(t,e,i){e=e||this.contentEquals;for(var r=this.head,n=this.scan(i,r.next);n!==r;){if(e(n.value,t))return n;n=n.next}},List.prototype.findLast=function(t,e,i){e=e||this.contentEquals;for(var r=this.head,n=this.scan(i,r.prev);n!==r;){if(e(n.value,t))return n;n=n.prev}},List.prototype.has=function(t,e){return!!this.find(t,e)},List.prototype.get=function(t,e){var i=this.find(t,e);return i?i.value:this.getDefault(t)},List.prototype["delete"]=function(t,e){var i=this.findLast(t,e);return!!i&&(i["delete"](),this.length--,!0)},List.prototype.deleteAll=function(t,e){e=e||this.contentEquals;for(var i=this.head,r=i.next,n=0;r!==i;)e(t,r.value)&&(r["delete"](),n++),r=r.next;return this.length-=n,n},List.prototype.clear=function(){this.head.next=this.head.prev=this.head,this.length=0},List.prototype.add=function(t){var e=new this.Node(t);return this._addNode(e)},List.prototype._addNode=function(t){return this.head.addBefore(t),this.length++,!0},List.prototype.push=function(){for(var t=this.head,e=0;e<arguments.length;e++){var i=arguments[e],r=new this.Node(i);t.addBefore(r)}this.length+=arguments.length},List.prototype.unshift=function(){for(var t=this.head,e=0;e<arguments.length;e++){var i=arguments[e],r=new this.Node(i);t.addAfter(r),t=r}this.length+=arguments.length},List.prototype._shouldPop=function(){var t,e=this.head;return e.prev!==e&&(t=e.prev.value),t},List.prototype.pop=function(t,e){var i,r=this.head;if(r.prev!==r){i=r.prev.value;var n=this.length-1,o=t?t.call(this,i,n):void 0;r.prev["delete"](),this.length--,e?e.call(this,i,n,o):void 0}return i},List.prototype.shift=function(t,e){var i,r=this.head;if(r.prev!==r){i=r.next.value;var n=t?t.call(this,i,0):void 0;r.next["delete"](),this.length--,e?e.call(this,i,0,n):void 0}return i},List.prototype.peek=function(){if(this.head!==this.head.next)return this.head.next.value},List.prototype.poke=function(t){this.head!==this.head.next?this.head.next.value=t:this.push(t)},List.prototype.one=function(){return this.peek()},List.prototype.scan=function(t,e){var i=this.head;if("number"==typeof t){var r=t;if(r>=0)for(t=i.next;r&&(r--,t=t.next,t!=i););else for(t=i;r<0&&(r++,t=t.prev,t!=i););return t}return t||e},List.prototype.slice=function(t,e){var i=[],r=this.head;for(t=this.scan(t,r.next),e=this.scan(e,r);t!==e&&t!==r;)i.push(t.value),t=t.next;return i},List.prototype.splice=function(t,e){return this.swap(t,e,Array.prototype.slice.call(arguments,2))},List.prototype.swap=function(t,e,i,r,n){var o=t;t=this.scan(t,this.head),null==e&&(e=1/0),i=Array.from(i);for(var s=[],h=t;e--&&e>=0&&h!==this.head;)s.push(h.value),h=h.next;var a;a=r?r.call(this,t,i,s):void 0;for(var h=t,p=0,h=t;p<s.length;p++,h=h.next)h["delete"]();null==o&&h===this.head&&(h=this.head.next);for(var p=0;p<i.length;p++){var u=new this.Node(i[p]);h.addBefore(u)}return this.length+=i.length-s.length,n?n.call(this,t,i,s):void 0,s},List.prototype.reverse=function(){var t=this.head;do{var e=t.next;t.next=t.prev,t.prev=e,t=t.next}while(t!==this.head);return this},List.prototype.sort=function(){this.swap(0,this.length,this.sorted.apply(this,arguments))},List.prototype.reduce=function(t,e){for(var i=arguments[2],r=this.head,n=r.next;n!==r;)e=t.call(i,e,n.value,n,this),n=n.next;return e},List.prototype.reduceRight=function(t,e){for(var i=arguments[2],r=this.head,n=r.prev;n!==r;)e=t.call(i,e,n.value,n,this),n=n.prev;return e},List.prototype.updateIndexes=function(t,e){for(;t!==this.head;)t.index=e++,t=t.next},List.prototype.iterate=function(){return new ListIterator(this.head)},ListIterator.prototype.__iterationObject=null,Object.defineProperty(ListIterator.prototype,"_iterationObject",{get:function(){return this.__iterationObject||(this.__iterationObject={done:!1,value:null})}}),ListIterator.prototype.next=function(){if(this.at===this.head)this._iterationObject.done=!0,this._iterationObject.value=void 0;else{var t=this.at.value;this.at=this.at.next,this._iterationObject.value=t}return this._iterationObject},List.prototype.Node=Node,Node.prototype["delete"]=function(){this.prev.next=this.next,this.next.prev=this.prev},Node.prototype.addBefore=function(t){var e=this.prev;this.prev=t,t.prev=e,e.next=t,t.next=this},Node.prototype.addAfter=function(t){var e=this.next;this.next=t,t.next=e,e.prev=t,t.prev=this};