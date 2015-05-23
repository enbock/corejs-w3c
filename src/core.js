/* global CoreJs */
/* global EventTarget */

/**
 * Adapting idea of nodejs.
 */
 try { module !== undefined; } catch (e) {
	// import module into current context(window)
	module = {};
	CoreJs = module.exports = {};
 }

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
function CoreEventHandler()
{
	Object.call(this);
}
CoreEventHandler.prototype = Object.create(Object.prototype);
CoreEventHandler.prototype.constructor = CoreEventHandler;
/**
 * Default event handler as event endpoint.
 * 
 * @param {Event}
 */
CoreEventHandler.prototype.handleEvent = function(event) {
	console.log("Event.Handler::handleEvent:", event);
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
	this._dom = document.createElement('xml');
}
DOMEventListener.prototype = Object.create(EventTarget.prototype);
module.exports.DOMEventListener = 
DOMEventListener.prototype.constructor = DOMEventListener;
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
	console.log("Dispatch event:", event.type, event);
	this._dom.dispatchEvent(event);
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
	CustomEvent.call(this, typeArg, {detail: detail});
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
			new Ajax.Event(Ajax.Event.LOAD, {event: event})
		);
	};
	
	/**
	 * Override onprogress of XMLHTTPRequest.
	 * Convert callback function into `Event`.
	 */
	this._request.onprogress = function (event) {
		self.dispatchEvent(
			new Ajax.Event(Ajax.Event.PROGRESS, {event: event})
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
Ajax.Event = function(typeArg, detail) { 
	CoreEvent.call(this, typeArg, detail);
};
Ajax.Event.prototype = Object.create(CoreEvent.prototype);
Ajax.Event.prototype.constructor = Ajax.Event;

/** @constant {String} Generic load event type. */
Ajax.Event.LOAD = "Ajax.Load";
/** @constant {String} Generic progress event type. */
Ajax.Event.PROGRESS = "Ajax.Progress";
/** @default XHR implemetion. */
Ajax.XHRSystem = XMLHttpRequest;

/**
 * Execute the opening process.
 */
Ajax.prototype.load = function () {
	this._request.open(this._method, this._url, true);
	this._request.setRequestHeader("Content-Type", this.contentType);
	this._request.send(this._sendData);
};
