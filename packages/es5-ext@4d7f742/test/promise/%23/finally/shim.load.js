montageDefine("4d7f742","test/promise/%23/finally/shim",{dependencies:["../../../../function/#/microtask-delay","plain-promise"],factory:function(r,n,o){"use strict";var e=r("../../../../function/#/microtask-delay");"function"!=typeof Promise&&(global.Promise=r("plain-promise")),o.exports=function(r,n){return{Success:function(o){var i;r.call(Promise.resolve("foo"),function(){return i=!0,"bar"}).then(e.call(function(r){n(r,"foo"),n(i,!0),o()},e.call(o)))},Failure:function(o){var i,l=new Error("Some error");r.call(Promise.reject(l),function(){return i=!0,"bar"}).then(e.call(function(){n.never(),o()}),e.call(function(r){n(r,l),n(i,!0),o()}))},SuccessFinallyError:function(o){var i,l=new Error("Finally error");r.call(Promise.resolve("foo"),function(){throw i=!0,l}).then(e.call(function(){n.never(),o()}),e.call(function(r){n(r,l),n(i,!0),o()}))},FailureFinallyError:function(o){var i,l=new Error("Finally error");r.call(Promise.reject(new Error("Some error")),function(){throw i=!0,l}).then(e.call(function(){n.never(),o()}),e.call(function(r){n(r,l),n(i,!0),o()}))}}}}});