"use strict";var ensureString=require("../../object/validate-stringifiable-value");module.exports=function(e){var r=ensureString(this),t=0,n=0;if(e=ensureString(e),!e)throw new TypeError("Search string cannot be empty");for(;(n=r.indexOf(e,n))!==-1;)++t,n+=e.length;return t};