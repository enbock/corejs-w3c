/* global namespace, CoreJS */
use("CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text");
namespace("CoreJs.FileSystem.Loader.Formatter.Network.Parser", function() {
	var Text = CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text;
	
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
	function Html(creator, node, data) {
		Text.call(this, creator, data);
		this.node = node;
	}
	Html.prototype = Object.create(Text.prototype);
	this.Html = Html.prototype.constructor = Html;
	
	/**
	 * Parse the data and return the fragment.
	 * 
	 * @see http://www.w3.org/TR/DOM-Parsing/#methods-2
	 * 
	 * @return {HTMLElement}
	 */
	Html.prototype.parse = function() {
		var html = Text.prototype.parse.call(this);
		this.node.insertAdjacentHTML("beforeend", html);
		return this.node.lastChild;
	}
});