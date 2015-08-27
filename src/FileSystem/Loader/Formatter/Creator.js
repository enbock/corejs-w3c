/* global namespace, CoreJS */

namespace("CoreJs.FileSystem.Loader.Formatter", function() {
	/**
	 * The creator interface.
	 * The formatter creator build parser or formatter objects.
	 * 
	 * @interface
	 */
	function Creator() {
		Object.call(this);
	}
	Creator.prototype = Object.create(Object.prototype);
	this.Creator = Creator.prototype.constructor = Creator;
	
	/**
	 * Create a response parser.
	 * 
	 * @param {Object} response - Response detail data.
	 * 
	 * @return {CoreJs.Loader.Formatter.Parser}
	 */
	Creator.prototype.createResponseParser = new Function();
});