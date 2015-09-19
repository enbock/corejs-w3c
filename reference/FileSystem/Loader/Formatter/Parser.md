---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/FileSystem/Loader/Formatter/Parser.html
---
[<< Back](reference/)

# (interface) CoreJs.FileSystem.Formatter.Parser
The resource parser.
Convert the loaded data into data transaction or native objects.

*Parameters:*

* creator [CoreJs.FileSystem.Formatter.Creator](reference/FileSystem/Loader/Formatter/Creator.html) The formatter creator.
* data [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) The data to format/parse.

## parse()
Parse the data and return the result.

*Returns:*

* [Object](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2) The parsed data.

## Implementation

* [CoreJs.FileSystem.Loader.Formatter.Network.Parser.Html](reference/FileSystem/Loader/Formatter/Network/Parser/Html.html)
* [CoreJs.FileSystem.Loader.Formatter.Network.Parser.Text](reference/FileSystem/Loader/Formatter/Network/Parser/Text.html)