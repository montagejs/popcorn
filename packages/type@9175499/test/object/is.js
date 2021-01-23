"use strict";var assert=require("chai").assert,isObject=require("../../object/is");describe("object/is",function(){it("Should return true on object",function(){assert.equal(isObject({}),!0)}),it("Should return true on function",function(){assert.equal(isObject(function(){return!0}),!0)}),it("Should return true on array",function(){assert.equal(isObject([]),!0)}),"function"==typeof Object.create&&it("Should return true on object with no prototype",function(){assert.equal(isObject(Object.create(null)),!0)}),it("Should return false on string",function(){assert.equal(isObject("foo"),!1)}),it("Should return false on empty string",function(){assert.equal(isObject(""),!1)}),it("Should return false on number",function(){assert.equal(isObject(123),!1)}),it("Should return false on NaN",function(){assert.equal(isObject(NaN),!1)}),it("Should return false on boolean",function(){assert.equal(isObject(!0),!1)}),"function"==typeof Symbol&&it("Should return false on symbol",function(){assert.equal(isObject(Symbol("foo")),!1)}),it("Should return false on null",function(){assert.equal(isObject(null),!1)}),it("Should return false on undefined",function(){assert.equal(isObject(void 0),!1)})});