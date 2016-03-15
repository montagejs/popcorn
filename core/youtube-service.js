/**
 * @module ./youtube-service
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage;

var sharedTransport = require("./jsonp-transport").shared;

var TRAILERS_FEED = "https://gdata.youtube.com/feeds/api/videos?q=%s+official+trailer&max-results=1&v=2&alt=json";

/**
 * @class YoutubeService
 * @extends Montage
 */
exports.YoutubeService = Montage.specialize(/** @lends YoutubeService# */ {

    constructor: {
        value: function YoutubeService() {
        }
    },

    searchYoutubeTrailer: {
        value: function (title) {
            var searchString = title.split(' ').join('+'),
                searchUrl = TRAILERS_FEED.replace("%s", searchString);

            return sharedTransport.makeRequest(searchUrl).then(function (response) {
                return response.feed.entry[0].media$group.yt$videoid.$t;
            });
        }

    }

});

exports.shared = new exports.YoutubeService();
