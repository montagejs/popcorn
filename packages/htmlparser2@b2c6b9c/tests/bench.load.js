montageDefine("b2c6b9c","tests/bench",{dependencies:["ben","node-xml","libxmljs","sax","node-expat","htmlparser","../lib/Parser.js"],factory:function(r,e,n){function a(){var r=new h.SaxParser(function(r){});this.parse=function(e){r.parseString(e)}}function t(){var r=new f.SaxPushParser(function(r){});this.parse=function(e){r.push(e,!1)}}function s(){var r=v.parser();this.parse=function(e){r.write(e)}}function o(){var r=new x.Parser;this.parse=function(e){r.parse(e,!1)}}function c(){var r=new m.DefaultHandler,e=new m.Parser(r);this.parse=function(r){e.parseComplete(r)}}function i(){var r=new b;this.parse=function(e){r.write(e)}}var u=r("ben"),p=[];try{var h=r("node-xml");p.push([a,"node-xml"])}catch(l){}try{var f=r("libxmljs");p.push([t,"libxmljs"])}catch(l){}try{var v=r("sax");p.push([s,"sax"])}catch(l){}try{var x=r("node-expat");p.push([o,"node-expat"])}catch(l){}try{var m=r("htmlparser");p.push([c,"htmlparser"])}catch(l){}try{var b=r("../lib/Parser.js");p.push([i,"htmlparser2"])}catch(l){}var d=p.map(function(r){var e=new r[0],n=r[1];process.stdout.write(n+":"+Array(14-n.length).join(" ")),e.parse("<r>");var a=u(1e6,function(){e.parse("<foo bar='baz'>quux</foo>")});return console.log((a>.01?"":"0")+(1e3*a).toFixed(2),"ms/el"),[n,a]});console.log("\nWinner:",d.sort(function(r,e){return r[1]-e[1]})[0][0])}});