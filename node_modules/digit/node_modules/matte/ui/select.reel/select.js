/**
    @module "matte/ui/select.reel"
*/
/*global require,exports */
var NativeSelect = require("native/ui/select.reel").Select;

/**
 * Select
 * @class module:"matte/ui/select.reel".Select
 * @extends module:"native/ui/select.reel".Select
 */
exports.Select = NativeSelect.specialize(/** @lends module:"matte/ui/select.reel".Select# */ {

    hasTemplate: {value: true},

    constructor: {
        value: function Select() {
            this.super();
            this.classList.add("matte-Select");
        }
    }


});
