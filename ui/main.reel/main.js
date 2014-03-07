/*global require*/

var Component = require("montage/ui/component").Component,
    RemoteMediator = require("core/remotemediator").RemoteMediator,
    AppData = require("core/appdata").AppData;

exports.Main = Component.specialize({

    appData: {
        value: AppData.create()
    },

    remoteMediator: {
        value: RemoteMediator.create()
    },

    categoryId: {
        value: null
    },

    _categoryButtonGroup: {
        value: null
    },

    _initialDataLoad: {
        value: null
    },

    constructor: {
        value: function Main () {
            this.application.addEventListener( "remoteDataReceived", this, false);
            this.application.addEventListener( "openTrailer", this, false);

            this.canDrawGate.setField("latestBoxofficeMovies", false);
            this._initialDataLoad = this.remoteMediator.load();
        }
    },

    templateDidLoad: {
        value: function () {
            var templateObjects = this.templateObjects,
                self = this;

            this._categoryButtonGroup = [
                templateObjects.latest,
                templateObjects.theaters,
                templateObjects.dvd,
                templateObjects.upcoming
            ];

            this._initialDataLoad.then(function () {
                self.dispatchEventNamed("initialDataReady", true);
                self.canDrawGate.setField("latestBoxofficeMovies", true);
                self.changeCategory("latestBoxofficeMovies");
            }).done();
        }
    },

    handleRemoteDataReceived: {
        value: function(event){
            this.appData[event.detail.type] = event.detail.data;
        }
    },

    handleOpenTrailer: {
        value: function (event) {
            var title = event.detail,
                popup = this.templateObjects.popup;

            this.remoteMediator.searchYoutubeTrailer(title, function (id) {
                popup.openTrailer(id);
            });
        }
    },

    handleCategoryButtonAction: {
        value: function (action) {
            this.changeCategory(action.target.category);
        }
    },

    changeCategory: {
        value: function (category) {
            var buttons = this._categoryButtonGroup;

            if (buttons) {
                this.categoryId = category;
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].pressed = (buttons[i].category === category);
                }
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

            window.scrollTo(0, 0);
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
