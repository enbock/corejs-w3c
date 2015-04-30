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
 * @constructor
 * @author Endre Bock <corejs-w3c@itbock.de>
 */
function DOMEventListener()
{
	/**
	 * DOM implementation scope object.
	 * @type {HTMLElement}
	 * @private
	 */
	var _dom = document.createElement('xml');
	_dom['scope'] = this;

	/**
	 * Use DOM implementation.
	 *
	 * @param event
	 * @param listener
	 * @param useCapture
	 */
	this.addEventListener = function(event, listener, useCapture)
	{
		_dom.addEventListener(event, listener, useCapture);
	};

	/**
	 * Use DOM implementation.
	 *
	 * @param event
	 * @param listener
	 * @param useCapture
	 */
	this.removeEventListener = function(event, listener, useCapture)
	{
		_dom.removeEventListener(event, listener, useCapture);
	};

	/**
	 * Use DOM implementation.
	 *
	 * @param event
	 */
	this.dispatchEvent = function(event)
	{
		console.log("Dispatch event:", event.type, event);
		_dom.dispatchEvent(event);
	};
}
DOMEventListener.prototype = Object.create(EventTarget.prototype);
DOMEventListener.prototype.constructor = DOMEventListener;
