montageDefine("64d2e12","ui/check-control",{dependencies:["ui/control","composer/press-composer"],factory:function(e,t,s){var n=e("ui/control").Control,i=e("composer/press-composer").PressComposer;t.CheckControl=n.specialize({constructor:{value:function(){this.defineBindings({"classList.has('montage--checked')":{"<-":"checked"}});var e="classList.has('",t={};e+=this.checkedClassName,e+="')",t[e]={"<-":"checked"},this.defineBindings(t)}},draw:{value:function(){this["super"](),this._element.setAttribute("aria-checked",this._checked)}},_pressComposer:{enumerable:!1,value:null},prepareForActivationEvents:{value:function(){var e=this._pressComposer=new i;this.addComposer(e),e.addEventListener("pressStart",this,!1),e.addEventListener("press",this,!1),e.addEventListener("cancel",this,!1),this._element.addEventListener("change",this)}},toggleChecked:{value:function(){this.disabled||(this.checked=!this.checked,this.dispatchActionEvent())}},_fakeCheck:{enumerable:!1,value:function(){var e;this._element.checked=!this._element.checked,e=document.createEvent("HTMLEvents"),e.initEvent("change",!0,!0),this._element.dispatchEvent(e)}},_shouldFakeCheck:{enumerable:!1,value:!1},handlePressStart:{value:function(e){this.hasStandardElement?this._shouldFakeCheck=e.defaultPrevented:(this.active=!0,e.touch&&document.addEventListener("touchmove",this,!1))}},handlePress:{value:function(e){this._shouldFakeCheck&&(this._shouldFakeCheck=!1,this._fakeCheck()),this.hasStandardElement||(this.active=!1,this.toggleChecked())}},handlePressCancel:{value:function(){this.hasStandardElement||(this.active=!1,document.removeEventListener("touchmove",this,!1))}},handleChange:{enumerable:!1,value:function(e){this._pressComposer&&this._pressComposer.state===i.CANCELLED||(Object.getPropertyDescriptor(this,"checked").set.call(this,this.element.checked,!0),this.dispatchActionEvent())}}}),t.CheckControl.addAttributes({checked:{value:!1,dataType:"boolean"},value:{value:"on"}})}});