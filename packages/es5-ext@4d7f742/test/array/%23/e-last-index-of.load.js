montageDefine("4d7f742","test/array/%23/e-last-index-of",{dependencies:[],factory:function(a,N,e){"use strict";e.exports=function(a,N){var e={};N(a.call([3,"raz",{},e,{},e],e),5,"Regular"),N(a.call([3,"raz",NaN,{},e],NaN),2,"NaN"),N(a.call([3,"raz",0,{},-0],-0),4,"-0"),N(a.call([3,"raz",-0,{},0],0),4,"+0"),N(a.call([3,"raz",NaN,{},NaN],NaN,3),2,"fromIndex"),N(a.call([3,"raz",NaN,2,NaN],NaN,-1),4,"Negative fromIndex #1"),N(a.call([3,"raz",NaN,2,NaN],NaN,-2),2,"Negative fromIndex #2")}}});