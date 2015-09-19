/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Creator");
use("CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text");

namespace("CoreJs.FileSystem.Loader.Formatter.Network.Creator", function() {
	var Creator = CoreJs.FileSystem.Loader.Formatter.Creator;
	
	/**
	 * The text creator.
	 * Create parsers and formatters for text network resources.
	 * 
	 * @constructor
	 */
	function Text() {
		Creator.call(this);
	}
	Text.prototype = Object.create(Creator.prototype);
	this.Text = Text.prototype.constructor = Text;
	
	/**
	 * Create a response text parser.
	 * 
	 * @param {Object} response - Response detail data.
	 * 
	 * @return {CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkTextParser}
	 */
	Text.prototype.createResponseParser = function(response) {
		return new CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text(
			this, response
		);
	}
});