/* global CoreJs */
/* global EventTarget */
/* global global */

/**
 * Adapting idea of nodejs.
 */
try { module !== undefined; } catch (e) { global = this; module = {}; CoreJs = module.exports = {}; }

/**
 * Main collection of class which are minium require to create the core system.
 * 
 * @author Endre Bock <corejs-w3c@itbock.de>
 */
 

/**
 * Implementation of a event handler.
 * 
 * @constructor
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#eventhandler
 */
function CoreEventHandler() {
	Object.call(this);
}
CoreEventHandler.prototype = Object.create(Object.prototype);
CoreEventHandler.prototype.constructor = CoreEventHandler;
/**
 * Default event handler as event endpoint.
 * 
 * @param {Event}
 */
CoreEventHandler.prototype.handleEvent = function (event) {
};

/**
 * String representation.
 */
CoreEventHandler.prototype.toString = function () {
	return "[Event.Handler]";
};

/**
 * DOM Implementation of event listener and target.
 * The class is mainly a wrapper of an XMLElement to get the DOM event handling
 * implementation available.
 * 
 * Thread-safe: no.
 *
 * @constructor
 * @author Endre Bock <corejs-w3c@itbock.de>
 */
function DOMEventListener() {
	CoreEventHandler.call(this);
	
	/**
	 * DOM implementation scope object.
	 * 
	 * @access protected
	 * @type {HTMLElement}
	 * @default
	 */
	this._dom = DOMEventListener.document.createElement('xml');
}
DOMEventListener.prototype = Object.create(EventTarget.prototype);
module.exports.DOMEventListener =
DOMEventListener.prototype.constructor = DOMEventListener;

DOMEventListener.document = document;

/**
 * @mixin
 */
DOMEventListener.prototype.handleEvent =
Object.create(CoreEventHandler.prototype).handleEvent;

/**
 * The EventTarget.addEventListener() method registers the specified listener
 * on the EventTarget it's called on. The event target may be an Element in a
 * document, the Document itself, a Window, or any other object that supports 
 * events (such as XMLHttpRequest).
 *
 * @param {String}            event     - The event type.
 * @param {(Function|Object)} listener   - Observer object.
 * @param {Boolean}           useCapture - Capture event flag.
 */
DOMEventListener.prototype.addEventListener =
function (event, listener, useCapture) {
	this._dom.addEventListener(event, listener, useCapture);
};

/**
 * Removes the event listener previously registered with 
 * EventTarget.addEventListener().
 *
 * @param {String}            event     - The event type.
 * @param {(Function|Object)} listener   - Observer object.
 * @param {Boolean}           useCapture - Capture event flag.
 */
DOMEventListener.prototype.removeEventListener =
function (event, listener, useCapture) {
	this._dom.removeEventListener(event, listener, useCapture);
};

/**
 * Dispatches an Event at the specified EventTarget, invoking the affected 
 * EventListeners in the appropriate order. The normal event processing rules 
 * (including the capturing and optional bubbling phase) apply to events 
 * dispatched manually with dispatchEvent().
 *
 * @param {CustomEvent} event - Event object to dispatch.
 */
DOMEventListener.prototype.dispatchEvent =
function (event) {
	this._dom.dispatchEvent(event);
};

/**
 * String representation.
 */
DOMEventListener.prototype.toString = function () {
	return "[DOMEventListener]";
};

/**
 * CoreJS events.
 * 
 * @constructor
 * @param {String} typeArg - Is a String representing the name of the event.
 * @param {(Object|String|Number)} [detail] - Data to transport over the event.
 */
function CoreEvent(typeArg, detail) {
	if (detail == undefined) {
		detail = {};
	}
	/**
	 * Error:
	 * Failed to construct 'CustomEvent': Please use the 'new' operator, this 
	 * DOM object constructor cannot be called as a function.
	 * 
	 * In reason of that the browser did not allow to extend CustomEvent in
	 * common way, we use our event class only as constant holder. 
	 */
	return new CustomEvent(typeArg, { detail: detail });
}
CoreEvent.prototype = Object.create(CustomEvent.prototype);
module.exports.Event = CoreEvent.prototype.constructor = CoreEvent;
/** @constant {DOMEventListener} Default event listener system. */
CoreEvent.Listener = DOMEventListener;
/** @constant {EventHandler} Class for event register endpoints. */
CoreEvent.Handler = CoreEventHandler;

/**
 * Asynchronous JavaScript and XML.
 * Wrapper to equalize and simplify the usage for AJAX calls.
 *
 * @constructor
 * @param {String}          method   - Type of request (get, post, put, ...).
 * @param {String}          url      - Request address.
 * @param {(Object|String)} sendData - Data to send.
 */
function Ajax(method, url, sendData) {
	DOMEventListener.call(this);
	
	/**
	 * Request object.
	 *
	 * @access protected
	 * @type {XMLHttpRequest}
	 */
	this._request = new Ajax.XHRSystem();

	/**
	 * Method of the request.
	 *
	 * @access protected 
	 * @type {String}
	 */
	this._method = method;

	/**
	 * Address of request.
	 *
	 * @access protected
	 * @type {String}
	 */
	this._url = url;

	/**
	 * Data to send.
	 *
	 * @access protected
	 * @type {(Object|String)}
	 */
	this._sendData = sendData;
	
	/**
	 * The content type of sending data.
	 * 
	 * @access public
	 * @type {String}
	 */
	this.contentType = "application/binary";

	/**
	 * Context conatiner.
	 * @access private
	 */
	var self = this;
	
	/**
	 * Override onload of XMLHTTPRequest.
	 * Convert callback function into `Event`.
	 */
	this._request.onload = function (event) {
		self.dispatchEvent(
			new Ajax.Event(Ajax.Event.LOAD, {
				response: self._request.response,
				responseText: self._request.responseText,
				responseType: self._request.responseType,
				responseURL: self._request.responseURL,
				responseXML: self._request.responseXML,
				status: self._request.status,
				lengthComputable: event.lengthComputable,
				loaded: event.loaded,
				total: event.total
			})
			);
	};
	
	/**
	 * Override onprogress of XMLHTTPRequest.
	 * Convert callback function into `Event`.
	 */
	this._request.onprogress = function (event) {
		self.dispatchEvent(
			new Ajax.Event(Ajax.Event.PROGRESS, {
				lengthComputable: event.lengthComputable,
				loaded: event.loaded,
				total: event.total
			})
			);
	};
}
Ajax.prototype = Object.create(DOMEventListener.prototype);
module.exports.Ajax = Ajax.prototype.constructor = Ajax;

/**
 * AJAX events.
 * 
 * @constructor
 * @param {String} typeArg - Is a String representing the name of the event.
 * @param {(Object|String|Number)} [detail] - Data to transport over the event.
 */
Ajax.Event = function (typeArg, detail) {
	var event = CoreEvent.call(this, typeArg, detail);
	return event;
};
Ajax.Event.prototype = Object.create(CustomEvent.prototype);
Ajax.Event.prototype.constructor = Ajax.Event;

/** @constant {String} Generic load event type. */
Ajax.Event.LOAD = "Ajax.Load";
/** @constant {String} Generic progress event type. */
Ajax.Event.PROGRESS = "Ajax.Progress";
/** @default XHR implemetion. */
Ajax.XHRSystem = XMLHttpRequest;

/**
 * Factory of ajax objects.
 *
 * @constructor
 * @param {String}          method   - Type of request (get, post, put, ...).
 * @param {String}          url      - Request address.
 * @param {(Object|String)} sendData - Data to send.
 */
Ajax.factory = function(method, url, sendData) {
	return new Ajax(method, url, sendData);
}

/**
 * Execute the opening process.
 */
Ajax.prototype.load = function () {
	this._request.open(this._method, this._url, true);
	// Request header field Content-Type is not allowed by Access-Control-Allow-Headers.
	// Let's think about later on ;)
	//this._request.setRequestHeader("Content-Type", this.contentType);
	this._request.send(this._sendData);
};

/**
 * String representation.
 */
Ajax.prototype.toString = function () {
	return "[Ajax " + this._method + " " + this._url + "]";
};

/**
 * Isolation system.
 * This namespace implementation allows an async loading of use() code.
 * 
 * Usage:
 *     namespace('Test.Implementation', function() {
 *         use('Test.Logger');
 * 
 *         var log = new Test.Logger(); // Use imported class
 *   
 *         log.debug("Create class...");
 *         function UseIt() {};
 *         UseIt.protoType = Object.create(Object.protoType);
 *         this.UseIt = UseIt; // propagate to Test.Implementation.UseIt
 *     });
 * 
 * @param {string}   fullQualifiedNameSpace The name space.
 * @param {Function} contentCall            The action to by apply on context.
 * 
 * @signleton
 */
function namespace(fullQualifiedNameSpace, contentCall) {
	var context = namespace.getContext(fullQualifiedNameSpace);
	
	try {
		contentCall.call(context);
	} catch (error) {
		if (error instanceof TypeError) {
			// some dependencies not loaded yet
			namespace._queue.push(
				{ns: fullQualifiedNameSpace, call: contentCall}
			);
		} else {
			throw error;
		}
	}
}
global.namespace = namespace;
 
/**
 * Load handler.
 * Invoked by use-loading and repeat failed content calls.
 */
namespace.handleEvent = function() {
	var queue = namespace._queue
	, i
	, entry
	;
	namespace._queue = [];
	for(i in queue) {
		entry = queue[i];
		namespace(entry.ns, entry.call);
	}  
}
namespace._queue = [];
 
/**
 * Get the context for a namespace.
 * 
 * @param {string}   fullQualifiedNameSpace The name space.
 * 
 * @return {Function}
 */
namespace.getContext = function(fullQualifiedNameSpace) {
	var context = use.context
		, domains = fullQualifiedNameSpace.split(use.classPathDelimiter)
		, domain
		, i
	;
	for(i in domains) {
		domain = domains[i];
		if (!context.hasOwnProperty(domain)) {
			context[domain] = new Function();
		}
		context = context[domain];
	}
	
	return context;
}

/**
 * Auto load system.
 * 
 * @signleton
 */
function use(fullQualifiedClassName) {
	var container = use.getContainer(fullQualifiedClassName);
	
	if (container._loader === null) {
		container._loader = Ajax.factory(
			"get", container._path + use.fileExtension
		);
		container._loader.addEventListener(Ajax.Event.LOAD, function(event) {
			// Load into script ram
			container._class = new Function(event.detail.responseText);
			// Import into context
			var domains = fullQualifiedClassName.split(use.classPathDelimiter);
			domains.pop();
			container._class.call(
				namespace.getContext(domains.join(use.classPathDelimiter))
			);
		});
		container._loader.addEventListener(
			Ajax.Event.LOAD, namespace.handleEvent
		);
		container._loader.load();
	}
}
global.use = use;
/**
 * Context for program code.
 */
use.context  = global;
/**
 * The FQCN and FQNS delimiter character.
 */
use.classPathDelimiter = ".";
/**
 * File extension for class files.
 */
use.fileExtension      = ".js";
/**
 * The base path for not configured classes.
 */
use.basePath = ".";
/**
 * Path configs.
 */
use._psr4 = {};

/**
 * Set the path for a psr-4.
 * 
 * @param {string} psr4Name Namespace.
 * @param {string} path     Path to namespace directory.
 */
use.psr4 = function(psr4Name, path) {
	var container = use._psr4
		, i
		, domains
		, domain
		, name = psr4Name
	;
	
	if (psr4Name.indexOf(use.classPathDelimiter) > 0) {
		domains = psr4Name.split(use.classPathDelimiter);
		name    = domains.pop();
		for(i in domains) {
			domain = domains[i];
			if(!container.hasOwnProperty(domain)) {
				container[domain] = {};
			}
			container = container[domain];
		}
	}
	container[name] = {
		_path: path
		, _class: null
		, _loader: null
	};
}

/**
 * Get container of class.
 * 
 * @param {string} fullQualifiedClassName The psr-4 class name.
 */
use.getContainer = function(fullQualifiedClassName) {
	var container = use._psr4
		, domains = fullQualifiedClassName.split(use.classPathDelimiter)
		, domain
		, i
		, path = use.basePath
	;
	
	for(i in domains) {
		domain = domains[i];
		if(container.hasOwnProperty(domain)) {
			// find last point
			if (container[domain].hasOwnProperty("_path")) {
				path = container[domain]._path;
			}
		} else {
			// extend the path
			path += "/" + domain;
			container[domain] = {
				_path: path
				, _class: null
				, _loader: null
			}
		}
		container = container[domain];
	}
	return container;
}
