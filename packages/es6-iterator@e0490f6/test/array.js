"use strict";var iteratorSymbol=require("es6-symbol").iterator;module.exports=function(e){return{Values:function(n){var d,t=["raz","dwa","trzy","cztery","pięć","sześć"];d=new e(t),n(d[iteratorSymbol](),d,"@@iterator"),n.deep(d.next(),{done:!1,value:"raz"},"#1"),n.deep(d.next(),{done:!1,value:"dwa"},"#2"),t.splice(1,0,"elo"),n.deep(d.next(),{done:!1,value:"dwa"},"Insert"),n.deep(d.next(),{done:!1,value:"trzy"},"#3"),n.deep(d.next(),{done:!1,value:"cztery"},"#4"),t.pop(),n.deep(d.next(),{done:!1,value:"pięć"},"#5"),n.deep(d.next(),{done:!0,value:void 0},"End")},"Keys & Values":function(n){var d,t=["raz","dwa","trzy","cztery","pięć","sześć"];d=new e(t,"key+value"),n(d[iteratorSymbol](),d,"@@iterator"),n.deep(d.next(),{done:!1,value:[0,"raz"]},"#1"),n.deep(d.next(),{done:!1,value:[1,"dwa"]},"#2"),t.splice(1,0,"elo"),n.deep(d.next(),{done:!1,value:[2,"dwa"]},"Insert"),n.deep(d.next(),{done:!1,value:[3,"trzy"]},"#3"),n.deep(d.next(),{done:!1,value:[4,"cztery"]},"#4"),t.pop(),n.deep(d.next(),{done:!1,value:[5,"pięć"]},"#5"),n.deep(d.next(),{done:!0,value:void 0},"End")},Keys:function(n){var d,t=["raz","dwa","trzy","cztery","pięć","sześć"];d=new e(t,"key"),n(d[iteratorSymbol](),d,"@@iterator"),n.deep(d.next(),{done:!1,value:0},"#1"),n.deep(d.next(),{done:!1,value:1},"#2"),t.splice(1,0,"elo"),n.deep(d.next(),{done:!1,value:2},"Insert"),n.deep(d.next(),{done:!1,value:3},"#3"),n.deep(d.next(),{done:!1,value:4},"#4"),t.pop(),n.deep(d.next(),{done:!1,value:5},"#5"),n.deep(d.next(),{done:!0,value:void 0},"End")},Sparse:function(n){var d,t=new Array(6);t[2]="raz",t[4]="dwa",d=new e(t),n.deep(d.next(),{done:!1,value:void 0},"#1"),n.deep(d.next(),{done:!1,value:void 0},"#2"),n.deep(d.next(),{done:!1,value:"raz"},"#3"),n.deep(d.next(),{done:!1,value:void 0},"#4"),n.deep(d.next(),{done:!1,value:"dwa"},"#5"),n.deep(d.next(),{done:!1,value:void 0},"#6"),n.deep(d.next(),{done:!0,value:void 0},"End")}}};