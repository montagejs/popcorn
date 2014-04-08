/**
    module:"matte/ui/progress.reel"
*/
var NativeProgress = require("native/ui/progress.reel").Progress;
/**
    @class module:matte/ui/progress.Progress
    @extends module:native/ui/progress.NativeProgress
*/
exports.Progress = NativeProgress.specialize(/** @lends module:"matte/ui/progress.reel".Progress# */ {

    hasTemplate: {value: true},

/**
  Description TODO
  @private
*/
    _barElement: {
        enumerable: false,
        value: null
    },
/**
  Description TODO
  @private
*/
    _value: {
        enumerable: false,
        value: 0
    },
/**
        Description TODO
        @type {Function}
        @default {Number} 0
    */
    value: {
        get: function() {
            return this._value;
        },
        set: function(val) {
            if(val !== this._value) {
                this._value = typeof val === "string" ? parseInt(val, 10) : val;

                if(this._max && (this._value > this._max)) {
                    this._value = this._max;
                }
                if(this._value < 0) {
                    this._value = 0;
                }
                this.needsDraw = true;
            }
        }
    },
/**
  Description TODO
  @private
*/
    _max: {
        enumerable: false,
        value: 100
    },
/**
        Description TODO
        @type {Function}
        @default {Number} 100
    */
    max: {
        get: function() {
            return this._max;
        },
        set: function(val) {
            if(val !== this._max) {
                this._max = typeof val === "string" ? parseInt(val, 10) : val;
                if(this._max <= 0) {
                    this._max = 1; // Prevent divide by zero errors
                }
                this.needsDraw = true;
            }
        }
    },

    constructor: {
        value: function Progress() {
            this.super();
        }
    },

/**
    Description TODO
    @function
    */
    draw: {
        enumerable: false,
        value: function() {
            var ratio = this._value / this._max;
            // constrain to interval [0, 1]
            ratio = Math.min(Math.max(ratio, 0), 1);
            // map into [0, 100]
            var percentage = ratio * 100;
            this._barElement.style.width = percentage + '%';
        }
    }
});
