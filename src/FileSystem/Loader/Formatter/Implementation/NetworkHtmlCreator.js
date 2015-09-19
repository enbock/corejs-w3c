/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Creator");

namespace("CoreJs.FileSystem.Loader.Formatter.Implementation", function() {
	/**
	 * The html creator.
	 * Create parsers and formatters for html network resources.
	 * 
	 * @constructor
	 */
	function NetworkHtmlCreator() {
		CoreJs.FileSystem.Loader.Formatter.Creator.call(this);
		this.node = null;
	}
	NetworkHtmlCreator.prototype = 
		Object.create(CoreJs.FileSystem.Loader.Formatter.Creator.prototype);
	this.NetworkHtmlCreator = 
		NetworkHtmlCreator.prototype.constructor = NetworkHtmlCreator;
	
	/**
	 * Define the target node.
	 * 
	 * @param {HTMLElement} node - The target node.
	 */
	NetworkHtmlCreator.prototype.setTarget = function(node) {
		this.node = node;
	}
	
	/**
	 * Create a html parser.
	 * 
	 * @param {Object} response - Response detail data.
	 * 
	 * @return {CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkHtmlParser}
	 */
	NetworkHtmlCreator.prototype.createResponseParser = function(response) {
		return new CoreJs.FileSystem.Loader.Formatter.Implementation
			.NetworkHtmlParser(this, this.node, response);
	}
});