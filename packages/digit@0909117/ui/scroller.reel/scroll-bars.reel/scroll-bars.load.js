montageDefine("0909117","ui/scroller.reel/scroll-bars.reel/scroll-bars",{dependencies:["montage/ui/component"],factory:function(t,i,s){var e=t("montage/ui/component").Component,o=i.ScrollBars=e.specialize({constructor:{value:function(){this["super"]()}},enterDocument:{value:function(t){if(t&&!o.transformCssProperty){var i=this.element.style;"undefined"!=typeof i.webkitTransform?o.transformCssProperty="webkitTransform":"undefined"!=typeof i.MozTransform?o.transformCssProperty="MozTransform":"undefined"!=typeof i.msTransform?o.transformCssProperty="msTransform":o.transformCssProperty="transform","undefined"!=typeof i.webkitTransition?o.transitionCssProperty="webkitTransition":"undefined"!=typeof i.MozTransition?o.transitionCssProperty="MozTransition":"undefined"!=typeof i.msTransition?o.transitionCssProperty="msTransition":o.transitionCssProperty="transition"}}},_verticalScroll:{value:0},_horizontalScroll:{value:0},_verticalLength:{value:0},_horizontalLength:{value:0},verticalScroll:{get:function(){return this._verticalScroll},set:function(t){this._verticalScroll=t,this.needsDraw=!0}},horizontalScroll:{get:function(){return this._horizontalScroll},set:function(t){this._horizontalScroll=t,this.needsDraw=!0}},verticalLength:{get:function(){return this._verticalLength},set:function(t){this._verticalLength=t,this.needsDraw=!0}},horizontalLength:{get:function(){return this._horizontalLength},set:function(t){this._horizontalLength=t,this.needsDraw=!0}},_opacity:{value:0},opacity:{get:function(){return this._opacity},set:function(t){this._opacity=t,this.needsDraw=!0}},_isDisplayUpdated:{value:!1},_displayVertical:{value:!1},displayVertical:{get:function(){return this._displayVertical},set:function(t){this._displayVertical!==t&&(this._displayVertical=t,this._isDisplayUpdated=!0,this.needsDraw=!0)}},_displayHorizontal:{value:!1},displayHorizontal:{get:function(){return this._displayHorizontal},set:function(t){this._displayHorizontal!==t&&(this._displayHorizontal=t,this._isDisplayUpdated=!0,this.needsDraw=!0)}},_top:{value:!1},_bottomClip:{value:!1},_bottom:{value:!1},_left:{value:!1},_rightClip:{value:!1},_right:{value:!1},_hasResizedHorizontal:{value:!1},_hasResizedVertical:{value:!1},willDraw:{value:function(){this._offsetWidth!==this._element.offsetWidth&&(this._offsetWidth=this._element.offsetWidth,this._hasResizedHorizontal=!0),this._offsetHeight!==this._element.offsetHeight&&(this._offsetHeight=this._element.offsetHeight,this._hasResizedVertical=!0)}},draw:{value:function(){var t,i,s,e;if(this._isDisplayUpdated){var r=this._displayVertical?"block":"none",l=this._displayHorizontal?"block":"none";this._top.style.display=this._bottomClip.style.display=r,this._left.style.display=this._rightClip.style.display=l,this._isDisplayUpdated=!1}if(this._hasResizedHorizontal&&this._displayHorizontal&&(this._rightClip.style.width=this._right.style.width=this._offsetWidth-4+"px",this._rightClip.style.clip="rect(-1px,"+(this._offsetWidth-3)+"px,6px,3px)",this._hasResizedHorizontal=!1),this._hasResizedVertical&&this._displayVertical&&(this._bottomClip.style.height=this._bottom.style.height=this._offsetHeight-4+"px",this._bottomClip.style.clip="rect(3px,6px,"+(this._offsetHeight-3)+"px,-1px)",this._hasResizedVertical=!1),this._opacity){if(this._displayHorizontal){s=this._offsetWidth-9-(this._displayVertical?6:0),t=Math.floor(s*this._horizontalLength),e=s-t,i=1-this._horizontalLength?Math.floor(e*this._horizontalScroll/(1-this._horizontalLength)):0,i<0&&(t+=i,t<0&&(t=0),i=0),i>e&&(t+=Math.floor(e-i),t<0&&(t=0),i=s-t);var a=t-this._offsetWidth+9+"px,0",n=i+2+"px,0";this._right.style[o.transformCssProperty]="translate3d("+a+",0)",this._left.style[o.transformCssProperty]=this._rightClip.style[o.transformCssProperty]="translate3d("+n+",0)",this._left.style[o.transitionCssProperty]=this._right.style[o.transitionCssProperty]="none",this._left.style.opacity=this._right.style.opacity=this._opacity}if(this._displayVertical){s=this._offsetHeight-9-(this._displayHorizontal?6:0),t=Math.floor(s*this._verticalLength),e=s-t,i=1-this._verticalLength?Math.floor(e*this._verticalScroll/(1-this._verticalLength)):0,i<0&&(t+=i,t<0&&(t=0),i=0),i>e&&(t+=Math.floor(e-i),t<0&&(t=0),i=s-t);var h="0,"+(t-this._offsetHeight+9)+"px",p="0,"+(i+2)+"px";this._bottom.style[o.transformCssProperty]="translate3d("+h+",0)",this._top.style[o.transformCssProperty]=this._bottomClip.style[o.transformCssProperty]="translate3d("+p+",0)",this._top.style[o.transitionCssProperty]=this._bottom.style[o.transitionCssProperty]="none",this._top.style.opacity=this._bottom.style.opacity=this._opacity}}else this._displayHorizontal&&(this._left.style[o.transitionCssProperty]=this._right.style[o.transitionCssProperty]="300ms opacity",this._left.style.opacity=this._right.style.opacity=0),this._displayVertical&&(this._top.style[o.transitionCssProperty]=this._bottom.style[o.transitionCssProperty]="300ms opacity",this._top.style.opacity=this._bottom.style.opacity=0)}}},{transformCssProperty:{value:null},transitionCssProperty:{value:null}})}});