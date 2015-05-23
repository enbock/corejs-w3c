/* global DOMEventListener */
/* global EventTarget */
/* global global, describe, beforeEach, afterEach, it */
"use strict";

require("./load");
var CoreJs = require("../src/core.js");

var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var sinon  = require("sinon");

/**
 * Base event functionality.
 */
describe("Event", function () {	
	it("#constructor", function () {
		var testObject = new CoreJs.Event(CoreJs.Event.LOAD, "Detail");
		expect(testObject.type).is.equal(CoreJs.Event.LOAD);
		expect(testObject.detail).is.equal("Detail");
		testObject = new CoreJs.Event(CoreJs.Event.LOAD);
		expect(testObject.detail).to.be.instanceOf(Object);
	});
});

/**
 * DOM event linster.
 */
describe("Event.Listener {DOMEventListener}", function () {
	var testObject;
	var documentMock;
	var domMock;
	var eventTarget;

	beforeEach(function () {
		eventTarget = new EventTarget();
		domMock = sinon.mock(eventTarget);
		documentMock = sinon.mock(document);
		documentMock.expects("createElement")
			.once().withExactArgs('xml').returns(eventTarget);
		testObject = new CoreJs.Event.Listener();
	});

	afterEach(function () {
		documentMock.verify();
		documentMock.restore();
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


/**
 * AJAX
 */
describe("Ajax", function () {
	CoreJs.Ajax.XHRSystem = sinon.FakeXMLHttpRequest;
	var testObject;
	var documentMock, eventMock, eventTarget;
	
	beforeEach(function () {
		eventTarget = new EventTarget();
		eventMock = sinon.mock(eventTarget);
		documentMock = sinon.mock(document);
		documentMock.expects("createElement").returns(eventTarget);
			
		testObject = new CoreJs.Ajax(
			'post'
			, 'http://itbock.de'
			, {Hello:"World"}
		);
		
	});
	
	afterEach(function () {
		documentMock.restore();
	});
	
	it("#constructor", function () {
		expect(testObject._request)
			.to.be.an.instanceOf(sinon.FakeXMLHttpRequest);
	});
	
	describe("#load", function () {
		it("should open the connection", function() {
			var requestMock = sinon.mock(testObject._request);
			requestMock.expects("setRequestHeader")
				.once()
				.withExactArgs("Content-Type", "application/binary");
			requestMock.expects("open")
				.once()
				.withExactArgs("post", 'http://itbock.de', true);
			requestMock.expects("send")
				.once()
				.withExactArgs({Hello:"World"});
			testObject.load();
			requestMock.verify();
			requestMock.restore();
		});
		
		it("should trigger the load event", function () {
			var spy = eventMock.expects("dispatchEvent").once();
			var event = new CoreJs.Event("load");
			testObject._request.onload(event);
			expect(spy.lastCall.args).to.have.length(1);
			expect(spy.lastCall.args[0]).to.be.an.instanceOf(CoreJs.Ajax.Event);
			expect(spy.lastCall.args[0].type)
				.to.be.equal(CoreJs.Ajax.Event.LOAD);
			expect(spy.lastCall.args[0].detail).to.have.all.keys(["event"]);
			expect(spy.lastCall.args[0].detail.event).to.be.equal(event);
			eventMock.verify();
		});
		
		it("should trigger the progress event", function () {
			var spy = eventMock.expects("dispatchEvent").once();
			var event = new CoreJs.Event("progress");
			testObject._request.onprogress(event);
			expect(spy.lastCall.args).to.have.length(1);
			expect(spy.lastCall.args[0]).to.be.an.instanceOf(CoreJs.Ajax.Event);
			expect(spy.lastCall.args[0].type)
				.to.be.equal(CoreJs.Ajax.Event.PROGRESS);
			expect(spy.lastCall.args[0].detail).to.have.all.keys(["event"]);
			expect(spy.lastCall.args[0].detail.event).to.be.equal(event);
			eventMock.verify();
		});
	});
});