"use strict";var assert=require("chai").assert,ensureFunction=require("../../function/ensure");describe("function/ensure",function(){it("Should return input value",function(){var e=function(){return!0};assert.equal(ensureFunction(e),e)}),it("Should crash on invalid value",function(){try{throw ensureFunction(null),new Error("Unexpected")}catch(e){assert.equal(e.name,"TypeError"),assert(e.message.includes("is not a function"))}})});