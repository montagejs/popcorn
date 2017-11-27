
var Component   = require("montage/ui/component").Component,
    KeyComposer = require("montage/composer/key-composer").KeyComposer;

exports.Moviestrip = Component.specialize({

    constructor: {
        value: function Moviestrip () {
            this.super();
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this.movieDetails.defineBinding(
                    "classList.has('details-fade-out')",
                    {
                        "<-": "$self._detailsHidden",
                        parameters: { self: this }
                    }
                );

                this.templateObjects.keyUp.addEventListener("keyPress", this, false);
                this.templateObjects.keyDown.addEventListener("keyPress", this, false);
                this.templateObjects.keyKeft.addEventListener("keyPress", this, false);
                this.templateObjects.keyRight.addEventListener("keyPress", this, false);
            }
        }
    },

    handleKeyPress: {
        value: function(event) {
            var contentController = this.categoryContentController;
            var currentMovieIndex = contentController.content.indexOf(contentController.selection.one());

            // Don't change the movie if the flow animation is too far behind
            if (Math.abs(this.templateObjects.movieFlow.scroll - currentMovieIndex) > 1) {
                return;
            }

            if (event.identifier === "next") {
                if (currentMovieIndex >= contentController.content.length) {
                    return;
                }
                contentController.select(contentController.content[currentMovieIndex + 1]);
            }
            if (event.identifier === "previous") {
                if (currentMovieIndex < 1) {
                    return;
                }
                contentController.select(contentController.content[currentMovieIndex - 1]);
            }
        }
    },

    _categoryContentController: {
        value: null
    },

    _movieFlow: {
        value: null
    },

    movieFlow: {
        get: function () {
            return this._movieFlow;
        },
        set: function (value) {
            var self = this;
            this._movieFlow = value;
            this._movieFlow.addEventListener("transitionend", function() {
                self._flowHiddenCallback();
                clearTimeout(this._flowHiddenCallbackTimeout);
            },false);
        }
    },

    categoryContentController: {
        get: function () {
            return this._categoryContentController;
        },
        set: function (value) {
            if (value == null) { return; }
            this._categoryContentController = value;
            if (this._categoryContentController == null) {
                // first time
                this._displayedContentController = this._categoryContentController;
                this._flowHidden = false;
            } else {
                this._startChangeCategoryTransition();
            }
        }
    },

    _displayedContentController: {
        value: null
    },

    _flowHiddenCallback: {
        value: function () {
            // reset the flow to initial scroll position
            if (this.movieFlow) {
                this.movieFlow.scroll = 0;
            }
            this._displayedContentController = this.categoryContentController;
            this._flowHidden = false;
            this._detailsHidden = false;
        }
    },
    _flowHiddenCallbackTimeout: {
        value: null
    },


    _startChangeCategoryTransition: {
        value: function () {
            var self = this;

            this._detailsHidden = true;
            this._flowHidden = true;
            this._categoryContentController.select(this._categoryContentController.content[0]);

            // wait .5s until the fade in/out effect is completed
            this._flowHiddenCallbackTimeout = setTimeout( function() {
                self._flowHiddenCallback();
            }, 800 );
        }
    },

    movieFlowDidTranslateStart: {
        value: function () {
            this._detailsHidden = true;
        }
    },

    movieFlowDidTranslateEnd: {
        value: function (flow) {
            var scroll = Math.round(flow.scroll);
            if(this._displayedContentController) {
                this._displayedContentController.select(this._displayedContentController.content[scroll]);
            }
            this._detailsHidden = false;
        }
    },

    _flowHidden: {
        value: false
    },

    _detailsHidden: {
        value: false
    }

});
