montageDefine("64d2e12","core/serialization/deserializer/montage-deserializer",{dependencies:["../../core","./montage-interpreter","./montage-reviver","../bindings","collections/map","core/promise","../../deprecate"],factory:function(e,i,t){var r=e("../../core").Montage,n=e("./montage-interpreter").MontageContext,o=e("./montage-reviver").MontageReviver,a=e("../bindings"),s=e("collections/map").Map,l=e("core/promise").Promise,c=e("../../deprecate"),u=i.MontageDeserializer=r.specialize({_serializationString:{value:null},_serialization:{value:null},serialization:{value:{get:function(){return this._serialization}}},init:{value:function(e,i,t,r,n){"string"==typeof e?this._serializationString=e:this._serializationString=JSON.stringify(e),this._require=i,this._module=r;var a=r&&i.location+r.id;return this._locationId=a,this._reviver=(new o).init(i,t,this,n,a),this._isSync=n,this}},_isSync:{value:!1},isSync:{get:function(){return this._isSync}},deserialize:{value:function(e,i){var t,r=this._module&&u.moduleContexts.get(this._module);if(r){if(r._objects.root)return this._isSync?r._objects:l.resolve(r._objects);if(t=new Error('Unable to deserialize because a circular dependency was detected. Module "'+this._locationId+'" has already been loaded but its root could not be resolved.'),this._isSync)throw t;return l.reject(t)}try{var o=JSON.parse(this._serializationString);r=(new n).init(o,this._reviver,e,i,this._require,this._isSync),this._locationId&&u.moduleContexts.set(this._module,r);try{return r.getObjects()}catch(a){if(this._isSync)throw a;return l.reject(a)}}catch(a){if(this._isSync)throw a;return this._formatSerializationSyntaxError(this._serializationString)}}},deserializeObject:{value:function(e){return this._isSync?this.deserialize(e).root:this.deserialize(e).then(function(e){return e.root})}},preloadModules:{value:function(){var e,i,t,r,n,a,s,c,u=JSON.parse(this._serializationString),d=this._reviver,h=d.moduleLoader;if(null!==u)for(i=Object.keys(u),e=0;t=i[e];++e)if(r=u[t],n=r.prototype||r.object){if("string"!=typeof n)throw new Error("Property 'object' of the object with the label '"+t+"' must be a module id");a=o.parseObjectLocationId(n),s=h.getModule(a.moduleId,t),l.is(s)&&(c||(c=[])).push(s)}if(c)return l.all(c)}},getExternalObjectLabels:{value:function(){var e=this._serialization,i=[];for(var t in e)0===Object.keys(e[t]).length&&i.push(t);return i}},_formatSerializationSyntaxError:{value:function(i){var t,r,n,o,a,s="   ",l=this._origin;return e.async("core/jshint").then(function(e){if(e.JSHINT(i))t="Syntax error in the serialization but not able to find it!\n"+i;else{r=e.JSHINT.errors[0],n=i.split("\n"),o=(s+n.length).length,a=r.line-1;for(var c=0,u=n.length;c<u;c++)n[c]=new Array(o-(c+1+"").length+1).join(c===a?">":" ")+(c+1)+" "+n[c];t="Syntax error at line "+r.line+(l?" from "+l:"")+":\n"+r.evidence+"\n"+r.reason+"\n"+n.join("\n")}throw new Error(t)})}},initWithObject:{value:c.deprecateMethod(void 0,function(e,i,t,r,n){return this.init(e,i,t,r,n)},"initWithObject","init")},initWithObjectAndRequire:{value:c.deprecateMethod(void 0,function(e,i,t){return this.init(e,i,t)},"initWithObjectAndRequire","init")}},{getModuleRequire:{value:function(e,i){for(var t=e.resolve(i),r=e.getModuleDescriptor(t);r.redirect||r.mappingRedirect;)r.redirect?t=r.redirect:(e=r.mappingRequire,t=r.mappingRedirect),r=e.getModuleDescriptor(t);return r.require}},_cache:{value:null},moduleContexts:{get:function(){return this._cache||(this._cache=new s),this._cache}}});u.defineDeserializationUnit=function(e,i){o.defineUnitReviver(e,i)},u.defineDeserializationUnit("bindings",a.deserializeObjectBindings),i.deserialize=function(e,i){return(new u).init(e,i).deserializeObject()}}});