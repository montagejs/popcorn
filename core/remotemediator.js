/*global require,alert,window,document*/

var Montage = require("montage/core/core").Montage;
var application = require("montage/core/application").application;
var Promise = require("montage/core/promise").Promise;
var uuidGenerate = require("montage/core/uuid").generate;

var API_KEY = "edvr96kp6mddwsasvmt269pw";

exports.RemoteMediator = Montage.specialize({
    TRAILERS_FEED: {
        value: "https://gdata.youtube.com/feeds/api/videos?q=%s+official+trailer&max-results=1&v=2&alt=json"
    },

    BOXOFFICE_FEED: {
        value: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?limit=15&country=us&apikey=" + API_KEY
    },

    UPCOMING_FEED: {
        value: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?page_limit=30&page=1&country=us&apikey=" + API_KEY
    },

    TOPRENTALS_FEED: {
        value: "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?limit=20&country=us&apikey=" + API_KEY
    },

    INTHEATERS_FEED: {
        value: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=30&page=1&country=us&apikey=" + API_KEY
    },

    load: {
        value: function () {
            var boxOfficePromise = this.loadLatestBoxofficeMovies();
            this.loadUpcomingMovies().done();
            this.loadTopDvdRentals().done();
            this.loadInTheaters().done();

            return boxOfficePromise;
        }
    },

    jsonpCall: {
        value: function (url) {
            var callbackName = "scriptCallback" + uuidGenerate().replace(/-/g, "_"),
                script = document.createElement("script"),
                deferredResponse = Promise.defer();

            window[callbackName] = function (data) {
                delete window[callbackName];
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                deferredResponse.resolve(data);
            };

            script.onerror = function(error) {
                deferredResponse.reject(error);
            };

            script.type = 'text/javascript';
            script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callbackName;
            document.head.appendChild(script);

            return deferredResponse.promise;

        }
    },

    xhrCall: {
        value: function (url) {
            var deferredResponse = Promise.defer();

            var xhr = new XMLHttpRequest();

            xhr.open("GET", url, true);
            xhr.responseType = "json";

            xhr.onload = function () {
                try {
                    if (200 === this.status) {
                        deferredResponse.resolve(typeof this.response === "string" ? JSON.parse(this.response) : this.response);
                    } else {
                        deferredResponse.reject(new Error(this.status + ": " + this.response));
                    }
                } catch(error) {
                    console.log("Error loading the feed: " , error);
                    deferredResponse.reject(new Error("Error loading the feed: " + error));
                }
            };

            xhr.onerror = function(event) {
                console.log("Error loading the feed: " , event);
                deferredResponse.reject(new Error("Error loading the feed: " + event));
            };

            xhr.onabort = function(event) {
                console.log("Abort loading the feed: " , event);
                deferredResponse.reject(new Error("Abort loading the feed: " + event));
            };

            xhr.send();
            return deferredResponse.promise;
        }
    },

    searchYoutubeTrailer: {
        value: function (title, callback) {

            var searchString = title.split(' ').join('+'),
                searchUrl = this.TRAILERS_FEED.replace("%s", searchString);

            this.jsonpCall(searchUrl).then(function (response) {
                callback(response.feed.entry[0].media$group.yt$videoid.$t);
            }).done();
        }

    },

    loadLatestBoxofficeMovies: {
        value: function () {
            return this.jsonpCall(this.BOXOFFICE_FEED)
                .then(function (response) {
                    return response.movies;
                }).then(function (movies) {
                    application.dispatchEventNamed("remoteDataReceived", true, true, {
                        type: "latestBoxofficeMovies",
                        data: movies
                    });
                });
        }
    },

    loadUpcomingMovies: {
        value: function () {
            return this.jsonpCall(this.UPCOMING_FEED)
                .then(function (response) {
                    return response.movies;
                }).then(function (movies) {
                    application.dispatchEventNamed("remoteDataReceived", true, true, {
                        type: "upcomingMovies",
                        data: movies
                    });
                });
        }
    },

    loadTopDvdRentals: {
        value: function () {
            return this.jsonpCall(this.TOPRENTALS_FEED)
                .then(function (response) {
                    return response.movies;
                }).then(function (movies) {
                    application.dispatchEventNamed("remoteDataReceived", true, true, {
                        type: "topDvdRentals",
                        data: movies
                    });
                });
        }

    },

    loadInTheaters: {
        value: function (){
            return this.jsonpCall(this.INTHEATERS_FEED)
                .then(function (response) {
                    return response.movies;
                }).then(function (movies) {
                    application.dispatchEventNamed("remoteDataReceived", true, true, {
                        type: "inTheaters",
                        data: movies
                    });
                });
        }
    }
});
