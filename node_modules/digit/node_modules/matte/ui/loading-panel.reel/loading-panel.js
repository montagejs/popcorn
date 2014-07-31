
/**
	module:"matte/ui/loading-panel.reel"
*/

var Component = require("montage/ui/component").Component;

/**
 @class module:matte/ui/loading-panel.LoadingPanel
 @extends module:montage/ui/component.Component
 */

exports.LoadingPanel = Component.specialize(/** @lends module:matte/ui/loading-panel.LoadingPanel# */ {

/**
	The number of modules that are required to load.
*/
    requiredModuleCount: {
        enumerable: false,
        value: 0
    },

/**
	The number of modules that have been initialized.
*/
    initializedModuleCount: {
        enumerable: false,
        value: 0
    }


});
