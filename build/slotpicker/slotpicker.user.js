
    "use strict";
    import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")
    .then(() => {
      try {
        lockdown();
      }  catch (e) { console.warn(e); }

    "use strict";(()=>{var d1=Object.create;var bs=Object.defineProperty;var p1=Object.getOwnPropertyDescriptor;var y1=Object.getOwnPropertyNames;var x1=Object.getPrototypeOf,g1=Object.prototype.hasOwnProperty;var K=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var h1=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of y1(t))!g1.call(e,u)&&u!==n&&bs(e,u,{get:()=>t[u],enumerable:!(r=p1(t,u))||r.enumerable});return e};var Z=(e,t,n)=>(n=e!=null?d1(x1(e)):{},h1(t||!e||!e.__esModule?bs(n,"default",{value:e,enumerable:!0}):n,e));var ya=K((B3,zs)=>{"use strict";function Me(e){if(this.size=e|0,this.size<=1||(this.size&this.size-1)!==0)throw new Error("FFT size must be a power of two and bigger than 1");this._csize=e<<1;for(var t=new Array(this.size*2),n=0;n<t.length;n+=2){let c=Math.PI*n/this.size;t[n]=Math.cos(c),t[n+1]=-Math.sin(c)}this.table=t;for(var r=0,u=1;this.size>u;u<<=1)r++;this._width=r%2===0?r-1:r,this._bitrev=new Array(1<<this._width);for(var i=0;i<this._bitrev.length;i++){this._bitrev[i]=0;for(var o=0;o<this._width;o+=2){var a=this._width-o-2;this._bitrev[i]|=(i>>>o&3)<<a}}this._out=null,this._data=null,this._inv=0}zs.exports=Me;Me.prototype.fromComplexArray=function(t,n){for(var r=n||new Array(t.length>>>1),u=0;u<t.length;u+=2)r[u>>>1]=t[u];return r};Me.prototype.createComplexArray=function(){let t=new Array(this._csize);for(var n=0;n<t.length;n++)t[n]=0;return t};Me.prototype.toComplexArray=function(t,n){for(var r=n||this.createComplexArray(),u=0;u<r.length;u+=2)r[u]=t[u>>>1],r[u+1]=0;return r};Me.prototype.completeSpectrum=function(t){for(var n=this._csize,r=n>>>1,u=2;u<r;u+=2)t[n-u]=t[u],t[n-u+1]=-t[u+1]};Me.prototype.transform=function(t,n){if(t===n)throw new Error("Input and output buffers must be different");this._out=t,this._data=n,this._inv=0,this._transform4(),this._out=null,this._data=null};Me.prototype.realTransform=function(t,n){if(t===n)throw new Error("Input and output buffers must be different");this._out=t,this._data=n,this._inv=0,this._realTransform4(),this._out=null,this._data=null};Me.prototype.inverseTransform=function(t,n){if(t===n)throw new Error("Input and output buffers must be different");this._out=t,this._data=n,this._inv=1,this._transform4();for(var r=0;r<t.length;r++)t[r]/=this.size;this._out=null,this._data=null};Me.prototype._transform4=function(){var t=this._out,n=this._csize,r=this._width,u=1<<r,i=n/u<<1,o,a,c=this._bitrev;if(i===4)for(o=0,a=0;o<n;o+=i,a++){let T=c[a];this._singleTransform2(o,T,u)}else for(o=0,a=0;o<n;o+=i,a++){let T=c[a];this._singleTransform4(o,T,u)}var l=this._inv?-1:1,m=this.table;for(u>>=2;u>=2;u>>=2){i=n/u<<1;var x=i>>>2;for(o=0;o<n;o+=i)for(var d=o+x,p=o,v=0;p<d;p+=2,v+=u){let T=p,V=T+x,f=V+x,s=f+x,y=t[T],g=t[T+1],b=t[V],z=t[V+1],S=t[f],E=t[f+1],A=t[s],_=t[s+1],Te=y,pt=g,xn=m[v],gn=l*m[v+1],hn=b*xn-z*gn,vn=b*gn+z*xn,qr=m[2*v],Kr=l*m[2*v+1],jr=S*qr-E*Kr,Hr=S*Kr+E*qr,Yr=m[3*v],Wr=l*m[3*v+1],Zr=A*Yr-_*Wr,Qr=A*Wr+_*Yr,Ir=Te+jr,Fn=pt+Hr,Xn=Te-jr,$r=pt-Hr,Jr=hn+Zr,qn=vn+Qr,Kn=l*(hn-Zr),eu=l*(vn-Qr),li=Ir+Jr,ua=Fn+qn,ia=Ir-Jr,oa=Fn-qn,aa=Xn+eu,ca=$r-Kn,la=Xn-eu,sa=$r+Kn;t[T]=li,t[T+1]=ua,t[V]=aa,t[V+1]=ca,t[f]=ia,t[f+1]=oa,t[s]=la,t[s+1]=sa}}};Me.prototype._singleTransform2=function(t,n,r){let u=this._out,i=this._data,o=i[n],a=i[n+1],c=i[n+r],l=i[n+r+1],m=o+c,x=a+l,d=o-c,p=a-l;u[t]=m,u[t+1]=x,u[t+2]=d,u[t+3]=p};Me.prototype._singleTransform4=function(t,n,r){let u=this._out,i=this._data,o=this._inv?-1:1,a=r*2,c=r*3,l=i[n],m=i[n+1],x=i[n+r],d=i[n+r+1],p=i[n+a],v=i[n+a+1],T=i[n+c],V=i[n+c+1],f=l+p,s=m+v,y=l-p,g=m-v,b=x+T,z=d+V,S=o*(x-T),E=o*(d-V),A=f+b,_=s+z,Te=y+E,pt=g-S,xn=f-b,gn=s-z,hn=y-E,vn=g+S;u[t]=A,u[t+1]=_,u[t+2]=Te,u[t+3]=pt,u[t+4]=xn,u[t+5]=gn,u[t+6]=hn,u[t+7]=vn};Me.prototype._realTransform4=function(){var t=this._out,n=this._csize,r=this._width,u=1<<r,i=n/u<<1,o,a,c=this._bitrev;if(i===4)for(o=0,a=0;o<n;o+=i,a++){let fa=c[a];this._singleRealTransform2(o,fa>>>1,u>>>1)}else for(o=0,a=0;o<n;o+=i,a++){let fa=c[a];this._singleRealTransform4(o,fa>>>1,u>>>1)}var l=this._inv?-1:1,m=this.table;for(u>>=2;u>=2;u>>=2){i=n/u<<1;var x=i>>>1,d=x>>>1,p=d>>>1;for(o=0;o<n;o+=i)for(var v=0,T=0;v<=p;v+=2,T+=u){var V=o+v,f=V+d,s=f+d,y=s+d,g=t[V],b=t[V+1],z=t[f],S=t[f+1],E=t[s],A=t[s+1],_=t[y],Te=t[y+1],pt=g,xn=b,gn=m[T],hn=l*m[T+1],vn=z*gn-S*hn,qr=z*hn+S*gn,Kr=m[2*T],jr=l*m[2*T+1],Hr=E*Kr-A*jr,Yr=E*jr+A*Kr,Wr=m[3*T],Zr=l*m[3*T+1],Qr=_*Wr-Te*Zr,Ir=_*Zr+Te*Wr,Fn=pt+Hr,Xn=xn+Yr,$r=pt-Hr,Jr=xn-Yr,qn=vn+Qr,Kn=qr+Ir,eu=l*(vn-Qr),li=l*(qr-Ir),ua=Fn+qn,ia=Xn+Kn,oa=$r+li,aa=Jr-eu;if(t[V]=ua,t[V+1]=ia,t[f]=oa,t[f+1]=aa,v===0){var ca=Fn-qn,la=Xn-Kn;t[s]=ca,t[s+1]=la;continue}if(v!==p){var sa=$r,n1=-Jr,r1=Fn,u1=-Xn,i1=-l*li,o1=-l*eu,a1=-l*Kn,c1=-l*qn,l1=sa+i1,s1=n1+o1,f1=r1+c1,m1=u1-a1,Ts=o+d-v,Ss=o+x-v;t[Ts]=l1,t[Ts+1]=s1,t[Ss]=f1,t[Ss+1]=m1}}}};Me.prototype._singleRealTransform2=function(t,n,r){let u=this._out,i=this._data,o=i[n],a=i[n+r],c=o+a,l=o-a;u[t]=c,u[t+1]=0,u[t+2]=l,u[t+3]=0};Me.prototype._singleRealTransform4=function(t,n,r){let u=this._out,i=this._data,o=this._inv?-1:1,a=r*2,c=r*3,l=i[n],m=i[n+r],x=i[n+a],d=i[n+c],p=l+x,v=l-x,T=m+d,V=o*(m-d),f=p+T,s=v,y=-V,g=p-T,b=v,z=V;u[t]=f,u[t+1]=0,u[t+2]=s,u[t+3]=y,u[t+4]=g,u[t+5]=0,u[t+6]=b,u[t+7]=z}});var va=K(we=>{"use strict";var _s=we&&we.__extends||(function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,u){r.__proto__=u}||function(r,u){for(var i in u)u.hasOwnProperty(i)&&(r[i]=u[i])},e(t,n)};return function(t,n){e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}})();Object.defineProperty(we,"__esModule",{value:!0});we.buildLexer=we.extractByTokenRange=we.extractByPositionRange=we.TokenRangeError=we.TokenError=void 0;function ha(e){return e===void 0?"<END-OF-FILE>":JSON.stringify(e)}var Bs=(function(e){_s(t,e);function t(n,r){var u=e.call(this,ha(n)+": "+r)||this;return u.pos=n,u.errorMessage=r,u}return t})(Error);we.TokenError=Bs;var W1=(function(e){_s(t,e);function t(n,r,u){var i=e.call(this,ha(n)+" - "+ha(r)+": "+u)||this;return i.first=n,i.next=r,i.errorMessage=u,i}return t})(Error);we.TokenRangeError=W1;function Us(e,t,n){var r=t===void 0?e.length:t.index,u=n===void 0?e.length:n.index;return r>=u?"":e.substring(r,u)}we.extractByPositionRange=Us;function Z1(e,t,n){return Us(e,t===void 0?void 0:t.pos,n===void 0?void 0:n.pos)}we.extractByTokenRange=Z1;var Q1=(function(){function e(t,n,r,u,i,o){this.lexer=t,this.input=n,this.kind=r,this.text=u,this.pos=i,this.keep=o}return Object.defineProperty(e.prototype,"next",{get:function(){return this.nextToken===void 0&&(this.nextToken=this.lexer.parseNextAvailable(this.input,this.pos.index+this.text.length,this.pos.rowEnd,this.pos.columnEnd),this.nextToken===void 0&&(this.nextToken=null)),this.nextToken===null?void 0:this.nextToken},enumerable:!1,configurable:!0}),e})(),I1=(function(){function e(t){this.rules=t;for(var n=0,r=this.rules;n<r.length;n++){var u=r[n];if(u[1].source[0]!=="^")throw new Error('Regular expression patterns for a tokenizer should start with "^": '+u[1].source);if(!u[1].global)throw new Error("Regular expression patterns for a tokenizer should be global: "+u[1].source)}}return e.prototype.parse=function(t){return this.parseNextAvailable(t,0,1,1)},e.prototype.parseNext=function(t,n,r,u){if(n!==t.length){for(var i=t.substr(n),o,a=0,c=this.rules;a<c.length;a++){var l=c[a],m=l[0],x=l[1],d=l[2];if(x.lastIndex=0,x.test(i)){for(var p=i.substr(0,x.lastIndex),v=r,T=u,V=0,f=p;V<f.length;V++){var s=f[V];switch(s){case"\r":break;case`
`:v++,T=1;break;default:T++}}var y=new Q1(this,t,d,p,{index:n,rowBegin:r,columnBegin:u,rowEnd:v,columnEnd:T},m);(o===void 0||o.text.length<y.text.length)&&(o=y)}}if(o===void 0)throw new Bs({index:n,rowBegin:r,columnBegin:u,rowEnd:r,columnEnd:u},"Unable to tokenize the rest of the input: "+t.substr(n));return o}},e.prototype.parseNextAvailable=function(t,n,r,u){for(var i;;){if(i=this.parseNext(t,i===void 0?n:i.pos.index+i.text.length,i===void 0?r:i.pos.rowEnd,i===void 0?u:i.pos.columnEnd),i===void 0)return;if(i.keep)return i}},e})();function $1(e){return new I1(e)}we.buildLexer=$1});var yt=K(Lt=>{"use strict";Object.defineProperty(Lt,"__esModule",{value:!0});Lt.unableToConsumeToken=Lt.resultOrError=Lt.betterError=void 0;function J1(e,t){return e===void 0?t:t===void 0||e.pos===void 0?e:t.pos===void 0||e.pos.index<t.pos.index?t:(e.pos.index>t.pos.index,e)}Lt.betterError=J1;function ey(e,t,n){return n?{candidates:e,successful:!0,error:t}:{successful:!1,error:t}}Lt.resultOrError=ey;function ty(e){return{kind:"Error",pos:e===void 0?void 0:e.pos,message:"Unable to consume token: "+(e===void 0?"<END-OF-FILE>":e.text)}}Lt.unableToConsumeToken=ty});var xi=K(je=>{"use strict";Object.defineProperty(je,"__esModule",{value:!0});je.tok=je.str=je.fail=je.succ=je.nil=void 0;var Os=yt();function ny(){return{parse:function(e){return{candidates:[{firstToken:e,nextToken:e,result:void 0}],successful:!0,error:void 0}}}}je.nil=ny;function ry(e){return{parse:function(t){return{candidates:[{firstToken:t,nextToken:t,result:e}],successful:!0,error:void 0}}}}je.succ=ry;function uy(e){return{parse:function(t){return{successful:!1,error:{kind:"Error",pos:t?.pos,message:e}}}}}je.fail=uy;function iy(e){return{parse:function(t){return t===void 0||t.text!==e?{successful:!1,error:Os.unableToConsumeToken(t)}:{candidates:[{firstToken:t,nextToken:t.next,result:t}],successful:!0,error:void 0}}}}je.str=iy;function oy(e){return{parse:function(t){return t===void 0||t.kind!==e?{successful:!1,error:Os.unableToConsumeToken(t)}:{candidates:[{firstToken:t,nextToken:t.next,result:t}],successful:!0,error:void 0}}}}je.tok=oy});var Ds=K(gi=>{"use strict";Object.defineProperty(gi,"__esModule",{value:!0});gi.combine=void 0;var Cs=yt();function ay(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return{parse:function(r){var u=e.parse(r);if(!u.successful)return u;for(var i=u.candidates,o=u.error,a=0,c=t;a<c.length;a++){var l=c[a];if(i.length===0)break;var m=i;i=[];for(var x=0,d=m;x<d.length;x++){var p=d[x],v=l(p.result).parse(p.nextToken);if(o=Cs.betterError(o,v.error),v.successful)for(var T=0,V=v.candidates;T<V.length;T++){var f=V[T];i.push({firstToken:p.firstToken,nextToken:f.nextToken,result:f.result})}}}return Cs.resultOrError(i,o,i.length!==0)}}}gi.combine=ay});var vi=K(hi=>{"use strict";Object.defineProperty(hi,"__esModule",{value:!0});hi.seq=void 0;var ks=yt();function cy(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return{parse:function(n){for(var r,u=[{firstToken:n,nextToken:n,result:[]}],i=0,o=e;i<o.length;i++){var a=o[i];if(u.length===0)break;var c=u;u=[];for(var l=0,m=c;l<m.length;l++){var x=m[l],d=a.parse(x.nextToken);if(r=ks.betterError(r,d.error),d.successful)for(var p=0,v=d.candidates;p<v.length;p++){var T=v[p];u.push({firstToken:x.firstToken,nextToken:T.nextToken,result:x.result.concat([T.result])})}}}return ks.resultOrError(u,r,u.length!==0)}}}hi.seq=cy});var Ta=K(Ti=>{"use strict";Object.defineProperty(Ti,"__esModule",{value:!0});Ti.alt=void 0;var Ls=yt();function ly(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return{parse:function(n){for(var r,u=[],i=!1,o=0,a=e;o<a.length;o++){var c=a[o],l=c.parse(n);r=Ls.betterError(r,l.error),l.successful&&(u=u.concat(l.candidates),i=!0)}return Ls.resultOrError(u,r,i)}}}Ti.alt=ly});var Ps=K(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.alt_sc=void 0;var Ns=yt();function sy(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return{parse:function(n){for(var r,u=0,i=e;u<i.length;u++){var o=i[u],a=o.parse(n);if(r=Ns.betterError(r,a.error),a.successful)return Ns.resultOrError(a.candidates,r,!0)}return{successful:!1,error:r}}}}Si.alt_sc=sy});var Fs=K(Hn=>{"use strict";Object.defineProperty(Hn,"__esModule",{value:!0});Hn.opt_sc=Hn.opt=void 0;var fy=Ta(),my=xi();function dy(e){return fy.alt(e,my.nil())}Hn.opt=dy;function py(e){return{parse:function(t){var n=e.parse(t);return n.successful?n:{candidates:[{firstToken:t,nextToken:t,result:void 0}],successful:!0,error:n.error}}}}Hn.opt_sc=py});var ba=K(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.kmid=ot.kright=ot.kleft=ot.apply=void 0;var Sa=vi();function bi(e,t){return{parse:function(n){var r=e.parse(n);return r.successful?{candidates:r.candidates.map(function(u){return{firstToken:n,nextToken:u.nextToken,result:t(u.result,[n,u.nextToken])}}),successful:!0,error:r.error}:r}}}ot.apply=bi;function yy(e,t){return bi(Sa.seq(e,t),function(n){return n[0]})}ot.kleft=yy;function xy(e,t){return bi(Sa.seq(e,t),function(n){return n[1]})}ot.kright=xy;function gy(e,t,n){return bi(Sa.seq(e,t,n),function(r){return r[1]})}ot.kmid=gy});var js=K($=>{"use strict";var hy=$&&$.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),u=0,t=0;t<n;t++)for(var i=arguments[t],o=0,a=i.length;o<a;o++,u++)r[u]=i[o];return r};Object.defineProperty($,"__esModule",{value:!0});$.lrec_sc=$.lrec=$.list_n=$.list_sc=$.list=$.rep_n=$.repr=$.rep_sc=$.rep=void 0;var xt=ba(),Yn=yt(),iu=vi(),vy=xi();function Va(e){var t=Xs(e);return{parse:function(n){var r=t.parse(n);return r.successful?{candidates:r.candidates.reverse(),successful:!0,error:r.error}:r}}}$.rep=Va;function Ea(e){return{parse:function(t){for(var n,r=[{firstToken:t,nextToken:t,result:[]}];;){var u=r;r=[];for(var i=0,o=u;i<o.length;i++){var a=o[i],c=e.parse(a.nextToken);if(n=Yn.betterError(n,c.error),c.successful)for(var l=0,m=c.candidates;l<m.length;l++){var x=m[l];x.nextToken!==a.nextToken&&r.push({firstToken:a.firstToken,nextToken:x.nextToken,result:a.result.concat([x.result])})}}if(r.length===0){r=u;break}}return Yn.resultOrError(r,n,!0)}}}$.rep_sc=Ea;function Xs(e){return{parse:function(t){for(var n,r=[{firstToken:t,nextToken:t,result:[]}],u=0;u<r.length;u++){var i=r[u],o=e.parse(i.nextToken);if(n=Yn.betterError(n,o.error),o.successful)for(var a=0,c=o.candidates;a<c.length;a++){var l=c[a];l.nextToken!==i.nextToken&&r.push({firstToken:i.firstToken,nextToken:l.nextToken,result:i.result.concat([l.result])})}}return Yn.resultOrError(r,n,!0)}}}$.repr=Xs;function qs(e,t){return{parse:function(n){for(var r,u=[{firstToken:n,nextToken:n,result:[]}],i=0;i<t;i++){for(var o=[],a=0,c=u;a<c.length;a++){var l=c[a],m=e.parse(l.nextToken);if(r=Yn.betterError(r,m.error),m.successful)for(var x=0,d=m.candidates;x<d.length;x++){var p=d[x];o.push({firstToken:l.firstToken,nextToken:p.nextToken,result:l.result.concat([p.result])})}}if(o.length===0)return{successful:!1,error:r};u=o}return Yn.resultOrError(u,r,!0)}}}$.rep_n=qs;function Ma(e){var t=e[0],n=e[1];return hy([t],n)}function Ty(e,t){return xt.apply(iu.seq(e,Va(xt.kright(t,e))),Ma)}$.list=Ty;function Sy(e,t){return xt.apply(iu.seq(e,Ea(xt.kright(t,e))),Ma)}$.list_sc=Sy;function by(e,t,n){return n<1?vy.succ([]):n===1?xt.apply(e,function(r){return[r]}):xt.apply(iu.seq(e,qs(xt.kright(t,e),n-1)),Ma)}$.list_n=by;function Ks(e){return function(t){for(var n=t[0],r=0,u=t[1];r<u.length;r++){var i=u[r];n=e(n,i)}return n}}function Vy(e,t,n){return xt.apply(iu.seq(e,Va(t)),Ks(n))}$.lrec=Vy;function Ey(e,t,n){return xt.apply(iu.seq(e,Ea(t)),Ks(n))}$.lrec_sc=Ey});var Hs=K(Vi=>{"use strict";Object.defineProperty(Vi,"__esModule",{value:!0});Vi.amb=void 0;function My(e){return{parse:function(t){var n=e.parse(t);if(!n.successful)return n;for(var r=new Map,u=0,i=n.candidates;u<i.length;u++){var o=i[u],a=r.get(o.nextToken);a===void 0?r.set(o.nextToken,[o]):a.push(o)}return{candidates:Array.from(r.values()).map(function(c){return{firstToken:c[0].firstToken,nextToken:c[0].nextToken,result:c.map(function(l){return l.result})}}),successful:!0,error:n.error}}}}Vi.amb=My});var Ys=K(Wn=>{"use strict";Object.defineProperty(Wn,"__esModule",{value:!0});Wn.errd=Wn.err=void 0;function wy(e,t){return{parse:function(n){var r=e.parse(n);return r.successful?r:{successful:!1,error:{kind:"Error",pos:r.error.pos,message:t}}}}}Wn.err=wy;function Ay(e,t,n){return{parse:function(r){var u=e.parse(r);return u.successful?u:{successful:!0,candidates:[{firstToken:r,nextToken:r,result:n}],error:{kind:"Error",pos:u.error.pos,message:t}}}}}Wn.errd=Ay});var Zs=K(Nt=>{"use strict";Object.defineProperty(Nt,"__esModule",{value:!0});Nt.expectSingleResult=Nt.expectEOF=Nt.rule=void 0;var wa=va(),Ws=yt(),zy=(function(){function e(){}return e.prototype.setPattern=function(t){this.parser=t},e.prototype.parse=function(t){if(this.parser===void 0)throw new Error("Rule has not been initialized. setPattern is required before calling parse.");return this.parser.parse(t)},e})();function Ry(){return new zy}Nt.rule=Ry;function Gy(e){if(!e.successful)return e;if(e.candidates.length===0)return{successful:!1,error:{kind:"Error",pos:void 0,message:"No result is returned."}};for(var t=[],n=e.error,r=0,u=e.candidates;r<u.length;r++){var i=u[r];i.nextToken===void 0?t.push(i):n=Ws.betterError(n,{kind:"Error",pos:i.nextToken===void 0?void 0:i.nextToken.pos,message:'The parser cannot reach the end of file, stops at "'+i.nextToken.text+'" at position '+JSON.stringify(i.nextToken.pos)+"."})}return Ws.resultOrError(t,n,t.length!==0)}Nt.expectEOF=Gy;function _y(e){if(!e.successful)throw new wa.TokenError(e.error.pos,e.error.message);if(e.candidates.length===0)throw new wa.TokenError(void 0,"No result is returned.");if(e.candidates.length!==1)throw new wa.TokenError(void 0,"Multiple results are returned.");return e.candidates[0].result}Nt.expectSingleResult=_y});var Is=K(Zn=>{"use strict";Object.defineProperty(Zn,"__esModule",{value:!0});Zn.makeParserModule=Zn.lazy=void 0;function Qs(e){return{parse:function(t){return e().parse(t)}}}Zn.lazy=Qs;var By=function(e,t,n){return Object.defineProperty(e,t,{configurable:!0,writable:!1,enumerable:!0,value:n})};function Uy(e){for(var t=Object.create(null),n=function(c,l){t=By(t,c,Qs(function(){return l(t)}))},r=0,u=Object.entries(e);r<u.length;r++){var i=u[r],o=i[0],a=i[1];n(o,a)}return t}Zn.makeParserModule=Uy});var $s=K(ue=>{"use strict";var Oy=ue&&ue.__createBinding||(Object.create?(function(e,t,n,r){r===void 0&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}):(function(e,t,n,r){r===void 0&&(r=n),e[r]=t[n]})),Ae=ue&&ue.__exportStar||function(e,t){for(var n in e)n!=="default"&&!t.hasOwnProperty(n)&&Oy(t,e,n)};Object.defineProperty(ue,"__esModule",{value:!0});Ae(va(),ue);Ae(yt(),ue);Ae(xi(),ue);Ae(Ds(),ue);Ae(vi(),ue);Ae(Ta(),ue);Ae(Ps(),ue);Ae(Fs(),ue);Ae(js(),ue);Ae(ba(),ue);Ae(Hs(),ue);Ae(Ys(),ue);Ae(Zs(),ue);Ae(Is(),ue)});var tf=K((dT,ef)=>{ef.exports=Xy;function Xy(e){return e===0?1:(e--,e|=e>>1,e|=e>>2,e|=e>>4,e|=e>>8,e|=e>>16,e+1)}});var pf=K(R=>{"use strict";/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ba=Symbol.for("react.transitional.element"),Yy=Symbol.for("react.portal"),Wy=Symbol.for("react.fragment"),Zy=Symbol.for("react.strict_mode"),Qy=Symbol.for("react.profiler"),Iy=Symbol.for("react.consumer"),$y=Symbol.for("react.context"),Jy=Symbol.for("react.forward_ref"),ex=Symbol.for("react.suspense"),tx=Symbol.for("react.memo"),cf=Symbol.for("react.lazy"),nx=Symbol.for("react.activity"),rf=Symbol.iterator;function rx(e){return e===null||typeof e!="object"?null:(e=rf&&e[rf]||e["@@iterator"],typeof e=="function"?e:null)}var lf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},sf=Object.assign,ff={};function In(e,t,n){this.props=e,this.context=t,this.refs=ff,this.updater=n||lf}In.prototype.isReactComponent={};In.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};In.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function mf(){}mf.prototype=In.prototype;function Ua(e,t,n){this.props=e,this.context=t,this.refs=ff,this.updater=n||lf}var Oa=Ua.prototype=new mf;Oa.constructor=Ua;sf(Oa,In.prototype);Oa.isPureReactComponent=!0;var uf=Array.isArray;function _a(){}var j={H:null,A:null,T:null,S:null},df=Object.prototype.hasOwnProperty;function Ca(e,t,n){var r=n.ref;return{$$typeof:Ba,type:e,key:t,ref:r!==void 0?r:null,props:n}}function ux(e,t){return Ca(e.type,t,e.props)}function Da(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ba}function ix(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var of=/\/+/g;function Ga(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ix(""+e.key):t.toString(36)}function ox(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(_a,_a):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Qn(e,t,n,r,u){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"bigint":case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case Ba:case Yy:o=!0;break;case cf:return o=e._init,Qn(o(e._payload),t,n,r,u)}}if(o)return u=u(e),o=r===""?"."+Ga(e,0):r,uf(u)?(n="",o!=null&&(n=o.replace(of,"$&/")+"/"),Qn(u,t,n,"",function(l){return l})):u!=null&&(Da(u)&&(u=ux(u,n+(u.key==null||e&&e.key===u.key?"":(""+u.key).replace(of,"$&/")+"/")+o)),t.push(u)),1;o=0;var a=r===""?".":r+":";if(uf(e))for(var c=0;c<e.length;c++)r=e[c],i=a+Ga(r,c),o+=Qn(r,t,n,i,u);else if(c=rx(e),typeof c=="function")for(e=c.call(e),c=0;!(r=e.next()).done;)r=r.value,i=a+Ga(r,c++),o+=Qn(r,t,n,i,u);else if(i==="object"){if(typeof e.then=="function")return Qn(ox(e),t,n,r,u);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return o}function Mi(e,t,n){if(e==null)return e;var r=[],u=0;return Qn(e,r,"","",function(i){return t.call(n,i,u++)}),r}function ax(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var af=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},cx={map:Mi,forEach:function(e,t,n){Mi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Mi(e,function(){t++}),t},toArray:function(e){return Mi(e,function(t){return t})||[]},only:function(e){if(!Da(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Activity=nx;R.Children=cx;R.Component=In;R.Fragment=Wy;R.Profiler=Qy;R.PureComponent=Ua;R.StrictMode=Zy;R.Suspense=ex;R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=j;R.__COMPILER_RUNTIME={__proto__:null,c:function(e){return j.H.useMemoCache(e)}};R.cache=function(e){return function(){return e.apply(null,arguments)}};R.cacheSignal=function(){return null};R.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var r=sf({},e.props),u=e.key;if(t!=null)for(i in t.key!==void 0&&(u=""+t.key),t)!df.call(t,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&t.ref===void 0||(r[i]=t[i]);var i=arguments.length-2;if(i===1)r.children=n;else if(1<i){for(var o=Array(i),a=0;a<i;a++)o[a]=arguments[a+2];r.children=o}return Ca(e.type,u,r)};R.createContext=function(e){return e={$$typeof:$y,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Iy,_context:e},e};R.createElement=function(e,t,n){var r,u={},i=null;if(t!=null)for(r in t.key!==void 0&&(i=""+t.key),t)df.call(t,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(u[r]=t[r]);var o=arguments.length-2;if(o===1)u.children=n;else if(1<o){for(var a=Array(o),c=0;c<o;c++)a[c]=arguments[c+2];u.children=a}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)u[r]===void 0&&(u[r]=o[r]);return Ca(e,i,u)};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:Jy,render:e}};R.isValidElement=Da;R.lazy=function(e){return{$$typeof:cf,_payload:{_status:-1,_result:e},_init:ax}};R.memo=function(e,t){return{$$typeof:tx,type:e,compare:t===void 0?null:t}};R.startTransition=function(e){var t=j.T,n={};j.T=n;try{var r=e(),u=j.S;u!==null&&u(n,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(_a,af)}catch(i){af(i)}finally{t!==null&&n.types!==null&&(t.types=n.types),j.T=t}};R.unstable_useCacheRefresh=function(){return j.H.useCacheRefresh()};R.use=function(e){return j.H.use(e)};R.useActionState=function(e,t,n){return j.H.useActionState(e,t,n)};R.useCallback=function(e,t){return j.H.useCallback(e,t)};R.useContext=function(e){return j.H.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e,t){return j.H.useDeferredValue(e,t)};R.useEffect=function(e,t){return j.H.useEffect(e,t)};R.useEffectEvent=function(e){return j.H.useEffectEvent(e)};R.useId=function(){return j.H.useId()};R.useImperativeHandle=function(e,t,n){return j.H.useImperativeHandle(e,t,n)};R.useInsertionEffect=function(e,t){return j.H.useInsertionEffect(e,t)};R.useLayoutEffect=function(e,t){return j.H.useLayoutEffect(e,t)};R.useMemo=function(e,t){return j.H.useMemo(e,t)};R.useOptimistic=function(e,t){return j.H.useOptimistic(e,t)};R.useReducer=function(e,t,n){return j.H.useReducer(e,t,n)};R.useRef=function(e){return j.H.useRef(e)};R.useState=function(e){return j.H.useState(e)};R.useSyncExternalStore=function(e,t,n){return j.H.useSyncExternalStore(e,t,n)};R.useTransition=function(){return j.H.useTransition()};R.version="19.2.4"});var te=K((J4,yf)=>{"use strict";yf.exports=pf()});var Mf=K(Q=>{"use strict";/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Pa(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,u=e[r];if(0<wi(u,t))e[r]=t,e[n]=u,n=r;else break e}}function at(e){return e.length===0?null:e[0]}function zi(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,u=e.length,i=u>>>1;r<i;){var o=2*(r+1)-1,a=e[o],c=o+1,l=e[c];if(0>wi(a,n))c<u&&0>wi(l,a)?(e[r]=l,e[c]=n,r=c):(e[r]=a,e[o]=n,r=o);else if(c<u&&0>wi(l,n))e[r]=l,e[c]=n,r=c;else break e}}return t}function wi(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Q.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(xf=performance,Q.unstable_now=function(){return xf.now()}):(ka=Date,gf=ka.now(),Q.unstable_now=function(){return ka.now()-gf});var xf,ka,gf,gt=[],Pt=[],lx=1,He=null,Se=3,Fa=!1,ou=!1,au=!1,Xa=!1,Tf=typeof setTimeout=="function"?setTimeout:null,Sf=typeof clearTimeout=="function"?clearTimeout:null,hf=typeof setImmediate<"u"?setImmediate:null;function Ai(e){for(var t=at(Pt);t!==null;){if(t.callback===null)zi(Pt);else if(t.startTime<=e)zi(Pt),t.sortIndex=t.expirationTime,Pa(gt,t);else break;t=at(Pt)}}function qa(e){if(au=!1,Ai(e),!ou)if(at(gt)!==null)ou=!0,Jn||(Jn=!0,$n());else{var t=at(Pt);t!==null&&Ka(qa,t.startTime-e)}}var Jn=!1,cu=-1,bf=5,Vf=-1;function Ef(){return Xa?!0:!(Q.unstable_now()-Vf<bf)}function La(){if(Xa=!1,Jn){var e=Q.unstable_now();Vf=e;var t=!0;try{e:{ou=!1,au&&(au=!1,Sf(cu),cu=-1),Fa=!0;var n=Se;try{t:{for(Ai(e),He=at(gt);He!==null&&!(He.expirationTime>e&&Ef());){var r=He.callback;if(typeof r=="function"){He.callback=null,Se=He.priorityLevel;var u=r(He.expirationTime<=e);if(e=Q.unstable_now(),typeof u=="function"){He.callback=u,Ai(e),t=!0;break t}He===at(gt)&&zi(gt),Ai(e)}else zi(gt);He=at(gt)}if(He!==null)t=!0;else{var i=at(Pt);i!==null&&Ka(qa,i.startTime-e),t=!1}}break e}finally{He=null,Se=n,Fa=!1}t=void 0}}finally{t?$n():Jn=!1}}}var $n;typeof hf=="function"?$n=function(){hf(La)}:typeof MessageChannel<"u"?(Na=new MessageChannel,vf=Na.port2,Na.port1.onmessage=La,$n=function(){vf.postMessage(null)}):$n=function(){Tf(La,0)};var Na,vf;function Ka(e,t){cu=Tf(function(){e(Q.unstable_now())},t)}Q.unstable_IdlePriority=5;Q.unstable_ImmediatePriority=1;Q.unstable_LowPriority=4;Q.unstable_NormalPriority=3;Q.unstable_Profiling=null;Q.unstable_UserBlockingPriority=2;Q.unstable_cancelCallback=function(e){e.callback=null};Q.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):bf=0<e?Math.floor(1e3/e):5};Q.unstable_getCurrentPriorityLevel=function(){return Se};Q.unstable_next=function(e){switch(Se){case 1:case 2:case 3:var t=3;break;default:t=Se}var n=Se;Se=t;try{return e()}finally{Se=n}};Q.unstable_requestPaint=function(){Xa=!0};Q.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Se;Se=e;try{return t()}finally{Se=n}};Q.unstable_scheduleCallback=function(e,t,n){var r=Q.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var u=-1;break;case 2:u=250;break;case 5:u=1073741823;break;case 4:u=1e4;break;default:u=5e3}return u=n+u,e={id:lx++,callback:t,priorityLevel:e,startTime:n,expirationTime:u,sortIndex:-1},n>r?(e.sortIndex=n,Pa(Pt,e),at(gt)===null&&e===at(Pt)&&(au?(Sf(cu),cu=-1):au=!0,Ka(qa,n-r))):(e.sortIndex=u,Pa(gt,e),ou||Fa||(ou=!0,Jn||(Jn=!0,$n()))),e};Q.unstable_shouldYield=Ef;Q.unstable_wrapCallback=function(e){var t=Se;return function(){var n=Se;Se=t;try{return e.apply(this,arguments)}finally{Se=n}}}});var Af=K((tS,wf)=>{"use strict";wf.exports=Mf()});var Rf=K(Ve=>{"use strict";/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sx=te();function zf(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ft(){}var be={d:{f:Ft,r:function(){throw Error(zf(522))},D:Ft,C:Ft,L:Ft,m:Ft,X:Ft,S:Ft,M:Ft},p:0,findDOMNode:null},fx=Symbol.for("react.portal");function mx(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fx,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}var lu=sx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Ri(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Ve.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=be;Ve.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(zf(299));return mx(e,t,null,n)};Ve.flushSync=function(e){var t=lu.T,n=be.p;try{if(lu.T=null,be.p=2,e)return e()}finally{lu.T=t,be.p=n,be.d.f()}};Ve.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,be.d.C(e,t))};Ve.prefetchDNS=function(e){typeof e=="string"&&be.d.D(e)};Ve.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,r=Ri(n,t.crossOrigin),u=typeof t.integrity=="string"?t.integrity:void 0,i=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?be.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:r,integrity:u,fetchPriority:i}):n==="script"&&be.d.X(e,{crossOrigin:r,integrity:u,fetchPriority:i,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Ve.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Ri(t.as,t.crossOrigin);be.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&be.d.M(e)};Ve.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,r=Ri(n,t.crossOrigin);be.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Ve.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Ri(t.as,t.crossOrigin);be.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else be.d.m(e)};Ve.requestFormReset=function(e){be.d.r(e)};Ve.unstable_batchedUpdates=function(e,t){return e(t)};Ve.useFormState=function(e,t,n){return lu.H.useFormState(e,t,n)};Ve.useFormStatus=function(){return lu.H.useHostTransitionStatus()};Ve.version="19.2.4"});var Bf=K((rS,_f)=>{"use strict";function Gf(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gf)}catch(e){console.error(e)}}Gf(),_f.exports=Rf()});var K0=K(ta=>{"use strict";/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var se=Af(),ud=te(),dx=Bf();function h(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function id(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Zu(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function od(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function ad(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Uf(e){if(Zu(e)!==e)throw Error(h(188))}function px(e){var t=e.alternate;if(!t){if(t=Zu(e),t===null)throw Error(h(188));return t!==e?null:e}for(var n=e,r=t;;){var u=n.return;if(u===null)break;var i=u.alternate;if(i===null){if(r=u.return,r!==null){n=r;continue}break}if(u.child===i.child){for(i=u.child;i;){if(i===n)return Uf(u),e;if(i===r)return Uf(u),t;i=i.sibling}throw Error(h(188))}if(n.return!==r.return)n=u,r=i;else{for(var o=!1,a=u.child;a;){if(a===n){o=!0,n=u,r=i;break}if(a===r){o=!0,r=u,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,r=u;break}if(a===r){o=!0,r=i,n=u;break}a=a.sibling}if(!o)throw Error(h(189))}}if(n.alternate!==r)throw Error(h(190))}if(n.tag!==3)throw Error(h(188));return n.stateNode.current===n?e:t}function cd(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=cd(e),t!==null)return t;e=e.sibling}return null}var W=Object.assign,yx=Symbol.for("react.element"),Gi=Symbol.for("react.transitional.element"),gu=Symbol.for("react.portal"),ir=Symbol.for("react.fragment"),ld=Symbol.for("react.strict_mode"),Ec=Symbol.for("react.profiler"),sd=Symbol.for("react.consumer"),Mt=Symbol.for("react.context"),vl=Symbol.for("react.forward_ref"),Mc=Symbol.for("react.suspense"),wc=Symbol.for("react.suspense_list"),Tl=Symbol.for("react.memo"),Xt=Symbol.for("react.lazy"),Ac=Symbol.for("react.activity"),xx=Symbol.for("react.memo_cache_sentinel"),Of=Symbol.iterator;function su(e){return e===null||typeof e!="object"?null:(e=Of&&e[Of]||e["@@iterator"],typeof e=="function"?e:null)}var gx=Symbol.for("react.client.reference");function zc(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===gx?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ir:return"Fragment";case Ec:return"Profiler";case ld:return"StrictMode";case Mc:return"Suspense";case wc:return"SuspenseList";case Ac:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case gu:return"Portal";case Mt:return e.displayName||"Context";case sd:return(e._context.displayName||"Context")+".Consumer";case vl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Tl:return t=e.displayName||null,t!==null?t:zc(e.type)||"Memo";case Xt:t=e._payload,e=e._init;try{return zc(e(t))}catch{}}return null}var hu=Array.isArray,M=ud.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=dx.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Mn={pending:!1,data:null,method:null,action:null},Rc=[],or=-1;function mt(e){return{current:e}}function pe(e){0>or||(e.current=Rc[or],Rc[or]=null,or--)}function q(e,t){or++,Rc[or]=e.current,e.current=t}var ft=mt(null),Cu=mt(null),Jt=mt(null),lo=mt(null);function so(e,t){switch(q(Jt,t),q(Cu,e),q(ft,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Fm(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Fm(t),e=G0(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}pe(ft),q(ft,e)}function Er(){pe(ft),pe(Cu),pe(Jt)}function Gc(e){e.memoizedState!==null&&q(lo,e);var t=ft.current,n=G0(t,e.type);t!==n&&(q(Cu,e),q(ft,n))}function fo(e){Cu.current===e&&(pe(ft),pe(Cu)),lo.current===e&&(pe(lo),Hu._currentValue=Mn)}var ja,Cf;function Sn(e){if(ja===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ja=t&&t[1]||"",Cf=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ja+e+Cf}var Ha=!1;function Ya(e,t){if(!e||Ha)return"";Ha=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var x=function(){throw Error()};if(Object.defineProperty(x.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(x,[])}catch(p){var d=p}Reflect.construct(e,[],x)}else{try{x.call()}catch(p){d=p}e.call(x.prototype)}}else{try{throw Error()}catch(p){d=p}(x=e())&&typeof x.catch=="function"&&x.catch(function(){})}}catch(p){if(p&&d&&typeof p.stack=="string")return[p.stack,d.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=r.DetermineComponentFrameRoot(),o=i[0],a=i[1];if(o&&a){var c=o.split(`
`),l=a.split(`
`);for(u=r=0;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++;for(;u<l.length&&!l[u].includes("DetermineComponentFrameRoot");)u++;if(r===c.length||u===l.length)for(r=c.length-1,u=l.length-1;1<=r&&0<=u&&c[r]!==l[u];)u--;for(;1<=r&&0<=u;r--,u--)if(c[r]!==l[u]){if(r!==1||u!==1)do if(r--,u--,0>u||c[r]!==l[u]){var m=`
`+c[r].replace(" at new "," at ");return e.displayName&&m.includes("<anonymous>")&&(m=m.replace("<anonymous>",e.displayName)),m}while(1<=r&&0<=u);break}}}finally{Ha=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Sn(n):""}function hx(e,t){switch(e.tag){case 26:case 27:case 5:return Sn(e.type);case 16:return Sn("Lazy");case 13:return e.child!==t&&t!==null?Sn("Suspense Fallback"):Sn("Suspense");case 19:return Sn("SuspenseList");case 0:case 15:return Ya(e.type,!1);case 11:return Ya(e.type.render,!1);case 1:return Ya(e.type,!0);case 31:return Sn("Activity");default:return""}}function Df(e){try{var t="",n=null;do t+=hx(e,n),n=e,e=e.return;while(e);return t}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var _c=Object.prototype.hasOwnProperty,Sl=se.unstable_scheduleCallback,Wa=se.unstable_cancelCallback,vx=se.unstable_shouldYield,Tx=se.unstable_requestPaint,Ne=se.unstable_now,Sx=se.unstable_getCurrentPriorityLevel,fd=se.unstable_ImmediatePriority,md=se.unstable_UserBlockingPriority,mo=se.unstable_NormalPriority,bx=se.unstable_LowPriority,dd=se.unstable_IdlePriority,Vx=se.log,Ex=se.unstable_setDisableYieldValue,Qu=null,Pe=null;function Wt(e){if(typeof Vx=="function"&&Ex(e),Pe&&typeof Pe.setStrictMode=="function")try{Pe.setStrictMode(Qu,e)}catch{}}var Fe=Math.clz32?Math.clz32:Ax,Mx=Math.log,wx=Math.LN2;function Ax(e){return e>>>=0,e===0?32:31-(Mx(e)/wx|0)|0}var _i=256,Bi=262144,Ui=4194304;function bn(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function No(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var u=0,i=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var a=r&134217727;return a!==0?(r=a&~i,r!==0?u=bn(r):(o&=a,o!==0?u=bn(o):n||(n=a&~e,n!==0&&(u=bn(n))))):(a=r&~i,a!==0?u=bn(a):o!==0?u=bn(o):n||(n=r&~e,n!==0&&(u=bn(n)))),u===0?0:t!==0&&t!==u&&(t&i)===0&&(i=u&-u,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:u}function Iu(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function zx(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pd(){var e=Ui;return Ui<<=1,(Ui&62914560)===0&&(Ui=4194304),e}function Za(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $u(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Rx(e,t,n,r,u,i){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var a=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var m=31-Fe(n),x=1<<m;a[m]=0,c[m]=-1;var d=l[m];if(d!==null)for(l[m]=null,m=0;m<d.length;m++){var p=d[m];p!==null&&(p.lane&=-536870913)}n&=~x}r!==0&&yd(e,r,0),i!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=i&~(o&~t))}function yd(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Fe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function xd(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Fe(n),u=1<<r;u&t|e[r]&t&&(e[r]|=t),n&=~u}}function gd(e,t){var n=t&-t;return n=(n&42)!==0?1:bl(n),(n&(e.suspendedLanes|t))!==0?0:n}function bl(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Vl(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function hd(){var e=k.p;return e!==0?e:(e=window.event,e===void 0?32:F0(e.type))}function kf(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var dn=Math.random().toString(36).slice(2),xe="__reactFiber$"+dn,Ue="__reactProps$"+dn,Cr="__reactContainer$"+dn,Bc="__reactEvents$"+dn,Gx="__reactListeners$"+dn,_x="__reactHandles$"+dn,Lf="__reactResources$"+dn,Ju="__reactMarker$"+dn;function El(e){delete e[xe],delete e[Ue],delete e[Bc],delete e[Gx],delete e[_x]}function ar(e){var t=e[xe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Cr]||n[xe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Hm(e);e!==null;){if(n=e[xe])return n;e=Hm(e)}return t}e=n,n=e.parentNode}return null}function Dr(e){if(e=e[xe]||e[Cr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function vu(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(h(33))}function gr(e){var t=e[Lf];return t||(t=e[Lf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function de(e){e[Ju]=!0}var vd=new Set,Td={};function Cn(e,t){Mr(e,t),Mr(e+"Capture",t)}function Mr(e,t){for(Td[e]=t,e=0;e<t.length;e++)vd.add(t[e])}var Bx=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Nf={},Pf={};function Ux(e){return _c.call(Pf,e)?!0:_c.call(Nf,e)?!1:Bx.test(e)?Pf[e]=!0:(Nf[e]=!0,!1)}function Wi(e,t,n){if(Ux(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var r=t.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Oi(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function ht(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+r)}}function We(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ox(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var u=r.get,i=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return u.call(this)},set:function(o){n=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(o){n=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Uc(e){if(!e._valueTracker){var t=Sd(e)?"checked":"value";e._valueTracker=Ox(e,t,""+e[t])}}function bd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Sd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function po(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Cx=/[\n"\\]/g;function Ie(e){return e.replace(Cx,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Oc(e,t,n,r,u,i,o,a){e.name="",o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.type=o:e.removeAttribute("type"),t!=null?o==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+We(t)):e.value!==""+We(t)&&(e.value=""+We(t)):o!=="submit"&&o!=="reset"||e.removeAttribute("value"),t!=null?Cc(e,o,We(t)):n!=null?Cc(e,o,We(n)):r!=null&&e.removeAttribute("value"),u==null&&i!=null&&(e.defaultChecked=!!i),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?e.name=""+We(a):e.removeAttribute("name")}function Vd(e,t,n,r,u,i,o,a){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){Uc(e);return}n=n!=null?""+We(n):"",t=t!=null?""+We(t):n,a||t===e.value||(e.value=t),e.defaultValue=t}r=r??u,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=a?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.name=o),Uc(e)}function Cc(e,t,n){t==="number"&&po(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function hr(e,t,n,r){if(e=e.options,t){t={};for(var u=0;u<n.length;u++)t["$"+n[u]]=!0;for(n=0;n<e.length;n++)u=t.hasOwnProperty("$"+e[n].value),e[n].selected!==u&&(e[n].selected=u),u&&r&&(e[n].defaultSelected=!0)}else{for(n=""+We(n),t=null,u=0;u<e.length;u++){if(e[u].value===n){e[u].selected=!0,r&&(e[u].defaultSelected=!0);return}t!==null||e[u].disabled||(t=e[u])}t!==null&&(t.selected=!0)}}function Ed(e,t,n){if(t!=null&&(t=""+We(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+We(n):""}function Md(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(h(92));if(hu(r)){if(1<r.length)throw Error(h(93));r=r[0]}n=r}n==null&&(n=""),t=n}n=We(t),e.defaultValue=n,r=e.textContent,r===n&&r!==""&&r!==null&&(e.value=r),Uc(e)}function wr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Dx=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ff(e,t,n){var r=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?r?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":r?e.setProperty(t,n):typeof n!="number"||n===0||Dx.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function wd(e,t,n){if(t!=null&&typeof t!="object")throw Error(h(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var u in t)r=t[u],t.hasOwnProperty(u)&&n[u]!==r&&Ff(e,u,r)}else for(var i in t)t.hasOwnProperty(i)&&Ff(e,i,t[i])}function Ml(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Lx=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zi(e){return Lx.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function wt(){}var Dc=null;function wl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var cr=null,vr=null;function Xf(e){var t=Dr(e);if(t&&(e=t.stateNode)){var n=e[Ue]||null;e:switch(e=t.stateNode,t.type){case"input":if(Oc(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ie(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var u=r[Ue]||null;if(!u)throw Error(h(90));Oc(r,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&bd(r)}break e;case"textarea":Ed(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&hr(e,!!n.multiple,t,!1)}}}var Qa=!1;function Ad(e,t,n){if(Qa)return e(t,n);Qa=!0;try{var r=e(t);return r}finally{if(Qa=!1,(cr!==null||vr!==null)&&(Io(),cr&&(t=cr,e=vr,vr=cr=null,Xf(t),e)))for(t=0;t<e.length;t++)Xf(e[t])}}function Du(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Ue]||null;if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(h(231,t,typeof n));return n}var _t=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),kc=!1;if(_t)try{er={},Object.defineProperty(er,"passive",{get:function(){kc=!0}}),window.addEventListener("test",er,er),window.removeEventListener("test",er,er)}catch{kc=!1}var er,Zt=null,Al=null,Qi=null;function zd(){if(Qi)return Qi;var e,t=Al,n=t.length,r,u="value"in Zt?Zt.value:Zt.textContent,i=u.length;for(e=0;e<n&&t[e]===u[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===u[i-r];r++);return Qi=u.slice(e,1<r?1-r:void 0)}function Ii(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ci(){return!0}function qf(){return!1}function Oe(e){function t(n,r,u,i,o){this._reactName=n,this._targetInst=u,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ci:qf,this.isPropagationStopped=qf,this}return W(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ci)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ci)},persist:function(){},isPersistent:Ci}),t}var Dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Po=Oe(Dn),ei=W({},Dn,{view:0,detail:0}),Nx=Oe(ei),Ia,$a,fu,Fo=W({},ei,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==fu&&(fu&&e.type==="mousemove"?(Ia=e.screenX-fu.screenX,$a=e.screenY-fu.screenY):$a=Ia=0,fu=e),Ia)},movementY:function(e){return"movementY"in e?e.movementY:$a}}),Kf=Oe(Fo),Px=W({},Fo,{dataTransfer:0}),Fx=Oe(Px),Xx=W({},ei,{relatedTarget:0}),Ja=Oe(Xx),qx=W({},Dn,{animationName:0,elapsedTime:0,pseudoElement:0}),Kx=Oe(qx),jx=W({},Dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hx=Oe(jx),Yx=W({},Dn,{data:0}),jf=Oe(Yx),Wx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Zx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ix(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Qx[e])?!!t[e]:!1}function zl(){return Ix}var $x=W({},ei,{key:function(e){if(e.key){var t=Wx[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ii(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Zx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zl,charCode:function(e){return e.type==="keypress"?Ii(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ii(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jx=Oe($x),eg=W({},Fo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Hf=Oe(eg),tg=W({},ei,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zl}),ng=Oe(tg),rg=W({},Dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),ug=Oe(rg),ig=W({},Fo,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),og=Oe(ig),ag=W({},Dn,{newState:0,oldState:0}),cg=Oe(ag),lg=[9,13,27,32],Rl=_t&&"CompositionEvent"in window,bu=null;_t&&"documentMode"in document&&(bu=document.documentMode);var sg=_t&&"TextEvent"in window&&!bu,Rd=_t&&(!Rl||bu&&8<bu&&11>=bu),Yf=" ",Wf=!1;function Gd(e,t){switch(e){case"keyup":return lg.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _d(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var lr=!1;function fg(e,t){switch(e){case"compositionend":return _d(t);case"keypress":return t.which!==32?null:(Wf=!0,Yf);case"textInput":return e=t.data,e===Yf&&Wf?null:e;default:return null}}function mg(e,t){if(lr)return e==="compositionend"||!Rl&&Gd(e,t)?(e=zd(),Qi=Al=Zt=null,lr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Rd&&t.locale!=="ko"?null:t.data;default:return null}}var dg={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!dg[e.type]:t==="textarea"}function Bd(e,t,n,r){cr?vr?vr.push(r):vr=[r]:cr=r,t=Bo(t,"onChange"),0<t.length&&(n=new Po("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Vu=null,ku=null;function pg(e){A0(e,0)}function Xo(e){var t=vu(e);if(bd(t))return e}function Qf(e,t){if(e==="change")return t}var Ud=!1;_t&&(_t?(ki="oninput"in document,ki||(ec=document.createElement("div"),ec.setAttribute("oninput","return;"),ki=typeof ec.oninput=="function"),Di=ki):Di=!1,Ud=Di&&(!document.documentMode||9<document.documentMode));var Di,ki,ec;function If(){Vu&&(Vu.detachEvent("onpropertychange",Od),ku=Vu=null)}function Od(e){if(e.propertyName==="value"&&Xo(ku)){var t=[];Bd(t,ku,e,wl(e)),Ad(pg,t)}}function yg(e,t,n){e==="focusin"?(If(),Vu=t,ku=n,Vu.attachEvent("onpropertychange",Od)):e==="focusout"&&If()}function xg(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Xo(ku)}function gg(e,t){if(e==="click")return Xo(t)}function hg(e,t){if(e==="input"||e==="change")return Xo(t)}function vg(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var qe=typeof Object.is=="function"?Object.is:vg;function Lu(e,t){if(qe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var u=n[r];if(!_c.call(t,u)||!qe(e[u],t[u]))return!1}return!0}function $f(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Jf(e,t){var n=$f(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=$f(n)}}function Cd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Cd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Dd(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=po(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=po(e.document)}return t}function Gl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Tg=_t&&"documentMode"in document&&11>=document.documentMode,sr=null,Lc=null,Eu=null,Nc=!1;function em(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nc||sr==null||sr!==po(r)||(r=sr,"selectionStart"in r&&Gl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Eu&&Lu(Eu,r)||(Eu=r,r=Bo(Lc,"onSelect"),0<r.length&&(t=new Po("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=sr)))}function Tn(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var fr={animationend:Tn("Animation","AnimationEnd"),animationiteration:Tn("Animation","AnimationIteration"),animationstart:Tn("Animation","AnimationStart"),transitionrun:Tn("Transition","TransitionRun"),transitionstart:Tn("Transition","TransitionStart"),transitioncancel:Tn("Transition","TransitionCancel"),transitionend:Tn("Transition","TransitionEnd")},tc={},kd={};_t&&(kd=document.createElement("div").style,"AnimationEvent"in window||(delete fr.animationend.animation,delete fr.animationiteration.animation,delete fr.animationstart.animation),"TransitionEvent"in window||delete fr.transitionend.transition);function kn(e){if(tc[e])return tc[e];if(!fr[e])return e;var t=fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in kd)return tc[e]=t[n];return e}var Ld=kn("animationend"),Nd=kn("animationiteration"),Pd=kn("animationstart"),Sg=kn("transitionrun"),bg=kn("transitionstart"),Vg=kn("transitioncancel"),Fd=kn("transitionend"),Xd=new Map,Pc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Pc.push("scrollEnd");function it(e,t){Xd.set(e,t),Cn(t,[e])}var yo=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ye=[],mr=0,_l=0;function qo(){for(var e=mr,t=_l=mr=0;t<e;){var n=Ye[t];Ye[t++]=null;var r=Ye[t];Ye[t++]=null;var u=Ye[t];Ye[t++]=null;var i=Ye[t];if(Ye[t++]=null,r!==null&&u!==null){var o=r.pending;o===null?u.next=u:(u.next=o.next,o.next=u),r.pending=u}i!==0&&qd(n,u,i)}}function Ko(e,t,n,r){Ye[mr++]=e,Ye[mr++]=t,Ye[mr++]=n,Ye[mr++]=r,_l|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Bl(e,t,n,r){return Ko(e,t,n,r),xo(e)}function Ln(e,t){return Ko(e,null,null,t),xo(e)}function qd(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var u=!1,i=e.return;i!==null;)i.childLanes|=n,r=i.alternate,r!==null&&(r.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(u=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,u&&t!==null&&(u=31-Fe(n),e=i.hiddenUpdates,r=e[u],r===null?e[u]=[t]:r.push(t),t.lane=n|536870912),i):null}function xo(e){if(50<Uu)throw Uu=0,al=null,Error(h(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var dr={};function Eg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ke(e,t,n,r){return new Eg(e,t,n,r)}function Ul(e){return e=e.prototype,!(!e||!e.isReactComponent)}function zt(e,t){var n=e.alternate;return n===null?(n=ke(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Kd(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function $i(e,t,n,r,u,i){var o=0;if(r=e,typeof e=="function")Ul(e)&&(o=1);else if(typeof e=="string")o=A2(e,n,ft.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case Ac:return e=ke(31,n,t,u),e.elementType=Ac,e.lanes=i,e;case ir:return wn(n.children,u,i,t);case ld:o=8,u|=24;break;case Ec:return e=ke(12,n,t,u|2),e.elementType=Ec,e.lanes=i,e;case Mc:return e=ke(13,n,t,u),e.elementType=Mc,e.lanes=i,e;case wc:return e=ke(19,n,t,u),e.elementType=wc,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mt:o=10;break e;case sd:o=9;break e;case vl:o=11;break e;case Tl:o=14;break e;case Xt:o=16,r=null;break e}o=29,n=Error(h(130,e===null?"null":typeof e,"")),r=null}return t=ke(o,n,t,u),t.elementType=e,t.type=r,t.lanes=i,t}function wn(e,t,n,r){return e=ke(7,e,r,t),e.lanes=n,e}function nc(e,t,n){return e=ke(6,e,null,t),e.lanes=n,e}function jd(e){var t=ke(18,null,null,0);return t.stateNode=e,t}function rc(e,t,n){return t=ke(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var tm=new WeakMap;function $e(e,t){if(typeof e=="object"&&e!==null){var n=tm.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Df(t)},tm.set(e,t),t)}return{value:e,source:t,stack:Df(t)}}var pr=[],yr=0,go=null,Nu=0,Ze=[],Qe=0,ln=null,ct=1,lt="";function Vt(e,t){pr[yr++]=Nu,pr[yr++]=go,go=e,Nu=t}function Hd(e,t,n){Ze[Qe++]=ct,Ze[Qe++]=lt,Ze[Qe++]=ln,ln=e;var r=ct;e=lt;var u=32-Fe(r)-1;r&=~(1<<u),n+=1;var i=32-Fe(t)+u;if(30<i){var o=u-u%5;i=(r&(1<<o)-1).toString(32),r>>=o,u-=o,ct=1<<32-Fe(t)+u|n<<u|r,lt=i+e}else ct=1<<i|n<<u|r,lt=e}function Ol(e){e.return!==null&&(Vt(e,1),Hd(e,1,0))}function Cl(e){for(;e===go;)go=pr[--yr],pr[yr]=null,Nu=pr[--yr],pr[yr]=null;for(;e===ln;)ln=Ze[--Qe],Ze[Qe]=null,lt=Ze[--Qe],Ze[Qe]=null,ct=Ze[--Qe],Ze[Qe]=null}function Yd(e,t){Ze[Qe++]=ct,Ze[Qe++]=lt,Ze[Qe++]=ln,ct=t.id,lt=t.overflow,ln=e}var ge=null,Y=null,C=!1,en=null,Je=!1,Fc=Error(h(519));function sn(e){var t=Error(h(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Pu($e(t,e)),Fc}function nm(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[xe]=e,t[Ue]=r,n){case"dialog":B("cancel",t),B("close",t);break;case"iframe":case"object":case"embed":B("load",t);break;case"video":case"audio":for(n=0;n<Ku.length;n++)B(Ku[n],t);break;case"source":B("error",t);break;case"img":case"image":case"link":B("error",t),B("load",t);break;case"details":B("toggle",t);break;case"input":B("invalid",t),Vd(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":B("invalid",t);break;case"textarea":B("invalid",t),Md(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||r.suppressHydrationWarning===!0||R0(t.textContent,n)?(r.popover!=null&&(B("beforetoggle",t),B("toggle",t)),r.onScroll!=null&&B("scroll",t),r.onScrollEnd!=null&&B("scrollend",t),r.onClick!=null&&(t.onclick=wt),t=!0):t=!1,t||sn(e,!0)}function rm(e){for(ge=e.return;ge;)switch(ge.tag){case 5:case 31:case 13:Je=!1;return;case 27:case 3:Je=!0;return;default:ge=ge.return}}function tr(e){if(e!==ge)return!1;if(!C)return rm(e),C=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||ml(e.type,e.memoizedProps)),n=!n),n&&Y&&sn(e),rm(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));Y=jm(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(317));Y=jm(e)}else t===27?(t=Y,pn(e.type)?(e=xl,xl=null,Y=e):Y=t):Y=ge?tt(e.stateNode.nextSibling):null;return!0}function Gn(){Y=ge=null,C=!1}function uc(){var e=en;return e!==null&&(_e===null?_e=e:_e.push.apply(_e,e),en=null),e}function Pu(e){en===null?en=[e]:en.push(e)}var Xc=mt(null),Nn=null,At=null;function Kt(e,t,n){q(Xc,t._currentValue),t._currentValue=n}function Rt(e){e._currentValue=Xc.current,pe(Xc)}function qc(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Kc(e,t,n,r){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var i=u.dependencies;if(i!==null){var o=u.child;i=i.firstContext;e:for(;i!==null;){var a=i;i=u;for(var c=0;c<t.length;c++)if(a.context===t[c]){i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),qc(i.return,n,e),r||(o=null);break e}i=a.next}}else if(u.tag===18){if(o=u.return,o===null)throw Error(h(341));o.lanes|=n,i=o.alternate,i!==null&&(i.lanes|=n),qc(o,n,e),o=null}else o=u.child;if(o!==null)o.return=u;else for(o=u;o!==null;){if(o===e){o=null;break}if(u=o.sibling,u!==null){u.return=o.return,o=u;break}o=o.return}u=o}}function kr(e,t,n,r){e=null;for(var u=t,i=!1;u!==null;){if(!i){if((u.flags&524288)!==0)i=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var o=u.alternate;if(o===null)throw Error(h(387));if(o=o.memoizedProps,o!==null){var a=u.type;qe(u.pendingProps.value,o.value)||(e!==null?e.push(a):e=[a])}}else if(u===lo.current){if(o=u.alternate,o===null)throw Error(h(387));o.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Hu):e=[Hu])}u=u.return}e!==null&&Kc(t,e,n,r),t.flags|=262144}function ho(e){for(e=e.firstContext;e!==null;){if(!qe(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function _n(e){Nn=e,At=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function he(e){return Wd(Nn,e)}function Li(e,t){return Nn===null&&_n(e),Wd(e,t)}function Wd(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},At===null){if(e===null)throw Error(h(308));At=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else At=At.next=t;return n}var Mg=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},wg=se.unstable_scheduleCallback,Ag=se.unstable_NormalPriority,ae={$$typeof:Mt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Dl(){return{controller:new Mg,data:new Map,refCount:0}}function ti(e){e.refCount--,e.refCount===0&&wg(Ag,function(){e.controller.abort()})}var Mu=null,jc=0,Ar=0,Tr=null;function zg(e,t){if(Mu===null){var n=Mu=[];jc=0,Ar=as(),Tr={status:"pending",value:void 0,then:function(r){n.push(r)}}}return jc++,t.then(um,um),t}function um(){if(--jc===0&&Mu!==null){Tr!==null&&(Tr.status="fulfilled");var e=Mu;Mu=null,Ar=0,Tr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Rg(e,t){var n=[],r={status:"pending",value:null,reason:null,then:function(u){n.push(u)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var u=0;u<n.length;u++)(0,n[u])(t)},function(u){for(r.status="rejected",r.reason=u,u=0;u<n.length;u++)(0,n[u])(void 0)}),r}var im=M.S;M.S=function(e,t){c0=Ne(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&zg(e,t),im!==null&&im(e,t)};var An=mt(null);function kl(){var e=An.current;return e!==null?e:X.pooledCache}function Ji(e,t){t===null?q(An,An.current):q(An,t.pool)}function Zd(){var e=kl();return e===null?null:{parent:ae._currentValue,pool:e}}var Lr=Error(h(460)),Ll=Error(h(474)),jo=Error(h(542)),vo={then:function(){}};function om(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Qd(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(wt,wt),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cm(e),e;default:if(typeof t.status=="string")t.then(wt,wt);else{if(e=X,e!==null&&100<e.shellSuspendCounter)throw Error(h(482));e=t,e.status="pending",e.then(function(r){if(t.status==="pending"){var u=t;u.status="fulfilled",u.value=r}},function(r){if(t.status==="pending"){var u=t;u.status="rejected",u.reason=r}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cm(e),e}throw zn=t,Lr}}function Vn(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(zn=n,Lr):n}}var zn=null;function am(){if(zn===null)throw Error(h(459));var e=zn;return zn=null,e}function cm(e){if(e===Lr||e===jo)throw Error(h(483))}var Sr=null,Fu=0;function Ni(e){var t=Fu;return Fu+=1,Sr===null&&(Sr=[]),Qd(Sr,e,t)}function mu(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Pi(e,t){throw t.$$typeof===yx?Error(h(525)):(e=Object.prototype.toString.call(t),Error(h(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Id(e){function t(f,s){if(e){var y=f.deletions;y===null?(f.deletions=[s],f.flags|=16):y.push(s)}}function n(f,s){if(!e)return null;for(;s!==null;)t(f,s),s=s.sibling;return null}function r(f){for(var s=new Map;f!==null;)f.key!==null?s.set(f.key,f):s.set(f.index,f),f=f.sibling;return s}function u(f,s){return f=zt(f,s),f.index=0,f.sibling=null,f}function i(f,s,y){return f.index=y,e?(y=f.alternate,y!==null?(y=y.index,y<s?(f.flags|=67108866,s):y):(f.flags|=67108866,s)):(f.flags|=1048576,s)}function o(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function a(f,s,y,g){return s===null||s.tag!==6?(s=nc(y,f.mode,g),s.return=f,s):(s=u(s,y),s.return=f,s)}function c(f,s,y,g){var b=y.type;return b===ir?m(f,s,y.props.children,g,y.key):s!==null&&(s.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Xt&&Vn(b)===s.type)?(s=u(s,y.props),mu(s,y),s.return=f,s):(s=$i(y.type,y.key,y.props,null,f.mode,g),mu(s,y),s.return=f,s)}function l(f,s,y,g){return s===null||s.tag!==4||s.stateNode.containerInfo!==y.containerInfo||s.stateNode.implementation!==y.implementation?(s=rc(y,f.mode,g),s.return=f,s):(s=u(s,y.children||[]),s.return=f,s)}function m(f,s,y,g,b){return s===null||s.tag!==7?(s=wn(y,f.mode,g,b),s.return=f,s):(s=u(s,y),s.return=f,s)}function x(f,s,y){if(typeof s=="string"&&s!==""||typeof s=="number"||typeof s=="bigint")return s=nc(""+s,f.mode,y),s.return=f,s;if(typeof s=="object"&&s!==null){switch(s.$$typeof){case Gi:return y=$i(s.type,s.key,s.props,null,f.mode,y),mu(y,s),y.return=f,y;case gu:return s=rc(s,f.mode,y),s.return=f,s;case Xt:return s=Vn(s),x(f,s,y)}if(hu(s)||su(s))return s=wn(s,f.mode,y,null),s.return=f,s;if(typeof s.then=="function")return x(f,Ni(s),y);if(s.$$typeof===Mt)return x(f,Li(f,s),y);Pi(f,s)}return null}function d(f,s,y,g){var b=s!==null?s.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return b!==null?null:a(f,s,""+y,g);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Gi:return y.key===b?c(f,s,y,g):null;case gu:return y.key===b?l(f,s,y,g):null;case Xt:return y=Vn(y),d(f,s,y,g)}if(hu(y)||su(y))return b!==null?null:m(f,s,y,g,null);if(typeof y.then=="function")return d(f,s,Ni(y),g);if(y.$$typeof===Mt)return d(f,s,Li(f,y),g);Pi(f,y)}return null}function p(f,s,y,g,b){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return f=f.get(y)||null,a(s,f,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Gi:return f=f.get(g.key===null?y:g.key)||null,c(s,f,g,b);case gu:return f=f.get(g.key===null?y:g.key)||null,l(s,f,g,b);case Xt:return g=Vn(g),p(f,s,y,g,b)}if(hu(g)||su(g))return f=f.get(y)||null,m(s,f,g,b,null);if(typeof g.then=="function")return p(f,s,y,Ni(g),b);if(g.$$typeof===Mt)return p(f,s,y,Li(s,g),b);Pi(s,g)}return null}function v(f,s,y,g){for(var b=null,z=null,S=s,E=s=0,A=null;S!==null&&E<y.length;E++){S.index>E?(A=S,S=null):A=S.sibling;var _=d(f,S,y[E],g);if(_===null){S===null&&(S=A);break}e&&S&&_.alternate===null&&t(f,S),s=i(_,s,E),z===null?b=_:z.sibling=_,z=_,S=A}if(E===y.length)return n(f,S),C&&Vt(f,E),b;if(S===null){for(;E<y.length;E++)S=x(f,y[E],g),S!==null&&(s=i(S,s,E),z===null?b=S:z.sibling=S,z=S);return C&&Vt(f,E),b}for(S=r(S);E<y.length;E++)A=p(S,f,E,y[E],g),A!==null&&(e&&A.alternate!==null&&S.delete(A.key===null?E:A.key),s=i(A,s,E),z===null?b=A:z.sibling=A,z=A);return e&&S.forEach(function(Te){return t(f,Te)}),C&&Vt(f,E),b}function T(f,s,y,g){if(y==null)throw Error(h(151));for(var b=null,z=null,S=s,E=s=0,A=null,_=y.next();S!==null&&!_.done;E++,_=y.next()){S.index>E?(A=S,S=null):A=S.sibling;var Te=d(f,S,_.value,g);if(Te===null){S===null&&(S=A);break}e&&S&&Te.alternate===null&&t(f,S),s=i(Te,s,E),z===null?b=Te:z.sibling=Te,z=Te,S=A}if(_.done)return n(f,S),C&&Vt(f,E),b;if(S===null){for(;!_.done;E++,_=y.next())_=x(f,_.value,g),_!==null&&(s=i(_,s,E),z===null?b=_:z.sibling=_,z=_);return C&&Vt(f,E),b}for(S=r(S);!_.done;E++,_=y.next())_=p(S,f,E,_.value,g),_!==null&&(e&&_.alternate!==null&&S.delete(_.key===null?E:_.key),s=i(_,s,E),z===null?b=_:z.sibling=_,z=_);return e&&S.forEach(function(pt){return t(f,pt)}),C&&Vt(f,E),b}function V(f,s,y,g){if(typeof y=="object"&&y!==null&&y.type===ir&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Gi:e:{for(var b=y.key;s!==null;){if(s.key===b){if(b=y.type,b===ir){if(s.tag===7){n(f,s.sibling),g=u(s,y.props.children),g.return=f,f=g;break e}}else if(s.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Xt&&Vn(b)===s.type){n(f,s.sibling),g=u(s,y.props),mu(g,y),g.return=f,f=g;break e}n(f,s);break}else t(f,s);s=s.sibling}y.type===ir?(g=wn(y.props.children,f.mode,g,y.key),g.return=f,f=g):(g=$i(y.type,y.key,y.props,null,f.mode,g),mu(g,y),g.return=f,f=g)}return o(f);case gu:e:{for(b=y.key;s!==null;){if(s.key===b)if(s.tag===4&&s.stateNode.containerInfo===y.containerInfo&&s.stateNode.implementation===y.implementation){n(f,s.sibling),g=u(s,y.children||[]),g.return=f,f=g;break e}else{n(f,s);break}else t(f,s);s=s.sibling}g=rc(y,f.mode,g),g.return=f,f=g}return o(f);case Xt:return y=Vn(y),V(f,s,y,g)}if(hu(y))return v(f,s,y,g);if(su(y)){if(b=su(y),typeof b!="function")throw Error(h(150));return y=b.call(y),T(f,s,y,g)}if(typeof y.then=="function")return V(f,s,Ni(y),g);if(y.$$typeof===Mt)return V(f,s,Li(f,y),g);Pi(f,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,s!==null&&s.tag===6?(n(f,s.sibling),g=u(s,y),g.return=f,f=g):(n(f,s),g=nc(y,f.mode,g),g.return=f,f=g),o(f)):n(f,s)}return function(f,s,y,g){try{Fu=0;var b=V(f,s,y,g);return Sr=null,b}catch(S){if(S===Lr||S===jo)throw S;var z=ke(29,S,null,f.mode);return z.lanes=g,z.return=f,z}}}var Bn=Id(!0),$d=Id(!1),qt=!1;function Nl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Hc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function tn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function nn(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(D&2)!==0){var u=r.pending;return u===null?t.next=t:(t.next=u.next,u.next=t),r.pending=t,t=xo(e),qd(e,null,n),t}return Ko(e,r,t,n),xo(e)}function wu(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xd(e,n)}}function ic(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var u=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?u=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?u=i=t:i=i.next=t}else u=i=t;n={baseState:r.baseState,firstBaseUpdate:u,lastBaseUpdate:i,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Yc=!1;function Au(){if(Yc){var e=Tr;if(e!==null)throw e}}function zu(e,t,n,r){Yc=!1;var u=e.updateQueue;qt=!1;var i=u.firstBaseUpdate,o=u.lastBaseUpdate,a=u.shared.pending;if(a!==null){u.shared.pending=null;var c=a,l=c.next;c.next=null,o===null?i=l:o.next=l,o=c;var m=e.alternate;m!==null&&(m=m.updateQueue,a=m.lastBaseUpdate,a!==o&&(a===null?m.firstBaseUpdate=l:a.next=l,m.lastBaseUpdate=c))}if(i!==null){var x=u.baseState;o=0,m=l=c=null,a=i;do{var d=a.lane&-536870913,p=d!==a.lane;if(p?(O&d)===d:(r&d)===d){d!==0&&d===Ar&&(Yc=!0),m!==null&&(m=m.next={lane:0,tag:a.tag,payload:a.payload,callback:null,next:null});e:{var v=e,T=a;d=t;var V=n;switch(T.tag){case 1:if(v=T.payload,typeof v=="function"){x=v.call(V,x,d);break e}x=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=T.payload,d=typeof v=="function"?v.call(V,x,d):v,d==null)break e;x=W({},x,d);break e;case 2:qt=!0}}d=a.callback,d!==null&&(e.flags|=64,p&&(e.flags|=8192),p=u.callbacks,p===null?u.callbacks=[d]:p.push(d))}else p={lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},m===null?(l=m=p,c=x):m=m.next=p,o|=d;if(a=a.next,a===null){if(a=u.shared.pending,a===null)break;p=a,a=p.next,p.next=null,u.lastBaseUpdate=p,u.shared.pending=null}}while(!0);m===null&&(c=x),u.baseState=c,u.firstBaseUpdate=l,u.lastBaseUpdate=m,i===null&&(u.shared.lanes=0),mn|=o,e.lanes=o,e.memoizedState=x}}function Jd(e,t){if(typeof e!="function")throw Error(h(191,e));e.call(t)}function ep(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Jd(n[e],t)}var zr=mt(null),To=mt(0);function lm(e,t){e=Ct,q(To,e),q(zr,t),Ct=e|t.baseLanes}function Wc(){q(To,Ct),q(zr,zr.current)}function Pl(){Ct=To.current,pe(zr),pe(To)}var Ke=mt(null),et=null;function jt(e){var t=e.alternate;q(ne,ne.current&1),q(Ke,e),et===null&&(t===null||zr.current!==null||t.memoizedState!==null)&&(et=e)}function Zc(e){q(ne,ne.current),q(Ke,e),et===null&&(et=e)}function tp(e){e.tag===22?(q(ne,ne.current),q(Ke,e),et===null&&(et=e)):Ht(e)}function Ht(){q(ne,ne.current),q(Ke,Ke.current)}function De(e){pe(Ke),et===e&&(et=null),pe(ne)}var ne=mt(0);function So(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||pl(n)||yl(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bt=0,G=null,F=null,ie=null,bo=!1,br=!1,Un=!1,Vo=0,Xu=0,Vr=null,Gg=0;function J(){throw Error(h(321))}function Fl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!qe(e[n],t[n]))return!1;return!0}function Xl(e,t,n,r,u,i){return Bt=i,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,M.H=e===null||e.memoizedState===null?Bp:Jl,Un=!1,i=n(r,u),Un=!1,br&&(i=rp(t,n,r,u)),np(e),i}function np(e){M.H=qu;var t=F!==null&&F.next!==null;if(Bt=0,ie=F=G=null,bo=!1,Xu=0,Vr=null,t)throw Error(h(300));e===null||ce||(e=e.dependencies,e!==null&&ho(e)&&(ce=!0))}function rp(e,t,n,r){G=e;var u=0;do{if(br&&(Vr=null),Xu=0,br=!1,25<=u)throw Error(h(301));if(u+=1,ie=F=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}M.H=Up,i=t(n,r)}while(br);return i}function _g(){var e=M.H,t=e.useState()[0];return t=typeof t.then=="function"?ni(t):t,e=e.useState()[0],(F!==null?F.memoizedState:null)!==e&&(G.flags|=1024),t}function ql(){var e=Vo!==0;return Vo=0,e}function Kl(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function jl(e){if(bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}bo=!1}Bt=0,ie=F=G=null,br=!1,Xu=Vo=0,Vr=null}function Ee(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ie===null?G.memoizedState=ie=e:ie=ie.next=e,ie}function re(){if(F===null){var e=G.alternate;e=e!==null?e.memoizedState:null}else e=F.next;var t=ie===null?G.memoizedState:ie.next;if(t!==null)ie=t,F=e;else{if(e===null)throw G.alternate===null?Error(h(467)):Error(h(310));F=e,e={memoizedState:F.memoizedState,baseState:F.baseState,baseQueue:F.baseQueue,queue:F.queue,next:null},ie===null?G.memoizedState=ie=e:ie=ie.next=e}return ie}function Ho(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ni(e){var t=Xu;return Xu+=1,Vr===null&&(Vr=[]),e=Qd(Vr,e,t),t=G,(ie===null?t.memoizedState:ie.next)===null&&(t=t.alternate,M.H=t===null||t.memoizedState===null?Bp:Jl),e}function Yo(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ni(e);if(e.$$typeof===Mt)return he(e)}throw Error(h(438,String(e)))}function Hl(e){var t=null,n=G.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=G.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(u){return u.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Ho(),G.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=xx;return t.index++,n}function Ut(e,t){return typeof t=="function"?t(e):t}function eo(e){var t=re();return Yl(t,F,e)}function Yl(e,t,n){var r=e.queue;if(r===null)throw Error(h(311));r.lastRenderedReducer=n;var u=e.baseQueue,i=r.pending;if(i!==null){if(u!==null){var o=u.next;u.next=i.next,i.next=o}t.baseQueue=u=i,r.pending=null}if(i=e.baseState,u===null)e.memoizedState=i;else{t=u.next;var a=o=null,c=null,l=t,m=!1;do{var x=l.lane&-536870913;if(x!==l.lane?(O&x)===x:(Bt&x)===x){var d=l.revertLane;if(d===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),x===Ar&&(m=!0);else if((Bt&d)===d){l=l.next,d===Ar&&(m=!0);continue}else x={lane:0,revertLane:l.revertLane,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},c===null?(a=c=x,o=i):c=c.next=x,G.lanes|=d,mn|=d;x=l.action,Un&&n(i,x),i=l.hasEagerState?l.eagerState:n(i,x)}else d={lane:x,revertLane:l.revertLane,gesture:l.gesture,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},c===null?(a=c=d,o=i):c=c.next=d,G.lanes|=x,mn|=x;l=l.next}while(l!==null&&l!==t);if(c===null?o=i:c.next=a,!qe(i,e.memoizedState)&&(ce=!0,m&&(n=Tr,n!==null)))throw n;e.memoizedState=i,e.baseState=o,e.baseQueue=c,r.lastRenderedState=i}return u===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function oc(e){var t=re(),n=t.queue;if(n===null)throw Error(h(311));n.lastRenderedReducer=e;var r=n.dispatch,u=n.pending,i=t.memoizedState;if(u!==null){n.pending=null;var o=u=u.next;do i=e(i,o.action),o=o.next;while(o!==u);qe(i,t.memoizedState)||(ce=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function up(e,t,n){var r=G,u=re(),i=C;if(i){if(n===void 0)throw Error(h(407));n=n()}else n=t();var o=!qe((F||u).memoizedState,n);if(o&&(u.memoizedState=n,ce=!0),u=u.queue,Wl(ap.bind(null,r,u,e),[e]),u.getSnapshot!==t||o||ie!==null&&ie.memoizedState.tag&1){if(r.flags|=2048,Rr(9,{destroy:void 0},op.bind(null,r,u,n,t),null),X===null)throw Error(h(349));i||(Bt&127)!==0||ip(r,t,n)}return n}function ip(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t=Ho(),G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function op(e,t,n,r){t.value=n,t.getSnapshot=r,cp(t)&&lp(e)}function ap(e,t,n){return n(function(){cp(t)&&lp(e)})}function cp(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!qe(e,n)}catch{return!0}}function lp(e){var t=Ln(e,2);t!==null&&Be(t,e,2)}function Qc(e){var t=Ee();if(typeof e=="function"){var n=e;if(e=n(),Un){Wt(!0);try{n()}finally{Wt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ut,lastRenderedState:e},t}function sp(e,t,n,r){return e.baseState=n,Yl(e,F,typeof r=="function"?r:Ut)}function Bg(e,t,n,r,u){if(Zo(e))throw Error(h(485));if(e=t.action,e!==null){var i={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(o){i.listeners.push(o)}};M.T!==null?n(!0):i.isTransition=!1,r(i),n=t.pending,n===null?(i.next=t.pending=i,fp(t,i)):(i.next=n.next,t.pending=n.next=i)}}function fp(e,t){var n=t.action,r=t.payload,u=e.state;if(t.isTransition){var i=M.T,o={};M.T=o;try{var a=n(u,r),c=M.S;c!==null&&c(o,a),sm(e,t,a)}catch(l){Ic(e,t,l)}finally{i!==null&&o.types!==null&&(i.types=o.types),M.T=i}}else try{i=n(u,r),sm(e,t,i)}catch(l){Ic(e,t,l)}}function sm(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(r){fm(e,t,r)},function(r){return Ic(e,t,r)}):fm(e,t,n)}function fm(e,t,n){t.status="fulfilled",t.value=n,mp(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,fp(e,n)))}function Ic(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status="rejected",t.reason=n,mp(t),t=t.next;while(t!==r)}e.action=null}function mp(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function dp(e,t){return t}function mm(e,t){if(C){var n=X.formState;if(n!==null){e:{var r=G;if(C){if(Y){t:{for(var u=Y,i=Je;u.nodeType!==8;){if(!i){u=null;break t}if(u=tt(u.nextSibling),u===null){u=null;break t}}i=u.data,u=i==="F!"||i==="F"?u:null}if(u){Y=tt(u.nextSibling),r=u.data==="F!";break e}}sn(r)}r=!1}r&&(t=n[0])}}return n=Ee(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:dp,lastRenderedState:t},n.queue=r,n=Rp.bind(null,G,r),r.dispatch=n,r=Qc(!1),i=$l.bind(null,G,!1,r.queue),r=Ee(),u={state:t,dispatch:null,action:e,pending:null},r.queue=u,n=Bg.bind(null,G,u,i,n),u.dispatch=n,r.memoizedState=e,[t,n,!1]}function dm(e){var t=re();return pp(t,F,e)}function pp(e,t,n){if(t=Yl(e,t,dp)[0],e=eo(Ut)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var r=ni(t)}catch(o){throw o===Lr?jo:o}else r=t;t=re();var u=t.queue,i=u.dispatch;return n!==t.memoizedState&&(G.flags|=2048,Rr(9,{destroy:void 0},Ug.bind(null,u,n),null)),[r,i,e]}function Ug(e,t){e.action=t}function pm(e){var t=re(),n=F;if(n!==null)return pp(t,n,e);re(),t=t.memoizedState,n=re();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Rr(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=G.updateQueue,t===null&&(t=Ho(),G.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function yp(){return re().memoizedState}function to(e,t,n,r){var u=Ee();G.flags|=e,u.memoizedState=Rr(1|t,{destroy:void 0},n,r===void 0?null:r)}function Wo(e,t,n,r){var u=re();r=r===void 0?null:r;var i=u.memoizedState.inst;F!==null&&r!==null&&Fl(r,F.memoizedState.deps)?u.memoizedState=Rr(t,i,n,r):(G.flags|=e,u.memoizedState=Rr(1|t,i,n,r))}function ym(e,t){to(8390656,8,e,t)}function Wl(e,t){Wo(2048,8,e,t)}function Og(e){G.flags|=4;var t=G.updateQueue;if(t===null)t=Ho(),G.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function xp(e){var t=re().memoizedState;return Og({ref:t,nextImpl:e}),function(){if((D&2)!==0)throw Error(h(440));return t.impl.apply(void 0,arguments)}}function gp(e,t){return Wo(4,2,e,t)}function hp(e,t){return Wo(4,4,e,t)}function vp(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Tp(e,t,n){n=n!=null?n.concat([e]):null,Wo(4,4,vp.bind(null,t,e),n)}function Zl(){}function Sp(e,t){var n=re();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Fl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function bp(e,t){var n=re();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Fl(t,r[1]))return r[0];if(r=e(),Un){Wt(!0);try{e()}finally{Wt(!1)}}return n.memoizedState=[r,t],r}function Ql(e,t,n){return n===void 0||(Bt&1073741824)!==0&&(O&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=s0(),G.lanes|=e,mn|=e,n)}function Vp(e,t,n,r){return qe(n,t)?n:zr.current!==null?(e=Ql(e,n,r),qe(e,t)||(ce=!0),e):(Bt&42)===0||(Bt&1073741824)!==0&&(O&261930)===0?(ce=!0,e.memoizedState=n):(e=s0(),G.lanes|=e,mn|=e,t)}function Ep(e,t,n,r,u){var i=k.p;k.p=i!==0&&8>i?i:8;var o=M.T,a={};M.T=a,$l(e,!1,t,n);try{var c=u(),l=M.S;if(l!==null&&l(a,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var m=Rg(c,r);Ru(e,t,m,Xe(e))}else Ru(e,t,r,Xe(e))}catch(x){Ru(e,t,{then:function(){},status:"rejected",reason:x},Xe())}finally{k.p=i,o!==null&&a.types!==null&&(o.types=a.types),M.T=o}}function Cg(){}function $c(e,t,n,r){if(e.tag!==5)throw Error(h(476));var u=Mp(e).queue;Ep(e,u,t,Mn,n===null?Cg:function(){return wp(e),n(r)})}function Mp(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Mn,baseState:Mn,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ut,lastRenderedState:Mn},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ut,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function wp(e){var t=Mp(e);t.next===null&&(t=e.alternate.memoizedState),Ru(e,t.next.queue,{},Xe())}function Il(){return he(Hu)}function Ap(){return re().memoizedState}function zp(){return re().memoizedState}function Dg(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Xe();e=tn(n);var r=nn(t,e,n);r!==null&&(Be(r,t,n),wu(r,t,n)),t={cache:Dl()},e.payload=t;return}t=t.return}}function kg(e,t,n){var r=Xe();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Zo(e)?Gp(t,n):(n=Bl(e,t,n,r),n!==null&&(Be(n,e,r),_p(n,t,r)))}function Rp(e,t,n){var r=Xe();Ru(e,t,n,r)}function Ru(e,t,n,r){var u={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zo(e))Gp(t,u);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,a=i(o,n);if(u.hasEagerState=!0,u.eagerState=a,qe(a,o))return Ko(e,t,u,0),X===null&&qo(),!1}catch{}if(n=Bl(e,t,u,r),n!==null)return Be(n,e,r),_p(n,t,r),!0}return!1}function $l(e,t,n,r){if(r={lane:2,revertLane:as(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zo(e)){if(t)throw Error(h(479))}else t=Bl(e,n,r,2),t!==null&&Be(t,e,2)}function Zo(e){var t=e.alternate;return e===G||t!==null&&t===G}function Gp(e,t){br=bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _p(e,t,n){if((n&4194048)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,xd(e,n)}}var qu={readContext:he,use:Yo,useCallback:J,useContext:J,useEffect:J,useImperativeHandle:J,useLayoutEffect:J,useInsertionEffect:J,useMemo:J,useReducer:J,useRef:J,useState:J,useDebugValue:J,useDeferredValue:J,useTransition:J,useSyncExternalStore:J,useId:J,useHostTransitionStatus:J,useFormState:J,useActionState:J,useOptimistic:J,useMemoCache:J,useCacheRefresh:J};qu.useEffectEvent=J;var Bp={readContext:he,use:Yo,useCallback:function(e,t){return Ee().memoizedState=[e,t===void 0?null:t],e},useContext:he,useEffect:ym,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,to(4194308,4,vp.bind(null,t,e),n)},useLayoutEffect:function(e,t){return to(4194308,4,e,t)},useInsertionEffect:function(e,t){to(4,2,e,t)},useMemo:function(e,t){var n=Ee();t=t===void 0?null:t;var r=e();if(Un){Wt(!0);try{e()}finally{Wt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Ee();if(n!==void 0){var u=n(t);if(Un){Wt(!0);try{n(t)}finally{Wt(!1)}}}else u=t;return r.memoizedState=r.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},r.queue=e,e=e.dispatch=kg.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=Ee();return e={current:e},t.memoizedState=e},useState:function(e){e=Qc(e);var t=e.queue,n=Rp.bind(null,G,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Zl,useDeferredValue:function(e,t){var n=Ee();return Ql(n,e,t)},useTransition:function(){var e=Qc(!1);return e=Ep.bind(null,G,e.queue,!0,!1),Ee().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=G,u=Ee();if(C){if(n===void 0)throw Error(h(407));n=n()}else{if(n=t(),X===null)throw Error(h(349));(O&127)!==0||ip(r,t,n)}u.memoizedState=n;var i={value:n,getSnapshot:t};return u.queue=i,ym(ap.bind(null,r,i,e),[e]),r.flags|=2048,Rr(9,{destroy:void 0},op.bind(null,r,i,n,t),null),n},useId:function(){var e=Ee(),t=X.identifierPrefix;if(C){var n=lt,r=ct;n=(r&~(1<<32-Fe(r)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Vo++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Gg++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Il,useFormState:mm,useActionState:mm,useOptimistic:function(e){var t=Ee();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=$l.bind(null,G,!0,n),n.dispatch=t,[e,t]},useMemoCache:Hl,useCacheRefresh:function(){return Ee().memoizedState=Dg.bind(null,G)},useEffectEvent:function(e){var t=Ee(),n={impl:e};return t.memoizedState=n,function(){if((D&2)!==0)throw Error(h(440));return n.impl.apply(void 0,arguments)}}},Jl={readContext:he,use:Yo,useCallback:Sp,useContext:he,useEffect:Wl,useImperativeHandle:Tp,useInsertionEffect:gp,useLayoutEffect:hp,useMemo:bp,useReducer:eo,useRef:yp,useState:function(){return eo(Ut)},useDebugValue:Zl,useDeferredValue:function(e,t){var n=re();return Vp(n,F.memoizedState,e,t)},useTransition:function(){var e=eo(Ut)[0],t=re().memoizedState;return[typeof e=="boolean"?e:ni(e),t]},useSyncExternalStore:up,useId:Ap,useHostTransitionStatus:Il,useFormState:dm,useActionState:dm,useOptimistic:function(e,t){var n=re();return sp(n,F,e,t)},useMemoCache:Hl,useCacheRefresh:zp};Jl.useEffectEvent=xp;var Up={readContext:he,use:Yo,useCallback:Sp,useContext:he,useEffect:Wl,useImperativeHandle:Tp,useInsertionEffect:gp,useLayoutEffect:hp,useMemo:bp,useReducer:oc,useRef:yp,useState:function(){return oc(Ut)},useDebugValue:Zl,useDeferredValue:function(e,t){var n=re();return F===null?Ql(n,e,t):Vp(n,F.memoizedState,e,t)},useTransition:function(){var e=oc(Ut)[0],t=re().memoizedState;return[typeof e=="boolean"?e:ni(e),t]},useSyncExternalStore:up,useId:Ap,useHostTransitionStatus:Il,useFormState:pm,useActionState:pm,useOptimistic:function(e,t){var n=re();return F!==null?sp(n,F,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Hl,useCacheRefresh:zp};Up.useEffectEvent=xp;function ac(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:W({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Jc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Xe(),u=tn(r);u.payload=t,n!=null&&(u.callback=n),t=nn(e,u,r),t!==null&&(Be(t,e,r),wu(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Xe(),u=tn(r);u.tag=1,u.payload=t,n!=null&&(u.callback=n),t=nn(e,u,r),t!==null&&(Be(t,e,r),wu(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Xe(),r=tn(n);r.tag=2,t!=null&&(r.callback=t),t=nn(e,r,n),t!==null&&(Be(t,e,n),wu(t,e,n))}};function xm(e,t,n,r,u,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!Lu(n,r)||!Lu(u,i):!0}function gm(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Jc.enqueueReplaceState(t,t.state,null)}function On(e,t){var n=t;if("ref"in t){n={};for(var r in t)r!=="ref"&&(n[r]=t[r])}if(e=e.defaultProps){n===t&&(n=W({},n));for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n}function Op(e){yo(e)}function Cp(e){console.error(e)}function Dp(e){yo(e)}function Eo(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function hm(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function el(e,t,n){return n=tn(n),n.tag=3,n.payload={element:null},n.callback=function(){Eo(e,t)},n}function kp(e){return e=tn(e),e.tag=3,e}function Lp(e,t,n,r){var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var i=r.value;e.payload=function(){return u(i)},e.callback=function(){hm(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch=="function"&&(e.callback=function(){hm(t,n,r),typeof u!="function"&&(rn===null?rn=new Set([this]):rn.add(this));var a=r.stack;this.componentDidCatch(r.value,{componentStack:a!==null?a:""})})}function Lg(e,t,n,r,u){if(n.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(t=n.alternate,t!==null&&kr(t,n,u,!0),n=Ke.current,n!==null){switch(n.tag){case 31:case 13:return et===null?Ro():n.alternate===null&&ee===0&&(ee=3),n.flags&=-257,n.flags|=65536,n.lanes=u,r===vo?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),hc(e,r,u)),!1;case 22:return n.flags|=65536,r===vo?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),hc(e,r,u)),!1}throw Error(h(435,n.tag))}return hc(e,r,u),Ro(),!1}if(C)return t=Ke.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=u,r!==Fc&&(e=Error(h(422),{cause:r}),Pu($e(e,n)))):(r!==Fc&&(t=Error(h(423),{cause:r}),Pu($e(t,n))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,r=$e(r,n),u=el(e.stateNode,r,u),ic(e,u),ee!==4&&(ee=2)),!1;var i=Error(h(520),{cause:r});if(i=$e(i,n),Bu===null?Bu=[i]:Bu.push(i),ee!==4&&(ee=2),t===null)return!0;r=$e(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=u&-u,n.lanes|=e,e=el(n.stateNode,r,e),ic(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(rn===null||!rn.has(i))))return n.flags|=65536,u&=-u,n.lanes|=u,u=kp(u),Lp(u,e,n,r),ic(n,u),!1}n=n.return}while(n!==null);return!1}var es=Error(h(461)),ce=!1;function ye(e,t,n,r){t.child=e===null?$d(t,null,n,r):Bn(t,e.child,n,r)}function vm(e,t,n,r,u){n=n.render;var i=t.ref;if("ref"in r){var o={};for(var a in r)a!=="ref"&&(o[a]=r[a])}else o=r;return _n(t),r=Xl(e,t,n,o,i,u),a=ql(),e!==null&&!ce?(Kl(e,t,u),Ot(e,t,u)):(C&&a&&Ol(t),t.flags|=1,ye(e,t,r,u),t.child)}function Tm(e,t,n,r,u){if(e===null){var i=n.type;return typeof i=="function"&&!Ul(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,Np(e,t,i,r,u)):(e=$i(n.type,null,r,t,t.mode,u),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!ts(e,u)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Lu,n(o,r)&&e.ref===t.ref)return Ot(e,t,u)}return t.flags|=1,e=zt(i,r),e.ref=t.ref,e.return=t,t.child=e}function Np(e,t,n,r,u){if(e!==null){var i=e.memoizedProps;if(Lu(i,r)&&e.ref===t.ref)if(ce=!1,t.pendingProps=r=i,ts(e,u))(e.flags&131072)!==0&&(ce=!0);else return t.lanes=e.lanes,Ot(e,t,u)}return tl(e,t,n,r,u)}function Pp(e,t,n,r){var u=r.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((t.flags&128)!==0){if(i=i!==null?i.baseLanes|n:n,e!==null){for(r=t.child=e.child,u=0;r!==null;)u=u|r.lanes|r.childLanes,r=r.sibling;r=u&~i}else r=0,t.child=null;return Sm(e,t,i,n,r)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ji(t,i!==null?i.cachePool:null),i!==null?lm(t,i):Wc(),tp(t);else return r=t.lanes=536870912,Sm(e,t,i!==null?i.baseLanes|n:n,n,r)}else i!==null?(Ji(t,i.cachePool),lm(t,i),Ht(t),t.memoizedState=null):(e!==null&&Ji(t,null),Wc(),Ht(t));return ye(e,t,u,n),t.child}function Tu(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Sm(e,t,n,r,u){var i=kl();return i=i===null?null:{parent:ae._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&Ji(t,null),Wc(),tp(t),e!==null&&kr(e,t,r,!0),t.childLanes=u,null}function no(e,t){return t=Mo({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function bm(e,t,n){return Bn(t,e.child,null,n),e=no(t,t.pendingProps),e.flags|=2,De(t),t.memoizedState=null,e}function Ng(e,t,n){var r=t.pendingProps,u=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(C){if(r.mode==="hidden")return e=no(t,r),t.lanes=536870912,Tu(null,e);if(Zc(t),(e=Y)?(e=B0(e,Je),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ln!==null?{id:ct,overflow:lt}:null,retryLane:536870912,hydrationErrors:null},n=jd(e),n.return=t,t.child=n,ge=t,Y=null)):e=null,e===null)throw sn(t);return t.lanes=536870912,null}return no(t,r)}var i=e.memoizedState;if(i!==null){var o=i.dehydrated;if(Zc(t),u)if(t.flags&256)t.flags&=-257,t=bm(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(h(558));else if(ce||kr(e,t,n,!1),u=(n&e.childLanes)!==0,ce||u){if(r=X,r!==null&&(o=gd(r,n),o!==0&&o!==i.retryLane))throw i.retryLane=o,Ln(e,o),Be(r,e,o),es;Ro(),t=bm(e,t,n)}else e=i.treeContext,Y=tt(o.nextSibling),ge=t,C=!0,en=null,Je=!1,e!==null&&Yd(t,e),t=no(t,r),t.flags|=4096;return t}return e=zt(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function ro(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(h(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function tl(e,t,n,r,u){return _n(t),n=Xl(e,t,n,r,void 0,u),r=ql(),e!==null&&!ce?(Kl(e,t,u),Ot(e,t,u)):(C&&r&&Ol(t),t.flags|=1,ye(e,t,n,u),t.child)}function Vm(e,t,n,r,u,i){return _n(t),t.updateQueue=null,n=rp(t,r,n,u),np(e),r=ql(),e!==null&&!ce?(Kl(e,t,i),Ot(e,t,i)):(C&&r&&Ol(t),t.flags|=1,ye(e,t,n,i),t.child)}function Em(e,t,n,r,u){if(_n(t),t.stateNode===null){var i=dr,o=n.contextType;typeof o=="object"&&o!==null&&(i=he(o)),i=new n(r,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Jc,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=r,i.state=t.memoizedState,i.refs={},Nl(t),o=n.contextType,i.context=typeof o=="object"&&o!==null?he(o):dr,i.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o=="function"&&(ac(t,n,o,r),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(o=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),o!==i.state&&Jc.enqueueReplaceState(i,i.state,null),zu(t,r,i,u),Au(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!0}else if(e===null){i=t.stateNode;var a=t.memoizedProps,c=On(n,a);i.props=c;var l=i.context,m=n.contextType;o=dr,typeof m=="object"&&m!==null&&(o=he(m));var x=n.getDerivedStateFromProps;m=typeof x=="function"||typeof i.getSnapshotBeforeUpdate=="function",a=t.pendingProps!==a,m||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a||l!==o)&&gm(t,i,r,o),qt=!1;var d=t.memoizedState;i.state=d,zu(t,r,i,u),Au(),l=t.memoizedState,a||d!==l||qt?(typeof x=="function"&&(ac(t,n,x,r),l=t.memoizedState),(c=qt||xm(t,n,c,r,d,l,o))?(m||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),i.props=r,i.state=l,i.context=o,r=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,Hc(e,t),o=t.memoizedProps,m=On(n,o),i.props=m,x=t.pendingProps,d=i.context,l=n.contextType,c=dr,typeof l=="object"&&l!==null&&(c=he(l)),a=n.getDerivedStateFromProps,(l=typeof a=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(o!==x||d!==c)&&gm(t,i,r,c),qt=!1,d=t.memoizedState,i.state=d,zu(t,r,i,u),Au();var p=t.memoizedState;o!==x||d!==p||qt||e!==null&&e.dependencies!==null&&ho(e.dependencies)?(typeof a=="function"&&(ac(t,n,a,r),p=t.memoizedState),(m=qt||xm(t,n,m,r,d,p,c)||e!==null&&e.dependencies!==null&&ho(e.dependencies))?(l||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,p,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,p,c)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),i.props=r,i.state=p,i.context=c,r=m):(typeof i.componentDidUpdate!="function"||o===e.memoizedProps&&d===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&d===e.memoizedState||(t.flags|=1024),r=!1)}return i=r,ro(e,t),r=(t.flags&128)!==0,i||r?(i=t.stateNode,n=r&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&r?(t.child=Bn(t,e.child,null,u),t.child=Bn(t,null,n,u)):ye(e,t,n,u),t.memoizedState=i.state,e=t.child):e=Ot(e,t,u),e}function Mm(e,t,n,r){return Gn(),t.flags|=256,ye(e,t,n,r),t.child}var cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function lc(e){return{baseLanes:e,cachePool:Zd()}}function sc(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Le),e}function Fp(e,t,n){var r=t.pendingProps,u=!1,i=(t.flags&128)!==0,o;if((o=i)||(o=e!==null&&e.memoizedState===null?!1:(ne.current&2)!==0),o&&(u=!0,t.flags&=-129),o=(t.flags&32)!==0,t.flags&=-33,e===null){if(C){if(u?jt(t):Ht(t),(e=Y)?(e=B0(e,Je),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ln!==null?{id:ct,overflow:lt}:null,retryLane:536870912,hydrationErrors:null},n=jd(e),n.return=t,t.child=n,ge=t,Y=null)):e=null,e===null)throw sn(t);return yl(e)?t.lanes=32:t.lanes=536870912,null}var a=r.children;return r=r.fallback,u?(Ht(t),u=t.mode,a=Mo({mode:"hidden",children:a},u),r=wn(r,u,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=lc(n),r.childLanes=sc(e,o,n),t.memoizedState=cc,Tu(null,r)):(jt(t),nl(t,a))}var c=e.memoizedState;if(c!==null&&(a=c.dehydrated,a!==null)){if(i)t.flags&256?(jt(t),t.flags&=-257,t=fc(e,t,n)):t.memoizedState!==null?(Ht(t),t.child=e.child,t.flags|=128,t=null):(Ht(t),a=r.fallback,u=t.mode,r=Mo({mode:"visible",children:r.children},u),a=wn(a,u,n,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,Bn(t,e.child,null,n),r=t.child,r.memoizedState=lc(n),r.childLanes=sc(e,o,n),t.memoizedState=cc,t=Tu(null,r));else if(jt(t),yl(a)){if(o=a.nextSibling&&a.nextSibling.dataset,o)var l=o.dgst;o=l,r=Error(h(419)),r.stack="",r.digest=o,Pu({value:r,source:null,stack:null}),t=fc(e,t,n)}else if(ce||kr(e,t,n,!1),o=(n&e.childLanes)!==0,ce||o){if(o=X,o!==null&&(r=gd(o,n),r!==0&&r!==c.retryLane))throw c.retryLane=r,Ln(e,r),Be(o,e,r),es;pl(a)||Ro(),t=fc(e,t,n)}else pl(a)?(t.flags|=192,t.child=e.child,t=null):(e=c.treeContext,Y=tt(a.nextSibling),ge=t,C=!0,en=null,Je=!1,e!==null&&Yd(t,e),t=nl(t,r.children),t.flags|=4096);return t}return u?(Ht(t),a=r.fallback,u=t.mode,c=e.child,l=c.sibling,r=zt(c,{mode:"hidden",children:r.children}),r.subtreeFlags=c.subtreeFlags&65011712,l!==null?a=zt(l,a):(a=wn(a,u,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,Tu(null,r),r=t.child,a=e.child.memoizedState,a===null?a=lc(n):(u=a.cachePool,u!==null?(c=ae._currentValue,u=u.parent!==c?{parent:c,pool:c}:u):u=Zd(),a={baseLanes:a.baseLanes|n,cachePool:u}),r.memoizedState=a,r.childLanes=sc(e,o,n),t.memoizedState=cc,Tu(e.child,r)):(jt(t),n=e.child,e=n.sibling,n=zt(n,{mode:"visible",children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function nl(e,t){return t=Mo({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Mo(e,t){return e=ke(22,e,null,t),e.lanes=0,e}function fc(e,t,n){return Bn(t,e.child,null,n),e=nl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wm(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),qc(e.return,t,n)}function mc(e,t,n,r,u,i){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:u,treeForkCount:i}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=u,o.treeForkCount=i)}function Xp(e,t,n){var r=t.pendingProps,u=r.revealOrder,i=r.tail;r=r.children;var o=ne.current,a=(o&2)!==0;if(a?(o=o&1|2,t.flags|=128):o&=1,q(ne,o),ye(e,t,r,n),r=C?Nu:0,!a&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wm(e,n,t);else if(e.tag===19)wm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(n=t.child,u=null;n!==null;)e=n.alternate,e!==null&&So(e)===null&&(u=n),n=n.sibling;n=u,n===null?(u=t.child,t.child=null):(u=n.sibling,n.sibling=null),mc(t,!1,u,n,i,r);break;case"backwards":case"unstable_legacy-backwards":for(n=null,u=t.child,t.child=null;u!==null;){if(e=u.alternate,e!==null&&So(e)===null){t.child=u;break}e=u.sibling,u.sibling=n,n=u,u=e}mc(t,!0,n,null,i,r);break;case"together":mc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Ot(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),mn|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(kr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(h(153));if(t.child!==null){for(e=t.child,n=zt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=zt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ts(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&ho(e)))}function Pg(e,t,n){switch(t.tag){case 3:so(t,t.stateNode.containerInfo),Kt(t,ae,e.memoizedState.cache),Gn();break;case 27:case 5:Gc(t);break;case 4:so(t,t.stateNode.containerInfo);break;case 10:Kt(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Zc(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated!==null?(jt(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Fp(e,t,n):(jt(t),e=Ot(e,t,n),e!==null?e.sibling:null);jt(t);break;case 19:var u=(e.flags&128)!==0;if(r=(n&t.childLanes)!==0,r||(kr(e,t,n,!1),r=(n&t.childLanes)!==0),u){if(r)return Xp(e,t,n);t.flags|=128}if(u=t.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),q(ne,ne.current),r)break;return null;case 22:return t.lanes=0,Pp(e,t,n,t.pendingProps);case 24:Kt(t,ae,e.memoizedState.cache)}return Ot(e,t,n)}function qp(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)ce=!0;else{if(!ts(e,n)&&(t.flags&128)===0)return ce=!1,Pg(e,t,n);ce=(e.flags&131072)!==0}else ce=!1,C&&(t.flags&1048576)!==0&&Hd(t,Nu,t.index);switch(t.lanes=0,t.tag){case 16:e:{var r=t.pendingProps;if(e=Vn(t.elementType),t.type=e,typeof e=="function")Ul(e)?(r=On(e,r),t.tag=1,t=Em(null,t,e,r,n)):(t.tag=0,t=tl(null,t,e,r,n));else{if(e!=null){var u=e.$$typeof;if(u===vl){t.tag=11,t=vm(null,t,e,r,n);break e}else if(u===Tl){t.tag=14,t=Tm(null,t,e,r,n);break e}}throw t=zc(e)||e,Error(h(306,t,""))}}return t;case 0:return tl(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,u=On(r,t.pendingProps),Em(e,t,r,u,n);case 3:e:{if(so(t,t.stateNode.containerInfo),e===null)throw Error(h(387));r=t.pendingProps;var i=t.memoizedState;u=i.element,Hc(e,t),zu(t,r,null,n);var o=t.memoizedState;if(r=o.cache,Kt(t,ae,r),r!==i.cache&&Kc(t,[ae],n,!0),Au(),r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=Mm(e,t,r,n);break e}else if(r!==u){u=$e(Error(h(424)),t),Pu(u),t=Mm(e,t,r,n);break e}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Y=tt(e.firstChild),ge=t,C=!0,en=null,Je=!0,n=$d(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Gn(),r===u){t=Ot(e,t,n);break e}ye(e,t,r,n)}t=t.child}return t;case 26:return ro(e,t),e===null?(n=Wm(t.type,null,t.pendingProps,null))?t.memoizedState=n:C||(n=t.type,e=t.pendingProps,r=Uo(Jt.current).createElement(n),r[xe]=t,r[Ue]=e,ve(r,n,e),de(r),t.stateNode=r):t.memoizedState=Wm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Gc(t),e===null&&C&&(r=t.stateNode=U0(t.type,t.pendingProps,Jt.current),ge=t,Je=!0,u=Y,pn(t.type)?(xl=u,Y=tt(r.firstChild)):Y=u),ye(e,t,t.pendingProps.children,n),ro(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&C&&((u=r=Y)&&(r=p2(r,t.type,t.pendingProps,Je),r!==null?(t.stateNode=r,ge=t,Y=tt(r.firstChild),Je=!1,u=!0):u=!1),u||sn(t)),Gc(t),u=t.type,i=t.pendingProps,o=e!==null?e.memoizedProps:null,r=i.children,ml(u,i)?r=null:o!==null&&ml(u,o)&&(t.flags|=32),t.memoizedState!==null&&(u=Xl(e,t,_g,null,null,n),Hu._currentValue=u),ro(e,t),ye(e,t,r,n),t.child;case 6:return e===null&&C&&((e=n=Y)&&(n=y2(n,t.pendingProps,Je),n!==null?(t.stateNode=n,ge=t,Y=null,e=!0):e=!1),e||sn(t)),null;case 13:return Fp(e,t,n);case 4:return so(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Bn(t,null,r,n):ye(e,t,r,n),t.child;case 11:return vm(e,t,t.type,t.pendingProps,n);case 7:return ye(e,t,t.pendingProps,n),t.child;case 8:return ye(e,t,t.pendingProps.children,n),t.child;case 12:return ye(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Kt(t,t.type,r.value),ye(e,t,r.children,n),t.child;case 9:return u=t.type._context,r=t.pendingProps.children,_n(t),u=he(u),r=r(u),t.flags|=1,ye(e,t,r,n),t.child;case 14:return Tm(e,t,t.type,t.pendingProps,n);case 15:return Np(e,t,t.type,t.pendingProps,n);case 19:return Xp(e,t,n);case 31:return Ng(e,t,n);case 22:return Pp(e,t,n,t.pendingProps);case 24:return _n(t),r=he(ae),e===null?(u=kl(),u===null&&(u=X,i=Dl(),u.pooledCache=i,i.refCount++,i!==null&&(u.pooledCacheLanes|=n),u=i),t.memoizedState={parent:r,cache:u},Nl(t),Kt(t,ae,u)):((e.lanes&n)!==0&&(Hc(e,t),zu(t,null,null,n),Au()),u=e.memoizedState,i=t.memoizedState,u.parent!==r?(u={parent:r,cache:r},t.memoizedState=u,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=u),Kt(t,ae,r)):(r=i.cache,Kt(t,ae,r),r!==u.cache&&Kc(t,[ae],n,!0))),ye(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(h(156,t.tag))}function vt(e){e.flags|=4}function dc(e,t,n,r,u){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(d0())e.flags|=8192;else throw zn=vo,Ll}else e.flags&=-16777217}function Am(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!D0(t))if(d0())e.flags|=8192;else throw zn=vo,Ll}function Fi(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?pd():536870912,e.lanes|=t,Gr|=t)}function du(e,t){if(!C)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function H(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var u=e.child;u!==null;)n|=u.lanes|u.childLanes,r|=u.subtreeFlags&65011712,r|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)n|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Fg(e,t,n){var r=t.pendingProps;switch(Cl(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return H(t),null;case 1:return H(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Rt(ae),Er(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(tr(t)?vt(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,uc())),H(t),null;case 26:var u=t.type,i=t.memoizedState;return e===null?(vt(t),i!==null?(H(t),Am(t,i)):(H(t),dc(t,u,null,r,n))):i?i!==e.memoizedState?(vt(t),H(t),Am(t,i)):(H(t),t.flags&=-16777217):(e=e.memoizedProps,e!==r&&vt(t),H(t),dc(t,u,e,r,n)),null;case 27:if(fo(t),n=Jt.current,u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&vt(t);else{if(!r){if(t.stateNode===null)throw Error(h(166));return H(t),null}e=ft.current,tr(t)?nm(t,e):(e=U0(u,r,n),t.stateNode=e,vt(t))}return H(t),null;case 5:if(fo(t),u=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&vt(t);else{if(!r){if(t.stateNode===null)throw Error(h(166));return H(t),null}if(i=ft.current,tr(t))nm(t,i);else{var o=Uo(Jt.current);switch(i){case 1:i=o.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:i=o.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":i=o.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":i=o.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":i=o.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof r.is=="string"?o.createElement("select",{is:r.is}):o.createElement("select"),r.multiple?i.multiple=!0:r.size&&(i.size=r.size);break;default:i=typeof r.is=="string"?o.createElement(u,{is:r.is}):o.createElement(u)}}i[xe]=t,i[Ue]=r;e:for(o=t.child;o!==null;){if(o.tag===5||o.tag===6)i.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===t)break e;for(;o.sibling===null;){if(o.return===null||o.return===t)break e;o=o.return}o.sibling.return=o.return,o=o.sibling}t.stateNode=i;e:switch(ve(i,u,r),u){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}r&&vt(t)}}return H(t),dc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&vt(t);else{if(typeof r!="string"&&t.stateNode===null)throw Error(h(166));if(e=Jt.current,tr(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,u=ge,u!==null)switch(u.tag){case 27:case 5:r=u.memoizedProps}e[xe]=t,e=!!(e.nodeValue===n||r!==null&&r.suppressHydrationWarning===!0||R0(e.nodeValue,n)),e||sn(t,!0)}else e=Uo(e).createTextNode(r),e[xe]=t,t.stateNode=e}return H(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=tr(t),n!==null){if(e===null){if(!r)throw Error(h(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(h(557));e[xe]=t}else Gn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;H(t),e=!1}else n=uc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(De(t),t):(De(t),null);if((t.flags&128)!==0)throw Error(h(558))}return H(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=tr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!u)throw Error(h(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(h(317));u[xe]=t}else Gn(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;H(t),u=!1}else u=uc(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return t.flags&256?(De(t),t):(De(t),null)}return De(t),(t.flags&128)!==0?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,u=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(u=r.alternate.memoizedState.cachePool.pool),i=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(i=r.memoizedState.cachePool.pool),i!==u&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Fi(t,t.updateQueue),H(t),null);case 4:return Er(),e===null&&cs(t.stateNode.containerInfo),H(t),null;case 10:return Rt(t.type),H(t),null;case 19:if(pe(ne),r=t.memoizedState,r===null)return H(t),null;if(u=(t.flags&128)!==0,i=r.rendering,i===null)if(u)du(r,!1);else{if(ee!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(i=So(e),i!==null){for(t.flags|=128,du(r,!1),e=i.updateQueue,t.updateQueue=e,Fi(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Kd(n,e),n=n.sibling;return q(ne,ne.current&1|2),C&&Vt(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ne()>Ao&&(t.flags|=128,u=!0,du(r,!1),t.lanes=4194304)}else{if(!u)if(e=So(i),e!==null){if(t.flags|=128,u=!0,e=e.updateQueue,t.updateQueue=e,Fi(t,e),du(r,!0),r.tail===null&&r.tailMode==="hidden"&&!i.alternate&&!C)return H(t),null}else 2*Ne()-r.renderingStartTime>Ao&&n!==536870912&&(t.flags|=128,u=!0,du(r,!1),t.lanes=4194304);r.isBackwards?(i.sibling=t.child,t.child=i):(e=r.last,e!==null?e.sibling=i:t.child=i,r.last=i)}return r.tail!==null?(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ne(),e.sibling=null,n=ne.current,q(ne,u?n&1|2:n&1),C&&Vt(t,r.treeForkCount),e):(H(t),null);case 22:case 23:return De(t),Pl(),r=t.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?(n&536870912)!==0&&(t.flags&128)===0&&(H(t),t.subtreeFlags&6&&(t.flags|=8192)):H(t),n=t.updateQueue,n!==null&&Fi(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&pe(An),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Rt(ae),H(t),null;case 25:return null;case 30:return null}throw Error(h(156,t.tag))}function Xg(e,t){switch(Cl(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Rt(ae),Er(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fo(t),null;case 31:if(t.memoizedState!==null){if(De(t),t.alternate===null)throw Error(h(340));Gn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(De(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(h(340));Gn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(ne),null;case 4:return Er(),null;case 10:return Rt(t.type),null;case 22:case 23:return De(t),Pl(),e!==null&&pe(An),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Rt(ae),null;case 25:return null;default:return null}}function Kp(e,t){switch(Cl(t),t.tag){case 3:Rt(ae),Er();break;case 26:case 27:case 5:fo(t);break;case 4:Er();break;case 31:t.memoizedState!==null&&De(t);break;case 13:De(t);break;case 19:pe(ne);break;case 10:Rt(t.type);break;case 22:case 23:De(t),Pl(),e!==null&&pe(An);break;case 24:Rt(ae)}}function ri(e,t){try{var n=t.updateQueue,r=n!==null?n.lastEffect:null;if(r!==null){var u=r.next;n=u;do{if((n.tag&e)===e){r=void 0;var i=n.create,o=n.inst;r=i(),o.destroy=r}n=n.next}while(n!==u)}}catch(a){N(t,t.return,a)}}function fn(e,t,n){try{var r=t.updateQueue,u=r!==null?r.lastEffect:null;if(u!==null){var i=u.next;r=i;do{if((r.tag&e)===e){var o=r.inst,a=o.destroy;if(a!==void 0){o.destroy=void 0,u=t;var c=n,l=a;try{l()}catch(m){N(u,c,m)}}}r=r.next}while(r!==i)}}catch(m){N(t,t.return,m)}}function jp(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{ep(t,n)}catch(r){N(e,e.return,r)}}}function Hp(e,t,n){n.props=On(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(r){N(e,t,r)}}function Gu(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n=="function"?e.refCleanup=n(r):n.current=r}}catch(u){N(e,t,u)}}function st(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r=="function")try{r()}catch(u){N(e,t,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(u){N(e,t,u)}else n.current=null}function Yp(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&r.focus();break e;case"img":n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(u){N(e,e.return,u)}}function pc(e,t,n){try{var r=e.stateNode;c2(r,e.type,n,t),r[Ue]=t}catch(u){N(e,e.return,u)}}function Wp(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&pn(e.type)||e.tag===4}function yc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Wp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&pn(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function rl(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=wt));else if(r!==4&&(r===27&&pn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(rl(e,t,n),e=e.sibling;e!==null;)rl(e,t,n),e=e.sibling}function wo(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&pn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(wo(e,t,n),e=e.sibling;e!==null;)wo(e,t,n),e=e.sibling}function Zp(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,u=t.attributes;u.length;)t.removeAttributeNode(u[0]);ve(t,r,n),t[xe]=e,t[Ue]=n}catch(i){N(e,e.return,i)}}var Et=!1,oe=!1,xc=!1,zm=typeof WeakSet=="function"?WeakSet:Set,me=null;function qg(e,t){if(e=e.containerInfo,sl=ko,e=Dd(e),Gl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var u=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,l=0,m=0,x=e,d=null;t:for(;;){for(var p;x!==n||u!==0&&x.nodeType!==3||(a=o+u),x!==i||r!==0&&x.nodeType!==3||(c=o+r),x.nodeType===3&&(o+=x.nodeValue.length),(p=x.firstChild)!==null;)d=x,x=p;for(;;){if(x===e)break t;if(d===n&&++l===u&&(a=o),d===i&&++m===r&&(c=o),(p=x.nextSibling)!==null)break;x=d,d=x.parentNode}x=p}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(fl={focusedElem:e,selectionRange:n},ko=!1,me=t;me!==null;)if(t=me,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,me=e;else for(;me!==null;){switch(t=me,i=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)u=e[n],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&i!==null){e=void 0,n=t,u=i.memoizedProps,i=i.memoizedState,r=n.stateNode;try{var v=On(n.type,u);e=r.getSnapshotBeforeUpdate(v,i),r.__reactInternalSnapshotBeforeUpdate=e}catch(T){N(n,n.return,T)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)dl(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":dl(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(h(163))}if(e=t.sibling,e!==null){e.return=t.return,me=e;break}me=t.return}}function Qp(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:St(e,n),r&4&&ri(5,n);break;case 1:if(St(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(o){N(n,n.return,o)}else{var u=On(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(u,t,e.__reactInternalSnapshotBeforeUpdate)}catch(o){N(n,n.return,o)}}r&64&&jp(n),r&512&&Gu(n,n.return);break;case 3:if(St(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{ep(e,t)}catch(o){N(n,n.return,o)}}break;case 27:t===null&&r&4&&Zp(n);case 26:case 5:St(e,n),t===null&&r&4&&Yp(n),r&512&&Gu(n,n.return);break;case 12:St(e,n);break;case 31:St(e,n),r&4&&Jp(e,n);break;case 13:St(e,n),r&4&&e0(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=$g.bind(null,n),x2(e,n))));break;case 22:if(r=n.memoizedState!==null||Et,!r){t=t!==null&&t.memoizedState!==null||oe,u=Et;var i=oe;Et=r,(oe=t)&&!i?bt(e,n,(n.subtreeFlags&8772)!==0):St(e,n),Et=u,oe=i}break;case 30:break;default:St(e,n)}}function Ip(e){var t=e.alternate;t!==null&&(e.alternate=null,Ip(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&El(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var I=null,Ge=!1;function Tt(e,t,n){for(n=n.child;n!==null;)$p(e,t,n),n=n.sibling}function $p(e,t,n){if(Pe&&typeof Pe.onCommitFiberUnmount=="function")try{Pe.onCommitFiberUnmount(Qu,n)}catch{}switch(n.tag){case 26:oe||st(n,t),Tt(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:oe||st(n,t);var r=I,u=Ge;pn(n.type)&&(I=n.stateNode,Ge=!1),Tt(e,t,n),Ou(n.stateNode),I=r,Ge=u;break;case 5:oe||st(n,t);case 6:if(r=I,u=Ge,I=null,Tt(e,t,n),I=r,Ge=u,I!==null)if(Ge)try{(I.nodeType===9?I.body:I.nodeName==="HTML"?I.ownerDocument.body:I).removeChild(n.stateNode)}catch(i){N(n,t,i)}else try{I.removeChild(n.stateNode)}catch(i){N(n,t,i)}break;case 18:I!==null&&(Ge?(e=I,qm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Or(e)):qm(I,n.stateNode));break;case 4:r=I,u=Ge,I=n.stateNode.containerInfo,Ge=!0,Tt(e,t,n),I=r,Ge=u;break;case 0:case 11:case 14:case 15:fn(2,n,t),oe||fn(4,n,t),Tt(e,t,n);break;case 1:oe||(st(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"&&Hp(n,t,r)),Tt(e,t,n);break;case 21:Tt(e,t,n);break;case 22:oe=(r=oe)||n.memoizedState!==null,Tt(e,t,n),oe=r;break;default:Tt(e,t,n)}}function Jp(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Or(e)}catch(n){N(t,t.return,n)}}}function e0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Or(e)}catch(n){N(t,t.return,n)}}function Kg(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new zm),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new zm),t;default:throw Error(h(435,e.tag))}}function Xi(e,t){var n=Kg(e);t.forEach(function(r){if(!n.has(r)){n.add(r);var u=Jg.bind(null,e,r);r.then(u,u)}})}function ze(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var u=n[r],i=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 27:if(pn(a.type)){I=a.stateNode,Ge=!1;break e}break;case 5:I=a.stateNode,Ge=!1;break e;case 3:case 4:I=a.stateNode.containerInfo,Ge=!0;break e}a=a.return}if(I===null)throw Error(h(160));$p(i,o,u),I=null,Ge=!1,i=u.alternate,i!==null&&(i.return=null),u.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)t0(t,e),t=t.sibling}var ut=null;function t0(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:ze(t,e),Re(e),r&4&&(fn(3,e,e.return),ri(3,e),fn(5,e,e.return));break;case 1:ze(t,e),Re(e),r&512&&(oe||n===null||st(n,n.return)),r&64&&Et&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var u=ut;if(ze(t,e),Re(e),r&512&&(oe||n===null||st(n,n.return)),r&4){var i=n!==null?n.memoizedState:null;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){e:{r=e.type,n=e.memoizedProps,u=u.ownerDocument||u;t:switch(r){case"title":i=u.getElementsByTagName("title")[0],(!i||i[Ju]||i[xe]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=u.createElement(r),u.head.insertBefore(i,u.querySelector("head > title"))),ve(i,r,n),i[xe]=e,de(i),r=i;break e;case"link":var o=Qm("link","href",u).get(r+(n.href||""));if(o){for(var a=0;a<o.length;a++)if(i=o[a],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(a,1);break t}}i=u.createElement(r),ve(i,r,n),u.head.appendChild(i);break;case"meta":if(o=Qm("meta","content",u).get(r+(n.content||""))){for(a=0;a<o.length;a++)if(i=o[a],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){o.splice(a,1);break t}}i=u.createElement(r),ve(i,r,n),u.head.appendChild(i);break;default:throw Error(h(468,r))}i[xe]=e,de(i),r=i}e.stateNode=r}else Im(u,e.type,e.stateNode);else e.stateNode=Zm(u,r,e.memoizedProps);else i!==r?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,r===null?Im(u,e.type,e.stateNode):Zm(u,r,e.memoizedProps)):r===null&&e.stateNode!==null&&pc(e,e.memoizedProps,n.memoizedProps)}break;case 27:ze(t,e),Re(e),r&512&&(oe||n===null||st(n,n.return)),n!==null&&r&4&&pc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(ze(t,e),Re(e),r&512&&(oe||n===null||st(n,n.return)),e.flags&32){u=e.stateNode;try{wr(u,"")}catch(v){N(e,e.return,v)}}r&4&&e.stateNode!=null&&(u=e.memoizedProps,pc(e,u,n!==null?n.memoizedProps:u)),r&1024&&(xc=!0);break;case 6:if(ze(t,e),Re(e),r&4){if(e.stateNode===null)throw Error(h(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(v){N(e,e.return,v)}}break;case 3:if(oo=null,u=ut,ut=Oo(t.containerInfo),ze(t,e),ut=u,Re(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Or(t.containerInfo)}catch(v){N(e,e.return,v)}xc&&(xc=!1,n0(e));break;case 4:r=ut,ut=Oo(e.stateNode.containerInfo),ze(t,e),Re(e),ut=r;break;case 12:ze(t,e),Re(e);break;case 31:ze(t,e),Re(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Xi(e,r)));break;case 13:ze(t,e),Re(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Qo=Ne()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Xi(e,r)));break;case 22:u=e.memoizedState!==null;var c=n!==null&&n.memoizedState!==null,l=Et,m=oe;if(Et=l||u,oe=m||c,ze(t,e),oe=m,Et=l,Re(e),r&8192)e:for(t=e.stateNode,t._visibility=u?t._visibility&-2:t._visibility|1,u&&(n===null||c||Et||oe||En(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){c=n=t;try{if(i=c.stateNode,u)o=i.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none";else{a=c.stateNode;var x=c.memoizedProps.style,d=x!=null&&x.hasOwnProperty("display")?x.display:null;a.style.display=d==null||typeof d=="boolean"?"":(""+d).trim()}}catch(v){N(c,c.return,v)}}}else if(t.tag===6){if(n===null){c=t;try{c.stateNode.nodeValue=u?"":c.memoizedProps}catch(v){N(c,c.return,v)}}}else if(t.tag===18){if(n===null){c=t;try{var p=c.stateNode;u?Km(p,!0):Km(c.stateNode,!1)}catch(v){N(c,c.return,v)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,Xi(e,n))));break;case 19:ze(t,e),Re(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,Xi(e,r)));break;case 30:break;case 21:break;default:ze(t,e),Re(e)}}function Re(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Wp(r)){n=r;break}r=r.return}if(n==null)throw Error(h(160));switch(n.tag){case 27:var u=n.stateNode,i=yc(e);wo(e,i,u);break;case 5:var o=n.stateNode;n.flags&32&&(wr(o,""),n.flags&=-33);var a=yc(e);wo(e,a,o);break;case 3:case 4:var c=n.stateNode.containerInfo,l=yc(e);rl(e,l,c);break;default:throw Error(h(161))}}catch(m){N(e,e.return,m)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function n0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;n0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function St(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Qp(e,t.alternate,t),t=t.sibling}function En(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:fn(4,t,t.return),En(t);break;case 1:st(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Hp(t,t.return,n),En(t);break;case 27:Ou(t.stateNode);case 26:case 5:st(t,t.return),En(t);break;case 22:t.memoizedState===null&&En(t);break;case 30:En(t);break;default:En(t)}e=e.sibling}}function bt(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var r=t.alternate,u=e,i=t,o=i.flags;switch(i.tag){case 0:case 11:case 15:bt(u,i,n),ri(4,i);break;case 1:if(bt(u,i,n),r=i,u=r.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(l){N(r,r.return,l)}if(r=i,u=r.updateQueue,u!==null){var a=r.stateNode;try{var c=u.shared.hiddenCallbacks;if(c!==null)for(u.shared.hiddenCallbacks=null,u=0;u<c.length;u++)Jd(c[u],a)}catch(l){N(r,r.return,l)}}n&&o&64&&jp(i),Gu(i,i.return);break;case 27:Zp(i);case 26:case 5:bt(u,i,n),n&&r===null&&o&4&&Yp(i),Gu(i,i.return);break;case 12:bt(u,i,n);break;case 31:bt(u,i,n),n&&o&4&&Jp(u,i);break;case 13:bt(u,i,n),n&&o&4&&e0(u,i);break;case 22:i.memoizedState===null&&bt(u,i,n),Gu(i,i.return);break;case 30:break;default:bt(u,i,n)}t=t.sibling}}function ns(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ti(n))}function rs(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ti(e))}function rt(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)r0(e,t,n,r),t=t.sibling}function r0(e,t,n,r){var u=t.flags;switch(t.tag){case 0:case 11:case 15:rt(e,t,n,r),u&2048&&ri(9,t);break;case 1:rt(e,t,n,r);break;case 3:rt(e,t,n,r),u&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ti(e)));break;case 12:if(u&2048){rt(e,t,n,r),e=t.stateNode;try{var i=t.memoizedProps,o=i.id,a=i.onPostCommit;typeof a=="function"&&a(o,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(c){N(t,t.return,c)}}else rt(e,t,n,r);break;case 31:rt(e,t,n,r);break;case 13:rt(e,t,n,r);break;case 23:break;case 22:i=t.stateNode,o=t.alternate,t.memoizedState!==null?i._visibility&2?rt(e,t,n,r):_u(e,t):i._visibility&2?rt(e,t,n,r):(i._visibility|=2,rr(e,t,n,r,(t.subtreeFlags&10256)!==0||!1)),u&2048&&ns(o,t);break;case 24:rt(e,t,n,r),u&2048&&rs(t.alternate,t);break;default:rt(e,t,n,r)}}function rr(e,t,n,r,u){for(u=u&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,o=t,a=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:rr(i,o,a,c,u),ri(8,o);break;case 23:break;case 22:var m=o.stateNode;o.memoizedState!==null?m._visibility&2?rr(i,o,a,c,u):_u(i,o):(m._visibility|=2,rr(i,o,a,c,u)),u&&l&2048&&ns(o.alternate,o);break;case 24:rr(i,o,a,c,u),u&&l&2048&&rs(o.alternate,o);break;default:rr(i,o,a,c,u)}t=t.sibling}}function _u(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,u=r.flags;switch(r.tag){case 22:_u(n,r),u&2048&&ns(r.alternate,r);break;case 24:_u(n,r),u&2048&&rs(r.alternate,r);break;default:_u(n,r)}t=t.sibling}}var Su=8192;function nr(e,t,n){if(e.subtreeFlags&Su)for(e=e.child;e!==null;)u0(e,t,n),e=e.sibling}function u0(e,t,n){switch(e.tag){case 26:nr(e,t,n),e.flags&Su&&e.memoizedState!==null&&z2(n,ut,e.memoizedState,e.memoizedProps);break;case 5:nr(e,t,n);break;case 3:case 4:var r=ut;ut=Oo(e.stateNode.containerInfo),nr(e,t,n),ut=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Su,Su=16777216,nr(e,t,n),Su=r):nr(e,t,n));break;default:nr(e,t,n)}}function i0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function pu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];me=r,a0(r,e)}i0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)o0(e),e=e.sibling}function o0(e){switch(e.tag){case 0:case 11:case 15:pu(e),e.flags&2048&&fn(9,e,e.return);break;case 3:pu(e);break;case 12:pu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,uo(e)):pu(e);break;default:pu(e)}}function uo(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];me=r,a0(r,e)}i0(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:fn(8,t,t.return),uo(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,uo(t));break;default:uo(t)}e=e.sibling}}function a0(e,t){for(;me!==null;){var n=me;switch(n.tag){case 0:case 11:case 15:fn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ti(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,me=r;else e:for(n=e;me!==null;){r=me;var u=r.sibling,i=r.return;if(Ip(r),r===n){me=null;break e}if(u!==null){u.return=i,me=u;break e}me=i}}}var jg={getCacheForType:function(e){var t=he(ae),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return he(ae).controller.signal}},Hg=typeof WeakMap=="function"?WeakMap:Map,D=0,X=null,U=null,O=0,L=0,Ce=null,Qt=!1,Nr=!1,us=!1,Ct=0,ee=0,mn=0,Rn=0,is=0,Le=0,Gr=0,Bu=null,_e=null,ul=!1,Qo=0,c0=0,Ao=1/0,zo=null,rn=null,le=0,un=null,_r=null,Gt=0,il=0,ol=null,l0=null,Uu=0,al=null;function Xe(){return(D&2)!==0&&O!==0?O&-O:M.T!==null?as():hd()}function s0(){if(Le===0)if((O&536870912)===0||C){var e=Bi;Bi<<=1,(Bi&3932160)===0&&(Bi=262144),Le=e}else Le=536870912;return e=Ke.current,e!==null&&(e.flags|=32),Le}function Be(e,t,n){(e===X&&(L===2||L===9)||e.cancelPendingCommit!==null)&&(Br(e,0),It(e,O,Le,!1)),$u(e,n),((D&2)===0||e!==X)&&(e===X&&((D&2)===0&&(Rn|=n),ee===4&&It(e,O,Le,!1)),dt(e))}function f0(e,t,n){if((D&6)!==0)throw Error(h(327));var r=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Iu(e,t),u=r?Zg(e,t):gc(e,t,!0),i=r;do{if(u===0){Nr&&!r&&It(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!Yg(n)){u=gc(e,t,!1),i=!1;continue}if(u===2){if(i=t,e.errorRecoveryDisabledLanes&i)var o=0;else o=e.pendingLanes&-536870913,o=o!==0?o:o&536870912?536870912:0;if(o!==0){t=o;e:{var a=e;u=Bu;var c=a.current.memoizedState.isDehydrated;if(c&&(Br(a,o).flags|=256),o=gc(a,o,!1),o!==2){if(us&&!c){a.errorRecoveryDisabledLanes|=i,Rn|=i,u=4;break e}i=_e,_e=u,i!==null&&(_e===null?_e=i:_e.push.apply(_e,i))}u=o}if(i=!1,u!==2)continue}}if(u===1){Br(e,0),It(e,t,0,!0);break}e:{switch(r=e,i=u,i){case 0:case 1:throw Error(h(345));case 4:if((t&4194048)!==t)break;case 6:It(r,t,Le,!Qt);break e;case 2:_e=null;break;case 3:case 5:break;default:throw Error(h(329))}if((t&62914560)===t&&(u=Qo+300-Ne(),10<u)){if(It(r,t,Le,!Qt),No(r,0,!0)!==0)break e;Gt=t,r.timeoutHandle=_0(Rm.bind(null,r,n,_e,zo,ul,t,Le,Rn,Gr,Qt,i,"Throttled",-0,0),u);break e}Rm(r,n,_e,zo,ul,t,Le,Rn,Gr,Qt,i,null,-0,0)}}break}while(!0);dt(e)}function Rm(e,t,n,r,u,i,o,a,c,l,m,x,d,p){if(e.timeoutHandle=-1,x=t.subtreeFlags,x&8192||(x&16785408)===16785408){x={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:wt},u0(t,i,x);var v=(i&62914560)===i?Qo-Ne():(i&4194048)===i?c0-Ne():0;if(v=R2(x,v),v!==null){Gt=i,e.cancelPendingCommit=v(_m.bind(null,e,t,i,n,r,u,o,a,c,m,x,null,d,p)),It(e,i,o,!l);return}}_m(e,t,i,n,r,u,o,a,c)}function Yg(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var u=n[r],i=u.getSnapshot;u=u.value;try{if(!qe(i(),u))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function It(e,t,n,r){t&=~is,t&=~Rn,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var u=t;0<u;){var i=31-Fe(u),o=1<<i;r[i]=-1,u&=~o}n!==0&&yd(e,n,t)}function Io(){return(D&6)===0?(ui(0,!1),!1):!0}function os(){if(U!==null){if(L===0)var e=U.return;else e=U,At=Nn=null,jl(e),Sr=null,Fu=0,e=U;for(;e!==null;)Kp(e.alternate,e),e=e.return;U=null}}function Br(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,f2(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Gt=0,os(),X=e,U=n=zt(e.current,null),O=t,L=0,Ce=null,Qt=!1,Nr=Iu(e,t),us=!1,Gr=Le=is=Rn=mn=ee=0,_e=Bu=null,ul=!1,(t&8)!==0&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var u=31-Fe(r),i=1<<u;t|=e[u],r&=~i}return Ct=t,qo(),n}function m0(e,t){G=null,M.H=qu,t===Lr||t===jo?(t=am(),L=3):t===Ll?(t=am(),L=4):L=t===es?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Ce=t,U===null&&(ee=1,Eo(e,$e(t,e.current)))}function d0(){var e=Ke.current;return e===null?!0:(O&4194048)===O?et===null:(O&62914560)===O||(O&536870912)!==0?e===et:!1}function p0(){var e=M.H;return M.H=qu,e===null?qu:e}function y0(){var e=M.A;return M.A=jg,e}function Ro(){ee=4,Qt||(O&4194048)!==O&&Ke.current!==null||(Nr=!0),(mn&134217727)===0&&(Rn&134217727)===0||X===null||It(X,O,Le,!1)}function gc(e,t,n){var r=D;D|=2;var u=p0(),i=y0();(X!==e||O!==t)&&(zo=null,Br(e,t)),t=!1;var o=ee;e:do try{if(L!==0&&U!==null){var a=U,c=Ce;switch(L){case 8:os(),o=6;break e;case 3:case 2:case 9:case 6:Ke.current===null&&(t=!0);var l=L;if(L=0,Ce=null,xr(e,a,c,l),n&&Nr){o=0;break e}break;default:l=L,L=0,Ce=null,xr(e,a,c,l)}}Wg(),o=ee;break}catch(m){m0(e,m)}while(!0);return t&&e.shellSuspendCounter++,At=Nn=null,D=r,M.H=u,M.A=i,U===null&&(X=null,O=0,qo()),o}function Wg(){for(;U!==null;)x0(U)}function Zg(e,t){var n=D;D|=2;var r=p0(),u=y0();X!==e||O!==t?(zo=null,Ao=Ne()+500,Br(e,t)):Nr=Iu(e,t);e:do try{if(L!==0&&U!==null){t=U;var i=Ce;t:switch(L){case 1:L=0,Ce=null,xr(e,t,i,1);break;case 2:case 9:if(om(i)){L=0,Ce=null,Gm(t);break}t=function(){L!==2&&L!==9||X!==e||(L=7),dt(e)},i.then(t,t);break e;case 3:L=7;break e;case 4:L=5;break e;case 7:om(i)?(L=0,Ce=null,Gm(t)):(L=0,Ce=null,xr(e,t,i,7));break;case 5:var o=null;switch(U.tag){case 26:o=U.memoizedState;case 5:case 27:var a=U;if(o?D0(o):a.stateNode.complete){L=0,Ce=null;var c=a.sibling;if(c!==null)U=c;else{var l=a.return;l!==null?(U=l,$o(l)):U=null}break t}}L=0,Ce=null,xr(e,t,i,5);break;case 6:L=0,Ce=null,xr(e,t,i,6);break;case 8:os(),ee=6;break e;default:throw Error(h(462))}}Qg();break}catch(m){m0(e,m)}while(!0);return At=Nn=null,M.H=r,M.A=u,D=n,U!==null?0:(X=null,O=0,qo(),ee)}function Qg(){for(;U!==null&&!vx();)x0(U)}function x0(e){var t=qp(e.alternate,e,Ct);e.memoizedProps=e.pendingProps,t===null?$o(e):U=t}function Gm(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Vm(n,t,t.pendingProps,t.type,void 0,O);break;case 11:t=Vm(n,t,t.pendingProps,t.type.render,t.ref,O);break;case 5:jl(t);default:Kp(n,t),t=U=Kd(t,Ct),t=qp(n,t,Ct)}e.memoizedProps=e.pendingProps,t===null?$o(e):U=t}function xr(e,t,n,r){At=Nn=null,jl(t),Sr=null,Fu=0;var u=t.return;try{if(Lg(e,u,t,n,O)){ee=1,Eo(e,$e(n,e.current)),U=null;return}}catch(i){if(u!==null)throw U=u,i;ee=1,Eo(e,$e(n,e.current)),U=null;return}t.flags&32768?(C||r===1?e=!0:Nr||(O&536870912)!==0?e=!1:(Qt=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ke.current,r!==null&&r.tag===13&&(r.flags|=16384))),g0(t,e)):$o(t)}function $o(e){var t=e;do{if((t.flags&32768)!==0){g0(t,Qt);return}e=t.return;var n=Fg(t.alternate,t,Ct);if(n!==null){U=n;return}if(t=t.sibling,t!==null){U=t;return}U=t=e}while(t!==null);ee===0&&(ee=5)}function g0(e,t){do{var n=Xg(e.alternate,e);if(n!==null){n.flags&=32767,U=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){U=e;return}U=e=n}while(e!==null);ee=6,U=null}function _m(e,t,n,r,u,i,o,a,c){e.cancelPendingCommit=null;do Jo();while(le!==0);if((D&6)!==0)throw Error(h(327));if(t!==null){if(t===e.current)throw Error(h(177));if(i=t.lanes|t.childLanes,i|=_l,Rx(e,n,i,o,a,c),e===X&&(U=X=null,O=0),_r=t,un=e,Gt=n,il=i,ol=u,l0=r,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,e2(mo,function(){return b0(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||r){r=M.T,M.T=null,u=k.p,k.p=2,o=D,D|=4;try{qg(e,t,n)}finally{D=o,k.p=u,M.T=r}}le=1,h0(),v0(),T0()}}function h0(){if(le===1){le=0;var e=un,t=_r,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=M.T,M.T=null;var r=k.p;k.p=2;var u=D;D|=4;try{t0(t,e);var i=fl,o=Dd(e.containerInfo),a=i.focusedElem,c=i.selectionRange;if(o!==a&&a&&a.ownerDocument&&Cd(a.ownerDocument.documentElement,a)){if(c!==null&&Gl(a)){var l=c.start,m=c.end;if(m===void 0&&(m=l),"selectionStart"in a)a.selectionStart=l,a.selectionEnd=Math.min(m,a.value.length);else{var x=a.ownerDocument||document,d=x&&x.defaultView||window;if(d.getSelection){var p=d.getSelection(),v=a.textContent.length,T=Math.min(c.start,v),V=c.end===void 0?T:Math.min(c.end,v);!p.extend&&T>V&&(o=V,V=T,T=o);var f=Jf(a,T),s=Jf(a,V);if(f&&s&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==s.node||p.focusOffset!==s.offset)){var y=x.createRange();y.setStart(f.node,f.offset),p.removeAllRanges(),T>V?(p.addRange(y),p.extend(s.node,s.offset)):(y.setEnd(s.node,s.offset),p.addRange(y))}}}}for(x=[],p=a;p=p.parentNode;)p.nodeType===1&&x.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<x.length;a++){var g=x[a];g.element.scrollLeft=g.left,g.element.scrollTop=g.top}}ko=!!sl,fl=sl=null}finally{D=u,k.p=r,M.T=n}}e.current=t,le=2}}function v0(){if(le===2){le=0;var e=un,t=_r,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=M.T,M.T=null;var r=k.p;k.p=2;var u=D;D|=4;try{Qp(e,t.alternate,t)}finally{D=u,k.p=r,M.T=n}}le=3}}function T0(){if(le===4||le===3){le=0,Tx();var e=un,t=_r,n=Gt,r=l0;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?le=5:(le=0,_r=un=null,S0(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(rn=null),Vl(n),t=t.stateNode,Pe&&typeof Pe.onCommitFiberRoot=="function")try{Pe.onCommitFiberRoot(Qu,t,void 0,(t.current.flags&128)===128)}catch{}if(r!==null){t=M.T,u=k.p,k.p=2,M.T=null;try{for(var i=e.onRecoverableError,o=0;o<r.length;o++){var a=r[o];i(a.value,{componentStack:a.stack})}}finally{M.T=t,k.p=u}}(Gt&3)!==0&&Jo(),dt(e),u=e.pendingLanes,(n&261930)!==0&&(u&42)!==0?e===al?Uu++:(Uu=0,al=e):Uu=0,ui(0,!1)}}function S0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ti(t)))}function Jo(){return h0(),v0(),T0(),b0()}function b0(){if(le!==5)return!1;var e=un,t=il;il=0;var n=Vl(Gt),r=M.T,u=k.p;try{k.p=32>n?32:n,M.T=null,n=ol,ol=null;var i=un,o=Gt;if(le=0,_r=un=null,Gt=0,(D&6)!==0)throw Error(h(331));var a=D;if(D|=4,o0(i.current),r0(i,i.current,o,n),D=a,ui(0,!1),Pe&&typeof Pe.onPostCommitFiberRoot=="function")try{Pe.onPostCommitFiberRoot(Qu,i)}catch{}return!0}finally{k.p=u,M.T=r,S0(e,t)}}function Bm(e,t,n){t=$e(n,t),t=el(e.stateNode,t,2),e=nn(e,t,2),e!==null&&($u(e,2),dt(e))}function N(e,t,n){if(e.tag===3)Bm(e,e,n);else for(;t!==null;){if(t.tag===3){Bm(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(rn===null||!rn.has(r))){e=$e(n,e),n=kp(2),r=nn(t,n,2),r!==null&&(Lp(n,r,t,e),$u(r,2),dt(r));break}}t=t.return}}function hc(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Hg;var u=new Set;r.set(t,u)}else u=r.get(t),u===void 0&&(u=new Set,r.set(t,u));u.has(n)||(us=!0,u.add(n),e=Ig.bind(null,e,t,n),t.then(e,e))}function Ig(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,X===e&&(O&n)===n&&(ee===4||ee===3&&(O&62914560)===O&&300>Ne()-Qo?(D&2)===0&&Br(e,0):is|=n,Gr===O&&(Gr=0)),dt(e)}function V0(e,t){t===0&&(t=pd()),e=Ln(e,t),e!==null&&($u(e,t),dt(e))}function $g(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),V0(e,n)}function Jg(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,u=e.memoizedState;u!==null&&(n=u.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(h(314))}r!==null&&r.delete(t),V0(e,n)}function e2(e,t){return Sl(e,t)}var Go=null,ur=null,cl=!1,_o=!1,vc=!1,$t=0;function dt(e){e!==ur&&e.next===null&&(ur===null?Go=ur=e:ur=ur.next=e),_o=!0,cl||(cl=!0,n2())}function ui(e,t){if(!vc&&_o){vc=!0;do for(var n=!1,r=Go;r!==null;){if(!t)if(e!==0){var u=r.pendingLanes;if(u===0)var i=0;else{var o=r.suspendedLanes,a=r.pingedLanes;i=(1<<31-Fe(42|e)+1)-1,i&=u&~(o&~a),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,Um(r,i))}else i=O,i=No(r,r===X?i:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(i&3)===0||Iu(r,i)||(n=!0,Um(r,i));r=r.next}while(n);vc=!1}}function t2(){E0()}function E0(){_o=cl=!1;var e=0;$t!==0&&s2()&&(e=$t);for(var t=Ne(),n=null,r=Go;r!==null;){var u=r.next,i=M0(r,t);i===0?(r.next=null,n===null?Go=u:n.next=u,u===null&&(ur=n)):(n=r,(e!==0||(i&3)!==0)&&(_o=!0)),r=u}le!==0&&le!==5||ui(e,!1),$t!==0&&($t=0)}function M0(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,u=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var o=31-Fe(i),a=1<<o,c=u[o];c===-1?((a&n)===0||(a&r)!==0)&&(u[o]=zx(a,t)):c<=t&&(e.expiredLanes|=a),i&=~a}if(t=X,n=O,n=No(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(L===2||L===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Wa(r),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Iu(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Wa(r),Vl(n)){case 2:case 8:n=md;break;case 32:n=mo;break;case 268435456:n=dd;break;default:n=mo}return r=w0.bind(null,e),n=Sl(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Wa(r),e.callbackPriority=2,e.callbackNode=null,2}function w0(e,t){if(le!==0&&le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Jo()&&e.callbackNode!==n)return null;var r=O;return r=No(e,e===X?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(f0(e,r,t),M0(e,Ne()),e.callbackNode!=null&&e.callbackNode===n?w0.bind(null,e):null)}function Um(e,t){if(Jo())return null;f0(e,t,!0)}function n2(){m2(function(){(D&6)!==0?Sl(fd,t2):E0()})}function as(){if($t===0){var e=Ar;e===0&&(e=_i,_i<<=1,(_i&261888)===0&&(_i=256)),$t=e}return $t}function Om(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Zi(""+e)}function Cm(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function r2(e,t,n,r,u){if(t==="submit"&&n&&n.stateNode===u){var i=Om((u[Ue]||null).action),o=r.submitter;o&&(t=(t=o[Ue]||null)?Om(t.formAction):o.getAttribute("formAction"),t!==null&&(i=t,o=null));var a=new Po("action","action",null,r,u);e.push({event:a,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if($t!==0){var c=o?Cm(u,o):new FormData(u);$c(n,{pending:!0,data:c,method:u.method,action:i},null,c)}}else typeof i=="function"&&(a.preventDefault(),c=o?Cm(u,o):new FormData(u),$c(n,{pending:!0,data:c,method:u.method,action:i},i,c))},currentTarget:u}]})}}for(qi=0;qi<Pc.length;qi++)Ki=Pc[qi],Dm=Ki.toLowerCase(),km=Ki[0].toUpperCase()+Ki.slice(1),it(Dm,"on"+km);var Ki,Dm,km,qi;it(Ld,"onAnimationEnd");it(Nd,"onAnimationIteration");it(Pd,"onAnimationStart");it("dblclick","onDoubleClick");it("focusin","onFocus");it("focusout","onBlur");it(Sg,"onTransitionRun");it(bg,"onTransitionStart");it(Vg,"onTransitionCancel");it(Fd,"onTransitionEnd");Mr("onMouseEnter",["mouseout","mouseover"]);Mr("onMouseLeave",["mouseout","mouseover"]);Mr("onPointerEnter",["pointerout","pointerover"]);Mr("onPointerLeave",["pointerout","pointerover"]);Cn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Cn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Cn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Cn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Cn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Cn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ku="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),u2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ku));function A0(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],u=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],c=a.instance,l=a.currentTarget;if(a=a.listener,c!==i&&u.isPropagationStopped())break e;i=a,u.currentTarget=l;try{i(u)}catch(m){yo(m)}u.currentTarget=null,i=c}else for(o=0;o<r.length;o++){if(a=r[o],c=a.instance,l=a.currentTarget,a=a.listener,c!==i&&u.isPropagationStopped())break e;i=a,u.currentTarget=l;try{i(u)}catch(m){yo(m)}u.currentTarget=null,i=c}}}}function B(e,t){var n=t[Bc];n===void 0&&(n=t[Bc]=new Set);var r=e+"__bubble";n.has(r)||(z0(t,e,2,!1),n.add(r))}function Tc(e,t,n){var r=0;t&&(r|=4),z0(n,e,r,t)}var ji="_reactListening"+Math.random().toString(36).slice(2);function cs(e){if(!e[ji]){e[ji]=!0,vd.forEach(function(n){n!=="selectionchange"&&(u2.has(n)||Tc(n,!1,e),Tc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ji]||(t[ji]=!0,Tc("selectionchange",!1,t))}}function z0(e,t,n,r){switch(F0(t)){case 2:var u=B2;break;case 8:u=U2;break;default:u=ms}n=u.bind(null,t,n,e),u=void 0,!kc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(u=!0),r?u!==void 0?e.addEventListener(t,n,{capture:!0,passive:u}):e.addEventListener(t,n,!0):u!==void 0?e.addEventListener(t,n,{passive:u}):e.addEventListener(t,n,!1)}function Sc(e,t,n,r,u){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===u)break;if(o===4)for(o=r.return;o!==null;){var c=o.tag;if((c===3||c===4)&&o.stateNode.containerInfo===u)return;o=o.return}for(;a!==null;){if(o=ar(a),o===null)return;if(c=o.tag,c===5||c===6||c===26||c===27){r=i=o;continue e}a=a.parentNode}}r=r.return}Ad(function(){var l=i,m=wl(n),x=[];e:{var d=Xd.get(e);if(d!==void 0){var p=Po,v=e;switch(e){case"keypress":if(Ii(n)===0)break e;case"keydown":case"keyup":p=Jx;break;case"focusin":v="focus",p=Ja;break;case"focusout":v="blur",p=Ja;break;case"beforeblur":case"afterblur":p=Ja;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Kf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Fx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=ng;break;case Ld:case Nd:case Pd:p=Kx;break;case Fd:p=ug;break;case"scroll":case"scrollend":p=Nx;break;case"wheel":p=og;break;case"copy":case"cut":case"paste":p=Hx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Hf;break;case"toggle":case"beforetoggle":p=cg}var T=(t&4)!==0,V=!T&&(e==="scroll"||e==="scrollend"),f=T?d!==null?d+"Capture":null:d;T=[];for(var s=l,y;s!==null;){var g=s;if(y=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||y===null||f===null||(g=Du(s,f),g!=null&&T.push(ju(s,g,y))),V)break;s=s.return}0<T.length&&(d=new p(d,v,null,n,m),x.push({event:d,listeners:T}))}}if((t&7)===0){e:{if(d=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",d&&n!==Dc&&(v=n.relatedTarget||n.fromElement)&&(ar(v)||v[Cr]))break e;if((p||d)&&(d=m.window===m?m:(d=m.ownerDocument)?d.defaultView||d.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=l,v=v?ar(v):null,v!==null&&(V=Zu(v),T=v.tag,v!==V||T!==5&&T!==27&&T!==6)&&(v=null)):(p=null,v=l),p!==v)){if(T=Kf,g="onMouseLeave",f="onMouseEnter",s="mouse",(e==="pointerout"||e==="pointerover")&&(T=Hf,g="onPointerLeave",f="onPointerEnter",s="pointer"),V=p==null?d:vu(p),y=v==null?d:vu(v),d=new T(g,s+"leave",p,n,m),d.target=V,d.relatedTarget=y,g=null,ar(m)===l&&(T=new T(f,s+"enter",v,n,m),T.target=y,T.relatedTarget=V,g=T),V=g,p&&v)t:{for(T=i2,f=p,s=v,y=0,g=f;g;g=T(g))y++;g=0;for(var b=s;b;b=T(b))g++;for(;0<y-g;)f=T(f),y--;for(;0<g-y;)s=T(s),g--;for(;y--;){if(f===s||s!==null&&f===s.alternate){T=f;break t}f=T(f),s=T(s)}T=null}else T=null;p!==null&&Lm(x,d,p,T,!1),v!==null&&V!==null&&Lm(x,V,v,T,!0)}}e:{if(d=l?vu(l):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var z=Qf;else if(Zf(d))if(Ud)z=hg;else{z=xg;var S=yg}else p=d.nodeName,!p||p.toLowerCase()!=="input"||d.type!=="checkbox"&&d.type!=="radio"?l&&Ml(l.elementType)&&(z=Qf):z=gg;if(z&&(z=z(e,l))){Bd(x,z,n,m);break e}S&&S(e,d,l),e==="focusout"&&l&&d.type==="number"&&l.memoizedProps.value!=null&&Cc(d,"number",d.value)}switch(S=l?vu(l):window,e){case"focusin":(Zf(S)||S.contentEditable==="true")&&(sr=S,Lc=l,Eu=null);break;case"focusout":Eu=Lc=sr=null;break;case"mousedown":Nc=!0;break;case"contextmenu":case"mouseup":case"dragend":Nc=!1,em(x,n,m);break;case"selectionchange":if(Tg)break;case"keydown":case"keyup":em(x,n,m)}var E;if(Rl)e:{switch(e){case"compositionstart":var A="onCompositionStart";break e;case"compositionend":A="onCompositionEnd";break e;case"compositionupdate":A="onCompositionUpdate";break e}A=void 0}else lr?Gd(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(Rd&&n.locale!=="ko"&&(lr||A!=="onCompositionStart"?A==="onCompositionEnd"&&lr&&(E=zd()):(Zt=m,Al="value"in Zt?Zt.value:Zt.textContent,lr=!0)),S=Bo(l,A),0<S.length&&(A=new jf(A,e,null,n,m),x.push({event:A,listeners:S}),E?A.data=E:(E=_d(n),E!==null&&(A.data=E)))),(E=sg?fg(e,n):mg(e,n))&&(A=Bo(l,"onBeforeInput"),0<A.length&&(S=new jf("onBeforeInput","beforeinput",null,n,m),x.push({event:S,listeners:A}),S.data=E)),r2(x,e,l,n,m)}A0(x,t)})}function ju(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Bo(e,t){for(var n=t+"Capture",r=[];e!==null;){var u=e,i=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||i===null||(u=Du(e,n),u!=null&&r.unshift(ju(e,u,i)),u=Du(e,t),u!=null&&r.push(ju(e,u,i))),e.tag===3)return r;e=e.return}return[]}function i2(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Lm(e,t,n,r,u){for(var i=t._reactName,o=[];n!==null&&n!==r;){var a=n,c=a.alternate,l=a.stateNode;if(a=a.tag,c!==null&&c===r)break;a!==5&&a!==26&&a!==27||l===null||(c=l,u?(l=Du(n,i),l!=null&&o.unshift(ju(n,l,c))):u||(l=Du(n,i),l!=null&&o.push(ju(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var o2=/\r\n?/g,a2=/\u0000|\uFFFD/g;function Nm(e){return(typeof e=="string"?e:""+e).replace(o2,`
`).replace(a2,"")}function R0(e,t){return t=Nm(t),Nm(e)===t}function P(e,t,n,r,u,i){switch(n){case"children":typeof r=="string"?t==="body"||t==="textarea"&&r===""||wr(e,r):(typeof r=="number"||typeof r=="bigint")&&t!=="body"&&wr(e,""+r);break;case"className":Oi(e,"class",r);break;case"tabIndex":Oi(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Oi(e,n,r);break;case"style":wd(e,r,i);break;case"data":if(t!=="object"){Oi(e,"data",r);break}case"src":case"href":if(r===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(n);break}r=Zi(""+r),e.setAttribute(n,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&P(e,t,"name",u.name,u,null),P(e,t,"formEncType",u.formEncType,u,null),P(e,t,"formMethod",u.formMethod,u,null),P(e,t,"formTarget",u.formTarget,u,null)):(P(e,t,"encType",u.encType,u,null),P(e,t,"method",u.method,u,null),P(e,t,"target",u.target,u,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(n);break}r=Zi(""+r),e.setAttribute(n,r);break;case"onClick":r!=null&&(e.onclick=wt);break;case"onScroll":r!=null&&B("scroll",e);break;case"onScrollEnd":r!=null&&B("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(h(61));if(n=r.__html,n!=null){if(u.children!=null)throw Error(h(60));e.innerHTML=n}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}n=Zi(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(n,""+r):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":r===!0?e.setAttribute(n,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(n,r):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case"popover":B("beforetoggle",e),B("toggle",e),Wi(e,"popover",r);break;case"xlinkActuate":ht(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":ht(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":ht(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":ht(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":ht(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":ht(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":ht(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":ht(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":ht(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Wi(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=kx.get(n)||n,Wi(e,n,r))}}function ll(e,t,n,r,u,i){switch(n){case"style":wd(e,r,i);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(h(61));if(n=r.__html,n!=null){if(u.children!=null)throw Error(h(60));e.innerHTML=n}}break;case"children":typeof r=="string"?wr(e,r):(typeof r=="number"||typeof r=="bigint")&&wr(e,""+r);break;case"onScroll":r!=null&&B("scroll",e);break;case"onScrollEnd":r!=null&&B("scrollend",e);break;case"onClick":r!=null&&(e.onclick=wt);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Td.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(u=n.endsWith("Capture"),t=n.slice(2,u?n.length-7:void 0),i=e[Ue]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,u),typeof r=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,u);break e}n in e?e[n]=r:r===!0?e.setAttribute(n,""):Wi(e,n,r)}}}function ve(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":B("error",e),B("load",e);var r=!1,u=!1,i;for(i in n)if(n.hasOwnProperty(i)){var o=n[i];if(o!=null)switch(i){case"src":r=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(h(137,t));default:P(e,t,i,o,n,null)}}u&&P(e,t,"srcSet",n.srcSet,n,null),r&&P(e,t,"src",n.src,n,null);return;case"input":B("invalid",e);var a=i=o=u=null,c=null,l=null;for(r in n)if(n.hasOwnProperty(r)){var m=n[r];if(m!=null)switch(r){case"name":u=m;break;case"type":o=m;break;case"checked":c=m;break;case"defaultChecked":l=m;break;case"value":i=m;break;case"defaultValue":a=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(h(137,t));break;default:P(e,t,r,m,n,null)}}Vd(e,i,a,c,l,o,u,!1);return;case"select":B("invalid",e),r=o=i=null;for(u in n)if(n.hasOwnProperty(u)&&(a=n[u],a!=null))switch(u){case"value":i=a;break;case"defaultValue":o=a;break;case"multiple":r=a;default:P(e,t,u,a,n,null)}t=i,n=o,e.multiple=!!r,t!=null?hr(e,!!r,t,!1):n!=null&&hr(e,!!r,n,!0);return;case"textarea":B("invalid",e),i=u=r=null;for(o in n)if(n.hasOwnProperty(o)&&(a=n[o],a!=null))switch(o){case"value":r=a;break;case"defaultValue":u=a;break;case"children":i=a;break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(h(91));break;default:P(e,t,o,a,n,null)}Md(e,r,u,i);return;case"option":for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null)&&(c==="selected"?e.selected=r&&typeof r!="function"&&typeof r!="symbol":P(e,t,c,r,n,null));return;case"dialog":B("beforetoggle",e),B("toggle",e),B("cancel",e),B("close",e);break;case"iframe":case"object":B("load",e);break;case"video":case"audio":for(r=0;r<Ku.length;r++)B(Ku[r],e);break;case"image":B("error",e),B("load",e);break;case"details":B("toggle",e);break;case"embed":case"source":case"link":B("error",e),B("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case"children":case"dangerouslySetInnerHTML":throw Error(h(137,t));default:P(e,t,l,r,n,null)}return;default:if(Ml(t)){for(m in n)n.hasOwnProperty(m)&&(r=n[m],r!==void 0&&ll(e,t,m,r,n,void 0));return}}for(a in n)n.hasOwnProperty(a)&&(r=n[a],r!=null&&P(e,t,a,r,n,null))}function c2(e,t,n,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,i=null,o=null,a=null,c=null,l=null,m=null;for(p in n){var x=n[p];if(n.hasOwnProperty(p)&&x!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":c=x;default:r.hasOwnProperty(p)||P(e,t,p,null,r,x)}}for(var d in r){var p=r[d];if(x=n[d],r.hasOwnProperty(d)&&(p!=null||x!=null))switch(d){case"type":i=p;break;case"name":u=p;break;case"checked":l=p;break;case"defaultChecked":m=p;break;case"value":o=p;break;case"defaultValue":a=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(h(137,t));break;default:p!==x&&P(e,t,d,p,r,x)}}Oc(e,o,a,c,l,m,i,u);return;case"select":p=o=a=d=null;for(i in n)if(c=n[i],n.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":p=c;default:r.hasOwnProperty(i)||P(e,t,i,null,r,c)}for(u in r)if(i=r[u],c=n[u],r.hasOwnProperty(u)&&(i!=null||c!=null))switch(u){case"value":d=i;break;case"defaultValue":a=i;break;case"multiple":o=i;default:i!==c&&P(e,t,u,i,r,c)}t=a,n=o,r=p,d!=null?hr(e,!!n,d,!1):!!r!=!!n&&(t!=null?hr(e,!!n,t,!0):hr(e,!!n,n?[]:"",!1));return;case"textarea":p=d=null;for(a in n)if(u=n[a],n.hasOwnProperty(a)&&u!=null&&!r.hasOwnProperty(a))switch(a){case"value":break;case"children":break;default:P(e,t,a,null,r,u)}for(o in r)if(u=r[o],i=n[o],r.hasOwnProperty(o)&&(u!=null||i!=null))switch(o){case"value":d=u;break;case"defaultValue":p=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(h(91));break;default:u!==i&&P(e,t,o,u,r,i)}Ed(e,d,p);return;case"option":for(var v in n)d=n[v],n.hasOwnProperty(v)&&d!=null&&!r.hasOwnProperty(v)&&(v==="selected"?e.selected=!1:P(e,t,v,null,r,d));for(c in r)d=r[c],p=n[c],r.hasOwnProperty(c)&&d!==p&&(d!=null||p!=null)&&(c==="selected"?e.selected=d&&typeof d!="function"&&typeof d!="symbol":P(e,t,c,d,r,p));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var T in n)d=n[T],n.hasOwnProperty(T)&&d!=null&&!r.hasOwnProperty(T)&&P(e,t,T,null,r,d);for(l in r)if(d=r[l],p=n[l],r.hasOwnProperty(l)&&d!==p&&(d!=null||p!=null))switch(l){case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(h(137,t));break;default:P(e,t,l,d,r,p)}return;default:if(Ml(t)){for(var V in n)d=n[V],n.hasOwnProperty(V)&&d!==void 0&&!r.hasOwnProperty(V)&&ll(e,t,V,void 0,r,d);for(m in r)d=r[m],p=n[m],!r.hasOwnProperty(m)||d===p||d===void 0&&p===void 0||ll(e,t,m,d,r,p);return}}for(var f in n)d=n[f],n.hasOwnProperty(f)&&d!=null&&!r.hasOwnProperty(f)&&P(e,t,f,null,r,d);for(x in r)d=r[x],p=n[x],!r.hasOwnProperty(x)||d===p||d==null&&p==null||P(e,t,x,d,r,p)}function Pm(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function l2(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),r=0;r<n.length;r++){var u=n[r],i=u.transferSize,o=u.initiatorType,a=u.duration;if(i&&a&&Pm(o)){for(o=0,a=u.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>a)break;var m=c.transferSize,x=c.initiatorType;m&&Pm(x)&&(c=c.responseEnd,o+=m*(c<a?1:(a-l)/(c-l)))}if(--r,t+=8*(i+o)/(u.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var sl=null,fl=null;function Uo(e){return e.nodeType===9?e:e.ownerDocument}function Fm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function G0(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ml(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var bc=null;function s2(){var e=window.event;return e&&e.type==="popstate"?e===bc?!1:(bc=e,!0):(bc=null,!1)}var _0=typeof setTimeout=="function"?setTimeout:void 0,f2=typeof clearTimeout=="function"?clearTimeout:void 0,Xm=typeof Promise=="function"?Promise:void 0,m2=typeof queueMicrotask=="function"?queueMicrotask:typeof Xm<"u"?function(e){return Xm.resolve(null).then(e).catch(d2)}:_0;function d2(e){setTimeout(function(){throw e})}function pn(e){return e==="head"}function qm(e,t){var n=t,r=0;do{var u=n.nextSibling;if(e.removeChild(n),u&&u.nodeType===8)if(n=u.data,n==="/$"||n==="/&"){if(r===0){e.removeChild(u),Or(t);return}r--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")r++;else if(n==="html")Ou(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Ou(n);for(var i=n.firstChild;i;){var o=i.nextSibling,a=i.nodeName;i[Ju]||a==="SCRIPT"||a==="STYLE"||a==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=o}}else n==="body"&&Ou(e.ownerDocument.body);n=u}while(n);Or(t)}function Km(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=r}while(n)}function dl(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":dl(n),El(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function p2(e,t,n,r){for(;e.nodeType===1;){var u=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[Ju])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=tt(e.nextSibling),e===null)break}return null}function y2(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=tt(e.nextSibling),e===null))return null;return e}function B0(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=tt(e.nextSibling),e===null))return null;return e}function pl(e){return e.data==="$?"||e.data==="$~"}function yl(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function x2(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var r=function(){t(),n.removeEventListener("DOMContentLoaded",r)};n.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var xl=null;function jm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return tt(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Hm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function U0(e,t,n){switch(t=Uo(n),e){case"html":if(e=t.documentElement,!e)throw Error(h(452));return e;case"head":if(e=t.head,!e)throw Error(h(453));return e;case"body":if(e=t.body,!e)throw Error(h(454));return e;default:throw Error(h(451))}}function Ou(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);El(e)}var nt=new Map,Ym=new Set;function Oo(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Dt=k.d;k.d={f:g2,r:h2,D:v2,C:T2,L:S2,m:b2,X:E2,S:V2,M:M2};function g2(){var e=Dt.f(),t=Io();return e||t}function h2(e){var t=Dr(e);t!==null&&t.tag===5&&t.type==="form"?wp(t):Dt.r(e)}var Pr=typeof document>"u"?null:document;function O0(e,t,n){var r=Pr;if(r&&typeof t=="string"&&t){var u=Ie(t);u='link[rel="'+e+'"][href="'+u+'"]',typeof n=="string"&&(u+='[crossorigin="'+n+'"]'),Ym.has(u)||(Ym.add(u),e={rel:e,crossOrigin:n,href:t},r.querySelector(u)===null&&(t=r.createElement("link"),ve(t,"link",e),de(t),r.head.appendChild(t)))}}function v2(e){Dt.D(e),O0("dns-prefetch",e,null)}function T2(e,t){Dt.C(e,t),O0("preconnect",e,t)}function S2(e,t,n){Dt.L(e,t,n);var r=Pr;if(r&&e&&t){var u='link[rel="preload"][as="'+Ie(t)+'"]';t==="image"&&n&&n.imageSrcSet?(u+='[imagesrcset="'+Ie(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(u+='[imagesizes="'+Ie(n.imageSizes)+'"]')):u+='[href="'+Ie(e)+'"]';var i=u;switch(t){case"style":i=Ur(e);break;case"script":i=Fr(e)}nt.has(i)||(e=W({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),nt.set(i,e),r.querySelector(u)!==null||t==="style"&&r.querySelector(ii(i))||t==="script"&&r.querySelector(oi(i))||(t=r.createElement("link"),ve(t,"link",e),de(t),r.head.appendChild(t)))}}function b2(e,t){Dt.m(e,t);var n=Pr;if(n&&e){var r=t&&typeof t.as=="string"?t.as:"script",u='link[rel="modulepreload"][as="'+Ie(r)+'"][href="'+Ie(e)+'"]',i=u;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Fr(e)}if(!nt.has(i)&&(e=W({rel:"modulepreload",href:e},t),nt.set(i,e),n.querySelector(u)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(oi(i)))return}r=n.createElement("link"),ve(r,"link",e),de(r),n.head.appendChild(r)}}}function V2(e,t,n){Dt.S(e,t,n);var r=Pr;if(r&&e){var u=gr(r).hoistableStyles,i=Ur(e);t=t||"default";var o=u.get(i);if(!o){var a={loading:0,preload:null};if(o=r.querySelector(ii(i)))a.loading=5;else{e=W({rel:"stylesheet",href:e,"data-precedence":t},n),(n=nt.get(i))&&ls(e,n);var c=o=r.createElement("link");de(c),ve(c,"link",e),c._p=new Promise(function(l,m){c.onload=l,c.onerror=m}),c.addEventListener("load",function(){a.loading|=1}),c.addEventListener("error",function(){a.loading|=2}),a.loading|=4,io(o,t,r)}o={type:"stylesheet",instance:o,count:1,state:a},u.set(i,o)}}}function E2(e,t){Dt.X(e,t);var n=Pr;if(n&&e){var r=gr(n).hoistableScripts,u=Fr(e),i=r.get(u);i||(i=n.querySelector(oi(u)),i||(e=W({src:e,async:!0},t),(t=nt.get(u))&&ss(e,t),i=n.createElement("script"),de(i),ve(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(u,i))}}function M2(e,t){Dt.M(e,t);var n=Pr;if(n&&e){var r=gr(n).hoistableScripts,u=Fr(e),i=r.get(u);i||(i=n.querySelector(oi(u)),i||(e=W({src:e,async:!0,type:"module"},t),(t=nt.get(u))&&ss(e,t),i=n.createElement("script"),de(i),ve(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},r.set(u,i))}}function Wm(e,t,n,r){var u=(u=Jt.current)?Oo(u):null;if(!u)throw Error(h(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Ur(n.href),n=gr(u).hoistableStyles,r=n.get(t),r||(r={type:"style",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Ur(n.href);var i=gr(u).hoistableStyles,o=i.get(e);if(o||(u=u.ownerDocument||u,o={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,o),(i=u.querySelector(ii(e)))&&!i._p&&(o.instance=i,o.state.loading=5),nt.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},nt.set(e,n),i||w2(u,e,n,o.state))),t&&r===null)throw Error(h(528,""));return o}if(t&&r!==null)throw Error(h(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Fr(n),n=gr(u).hoistableScripts,r=n.get(t),r||(r={type:"script",instance:null,count:0,state:null},n.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(h(444,e))}}function Ur(e){return'href="'+Ie(e)+'"'}function ii(e){return'link[rel="stylesheet"]['+e+"]"}function C0(e){return W({},e,{"data-precedence":e.precedence,precedence:null})}function w2(e,t,n,r){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?r.loading=1:(t=e.createElement("link"),r.preload=t,t.addEventListener("load",function(){return r.loading|=1}),t.addEventListener("error",function(){return r.loading|=2}),ve(t,"link",n),de(t),e.head.appendChild(t))}function Fr(e){return'[src="'+Ie(e)+'"]'}function oi(e){return"script[async]"+e}function Zm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+Ie(n.href)+'"]');if(r)return t.instance=r,de(r),r;var u=W({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),de(r),ve(r,"style",u),io(r,n.precedence,e),t.instance=r;case"stylesheet":u=Ur(n.href);var i=e.querySelector(ii(u));if(i)return t.state.loading|=4,t.instance=i,de(i),i;r=C0(n),(u=nt.get(u))&&ls(r,u),i=(e.ownerDocument||e).createElement("link"),de(i);var o=i;return o._p=new Promise(function(a,c){o.onload=a,o.onerror=c}),ve(i,"link",r),t.state.loading|=4,io(i,n.precedence,e),t.instance=i;case"script":return i=Fr(n.src),(u=e.querySelector(oi(i)))?(t.instance=u,de(u),u):(r=n,(u=nt.get(i))&&(r=W({},n),ss(r,u)),e=e.ownerDocument||e,u=e.createElement("script"),de(u),ve(u,"link",r),e.head.appendChild(u),t.instance=u);case"void":return null;default:throw Error(h(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(r=t.instance,t.state.loading|=4,io(r,n.precedence,e));return t.instance}function io(e,t,n){for(var r=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=r.length?r[r.length-1]:null,i=u,o=0;o<r.length;o++){var a=r[o];if(a.dataset.precedence===t)i=a;else if(i!==u)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function ls(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ss(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var oo=null;function Qm(e,t,n){if(oo===null){var r=new Map,u=oo=new Map;u.set(n,r)}else u=oo,r=u.get(n),r||(r=new Map,u.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),u=0;u<n.length;u++){var i=n[u];if(!(i[Ju]||i[xe]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var o=i.getAttribute(t)||"";o=e+o;var a=r.get(o);a?a.push(i):r.set(o,[i])}}return r}function Im(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function A2(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function D0(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function z2(e,t,n,r){if(n.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var u=Ur(r.href),i=t.querySelector(ii(u));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Co.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,de(i);return}i=t.ownerDocument||t,r=C0(r),(u=nt.get(u))&&ls(r,u),i=i.createElement("link"),de(i);var o=i;o._p=new Promise(function(a,c){o.onload=a,o.onerror=c}),ve(i,"link",r),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Co.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Vc=0;function R2(e,t){return e.stylesheets&&e.count===0&&ao(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ao(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&Vc===0&&(Vc=62500*l2());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ao(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>Vc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(u)}}:null}function Co(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ao(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Do=null;function ao(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Do=new Map,t.forEach(G2,e),Do=null,Co.call(e))}function G2(e,t){if(!(t.state.loading&4)){var n=Do.get(e);if(n)var r=n.get(null);else{n=new Map,Do.set(e,n);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<u.length;i++){var o=u[i];(o.nodeName==="LINK"||o.getAttribute("media")!=="not all")&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}u=t.instance,o=u.getAttribute("data-precedence"),i=n.get(o)||r,i===r&&n.set(null,u),n.set(o,u),this.count++,r=Co.bind(this),u.addEventListener("load",r),u.addEventListener("error",r),i?i.parentNode.insertBefore(u,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),t.state.loading|=4}}var Hu={$$typeof:Mt,Provider:null,Consumer:null,_currentValue:Mn,_currentValue2:Mn,_threadCount:0};function _2(e,t,n,r,u,i,o,a,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Za(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Za(0),this.hiddenUpdates=Za(null),this.identifierPrefix=r,this.onUncaughtError=u,this.onCaughtError=i,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function k0(e,t,n,r,u,i,o,a,c,l,m,x){return e=new _2(e,t,n,o,c,l,m,x,a),t=1,i===!0&&(t|=24),i=ke(3,null,null,t),e.current=i,i.stateNode=e,t=Dl(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:r,isDehydrated:n,cache:t},Nl(i),e}function L0(e){return e?(e=dr,e):dr}function N0(e,t,n,r,u,i){u=L0(u),r.context===null?r.context=u:r.pendingContext=u,r=tn(t),r.payload={element:n},i=i===void 0?null:i,i!==null&&(r.callback=i),n=nn(e,r,t),n!==null&&(Be(n,e,t),wu(n,e,t))}function $m(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function fs(e,t){$m(e,t),(e=e.alternate)&&$m(e,t)}function P0(e){if(e.tag===13||e.tag===31){var t=Ln(e,67108864);t!==null&&Be(t,e,67108864),fs(e,67108864)}}function Jm(e){if(e.tag===13||e.tag===31){var t=Xe();t=bl(t);var n=Ln(e,t);n!==null&&Be(n,e,t),fs(e,t)}}var ko=!0;function B2(e,t,n,r){var u=M.T;M.T=null;var i=k.p;try{k.p=2,ms(e,t,n,r)}finally{k.p=i,M.T=u}}function U2(e,t,n,r){var u=M.T;M.T=null;var i=k.p;try{k.p=8,ms(e,t,n,r)}finally{k.p=i,M.T=u}}function ms(e,t,n,r){if(ko){var u=gl(r);if(u===null)Sc(e,t,r,Lo,n),ed(e,r);else if(C2(u,e,t,n,r))r.stopPropagation();else if(ed(e,r),t&4&&-1<O2.indexOf(e)){for(;u!==null;){var i=Dr(u);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var o=bn(i.pendingLanes);if(o!==0){var a=i;for(a.pendingLanes|=2,a.entangledLanes|=2;o;){var c=1<<31-Fe(o);a.entanglements[1]|=c,o&=~c}dt(i),(D&6)===0&&(Ao=Ne()+500,ui(0,!1))}}break;case 31:case 13:a=Ln(i,2),a!==null&&Be(a,i,2),Io(),fs(i,2)}if(i=gl(r),i===null&&Sc(e,t,r,Lo,n),i===u)break;u=i}u!==null&&r.stopPropagation()}else Sc(e,t,r,null,n)}}function gl(e){return e=wl(e),ds(e)}var Lo=null;function ds(e){if(Lo=null,e=ar(e),e!==null){var t=Zu(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=od(t),e!==null)return e;e=null}else if(n===31){if(e=ad(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Lo=e,null}function F0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Sx()){case fd:return 2;case md:return 8;case mo:case bx:return 32;case dd:return 268435456;default:return 32}default:return 32}}var hl=!1,on=null,an=null,cn=null,Yu=new Map,Wu=new Map,Yt=[],O2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ed(e,t){switch(e){case"focusin":case"focusout":on=null;break;case"dragenter":case"dragleave":an=null;break;case"mouseover":case"mouseout":cn=null;break;case"pointerover":case"pointerout":Yu.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wu.delete(t.pointerId)}}function yu(e,t,n,r,u,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[u]},t!==null&&(t=Dr(t),t!==null&&P0(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,u!==null&&t.indexOf(u)===-1&&t.push(u),e)}function C2(e,t,n,r,u){switch(t){case"focusin":return on=yu(on,e,t,n,r,u),!0;case"dragenter":return an=yu(an,e,t,n,r,u),!0;case"mouseover":return cn=yu(cn,e,t,n,r,u),!0;case"pointerover":var i=u.pointerId;return Yu.set(i,yu(Yu.get(i)||null,e,t,n,r,u)),!0;case"gotpointercapture":return i=u.pointerId,Wu.set(i,yu(Wu.get(i)||null,e,t,n,r,u)),!0}return!1}function X0(e){var t=ar(e.target);if(t!==null){var n=Zu(t);if(n!==null){if(t=n.tag,t===13){if(t=od(n),t!==null){e.blockedOn=t,kf(e.priority,function(){Jm(n)});return}}else if(t===31){if(t=ad(n),t!==null){e.blockedOn=t,kf(e.priority,function(){Jm(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function co(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=gl(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Dc=r,n.target.dispatchEvent(r),Dc=null}else return t=Dr(n),t!==null&&P0(t),e.blockedOn=n,!1;t.shift()}return!0}function td(e,t,n){co(e)&&n.delete(t)}function D2(){hl=!1,on!==null&&co(on)&&(on=null),an!==null&&co(an)&&(an=null),cn!==null&&co(cn)&&(cn=null),Yu.forEach(td),Wu.forEach(td)}function Hi(e,t){e.blockedOn===t&&(e.blockedOn=null,hl||(hl=!0,se.unstable_scheduleCallback(se.unstable_NormalPriority,D2)))}var Yi=null;function nd(e){Yi!==e&&(Yi=e,se.unstable_scheduleCallback(se.unstable_NormalPriority,function(){Yi===e&&(Yi=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],u=e[t+2];if(typeof r!="function"){if(ds(r||n)===null)continue;break}var i=Dr(n);i!==null&&(e.splice(t,3),t-=3,$c(i,{pending:!0,data:u,method:n.method,action:r},r,u))}}))}function Or(e){function t(c){return Hi(c,e)}on!==null&&Hi(on,e),an!==null&&Hi(an,e),cn!==null&&Hi(cn,e),Yu.forEach(t),Wu.forEach(t);for(var n=0;n<Yt.length;n++){var r=Yt[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Yt.length&&(n=Yt[0],n.blockedOn===null);)X0(n),n.blockedOn===null&&Yt.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var u=n[r],i=n[r+1],o=u[Ue]||null;if(typeof i=="function")o||nd(n);else if(o){var a=null;if(i&&i.hasAttribute("formAction")){if(u=i,o=i[Ue]||null)a=o.formAction;else if(ds(u)!==null)continue}else a=o.action;typeof a=="function"?n[r+1]=a:(n.splice(r,3),r-=3),nd(n)}}}function q0(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(o){return u=o})},focusReset:"manual",scroll:"manual"})}function t(){u!==null&&(u(),u=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),u!==null&&(u(),u=null)}}}function ps(e){this._internalRoot=e}ea.prototype.render=ps.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(h(409));var n=t.current,r=Xe();N0(n,r,e,t,null,null)};ea.prototype.unmount=ps.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;N0(e.current,2,null,e,null,null),Io(),t[Cr]=null}};function ea(e){this._internalRoot=e}ea.prototype.unstable_scheduleHydration=function(e){if(e){var t=hd();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Yt.length&&t!==0&&t<Yt[n].priority;n++);Yt.splice(n,0,e),n===0&&X0(e)}};var rd=ud.version;if(rd!=="19.2.4")throw Error(h(527,rd,"19.2.4"));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(h(188)):(e=Object.keys(e).join(","),Error(h(268,e)));return e=px(t),e=e!==null?cd(e):null,e=e===null?null:e.stateNode,e};var k2={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:M,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(xu=__REACT_DEVTOOLS_GLOBAL_HOOK__,!xu.isDisabled&&xu.supportsFiber))try{Qu=xu.inject(k2),Pe=xu}catch{}var xu;ta.createRoot=function(e,t){if(!id(e))throw Error(h(299));var n=!1,r="",u=Op,i=Cp,o=Dp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(u=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=k0(e,1,!1,null,null,n,r,null,u,i,o,q0),e[Cr]=t.current,cs(e),new ps(t)};ta.hydrateRoot=function(e,t,n){if(!id(e))throw Error(h(299));var r=!1,u="",i=Op,o=Cp,a=Dp,c=null;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(u=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(o=n.onCaughtError),n.onRecoverableError!==void 0&&(a=n.onRecoverableError),n.formState!==void 0&&(c=n.formState)),t=k0(e,1,!0,t,n??null,r,u,c,i,o,a,q0),t.context=L0(null),n=t.current,r=Xe(),r=bl(r),u=tn(r),u.callback=null,nn(n,u,r),n=r,t.current.lanes=n,$u(t,n),dt(t),e[Cr]=t.current,cs(e),new ea(t)};ta.version="19.2.4"});var ys=K((iS,H0)=>{"use strict";function j0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(j0)}catch(e){console.error(e)}}j0(),H0.exports=K0()});function si(e,t){let n=[],r=t.limits.reduce((a,c)=>Math.max(a,c.duration),0),u=[],i=new Set;setInterval(()=>{for(;;){let a=n.at(0);if(!a)return;let c=Date.now();if(u=u.filter(m=>(c-m.time)/1e3<=r),i.size>=t.maxConcurrentRequests)return;for(let m of t.limits){let x=0;for(let d of u)(c-d.time)/1e3<=m.duration&&x++;if(x>=m.maxRequests)return}n.shift(),u.push({time:Date.now()});let l=e(...a.params);i.add(l),(async()=>{let m=await l;a.callback(m),i.delete(l)})()}});let o=(...a)=>new Promise((c,l)=>{n.push({params:a,callback:m=>{c(m)}})});return o._throttled=!0,o}function fe(e){let t=[];for(let n=0;n<e&&n<1e7;n++)t.push(n);return t}function v1(e,t){let n=-1/0,r=e[0];for(let u of e){let i=t(u);i>n&&(r=u,n=i)}return r}function Vs(e,t){return v1(e,n=>-t(n))}function tu(e,t,n){return t*(1-e)+n*e}function jn(e,t,n){return Math.max(Math.min(e,n),t)}function V1(e,t){return new Map(e.map(n=>[n,t(n)]))}function nu(e,t){return E1(V1(e,t))}function kt(e,t){return ma(e,(n,r)=>[n,t(n,r)])}function ma(e,t){return Object.fromEntries(Object.entries(e).map(([n,r])=>t(n,r)))}function E1(e){return Object.fromEntries(e.entries())}var fi=class e{maps;constructor(){this.maps=new Map}nthMap(t){let n=this.maps.get(t);if(!n)if(t!==0)n=new Map,this.maps.set(t,n);else return;return n}get(t){let n=this.nthMap(t.length);for(let r of t)if(n=n.get(r),!n)return;return n}has(t){if(t.length===0)return this.maps.has(0);let n=this.nthMap(t.length);for(let r of t)if(n=n.get(r),!n)return!1;return!0}delete(t){if(t.length===0){let u=this.maps.get(0);return this.maps.delete(0),u}let n=this.nthMap(t.length);for(let u of t.slice(0,-1))if(n=n.get(u),!n)return;let r=n.get(t.at(-1));return n.delete(t.at(-1)),r}change(t,n){if(t.length===0){this.maps.set(0,n(this.maps.get(0)));return}let r=this.nthMap(t.length);for(let u of t.slice(0,-1)){let i=r;r=r.get(u),r||(r=new Map,i.set(u,r))}r.set(t.at(-1),n(r.get(t.at(-1))))}set(t,n){this.change(t,()=>n)}forEach(t){let n=(r,u,i)=>{if(r===0)t(i,u);else for(let[o,a]of u)n(r-1,u,i.concat(o))};for(let[r,u]of this.maps)n(r,u,[])}serialize(){let t=[];return this.forEach((n,r)=>t.push([n,r])),t}static fromSerialized(t){let n=new e;for(let[r,u]of t)n.set(r,u);return n}};function ru(e,t){t||(t=u=>u);let n=new fi,r=(...u)=>{let i=t(u);if(n.has(i))return n.get(i);let a=e(...u);return n.set(i,a),a};return r.invalidate=(...u)=>{n.delete(t(u))},r.getCache=()=>n,r}var pv={unitQuadSigned:{src:`const UNIT_QUAD_SIGNED = array(
    vec2( 1.0,  1.0),
    vec2( 1.0, -1.0),
    vec2(-1.0, -1.0),
    vec2( 1.0,  1.0),
    vec2(-1.0, -1.0),
    vec2(-1.0,  1.0),
);`},unitQuadUnsigned:{src:`const UNIT_QUAD_UNSIGNED = array(
    vec2(1.0, 0.0),
    vec2(1.0, 1.0),
    vec2(0.0, 1.0),
    vec2(1.0, 0.0),
    vec2(0.0, 1.0),
    vec2(0.0, 0.0),
);`},logistic:{src:`fn logistic(x: f32) -> f32 {
  return 1.0 / (1.0 + exp(-x)); 
}`},DITHER256_THRESHOLDS:{src:`array<f32, 256>(
  0,
  128,
  32,
  160,
  8,
  136,
  40,
  168,
  2,
  130,
  34,
  162,
  10,
  138,
  42,
  170,
  192,
  64,
  224,
  96,
  200,
  72,
  232,
  104,
  194,
  66,
  226,
  98,
  202,
  74,
  234,
  106,
  48,
  176,
  16,
  144,
  56,
  184,
  24,
  152,
  50,
  178,
  18,
  146,
  58,
  186,
  26,
  154,
  240,
  112,
  208,
  80,
  248,
  120,
  216,
  88,
  242,
  114,
  210,
  82,
  250,
  122,
  218,
  90,
  12,
  140,
  44,
  172,
  4,
  132,
  36,
  164,
  14,
  142,
  46,
  174,
  6,
  134,
  38,
  166,
  204,
  76,
  236,
  108,
  196,
  68,
  228,
  100,
  206,
  78,
  238,
  110,
  198,
  70,
  230,
  102,
  60,
  188,
  28,
  156,
  52,
  180,
  20,
  148,
  62,
  190,
  30,
  158,
  54,
  182,
  22,
  150,
  252,
  124,
  220,
  92,
  244,
  116,
  212,
  84,
  254,
  126,
  222,
  94,
  246,
  118,
  214,
  86,
  3,
  131,
  35,
  163,
  11,
  139,
  43,
  171,
  1,
  129,
  33,
  161,
  9,
  137,
  41,
  169,
  195,
  67,
  227,
  99,
  203,
  75,
  235,
  107,
  193,
  65,
  225,
  97,
  201,
  73,
  233,
  105,
  51,
  179,
  19,
  147,
  59,
  187,
  27,
  155,
  49,
  177,
  17,
  145,
  57,
  185,
  25,
  153,
  243,
  115,
  211,
  83,
  251,
  123,
  219,
  91,
  241,
  113,
  209,
  81,
  249,
  121,
  217,
  89,
  15,
  143,
  47,
  175,
  7,
  135,
  39,
  167,
  13,
  141,
  45,
  173,
  5,
  133,
  37,
  165,
  207,
  79,
  239,
  111,
  199,
  71,
  231,
  103,
  205,
  77,
  237,
  109,
  197,
  69,
  229,
  101,
  63,
  191,
  31,
  159,
  55,
  183,
  23,
  151,
  61,
  189,
  29,
  157,
  53,
  181,
  21,
  149,
  255,
  127,
  223,
  95,
  247,
  119,
  215,
  87,
  253,
  125,
  221,
  93,
  245,
  117,
  213,
  85
)}`},dither256:{src:`fn dither256(factor: f32, coord: vec2i) -> bool {
  let x = coord.x % 16;
  let y = coord.y % 16;
  let threshold = DITHER256_THRESHOLDS[y * 16 + x] / 256.0;
  return factor > threshold ;
}`,deps:["DITHER256_THRESHOLDS"]},hash:{src:`// https://www.pcg-random.org/
fn hash11(n: u32) -> u32 {
    var h = n * 747796405u + 2891336453u;
    h = ((h >> ((h >> 28u) + 4u)) ^ h) * 277803737u;
    return (h >> 22u) ^ h;
}

fn hash22(p: vec2u) -> vec2u {
    var v = p * 1664525u + 1013904223u;
    v.x += v.y * 1664525u; v.y += v.x * 1664525u;
    v ^= v >> vec2u(16u);
    v.x += v.y * 1664525u; v.y += v.x * 1664525u;
    v ^= v >> vec2u(16u);
    return v;
}

// http://www.jcgt.org/published/0009/03/02/
fn hash33(p: vec3u) -> vec3u {
    var v = p * 1664525u + 1013904223u;
    v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
    v ^= v >> vec3u(16u);
    v.x += v.y*v.z; v.y += v.z*v.x; v.z += v.x*v.y;
    return v;
}

// http://www.jcgt.org/published/0009/03/02/
fn hash44(p: vec4u) -> vec4u {
    var v = p * 1664525u + 1013904223u;
    v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
    v ^= v >> vec4u(16u);
    v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
    return v;
}`},rand:{src:`fn rand11(f: f32) -> f32 { return f32(hash11(bitcast<u32>(f))) / f32(0xffffffff); }
fn rand22(f: vec2f) -> vec2f { return vec2f(hash22(bitcast<vec2u>(f))) / f32(0xffffffff); }
fn rand33(f: vec3f) -> vec3f { return vec3f(hash33(bitcast<vec3u>(f))) / f32(0xffffffff); }
fn rand44(f: vec4f) -> vec4f { return vec4f(hash44(bitcast<vec4u>(f))) / f32(0xffffffff); }`,deps:["hash"]},valueNoise:{src:`
   // WTFPL License
fn noise(p: f32) -> f32 {
    let fl = floor(p);
    return mix(rand11(fl), rand11(fl + 1.), fract(p));
}
    
// WTFPL License
fn noise2(n: vec2f) -> f32 {
    let d = vec2f(0., 1.);
    let b = floor(n);
    let f = smoothStep(vec2f(0.), vec2f(1.), fract(n));
    return mix(mix(rand22(b), rand22(b + d.yx), f.x), mix(rand22(b + d.xy), rand22(b + d.yy), f.x), f.y);
}

// MIT License. \xA9 Stefan Gustavson, Munrocket
//
fn mod289(x: vec4f) -> vec4f { return x - floor(x * (1. / 289.)) * 289.; }
fn perm4(x: vec4f) -> vec4f { return mod289(((x * 34.) + 1.) * x); }

fn noise3(p: vec3f) -> f32 {
    let a = floor(p);
    var d: vec3f = p - a;
    d = d * d * (3. - 2. * d);

    let b = a.xxyy + vec4f(0., 1., 0., 1.);
    let k1 = perm4(b.xyxy);
    let k2 = perm4(k1.xyxy + b.zzww);

    let c = k2 + a.zzzz;
    let k3 = perm4(c);
    let k4 = perm4(c + 1.);

    let o1 = fract(k3 * (1. / 41.));
    let o2 = fract(k4 * (1. / 41.));

    let o3 = o2 * d.z + o1 * (1. - d.z);
    let o4 = o3.yw * d.x + o3.xz * (1. - d.x);

    return o4.y * d.y + o4.x * (1. - d.y);
}
    `,deps:["rand"]},permute4:{src:`
fn permute4(x: vec4f) -> vec4f { return ((x * 34. + 1.) * x) % vec4f(289.); }
    `},perlinNoise:{src:`
   // MIT License. \xA9 Stefan Gustavson, Munrocket
fn fade2(t: vec2f) -> vec2f { return t * t * t * (t * (t * 6. - 15.) + 10.); }

fn perlinNoise2(P: vec2f) -> f32 {
    var Pi: vec4f = floor(P.xyxy) + vec4f(0., 0., 1., 1.);
    let Pf = fract(P.xyxy) - vec4f(0., 0., 1., 1.);
    Pi = Pi % vec4f(289.); // To avoid truncation effects in permutation
    let ix = Pi.xzxz;
    let iy = Pi.yyww;
    let fx = Pf.xzxz;
    let fy = Pf.yyww;
    let i = permute4(permute4(ix) + iy);
    var gx: vec4f = 2. * fract(i * 0.0243902439) - 1.; // 1/41 = 0.024...
    let gy = abs(gx) - 0.5;
    let tx = floor(gx + 0.5);
    gx = gx - tx;
    var g00: vec2f = vec2f(gx.x, gy.x);
    var g10: vec2f = vec2f(gx.y, gy.y);
    var g01: vec2f = vec2f(gx.z, gy.z);
    var g11: vec2f = vec2f(gx.w, gy.w);
    let norm = 1.79284291400159 - 0.85373472095314 *
        vec4f(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 = g00 * norm.x;
    g01 = g01 * norm.y;
    g10 = g10 * norm.z;
    g11 = g11 * norm.w;
    let n00 = dot(g00, vec2f(fx.x, fy.x));
    let n10 = dot(g10, vec2f(fx.y, fy.y));
    let n01 = dot(g01, vec2f(fx.z, fy.z));
    let n11 = dot(g11, vec2f(fx.w, fy.w));
    let fade_xy = fade2(Pf.xy);
    let n_x = mix(vec2f(n00, n01), vec2f(n10, n11), vec2f(fade_xy.x));
    let n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}
    
// MIT License. \xA9 Stefan Gustavson, Munrocket
fn taylorInvSqrt4(r: vec4f) -> vec4f { return 1.79284291400159 - 0.85373472095314 * r; }
fn fade3(t: vec3f) -> vec3f { return t * t * t * (t * (t * 6. - 15.) + 10.); }

fn perlinNoise3(P: vec3f) -> f32 {
    var Pi0 : vec3f = floor(P); // Integer part for indexing
    var Pi1 : vec3f = Pi0 + vec3f(1.); // Integer part + 1
    Pi0 = Pi0 % vec3f(289.);
    Pi1 = Pi1 % vec3f(289.);
    let Pf0 = fract(P); // Fractional part for interpolation
    let Pf1 = Pf0 - vec3f(1.); // Fractional part - 1.
    let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    let iy = vec4f(Pi0.yy, Pi1.yy);
    let iz0 = Pi0.zzzz;
    let iz1 = Pi1.zzzz;

    let ixy = permute4(permute4(ix) + iy);
    let ixy0 = permute4(ixy + iz0);
    let ixy1 = permute4(ixy + iz1);

    var gx0: vec4f = ixy0 / 7.;
    var gy0: vec4f = fract(floor(gx0) / 7.) - 0.5;
    gx0 = fract(gx0);
    var gz0: vec4f = vec4f(0.5) - abs(gx0) - abs(gy0);
    var sz0: vec4f = step(gz0, vec4f(0.));
    gx0 = gx0 + sz0 * (step(vec4f(0.), gx0) - 0.5);
    gy0 = gy0 + sz0 * (step(vec4f(0.), gy0) - 0.5);

    var gx1: vec4f = ixy1 / 7.;
    var gy1: vec4f = fract(floor(gx1) / 7.) - 0.5;
    gx1 = fract(gx1);
    var gz1: vec4f = vec4f(0.5) - abs(gx1) - abs(gy1);
    var sz1: vec4f = step(gz1, vec4f(0.));
    gx1 = gx1 - sz1 * (step(vec4f(0.), gx1) - 0.5);
    gy1 = gy1 - sz1 * (step(vec4f(0.), gy1) - 0.5);

    var g000: vec3f = vec3f(gx0.x, gy0.x, gz0.x);
    var g100: vec3f = vec3f(gx0.y, gy0.y, gz0.y);
    var g010: vec3f = vec3f(gx0.z, gy0.z, gz0.z);
    var g110: vec3f = vec3f(gx0.w, gy0.w, gz0.w);
    var g001: vec3f = vec3f(gx1.x, gy1.x, gz1.x);
    var g101: vec3f = vec3f(gx1.y, gy1.y, gz1.y);
    var g011: vec3f = vec3f(gx1.z, gy1.z, gz1.z);
    var g111: vec3f = vec3f(gx1.w, gy1.w, gz1.w);

    let norm0 = taylorInvSqrt4(
        vec4f(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 = g000 * norm0.x;
    g010 = g010 * norm0.y;
    g100 = g100 * norm0.z;
    g110 = g110 * norm0.w;
    let norm1 = taylorInvSqrt4(
        vec4f(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 = g001 * norm1.x;
    g011 = g011 * norm1.y;
    g101 = g101 * norm1.z;
    g111 = g111 * norm1.w;

    let n000 = dot(g000, Pf0);
    let n100 = dot(g100, vec3f(Pf1.x, Pf0.yz));
    let n010 = dot(g010, vec3f(Pf0.x, Pf1.y, Pf0.z));
    let n110 = dot(g110, vec3f(Pf1.xy, Pf0.z));
    let n001 = dot(g001, vec3f(Pf0.xy, Pf1.z));
    let n101 = dot(g101, vec3f(Pf1.x, Pf0.y, Pf1.z));
    let n011 = dot(g011, vec3f(Pf0.x, Pf1.yz));
    let n111 = dot(g111, Pf1);

    var fade_xyz: vec3f = fade3(Pf0);
    let temp = vec4f(f32(fade_xyz.z)); // simplify after chrome bug fix
    let n_z = mix(vec4f(n000, n100, n010, n110), vec4f(n001, n101, n011, n111), temp);
    let n_yz = mix(n_z.xy, n_z.zw, vec2f(f32(fade_xyz.y))); // simplify after chrome bug fix
    let n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}
    `,deps:["rand","permute4"]},rescale:{src:["f32","vec2f","vec3f","vec4f"].map((e,t)=>`
      fn rescale${t}(x: ${e}, a1: ${e}, b1: ${e}, a2: ${e}, b2: ${e}) -> ${e} {
        let temp = (x - a1) / (b1 - a1);
        return mix(a2, b2, temp);
      } 
    `).join(`

`)}};var ga=Z(ya());var yi=class e{constructor(t){this.getRange=async(n,r)=>{let u=Math.ceil(this.sampleRate*this.duration),i=jn(n,0,u),o=jn(n+r,0,u),a=await t.getRange(i,o-i);if(o-i==r)return a;let c={},l=-Math.min(0,n);for(let m of this.channels){console.log("eeeee",r);let x=new Float32Array(r),d=a[m];for(let p=0;p<d.length;p++)x[p+l]=d[p];c[m]=x}return c},this.duration=t.duration,this.sampleRate=t.sampleRate,this.channels=t.channels}channels;sampleRate;duration;getRange;gain(t){return xa(this.channels,this.sampleRate,[this,t],(n,r,u,i)=>kt(u,(o,a)=>a*i[o]),this.duration)}add(t){return xa(this.channels,this.sampleRate,[this,t],(n,r,u,i)=>kt(u,(o,a)=>a+i[o]))}clip(t,n){return new e({channels:this.channels,duration:n-t,sampleRate:this.sampleRate,getRange:(r,u)=>this.getRange(r+Math.floor(t*this.sampleRate),u)})}convolve(t){let n=j1(this.channels,this.sampleRate,t),r=Math.ceil(n.duration*n.sampleRate),u=n.getRange(0,r);return new e({channels:this.channels,duration:this.duration,sampleRate:this.sampleRate,getRange:async(i,o)=>{let a=await u;return kt(await this.getRange(i,o+r),(c,l)=>X1(new Float32Array(l),new Float32Array(a[c])).slice(0,o))}})}preload(){let t=this.getRange(0,Math.ceil(this.duration*this.sampleRate));return new e({channels:this.channels,duration:this.duration,sampleRate:this.sampleRate,getRange:async(n,r)=>{let u=await t;return kt(u,(i,o)=>o.slice(n,n+r))}})}};function Rs(e){let t=new ga.default(e.length),n=t.createComplexArray(),r=t.toComplexArray(e);return t.transform(n,r),new Float32Array(n)}function L1(e){let t=new ga.default(e.length/2),n=t.createComplexArray();return t.inverseTransform(n,e),new Float32Array(fe(n.length/2).map(r=>n[r*2]))}function N1(e,t){let n=Rs(e),r=Rs(t),u=new Float32Array(n.length);for(let i=0;i<n.length;i+=2)u[i]=n[i]*r[i]-n[i+1]*r[i+1],u[i+1]=n[i]*r[i+1]+n[i+1]*r[i];return L1(u)}function Gs(e,t){if(e.length===t)return e;let n=new Float32Array(t);for(let r=0;r<e.length;r++)n[r]=e[r];return n}var P1=fe(31).map(e=>2**(e+1)),F1=ru(e=>{let t=(n,r)=>r*Math.log2(r+1)/(r-n+1);return Vs(P1.filter(n=>t(e,n)>0),n=>t(e,n))});function X1(e,t){let n=t.length,r=F1(n),u=Gs(t,r),i=r-n+1,o=Math.ceil(e.length/i),a=new Float32Array(i*o);for(let c=0;c<o;c++){let l=i*c,m=Gs(e.slice(l,l+r),r),x=N1(m,u);for(let d=0;d<i;d++)a[l+d]=x[n+d-1]}return a.slice(0,e.length)}function q1(e){let t=e.constructors,n=t instanceof Function?nu(e.channels,r=>(u,i)=>t(u,i)[r]):t;return new yi({channels:e.channels,async getRange(r,u){return ma(n,(i,o)=>[i,new Float32Array(fe(u).map(a=>o((a+r)/this.sampleRate,a+r)))])},sampleRate:e.sampleRate,duration:e.duration})}async function K1(e,t,n,r){if(e.sampleRate===r)return await e.getRange(t,n);let u=t/r,i=n/r,o=Math.floor(u*e.sampleRate),a=Math.ceil((u+i)*e.sampleRate),c=await e.getRange(o,a-o);return kt(c,(l,m)=>new Float32Array(fe(n).map(x=>{let p=x/r*e.sampleRate,v=Math.floor(p),T=v+1;return tu(p%1,m[v],m[T])})))}function xa(e,t,n,r,u){let i=u||Math.max(...n.map(c=>c.duration)),o=Math.ceil(i*t);return new yi({channels:e,duration:i,sampleRate:t,async getRange(c,l){let m=await Promise.all(n.map(async d=>kt(await K1(d,c,l,t),(p,v)=>new Float32Array(v)))),x=nu(e,d=>new Float32Array(l));for(let d of fe(l)){let p=m.map((T,V)=>n[V].channels.length===1&&n[V].channels[0]==="center"?nu(e,()=>T.center[d]):kt(T,(f,s)=>s[d])),v=r((c+d)/t,c+d,...p);for(let T of e)x[T][d]=v[T]}return x}})}function j1(e,t,n){return xa(e,t,[n],(r,u,i)=>i)}function H1(e,t,n){return 1/t*fe(n*2+1).map(r=>Math.cos(2*Math.PI*(r-n)/t*e)).reduce((r,u)=>r+u,0)}function Y1(e,t){return Math.sin(Math.PI*(e-t/2)/t)**2}var X3=ru((e,t,n,r)=>{let i=Math.ceil(1/n*t)*r,o=i/t;console.log("created lpf");let a=r;return q1({duration:o,sampleRate:t,channels:e,length:i,constructors:nu(e,()=>(c,l)=>H1(l,i,a)*Y1(l,i))}).preload()});var q3=2048*16;var w=Z($s());var aT=(0,w.buildLexer)([[!0,/^\(/g,0],[!0,/^\)/g,1],[!0,/^\:/g,2],[!0,/^\//g,3],[!1,/^\s+/g,4],[!1,/^\/\/[^\n]*/g,7],[!0,/^(\+|\-)?[0-9]+/g,5],[!0,/^[a-gA-G][b#]*[0-9]*/g,6]]),za=(0,w.alt_sc)((0,w.apply)((0,w.kleft)((0,w.tok)(5),(0,w.str)(":")),e=>Number(e.text)),(0,w.apply)((0,w.nil)(),()=>1)),Ra=(0,w.apply)((0,w.seq)(za,(0,w.alt_sc)((0,w.tok)(6),(0,w.tok)(5))),([e,t])=>({type:"note",timing:e,noteData:t.text})),Aa=(0,w.rule)(),Js=(0,w.apply)((0,w.seq)(za,(0,w.lrec_sc)((0,w.apply)(Aa,e=>[e]),(0,w.seq)((0,w.str)("/"),Aa),(e,[t,n])=>[...e,n])),([e,t])=>({type:"chord",timing:e,notes:t})),Ei=(0,w.rule)(),Cy=(0,w.rep_sc)((0,w.alt_sc)(Ra,Js,Ei));Ei.setPattern((0,w.apply)((0,w.seq)(za,(0,w.kmid)((0,w.str)("("),Cy,(0,w.str)(")"))),([e,t])=>({type:"compound",timing:e,notes:t})));Aa.setPattern((0,w.alt_sc)(Ra,Ei));var Dy=(0,w.alt_sc)(Js,Ei,Ra),cT=(0,w.rep_sc)(Dy);var qy=Z(ya()),Ky=Z(tf());var yn=Z(te()),L2=Z(ys());var xs=Z(te());var na=Z(te());var Pn=Z(te());var zS=(0,Pn.createContext)(void 0);var ob=(0,yn.createContext)(void 0);var Y0=Z(te());var Xr=Z(te()),N2=Z(te()),db=(0,Xr.createContext)({setTooltip(){},tooltip:void 0});var P2=Z(te());var W0=Z(te());var ai=Z(te());var ra=Z(te());var F2=Z(te());var X2=Z(te());var ci=Z(te()),q2=Z(te());var Z0=Z(te());var K2=Z(te());var gs=Z(te()),j2=Z(ys());async function H2(e){return await(await fetch("https://apiv1.crom.avn.sh/graphql",{body:JSON.stringify({query:e}),method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}})).json()}async function hs(e,t){let n,r=[];for(;;){let u=`{
  pages(filter: ${e}, first: 100${n?`, after: "${n}"`:""}) {
    edges {
      node ${t} 
    },
    pageInfo {
      hasNextPage,
      endCursor
    }
  }
}`,i=await H2(u);if(r.push(...i.data.pages.edges.map(o=>o.node)),!i.data.pages.pageInfo.hasNextPage)break;n=i.data.pages.pageInfo.endCursor}return r}var Q0=`http://scp-wiki.wikidot.com/9000booblesnoot
9966
9006
9886
9116
9669

http://scp-wiki.wikidot.com/9000cakoh
9099
9747
9084
9317
9039

http://scp-wiki.wikidot.com/9000contest8bitbreadbox
9125
9555
9005
9375
9336

http://scp-wiki.wikidot.com/9000contestaftokrator
9800
9008
900X
9X00
9XXX

http://scp-wiki.wikidot.com/9000contestaismallard
9994
9201
9301
9015
9102

http://scp-wiki.wikidot.com/9000contestaldi-shopper
9005
9055
9555
9500
9XYZ

http://scp-wiki.wikidot.com/9000contestalexdiflip
9109
9099
9025
9250
9101

http://scp-wiki.wikidot.com/9000contestalphaastrox
9500
9200
9100
9050
9028

http://scp-wiki.wikidot.com/9000contestampyrreference
9140
9000
9014
9410
9041

http://scp-wiki.wikidot.com/9000contestanactualcrow
9999
9001
9500
9900

http://scp-wiki.wikidot.com/9000contestanimalhospital
9XYZ

http://scp-wiki.wikidot.com/9000contestanorrack
9016
9018
9326
9720
9929

http://scp-wiki.wikidot.com/9000contestanyar
900X
9X00
9682
9333
9339

http://scp-wiki.wikidot.com/9000contestape5
9001
9998
9008
9888
9808

http://scp-wiki.wikidot.com/9000contestarclund
9008
9100
9800
9042
9014

http://scp-wiki.wikidot.com/9000contestariadnesthread
9028
9900
9500
9800
9200

http://scp-wiki.wikidot.com/9000contestastersynth
9231
9876
9X00
900X

http://scp-wiki.wikidot.com/9000contestastralnavigator
9X00
9090
9X80
9X30
9540
9XYZ

http://scp-wiki.wikidot.com/9000contestawhiteboy
9001
9002
9003
9100
9343

http://scp-wiki.wikidot.com/9000contestbaddata
9102
9202
9302
9902
9X02

http://scp-wiki.wikidot.com/9000contestbigslothonmyface
9001
9002
999X highest
9X00
900X

http://scp-wiki.wikidot.com/9000contestblackmonday
9006
9009
9XX9
9990
9914

http://scp-wiki.wikidot.com/9000contestblankfellowplace
9001
9500
9002
9179
9876

http://scp-wiki.wikidot.com/9000contestblazingpie
900X highest
999X highest
9X00 highest
9X9X
9923

http://scp-wiki.wikidot.com/9000contestblueeyedfox
9X0X
9013
9626
9912
9XYZ

http://scp-wiki.wikidot.com/9000contestcalibold
900X
9X00
9XYZ palindrome highest
9XYZ

http://scp-wiki.wikidot.com/9000contestcathyautumn
9001
9002
9500
900X
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contestcelestialtophat
900X
90X0
9XYZ

http://scp-wiki.wikidot.com/9000contestchoccoman
900X
9666
9500
9X99 highest
9404

http://scp-wiki.wikidot.com/9000contestcircledot
9009
9X9X
99XX
9801
9990

http://scp-wiki.wikidot.com/9000contestclutterarranger
9009
9001
9006
9X00
9966

http://scp-wiki.wikidot.com/9000contestcoccolithophor
9090
9130
9X9X
9XX9
9XYZ

http://scp-wiki.wikidot.com/9000contestdappleddaspletosaur
9111
9779
9222
9993
9191

http://scp-wiki.wikidot.com/9000contestdaveyoufool
9002
9005
9900
9901
9902

http://scp-wiki.wikidot.com/9000contestdeadcanons
9001
9009
9500
9998
9023

http://scp-wiki.wikidot.com/9000contestdemolitionderpy
9444
9777
9200
9222
9XYZ

http://scp-wiki.wikidot.com/9000contestdinotroutrosy
9990
9900
9009
9090
9099

http://scp-wiki.wikidot.com/9000contestdiogenes
9X00
900X
999X highest
9111
9222
9333
9444
9555
9666
9777
9888
9137

http://scp-wiki.wikidot.com/9000contestdjkaktus
9001
9998
9935
9889
9900

http://scp-wiki.wikidot.com/9000contestdmonist
9876
9678
9117
9404
9104

http://scp-wiki.wikidot.com/9000contestdoctorcimmerian
9001
9X00
9X13

http://scp-wiki.wikidot.com/9000contestdoctorlilithsophia
9000
9X00 highest
9408
9049

http://scp-wiki.wikidot.com/9000contestdoctorlovelace
9001
9002
9003
9004
9471

http://scp-wiki.wikidot.com/9000contestdoctorzurvan
9109
9101
9500
9876
9901

http://scp-wiki.wikidot.com/9000contestdrbalthazaar
9004
9400
9X00
900X
9444

http://scp-wiki.wikidot.com/9000contestdreadnoughtgalaxy
900X
9X00
9010
9020
9050
9030
9995
999X highest
9099
9399
9199
9031
9233

http://scp-wiki.wikidot.com/9000contestdr-lutwin
9333
9033
9051
9388
9191

http://scp-wiki.wikidot.com/9000contestdr-talcite
900X
9X00
9111
9222
9333
9444
9555
9666
9777
9888

http://scp-wiki.wikidot.com/9000contestdysadron
9998
9001
9002
9XXX
999X

http://scp-wiki.wikidot.com/9000contestesquirezel
9601
9272
9091
9009

http://scp-wiki.wikidot.com/9000contestesther619
9004
9400
9499
9449
9404

http://scp-wiki.wikidot.com/9000contestethagon
9341
9990
9019
9900
9XYZ

http://scp-wiki.wikidot.com/9000contestfairydoctor
9555
9005
9995
9055
9955

http://scp-wiki.wikidot.com/9000contestfermentating
9494
9944
9449
9210

http://scp-wiki.wikidot.com/9000contestfiref1y
9886
9007
9048
9003
9335

http://scp-wiki.wikidot.com/9000contestfireknight
9024
9924
9124
9824
9X24

http://scp-wiki.wikidot.com/9000contestfiretamer
9240
9261
9604
9061
9100

http://scp-wiki.wikidot.com/9000contestfloorboards
9173
9666
9012
9998
9433
9069

http://scp-wiki.wikidot.com/9000contestfrankentropy
9231
9317
9462
9777
9797
97X7
97XX

http://scp-wiki.wikidot.com/9000contestfrozenfoxb
9990
9333
9989
9555
9899
9XYZ

http://scp-wiki.wikidot.com/9000contestgravelenthusiast
9003
9030
9300
9993
9393

http://scp-wiki.wikidot.com/9000contestgreenwolftawny
9666
9088
9988
9876
9630

http://scp-wiki.wikidot.com/9000contestgrigorikarpin
9001
9009
9500
9002
9003
9XYZ

http://scp-wiki.wikidot.com/9000contestgunpowdr
9500
9900
9003
9010
9005

http://scp-wiki.wikidot.com/9000contestharmacy
9184
900X highest
9X00 highest
90X0 highest
9XYZ

http://scp-wiki.wikidot.com/9000contestharrietfarrar
9892
9876
9191
9342
9966

http://scp-wiki.wikidot.com/9000contesthenzoid
900X
9090
9099

http://scp-wiki.wikidot.com/9000contesthikarinu
9009
9998
9669
900X
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contesthowltomoonsuntold
9013
9127
9029
9949
9601

http://scp-wiki.wikidot.com/9000contesthufor
9669
9610
9694
9612
9712

http://scp-wiki.wikidot.com/9000contestiamtheooga
9006
9106
9016
9446
9666

http://scp-wiki.wikidot.com/9000contestindustrystandard
9001
9500
9753
9357
90XX

http://scp-wiki.wikidot.com/9000contestironshears
9630
9963
99XX

http://scp-wiki.wikidot.com/9000contestitsabadidea
9900
9009
9090
9001
9804

http://scp-wiki.wikidot.com/9000contestjdune

http://scp-wiki.wikidot.com/9000contestjeanjacket
9696
9096
9960
9X96
996X

http://scp-wiki.wikidot.com/9000contestjezixo
9500
9X00
9086
9858
9985

http://scp-wiki.wikidot.com/9000contestjtdn
9000 custom8542
9542
9642
9000 custom8742
9742

http://scp-wiki.wikidot.com/9000contestj-v-g
900X
9014
9X00
9XYZ palindrome

http://scp-wiki.wikidot.com/9000contestkaelicles
9001
9002
9003
9004
9401

http://scp-wiki.wikidot.com/9000contestkarathh
9777
9797
9002
9173
9677

http://scp-wiki.wikidot.com/9000contestkayes-eskay
9005
9009
9022
9545
9888

http://scp-wiki.wikidot.com/9000contestkilerpoyo
9914
9814
9714
9600

http://scp-wiki.wikidot.com/9000contestkothardarastrix
9314
9356
9328
9820
9775

http://scp-wiki.wikidot.com/9000contestleplante
9440
9448
9630
9864
9898

http://scp-wiki.wikidot.com/9000contestletova
9790
9001
9919
9799
9009

http://scp-wiki.wikidot.com/9000contestlocallesbiancommie
9964
9005
9967
9500
9985

http://scp-wiki.wikidot.com/9000contestlordxvnv
900X
9998
9997

http://scp-wiki.wikidot.com/9000contestlucas667
9990
9800
9005
9010
9X00
9XYZ

http://scp-wiki.wikidot.com/9000contestmaplestrip
9996
9998
9009
9006
9995

http://scp-wiki.wikidot.com/9000contestmatthgeek
9119
9889
9900
9100
9138

http://scp-wiki.wikidot.com/9000contestmerehrab
9696
9035
9500
9350
9550

http://scp-wiki.wikidot.com/9000contestmister-toasty
9X99
9876
9108
9420

http://scp-wiki.wikidot.com/9000contestmontagueetc
9500
9900
9400
9005
9555
9004
9404
9444
9055
9955

http://scp-wiki.wikidot.com/9000contestmothmanuxo
9XYZ
9682
9377

http://scp-wiki.wikidot.com/9000contestn1ght-scribe
9500
9001
9225
9888
9898

http://scp-wiki.wikidot.com/9000contestnico
9000
9001
9726
9004
9669
9725

http://scp-wiki.wikidot.com/9000contestnullscape
9500
9001
9009
9900
9822

http://scp-wiki.wikidot.com/9000contestoctiron
9001
9007
9011
9013
9017
9001
9007
9011
9013
9029
9041
9043
9049
9059
9067
9091
9103
9109
9127
9133
9137
9151
9157
9161
9173
9181
9187
9199
9203
9209
9221
9227
9239
9241
9257
9277
9281
9283
9293
9311
9319
9323
9337
9341
9343
9349
9371
9377
9391
9397
9403
9413
9419
9421
9431
9433
9437
9439
9461
9463
9467
9473
9479
9491
9497
9511
9521
9533
9539
9547
9551
9587
9601
9613
9619
9623
9629
9631
9643
9649
9661
9677
9679
9689
9697
9719
9721
9733
9739
9743
9749
9767
9769
9781
9787
9791
9803
9811
9817
9829
9833
9839
9851
9857
9859
9871
9883
9887
9901
9907
9923
9929
9931
9941
9949
9967
9973	

http://scp-wiki.wikidot.com/9000contestonlineopossum
9110
9911
9411
9X9X
9XX9

http://scp-wiki.wikidot.com/9000contestpanloque
9001
9998
9500
9900
9966

http://scp-wiki.wikidot.com/9000contestparenthesis
9003
9009
9119
9011
9013

http://scp-wiki.wikidot.com/9000contestpenumbralchoir
9595
9559
9170
9230
9889

http://scp-wiki.wikidot.com/9000contestpeter-cohen
9998
9003
9119
9500
9900

http://scp-wiki.wikidot.com/9000contestplaguepjp
9001
9595
9003
9002
9599

http://scp-wiki.wikidot.com/9000contestpoltatherian
9001
9500
9099
9111
9230

http://scp-wiki.wikidot.com/9000contestpoufypoufson
9001
9998
9002
9005
9010

http://scp-wiki.wikidot.com/9000contestpumgumgum
900X
9X00
90X0
933X
9661
9662
9663
9664
9665
9667
9668
9669

http://scp-wiki.wikidot.com/9000contestqueerious
9001
9900
9500
9100

http://scp-wiki.wikidot.com/9000contestraddagher
9001
9320
9032
9132
9632

http://scp-wiki.wikidot.com/9000contestradian628
9009
900X
9X00

http://scp-wiki.wikidot.com/9000contestralliston
9001
9500
9600
9876
9120
9372

http://scp-wiki.wikidot.com/9000contestratseerofrattesse
9125
9001
9111
9250

http://scp-wiki.wikidot.com/9000contestresolver
900X
9X00
9033
90X0
9333
9XXX

http://scp-wiki.wikidot.com/9000contestsailorenoch
9991
9992
9960
9950
9970

http://scp-wiki.wikidot.com/9000contestseekgull
900X
9090
9X00
9X9X
9966

http://scp-wiki.wikidot.com/9000contestsevencix
9X00
900X
90X0 
9760
9076

http://scp-wiki.wikidot.com/9000contestshariavanilla
9529
9000 custom529-j

http://scp-wiki.wikidot.com/9000contest-shirleysterling
9300
9003
9030
9333
9321

http://scp-wiki.wikidot.com/9000contestsigyeklette
9XYZ no_same_digits_and_doesnt_end_with_9_or_0

http://scp-wiki.wikidot.com/9000contestsimartar
9550
9500
9700
9079
9193

http://scp-wiki.wikidot.com/9000contestsimpleruins
9100
9120
9150
9200

http://scp-wiki.wikidot.com/9000contestsinkingotter
9996
9618
9669
9600
9196

http://scp-wiki.wikidot.com/9000contestsoftseal
900X
9500
9X00
9XXX
9110

http://scp-wiki.wikidot.com/9000contestsonderance
9X01
9X11

http://scp-wiki.wikidot.com/9000contestspider-jaws
9600
9696
9060
9006
9096

http://scp-wiki.wikidot.com/9000contestsprawlingstar
900X
9X00 
9XXX
9876
9929

http://scp-wiki.wikidot.com/9000conteststonephish
9891
9189
9918
9181
9898

http://scp-wiki.wikidot.com/9000contestsunnymouse
9X00
90X0 
9X88 
9881 
9882 
9883 
9884 
9885 
9886 
9887 
9889

http://scp-wiki.wikidot.com/9000contestsynent
9004
9008
9014
9019
9040

http://scp-wiki.wikidot.com/9000contestteaanddigestives
9017
9170
9171
9177
9069

http://scp-wiki.wikidot.com/9000contestthetravllr
9401
9399
9040
9080
9044

http://scp-wiki.wikidot.com/9000contesttrintavon
9000
9699
9696
9081
9037

http://scp-wiki.wikidot.com/9000contesttufto
9799
9XYZ not9005

http://scp-wiki.wikidot.com/9000contestulyssesbark
900X
9500
9048
9033

http://scp-wiki.wikidot.com/9000contestuncgriffin

http://scp-wiki.wikidot.com/9000contestuniquename
999X
9X00 
9XXX 
9013
900X

http://scp-wiki.wikidot.com/9000contestutylike
9023
9010
9XYZ 

http://scp-wiki.wikidot.com/9000contestvilsotoast
9990
9876
9900
9753
9835

http://scp-wiki.wikidot.com/9000contestwackdog
900X 
9X00 
999X highest
9750
9577

http://scp-wiki.wikidot.com/9000contestwaylandlaurencepan
9500
9888
9521
9520
9143

http://scp-wiki.wikidot.com/9000contestxextyra
900X
9X00 
9876
9777
9012

http://scp-wiki.wikidot.com/9000contestxhawk77x
9004
9007
9140
9400
9700
9280
9417
9046
9548
9XYZ lowest_4_and_7
9XYZ lowest_4_or_7

http://scp-wiki.wikidot.com/9000contesty0ssarian
9101
9445
9495
9222

http://scp-wiki.wikidot.com/9000contestzeekyboogydoog
9001
9002
9003
9004
9005
900X
90X0
9X00
9XY0
9X0Y
90XY

http://scp-wiki.wikidot.com/9000contestzoempaws
9001
9666
9333
9173
9XX9

http://scp-wiki.wikidot.com/9000contestzyn
9333
9233
9332
9323
9223

http://scp-wiki.wikidot.com/9000drchandra
9090
9099
9909
9099
9742

http://scp-wiki.wikidot.com/9000katyastrangelove
9140
9280
9980
9400
9014

http://scp-wiki.wikidot.com/9000contestbattlecruiser12
9003
9100
9300
9154
9303

http://scp-wiki.wikidot.com/9000contestpliltdrgrimoire
9600
9X00
9663
9333

http://scp-wiki.wikidot.com/9000contestdoctorscrappy
9876
9001
9666
9900
9696

http://scp-wiki.wikidot.com/9000contestpuriora

http://scp-wiki.wikidot.com/9000contestperdoh

http://scp-wiki.wikidot.com/9000contestpinoccappuccino
9931
9317
9901
9311

http://scp-wiki.wikidot.com/9000contestmrmcguffin
9005
9007
9011
9021
9099

http://scp-wiki.wikidot.com/9000contestjackike

http://scp-wiki.wikidot.com/9000contestalexjohansson

http://scp-wiki.wikidot.com/9000contestmann
9090
9393
9099
9998
9423

http://scp-wiki.wikidot.com/9000contestuncannyon
9900
9500
9X00
9009
9090
90X0
9099
900X`;function I0(e){return si(e,{maxConcurrentRequests:5,limits:[{duration:5,maxRequests:10}]})}function W2(e,t){return new Promise((n,r)=>{window.OZONE.ajax.requestModule(e,t,u=>{n(u)})})}var vs=new Map,$0=I0(W2),J0=I0(async function(e){if(vs.has(e))return vs.get(e);let t=await(await fetch(e)).text(),r=new DOMParser().parseFromString(t,"text/html").querySelectorAll("head script");for(let u of Array.from(r)){let i=u.innerText.match(/WIKIREQUEST\.info\.pageId\s*\=\s*(\d+)/);if(i)return vs.set(e,i[1]),i[1]}});var e1='{ url: { startsWith: "http://scp-wiki.wikidot.com"}, wikidotInfo: { tags: { eq: "9000" } } }';window.getRatings=async()=>{let e=(await hs(e1,"{ url }")).filter(t=>!t.url.endsWith("scp9000contesthub")).map(t=>Z2(t.url));return await Promise.all(e)};async function Z2(e){let t=await J0(e),n=await $0("pagerate/WhoRatedPageModule",{pageId:t}),u=new DOMParser().parseFromString(n.body,"text/html").querySelectorAll(".printuser"),i=0,o=0,a=[];for(let c of Array.from(u)){let l=c.children[1]?.innerText?.trim(),m=c.nextElementSibling?.innerText?.trim();a.push({username:l,direction:m}),m==="+"?(i++,o++):m==="-"?i--:console.warn(`Unrecognized vote type '${m}' for user '${l}' and page '${e}'.`)}return{url:e,netRating:i,upvoteTotal:o,votes:a}}window.calculatePicks=async e=>{let t=e.sort((i,o)=>o.netRating*1e4+o.upvoteTotal-i.netRating*1e4-i.upvoteTotal),n=new Map,r=new Map,u=Q0.split(`

`).map(i=>{let o=i.split(`
`),a=o[0],c=o.slice(1).join(`
`),l=t1(c);l.invalid.length>0&&console.warn(a,"had invalid preferences: ",l.invalid),r.set(a,l.prefs)});for(let i of t){let o=r.get(i.url);o||(console.warn(i.url,"has no slot preferences listed!"),o=fe(998).map(c=>c+9e3).map(c=>c.toString())),o=(await Promise.all(o.map(async c=>c.startsWith("9")&&c.length===4?[c]:(await fetch(`https://scp-wiki.wikidot.com/scp-${c}`)).status===404?[c]:[]))).flat();let a=o.find(c=>!n.has(c));a===void 0&&console.warn(i.url,": no valid slot found!"),a!=="no_slot"&&a&&n.set(a,{url:i.url,netRating:i.netRating,upvoteTotal:i.upvoteTotal})}return{table:Object.fromEntries(Array.from(n.entries())),orderedResults:Array.from(n.entries()).map(([i,o])=>({...o,slot:i})).sort((i,o)=>o.netRating*1e4+o.upvoteTotal-i.netRating*1e4-i.upvoteTotal)}};async function Q2(e){let t=await(await fetch(e)).text();return new DOMParser().parseFromString(t,"text/html").querySelector("#discuss-button").href}function I2(e,t){let n=new Map;for(let r=1;r<4;r++){let u=e[r],i=t[r];if(u.match(/\d/g)){if(u!==i)return!1}else{let o=n.get(u.toUpperCase());if(o===void 0)n.set(u.toUpperCase(),i);else if(o!==i)return!1}}return!0}function $2(e){let t=[];for(let n=9e3;n<=9998;n++){let r=n.toString();I2(e,r)&&t.push(r)}return t}function t1(e){let t=e.split(`
`),n=["9000"],r=[];for(let u of t){if(u.trim().length===0)continue;let i=u.trim().split(/\s+/g),o=/^9[0-9xXyYzZ]{3}$/g;if(!i[0].match(o)){r.push(u);continue}let a=$2(i[0]),c=!1;for(let l of i.slice(1))if(l==="highest")a.reverse();else if(l.startsWith("not")){let m=l.slice(3);a=a.filter(x=>x!==m)}else l==="palindrome"?a=a.filter(m=>m===m.split("").reverse().join("")):l==="no_same_digits_and_doesnt_end_with_9_or_0"?a=a.filter(m=>m.endsWith("9")||m.endsWith("0")?!1:new Set(m.split("")).size===4):l==="lowest_4_and_7"?a=a.filter(m=>m.includes("4")&&m.includes("7")):l==="lowest_4_or_7"?a=a.filter(m=>m.includes("4")||m.includes("7")):l==="no_slot"?a=["no_slot"]:l.startsWith("custom")?a=[l.slice(6)]:(c=!0,r.push(u));c||n.push(...a)}for(let u=9e3;u<=9998;u++)n.push(u.toString());return{prefs:n,invalid:r}}window.parsePrefs=t1;async function J2(e,t){let n=await Q2(e);console.log("discussion link",n);let r=await(await fetch(n)).text(),u=new DOMParser().parseFromString(r,"text/html");return Array.from(u.querySelectorAll("#thread-container-posts .post")).filter(i=>{let o=i.querySelector(".printuser a:nth-child(2)");return console.log(o),o&&t.includes(o.innerText)})}window.copyURLToClipboard=e=>t=>{navigator.clipboard.writeText(e).then(()=>{t.style.backgroundColor="green"}).catch(()=>{t.style.backgroundColor="red"}).finally(()=>{setTimeout(()=>{t.style.backgroundColor="#eee"},1e3)})};window.getAllAuthorComments=async()=>{let e=await hs(e1,"{ url, attributions { user { name } } }"),t=si(J2,{limits:[{duration:10,maxRequests:3}],maxConcurrentRequests:3});console.log(e),document.body.innerHTML="",document.body.style="display: flex; flex-wrap: wrap;";for(let n of e){let r=n.url,u=await t(r,n.attributions.map(i=>i.user.name));for(let i of u){let o=i.querySelector(".content");if(i.innerText.match("9")){for(let a of Array.from(o.querySelectorAll("img")))a.parentElement.removeChild(a);if(!o)break;document.body.innerHTML+=`<div style="padding: 10px; margin: 10px; border: 1px solid black; width: 250px; font-family: sans-serif;">
      <p>
      <button style="max-width: 100%; font-size: 125%; word-wrap: break-word" onclick="window.copyURLToClipboard('${r}')(this)">${r}</button> 
      </p>
      ${o.innerHTML}</div>`}}}};})();
 });