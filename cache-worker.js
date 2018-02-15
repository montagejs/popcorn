/*global define:false, console, self, Promise, caches, fetch, appCache, clients, indexedDB, Promise */

// https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
// https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/permissions-subscriptions
// https://github.com/w3c/ServiceWorker/blob/master/explainer.md
// chrome://inspect/#service-workers
// https://serviceworke.rs

//
// Env Setttings
//

// It's replaced unconditionally to preserve the expected behavior
// in programs even if there's ever a native finally.
Promise.prototype['finally'] = function finallyPolyfill(callback) {
    var constructor = this.constructor;

    return this.then(function(value) {
            return constructor.resolve(callback()).then(function() {
                return value;
            });
        }, function(reason) {
            return constructor.resolve(callback()).then(function() {
                throw reason;
            });
        });
};

var DEBUG = false;

//
// Utils
// 

function log(msg, obj) {
    if (DEBUG) {
        console.log('OfflineWorker', msg, obj);   
    }
}

function postMessage(msg) {
    if (DEBUG) {
        log("postMessage", msg);   
    }
    return self.clients.matchAll().then(function(clients) {
        return Promise.all(clients.map(function(client) {
            return client.postMessage(msg);
        }));
    });
}

//
// AppCache
//

function parseAppCacheVersion(appCacheLine) {
    var version = String(appCacheLine || '').replace("#", '').trim().split(' - '),
        rev = String(version[0]).replace('rev ', ''),
        updated = String(version[1]) || new Date().toISOString();

    return {
        rev: rev,
        updated: updated
    };
}

var cacheSections = ['CACHE MANIFEST', 'CACHE:', 'NETWORK:'];
function parseAppCache(appCacheText) {

    var appCache = {
        rev: "",
        cache: [],
        network: []
    };

    var cacheSection = null;

    appCacheText.split("\n").forEach(function (appCacheLine) {
        // Skip empty line
        if (!appCacheLine) {
            return;
        } else if (cacheSections.indexOf(appCacheLine) !== -1) {
            cacheSection = appCacheLine;
        } else if (cacheSection === 'CACHE MANIFEST') {
            if (appCacheLine.indexOf('#') === 0) {
                var appCacheLineParts = String(appCacheLine || '').split(' ');
                if (
                    appCacheLineParts[0] && appCacheLineParts[1] &&
                        appCacheLine.indexOf(appCacheLineParts[0]) !== -1
                ) {
                    appCache.rev += appCache[appCacheLineParts[0].replace('#')] = appCacheLineParts[1];
                }
            
            // Otherwise add to cache
            } else {
                appCache.cache.push(appCacheLine);  
            }
        } else if (cacheSection === 'CACHE:') {
            appCache.cache.push(appCacheLine);
        } else if (cacheSection === 'NETWORK:') {
            appCache.network.push(appCacheLine);
        }
    });

    log('AppCacheManifest.rev: ' + appCache.rev);

    return appCache;
}

function getAppCacheManifest() {
    return new Promise(function (resolve, reject) {
        log('Fetching cache manifest...');
        fetch('./manifest.appcache').then(function (response) {
            log('Fetched cache manifest.');
            if (response.status === 200) {
                response.text().then(function (appCacheText) {
                    var appCache = parseAppCache(appCacheText);
                    resolve(appCache);
                }, reject);
            } else {
                reject("NoAppCache");   
            }
        }).catch(function (err) {
            log('Fetch cache manifest failed cause: ' + err);
            reject(err);
        });
    });
}

//
// Storage
//

var dbName = "OfflineWorker";
var storeName = "OfflineObjectStore";
function getStorage() {
    return new Promise(function (resolve, reject) {
        // Open (or create) the database
        var open = indexedDB.open(dbName, 1);

        // Create the schema
        open.onupgradeneeded = function() {
            var db = open.result;
            var store = db.createObjectStore(storeName, {keyPath: "key"});
            var index = store.createIndex("KeyIndex", ["key"]);
        };

        open.onblocked = function (event) {
            if (event.target.result) {
                event.target.result.close();   
            }
            reject(event.target.error || "OpenBlocked");
        };

        open.onerror = function (event) {
            reject(event.target.error || "OpenError");
        };

        open.onsuccess = function() {
            resolve(open.result);
        };
    });
}

function getStorageValue(key) {
    return getStorage().then(function (db) {
        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);
        return new Promise(function (resolve, reject) {
            var request = store.get(key);
            request.onsuccess = function (event) {
                var result = event.target.result;
                if (
                    typeof result !== 'undefined' &&
                        typeof result.value === 'string'
                ) {
                    resolve(result.value); 
                } else {
                    resolve(null);
                } 
            };
            request.onerror = function (event) {
                resolve(event.target.error); 
            };
        }).finally(function () {
            db.close();
        });
    });
}

function setStorageValue(key, value) {
    return getStorage().then(function (db) {
        var tx = db.transaction(storeName, "readwrite");
        var store = tx.objectStore(storeName);
        return new Promise(function (resolve, reject) {
            var request = store.put({
                key: key, 
                value: value
            });
            request.onerror = function (event) {
                resolve(event.target.error); 
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
        }).finally(function () {
            db.close();
        });
    });
}

//
// App Version
//
  
var APP_VERSION_KEY = 'appCacheVersion';

function setAppCacheVersion(version) {
    return setStorageValue(APP_VERSION_KEY, version);
}

function getAppCacheManifestVersion() {
    return getStorageValue(APP_VERSION_KEY).then(function (appVersion) {
        return caches.has(appVersion).then(function (hasCache) {
            if (hasCache === true) {
                log('AppCache.rev: ' + appVersion);
                return appVersion;
            } else {
                return null;
            }
        });
    });
}

//
// Cache
//

var externalCache = 'external-cache',
    internalCache = 'internal-cache'; // Will be clear by setCache and clearCache

function clearCache() {
    return caches.keys().then(function (cachesToDelete) {
        return Promise.all(cachesToDelete.map(function (cacheToDelete) {
            return caches.delete(cacheToDelete);
        }));
    });
}

function setCache(name, urls) {
    // Clear all others caches
    return clearCache().then(function () {
        // Open new cache
        return caches.open(name).then(function (cache) {
            // Update new cache
            return cache.addAll(urls).then(function () {
                log('Updated cache version "' + name + '" urls (' + urls.length + ')', urls);
                return name;
            });
        }); 
    });
}


function addResponseToCache(name, request, response) {
    return caches.open(name).then(function (cache) {
        // Update new cache
        return cache.put(request, response.clone());
    }); 
}

var pendingCacheUpdate;
function updateCache() {
    if (pendingCacheUpdate) {
        return pendingCacheUpdate;
    } else {

        postMessage('progress');
        return (pendingCacheUpdate = getAppCacheManifest()).then(function (appCache) {
            return getAppCacheManifestVersion().then(function (appVersion) {
                // Install
                if (appVersion === null) {
                    log('Installing cache "' + appCache.rev + '"');
                    return setCache(appCache.rev, appCache.cache).then(function () {
                        log('Installed cache "' + appCache.rev + '"');
                        return setAppCacheVersion(appCache.rev).then(function () {
                            return Promise.resolve("noUpdate");
                        });
                    });
                // Clean then install new version
                } else if (appVersion !== appCache.rev) {
                    log('Updating to cache "' + appCache.rev + '"');
                    return setCache(appCache.rev, appCache.cache).then(function () {
                        log('Updated cache from "' + appVersion + '" to "' + appCache.rev + '"');
                        return setAppCacheVersion(appCache.rev).then(function () {
                            return Promise.resolve("updateReady");
                        });
                    });
                } else {
                    log('Cached "' + appCache.rev + '"');
                    return Promise.resolve("cached");
                }
            });

        }).finally(function () {
            pendingCacheUpdate = null;
        });
    }
}

//
// Worker
//

log('Started', self);

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function (event) {
    log('Install...', event);
    event.waitUntil(
        // Clear previous caches
        updateCache().then(function () {
            log('Installed', self);
            return self.skipWaiting();
        }).catch(function (err) {
            log('No Cache cause: ' + err);
            return postMessage('err');
        }).then(function() {
            log('Installed', self);
        })
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
    log('Activating...', event);
    event.waitUntil(
        // Update cache
        updateCache().then(function (cacheStatus) {
            return self.skipWaiting().then(function () {
                return postMessage(cacheStatus);
            }).catch(function (err) {
                log('No Update cause: ' + err);
                return postMessage('noUpdate');
            }).then(function() {
                log('Activated', self);
                return clients.claim();
            });
        })
    );
});

self.addEventListener('message', function (event) {
    if (event.data === 'Update') {
        log('UpdateCache...', event);
        event.waitUntil(
            updateCache().then(function (cacheStatus) {
                return postMessage(cacheStatus);
            }).catch(function (err) {
                log('No Update cause: ' + err);
                return postMessage('error');
            })
        );   
    } else if (event.data === 'CacheClear') {
        log('CacheClear...', event);
        event.waitUntil(
            clearCache().then(function () {
                return postMessage('CacheCleared');
            }).catch(function (err) {
                log('No cache clear cause: ' + err);
                return postMessage('error');
            })
        );
    }
});

self.addEventListener('sync', function(event) {
    log('Push event received', event);
});

self.addEventListener('push', function(event) {
    log('Push event received', event);
});

self.addEventListener('update', function (event) {
    log('Update event received', event);
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', function (event) {
    // Skip cross-origin requests, like those for Google Analytics.
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                //log('Cache hit', event.request.url);
                return response;
            } else {
                //log('Cache miss', event.request.url);
                return fetch(event.request).then(function(response) {
                    //
                    if (
                        internalCache && 
                            event.request.url.startsWith(self.location.origin)
                    ) {
                        return addResponseToCache(internalCache, event.request, response).then(function () {
                            return response;
                        });
                    } else if (externalCache) {
                        return addResponseToCache(externalCache, event.request, response).then(function () {
                            return response;
                        });
                    } else {
                        return response;
                    }
                });
            }
        })
    );
});
