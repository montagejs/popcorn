montageDefine("99f03e0","fs-boot",{dependencies:["path","./fs"],factory:function(t,n,r){!function(n){var r=function(t){return t.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&")},e=t("path");n.ROOT=n.SEPARATOR=e.sep||("win32"===process.platform?"\\":"/"),"\\"===e.sep?n.ALT_SEPARATOR="/":n.ALT_SEPARATOR=void 0;var o,i,s;n.SEPARATORS_RE=function(){return o===n.SEPARATOR&&i===n.ALT_SEPARATOR||(o=n.SEPARATOR,i=n.ALT_SEPARATOR,s=new RegExp("["+(o||"").replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&")+(i||"").replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&")+"]","g")),s},n.split=function(t){var r;try{r=String(t).split(n.SEPARATORS_RE())}catch(e){throw new Error("Cannot split "+typeof t+", "+JSON.stringify(t))}return 1===r.length&&""===r[0]?[]:r},n.join=function(){return 1===arguments.length&&Array.isArray(arguments[0])?n.normal.apply(n,arguments[0]):n.normal.apply(n,arguments)},n.resolve=function(){for(var t="",r=[],e=[],o="",i=0;i<arguments.length;i++){var s=String(arguments[i]);if(""!=s){var A=s.split(n.SEPARATORS_RE());n.isAbsolute(s)&&(t=A.shift()+n.SEPARATOR,r=[],e=[]),o=A.pop(),"."!=o&&".."!=o||(A.push(o),o="");for(var R=0;R<A.length;R++){var a=A[R];"."==a||""==a||(".."==a?e.length?e.pop():t||r.push(".."):e.push(a))}}}return s=r.concat(e).join(n.SEPARATOR),s&&(o=n.SEPARATOR+o),t+s+o},n.normal=function(){for(var t="",r=[],e=[],o=0,i=arguments.length;o<i;o++){var s=String(arguments[o]);if(""!==s){var A=s.split(n.SEPARATORS_RE());n.isAbsolute(s)&&(t=A.shift()+n.SEPARATOR,r=[],e=[]);for(var R=0,a=A.length;R<a;R++){var p=A[R];"."===p||""===p||(".."==p?e.length?e.pop():t||r.push(".."):e.push(p))}}}return s=r.concat(e).join(n.SEPARATOR),t+s},n.isAbsolute=function(t){var r=n.split(t);return 0!=r.length&&n.isRoot(r[0])},n.isRelative=function(t){return!n.isAbsolute(t)},n.isRoot=function(t){return"\\"===n.SEPARATOR?/[a-zA-Z]:$/.test(t):""==t},n.root=function(r){n.isAbsolute(r)||(r=t("./fs").absolute(r));var e=n.split(r);return n.join(e[0],"")},n.directory=function(t){t=n.normal(t);var r=(n.isAbsolute(t),n.split(t));return r.length?".."==r[r.length-1]?r.push(".."):r.pop():r.unshift(".."),r.join(n.SEPARATOR)||(n.isRelative(t)?"":n.ROOT)},n.base=function(t,e){var o=t.split(n.SEPARATORS_RE()).pop();return e&&(o=o.replace(new RegExp(r(e)+"$"),"")),o},n.extension=function(t){t=n.base(t),t=t.replace(/^\.*/,"");var r=t.lastIndexOf(".");return r<=0?"":t.substring(r)}}("undefined"!=typeof n?n:FS_BOOT={})}});