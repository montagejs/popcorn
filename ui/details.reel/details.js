
var Component = require("montage/ui/component").Component;
var sharedTmdbService = require("core/tmdb-service").shared;

exports.Details = Component.specialize({

    isVisible: {
        value: null
    },

    _movie: {
        value: null
    },

    movie: {
        set: function (val) {

            var self = this;

            if(val && !val.trailers) {

                sharedTmdbService.loadMovie(val)
                    .then(function (movie) {
                        val.trailers = movie.trailers;
                        val.runtime = movie.runtime;
                        return movie;
                    }).then(function (movie) {
                        return sharedTmdbService.loadReleases(movie);
                    })
                    .then(function (releases) {
                        var rating = releases.countries[0].certification;

                        if (rating.length === 0) {
                            rating = "none";
                        }

                        val.mpaaRating = rating;
                    }).then(function () {
                        // self.dispatchBeforeOwnPropertyChange("movie", self._movie);
                        self._movie = val;
                        self.isVisible = true;
                        // self.dispatchOwnPropertyChange("movie", self._movie);
                    })
                    .done();
            
            } else {
                self._movie = val;
                this.isVisible = true;
            }

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
                var popularity = this.movie.popularity;
                //jshint +W106
                if (popularity < 25) {
                    this.popularityIcon.style.backgroundPosition = '0px 0px';
                } else if (popularity < 50) {
                    this.popularityIcon.style.backgroundPosition = '-12px 0px';
                } else if (popularity < 75) {
                    this.popularityIcon.style.backgroundPosition = '-24px 0px';
                } else {
                    this.popularityIcon.style.backgroundPosition = '-36px 0px';
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
            this.dispatchEventNamed("openTrailer", true, true, {trailers: this.movie.trailers});
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
