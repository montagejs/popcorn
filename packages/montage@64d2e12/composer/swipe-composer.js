var Montage=require("../core/core").Montage,Composer=require("./composer").Composer,MutableEvent=require("../core/event/mutable-event").MutableEvent,TranslateComposer=require("./translate-composer").TranslateComposer,DIRECTION_LEFT="left",DIRECTION_RIGHT="right",DIRECTION_UP="up",DIRECTION_DOWN="down",SWIPE="swipe",SwipeEvent=exports.SwipeEvent=MutableEvent.specialize({type:{value:SWIPE},_event:{enumerable:!1,value:null},event:{get:function(){return this._event},set:function(t){this._event=t}},bubbles:{value:!0},direction:{value:null},angle:{value:null},distance:{value:null},velocity:{value:null},startPositionX:{value:null},startPositionY:{value:null},endPositionX:{value:null},endPositionY:{value:null},constructor:{value:function(t,e){this._event=new CustomEvent(t,e),this.type=t}}});exports.SwipeComposer=Composer.specialize({_startPositionX:{value:null},_startPositionY:{value:null},_startTimestamp:{value:null},__translateComposer:{value:null},_translateComposer:{get:function(){return this.__translateComposer||(this.__translateComposer=new TranslateComposer,this.__translateComposer.hasMomentum=!1),this.__translateComposer}},minDistance:{value:10},minVelocity:{value:.3},load:{value:function(){this.component.addComposerForElement(this._translateComposer,this.element),this._translateComposer.load(),this._translateComposer.addEventListener("translateStart",this,!1)}},unload:{value:function(){this.component.unloadComposer(this._translateComposer),this._translateComposer.unload(),this._translateComposer.removeEventListener("translateStart",this,!1)}},handleTranslateStart:{value:function(t){this._startPositionX=this._translateComposer.pointerStartEventPosition.pageX,this._startPositionY=this._translateComposer.pointerStartEventPosition.pageY,this._startTimestamp=t.timeStamp,this._addTranslateEventListeners()}},handleTranslateEnd:{value:function(t){var e=this._findDistance(t.translateX,t.translateY);if(e>=this.minDistance){var n=this._findVelocity(e,t.timeStamp-this._startTimestamp);if(n>this.minVelocity){var s,a=this._findAngle(0,0,t.translateX,t.translateY);s=a>=0&&a<=45||a>=315&&a<=360?DIRECTION_RIGHT:a>45&&a<165?DIRECTION_UP:a>165&&a<225?DIRECTION_LEFT:DIRECTION_DOWN,this._dispatchSwipeEvent(e,n,a,s)}}this._resetComposerState()}},handleTranslateCancel:{value:function(){this._resetComposerState()}},_findAngle:{value:function(t,e,n,s){var a=Math.atan2(s-e,n-t)*-180/Math.PI;return a<0&&(a=360+a),a}},_findVelocity:{value:function(t,e){return e>300?0:t/e}},_findDistance:{value:function(t,e){return Math.sqrt(t*t+e*e)}},_dispatchSwipeEvent:{value:function(t,e,n,s,a,i){var o=new SwipeEvent(SWIPE);o.distance=t,o.velocity=e,o.angle=n,o.direction=s,o.startPositionX=this._startPositionX,o.startPositionY=this._startPositionY,o.endPositionX=a,o.endPositionY=i,this.dispatchEvent(o)}},_addTranslateEventListeners:{value:function(){this._translateComposer.addEventListener("translateCancel",this),this._translateComposer.addEventListener("translateEnd",this)}},_removeTranslateEventListeners:{value:function(){this._translateComposer.removeEventListener("translateCancel",this),this._translateComposer.removeEventListener("translateEnd",this)}},_resetComposerState:{value:function(){this._startPositionX=0,this._startPositionY=0,this._direction=null,this.__translateComposer.translateX=0,this.__translateComposer.translateY=0,this._removeTranslateEventListeners()}}});