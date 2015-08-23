---
layout: default
title: Bootstrap Example
permalink: /examples/Bootstrap.html
---
[<< Back](#)

# Intro
The bootstrappers responsability is the congigure the environment of
the application.    
The bootstrapper should be the only place in that location and installation
related data is placed. The rest of the project code design must be 
independend of the installation configuration.    
The **CoreJS-W3C** provides via `use` and `namespace` functionality to
archieve that design.

# The bootstrap process
In follow is used the code of the [Page Manger](http://page-manager.itbock.de/).

*src/bootstrap.js*

	use.psr4("CoreJs", "node_modules/corejs-w3c/src");
	use.psr4("PageManager", "src");
	
	/* global PageManager */
	use("PageManager.Main");
	use("CoreJs.Bootstrap.HeadCleaner");
	
	/**
	* Bootstrapper. 
	*/
	function Bootstrap() {
		CoreJs.Event.Handler.call(this);
	}
	Bootstrap.prototype = Object.create(CoreJs.Event.Handler.prototype);
	Bootstrap.prototype.construct = Bootstrap;
	
	Bootstrap.prototype.handleEvent = function() {
		// unbind
		window.removeEventListener("load", this);
		
		// load & start application
		namespace("PageManager", function() {
			(new CoreJs.Bootstrap.HeadCleaner(document.head)).clean();
			
			this.app = new PageManager.Main();
			this.app.run();
		});
	};
	
	var loader = new Bootstrap();
	window.addEventListener("load", loader);

Now in detail:

## Configuration of the CoreJs location

	use.psr4("CoreJs", "node_modules/corejs-w3c/src");

The definition at which place is the **CoreJS-W3C** installed. It could
also be an full qualified URL like:

	use.psr4("CoreJs", "http://rawgit.com/enbock/corejs-w3c/master/src");

## Configuration of the project's source

	use.psr4("PageManager", "src");

Same as the `CoreJs` definition is here the path/url to the project source
defines. In this example will all source code place the in `PageManager`
namespace.

## Loading the primary code

	use("CoreJs.Bootstrap.HeadCleaner");
	use("PageManager.Main");

The [HeadCleaner](reference/Bootstrap.html#corejsheadcleanerheadelement)
is maybe the most unneeded tool. But it is nice to have a clean DOM tree.
The seconds use is the `Main` program of the `PageManager`.

The files are of the class code are now scheduled to load. The loading
process will be asynchronous. But with help of [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall)
we can ignore the asynchrony and can continue as it will be synchronous.

## The `Bootstrap` class
This is the last class outside of a namespace. This small code is used
to stick on the [window](https://html.spec.whatwg.org/multipage/browsers.html#dom-window)
load process and starts the project after the document is ready.    
Typically is the `Bootstrap`er extended from the [CoreJs.Event.Handler](reference/core.html#corejseventhandler).

We will be created as a local window object and bound to the `'load'`
event of window:

	var loader = new Bootstrap();
	window.addEventListener("load", loader);

## Project start
	
	Bootstrap.prototype.handleEvent = function() {
		// unbind
		window.removeEventListener("load", this);
		
		// load & start application
		namespace("PageManager", function() {
			(new CoreJs.Bootstrap.HeadCleaner(document.head)).clean();
			
			this.app = new PageManager.Main();
			this.app.run();
		});
	};

The first of the handler function is, to release the bound of the window 
load event:

	window.removeEventListener("load", this);

Normalize the event will not called a second time. But it is always good
to have an clean event listener.

As next will be load the application into the projects namespace:

	namespace("PageManager", function() {
		(new CoreJs.Bootstrap.HeadCleaner(document.head)).clean();
		
		this.app = new PageManager.Main();
		this.app.run();
	});

At first we start a bit out of scope and let run the [HeadCleaner](reference/Bootstrap.html#corejsheadcleanerheadelement).

Why inside of the namespace?

The [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall)
interact with the [use](reference/core.html#function-usefullqualifiedclassname)
functionality. Only that combination allows to think in sychnronous loading.    
In real catch the [TypeError](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2)
or the [RefernceError](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2) 
and wait for the
[Ajax Load Event](reference/core.html#corejsajaxeventtype-detail). After the
code file was loaded, executes the [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall)
the loading code(the 2nd parameter) again. Theoretical could call the
bootstrap code twice. For the [HeadCleaner](reference/Bootstrap.html#corejsheadcleanerheadelement)
is it no problem. But to avoid a duplicaed application we can use a very
primitve trick:

	namespace("PageManager", function() {
		(new CoreJs.Bootstrap.HeadCleaner(document.head)).clean();
		
		if(!this.app) {
			this.app = new PageManager.Main();
			this.app.run();
		}
	});
		
How does that work? Via the `this` pointer, which is always the context
of the specified namespace(here `PageManager`) we store the application
object(`this.app`).    
Also you can if it needed access the application via the namespace(ie:
`PageManager.app`).

If you don't like that approach, you can check at first, that all needed
classes are loaded:

	namespace("PageManager", function() {
		// Synchroize preconditions
		if(!CoreJs.Bootstrap.HeadCleaner) throw new TypeError()
		if(!PageManager.Main) throw new TypeError()
	
		(new CoreJs.Bootstrap.HeadCleaner(document.head)).clean();
		
		this.app = new PageManager.Main();
		this.app.run();
	});
		
or

	namespace("PageManager", function() {
		var cleaner = new CoreJs.Bootstrap.HeadCleaner(document.head);
		this.app    = new PageManager.Main();
		
		cleaner.clean();
		this.app.run();
	});