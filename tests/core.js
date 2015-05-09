"use strict";

/* global describe, beforeEach, afterEach, it */

var chai = require("chai");
var sinon = require("sinon");

require("../src/core.js");

/**
 * DOM stack
 */
var document    = {};
var EventTarget = {};

describe("DOMEventListener", function() {
	var testObject;
	var documentMock;
	var domMock;

	beforeEach(function() {
		domMock      = sinon.mock();
		documentMock = sinon.mock(document);
		documentMock.expects("createElement")
			.once().withExactArgs('xml').returns(domMock);
		testObject = new DOMEventListener();		
	});
	
	afterEach(function() {
		domMock.verify();
		documentMock.verify();
	});
	
	describe("#addEventListener", function() {
		it("should all dom addEventListener", function() {
			domMock.expects("addEventListener").once().withExactArgs(1, 2, 3);
			testObject.addEventListener(1, 2, 3);
		});
	});
});