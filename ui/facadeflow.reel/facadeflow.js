
var Component   = require("montage/ui/component").Component;

//TODO rename to Movie List
exports.Facadeflow = Component.specialize({
    constructor: {
        value: function Facadeflow () {
//            var controller = new RangeController();
//            controller.defineBinding("content", {"<-": "category", source: this});
            this.defineBinding("selectedMovie", {"<-": "categoriesController.selection.one()"});
//            this.categoriesController = controller;
            this.application.addEventListener( "initialDataReady", this, false);
        }
    },

    _selectedMovie: {
        value: null
    },

    selectedMovie: {
        get: function () {
            return this._selectedMovie;
        },
        set: function (value) {
            this._selectedMovie = value;
        }
    },

    _scroll: {
        value: null
    },

    scroll: {
        set: function (val) {
            this._scroll = val;
            if ( val%1 === 0 ) {
                this.detailsFadeIn = true;
                this.detailsFadeOut = false;
                this.needsDraw = true;
            } else if ( val%1 !== 0 ){
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

    latestBoxOffice: {
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

    _contentController: {
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

    _categoryContentController: {
        value: null
    },

    categoryContentController: {
        get: function () {
            return this._categoryContentController;
        },
        set: function (value) {
            if (value == null) { return; }
            if (this._categoryContentController == null) {
                // first time
                this._categoryContentController = value;
                this._contentController = value;
                this.detailsFadeIn = true;
                this._fadeIn = true;
                this.needsDraw = true;
            } else {
                this._categoryContentController = value;
                //TODO change _changeCategory() name
                this._changeCategory();
            }
        }
    },

    _changeCategory: {
        value: function () {
            var self = this;

            this.detailsFadeOut = true;
            this._fadeOut = true;
            this.needsDraw = true;
            // wait .5s until the fade out effect is completed
            setTimeout( function () {
                if (self.templateObjects && self.templateObjects.flow) {
                    self.templateObjects.flow.scroll = 0;
                }
                //TODO rename this _contentController isn't descriptive
                self._contentController = self.categoryContentController;
                self._fadeIn = true;
                self._fadeOut = false;
                self.detailsFadeIn = true;
                self.detailsFadeOut = false;
                self.needsDraw = true;

            }, 800 );
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
