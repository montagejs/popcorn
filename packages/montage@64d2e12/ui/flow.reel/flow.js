var Component=require("../component").Component,observeProperty=require("frb/observers").observeProperty,FlowBezierSpline=require("./flow-bezier-spline").FlowBezierSpline,RangeController=require("../../core/range-controller").RangeController,PARSE_MS_PATTERN=/^(\d+)ms$/,PARSE_SEC_PATTERN=/^(\d+)s$/,Flow=exports.Flow=Component.specialize({constructor:{value:function(){this._paths=[],this._visibleIndexes=[],this._needsClearVisibleIndexes=!0,this._slideOffsets={},this.defineBinding("_numberOfIterations",{"<-":"contentController.content.length"}),this.addOwnPropertyChangeListener("_numberOfIterations",this),window.addEventListener("resize",this,!1),this._newVisibleIndexes=[]}},slotContent:{serializable:!0,value:null},__flowTranslateComposer:{value:null},_flowTranslateComposer:{get:function(){return this.__flowTranslateComposer},set:function(e){this.__flowTranslateComposer&&(this.__flowTranslateComposer.removeEventListener("translateStart",this,!1),this.__flowTranslateComposer.removeEventListener("translateEnd",this,!1)),this.__flowTranslateComposer=e,this.__flowTranslateComposer.addEventListener("translateStart",this,!1),this.__flowTranslateComposer.addEventListener("translateEnd",this,!1)}},__firstIteration:{value:null},_firstIteration:{get:function(){return this.__firstIteration},set:function(e){this.__firstIteration=e,this.needsDraw=!0}},handleTranslateStart:{value:function(){this.callDelegateMethod("didTranslateStart",this)}},handleTranslateEnd:{value:function(){this.callDelegateMethod("didTranslateEnd",this)}},_scrollingMode:{value:"linear"},_transform:{value:null},_transformCss:{value:null},_transformPerspective:{value:null},scrollingMode:{serializable:!0,get:function(){return this._scrollingMode},set:function(e){switch(e){case"linear":case"drag":this._scrollingMode=e}}},_linearScrollingVector:{value:[-300,0]},linearScrollingVector:{seriazable:!0,get:function(){return this._linearScrollingVector},set:function(e){this._linearScrollingVector=e}},_repetition:{value:null},momentumDuration:{serializable:!0,value:650},_splinePaths:{value:null},splinePaths:{enumerable:!1,get:function(){return this._splinePaths||(this._splinePaths=[]),this._splinePaths},set:function(e){this._splinePaths=e}},_appendPath:{value:function(e){var t,i,s,n,a,r=new FlowBezierSpline,l=e.knots,o=e.knots.length,h=[],d=[],f=[],_=[],u=e.units,c=u?Object.keys(u):void 0;if(r._parameterKeys=c,s=r.parameters={},c)for(t=0;n=c[t];t++)s[n]={data:[],units:u[n]};for(t=0;t<o;t++){a=l[t],h[t]=a.knotPosition,f[t]=a.previousHandlerPosition,d[t]=a.nextHandlerPosition,_[t]=a.previousDensity;for(i in u)u.hasOwnProperty(i)&&s[i].data.push(a[i])}r.knots=h,r.previousHandlers=f,r.nextHandlers=d,r.densities=_,r._computeDensitySummation(),this.splinePaths.push(r),e.hasOwnProperty("headOffset")||(e.headOffset=0),e.hasOwnProperty("tailOffset")||(e.tailOffset=0),this._paths.push(e),this._updateLength()}},_paths:{value:null},paths:{get:function(){var e,t,i,s,n,a,r,l,o=(this.splinePaths.length,[]);for(n=0;l=this.splinePaths[n];n++){for(t=l.knots.length,e={knots:[],units:{}},a=0;a<t;a++)s={knotPosition:l.knots[a]},l.nextHandlers&&l.nextHandlers[a]&&(s.nextHandlerPosition=l.nextHandlers[a]),l.previousHandlers&&l.previousHandlers[a]&&(s.previousHandlerPosition=l.previousHandlers[a]),l.densities&&l.densities[a]&&(s.previousDensity=l.densities[a],s.nextDensity=l.densities[a]),e.knots.push(s);for(a in l.parameters)if(l.parameters.hasOwnProperty(a))for(e.units[a]=l.parameters[a].units,i=l.parameters[a].data.length,r=0;r<i;r++)e.knots[r][a]=l.parameters[a].data[r];this._paths[n].hasOwnProperty("headOffset")?e.headOffset=this._paths[n].headOffset:e.headOffset=0,this._paths[n].hasOwnProperty("tailOffset")?e.tailOffset=this._paths[n].tailOffset:e.tailOffset=0,o.push(e)}return o},set:function(e){var t,i=e.length;for(this._splinePaths=[],this._paths=[],t=0;t<i;t++)this._appendPath(e[t]);this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_isCameraEnabled:{value:!0},isCameraEnabled:{get:function(){return this._isCameraEnabled},set:function(e){var t=!!e;this._isCameraEnabled!==t&&(this._isCameraEnabled=t,this._isCameraUpdated=!0,this._needsComputeVisibleRange=!0,this.needsDraw=!0)}},_perspective:{value:500},perspective:{get:function(){return this._perspective},set:function(e){var t=parseFloat(e);isNaN(t)||this._perspective===t||(this._perspective=t,this._isCameraUpdated=!0,this._needsComputeVisibleRange=!0,this.needsDraw=!0)}},_cameraElement:{value:null},_cameraPosition:{value:[0,0,800]},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){this._cameraPosition=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_viewpointPosition:{get:function(){return this._isCameraEnabled?this.cameraPosition:[.01*(50-this._sceneOffsetLeft)*this._width,.01*(50-this._sceneOffsetTop)*this._height,this._perspective]}},_cameraTargetPoint:{value:[0,0,0]},cameraTargetPoint:{get:function(){return this._cameraTargetPoint},set:function(e){this._cameraTargetPoint=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_viewpointTargetPoint:{get:function(){return this._isCameraEnabled?this.cameraTargetPoint:[.01*(50-this._sceneOffsetLeft)*this._width,.01*(50-this._sceneOffsetTop)*this._height,0]}},_cameraFov:{value:50},cameraFov:{get:function(){return this._cameraFov},set:function(e){this._cameraFov=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_viewpointFov:{get:function(){return this._isCameraEnabled?this.cameraFov:360*(Math.PI/2-Math.atan2(this._perspective,this._height/2))/Math.PI}},_cameraRoll:{value:0},cameraRoll:{get:function(){return this._cameraRoll},set:function(e){this._cameraRoll=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_sceneOffsetTop:{value:50},sceneOffsetTop:{get:function(){return this._sceneOffsetTop},set:function(e){this._sceneOffsetTop=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_sceneOffsetLeft:{value:50},sceneOffsetLeft:{get:function(){return this._sceneOffsetLeft},set:function(e){this._sceneOffsetLeft=e,this._isCameraUpdated=!0,this.needsDraw=!0,this._needsComputeVisibleRange=!0}},_sceneScaleX:{value:{numerator:1,denominator:1}},_sceneScaleY:{value:{numerator:1,denominator:1}},_sceneScaleZ:{value:{numerator:1,denominator:1}},_sceneScale:{value:{x:{numerator:1,denominator:1},y:{numerator:1,denominator:1},z:{numerator:1,denominator:1}}},_updateSceneScale:{value:function(){this._sceneScale={x:this._sceneScaleX,y:this._sceneScaleY,z:this._sceneScaleZ}}},sceneScaleX:{get:function(){return this._sceneScaleX},set:function(e){"object"!=typeof e||"undefined"==typeof e.numerator||"undefined"==typeof e.denominator||isNaN(e.numerator)||isNaN(e.denominator)||0===e.denominator||(this._sceneScaleX=e,this._updateSceneScale(),this.needsDraw=!0,this._needsComputeVisibleRange=!0)}},sceneScaleY:{get:function(){return this._sceneScaleY},set:function(e){"object"!=typeof e||"undefined"==typeof e.numerator||"undefined"==typeof e.denominator||isNaN(e.numerator)||isNaN(e.denominator)||0===e.denominator||(this._sceneScaleY=e,this._updateSceneScale(),this.needsDraw=!0,this._needsComputeVisibleRange=!0)}},sceneScaleZ:{get:function(){return this._sceneScaleZ},set:function(e){"object"!=typeof e||"undefined"==typeof e.numerator||"undefined"==typeof e.denominator||isNaN(e.numerator)||isNaN(e.denominator)||0===e.denominator||(this._sceneScaleZ=e,this._updateSceneScale(),this.needsDraw=!0,this._needsComputeVisibleRange=!0)}},_stride:{value:0},stride:{get:function(){return this._stride},set:function(e){this._stride=e}},_scrollingTransitionDurationMiliseconds:{value:500},_scrollingTransitionDuration:{value:"500ms"},scrollingTransitionDuration:{get:function(){return this._scrollingTransitionDuration},set:function(e){var t,i,s=e+"";s.length;(i=PARSE_MS_PATTERN.exec(s))?t=+i[1]:(i=PARSE_SEC_PATTERN.exec(s))?t=1e3*+i[1]:(t=+s,s+="ms"),isNaN(t)||this._scrollingTransitionDurationMiliseconds===t||(this._scrollingTransitionDurationMiliseconds=t,this._scrollingTransitionDuration=s)}},hasSelectedIndexScrolling:{value:!1},selectedIndexScrollingOffset:{value:0},_handleSelectedIndexesChange:{value:function(e,t,i){this.hasSelectedIndexScrolling&&e[0]&&this.startScrollingIndexToOffset(Math.floor(this.contentController.content.indexOf(e[0].object)/this._paths.length),this.selectedIndexScrollingOffset)}},_timingFunctions:{value:{ease:[.25,.1,.25,1],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]}},_scrollingTransitionTimingFunctionBezier:{value:[.25,.1,.25,1]},_scrollingTransitionTimingFunction:{value:"ease"},scrollingTransitionTimingFunction:{get:function(){return this._scrollingTransitionTimingFunction},set:function(e){var t,i,s=e+"";if(this._timingFunctions.hasOwnProperty(s))this._scrollingTransitionTimingFunction=s,this._scrollingTransitionTimingFunctionBezier=this._timingFunctions[s];else if("cubic-bezier("===s.substr(0,13)&&")"===s.substr(s.length-1,1)&&(t=s.substr(13,s.length-14).split(","),4===t.length)){for(i=0;i<4;i++)if(t[i]-=0,isNaN(t[i]))return;t[0]<0?t[0]=0:t[0]>1&&(t[0]=1),t[2]<0?t[2]=0:t[2]>1&&(t[2]=1),this._scrollingTransitionTimingFunction="cubic-bezier("+t+")",this._scrollingTransitionTimingFunctionBezier=t}}},_computeCssCubicBezierValue:{value:function(e,t){var i,s,n,a=.5,r=.25;for(n=0;n<20;n++)i=a*a,s=1-a,3*(s*s*a*t[0]+s*i*t[2])+i*a>e?a-=r:a+=r,r*=.5;return i=a*a,s=1-a,3*(s*s*a*t[1]+s*i*t[3])+i*a}},_isTransitioningScroll:{value:!1},stopScrolling:{value:function(){this._isTransitioningScroll=!1}},startScrollingIndexToOffset:{value:function(e,t){this._scrollingOrigin=this.scroll,this._scrollingDestination=e-t,this._scrollingDestination>this._length?this._scrollingDestination=this._length:this._scrollingDestination<0&&(this._scrollingDestination=0),this._isScrolling=!0,this._scrollingStartTime=Date.now(),this._isTransitioningScroll=!0,this.needsDraw=!0,this.callDelegateMethod("didTranslateStart",this)}},_isCameraUpdated:{value:!0},_width:{value:0},_height:{value:0},_boundingBoxSize:{value:null},boundingBoxSize:{serializable:!0,get:function(){return this._boundingBoxSize},set:function(e){this._boundingBoxSize=e,this.elementsBoundingSphereRadius=.5*Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),this._needsComputeVisibleRange=!0}},_elementsBoundingSphereRadius:{value:1},elementsBoundingSphereRadius:{get:function(){return this._elementsBoundingSphereRadius},set:function(e){this._elementsBoundingSphereRadius!==e&&(this._elementsBoundingSphereRadius=e,this.needsDraw=!0,this._needsComputeVisibleRange=!0)}},_halfPI:{value:.5*Math.PI},_doublePI:{value:2*Math.PI},_computeFrustumNormals:{value:function(){var e,t,i,s,n,a,r,l,o,h=.5*this._viewpointFov*this._doublePI/360,d=Math.sin(h),f=Math.cos(h),_=d*this._width/this._height,u=this._viewpointPosition,c=this._viewpointTargetPoint,g=c[0]-u[0],m=c[1]-u[1],p=c[2]-u[2],v=this._halfPI-Math.atan2(p,g),S=g*Math.sin(v)+p*Math.cos(v),I=this._halfPI-Math.atan2(S,m),O=[[f,0,_],[-f,0,_],[0,f,d],[0,-f,d]],x=[];for(o=0;o<4;o++)l=O[o],e=l[0],t=l[1]*Math.cos(-I)-l[2]*Math.sin(-I),i=l[1]*Math.sin(-I)+l[2]*Math.cos(-I),s=e*Math.cos(-v)-i*Math.sin(-v),n=t,a=e*Math.sin(-v)+i*Math.cos(-v),r=1/Math.sqrt(s*s+n*n+a*a),x.push([s*r,n*r,a*r]);return x}},_segmentsIntersection:{value:function(e,t){for(var i,s,n=0,a=0,r=[];n<e.length&&a<t.length;)e[n][0]>=t[a][1]?a++:e[n][1]<=t[a][0]?n++:(i=e[n][0]>=t[a][0]?e[n][0]:t[a][0],s=e[n][1]<=t[a][1]?e[n][1]:t[a][1],r.push([i,s]),e[n][1]<t[a][1]?n++:e[n][1]>t[a][1]?a++:(n++,a++));return r}},_computeVisibleRange:{value:function(e){var t,i,s,n,a=e._knots.length-1,r=this._viewpointPosition,l=r[0],o=r[1],h=r[2],d=this._computeFrustumNormals(),f=[],_=[],u=[],c=this._elementsBoundingSphereRadius,g=e.getScaledKnots(this._sceneScale),m=e.getScaledNextHandlers(this._sceneScale),p=e.getScaledPreviousHandlers(this._sceneScale),v=[];for(s=0;s<a;s++)if(t=d[0],f=e.directedPlaneBezierIntersection(l-t[0]*c,o-t[1]*c,h-t[2]*c,d[0],g[s],m[s],p[s+1],g[s+1]),f.length&&(t=d[1],_=e.directedPlaneBezierIntersection(l-t[0]*c,o-t[1]*c,h-t[2]*c,d[1],g[s],m[s],p[s+1],g[s+1]),_.length&&(i=this._segmentsIntersection(f,_),i.length&&(t=d[2],f=e.directedPlaneBezierIntersection(l-t[0]*c,o-t[1]*c,h-t[2]*c,d[2],g[s],m[s],p[s+1],g[s+1]),i=this._segmentsIntersection(f,i),i.length))))for(t=d[3],f=e.directedPlaneBezierIntersection(l-t[0]*c,o-t[1]*c,h-t[2]*c,d[3],g[s],m[s],p[s+1],g[s+1]),i=this._segmentsIntersection(f,i),n=0;n<i.length;n++)u.push([s,i[n][0],i[n][1]]);var S,I,O,x,b,T,w,C=e._densities;for(s=0;s<u.length;s++)S=C[u[s][0]],I=C[u[s][0]+1],O=u[s][0]?e._densitySummation[u[s][0]-1]:0,x=u[s][1],b=u[s][2],T=(I-S)*x*x*.5+x*S+O,w=(I-S)*b*b*.5+b*S+O,v.push([T,w]);return v}},_determineCssPrefixedProperties:{value:function(){"webkitTransform"in this.element.style?(this._transform="webkitTransform",this._transformCss="-webkit-transform",this._transformPerspective="webkitPerspective"):"MozTransform"in this.element.style?(this._transform="MozTransform",this._transformCss="-moz-transform",this._transformPerspective="MozPerspective"):"msTransform"in this.element.style?(this._transform="msTransform",this._transformCss="-ms-transform",this._transformPerspective="msPerspective"):(this._transform="transform",this._transformPerspective="perspective")}},_isListeningToResize:{value:!0},isListeningToResize:{get:function(){return this._isListeningToResize},set:function(e){var t=!!e;this._isListeningToResize!==t&&(this._isListeningToResize=t,this._isListeningToResize?window.addEventListener("resize",this,!1):window.removeEventListener("resize",this,!1))}},_needsClearVisibleIndexes:{value:!1},handleResize:{value:function(){this._isCameraUpdated=!0,this._needsComputeVisibleRange=!0,this.needsDraw=!0,this._needsClearVisibleIndexes=!0}},enterDocument:{value:function(e){if(e){this._determineCssPrefixedProperties(),this._repetition.addRangeAtPathChangeListener("selectedIterations",this,"_handleSelectedIndexesChange")}}},_updateVisibleIndexes:{value:function(e,t){var i,s,n,a=this._visibleIndexes,r=a&&!isNaN(a.length)?a.length:0;for(this._needsClearVisibleIndexes&&(this._visibleIndexes.splice(e.length,1/0),this._needsClearVisibleIndexes=!1),n=0;n<r;n++)"number"==typeof t[a[n]]?e[t[a[n]]]=null:(i||(i=[])).push(n);if(i)for(n=s=0;s<i.length&&n<e.length;n++)null!==e[n]&&(a.set(i[s],e[n]),s++);for(s=r;n<e.length;n++)null!==e[n]&&(a.set(s,e[n]),s++)}},_needsComputeVisibleRange:{value:!0},_previousVisibleRanges:{value:null},viewportWidth:{get:function(){return this._width},set:function(e){this._width!==e&&(this._width=e,this._needsComputeVisibleRange=!0)}},viewportHeight:{get:function(){return this._height},set:function(e){this._height!==e&&(this._height=e,this._needsComputeVisibleRange=!0)}},_firstIterationWidth:{value:1},_firstIterationHeight:{value:1},firstIterationWidth:{get:function(){return this._firstIterationWidth},set:function(e){e!==this._firstIterationWidth&&(this._firstIterationWidth=e,this._needsComputeVisibleRange=!0,this._needsClearVisibleIndexes=!0)}},firstIterationHeight:{get:function(){return this._firstIterationHeight},set:function(e){e!==this._firstIterationHeight&&(this._firstIterationHeight=e,this._needsComputeVisibleRange=!0,this._needsClearVisibleIndexes=!0)}},_firstIterationOffsetLeft:{value:0},_firstIterationOffsetTop:{value:0},willDraw:{value:function(e){var t,i,s,n,a,r,l,o,h,d,f,_,u=this._newVisibleIndexes,c={},g=this._paths,m=g.length,p=this.splinePaths;if(this.viewportWidth=this._element.clientWidth,this.viewportHeight=this._element.clientHeight,this.__firstIteration){var v=this.__firstIteration.firstElement.children[0];if(0!==v.offsetWidth&&0!==v.offsetHeight&&(this.firstIterationWidth=v.offsetWidth,this.firstIterationHeight=v.offsetHeight,this._firstIterationOffsetLeft=v.offsetLeft,this._firstIterationOffsetTop=v.offsetTop,!this._boundingBoxSize)){var S=Math.max(Math.abs(this._firstIterationWidth+this._firstIterationOffsetLeft),Math.abs(this._firstIterationOffsetLeft)),I=Math.max(Math.abs(this._firstIterationHeight+this._firstIterationOffsetTop),Math.abs(this._firstIterationOffsetTop));this._elementsBoundingSphereRadius=Math.sqrt(S*S+I*I)}}this._isTransitioningScroll&&(f=(Date.now()-this._scrollingStartTime)/this._scrollingTransitionDurationMiliseconds,_=this._computeCssCubicBezierValue(f,this._scrollingTransitionTimingFunctionBezier),f<1?this.scroll=this._scrollingOrigin+(this._scrollingDestination-this._scrollingOrigin)*_:(this.scroll=this._scrollingDestination,this._isTransitioningScroll=!1,this._needsToCallDidTranslateEndDelegate=!0)),f=e,d=6;var O,x,b,T,w,C=this.lastDrawTime?.018*(f-this.lastDrawTime)*this._elasticScrollingSpeed:0,P=1-C/d,D=this._minSlideOffsetIndex,R=this._maxSlideOffsetIndex;if(this.lastDrawTime=f,this._hasElasticScrolling)for(a=0;a<d;a++){for(s=this._draggedSlideIndex-1;s>=D;s--)O=this._getSlideOffset(s),x=this._getSlideOffset(s+1),b=(O-x)*P+x,b>0&&(b=0),this._updateSlideOffset(s,b);for(s=this._draggedSlideIndex+1;s<=R;s++)O=this._getSlideOffset(s),x=this._getSlideOffset(s-1),b=(O-x)*P+x,b<0&&(b=0),this._updateSlideOffset(s,b)}if(p.length){for(o=this._numberOfIterations%m,h=(this._numberOfIterations-o)/m,this._needsComputeVisibleRange&&(this._previousVisibleRanges=[]),r=0;r<m;r++)for(d=h+(r<o?1:0),this._needsComputeVisibleRange?(t=this._computeVisibleRange(p[r]),this._previousVisibleRanges[r]=t,p[r]._computeDensitySummation()):t=this._previousVisibleRanges[r],l=this._scroll-g[r].headOffset,s=0,n=t.length;s<n;s++){for(w=d/2,a=w;w>=1;)i=(0|a)*m+r,T=(0|a)+this._getSlideOffset(i)-l,w/=2,T>=t[s][0]?a-=w:a+=w;a=a-1|0,a<0&&(a=0);do i=a*m+r,T=a+this._getSlideOffset(i)-l,T>=t[s][0]&&T<=t[s][1]&&void 0===c[i]&&(c[i]=u.length,u[u.length]=i),a++;while(T<=t[s][1]&&a<d)}this._needsComputeVisibleRange=!1}this._updateVisibleIndexes(u,c),u.length=0}},draw:{value:function(e){var t,i,s,n,a,r,l,o,h,d,f,_=this._repetition._drawnIterations.length,u=this._visibleIndexes,c=this._viewpointPosition,g=this._viewpointTargetPoint,m=this._splinePaths;if(this._isTransitioningScroll&&(this.needsDraw=!0),this._isCameraUpdated){if(this._isCameraEnabled){r=Math.tan((90-.5*this._viewpointFov)*this._doublePI/360)*this._height*.5;var p,v,S=g[0]-c[0],I=g[1]-c[1],O=g[2]-c[2],x=Math.atan2(-S,-O);p=S*-Math.sin(-x)+O*Math.cos(-x),v=Math.atan2(-I,-p),this._element.style[this._transformPerspective]=r+"px",f="translate3d(0,0,",f+=r,f+="px)rotateX(",f+=v,f+="rad)rotateY(",f+=-x,f+="rad)",f+="translate3d(",f+=-c[0],f+="px,",f+=-c[1],f+="px,",f+=-c[2],f+="px)",this._cameraElement.style[this._transform]=f,this._element.classList.remove("camera-disabled")}else this._element.style[this._transformPerspective]=this._perspective+"px",f="translate3d(",f+=.5*this._width-c[0],f+="px, ",f+=.5*this._height-c[1],f+="px,0)",this._cameraElement.style[this._transform]=f,this._element.classList.add("camera-disabled");this._isCameraUpdated=!1}if(m.length)for(t=0;t<_;t++)h=this.offset(u[t]),d=m[h.pathIndex],l=d._convertSplineTimeToBezierIndexTime(h.slideTime),i=this._repetition._drawnIterations[t],s=i.cachedFirstElement||i.firstElement,null!==l?((n=s.children[0])&&(s.classList.contains("selected")?n.classList.add("selected"):n.classList.remove("selected"),s.classList.contains("active")?n.classList.add("active"):n.classList.remove("active")),a=d.getPositionAtIndexTime(l,this._sceneScale),o=d.getRotationAtIndexTime(l),f=this._transformCss,f+=":translate3d(",f+=1e-5*(1e5*a[0]>>0),f+="px,",f+=1e-5*(1e5*a[1]>>0),f+="px,",f+=1e-5*(1e5*a[2]>>0),f+="px)",f+=o[2]?"rotateZ("+1e-5*(1e5*o[2]>>0)+"rad)":"",f+=o[1]?"rotateY("+1e-5*(1e5*o[1]>>0)+"rad)":"",f+=o[0]?"rotateX("+1e-5*(1e5*o[0]>>0)+"rad)":"",f+=";",f+=d.getStyleAtIndexTime(l),s.setAttribute("style",f)):s.setAttribute("style","display:none");else for(t=0;t<_;t++)i=this._repetition._drawnIterations[t],s=i.cachedFirstElement||i.firstElement,s.setAttribute("style","display:none");this._slideOffsetsLength&&(this.needsDraw=!0),this._needsToCallDidTranslateEndDelegate&&(this._needsToCallDidTranslateEndDelegate=!1,this.callDelegateMethod("didTranslateEnd",this))}},didDraw:{value:function(){this.viewportHeight&&this.viewportWidth||(this.needsDraw=!0)}},_updateLength:{value:function(){if(this._paths){var e,t,i,s,n,a,r=this._paths.length,l=0;if(r>0){for(n=this._numberOfIterations%r,s=(this._numberOfIterations-n)/r,a=0;a<r;a++)e=this._paths[a],t=s+(a<n?1:0),i=t-e.tailOffset+e.headOffset-1,i>l&&(l=i);this.length=l}this.needsDraw=!0}}},_numberOfIterations:{value:0},handle_numberOfIterationsChange:{value:function(){this._updateLength()}},content:{get:function(){return this.getPath("contentController.content")},set:function(e){this.contentController=(new RangeController).initWithContent(e)}},allowsMultipleSelection:{value:!1},contentController:{value:null},isSelectionEnabled:{value:null},selectedIndexes:{serializable:!1,value:null},activeIndexes:{serializable:!1,value:null},observeProperty:{value:function(e,t,i){return observeProperty(this,e,t,i)}},templateDidLoad:{value:function(){var e=this;this._repetition.willDraw=function(){e.needsDraw=!0}}},_length:{value:0},length:{get:function(){return this._length},set:function(e){e<0?this._length=0:this._length=e}},_scroll:{value:0},_elasticScrollingRange:{value:20},_hasElasticScrolling:{value:!1},hasElasticScrolling:{get:function(){return this._hasElasticScrolling},set:function(e){e?this._hasElasticScrolling=!0:this._hasElasticScrolling=!1}},_slideOffsets:{value:null},_slideOffsetsLength:{value:0},_maxSlideOffsetIndex:{value:-1},_minSlideOffsetIndex:{value:2e9},_updateSlideOffset:{value:function(e,t){var i=1e-4;e>=0&&(t<-i||t>i?("undefined"==typeof this._slideOffsets[e]&&(this._slideOffsetsLength++,e<this._minSlideOffsetIndex&&(this._minSlideOffsetIndex=e),e>this._maxSlideOffsetIndex&&(this._maxSlideOffsetIndex=e)),this._slideOffsets[e]=t):this._removeSlideOffset(e))}},_incrementSlideOffset:{value:function(e,t){this._updateSlideOffset(e,this._getSlideOffset(e)+t)}},_removeSlideOffset:{value:function(e){if("undefined"!=typeof this._slideOffsets[e]){var t,i,s,n;if(delete this._slideOffsets[e],this._slideOffsetsLength--,e===this._minSlideOffsetIndex)for(t=Object.keys(this._slideOffsets),this._minSlideOffsetIndex=2e9,i=0,n=t.length;i<n;i++)s=0|t[i],s<this._minSlideOffsetIndex&&(this._minSlideOffsetIndex=s);if(e===this._maxSlideOffsetIndex)for("undefined"==typeof t&&(t=Object.keys(this._slideOffsets),n=t.length),this._maxSlideOffsetIndex=-1,i=0;i<n;i++)s=0|t[i],s>this._maxSlideOffsetIndex&&(this._maxSlideOffsetIndex=s)}}},_getSlideOffset:{value:function(e){return e<this._minSlideOffsetIndex?e=this._minSlideOffsetIndex>this._draggedSlideIndex?this._draggedSlideIndex:this._minSlideOffsetIndex:e>this._maxSlideOffsetIndex&&(e=this._maxSlideOffsetIndex<this._draggedSlideIndex?this._draggedSlideIndex:this._maxSlideOffsetIndex),"undefined"!=typeof this._slideOffsets[e]?this._slideOffsets[e]:0}},scroll:{get:function(){return this._scroll},set:function(e){if(e<0&&(e=0),e>this.length&&(e=this.length),this._hasElasticScrolling&&null!==this._draggedSlideIndex){var t,i,s=this._draggedSlideIndex-this._elasticScrollingRange,n=this._draggedSlideIndex+this._elasticScrollingRange;for(s>this._minSlideOffsetIndex&&(s=this._minSlideOffsetIndex),n<this._maxSlideOffsetIndex&&(n=this._maxSlideOffsetIndex),i=e-this._scroll,s<0&&(s=0),t=s;t<=n;t++)t!==this._draggedSlideIndex?this._incrementSlideOffset(t,i):this._removeSlideOffset(t);this._scroll=e}else this._scroll=e;this.needsDraw=!0}},previousStride:{value:function(){var e=Math.round(this.scroll/this.stride),t=(e-1)*this.stride;this.startScrollingIndexToOffset(0,-t)}},nextStride:{value:function(){var e=Math.round(this.scroll/this.stride),t=(e+1)*this.stride;this.startScrollingIndexToOffset(0,-t)}},_isInputEnabled:{value:!0},isInputEnabled:{get:function(){return this._isInputEnabled},set:function(e){e?this._isInputEnabled=!0:this._isInputEnabled=!1}},_draggedSlideIndex:{value:0},draggedSlideIndex:{get:function(){return this._draggedSlideIndex},set:function(e){if(e!==this._draggedSlideIndex){if(null!==e){var t,i=this._getSlideOffset(e),s=this._minSlideOffsetIndex,n=this._maxSlideOffsetIndex;for(this._incrementSlideOffset(this._draggedSlideIndex,-i),t=s;t<=n;t++)t!==this._draggedSlideIndex&&this._incrementSlideOffset(t,-i);this._removeSlideOffset(e),this._scroll-=i,this._flowTranslateComposer._scroll=this._scroll}this._draggedSlideIndex=e,this.needsDraw=!0}}},_elasticScrollingSpeed:{value:1},elasticScrollingSpeed:{get:function(){return this._elasticScrollingSpeed},set:function(e){this._elasticScrollingSpeed=parseFloat(e)}},lastDrawTime:{value:null},offset:{enumerable:!1,value:function(e){var t=this._paths.length,i=e%t,s=Math.floor(e/t)-this._scroll+this._paths[i].headOffset;return{pathIndex:i,slideTime:s+this._getSlideOffset(e)}}},serializeSelf:{value:function(e){e.setAllValues();for(var t,i=this.originalContent,s=0;t=i[s];s++)t.component&&e.addObject(t.component)}}});window.MontageElement&&MontageElement.define("montage-flow",Flow);