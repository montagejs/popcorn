montageDefine("64d2e12","montage",{dependencies:["montage/core/serialization/deserializer/montage-deserializer","./node.js"],factory:function(e,t,n){!function(o,r){"function"==typeof define&&define.amd?define("montage",[],r):"object"==typeof n&&n.exports?n.exports=r(e,t,n):o.Montage=r({},{},{})}(this,function(e,t,n){"use strict";function o(e){var t=e.indexOf("[");return t>0?e.substr(0,t):e}var r=eval,i=r("this"),a=t;i.global=i;var s={makeResolve:function(){try{var e="http://example.org",t="/test.html",n=new URL(t,e).href;if(!n||n!==e+t)throw new Error("NotSupported");return function(e,t){return new URL(t,e).href}}catch(o){var r=/^[\w\-]+:/,i=document.querySelector("head"),a=i.querySelector("base"),s=document.createElement("base"),c=document.createElement("a"),u=!1;return a?u=!0:a=document.createElement("base"),s.href="",function(e,t){var n;if(u||i.appendChild(a),e=String(e),r.test(e)===!1)throw new Error("Can't resolve from a relative location: "+JSON.stringify(e)+" "+JSON.stringify(t));u&&(n=a.href),a.href=e,c.href=t;var o=c.href;return u?a.href=n:i.removeChild(a),o}}},load:function(e,t){var n=document.createElement("script");n.src=e,n.onload=function(){t&&t(null,n),n.parentNode.removeChild(n)},n.onerror=function(){t&&t(new Error("Can't load script "+JSON.stringify(e)),n),n.parentNode.removeChild(n)},document.getElementsByTagName("head")[0].appendChild(n)},getParams:function(){var e,t,n,o,r,i,a;if(!this._params){this._params={};var s=document.getElementsByTagName("script");for(e=0;e<s.length;e++)if(o=s[e],r=!1,o.src&&(n=o.src.match(/^(.*)montage.js(?:[\?\.]|$)/i))&&(this._params.montageLocation=n[1],r=!0),o.hasAttribute("data-montage-location")&&(this._params.montageLocation=o.getAttribute("data-montage-location"),r=!0),r){if(o.dataset)for(a in o.dataset)o.dataset.hasOwnProperty(a)&&(this._params[a]=o.dataset[a]);else if(o.attributes){var c=/^data-(.*)$/,u=/-([a-z])/g,p=function(e,t){return t.toUpperCase()};for(t=0;t<o.attributes.length;t++)i=o.attributes[t],n=i.name.match(c),n&&(this._params[n[1].replace(u,p)]=i.value)}o.parentNode.removeChild(o);break}}return this._params},bootstrap:function(e){function t(){u&&c&&e(c,p,d)}function n(){document.removeEventListener("DOMContentLoaded",n,!0),u=!0;var e=document.documentElement;e.classList?e.classList.add("montage-app-bootstrapping"):e.className=e.className+" montage-app-bootstrapping",document._montageTiming=document._montageTiming||{},document._montageTiming.bootstrappingStartTime=Date.now(),t()}function o(e){if(!h[e]&&g[e]){var t=h[e]={};h[e]=g[e](o,t)||t}return h[e]}function r(){d=o("mini-url"),p=o("promise"),c=o("require"),delete i.bootstrap,t()}function a(e,t){v=v||m(i.location,l.montageLocation),s.load(m(i.location,e),function(n,o){n?s.load(m(v,e),t):t&&t(null,o)})}var c,u,p,d,l=this.getParams(),m=this.makeResolve();/interactive|complete/.test(document.readyState)?n():document.addEventListener("DOMContentLoaded",n,!0);var f={require:"node_modules/mr/require.js","require/browser":"node_modules/mr/browser.js",promise:"node_modules/bluebird/js/browser/bluebird.min.js"},g={},h={};i.bootstrap=function(e,t){g[e]=t,delete f[e];for(var n in f)if(f.hasOwnProperty(n))return;r()};var v;"undefined"==typeof i.BUNDLE?a(f.promise,function(){delete f.promise,i.bootstrap("bluebird",function(e,t){return i.Promise}),i.bootstrap("promise",function(e,t){return i.Promise});for(var e in f)f.hasOwnProperty(e)&&a(f[e])}):(i.nativePromise=i.Promise,Object.defineProperty(i,"Promise",{configurable:!0,set:function(e){Object.defineProperty(i,"Promise",{value:e}),i.bootstrap("bluebird",function(e,t){return i.Promise}),i.bootstrap("promise",function(e,t){return i.Promise})}})),i.bootstrap("mini-url",function(e,t){t.resolve=m})},initMontage:function(e,n,o){for(var r,a=["core/core","core/event/event-manager","core/serialization/deserializer/montage-reviver","core/logger"],s=e("core/promise").Promise,c=[],u=0;r=a[u];u++)c.push(e.deepLoad(r));return s.all(c).then(function(){for(var r,s=0;r=a[s];s++)e(r);var c,u=(e("core/core").Montage,e("core/event/event-manager").EventManager,e("core/event/event-manager").defaultEventManager),p=e("core/serialization/deserializer/montage-deserializer").MontageDeserializer,d=e("core/serialization/deserializer/montage-reviver").MontageReviver;e("core/logger").logger;t.MontageDeserializer=p,t.Require.delegate=t,"function"==typeof i.montageWillLoad&&i.montageWillLoad();var l,m,f=n.packageDescription.applicationPrototype;return f?(l=d.parseObjectLocationId(f),m=n.async(l.moduleId)):m=e.async("core/application"),m.then(function(e){var t=e[l?l.objectName:"Application"];return c=new t,u.application=c,c.eventManager=u,c._load(n,function(){o.module&&n.async(o.module),"function"==typeof i.montageDidLoad&&i.montageDidLoad(),window.MontageElement&&MontageElement.ready(n,c,d)})})})}};t.MJSONCompilerFactory=function(e,t,n,o,r,i){if(n.exports.hasOwnProperty("montageObject"))throw new Error("using reserved word as property name, 'montageObject' at: "+n.location);if(!n.deserializer){a.MontageDeserializer||(a.MontageDeserializer=e("montage/core/serialization/deserializer/montage-deserializer").MontageDeserializer);var s,c=new a.MontageDeserializer,u=e.config.requireForId(n.id);if(n.deserializer=c,c.init(n.text,u,void 0,n,!0),s=c.deserializeObject(),n.exports.montageObject&&n.exports.montageObject!==s)throw new Error("Final deserialized object is different than one set on module "+n.location);n.exports.montageObject||(n.exports.montageObject=s),n.exports?Object.assign(n.exports,n.parsedText):n.exports=n.parsedText,n.deserializer=null,n.text=null}},t.parseMJSONDependencies=function(e){for(var t,n,r=Object.keys(e),i=0,a=[];t=r[i];)n=e[t],n.hasOwnProperty("prototype")?(a.push(o(n.prototype)),"montage/core/meta/object-descriptor-reference"===a[a.length-1]&&a.push(n.properties.valueReference.objectDescriptorModule["%"])):n.hasOwnProperty("object")&&a.push(o(n.object)),i++;return a};var c=".meta",u=".mjson",p=".mjson.load.js";return t.Compiler=function(e,n){return function(o){if(o.exports||o.factory||"string"!=typeof o.text||"object"==typeof o.exports)return o;var r=o.location,i=r&&(r.endsWith(u)||r.endsWith(p)||r.endsWith(c));if(i){if("object"!=typeof o.exports&&"string"==typeof o.text){try{o.parsedText=JSON.parse(o.text)}catch(s){if(!(s instanceof SyntaxError))throw s;console.error("SyntaxError parsing JSON at "+r),e.lint(o)}if(o.parsedText.montageObject)throw new Error("using reserved word as property name, 'montageObject' at: "+r)}return o.dependencies=a.parseMJSONDependencies(o.parsedText),o.factory=t.MJSONCompilerFactory,o}var d=n(o);return d}},t.initMontageCustomElement=function(){function e(e){var t=function(){return Reflect.construct(HTMLElement,[],t)};return Object.setPrototypeOf(t.prototype,(e||HTMLElement).prototype),Object.setPrototypeOf(t,e||HTMLElement),t}function t(t,o){if(!customElements.get(t)){var r=e(n);r.componentConstructor=o.constructor,r.observedAttributes=o.observedAttributes,customElements.define(t,r)}}if("undefined"!=typeof window.customElements&&"undefined"!=typeof window.Reflect){var n=e();n.pendingCustomElements=new Map,n.define=function(e,n,o){o&&"object"==typeof o?o.constructor=n:o={constructor:n},this.require?t(e,o):this.pendingCustomElements.set(e,o)},n.ready=function(e,o,r){n.prototype.findProxyForElement=r.findProxyForElement,this.application=o,this.require=e,this.pendingCustomElements.forEach(function(e,n){t(n,e)}),this.pendingCustomElements.clear()},Object.defineProperties(n.prototype,{require:{get:function(){return n.require},configurable:!1},application:{get:function(){return n.application},configurable:!1},componentConstructor:{get:function(){return this.constructor.componentConstructor},configurable:!1},observedAttributes:{get:function(){return this.constructor.observedAttributes},configurable:!1}}),n.prototype.connectedCallback=function(){if(!this._instance){var e=this,t=this.instantiateComponent();return this.findParentComponent().then(function(n){e._instance=t,n.addChildComponent(t),t._canDrawOutsideDocument=!0,t.needsDraw=!0})}},n.prototype.disconnectedCallback=function(){},n.prototype.findParentComponent=function(){for(var e,t,n=this.application.eventManager,o=this;null!==(e=o.parentNode)&&!(t=n.eventHandlerForElement(e));)o=e;return Promise.resolve(t)||this.getRootComponent()},n.prototype.getRootComponent=function(){return n.rootComponentPromise||(n.rootComponentPromise=this.require.async("montage/ui/component").then(function(e){return e.__root__})),n.rootComponentPromise},n.prototype.instantiateComponent=function(){var e=new this.componentConstructor;return this.bootstrapComponent(e),e.element=document.createElement("div"),e},n.prototype.bootstrapComponent=function(e){var t=this.attachShadow({mode:"open"}),n=e.enterDocument,o=e.templateDidLoad,r=this.findProxyForElement(this);if(r){var i,a,s=this.observedAttributes,c=this;if(s&&(a=s.length))for(var u=0;u<a;u++)i=s[u],e.defineBinding(i,{"<->":""+i,source:r})}this.application.eventManager.registerTargetForActivation(t),e.templateDidLoad=function(){var n=e.getResources();n&&(c.injectResourcesWithinCustomElement(n.styles,t),c.injectResourcesWithinCustomElement(n.scripts,t)),this.templateDidLoad=o,"function"==typeof this.templateDidLoad&&this.templateDidLoad()},e.enterDocument=function(e){t.appendChild(this.element),this.enterDocument=n,"function"==typeof this.enterDocument&&this.enterDocument(e)}},n.prototype.injectResourcesWithinCustomElement=function(e,t){if(e&&e.length)for(var n=0,o=e.length;n<o;n++)t.appendChild(e[n])},i.MontageElement=n}},t.initMontage=function(){var e=t.getPlatform();e.bootstrap(function(n,o,r){var a=e.getParams(),c={location:n.getLocation()};t.Require=n;var u=r.resolve(c.location,a.montageLocation),p=r.resolve(c.location,a["package"]||"."),d=a.applicationHash;if("object"==typeof i.BUNDLE){var l={},m=function(e){if(!l[e]){var t=l[e]={},n=new o(function(e,n){t.resolve=e,t.reject=n});return t.promise=n,t}return l[e]};i.bundleLoaded=function(e){m(e).resolve()};var f={},g=new o(function(e,t){f.resolve=e,f.reject=t});f.promise=g,c.preloaded=f.promise;var h=o.resolve();i.BUNDLE.forEach(function(e){h=h.then(function(){return o.all(e.map(function(e){return s.load(e),m(e).promise}))})}),f.resolve(h.then(function(){delete i.BUNDLE,delete i.bundleLoaded}))}var v;if("remoteTrigger"in a){window.postMessage({type:"montageReady"},"*");var b=new o(function(e){var t=function(n){if(a.remoteTrigger===n.origin&&(n.source===window||n.source===window.parent))switch(n.data.type){case"montageInit":window.removeEventListener("message",t),e([n.data.location,n.data.injections]);break;case"isMontageReady":window.postMessage({type:"montageReady"},"*")}};window.addEventListener("message",t)});v=b.spread(function(e,t){var o=n.loadPackage({location:e,hash:d},c);return t&&(o=o.then(function(n){e=r.resolve(e,".");var o,i,a=t.packageDescriptions,s=t.packageDescriptionLocations,c=t.mappings,u=t.dependencies;if(a)for(i=a.length,o=0;o<i;o++)n.injectPackageDescription(a[o].location,a[o].description);if(s)for(i=s.length,o=0;o<i;o++)n.injectPackageDescriptionLocation(s[o].location,s[o].descriptionLocation);if(c)for(i=c.length,o=0;o<i;o++)n.injectMapping(c[o].dependency,c[o].name);if(u)for(i=u.length,o=0;o<i;o++)n.injectDependency(u[o].name,u[o].version);return n})),o})}else{if("autoPackage"in a)n.injectPackageDescription(p,{dependencies:{montage:"*"}},c);else if(".json"===p.slice(p.length-5)){var y=p;p=r.resolve(p,"."),n.injectPackageDescriptionLocation(p,y,c)}v=n.loadPackage({location:p,hash:d},c)}return v.then(function(t){return t.loadPackage({location:u,hash:a.montageHash}).then(function(n){return n.inject("core/mini-url",r),n.inject("core/promise",{Promise:o}),c.lint=function(e){n.async("core/jshint").then(function(t){t.JSHINT(e.text)||(console.warn("JSHint Error: "+e.location),t.JSHINT.errors.forEach(function(e){e&&(console.warn("Problem at line "+e.line+" character "+e.character+": "+e.reason),e.evidence&&console.warn("    "+e.evidence))}))})},i.require=i.mr=t,e.initMontage(n,t,a)})}).done()})},t.getPlatform=function(){if("undefined"!=typeof window&&window&&window.document)return s;if("undefined"!=typeof process)return e("./node.js");throw new Error("Platform not supported.")},"undefined"!=typeof window?i.__MONTAGE_LOADED__?console.warn("Montage already loaded!"):(i.__MONTAGE_LOADED__=!0,t.initMontage(),t.initMontageCustomElement()):t.getPlatform(),t})}});