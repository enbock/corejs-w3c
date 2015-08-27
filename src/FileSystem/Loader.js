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
	Loader.prototype = Object.create(CoreJs.Event.Listener);
	this.Loader = Loader.prototype.constructor = Loader;

	Loader.Event = CoreJs.Event;
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