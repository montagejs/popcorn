montageDefine("64d2e12","core/document-resources",{dependencies:["./core","./promise","./mini-url"],factory:function(e,t,r){var i=e("./core").Montage,o=e("./promise").Promise,n=e("./mini-url"),s=i.specialize({_SCRIPT_TIMEOUT:{value:5e3},_document:{value:null},_resources:{value:null},_preloaded:{value:null},_expectedStyles:{value:null},constructor:{value:function(){this._expectedStyles=[],this._isPollingDocumentStyleSheets=!this._isLinkLoadEventAvailable()}},_webkitVersion:{value:function(){var e=/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);return e?parseInt(e[1]):null}},_isLinkLoadEventAvailable:{value:function(){var e=document.createElement("link"),t=this._webkitVersion();return"onload"in e&&!(null!==t&&t<535)}},initWithDocument:{value:function(e){return this.clear(),this._document=e,this._populateWithDocument(e),this}},_populateWithDocument:{value:function(e){var t=e.querySelectorAll("script"),r=Array.prototype.forEach;r.call(t,function(e){e.src&&this._addResource(this.normalizeUrl(e.src))},this);var i=e.querySelectorAll("link");r.call(i,function(e){"stylesheet"===e.rel&&this._addResource(this.normalizeUrl(e.href))},this)}},clear:{value:function(){this._resources=Object.create(null),this._preloaded=Object.create(null)}},_addResource:{value:function(e){this._resources[e]=!0}},hasResource:{value:function(e){return e in this._resources}},isResourcePreloaded:{value:function(e){return this._preloaded[e]===!0}},isResourcePreloading:{value:function(e){return o.is(this._preloaded[e])}},setResourcePreloadedPromise:{value:function(e,t){this._preloaded[e]=t}},setResourcePreloaded:{value:function(e){this._preloaded[e]=!0}},getResourcePreloadedPromise:{value:function(e){return this._preloaded[e]}},addScript:{value:function(e){var t=this.normalizeUrl(e.src);return t?this.isResourcePreloaded(t)?o.resolve():this.isResourcePreloading(t)?this.getResourcePreloadedPromise(t):this._importScript(e):this._importScript(e)}},_importScript:{value:function(e){var t,r=this,i=this._document,n=i.head,s=e.src;return s?(r._addResource(s),t=new o(function(t,i){var o,n=function l(i){r.setResourcePreloaded(s),e.removeEventListener("load",l,!1),e.removeEventListener("error",l,!1),clearTimeout(o),t(i)};e.addEventListener("load",n,!1),e.addEventListener("error",n,!1),o=setTimeout(function(){r.setResourcePreloaded(s),t()},r._SCRIPT_TIMEOUT)}),this.setResourcePreloadedPromise(s,t)):t=new o(function(e,t){e()}),n.appendChild(i.createComment("Inserted from FIXME")),n.appendChild(e),t}},handleEvent:{value:function(e){var t,r=e.target;"LINK"===r.tagName&&(t=this._expectedStyles.indexOf(r.href),t>=0&&this._expectedStyles.splice(t,1),r.removeEventListener("load",this,!1),r.removeEventListener("error",this,!1))}},addStyle:{value:function(e,t){var r,i=e.getAttribute("href");if(i){if(i=this.normalizeUrl(i),this.hasResource(i))return;this._addResource(i),this._expectedStyles.push(i),this._isPollingDocumentStyleSheets||(e.setAttribute("href",i),e.addEventListener("load",this,!1),e.addEventListener("error",this,!1))}r=t||this._document.head,r.insertBefore(e,r.firstChild)}},normalizeUrl:{value:function(e,t){return t||(t=this._document.location.href),n.resolve(t,e)}},domain:{value:global.location?global.location.protocol+"//"+global.location.host:""},isCrossDomain:{value:function(e){return 0!==e.indexOf(this.domain+"/")||0===e.indexOf("file://")}},preloadResource:{value:function(e,t){var r;return e=this.normalizeUrl(e),!t&&this.isCrossDomain(e)&&(r=!0),r||this.isResourcePreloaded(e)?o.resolve():this.isResourcePreloading(e)?this.getResourcePreloadedPromise(e):this._preloadResource(e)}},_preloadResource:{value:function(e){var t=this,r=new o(function(r,i){var o=new XMLHttpRequest;o.open("GET",e),o.addEventListener("load",r,!1),o.addEventListener("error",r,!1),o.addEventListener("timeout",r,!1),o.timeout=t._SCRIPT_TIMEOUT,o.send(),o.listener=r}).bind(this).then(function(t){this.setResourcePreloaded(e),t.target.removeEventListener("load",t.target.listener),t.target.removeEventListener("error",t.target.listener),t.target.removeEventListener("timeout",t.target.listener)});return this.setResourcePreloadedPromise(e,r),r}},areStylesLoaded:{get:function(){var e,t;if(this._isPollingDocumentStyleSheets&&this._expectedStyles.length>0){e=this._document.styleSheets;for(var r,i=0;r=e[i];i++)t=this._expectedStyles.indexOf(r.href),t>=0&&this._expectedStyles.splice(t,1)}return 0===this._expectedStyles.length}}},{getInstanceForDocument:{value:function(e){var t=e.__montage_resources__;return t||(t=e.__montage_resources__=(new s).initWithDocument(e)),t}}});t.DocumentResources=s}});