describe(
	"CoreJs.FileSystem.Loader.Formatter.Network.Creator.Text",
	function() {
	
	it("#createResponseParser", function() {
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Network.Creator.Text();
		
		var result = testObject.createResponseParser("Data");
		
		result.should.instanceOf(CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text);
		result.creator.should.equal(testObject);
		result.responseData.should.equal("Data");
	});
});