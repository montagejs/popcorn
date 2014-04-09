/**
    @module "matte/ui/input-checkbox.reel"
*/
/*global require,exports */
var NativeInputCheckbox = require("native/ui/input-checkbox.reel").InputCheckbox;

/**
 * Input Checkbox
 * @class module:"matte/ui/input-checkbox.reel".InputCheckbox
 * @extends module:"native/ui/input-checkbox.reel".InputCheckbox
 */
exports.InputCheckbox = NativeInputCheckbox.specialize(/** module:"matte/ui/input-checkbox.reel".InputCheckbox */ {

    hasTemplate: {value: true},

    constructor: {
        value: function() {
            this.super();
            this.classList.add("matte-InputCheckbox");
        }
    }

});
