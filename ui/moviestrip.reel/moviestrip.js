
var Component   = require("montage/ui/component").Component;

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
            this._movieFlow = value;
            this._movieFlow.addEventListener("transitionend", function() {
                self._flowHiddenCallback();
                cancelTimeout(this._flowHiddenCallbackTimeout);
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
