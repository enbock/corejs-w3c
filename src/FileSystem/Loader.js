/* global namespace, use, CoreJs */
namespace("CoreJs.FileSystem", function() {
	/**
	 * The loader gets data from the file system.
	 * The word "File System" is here more wide to understand. The file system
	 * is all which contains files or kind of files. Also internet resouces
	 * are a file system.
	 * 
	 * @interface
	 */
	function Loader() {
		CoreJs.Event.Listener.call(this);
	}
	Loader.prototype = Object.create(CoreJs.Event.Listener.prototype);
	this.Loader = Loader.prototype.constructor = Loader;
	
	/**
	 * The loader event.
	 */
	Loader.Event = function (typeArg, detail) {
		return CoreJs.Event.call(this, typeArg, detail);
	}
	Loader.Event.prototype = Object.create(CoreJs.Event.prototype);
	Loader.Event.prototype.constructor = Loader.Event;
	/**
	 * The loaded event.
	 * Contains in `detail.data` the loaded content.
	 */	
	Loader.Event.LOAD = "FileSystem.Loaded";
	
	/**
	 * Initiate the load process.
	 */
	Loader.prototype.load = new Function();
});