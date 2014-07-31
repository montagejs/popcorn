var dom = require("minidom/dom");

dom.Element.prototype.hasAttribute = dom.Element.prototype.hasAttribute || function (name) {
    var attribute = this._attributes.getNamedItem(name);
    return !!attribute;
};