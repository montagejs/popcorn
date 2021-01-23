var DataProvider=require("data/service/data-provider").DataProvider,ObjectDescriptor=require("core/meta/object-descriptor").ObjectDescriptor,DataQuery=require("data/model/data-query").DataQuery,Promise=require("core/promise").Promise,deprecate=require("core/deprecate"),parse=require("frb/parse"),Scope=require("frb/scope"),compile=require("frb/compile-evaluator");exports.DataStream=DataProvider.specialize({query:{value:void 0},selector:{get:deprecate.deprecateMethod(void 0,function(){return this.query},"selector","query"),set:deprecate.deprecateMethod(void 0,function(e){this.query=e},"selector","query")},data:{get:function(){return this._data||(this._data=[]),this._data}},requestData:{value:function(e,t){return this}},_resolve:{value:function(e){this.__promise||(this.__promise=Promise.resolve(e))}},_reject:{value:function(e){this.__promise||(this.__promise=function(){return Promise.reject(e)})}},_promise:{get:function(){var e=this;return"function"==typeof this.__promise?this.__promise=this.__promise():this.__promise||(this.__promise=new Promise(function(t,r){e._resolve=t,e._reject=r})),this.__promise}},then:{value:function(e,t){return this._promise.then(e,t)}},"catch":{value:function(e){return this._promise["catch"](e)}},addData:{value:function(e){var t=e;this.dataExpression&&e&&(t=this._compiledDataExpression(new Scope(e))),t&&Array.isArray(t)?this.data.push.apply(this.data,t):t&&this.data.push(t)}},dataDone:{value:function(){this._resolve(this.data),delete this._resolve,delete this._reject}},dataError:{value:function(e){this._reject(e),delete this._reject,delete this._resolve}},_compiledDataExpression:{get:function(){return this.__compiledDataExpression||(this.__compiledDataExpression=compile(this._dataExpressionSyntax))}},_dataExpressionSyntax:{get:function(){return this.__dataExpressionSyntax||(this.__dataExpressionSyntax=parse(this.dataExpression))}},dataExpression:{value:void 0},evaluateDataExpression:{value:function(e){return this._compiledDataExpression(e)}},dataReceptionTime:{value:void 0},_dataMaxAge:{value:void 0},dataMaxAge:{get:function(){return this._dataMaxAge||this.query.type.maxAge},set:function(e){this._dataMaxAge=e}}},{withTypeOrSelector:{value:deprecate.deprecateMethod(exports.DataStream,function(e){return this.withTypeOrQuery(e)},"withTypeOrSelector","withTypeOrQuery",!0)},withTypeOrQuery:{value:function(e){var t=e instanceof ObjectDescriptor&&e,r=t&&DataQuery.withTypeAndCriteria(t)||e,i=new this;return i.query=r,i}}});