montageDefine("c2ad217","map",{dependencies:["./_map","./listen/property-changes","./listen/map-changes"],factory:function(e,t,p){"use strict";var o=e("./_map"),a=e("./listen/property-changes"),c=e("./listen/map-changes");p.exports=o,void 0===global.Map||"function"!=typeof global.Set.prototype.values?(Object.addEach(o.prototype,a.prototype),Object.addEach(o.prototype,c.prototype)):(Object.defineEach(o.prototype,a.prototype,!1,!0,!1,!0),Object.defineEach(o.prototype,c.prototype,!1,!0,!1,!0))}});