---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/core.html
---
[<< Back](reference/)

# TOC
* [Intro](reference/core.html#intro)
* [Reference](reference/core.html#reference)
	* [use](reference/core.html#function-usefullqualifiedclassname)
	* [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall)
	* [CoreJs.Event](reference/core.html#corejseventtype-detail)
	* [CoreJs.Event.Handler](reference/core.html#corejseventhandler)
	* [CoreJs.Event.Listener](reference/core.html#corejseventlistener)
	* [CoreJs.Ajax](reference/core.html#corejsajaxmethod-url-senddata)
	* [CoreJs.Ajax.Event](reference/core.html#corejsajaxeventtype-detail)

# Intro
The core library contains the minimum of functionality, which is necessary
to enable the CoreJs functions.
The `core.js` and project based `bootstrap.js` are the only files, which
need to be loaded in the head of the document(project main page).

A typical project main page:

	<!DOCTYPE html>
	<html>
		<head>
			<title>Loading...</title>
			<script src="node_modules/corejs-w3c/src/core.js"></script> 
			<script src="src/bootstrap.js"></script> 
		</head>
		<body></body>
	</html>
	
[Example](http://page-manager.itbock.de/)

The most easy way to deploy an application, based of CoreJS-W3C is, to 
install the `corejs-w3c` via **npm**.

*package.json*

	{
		"name": "project name",
		"version": "1.0.0",
		"description": "Project desciption",
		"author": "project author",
		"main": "src/Main.js",
		"scripts": {
			"test": "mocha tests/index.js"
		},
		"repository": {
			"type": "git",
			"url": "Project source code URL"
		},
		"bugs": {
			"url": "https://github.com/enbock/pager-manager/issues"
		},
		"dependencies": {
			"corejs-w3c": "*"
		},
		"devDependencies": {
			"mocha": "*",
			"chai": "*",
			"sinon": "*",
			"sinon-chai": "*"
		},
		"license": "GPL3"
	}
	
*Shell*

	$ npm install
	
Alternativley is the CoreJS-W3C also standalone usable:

	<script src="//rawgit.com/enbock/corejs-w3c/master/src/core.js"></script>

	
# Reference

## CoreJs.Event(type, detail)
The factory of [CustomEvent](https://dom.spec.whatwg.org/#interface-customevent)
objects.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering.
* `detail` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) Custom data to transport.

### Inheritance

* [CustomEvent](https://dom.spec.whatwg.org/#interface-customevent)

### Internal class name

* `CoreEvent`

## CoreJs.Event.Handler

The implementation of the [DOM Level 2 EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener)
interface.

It contains only the structure for receiving events.

### Inheritance

* [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2)

### Internal class name

* `CoreEventHandler`

### handleEvent(event)
*Parameters:*

* `event` [Event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event) The received event object.
	
## CoreJs.Event.Listener
The event listener is the core of the event systems. Its implement the
[DOM Level 2 EventTarget](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget)
interface.
Its uses the browser event implementation via using the
[DOM Level 2 HTMLElement](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-011100101) 
interface implementation of the browser

### Inheritance

* [EventTarget](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget)
* (mixin) [CoreJs.Event.Handler](reference/core.html#corejseventhandler)

### (static) document
The standard [Document](http://www.w3.org/TR/DOM-Level-3-Core/core.html#i-Document)
injection.

### Internal class name

* `DOMEventListener`

### handleEvent(event)
Inheritance of [CoreJs.Event.Handler](reference/core.html#corejseventhandler)

*Parameters:*

* `event` [Event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event) The received event object.

### addEventListener(event, listener, useCapture)
This method allows the registration of event listeners on the event target.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering
* `listener` [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener),[Function](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.24) The event observer.
* `useCapture` [optional] [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Enable or disable [event capturing](http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-flow-capture).

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener).

### removeEventListener(event, listener, useCapture)
This method allows the removal of event listeners from the event target.
Calling `removeEventListener` with arguments which do not identify any
currently registered [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener)
on the `Event.Listener` has no effect.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering
* `listener` [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener),[Function](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.24) The event observer.
* `useCapture` [optional] [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Enable or disable [event capturing](http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-flow-capture).

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener).

### dispatchEvent(event)
This method allows the dispatch of events into the `CoreJs.Event.Listener`.    
The target of the event is the `CoreJs.Event.Listener` on which
dispatchEvent is called.

*Parameters:*

* `event` [Event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event) The received event object.

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent).

## CoreJs.Ajax(method, url, sendData)
Asynchronous JavaScript and XML.    
Wrapper to equalize and simplify the usage for AJAX calls.

*Parameters:*

* `method` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Type of request (get, post, put, ...).
* `url` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Request address.
* `sendData` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) ,[String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Data to send.

### Inheritance

* [CoreJs.Event.Listener](reference/core.html#corejseventlistener)

### Internal class name

* `Ajax`

### (statix) XHRSystem
The constructor of the [XMLHttpRequest](https://xhr.spec.whatwg.org/#interface-xmlhttprequest)
implementation.

### (static) factory(method, url, sendData)
Factory to create `CoreJs.Ajax` objects.

*Parameters:*

* `method` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Type of request (get, post, put, ...).
* `url` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Request address.
* `sendData` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) ,[String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Data to send.

### load()
Execute the ajax request and start the asynchronous loading.

## CoreJs.Ajax.Event(type, detail)
Ajax events.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering.
* `detail` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) Custom data to transport.

### Inheritance

* [CoreJs.Event](reference/core.html#corejseventtype-detail)

### Internal class name

* `Ajax.Event`

### (constant) LOAD
[String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) of the ajax load event type.

The ajax process event `detail` contains follow data:

* `response` mixed Contains [response body](https://xhr.spec.whatwg.org/#response-body).
* `responseText` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18)
* `responseType` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The type of the response.
* `responseURL` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18),[Null](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.11) The response url.
* `responseXML` Contains the [https://xhr.spec.whatwg.org/#document-response] if the `responseType` is `'document'`
* `status` [Number](http://www.ecma-international.org/ecma-262/5.1/#sec-8.5) Integer value of the response status.
* `lengthComputable` [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Flag if the length computable.
* `loaded` [Number](http://www.ecma-international.org/ecma-262/5.1/#sec-8.5) The loaded amount of data.
* `total`[Number](http://www.ecma-international.org/ecma-262/5.1/#sec-8.5) Response size.

Depent of the ajax method, the response type and the browser implementations
are not all keys filled with data.

### (constant) PROGRESS
[String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) of the ajax process event type.

The ajax process event `detail` contains follow data:

* `lengthComputable` [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Flag if the length computable.
* `loaded` [Number](http://www.ecma-international.org/ecma-262/5.1/#sec-8.5) The loaded amount of data.
* `total`[Number](http://www.ecma-international.org/ecma-262/5.1/#sec-8.5) Response size.

## (function) use(fullQualifiedClassName)
Load via [CoreJs.Ajax](reference/core.html#corejsajaxmethod-url-sendData) the project code.

Typical is the `use` placed in the loading code of the [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall).
The source url will be configured in the [PSR-4](http://www.php-fig.org/psr/psr-4/)
setup.

### *Info*
The `use` works together with `namespace`. In the moment a file is loaded
via PSR-4 configured class definition, will `use` configure the namespace
automatically.

Since `0.3.2` is it not anymore necessary to wrap the class code with a
`namespace` call.

### (static) use.context
The destination context object. The default value is [window](https://html.spec.whatwg.org/multipage/browsers.html#dom-window).

### (static) use.classPathDelimiter
Defines the delimiter character of the `fullQualifiedClassName` and
`fullQualifiedNameSpace` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18)s.
The default value is the dot(`.`).

### (static) use.fileExtension
The file extension [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18)
to convert [PSR-4](http://www.php-fig.org/psr/psr-4/) definition into resource names.

### (static) use.basePath
The url [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18)
of the project's source location. 

### (static) use.psr4(psr4Name, path)
Configure the resouce root of a namespace.

This is an equivalent to the [composer.js](https://github.com/composer/composer/blob/master/res/composer-schema.json)
`autoload`:`psr-4` config.

*Parameters:*

* `psr4Name` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) PSR-4 name (namespace definition).
* `path` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The relative path or url of the resource location for the namespace.

## (function) namespace(fullQualifiedNameSpace, contentCall)
Code isolation and organization system.

The `namespace` organize the code of the project. This is very helpful
for domain driven design development.

*Parameters:*

* `fullQualifiedNameSpace` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) Full qualified name space.
* `contentCall` [Function](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.24) Loading code.

### Example

	namespace('Test.Implementation', function() {
		use('Test.Logger');
		
		var log = new Test.Logger(); // Use imported class
		
		log.debug("Create class...");
		function UseIt() {};
		UseIt.protoType = Object.create(Object.protoType);
		this.UseIt = UseIt; // propagate to Test.Implementation.UseIt
	});