---
layout: default
title: CoreJS-W3C
permalink: /index.html
---

# Destination
The goal of this library is, to provide core functionalities in kind of DDD and 
Di style which uses all W3C Draft and Recomented functionalities without using 
PolyFills.

## Design goals
As program/architecture design to make tools and applications should work in a 
strict MVC pattern with follow elements:

* Model: Backend objects for connection to external or internal data services
* Bridge: Passive data structres
* View: Front side object with "knows" the bound DOM part and translate user 
* activities into program CustomEvents
* Controller: Interact with view object via CustomEvent protocols and trigger 
model object in same way (Translate View Events into Model Events and 
backward). Connect logical activities between multiple view and model objects.

## JavaScript style
As language style and way to inheritance objects will be use the ECMAScript 5 
[Classical inheritance with Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Example:_Classical_inheritance_with_Object.create)

# Features
* Native Include/Require system
* Native [Ajax](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) with parser/encryptor for:
	* [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
	* [HTML Templates](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
	* XML
	* [CSS](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)
* Native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) System

# References
* [MDN Web API Interfaces](https://developer.mozilla.org/en-US/docs/Web/API)

# Development
## Event classes
In design of the event classes I come to the point to think about, how I will
organise the event. The `Event` has the 
[`detail`](https://developer.mozilla.org/en-US/docs/Web/API/Event/detail)
property which can be passed via the `eventInit` parameter of the `Event`
constructor. In that reason is it normalize not necessary to create extended
event `CustomEvent` classes.
To organize the `typeArg`, the event types/names, I will add event _constants_
in the global `Event` class object. If that later on will not fit, I need to
move the _constants_ into the target or source classes or have to do a kind of
_interface_ to collect the event types.