describe(
	"CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkHtmlParser",
	function() {
	
	it("#parse", function() {
		var node = {
			lastChild: null
			, insertAdjacentHTML: function(position, html) {
				this.lastChild = html;
				position.should.equal("beforeend");
			}
		}
		var testObject = new CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html(
			null
			, node
			, {
				responseText: "The html."
			}
		);
		
		testObject.parse().should.equal("The html.");
	});
});