---
layout: default
title: CoreJS-W3C Reference - Container
permalink: /reference/DependencyInjection/Container.html
---
[<< Back](reference/)

# CoreJs.DependencyInjection.Container(config)
The container is the central project configuration.    
It is responsible to connect all the elements and fullfil all the 
precondition of a class. Also the container creates and unified the objects.

*Parameters:*

* `config` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) Json loaded config data data.

**Syntax of the config data**

	"services": {
		<class definition>
	}
	
	<class defintion> := "<Service name>" : {
		"class": "<Full qualified class name>",
		"arguments": [
			<parameter>
		]
	}
	
	<parameter> := String of:
		"@<FQCN>"            -> object will be created
		"$<global variable>" -> import the variable 
                                    (global function call works also)
		"<text>"             -> text will provide as it is 
		
## Methodology
The conatiner should be used exclusivly outside of any project classes.
Make your code always independend from the dependency injection container.    
You will need to get a service from the container at some point but this should be as few times as possible at the entry point to your application.

## load()
Preload all the configured classes.    
The loading process uses the [use](reference/core.html#function-usefullqualifiedclassname)
functionality to get the code.

## get(serviceName)
Get the service object from the container.    
The first get of the service object creates it. The call of this function
should placed in a [namespace](reference/core.html#function-namespacefullqualifiednamespace-contentcall)
block, to be sure, that the code was correct loaded from the resource.

*Parameters:*

* `serviceName` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The full name of the service.

## set(serviceName, instance)
Set a instance as a service object.    
This this method you can avoid, that the container create the object by
hisself.

*Use this function really careful.*

*Parameters:*

* `serviceName` [String](http://www.ecma-international.org/ecma-262/5.1/#sec-4.3.18) The full name of the service.
* `instance` [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) The service object.