
var Component = require("montage/ui/component").Component;
var sharedTmdbService = require("core/tmdb-service").shared;

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
            var self = this;
            this._movie = val;
            if(val != null) {
                sharedTmdbService.loadMovie(val)
                .then(function (movie) {
                    self.dispatchBeforeOwnPropertyChange("movie", self._movie);
                    self._movie = movie;
                    self.dispatchOwnPropertyChange("movie", self._movie);
                    return movie;
                })
                .then(function (movie) {
                    return sharedTmdbService.loadReleases(movie);
                })
                .then(function (releases) {
                    var rating = releases.countries[0].certification;

                    if (rating.length === 0) {
                        rating = "none";
                    }
                    self._movie.mpaaRating = rating;
                })
                .done();
            }
            this.needsDraw = true;
        },
        get: function () {
            return this._movie;
        }
    },

    draw: {
        value: function () {
            if (false && this.movie) {
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
