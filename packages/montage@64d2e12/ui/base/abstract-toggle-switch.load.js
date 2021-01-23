montageDefine("64d2e12","ui/base/abstract-toggle-switch",{dependencies:["./abstract-control","../../composer/press-composer"],factory:function(e,t,s){var n=e("./abstract-control").AbstractControl,i=e("../../composer/press-composer").PressComposer;t.AbstractToggleSwitch=n.specialize({constructor:{value:function c(){if(this.constructor===c)throw new Error("AbstractToggleSwitch cannot be instantiated.");this._pressComposer=new i,this.addComposer(this._pressComposer),this.defineBindings({"classList.has('montage-ToggleSwitch--checked')":{"<-":"checked"},"classList.has('montage--disabled')":{"<-":"!enabled"}})}},_enabled:{value:!0},enabled:{get:function(){return this._enabled},set:function(e){this._enabled=e,this.needsDraw=!0}},acceptsActiveTarget:{value:function(){return this.enabled}},_pressComposer:{value:null},_checked:{value:!1},checked:{get:function(){return this._checked},set:function(e){this._checked=e,this.needsDraw=!0}},prepareForActivationEvents:{value:function(){this._pressComposer.addEventListener("press",this,!1)}},handlePress:{value:function(e){this.enabled&&(this.checked=!this.checked,this.dispatchActionEvent())}},handleKeyup:{value:function(e){this.enabled&&32===e.keyCode&&(this.checked=!this.checked,this.dispatchActionEvent())}},enterDocument:{value:function(e){this.element.setAttribute("role","checkbox"),this.element.addEventListener("keyup",this,!1)}},draw:{value:function(){this.element.setAttribute("aria-checked",this._checked),this.element.setAttribute("aria-disabled",!this._enabled)}}})}});