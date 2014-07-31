/* <copyright>
Copyright (c) 2012, Motorola Mobility LLC.
All Rights Reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of Motorola Mobility LLC nor the names of its
  contributors may be used to endorse or promote products derived from this
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
</copyright> */

var Converters = require("./converters");

module.exports = File;

function File(options) {
    this.converter = Converters.from();
    /*jshint -W089 */
    for (var name in options) {
        this[name] = options[name];
    }
    if (!this.fs) {
        throw new Error("File must be initialized with fs object.");
    }
    if (this.path == null && this.converter == null) {
        throw new Error("File must be initialized either with some content or a path to copy on write.");
    }
    /*jshint +W089 */
}

Object.defineProperties(File.prototype, {
    write: {
        value: function (target) {
            var self = this;
            if (!self.converter || !self.converter.contentType) {
                return this.fs.copy(this.path, target);
            } else {
                return this.fs.write(target, this.buffer, "wb");
            }
        },
        writable: true,
        configurable: true,
        enumerable: true
    }
});

Converters.registry.keys().forEach(function (contentType) {
    Object.defineProperty(File.prototype, contentType, {
        get: function () {
            if (!this.converter) {
                throw new Error("Content shelved at " + this.path);
            }
            this.converter = this.converter.to(contentType);
            return this.converter.content;
        },
        set: function (content) {
            this.converter = Converters.from(content, contentType);
        },
        configurable: true,
        enumerable: true
    });
});

