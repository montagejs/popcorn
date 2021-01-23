"use strict";var assert=require("chai").assert,ensureError=require("../../error/ensure");describe("error/ensure",function(){it("Should return input value",function(){var r=new Error;assert.equal(ensureError(r),r)}),it("Should crash on invalid value",function(){try{throw ensureError(null),new Error("Unexpected")}catch(r){assert.equal(r.name,"TypeError"),assert(r.message.includes("is not an error object"))}})});