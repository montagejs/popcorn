/*global define:false, console, self, Promise */

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
    console.log('PushWorker', msg, DEBUG ? obj : undefined);
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

function showNotification(payload) {

    // Cast has object
    if (typeof payload === 'string') {
        payload = {
            title: payload
        };
    }

    // Clear bad icons
    /*
    if (
        typeof payload.icon === 'string' &&
            payload.icon.indexOf('https://') !== 0
    ) {
        delete payload.icon;
    }

    // Clear bad badge
    if (
        typeof payload.badge === 'string' &&
            payload.badge.indexOf('https://') !== 0
    ) {
        delete payload.badge;
    }
    */

    // Force requireInteraction
    if (typeof payload.requireInteraction === 'undefined') {
        payload.requireInteraction = true;
    }

    if (typeof payload.actions === 'undefined') {

        // Open/Close payload.data
        payload.actions = payload.data ? [
            {
                action: 'open', 
                title: 'Open'
            },
            {
                action: 'close', 
                title: 'Dismiss'
            }

        // Close (no payload.data)
        ] : [
            {    
                action: 'close', 
                title: 'Close'
            }
        ];
    }

    // Send via postMessage
    postMessage({
        event: 'push',
        data: payload
    });

    return self.registration.showNotification(payload.title, {
        lang: payload.lang || 'en',
        body: payload.body || 'Hello!',
        tag: payload.tag || payload.title,
        icon: payload.icon,
        badge: payload.badge,
        actions: payload.actions,
        data: payload.data,
        renotify: !!payload.renotify,
        requireInteraction: !!payload.requireInteraction,
        vibrate: payload.vibrate,
        sound: payload.sound,
        silent: (payload.silent || (!payload.sound && !payload.vibrate))
    });
}

function openUrl(url) {
    return self.clients.matchAll({
        includeUncontrolled: true, 
        type: 'window'
    }).then(function(clientList) {

        var clientListMatchUrl;

        // Look for a match
        if (url) {
            clientListMatchUrl = clientListMatchUrl && clientListMatchUrl.filter(function (client) {
                return String(client.url).indexOf(url) === 0;
            });

            if (clientListMatchUrl && clientListMatchUrl.length === 0) {
                clientListMatchUrl = clientList;
            }
        }

        if (clientList && clientList.length > 0) {
            return clientList[0].focus();
        } else if (url) {
            return self.clients.openWindow(url);
        }
    });
}

//
// Worker
//

log('Started', self);

self.addEventListener('install', function(event) {
    log('Install...', event);
    event.waitUntil(self.skipWaiting().finally(function () {
        log('Installed', event);
    }));
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.skipWaiting().then(function () {
        self.clients.claim();  
    }).finally(function () {
        log('Activated', event);
    }));
});

self.addEventListener('message', function (event) {
    log('Push event received', event);
    event.waitUntil(
        showNotification(event.data)
    );
});

// Register event listener for the 'push' event.
var lastPayload;
self.addEventListener('push', function(event) {
    try {
        var payload = event.data ? JSON.parse(event.data.text()) : {};
        
        // Keep the service worker alive until the notification is created.
        event.waitUntil(
            showNotification(payload)
        );

    } catch(err) {
        log('Push message parse failed', err);
    }
});

self.addEventListener('notificationclick', function(event) {
    log('Notification clicked', event);
    var action = event.action || 'open';
    if (action === 'open') {  
        event.notification.close();
        event.waitUntil(openUrl(event.notification.data));
    } else if (action === 'close') {  
        event.notification.close();  
    } 
}, false);

self.addEventListener('message', function (event) {
    if (event.data === 'PushTest') {
        log('PushTest...', event);
        event.waitUntil(
            showNotification({
                title: 'Push Notification Test',
                data: self.location.href
            })
        );   
    }
});