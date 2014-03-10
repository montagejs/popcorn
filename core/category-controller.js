var Montage = require("montage").Montage;
var RangeController = require("montage/core/range-controller").RangeController;

exports.CategoryController = Montage.specialize({

    constructor: {
        value: function CategoryController(title, key) {
            this.title = title;
            this.key = key;
            var controller = new RangeController();
            controller.avoidsEmptySelection = true;
            this.contentController = controller;
        }
    },

    title: {
        value: null
    },

    key: {
        value: null
    },

    contentController: {
        value: null
    }
});
