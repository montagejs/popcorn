var Montage=require("../../core/core").Montage,Component=require("../component").Component,RangeController=require("../../core/range-controller").RangeController,Promise=require("../../core/promise").Promise,PressComposer=require("../../composer/press-composer").PressComposer,Map=require("collections/map"),Set=require("collections/set"),PropertyChanges=require("collections/listen/property-changes"),logger=require("../../core/logger").logger("repetition").color.magenta(),TIMEOUT_BEFORE_ITERATION_BECOME_ACTIVE=60,Iteration=exports.Iteration=Montage.specialize({repetition:{value:null},controller:{value:null},_object:{value:null},object:{get:function(){return this._object},set:function(e){if(this._object!==e){var t;this.dispatchBeforeOwnPropertyChange("object",this._object),this._object=e,t=this.repetition.contentController.selection.indexOf(e)!==-1,this._selected!==t&&(this.selected=t),this.dispatchOwnPropertyChange("object",e)}}},_fragment:{value:null},__childComponents:{value:null},_childComponents:{get:function(){return this.__childComponents},set:function(e){this.__childComponents!==e&&(this.dispatchBeforeOwnPropertyChange("_childComponents",this.__childComponents),this.__childComponents=e,this.dispatchOwnPropertyChange("_childComponents",e))}},_index:{value:null},index:{get:function(){return this._index},set:function(e){this._index!==e&&(this.dispatchBeforeOwnPropertyChange("index",this._index),this._index=e,this.dispatchOwnPropertyChange("index",e))}},_drawnIndex:{value:null},_active:{value:!1},active:{set:function(e){e=!!e,this.active!==e&&(this._active=e,this.repetition&&(e?this.repetition.activeIterations.add(this):this.repetition.activeIterations["delete"](this),this._updateRepetitionDirtyClassIteration()))},get:function(){return this._active}},__noTransition:{value:null},_noTransition:{get:function(){return this.__noTransition},set:function(e){this.__noTransition!==e&&(this.dispatchBeforeOwnPropertyChange("_noTransition",this.__noTransition),this.__noTransition=e,this.dispatchOwnPropertyChange("_noTransition",e))}},_templateDocumentPart:{value:null},isDirty:{value:!1},_selected:{value:!1},selected:{get:function(){return this._selected},set:function(e){e=!!e,this.object&&this.repetition&&this.repetition.contentController&&(e?this.repetition.contentController.selection.add(this.object):this.repetition.contentController.selection["delete"](this.object)),this._selected!==e&&(this.dispatchBeforeOwnPropertyChange("selected",this._selected),this._selected=e,this._updateRepetitionDirtyClassIteration(),this.dispatchOwnPropertyChange("selected",e))}},constructor:{value:function(){logger.isDebug&&logger.debug("Iteration constructor: create iteration %s",Object.hash(this)),this.repetition=null,this.controller=null,this.object=null,this._fragment=null,this._childComponents=null,this.index=null,this._drawnIndex=null,this._noTransition=!1,this.addOwnPropertyChangeListener("_noTransition",this),this.addPathChangeListener("index.defined() && _childComponents.defined()",this,"handleComponentModelChange"),this.cachedFirstElement=null}},_timeoutBecomeActiveID:{value:null},_shouldBecomeActive:{value:!1},shouldBecomeActive:{set:function(e){if(this._timeoutBecomeActiveID&&(clearTimeout(this._timeoutBecomeActiveID),this._timeoutBecomeActiveID=null),e){var t=this;this._shouldBecomeActive=!0,this._timeoutBecomeActiveID=setTimeout(function(){t._shouldBecomeActive&&(t.active=!0),t._shouldBecomeActive=!1},TIMEOUT_BEFORE_ITERATION_BECOME_ACTIVE)}else this._shouldBecomeActive=!1},get:function(){return this._shouldBecomeActive}},initWithRepetition:{value:function(e){return this.repetition=e,this}},recycle:{value:function(){this.index=null,this.object=null,this._noTransition=!0}},injectIntoDocument:{value:function(e){null!==this._drawnIndex?(logger.isDebug&&logger.debug("Iteration:%s retracting from index %s and injecting at %s",Object.hash(this),this._drawnIndex,e),this.retractFromDocument()):logger.isDebug&&logger.debug("Iteration:%s injecting at index %s",Object.hash(this),e);var t=this,n=this.repetition,i=n.element,o=n._boundaries,s=i.ownerDocument.createTextNode(""),r=o[e];if(o.splice(e,0,s),i.insertBefore(s,r),i.insertBefore(this._fragment,r),n._drawnIterations.splice(e,0,this),n._updateDrawnIndexes(e),n._addDirtyClassListIteration(this),!this._elementsWillBeAddedToMap){var a=this._childComponents.length,l=function(e){e.target.removeEventListener("firstDraw",l,!1),a--,a||t.forEachElement(function(e){n._iterationForElement.set(e,t)})};if(this._childComponents.length>0)for(var h=0;h<this._childComponents.length;h++){var c=this._childComponents[h];if(c.addEventListener("firstDraw",l,!1),c.needsDraw=!0,c._completedFirstDraw===!0)throw Error("Repetiton:%s child component %O has already drawn.",Object.hash(this),c)}else this.forEachElement(function(e){n._iterationForElement.set(e,t)});this._elementsWillBeAddedToMap=!0}}},_elementsWillBeAddedToMap:{value:!1},retractFromDocument:{value:function(){logger.isDebug&&logger.debug("Iteration:%s retractFromDocument drawnIndex: %s",Object.hash(this),this._drawnIndex);var e=this._drawnIndex,t=this.repetition,n=t.element,i=t._boundaries[e],o=t._boundaries[e+1];t._boundaries.splice(e,1);for(var s=this._fragment,r=i.nextSibling;r!==o;){var a=r.nextSibling;n.removeChild(r),s.appendChild(r),r=a}n.removeChild(i),this._drawnIndex=null,t._drawnIterations.splice(e,1),t._updateDrawnIndexes(e)}},handleComponentModelChange:{value:function(e){var t,n,i=this._childComponents,o=this.repetition;if(e)for(t=0,n=i.length;t<n;t++)o.addChildComponent(i[t]);else if(this._childComponents)for(t=0,n=i.length;t<n;t++)o.removeChildComponent(i[t])}},_updateRepetitionDirtyClassIteration:{value:function(){this.repetition&&(this.repetition._addDirtyClassListIteration(this),this.repetition.needsDraw=!0)}},forEachElement:{value:function(e,t){var n=this.repetition,i=this._drawnIndex;if(null!==i&&void 0!==i)for(var o=n._boundaries[i];o!==n._boundaries[i+1];o=o.nextSibling)1===o.nodeType&&e.call(t,o)}},firstElement:{get:function(){var e=this.repetition,t=this._drawnIndex;if(null!==t&&void 0!==t)for(var n=e._boundaries[t];n!==e._boundaries[t+1];n=n.nextSibling)if(1===n.nodeType)return this.cachedFirstElement=n,n}},isComponentTreeLoaded:{value:function(){return null!==this._fragment}},cachedFirstElement:{value:null},makePropertyObservable:{value:function(e){"object"!==e&&"_childComponents"!==e&&"index"!==e&&"_noTransition"!==e&&"selected"!==e&&PropertyChanges.prototype.makePropertyObservable.call(this,e)}}});Iteration.prototype.handlePropertyChange=Iteration.prototype._updateRepetitionDirtyClassIteration;var Repetition=exports.Repetition=Component.specialize({initWithContent:{value:function(e){return this.object=e,this}},initWithContentController:{value:function(e){return this.contentController=e,this}},content:{get:function(){return this.contentController?this.contentController.content:null},set:function(e){this.contentController.content=e}},_contentController:{value:null},contentController:{set:function(e){this._contentController!==e&&(this._contentController=e)},get:function(){return this._contentController||(this._contentController=new RangeController),this._contentController}},isSelectionEnabled:{value:null},allowsMultipleSelection:{set:function(e){e=!!e,this.contentController.allowsMultipleSelection!==e&&(this.contentController.allowsMultipleSelection=e),e&&!this.isSelectionEnabled&&(this.isSelectionEnabled=!0)},get:function(){return void 0!==this.contentController&&null!==this.contentController&&this.contentController.allowsMultipleSelection}},selectedIterations:{value:null},selectedIndexes:{value:null},activeIterations:{value:null},iterations:{value:null},hasTemplate:{value:!1},_iterationTemplate:{value:null},clonesChildComponents:{value:!0},__pressComposer:{value:null},_pressComposer:{get:function(){return this.__pressComposer||(this.__pressComposer=new PressComposer,this.__pressComposer.lazyLoad=!0,this.addComposerForElement(this.__pressComposer,this.element)),this.__pressComposer}},_cancelSelectionRangeChangeListener:{value:null},_selection:{value:null},selection:{get:function(){return this._selection},set:function(e){this.contentController?(this.contentController.selection!==e&&(this.contentController.selection=e),this._selection!==this.contentController.selection&&(this._selection=this.contentController.selection),this._cancelSelectionRangeChangeListener&&this._cancelSelectionRangeChangeListener(),e?(this._cancelSelectionRangeChangeListener=this.contentController.selection.addRangeChangeListener(this,"selection"),this.handleSelectionRangeChange(e,[])):this._cancelSelectionRangeChangeListener=null):this._selection=e}},handleSelectionRangeChange:{value:function(e,t){if(this.iterations){var n,i,o,s,r,a,l=this.iterations.length;if(e.length<=1&&t.length<=1){if(t.length)for(o=t[0],r=0;r<l;r++)this.iterations[r].object===o&&(this.iterations[r].selected=!1);if(e.length)for(o=e[0],r=0;r<l;r++)this.iterations[r].object===o&&(this.iterations[r].selected=!0)}else{for(n=new Map,r=0;r<l;r++)s=this.iterations[r],o=s.object,(i=n.get(o))||(i=[],n.set(o,i)),i.push(s);for(r=0;r<t.length;r++)if(i=n.get(t[r]))for(a=0;a<i.length;a++)i[a].selected=!1;for(r=0;r<e.length;r++)if(i=n.get(e[r]))for(a=0;a<i.length;a++)i[a].selected=!0}}}},_visibleIndexes:{value:null},visibleIndexes:{get:function(){return this._visibleIndexes},set:function(e){this._visibleIndexes!==e&&(this._visibleIndexes&&this._visibleIndexes.removeRangeChangeListener&&this._visibleIndexes.removeRangeChangeListener(this,"visibleIndexes"),this._visibleIndexes=e,this._visibleIndexes&&this._visibleIndexes.addRangeChangeListener&&this._visibleIndexes.addRangeChangeListener(this,"visibleIndexes"),this._updateOrganizedContent())}},handleVisibleIndexesRangeChange:{value:function(e,t,n){var i,o;if(this.__controllerOrganizedContent){for(i=[],o=0;o<e.length;o++)i.push(this.__controllerOrganizedContent[e[o]]);this.organizedContent.swap(n,t.length,i),this._isListeningToOrganizedContentChanges&&(this.handleOrganizedContentRangeChange(i.length,t.length,n),this.needsDraw=!0)}}},__controllerOrganizedContent:{value:null},_controllerOrganizedContent:{get:function(){return this.__controllerOrganizedContent},set:function(e){this.__controllerOrganizedContent!==e&&(this.__controllerOrganizedContent&&this.__controllerOrganizedContent.removeRangeChangeListener&&this.__controllerOrganizedContent.removeRangeChangeListener(this,"controllerOrganizedContent"),this.__controllerOrganizedContent=e,this.__controllerOrganizedContent&&this.__controllerOrganizedContent.addRangeChangeListener&&this.__controllerOrganizedContent.addRangeChangeListener(this,"controllerOrganizedContent"),this._updateOrganizedContent())}},handleControllerOrganizedContentRangeChange:{value:function(e,t,n){this._visibleIndexes?this._updateOrganizedContent():(this.organizedContent.swap(n,t.length,e),this._isListeningToOrganizedContentChanges&&(this.handleOrganizedContentRangeChange(e.length,t.length,n),this.needsDraw=!0))}},_updateOrganizedContent:{value:function(){var e,t;if(this.__controllerOrganizedContent)if(this._visibleIndexes){for(this.organizedContent.length>this._visibleIndexes.length&&(this.organizedContent.length=this._visibleIndexes.length,this._isListeningToOrganizedContentChanges&&this.handleOrganizedContentRangeChange(0,this.organizedContent.length-this._visibleIndexes.length,this._visibleIndexes.length)),e=this.organizedContent.length,t=0;t<this._visibleIndexes.length;t++)this.organizedContent[t]!==this.__controllerOrganizedContent[this._visibleIndexes[t]]&&(this.organizedContent[t]=this.__controllerOrganizedContent[this._visibleIndexes[t]],this._isListeningToOrganizedContentChanges&&this.handleOrganizedContentRangeChange(1,e>t?1:0,t));this._isListeningToOrganizedContentChanges&&(this.needsDraw=!0)}else e=this.organizedContent.length,this.organizedContent.swap(0,e,this.__controllerOrganizedContent),this._isListeningToOrganizedContentChanges&&(this.handleOrganizedContentRangeChange(this.__controllerOrganizedContent.length,e,0),this.needsDraw=!0);else e=this.organizedContent.length,this.organizedContent=[],this._isListeningToOrganizedContentChanges&&(this.handleOrganizedContentRangeChange(0,e,0),this.needsDraw=!0)}},constructor:{value:function(){this.contentController=null,this.organizedContent=[],this.defineBinding("_controllerOrganizedContent",{"<-":"contentController.organizedContent"}),this.isSelectionEnabled=!1,this.defineBinding("selection",{"<-":"contentController.selection"}),this.defineBinding("selectedIterations",{"<-":"iterations.filter{selected}"}),this.defineBinding("selectedIndexes",{"<-":"selectedIterations.map{index}"}),this._iterationTemplate=null,this.addPathChangeListener(this._setupRequirements,this,"_handleSetupRequirementsChange"),this.addPathChangeListener("innerTemplate",this,"_handleInnerTemplateChange"),this.addPathChangeListener("contentController.allowsMultipleSelection",this,"_handleContentControllerAllowsMultipleSelectionChange"),this.iterations=[],this._drawnIterations=[],this._freeIterations=[],this._iterationForElement=new Map,this._iterationCreationPromise=Promise.resolve(),this._boundaries=[],this._dirtyClassListIterations=new Set,this._requestedIterations=0,this._createdIterations=0,this._canDrawInitialContent=!1,this._initialContentDrawn=!1,this.addOwnPropertyChangeListener("isSelectionEnabled",this),this._selectionPointer=null,this.activeIterations=[]}},_setupRequirements:{value:"[!_iterationTemplate.defined(),!_newDomContent.defined(),!_shouldClearDomContentOnNextDraw,_isComponentExpanded,_ownerDocumentPart.defined()].every{}"},_handleContentControllerAllowsMultipleSelectionChange:{value:function(e){this.allowsMultipleSelection!==e&&(this.allowsMultipleSelection=e)}},_handleSetupRequirementsChange:{value:function(e){e&&this._setupIterationTemplate()}},_handleInnerTemplateChange:{value:function(e){this._iterationTemplate&&this._teardownIterationTemplate(),e&&this.getPath(this._setupRequirements)&&this._setupIterationTemplate()}},cleanupDeletedComponentTree:{value:function(e){var t=this._innerTemplate;this._innerTemplate=null,t&&this._teardownIterationTemplate(),e&&this.cancelBindings()}},expandComponent:{value:function(){return this._isComponentExpanded=!0,Promise.resolve()}},_buildIterationTemplate:{value:function(){var e,t,n,i;return e=this.innerTemplate.clone(),t=e.getSerialization(),n=t.getSerializationObject(),i=Montage.getInfoForObject(this).label,this._iterationLabel=i+":iteration",n[this._iterationLabel]={},e.setObjects(n),this.innerTemplate.hasParameters()&&this._expandIterationTemplateParameters(e),window._montage_le_flag&&(e.refresher=this,this._leTagIterationTemplate(e)),e}},_rebuildIterationTemplate:{value:function(){var e,t=this._iterationTemplate,n=this.iterations;this._purgeFreeIterations();for(var i,o=0;i=n[o];o++)i.isDirty=!0;this._innerTemplate=null,e=this._buildIterationTemplate(),t.replaceContentsWithTemplate(e)}},refreshTemplate:{value:function(){this._rebuildIterationTemplate()}},_isListeningToOrganizedContentChanges:{value:!1},_setupIterationTemplate:{value:function(){this._iterationTemplate=this._buildIterationTemplate();for(var e,t=this.childComponents,n=t.length-1;e=t[n--];)e.detachFromParentComponent(),e.needsDraw=!1,e.cleanupDeletedComponentTree(!0);this.handleOrganizedContentRangeChange(this.organizedContent.length,0,0),this._isListeningToOrganizedContentChanges=!0,this._canDrawInitialContent=!0,this.needsDraw=!0}},_leTagIterationTemplate:{value:function(e){var t=e.document.body;if(t.children.length>0){var n=this.ownerComponent._montage_metadata.moduleId,i=this._montage_metadata.label;this._leTagStarArgument(n,i,t)}}},_teardownIterationTemplate:{value:function(){this._isListeningToOrganizedContentChanges=!1,this.handleOrganizedContentRangeChange(0,this.organizedContent.length,0),this._purgeFreeIterations(),this._iterationTemplate=null,this._iterationForElement.clear(),this._requestedIterations=0,this._createdIterations=0,this._canDrawInitialContent=!1,this._selectionPointer=null,this.activeIterations.clear(),this._dirtyClassListIterations.clear()}},_purgeFreeIterations:{value:function(){for(var e=0;e<this._freeIterations.length;e++)for(var t=this._freeIterations[e],n=0;n<t._childComponents.length;n++){var i=t._childComponents[n];this.removeChildComponent(i),i.cleanupDeletedComponentTree(!0)}this._freeIterations.clear()}},_expandIterationTemplateParameters:{value:function(e){for(var t,n,i,o,s,r,a,l,h,c=this;e.hasParameters();)if(c=c.ownerComponent,r=e.expandParameters(c),c._ownerDocumentPart){t=c._ownerDocumentPart.template,o=c._ownerDocumentPart.objects,i=e.getSerialization().getExternalObjectLabels(),s=e.getInstances(),l=r.labels,n=r.labelsCollisions;for(var d,u=0;d=l[u];u++)a=n&&d in n?n[d]:d,i.indexOf(a)>=0?s[a]=o[d]:(h=t.getObjectMetadata(d),h.owner||(h.owner=o.owner),e.setObjectMetadata(a,h.require,h.label,h.owner))}}},_iterationLabel:{value:null},_iterationCreationPromise:{value:null},_createIteration:{value:function(){var e=this,t=(new this.Iteration).initWithRepetition(this);return this._iterationCreationPromise=this._iterationCreationPromise.then(function(){var n,i,o=e.element.ownerDocument;return n=e._iterationTemplate.getInstances(),n=Object.create(n),n[e._iterationLabel]=t,i=e._iterationTemplate.instantiateWithInstances(n,o).then(function(n){return n.parentDocumentPart=e._ownerDocumentPart,t._templateDocumentPart=n,n.loadComponentTree().then(function(){logger.isDebug&&logger.debug("Iteration:%s component tree loaded.",Object.hash(t)),t._fragment=n.fragment,t._childComponents=n.childComponents,e.constructIteration(t)}),t}),i.then(null,function(e){console.error(e)})}),this._requestedIterations++,t}},constructIteration:{value:function(e){this._createdIterations++,this._createdIterations>=this._requestedIterations&&(this.needsDraw=!0,this._canDraw=!0)}},_controllerIterations:{value:null},_drawnIterations:{value:null},_freeIterations:{value:null},handleOrganizedContentRangeChange:{value:function(e,t,n){var i,o,s,r,a,l=n,h=this.iterations,c=Math.min(e,t),d=t-c,u=e-c,_=this.organizedContent;for(logger.isDebug&&(logger.debug("Repetition:%s content changed +%s@%s %O -%s %O ",Object.hash(this),e?e:0,n,t?t:0),logger.debug("Repetition:%s +%s -%s iterations",Object.hash(this),u,d)),this._iterationTemplate.isDirty&&this._iterationTemplate.refresh(),r=0;r<c;r++,n++)h[n].object=_[n];if(d>0)for(i=h.splice(n,d),r=0;r<d;r++)o=i[r],o.recycle(),o.isDirty||this._freeIterations.push(o);if(logger.isDebug&&(s=[]),u>0){for(;this._freeIterations.length<u;)this._freeIterations.push(this._createIteration()),logger.isDebug&&s.push(this._freeIterations[this._freeIterations.length-1]);var g=new Array(u);for(r=c,a=0;r<e;r++,a++){var C=this._freeIterations.pop();logger.isDebug&&(s.has(C)||logger.debug("Repetition:%s reusing %s",Object.hash(this),Object.hash(C))),C.object=_[l+r],logger.isDebug&&logger.debug("Repetition:%s Iteration:%s object set to: %",Object.hash(this),Object.hash(C),C.object),g[a]=C}h.swap(n,0,g)}(d>0||u>0)&&this._updateIndexes(n)}},_updateIndexes:{value:function(e){for(var t=this.iterations,n=e;n<t.length;n++)t[n].index=n}},_addDirtyClassListIteration:{value:function(e){e.forEachElement(function(t){var n;t&&(n=t.component)?(n.classList[e.active?"add":"remove"]("active"),n.classList[e.selected?"add":"remove"]("selected"),n.classList.remove("no-transition")):this._dirtyClassListIterations.add(e)},this)}},canDraw:{value:function(){var e=this.canDrawGate.value;return e=e&&this._requestedIterations<=this._createdIterations,e=e&&(this._initialContentDrawn||this._canDrawInitialContent)}},_boundaries:{value:null},_dirtyClassListIterations:{value:null},_requestedIterations:{value:null},_createdIterations:{value:null},_canDrawInitialContent:{value:null},_initialContentDrawn:{value:null},draw:{value:function(){var e;for(this._initialContentDrawn||(this._drawInitialContent(),this._initialContentDrawn=!0),e=this._drawnIterations.length-1;e>=0;e--)null===this._drawnIterations[e].index&&this._drawnIterations[e].retractFromDocument();for(e=0;e<this.iterations.length;e++){var t=this.iterations[e];t._drawnIndex!==t.index&&t.isComponentTreeLoaded()&&t.injectIntoDocument(e)}var n=this._dirtyClassListIterations.toArray();this._dirtyClassListIterations.clear(),n.forEach(function(e){e.isComponentTreeLoaded()&&e.forEachElement(function(t){t.component||(t.classList[e.active?"add":"remove"]("active"),t.classList[e.selected?"add":"remove"]("selected"),t.classList.remove("no-transition"))},this)},this)}},_drawInitialContent:{value:function(){for(var e=this.element,t=e.childNodes.length,n=0;n<t;n++)e.removeChild(e.firstChild);var i=e.ownerDocument.createTextNode("");e.appendChild(i),this._boundaries.push(i)}},_updateDrawnIndexes:{value:function(e){for(var t=this._drawnIterations;e<t.length;e++)t[e]._drawnIndex=e}},_selectionPointer:{value:null},_startX:{value:0},_startY:{value:0},_currentActiveIteration:{value:null},handleIsSelectionEnabledChange:{value:function(e){e?this._enableSelectionTracking():(this.selection.clear(),this._disableSelectionTracking())}},_enableSelectionTracking:{value:function(){this._pressComposer.addEventListener("pressStart",this,!1)}},_disableSelectionTracking:{value:function(){this._pressComposer.removeEventListener("pressStart",this,!1)}},handlePressStart:{value:function(e){var t=this._findIterationContainingElement(e.targetElement);t&&(this._startX=e.clientX,this._startY=e.clientY,this.__pressComposer.addEventListener("press",this,!1),this.__pressComposer.addEventListener("pressCancel",this,!1),t.shouldBecomeActive=!0,this._currentActiveIteration=t)}},_ignoreSelection:{value:function(){this._currentActiveIteration&&(this._currentActiveIteration.shouldBecomeActive=!1,this._currentActiveIteration.active=!1,this._currentActiveIteration=null),this.activeIterations.clear(),this._startX=0,this._startY=0,this.__pressComposer.removeEventListener("press",this,!1),this.__pressComposer.removeEventListener("pressCancel",this,!1)}},handlePressCancel:{value:function(){this._ignoreSelection()}},handlePress:{value:function(e){var t=this._findIterationContainingElement(e.targetElement);t&&this._currentActiveIteration===t&&(t.active=!1,t.selected?this.allowsMultipleSelection&&(t.selected=!1):t.selected=!0),this._ignoreSelection()}},_findIterationContainingElement:{value:function(e){for(var t;e;){if(e===this.element)return this._iterationForElement.get(t);t=e,e=e.parentNode}}},Iteration:{value:Iteration,serializable:!1}});