montageDefine("9175499","test/natural-number/ensure",{dependencies:["chai","../../natural-number/ensure"],factory:function(e,n,r){"use strict";var u=e("chai").assert,a=e("../../natural-number/ensure");describe("natural-number/ensure",function(){it("Should return coerced value",function(){u.equal(a("12.23"),12)}),it("Should crash on no value",function(){try{throw a(-20),new Error("Unexpected")}catch(e){u.equal(e.name,"TypeError"),u.equal(e.message,"-20 is not a natural number")}})})}});