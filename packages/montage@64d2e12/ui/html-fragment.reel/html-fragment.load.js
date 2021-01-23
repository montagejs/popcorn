montageDefine("64d2e12","ui/html-fragment.reel/html-fragment",{dependencies:["ui/component"],factory:function(e,t,l){var a=e("ui/component").Component,i=Object.deepFreeze({allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","p","a","ul","ol","nl","li","b","i","img","strong","em","strike","code","hr","br","div","table","thead","caption","tbody","tr","th","td","pre","span"],allowedAttributes:{"*":["href","align","alt","center","bgcolor","src","title","height","width","data-*","style"],a:["href","name","target"],img:["src"]}});t.HtmlFragment=a.specialize({_value:{value:null},value:{set:function(e){this._value!==e&&(void 0!==e&&null!==e?this._value=e:this._value=null,this.needsSanitizeHtml=!0,this.needsDraw=!0)},get:function(){return this._value}},allowedTags:{value:null},allowedAttributes:{value:null},defaultAllowedTags:{get:function(){return i.allowedTags}},defaultAllowedAttributes:{get:function(){return i.allowedAttributes}},_sanitizeNode:{value:function(e,t,l){if(e){var a=e.children;if(a)for(var i,n,r,o,s,d,u,h,c,m,f,g=0,v=a.length;g<v;g++)if(c=a[g],h=c.tagName.toLowerCase(),t&&t.indexOf(h)===-1)e.removeChild(c),g--,v--;else{for(r=c.attributes,i=l[h]||l["*"],m=0,f=r.length;m<f;m++)n=!1,o=r[m],s=o.name,d=o.value,i&&i.indexOf(s)===-1&&(n=!0,s.startsWith("data-")&&i.indexOf("data-*")>-1&&(n=!1)),n?(u=this.callDelegateMethod("htmlFragmentWillRemoveNodeAttribute",this,c,o),"boolean"==typeof u&&(n=u),n&&(c.removeAttribute(s),f--,m--)):(u=this.callDelegateMethod("htmlFragmentWillUseValueForNodeAttribute",this,d,c,s),"string"==typeof u&&(d=u),c.setAttribute(s,d));this._sanitizeNode(c,t,l)}}return e}},_sanitizeHtml:{value:function(e,t,l){var a;if(window.DOMParser){try{a=(new DOMParser).parseFromString(e,"text/html")}catch(i){console.error(i)}a&&this._sanitizeNode(a.body,t,l)}return a}},draw:{value:function(){if(this.needsSanitizeHtml&&(this.element.innerHTML="",this.value)){var e=this._sanitizeHtml(this.value,this.allowedTags||i.allowedTags,this.allowedAttributes||i.allowedAttributes);if(e){var t=e.createRange();t.selectNodeContents(e.body),this.element.appendChild(t.extractContents()),t.selectNodeContents(e.head),this.element.appendChild(t.extractContents())}}}}},{DefaultSanitizerOptions:{value:i}})}});