montageDefine("f610e91","compute",{dependencies:["./parse","./compile-observer","./compile-binder","./observers","./scope"],factory:function(e,r,t){function o(e,r,t){t.target=e,t.targetPath=r;var o=t.source=t.source||e,c=t.args,v=t.compute,u=t.parameters=t.parameters||o,b=t.document,i=t.components,g=t.trace,d=new m(o);d.parameters=u,d.document=b,d.components=i;var f=new m(e);f.parameters=u,f.document=b,f.components=i;for(var C,O,k,h,l=[],y=0;C=c[y];y++)O=a(C),"rangeContent"===O.type?(k=n(O.args[0]),h=p.makeRangeContentObserver(k)):"mapContent"===O.type?(k=n(O.args[0]),h=p.makeMapContentObserver(k)):h=n(O),l.push(h);var P=p.makeRangeContentObserver(p.makeObserversObserver(l)),w=p.makeComputerObserver(P,v,e),R=a(r),j=s(R);return j(w,d,f,t,g?{sourcePath:c.join(", "),targetPath:r}:void 0)}var a=e("./parse"),n=e("./compile-observer"),s=e("./compile-binder"),p=e("./observers"),m=e("./scope");t.exports=o}});