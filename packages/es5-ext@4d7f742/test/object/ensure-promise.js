"use strict";module.exports=function(r,n){var o;n["throws"](function(){r()},TypeError),n["throws"](function(){r(null)},TypeError),n["throws"](function(){r("promise")},TypeError),n["throws"](function(){r({})},TypeError),n["throws"](function(){r(function(){})},TypeError),n["throws"](function(){r({then:{}})},TypeError),o={then:function(){}},n(r(o),o),o=function(){},o.then={},n["throws"](function(){r(o)},TypeError),o.then=function(){},n(r(o),o)};