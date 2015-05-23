/* global global */
/**
 * DOM stack
 */
global.document = {
	createElement: function () { }
};
global.EventTarget = function () { };
global.EventTarget.prototype.addEventListener = function () { };
global.EventTarget.prototype.removeEventListener = function () { };
global.EventTarget.prototype.dispatchEvent = function () { };
global.CustomEvent = function (type, init) {
	this.type = type;
	/** https://developer.mozilla.org/en-US/docs/Web/API/Event/detail */
	this.detail = init instanceof Object ? init.detail : undefined;
};
global.XMLHttpRequest = function () { };
global.FormData = function () { };