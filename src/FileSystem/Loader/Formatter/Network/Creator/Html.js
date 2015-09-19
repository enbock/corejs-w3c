/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Creator");
use("CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html");

namespace("CoreJs.FileSystem.Loader.Formatter.Network.Creator", function() {
	var Creator = CoreJs.FileSystem.Loader.Formatter.Creator;
	
	/**
	 * The html creator.
	 * Create parsers and formatters for html network resources.
	 * 
	 * @constructor
	 */
	function Html() {
		Creator.call(this);
		this.node = null;
	}
	Html.prototype = Object.create(Creator.prototype);
	this.Html = Html.prototype.constructor = Html;
	
	/**
	 * Define the target node.
	 * 
	 * @param {HTMLElement} node - The target node.
	 */
	Html.prototype.setTarget = function(node) {
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
	Html.prototype.createResponseParser = function(response) {
		return new CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html(
			this, this.node, response
		);
	}
});