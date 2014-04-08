
/**
    @module "matte/ui/input-number.reel"
*/

var NativeInputNumber = require("native/ui/input-number.reel").InputNumber;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"matte/ui/input-number.reel".InputNumber
   @extends module:"native/ui/input-number.reel".InputNumber
 */
exports.InputNumber = NativeInputNumber.specialize(/** @lends module:"matte/ui/input-number.reel".InputNumber */{

    hasTemplate: {
        value: true
    },

    constructor: {
        value: function InputNumber() {
            this.super();
            this.classList.add("matte-InputNumber");
            this.classList.add("matte-InputText");
        }
    }

});
