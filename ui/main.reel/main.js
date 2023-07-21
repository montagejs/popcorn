
var Component = require("montage/ui/component").Component,
    sharedMoviesService = require("core/tmdb-service").shared,
    defaultLocalizer = require("montage/core/localizer").defaultLocalizer,
    CacheManager = require('core/cache-manager').CacheManager,
    PushManager = require('core/push-manager').PushManager;

//TODO use details in toggle buttons
//TODO do not use matte toggle buttons
exports.Main = Component.specialize({

    constructor: {
        value: function Main () {
            
            this.initLocal();
            this.initCache();
            this.initPush();

            // Init App
            this.application.addEventListener( "openTrailer", this, false);
            this.canDrawGate.setField("moviesLoaded", false);
            this._initialDataLoad = this.moviesService.load();
        }
    },

    initLocal: {
        value: function () {
            var localeParam = this.getParameterByName('lang');
            if (localeParam) {
                defaultLocalizer.locale = localeParam;
            }
        }
    },

    initCache: {
        value: function () {
            // Add events
            CacheManager.events.error = function (error) {
                console.error('MainUpdate', 'error', error);
            };
            CacheManager.events.cached = function () {
                console.log('MainUpdate', 'up-to-date (cached)');
            };
            CacheManager.events.noUpdate = function () {
                console.log('MainUpdate', 'up-to-date (noUpdate)');
            };
            CacheManager.events.checking = function () {
                console.log('MainUpdate', 'checking');
            };
            CacheManager.events.updateReady = function () {
                console.log('MainUpdate', 'updateReady');
            };
            CacheManager.events.noupdate = function () {
                console.log('MainUpdate', 'noupdate');
            };
            CacheManager.confirmOnUpdateReady = true;
            CacheManager.listenToUpdate();
            CacheManager.checkForUpdate();
        }
    },

    initPush: {
        value: function () {
            PushManager.hasSubscription().then(function (hasSubscription) {
                if (!hasSubscription) {
                    return PushManager.subscribe().then(function (subscription) {
                        return PushManager.send(subscription, 'Welcome back!', {
                            // options goes here picture,badge,tag
                        }).then(function () {
                            return subscription;
                        });
                    });  
                } else {
                    // Already subscribed
                    return PushManager.getSubscription(function (subscription) {
                        return PushManager.send(subscription, 'Push notification enabled!', {
                            // options goes here picture,badge,tag
                        }).then(function () {
                            return subscription;
                        });
                    });
                }
            }).then(function (subscription) {
                console.info('Push Notification subscription', JSON.stringify(subscription));
            }).catch(function (err) {
                console.error('Push Notification Error', err);
            });
        }
    },

    getParameterByName: {
            value: function (name, url) {
            if (!url) {
                url = window.location.href;
            }

            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) {
                return null;
            } else if (!results[2]) {
                return '';
            } else {
                return decodeURIComponent(results[2].replace(/\+/g, " "));   
            }
        }
    },

    moviesService: {
        value: sharedMoviesService
    },

    _initialDataLoad: {
        value: null
    },

    templateDidLoad: {
        value: function () {
            var self = this;
            self._initialDataLoad.then(function () {
                self.canDrawGate.setField("moviesLoaded", true);
            }).done();
        }
    },

    handleOpenTrailer: {
        value: function (event) {
            var trailers = event.detail.trailers;
            //todo: filter video list with youtube trailer available.?

            if (trailers && trailers.youtube && trailers.youtube.length) {
                var videos = trailers.youtube,
                    video;

                for (var i = 0, length = videos.length; i < length; i++) {
                    video = videos[i];

                    if (video.name && video.name.toLowerCase().indexOf('official') > -1) {
                        break;
                    }
                }

                this.templateObjects.player.openTrailer(video.source);
            }
        }
    },

    /**
        iOS 7.0.x iPhone/iPod Touch workaround. After switching from portrait to landscape
        mode, Safari shows the content full screen. If the top or bottom of the content is
        clicked, navigation bars appear hiding content. This workaround reduces the height
        of the content.
    */
    _windowScroll: {
        value: function (self) {
            if ((window.innerHeight === window.outerHeight) || (window.innerHeight !== this._element.offsetHeight)) {
                window.scrollTo(0, 0);
                self.templateObjects.moviestrip.movieFlow.handleResize();
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
