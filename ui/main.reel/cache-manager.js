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

function defer() {
    var deffered = {};
    deffered.promise = new Promise(function (resolve, reject) {
        deffered.resolve = resolve;
         deffered.reject = reject;
    });
    return deffered;
}

var hasCacheManifest = !!document.querySelector('html').getAttribute('manifest'),
    appCache = window.applicationCache;

var serviceWorker = window.navigator.serviceWorker,
    offlineWorkerScope = '/',
    offlineWorkerFile = 'cache-worker.js';

var appUpdateTimer,
    updateCheckInterval = 1000 * 60 * 15, // 15 minutes
    updateRetryInterval = updateCheckInterval * 2; // 30 minutes

var eventCache = {
    emit: function (eventType, event, data) {
    	var isWorker = typeof data !== 'object';
        console.log('EventCache', isWorker ? 'ServiceWorker' : 'applicationCache', eventType);
        if (typeof eventCache[eventType] === 'function') {
            eventCache[eventType](event, data);
        }
    }
};

function getWorkerRegistrations() {
    if (typeof serviceWorker.getRegistrations === 'function') {
        return Promise.resolve(serviceWorker.getRegistrations());
    } else if (typeof serviceWorker.getRegistration === 'function') {
        return serviceWorker.getRegistration().then(function (registration) {
            return [registration];
        });
    } else {
        return Promise.resolve(new Error('ServiceWorker Not Supported'));
    }
}

function parseURI(url) {

    // Parse current url
    var uri = window.document.createElement('a');
    uri.href = url;

    return {
        href: uri.href,
        protocol: uri.protocol,
        host: uri.host,
        path: uri.pathname,
        hash: uri.hash ? String(uri.hash).substr(1) : uri.hash,
        search: uri.search ? String(uri.search).substr(1) : uri.search,
        toString: function () {
            return uri.href.toString();
        }
    };
};

function getServiceWorker(path, opts, disableAutoRegister) {	
	return getWorkerRegistrations().then(function (workerRegistrations) {

	    var registration = null;
    	var workerURI = parseURI(path);

	    if (workerRegistrations && workerRegistrations.length > 0) {

	        var tmpRegistration,
	            tmpRegistrations = workerRegistrations.slice();
	        do {    

	            tmpRegistration = tmpRegistrations.shift();
	            // Match workerURI
	            if (
	                tmpRegistration &&
	                    tmpRegistration.active && tmpRegistration.active.scriptURL &&
	                            String(workerURI) === String(tmpRegistration.active.scriptURL)
	            ) {
	                // Remove duplicate
	                if (registration !== null) {
	                    tmpRegistration.unregister();

	                // Save match
	                } else {
	                    registration = tmpRegistration;
	                }
	            }

	        } while(tmpRegistrations.length > 0);
	    }

	    if (registration !== null) {
	        return Promise.resolve(registration);
	    } else if (disableAutoRegister === true) {
	        return Promise.reject(new Error('ServiceWorker Not Found'));
	    } else {
	        return registerWorker(path, opts);   
	    }
    });
}

function getCacheWorker() {
    return getServiceWorker(offlineWorkerFile, { 
        scope: offlineWorkerScope
    });
}

function registerWorker(path, opts) {
    return serviceWorker.register(path, opts || { 
        scope: path 
    }).then(function (registration) {
        if (registration.update) {
            return registration.update().then(function (newRegistration) {
                return newRegistration || registration;
            }, function () {
                return registration;
            });
        } else {
            return registration;
        }
    });
}
    
function sendWorkerMsg(msg, worker) {
    var deferred = defer();

    if (worker) {
        if (worker.active) {
            worker.active.postMessage(msg);
            deferred.resolve({
                data: msg,
                worker: worker
            });
        } else {
            deferred.reject(new Error('NOT_ACTIVE'));
        }
    } else {
        return getServiceWorker().then(function (serviceWorker) {

            // Send message to service worker along with port for reply
            serviceWorker.ready.then(function () {
                if (!serviceWorker.controller) {
                    deferred.reject(new Error('NOT_SUPPORTED'));
                } else {
                       
                    // Create a Message Channel
                    var channel = new MessageChannel();

                    // Handler for recieving message reply from service worker
                    channel.port1.onmessage = function(event){
                        if(event.data.error){
                            deferred.reject(event.data.error);
                        }else{
                            deferred.resolve(event.data);
                        }
                    };

                    serviceWorker.controller.postMessage(msg, [channel.port2]);
                }
            }, deferred.reject);
        }, deferred.reject);   
    }

    return deferred.promise;
}

function isAppCacheStale() {
    return hasCacheManifest && appCache && ( 
            appCache.status === appCache.UPDATEREADY ||
                appCache.status === appCache.CHECKING ||
                    appCache.status === appCache.DOWNLOADING
            );
}

function listenToUpdate() {

    // Support serviceWorker
    if (serviceWorker) {
		var cacheStaleEvents = ['checking', 'progress', 'updating', 'cached', 'noUpdate', 'updateReady'];
        getCacheWorker().then(function (worker) {
            serviceWorker.addEventListener('message', function(event) {
                if (
                    event.source && event.source.scriptURL === worker.active.scriptURL
                )  {
                    // Started|Updating|NoUpdate|Updated|Installed|Cached
                    var eventType = event.data;
                    // Forward error
                    if (eventType === 'error') {
                        eventCache.emit('error', event);

                    // Ignore appCache duplicate event
                    } else if (
                        cacheStaleEvents.indexOf(eventType) !== -1 &&
                            isAppCacheStale() === false
                    ) {
                        eventCache.emit(eventType, event);
                    } 
                }
            });
        }, function (offlineWorerError) {
           eventCache.emit('error', offlineWorerError);
        }); 
    }

    // Support applicationCache
    if (appCache) {

        // Fired after the first cache of the manifest.
        appCache.addEventListener('cached', eventCache.emit.bind(eventCache, 'cached'), false);

        // Checking for an update. Always the first event fired in the sequence.
        appCache.addEventListener('checking', eventCache.emit.bind(eventCache, 'checking'), false);

        // An update was found. The browser is fetching resources.
        appCache.addEventListener('downloading', eventCache.emit.bind(eventCache, 'downloading'), false);

        // The manifest returns 404 or 410, the download failed,
        // or the manifest changed while the download was in progress.
        appCache.addEventListener('error', eventCache.emit.bind(eventCache, 'error'), false);

        // Fired after the first download of the manifest.
        appCache.addEventListener('noupdate', eventCache.emit.bind(eventCache, 'noUpdate'), false);

        // Fired if the manifest file returns a 404 or 410.
        // This results in the application cache being deleted.
        appCache.addEventListener('obsolete', eventCache.emit.bind(eventCache, 'error'), false);

        // Fired for each resource listed in the manifest as it is being fetched.
        appCache.addEventListener('progress', eventCache.emit.bind(eventCache, 'progress'), false);

        // Fired when the manifest resources have been newly redownloaded.
        appCache.addEventListener('updateready', function (event) {
            if (appCache.status === appCache.UPDATEREADY) {
                eventCache.emit('updateReady', event);
            }
        }, false);   

        if (appCache.status === appCache.UPDATEREADY) {
            eventCache.emit('updateReady', event);
        } else if (appCache.status === appCache.DOWNLOADING) {
            eventCache.emit('downloading', event);
        } 
    }
}

function checkForUpdate() {
    try {

        if (serviceWorker) {
            getCacheWorker().then(function (worker) {
                return sendWorkerMsg('Update', worker);
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
        eventCache.emit('error', err);
    }
}   

function clearCache() {
    try {

        eventCache.emit('progress');

        if (serviceWorker) {
            getCacheWorker().then(function (worker) {
                return sendWorkerMsg('CacheClear', worker).finally(function () {
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

        eventCache.emit('uncached');

    } catch (err) {
        eventCache.emit('error', err);
    }
}

window.checkForUpdate = checkForUpdate;

exports.eventCache = eventCache;
exports.listenToUpdate = listenToUpdate;
exports.clearCache = clearCache;
exports.checkForUpdate = checkForUpdate;