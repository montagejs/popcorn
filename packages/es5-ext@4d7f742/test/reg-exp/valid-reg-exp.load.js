montageDefine("4d7f742","test/reg-exp/valid-reg-exp",{dependencies:[],factory:function(n,t,e){"use strict";e.exports=function(n,t){var e=/raz/;t(n(e),e,"Direct"),e=new RegExp("foo"),t(n(e),e,"Constructor"),t["throws"](function(){n({})},"Object"),t["throws"](function(){n(function(){})},"Function"),t["throws"](function(){n({exec:function(){return 20}})},"Plain object")}}});