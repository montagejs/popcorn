/*global require*/

var Component   = require("montage/ui/component").Component,
    RangeController = require("montage/core/range-controller").RangeController;

exports.Facadeflow = Component.specialize({
    constructor: {
        value: function Facadeflow () {
            var controller = RangeController.create();
            controller.defineBinding("content", {"<-": "category", source: this});
            this.buttonController = controller;
            this.application.addEventListener( "initialDataReady", this, false);
        }
    },

    selectedMovie: {
        value: null
    },

    _scroll: {
        value: null
    },

    scroll: {
        set: function (val) {
            this._scroll = val;
            if ( val%1 === 0 && this.category ) {
                this.selectedMovie = this.category[val];
                this.detailsFadeIn = true;
                this.detailsFadeOut = false;
                this.needsDraw = true;
            } else if ( val%1 !== 0 && this.category ){
                this.detailsFadeOut = true;
                this.detailsFadeIn = false;
                this.needsDraw = true;
            }
        },
        get: function () {
            return this._scroll;
        }
    },

    _fadeIn: {
        value: false
    },

    _fadeOut: {
        value: false
    },

    latestBoxofficeMovies: {
        value: null
    },

    upcomingMovies: {
        value: null
    },

    inTheaters: {
        value: null
    },

    topDvdRentals: {
        value: null
    },

    category: {
        value: null
    },

    buttonController: {
        value: null
    },

    _switchValue: {
        value: null
    },

    switchValue: {
        set: function (val) {
            this._switchValue = val;
        },
        get: function () {
            return this._switchValue;
        }
    },

    _categoryId: {
        value: null
    },
    categoryId: {
        get: function () {
            return this._categoryId;
        },
        set: function (value) {
            if (value) {
                this._categoryId = value;
                this._changeCategory(value);
            }
        }
    },

    _changeCategory: {
        value: function (categoryId) {
            var self = this;

            this.detailsFadeOut = true;
            this._fadeOut = true;
            this.needsDraw = true;
            // wait .5s until the fade out effect is completed
            setTimeout( function () {
                if (self.templateObjects && self.templateObjects.flow) {
                    self.templateObjects.flow.scroll = 0;
                }
                self.category = self[categoryId];
                self.selectedMovie = self.category[0];
                self._fadeIn = true;
                self._fadeOut = false;
                self.detailsFadeIn = true;
                self.detailsFadeOut = false;
                self.needsDraw = true;

            }, 800 );
        }
    },

    handleInitialDataReady: {
        value: function () {
            // do it manually to avoid fade out effect
            this.category = this.latestBoxofficeMovies;
            this.selectedMovie = this.category[0];
            this.detailsFadeIn = true;
            this._fadeIn = true;
            this.needsDraw = true;
        }
    },

    draw: {
        value: function () {
            var flow = this.templateObjects.flow,
                details = this.details;

            if( this._fadeIn ){
                flow.element.classList.remove( 'flow-fade-out');
                this._fadeIn = false;
            }

            if( this._fadeOut ){
                flow.element.classList.add( 'flow-fade-out');
                this._fadeOut = false;
            }

            if( this.detailsFadeIn ){
                details.element.classList.remove('details-fade-out');
                this.detailsFadeIn = false;
            }

            if( this.detailsFadeOut ){
                if( details.element.classList.contains('details-fade-out') === false ){
                    details.element.classList.add('details-fade-out');
                }
                this.detailsFadeOut = false;
            }

        }
    }

});
