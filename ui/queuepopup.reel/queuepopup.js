var Montage     = require("montage").Montage,
    Component   = require("montage/ui/component").Component;

exports.Queuepopup = Montage.create( Component, {


    movieQueue: {
        value: null
    },

    _isOpen: {
        value: false
    },

    handleCloseButtonAction: {
        value: function(){
            this.close();
        }
    },

    showQueue: {
        value: function(movieQueue) {
			this.movieQueue = movieQueue;
            this.open();
        }
    },

    open: {
        value: function(){
            this._isOpen = true;
            this.needsDraw = true;
        }
    },

    close: {
        value: function(){
            this._isOpen = false;
            this.needsDraw = true;
        }
    },

    draw: {
        value: function(){
            if( this._isOpen ){
                this.element.classList.add( "queuepopup-open");
            } else {
                this.element.classList.remove( "queuepopup-open");
            }
        }
    }
});
