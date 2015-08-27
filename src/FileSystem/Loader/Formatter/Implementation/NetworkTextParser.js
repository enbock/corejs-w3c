/* global namespace, CoreJS */

namespace("CoreJs.FileSystem.Loader.Formatter.Implementation", function() {
	/**
	 * The text resource parser.
	 * Convert the loaded data into string object.
	 * 
	 * @constructor
	 * 
	 * @param {CoreJs.FileSystem.Formatter.Creator} creator - The formatter creator.
	 * @param {Object} data - The resource data to parse.
	 */
	function NetworkTextParser(creator, data) {
		Object.call(this);
		this.creator = creator;
		this.responseData = data;
	}
	NetworkTextParser.prototype = Object.create(Object.prototype);
	this.NetworkTextParser = NetworkTextParser.prototype.constructor = NetworkTextParser;
	
	/**
	 * Parse the data and return the text.
	 * 
	 * @return {String}
	 */
	NetworkTextParser.prototype.parse = function() {
		return new String(this.responseData.responseText);
	}
});