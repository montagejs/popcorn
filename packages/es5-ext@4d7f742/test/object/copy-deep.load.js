montageDefine("4d7f742","test/object/copy-deep",{dependencies:[],factory:function(e,r,t){"use strict";var a=JSON.stringify;t.exports=function(e,r){var t={1:"raz",2:"dwa",3:"trzy"},i=e(t);r.not(i,t,"Return different object"),r(a(i),a(t),"Match properties and values"),t={foo:"bar",raz:{dwa:"dwa",trzy:{cztery:"pięć","sześć":"siedem"},osiem:{},"dziewięć":function(){}},"dziesięć":10,"jedenaście":["raz",["dwa","trzy",{elo:"true"}]]},t.raz.rec=t,i=e(t),r.not(t.raz,i.raz,"Deep"),r.not(t.raz.trzy,i.raz.trzy,"Deep #2"),r(a(t.raz.trzy),a(i.raz.trzy),"Deep content"),r(i.raz.rec,i,"Recursive"),r.not(t.raz.osiem,i.raz.osiem,"Empty object"),r(t.raz["dziewięć"],i.raz["dziewięć"],"Function"),r.not(t["jedenaście"],i["jedenaście"]),r.not(t["jedenaście"][1],i["jedenaście"][1]),r.not(t["jedenaście"][1][2],i["jedenaście"][1][2]),r(e(!0),!0)}}});