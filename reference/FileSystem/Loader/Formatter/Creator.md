---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/FileSystem/Loader/Formatter/Creator.html
---
[<< Back](reference/)

# (interface) CoreJs.FileSystem.Loader.Formatter.Creator
The creator interface.    
The formatter creator build parser or formatter objects.

## createResponseParser
Create a response parser.

*Parameters:*

* response [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) Response detail data.

*Returns*

* [CoreJs.FileSystem.Loader.Formatter.Parser](reference/FileSystem/Loader/Formatter/Parser.html)

## Implementations

* [CoreJs.FileSystem.Loader.Formatter.Implementation.NetworkTextCreator](reference/FileSystem/Loader/Formatter/Implementation/NetworkTextCreator.html)