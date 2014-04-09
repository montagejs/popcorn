/**
    @module "matte/ui/radio-button.reel"
*/
/*global require,exports */
var AbstractRadioButton = require("montage/ui/base/abstract-radio-button").AbstractRadioButton;

/**
 * Input Radio
 * @class module:"matte/ui/radio-button.reel".RadioButton
 * @extends module:"montage/ui/abstract-radio-button.reel".AbstractRadioButton
 */
exports.RadioButton = AbstractRadioButton.specialize(/** @lends RadioButton# */ {
    hasTemplate: {
        value: true
    },

    constructor: {
        value: function RadioButton() {
            this.super();
            this.classList.add("matte-RadioButton");
        }
    }
});
