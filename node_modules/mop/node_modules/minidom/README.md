minidom
=======

A small JavaScript DOM. Implements DOM level 1, with `textContent` from level 3
and `innerHTML` and `outerHTML` getters. Only supports HTML documents.

## Usage

```javascript
var minidom = require("minidom");

var document = minidom('<!doctype><html><head><title>Hello</title><body><h1>Hi!</h1></body></html>');

expect(document.getElementsByTagName("h1")[0].textContent).toEqual("Hi!");
```

You can also access the DOM implementation used internally:

```javascript
var dom = require("minidom/dom");

var document = minidom();
expect(document instanceof dom.Node).toBeTruthy();
```

## Differences with JSDom

|  | JSDom | minidom |
| --- | --- | --- |
| Runs Javascript in the page context | Yes | No |
| CSSOM | Yes | No |
| Loads remote resources | Yes | No |
| HTML5 parsing algorithm | No | Yes* |
| Runs in the browser | No | Yes** |
| Awesome | Yes | Yes |

Basically minidom does a lot less, but often it's all you need.

<sub>* This means that the DOM representation is the same as you would get in the browser, but may not be suitable if you wish to preserve as much of the original formatting as possible. For example parsing `<body>hi</body><head><title>hello</title>` with minidom results in a document that looks like `<html><head></head><body>hi<title>hello</title></body></html> `, where as JSDom outputs `<html><body>hi</body><head><title>hello</title></head></html>`.</sub>

<sub>** This is probably very cool, although I have no idea why.</sub>

## Supported API

Properties marked &#x20E0;&nbsp; are read-only

### Node

 - `ELEMENT_NODE`
 - `ATTRIBUTE_NODE`
 - `TEXT_NODE`
 - `CDATA_SECTION_NODE`
 - `ENTITY_REFERENCE_NODE`
 - `ENTITY_NODE`
 - `PROCESSING_INSTRUCTION_NODE`
 - `COMMENT_NODE`
 - `DOCUMENT_NODE`
 - `DOCUMENT_TYPE_NODE`
 - `DOCUMENT_FRAGMENT_NODE`
 - `NOTATION_NODE`
 - `children` &#x20E0;
 - `nodeValue`
 - `parentNode` &#x20E0;
 - `nodeName` &#x20E0;
 - `attributes` &#x20E0;
 - `firstChild` &#x20E0;
 - `ownerDocument` &#x20E0;
 - `readonly` &#x20E0;
 - `lastChild` &#x20E0;
 - `childNodes` &#x20E0;
 - `nextSibling` &#x20E0;
 - `previousSibling` &#x20E0;
 - `insertBefore(/* Node */ newChild, /* Node*/ refChild)`
 - `replaceChild(/* Node */ newChild, /* Node */ oldChild)`
 - `removeChild(/* Node */ oldChild)`
 - `appendChild(/* Node */ newChild)`
 - `hasChildNodes()`
 - `cloneNode(/* bool */ deep, fn)`
 - `normalize()`
 - `toString()`
 - `raise(type, message, data)`
 - `textContent`

### Document (inherits from Node)

 - `nodeType`
 - `contentType` &#x20E0;
 - `doctype`
 - `documentElement` &#x20E0;
 - `implementation`
 - `nodeName` &#x20E0;
 - `tagName` &#x20E0;
 - `nodeValue`
 - `attributes` &#x20E0;
 - `ownerDocument` &#x20E0;
 - `readonly` &#x20E0;
 - `createElement(/* string */ tagName)`
 - `createDocumentFragment()`
 - `createTextNode(/* string */ data)`
 - `createComment(/* string */ data)`
 - `createCDATASection(/* string */ data)`
 - `createProcessingInstruction(/* string */ target, /* string */ data)`
 - `createAttribute(/* string */ name)`
 - `createEntityReference(/* string */ name)`
 - `createEntityNode(/* string */ name)`
 - `createNotationNode(/* string */ name, /* string */ publicId, /* string */ systemId)`
 - `appendChild(/* Node */ arg)`
 - `removeChild(/* Node */ arg)`
 - `getElementsByTagName(/* string */ name)`
 - `outerHTML` &#x20E0;

### Element (inherits from Node)

 - `nodeValue`
 - `tagName` &#x20E0;
 - `nodeType`
 - `attributes` &#x20E0;
 - `getAttribute(/* string */ name)`
 - `setAttribute(/* string */ name, /* string */ value)`
 - `removeAttribute(/* string */ name)`
 - `getAttributeNode(/* string */ name)`
 - `setAttributeNode(/* Attr */ newAttr)`
 - `removeAttributeNode(/* Attr */ oldAttr)`
 - `getElementsByTagName(/* string */ name)`
 - `outerHTML` &#x20E0;
 - `innerHTML` &#x20E0;

## Thanks

Made possible with large excerpts from [JSDom](https://github.com/tmpvar/jsdom), and the excellent [parse5](https://github.com/inikulin/parse5) implementation of the HTML5 parsing algorithm.

## License

MIT license. See LICENSE.md for details.
