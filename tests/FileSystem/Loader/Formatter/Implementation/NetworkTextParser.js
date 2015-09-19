describe(
	"CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextParser",
	function() {
	
	it("#parse", function() {
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextParser(
			null
			, {
				responseText: "The text."
			}
		);
		
		testObject.parse().should.equal("The text.");
	});
});