/* global DOMEventListener */
/* global EventTarget */
/* global global, describe, beforeEach, afterEach, it */
"use strict";

var chai  = require("chai");
var sinon = require("sinon");
require("./load")("src/core.js", ["DOMEventListener"]);

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
		it("should call DOM EventTarget::addEventListener", function () {
			domMock.expects("addEventListener").once().withExactArgs(1, 2, 3);
			testObject.addEventListener(1, 2, 3);
			domMock.verify();
		});
	});
	
	describe("#removeEventListener", function () {
		it("should call DOM EventTarget::removeEventListener", function () {
			domMock.expects("removeEventListener")
				.once()
				.withExactArgs(1, 2, 3);
			testObject.removeEventListener(1, 2, 3);
			domMock.verify();
		});
	});
	
	describe("#dispatchEvent", function () {
		it("should call DOM EventTarget::dispatchEvent", function () {
			var event = new CustomEvent('testEvent');
			domMock.expects("dispatchEvent")
				.once()
				.withExactArgs(event);
			testObject.dispatchEvent(event);
			domMock.verify();
		});
	});
});