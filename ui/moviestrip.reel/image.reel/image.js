var Component = require("montage/ui/component").Component;

exports.Image = Component.specialize( {

    _src: {
        value: null
    },

    _title: {
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

    title: {
        set: function (value) {
            if (value !== this._title) {
                this._title = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function () {
            this._element.setAttribute('title', this._title);
            
            if (this._src) {
                this._element.style.backgroundImage = "url(" + this._src + ")";
            } else {
                this._element.style.backgroundImage = "url(assets/image/no-poster.jpg)";
            }
        }
    }

});
