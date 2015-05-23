/* global sinon */
/* global expect */
/* global CoreJs */
/* global DOMEventListener */
/* global EventTarget */
/* global global, describe, beforeEach, afterEach, it */

/**
 * Base event functionality.
 */
describe("Event", function () {
	it("#constructor", function () {
		var testObject = new CoreJs.Event("testEvent", "Detail");
		expect(testObject.type).is.equal("testEvent");
		expect(testObject.detail).is.equal("Detail");
		testObject = new CoreJs.Event("testEvent");
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
	var sandbox;
	var fakeDocument = {
		createElement: function () { }
	};
	var save = {};

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		save.document = CoreJs.DOMEventListener.document;
		CoreJs.DOMEventListener.document = fakeDocument;
	
		eventTarget = new EventTarget();
		console.log(eventTarget);
		domMock = sandbox.mock(eventTarget);
		documentMock = sandbox.mock(fakeDocument);
		documentMock.expects("createElement")
			.once().withExactArgs('xml').returns(eventTarget);
		testObject = new CoreJs.Event.Listener();
	});

	afterEach(function () {
		documentMock.verify();
		sandbox.restore();
		CoreJs.DOMEventListener.document = save.document;
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
	var testObject;
	var documentMock, eventMock, eventTarget;
	var sandbox;
	var fakeDocument = {
		createElement: function () { }
	};
	var save = {};

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		save.xhr = CoreJs.Ajax.XHRSystem;
		CoreJs.Ajax.XHRSystem = sinon.FakeXMLHttpRequest;
		save.document = CoreJs.DOMEventListener.document;
		CoreJs.DOMEventListener.document = fakeDocument;
		
		eventTarget = new EventTarget();
		eventMock = sandbox.mock(eventTarget);
		documentMock = sandbox.mock(fakeDocument);
		documentMock.expects("createElement").returns(eventTarget);
			
		testObject = new CoreJs.Ajax(
			'post'
			, 'http://itbock.de'
			, {Hello:"World"}
		);
	});

	afterEach(function () {
		sandbox.restore();
		CoreJs.Ajax.XHRSystem = save.xhr;
		CoreJs.DOMEventListener.document = save.document;
	});

	it("#constructor", function () {
		expect(testObject._request)
			.to.be.an.instanceOf(sinon.FakeXMLHttpRequest);
	});

	describe("#load", function () {
		it("should open the connection", function () {
			var requestMock = sinon.mock(testObject._request);
			requestMock.expects("setRequestHeader")
				.once()
				.withExactArgs("Content-Type", "application/binary");
			requestMock.expects("open")
				.once()
				.withExactArgs("post", 'http://itbock.de', true);
			requestMock.expects("send")
				.once()
				.withExactArgs({ Hello: "World" });
			testObject.load();
			requestMock.verify();
			requestMock.restore();
		});

		it("should trigger the load event", function () {
			var spy = eventMock.expects("dispatchEvent").once();
			testObject._request.response = 1;
			testObject._request.responseText = 2;
			testObject._request.responseType = 3;
			testObject._request.responseURL = 4;
			testObject._request.responseXML = 5;
			testObject._request.status = 6;

			testObject._request.onload({
				lengthComputable: true
				, loaded: 100
				, total: 100
			});

			expect(spy.lastCall.args).to.have.length(1);
			expect(spy.lastCall.args[0]).to.be.an.instanceOf(CustomEvent);
			expect(spy.lastCall.args[0].type)
				.to.be.equal(CoreJs.Ajax.Event.LOAD);
			expect(spy.lastCall.args[0].detail).to.have.all.keys([
				"response"
				, "responseText"
				, "responseType"
				, "responseURL"
				, "responseXML"
				, "status"
				, "lengthComputable"
				, "loaded"
				, "total"
			]);
			expect(spy.lastCall.args[0].detail.response).to.be.equal(1);
			expect(spy.lastCall.args[0].detail.responseText).to.be.equal(2);
			expect(spy.lastCall.args[0].detail.responseType).to.be.equal(3);
			expect(spy.lastCall.args[0].detail.responseURL).to.be.equal(4);
			expect(spy.lastCall.args[0].detail.responseXML).to.be.equal(5);
			expect(spy.lastCall.args[0].detail.status).to.be.equal(6);
			expect(spy.lastCall.args[0].detail.lengthComputable).is.true;
			expect(spy.lastCall.args[0].detail.loaded).is.equal(100);
			expect(spy.lastCall.args[0].detail.total).is.equal(100);
			eventMock.verify();
		});

		it("should trigger the progress event", function () {
			var spy = eventMock.expects("dispatchEvent").once();
			var event = {
				lengthComputable: true
				, loaded: 10
				, total: 100
			};

			testObject._request.onprogress(event);

			expect(spy.lastCall.args).to.have.length(1);
			expect(spy.lastCall.args[0]).to.be.an.instanceOf(CustomEvent);
			expect(spy.lastCall.args[0].type)
				.to.be.equal(CoreJs.Ajax.Event.PROGRESS);
			console.log(spy.lastCall.args[0].detail);
			expect(spy.lastCall.args[0].detail.lengthComputable).is.true;
			expect(spy.lastCall.args[0].detail.loaded).is.equal(10);
			expect(spy.lastCall.args[0].detail.total).is.equal(100);
			eventMock.verify();
		});
	});
});
