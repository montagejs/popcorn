
var Component = require("montage/ui/component").Component;

var TRAILER_URL = "http://www.youtube.com/embed/%s";
var PLACE_HOLDER = "%s";

exports.Moviepopup = Component.specialize({

    player: {
        value: null
    },

    opening: {
        value: false
    },

    handleCloseButtonAction: {
        value: function () {
            this.close();
        }
    },

    openTrailer: {
        value: function (id) {
            this.player.src = TRAILER_URL.replace(PLACE_HOLDER, id);
            this.open();
        }
    },

    open: {
        value: function () {
            this.opening = true;
            this.needsDraw = true;
        }
    },

    close: {
        value: function () {
            this.player.src = null;
            this.closing = true;
            this.needsDraw = true;
        }
    },

    draw: {
        value: function () {
            if (this.opening) {
                this.element.classList.add("moviepopup-open");
                this.opening = false;
            } else if (this.closing) {
                this.element.classList.remove("moviepopup-open");
                this.closing = false;
            }
        }
    }
});
