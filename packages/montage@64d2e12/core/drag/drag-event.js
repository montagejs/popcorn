var MutableEvent=require("../event/mutable-event").MutableEvent,Montage=require("../core").Montage;if("undefined"!=typeof window){var OBJECT_MIME_TYPE="application/object",DataTransfer=exports.DataTransfer=Montage.specialize({__data:{enumerable:!1,value:null},_data:{enumerable:!1,get:function(){return this.__data||(this.__data=new Map)}},_dragImage:{value:null,enumerable:!1},_dragEffect:{value:null},dragEffect:{set:function(e){this.isEffectAllowed(e)&&(this._dragEffect=e)},get:function(){return this._dragEffect||DataTransfer.Default}},_dropEffect:{value:null},dropEffect:{set:function(e){e&&this.isEffectAllowed(e)&&DataTransfer.isDropEffectAllowed(e,this.effectAllowed)?this._dropEffect=e:this._dropEffect=null},get:function(){return this._dropEffect||(this.effectAllowed===DataTransfer.All||this.effectAllowed.startsWith("c")?this._dropEffect=DataTransfer.Copy:this.isEffectAllowed(this.effectAllowed)?this._dropEffect=this.effectAllowed:this._dropEffect=DataTransfer.Link),this._dropEffect}},_effectAllowed:{value:null},effectAllowed:{set:function(e){DataTransfer.allowedDropEffectsMap[e]&&(this._effectAllowed=e)},get:function(){return this._effectAllowed||DataTransfer.All}},files:{value:null},items:{value:null},types:{value:null},dragTarget:{value:null},_dropTargetCandidates:{value:null,enumerable:!1},dropTargetCandidates:{get:function(){return this._dropTargetCandidates||(this._dropTargetCandidates=new Set)}},showPlaceholder:{value:!1},draggedObject:{set:function(e){this._data.set(OBJECT_MIME_TYPE,e)},get:function(){return this._data.get(OBJECT_MIME_TYPE)}},clearData:{value:function(){return this._data.clear()}},getData:{value:function(e){return this._data.get(e)}},hasData:{value:function(e){return this._data.has(e)}},setData:{value:function(e,t){return this._data.set(e,t)}},dragImageXOffset:{value:null},dragImageYOffset:{value:null},setDragImage:{value:function(e,t,a){this._dragImage||(this._dragImage=e,t>=0&&(this.dragImageXOffset=t),a>=0&&(this.dragImageYOffset=a))}},getDragImage:{value:function(){return this._dragImage}},isEffectAllowed:{value:function(e){return!!DataTransfer.allowedEffectsMap[e]}}},{Default:{value:"default"},Copy:{value:"copy"},Move:{value:"move"},Link:{value:"alias"},CopyLink:{value:"copyLink"},CopyMove:{value:"copyMove"},LinkMove:{value:"linkMove"},All:{value:"all"},_allowedEffectsMap:{value:null},allowedEffectsMap:{get:function(){return this._allowedEffectsMap||(this._allowedEffectsMap={},this._allowedEffectsMap[this.Default]=!0,this._allowedEffectsMap[this.Copy]=!0,this._allowedEffectsMap[this.Link]=!0,this._allowedEffectsMap[this.Move]=!0),this._allowedEffectsMap}},_allowedDropEffectsMap:{value:null},allowedDropEffectsMap:{get:function(){if(!this._allowedDropEffectsMap){var e={};e[this.All]=!0,e[this.CopyMove]=!0,e[this.CopyLink]=!0,e[this.LinkMove]=!0,this._allowedDropEffectsMap=Object.assign(e,this._allowedEffectsMap)}return this._allowedDropEffectsMap}},isDropEffectAllowed:{value:function(e,t){return t===this.All||e===t||e===this.Copy&&(t===this.CopyMove||t===this.CopyLink)||e===this.Move&&(t===this.CopyMove||t===this.LinkMove)||e===this.Link&&(t===this.LinkMove||t===this.CopyLink)}},fromDataTransfer:{value:function(e){var t=new DataTransfer;return t.items=e.items,t.files=e.files,t.types=e.types,t.dropEffect="none"===e.dropEffect?this.Default:e.dropEffect,t.effectAllowed=e.effectAllowed,t}}});exports.DragEvent=MutableEvent.specialize({type:{value:"drag"},_event:{enumerable:!1,value:null},event:{get:function(){return this._event},set:function(e){this._event=e}},bubbles:{value:!0},dataTransfer:{value:null},constructor:{value:function(e,t){this.dataTransfer=new DataTransfer,this._event=new CustomEvent(e,t),this.type=e}}},{DRAGSTART:{value:"dragstart"},DRAG:{value:"drag"},DRAGENTER:{value:"dragenter"},DRAGEXIT:{value:"dragexit"},DRAGLEAVE:{value:"dragleave"},DROP:{value:"drop"},DRAGEND:{value:"dragend"}})}