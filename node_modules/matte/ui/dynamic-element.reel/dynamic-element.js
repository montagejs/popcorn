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
/**
    module:"matte/ui/dynamic-element.reel"
*/
var Component = require("montage/ui/component").Component;


/**
    The DynamicElement is a general purpose component that aims to expose all the properties of the element as a component.
    @class module:"matte/ui/dynamic-element.reel".DynamicElement
    @extends module:montage/ui/component.Component
*/
exports.DynamicElement = Component.specialize(/** @lends module:"matte/ui/dynamic-element.reel".DynamicElement# */ {

    hasTemplate: {
        value: false
    },

    _innerHTML: {
        value: null
    },

    _usingInnerHTML: {
        value: null
    },

    /**
        The innerHTML displayed as the content of the DynamicElement
        @type {Property}
        @default null
    */
    innerHTML: {
        get: function() {
            return this._innerHTML;
        },
        set: function(value) {
            this._usingInnerHTML = true;
            if (this._innerHTML !== value) {
                this._innerHTML = value;
                this.needsDraw = true;
            }
        }
    },

    /**
        The default html displayed if innerHTML is falsy.
        @type {Property}
        @default {String} ""
    */
    defaultHTML: {
        value: ""
    },

    _allowedTagNames: {
        value: null
    },

    /**
        White list of allowed tags in the innerHTML
        @type {Property}
        @default null
    */
    allowedTagNames: {
        get: function() {
            return this._allowedTagNames;
        },
        set: function(value) {
            if (this._allowedTagNames !== value) {
                this._allowedTagNames = value;
                this.needsDraw = true;
            }
        }
    },



    _range: {
        value: null
    },

    enterDocument: {
        value: function(firstTime) {
            if (firstTime) {
                var range = document.createRange(),
                    className = this.element.className;
                range.selectNodeContents(this.element);
                this._range = range;
            }
        }
    },

    _contentNode: {
        value: null
    },

    draw: {
        value: function() {
            // get correct value
            var displayValue = (this.innerHTML || 0 === this.innerHTML ) ? this.innerHTML : this.defaultHTML,
                content, allowedTagNames = this.allowedTagNames, range = this._range, elements;

            //push to DOM
            if(this._usingInnerHTML) {
                if (allowedTagNames !== null) {
                    //cleanup
                    this._contentNode = null;
                    range.deleteContents();
                    //test for tag white list
                    content = range.createContextualFragment( displayValue );
                    if(allowedTagNames.length !== 0) {
                        elements = content.querySelectorAll("*:not(" + allowedTagNames.join("):not(") + ")");
                    } else {
                        elements = content.childNodes;
                    }
                    if (elements.length === 0) {
                        range.insertNode(content);
                        if(range.endOffset === 0) {
                            // according to https://bugzilla.mozilla.org/show_bug.cgi?id=253609 Firefox keeps a collapsed
                            // range collapsed after insertNode
                            range.selectNodeContents(this.element);
                        }

                    } else {
                        console.warn("Some Elements Not Allowed " , elements);
                    }
                } else {
                    content = this._contentNode;
                    if(content === null) {
                        //cleanup
                        range.deleteContents();
                        this._contentNode = content = document.createTextNode(displayValue);
                        range.insertNode(content);
                        if(range.endOffset === 0) {
                            // according to https://bugzilla.mozilla.org/show_bug.cgi?id=253609 Firefox keeps a collapsed
                            // range collapsed after insert
                            range.selectNodeContents(this.element);
                        }

                    } else {
                        content.data = displayValue;
                    }
                }
            }
        }
    }
});
