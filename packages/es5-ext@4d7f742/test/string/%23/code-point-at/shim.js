"use strict";module.exports=function(l,c){c(l.length,1,"Length"),c(l.call("abc𝌆def",""),97),c(l.call("abc𝌆def","_"),97),c(l.call("abc𝌆def"),97),c(l.call("abc𝌆def",-(1/0)),void 0),c(l.call("abc𝌆def",-1),void 0),c(l.call("abc𝌆def",-0),97),c(l.call("abc𝌆def",0),97),c(l.call("abc𝌆def",3),119558),c(l.call("abc𝌆def",4),57094),c(l.call("abc𝌆def",5),100),c(l.call("abc𝌆def",42),void 0),c(l.call("abc𝌆def",1/0),void 0),c(l.call("abc𝌆def",1/0),void 0),c(l.call("abc𝌆def",NaN),97),c(l.call("abc𝌆def",!1),97),c(l.call("abc𝌆def",null),97),c(l.call("abc𝌆def",void 0),97),c(l.call("𝌆def",""),119558),c(l.call("𝌆def","1"),57094),c(l.call("𝌆def","_"),119558),c(l.call("𝌆def"),119558),c(l.call("𝌆def",-1),void 0),c(l.call("𝌆def",-0),119558),c(l.call("𝌆def",0),119558),c(l.call("𝌆def",1),57094),c(l.call("𝌆def",42),void 0),c(l.call("𝌆def",!1),119558),c(l.call("𝌆def",null),119558),c(l.call("𝌆def",void 0),119558),c(l.call("�abc",""),55348),c(l.call("�abc","_"),55348),c(l.call("�abc"),55348),c(l.call("�abc",-1),void 0),c(l.call("�abc",-0),55348),c(l.call("�abc",0),55348),c(l.call("�abc",!1),55348),c(l.call("�abc",NaN),55348),c(l.call("�abc",null),55348),c(l.call("�abc",void 0),55348),c(l.call("�abc",""),57094),c(l.call("�abc","_"),57094),c(l.call("�abc"),57094),c(l.call("�abc",-1),void 0),c(l.call("�abc",-0),57094),c(l.call("�abc",0),57094),c(l.call("�abc",!1),57094),c(l.call("�abc",NaN),57094),c(l.call("�abc",null),57094),c(l.call("�abc",void 0),57094),c["throws"](function(){l.call(void 0)},TypeError),c["throws"](function(){l.call(void 0,4)},TypeError),c["throws"](function(){l.call(null)},TypeError),c["throws"](function(){l.call(null,4)},TypeError),c(l.call(42,0),52),c(l.call(42,1),50),c(l.call({toString:function(){return"abc"}},2),99),c["throws"](function(){l.apply(void 0)},TypeError),c["throws"](function(){l.apply(void 0,[4])},TypeError),c["throws"](function(){l.apply(null)},TypeError),c["throws"](function(){l.apply(null,[4])},TypeError),c(l.apply(42,[0]),52),c(l.apply(42,[1]),50),c(l.apply({toString:function(){return"abc"}},[2]),99)};