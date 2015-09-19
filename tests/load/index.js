/* global global */

var Events = require("events");
function NodeEvents()  {
    Events.EventEmitter.call(this);
}
NodeEvents.prototype = Object.create(Events.EventEmitter.prototype);
NodeEvents.prototype.constructor = NodeEvents;
NodeEvents.prototype.addEventListener = Events.EventEmitter.prototype.addListener;
NodeEvents.prototype.removeEventListener = Events.EventEmitter.prototype.removeListener;
NodeEvents.prototype.dispatchEvent = function(event) {
    this.emit(event.type,  event);
};

/**
 * DOM stack
 */
global.document = {
	createElement: function () {
		return new NodeEvents();
	 }
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

global.CoreJs = require("../../src/core.js");

global.chai = require('chai');
global.should = chai.should();
global.sinon  = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
global.expect = chai.expect;
global.assert = chai.assert;