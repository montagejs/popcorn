montageDefine("f7560f2","test.html",{"text":"<!DOCTYPE html><html manifest=../../manifest.appcache><head><meta charset=UTF-8><script src=bower_components/mocha/mocha.js></script><script src=bower_components/chai/chai.js></script><script>window.NativeProxy=window.Proxy,window.NativeProxy&&(window.Proxy=null);var es6support=!1;try{eval(\"let x = 1\"),es6support=!0}catch(e){console.warn(\"running tests in es5/compiled mode\")}var s=document.createElement(\"script\");s.src=es6support?\"proxy.js\":\"proxy.min.js\",document.write(s.outerHTML);</script><script>var assert=chai.assert;mocha.setup({ui:\"tdd\"}),function(){var n=null;window.addEventListener(\"error\",function(e){n=e.filename+\":\"+e.lineno+\" \"+e.message}),window.addEventListener(\"load\",function(){n&&suite(\"page-script-errors\",function(){test(\"no script errors on page\",function(){assert.fail(null,null,n)})}),mocha.run()})}();</script></head><body><div id=mocha></div><script src=suite.js></script></body></html>"})