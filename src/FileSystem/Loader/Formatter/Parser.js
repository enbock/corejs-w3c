/* global namespace, CoreJS */

namespace("CoreJs.FileSystem.Loader.Formatter", function() {
	/**
	 * The resource parser.
	 * Convert the loaded data into data transaction or native objects.
	 * 
	 * @interface
	 * 
	 * @param {CoreJs.FileSystem.Formatter.Creator} creator - The formatter creator.
	 * @param {Object} data - The data to format/parse.
	 */
	function Parser(creator, data) {
		Object.call(this);
	}
	Parser.prototype = Object.create(Object.prototype);
	this.Parser = Parser.prototype.constructor = Parser;
	
	/**
	 * Parse the data and return the result.
	 * 
	 * @return {Object}
	 */
	Parser.prototype.parse = new Function();
});