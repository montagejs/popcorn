montageDefine("0e99770","core/jsonp-transport",{dependencies:["montage/core/core","query-params","url","montage/core/uuid","montage/core/promise"],factory:function(e,r,o){var n=e("montage/core/core").Montage,a=e("query-params"),c=e("url"),t=e("montage/core/uuid"),s=e("montage/core/promise").Promise;r.JsonpTransport=n.specialize({constructor:{value:function(){}},makeRequest:{value:function(e,r,o){var n,u=s.defer(),i=this,d=c.parse(e),l=a.decode(d.query),p=r?r+"ServiceCallback":"serviceCallback",m=p+t.generate().replace(/-/g,"_"),g=document.createElement("script");return window[m]=function(e){i._handleResponse(e,u),document.head.removeChild(g),delete window[m]},l[o?o:"callback"]=m,n=e.replace(d.query,"")+a.encode(l),g.src=n,document.head.appendChild(g),u.promise}},_handleResponse:{value:function(e,r){e?e.error?r.reject(new Error(e.error)):r.resolve(e):r.reject(new Error("Unknown API Error"))}}}),r.shared=new r.JsonpTransport}});