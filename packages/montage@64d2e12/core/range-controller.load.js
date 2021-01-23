montageDefine("64d2e12","core/range-controller",{dependencies:["./core","collections/generic-collection","collections/listen/array-changes","./core","./core","./core","./core"],factory:function(t,e,n){var i=t("./core").Montage,o=t("collections/generic-collection"),l=t("collections/listen/array-changes").observableArrayProperties,s=Object.freeze([]),h=function(t,e){var n=t;return n.__proto__=h.prototype,n.rangeController=e,n.contentEquals=t&&t.contentEquals||Object.is,n};h.prototype=Object.create(Array.prototype,l),Object.defineProperty(h.prototype,"clone",{value:function(){return this.slice()}}),h.prototype.oldSwap=l.swap.value,Object.defineProperty(h.prototype,"swap",{configurable:!1,value:function(t,e,n){return this.swap_or_push(t,e,n)}}),h.prototype.oldPush=l.push.value,Object.defineProperty(h.prototype,"push",{configurable:!1,value:function(){for(var t=-1,e=arguments.length,n=Array(e);++t<e;)n[t]=arguments[t];this.swap_or_push(this.length,0,n)}}),Object.defineProperty(h.prototype,"swap_or_push",{configurable:!1,value:function(t,e,n){var i=this.rangeController.content;this.contentEquals=i&&i.contentEquals||Object.is,t=t>=0?t:this.length+t;var o,l=this.length,h=Math.min(e,l-t);n?(n.contentEquals=this.contentEquals,o=n.filter(function(e,o){if(i&&!i.has(e))return!1;if(n.findLast(e)>o)return!1;var l=this.find(e);return l<0||l>=t&&l<t+h},this)):o=s;var r;r=0===h?s:Array.prototype.slice.call(this,t,t+h);var c=o.length-r.length,a=Math.max(this.length+c,t+o.length);if(!this.rangeController.allowsMultipleSelection&&a>1){var u=o.length?o[o.length-1]:this.one();return 0===l?(this.oldPush(u),s):this.oldSwap(0,l,[u])}return this.rangeController.avoidsEmptySelection&&0===a?i.has(this[0])?this.length-1===0?s:this.oldSwap(1,this.length-1):0===this.length?(this.oldPush(i.one()),s):this.oldSwap(0,this.length,[i.one()]):this.oldSwap(t,e,o)}});e.RangeController=i.specialize({constructor:{value:function(t){this.content=null,this._selection=new h([],this),this.sortPath=null,this.filterPath=null,this.reversed=!1,this.selectAddedContent=!1,this.deselectInvisibleContent=!1,this.clearSelectionOnOrderChange=!1,this.avoidsEmptySelection=!1,this.organizedContent=[],this.organizedContent.addRangeChangeListener(this,"organizedContent"),this.defineBinding("_filteredContent",{"<-":"$filterPath.defined() ? content.filter{path($filterPath)} : content"}),this.defineBinding("_sortedContent",{"<-":"$sortPath.defined() ? _filteredContent.sorted{path($sortPath)} : _filteredContent"}),this.defineBinding("organizedContent.rangeContent()",{"<-":"$reversed ?? 0 ? _sortedContent.reversed() : _sortedContent"}),this.addRangeAtPathChangeListener("content",this,"handleContentRangeChange"),this.addPathChangeListener("sortPath",this,"handleOrderChange"),this.addPathChangeListener("reversed",this,"handleOrderChange"),this.addOwnPropertyChangeListener("allowsMultipleSelection",this),this.iterations=[],t&&this.initWithContent(t)}},initWithContent:{value:function(t){return this.content=t,this}},sortPath:{value:null},reversed:{value:null},filterPath:{value:null},selectAddedContent:{value:!1},deselectInvisibleContent:{value:!1},clearSelectionOnOrderChange:{value:!1},avoidsEmptySelection:{value:!1},allowsMultipleSelection:{value:!1},organizedContent:{value:null},iterations:{value:null},_selection:{value:null},selection:{get:function(){return this._selection},set:function(t){var e=[0,this._selection.length];t&&t.toArray&&(e=e.concat(t.toArray())),this._selection.splice.apply(this._selection,e)}},select:{value:function(t){!this.allowsMultipleSelection&&this.selection.length>=1&&this.selection.clear(),this.selection.add(t)}},deselect:{value:function(t){(!this.avoidsEmptySelection||this.selection.length>1)&&this.selection["delete"](t)}},clearSelection:{value:function(){(!this.avoidsEmptySelection||this.selection.length>1)&&this.selection.clear()}},add:{value:function(t){var e;return this.content||(this.content=[]),e=this.content.add(t),e&&this.handleAdd(t),e}},push:{value:function(){for(var t=this.content.push.apply(this.content,arguments),e=0;e<arguments.length;e++)this.handleAdd(arguments[e]);return t}},pop:{value:function(){return this.content.pop()}},shift:{value:function(){return this.content.shift()}},unshift:{value:function(){for(var t=this.content.unshift.apply(this.content,arguments),e=0;e<arguments.length;e++)this.handleAdd(arguments[e]);return t}},splice:{value:function(){for(var t=this.content.splice.apply(this.content,arguments),e=2;e<arguments.length;e++)this.handleAdd(arguments[e]);return t}},swap:{value:function(t,e,n){var i=this.content.swap.apply(this.content,arguments);if(n)for(t=2;t<n.length;t++)this.handleAdd(n[t]);return i}},"delete":{value:function(t){return this.content["delete"](t)}},has:{value:function(t){return!!this.content&&this.content.has(t)}},addEach:{value:o.prototype.addEach},deleteEach:{value:o.prototype.deleteEach},clear:{value:function(){this.content.clear()}},addContent:{value:function(){var t=new this.contentConstructor;return this.add(t),t}},_contentConstructor:{value:null},contentConstructor:{get:function(){return this._contentConstructor?this._contentConstructor:this.content&&this.content.contentConstructor?this.content.contentConstructor:Object},set:function(t){this._contentConstructor=t}},handleContentRangeChange:{value:function(t,e,n){if(this.selection.length>0){var i=this.content&&this.content.contentEquals||Object.is;e.deleteEach(t,i),this.selection.length&&(this.selection.deleteEach(e),0===this.selection.length&&this.content&&this.content.length&&this.avoidsEmptySelection&&!this.allowsMultipleSelection&&this.selection.add(this.content[this.content.length-1]))}}},handleSelectionRangeChange:{value:function(t,e,n){if(this.selection)if(this.content){for(var i=[],o=0;o<t.length;o++)this.content.has(t[o])||i.push(t[o]);if(this._selection.deleteEach(i),!this.allowsMultipleSelection&&this._selection.length>1){var l=this._selection.pop();this._selection.clear(),this._selection.add(l)}this.avoidsEmptySelection&&0===this._selection.length&&this._selection.add(e[0])}else this._selection.clear()}},handleOrganizedContentRangeChange:{value:function(t,e,n){if(this.deselectInvisibleContent&&this.selection){var i=e.clone(1);i.deleteEach(t),this.selection.deleteEach(e)}}},handleOrderChange:{value:function(){this.clearSelectionOnOrderChange&&this.selection&&this.selection.clear()}},handleAdd:{value:function(t){this.selectAddedContent&&this.selection&&(!this.allowsMultipleSelection&&this.selection.length?this.selection.swap(0,this.selection.length,[t]):this.selection.add(t))}},handleAllowsMultipleSelectionChange:{value:function(){if(this.selection){var t=this.selection.length;if(!this.allowsMultipleSelection&&t>1){var e=this._selection.pop();this._selection.clear(),this._selection.add(e)}}}}},{objectDescriptorModuleId:t("./core")._objectDescriptorModuleIdDescriptor,objectDescriptor:t("./core")._objectDescriptorDescriptor,blueprintModuleId:t("./core")._blueprintModuleIdDescriptor,blueprint:t("./core")._blueprintDescriptor})}});