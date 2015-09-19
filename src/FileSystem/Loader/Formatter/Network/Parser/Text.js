/* global namespace, CoreJS */

namespace("CoreJs.FileSystem.Loader.Formatter.Network.Parser", function() {
	/**
	 * The text resource parser.
	 * Convert the loaded data into string object.
	 * 
	 * @constructor
	 * 
	 * @param {CoreJs.FileSystem.Formatter.Creator} creator - The formatter creator.
	 * @param {Object} data - The resource data to parse.
	 */
	function Text(creator, data) {
		Object.call(this);
		this.creator = creator;
		this.responseData = data;
	}
	Text.prototype = Object.create(Object.prototype);
	this.Text = Text.prototype.constructor = Text;
	
	/**
	 * Parse the data and return the text.
	 * 
	 * @return {String}
	 */
	Text.prototype.parse = function() {
		return new String(this.responseData.responseText);
	}
});