montageDefine("cf2e582","test/index",{dependencies:[],factory:function(o,t,n){"use strict";n.exports=function(o,t){var n,e,f,c,i,u,m,r,d=o();d.emit("none"),u="Once: ",e=0,d.once("foo",function(o,n,f){t(this,d,u+"Context"),t.deep([o,n,f],["foo",d,15],u+"Arguments"),++e}),d.emit("foobar"),t(e,0,u+"Not invoked on other event"),d.emit("foo","foo",d,15),t(e,1,u+"Emitted"),d.emit("foo"),t(e,1,u+"Emitted once"),u="On & Once: ",e=0,d.on("foo",m=function(o,n,f){t(this,d,u+"Context"),t.deep([o,n,f],["foo",d,15],u+"Arguments"),++e}),f=0,d.once("foo",r=function(o,n,e){t(this,d,u+"Context"),t.deep([o,n,e],["foo",d,15],u+"Arguments"),++f}),d.emit("foobar"),t(e,0,u+"Not invoked on other event"),d.emit("foo","foo",d,15),t(e,1,u+"Emitted"),d.emit("foo","foo",d,15),t(e,2,u+"Emitted twice"),t(f,1,u+"Emitted once"),d.off("foo",m),d.emit("foo"),t(e,2,u+"Not emitter after off"),e=0,d.once("foo",m=function(){++e}),d.off("foo",m),d.emit("foo"),t(e,0,"Once Off: Not emitted"),e=0,d.on("foo",r=function(){}),d.once("foo",m=function(){++e}),d.off("foo",m),d.emit("foo"),t(e,0,"Once Off (multi): Not emitted"),d.off("foo",r),u="Prototype Share: ",n=Object.create(d),e=0,f=0,c=0,i=0,d.on("foo",function(){++e}),n.on("foo",function(){++f}),d.once("foo",function(){++c}),n.once("foo",function(){++i}),d.emit("foo"),t(e,1,u+"x on count"),t(f,0,u+"y on count"),t(c,1,u+"x once count"),t(i,0,u+"y once count"),n.emit("foo"),t(e,1,u+"x on count"),t(f,1,u+"y on count"),t(c,1,u+"x once count"),t(i,1,u+"y once count"),d.emit("foo"),t(e,2,u+"x on count"),t(f,1,u+"y on count"),t(c,1,u+"x once count"),t(i,1,u+"y once count"),n.emit("foo"),t(e,2,u+"x on count"),t(f,2,u+"y on count"),t(c,1,u+"x once count"),t(i,1,u+"y once count")}}});