"use strict";module.exports=function(t,n){var o=/raz/;n(t(o),o,"Direct"),o=new RegExp("foo"),n(t(o),o,"Constructor"),n["throws"](function(){t({})},"Object"),n["throws"](function(){t(function(){})},"Function"),n["throws"](function(){t({exec:function(){return 20}})},"Plain object")};