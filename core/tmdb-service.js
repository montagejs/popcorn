/**
 * @module ./tmdb-service
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;
var RangeController = require("montage/core/range-controller").RangeController;

var CategoryController = require("./category-controller").CategoryController;
var sharedTransport = require("./jsonp-transport").shared;

var API_KEY = "dbf71473cf25bbd06939baef47b626eb";
var BOX_OFFICE_FEED = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + API_KEY;
var UPCOMING_FEED = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + API_KEY;
var TOP_RATED_FEED = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + API_KEY;
var POPULAR_FEED = "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
var MOVIE = "https://api.themoviedb.org/3/movie/";
/**
 * @class TmdbService
 * @extends Montage
 */

exports.TmdbService = Montage.specialize(/** @lends TmdbService# */ {
//TODO combine constructor and load
    constructor: {
        value: function RottenTomatoService() {
            this.categories = new RangeController().initWithContent([]);
            this.categories.avoidsEmptySelection = true;
        }
    },

    load: {
        value: function () {
            var self = this;

            self.latestBoxOffice = new CategoryController("Box Office", "box_office");
            self.upcoming = new CategoryController("Upcoming", "upcoming");
            self.topDvdRentals = new CategoryController("Top Rated", "rentals");
            self.inTheaters = new CategoryController("Popular", "in_theaters");

            var boxOfficePromise = this.loadLatestBoxOfficeMovies()
            .then(function (latestBoxOffice) {
                self.latestBoxOffice.contentController.content = latestBoxOffice;
                self.categories.content.push(self.latestBoxOffice, self.inTheaters, self.upcoming, self.topDvdRentals);
                self.categories.select(self.latestBoxOffice);
            });
            // we fork the promise chain to expose the resolution of the first list.
            boxOfficePromise
            .then(function () {
                // then do the rest
                return [
                    self.loadUpcomingMovies(),
                    self.loadTopRated(),
                    self.loadPopular()
                ];
            })
            .spread(function (upcomingMovies, topDvdRentals, inTheaters) {
                self.upcoming.contentController.content = upcomingMovies;
                self.topDvdRentals.contentController.content = topDvdRentals;
                self.inTheaters.contentController.content = inTheaters;
            })
            .done();

            return boxOfficePromise;
        }
    },

    categories: {
        value: null
    },

    latestBoxOffice: {
        value: null
    },

    upcoming: {
        value: null
    },

    topDvdRentals: {
        value: null
    },

    inTheaters: {
        value: null
    },

    loadLatestBoxOfficeMovies: {
        value: function () {

            return sharedTransport.makeRequest(BOX_OFFICE_FEED, "tmdb")
            .then(function (response) {
                return response.results;
            });
        }
    },

    loadUpcomingMovies: {
        value: function () {

            return sharedTransport.makeRequest(UPCOMING_FEED, "tmdb")
            .then(function (response) {
                return response.results;
            });
        }
    },

    loadTopRated: {
        value: function () {

            return sharedTransport.makeRequest(TOP_RATED_FEED, "tmdb")
            .then(function (response) {
                return response.results;
            });
        }

    },

    loadPopular: {
        value: function () {

            return sharedTransport.makeRequest(POPULAR_FEED, "tmdb")
            .then(function (response) {
                return response.results;
            });
        }
    },

    loadMovie: {
        value: function (movie) {
            return sharedTransport.makeRequest(MOVIE+ movie.id + "?api_key=" + API_KEY + "&append_to_response=trailers", "tmdb")
            .then(function (response) {
                return response;
            });
        }
    },

    loadReleases: {
        value: function (movie) {
            return sharedTransport.makeRequest(MOVIE+ movie.id + "/releases?api_key=" + API_KEY, "tmdb")
            .then(function (response) {
                return response;
            });
        }
    }

});

exports.shared = new exports.TmdbService();
