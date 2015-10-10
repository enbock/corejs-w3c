/* global CoreJs, namespace, use */
/**
 * Main programm
 */
function Main() {
	CoreJs.Event.Listener.call(this);
}
Main.prototype = Object.create(CoreJs.Event.Listener.prototype);
this.Main = Main.prototype.constructor = Main;

/**
 * Program starter
 */
Main.prototype.handleEvent = function(event) {
	console.log("Event:", event);
	var element = document.querySelector("#greeting");
	element.appendChild(document.createTextNode("Hello World!"));
	element.appendChild(document.createElement("br"));
	element.appendChild(document.createTextNode(String(new Date)));
};

// Create program
var app = new Main();

// Bind to window's loader.
window.addEventListener("load", app);