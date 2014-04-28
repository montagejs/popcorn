
var Component = require("montage/ui/component").Component;

var TRAILER_URL = "https://www.youtube.com/embed/%s";
var PLACE_HOLDER = "%s";

exports.Player = Component.specialize({

    constructor: {
        value: function Player() {
            this.super();
        }
    },


    player: {
        value: null
    },

    handleCloseButtonAction: {
        value: function () {
            this.templateObjects.overlay.hide();
        }
    },

    _trailerId: {
        value: null
    },

    openTrailer: {
        value: function (id) {
            this._trailerId = id;
            this.templateObjects.overlay.show();
        }
    },

    didShowOverlay: {
        value: function (overlay) {
            if (this._trailerId) {
                this.player.src = TRAILER_URL.replace(PLACE_HOLDER, this._trailerId);
            }
            overlay.classList.add('is-shown');
        }
    },

    didHideOverlay: {
        value: function (overlay) {
            this._trailerId = null;
            overlay.classList.remove('is-shown');
        }

    }
});
