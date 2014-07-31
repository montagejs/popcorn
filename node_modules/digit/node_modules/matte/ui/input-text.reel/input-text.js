/**
    @module "matte/ui/input-text.reel"

/*global require,exports */
var AbstractTextField = require("montage/ui/base/abstract-text-field").AbstractTextField;

/**
 * Input Text
 * @class module:"matte/ui/input-text.reel".InputText
 * @extends module:"native/ui/input-text.reel".InputText
 */
exports.InputText = AbstractTextField.specialize(/** @lends module:"matte/ui/input-text.reel".InputText# */ {

    hasTemplate: {value: true},

    constructor: {
        value: function InputText() {
            this.super();
            this.classList.add("matte-InputText");
        }
    }
});
