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

    didCreate: {
        value: function() {
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
    }

});
