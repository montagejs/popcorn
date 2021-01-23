"use strict";var assert=require("chai").assert,ensurePlainObject=require("../../plain-object/ensure");describe("plain-object/ensure",function(){it("Should return input value",function(){var e={};assert.equal(ensurePlainObject(e),e)}),it("Should crash on invalid value",function(){try{throw ensurePlainObject(null),new Error("Unexpected")}catch(e){assert.equal(e.name,"TypeError"),assert(e.message.includes("is not a plain object"))}})});