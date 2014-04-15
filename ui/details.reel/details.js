
var Component = require("montage/ui/component").Component;

exports.Details = Component.specialize({

    constructor: {
        value: function Details() {
            this.super();
        }
    },


    _movie: {
        value: null
    },

    movie: {
        set: function (val) {
            this._movie = val;
            this.needsDraw = true;
        },
        get: function () {
            return this._movie;
        }
    },

    draw: {
        value: function () {
            if (this.movie) {
                //jshint -W106
                var audience = this.movie.ratings.audience_rating,
                    critics = this.movie.ratings.critics_rating;
                //jshint +W106
                if (audience === "Fresh") {
                    this.aImage.style.backgroundPosition = '0px 0px';
                } else if (audience === "Rotten") {
                    this.aImage.style.backgroundPosition = '0px -25px';
                } else if (audience === "Certified Fresh") {
                    this.aImage.style.backgroundPosition = '0px -50px';
                } else if (audience === "Upright") {
                    this.aImage.style.backgroundPosition = '0px -75px';
                } else if (audience === "Spilled") {
                    this.aImage.style.backgroundPosition = '0px -125px';
                } else {
                    this.aImage.style.backgroundPosition = '0px -100px';
                }

                if (critics === "Fresh"){
                    this.cImage.style.backgroundPosition = '0px 0px';
                } else if (critics === "Rotten"){
                    this.cImage.style.backgroundPosition = '0px -25px';
                } else if (critics === "Certified Fresh"){
                    this.cImage.style.backgroundPosition = '0px -50px';
                } else if (critics === "Upright"){
                    this.cImage.style.backgroundPosition = '0px -75px';
                } else if (critics === "Spilled"){
                    this.cImage.style.backgroundPosition = '0px -125px';
                } else {
                    this.cImage.style.backgroundPosition = '0px -100px';
                }
                if (this._isDetailsExpanded) {
                    this._element.classList.add("expanded");
                } else {
                    this._element.classList.remove("expanded");
                }
            }
        }
    },

    handleRentButtonAction: {
        value: function () {
            window.open( this.movie.links.alternate );
        }
    },

    handleTrailerButtonAction: {
        value: function () {
            this.dispatchEventNamed("openTrailer", true, true, {title: this.movie.title});
        }
    },

    _isDetailsExpanded: {
        value: false
    },

    handleExpandButtonAction: {
        value: function () {
            this._isDetailsExpanded = !this._isDetailsExpanded;
            this.needsDraw = true;
        }
    }
});
