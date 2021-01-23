montageDefine("0909117","ui/video-control.reel/video-control.html",{"text":"<!DOCTYPE html><html manifest=../../../../manifest.appcache><head><title></title><style>.digit-VideoControl{display:-webkit-flex;display:-ms-flexbox;display:flex;position:absolute;z-index:2;margin:0;padding:0;left:0;right:0;bottom:0;font-size:30px;height:60px;box-sizing:border-box;background-color:hsla(0,100%,100%,.9);opacity:0;-webkit-transform:translate3d(0,60px,0);-moz-transform:translate3d(0,60px,0);-ms-transform:translate3d(0,60px,0);transform:translate3d(0,60px,0);-webkit-transition:-webkit-transform .2s cubic-bezier(.66,.12,.88,.5),opacity .2s cubic-bezier(.66,.12,.88,.5);-moz-transition:-moz-transform .2s cubic-bezier(.66,.12,.88,.5),opacity .2s cubic-bezier(.66,.12,.88,.5);-ms-transition:-ms-transform .2s cubic-bezier(.66,.12,.88,.5),opacity .2s cubic-bezier(.66,.12,.88,.5);transition:transform .2s cubic-bezier(.66,.12,.88,.5),opacity .2s cubic-bezier(.66,.12,.88,.5)}.digit-VideoControl-button-time{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:.5em;padding-left:1em}.digit-VideoControl-button-play,.digit-VideoControl-button-fullScreen{outline:none;display:block;position:relative;margin:0;width:2em;height:2em;line-height:2em;border:none;font-size:inherit;text-align:center;color:currentColor;background-color:transparent;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}.digit-VideoControl-button-play:before,.digit-VideoControl-button-fullScreen:before{display:block;position:absolute;top:0;left:0;width:inherit;height:inherit;line-height:inherit;text-align:center}.digit-VideoControl-button-play:active,.digit-VideoControl-button-fullScreen:active{background-color:hsla(0,0%,100%,.1)}[data-montage-skin=\"wireframe\"] .digit-VideoControl{color:#4D4D4D;background:hsla(0,0%,98%,.9)}[data-montage-skin=\"wireframe\"] .digit-VideoControl-button-play,[data-montage-skin=\"wireframe\"] .digit-VideoControl-button-fullScreen,[data-montage-skin=\"wireframe\"] .digit-VideoControl-button-time{color:#4D4D4D}[data-montage-skin=\"wireframe\"] .digit-VideoControl-button-play:active,[data-montage-skin=\"wireframe\"] .digit-VideoControl-button-fullScreen:active{color:#1B1B1B;background:0 0}[data-montage-skin=\"light\"] .digit-VideoControl{background:-webkit-linear-gradient(top,hsla(0,0%,100%,.96),hsla(0,0%,90%,.9));background:-moz-linear-gradient(top,hsla(0,0%,100%,.96),hsla(0,0%,90%,.9));background:-ms-linear-gradient(top,hsla(0,0%,100%,.96),hsla(0,0%,90%,.9));background:linear-gradient(top,hsla(0,0%,100%,.96),hsla(0,0%,90%,.9))}[data-montage-skin=\"light\"] .digit-VideoControl-button-play,[data-montage-skin=\"light\"] .digit-VideoControl-button-fullScreen,[data-montage-skin=\"light\"] .digit-VideoControl-button-time{color:hsla(0,0%,0%,.6);text-shadow:0 1px hsla(0,0%,100%,1)}[data-montage-skin=\"light\"] .digit-VideoControl-button-play:active{background:-webkit-linear-gradient(left,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:-moz-linear-gradient(left,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:-ms-linear-gradient(left,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:linear-gradient(left,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0))}[data-montage-skin=\"light\"] .digit-VideoControl-button-fullScreen:active{background:-webkit-linear-gradient(right,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:-moz-linear-gradient(right,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:-ms-linear-gradient(right,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0));background:linear-gradient(right,hsla(0,0%,0%,.1),hsla(0,0%,0%,.1),hsla(0,0%,0%,0))}[data-montage-skin=\"dark\"] .digit-VideoControl{background:-webkit-linear-gradient(top,hsla(0,0%,24%,.92),hsla(0,0%,15%,1));background:-moz-linear-gradient(top,hsla(0,0%,24%,.92),hsla(0,0%,15%,1));background:-ms-linear-gradient(top,hsla(0,0%,24%,.92),hsla(0,0%,15%,1));background:linear-gradient(top,hsla(0,0%,24%,.92),hsla(0,0%,15%,1))}[data-montage-skin=\"dark\"] .digit-VideoControl-button-play,[data-montage-skin=\"dark\"] .digit-VideoControl-button-fullScreen,[data-montage-skin=\"dark\"] .digit-VideoControl-button-time{color:hsla(0,0%,100%,.7);text-shadow:0 1px hsla(0,0%,0%,.2)}[data-montage-skin=\"dark\"] .digit-VideoControl-button-play:active{background:-webkit-linear-gradient(left,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:-moz-linear-gradient(left,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:-ms-linear-gradient(left,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:linear-gradient(left,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0))}[data-montage-skin=\"dark\"] .digit-VideoControl-button-fullScreen:active{background:-webkit-linear-gradient(right,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:-moz-linear-gradient(right,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:-ms-linear-gradient(right,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0));background:linear-gradient(right,hsla(0,0%,100%,.1),hsla(0,0%,100%,.1),hsla(0,0%,100%,0))}</style><script type=text/montage-serialization>{\"owner\":{\"properties\":{\"element\":{\"#\":\"video-control\"},\"_controlTrack\":{\"@\":\"track\"}}},\"play\":{\"prototype\":\"ui/video-control.reel[Button]\",\"properties\":{\"element\":{\"#\":\"play\"}},\"listeners\":[{\"type\":\"action\",\"listener\":{\"@\":\"owner\"}}]},\"track\":{\"prototype\":\"ui/video-control.reel/video-control-track.reel\",\"properties\":{\"element\":{\"#\":\"track\"}},\"bindings\":{\"videoController\":{\"<-\":\"@owner.videoController\"}}},\"time\":{\"prototype\":\"montage/ui/text.reel\",\"properties\":{\"element\":{\"#\":\"time\"}},\"bindings\":{\"value\":{\"<-\":\"@owner.formattedTime\"}}},\"fullScreen\":{\"prototype\":\"ui/video-control.reel[Button]\",\"properties\":{\"element\":{\"#\":\"fullScreen\"}},\"listeners\":[{\"type\":\"action\",\"listener\":{\"@\":\"owner\"}}]}}</script></head><body><menu data-montage-id=video-control class=digit-VideoControl><button data-montage-id=play class=digit-VideoControl-button-play></button><div data-montage-id=track></div><div data-montage-id=time class=digit-VideoControl-button-time></div><button data-montage-id=fullScreen class=digit-VideoControl-button-fullScreen></button></menu></body></html>"})