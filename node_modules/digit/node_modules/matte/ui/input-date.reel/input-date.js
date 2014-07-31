
/**
    @module "matte/ui/input-date.reel"
*/

var NativeInputDate = require("native/ui/input-date.reel").InputDate;

/**
 * Wraps the a &lt;input type="date"> element with binding support for the element's standard attributes.
   @class module:"matte/ui/input-date.reel".InputDate
   @extends module:"native/ui/input-date.reel".InputDate
 */
exports.InputDate = NativeInputDate.specialize({

    hasTemplate: {
        value: true
    },

    constructor: {
        value: function InputDate() {
            this.super();
            this.classList.add("matte-InputDate");
            this.classList.add("matte-InputText");
        }
    }

});
