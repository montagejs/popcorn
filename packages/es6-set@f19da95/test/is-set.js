"use strict";var SetPoly=require("../polyfill");module.exports=function(e,i){i(e(void 0),!1,"Undefined"),i(e(null),!1,"Null"),i(e(!0),!1,"Primitive"),i(e("raz"),!1,"String"),i(e({}),!1,"Object"),i(e([]),!1,"Array"),"undefined"!=typeof Set&&i(e(new Set),!0,"Native"),i(e(new SetPoly),!0,"Polyfill")};