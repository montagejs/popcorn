// From JSDOM (https://github.com/tmpvar/jsdom)
// Licensed under the MIT license. See LICENSE.md for details.

var core = Object.create(require("../level1/core").dom.level1.core);
var domToHtml = require("./domtohtml").domToHtml;

core.Document.prototype.__defineGetter__('outerHTML', function() {
  return domToHtml(this, true);
});

core.Element.prototype.__defineGetter__('outerHTML', function() {
  return domToHtml(this, true);
});

core.Element.prototype.__defineGetter__('innerHTML', function() {
  if (/^(?:script|style)$/.test(this._tagName)) {
    var type = this.getAttribute('type');
    if (!type || /^text\//i.test(type) || /\/javascript$/i.test(type)) {
      return domToHtml(this._childNodes, true, true);
    }
  }

  return domToHtml(this._childNodes, true);
});
