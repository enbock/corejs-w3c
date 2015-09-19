/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Creator");

namespace("CoreJs.FileSystem.Loader.Formatter.Implementation", function() {
	/**
	 * The text creator.
	 * Create parsers and formatters for text network resources.
	 * 
	 * @constructor
	 */
	function NetworkTextCreator() {
		CoreJs.FileSystem.Loader.Formatter.Creator.call(this);
	}
	NetworkTextCreator.prototype = 
		Object.create(CoreJs.FileSystem.Loader.Formatter.Creator.prototype);
	this.NetworkTextCreator = 
		NetworkTextCreator.prototype.constructor = NetworkTextCreator;
	
	/**
	 * Create a response text parser.
	 * 
	 * @param {Object} response - Response detail data.
	 * 
	 * @return {CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkTextParser}
	 */
	NetworkTextCreator.prototype.createResponseParser = function(response) {
		return new CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkTextParser(this, response);
	}
});