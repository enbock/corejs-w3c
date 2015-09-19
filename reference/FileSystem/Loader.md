---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/FileSystem/Loader.html
---
[<< Back](reference/)

# (interface) CoreJs.FileSystem.Loader
The loader gets data from the file system.    
The word "File System" is here more wide to understand. The file system
is all which contains files or kind of files. Also internet resouces
are a file system.


## Inheritance

* `CoreJs.Event.Listener`

# CoreJs.FileSystem.Loader.Event
The loader events.

## Inheritance

* `CoreJs.Event`

## LOAD
The loaded event.
Contains in `detail.data` the loaded content.

# Implementations

*  [CoreJs.FileSystem.Loader.Network](reference/FileSystem/Loader/Network.html)