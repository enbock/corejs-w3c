/* global global */
/**
 * DOM stack
 */
global.document = {
	createElement: function () { }
};
global.CustomEvent = function (type, init) {
	this.type = type;
	/** https://developer.mozilla.org/en-US/docs/Web/API/Event/detail */
	this.detail = init instanceof Object ? init.detail : undefined;
};
global.CustomEvent.prototype.addEventListener = function () { };
global.CustomEvent.prototype.removeEventListener = function () { };
global.CustomEvent.prototype.dispatchEvent = function () { };
global.EventTarget = global.CustomEvent;
global.XMLHttpRequest = function () { };
global.FormData = function () { };