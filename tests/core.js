"use strict";

/* global global, describe, beforeEach, afterEach, it */

var chai  = require("chai");
var sinon = require("sinon");
require("./load")("src/core.js", ["DOMEventListener"]);
require("../src/core.js");

describe("DOMEventListener", function () {
	var testObject;
	var documentMock;
	var domMock;
	var eventTarget;

	beforeEach(function () {
		eventTarget  = new EventTarget();
		domMock      = sinon.mock(eventTarget);
		documentMock = sinon.mock(document);
		documentMock.expects("createElement")
			.once().withExactArgs('xml').returns(eventTarget);
		testObject = new DOMEventListener();
	});

	afterEach(function () {
		documentMock.verify();
	});

	describe("#addEventListener", function () {
		it("should call dom addEventListener", function () {
			domMock.expects("addEventListener").once().withExactArgs(1, 2, 3);
			testObject.addEventListener(1, 2, 3);
			domMock.verify();
		});
	});
});