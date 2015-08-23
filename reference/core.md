---
layout: default
title: CoreJS-W3C Reference - core.js
permalink: /reference/core.html
---
[<< Back](reference/)

# TOC
* [Intro](reference/core.html#intro)
* [Reference](reference/core.html#reference)
	* [CoreJs.Event](reference/core.html#corejsevent)
	* [CoreJs.Event.Handler](reference/core.html#corejseventhandler)
	* [CoreJs.Event.Listener](reference/core.html#corejseventlistener)

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
The factory of [CustomEvent](https://dom.spec.whatwg.org/#interface-customevent)objects.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering.
* `detail` [`Object`](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) Custom data to transport.

### Internal class name

* `CoreEvent`

## CoreJs.Event.Handler

The implementation of the [DOM Level 2 EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener)
interface.

It contains only the structure for receiving events.

### Inheritance

* [`Object`](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2)

### Internal class name

* `CoreEventHandler`

### Functions

#### handleEvent(event)
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

### Static properties

* `document` [Document](http://www.w3.org/TR/DOM-Level-3-Core/core.html#i-Document) The standard document injection.

### Internal class name

* `DOMEventListener`

### Functions

#### handleEvent(event)
Inheritance of [CoreJs.Event.Handler](reference/core.html#corejseventhandler)

*Parameters:*

* `event` [Event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event) The received event object.

#### addEventListener(event, listener, useCapture)
This method allows the registration of event listeners on the event target.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering
* `listener` [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener),[Function](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.24) The event observer.
* `useCapture` [optional] [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Enable or disable [event capturing](http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-flow-capture).

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener).

#### removeEventListener(event, listener, useCapture)
This method allows the removal of event listeners from the event target.
Calling `removeEventListener` with arguments which do not identify any
currently registered [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener)
on the `Event.Listener` has no effect.

*Parameters:*

* `event` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The event type for which the user is registering
* `listener` [EventListener](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventListener),[Function](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.24) The event observer.
* `useCapture` [optional] [Boolean](http://www.ecma-international.org/ecma-262/5.1/#sec-8.3) Enable or disable [event capturing](http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-flow-capture).

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener).

#### dispatchEvent(event)
This method allows the dispatch of events into the `CoreJs.Event.Listener`.    
The target of the event is the `CoreJs.Event.Listener` on which
dispatchEvent is called.

*Parameters:*

* `event` [Event](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event) The received event object.

See also [DOM Level 2](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent).

