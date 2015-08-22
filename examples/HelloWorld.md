---
layout: default
title: Hello World Example
permalink: /examples/HelloWorld.html
---

# Basic usage of CoreJs-W3C
To demonstrate the  basic usage of the corejs w3c library I will start with
an simple _Hello World_.

## Hello World
To have the library easy installed you can use `npm`:

*`package.json`*:

	{
		"name": "hello-word",
		"version": "0.1.0",
		"description": "CoreJs-W3C Demo",
		"author": "Endre Bock <dev@itbock.de>",
		"main": "src/main.js",
		"dependencies": {
			"corejs-w3c": "*"
		}
	}
	
Now the main page:

*`index.html`*

	<!DOCTYPE html>
	<html>
		<head>
			<title>Hello World</title>
			<script src="node_modules/corejs-w3c/src/core.js"></script> 
			<script src="src/main.js"></script> 
		</head>
		
		<body>
			<div id="greeting"></div>
		</body>
	</html>
		
The `core.js` file we load simple from the `npm install` created folder.    
Also you can see that we loaded herea `main.js` file. That is our main
 program:

	/* global CoreJs, namespace, use */
	namespace("HelloWorld", function() {
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
		this.app = new Main();
		
		// Bind to window's loader.
		window.addEventListener("load", this.app);
	});

That's it.

## How does it work?

	namespace("HelloWorld", function() {});
		
*`namespace`* create a new context object inside of the global context.
The global context is normalize the `window` object of the browser.    
You can change it, if needed, with:

	use.context = theNewGlobalContextFuntionObject;
		
The anonymous function of the `namespace` call contains the
**loader code**. That means, that after the namespace creation this
function will not anymore exists. To have the objects and classes stored in 
the namespace, is it necessary to add them to the `this` object.

	this.Main = Main.prototype.constructor = Main;
			
That easy line do two steps. Its creates the class constructor, as 
mentioned in MDN, and its stored the Main class into the namespace 
`HelloWorld`. The class is now accessable via `window.HelloWorld.Main`.    
Try to create it in the developer console:

	var a = new window.HelloWorld.Main()
	a.handleEvent(new CoreJs.Event("starting manually"));
	
	// Output
	Event: CustomEvent {detail: Object}
	// and a 2nd time Hello World.
		
_Note:_ More about event handling and usage in modern browsern you can
find more at 
[MDN DOM Event Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers)
and [MDN API EventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventListener).
 
_Note2:_ For a good project style you should create your application
object in a bootstrapper domain.
 
Let it run ... the [LiveDemo](examples/run/HelloWorld.html) is here.

This example was tested in:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox