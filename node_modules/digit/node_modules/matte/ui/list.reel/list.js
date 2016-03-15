/**
	@module "matte/ui/list.reel"
*/
var Component = require("montage/ui/component").Component,
    observeProperty = require("montage/frb/observers").observeProperty;

var deprecationWarning = require("montage/core/deprecate").deprecationWarning;

/**
 @class module:"matte/ui/list.reel".List
 @extends module:montage/ui/component.Component
 */
exports.List = Component.specialize(/** @lends module:"matte/ui/list.reel".List# */ {

    constructor: {
        value: function List () {
            this.super();

            this.defineBinding("_repetition.content", {"<-": "content"});

            // Only use a contentController if content is not defined
            this.defineBinding("content.defined() ? null : _repetition.contentController", {
                "<-": "contentController"
            });

        }
    },

    templateDidLoad: {
        value: function() {
            this._scroller.addOwnPropertyChangeListener("scrollY", this);
            this._scroller.addOwnPropertyChangeListener("_maxTranslateY", this);
        }
    },


    /**
      Description TODO
      @private
    */
    _repetition: {
        value: null
    },

    _scroller: {
        value: null
    },

    /**
        Description TODO
        @type {Property}
        @default null
    */
    delegate: {
        value: null
    },

    content: {value: null},

    contentController: {value: null},

    axis: {
        value: null
    },

/**
  Description TODO
  @private
*/
    isSelectionEnabled: {
        value: null
    },

    /**
     * Threshold at which the list will fire a "listEnd" event. This is the ratio of
     */
    listEndEventThreshold: {
        value: 1
    },

    // Initialization

    // TODO we should probably support the programmatic initialization of a list; forwarding the childComponents
    // along to the repetition
    // I want to say that if somebody knows enough to do that they know enough to append the child components' elements
    // into the repetition, not the list

    observeProperty: {
        value: function (key, emit, source, parameters, beforeChange) {
            if (key === "objectAtCurrentIteration" || key === "currentIteration") {
                deprecationWarning(key,":iteration.object");
                if (this._repetition) {
                    return this._repetition.observeProperty(key, emit, source, parameters, beforeChange);
                }
            } else {
                return observeProperty(this, key, emit, source, parameters, beforeChange);
            }
        }
    },

    _fireEndEvent: {
        value: function() {
            this.dispatchEventNamed("listEnd");
        }
    },

    handlePropertyChange: {
        value: function(changeValue, key, object) {
            if (key === "scrollY" || key === "_maxTranslateY") {
                if (this._scroller && object === this._scroller) {
                    if (this._scroller.scrollY >= (this._scroller._maxTranslateY * this.listEndEventThreshold) && this._scroller._maxTranslateY > 0) {
                        this._fireEndEvent();
                    }
                }
            }
        }
    }

});
