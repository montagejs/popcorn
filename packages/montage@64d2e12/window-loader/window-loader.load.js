montageDefine("64d2e12","window-loader/window-loader",{dependencies:[],factory:function(e,n,o){var a=window.opener;e.loadPackage(a.require.location).then(function(e){var n=window.loadInfo,o=n.module,a=n.name,t=n.callback;return window.require=window.mr=e,e.async("montage/ui/component").then(function(){return e.async("montage/ui/loader.reel").then(function(e){var n=e.Loader.create();n.mainModule=o,n.mainName=a,n.element=window.document.body,n.attachToParentComponent(),n.needsDraw=!0,t&&n.addEventListener("componentLoaded",function d(e){n.removeEventListener("componentLoaded",d),t(window,e.detail)})})})})}});