/* global global */
/**
 * DOM stack
 */
global.document = {
	createElement: function () {}
};
global.EventTarget = function () {};
global.EventTarget.prototype.addEventListener = function() {};
global.EventTarget.prototype.removeEventListener = function() {};
global.EventTarget.prototype.dispatchEvent = function() {};
global.CustomEvent = function (type) {
	this.type = type;
};