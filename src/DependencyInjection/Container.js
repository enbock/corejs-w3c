/* global namespace, use, CoreJs */
namespace("CoreJs.DependencyInjection", function() {
	
	/**
	 * DI container.
	 *
	 * @constructor
	 *
	 * @param {Object} config Service config.
	 */
	function Container(config) {
		CoreJs.Event.Listener.call(this);
	
		this.config   = config;
		this.services = {};
	}
	Container.prototype = Object.create(CoreJs.Event.Listener.prototype);
	this.Container = Container.prototype.constructor = Container;
	
	/**
	 * Preload all the classes.
	 */
	Container.prototype.load = function() {
		var i;
		for(i in this.config.services) {
			use(this.config.services[i].class);
		}
	}
	
	/**
	 * Create and get a service.
	 *
	 * @param {String} name The service name.
	 *
 	 * @return {Object} The service object.
	 */
	Container.prototype.get = function(name) {
		var i;
		
		if (this.services[name]) {
			return this.services[name];
		}
		var cfg = this.config.services[name];
	
		if(! cfg.hasOwnProperty("arguments")) {
			cfg.arguments = [];
		}
	
		for(i in cfg.arguments) {
			var argument = cfg.arguments[i];
			if (
				(typeof argument === "string" || argument instanceof String)
			) {
				if(argument.indexOf("@") === 0) {
					cfg.arguments[i] = this.get(argument.replace("@", ""));
				}
				if(argument.indexOf("$") === 0) {
					cfg.arguments[i] = (new Function(
						"return this." + argument.replace("$", "") + ";"
					)).call(use.context);
				}
			}
		}
	
		// Find class object.
		var classPath = cfg.class.split(use.classPathDelimiter);
		var classObject = use.context;
		for(i in classPath) {
			classObject = classObject[classPath[i]];
		}
	
		// create instance and inject it
		var service = Object.create(classObject.prototype);
		classObject.apply(service, cfg.arguments);
	
		if(!cfg.hasOwnProperty("forceCreate") && cfg.forceCreate !== true) {
			// buffer the service
			this.services[name] = service;
		}
	
		return service;
	};
	
	/**
	 * Set an external instance to container.
	 *
	 * @param {String} name     Name of service.
	 * @param {Object} instance External instance.
	 */
	Container.prototype.set = function(name, instance) {
		this.services[name] = instance;
	};
	
});