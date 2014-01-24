/**
    @module "ui/main.reel"
    @requires montage
    @requires montage/ui/component
*/
var Montage = require("montage").Montage,
    Component = require("montage/ui/component").Component,
    Remotemediator = require("model/remotemediator").Remotemediator,
    AppData = require("model/appdata").AppData;

/**
    Description TODO
    @class module:"ui/main.reel".Main
    @extends module:ui/component.Component
*/
exports.Main = Montage.create(Component, /** @lends module:"ui/main.reel".Main# */ {

    appData: {
        value: AppData.create()
    },

    remoteMediator: {
        value: Remotemediator.create()
    },

    categoryId: {
        value: null
    },

    _categoryButtonGroup: {
        value: null
    },

    constructor: {
        value: function Main() {
            this.application.addEventListener( "remoteDataReceived", this, false);
            this.application.addEventListener( "openTrailer", this, false);

            this.canDrawGate.setField("latestBoxofficeMovies", false);

            this.remoteMediator.load();
        }
    },

    templateDidLoad: {
        value: function() {
            var templateObjects = this.templateObjects;

            this._categoryButtonGroup = [
                templateObjects.latest,
                templateObjects.theaters,
                templateObjects.dvd,
                templateObjects.upcoming
            ];
        }
    },

    handleRemoteDataReceived: {
        value: function(event){
            var data = event.detail.data,
                type = event.detail.type;

            this.appData[type] = data;

            if( type === "latestBoxofficeMovies" ){
                this.canDrawGate.setField("latestBoxofficeMovies", true);
                this.dispatchEventNamed("dataReceived", true);
                this.changeCategory(type);
            }
        }
    },

    handleOpenTrailer: {
        value: function(event) {
            var title = event.detail,
                popup = this.templateObjects.popup;

            this.remoteMediator.searchYoutubeTrailer(title, function(id) {
                popup.openTrailer(id);
            });
        }
    },

    handleCategoryButtonAction: {
        value: function(action) {
            this.changeCategory(action.target.category);
        }
    },

    changeCategory: {
        value: function(category) {
            var buttons = this._categoryButtonGroup;

            this.categoryId = category;
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].pressed = (buttons[i].category === category);
            }
        }
    },

    /**
        iOS 7.0.x iPhone/iPod Touch workaround. After switching from portrait to landscape
        mode, Safari shows the content fullscreen. If the top or bottom of the content is
        clicked, navigations bars appear hiding content. This workaround reduces the height
        of the content.
    */
    _windowScroll: {
        value: function (self) {
            if ((window.innerHeight === window.outerHeight) || (window.innerHeight !== this._element.offsetHeight)) {
                window.scrollTo(0, 0);
                self.templateObjects.facadeflow.flow.handleResize();
                window.clearTimeout(self._windowScrollTimeout);
                self._windowScrollTimeout = window.setTimeout(function () {
                    self._windowScroll(self);
                }, 700);
            }
        }
    },

    /**
        iOS 7.0.x iPhone/iPod Touch workaround
    */
    _windowScrollTimeout: {
        value: null
    },

    handleOrientationchange: {
        value: function () {
            var self = this;

            // iOS 7.0.x iPhone/iPod Touch workaround
            if (navigator.userAgent.match(/(iPhone|iPod touch);.*CPU.*OS 7_0_\d/i)) {
                window.clearTimeout(this._windowScrollTimeout);
                if (Math.abs(window.orientation) === 90) {
                    self._windowScrollTimeout = window.setTimeout(function () {
                        self._windowScroll(self);
                    }, 1000);
                }
            }
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                window.addEventListener("orientationchange", this, false);
            }
        }
    }

});
