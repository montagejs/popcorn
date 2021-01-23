montageDefine("0909117","ui/video-control.reel/video-control-track.reel/video-control-track",{dependencies:["montage/ui/base/abstract-slider","montage/ui/base/abstract-progress-bar","montage/ui/component"],factory:function(e,t,a){var n=e("montage/ui/base/abstract-slider").AbstractSlider,i=e("montage/ui/base/abstract-progress-bar").AbstractProgressBar,l=e("montage/ui/component").Component;t.VideoControlTrack=l.specialize({constructor:{value:function(){this["super"](),this.defineBinding("max",{"<-":"videoController.duration"}),this.defineBinding("time",{"<-":"videoController.position"})}},time:{value:0},slider:{value:null},videoController:{value:null},_wasPlaying:{value:!1},sliderTranslateStart:{value:function(e){this.videoController.status===this.videoController.PLAYING?(this._wasPlaying=!0,this.videoController.pause()):this._wasPlaying=!1}},sliderTranslateEnd:{value:function(e){this._wasPlaying&&this.videoController.unpause()}}}),t.Slider=n.specialize({constructor:{value:function(){this["super"](),this.defineBinding("max",{"<-":"controller.max"}),this.defineBinding("value",{"<->":".controller.videoController.position",source:this})}},hasTemplate:{value:!1},controller:{value:!1},handleThumbTranslateStart:{value:function(e){n.handleThumbTranslateStart.apply(this,arguments),this.controller&&"function"==typeof this.controller.sliderTranslateStart&&this.controller.sliderTranslateStart.apply(this.controller,arguments)}},handleThumbTranslateEnd:{value:function(e){n.handleThumbTranslateEnd.apply(this,arguments),this.controller&&"function"==typeof this.controller.sliderTranslateEnd&&this.controller.sliderTranslateEnd.apply(this.controller,arguments)}}});t.ProgressBar=i.specialize({constructor:{value:function(){this["super"](),this.defineBinding("max",{"<-":"controller.max"}),this.defineBinding("value",{"<-":"controller.time"})}},_max:{value:100},max:{set:function(e){if(!isNaN(e)){var t=+e;this._max!==t&&(this._max=t,this.needsDraw=!0)}},get:function(){return this._max}},_value:{value:0},value:{set:function(e){if(!isNaN(e)){var t=+e;this._value!==t&&(this._value=t>this._max?this._max:t<0?0:t,this.needsDraw=!0)}},get:function(){return this._value}},controller:{value:!1},hasTemplate:{value:!1},_progressBarValueElement:{value:null},draw:{value:function(){this._progressBarValueElement.style.left=this.max>0?-(100-100*this._value/this.max)+"%":"-100%"}}})}});