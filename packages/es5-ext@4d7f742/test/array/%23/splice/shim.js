"use strict";var SubArray=require("../../../../array/_sub-array-dummy-safe");module.exports=function(a,r){var e,l,u,o={};e=["foo",void 0,0,"2d",!1,o,null],r.deep(a.call(e,2,2,"bar"),[0,"2d"],"Plain array: result"),r.deep(e,["foo",void 0,"bar",!1,o,null],"Plain array: change"),l=new SubArray("foo",(void 0),0,"2d",(!1),o,null),u=a.call(l,2,2,"bar"),r(u instanceof SubArray,!0,"Instance of subclass"),r.deep(u,[0,"2d"],"Subclass: result"),r.deep(l,["foo",void 0,"bar",!1,o,null],"Subclass: change")};