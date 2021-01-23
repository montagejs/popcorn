montageDefine("b2c6b9c","lib/Tokenizer",{dependencies:[],factory:function(t,s,i){function e(t){return" "===t||"\t"===t||"\r"===t||"\n"===t}function h(t,s){this._state=a,this._buffer="",this._sectionStart=0,this._index=0,this._options=t,this._special=0,this._cbs=s,this._running=!0}i.exports=h;var _=0,a=_++,n=_++,o=_++,r=_++,c=_++,d=_++,x=_++,f=_++,b=_++,u=_++,S=_++,p=_++,m=_++,T=_++,l=_++,g=_++,k=_++,I=_++,y=_++,v=_++,w=_++,A=_++,C=_++,E=_++,D=_++,L=_++,P=_++,R=_++,Y=_++,z=_++,M=_++,j=_++,q=_++,B=_++,F=_++,G=_++,H=_++,J=_++,K=_++,N=_++,O=_++,Q=_++,U=_++,V=_++,W=_++,X=_++,Z=_++,$=_++,tt=_++;h.prototype.write=function(t){for(this._buffer+=t;this._index<this._buffer.length&&this._running;){var s=this._buffer.charAt(this._index);this._state===a?"<"===s&&(this._emitIfToken("text"),this._state=n,this._sectionStart=this._index):this._state===n?"/"===s?this._state=r:">"===s||this._special>0?this._state=a:e(s)||("!"===s?(this._state=T,this._sectionStart=this._index+1):"?"===s?(this._state=g,this._sectionStart=this._index+1):this._options&&this._options.xmlMode||"s"!==s&&"S"!==s?(this._state=o,this._sectionStart=this._index):(this._state=z,this._sectionStart=this._index)):this._state===o?"/"===s?(this._emitToken("opentagname"),this._cbs.onselfclosingtag(),this._state=d):">"===s?(this._emitToken("opentagname"),this._cbs.onopentagend(),this._state=a,this._sectionStart=this._index+1):e(s)&&(this._emitToken("opentagname"),this._state=x):this._state===r?e(s)||(">"===s?this._state=a:this._special>0?"s"!==s&&"S"!==s||(this._state=M):(this._state=c,this._sectionStart=this._index)):this._state===c?">"===s?(this._emitToken("closetag"),this._state=a,this._sectionStart=this._index+1,this._special=0):e(s)&&(this._emitToken("closetag"),this._state=d,this._special=0):this._state===d?">"===s&&(this._state=a,this._sectionStart=this._index+1):this._state===x?">"===s?(this._state=a,this._cbs.onopentagend(),this._sectionStart=this._index+1):"/"===s?(this._cbs.onselfclosingtag(),this._state=d):e(s)||(this._state=f,this._sectionStart=this._index):this._state===f?"="===s?(this._emitIfToken("attribname"),this._state=u):e(s)?(this._emitIfToken("attribname"),this._state=b):"/"!==s&&">"!==s||(this._emitIfToken("attribname"),this._state=x,this._index--):this._state===b?"="===s?this._state=u:"/"===s||">"===s?(this._state=x,this._index--):e(s)||(this._state=f,this._sectionStart=this._index):this._state===u?'"'===s?(this._state=S,this._sectionStart=this._index+1):"'"===s?(this._state=p,this._sectionStart=this._index+1):e(s)||(this._state=m,this._sectionStart=this._index):this._state===S?'"'===s&&(this._emitToken("attribvalue"),this._state=x):this._state===p?"'"===s&&(this._emitToken("attribvalue"),this._state=x):this._state===m?">"===s?(this._emitToken("attribvalue"),this._state=a,this._cbs.onopentagend(),this._sectionStart=this._index+1):e(s)&&(this._emitToken("attribvalue"),this._state=x):this._state===T?"["===s?this._state=w:"-"===s?this._state=k:this._state=l:this._state===l?">"===s&&(this._emitToken("declaration"),this._state=a,this._sectionStart=this._index+1):this._state===g?">"===s&&(this._emitToken("processinginstruction"),this._state=a,this._sectionStart=this._index+1):this._state===k?"-"===s?(this._state=I,this._sectionStart=this._index+1):this._state=l:this._state===I?"-"===s&&(this._state=y):this._state===y?"-"===s?this._state=v:this._state=I:this._state===v?">"===s?(this._cbs.oncomment(this._buffer.substring(this._sectionStart,this._index-2)),this._state=a,this._sectionStart=this._index+1):this._state=I:this._state===w?"C"===s?this._state=A:this._state=l:this._state===A?"D"===s?this._state=C:this._state=l:this._state===C?"A"===s?this._state=E:this._state=l:this._state===E?"T"===s?this._state=D:this._state=l:this._state===D?"A"===s?this._state=L:this._state=l:this._state===L?"["===s?(this._state=P,this._sectionStart=this._index+1):this._state=l:this._state===P?"]"===s&&(this._state=R):this._state===R?"]"===s?this._state=Y:this._state=P:this._state===Y?">"===s?(this._cbs.oncdata(this._buffer.substring(this._sectionStart,this._index-2)),this._state=a,this._sectionStart=this._index+1):this._state=P:this._state===z?"c"===s||"C"===s?this._state=j:"t"===s||"T"===s?this._state=Q:(this._state=o,this._index--):this._state===M?1!==this._special||"c"!==s&&"C"!==s?2!==this._special||"t"!==s&&"T"!==s?this._state=a:this._state=X:this._state=H:this._state===j?"r"===s||"R"===s?this._state=q:(this._state=o,this._index--):this._state===q?"i"===s||"I"===s?this._state=B:(this._state=o,this._index--):this._state===B?"p"===s||"P"===s?this._state=F:(this._state=o,this._index--):this._state===F?"t"===s||"T"===s?this._state=G:(this._state=o,this._index--):this._state===G?(("/"===s||">"===s||e(s))&&(this._special=1),this._state=o,this._index--):this._state===H?"r"===s||"R"===s?this._state=J:this._state=a:this._state===J?"i"===s||"I"===s?this._state=K:this._state=a:this._state===K?"p"===s||"P"===s?this._state=N:this._state=a:this._state===N?"t"===s||"T"===s?this._state=O:this._state=a:this._state===O?">"===s||e(s)?(this._state=c,this._sectionStart=this._index-6,this._index--):this._state=a:this._state===Q?"y"===s||"Y"===s?this._state=U:(this._state=o,this._index--):this._state===U?"l"===s||"L"===s?this._state=V:(this._state=o,this._index--):this._state===V?"e"===s||"E"===s?this._state=W:(this._state=o,this._index--):this._state===W?(("/"===s||">"===s||e(s))&&(this._special=2),this._state=o,this._index--):this._state===X?"y"===s||"Y"===s?this._state=Z:this._state=a:this._state===Z?"l"===s||"L"===s?this._state=$:this._state=a:this._state===$?"e"===s||"E"===s?this._state=tt:this._state=a:this._state===tt?">"===s||e(s)?(this._state=c,this._sectionStart=this._index-5,this._index--):this._state=a:this._cbs.onerror(Error("unknown state"),this._state),this._index++}this._sectionStart===-1?(this._buffer="",this._index=0):(this._state===a?(this._emitIfToken("text"),this._buffer="",this._index=0):this._sectionStart===this._index?(this._buffer="",this._index=0):this._sectionStart>0&&(this._buffer=this._buffer.substr(this._sectionStart),this._index-=this._sectionStart),this._sectionStart=0)},h.prototype.pause=function(){this._running=!1},h.prototype.resume=function(){this._running=!0},h.prototype.end=function(t){t&&this.write(t),""===this._buffer||this._sectionStart===-1||this._sectionStart===this._index||(this._state===P||this._state===R||this._state===Y?this._emitIfToken("cdata"):this._state===I||this._state===y||this._state===v?this._emitIfToken("comment"):this._state===o?this._emitIfToken("opentagname"):this._state===c?this._emitIfToken("closetag"):this._emitIfToken("text")),this._cbs.onend()},h.prototype.reset=function(){h.call(this,this._options,this._cbs)},h.prototype._emitToken=function(t){this._cbs["on"+t](this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=-1},h.prototype._emitIfToken=function(t){this._index>this._sectionStart&&this._cbs["on"+t](this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=-1}}});