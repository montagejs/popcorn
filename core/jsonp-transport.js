/**
 * @module ./jsonp-transport
 * @requires montage/core/core
 */
var Montage = require("montage/core/core").Montage,
    Params = require('query-params'),
    Url = require("url"),
    Uuid = require("montage/core/uuid"),
    Promise = require("montage/core/promise").Promise;

/**
 * @class JsonpTransport
 * @extends Montage
 */
exports.JsonpTransport = Montage.specialize(/** @lends JsonpTransport# */ {
    constructor: {
        value: function JsonpTransport() {
        }
    },

    makeRequest: {
        value: function (url, servicePrefix, callbackParameter) {
            var deferredResponse = Promise.defer(),
                self = this,
                parsedUrl = Url.parse(url),
                params = Params.decode(parsedUrl.query),
                callbackNamePrefix = servicePrefix ? servicePrefix + "ServiceCallback" : "serviceCallback",
                callbackMethodName = callbackNamePrefix + Uuid.generate().replace(/-/g, "_"),
                scriptElement = document.createElement("script"),
                requestUrl;

            window[callbackMethodName] = function(data) {
                self._handleResponse(data, deferredResponse);
                document.head.removeChild(scriptElement);
                delete window[callbackMethodName];
            };

            params[callbackParameter? callbackParameter : "callback"] = callbackMethodName;

            requestUrl = url.replace(parsedUrl.query, "") + Params.encode(params);
            scriptElement.src = requestUrl;

            document.head.appendChild(scriptElement);

            return deferredResponse.promise;
        }
    },

    _handleResponse: {
        value: function (data, deferred) {
//            console.log("response", data);
            if (!data) {
                deferred.reject(new Error("Unknown API Error"));
            } else if (data.error) {
                deferred.reject(new Error(data.error));
            } else {
                deferred.resolve(data);
            }
        }
    }

});

exports.shared = new exports.JsonpTransport();
