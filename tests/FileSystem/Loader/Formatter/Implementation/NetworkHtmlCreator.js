describe(
	"CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkHtmlCreator"
	, function() {
	
	it("#createResponseParser", function() {
		var node = {Node:""};
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkHtmlCreator();
		testObject.setTarget(node);
		
		var result = testObject.createResponseParser("Data");
		
		result.should.instanceOf(CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkHtmlParser);
		result.creator.should.equal(testObject);
		result.node.should.equal(node);
		result.responseData.should.equal("Data");
	});
});