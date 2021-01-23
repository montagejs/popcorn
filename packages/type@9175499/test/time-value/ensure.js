"use strict";var assert=require("chai").assert,ensureTimeValue=require("../../time-value/ensure");describe("time-value/ensure",function(){it("Should return coerced value",function(){assert.equal(ensureTimeValue("12.23"),12)}),it("Should crash on no value",function(){try{throw ensureTimeValue("foo"),new Error("Unexpected")}catch(e){assert.equal(e.name,"TypeError"),assert.equal(e.message,"foo is not a time value")}})});