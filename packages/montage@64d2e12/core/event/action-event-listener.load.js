montageDefine("64d2e12","core/event/action-event-listener",{dependencies:["../core","../core","../core","../core","../core"],factory:function(e,t,i){var r=e("../core").Montage;t.ActionEventListener=r.specialize({handler:{value:null},action:{value:null},initWithHandler_action_:{value:function(e,t){return this.handler=e,this.action=t,this}},handleEvent:{value:function(e){if("function"==typeof this.action){var t=this.handler?this.handler:this;this.action.call(t,e)}else this.handler&&this.action&&this.handler[this.action](e)}},serializeProperties:{value:function(e){e.set("handler",this.handler,"reference"),e.set("action",this.action)}}},{objectDescriptorModuleId:e("../core")._objectDescriptorModuleIdDescriptor,objectDescriptor:e("../core")._objectDescriptorDescriptor,blueprintModuleId:e("../core")._blueprintModuleIdDescriptor,blueprint:e("../core")._blueprintDescriptor})}});