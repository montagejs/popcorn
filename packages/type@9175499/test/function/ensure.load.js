montageDefine("9175499","test/function/ensure",{dependencies:["chai","../../function/ensure"],factory:function(n,e,t){"use strict";var u=n("chai").assert,i=n("../../function/ensure");describe("function/ensure",function(){it("Should return input value",function(){var n=function(){return!0};u.equal(i(n),n)}),it("Should crash on invalid value",function(){try{throw i(null),new Error("Unexpected")}catch(n){u.equal(n.name,"TypeError"),u(n.message.includes("is not a function"))}})})}});