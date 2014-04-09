/**
    @module "native/ui/anchor.reel"
*/
var NativeControl = require("ui/native-control").NativeControl;
/**
  The Anchor component wraps a native <code>&lt;a&gt;</code> element and exposes its standard attributes as bindable properties.
  @class module:"native/ui/anchor.reel".Anchor
  @extends module:native/ui/native-control.NativeControl

*/
var Anchor = exports.Anchor = NativeControl.specialize({

    // HTMLAnchorElement methods

    blur: { value: function() { this._element.blur(); } },
    focus: { value: function() { this._element.focus(); } }

});

Anchor.addAttributes( /** @lends module:"native/ui/anchor.reel".Anchor# */ {

/**
    The text displayed by the link.
    @type string
    @default null
*/
    textContent: null,

/**
    The link target URL.
    @type string
    @default null
*/
    href: null,

/**
    The language of the linked resource.
    @type string
    @default null
*/
    hreflang: null,

/**
     The media type for which the target document was designed.
    @type string
     @default null
*/
    media: null,

/**
    Controls what kinds of links the elements create.
    @type string
    @default null
*/
    rel: null,

/**
     The target window the link will open in.
     @type string
     @default null
*/
    target: null,

/**
     The MIME type of the linked resource.
     @type string
     @default null
*/
    type: null
});
