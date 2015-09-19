---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/FileSystem/Loader/Formatter/Network/Parser/Html.html
---
[<< Back](reference/FileSystem/Loader/Formatter/Parser.html)

# CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html
The html resource parser.    
Convert the loaded data as DOM structure into a HTMLElement.

*Parameters:*

* creator [CoreJs.FileSystem.Formatter.Creator](reference/FileSystem/Loader/Formatter/Creator.html) The formatter creator.
* node [HTMLElement](http://www.w3.org/TR/html/dom.html#htmlelement) The target node.
* data [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) The resource data to parse.

## parse()
Parse the data into the node.
It returns the last child of the loaded snipped.    
**Attention:** If the loaded text contains more than one root elements, then
will only the last converted be returned.

*Returns*:

* [HTMLElement](http://www.w3.org/TR/html/dom.html#htmlelement)