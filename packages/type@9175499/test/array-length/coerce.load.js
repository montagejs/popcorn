montageDefine("9175499","test/array-length/coerce",{dependencies:["chai","../../array-length/coerce"],factory:function(e,n,o){"use strict";var t=e("chai").assert,u=e("../../array-length/coerce");describe("array-length/coerce",function(){it("Should coerce float",function(){t.equal(u(123.123),123),t.equal(u(123.823),123)}),it("Should coerce string",function(){t.equal(u("12.123"),12)}),it("Should coerce booleans",function(){t.equal(u(!0),1)}),it("Should coerce number objects",function(){t.equal(u(new Number(343)),343)}),it("Should coerce objects",function(){t.equal(u({valueOf:function(){return 23}}),23)}),it("Should reject infinite number",function(){t.equal(u(1/0),null)}),it("Should reject number beyond Number.MAX_SAFE_INTEGER",function(){t.equal(u(9007199254740992),null)}),it("Should reject negative number",function(){t.equal(u(-9),null)}),it("Should reject NaN",function(){t.equal(u(NaN),null)}),"function"==typeof Object.create&&it("Should not coerce objects with no number representation",function(){t.equal(u(Object.create(null)),null)}),it("Should not coerce null",function(){t.equal(u(null),null)}),it("Should not coerce undefined",function(){t.equal(u(void 0),null)}),"function"==typeof Symbol&&it("Should not coerce symbols",function(){t.equal(u(Symbol("foo")),null)})})}});