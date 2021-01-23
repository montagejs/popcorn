montageDefine("64d2e12","core/messageformat",{dependencies:[],factory:function(l,n,r){function u(l,n){var r;if(l&&n&&(u.locale[l]=n),r=l=l||"en",n=n||u.locale[r=u.Utils.getFallbackLocale(l)],!n)throw new Error("Plural Function not found for locale: "+l);this.pluralFunc=n,this.locale=l,this.fallbackLocale=r}u.locale={en:function(l){return 1===l?"one":"other"}},u.SafeString=function(l){this.string=l},u.SafeString.prototype.toString=function(){return this.string.toString()},u.Utils={numSub:function(l,n,r){return l.replace(/^#|[^\\]#/g,function(l){var u=l&&2===l.length?l.charAt(0):"";return u+'" + (function(){ var x = '+n+';\nif( isNaN(x) ){\nthrow new Error("MessageFormat: `"+lastkey_'+r+'+"` isnt a number.");\n}\nreturn x;\n})() + "'})},escapeExpression:function(l){var n={"\n":"\\n",'"':'\\"'},r=/[\n"]/g,t=/[\n"]/,e=function(l){return n[l]||"&amp;"};return l instanceof u.SafeString?l.toString():null===l||l===!1?"":t.test(l)?l.replace(r,e):l},getFallbackLocale:function(l){for(var n=l.indexOf("-")>=0?"-":"_";!u.locale.hasOwnProperty(l);)if(l=l.substring(0,l.lastIndexOf(n)),0===l.length)return null;return l}};var t=function(){var l={parse:function(l,n){function r(l,n,r){for(var u=l,t=r-l.length,e=0;e<t;e++)u=n+u;return u}function u(l){var n,u,t=l.charCodeAt(0);return t<=255?(u="x",n=2):(u="u",n=4),"\\"+u+r(t.toString(16).toUpperCase(),"0",n)}function t(l){return'"'+l.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/[\x80-\uFFFF]/g,u)+'"'}function e(l){A<O||(A>O&&(O=A,I=[]),I.push(l))}function a(){var n="whitespace@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u;return null!==l.substr(A).match(/^[   \n\r]/)?(u=l.charAt(A),A++):(u=null,N&&e("[  \\n\\r]")),j[n]={nextPos:A,result:u},u}function s(){var l="_@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r=N;N=!1;for(var u=A,t=[],s=a();null!==s;)t.push(s),s=a();var o,f=null!==t?function(l){return l.join("")}(t):null;return null!==f?o=f:(o=null,A=u),N=r,N&&null===o&&e("whitespace"),j[l]={nextPos:A,result:o},o}function o(){var n="digits@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A;null!==l.substr(A).match(/^[0-9]/)?(u=l.charAt(A),A++):(u=null,N&&e("[0-9]"));var a;if(null!==u)for(a=[];null!==u;)a.push(u),null!==l.substr(A).match(/^[0-9]/)?(u=l.charAt(A),A++):(u=null,N&&e("[0-9]"));else a=null;var s,o=null!==a?function(l){return parseInt(l.join(""),10)}(a):null;return null!==o?s=o:(s=null,A=t),j[n]={nextPos:A,result:s},s}function f(){var n="offsetPattern@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A,f=s();if(null!==f){var i;if("offset"===l.substr(A,6)?(i="offset",A+=6):(i=null,N&&e('"offset"')),null!==i){var c=s();if(null!==c){var v;if(":"===l.substr(A,1)?(v=":",A+=1):(v=null,N&&e('":"')),null!==v){var p=s();if(null!==p){var m=o();if(null!==m){var h=s();null!==h?u=[f,i,c,v,p,m,h]:(u=null,A=a)}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a;var g,x=null!==u?function(l){return l}(u[5]):null;return null!==x?g=x:(g=null,A=t),j[n]={nextPos:A,result:g},g}function i(){var n="id@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A,o=s();if(null!==o){var f;if(null!==l.substr(A).match(/^[a-zA-Z$_]/)?(f=l.charAt(A),A++):(f=null,N&&e("[a-zA-Z$_]")),null!==f){var i,c=[];for(null!==l.substr(A).match(/^[^  \n\r,.+={}]/)?(i=l.charAt(A),A++):(i=null,N&&e("[^   \\n\\r,.+={}]"));null!==i;)c.push(i),null!==l.substr(A).match(/^[^  \n\r,.+={}]/)?(i=l.charAt(A),A++):(i=null,N&&e("[^   \\n\\r,.+={}]"));if(null!==c){var v=s();null!==v?u=[o,f,c,v]:(u=null,A=a)}else u=null,A=a}else u=null,A=a}else u=null,A=a;var p,m=null!==u?function(l,n){return l+(n?n.join(""):"")}(u[1],u[2]):null;return null!==m?p=m:(p=null,A=t),j[n]={nextPos:A,result:p},p}function c(){var n="stringKey@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=i(),s=null!==a?function(l){return l}(a):null;null!==s?u=s:(u=null,A=t);var f;if(null!==u)f=u;else{var c,v=A,p=A;"="===l.substr(A,1)?(c="=",A+=1):(c=null,N&&e('"="'));var m;if(null!==c){var h=o();null!==h?m=[c,h]:(m=null,A=p)}else m=null,A=p;var g,x=null!==m?function(l){return l}(m[1]):null;null!==x?g=x:(g=null,A=v),f=null!==g?g:null}return j[n]={nextPos:A,result:f},f}function v(){var n="hexDigit@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u;return null!==l.substr(A).match(/^[0-9a-fA-F]/)?(u=l.charAt(A),A++):(u=null,N&&e("[0-9a-fA-F]")),j[n]={nextPos:A,result:u},u}function p(){var n="char@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A;null!==l.substr(A).match(M)?(u=l.charAt(A),A++):(u=null,N&&e(M));var a,s=null!==u?function(l){return l}(u):null;null!==s?a=s:(a=null,A=t);var o;if(null!==a)o=a;else{var f,i=A;"\\#"===l.substr(A,2)?(f="\\#",A+=2):(f=null,N&&e('"\\\\#"'));var c,p=null!==f?function(){return"\\#"}():null;if(null!==p?c=p:(c=null,A=i),null!==c)o=c;else{var m,h=A;"\\{"===l.substr(A,2)?(m="\\{",A+=2):(m=null,N&&e('"\\\\{"'));var g,x=null!==m?function(){return"{"}():null;if(null!==x?g=x:(g=null,A=h),null!==g)o=g;else{var P,F=A;"\\}"===l.substr(A,2)?(P="\\}",A+=2):(P=null,N&&e('"\\\\}"'));var _,y=null!==P?function(){return"}"}():null;if(null!==y?_=y:(_=null,A=F),null!==_)o=_;else{var d,b=A,S=A;"\\u"===l.substr(A,2)?(d="\\u",A+=2):(d=null,N&&e('"\\\\u"'));var w;if(null!==d){var k=v();if(null!==k){var E=v();if(null!==E){var O=v();if(null!==O){var I=v();null!==I?w=[d,k,E,O,I]:(w=null,A=S)}else w=null,A=S}else w=null,A=S}else w=null,A=S}else w=null,A=S;var R,U=null!==w?function(l,n,r,u){return String.fromCharCode(parseInt("0x"+l+n+r+u))}(w[1],w[2],w[3],w[4]):null;null!==U?R=U:(R=null,A=b),o=null!==R?R:null}}}}return j[n]={nextPos:A,result:o},o}function m(){var l="chars@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=p();if(null!==t)for(r=[];null!==t;)r.push(t),t=p();else r=null;var e,a=null!==r?function(l){return l.join("")}(r):null;return null!==a?e=a:(e=null,A=u),j[l]={nextPos:A,result:e},e}function h(){var l="string@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=A,e=s();if(null!==e){var a,o,f,i=[],c=A,v=s();for(null!==v?(f=m(),null!==f?(a=s(),null!==a?o=[v,f,a]:(o=null,A=c)):(o=null,A=c)):(o=null,A=c);null!==o;)i.push(o),c=A,v=s(),null!==v?(f=m(),null!==f?(a=s(),null!==a?o=[v,f,a]:(o=null,A=c)):(o=null,A=c)):(o=null,A=c);null!==i?r=[e,i]:(r=null,A=t)}else r=null,A=t;var p,h=null!==r?function(l,n){for(var r=[],u=0;u<n.length;++u)for(var t=0;t<n[u].length;++t)r.push(n[u][t]);return{type:"string",val:l+r.join("")}}(r[0],r[1]):null;return null!==h?p=h:(p=null,A=u),j[l]={nextPos:A,result:p},p}function g(){var n="messageFormatElement@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A,s=i();if(null!==s){var o,f=A;","===l.substr(A,1)?(o=",",A+=1):(o=null,N&&e('","'));var c;if(null!==o){var v=E();null!==v?c=[o,v]:(c=null,A=f)}else c=null,A=f;var p=null!==c?c:"";null!==p?u=[s,p]:(u=null,A=a)}else u=null,A=a;var m,h=null!==u?function(l,n){var r={type:"messageFormatElement",argumentIndex:l};return n&&n.length?r.elementFormat=n[1]:r.output=!0,r}(u[0],u[1]):null;return null!==h?m=h:(m=null,A=t),j[n]={nextPos:A,result:m},m}function x(){var n="messageFormatPatternRight@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A;"{"===l.substr(A,1)?(u="{",A+=1):(u=null,N&&e('"{"'));var o;if(null!==u){var f=s();if(null!==f){var i=g();if(null!==i){var c=s();if(null!==c){var v;if("}"===l.substr(A,1)?(v="}",A+=1):(v=null,N&&e('"}"')),null!==v){var p=h();null!==p?o=[u,f,i,c,v,p]:(o=null,A=a)}else o=null,A=a}else o=null,A=a}else o=null,A=a}else o=null,A=a}else o=null,A=a;var m,x=null!==o?function(l,n){var r=[];return l&&r.push(l),n&&n.val&&r.push(n),{type:"messageFormatPatternRight",statements:r}}(o[2],o[5]):null;return null!==x?m=x:(m=null,A=t),j[n]={nextPos:A,result:m},m}function P(){var l="messageFormatPattern@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=A,e=h();if(null!==e){for(var a=[],s=x();null!==s;)a.push(s),s=x();null!==a?r=[e,a]:(r=null,A=t)}else r=null,A=t;var o,f=null!==r?function(l,n){var r=[];l&&l.val&&r.push(l);for(var u in n)n.hasOwnProperty(u)&&r.push(n[u]);return{type:"messageFormatPattern",statements:r}}(r[0],r[1]):null;return null!==f?o=f:(o=null,A=u),j[l]={nextPos:A,result:o},o}function F(){var n="pluralForms@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A,o=s();if(null!==o){var f=c();if(null!==f){var i=s();if(null!==i){var v;if("{"===l.substr(A,1)?(v="{",A+=1):(v=null,N&&e('"{"')),null!==v){var p=s();if(null!==p){var m=P();if(null!==m){var h=s();if(null!==h){var g;"}"===l.substr(A,1)?(g="}",A+=1):(g=null,N&&e('"}"')),null!==g?u=[o,f,i,v,p,m,h,g]:(u=null,A=a)}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a;var x,F=null!==u?function(l,n){return{type:"pluralForms",key:l,val:n}}(u[1],u[5]):null;return null!==F?x=F:(x=null,A=t),j[n]={nextPos:A,result:x},x}function _(){var l="selectFormatPattern@"+A,n=j[l];if(n)return A=n.nextPos,n.result;for(var r=A,u=[],t=F();null!==t;)u.push(t),t=F();var e,a=null!==u?function(l){return{type:"selectFormatPattern",pluralForms:l}}(u):null;return null!==a?e=a:(e=null,A=r),j[l]={nextPos:A,result:e},e}function y(){var l="selectStyle@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=_(),e=null!==t?function(l){return{type:"selectStyle",val:l}}(t):null;return null!==e?r=e:(r=null,A=u),j[l]={nextPos:A,result:r},r}function d(){var l="pluralFormatPattern@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=A,e=f(),a=null!==e?e:"";if(null!==a){for(var s=[],o=F();null!==o;)s.push(o),o=F();null!==s?r=[a,s]:(r=null,A=t)}else r=null,A=t;var i,c=null!==r?function(l,n){var r={type:"pluralFormatPattern",pluralForms:n};return l?r.offset=l:r.offset=0,r}(r[0],r[1]):null;return null!==c?i=c:(i=null,A=u),j[l]={nextPos:A,result:i},i}function b(){var l="pluralStyle@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=d(),e=null!==t?function(l){return{type:"pluralStyle",val:l}}(t):null;return null!==e?r=e:(r=null,A=u),j[l]={nextPos:A,result:r},r}function S(){var l="start@"+A,n=j[l];if(n)return A=n.nextPos,n.result;var r,u=A,t=P(),e=null!==t?function(l){return{type:"program",program:l}}(t):null;return null!==e?r=e:(r=null,A=u),j[l]={nextPos:A,result:r},r}function w(){function n(l){l.sort();for(var n=null,r=[],u=0;u<l.length;u++)l[u]!==n&&(r.push(l[u]),n=l[u]);switch(r.length){case 0:return"end of input";case 1:return r[0];default:return r.slice(0,r.length-1).join(", ")+" or "+r[r.length-1]}}var r=n(I),u=Math.max(A,O),e=u<l.length?t(l.charAt(u)):"end of input";return"Expected "+r+" but "+e+" found."}function k(){for(var n=1,r=1,u=!1,t=0;t<O;t++){var e=l.charAt(t);"\n"===e?(u||n++,r=1,u=!1):"\r"===e|"\u2028"===e||"\u2029"===e?(n++,r=1,u=!0):(r++,u=!1)}return{line:n,column:r}}var E,A=0,N=!0,O=0,I=[],j={},M="^[^{}\\\0-     \n\r]";new RegExp("/"+M+"/");E=function(){var n="elementFormat@"+A,r=j[n];if(r)return A=r.nextPos,r.result;var u,t=A,a=A,o=s();if(null!==o){var f;if("plural"===l.substr(A,6)?(f="plural",A+=6):(f=null,N&&e('"plural"')),null!==f){var i=s();if(null!==i){var c;if(","===l.substr(A,1)?(c=",",A+=1):(c=null,N&&e('","')),null!==c){var v=s();if(null!==v){var p=b();if(null!==p){var m=s();null!==m?u=[o,f,i,c,v,p,m]:(u=null,A=a)}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a}else u=null,A=a;var h,g=null!==u?function(l,n){return{type:"elementFormat",key:l,val:n.val}}(u[1],u[5]):null;null!==g?h=g:(h=null,A=t);var x,P;if(null!==h)x=h;else{var F=A,_=A,d=s();if(null!==d){var S;if("select"===l.substr(A,6)?(S="select",A+=6):(S=null,N&&e('"select"')),null!==S){var w=s();if(null!==w){var k;if(","===l.substr(A,1)?(k=",",A+=1):(k=null,N&&e('","')),null!==k){var E=s();if(null!==E){var O=y();if(null!==O){var I=s();null!==I?P=[d,S,w,k,E,O,I]:(P=null,A=_)}else P=null,A=_}else P=null,A=_}else P=null,A=_}else P=null,A=_}else P=null,A=_}else P=null,A=_;var M,R=null!==P?function(l,n){return{type:"elementFormat",key:l,val:n.val}}(P[1],P[5]):null;null!==R?M=R:(M=null,A=F),x=null!==M?M:null}return j[n]={nextPos:A,result:x},x};var R={_:s,"char":p,chars:m,digits:o,elementFormat:E,hexDigit:v,id:i,messageFormatElement:g,messageFormatPattern:P,messageFormatPatternRight:x,offsetPattern:f,pluralFormatPattern:d,pluralForms:F,pluralStyle:b,selectFormatPattern:_,selectStyle:y,start:S,string:h,stringKey:c,whitespace:a};if(void 0!==n){if(void 0===R[n])throw new Error("Invalid rule name: "+t(n)+".")}else n="start";var U=R[n]();if(null===U||A!==l.length){var C=k();throw new this.SyntaxError(w(),C.line,C.column)}return U},toSource:function(){return this._source}};return l.SyntaxError=function(l,n,r){this.name="SyntaxError",this.message=l,this.line=n,this.column=r},l.SyntaxError.prototype=Error.prototype,l}();u.prototype.parse=function(){return t.parse.apply(t,arguments)},u.prototype.precompile=function(l){function n(l,a){a=a||{};var s,o,f,i,c="";switch(l.type){case"program":return n(l.program);case"messageFormatPattern":for(o=0;o<l.statements.length;++o)c+=n(l.statements[o],a);return e.begin+c+e.end;case"messageFormatPatternRight":for(o=0;o<l.statements.length;++o)c+=n(l.statements[o],a);return c;case"messageFormatElement":return a.pf_count=a.pf_count||0,c+='if(!d){\nthrow new Error("MessageFormat: No data passed to function.");\n}\n',l.output?c+='r += d["'+l.argumentIndex+'"];\n':(i="lastkey_"+(a.pf_count+1),c+="var "+i+' = "'+l.argumentIndex+'";\n',c+="var k_"+(a.pf_count+1)+"=d["+i+"];\n",c+=n(l.elementFormat,a)),c;case"elementFormat":return"select"===l.key?(c+=n(l.val,a),c+="r += (pf_"+a.pf_count+"[ k_"+(a.pf_count+1)+" ] || pf_"+a.pf_count+'[ "other" ])( d );\n'):"plural"===l.key&&(c+=n(l.val,a),c+="if ( pf_"+a.pf_count+"[ k_"+(a.pf_count+1)+' + "" ] ) {\n',c+="r += pf_"+a.pf_count+"[ k_"+(a.pf_count+1)+' + "" ]( d ); \n',c+="}\nelse {\n",c+="r += (pf_"+a.pf_count+'[ MessageFormat.locale["'+r.fallbackLocale+'"]( k_'+(a.pf_count+1)+" - off_"+a.pf_count+" ) ] || pf_"+a.pf_count+'[ "other" ] )( d );\n',c+="}\n"),c;case"pluralFormatPattern":for(a.pf_count=a.pf_count||0,c+="var off_"+a.pf_count+" = "+l.offset+";\n",c+="var pf_"+a.pf_count+" = { \n",t=!0,o=0;o<l.pluralForms.length;++o)"other"===l.pluralForms[o].key&&(t=!1),f?c+=",\n":f=1,s=JSON.parse(JSON.stringify(a)),s.pf_count++,c+='"'+l.pluralForms[o].key+'" : '+n(l.pluralForms[o].val,s);if(c+="\n};\n",t)throw new Error("No 'other' form found in pluralFormatPattern "+a.pf_count);return c;case"selectFormatPattern":for(a.pf_count=a.pf_count||0,c+="var off_"+a.pf_count+" = 0;\n",c+="var pf_"+a.pf_count+" = { \n",t=!0,o=0;o<l.pluralForms.length;++o)"other"===l.pluralForms[o].key&&(t=!1),f?c+=",\n":f=1,s=JSON.parse(JSON.stringify(a)),s.pf_count++,c+='"'+l.pluralForms[o].key+'" : '+n(l.pluralForms[o].val,s);if(c+="\n};\n",t)throw new Error("No 'other' form found in selectFormatPattern "+a.pf_count);return c;case"string":return'r += "'+u.Utils.numSub(u.Utils.escapeExpression(l.val),"k_"+a.pf_count+" - off_"+(a.pf_count-1),a.pf_count)+'";\n';default:throw new Error("Bad AST type: "+l.type)}}var r=this,t=!1,e={begin:'function(d){\nvar r = "";\n',end:"return r;\n}"};return n(l)},u.prototype.compile=function(l){return new Function("MessageFormat","return "+this.precompile(this.parse(l)))(u)},r.exports=u}});