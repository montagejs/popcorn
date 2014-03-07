/*global require*/

var Montage = require("montage").Montage;

exports.AppData = Montage.specialize({
    latestBoxOfficeMovies: {
        value: null
    },

    upcomingMovies: {
        value: null
    },

    topDvdRentals: {
        value: null
    },

    inTheaters: {
        value: null
    }
});
