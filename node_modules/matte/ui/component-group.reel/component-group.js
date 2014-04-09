// TODO: ComponentList instead? ComponentContainer?
/**
	module:"matte/ui/component-group.reel"
*/
var Component = require("montage/ui/component").Component;

/**
 @class module:"matte/ui/component-group.reel".ComponentGroup
 @extends module:montage/ui/component.Component
 */
exports.ComponentGroup = Component.specialize(/** @lends module:"matte/ui/component-group.reel".ComponentGroup# */ {

    hasTemplate: {value: false},

/**
    Initializes the ComponentGroup instance's <code>childComponents</code> array with the specified array of components.
    @function
    @param {Component} components Components to be initialized.
    @returns itself
*/
    initWithComponents: {value: function(components) {
        this.childComponents = components;
        return this;
    }}
});
