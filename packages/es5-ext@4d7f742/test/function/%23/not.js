"use strict";var identity=require("../../../function/identity"),noop=require("../../../function/noop");module.exports=function(i,n){n(i.call(identity)(""),!0,"Falsy"),n(i.call(noop)(),!0,"Undefined"),n(i.call(identity)({}),!1,"Any object"),n(i.call(identity)(!0),!1,"True")};