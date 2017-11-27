/*global define:false, console, self, Promise, caches, fetch, appCache, clients, indexedDB */

var CACHE_KEY = 'cacheVersion';
var DEBUG = false;

function log(msg, obj) {
    console.log('OfflineWorker', msg, DEBUG ? obj : undefined);
}

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

var cacheSections = ['CACHE MANIFEST', 'CACHE:', 'NETWORK:'],
    cacheVersionSections = ['#version', '#hash'];
        
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

    return appCache;
}

function getAppCache() {
    return new Promise(function (resolve, reject) {
        log('Fetch cache manifest...');
        postMessage('Updating');
        fetch('./manifest.appcache').then(function (response) {
            if (response.status === 200) {
                return response.text().then(function (appCacheText) {
                    var appCache = parseAppCache(appCacheText);
                    log('AppCache.rev: ' + appCache.rev);
                    resolve(appCache);
                }, reject);
            }

            reject("NoAppCache");
        }, function (err) {
            log('Fetch cache manifest failed cause: ' + err);
            reject(err);
        });
    });
}

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
    
function setAppVersion(version) {
    return setStorageValue(CACHE_KEY, version);
}


function getAppVersion() {
    return getStorageValue(CACHE_KEY).then(function (appVersion) {
        log('App.rev: ' + appVersion);
        return appVersion;
    });
}

function clearCache(name) {
    return caches.keys().then(function (cachesToDelete) {
        return Promise.all(cachesToDelete.map(function (cacheToDelete) {
            return caches.delete(cacheToDelete);
        }));
    });
}

function pushCache(name, urls) {
    return caches.open(name).then(function (cache) {
        return cache.addAll(urls).then(function () {
            log('Updated cache version "' + name + '" urls (' + urls.length + ')', urls);
            return name;
        });
    });
}

var pendingCacheUpdate;
function updateCache() {
    if (pendingCacheUpdate) {
        return pendingCacheUpdate;
    }

    return (pendingCacheUpdate = getAppCache()).then(function (appCache) {
        return getAppVersion().then(function (appVersion) {
            return new Promise(function (resolve, reject) {
                // Install
                if (appVersion === null) {
                    log('Installing "' + appCache.rev + '"');
                    return pushCache(appCache.rev, appCache.cache).then(function () {
                        log('Installed "' + appCache.rev + '"');
                        return setAppVersion(appCache.rev);
                    });
                // Clean then install new version
                } else if (appVersion !== appCache.rev) {
                    log('Updating to "' + appCache.rev + '"');
                    clearCache(appVersion).then(function () {
                        return pushCache(appCache.rev, appCache.cache).then(function () {
                        log('Updated from "' + appVersion + '" to "' + appCache.rev + '"');
                            return setAppVersion(appCache.rev);
                        });
                    }).then(resolve, reject);
                } else {
                    log('Cached "' + appCache.rev + '"');
                    return reject("Cached");
                }
            });
        });
  }).finally(function () {
    pendingCacheUpdate = null;
  });
}

log('Started', self);
postMessage('Started');

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function (event) {
    log('Install...', event);
    event.waitUntil(
        updateCache().then(function () {
            return self.skipWaiting();
        }).then(function (appVersion) {
            return postMessage('Installed');
        }, function () {
            return postMessage('InstallFailed');
        })
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
    log('Activating...', event);
    event.waitUntil(
        updateCache().then(function (appVersion) {
            return postMessage('Updated');
        }).catch(function (err) {
            log('No Update cause: ' + err);
            return postMessage('NoUpdate');
        }).then(function() {
            return clients.claim();
        })
    );
});

self.addEventListener('message', function (event) {
    log('Checking...', event);
    event.waitUntil(
        updateCache().then(function (appVersion) {
            return postMessage('Updated');
        }).catch(function (err) {
            log('No Update cause: ' + err);
            return postMessage('NoUpdate');
        })
    );
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
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    //log('Cache hit', event.request.url);
                    return response;
                } else {
                    //log('Cache miss', event.request.url);
                    return fetch(event.request);   
                }
            })
        );
    }
});
