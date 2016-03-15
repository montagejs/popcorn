// From JSDOM (https://github.com/tmpvar/jsdom)
// Licensed under the MIT license. See LICENSE.md for details.

var core = Object.create(require("../level1/core").dom.level1.core);

// @see http://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-textContent
core.Node.prototype.__defineGetter__('textContent', function() {
  switch (this.nodeType) {
    case this.COMMENT_NODE:
    case this.CDATA_SECTION_NODE:
    case this.PROCESSING_INSTRUCTION_NODE:
    case this.TEXT_NODE:
      return this.nodeValue;

    case this.ATTRIBUTE_NODE:
    case this.DOCUMENT_FRAGMENT_NODE:
    case this.ELEMENT_NODE:
    case this.ENTITY_NODE:
    case this.ENTITY_REFERENCE_NODE:
      var out = '';
      for (var i = 0 ; i < this.childNodes.length ; ++i) {
        if (this.childNodes[i].nodeType !== this.COMMENT_NODE &&
            this.childNodes[i].nodeType !== this.PROCESSING_INSTRUCTION_NODE) {
          out += this.childNodes[i].textContent || '';
        }
      }
      return out;

    default:
      return null;
  }
});

core.Node.prototype.__defineSetter__('textContent', function(txt) {
  for (var i = this.childNodes.length; --i >=0;) {
    this.removeChild(this.childNodes.item(i));
  }
  if (txt !== "" && txt != null) {
    this.appendChild(this._ownerDocument.createTextNode(txt));
  }
  return txt;
});

exports.dom = {
  level3 : {
    core: core
  }
};
