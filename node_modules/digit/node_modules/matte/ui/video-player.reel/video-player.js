"use strict";
/**
    @module montage/ui/video-player
    @requires montage
    @requires montage/ui/base/abstract-video
    @requires core/logger
    @requires core/event/action-event-listener
    @requires core/media-controller
*/
var Montage = require("montage").Montage,
    Bindings = require("montage/core/bindings").Bindings,
    logger = require("montage/core/logger").logger("video-player"),
    AbstractVideo = require("montage/ui/base/abstract-video").AbstractVideo,
    MediaController = require("montage/core/media-controller").MediaController,
    Converter = require("montage/core/converter/converter").Converter;

exports.PrettyTimeConverter = Montage.create(Converter, {
    convert: {
        value: function(time) {
            var sec, min, hour;
            time = parseInt(time, 10);
            if (isNaN(time) || time < 0)
                return "";
            sec = time % 60;
            min = Math.floor(time / 60) % 60;
            hour = Math.floor(time / 3600);
            return (hour > 0 ? hour + ":" : "") + (min < 10 ? "0"+min : min) + ":" + (sec < 10 ? "0"+sec : sec);
        }
    },
    revert: {
        value: function(value) {
            return value;
        }
    }
});

/**
 @class module:matte/ui/video-player.VideoPlayer
 */
exports.VideoPlayer = AbstractVideo.specialize(/** @lends module:matte/ui/video-player.VideoPlayer# */ {

    /*-----------------------------------------------------------------------------
    MARK:   Constants
    -----------------------------------------------------------------------------*/
/**
    The interval in milliseconds that the control panel is displayed without interaction before being hidden.
    @type {number}
    @default 5000
*/
    CONTROL_SHOW_TIME: { enumerable: true, value: 5000, writable: false },
    /*-----------------------------------------------------------------------------
    MARK:   Element Getters
    -----------------------------------------------------------------------------*/
    /**
        The DIV element used to display the play button in the media controller.
        @type {external:Element}
        @default null
    */
    playButton: { value: null, enumerable: false },

    /**
        The DIV element used to display the repeat button in the media controller.
        @type {external:Element}
        @default null
    */
    repeatButton: { value: null, enumerable: false },

    /**
        The DIV element used to display the volume level in the media controller.
        @type {external:Element}
        @default null
    */
    volumeLevel: { value: null, enumerable: false },

    /**
        The DIV element used to display the volume level in the media controller.
        @type {external:Element}
        @default null
    */
    controls: { value: null, enumerable: false },

    /**
        The DIV element used to display the  in the media controller.
        @type {external:Element}
        @default null
    */
    fullScreenPanel: { value: null, enumerable: false },
    /**
        Description TODO
        @type {external:Element}
        @default null
    */
    fullScreenButton: { value: null, enumerable: false },

    /*-----------------------------------------------------------------------------
    MARK:   Component References
    -----------------------------------------------------------------------------*/
    /**
        The Text component used to display the currently playing track's playback position.
        @type {module:montage/ui/text.Text}
        @default null
    */
    positionText: { value: null, enumerable: false },     /* montage/ui/text */

    /**
        The Text component used to display the currently playing track's duration.
        @type {module:montage/ui/text.Text}
        @default null
    */
    durationText: { value: null, enumerable: false },     /* montage/ui/text */

    /**
        The Slider component used to control the playback position.
        @type {module:montage/ui/slider.Slider}
        @default null
    */
    slider: { value: null, enumerable: false },           /* montage/ui/slider */
    /*-----------------------------------------------------------------------------
    MARK:   Properties
    -----------------------------------------------------------------------------*/
    


    
    /*-----------------------------------------------------------------------------
    MARK:   Event Handlers
    -----------------------------------------------------------------------------*/
    
    handlePlayButtonAction: {
        value: function() {
            if (this.videoController.status === this.videoController.PLAYING) {
                this.videoController.pause();
            } else if (this.videoController.status === this.videoController.PAUSED) {
                this.videoController.unpause();
            } else {
                this.videoController.play();
            }
        }
    },
    
    handleRewindButtonAction: {
        value: function() {
            this.videoController.rewind();
        }
    },
    
    handleFastForwardButtonAction: {
        value: function() {
            this.videoController.fastForward();
        }
    },
    
    handleDecreaseVolumeButtonAction: {
        value: function() {
            this.videoController.volumeDecrease();
        }
    },
    
    handleIncreaseVolumeButtonAction: {
        value: function() {
            this.videoController.volumeIncrease();
        }
    },

    handleMuteButtonAction: {
        value: function() {
            this.videoController.toggleMute();
        }
    },
    
    handleRepeatButtonAction: {
        value: function() {
            // TODO
        }
    },
    
    handleFullScreenButtonAction: {
        value: function() {
            this.toggleFullScreen()
        }
    },
    
    /*-----------------------------------------------------------------------------
    MARK:   UI Setters
    -----------------------------------------------------------------------------*/
    /**
        Determines whether video controls are hidden automatically.
        @type {Boolean}
        @default true
    */
    autoHide: { value: true },





    templateDidLoad: {
        value: function() {
            if(logger.isDebug) {
                logger.debug("VideoPlayer:templateDidLoad");
            }
        }
    },
    

    /*-----------------------------------------------------------------------------
    MARK:   Interaction
    -----------------------------------------------------------------------------*/
    /**
    Description TODO
    @private
    */
    _showControls: {
        value: true, enumerable: false
    },
    /**
    Description TODO
    @private
    */
    _hideControlsId: {
        value: null, enumerable: false
    },
    /**
    Description TODO
    @function
    @private
    */
    handleMouseup: {
        value: function() {
            this.showControlsForInterval();
        }
    },
    /**
    Description TODO
    @function
    @private
    */
    handleTouchend: {
        value: function() {
            this.showControlsForInterval();
        }
    },
    /**
    Displays the video player controlls for the interval specified by the CONTROL_SHOW_TIME property.
    @function
    */
    showControlsForInterval: {
        value: function() {
            this._showControls = true;
            this.needsDraw = true;

            var self = this;
            var hideControls = function() {
                self._showControls = false;
                self._hideControlsId = null;
                self.needsDraw = true;
            }

            if (this._hideControlsId) {
                window.clearTimeout(this._hideControlsId);
            }
            this._hideControlsId = window.setTimeout(hideControls, this.CONTROL_SHOW_TIME);
        }
    },

    
    /**
    @private
    */
    _installUserActionDetector: {
        value: function() {
            if (window.touch && this.autoHide) {
                this.element.addEventListener("touchstart", this, false);
            } else if (this.autoHide) {
                this.element.addEventListener("mouseup", this, false);
            }
        }
    },

    /**
    @private
    */
    enterDocument: {
        value: function(firstTime) {
            // Call super method
            if (AbstractVideo.enterDocument) {
                AbstractVideo.enterDocument.call(this, firstTime);
            }
            
            if (firstTime) {
                this._installUserActionDetector();

                if (!this.autoHide) {
                    this.element.style.paddingBottom = "50px";
                }
            }
        }
    },

    /**
    @private
    */
    draw: {
        value: function() {
            // Call super method
            if (AbstractVideo.draw) {
                AbstractVideo.draw.call(this);
            }
            
            var volumeWidth;
            // Handle loading
            if (this.videoController.status === this.videoController.EMPTY) {
                this.loadMedia();
            } else {
                // Handle playing
                if (this.videoController.status === this.videoController.PLAYING) {
                    if (!this.playButton.classList.contains('playing')) {
                        this.playButton.classList.add('playing');
                    }
                } else {
                    if (this.playButton.classList.contains('playing')) {
                        this.playButton.classList.remove('playing');
                    }
                }

                if (this.volumeLevel) {
                    volumeWidth = Math.floor(this.videoController.volume);
                    this.volumeLevel.style.width =  volumeWidth + "%";
                }

                if (this.videoController.repeat) {
                    if (!this.repeatButton.classList.contains("loop")) {
                        this.repeatButton.classList.add("loop");
                    }
                } else {
                    if (this.repeatButton.classList.contains("loop")) {
                        this.repeatButton.classList.remove("loop");
                    }
                }

                if (this._showControls) {
                    this.controls.classList.remove("hide-controls");
                    this.controls.classList.add("show-controls");
                } else {
                    this.controls.classList.remove("show-controls");
                    this.controls.classList.add("hide-controls");
                }

                if (this.supportsFullScreen) {
                    this.fullScreenPanel.classList.add("support-fullscreen");
                    this.fullScreenPanel.classList.remove("hide-fullscreen");
                    if (!this.isFullScreen) {
                        this.fullScreenButton.classList.add("enter-fullscreen");
                        this.fullScreenButton.classList.remove("exit-fullscreen");
                        this.element.classList.remove("fullscreen");
                    } else {
                        this.fullScreenButton.classList.add("exit-fullscreen");
                        this.fullScreenButton.classList.remove("enter-fullscreen");
                        this.element.classList.add("fullscreen");
                    }
                } else {
                    this.fullScreenPanel.classList.remove("support-fullscreen");
                    this.fullScreenPanel.classList.add("hide-fullscreen");
                    this.element.classList.remove("fullscreen");
                }
            }
        }
    }
});
