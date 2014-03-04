/*global require*/

var AbstractImage = require("montage/ui/base/abstract-image").AbstractImage;

exports.Image = AbstractImage.specialize( {

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
            var src;
            if (this._isLoadingImage || this._isInvalidSrc) {
                src = this.emptyImageSrc;
            } else {
                src = this._getRebasedSrc();
            }
            if (typeof src !== "undefined") {
                this._element.style.backgroundImage = "url(" + src + ")";
            }
        }
    }

});
