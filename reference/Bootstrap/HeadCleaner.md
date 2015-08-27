---
layout: default
title: CoreJS-W3C Reference
permalink: /reference/Bootstrap/HeadCleaner.html
---
[<< Back](reference/)

# CoreJs.Bootstrap.HeadCleaner(headElement)
The head cleaner is an bootstrap module to delete all tags from the document
head node.

Idea is to fill the whole DOM tree by the application.    
Of course it is cosmetic stuff. Funtionality wise make it no difference if
the tags stays in the head or not.

*Parameters:*

* `headElement` [HTMLHeadElement](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-77253168) The document head node.

## clean()
Removes the elements from the `headElement`.