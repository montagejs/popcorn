montageDefine("b2c6b9c","tests/test-helper",{dependencies:[".."],factory:function(e,n,t){var r=e(".."),o=r.Parser,l=r.CollectingHandler,c=5;n.writeToParser=function(e,n,t){for(var r=new o(e,n),l=0;l<t.length;l+=c)r.write(t.substr(l,c));r.end(),r.parseComplete(t)},n.getEventCollector=function(e){var n=new l({onerror:e,onend:function(){e(null,n.events.reduce(function(e,n){return"onerror"===n[0]||"onend"===n[0]||("ontext"===n[0]&&e.length&&"text"===e[e.length-1].event?e[e.length-1].data[0]+=n[1]:e.push({event:n[0].slice(2),data:n.slice(1)})),e},[]))}});return n}}});