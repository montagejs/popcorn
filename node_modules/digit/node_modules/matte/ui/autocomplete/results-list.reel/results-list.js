var Component = require("montage/ui/component").Component;

exports.ResultsList = Component.specialize({

    textPropertyPath: {value: null},

    // contentController -> this.repetition.contentController
    contentController: {value: null},

    activeIndexes: {value: null}
});
