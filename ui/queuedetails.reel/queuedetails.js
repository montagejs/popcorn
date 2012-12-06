var Montage     = require("montage/core/core").Montage,
    Component   = require("montage/ui/component").Component;

exports.Queuedetails = Montage.create(Component, {
    data: {
        value: null
    },

    handleRemoveButtonAction: {
        value: function() {
            this.dispatchEventNamed("removeFromQueue", true, true, this.data);
        }
    }
});
