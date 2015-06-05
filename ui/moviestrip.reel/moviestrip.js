
var Component   = require("montage/ui/component").Component;

exports.Moviestrip = Component.specialize({

    constructor: {
        value: function Moviestrip () {
            this.super();

            this.application.addEventListener("keydown", this, false);
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

    _startChangeCategoryTransition: {
        value: function () {
            var self = this;

            this._detailsHidden = true;
            this._flowHidden = true;

            // wait .5s until the fade in/out effect is completed
            setTimeout( function () {
                // reset the flow to initial scroll position
                if (self.templateObjects && self.templateObjects.movieFlow) {
                    self.templateObjects.movieFlow.scroll = 0;
                }
                self._displayedContentController = self.categoryContentController;
                self._flowHidden = false;
                self._detailsHidden = false;
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
    },

    handleKeydown: {
        value: function(event) {
            //Ignore the event if it isn't an arrow key
            if (event.keyCode < 37 || event.keyCode > 40) {
                return;
            }

            var contentController = this.categoryContentController;
            var currentMovieIndex = contentController.content.indexOf(contentController.selection.one());
            
            //Don't change the selected movie if the flow animation is too far behind
            if (Math.abs(this.templateObjects.movieFlow.scroll - currentMovieIndex) > 1) {
                return;
            }
            
            //Left and down arrow
            if (event.keyCode === 37 || event.keyCode === 40) {
                if (currentMovieIndex < 1) {
                    //Can't scroll left if the first movie is already selected
                    return;
                }
               contentController.select(contentController.content[currentMovieIndex - 1]);
            }
            
            //Right and up arrow
            else if (event.keyCode === 39 || event.keyCode === 38) {
                if (currentMovieIndex >= contentController.content.length) {
                    //Can't scroll right if the last movie is already selected
                    return;
                }
                contentController.select(contentController.content[currentMovieIndex + 1]);
            }   
        }
    }
});
