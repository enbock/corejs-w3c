describe(
	"CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextCreator",
	function() {
	
	it("#createResponseParser", function() {
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextCreator();
		
		var result = testObject.createResponseParser("Data");
		
		result.should.instanceOf(CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkTextParser);
		result.creator.should.equal(testObject);
		result.responseData.should.equal("Data");
	});
});