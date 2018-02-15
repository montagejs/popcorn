var Promise = require("montage/core/promise").Promise;

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
}

//
// ServiceWorker 
// 

var ServiceWorker = {

    supportServiceWorker: !!window.navigator.serviceWorker,

    getServiceWorker: function  () {
        var serviceWorker = window.navigator.serviceWorker;
        return serviceWorker ? Promise.resolve(serviceWorker) : Promise.reject(new Error('serviceWorker Not Supported'));
    },

    getWorkerRegistrations: function () {
        var that = this;
        return that.getServiceWorker().then(function (serviceWorker) {
            if (typeof serviceWorker.getRegistrations === 'function') {
                return Promise.resolve(serviceWorker.getRegistrations());
            } else if (typeof serviceWorker.getRegistration === 'function') {
                return serviceWorker.getRegistration().then(function (registration) {
                    return [registration];
                });
            } else {
                return Promise.resolve(new Error('ServiceWorker Registrations Supported'));
            }
        });
    },

    // TODO constructor ?
    getWorkerRegistration: function (path, opts, disableAutoRegister) {
        var that = this;
        return that.getWorkerRegistrations().then(function (workerRegistrations) {

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
                return that.registerWorker(path, opts);   
            }
        });
    },

    registerWorker: function (path, opts) {
        // TODO 
        return this.getServiceWorker().then(function (serviceWorker) {
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
        });
    },
        
    sendWorkerMsg: function (worker, msg) {
        if (msg) {
            var deferred = Promise.defer();
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
            msg = worker;
            return this.getServiceWorker().then(function (serviceWorker) {

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
                });
            });   
        }
    }
};

exports.ServiceWorker = ServiceWorker;