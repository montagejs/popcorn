"use strict";var value=require("../../../object/valid-value"),toInteger=require("../../../number/to-integer");module.exports=function(e){var r,t=String(value(this));if(e=toInteger(e),e<0)throw new RangeError("Count must be >= 0");if(!isFinite(e))throw new RangeError("Count must be < ∞");for(r="";e;)e%2&&(r+=t),e>1&&(t+=t),e>>=1;return r};