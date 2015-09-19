/* global assert, it, afterEach, beforeEach, describe */
use("CoreJs.FileSystem.Loader.Formatter.Creator");

describe("CoreJs.FileSystem.Loader.Network", function() {
	var request, creator, testObject;
	
	beforeEach(function() {
		request = new CoreJs.Ajax();
		creator = new CoreJs.FileSystem.Loader.Formatter.Creator();
		testObject = new CoreJs.FileSystem.Loader.Network(request, creator);
	});
	
	it("#toString", function() {
		String(testObject).should.equal("[CoreJs.FileSystem.Loader.Network]");
	});
	
	it("#load", function() {
		var requestMock = sinon.mock(request);
		
		requestMock.expects("addEventListener").once()
			.withExactArgs(CoreJs.Ajax.Event.LOAD, testObject);
		requestMock.expects("load").once();
		
		testObject.load();
	});
	
	it("#handleEvent, #onLoaded", function(done) {
		var requestMock = sinon.mock(request);
		var creatorMock = sinon.mock(creator);
		var resource = {Resource:""};
		var event = new CoreJs.Event(
			CoreJs.Ajax.Event.LOAD,
			resource
		);
		
		requestMock.expects("removeEventListener").once()
			.withExactArgs(CoreJs.Ajax.Event.LOAD, testObject);
		creatorMock.expects("createResponseParser").once()
			.withExactArgs(resource)
			.returns({parse: function() { return "Result"; }});
	
		testObject.addEventListener(
			CoreJs.FileSystem.Loader.Event.LOAD,
			function(event) {
				event.detail.data.should.equal("Result");
				done();
			}
		)
		testObject.handleEvent(event);
	});
});
