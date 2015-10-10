/* global sinon, assert */
/* global expect */
/* global CoreJs */
/* global DOMEventListener */
/* global EventTarget */
/* global global, describe, beforeEach, afterEach, it */
/* global namespace, use */

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
	
	it("#toString", function() {
		expect(String(testObject)).is.equal('[DOMEventListener]');
	});
});

/**
 * Core Handler
 */
describe("Event.Handler", function() {
	var testObject;
	it("#handleEvent", function() {
		testObject = new CoreJs.Event.Handler();
		testObject.handleEvent("The test event");
	});
	it("#toString", function() {
		testObject = new CoreJs.Event.Handler();
		expect(String(testObject)).is.equal('[Event.Handler]');
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
	var testData = {Hello:"World"};

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
			
		testObject = CoreJs.Ajax.factory(
			'post'
			, 'http://itbock.de'
			, testData
		);
	});

	afterEach(function () {
		sandbox.restore();
		CoreJs.Ajax.XHRSystem = save.xhr;
		CoreJs.DOMEventListener.document = save.document;
	});
	
	it("#factory", function() {
		expect(testObject).to.be.an.instanceOf(CoreJs.Ajax);
		expect(testObject._method).is.equal("post");
		expect(testObject._url).is.equal("http://itbock.de");
		expect(testObject._sendData).is.equal(testData);
	});

	it("#constructor", function () {
		expect(testObject._request)
			.to.be.an.instanceOf(sinon.FakeXMLHttpRequest);
	});
	
	it("#tostring", function () {
		expect(String(testObject)).is.equal("[Ajax post http://itbock.de]");
	});

	describe("#load", function () {
		it("should open the connection", function () {
			var requestMock = sinon.mock(testObject._request);
			/*
			requestMock.expects("setRequestHeader")
				.once()
				.withExactArgs("Content-Type", "application/binary");
			*/
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
			expect(spy.lastCall.args[0].detail.lengthComputable).is.true;
			expect(spy.lastCall.args[0].detail.loaded).is.equal(10);
			expect(spy.lastCall.args[0].detail.total).is.equal(100);
			eventMock.verify();
		});
	});
});

/**
 * namespace tests
 */
describe("namespace", function() {
	it("#add to queue", function() {
		var mock    = sinon.mock();
		var context = new Function();
		var error   = new TypeError();
		use.context = context;
		mock.throws(error);
			
		namespace("Test", mock);
		
		mock.should.called;
		assert.deepEqual(
			namespace._queue
			, [{ns:"Test", call:mock, lastError: error}]
		);
		context.should.include.keys("Test");
	});
	
	it("#pass through errors", function() {
		var mock    = sinon.mock();
		var context = new Function();
		var error   = new Error("soso");
		
		use.context = context;
		mock.throws(error);
			
		try {
			namespace("Test2", mock);
		} catch (e) {
			e.should.equal(error);
		}
		
		mock.should.called;
		assert.deepEqual(namespace._queue, []);
		context.should.include.keys("Test2");
	});
	
	it("#handleEvent", function() {
		var mock    = sinon.mock();
		var error   = new TypeError();
		
		mock.onFirstCall().throws(error);
		mock.atLeast(2);
		namespace._queue = [{ns:"Test", call:mock, lastError: error}];
		
		namespace.handleEvent();
		
		mock.should.called;
	});
	
	it("#handleEvent in endless loop", function() {
		var mock    = sinon.mock();
		var error   = new TypeError();

		mock.throws(error);
		mock.atLeast(2);
		namespace._queue = [{ns:"Test", call:mock, lastError: error}];
		
		expect(function() { namespace.handleEvent(null, 98); }).to.throw(error);
		
		mock.should.called;
	});
	
	afterEach(function() {
		use.context      = new Function();
		namespace._queue = [];
	});
});

/**
 * Auto loader tests
 */
describe("use", function() {
	it("#load file", function() {
		var orgFact = CoreJs.Ajax.factory;
		var eventTarget = {
			addEventListener: new Function()
			, load: new Function()
		};
		sinon.stub(eventTarget);
		var factory     = sinon.mock();
		var contextStub = sinon.stub(namespace, "getContext");
		var context     = new Function();
		
		factory.onCall(0).returns(eventTarget);
		contextStub.onCall(0).returns(context);
		CoreJs.Ajax.factory = factory;
		
		eventTarget.addEventListener.callsArgWith(
			1, {detail: {responseText: "this.func = 'test';"}}
		);
		
		use.psr4("Use.Test", "http://itbock.de");
		use._psr4.should.include.keys("Use");
		use._psr4.Use.should.include.keys("Test");
		assert.deepEqual(
			{_class: null, _loader: null, _path: "http://itbock.de"},
			use._psr4.Use.Test
		);
		
		use("Use.Test.Space");
		
		CoreJs.Ajax.factory.should.been.calledWithExactly(
			"get", "http://itbock.de/Space.js"
		)
		contextStub.should.been.calledWithExactly("Use.Test");
		context.should.include.keys("func");
		context.func.should.equal("test");
		eventTarget.addEventListener.should.been.calledWith("Ajax.Load");
		eventTarget.addEventListener.should.been.calledWithExactly(
			"Ajax.Load", namespace.handleEvent
		);
		use._psr4.Use.Test.should.include.keys("Space");
		assert.equal(use._psr4.Use.Test.Space._path, "http://itbock.de/Space");
		use._psr4.Use.Test.Space._class.should.be.instanceOf(Function);
		use._psr4.Use.Test.Space._loader.should.equal(eventTarget);
		CoreJs.Ajax.factory = orgFact;
		contextStub.restore();
	});
	
	it("#load into existing namespace", function() {
		var eventTarget = {
			addEventListener: new Function()
			, load: new Function()
		}
		sinon.stub(eventTarget);
		var factory      = sinon.mock();
		var contextStub  = sinon.stub(namespace, "getContext");
		var context      = new Function();
		context.Space    = new Function();
		var extraContext = context.Space.Extra = {will: "be hold"};
		
		factory.onCall(0).returns(eventTarget);
		contextStub.onCall(0).returns(context);
		CoreJs.Ajax.factory = factory;
		
		eventTarget.addEventListener.callsArgWith(
			1
			, {
				detail: {
					responseText: "this.Space = function() { var test = 1; };"
				}
			}
		);
		
		use.psr4("Use.Test", "http://itbock.de");
		
		use("Use.Test.Space");
		
		context.Space.Extra.should.equal(extraContext);
		contextStub.restore();
	});
	
	it("#load into conflicting namespace", function() {
		var eventTarget = {
			addEventListener: new Function()
			, load: new Function()
		}
		sinon.stub(eventTarget);
		var factory      = sinon.mock();
		var contextStub  = sinon.stub(namespace, "getContext");
		var context      = new Function();
		context.Space    = new Function();
		context.Space.Extra = {will: "be hold"};
		
		factory.onCall(0).returns(eventTarget);
		contextStub.onCall(0).returns(context);
		CoreJs.Ajax.factory = factory;
		
		eventTarget.addEventListener.callsArgWith(
			1
			, {
				detail: {
					responseText: 
						"this.Space = function() { var test = 1; };"
						+ "this.Space.Extra = 'conflicted';"
				}
			}
		);
		
		use.psr4("Use.Test", "http://itbock.de");
		
		expect(function() {use("Use.Test.Space");}).to.throw(Error);
		
		context.Space.Extra.should.equal('conflicted'); // not restored
		contextStub.restore();
	});
	
	it("#load with existing namespace into unknown place", function() {
		var eventTarget = {
			addEventListener: new Function()
			, load: new Function()
		}
		sinon.stub(eventTarget);
		var factory      = sinon.mock();
		var contextStub  = sinon.stub(namespace, "getContext");
		var context      = new Function();
		context.Space    = new Function();
		var extraContext = context.Space.Extra = {will: "be hold"};
		
		factory.onCall(0).returns(eventTarget);
		contextStub.onCall(0).returns(context);
		CoreJs.Ajax.factory = factory;
		
		eventTarget.addEventListener.callsArgWith(
			1
			, {
				detail: {
					responseText: "this.func = function() { var test = 1; };"
				}
			}
		);
		
		use.psr4("Use.Test", "http://itbock.de");
		
		use("Use.Test.Space");
		
		context.should.include.keys("func");
		context.Space.Extra.should.equal(extraContext);
		contextStub.restore();
	});
 });