
//
// Helpers
//
var ServiceWorker = require('./service-worker').ServiceWorker;

//
// CacheManager
// 

/*
switch (appCache.status) {
  case appCache.UNCACHED: // UNCACHED == 0
  case appCache.IDLE: // IDLE == 1
  case appCache.CHECKING: // CHECKING == 2
  case appCache.DOWNLOADING: // DOWNLOADING == 3
  case appCache.UPDATEREADY:  // UPDATEREADY == 4
  case appCache.OBSOLETE: // OBSOLETE == 5
  default:
    return 'UKNOWN CACHE STATUS';
};

// DANGER DOT NOT USE!!!
appCache.swapCache();
*/

var CacheManager = {

    supportServiceWorker: !!window.applicationCache,
    hasCacheManifest: !!document.querySelector('html').getAttribute('manifest'),
    cacheStaleEvents: ['checking', 'progress', 'updating', 'cached', 'noUpdate', 'updateReady'],

    // TODO construtor ?
    appCache: window.applicationCache,
    appUpdateTimer: null,

    options: {
        reloadOnUpdateReady: false,
        confirmOnUpdateReady: true,
        offlineWorkerScope: location.pathname,
        offlineWorkerFile: 'cache-worker.js',
        updateCheckInterval: 1000 * 60 * 15, // 15 minutes
        updateRetryInterval: 1000 * 60 * 15 * 2, // 30 minutes
    },

    events: {
        // checking|progress|updating|noUpdate|cached|updateReady
    },

    lastEventType: null,
    emit: function (eventType, event) {
        

        var that = this,
            isWorker = event && event.currentTarget !== that.appCache,
            opts = that.options,
            eventCache = that.events;
            
        // TODO remove debug
        //console.log('CacheManager', isWorker ? 'ServiceWorker' : 'ApplicationCache', eventType, event);

        if (typeof eventCache[eventType] === 'function') {
            eventCache[eventType](event);
        }

        if (that.lastEventType !== 'updateReady' && eventType === 'updateReady') {
            if (opts.confirmOnUpdateReady) {
                if (window.confirm('A new version is available. Install now!')) {
                    window.location.reload();
                }   
            } else if (opts.reloadOnUpdateReady) {
                window.location.reload();
            }
        }

        that.lastEventType = eventType;
    },

    isAppCacheStale: function () {
        var that = this,
            hasCacheManifest = that.hasCacheManifest,
            appCache = that.appCache;
        return hasCacheManifest && appCache && ( 
                appCache.status === appCache.UPDATEREADY ||
                    appCache.status === appCache.CHECKING ||
                        appCache.status === appCache.DOWNLOADING
                );
    },

    getCacheWorker: function () {
        var opts = this.options;
        return ServiceWorker.getWorkerRegistration(opts.offlineWorkerFile, { 
            scope: opts.offlineWorkerScope
        });
    },

    listenToUpdate: function () {

        var that = this,
            options = that.options,
            hasCacheManifest = that.hasCacheManifest,
            appCache = that.appCache;

        // TODO func on in constructor
        if (options.updateCheckInterval) {
            clearTimeout(that.appUpdateTimer);

            that.appUpdateTimer = setTimeout(function checkForUpdate() {
                that.checkForUpdate();
                if (options.updateRetryInterval) {
                    clearTimeout(that.appUpdateTimer);
                    that.appUpdateTimer = setTimeout(checkForUpdate, options.updateRetryInterval);
                }
            }, options.updateCheckInterval);
        }

        // Support serviceWorker
        if (ServiceWorker.supportServiceWorker && hasCacheManifest) {
            that.getCacheWorker().then(function (worker) {
                // TODO ServiceWorker.addEvent('type', func, worker) ?
                return ServiceWorker.getServiceWorker().then(function (serviceWorker) {
                    serviceWorker.addEventListener('message', function(event) {
                        if (
                            event.source && worker.active &&
                                event.source.scriptURL === worker.active.scriptURL
                        )  {
                            // Started|Updating|NoUpdate|Updated|Installed|Cached
                            var eventType = event.data;
                            // Forward error
                            if (eventType === 'error') {
                                that.emit('error', event);

                            // Ignore appCache duplicate event
                            } else if (
                                that.cacheStaleEvents.indexOf(eventType) !== -1 &&
                                    that.isAppCacheStale() === false
                            ) {
                                that.emit(eventType, event);
                            } 
                        }
                    });
                });
            }, that.emit.bind(that, 'error')); 
        }

        // Support applicationCache
        if (appCache) {

            // Trigger events on current state
            if (appCache.status === appCache.UPDATEREADY) {
                that.emit('updateReady', event);
            } else if (appCache.status === appCache.DOWNLOADING) {
                that.emit('downloading', event);
            } 

            // Fired after the first cache of the manifest.
            appCache.addEventListener('cached', that.emit.bind(that, 'cached'), false);

            // Checking for an update. Always the first event fired in the sequence.
            appCache.addEventListener('checking', that.emit.bind(that, 'checking'), false);

            // An update was found. The browser is fetching resources.
            appCache.addEventListener('downloading', that.emit.bind(that, 'downloading'), false);

            // The manifest returns 404 or 410, the download failed,
            // or the manifest changed while the download was in progress.
            appCache.addEventListener('error', that.emit.bind(that, 'error'), false);

            // Fired after the first download of the manifest.
            appCache.addEventListener('noupdate', that.emit.bind(that, 'noUpdate'), false);

            // Fired if the manifest file returns a 404 or 410.
            // This results in the application cache being deleted.
            appCache.addEventListener('obsolete', that.emit.bind(that, 'error'), false);

            // Fired for each resource listed in the manifest as it is being fetched.
            appCache.addEventListener('progress', that.emit.bind(that, 'progress'), false);

            // Fired when the manifest resources have been newly redownloaded.
            appCache.addEventListener('updateready', function (event) {
                if (appCache.status === appCache.UPDATEREADY) {
                    that.emit('updateReady', event);
                }
            }, false);   
        }
    },

    checkForUpdate: function () {
        var that = this,
            hasCacheManifest = that.hasCacheManifest,
            appCache = that.appCache;
        try {

            if (ServiceWorker.supportServiceWorker && hasCacheManifest) {
                that.getCacheWorker().then(function (worker) {
                    return ServiceWorker.sendWorkerMsg(worker, 'Update');
                });
            }

            if (
                // Ingore if invalid
                hasCacheManifest && appCache && appCache.update &&
                    // Do not try on UNCACHED state
                    appCache.status !== appCache.UNCACHED &&
                        // Keep UPDATEREADY and other state active
                        appCache.status !== appCache.UPDATEREADY &&
                            appCache.status !== appCache.CHECKING &&
                                appCache.status !== appCache.DOWNLOADING
            ) {
                appCache.update();   
            }
        } catch (err) {
            that.emit('error', err);
        }
    },

    clearCache: function () {
        var that = this,
            hasCacheManifest = that.hasCacheManifest,
            appCache = that.appCache;
        try {

            that.emit('progress');

            if (ServiceWorker.supportServiceWorker) {
                that.getCacheWorker().then(function (worker) {
                    return ServiceWorker.sendWorkerMsg(worker, 'CacheClear').finally(function () {
                        // Uninstall worker
                        return worker.unregister();
                    });
                });
            }

            if (
                // Ingore if invalid
                hasCacheManifest && appCache && appCache.abort &&
                    // Do not try on UNCACHED state
                    appCache.status !== appCache.UNCACHED
            ) {
                appCache.abort();   
            }

            that.emit('uncached');

        } catch (err) {
            that.emit('error', err);
        }
    }
};

exports.CacheManager = CacheManager;

// Expose for debug
// TODO remove 
window.checkForUpdate = CacheManager.checkForUpdate.bind(CacheManager);
window.clearCache = CacheManager.clearCache.bind(CacheManager);

exports.eventCache = CacheManager.events;
exports.listenToUpdate = CacheManager.listenToUpdate.bind(CacheManager);
exports.clearCache = CacheManager.clearCache.bind(CacheManager);
exports.checkForUpdate = CacheManager.checkForUpdate.bind(CacheManager);