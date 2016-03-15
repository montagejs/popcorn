// To stringify the doctype
var domToHtml = require("./lib/domtohtml").domToHtml;

var DOCUMENT_OPTIONS = {
    contentType: "text/html"
};

module.exports = Handler;
function Handler(dom) {
    this.dom = dom;
    this.document = null;
    this._quirksMode = false;
    this._reset = false;
}

Handler.prototype = {

    createDocument: function () {
        var document = this.document = new this.dom.Document(DOCUMENT_OPTIONS);
        return document;
    },

    createDocumentFragment: function () {
        return this.document.createDocumentFragment();
    },

    createElement: function (tagName, namespaceURI, attributes) {
        var el = this.document.createElement(tagName.toUpperCase());

        Object.defineProperty(el, "namespaceURI", {
            configurable: true,
            enumerable: true,
            writable: false,
            value: namespaceURI
        });

        this.adoptAttributes(el, attributes);

        return el;
    },

    createCommentNode: function (data) {
        return this.document.createComment(data);
    },

    createTextNode: function (text) {
        return this.document.createTextNode(text);
    },

    setDocumentType: function (document, name, publicId, systemId) {
        var doctype = this.document.doctype;
        if (!doctype) {
            doctype = new this.dom.DocumentType(document);
            document.doctype = doctype;
            this.document.appendChild(doctype);
        }

        doctype._name = name;
        Object.defineProperties(doctype, {
            publicId: {
                configurable: true,
                enumerable: true,
                writable: false,
                value: publicId
            },
            systemId: {
                configurable: true,
                enumerable: true,
                writable: false,
                value: systemId
            },
            // EXTENSION
            toString: {
                configurable: true,
                enumerable: false,
                writable: true,
                value: function () {
                    return domToHtml(this);
                }
            }
        });

    },

    setQuirksMode: function (document) {
        if (document !== this.document) {
            throw new Error("Given document does not match handler document");
        }
        this._quirksMode = true;
    },

    isQuirksMode: function (document) {
        if (document !== this.document) {
            throw new Error("Given document does not match handler document");
        }
        return this._quirksMode;
    },

    appendChild: function (parent, node) {
        parent.appendChild(node);
    },

    insertBefore: function (parent, node, reference) {
        parent.insertBefore(node, reference);
    },

    detachNode: function (node) {
        if (!node.parentNode) {
            return;
        }
        node.parentNode.removeChild(node);
    },

    insertText: function (parent, text) {
        var document = this.document;
        var last = parent.lastChild;
        if (last && last.nodeType === document.TEXT_NODE) {
            last.nodeValue += text;
        } else {
            parent.appendChild(document.createTextNode(text));
        }
    },

    insertTextBefore: function (parent, text, reference) {
        var document = this.document;
        if (reference.nodeType === document.TEXT_NODE) {
            reference.nodeValue = text + reference.nodeValue;
        } else {
            parent.insertBefore(document.createTextNode(text), reference);
        }
    },

    adoptAttributes: function (node, attributes) {
        if (!attributes) {
            return;
        }

        for (var i = 0, len = attributes.length; i < len; i++) {
            var attr = attributes[i];

            if (typeof attr.prefix === "string" && attr.prefix.length > 0) {
                attr.name = attr.prefix + ":" + attr.name;
            }

            if (node.getAttribute(attr.name) === null) {
                node.setAttribute(attr.name, attr.value);
            }
        }
    },

    getFirstChild: function (node) {
        return node.firstChild;
    },

    getParentNode: function (node) {
        return node.parentNode;
    },

    getAttrList: function (node) {
        var list = [];
        var attrs = node.attributes;
        for (var i = 0, len = attrs.length; i < len; i++) {
            list.push({name: attrs[i].name, value: attrs[i].value});
        }
        return list;
    },

    getTagName: function (element) {
        return element.tagName.toLowerCase();
    },

    getNamespaceURI: function (element) {
        return element.namespaceURI;
    }
};
