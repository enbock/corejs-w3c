describe(
	"CoreJs.FileSystem.Loader.Formatter.Network.Creator.Html"
	, function() {
	
	it("#createResponseParser", function() {
		var node = {Node:""};
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Network.Creator.Html();
		testObject.setTarget(node);
		
		var result = testObject.createResponseParser("Data");
		
		result.should.instanceOf(CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html);
		result.creator.should.equal(testObject);
		result.node.should.equal(node);
		result.responseData.should.equal("Data");
	});
});