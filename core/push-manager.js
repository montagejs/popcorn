var Promise = require("montage/core/promise").Promise;
var ServiceWorker = require('./service-worker').ServiceWorker;

//
// ServiceWorker 
// 

var PushManager = {

    getWorker: function() {
        return ServiceWorker.getWorkerRegistration('push-worker.js');
    },

    getSubscription: function() {
        return this.getWorker().then(function(registration) {
            if (!registration.pushManager) {
                return Promise.reject('Service worker push not supported.');
            } else {
                return registration.pushManager.getSubscription();
            }
        });
    },

    hasSubscription: function() {
        return this.getSubscription().then(function (subscription) {
            return subscription && subscription.length > 0;
        });
    },

    subscribe: function() {

        return this.getWorker().then(function(registration) {
            if (!registration.pushManager) {
                return Promise.reject('Service worker push not supported.');
            } else {
                // Use the PushManager to get the user's subscription to the push service.
                return registration.pushManager.subscribe({ 
                    userVisibleOnly: true 
                });
            }
        });
    },

    unsubscribe: function() {
        var self = this;
        return self.getSubscription().then(function (subscription) {
            return subscription.unsubscribe().then(function () {
                return self.getWorker().then(function (worker) {
                    return worker.unregister();
                });
            });
        });
    },

    send: function(subscription, body, options) {

        options = Object.assign({
            title: document.title,
            icon: '/assets/icons/icon-196.png',
            badge:'/assets/icons/icon-128.png',
            sound: '/assets/audio/pop_up_alert.mp3',
            data: location.href,
            tag: undefined,
            vibrate: undefined,
            lang: undefined,
            delay: 0,
            ttl: 0
        }, options || {});

        var msg = {
            body: body,
            title: options.title,
            picture: options.picture,
            sound: options.sound,
            icon: options.icon,
            badge: options.badge,
            tag: options.tag,
            vibrate: options.vibrate,
            lang: options.lang,
            actions: options.actions,
            data: options.data
        };

        // Send to worker
        return this.getWorker().then(function (worker) {
            return ServiceWorker.sendWorkerMsg(worker, msg);
        });
    }
};

exports.PushManager = PushManager;

