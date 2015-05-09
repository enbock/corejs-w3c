/* global EventTarget */

/**
 * Main collection of class which are minium require to create the core system.
 * 
 * @author Endre Bock <corejs-w3c@itbock.de>
 */


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
function DOMEventListener()
{
	/**
	 * DOM implementation scope object.
	 * @type {HTMLElement}
	 * @protected
	 */
	this._dom = document.createElement('xml');
}
DOMEventListener.prototype = Object.create(EventTarget.prototype);
DOMEventListener.prototype.constructor = DOMEventListener;

/**
 * The EventTarget.addEventListener() method registers the specified listener
 * on the EventTarget it's called on. The event target may be an Element in a
 * document, the Document itself, a Window, or any other object that supports 
 * events (such as XMLHttpRequest).
 *
 * @param {String} event - The event type.
 * @param {(Function|Object)} listener - Observer object.
 * @param {Boolean}  useCapture - Capture event flag.
 */
DOMEventListener.prototype.addEventListener = 
function(event, listener, useCapture)
{
	this._dom.addEventListener(event, listener, useCapture);
};

/**
 * Removes the event listener previously registered with 
 * EventTarget.addEventListener().
 *
 * @param {String} event - The event type.
 * @param {(Function|Object)} listener - Observer object.
 * @param {Boolean}  useCapture - Capture event flag.
 */
DOMEventListener.prototype.removeEventListener =
function(event, listener, useCapture)
{
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
function(event)
{
	console.log("Dispatch event:", event.type, event);
	this._dom.dispatchEvent(event);
};
