use("CoreJs.FileSystem.Loader");

/* global namespace, use, CoreJs */
namespace("CoreJs.FileSystem.Loader", function() {
	/**
	 * The network loader.
	 * Loads a file from the internet resources.
	 * 
	 * @param {CoreJs.Ajax} request The configured resouces request object.
	 * @param {CoreJs.FileSystem.Loader.Formatter.Creator} creator The formatter and parser creator.
	 * 
	 * @constructor
	 */
	function Network(request, creator) {
		CoreJs.FileSystem.Loader.call(this);
		
		this.ajax    = request;
		this.creator = creator;
	}
	Network.prototype = Object.create(CoreJs.FileSystem.Loader.prototype);
	this.Network = Network.prototype.constructor = Network;
	
	/**
	 * String conversion.
	 */
	Network.prototype.toString = function() {
		return "[CoreJs.FileSystem.Loader.Network]";
	}
	
	/**
	 * Initiate the load process.
	 */
	Network.prototype.load = function() {
		this.ajax.addEventListener(CoreJs.Ajax.Event.LOAD, this);
		this.ajax.load();
	}

	/**
	 * Handle the event.
	 */
	Network.prototype.handleEvent = function(event) {
		switch (event.type) {
			case CoreJs.Ajax.Event.LOAD:
				this.ajax.removeEventListener(CoreJs.Ajax.Event.LOAD, this);
				this.onLoaded(event.detail);
			break;
		}
	}
	
	/**
	 * Convert the loaded data.
	 * Send the `CoreJs.FileSystem.Loader.Event.LOAD` event with the result
	 * data.
	 * 
	 * @event CoreJs.FileSystem.Loader.Network#CoreJs.FileSystem.Loader.Event.LOAD
	 */
	Network.prototype.onLoaded = function(resouce) {
		var result = this.creator.createResponseParser(resouce).parse();
		var loadEvent = new CoreJs.FileSystem.Loader.Event(
			CoreJs.FileSystem.Loader.Event.LOAD, {data: result}
		);
		this.dispatchEvent(loadEvent);
	}
});