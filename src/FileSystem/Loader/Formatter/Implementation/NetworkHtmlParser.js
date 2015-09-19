/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextParser");
namespace("CoreJs.FileSystem.Loader.Formatter.Implementation", function() {
	var NetworkTextParser = CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextParser;
	
	/**
	 * The html parser.
	 * Convert the loaded data into string object.
	 * 
	 * @constructor
	 * 
	 * @param {CoreJs.FileSystem.Formatter.Creator} creator - The formatter creator.
	 * @param {HTMLElement} node - The target node.
	 * @param {Object} data - The resource data to parse.
	 */
	function NetworkHtmlParser(creator, node, data) {
		NetworkTextParser.call(this, creator, data);
		this.node = node;
	}
	NetworkHtmlParser.prototype = Object.create(NetworkTextParser.prototype);
	this.NetworkHtmlParser = 
		NetworkHtmlParser.prototype.constructor =
		NetworkHtmlParser;
	
	/**
	 * Parse the data and return the fragment.
	 * 
	 * @see http://www.w3.org/TR/DOM-Parsing/#methods-2
	 * 
	 * @return {HTMLElement}
	 */
	NetworkHtmlParser.prototype.parse = function() {
		var html = NetworkTextParser.prototype.parse.call(this);
		this.node.insertAdjacentHTML("beforeend", html);
		return this.node.lastChild;
	}
});