"use strict";var indexOf=require("./e-index-of"),every=Array.prototype.every,isFirst;isFirst=function(e,r){return indexOf.call(this,e)===r},module.exports=function(){return every.call(this,isFirst,this)};