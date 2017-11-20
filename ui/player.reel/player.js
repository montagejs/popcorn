
var Component = require("montage/ui/component").Component;

var YouTube, YoutubeCallBack;

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    YouTube = YT;
};

exports.Player = Component.specialize({

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                if (typeof YouTube !== "undefined") {
                    this._initPlayer();
                } else {
                    //just one player in the popcorn app should be good enough
                    YoutubeCallBack = this._initPlayer.bind(this);
                }
            }
        }
    },

    _initPlayer: {
        value: function () {
            var self = this;

            this.player = new YouTube.Player('youtube-player', {
                    events: {
                    'onReady': function () {
                        self.isPlayerReady = true;

                        if (self._trailerId !== null) {
                            //load pending trailer
                            self.player.loadVideoById(self._trailerId);
                        }
                    }
                }
            });
        }
    },

    isPlayerReady: {
        value: false
    },

    player: {
        value: null
    },

    handleCloseButtonAction: {
        value: function () {
            this.player.stopVideo();

            this.templateObjects.overlay.hide();
        }
    },

    _trailerId: {
        value: null
    },

    openTrailer: {
        value: function (id) {
            this._trailerId = id;
            this.templateObjects.overlay.show();
        }
    },

    didShowOverlay: {
        value: function (overlay) {
            // if the player is not ready yet,
            // the video will be played automatically once the event onReady will be raised.
            // see -> _initPlayer function
            // todo: need UI when waiting.
            if (this.isPlayerReady && this._trailerId) {
                this.player.loadVideoById(this._trailerId);
            }

            overlay.classList.add('is-shown');
        }
    },

    didHideOverlay: {
        value: function (overlay) {
            this._trailerId = null;

            overlay.classList.remove('is-shown');
        }

    }
    
});
