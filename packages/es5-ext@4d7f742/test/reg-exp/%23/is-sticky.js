"use strict";module.exports=function(a,l){var c;l(a.call(/raz/),!1,"Normal"),l(a.call(/raz/g),!1,"Global");try{c=new RegExp("raz","y")}catch(r){}c&&l(a.call(c),!0,"Sticky")};