var Component = require("montage/ui/component").Component;
var Promise = require('montage/core/promise').Promise;

exports.Image = Component.specialize({

    _src: {
        value: null
    },

    _label: {
        value: null
    },

    src: {
        set: function (value) {
            if (value !== this._src) {
                this._src = value;
                this.needsDraw = true;
            }
        }
    },

    label: {
        set: function (value) {
            if (value !== this._label) {
                this._label = value;
                this.needsDraw = true;
            }
        }
    },

    _loadImage: {
        value: (function () {
            var images = {};
            return function (url) {
                if (!images.hasOwnProperty(url)) {
                    var defer = Promise.defer();
                    var img = new Image();
                    img.onload = function () {
                        defer.resolve(url);
                    };
                    img.onerror = function () {
                        defer.reject(url);
                    };
                    img.src = url;
                    images[url] = defer.promise;
                }
                return images[url];
            }
        }()),
    },

    draw: {
        value: function () {

            var self = this,
                element = self._element;

            element.setAttribute('title', self._label);
            element.setAttribute('alt', self._label);

            if (self._src) {
                element.style.backgroundImage = "url(assets/image/loading-poster.gif)";
                element.style.backgroundSize = 'auto';
                self._loadImage(self._src).then(function () {
                    element.style.backgroundImage = "url(" + self._src + ")";
                }).catch(function () {
                    element.style.backgroundImage = "url(assets/image/no-poster.jpg)";
                }).finally(function () {
                    element.style.backgroundSize = '';
                });
            } else {
                element.style.backgroundImage = "url(assets/image/no-poster.jpg)";
            }
        }
    }

});
