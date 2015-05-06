var Component = require("montage/ui/component").Component;

exports.Image = Component.specialize( {

    _src: {
        value: null
    },

    src: {
        set: function (value) {
            if (value !== this._src) {
                this._src = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function () {
            if (this._src) {
                this._element.style.backgroundImage = "url(" + this._src + ")";
            } else {
                this._element.style.backgroundImage = "url(assets/image/no-poster.jpg)";
            }
        }
    }

});
