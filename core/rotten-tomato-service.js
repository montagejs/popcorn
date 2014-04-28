/**
 * @module ./rotten-tomato-service
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;
var RangeController = require("montage/core/range-controller").RangeController;

var CategoryController = require("./category-controller").CategoryController;
var sharedTransport = require("./jsonp-transport").shared;

var API_KEY = "edvr96kp6mddwsasvmt269pw";
var BOX_OFFICE_FEED = "https://rottentomatoes.montagestudio.com/api/public/v1.0/lists/movies/box_office.json?limit=15&country=us&apikey=" + API_KEY;
var UPCOMING_FEED = "https://rottentomatoes.montagestudio.com/api/public/v1.0/lists/movies/upcoming.json?page_limit=30&page=1&country=us&apikey=" + API_KEY;
var TOP_RENTALS_FEED = "https://rottentomatoes.montagestudio.com/api/public/v1.0/lists/dvds/top_rentals.json?limit=20&country=us&apikey=" + API_KEY;
var IN_THEATERS_FEED = "https://rottentomatoes.montagestudio.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=30&page=1&country=us&apikey=" + API_KEY;

/**
 * @class RottenTomatoService
 * @extends Montage
 */
//TODO change to tomatoes
exports.RottenTomatoService = Montage.specialize(/** @lends RottenTomatoService# */ {
//TODO combine constructor and load
    constructor: {
        value: function RottenTomatoService() {
            this.super();
            this.categories = new RangeController().initWithContent([]);
            this.categories.avoidsEmptySelection = true;
        }
    },

    load: {
        value: function () {
            var self = this;

            self.latestBoxOffice = new CategoryController("Box Office", "box_office");
            self.upcoming = new CategoryController("Upcoming", "upcoming");
            self.topDvdRentals = new CategoryController("Rentals", "rentals");
            self.inTheaters = new CategoryController("In Theaters", "in_theaters");

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
                    self.loadTopDvdRentals(),
                    self.loadInTheaters()
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

            return sharedTransport.makeRequest(BOX_OFFICE_FEED, "rottenTomato")
            .then(function (response) {
                return response.movies;
            });
        }
    },

    loadUpcomingMovies: {
        value: function () {

            return sharedTransport.makeRequest(UPCOMING_FEED, "rottenTomato")
            .then(function (response) {
                return response.movies;
            });
        }
    },

    loadTopDvdRentals: {
        value: function () {

            return sharedTransport.makeRequest(TOP_RENTALS_FEED, "rottenTomato")
            .then(function (response) {
                return response.movies;
            });
        }

    },

    loadInTheaters: {
        value: function () {

            return sharedTransport.makeRequest(IN_THEATERS_FEED, "rottenTomato")
            .then(function (response) {
                return response.movies;
            });
        }
    }

});

exports.shared = new exports.RottenTomatoService();
