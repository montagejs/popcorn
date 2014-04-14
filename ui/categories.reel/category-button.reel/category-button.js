/**
 * @module ui/category-button.reel
 * @requires montage/ui/component
 */
var AbstractRadioButton = require("montage/ui/base/abstract-radio-button").AbstractRadioButton;

/**
 * @class CategoryButton
 * @extends Component
 */
exports.CategoryButton = AbstractRadioButton.specialize(/** @lends CategoryButton# */ {

    constructor: {
        value: function CategoryButton() {
            this.super();
        }
    },

    label: {
        value: null
    }
});
