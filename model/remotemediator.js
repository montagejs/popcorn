/*global require,alert,window,document*/

var Montage = require("montage/core/core").Montage;
var application = require("montage/core/application").application;

var API_KEY = "edvr96kp6mddwsasvmt269pw";

exports.Remotemediator = Montage.specialize({
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
            this.loadLatestBoxofficeMovies();
            this.loadUpcomingMovies();
            this.loadTopDvdRentals();
            this.loadInTheaters();
        }
    },

    jsonpCall: {
        value: function (url, callback) {
            var callbackName = "scriptCallback" + callback.uuid.replace(/-/g, "_"),
                script = document.createElement("script");

            window[callbackName] = function () {
                delete window[callbackName];
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                callback.apply(this, arguments);
            };

            script.type = 'text/javascript';
            script.src = url + "&callback=" + callbackName;
            // naughty...
            document.head.appendChild(script);
        }
    },

    searchYoutubeTrailer: {
        value: function (title, callback) {

            var searchString = title.split(' ').join('+'),
                 searchUrl = this.TRAILERS_FEED.replace("%s", searchString);

            this.jsonpCall(searchUrl, function (event) {
                callback(event.feed.entry[0].media$group.yt$videoid.$t);
            });
        }

    },

    loadLatestBoxofficeMovies: {
        value: function () {
            this.jsonpCall(this.BOXOFFICE_FEED, this.latestBoxofficeMoviesCallback);
        }
    },

    latestBoxofficeMoviesCallback: {
        value: function (event) {
            var movies = event.movies;
            if( !movies ){
                alert( "flixter api error, please try again" );
            } else {
                application.dispatchEventNamed("remoteDataReceived", true, true, { type: "latestBoxofficeMovies", data: movies });
            }
        }
    },

    loadUpcomingMovies: {
        value: function (){
            this.jsonpCall(this.UPCOMING_FEED, this.upcomingMoviesCallback);
        }
    },

    upcomingMoviesCallback: {
        value: function (event) {
            var movies = event.movies;
            if (!movies){
                alert( "flixter api error, please try again" );
            } else {
                application.dispatchEventNamed("remoteDataReceived", true, false, { type: "upcomingMovies", data: movies });
            }

        }
    },

    loadTopDvdRentals: {
        value: function () {
            this.jsonpCall(this.TOPRENTALS_FEED, this.topDvdRentalsCallback);
        }

    },

    topDvdRentalsCallback: {
        value: function (event) {
            var movies = event.movies;
            if (!movies){
                alert( "flixter api error, please try again" );
            } else {
                application.dispatchEventNamed("remoteDataReceived", true, false, { type: "topDvdRentals", data: movies });
            }

        }
    },

    loadInTheaters: {
        value: function () {
            this.jsonpCall(this.INTHEATERS_FEED, this.inTheatersCallback);
        }
    },

    inTheatersCallback: {
        value: function (event) {
            var movies = event.movies;
            if (!movies) {
                alert( "flixter api error, please try again" );
            } else {
                application.dispatchEventNamed("remoteDataReceived", true, false, { type: "inTheaters", data: movies });
            }
        }
    }
});
