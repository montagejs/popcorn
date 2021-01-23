var Component=require("ui/component").Component,defaultOptions=Object.deepFreeze({allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","img","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","span"],allowedAttributes:{"*":["href","align","alt","center","bgcolor","src","title","height","width","data-*","style"],a:["href","name","target"],img:["src"]}}),HtmlFragment=exports.HtmlFragment=Component.specialize({_value:{value:null},value:{set:function(e){this._value!==e&&(void 0!==e&&null!==e?this._value=e:this._value=null,this.needsSanitizeHtml=!0,this.needsDraw=!0)},get:function(){return this._value}},allowedTags:{value:null},allowedAttributes:{value:null},defaultAllowedTags:{get:function(){return defaultOptions.allowedTags}},defaultAllowedAttributes:{get:function(){return defaultOptions.allowedAttributes}},_sanitizeNode:{value:function(e,t,l){if(e){var a=e.children;if(a)for(var i,n,o,r,s,u,d,h,f,m,c,g=0,v=a.length;g<v;g++)if(f=a[g],h=f.tagName.toLowerCase(),t&&t.indexOf(h)===-1)e.removeChild(f),g--,v--;else{for(o=f.attributes,i=l[h]||l["*"],m=0,c=o.length;m<c;m++)n=!1,r=o[m],s=r.name,u=r.value,i&&i.indexOf(s)===-1&&(n=!0,s.startsWith("data-")&&i.indexOf("data-*")>-1&&(n=!1)),n?(d=this.callDelegateMethod("htmlFragmentWillRemoveNodeAttribute",this,f,r),"boolean"==typeof d&&(n=d),n&&(f.removeAttribute(s),c--,m--)):(d=this.callDelegateMethod("htmlFragmentWillUseValueForNodeAttribute",this,u,f,s),"string"==typeof d&&(u=d),f.setAttribute(s,u));this._sanitizeNode(f,t,l)}}return e}},_sanitizeHtml:{value:function(e,t,l){var a;if(window.DOMParser){try{a=(new DOMParser).parseFromString(e,"text/html")}catch(i){console.error(i)}a&&this._sanitizeNode(a.body,t,l)}return a}},draw:{value:function(){if(this.needsSanitizeHtml&&(this.element.innerHTML="",this.value)){var e=this._sanitizeHtml(this.value,this.allowedTags||defaultOptions.allowedTags,this.allowedAttributes||defaultOptions.allowedAttributes);if(e){var t=e.createRange();t.selectNodeContents(e.body),this.element.appendChild(t.extractContents()),t.selectNodeContents(e.head),this.element.appendChild(t.extractContents())}}}}},{DefaultSanitizerOptions:{value:defaultOptions}});