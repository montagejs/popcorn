montageDefine("64d2e12","data/model/data-query",{dependencies:["montage"],factory:function(e,t,i){var r=e("montage").Montage;t.DataQuery=r.specialize({deserializeSelf:{value:function(e){var t,i;if(i=e.getProperty("criteria"),void 0!==i&&(this.criteria=i),i=e.getProperty("orderings"),void 0!==i&&(this.orderings=i),i=e.getProperty("prefetchExpressions"),void 0!==i&&(this.prefetchExpressions=i),i=e.getProperty("selectBindings"),void 0!==i&&(this.selectBindings=i),i=e.getProperty("selectExpression"),void 0!==i&&(this.selectExpression=i),i=e.getProperty("type"),void 0!==i)this.type=i;else if(i=e.getProperty("typeModule")){var r=this;t=i.require.async(i.id).then(function(e){return r.type=e.montageObject,r})}return t||Promise.resolve(this)}},serializeSelf:{value:function(e){e.setProperty("criteria",this.criteria),e.setProperty("orderings",this.orderings),e.setProperty("prefetchExpressions",this.prefetchExpressions),e.setProperty("selectBindings",this.selectBindings),e.setProperty("selectExpression",this.selectExpression),this.type.objectDescriptorInstanceModule?e.setProperty("typeModule",this.type.objectDescriptorInstanceModule):e.setProperty("type",this.type)}},type:{serializable:"value",value:void 0},name:{value:void 0},criteria:{get:function(){return this._criteria||(this._criteria={}),this._criteria},set:function(e){this._criteria=e}},_criteria:{value:void 0},orderings:{get:function(){return this._orderings||(this._orderings=[]),this._orderings},set:function(e){this._orderings=e}},_orderings:{value:void 0},selectBindings:{value:void 0},selectExpression:{value:void 0},prefetchExpressions:{value:null}},{withTypeAndCriteria:{value:function(e,t){var i;return i=new this,i.type=e,i.criteria=t,i}}})}});