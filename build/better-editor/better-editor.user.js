"use strict";(()=>{var OQ=Object.create;var UO=Object.defineProperty;var gQ=Object.getOwnPropertyDescriptor;var yQ=Object.getOwnPropertyNames;var bQ=Object.getPrototypeOf,xQ=Object.prototype.hasOwnProperty;var ln=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var SQ=(t,e,i,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of yQ(e))!xQ.call(t,s)&&s!==i&&UO(t,s,{get:()=>e[s],enumerable:!(n=gQ(e,s))||n.enumerable});return t};var ah=(t,e,i)=>(i=t!=null?OQ(bQ(t)):{},SQ(e||!t||!t.__esModule?UO(i,"default",{value:t,enumerable:!0}):i,t));var ag=ln(ue=>{"use strict";function hh(t,e){var i=t.length;t.push(e);e:for(;0<i;){var n=i-1>>>1,s=t[n];if(0<uo(s,e))t[n]=e,t[i]=s,i=n;else break e}}function fi(t){return t.length===0?null:t[0]}function ho(t){if(t.length===0)return null;var e=t[0],i=t.pop();if(i!==e){t[0]=i;e:for(var n=0,s=t.length,r=s>>>1;n<r;){var l=2*(n+1)-1,a=t[l],o=l+1,u=t[o];if(0>uo(a,i))o<s&&0>uo(u,a)?(t[n]=u,t[o]=i,n=o):(t[n]=a,t[l]=i,n=l);else if(o<s&&0>uo(u,i))t[n]=u,t[o]=i,n=o;else break e}}return e}function uo(t,e){var i=t.sortIndex-e.sortIndex;return i!==0?i:t.id-e.id}ue.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(JO=performance,ue.unstable_now=function(){return JO.now()}):(oh=Date,FO=oh.now(),ue.unstable_now=function(){return oh.now()-FO});var JO,oh,FO,_i=[],an=[],QQ=1,zt=null,We=3,fh=!1,rl=!1,ll=!1,dh=!1,ig=typeof setTimeout=="function"?setTimeout:null,ng=typeof clearTimeout=="function"?clearTimeout:null,eg=typeof setImmediate<"u"?setImmediate:null;function co(t){for(var e=fi(an);e!==null;){if(e.callback===null)ho(an);else if(e.startTime<=t)ho(an),e.sortIndex=e.expirationTime,hh(_i,e);else break;e=fi(an)}}function ph(t){if(ll=!1,co(t),!rl)if(fi(_i)!==null)rl=!0,Ys||(Ys=!0,qs());else{var e=fi(an);e!==null&&mh(ph,e.startTime-t)}}var Ys=!1,al=-1,sg=5,rg=-1;function lg(){return dh?!0:!(ue.unstable_now()-rg<sg)}function uh(){if(dh=!1,Ys){var t=ue.unstable_now();rg=t;var e=!0;try{e:{rl=!1,ll&&(ll=!1,ng(al),al=-1),fh=!0;var i=We;try{t:{for(co(t),zt=fi(_i);zt!==null&&!(zt.expirationTime>t&&lg());){var n=zt.callback;if(typeof n=="function"){zt.callback=null,We=zt.priorityLevel;var s=n(zt.expirationTime<=t);if(t=ue.unstable_now(),typeof s=="function"){zt.callback=s,co(t),e=!0;break t}zt===fi(_i)&&ho(_i),co(t)}else ho(_i);zt=fi(_i)}if(zt!==null)e=!0;else{var r=fi(an);r!==null&&mh(ph,r.startTime-t),e=!1}}break e}finally{zt=null,We=i,fh=!1}e=void 0}}finally{e?qs():Ys=!1}}}var qs;typeof eg=="function"?qs=function(){eg(uh)}:typeof MessageChannel<"u"?(ch=new MessageChannel,tg=ch.port2,ch.port1.onmessage=uh,qs=function(){tg.postMessage(null)}):qs=function(){ig(uh,0)};var ch,tg;function mh(t,e){al=ig(function(){t(ue.unstable_now())},e)}ue.unstable_IdlePriority=5;ue.unstable_ImmediatePriority=1;ue.unstable_LowPriority=4;ue.unstable_NormalPriority=3;ue.unstable_Profiling=null;ue.unstable_UserBlockingPriority=2;ue.unstable_cancelCallback=function(t){t.callback=null};ue.unstable_forceFrameRate=function(t){0>t||125<t?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):sg=0<t?Math.floor(1e3/t):5};ue.unstable_getCurrentPriorityLevel=function(){return We};ue.unstable_next=function(t){switch(We){case 1:case 2:case 3:var e=3;break;default:e=We}var i=We;We=e;try{return t()}finally{We=i}};ue.unstable_requestPaint=function(){dh=!0};ue.unstable_runWithPriority=function(t,e){switch(t){case 1:case 2:case 3:case 4:case 5:break;default:t=3}var i=We;We=t;try{return e()}finally{We=i}};ue.unstable_scheduleCallback=function(t,e,i){var n=ue.unstable_now();switch(typeof i=="object"&&i!==null?(i=i.delay,i=typeof i=="number"&&0<i?n+i:n):i=n,t){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=i+s,t={id:QQ++,callback:e,priorityLevel:t,startTime:i,expirationTime:s,sortIndex:-1},i>n?(t.sortIndex=i,hh(an,t),fi(_i)===null&&t===fi(an)&&(ll?(ng(al),al=-1):ll=!0,mh(ph,i-n))):(t.sortIndex=s,hh(_i,t),rl||fh||(rl=!0,Ys||(Ys=!0,qs()))),t};ue.unstable_shouldYield=lg;ue.unstable_wrapCallback=function(t){var e=We;return function(){var i=We;We=e;try{return t.apply(this,arguments)}finally{We=i}}}});var ug=ln((gE,og)=>{"use strict";og.exports=ag()});var Sg=ln(q=>{"use strict";var gh=Symbol.for("react.transitional.element"),wQ=Symbol.for("react.portal"),TQ=Symbol.for("react.fragment"),PQ=Symbol.for("react.strict_mode"),$Q=Symbol.for("react.profiler"),AQ=Symbol.for("react.consumer"),RQ=Symbol.for("react.context"),CQ=Symbol.for("react.forward_ref"),MQ=Symbol.for("react.suspense"),EQ=Symbol.for("react.memo"),mg=Symbol.for("react.lazy"),cg=Symbol.iterator;function zQ(t){return t===null||typeof t!="object"?null:(t=cg&&t[cg]||t["@@iterator"],typeof t=="function"?t:null)}var Og={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},gg=Object.assign,yg={};function js(t,e,i){this.props=t,this.context=e,this.refs=yg,this.updater=i||Og}js.prototype.isReactComponent={};js.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};js.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function bg(){}bg.prototype=js.prototype;function yh(t,e,i){this.props=t,this.context=e,this.refs=yg,this.updater=i||Og}var bh=yh.prototype=new bg;bh.constructor=yh;gg(bh,js.prototype);bh.isPureReactComponent=!0;var hg=Array.isArray,ce={H:null,A:null,T:null,S:null,V:null},xg=Object.prototype.hasOwnProperty;function xh(t,e,i,n,s,r){return i=r.ref,{$$typeof:gh,type:t,key:e,ref:i!==void 0?i:null,props:r}}function _Q(t,e){return xh(t.type,e,void 0,void 0,void 0,t.props)}function Sh(t){return typeof t=="object"&&t!==null&&t.$$typeof===gh}function ZQ(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(i){return e[i]})}var fg=/\/+/g;function Oh(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ZQ(""+t.key):e.toString(36)}function dg(){}function XQ(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(dg,dg):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Bs(t,e,i,n,s){var r=typeof t;(r==="undefined"||r==="boolean")&&(t=null);var l=!1;if(t===null)l=!0;else switch(r){case"bigint":case"string":case"number":l=!0;break;case"object":switch(t.$$typeof){case gh:case wQ:l=!0;break;case mg:return l=t._init,Bs(l(t._payload),e,i,n,s)}}if(l)return s=s(t),l=n===""?"."+Oh(t,0):n,hg(s)?(i="",l!=null&&(i=l.replace(fg,"$&/")+"/"),Bs(s,e,i,"",function(u){return u})):s!=null&&(Sh(s)&&(s=_Q(s,i+(s.key==null||t&&t.key===s.key?"":(""+s.key).replace(fg,"$&/")+"/")+l)),e.push(s)),1;l=0;var a=n===""?".":n+":";if(hg(t))for(var o=0;o<t.length;o++)n=t[o],r=a+Oh(n,o),l+=Bs(n,e,i,r,s);else if(o=zQ(t),typeof o=="function")for(t=o.call(t),o=0;!(n=t.next()).done;)n=n.value,r=a+Oh(n,o++),l+=Bs(n,e,i,r,s);else if(r==="object"){if(typeof t.then=="function")return Bs(XQ(t),e,i,n,s);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return l}function fo(t,e,i){if(t==null)return t;var n=[],s=0;return Bs(t,n,"","",function(r){return e.call(i,r,s++)}),n}function DQ(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(i){(t._status===0||t._status===-1)&&(t._status=1,t._result=i)},function(i){(t._status===0||t._status===-1)&&(t._status=2,t._result=i)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function NQ(){}q.Children={map:fo,forEach:function(t,e,i){fo(t,function(){e.apply(this,arguments)},i)},count:function(t){var e=0;return fo(t,function(){e++}),e},toArray:function(t){return fo(t,function(e){return e})||[]},only:function(t){if(!Sh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};q.Component=js;q.Fragment=TQ;q.Profiler=$Q;q.PureComponent=yh;q.StrictMode=PQ;q.Suspense=MQ;q.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=ce;q.__COMPILER_RUNTIME={__proto__:null,c:function(t){return ce.H.useMemoCache(t)}};q.cache=function(t){return function(){return t.apply(null,arguments)}};q.cloneElement=function(t,e,i){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var n=gg({},t.props),s=t.key,r=void 0;if(e!=null)for(l in e.ref!==void 0&&(r=void 0),e.key!==void 0&&(s=""+e.key),e)!xg.call(e,l)||l==="key"||l==="__self"||l==="__source"||l==="ref"&&e.ref===void 0||(n[l]=e[l]);var l=arguments.length-2;if(l===1)n.children=i;else if(1<l){for(var a=Array(l),o=0;o<l;o++)a[o]=arguments[o+2];n.children=a}return xh(t.type,s,void 0,void 0,r,n)};q.createContext=function(t){return t={$$typeof:RQ,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:AQ,_context:t},t};q.createElement=function(t,e,i){var n,s={},r=null;if(e!=null)for(n in e.key!==void 0&&(r=""+e.key),e)xg.call(e,n)&&n!=="key"&&n!=="__self"&&n!=="__source"&&(s[n]=e[n]);var l=arguments.length-2;if(l===1)s.children=i;else if(1<l){for(var a=Array(l),o=0;o<l;o++)a[o]=arguments[o+2];s.children=a}if(t&&t.defaultProps)for(n in l=t.defaultProps,l)s[n]===void 0&&(s[n]=l[n]);return xh(t,r,void 0,void 0,null,s)};q.createRef=function(){return{current:null}};q.forwardRef=function(t){return{$$typeof:CQ,render:t}};q.isValidElement=Sh;q.lazy=function(t){return{$$typeof:mg,_payload:{_status:-1,_result:t},_init:DQ}};q.memo=function(t,e){return{$$typeof:EQ,type:t,compare:e===void 0?null:e}};q.startTransition=function(t){var e=ce.T,i={};ce.T=i;try{var n=t(),s=ce.S;s!==null&&s(i,n),typeof n=="object"&&n!==null&&typeof n.then=="function"&&n.then(NQ,pg)}catch(r){pg(r)}finally{ce.T=e}};q.unstable_useCacheRefresh=function(){return ce.H.useCacheRefresh()};q.use=function(t){return ce.H.use(t)};q.useActionState=function(t,e,i){return ce.H.useActionState(t,e,i)};q.useCallback=function(t,e){return ce.H.useCallback(t,e)};q.useContext=function(t){return ce.H.useContext(t)};q.useDebugValue=function(){};q.useDeferredValue=function(t,e){return ce.H.useDeferredValue(t,e)};q.useEffect=function(t,e,i){var n=ce.H;if(typeof i=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return n.useEffect(t,e)};q.useId=function(){return ce.H.useId()};q.useImperativeHandle=function(t,e,i){return ce.H.useImperativeHandle(t,e,i)};q.useInsertionEffect=function(t,e){return ce.H.useInsertionEffect(t,e)};q.useLayoutEffect=function(t,e){return ce.H.useLayoutEffect(t,e)};q.useMemo=function(t,e){return ce.H.useMemo(t,e)};q.useOptimistic=function(t,e){return ce.H.useOptimistic(t,e)};q.useReducer=function(t,e,i){return ce.H.useReducer(t,e,i)};q.useRef=function(t){return ce.H.useRef(t)};q.useState=function(t){return ce.H.useState(t)};q.useSyncExternalStore=function(t,e,i){return ce.H.useSyncExternalStore(t,e,i)};q.useTransition=function(){return ce.H.useTransition()};q.version="19.1.1"});var ol=ln((bE,kg)=>{"use strict";kg.exports=Sg()});var Qg=ln(tt=>{"use strict";var qQ=ol();function vg(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)e+="&args[]="+encodeURIComponent(arguments[i])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function on(){}var et={d:{f:on,r:function(){throw Error(vg(522))},D:on,C:on,L:on,m:on,X:on,S:on,M:on},p:0,findDOMNode:null},YQ=Symbol.for("react.portal");function BQ(t,e,i){var n=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:YQ,key:n==null?null:""+n,children:t,containerInfo:e,implementation:i}}var ul=qQ.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function po(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=et;tt.createPortal=function(t,e){var i=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(vg(299));return BQ(t,e,null,i)};tt.flushSync=function(t){var e=ul.T,i=et.p;try{if(ul.T=null,et.p=2,t)return t()}finally{ul.T=e,et.p=i,et.d.f()}};tt.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,et.d.C(t,e))};tt.prefetchDNS=function(t){typeof t=="string"&&et.d.D(t)};tt.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var i=e.as,n=po(i,e.crossOrigin),s=typeof e.integrity=="string"?e.integrity:void 0,r=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;i==="style"?et.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:n,integrity:s,fetchPriority:r}):i==="script"&&et.d.X(t,{crossOrigin:n,integrity:s,fetchPriority:r,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};tt.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var i=po(e.as,e.crossOrigin);et.d.M(t,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&et.d.M(t)};tt.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var i=e.as,n=po(i,e.crossOrigin);et.d.L(t,i,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};tt.preloadModule=function(t,e){if(typeof t=="string")if(e){var i=po(e.as,e.crossOrigin);et.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else et.d.m(t)};tt.requestFormReset=function(t){et.d.r(t)};tt.unstable_batchedUpdates=function(t,e){return t(e)};tt.useFormState=function(t,e,i){return ul.H.useFormState(t,e,i)};tt.useFormStatus=function(){return ul.H.useHostTransitionStatus()};tt.version="19.1.1"});var Pg=ln((SE,Tg)=>{"use strict";function wg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wg)}catch(t){console.error(t)}}wg(),Tg.exports=Qg()});var Ab=ln(Zu=>{"use strict";var Re=ug(),I0=ol(),jQ=Pg();function Q(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var i=2;i<arguments.length;i++)e+="&args[]="+encodeURIComponent(arguments[i])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function H0(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Hl(t){var e=t,i=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(i=e.return),t=e.return;while(t)}return e.tag===3?i:null}function K0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function $g(t){if(Hl(t)!==t)throw Error(Q(188))}function LQ(t){var e=t.alternate;if(!e){if(e=Hl(t),e===null)throw Error(Q(188));return e!==t?null:t}for(var i=t,n=e;;){var s=i.return;if(s===null)break;var r=s.alternate;if(r===null){if(n=s.return,n!==null){i=n;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===i)return $g(s),t;if(r===n)return $g(s),e;r=r.sibling}throw Error(Q(188))}if(i.return!==n.return)i=s,n=r;else{for(var l=!1,a=s.child;a;){if(a===i){l=!0,i=s,n=r;break}if(a===n){l=!0,n=s,i=r;break}a=a.sibling}if(!l){for(a=r.child;a;){if(a===i){l=!0,i=r,n=s;break}if(a===n){l=!0,n=r,i=s;break}a=a.sibling}if(!l)throw Error(Q(189))}}if(i.alternate!==n)throw Error(Q(190))}if(i.tag!==3)throw Error(Q(188));return i.stateNode.current===i?t:e}function J0(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=J0(t),e!==null)return e;t=t.sibling}return null}var ae=Object.assign,VQ=Symbol.for("react.element"),mo=Symbol.for("react.transitional.element"),yl=Symbol.for("react.portal"),Hs=Symbol.for("react.fragment"),F0=Symbol.for("react.strict_mode"),Fh=Symbol.for("react.profiler"),GQ=Symbol.for("react.provider"),ey=Symbol.for("react.consumer"),qi=Symbol.for("react.context"),If=Symbol.for("react.forward_ref"),ef=Symbol.for("react.suspense"),tf=Symbol.for("react.suspense_list"),Hf=Symbol.for("react.memo"),hn=Symbol.for("react.lazy");Symbol.for("react.scope");var nf=Symbol.for("react.activity");Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var UQ=Symbol.for("react.memo_cache_sentinel");Symbol.for("react.view_transition");var Ag=Symbol.iterator;function cl(t){return t===null||typeof t!="object"?null:(t=Ag&&t[Ag]||t["@@iterator"],typeof t=="function"?t:null)}var WQ=Symbol.for("react.client.reference");function sf(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===WQ?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Hs:return"Fragment";case Fh:return"Profiler";case F0:return"StrictMode";case ef:return"Suspense";case tf:return"SuspenseList";case nf:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case yl:return"Portal";case qi:return(t.displayName||"Context")+".Provider";case ey:return(t._context.displayName||"Context")+".Consumer";case If:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Hf:return e=t.displayName||null,e!==null?e:sf(t.type)||"Memo";case hn:e=t._payload,t=t._init;try{return sf(t(e))}catch{}}return null}var bl=Array.isArray,Z=I0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,H=jQ.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ss={pending:!1,data:null,method:null,action:null},rf=[],Ks=-1;function bi(t){return{current:t}}function _e(t){0>Ks||(t.current=rf[Ks],rf[Ks]=null,Ks--)}function fe(t,e){Ks++,rf[Ks]=t.current,t.current=e}var Oi=bi(null),Zl=bi(null),Sn=bi(null),Vo=bi(null);function Go(t,e){switch(fe(Sn,e),fe(Zl,t),fe(Oi,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?_0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=_0(e),t=gb(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}_e(Oi),fe(Oi,t)}function Or(){_e(Oi),_e(Zl),_e(Sn)}function lf(t){t.memoizedState!==null&&fe(Vo,t);var e=Oi.current,i=gb(e,t.type);e!==i&&(fe(Zl,t),fe(Oi,i))}function Uo(t){Zl.current===t&&(_e(Oi),_e(Zl)),Vo.current===t&&(_e(Vo),Gl._currentValue=ss)}var af=Object.prototype.hasOwnProperty,Kf=Re.unstable_scheduleCallback,kh=Re.unstable_cancelCallback,IQ=Re.unstable_shouldYield,HQ=Re.unstable_requestPaint,gi=Re.unstable_now,KQ=Re.unstable_getCurrentPriorityLevel,ty=Re.unstable_ImmediatePriority,iy=Re.unstable_UserBlockingPriority,Wo=Re.unstable_NormalPriority,JQ=Re.unstable_LowPriority,ny=Re.unstable_IdlePriority,FQ=Re.log,ew=Re.unstable_setDisableYieldValue,Kl=null,kt=null;function gn(t){if(typeof FQ=="function"&&ew(t),kt&&typeof kt.setStrictMode=="function")try{kt.setStrictMode(Kl,t)}catch{}}var vt=Math.clz32?Math.clz32:nw,tw=Math.log,iw=Math.LN2;function nw(t){return t>>>=0,t===0?32:31-(tw(t)/iw|0)|0}var Oo=256,go=4194304;function ts(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Su(t,e,i){var n=t.pendingLanes;if(n===0)return 0;var s=0,r=t.suspendedLanes,l=t.pingedLanes;t=t.warmLanes;var a=n&134217727;return a!==0?(n=a&~r,n!==0?s=ts(n):(l&=a,l!==0?s=ts(l):i||(i=a&~t,i!==0&&(s=ts(i))))):(a=n&~r,a!==0?s=ts(a):l!==0?s=ts(l):i||(i=n&~t,i!==0&&(s=ts(i)))),s===0?0:e!==0&&e!==s&&(e&r)===0&&(r=s&-s,i=e&-e,r>=i||r===32&&(i&4194048)!==0)?e:s}function Jl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function sw(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sy(){var t=Oo;return Oo<<=1,(Oo&4194048)===0&&(Oo=256),t}function ry(){var t=go;return go<<=1,(go&62914560)===0&&(go=4194304),t}function vh(t){for(var e=[],i=0;31>i;i++)e.push(t);return e}function Fl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function rw(t,e,i,n,s,r){var l=t.pendingLanes;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=i,t.entangledLanes&=i,t.errorRecoveryDisabledLanes&=i,t.shellSuspendCounter=0;var a=t.entanglements,o=t.expirationTimes,u=t.hiddenUpdates;for(i=l&~i;0<i;){var c=31-vt(i),h=1<<c;a[c]=0,o[c]=-1;var f=u[c];if(f!==null)for(u[c]=null,c=0;c<f.length;c++){var d=f[c];d!==null&&(d.lane&=-536870913)}i&=~h}n!==0&&ly(t,n,0),r!==0&&s===0&&t.tag!==0&&(t.suspendedLanes|=r&~(l&~e))}function ly(t,e,i){t.pendingLanes|=e,t.suspendedLanes&=~e;var n=31-vt(e);t.entangledLanes|=e,t.entanglements[n]=t.entanglements[n]|1073741824|i&4194090}function ay(t,e){var i=t.entangledLanes|=e;for(t=t.entanglements;i;){var n=31-vt(i),s=1<<n;s&e|t[n]&e&&(t[n]|=e),i&=~s}}function Jf(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Ff(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function oy(){var t=H.p;return t!==0?t:(t=window.event,t===void 0?32:Pb(t.type))}function lw(t,e){var i=H.p;try{return H.p=t,e()}finally{H.p=i}}var Mn=Math.random().toString(36).slice(2),Ie="__reactFiber$"+Mn,ht="__reactProps$"+Mn,Pr="__reactContainer$"+Mn,of="__reactEvents$"+Mn,aw="__reactListeners$"+Mn,ow="__reactHandles$"+Mn,Rg="__reactResources$"+Mn,ea="__reactMarker$"+Mn;function ed(t){delete t[Ie],delete t[ht],delete t[of],delete t[aw],delete t[ow]}function Js(t){var e=t[Ie];if(e)return e;for(var i=t.parentNode;i;){if(e=i[Pr]||i[Ie]){if(i=e.alternate,e.child!==null||i!==null&&i.child!==null)for(t=D0(t);t!==null;){if(i=t[Ie])return i;t=D0(t)}return e}t=i,i=t.parentNode}return null}function $r(t){if(t=t[Ie]||t[Pr]){var e=t.tag;if(e===5||e===6||e===13||e===26||e===27||e===3)return t}return null}function xl(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(Q(33))}function or(t){var e=t[Rg];return e||(e=t[Rg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Ee(t){t[ea]=!0}var uy=new Set,cy={};function ms(t,e){gr(t,e),gr(t+"Capture",e)}function gr(t,e){for(cy[t]=e,t=0;t<e.length;t++)uy.add(e[t])}var uw=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Cg={},Mg={};function cw(t){return af.call(Mg,t)?!0:af.call(Cg,t)?!1:uw.test(t)?Mg[t]=!0:(Cg[t]=!0,!1)}function Mo(t,e,i){if(cw(e))if(i===null)t.removeAttribute(e);else{switch(typeof i){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var n=e.toLowerCase().slice(0,5);if(n!=="data-"&&n!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+i)}}function yo(t,e,i){if(i===null)t.removeAttribute(e);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+i)}}function Zi(t,e,i,n){if(n===null)t.removeAttribute(i);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(i);return}t.setAttributeNS(e,i,""+n)}}var Qh,Eg;function Us(t){if(Qh===void 0)try{throw Error()}catch(i){var e=i.stack.trim().match(/\n( *(at )?)/);Qh=e&&e[1]||"",Eg=-1<i.stack.indexOf(`
    at`)?" (<anonymous>)":-1<i.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Qh+t+Eg}var wh=!1;function Th(t,e){if(!t||wh)return"";wh=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var n={DetermineComponentFrameRoot:function(){try{if(e){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(d){var f=d}Reflect.construct(t,[],h)}else{try{h.call()}catch(d){f=d}t.call(h.prototype)}}else{try{throw Error()}catch(d){f=d}(h=t())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(d){if(d&&f&&typeof d.stack=="string")return[d.stack,f.stack]}return[null,null]}};n.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(n.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(n.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=n.DetermineComponentFrameRoot(),l=r[0],a=r[1];if(l&&a){var o=l.split(`
`),u=a.split(`
`);for(s=n=0;n<o.length&&!o[n].includes("DetermineComponentFrameRoot");)n++;for(;s<u.length&&!u[s].includes("DetermineComponentFrameRoot");)s++;if(n===o.length||s===u.length)for(n=o.length-1,s=u.length-1;1<=n&&0<=s&&o[n]!==u[s];)s--;for(;1<=n&&0<=s;n--,s--)if(o[n]!==u[s]){if(n!==1||s!==1)do if(n--,s--,0>s||o[n]!==u[s]){var c=`
`+o[n].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=n&&0<=s);break}}}finally{wh=!1,Error.prepareStackTrace=i}return(i=t?t.displayName||t.name:"")?Us(i):""}function hw(t){switch(t.tag){case 26:case 27:case 5:return Us(t.type);case 16:return Us("Lazy");case 13:return Us("Suspense");case 19:return Us("SuspenseList");case 0:case 15:return Th(t.type,!1);case 11:return Th(t.type.render,!1);case 1:return Th(t.type,!0);case 31:return Us("Activity");default:return""}}function zg(t){try{var e="";do e+=hw(t),t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}function Zt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function hy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function fw(t){var e=hy(t)?"checked":"value",i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),n=""+t[e];if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,r=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(l){n=""+l,r.call(this,l)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(l){n=""+l},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Io(t){t._valueTracker||(t._valueTracker=fw(t))}function fy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var i=e.getValue(),n="";return t&&(n=hy(t)?t.checked?"true":"false":t.value),t=n,t!==i?(e.setValue(t),!0):!1}function Ho(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var dw=/[\n"\\]/g;function Nt(t){return t.replace(dw,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function uf(t,e,i,n,s,r,l,a){t.name="",l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.type=l:t.removeAttribute("type"),e!=null?l==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Zt(e)):t.value!==""+Zt(e)&&(t.value=""+Zt(e)):l!=="submit"&&l!=="reset"||t.removeAttribute("value"),e!=null?cf(t,l,Zt(e)):i!=null?cf(t,l,Zt(i)):n!=null&&t.removeAttribute("value"),s==null&&r!=null&&(t.defaultChecked=!!r),s!=null&&(t.checked=s&&typeof s!="function"&&typeof s!="symbol"),a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?t.name=""+Zt(a):t.removeAttribute("name")}function dy(t,e,i,n,s,r,l,a){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.type=r),e!=null||i!=null){if(!(r!=="submit"&&r!=="reset"||e!=null))return;i=i!=null?""+Zt(i):"",e=e!=null?""+Zt(e):i,a||e===t.value||(t.value=e),t.defaultValue=e}n=n??s,n=typeof n!="function"&&typeof n!="symbol"&&!!n,t.checked=a?t.checked:!!n,t.defaultChecked=!!n,l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"&&(t.name=l)}function cf(t,e,i){e==="number"&&Ho(t.ownerDocument)===t||t.defaultValue===""+i||(t.defaultValue=""+i)}function ur(t,e,i,n){if(t=t.options,e){e={};for(var s=0;s<i.length;s++)e["$"+i[s]]=!0;for(i=0;i<t.length;i++)s=e.hasOwnProperty("$"+t[i].value),t[i].selected!==s&&(t[i].selected=s),s&&n&&(t[i].defaultSelected=!0)}else{for(i=""+Zt(i),e=null,s=0;s<t.length;s++){if(t[s].value===i){t[s].selected=!0,n&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function py(t,e,i){if(e!=null&&(e=""+Zt(e),e!==t.value&&(t.value=e),i==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=i!=null?""+Zt(i):""}function my(t,e,i,n){if(e==null){if(n!=null){if(i!=null)throw Error(Q(92));if(bl(n)){if(1<n.length)throw Error(Q(93));n=n[0]}i=n}i==null&&(i=""),e=i}i=Zt(e),t.defaultValue=i,n=t.textContent,n===i&&n!==""&&n!==null&&(t.value=n)}function yr(t,e){if(e){var i=t.firstChild;if(i&&i===t.lastChild&&i.nodeType===3){i.nodeValue=e;return}}t.textContent=e}var pw=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function _g(t,e,i){var n=e.indexOf("--")===0;i==null||typeof i=="boolean"||i===""?n?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":n?t.setProperty(e,i):typeof i!="number"||i===0||pw.has(e)?e==="float"?t.cssFloat=i:t[e]=(""+i).trim():t[e]=i+"px"}function Oy(t,e,i){if(e!=null&&typeof e!="object")throw Error(Q(62));if(t=t.style,i!=null){for(var n in i)!i.hasOwnProperty(n)||e!=null&&e.hasOwnProperty(n)||(n.indexOf("--")===0?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="");for(var s in e)n=e[s],e.hasOwnProperty(s)&&i[s]!==n&&_g(t,s,n)}else for(var r in e)e.hasOwnProperty(r)&&_g(t,r,e[r])}function td(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var mw=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ow=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Eo(t){return Ow.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}var hf=null;function id(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Fs=null,cr=null;function Zg(t){var e=$r(t);if(e&&(t=e.stateNode)){var i=t[ht]||null;e:switch(t=e.stateNode,e.type){case"input":if(uf(t,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name),e=i.name,i.type==="radio"&&e!=null){for(i=t;i.parentNode;)i=i.parentNode;for(i=i.querySelectorAll('input[name="'+Nt(""+e)+'"][type="radio"]'),e=0;e<i.length;e++){var n=i[e];if(n!==t&&n.form===t.form){var s=n[ht]||null;if(!s)throw Error(Q(90));uf(n,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(e=0;e<i.length;e++)n=i[e],n.form===t.form&&fy(n)}break e;case"textarea":py(t,i.value,i.defaultValue);break e;case"select":e=i.value,e!=null&&ur(t,!!i.multiple,e,!1)}}}var Ph=!1;function gy(t,e,i){if(Ph)return t(e,i);Ph=!0;try{var n=t(e);return n}finally{if(Ph=!1,(Fs!==null||cr!==null)&&(Cu(),Fs&&(e=Fs,t=cr,cr=Fs=null,Zg(e),t)))for(e=0;e<t.length;e++)Zg(t[e])}}function Xl(t,e){var i=t.stateNode;if(i===null)return null;var n=i[ht]||null;if(n===null)return null;i=n[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(n=!n.disabled)||(t=t.type,n=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!n;break e;default:t=!1}if(t)return null;if(i&&typeof i!="function")throw Error(Q(231,e,typeof i));return i}var Ui=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ff=!1;if(Ui)try{Ls={},Object.defineProperty(Ls,"passive",{get:function(){ff=!0}}),window.addEventListener("test",Ls,Ls),window.removeEventListener("test",Ls,Ls)}catch{ff=!1}var Ls,yn=null,nd=null,zo=null;function yy(){if(zo)return zo;var t,e=nd,i=e.length,n,s="value"in yn?yn.value:yn.textContent,r=s.length;for(t=0;t<i&&e[t]===s[t];t++);var l=i-t;for(n=1;n<=l&&e[i-n]===s[r-n];n++);return zo=s.slice(t,1<n?1-n:void 0)}function _o(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function bo(){return!0}function Xg(){return!1}function ft(t){function e(i,n,s,r,l){this._reactName=i,this._targetInst=s,this.type=n,this.nativeEvent=r,this.target=l,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(i=t[a],this[a]=i?i(r):r[a]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?bo:Xg,this.isPropagationStopped=Xg,this}return ae(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var i=this.nativeEvent;i&&(i.preventDefault?i.preventDefault():typeof i.returnValue!="unknown"&&(i.returnValue=!1),this.isDefaultPrevented=bo)},stopPropagation:function(){var i=this.nativeEvent;i&&(i.stopPropagation?i.stopPropagation():typeof i.cancelBubble!="unknown"&&(i.cancelBubble=!0),this.isPropagationStopped=bo)},persist:function(){},isPersistent:bo}),e}var Os={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ku=ft(Os),ta=ae({},Os,{view:0,detail:0}),gw=ft(ta),$h,Ah,hl,vu=ae({},ta,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==hl&&(hl&&t.type==="mousemove"?($h=t.screenX-hl.screenX,Ah=t.screenY-hl.screenY):Ah=$h=0,hl=t),$h)},movementY:function(t){return"movementY"in t?t.movementY:Ah}}),Dg=ft(vu),yw=ae({},vu,{dataTransfer:0}),bw=ft(yw),xw=ae({},ta,{relatedTarget:0}),Rh=ft(xw),Sw=ae({},Os,{animationName:0,elapsedTime:0,pseudoElement:0}),kw=ft(Sw),vw=ae({},Os,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Qw=ft(vw),ww=ae({},Os,{data:0}),Ng=ft(ww),Tw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Pw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},$w={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Aw(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=$w[t])?!!e[t]:!1}function sd(){return Aw}var Rw=ae({},ta,{key:function(t){if(t.key){var e=Tw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=_o(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Pw[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sd,charCode:function(t){return t.type==="keypress"?_o(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?_o(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Cw=ft(Rw),Mw=ae({},vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qg=ft(Mw),Ew=ae({},ta,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sd}),zw=ft(Ew),_w=ae({},Os,{propertyName:0,elapsedTime:0,pseudoElement:0}),Zw=ft(_w),Xw=ae({},vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Dw=ft(Xw),Nw=ae({},Os,{newState:0,oldState:0}),qw=ft(Nw),Yw=[9,13,27,32],rd=Ui&&"CompositionEvent"in window,kl=null;Ui&&"documentMode"in document&&(kl=document.documentMode);var Bw=Ui&&"TextEvent"in window&&!kl,by=Ui&&(!rd||kl&&8<kl&&11>=kl),Yg=" ",Bg=!1;function xy(t,e){switch(t){case"keyup":return Yw.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Sy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var er=!1;function jw(t,e){switch(t){case"compositionend":return Sy(e);case"keypress":return e.which!==32?null:(Bg=!0,Yg);case"textInput":return t=e.data,t===Yg&&Bg?null:t;default:return null}}function Lw(t,e){if(er)return t==="compositionend"||!rd&&xy(t,e)?(t=yy(),zo=nd=yn=null,er=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return by&&e.locale!=="ko"?null:e.data;default:return null}}var Vw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function jg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Vw[t.type]:e==="textarea"}function ky(t,e,i,n){Fs?cr?cr.push(n):cr=[n]:Fs=n,e=pu(e,"onChange"),0<e.length&&(i=new ku("onChange","change",null,i,n),t.push({event:i,listeners:e}))}var vl=null,Dl=null;function Gw(t){pb(t,0)}function Qu(t){var e=xl(t);if(fy(e))return t}function Lg(t,e){if(t==="change")return e}var vy=!1;Ui&&(Ui?(So="oninput"in document,So||(Ch=document.createElement("div"),Ch.setAttribute("oninput","return;"),So=typeof Ch.oninput=="function"),xo=So):xo=!1,vy=xo&&(!document.documentMode||9<document.documentMode));var xo,So,Ch;function Vg(){vl&&(vl.detachEvent("onpropertychange",Qy),Dl=vl=null)}function Qy(t){if(t.propertyName==="value"&&Qu(Dl)){var e=[];ky(e,Dl,t,id(t)),gy(Gw,e)}}function Uw(t,e,i){t==="focusin"?(Vg(),vl=e,Dl=i,vl.attachEvent("onpropertychange",Qy)):t==="focusout"&&Vg()}function Ww(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Qu(Dl)}function Iw(t,e){if(t==="click")return Qu(e)}function Hw(t,e){if(t==="input"||t==="change")return Qu(e)}function Kw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Tt=typeof Object.is=="function"?Object.is:Kw;function Nl(t,e){if(Tt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var i=Object.keys(t),n=Object.keys(e);if(i.length!==n.length)return!1;for(n=0;n<i.length;n++){var s=i[n];if(!af.call(e,s)||!Tt(t[s],e[s]))return!1}return!0}function Gg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ug(t,e){var i=Gg(t);t=0;for(var n;i;){if(i.nodeType===3){if(n=t+i.textContent.length,t<=e&&n>=e)return{node:i,offset:e-t};t=n}e:{for(;i;){if(i.nextSibling){i=i.nextSibling;break e}i=i.parentNode}i=void 0}i=Gg(i)}}function wy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?wy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Ty(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Ho(t.document);e instanceof t.HTMLIFrameElement;){try{var i=typeof e.contentWindow.location.href=="string"}catch{i=!1}if(i)t=e.contentWindow;else break;e=Ho(t.document)}return e}function ld(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Jw=Ui&&"documentMode"in document&&11>=document.documentMode,tr=null,df=null,Ql=null,pf=!1;function Wg(t,e,i){var n=i.window===i?i.document:i.nodeType===9?i:i.ownerDocument;pf||tr==null||tr!==Ho(n)||(n=tr,"selectionStart"in n&&ld(n)?n={start:n.selectionStart,end:n.selectionEnd}:(n=(n.ownerDocument&&n.ownerDocument.defaultView||window).getSelection(),n={anchorNode:n.anchorNode,anchorOffset:n.anchorOffset,focusNode:n.focusNode,focusOffset:n.focusOffset}),Ql&&Nl(Ql,n)||(Ql=n,n=pu(df,"onSelect"),0<n.length&&(e=new ku("onSelect","select",null,e,i),t.push({event:e,listeners:n}),e.target=tr)))}function es(t,e){var i={};return i[t.toLowerCase()]=e.toLowerCase(),i["Webkit"+t]="webkit"+e,i["Moz"+t]="moz"+e,i}var ir={animationend:es("Animation","AnimationEnd"),animationiteration:es("Animation","AnimationIteration"),animationstart:es("Animation","AnimationStart"),transitionrun:es("Transition","TransitionRun"),transitionstart:es("Transition","TransitionStart"),transitioncancel:es("Transition","TransitionCancel"),transitionend:es("Transition","TransitionEnd")},Mh={},Py={};Ui&&(Py=document.createElement("div").style,"AnimationEvent"in window||(delete ir.animationend.animation,delete ir.animationiteration.animation,delete ir.animationstart.animation),"TransitionEvent"in window||delete ir.transitionend.transition);function gs(t){if(Mh[t])return Mh[t];if(!ir[t])return t;var e=ir[t],i;for(i in e)if(e.hasOwnProperty(i)&&i in Py)return Mh[t]=e[i];return t}var $y=gs("animationend"),Ay=gs("animationiteration"),Ry=gs("animationstart"),Fw=gs("transitionrun"),eT=gs("transitionstart"),tT=gs("transitioncancel"),Cy=gs("transitionend"),My=new Map,mf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");mf.push("scrollEnd");function ii(t,e){My.set(t,e),ms(e,[t])}var Ig=new WeakMap;function qt(t,e){if(typeof t=="object"&&t!==null){var i=Ig.get(t);return i!==void 0?i:(e={value:t,source:e,stack:zg(e)},Ig.set(t,e),e)}return{value:t,source:e,stack:zg(e)}}var _t=[],nr=0,ad=0;function wu(){for(var t=nr,e=ad=nr=0;e<t;){var i=_t[e];_t[e++]=null;var n=_t[e];_t[e++]=null;var s=_t[e];_t[e++]=null;var r=_t[e];if(_t[e++]=null,n!==null&&s!==null){var l=n.pending;l===null?s.next=s:(s.next=l.next,l.next=s),n.pending=s}r!==0&&Ey(i,s,r)}}function Tu(t,e,i,n){_t[nr++]=t,_t[nr++]=e,_t[nr++]=i,_t[nr++]=n,ad|=n,t.lanes|=n,t=t.alternate,t!==null&&(t.lanes|=n)}function od(t,e,i,n){return Tu(t,e,i,n),Ko(t)}function Ar(t,e){return Tu(t,null,null,e),Ko(t)}function Ey(t,e,i){t.lanes|=i;var n=t.alternate;n!==null&&(n.lanes|=i);for(var s=!1,r=t.return;r!==null;)r.childLanes|=i,n=r.alternate,n!==null&&(n.childLanes|=i),r.tag===22&&(t=r.stateNode,t===null||t._visibility&1||(s=!0)),t=r,r=r.return;return t.tag===3?(r=t.stateNode,s&&e!==null&&(s=31-vt(i),t=r.hiddenUpdates,n=t[s],n===null?t[s]=[e]:n.push(e),e.lane=i|536870912),r):null}function Ko(t){if(50<zl)throw zl=0,Zf=null,Error(Q(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var sr={};function iT(t,e,i,n){this.tag=t,this.key=i,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=n,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function St(t,e,i,n){return new iT(t,e,i,n)}function ud(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Vi(t,e){var i=t.alternate;return i===null?(i=St(t.tag,e,t.key,t.mode),i.elementType=t.elementType,i.type=t.type,i.stateNode=t.stateNode,i.alternate=t,t.alternate=i):(i.pendingProps=e,i.type=t.type,i.flags=0,i.subtreeFlags=0,i.deletions=null),i.flags=t.flags&65011712,i.childLanes=t.childLanes,i.lanes=t.lanes,i.child=t.child,i.memoizedProps=t.memoizedProps,i.memoizedState=t.memoizedState,i.updateQueue=t.updateQueue,e=t.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},i.sibling=t.sibling,i.index=t.index,i.ref=t.ref,i.refCleanup=t.refCleanup,i}function zy(t,e){t.flags&=65011714;var i=t.alternate;return i===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=i.childLanes,t.lanes=i.lanes,t.child=i.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=i.memoizedProps,t.memoizedState=i.memoizedState,t.updateQueue=i.updateQueue,t.type=i.type,e=i.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Zo(t,e,i,n,s,r){var l=0;if(n=t,typeof t=="function")ud(t)&&(l=1);else if(typeof t=="string")l=i2(t,i,Oi.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case nf:return t=St(31,i,e,s),t.elementType=nf,t.lanes=r,t;case Hs:return rs(i.children,s,r,e);case F0:l=8,s|=24;break;case Fh:return t=St(12,i,e,s|2),t.elementType=Fh,t.lanes=r,t;case ef:return t=St(13,i,e,s),t.elementType=ef,t.lanes=r,t;case tf:return t=St(19,i,e,s),t.elementType=tf,t.lanes=r,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case GQ:case qi:l=10;break e;case ey:l=9;break e;case If:l=11;break e;case Hf:l=14;break e;case hn:l=16,n=null;break e}l=29,i=Error(Q(130,t===null?"null":typeof t,"")),n=null}return e=St(l,i,e,s),e.elementType=t,e.type=n,e.lanes=r,e}function rs(t,e,i,n){return t=St(7,t,n,e),t.lanes=i,t}function Eh(t,e,i){return t=St(6,t,null,e),t.lanes=i,t}function zh(t,e,i){return e=St(4,t.children!==null?t.children:[],t.key,e),e.lanes=i,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var rr=[],lr=0,Jo=null,Fo=0,Xt=[],Dt=0,ls=null,Yi=1,Bi="";function is(t,e){rr[lr++]=Fo,rr[lr++]=Jo,Jo=t,Fo=e}function _y(t,e,i){Xt[Dt++]=Yi,Xt[Dt++]=Bi,Xt[Dt++]=ls,ls=t;var n=Yi;t=Bi;var s=32-vt(n)-1;n&=~(1<<s),i+=1;var r=32-vt(e)+s;if(30<r){var l=s-s%5;r=(n&(1<<l)-1).toString(32),n>>=l,s-=l,Yi=1<<32-vt(e)+s|i<<s|n,Bi=r+t}else Yi=1<<r|i<<s|n,Bi=t}function cd(t){t.return!==null&&(is(t,1),_y(t,1,0))}function hd(t){for(;t===Jo;)Jo=rr[--lr],rr[lr]=null,Fo=rr[--lr],rr[lr]=null;for(;t===ls;)ls=Xt[--Dt],Xt[Dt]=null,Bi=Xt[--Dt],Xt[Dt]=null,Yi=Xt[--Dt],Xt[Dt]=null}var it=null,ge=null,I=!1,as=null,pi=!1,Of=Error(Q(519));function hs(t){var e=Error(Q(418,""));throw ql(qt(e,t)),Of}function Hg(t){var e=t.stateNode,i=t.type,n=t.memoizedProps;switch(e[Ie]=t,e[ht]=n,i){case"dialog":j("cancel",e),j("close",e);break;case"iframe":case"object":case"embed":j("load",e);break;case"video":case"audio":for(i=0;i<jl.length;i++)j(jl[i],e);break;case"source":j("error",e);break;case"img":case"image":case"link":j("error",e),j("load",e);break;case"details":j("toggle",e);break;case"input":j("invalid",e),dy(e,n.value,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name,!0),Io(e);break;case"select":j("invalid",e);break;case"textarea":j("invalid",e),my(e,n.value,n.defaultValue,n.children),Io(e)}i=n.children,typeof i!="string"&&typeof i!="number"&&typeof i!="bigint"||e.textContent===""+i||n.suppressHydrationWarning===!0||Ob(e.textContent,i)?(n.popover!=null&&(j("beforetoggle",e),j("toggle",e)),n.onScroll!=null&&j("scroll",e),n.onScrollEnd!=null&&j("scrollend",e),n.onClick!=null&&(e.onclick=zu),e=!0):e=!1,e||hs(t)}function Kg(t){for(it=t.return;it;)switch(it.tag){case 5:case 13:pi=!1;return;case 27:case 3:pi=!0;return;default:it=it.return}}function fl(t){if(t!==it)return!1;if(!I)return Kg(t),I=!0,!1;var e=t.tag,i;if((i=e!==3&&e!==27)&&((i=e===5)&&(i=t.type,i=!(i!=="form"&&i!=="button")||Bf(t.type,t.memoizedProps)),i=!i),i&&ge&&hs(t),Kg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(Q(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8)if(i=t.data,i==="/$"){if(e===0){ge=ti(t.nextSibling);break e}e--}else i!=="$"&&i!=="$!"&&i!=="$?"||e++;t=t.nextSibling}ge=null}}else e===27?(e=ge,En(t.type)?(t=Vf,Vf=null,ge=t):ge=e):ge=it?ti(t.stateNode.nextSibling):null;return!0}function ia(){ge=it=null,I=!1}function Jg(){var t=as;return t!==null&&(ct===null?ct=t:ct.push.apply(ct,t),as=null),t}function ql(t){as===null?as=[t]:as.push(t)}var gf=bi(null),ys=null,ji=null;function dn(t,e,i){fe(gf,e._currentValue),e._currentValue=i}function Gi(t){t._currentValue=gf.current,_e(gf)}function yf(t,e,i){for(;t!==null;){var n=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,n!==null&&(n.childLanes|=e)):n!==null&&(n.childLanes&e)!==e&&(n.childLanes|=e),t===i)break;t=t.return}}function bf(t,e,i,n){var s=t.child;for(s!==null&&(s.return=t);s!==null;){var r=s.dependencies;if(r!==null){var l=s.child;r=r.firstContext;e:for(;r!==null;){var a=r;r=s;for(var o=0;o<e.length;o++)if(a.context===e[o]){r.lanes|=i,a=r.alternate,a!==null&&(a.lanes|=i),yf(r.return,i,t),n||(l=null);break e}r=a.next}}else if(s.tag===18){if(l=s.return,l===null)throw Error(Q(341));l.lanes|=i,r=l.alternate,r!==null&&(r.lanes|=i),yf(l,i,t),l=null}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===t){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}}function na(t,e,i,n){t=null;for(var s=e,r=!1;s!==null;){if(!r){if((s.flags&524288)!==0)r=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var l=s.alternate;if(l===null)throw Error(Q(387));if(l=l.memoizedProps,l!==null){var a=s.type;Tt(s.pendingProps.value,l.value)||(t!==null?t.push(a):t=[a])}}else if(s===Vo.current){if(l=s.alternate,l===null)throw Error(Q(387));l.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(t!==null?t.push(Gl):t=[Gl])}s=s.return}t!==null&&bf(e,t,i,n),e.flags|=262144}function eu(t){for(t=t.firstContext;t!==null;){if(!Tt(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function fs(t){ys=t,ji=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function He(t){return Zy(ys,t)}function ko(t,e){return ys===null&&fs(t),Zy(t,e)}function Zy(t,e){var i=e._currentValue;if(e={context:e,memoizedValue:i,next:null},ji===null){if(t===null)throw Error(Q(308));ji=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else ji=ji.next=e;return i}var nT=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(i,n){t.push(n)}};this.abort=function(){e.aborted=!0,t.forEach(function(i){return i()})}},sT=Re.unstable_scheduleCallback,rT=Re.unstable_NormalPriority,$e={$$typeof:qi,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function fd(){return{controller:new nT,data:new Map,refCount:0}}function sa(t){t.refCount--,t.refCount===0&&sT(rT,function(){t.controller.abort()})}var wl=null,xf=0,br=0,hr=null;function lT(t,e){if(wl===null){var i=wl=[];xf=0,br=_d(),hr={status:"pending",value:void 0,then:function(n){i.push(n)}}}return xf++,e.then(Fg,Fg),e}function Fg(){if(--xf===0&&wl!==null){hr!==null&&(hr.status="fulfilled");var t=wl;wl=null,br=0,hr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function aT(t,e){var i=[],n={status:"pending",value:null,reason:null,then:function(s){i.push(s)}};return t.then(function(){n.status="fulfilled",n.value=e;for(var s=0;s<i.length;s++)(0,i[s])(e)},function(s){for(n.status="rejected",n.reason=s,s=0;s<i.length;s++)(0,i[s])(void 0)}),n}var e0=Z.S;Z.S=function(t,e){typeof e=="object"&&e!==null&&typeof e.then=="function"&&lT(t,e),e0!==null&&e0(t,e)};var os=bi(null);function dd(){var t=os.current;return t!==null?t:ne.pooledCache}function Xo(t,e){e===null?fe(os,os.current):fe(os,e.pool)}function Xy(){var t=dd();return t===null?null:{parent:$e._currentValue,pool:t}}var ra=Error(Q(460)),Dy=Error(Q(474)),Pu=Error(Q(542)),Sf={then:function(){}};function t0(t){return t=t.status,t==="fulfilled"||t==="rejected"}function vo(){}function Ny(t,e,i){switch(i=t[i],i===void 0?t.push(e):i!==e&&(e.then(vo,vo),e=i),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,n0(t),t;default:if(typeof e.status=="string")e.then(vo,vo);else{if(t=ne,t!==null&&100<t.shellSuspendCounter)throw Error(Q(482));t=e,t.status="pending",t.then(function(n){if(e.status==="pending"){var s=e;s.status="fulfilled",s.value=n}},function(n){if(e.status==="pending"){var s=e;s.status="rejected",s.reason=n}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,n0(t),t}throw Tl=e,ra}}var Tl=null;function i0(){if(Tl===null)throw Error(Q(459));var t=Tl;return Tl=null,t}function n0(t){if(t===ra||t===Pu)throw Error(Q(483))}var fn=!1;function pd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function kf(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function kn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function vn(t,e,i){var n=t.updateQueue;if(n===null)return null;if(n=n.shared,(J&2)!==0){var s=n.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),n.pending=e,e=Ko(t),Ey(t,null,i),e}return Tu(t,n,e,i),Ko(t)}function Pl(t,e,i){if(e=e.updateQueue,e!==null&&(e=e.shared,(i&4194048)!==0)){var n=e.lanes;n&=t.pendingLanes,i|=n,e.lanes=i,ay(t,i)}}function _h(t,e){var i=t.updateQueue,n=t.alternate;if(n!==null&&(n=n.updateQueue,i===n)){var s=null,r=null;if(i=i.firstBaseUpdate,i!==null){do{var l={lane:i.lane,tag:i.tag,payload:i.payload,callback:null,next:null};r===null?s=r=l:r=r.next=l,i=i.next}while(i!==null);r===null?s=r=e:r=r.next=e}else s=r=e;i={baseState:n.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:n.shared,callbacks:n.callbacks},t.updateQueue=i;return}t=i.lastBaseUpdate,t===null?i.firstBaseUpdate=e:t.next=e,i.lastBaseUpdate=e}var vf=!1;function $l(){if(vf){var t=hr;if(t!==null)throw t}}function Al(t,e,i,n){vf=!1;var s=t.updateQueue;fn=!1;var r=s.firstBaseUpdate,l=s.lastBaseUpdate,a=s.shared.pending;if(a!==null){s.shared.pending=null;var o=a,u=o.next;o.next=null,l===null?r=u:l.next=u,l=o;var c=t.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==l&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=o))}if(r!==null){var h=s.baseState;l=0,c=u=o=null,a=r;do{var f=a.lane&-536870913,d=f!==a.lane;if(d?(U&f)===f:(n&f)===f){f!==0&&f===br&&(vf=!0),c!==null&&(c=c.next={lane:0,tag:a.tag,payload:a.payload,callback:null,next:null});e:{var m=t,g=a;f=e;var x=i;switch(g.tag){case 1:if(m=g.payload,typeof m=="function"){h=m.call(x,h,f);break e}h=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m=="function"?m.call(x,h,f):m,f==null)break e;h=ae({},h,f);break e;case 2:fn=!0}}f=a.callback,f!==null&&(t.flags|=64,d&&(t.flags|=8192),d=s.callbacks,d===null?s.callbacks=[f]:d.push(f))}else d={lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=d,o=h):c=c.next=d,l|=f;if(a=a.next,a===null){if(a=s.shared.pending,a===null)break;d=a,a=d.next,d.next=null,s.lastBaseUpdate=d,s.shared.pending=null}}while(!0);c===null&&(o=h),s.baseState=o,s.firstBaseUpdate=u,s.lastBaseUpdate=c,r===null&&(s.shared.lanes=0),Cn|=l,t.lanes=l,t.memoizedState=h}}function qy(t,e){if(typeof t!="function")throw Error(Q(191,t));t.call(e)}function Yy(t,e){var i=t.callbacks;if(i!==null)for(t.callbacks=null,t=0;t<i.length;t++)qy(i[t],e)}var xr=bi(null),tu=bi(0);function s0(t,e){t=Hi,fe(tu,t),fe(xr,e),Hi=t|e.baseLanes}function Qf(){fe(tu,Hi),fe(xr,xr.current)}function md(){Hi=tu.current,_e(xr),_e(tu)}var An=0,Y=null,ee=null,Qe=null,iu=!1,fr=!1,ds=!1,nu=0,Yl=0,dr=null,oT=0;function xe(){throw Error(Q(321))}function Od(t,e){if(e===null)return!1;for(var i=0;i<e.length&&i<t.length;i++)if(!Tt(t[i],e[i]))return!1;return!0}function gd(t,e,i,n,s,r){return An=r,Y=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Z.H=t===null||t.memoizedState===null?y1:b1,ds=!1,r=i(n,s),ds=!1,fr&&(r=jy(e,i,n,s)),By(t),r}function By(t){Z.H=su;var e=ee!==null&&ee.next!==null;if(An=0,Qe=ee=Y=null,iu=!1,Yl=0,dr=null,e)throw Error(Q(300));t===null||ze||(t=t.dependencies,t!==null&&eu(t)&&(ze=!0))}function jy(t,e,i,n){Y=t;var s=0;do{if(fr&&(dr=null),Yl=0,fr=!1,25<=s)throw Error(Q(301));if(s+=1,Qe=ee=null,t.updateQueue!=null){var r=t.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}Z.H=mT,r=e(i,n)}while(fr);return r}function uT(){var t=Z.H,e=t.useState()[0];return e=typeof e.then=="function"?la(e):e,t=t.useState()[0],(ee!==null?ee.memoizedState:null)!==t&&(Y.flags|=1024),e}function yd(){var t=nu!==0;return nu=0,t}function bd(t,e,i){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i}function xd(t){if(iu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}iu=!1}An=0,Qe=ee=Y=null,fr=!1,Yl=nu=0,dr=null}function ot(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?Y.memoizedState=Qe=t:Qe=Qe.next=t,Qe}function we(){if(ee===null){var t=Y.alternate;t=t!==null?t.memoizedState:null}else t=ee.next;var e=Qe===null?Y.memoizedState:Qe.next;if(e!==null)Qe=e,ee=t;else{if(t===null)throw Y.alternate===null?Error(Q(467)):Error(Q(310));ee=t,t={memoizedState:ee.memoizedState,baseState:ee.baseState,baseQueue:ee.baseQueue,queue:ee.queue,next:null},Qe===null?Y.memoizedState=Qe=t:Qe=Qe.next=t}return Qe}function Sd(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function la(t){var e=Yl;return Yl+=1,dr===null&&(dr=[]),t=Ny(dr,t,e),e=Y,(Qe===null?e.memoizedState:Qe.next)===null&&(e=e.alternate,Z.H=e===null||e.memoizedState===null?y1:b1),t}function $u(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return la(t);if(t.$$typeof===qi)return He(t)}throw Error(Q(438,String(t)))}function kd(t){var e=null,i=Y.updateQueue;if(i!==null&&(e=i.memoCache),e==null){var n=Y.alternate;n!==null&&(n=n.updateQueue,n!==null&&(n=n.memoCache,n!=null&&(e={data:n.data.map(function(s){return s.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),i===null&&(i=Sd(),Y.updateQueue=i),i.memoCache=e,i=e.data[e.index],i===void 0)for(i=e.data[e.index]=Array(t),n=0;n<t;n++)i[n]=UQ;return e.index++,i}function Wi(t,e){return typeof e=="function"?e(t):e}function Do(t){var e=we();return vd(e,ee,t)}function vd(t,e,i){var n=t.queue;if(n===null)throw Error(Q(311));n.lastRenderedReducer=i;var s=t.baseQueue,r=n.pending;if(r!==null){if(s!==null){var l=s.next;s.next=r.next,r.next=l}e.baseQueue=s=r,n.pending=null}if(r=t.baseState,s===null)t.memoizedState=r;else{e=s.next;var a=l=null,o=null,u=e,c=!1;do{var h=u.lane&-536870913;if(h!==u.lane?(U&h)===h:(An&h)===h){var f=u.revertLane;if(f===0)o!==null&&(o=o.next={lane:0,revertLane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),h===br&&(c=!0);else if((An&f)===f){u=u.next,f===br&&(c=!0);continue}else h={lane:0,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},o===null?(a=o=h,l=r):o=o.next=h,Y.lanes|=f,Cn|=f;h=u.action,ds&&i(r,h),r=u.hasEagerState?u.eagerState:i(r,h)}else f={lane:h,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},o===null?(a=o=f,l=r):o=o.next=f,Y.lanes|=h,Cn|=h;u=u.next}while(u!==null&&u!==e);if(o===null?l=r:o.next=a,!Tt(r,t.memoizedState)&&(ze=!0,c&&(i=hr,i!==null)))throw i;t.memoizedState=r,t.baseState=l,t.baseQueue=o,n.lastRenderedState=r}return s===null&&(n.lanes=0),[t.memoizedState,n.dispatch]}function Zh(t){var e=we(),i=e.queue;if(i===null)throw Error(Q(311));i.lastRenderedReducer=t;var n=i.dispatch,s=i.pending,r=e.memoizedState;if(s!==null){i.pending=null;var l=s=s.next;do r=t(r,l.action),l=l.next;while(l!==s);Tt(r,e.memoizedState)||(ze=!0),e.memoizedState=r,e.baseQueue===null&&(e.baseState=r),i.lastRenderedState=r}return[r,n]}function Ly(t,e,i){var n=Y,s=we(),r=I;if(r){if(i===void 0)throw Error(Q(407));i=i()}else i=e();var l=!Tt((ee||s).memoizedState,i);l&&(s.memoizedState=i,ze=!0),s=s.queue;var a=Uy.bind(null,n,s,t);if(aa(2048,8,a,[t]),s.getSnapshot!==e||l||Qe!==null&&Qe.memoizedState.tag&1){if(n.flags|=2048,Sr(9,Au(),Gy.bind(null,n,s,i,e),null),ne===null)throw Error(Q(349));r||(An&124)!==0||Vy(n,e,i)}return i}function Vy(t,e,i){t.flags|=16384,t={getSnapshot:e,value:i},e=Y.updateQueue,e===null?(e=Sd(),Y.updateQueue=e,e.stores=[t]):(i=e.stores,i===null?e.stores=[t]:i.push(t))}function Gy(t,e,i,n){e.value=i,e.getSnapshot=n,Wy(e)&&Iy(t)}function Uy(t,e,i){return i(function(){Wy(e)&&Iy(t)})}function Wy(t){var e=t.getSnapshot;t=t.value;try{var i=e();return!Tt(t,i)}catch{return!0}}function Iy(t){var e=Ar(t,2);e!==null&&wt(e,t,2)}function wf(t){var e=ot();if(typeof t=="function"){var i=t;if(t=i(),ds){gn(!0);try{i()}finally{gn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:t},e}function Hy(t,e,i,n){return t.baseState=i,vd(t,ee,typeof n=="function"?n:Wi)}function cT(t,e,i,n,s){if(Ru(t))throw Error(Q(485));if(t=e.action,t!==null){var r={payload:s,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(l){r.listeners.push(l)}};Z.T!==null?i(!0):r.isTransition=!1,n(r),i=e.pending,i===null?(r.next=e.pending=r,Ky(e,r)):(r.next=i.next,e.pending=i.next=r)}}function Ky(t,e){var i=e.action,n=e.payload,s=t.state;if(e.isTransition){var r=Z.T,l={};Z.T=l;try{var a=i(s,n),o=Z.S;o!==null&&o(l,a),r0(t,e,a)}catch(u){Tf(t,e,u)}finally{Z.T=r}}else try{r=i(s,n),r0(t,e,r)}catch(u){Tf(t,e,u)}}function r0(t,e,i){i!==null&&typeof i=="object"&&typeof i.then=="function"?i.then(function(n){l0(t,e,n)},function(n){return Tf(t,e,n)}):l0(t,e,i)}function l0(t,e,i){e.status="fulfilled",e.value=i,Jy(e),t.state=i,e=t.pending,e!==null&&(i=e.next,i===e?t.pending=null:(i=i.next,e.next=i,Ky(t,i)))}function Tf(t,e,i){var n=t.pending;if(t.pending=null,n!==null){n=n.next;do e.status="rejected",e.reason=i,Jy(e),e=e.next;while(e!==n)}t.action=null}function Jy(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Fy(t,e){return e}function a0(t,e){if(I){var i=ne.formState;if(i!==null){e:{var n=Y;if(I){if(ge){t:{for(var s=ge,r=pi;s.nodeType!==8;){if(!r){s=null;break t}if(s=ti(s.nextSibling),s===null){s=null;break t}}r=s.data,s=r==="F!"||r==="F"?s:null}if(s){ge=ti(s.nextSibling),n=s.data==="F!";break e}}hs(n)}n=!1}n&&(e=i[0])}}return i=ot(),i.memoizedState=i.baseState=e,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Fy,lastRenderedState:e},i.queue=n,i=m1.bind(null,Y,n),n.dispatch=i,n=wf(!1),r=Pd.bind(null,Y,!1,n.queue),n=ot(),s={state:e,dispatch:null,action:t,pending:null},n.queue=s,i=cT.bind(null,Y,s,r,i),s.dispatch=i,n.memoizedState=t,[e,i,!1]}function o0(t){var e=we();return e1(e,ee,t)}function e1(t,e,i){if(e=vd(t,e,Fy)[0],t=Do(Wi)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var n=la(e)}catch(l){throw l===ra?Pu:l}else n=e;e=we();var s=e.queue,r=s.dispatch;return i!==e.memoizedState&&(Y.flags|=2048,Sr(9,Au(),hT.bind(null,s,i),null)),[n,r,t]}function hT(t,e){t.action=e}function u0(t){var e=we(),i=ee;if(i!==null)return e1(e,i,t);we(),e=e.memoizedState,i=we();var n=i.queue.dispatch;return i.memoizedState=t,[e,n,!1]}function Sr(t,e,i,n){return t={tag:t,create:i,deps:n,inst:e,next:null},e=Y.updateQueue,e===null&&(e=Sd(),Y.updateQueue=e),i=e.lastEffect,i===null?e.lastEffect=t.next=t:(n=i.next,i.next=t,t.next=n,e.lastEffect=t),t}function Au(){return{destroy:void 0,resource:void 0}}function t1(){return we().memoizedState}function No(t,e,i,n){var s=ot();n=n===void 0?null:n,Y.flags|=t,s.memoizedState=Sr(1|e,Au(),i,n)}function aa(t,e,i,n){var s=we();n=n===void 0?null:n;var r=s.memoizedState.inst;ee!==null&&n!==null&&Od(n,ee.memoizedState.deps)?s.memoizedState=Sr(e,r,i,n):(Y.flags|=t,s.memoizedState=Sr(1|e,r,i,n))}function c0(t,e){No(8390656,8,t,e)}function i1(t,e){aa(2048,8,t,e)}function n1(t,e){return aa(4,2,t,e)}function s1(t,e){return aa(4,4,t,e)}function r1(t,e){if(typeof e=="function"){t=t();var i=e(t);return function(){typeof i=="function"?i():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function l1(t,e,i){i=i!=null?i.concat([t]):null,aa(4,4,r1.bind(null,e,t),i)}function Qd(){}function a1(t,e){var i=we();e=e===void 0?null:e;var n=i.memoizedState;return e!==null&&Od(e,n[1])?n[0]:(i.memoizedState=[t,e],t)}function o1(t,e){var i=we();e=e===void 0?null:e;var n=i.memoizedState;if(e!==null&&Od(e,n[1]))return n[0];if(n=t(),ds){gn(!0);try{t()}finally{gn(!1)}}return i.memoizedState=[n,e],n}function wd(t,e,i){return i===void 0||(An&1073741824)!==0?t.memoizedState=e:(t.memoizedState=i,t=J1(),Y.lanes|=t,Cn|=t,i)}function u1(t,e,i,n){return Tt(i,e)?i:xr.current!==null?(t=wd(t,i,n),Tt(t,e)||(ze=!0),t):(An&42)===0?(ze=!0,t.memoizedState=i):(t=J1(),Y.lanes|=t,Cn|=t,e)}function c1(t,e,i,n,s){var r=H.p;H.p=r!==0&&8>r?r:8;var l=Z.T,a={};Z.T=a,Pd(t,!1,e,i);try{var o=s(),u=Z.S;if(u!==null&&u(a,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var c=aT(o,n);Rl(t,e,c,Qt(t))}else Rl(t,e,n,Qt(t))}catch(h){Rl(t,e,{then:function(){},status:"rejected",reason:h},Qt())}finally{H.p=r,Z.T=l}}function fT(){}function Pf(t,e,i,n){if(t.tag!==5)throw Error(Q(476));var s=h1(t).queue;c1(t,s,e,ss,i===null?fT:function(){return f1(t),i(n)})}function h1(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:ss,baseState:ss,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:ss},next:null};var i={};return e.next={memoizedState:i,baseState:i,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Wi,lastRenderedState:i},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function f1(t){var e=h1(t).next.queue;Rl(t,e,{},Qt())}function Td(){return He(Gl)}function d1(){return we().memoizedState}function p1(){return we().memoizedState}function dT(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var i=Qt();t=kn(i);var n=vn(e,t,i);n!==null&&(wt(n,e,i),Pl(n,e,i)),e={cache:fd()},t.payload=e;return}e=e.return}}function pT(t,e,i){var n=Qt();i={lane:n,revertLane:0,action:i,hasEagerState:!1,eagerState:null,next:null},Ru(t)?O1(e,i):(i=od(t,e,i,n),i!==null&&(wt(i,t,n),g1(i,e,n)))}function m1(t,e,i){var n=Qt();Rl(t,e,i,n)}function Rl(t,e,i,n){var s={lane:n,revertLane:0,action:i,hasEagerState:!1,eagerState:null,next:null};if(Ru(t))O1(e,s);else{var r=t.alternate;if(t.lanes===0&&(r===null||r.lanes===0)&&(r=e.lastRenderedReducer,r!==null))try{var l=e.lastRenderedState,a=r(l,i);if(s.hasEagerState=!0,s.eagerState=a,Tt(a,l))return Tu(t,e,s,0),ne===null&&wu(),!1}catch{}finally{}if(i=od(t,e,s,n),i!==null)return wt(i,t,n),g1(i,e,n),!0}return!1}function Pd(t,e,i,n){if(n={lane:2,revertLane:_d(),action:n,hasEagerState:!1,eagerState:null,next:null},Ru(t)){if(e)throw Error(Q(479))}else e=od(t,i,n,2),e!==null&&wt(e,t,2)}function Ru(t){var e=t.alternate;return t===Y||e!==null&&e===Y}function O1(t,e){fr=iu=!0;var i=t.pending;i===null?e.next=e:(e.next=i.next,i.next=e),t.pending=e}function g1(t,e,i){if((i&4194048)!==0){var n=e.lanes;n&=t.pendingLanes,i|=n,e.lanes=i,ay(t,i)}}var su={readContext:He,use:$u,useCallback:xe,useContext:xe,useEffect:xe,useImperativeHandle:xe,useLayoutEffect:xe,useInsertionEffect:xe,useMemo:xe,useReducer:xe,useRef:xe,useState:xe,useDebugValue:xe,useDeferredValue:xe,useTransition:xe,useSyncExternalStore:xe,useId:xe,useHostTransitionStatus:xe,useFormState:xe,useActionState:xe,useOptimistic:xe,useMemoCache:xe,useCacheRefresh:xe},y1={readContext:He,use:$u,useCallback:function(t,e){return ot().memoizedState=[t,e===void 0?null:e],t},useContext:He,useEffect:c0,useImperativeHandle:function(t,e,i){i=i!=null?i.concat([t]):null,No(4194308,4,r1.bind(null,e,t),i)},useLayoutEffect:function(t,e){return No(4194308,4,t,e)},useInsertionEffect:function(t,e){No(4,2,t,e)},useMemo:function(t,e){var i=ot();e=e===void 0?null:e;var n=t();if(ds){gn(!0);try{t()}finally{gn(!1)}}return i.memoizedState=[n,e],n},useReducer:function(t,e,i){var n=ot();if(i!==void 0){var s=i(e);if(ds){gn(!0);try{i(e)}finally{gn(!1)}}}else s=e;return n.memoizedState=n.baseState=s,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:s},n.queue=t,t=t.dispatch=pT.bind(null,Y,t),[n.memoizedState,t]},useRef:function(t){var e=ot();return t={current:t},e.memoizedState=t},useState:function(t){t=wf(t);var e=t.queue,i=m1.bind(null,Y,e);return e.dispatch=i,[t.memoizedState,i]},useDebugValue:Qd,useDeferredValue:function(t,e){var i=ot();return wd(i,t,e)},useTransition:function(){var t=wf(!1);return t=c1.bind(null,Y,t.queue,!0,!1),ot().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,i){var n=Y,s=ot();if(I){if(i===void 0)throw Error(Q(407));i=i()}else{if(i=e(),ne===null)throw Error(Q(349));(U&124)!==0||Vy(n,e,i)}s.memoizedState=i;var r={value:i,getSnapshot:e};return s.queue=r,c0(Uy.bind(null,n,r,t),[t]),n.flags|=2048,Sr(9,Au(),Gy.bind(null,n,r,i,e),null),i},useId:function(){var t=ot(),e=ne.identifierPrefix;if(I){var i=Bi,n=Yi;i=(n&~(1<<32-vt(n)-1)).toString(32)+i,e="\xAB"+e+"R"+i,i=nu++,0<i&&(e+="H"+i.toString(32)),e+="\xBB"}else i=oT++,e="\xAB"+e+"r"+i.toString(32)+"\xBB";return t.memoizedState=e},useHostTransitionStatus:Td,useFormState:a0,useActionState:a0,useOptimistic:function(t){var e=ot();e.memoizedState=e.baseState=t;var i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=i,e=Pd.bind(null,Y,!0,i),i.dispatch=e,[t,e]},useMemoCache:kd,useCacheRefresh:function(){return ot().memoizedState=dT.bind(null,Y)}},b1={readContext:He,use:$u,useCallback:a1,useContext:He,useEffect:i1,useImperativeHandle:l1,useInsertionEffect:n1,useLayoutEffect:s1,useMemo:o1,useReducer:Do,useRef:t1,useState:function(){return Do(Wi)},useDebugValue:Qd,useDeferredValue:function(t,e){var i=we();return u1(i,ee.memoizedState,t,e)},useTransition:function(){var t=Do(Wi)[0],e=we().memoizedState;return[typeof t=="boolean"?t:la(t),e]},useSyncExternalStore:Ly,useId:d1,useHostTransitionStatus:Td,useFormState:o0,useActionState:o0,useOptimistic:function(t,e){var i=we();return Hy(i,ee,t,e)},useMemoCache:kd,useCacheRefresh:p1},mT={readContext:He,use:$u,useCallback:a1,useContext:He,useEffect:i1,useImperativeHandle:l1,useInsertionEffect:n1,useLayoutEffect:s1,useMemo:o1,useReducer:Zh,useRef:t1,useState:function(){return Zh(Wi)},useDebugValue:Qd,useDeferredValue:function(t,e){var i=we();return ee===null?wd(i,t,e):u1(i,ee.memoizedState,t,e)},useTransition:function(){var t=Zh(Wi)[0],e=we().memoizedState;return[typeof t=="boolean"?t:la(t),e]},useSyncExternalStore:Ly,useId:d1,useHostTransitionStatus:Td,useFormState:u0,useActionState:u0,useOptimistic:function(t,e){var i=we();return ee!==null?Hy(i,ee,t,e):(i.baseState=t,[t,i.queue.dispatch])},useMemoCache:kd,useCacheRefresh:p1},pr=null,Bl=0;function Qo(t){var e=Bl;return Bl+=1,pr===null&&(pr=[]),Ny(pr,t,e)}function dl(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function wo(t,e){throw e.$$typeof===VQ?Error(Q(525)):(t=Object.prototype.toString.call(e),Error(Q(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function h0(t){var e=t._init;return e(t._payload)}function x1(t){function e(p,O){if(t){var y=p.deletions;y===null?(p.deletions=[O],p.flags|=16):y.push(O)}}function i(p,O){if(!t)return null;for(;O!==null;)e(p,O),O=O.sibling;return null}function n(p){for(var O=new Map;p!==null;)p.key!==null?O.set(p.key,p):O.set(p.index,p),p=p.sibling;return O}function s(p,O){return p=Vi(p,O),p.index=0,p.sibling=null,p}function r(p,O,y){return p.index=y,t?(y=p.alternate,y!==null?(y=y.index,y<O?(p.flags|=67108866,O):y):(p.flags|=67108866,O)):(p.flags|=1048576,O)}function l(p){return t&&p.alternate===null&&(p.flags|=67108866),p}function a(p,O,y,S){return O===null||O.tag!==6?(O=Eh(y,p.mode,S),O.return=p,O):(O=s(O,y),O.return=p,O)}function o(p,O,y,S){var k=y.type;return k===Hs?c(p,O,y.props.children,S,y.key):O!==null&&(O.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===hn&&h0(k)===O.type)?(O=s(O,y.props),dl(O,y),O.return=p,O):(O=Zo(y.type,y.key,y.props,null,p.mode,S),dl(O,y),O.return=p,O)}function u(p,O,y,S){return O===null||O.tag!==4||O.stateNode.containerInfo!==y.containerInfo||O.stateNode.implementation!==y.implementation?(O=zh(y,p.mode,S),O.return=p,O):(O=s(O,y.children||[]),O.return=p,O)}function c(p,O,y,S,k){return O===null||O.tag!==7?(O=rs(y,p.mode,S,k),O.return=p,O):(O=s(O,y),O.return=p,O)}function h(p,O,y){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return O=Eh(""+O,p.mode,y),O.return=p,O;if(typeof O=="object"&&O!==null){switch(O.$$typeof){case mo:return y=Zo(O.type,O.key,O.props,null,p.mode,y),dl(y,O),y.return=p,y;case yl:return O=zh(O,p.mode,y),O.return=p,O;case hn:var S=O._init;return O=S(O._payload),h(p,O,y)}if(bl(O)||cl(O))return O=rs(O,p.mode,y,null),O.return=p,O;if(typeof O.then=="function")return h(p,Qo(O),y);if(O.$$typeof===qi)return h(p,ko(p,O),y);wo(p,O)}return null}function f(p,O,y,S){var k=O!==null?O.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return k!==null?null:a(p,O,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case mo:return y.key===k?o(p,O,y,S):null;case yl:return y.key===k?u(p,O,y,S):null;case hn:return k=y._init,y=k(y._payload),f(p,O,y,S)}if(bl(y)||cl(y))return k!==null?null:c(p,O,y,S,null);if(typeof y.then=="function")return f(p,O,Qo(y),S);if(y.$$typeof===qi)return f(p,O,ko(p,y),S);wo(p,y)}return null}function d(p,O,y,S,k){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return p=p.get(y)||null,a(O,p,""+S,k);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case mo:return p=p.get(S.key===null?y:S.key)||null,o(O,p,S,k);case yl:return p=p.get(S.key===null?y:S.key)||null,u(O,p,S,k);case hn:var w=S._init;return S=w(S._payload),d(p,O,y,S,k)}if(bl(S)||cl(S))return p=p.get(y)||null,c(O,p,S,k,null);if(typeof S.then=="function")return d(p,O,y,Qo(S),k);if(S.$$typeof===qi)return d(p,O,y,ko(O,S),k);wo(O,S)}return null}function m(p,O,y,S){for(var k=null,w=null,v=O,P=O=0,z=null;v!==null&&P<y.length;P++){v.index>P?(z=v,v=null):z=v.sibling;var M=f(p,v,y[P],S);if(M===null){v===null&&(v=z);break}t&&v&&M.alternate===null&&e(p,v),O=r(M,O,P),w===null?k=M:w.sibling=M,w=M,v=z}if(P===y.length)return i(p,v),I&&is(p,P),k;if(v===null){for(;P<y.length;P++)v=h(p,y[P],S),v!==null&&(O=r(v,O,P),w===null?k=v:w.sibling=v,w=v);return I&&is(p,P),k}for(v=n(v);P<y.length;P++)z=d(v,p,P,y[P],S),z!==null&&(t&&z.alternate!==null&&v.delete(z.key===null?P:z.key),O=r(z,O,P),w===null?k=z:w.sibling=z,w=z);return t&&v.forEach(function(X){return e(p,X)}),I&&is(p,P),k}function g(p,O,y,S){if(y==null)throw Error(Q(151));for(var k=null,w=null,v=O,P=O=0,z=null,M=y.next();v!==null&&!M.done;P++,M=y.next()){v.index>P?(z=v,v=null):z=v.sibling;var X=f(p,v,M.value,S);if(X===null){v===null&&(v=z);break}t&&v&&X.alternate===null&&e(p,v),O=r(X,O,P),w===null?k=X:w.sibling=X,w=X,v=z}if(M.done)return i(p,v),I&&is(p,P),k;if(v===null){for(;!M.done;P++,M=y.next())M=h(p,M.value,S),M!==null&&(O=r(M,O,P),w===null?k=M:w.sibling=M,w=M);return I&&is(p,P),k}for(v=n(v);!M.done;P++,M=y.next())M=d(v,p,P,M.value,S),M!==null&&(t&&M.alternate!==null&&v.delete(M.key===null?P:M.key),O=r(M,O,P),w===null?k=M:w.sibling=M,w=M);return t&&v.forEach(function(T){return e(p,T)}),I&&is(p,P),k}function x(p,O,y,S){if(typeof y=="object"&&y!==null&&y.type===Hs&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case mo:e:{for(var k=y.key;O!==null;){if(O.key===k){if(k=y.type,k===Hs){if(O.tag===7){i(p,O.sibling),S=s(O,y.props.children),S.return=p,p=S;break e}}else if(O.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===hn&&h0(k)===O.type){i(p,O.sibling),S=s(O,y.props),dl(S,y),S.return=p,p=S;break e}i(p,O);break}else e(p,O);O=O.sibling}y.type===Hs?(S=rs(y.props.children,p.mode,S,y.key),S.return=p,p=S):(S=Zo(y.type,y.key,y.props,null,p.mode,S),dl(S,y),S.return=p,p=S)}return l(p);case yl:e:{for(k=y.key;O!==null;){if(O.key===k)if(O.tag===4&&O.stateNode.containerInfo===y.containerInfo&&O.stateNode.implementation===y.implementation){i(p,O.sibling),S=s(O,y.children||[]),S.return=p,p=S;break e}else{i(p,O);break}else e(p,O);O=O.sibling}S=zh(y,p.mode,S),S.return=p,p=S}return l(p);case hn:return k=y._init,y=k(y._payload),x(p,O,y,S)}if(bl(y))return m(p,O,y,S);if(cl(y)){if(k=cl(y),typeof k!="function")throw Error(Q(150));return y=k.call(y),g(p,O,y,S)}if(typeof y.then=="function")return x(p,O,Qo(y),S);if(y.$$typeof===qi)return x(p,O,ko(p,y),S);wo(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,O!==null&&O.tag===6?(i(p,O.sibling),S=s(O,y),S.return=p,p=S):(i(p,O),S=Eh(y,p.mode,S),S.return=p,p=S),l(p)):i(p,O)}return function(p,O,y,S){try{Bl=0;var k=x(p,O,y,S);return pr=null,k}catch(v){if(v===ra||v===Pu)throw v;var w=St(29,v,null,p.mode);return w.lanes=S,w.return=p,w}finally{}}}var kr=x1(!0),S1=x1(!1),Bt=bi(null),yi=null;function pn(t){var e=t.alternate;fe(Ae,Ae.current&1),fe(Bt,t),yi===null&&(e===null||xr.current!==null||e.memoizedState!==null)&&(yi=t)}function k1(t){if(t.tag===22){if(fe(Ae,Ae.current),fe(Bt,t),yi===null){var e=t.alternate;e!==null&&e.memoizedState!==null&&(yi=t)}}else mn(t)}function mn(){fe(Ae,Ae.current),fe(Bt,Bt.current)}function Li(t){_e(Bt),yi===t&&(yi=null),_e(Ae)}var Ae=bi(0);function ru(t){for(var e=t;e!==null;){if(e.tag===13){var i=e.memoizedState;if(i!==null&&(i=i.dehydrated,i===null||i.data==="$?"||Lf(i)))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}function Xh(t,e,i,n){e=t.memoizedState,i=i(n,e),i=i==null?e:ae({},e,i),t.memoizedState=i,t.lanes===0&&(t.updateQueue.baseState=i)}var $f={enqueueSetState:function(t,e,i){t=t._reactInternals;var n=Qt(),s=kn(n);s.payload=e,i!=null&&(s.callback=i),e=vn(t,s,n),e!==null&&(wt(e,t,n),Pl(e,t,n))},enqueueReplaceState:function(t,e,i){t=t._reactInternals;var n=Qt(),s=kn(n);s.tag=1,s.payload=e,i!=null&&(s.callback=i),e=vn(t,s,n),e!==null&&(wt(e,t,n),Pl(e,t,n))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var i=Qt(),n=kn(i);n.tag=2,e!=null&&(n.callback=e),e=vn(t,n,i),e!==null&&(wt(e,t,i),Pl(e,t,i))}};function f0(t,e,i,n,s,r,l){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(n,r,l):e.prototype&&e.prototype.isPureReactComponent?!Nl(i,n)||!Nl(s,r):!0}function d0(t,e,i,n){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(i,n),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(i,n),e.state!==t&&$f.enqueueReplaceState(e,e.state,null)}function ps(t,e){var i=e;if("ref"in e){i={};for(var n in e)n!=="ref"&&(i[n]=e[n])}if(t=t.defaultProps){i===e&&(i=ae({},i));for(var s in t)i[s]===void 0&&(i[s]=t[s])}return i}var lu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function v1(t){lu(t)}function Q1(t){console.error(t)}function w1(t){lu(t)}function au(t,e){try{var i=t.onUncaughtError;i(e.value,{componentStack:e.stack})}catch(n){setTimeout(function(){throw n})}}function p0(t,e,i){try{var n=t.onCaughtError;n(i.value,{componentStack:i.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function Af(t,e,i){return i=kn(i),i.tag=3,i.payload={element:null},i.callback=function(){au(t,e)},i}function T1(t){return t=kn(t),t.tag=3,t}function P1(t,e,i,n){var s=i.type.getDerivedStateFromError;if(typeof s=="function"){var r=n.value;t.payload=function(){return s(r)},t.callback=function(){p0(e,i,n)}}var l=i.stateNode;l!==null&&typeof l.componentDidCatch=="function"&&(t.callback=function(){p0(e,i,n),typeof s!="function"&&(Qn===null?Qn=new Set([this]):Qn.add(this));var a=n.stack;this.componentDidCatch(n.value,{componentStack:a!==null?a:""})})}function OT(t,e,i,n,s){if(i.flags|=32768,n!==null&&typeof n=="object"&&typeof n.then=="function"){if(e=i.alternate,e!==null&&na(e,i,s,!0),i=Bt.current,i!==null){switch(i.tag){case 13:return yi===null?Xf():i.alternate===null&&ye===0&&(ye=3),i.flags&=-257,i.flags|=65536,i.lanes=s,n===Sf?i.flags|=16384:(e=i.updateQueue,e===null?i.updateQueue=new Set([n]):e.add(n),Wh(t,n,s)),!1;case 22:return i.flags|=65536,n===Sf?i.flags|=16384:(e=i.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([n])},i.updateQueue=e):(i=e.retryQueue,i===null?e.retryQueue=new Set([n]):i.add(n)),Wh(t,n,s)),!1}throw Error(Q(435,i.tag))}return Wh(t,n,s),Xf(),!1}if(I)return e=Bt.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=s,n!==Of&&(t=Error(Q(422),{cause:n}),ql(qt(t,i)))):(n!==Of&&(e=Error(Q(423),{cause:n}),ql(qt(e,i))),t=t.current.alternate,t.flags|=65536,s&=-s,t.lanes|=s,n=qt(n,i),s=Af(t.stateNode,n,s),_h(t,s),ye!==4&&(ye=2)),!1;var r=Error(Q(520),{cause:n});if(r=qt(r,i),El===null?El=[r]:El.push(r),ye!==4&&(ye=2),e===null)return!0;n=qt(n,i),i=e;do{switch(i.tag){case 3:return i.flags|=65536,t=s&-s,i.lanes|=t,t=Af(i.stateNode,n,t),_h(i,t),!1;case 1:if(e=i.type,r=i.stateNode,(i.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(Qn===null||!Qn.has(r))))return i.flags|=65536,s&=-s,i.lanes|=s,s=T1(s),P1(s,t,i,n),_h(i,s),!1}i=i.return}while(i!==null);return!1}var $1=Error(Q(461)),ze=!1;function Ye(t,e,i,n){e.child=t===null?S1(e,null,i,n):kr(e,t.child,i,n)}function m0(t,e,i,n,s){i=i.render;var r=e.ref;if("ref"in n){var l={};for(var a in n)a!=="ref"&&(l[a]=n[a])}else l=n;return fs(e),n=gd(t,e,i,l,r,s),a=yd(),t!==null&&!ze?(bd(t,e,s),Ii(t,e,s)):(I&&a&&cd(e),e.flags|=1,Ye(t,e,n,s),e.child)}function O0(t,e,i,n,s){if(t===null){var r=i.type;return typeof r=="function"&&!ud(r)&&r.defaultProps===void 0&&i.compare===null?(e.tag=15,e.type=r,A1(t,e,r,n,s)):(t=Zo(i.type,null,n,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(r=t.child,!$d(t,s)){var l=r.memoizedProps;if(i=i.compare,i=i!==null?i:Nl,i(l,n)&&t.ref===e.ref)return Ii(t,e,s)}return e.flags|=1,t=Vi(r,n),t.ref=e.ref,t.return=e,e.child=t}function A1(t,e,i,n,s){if(t!==null){var r=t.memoizedProps;if(Nl(r,n)&&t.ref===e.ref)if(ze=!1,e.pendingProps=n=r,$d(t,s))(t.flags&131072)!==0&&(ze=!0);else return e.lanes=t.lanes,Ii(t,e,s)}return Rf(t,e,i,n,s)}function R1(t,e,i){var n=e.pendingProps,s=n.children,r=t!==null?t.memoizedState:null;if(n.mode==="hidden"){if((e.flags&128)!==0){if(n=r!==null?r.baseLanes|i:i,t!==null){for(s=e.child=t.child,r=0;s!==null;)r=r|s.lanes|s.childLanes,s=s.sibling;e.childLanes=r&~n}else e.childLanes=0,e.child=null;return g0(t,e,n,i)}if((i&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Xo(e,r!==null?r.cachePool:null),r!==null?s0(e,r):Qf(),k1(e);else return e.lanes=e.childLanes=536870912,g0(t,e,r!==null?r.baseLanes|i:i,i)}else r!==null?(Xo(e,r.cachePool),s0(e,r),mn(e),e.memoizedState=null):(t!==null&&Xo(e,null),Qf(),mn(e));return Ye(t,e,s,i),e.child}function g0(t,e,i,n){var s=dd();return s=s===null?null:{parent:$e._currentValue,pool:s},e.memoizedState={baseLanes:i,cachePool:s},t!==null&&Xo(e,null),Qf(),k1(e),t!==null&&na(t,e,n,!0),null}function qo(t,e){var i=e.ref;if(i===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof i!="function"&&typeof i!="object")throw Error(Q(284));(t===null||t.ref!==i)&&(e.flags|=4194816)}}function Rf(t,e,i,n,s){return fs(e),i=gd(t,e,i,n,void 0,s),n=yd(),t!==null&&!ze?(bd(t,e,s),Ii(t,e,s)):(I&&n&&cd(e),e.flags|=1,Ye(t,e,i,s),e.child)}function y0(t,e,i,n,s,r){return fs(e),e.updateQueue=null,i=jy(e,n,i,s),By(t),n=yd(),t!==null&&!ze?(bd(t,e,r),Ii(t,e,r)):(I&&n&&cd(e),e.flags|=1,Ye(t,e,i,r),e.child)}function b0(t,e,i,n,s){if(fs(e),e.stateNode===null){var r=sr,l=i.contextType;typeof l=="object"&&l!==null&&(r=He(l)),r=new i(n,r),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=$f,e.stateNode=r,r._reactInternals=e,r=e.stateNode,r.props=n,r.state=e.memoizedState,r.refs={},pd(e),l=i.contextType,r.context=typeof l=="object"&&l!==null?He(l):sr,r.state=e.memoizedState,l=i.getDerivedStateFromProps,typeof l=="function"&&(Xh(e,i,l,n),r.state=e.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(l=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),l!==r.state&&$f.enqueueReplaceState(r,r.state,null),Al(e,n,r,s),$l(),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308),n=!0}else if(t===null){r=e.stateNode;var a=e.memoizedProps,o=ps(i,a);r.props=o;var u=r.context,c=i.contextType;l=sr,typeof c=="object"&&c!==null&&(l=He(c));var h=i.getDerivedStateFromProps;c=typeof h=="function"||typeof r.getSnapshotBeforeUpdate=="function",a=e.pendingProps!==a,c||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(a||u!==l)&&d0(e,r,n,l),fn=!1;var f=e.memoizedState;r.state=f,Al(e,n,r,s),$l(),u=e.memoizedState,a||f!==u||fn?(typeof h=="function"&&(Xh(e,i,h,n),u=e.memoizedState),(o=fn||f0(e,i,o,n,f,u,l))?(c||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(e.flags|=4194308)):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=n,e.memoizedState=u),r.props=n,r.state=u,r.context=l,n=o):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),n=!1)}else{r=e.stateNode,kf(t,e),l=e.memoizedProps,c=ps(i,l),r.props=c,h=e.pendingProps,f=r.context,u=i.contextType,o=sr,typeof u=="object"&&u!==null&&(o=He(u)),a=i.getDerivedStateFromProps,(u=typeof a=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(l!==h||f!==o)&&d0(e,r,n,o),fn=!1,f=e.memoizedState,r.state=f,Al(e,n,r,s),$l();var d=e.memoizedState;l!==h||f!==d||fn||t!==null&&t.dependencies!==null&&eu(t.dependencies)?(typeof a=="function"&&(Xh(e,i,a,n),d=e.memoizedState),(c=fn||f0(e,i,c,n,f,d,o)||t!==null&&t.dependencies!==null&&eu(t.dependencies))?(u||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(n,d,o),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(n,d,o)),typeof r.componentDidUpdate=="function"&&(e.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof r.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=n,e.memoizedState=d),r.props=n,r.state=d,r.context=o,n=c):(typeof r.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),n=!1)}return r=n,qo(t,e),n=(e.flags&128)!==0,r||n?(r=e.stateNode,i=n&&typeof i.getDerivedStateFromError!="function"?null:r.render(),e.flags|=1,t!==null&&n?(e.child=kr(e,t.child,null,s),e.child=kr(e,null,i,s)):Ye(t,e,i,s),e.memoizedState=r.state,t=e.child):t=Ii(t,e,s),t}function x0(t,e,i,n){return ia(),e.flags|=256,Ye(t,e,i,n),e.child}var Dh={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Nh(t){return{baseLanes:t,cachePool:Xy()}}function qh(t,e,i){return t=t!==null?t.childLanes&~i:0,e&&(t|=Yt),t}function C1(t,e,i){var n=e.pendingProps,s=!1,r=(e.flags&128)!==0,l;if((l=r)||(l=t!==null&&t.memoizedState===null?!1:(Ae.current&2)!==0),l&&(s=!0,e.flags&=-129),l=(e.flags&32)!==0,e.flags&=-33,t===null){if(I){if(s?pn(e):mn(e),I){var a=ge,o;if(o=a){e:{for(o=a,a=pi;o.nodeType!==8;){if(!a){a=null;break e}if(o=ti(o.nextSibling),o===null){a=null;break e}}a=o}a!==null?(e.memoizedState={dehydrated:a,treeContext:ls!==null?{id:Yi,overflow:Bi}:null,retryLane:536870912,hydrationErrors:null},o=St(18,null,null,0),o.stateNode=a,o.return=e,e.child=o,it=e,ge=null,o=!0):o=!1}o||hs(e)}if(a=e.memoizedState,a!==null&&(a=a.dehydrated,a!==null))return Lf(a)?e.lanes=32:e.lanes=536870912,null;Li(e)}return a=n.children,n=n.fallback,s?(mn(e),s=e.mode,a=ou({mode:"hidden",children:a},s),n=rs(n,s,i,null),a.return=e,n.return=e,a.sibling=n,e.child=a,s=e.child,s.memoizedState=Nh(i),s.childLanes=qh(t,l,i),e.memoizedState=Dh,n):(pn(e),Cf(e,a))}if(o=t.memoizedState,o!==null&&(a=o.dehydrated,a!==null)){if(r)e.flags&256?(pn(e),e.flags&=-257,e=Yh(t,e,i)):e.memoizedState!==null?(mn(e),e.child=t.child,e.flags|=128,e=null):(mn(e),s=n.fallback,a=e.mode,n=ou({mode:"visible",children:n.children},a),s=rs(s,a,i,null),s.flags|=2,n.return=e,s.return=e,n.sibling=s,e.child=n,kr(e,t.child,null,i),n=e.child,n.memoizedState=Nh(i),n.childLanes=qh(t,l,i),e.memoizedState=Dh,e=s);else if(pn(e),Lf(a)){if(l=a.nextSibling&&a.nextSibling.dataset,l)var u=l.dgst;l=u,n=Error(Q(419)),n.stack="",n.digest=l,ql({value:n,source:null,stack:null}),e=Yh(t,e,i)}else if(ze||na(t,e,i,!1),l=(i&t.childLanes)!==0,ze||l){if(l=ne,l!==null&&(n=i&-i,n=(n&42)!==0?1:Jf(n),n=(n&(l.suspendedLanes|i))!==0?0:n,n!==0&&n!==o.retryLane))throw o.retryLane=n,Ar(t,n),wt(l,t,n),$1;a.data==="$?"||Xf(),e=Yh(t,e,i)}else a.data==="$?"?(e.flags|=192,e.child=t.child,e=null):(t=o.treeContext,ge=ti(a.nextSibling),it=e,I=!0,as=null,pi=!1,t!==null&&(Xt[Dt++]=Yi,Xt[Dt++]=Bi,Xt[Dt++]=ls,Yi=t.id,Bi=t.overflow,ls=e),e=Cf(e,n.children),e.flags|=4096);return e}return s?(mn(e),s=n.fallback,a=e.mode,o=t.child,u=o.sibling,n=Vi(o,{mode:"hidden",children:n.children}),n.subtreeFlags=o.subtreeFlags&65011712,u!==null?s=Vi(u,s):(s=rs(s,a,i,null),s.flags|=2),s.return=e,n.return=e,n.sibling=s,e.child=n,n=s,s=e.child,a=t.child.memoizedState,a===null?a=Nh(i):(o=a.cachePool,o!==null?(u=$e._currentValue,o=o.parent!==u?{parent:u,pool:u}:o):o=Xy(),a={baseLanes:a.baseLanes|i,cachePool:o}),s.memoizedState=a,s.childLanes=qh(t,l,i),e.memoizedState=Dh,n):(pn(e),i=t.child,t=i.sibling,i=Vi(i,{mode:"visible",children:n.children}),i.return=e,i.sibling=null,t!==null&&(l=e.deletions,l===null?(e.deletions=[t],e.flags|=16):l.push(t)),e.child=i,e.memoizedState=null,i)}function Cf(t,e){return e=ou({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function ou(t,e){return t=St(22,t,null,e),t.lanes=0,t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},t}function Yh(t,e,i){return kr(e,t.child,null,i),t=Cf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function S0(t,e,i){t.lanes|=e;var n=t.alternate;n!==null&&(n.lanes|=e),yf(t.return,e,i)}function Bh(t,e,i,n,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:n,tail:i,tailMode:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=n,r.tail=i,r.tailMode=s)}function M1(t,e,i){var n=e.pendingProps,s=n.revealOrder,r=n.tail;if(Ye(t,e,n.children,i),n=Ae.current,(n&2)!==0)n=n&1|2,e.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&S0(t,i,e);else if(t.tag===19)S0(t,i,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}n&=1}switch(fe(Ae,n),s){case"forwards":for(i=e.child,s=null;i!==null;)t=i.alternate,t!==null&&ru(t)===null&&(s=i),i=i.sibling;i=s,i===null?(s=e.child,e.child=null):(s=i.sibling,i.sibling=null),Bh(e,!1,s,i,r);break;case"backwards":for(i=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&ru(t)===null){e.child=s;break}t=s.sibling,s.sibling=i,i=s,s=t}Bh(e,!0,i,null,r);break;case"together":Bh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ii(t,e,i){if(t!==null&&(e.dependencies=t.dependencies),Cn|=e.lanes,(i&e.childLanes)===0)if(t!==null){if(na(t,e,i,!1),(i&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(Q(153));if(e.child!==null){for(t=e.child,i=Vi(t,t.pendingProps),e.child=i,i.return=e;t.sibling!==null;)t=t.sibling,i=i.sibling=Vi(t,t.pendingProps),i.return=e;i.sibling=null}return e.child}function $d(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&eu(t)))}function gT(t,e,i){switch(e.tag){case 3:Go(e,e.stateNode.containerInfo),dn(e,$e,t.memoizedState.cache),ia();break;case 27:case 5:lf(e);break;case 4:Go(e,e.stateNode.containerInfo);break;case 10:dn(e,e.type,e.memoizedProps.value);break;case 13:var n=e.memoizedState;if(n!==null)return n.dehydrated!==null?(pn(e),e.flags|=128,null):(i&e.child.childLanes)!==0?C1(t,e,i):(pn(e),t=Ii(t,e,i),t!==null?t.sibling:null);pn(e);break;case 19:var s=(t.flags&128)!==0;if(n=(i&e.childLanes)!==0,n||(na(t,e,i,!1),n=(i&e.childLanes)!==0),s){if(n)return M1(t,e,i);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),fe(Ae,Ae.current),n)break;return null;case 22:case 23:return e.lanes=0,R1(t,e,i);case 24:dn(e,$e,t.memoizedState.cache)}return Ii(t,e,i)}function E1(t,e,i){if(t!==null)if(t.memoizedProps!==e.pendingProps)ze=!0;else{if(!$d(t,i)&&(e.flags&128)===0)return ze=!1,gT(t,e,i);ze=(t.flags&131072)!==0}else ze=!1,I&&(e.flags&1048576)!==0&&_y(e,Fo,e.index);switch(e.lanes=0,e.tag){case 16:e:{t=e.pendingProps;var n=e.elementType,s=n._init;if(n=s(n._payload),e.type=n,typeof n=="function")ud(n)?(t=ps(n,t),e.tag=1,e=b0(null,e,n,t,i)):(e.tag=0,e=Rf(null,e,n,t,i));else{if(n!=null){if(s=n.$$typeof,s===If){e.tag=11,e=m0(null,e,n,t,i);break e}else if(s===Hf){e.tag=14,e=O0(null,e,n,t,i);break e}}throw e=sf(n)||n,Error(Q(306,e,""))}}return e;case 0:return Rf(t,e,e.type,e.pendingProps,i);case 1:return n=e.type,s=ps(n,e.pendingProps),b0(t,e,n,s,i);case 3:e:{if(Go(e,e.stateNode.containerInfo),t===null)throw Error(Q(387));n=e.pendingProps;var r=e.memoizedState;s=r.element,kf(t,e),Al(e,n,null,i);var l=e.memoizedState;if(n=l.cache,dn(e,$e,n),n!==r.cache&&bf(e,[$e],i,!0),$l(),n=l.element,r.isDehydrated)if(r={element:n,isDehydrated:!1,cache:l.cache},e.updateQueue.baseState=r,e.memoizedState=r,e.flags&256){e=x0(t,e,n,i);break e}else if(n!==s){s=qt(Error(Q(424)),e),ql(s),e=x0(t,e,n,i);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(ge=ti(t.firstChild),it=e,I=!0,as=null,pi=!0,i=S1(e,null,n,i),e.child=i;i;)i.flags=i.flags&-3|4096,i=i.sibling}else{if(ia(),n===s){e=Ii(t,e,i);break e}Ye(t,e,n,i)}e=e.child}return e;case 26:return qo(t,e),t===null?(i=q0(e.type,null,e.pendingProps,null))?e.memoizedState=i:I||(i=e.type,t=e.pendingProps,n=mu(Sn.current).createElement(i),n[Ie]=e,n[ht]=t,je(n,i,t),Ee(n),e.stateNode=n):e.memoizedState=q0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return lf(e),t===null&&I&&(n=e.stateNode=bb(e.type,e.pendingProps,Sn.current),it=e,pi=!0,s=ge,En(e.type)?(Vf=s,ge=ti(n.firstChild)):ge=s),Ye(t,e,e.pendingProps.children,i),qo(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&I&&((s=n=ge)&&(n=jT(n,e.type,e.pendingProps,pi),n!==null?(e.stateNode=n,it=e,ge=ti(n.firstChild),pi=!1,s=!0):s=!1),s||hs(e)),lf(e),s=e.type,r=e.pendingProps,l=t!==null?t.memoizedProps:null,n=r.children,Bf(s,r)?n=null:l!==null&&Bf(s,l)&&(e.flags|=32),e.memoizedState!==null&&(s=gd(t,e,uT,null,null,i),Gl._currentValue=s),qo(t,e),Ye(t,e,n,i),e.child;case 6:return t===null&&I&&((t=i=ge)&&(i=LT(i,e.pendingProps,pi),i!==null?(e.stateNode=i,it=e,ge=null,t=!0):t=!1),t||hs(e)),null;case 13:return C1(t,e,i);case 4:return Go(e,e.stateNode.containerInfo),n=e.pendingProps,t===null?e.child=kr(e,null,n,i):Ye(t,e,n,i),e.child;case 11:return m0(t,e,e.type,e.pendingProps,i);case 7:return Ye(t,e,e.pendingProps,i),e.child;case 8:return Ye(t,e,e.pendingProps.children,i),e.child;case 12:return Ye(t,e,e.pendingProps.children,i),e.child;case 10:return n=e.pendingProps,dn(e,e.type,n.value),Ye(t,e,n.children,i),e.child;case 9:return s=e.type._context,n=e.pendingProps.children,fs(e),s=He(s),n=n(s),e.flags|=1,Ye(t,e,n,i),e.child;case 14:return O0(t,e,e.type,e.pendingProps,i);case 15:return A1(t,e,e.type,e.pendingProps,i);case 19:return M1(t,e,i);case 31:return n=e.pendingProps,i=e.mode,n={mode:n.mode,children:n.children},t===null?(i=ou(n,i),i.ref=e.ref,e.child=i,i.return=e,e=i):(i=Vi(t.child,n),i.ref=e.ref,e.child=i,i.return=e,e=i),e;case 22:return R1(t,e,i);case 24:return fs(e),n=He($e),t===null?(s=dd(),s===null&&(s=ne,r=fd(),s.pooledCache=r,r.refCount++,r!==null&&(s.pooledCacheLanes|=i),s=r),e.memoizedState={parent:n,cache:s},pd(e),dn(e,$e,s)):((t.lanes&i)!==0&&(kf(t,e),Al(e,null,null,i),$l()),s=t.memoizedState,r=e.memoizedState,s.parent!==n?(s={parent:n,cache:n},e.memoizedState=s,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=s),dn(e,$e,n)):(n=r.cache,dn(e,$e,n),n!==s.cache&&bf(e,[$e],i,!0))),Ye(t,e,e.pendingProps.children,i),e.child;case 29:throw e.pendingProps}throw Error(Q(156,e.tag))}function Xi(t){t.flags|=4}function k0(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!kb(e)){if(e=Bt.current,e!==null&&((U&4194048)===U?yi!==null:(U&62914560)!==U&&(U&536870912)===0||e!==yi))throw Tl=Sf,Dy;t.flags|=8192}}function To(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?ry():536870912,t.lanes|=e,vr|=e)}function pl(t,e){if(!I)switch(t.tailMode){case"hidden":e=t.tail;for(var i=null;e!==null;)e.alternate!==null&&(i=e),e=e.sibling;i===null?t.tail=null:i.sibling=null;break;case"collapsed":i=t.tail;for(var n=null;i!==null;)i.alternate!==null&&(n=i),i=i.sibling;n===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:n.sibling=null}}function Oe(t){var e=t.alternate!==null&&t.alternate.child===t.child,i=0,n=0;if(e)for(var s=t.child;s!==null;)i|=s.lanes|s.childLanes,n|=s.subtreeFlags&65011712,n|=s.flags&65011712,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)i|=s.lanes|s.childLanes,n|=s.subtreeFlags,n|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=n,t.childLanes=i,e}function yT(t,e,i){var n=e.pendingProps;switch(hd(e),e.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Oe(e),null;case 1:return Oe(e),null;case 3:return i=e.stateNode,n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Gi($e),Or(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(fl(e)?Xi(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Jg())),Oe(e),null;case 26:return i=e.memoizedState,t===null?(Xi(e),i!==null?(Oe(e),k0(e,i)):(Oe(e),e.flags&=-16777217)):i?i!==t.memoizedState?(Xi(e),Oe(e),k0(e,i)):(Oe(e),e.flags&=-16777217):(t.memoizedProps!==n&&Xi(e),Oe(e),e.flags&=-16777217),null;case 27:Uo(e),i=Sn.current;var s=e.type;if(t!==null&&e.stateNode!=null)t.memoizedProps!==n&&Xi(e);else{if(!n){if(e.stateNode===null)throw Error(Q(166));return Oe(e),null}t=Oi.current,fl(e)?Hg(e,t):(t=bb(s,n,i),e.stateNode=t,Xi(e))}return Oe(e),null;case 5:if(Uo(e),i=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==n&&Xi(e);else{if(!n){if(e.stateNode===null)throw Error(Q(166));return Oe(e),null}if(t=Oi.current,fl(e))Hg(e,t);else{switch(s=mu(Sn.current),t){case 1:t=s.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:t=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":t=s.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":t=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":t=s.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild);break;case"select":t=typeof n.is=="string"?s.createElement("select",{is:n.is}):s.createElement("select"),n.multiple?t.multiple=!0:n.size&&(t.size=n.size);break;default:t=typeof n.is=="string"?s.createElement(i,{is:n.is}):s.createElement(i)}}t[Ie]=e,t[ht]=n;e:for(s=e.child;s!==null;){if(s.tag===5||s.tag===6)t.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break e;for(;s.sibling===null;){if(s.return===null||s.return===e)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}e.stateNode=t;e:switch(je(t,i,n),i){case"button":case"input":case"select":case"textarea":t=!!n.autoFocus;break e;case"img":t=!0;break e;default:t=!1}t&&Xi(e)}}return Oe(e),e.flags&=-16777217,null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==n&&Xi(e);else{if(typeof n!="string"&&e.stateNode===null)throw Error(Q(166));if(t=Sn.current,fl(e)){if(t=e.stateNode,i=e.memoizedProps,n=null,s=it,s!==null)switch(s.tag){case 27:case 5:n=s.memoizedProps}t[Ie]=e,t=!!(t.nodeValue===i||n!==null&&n.suppressHydrationWarning===!0||Ob(t.nodeValue,i)),t||hs(e)}else t=mu(t).createTextNode(n),t[Ie]=e,e.stateNode=t}return Oe(e),null;case 13:if(n=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(s=fl(e),n!==null&&n.dehydrated!==null){if(t===null){if(!s)throw Error(Q(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(Q(317));s[Ie]=e}else ia(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Oe(e),s=!1}else s=Jg(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=s),s=!0;if(!s)return e.flags&256?(Li(e),e):(Li(e),null)}if(Li(e),(e.flags&128)!==0)return e.lanes=i,e;if(i=n!==null,t=t!==null&&t.memoizedState!==null,i){n=e.child,s=null,n.alternate!==null&&n.alternate.memoizedState!==null&&n.alternate.memoizedState.cachePool!==null&&(s=n.alternate.memoizedState.cachePool.pool);var r=null;n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==s&&(n.flags|=2048)}return i!==t&&i&&(e.child.flags|=8192),To(e,e.updateQueue),Oe(e),null;case 4:return Or(),t===null&&Zd(e.stateNode.containerInfo),Oe(e),null;case 10:return Gi(e.type),Oe(e),null;case 19:if(_e(Ae),s=e.memoizedState,s===null)return Oe(e),null;if(n=(e.flags&128)!==0,r=s.rendering,r===null)if(n)pl(s,!1);else{if(ye!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(r=ru(t),r!==null){for(e.flags|=128,pl(s,!1),t=r.updateQueue,e.updateQueue=t,To(e,t),e.subtreeFlags=0,t=i,i=e.child;i!==null;)zy(i,t),i=i.sibling;return fe(Ae,Ae.current&1|2),e.child}t=t.sibling}s.tail!==null&&gi()>cu&&(e.flags|=128,n=!0,pl(s,!1),e.lanes=4194304)}else{if(!n)if(t=ru(r),t!==null){if(e.flags|=128,n=!0,t=t.updateQueue,e.updateQueue=t,To(e,t),pl(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!I)return Oe(e),null}else 2*gi()-s.renderingStartTime>cu&&i!==536870912&&(e.flags|=128,n=!0,pl(s,!1),e.lanes=4194304);s.isBackwards?(r.sibling=e.child,e.child=r):(t=s.last,t!==null?t.sibling=r:e.child=r,s.last=r)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=gi(),e.sibling=null,t=Ae.current,fe(Ae,n?t&1|2:t&1),e):(Oe(e),null);case 22:case 23:return Li(e),md(),n=e.memoizedState!==null,t!==null?t.memoizedState!==null!==n&&(e.flags|=8192):n&&(e.flags|=8192),n?(i&536870912)!==0&&(e.flags&128)===0&&(Oe(e),e.subtreeFlags&6&&(e.flags|=8192)):Oe(e),i=e.updateQueue,i!==null&&To(e,i.retryQueue),i=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),n=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),n!==i&&(e.flags|=2048),t!==null&&_e(os),null;case 24:return i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Gi($e),Oe(e),null;case 25:return null;case 30:return null}throw Error(Q(156,e.tag))}function bT(t,e){switch(hd(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Gi($e),Or(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Uo(e),null;case 13:if(Li(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(Q(340));ia()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return _e(Ae),null;case 4:return Or(),null;case 10:return Gi(e.type),null;case 22:case 23:return Li(e),md(),t!==null&&_e(os),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Gi($e),null;case 25:return null;default:return null}}function z1(t,e){switch(hd(e),e.tag){case 3:Gi($e),Or();break;case 26:case 27:case 5:Uo(e);break;case 4:Or();break;case 13:Li(e);break;case 19:_e(Ae);break;case 10:Gi(e.type);break;case 22:case 23:Li(e),md(),t!==null&&_e(os);break;case 24:Gi($e)}}function oa(t,e){try{var i=e.updateQueue,n=i!==null?i.lastEffect:null;if(n!==null){var s=n.next;i=s;do{if((i.tag&t)===t){n=void 0;var r=i.create,l=i.inst;n=r(),l.destroy=n}i=i.next}while(i!==s)}}catch(a){te(e,e.return,a)}}function Rn(t,e,i){try{var n=e.updateQueue,s=n!==null?n.lastEffect:null;if(s!==null){var r=s.next;n=r;do{if((n.tag&t)===t){var l=n.inst,a=l.destroy;if(a!==void 0){l.destroy=void 0,s=e;var o=i,u=a;try{u()}catch(c){te(s,o,c)}}}n=n.next}while(n!==r)}}catch(c){te(e,e.return,c)}}function _1(t){var e=t.updateQueue;if(e!==null){var i=t.stateNode;try{Yy(e,i)}catch(n){te(t,t.return,n)}}}function Z1(t,e,i){i.props=ps(t.type,t.memoizedProps),i.state=t.memoizedState;try{i.componentWillUnmount()}catch(n){te(t,e,n)}}function Cl(t,e){try{var i=t.ref;if(i!==null){switch(t.tag){case 26:case 27:case 5:var n=t.stateNode;break;case 30:n=t.stateNode;break;default:n=t.stateNode}typeof i=="function"?t.refCleanup=i(n):i.current=n}}catch(s){te(t,e,s)}}function mi(t,e){var i=t.ref,n=t.refCleanup;if(i!==null)if(typeof n=="function")try{n()}catch(s){te(t,e,s)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof i=="function")try{i(null)}catch(s){te(t,e,s)}else i.current=null}function X1(t){var e=t.type,i=t.memoizedProps,n=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":i.autoFocus&&n.focus();break e;case"img":i.src?n.src=i.src:i.srcSet&&(n.srcset=i.srcSet)}}catch(s){te(t,t.return,s)}}function jh(t,e,i){try{var n=t.stateNode;DT(n,t.type,i,e),n[ht]=e}catch(s){te(t,t.return,s)}}function D1(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&En(t.type)||t.tag===4}function Lh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||D1(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&En(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Mf(t,e,i){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?(i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i).insertBefore(t,e):(e=i.nodeType===9?i.body:i.nodeName==="HTML"?i.ownerDocument.body:i,e.appendChild(t),i=i._reactRootContainer,i!=null||e.onclick!==null||(e.onclick=zu));else if(n!==4&&(n===27&&En(t.type)&&(i=t.stateNode,e=null),t=t.child,t!==null))for(Mf(t,e,i),t=t.sibling;t!==null;)Mf(t,e,i),t=t.sibling}function uu(t,e,i){var n=t.tag;if(n===5||n===6)t=t.stateNode,e?i.insertBefore(t,e):i.appendChild(t);else if(n!==4&&(n===27&&En(t.type)&&(i=t.stateNode),t=t.child,t!==null))for(uu(t,e,i),t=t.sibling;t!==null;)uu(t,e,i),t=t.sibling}function N1(t){var e=t.stateNode,i=t.memoizedProps;try{for(var n=t.type,s=e.attributes;s.length;)e.removeAttributeNode(s[0]);je(e,n,i),e[Ie]=t,e[ht]=i}catch(r){te(t,t.return,r)}}var Ni=!1,Se=!1,Vh=!1,v0=typeof WeakSet=="function"?WeakSet:Set,Me=null;function xT(t,e){if(t=t.containerInfo,qf=bu,t=Ty(t),ld(t)){if("selectionStart"in t)var i={start:t.selectionStart,end:t.selectionEnd};else e:{i=(i=t.ownerDocument)&&i.defaultView||window;var n=i.getSelection&&i.getSelection();if(n&&n.rangeCount!==0){i=n.anchorNode;var s=n.anchorOffset,r=n.focusNode;n=n.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break e}var l=0,a=-1,o=-1,u=0,c=0,h=t,f=null;t:for(;;){for(var d;h!==i||s!==0&&h.nodeType!==3||(a=l+s),h!==r||n!==0&&h.nodeType!==3||(o=l+n),h.nodeType===3&&(l+=h.nodeValue.length),(d=h.firstChild)!==null;)f=h,h=d;for(;;){if(h===t)break t;if(f===i&&++u===s&&(a=l),f===r&&++c===n&&(o=l),(d=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=d}i=a===-1||o===-1?null:{start:a,end:o}}else i=null}i=i||{start:0,end:0}}else i=null;for(Yf={focusedElem:t,selectionRange:i},bu=!1,Me=e;Me!==null;)if(e=Me,t=e.child,(e.subtreeFlags&1024)!==0&&t!==null)t.return=e,Me=t;else for(;Me!==null;){switch(e=Me,r=e.alternate,t=e.flags,e.tag){case 0:break;case 11:case 15:break;case 1:if((t&1024)!==0&&r!==null){t=void 0,i=e,s=r.memoizedProps,r=r.memoizedState,n=i.stateNode;try{var m=ps(i.type,s,i.elementType===i.type);t=n.getSnapshotBeforeUpdate(m,r),n.__reactInternalSnapshotBeforeUpdate=t}catch(g){te(i,i.return,g)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,i=t.nodeType,i===9)jf(t);else if(i===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":jf(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(Q(163))}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}}function q1(t,e,i){var n=i.flags;switch(i.tag){case 0:case 11:case 15:un(t,i),n&4&&oa(5,i);break;case 1:if(un(t,i),n&4)if(t=i.stateNode,e===null)try{t.componentDidMount()}catch(l){te(i,i.return,l)}else{var s=ps(i.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(s,e,t.__reactInternalSnapshotBeforeUpdate)}catch(l){te(i,i.return,l)}}n&64&&_1(i),n&512&&Cl(i,i.return);break;case 3:if(un(t,i),n&64&&(t=i.updateQueue,t!==null)){if(e=null,i.child!==null)switch(i.child.tag){case 27:case 5:e=i.child.stateNode;break;case 1:e=i.child.stateNode}try{Yy(t,e)}catch(l){te(i,i.return,l)}}break;case 27:e===null&&n&4&&N1(i);case 26:case 5:un(t,i),e===null&&n&4&&X1(i),n&512&&Cl(i,i.return);break;case 12:un(t,i);break;case 13:un(t,i),n&4&&j1(t,i),n&64&&(t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(i=AT.bind(null,i),VT(t,i))));break;case 22:if(n=i.memoizedState!==null||Ni,!n){e=e!==null&&e.memoizedState!==null||Se,s=Ni;var r=Se;Ni=n,(Se=e)&&!r?cn(t,i,(i.subtreeFlags&8772)!==0):un(t,i),Ni=s,Se=r}break;case 30:break;default:un(t,i)}}function Y1(t){var e=t.alternate;e!==null&&(t.alternate=null,Y1(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&ed(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var he=null,ut=!1;function Di(t,e,i){for(i=i.child;i!==null;)B1(t,e,i),i=i.sibling}function B1(t,e,i){if(kt&&typeof kt.onCommitFiberUnmount=="function")try{kt.onCommitFiberUnmount(Kl,i)}catch{}switch(i.tag){case 26:Se||mi(i,e),Di(t,e,i),i.memoizedState?i.memoizedState.count--:i.stateNode&&(i=i.stateNode,i.parentNode.removeChild(i));break;case 27:Se||mi(i,e);var n=he,s=ut;En(i.type)&&(he=i.stateNode,ut=!1),Di(t,e,i),_l(i.stateNode),he=n,ut=s;break;case 5:Se||mi(i,e);case 6:if(n=he,s=ut,he=null,Di(t,e,i),he=n,ut=s,he!==null)if(ut)try{(he.nodeType===9?he.body:he.nodeName==="HTML"?he.ownerDocument.body:he).removeChild(i.stateNode)}catch(r){te(i,e,r)}else try{he.removeChild(i.stateNode)}catch(r){te(i,e,r)}break;case 18:he!==null&&(ut?(t=he,X0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,i.stateNode),Il(t)):X0(he,i.stateNode));break;case 4:n=he,s=ut,he=i.stateNode.containerInfo,ut=!0,Di(t,e,i),he=n,ut=s;break;case 0:case 11:case 14:case 15:Se||Rn(2,i,e),Se||Rn(4,i,e),Di(t,e,i);break;case 1:Se||(mi(i,e),n=i.stateNode,typeof n.componentWillUnmount=="function"&&Z1(i,e,n)),Di(t,e,i);break;case 21:Di(t,e,i);break;case 22:Se=(n=Se)||i.memoizedState!==null,Di(t,e,i),Se=n;break;default:Di(t,e,i)}}function j1(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Il(t)}catch(i){te(e,e.return,i)}}function ST(t){switch(t.tag){case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new v0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new v0),e;default:throw Error(Q(435,t.tag))}}function Gh(t,e){var i=ST(t);e.forEach(function(n){var s=RT.bind(null,t,n);i.has(n)||(i.add(n),n.then(s,s))})}function yt(t,e){var i=e.deletions;if(i!==null)for(var n=0;n<i.length;n++){var s=i[n],r=t,l=e,a=l;e:for(;a!==null;){switch(a.tag){case 27:if(En(a.type)){he=a.stateNode,ut=!1;break e}break;case 5:he=a.stateNode,ut=!1;break e;case 3:case 4:he=a.stateNode.containerInfo,ut=!0;break e}a=a.return}if(he===null)throw Error(Q(160));B1(r,l,s),he=null,ut=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(e.subtreeFlags&13878)for(e=e.child;e!==null;)L1(e,t),e=e.sibling}var ei=null;function L1(t,e){var i=t.alternate,n=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:yt(e,t),bt(t),n&4&&(Rn(3,t,t.return),oa(3,t),Rn(5,t,t.return));break;case 1:yt(e,t),bt(t),n&512&&(Se||i===null||mi(i,i.return)),n&64&&Ni&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(i=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=i===null?n:i.concat(n))));break;case 26:var s=ei;if(yt(e,t),bt(t),n&512&&(Se||i===null||mi(i,i.return)),n&4){var r=i!==null?i.memoizedState:null;if(n=t.memoizedState,i===null)if(n===null)if(t.stateNode===null){e:{n=t.type,i=t.memoizedProps,s=s.ownerDocument||s;t:switch(n){case"title":r=s.getElementsByTagName("title")[0],(!r||r[ea]||r[Ie]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=s.createElement(n),s.head.insertBefore(r,s.querySelector("head > title"))),je(r,n,i),r[Ie]=t,Ee(r),n=r;break e;case"link":var l=B0("link","href",s).get(n+(i.href||""));if(l){for(var a=0;a<l.length;a++)if(r=l[a],r.getAttribute("href")===(i.href==null||i.href===""?null:i.href)&&r.getAttribute("rel")===(i.rel==null?null:i.rel)&&r.getAttribute("title")===(i.title==null?null:i.title)&&r.getAttribute("crossorigin")===(i.crossOrigin==null?null:i.crossOrigin)){l.splice(a,1);break t}}r=s.createElement(n),je(r,n,i),s.head.appendChild(r);break;case"meta":if(l=B0("meta","content",s).get(n+(i.content||""))){for(a=0;a<l.length;a++)if(r=l[a],r.getAttribute("content")===(i.content==null?null:""+i.content)&&r.getAttribute("name")===(i.name==null?null:i.name)&&r.getAttribute("property")===(i.property==null?null:i.property)&&r.getAttribute("http-equiv")===(i.httpEquiv==null?null:i.httpEquiv)&&r.getAttribute("charset")===(i.charSet==null?null:i.charSet)){l.splice(a,1);break t}}r=s.createElement(n),je(r,n,i),s.head.appendChild(r);break;default:throw Error(Q(468,n))}r[Ie]=t,Ee(r),n=r}t.stateNode=n}else j0(s,t.type,t.stateNode);else t.stateNode=Y0(s,n,t.memoizedProps);else r!==n?(r===null?i.stateNode!==null&&(i=i.stateNode,i.parentNode.removeChild(i)):r.count--,n===null?j0(s,t.type,t.stateNode):Y0(s,n,t.memoizedProps)):n===null&&t.stateNode!==null&&jh(t,t.memoizedProps,i.memoizedProps)}break;case 27:yt(e,t),bt(t),n&512&&(Se||i===null||mi(i,i.return)),i!==null&&n&4&&jh(t,t.memoizedProps,i.memoizedProps);break;case 5:if(yt(e,t),bt(t),n&512&&(Se||i===null||mi(i,i.return)),t.flags&32){s=t.stateNode;try{yr(s,"")}catch(d){te(t,t.return,d)}}n&4&&t.stateNode!=null&&(s=t.memoizedProps,jh(t,s,i!==null?i.memoizedProps:s)),n&1024&&(Vh=!0);break;case 6:if(yt(e,t),bt(t),n&4){if(t.stateNode===null)throw Error(Q(162));n=t.memoizedProps,i=t.stateNode;try{i.nodeValue=n}catch(d){te(t,t.return,d)}}break;case 3:if(jo=null,s=ei,ei=Ou(e.containerInfo),yt(e,t),ei=s,bt(t),n&4&&i!==null&&i.memoizedState.isDehydrated)try{Il(e.containerInfo)}catch(d){te(t,t.return,d)}Vh&&(Vh=!1,V1(t));break;case 4:n=ei,ei=Ou(t.stateNode.containerInfo),yt(e,t),bt(t),ei=n;break;case 12:yt(e,t),bt(t);break;case 13:yt(e,t),bt(t),t.child.flags&8192&&t.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(Ed=gi()),n&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Gh(t,n)));break;case 22:s=t.memoizedState!==null;var o=i!==null&&i.memoizedState!==null,u=Ni,c=Se;if(Ni=u||s,Se=c||o,yt(e,t),Se=c,Ni=u,bt(t),n&8192)e:for(e=t.stateNode,e._visibility=s?e._visibility&-2:e._visibility|1,s&&(i===null||o||Ni||Se||ns(t)),i=null,e=t;;){if(e.tag===5||e.tag===26){if(i===null){o=i=e;try{if(r=o.stateNode,s)l=r.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none";else{a=o.stateNode;var h=o.memoizedProps.style,f=h!=null&&h.hasOwnProperty("display")?h.display:null;a.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(d){te(o,o.return,d)}}}else if(e.tag===6){if(i===null){o=e;try{o.stateNode.nodeValue=s?"":o.memoizedProps}catch(d){te(o,o.return,d)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;i===e&&(i=null),e=e.return}i===e&&(i=null),e.sibling.return=e.return,e=e.sibling}n&4&&(n=t.updateQueue,n!==null&&(i=n.retryQueue,i!==null&&(n.retryQueue=null,Gh(t,i))));break;case 19:yt(e,t),bt(t),n&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Gh(t,n)));break;case 30:break;case 21:break;default:yt(e,t),bt(t)}}function bt(t){var e=t.flags;if(e&2){try{for(var i,n=t.return;n!==null;){if(D1(n)){i=n;break}n=n.return}if(i==null)throw Error(Q(160));switch(i.tag){case 27:var s=i.stateNode,r=Lh(t);uu(t,r,s);break;case 5:var l=i.stateNode;i.flags&32&&(yr(l,""),i.flags&=-33);var a=Lh(t);uu(t,a,l);break;case 3:case 4:var o=i.stateNode.containerInfo,u=Lh(t);Mf(t,u,o);break;default:throw Error(Q(161))}}catch(c){te(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function V1(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;V1(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function un(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)q1(t,e.alternate,e),e=e.sibling}function ns(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Rn(4,e,e.return),ns(e);break;case 1:mi(e,e.return);var i=e.stateNode;typeof i.componentWillUnmount=="function"&&Z1(e,e.return,i),ns(e);break;case 27:_l(e.stateNode);case 26:case 5:mi(e,e.return),ns(e);break;case 22:e.memoizedState===null&&ns(e);break;case 30:ns(e);break;default:ns(e)}t=t.sibling}}function cn(t,e,i){for(i=i&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var n=e.alternate,s=t,r=e,l=r.flags;switch(r.tag){case 0:case 11:case 15:cn(s,r,i),oa(4,r);break;case 1:if(cn(s,r,i),n=r,s=n.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(u){te(n,n.return,u)}if(n=r,s=n.updateQueue,s!==null){var a=n.stateNode;try{var o=s.shared.hiddenCallbacks;if(o!==null)for(s.shared.hiddenCallbacks=null,s=0;s<o.length;s++)qy(o[s],a)}catch(u){te(n,n.return,u)}}i&&l&64&&_1(r),Cl(r,r.return);break;case 27:N1(r);case 26:case 5:cn(s,r,i),i&&n===null&&l&4&&X1(r),Cl(r,r.return);break;case 12:cn(s,r,i);break;case 13:cn(s,r,i),i&&l&4&&j1(s,r);break;case 22:r.memoizedState===null&&cn(s,r,i),Cl(r,r.return);break;case 30:break;default:cn(s,r,i)}e=e.sibling}}function Ad(t,e){var i=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==i&&(t!=null&&t.refCount++,i!=null&&sa(i))}function Rd(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&sa(t))}function di(t,e,i,n){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)G1(t,e,i,n),e=e.sibling}function G1(t,e,i,n){var s=e.flags;switch(e.tag){case 0:case 11:case 15:di(t,e,i,n),s&2048&&oa(9,e);break;case 1:di(t,e,i,n);break;case 3:di(t,e,i,n),s&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&sa(t)));break;case 12:if(s&2048){di(t,e,i,n),t=e.stateNode;try{var r=e.memoizedProps,l=r.id,a=r.onPostCommit;typeof a=="function"&&a(l,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(o){te(e,e.return,o)}}else di(t,e,i,n);break;case 13:di(t,e,i,n);break;case 23:break;case 22:r=e.stateNode,l=e.alternate,e.memoizedState!==null?r._visibility&2?di(t,e,i,n):Ml(t,e):r._visibility&2?di(t,e,i,n):(r._visibility|=2,Ws(t,e,i,n,(e.subtreeFlags&10256)!==0)),s&2048&&Ad(l,e);break;case 24:di(t,e,i,n),s&2048&&Rd(e.alternate,e);break;default:di(t,e,i,n)}}function Ws(t,e,i,n,s){for(s=s&&(e.subtreeFlags&10256)!==0,e=e.child;e!==null;){var r=t,l=e,a=i,o=n,u=l.flags;switch(l.tag){case 0:case 11:case 15:Ws(r,l,a,o,s),oa(8,l);break;case 23:break;case 22:var c=l.stateNode;l.memoizedState!==null?c._visibility&2?Ws(r,l,a,o,s):Ml(r,l):(c._visibility|=2,Ws(r,l,a,o,s)),s&&u&2048&&Ad(l.alternate,l);break;case 24:Ws(r,l,a,o,s),s&&u&2048&&Rd(l.alternate,l);break;default:Ws(r,l,a,o,s)}e=e.sibling}}function Ml(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var i=t,n=e,s=n.flags;switch(n.tag){case 22:Ml(i,n),s&2048&&Ad(n.alternate,n);break;case 24:Ml(i,n),s&2048&&Rd(n.alternate,n);break;default:Ml(i,n)}e=e.sibling}}var Sl=8192;function Vs(t){if(t.subtreeFlags&Sl)for(t=t.child;t!==null;)U1(t),t=t.sibling}function U1(t){switch(t.tag){case 26:Vs(t),t.flags&Sl&&t.memoizedState!==null&&s2(ei,t.memoizedState,t.memoizedProps);break;case 5:Vs(t);break;case 3:case 4:var e=ei;ei=Ou(t.stateNode.containerInfo),Vs(t),ei=e;break;case 22:t.memoizedState===null&&(e=t.alternate,e!==null&&e.memoizedState!==null?(e=Sl,Sl=16777216,Vs(t),Sl=e):Vs(t));break;default:Vs(t)}}function W1(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function ml(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var i=0;i<e.length;i++){var n=e[i];Me=n,H1(n,t)}W1(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)I1(t),t=t.sibling}function I1(t){switch(t.tag){case 0:case 11:case 15:ml(t),t.flags&2048&&Rn(9,t,t.return);break;case 3:ml(t);break;case 12:ml(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Yo(t)):ml(t);break;default:ml(t)}}function Yo(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var i=0;i<e.length;i++){var n=e[i];Me=n,H1(n,t)}W1(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Rn(8,e,e.return),Yo(e);break;case 22:i=e.stateNode,i._visibility&2&&(i._visibility&=-3,Yo(e));break;default:Yo(e)}t=t.sibling}}function H1(t,e){for(;Me!==null;){var i=Me;switch(i.tag){case 0:case 11:case 15:Rn(8,i,e);break;case 23:case 22:if(i.memoizedState!==null&&i.memoizedState.cachePool!==null){var n=i.memoizedState.cachePool.pool;n!=null&&n.refCount++}break;case 24:sa(i.memoizedState.cache)}if(n=i.child,n!==null)n.return=i,Me=n;else e:for(i=t;Me!==null;){n=Me;var s=n.sibling,r=n.return;if(Y1(n),n===i){Me=null;break e}if(s!==null){s.return=r,Me=s;break e}Me=r}}}var kT={getCacheForType:function(t){var e=He($e),i=e.data.get(t);return i===void 0&&(i=t(),e.data.set(t,i)),i}},vT=typeof WeakMap=="function"?WeakMap:Map,J=0,ne=null,L=null,U=0,K=0,xt=null,bn=!1,Rr=!1,Cd=!1,Hi=0,ye=0,Cn=0,us=0,Md=0,Yt=0,vr=0,El=null,ct=null,Ef=!1,Ed=0,cu=1/0,hu=null,Qn=null,Be=0,wn=null,Qr=null,mr=0,zf=0,_f=null,K1=null,zl=0,Zf=null;function Qt(){if((J&2)!==0&&U!==0)return U&-U;if(Z.T!==null){var t=br;return t!==0?t:_d()}return oy()}function J1(){Yt===0&&(Yt=(U&536870912)===0||I?sy():536870912);var t=Bt.current;return t!==null&&(t.flags|=32),Yt}function wt(t,e,i){(t===ne&&(K===2||K===9)||t.cancelPendingCommit!==null)&&(wr(t,0),xn(t,U,Yt,!1)),Fl(t,i),((J&2)===0||t!==ne)&&(t===ne&&((J&2)===0&&(us|=i),ye===4&&xn(t,U,Yt,!1)),xi(t))}function F1(t,e,i){if((J&6)!==0)throw Error(Q(327));var n=!i&&(e&124)===0&&(e&t.expiredLanes)===0||Jl(t,e),s=n?TT(t,e):Uh(t,e,!0),r=n;do{if(s===0){Rr&&!n&&xn(t,e,0,!1);break}else{if(i=t.current.alternate,r&&!QT(i)){s=Uh(t,e,!1),r=!1;continue}if(s===2){if(r=e,t.errorRecoveryDisabledLanes&r)var l=0;else l=t.pendingLanes&-536870913,l=l!==0?l:l&536870912?536870912:0;if(l!==0){e=l;e:{var a=t;s=El;var o=a.current.memoizedState.isDehydrated;if(o&&(wr(a,l).flags|=256),l=Uh(a,l,!1),l!==2){if(Cd&&!o){a.errorRecoveryDisabledLanes|=r,us|=r,s=4;break e}r=ct,ct=s,r!==null&&(ct===null?ct=r:ct.push.apply(ct,r))}s=l}if(r=!1,s!==2)continue}}if(s===1){wr(t,0),xn(t,e,0,!0);break}e:{switch(n=t,r=s,r){case 0:case 1:throw Error(Q(345));case 4:if((e&4194048)!==e)break;case 6:xn(n,e,Yt,!bn);break e;case 2:ct=null;break;case 3:case 5:break;default:throw Error(Q(329))}if((e&62914560)===e&&(s=Ed+300-gi(),10<s)){if(xn(n,e,Yt,!bn),Su(n,0,!0)!==0)break e;n.timeoutHandle=yb(Q0.bind(null,n,i,ct,hu,Ef,e,Yt,us,vr,bn,r,2,-0,0),s);break e}Q0(n,i,ct,hu,Ef,e,Yt,us,vr,bn,r,0,-0,0)}}break}while(!0);xi(t)}function Q0(t,e,i,n,s,r,l,a,o,u,c,h,f,d){if(t.timeoutHandle=-1,h=e.subtreeFlags,(h&8192||(h&16785408)===16785408)&&(Vl={stylesheets:null,count:0,unsuspend:n2},U1(e),h=r2(),h!==null)){t.cancelPendingCommit=h(T0.bind(null,t,e,r,i,n,s,l,a,o,c,1,f,d)),xn(t,r,l,!u);return}T0(t,e,r,i,n,s,l,a,o)}function QT(t){for(var e=t;;){var i=e.tag;if((i===0||i===11||i===15)&&e.flags&16384&&(i=e.updateQueue,i!==null&&(i=i.stores,i!==null)))for(var n=0;n<i.length;n++){var s=i[n],r=s.getSnapshot;s=s.value;try{if(!Tt(r(),s))return!1}catch{return!1}}if(i=e.child,e.subtreeFlags&16384&&i!==null)i.return=e,e=i;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function xn(t,e,i,n){e&=~Md,e&=~us,t.suspendedLanes|=e,t.pingedLanes&=~e,n&&(t.warmLanes|=e),n=t.expirationTimes;for(var s=e;0<s;){var r=31-vt(s),l=1<<r;n[r]=-1,s&=~l}i!==0&&ly(t,i,e)}function Cu(){return(J&6)===0?(ua(0,!1),!1):!0}function zd(){if(L!==null){if(K===0)var t=L.return;else t=L,ji=ys=null,xd(t),pr=null,Bl=0,t=L;for(;t!==null;)z1(t.alternate,t),t=t.return;L=null}}function wr(t,e){var i=t.timeoutHandle;i!==-1&&(t.timeoutHandle=-1,qT(i)),i=t.cancelPendingCommit,i!==null&&(t.cancelPendingCommit=null,i()),zd(),ne=t,L=i=Vi(t.current,null),U=e,K=0,xt=null,bn=!1,Rr=Jl(t,e),Cd=!1,vr=Yt=Md=us=Cn=ye=0,ct=El=null,Ef=!1,(e&8)!==0&&(e|=e&32);var n=t.entangledLanes;if(n!==0)for(t=t.entanglements,n&=e;0<n;){var s=31-vt(n),r=1<<s;e|=t[s],n&=~r}return Hi=e,wu(),i}function eb(t,e){Y=null,Z.H=su,e===ra||e===Pu?(e=i0(),K=3):e===Dy?(e=i0(),K=4):K=e===$1?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,xt=e,L===null&&(ye=1,au(t,qt(e,t.current)))}function tb(){var t=Z.H;return Z.H=su,t===null?su:t}function ib(){var t=Z.A;return Z.A=kT,t}function Xf(){ye=4,bn||(U&4194048)!==U&&Bt.current!==null||(Rr=!0),(Cn&134217727)===0&&(us&134217727)===0||ne===null||xn(ne,U,Yt,!1)}function Uh(t,e,i){var n=J;J|=2;var s=tb(),r=ib();(ne!==t||U!==e)&&(hu=null,wr(t,e)),e=!1;var l=ye;e:do try{if(K!==0&&L!==null){var a=L,o=xt;switch(K){case 8:zd(),l=6;break e;case 3:case 2:case 9:case 6:Bt.current===null&&(e=!0);var u=K;if(K=0,xt=null,ar(t,a,o,u),i&&Rr){l=0;break e}break;default:u=K,K=0,xt=null,ar(t,a,o,u)}}wT(),l=ye;break}catch(c){eb(t,c)}while(!0);return e&&t.shellSuspendCounter++,ji=ys=null,J=n,Z.H=s,Z.A=r,L===null&&(ne=null,U=0,wu()),l}function wT(){for(;L!==null;)nb(L)}function TT(t,e){var i=J;J|=2;var n=tb(),s=ib();ne!==t||U!==e?(hu=null,cu=gi()+500,wr(t,e)):Rr=Jl(t,e);e:do try{if(K!==0&&L!==null){e=L;var r=xt;t:switch(K){case 1:K=0,xt=null,ar(t,e,r,1);break;case 2:case 9:if(t0(r)){K=0,xt=null,w0(e);break}e=function(){K!==2&&K!==9||ne!==t||(K=7),xi(t)},r.then(e,e);break e;case 3:K=7;break e;case 4:K=5;break e;case 7:t0(r)?(K=0,xt=null,w0(e)):(K=0,xt=null,ar(t,e,r,7));break;case 5:var l=null;switch(L.tag){case 26:l=L.memoizedState;case 5:case 27:var a=L;if(!l||kb(l)){K=0,xt=null;var o=a.sibling;if(o!==null)L=o;else{var u=a.return;u!==null?(L=u,Mu(u)):L=null}break t}}K=0,xt=null,ar(t,e,r,5);break;case 6:K=0,xt=null,ar(t,e,r,6);break;case 8:zd(),ye=6;break e;default:throw Error(Q(462))}}PT();break}catch(c){eb(t,c)}while(!0);return ji=ys=null,Z.H=n,Z.A=s,J=i,L!==null?0:(ne=null,U=0,wu(),ye)}function PT(){for(;L!==null&&!IQ();)nb(L)}function nb(t){var e=E1(t.alternate,t,Hi);t.memoizedProps=t.pendingProps,e===null?Mu(t):L=e}function w0(t){var e=t,i=e.alternate;switch(e.tag){case 15:case 0:e=y0(i,e,e.pendingProps,e.type,void 0,U);break;case 11:e=y0(i,e,e.pendingProps,e.type.render,e.ref,U);break;case 5:xd(e);default:z1(i,e),e=L=zy(e,Hi),e=E1(i,e,Hi)}t.memoizedProps=t.pendingProps,e===null?Mu(t):L=e}function ar(t,e,i,n){ji=ys=null,xd(e),pr=null,Bl=0;var s=e.return;try{if(OT(t,s,e,i,U)){ye=1,au(t,qt(i,t.current)),L=null;return}}catch(r){if(s!==null)throw L=s,r;ye=1,au(t,qt(i,t.current)),L=null;return}e.flags&32768?(I||n===1?t=!0:Rr||(U&536870912)!==0?t=!1:(bn=t=!0,(n===2||n===9||n===3||n===6)&&(n=Bt.current,n!==null&&n.tag===13&&(n.flags|=16384))),sb(e,t)):Mu(e)}function Mu(t){var e=t;do{if((e.flags&32768)!==0){sb(e,bn);return}t=e.return;var i=yT(e.alternate,e,Hi);if(i!==null){L=i;return}if(e=e.sibling,e!==null){L=e;return}L=e=t}while(e!==null);ye===0&&(ye=5)}function sb(t,e){do{var i=bT(t.alternate,t);if(i!==null){i.flags&=32767,L=i;return}if(i=t.return,i!==null&&(i.flags|=32768,i.subtreeFlags=0,i.deletions=null),!e&&(t=t.sibling,t!==null)){L=t;return}L=t=i}while(t!==null);ye=6,L=null}function T0(t,e,i,n,s,r,l,a,o){t.cancelPendingCommit=null;do Eu();while(Be!==0);if((J&6)!==0)throw Error(Q(327));if(e!==null){if(e===t.current)throw Error(Q(177));if(r=e.lanes|e.childLanes,r|=ad,rw(t,i,r,l,a,o),t===ne&&(L=ne=null,U=0),Qr=e,wn=t,mr=i,zf=r,_f=s,K1=n,(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,CT(Wo,function(){return ub(!0),null})):(t.callbackNode=null,t.callbackPriority=0),n=(e.flags&13878)!==0,(e.subtreeFlags&13878)!==0||n){n=Z.T,Z.T=null,s=H.p,H.p=2,l=J,J|=4;try{xT(t,e,i)}finally{J=l,H.p=s,Z.T=n}}Be=1,rb(),lb(),ab()}}function rb(){if(Be===1){Be=0;var t=wn,e=Qr,i=(e.flags&13878)!==0;if((e.subtreeFlags&13878)!==0||i){i=Z.T,Z.T=null;var n=H.p;H.p=2;var s=J;J|=4;try{L1(e,t);var r=Yf,l=Ty(t.containerInfo),a=r.focusedElem,o=r.selectionRange;if(l!==a&&a&&a.ownerDocument&&wy(a.ownerDocument.documentElement,a)){if(o!==null&&ld(a)){var u=o.start,c=o.end;if(c===void 0&&(c=u),"selectionStart"in a)a.selectionStart=u,a.selectionEnd=Math.min(c,a.value.length);else{var h=a.ownerDocument||document,f=h&&h.defaultView||window;if(f.getSelection){var d=f.getSelection(),m=a.textContent.length,g=Math.min(o.start,m),x=o.end===void 0?g:Math.min(o.end,m);!d.extend&&g>x&&(l=x,x=g,g=l);var p=Ug(a,g),O=Ug(a,x);if(p&&O&&(d.rangeCount!==1||d.anchorNode!==p.node||d.anchorOffset!==p.offset||d.focusNode!==O.node||d.focusOffset!==O.offset)){var y=h.createRange();y.setStart(p.node,p.offset),d.removeAllRanges(),g>x?(d.addRange(y),d.extend(O.node,O.offset)):(y.setEnd(O.node,O.offset),d.addRange(y))}}}}for(h=[],d=a;d=d.parentNode;)d.nodeType===1&&h.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof a.focus=="function"&&a.focus(),a=0;a<h.length;a++){var S=h[a];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}bu=!!qf,Yf=qf=null}finally{J=s,H.p=n,Z.T=i}}t.current=e,Be=2}}function lb(){if(Be===2){Be=0;var t=wn,e=Qr,i=(e.flags&8772)!==0;if((e.subtreeFlags&8772)!==0||i){i=Z.T,Z.T=null;var n=H.p;H.p=2;var s=J;J|=4;try{q1(t,e.alternate,e)}finally{J=s,H.p=n,Z.T=i}}Be=3}}function ab(){if(Be===4||Be===3){Be=0,HQ();var t=wn,e=Qr,i=mr,n=K1;(e.subtreeFlags&10256)!==0||(e.flags&10256)!==0?Be=5:(Be=0,Qr=wn=null,ob(t,t.pendingLanes));var s=t.pendingLanes;if(s===0&&(Qn=null),Ff(i),e=e.stateNode,kt&&typeof kt.onCommitFiberRoot=="function")try{kt.onCommitFiberRoot(Kl,e,void 0,(e.current.flags&128)===128)}catch{}if(n!==null){e=Z.T,s=H.p,H.p=2,Z.T=null;try{for(var r=t.onRecoverableError,l=0;l<n.length;l++){var a=n[l];r(a.value,{componentStack:a.stack})}}finally{Z.T=e,H.p=s}}(mr&3)!==0&&Eu(),xi(t),s=t.pendingLanes,(i&4194090)!==0&&(s&42)!==0?t===Zf?zl++:(zl=0,Zf=t):zl=0,ua(0,!1)}}function ob(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,sa(e)))}function Eu(t){return rb(),lb(),ab(),ub(t)}function ub(){if(Be!==5)return!1;var t=wn,e=zf;zf=0;var i=Ff(mr),n=Z.T,s=H.p;try{H.p=32>i?32:i,Z.T=null,i=_f,_f=null;var r=wn,l=mr;if(Be=0,Qr=wn=null,mr=0,(J&6)!==0)throw Error(Q(331));var a=J;if(J|=4,I1(r.current),G1(r,r.current,l,i),J=a,ua(0,!1),kt&&typeof kt.onPostCommitFiberRoot=="function")try{kt.onPostCommitFiberRoot(Kl,r)}catch{}return!0}finally{H.p=s,Z.T=n,ob(t,e)}}function P0(t,e,i){e=qt(i,e),e=Af(t.stateNode,e,2),t=vn(t,e,2),t!==null&&(Fl(t,2),xi(t))}function te(t,e,i){if(t.tag===3)P0(t,t,i);else for(;e!==null;){if(e.tag===3){P0(e,t,i);break}else if(e.tag===1){var n=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof n.componentDidCatch=="function"&&(Qn===null||!Qn.has(n))){t=qt(i,t),i=T1(2),n=vn(e,i,2),n!==null&&(P1(i,n,e,t),Fl(n,2),xi(n));break}}e=e.return}}function Wh(t,e,i){var n=t.pingCache;if(n===null){n=t.pingCache=new vT;var s=new Set;n.set(e,s)}else s=n.get(e),s===void 0&&(s=new Set,n.set(e,s));s.has(i)||(Cd=!0,s.add(i),t=$T.bind(null,t,e,i),e.then(t,t))}function $T(t,e,i){var n=t.pingCache;n!==null&&n.delete(e),t.pingedLanes|=t.suspendedLanes&i,t.warmLanes&=~i,ne===t&&(U&i)===i&&(ye===4||ye===3&&(U&62914560)===U&&300>gi()-Ed?(J&2)===0&&wr(t,0):Md|=i,vr===U&&(vr=0)),xi(t)}function cb(t,e){e===0&&(e=ry()),t=Ar(t,e),t!==null&&(Fl(t,e),xi(t))}function AT(t){var e=t.memoizedState,i=0;e!==null&&(i=e.retryLane),cb(t,i)}function RT(t,e){var i=0;switch(t.tag){case 13:var n=t.stateNode,s=t.memoizedState;s!==null&&(i=s.retryLane);break;case 19:n=t.stateNode;break;case 22:n=t.stateNode._retryCache;break;default:throw Error(Q(314))}n!==null&&n.delete(e),cb(t,i)}function CT(t,e){return Kf(t,e)}var fu=null,Is=null,Df=!1,du=!1,Ih=!1,cs=0;function xi(t){t!==Is&&t.next===null&&(Is===null?fu=Is=t:Is=Is.next=t),du=!0,Df||(Df=!0,ET())}function ua(t,e){if(!Ih&&du){Ih=!0;do for(var i=!1,n=fu;n!==null;){if(!e)if(t!==0){var s=n.pendingLanes;if(s===0)var r=0;else{var l=n.suspendedLanes,a=n.pingedLanes;r=(1<<31-vt(42|t)+1)-1,r&=s&~(l&~a),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(i=!0,$0(n,r))}else r=U,r=Su(n,n===ne?r:0,n.cancelPendingCommit!==null||n.timeoutHandle!==-1),(r&3)===0||Jl(n,r)||(i=!0,$0(n,r));n=n.next}while(i);Ih=!1}}function MT(){hb()}function hb(){du=Df=!1;var t=0;cs!==0&&(NT()&&(t=cs),cs=0);for(var e=gi(),i=null,n=fu;n!==null;){var s=n.next,r=fb(n,e);r===0?(n.next=null,i===null?fu=s:i.next=s,s===null&&(Is=i)):(i=n,(t!==0||(r&3)!==0)&&(du=!0)),n=s}ua(t,!1)}function fb(t,e){for(var i=t.suspendedLanes,n=t.pingedLanes,s=t.expirationTimes,r=t.pendingLanes&-62914561;0<r;){var l=31-vt(r),a=1<<l,o=s[l];o===-1?((a&i)===0||(a&n)!==0)&&(s[l]=sw(a,e)):o<=e&&(t.expiredLanes|=a),r&=~a}if(e=ne,i=U,i=Su(t,t===e?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),n=t.callbackNode,i===0||t===e&&(K===2||K===9)||t.cancelPendingCommit!==null)return n!==null&&n!==null&&kh(n),t.callbackNode=null,t.callbackPriority=0;if((i&3)===0||Jl(t,i)){if(e=i&-i,e===t.callbackPriority)return e;switch(n!==null&&kh(n),Ff(i)){case 2:case 8:i=iy;break;case 32:i=Wo;break;case 268435456:i=ny;break;default:i=Wo}return n=db.bind(null,t),i=Kf(i,n),t.callbackPriority=e,t.callbackNode=i,e}return n!==null&&n!==null&&kh(n),t.callbackPriority=2,t.callbackNode=null,2}function db(t,e){if(Be!==0&&Be!==5)return t.callbackNode=null,t.callbackPriority=0,null;var i=t.callbackNode;if(Eu(!0)&&t.callbackNode!==i)return null;var n=U;return n=Su(t,t===ne?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),n===0?null:(F1(t,n,e),fb(t,gi()),t.callbackNode!=null&&t.callbackNode===i?db.bind(null,t):null)}function $0(t,e){if(Eu())return null;F1(t,e,!0)}function ET(){YT(function(){(J&6)!==0?Kf(ty,MT):hb()})}function _d(){return cs===0&&(cs=sy()),cs}function A0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Eo(""+t)}function R0(t,e){var i=e.ownerDocument.createElement("input");return i.name=e.name,i.value=e.value,t.id&&i.setAttribute("form",t.id),e.parentNode.insertBefore(i,e),t=new FormData(t),i.parentNode.removeChild(i),t}function zT(t,e,i,n,s){if(e==="submit"&&i&&i.stateNode===s){var r=A0((s[ht]||null).action),l=n.submitter;l&&(e=(e=l[ht]||null)?A0(e.formAction):l.getAttribute("formAction"),e!==null&&(r=e,l=null));var a=new ku("action","action",null,n,s);t.push({event:a,listeners:[{instance:null,listener:function(){if(n.defaultPrevented){if(cs!==0){var o=l?R0(s,l):new FormData(s);Pf(i,{pending:!0,data:o,method:s.method,action:r},null,o)}}else typeof r=="function"&&(a.preventDefault(),o=l?R0(s,l):new FormData(s),Pf(i,{pending:!0,data:o,method:s.method,action:r},r,o))},currentTarget:s}]})}}for(Po=0;Po<mf.length;Po++)$o=mf[Po],C0=$o.toLowerCase(),M0=$o[0].toUpperCase()+$o.slice(1),ii(C0,"on"+M0);var $o,C0,M0,Po;ii($y,"onAnimationEnd");ii(Ay,"onAnimationIteration");ii(Ry,"onAnimationStart");ii("dblclick","onDoubleClick");ii("focusin","onFocus");ii("focusout","onBlur");ii(Fw,"onTransitionRun");ii(eT,"onTransitionStart");ii(tT,"onTransitionCancel");ii(Cy,"onTransitionEnd");gr("onMouseEnter",["mouseout","mouseover"]);gr("onMouseLeave",["mouseout","mouseover"]);gr("onPointerEnter",["pointerout","pointerover"]);gr("onPointerLeave",["pointerout","pointerover"]);ms("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ms("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ms("onBeforeInput",["compositionend","keypress","textInput","paste"]);ms("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ms("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ms("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var jl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_T=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(jl));function pb(t,e){e=(e&4)!==0;for(var i=0;i<t.length;i++){var n=t[i],s=n.event;n=n.listeners;e:{var r=void 0;if(e)for(var l=n.length-1;0<=l;l--){var a=n[l],o=a.instance,u=a.currentTarget;if(a=a.listener,o!==r&&s.isPropagationStopped())break e;r=a,s.currentTarget=u;try{r(s)}catch(c){lu(c)}s.currentTarget=null,r=o}else for(l=0;l<n.length;l++){if(a=n[l],o=a.instance,u=a.currentTarget,a=a.listener,o!==r&&s.isPropagationStopped())break e;r=a,s.currentTarget=u;try{r(s)}catch(c){lu(c)}s.currentTarget=null,r=o}}}}function j(t,e){var i=e[of];i===void 0&&(i=e[of]=new Set);var n=t+"__bubble";i.has(n)||(mb(e,t,2,!1),i.add(n))}function Hh(t,e,i){var n=0;e&&(n|=4),mb(i,t,n,e)}var Ao="_reactListening"+Math.random().toString(36).slice(2);function Zd(t){if(!t[Ao]){t[Ao]=!0,uy.forEach(function(i){i!=="selectionchange"&&(_T.has(i)||Hh(i,!1,t),Hh(i,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ao]||(e[Ao]=!0,Hh("selectionchange",!1,e))}}function mb(t,e,i,n){switch(Pb(e)){case 2:var s=o2;break;case 8:s=u2;break;default:s=qd}i=s.bind(null,e,i,t),s=void 0,!ff||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),n?s!==void 0?t.addEventListener(e,i,{capture:!0,passive:s}):t.addEventListener(e,i,!0):s!==void 0?t.addEventListener(e,i,{passive:s}):t.addEventListener(e,i,!1)}function Kh(t,e,i,n,s){var r=n;if((e&1)===0&&(e&2)===0&&n!==null)e:for(;;){if(n===null)return;var l=n.tag;if(l===3||l===4){var a=n.stateNode.containerInfo;if(a===s)break;if(l===4)for(l=n.return;l!==null;){var o=l.tag;if((o===3||o===4)&&l.stateNode.containerInfo===s)return;l=l.return}for(;a!==null;){if(l=Js(a),l===null)return;if(o=l.tag,o===5||o===6||o===26||o===27){n=r=l;continue e}a=a.parentNode}}n=n.return}gy(function(){var u=r,c=id(i),h=[];e:{var f=My.get(t);if(f!==void 0){var d=ku,m=t;switch(t){case"keypress":if(_o(i)===0)break e;case"keydown":case"keyup":d=Cw;break;case"focusin":m="focus",d=Rh;break;case"focusout":m="blur",d=Rh;break;case"beforeblur":case"afterblur":d=Rh;break;case"click":if(i.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=Dg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=bw;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=zw;break;case $y:case Ay:case Ry:d=kw;break;case Cy:d=Zw;break;case"scroll":case"scrollend":d=gw;break;case"wheel":d=Dw;break;case"copy":case"cut":case"paste":d=Qw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=qg;break;case"toggle":case"beforetoggle":d=qw}var g=(e&4)!==0,x=!g&&(t==="scroll"||t==="scrollend"),p=g?f!==null?f+"Capture":null:f;g=[];for(var O=u,y;O!==null;){var S=O;if(y=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||y===null||p===null||(S=Xl(O,p),S!=null&&g.push(Ll(O,S,y))),x)break;O=O.return}0<g.length&&(f=new d(f,m,null,i,c),h.push({event:f,listeners:g}))}}if((e&7)===0){e:{if(f=t==="mouseover"||t==="pointerover",d=t==="mouseout"||t==="pointerout",f&&i!==hf&&(m=i.relatedTarget||i.fromElement)&&(Js(m)||m[Pr]))break e;if((d||f)&&(f=c.window===c?c:(f=c.ownerDocument)?f.defaultView||f.parentWindow:window,d?(m=i.relatedTarget||i.toElement,d=u,m=m?Js(m):null,m!==null&&(x=Hl(m),g=m.tag,m!==x||g!==5&&g!==27&&g!==6)&&(m=null)):(d=null,m=u),d!==m)){if(g=Dg,S="onMouseLeave",p="onMouseEnter",O="mouse",(t==="pointerout"||t==="pointerover")&&(g=qg,S="onPointerLeave",p="onPointerEnter",O="pointer"),x=d==null?f:xl(d),y=m==null?f:xl(m),f=new g(S,O+"leave",d,i,c),f.target=x,f.relatedTarget=y,S=null,Js(c)===u&&(g=new g(p,O+"enter",m,i,c),g.target=y,g.relatedTarget=x,S=g),x=S,d&&m)t:{for(g=d,p=m,O=0,y=g;y;y=Gs(y))O++;for(y=0,S=p;S;S=Gs(S))y++;for(;0<O-y;)g=Gs(g),O--;for(;0<y-O;)p=Gs(p),y--;for(;O--;){if(g===p||p!==null&&g===p.alternate)break t;g=Gs(g),p=Gs(p)}g=null}else g=null;d!==null&&E0(h,f,d,g,!1),m!==null&&x!==null&&E0(h,x,m,g,!0)}}e:{if(f=u?xl(u):window,d=f.nodeName&&f.nodeName.toLowerCase(),d==="select"||d==="input"&&f.type==="file")var k=Lg;else if(jg(f))if(vy)k=Hw;else{k=Ww;var w=Uw}else d=f.nodeName,!d||d.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?u&&td(u.elementType)&&(k=Lg):k=Iw;if(k&&(k=k(t,u))){ky(h,k,i,c);break e}w&&w(t,f,u),t==="focusout"&&u&&f.type==="number"&&u.memoizedProps.value!=null&&cf(f,"number",f.value)}switch(w=u?xl(u):window,t){case"focusin":(jg(w)||w.contentEditable==="true")&&(tr=w,df=u,Ql=null);break;case"focusout":Ql=df=tr=null;break;case"mousedown":pf=!0;break;case"contextmenu":case"mouseup":case"dragend":pf=!1,Wg(h,i,c);break;case"selectionchange":if(Jw)break;case"keydown":case"keyup":Wg(h,i,c)}var v;if(rd)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else er?xy(t,i)&&(P="onCompositionEnd"):t==="keydown"&&i.keyCode===229&&(P="onCompositionStart");P&&(by&&i.locale!=="ko"&&(er||P!=="onCompositionStart"?P==="onCompositionEnd"&&er&&(v=yy()):(yn=c,nd="value"in yn?yn.value:yn.textContent,er=!0)),w=pu(u,P),0<w.length&&(P=new Ng(P,t,null,i,c),h.push({event:P,listeners:w}),v?P.data=v:(v=Sy(i),v!==null&&(P.data=v)))),(v=Bw?jw(t,i):Lw(t,i))&&(P=pu(u,"onBeforeInput"),0<P.length&&(w=new Ng("onBeforeInput","beforeinput",null,i,c),h.push({event:w,listeners:P}),w.data=v)),zT(h,t,u,i,c)}pb(h,e)})}function Ll(t,e,i){return{instance:t,listener:e,currentTarget:i}}function pu(t,e){for(var i=e+"Capture",n=[];t!==null;){var s=t,r=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||r===null||(s=Xl(t,i),s!=null&&n.unshift(Ll(t,s,r)),s=Xl(t,e),s!=null&&n.push(Ll(t,s,r))),t.tag===3)return n;t=t.return}return[]}function Gs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function E0(t,e,i,n,s){for(var r=e._reactName,l=[];i!==null&&i!==n;){var a=i,o=a.alternate,u=a.stateNode;if(a=a.tag,o!==null&&o===n)break;a!==5&&a!==26&&a!==27||u===null||(o=u,s?(u=Xl(i,r),u!=null&&l.unshift(Ll(i,u,o))):s||(u=Xl(i,r),u!=null&&l.push(Ll(i,u,o)))),i=i.return}l.length!==0&&t.push({event:e,listeners:l})}var ZT=/\r\n?/g,XT=/\u0000|\uFFFD/g;function z0(t){return(typeof t=="string"?t:""+t).replace(ZT,`
`).replace(XT,"")}function Ob(t,e){return e=z0(e),z0(t)===e}function zu(){}function F(t,e,i,n,s,r){switch(i){case"children":typeof n=="string"?e==="body"||e==="textarea"&&n===""||yr(t,n):(typeof n=="number"||typeof n=="bigint")&&e!=="body"&&yr(t,""+n);break;case"className":yo(t,"class",n);break;case"tabIndex":yo(t,"tabindex",n);break;case"dir":case"role":case"viewBox":case"width":case"height":yo(t,i,n);break;case"style":Oy(t,n,r);break;case"data":if(e!=="object"){yo(t,"data",n);break}case"src":case"href":if(n===""&&(e!=="a"||i!=="href")){t.removeAttribute(i);break}if(n==null||typeof n=="function"||typeof n=="symbol"||typeof n=="boolean"){t.removeAttribute(i);break}n=Eo(""+n),t.setAttribute(i,n);break;case"action":case"formAction":if(typeof n=="function"){t.setAttribute(i,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(i==="formAction"?(e!=="input"&&F(t,e,"name",s.name,s,null),F(t,e,"formEncType",s.formEncType,s,null),F(t,e,"formMethod",s.formMethod,s,null),F(t,e,"formTarget",s.formTarget,s,null)):(F(t,e,"encType",s.encType,s,null),F(t,e,"method",s.method,s,null),F(t,e,"target",s.target,s,null)));if(n==null||typeof n=="symbol"||typeof n=="boolean"){t.removeAttribute(i);break}n=Eo(""+n),t.setAttribute(i,n);break;case"onClick":n!=null&&(t.onclick=zu);break;case"onScroll":n!=null&&j("scroll",t);break;case"onScrollEnd":n!=null&&j("scrollend",t);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(Q(61));if(i=n.__html,i!=null){if(s.children!=null)throw Error(Q(60));t.innerHTML=i}}break;case"multiple":t.multiple=n&&typeof n!="function"&&typeof n!="symbol";break;case"muted":t.muted=n&&typeof n!="function"&&typeof n!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(n==null||typeof n=="function"||typeof n=="boolean"||typeof n=="symbol"){t.removeAttribute("xlink:href");break}i=Eo(""+n),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",i);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":n!=null&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(i,""+n):t.removeAttribute(i);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":n&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(i,""):t.removeAttribute(i);break;case"capture":case"download":n===!0?t.setAttribute(i,""):n!==!1&&n!=null&&typeof n!="function"&&typeof n!="symbol"?t.setAttribute(i,n):t.removeAttribute(i);break;case"cols":case"rows":case"size":case"span":n!=null&&typeof n!="function"&&typeof n!="symbol"&&!isNaN(n)&&1<=n?t.setAttribute(i,n):t.removeAttribute(i);break;case"rowSpan":case"start":n==null||typeof n=="function"||typeof n=="symbol"||isNaN(n)?t.removeAttribute(i):t.setAttribute(i,n);break;case"popover":j("beforetoggle",t),j("toggle",t),Mo(t,"popover",n);break;case"xlinkActuate":Zi(t,"http://www.w3.org/1999/xlink","xlink:actuate",n);break;case"xlinkArcrole":Zi(t,"http://www.w3.org/1999/xlink","xlink:arcrole",n);break;case"xlinkRole":Zi(t,"http://www.w3.org/1999/xlink","xlink:role",n);break;case"xlinkShow":Zi(t,"http://www.w3.org/1999/xlink","xlink:show",n);break;case"xlinkTitle":Zi(t,"http://www.w3.org/1999/xlink","xlink:title",n);break;case"xlinkType":Zi(t,"http://www.w3.org/1999/xlink","xlink:type",n);break;case"xmlBase":Zi(t,"http://www.w3.org/XML/1998/namespace","xml:base",n);break;case"xmlLang":Zi(t,"http://www.w3.org/XML/1998/namespace","xml:lang",n);break;case"xmlSpace":Zi(t,"http://www.w3.org/XML/1998/namespace","xml:space",n);break;case"is":Mo(t,"is",n);break;case"innerText":case"textContent":break;default:(!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(i=mw.get(i)||i,Mo(t,i,n))}}function Nf(t,e,i,n,s,r){switch(i){case"style":Oy(t,n,r);break;case"dangerouslySetInnerHTML":if(n!=null){if(typeof n!="object"||!("__html"in n))throw Error(Q(61));if(i=n.__html,i!=null){if(s.children!=null)throw Error(Q(60));t.innerHTML=i}}break;case"children":typeof n=="string"?yr(t,n):(typeof n=="number"||typeof n=="bigint")&&yr(t,""+n);break;case"onScroll":n!=null&&j("scroll",t);break;case"onScrollEnd":n!=null&&j("scrollend",t);break;case"onClick":n!=null&&(t.onclick=zu);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!cy.hasOwnProperty(i))e:{if(i[0]==="o"&&i[1]==="n"&&(s=i.endsWith("Capture"),e=i.slice(2,s?i.length-7:void 0),r=t[ht]||null,r=r!=null?r[i]:null,typeof r=="function"&&t.removeEventListener(e,r,s),typeof n=="function")){typeof r!="function"&&r!==null&&(i in t?t[i]=null:t.hasAttribute(i)&&t.removeAttribute(i)),t.addEventListener(e,n,s);break e}i in t?t[i]=n:n===!0?t.setAttribute(i,""):Mo(t,i,n)}}}function je(t,e,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":j("error",t),j("load",t);var n=!1,s=!1,r;for(r in i)if(i.hasOwnProperty(r)){var l=i[r];if(l!=null)switch(r){case"src":n=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,e));default:F(t,e,r,l,i,null)}}s&&F(t,e,"srcSet",i.srcSet,i,null),n&&F(t,e,"src",i.src,i,null);return;case"input":j("invalid",t);var a=r=l=s=null,o=null,u=null;for(n in i)if(i.hasOwnProperty(n)){var c=i[n];if(c!=null)switch(n){case"name":s=c;break;case"type":l=c;break;case"checked":o=c;break;case"defaultChecked":u=c;break;case"value":r=c;break;case"defaultValue":a=c;break;case"children":case"dangerouslySetInnerHTML":if(c!=null)throw Error(Q(137,e));break;default:F(t,e,n,c,i,null)}}dy(t,r,a,o,u,l,s,!1),Io(t);return;case"select":j("invalid",t),n=l=r=null;for(s in i)if(i.hasOwnProperty(s)&&(a=i[s],a!=null))switch(s){case"value":r=a;break;case"defaultValue":l=a;break;case"multiple":n=a;default:F(t,e,s,a,i,null)}e=r,i=l,t.multiple=!!n,e!=null?ur(t,!!n,e,!1):i!=null&&ur(t,!!n,i,!0);return;case"textarea":j("invalid",t),r=s=n=null;for(l in i)if(i.hasOwnProperty(l)&&(a=i[l],a!=null))switch(l){case"value":n=a;break;case"defaultValue":s=a;break;case"children":r=a;break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(Q(91));break;default:F(t,e,l,a,i,null)}my(t,n,s,r),Io(t);return;case"option":for(o in i)if(i.hasOwnProperty(o)&&(n=i[o],n!=null))switch(o){case"selected":t.selected=n&&typeof n!="function"&&typeof n!="symbol";break;default:F(t,e,o,n,i,null)}return;case"dialog":j("beforetoggle",t),j("toggle",t),j("cancel",t),j("close",t);break;case"iframe":case"object":j("load",t);break;case"video":case"audio":for(n=0;n<jl.length;n++)j(jl[n],t);break;case"image":j("error",t),j("load",t);break;case"details":j("toggle",t);break;case"embed":case"source":case"link":j("error",t),j("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(u in i)if(i.hasOwnProperty(u)&&(n=i[u],n!=null))switch(u){case"children":case"dangerouslySetInnerHTML":throw Error(Q(137,e));default:F(t,e,u,n,i,null)}return;default:if(td(e)){for(c in i)i.hasOwnProperty(c)&&(n=i[c],n!==void 0&&Nf(t,e,c,n,i,void 0));return}}for(a in i)i.hasOwnProperty(a)&&(n=i[a],n!=null&&F(t,e,a,n,i,null))}function DT(t,e,i,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,r=null,l=null,a=null,o=null,u=null,c=null;for(d in i){var h=i[d];if(i.hasOwnProperty(d)&&h!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":o=h;default:n.hasOwnProperty(d)||F(t,e,d,null,n,h)}}for(var f in n){var d=n[f];if(h=i[f],n.hasOwnProperty(f)&&(d!=null||h!=null))switch(f){case"type":r=d;break;case"name":s=d;break;case"checked":u=d;break;case"defaultChecked":c=d;break;case"value":l=d;break;case"defaultValue":a=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(Q(137,e));break;default:d!==h&&F(t,e,f,d,n,h)}}uf(t,l,a,o,u,c,r,s);return;case"select":d=l=a=f=null;for(r in i)if(o=i[r],i.hasOwnProperty(r)&&o!=null)switch(r){case"value":break;case"multiple":d=o;default:n.hasOwnProperty(r)||F(t,e,r,null,n,o)}for(s in n)if(r=n[s],o=i[s],n.hasOwnProperty(s)&&(r!=null||o!=null))switch(s){case"value":f=r;break;case"defaultValue":a=r;break;case"multiple":l=r;default:r!==o&&F(t,e,s,r,n,o)}e=a,i=l,n=d,f!=null?ur(t,!!i,f,!1):!!n!=!!i&&(e!=null?ur(t,!!i,e,!0):ur(t,!!i,i?[]:"",!1));return;case"textarea":d=f=null;for(a in i)if(s=i[a],i.hasOwnProperty(a)&&s!=null&&!n.hasOwnProperty(a))switch(a){case"value":break;case"children":break;default:F(t,e,a,null,n,s)}for(l in n)if(s=n[l],r=i[l],n.hasOwnProperty(l)&&(s!=null||r!=null))switch(l){case"value":f=s;break;case"defaultValue":d=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(Q(91));break;default:s!==r&&F(t,e,l,s,n,r)}py(t,f,d);return;case"option":for(var m in i)if(f=i[m],i.hasOwnProperty(m)&&f!=null&&!n.hasOwnProperty(m))switch(m){case"selected":t.selected=!1;break;default:F(t,e,m,null,n,f)}for(o in n)if(f=n[o],d=i[o],n.hasOwnProperty(o)&&f!==d&&(f!=null||d!=null))switch(o){case"selected":t.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:F(t,e,o,f,n,d)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in i)f=i[g],i.hasOwnProperty(g)&&f!=null&&!n.hasOwnProperty(g)&&F(t,e,g,null,n,f);for(u in n)if(f=n[u],d=i[u],n.hasOwnProperty(u)&&f!==d&&(f!=null||d!=null))switch(u){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(Q(137,e));break;default:F(t,e,u,f,n,d)}return;default:if(td(e)){for(var x in i)f=i[x],i.hasOwnProperty(x)&&f!==void 0&&!n.hasOwnProperty(x)&&Nf(t,e,x,void 0,n,f);for(c in n)f=n[c],d=i[c],!n.hasOwnProperty(c)||f===d||f===void 0&&d===void 0||Nf(t,e,c,f,n,d);return}}for(var p in i)f=i[p],i.hasOwnProperty(p)&&f!=null&&!n.hasOwnProperty(p)&&F(t,e,p,null,n,f);for(h in n)f=n[h],d=i[h],!n.hasOwnProperty(h)||f===d||f==null&&d==null||F(t,e,h,f,n,d)}var qf=null,Yf=null;function mu(t){return t.nodeType===9?t:t.ownerDocument}function _0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function gb(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Bf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Jh=null;function NT(){var t=window.event;return t&&t.type==="popstate"?t===Jh?!1:(Jh=t,!0):(Jh=null,!1)}var yb=typeof setTimeout=="function"?setTimeout:void 0,qT=typeof clearTimeout=="function"?clearTimeout:void 0,Z0=typeof Promise=="function"?Promise:void 0,YT=typeof queueMicrotask=="function"?queueMicrotask:typeof Z0<"u"?function(t){return Z0.resolve(null).then(t).catch(BT)}:yb;function BT(t){setTimeout(function(){throw t})}function En(t){return t==="head"}function X0(t,e){var i=e,n=0,s=0;do{var r=i.nextSibling;if(t.removeChild(i),r&&r.nodeType===8)if(i=r.data,i==="/$"){if(0<n&&8>n){i=n;var l=t.ownerDocument;if(i&1&&_l(l.documentElement),i&2&&_l(l.body),i&4)for(i=l.head,_l(i),l=i.firstChild;l;){var a=l.nextSibling,o=l.nodeName;l[ea]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&l.rel.toLowerCase()==="stylesheet"||i.removeChild(l),l=a}}if(s===0){t.removeChild(r),Il(e);return}s--}else i==="$"||i==="$?"||i==="$!"?s++:n=i.charCodeAt(0)-48;else n=0;i=r}while(i);Il(e)}function jf(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var i=e;switch(e=e.nextSibling,i.nodeName){case"HTML":case"HEAD":case"BODY":jf(i),ed(i);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(i.rel.toLowerCase()==="stylesheet")continue}t.removeChild(i)}}function jT(t,e,i,n){for(;t.nodeType===1;){var s=i;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!n&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(n){if(!t[ea])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(r=t.getAttribute("rel"),r==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(r!==s.rel||t.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||t.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||t.getAttribute("title")!==(s.title==null?null:s.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(r=t.getAttribute("src"),(r!==(s.src==null?null:s.src)||t.getAttribute("type")!==(s.type==null?null:s.type)||t.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&r&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var r=s.name==null?null:""+s.name;if(s.type==="hidden"&&t.getAttribute("name")===r)return t}else return t;if(t=ti(t.nextSibling),t===null)break}return null}function LT(t,e,i){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!i||(t=ti(t.nextSibling),t===null))return null;return t}function Lf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState==="complete"}function VT(t,e){var i=t.ownerDocument;if(t.data!=="$?"||i.readyState==="complete")e();else{var n=function(){e(),i.removeEventListener("DOMContentLoaded",n)};i.addEventListener("DOMContentLoaded",n),t._reactRetry=n}}function ti(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="F!"||e==="F")break;if(e==="/$")return null}}return t}var Vf=null;function D0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var i=t.data;if(i==="$"||i==="$!"||i==="$?"){if(e===0)return t;e--}else i==="/$"&&e++}t=t.previousSibling}return null}function bb(t,e,i){switch(e=mu(i),t){case"html":if(t=e.documentElement,!t)throw Error(Q(452));return t;case"head":if(t=e.head,!t)throw Error(Q(453));return t;case"body":if(t=e.body,!t)throw Error(Q(454));return t;default:throw Error(Q(451))}}function _l(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);ed(t)}var jt=new Map,N0=new Set;function Ou(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ki=H.d;H.d={f:GT,r:UT,D:WT,C:IT,L:HT,m:KT,X:FT,S:JT,M:e2};function GT(){var t=Ki.f(),e=Cu();return t||e}function UT(t){var e=$r(t);e!==null&&e.tag===5&&e.type==="form"?f1(e):Ki.r(t)}var Cr=typeof document>"u"?null:document;function xb(t,e,i){var n=Cr;if(n&&typeof e=="string"&&e){var s=Nt(e);s='link[rel="'+t+'"][href="'+s+'"]',typeof i=="string"&&(s+='[crossorigin="'+i+'"]'),N0.has(s)||(N0.add(s),t={rel:t,crossOrigin:i,href:e},n.querySelector(s)===null&&(e=n.createElement("link"),je(e,"link",t),Ee(e),n.head.appendChild(e)))}}function WT(t){Ki.D(t),xb("dns-prefetch",t,null)}function IT(t,e){Ki.C(t,e),xb("preconnect",t,e)}function HT(t,e,i){Ki.L(t,e,i);var n=Cr;if(n&&t&&e){var s='link[rel="preload"][as="'+Nt(e)+'"]';e==="image"&&i&&i.imageSrcSet?(s+='[imagesrcset="'+Nt(i.imageSrcSet)+'"]',typeof i.imageSizes=="string"&&(s+='[imagesizes="'+Nt(i.imageSizes)+'"]')):s+='[href="'+Nt(t)+'"]';var r=s;switch(e){case"style":r=Tr(t);break;case"script":r=Mr(t)}jt.has(r)||(t=ae({rel:"preload",href:e==="image"&&i&&i.imageSrcSet?void 0:t,as:e},i),jt.set(r,t),n.querySelector(s)!==null||e==="style"&&n.querySelector(ca(r))||e==="script"&&n.querySelector(ha(r))||(e=n.createElement("link"),je(e,"link",t),Ee(e),n.head.appendChild(e)))}}function KT(t,e){Ki.m(t,e);var i=Cr;if(i&&t){var n=e&&typeof e.as=="string"?e.as:"script",s='link[rel="modulepreload"][as="'+Nt(n)+'"][href="'+Nt(t)+'"]',r=s;switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Mr(t)}if(!jt.has(r)&&(t=ae({rel:"modulepreload",href:t},e),jt.set(r,t),i.querySelector(s)===null)){switch(n){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(i.querySelector(ha(r)))return}n=i.createElement("link"),je(n,"link",t),Ee(n),i.head.appendChild(n)}}}function JT(t,e,i){Ki.S(t,e,i);var n=Cr;if(n&&t){var s=or(n).hoistableStyles,r=Tr(t);e=e||"default";var l=s.get(r);if(!l){var a={loading:0,preload:null};if(l=n.querySelector(ca(r)))a.loading=5;else{t=ae({rel:"stylesheet",href:t,"data-precedence":e},i),(i=jt.get(r))&&Xd(t,i);var o=l=n.createElement("link");Ee(o),je(o,"link",t),o._p=new Promise(function(u,c){o.onload=u,o.onerror=c}),o.addEventListener("load",function(){a.loading|=1}),o.addEventListener("error",function(){a.loading|=2}),a.loading|=4,Bo(l,e,n)}l={type:"stylesheet",instance:l,count:1,state:a},s.set(r,l)}}}function FT(t,e){Ki.X(t,e);var i=Cr;if(i&&t){var n=or(i).hoistableScripts,s=Mr(t),r=n.get(s);r||(r=i.querySelector(ha(s)),r||(t=ae({src:t,async:!0},e),(e=jt.get(s))&&Dd(t,e),r=i.createElement("script"),Ee(r),je(r,"link",t),i.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(s,r))}}function e2(t,e){Ki.M(t,e);var i=Cr;if(i&&t){var n=or(i).hoistableScripts,s=Mr(t),r=n.get(s);r||(r=i.querySelector(ha(s)),r||(t=ae({src:t,async:!0,type:"module"},e),(e=jt.get(s))&&Dd(t,e),r=i.createElement("script"),Ee(r),je(r,"link",t),i.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},n.set(s,r))}}function q0(t,e,i,n){var s=(s=Sn.current)?Ou(s):null;if(!s)throw Error(Q(446));switch(t){case"meta":case"title":return null;case"style":return typeof i.precedence=="string"&&typeof i.href=="string"?(e=Tr(i.href),i=or(s).hoistableStyles,n=i.get(e),n||(n={type:"style",instance:null,count:0,state:null},i.set(e,n)),n):{type:"void",instance:null,count:0,state:null};case"link":if(i.rel==="stylesheet"&&typeof i.href=="string"&&typeof i.precedence=="string"){t=Tr(i.href);var r=or(s).hoistableStyles,l=r.get(t);if(l||(s=s.ownerDocument||s,l={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(t,l),(r=s.querySelector(ca(t)))&&!r._p&&(l.instance=r,l.state.loading=5),jt.has(t)||(i={rel:"preload",as:"style",href:i.href,crossOrigin:i.crossOrigin,integrity:i.integrity,media:i.media,hrefLang:i.hrefLang,referrerPolicy:i.referrerPolicy},jt.set(t,i),r||t2(s,t,i,l.state))),e&&n===null)throw Error(Q(528,""));return l}if(e&&n!==null)throw Error(Q(529,""));return null;case"script":return e=i.async,i=i.src,typeof i=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Mr(i),i=or(s).hoistableScripts,n=i.get(e),n||(n={type:"script",instance:null,count:0,state:null},i.set(e,n)),n):{type:"void",instance:null,count:0,state:null};default:throw Error(Q(444,t))}}function Tr(t){return'href="'+Nt(t)+'"'}function ca(t){return'link[rel="stylesheet"]['+t+"]"}function Sb(t){return ae({},t,{"data-precedence":t.precedence,precedence:null})}function t2(t,e,i,n){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?n.loading=1:(e=t.createElement("link"),n.preload=e,e.addEventListener("load",function(){return n.loading|=1}),e.addEventListener("error",function(){return n.loading|=2}),je(e,"link",i),Ee(e),t.head.appendChild(e))}function Mr(t){return'[src="'+Nt(t)+'"]'}function ha(t){return"script[async]"+t}function Y0(t,e,i){if(e.count++,e.instance===null)switch(e.type){case"style":var n=t.querySelector('style[data-href~="'+Nt(i.href)+'"]');if(n)return e.instance=n,Ee(n),n;var s=ae({},i,{"data-href":i.href,"data-precedence":i.precedence,href:null,precedence:null});return n=(t.ownerDocument||t).createElement("style"),Ee(n),je(n,"style",s),Bo(n,i.precedence,t),e.instance=n;case"stylesheet":s=Tr(i.href);var r=t.querySelector(ca(s));if(r)return e.state.loading|=4,e.instance=r,Ee(r),r;n=Sb(i),(s=jt.get(s))&&Xd(n,s),r=(t.ownerDocument||t).createElement("link"),Ee(r);var l=r;return l._p=new Promise(function(a,o){l.onload=a,l.onerror=o}),je(r,"link",n),e.state.loading|=4,Bo(r,i.precedence,t),e.instance=r;case"script":return r=Mr(i.src),(s=t.querySelector(ha(r)))?(e.instance=s,Ee(s),s):(n=i,(s=jt.get(r))&&(n=ae({},i),Dd(n,s)),t=t.ownerDocument||t,s=t.createElement("script"),Ee(s),je(s,"link",n),t.head.appendChild(s),e.instance=s);case"void":return null;default:throw Error(Q(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(n=e.instance,e.state.loading|=4,Bo(n,i.precedence,t));return e.instance}function Bo(t,e,i){for(var n=i.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=n.length?n[n.length-1]:null,r=s,l=0;l<n.length;l++){var a=n[l];if(a.dataset.precedence===e)r=a;else if(r!==s)break}r?r.parentNode.insertBefore(t,r.nextSibling):(e=i.nodeType===9?i.head:i,e.insertBefore(t,e.firstChild))}function Xd(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Dd(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var jo=null;function B0(t,e,i){if(jo===null){var n=new Map,s=jo=new Map;s.set(i,n)}else s=jo,n=s.get(i),n||(n=new Map,s.set(i,n));if(n.has(t))return n;for(n.set(t,null),i=i.getElementsByTagName(t),s=0;s<i.length;s++){var r=i[s];if(!(r[ea]||r[Ie]||t==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var l=r.getAttribute(e)||"";l=t+l;var a=n.get(l);a?a.push(r):n.set(l,[r])}}return n}function j0(t,e,i){t=t.ownerDocument||t,t.head.insertBefore(i,e==="title"?t.querySelector("head > title"):null)}function i2(t,e,i){if(i===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function kb(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}var Vl=null;function n2(){}function s2(t,e,i){if(Vl===null)throw Error(Q(475));var n=Vl;if(e.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(e.state.loading&4)===0){if(e.instance===null){var s=Tr(i.href),r=t.querySelector(ca(s));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(n.count++,n=gu.bind(n),t.then(n,n)),e.state.loading|=4,e.instance=r,Ee(r);return}r=t.ownerDocument||t,i=Sb(i),(s=jt.get(s))&&Xd(i,s),r=r.createElement("link"),Ee(r);var l=r;l._p=new Promise(function(a,o){l.onload=a,l.onerror=o}),je(r,"link",i),e.instance=r}n.stylesheets===null&&(n.stylesheets=new Map),n.stylesheets.set(e,t),(t=e.state.preload)&&(e.state.loading&3)===0&&(n.count++,e=gu.bind(n),t.addEventListener("load",e),t.addEventListener("error",e))}}function r2(){if(Vl===null)throw Error(Q(475));var t=Vl;return t.stylesheets&&t.count===0&&Gf(t,t.stylesheets),0<t.count?function(e){var i=setTimeout(function(){if(t.stylesheets&&Gf(t,t.stylesheets),t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}},6e4);return t.unsuspend=e,function(){t.unsuspend=null,clearTimeout(i)}}:null}function gu(){if(this.count--,this.count===0){if(this.stylesheets)Gf(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var yu=null;function Gf(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,yu=new Map,e.forEach(l2,t),yu=null,gu.call(t))}function l2(t,e){if(!(e.state.loading&4)){var i=yu.get(t);if(i)var n=i.get(null);else{i=new Map,yu.set(t,i);for(var s=t.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<s.length;r++){var l=s[r];(l.nodeName==="LINK"||l.getAttribute("media")!=="not all")&&(i.set(l.dataset.precedence,l),n=l)}n&&i.set(null,n)}s=e.instance,l=s.getAttribute("data-precedence"),r=i.get(l)||n,r===n&&i.set(null,s),i.set(l,s),this.count++,n=gu.bind(this),s.addEventListener("load",n),s.addEventListener("error",n),r?r.parentNode.insertBefore(s,r.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(s,t.firstChild)),e.state.loading|=4}}var Gl={$$typeof:qi,Provider:null,Consumer:null,_currentValue:ss,_currentValue2:ss,_threadCount:0};function a2(t,e,i,n,s,r,l,a){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=vh(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vh(0),this.hiddenUpdates=vh(null),this.identifierPrefix=n,this.onUncaughtError=s,this.onCaughtError=r,this.onRecoverableError=l,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=a,this.incompleteTransitions=new Map}function vb(t,e,i,n,s,r,l,a,o,u,c,h){return t=new a2(t,e,i,l,a,o,u,h),e=1,r===!0&&(e|=24),r=St(3,null,null,e),t.current=r,r.stateNode=t,e=fd(),e.refCount++,t.pooledCache=e,e.refCount++,r.memoizedState={element:n,isDehydrated:i,cache:e},pd(r),t}function Qb(t){return t?(t=sr,t):sr}function wb(t,e,i,n,s,r){s=Qb(s),n.context===null?n.context=s:n.pendingContext=s,n=kn(e),n.payload={element:i},r=r===void 0?null:r,r!==null&&(n.callback=r),i=vn(t,n,e),i!==null&&(wt(i,t,e),Pl(i,t,e))}function L0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var i=t.retryLane;t.retryLane=i!==0&&i<e?i:e}}function Nd(t,e){L0(t,e),(t=t.alternate)&&L0(t,e)}function Tb(t){if(t.tag===13){var e=Ar(t,67108864);e!==null&&wt(e,t,67108864),Nd(t,67108864)}}var bu=!0;function o2(t,e,i,n){var s=Z.T;Z.T=null;var r=H.p;try{H.p=2,qd(t,e,i,n)}finally{H.p=r,Z.T=s}}function u2(t,e,i,n){var s=Z.T;Z.T=null;var r=H.p;try{H.p=8,qd(t,e,i,n)}finally{H.p=r,Z.T=s}}function qd(t,e,i,n){if(bu){var s=Uf(n);if(s===null)Kh(t,e,n,xu,i),V0(t,n);else if(h2(s,t,e,i,n))n.stopPropagation();else if(V0(t,n),e&4&&-1<c2.indexOf(t)){for(;s!==null;){var r=$r(s);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var l=ts(r.pendingLanes);if(l!==0){var a=r;for(a.pendingLanes|=2,a.entangledLanes|=2;l;){var o=1<<31-vt(l);a.entanglements[1]|=o,l&=~o}xi(r),(J&6)===0&&(cu=gi()+500,ua(0,!1))}}break;case 13:a=Ar(r,2),a!==null&&wt(a,r,2),Cu(),Nd(r,2)}if(r=Uf(n),r===null&&Kh(t,e,n,xu,i),r===s)break;s=r}s!==null&&n.stopPropagation()}else Kh(t,e,n,null,i)}}function Uf(t){return t=id(t),Yd(t)}var xu=null;function Yd(t){if(xu=null,t=Js(t),t!==null){var e=Hl(t);if(e===null)t=null;else{var i=e.tag;if(i===13){if(t=K0(e),t!==null)return t;t=null}else if(i===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return xu=t,null}function Pb(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(KQ()){case ty:return 2;case iy:return 8;case Wo:case JQ:return 32;case ny:return 268435456;default:return 32}default:return 32}}var Wf=!1,Tn=null,Pn=null,$n=null,Ul=new Map,Wl=new Map,On=[],c2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function V0(t,e){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":Pn=null;break;case"mouseover":case"mouseout":$n=null;break;case"pointerover":case"pointerout":Ul.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wl.delete(e.pointerId)}}function Ol(t,e,i,n,s,r){return t===null||t.nativeEvent!==r?(t={blockedOn:e,domEventName:i,eventSystemFlags:n,nativeEvent:r,targetContainers:[s]},e!==null&&(e=$r(e),e!==null&&Tb(e)),t):(t.eventSystemFlags|=n,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function h2(t,e,i,n,s){switch(e){case"focusin":return Tn=Ol(Tn,t,e,i,n,s),!0;case"dragenter":return Pn=Ol(Pn,t,e,i,n,s),!0;case"mouseover":return $n=Ol($n,t,e,i,n,s),!0;case"pointerover":var r=s.pointerId;return Ul.set(r,Ol(Ul.get(r)||null,t,e,i,n,s)),!0;case"gotpointercapture":return r=s.pointerId,Wl.set(r,Ol(Wl.get(r)||null,t,e,i,n,s)),!0}return!1}function $b(t){var e=Js(t.target);if(e!==null){var i=Hl(e);if(i!==null){if(e=i.tag,e===13){if(e=K0(i),e!==null){t.blockedOn=e,lw(t.priority,function(){if(i.tag===13){var n=Qt();n=Jf(n);var s=Ar(i,n);s!==null&&wt(s,i,n),Nd(i,n)}});return}}else if(e===3&&i.stateNode.current.memoizedState.isDehydrated){t.blockedOn=i.tag===3?i.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Lo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var i=Uf(t.nativeEvent);if(i===null){i=t.nativeEvent;var n=new i.constructor(i.type,i);hf=n,i.target.dispatchEvent(n),hf=null}else return e=$r(i),e!==null&&Tb(e),t.blockedOn=i,!1;e.shift()}return!0}function G0(t,e,i){Lo(t)&&i.delete(e)}function f2(){Wf=!1,Tn!==null&&Lo(Tn)&&(Tn=null),Pn!==null&&Lo(Pn)&&(Pn=null),$n!==null&&Lo($n)&&($n=null),Ul.forEach(G0),Wl.forEach(G0)}function Ro(t,e){t.blockedOn===e&&(t.blockedOn=null,Wf||(Wf=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,f2)))}var Co=null;function U0(t){Co!==t&&(Co=t,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,function(){Co===t&&(Co=null);for(var e=0;e<t.length;e+=3){var i=t[e],n=t[e+1],s=t[e+2];if(typeof n!="function"){if(Yd(n||i)===null)continue;break}var r=$r(i);r!==null&&(t.splice(e,3),e-=3,Pf(r,{pending:!0,data:s,method:i.method,action:n},n,s))}}))}function Il(t){function e(o){return Ro(o,t)}Tn!==null&&Ro(Tn,t),Pn!==null&&Ro(Pn,t),$n!==null&&Ro($n,t),Ul.forEach(e),Wl.forEach(e);for(var i=0;i<On.length;i++){var n=On[i];n.blockedOn===t&&(n.blockedOn=null)}for(;0<On.length&&(i=On[0],i.blockedOn===null);)$b(i),i.blockedOn===null&&On.shift();if(i=(t.ownerDocument||t).$$reactFormReplay,i!=null)for(n=0;n<i.length;n+=3){var s=i[n],r=i[n+1],l=s[ht]||null;if(typeof r=="function")l||U0(i);else if(l){var a=null;if(r&&r.hasAttribute("formAction")){if(s=r,l=r[ht]||null)a=l.formAction;else if(Yd(s)!==null)continue}else a=l.action;typeof a=="function"?i[n+1]=a:(i.splice(n,3),n-=3),U0(i)}}}function Bd(t){this._internalRoot=t}_u.prototype.render=Bd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(Q(409));var i=e.current,n=Qt();wb(i,n,t,e,null,null)};_u.prototype.unmount=Bd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;wb(t.current,2,null,t,null,null),Cu(),e[Pr]=null}};function _u(t){this._internalRoot=t}_u.prototype.unstable_scheduleHydration=function(t){if(t){var e=oy();t={blockedOn:null,target:t,priority:e};for(var i=0;i<On.length&&e!==0&&e<On[i].priority;i++);On.splice(i,0,t),i===0&&$b(t)}};var W0=I0.version;if(W0!=="19.1.1")throw Error(Q(527,W0,"19.1.1"));H.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(Q(188)):(t=Object.keys(t).join(","),Error(Q(268,t)));return t=LQ(e),t=t!==null?J0(t):null,t=t===null?null:t.stateNode,t};var d2={bundleType:0,version:"19.1.1",rendererPackageName:"react-dom",currentDispatcherRef:Z,reconcilerVersion:"19.1.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(gl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!gl.isDisabled&&gl.supportsFiber))try{Kl=gl.inject(d2),kt=gl}catch{}var gl;Zu.createRoot=function(t,e){if(!H0(t))throw Error(Q(299));var i=!1,n="",s=v1,r=Q1,l=w1,a=null;return e!=null&&(e.unstable_strictMode===!0&&(i=!0),e.identifierPrefix!==void 0&&(n=e.identifierPrefix),e.onUncaughtError!==void 0&&(s=e.onUncaughtError),e.onCaughtError!==void 0&&(r=e.onCaughtError),e.onRecoverableError!==void 0&&(l=e.onRecoverableError),e.unstable_transitionCallbacks!==void 0&&(a=e.unstable_transitionCallbacks)),e=vb(t,1,!1,null,null,i,n,s,r,l,a,null),t[Pr]=e.current,Zd(t),new Bd(e)};Zu.hydrateRoot=function(t,e,i){if(!H0(t))throw Error(Q(299));var n=!1,s="",r=v1,l=Q1,a=w1,o=null,u=null;return i!=null&&(i.unstable_strictMode===!0&&(n=!0),i.identifierPrefix!==void 0&&(s=i.identifierPrefix),i.onUncaughtError!==void 0&&(r=i.onUncaughtError),i.onCaughtError!==void 0&&(l=i.onCaughtError),i.onRecoverableError!==void 0&&(a=i.onRecoverableError),i.unstable_transitionCallbacks!==void 0&&(o=i.unstable_transitionCallbacks),i.formState!==void 0&&(u=i.formState)),e=vb(t,1,!0,e,i??null,n,s,r,l,a,o,u),e.context=Qb(null),i=e.current,n=Qt(),n=Jf(n),s=kn(n),s.callback=null,vn(i,s,n),i=n,e.current.lanes=i,Fl(e,i),xi(e),t[Pr]=e.current,Zd(t),new _u(e)};Zu.version="19.1.1"});var Mb=ln((vE,Cb)=>{"use strict";function Rb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rb)}catch(t){console.error(t)}}Rb(),Cb.exports=Ab()});function WO(t,e){let i=[],n=e.limits.reduce((a,o)=>Math.max(a,o.duration),0),s=[],r=new Set;setInterval(()=>{for(;;){let a=i.at(0);if(!a)return;let o=Date.now();if(s=s.filter(c=>(o-c.time)/1e3<=n),r.size>=e.maxConcurrentRequests)return;for(let c of e.limits){let h=0;for(let f of s)(o-f.time)/1e3<=c.duration&&h++;if(h>=c.maxRequests)return}i.shift(),s.push({time:Date.now()});let u=t(...a.params);r.add(u),(async()=>{let c=await u;a.callback(c),r.delete(u)})()}});let l=(...a)=>new Promise((o,u)=>{i.push({params:a,callback:c=>{o(c)}})});return l._throttled=!0,l}function kQ(t,e,i,n){let s=t;return{unsub:i(async l=>{if(!l||l._discriminator!==e)return;let a=l,o=await s[a.type](...a.contents);n({contents:o,_discriminator:e,id:a.id})}),setInterface(l){s=l}}}function vQ(t,e,i){let n=0;return new Proxy({},{get(s,r){return(...l)=>{let a=(n++).toString(),o={type:r,contents:l,_discriminator:t,id:a};return new Promise((u,c)=>{let h=e(f=>{if(!f||f._discriminator!==t)return;let d=f;d.id===a&&(u(d.contents),h())});i(o)})}}})}function IO(t,e,i){return kQ(e,t,n=>{let s=r=>n(r.data);return window.addEventListener("message",s),()=>{window.removeEventListener("message",s)}},n=>{i.postMessage(n,"*")})}function HO(t,e){return vQ(t,i=>{let n=s=>i(s.data);return window.addEventListener("message",n),()=>{window.removeEventListener("message",n)}},i=>{e.postMessage(i,"*")})}async function KO(t,e,i){return new Promise((n,s)=>{let r=setInterval(()=>{let l=t();l&&(e(i(l)),clearInterval(r),n())})})}var fQ=ah(Mb(),1),dQ=ah(ol(),1);var Ld=[],Zb=[];(()=>{let t="lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map(e=>e?parseInt(e,36):1);for(let e=0,i=0;e<t.length;e++)(e%2?Zb:Ld).push(i=i+t[e])})();function p2(t){if(t<768)return!1;for(let e=0,i=Ld.length;;){let n=e+i>>1;if(t<Ld[n])i=n;else if(t>=Zb[n])e=n+1;else return!0;if(e==i)return!1}}function Eb(t){return t>=127462&&t<=127487}var zb=8205;function Xb(t,e,i=!0,n=!0){return(i?Db:m2)(t,e,n)}function Db(t,e,i){if(e==t.length)return e;e&&Nb(t.charCodeAt(e))&&qb(t.charCodeAt(e-1))&&e--;let n=jd(t,e);for(e+=_b(n);e<t.length;){let s=jd(t,e);if(n==zb||s==zb||i&&p2(s))e+=_b(s),n=s;else if(Eb(s)){let r=0,l=e-2;for(;l>=0&&Eb(jd(t,l));)r++,l-=2;if(r%2==0)break;e+=2}else break}return e}function m2(t,e,i){for(;e>0;){let n=Db(t,e-2,i);if(n<e)return n;e--}return 0}function jd(t,e){let i=t.charCodeAt(e);if(!qb(i)||e+1==t.length)return i;let n=t.charCodeAt(e+1);return Nb(n)?(i-55296<<10)+(n-56320)+65536:i}function Nb(t){return t>=56320&&t<57344}function qb(t){return t>=55296&&t<56320}function _b(t){return t<65536?1:2}var G=class t{lineAt(e){if(e<0||e>this.length)throw new RangeError(`Invalid position ${e} in document of length ${this.length}`);return this.lineInner(e,!1,1,0)}line(e){if(e<1||e>this.lines)throw new RangeError(`Invalid line number ${e} in ${this.lines}-line document`);return this.lineInner(e,!0,1,0)}replace(e,i,n){[e,i]=Xr(this,e,i);let s=[];return this.decompose(0,e,s,2),n.length&&n.decompose(0,n.length,s,3),this.decompose(i,this.length,s,1),zr.from(s,this.length-(i-e)+n.length)}append(e){return this.replace(this.length,this.length,e)}slice(e,i=this.length){[e,i]=Xr(this,e,i);let n=[];return this.decompose(e,i,n,0),zr.from(n,i-e)}eq(e){if(e==this)return!0;if(e.length!=this.length||e.lines!=this.lines)return!1;let i=this.scanIdentical(e,1),n=this.length-this.scanIdentical(e,-1),s=new Ss(this),r=new Ss(e);for(let l=i,a=i;;){if(s.next(l),r.next(l),l=0,s.lineBreak!=r.lineBreak||s.done!=r.done||s.value!=r.value)return!1;if(a+=s.value.length,s.done||a>=n)return!0}}iter(e=1){return new Ss(this,e)}iterRange(e,i=this.length){return new Yu(this,e,i)}iterLines(e,i){let n;if(e==null)n=this.iter();else{i==null&&(i=this.lines+1);let s=this.line(e).from;n=this.iterRange(s,Math.max(s,i==this.lines+1?this.length:i<=1?0:this.line(i-1).to))}return new Bu(n)}toString(){return this.sliceString(0)}toJSON(){let e=[];return this.flatten(e),e}constructor(){}static of(e){if(e.length==0)throw new RangeError("A document must have at least one line");return e.length==1&&!e[0]?t.empty:e.length<=32?new Pt(e):zr.from(Pt.split(e,[]))}},Pt=class t extends G{constructor(e,i=O2(e)){super(),this.text=e,this.length=i}get lines(){return this.text.length}get children(){return null}lineInner(e,i,n,s){for(let r=0;;r++){let l=this.text[r],a=s+l.length;if((i?n:a)>=e)return new Gd(s,a,n,l);s=a+1,n++}}decompose(e,i,n,s){let r=e<=0&&i>=this.length?this:new t(Yb(this.text,e,i),Math.min(i,this.length)-Math.max(0,e));if(s&1){let l=n.pop(),a=qu(r.text,l.text.slice(),0,r.length);if(a.length<=32)n.push(new t(a,l.length+r.length));else{let o=a.length>>1;n.push(new t(a.slice(0,o)),new t(a.slice(o)))}}else n.push(r)}replace(e,i,n){if(!(n instanceof t))return super.replace(e,i,n);[e,i]=Xr(this,e,i);let s=qu(this.text,qu(n.text,Yb(this.text,0,e)),i),r=this.length+n.length-(i-e);return s.length<=32?new t(s,r):zr.from(t.split(s,[]),r)}sliceString(e,i=this.length,n=`
`){[e,i]=Xr(this,e,i);let s="";for(let r=0,l=0;r<=i&&l<this.text.length;l++){let a=this.text[l],o=r+a.length;r>e&&l&&(s+=n),e<o&&i>r&&(s+=a.slice(Math.max(0,e-r),i-r)),r=o+1}return s}flatten(e){for(let i of this.text)e.push(i)}scanIdentical(){return 0}static split(e,i){let n=[],s=-1;for(let r of e)n.push(r),s+=r.length+1,n.length==32&&(i.push(new t(n,s)),n=[],s=-1);return s>-1&&i.push(new t(n,s)),i}},zr=class t extends G{constructor(e,i){super(),this.children=e,this.length=i,this.lines=0;for(let n of e)this.lines+=n.lines}lineInner(e,i,n,s){for(let r=0;;r++){let l=this.children[r],a=s+l.length,o=n+l.lines-1;if((i?o:a)>=e)return l.lineInner(e,i,n,s);s=a+1,n=o+1}}decompose(e,i,n,s){for(let r=0,l=0;l<=i&&r<this.children.length;r++){let a=this.children[r],o=l+a.length;if(e<=o&&i>=l){let u=s&((l<=e?1:0)|(o>=i?2:0));l>=e&&o<=i&&!u?n.push(a):a.decompose(e-l,i-l,n,u)}l=o+1}}replace(e,i,n){if([e,i]=Xr(this,e,i),n.lines<this.lines)for(let s=0,r=0;s<this.children.length;s++){let l=this.children[s],a=r+l.length;if(e>=r&&i<=a){let o=l.replace(e-r,i-r,n),u=this.lines-l.lines+o.lines;if(o.lines<u>>4&&o.lines>u>>6){let c=this.children.slice();return c[s]=o,new t(c,this.length-(i-e)+n.length)}return super.replace(r,a,o)}r=a+1}return super.replace(e,i,n)}sliceString(e,i=this.length,n=`
`){[e,i]=Xr(this,e,i);let s="";for(let r=0,l=0;r<this.children.length&&l<=i;r++){let a=this.children[r],o=l+a.length;l>e&&r&&(s+=n),e<o&&i>l&&(s+=a.sliceString(e-l,i-l,n)),l=o+1}return s}flatten(e){for(let i of this.children)i.flatten(e)}scanIdentical(e,i){if(!(e instanceof t))return 0;let n=0,[s,r,l,a]=i>0?[0,0,this.children.length,e.children.length]:[this.children.length-1,e.children.length-1,-1,-1];for(;;s+=i,r+=i){if(s==l||r==a)return n;let o=this.children[s],u=e.children[r];if(o!=u)return n+o.scanIdentical(u,i);n+=o.length+1}}static from(e,i=e.reduce((n,s)=>n+s.length+1,-1)){let n=0;for(let d of e)n+=d.lines;if(n<32){let d=[];for(let m of e)m.flatten(d);return new Pt(d,i)}let s=Math.max(32,n>>5),r=s<<1,l=s>>1,a=[],o=0,u=-1,c=[];function h(d){let m;if(d.lines>r&&d instanceof t)for(let g of d.children)h(g);else d.lines>l&&(o>l||!o)?(f(),a.push(d)):d instanceof Pt&&o&&(m=c[c.length-1])instanceof Pt&&d.lines+m.lines<=32?(o+=d.lines,u+=d.length+1,c[c.length-1]=new Pt(m.text.concat(d.text),m.length+1+d.length)):(o+d.lines>s&&f(),o+=d.lines,u+=d.length+1,c.push(d))}function f(){o!=0&&(a.push(c.length==1?c[0]:t.from(c,u)),u=-1,o=c.length=0)}for(let d of e)h(d);return f(),a.length==1?a[0]:new t(a,i)}};G.empty=new Pt([""],0);function O2(t){let e=-1;for(let i of t)e+=i.length+1;return e}function qu(t,e,i=0,n=1e9){for(let s=0,r=0,l=!0;r<t.length&&s<=n;r++){let a=t[r],o=s+a.length;o>=i&&(o>n&&(a=a.slice(0,n-s)),s<i&&(a=a.slice(i-s)),l?(e[e.length-1]+=a,l=!1):e.push(a)),s=o+1}return e}function Yb(t,e,i){return qu(t,[""],e,i)}var Ss=class{constructor(e,i=1){this.dir=i,this.done=!1,this.lineBreak=!1,this.value="",this.nodes=[e],this.offsets=[i>0?1:(e instanceof Pt?e.text.length:e.children.length)<<1]}nextInner(e,i){for(this.done=this.lineBreak=!1;;){let n=this.nodes.length-1,s=this.nodes[n],r=this.offsets[n],l=r>>1,a=s instanceof Pt?s.text.length:s.children.length;if(l==(i>0?a:0)){if(n==0)return this.done=!0,this.value="",this;i>0&&this.offsets[n-1]++,this.nodes.pop(),this.offsets.pop()}else if((r&1)==(i>0?0:1)){if(this.offsets[n]+=i,e==0)return this.lineBreak=!0,this.value=`
`,this;e--}else if(s instanceof Pt){let o=s.text[l+(i<0?-1:0)];if(this.offsets[n]+=i,o.length>Math.max(0,e))return this.value=e==0?o:i>0?o.slice(e):o.slice(0,o.length-e),this;e-=o.length}else{let o=s.children[l+(i<0?-1:0)];e>o.length?(e-=o.length,this.offsets[n]+=i):(i<0&&this.offsets[n]--,this.nodes.push(o),this.offsets.push(i>0?1:(o instanceof Pt?o.text.length:o.children.length)<<1))}}}next(e=0){return e<0&&(this.nextInner(-e,-this.dir),e=this.value.length),this.nextInner(e,this.dir)}},Yu=class{constructor(e,i,n){this.value="",this.done=!1,this.cursor=new Ss(e,i>n?-1:1),this.pos=i>n?e.length:0,this.from=Math.min(i,n),this.to=Math.max(i,n)}nextInner(e,i){if(i<0?this.pos<=this.from:this.pos>=this.to)return this.value="",this.done=!0,this;e+=Math.max(0,i<0?this.pos-this.to:this.from-this.pos);let n=i<0?this.pos-this.from:this.to-this.pos;e>n&&(e=n),n-=e;let{value:s}=this.cursor.next(e);return this.pos+=(s.length+e)*i,this.value=s.length<=n?s:i<0?s.slice(s.length-n):s.slice(0,n),this.done=!this.value,this}next(e=0){return e<0?e=Math.max(e,this.from-this.pos):e>0&&(e=Math.min(e,this.to-this.pos)),this.nextInner(e,this.cursor.dir)}get lineBreak(){return this.cursor.lineBreak&&this.value!=""}},Bu=class{constructor(e){this.inner=e,this.afterBreak=!0,this.value="",this.done=!1}next(e=0){let{done:i,lineBreak:n,value:s}=this.inner.next(e);return i&&this.afterBreak?(this.value="",this.afterBreak=!1):i?(this.done=!0,this.value=""):n?this.afterBreak?this.value="":(this.afterBreak=!0,this.next()):(this.value=s,this.afterBreak=!1),this}get lineBreak(){return!1}};typeof Symbol<"u"&&(G.prototype[Symbol.iterator]=function(){return this.iter()},Ss.prototype[Symbol.iterator]=Yu.prototype[Symbol.iterator]=Bu.prototype[Symbol.iterator]=function(){return this});var Gd=class{constructor(e,i,n,s){this.from=e,this.to=i,this.number=n,this.text=s}get length(){return this.to-this.from}};function Xr(t,e,i){return e=Math.max(0,Math.min(t.length,e)),[e,Math.max(e,Math.min(t.length,i))]}function Le(t,e,i=!0,n=!0){return Xb(t,e,i,n)}function g2(t){return t>=56320&&t<57344}function y2(t){return t>=55296&&t<56320}function Gb(t,e){let i=t.charCodeAt(e);if(!y2(i)||e+1==t.length)return i;let n=t.charCodeAt(e+1);return g2(n)?(i-55296<<10)+(n-56320)+65536:i}function Ub(t){return t<65536?1:2}var Ud=/\r\n?|\n/,dt=function(t){return t[t.Simple=0]="Simple",t[t.TrackDel=1]="TrackDel",t[t.TrackBefore=2]="TrackBefore",t[t.TrackAfter=3]="TrackAfter",t}(dt||(dt={})),Ji=class t{constructor(e){this.sections=e}get length(){let e=0;for(let i=0;i<this.sections.length;i+=2)e+=this.sections[i];return e}get newLength(){let e=0;for(let i=0;i<this.sections.length;i+=2){let n=this.sections[i+1];e+=n<0?this.sections[i]:n}return e}get empty(){return this.sections.length==0||this.sections.length==2&&this.sections[1]<0}iterGaps(e){for(let i=0,n=0,s=0;i<this.sections.length;){let r=this.sections[i++],l=this.sections[i++];l<0?(e(n,s,r),s+=r):s+=l,n+=r}}iterChangedRanges(e,i=!1){Wd(this,e,i)}get invertedDesc(){let e=[];for(let i=0;i<this.sections.length;){let n=this.sections[i++],s=this.sections[i++];s<0?e.push(n,s):e.push(s,n)}return new t(e)}composeDesc(e){return this.empty?e:e.empty?this:Wb(this,e)}mapDesc(e,i=!1){return e.empty?this:Id(this,e,i)}mapPos(e,i=-1,n=dt.Simple){let s=0,r=0;for(let l=0;l<this.sections.length;){let a=this.sections[l++],o=this.sections[l++],u=s+a;if(o<0){if(u>e)return r+(e-s);r+=a}else{if(n!=dt.Simple&&u>=e&&(n==dt.TrackDel&&s<e&&u>e||n==dt.TrackBefore&&s<e||n==dt.TrackAfter&&u>e))return null;if(u>e||u==e&&i<0&&!a)return e==s||i<0?r:r+o;r+=o}s=u}if(e>s)throw new RangeError(`Position ${e} is out of range for changeset of length ${s}`);return r}touchesRange(e,i=e){for(let n=0,s=0;n<this.sections.length&&s<=i;){let r=this.sections[n++],l=this.sections[n++],a=s+r;if(l>=0&&s<=i&&a>=e)return s<e&&a>i?"cover":!0;s=a}return!1}toString(){let e="";for(let i=0;i<this.sections.length;){let n=this.sections[i++],s=this.sections[i++];e+=(e?" ":"")+n+(s>=0?":"+s:"")}return e}toJSON(){return this.sections}static fromJSON(e){if(!Array.isArray(e)||e.length%2||e.some(i=>typeof i!="number"))throw new RangeError("Invalid JSON representation of ChangeDesc");return new t(e)}static create(e){return new t(e)}},nt=class t extends Ji{constructor(e,i){super(e),this.inserted=i}apply(e){if(this.length!=e.length)throw new RangeError("Applying change set to a document with the wrong length");return Wd(this,(i,n,s,r,l)=>e=e.replace(s,s+(n-i),l),!1),e}mapDesc(e,i=!1){return Id(this,e,i,!0)}invert(e){let i=this.sections.slice(),n=[];for(let s=0,r=0;s<i.length;s+=2){let l=i[s],a=i[s+1];if(a>=0){i[s]=a,i[s+1]=l;let o=s>>1;for(;n.length<o;)n.push(G.empty);n.push(l?e.slice(r,r+l):G.empty)}r+=l}return new t(i,n)}compose(e){return this.empty?e:e.empty?this:Wb(this,e,!0)}map(e,i=!1){return e.empty?this:Id(this,e,i,!0)}iterChanges(e,i=!1){Wd(this,e,i)}get desc(){return Ji.create(this.sections)}filter(e){let i=[],n=[],s=[],r=new ks(this);e:for(let l=0,a=0;;){let o=l==e.length?1e9:e[l++];for(;a<o||a==o&&r.len==0;){if(r.done)break e;let c=Math.min(r.len,o-a);Ke(s,c,-1);let h=r.ins==-1?-1:r.off==0?r.ins:0;Ke(i,c,h),h>0&&zn(n,i,r.text),r.forward(c),a+=c}let u=e[l++];for(;a<u;){if(r.done)break e;let c=Math.min(r.len,u-a);Ke(i,c,-1),Ke(s,c,r.ins==-1?-1:r.off==0?r.ins:0),r.forward(c),a+=c}}return{changes:new t(i,n),filtered:Ji.create(s)}}toJSON(){let e=[];for(let i=0;i<this.sections.length;i+=2){let n=this.sections[i],s=this.sections[i+1];s<0?e.push(n):s==0?e.push([n]):e.push([n].concat(this.inserted[i>>1].toJSON()))}return e}static of(e,i,n){let s=[],r=[],l=0,a=null;function o(c=!1){if(!c&&!s.length)return;l<i&&Ke(s,i-l,-1);let h=new t(s,r);a=a?a.compose(h.map(a)):h,s=[],r=[],l=0}function u(c){if(Array.isArray(c))for(let h of c)u(h);else if(c instanceof t){if(c.length!=i)throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${i})`);o(),a=a?a.compose(c.map(a)):c}else{let{from:h,to:f=h,insert:d}=c;if(h>f||h<0||f>i)throw new RangeError(`Invalid change range ${h} to ${f} (in doc of length ${i})`);let m=d?typeof d=="string"?G.of(d.split(n||Ud)):d:G.empty,g=m.length;if(h==f&&g==0)return;h<l&&o(),h>l&&Ke(s,h-l,-1),Ke(s,f-h,g),zn(r,s,m),l=f}}return u(e),o(!a),a}static empty(e){return new t(e?[e,-1]:[],[])}static fromJSON(e){if(!Array.isArray(e))throw new RangeError("Invalid JSON representation of ChangeSet");let i=[],n=[];for(let s=0;s<e.length;s++){let r=e[s];if(typeof r=="number")i.push(r,-1);else{if(!Array.isArray(r)||typeof r[0]!="number"||r.some((l,a)=>a&&typeof l!="string"))throw new RangeError("Invalid JSON representation of ChangeSet");if(r.length==1)i.push(r[0],0);else{for(;n.length<s;)n.push(G.empty);n[s]=G.of(r.slice(1)),i.push(r[0],n[s].length)}}}return new t(i,n)}static createSet(e,i){return new t(e,i)}};function Ke(t,e,i,n=!1){if(e==0&&i<=0)return;let s=t.length-2;s>=0&&i<=0&&i==t[s+1]?t[s]+=e:s>=0&&e==0&&t[s]==0?t[s+1]+=i:n?(t[s]+=e,t[s+1]+=i):t.push(e,i)}function zn(t,e,i){if(i.length==0)return;let n=e.length-2>>1;if(n<t.length)t[t.length-1]=t[t.length-1].append(i);else{for(;t.length<n;)t.push(G.empty);t.push(i)}}function Wd(t,e,i){let n=t.inserted;for(let s=0,r=0,l=0;l<t.sections.length;){let a=t.sections[l++],o=t.sections[l++];if(o<0)s+=a,r+=a;else{let u=s,c=r,h=G.empty;for(;u+=a,c+=o,o&&n&&(h=h.append(n[l-2>>1])),!(i||l==t.sections.length||t.sections[l+1]<0);)a=t.sections[l++],o=t.sections[l++];e(s,u,r,c,h),s=u,r=c}}}function Id(t,e,i,n=!1){let s=[],r=n?[]:null,l=new ks(t),a=new ks(e);for(let o=-1;;){if(l.done&&a.len||a.done&&l.len)throw new Error("Mismatched change set lengths");if(l.ins==-1&&a.ins==-1){let u=Math.min(l.len,a.len);Ke(s,u,-1),l.forward(u),a.forward(u)}else if(a.ins>=0&&(l.ins<0||o==l.i||l.off==0&&(a.len<l.len||a.len==l.len&&!i))){let u=a.len;for(Ke(s,a.ins,-1);u;){let c=Math.min(l.len,u);l.ins>=0&&o<l.i&&l.len<=c&&(Ke(s,0,l.ins),r&&zn(r,s,l.text),o=l.i),l.forward(c),u-=c}a.next()}else if(l.ins>=0){let u=0,c=l.len;for(;c;)if(a.ins==-1){let h=Math.min(c,a.len);u+=h,c-=h,a.forward(h)}else if(a.ins==0&&a.len<c)c-=a.len,a.next();else break;Ke(s,u,o<l.i?l.ins:0),r&&o<l.i&&zn(r,s,l.text),o=l.i,l.forward(l.len-c)}else{if(l.done&&a.done)return r?nt.createSet(s,r):Ji.create(s);throw new Error("Mismatched change set lengths")}}}function Wb(t,e,i=!1){let n=[],s=i?[]:null,r=new ks(t),l=new ks(e);for(let a=!1;;){if(r.done&&l.done)return s?nt.createSet(n,s):Ji.create(n);if(r.ins==0)Ke(n,r.len,0,a),r.next();else if(l.len==0&&!l.done)Ke(n,0,l.ins,a),s&&zn(s,n,l.text),l.next();else{if(r.done||l.done)throw new Error("Mismatched change set lengths");{let o=Math.min(r.len2,l.len),u=n.length;if(r.ins==-1){let c=l.ins==-1?-1:l.off?0:l.ins;Ke(n,o,c,a),s&&c&&zn(s,n,l.text)}else l.ins==-1?(Ke(n,r.off?0:r.len,o,a),s&&zn(s,n,r.textBit(o))):(Ke(n,r.off?0:r.len,l.off?0:l.ins,a),s&&!l.off&&zn(s,n,l.text));a=(r.ins>o||l.ins>=0&&l.len>o)&&(a||n.length>u),r.forward2(o),l.forward(o)}}}}var ks=class{constructor(e){this.set=e,this.i=0,this.next()}next(){let{sections:e}=this.set;this.i<e.length?(this.len=e[this.i++],this.ins=e[this.i++]):(this.len=0,this.ins=-2),this.off=0}get done(){return this.ins==-2}get len2(){return this.ins<0?this.len:this.ins}get text(){let{inserted:e}=this.set,i=this.i-2>>1;return i>=e.length?G.empty:e[i]}textBit(e){let{inserted:i}=this.set,n=this.i-2>>1;return n>=i.length&&!e?G.empty:i[n].slice(this.off,e==null?void 0:this.off+e)}forward(e){e==this.len?this.next():(this.len-=e,this.off+=e)}forward2(e){this.ins==-1?this.forward(e):e==this.ins?this.next():(this.ins-=e,this.off+=e)}},Er=class t{constructor(e,i,n){this.from=e,this.to=i,this.flags=n}get anchor(){return this.flags&32?this.to:this.from}get head(){return this.flags&32?this.from:this.to}get empty(){return this.from==this.to}get assoc(){return this.flags&8?-1:this.flags&16?1:0}get bidiLevel(){let e=this.flags&7;return e==7?null:e}get goalColumn(){let e=this.flags>>6;return e==16777215?void 0:e}map(e,i=-1){let n,s;return this.empty?n=s=e.mapPos(this.from,i):(n=e.mapPos(this.from,1),s=e.mapPos(this.to,-1)),n==this.from&&s==this.to?this:new t(n,s,this.flags)}extend(e,i=e){if(e<=this.anchor&&i>=this.anchor)return A.range(e,i);let n=Math.abs(e-this.anchor)>Math.abs(i-this.anchor)?e:i;return A.range(this.anchor,n)}eq(e,i=!1){return this.anchor==e.anchor&&this.head==e.head&&(!i||!this.empty||this.assoc==e.assoc)}toJSON(){return{anchor:this.anchor,head:this.head}}static fromJSON(e){if(!e||typeof e.anchor!="number"||typeof e.head!="number")throw new RangeError("Invalid JSON representation for SelectionRange");return A.range(e.anchor,e.head)}static create(e,i,n){return new t(e,i,n)}},A=class t{constructor(e,i){this.ranges=e,this.mainIndex=i}map(e,i=-1){return e.empty?this:t.create(this.ranges.map(n=>n.map(e,i)),this.mainIndex)}eq(e,i=!1){if(this.ranges.length!=e.ranges.length||this.mainIndex!=e.mainIndex)return!1;for(let n=0;n<this.ranges.length;n++)if(!this.ranges[n].eq(e.ranges[n],i))return!1;return!0}get main(){return this.ranges[this.mainIndex]}asSingle(){return this.ranges.length==1?this:new t([this.main],0)}addRange(e,i=!0){return t.create([e].concat(this.ranges),i?0:this.mainIndex+1)}replaceRange(e,i=this.mainIndex){let n=this.ranges.slice();return n[i]=e,t.create(n,this.mainIndex)}toJSON(){return{ranges:this.ranges.map(e=>e.toJSON()),main:this.mainIndex}}static fromJSON(e){if(!e||!Array.isArray(e.ranges)||typeof e.main!="number"||e.main>=e.ranges.length)throw new RangeError("Invalid JSON representation for EditorSelection");return new t(e.ranges.map(i=>Er.fromJSON(i)),e.main)}static single(e,i=e){return new t([t.range(e,i)],0)}static create(e,i=0){if(e.length==0)throw new RangeError("A selection needs at least one range");for(let n=0,s=0;s<e.length;s++){let r=e[s];if(r.empty?r.from<=n:r.from<n)return t.normalized(e.slice(),i);n=r.to}return new t(e,i)}static cursor(e,i=0,n,s){return Er.create(e,e,(i==0?0:i<0?8:16)|(n==null?7:Math.min(6,n))|(s??16777215)<<6)}static range(e,i,n,s){let r=(n??16777215)<<6|(s==null?7:Math.min(6,s));return i<e?Er.create(i,e,48|r):Er.create(e,i,(i>e?8:0)|r)}static normalized(e,i=0){let n=e[i];e.sort((s,r)=>s.from-r.from),i=e.indexOf(n);for(let s=1;s<e.length;s++){let r=e[s],l=e[s-1];if(r.empty?r.from<=l.to:r.from<l.to){let a=l.from,o=Math.max(r.to,l.to);s<=i&&i--,e.splice(--s,2,r.anchor>r.head?t.range(o,a):t.range(a,o))}}return new t(e,i)}};function Ib(t,e){for(let i of t.ranges)if(i.to>e)throw new RangeError("Selection points outside of document")}var rp=0,E=class t{constructor(e,i,n,s,r){this.combine=e,this.compareInput=i,this.compare=n,this.isStatic=s,this.id=rp++,this.default=e([]),this.extensions=typeof r=="function"?r(this):r}get reader(){return this}static define(e={}){return new t(e.combine||(i=>i),e.compareInput||((i,n)=>i===n),e.compare||(e.combine?(i,n)=>i===n:lp),!!e.static,e.enables)}of(e){return new _r([],this,0,e)}compute(e,i){if(this.isStatic)throw new Error("Can't compute a static facet");return new _r(e,this,1,i)}computeN(e,i){if(this.isStatic)throw new Error("Can't compute a static facet");return new _r(e,this,2,i)}from(e,i){return i||(i=n=>n),this.compute([e],n=>i(n.field(e)))}};function lp(t,e){return t==e||t.length==e.length&&t.every((i,n)=>i===e[n])}var _r=class{constructor(e,i,n,s){this.dependencies=e,this.facet=i,this.type=n,this.value=s,this.id=rp++}dynamicSlot(e){var i;let n=this.value,s=this.facet.compareInput,r=this.id,l=e[r]>>1,a=this.type==2,o=!1,u=!1,c=[];for(let h of this.dependencies)h=="doc"?o=!0:h=="selection"?u=!0:(((i=e[h.id])!==null&&i!==void 0?i:1)&1)==0&&c.push(e[h.id]);return{create(h){return h.values[l]=n(h),1},update(h,f){if(o&&f.docChanged||u&&(f.docChanged||f.selection)||Hd(h,c)){let d=n(h);if(a?!Bb(d,h.values[l],s):!s(d,h.values[l]))return h.values[l]=d,1}return 0},reconfigure:(h,f)=>{let d,m=f.config.address[r];if(m!=null){let g=Gu(f,m);if(this.dependencies.every(x=>x instanceof E?f.facet(x)===h.facet(x):x instanceof si?f.field(x,!1)==h.field(x,!1):!0)||(a?Bb(d=n(h),g,s):s(d=n(h),g)))return h.values[l]=g,0}else d=n(h);return h.values[l]=d,1}}}};function Bb(t,e,i){if(t.length!=e.length)return!1;for(let n=0;n<t.length;n++)if(!i(t[n],e[n]))return!1;return!0}function Hd(t,e){let i=!1;for(let n of e)da(t,n)&1&&(i=!0);return i}function b2(t,e,i){let n=i.map(o=>t[o.id]),s=i.map(o=>o.type),r=n.filter(o=>!(o&1)),l=t[e.id]>>1;function a(o){let u=[];for(let c=0;c<n.length;c++){let h=Gu(o,n[c]);if(s[c]==2)for(let f of h)u.push(f);else u.push(h)}return e.combine(u)}return{create(o){for(let u of n)da(o,u);return o.values[l]=a(o),1},update(o,u){if(!Hd(o,r))return 0;let c=a(o);return e.compare(c,o.values[l])?0:(o.values[l]=c,1)},reconfigure(o,u){let c=Hd(o,n),h=u.config.facets[e.id],f=u.facet(e);if(h&&!c&&lp(i,h))return o.values[l]=f,0;let d=a(o);return e.compare(d,f)?(o.values[l]=f,0):(o.values[l]=d,1)}}}var Xu=E.define({static:!0}),si=class t{constructor(e,i,n,s,r){this.id=e,this.createF=i,this.updateF=n,this.compareF=s,this.spec=r,this.provides=void 0}static define(e){let i=new t(rp++,e.create,e.update,e.compare||((n,s)=>n===s),e);return e.provide&&(i.provides=e.provide(i)),i}create(e){let i=e.facet(Xu).find(n=>n.field==this);return(i?.create||this.createF)(e)}slot(e){let i=e[this.id]>>1;return{create:n=>(n.values[i]=this.create(n),1),update:(n,s)=>{let r=n.values[i],l=this.updateF(r,s);return this.compareF(r,l)?0:(n.values[i]=l,1)},reconfigure:(n,s)=>{let r=n.facet(Xu),l=s.facet(Xu),a;return(a=r.find(o=>o.field==this))&&a!=l.find(o=>o.field==this)?(n.values[i]=a.create(n),1):s.config.address[this.id]!=null?(n.values[i]=s.field(this),0):(n.values[i]=this.create(n),1)}}}init(e){return[this,Xu.of({field:this,create:e})]}get extension(){return this}},bs={lowest:4,low:3,default:2,high:1,highest:0};function fa(t){return e=>new ju(e,t)}var ga={highest:fa(bs.highest),high:fa(bs.high),default:fa(bs.default),low:fa(bs.low),lowest:fa(bs.lowest)},ju=class{constructor(e,i){this.inner=e,this.prec=i}},Lu=class t{of(e){return new pa(this,e)}reconfigure(e){return t.reconfigure.of({compartment:this,extension:e})}get(e){return e.config.compartments.get(this)}},pa=class{constructor(e,i){this.compartment=e,this.inner=i}},Vu=class t{constructor(e,i,n,s,r,l){for(this.base=e,this.compartments=i,this.dynamicSlots=n,this.address=s,this.staticValues=r,this.facets=l,this.statusTemplate=[];this.statusTemplate.length<n.length;)this.statusTemplate.push(0)}staticFacet(e){let i=this.address[e.id];return i==null?e.default:this.staticValues[i>>1]}static resolve(e,i,n){let s=[],r=Object.create(null),l=new Map;for(let f of x2(e,i,l))f instanceof si?s.push(f):(r[f.facet.id]||(r[f.facet.id]=[])).push(f);let a=Object.create(null),o=[],u=[];for(let f of s)a[f.id]=u.length<<1,u.push(d=>f.slot(d));let c=n?.config.facets;for(let f in r){let d=r[f],m=d[0].facet,g=c&&c[f]||[];if(d.every(x=>x.type==0))if(a[m.id]=o.length<<1|1,lp(g,d))o.push(n.facet(m));else{let x=m.combine(d.map(p=>p.value));o.push(n&&m.compare(x,n.facet(m))?n.facet(m):x)}else{for(let x of d)x.type==0?(a[x.id]=o.length<<1|1,o.push(x.value)):(a[x.id]=u.length<<1,u.push(p=>x.dynamicSlot(p)));a[m.id]=u.length<<1,u.push(x=>b2(x,m,d))}}let h=u.map(f=>f(a));return new t(e,l,h,a,o,r)}};function x2(t,e,i){let n=[[],[],[],[],[]],s=new Map;function r(l,a){let o=s.get(l);if(o!=null){if(o<=a)return;let u=n[o].indexOf(l);u>-1&&n[o].splice(u,1),l instanceof pa&&i.delete(l.compartment)}if(s.set(l,a),Array.isArray(l))for(let u of l)r(u,a);else if(l instanceof pa){if(i.has(l.compartment))throw new RangeError("Duplicate use of compartment in extensions");let u=e.get(l.compartment)||l.inner;i.set(l.compartment,u),r(u,a)}else if(l instanceof ju)r(l.inner,l.prec);else if(l instanceof si)n[a].push(l),l.provides&&r(l.provides,a);else if(l instanceof _r)n[a].push(l),l.facet.extensions&&r(l.facet.extensions,bs.default);else{let u=l.extension;if(!u)throw new Error(`Unrecognized extension value in extension set (${l}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);r(u,a)}}return r(t,bs.default),n.reduce((l,a)=>l.concat(a))}function da(t,e){if(e&1)return 2;let i=e>>1,n=t.status[i];if(n==4)throw new Error("Cyclic dependency between fields and/or facets");if(n&2)return n;t.status[i]=4;let s=t.computeSlot(t,t.config.dynamicSlots[i]);return t.status[i]=2|s}function Gu(t,e){return e&1?t.config.staticValues[e>>1]:t.values[e>>1]}var Hb=E.define(),Kd=E.define({combine:t=>t.some(e=>e),static:!0}),Kb=E.define({combine:t=>t.length?t[0]:void 0,static:!0}),Jb=E.define(),Fb=E.define(),ex=E.define(),tx=E.define({combine:t=>t.length?t[0]:!1}),Lt=class{constructor(e,i){this.type=e,this.value=i}static define(){return new Jd}},Jd=class{of(e){return new Lt(this,e)}},Fd=class{constructor(e){this.map=e}of(e){return new de(this,e)}},de=class t{constructor(e,i){this.type=e,this.value=i}map(e){let i=this.type.map(this.value,e);return i===void 0?void 0:i==this.value?this:new t(this.type,i)}is(e){return this.type==e}static define(e={}){return new Fd(e.map||(i=>i))}static mapEffects(e,i){if(!e.length)return e;let n=[];for(let s of e){let r=s.map(i);r&&n.push(r)}return n}};de.reconfigure=de.define();de.appendConfig=de.define();var Ze=class t{constructor(e,i,n,s,r,l){this.startState=e,this.changes=i,this.selection=n,this.effects=s,this.annotations=r,this.scrollIntoView=l,this._doc=null,this._state=null,n&&Ib(n,i.newLength),r.some(a=>a.type==t.time)||(this.annotations=r.concat(t.time.of(Date.now())))}static create(e,i,n,s,r,l){return new t(e,i,n,s,r,l)}get newDoc(){return this._doc||(this._doc=this.changes.apply(this.startState.doc))}get newSelection(){return this.selection||this.startState.selection.map(this.changes)}get state(){return this._state||this.startState.applyTransaction(this),this._state}annotation(e){for(let i of this.annotations)if(i.type==e)return i.value}get docChanged(){return!this.changes.empty}get reconfigured(){return this.startState.config!=this.state.config}isUserEvent(e){let i=this.annotation(t.userEvent);return!!(i&&(i==e||i.length>e.length&&i.slice(0,e.length)==e&&i[e.length]=="."))}};Ze.time=Lt.define();Ze.userEvent=Lt.define();Ze.addToHistory=Lt.define();Ze.remote=Lt.define();function S2(t,e){let i=[];for(let n=0,s=0;;){let r,l;if(n<t.length&&(s==e.length||e[s]>=t[n]))r=t[n++],l=t[n++];else if(s<e.length)r=e[s++],l=e[s++];else return i;!i.length||i[i.length-1]<r?i.push(r,l):i[i.length-1]<l&&(i[i.length-1]=l)}}function ix(t,e,i){var n;let s,r,l;return i?(s=e.changes,r=nt.empty(e.changes.length),l=t.changes.compose(e.changes)):(s=e.changes.map(t.changes),r=t.changes.mapDesc(e.changes,!0),l=t.changes.compose(s)),{changes:l,selection:e.selection?e.selection.map(r):(n=t.selection)===null||n===void 0?void 0:n.map(s),effects:de.mapEffects(t.effects,s).concat(de.mapEffects(e.effects,r)),annotations:t.annotations.length?t.annotations.concat(e.annotations):e.annotations,scrollIntoView:t.scrollIntoView||e.scrollIntoView}}function ep(t,e,i){let n=e.selection,s=Zr(e.annotations);return e.userEvent&&(s=s.concat(Ze.userEvent.of(e.userEvent))),{changes:e.changes instanceof nt?e.changes:nt.of(e.changes||[],i,t.facet(Kb)),selection:n&&(n instanceof A?n:A.single(n.anchor,n.head)),effects:Zr(e.effects),annotations:s,scrollIntoView:!!e.scrollIntoView}}function nx(t,e,i){let n=ep(t,e.length?e[0]:{},t.doc.length);e.length&&e[0].filter===!1&&(i=!1);for(let r=1;r<e.length;r++){e[r].filter===!1&&(i=!1);let l=!!e[r].sequential;n=ix(n,ep(t,e[r],l?n.changes.newLength:t.doc.length),l)}let s=Ze.create(t,n.changes,n.selection,n.effects,n.annotations,n.scrollIntoView);return v2(i?k2(s):s)}function k2(t){let e=t.startState,i=!0;for(let s of e.facet(Jb)){let r=s(t);if(r===!1){i=!1;break}Array.isArray(r)&&(i=i===!0?r:S2(i,r))}if(i!==!0){let s,r;if(i===!1)r=t.changes.invertedDesc,s=nt.empty(e.doc.length);else{let l=t.changes.filter(i);s=l.changes,r=l.filtered.mapDesc(l.changes).invertedDesc}t=Ze.create(e,s,t.selection&&t.selection.map(r),de.mapEffects(t.effects,r),t.annotations,t.scrollIntoView)}let n=e.facet(Fb);for(let s=n.length-1;s>=0;s--){let r=n[s](t);r instanceof Ze?t=r:Array.isArray(r)&&r.length==1&&r[0]instanceof Ze?t=r[0]:t=nx(e,Zr(r),!1)}return t}function v2(t){let e=t.startState,i=e.facet(ex),n=t;for(let s=i.length-1;s>=0;s--){let r=i[s](t);r&&Object.keys(r).length&&(n=ix(n,ep(e,r,t.changes.newLength),!0))}return n==t?t:Ze.create(e,t.changes,t.selection,n.effects,n.annotations,n.scrollIntoView)}var Q2=[];function Zr(t){return t==null?Q2:Array.isArray(t)?t:[t]}var ni=function(t){return t[t.Word=0]="Word",t[t.Space=1]="Space",t[t.Other=2]="Other",t}(ni||(ni={})),w2=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,tp;try{tp=new RegExp("[\\p{Alphabetic}\\p{Number}_]","u")}catch{}function T2(t){if(tp)return tp.test(t);for(let e=0;e<t.length;e++){let i=t[e];if(/\w/.test(i)||i>"\x80"&&(i.toUpperCase()!=i.toLowerCase()||w2.test(i)))return!0}return!1}function P2(t){return e=>{if(!/\S/.test(e))return ni.Space;if(T2(e))return ni.Word;for(let i=0;i<t.length;i++)if(e.indexOf(t[i])>-1)return ni.Word;return ni.Other}}var be=class t{constructor(e,i,n,s,r,l){this.config=e,this.doc=i,this.selection=n,this.values=s,this.status=e.statusTemplate.slice(),this.computeSlot=r,l&&(l._state=this);for(let a=0;a<this.config.dynamicSlots.length;a++)da(this,a<<1);this.computeSlot=null}field(e,i=!0){let n=this.config.address[e.id];if(n==null){if(i)throw new RangeError("Field is not present in this state");return}return da(this,n),Gu(this,n)}update(...e){return nx(this,e,!0)}applyTransaction(e){let i=this.config,{base:n,compartments:s}=i;for(let a of e.effects)a.is(Lu.reconfigure)?(i&&(s=new Map,i.compartments.forEach((o,u)=>s.set(u,o)),i=null),s.set(a.value.compartment,a.value.extension)):a.is(de.reconfigure)?(i=null,n=a.value):a.is(de.appendConfig)&&(i=null,n=Zr(n).concat(a.value));let r;i?r=e.startState.values.slice():(i=Vu.resolve(n,s,this),r=new t(i,this.doc,this.selection,i.dynamicSlots.map(()=>null),(o,u)=>u.reconfigure(o,this),null).values);let l=e.startState.facet(Kd)?e.newSelection:e.newSelection.asSingle();new t(i,e.newDoc,l,r,(a,o)=>o.update(a,e),e)}replaceSelection(e){return typeof e=="string"&&(e=this.toText(e)),this.changeByRange(i=>({changes:{from:i.from,to:i.to,insert:e},range:A.cursor(i.from+e.length)}))}changeByRange(e){let i=this.selection,n=e(i.ranges[0]),s=this.changes(n.changes),r=[n.range],l=Zr(n.effects);for(let a=1;a<i.ranges.length;a++){let o=e(i.ranges[a]),u=this.changes(o.changes),c=u.map(s);for(let f=0;f<a;f++)r[f]=r[f].map(c);let h=s.mapDesc(u,!0);r.push(o.range.map(h)),s=s.compose(c),l=de.mapEffects(l,c).concat(de.mapEffects(Zr(o.effects),h))}return{changes:s,selection:A.create(r,i.mainIndex),effects:l}}changes(e=[]){return e instanceof nt?e:nt.of(e,this.doc.length,this.facet(t.lineSeparator))}toText(e){return G.of(e.split(this.facet(t.lineSeparator)||Ud))}sliceDoc(e=0,i=this.doc.length){return this.doc.sliceString(e,i,this.lineBreak)}facet(e){let i=this.config.address[e.id];return i==null?e.default:(da(this,i),Gu(this,i))}toJSON(e){let i={doc:this.sliceDoc(),selection:this.selection.toJSON()};if(e)for(let n in e){let s=e[n];s instanceof si&&this.config.address[s.id]!=null&&(i[n]=s.spec.toJSON(this.field(e[n]),this))}return i}static fromJSON(e,i={},n){if(!e||typeof e.doc!="string")throw new RangeError("Invalid JSON representation for EditorState");let s=[];if(n){for(let r in n)if(Object.prototype.hasOwnProperty.call(e,r)){let l=n[r],a=e[r];s.push(l.init(o=>l.spec.fromJSON(a,o)))}}return t.create({doc:e.doc,selection:A.fromJSON(e.selection),extensions:i.extensions?s.concat([i.extensions]):s})}static create(e={}){let i=Vu.resolve(e.extensions||[],new Map),n=e.doc instanceof G?e.doc:G.of((e.doc||"").split(i.staticFacet(t.lineSeparator)||Ud)),s=e.selection?e.selection instanceof A?e.selection:A.single(e.selection.anchor,e.selection.head):A.single(0);return Ib(s,n.length),i.staticFacet(Kd)||(s=s.asSingle()),new t(i,n,s,i.dynamicSlots.map(()=>null),(r,l)=>l.create(r),null)}get tabSize(){return this.facet(t.tabSize)}get lineBreak(){return this.facet(t.lineSeparator)||`
`}get readOnly(){return this.facet(tx)}phrase(e,...i){for(let n of this.facet(t.phrases))if(Object.prototype.hasOwnProperty.call(n,e)){e=n[e];break}return i.length&&(e=e.replace(/\$(\$|\d*)/g,(n,s)=>{if(s=="$")return"$";let r=+(s||1);return!r||r>i.length?n:i[r-1]})),e}languageDataAt(e,i,n=-1){let s=[];for(let r of this.facet(Hb))for(let l of r(this,i,n))Object.prototype.hasOwnProperty.call(l,e)&&s.push(l[e]);return s}charCategorizer(e){return P2(this.languageDataAt("wordChars",e).join(""))}wordAt(e){let{text:i,from:n,length:s}=this.doc.lineAt(e),r=this.charCategorizer(e),l=e-n,a=e-n;for(;l>0;){let o=Le(i,l,!1);if(r(i.slice(o,l))!=ni.Word)break;l=o}for(;a<s;){let o=Le(i,a);if(r(i.slice(a,o))!=ni.Word)break;a=o}return l==a?null:A.range(l+n,a+n)}};be.allowMultipleSelections=Kd;be.tabSize=E.define({combine:t=>t.length?t[0]:4});be.lineSeparator=Kb;be.readOnly=tx;be.phrases=E.define({compare(t,e){let i=Object.keys(t),n=Object.keys(e);return i.length==n.length&&i.every(s=>t[s]==e[s])}});be.languageData=Hb;be.changeFilter=Jb;be.transactionFilter=Fb;be.transactionExtender=ex;Lu.reconfigure=de.define();function ya(t,e,i={}){let n={};for(let s of t)for(let r of Object.keys(s)){let l=s[r],a=n[r];if(a===void 0)n[r]=l;else if(!(a===l||l===void 0))if(Object.hasOwnProperty.call(i,r))n[r]=i[r](a,l);else throw new Error("Config merge conflict for field "+r)}for(let s in e)n[s]===void 0&&(n[s]=e[s]);return n}var Fi=class{eq(e){return this==e}range(e,i=e){return ma.create(e,i,this)}};Fi.prototype.startSide=Fi.prototype.endSide=0;Fi.prototype.point=!1;Fi.prototype.mapMode=dt.TrackDel;var ma=class t{constructor(e,i,n){this.from=e,this.to=i,this.value=n}static create(e,i,n){return new t(e,i,n)}};function ip(t,e){return t.from-e.from||t.value.startSide-e.value.startSide}var np=class t{constructor(e,i,n,s){this.from=e,this.to=i,this.value=n,this.maxPoint=s}get length(){return this.to[this.to.length-1]}findIndex(e,i,n,s=0){let r=n?this.to:this.from;for(let l=s,a=r.length;;){if(l==a)return l;let o=l+a>>1,u=r[o]-e||(n?this.value[o].endSide:this.value[o].startSide)-i;if(o==l)return u>=0?l:a;u>=0?a=o:l=o+1}}between(e,i,n,s){for(let r=this.findIndex(i,-1e9,!0),l=this.findIndex(n,1e9,!1,r);r<l;r++)if(s(this.from[r]+e,this.to[r]+e,this.value[r])===!1)return!1}map(e,i){let n=[],s=[],r=[],l=-1,a=-1;for(let o=0;o<this.value.length;o++){let u=this.value[o],c=this.from[o]+e,h=this.to[o]+e,f,d;if(c==h){let m=i.mapPos(c,u.startSide,u.mapMode);if(m==null||(f=d=m,u.startSide!=u.endSide&&(d=i.mapPos(c,u.endSide),d<f)))continue}else if(f=i.mapPos(c,u.startSide),d=i.mapPos(h,u.endSide),f>d||f==d&&u.startSide>0&&u.endSide<=0)continue;(d-f||u.endSide-u.startSide)<0||(l<0&&(l=f),u.point&&(a=Math.max(a,d-f)),n.push(u),s.push(f-l),r.push(d-l))}return{mapped:n.length?new t(s,r,n,a):null,pos:l}}},pe=class t{constructor(e,i,n,s){this.chunkPos=e,this.chunk=i,this.nextLayer=n,this.maxPoint=s}static create(e,i,n,s){return new t(e,i,n,s)}get length(){let e=this.chunk.length-1;return e<0?0:Math.max(this.chunkEnd(e),this.nextLayer.length)}get size(){if(this.isEmpty)return 0;let e=this.nextLayer.size;for(let i of this.chunk)e+=i.value.length;return e}chunkEnd(e){return this.chunkPos[e]+this.chunk[e].length}update(e){let{add:i=[],sort:n=!1,filterFrom:s=0,filterTo:r=this.length}=e,l=e.filter;if(i.length==0&&!l)return this;if(n&&(i=i.slice().sort(ip)),this.isEmpty)return i.length?t.of(i):this;let a=new Uu(this,null,-1).goto(0),o=0,u=[],c=new vs;for(;a.value||o<i.length;)if(o<i.length&&(a.from-i[o].from||a.startSide-i[o].value.startSide)>=0){let h=i[o++];c.addInner(h.from,h.to,h.value)||u.push(h)}else a.rangeIndex==1&&a.chunkIndex<this.chunk.length&&(o==i.length||this.chunkEnd(a.chunkIndex)<i[o].from)&&(!l||s>this.chunkEnd(a.chunkIndex)||r<this.chunkPos[a.chunkIndex])&&c.addChunk(this.chunkPos[a.chunkIndex],this.chunk[a.chunkIndex])?a.nextChunk():((!l||s>a.to||r<a.from||l(a.from,a.to,a.value))&&(c.addInner(a.from,a.to,a.value)||u.push(ma.create(a.from,a.to,a.value))),a.next());return c.finishInner(this.nextLayer.isEmpty&&!u.length?t.empty:this.nextLayer.update({add:u,filter:l,filterFrom:s,filterTo:r}))}map(e){if(e.empty||this.isEmpty)return this;let i=[],n=[],s=-1;for(let l=0;l<this.chunk.length;l++){let a=this.chunkPos[l],o=this.chunk[l],u=e.touchesRange(a,a+o.length);if(u===!1)s=Math.max(s,o.maxPoint),i.push(o),n.push(e.mapPos(a));else if(u===!0){let{mapped:c,pos:h}=o.map(a,e);c&&(s=Math.max(s,c.maxPoint),i.push(c),n.push(h))}}let r=this.nextLayer.map(e);return i.length==0?r:new t(n,i,r||t.empty,s)}between(e,i,n){if(!this.isEmpty){for(let s=0;s<this.chunk.length;s++){let r=this.chunkPos[s],l=this.chunk[s];if(i>=r&&e<=r+l.length&&l.between(r,e-r,i-r,n)===!1)return}this.nextLayer.between(e,i,n)}}iter(e=0){return Oa.from([this]).goto(e)}get isEmpty(){return this.nextLayer==this}static iter(e,i=0){return Oa.from(e).goto(i)}static compare(e,i,n,s,r=-1){let l=e.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=r),a=i.filter(h=>h.maxPoint>0||!h.isEmpty&&h.maxPoint>=r),o=jb(l,a,n),u=new xs(l,o,r),c=new xs(a,o,r);n.iterGaps((h,f,d)=>Lb(u,h,c,f,d,s)),n.empty&&n.length==0&&Lb(u,0,c,0,0,s)}static eq(e,i,n=0,s){s==null&&(s=999999999);let r=e.filter(c=>!c.isEmpty&&i.indexOf(c)<0),l=i.filter(c=>!c.isEmpty&&e.indexOf(c)<0);if(r.length!=l.length)return!1;if(!r.length)return!0;let a=jb(r,l),o=new xs(r,a,0).goto(n),u=new xs(l,a,0).goto(n);for(;;){if(o.to!=u.to||!sp(o.active,u.active)||o.point&&(!u.point||!o.point.eq(u.point)))return!1;if(o.to>s)return!0;o.next(),u.next()}}static spans(e,i,n,s,r=-1){let l=new xs(e,null,r).goto(i),a=i,o=l.openStart;for(;;){let u=Math.min(l.to,n);if(l.point){let c=l.activeForPoint(l.to),h=l.pointFrom<i?c.length+1:l.point.startSide<0?c.length:Math.min(c.length,o);s.point(a,u,l.point,c,h,l.pointRank),o=Math.min(l.openEnd(u),c.length)}else u>a&&(s.span(a,u,l.active,o),o=l.openEnd(u));if(l.to>n)return o+(l.point&&l.to>n?1:0);a=l.to,l.next()}}static of(e,i=!1){let n=new vs;for(let s of e instanceof ma?[e]:i?$2(e):e)n.add(s.from,s.to,s.value);return n.finish()}static join(e){if(!e.length)return t.empty;let i=e[e.length-1];for(let n=e.length-2;n>=0;n--)for(let s=e[n];s!=t.empty;s=s.nextLayer)i=new t(s.chunkPos,s.chunk,i,Math.max(s.maxPoint,i.maxPoint));return i}};pe.empty=new pe([],[],null,-1);function $2(t){if(t.length>1)for(let e=t[0],i=1;i<t.length;i++){let n=t[i];if(ip(e,n)>0)return t.slice().sort(ip);e=n}return t}pe.empty.nextLayer=pe.empty;var vs=class t{finishChunk(e){this.chunks.push(new np(this.from,this.to,this.value,this.maxPoint)),this.chunkPos.push(this.chunkStart),this.chunkStart=-1,this.setMaxPoint=Math.max(this.setMaxPoint,this.maxPoint),this.maxPoint=-1,e&&(this.from=[],this.to=[],this.value=[])}constructor(){this.chunks=[],this.chunkPos=[],this.chunkStart=-1,this.last=null,this.lastFrom=-1e9,this.lastTo=-1e9,this.from=[],this.to=[],this.value=[],this.maxPoint=-1,this.setMaxPoint=-1,this.nextLayer=null}add(e,i,n){this.addInner(e,i,n)||(this.nextLayer||(this.nextLayer=new t)).add(e,i,n)}addInner(e,i,n){let s=e-this.lastTo||n.startSide-this.last.endSide;if(s<=0&&(e-this.lastFrom||n.startSide-this.last.startSide)<0)throw new Error("Ranges must be added sorted by `from` position and `startSide`");return s<0?!1:(this.from.length==250&&this.finishChunk(!0),this.chunkStart<0&&(this.chunkStart=e),this.from.push(e-this.chunkStart),this.to.push(i-this.chunkStart),this.last=n,this.lastFrom=e,this.lastTo=i,this.value.push(n),n.point&&(this.maxPoint=Math.max(this.maxPoint,i-e)),!0)}addChunk(e,i){if((e-this.lastTo||i.value[0].startSide-this.last.endSide)<0)return!1;this.from.length&&this.finishChunk(!0),this.setMaxPoint=Math.max(this.setMaxPoint,i.maxPoint),this.chunks.push(i),this.chunkPos.push(e);let n=i.value.length-1;return this.last=i.value[n],this.lastFrom=i.from[n]+e,this.lastTo=i.to[n]+e,!0}finish(){return this.finishInner(pe.empty)}finishInner(e){if(this.from.length&&this.finishChunk(!1),this.chunks.length==0)return e;let i=pe.create(this.chunkPos,this.chunks,this.nextLayer?this.nextLayer.finishInner(e):e,this.setMaxPoint);return this.from=null,i}};function jb(t,e,i){let n=new Map;for(let r of t)for(let l=0;l<r.chunk.length;l++)r.chunk[l].maxPoint<=0&&n.set(r.chunk[l],r.chunkPos[l]);let s=new Set;for(let r of e)for(let l=0;l<r.chunk.length;l++){let a=n.get(r.chunk[l]);a!=null&&(i?i.mapPos(a):a)==r.chunkPos[l]&&!i?.touchesRange(a,a+r.chunk[l].length)&&s.add(r.chunk[l])}return s}var Uu=class{constructor(e,i,n,s=0){this.layer=e,this.skip=i,this.minPoint=n,this.rank=s}get startSide(){return this.value?this.value.startSide:0}get endSide(){return this.value?this.value.endSide:0}goto(e,i=-1e9){return this.chunkIndex=this.rangeIndex=0,this.gotoInner(e,i,!1),this}gotoInner(e,i,n){for(;this.chunkIndex<this.layer.chunk.length;){let s=this.layer.chunk[this.chunkIndex];if(!(this.skip&&this.skip.has(s)||this.layer.chunkEnd(this.chunkIndex)<e||s.maxPoint<this.minPoint))break;this.chunkIndex++,n=!1}if(this.chunkIndex<this.layer.chunk.length){let s=this.layer.chunk[this.chunkIndex].findIndex(e-this.layer.chunkPos[this.chunkIndex],i,!0);(!n||this.rangeIndex<s)&&this.setRangeIndex(s)}this.next()}forward(e,i){(this.to-e||this.endSide-i)<0&&this.gotoInner(e,i,!0)}next(){for(;;)if(this.chunkIndex==this.layer.chunk.length){this.from=this.to=1e9,this.value=null;break}else{let e=this.layer.chunkPos[this.chunkIndex],i=this.layer.chunk[this.chunkIndex],n=e+i.from[this.rangeIndex];if(this.from=n,this.to=e+i.to[this.rangeIndex],this.value=i.value[this.rangeIndex],this.setRangeIndex(this.rangeIndex+1),this.minPoint<0||this.value.point&&this.to-this.from>=this.minPoint)break}}setRangeIndex(e){if(e==this.layer.chunk[this.chunkIndex].value.length){if(this.chunkIndex++,this.skip)for(;this.chunkIndex<this.layer.chunk.length&&this.skip.has(this.layer.chunk[this.chunkIndex]);)this.chunkIndex++;this.rangeIndex=0}else this.rangeIndex=e}nextChunk(){this.chunkIndex++,this.rangeIndex=0,this.next()}compare(e){return this.from-e.from||this.startSide-e.startSide||this.rank-e.rank||this.to-e.to||this.endSide-e.endSide}},Oa=class t{constructor(e){this.heap=e}static from(e,i=null,n=-1){let s=[];for(let r=0;r<e.length;r++)for(let l=e[r];!l.isEmpty;l=l.nextLayer)l.maxPoint>=n&&s.push(new Uu(l,i,n,r));return s.length==1?s[0]:new t(s)}get startSide(){return this.value?this.value.startSide:0}goto(e,i=-1e9){for(let n of this.heap)n.goto(e,i);for(let n=this.heap.length>>1;n>=0;n--)Vd(this.heap,n);return this.next(),this}forward(e,i){for(let n of this.heap)n.forward(e,i);for(let n=this.heap.length>>1;n>=0;n--)Vd(this.heap,n);(this.to-e||this.value.endSide-i)<0&&this.next()}next(){if(this.heap.length==0)this.from=this.to=1e9,this.value=null,this.rank=-1;else{let e=this.heap[0];this.from=e.from,this.to=e.to,this.value=e.value,this.rank=e.rank,e.value&&e.next(),Vd(this.heap,0)}}};function Vd(t,e){for(let i=t[e];;){let n=(e<<1)+1;if(n>=t.length)break;let s=t[n];if(n+1<t.length&&s.compare(t[n+1])>=0&&(s=t[n+1],n++),i.compare(s)<0)break;t[n]=i,t[e]=s,e=n}}var xs=class{constructor(e,i,n){this.minPoint=n,this.active=[],this.activeTo=[],this.activeRank=[],this.minActive=-1,this.point=null,this.pointFrom=0,this.pointRank=0,this.to=-1e9,this.endSide=0,this.openStart=-1,this.cursor=Oa.from(e,i,n)}goto(e,i=-1e9){return this.cursor.goto(e,i),this.active.length=this.activeTo.length=this.activeRank.length=0,this.minActive=-1,this.to=e,this.endSide=i,this.openStart=-1,this.next(),this}forward(e,i){for(;this.minActive>-1&&(this.activeTo[this.minActive]-e||this.active[this.minActive].endSide-i)<0;)this.removeActive(this.minActive);this.cursor.forward(e,i)}removeActive(e){Du(this.active,e),Du(this.activeTo,e),Du(this.activeRank,e),this.minActive=Vb(this.active,this.activeTo)}addActive(e){let i=0,{value:n,to:s,rank:r}=this.cursor;for(;i<this.activeRank.length&&(r-this.activeRank[i]||s-this.activeTo[i])>0;)i++;Nu(this.active,i,n),Nu(this.activeTo,i,s),Nu(this.activeRank,i,r),e&&Nu(e,i,this.cursor.from),this.minActive=Vb(this.active,this.activeTo)}next(){let e=this.to,i=this.point;this.point=null;let n=this.openStart<0?[]:null;for(;;){let s=this.minActive;if(s>-1&&(this.activeTo[s]-this.cursor.from||this.active[s].endSide-this.cursor.startSide)<0){if(this.activeTo[s]>e){this.to=this.activeTo[s],this.endSide=this.active[s].endSide;break}this.removeActive(s),n&&Du(n,s)}else if(this.cursor.value)if(this.cursor.from>e){this.to=this.cursor.from,this.endSide=this.cursor.startSide;break}else{let r=this.cursor.value;if(!r.point)this.addActive(n),this.cursor.next();else if(i&&this.cursor.to==this.to&&this.cursor.from<this.cursor.to)this.cursor.next();else{this.point=r,this.pointFrom=this.cursor.from,this.pointRank=this.cursor.rank,this.to=this.cursor.to,this.endSide=r.endSide,this.cursor.next(),this.forward(this.to,this.endSide);break}}else{this.to=this.endSide=1e9;break}}if(n){this.openStart=0;for(let s=n.length-1;s>=0&&n[s]<e;s--)this.openStart++}}activeForPoint(e){if(!this.active.length)return this.active;let i=[];for(let n=this.active.length-1;n>=0&&!(this.activeRank[n]<this.pointRank);n--)(this.activeTo[n]>e||this.activeTo[n]==e&&this.active[n].endSide>=this.point.endSide)&&i.push(this.active[n]);return i.reverse()}openEnd(e){let i=0;for(let n=this.activeTo.length-1;n>=0&&this.activeTo[n]>e;n--)i++;return i}};function Lb(t,e,i,n,s,r){t.goto(e),i.goto(n);let l=n+s,a=n,o=n-e;for(;;){let u=t.to+o-i.to,c=u||t.endSide-i.endSide,h=c<0?t.to+o:i.to,f=Math.min(h,l);if(t.point||i.point?t.point&&i.point&&(t.point==i.point||t.point.eq(i.point))&&sp(t.activeForPoint(t.to),i.activeForPoint(i.to))||r.comparePoint(a,f,t.point,i.point):f>a&&!sp(t.active,i.active)&&r.compareRange(a,f,t.active,i.active),h>l)break;(u||t.openEnd!=i.openEnd)&&r.boundChange&&r.boundChange(h),a=h,c<=0&&t.next(),c>=0&&i.next()}}function sp(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(t[i]!=e[i]&&!t[i].eq(e[i]))return!1;return!0}function Du(t,e){for(let i=e,n=t.length-1;i<n;i++)t[i]=t[i+1];t.pop()}function Nu(t,e,i){for(let n=t.length-1;n>=e;n--)t[n+1]=t[n];t[e]=i}function Vb(t,e){let i=-1,n=1e9;for(let s=0;s<e.length;s++)(e[s]-n||t[s].endSide-t[i].endSide)<0&&(i=s,n=e[s]);return i}function Qs(t,e,i=t.length){let n=0;for(let s=0;s<i&&s<t.length;)t.charCodeAt(s)==9?(n+=e-n%e,s++):(n++,s=Le(t,s));return n}function sx(t,e,i,n){for(let s=0,r=0;;){if(r>=e)return s;if(s==t.length)break;r+=t.charCodeAt(s)==9?i-r%i:1,s=Le(t,s)}return n===!0?-1:t.length}var rx=typeof Symbol>"u"?"__\u037C":Symbol.for("\u037C"),ap=typeof Symbol>"u"?"__styleSet"+Math.floor(Math.random()*1e8):Symbol("styleSet"),lx=typeof globalThis<"u"?globalThis:typeof window<"u"?window:{},Vt=class{constructor(e,i){this.rules=[];let{finish:n}=i||{};function s(l){return/^@/.test(l)?[l]:l.split(/,\s*/)}function r(l,a,o,u){let c=[],h=/^@(\w+)\b/.exec(l[0]),f=h&&h[1]=="keyframes";if(h&&a==null)return o.push(l[0]+";");for(let d in a){let m=a[d];if(/&/.test(d))r(d.split(/,\s*/).map(g=>l.map(x=>g.replace(/&/,x))).reduce((g,x)=>g.concat(x)),m,o);else if(m&&typeof m=="object"){if(!h)throw new RangeError("The value of a property ("+d+") should be a primitive value.");r(s(d),m,c,f)}else m!=null&&c.push(d.replace(/_.*/,"").replace(/[A-Z]/g,g=>"-"+g.toLowerCase())+": "+m+";")}(c.length||f)&&o.push((n&&!h&&!u?l.map(n):l).join(", ")+" {"+c.join(" ")+"}")}for(let l in e)r(s(l),e[l],this.rules)}getRules(){return this.rules.join(`
`)}static newName(){let e=lx[rx]||1;return lx[rx]=e+1,"\u037C"+e.toString(36)}static mount(e,i,n){let s=e[ap],r=n&&n.nonce;s?r&&s.setNonce(r):s=new op(e,r),s.mount(Array.isArray(i)?i:[i],e)}},ax=new Map,op=class{constructor(e,i){let n=e.ownerDocument||e,s=n.defaultView;if(!e.head&&e.adoptedStyleSheets&&s.CSSStyleSheet){let r=ax.get(n);if(r)return e[ap]=r;this.sheet=new s.CSSStyleSheet,ax.set(n,this)}else this.styleTag=n.createElement("style"),i&&this.styleTag.setAttribute("nonce",i);this.modules=[],e[ap]=this}mount(e,i){let n=this.sheet,s=0,r=0;for(let l=0;l<e.length;l++){let a=e[l],o=this.modules.indexOf(a);if(o<r&&o>-1&&(this.modules.splice(o,1),r--,o=-1),o==-1){if(this.modules.splice(r++,0,a),n)for(let u=0;u<a.rules.length;u++)n.insertRule(a.rules[u],s++)}else{for(;r<o;)s+=this.modules[r++].rules.length;s+=a.rules.length,r++}}if(n)i.adoptedStyleSheets.indexOf(this.sheet)<0&&(i.adoptedStyleSheets=[this.sheet,...i.adoptedStyleSheets]);else{let l="";for(let o=0;o<this.modules.length;o++)l+=this.modules[o].getRules()+`
`;this.styleTag.textContent=l;let a=i.head||i;this.styleTag.parentNode!=a&&a.insertBefore(this.styleTag,a.firstChild)}}setNonce(e){this.styleTag&&this.styleTag.getAttribute("nonce")!=e&&this.styleTag.setAttribute("nonce",e)}};var en={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},Dr={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},A2=typeof navigator<"u"&&/Mac/.test(navigator.platform),R2=typeof navigator<"u"&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);for(Te=0;Te<10;Te++)en[48+Te]=en[96+Te]=String(Te);var Te;for(Te=1;Te<=24;Te++)en[Te+111]="F"+Te;var Te;for(Te=65;Te<=90;Te++)en[Te]=String.fromCharCode(Te+32),Dr[Te]=String.fromCharCode(Te);var Te;for(Wu in en)Dr.hasOwnProperty(Wu)||(Dr[Wu]=en[Wu]);var Wu;function ox(t){var e=A2&&t.metaKey&&t.shiftKey&&!t.ctrlKey&&!t.altKey||R2&&t.shiftKey&&t.key&&t.key.length==1||t.key=="Unidentified",i=!e&&t.key||(t.shiftKey?Dr:en)[t.keyCode]||t.key||"Unidentified";return i=="Esc"&&(i="Escape"),i=="Del"&&(i="Delete"),i=="Left"&&(i="ArrowLeft"),i=="Up"&&(i="ArrowUp"),i=="Right"&&(i="ArrowRight"),i=="Down"&&(i="ArrowDown"),i}function $a(t){let e;return t.nodeType==11?e=t.getSelection?t:t.ownerDocument:e=t,e.getSelection()}function mp(t,e){return e?t==e||t.contains(e.nodeType!=1?e.parentNode:e):!1}function nc(t,e){if(!e.anchorNode)return!1;try{return mp(t,e.anchorNode)}catch{return!1}}function Aa(t){return t.nodeType==3?Ps(t,0,t.nodeValue.length).getClientRects():t.nodeType==1?t.getClientRects():[]}function ka(t,e,i,n){return i?ux(t,e,i,n,-1)||ux(t,e,i,n,1):!1}function Ts(t){for(var e=0;;e++)if(t=t.previousSibling,!t)return e}function oc(t){return t.nodeType==1&&/^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(t.nodeName)}function ux(t,e,i,n,s){for(;;){if(t==i&&e==n)return!0;if(e==(s<0?0:wi(t))){if(t.nodeName=="DIV")return!1;let r=t.parentNode;if(!r||r.nodeType!=1)return!1;e=Ts(t)+(s<0?0:1),t=r}else if(t.nodeType==1){if(t=t.childNodes[e+(s<0?-1:0)],t.nodeType==1&&t.contentEditable=="false")return!1;e=s<0?wi(t):0}else return!1}}function wi(t){return t.nodeType==3?t.nodeValue.length:t.childNodes.length}function Sc(t,e){let i=e?t.left:t.right;return{left:i,right:i,top:t.top,bottom:t.bottom}}function C2(t){let e=t.visualViewport;return e?{left:0,right:e.width,top:0,bottom:e.height}:{left:0,right:t.innerWidth,top:0,bottom:t.innerHeight}}function Bx(t,e){let i=e.width/t.offsetWidth,n=e.height/t.offsetHeight;return(i>.995&&i<1.005||!isFinite(i)||Math.abs(e.width-t.offsetWidth)<1)&&(i=1),(n>.995&&n<1.005||!isFinite(n)||Math.abs(e.height-t.offsetHeight)<1)&&(n=1),{scaleX:i,scaleY:n}}function M2(t,e,i,n,s,r,l,a){let o=t.ownerDocument,u=o.defaultView||window;for(let c=t,h=!1;c&&!h;)if(c.nodeType==1){let f,d=c==o.body,m=1,g=1;if(d)f=C2(u);else{if(/^(fixed|sticky)$/.test(getComputedStyle(c).position)&&(h=!0),c.scrollHeight<=c.clientHeight&&c.scrollWidth<=c.clientWidth){c=c.assignedSlot||c.parentNode;continue}let O=c.getBoundingClientRect();({scaleX:m,scaleY:g}=Bx(c,O)),f={left:O.left,right:O.left+c.clientWidth*m,top:O.top,bottom:O.top+c.clientHeight*g}}let x=0,p=0;if(s=="nearest")e.top<f.top?(p=e.top-(f.top+l),i>0&&e.bottom>f.bottom+p&&(p=e.bottom-f.bottom+l)):e.bottom>f.bottom&&(p=e.bottom-f.bottom+l,i<0&&e.top-p<f.top&&(p=e.top-(f.top+l)));else{let O=e.bottom-e.top,y=f.bottom-f.top;p=(s=="center"&&O<=y?e.top+O/2-y/2:s=="start"||s=="center"&&i<0?e.top-l:e.bottom-y+l)-f.top}if(n=="nearest"?e.left<f.left?(x=e.left-(f.left+r),i>0&&e.right>f.right+x&&(x=e.right-f.right+r)):e.right>f.right&&(x=e.right-f.right+r,i<0&&e.left<f.left+x&&(x=e.left-(f.left+r))):x=(n=="center"?e.left+(e.right-e.left)/2-(f.right-f.left)/2:n=="start"==a?e.left-r:e.right-(f.right-f.left)+r)-f.left,x||p)if(d)u.scrollBy(x,p);else{let O=0,y=0;if(p){let S=c.scrollTop;c.scrollTop+=p/g,y=(c.scrollTop-S)*g}if(x){let S=c.scrollLeft;c.scrollLeft+=x/m,O=(c.scrollLeft-S)*m}e={left:e.left-O,top:e.top-y,right:e.right-O,bottom:e.bottom-y},O&&Math.abs(O-x)<1&&(n="nearest"),y&&Math.abs(y-p)<1&&(s="nearest")}if(d)break;(e.top<f.top||e.bottom>f.bottom||e.left<f.left||e.right>f.right)&&(e={left:Math.max(e.left,f.left),right:Math.min(e.right,f.right),top:Math.max(e.top,f.top),bottom:Math.min(e.bottom,f.bottom)}),c=c.assignedSlot||c.parentNode}else if(c.nodeType==11)c=c.host;else break}function E2(t){let e=t.ownerDocument,i,n;for(let s=t.parentNode;s&&!(s==e.body||i&&n);)if(s.nodeType==1)!n&&s.scrollHeight>s.clientHeight&&(n=s),!i&&s.scrollWidth>s.clientWidth&&(i=s),s=s.assignedSlot||s.parentNode;else if(s.nodeType==11)s=s.host;else break;return{x:i,y:n}}var Op=class{constructor(){this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}eq(e){return this.anchorNode==e.anchorNode&&this.anchorOffset==e.anchorOffset&&this.focusNode==e.focusNode&&this.focusOffset==e.focusOffset}setRange(e){let{anchorNode:i,focusNode:n}=e;this.set(i,Math.min(e.anchorOffset,i?wi(i):0),n,Math.min(e.focusOffset,n?wi(n):0))}set(e,i,n,s){this.anchorNode=e,this.anchorOffset=i,this.focusNode=n,this.focusOffset=s}},Nr=null;function jx(t){if(t.setActive)return t.setActive();if(Nr)return t.focus(Nr);let e=[];for(let i=t;i&&(e.push(i,i.scrollTop,i.scrollLeft),i!=i.ownerDocument);i=i.parentNode);if(t.focus(Nr==null?{get preventScroll(){return Nr={preventScroll:!0},!0}}:void 0),!Nr){Nr=!1;for(let i=0;i<e.length;){let n=e[i++],s=e[i++],r=e[i++];n.scrollTop!=s&&(n.scrollTop=s),n.scrollLeft!=r&&(n.scrollLeft=r)}}}var cx;function Ps(t,e,i=e){let n=cx||(cx=document.createRange());return n.setEnd(t,i),n.setStart(t,e),n}function jr(t,e,i,n){let s={key:e,code:e,keyCode:i,which:i,cancelable:!0};n&&({altKey:s.altKey,ctrlKey:s.ctrlKey,shiftKey:s.shiftKey,metaKey:s.metaKey}=n);let r=new KeyboardEvent("keydown",s);r.synthetic=!0,t.dispatchEvent(r);let l=new KeyboardEvent("keyup",s);return l.synthetic=!0,t.dispatchEvent(l),r.defaultPrevented||l.defaultPrevented}function z2(t){for(;t;){if(t&&(t.nodeType==9||t.nodeType==11&&t.host))return t;t=t.assignedSlot||t.parentNode}return null}function Lx(t){for(;t.attributes.length;)t.removeAttributeNode(t.attributes[0])}function _2(t,e){let i=e.focusNode,n=e.focusOffset;if(!i||e.anchorNode!=i||e.anchorOffset!=n)return!1;for(n=Math.min(n,wi(i));;)if(n){if(i.nodeType!=1)return!1;let s=i.childNodes[n-1];s.contentEditable=="false"?n--:(i=s,n=wi(i))}else{if(i==t)return!0;n=Ts(i),i=i.parentNode}}function Vx(t){return t.scrollTop>Math.max(1,t.scrollHeight-t.clientHeight-4)}function Gx(t,e){for(let i=t,n=e;;){if(i.nodeType==3&&n>0)return{node:i,offset:n};if(i.nodeType==1&&n>0){if(i.contentEditable=="false")return null;i=i.childNodes[n-1],n=wi(i)}else if(i.parentNode&&!oc(i))n=Ts(i),i=i.parentNode;else return null}}function Ux(t,e){for(let i=t,n=e;;){if(i.nodeType==3&&n<i.nodeValue.length)return{node:i,offset:n};if(i.nodeType==1&&n<i.childNodes.length){if(i.contentEditable=="false")return null;i=i.childNodes[n],n=0}else if(i.parentNode&&!oc(i))n=Ts(i)+1,i=i.parentNode;else return null}}var st=class t{constructor(e,i,n=!0){this.node=e,this.offset=i,this.precise=n}static before(e,i){return new t(e.parentNode,Ts(e),i)}static after(e,i){return new t(e.parentNode,Ts(e)+1,i)}},Wp=[],se=class t{constructor(){this.parent=null,this.dom=null,this.flags=2}get overrideDOMText(){return null}get posAtStart(){return this.parent?this.parent.posBefore(this):0}get posAtEnd(){return this.posAtStart+this.length}posBefore(e){let i=this.posAtStart;for(let n of this.children){if(n==e)return i;i+=n.length+n.breakAfter}throw new RangeError("Invalid child in posBefore")}posAfter(e){return this.posBefore(e)+e.length}sync(e,i){if(this.flags&2){let n=this.dom,s=null,r;for(let l of this.children){if(l.flags&7){if(!l.dom&&(r=s?s.nextSibling:n.firstChild)){let a=t.get(r);(!a||!a.parent&&a.canReuseDOM(l))&&l.reuseDOM(r)}l.sync(e,i),l.flags&=-8}if(r=s?s.nextSibling:n.firstChild,i&&!i.written&&i.node==n&&r!=l.dom&&(i.written=!0),l.dom.parentNode==n)for(;r&&r!=l.dom;)r=hx(r);else n.insertBefore(l.dom,r);s=l.dom}for(r=s?s.nextSibling:n.firstChild,r&&i&&i.node==n&&(i.written=!0);r;)r=hx(r)}else if(this.flags&1)for(let n of this.children)n.flags&7&&(n.sync(e,i),n.flags&=-8)}reuseDOM(e){}localPosFromDOM(e,i){let n;if(e==this.dom)n=this.dom.childNodes[i];else{let s=wi(e)==0?0:i==0?-1:1;for(;;){let r=e.parentNode;if(r==this.dom)break;s==0&&r.firstChild!=r.lastChild&&(e==r.firstChild?s=-1:s=1),e=r}s<0?n=e:n=e.nextSibling}if(n==this.dom.firstChild)return 0;for(;n&&!t.get(n);)n=n.nextSibling;if(!n)return this.length;for(let s=0,r=0;;s++){let l=this.children[s];if(l.dom==n)return r;r+=l.length+l.breakAfter}}domBoundsAround(e,i,n=0){let s=-1,r=-1,l=-1,a=-1;for(let o=0,u=n,c=n;o<this.children.length;o++){let h=this.children[o],f=u+h.length;if(u<e&&f>i)return h.domBoundsAround(e,i,u);if(f>=e&&s==-1&&(s=o,r=u),u>i&&h.dom.parentNode==this.dom){l=o,a=c;break}c=f,u=f+h.breakAfter}return{from:r,to:a<0?n+this.length:a,startDOM:(s?this.children[s-1].dom.nextSibling:null)||this.dom.firstChild,endDOM:l<this.children.length&&l>=0?this.children[l].dom:null}}markDirty(e=!1){this.flags|=2,this.markParentsDirty(e)}markParentsDirty(e){for(let i=this.parent;i;i=i.parent){if(e&&(i.flags|=2),i.flags&1)return;i.flags|=1,e=!1}}setParent(e){this.parent!=e&&(this.parent=e,this.flags&7&&this.markParentsDirty(!0))}setDOM(e){this.dom!=e&&(this.dom&&(this.dom.cmView=null),this.dom=e,e.cmView=this)}get rootView(){for(let e=this;;){let i=e.parent;if(!i)return e;e=i}}replaceChildren(e,i,n=Wp){this.markDirty();for(let s=e;s<i;s++){let r=this.children[s];r.parent==this&&n.indexOf(r)<0&&r.destroy()}n.length<250?this.children.splice(e,i-e,...n):this.children=[].concat(this.children.slice(0,e),n,this.children.slice(i));for(let s=0;s<n.length;s++)n[s].setParent(this)}ignoreMutation(e){return!1}ignoreEvent(e){return!1}childCursor(e=this.length){return new uc(this.children,e,this.children.length)}childPos(e,i=1){return this.childCursor().findPos(e,i)}toString(){let e=this.constructor.name.replace("View","");return e+(this.children.length?"("+this.children.join()+")":this.length?"["+(e=="Text"?this.text:this.length)+"]":"")+(this.breakAfter?"#":"")}static get(e){return e.cmView}get isEditable(){return!0}get isWidget(){return!1}get isHidden(){return!1}merge(e,i,n,s,r,l){return!1}become(e){return!1}canReuseDOM(e){return e.constructor==this.constructor&&!((this.flags|e.flags)&8)}getSide(){return 0}destroy(){for(let e of this.children)e.parent==this&&e.destroy();this.parent=null}};se.prototype.breakAfter=0;function hx(t){let e=t.nextSibling;return t.parentNode.removeChild(t),e}var uc=class{constructor(e,i,n){this.children=e,this.pos=i,this.i=n,this.off=0}findPos(e,i=1){for(;;){if(e>this.pos||e==this.pos&&(i>0||this.i==0||this.children[this.i-1].breakAfter))return this.off=e-this.pos,this;let n=this.children[--this.i];this.pos-=n.length+n.breakAfter}}};function Wx(t,e,i,n,s,r,l,a,o){let{children:u}=t,c=u.length?u[e]:null,h=r.length?r[r.length-1]:null,f=h?h.breakAfter:l;if(!(e==n&&c&&!l&&!f&&r.length<2&&c.merge(i,s,r.length?h:null,i==0,a,o))){if(n<u.length){let d=u[n];d&&(s<d.length||d.breakAfter&&h?.breakAfter)?(e==n&&(d=d.split(s),s=0),!f&&h&&d.merge(0,s,h,!0,0,o)?r[r.length-1]=d:((s||d.children.length&&!d.children[0].length)&&d.merge(0,s,null,!1,0,o),r.push(d))):d?.breakAfter&&(h?h.breakAfter=1:l=1),n++}for(c&&(c.breakAfter=l,i>0&&(!l&&r.length&&c.merge(i,c.length,r[0],!1,a,0)?c.breakAfter=r.shift().breakAfter:(i<c.length||c.children.length&&c.children[c.children.length-1].length==0)&&c.merge(i,c.length,null,!1,a,0),e++));e<n&&r.length;)if(u[n-1].become(r[r.length-1]))n--,r.pop(),o=r.length?0:a;else if(u[e].become(r[0]))e++,r.shift(),a=r.length?0:o;else break;!r.length&&e&&n<u.length&&!u[e-1].breakAfter&&u[n].merge(0,0,u[e-1],!1,a,o)&&e--,(e<n||r.length)&&t.replaceChildren(e,n,r)}}function Ix(t,e,i,n,s,r){let l=t.childCursor(),{i:a,off:o}=l.findPos(i,1),{i:u,off:c}=l.findPos(e,-1),h=e-i;for(let f of n)h+=f.length;t.length+=h,Wx(t,u,c,a,o,n,0,s,r)}var pt=typeof navigator<"u"?navigator:{userAgent:"",vendor:"",platform:""},gp=typeof document<"u"?document:{documentElement:{style:{}}},yp=/Edge\/(\d+)/.exec(pt.userAgent),Hx=/MSIE \d/.test(pt.userAgent),bp=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(pt.userAgent),kc=!!(Hx||bp||yp),fx=!kc&&/gecko\/(\d+)/i.test(pt.userAgent),up=!kc&&/Chrome\/(\d+)/.exec(pt.userAgent),dx="webkitFontSmoothing"in gp.documentElement.style,Kx=!kc&&/Apple Computer/.test(pt.vendor),px=Kx&&(/Mobile\/\w+/.test(pt.userAgent)||pt.maxTouchPoints>2),R={mac:px||/Mac/.test(pt.platform),windows:/Win/.test(pt.platform),linux:/Linux|X11/.test(pt.platform),ie:kc,ie_version:Hx?gp.documentMode||6:bp?+bp[1]:yp?+yp[1]:0,gecko:fx,gecko_version:fx?+(/Firefox\/(\d+)/.exec(pt.userAgent)||[0,0])[1]:0,chrome:!!up,chrome_version:up?+up[1]:0,ios:px,android:/Android\b/.test(pt.userAgent),webkit:dx,safari:Kx,webkit_version:dx?+(/\bAppleWebKit\/(\d+)/.exec(pt.userAgent)||[0,0])[1]:0,tabSize:gp.documentElement.style.tabSize!=null?"tab-size":"-moz-tab-size"},Z2=256,Ti=class t extends se{constructor(e){super(),this.text=e}get length(){return this.text.length}createDOM(e){this.setDOM(e||document.createTextNode(this.text))}sync(e,i){this.dom||this.createDOM(),this.dom.nodeValue!=this.text&&(i&&i.node==this.dom&&(i.written=!0),this.dom.nodeValue=this.text)}reuseDOM(e){e.nodeType==3&&this.createDOM(e)}merge(e,i,n){return this.flags&8||n&&(!(n instanceof t)||this.length-(i-e)+n.length>Z2||n.flags&8)?!1:(this.text=this.text.slice(0,e)+(n?n.text:"")+this.text.slice(i),this.markDirty(),!0)}split(e){let i=new t(this.text.slice(e));return this.text=this.text.slice(0,e),this.markDirty(),i.flags|=this.flags&8,i}localPosFromDOM(e,i){return e==this.dom?i:i?this.text.length:0}domAtPos(e){return new st(this.dom,e)}domBoundsAround(e,i,n){return{from:n,to:n+this.length,startDOM:this.dom,endDOM:this.dom.nextSibling}}coordsAt(e,i){return X2(this.dom,e,i)}},Xn=class t extends se{constructor(e,i=[],n=0){super(),this.mark=e,this.children=i,this.length=n;for(let s of i)s.setParent(this)}setAttrs(e){if(Lx(e),this.mark.class&&(e.className=this.mark.class),this.mark.attrs)for(let i in this.mark.attrs)e.setAttribute(i,this.mark.attrs[i]);return e}canReuseDOM(e){return super.canReuseDOM(e)&&!((this.flags|e.flags)&8)}reuseDOM(e){e.nodeName==this.mark.tagName.toUpperCase()&&(this.setDOM(e),this.flags|=6)}sync(e,i){this.dom?this.flags&4&&this.setAttrs(this.dom):this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))),super.sync(e,i)}merge(e,i,n,s,r,l){return n&&(!(n instanceof t&&n.mark.eq(this.mark))||e&&r<=0||i<this.length&&l<=0)?!1:(Ix(this,e,i,n?n.children.slice():[],r-1,l-1),this.markDirty(),!0)}split(e){let i=[],n=0,s=-1,r=0;for(let a of this.children){let o=n+a.length;o>e&&i.push(n<e?a.split(e-n):a),s<0&&n>=e&&(s=r),n=o,r++}let l=this.length-e;return this.length=e,s>-1&&(this.children.length=s,this.markDirty()),new t(this.mark,i,l)}domAtPos(e){return Jx(this,e)}coordsAt(e,i){return eS(this,e,i)}};function X2(t,e,i){let n=t.nodeValue.length;e>n&&(e=n);let s=e,r=e,l=0;e==0&&i<0||e==n&&i>=0?R.chrome||R.gecko||(e?(s--,l=1):r<n&&(r++,l=-1)):i<0?s--:r<n&&r++;let a=Ps(t,s,r).getClientRects();if(!a.length)return null;let o=a[(l?l<0:i>=0)?0:a.length-1];return R.safari&&!l&&o.width==0&&(o=Array.prototype.find.call(a,u=>u.width)||o),l?Sc(o,l<0):o||null}var cc=class t extends se{static create(e,i,n){return new t(e,i,n)}constructor(e,i,n){super(),this.widget=e,this.length=i,this.side=n,this.prevWidget=null}split(e){let i=t.create(this.widget,this.length-e,this.side);return this.length-=e,i}sync(e){(!this.dom||!this.widget.updateDOM(this.dom,e))&&(this.dom&&this.prevWidget&&this.prevWidget.destroy(this.dom),this.prevWidget=null,this.setDOM(this.widget.toDOM(e)),this.widget.editable||(this.dom.contentEditable="false"))}getSide(){return this.side}merge(e,i,n,s,r,l){return n&&(!(n instanceof t)||!this.widget.compare(n.widget)||e>0&&r<=0||i<this.length&&l<=0)?!1:(this.length=e+(n?n.length:0)+(this.length-i),!0)}become(e){return e instanceof t&&e.side==this.side&&this.widget.constructor==e.widget.constructor?(this.widget.compare(e.widget)||this.markDirty(!0),this.dom&&!this.prevWidget&&(this.prevWidget=this.widget),this.widget=e.widget,this.length=e.length,!0):!1}ignoreMutation(){return!0}ignoreEvent(e){return this.widget.ignoreEvent(e)}get overrideDOMText(){if(this.length==0)return G.empty;let e=this;for(;e.parent;)e=e.parent;let{view:i}=e,n=i&&i.state.doc,s=this.posAtStart;return n?n.slice(s,s+this.length):G.empty}domAtPos(e){return(this.length?e==0:this.side>0)?st.before(this.dom):st.after(this.dom,e==this.length)}domBoundsAround(){return null}coordsAt(e,i){let n=this.widget.coordsAt(this.dom,e,i);if(n)return n;let s=this.dom.getClientRects(),r=null;if(!s.length)return null;let l=this.side?this.side<0:e>0;for(let a=l?s.length-1:0;r=s[a],!(e>0?a==0:a==s.length-1||r.top<r.bottom);a+=l?-1:1);return Sc(r,!l)}get isEditable(){return!1}get isWidget(){return!0}get isHidden(){return this.widget.isHidden}destroy(){super.destroy(),this.dom&&this.widget.destroy(this.dom)}},Ra=class t extends se{constructor(e){super(),this.side=e}get length(){return 0}merge(){return!1}become(e){return e instanceof t&&e.side==this.side}split(){return new t(this.side)}sync(){if(!this.dom){let e=document.createElement("img");e.className="cm-widgetBuffer",e.setAttribute("aria-hidden","true"),this.setDOM(e)}}getSide(){return this.side}domAtPos(e){return this.side>0?st.before(this.dom):st.after(this.dom)}localPosFromDOM(){return 0}domBoundsAround(){return null}coordsAt(e){return this.dom.getBoundingClientRect()}get overrideDOMText(){return G.empty}get isHidden(){return!0}};Ti.prototype.children=cc.prototype.children=Ra.prototype.children=Wp;function Jx(t,e){let i=t.dom,{children:n}=t,s=0;for(let r=0;s<n.length;s++){let l=n[s],a=r+l.length;if(!(a==r&&l.getSide()<=0)){if(e>r&&e<a&&l.dom.parentNode==i)return l.domAtPos(e-r);if(e<=r)break;r=a}}for(let r=s;r>0;r--){let l=n[r-1];if(l.dom.parentNode==i)return l.domAtPos(l.length)}for(let r=s;r<n.length;r++){let l=n[r];if(l.dom.parentNode==i)return l.domAtPos(0)}return new st(i,0)}function Fx(t,e,i){let n,{children:s}=t;i>0&&e instanceof Xn&&s.length&&(n=s[s.length-1])instanceof Xn&&n.mark.eq(e.mark)?Fx(n,e.children[0],i-1):(s.push(e),e.setParent(t)),t.length+=e.length}function eS(t,e,i){let n=null,s=-1,r=null,l=-1;function a(u,c){for(let h=0,f=0;h<u.children.length&&f<=c;h++){let d=u.children[h],m=f+d.length;m>=c&&(d.children.length?a(d,c-f):(!r||r.isHidden&&(i>0||N2(r,d)))&&(m>c||f==m&&d.getSide()>0)?(r=d,l=c-f):(f<c||f==m&&d.getSide()<0&&!d.isHidden)&&(n=d,s=c-f)),f=m}}a(t,e);let o=(i<0?n:r)||n||r;return o?o.coordsAt(Math.max(0,o==n?s:l),i):D2(t)}function D2(t){let e=t.dom.lastChild;if(!e)return t.dom.getBoundingClientRect();let i=Aa(e);return i[i.length-1]||null}function N2(t,e){let i=t.coordsAt(0,1),n=e.coordsAt(0,1);return i&&n&&n.top<i.bottom}function xp(t,e){for(let i in t)i=="class"&&e.class?e.class+=" "+t.class:i=="style"&&e.style?e.style+=";"+t.style:e[i]=t[i];return e}var mx=Object.create(null);function hc(t,e,i){if(t==e)return!0;t||(t=mx),e||(e=mx);let n=Object.keys(t),s=Object.keys(e);if(n.length-(i&&n.indexOf(i)>-1?1:0)!=s.length-(i&&s.indexOf(i)>-1?1:0))return!1;for(let r of n)if(r!=i&&(s.indexOf(r)==-1||t[r]!==e[r]))return!1;return!0}function Sp(t,e,i){let n=!1;if(e)for(let s in e)i&&s in i||(n=!0,s=="style"?t.style.cssText="":t.removeAttribute(s));if(i)for(let s in i)e&&e[s]==i[s]||(n=!0,s=="style"?t.style.cssText=i[s]:t.setAttribute(s,i[s]));return n}function q2(t){let e=Object.create(null);for(let i=0;i<t.attributes.length;i++){let n=t.attributes[i];e[n.name]=n.value}return e}var Lr=class{eq(e){return!1}updateDOM(e,i){return!1}compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}get estimatedHeight(){return-1}get lineBreaks(){return 0}ignoreEvent(e){return!0}coordsAt(e,i,n){return null}get isHidden(){return!1}get editable(){return!1}destroy(e){}},Ut=function(t){return t[t.Text=0]="Text",t[t.WidgetBefore=1]="WidgetBefore",t[t.WidgetAfter=2]="WidgetAfter",t[t.WidgetRange=3]="WidgetRange",t}(Ut||(Ut={})),ve=class extends Fi{constructor(e,i,n,s){super(),this.startSide=e,this.endSide=i,this.widget=n,this.spec=s}get heightRelevant(){return!1}static mark(e){return new Ca(e)}static widget(e){let i=Math.max(-1e4,Math.min(1e4,e.side||0)),n=!!e.block;return i+=n&&!e.inlineOrder?i>0?3e8:-4e8:i>0?1e8:-1e8,new Dn(e,i,i,n,e.widget||null,!1)}static replace(e){let i=!!e.block,n,s;if(e.isBlockGap)n=-5e8,s=4e8;else{let{start:r,end:l}=tS(e,i);n=(r?i?-3e8:-1:5e8)-1,s=(l?i?2e8:1:-6e8)+1}return new Dn(e,n,s,i,e.widget||null,!0)}static line(e){return new Ma(e)}static set(e,i=!1){return pe.of(e,i)}hasHeight(){return this.widget?this.widget.estimatedHeight>-1:!1}};ve.none=pe.empty;var Ca=class t extends ve{constructor(e){let{start:i,end:n}=tS(e);super(i?-1:5e8,n?1:-6e8,null,e),this.tagName=e.tagName||"span",this.class=e.class||"",this.attrs=e.attributes||null}eq(e){var i,n;return this==e||e instanceof t&&this.tagName==e.tagName&&(this.class||((i=this.attrs)===null||i===void 0?void 0:i.class))==(e.class||((n=e.attrs)===null||n===void 0?void 0:n.class))&&hc(this.attrs,e.attrs,"class")}range(e,i=e){if(e>=i)throw new RangeError("Mark decorations may not be empty");return super.range(e,i)}};Ca.prototype.point=!1;var Ma=class t extends ve{constructor(e){super(-2e8,-2e8,null,e)}eq(e){return e instanceof t&&this.spec.class==e.spec.class&&hc(this.spec.attributes,e.spec.attributes)}range(e,i=e){if(i!=e)throw new RangeError("Line decoration ranges must be zero-length");return super.range(e,i)}};Ma.prototype.mapMode=dt.TrackBefore;Ma.prototype.point=!0;var Dn=class t extends ve{constructor(e,i,n,s,r,l){super(i,n,r,e),this.block=s,this.isReplace=l,this.mapMode=s?i<=0?dt.TrackBefore:dt.TrackAfter:dt.TrackDel}get type(){return this.startSide!=this.endSide?Ut.WidgetRange:this.startSide<=0?Ut.WidgetBefore:Ut.WidgetAfter}get heightRelevant(){return this.block||!!this.widget&&(this.widget.estimatedHeight>=5||this.widget.lineBreaks>0)}eq(e){return e instanceof t&&Y2(this.widget,e.widget)&&this.block==e.block&&this.startSide==e.startSide&&this.endSide==e.endSide}range(e,i=e){if(this.isReplace&&(e>i||e==i&&this.startSide>0&&this.endSide<=0))throw new RangeError("Invalid range for replacement decoration");if(!this.isReplace&&i!=e)throw new RangeError("Widget decorations can only have zero-length ranges");return super.range(e,i)}};Dn.prototype.point=!0;function tS(t,e=!1){let{inclusiveStart:i,inclusiveEnd:n}=t;return i==null&&(i=t.inclusive),n==null&&(n=t.inclusive),{start:i??e,end:n??e}}function Y2(t,e){return t==e||!!(t&&e&&t.compare(e))}function sc(t,e,i,n=0){let s=i.length-1;s>=0&&i[s]+n>=t?i[s]=Math.max(i[s],e):i.push(t,e)}var Ve=class t extends se{constructor(){super(...arguments),this.children=[],this.length=0,this.prevAttrs=void 0,this.attrs=null,this.breakAfter=0}merge(e,i,n,s,r,l){if(n){if(!(n instanceof t))return!1;this.dom||n.transferDOM(this)}return s&&this.setDeco(n?n.attrs:null),Ix(this,e,i,n?n.children.slice():[],r,l),!0}split(e){let i=new t;if(i.breakAfter=this.breakAfter,this.length==0)return i;let{i:n,off:s}=this.childPos(e);s&&(i.append(this.children[n].split(s),0),this.children[n].merge(s,this.children[n].length,null,!1,0,0),n++);for(let r=n;r<this.children.length;r++)i.append(this.children[r],0);for(;n>0&&this.children[n-1].length==0;)this.children[--n].destroy();return this.children.length=n,this.markDirty(),this.length=e,i}transferDOM(e){this.dom&&(this.markDirty(),e.setDOM(this.dom),e.prevAttrs=this.prevAttrs===void 0?this.attrs:this.prevAttrs,this.prevAttrs=void 0,this.dom=null)}setDeco(e){hc(this.attrs,e)||(this.dom&&(this.prevAttrs=this.attrs,this.markDirty()),this.attrs=e)}append(e,i){Fx(this,e,i)}addLineDeco(e){let i=e.spec.attributes,n=e.spec.class;i&&(this.attrs=xp(i,this.attrs||{})),n&&(this.attrs=xp({class:n},this.attrs||{}))}domAtPos(e){return Jx(this,e)}reuseDOM(e){e.nodeName=="DIV"&&(this.setDOM(e),this.flags|=6)}sync(e,i){var n;this.dom?this.flags&4&&(Lx(this.dom),this.dom.className="cm-line",this.prevAttrs=this.attrs?null:void 0):(this.setDOM(document.createElement("div")),this.dom.className="cm-line",this.prevAttrs=this.attrs?null:void 0),this.prevAttrs!==void 0&&(Sp(this.dom,this.prevAttrs,this.attrs),this.dom.classList.add("cm-line"),this.prevAttrs=void 0),super.sync(e,i);let s=this.dom.lastChild;for(;s&&se.get(s)instanceof Xn;)s=s.lastChild;if(!s||!this.length||s.nodeName!="BR"&&((n=se.get(s))===null||n===void 0?void 0:n.isEditable)==!1&&(!R.ios||!this.children.some(r=>r instanceof Ti))){let r=document.createElement("BR");r.cmIgnore=!0,this.dom.appendChild(r)}}measureTextSize(){if(this.children.length==0||this.length>20)return null;let e=0,i;for(let n of this.children){if(!(n instanceof Ti)||/[^ -~]/.test(n.text))return null;let s=Aa(n.dom);if(s.length!=1)return null;e+=s[0].width,i=s[0].height}return e?{lineHeight:this.dom.getBoundingClientRect().height,charWidth:e/this.length,textHeight:i}:null}coordsAt(e,i){let n=eS(this,e,i);if(!this.children.length&&n&&this.parent){let{heightOracle:s}=this.parent.view.viewState,r=n.bottom-n.top;if(Math.abs(r-s.lineHeight)<2&&s.textHeight<r){let l=(r-s.textHeight)/2;return{top:n.top+l,bottom:n.bottom-l,left:n.left,right:n.left}}}return n}become(e){return e instanceof t&&this.children.length==0&&e.children.length==0&&hc(this.attrs,e.attrs)&&this.breakAfter==e.breakAfter}covers(){return!0}static find(e,i){for(let n=0,s=0;n<e.children.length;n++){let r=e.children[n],l=s+r.length;if(l>=i){if(r instanceof t)return r;if(l>i)break}s=l+r.breakAfter}return null}},ws=class t extends se{constructor(e,i,n){super(),this.widget=e,this.length=i,this.deco=n,this.breakAfter=0,this.prevWidget=null}merge(e,i,n,s,r,l){return n&&(!(n instanceof t)||!this.widget.compare(n.widget)||e>0&&r<=0||i<this.length&&l<=0)?!1:(this.length=e+(n?n.length:0)+(this.length-i),!0)}domAtPos(e){return e==0?st.before(this.dom):st.after(this.dom,e==this.length)}split(e){let i=this.length-e;this.length=e;let n=new t(this.widget,i,this.deco);return n.breakAfter=this.breakAfter,n}get children(){return Wp}sync(e){(!this.dom||!this.widget.updateDOM(this.dom,e))&&(this.dom&&this.prevWidget&&this.prevWidget.destroy(this.dom),this.prevWidget=null,this.setDOM(this.widget.toDOM(e)),this.widget.editable||(this.dom.contentEditable="false"))}get overrideDOMText(){return this.parent?this.parent.view.state.doc.slice(this.posAtStart,this.posAtEnd):G.empty}domBoundsAround(){return null}become(e){return e instanceof t&&e.widget.constructor==this.widget.constructor?(e.widget.compare(this.widget)||this.markDirty(!0),this.dom&&!this.prevWidget&&(this.prevWidget=this.widget),this.widget=e.widget,this.length=e.length,this.deco=e.deco,this.breakAfter=e.breakAfter,!0):!1}ignoreMutation(){return!0}ignoreEvent(e){return this.widget.ignoreEvent(e)}get isEditable(){return!1}get isWidget(){return!0}coordsAt(e,i){let n=this.widget.coordsAt(this.dom,e,i);return n||(this.widget instanceof Ea?null:Sc(this.dom.getBoundingClientRect(),this.length?e==0:i<=0))}destroy(){super.destroy(),this.dom&&this.widget.destroy(this.dom)}covers(e){let{startSide:i,endSide:n}=this.deco;return i==n?!1:e<0?i<0:n>0}},Ea=class extends Lr{constructor(e){super(),this.height=e}toDOM(){let e=document.createElement("div");return e.className="cm-gap",this.updateDOM(e),e}eq(e){return e.height==this.height}updateDOM(e){return e.style.height=this.height+"px",!0}get editable(){return!0}get estimatedHeight(){return this.height}ignoreEvent(){return!1}},va=class t{constructor(e,i,n,s){this.doc=e,this.pos=i,this.end=n,this.disallowBlockEffectsFor=s,this.content=[],this.curLine=null,this.breakAtStart=0,this.pendingBuffer=0,this.bufferMarks=[],this.atCursorPos=!0,this.openStart=-1,this.openEnd=-1,this.text="",this.textOff=0,this.cursor=e.iter(),this.skip=i}posCovered(){if(this.content.length==0)return!this.breakAtStart&&this.doc.lineAt(this.pos).from!=this.pos;let e=this.content[this.content.length-1];return!(e.breakAfter||e instanceof ws&&e.deco.endSide<0)}getLine(){return this.curLine||(this.content.push(this.curLine=new Ve),this.atCursorPos=!0),this.curLine}flushBuffer(e=this.bufferMarks){this.pendingBuffer&&(this.curLine.append(Iu(new Ra(-1),e),e.length),this.pendingBuffer=0)}addBlockWidget(e){this.flushBuffer(),this.curLine=null,this.content.push(e)}finish(e){this.pendingBuffer&&e<=this.bufferMarks.length?this.flushBuffer():this.pendingBuffer=0,!this.posCovered()&&!(e&&this.content.length&&this.content[this.content.length-1]instanceof ws)&&this.getLine()}buildText(e,i,n){for(;e>0;){if(this.textOff==this.text.length){let{value:r,lineBreak:l,done:a}=this.cursor.next(this.skip);if(this.skip=0,a)throw new Error("Ran out of text content when drawing inline views");if(l){this.posCovered()||this.getLine(),this.content.length?this.content[this.content.length-1].breakAfter=1:this.breakAtStart=1,this.flushBuffer(),this.curLine=null,this.atCursorPos=!0,e--;continue}else this.text=r,this.textOff=0}let s=Math.min(this.text.length-this.textOff,e,512);this.flushBuffer(i.slice(i.length-n)),this.getLine().append(Iu(new Ti(this.text.slice(this.textOff,this.textOff+s)),i),n),this.atCursorPos=!0,this.textOff+=s,e-=s,n=0}}span(e,i,n,s){this.buildText(i-e,n,s),this.pos=i,this.openStart<0&&(this.openStart=s)}point(e,i,n,s,r,l){if(this.disallowBlockEffectsFor[l]&&n instanceof Dn){if(n.block)throw new RangeError("Block decorations may not be specified via plugins");if(i>this.doc.lineAt(this.pos).to)throw new RangeError("Decorations that replace line breaks may not be specified via plugins")}let a=i-e;if(n instanceof Dn)if(n.block)n.startSide>0&&!this.posCovered()&&this.getLine(),this.addBlockWidget(new ws(n.widget||Nn.block,a,n));else{let o=cc.create(n.widget||Nn.inline,a,a?0:n.startSide),u=this.atCursorPos&&!o.isEditable&&r<=s.length&&(e<i||n.startSide>0),c=!o.isEditable&&(e<i||r>s.length||n.startSide<=0),h=this.getLine();this.pendingBuffer==2&&!u&&!o.isEditable&&(this.pendingBuffer=0),this.flushBuffer(s),u&&(h.append(Iu(new Ra(1),s),r),r=s.length+Math.max(0,r-s.length)),h.append(Iu(o,s),r),this.atCursorPos=c,this.pendingBuffer=c?e<i||r>s.length?1:2:0,this.pendingBuffer&&(this.bufferMarks=s.slice())}else this.doc.lineAt(this.pos).from==this.pos&&this.getLine().addLineDeco(n);a&&(this.textOff+a<=this.text.length?this.textOff+=a:(this.skip+=a-(this.text.length-this.textOff),this.text="",this.textOff=0),this.pos=i),this.openStart<0&&(this.openStart=r)}static build(e,i,n,s,r){let l=new t(e,i,n,r);return l.openEnd=pe.spans(s,i,n,l),l.openStart<0&&(l.openStart=l.openEnd),l.finish(l.openEnd),l}};function Iu(t,e){for(let i of e)t=new Xn(i,[t],t.length);return t}var Nn=class extends Lr{constructor(e){super(),this.tag=e}eq(e){return e.tag==this.tag}toDOM(){return document.createElement(this.tag)}updateDOM(e){return e.nodeName.toLowerCase()==this.tag}get isHidden(){return!0}};Nn.inline=new Nn("span");Nn.block=new Nn("div");var ke=function(t){return t[t.LTR=0]="LTR",t[t.RTL=1]="RTL",t}(ke||(ke={})),$s=ke.LTR,Ip=ke.RTL;function iS(t){let e=[];for(let i=0;i<t.length;i++)e.push(1<<+t[i]);return e}var B2=iS("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"),j2=iS("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"),kp=Object.create(null),Si=[];for(let t of["()","[]","{}"]){let e=t.charCodeAt(0),i=t.charCodeAt(1);kp[e]=i,kp[i]=-e}function nS(t){return t<=247?B2[t]:1424<=t&&t<=1524?2:1536<=t&&t<=1785?j2[t-1536]:1774<=t&&t<=2220?4:8192<=t&&t<=8204?256:64336<=t&&t<=65023?4:1}var L2=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/,vi=class{get dir(){return this.level%2?Ip:$s}constructor(e,i,n){this.from=e,this.to=i,this.level=n}side(e,i){return this.dir==i==e?this.to:this.from}forward(e,i){return e==(this.dir==i)}static find(e,i,n,s){let r=-1;for(let l=0;l<e.length;l++){let a=e[l];if(a.from<=i&&a.to>=i){if(a.level==n)return l;(r<0||(s!=0?s<0?a.from<i:a.to>i:e[r].level>a.level))&&(r=l)}}if(r<0)throw new RangeError("Index out of range");return r}};function sS(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++){let n=t[i],s=e[i];if(n.from!=s.from||n.to!=s.to||n.direction!=s.direction||!sS(n.inner,s.inner))return!1}return!0}var ie=[];function V2(t,e,i,n,s){for(let r=0;r<=n.length;r++){let l=r?n[r-1].to:e,a=r<n.length?n[r].from:i,o=r?256:s;for(let u=l,c=o,h=o;u<a;u++){let f=nS(t.charCodeAt(u));f==512?f=c:f==8&&h==4&&(f=16),ie[u]=f==4?2:f,f&7&&(h=f),c=f}for(let u=l,c=o,h=o;u<a;u++){let f=ie[u];if(f==128)u<a-1&&c==ie[u+1]&&c&24?f=ie[u]=c:ie[u]=256;else if(f==64){let d=u+1;for(;d<a&&ie[d]==64;)d++;let m=u&&c==8||d<i&&ie[d]==8?h==1?1:8:256;for(let g=u;g<d;g++)ie[g]=m;u=d-1}else f==8&&h==1&&(ie[u]=1);c=f,f&7&&(h=f)}}}function G2(t,e,i,n,s){let r=s==1?2:1;for(let l=0,a=0,o=0;l<=n.length;l++){let u=l?n[l-1].to:e,c=l<n.length?n[l].from:i;for(let h=u,f,d,m;h<c;h++)if(d=kp[f=t.charCodeAt(h)])if(d<0){for(let g=a-3;g>=0;g-=3)if(Si[g+1]==-d){let x=Si[g+2],p=x&2?s:x&4?x&1?r:s:0;p&&(ie[h]=ie[Si[g]]=p),a=g;break}}else{if(Si.length==189)break;Si[a++]=h,Si[a++]=f,Si[a++]=o}else if((m=ie[h])==2||m==1){let g=m==s;o=g?0:1;for(let x=a-3;x>=0;x-=3){let p=Si[x+2];if(p&2)break;if(g)Si[x+2]|=2;else{if(p&4)break;Si[x+2]|=4}}}}}function U2(t,e,i,n){for(let s=0,r=n;s<=i.length;s++){let l=s?i[s-1].to:t,a=s<i.length?i[s].from:e;for(let o=l;o<a;){let u=ie[o];if(u==256){let c=o+1;for(;;)if(c==a){if(s==i.length)break;c=i[s++].to,a=s<i.length?i[s].from:e}else if(ie[c]==256)c++;else break;let h=r==1,f=(c<e?ie[c]:n)==1,d=h==f?h?1:2:n;for(let m=c,g=s,x=g?i[g-1].to:t;m>o;)m==x&&(m=i[--g].from,x=g?i[g-1].to:t),ie[--m]=d;o=c}else r=u,o++}}}function vp(t,e,i,n,s,r,l){let a=n%2?2:1;if(n%2==s%2)for(let o=e,u=0;o<i;){let c=!0,h=!1;if(u==r.length||o<r[u].from){let g=ie[o];g!=a&&(c=!1,h=g==16)}let f=!c&&a==1?[]:null,d=c?n:n+1,m=o;e:for(;;)if(u<r.length&&m==r[u].from){if(h)break e;let g=r[u];if(!c)for(let x=g.to,p=u+1;;){if(x==i)break e;if(p<r.length&&r[p].from==x)x=r[p++].to;else{if(ie[x]==a)break e;break}}if(u++,f)f.push(g);else{g.from>o&&l.push(new vi(o,g.from,d));let x=g.direction==$s!=!(d%2);Qp(t,x?n+1:n,s,g.inner,g.from,g.to,l),o=g.to}m=g.to}else{if(m==i||(c?ie[m]!=a:ie[m]==a))break;m++}f?vp(t,o,m,n+1,s,f,l):o<m&&l.push(new vi(o,m,d)),o=m}else for(let o=i,u=r.length;o>e;){let c=!0,h=!1;if(!u||o>r[u-1].to){let g=ie[o-1];g!=a&&(c=!1,h=g==16)}let f=!c&&a==1?[]:null,d=c?n:n+1,m=o;e:for(;;)if(u&&m==r[u-1].to){if(h)break e;let g=r[--u];if(!c)for(let x=g.from,p=u;;){if(x==e)break e;if(p&&r[p-1].to==x)x=r[--p].from;else{if(ie[x-1]==a)break e;break}}if(f)f.push(g);else{g.to<o&&l.push(new vi(g.to,o,d));let x=g.direction==$s!=!(d%2);Qp(t,x?n+1:n,s,g.inner,g.from,g.to,l),o=g.from}m=g.from}else{if(m==e||(c?ie[m-1]!=a:ie[m-1]==a))break;m--}f?vp(t,m,o,n+1,s,f,l):m<o&&l.push(new vi(m,o,d)),o=m}}function Qp(t,e,i,n,s,r,l){let a=e%2?2:1;V2(t,s,r,n,a),G2(t,s,r,n,a),U2(s,r,n,a),vp(t,s,r,e,i,n,l)}function W2(t,e,i){if(!t)return[new vi(0,0,e==Ip?1:0)];if(e==$s&&!i.length&&!L2.test(t))return rS(t.length);if(i.length)for(;t.length>ie.length;)ie[ie.length]=256;let n=[],s=e==$s?0:1;return Qp(t,s,s,i,0,t.length,n),n}function rS(t){return[new vi(0,t,0)]}var lS="";function I2(t,e,i,n,s){var r;let l=n.head-t.from,a=vi.find(e,l,(r=n.bidiLevel)!==null&&r!==void 0?r:-1,n.assoc),o=e[a],u=o.side(s,i);if(l==u){let f=a+=s?1:-1;if(f<0||f>=e.length)return null;o=e[a=f],l=o.side(!s,i),u=o.side(s,i)}let c=Le(t.text,l,o.forward(s,i));(c<o.from||c>o.to)&&(c=u),lS=t.text.slice(Math.min(l,c),Math.max(l,c));let h=a==(s?e.length-1:0)?null:e[a+(s?1:-1)];return h&&c==u&&h.level+(s?0:1)<o.level?A.cursor(h.side(!s,i)+t.from,h.forward(s,i)?1:-1,h.level):A.cursor(c+t.from,o.forward(s,i)?-1:1,o.level)}function H2(t,e,i){for(let n=e;n<i;n++){let s=nS(t.charCodeAt(n));if(s==1)return $s;if(s==2||s==4)return Ip}return $s}var aS=E.define(),oS=E.define(),uS=E.define(),cS=E.define(),wp=E.define(),hS=E.define(),fS=E.define(),Hp=E.define(),Kp=E.define(),dS=E.define({combine:t=>t.some(e=>e)}),K2=E.define({combine:t=>t.some(e=>e)}),pS=E.define(),Qa=class t{constructor(e,i="nearest",n="nearest",s=5,r=5,l=!1){this.range=e,this.y=i,this.x=n,this.yMargin=s,this.xMargin=r,this.isSnapshot=l}map(e){return e.empty?this:new t(this.range.map(e),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}clip(e){return this.range.to<=e.doc.length?this:new t(A.cursor(e.doc.length),this.y,this.x,this.yMargin,this.xMargin,this.isSnapshot)}},Hu=de.define({map:(t,e)=>t.map(e)}),mS=de.define();function ri(t,e,i){let n=t.facet(cS);n.length?n[0](e):window.onerror&&window.onerror(String(e),i,void 0,void 0,e)||(i?console.error(i+":",e):console.error(e))}var tn=E.define({combine:t=>t.length?t[0]:!0}),J2=0,qr=E.define({combine(t){return t.filter((e,i)=>{for(let n=0;n<i;n++)if(t[n].plugin==e.plugin)return!1;return!0})}}),qn=class t{constructor(e,i,n,s,r){this.id=e,this.create=i,this.domEventHandlers=n,this.domEventObservers=s,this.baseExtensions=r(this),this.extension=this.baseExtensions.concat(qr.of({plugin:this,arg:void 0}))}of(e){return this.baseExtensions.concat(qr.of({plugin:this,arg:e}))}static define(e,i){let{eventHandlers:n,eventObservers:s,provide:r,decorations:l}=i||{};return new t(J2++,e,n,s,a=>{let o=[];return l&&o.push(za.of(u=>{let c=u.plugin(a);return c?l(c):ve.none})),r&&o.push(r(a)),o})}static fromClass(e,i){return t.define((n,s)=>new e(n,s),i)}},wa=class{constructor(e){this.spec=e,this.mustUpdate=null,this.value=null}get plugin(){return this.spec&&this.spec.plugin}update(e){if(this.value){if(this.mustUpdate){let i=this.mustUpdate;if(this.mustUpdate=null,this.value.update)try{this.value.update(i)}catch(n){if(ri(i.state,n,"CodeMirror plugin crashed"),this.value.destroy)try{this.value.destroy()}catch{}this.deactivate()}}}else if(this.spec)try{this.value=this.spec.plugin.create(e,this.spec.arg)}catch(i){ri(e.state,i,"CodeMirror plugin crashed"),this.deactivate()}return this}destroy(e){var i;if(!((i=this.value)===null||i===void 0)&&i.destroy)try{this.value.destroy()}catch(n){ri(e.state,n,"CodeMirror plugin crashed")}}deactivate(){this.spec=this.value=null}},OS=E.define(),Jp=E.define(),za=E.define(),gS=E.define(),vc=E.define(),yS=E.define();function Ox(t,e){let i=t.state.facet(yS);if(!i.length)return i;let n=i.map(r=>r instanceof Function?r(t):r),s=[];return pe.spans(n,e.from,e.to,{point(){},span(r,l,a,o){let u=r-e.from,c=l-e.from,h=s;for(let f=a.length-1;f>=0;f--,o--){let d=a[f].spec.bidiIsolate,m;if(d==null&&(d=H2(e.text,u,c)),o>0&&h.length&&(m=h[h.length-1]).to==u&&m.direction==d)m.to=c,h=m.inner;else{let g={from:u,to:c,direction:d,inner:[]};h.push(g),h=g.inner}}}}),s}var bS=E.define();function xS(t){let e=0,i=0,n=0,s=0;for(let r of t.state.facet(bS)){let l=r(t);l&&(l.left!=null&&(e=Math.max(e,l.left)),l.right!=null&&(i=Math.max(i,l.right)),l.top!=null&&(n=Math.max(n,l.top)),l.bottom!=null&&(s=Math.max(s,l.bottom)))}return{left:e,right:i,top:n,bottom:s}}var ba=E.define(),Qi=class t{constructor(e,i,n,s){this.fromA=e,this.toA=i,this.fromB=n,this.toB=s}join(e){return new t(Math.min(this.fromA,e.fromA),Math.max(this.toA,e.toA),Math.min(this.fromB,e.fromB),Math.max(this.toB,e.toB))}addToSet(e){let i=e.length,n=this;for(;i>0;i--){let s=e[i-1];if(!(s.fromA>n.toA)){if(s.toA<n.fromA)break;n=n.join(s),e.splice(i-1,1)}}return e.splice(i,0,n),e}static extendWithRanges(e,i){if(i.length==0)return e;let n=[];for(let s=0,r=0,l=0,a=0;;s++){let o=s==e.length?null:e[s],u=l-a,c=o?o.fromB:1e9;for(;r<i.length&&i[r]<c;){let h=i[r],f=i[r+1],d=Math.max(a,h),m=Math.min(c,f);if(d<=m&&new t(d+u,m+u,d,m).addToSet(n),f>c)break;r+=2}if(!o)return n;new t(o.fromA,o.toA,o.fromB,o.toB).addToSet(n),l=o.toA,a=o.toB}}},fc=class t{constructor(e,i,n){this.view=e,this.state=i,this.transactions=n,this.flags=0,this.startState=e.state,this.changes=nt.empty(this.startState.doc.length);for(let r of n)this.changes=this.changes.compose(r.changes);let s=[];this.changes.iterChangedRanges((r,l,a,o)=>s.push(new Qi(r,l,a,o))),this.changedRanges=s}static create(e,i,n){return new t(e,i,n)}get viewportChanged(){return(this.flags&4)>0}get viewportMoved(){return(this.flags&8)>0}get heightChanged(){return(this.flags&2)>0}get geometryChanged(){return this.docChanged||(this.flags&18)>0}get focusChanged(){return(this.flags&1)>0}get docChanged(){return!this.changes.empty}get selectionSet(){return this.transactions.some(e=>e.selection)}get empty(){return this.flags==0&&this.transactions.length==0}},dc=class extends se{get length(){return this.view.state.doc.length}constructor(e){super(),this.view=e,this.decorations=[],this.dynamicDecorationMap=[!1],this.domChanged=null,this.hasComposition=null,this.markedForComposition=new Set,this.editContextFormatting=ve.none,this.lastCompositionAfterCursor=!1,this.minWidth=0,this.minWidthFrom=0,this.minWidthTo=0,this.impreciseAnchor=null,this.impreciseHead=null,this.forceSelection=!1,this.lastUpdate=Date.now(),this.setDOM(e.contentDOM),this.children=[new Ve],this.children[0].setParent(this),this.updateDeco(),this.updateInner([new Qi(0,0,0,e.state.doc.length)],0,null)}update(e){var i;let n=e.changedRanges;this.minWidth>0&&n.length&&(n.every(({fromA:u,toA:c})=>c<this.minWidthFrom||u>this.minWidthTo)?(this.minWidthFrom=e.changes.mapPos(this.minWidthFrom,1),this.minWidthTo=e.changes.mapPos(this.minWidthTo,1)):this.minWidth=this.minWidthFrom=this.minWidthTo=0),this.updateEditContextFormatting(e);let s=-1;this.view.inputState.composing>=0&&!this.view.observer.editContext&&(!((i=this.domChanged)===null||i===void 0)&&i.newSel?s=this.domChanged.newSel.head:!rP(e.changes,this.hasComposition)&&!e.selectionSet&&(s=e.state.selection.main.head));let r=s>-1?eP(this.view,e.changes,s):null;if(this.domChanged=null,this.hasComposition){this.markedForComposition.clear();let{from:u,to:c}=this.hasComposition;n=new Qi(u,c,e.changes.mapPos(u,-1),e.changes.mapPos(c,1)).addToSet(n.slice())}this.hasComposition=r?{from:r.range.fromB,to:r.range.toB}:null,(R.ie||R.chrome)&&!r&&e&&e.state.doc.lines!=e.startState.doc.lines&&(this.forceSelection=!0);let l=this.decorations,a=this.updateDeco(),o=nP(l,a,e.changes);return n=Qi.extendWithRanges(n,o),!(this.flags&7)&&n.length==0?!1:(this.updateInner(n,e.startState.doc.length,r),e.transactions.length&&(this.lastUpdate=Date.now()),!0)}updateInner(e,i,n){this.view.viewState.mustMeasureContent=!0,this.updateChildren(e,i,n);let{observer:s}=this.view;s.ignore(()=>{this.dom.style.height=this.view.viewState.contentHeight/this.view.scaleY+"px",this.dom.style.flexBasis=this.minWidth?this.minWidth+"px":"";let l=R.chrome||R.ios?{node:s.selectionRange.focusNode,written:!1}:void 0;this.sync(this.view,l),this.flags&=-8,l&&(l.written||s.selectionRange.focusNode!=l.node)&&(this.forceSelection=!0),this.dom.style.height=""}),this.markedForComposition.forEach(l=>l.flags&=-9);let r=[];if(this.view.viewport.from||this.view.viewport.to<this.view.state.doc.length)for(let l of this.children)l instanceof ws&&l.widget instanceof Ea&&r.push(l.dom);s.updateGaps(r)}updateChildren(e,i,n){let s=n?n.range.addToSet(e.slice()):e,r=this.childCursor(i);for(let l=s.length-1;;l--){let a=l>=0?s[l]:null;if(!a)break;let{fromA:o,toA:u,fromB:c,toB:h}=a,f,d,m,g;if(n&&n.range.fromB<h&&n.range.toB>c){let S=va.build(this.view.state.doc,c,n.range.fromB,this.decorations,this.dynamicDecorationMap),k=va.build(this.view.state.doc,n.range.toB,h,this.decorations,this.dynamicDecorationMap);d=S.breakAtStart,m=S.openStart,g=k.openEnd;let w=this.compositionView(n);k.breakAtStart?w.breakAfter=1:k.content.length&&w.merge(w.length,w.length,k.content[0],!1,k.openStart,0)&&(w.breakAfter=k.content[0].breakAfter,k.content.shift()),S.content.length&&w.merge(0,0,S.content[S.content.length-1],!0,0,S.openEnd)&&S.content.pop(),f=S.content.concat(w).concat(k.content)}else({content:f,breakAtStart:d,openStart:m,openEnd:g}=va.build(this.view.state.doc,c,h,this.decorations,this.dynamicDecorationMap));let{i:x,off:p}=r.findPos(u,1),{i:O,off:y}=r.findPos(o,-1);Wx(this,O,y,x,p,f,d,m,g)}n&&this.fixCompositionDOM(n)}updateEditContextFormatting(e){this.editContextFormatting=this.editContextFormatting.map(e.changes);for(let i of e.transactions)for(let n of i.effects)n.is(mS)&&(this.editContextFormatting=n.value)}compositionView(e){let i=new Ti(e.text.nodeValue);i.flags|=8;for(let{deco:s}of e.marks)i=new Xn(s,[i],i.length);let n=new Ve;return n.append(i,0),n}fixCompositionDOM(e){let i=(r,l)=>{l.flags|=8|(l.children.some(o=>o.flags&7)?1:0),this.markedForComposition.add(l);let a=se.get(r);a&&a!=l&&(a.dom=null),l.setDOM(r)},n=this.childPos(e.range.fromB,1),s=this.children[n.i];i(e.line,s);for(let r=e.marks.length-1;r>=-1;r--)n=s.childPos(n.off,1),s=s.children[n.i],i(r>=0?e.marks[r].node:e.text,s)}updateSelection(e=!1,i=!1){(e||!this.view.observer.selectionRange.focusNode)&&this.view.observer.readSelectionRange();let n=this.view.root.activeElement,s=n==this.dom,r=!s&&!(this.view.state.facet(tn)||this.dom.tabIndex>-1)&&nc(this.dom,this.view.observer.selectionRange)&&!(n&&this.dom.contains(n));if(!(s||i||r))return;let l=this.forceSelection;this.forceSelection=!1;let a=this.view.state.selection.main,o=this.moveToLine(this.domAtPos(a.anchor)),u=a.empty?o:this.moveToLine(this.domAtPos(a.head));if(R.gecko&&a.empty&&!this.hasComposition&&F2(o)){let h=document.createTextNode("");this.view.observer.ignore(()=>o.node.insertBefore(h,o.node.childNodes[o.offset]||null)),o=u=new st(h,0),l=!0}let c=this.view.observer.selectionRange;(l||!c.focusNode||(!ka(o.node,o.offset,c.anchorNode,c.anchorOffset)||!ka(u.node,u.offset,c.focusNode,c.focusOffset))&&!this.suppressWidgetCursorChange(c,a))&&(this.view.observer.ignore(()=>{R.android&&R.chrome&&this.dom.contains(c.focusNode)&&sP(c.focusNode,this.dom)&&(this.dom.blur(),this.dom.focus({preventScroll:!0}));let h=$a(this.view.root);if(h)if(a.empty){if(R.gecko){let f=tP(o.node,o.offset);if(f&&f!=3){let d=(f==1?Gx:Ux)(o.node,o.offset);d&&(o=new st(d.node,d.offset))}}h.collapse(o.node,o.offset),a.bidiLevel!=null&&h.caretBidiLevel!==void 0&&(h.caretBidiLevel=a.bidiLevel)}else if(h.extend){h.collapse(o.node,o.offset);try{h.extend(u.node,u.offset)}catch{}}else{let f=document.createRange();a.anchor>a.head&&([o,u]=[u,o]),f.setEnd(u.node,u.offset),f.setStart(o.node,o.offset),h.removeAllRanges(),h.addRange(f)}r&&this.view.root.activeElement==this.dom&&(this.dom.blur(),n&&n.focus())}),this.view.observer.setSelectionRange(o,u)),this.impreciseAnchor=o.precise?null:new st(c.anchorNode,c.anchorOffset),this.impreciseHead=u.precise?null:new st(c.focusNode,c.focusOffset)}suppressWidgetCursorChange(e,i){return this.hasComposition&&i.empty&&ka(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)&&this.posFromDOM(e.focusNode,e.focusOffset)==i.head}enforceCursorAssoc(){if(this.hasComposition)return;let{view:e}=this,i=e.state.selection.main,n=$a(e.root),{anchorNode:s,anchorOffset:r}=e.observer.selectionRange;if(!n||!i.empty||!i.assoc||!n.modify)return;let l=Ve.find(this,i.head);if(!l)return;let a=l.posAtStart;if(i.head==a||i.head==a+l.length)return;let o=this.coordsAt(i.head,-1),u=this.coordsAt(i.head,1);if(!o||!u||o.bottom>u.top)return;let c=this.domAtPos(i.head+i.assoc);n.collapse(c.node,c.offset),n.modify("move",i.assoc<0?"forward":"backward","lineboundary"),e.observer.readSelectionRange();let h=e.observer.selectionRange;e.docView.posFromDOM(h.anchorNode,h.anchorOffset)!=i.from&&n.collapse(s,r)}moveToLine(e){let i=this.dom,n;if(e.node!=i)return e;for(let s=e.offset;!n&&s<i.childNodes.length;s++){let r=se.get(i.childNodes[s]);r instanceof Ve&&(n=r.domAtPos(0))}for(let s=e.offset-1;!n&&s>=0;s--){let r=se.get(i.childNodes[s]);r instanceof Ve&&(n=r.domAtPos(r.length))}return n?new st(n.node,n.offset,!0):e}nearest(e){for(let i=e;i;){let n=se.get(i);if(n&&n.rootView==this)return n;i=i.parentNode}return null}posFromDOM(e,i){let n=this.nearest(e);if(!n)throw new RangeError("Trying to find position for a DOM position outside of the document");return n.localPosFromDOM(e,i)+n.posAtStart}domAtPos(e){let{i,off:n}=this.childCursor().findPos(e,-1);for(;i<this.children.length-1;){let s=this.children[i];if(n<s.length||s instanceof Ve)break;i++,n=0}return this.children[i].domAtPos(n)}coordsAt(e,i){let n=null,s=0;for(let r=this.length,l=this.children.length-1;l>=0;l--){let a=this.children[l],o=r-a.breakAfter,u=o-a.length;if(o<e)break;if(u<=e&&(u<e||a.covers(-1))&&(o>e||a.covers(1))&&(!n||a instanceof Ve&&!(n instanceof Ve&&i>=0)))n=a,s=u;else if(n&&u==e&&o==e&&a instanceof ws&&Math.abs(i)<2){if(a.deco.startSide<0)break;l&&(n=null)}r=u}return n?n.coordsAt(e-s,i):null}coordsForChar(e){let{i,off:n}=this.childPos(e,1),s=this.children[i];if(!(s instanceof Ve))return null;for(;s.children.length;){let{i:a,off:o}=s.childPos(n,1);for(;;a++){if(a==s.children.length)return null;if((s=s.children[a]).length)break}n=o}if(!(s instanceof Ti))return null;let r=Le(s.text,n);if(r==n)return null;let l=Ps(s.dom,n,r).getClientRects();for(let a=0;a<l.length;a++){let o=l[a];if(a==l.length-1||o.top<o.bottom&&o.left<o.right)return o}return null}measureVisibleLineHeights(e){let i=[],{from:n,to:s}=e,r=this.view.contentDOM.clientWidth,l=r>Math.max(this.view.scrollDOM.clientWidth,this.minWidth)+1,a=-1,o=this.view.textDirection==ke.LTR;for(let u=0,c=0;c<this.children.length;c++){let h=this.children[c],f=u+h.length;if(f>s)break;if(u>=n){let d=h.dom.getBoundingClientRect();if(i.push(d.height),l){let m=h.dom.lastChild,g=m?Aa(m):[];if(g.length){let x=g[g.length-1],p=o?x.right-d.left:d.right-x.left;p>a&&(a=p,this.minWidth=r,this.minWidthFrom=u,this.minWidthTo=f)}}}u=f+h.breakAfter}return i}textDirectionAt(e){let{i}=this.childPos(e,1);return getComputedStyle(this.children[i].dom).direction=="rtl"?ke.RTL:ke.LTR}measureTextSize(){for(let r of this.children)if(r instanceof Ve){let l=r.measureTextSize();if(l)return l}let e=document.createElement("div"),i,n,s;return e.className="cm-line",e.style.width="99999px",e.style.position="absolute",e.textContent="abc def ghi jkl mno pqr stu",this.view.observer.ignore(()=>{this.dom.appendChild(e);let r=Aa(e.firstChild)[0];i=e.getBoundingClientRect().height,n=r?r.width/27:7,s=r?r.height:i,e.remove()}),{lineHeight:i,charWidth:n,textHeight:s}}childCursor(e=this.length){let i=this.children.length;return i&&(e-=this.children[--i].length),new uc(this.children,e,i)}computeBlockGapDeco(){let e=[],i=this.view.viewState;for(let n=0,s=0;;s++){let r=s==i.viewports.length?null:i.viewports[s],l=r?r.from-1:this.length;if(l>n){let a=(i.lineBlockAt(l).bottom-i.lineBlockAt(n).top)/this.view.scaleY;e.push(ve.replace({widget:new Ea(a),block:!0,inclusive:!0,isBlockGap:!0}).range(n,l))}if(!r)break;n=r.to+1}return ve.set(e)}updateDeco(){let e=1,i=this.view.state.facet(za).map(r=>(this.dynamicDecorationMap[e++]=typeof r=="function")?r(this.view):r),n=!1,s=this.view.state.facet(gS).map((r,l)=>{let a=typeof r=="function";return a&&(n=!0),a?r(this.view):r});for(s.length&&(this.dynamicDecorationMap[e++]=n,i.push(pe.join(s))),this.decorations=[this.editContextFormatting,...i,this.computeBlockGapDeco(),this.view.viewState.lineGapDeco];e<this.decorations.length;)this.dynamicDecorationMap[e++]=!1;return this.decorations}scrollIntoView(e){if(e.isSnapshot){let u=this.view.viewState.lineBlockAt(e.range.head);this.view.scrollDOM.scrollTop=u.top-e.yMargin,this.view.scrollDOM.scrollLeft=e.xMargin;return}for(let u of this.view.state.facet(pS))try{if(u(this.view,e.range,e))return!0}catch(c){ri(this.view.state,c,"scroll handler")}let{range:i}=e,n=this.coordsAt(i.head,i.empty?i.assoc:i.head>i.anchor?-1:1),s;if(!n)return;!i.empty&&(s=this.coordsAt(i.anchor,i.anchor>i.head?-1:1))&&(n={left:Math.min(n.left,s.left),top:Math.min(n.top,s.top),right:Math.max(n.right,s.right),bottom:Math.max(n.bottom,s.bottom)});let r=xS(this.view),l={left:n.left-r.left,top:n.top-r.top,right:n.right+r.right,bottom:n.bottom+r.bottom},{offsetWidth:a,offsetHeight:o}=this.view.scrollDOM;M2(this.view.scrollDOM,l,i.head<i.anchor?-1:1,e.x,e.y,Math.max(Math.min(e.xMargin,a),-a),Math.max(Math.min(e.yMargin,o),-o),this.view.textDirection==ke.LTR)}};function F2(t){return t.node.nodeType==1&&t.node.firstChild&&(t.offset==0||t.node.childNodes[t.offset-1].contentEditable=="false")&&(t.offset==t.node.childNodes.length||t.node.childNodes[t.offset].contentEditable=="false")}function SS(t,e){let i=t.observer.selectionRange;if(!i.focusNode)return null;let n=Gx(i.focusNode,i.focusOffset),s=Ux(i.focusNode,i.focusOffset),r=n||s;if(s&&n&&s.node!=n.node){let a=se.get(s.node);if(!a||a instanceof Ti&&a.text!=s.node.nodeValue)r=s;else if(t.docView.lastCompositionAfterCursor){let o=se.get(n.node);!o||o instanceof Ti&&o.text!=n.node.nodeValue||(r=s)}}if(t.docView.lastCompositionAfterCursor=r!=n,!r)return null;let l=e-r.offset;return{from:l,to:l+r.node.nodeValue.length,node:r.node}}function eP(t,e,i){let n=SS(t,i);if(!n)return null;let{node:s,from:r,to:l}=n,a=s.nodeValue;if(/[\n\r]/.test(a)||t.state.doc.sliceString(n.from,n.to)!=a)return null;let o=e.invertedDesc,u=new Qi(o.mapPos(r),o.mapPos(l),r,l),c=[];for(let h=s.parentNode;;h=h.parentNode){let f=se.get(h);if(f instanceof Xn)c.push({node:h,deco:f.mark});else{if(f instanceof Ve||h.nodeName=="DIV"&&h.parentNode==t.contentDOM)return{range:u,text:s,marks:c,line:h};if(h!=t.contentDOM)c.push({node:h,deco:new Ca({inclusive:!0,attributes:q2(h),tagName:h.tagName.toLowerCase()})});else return null}}}function tP(t,e){return t.nodeType!=1?0:(e&&t.childNodes[e-1].contentEditable=="false"?1:0)|(e<t.childNodes.length&&t.childNodes[e].contentEditable=="false"?2:0)}var iP=class{constructor(){this.changes=[]}compareRange(e,i){sc(e,i,this.changes)}comparePoint(e,i){sc(e,i,this.changes)}boundChange(e){sc(e,e,this.changes)}};function nP(t,e,i){let n=new iP;return pe.compare(t,e,i,n),n.changes}function sP(t,e){for(let i=t;i&&i!=e;i=i.assignedSlot||i.parentNode)if(i.nodeType==1&&i.contentEditable=="false")return!0;return!1}function rP(t,e){let i=!1;return e&&t.iterChangedRanges((n,s)=>{n<e.to&&s>e.from&&(i=!0)}),i}function lP(t,e,i=1){let n=t.charCategorizer(e),s=t.doc.lineAt(e),r=e-s.from;if(s.length==0)return A.cursor(e);r==0?i=1:r==s.length&&(i=-1);let l=r,a=r;i<0?l=Le(s.text,r,!1):a=Le(s.text,r);let o=n(s.text.slice(l,a));for(;l>0;){let u=Le(s.text,l,!1);if(n(s.text.slice(u,l))!=o)break;l=u}for(;a<s.length;){let u=Le(s.text,a);if(n(s.text.slice(a,u))!=o)break;a=u}return A.range(l+s.from,a+s.from)}function aP(t,e){return e.left>t?e.left-t:Math.max(0,t-e.right)}function oP(t,e){return e.top>t?e.top-t:Math.max(0,t-e.bottom)}function cp(t,e){return t.top<e.bottom-1&&t.bottom>e.top+1}function gx(t,e){return e<t.top?{top:e,left:t.left,right:t.right,bottom:t.bottom}:t}function yx(t,e){return e>t.bottom?{top:t.top,left:t.left,right:t.right,bottom:e}:t}function Tp(t,e,i){let n,s,r,l,a=!1,o,u,c,h;for(let m=t.firstChild;m;m=m.nextSibling){let g=Aa(m);for(let x=0;x<g.length;x++){let p=g[x];s&&cp(s,p)&&(p=gx(yx(p,s.bottom),s.top));let O=aP(e,p),y=oP(i,p);if(O==0&&y==0)return m.nodeType==3?bx(m,e,i):Tp(m,e,i);(!n||l>y||l==y&&r>O)&&(n=m,s=p,r=O,l=y,a=O?e<p.left?x>0:x<g.length-1:!0),O==0?i>p.bottom&&(!c||c.bottom<p.bottom)?(o=m,c=p):i<p.top&&(!h||h.top>p.top)&&(u=m,h=p):c&&cp(c,p)?c=yx(c,p.bottom):h&&cp(h,p)&&(h=gx(h,p.top))}}if(c&&c.bottom>=i?(n=o,s=c):h&&h.top<=i&&(n=u,s=h),!n)return{node:t,offset:0};let f=Math.max(s.left,Math.min(s.right,e));if(n.nodeType==3)return bx(n,f,i);if(a&&n.contentEditable!="false")return Tp(n,f,i);let d=Array.prototype.indexOf.call(t.childNodes,n)+(e>=(s.left+s.right)/2?1:0);return{node:t,offset:d}}function bx(t,e,i){let n=t.nodeValue.length,s=-1,r=1e9,l=0;for(let a=0;a<n;a++){let o=Ps(t,a,a+1).getClientRects();for(let u=0;u<o.length;u++){let c=o[u];if(c.top==c.bottom)continue;l||(l=e-c.left);let h=(c.top>i?c.top-i:i-c.bottom)-1;if(c.left-1<=e&&c.right+1>=e&&h<r){let f=e>=(c.left+c.right)/2,d=f;if((R.chrome||R.gecko)&&Ps(t,a).getBoundingClientRect().left==c.right&&(d=!f),h<=0)return{node:t,offset:a+(d?1:0)};s=a+(d?1:0),r=h}}}return{node:t,offset:s>-1?s:l>0?t.nodeValue.length:0}}function kS(t,e,i,n=-1){var s,r;let l=t.contentDOM.getBoundingClientRect(),a=l.top+t.viewState.paddingTop,o,{docHeight:u}=t.viewState,{x:c,y:h}=e,f=h-a;if(f<0)return 0;if(f>u)return t.state.doc.length;for(let S=t.viewState.heightOracle.textHeight/2,k=!1;o=t.elementAtHeight(f),o.type!=Ut.Text;)for(;f=n>0?o.bottom+S:o.top-S,!(f>=0&&f<=u);){if(k)return i?null:0;k=!0,n=-n}h=a+f;let d=o.from;if(d<t.viewport.from)return t.viewport.from==0?0:i?null:xx(t,l,o,c,h);if(d>t.viewport.to)return t.viewport.to==t.state.doc.length?t.state.doc.length:i?null:xx(t,l,o,c,h);let m=t.dom.ownerDocument,g=t.root.elementFromPoint?t.root:m,x=g.elementFromPoint(c,h);x&&!t.contentDOM.contains(x)&&(x=null),x||(c=Math.max(l.left+1,Math.min(l.right-1,c)),x=g.elementFromPoint(c,h),x&&!t.contentDOM.contains(x)&&(x=null));let p,O=-1;if(x&&((s=t.docView.nearest(x))===null||s===void 0?void 0:s.isEditable)!=!1){if(m.caretPositionFromPoint){let S=m.caretPositionFromPoint(c,h);S&&({offsetNode:p,offset:O}=S)}else if(m.caretRangeFromPoint){let S=m.caretRangeFromPoint(c,h);S&&({startContainer:p,startOffset:O}=S,(!t.contentDOM.contains(p)||R.safari&&uP(p,O,c)||R.chrome&&cP(p,O,c))&&(p=void 0))}p&&(O=Math.min(wi(p),O))}if(!p||!t.docView.dom.contains(p)){let S=Ve.find(t.docView,d);if(!S)return f>o.top+o.height/2?o.to:o.from;({node:p,offset:O}=Tp(S.dom,c,h))}let y=t.docView.nearest(p);if(!y)return null;if(y.isWidget&&((r=y.dom)===null||r===void 0?void 0:r.nodeType)==1){let S=y.dom.getBoundingClientRect();return e.y<S.top||e.y<=S.bottom&&e.x<=(S.left+S.right)/2?y.posAtStart:y.posAtEnd}else return y.localPosFromDOM(p,O)+y.posAtStart}function xx(t,e,i,n,s){let r=Math.round((n-e.left)*t.defaultCharacterWidth);if(t.lineWrapping&&i.height>t.defaultLineHeight*1.5){let a=t.viewState.heightOracle.textHeight,o=Math.floor((s-i.top-(t.defaultLineHeight-a)*.5)/a);r+=o*t.viewState.heightOracle.lineLength}let l=t.state.sliceDoc(i.from,i.to);return i.from+sx(l,r,t.state.tabSize)}function uP(t,e,i){let n,s=t;if(t.nodeType!=3||e!=(n=t.nodeValue.length))return!1;for(;;){let r=s.nextSibling;if(r){if(r.nodeName=="BR")break;return!1}else{let l=s.parentNode;if(!l||l.nodeName=="DIV")break;s=l}}return Ps(t,n-1,n).getBoundingClientRect().right>i}function cP(t,e,i){if(e!=0)return!1;for(let s=t;;){let r=s.parentNode;if(!r||r.nodeType!=1||r.firstChild!=s)return!1;if(r.classList.contains("cm-line"))break;s=r}let n=t.nodeType==1?t.getBoundingClientRect():Ps(t,0,Math.max(t.nodeValue.length,1)).getBoundingClientRect();return i-n.left>5}function hP(t,e,i){let n=t.lineBlockAt(e);if(Array.isArray(n.type)){let s;for(let r of n.type){if(r.from>e)break;if(!(r.to<e)){if(r.from<e&&r.to>e)return r;(!s||r.type==Ut.Text&&(s.type!=r.type||(i<0?r.from<e:r.to>e)))&&(s=r)}}return s||n}return n}function fP(t,e,i,n){let s=hP(t,e.head,e.assoc||-1),r=!n||s.type!=Ut.Text||!(t.lineWrapping||s.widgetLineBreaks)?null:t.coordsAtPos(e.assoc<0&&e.head>s.from?e.head-1:e.head);if(r){let l=t.dom.getBoundingClientRect(),a=t.textDirectionAt(s.from),o=t.posAtCoords({x:i==(a==ke.LTR)?l.right-1:l.left+1,y:(r.top+r.bottom)/2});if(o!=null)return A.cursor(o,i?-1:1)}return A.cursor(i?s.to:s.from,i?-1:1)}function Sx(t,e,i,n){let s=t.state.doc.lineAt(e.head),r=t.bidiSpans(s),l=t.textDirectionAt(s.from);for(let a=e,o=null;;){let u=I2(s,r,l,a,i),c=lS;if(!u){if(s.number==(i?t.state.doc.lines:1))return a;c=`
`,s=t.state.doc.line(s.number+(i?1:-1)),r=t.bidiSpans(s),u=t.visualLineSide(s,!i)}if(o){if(!o(c))return a}else{if(!n)return u;o=n(c)}a=u}}function dP(t,e,i){let n=t.state.charCategorizer(e),s=n(i);return r=>{let l=n(r);return s==ni.Space&&(s=l),s==l}}function pP(t,e,i,n){let s=e.head,r=i?1:-1;if(s==(i?t.state.doc.length:0))return A.cursor(s,e.assoc);let l=e.goalColumn,a,o=t.contentDOM.getBoundingClientRect(),u=t.coordsAtPos(s,e.assoc||-1),c=t.documentTop;if(u)l==null&&(l=u.left-o.left),a=r<0?u.top:u.bottom;else{let d=t.viewState.lineBlockAt(s);l==null&&(l=Math.min(o.right-o.left,t.defaultCharacterWidth*(s-d.from))),a=(r<0?d.top:d.bottom)+c}let h=o.left+l,f=n??t.viewState.heightOracle.textHeight>>1;for(let d=0;;d+=10){let m=a+(f+d)*r,g=kS(t,{x:h,y:m},!1,r);if(m<o.top||m>o.bottom||(r<0?g<s:g>s)){let x=t.docView.coordsForChar(g),p=!x||m<x.top?-1:1;return A.cursor(g,p,void 0,l)}}}function rc(t,e,i){for(;;){let n=0;for(let s of t)s.between(e-1,e+1,(r,l,a)=>{if(e>r&&e<l){let o=n||i||(e-r<l-e?-1:1);e=o<0?r:l,n=o}});if(!n)return e}}function vS(t,e){let i=null;for(let n=0;n<e.ranges.length;n++){let s=e.ranges[n],r=null;if(s.empty){let l=rc(t,s.from,0);l!=s.from&&(r=A.cursor(l,-1))}else{let l=rc(t,s.from,-1),a=rc(t,s.to,1);(l!=s.from||a!=s.to)&&(r=A.range(s.from==s.anchor?l:a,s.from==s.head?l:a))}r&&(i||(i=e.ranges.slice()),i[n]=r)}return i?A.create(i,e.mainIndex):e}function hp(t,e,i){let n=rc(t.state.facet(vc).map(s=>s(t)),i.from,e.head>i.from?-1:1);return n==i.from?i:A.cursor(n,n<i.from?1:-1)}var xa="\uFFFF",Pp=class{constructor(e,i){this.points=e,this.text="",this.lineSeparator=i.facet(be.lineSeparator)}append(e){this.text+=e}lineBreak(){this.text+=xa}readRange(e,i){if(!e)return this;let n=e.parentNode;for(let s=e;;){this.findPointBefore(n,s);let r=this.text.length;this.readNode(s);let l=s.nextSibling;if(l==i)break;let a=se.get(s),o=se.get(l);(a&&o?a.breakAfter:(a?a.breakAfter:oc(s))||oc(l)&&(s.nodeName!="BR"||s.cmIgnore)&&this.text.length>r)&&this.lineBreak(),s=l}return this.findPointBefore(n,i),this}readTextNode(e){let i=e.nodeValue;for(let n of this.points)n.node==e&&(n.pos=this.text.length+Math.min(n.offset,i.length));for(let n=0,s=this.lineSeparator?null:/\r\n?|\n/g;;){let r=-1,l=1,a;if(this.lineSeparator?(r=i.indexOf(this.lineSeparator,n),l=this.lineSeparator.length):(a=s.exec(i))&&(r=a.index,l=a[0].length),this.append(i.slice(n,r<0?i.length:r)),r<0)break;if(this.lineBreak(),l>1)for(let o of this.points)o.node==e&&o.pos>this.text.length&&(o.pos-=l-1);n=r+l}}readNode(e){if(e.cmIgnore)return;let i=se.get(e),n=i&&i.overrideDOMText;if(n!=null){this.findPointInside(e,n.length);for(let s=n.iter();!s.next().done;)s.lineBreak?this.lineBreak():this.append(s.value)}else e.nodeType==3?this.readTextNode(e):e.nodeName=="BR"?e.nextSibling&&this.lineBreak():e.nodeType==1&&this.readRange(e.firstChild,null)}findPointBefore(e,i){for(let n of this.points)n.node==e&&e.childNodes[n.offset]==i&&(n.pos=this.text.length)}findPointInside(e,i){for(let n of this.points)(e.nodeType==3?n.node==e:e.contains(n.node))&&(n.pos=this.text.length+(mP(e,n.node,n.offset)?i:0))}};function mP(t,e,i){for(;;){if(!e||i<wi(e))return!1;if(e==t)return!0;i=Ts(e)+1,e=e.parentNode}}var pc=class{constructor(e,i){this.node=e,this.offset=i,this.pos=-1}},$p=class{constructor(e,i,n,s){this.typeOver=s,this.bounds=null,this.text="",this.domChanged=i>-1;let{impreciseHead:r,impreciseAnchor:l}=e.docView;if(e.state.readOnly&&i>-1)this.newSel=null;else if(i>-1&&(this.bounds=e.docView.domBoundsAround(i,n,0))){let a=r||l?[]:yP(e),o=new Pp(a,e.state);o.readRange(this.bounds.startDOM,this.bounds.endDOM),this.text=o.text,this.newSel=bP(a,this.bounds.from)}else{let a=e.observer.selectionRange,o=r&&r.node==a.focusNode&&r.offset==a.focusOffset||!mp(e.contentDOM,a.focusNode)?e.state.selection.main.head:e.docView.posFromDOM(a.focusNode,a.focusOffset),u=l&&l.node==a.anchorNode&&l.offset==a.anchorOffset||!mp(e.contentDOM,a.anchorNode)?e.state.selection.main.anchor:e.docView.posFromDOM(a.anchorNode,a.anchorOffset),c=e.viewport;if((R.ios||R.chrome)&&e.state.selection.main.empty&&o!=u&&(c.from>0||c.to<e.state.doc.length)){let h=Math.min(o,u),f=Math.max(o,u),d=c.from-h,m=c.to-f;(d==0||d==1||h==0)&&(m==0||m==-1||f==e.state.doc.length)&&(o=0,u=e.state.doc.length)}this.newSel=A.single(u,o)}}};function QS(t,e){let i,{newSel:n}=e,s=t.state.selection.main,r=t.inputState.lastKeyTime>Date.now()-100?t.inputState.lastKeyCode:-1;if(e.bounds){let{from:l,to:a}=e.bounds,o=s.from,u=null;(r===8||R.android&&e.text.length<a-l)&&(o=s.to,u="end");let c=gP(t.state.doc.sliceString(l,a,xa),e.text,o-l,u);c&&(R.chrome&&r==13&&c.toB==c.from+2&&e.text.slice(c.from,c.toB)==xa+xa&&c.toB--,i={from:l+c.from,to:l+c.toA,insert:G.of(e.text.slice(c.from,c.toB).split(xa))})}else n&&(!t.hasFocus&&t.state.facet(tn)||n.main.eq(s))&&(n=null);if(!i&&!n)return!1;if(!i&&e.typeOver&&!s.empty&&n&&n.main.empty?i={from:s.from,to:s.to,insert:t.state.doc.slice(s.from,s.to)}:(R.mac||R.android)&&i&&i.from==i.to&&i.from==s.head-1&&/^\. ?$/.test(i.insert.toString())&&t.contentDOM.getAttribute("autocorrect")=="off"?(n&&i.insert.length==2&&(n=A.single(n.main.anchor-1,n.main.head-1)),i={from:i.from,to:i.to,insert:G.of([i.insert.toString().replace("."," ")])}):i&&i.from>=s.from&&i.to<=s.to&&(i.from!=s.from||i.to!=s.to)&&s.to-s.from-(i.to-i.from)<=4?i={from:s.from,to:s.to,insert:t.state.doc.slice(s.from,i.from).append(i.insert).append(t.state.doc.slice(i.to,s.to))}:R.chrome&&i&&i.from==i.to&&i.from==s.head&&i.insert.toString()==`
 `&&t.lineWrapping&&(n&&(n=A.single(n.main.anchor-1,n.main.head-1)),i={from:s.from,to:s.to,insert:G.of([" "])}),i)return Fp(t,i,n,r);if(n&&!n.main.eq(s)){let l=!1,a="select";return t.inputState.lastSelectionTime>Date.now()-50&&(t.inputState.lastSelectionOrigin=="select"&&(l=!0),a=t.inputState.lastSelectionOrigin,a=="select.pointer"&&(n=vS(t.state.facet(vc).map(o=>o(t)),n))),t.dispatch({selection:n,scrollIntoView:l,userEvent:a}),!0}else return!1}function Fp(t,e,i,n=-1){if(R.ios&&t.inputState.flushIOSKey(e))return!0;let s=t.state.selection.main;if(R.android&&(e.to==s.to&&(e.from==s.from||e.from==s.from-1&&t.state.sliceDoc(e.from,s.from)==" ")&&e.insert.length==1&&e.insert.lines==2&&jr(t.contentDOM,"Enter",13)||(e.from==s.from-1&&e.to==s.to&&e.insert.length==0||n==8&&e.insert.length<e.to-e.from&&e.to>s.head)&&jr(t.contentDOM,"Backspace",8)||e.from==s.from&&e.to==s.to+1&&e.insert.length==0&&jr(t.contentDOM,"Delete",46)))return!0;let r=e.insert.toString();t.inputState.composing>=0&&t.inputState.composing++;let l,a=()=>l||(l=OP(t,e,i));return t.state.facet(hS).some(o=>o(t,e.from,e.to,r,a))||t.dispatch(a()),!0}function OP(t,e,i){let n,s=t.state,r=s.selection.main;if(e.from>=r.from&&e.to<=r.to&&e.to-e.from>=(r.to-r.from)/3&&(!i||i.main.empty&&i.main.from==e.from+e.insert.length)&&t.inputState.composing<0){let a=r.from<e.from?s.sliceDoc(r.from,e.from):"",o=r.to>e.to?s.sliceDoc(e.to,r.to):"";n=s.replaceSelection(t.state.toText(a+e.insert.sliceString(0,void 0,t.state.lineBreak)+o))}else{let a=s.changes(e),o=i&&i.main.to<=a.newLength?i.main:void 0;if(s.selection.ranges.length>1&&t.inputState.composing>=0&&e.to<=r.to&&e.to>=r.to-10){let u=t.state.sliceDoc(e.from,e.to),c,h=i&&SS(t,i.main.head);if(h){let m=e.insert.length-(e.to-e.from);c={from:h.from,to:h.to-m}}else c=t.state.doc.lineAt(r.head);let f=r.to-e.to,d=r.to-r.from;n=s.changeByRange(m=>{if(m.from==r.from&&m.to==r.to)return{changes:a,range:o||m.map(a)};let g=m.to-f,x=g-u.length;if(m.to-m.from!=d||t.state.sliceDoc(x,g)!=u||m.to>=c.from&&m.from<=c.to)return{range:m};let p=s.changes({from:x,to:g,insert:e.insert}),O=m.to-r.to;return{changes:p,range:o?A.range(Math.max(0,o.anchor+O),Math.max(0,o.head+O)):m.map(p)}})}else n={changes:a,selection:o&&s.selection.replaceRange(o)}}let l="input.type";return(t.composing||t.inputState.compositionPendingChange&&t.inputState.compositionEndedAt>Date.now()-50)&&(t.inputState.compositionPendingChange=!1,l+=".compose",t.inputState.compositionFirstChange&&(l+=".start",t.inputState.compositionFirstChange=!1)),s.update(n,{userEvent:l,scrollIntoView:!0})}function gP(t,e,i,n){let s=Math.min(t.length,e.length),r=0;for(;r<s&&t.charCodeAt(r)==e.charCodeAt(r);)r++;if(r==s&&t.length==e.length)return null;let l=t.length,a=e.length;for(;l>0&&a>0&&t.charCodeAt(l-1)==e.charCodeAt(a-1);)l--,a--;if(n=="end"){let o=Math.max(0,r-Math.min(l,a));i-=l+o-r}if(l<r&&t.length<e.length){let o=i<=r&&i>=l?r-i:0;r-=o,a=r+(a-l),l=r}else if(a<r){let o=i<=r&&i>=a?r-i:0;r-=o,l=r+(l-a),a=r}return{from:r,toA:l,toB:a}}function yP(t){let e=[];if(t.root.activeElement!=t.contentDOM)return e;let{anchorNode:i,anchorOffset:n,focusNode:s,focusOffset:r}=t.observer.selectionRange;return i&&(e.push(new pc(i,n)),(s!=i||r!=n)&&e.push(new pc(s,r))),e}function bP(t,e){if(t.length==0)return null;let i=t[0].pos,n=t.length==2?t[1].pos:i;return i>-1&&n>-1?A.single(i+e,n+e):null}var Ap=class{setSelectionOrigin(e){this.lastSelectionOrigin=e,this.lastSelectionTime=Date.now()}constructor(e){this.view=e,this.lastKeyCode=0,this.lastKeyTime=0,this.lastTouchTime=0,this.lastFocusTime=0,this.lastScrollTop=0,this.lastScrollLeft=0,this.pendingIOSKey=void 0,this.tabFocusMode=-1,this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastContextMenu=0,this.scrollHandlers=[],this.handlers=Object.create(null),this.composing=-1,this.compositionFirstChange=null,this.compositionEndedAt=0,this.compositionPendingKey=!1,this.compositionPendingChange=!1,this.mouseSelection=null,this.draggedContent=null,this.handleEvent=this.handleEvent.bind(this),this.notifiedFocused=e.hasFocus,R.safari&&e.contentDOM.addEventListener("input",()=>null),R.gecko&&zP(e.contentDOM.ownerDocument)}handleEvent(e){!TP(this.view,e)||this.ignoreDuringComposition(e)||e.type=="keydown"&&this.keydown(e)||(this.view.updateState!=0?Promise.resolve().then(()=>this.runHandlers(e.type,e)):this.runHandlers(e.type,e))}runHandlers(e,i){let n=this.handlers[e];if(n){for(let s of n.observers)s(this.view,i);for(let s of n.handlers){if(i.defaultPrevented)break;if(s(this.view,i)){i.preventDefault();break}}}}ensureHandlers(e){let i=xP(e),n=this.handlers,s=this.view.contentDOM;for(let r in i)if(r!="scroll"){let l=!i[r].handlers.length,a=n[r];a&&l!=!a.handlers.length&&(s.removeEventListener(r,this.handleEvent),a=null),a||s.addEventListener(r,this.handleEvent,{passive:l})}for(let r in n)r!="scroll"&&!i[r]&&s.removeEventListener(r,this.handleEvent);this.handlers=i}keydown(e){if(this.lastKeyCode=e.keyCode,this.lastKeyTime=Date.now(),e.keyCode==9&&this.tabFocusMode>-1&&(!this.tabFocusMode||Date.now()<=this.tabFocusMode))return!0;if(this.tabFocusMode>0&&e.keyCode!=27&&TS.indexOf(e.keyCode)<0&&(this.tabFocusMode=-1),R.android&&R.chrome&&!e.synthetic&&(e.keyCode==13||e.keyCode==8))return this.view.observer.delayAndroidKey(e.key,e.keyCode),!0;let i;return R.ios&&!e.synthetic&&!e.altKey&&!e.metaKey&&((i=wS.find(n=>n.keyCode==e.keyCode))&&!e.ctrlKey||SP.indexOf(e.key)>-1&&e.ctrlKey&&!e.shiftKey)?(this.pendingIOSKey=i||e,setTimeout(()=>this.flushIOSKey(),250),!0):(e.keyCode!=229&&this.view.observer.forceFlush(),!1)}flushIOSKey(e){let i=this.pendingIOSKey;return!i||i.key=="Enter"&&e&&e.from<e.to&&/^\S+$/.test(e.insert.toString())?!1:(this.pendingIOSKey=void 0,jr(this.view.contentDOM,i.key,i.keyCode,i instanceof KeyboardEvent?i:void 0))}ignoreDuringComposition(e){return/^key/.test(e.type)?this.composing>0?!0:R.safari&&!R.ios&&this.compositionPendingKey&&Date.now()-this.compositionEndedAt<100?(this.compositionPendingKey=!1,!0):!1:!1}startMouseSelection(e){this.mouseSelection&&this.mouseSelection.destroy(),this.mouseSelection=e}update(e){this.view.observer.update(e),this.mouseSelection&&this.mouseSelection.update(e),this.draggedContent&&e.docChanged&&(this.draggedContent=this.draggedContent.map(e.changes)),e.transactions.length&&(this.lastKeyCode=this.lastSelectionTime=0)}destroy(){this.mouseSelection&&this.mouseSelection.destroy()}};function kx(t,e){return(i,n)=>{try{return e.call(t,n,i)}catch(s){ri(i.state,s)}}}function xP(t){let e=Object.create(null);function i(n){return e[n]||(e[n]={observers:[],handlers:[]})}for(let n of t){let s=n.spec,r=s&&s.plugin.domEventHandlers,l=s&&s.plugin.domEventObservers;if(r)for(let a in r){let o=r[a];o&&i(a).handlers.push(kx(n.value,o))}if(l)for(let a in l){let o=l[a];o&&i(a).observers.push(kx(n.value,o))}}for(let n in li)i(n).handlers.push(li[n]);for(let n in Wt)i(n).observers.push(Wt[n]);return e}var wS=[{key:"Backspace",keyCode:8,inputType:"deleteContentBackward"},{key:"Enter",keyCode:13,inputType:"insertParagraph"},{key:"Enter",keyCode:13,inputType:"insertLineBreak"},{key:"Delete",keyCode:46,inputType:"deleteContentForward"}],SP="dthko",TS=[16,17,18,20,91,92,224,225],Ku=6;function Ju(t){return Math.max(0,t)*.7+8}function kP(t,e){return Math.max(Math.abs(t.clientX-e.clientX),Math.abs(t.clientY-e.clientY))}var Rp=class{constructor(e,i,n,s){this.view=e,this.startEvent=i,this.style=n,this.mustSelect=s,this.scrollSpeed={x:0,y:0},this.scrolling=-1,this.lastEvent=i,this.scrollParents=E2(e.contentDOM),this.atoms=e.state.facet(vc).map(l=>l(e));let r=e.contentDOM.ownerDocument;r.addEventListener("mousemove",this.move=this.move.bind(this)),r.addEventListener("mouseup",this.up=this.up.bind(this)),this.extend=i.shiftKey,this.multiple=e.state.facet(be.allowMultipleSelections)&&vP(e,i),this.dragging=wP(e,i)&&AS(i)==1?null:!1}start(e){this.dragging===!1&&this.select(e)}move(e){if(e.buttons==0)return this.destroy();if(this.dragging||this.dragging==null&&kP(this.startEvent,e)<10)return;this.select(this.lastEvent=e);let i=0,n=0,s=0,r=0,l=this.view.win.innerWidth,a=this.view.win.innerHeight;this.scrollParents.x&&({left:s,right:l}=this.scrollParents.x.getBoundingClientRect()),this.scrollParents.y&&({top:r,bottom:a}=this.scrollParents.y.getBoundingClientRect());let o=xS(this.view);e.clientX-o.left<=s+Ku?i=-Ju(s-e.clientX):e.clientX+o.right>=l-Ku&&(i=Ju(e.clientX-l)),e.clientY-o.top<=r+Ku?n=-Ju(r-e.clientY):e.clientY+o.bottom>=a-Ku&&(n=Ju(e.clientY-a)),this.setScrollSpeed(i,n)}up(e){this.dragging==null&&this.select(this.lastEvent),this.dragging||e.preventDefault(),this.destroy()}destroy(){this.setScrollSpeed(0,0);let e=this.view.contentDOM.ownerDocument;e.removeEventListener("mousemove",this.move),e.removeEventListener("mouseup",this.up),this.view.inputState.mouseSelection=this.view.inputState.draggedContent=null}setScrollSpeed(e,i){this.scrollSpeed={x:e,y:i},e||i?this.scrolling<0&&(this.scrolling=setInterval(()=>this.scroll(),50)):this.scrolling>-1&&(clearInterval(this.scrolling),this.scrolling=-1)}scroll(){let{x:e,y:i}=this.scrollSpeed;e&&this.scrollParents.x&&(this.scrollParents.x.scrollLeft+=e,e=0),i&&this.scrollParents.y&&(this.scrollParents.y.scrollTop+=i,i=0),(e||i)&&this.view.win.scrollBy(e,i),this.dragging===!1&&this.select(this.lastEvent)}select(e){let{view:i}=this,n=vS(this.atoms,this.style.get(e,this.extend,this.multiple));(this.mustSelect||!n.eq(i.state.selection,this.dragging===!1))&&this.view.dispatch({selection:n,userEvent:"select.pointer"}),this.mustSelect=!1}update(e){e.transactions.some(i=>i.isUserEvent("input.type"))?this.destroy():this.style.update(e)&&setTimeout(()=>this.select(this.lastEvent),20)}};function vP(t,e){let i=t.state.facet(aS);return i.length?i[0](e):R.mac?e.metaKey:e.ctrlKey}function QP(t,e){let i=t.state.facet(oS);return i.length?i[0](e):R.mac?!e.altKey:!e.ctrlKey}function wP(t,e){let{main:i}=t.state.selection;if(i.empty)return!1;let n=$a(t.root);if(!n||n.rangeCount==0)return!0;let s=n.getRangeAt(0).getClientRects();for(let r=0;r<s.length;r++){let l=s[r];if(l.left<=e.clientX&&l.right>=e.clientX&&l.top<=e.clientY&&l.bottom>=e.clientY)return!0}return!1}function TP(t,e){if(!e.bubbles)return!0;if(e.defaultPrevented)return!1;for(let i=e.target,n;i!=t.contentDOM;i=i.parentNode)if(!i||i.nodeType==11||(n=se.get(i))&&n.ignoreEvent(e))return!1;return!0}var li=Object.create(null),Wt=Object.create(null),PS=R.ie&&R.ie_version<15||R.ios&&R.webkit_version<604;function PP(t){let e=t.dom.parentNode;if(!e)return;let i=e.appendChild(document.createElement("textarea"));i.style.cssText="position: fixed; left: -10000px; top: 10px",i.focus(),setTimeout(()=>{t.focus(),i.remove(),$S(t,i.value)},50)}function Qc(t,e,i){for(let n of t.facet(e))i=n(i,t);return i}function $S(t,e){e=Qc(t.state,Hp,e);let{state:i}=t,n,s=1,r=i.toText(e),l=r.lines==i.selection.ranges.length;if(Cp!=null&&i.selection.ranges.every(o=>o.empty)&&Cp==r.toString()){let o=-1;n=i.changeByRange(u=>{let c=i.doc.lineAt(u.from);if(c.from==o)return{range:u};o=c.from;let h=i.toText((l?r.line(s++).text:e)+i.lineBreak);return{changes:{from:c.from,insert:h},range:A.cursor(u.from+h.length)}})}else l?n=i.changeByRange(o=>{let u=r.line(s++);return{changes:{from:o.from,to:o.to,insert:u.text},range:A.cursor(o.from+u.length)}}):n=i.replaceSelection(r);t.dispatch(n,{userEvent:"input.paste",scrollIntoView:!0})}Wt.scroll=t=>{t.inputState.lastScrollTop=t.scrollDOM.scrollTop,t.inputState.lastScrollLeft=t.scrollDOM.scrollLeft};li.keydown=(t,e)=>(t.inputState.setSelectionOrigin("select"),e.keyCode==27&&t.inputState.tabFocusMode!=0&&(t.inputState.tabFocusMode=Date.now()+2e3),!1);Wt.touchstart=(t,e)=>{t.inputState.lastTouchTime=Date.now(),t.inputState.setSelectionOrigin("select.pointer")};Wt.touchmove=t=>{t.inputState.setSelectionOrigin("select.pointer")};li.mousedown=(t,e)=>{if(t.observer.flush(),t.inputState.lastTouchTime>Date.now()-2e3)return!1;let i=null;for(let n of t.state.facet(uS))if(i=n(t,e),i)break;if(!i&&e.button==0&&(i=RP(t,e)),i){let n=!t.hasFocus;t.inputState.startMouseSelection(new Rp(t,e,i,n)),n&&t.observer.ignore(()=>{jx(t.contentDOM);let r=t.root.activeElement;r&&!r.contains(t.contentDOM)&&r.blur()});let s=t.inputState.mouseSelection;if(s)return s.start(e),s.dragging===!1}else t.inputState.setSelectionOrigin("select.pointer");return!1};function vx(t,e,i,n){if(n==1)return A.cursor(e,i);if(n==2)return lP(t.state,e,i);{let s=Ve.find(t.docView,e),r=t.state.doc.lineAt(s?s.posAtEnd:e),l=s?s.posAtStart:r.from,a=s?s.posAtEnd:r.to;return a<t.state.doc.length&&a==r.to&&a++,A.range(l,a)}}var Qx=(t,e,i)=>e>=i.top&&e<=i.bottom&&t>=i.left&&t<=i.right;function $P(t,e,i,n){let s=Ve.find(t.docView,e);if(!s)return 1;let r=e-s.posAtStart;if(r==0)return 1;if(r==s.length)return-1;let l=s.coordsAt(r,-1);if(l&&Qx(i,n,l))return-1;let a=s.coordsAt(r,1);return a&&Qx(i,n,a)?1:l&&l.bottom>=n?-1:1}function wx(t,e){let i=t.posAtCoords({x:e.clientX,y:e.clientY},!1);return{pos:i,bias:$P(t,i,e.clientX,e.clientY)}}var AP=R.ie&&R.ie_version<=11,Tx=null,Px=0,$x=0;function AS(t){if(!AP)return t.detail;let e=Tx,i=$x;return Tx=t,$x=Date.now(),Px=!e||i>Date.now()-400&&Math.abs(e.clientX-t.clientX)<2&&Math.abs(e.clientY-t.clientY)<2?(Px+1)%3:1}function RP(t,e){let i=wx(t,e),n=AS(e),s=t.state.selection;return{update(r){r.docChanged&&(i.pos=r.changes.mapPos(i.pos),s=s.map(r.changes))},get(r,l,a){let o=wx(t,r),u,c=vx(t,o.pos,o.bias,n);if(i.pos!=o.pos&&!l){let h=vx(t,i.pos,i.bias,n),f=Math.min(h.from,c.from),d=Math.max(h.to,c.to);c=f<c.from?A.range(f,d):A.range(d,f)}return l?s.replaceRange(s.main.extend(c.from,c.to)):a&&n==1&&s.ranges.length>1&&(u=CP(s,o.pos))?u:a?s.addRange(c):A.create([c])}}}function CP(t,e){for(let i=0;i<t.ranges.length;i++){let{from:n,to:s}=t.ranges[i];if(n<=e&&s>=e)return A.create(t.ranges.slice(0,i).concat(t.ranges.slice(i+1)),t.mainIndex==i?0:t.mainIndex-(t.mainIndex>i?1:0))}return null}li.dragstart=(t,e)=>{let{selection:{main:i}}=t.state;if(e.target.draggable){let s=t.docView.nearest(e.target);if(s&&s.isWidget){let r=s.posAtStart,l=r+s.length;(r>=i.to||l<=i.from)&&(i=A.range(r,l))}}let{inputState:n}=t;return n.mouseSelection&&(n.mouseSelection.dragging=!0),n.draggedContent=i,e.dataTransfer&&(e.dataTransfer.setData("Text",Qc(t.state,Kp,t.state.sliceDoc(i.from,i.to))),e.dataTransfer.effectAllowed="copyMove"),!1};li.dragend=t=>(t.inputState.draggedContent=null,!1);function Ax(t,e,i,n){if(i=Qc(t.state,Hp,i),!i)return;let s=t.posAtCoords({x:e.clientX,y:e.clientY},!1),{draggedContent:r}=t.inputState,l=n&&r&&QP(t,e)?{from:r.from,to:r.to}:null,a={from:s,insert:i},o=t.state.changes(l?[l,a]:a);t.focus(),t.dispatch({changes:o,selection:{anchor:o.mapPos(s,-1),head:o.mapPos(s,1)},userEvent:l?"move.drop":"input.drop"}),t.inputState.draggedContent=null}li.drop=(t,e)=>{if(!e.dataTransfer)return!1;if(t.state.readOnly)return!0;let i=e.dataTransfer.files;if(i&&i.length){let n=Array(i.length),s=0,r=()=>{++s==i.length&&Ax(t,e,n.filter(l=>l!=null).join(t.state.lineBreak),!1)};for(let l=0;l<i.length;l++){let a=new FileReader;a.onerror=r,a.onload=()=>{/[\x00-\x08\x0e-\x1f]{2}/.test(a.result)||(n[l]=a.result),r()},a.readAsText(i[l])}return!0}else{let n=e.dataTransfer.getData("Text");if(n)return Ax(t,e,n,!0),!0}return!1};li.paste=(t,e)=>{if(t.state.readOnly)return!0;t.observer.flush();let i=PS?null:e.clipboardData;return i?($S(t,i.getData("text/plain")||i.getData("text/uri-list")),!0):(PP(t),!1)};function MP(t,e){let i=t.dom.parentNode;if(!i)return;let n=i.appendChild(document.createElement("textarea"));n.style.cssText="position: fixed; left: -10000px; top: 10px",n.value=e,n.focus(),n.selectionEnd=e.length,n.selectionStart=0,setTimeout(()=>{n.remove(),t.focus()},50)}function EP(t){let e=[],i=[],n=!1;for(let s of t.selection.ranges)s.empty||(e.push(t.sliceDoc(s.from,s.to)),i.push(s));if(!e.length){let s=-1;for(let{from:r}of t.selection.ranges){let l=t.doc.lineAt(r);l.number>s&&(e.push(l.text),i.push({from:l.from,to:Math.min(t.doc.length,l.to+1)})),s=l.number}n=!0}return{text:Qc(t,Kp,e.join(t.lineBreak)),ranges:i,linewise:n}}var Cp=null;li.copy=li.cut=(t,e)=>{let{text:i,ranges:n,linewise:s}=EP(t.state);if(!i&&!s)return!1;Cp=s?i:null,e.type=="cut"&&!t.state.readOnly&&t.dispatch({changes:n,scrollIntoView:!0,userEvent:"delete.cut"});let r=PS?null:e.clipboardData;return r?(r.clearData(),r.setData("text/plain",i),!0):(MP(t,i),!1)};var RS=Lt.define();function CS(t,e){let i=[];for(let n of t.facet(fS)){let s=n(t,e);s&&i.push(s)}return i.length?t.update({effects:i,annotations:RS.of(!0)}):null}function MS(t){setTimeout(()=>{let e=t.hasFocus;if(e!=t.inputState.notifiedFocused){let i=CS(t.state,e);i?t.dispatch(i):t.update([])}},10)}Wt.focus=t=>{t.inputState.lastFocusTime=Date.now(),!t.scrollDOM.scrollTop&&(t.inputState.lastScrollTop||t.inputState.lastScrollLeft)&&(t.scrollDOM.scrollTop=t.inputState.lastScrollTop,t.scrollDOM.scrollLeft=t.inputState.lastScrollLeft),MS(t)};Wt.blur=t=>{t.observer.clearSelectionRange(),MS(t)};Wt.compositionstart=Wt.compositionupdate=t=>{t.observer.editContext||(t.inputState.compositionFirstChange==null&&(t.inputState.compositionFirstChange=!0),t.inputState.composing<0&&(t.inputState.composing=0))};Wt.compositionend=t=>{t.observer.editContext||(t.inputState.composing=-1,t.inputState.compositionEndedAt=Date.now(),t.inputState.compositionPendingKey=!0,t.inputState.compositionPendingChange=t.observer.pendingRecords().length>0,t.inputState.compositionFirstChange=null,R.chrome&&R.android?t.observer.flushSoon():t.inputState.compositionPendingChange?Promise.resolve().then(()=>t.observer.flush()):setTimeout(()=>{t.inputState.composing<0&&t.docView.hasComposition&&t.update([])},50))};Wt.contextmenu=t=>{t.inputState.lastContextMenu=Date.now()};li.beforeinput=(t,e)=>{var i,n;if(e.inputType=="insertReplacementText"&&t.observer.editContext){let r=(i=e.dataTransfer)===null||i===void 0?void 0:i.getData("text/plain"),l=e.getTargetRanges();if(r&&l.length){let a=l[0],o=t.posAtDOM(a.startContainer,a.startOffset),u=t.posAtDOM(a.endContainer,a.endOffset);return Fp(t,{from:o,to:u,insert:t.state.toText(r)},null),!0}}let s;if(R.chrome&&R.android&&(s=wS.find(r=>r.inputType==e.inputType))&&(t.observer.delayAndroidKey(s.key,s.keyCode),s.key=="Backspace"||s.key=="Delete")){let r=((n=window.visualViewport)===null||n===void 0?void 0:n.height)||0;setTimeout(()=>{var l;(((l=window.visualViewport)===null||l===void 0?void 0:l.height)||0)>r+10&&t.hasFocus&&(t.contentDOM.blur(),t.focus())},100)}return R.ios&&e.inputType=="deleteContentForward"&&t.observer.flushSoon(),R.safari&&e.inputType=="insertText"&&t.inputState.composing>=0&&setTimeout(()=>Wt.compositionend(t,e),20),!1};var Rx=new Set;function zP(t){Rx.has(t)||(Rx.add(t),t.addEventListener("copy",()=>{}),t.addEventListener("cut",()=>{}))}var Cx=["pre-wrap","normal","pre-line","break-spaces"],Vr=!1;function Mx(){Vr=!1}var Mp=class{constructor(e){this.lineWrapping=e,this.doc=G.empty,this.heightSamples={},this.lineHeight=14,this.charWidth=7,this.textHeight=14,this.lineLength=30}heightForGap(e,i){let n=this.doc.lineAt(i).number-this.doc.lineAt(e).number+1;return this.lineWrapping&&(n+=Math.max(0,Math.ceil((i-e-n*this.lineLength*.5)/this.lineLength))),this.lineHeight*n}heightForLine(e){return this.lineWrapping?(1+Math.max(0,Math.ceil((e-this.lineLength)/Math.max(1,this.lineLength-5))))*this.lineHeight:this.lineHeight}setDoc(e){return this.doc=e,this}mustRefreshForWrapping(e){return Cx.indexOf(e)>-1!=this.lineWrapping}mustRefreshForHeights(e){let i=!1;for(let n=0;n<e.length;n++){let s=e[n];s<0?n++:this.heightSamples[Math.floor(s*10)]||(i=!0,this.heightSamples[Math.floor(s*10)]=!0)}return i}refresh(e,i,n,s,r,l){let a=Cx.indexOf(e)>-1,o=Math.round(i)!=Math.round(this.lineHeight)||this.lineWrapping!=a;if(this.lineWrapping=a,this.lineHeight=i,this.charWidth=n,this.textHeight=s,this.lineLength=r,o){this.heightSamples={};for(let u=0;u<l.length;u++){let c=l[u];c<0?u++:this.heightSamples[Math.floor(c*10)]=!0}}return o}},Ep=class{constructor(e,i){this.from=e,this.heights=i,this.index=0}get more(){return this.index<this.heights.length}},ki=class t{constructor(e,i,n,s,r){this.from=e,this.length=i,this.top=n,this.height=s,this._content=r}get type(){return typeof this._content=="number"?Ut.Text:Array.isArray(this._content)?this._content:this._content.type}get to(){return this.from+this.length}get bottom(){return this.top+this.height}get widget(){return this._content instanceof Dn?this._content.widget:null}get widgetLineBreaks(){return typeof this._content=="number"?this._content:0}join(e){let i=(Array.isArray(this._content)?this._content:[this]).concat(Array.isArray(e._content)?e._content:[e]);return new t(this.from,this.length+e.length,this.top,this.height+e.height,i)}},oe=function(t){return t[t.ByPos=0]="ByPos",t[t.ByHeight=1]="ByHeight",t[t.ByPosNoHeight=2]="ByPosNoHeight",t}(oe||(oe={})),lc=.001,$t=class t{constructor(e,i,n=2){this.length=e,this.height=i,this.flags=n}get outdated(){return(this.flags&2)>0}set outdated(e){this.flags=(e?2:0)|this.flags&-3}setHeight(e){this.height!=e&&(Math.abs(this.height-e)>lc&&(Vr=!0),this.height=e)}replace(e,i,n){return t.of(n)}decomposeLeft(e,i){i.push(this)}decomposeRight(e,i){i.push(this)}applyChanges(e,i,n,s){let r=this,l=n.doc;for(let a=s.length-1;a>=0;a--){let{fromA:o,toA:u,fromB:c,toB:h}=s[a],f=r.lineAt(o,oe.ByPosNoHeight,n.setDoc(i),0,0),d=f.to>=u?f:r.lineAt(u,oe.ByPosNoHeight,n,0,0);for(h+=d.to-u,u=d.to;a>0&&f.from<=s[a-1].toA;)o=s[a-1].fromA,c=s[a-1].fromB,a--,o<f.from&&(f=r.lineAt(o,oe.ByPosNoHeight,n,0,0));c+=f.from-o,o=f.from;let m=_p.build(n.setDoc(l),e,c,h);r=mc(r,r.replace(o,u,m))}return r.updateHeight(n,0)}static empty(){return new Gt(0,0)}static of(e){if(e.length==1)return e[0];let i=0,n=e.length,s=0,r=0;for(;;)if(i==n)if(s>r*2){let a=e[i-1];a.break?e.splice(--i,1,a.left,null,a.right):e.splice(--i,1,a.left,a.right),n+=1+a.break,s-=a.size}else if(r>s*2){let a=e[n];a.break?e.splice(n,1,a.left,null,a.right):e.splice(n,1,a.left,a.right),n+=2+a.break,r-=a.size}else break;else if(s<r){let a=e[i++];a&&(s+=a.size)}else{let a=e[--n];a&&(r+=a.size)}let l=0;return e[i-1]==null?(l=1,i--):e[i]==null&&(l=1,n++),new zp(t.of(e.slice(0,i)),l,t.of(e.slice(n)))}};function mc(t,e){return t==e?t:(t.constructor!=e.constructor&&(Vr=!0),e)}$t.prototype.size=1;var Oc=class extends $t{constructor(e,i,n){super(e,i),this.deco=n}blockAt(e,i,n,s){return new ki(s,this.length,n,this.height,this.deco||0)}lineAt(e,i,n,s,r){return this.blockAt(0,n,s,r)}forEachLine(e,i,n,s,r,l){e<=r+this.length&&i>=r&&l(this.blockAt(0,n,s,r))}updateHeight(e,i=0,n=!1,s){return s&&s.from<=i&&s.more&&this.setHeight(s.heights[s.index++]),this.outdated=!1,this}toString(){return`block(${this.length})`}},Gt=class t extends Oc{constructor(e,i){super(e,i,null),this.collapsed=0,this.widgetHeight=0,this.breaks=0}blockAt(e,i,n,s){return new ki(s,this.length,n,this.height,this.breaks)}replace(e,i,n){let s=n[0];return n.length==1&&(s instanceof t||s instanceof Zn&&s.flags&4)&&Math.abs(this.length-s.length)<10?(s instanceof Zn?s=new t(s.length,this.height):s.height=this.height,this.outdated||(s.outdated=!1),s):$t.of(n)}updateHeight(e,i=0,n=!1,s){return s&&s.from<=i&&s.more?this.setHeight(s.heights[s.index++]):(n||this.outdated)&&this.setHeight(Math.max(this.widgetHeight,e.heightForLine(this.length-this.collapsed))+this.breaks*e.lineHeight),this.outdated=!1,this}toString(){return`line(${this.length}${this.collapsed?-this.collapsed:""}${this.widgetHeight?":"+this.widgetHeight:""})`}},Zn=class t extends $t{constructor(e){super(e,0)}heightMetrics(e,i){let n=e.doc.lineAt(i).number,s=e.doc.lineAt(i+this.length).number,r=s-n+1,l,a=0;if(e.lineWrapping){let o=Math.min(this.height,e.lineHeight*r);l=o/r,this.length>r+1&&(a=(this.height-o)/(this.length-r-1))}else l=this.height/r;return{firstLine:n,lastLine:s,perLine:l,perChar:a}}blockAt(e,i,n,s){let{firstLine:r,lastLine:l,perLine:a,perChar:o}=this.heightMetrics(i,s);if(i.lineWrapping){let u=s+(e<i.lineHeight?0:Math.round(Math.max(0,Math.min(1,(e-n)/this.height))*this.length)),c=i.doc.lineAt(u),h=a+c.length*o,f=Math.max(n,e-h/2);return new ki(c.from,c.length,f,h,0)}else{let u=Math.max(0,Math.min(l-r,Math.floor((e-n)/a))),{from:c,length:h}=i.doc.line(r+u);return new ki(c,h,n+a*u,a,0)}}lineAt(e,i,n,s,r){if(i==oe.ByHeight)return this.blockAt(e,n,s,r);if(i==oe.ByPosNoHeight){let{from:d,to:m}=n.doc.lineAt(e);return new ki(d,m-d,0,0,0)}let{firstLine:l,perLine:a,perChar:o}=this.heightMetrics(n,r),u=n.doc.lineAt(e),c=a+u.length*o,h=u.number-l,f=s+a*h+o*(u.from-r-h);return new ki(u.from,u.length,Math.max(s,Math.min(f,s+this.height-c)),c,0)}forEachLine(e,i,n,s,r,l){e=Math.max(e,r),i=Math.min(i,r+this.length);let{firstLine:a,perLine:o,perChar:u}=this.heightMetrics(n,r);for(let c=e,h=s;c<=i;){let f=n.doc.lineAt(c);if(c==e){let m=f.number-a;h+=o*m+u*(e-r-m)}let d=o+u*f.length;l(new ki(f.from,f.length,h,d,0)),h+=d,c=f.to+1}}replace(e,i,n){let s=this.length-i;if(s>0){let r=n[n.length-1];r instanceof t?n[n.length-1]=new t(r.length+s):n.push(null,new t(s-1))}if(e>0){let r=n[0];r instanceof t?n[0]=new t(e+r.length):n.unshift(new t(e-1),null)}return $t.of(n)}decomposeLeft(e,i){i.push(new t(e-1),null)}decomposeRight(e,i){i.push(null,new t(this.length-e-1))}updateHeight(e,i=0,n=!1,s){let r=i+this.length;if(s&&s.from<=i+this.length&&s.more){let l=[],a=Math.max(i,s.from),o=-1;for(s.from>i&&l.push(new t(s.from-i-1).updateHeight(e,i));a<=r&&s.more;){let c=e.doc.lineAt(a).length;l.length&&l.push(null);let h=s.heights[s.index++];o==-1?o=h:Math.abs(h-o)>=lc&&(o=-2);let f=new Gt(c,h);f.outdated=!1,l.push(f),a+=c+1}a<=r&&l.push(null,new t(r-a).updateHeight(e,a));let u=$t.of(l);return(o<0||Math.abs(u.height-this.height)>=lc||Math.abs(o-this.heightMetrics(e,i).perLine)>=lc)&&(Vr=!0),mc(this,u)}else(n||this.outdated)&&(this.setHeight(e.heightForGap(i,i+this.length)),this.outdated=!1);return this}toString(){return`gap(${this.length})`}},zp=class extends $t{constructor(e,i,n){super(e.length+i+n.length,e.height+n.height,i|(e.outdated||n.outdated?2:0)),this.left=e,this.right=n,this.size=e.size+n.size}get break(){return this.flags&1}blockAt(e,i,n,s){let r=n+this.left.height;return e<r?this.left.blockAt(e,i,n,s):this.right.blockAt(e,i,r,s+this.left.length+this.break)}lineAt(e,i,n,s,r){let l=s+this.left.height,a=r+this.left.length+this.break,o=i==oe.ByHeight?e<l:e<a,u=o?this.left.lineAt(e,i,n,s,r):this.right.lineAt(e,i,n,l,a);if(this.break||(o?u.to<a:u.from>a))return u;let c=i==oe.ByPosNoHeight?oe.ByPosNoHeight:oe.ByPos;return o?u.join(this.right.lineAt(a,c,n,l,a)):this.left.lineAt(a,c,n,s,r).join(u)}forEachLine(e,i,n,s,r,l){let a=s+this.left.height,o=r+this.left.length+this.break;if(this.break)e<o&&this.left.forEachLine(e,i,n,s,r,l),i>=o&&this.right.forEachLine(e,i,n,a,o,l);else{let u=this.lineAt(o,oe.ByPos,n,s,r);e<u.from&&this.left.forEachLine(e,u.from-1,n,s,r,l),u.to>=e&&u.from<=i&&l(u),i>u.to&&this.right.forEachLine(u.to+1,i,n,a,o,l)}}replace(e,i,n){let s=this.left.length+this.break;if(i<s)return this.balanced(this.left.replace(e,i,n),this.right);if(e>this.left.length)return this.balanced(this.left,this.right.replace(e-s,i-s,n));let r=[];e>0&&this.decomposeLeft(e,r);let l=r.length;for(let a of n)r.push(a);if(e>0&&Ex(r,l-1),i<this.length){let a=r.length;this.decomposeRight(i,r),Ex(r,a)}return $t.of(r)}decomposeLeft(e,i){let n=this.left.length;if(e<=n)return this.left.decomposeLeft(e,i);i.push(this.left),this.break&&(n++,e>=n&&i.push(null)),e>n&&this.right.decomposeLeft(e-n,i)}decomposeRight(e,i){let n=this.left.length,s=n+this.break;if(e>=s)return this.right.decomposeRight(e-s,i);e<n&&this.left.decomposeRight(e,i),this.break&&e<s&&i.push(null),i.push(this.right)}balanced(e,i){return e.size>2*i.size||i.size>2*e.size?$t.of(this.break?[e,null,i]:[e,i]):(this.left=mc(this.left,e),this.right=mc(this.right,i),this.setHeight(e.height+i.height),this.outdated=e.outdated||i.outdated,this.size=e.size+i.size,this.length=e.length+this.break+i.length,this)}updateHeight(e,i=0,n=!1,s){let{left:r,right:l}=this,a=i+r.length+this.break,o=null;return s&&s.from<=i+r.length&&s.more?o=r=r.updateHeight(e,i,n,s):r.updateHeight(e,i,n),s&&s.from<=a+l.length&&s.more?o=l=l.updateHeight(e,a,n,s):l.updateHeight(e,a,n),o?this.balanced(r,l):(this.height=this.left.height+this.right.height,this.outdated=!1,this)}toString(){return this.left+(this.break?" ":"-")+this.right}};function Ex(t,e){let i,n;t[e]==null&&(i=t[e-1])instanceof Zn&&(n=t[e+1])instanceof Zn&&t.splice(e-1,3,new Zn(i.length+1+n.length))}var _P=5,_p=class t{constructor(e,i){this.pos=e,this.oracle=i,this.nodes=[],this.lineStart=-1,this.lineEnd=-1,this.covering=null,this.writtenTo=e}get isCovered(){return this.covering&&this.nodes[this.nodes.length-1]==this.covering}span(e,i){if(this.lineStart>-1){let n=Math.min(i,this.lineEnd),s=this.nodes[this.nodes.length-1];s instanceof Gt?s.length+=n-this.pos:(n>this.pos||!this.isCovered)&&this.nodes.push(new Gt(n-this.pos,-1)),this.writtenTo=n,i>n&&(this.nodes.push(null),this.writtenTo++,this.lineStart=-1)}this.pos=i}point(e,i,n){if(e<i||n.heightRelevant){let s=n.widget?n.widget.estimatedHeight:0,r=n.widget?n.widget.lineBreaks:0;s<0&&(s=this.oracle.lineHeight);let l=i-e;n.block?this.addBlock(new Oc(l,s,n)):(l||r||s>=_P)&&this.addLineDeco(s,r,l)}else i>e&&this.span(e,i);this.lineEnd>-1&&this.lineEnd<this.pos&&(this.lineEnd=this.oracle.doc.lineAt(this.pos).to)}enterLine(){if(this.lineStart>-1)return;let{from:e,to:i}=this.oracle.doc.lineAt(this.pos);this.lineStart=e,this.lineEnd=i,this.writtenTo<e&&((this.writtenTo<e-1||this.nodes[this.nodes.length-1]==null)&&this.nodes.push(this.blankContent(this.writtenTo,e-1)),this.nodes.push(null)),this.pos>e&&this.nodes.push(new Gt(this.pos-e,-1)),this.writtenTo=this.pos}blankContent(e,i){let n=new Zn(i-e);return this.oracle.doc.lineAt(e).to==i&&(n.flags|=4),n}ensureLine(){this.enterLine();let e=this.nodes.length?this.nodes[this.nodes.length-1]:null;if(e instanceof Gt)return e;let i=new Gt(0,-1);return this.nodes.push(i),i}addBlock(e){this.enterLine();let i=e.deco;i&&i.startSide>0&&!this.isCovered&&this.ensureLine(),this.nodes.push(e),this.writtenTo=this.pos=this.pos+e.length,i&&i.endSide>0&&(this.covering=e)}addLineDeco(e,i,n){let s=this.ensureLine();s.length+=n,s.collapsed+=n,s.widgetHeight=Math.max(s.widgetHeight,e),s.breaks+=i,this.writtenTo=this.pos=this.pos+n}finish(e){let i=this.nodes.length==0?null:this.nodes[this.nodes.length-1];this.lineStart>-1&&!(i instanceof Gt)&&!this.isCovered?this.nodes.push(new Gt(0,-1)):(this.writtenTo<this.pos||i==null)&&this.nodes.push(this.blankContent(this.writtenTo,this.pos));let n=e;for(let s of this.nodes)s instanceof Gt&&s.updateHeight(this.oracle,n),n+=s?s.length:1;return this.nodes}static build(e,i,n,s){let r=new t(n,e);return pe.spans(i,n,s,r,0),r.finish(n)}};function ZP(t,e,i){let n=new Zp;return pe.compare(t,e,i,n,0),n.changes}var Zp=class{constructor(){this.changes=[]}compareRange(){}comparePoint(e,i,n,s){(e<i||n&&n.heightRelevant||s&&s.heightRelevant)&&sc(e,i,this.changes,5)}};function XP(t,e){let i=t.getBoundingClientRect(),n=t.ownerDocument,s=n.defaultView||window,r=Math.max(0,i.left),l=Math.min(s.innerWidth,i.right),a=Math.max(0,i.top),o=Math.min(s.innerHeight,i.bottom);for(let u=t.parentNode;u&&u!=n.body;)if(u.nodeType==1){let c=u,h=window.getComputedStyle(c);if((c.scrollHeight>c.clientHeight||c.scrollWidth>c.clientWidth)&&h.overflow!="visible"){let f=c.getBoundingClientRect();r=Math.max(r,f.left),l=Math.min(l,f.right),a=Math.max(a,f.top),o=Math.min(u==t.parentNode?s.innerHeight:o,f.bottom)}u=h.position=="absolute"||h.position=="fixed"?c.offsetParent:c.parentNode}else if(u.nodeType==11)u=u.host;else break;return{left:r-i.left,right:Math.max(r,l)-i.left,top:a-(i.top+e),bottom:Math.max(a,o)-(i.top+e)}}function DP(t){let e=t.getBoundingClientRect(),i=t.ownerDocument.defaultView||window;return e.left<i.innerWidth&&e.right>0&&e.top<i.innerHeight&&e.bottom>0}function NP(t,e){let i=t.getBoundingClientRect();return{left:0,right:i.right-i.left,top:e,bottom:i.bottom-(i.top+e)}}var Ta=class{constructor(e,i,n,s){this.from=e,this.to=i,this.size=n,this.displaySize=s}static same(e,i){if(e.length!=i.length)return!1;for(let n=0;n<e.length;n++){let s=e[n],r=i[n];if(s.from!=r.from||s.to!=r.to||s.size!=r.size)return!1}return!0}draw(e,i){return ve.replace({widget:new Xp(this.displaySize*(i?e.scaleY:e.scaleX),i)}).range(this.from,this.to)}},Xp=class extends Lr{constructor(e,i){super(),this.size=e,this.vertical=i}eq(e){return e.size==this.size&&e.vertical==this.vertical}toDOM(){let e=document.createElement("div");return this.vertical?e.style.height=this.size+"px":(e.style.width=this.size+"px",e.style.height="2px",e.style.display="inline-block"),e}get estimatedHeight(){return this.vertical?this.size:-1}},gc=class{constructor(e){this.state=e,this.pixelViewport={left:0,right:window.innerWidth,top:0,bottom:0},this.inView=!0,this.paddingTop=0,this.paddingBottom=0,this.contentDOMWidth=0,this.contentDOMHeight=0,this.editorHeight=0,this.editorWidth=0,this.scrollTop=0,this.scrolledToBottom=!1,this.scaleX=1,this.scaleY=1,this.scrollAnchorPos=0,this.scrollAnchorHeight=-1,this.scaler=zx,this.scrollTarget=null,this.printing=!1,this.mustMeasureContent=!0,this.defaultTextDirection=ke.LTR,this.visibleRanges=[],this.mustEnforceCursorAssoc=!1;let i=e.facet(Jp).some(n=>typeof n!="function"&&n.class=="cm-lineWrapping");this.heightOracle=new Mp(i),this.stateDeco=e.facet(za).filter(n=>typeof n!="function"),this.heightMap=$t.empty().applyChanges(this.stateDeco,G.empty,this.heightOracle.setDoc(e.doc),[new Qi(0,0,0,e.doc.length)]);for(let n=0;n<2&&(this.viewport=this.getViewport(0,null),!!this.updateForViewport());n++);this.updateViewportLines(),this.lineGaps=this.ensureLineGaps([]),this.lineGapDeco=ve.set(this.lineGaps.map(n=>n.draw(this,!1))),this.computeVisibleRanges()}updateForViewport(){let e=[this.viewport],{main:i}=this.state.selection;for(let n=0;n<=1;n++){let s=n?i.head:i.anchor;if(!e.some(({from:r,to:l})=>s>=r&&s<=l)){let{from:r,to:l}=this.lineBlockAt(s);e.push(new Yr(r,l))}}return this.viewports=e.sort((n,s)=>n.from-s.from),this.updateScaler()}updateScaler(){let e=this.scaler;return this.scaler=this.heightMap.height<=7e6?zx:new Dp(this.heightOracle,this.heightMap,this.viewports),e.eq(this.scaler)?0:2}updateViewportLines(){this.viewportLines=[],this.heightMap.forEachLine(this.viewport.from,this.viewport.to,this.heightOracle.setDoc(this.state.doc),0,0,e=>{this.viewportLines.push(Sa(e,this.scaler))})}update(e,i=null){this.state=e.state;let n=this.stateDeco;this.stateDeco=this.state.facet(za).filter(c=>typeof c!="function");let s=e.changedRanges,r=Qi.extendWithRanges(s,ZP(n,this.stateDeco,e?e.changes:nt.empty(this.state.doc.length))),l=this.heightMap.height,a=this.scrolledToBottom?null:this.scrollAnchorAt(this.scrollTop);Mx(),this.heightMap=this.heightMap.applyChanges(this.stateDeco,e.startState.doc,this.heightOracle.setDoc(this.state.doc),r),(this.heightMap.height!=l||Vr)&&(e.flags|=2),a?(this.scrollAnchorPos=e.changes.mapPos(a.from,-1),this.scrollAnchorHeight=a.top):(this.scrollAnchorPos=-1,this.scrollAnchorHeight=l);let o=r.length?this.mapViewport(this.viewport,e.changes):this.viewport;(i&&(i.range.head<o.from||i.range.head>o.to)||!this.viewportIsAppropriate(o))&&(o=this.getViewport(0,i));let u=o.from!=this.viewport.from||o.to!=this.viewport.to;this.viewport=o,e.flags|=this.updateForViewport(),(u||!e.changes.empty||e.flags&2)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps,e.changes))),e.flags|=this.computeVisibleRanges(e.changes),i&&(this.scrollTarget=i),!this.mustEnforceCursorAssoc&&e.selectionSet&&e.view.lineWrapping&&e.state.selection.main.empty&&e.state.selection.main.assoc&&!e.state.facet(K2)&&(this.mustEnforceCursorAssoc=!0)}measure(e){let i=e.contentDOM,n=window.getComputedStyle(i),s=this.heightOracle,r=n.whiteSpace;this.defaultTextDirection=n.direction=="rtl"?ke.RTL:ke.LTR;let l=this.heightOracle.mustRefreshForWrapping(r),a=i.getBoundingClientRect(),o=l||this.mustMeasureContent||this.contentDOMHeight!=a.height;this.contentDOMHeight=a.height,this.mustMeasureContent=!1;let u=0,c=0;if(a.width&&a.height){let{scaleX:S,scaleY:k}=Bx(i,a);(S>.005&&Math.abs(this.scaleX-S)>.005||k>.005&&Math.abs(this.scaleY-k)>.005)&&(this.scaleX=S,this.scaleY=k,u|=16,l=o=!0)}let h=(parseInt(n.paddingTop)||0)*this.scaleY,f=(parseInt(n.paddingBottom)||0)*this.scaleY;(this.paddingTop!=h||this.paddingBottom!=f)&&(this.paddingTop=h,this.paddingBottom=f,u|=18),this.editorWidth!=e.scrollDOM.clientWidth&&(s.lineWrapping&&(o=!0),this.editorWidth=e.scrollDOM.clientWidth,u|=16);let d=e.scrollDOM.scrollTop*this.scaleY;this.scrollTop!=d&&(this.scrollAnchorHeight=-1,this.scrollTop=d),this.scrolledToBottom=Vx(e.scrollDOM);let m=(this.printing?NP:XP)(i,this.paddingTop),g=m.top-this.pixelViewport.top,x=m.bottom-this.pixelViewport.bottom;this.pixelViewport=m;let p=this.pixelViewport.bottom>this.pixelViewport.top&&this.pixelViewport.right>this.pixelViewport.left;if(p!=this.inView&&(this.inView=p,p&&(o=!0)),!this.inView&&!this.scrollTarget&&!DP(e.dom))return 0;let O=a.width;if((this.contentDOMWidth!=O||this.editorHeight!=e.scrollDOM.clientHeight)&&(this.contentDOMWidth=a.width,this.editorHeight=e.scrollDOM.clientHeight,u|=16),o){let S=e.docView.measureVisibleLineHeights(this.viewport);if(s.mustRefreshForHeights(S)&&(l=!0),l||s.lineWrapping&&Math.abs(O-this.contentDOMWidth)>s.charWidth){let{lineHeight:k,charWidth:w,textHeight:v}=e.docView.measureTextSize();l=k>0&&s.refresh(r,k,w,v,Math.max(5,O/w),S),l&&(e.docView.minWidth=0,u|=16)}g>0&&x>0?c=Math.max(g,x):g<0&&x<0&&(c=Math.min(g,x)),Mx();for(let k of this.viewports){let w=k.from==this.viewport.from?S:e.docView.measureVisibleLineHeights(k);this.heightMap=(l?$t.empty().applyChanges(this.stateDeco,G.empty,this.heightOracle,[new Qi(0,0,0,e.state.doc.length)]):this.heightMap).updateHeight(s,0,l,new Ep(k.from,w))}Vr&&(u|=2)}let y=!this.viewportIsAppropriate(this.viewport,c)||this.scrollTarget&&(this.scrollTarget.range.head<this.viewport.from||this.scrollTarget.range.head>this.viewport.to);return y&&(u&2&&(u|=this.updateScaler()),this.viewport=this.getViewport(c,this.scrollTarget),u|=this.updateForViewport()),(u&2||y)&&this.updateViewportLines(),(this.lineGaps.length||this.viewport.to-this.viewport.from>4e3)&&this.updateLineGaps(this.ensureLineGaps(l?[]:this.lineGaps,e)),u|=this.computeVisibleRanges(),this.mustEnforceCursorAssoc&&(this.mustEnforceCursorAssoc=!1,e.docView.enforceCursorAssoc()),u}get visibleTop(){return this.scaler.fromDOM(this.pixelViewport.top)}get visibleBottom(){return this.scaler.fromDOM(this.pixelViewport.bottom)}getViewport(e,i){let n=.5-Math.max(-.5,Math.min(.5,e/1e3/2)),s=this.heightMap,r=this.heightOracle,{visibleTop:l,visibleBottom:a}=this,o=new Yr(s.lineAt(l-n*1e3,oe.ByHeight,r,0,0).from,s.lineAt(a+(1-n)*1e3,oe.ByHeight,r,0,0).to);if(i){let{head:u}=i.range;if(u<o.from||u>o.to){let c=Math.min(this.editorHeight,this.pixelViewport.bottom-this.pixelViewport.top),h=s.lineAt(u,oe.ByPos,r,0,0),f;i.y=="center"?f=(h.top+h.bottom)/2-c/2:i.y=="start"||i.y=="nearest"&&u<o.from?f=h.top:f=h.bottom-c,o=new Yr(s.lineAt(f-1e3/2,oe.ByHeight,r,0,0).from,s.lineAt(f+c+1e3/2,oe.ByHeight,r,0,0).to)}}return o}mapViewport(e,i){let n=i.mapPos(e.from,-1),s=i.mapPos(e.to,1);return new Yr(this.heightMap.lineAt(n,oe.ByPos,this.heightOracle,0,0).from,this.heightMap.lineAt(s,oe.ByPos,this.heightOracle,0,0).to)}viewportIsAppropriate({from:e,to:i},n=0){if(!this.inView)return!0;let{top:s}=this.heightMap.lineAt(e,oe.ByPos,this.heightOracle,0,0),{bottom:r}=this.heightMap.lineAt(i,oe.ByPos,this.heightOracle,0,0),{visibleTop:l,visibleBottom:a}=this;return(e==0||s<=l-Math.max(10,Math.min(-n,250)))&&(i==this.state.doc.length||r>=a+Math.max(10,Math.min(n,250)))&&s>l-2*1e3&&r<a+2*1e3}mapLineGaps(e,i){if(!e.length||i.empty)return e;let n=[];for(let s of e)i.touchesRange(s.from,s.to)||n.push(new Ta(i.mapPos(s.from),i.mapPos(s.to),s.size,s.displaySize));return n}ensureLineGaps(e,i){let n=this.heightOracle.lineWrapping,s=n?1e4:2e3,r=s>>1,l=s<<1;if(this.defaultTextDirection!=ke.LTR&&!n)return[];let a=[],o=(c,h,f,d)=>{if(h-c<r)return;let m=this.state.selection.main,g=[m.from];m.empty||g.push(m.to);for(let p of g)if(p>c&&p<h){o(c,p-10,f,d),o(p+10,h,f,d);return}let x=YP(e,p=>p.from>=f.from&&p.to<=f.to&&Math.abs(p.from-c)<r&&Math.abs(p.to-h)<r&&!g.some(O=>p.from<O&&p.to>O));if(!x){if(h<f.to&&i&&n&&i.visibleRanges.some(y=>y.from<=h&&y.to>=h)){let y=i.moveToLineBoundary(A.cursor(h),!1,!0).head;y>c&&(h=y)}let p=this.gapSize(f,c,h,d),O=n||p<2e6?p:2e6;x=new Ta(c,h,p,O)}a.push(x)},u=c=>{if(c.length<l||c.type!=Ut.Text)return;let h=qP(c.from,c.to,this.stateDeco);if(h.total<l)return;let f=this.scrollTarget?this.scrollTarget.range.head:null,d,m;if(n){let g=s/this.heightOracle.lineLength*this.heightOracle.lineHeight,x,p;if(f!=null){let O=ec(h,f),y=((this.visibleBottom-this.visibleTop)/2+g)/c.height;x=O-y,p=O+y}else x=(this.visibleTop-c.top-g)/c.height,p=(this.visibleBottom-c.top+g)/c.height;d=Fu(h,x),m=Fu(h,p)}else{let g=h.total*this.heightOracle.charWidth,x=s*this.heightOracle.charWidth,p=0;if(g>2e6)for(let w of e)w.from>=c.from&&w.from<c.to&&w.size!=w.displaySize&&w.from*this.heightOracle.charWidth+p<this.pixelViewport.left&&(p=w.size-w.displaySize);let O=this.pixelViewport.left+p,y=this.pixelViewport.right+p,S,k;if(f!=null){let w=ec(h,f),v=((y-O)/2+x)/g;S=w-v,k=w+v}else S=(O-x)/g,k=(y+x)/g;d=Fu(h,S),m=Fu(h,k)}d>c.from&&o(c.from,d,c,h),m<c.to&&o(m,c.to,c,h)};for(let c of this.viewportLines)Array.isArray(c.type)?c.type.forEach(u):u(c);return a}gapSize(e,i,n,s){let r=ec(s,n)-ec(s,i);return this.heightOracle.lineWrapping?e.height*r:s.total*this.heightOracle.charWidth*r}updateLineGaps(e){Ta.same(e,this.lineGaps)||(this.lineGaps=e,this.lineGapDeco=ve.set(e.map(i=>i.draw(this,this.heightOracle.lineWrapping))))}computeVisibleRanges(e){let i=this.stateDeco;this.lineGaps.length&&(i=i.concat(this.lineGapDeco));let n=[];pe.spans(i,this.viewport.from,this.viewport.to,{span(r,l){n.push({from:r,to:l})},point(){}},20);let s=0;if(n.length!=this.visibleRanges.length)s=12;else for(let r=0;r<n.length&&!(s&8);r++){let l=this.visibleRanges[r],a=n[r];(l.from!=a.from||l.to!=a.to)&&(s|=4,e&&e.mapPos(l.from,-1)==a.from&&e.mapPos(l.to,1)==a.to||(s|=8))}return this.visibleRanges=n,s}lineBlockAt(e){return e>=this.viewport.from&&e<=this.viewport.to&&this.viewportLines.find(i=>i.from<=e&&i.to>=e)||Sa(this.heightMap.lineAt(e,oe.ByPos,this.heightOracle,0,0),this.scaler)}lineBlockAtHeight(e){return e>=this.viewportLines[0].top&&e<=this.viewportLines[this.viewportLines.length-1].bottom&&this.viewportLines.find(i=>i.top<=e&&i.bottom>=e)||Sa(this.heightMap.lineAt(this.scaler.fromDOM(e),oe.ByHeight,this.heightOracle,0,0),this.scaler)}scrollAnchorAt(e){let i=this.lineBlockAtHeight(e+8);return i.from>=this.viewport.from||this.viewportLines[0].top-e>200?i:this.viewportLines[0]}elementAtHeight(e){return Sa(this.heightMap.blockAt(this.scaler.fromDOM(e),this.heightOracle,0,0),this.scaler)}get docHeight(){return this.scaler.toDOM(this.heightMap.height)}get contentHeight(){return this.docHeight+this.paddingTop+this.paddingBottom}},Yr=class{constructor(e,i){this.from=e,this.to=i}};function qP(t,e,i){let n=[],s=t,r=0;return pe.spans(i,t,e,{span(){},point(l,a){l>s&&(n.push({from:s,to:l}),r+=l-s),s=a}},20),s<e&&(n.push({from:s,to:e}),r+=e-s),{total:r,ranges:n}}function Fu({total:t,ranges:e},i){if(i<=0)return e[0].from;if(i>=1)return e[e.length-1].to;let n=Math.floor(t*i);for(let s=0;;s++){let{from:r,to:l}=e[s],a=l-r;if(n<=a)return r+n;n-=a}}function ec(t,e){let i=0;for(let{from:n,to:s}of t.ranges){if(e<=s){i+=e-n;break}i+=s-n}return i/t.total}function YP(t,e){for(let i of t)if(e(i))return i}var zx={toDOM(t){return t},fromDOM(t){return t},scale:1,eq(t){return t==this}},Dp=class t{constructor(e,i,n){let s=0,r=0,l=0;this.viewports=n.map(({from:a,to:o})=>{let u=i.lineAt(a,oe.ByPos,e,0,0).top,c=i.lineAt(o,oe.ByPos,e,0,0).bottom;return s+=c-u,{from:a,to:o,top:u,bottom:c,domTop:0,domBottom:0}}),this.scale=(7e6-s)/(i.height-s);for(let a of this.viewports)a.domTop=l+(a.top-r)*this.scale,l=a.domBottom=a.domTop+(a.bottom-a.top),r=a.bottom}toDOM(e){for(let i=0,n=0,s=0;;i++){let r=i<this.viewports.length?this.viewports[i]:null;if(!r||e<r.top)return s+(e-n)*this.scale;if(e<=r.bottom)return r.domTop+(e-r.top);n=r.bottom,s=r.domBottom}}fromDOM(e){for(let i=0,n=0,s=0;;i++){let r=i<this.viewports.length?this.viewports[i]:null;if(!r||e<r.domTop)return n+(e-s)/this.scale;if(e<=r.domBottom)return r.top+(e-r.domTop);n=r.bottom,s=r.domBottom}}eq(e){return e instanceof t?this.scale==e.scale&&this.viewports.length==e.viewports.length&&this.viewports.every((i,n)=>i.from==e.viewports[n].from&&i.to==e.viewports[n].to):!1}};function Sa(t,e){if(e.scale==1)return t;let i=e.toDOM(t.top),n=e.toDOM(t.bottom);return new ki(t.from,t.length,i,n-i,Array.isArray(t._content)?t._content.map(s=>Sa(s,e)):t._content)}var tc=E.define({combine:t=>t.join(" ")}),Np=E.define({combine:t=>t.indexOf(!0)>-1}),qp=Vt.newName(),ES=Vt.newName(),zS=Vt.newName(),_S={"&light":"."+ES,"&dark":"."+zS};function Yp(t,e,i){return new Vt(e,{finish(n){return/&/.test(n)?n.replace(/&\w*/,s=>{if(s=="&")return t;if(!i||!i[s])throw new RangeError(`Unsupported selector: ${s}`);return i[s]}):t+" "+n}})}var BP=Yp("."+qp,{"&":{position:"relative !important",boxSizing:"border-box","&.cm-focused":{outline:"1px dotted #212121"},display:"flex !important",flexDirection:"column"},".cm-scroller":{display:"flex !important",alignItems:"flex-start !important",fontFamily:"monospace",lineHeight:1.4,height:"100%",overflowX:"auto",position:"relative",zIndex:0,overflowAnchor:"none"},".cm-content":{margin:0,flexGrow:2,flexShrink:0,display:"block",whiteSpace:"pre",wordWrap:"normal",boxSizing:"border-box",minHeight:"100%",padding:"4px 0",outline:"none","&[contenteditable=true]":{WebkitUserModify:"read-write-plaintext-only"}},".cm-lineWrapping":{whiteSpace_fallback:"pre-wrap",whiteSpace:"break-spaces",wordBreak:"break-word",overflowWrap:"anywhere",flexShrink:1},"&light .cm-content":{caretColor:"black"},"&dark .cm-content":{caretColor:"white"},".cm-line":{display:"block",padding:"0 2px 0 6px"},".cm-layer":{position:"absolute",left:0,top:0,contain:"size style","& > *":{position:"absolute"}},"&light .cm-selectionBackground":{background:"#d9d9d9"},"&dark .cm-selectionBackground":{background:"#222"},"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#d7d4f0"},"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"#233"},".cm-cursorLayer":{pointerEvents:"none"},"&.cm-focused > .cm-scroller > .cm-cursorLayer":{animation:"steps(1) cm-blink 1.2s infinite"},"@keyframes cm-blink":{"0%":{},"50%":{opacity:0},"100%":{}},"@keyframes cm-blink2":{"0%":{},"50%":{opacity:0},"100%":{}},".cm-cursor, .cm-dropCursor":{borderLeft:"1.2px solid black",marginLeft:"-0.6px",pointerEvents:"none"},".cm-cursor":{display:"none"},"&dark .cm-cursor":{borderLeftColor:"#ddd"},".cm-dropCursor":{position:"absolute"},"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor":{display:"block"},".cm-iso":{unicodeBidi:"isolate"},".cm-announced":{position:"fixed",top:"-10000px"},"@media print":{".cm-announced":{display:"none"}},"&light .cm-activeLine":{backgroundColor:"#cceeff44"},"&dark .cm-activeLine":{backgroundColor:"#99eeff33"},"&light .cm-specialChar":{color:"red"},"&dark .cm-specialChar":{color:"#f78"},".cm-gutters":{flexShrink:0,display:"flex",height:"100%",boxSizing:"border-box",zIndex:200},".cm-gutters-before":{insetInlineStart:0},".cm-gutters-after":{insetInlineEnd:0},"&light .cm-gutters":{backgroundColor:"#f5f5f5",color:"#6c6c6c",border:"0px solid #ddd","&.cm-gutters-before":{borderRightWidth:"1px"},"&.cm-gutters-after":{borderLeftWidth:"1px"}},"&dark .cm-gutters":{backgroundColor:"#333338",color:"#ccc"},".cm-gutter":{display:"flex !important",flexDirection:"column",flexShrink:0,boxSizing:"border-box",minHeight:"100%",overflow:"hidden"},".cm-gutterElement":{boxSizing:"border-box"},".cm-lineNumbers .cm-gutterElement":{padding:"0 3px 0 5px",minWidth:"20px",textAlign:"right",whiteSpace:"nowrap"},"&light .cm-activeLineGutter":{backgroundColor:"#e2f2ff"},"&dark .cm-activeLineGutter":{backgroundColor:"#222227"},".cm-panels":{boxSizing:"border-box",position:"sticky",left:0,right:0,zIndex:300},"&light .cm-panels":{backgroundColor:"#f5f5f5",color:"black"},"&light .cm-panels-top":{borderBottom:"1px solid #ddd"},"&light .cm-panels-bottom":{borderTop:"1px solid #ddd"},"&dark .cm-panels":{backgroundColor:"#333338",color:"white"},".cm-dialog":{padding:"2px 19px 4px 6px",position:"relative","& label":{fontSize:"80%"}},".cm-dialog-close":{position:"absolute",top:"3px",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",fontSize:"14px",padding:"0"},".cm-tab":{display:"inline-block",overflow:"hidden",verticalAlign:"bottom"},".cm-widgetBuffer":{verticalAlign:"text-top",height:"1em",width:0,display:"inline"},".cm-placeholder":{color:"#888",display:"inline-block",verticalAlign:"top",userSelect:"none"},".cm-highlightSpace":{backgroundImage:"radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",backgroundPosition:"center"},".cm-highlightTab":{backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,backgroundSize:"auto 100%",backgroundPosition:"right 90%",backgroundRepeat:"no-repeat"},".cm-trailingSpace":{backgroundColor:"#ff332255"},".cm-button":{verticalAlign:"middle",color:"inherit",fontSize:"70%",padding:".2em 1em",borderRadius:"1px"},"&light .cm-button":{backgroundImage:"linear-gradient(#eff1f5, #d9d9df)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#b4b4b4, #d0d3d6)"}},"&dark .cm-button":{backgroundImage:"linear-gradient(#393939, #111)",border:"1px solid #888","&:active":{backgroundImage:"linear-gradient(#111, #333)"}},".cm-textfield":{verticalAlign:"middle",color:"inherit",fontSize:"70%",border:"1px solid silver",padding:".2em .5em"},"&light .cm-textfield":{backgroundColor:"white"},"&dark .cm-textfield":{border:"1px solid #555",backgroundColor:"inherit"}},_S),jP={childList:!0,characterData:!0,subtree:!0,attributes:!0,characterDataOldValue:!0},fp=R.ie&&R.ie_version<=11,Bp=class{constructor(e){this.view=e,this.active=!1,this.editContext=null,this.selectionRange=new Op,this.selectionChanged=!1,this.delayedFlush=-1,this.resizeTimeout=-1,this.queue=[],this.delayedAndroidKey=null,this.flushingAndroidKey=-1,this.lastChange=0,this.scrollTargets=[],this.intersection=null,this.resizeScroll=null,this.intersecting=!1,this.gapIntersection=null,this.gaps=[],this.printQuery=null,this.parentCheck=-1,this.dom=e.contentDOM,this.observer=new MutationObserver(i=>{for(let n of i)this.queue.push(n);(R.ie&&R.ie_version<=11||R.ios&&e.composing)&&i.some(n=>n.type=="childList"&&n.removedNodes.length||n.type=="characterData"&&n.oldValue.length>n.target.nodeValue.length)?this.flushSoon():this.flush()}),window.EditContext&&R.android&&e.constructor.EDIT_CONTEXT!==!1&&!(R.chrome&&R.chrome_version<126)&&(this.editContext=new jp(e),e.state.facet(tn)&&(e.contentDOM.editContext=this.editContext.editContext)),fp&&(this.onCharData=i=>{this.queue.push({target:i.target,type:"characterData",oldValue:i.prevValue}),this.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this),this.onResize=this.onResize.bind(this),this.onPrint=this.onPrint.bind(this),this.onScroll=this.onScroll.bind(this),window.matchMedia&&(this.printQuery=window.matchMedia("print")),typeof ResizeObserver=="function"&&(this.resizeScroll=new ResizeObserver(()=>{var i;((i=this.view.docView)===null||i===void 0?void 0:i.lastUpdate)<Date.now()-75&&this.onResize()}),this.resizeScroll.observe(e.scrollDOM)),this.addWindowListeners(this.win=e.win),this.start(),typeof IntersectionObserver=="function"&&(this.intersection=new IntersectionObserver(i=>{this.parentCheck<0&&(this.parentCheck=setTimeout(this.listenForScroll.bind(this),1e3)),i.length>0&&i[i.length-1].intersectionRatio>0!=this.intersecting&&(this.intersecting=!this.intersecting,this.intersecting!=this.view.inView&&this.onScrollChanged(document.createEvent("Event")))},{threshold:[0,.001]}),this.intersection.observe(this.dom),this.gapIntersection=new IntersectionObserver(i=>{i.length>0&&i[i.length-1].intersectionRatio>0&&this.onScrollChanged(document.createEvent("Event"))},{})),this.listenForScroll(),this.readSelectionRange()}onScrollChanged(e){this.view.inputState.runHandlers("scroll",e),this.intersecting&&this.view.measure()}onScroll(e){this.intersecting&&this.flush(!1),this.editContext&&this.view.requestMeasure(this.editContext.measureReq),this.onScrollChanged(e)}onResize(){this.resizeTimeout<0&&(this.resizeTimeout=setTimeout(()=>{this.resizeTimeout=-1,this.view.requestMeasure()},50))}onPrint(e){(e.type=="change"||!e.type)&&!e.matches||(this.view.viewState.printing=!0,this.view.measure(),setTimeout(()=>{this.view.viewState.printing=!1,this.view.requestMeasure()},500))}updateGaps(e){if(this.gapIntersection&&(e.length!=this.gaps.length||this.gaps.some((i,n)=>i!=e[n]))){this.gapIntersection.disconnect();for(let i of e)this.gapIntersection.observe(i);this.gaps=e}}onSelectionChange(e){let i=this.selectionChanged;if(!this.readSelectionRange()||this.delayedAndroidKey)return;let{view:n}=this,s=this.selectionRange;if(n.state.facet(tn)?n.root.activeElement!=this.dom:!nc(this.dom,s))return;let r=s.anchorNode&&n.docView.nearest(s.anchorNode);if(r&&r.ignoreEvent(e)){i||(this.selectionChanged=!1);return}(R.ie&&R.ie_version<=11||R.android&&R.chrome)&&!n.state.selection.main.empty&&s.focusNode&&ka(s.focusNode,s.focusOffset,s.anchorNode,s.anchorOffset)?this.flushSoon():this.flush(!1)}readSelectionRange(){let{view:e}=this,i=$a(e.root);if(!i)return!1;let n=R.safari&&e.root.nodeType==11&&e.root.activeElement==this.dom&&LP(this.view,i)||i;if(!n||this.selectionRange.eq(n))return!1;let s=nc(this.dom,n);return s&&!this.selectionChanged&&e.inputState.lastFocusTime>Date.now()-200&&e.inputState.lastTouchTime<Date.now()-300&&_2(this.dom,n)?(this.view.inputState.lastFocusTime=0,e.docView.updateSelection(),!1):(this.selectionRange.setRange(n),s&&(this.selectionChanged=!0),!0)}setSelectionRange(e,i){this.selectionRange.set(e.node,e.offset,i.node,i.offset),this.selectionChanged=!1}clearSelectionRange(){this.selectionRange.set(null,0,null,0)}listenForScroll(){this.parentCheck=-1;let e=0,i=null;for(let n=this.dom;n;)if(n.nodeType==1)!i&&e<this.scrollTargets.length&&this.scrollTargets[e]==n?e++:i||(i=this.scrollTargets.slice(0,e)),i&&i.push(n),n=n.assignedSlot||n.parentNode;else if(n.nodeType==11)n=n.host;else break;if(e<this.scrollTargets.length&&!i&&(i=this.scrollTargets.slice(0,e)),i){for(let n of this.scrollTargets)n.removeEventListener("scroll",this.onScroll);for(let n of this.scrollTargets=i)n.addEventListener("scroll",this.onScroll)}}ignore(e){if(!this.active)return e();try{return this.stop(),e()}finally{this.start(),this.clear()}}start(){this.active||(this.observer.observe(this.dom,jP),fp&&this.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.active=!0)}stop(){this.active&&(this.active=!1,this.observer.disconnect(),fp&&this.dom.removeEventListener("DOMCharacterDataModified",this.onCharData))}clear(){this.processRecords(),this.queue.length=0,this.selectionChanged=!1}delayAndroidKey(e,i){var n;if(!this.delayedAndroidKey){let s=()=>{let r=this.delayedAndroidKey;r&&(this.clearDelayedAndroidKey(),this.view.inputState.lastKeyCode=r.keyCode,this.view.inputState.lastKeyTime=Date.now(),!this.flush()&&r.force&&jr(this.dom,r.key,r.keyCode))};this.flushingAndroidKey=this.view.win.requestAnimationFrame(s)}(!this.delayedAndroidKey||e=="Enter")&&(this.delayedAndroidKey={key:e,keyCode:i,force:this.lastChange<Date.now()-50||!!(!((n=this.delayedAndroidKey)===null||n===void 0)&&n.force)})}clearDelayedAndroidKey(){this.win.cancelAnimationFrame(this.flushingAndroidKey),this.delayedAndroidKey=null,this.flushingAndroidKey=-1}flushSoon(){this.delayedFlush<0&&(this.delayedFlush=this.view.win.requestAnimationFrame(()=>{this.delayedFlush=-1,this.flush()}))}forceFlush(){this.delayedFlush>=0&&(this.view.win.cancelAnimationFrame(this.delayedFlush),this.delayedFlush=-1),this.flush()}pendingRecords(){for(let e of this.observer.takeRecords())this.queue.push(e);return this.queue}processRecords(){let e=this.pendingRecords();e.length&&(this.queue=[]);let i=-1,n=-1,s=!1;for(let r of e){let l=this.readMutation(r);l&&(l.typeOver&&(s=!0),i==-1?{from:i,to:n}=l:(i=Math.min(l.from,i),n=Math.max(l.to,n)))}return{from:i,to:n,typeOver:s}}readChange(){let{from:e,to:i,typeOver:n}=this.processRecords(),s=this.selectionChanged&&nc(this.dom,this.selectionRange);if(e<0&&!s)return null;e>-1&&(this.lastChange=Date.now()),this.view.inputState.lastFocusTime=0,this.selectionChanged=!1;let r=new $p(this.view,e,i,n);return this.view.docView.domChanged={newSel:r.newSel?r.newSel.main:null},r}flush(e=!0){if(this.delayedFlush>=0||this.delayedAndroidKey)return!1;e&&this.readSelectionRange();let i=this.readChange();if(!i)return this.view.requestMeasure(),!1;let n=this.view.state,s=QS(this.view,i);return this.view.state==n&&(i.domChanged||i.newSel&&!i.newSel.main.eq(this.view.state.selection.main))&&this.view.update([]),s}readMutation(e){let i=this.view.docView.nearest(e.target);if(!i||i.ignoreMutation(e))return null;if(i.markDirty(e.type=="attributes"),e.type=="attributes"&&(i.flags|=4),e.type=="childList"){let n=_x(i,e.previousSibling||e.target.previousSibling,-1),s=_x(i,e.nextSibling||e.target.nextSibling,1);return{from:n?i.posAfter(n):i.posAtStart,to:s?i.posBefore(s):i.posAtEnd,typeOver:!1}}else return e.type=="characterData"?{from:i.posAtStart,to:i.posAtEnd,typeOver:e.target.nodeValue==e.oldValue}:null}setWindow(e){e!=this.win&&(this.removeWindowListeners(this.win),this.win=e,this.addWindowListeners(this.win))}addWindowListeners(e){e.addEventListener("resize",this.onResize),this.printQuery?this.printQuery.addEventListener?this.printQuery.addEventListener("change",this.onPrint):this.printQuery.addListener(this.onPrint):e.addEventListener("beforeprint",this.onPrint),e.addEventListener("scroll",this.onScroll),e.document.addEventListener("selectionchange",this.onSelectionChange)}removeWindowListeners(e){e.removeEventListener("scroll",this.onScroll),e.removeEventListener("resize",this.onResize),this.printQuery?this.printQuery.removeEventListener?this.printQuery.removeEventListener("change",this.onPrint):this.printQuery.removeListener(this.onPrint):e.removeEventListener("beforeprint",this.onPrint),e.document.removeEventListener("selectionchange",this.onSelectionChange)}update(e){this.editContext&&(this.editContext.update(e),e.startState.facet(tn)!=e.state.facet(tn)&&(e.view.contentDOM.editContext=e.state.facet(tn)?this.editContext.editContext:null))}destroy(){var e,i,n;this.stop(),(e=this.intersection)===null||e===void 0||e.disconnect(),(i=this.gapIntersection)===null||i===void 0||i.disconnect(),(n=this.resizeScroll)===null||n===void 0||n.disconnect();for(let s of this.scrollTargets)s.removeEventListener("scroll",this.onScroll);this.removeWindowListeners(this.win),clearTimeout(this.parentCheck),clearTimeout(this.resizeTimeout),this.win.cancelAnimationFrame(this.delayedFlush),this.win.cancelAnimationFrame(this.flushingAndroidKey),this.editContext&&(this.view.contentDOM.editContext=null,this.editContext.destroy())}};function _x(t,e,i){for(;e;){let n=se.get(e);if(n&&n.parent==t)return n;let s=e.parentNode;e=s!=t.dom?s:i>0?e.nextSibling:e.previousSibling}return null}function Zx(t,e){let i=e.startContainer,n=e.startOffset,s=e.endContainer,r=e.endOffset,l=t.docView.domAtPos(t.state.selection.main.anchor);return ka(l.node,l.offset,s,r)&&([i,n,s,r]=[s,r,i,n]),{anchorNode:i,anchorOffset:n,focusNode:s,focusOffset:r}}function LP(t,e){if(e.getComposedRanges){let s=e.getComposedRanges(t.root)[0];if(s)return Zx(t,s)}let i=null;function n(s){s.preventDefault(),s.stopImmediatePropagation(),i=s.getTargetRanges()[0]}return t.contentDOM.addEventListener("beforeinput",n,!0),t.dom.ownerDocument.execCommand("indent"),t.contentDOM.removeEventListener("beforeinput",n,!0),i?Zx(t,i):null}var jp=class{constructor(e){this.from=0,this.to=0,this.pendingContextChange=null,this.handlers=Object.create(null),this.composing=null,this.resetRange(e.state);let i=this.editContext=new window.EditContext({text:e.state.doc.sliceString(this.from,this.to),selectionStart:this.toContextPos(Math.max(this.from,Math.min(this.to,e.state.selection.main.anchor))),selectionEnd:this.toContextPos(e.state.selection.main.head)});this.handlers.textupdate=n=>{let s=e.state.selection.main,{anchor:r,head:l}=s,a=this.toEditorPos(n.updateRangeStart),o=this.toEditorPos(n.updateRangeEnd);e.inputState.composing>=0&&!this.composing&&(this.composing={contextBase:n.updateRangeStart,editorBase:a,drifted:!1});let u={from:a,to:o,insert:G.of(n.text.split(`
`))};if(u.from==this.from&&r<this.from?u.from=r:u.to==this.to&&r>this.to&&(u.to=r),u.from==u.to&&!u.insert.length){let c=A.single(this.toEditorPos(n.selectionStart),this.toEditorPos(n.selectionEnd));c.main.eq(s)||e.dispatch({selection:c,userEvent:"select"});return}if((R.mac||R.android)&&u.from==l-1&&/^\. ?$/.test(n.text)&&e.contentDOM.getAttribute("autocorrect")=="off"&&(u={from:a,to:o,insert:G.of([n.text.replace("."," ")])}),this.pendingContextChange=u,!e.state.readOnly){let c=this.to-this.from+(u.to-u.from+u.insert.length);Fp(e,u,A.single(this.toEditorPos(n.selectionStart,c),this.toEditorPos(n.selectionEnd,c)))}this.pendingContextChange&&(this.revertPending(e.state),this.setSelection(e.state))},this.handlers.characterboundsupdate=n=>{let s=[],r=null;for(let l=this.toEditorPos(n.rangeStart),a=this.toEditorPos(n.rangeEnd);l<a;l++){let o=e.coordsForChar(l);r=o&&new DOMRect(o.left,o.top,o.right-o.left,o.bottom-o.top)||r||new DOMRect,s.push(r)}i.updateCharacterBounds(n.rangeStart,s)},this.handlers.textformatupdate=n=>{let s=[];for(let r of n.getTextFormats()){let l=r.underlineStyle,a=r.underlineThickness;if(l!="None"&&a!="None"){let o=this.toEditorPos(r.rangeStart),u=this.toEditorPos(r.rangeEnd);if(o<u){let c=`text-decoration: underline ${l=="Dashed"?"dashed ":l=="Squiggle"?"wavy ":""}${a=="Thin"?1:2}px`;s.push(ve.mark({attributes:{style:c}}).range(o,u))}}}e.dispatch({effects:mS.of(ve.set(s))})},this.handlers.compositionstart=()=>{e.inputState.composing<0&&(e.inputState.composing=0,e.inputState.compositionFirstChange=!0)},this.handlers.compositionend=()=>{if(e.inputState.composing=-1,e.inputState.compositionFirstChange=null,this.composing){let{drifted:n}=this.composing;this.composing=null,n&&this.reset(e.state)}};for(let n in this.handlers)i.addEventListener(n,this.handlers[n]);this.measureReq={read:n=>{this.editContext.updateControlBounds(n.contentDOM.getBoundingClientRect());let s=$a(n.root);s&&s.rangeCount&&this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect())}}}applyEdits(e){let i=0,n=!1,s=this.pendingContextChange;return e.changes.iterChanges((r,l,a,o,u)=>{if(n)return;let c=u.length-(l-r);if(s&&l>=s.to)if(s.from==r&&s.to==l&&s.insert.eq(u)){s=this.pendingContextChange=null,i+=c,this.to+=c;return}else s=null,this.revertPending(e.state);if(r+=i,l+=i,l<=this.from)this.from+=c,this.to+=c;else if(r<this.to){if(r<this.from||l>this.to||this.to-this.from+u.length>3e4){n=!0;return}this.editContext.updateText(this.toContextPos(r),this.toContextPos(l),u.toString()),this.to+=c}i+=c}),s&&!n&&this.revertPending(e.state),!n}update(e){let i=this.pendingContextChange,n=e.startState.selection.main;this.composing&&(this.composing.drifted||!e.changes.touchesRange(n.from,n.to)&&e.transactions.some(s=>!s.isUserEvent("input.type")&&s.changes.touchesRange(this.from,this.to)))?(this.composing.drifted=!0,this.composing.editorBase=e.changes.mapPos(this.composing.editorBase)):!this.applyEdits(e)||!this.rangeIsValid(e.state)?(this.pendingContextChange=null,this.reset(e.state)):(e.docChanged||e.selectionSet||i)&&this.setSelection(e.state),(e.geometryChanged||e.docChanged||e.selectionSet)&&e.view.requestMeasure(this.measureReq)}resetRange(e){let{head:i}=e.selection.main;this.from=Math.max(0,i-1e4),this.to=Math.min(e.doc.length,i+1e4)}reset(e){this.resetRange(e),this.editContext.updateText(0,this.editContext.text.length,e.doc.sliceString(this.from,this.to)),this.setSelection(e)}revertPending(e){let i=this.pendingContextChange;this.pendingContextChange=null,this.editContext.updateText(this.toContextPos(i.from),this.toContextPos(i.from+i.insert.length),e.doc.sliceString(i.from,i.to))}setSelection(e){let{main:i}=e.selection,n=this.toContextPos(Math.max(this.from,Math.min(this.to,i.anchor))),s=this.toContextPos(i.head);(this.editContext.selectionStart!=n||this.editContext.selectionEnd!=s)&&this.editContext.updateSelection(n,s)}rangeIsValid(e){let{head:i}=e.selection.main;return!(this.from>0&&i-this.from<500||this.to<e.doc.length&&this.to-i<500||this.to-this.from>1e4*3)}toEditorPos(e,i=this.to-this.from){e=Math.min(e,i);let n=this.composing;return n&&n.drifted?n.editorBase+(e-n.contextBase):e+this.from}toContextPos(e){let i=this.composing;return i&&i.drifted?i.contextBase+(e-i.editorBase):e-this.from}destroy(){for(let e in this.handlers)this.editContext.removeEventListener(e,this.handlers[e])}},D=class t{get state(){return this.viewState.state}get viewport(){return this.viewState.viewport}get visibleRanges(){return this.viewState.visibleRanges}get inView(){return this.viewState.inView}get composing(){return!!this.inputState&&this.inputState.composing>0}get compositionStarted(){return!!this.inputState&&this.inputState.composing>=0}get root(){return this._root}get win(){return this.dom.ownerDocument.defaultView||window}constructor(e={}){var i;this.plugins=[],this.pluginMap=new Map,this.editorAttrs={},this.contentAttrs={},this.bidiCache=[],this.destroyed=!1,this.updateState=2,this.measureScheduled=-1,this.measureRequests=[],this.contentDOM=document.createElement("div"),this.scrollDOM=document.createElement("div"),this.scrollDOM.tabIndex=-1,this.scrollDOM.className="cm-scroller",this.scrollDOM.appendChild(this.contentDOM),this.announceDOM=document.createElement("div"),this.announceDOM.className="cm-announced",this.announceDOM.setAttribute("aria-live","polite"),this.dom=document.createElement("div"),this.dom.appendChild(this.announceDOM),this.dom.appendChild(this.scrollDOM),e.parent&&e.parent.appendChild(this.dom);let{dispatch:n}=e;this.dispatchTransactions=e.dispatchTransactions||n&&(s=>s.forEach(r=>n(r,this)))||(s=>this.update(s)),this.dispatch=this.dispatch.bind(this),this._root=e.root||z2(e.parent)||document,this.viewState=new gc(e.state||be.create(e)),e.scrollTo&&e.scrollTo.is(Hu)&&(this.viewState.scrollTarget=e.scrollTo.value.clip(this.viewState.state)),this.plugins=this.state.facet(qr).map(s=>new wa(s));for(let s of this.plugins)s.update(this);this.observer=new Bp(this),this.inputState=new Ap(this),this.inputState.ensureHandlers(this.plugins),this.docView=new dc(this),this.mountStyles(),this.updateAttrs(),this.updateState=0,this.requestMeasure(),!((i=document.fonts)===null||i===void 0)&&i.ready&&document.fonts.ready.then(()=>this.requestMeasure())}dispatch(...e){let i=e.length==1&&e[0]instanceof Ze?e:e.length==1&&Array.isArray(e[0])?e[0]:[this.state.update(...e)];this.dispatchTransactions(i,this)}update(e){if(this.updateState!=0)throw new Error("Calls to EditorView.update are not allowed while an update is in progress");let i=!1,n=!1,s,r=this.state;for(let f of e){if(f.startState!=r)throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");r=f.state}if(this.destroyed){this.viewState.state=r;return}let l=this.hasFocus,a=0,o=null;e.some(f=>f.annotation(RS))?(this.inputState.notifiedFocused=l,a=1):l!=this.inputState.notifiedFocused&&(this.inputState.notifiedFocused=l,o=CS(r,l),o||(a=1));let u=this.observer.delayedAndroidKey,c=null;if(u?(this.observer.clearDelayedAndroidKey(),c=this.observer.readChange(),(c&&!this.state.doc.eq(r.doc)||!this.state.selection.eq(r.selection))&&(c=null)):this.observer.clear(),r.facet(be.phrases)!=this.state.facet(be.phrases))return this.setState(r);s=fc.create(this,r,e),s.flags|=a;let h=this.viewState.scrollTarget;try{this.updateState=2;for(let f of e){if(h&&(h=h.map(f.changes)),f.scrollIntoView){let{main:d}=f.state.selection;h=new Qa(d.empty?d:A.cursor(d.head,d.head>d.anchor?-1:1))}for(let d of f.effects)d.is(Hu)&&(h=d.value.clip(this.state))}this.viewState.update(s,h),this.bidiCache=yc.update(this.bidiCache,s.changes),s.empty||(this.updatePlugins(s),this.inputState.update(s)),i=this.docView.update(s),this.state.facet(ba)!=this.styleModules&&this.mountStyles(),n=this.updateAttrs(),this.showAnnouncements(e),this.docView.updateSelection(i,e.some(f=>f.isUserEvent("select.pointer")))}finally{this.updateState=0}if(s.startState.facet(tc)!=s.state.facet(tc)&&(this.viewState.mustMeasureContent=!0),(i||n||h||this.viewState.mustEnforceCursorAssoc||this.viewState.mustMeasureContent)&&this.requestMeasure(),i&&this.docViewUpdate(),!s.empty)for(let f of this.state.facet(wp))try{f(s)}catch(d){ri(this.state,d,"update listener")}(o||c)&&Promise.resolve().then(()=>{o&&this.state==o.startState&&this.dispatch(o),c&&!QS(this,c)&&u.force&&jr(this.contentDOM,u.key,u.keyCode)})}setState(e){if(this.updateState!=0)throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");if(this.destroyed){this.viewState.state=e;return}this.updateState=2;let i=this.hasFocus;try{for(let n of this.plugins)n.destroy(this);this.viewState=new gc(e),this.plugins=e.facet(qr).map(n=>new wa(n)),this.pluginMap.clear();for(let n of this.plugins)n.update(this);this.docView.destroy(),this.docView=new dc(this),this.inputState.ensureHandlers(this.plugins),this.mountStyles(),this.updateAttrs(),this.bidiCache=[]}finally{this.updateState=0}i&&this.focus(),this.requestMeasure()}updatePlugins(e){let i=e.startState.facet(qr),n=e.state.facet(qr);if(i!=n){let s=[];for(let r of n){let l=i.indexOf(r);if(l<0)s.push(new wa(r));else{let a=this.plugins[l];a.mustUpdate=e,s.push(a)}}for(let r of this.plugins)r.mustUpdate!=e&&r.destroy(this);this.plugins=s,this.pluginMap.clear()}else for(let s of this.plugins)s.mustUpdate=e;for(let s=0;s<this.plugins.length;s++)this.plugins[s].update(this);i!=n&&this.inputState.ensureHandlers(this.plugins)}docViewUpdate(){for(let e of this.plugins){let i=e.value;if(i&&i.docViewUpdate)try{i.docViewUpdate(this)}catch(n){ri(this.state,n,"doc view update listener")}}}measure(e=!0){if(this.destroyed)return;if(this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.observer.delayedAndroidKey){this.measureScheduled=-1,this.requestMeasure();return}this.measureScheduled=0,e&&this.observer.forceFlush();let i=null,n=this.scrollDOM,s=n.scrollTop*this.scaleY,{scrollAnchorPos:r,scrollAnchorHeight:l}=this.viewState;Math.abs(s-this.viewState.scrollTop)>1&&(l=-1),this.viewState.scrollAnchorHeight=-1;try{for(let a=0;;a++){if(l<0)if(Vx(n))r=-1,l=this.viewState.heightMap.height;else{let d=this.viewState.scrollAnchorAt(s);r=d.from,l=d.top}this.updateState=1;let o=this.viewState.measure(this);if(!o&&!this.measureRequests.length&&this.viewState.scrollTarget==null)break;if(a>5){console.warn(this.measureRequests.length?"Measure loop restarted more than 5 times":"Viewport failed to stabilize");break}let u=[];o&4||([this.measureRequests,u]=[u,this.measureRequests]);let c=u.map(d=>{try{return d.read(this)}catch(m){return ri(this.state,m),Xx}}),h=fc.create(this,this.state,[]),f=!1;h.flags|=o,i?i.flags|=o:i=h,this.updateState=2,h.empty||(this.updatePlugins(h),this.inputState.update(h),this.updateAttrs(),f=this.docView.update(h),f&&this.docViewUpdate());for(let d=0;d<u.length;d++)if(c[d]!=Xx)try{let m=u[d];m.write&&m.write(c[d],this)}catch(m){ri(this.state,m)}if(f&&this.docView.updateSelection(!0),!h.viewportChanged&&this.measureRequests.length==0){if(this.viewState.editorHeight)if(this.viewState.scrollTarget){this.docView.scrollIntoView(this.viewState.scrollTarget),this.viewState.scrollTarget=null,l=-1;continue}else{let m=(r<0?this.viewState.heightMap.height:this.viewState.lineBlockAt(r).top)-l;if(m>1||m<-1){s=s+m,n.scrollTop=s/this.scaleY,l=-1;continue}}break}}}finally{this.updateState=0,this.measureScheduled=-1}if(i&&!i.empty)for(let a of this.state.facet(wp))a(i)}get themeClasses(){return qp+" "+(this.state.facet(Np)?zS:ES)+" "+this.state.facet(tc)}updateAttrs(){let e=Dx(this,OS,{class:"cm-editor"+(this.hasFocus?" cm-focused ":" ")+this.themeClasses}),i={spellcheck:"false",autocorrect:"off",autocapitalize:"off",writingsuggestions:"false",translate:"no",contenteditable:this.state.facet(tn)?"true":"false",class:"cm-content",style:`${R.tabSize}: ${this.state.tabSize}`,role:"textbox","aria-multiline":"true"};this.state.readOnly&&(i["aria-readonly"]="true"),Dx(this,Jp,i);let n=this.observer.ignore(()=>{let s=Sp(this.contentDOM,this.contentAttrs,i),r=Sp(this.dom,this.editorAttrs,e);return s||r});return this.editorAttrs=e,this.contentAttrs=i,n}showAnnouncements(e){let i=!0;for(let n of e)for(let s of n.effects)if(s.is(t.announce)){i&&(this.announceDOM.textContent=""),i=!1;let r=this.announceDOM.appendChild(document.createElement("div"));r.textContent=s.value}}mountStyles(){this.styleModules=this.state.facet(ba);let e=this.state.facet(t.cspNonce);Vt.mount(this.root,this.styleModules.concat(BP).reverse(),e?{nonce:e}:void 0)}readMeasured(){if(this.updateState==2)throw new Error("Reading the editor layout isn't allowed during an update");this.updateState==0&&this.measureScheduled>-1&&this.measure(!1)}requestMeasure(e){if(this.measureScheduled<0&&(this.measureScheduled=this.win.requestAnimationFrame(()=>this.measure())),e){if(this.measureRequests.indexOf(e)>-1)return;if(e.key!=null){for(let i=0;i<this.measureRequests.length;i++)if(this.measureRequests[i].key===e.key){this.measureRequests[i]=e;return}}this.measureRequests.push(e)}}plugin(e){let i=this.pluginMap.get(e);return(i===void 0||i&&i.plugin!=e)&&this.pluginMap.set(e,i=this.plugins.find(n=>n.plugin==e)||null),i&&i.update(this).value}get documentTop(){return this.contentDOM.getBoundingClientRect().top+this.viewState.paddingTop}get documentPadding(){return{top:this.viewState.paddingTop,bottom:this.viewState.paddingBottom}}get scaleX(){return this.viewState.scaleX}get scaleY(){return this.viewState.scaleY}elementAtHeight(e){return this.readMeasured(),this.viewState.elementAtHeight(e)}lineBlockAtHeight(e){return this.readMeasured(),this.viewState.lineBlockAtHeight(e)}get viewportLineBlocks(){return this.viewState.viewportLines}lineBlockAt(e){return this.viewState.lineBlockAt(e)}get contentHeight(){return this.viewState.contentHeight}moveByChar(e,i,n){return hp(this,e,Sx(this,e,i,n))}moveByGroup(e,i){return hp(this,e,Sx(this,e,i,n=>dP(this,e.head,n)))}visualLineSide(e,i){let n=this.bidiSpans(e),s=this.textDirectionAt(e.from),r=n[i?n.length-1:0];return A.cursor(r.side(i,s)+e.from,r.forward(!i,s)?1:-1)}moveToLineBoundary(e,i,n=!0){return fP(this,e,i,n)}moveVertically(e,i,n){return hp(this,e,pP(this,e,i,n))}domAtPos(e){return this.docView.domAtPos(e)}posAtDOM(e,i=0){return this.docView.posFromDOM(e,i)}posAtCoords(e,i=!0){return this.readMeasured(),kS(this,e,i)}coordsAtPos(e,i=1){this.readMeasured();let n=this.docView.coordsAt(e,i);if(!n||n.left==n.right)return n;let s=this.state.doc.lineAt(e),r=this.bidiSpans(s),l=r[vi.find(r,e-s.from,-1,i)];return Sc(n,l.dir==ke.LTR==i>0)}coordsForChar(e){return this.readMeasured(),this.docView.coordsForChar(e)}get defaultCharacterWidth(){return this.viewState.heightOracle.charWidth}get defaultLineHeight(){return this.viewState.heightOracle.lineHeight}get textDirection(){return this.viewState.defaultTextDirection}textDirectionAt(e){return!this.state.facet(dS)||e<this.viewport.from||e>this.viewport.to?this.textDirection:(this.readMeasured(),this.docView.textDirectionAt(e))}get lineWrapping(){return this.viewState.heightOracle.lineWrapping}bidiSpans(e){if(e.length>VP)return rS(e.length);let i=this.textDirectionAt(e.from),n;for(let r of this.bidiCache)if(r.from==e.from&&r.dir==i&&(r.fresh||sS(r.isolates,n=Ox(this,e))))return r.order;n||(n=Ox(this,e));let s=W2(e.text,i,n);return this.bidiCache.push(new yc(e.from,e.to,i,n,!0,s)),s}get hasFocus(){var e;return(this.dom.ownerDocument.hasFocus()||R.safari&&((e=this.inputState)===null||e===void 0?void 0:e.lastContextMenu)>Date.now()-3e4)&&this.root.activeElement==this.contentDOM}focus(){this.observer.ignore(()=>{jx(this.contentDOM),this.docView.updateSelection()})}setRoot(e){this._root!=e&&(this._root=e,this.observer.setWindow((e.nodeType==9?e:e.ownerDocument).defaultView||window),this.mountStyles())}destroy(){this.root.activeElement==this.contentDOM&&this.contentDOM.blur();for(let e of this.plugins)e.destroy(this);this.plugins=[],this.inputState.destroy(),this.docView.destroy(),this.dom.remove(),this.observer.destroy(),this.measureScheduled>-1&&this.win.cancelAnimationFrame(this.measureScheduled),this.destroyed=!0}static scrollIntoView(e,i={}){return Hu.of(new Qa(typeof e=="number"?A.cursor(e):e,i.y,i.x,i.yMargin,i.xMargin))}scrollSnapshot(){let{scrollTop:e,scrollLeft:i}=this.scrollDOM,n=this.viewState.scrollAnchorAt(e);return Hu.of(new Qa(A.cursor(n.from),"start","start",n.top-e,i,!0))}setTabFocusMode(e){e==null?this.inputState.tabFocusMode=this.inputState.tabFocusMode<0?0:-1:typeof e=="boolean"?this.inputState.tabFocusMode=e?0:-1:this.inputState.tabFocusMode!=0&&(this.inputState.tabFocusMode=Date.now()+e)}static domEventHandlers(e){return qn.define(()=>({}),{eventHandlers:e})}static domEventObservers(e){return qn.define(()=>({}),{eventObservers:e})}static theme(e,i){let n=Vt.newName(),s=[tc.of(n),ba.of(Yp(`.${n}`,e))];return i&&i.dark&&s.push(Np.of(!0)),s}static baseTheme(e){return ga.lowest(ba.of(Yp("."+qp,e,_S)))}static findFromDOM(e){var i;let n=e.querySelector(".cm-content"),s=n&&se.get(n)||se.get(e);return((i=s?.rootView)===null||i===void 0?void 0:i.view)||null}};D.styleModule=ba;D.inputHandler=hS;D.clipboardInputFilter=Hp;D.clipboardOutputFilter=Kp;D.scrollHandler=pS;D.focusChangeEffect=fS;D.perLineTextDirection=dS;D.exceptionSink=cS;D.updateListener=wp;D.editable=tn;D.mouseSelectionStyle=uS;D.dragMovesSelection=oS;D.clickAddsSelectionRange=aS;D.decorations=za;D.outerDecorations=gS;D.atomicRanges=vc;D.bidiIsolatedRanges=yS;D.scrollMargins=bS;D.darkTheme=Np;D.cspNonce=E.define({combine:t=>t.length?t[0]:""});D.contentAttributes=Jp;D.editorAttributes=OS;D.lineWrapping=D.contentAttributes.of({class:"cm-lineWrapping"});D.announce=de.define();var VP=4096,Xx={},yc=class t{constructor(e,i,n,s,r,l){this.from=e,this.to=i,this.dir=n,this.isolates=s,this.fresh=r,this.order=l}static update(e,i){if(i.empty&&!e.some(r=>r.fresh))return e;let n=[],s=e.length?e[e.length-1].dir:ke.LTR;for(let r=Math.max(0,e.length-10);r<e.length;r++){let l=e[r];l.dir==s&&!i.touchesRange(l.from,l.to)&&n.push(new t(i.mapPos(l.from,1),i.mapPos(l.to,-1),l.dir,l.isolates,!1,l.order))}return n}};function Dx(t,e,i){for(let n=t.state.facet(e),s=n.length-1;s>=0;s--){let r=n[s],l=typeof r=="function"?r(t):r;l&&xp(l,i)}return i}var GP=R.mac?"mac":R.windows?"win":R.linux?"linux":"key";function UP(t,e){let i=t.split(/-(?!$)/),n=i[i.length-1];n=="Space"&&(n=" ");let s,r,l,a;for(let o=0;o<i.length-1;++o){let u=i[o];if(/^(cmd|meta|m)$/i.test(u))a=!0;else if(/^a(lt)?$/i.test(u))s=!0;else if(/^(c|ctrl|control)$/i.test(u))r=!0;else if(/^s(hift)?$/i.test(u))l=!0;else if(/^mod$/i.test(u))e=="mac"?a=!0:r=!0;else throw new Error("Unrecognized modifier name: "+u)}return s&&(n="Alt-"+n),r&&(n="Ctrl-"+n),a&&(n="Meta-"+n),l&&(n="Shift-"+n),n}function ic(t,e,i){return e.altKey&&(t="Alt-"+t),e.ctrlKey&&(t="Ctrl-"+t),e.metaKey&&(t="Meta-"+t),i!==!1&&e.shiftKey&&(t="Shift-"+t),t}var WP=ga.default(D.domEventHandlers({keydown(t,e){return JP(IP(e.state),t,e,"editor")}})),em=E.define({enables:WP}),Nx=new WeakMap;function IP(t){let e=t.facet(em),i=Nx.get(e);return i||Nx.set(e,i=KP(e.reduce((n,s)=>n.concat(s),[]))),i}var _n=null,HP=4e3;function KP(t,e=GP){let i=Object.create(null),n=Object.create(null),s=(l,a)=>{let o=n[l];if(o==null)n[l]=a;else if(o!=a)throw new Error("Key binding "+l+" is used both as a regular binding and as a multi-stroke prefix")},r=(l,a,o,u,c)=>{var h,f;let d=i[l]||(i[l]=Object.create(null)),m=a.split(/ (?!$)/).map(p=>UP(p,e));for(let p=1;p<m.length;p++){let O=m.slice(0,p).join(" ");s(O,!0),d[O]||(d[O]={preventDefault:!0,stopPropagation:!1,run:[y=>{let S=_n={view:y,prefix:O,scope:l};return setTimeout(()=>{_n==S&&(_n=null)},HP),!0}]})}let g=m.join(" ");s(g,!1);let x=d[g]||(d[g]={preventDefault:!1,stopPropagation:!1,run:((f=(h=d._any)===null||h===void 0?void 0:h.run)===null||f===void 0?void 0:f.slice())||[]});o&&x.run.push(o),u&&(x.preventDefault=!0),c&&(x.stopPropagation=!0)};for(let l of t){let a=l.scope?l.scope.split(" "):["editor"];if(l.any)for(let u of a){let c=i[u]||(i[u]=Object.create(null));c._any||(c._any={preventDefault:!1,stopPropagation:!1,run:[]});let{any:h}=l;for(let f in c)c[f].run.push(d=>h(d,Lp))}let o=l[e]||l.key;if(o)for(let u of a)r(u,o,l.run,l.preventDefault,l.stopPropagation),l.shift&&r(u,"Shift-"+o,l.shift,l.preventDefault,l.stopPropagation)}return i}var Lp=null;function JP(t,e,i,n){Lp=e;let s=ox(e),r=Gb(s,0),l=Ub(r)==s.length&&s!=" ",a="",o=!1,u=!1,c=!1;_n&&_n.view==i&&_n.scope==n&&(a=_n.prefix+" ",TS.indexOf(e.keyCode)<0&&(u=!0,_n=null));let h=new Set,f=x=>{if(x){for(let p of x.run)if(!h.has(p)&&(h.add(p),p(i)))return x.stopPropagation&&(c=!0),!0;x.preventDefault&&(x.stopPropagation&&(c=!0),u=!0)}return!1},d=t[n],m,g;return d&&(f(d[a+ic(s,e,!l)])?o=!0:l&&(e.altKey||e.metaKey||e.ctrlKey)&&!(R.windows&&e.ctrlKey&&e.altKey)&&!(R.mac&&e.altKey&&!(e.ctrlKey||e.metaKey))&&(m=en[e.keyCode])&&m!=s?(f(d[a+ic(m,e,!0)])||e.shiftKey&&(g=Dr[e.keyCode])!=s&&g!=m&&f(d[a+ic(g,e,!1)]))&&(o=!0):l&&e.shiftKey&&f(d[a+ic(s,e,!0)])&&(o=!0),!o&&f(d._any)&&(o=!0)),u&&(o=!0),o&&c&&e.stopPropagation(),Lp=null,o}var ZE=/x/.unicode!=null?"gu":"g";var Pi=class extends Fi{compare(e){return this==e||this.constructor==e.constructor&&this.eq(e)}eq(e){return!1}destroy(e){}};Pi.prototype.elementClass="";Pi.prototype.toDOM=void 0;Pi.prototype.mapMode=dt.TrackBefore;Pi.prototype.startSide=Pi.prototype.endSide=-1;Pi.prototype.point=!0;var dp=E.define(),FP=E.define();var ac=E.define();var Vp=E.define({combine:t=>t.some(e=>e)});function e$(t){let e=[t$];return t&&t.fixed===!1&&e.push(Vp.of(!0)),e}var t$=qn.fromClass(class{constructor(t){this.view=t,this.domAfter=null,this.prevViewport=t.viewport,this.dom=document.createElement("div"),this.dom.className="cm-gutters cm-gutters-before",this.dom.setAttribute("aria-hidden","true"),this.dom.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.gutters=t.state.facet(ac).map(e=>new bc(t,e)),this.fixed=!t.state.facet(Vp);for(let e of this.gutters)e.config.side=="after"?this.getDOMAfter().appendChild(e.dom):this.dom.appendChild(e.dom);this.fixed&&(this.dom.style.position="sticky"),this.syncGutters(!1),t.scrollDOM.insertBefore(this.dom,t.contentDOM)}getDOMAfter(){return this.domAfter||(this.domAfter=document.createElement("div"),this.domAfter.className="cm-gutters cm-gutters-after",this.domAfter.setAttribute("aria-hidden","true"),this.domAfter.style.minHeight=this.view.contentHeight/this.view.scaleY+"px",this.domAfter.style.position=this.fixed?"sticky":"",this.view.scrollDOM.appendChild(this.domAfter)),this.domAfter}update(t){if(this.updateGutters(t)){let e=this.prevViewport,i=t.view.viewport,n=Math.min(e.to,i.to)-Math.max(e.from,i.from);this.syncGutters(n<(i.to-i.from)*.8)}if(t.geometryChanged){let e=this.view.contentHeight/this.view.scaleY+"px";this.dom.style.minHeight=e,this.domAfter&&(this.domAfter.style.minHeight=e)}this.view.state.facet(Vp)!=!this.fixed&&(this.fixed=!this.fixed,this.dom.style.position=this.fixed?"sticky":"",this.domAfter&&(this.domAfter.style.position=this.fixed?"sticky":"")),this.prevViewport=t.view.viewport}syncGutters(t){let e=this.dom.nextSibling;t&&(this.dom.remove(),this.domAfter&&this.domAfter.remove());let i=pe.iter(this.view.state.facet(dp),this.view.viewport.from),n=[],s=this.gutters.map(r=>new Up(r,this.view.viewport,-this.view.documentPadding.top));for(let r of this.view.viewportLineBlocks)if(n.length&&(n=[]),Array.isArray(r.type)){let l=!0;for(let a of r.type)if(a.type==Ut.Text&&l){Gp(i,n,a.from);for(let o of s)o.line(this.view,a,n);l=!1}else if(a.widget)for(let o of s)o.widget(this.view,a)}else if(r.type==Ut.Text){Gp(i,n,r.from);for(let l of s)l.line(this.view,r,n)}else if(r.widget)for(let l of s)l.widget(this.view,r);for(let r of s)r.finish();t&&(this.view.scrollDOM.insertBefore(this.dom,e),this.domAfter&&this.view.scrollDOM.appendChild(this.domAfter))}updateGutters(t){let e=t.startState.facet(ac),i=t.state.facet(ac),n=t.docChanged||t.heightChanged||t.viewportChanged||!pe.eq(t.startState.facet(dp),t.state.facet(dp),t.view.viewport.from,t.view.viewport.to);if(e==i)for(let s of this.gutters)s.update(t)&&(n=!0);else{n=!0;let s=[];for(let r of i){let l=e.indexOf(r);l<0?s.push(new bc(this.view,r)):(this.gutters[l].update(t),s.push(this.gutters[l]))}for(let r of this.gutters)r.dom.remove(),s.indexOf(r)<0&&r.destroy();for(let r of s)r.config.side=="after"?this.getDOMAfter().appendChild(r.dom):this.dom.appendChild(r.dom);this.gutters=s}return n}destroy(){for(let t of this.gutters)t.destroy();this.dom.remove(),this.domAfter&&this.domAfter.remove()}},{provide:t=>D.scrollMargins.of(e=>{let i=e.plugin(t);if(!i||i.gutters.length==0||!i.fixed)return null;let n=i.dom.offsetWidth*e.scaleX,s=i.domAfter?i.domAfter.offsetWidth*e.scaleX:0;return e.textDirection==ke.LTR?{left:n,right:s}:{right:n,left:s}})});function qx(t){return Array.isArray(t)?t:[t]}function Gp(t,e,i){for(;t.value&&t.from<=i;)t.from==i&&e.push(t.value),t.next()}var Up=class{constructor(e,i,n){this.gutter=e,this.height=n,this.i=0,this.cursor=pe.iter(e.markers,i.from)}addElement(e,i,n){let{gutter:s}=this,r=(i.top-this.height)/e.scaleY,l=i.height/e.scaleY;if(this.i==s.elements.length){let a=new xc(e,l,r,n);s.elements.push(a),s.dom.appendChild(a.dom)}else s.elements[this.i].update(e,l,r,n);this.height=i.bottom,this.i++}line(e,i,n){let s=[];Gp(this.cursor,s,i.from),n.length&&(s=s.concat(n));let r=this.gutter.config.lineMarker(e,i,s);r&&s.unshift(r);let l=this.gutter;s.length==0&&!l.config.renderEmptyElements||this.addElement(e,i,s)}widget(e,i){let n=this.gutter.config.widgetMarker(e,i.widget,i),s=n?[n]:null;for(let r of e.state.facet(FP)){let l=r(e,i.widget,i);l&&(s||(s=[])).push(l)}s&&this.addElement(e,i,s)}finish(){let e=this.gutter;for(;e.elements.length>this.i;){let i=e.elements.pop();e.dom.removeChild(i.dom),i.destroy()}}},bc=class{constructor(e,i){this.view=e,this.config=i,this.elements=[],this.spacer=null,this.dom=document.createElement("div"),this.dom.className="cm-gutter"+(this.config.class?" "+this.config.class:"");for(let n in i.domEventHandlers)this.dom.addEventListener(n,s=>{let r=s.target,l;if(r!=this.dom&&this.dom.contains(r)){for(;r.parentNode!=this.dom;)r=r.parentNode;let o=r.getBoundingClientRect();l=(o.top+o.bottom)/2}else l=s.clientY;let a=e.lineBlockAtHeight(l-e.documentTop);i.domEventHandlers[n](e,a,s)&&s.preventDefault()});this.markers=qx(i.markers(e)),i.initialSpacer&&(this.spacer=new xc(e,0,0,[i.initialSpacer(e)]),this.dom.appendChild(this.spacer.dom),this.spacer.dom.style.cssText+="visibility: hidden; pointer-events: none")}update(e){let i=this.markers;if(this.markers=qx(this.config.markers(e.view)),this.spacer&&this.config.updateSpacer){let s=this.config.updateSpacer(this.spacer.markers[0],e);s!=this.spacer.markers[0]&&this.spacer.update(e.view,0,0,[s])}let n=e.view.viewport;return!pe.eq(this.markers,i,n.from,n.to)||(this.config.lineMarkerChange?this.config.lineMarkerChange(e):!1)}destroy(){for(let e of this.elements)e.destroy()}},xc=class{constructor(e,i,n,s){this.height=-1,this.above=0,this.markers=[],this.dom=document.createElement("div"),this.dom.className="cm-gutterElement",this.update(e,i,n,s)}update(e,i,n,s){this.height!=i&&(this.height=i,this.dom.style.height=i+"px"),this.above!=n&&(this.dom.style.marginTop=(this.above=n)?n+"px":""),i$(this.markers,s)||this.setMarkers(e,s)}setMarkers(e,i){let n="cm-gutterElement",s=this.dom.firstChild;for(let r=0,l=0;;){let a=l,o=r<i.length?i[r++]:null,u=!1;if(o){let c=o.elementClass;c&&(n+=" "+c);for(let h=l;h<this.markers.length;h++)if(this.markers[h].compare(o)){a=h,u=!0;break}}else a=this.markers.length;for(;l<a;){let c=this.markers[l++];if(c.toDOM){c.destroy(s);let h=s.nextSibling;s.remove(),s=h}}if(!o)break;o.toDOM&&(u?s=s.nextSibling:this.dom.insertBefore(o.toDOM(e),s)),u&&l++}this.dom.className=n,this.markers=i}destroy(){this.setMarkers(null,[])}};function i$(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(!t[i].compare(e[i]))return!1;return!0}var n$=E.define(),s$=E.define(),Br=E.define({combine(t){return ya(t,{formatNumber:String,domEventHandlers:{}},{domEventHandlers(e,i){let n=Object.assign({},e);for(let s in i){let r=n[s],l=i[s];n[s]=r?(a,o,u)=>r(a,o,u)||l(a,o,u):l}return n}})}}),Pa=class extends Pi{constructor(e){super(),this.number=e}eq(e){return this.number==e.number}toDOM(){return document.createTextNode(this.number)}};function pp(t,e){return t.state.facet(Br).formatNumber(e,t.state)}var r$=ac.compute([Br],t=>({class:"cm-lineNumbers",renderEmptyElements:!1,markers(e){return e.state.facet(n$)},lineMarker(e,i,n){return n.some(s=>s.toDOM)?null:new Pa(pp(e,e.state.doc.lineAt(i.from).number))},widgetMarker:(e,i,n)=>{for(let s of e.state.facet(s$)){let r=s(e,i,n);if(r)return r}return null},lineMarkerChange:e=>e.startState.facet(Br)!=e.state.facet(Br),initialSpacer(e){return new Pa(pp(e,Yx(e.state.doc.lines)))},updateSpacer(e,i){let n=pp(i.view,Yx(i.view.state.doc.lines));return n==e.number?e:new Pa(n)},domEventHandlers:t.facet(Br).domEventHandlers,side:"before"}));function ZS(t={}){return[Br.of(t),e$(),r$]}function Yx(t){let e=9;for(;e<t;)e=e*10+9;return e}var l$=0,mt=class{constructor(e,i){this.from=e,this.to=i}},_=class{constructor(e={}){this.id=l$++,this.perNode=!!e.perNode,this.deserialize=e.deserialize||(()=>{throw new Error("This node type doesn't define a deserialize function")})}add(e){if(this.perNode)throw new RangeError("Can't add per-node props to node types");return typeof e!="function"&&(e=Ge.match(e)),i=>{let n=e(i);return n===void 0?null:[this,n]}}};_.closedBy=new _({deserialize:t=>t.split(" ")});_.openedBy=new _({deserialize:t=>t.split(" ")});_.group=new _({deserialize:t=>t.split(" ")});_.isolate=new _({deserialize:t=>{if(t&&t!="rtl"&&t!="ltr"&&t!="auto")throw new RangeError("Invalid value for isolate: "+t);return t||"auto"}});_.contextHash=new _({perNode:!0});_.lookAhead=new _({perNode:!0});_.mounted=new _({perNode:!0});var As=class{constructor(e,i,n){this.tree=e,this.overlay=i,this.parser=n}static get(e){return e&&e.props&&e.props[_.mounted.id]}},a$=Object.create(null),Ge=class t{constructor(e,i,n,s=0){this.name=e,this.props=i,this.id=n,this.flags=s}static define(e){let i=e.props&&e.props.length?Object.create(null):a$,n=(e.top?1:0)|(e.skipped?2:0)|(e.error?4:0)|(e.name==null?8:0),s=new t(e.name||"",i,e.id,n);if(e.props){for(let r of e.props)if(Array.isArray(r)||(r=r(s)),r){if(r[0].perNode)throw new RangeError("Can't store a per-node prop on a node type");i[r[0].id]=r[1]}}return s}prop(e){return this.props[e.id]}get isTop(){return(this.flags&1)>0}get isSkipped(){return(this.flags&2)>0}get isError(){return(this.flags&4)>0}get isAnonymous(){return(this.flags&8)>0}is(e){if(typeof e=="string"){if(this.name==e)return!0;let i=this.prop(_.group);return i?i.indexOf(e)>-1:!1}return this.id==e}static match(e){let i=Object.create(null);for(let n in e)for(let s of n.split(" "))i[s]=e[n];return n=>{for(let s=n.prop(_.group),r=-1;r<(s?s.length:0);r++){let l=i[r<0?n.name:s[r]];if(l)return l}}}};Ge.none=new Ge("",Object.create(null),0,8);var _a=class t{constructor(e){this.types=e;for(let i=0;i<e.length;i++)if(e[i].id!=i)throw new RangeError("Node type ids should correspond to array positions when creating a node set")}extend(...e){let i=[];for(let n of this.types){let s=null;for(let r of e){let l=r(n);l&&(s||(s=Object.assign({},n.props)),s[l[0].id]=l[1])}i.push(s?new Ge(n.name,s,n.id,n.flags):n)}return new t(i)}},wc=new WeakMap,XS=new WeakMap,re;(function(t){t[t.ExcludeBuffers=1]="ExcludeBuffers",t[t.IncludeAnonymous=2]="IncludeAnonymous",t[t.IgnoreMounts=4]="IgnoreMounts",t[t.IgnoreOverlays=8]="IgnoreOverlays"})(re||(re={}));var me=class t{constructor(e,i,n,s,r){if(this.type=e,this.children=i,this.positions=n,this.length=s,this.props=null,r&&r.length){this.props=Object.create(null);for(let[l,a]of r)this.props[typeof l=="number"?l:l.id]=a}}toString(){let e=As.get(this);if(e&&!e.overlay)return e.tree.toString();let i="";for(let n of this.children){let s=n.toString();s&&(i&&(i+=","),i+=s)}return this.type.name?(/\W/.test(this.type.name)&&!this.type.isError?JSON.stringify(this.type.name):this.type.name)+(i.length?"("+i+")":""):i}cursor(e=0){return new Gr(this.topNode,e)}cursorAt(e,i=0,n=0){let s=wc.get(this)||this.topNode,r=new Gr(s);return r.moveTo(e,i),wc.set(this,r._tree),r}get topNode(){return new It(this,0,0,null)}resolve(e,i=0){let n=Za(wc.get(this)||this.topNode,e,i,!1);return wc.set(this,n),n}resolveInner(e,i=0){let n=Za(XS.get(this)||this.topNode,e,i,!0);return XS.set(this,n),n}resolveStack(e,i=0){return o$(this,e,i)}iterate(e){let{enter:i,leave:n,from:s=0,to:r=this.length}=e,l=e.mode||0,a=(l&re.IncludeAnonymous)>0;for(let o=this.cursor(l|re.IncludeAnonymous);;){let u=!1;if(o.from<=r&&o.to>=s&&(!a&&o.type.isAnonymous||i(o)!==!1)){if(o.firstChild())continue;u=!0}for(;u&&n&&(a||!o.type.isAnonymous)&&n(o),!o.nextSibling();){if(!o.parent())return;u=!0}}}prop(e){return e.perNode?this.props?this.props[e.id]:void 0:this.type.prop(e)}get propValues(){let e=[];if(this.props)for(let i in this.props)e.push([+i,this.props[i]]);return e}balance(e={}){return this.children.length<=8?this:hm(Ge.none,this.children,this.positions,0,this.children.length,0,this.length,(i,n,s)=>new t(this.type,i,n,s,this.propValues),e.makeTree||((i,n,s)=>new t(Ge.none,i,n,s)))}static build(e){return u$(e)}};me.empty=new me(Ge.none,[],[],0);var tm=class t{constructor(e,i){this.buffer=e,this.index=i}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}get pos(){return this.index}next(){this.index-=4}fork(){return new t(this.buffer,this.index)}},Yn=class t{constructor(e,i,n){this.buffer=e,this.length=i,this.set=n}get type(){return Ge.none}toString(){let e=[];for(let i=0;i<this.buffer.length;)e.push(this.childString(i)),i=this.buffer[i+3];return e.join(",")}childString(e){let i=this.buffer[e],n=this.buffer[e+3],s=this.set.types[i],r=s.name;if(/\W/.test(r)&&!s.isError&&(r=JSON.stringify(r)),e+=4,n==e)return r;let l=[];for(;e<n;)l.push(this.childString(e)),e=this.buffer[e+3];return r+"("+l.join(",")+")"}findChild(e,i,n,s,r){let{buffer:l}=this,a=-1;for(let o=e;o!=i&&!(LS(r,s,l[o+1],l[o+2])&&(a=o,n>0));o=l[o+3]);return a}slice(e,i,n){let s=this.buffer,r=new Uint16Array(i-e),l=0;for(let a=e,o=0;a<i;){r[o++]=s[a++],r[o++]=s[a++]-n;let u=r[o++]=s[a++]-n;r[o++]=s[a++]-e,l=Math.max(l,u)}return new t(r,l,this.set)}};function LS(t,e,i,n){switch(t){case-2:return i<e;case-1:return n>=e&&i<e;case 0:return i<e&&n>e;case 1:return i<=e&&n>e;case 2:return n>e;case 4:return!0}}function Za(t,e,i,n){for(var s;t.from==t.to||(i<1?t.from>=e:t.from>e)||(i>-1?t.to<=e:t.to<e);){let l=!n&&t instanceof It&&t.index<0?null:t.parent;if(!l)return t;t=l}let r=n?0:re.IgnoreOverlays;if(n)for(let l=t,a=l.parent;a;l=a,a=l.parent)l instanceof It&&l.index<0&&((s=a.enter(e,i,r))===null||s===void 0?void 0:s.from)!=l.from&&(t=a);for(;;){let l=t.enter(e,i,r);if(!l)return t;t=l}}var Pc=class{cursor(e=0){return new Gr(this,e)}getChild(e,i=null,n=null){let s=DS(this,e,i,n);return s.length?s[0]:null}getChildren(e,i=null,n=null){return DS(this,e,i,n)}resolve(e,i=0){return Za(this,e,i,!1)}resolveInner(e,i=0){return Za(this,e,i,!0)}matchContext(e){return im(this.parent,e)}enterUnfinishedNodesBefore(e){let i=this.childBefore(e),n=this;for(;i;){let s=i.lastChild;if(!s||s.to!=i.to)break;s.type.isError&&s.from==s.to?(n=i,i=s.prevSibling):i=s}return n}get node(){return this}get next(){return this.parent}},It=class t extends Pc{constructor(e,i,n,s){super(),this._tree=e,this.from=i,this.index=n,this._parent=s}get type(){return this._tree.type}get name(){return this._tree.type.name}get to(){return this.from+this._tree.length}nextChild(e,i,n,s,r=0){for(let l=this;;){for(let{children:a,positions:o}=l._tree,u=i>0?a.length:-1;e!=u;e+=i){let c=a[e],h=o[e]+l.from;if(LS(s,n,h,h+c.length)){if(c instanceof Yn){if(r&re.ExcludeBuffers)continue;let f=c.findChild(0,c.buffer.length,i,n-h,s);if(f>-1)return new Xa(new nm(l,c,e,h),null,f)}else if(r&re.IncludeAnonymous||!c.type.isAnonymous||cm(c)){let f;if(!(r&re.IgnoreMounts)&&(f=As.get(c))&&!f.overlay)return new t(f.tree,h,e,l);let d=new t(c,h,e,l);return r&re.IncludeAnonymous||!d.type.isAnonymous?d:d.nextChild(i<0?c.children.length-1:0,i,n,s)}}}if(r&re.IncludeAnonymous||!l.type.isAnonymous||(l.index>=0?e=l.index+i:e=i<0?-1:l._parent._tree.children.length,l=l._parent,!l))return null}}get firstChild(){return this.nextChild(0,1,0,4)}get lastChild(){return this.nextChild(this._tree.children.length-1,-1,0,4)}childAfter(e){return this.nextChild(0,1,e,2)}childBefore(e){return this.nextChild(this._tree.children.length-1,-1,e,-2)}enter(e,i,n=0){let s;if(!(n&re.IgnoreOverlays)&&(s=As.get(this._tree))&&s.overlay){let r=e-this.from;for(let{from:l,to:a}of s.overlay)if((i>0?l<=r:l<r)&&(i<0?a>=r:a>r))return new t(s.tree,s.overlay[0].from+this.from,-1,this)}return this.nextChild(0,1,e,i,n)}nextSignificantParent(){let e=this;for(;e.type.isAnonymous&&e._parent;)e=e._parent;return e}get parent(){return this._parent?this._parent.nextSignificantParent():null}get nextSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index+1,1,0,4):null}get prevSibling(){return this._parent&&this.index>=0?this._parent.nextChild(this.index-1,-1,0,4):null}get tree(){return this._tree}toTree(){return this._tree}toString(){return this._tree.toString()}};function DS(t,e,i,n){let s=t.cursor(),r=[];if(!s.firstChild())return r;if(i!=null){for(let l=!1;!l;)if(l=s.type.is(i),!s.nextSibling())return r}for(;;){if(n!=null&&s.type.is(n))return r;if(s.type.is(e)&&r.push(s.node),!s.nextSibling())return n==null?r:[]}}function im(t,e,i=e.length-1){for(let n=t;i>=0;n=n.parent){if(!n)return!1;if(!n.type.isAnonymous){if(e[i]&&e[i]!=n.name)return!1;i--}}return!0}var nm=class{constructor(e,i,n,s){this.parent=e,this.buffer=i,this.index=n,this.start=s}},Xa=class t extends Pc{get name(){return this.type.name}get from(){return this.context.start+this.context.buffer.buffer[this.index+1]}get to(){return this.context.start+this.context.buffer.buffer[this.index+2]}constructor(e,i,n){super(),this.context=e,this._parent=i,this.index=n,this.type=e.buffer.set.types[e.buffer.buffer[n]]}child(e,i,n){let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],e,i-this.context.start,n);return r<0?null:new t(this.context,this,r)}get firstChild(){return this.child(1,0,4)}get lastChild(){return this.child(-1,0,4)}childAfter(e){return this.child(1,e,2)}childBefore(e){return this.child(-1,e,-2)}enter(e,i,n=0){if(n&re.ExcludeBuffers)return null;let{buffer:s}=this.context,r=s.findChild(this.index+4,s.buffer[this.index+3],i>0?1:-1,e-this.context.start,i);return r<0?null:new t(this.context,this,r)}get parent(){return this._parent||this.context.parent.nextSignificantParent()}externalSibling(e){return this._parent?null:this.context.parent.nextChild(this.context.index+e,e,0,4)}get nextSibling(){let{buffer:e}=this.context,i=e.buffer[this.index+3];return i<(this._parent?e.buffer[this._parent.index+3]:e.buffer.length)?new t(this.context,this._parent,i):this.externalSibling(1)}get prevSibling(){let{buffer:e}=this.context,i=this._parent?this._parent.index+4:0;return this.index==i?this.externalSibling(-1):new t(this.context,this._parent,e.findChild(i,this.index,-1,0,4))}get tree(){return null}toTree(){let e=[],i=[],{buffer:n}=this.context,s=this.index+4,r=n.buffer[this.index+3];if(r>s){let l=n.buffer[this.index+1];e.push(n.slice(s,r,l)),i.push(0)}return new me(this.type,e,i,this.to-this.from)}toString(){return this.context.buffer.childString(this.index)}};function VS(t){if(!t.length)return null;let e=0,i=t[0];for(let r=1;r<t.length;r++){let l=t[r];(l.from>i.from||l.to<i.to)&&(i=l,e=r)}let n=i instanceof It&&i.index<0?null:i.parent,s=t.slice();return n?s[e]=n:s.splice(e,1),new sm(s,i)}var sm=class{constructor(e,i){this.heads=e,this.node=i}get next(){return VS(this.heads)}};function o$(t,e,i){let n=t.resolveInner(e,i),s=null;for(let r=n instanceof It?n:n.context.parent;r;r=r.parent)if(r.index<0){let l=r.parent;(s||(s=[n])).push(l.resolve(e,i)),r=l}else{let l=As.get(r.tree);if(l&&l.overlay&&l.overlay[0].from<=e&&l.overlay[l.overlay.length-1].to>=e){let a=new It(l.tree,l.overlay[0].from+r.from,-1,r);(s||(s=[n])).push(Za(a,e,i,!1))}}return s?VS(s):n}var Gr=class{get name(){return this.type.name}constructor(e,i=0){if(this.mode=i,this.buffer=null,this.stack=[],this.index=0,this.bufferNode=null,e instanceof It)this.yieldNode(e);else{this._tree=e.context.parent,this.buffer=e.context;for(let n=e._parent;n;n=n._parent)this.stack.unshift(n.index);this.bufferNode=e,this.yieldBuf(e.index)}}yieldNode(e){return e?(this._tree=e,this.type=e.type,this.from=e.from,this.to=e.to,!0):!1}yieldBuf(e,i){this.index=e;let{start:n,buffer:s}=this.buffer;return this.type=i||s.set.types[s.buffer[e]],this.from=n+s.buffer[e+1],this.to=n+s.buffer[e+2],!0}yield(e){return e?e instanceof It?(this.buffer=null,this.yieldNode(e)):(this.buffer=e.context,this.yieldBuf(e.index,e.type)):!1}toString(){return this.buffer?this.buffer.buffer.childString(this.index):this._tree.toString()}enterChild(e,i,n){if(!this.buffer)return this.yield(this._tree.nextChild(e<0?this._tree._tree.children.length-1:0,e,i,n,this.mode));let{buffer:s}=this.buffer,r=s.findChild(this.index+4,s.buffer[this.index+3],e,i-this.buffer.start,n);return r<0?!1:(this.stack.push(this.index),this.yieldBuf(r))}firstChild(){return this.enterChild(1,0,4)}lastChild(){return this.enterChild(-1,0,4)}childAfter(e){return this.enterChild(1,e,2)}childBefore(e){return this.enterChild(-1,e,-2)}enter(e,i,n=this.mode){return this.buffer?n&re.ExcludeBuffers?!1:this.enterChild(1,e,i):this.yield(this._tree.enter(e,i,n))}parent(){if(!this.buffer)return this.yieldNode(this.mode&re.IncludeAnonymous?this._tree._parent:this._tree.parent);if(this.stack.length)return this.yieldBuf(this.stack.pop());let e=this.mode&re.IncludeAnonymous?this.buffer.parent:this.buffer.parent.nextSignificantParent();return this.buffer=null,this.yieldNode(e)}sibling(e){if(!this.buffer)return this._tree._parent?this.yield(this._tree.index<0?null:this._tree._parent.nextChild(this._tree.index+e,e,0,4,this.mode)):!1;let{buffer:i}=this.buffer,n=this.stack.length-1;if(e<0){let s=n<0?0:this.stack[n]+4;if(this.index!=s)return this.yieldBuf(i.findChild(s,this.index,-1,0,4))}else{let s=i.buffer[this.index+3];if(s<(n<0?i.buffer.length:i.buffer[this.stack[n]+3]))return this.yieldBuf(s)}return n<0?this.yield(this.buffer.parent.nextChild(this.buffer.index+e,e,0,4,this.mode)):!1}nextSibling(){return this.sibling(1)}prevSibling(){return this.sibling(-1)}atLastNode(e){let i,n,{buffer:s}=this;if(s){if(e>0){if(this.index<s.buffer.buffer.length)return!1}else for(let r=0;r<this.index;r++)if(s.buffer.buffer[r+3]<this.index)return!1;({index:i,parent:n}=s)}else({index:i,_parent:n}=this._tree);for(;n;{index:i,_parent:n}=n)if(i>-1)for(let r=i+e,l=e<0?-1:n._tree.children.length;r!=l;r+=e){let a=n._tree.children[r];if(this.mode&re.IncludeAnonymous||a instanceof Yn||!a.type.isAnonymous||cm(a))return!1}return!0}move(e,i){if(i&&this.enterChild(e,0,4))return!0;for(;;){if(this.sibling(e))return!0;if(this.atLastNode(e)||!this.parent())return!1}}next(e=!0){return this.move(1,e)}prev(e=!0){return this.move(-1,e)}moveTo(e,i=0){for(;(this.from==this.to||(i<1?this.from>=e:this.from>e)||(i>-1?this.to<=e:this.to<e))&&this.parent(););for(;this.enterChild(1,e,i););return this}get node(){if(!this.buffer)return this._tree;let e=this.bufferNode,i=null,n=0;if(e&&e.context==this.buffer)e:for(let s=this.index,r=this.stack.length;r>=0;){for(let l=e;l;l=l._parent)if(l.index==s){if(s==this.index)return l;i=l,n=r+1;break e}s=this.stack[--r]}for(let s=n;s<this.stack.length;s++)i=new Xa(this.buffer,i,this.stack[s]);return this.bufferNode=new Xa(this.buffer,i,this.index)}get tree(){return this.buffer?null:this._tree._tree}iterate(e,i){for(let n=0;;){let s=!1;if(this.type.isAnonymous||e(this)!==!1){if(this.firstChild()){n++;continue}this.type.isAnonymous||(s=!0)}for(;;){if(s&&i&&i(this),s=this.type.isAnonymous,!n)return;if(this.nextSibling())break;this.parent(),n--,s=!0}}}matchContext(e){if(!this.buffer)return im(this.node.parent,e);let{buffer:i}=this.buffer,{types:n}=i.set;for(let s=e.length-1,r=this.stack.length-1;s>=0;r--){if(r<0)return im(this._tree,e,s);let l=n[i.buffer[this.stack[r]]];if(!l.isAnonymous){if(e[s]&&e[s]!=l.name)return!1;s--}}return!0}};function cm(t){return t.children.some(e=>e instanceof Yn||!e.type.isAnonymous||cm(e))}function u$(t){var e;let{buffer:i,nodeSet:n,maxBufferLength:s=1024,reused:r=[],minRepeatType:l=n.types.length}=t,a=Array.isArray(i)?new tm(i,i.length):i,o=n.types,u=0,c=0;function h(k,w,v,P,z,M){let{id:X,start:T,end:N,size:V}=a,W=c,Ne=u;for(;V<0;)if(a.next(),V==-1){let at=r[X];v.push(at),P.push(T-k);return}else if(V==-3){u=X;return}else if(V==-4){c=X;return}else throw new RangeError(`Unrecognized record size: ${V}`);let lt=o[X],gt,qe,sl=T-k;if(N-T<=s&&(qe=x(a.pos-w,z))){let at=new Uint16Array(qe.size-qe.skip),C=a.pos-qe.size,B=at.length;for(;a.pos>C;)B=p(qe.start,at,B);gt=new Yn(at,N-qe.start,n),sl=qe.start-k}else{let at=a.pos-V;a.next();let C=[],B=[],le=X>=l?X:-1,Ft=0,Jn=N;for(;a.pos>at;)le>=0&&a.id==le&&a.size>=0?(a.end<=Jn-s&&(m(C,B,T,Ft,a.end,Jn,le,W,Ne),Ft=C.length,Jn=a.end),a.next()):M>2500?f(T,at,C,B):h(T,at,C,B,le,M+1);if(le>=0&&Ft>0&&Ft<C.length&&m(C,B,T,Ft,T,Jn,le,W,Ne),C.reverse(),B.reverse(),le>-1&&Ft>0){let Fn=d(lt,Ne);gt=hm(lt,C,B,0,C.length,0,N-T,Fn,Fn)}else gt=g(lt,C,B,N-T,W-N,Ne)}v.push(gt),P.push(sl)}function f(k,w,v,P){let z=[],M=0,X=-1;for(;a.pos>w;){let{id:T,start:N,end:V,size:W}=a;if(W>4)a.next();else{if(X>-1&&N<X)break;X<0&&(X=V-s),z.push(T,N,V),M++,a.next()}}if(M){let T=new Uint16Array(M*4),N=z[z.length-2];for(let V=z.length-3,W=0;V>=0;V-=3)T[W++]=z[V],T[W++]=z[V+1]-N,T[W++]=z[V+2]-N,T[W++]=W;v.push(new Yn(T,z[2]-N,n)),P.push(N-k)}}function d(k,w){return(v,P,z)=>{let M=0,X=v.length-1,T,N;if(X>=0&&(T=v[X])instanceof me){if(!X&&T.type==k&&T.length==z)return T;(N=T.prop(_.lookAhead))&&(M=P[X]+T.length+N)}return g(k,v,P,z,M,w)}}function m(k,w,v,P,z,M,X,T,N){let V=[],W=[];for(;k.length>P;)V.push(k.pop()),W.push(w.pop()+v-z);k.push(g(n.types[X],V,W,M-z,T-M,N)),w.push(z-v)}function g(k,w,v,P,z,M,X){if(M){let T=[_.contextHash,M];X=X?[T].concat(X):[T]}if(z>25){let T=[_.lookAhead,z];X=X?[T].concat(X):[T]}return new me(k,w,v,P,X)}function x(k,w){let v=a.fork(),P=0,z=0,M=0,X=v.end-s,T={size:0,start:0,skip:0};e:for(let N=v.pos-k;v.pos>N;){let V=v.size;if(v.id==w&&V>=0){T.size=P,T.start=z,T.skip=M,M+=4,P+=4,v.next();continue}let W=v.pos-V;if(V<0||W<N||v.start<X)break;let Ne=v.id>=l?4:0,lt=v.start;for(v.next();v.pos>W;){if(v.size<0)if(v.size==-3)Ne+=4;else break e;else v.id>=l&&(Ne+=4);v.next()}z=lt,P+=V,M+=Ne}return(w<0||P==k)&&(T.size=P,T.start=z,T.skip=M),T.size>4?T:void 0}function p(k,w,v){let{id:P,start:z,end:M,size:X}=a;if(a.next(),X>=0&&P<l){let T=v;if(X>4){let N=a.pos-(X-4);for(;a.pos>N;)v=p(k,w,v)}w[--v]=T,w[--v]=M-k,w[--v]=z-k,w[--v]=P}else X==-3?u=P:X==-4&&(c=P);return v}let O=[],y=[];for(;a.pos>0;)h(t.start||0,t.bufferStart||0,O,y,-1,0);let S=(e=t.length)!==null&&e!==void 0?e:O.length?y[0]+O[0].length:0;return new me(o[t.topID],O.reverse(),y.reverse(),S)}var NS=new WeakMap;function Tc(t,e){if(!t.isAnonymous||e instanceof Yn||e.type!=t)return 1;let i=NS.get(e);if(i==null){i=1;for(let n of e.children){if(n.type!=t||!(n instanceof me)){i=1;break}i+=Tc(t,n)}NS.set(e,i)}return i}function hm(t,e,i,n,s,r,l,a,o){let u=0;for(let m=n;m<s;m++)u+=Tc(t,e[m]);let c=Math.ceil(u*1.5/8),h=[],f=[];function d(m,g,x,p,O){for(let y=x;y<p;){let S=y,k=g[y],w=Tc(t,m[y]);for(y++;y<p;y++){let v=Tc(t,m[y]);if(w+v>=c)break;w+=v}if(y==S+1){if(w>c){let v=m[S];d(v.children,v.positions,0,v.children.length,g[S]+O);continue}h.push(m[S])}else{let v=g[y-1]+m[y-1].length-k;h.push(hm(t,m,g,S,y,k,v,null,o))}f.push(k+O-r)}}return d(e,i,n,s,0),(a||o)(h,f,l)}var nn=class t{constructor(e,i,n,s,r=!1,l=!1){this.from=e,this.to=i,this.tree=n,this.offset=s,this.open=(r?1:0)|(l?2:0)}get openStart(){return(this.open&1)>0}get openEnd(){return(this.open&2)>0}static addTree(e,i=[],n=!1){let s=[new t(0,e.length,e,0,!1,n)];for(let r of i)r.to>e.length&&s.push(r);return s}static applyChanges(e,i,n=128){if(!i.length)return e;let s=[],r=1,l=e.length?e[0]:null;for(let a=0,o=0,u=0;;a++){let c=a<i.length?i[a]:null,h=c?c.fromA:1e9;if(h-o>=n)for(;l&&l.from<h;){let f=l;if(o>=f.from||h<=f.to||u){let d=Math.max(f.from,o)-u,m=Math.min(f.to,h)-u;f=d>=m?null:new t(d,m,f.tree,f.offset+u,a>0,!!c)}if(f&&s.push(f),l.to>h)break;l=r<e.length?e[r++]:null}if(!c)break;o=c.toA,u=c.toA-c.toB}return s}},Ur=class{startParse(e,i,n){return typeof e=="string"&&(e=new rm(e)),n=n?n.length?n.map(s=>new mt(s.from,s.to)):[new mt(0,0)]:[new mt(0,e.length)],this.createParse(e,i||[],n)}parse(e,i,n){let s=this.startParse(e,i,n);for(;;){let r=s.advance();if(r)return r}}},rm=class{constructor(e){this.string=e}get length(){return this.string.length}chunk(e){return this.string.slice(e)}get lineChunks(){return!1}read(e,i){return this.string.slice(e,i)}};function Rc(t){return(e,i,n,s)=>new om(e,t,i,n,s)}var $c=class{constructor(e,i,n,s,r){this.parser=e,this.parse=i,this.overlay=n,this.target=s,this.from=r}};function qS(t){if(!t.length||t.some(e=>e.from>=e.to))throw new RangeError("Invalid inner parse ranges given: "+JSON.stringify(t))}var lm=class{constructor(e,i,n,s,r,l,a){this.parser=e,this.predicate=i,this.mounts=n,this.index=s,this.start=r,this.target=l,this.prev=a,this.depth=0,this.ranges=[]}},am=new _({perNode:!0}),om=class{constructor(e,i,n,s,r){this.nest=i,this.input=n,this.fragments=s,this.ranges=r,this.inner=[],this.innerDone=0,this.baseTree=null,this.stoppedAt=null,this.baseParse=e}advance(){if(this.baseParse){let n=this.baseParse.advance();if(!n)return null;if(this.baseParse=null,this.baseTree=n,this.startInner(),this.stoppedAt!=null)for(let s of this.inner)s.parse.stopAt(this.stoppedAt)}if(this.innerDone==this.inner.length){let n=this.baseTree;return this.stoppedAt!=null&&(n=new me(n.type,n.children,n.positions,n.length,n.propValues.concat([[am,this.stoppedAt]]))),n}let e=this.inner[this.innerDone],i=e.parse.advance();if(i){this.innerDone++;let n=Object.assign(Object.create(null),e.target.props);n[_.mounted.id]=new As(i,e.overlay,e.parser),e.target.props=n}return null}get parsedPos(){if(this.baseParse)return 0;let e=this.input.length;for(let i=this.innerDone;i<this.inner.length;i++)this.inner[i].from<e&&(e=Math.min(e,this.inner[i].parse.parsedPos));return e}stopAt(e){if(this.stoppedAt=e,this.baseParse)this.baseParse.stopAt(e);else for(let i=this.innerDone;i<this.inner.length;i++)this.inner[i].parse.stopAt(e)}startInner(){let e=new um(this.fragments),i=null,n=null,s=new Gr(new It(this.baseTree,this.ranges[0].from,0,null),re.IncludeAnonymous|re.IgnoreMounts);e:for(let r,l;;){let a=!0,o;if(this.stoppedAt!=null&&s.from>=this.stoppedAt)a=!1;else if(e.hasNode(s)){if(i){let u=i.mounts.find(c=>c.frag.from<=s.from&&c.frag.to>=s.to&&c.mount.overlay);if(u)for(let c of u.mount.overlay){let h=c.from+u.pos,f=c.to+u.pos;h>=s.from&&f<=s.to&&!i.ranges.some(d=>d.from<f&&d.to>h)&&i.ranges.push({from:h,to:f})}}a=!1}else if(n&&(l=c$(n.ranges,s.from,s.to)))a=l!=2;else if(!s.type.isAnonymous&&(r=this.nest(s,this.input))&&(s.from<s.to||!r.overlay)){s.tree||h$(s);let u=e.findMounts(s.from,r.parser);if(typeof r.overlay=="function")i=new lm(r.parser,r.overlay,u,this.inner.length,s.from,s.tree,i);else{let c=BS(this.ranges,r.overlay||(s.from<s.to?[new mt(s.from,s.to)]:[]));c.length&&qS(c),(c.length||!r.overlay)&&this.inner.push(new $c(r.parser,c.length?r.parser.startParse(this.input,jS(u,c),c):r.parser.startParse(""),r.overlay?r.overlay.map(h=>new mt(h.from-s.from,h.to-s.from)):null,s.tree,c.length?c[0].from:s.from)),r.overlay?c.length&&(n={ranges:c,depth:0,prev:n}):a=!1}}else if(i&&(o=i.predicate(s))&&(o===!0&&(o=new mt(s.from,s.to)),o.from<o.to)){let u=i.ranges.length-1;u>=0&&i.ranges[u].to==o.from?i.ranges[u]={from:i.ranges[u].from,to:o.to}:i.ranges.push(o)}if(a&&s.firstChild())i&&i.depth++,n&&n.depth++;else for(;!s.nextSibling();){if(!s.parent())break e;if(i&&!--i.depth){let u=BS(this.ranges,i.ranges);u.length&&(qS(u),this.inner.splice(i.index,0,new $c(i.parser,i.parser.startParse(this.input,jS(i.mounts,u),u),i.ranges.map(c=>new mt(c.from-i.start,c.to-i.start)),i.target,u[0].from))),i=i.prev}n&&!--n.depth&&(n=n.prev)}}}};function c$(t,e,i){for(let n of t){if(n.from>=i)break;if(n.to>e)return n.from<=e&&n.to>=i?2:1}return 0}function YS(t,e,i,n,s,r){if(e<i){let l=t.buffer[e+1];n.push(t.slice(e,i,l)),s.push(l-r)}}function h$(t){let{node:e}=t,i=[],n=e.context.buffer;do i.push(t.index),t.parent();while(!t.tree);let s=t.tree,r=s.children.indexOf(n),l=s.children[r],a=l.buffer,o=[r];function u(c,h,f,d,m,g){let x=i[g],p=[],O=[];YS(l,c,x,p,O,d);let y=a[x+1],S=a[x+2];o.push(p.length);let k=g?u(x+4,a[x+3],l.set.types[a[x]],y,S-y,g-1):e.toTree();return p.push(k),O.push(y-d),YS(l,a[x+3],h,p,O,d),new me(f,p,O,m)}s.children[r]=u(0,a.length,Ge.none,0,l.length,i.length-1);for(let c of o){let h=t.tree.children[c],f=t.tree.positions[c];t.yield(new It(h,f+t.from,c,t._tree))}}var Ac=class{constructor(e,i){this.offset=i,this.done=!1,this.cursor=e.cursor(re.IncludeAnonymous|re.IgnoreMounts)}moveTo(e){let{cursor:i}=this,n=e-this.offset;for(;!this.done&&i.from<n;)i.to>=e&&i.enter(n,1,re.IgnoreOverlays|re.ExcludeBuffers)||i.next(!1)||(this.done=!0)}hasNode(e){if(this.moveTo(e.from),!this.done&&this.cursor.from+this.offset==e.from&&this.cursor.tree)for(let i=this.cursor.tree;;){if(i==e.tree)return!0;if(i.children.length&&i.positions[0]==0&&i.children[0]instanceof me)i=i.children[0];else break}return!1}},um=class{constructor(e){var i;if(this.fragments=e,this.curTo=0,this.fragI=0,e.length){let n=this.curFrag=e[0];this.curTo=(i=n.tree.prop(am))!==null&&i!==void 0?i:n.to,this.inner=new Ac(n.tree,-n.offset)}else this.curFrag=this.inner=null}hasNode(e){for(;this.curFrag&&e.from>=this.curTo;)this.nextFrag();return this.curFrag&&this.curFrag.from<=e.from&&this.curTo>=e.to&&this.inner.hasNode(e)}nextFrag(){var e;if(this.fragI++,this.fragI==this.fragments.length)this.curFrag=this.inner=null;else{let i=this.curFrag=this.fragments[this.fragI];this.curTo=(e=i.tree.prop(am))!==null&&e!==void 0?e:i.to,this.inner=new Ac(i.tree,-i.offset)}}findMounts(e,i){var n;let s=[];if(this.inner){this.inner.cursor.moveTo(e,1);for(let r=this.inner.cursor.node;r;r=r.parent){let l=(n=r.tree)===null||n===void 0?void 0:n.prop(_.mounted);if(l&&l.parser==i)for(let a=this.fragI;a<this.fragments.length;a++){let o=this.fragments[a];if(o.from>=r.to)break;o.tree==this.curFrag.tree&&s.push({frag:o,pos:r.from-o.offset,mount:l})}}}return s}};function BS(t,e){let i=null,n=e;for(let s=1,r=0;s<t.length;s++){let l=t[s-1].to,a=t[s].from;for(;r<n.length;r++){let o=n[r];if(o.from>=a)break;o.to<=l||(i||(n=i=e.slice()),o.from<l?(i[r]=new mt(o.from,l),o.to>a&&i.splice(r+1,0,new mt(a,o.to))):o.to>a?i[r--]=new mt(a,o.to):i.splice(r--,1))}}return n}function f$(t,e,i,n){let s=0,r=0,l=!1,a=!1,o=-1e9,u=[];for(;;){let c=s==t.length?1e9:l?t[s].to:t[s].from,h=r==e.length?1e9:a?e[r].to:e[r].from;if(l!=a){let f=Math.max(o,i),d=Math.min(c,h,n);f<d&&u.push(new mt(f,d))}if(o=Math.min(c,h),o==1e9)break;c==o&&(l?(l=!1,s++):l=!0),h==o&&(a?(a=!1,r++):a=!0)}return u}function jS(t,e){let i=[];for(let{pos:n,mount:s,frag:r}of t){let l=n+(s.overlay?s.overlay[0].from:0),a=l+s.tree.length,o=Math.max(r.from,l),u=Math.min(r.to,a);if(s.overlay){let c=s.overlay.map(f=>new mt(f.from+n,f.to+n)),h=f$(e,c,o,u);for(let f=0,d=o;;f++){let m=f==h.length,g=m?u:h[f].from;if(g>d&&i.push(new nn(d,g,s.tree,-l,r.from>=d||r.openStart,r.to<=g||r.openEnd)),m)break;d=h[f].to}}else i.push(new nn(o,u,s.tree,-l,r.from>=l||r.openStart,r.to<=a||r.openEnd))}return i}var d$=0,ai=class t{constructor(e,i,n,s){this.name=e,this.set=i,this.base=n,this.modified=s,this.id=d$++}toString(){let{name:e}=this;for(let i of this.modified)i.name&&(e=`${i.name}(${e})`);return e}static define(e,i){let n=typeof e=="string"?e:"?";if(e instanceof t&&(i=e),i?.base)throw new Error("Can not derive from a modified tag");let s=new t(n,[],null,[]);if(s.set.push(s),i)for(let r of i.set)s.set.push(r);return s}static defineModifier(e){let i=new zc(e);return n=>n.modified.indexOf(i)>-1?n:zc.get(n.base||n,n.modified.concat(i).sort((s,r)=>s.id-r.id))}},p$=0,zc=class t{constructor(e){this.name=e,this.instances=[],this.id=p$++}static get(e,i){if(!i.length)return e;let n=i[0].instances.find(a=>a.base==e&&m$(i,a.modified));if(n)return n;let s=[],r=new ai(e.name,s,e,i);for(let a of i)a.instances.push(r);let l=O$(i);for(let a of e.set)if(!a.modified.length)for(let o of l)s.push(t.get(a,o));return r}};function m$(t,e){return t.length==e.length&&t.every((i,n)=>i==e[n])}function O$(t){let e=[[]];for(let i=0;i<t.length;i++)for(let n=0,s=e.length;n<s;n++)e.push(e[n].concat(t[i]));return e.sort((i,n)=>n.length-i.length)}function Ln(t){let e=Object.create(null);for(let i in t){let n=t[i];Array.isArray(n)||(n=[n]);for(let s of i.split(" "))if(s){let r=[],l=2,a=s;for(let h=0;;){if(a=="..."&&h>0&&h+3==s.length){l=1;break}let f=/^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);if(!f)throw new RangeError("Invalid path: "+s);if(r.push(f[0]=="*"?"":f[0][0]=='"'?JSON.parse(f[0]):f[0]),h+=f[0].length,h==s.length)break;let d=s[h++];if(h==s.length&&d=="!"){l=0;break}if(d!="/")throw new RangeError("Invalid path: "+s);a=s.slice(h)}let o=r.length-1,u=r[o];if(!u)throw new RangeError("Invalid path: "+s);let c=new Wr(n,l,o>0?r.slice(0,o):null);e[u]=c.sort(e[u])}}return WS.add(e)}var WS=new _,Wr=class{constructor(e,i,n,s){this.tags=e,this.mode=i,this.context=n,this.next=s}get opaque(){return this.mode==0}get inherit(){return this.mode==1}sort(e){return!e||e.depth<this.depth?(this.next=e,this):(e.next=this.sort(e.next),e)}get depth(){return this.context?this.context.length:0}};Wr.empty=new Wr([],2,null);function mm(t,e){let i=Object.create(null);for(let r of t)if(!Array.isArray(r.tag))i[r.tag.id]=r.class;else for(let l of r.tag)i[l.id]=r.class;let{scope:n,all:s=null}=e||{};return{style:r=>{let l=s;for(let a of r)for(let o of a.set){let u=i[o.id];if(u){l=l?l+" "+u:u;break}}return l},scope:n}}function g$(t,e){let i=null;for(let n of t){let s=n.style(e);s&&(i=i?i+" "+s:s)}return i}function IS(t,e,i,n=0,s=t.length){let r=new dm(n,Array.isArray(e)?e:[e],i);r.highlightRange(t.cursor(),n,s,"",r.highlighters),r.flush(s)}var dm=class{constructor(e,i,n){this.at=e,this.highlighters=i,this.span=n,this.class=""}startSpan(e,i){i!=this.class&&(this.flush(e),e>this.at&&(this.at=e),this.class=i)}flush(e){e>this.at&&this.class&&this.span(this.at,e,this.class)}highlightRange(e,i,n,s,r){let{type:l,from:a,to:o}=e;if(a>=n||o<=i)return;l.isTop&&(r=this.highlighters.filter(d=>!d.scope||d.scope(l)));let u=s,c=y$(e)||Wr.empty,h=g$(r,c.tags);if(h&&(u&&(u+=" "),u+=h,c.mode==1&&(s+=(s?" ":"")+h)),this.startSpan(Math.max(i,a),u),c.opaque)return;let f=e.tree&&e.tree.prop(_.mounted);if(f&&f.overlay){let d=e.node.enter(f.overlay[0].from+a,1),m=this.highlighters.filter(x=>!x.scope||x.scope(f.tree.type)),g=e.firstChild();for(let x=0,p=a;;x++){let O=x<f.overlay.length?f.overlay[x]:null,y=O?O.from+a:o,S=Math.max(i,p),k=Math.min(n,y);if(S<k&&g)for(;e.from<k&&(this.highlightRange(e,S,k,s,r),this.startSpan(Math.min(k,e.to),u),!(e.to>=y||!e.nextSibling())););if(!O||y>n)break;p=O.to+a,p>i&&(this.highlightRange(d.cursor(),Math.max(i,O.from+a),Math.min(n,p),"",m),this.startSpan(Math.min(n,p),u))}g&&e.parent()}else if(e.firstChild()){f&&(s="");do if(!(e.to<=i)){if(e.from>=n)break;this.highlightRange(e,i,n,s,r),this.startSpan(Math.min(n,e.to),u)}while(e.nextSibling());e.parent()}}};function y$(t){let e=t.type.prop(WS);for(;e&&e.context&&!t.matchContext(e.context);)e=e.next;return e||null}var $=ai.define,Cc=$(),Bn=$(),GS=$(Bn),US=$(Bn),jn=$(),Mc=$(jn),fm=$(jn),Ri=$(),Rs=$(Ri),$i=$(),Ai=$(),pm=$(),Da=$(pm),Ec=$(),b={comment:Cc,lineComment:$(Cc),blockComment:$(Cc),docComment:$(Cc),name:Bn,variableName:$(Bn),typeName:GS,tagName:$(GS),propertyName:US,attributeName:$(US),className:$(Bn),labelName:$(Bn),namespace:$(Bn),macroName:$(Bn),literal:jn,string:Mc,docString:$(Mc),character:$(Mc),attributeValue:$(Mc),number:fm,integer:$(fm),float:$(fm),bool:$(jn),regexp:$(jn),escape:$(jn),color:$(jn),url:$(jn),keyword:$i,self:$($i),null:$($i),atom:$($i),unit:$($i),modifier:$($i),operatorKeyword:$($i),controlKeyword:$($i),definitionKeyword:$($i),moduleKeyword:$($i),operator:Ai,derefOperator:$(Ai),arithmeticOperator:$(Ai),logicOperator:$(Ai),bitwiseOperator:$(Ai),compareOperator:$(Ai),updateOperator:$(Ai),definitionOperator:$(Ai),typeOperator:$(Ai),controlOperator:$(Ai),punctuation:pm,separator:$(pm),bracket:Da,angleBracket:$(Da),squareBracket:$(Da),paren:$(Da),brace:$(Da),content:Ri,heading:Rs,heading1:$(Rs),heading2:$(Rs),heading3:$(Rs),heading4:$(Rs),heading5:$(Rs),heading6:$(Rs),contentSeparator:$(Ri),list:$(Ri),quote:$(Ri),emphasis:$(Ri),strong:$(Ri),link:$(Ri),monospace:$(Ri),strikethrough:$(Ri),inserted:$(),deleted:$(),changed:$(),invalid:$(),meta:Ec,documentMeta:$(Ec),annotation:$(Ec),processingInstruction:$(Ec),definition:ai.defineModifier("definition"),constant:ai.defineModifier("constant"),function:ai.defineModifier("function"),standard:ai.defineModifier("standard"),local:ai.defineModifier("local"),special:ai.defineModifier("special")};for(let t in b){let e=b[t];e instanceof ai&&(e.name=t)}var YE=mm([{tag:b.link,class:"tok-link"},{tag:b.heading,class:"tok-heading"},{tag:b.emphasis,class:"tok-emphasis"},{tag:b.strong,class:"tok-strong"},{tag:b.keyword,class:"tok-keyword"},{tag:b.atom,class:"tok-atom"},{tag:b.bool,class:"tok-bool"},{tag:b.url,class:"tok-url"},{tag:b.labelName,class:"tok-labelName"},{tag:b.inserted,class:"tok-inserted"},{tag:b.deleted,class:"tok-deleted"},{tag:b.literal,class:"tok-literal"},{tag:b.string,class:"tok-string"},{tag:b.number,class:"tok-number"},{tag:[b.regexp,b.escape,b.special(b.string)],class:"tok-string2"},{tag:b.variableName,class:"tok-variableName"},{tag:b.local(b.variableName),class:"tok-variableName tok-local"},{tag:b.definition(b.variableName),class:"tok-variableName tok-definition"},{tag:b.special(b.variableName),class:"tok-variableName2"},{tag:b.definition(b.propertyName),class:"tok-propertyName tok-definition"},{tag:b.typeName,class:"tok-typeName"},{tag:b.namespace,class:"tok-namespace"},{tag:b.className,class:"tok-className"},{tag:b.macroName,class:"tok-macroName"},{tag:b.propertyName,class:"tok-propertyName"},{tag:b.operator,class:"tok-operator"},{tag:b.comment,class:"tok-comment"},{tag:b.meta,class:"tok-meta"},{tag:b.invalid,class:"tok-invalid"},{tag:b.punctuation,class:"tok-punctuation"}]);var Om,Ir=new _;function b$(t){return E.define({combine:t?e=>e.concat(t):void 0})}var x$=new _,At=class{constructor(e,i,n=[],s=""){this.data=e,this.name=s,be.prototype.hasOwnProperty("tree")||Object.defineProperty(be.prototype,"tree",{get(){return oi(this)}}),this.parser=i,this.extension=[Hr.of(this),be.languageData.of((r,l,a)=>{let o=HS(r,l,a),u=o.type.prop(Ir);if(!u)return[];let c=r.facet(u),h=o.type.prop(x$);if(h){let f=o.resolve(l-o.from,a);for(let d of h)if(d.test(f,r)){let m=r.facet(d.facet);return d.type=="replace"?m:m.concat(c)}}return c})].concat(n)}isActiveAt(e,i,n=-1){return HS(e,i,n).type.prop(Ir)==this.data}findRegions(e){let i=e.facet(Hr);if(i?.data==this.data)return[{from:0,to:e.doc.length}];if(!i||!i.allowsNesting)return[];let n=[],s=(r,l)=>{if(r.prop(Ir)==this.data){n.push({from:l,to:l+r.length});return}let a=r.prop(_.mounted);if(a){if(a.tree.prop(Ir)==this.data){if(a.overlay)for(let o of a.overlay)n.push({from:o.from+l,to:o.to+l});else n.push({from:l,to:l+r.length});return}else if(a.overlay){let o=n.length;if(s(a.tree,a.overlay[0].from+l),n.length>o)return}}for(let o=0;o<r.children.length;o++){let u=r.children[o];u instanceof me&&s(u,r.positions[o]+l)}};return s(oi(e),0),n}get allowsNesting(){return!0}};At.setState=de.define();function HS(t,e,i){let n=t.facet(Hr),s=oi(t).topNode;if(!n||n.allowsNesting)for(let r=s;r;r=r.enter(e,i,re.ExcludeBuffers))r.type.isTop&&(s=r);return s}var _c=class t extends At{constructor(e,i,n){super(e,i,[],n),this.parser=i}static define(e){let i=b$(e.languageData);return new t(i,e.parser.configure({props:[Ir.add(n=>n.isTop?i:void 0)]}),e.name)}configure(e,i){return new t(this.data,this.parser.configure(e),i||this.name)}get allowsNesting(){return this.parser.hasWrappers()}};function oi(t){let e=t.field(At.state,!1);return e?e.tree:me.empty}var xm=class{constructor(e){this.doc=e,this.cursorPos=0,this.string="",this.cursor=e.iter()}get length(){return this.doc.length}syncTo(e){return this.string=this.cursor.next(e-this.cursorPos).value,this.cursorPos=e+this.string.length,this.cursorPos-this.string.length}chunk(e){return this.syncTo(e),this.string}get lineChunks(){return!0}read(e,i){let n=this.cursorPos-this.string.length;return e<n||i>=this.cursorPos?this.doc.sliceString(e,i):this.string.slice(e-n,i-n)}},Na=null,Sm=class t{constructor(e,i,n=[],s,r,l,a,o){this.parser=e,this.state=i,this.fragments=n,this.tree=s,this.treeLen=r,this.viewport=l,this.skipped=a,this.scheduleOn=o,this.parse=null,this.tempSkipped=[]}static create(e,i,n){return new t(e,i,[],me.empty,0,n,[],null)}startParse(){return this.parser.startParse(new xm(this.state.doc),this.fragments)}work(e,i){return i!=null&&i>=this.state.doc.length&&(i=void 0),this.tree!=me.empty&&this.isDone(i??this.state.doc.length)?(this.takeTree(),!0):this.withContext(()=>{var n;if(typeof e=="number"){let s=Date.now()+e;e=()=>Date.now()>s}for(this.parse||(this.parse=this.startParse()),i!=null&&(this.parse.stoppedAt==null||this.parse.stoppedAt>i)&&i<this.state.doc.length&&this.parse.stopAt(i);;){let s=this.parse.advance();if(s)if(this.fragments=this.withoutTempSkipped(nn.addTree(s,this.fragments,this.parse.stoppedAt!=null)),this.treeLen=(n=this.parse.stoppedAt)!==null&&n!==void 0?n:this.state.doc.length,this.tree=s,this.parse=null,this.treeLen<(i??this.state.doc.length))this.parse=this.startParse();else return!0;if(e())return!1}})}takeTree(){let e,i;this.parse&&(e=this.parse.parsedPos)>=this.treeLen&&((this.parse.stoppedAt==null||this.parse.stoppedAt>e)&&this.parse.stopAt(e),this.withContext(()=>{for(;!(i=this.parse.advance()););}),this.treeLen=e,this.tree=i,this.fragments=this.withoutTempSkipped(nn.addTree(this.tree,this.fragments,!0)),this.parse=null)}withContext(e){let i=Na;Na=this;try{return e()}finally{Na=i}}withoutTempSkipped(e){for(let i;i=this.tempSkipped.pop();)e=KS(e,i.from,i.to);return e}changes(e,i){let{fragments:n,tree:s,treeLen:r,viewport:l,skipped:a}=this;if(this.takeTree(),!e.empty){let o=[];if(e.iterChangedRanges((u,c,h,f)=>o.push({fromA:u,toA:c,fromB:h,toB:f})),n=nn.applyChanges(n,o),s=me.empty,r=0,l={from:e.mapPos(l.from,-1),to:e.mapPos(l.to,1)},this.skipped.length){a=[];for(let u of this.skipped){let c=e.mapPos(u.from,1),h=e.mapPos(u.to,-1);c<h&&a.push({from:c,to:h})}}}return new t(this.parser,i,n,s,r,l,a,this.scheduleOn)}updateViewport(e){if(this.viewport.from==e.from&&this.viewport.to==e.to)return!1;this.viewport=e;let i=this.skipped.length;for(let n=0;n<this.skipped.length;n++){let{from:s,to:r}=this.skipped[n];s<e.to&&r>e.from&&(this.fragments=KS(this.fragments,s,r),this.skipped.splice(n--,1))}return this.skipped.length>=i?!1:(this.reset(),!0)}reset(){this.parse&&(this.takeTree(),this.parse=null)}skipUntilInView(e,i){this.skipped.push({from:e,to:i})}static getSkippingParser(e){return new class extends Ur{createParse(i,n,s){let r=s[0].from,l=s[s.length-1].to;return{parsedPos:r,advance(){let o=Na;if(o){for(let u of s)o.tempSkipped.push(u);e&&(o.scheduleOn=o.scheduleOn?Promise.all([o.scheduleOn,e]):e)}return this.parsedPos=l,new me(Ge.none,[],[],l-r)},stoppedAt:null,stopAt(){}}}}}isDone(e){e=Math.min(e,this.state.doc.length);let i=this.fragments;return this.treeLen>=e&&i.length&&i[0].from==0&&i[0].to>=e}static get(){return Na}};function KS(t,e,i){return nn.applyChanges(t,[{fromA:e,toA:i,fromB:e,toB:i}])}var qa=class t{constructor(e){this.context=e,this.tree=e.tree}apply(e){if(!e.docChanged&&this.tree==this.context.tree)return this;let i=this.context.changes(e.changes,e.state),n=this.context.treeLen==e.startState.doc.length?void 0:Math.max(e.changes.mapPos(this.context.treeLen),i.viewport.to);return i.work(20,n)||i.takeTree(),new t(i)}static init(e){let i=Math.min(3e3,e.doc.length),n=Sm.create(e.facet(Hr).parser,e,{from:0,to:i});return n.work(20,i)||n.takeTree(),new t(n)}};At.state=si.define({create:qa.init,update(t,e){for(let i of e.effects)if(i.is(At.setState))return i.value;return e.startState.facet(Hr)!=e.state.facet(Hr)?qa.init(e.state):t.apply(e)}});var tk=t=>{let e=setTimeout(()=>t(),500);return()=>clearTimeout(e)};typeof requestIdleCallback<"u"&&(tk=t=>{let e=-1,i=setTimeout(()=>{e=requestIdleCallback(t,{timeout:400})},100);return()=>e<0?clearTimeout(i):cancelIdleCallback(e)});var gm=typeof navigator<"u"&&(!((Om=navigator.scheduling)===null||Om===void 0)&&Om.isInputPending)?()=>navigator.scheduling.isInputPending():null,S$=qn.fromClass(class{constructor(e){this.view=e,this.working=null,this.workScheduled=0,this.chunkEnd=-1,this.chunkBudget=-1,this.work=this.work.bind(this),this.scheduleWork()}update(e){let i=this.view.state.field(At.state).context;(i.updateViewport(e.view.viewport)||this.view.viewport.to>i.treeLen)&&this.scheduleWork(),(e.docChanged||e.selectionSet)&&(this.view.hasFocus&&(this.chunkBudget+=50),this.scheduleWork()),this.checkAsyncSchedule(i)}scheduleWork(){if(this.working)return;let{state:e}=this.view,i=e.field(At.state);(i.tree!=i.context.tree||!i.context.isDone(e.doc.length))&&(this.working=tk(this.work))}work(e){this.working=null;let i=Date.now();if(this.chunkEnd<i&&(this.chunkEnd<0||this.view.hasFocus)&&(this.chunkEnd=i+3e4,this.chunkBudget=3e3),this.chunkBudget<=0)return;let{state:n,viewport:{to:s}}=this.view,r=n.field(At.state);if(r.tree==r.context.tree&&r.context.isDone(s+1e5))return;let l=Date.now()+Math.min(this.chunkBudget,100,e&&!gm?Math.max(25,e.timeRemaining()-5):1e9),a=r.context.treeLen<s&&n.doc.length>s+1e3,o=r.context.work(()=>gm&&gm()||Date.now()>l,s+(a?0:1e5));this.chunkBudget-=Date.now()-i,(o||this.chunkBudget<=0)&&(r.context.takeTree(),this.view.dispatch({effects:At.setState.of(new qa(r.context))})),this.chunkBudget>0&&!(o&&!a)&&this.scheduleWork(),this.checkAsyncSchedule(r.context)}checkAsyncSchedule(e){e.scheduleOn&&(this.workScheduled++,e.scheduleOn.then(()=>this.scheduleWork()).catch(i=>ri(this.view.state,i)).then(()=>this.workScheduled--),e.scheduleOn=null)}destroy(){this.working&&this.working()}isWorking(){return!!(this.working||this.workScheduled>0)}},{eventHandlers:{focus(){this.scheduleWork()}}}),Hr=E.define({combine(t){return t.length?t[0]:null},enables:t=>[At.state,S$,D.contentAttributes.compute([t],e=>{let i=e.facet(t);return i&&i.name?{"data-language":i.name}:{}})]});var k$=E.define(),Zc=E.define({combine:t=>{if(!t.length)return"  ";let e=t[0];if(!e||/\S/.test(e)||Array.from(e).some(i=>i!=e[0]))throw new Error("Invalid indent unit: "+JSON.stringify(t[0]));return e}});function Ya(t){let e=t.facet(Zc);return e.charCodeAt(0)==9?t.tabSize*e.length:e.length}function Ba(t,e){let i="",n=t.tabSize,s=t.facet(Zc)[0];if(s=="	"){for(;e>=n;)i+="	",e-=n;s=" "}for(let r=0;r<e;r++)i+=s;return i}function Pm(t,e){t instanceof be&&(t=new Cs(t));for(let n of t.state.facet(k$)){let s=n(t,e);if(s!==void 0)return s}let i=oi(t.state);return i.length>=e?Q$(t,i,e):null}var Cs=class{constructor(e,i={}){this.state=e,this.options=i,this.unit=Ya(e)}lineAt(e,i=1){let n=this.state.doc.lineAt(e),{simulateBreak:s,simulateDoubleBreak:r}=this.options;return s!=null&&s>=n.from&&s<=n.to?r&&s==e?{text:"",from:e}:(i<0?s<e:s<=e)?{text:n.text.slice(s-n.from),from:s}:{text:n.text.slice(0,s-n.from),from:n.from}:n}textAfterPos(e,i=1){if(this.options.simulateDoubleBreak&&e==this.options.simulateBreak)return"";let{text:n,from:s}=this.lineAt(e,i);return n.slice(e-s,Math.min(n.length,e+100-s))}column(e,i=1){let{text:n,from:s}=this.lineAt(e,i),r=this.countColumn(n,e-s),l=this.options.overrideIndentation?this.options.overrideIndentation(s):-1;return l>-1&&(r+=l-this.countColumn(n,n.search(/\S|$/))),r}countColumn(e,i=e.length){return Qs(e,this.state.tabSize,i)}lineIndent(e,i=1){let{text:n,from:s}=this.lineAt(e,i),r=this.options.overrideIndentation;if(r){let l=r(s);if(l>-1)return l}return this.countColumn(n,n.search(/\S|$/))}get simulatedBreak(){return this.options.simulateBreak||null}},v$=new _;function Q$(t,e,i){let n=e.resolveStack(i),s=e.resolveInner(i,-1).resolve(i,0).enterUnfinishedNodesBefore(i);if(s!=n.node){let r=[];for(let l=s;l&&!(l.from<n.node.from||l.to>n.node.to||l.from==n.node.from&&l.type==n.node.type);l=l.parent)r.push(l);for(let l=r.length-1;l>=0;l--)n={node:r[l],next:n}}return ik(n,t,i)}function ik(t,e,i){for(let n=t;n;n=n.next){let s=T$(n.node);if(s)return s(km.create(e,i,n))}return 0}function w$(t){return t.pos==t.options.simulateBreak&&t.options.simulateDoubleBreak}function T$(t){let e=t.type.prop(v$);if(e)return e;let i=t.firstChild,n;if(i&&(n=i.type.prop(_.closedBy))){let s=t.lastChild,r=s&&n.indexOf(s.name)>-1;return l=>R$(l,!0,1,void 0,r&&!w$(l)?s.from:void 0)}return t.parent==null?P$:null}function P$(){return 0}var km=class t extends Cs{constructor(e,i,n){super(e.state,e.options),this.base=e,this.pos=i,this.context=n}get node(){return this.context.node}static create(e,i,n){return new t(e,i,n)}get textAfter(){return this.textAfterPos(this.pos)}get baseIndent(){return this.baseIndentFor(this.node)}baseIndentFor(e){let i=this.state.doc.lineAt(e.from);for(;;){let n=e.resolve(i.from);for(;n.parent&&n.parent.from==n.from;)n=n.parent;if($$(n,e))break;i=this.state.doc.lineAt(n.from)}return this.lineIndent(i.from)}continue(){return ik(this.context.next,this.base,this.pos)}};function $$(t,e){for(let i=e;i;i=i.parent)if(t==i)return!0;return!1}function A$(t){let e=t.node,i=e.childAfter(e.from),n=e.lastChild;if(!i)return null;let s=t.options.simulateBreak,r=t.state.doc.lineAt(i.from),l=s==null||s<=r.from?r.to:Math.min(r.to,s);for(let a=i.to;;){let o=e.childAfter(a);if(!o||o==n)return null;if(!o.type.isSkipped){if(o.from>=l)return null;let u=/^ */.exec(r.text.slice(i.to-r.from))[0].length;return{from:i.from,to:i.to+u}}a=o.to}}function R$(t,e,i,n,s){let r=t.textAfter,l=r.match(/^\s*/)[0].length,a=n&&r.slice(l,l+n.length)==n||s==t.pos+l,o=e?A$(t):null;return o?a?t.column(o.from):t.column(o.to):t.baseIndent+(a?0:t.unit*i)}var Kr=class t{constructor(e,i){this.specs=e;let n;function s(a){let o=Vt.newName();return(n||(n=Object.create(null)))["."+o]=a,o}let r=typeof i.all=="string"?i.all:i.all?s(i.all):void 0,l=i.scope;this.scope=l instanceof At?a=>a.prop(Ir)==l.data:l?a=>a==l:void 0,this.style=mm(e.map(a=>({tag:a.tag,class:a.class||s(Object.assign({},a,{tag:null}))})),{all:r}).style,this.module=n?new Vt(n):null,this.themeType=i.themeType}static define(e,i){return new t(e,i||{})}},vm=E.define(),nk=E.define({combine(t){return t.length?[t[0]]:null}});function ym(t){let e=t.facet(vm);return e.length?e:t.facet(nk)}function sk(t,e){let i=[C$],n;return t instanceof Kr&&(t.module&&i.push(D.styleModule.of(t.module)),n=t.themeType),e?.fallback?i.push(nk.of(t)):n?i.push(vm.computeN([D.darkTheme],s=>s.facet(D.darkTheme)==(n=="dark")?[t]:[])):i.push(vm.of(t)),i}var Qm=class{constructor(e){this.markCache=Object.create(null),this.tree=oi(e.state),this.decorations=this.buildDeco(e,ym(e.state)),this.decoratedTo=e.viewport.to}update(e){let i=oi(e.state),n=ym(e.state),s=n!=ym(e.startState),{viewport:r}=e.view,l=e.changes.mapPos(this.decoratedTo,1);i.length<r.to&&!s&&i.type==this.tree.type&&l>=r.to?(this.decorations=this.decorations.map(e.changes),this.decoratedTo=l):(i!=this.tree||e.viewportChanged||s)&&(this.tree=i,this.decorations=this.buildDeco(e.view,n),this.decoratedTo=r.to)}buildDeco(e,i){if(!i||!this.tree.length)return ve.none;let n=new vs;for(let{from:s,to:r}of e.visibleRanges)IS(this.tree,i,(l,a,o)=>{n.add(l,a,this.markCache[o]||(this.markCache[o]=ve.mark({class:o})))},s,r);return n.finish()}},C$=ga.high(qn.fromClass(Qm,{decorations:t=>t.decorations})),HE=Kr.define([{tag:b.meta,color:"#404740"},{tag:b.link,textDecoration:"underline"},{tag:b.heading,textDecoration:"underline",fontWeight:"bold"},{tag:b.emphasis,fontStyle:"italic"},{tag:b.strong,fontWeight:"bold"},{tag:b.strikethrough,textDecoration:"line-through"},{tag:b.keyword,color:"#708"},{tag:[b.atom,b.bool,b.url,b.contentSeparator,b.labelName],color:"#219"},{tag:[b.literal,b.inserted],color:"#164"},{tag:[b.string,b.deleted],color:"#a11"},{tag:[b.regexp,b.escape,b.special(b.string)],color:"#e40"},{tag:b.definition(b.variableName),color:"#00f"},{tag:b.local(b.variableName),color:"#30a"},{tag:[b.typeName,b.namespace],color:"#085"},{tag:b.className,color:"#167"},{tag:[b.special(b.variableName),b.macroName],color:"#256"},{tag:b.definition(b.propertyName),color:"#00c"},{tag:b.comment,color:"#940"},{tag:b.invalid,color:"#f00"}]);var M$=1e4,E$="()[]{}";var z$=new _;function wm(t,e,i){let n=t.prop(e<0?_.openedBy:_.closedBy);if(n)return n;if(t.name.length==1){let s=i.indexOf(t.name);if(s>-1&&s%2==(e<0?1:0))return[i[s+e]]}return null}function Tm(t){let e=t.type.prop(z$);return e?e(t.node):t}function Ms(t,e,i,n={}){let s=n.maxScanDistance||M$,r=n.brackets||E$,l=oi(t),a=l.resolveInner(e,i);for(let o=a;o;o=o.parent){let u=wm(o.type,i,r);if(u&&o.from<o.to){let c=Tm(o);if(c&&(i>0?e>=c.from&&e<c.to:e>c.from&&e<=c.to))return _$(t,e,i,o,c,u,r)}}return Z$(t,e,i,l,a.type,s,r)}function _$(t,e,i,n,s,r,l){let a=n.parent,o={from:s.from,to:s.to},u=0,c=a?.cursor();if(c&&(i<0?c.childBefore(n.from):c.childAfter(n.to)))do if(i<0?c.to<=n.from:c.from>=n.to){if(u==0&&r.indexOf(c.type.name)>-1&&c.from<c.to){let h=Tm(c);return{start:o,end:h?{from:h.from,to:h.to}:void 0,matched:!0}}else if(wm(c.type,i,l))u++;else if(wm(c.type,-i,l)){if(u==0){let h=Tm(c);return{start:o,end:h&&h.from<h.to?{from:h.from,to:h.to}:void 0,matched:!1}}u--}}while(i<0?c.prevSibling():c.nextSibling());return{start:o,matched:!1}}function Z$(t,e,i,n,s,r,l){let a=i<0?t.sliceDoc(e-1,e):t.sliceDoc(e,e+1),o=l.indexOf(a);if(o<0||o%2==0!=i>0)return null;let u={from:i<0?e-1:e,to:i>0?e+1:e},c=t.doc.iterRange(e,i>0?t.doc.length:0),h=0;for(let f=0;!c.next().done&&f<=r;){let d=c.value;i<0&&(f+=d.length);let m=e+f*i;for(let g=i>0?0:d.length-1,x=i>0?d.length:-1;g!=x;g+=i){let p=l.indexOf(d[g]);if(!(p<0||n.resolveInner(m+g,1).type!=s))if(p%2==0==i>0)h++;else{if(h==1)return{start:u,end:{from:m+g,to:m+g+1},matched:p>>1==o>>1};h--}}i>0&&(f+=d.length)}return c.done?{start:u,matched:!1}:null}var X$=Object.create(null),JS=[Ge.none];var FS=[],ek=Object.create(null),D$=Object.create(null);for(let[t,e]of[["variable","variableName"],["variable-2","variableName.special"],["string-2","string.special"],["def","variableName.definition"],["tag","tagName"],["attribute","attributeName"],["type","typeName"],["builtin","variableName.standard"],["qualifier","modifier"],["error","invalid"],["header","heading"],["property","propertyName"]])D$[t]=N$(X$,e);function bm(t,e){FS.indexOf(t)>-1||(FS.push(t),console.warn(e))}function N$(t,e){let i=[];for(let a of e.split(" ")){let o=[];for(let u of a.split(".")){let c=t[u]||b[u];c?typeof c=="function"?o.length?o=o.map(c):bm(u,`Modifier ${u} used at start of tag`):o.length?bm(u,`Tag ${u} used as modifier`):o=Array.isArray(c)?c:[c]:bm(u,`Unknown highlighting tag ${u}`)}for(let u of o)i.push(u)}if(!i.length)return 0;let n=e.replace(/ /g,"_"),s=n+" "+i.map(a=>a.id),r=ek[s];if(r)return r.id;let l=ek[s]=Ge.define({id:JS.length,name:n,props:[Ln({[n]:i})]});return JS.push(l),l.id}var KE={rtl:ve.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"rtl"},bidiIsolate:ke.RTL}),ltr:ve.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"ltr"},bidiIsolate:ke.LTR}),auto:ve.mark({class:"cm-iso",inclusive:!0,attributes:{dir:"auto"},bidiIsolate:null})};var q$="#e5c07b",rk="#e06c75",Y$="#56b6c2",B$="#ffffff",Xc="#abb2bf",Am="#7d8799",j$="#61afef",L$="#98c379",lk="#d19a66",V$="#c678dd",G$="#21252b",ak="#2c313a",ok="#282c34",$m="#353a42",U$="#3E4451",uk="#528bff";var W$=D.theme({"&":{color:Xc,backgroundColor:ok},".cm-content":{caretColor:uk},".cm-cursor, .cm-dropCursor":{borderLeftColor:uk},"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":{backgroundColor:U$},".cm-panels":{backgroundColor:G$,color:Xc},".cm-panels.cm-panels-top":{borderBottom:"2px solid black"},".cm-panels.cm-panels-bottom":{borderTop:"2px solid black"},".cm-searchMatch":{backgroundColor:"#72a1ff59",outline:"1px solid #457dff"},".cm-searchMatch.cm-searchMatch-selected":{backgroundColor:"#6199ff2f"},".cm-activeLine":{backgroundColor:"#6699ff0b"},".cm-selectionMatch":{backgroundColor:"#aafe661a"},"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":{backgroundColor:"#bad0f847"},".cm-gutters":{backgroundColor:ok,color:Am,border:"none"},".cm-activeLineGutter":{backgroundColor:ak},".cm-foldPlaceholder":{backgroundColor:"transparent",border:"none",color:"#ddd"},".cm-tooltip":{border:"none",backgroundColor:$m},".cm-tooltip .cm-tooltip-arrow:before":{borderTopColor:"transparent",borderBottomColor:"transparent"},".cm-tooltip .cm-tooltip-arrow:after":{borderTopColor:$m,borderBottomColor:$m},".cm-tooltip-autocomplete":{"& > ul > li[aria-selected]":{backgroundColor:ak,color:Xc}}},{dark:!0}),I$=Kr.define([{tag:b.keyword,color:V$},{tag:[b.name,b.deleted,b.character,b.propertyName,b.macroName],color:rk},{tag:[b.function(b.variableName),b.labelName],color:j$},{tag:[b.color,b.constant(b.name),b.standard(b.name)],color:lk},{tag:[b.definition(b.name),b.separator],color:Xc},{tag:[b.typeName,b.className,b.number,b.changed,b.annotation,b.modifier,b.self,b.namespace],color:q$},{tag:[b.operator,b.operatorKeyword,b.url,b.escape,b.regexp,b.link,b.special(b.string)],color:Y$},{tag:[b.meta,b.comment],color:Am},{tag:b.strong,fontWeight:"bold"},{tag:b.emphasis,fontStyle:"italic"},{tag:b.strikethrough,textDecoration:"line-through"},{tag:b.link,color:Am,textDecoration:"underline"},{tag:b.heading,fontWeight:"bold",color:rk},{tag:[b.atom,b.bool,b.special(b.variableName)],color:lk},{tag:[b.processingInstruction,b.string,b.inserted],color:L$},{tag:b.invalid,color:B$}]),ck=[W$,sk(I$)];var Ce=ah(ol(),1);var H$=t=>{let{state:e}=t,i=e.doc.lineAt(e.selection.main.from),n=_m(t.state,i.from);return n.line?K$(t):n.block?F$(t):!1};function zm(t,e){return({state:i,dispatch:n})=>{if(i.readOnly)return!1;let s=t(e,i);return s?(n(i.update(s)),!0):!1}}var K$=zm(iA,0);var J$=zm(bk,0);var F$=zm((t,e)=>bk(t,e,tA(e)),0);function _m(t,e){let i=t.languageDataAt("commentTokens",e,1);return i.length?i[0]:{}}var ja=50;function eA(t,{open:e,close:i},n,s){let r=t.sliceDoc(n-ja,n),l=t.sliceDoc(s,s+ja),a=/\s*$/.exec(r)[0].length,o=/^\s*/.exec(l)[0].length,u=r.length-a;if(r.slice(u-e.length,u)==e&&l.slice(o,o+i.length)==i)return{open:{pos:n-a,margin:a&&1},close:{pos:s+o,margin:o&&1}};let c,h;s-n<=2*ja?c=h=t.sliceDoc(n,s):(c=t.sliceDoc(n,n+ja),h=t.sliceDoc(s-ja,s));let f=/^\s*/.exec(c)[0].length,d=/\s*$/.exec(h)[0].length,m=h.length-d-i.length;return c.slice(f,f+e.length)==e&&h.slice(m,m+i.length)==i?{open:{pos:n+f+e.length,margin:/\s/.test(c.charAt(f+e.length))?1:0},close:{pos:s-d-i.length,margin:/\s/.test(h.charAt(m-1))?1:0}}:null}function tA(t){let e=[];for(let i of t.selection.ranges){let n=t.doc.lineAt(i.from),s=i.to<=n.to?n:t.doc.lineAt(i.to);s.from>n.from&&s.from==i.to&&(s=i.to==n.to+1?n:t.doc.lineAt(i.to-1));let r=e.length-1;r>=0&&e[r].to>n.from?e[r].to=s.to:e.push({from:n.from+/^\s*/.exec(n.text)[0].length,to:s.to})}return e}function bk(t,e,i=e.selection.ranges){let n=i.map(r=>_m(e,r.from).block);if(!n.every(r=>r))return null;let s=i.map((r,l)=>eA(e,n[l],r.from,r.to));if(t!=2&&!s.every(r=>r))return{changes:e.changes(i.map((r,l)=>s[l]?[]:[{from:r.from,insert:n[l].open+" "},{from:r.to,insert:" "+n[l].close}]))};if(t!=1&&s.some(r=>r)){let r=[];for(let l=0,a;l<s.length;l++)if(a=s[l]){let o=n[l],{open:u,close:c}=a;r.push({from:u.pos-o.open.length,to:u.pos+u.margin},{from:c.pos-c.margin,to:c.pos+o.close.length})}return{changes:r}}return null}function iA(t,e,i=e.selection.ranges){let n=[],s=-1;for(let{from:r,to:l}of i){let a=n.length,o=1e9,u=_m(e,r).line;if(u){for(let c=r;c<=l;){let h=e.doc.lineAt(c);if(h.from>s&&(r==l||l>h.from)){s=h.from;let f=/^\s*/.exec(h.text)[0].length,d=f==h.length,m=h.text.slice(f,f+u.length)==u?f:-1;f<h.text.length&&f<o&&(o=f),n.push({line:h,comment:m,token:u,indent:f,empty:d,single:!1})}c=h.to+1}if(o<1e9)for(let c=a;c<n.length;c++)n[c].indent<n[c].line.text.length&&(n[c].indent=o);n.length==a+1&&(n[a].single=!0)}}if(t!=2&&n.some(r=>r.comment<0&&(!r.empty||r.single))){let r=[];for(let{line:a,token:o,indent:u,empty:c,single:h}of n)(h||!c)&&r.push({from:a.from+u,insert:o+" "});let l=e.changes(r);return{changes:l,selection:e.selection.map(l,1)}}else if(t!=1&&n.some(r=>r.comment>=0)){let r=[];for(let{line:l,comment:a,token:o}of n)if(a>=0){let u=l.from+a,c=u+o.length;l.text[c-l.from]==" "&&c++,r.push({from:u,to:c})}return{changes:r}}return null}var Cm=Lt.define(),nA=Lt.define(),sA=E.define(),xk=E.define({combine(t){return ya(t,{minDepth:100,newGroupDelay:500,joinToEvent:(e,i)=>i},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,i)=>(n,s)=>e(n,s)||i(n,s)})}}),Sk=si.define({create(){return Es.empty},update(t,e){let i=e.state.facet(xk),n=e.annotation(Cm);if(n){let o=ui.fromTransaction(e,n.selection),u=n.side,c=u==0?t.undone:t.done;return o?c=Nc(c,c.length,i.minDepth,o):c=wk(c,e.startState.selection),new Es(u==0?n.rest:c,u==0?c:n.rest)}let s=e.annotation(nA);if((s=="full"||s=="before")&&(t=t.isolate()),e.annotation(Ze.addToHistory)===!1)return e.changes.empty?t:t.addMapping(e.changes.desc);let r=ui.fromTransaction(e),l=e.annotation(Ze.time),a=e.annotation(Ze.userEvent);return r?t=t.addChanges(r,l,a,i,e):e.selection&&(t=t.addSelection(e.startState.selection,l,a,i.newGroupDelay)),(s=="full"||s=="after")&&(t=t.isolate()),t},toJSON(t){return{done:t.done.map(e=>e.toJSON()),undone:t.undone.map(e=>e.toJSON())}},fromJSON(t){return new Es(t.done.map(ui.fromJSON),t.undone.map(ui.fromJSON))}});function kk(t={}){return[Sk,xk.of(t),D.domEventHandlers({beforeinput(e,i){let n=e.inputType=="historyUndo"?rA:e.inputType=="historyRedo"?lA:null;return n?(e.preventDefault(),n(i)):!1}})]}function vk(t,e){return function({state:i,dispatch:n}){if(!e&&i.readOnly)return!1;let s=i.field(Sk,!1);if(!s)return!1;let r=s.pop(t,i,e);return r?(n(r),!0):!1}}var rA=vk(0,!1),lA=vk(1,!1);var ui=class t{constructor(e,i,n,s,r){this.changes=e,this.effects=i,this.mapped=n,this.startSelection=s,this.selectionsAfter=r}setSelAfter(e){return new t(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,i,n;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(i=this.mapped)===null||i===void 0?void 0:i.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map(s=>s.toJSON())}}static fromJSON(e){return new t(e.changes&&nt.fromJSON(e.changes),[],e.mapped&&Ji.fromJSON(e.mapped),e.startSelection&&A.fromJSON(e.startSelection),e.selectionsAfter.map(A.fromJSON))}static fromTransaction(e,i){let n=Ht;for(let s of e.startState.facet(sA)){let r=s(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new t(e.changes.invert(e.startState.doc),n,void 0,i||e.startState.selection,Ht)}static selection(e){return new t(void 0,Ht,void 0,void 0,e)}};function Nc(t,e,i,n){let s=e+1>i+20?e-i-1:0,r=t.slice(s,e);return r.push(n),r}function aA(t,e){let i=[],n=!1;return t.iterChangedRanges((s,r)=>i.push(s,r)),e.iterChangedRanges((s,r,l,a)=>{for(let o=0;o<i.length;){let u=i[o++],c=i[o++];a>=u&&l<=c&&(n=!0)}}),n}function oA(t,e){return t.ranges.length==e.ranges.length&&t.ranges.filter((i,n)=>i.empty!=e.ranges[n].empty).length===0}function Qk(t,e){return t.length?e.length?t.concat(e):t:e}var Ht=[],uA=200;function wk(t,e){if(t.length){let i=t[t.length-1],n=i.selectionsAfter.slice(Math.max(0,i.selectionsAfter.length-uA));return n.length&&n[n.length-1].eq(e)?t:(n.push(e),Nc(t,t.length-1,1e9,i.setSelAfter(n)))}else return[ui.selection([e])]}function cA(t){let e=t[t.length-1],i=t.slice();return i[t.length-1]=e.setSelAfter(e.selectionsAfter.slice(0,e.selectionsAfter.length-1)),i}function Rm(t,e){if(!t.length)return t;let i=t.length,n=Ht;for(;i;){let s=hA(t[i-1],e,n);if(s.changes&&!s.changes.empty||s.effects.length){let r=t.slice(0,i);return r[i-1]=s,r}else e=s.mapped,i--,n=s.selectionsAfter}return n.length?[ui.selection(n)]:Ht}function hA(t,e,i){let n=Qk(t.selectionsAfter.length?t.selectionsAfter.map(a=>a.map(e)):Ht,i);if(!t.changes)return ui.selection(n);let s=t.changes.map(e),r=e.mapDesc(t.changes,!0),l=t.mapped?t.mapped.composeDesc(r):r;return new ui(s,de.mapEffects(t.effects,e),l,t.startSelection.map(r),n)}var fA=/^(input\.type|delete)($|\.)/,Es=class t{constructor(e,i,n=0,s=void 0){this.done=e,this.undone=i,this.prevTime=n,this.prevUserEvent=s}isolate(){return this.prevTime?new t(this.done,this.undone):this}addChanges(e,i,n,s,r){let l=this.done,a=l[l.length-1];return a&&a.changes&&!a.changes.empty&&e.changes&&(!n||fA.test(n))&&(!a.selectionsAfter.length&&i-this.prevTime<s.newGroupDelay&&s.joinToEvent(r,aA(a.changes,e.changes))||n=="input.type.compose")?l=Nc(l,l.length-1,s.minDepth,new ui(e.changes.compose(a.changes),Qk(de.mapEffects(e.effects,a.changes),a.effects),a.mapped,a.startSelection,Ht)):l=Nc(l,l.length,s.minDepth,e),new t(l,Ht,i,n)}addSelection(e,i,n,s){let r=this.done.length?this.done[this.done.length-1].selectionsAfter:Ht;return r.length>0&&i-this.prevTime<s&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&oA(r[r.length-1],e)?this:new t(wk(this.done,e),this.undone,i,n)}addMapping(e){return new t(Rm(this.done,e),Rm(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,i,n){let s=e==0?this.done:this.undone;if(s.length==0)return null;let r=s[s.length-1],l=r.selectionsAfter[0]||i.selection;if(n&&r.selectionsAfter.length)return i.update({selection:r.selectionsAfter[r.selectionsAfter.length-1],annotations:Cm.of({side:e,rest:cA(s),selection:l}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:!0});if(r.changes){let a=s.length==1?Ht:s.slice(0,s.length-1);return r.mapped&&(a=Rm(a,r.mapped)),i.update({changes:r.changes,selection:r.startSelection,effects:r.effects,annotations:Cm.of({side:e,rest:a,selection:l}),filter:!1,userEvent:e==0?"undo":"redo",scrollIntoView:!0})}else return null}};Es.empty=new Es(Ht,Ht);function Jr(t,e){return A.create(t.ranges.map(e),t.mainIndex)}function Ci(t,e){return t.update({selection:e,scrollIntoView:!0,userEvent:"select"})}function ci({state:t,dispatch:e},i){let n=Jr(t.selection,i);return n.eq(t.selection,!0)?!1:(e(Ci(t,n)),!0)}function qc(t,e){return A.cursor(e?t.to:t.from)}function Tk(t,e){return ci(t,i=>i.empty?t.moveByChar(i,e):qc(i,e))}function Je(t){return t.textDirectionAt(t.state.selection.main.head)==ke.LTR}var Pk=t=>Tk(t,!Je(t)),$k=t=>Tk(t,Je(t));function Ak(t,e){return ci(t,i=>i.empty?t.moveByGroup(i,e):qc(i,e))}var dA=t=>Ak(t,!Je(t)),pA=t=>Ak(t,Je(t));var o5=typeof Intl<"u"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function mA(t,e,i){if(e.type.prop(i))return!0;let n=e.to-e.from;return n&&(n>2||/[^\s,.;:]/.test(t.sliceDoc(e.from,e.to)))||e.firstChild}function Yc(t,e,i){let n=oi(t).resolveInner(e.head),s=i?_.closedBy:_.openedBy;for(let o=e.head;;){let u=i?n.childAfter(o):n.childBefore(o);if(!u)break;mA(t,u,s)?n=u:o=i?u.to:u.from}let r=n.type.prop(s),l,a;return r&&(l=i?Ms(t,n.from,1):Ms(t,n.to,-1))&&l.matched?a=i?l.end.to:l.end.from:a=i?n.to:n.from,A.cursor(a,i?-1:1)}var OA=t=>ci(t,e=>Yc(t.state,e,!Je(t))),gA=t=>ci(t,e=>Yc(t.state,e,Je(t)));function Rk(t,e){return ci(t,i=>{if(!i.empty)return qc(i,e);let n=t.moveVertically(i,e);return n.head!=i.head?n:t.moveToLineBoundary(i,e)})}var Ck=t=>Rk(t,!1),Mk=t=>Rk(t,!0);function Ek(t){let e=t.scrollDOM.clientHeight<t.scrollDOM.scrollHeight-2,i=0,n=0,s;if(e){for(let r of t.state.facet(D.scrollMargins)){let l=r(t);l?.top&&(i=Math.max(l?.top,i)),l?.bottom&&(n=Math.max(l?.bottom,n))}s=t.scrollDOM.clientHeight-i-n}else s=(t.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:i,marginBottom:n,selfScroll:e,height:Math.max(t.defaultLineHeight,s-5)}}function zk(t,e){let i=Ek(t),{state:n}=t,s=Jr(n.selection,l=>l.empty?t.moveVertically(l,e,i.height):qc(l,e));if(s.eq(n.selection))return!1;let r;if(i.selfScroll){let l=t.coordsAtPos(n.selection.main.head),a=t.scrollDOM.getBoundingClientRect(),o=a.top+i.marginTop,u=a.bottom-i.marginBottom;l&&l.top>o&&l.bottom<u&&(r=D.scrollIntoView(s.main.head,{y:"start",yMargin:l.top-o}))}return t.dispatch(Ci(n,s),{effects:r}),!0}var hk=t=>zk(t,!1),Mm=t=>zk(t,!0);function Vn(t,e,i){let n=t.lineBlockAt(e.head),s=t.moveToLineBoundary(e,i);if(s.head==e.head&&s.head!=(i?n.to:n.from)&&(s=t.moveToLineBoundary(e,i,!1)),!i&&s.head==n.from&&n.length){let r=/^\s*/.exec(t.state.sliceDoc(n.from,Math.min(n.from+100,n.to)))[0].length;r&&e.head!=n.from+r&&(s=A.cursor(n.from+r))}return s}var yA=t=>ci(t,e=>Vn(t,e,!0)),bA=t=>ci(t,e=>Vn(t,e,!1)),xA=t=>ci(t,e=>Vn(t,e,!Je(t))),SA=t=>ci(t,e=>Vn(t,e,Je(t))),kA=t=>ci(t,e=>A.cursor(t.lineBlockAt(e.head).from,1)),vA=t=>ci(t,e=>A.cursor(t.lineBlockAt(e.head).to,-1));function QA(t,e,i){let n=!1,s=Jr(t.selection,r=>{let l=Ms(t,r.head,-1)||Ms(t,r.head,1)||r.head>0&&Ms(t,r.head-1,1)||r.head<t.doc.length&&Ms(t,r.head+1,-1);if(!l||!l.end)return r;n=!0;let a=l.start.from==r.head?l.end.to:l.end.from;return i?A.range(r.anchor,a):A.cursor(a)});return n?(e(Ci(t,s)),!0):!1}var wA=({state:t,dispatch:e})=>QA(t,e,!1);function Kt(t,e){let i=Jr(t.state.selection,n=>{let s=e(n);return A.range(n.anchor,s.head,s.goalColumn,s.bidiLevel||void 0)});return i.eq(t.state.selection)?!1:(t.dispatch(Ci(t.state,i)),!0)}function _k(t,e){return Kt(t,i=>t.moveByChar(i,e))}var Zk=t=>_k(t,!Je(t)),Xk=t=>_k(t,Je(t));function Dk(t,e){return Kt(t,i=>t.moveByGroup(i,e))}var TA=t=>Dk(t,!Je(t)),PA=t=>Dk(t,Je(t));var $A=t=>Kt(t,e=>Yc(t.state,e,!Je(t))),AA=t=>Kt(t,e=>Yc(t.state,e,Je(t)));function Nk(t,e){return Kt(t,i=>t.moveVertically(i,e))}var qk=t=>Nk(t,!1),Yk=t=>Nk(t,!0);function Bk(t,e){return Kt(t,i=>t.moveVertically(i,e,Ek(t).height))}var fk=t=>Bk(t,!1),dk=t=>Bk(t,!0),RA=t=>Kt(t,e=>Vn(t,e,!0)),CA=t=>Kt(t,e=>Vn(t,e,!1)),MA=t=>Kt(t,e=>Vn(t,e,!Je(t))),EA=t=>Kt(t,e=>Vn(t,e,Je(t))),zA=t=>Kt(t,e=>A.cursor(t.lineBlockAt(e.head).from)),_A=t=>Kt(t,e=>A.cursor(t.lineBlockAt(e.head).to)),pk=({state:t,dispatch:e})=>(e(Ci(t,{anchor:0})),!0),mk=({state:t,dispatch:e})=>(e(Ci(t,{anchor:t.doc.length})),!0),Ok=({state:t,dispatch:e})=>(e(Ci(t,{anchor:t.selection.main.anchor,head:0})),!0),gk=({state:t,dispatch:e})=>(e(Ci(t,{anchor:t.selection.main.anchor,head:t.doc.length})),!0),ZA=({state:t,dispatch:e})=>(e(t.update({selection:{anchor:0,head:t.doc.length},userEvent:"select"})),!0),XA=({state:t,dispatch:e})=>{let i=Bc(t).map(({from:n,to:s})=>A.range(n,Math.min(s+1,t.doc.length)));return e(t.update({selection:A.create(i),userEvent:"select"})),!0},DA=({state:t,dispatch:e})=>{let i=Jr(t.selection,n=>{let s=oi(t),r=s.resolveStack(n.from,1);if(n.empty){let l=s.resolveStack(n.from,-1);l.node.from>=r.node.from&&l.node.to<=r.node.to&&(r=l)}for(let l=r;l;l=l.next){let{node:a}=l;if((a.from<n.from&&a.to>=n.to||a.to>n.to&&a.from<=n.from)&&l.next)return A.range(a.to,a.from)}return n});return i.eq(t.selection)?!1:(e(Ci(t,i)),!0)},NA=({state:t,dispatch:e})=>{let i=t.selection,n=null;return i.ranges.length>1?n=A.create([i.main]):i.main.empty||(n=A.create([A.cursor(i.main.head)])),n?(e(Ci(t,n)),!0):!1};function La(t,e){if(t.state.readOnly)return!1;let i="delete.selection",{state:n}=t,s=n.changeByRange(r=>{let{from:l,to:a}=r;if(l==a){let o=e(r);o<l?(i="delete.backward",o=Dc(t,o,!1)):o>l&&(i="delete.forward",o=Dc(t,o,!0)),l=Math.min(l,o),a=Math.max(a,o)}else l=Dc(t,l,!1),a=Dc(t,a,!0);return l==a?{range:r}:{changes:{from:l,to:a},range:A.cursor(l,l<r.head?-1:1)}});return s.changes.empty?!1:(t.dispatch(n.update(s,{scrollIntoView:!0,userEvent:i,effects:i=="delete.selection"?D.announce.of(n.phrase("Selection deleted")):void 0})),!0)}function Dc(t,e,i){if(t instanceof D)for(let n of t.state.facet(D.atomicRanges).map(s=>s(t)))n.between(e,e,(s,r)=>{s<e&&r>e&&(e=i?r:s)});return e}var jk=(t,e,i)=>La(t,n=>{let s=n.from,{state:r}=t,l=r.doc.lineAt(s),a,o;if(i&&!e&&s>l.from&&s<l.from+200&&!/[^ \t]/.test(a=l.text.slice(0,s-l.from))){if(a[a.length-1]=="	")return s-1;let u=Qs(a,r.tabSize),c=u%Ya(r)||Ya(r);for(let h=0;h<c&&a[a.length-1-h]==" ";h++)s--;o=s}else o=Le(l.text,s-l.from,e,e)+l.from,o==s&&l.number!=(e?r.doc.lines:1)?o+=e?1:-1:!e&&/[\ufe00-\ufe0f]/.test(l.text.slice(o-l.from,s-l.from))&&(o=Le(l.text,o-l.from,!1,!1)+l.from);return o}),Em=t=>jk(t,!1,!0);var Lk=t=>jk(t,!0,!1),Vk=(t,e)=>La(t,i=>{let n=i.head,{state:s}=t,r=s.doc.lineAt(n),l=s.charCategorizer(n);for(let a=null;;){if(n==(e?r.to:r.from)){n==i.head&&r.number!=(e?s.doc.lines:1)&&(n+=e?1:-1);break}let o=Le(r.text,n-r.from,e)+r.from,u=r.text.slice(Math.min(n,o)-r.from,Math.max(n,o)-r.from),c=l(u);if(a!=null&&c!=a)break;(u!=" "||n!=i.head)&&(a=c),n=o}return n}),Gk=t=>Vk(t,!1),qA=t=>Vk(t,!0),YA=t=>La(t,e=>{let i=t.lineBlockAt(e.head).to;return e.head<i?i:Math.min(t.state.doc.length,e.head+1)});var BA=t=>La(t,e=>{let i=t.moveToLineBoundary(e,!1).head;return e.head>i?i:Math.max(0,e.head-1)}),jA=t=>La(t,e=>{let i=t.moveToLineBoundary(e,!0).head;return e.head<i?i:Math.min(t.state.doc.length,e.head+1)});var LA=({state:t,dispatch:e})=>{if(t.readOnly)return!1;let i=t.changeByRange(n=>({changes:{from:n.from,to:n.to,insert:G.of(["",""])},range:A.cursor(n.from)}));return e(t.update(i,{scrollIntoView:!0,userEvent:"input"})),!0},VA=({state:t,dispatch:e})=>{if(t.readOnly)return!1;let i=t.changeByRange(n=>{if(!n.empty||n.from==0||n.from==t.doc.length)return{range:n};let s=n.from,r=t.doc.lineAt(s),l=s==r.from?s-1:Le(r.text,s-r.from,!1)+r.from,a=s==r.to?s+1:Le(r.text,s-r.from,!0)+r.from;return{changes:{from:l,to:a,insert:t.doc.slice(s,a).append(t.doc.slice(l,s))},range:A.cursor(a)}});return i.changes.empty?!1:(e(t.update(i,{scrollIntoView:!0,userEvent:"move.character"})),!0)};function Bc(t){let e=[],i=-1;for(let n of t.selection.ranges){let s=t.doc.lineAt(n.from),r=t.doc.lineAt(n.to);if(!n.empty&&n.to==r.from&&(r=t.doc.lineAt(n.to-1)),i>=s.number){let l=e[e.length-1];l.to=r.to,l.ranges.push(n)}else e.push({from:s.from,to:r.to,ranges:[n]});i=r.number+1}return e}function Uk(t,e,i){if(t.readOnly)return!1;let n=[],s=[];for(let r of Bc(t)){if(i?r.to==t.doc.length:r.from==0)continue;let l=t.doc.lineAt(i?r.to+1:r.from-1),a=l.length+1;if(i){n.push({from:r.to,to:l.to},{from:r.from,insert:l.text+t.lineBreak});for(let o of r.ranges)s.push(A.range(Math.min(t.doc.length,o.anchor+a),Math.min(t.doc.length,o.head+a)))}else{n.push({from:l.from,to:r.from},{from:r.to,insert:t.lineBreak+l.text});for(let o of r.ranges)s.push(A.range(o.anchor-a,o.head-a))}}return n.length?(e(t.update({changes:n,scrollIntoView:!0,selection:A.create(s,t.selection.mainIndex),userEvent:"move.line"})),!0):!1}var GA=({state:t,dispatch:e})=>Uk(t,e,!1),UA=({state:t,dispatch:e})=>Uk(t,e,!0);function Wk(t,e,i){if(t.readOnly)return!1;let n=[];for(let s of Bc(t))i?n.push({from:s.from,insert:t.doc.slice(s.from,s.to)+t.lineBreak}):n.push({from:s.to,insert:t.lineBreak+t.doc.slice(s.from,s.to)});return e(t.update({changes:n,scrollIntoView:!0,userEvent:"input.copyline"})),!0}var WA=({state:t,dispatch:e})=>Wk(t,e,!1),IA=({state:t,dispatch:e})=>Wk(t,e,!0),HA=t=>{if(t.state.readOnly)return!1;let{state:e}=t,i=e.changes(Bc(e).map(({from:s,to:r})=>(s>0?s--:r<e.doc.length&&r++,{from:s,to:r}))),n=Jr(e.selection,s=>{let r;if(t.lineWrapping){let l=t.lineBlockAt(s.head),a=t.coordsAtPos(s.head,s.assoc||1);a&&(r=l.bottom+t.documentTop-a.bottom+t.defaultLineHeight/2)}return t.moveVertically(s,!0,r)}).map(i);return t.dispatch({changes:i,selection:n,scrollIntoView:!0,userEvent:"delete.line"}),!0};function KA(t,e){if(/\(\)|\[\]|\{\}/.test(t.sliceDoc(e-1,e+1)))return{from:e,to:e};let i=oi(t).resolveInner(e),n=i.childBefore(e),s=i.childAfter(e),r;return n&&s&&n.to<=e&&s.from>=e&&(r=n.type.prop(_.closedBy))&&r.indexOf(s.name)>-1&&t.doc.lineAt(n.to).from==t.doc.lineAt(s.from).from&&!/\S/.test(t.sliceDoc(n.to,s.from))?{from:n.to,to:s.from}:null}var yk=Ik(!1),JA=Ik(!0);function Ik(t){return({state:e,dispatch:i})=>{if(e.readOnly)return!1;let n=e.changeByRange(s=>{let{from:r,to:l}=s,a=e.doc.lineAt(r),o=!t&&r==l&&KA(e,r);t&&(r=l=(l<=a.to?a:e.doc.lineAt(l)).to);let u=new Cs(e,{simulateBreak:r,simulateDoubleBreak:!!o}),c=Pm(u,r);for(c==null&&(c=Qs(/^\s*/.exec(e.doc.lineAt(r).text)[0],e.tabSize));l<a.to&&/\s/.test(a.text[l-a.from]);)l++;o?{from:r,to:l}=o:r>a.from&&r<a.from+100&&!/\S/.test(a.text.slice(0,r))&&(r=a.from);let h=["",Ba(e,c)];return o&&h.push(Ba(e,u.lineIndent(a.from,-1))),{changes:{from:r,to:l,insert:G.of(h)},range:A.cursor(r+1+h[1].length)}});return i(e.update(n,{scrollIntoView:!0,userEvent:"input"})),!0}}function Zm(t,e){let i=-1;return t.changeByRange(n=>{let s=[];for(let l=n.from;l<=n.to;){let a=t.doc.lineAt(l);a.number>i&&(n.empty||n.to>a.from)&&(e(a,s,n),i=a.number),l=a.to+1}let r=t.changes(s);return{changes:s,range:A.range(r.mapPos(n.anchor,1),r.mapPos(n.head,1))}})}var FA=({state:t,dispatch:e})=>{if(t.readOnly)return!1;let i=Object.create(null),n=new Cs(t,{overrideIndentation:r=>{let l=i[r];return l??-1}}),s=Zm(t,(r,l,a)=>{let o=Pm(n,r.from);if(o==null)return;/\S/.test(r.text)||(o=0);let u=/^\s*/.exec(r.text)[0],c=Ba(t,o);(u!=c||a.from<r.from+u.length)&&(i[r.from]=o,l.push({from:r.from,to:r.from+u.length,insert:c}))});return s.changes.empty||e(t.update(s,{userEvent:"indent"})),!0},Hk=({state:t,dispatch:e})=>t.readOnly?!1:(e(t.update(Zm(t,(i,n)=>{n.push({from:i.from,insert:t.facet(Zc)})}),{userEvent:"input.indent"})),!0),Kk=({state:t,dispatch:e})=>t.readOnly?!1:(e(t.update(Zm(t,(i,n)=>{let s=/^\s*/.exec(i.text)[0];if(!s)return;let r=Qs(s,t.tabSize),l=0,a=Ba(t,Math.max(0,r-Ya(t)));for(;l<s.length&&l<a.length&&s.charCodeAt(l)==a.charCodeAt(l);)l++;n.push({from:i.from+l,to:i.from+s.length,insert:a.slice(l)})}),{userEvent:"delete.dedent"})),!0),eR=t=>(t.setTabFocusMode(),!0);var tR=[{key:"Ctrl-b",run:Pk,shift:Zk,preventDefault:!0},{key:"Ctrl-f",run:$k,shift:Xk},{key:"Ctrl-p",run:Ck,shift:qk},{key:"Ctrl-n",run:Mk,shift:Yk},{key:"Ctrl-a",run:kA,shift:zA},{key:"Ctrl-e",run:vA,shift:_A},{key:"Ctrl-d",run:Lk},{key:"Ctrl-h",run:Em},{key:"Ctrl-k",run:YA},{key:"Ctrl-Alt-h",run:Gk},{key:"Ctrl-o",run:LA},{key:"Ctrl-t",run:VA},{key:"Ctrl-v",run:Mm}],iR=[{key:"ArrowLeft",run:Pk,shift:Zk,preventDefault:!0},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:dA,shift:TA,preventDefault:!0},{mac:"Cmd-ArrowLeft",run:xA,shift:MA,preventDefault:!0},{key:"ArrowRight",run:$k,shift:Xk,preventDefault:!0},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:pA,shift:PA,preventDefault:!0},{mac:"Cmd-ArrowRight",run:SA,shift:EA,preventDefault:!0},{key:"ArrowUp",run:Ck,shift:qk,preventDefault:!0},{mac:"Cmd-ArrowUp",run:pk,shift:Ok},{mac:"Ctrl-ArrowUp",run:hk,shift:fk},{key:"ArrowDown",run:Mk,shift:Yk,preventDefault:!0},{mac:"Cmd-ArrowDown",run:mk,shift:gk},{mac:"Ctrl-ArrowDown",run:Mm,shift:dk},{key:"PageUp",run:hk,shift:fk},{key:"PageDown",run:Mm,shift:dk},{key:"Home",run:bA,shift:CA,preventDefault:!0},{key:"Mod-Home",run:pk,shift:Ok},{key:"End",run:yA,shift:RA,preventDefault:!0},{key:"Mod-End",run:mk,shift:gk},{key:"Enter",run:yk,shift:yk},{key:"Mod-a",run:ZA},{key:"Backspace",run:Em,shift:Em},{key:"Delete",run:Lk},{key:"Mod-Backspace",mac:"Alt-Backspace",run:Gk},{key:"Mod-Delete",mac:"Alt-Delete",run:qA},{mac:"Mod-Backspace",run:BA},{mac:"Mod-Delete",run:jA}].concat(tR.map(t=>({mac:t.key,run:t.run,shift:t.shift}))),Jk=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:OA,shift:$A},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:gA,shift:AA},{key:"Alt-ArrowUp",run:GA},{key:"Shift-Alt-ArrowUp",run:WA},{key:"Alt-ArrowDown",run:UA},{key:"Shift-Alt-ArrowDown",run:IA},{key:"Escape",run:NA},{key:"Mod-Enter",run:JA},{key:"Alt-l",mac:"Ctrl-l",run:XA},{key:"Mod-i",run:DA,preventDefault:!0},{key:"Mod-[",run:Kk},{key:"Mod-]",run:Hk},{key:"Mod-Alt-\\",run:FA},{key:"Shift-Mod-k",run:HA},{key:"Shift-Mod-\\",run:wA},{key:"Mod-/",run:H$},{key:"Alt-A",run:J$},{key:"Ctrl-m",mac:"Shift-Alt-m",run:eR}].concat(iR),Fk={key:"Tab",run:Hk,shift:Kk};var Nm=class t{constructor(e,i,n,s,r,l,a,o,u,c=0,h){this.p=e,this.stack=i,this.state=n,this.reducePos=s,this.pos=r,this.score=l,this.buffer=a,this.bufferBase=o,this.curContext=u,this.lookAhead=c,this.parent=h}toString(){return`[${this.stack.filter((e,i)=>i%3==0).concat(this.state)}]@${this.pos}${this.score?"!"+this.score:""}`}static start(e,i,n=0){let s=e.parser.context;return new t(e,[],i,n,n,0,[],0,s?new jc(s,s.start):null,0,null)}get context(){return this.curContext?this.curContext.context:null}pushState(e,i){this.stack.push(this.state,i,this.bufferBase+this.buffer.length),this.state=e}reduce(e){var i;let n=e>>19,s=e&65535,{parser:r}=this.p,l=this.reducePos<this.pos-25;l&&this.setLookAhead(this.pos);let a=r.dynamicPrecedence(s);if(a&&(this.score+=a),n==0){this.pushState(r.getGoto(this.state,s,!0),this.reducePos),s<r.minRepeatTerm&&this.storeNode(s,this.reducePos,this.reducePos,l?8:4,!0),this.reduceContext(s,this.reducePos);return}let o=this.stack.length-(n-1)*3-(e&262144?6:0),u=o?this.stack[o-2]:this.p.ranges[0].from,c=this.reducePos-u;c>=2e3&&!(!((i=this.p.parser.nodeSet.types[s])===null||i===void 0)&&i.isAnonymous)&&(u==this.p.lastBigReductionStart?(this.p.bigReductionCount++,this.p.lastBigReductionSize=c):this.p.lastBigReductionSize<c&&(this.p.bigReductionCount=1,this.p.lastBigReductionStart=u,this.p.lastBigReductionSize=c));let h=o?this.stack[o-1]:0,f=this.bufferBase+this.buffer.length-h;if(s<r.minRepeatTerm||e&131072){let d=r.stateFlag(this.state,1)?this.pos:this.reducePos;this.storeNode(s,u,d,f+4,!0)}if(e&262144)this.state=this.stack[o];else{let d=this.stack[o-3];this.state=r.getGoto(d,s,!0)}for(;this.stack.length>o;)this.stack.pop();this.reduceContext(s,u)}storeNode(e,i,n,s=4,r=!1){if(e==0&&(!this.stack.length||this.stack[this.stack.length-1]<this.buffer.length+this.bufferBase)){let l=this,a=this.buffer.length;if(a==0&&l.parent&&(a=l.bufferBase-l.parent.bufferBase,l=l.parent),a>0&&l.buffer[a-4]==0&&l.buffer[a-1]>-1){if(i==n)return;if(l.buffer[a-2]>=i){l.buffer[a-2]=n;return}}}if(!r||this.pos==n)this.buffer.push(e,i,n,s);else{let l=this.buffer.length;if(l>0&&this.buffer[l-4]!=0){let a=!1;for(let o=l;o>0&&this.buffer[o-2]>n;o-=4)if(this.buffer[o-1]>=0){a=!0;break}if(a)for(;l>0&&this.buffer[l-2]>n;)this.buffer[l]=this.buffer[l-4],this.buffer[l+1]=this.buffer[l-3],this.buffer[l+2]=this.buffer[l-2],this.buffer[l+3]=this.buffer[l-1],l-=4,s>4&&(s-=4)}this.buffer[l]=e,this.buffer[l+1]=i,this.buffer[l+2]=n,this.buffer[l+3]=s}}shift(e,i,n,s){if(e&131072)this.pushState(e&65535,this.pos);else if((e&262144)==0){let r=e,{parser:l}=this.p;(s>this.pos||i<=l.maxNode)&&(this.pos=s,l.stateFlag(r,1)||(this.reducePos=s)),this.pushState(r,n),this.shiftContext(i,n),i<=l.maxNode&&this.buffer.push(i,n,s,4)}else this.pos=s,this.shiftContext(i,n),i<=this.p.parser.maxNode&&this.buffer.push(i,n,s,4)}apply(e,i,n,s){e&65536?this.reduce(e):this.shift(e,i,n,s)}useNode(e,i){let n=this.p.reused.length-1;(n<0||this.p.reused[n]!=e)&&(this.p.reused.push(e),n++);let s=this.pos;this.reducePos=this.pos=s+e.length,this.pushState(i,s),this.buffer.push(n,s,this.reducePos,-1),this.curContext&&this.updateContext(this.curContext.tracker.reuse(this.curContext.context,e,this,this.p.stream.reset(this.pos-e.length)))}split(){let e=this,i=e.buffer.length;for(;i>0&&e.buffer[i-2]>e.reducePos;)i-=4;let n=e.buffer.slice(i),s=e.bufferBase+i;for(;e&&s==e.bufferBase;)e=e.parent;return new t(this.p,this.stack.slice(),this.state,this.reducePos,this.pos,this.score,n,s,this.curContext,this.lookAhead,e)}recoverByDelete(e,i){let n=e<=this.p.parser.maxNode;n&&this.storeNode(e,this.pos,i,4),this.storeNode(0,this.pos,i,n?8:4),this.pos=this.reducePos=i,this.score-=190}canShift(e){for(let i=new qm(this);;){let n=this.p.parser.stateSlot(i.state,4)||this.p.parser.hasAction(i.state,e);if(n==0)return!1;if((n&65536)==0)return!0;i.reduce(n)}}recoverByInsert(e){if(this.stack.length>=300)return[];let i=this.p.parser.nextStates(this.state);if(i.length>8||this.stack.length>=120){let s=[];for(let r=0,l;r<i.length;r+=2)(l=i[r+1])!=this.state&&this.p.parser.hasAction(l,e)&&s.push(i[r],l);if(this.stack.length<120)for(let r=0;s.length<8&&r<i.length;r+=2){let l=i[r+1];s.some((a,o)=>o&1&&a==l)||s.push(i[r],l)}i=s}let n=[];for(let s=0;s<i.length&&n.length<4;s+=2){let r=i[s+1];if(r==this.state)continue;let l=this.split();l.pushState(r,this.pos),l.storeNode(0,l.pos,l.pos,4,!0),l.shiftContext(i[s],this.pos),l.reducePos=this.pos,l.score-=200,n.push(l)}return n}forceReduce(){let{parser:e}=this.p,i=e.stateSlot(this.state,5);if((i&65536)==0)return!1;if(!e.validAction(this.state,i)){let n=i>>19,s=i&65535,r=this.stack.length-n*3;if(r<0||e.getGoto(this.stack[r],s,!1)<0){let l=this.findForcedReduction();if(l==null)return!1;i=l}this.storeNode(0,this.pos,this.pos,4,!0),this.score-=100}return this.reducePos=this.pos,this.reduce(i),!0}findForcedReduction(){let{parser:e}=this.p,i=[],n=(s,r)=>{if(!i.includes(s))return i.push(s),e.allActions(s,l=>{if(!(l&393216))if(l&65536){let a=(l>>19)-r;if(a>1){let o=l&65535,u=this.stack.length-a*3;if(u>=0&&e.getGoto(this.stack[u],o,!1)>=0)return a<<19|65536|o}}else{let a=n(l,r+1);if(a!=null)return a}})};return n(this.state,0)}forceAll(){for(;!this.p.parser.stateFlag(this.state,2);)if(!this.forceReduce()){this.storeNode(0,this.pos,this.pos,4,!0);break}return this}get deadEnd(){if(this.stack.length!=3)return!1;let{parser:e}=this.p;return e.data[e.stateSlot(this.state,1)]==65535&&!e.stateSlot(this.state,4)}restart(){this.storeNode(0,this.pos,this.pos,4,!0),this.state=this.stack[0],this.stack.length=0}sameState(e){if(this.state!=e.state||this.stack.length!=e.stack.length)return!1;for(let i=0;i<this.stack.length;i+=3)if(this.stack[i]!=e.stack[i])return!1;return!0}get parser(){return this.p.parser}dialectEnabled(e){return this.p.parser.dialect.flags[e]}shiftContext(e,i){this.curContext&&this.updateContext(this.curContext.tracker.shift(this.curContext.context,e,this,this.p.stream.reset(i)))}reduceContext(e,i){this.curContext&&this.updateContext(this.curContext.tracker.reduce(this.curContext.context,e,this,this.p.stream.reset(i)))}emitContext(){let e=this.buffer.length-1;(e<0||this.buffer[e]!=-3)&&this.buffer.push(this.curContext.hash,this.pos,this.pos,-3)}emitLookAhead(){let e=this.buffer.length-1;(e<0||this.buffer[e]!=-4)&&this.buffer.push(this.lookAhead,this.pos,this.pos,-4)}updateContext(e){if(e!=this.curContext.context){let i=new jc(this.curContext.tracker,e);i.hash!=this.curContext.hash&&this.emitContext(),this.curContext=i}}setLookAhead(e){e>this.lookAhead&&(this.emitLookAhead(),this.lookAhead=e)}close(){this.curContext&&this.curContext.tracker.strict&&this.emitContext(),this.lookAhead>0&&this.emitLookAhead()}},jc=class{constructor(e,i){this.tracker=e,this.context=i,this.hash=e.strict?e.hash(i):0}},qm=class{constructor(e){this.start=e,this.state=e.state,this.stack=e.stack,this.base=this.stack.length}reduce(e){let i=e&65535,n=e>>19;n==0?(this.stack==this.start.stack&&(this.stack=this.stack.slice()),this.stack.push(this.state,0,0),this.base+=3):this.base-=(n-1)*3;let s=this.start.p.parser.getGoto(this.stack[this.base-3],i,!0);this.state=s}},Ym=class t{constructor(e,i,n){this.stack=e,this.pos=i,this.index=n,this.buffer=e.buffer,this.index==0&&this.maybeNext()}static create(e,i=e.bufferBase+e.buffer.length){return new t(e,i,i-e.bufferBase)}maybeNext(){let e=this.stack.parent;e!=null&&(this.index=this.stack.bufferBase-e.bufferBase,this.stack=e,this.buffer=e.buffer)}get id(){return this.buffer[this.index-4]}get start(){return this.buffer[this.index-3]}get end(){return this.buffer[this.index-2]}get size(){return this.buffer[this.index-1]}next(){this.index-=4,this.pos-=4,this.index==0&&this.maybeNext()}fork(){return new t(this.stack,this.pos,this.index)}};function Va(t,e=Uint16Array){if(typeof t!="string")return t;let i=null;for(let n=0,s=0;n<t.length;){let r=0;for(;;){let l=t.charCodeAt(n++),a=!1;if(l==126){r=65535;break}l>=92&&l--,l>=34&&l--;let o=l-32;if(o>=46&&(o-=46,a=!0),r+=o,a)break;r*=46}i?i[s++]=r:i=new e(r)}return i}var Fr=class{constructor(){this.start=-1,this.value=-1,this.end=-1,this.extended=-1,this.lookAhead=0,this.mask=0,this.context=0}},ev=new Fr,Bm=class{constructor(e,i){this.input=e,this.ranges=i,this.chunk="",this.chunkOff=0,this.chunk2="",this.chunk2Pos=0,this.next=-1,this.token=ev,this.rangeIndex=0,this.pos=this.chunkPos=i[0].from,this.range=i[0],this.end=i[i.length-1].to,this.readNext()}resolveOffset(e,i){let n=this.range,s=this.rangeIndex,r=this.pos+e;for(;r<n.from;){if(!s)return null;let l=this.ranges[--s];r-=n.from-l.to,n=l}for(;i<0?r>n.to:r>=n.to;){if(s==this.ranges.length-1)return null;let l=this.ranges[++s];r+=l.from-n.to,n=l}return r}clipPos(e){if(e>=this.range.from&&e<this.range.to)return e;for(let i of this.ranges)if(i.to>e)return Math.max(e,i.from);return this.end}peek(e){let i=this.chunkOff+e,n,s;if(i>=0&&i<this.chunk.length)n=this.pos+e,s=this.chunk.charCodeAt(i);else{let r=this.resolveOffset(e,1);if(r==null)return-1;if(n=r,n>=this.chunk2Pos&&n<this.chunk2Pos+this.chunk2.length)s=this.chunk2.charCodeAt(n-this.chunk2Pos);else{let l=this.rangeIndex,a=this.range;for(;a.to<=n;)a=this.ranges[++l];this.chunk2=this.input.chunk(this.chunk2Pos=n),n+this.chunk2.length>a.to&&(this.chunk2=this.chunk2.slice(0,a.to-n)),s=this.chunk2.charCodeAt(0)}}return n>=this.token.lookAhead&&(this.token.lookAhead=n+1),s}acceptToken(e,i=0){let n=i?this.resolveOffset(i,-1):this.pos;if(n==null||n<this.token.start)throw new RangeError("Token end out of bounds");this.token.value=e,this.token.end=n}acceptTokenTo(e,i){this.token.value=e,this.token.end=i}getChunk(){if(this.pos>=this.chunk2Pos&&this.pos<this.chunk2Pos+this.chunk2.length){let{chunk:e,chunkPos:i}=this;this.chunk=this.chunk2,this.chunkPos=this.chunk2Pos,this.chunk2=e,this.chunk2Pos=i,this.chunkOff=this.pos-this.chunkPos}else{this.chunk2=this.chunk,this.chunk2Pos=this.chunkPos;let e=this.input.chunk(this.pos),i=this.pos+e.length;this.chunk=i>this.range.to?e.slice(0,this.range.to-this.pos):e,this.chunkPos=this.pos,this.chunkOff=0}}readNext(){return this.chunkOff>=this.chunk.length&&(this.getChunk(),this.chunkOff==this.chunk.length)?this.next=-1:this.next=this.chunk.charCodeAt(this.chunkOff)}advance(e=1){for(this.chunkOff+=e;this.pos+e>=this.range.to;){if(this.rangeIndex==this.ranges.length-1)return this.setDone();e-=this.range.to-this.pos,this.range=this.ranges[++this.rangeIndex],this.pos=this.range.from}return this.pos+=e,this.pos>=this.token.lookAhead&&(this.token.lookAhead=this.pos+1),this.readNext()}setDone(){return this.pos=this.chunkPos=this.end,this.range=this.ranges[this.rangeIndex=this.ranges.length-1],this.chunk="",this.next=-1}reset(e,i){if(i?(this.token=i,i.start=e,i.lookAhead=e+1,i.value=i.extended=-1):this.token=ev,this.pos!=e){if(this.pos=e,e==this.end)return this.setDone(),this;for(;e<this.range.from;)this.range=this.ranges[--this.rangeIndex];for(;e>=this.range.to;)this.range=this.ranges[++this.rangeIndex];e>=this.chunkPos&&e<this.chunkPos+this.chunk.length?this.chunkOff=e-this.chunkPos:(this.chunk="",this.chunkOff=0),this.readNext()}return this}read(e,i){if(e>=this.chunkPos&&i<=this.chunkPos+this.chunk.length)return this.chunk.slice(e-this.chunkPos,i-this.chunkPos);if(e>=this.chunk2Pos&&i<=this.chunk2Pos+this.chunk2.length)return this.chunk2.slice(e-this.chunk2Pos,i-this.chunk2Pos);if(e>=this.range.from&&i<=this.range.to)return this.input.read(e,i);let n="";for(let s of this.ranges){if(s.from>=i)break;s.to>e&&(n+=this.input.read(Math.max(s.from,e),Math.min(s.to,i)))}return n}},Gn=class{constructor(e,i){this.data=e,this.id=i}token(e,i){let{parser:n}=i.p;rv(this.data,e,i,this.id,n.data,n.tokenPrecTable)}};Gn.prototype.contextual=Gn.prototype.fallback=Gn.prototype.extend=!1;var Mi=class{constructor(e,i,n){this.precTable=i,this.elseToken=n,this.data=typeof e=="string"?Va(e):e}token(e,i){let n=e.pos,s=0;for(;;){let r=e.next<0,l=e.resolveOffset(1,1);if(rv(this.data,e,i,0,this.data,this.precTable),e.token.value>-1)break;if(this.elseToken==null)return;if(r||s++,l==null)break;e.reset(l,e.token)}s&&(e.reset(n,e.token),e.acceptToken(this.elseToken,s))}};Mi.prototype.contextual=Gn.prototype.fallback=Gn.prototype.extend=!1;var Xe=class{constructor(e,i={}){this.token=e,this.contextual=!!i.contextual,this.fallback=!!i.fallback,this.extend=!!i.extend}};function rv(t,e,i,n,s,r){let l=0,a=1<<n,{dialect:o}=i.p.parser;e:for(;(a&t[l])!=0;){let u=t[l+1];for(let d=l+3;d<u;d+=2)if((t[d+1]&a)>0){let m=t[d];if(o.allows(m)&&(e.token.value==-1||e.token.value==m||sR(m,e.token.value,s,r))){e.acceptToken(m);break}}let c=e.next,h=0,f=t[l+2];if(e.next<0&&f>h&&t[u+f*3-3]==65535){l=t[u+f*3-1];continue e}for(;h<f;){let d=h+f>>1,m=u+d+(d<<1),g=t[m],x=t[m+1]||65536;if(c<g)f=d;else if(c>=x)h=d+1;else{l=t[m+2],e.advance();continue e}}break}}function tv(t,e,i){for(let n=e,s;(s=t[n])!=65535;n++)if(s==i)return n-e;return-1}function sR(t,e,i,n){let s=tv(i,n,e);return s<0||tv(i,n,t)<s}var Rt=typeof process<"u"&&process.env&&/\bparse\b/.test(process.env.LOG),Xm=null;function iv(t,e,i){let n=t.cursor(re.IncludeAnonymous);for(n.moveTo(e);;)if(!(i<0?n.childBefore(e):n.childAfter(e)))for(;;){if((i<0?n.to<e:n.from>e)&&!n.type.isError)return i<0?Math.max(0,Math.min(n.to-1,e-25)):Math.min(t.length,Math.max(n.from+1,e+25));if(i<0?n.prevSibling():n.nextSibling())break;if(!n.parent())return i<0?0:t.length}}var jm=class{constructor(e,i){this.fragments=e,this.nodeSet=i,this.i=0,this.fragment=null,this.safeFrom=-1,this.safeTo=-1,this.trees=[],this.start=[],this.index=[],this.nextFragment()}nextFragment(){let e=this.fragment=this.i==this.fragments.length?null:this.fragments[this.i++];if(e){for(this.safeFrom=e.openStart?iv(e.tree,e.from+e.offset,1)-e.offset:e.from,this.safeTo=e.openEnd?iv(e.tree,e.to+e.offset,-1)-e.offset:e.to;this.trees.length;)this.trees.pop(),this.start.pop(),this.index.pop();this.trees.push(e.tree),this.start.push(-e.offset),this.index.push(0),this.nextStart=this.safeFrom}else this.nextStart=1e9}nodeAt(e){if(e<this.nextStart)return null;for(;this.fragment&&this.safeTo<=e;)this.nextFragment();if(!this.fragment)return null;for(;;){let i=this.trees.length-1;if(i<0)return this.nextFragment(),null;let n=this.trees[i],s=this.index[i];if(s==n.children.length){this.trees.pop(),this.start.pop(),this.index.pop();continue}let r=n.children[s],l=this.start[i]+n.positions[s];if(l>e)return this.nextStart=l,null;if(r instanceof me){if(l==e){if(l<this.safeFrom)return null;let a=l+r.length;if(a<=this.safeTo){let o=r.prop(_.lookAhead);if(!o||a+o<this.fragment.to)return r}}this.index[i]++,l+r.length>=Math.max(this.safeFrom,e)&&(this.trees.push(r),this.start.push(l),this.index.push(0))}else this.index[i]++,this.nextStart=l+r.length}}},Lm=class{constructor(e,i){this.stream=i,this.tokens=[],this.mainToken=null,this.actions=[],this.tokens=e.tokenizers.map(n=>new Fr)}getActions(e){let i=0,n=null,{parser:s}=e.p,{tokenizers:r}=s,l=s.stateSlot(e.state,3),a=e.curContext?e.curContext.hash:0,o=0;for(let u=0;u<r.length;u++){if((1<<u&l)==0)continue;let c=r[u],h=this.tokens[u];if(!(n&&!c.fallback)&&((c.contextual||h.start!=e.pos||h.mask!=l||h.context!=a)&&(this.updateCachedToken(h,c,e),h.mask=l,h.context=a),h.lookAhead>h.end+25&&(o=Math.max(h.lookAhead,o)),h.value!=0)){let f=i;if(h.extended>-1&&(i=this.addActions(e,h.extended,h.end,i)),i=this.addActions(e,h.value,h.end,i),!c.extend&&(n=h,i>f))break}}for(;this.actions.length>i;)this.actions.pop();return o&&e.setLookAhead(o),!n&&e.pos==this.stream.end&&(n=new Fr,n.value=e.p.parser.eofTerm,n.start=n.end=e.pos,i=this.addActions(e,n.value,n.end,i)),this.mainToken=n,this.actions}getMainToken(e){if(this.mainToken)return this.mainToken;let i=new Fr,{pos:n,p:s}=e;return i.start=n,i.end=Math.min(n+1,s.stream.end),i.value=n==s.stream.end?s.parser.eofTerm:0,i}updateCachedToken(e,i,n){let s=this.stream.clipPos(n.pos);if(i.token(this.stream.reset(s,e),n),e.value>-1){let{parser:r}=n.p;for(let l=0;l<r.specialized.length;l++)if(r.specialized[l]==e.value){let a=r.specializers[l](this.stream.read(e.start,e.end),n);if(a>=0&&n.p.parser.dialect.allows(a>>1)){(a&1)==0?e.value=a>>1:e.extended=a>>1;break}}}else e.value=0,e.end=this.stream.clipPos(s+1)}putAction(e,i,n,s){for(let r=0;r<s;r+=3)if(this.actions[r]==e)return s;return this.actions[s++]=e,this.actions[s++]=i,this.actions[s++]=n,s}addActions(e,i,n,s){let{state:r}=e,{parser:l}=e.p,{data:a}=l;for(let o=0;o<2;o++)for(let u=l.stateSlot(r,o?2:1);;u+=3){if(a[u]==65535)if(a[u+1]==1)u=sn(a,u+2);else{s==0&&a[u+1]==2&&(s=this.putAction(sn(a,u+2),i,n,s));break}a[u]==i&&(s=this.putAction(sn(a,u+1),i,n,s))}return s}},Vm=class{constructor(e,i,n,s){this.parser=e,this.input=i,this.ranges=s,this.recovering=0,this.nextStackID=9812,this.minStackPos=0,this.reused=[],this.stoppedAt=null,this.lastBigReductionStart=-1,this.lastBigReductionSize=0,this.bigReductionCount=0,this.stream=new Bm(i,s),this.tokens=new Lm(e,this.stream),this.topTerm=e.top[1];let{from:r}=s[0];this.stacks=[Nm.start(this,e.top[0],r)],this.fragments=n.length&&this.stream.end-r>e.bufferLength*4?new jm(n,e.nodeSet):null}get parsedPos(){return this.minStackPos}advance(){let e=this.stacks,i=this.minStackPos,n=this.stacks=[],s,r;if(this.bigReductionCount>300&&e.length==1){let[l]=e;for(;l.forceReduce()&&l.stack.length&&l.stack[l.stack.length-2]>=this.lastBigReductionStart;);this.bigReductionCount=this.lastBigReductionSize=0}for(let l=0;l<e.length;l++){let a=e[l];for(;;){if(this.tokens.mainToken=null,a.pos>i)n.push(a);else{if(this.advanceStack(a,n,e))continue;{s||(s=[],r=[]),s.push(a);let o=this.tokens.getMainToken(a);r.push(o.value,o.end)}}break}}if(!n.length){let l=s&&rR(s);if(l)return Rt&&console.log("Finish with "+this.stackID(l)),this.stackToTree(l);if(this.parser.strict)throw Rt&&s&&console.log("Stuck with token "+(this.tokens.mainToken?this.parser.getName(this.tokens.mainToken.value):"none")),new SyntaxError("No parse at "+i);this.recovering||(this.recovering=5)}if(this.recovering&&s){let l=this.stoppedAt!=null&&s[0].pos>this.stoppedAt?s[0]:this.runRecovery(s,r,n);if(l)return Rt&&console.log("Force-finish "+this.stackID(l)),this.stackToTree(l.forceAll())}if(this.recovering){let l=this.recovering==1?1:this.recovering*3;if(n.length>l)for(n.sort((a,o)=>o.score-a.score);n.length>l;)n.pop();n.some(a=>a.reducePos>i)&&this.recovering--}else if(n.length>1){e:for(let l=0;l<n.length-1;l++){let a=n[l];for(let o=l+1;o<n.length;o++){let u=n[o];if(a.sameState(u)||a.buffer.length>500&&u.buffer.length>500)if((a.score-u.score||a.buffer.length-u.buffer.length)>0)n.splice(o--,1);else{n.splice(l--,1);continue e}}}n.length>12&&n.splice(12,n.length-12)}this.minStackPos=n[0].pos;for(let l=1;l<n.length;l++)n[l].pos<this.minStackPos&&(this.minStackPos=n[l].pos);return null}stopAt(e){if(this.stoppedAt!=null&&this.stoppedAt<e)throw new RangeError("Can't move stoppedAt forward");this.stoppedAt=e}advanceStack(e,i,n){let s=e.pos,{parser:r}=this,l=Rt?this.stackID(e)+" -> ":"";if(this.stoppedAt!=null&&s>this.stoppedAt)return e.forceReduce()?e:null;if(this.fragments){let u=e.curContext&&e.curContext.tracker.strict,c=u?e.curContext.hash:0;for(let h=this.fragments.nodeAt(s);h;){let f=this.parser.nodeSet.types[h.type.id]==h.type?r.getGoto(e.state,h.type.id):-1;if(f>-1&&h.length&&(!u||(h.prop(_.contextHash)||0)==c))return e.useNode(h,f),Rt&&console.log(l+this.stackID(e)+` (via reuse of ${r.getName(h.type.id)})`),!0;if(!(h instanceof me)||h.children.length==0||h.positions[0]>0)break;let d=h.children[0];if(d instanceof me&&h.positions[0]==0)h=d;else break}}let a=r.stateSlot(e.state,4);if(a>0)return e.reduce(a),Rt&&console.log(l+this.stackID(e)+` (via always-reduce ${r.getName(a&65535)})`),!0;if(e.stack.length>=8400)for(;e.stack.length>6e3&&e.forceReduce(););let o=this.tokens.getActions(e);for(let u=0;u<o.length;){let c=o[u++],h=o[u++],f=o[u++],d=u==o.length||!n,m=d?e:e.split(),g=this.tokens.mainToken;if(m.apply(c,h,g?g.start:m.pos,f),Rt&&console.log(l+this.stackID(m)+` (via ${(c&65536)==0?"shift":`reduce of ${r.getName(c&65535)}`} for ${r.getName(h)} @ ${s}${m==e?"":", split"})`),d)return!0;m.pos>s?i.push(m):n.push(m)}return!1}advanceFully(e,i){let n=e.pos;for(;;){if(!this.advanceStack(e,null,null))return!1;if(e.pos>n)return nv(e,i),!0}}runRecovery(e,i,n){let s=null,r=!1;for(let l=0;l<e.length;l++){let a=e[l],o=i[l<<1],u=i[(l<<1)+1],c=Rt?this.stackID(a)+" -> ":"";if(a.deadEnd&&(r||(r=!0,a.restart(),Rt&&console.log(c+this.stackID(a)+" (restarted)"),this.advanceFully(a,n))))continue;let h=a.split(),f=c;for(let d=0;h.forceReduce()&&d<10&&(Rt&&console.log(f+this.stackID(h)+" (via force-reduce)"),!this.advanceFully(h,n));d++)Rt&&(f=this.stackID(h)+" -> ");for(let d of a.recoverByInsert(o))Rt&&console.log(c+this.stackID(d)+" (via recover-insert)"),this.advanceFully(d,n);this.stream.end>a.pos?(u==a.pos&&(u++,o=0),a.recoverByDelete(o,u),Rt&&console.log(c+this.stackID(a)+` (via recover-delete ${this.parser.getName(o)})`),nv(a,n)):(!s||s.score<a.score)&&(s=a)}return s}stackToTree(e){return e.close(),me.build({buffer:Ym.create(e),nodeSet:this.parser.nodeSet,topID:this.topTerm,maxBufferLength:this.parser.bufferLength,reused:this.reused,start:this.ranges[0].from,length:e.pos-this.ranges[0].from,minRepeatType:this.parser.minRepeatTerm})}stackID(e){let i=(Xm||(Xm=new WeakMap)).get(e);return i||Xm.set(e,i=String.fromCodePoint(this.nextStackID++)),i+e}};function nv(t,e){for(let i=0;i<e.length;i++){let n=e[i];if(n.pos==t.pos&&n.sameState(t)){e[i].score<t.score&&(e[i]=t);return}}e.push(t)}var Gm=class{constructor(e,i,n){this.source=e,this.flags=i,this.disabled=n}allows(e){return!this.disabled||this.disabled[e]==0}},Dm=t=>t,el=class{constructor(e){this.start=e.start,this.shift=e.shift||Dm,this.reduce=e.reduce||Dm,this.reuse=e.reuse||Dm,this.hash=e.hash||(()=>0),this.strict=e.strict!==!1}},Ei=class t extends Ur{constructor(e){if(super(),this.wrappers=[],e.version!=14)throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);let i=e.nodeNames.split(" ");this.minRepeatTerm=i.length;for(let a=0;a<e.repeatNodeCount;a++)i.push("");let n=Object.keys(e.topRules).map(a=>e.topRules[a][1]),s=[];for(let a=0;a<i.length;a++)s.push([]);function r(a,o,u){s[a].push([o,o.deserialize(String(u))])}if(e.nodeProps)for(let a of e.nodeProps){let o=a[0];typeof o=="string"&&(o=_[o]);for(let u=1;u<a.length;){let c=a[u++];if(c>=0)r(c,o,a[u++]);else{let h=a[u+-c];for(let f=-c;f>0;f--)r(a[u++],o,h);u++}}}this.nodeSet=new _a(i.map((a,o)=>Ge.define({name:o>=this.minRepeatTerm?void 0:a,id:o,props:s[o],top:n.indexOf(o)>-1,error:o==0,skipped:e.skippedNodes&&e.skippedNodes.indexOf(o)>-1}))),e.propSources&&(this.nodeSet=this.nodeSet.extend(...e.propSources)),this.strict=!1,this.bufferLength=1024;let l=Va(e.tokenData);this.context=e.context,this.specializerSpecs=e.specialized||[],this.specialized=new Uint16Array(this.specializerSpecs.length);for(let a=0;a<this.specializerSpecs.length;a++)this.specialized[a]=this.specializerSpecs[a].term;this.specializers=this.specializerSpecs.map(sv),this.states=Va(e.states,Uint32Array),this.data=Va(e.stateData),this.goto=Va(e.goto),this.maxTerm=e.maxTerm,this.tokenizers=e.tokenizers.map(a=>typeof a=="number"?new Gn(l,a):a),this.topRules=e.topRules,this.dialects=e.dialects||{},this.dynamicPrecedences=e.dynamicPrecedences||null,this.tokenPrecTable=e.tokenPrec,this.termNames=e.termNames||null,this.maxNode=this.nodeSet.types.length-1,this.dialect=this.parseDialect(),this.top=this.topRules[Object.keys(this.topRules)[0]]}createParse(e,i,n){let s=new Vm(this,e,i,n);for(let r of this.wrappers)s=r(s,e,i,n);return s}getGoto(e,i,n=!1){let s=this.goto;if(i>=s[0])return-1;for(let r=s[i+1];;){let l=s[r++],a=l&1,o=s[r++];if(a&&n)return o;for(let u=r+(l>>1);r<u;r++)if(s[r]==e)return o;if(a)return-1}}hasAction(e,i){let n=this.data;for(let s=0;s<2;s++)for(let r=this.stateSlot(e,s?2:1),l;;r+=3){if((l=n[r])==65535)if(n[r+1]==1)l=n[r=sn(n,r+2)];else{if(n[r+1]==2)return sn(n,r+2);break}if(l==i||l==0)return sn(n,r+1)}return 0}stateSlot(e,i){return this.states[e*6+i]}stateFlag(e,i){return(this.stateSlot(e,0)&i)>0}validAction(e,i){return!!this.allActions(e,n=>n==i?!0:null)}allActions(e,i){let n=this.stateSlot(e,4),s=n?i(n):void 0;for(let r=this.stateSlot(e,1);s==null;r+=3){if(this.data[r]==65535)if(this.data[r+1]==1)r=sn(this.data,r+2);else break;s=i(sn(this.data,r+1))}return s}nextStates(e){let i=[];for(let n=this.stateSlot(e,1);;n+=3){if(this.data[n]==65535)if(this.data[n+1]==1)n=sn(this.data,n+2);else break;if((this.data[n+2]&1)==0){let s=this.data[n+1];i.some((r,l)=>l&1&&r==s)||i.push(this.data[n],s)}}return i}configure(e){let i=Object.assign(Object.create(t.prototype),this);if(e.props&&(i.nodeSet=this.nodeSet.extend(...e.props)),e.top){let n=this.topRules[e.top];if(!n)throw new RangeError(`Invalid top rule name ${e.top}`);i.top=n}return e.tokenizers&&(i.tokenizers=this.tokenizers.map(n=>{let s=e.tokenizers.find(r=>r.from==n);return s?s.to:n})),e.specializers&&(i.specializers=this.specializers.slice(),i.specializerSpecs=this.specializerSpecs.map((n,s)=>{let r=e.specializers.find(a=>a.from==n.external);if(!r)return n;let l=Object.assign(Object.assign({},n),{external:r.to});return i.specializers[s]=sv(l),l})),e.contextTracker&&(i.context=e.contextTracker),e.dialect&&(i.dialect=this.parseDialect(e.dialect)),e.strict!=null&&(i.strict=e.strict),e.wrap&&(i.wrappers=i.wrappers.concat(e.wrap)),e.bufferLength!=null&&(i.bufferLength=e.bufferLength),i}hasWrappers(){return this.wrappers.length>0}getName(e){return this.termNames?this.termNames[e]:String(e<=this.maxNode&&this.nodeSet.types[e].name||e)}get eofTerm(){return this.maxNode+1}get topNode(){return this.nodeSet.types[this.top[1]]}dynamicPrecedence(e){let i=this.dynamicPrecedences;return i==null?0:i[e]||0}parseDialect(e){let i=Object.keys(this.dialects),n=i.map(()=>!1);if(e)for(let r of e.split(" ")){let l=i.indexOf(r);l>=0&&(n[l]=!0)}let s=null;for(let r=0;r<i.length;r++)if(!n[r])for(let l=this.dialects[i[r]],a;(a=this.data[l++])!=65535;)(s||(s=new Uint8Array(this.maxTerm+1)))[a]=1;return new Gm(e,n,s)}static deserialize(e){return new t(e)}};function sn(t,e){return t[e]|t[e+1]<<16}function rR(t){let e=null;for(let i of t){let n=i.p.stoppedAt;(i.pos==i.p.stream.end||n!=null&&i.pos>n)&&i.p.parser.stateFlag(i.state,2)&&(!e||e.score<i.score)&&(e=i)}return e}function sv(t){if(t.external){let e=t.extend?1:0;return(i,n)=>t.external(i,n)<<1|e}return t.get}var lR=122,lv=1,aR=123,oR=124,ov=2,uR=125,cR=3,hR=4,uv=[9,10,11,12,13,32,133,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288],fR=58,dR=40,cv=95,pR=91,Lc=45,mR=46,OR=35,gR=37,yR=38,bR=92,xR=10,SR=42;function Ga(t){return t>=65&&t<=90||t>=97&&t<=122||t>=161}function Um(t){return t>=48&&t<=57}function av(t){return Um(t)||t>=97&&t<=102||t>=65&&t<=70}var hv=(t,e,i)=>(n,s)=>{for(let r=!1,l=0,a=0;;a++){let{next:o}=n;if(Ga(o)||o==Lc||o==cv||r&&Um(o))!r&&(o!=Lc||a>0)&&(r=!0),l===a&&o==Lc&&l++,n.advance();else if(o==bR&&n.peek(1)!=xR){if(n.advance(),av(n.next)){do n.advance();while(av(n.next));n.next==32&&n.advance()}else n.next>-1&&n.advance();r=!0}else{r&&n.acceptToken(l==2&&s.canShift(ov)?e:o==dR?i:t);break}}},kR=new Xe(hv(aR,ov,oR)),vR=new Xe(hv(uR,cR,hR)),QR=new Xe(t=>{if(uv.includes(t.peek(-1))){let{next:e}=t;(Ga(e)||e==cv||e==OR||e==mR||e==SR||e==pR||e==fR&&Ga(t.peek(1))||e==Lc||e==yR)&&t.acceptToken(lR)}}),wR=new Xe(t=>{if(!uv.includes(t.peek(-1))){let{next:e}=t;if(e==gR&&(t.advance(),t.acceptToken(lv)),Ga(e)){do t.advance();while(Ga(t.next)||Um(t.next));t.acceptToken(lv)}}}),TR=Ln({"AtKeyword import charset namespace keyframes media supports":b.definitionKeyword,"from to selector":b.keyword,NamespaceName:b.namespace,KeyframeName:b.labelName,KeyframeRangeName:b.operatorKeyword,TagName:b.tagName,ClassName:b.className,PseudoClassName:b.constant(b.className),IdName:b.labelName,"FeatureName PropertyName":b.propertyName,AttributeName:b.attributeName,NumberLiteral:b.number,KeywordQuery:b.keyword,UnaryQueryOp:b.operatorKeyword,"CallTag ValueName":b.atom,VariableName:b.variableName,Callee:b.operatorKeyword,Unit:b.unit,"UniversalSelector NestingSelector":b.definitionOperator,"MatchOp CompareOp":b.compareOperator,"ChildOp SiblingOp, LogicOp":b.logicOperator,BinOp:b.arithmeticOperator,Important:b.modifier,Comment:b.blockComment,ColorLiteral:b.color,"ParenthesizedContent StringLiteral":b.string,":":b.punctuation,"PseudoOp #":b.derefOperator,"; ,":b.separator,"( )":b.paren,"[ ]":b.squareBracket,"{ }":b.brace}),PR={__proto__:null,lang:38,"nth-child":38,"nth-last-child":38,"nth-of-type":38,"nth-last-of-type":38,dir:38,"host-context":38,if:84,url:124,"url-prefix":124,domain:124,regexp:124},$R={__proto__:null,or:98,and:98,not:106,only:106,layer:170},AR={__proto__:null,selector:112,layer:166},RR={__proto__:null,"@import":162,"@media":174,"@charset":178,"@namespace":182,"@keyframes":188,"@supports":200,"@scope":204},CR={__proto__:null,to:207},Wm=Ei.deserialize({version:14,states:"EbQYQdOOO#qQdOOP#xO`OOOOQP'#Cf'#CfOOQP'#Ce'#CeO#}QdO'#ChO$nQaO'#CcO$xQdO'#CkO%TQdO'#DpO%YQdO'#DrO%_QdO'#DuO%_QdO'#DxOOQP'#FV'#FVO&eQhO'#EhOOQS'#FU'#FUOOQS'#Ek'#EkQYQdOOO&lQdO'#EOO&PQhO'#EUO&lQdO'#EWO'aQdO'#EYO'lQdO'#E]O'tQhO'#EcO(VQdO'#EeO(bQaO'#CfO)VQ`O'#D{O)[Q`O'#F`O)gQdO'#F`QOQ`OOP)qO&jO'#CaPOOO)C@t)C@tOOQP'#Cj'#CjOOQP,59S,59SO#}QdO,59SO)|QdO,59VO%TQdO,5:[O%YQdO,5:^O%_QdO,5:aO%_QdO,5:cO%_QdO,5:dO%_QdO'#ErO*XQ`O,58}O*aQdO'#DzOOQS,58},58}OOQP'#Cn'#CnOOQO'#Dn'#DnOOQP,59V,59VO*hQ`O,59VO*mQ`O,59VOOQP'#Dq'#DqOOQP,5:[,5:[OOQO'#Ds'#DsO*rQpO,5:^O+]QaO,5:aO+sQaO,5:dOOQW'#DZ'#DZO,ZQhO'#DdO,xQhO'#FaO'tQhO'#DbO-WQ`O'#DhOOQW'#F['#F[O-]Q`O,5;SO-eQ`O'#DeOOQS-E8i-E8iOOQ['#Cs'#CsO-jQdO'#CtO.QQdO'#CzO.hQdO'#C}O/OQ!pO'#DPO1RQ!jO,5:jOOQO'#DU'#DUO*mQ`O'#DTO1cQ!nO'#FXO3`Q`O'#DVO3eQ`O'#DkOOQ['#FX'#FXO-`Q`O,5:pO3jQ!bO,5:rOOQS'#E['#E[O3rQ`O,5:tO3wQdO,5:tOOQO'#E_'#E_O4PQ`O,5:wO4UQhO,5:}O%_QdO'#DgOOQS,5;P,5;PO-eQ`O,5;PO4^QdO,5;PO4fQdO,5:gO4vQdO'#EtO5TQ`O,5;zO5TQ`O,5;zPOOO'#Ej'#EjP5`O&jO,58{POOO,58{,58{OOQP1G.n1G.nOOQP1G.q1G.qO*hQ`O1G.qO*mQ`O1G.qOOQP1G/v1G/vO5kQpO1G/xO5sQaO1G/{O6ZQaO1G/}O6qQaO1G0OO7XQaO,5;^OOQO-E8p-E8pOOQS1G.i1G.iO7cQ`O,5:fO7hQdO'#DoO7oQdO'#CrOOQP1G/x1G/xO&lQdO1G/xO7vQ!jO'#DZO8UQ!bO,59vO8^QhO,5:OOOQO'#F]'#F]O8XQ!bO,59zO'tQhO,59xO8fQhO'#EvO8sQ`O,5;{O9OQhO,59|O9uQhO'#DiOOQW,5:S,5:SOOQS1G0n1G0nOOQW,5:P,5:PO9|Q!fO'#FYOOQS'#FY'#FYOOQS'#Em'#EmO;^QdO,59`OOQ[,59`,59`O;tQdO,59fOOQ[,59f,59fO<[QdO,59iOOQ[,59i,59iOOQ[,59k,59kO&lQdO,59mO<rQhO'#EQOOQW'#EQ'#EQO=WQ`O1G0UO1[QhO1G0UOOQ[,59o,59oO'tQhO'#DXOOQ[,59q,59qO=]Q#tO,5:VOOQS1G0[1G0[OOQS1G0^1G0^OOQS1G0`1G0`O=hQ`O1G0`O=mQdO'#E`OOQS1G0c1G0cOOQS1G0i1G0iO=xQaO,5:RO-`Q`O1G0kOOQS1G0k1G0kO-eQ`O1G0kO>PQ!fO1G0ROOQO1G0R1G0ROOQO,5;`,5;`O>gQdO,5;`OOQO-E8r-E8rO>tQ`O1G1fPOOO-E8h-E8hPOOO1G.g1G.gOOQP7+$]7+$]OOQP7+%d7+%dO&lQdO7+%dOOQS1G0Q1G0QO?PQaO'#F_O?ZQ`O,5:ZO?`Q!fO'#ElO@^QdO'#FWO@hQ`O,59^O@mQ!bO7+%dO&lQdO1G/bO@uQhO1G/fOOQW1G/j1G/jOOQW1G/d1G/dOAWQhO,5;bOOQO-E8t-E8tOAfQhO'#DZOAtQhO'#F^OBPQ`O'#F^OBUQ`O,5:TOOQS-E8k-E8kOOQ[1G.z1G.zOOQ[1G/Q1G/QOOQ[1G/T1G/TOOQ[1G/X1G/XOBZQdO,5:lOOQS7+%p7+%pOB`Q`O7+%pOBeQhO'#DYOBmQ`O,59sO'tQhO,59sOOQ[1G/q1G/qOBuQ`O1G/qOOQS7+%z7+%zOBzQbO'#DPOOQO'#Eb'#EbOCYQ`O'#EaOOQO'#Ea'#EaOCeQ`O'#EwOCmQdO,5:zOOQS,5:z,5:zOOQ[1G/m1G/mOOQS7+&V7+&VO-`Q`O7+&VOCxQ!fO'#EsO&lQdO'#EsOEPQdO7+%mOOQO7+%m7+%mOOQO1G0z1G0zOEdQ!bO<<IOOElQdO'#EqOEvQ`O,5;yOOQP1G/u1G/uOOQS-E8j-E8jOFOQdO'#EpOFYQ`O,5;rOOQ]1G.x1G.xOOQP<<IO<<IOOFbQdO7+$|OOQO'#D]'#D]OFiQ!bO7+%QOFqQhO'#EoOF{Q`O,5;xO&lQdO,5;xOOQW1G/o1G/oOOQO'#ES'#ESOGTQ`O1G0WOOQS<<I[<<I[O&lQdO,59tOGnQhO1G/_OOQ[1G/_1G/_OGuQ`O1G/_OOQW-E8l-E8lOOQ[7+%]7+%]OOQO,5:{,5:{O=pQdO'#ExOCeQ`O,5;cOOQS,5;c,5;cOOQS-E8u-E8uOOQS1G0f1G0fOOQS<<Iq<<IqOG}Q!fO,5;_OOQS-E8q-E8qOOQO<<IX<<IXOOQPAN>jAN>jOIUQaO,5;]OOQO-E8o-E8oOI`QdO,5;[OOQO-E8n-E8nOOQW<<Hh<<HhOOQW<<Hl<<HlOIjQhO<<HlOI{QhO,5;ZOJWQ`O,5;ZOOQO-E8m-E8mOJ]QdO1G1dOBZQdO'#EuOJgQ`O7+%rOOQW7+%r7+%rOJoQ!bO1G/`OOQ[7+$y7+$yOJzQhO7+$yPKRQ`O'#EnOOQO,5;d,5;dOOQO-E8v-E8vOOQS1G0}1G0}OKWQ`OAN>WO&lQdO1G0uOK]Q`O7+'OOOQO,5;a,5;aOOQO-E8s-E8sOOQW<<I^<<I^OOQ[<<He<<HePOQW,5;Y,5;YOOQWG23rG23rOKeQdO7+&a",stateData:"Kx~O#sOS#tQQ~OW[OZ[O]TO`VOaVOi]OjWOmXO!jYO!mZO!saO!ybO!{cO!}dO#QeO#WfO#YgO#oRO~OQiOW[OZ[O]TO`VOaVOi]OjWOmXO!jYO!mZO!saO!ybO!{cO!}dO#QeO#WfO#YgO#ohO~O#m$SP~P!dO#tmO~O#ooO~O]qO`rOarOjsOmtO!juO!mwO#nvO~OpzO!^xO~P$SOc!QO#o|O#p}O~O#o!RO~O#o!TO~OW[OZ[O]TO`VOaVOjWOmXO!jYO!mZO#oRO~OS!]Oe!YO!V![O!Y!`O#q!XOp$TP~Ok$TP~P&POQ!jOe!cOm!dOp!eOr!mOt!mOz!kO!`!lO#o!bO#p!hO#}!fO~Ot!qO!`!lO#o!pO~Ot!sO#o!sO~OS!]Oe!YO!V![O!Y!`O#q!XO~Oe!vOpzO#Z!xO~O]YX`YX`!pXaYXjYXmYXpYX!^YX!jYX!mYX#nYX~O`!zO~Ok!{O#m$SXo$SX~O#m$SXo$SX~P!dO#u#OO#v#OO#w#QO~Oc#UO#o|O#p}O~OpzO!^xO~Oo$SP~P!dOe#`O~Oe#aO~Ol#bO!h#cO~O]qO`rOarOjsOmtO~Op!ia!^!ia!j!ia!m!ia#n!iad!ia~P*zOp!la!^!la!j!la!m!la#n!lad!la~P*zOR#gOS!]Oe!YOr#gOt#gO!V![O!Y!`O#q#dO#}!fO~O!R#iO!^#jOk$TXp$TX~Oe#mO~Ok#oOpzO~Oe!vO~O]#rO`#rOd#uOi#rOj#rOk#rO~P&lO]#rO`#rOi#rOj#rOk#rOl#wO~P&lO]#rO`#rOi#rOj#rOk#rOo#yO~P&lOP#zOSsXesXksXvsX!VsX!YsX!usX!wsX#qsX!TsXQsX]sX`sXdsXisXjsXmsXpsXrsXtsXzsX!`sX#osX#psX#}sXlsXosX!^sX!qsX#msX~Ov#{O!u#|O!w#}Ok$TP~P'tOe#aOS#{Xk#{Xv#{X!V#{X!Y#{X!u#{X!w#{X#q#{XQ#{X]#{X`#{Xd#{Xi#{Xj#{Xm#{Xp#{Xr#{Xt#{Xz#{X!`#{X#o#{X#p#{X#}#{Xl#{Xo#{X!^#{X!q#{X#m#{X~Oe$RO~Oe$TO~Ok$VOv#{O~Ok$WO~Ot$XO!`!lO~Op$YO~OpzO!R#iO~OpzO#Z$`O~O!q$bOk!oa#m!oao!oa~P&lOk#hX#m#hXo#hX~P!dOk!{O#m$Sao$Sa~O#u#OO#v#OO#w$hO~Ol$jO!h$kO~Op!ii!^!ii!j!ii!m!ii#n!iid!ii~P*zOp!ki!^!ki!j!ki!m!ki#n!kid!ki~P*zOp!li!^!li!j!li!m!li#n!lid!li~P*zOp#fa!^#fa~P$SOo$lO~Od$RP~P%_Od#zP~P&lO`!PXd}X!R}X!T!PX~O`$sO!T$tO~Od$uO!R#iO~Ok#jXp#jX!^#jX~P'tO!^#jOk$Tap$Ta~O!R#iOk!Uap!Ua!^!Uad!Ua`!Ua~OS!]Oe!YO!V![O!Y!`O#q$yO~Od$QP~P9dOv#{OQ#|X]#|X`#|Xd#|Xe#|Xi#|Xj#|Xk#|Xm#|Xp#|Xr#|Xt#|Xz#|X!`#|X#o#|X#p#|X#}#|Xl#|Xo#|X~O]#rO`#rOd%OOi#rOj#rOk#rO~P&lO]#rO`#rOi#rOj#rOk#rOl%PO~P&lO]#rO`#rOi#rOj#rOk#rOo%QO~P&lOe%SOS!tXk!tX!V!tX!Y!tX#q!tX~Ok%TO~Od%YOt%ZO!a%ZO~Ok%[O~Oo%cO#o%^O#}%]O~Od%dO~P$SOv#{O!^%hO!q%jOk!oi#m!oio!oi~P&lOk#ha#m#hao#ha~P!dOk!{O#m$Sio$Si~O!^%mOd$RX~P$SOd%oO~Ov#{OQ#`Xd#`Xe#`Xm#`Xp#`Xr#`Xt#`Xz#`X!^#`X!`#`X#o#`X#p#`X#}#`X~O!^%qOd#zX~P&lOd%sO~Ol%tOv#{O~OR#gOr#gOt#gO#q%vO#}!fO~O!R#iOk#jap#ja!^#ja~O`!PXd}X!R}X!^}X~O!R#iO!^%xOd$QX~O`%zO~Od%{O~O#o%|O~Ok&OO~O`&PO!R#iO~Od&ROk&QO~Od&UO~OP#zOpsX!^sXdsX~O#}%]Op#TX!^#TX~OpzO!^&WO~Oo&[O#o%^O#}%]O~Ov#{OQ#gXe#gXk#gXm#gXp#gXr#gXt#gXz#gX!^#gX!`#gX!q#gX#m#gX#o#gX#p#gX#}#gXo#gX~O!^%hO!q&`Ok!oq#m!oqo!oq~P&lOl&aOv#{O~Od#eX!^#eX~P%_O!^%mOd$Ra~Od#dX!^#dX~P&lO!^%qOd#za~Od&fO~P&lOd&gO!T&hO~Od#cX!^#cX~P9dO!^%xOd$Qa~O]&mOd&oO~OS#bae#ba!V#ba!Y#ba#q#ba~Od&qO~PG]Od&qOk&rO~Ov#{OQ#gae#gak#gam#gap#gar#gat#gaz#ga!^#ga!`#ga!q#ga#m#ga#o#ga#p#ga#}#gao#ga~Od#ea!^#ea~P$SOd#da!^#da~P&lOR#gOr#gOt#gO#q%vO#}%]O~O!R#iOd#ca!^#ca~O`&xO~O!^%xOd$Qi~P&lO]&mOd&|O~Ov#{Od|ik|i~Od&}O~PG]Ok'OO~Od'PO~O!^%xOd$Qq~Od#cq!^#cq~P&lO#s!a#t#}]#}v!m~",goto:"2h$UPPPPP$VP$YP$c$uP$cP%X$cPP%_PPP%e%o%oPPPPP%oPP%oP&]P%oP%o'W%oP't'w'}'}(^'}P'}P'}P'}'}P(m'}(yP(|PP)p)v$c)|$c*SP$cP$c$cP*Y*{+YP$YP+aP+dP$YP$YP$YP+j$YP+m+p+s+z$YP$YPP$YP,P,V,f,|-[-b-l-r-x.O.U.`.f.l.rPPPPPPPPPPP.x/R/w/z0|P1U1u2O2R2U2[RnQ_^OP`kz!{$dq[OPYZ`kuvwxz!v!{#`$d%mqSOPYZ`kuvwxz!v!{#`$d%mQpTR#RqQ!OVR#SrQ#S!QS$Q!i!jR$i#U!V!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'Q!U!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QU#g!Y$t&hU%`$Y%b&WR&V%_!V!iac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QR$S!kQ%W$RR&S%Xk!^]bf!Y![!g#i#j#m$P$R%X%xQ#e!YQ${#mQ%w$tQ&j%xR&w&hQ!ygQ#p!`Q$^!xR%f$`R#n!]!U!mac!c!d!e!z#a#c#t#v#x#{$a$k$p$s%h%i%q%u%z&P&d&l&x'QQ!qdR$X!rQ!PVR#TrQ#S!PR$i#TQ!SWR#VsQ!UXR#WtQ{UQ!wgQ#^yQ#o!_Q$U!nQ$[!uQ$_!yQ%e$^Q&Y%aQ&]%fR&v&XSjPzQ!}kQ$c!{R%k$dZiPkz!{$dR$P!gQ%}%SR&z&mR!rdR!teR$Z!tS%a$Y%bR&t&WV%_$Y%b&WQ#PmR$g#PQ`OSkPzU!a`k$dR$d!{Q$p#aY%p$p%u&d&l'QQ%u$sQ&d%qQ&l%zR'Q&xQ#t!cQ#v!dQ#x!eV$}#t#v#xQ%X$RR&T%XQ%y$zS&k%y&yR&y&lQ%r$pR&e%rQ%n$mR&c%nQyUR#]yQ%i$aR&_%iQ!|jS$e!|$fR$f!}Q&n%}R&{&nQ#k!ZR$x#kQ%b$YR&Z%bQ&X%aR&u&X__OP`kz!{$d^UOP`kz!{$dQ!VYQ!WZQ#XuQ#YvQ#ZwQ#[xQ$]!vQ$m#`R&b%mR$q#aQ!gaQ!oc[#q!c!d!e#t#v#xQ$a!zd$o#a$p$s%q%u%z&d&l&x'QQ$r#cQ%R#{S%g$a%iQ%l$kQ&^%hR&p&P]#s!c!d!e#t#v#xW!Z]b!g$PQ!ufQ#f!YQ#l![Q$v#iQ$w#jQ$z#mS%V$R%XR&i%xQ#h!YQ%w$tR&w&hR$|#mR$n#`QlPR#_zQ!_]Q!nbQ$O!gR%U$P",nodeNames:"\u26A0 Unit VariableName VariableName QueryCallee Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue AtKeyword # ; ] [ BracketedValue } { BracedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee IfExpression if ArgList IfBranch KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector ParenthesizedSelector CallQuery ArgList , CallLiteral CallTag ParenthesizedContent PseudoClassName ArgList IdSelector IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp Block Declaration PropertyName Important ImportStatement import Layer layer LayerName layer MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports ScopeStatement scope to AtRule Styles",maxTerm:143,nodeProps:[["isolate",-2,5,36,""],["openedBy",20,"(",28,"[",31,"{"],["closedBy",21,")",29,"]",32,"}"]],propSources:[TR],skippedNodes:[0,5,106],repeatNodeCount:15,tokenData:"JQ~R!YOX$qX^%i^p$qpq%iqr({rs-ust/itu6Wuv$qvw7Qwx7cxy9Qyz9cz{9h{|:R|}>t}!O?V!O!P?t!P!Q@]!Q![AU![!]BP!]!^B{!^!_C^!_!`DY!`!aDm!a!b$q!b!cEn!c!}$q!}#OG{#O#P$q#P#QH^#Q#R6W#R#o$q#o#pHo#p#q6W#q#rIQ#r#sIc#s#y$q#y#z%i#z$f$q$f$g%i$g#BY$q#BY#BZ%i#BZ$IS$q$IS$I_%i$I_$I|$q$I|$JO%i$JO$JT$q$JT$JU%i$JU$KV$q$KV$KW%i$KW&FU$q&FU&FV%i&FV;'S$q;'S;=`Iz<%lO$q`$tSOy%Qz;'S%Q;'S;=`%c<%lO%Q`%VS!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Q`%fP;=`<%l%Q~%nh#s~OX%QX^'Y^p%Qpq'Yqy%Qz#y%Q#y#z'Y#z$f%Q$f$g'Y$g#BY%Q#BY#BZ'Y#BZ$IS%Q$IS$I_'Y$I_$I|%Q$I|$JO'Y$JO$JT%Q$JT$JU'Y$JU$KV%Q$KV$KW'Y$KW&FU%Q&FU&FV'Y&FV;'S%Q;'S;=`%c<%lO%Q~'ah#s~!a`OX%QX^'Y^p%Qpq'Yqy%Qz#y%Q#y#z'Y#z$f%Q$f$g'Y$g#BY%Q#BY#BZ'Y#BZ$IS%Q$IS$I_'Y$I_$I|%Q$I|$JO'Y$JO$JT%Q$JT$JU'Y$JU$KV%Q$KV$KW'Y$KW&FU%Q&FU&FV'Y&FV;'S%Q;'S;=`%c<%lO%Qj)OUOy%Qz#]%Q#]#^)b#^;'S%Q;'S;=`%c<%lO%Qj)gU!a`Oy%Qz#a%Q#a#b)y#b;'S%Q;'S;=`%c<%lO%Qj*OU!a`Oy%Qz#d%Q#d#e*b#e;'S%Q;'S;=`%c<%lO%Qj*gU!a`Oy%Qz#c%Q#c#d*y#d;'S%Q;'S;=`%c<%lO%Qj+OU!a`Oy%Qz#f%Q#f#g+b#g;'S%Q;'S;=`%c<%lO%Qj+gU!a`Oy%Qz#h%Q#h#i+y#i;'S%Q;'S;=`%c<%lO%Qj,OU!a`Oy%Qz#T%Q#T#U,b#U;'S%Q;'S;=`%c<%lO%Qj,gU!a`Oy%Qz#b%Q#b#c,y#c;'S%Q;'S;=`%c<%lO%Qj-OU!a`Oy%Qz#h%Q#h#i-b#i;'S%Q;'S;=`%c<%lO%Qj-iS!qY!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Q~-xWOY-uZr-urs.bs#O-u#O#P.g#P;'S-u;'S;=`/c<%lO-u~.gOt~~.jRO;'S-u;'S;=`.s;=`O-u~.vXOY-uZr-urs.bs#O-u#O#P.g#P;'S-u;'S;=`/c;=`<%l-u<%lO-u~/fP;=`<%l-uj/nYjYOy%Qz!Q%Q!Q![0^![!c%Q!c!i0^!i#T%Q#T#Z0^#Z;'S%Q;'S;=`%c<%lO%Qj0cY!a`Oy%Qz!Q%Q!Q![1R![!c%Q!c!i1R!i#T%Q#T#Z1R#Z;'S%Q;'S;=`%c<%lO%Qj1WY!a`Oy%Qz!Q%Q!Q![1v![!c%Q!c!i1v!i#T%Q#T#Z1v#Z;'S%Q;'S;=`%c<%lO%Qj1}YrY!a`Oy%Qz!Q%Q!Q![2m![!c%Q!c!i2m!i#T%Q#T#Z2m#Z;'S%Q;'S;=`%c<%lO%Qj2tYrY!a`Oy%Qz!Q%Q!Q![3d![!c%Q!c!i3d!i#T%Q#T#Z3d#Z;'S%Q;'S;=`%c<%lO%Qj3iY!a`Oy%Qz!Q%Q!Q![4X![!c%Q!c!i4X!i#T%Q#T#Z4X#Z;'S%Q;'S;=`%c<%lO%Qj4`YrY!a`Oy%Qz!Q%Q!Q![5O![!c%Q!c!i5O!i#T%Q#T#Z5O#Z;'S%Q;'S;=`%c<%lO%Qj5TY!a`Oy%Qz!Q%Q!Q![5s![!c%Q!c!i5s!i#T%Q#T#Z5s#Z;'S%Q;'S;=`%c<%lO%Qj5zSrY!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Qd6ZUOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Qd6tS!hS!a`Oy%Qz;'S%Q;'S;=`%c<%lO%Qb7VSZQOy%Qz;'S%Q;'S;=`%c<%lO%Q~7fWOY7cZw7cwx.bx#O7c#O#P8O#P;'S7c;'S;=`8z<%lO7c~8RRO;'S7c;'S;=`8[;=`O7c~8_XOY7cZw7cwx.bx#O7c#O#P8O#P;'S7c;'S;=`8z;=`<%l7c<%lO7c~8}P;=`<%l7cj9VSeYOy%Qz;'S%Q;'S;=`%c<%lO%Q~9hOd~n9oUWQvWOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Qj:YWvW!mQOy%Qz!O%Q!O!P:r!P!Q%Q!Q![=w![;'S%Q;'S;=`%c<%lO%Qj:wU!a`Oy%Qz!Q%Q!Q![;Z![;'S%Q;'S;=`%c<%lO%Qj;bY!a`#}YOy%Qz!Q%Q!Q![;Z![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%Qj<VY!a`Oy%Qz{%Q{|<u|}%Q}!O<u!O!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj<zU!a`Oy%Qz!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj=eU!a`#}YOy%Qz!Q%Q!Q![=^![;'S%Q;'S;=`%c<%lO%Qj>O[!a`#}YOy%Qz!O%Q!O!P;Z!P!Q%Q!Q![=w![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%Qj>yS!^YOy%Qz;'S%Q;'S;=`%c<%lO%Qj?[WvWOy%Qz!O%Q!O!P:r!P!Q%Q!Q![=w![;'S%Q;'S;=`%c<%lO%Qj?yU]YOy%Qz!Q%Q!Q![;Z![;'S%Q;'S;=`%c<%lO%Q~@bTvWOy%Qz{@q{;'S%Q;'S;=`%c<%lO%Q~@xS!a`#t~Oy%Qz;'S%Q;'S;=`%c<%lO%QjAZ[#}YOy%Qz!O%Q!O!P;Z!P!Q%Q!Q![=w![!g%Q!g!h<Q!h#X%Q#X#Y<Q#Y;'S%Q;'S;=`%c<%lO%QjBUU`YOy%Qz![%Q![!]Bh!];'S%Q;'S;=`%c<%lO%QbBoSaQ!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QjCQSkYOy%Qz;'S%Q;'S;=`%c<%lO%QhCcU!TWOy%Qz!_%Q!_!`Cu!`;'S%Q;'S;=`%c<%lO%QhC|S!TW!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QlDaS!TW!hSOy%Qz;'S%Q;'S;=`%c<%lO%QjDtV!jQ!TWOy%Qz!_%Q!_!`Cu!`!aEZ!a;'S%Q;'S;=`%c<%lO%QbEbS!jQ!a`Oy%Qz;'S%Q;'S;=`%c<%lO%QjEqYOy%Qz}%Q}!OFa!O!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjFfW!a`Oy%Qz!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjGV[iY!a`Oy%Qz}%Q}!OGO!O!Q%Q!Q![GO![!c%Q!c!}GO!}#T%Q#T#oGO#o;'S%Q;'S;=`%c<%lO%QjHQSmYOy%Qz;'S%Q;'S;=`%c<%lO%QnHcSl^Oy%Qz;'S%Q;'S;=`%c<%lO%QjHtSpYOy%Qz;'S%Q;'S;=`%c<%lO%QjIVSoYOy%Qz;'S%Q;'S;=`%c<%lO%QfIhU!mQOy%Qz!_%Q!_!`6m!`;'S%Q;'S;=`%c<%lO%Q`I}P;=`<%l$q",tokenizers:[QR,wR,kR,vR,1,2,3,4,new Mi("m~RRYZ[z{a~~g~aO#v~~dP!P!Qg~lO#w~~",28,129)],topRules:{StyleSheet:[0,6],Styles:[1,105]},specialized:[{term:124,get:t=>PR[t]||-1},{term:125,get:t=>$R[t]||-1},{term:4,get:t=>AR[t]||-1},{term:25,get:t=>RR[t]||-1},{term:123,get:t=>CR[t]||-1}],tokenPrec:1963});var ER=54,zR=1,_R=55,ZR=2,XR=56,DR=3,fv=4,NR=5,Vc=6,xv=7,Sv=8,kv=9,vv=10,qR=11,YR=12,BR=13,Im=57,jR=14,dv=58,Qv=20,LR=22,wv=23,VR=24,Km=26,Tv=27,GR=28,UR=31,WR=34,IR=36,HR=37,KR=0,JR=1,FR={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},eC={dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},pv={dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}};function tC(t){return t==45||t==46||t==58||t>=65&&t<=90||t==95||t>=97&&t<=122||t>=161}function Pv(t){return t==9||t==10||t==13||t==32}var mv=null,Ov=null,gv=0;function Jm(t,e){let i=t.pos+e;if(gv==i&&Ov==t)return mv;let n=t.peek(e);for(;Pv(n);)n=t.peek(++e);let s="";for(;tC(n);)s+=String.fromCharCode(n),n=t.peek(++e);return Ov=t,gv=i,mv=s?s.toLowerCase():n==iC||n==nC?void 0:null}var $v=60,Gc=62,Fm=47,iC=63,nC=33,sC=45;function yv(t,e){this.name=t,this.parent=e}var rC=[Vc,vv,xv,Sv,kv],lC=new el({start:null,shift(t,e,i,n){return rC.indexOf(e)>-1?new yv(Jm(n,1)||"",t):t},reduce(t,e){return e==Qv&&t?t.parent:t},reuse(t,e,i,n){let s=e.type.id;return s==Vc||s==IR?new yv(Jm(n,1)||"",t):t},strict:!1}),aC=new Xe((t,e)=>{if(t.next!=$v){t.next<0&&e.context&&t.acceptToken(Im);return}t.advance();let i=t.next==Fm;i&&t.advance();let n=Jm(t,0);if(n===void 0)return;if(!n)return t.acceptToken(i?jR:Vc);let s=e.context?e.context.name:null;if(i){if(n==s)return t.acceptToken(qR);if(s&&eC[s])return t.acceptToken(Im,-2);if(e.dialectEnabled(KR))return t.acceptToken(YR);for(let r=e.context;r;r=r.parent)if(r.name==n)return;t.acceptToken(BR)}else{if(n=="script")return t.acceptToken(xv);if(n=="style")return t.acceptToken(Sv);if(n=="textarea")return t.acceptToken(kv);if(FR.hasOwnProperty(n))return t.acceptToken(vv);s&&pv[s]&&pv[s][n]?t.acceptToken(Im,-1):t.acceptToken(Vc)}},{contextual:!0}),oC=new Xe(t=>{for(let e=0,i=0;;i++){if(t.next<0){i&&t.acceptToken(dv);break}if(t.next==sC)e++;else if(t.next==Gc&&e>=2){i>=3&&t.acceptToken(dv,-2);break}else e=0;t.advance()}});function uC(t){for(;t;t=t.parent)if(t.name=="svg"||t.name=="math")return!0;return!1}var cC=new Xe((t,e)=>{if(t.next==Fm&&t.peek(1)==Gc){let i=e.dialectEnabled(JR)||uC(e.context);t.acceptToken(i?NR:fv,2)}else t.next==Gc&&t.acceptToken(fv,1)});function eO(t,e,i){let n=2+t.length;return new Xe(s=>{for(let r=0,l=0,a=0;;a++){if(s.next<0){a&&s.acceptToken(e);break}if(r==0&&s.next==$v||r==1&&s.next==Fm||r>=2&&r<n&&s.next==t.charCodeAt(r-2))r++,l++;else if((r==2||r==n)&&Pv(s.next))l++;else if(r==n&&s.next==Gc){a>l?s.acceptToken(e,-l):s.acceptToken(i,-(l-2));break}else if((s.next==10||s.next==13)&&a){s.acceptToken(e,1);break}else r=l=0;s.advance()}})}var hC=eO("script",ER,zR),fC=eO("style",_R,ZR),dC=eO("textarea",XR,DR),pC=Ln({"Text RawText":b.content,"StartTag StartCloseTag SelfClosingEndTag EndTag":b.angleBracket,TagName:b.tagName,"MismatchedCloseTag/TagName":[b.tagName,b.invalid],AttributeName:b.attributeName,"AttributeValue UnquotedAttributeValue":b.attributeValue,Is:b.definitionOperator,"EntityReference CharacterReference":b.character,Comment:b.blockComment,ProcessingInst:b.processingInstruction,DoctypeDecl:b.documentMeta}),Av=Ei.deserialize({version:14,states:",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",stateData:",]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",goto:"%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",nodeNames:"\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",maxTerm:67,context:lC,nodeProps:[["closedBy",-10,1,2,3,7,8,9,10,11,12,13,"EndTag",6,"EndTag SelfClosingEndTag",-4,21,30,33,36,"CloseTag"],["openedBy",4,"StartTag StartCloseTag",5,"StartTag",-4,29,32,35,37,"OpenTag"],["group",-9,14,17,18,19,20,39,40,41,42,"Entity",16,"Entity TextContent",-3,28,31,34,"TextContent Entity"],["isolate",-11,21,29,30,32,33,35,36,37,38,41,42,"ltr",-3,26,27,39,""]],propSources:[pC],skippedNodes:[0],repeatNodeCount:9,tokenData:"!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",tokenizers:[hC,fC,dC,cC,aC,oC,0,1,2,3,4,5],topRules:{Document:[0,15]},dialects:{noMatch:0,selfClosing:509},tokenPrec:511});function Rv(t,e){let i=Object.create(null);for(let n of t.getChildren(wv)){let s=n.getChild(VR),r=n.getChild(Km)||n.getChild(Tv);s&&(i[e.read(s.from,s.to)]=r?r.type.id==Km?e.read(r.from+1,r.to-1):e.read(r.from,r.to):"")}return i}function bv(t,e){let i=t.getChild(LR);return i?e.read(i.from,i.to):" "}function Hm(t,e,i){let n;for(let s of i)if(!s.attrs||s.attrs(n||(n=Rv(t.node.parent.firstChild,e))))return{parser:s.parser};return null}function Cv(t=[],e=[]){let i=[],n=[],s=[],r=[];for(let a of t)(a.tag=="script"?i:a.tag=="style"?n:a.tag=="textarea"?s:r).push(a);let l=e.length?Object.create(null):null;for(let a of e)(l[a.name]||(l[a.name]=[])).push(a);return Rc((a,o)=>{let u=a.type.id;if(u==GR)return Hm(a,o,i);if(u==UR)return Hm(a,o,n);if(u==WR)return Hm(a,o,s);if(u==Qv&&r.length){let c=a.node,h=c.firstChild,f=h&&bv(h,o),d;if(f){for(let m of r)if(m.tag==f&&(!m.attrs||m.attrs(d||(d=Rv(h,o))))){let g=c.lastChild,x=g.type.id==HR?g.from:c.to;if(x>h.to)return{parser:m.parser,overlay:[{from:h.to,to:x}]}}}}if(l&&u==wv){let c=a.node,h;if(h=c.firstChild){let f=l[o.read(h.from,h.to)];if(f)for(let d of f){if(d.tagName&&d.tagName!=bv(c.parent,o))continue;let m=c.lastChild;if(m.type.id==Km){let g=m.from+1,x=m.lastChild,p=m.to-(x&&x.isError?0:1);if(p>g)return{parser:d.parser,overlay:[{from:g,to:p}]}}else if(m.type.id==Tv)return{parser:d.parser,overlay:[{from:m.from,to:m.to}]}}}}return null})}var OC=316,gC=317,Mv=1,yC=2,bC=3,xC=4,SC=318,kC=320,vC=321,QC=5,wC=6,TC=0,iO=[9,10,11,12,13,32,133,160,5760,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8232,8233,8239,8287,12288],Ev=125,PC=59,nO=47,$C=42,AC=43,RC=45,CC=60,MC=44,EC=63,zC=46,_C=91,ZC=new el({start:!1,shift(t,e){return e==QC||e==wC||e==kC?t:e==vC},strict:!1}),XC=new Xe((t,e)=>{let{next:i}=t;(i==Ev||i==-1||e.context)&&t.acceptToken(SC)},{contextual:!0,fallback:!0}),DC=new Xe((t,e)=>{let{next:i}=t,n;iO.indexOf(i)>-1||i==nO&&((n=t.peek(1))==nO||n==$C)||i!=Ev&&i!=PC&&i!=-1&&!e.context&&t.acceptToken(OC)},{contextual:!0}),NC=new Xe((t,e)=>{t.next==_C&&!e.context&&t.acceptToken(gC)},{contextual:!0}),qC=new Xe((t,e)=>{let{next:i}=t;if(i==AC||i==RC){if(t.advance(),i==t.next){t.advance();let n=!e.context&&e.canShift(Mv);t.acceptToken(n?Mv:yC)}}else i==EC&&t.peek(1)==zC&&(t.advance(),t.advance(),(t.next<48||t.next>57)&&t.acceptToken(bC))},{contextual:!0});function tO(t,e){return t>=65&&t<=90||t>=97&&t<=122||t==95||t>=192||!e&&t>=48&&t<=57}var YC=new Xe((t,e)=>{if(t.next!=CC||!e.dialectEnabled(TC)||(t.advance(),t.next==nO))return;let i=0;for(;iO.indexOf(t.next)>-1;)t.advance(),i++;if(tO(t.next,!0)){for(t.advance(),i++;tO(t.next,!1);)t.advance(),i++;for(;iO.indexOf(t.next)>-1;)t.advance(),i++;if(t.next==MC)return;for(let n=0;;n++){if(n==7){if(!tO(t.next,!0))return;break}if(t.next!="extends".charCodeAt(n))break;t.advance(),i++}}t.acceptToken(xC,-i)}),BC=Ln({"get set async static":b.modifier,"for while do if else switch try catch finally return throw break continue default case defer":b.controlKeyword,"in of await yield void typeof delete instanceof as satisfies":b.operatorKeyword,"let var const using function class extends":b.definitionKeyword,"import export from":b.moduleKeyword,"with debugger new":b.keyword,TemplateString:b.special(b.string),super:b.atom,BooleanLiteral:b.bool,this:b.self,null:b.null,Star:b.modifier,VariableName:b.variableName,"CallExpression/VariableName TaggedTemplateExpression/VariableName":b.function(b.variableName),VariableDefinition:b.definition(b.variableName),Label:b.labelName,PropertyName:b.propertyName,PrivatePropertyName:b.special(b.propertyName),"CallExpression/MemberExpression/PropertyName":b.function(b.propertyName),"FunctionDeclaration/VariableDefinition":b.function(b.definition(b.variableName)),"ClassDeclaration/VariableDefinition":b.definition(b.className),"NewExpression/VariableName":b.className,PropertyDefinition:b.definition(b.propertyName),PrivatePropertyDefinition:b.definition(b.special(b.propertyName)),UpdateOp:b.updateOperator,"LineComment Hashbang":b.lineComment,BlockComment:b.blockComment,Number:b.number,String:b.string,Escape:b.escape,ArithOp:b.arithmeticOperator,LogicOp:b.logicOperator,BitOp:b.bitwiseOperator,CompareOp:b.compareOperator,RegExp:b.regexp,Equals:b.definitionOperator,Arrow:b.function(b.punctuation),": Spread":b.punctuation,"( )":b.paren,"[ ]":b.squareBracket,"{ }":b.brace,"InterpolationStart InterpolationEnd":b.special(b.brace),".":b.derefOperator,", ;":b.separator,"@":b.meta,TypeName:b.typeName,TypeDefinition:b.definition(b.typeName),"type enum interface implements namespace module declare":b.definitionKeyword,"abstract global Privacy readonly override":b.modifier,"is keyof unique infer asserts":b.operatorKeyword,JSXAttributeValue:b.attributeValue,JSXText:b.content,"JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag":b.angleBracket,"JSXIdentifier JSXNameSpacedName":b.tagName,"JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName":b.attributeName,"JSXBuiltin/JSXIdentifier":b.standard(b.tagName)}),jC={__proto__:null,export:20,as:25,from:33,default:36,async:41,function:42,in:52,out:55,const:56,extends:60,this:64,true:72,false:72,null:84,void:88,typeof:92,super:108,new:142,delete:154,yield:163,await:167,class:172,public:235,private:235,protected:235,readonly:237,instanceof:256,satisfies:259,import:292,keyof:349,unique:353,infer:359,asserts:395,is:397,abstract:417,implements:419,type:421,let:424,var:426,using:429,interface:435,enum:439,namespace:445,module:447,declare:451,global:455,defer:471,for:476,of:485,while:488,with:492,do:496,if:500,else:502,switch:506,case:512,try:518,catch:522,finally:526,return:530,throw:534,break:538,continue:542,debugger:546},LC={__proto__:null,async:129,get:131,set:133,declare:195,public:197,private:197,protected:197,static:199,abstract:201,override:203,readonly:209,accessor:211,new:401},VC={__proto__:null,"<":193},zv=Ei.deserialize({version:14,states:"$FjQ%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3]Q(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ yQpO'#GbO$!aQ!dO,5<sO$!hQ`O'#K[O9eQ`O'#K[O$!vQ`O,5<uO!,TQMhO,5<tO$!{Q`O'#GZO$#^Q`O,5<tO$#cQ!dO'#GWO$#pQ!dO'#K]O$#zQ`O'#K]O!&zQMhO'#K]O$$PQ`O,5<xO$$UQlO'#JvO$$`QpO'#GcO#$`QpO'#GcO$$qQ`O'#GgO!3oQ`O'#GkO$$vQ!0LrO'#ItO$%RQpO,5<|OOQ!0Lp,5<|,5<|O$%YQpO'#GcO$%gQpO'#GdO$%xQpO'#GdO$%}QMjO,5=XO$&_QMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$&oQ`O'#IyO$'TQ`O,5@UO$']Q`O,59aOOQ!0Lh,59i,59iO$'bQ`O,5@VO$(bQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)TQMjO,5<kO$)vQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*QQ`O,5<vO$*VQMjO,5<{O$*gQ`O'#KPO!$wQlO1G2RO$*lQ`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$*qQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$,sQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$.wQMhO'#EkOOQ!0Lb,5@T,5@TO$/UQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$/gQ`O1G0uO$/lQ`O'#CiO$/wQ`O'#KeO$0PQ`O,5=|O$0UQ`O'#KeO$0ZQ`O'#KeO$0iQ`O'#JRO$0wQ`O,5AOO$1PQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1WQ`O1G3fO$1]Q`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$1bQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$1gQ`O1G3SO$1oQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$1wQMhO,5=tO9kQ`O,5=tO$$qQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2VQ`O'#KcO$2bQ`O,5=wOOQ[1G.k1G.kO$2gQ!0LrO1G.kO@zQ`O1G.kO$2rQ`O1G.kO9uQ!0LrO1G.kO$4zQ!fO,5AQO$5XQ`O,5AQO9eQ`O,5AQO$5dQlO,5>PO$5kQ`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$5pQlO1G3uO$9tQlO'#HtOOQ[1G3x1G3xO$:RQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:ZQlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$>bQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$>gQ?MtO,5:XOOQO,5;`,5;`O$>qQpO'#IeO$?XQ`O,5@aOOQ!0Lf1G/r1G/rO$?aQpO'#IkO$?kQ`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$?sQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$?zQ!0LrO1G0mO$@VQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$@eQ!0LrO1G0mOOQO1G0^1G0^O$@yQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$ATQ!bO,5<iO$A]Q!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$AgQ`O1G5zO$AoQ`O1G6YO$AwQ!fO1G6ZO9eQ`O,5?UO$BRQ!0MxO1G6WO%[QlO1G6WO$BcQ!0LrO1G6WO$BtQ`O1G6VO$BtQ`O1G6VO9eQ`O1G6VO$B|Q`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$CbQ`O,5?XO$*gQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$CpQ`O7+(eO$C{QMhO7+(eO$DZQ!0MzO,5=XO$FfQ!0MzO,5=ZO$HqQ!0MzO,5=XO$KSQ!0MzO,5=ZO$MeQ!0MzO,59uO% jQ!0MzO,5<kO%#uQ!0MzO,5<mO%&QQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%(cQ!0MxO7+&aO%)VQlO'#IfO%)dQ`O,5@cO%)lQ!fO,5@cOOQ!0Lf1G0P1G0PO%)vQ`O7+&jOOQ!0Lf7+&j7+&jO%){Q?MtO,5:fO%[QlO7+&zO%*VQ?MtO,5:bO%*dQ?MtO,5:jO%*nQ?MtO,5:lO%*xQMhO'#IiO%+SQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+[Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%+gQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%+lQ!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%+sQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%,gQMhO1G2fP%,nQ`O'#IrPOQ!0Lh-E<p-E<pO%-[QMjO,5?aOOQ!0Lh-E<s-E<sO%-}QMjO,5?cOOQ!0Lh-E<u-E<uO%.XQ!dO1G2wO%.`Q!dO'#CrO%.vQMhO'#KSO$$UQlO'#JvOOQ!0Lh1G2_1G2_O%.}Q`O'#IqO%/cQ`O,5@vO%/cQ`O,5@vO%/kQ`O,5@vO%/vQ`O,5@vOOQO1G2a1G2aO%0UQMjO1G2`O!,TQMhO1G2`O%0fQ(CWO'#IsO%0sQ`O,5@wO!&zQMhO,5@wO%0{Q!dO,5@wOOQ!0Lh1G2d1G2dO%3]Q!fO'#CiO%3gQ`O,5=POOQ!0Lb,5<},5<}O%3oQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%3zQpO,5<}OOQ!0Lb,5=R,5=RO$*gQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$UQlO,5=PO%4YQ`O,5=OO%4eQpO,5=OO!,TQMhO'#IuO%5_QMjO1G2sO!,TQMhO'#IwO%6QQMjO1G2uO%6[QMjO1G5qO%6fQMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%6sQ`O1G2ZO!,TQMhO1G2bO%6xQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%7lQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%7qQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$CsQ`O7+(eO%7{Q!0MvO'#CiO%8`Q!0MvO,5=SO%9QQ`O,5=SO%9YQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9_Q`O'#JQO%9vQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%9vQ`O,5APO%:OQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:TQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:YQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:_Q!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%:iQ`O'#KbO%:tQ`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<WQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<_Q`O1G3`O%<jQMhO1G3`O9uQ!0LrO1G3bO$$qQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%<xQ`O'#JPO%=^Q`O,5@}O%=fQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%=qQ`O7+$VO%[QlO1G6lO%[QlO1G6mO%=vQ!0LrO1G6lO%>QQlO1G3kO%>XQ`O1G3kO%>^QlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%>eQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%>rQ`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%>wQpO1G5|O%?cQ?MtO1G0zO%?mQ`O1G0zOOQO1G/s1G/sO%?xQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$@yQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@SQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@_Q!0LrO7+&XO%@mQ!0MxO7++rO%[QlO7++rO%@}Q`O7++qO%@}Q`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AVQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%AeQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%AmQ`O<<LPO%AxQ!0MzO,5?aO%DTQ!0MzO,5?cO%F`Q!0MzO1G2`O%HqQ!0MzO1G2sO%J|Q!0MzO1G2uO%MXQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%McQ`O1G5}OOQ!0Lf<<JU<<JUO%MkQ?MtO1G0uO& rQ?MtO1G1PO& yQ?MtO1G1PO&#zQ?MtO1G1PO&$RQ?MtO1G1PO&&SQ?MtO1G1PO&(TQ?MtO1G1PO&([Q?MtO1G1PO&(cQ?MtO1G1PO&*dQ?MtO1G1PO&*kQ?MtO1G1PO&*rQ!0MxO<<JfO&,jQ?MtO1G1PO&-gQ?MvO1G1PO&.jQ?MvO'#JlO&0pQ?MtO1G1cO&0}Q?MtO1G0UO&1XQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1cQ`O1G1tO&1hQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&1rQ!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&1yQ`O,5?]O9eQ`O,5?]OOQO-E<o-E<oO&2XQ`O1G6bO&2XQ`O1G6bO&2aQ`O1G6bO&2lQMjO7+'zO&2|Q!dO,5?_O&3WQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3]Q!dO1G6cO&3gQ`O1G6cO&3oQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%3oQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&3tQpO1G2iO&4SQ`O1G2kO$*gQ`O1G2jOCwQ`O1G2jO$$UQlO1G2kO&4[Q`O1G2jO&5OQMjO,5?aOOQ!0Lh-E<t-E<tO&5qQMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&5{QMjO7++]O&6VQMjO7++]OOQ!0Lh1G/c1G/cO&6dQ`O1G/cOOQ!0Lh7+'u7+'uO&6iQMjO7+'|O&6yQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&7mQ`O1G0zO!&zQMhO'#IzO&7rQ`O,5@xO&9tQ!fO<<LPO!&zQMhO1G2nO&9{Q!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:^Q!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;QQ`O,5?lO&;VQ`O,5?lOOQO-E=O-E=OO&;eQ`O1G6kO&;eQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&;mQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:_Q!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&;rQpO'#I|O&;}Q`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<VQpO,5=uOOQ[,5=u,5=uO&<^QpO'#EgO&<eQpO'#GeO&<jQ`O7+(zO&<oQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&<wQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$$qQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=SQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=_Q`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&=gQ`O7+,WO&=lQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&=qQ`O7+)VO&=vQlO7+)VO&=}Q`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>SQ`O,5>aOOQ[,5>c,5>cO&>XQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>^Q?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$@yQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&>hQ!0LrO<<IsO&>sQ!0MxO<= ^O&?TQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?]Q!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&?dQ`OANAkO%[QlOANAkO&?lQ!0MzO7+'zO&A}Q!0MzO,5?aO&DYQ!0MzO,5?cO&FeQ!0MzO7+'|O&HvQ!fO1G4lO&IQQ?MtO7+&aO&KUQ?MvO,5=XO&M]Q?MvO,5=ZO&MmQ?MvO,5=XO&M}Q?MvO,5=ZO&N_Q?MvO,59uO'!eQ?MvO,5<kO'$hQ?MvO,5<mO'&|Q?MvO,5<{O'(rQ?MtO7+'kO')PQ?MtO7+'mO')^Q`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')cQMjO<<K}OOQO1G4w1G4wO')jQ`O1G4wO')uQ`O1G4wO'*TQ`O7++|O'*TQ`O7++|O!&zQMhO1G4yO'*]Q!dO1G4yO'*gQ`O7++}O'*oQ`O7+(VO'*zQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+UQ`O7+(VO!&zQMhO7+(VO$*gQ`O7+(UO'+ZQ`O7+(VOCwQ`O7+(UO'+cQMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O'+mQ!dO,5?fOOQO-E<x-E<xO'+wQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',XQ`O1G5WO',^Q`O7+,VO',^Q`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO',fQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO',kQ`O,5?hOOQO-E<z-E<zO',vQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-QQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&<jQ`O<<LfO'-VQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$$qQ`O<<LhO9`Q`O<<LhO'-_QpO1G5VO'-jQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'-rQ`O<= rO'-wQ`O<= sOOQ[<<Lq<<LqO'-|Q`O<<LqO'.RQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.YQ`O<<JQO'.eQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$@yQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'.oQ!fOG27VO4UQ!fOG27VO'.vQ`OG27VO'/OQ?MtO<<JfO'/]Q?MvO1G2`O'1RQ?MvO,5?aO'3UQ?MvO,5?cO'5XQ?MvO1G2sO'7[Q?MvO1G2uO'9_Q?MtO<<KXO'9lQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO'9yQ`O7+*cO':UQ`O<= hO':^Q!dO7+*eOOQ!0Lb<<Kq<<KqO$*gQ`O<<KqOCwQ`O<<KqO':hQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO':sQ!dO<<KqOOQ!0Lb<<Kp<<KpO':}Q`O<<KqO!&zQMhO<<KqO$*gQ`O<<KpO';SQMjOANDcO';^Q!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO';nQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO';vQ`O7+,SO'<OQ`O1G2kO&<jQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<TQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$$qQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<]Q`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$@yQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<bQ!fOLD,qO'<iQ?MvO7+'zO'>_Q?MvO,5?aO'@bQ?MvO,5?cO'BeQ?MvO7+'|O'DZQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$*gQ`OANA]OCwQ`OANA]O'DkQ!dOANA]OOQ!0LbANAZANAZO'DrQ`OANA]O!&zQMhOANA]O'D}Q!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EXQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&<jQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'EcQ?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'EmQ!0MzOG27TOOQ!0LbG26wG26wO$*gQ`OG26wO'HOQ`OG26wOCwQ`OG26wO'HZQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&<jQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$*gQ`OLD,cOCwQ`OLD,cO'HbQ`OLD,cO'HmQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'HtQ?MvOG27TOOQ!0Lb!$( }!$( }O$*gQ`O!$( }OCwQ`O!$( }O'JjQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$*gQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$*gQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'JuQ!fO'#JrO'J|Q!L^O'#DvO'KTQlO'#EOO'K[Q!fO'#CiO'MrQ!fO'#CiO!)[QlO'#EQO'NSQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!VQ`O,5<iO!)[QlO,5;eO(!_QMhO,5;eO(#xQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!_QMhO'#GmO!&zQMhO'#GoO(!_QMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!_QMhO'#GPO!&zQMhO'#GRO(!_QMhO'#GRO!&zQMhO'#GaO(!_QMhO'#GaO!)[QlO,5:jO($PQpO'#D_O($ZQpO'#JvO!)[QlO,5@oO'NSQlO1G0uO($eQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!_QMhO'#IuO!&zQMhO'#IwO(!_QMhO'#IwO($oQ!dO'#CrO!&zQMhO,5<tO(!_QMhO,5<tO'NSQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!_QMhO1G2`O!&zQMhO'#IuO(!_QMhO'#IuO!&zQMhO'#IwO(!_QMhO'#IwO!&zQMhO1G2bO(!_QMhO1G2bO'NSQlO7+'mO'NSQlO7+&aO!&zQMhOANAiO(!_QMhOANAiO(%SQ`O'#EoO(%XQ`O'#EoO(%aQ`O'#F]O(%fQ`O'#EyO(%kQ`O'#KTO(%vQ`O'#KRO(&RQ`O,5;ZO(&WQMjO,5<eO(&_Q`O'#GYO(&dQ`O'#GYO(&iQ`O,5<eO(&qQ`O,5<gO(&yQ`O,5;ZO('RQ?MtO1G1`O('YQ`O,5<tO('_Q`O,5<tO('dQ`O,5<vO('iQ`O,5<vO('nQ`O1G2RO('sQ`O1G0uO('xQMjO<<K}O((PQMjO<<K}O((WQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.XQ!dO1G2wO%.XQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",stateData:"()^~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<SO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<WO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<XO!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<SO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<pO!S${O!_$|O!i>SO!l$xO#j<vO$W%`O$t<rO$v<tO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<ROQ<ROSfOd>OOe!iOpkOr<ROskOtkOzkO|<RO!O<RO!SWO!WkO!XkO!_!eO!i<UO!lZO!o<RO!p<RO!q<RO!s<VO!u<YO!x!hO$W!kO$n=|O(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<pO!S*YO!_*ZO!i>SO!l$xO#j<vO$W%`O$t<rO$v<tO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~O![*^O(T*XO!k)OP~P!1uO#k*`O~O!l*aO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<pO!S${O!_$|O!i>SO!l$xO#j<vO$W%`O$t<rO$v<tO$y%aO(T*cO(VTO(YUO(a$uO(y$}O(z%PO~O![*fO!Y)PP~P!3tOr*rOs!nO!S*hO!b*pO!c*jO!d*jO!l*aO#[*qO%`*lO(U!lO(VTO(YUO(e!mO~O!^*oO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*wO#`*vOg(_X!](_X~O!]*xOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*{O~Og)}O(T&ZO~O!l+RO~O(T(vO~Op+VO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+WO~O!S%hO![+YO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+[O![+ZO(VTO(YUO(e(|O~O!^(xP~P!9|O!]+]Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+fO!_'`O%i+eO~O!g+hOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+sO%j+tO(T+pO(VTO(YUO!^)XP~O!]+uO`)WX~O[+yO~O`+zO~O!_&PO(T%gO(U!lO`)WP~O%j+}O~P;SOh%VO#`,RO~Oh%VOn,UO!_$|O~O!_,WO~O!Q,YO!_XO~O%n%vO~O!x,_O~Oe,dO~Ob,eO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,jO`,iO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,iOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,oOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,uO~O!_,wO~O&o,yO&q,zOP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-PO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-UO#`-TOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-WO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<ROQ<ROSfOd>OOe!iOpkOr<ROskOtkOzkO|<RO!O<RO!SWO!WkO!XkO!_!eO!i<UO!lZO!o<RO!p<RO!q<RO!s<VO!u<YO!x!hO$W!kO$n=|O(VTO(YUO(aVO(o[O~O(T<}O~P#$qO!]-[O!^(iX~O!^-^O~O!g-UO#`-TO!]#hX!^#hX~O!]-_O!^(xX~O!^-aO~O!c-bO!d-bO(U!lO~P#$`O!^-eO~P'_On-hO!_'`O~O!Y-mO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-rO#`-pO~PChO!c-tO!d-tO(U!lO~PDWOa%nO#`-pO'z%nO~Oa%nO!g#vO#`-pO'z%nO~Oa%nO!g#vO!p-rO#`-pO'z%nO(r'pO~O(P'xO(Q'xO(R-yO~Ov-zO~O!Y'Wa!]'Wa~P!:tO![.OO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.SO!_%iO(T%gO!Y'^X!]'^X~O#`.UO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.YO(T%gO~Op._O!S%hO![.[O!_%iO!|]O#i.^O#j.[O(T%gO!]'aX!k'aX~OR.cO!l#xO~Oh%VOn.fO!_'`O%i.eO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>YO!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].sO!k(kX~P!:tO!k.vO~O!Y.xO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<jOj<_Or<hO!Q#yO!S#{O!l#xO!p$[O#R<_O#n<[O#o<]O#p<]O#q<]O#r<^O#s<_O#t<_O#u<iO#v<`O#x<bO#z<dO#{<eO(aVO(r$YO(y#|O(z#}O~O$O.zO~P#BwO#S$dO#`<kO$Q<kO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>YO!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/OOg(pX~P!1WOg/QO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/RO$_/RO~O$]/SO$_/SO~O!g)hO#`/TO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/UO~O!_)kO$Z/WO$])jO$_)jO$f/XO~O!]<fO!^(fX~P#BwO!^/YO~O!g)hO$f({X~O$f/[O~Ov/]O~P!&zOx)yO(b)zO(c/`O~O!S/cO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SO![/lO!](^O(T/kO!Y(vP!Y)PP~P!1uOr*rO!b*pO!c*jO!d*jO!l*aO#[*qO%`*lO(U!lO(VTO(YUO~Os<zO!S/mO![+ZO!^*oO(e<yO!^(xP~P$ XO!k/nO~P#/sO!]/oO!g#vO(r'pO!k)OX~O!k/tO~O!S%hO![*^O!_%iO(T%gO!k)OP~O#k/vO~O!Y$zX!]$zX!g%RX~P!0SO!]/wO!Y)PX~P#/sO!g/yO~O!Y/{O~OpkO(T/|O~P.iOh%VOr0RO!g#vO!l%eO(r'pO~O!g+hO~Oa%nO!]0VO'z%nO~O!^0XO~P!5iO!c0YO!d0YO(U!lO~P#$`Os!nO!S0ZO(VTO(YUO(e!mO~O#[0]O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*xOg(^a~Og0fO~On0hO#`0gOg(_a!](_a~OR0iO!Q0iO!S0jO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$'pO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$(lO!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$)_O#k0mO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0pO~O!]+]Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$*|Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<pO!S${O!_$|O!i>SO!l$xO#j<vO$W%`O$t<rO$v<tO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0yO%]0zO(T0xO~P$-dO!g+hOa(]a!_(]a'z(]a!](]a~O#k1QO~O[]X!]fX!^fX~O!]1RO!^)XX~O!^1TO~O[1UO~Ob1WO(T+pO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+uO`)Wa~O!k1ZO~P!:tO[1^O~O`1_O~O#`1dO~On1gO!_$|O~O(e(|O!^)UP~Oh%VOn1pO!_1mO%i1oO~O[1zO!]1xO!^)VX~O!^1{O~O`1}Oa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2QO&[2ROa(gX~P$2}Oj2QO#`$eO&[2RO~Oa2TO~P%[Oa2VO~O&e2YOP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2`O!^2^O&j2_O~P`O!_XO!l2bO~O&q,zOP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2hO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2nO(e!mO!]'XX!^'XX~P@nO!]-[O!^(ia~O!]'_X!^'_X~P!9|O!]-_O!^(xa~O!^2uO~P'_Oa%nO#`3OO'z%nO~Oa%nO!g#vO#`3OO'z%nO~Oa%nO!g#vO!p3SO#`3OO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3UO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3ZO#j3YO(T%gO~O!S%hO!_%iO#j3YO(T%gO~On3bO!_'`O%i3aO~Oh%VOn3bO!_'`O%i3aO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$'pO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$(lO#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$)_O#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3jO!]'YX!k'YX~P%[O!].sO!k(ka~O!].sO!k(ka~P!:tO!Y3mO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/OOg(pa~OSfO!_4RO$d4SO~O!^4WO~Ov4XO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4ZO~P!&zO!S4[O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%,sO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%-fO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SO(T=TO~P!1uO!S%hO![4_O!_%iO(T%gO!]'eX!k'eX~O!]/oO!k)Oa~O!]/oO!g#vO!k)Oa~O!]/oO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4gO!Y'gX!]'gX~P!3tO!]/wO!Y)Pa~O!]/wO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%1VOj4lO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4qO!l%eO(r'pO~Or4vO!g#vO(r'pO~Os!nO!S4wO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%4vO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%5iOg(_i!](_i~P!1WO#`4}Og(_i!](_i~P!1WO!k5SO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5WO~O!]5XO!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5[OaoXnoX!QoX!_oX'yoX'zoX(yoX(zoX!]oX~Op5]O(T#nO~O%^5[O~Ob5cO%j5dO(T+pO(VTO(YUO!]'tX!^'tX~O!]1RO!^)Xa~O[5hO~O`5iO~O[5mO~Oa%nO'z%nO~P#/sO!]5rO#`5tO!^)UX~O!^5uO~Or5{Os!nO!S*hO!b!yO!c!vO!d!vO!|<SO#T!pO#U!pO#V!pO#W!pO#X!pO#[5zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5yO~P%:yOn6QO!_1mO%i6PO~Oh%VOn6QO!_1mO%i6PO~Ob6XO(T#nO(VTO(YUO!]'sX!^'sX~O!]1xO!^)Va~O(VTO(YUO(e6ZO~O`6_O~Oj6bO&[6cO~PNXO!k6dO~P%[Oa6fO~Oa6fO~P%[Ob2`O!^6kO&j2_O~P`O!g6mO~O!g6oOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6pO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6yO'z%nO~Oa%nO!g#vO#`6yO'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7QO(T%gO~O!_'`O%i7TO~On7XO!_'`O%i7TO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%,sO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%-fO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%4vO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%5iO!]'Ya!k'Ya~P!:tO!].sO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%MxO#n<[O~P%MxOP$[OR#zOr<hO!Q#yO!S#{O!l#xO!p$[O#n<[O#o<]O#p<]O#q<]O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!QO#r<^O~P&!QOP$[OR#zO[<jOj<_Or<hO!Q#yO!S#{O!l#xO!p$[O#R<_O#n<[O#o<]O#p<]O#q<]O#r<^O#s<_O#t<_O#u<iO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$YOP$[OR#zO[<jOj<_Or<hO!Q#yO!S#{O!l#xO!p$[O#R<_O#n<[O#o<]O#p<]O#q<]O#r<^O#s<_O#t<_O#u<iO#v<`O(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<bO~P&&ZO#x#mi~P&&ZO#v<`O~P&$YOP$[OR#zO[<jOj<_Or<hO!Q#yO!S#{O!l#xO!p$[O#R<_O#n<[O#o<]O#p<]O#q<]O#r<^O#s<_O#t<_O#u<iO#v<`O#x<bO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&(jO#z<dO~P&(jOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<[O#o<]O#p<]O#q<]O(aVO(y#mi(z#mi~P&+fOn>ZO!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&+fO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$*|Og']a!]']a~P!1WO!^7kO~O!]'da!^'da~P#BwO!Y7lO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/oO!k)Oi~O!]/oO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7sO~O!]/wO!Y)Pi~P#/sO!]/wO!Y)Pi~O!Y7vO~Oh%VOr7{O!l%eO(r'pO~Oj7}O!g#vO~Or8QO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&4gO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5YOg(_q!](_q~P!1WO#`8SOg(_q!](_q~P!1WO!Y8TO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6oO~O!]5XO!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7TO~P&7zO%^8XOa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8ZO~Ob8]O(T+pO(VTO(YUO~O!]1RO!^)Xi~O`8aO~O(e(|O!]'pX!^'pX~O!]5rO!^)Ua~O!^8kO~P%:yO(o!sO~P$%gO#[8lO~O!_1mO~O!_1mO%i8nO~On8qO!_1mO%i8nO~O[8vO!]'sa!^'sa~O!]1xO!^)Vi~O!k8zO~O!k8{O~O!k9OO~O!k9OO~P%[Oa9QO~O!g9RO~O!k9SO~O!](wi!^(wi~P#BwOa%nO#`9[O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9_O~P&7zO!_'`O%i9_O~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&4gO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5YO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&I_O(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&KfOn>ZO!Q*OO'y*PO(z%PO~P&I_On>ZO!Q*OO'y*PO(y$}O~P&KfOR0iO!Q0iO!S0jO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>ZO!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P'&kO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9lO~O$O9mO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/oO!k)Oq~O!Y'gi!]'gi~P#/sO!]/wO!Y)Pq~Or9tO!g#vO(r'pO~O[9vO!Y9uO~P#/sO!Y9uO~Oj9|O!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:RO~O!]1RO!^)Xq~O`:VO~O#`:WO!]'pa!^'pa~O!]5rO!^)Ui~P#BwO!S:YO~O!_1mO%i:]O~O(VTO(YUO(e:bO~O!]1xO!^)Vq~O!k:eO~O!k:fO~O!k:gO~O!k:gO~P%[O#`:jO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:oO~P&7zO!_'`O%i:oO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P'&kO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/oO!k)Oy~O!Y'gq!]'gq~P#/sOr:yO!g#vO(r'pO~O[:}O!Y:|O~P#/sO!Y:|O~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1RO!^)Xy~O!]5rO!^)Uq~O(T;UO~O!_1mO%i;XO~O!k;[O~O%i;aO~P&7zOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P'&kO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P'&kOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;eO~P#/sOr;fO!g#vO(r'pO~O[;hO!Y;eO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;qO!g#vO(r'pO~O!Y;rO~P#/sOr;yO!g#vO(r'pO~O!Y;zO~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P'&kOr;}O!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%1VOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'KiOP<ROQ<ROSfOd>OOe!iOpkOr<ROskOtkOzkO|<RO!O<RO!SWO!WkO!XkO!_XO!i<UO!lZO!o<RO!p<RO!q<RO!s<VO!u<YO!x!hO$W!kO$n=|O(T)]O(VTO(YUO(aVO(o[O~O!]<fO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<qO!S${O!_$|O!i>TO!l$xO#j<wO$W%`O$t<sO$v<uO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!_Or!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'KiO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<ZO~O!g#vO#k<ZO~O#`<kO~Oj<_O~O#`<{O!](wX!^(wX~O#`<kO!](uX!^(uX~O#k<|O~Og=OO~P!1WO#k=UO~O#k=VO~Og=OO(T&ZO~O!g#vO#k=WO~O!g#vO#k<|O~O$O=XO~P#BwO#k=YO~O#k=ZO~O#k=`O~O#k=aO~O#k=bO~O#k=cO~O$O=dO~P!1WO$O=eO~P!1WOl=pO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",goto:"$9V)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2fI[I[!2k!5w!:e!:e!>dPPP!>lI[PPPPPPPPP!A{P!CYPPI[!DkPI[PI[I[I[I[I[PI[!E}P!IXP!L_P!Lc!Lm!Lq!LqP!IUP!Lu!LuP# {P#!PI[PI[#!V#%[CjA^PA^PA^A^P#&iA^A^#({A^#+sA^#.PA^A^#.o#1T#1T#1Y#1c#1T#1nPP#1TPA^#2WA^#6VA^A^6mPPP#:[PPP#:u#:uP#:uP#;]#:uPP#;cP#;YP#;Y#;v#;Y#<b#<h#<k)aP#<n)aP#<w#<w#<wP)aP)aP)aP)aPP)aP#<}#=QP#=Q)aP#=UP#=XP)aP)aP)aP)aP)aP)a)aPP#=_#=e#=p#=v#=|#>S#>Y#>h#>n#>x#?O#?Y#?`#?p#?v#@h#@z#AQ#AW#Af#A{#Cp#DO#DV#Eq#FP#Gq#HP#HV#H]#Hc#Hm#Hs#Hy#IT#Ig#ImPPPPPPPPPPP#IsPPPPPPP#Jh#Mu$ _$ f$ nPPP$'YP$'c$*[$0u$0x$0{$1z$1}$2U$2^P$2d$2gP$3T$3X$4P$5_$5d$5zPP$6P$6V$6Z$6^$6b$6f$7b$7y$8b$8f$8i$8l$8v$8y$8}$9RR!|RoqOXst!Z#d%m&r&t&u&w,r,w2Y2]Y!vQ'`-d1m5xQ%tvQ%|yQ&T|Q&j!VS'W!e-[Q'f!iS'l!r!yU*j$|*Z*nQ+n%}S+{&V&WQ,c&dQ-b'_Q-l'gQ-t'mQ0Y*pQ1`+}Q1w,dR<x<V%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[,o,r,w-h-p.O.U.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3j4w6Q6b6c6f6y8q9Q9[S#q]<S!r)_$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PU+O%]<p<qQ+s&PQ,e&gQ,l&oQ0v+fQ0{+hQ1W+tQ2P,jQ3^.fQ5]0zQ5c1RQ6X1xQ7V3bQ8]5dR9b7X'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>P!S!nQ!r!v!y!z$|'W'_'`'l'm'n*j*n*p*q-[-b-d-t0Y0]1m5x5z%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*`*f*v*w+e+h,R,U.e/O/c/l/v/w/y0^0`0g0h0m1d1g1o3a4[4]4g4l4}5X5[6P7T7s7}8S8X8n9_9m9v9|:]:o:};X;a;h<i<j<l<m<n<o<r<s<t<u<v<w=P=Q=R=S=U=V=Y=Z=[=]=^=_=`=a=d=e=|>U>V>Y>ZQ&X|Q'U!eS'[%i-_Q+s&PQ,O&WQ,e&gQ0l+RQ1W+tQ1]+zQ2O,iQ2P,jQ5c1RQ5l1_Q6X1xQ6[1zQ6]1}Q8]5dQ8`5iQ8y6_Q:U8aQ:c8vQ;S:VR<z*ZrnOXst!V!Z#d%m&i&r&t&u&w,r,w2Y2]R,g&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>O>P[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*a+Y+Z+],n-U.S.Y.Z.[.^/l/o2b3Y3Z4_6o7QQ%wxQ%{yW&Q|&V&W+}Q&_!TQ'c!hQ'e!iQ(q#sS+m%|%}Q+q&PQ,^&bQ,b&dS-k'f'gQ.h(rQ1P+nQ1V+tQ1X+uQ1[+yQ1r,_S1v,c,dQ2z-lQ5b1RQ5f1UQ5k1^Q6W1wQ8[5dQ8_5hQ8c5mQ:Q8ZR;Q:R!U$zi$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>V!^%yy!i!u%{%|%}'V'e'f'g'k'u*i+m+n-X-k-l-s0P0S1P2s2z3R4o4p4s7z9xQ+g%wQ,S&[Q,V&]Q,a&dQ.g(qQ1q,^U1u,b,c,dQ3c.hQ6R1rS6V1v1wQ8u6W#f>Q#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>Zo>R<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=eW%Ti%V*x=|S&[!Q&iQ&]!RQ&^!SU*|%[%d=pR,Q&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*`*f*v*w+e+h,R,U.e/O/c/l/v/w/y0^0`0g0h0m1d1g1o3a4[4]4g4l4}5X5[6P7T7s7}8S8X8n9_9m9v9|:]:o:};X;a;h<i<j<l<m<n<o<r<s<t<u<v<w=P=Q=R=S=U=V=Y=Z=[=]=^=_=`=a=d=e=|>U>V>Y>ZT)z$u){V+O%]<p<qW'[!e%i*Z-_S(}#y#zQ+b%rQ+x&SS.a(m(nQ1h,WQ5Q0iR8f5r'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>P$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+c+w-Y-w-|.R.T.r.u.y.{.|.}/a0n2i2l2|3T3i3n3o3p3q3r3s3t3u3v3w3x3y3z3}4O4V5U5`6r6x6}7^7_7h7i8h9U9Y9d9j9k:l;T;]<T=sT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PQ'Y!eR2o-[!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*j*n*p*q-[-b-d-t0Y0]1m5x5zR1j,YnqOXst!Z#d%m&r&t&u&w,r,w2Y2]Q&y!^Q'v!xS(s#u<ZQ+k%zQ,[&_Q,]&aQ-i'dQ-v'oS.q(x<|S0o+W=WQ0}+lQ1l,ZQ2a,yQ2c,zQ2k-VQ2x-jQ2{-nS5V0p=bQ5^1OS5a1Q=cQ6q2mQ6u2yQ6z3QQ8Y5_Q9V6sQ9W6vQ9Z6{R:i9S$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+c+w-Y-w-|.R.T.r.u.y.|.}/a0n2i2l2|3T3i3n3o3p3q3r3s3t3u3v3w3x3y3z3}4O4V5U5`6r6x6}7^7_7h7i8h9U9Y9d9j9k:l;T;]<T=sS(o#p'iQ)P#zS+a%q.{S.b(n(pR3[.c'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PS#q]<SQ&t!XQ&u!YQ&w![Q&x!]R2X,uQ'a!hQ+d%wQ-g'cS.d(q+gQ2v-fW3`.g.h0u0wQ6t2wW7R3]3_3c5ZU9^7S7U7WU:n9`9a9cS;_:m:pQ;m;`R;u;nU!wQ'`-dT5v1m5x!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,r,w.Z2Y2]]!pQ!r'`-d1m5xT#q]<S%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[+f,o,r,w-h-p.O.U.f.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3b3j4w6Q6b6c6f6y7X8q9Q9[S(}#y#zS.a(m(n!s=i$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PU$fd)_,lS(p#p'iU*u%R(w3|U0k*}.m7dQ5Z0vQ7S3^Q9a7VR:p9bm!tQ!r!v!y!z'`'l'm'n-d-t1m5x5zQ't!uS(f#g2SS-r'k'wQ/r*]Q0P*iQ3S-uQ4c/sQ4o0RQ4p0SQ4u0[Q7o4^S7z4q4sS8O4v4xQ9o7pQ9s7vQ9x7{Q9}8QS:x9t9uS;d:y:|S;p;e;fS;x;q;rS;|;y;zR<P;}Q#wbQ's!uS(e#g2SS(g#m+VQ+X%fQ+i%xQ+o&OU-q'k't'wQ.V(fQ/q*]Q0Q*iQ0T*kQ0|+jQ1s,`S3P-r-uQ3X._S4b/r/sQ4k/}S4n0P0[Q4r0UQ6T1tQ6|3SQ7n4^Q7r4cU7y4o4u4xQ7|4tQ8s6US9n7o7pQ9r7vQ9z8OQ9{8PQ:`8tQ:v9oS:w9s9uQ;P9}Q;Z:aS;c:x:|S;o;d;eS;w;p;rS;{;x;zQ<O;|Q<Q<PQ=l=gQ=x=qR=y=rV!wQ'`-d%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[+f,o,r,w-h-p.O.U.f.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3b3j4w6Q6b6c6f6y7X8q9Q9[S#wz!j!r=f$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PR=l>O%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[+f,o,r,w-h-p.O.U.f.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3b3j4w6Q6b6c6f6y7X8q9Q9[Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*i+m+n-X-k-l-s0P0S1P2s2z3R4o4p4s7z9xS&Oz!jQ+j%yQ,`&dW1t,a,b,c,dU6U1u1v1wS8t6V6WQ:a8u!r=g$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PQ=q=}R=r>O%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*h+W+[+f,o,r,w-h-p.O.U.f.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3b3j4w6Q6b6c6f6y7X8q9Q9[Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*a+Y+Z+],n-U.S.Y.Z.[.^/l/o2b3Y3Z4_6o7QQ,m&o!p=h$Z$n)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PR=k'XU']!e%i*ZR2q-_%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[,o,r,w-h-p.O.U.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3j4w6Q6b6c6f6y8q9Q9[!r)_$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PQ,l&oQ0v+fQ3^.fQ7V3bR9b7X!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+w-w-|.R.T.r.u/a0n2|3T3i3y5U5`6x6}7^9Y:l<T!P<a)^)q-Y.{2i2l3n3w3x3}4V6r7_7h7i8h9U9d9j9k;T;]=s!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+w-w-|.R.T.r.u/a0n2|3T3i3y5U5`6x6}7^9Y:l<T!T<c)^)q-Y.{2i2l3n3t3u3w3x3}4V6r7_7h7i8h9U9d9j9k;T;]=s!^$Zc#Y%q(S(Y(t(y)`)g+w-w-|.R.T.r.u/a0n2|3T3i3y5U5`6x6}7^9Y:l<TQ4]/jz>P)^)q-Y.{2i2l3n3}4V6r7_7h7i8h9U9d9j9k;T;]=sQ>U>WR>V>X'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PS$oh$pR4S/T'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/T/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PT$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*h+W+[+f,o,r,w-T-W-h-p.O.U.f.s.z/T/U/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_2n3O3U3b3j4R4w5t6Q6b6c6f6p6y7X8q9Q9[:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>PT$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*h+W+[+f,o,r,w-h-p.O.U.f.s.z/m0Z0j0p1Q1p2Q2R2T2V2Y2]2_3O3U3b3j4w6Q6b6c6f6y7X8q9Q9[!s=}$Z$n'X)s-T-W/U2n4R5t6p:W:j<R<U<V<Y<Z<[<]<^<_<`<a<b<c<d<e<f<h<k<x<{<|=O=W=X=b=c>P#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*h+[+f,o,r,w-h.f/U/m0Z0j1p2Q2R2T2V2Y2]2_3b4R4w6Q6b6c6f7X8q9Q!U%Ri$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>V#f(w#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>ZQ+S%aQ/b*Oo3|<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=e!U$yi$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>VQ*b$zU*k$|*Z*nQ+T%bQ0U*l#f=n#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>Zn=o<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=eQ=t>QQ=u>RQ=v>SR=w>T!U%Ri$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>V#f(w#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>Zo3|<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=enoOXst!Z#d%m&r&t&u&w,r,w2Y2]S*e${*YQ-Q'OQ-R'QR4f/w%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*`*f*v*w+e+h,R,U.e/O/c/l/v/w/y0^0`0g0h0m1d1g1o3a4[4]4g4l4}5X5[6P7T7s7}8S8X8n9_9m9v9|:]:o:};X;a;h<i<j<l<m<n<o<r<s<t<u<v<w=P=Q=R=S=U=V=Y=Z=[=]=^=_=`=a=d=e=|>U>V>Y>ZQ,T&]Q1f,VQ5p1eR8e5qV*m$|*Z*nU*m$|*Z*nT5w1m5xS/}*h/mQ4t0ZT8P4w:YQ+i%xQ0T*kQ0|+jQ1s,`Q6T1tQ8s6UQ:`8tR;Z:a!U%Oi$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>Vx*R$v)e*S*t+U/u0b0c4P4d5O5P5T7m8R:O:u=m=z={S0^*s0_#f<l#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>Zn<m<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=e!d=P(u)c*[*d.i.l.p/^/j/z0t1c3f4Y4e4i5o7Y7]7t7w8U8W9q9y:P:z;O;b;g;s>W>X`=Q3{7`7c7g9e:q:t;vS=[.k3gT=]7b9h!U%Qi$d%O%Q%^%_%c*R*T*`*v*w/O/v0^0`0g0h0m4]4}8S9m=|>U>V|*T$v)e*U*s+U/f/u0b0c4P4d4y5O5P5T7m8R:O:u=m=z={S0`*t0a#f<n#v$b$c$x${)y*V*Y*f+e+h,R,U.e/c/l/w/y1d1g1o3a4[4g4l5X5[6P7T7s7}8X8n9_9v9|:]:o:};X;a;h<l<n<r<t<v=P=R=U=Y=[=^=`=d>Y>Zn<o<i<j<m<o<s<u<w=Q=S=V=Z=]=_=a=e!h=R(u)c*[*d.j.k.p/^/j/z0t1c3d3f4Y4e4i5o7Y7Z7]7t7w8U8W9q9y:P:z;O;b;g;s>W>Xd=S3{7a7b7g9e9f:q:r:t;vS=^.l3hT=_7c9irnOXst!V!Z#d%m&i&r&t&u&w,r,w2Y2]Q&f!UR,o&ornOXst!V!Z#d%m&i&r&t&u&w,r,w2Y2]R&f!UQ,X&^R1b,QsnOXst!V!Z#d%m&i&r&t&u&w,r,w2Y2]Q1n,^S6O1q1rU8m5|5}6RS:[8o8pS;V:Z:^Q;j;WR;t;kQ&m!VR,h&iR6[1zR:c8vW&Q|&V&W+}R1X+uQ&r!WR,r&sR,x&xT2Z,w2]R,|&yQ,{&yR2d,|Q'y!{R-x'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/_){Q#UVR(Q#UQ#XWU(W#X(X.PQ(X#YR.P(YQ-]'YR2p-]Q.t(yS3k.t3lR3l.uQ-d'`R2t-dY!rQ'`-d1m5xR'j!rQ/P)eR4Q/PU#_W%h*YU(_#_(`.QQ(`#`R.Q(ZQ-`']R2r-`t`OXst!V!Z#d%m&i&k&r&t&u&w,r,w2Y2]S#hZ%eU#r`#h.ZR.Z(jQ(k#jQ.W(gW.`(k.W3V7OQ3V.XR7O3WQ)n$lR/V)nQ$phR)t$pQ$`cU)a$`-{<gQ-{<TR<g)qQ/p*]W4`/p4a7q9pU4a/q/r/sS7q4b4cR9p7r$e*Q$v(u)c)e*[*d*s*t+P+Q+U.k.l.n.o.p/^/f/h/j/u/z0b0c0t1c3d3e3f3{4P4Y4d4e4i4y4{5O5P5T5o7Y7Z7[7]7b7c7e7f7g7m7t7w8R8U8W9e9f9g9q9y:O:P:q:r:s:t:u:z;O;b;g;s;v=m=z={>W>XQ/x*dU4h/x4j7uQ4j/zR7u4iS*n$|*ZR0W*nx*S$v)e*s*t+U/u0b0c4P4d5O5P5T7m8R:O:u=m=z={!d.i(u)c*[*d.k.l.p/^/j/z0t1c3f4Y4e4i5o7Y7]7t7w8U8W9q9y:P:z;O;b;g;s>W>XU/g*S.i7`a7`3{7b7c7g9e:q:t;vQ0_*sQ3g.kU4z0_3g9hR9h7b|*U$v)e*s*t+U/f/u0b0c4P4d4y5O5P5T7m8R:O:u=m=z={!h.j(u)c*[*d.k.l.p/^/j/z0t1c3d3f4Y4e4i5o7Y7Z7]7t7w8U8W9q9y:P:z;O;b;g;s>W>XU/i*U.j7ae7a3{7b7c7g9e9f:q:r:t;vQ0a*tQ3h.lU4|0a3h9iR9i7cQ*y%UR0e*yQ5Y0tR8V5YQ+^%kR0s+^Q5s1hS8g5s:XR:X8hQ,Z&_R1k,ZQ5x1mR8j5xQ1y,eS6Y1y8wR8w6[Q1S+qW5e1S5g8^:SQ5g1VQ8^5fR:S8_Q+v&QR1Y+vQ2],wR6j2]YrOXst#dQ&v!ZQ+`%mQ,q&rQ,s&tQ,t&uQ,v&wQ2W,rS2Z,w2]R6i2YQ%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+_%lQ+k%zQ,P&XQ,g&mQ-O&|W-o'k's't'wQ-v'oQ0V*mQ0}+lQ1a,OS1|,h,kQ2e,}Q2f-QQ2g-RQ2{-nW2}-q-r-u-wQ5^1OQ5j1]Q5n1cQ6S1sQ6^2OQ6h2XU6w2|3P3SQ6z3QQ8Y5_Q8b5lQ8d5oQ8i5wQ8r6TQ8x6]S9X6x6|Q9Z6{Q:T8`Q:_8sQ:d8yQ:k9YQ;R:UQ;Y:`Q;^:lQ;i;SR;l;ZQ%zyQ'd!iQ'o!uU+l%{%|%}Q-V'VU-j'e'f'gS-n'k'uQ0O*iS1O+m+nQ2m-XS2y-k-lQ3Q-sS4m0P0SQ5_1PQ6s2sQ6v2zQ6{3RU7x4o4p4sQ9w7zR:{9xS$wi=|R*z%VU%Ui%V=|R0d*xQ$viS(u#v+hS)c$b$cQ)e$dQ*[$xS*d${*YQ*s%OQ*t%QQ+P%^Q+Q%_Q+U%cQ.k<lQ.l<nQ.n<rQ.o<tQ.p<vQ/^)yQ/f*RQ/h*TQ/j*VQ/u*`S/z*f/lQ0b*vQ0c*wl0t+e,U.e1g1o3a6P7T8n9_:]:o;X;aQ1c,RQ3d=PQ3e=RQ3f=US3{<i<jQ4P/OS4Y/c4[Q4d/vQ4e/wQ4i/yQ4y0^Q4{0`Q5O0gQ5P0hQ5T0mQ5o1dQ7Y=YQ7Z=[Q7[=^Q7]=`Q7b<mQ7c<oQ7e<sQ7f<uQ7g<wQ7m4]Q7t4gQ7w4lQ8R4}Q8U5XQ8W5[Q9e=VQ9f=QQ9g=SQ9q7sQ9y7}Q:O8SQ:P8XQ:q=ZQ:r=]Q:s=_Q:t=aQ:u9mQ:z9vQ;O9|Q;b=dQ;g:}Q;s;hQ;v=eQ=m=|Q=z>UQ={>VQ>W>YR>X>ZQ*}%]Q.m<pR7d<qnpOXst!Z#d%m&r&t&u&w,r,w2Y2]Q!fPS#fZ#oQ&|!`W'h!o*h0Z4wQ(P#SQ)Q#{Q)r$nS,k&k&nQ,p&oQ,}&{S-S'T/mQ-f'bQ.w)OQ/Z)sQ0q+[Q0w+fQ2U,oQ2w-hQ3_.fQ4U/UQ5R0jQ5}1pQ6`2QQ6a2RQ6e2TQ6g2VQ6l2_Q7W3bQ7j4RQ8p6QQ8|6bQ8}6cQ9P6fQ9c7XQ:^8qR:h9Q#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*h+[+f,o,r,w-h.f/m0Z0j1p2Q2R2T2V2Y2]2_3b4w6Q6b6c6f7X8q9QQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/U4RQ+c%tQ+w&RS-Y'X2nQ-w'rS-|(T.OQ.R(]Q.T(dQ.r(xQ.u(zQ.y<RQ.{<UQ.|<VQ.}<YQ/a)}Q0n+WQ2i-TQ2l-WQ2|-pQ3T.UQ3i.sQ3n<ZQ3o<[Q3p<]Q3q<^Q3r<_Q3s<`Q3t<aQ3u<bQ3v<cQ3w<dQ3x<eQ3y.zQ3z<hQ3}<kQ4O<xQ4V<fQ5U0pQ5`1QQ6r<{Q6x3OQ6}3UQ7^3jQ7_<|Q7h=OQ7i=WQ8h5tQ9U6pQ9Y6yQ9d=XQ9j=bQ9k=cQ:l9[Q;T:WQ;]:jQ<T#SR=s>PR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-d-t1m5x5zS'V!e-[U*i$|*Z*nS-X'W'_S0S*j*pQ0[*qQ2s-bQ4s0YR4x0]R({#xQ!fQT-c'`-d]!qQ!r'`-d1m5xQ#p]R'i<SR)f$dY!uQ'`-d1m5xQ'k!rS'u!v!yS'w!z5zS-s'l'mQ-u'nR3R-tT#kZ%eS#jZ%eS%km,nU(g#h#i#lS.X(h(iQ.](jQ0r+]Q3W.YU3X.Z.[.^S7P3Y3ZR9]7Qd#^W#W#Z%h(T(^*Y+Y.S/lr#gZm#h#i#l%e(h(i(j+].Y.Z.[.^3Y3Z7QS*]$x*aQ/s*^Q2S,nQ2j-UQ4^/oQ6n2bQ7p4_Q9T6oT=j'X+ZV#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Y/lS-Z'X+ZT-}(T.SV'^!e%i*ZQ$lfR)x$qT)m$l)nR4T/TT*_$x*aT*g${*YQ0u+eQ1e,UQ3].eQ5q1gQ5|1oQ7U3aQ8o6PQ9`7TQ:Z8nQ:m9_Q;W:]Q;`:oQ;k;XR;n;anqOXst!Z#d%m&r&t&u&w,r,w2Y2]Q&l!VR,g&itmOXst!U!V!Z#d%m&i&r&t&u&w,r,w2Y2]R,n&oT%lm,nR1i,WR,f&gQ&U|S+|&V&WR1[+}R+r&PT&p!W&sT&q!W&sT2[,w2]",nodeNames:"\u26A0 ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",maxTerm:380,context:ZC,nodeProps:[["isolate",-8,5,6,14,37,39,51,53,55,""],["group",-26,9,17,19,68,207,211,215,216,218,221,224,234,237,243,245,247,249,252,258,264,266,268,270,272,274,275,"Statement",-34,13,14,32,35,36,42,51,54,55,57,62,70,72,76,80,82,84,85,110,111,120,121,136,139,141,142,143,144,145,147,148,167,169,171,"Expression",-23,31,33,37,41,43,45,173,175,177,178,180,181,182,184,185,186,188,189,190,201,203,205,206,"Type",-3,88,103,109,"ClassItem"],["openedBy",23,"<",38,"InterpolationStart",56,"[",60,"{",73,"(",160,"JSXStartCloseTag"],["closedBy",-2,24,168,">",40,"InterpolationEnd",50,"]",61,"}",74,")",165,"JSXEndTag"]],propSources:[BC],skippedNodes:[0,5,6,278],repeatNodeCount:37,tokenData:"$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",tokenizers:[DC,NC,qC,YC,2,3,4,5,6,7,8,9,10,11,12,13,14,XC,new Mi("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~",141,340),new Mi("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~",25,323)],topRules:{Script:[0,7],SingleExpression:[1,276],SingleClassItem:[2,277]},dialects:{jsx:0,ts:15149},dynamicPrecedences:{80:1,82:1,94:1,169:1,199:1},specialized:[{term:327,get:t=>jC[t]||-1},{term:343,get:t=>LC[t]||-1},{term:95,get:t=>VC[t]||-1}],tokenPrec:15175});var Pe=class{constructor(e){this.start=e}},cO=class extends Pe{constructor(e,i,n,s,r,l,a,o,u,c,h,f,d,m,g){super(e),this.rules=i,this.topRules=n,this.tokens=s,this.localTokens=r,this.context=l,this.externalTokens=a,this.externalSpecializers=o,this.externalPropSources=u,this.precedences=c,this.mainSkip=h,this.scopedSkip=f,this.dialects=d,this.externalProps=m,this.autoDelim=g}toString(){return Object.values(this.rules).join(`
`)}},io=class extends Pe{constructor(e,i,n,s,r){super(e),this.id=i,this.props=n,this.params=s,this.expr=r}toString(){return this.id.name+(this.params.length?`<${this.params.join()}>`:"")+" -> "+this.expr}},hO=class extends Pe{constructor(e,i){super(e),this.items=i}},fO=class extends Pe{constructor(e,i){super(e),this.items=i}},dO=class extends Pe{constructor(e,i,n){super(e),this.a=i,this.b=n}},pO=class extends Pe{constructor(e,i,n,s,r){super(e),this.precedences=i,this.conflicts=n,this.rules=s,this.literals=r}},mO=class extends Pe{constructor(e,i,n,s){super(e),this.precedences=i,this.rules=n,this.fallback=s}},OO=class extends Pe{constructor(e,i,n){super(e),this.literal=i,this.props=n}},gO=class extends Pe{constructor(e,i,n){super(e),this.id=i,this.source=n}},yO=class extends Pe{constructor(e,i,n,s,r){super(e),this.id=i,this.source=n,this.tokens=s,this.conflicts=r}},bO=class extends Pe{constructor(e,i,n,s,r,l){super(e),this.type=i,this.token=n,this.id=s,this.source=r,this.tokens=l}},xO=class extends Pe{constructor(e,i,n){super(e),this.id=i,this.source=n}},SO=class extends Pe{constructor(e,i,n,s){super(e),this.id=i,this.externalID=n,this.source=s}},Ic=class extends Pe{constructor(e,i){super(e),this.name=i}toString(){return this.name}},Et=class extends Pe{walk(e){return e(this)}eq(e){return!1}};Et.prototype.prec=10;var Fe=class t extends Et{constructor(e,i,n){super(e),this.id=i,this.args=n}toString(){return this.id.name+(this.args.length?`<${this.args.join()}>`:"")}eq(e){return this.id.name==e.id.name&&ao(this.args,e.args)}walk(e){let i=YO(this.args,e);return e(i==this.args?this:new t(this.start,this.id,i))}},tl=class t extends Et{constructor(e,i,n,s,r){super(e),this.type=i,this.props=n,this.token=s,this.content=r}toString(){return`@${this.type}[${this.props.join(",")}]<${this.token}, ${this.content}>`}eq(e){return this.type==e.type&&il.eqProps(this.props,e.props)&&Hn(this.token,e.token)&&Hn(this.content,e.content)}walk(e){let i=this.token.walk(e),n=this.content.walk(e);return e(i==this.token&&n==this.content?this:new t(this.start,this.type,this.props,i,n))}},_s=class t extends Et{constructor(e,i){super(e),this.rule=i}toString(){let e=this.rule;return`${e.id}${e.props.length?`[${e.props.join(",")}]`:""} { ${e.expr} }`}eq(e){let i=this.rule,n=e.rule;return Hn(i.expr,n.expr)&&i.id.name==n.id.name&&il.eqProps(i.props,n.props)}walk(e){let i=this.rule,n=i.expr.walk(e);return e(n==i.expr?this:new t(this.start,new io(i.start,i.id,i.props,[],n)))}},Wn=class t extends Et{constructor(e,i){super(e),this.exprs=i}toString(){return this.exprs.map(e=>BO(e,this)).join(" | ")}eq(e){return ao(this.exprs,e.exprs)}walk(e){let i=YO(this.exprs,e);return e(i==this.exprs?this:new t(this.start,i))}};Wn.prototype.prec=1;var Mt=class t extends Et{constructor(e,i,n,s=!1){super(e),this.exprs=i,this.markers=n,this.empty=s}toString(){return this.empty?"()":this.exprs.map(e=>BO(e,this)).join(" ")}eq(e){return ao(this.exprs,e.exprs)&&this.markers.every((i,n)=>{let s=e.markers[n];return i.length==s.length&&i.every((r,l)=>r.eq(s[l]))})}walk(e){let i=YO(this.exprs,e);return e(i==this.exprs?this:new t(this.start,i,this.markers,this.empty&&!i.length))}};Mt.prototype.prec=2;var kO=class extends Pe{constructor(e,i,n){super(e),this.id=i,this.type=n}toString(){return(this.type=="ambig"?"~":"!")+this.id.name}eq(e){return this.id.name==e.id.name&&this.type==e.type}},Ds=class t extends Et{constructor(e,i,n){super(e),this.expr=i,this.kind=n}toString(){return BO(this.expr,this)+this.kind}eq(e){return Hn(this.expr,e.expr)&&this.kind==e.kind}walk(e){let i=this.expr.walk(e);return e(i==this.expr?this:new t(this.start,i,this.kind))}};Ds.prototype.prec=3;var Ot=class extends Et{constructor(e,i){super(e),this.value=i}toString(){return JSON.stringify(this.value)}eq(e){return this.value==e.value}},Hc=class extends Et{constructor(e,i,n){super(e),this.ranges=i,this.inverted=n}toString(){return`[${this.inverted?"^":""}${this.ranges.map(([e,i])=>String.fromCodePoint(e)+(i==e+1?"":"-"+String.fromCodePoint(i)))}]`}eq(e){return this.inverted==e.inverted&&this.ranges.length==e.ranges.length&&this.ranges.every(([i,n],s)=>{let[r,l]=e.ranges[s];return i==r&&n==l})}},Kc=class extends Et{constructor(e){super(e)}toString(){return"_"}eq(){return!0}};function YO(t,e){let i=null;for(let n=0;n<t.length;n++){let s=t[n].walk(e);s!=t[n]&&!i&&(i=t.slice(0,n)),i&&i.push(s)}return i||t}var vO={asciiLetter:[[65,91],[97,123]],asciiLowercase:[[97,123]],asciiUppercase:[[65,91]],digit:[[48,58]],whitespace:[[9,14],[32,33],[133,134],[160,161],[5760,5761],[8192,8203],[8232,8234],[8239,8240],[8287,8288],[12288,12289]],eof:[[65535,65535]]},no=class extends Et{constructor(e,i){super(e),this.type=i}toString(){return"@"+this.type}eq(e){return this.type==e.type}};function Hn(t,e){return t.constructor==e.constructor&&t.eq(e)}function ao(t,e){return t.length==e.length&&t.every((i,n)=>Hn(i,e[n]))}var il=class extends Pe{constructor(e,i,n,s){super(e),this.at=i,this.name=n,this.value=s}eq(e){return this.name==e.name&&this.value.length==e.value.length&&this.value.every((i,n)=>i.value==e.value[n].value&&i.name==e.value[n].name)}toString(){let e=(this.at?"@":"")+this.name;if(this.value.length){e+="=";for(let{name:i,value:n}of this.value)e+=i?`{${i}}`:/[^\w-]/.test(n)?JSON.stringify(n):n}return e}static eqProps(e,i){return e.length==i.length&&e.every((n,s)=>n.eq(i[s]))}},Zs=class extends Pe{constructor(e,i,n){super(e),this.value=i,this.name=n}};function BO(t,e){return t.prec<e.prec?"("+t.toString()+")":t.toString()}var hi=class extends Error{};function Ua(t){for(let e in t)return!0;return!1}var UC=0,QO=class{constructor(e,i,n,s={}){this.name=e,this.flags=i,this.nodeName=n,this.props=s,this.hash=++UC,this.id=-1,this.rules=[]}toString(){return this.name}get nodeType(){return this.top||this.nodeName!=null||Ua(this.props)||this.repeated}get terminal(){return(this.flags&1)>0}get eof(){return(this.flags&4)>0}get error(){return"error"in this.props}get top(){return(this.flags&2)>0}get interesting(){return this.flags>0||this.nodeName!=null}get repeated(){return(this.flags&16)>0}set preserve(e){this.flags=e?this.flags|8:this.flags&-9}get preserve(){return(this.flags&8)>0}set inline(e){this.flags=e?this.flags|32:this.flags&-33}get inline(){return(this.flags&32)>0}cmp(e){return this.hash-e.hash}},wO=class{constructor(){this.terms=[],this.names=Object.create(null),this.tops=[],this.eof=this.term("\u2404",null,5),this.error=this.term("\u26A0","\u26A0",8)}term(e,i,n=0,s={}){let r=new QO(e,n,i,s);return this.terms.push(r),this.names[e]=r,r}makeTop(e,i){let n=this.term("@top",e,2,i);return this.tops.push(n),n}makeTerminal(e,i,n={}){return this.term(e,i,1,n)}makeNonTerminal(e,i,n={}){return this.term(e,i,0,n)}makeRepeat(e){return this.term(e,null,16)}uniqueName(e){for(let i=0;;i++){let n=i?`${e}-${i}`:e;if(!this.names[n])return n}}finish(e){for(let l of e)l.name.rules.push(l);this.terms=this.terms.filter(l=>l.terminal||l.preserve||e.some(a=>a.name==l||a.parts.includes(l)));let i={},n=[this.error];this.error.id=0;let s=1;for(let l of this.terms)l.id<0&&l.nodeType&&!l.repeated&&(l.id=s++,n.push(l));let r=s;for(let l of this.terms)l.repeated&&(l.id=s++,n.push(l));this.eof.id=s++;for(let l of this.terms)l.id<0&&(l.id=s++),l.name&&(i[l.id]=l.name);if(s>=65534)throw new hi("Too many terms");return{nodeTypes:n,names:i,minRepeatTerm:r,maxTerm:s-1}}};function Jc(t,e,i){if(t.length!=e.length)return t.length-e.length;for(let n=0;n<t.length;n++){let s=i(t[n],e[n]);if(s)return s}return 0}var WC=[],rt=class t{constructor(e,i=WC,n=0){this.precedence=e,this.ambigGroups=i,this.cut=n}join(e){return this==t.none||this==e?e:e==t.none?this:new t(Math.max(this.precedence,e.precedence),Fc(this.ambigGroups,e.ambigGroups),Math.max(this.cut,e.cut))}cmp(e){return this.precedence-e.precedence||Jc(this.ambigGroups,e.ambigGroups,(i,n)=>i<n?-1:i>n?1:0)||this.cut-e.cut}};rt.none=new rt(0);function Fc(t,e){if(t.length==0||t==e)return e;if(e.length==0)return t;let i=t.slice();for(let n of e)t.includes(n)||i.push(n);return i.sort()}var IC=0,so=class{constructor(e,i,n,s){this.name=e,this.parts=i,this.conflicts=n,this.skip=s,this.id=IC++}cmp(e){return this.id-e.id}cmpNoName(e){return this.parts.length-e.parts.length||this.skip.hash-e.skip.hash||this.parts.reduce((i,n,s)=>i||n.cmp(e.parts[s]),0)||Jc(this.conflicts,e.conflicts,(i,n)=>i.cmp(n))}toString(){return this.name+" -> "+this.parts.join(" ")}get isRepeatWrap(){return this.name.repeated&&this.parts.length==2&&this.parts[0]==this.name}sameReduce(e){return this.name==e.name&&this.parts.length==e.parts.length&&this.isRepeatWrap==e.isRepeatWrap}},jO=65535,eh=class{constructor(e,i,n){this.from=e,this.to=i,this.target=n}toString(){return`-> ${this.target.id}[label=${JSON.stringify(this.from<0?"\u03B5":_v(this.from)+(this.to>this.from+1?"-"+_v(this.to-1):""))}]`}};function _v(t){return t>jO?"\u221E":t==10?"\\n":t==13?"\\r":t<32||t>=55296&&t<57343?"\\u{"+t.toString(16)+"}":String.fromCharCode(t)}function HC(t,e){let i=Object.create(null),n=Object.create(null);for(let s of t){let r=TO(s.accepting),l=n[r]||(n[r]=[]);l.push(s),i[s.id]=l}for(;;){let s=!1,r=Object.create(null);for(let l of t){if(r[l.id])continue;let a=i[l.id];if(a.length==1){r[a[0].id]=a;continue}let o=[];e:for(let u of a){for(let c of o)if(KC(u,c[0],i)){c.push(u);continue e}o.push([u])}o.length>1&&(s=!0);for(let u of o)for(let c of u)r[c.id]=u}if(!s)return JC(t,e,i);i=r}}function KC(t,e,i){if(t.edges.length!=e.edges.length)return!1;for(let n=0;n<t.edges.length;n++){let s=t.edges[n],r=e.edges[n];if(s.from!=r.from||s.to!=r.to||i[s.target.id]!=i[r.target.id])return!1}return!0}function JC(t,e,i){for(let n of t)for(let s=0;s<n.edges.length;s++){let r=n.edges[s],l=i[r.target.id][0];l!=r.target&&(n.edges[s]=new eh(r.from,r.to,l))}return i[e.id][0]}var FC=1,Ct=class Kv{constructor(e=[],i=FC++){this.accepting=e,this.id=i,this.edges=[]}edge(e,i,n){this.edges.push(new eh(e,i,n))}nullEdge(e){this.edge(-1,-1,e)}compile(){let e=Object.create(null),i=0,n=s(this.closure().sort((r,l)=>r.id-l.id));return HC(Object.values(e),n);function s(r){let l=e[TO(r)]=new Kv(r.reduce((u,c)=>Fc(u,c.accepting),[]),i++),a=[];for(let u of r)for(let c of u.edges)c.from>=0&&a.push(c);let o=tM(a);for(let u of o){let c=u.targets.sort((h,f)=>h.id-f.id);l.edge(u.from,u.to,e[TO(c)]||s(c))}return l}}closure(){let e=[],i=Object.create(null);function n(s){if(!i[s.id]){i[s.id]=!0,(s.edges.some(r=>r.from>=0)||s.accepting.length>0&&!s.edges.some(r=>eM(s.accepting,r.target.accepting)))&&e.push(s);for(let r of s.edges)r.from<0&&n(r.target)}}return n(this),e}findConflicts(e){let i=[],n=this.cycleTerms();function s(r,l,a,o,u){r.id<l.id&&([r,l]=[l,r],a=-a);let c=i.find(h=>h.a==r&&h.b==l);c?c.soft!=a&&(c.soft=0):i.push(new Jv(r,l,a,Zv(o),u&&Zv(u)))}return this.reachable((r,l)=>{if(r.accepting.length!=0){for(let a=0;a<r.accepting.length;a++)for(let o=a+1;o<r.accepting.length;o++)s(r.accepting[a],r.accepting[o],0,l);r.reachable((a,o)=>{if(a!=r)for(let u of a.accepting){let c=n.includes(u);for(let h of r.accepting)u!=h&&s(u,h,c||n.includes(h)||!e(u,h)?0:1,l,l.concat(o))}})}}),i}cycleTerms(){let e=[];this.reachable(r=>{for(let{target:l}of r.edges)e.push(r,l)});let i=new Map,n=[];for(let r=0;r<e.length;){let l=e[r++],a=e[r++],o=i.get(l);if(o||i.set(l,o=[]),!o.includes(a))if(l==a)n.includes(l)||n.push(l);else{for(let u of o)e.push(l,u);o.push(a)}}let s=[];for(let r of n)for(let l of r.accepting)s.includes(l)||s.push(l);return s}reachable(e){let i=[],n=[];(function s(r){e(r,n),i.push(r);for(let l of r.edges)i.includes(l.target)||(n.push(l),s(l.target),n.pop())})(this)}toString(){let e=`digraph {
`;return this.reachable(i=>{i.accepting.length&&(e+=`  ${i.id} [label=${JSON.stringify(i.accepting.join())}];
`);for(let n of i.edges)e+=`  ${i.id} ${n};
`}),e+"}"}toArray(e,i){let n=[],s=[];this.reachable(r=>{let l=s.length,a=l+3+r.accepting.length*2;n[r.id]=l,s.push(r.stateMask(e),a,r.edges.length),r.accepting.sort((o,u)=>i.indexOf(o.id)-i.indexOf(u.id));for(let o of r.accepting)s.push(o.id,e[o.id]||65535);for(let o of r.edges)s.push(o.from,o.to,-o.target.id-1)});for(let r=0;r<s.length;r++)s[r]<0&&(s[r]=n[-s[r]-1]);if(s.length>Math.pow(2,16))throw new hi("Tokenizer tables too big to represent with 16-bit offsets.");return Uint16Array.from(s)}stateMask(e){let i=0;return this.reachable(n=>{for(let s of n.accepting)i|=e[s.id]||65535}),i}},Jv=class{constructor(e,i,n,s,r){this.a=e,this.b=i,this.soft=n,this.exampleA=s,this.exampleB=r}};function Zv(t){let e="";for(let i=0;i<t.length;i++)e+=String.fromCharCode(t[i].from);return e}function TO(t){let e="";for(let i of t)e.length&&(e+="-"),e+=i.id;return e}function eM(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(t[i]!=e[i])return!1;return!0}var th=class{constructor(e,i,n){this.from=e,this.to=i,this.targets=n}};function tM(t){let e=[],i=[];for(let s of t)e.includes(s.from)||e.push(s.from),e.includes(s.to)||e.push(s.to);e.sort((s,r)=>s-r);for(let s=1;s<e.length;s++){let r=e[s-1],l=e[s],a=[];for(let o of t)if(o.to>r&&o.from<l)for(let u of o.target.closure())a.includes(u)||a.push(u);a.length&&i.push(new th(r,l,a))}let n=t.filter(s=>s.from==65535&&s.to==65535);if(n.length){let s=[];for(let r of n)for(let l of r.target.closure())s.includes(l)||s.push(l);s.length&&i.push(new th(65535,65535,s))}return i}var Wa=/[\w_-]+/gy;try{Wa=/[\p{Alphabetic}\d_-]+/ugy}catch{}var rn=[],PO=class{constructor(e,i=null){this.string=e,this.fileName=i,this.type="sof",this.value=null,this.start=0,this.end=0,this.next()}lineInfo(e){for(let i=1,n=0;;){let s=this.string.indexOf(`
`,n);if(s>-1&&s<e)++i,n=s+1;else return{line:i,ch:e-n}}}message(e,i=-1){let n=this.fileName||"";if(i>-1){let s=this.lineInfo(i);n+=(n?" ":"")+s.line+":"+s.ch}return n?e+` (${n})`:e}raise(e,i=-1){throw new hi(this.message(e,i))}match(e,i){let n=i.exec(this.string.slice(e));return n?e+n[0].length:-1}next(){let e=this.match(this.end,/^(\s|\/\/.*|\/\*[^]*?\*\/)*/);if(e==this.string.length)return this.set("eof",null,e,e);let i=this.string[e];if(i=='"'){let n=this.match(e+1,/^(\\.|[^"\\])*"/);return n==-1&&this.raise("Unterminated string literal",e),this.set("string",$O(this.string.slice(e+1,n-1)),e,n)}else if(i=="'"){let n=this.match(e+1,/^(\\.|[^'\\])*'/);return n==-1&&this.raise("Unterminated string literal",e),this.set("string",$O(this.string.slice(e+1,n-1)),e,n)}else if(i=="@"){Wa.lastIndex=e+1;let n=Wa.exec(this.string);return n?this.set("at",n[0],e,e+1+n[0].length):this.raise("@ without a name",e)}else if((i=="$"||i=="!")&&this.string[e+1]=="["){let n=this.match(e+2,/^(?:\\.|[^\]\\])*\]/);return n==-1&&this.raise("Unterminated character set",e),this.set("set",this.string.slice(e+2,n-1),e,n)}else{if(/[\[\]()!~+*?{}<>\.,|:$=]/.test(i))return this.set(i,null,e,e+1);{Wa.lastIndex=e;let n=Wa.exec(this.string);return n?this.set("id",n[0],e,e+n[0].length):this.raise("Unexpected character "+JSON.stringify(i),e)}}}set(e,i,n,s){this.type=e,this.value=i,this.start=n,this.end=s}eat(e,i=null){return this.type==e&&(i==null||this.value===i)?(this.next(),!0):!1}unexpected(){return this.raise(`Unexpected token '${this.string.slice(this.start,this.end)}'`,this.start)}expect(e,i=null){let n=this.value;return(this.type!=e||!(i==null||n===i))&&this.unexpected(),this.next(),n}parse(){return iM(this)}};function iM(t){let e=t.start,i=[],n=null,s=null,r=[],l=null,a=[],o=[],u=null,c=[],h=[],f=[],d=[],m=[],g=!1,x=!1;for(;t.type!="eof";){let p=t.start;if(t.eat("at","top"))t.type!="id"&&t.raise("Top rules must have a name",t.start),m.push(Un(t,Ue(t))),g=!0;else if(t.type=="at"&&t.value=="tokens")s?t.raise("Multiple @tokens declaractions",t.start):s=aM(t);else if(t.eat("at","local"))t.expect("id","tokens"),r.push(oM(t,p));else if(t.eat("at","context")){u&&t.raise("Multiple @context declarations",p);let O=Ue(t);t.expect("id","from");let y=t.expect("string");u=new gO(p,O,y)}else if(t.eat("at","external"))t.eat("id","tokens")?c.push(cM(t,p)):t.eat("id","prop")?f.push(fM(t,p)):t.eat("id","extend")?h.push(qv(t,"extend",p)):t.eat("id","specialize")?h.push(qv(t,"specialize",p)):t.eat("id","propSource")?d.push(hM(t,p)):t.unexpected();else if(t.eat("at","dialects")){t.expect("{");for(let O=!0;!t.eat("}");O=!1)O||t.eat(","),o.push(Ue(t))}else if(t.type=="at"&&t.value=="precedence")n&&t.raise("Multiple precedence declarations",t.start),n=lM(t);else if(t.eat("at","detectDelim"))x=!0;else if(t.eat("at","skip")){let O=LO(t);if(t.type=="{"){t.next();let y=[],S=[];for(;!t.eat("}");)t.eat("at","top")?(S.push(Un(t,Ue(t))),g=!0):y.push(Un(t));a.push({expr:O,topRules:S,rules:y})}else l&&t.raise("Multiple top-level skip declarations",t.start),l=O}else i.push(Un(t))}return g?new cO(e,i,m,s,r,u,c,h,d,n,l,a,o,f,x):t.raise("Missing @top declaration")}function Un(t,e){let i=e?e.start:t.start,n=e||Ue(t),s=oo(t),r=[];if(t.eat("<"))for(;!t.eat(">");)r.length&&t.expect(","),r.push(Ue(t));let l=LO(t);return new io(i,n,s,r,l)}function oo(t){if(t.type!="[")return rn;let e=[];for(t.expect("[");!t.eat("]");)e.length&&t.expect(","),e.push(nM(t));return e}function nM(t){let e=t.start,i=[],n=t.value,s=t.type=="at";if(!t.eat("at")&&!t.eat("id")&&t.unexpected(),t.eat("="))for(;;)if(t.type=="string"||t.type=="id")i.push(new Zs(t.start,t.value,null)),t.next();else if(t.eat("."))i.push(new Zs(t.start,".",null));else if(t.eat("{"))i.push(new Zs(t.start,null,t.expect("id"))),t.expect("}");else break;return new il(e,s,n,i)}function LO(t){t.expect("{");let e=Ka(t);return t.expect("}"),e}var sO="\uFDDA";function ih(t){let e=t.start;if(t.eat("(")){if(t.eat(")"))return new Mt(e,rn,[rn,rn]);let i=Ka(t);return t.expect(")"),i}else if(t.type=="string"){let i=t.value;return t.next(),i.length==0?new Mt(e,rn,[rn,rn]):new Ot(e,i)}else{if(t.eat("id","_"))return new Kc(e);if(t.type=="set"){let i=t.value,n=t.string[t.start]=="!",s=$O(i.replace(/\\.|-|"/g,l=>l=="-"?sO:l=='"'?'\\"':l)),r=[];for(let l=0;l<s.length;){let a=s.codePointAt(l);if(l+=a>65535?2:1,l<s.length-1&&s[l]==sO){let o=s.codePointAt(l+1);l+=o>65535?3:2,o<a&&t.raise("Invalid character range",t.start),Xv(t,r,a,o+1)}else a==sO.charCodeAt(0)&&(a=45),Xv(t,r,a,a+1)}return t.next(),new Hc(e,r.sort((l,a)=>l[0]-a[0]),n)}else if(t.type=="at"&&(t.value=="specialize"||t.value=="extend")){let{start:i,value:n}=t;t.next();let s=oo(t);t.expect("<");let r=Ka(t),l;return t.eat(",")?l=Ka(t):r instanceof Ot?l=r:t.raise(`@${n} requires two arguments when its first argument isn't a literal string`),t.expect(">"),new tl(i,n,s,r,l)}else if(t.type=="at"&&vO.hasOwnProperty(t.value)){let i=new no(t.start,t.value);return t.next(),i}else if(t.type=="["){let i=Un(t,new Ic(e,"_anon"));return i.params.length&&t.raise("Inline rules can't have parameters",i.start),new _s(e,i)}else{let i=Ue(t);if(t.type=="["||t.type=="{"){let n=Un(t,i);return n.params.length&&t.raise("Inline rules can't have parameters",n.start),new _s(e,n)}else{if(t.eat(".")&&i.name=="std"&&vO.hasOwnProperty(t.value)){let n=new no(e,t.value);return t.next(),n}return new Fe(e,i,sM(t))}}}}function sM(t){let e=[];if(t.eat("<"))for(;!t.eat(">");)e.length&&t.expect(","),e.push(Ka(t));return e}function Xv(t,e,i,n){e.every(([s,r])=>r<=i||s>=n)||t.raise("Overlapping character range",t.start),e.push([i,n])}function rM(t){let e=t.start,i=ih(t);for(;;){let n=t.type;if(t.eat("*")||t.eat("?")||t.eat("+"))i=new Ds(e,i,n);else return i}}function Dv(t){return t.type=="}"||t.type==")"||t.type=="|"||t.type=="/"||t.type=="/\\"||t.type=="{"||t.type==","||t.type==">"}function Nv(t){let e=t.start,i=[],n=[rn];do{for(;;){let s=t.start,r;if(t.eat("~"))r="ambig";else if(t.eat("!"))r="prec";else break;n[n.length-1]=n[n.length-1].concat(new kO(s,Ue(t),r))}if(Dv(t))break;i.push(rM(t)),n.push(rn)}while(!Dv(t));return i.length==1&&n.every(s=>s.length==0)?i[0]:new Mt(e,i,n,!i.length)}function Ka(t){let e=t.start,i=Nv(t);if(!t.eat("|"))return i;let n=[i];do n.push(Nv(t));while(t.eat("|"));let s=n.find(r=>r instanceof Mt&&r.empty);return s&&t.raise("Empty expression in choice operator. If this is intentional, use () to make it explicit.",s.start),new Wn(e,n)}function Ue(t){t.type!="id"&&t.unexpected();let e=t.start,i=t.value;return t.next(),new Ic(e,i)}function lM(t){let e=t.start;t.next(),t.expect("{");let i=[];for(;!t.eat("}");)i.length&&t.eat(","),i.push({id:Ue(t),type:t.eat("at","left")?"left":t.eat("at","right")?"right":t.eat("at","cut")?"cut":null});return new hO(e,i)}function aM(t){let e=t.start;t.next(),t.expect("{");let i=[],n=[],s=[],r=[];for(;!t.eat("}");)t.type=="at"&&t.value=="precedence"?s.push(Fv(t)):t.type=="at"&&t.value=="conflict"?r.push(uM(t)):t.type=="string"?n.push(new OO(t.start,t.expect("string"),oo(t))):i.push(Un(t));return new pO(e,s,r,i,n)}function oM(t,e){t.expect("{");let i=[],n=[],s=null;for(;!t.eat("}");)t.type=="at"&&t.value=="precedence"?n.push(Fv(t)):t.eat("at","else")&&!s?s={id:Ue(t),props:oo(t)}:i.push(Un(t));return new mO(e,n,i,s)}function Fv(t){let e=t.start;t.next(),t.expect("{");let i=[];for(;!t.eat("}");){i.length&&t.eat(",");let n=ih(t);n instanceof Ot||n instanceof Fe?i.push(n):t.raise("Invalid expression in token precedences",n.start)}return new fO(e,i)}function uM(t){let e=t.start;t.next(),t.expect("{");let i=ih(t);i instanceof Ot||i instanceof Fe||t.raise("Invalid expression in token conflict",i.start),t.eat(",");let n=ih(t);return n instanceof Ot||n instanceof Fe||t.raise("Invalid expression in token conflict",n.start),t.expect("}"),new dO(e,i,n)}function eQ(t,e){let i=[],n=[];t.expect("{");for(let s=!0;!t.eat("}");s=!1)if(s||t.eat(","),e&&t.eat("at","conflict")){t.expect("{");for(let r=!0;!t.eat("}");r=!1)r||t.eat(","),n.push(Ue(t))}else{let r=Ue(t),l=oo(t);i.push({id:r,props:l})}return{tokens:i,conflicts:n}}function cM(t,e){let i=Ue(t);t.expect("id","from");let n=t.expect("string"),{tokens:s,conflicts:r}=eQ(t,!0);return new yO(e,i,n,s,r)}function qv(t,e,i){let n=LO(t),s=Ue(t);t.expect("id","from");let r=t.expect("string");return new bO(i,e,n,s,r,eQ(t,!1).tokens)}function hM(t,e){let i=Ue(t);return t.expect("id","from"),new xO(e,i,t.expect("string"))}function fM(t,e){let i=Ue(t),n=t.eat("id","as")?Ue(t):i;t.expect("id","from");let s=t.expect("string");return new SO(e,n,i,s)}function $O(t){let e=/\\(?:u\{([\da-f]+)\}|u([\da-f]{4})|x([\da-f]{2})|([ntbrf0])|(.))|[^]/yig,i="",n;for(;n=e.exec(t);){let[s,r,l,a,o,u]=n;r||l||a?i+=String.fromCodePoint(parseInt(r||l||a,16)):o?i+=o=="n"?`
`:o=="t"?"	":o=="0"?"\0":o=="r"?"\r":o=="f"?"\f":"\b":u?i+=u:i+=s}return i}function Ja(t,e){return(t<<5)+t+e}function dM(t,e){for(let i=0;i<e.length;i++)t=Ja(t,e.charCodeAt(i));return t}var Fa=typeof process<"u"&&process.env.LOG||"",ro=/\btime\b/.test(Fa),zs=ro?(t,e)=>{let i=Date.now(),n=e();return console.log(`${t} (${((Date.now()-i)/1e3).toFixed(2)}s)`),n}:(t,e)=>e(),Kn=class t{constructor(e,i,n,s,r,l){this.rule=e,this.pos=i,this.ahead=n,this.ambigAhead=s,this.skipAhead=r,this.via=l,this.hash=0}finish(){let e=Ja(Ja(this.rule.id,this.pos),this.skipAhead.hash);for(let i of this.ahead)e=Ja(e,i.hash);for(let i of this.ambigAhead)e=dM(e,i);return this.hash=e,this}get next(){return this.pos<this.rule.parts.length?this.rule.parts[this.pos]:null}advance(){return new t(this.rule,this.pos+1,this.ahead,this.ambigAhead,this.skipAhead,this.via).finish()}get skip(){return this.pos==this.rule.parts.length?this.skipAhead:this.rule.skip}cmp(e){return this.rule.cmp(e.rule)||this.pos-e.pos||this.skipAhead.hash-e.skipAhead.hash||Jc(this.ahead,e.ahead,(i,n)=>i.cmp(n))||Jc(this.ambigAhead,e.ambigAhead,mM)}eqSimple(e){return e.rule==this.rule&&e.pos==this.pos}toString(){let e=this.rule.parts.map(i=>i.name);return e.splice(this.pos,0,"\xB7"),`${this.rule.name} -> ${e.join(" ")}`}eq(e){return this==e||this.hash==e.hash&&this.rule==e.rule&&this.pos==e.pos&&this.skipAhead==e.skipAhead&&jv(this.ahead,e.ahead)&&jv(this.ambigAhead,e.ambigAhead)}trail(e=60){let i=[];for(let s=this;s;s=s.via)for(let r=s.pos-1;r>=0;r--)i.push(s.rule.parts[r]);let n=i.reverse().join(" ");return n.length>e&&(n=n.slice(n.length-e).replace(/.*? /,"\u2026 ")),n}conflicts(e=this.pos){let i=this.rule.conflicts[e];return e==this.rule.parts.length&&this.ambigAhead.length&&(i=i.join(new rt(0,this.ambigAhead))),i}static addOrigins(e,i){let n=e.slice();for(let s=0;s<n.length;s++){let r=n[s];if(r.pos==0)for(let l of i)l.next==r.rule.name&&!n.includes(l)&&n.push(l)}return n}};function Yv(t){let e=rt.none;for(let i of t)e=e.join(i.conflicts());return e}function pM(t,e){for(let i of t)if(i.rule.name.repeated){for(let n of e)if(n.rule.name==i.rule.name){if(i.rule.isRepeatWrap&&i.pos==2)return 1;if(n.rule.isRepeatWrap&&n.pos==2)return-1}}return 0}function mM(t,e){return t<e?-1:t>e?1:0}function Bv(t,e,i,n){let s=[];for(let r=e+1;r<t.parts.length;r++){let l=t.parts[r],a=!1;if(l.terminal)Xs(l,s);else for(let o of n[l.name])o==null?a=!0:Xs(o,s);if(!a)return s}for(let r of i)Xs(r,s);return s}function Uc(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(!t[i].eq(e[i]))return!1;return!0}function jv(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(t[i]!=e[i])return!1;return!0}var zi=class t{constructor(e,i){this.term=e,this.target=i}eq(e){return e instanceof t&&this.term==e.term&&e.target.id==this.target.id}cmp(e){return e instanceof Ns?-1:this.term.id-e.term.id||this.target.id-e.target.id}matches(e,i){return e instanceof t&&i[e.target.id]==i[this.target.id]}toString(){return"s"+this.target.id}map(e,i){let n=i[e[this.target.id]];return n==this.target?this:new t(this.term,n)}},Ns=class t{constructor(e,i){this.term=e,this.rule=i}eq(e){return e instanceof t&&this.term==e.term&&e.rule.sameReduce(this.rule)}cmp(e){return e instanceof zi?1:this.term.id-e.term.id||this.rule.name.id-e.rule.name.id||this.rule.parts.length-e.rule.parts.length}matches(e,i){return e instanceof t&&e.rule.sameReduce(this.rule)}toString(){return`${this.rule.name.name}(${this.rule.parts.length})`}map(){return this}};function AO(t){let e=5381;for(let i of t)e=Ja(e,i.hash);return e}var RO=class{constructor(e){this.first=e,this.conflicts=[]}},nh=class{constructor(e,i,n=0,s,r=AO(i),l=null){this.id=e,this.set=i,this.flags=n,this.skip=s,this.hash=r,this.startRule=l,this.actions=[],this.actionPositions=[],this.goto=[],this.tokenGroup=-1,this.defaultReduce=null,this._actionsByTerm=null}toString(){let e=this.actions.map(i=>i.term+"="+i).join(",")+(this.goto.length?" | "+this.goto.map(i=>i.term+"="+i).join(","):"");return this.id+": "+this.set.filter(i=>i.pos>0).join()+(this.defaultReduce?`
  always ${this.defaultReduce.name}(${this.defaultReduce.parts.length})`:e.length?`
  `+e:"")}addActionInner(e,i){e:for(let n=0;n<this.actions.length;n++){let s=this.actions[n];if(s.term==e.term){if(s.eq(e))return null;let r=Kn.addOrigins(i,this.set),l=Kn.addOrigins(this.actionPositions[n],this.set),a=Yv(r),o=Yv(l),u=pM(r,l)||a.precedence-o.precedence;if(u>0){this.actions.splice(n,1),this.actionPositions.splice(n,1),n--;continue e}else{if(u<0)return null;if(a.ambigGroups.some(c=>o.ambigGroups.includes(c)))continue e;return s}}}return this.actions.push(e),this.actionPositions.push(i),null}addAction(e,i,n){let s=this.addActionInner(e,i);if(s){let r=this.actionPositions[this.actions.indexOf(s)][0],l=[i[0].rule.name,r.rule.name];if(n.conflicts.some(o=>o.rules.some(u=>l.includes(u))))return;let a;s instanceof zi?a=`shift/reduce conflict between
  ${r}
and
  ${i[0].rule}`:a=`reduce/reduce conflict between
  ${r.rule}
and
  ${i[0].rule}`,a+=`
With input:
  ${i[0].trail(70)} \xB7 ${e.term} \u2026`,s instanceof zi&&(a+=bM(i[0],s.term,n.first)),a+=yM(r,i[0]),n.conflicts.push(new MO(a,l))}}getGoto(e){return this.goto.find(i=>i.term==e)}hasSet(e){return Uc(this.set,e)}actionsByTerm(){let e=this._actionsByTerm;if(!e){this._actionsByTerm=e=Object.create(null);for(let i of this.actions)(e[i.term.id]||(e[i.term.id]=[])).push(i)}return e}finish(){if(this.actions.length){let e=this.actions[0];if(e instanceof Ns){let{rule:i}=e;this.actions.every(n=>n instanceof Ns&&n.rule.sameReduce(i))&&(this.defaultReduce=i)}}this.actions.sort((e,i)=>e.cmp(i)),this.goto.sort((e,i)=>e.cmp(i))}eq(e){let i=this.defaultReduce,n=e.defaultReduce;return i||n?i&&n?i.sameReduce(n):!1:this.skip==e.skip&&this.tokenGroup==e.tokenGroup&&Uc(this.actions,e.actions)&&Uc(this.goto,e.goto)}};function OM(t,e){let i=[],n=[];function s(l,a,o,u,c){for(let h of l.rules){let f=i.find(d=>d.rule==h);if(!f){let d=t.find(m=>m.pos==0&&m.rule==h);f=d?new Kn(h,0,d.ahead.slice(),d.ambigAhead,d.skipAhead,d.via):new Kn(h,0,[],EO,u,c),i.push(f)}if(f.skipAhead!=u)throw new hi("Inconsistent skip sets after "+c.trail());f.ambigAhead=Fc(f.ambigAhead,o);for(let d of a)f.ahead.includes(d)||(f.ahead.push(d),f.rule.parts.length&&!f.rule.parts[0].terminal&&Xs(f,n))}}for(let l of t){let a=l.next;a&&!a.terminal&&s(a,Bv(l.rule,l.pos,l.ahead,e),l.conflicts(l.pos+1).ambigGroups,l.pos==l.rule.parts.length-1?l.skipAhead:l.rule.skip,l)}for(;n.length;){let l=n.pop();s(l.rule.parts[0],Bv(l.rule,0,l.ahead,e),Fc(l.rule.conflicts[1].ambigGroups,l.rule.parts.length==1?l.ambigAhead:EO),l.rule.parts.length==1?l.skipAhead:l.rule.skip,l)}let r=t.slice();for(let l of i){l.ahead.sort((o,u)=>o.hash-u.hash),l.finish();let a=t.findIndex(o=>o.pos==0&&o.rule==l.rule);a>-1?r[a]=l:r.push(l)}return r.sort((l,a)=>l.cmp(a))}function Xs(t,e){e.includes(t)||e.push(t)}function gM(t){let e=Object.create(null);for(let i of t.terms)i.terminal||(e[i.name]=[]);for(;;){let i=!1;for(let n of t.terms)if(!n.terminal)for(let s of n.rules){let r=e[n.name],l=!1,a=r.length;for(let o of s.parts){if(l=!0,o.terminal)Xs(o,r);else for(let u of e[o.name])u==null?l=!1:Xs(u,r);if(l)break}l||Xs(null,r),r.length>a&&(i=!0)}if(!i)return e}}var CO=class{constructor(e,i){this.set=e,this.state=i}},MO=class{constructor(e,i){this.error=e,this.rules=i}};function yM(t,e){if(t.eqSimple(e))return"";function i(n,s){let r=[];for(let l=s.via;!l.eqSimple(n);l=l.via)r.push(l);return r.length?(r.unshift(s),r.reverse().map((l,a)=>`
`+"  ".repeat(a+1)+(l==s?"":"via ")+l).join("")):""}for(let n=t;n;n=n.via)for(let s=e;s;s=s.via)if(n.eqSimple(s))return`
Shared origin: `+n+i(n,t)+i(n,e);return""}function bM(t,e,i){let n=t,s=[];for(;;){for(let a=n.pos-1;a>=0;a--)s.push(n.rule.parts[a]);if(!n.via)break;n=n.via}s.reverse();let r=new Set;function l(a,o,u){if(o==s.length&&u&&!a.next)return`
The reduction of ${t.rule.name} is allowed before ${e} because of this rule:
  ${u}`;for(let c;c=a.next;){if(o<s.length&&c==s[o]){let d=l(a.advance(),o+1,u);if(d)return d}let h=a.rule.parts[a.pos+1],f=a.pos+1==a.rule.parts.length?u:null;h&&(h.terminal?h==e:i[h.name].includes(e))&&(f=a.advance());for(let d of c.rules){let m=(d.id<<5)+o+(f?555:0);if(!r.has(m)){r.add(m);let g=l(new Kn(d,0,[],[],c,a),o,f);if(g)return g}}if(!c.terminal&&i[c.name].includes(null))a=a.advance();else break}return""}return l(n,0,null)}function xM(t,e,i){let n=[],s={},r={},l=Date.now();function a(u,c){if(u.length==0)return null;let h=AO(u),f=r[h],d;for(let O of u)if(!d)d=O.skip;else if(d!=O.skip)throw new hi("Inconsistent skip sets after "+O.trail());if(f){for(let O of f)if(Uc(u,O.set)){if(O.state.skip!=d)throw new hi("Inconsistent skip sets after "+O.set[0].trail());return O.state}}let m=OM(u,i),g=AO(m),x=s[g]||(s[g]=[]),p;if(!c)for(let O of x)O.hasSet(m)&&(p=O);return p||(p=new nh(n.length,m,0,d,g,c),x.push(p),n.push(p),ro&&n.length%500==0&&console.log(`${n.length} states after ${((Date.now()-l)/1e3).toFixed(2)}s`)),(r[h]||(r[h]=[])).push(new CO(u,p)),p}for(let u of e){let c=u.rules.length?u.rules[0].skip:t.names["%noskip"];a(u.rules.map(h=>new Kn(h,0,[t.eof],EO,c,null).finish()),u)}let o=new RO(i);for(let u=0;u<n.length;u++){let c=n[u],h=[],f=[],d=[];for(let g of c.set)if(g.pos==g.rule.parts.length)g.rule.name.top||d.push(g);else{let x=g.rule.parts[g.pos],p=h.indexOf(x);p<0?(h.push(x),f.push([g])):f[p].push(g)}for(let g=0;g<h.length;g++){let x=h[g],p=f[g].map(O=>O.advance());if(x.terminal){let O=SM(p),y=a(O);y&&c.addAction(new zi(x,y),f[g],o)}else{let O=a(p);O&&c.goto.push(new zi(x,O))}}let m=!1;for(let g of d)for(let x of g.ahead){let p=c.actions.length;c.addAction(new Ns(x,g.rule),[g],o),c.actions.length==p&&(m=!0)}if(m)for(let g=0;g<c.goto.length;g++)i[c.goto[g].term.name].some(p=>c.actions.some(O=>O.term==p&&O instanceof zi))||c.goto.splice(g--,1)}if(o.conflicts.length)throw new hi(o.conflicts.map(u=>u.error).join(`

`));for(let u of n)u.finish();return ro&&console.log(`${n.length} states total.`),n}function SM(t){let e=null,i=1;for(let n of t){let s=n.rule.conflicts[n.pos-1].cut;s<i||((!e||s>i)&&(i=s,e=[]),e.push(n))}return e||t}function Lv(t,e,i){for(let s of t.goto)for(let r of e.goto)if(s.term==r.term&&i[s.target.id]!=i[r.target.id])return!1;let n=e.actionsByTerm();for(let s of t.actions){let r=n[s.term.id];if(r&&r.some(l=>!l.matches(s,i))){if(r.length==1)return!1;let l=t.actionsByTerm()[s.term.id];if(l.length!=r.length||l.some(a=>!r.some(o=>a.matches(o,i))))return!1}}return!0}function kM(t,e){let i=[];for(let n of t){let s=e[n.id];i[s]||(i[s]=new nh(s,n.set,0,n.skip,n.hash,n.startRule),i[s].tokenGroup=n.tokenGroup,i[s].defaultReduce=n.defaultReduce)}for(let n of t){let s=e[n.id],r=i[s];r.flags|=n.flags;for(let l=0;l<n.actions.length;l++){let a=n.actions[l].map(e,i);r.actions.some(o=>o.eq(a))||(r.actions.push(a),r.actionPositions.push(n.actionPositions[l]))}for(let l of n.goto){let a=l.map(e,i);r.goto.some(o=>o.eq(a))||r.goto.push(a)}}return i}var sh=class{constructor(e,i){this.origin=e,this.members=[i]}};function vM(t,e){if(t.length!=e.length)return!1;for(let i=0;i<t.length;i++)if(!t[i].eqSimple(e[i]))return!1;return!0}function QM(t){let e=[],i=[];e:for(let s=0;s<t.length;s++){let r=t[s];if(!r.startRule)for(let l=0;l<i.length;l++){let a=i[l],o=t[a.members[0]];if(r.tokenGroup==o.tokenGroup&&r.skip==o.skip&&!o.startRule&&vM(r.set,o.set)){a.members.push(s),e.push(l);continue e}}e.push(i.length),i.push(new sh(i.length,s))}function n(s,r){let l=i[s],a=t[l.members[r]],o=l.members.pop();r!=l.members.length&&(l.members[r]=o);for(let u=s+1;u<i.length;u++)if(e[a.id]=u,i[u].origin==l.origin&&i[u].members.every(c=>Lv(a,t[c],e))){i[u].members.push(a.id);return}e[a.id]=i.length,i.push(new sh(l.origin,a.id))}for(let s=1;;s++){let r=!1,l=Date.now();for(let a=0,o=i.length;a<o;a++){let u=i[a];for(let c=0;c<u.members.length-1;c++)for(let h=c+1;h<u.members.length;h++){let f=u.members[c],d=u.members[h];Lv(t[f],t[d],e)||(r=!0,n(a,h--))}}if(ro&&console.log(`Collapse pass ${s}${r?"":", done"} (${((Date.now()-l)/1e3).toFixed(2)}s)`),!r)return kM(t,e)}}function wM(t){for(let e=1;;e++){let i=[],n=!1,s=Date.now(),r=[];for(let l=0;l<t.length;l++){let a=t[l],o=r.findIndex(u=>a.eq(u));if(o<0)i[l]=r.length,r.push(a);else{i[l]=o,n=!0;let u=r[o],c=null;for(let h of a.set)u.set.some(f=>f.eqSimple(h))||(c||(c=[])).push(h);c&&(u.set=c.concat(u.set).sort((h,f)=>h.cmp(f)))}}if(ro&&console.log(`Merge identical pass ${e}${n?"":", done"} (${((Date.now()-s)/1e3).toFixed(2)}s)`),!n)return t;for(let l of r)l.defaultReduce||(l.actions=l.actions.map(a=>a.map(i,r)),l.goto=l.goto.map(a=>a.map(i,r)));for(let l=0;l<r.length;l++)r[l].id=l;t=r}}var EO=[];function TM(t){return wM(QM(t))}function PM(t){let e=t+32;return e>=34&&e++,e>=92&&e++,String.fromCharCode(e)}function Vv(t,e=65535){if(t>e)throw new Error("Trying to encode a number that's too big: "+t);if(t==65535)return"~";let i="";for(let n=46;;n=0){let s=t%46,r=t-s;if(i=PM(s+n)+i,r==0)break;t=r/46}return i}function Ia(t,e=65535){let i='"'+Vv(t.length,4294967295);for(let n=0;n<t.length;n++)i+=Vv(t[n],e);return i+='"',i}var De=[],In=class t{constructor(e,i){this.terms=e,this.conflicts=i}concat(e){if(this==t.none)return e;if(e==t.none)return this;let i=null;if(this.conflicts||e.conflicts){i=this.conflicts?this.conflicts.slice():this.ensureConflicts();let n=e.ensureConflicts();i[i.length-1]=i[i.length-1].join(n[0]);for(let s=1;s<n.length;s++)i.push(n[s])}return new t(this.terms.concat(e.terms),i)}withConflicts(e,i){if(i==rt.none)return this;let n=this.conflicts?this.conflicts.slice():this.ensureConflicts();return n[e]=n[e].join(i),new t(this.terms,n)}ensureConflicts(){if(this.conflicts)return this.conflicts;let e=[];for(let i=0;i<=this.terms.length;i++)e.push(rt.none);return e}};In.none=new In(De,null);function Jt(...t){return new In(t,null)}var nl=class{constructor(e,i,n){this.id=e,this.args=i,this.term=n}matches(e){return this.id==e.id.name&&ao(e.args,this.args)}matchesRepeat(e){return this.id=="+"&&Hn(e.expr,this.args[0])}},zO=class{constructor(e,i){this.options=i,this.terms=new wO,this.specialized=Object.create(null),this.tokenOrigins=Object.create(null),this.rules=[],this.built=[],this.ruleNames=Object.create(null),this.namespaces=Object.create(null),this.namedTerms=Object.create(null),this.termTable=Object.create(null),this.knownProps=Object.create(null),this.dynamicRulePrecedences=[],this.definedGroups=[],this.astRules=[],this.currentSkip=[],zs("Parse",()=>{this.input=new PO(e,i.fileName),this.ast=this.input.parse()});let n=_;for(let s in n)n[s]instanceof _&&!n[s].perNode&&(this.knownProps[s]={prop:n[s],source:{name:s,from:null}});for(let s of this.ast.externalProps)this.knownProps[s.id.name]={prop:this.options.externalProp?this.options.externalProp(s.id.name):new _,source:{name:s.externalID.name,from:s.source}};this.dialects=this.ast.dialects.map(s=>s.name),this.tokens=new NO(this,this.ast.tokens),this.localTokens=this.ast.localTokens.map(s=>new qO(this,s)),this.externalTokens=this.ast.externalTokens.map(s=>new lo(this,s)),this.externalSpecializers=this.ast.externalSpecializers.map(s=>new to(this,s)),zs("Build rules",()=>{let s=this.newName("%noskip",!0);this.defineRule(s,[]);let r=this.ast.mainSkip?this.newName("%mainskip",!0):s,l=[],a=[];for(let o of this.ast.rules)this.astRules.push({skip:r,rule:o});for(let o of this.ast.topRules)a.push({skip:r,rule:o});for(let o of this.ast.scopedSkip){let u=s,c=this.ast.scopedSkip.findIndex((h,f)=>f<l.length&&Hn(h.expr,o.expr));c>-1?u=l[c]:this.ast.mainSkip&&Hn(o.expr,this.ast.mainSkip)?u=r:tQ(o.expr)||(u=this.newName("%skip",!0)),l.push(u);for(let h of o.rules)this.astRules.push({skip:u,rule:h});for(let h of o.topRules)a.push({skip:u,rule:h})}for(let{rule:o}of this.astRules)this.unique(o.id);this.currentSkip.push(s),this.skipRules=r==s?[r]:[s,r],r!=s&&this.defineRule(r,this.normalizeExpr(this.ast.mainSkip));for(let o=0;o<this.ast.scopedSkip.length;o++){let u=l[o];this.skipRules.includes(u)||(this.skipRules.push(u),u!=s&&this.defineRule(u,this.normalizeExpr(this.ast.scopedSkip[o].expr)))}this.currentSkip.pop();for(let{rule:o,skip:u}of a.sort((c,h)=>c.rule.start-h.rule.start)){this.unique(o.id),this.used(o.id.name),this.currentSkip.push(u);let{name:c,props:h}=this.nodeInfo(o.props,"a",o.id.name,De,De,o.expr),f=this.terms.makeTop(c,h);this.namedTerms[c]=f,this.defineRule(f,this.normalizeExpr(o.expr)),this.currentSkip.pop()}for(let o of this.externalSpecializers)o.finish();for(let{skip:o,rule:u}of this.astRules)this.ruleNames[u.id.name]&&qM(u)&&!u.params.length&&(this.buildRule(u,[],o,!1),u.expr instanceof Mt&&u.expr.exprs.length==0&&this.used(u.id.name))});for(let s in this.ruleNames){let r=this.ruleNames[s];r&&this.warn(`Unused rule '${r.name}'`,r.start)}this.tokens.takePrecedences(),this.tokens.takeConflicts();for(let s of this.localTokens)s.takePrecedences();for(let{name:s,group:r,rule:l}of this.definedGroups)this.defineGroup(s,r,l);this.checkGroups()}unique(e){e.name in this.ruleNames&&this.raise(`Duplicate definition of rule '${e.name}'`,e.start),this.ruleNames[e.name]=e}used(e){this.ruleNames[e]=null}newName(e,i=null,n={}){for(let s=i?0:1;;s++){let r=s?`${e}-${s}`:e;if(!this.terms.names[r])return this.terms.makeNonTerminal(r,i===!0?null:i,n)}}prepareParser(){let e=zs("Simplify rules",()=>DM(this.rules,[...this.skipRules,...this.terms.tops])),{nodeTypes:i,names:n,minRepeatTerm:s,maxTerm:r}=this.terms.finish(e);for(let T in this.namedTerms)this.termTable[T]=this.namedTerms[T].id;/\bgrammar\b/.test(Fa)&&console.log(e.join(`
`));let l=this.terms.tops.slice(),a=gM(this.terms),o=this.skipRules.map((T,N)=>{let V=[],W=[],Ne=[];for(let lt of T.rules){if(!lt.parts.length)continue;let gt=lt.parts[0];for(let qe of gt.terminal?[gt]:a[gt.name]||[])qe&&!W.includes(qe)&&W.push(qe);gt.terminal&&lt.parts.length==1&&!Ne.some(qe=>qe!=lt&&qe.parts[0]==gt)?V.push(gt):Ne.push(lt)}return T.rules=Ne,Ne.length&&l.push(T),{skip:V,rule:Ne.length?T:null,startTokens:W,id:N}}),u=zs("Build full automaton",()=>xM(this.terms,l,a)),c=this.localTokens.map((T,N)=>T.buildLocalGroup(u,o,N)),{tokenGroups:h,tokenPrec:f,tokenData:d}=zs("Build token groups",()=>this.tokens.buildTokenGroups(u,o,c.length));for(let T of this.externalTokens)T.checkConflicts(u,o);let m=zs("Finish automaton",()=>TM(u)),g=RM(m,this.terms.tops);/\blr\b/.test(Fa)&&console.log(m.join(`
`));let x=[];for(let T of this.externalSpecializers)x.push(T);for(let T in this.specialized)x.push({token:this.terms.names[T],table:$M(this.specialized[T])});let p=T=>T instanceof lo?T.ast.start:this.tokens.ast?this.tokens.ast.start:-1,O=h.concat(this.externalTokens).sort((T,N)=>p(T)-p(N)).concat(c),y=new rh,S=o.map(T=>{let N=[];for(let V of T.skip)N.push(V.id,0,4);if(T.rule){let V=m.find(W=>W.startRule==T.rule);for(let W of V.actions)N.push(W.term.id,V.id,2)}return N.push(65535,0),y.storeArray(N)}),k=zs("Finish states",()=>{let T=new Uint32Array(m.length*6),N=this.computeForceReductions(m,o),V=new _O(O,y,T,S,o,m,this);for(let W of m)V.finish(W,g(W.id),N[W.id]);return T}),w=Object.create(null);for(let T=0;T<this.dialects.length;T++)w[this.dialects[T]]=y.storeArray((this.tokens.byDialect[T]||De).map(N=>N.id).concat(65535));let v=null;if(this.dynamicRulePrecedences.length){v=Object.create(null);for(let{rule:T,prec:N}of this.dynamicRulePrecedences)v[T.id]=N}let P=Object.create(null);for(let T of this.terms.tops)P[T.nodeName]=[m.find(N=>N.startRule==T).id,T.id];let z=y.storeArray(f.concat(65535)),{nodeProps:M,skippedTypes:X}=this.gatherNodeProps(i);return{states:k,stateData:y.finish(),goto:CM(m),nodeNames:i.filter(T=>T.id<s).map(T=>T.nodeName).join(" "),nodeProps:M,skippedTypes:X,maxTerm:r,repeatNodeCount:i.length-s,tokenizers:O,tokenData:d,topRules:P,dialects:w,dynamicPrecedences:v,specialized:x,tokenPrec:z,termNames:n}}getParser(){let{states:e,stateData:i,goto:n,nodeNames:s,nodeProps:r,skippedTypes:l,maxTerm:a,repeatNodeCount:o,tokenizers:u,tokenData:c,topRules:h,dialects:f,dynamicPrecedences:d,specialized:m,tokenPrec:g,termNames:x}=this.prepareParser(),p=m.map(O=>{if(O instanceof to){let y=this.options.externalSpecializer(O.ast.id.name,this.termTable);return{term:O.term.id,get:(S,k)=>y(S,k)<<1|(O.ast.type=="extend"?1:0),external:y,extend:O.ast.type=="extend"}}else return{term:O.token.id,get:y=>O.table[y]||-1}});return Ei.deserialize({version:14,states:e,stateData:i,goto:n,nodeNames:s,maxTerm:a,repeatNodeCount:o,nodeProps:r.map(({prop:O,terms:y})=>[this.knownProps[O].prop,...y]),propSources:this.options.externalPropSource?this.ast.externalPropSources.map(O=>this.options.externalPropSource(O.id.name)):void 0,skippedNodes:l,tokenData:c,tokenizers:u.map(O=>O.create()),context:this.ast.context?typeof this.options.contextTracker=="function"?this.options.contextTracker(this.termTable):this.options.contextTracker:void 0,topRules:h,dialects:f,dynamicPrecedences:d,specialized:p,tokenPrec:g,termNames:x})}getParserFile(){let{states:e,stateData:i,goto:n,nodeNames:s,nodeProps:r,skippedTypes:l,maxTerm:a,repeatNodeCount:o,tokenizers:u,tokenData:c,topRules:h,dialects:f,dynamicPrecedences:d,specialized:m,tokenPrec:g,termNames:x}=this.prepareParser(),p=this.options.moduleStyle||"es",O=`// This file was generated by lezer-generator. You probably shouldn't edit it.
`,y=O,S={},k=Object.create(null),w=Object.create(null);for(let C of Hv)w[C]=!0;let v=this.options.exportName||"parser";w[v]=!0;let P=C=>{for(let B=0;;B++){let le=C+(B?"_"+B:"");if(!w[le])return le}},z=(C,B,le=C)=>{let Ft=C+" from "+B;if(k[Ft])return k[Ft];let Jn=JSON.stringify(B),Fn=C;return C in w&&(Fn=P(le),C+=`${p=="cjs"?":":" as"} ${Fn}`),w[Fn]=!0,(S[Jn]||(S[Jn]=[])).push(C),k[Ft]=Fn},M=z("LRParser","@lezer/lr"),X=u.map(C=>C.createSource(z)),T=this.ast.context?z(this.ast.context.id.name,this.ast.context.source):null,N=r.map(({prop:C,terms:B})=>{let{source:le}=this.knownProps[C];return`[${le.from?z(le.name,le.from):JSON.stringify(le.name)}, ${B.map(gt).join(",")}]`});function V(C){return"{__proto__:null,"+Object.keys(C).map(B=>`${/^(\d+|[a-zA-Z_]\w*)$/.test(B)?B:JSON.stringify(B)}:${C[B]}`).join(", ")+"}"}let W="",Ne=m.map(C=>{if(C instanceof to){let B=z(C.ast.id.name,C.ast.source),le=this.options.typeScript?": any":"";return`{term: ${C.term.id}, get: (value${le}, stack${le}) => (${B}(value, stack) << 1)${C.ast.type=="extend"?" | 1":""}, external: ${B}${C.ast.type=="extend"?", extend: true":""}}`}else{let B=P("spec_"+C.token.name.replace(/\W/g,""));w[B]=!0,W+=`const ${B} = ${V(C.table)}
`;let le=this.options.typeScript?`: keyof typeof ${B}`:"";return`{term: ${C.token.id}, get: (value${le}) => ${B}[value] || -1}`}}),lt=this.ast.externalPropSources.map(C=>z(C.id.name,C.source));for(let C in S)p=="cjs"?y+=`const {${S[C].join(", ")}} = require(${C})
`:y+=`import {${S[C].join(", ")}} from ${C}
`;y+=W;function gt(C){return typeof C!="string"||/^(true|false|\d+(\.\d+)?|\.\d+)$/.test(C)?C:JSON.stringify(C)}let qe=Object.keys(f).map(C=>`${C}: ${f[C]}`),sl=`${M}.deserialize({
  version: 14,
  states: ${Ia(e,4294967295)},
  stateData: ${Ia(i)},
  goto: ${Ia(n)},
  nodeNames: ${JSON.stringify(s)},
  maxTerm: ${a}${T?`,
  context: ${T}`:""}${N.length?`,
  nodeProps: [
    ${N.join(`,
    `)}
  ]`:""}${lt.length?`,
  propSources: [${lt.join()}]`:""}${l.length?`,
  skippedNodes: ${JSON.stringify(l)}`:""},
  repeatNodeCount: ${o},
  tokenData: ${Ia(c)},
  tokenizers: [${X.join(", ")}],
  topRules: ${JSON.stringify(h)}${qe.length?`,
  dialects: {${qe.join(", ")}}`:""}${d?`,
  dynamicPrecedences: ${JSON.stringify(d)}`:""}${Ne.length?`,
  specialized: [${Ne.join(",")}]`:""},
  tokenPrec: ${g}${this.options.includeNames?`,
  termNames: ${JSON.stringify(x)}`:""}
})`,at=[];for(let C in this.termTable){let B=C;if(Hv.includes(B))for(let le=1;B="_".repeat(le)+C,B in this.termTable;le++);else if(!/^[\w$]+$/.test(C))continue;at.push(`${B}${p=="cjs"?":":" ="} ${this.termTable[C]}`)}for(let C=0;C<this.dialects.length;C++)at.push(`Dialect_${this.dialects[C]}${p=="cjs"?":":" ="} ${C}`);return{parser:y+(p=="cjs"?`exports.${v} = ${sl}
`:`export const ${v} = ${sl}
`),terms:p=="cjs"?`${O}module.exports = {
  ${at.join(`,
  `)}
}`:`${O}export const
  ${at.join(`,
  `)}
`}}gatherNonSkippedNodes(){let e=Object.create(null),i=[],n=s=>{e[s.id]||(e[s.id]=!0,i.push(s))};this.terms.tops.forEach(n);for(let s=0;s<i.length;s++)for(let r of i[s].rules)for(let l of r.parts)n(l);return e}gatherNodeProps(e){let i=this.gatherNonSkippedNodes(),n=[],s=[];for(let r of e){!i[r.id]&&!r.error&&n.push(r.id);for(let l in r.props){let a=this.knownProps[l];if(!a)throw new hi("No known prop type for "+l);if(a.source.from==null&&(a.source.name=="repeated"||a.source.name=="error"))continue;let o=s.find(u=>u.prop==l);o||s.push(o={prop:l,values:{}}),(o.values[r.props[l]]||(o.values[r.props[l]]=[])).push(r.id)}}return{nodeProps:s.map(({prop:r,values:l})=>{let a=[];for(let o in l){let u=l[o];if(u.length==1)a.push(u[0],o);else{a.push(-u.length);for(let c of u)a.push(c);a.push(o)}}return{prop:r,terms:a}}),skippedTypes:n}}makeTerminal(e,i,n){return this.terms.makeTerminal(this.terms.uniqueName(e),i,n)}computeForceReductions(e,i){let n=[],s=[],r=Object.create(null);for(let o of e){n.push(0);for(let u of o.goto){let c=r[u.term.id]||(r[u.term.id]=[]),h=c.find(f=>f.target==u.target.id);h?h.parents.push(o.id):c.push({parents:[o.id],target:u.target.id})}s[o.id]=o.set.filter(u=>u.pos>0&&!u.rule.name.top).sort((u,c)=>c.pos-u.pos||u.rule.parts.length-c.rule.parts.length)}let l=Object.create(null);function a(o,u,c=null){let h=r[o];return h?h.some(f=>{let d=c?c.filter(g=>f.parents.includes(g)):f.parents;if(d.length==0)return!1;if(f.target==u)return!0;let m=l[f.target];return m!=null&&a(m,u,d)}):!1}for(let o of e)o.defaultReduce&&o.defaultReduce.parts.length>0&&(n[o.id]=eo(o.defaultReduce,i),o.defaultReduce.parts.length==1&&(l[o.id]=o.defaultReduce.name.id));for(let o=1;;o++){let u=!0;for(let c of e){if(c.defaultReduce)continue;let h=s[c.id];if(h.length!=o){h.length>o&&(u=!1);continue}for(let f of h)if(f.pos!=1||!a(f.rule.name.id,c.id)){n[c.id]=eo(f.rule,i,f.pos),f.pos==1&&(l[c.id]=f.rule.name.id);break}}if(u)break}return n}substituteArgs(e,i,n){return i.length==0?e:e.walk(s=>{let r;if(s instanceof Fe&&(r=n.findIndex(l=>l.name==s.id.name))>-1){let l=i[r];if(s.args.length){if(l instanceof Fe&&!l.args.length)return new Fe(s.start,l.id,s.args);this.raise("Passing arguments to a parameter that already has arguments",s.start)}return l}else if(s instanceof _s){let l=s.rule,a=this.substituteArgsInProps(l.props,i,n);return a==l.props?s:new _s(s.start,new io(l.start,l.id,a,l.params,l.expr))}else if(s instanceof tl){let l=this.substituteArgsInProps(s.props,i,n);return l==s.props?s:new tl(s.start,s.type,l,s.token,s.content)}return s})}substituteArgsInProps(e,i,n){let s=l=>{let a=l;for(let o=0;o<l.length;o++){let u=l[o];if(!u.name)continue;let c=n.findIndex(f=>f.name==u.name);if(c<0)continue;a==l&&(a=l.slice());let h=i[c];h instanceof Fe&&!h.args.length?a[o]=new Zs(u.start,h.id.name,null):h instanceof Ot?a[o]=new Zs(u.start,h.value,null):this.raise(`Trying to interpolate expression '${h}' into a prop`,u.start)}return a},r=e;for(let l=0;l<e.length;l++){let a=e[l],o=s(a.value);o!=a.value&&(r==e&&(r=e.slice()),r[l]=new il(a.start,a.at,a.name,o))}return r}conflictsFor(e){let i=rt.none,n=rt.none;for(let s of e)if(s.type=="ambig")i=i.join(new rt(0,[s.id.name]));else{let r=this.ast.precedences,l=r?r.items.findIndex(u=>u.id.name==s.id.name):-1;l<0&&this.raise(`Reference to unknown precedence: '${s.id.name}'`,s.id.start);let a=r.items[l],o=r.items.length-l;a.type=="cut"?i=i.join(new rt(0,De,o)):(i=i.join(new rt(o<<2)),n=n.join(new rt((o<<2)+(a.type=="left"?1:a.type=="right"?-1:0))))}return{here:i,atEnd:n}}raise(e,i=1){return this.input.raise(e,i)}warn(e,i=-1){let n=this.input.message(e,i);this.options.warn?this.options.warn(n):console.warn(n)}defineRule(e,i){let n=this.currentSkip[this.currentSkip.length-1];for(let s of i)this.rules.push(new so(e,s.terms,s.ensureConflicts(),n))}resolve(e){for(let s of this.built)if(s.matches(e))return[Jt(s.term)];let i=this.tokens.getToken(e);if(i)return[Jt(i)];for(let s of this.localTokens){let r=s.getToken(e);if(r)return[Jt(r)]}for(let s of this.externalTokens){let r=s.getToken(e);if(r)return[Jt(r)]}for(let s of this.externalSpecializers){let r=s.getToken(e);if(r)return[Jt(r)]}let n=this.astRules.find(s=>s.rule.id.name==e.id.name);return n?(n.rule.params.length!=e.args.length&&this.raise(`Wrong number or arguments for '${e.id.name}'`,e.start),this.used(n.rule.id.name),[Jt(this.buildRule(n.rule,e.args,n.skip))]):this.raise(`Reference to undefined rule '${e.id.name}'`,e.start)}normalizeRepeat(e){let i=this.built.find(r=>r.matchesRepeat(e));if(i)return Jt(i.term);let n=e.expr.prec<e.prec?`(${e.expr})+`:`${e.expr}+`,s=this.terms.makeRepeat(this.terms.uniqueName(n));return this.built.push(new nl("+",[e.expr],s)),this.defineRule(s,this.normalizeExpr(e.expr).concat(Jt(s,s))),Jt(s)}normalizeSequence(e){let i=e.exprs.map(r=>this.normalizeExpr(r)),n=this;function s(r,l,a){let{here:o,atEnd:u}=n.conflictsFor(e.markers[l]);if(l==i.length)return[r.withConflicts(r.terms.length,o.join(a))];let c=[];for(let h of i[l])for(let f of s(r.concat(h).withConflicts(r.terms.length,o),l+1,a.join(u)))c.push(f);return c}return s(In.none,0,rt.none)}normalizeExpr(e){if(e instanceof Ds&&e.kind=="?")return[In.none,...this.normalizeExpr(e.expr)];if(e instanceof Ds){let i=this.normalizeRepeat(e);return e.kind=="+"?[i]:[In.none,i]}else return e instanceof Wn?e.exprs.reduce((i,n)=>i.concat(this.normalizeExpr(n)),[]):e instanceof Mt?this.normalizeSequence(e):e instanceof Ot?[Jt(this.tokens.getLiteral(e))]:e instanceof Fe?this.resolve(e):e instanceof tl?[Jt(this.resolveSpecialization(e))]:e instanceof _s?[Jt(this.buildRule(e.rule,De,this.currentSkip[this.currentSkip.length-1],!0))]:this.raise(`This type of expression ('${e}') may not occur in non-token rules`,e.start)}buildRule(e,i,n,s=!1){let r=this.substituteArgs(e.expr,i,e.params),{name:l,props:a,dynamicPrec:o,inline:u,group:c,exported:h}=this.nodeInfo(e.props||De,s?"pg":"pgi",e.id.name,i,e.params,e.expr);h&&e.params.length&&this.warn("Can't export parameterized rules",e.start),h&&s&&this.warn("Can't export inline rule",e.start);let f=this.newName(e.id.name+(i.length?"<"+i.join(",")+">":""),l||!0,a);u&&(f.inline=!0),o&&this.registerDynamicPrec(f,o),(f.nodeType||h)&&e.params.length==0&&(l||(f.preserve=!0),s||(this.namedTerms[h||e.id.name]=f)),s||this.built.push(new nl(e.id.name,i,f)),this.currentSkip.push(n);let d=this.normalizeExpr(r);return d.length>100*(r instanceof Wn?r.exprs.length:1)&&this.warn(`Rule ${e.id.name} is generating a lot (${d.length}) of choices.
  Consider splitting it up or reducing the amount of ? or | operator uses.`,e.start),/\brulesize\b/.test(Fa)&&d.length>10&&console.log(`Rule ${e.id.name}: ${d.length} variants`),this.defineRule(f,d),this.currentSkip.pop(),c&&this.definedGroups.push({name:f,group:c,rule:e}),f}nodeInfo(e,i,n=null,s=De,r=De,l,a){let o={},u=n&&(i.indexOf("a")>-1||!NM(n))&&!/ /.test(n)?n:null,c=null,h=0,f=!1,d=null,m=null;for(let g of e)if(g.at)if(g.name=="name")u=this.finishProp(g,s,r),/ /.test(u)&&this.raise(`Node names cannot have spaces ('${u}')`,g.start);else if(g.name=="dialect"){i.indexOf("d")<0&&this.raise("Can't specify a dialect on non-token rules",e[0].start),g.value.length!=1&&!g.value[0].value&&this.raise("The '@dialect' rule prop must hold a plain string value");let x=this.dialects.indexOf(g.value[0].value);x<0&&this.raise(`Unknown dialect '${g.value[0].value}'`,g.value[0].start),c=x}else g.name=="dynamicPrecedence"?(i.indexOf("p")<0&&this.raise("Dynamic precedence can only be specified on nonterminals"),(g.value.length!=1||!/^-?(?:10|\d)$/.test(g.value[0].value))&&this.raise("The '@dynamicPrecedence' rule prop must hold an integer between -10 and 10"),h=+g.value[0].value):g.name=="inline"?(g.value.length&&this.raise("'@inline' doesn't take a value",g.value[0].start),i.indexOf("i")<0&&this.raise("Inline can only be specified on nonterminals"),f=!0):g.name=="isGroup"?(i.indexOf("g")<0&&this.raise("'@isGroup' can only be specified on nonterminals"),d=g.value.length?this.finishProp(g,s,r):n):g.name=="export"?g.value.length?m=this.finishProp(g,s,r):m=n:this.raise(`Unknown built-in prop name '@${g.name}'`,g.start);else{if(!this.knownProps[g.name]){let x=["name","dialect","dynamicPrecedence","export","isGroup"].includes(g.name)?` (did you mean '@${g.name}'?)`:"";this.raise(`Unknown prop name '${g.name}'${x}`,g.start)}o[g.name]=this.finishProp(g,s,r)}if(l&&this.ast.autoDelim&&(u||Ua(o))){let g=this.findDelimiters(l);g&&(Gv(g[0],"closedBy",g[1].nodeName),Gv(g[1],"openedBy",g[0].nodeName))}if(a&&Ua(a))for(let g in a)g in o||(o[g]=a[g]);return Ua(o)&&!u&&this.raise("Node has properties but no name",e.length?e[0].start:l.start),f&&(Ua(o)||c||h)&&this.raise("Inline nodes can't have props, dynamic precedence, or a dialect",e[0].start),f&&u&&(u=null),{name:u,props:o,dialect:c,dynamicPrec:h,inline:f,group:d,exported:m}}finishProp(e,i,n){return e.value.map(s=>{if(s.value)return s.value;let r=n.findIndex(a=>a.name==s.name);r<0&&this.raise(`Property refers to '${s.name}', but no parameter by that name is in scope`,s.start);let l=i[r];return l instanceof Fe&&!l.args.length?l.id.name:l instanceof Ot?l.value:this.raise(`Expression '${l}' can not be used as part of a property value`,s.start)}).join("")}resolveSpecialization(e){let i=e.type,{name:n,props:s,dialect:r,exported:l}=this.nodeInfo(e.props,"d"),a=this.normalizeExpr(e.token);(a.length!=1||a[0].terms.length!=1||!a[0].terms[0].terminal)&&this.raise(`The first argument to '${i}' must resolve to a token`,e.token.start);let o,u;if((u=Wc(e.content))!=null)o=[u];else if(e.content instanceof Wn&&e.content.exprs.every(d=>Wc(d)!=null))o=e.content.exprs.map(Wc);else return this.raise(`The second argument to '${e.type}' must be a literal or choice of literals`,e.content.start);let c=a[0].terms[0],h=null,f=this.specialized[c.name]||(this.specialized[c.name]=[]);for(let d of o){let m=f.find(g=>g.value==d);m==null?(h||(h=this.makeTerminal(c.name+"/"+JSON.stringify(d),n,s),r!=null&&(this.tokens.byDialect[r]||(this.tokens.byDialect[r]=[])).push(h)),f.push({value:d,term:h,type:i,dialect:r,name:n}),this.tokenOrigins[h.name]={spec:c},(n||l)&&(n||(h.preserve=!0),this.namedTerms[l||n]=h)):(m.type!=i&&this.raise(`Conflicting specialization types for ${JSON.stringify(d)} of ${c.name} (${i} vs ${m.type})`,e.start),m.dialect!=r&&this.raise(`Conflicting dialects for specialization ${JSON.stringify(d)} of ${c.name}`,e.start),m.name!=n&&this.raise(`Conflicting names for specialization ${JSON.stringify(d)} of ${c.name}`,e.start),h&&m.term!=h&&this.raise(`Conflicting specialization tokens for ${JSON.stringify(d)} of ${c.name}`,e.start),h=m.term)}return h}findDelimiters(e){if(!(e instanceof Mt)||e.exprs.length<2)return null;let i=a=>{if(a instanceof Ot)return{term:this.tokens.getLiteral(a),str:a.value};if(a instanceof Fe&&a.args.length==0){let o=this.ast.rules.find(c=>c.id.name==a.id.name);if(o)return i(o.expr);let u=this.tokens.rules.find(c=>c.id.name==a.id.name);if(u&&u.expr instanceof Ot)return{term:this.tokens.getToken(a),str:u.expr.value}}return null},n=i(e.exprs[e.exprs.length-1]);if(!n||!n.term.nodeName)return null;let r=["()","[]","{}","<>"].find(a=>n.str.indexOf(a[1])>-1&&n.str.indexOf(a[0])<0);if(!r)return null;let l=i(e.exprs[0]);return!l||!l.term.nodeName||l.str.indexOf(r[0])<0||l.str.indexOf(r[1])>-1?null:[l.term,n.term]}registerDynamicPrec(e,i){this.dynamicRulePrecedences.push({rule:e,prec:i}),e.preserve=!0}defineGroup(e,i,n){var s;let r=[],l=a=>{if(a.nodeName)return[a];r.includes(a)&&this.raise(`Rule '${n.id.name}' cannot define a group because it contains a non-named recursive rule ('${a.name}')`,n.start);let o=[];r.push(a);for(let u of this.rules)if(u.name==a){let c=u.parts.map(l).filter(h=>h.length);if(c.length>1&&this.raise(`Rule '${n.id.name}' cannot define a group because some choices produce multiple named nodes`,n.start),c.length==1)for(let h of c[0])o.push(h)}return r.pop(),o};for(let a of l(e))a.props.group=(((s=a.props.group)===null||s===void 0?void 0:s.split(" "))||[]).concat(i).sort().join(" ")}checkGroups(){let e=Object.create(null),i=Object.create(null);for(let s of this.terms.terms)if(s.nodeName&&(i[s.nodeName]=!0,s.props.group))for(let r of s.props.group.split(" "))(e[r]||(e[r]=[])).push(s);let n=Object.keys(e);for(let s=0;s<n.length;s++){let r=n[s],l=e[r];i[r]&&this.warn(`Group name '${r}' conflicts with a node of the same name`);for(let a=s+1;a<n.length;a++){let o=e[n[a]];l.some(u=>o.includes(u))&&(l.length>o.length?o.some(u=>!l.includes(u)):l.some(u=>!o.includes(u)))&&this.warn(`Groups '${r}' and '${n[a]}' overlap without one being a superset of the other`)}}}};function Wc(t){if(t instanceof Ot)return t.value;if(t instanceof Mt){let e="";for(let i of t.exprs){let n=Wc(i);if(n==null)return null;e+=n}return e}return null}var rO=5,_O=class{constructor(e,i,n,s,r,l,a){this.tokenizers=e,this.data=i,this.stateArray=n,this.skipData=s,this.skipInfo=r,this.states=l,this.builder=a,this.sharedActions=[]}findSharedActions(e){if(e.actions.length<rO)return null;let i=null;for(let l of this.sharedActions)(!i||l.actions.length>i.actions.length)&&l.actions.every(a=>e.actions.some(o=>o.eq(a)))&&(i=l);if(i)return i;let n=null,s=[];for(let l=e.id+1;l<this.states.length;l++){let a=this.states[l],o=0;if(!(a.defaultReduce||a.actions.length<rO)){for(let u of e.actions)for(let c of a.actions)u.eq(c)&&(s[o++]=u);o>=rO&&(!n||n.length<o)&&(n=s,s=[])}}if(!n)return null;let r={actions:n,addr:this.storeActions(n,-1,null)};return this.sharedActions.push(r),r}storeActions(e,i,n){if(i<0&&n&&n.actions.length==e.length)return n.addr;let s=[];for(let r of e)if(!(n&&n.actions.some(l=>l.eq(r))))if(r instanceof zi)s.push(r.term.id,r.target.id,0);else{let l=eo(r.rule,this.skipInfo);l!=i&&s.push(r.term.id,l&65535,l>>16)}return s.push(65535),i>-1?s.push(2,i&65535,i>>16):n?s.push(1,n.addr&65535,n.addr>>16):s.push(0),this.data.storeArray(s)}finish(e,i,n){let s=this.builder,r=s.skipRules.indexOf(e.skip),l=this.skipData[r],a=this.skipInfo[r].startTokens,o=e.defaultReduce?eo(e.defaultReduce,this.skipInfo):0,u=i?1:0,c=-1,h=null;if(o==0){if(i)for(let g of e.actions)g instanceof Ns&&g.term.eof&&(c=eo(g.rule,this.skipInfo));c<0&&(h=this.findSharedActions(e))}e.set.some(g=>g.rule.name.top&&g.pos==g.rule.parts.length)&&(u|=2);let f=[];for(let g=0;g<e.actions.length+a.length;g++){let x=g<e.actions.length?e.actions[g].term:a[g-e.actions.length];for(;;){let p=s.tokenOrigins[x.name];if(p&&p.spec){x=p.spec;continue}p&&p.external instanceof lo&&Ha(f,p.external);break}}let d=0;for(let g=0;g<this.tokenizers.length;g++){let x=this.tokenizers[g];(f.includes(x)||x.groupID==e.tokenGroup)&&(d|=1<<g)}let m=e.id*6;this.stateArray[m+0]=u,this.stateArray[m+1]=this.storeActions(o?De:e.actions,c,h),this.stateArray[m+2]=l,this.stateArray[m+3]=d,this.stateArray[m+4]=o,this.stateArray[m+5]=n}};function Gv(t,e,i){let n=t.props[e];(!n||n.split(" ").indexOf(i)<0)&&(t.props[e]=n?n+" "+i:i)}function $M(t){let e=Object.create(null);for(let{value:i,term:n,type:s}of t){let r=s=="specialize"?0:1;e[i]=n.id<<1|r}return e}function eo(t,e,i=t.parts.length){return t.name.id|65536|(t.isRepeatWrap&&i==t.parts.length?131072:0)|(e.some(n=>n.rule==t.name)?262144:0)|i<<19}function AM(t,e){e:for(let i=0;;){let n=t.indexOf(e[0],i);if(n==-1||n+e.length>t.length)break;for(let s=1;s<e.length;s++)if(e[s]!=t[n+s]){i=n+1;continue e}return n}return-1}function RM(t,e){let i=Object.create(null),n=[],s=r=>{i[r.id]||(i[r.id]=!0,n.push(r))};for(let r of t)r.startRule&&e.includes(r.startRule)&&s(r);for(let r=0;r<n.length;r++){for(let l of n[r].actions)l instanceof zi&&s(l.target);for(let l of n[r].goto)s(l.target)}return r=>!i[r]}var rh=class{constructor(){this.data=[]}storeArray(e){let i=AM(this.data,e);if(i>-1)return i;let n=this.data.length;for(let s of e)this.data.push(s);return n}finish(){return Uint16Array.from(this.data)}};function CM(t){let e={},i=0;for(let l of t)for(let a of l.goto){i=Math.max(a.term.id,i);let o=e[a.term.id]||(e[a.term.id]={});(o[a.target.id]||(o[a.target.id]=[])).push(l.id)}let n=new rh,s=[],r=i+2;for(let l=0;l<=i;l++){let a=e[l];if(!a){s.push(1);continue}let o=[],u=Object.keys(a);for(let c of u){let h=a[c];o.push((c==u[u.length-1]?1:0)+(h.length<<1)),o.push(+c);for(let f of h)o.push(f)}s.push(n.storeArray(o)+r)}if(s.some(l=>l>65535))throw new hi("Goto table too large");return Uint16Array.from([i+1,...s,...n.data])}var ZO=class{constructor(e,i){this.tokens=e,this.groupID=i}create(){return this.groupID}createSource(){return String(this.groupID)}};function Ha(t,e){t.includes(e)||t.push(e)}function MM(t){let e=Object.create(null);for(let i of t){let n=1<<i.groupID;for(let s of i.tokens)e[s.id]=(e[s.id]||0)|n}return e}var XO=class{constructor(e,i,n){this.name=e,this.expr=i,this.scope=n}},DO=class{constructor(e,i,n,s){this.name=e,this.start=i,this.to=n,this.args=s}},lh=class{constructor(e,i){this.b=e,this.ast=i,this.startState=new Ct,this.built=[],this.building=[],this.byDialect=Object.create(null),this.precedenceRelations=[],this.rules=i?i.rules:De;for(let n of this.rules)e.unique(n.id)}getToken(e){for(let u of this.built)if(u.matches(e))return u.term;let i=e.id.name,n=this.rules.find(u=>u.id.name==i);if(!n)return null;let{name:s,props:r,dialect:l,exported:a}=this.b.nodeInfo(n.props,"d",i,e.args,n.params.length!=e.args.length?De:n.params),o=this.b.makeTerminal(e.toString(),s,r);return l!=null&&(this.byDialect[l]||(this.byDialect[l]=[])).push(o),(o.nodeType||a)&&n.params.length==0&&(o.nodeType||(o.preserve=!0),this.b.namedTerms[a||i]=o),this.buildRule(n,e,this.startState,new Ct([o])),this.built.push(new nl(i,e.args,o)),o}buildRule(e,i,n,s,r=De){let l=i.id.name;e.params.length!=i.args.length&&this.b.raise(`Incorrect number of arguments for token '${l}'`,i.start);let a=this.building.find(u=>u.name==l&&ao(i.args,u.args));if(a){if(a.to==s){n.nullEdge(a.start);return}let u=this.building.length-1;for(;this.building[u].name!=l;)u--;this.b.raise(`Invalid (non-tail) recursion in token rules: ${this.building.slice(u).map(c=>c.name).join(" -> ")}`,i.start)}this.b.used(e.id.name);let o=new Ct;n.nullEdge(o),this.building.push(new DO(l,o,s,i.args)),this.build(this.b.substituteArgs(e.expr,i.args,e.params),o,s,i.args.map((u,c)=>new XO(e.params[c].name,u,r))),this.building.pop()}build(e,i,n,s){if(e instanceof Fe){let r=e.id.name,l=s.find(o=>o.name==r);if(l)return this.build(l.expr,i,n,l.scope);let a;for(let o=0,u=this.b.localTokens;o<=u.length&&(a=(o==u.length?this.b.tokens:u[o]).rules.find(h=>h.id.name==r),!a);o++);if(!a)return this.b.raise(`Reference to token rule '${r}', which isn't found`,e.start);this.buildRule(a,e,i,n,s)}else if(e instanceof no)for(let[r,l]of vO[e.type])i.edge(r,l,n);else if(e instanceof Wn)for(let r of e.exprs)this.build(r,i,n,s);else if(tQ(e))i.nullEdge(n);else if(e instanceof Mt){let r=e.markers.find(l=>l.length>0);r&&this.b.raise("Conflict marker in token expression",r[0].start);for(let l=0;l<e.exprs.length;l++){let a=l==e.exprs.length-1?n:new Ct;this.build(e.exprs[l],i,a,s),i=a}}else if(e instanceof Ds)if(e.kind=="*"){let r=new Ct;i.nullEdge(r),this.build(e.expr,r,r,s),r.nullEdge(n)}else if(e.kind=="+"){let r=new Ct;this.build(e.expr,i,r,s),this.build(e.expr,r,r,s),r.nullEdge(n)}else i.nullEdge(n),this.build(e.expr,i,n,s);else if(e instanceof Hc)for(let[r,l]of e.inverted?zM(e.ranges):e.ranges)_M(i,n,r,l);else if(e instanceof Ot)for(let r=0;r<e.value.length;r++){let l=e.value.charCodeAt(r),a=r==e.value.length-1?n:new Ct;i.edge(l,l+1,a),i=a}else if(e instanceof Kc){let r=new Ct;i.edge(0,56320,n),i.edge(56320,jO+1,n),i.edge(55296,56320,r),r.edge(56320,57344,n)}else return this.b.raise("Unrecognized expression type in token",e.start)}takePrecedences(){let e=this.precedenceRelations=[];if(this.ast)for(let i of this.ast.precedences){let n=[];for(let s of i.items){let r=[];if(s instanceof Fe)for(let l of this.built)(s.args.length?l.matches(s):l.id==s.id.name)&&r.push(l.term);else{let l=JSON.stringify(s.value),a=this.built.find(o=>o.id==l);a&&r.push(a.term)}r.length||this.b.warn(`Precedence specified for unknown token ${s}`,s.start);for(let l of r)uO(e,l,n);n=n.concat(r)}}}precededBy(e,i){let n=this.precedenceRelations.find(s=>s.term==e);return n&&n.after.includes(i)}buildPrecTable(e){let i=[],n=this.precedenceRelations.slice();for(let{a:s,b:r,soft:l}of e)if(l){if(!n.some(a=>a.term==s)||!n.some(a=>a.term==r))continue;l<0&&([s,r]=[r,s]),uO(n,r,[s]),uO(n,s,[])}e:for(;n.length;){for(let s=0;s<n.length;s++){let r=n[s];if(r.after.every(l=>i.includes(l.id))){if(i.push(r.term.id),n.length==1)break e;n[s]=n.pop();continue e}}this.b.raise(`Cyclic token precedence relation between ${n.map(s=>s.term).join(", ")}`)}return i}},NO=class extends lh{constructor(){super(...arguments),this.explicitConflicts=[]}getLiteral(e){let i=JSON.stringify(e.value);for(let u of this.built)if(u.id==i)return u.term;let n=null,s={},r=null,l=null,a=this.ast?this.ast.literals.find(u=>u.literal==e.value):null;a&&({name:n,props:s,dialect:r,exported:l}=this.b.nodeInfo(a.props,"da",e.value));let o=this.b.makeTerminal(i,n,s);return r!=null&&(this.byDialect[r]||(this.byDialect[r]=[])).push(o),l&&(this.b.namedTerms[l]=o),this.build(e,this.startState,new Ct([o]),De),this.built.push(new nl(i,De,o)),o}takeConflicts(){var e;let i=n=>{if(n instanceof Fe){for(let s of this.built)if(s.matches(n))return s.term}else{let s=JSON.stringify(n.value),r=this.built.find(l=>l.id==s);if(r)return r.term}return this.b.warn(`Conflict specified for unknown token ${n}`,n.start),null};for(let n of((e=this.ast)===null||e===void 0?void 0:e.conflicts)||[]){let s=i(n.a),r=i(n.b);s&&r&&(s.id<r.id&&([s,r]=[r,s]),this.explicitConflicts.push({a:s,b:r}))}}buildTokenGroups(e,i,n){let s=this.startState.compile();s.accepting.length&&this.b.raise(`Grammar contains zero-length tokens (in '${s.accepting[0].name}')`,this.rules.find(h=>h.id.name==s.accepting[0].name).start),/\btokens\b/.test(Fa)&&console.log(s.toString());let r=s.findConflicts(EM(e,this.b,i)).filter(({a:h,b:f})=>!this.precededBy(h,f)&&!this.precededBy(f,h));for(let{a:h,b:f}of this.explicitConflicts)r.some(d=>d.a==h&&d.b==f)||r.push(new Jv(h,f,0,"",""));let l=r.filter(h=>h.soft),a=r.filter(h=>!h.soft),o=[],u=[];for(let h of e){if(h.defaultReduce||h.tokenGroup>-1)continue;let f=[],d=[],m=i[this.b.skipRules.indexOf(h.skip)].startTokens;for(let p of m)h.actions.some(O=>O.term==p)&&this.b.raise(`Use of token ${p.name} conflicts with skip rule`);let g=[];for(let p=0;p<h.actions.length+(m?m.length:0);p++){let O=p<h.actions.length?h.actions[p].term:m[p-h.actions.length],y=this.b.tokenOrigins[O.name];if(y&&y.spec)O=y.spec;else if(y&&y.external)continue;Ha(g,O)}if(g.length==0)continue;for(let p of g)for(let O of a){let y=O.a==p?O.b:O.b==p?O.a:null;if(y){if(g.includes(y)&&!o.some(S=>S.conflict==O)){let S=O.exampleA?` (example: ${JSON.stringify(O.exampleA)}${O.exampleB?` vs ${JSON.stringify(O.exampleB)}`:""})`:"";o.push({error:`Overlapping tokens ${p.name} and ${y.name} used in same context${S}
After: ${h.set[0].trail()}`,conflict:O})}Ha(f,p),Ha(d,y)}}let x=null;for(let p of u)if(!d.some(O=>p.tokens.includes(O))){for(let O of f)Ha(p.tokens,O);x=p;break}x||(x=new ZO(f,u.length+n),u.push(x)),h.tokenGroup=x.groupID}o.length&&this.b.raise(o.map(h=>h.error).join(`

`)),u.length+n>16&&this.b.raise(`Too many different token groups (${u.length}) to represent them as a 16-bit bitfield`);let c=this.buildPrecTable(l);return{tokenGroups:u,tokenPrec:c,tokenData:s.toArray(MM(u),c)}}},qO=class extends lh{constructor(e,i){super(e,i),this.fallback=null,i.fallback&&e.unique(i.fallback.id)}getToken(e){let i=null;if(this.ast.fallback&&this.ast.fallback.id.name==e.id.name){if(e.args.length&&this.b.raise(`Incorrect number of arguments for ${e.id.name}`,e.start),!this.fallback){let{name:n,props:s,exported:r}=this.b.nodeInfo(this.ast.fallback.props,"",e.id.name,De,De),l=this.fallback=this.b.makeTerminal(e.id.name,n,s);(l.nodeType||r)&&(l.nodeType||(l.preserve=!0),this.b.namedTerms[r||e.id.name]=l),this.b.used(e.id.name)}i=this.fallback}else i=super.getToken(e);return i&&!this.b.tokenOrigins[i.name]&&(this.b.tokenOrigins[i.name]={group:this}),i}buildLocalGroup(e,i,n){let s=this.startState.compile();s.accepting.length&&this.b.raise(`Grammar contains zero-length tokens (in '${s.accepting[0].name}')`,this.rules.find(u=>u.id.name==s.accepting[0].name).start);for(let{a:u,b:c,exampleA:h}of s.findConflicts(()=>!0))!this.precededBy(u,c)&&!this.precededBy(c,u)&&this.b.raise(`Overlapping tokens ${u.name} and ${c.name} in local token group${h?` (example: ${JSON.stringify(h)})`:""}`);for(let u of e){if(u.defaultReduce)continue;let c=null,h=i[this.b.skipRules.indexOf(u.skip)].startTokens[0];for(let{term:f}of u.actions){let d=this.b.tokenOrigins[f.name];for(;d?.spec;)d=this.b.tokenOrigins[d.spec.name];d?.group==this?c=f:h=f}c&&(h&&this.b.raise(`Tokens from a local token group used together with other tokens (${c.name} with ${h.name})`),u.tokenGroup=n)}let r=this.buildPrecTable(De),l=s.toArray({[n]:65535},r),a=l.length,o=new Uint16Array(l.length+r.length+1);return o.set(l,0),o.set(r,a),o[o.length-1]=65535,{groupID:n,create:()=>new Mi(o,a,this.fallback?this.fallback.id:void 0),createSource:u=>`new ${u("LocalTokenGroup","@lezer/lr")}(${Ia(o)}, ${a}${this.fallback?`, ${this.fallback.id}`:""})`}}};function EM(t,e,i){let n=Object.create(null);function s(r,l){return r.actions.some(a=>a.term==l)||i[e.skipRules.indexOf(r.skip)].startTokens.includes(l)}return(r,l)=>{r.id<l.id&&([r,l]=[l,r]);let a=r.id|l.id<<16,o=n[a];return o??(n[a]=t.some(u=>s(u,r)&&s(u,l)))}}function zM(t){let e=0,i=[];for(let[n,s]of t)n>e&&i.push([e,n]),e=s;return e<=Iv&&i.push([e,Iv+1]),i}var lO=65536,Uv=55296,Wv=57344,Iv=1114111,aO=56320,oO=57343;function _M(t,e,i,n){if(i<lO&&(i<Uv&&t.edge(i,Math.min(n,Uv),e),n>Wv&&t.edge(Math.max(i,Wv),Math.min(n,jO+1),e),i=lO),n<=lO)return;let s=String.fromCodePoint(i),r=String.fromCodePoint(n-1),l=s.charCodeAt(0),a=s.charCodeAt(1),o=r.charCodeAt(0),u=r.charCodeAt(1);if(l==o){let c=new Ct;t.edge(l,l+1,c),c.edge(a,u+1,e)}else{let c=l,h=o;if(a>aO){c++;let f=new Ct;t.edge(l,l+1,f),f.edge(a,oO+1,e)}if(u<oO){h--;let f=new Ct;t.edge(o,o+1,f),f.edge(aO,u+1,e)}if(c<=h){let f=new Ct;t.edge(c,h+1,f),f.edge(aO,oO+1,e)}}}function tQ(t){return t instanceof Mt&&t.exprs.length==0}function iQ(t,e){let i=Object.create(null);for(let n of e){t.unique(n.id);let{name:s,props:r,dialect:l}=t.nodeInfo(n.props,"d",n.id.name),a=t.makeTerminal(n.id.name,s,r);l!=null&&(t.tokens.byDialect[l]||(t.tokens.byDialect[l]=[])).push(a),t.namedTerms[n.id.name]=i[n.id.name]=a}return i}function nQ(t,e,i){let n=e[i.id.name];return n?(i.args.length&&t.raise("External tokens cannot take arguments",i.args[0].start),t.used(i.id.name),n):null}function uO(t,e,i){let n=t.findIndex(s=>s.term==e);n<0?t.push({term:e,after:i}):t[n]={term:e,after:t[n].after.concat(i)}}var lo=class{constructor(e,i){this.b=e,this.ast=i,this.tokens=iQ(e,i.tokens);for(let n in this.tokens)this.b.tokenOrigins[this.tokens[n].name]={external:this}}getToken(e){return nQ(this.b,this.tokens,e)}checkConflicts(e,i){let n=[];for(let s of this.ast.conflicts){let r=this.b.namedTerms[s.name];r?r.terminal?this.tokens[s.name]?this.b.warn(`External token set specifying a conflict with one of its own tokens ('${s.name}')`):n.push(r):this.b.warn(`Term '${s.name}' isn't a terminal and cannot be used in a token conflict.`):this.b.warn(`Unknown conflict term '${s.name}'`)}if(n.length)for(let s of e){let r=i[this.b.skipRules.indexOf(s.skip)].startTokens,l=!1,a=null;for(let o=0;o<s.actions.length+r.length;o++){let u=o<s.actions.length?s.actions[o].term:r[o-s.actions.length];u.name in this.tokens?l=!0:n.indexOf(u)>-1&&(a=u)}l&&a&&this.b.raise(`Tokens from external group used together with conflicting token '${a.name}'
After: ${s.set[0].trail()}`,this.ast.start)}}create(){return this.b.options.externalTokenizer(this.ast.id.name,this.b.termTable)}createSource(e){let{source:i,id:{name:n}}=this.ast;return e(n,i)}},to=class{constructor(e,i){this.b=e,this.ast=i,this.term=null,this.tokens=iQ(e,i.tokens)}finish(){let e=this.b.normalizeExpr(this.ast.token);(e.length!=1||e[0].terms.length!=1||!e[0].terms[0].terminal)&&this.b.raise(`The token expression to '@external ${this.ast.type}' must resolve to a token`,this.ast.token.start),this.term=e[0].terms[0];for(let i in this.tokens)this.b.tokenOrigins[this.tokens[i].name]={spec:this.term,external:this}}getToken(e){return nQ(this.b,this.tokens,e)}};function ZM(t,e){for(let i=0;;i++){let n=Object.create(null),s;if(i==0){for(let l of t)if(l.name.inline&&!n[l.name.name]){let a=t.filter(o=>o.name==l.name);if(a.some(o=>o.parts.includes(l.name)))continue;s=n[l.name.name]=a}}for(let l=0;l<t.length;l++){let a=t[l];!a.name.interesting&&!a.parts.includes(a.name)&&a.parts.length<3&&!e.includes(a.name)&&(a.parts.length==1||t.every(o=>o.skip==a.skip||!o.parts.includes(a.name)))&&!a.parts.some(o=>!!n[o.name])&&!t.some((o,u)=>u!=l&&o.name==a.name)&&(s=n[a.name.name]=[a])}if(!s)return t;let r=[];for(let l of t){let a=function(o,u,c){if(o==l.parts.length){r.push(new so(l.name,c,u,l.skip));return}let h=l.parts[o],f=n[h.name];if(!f){a(o+1,u.concat(l.conflicts[o+1]),c.concat(h));return}for(let d of f)a(o+1,u.slice(0,u.length-1).concat(u[o].join(d.conflicts[0])).concat(d.conflicts.slice(1,d.conflicts.length-1)).concat(l.conflicts[o+1].join(d.conflicts[d.conflicts.length-1])),c.concat(d.parts))};if(!n[l.name.name]){if(!l.parts.some(o=>!!n[o.name])){r.push(l);continue}a(0,[l.conflicts[0]],[])}}t=r}}function XM(t){let e=Object.create(null),i;for(let s=0;s<t.length;){let r=s,l=t[s++].name;for(;s<t.length&&t[s].name==l;)s++;let a=s-r;if(!l.interesting)for(let o=s;o<t.length;){let u=o,c=t[o++].name;for(;o<t.length&&t[o].name==c;)o++;if(o-u!=a||c.interesting)continue;let h=!0;for(let f=0;f<a&&h;f++){let d=t[r+f],m=t[u+f];d.cmpNoName(m)!=0&&(h=!1)}h&&(i=e[l.name]=c)}}if(!i)return t;let n=[];for(let s of t)e[s.name.name]||n.push(s.parts.every(r=>!e[r.name])?s:new so(s.name,s.parts.map(r=>e[r.name]||r),s.conflicts,s.skip));return n}function DM(t,e){return XM(ZM(t,e))}function sQ(t,e={}){let i=new zO(t,e),n=i.getParser();return n.termTable=i.termTable,n}var Hv=["arguments","await","break","case","catch","continue","debugger","default","do","else","eval","finally","for","function","if","return","switch","throw","try","var","while","with","null","true","false","instanceof","typeof","void","delete","new","in","this","const","class","extends","export","import","super","enum","implements","interface","let","package","private","protected","public","static","yield","require"];function NM(t){let e=t[0];return e=="_"||e.toUpperCase()!=e}function qM(t){return t.props.some(e=>e.at&&e.name=="export")}var rQ=sQ(`
        @top Program {
          (CSSModule | HTMLBlock | Anything)+
        }
        
        CSSModule {
          CSSModuleStart CSSModuleContent CSSModuleEnd
        }

        HTMLBlock {
          HTMLBlockStart1 Any* HTMLBlockStart2 HTMLBlockContent HTMLBlockEnd
        }

        CSSModuleContent { 
          Anything+
        }

        HTMLBlockContent { 
          Anything+
        }
        
        Anything {
          Any
        }

        @tokens {
          CSSModuleStart { "[[module css]]" } 
          CSSModuleEnd { "[[/module]]" } 
          HTMLBlockStart1 { "[[html" } 
          HTMLBlockStart2 { "]]" } 
          HTMLBlockEnd { "[[/html]]" } 
          Any { _ }
        }
`);function YM(t,e,i){let n=0;return new Proxy({},{get(s,r){return(...l)=>{let a=(n++).toString(),o={type:r,contents:l,_discriminator:t,id:a};return new Promise((u,c)=>{let h=e(f=>{if(!f||f._discriminator!==t)return;let d=f;d.id===a&&(u(d.contents),h())});i(o)})}}})}function lQ(t,e){let i=new Worker(e);return YM(t,n=>{let s=r=>n(r.data);return i.addEventListener("message",s),()=>{i.removeEventListener("message",s)}},n=>{i.postMessage(n)})}var aQ=`"use strict";
(() => {
  // r628/src/workerify.ts
  function workerifyServer(i, discriminator, onReceive, send) {
    let inf = i;
    const unsub = onReceive(async (req) => {
      if (!req || req._discriminator !== discriminator) {
        return;
      }
      const typedReq = req;
      const responseContents = await inf[typedReq.type](...typedReq.contents);
      send({
        contents: responseContents,
        _discriminator: discriminator,
        id: typedReq.id
      });
    });
    return {
      unsub,
      setInterface(i2) {
        inf = i2;
      }
    };
  }
  function createWorkerReceiver(discriminator, t) {
    return workerifyServer(
      t,
      discriminator,
      (cb) => {
        const listener = (e) => cb(e.data);
        globalThis.addEventListener("message", listener);
        return () => {
          globalThis.removeEventListener("message", listener);
        };
      },
      (req) => {
        globalThis.postMessage(req);
      }
    );
  }

  // node_modules/@lezer/common/dist/index.js
  var DefaultBufferLength = 1024;
  var nextPropID = 0;
  var Range = class {
    constructor(from, to) {
      this.from = from;
      this.to = to;
    }
  };
  var NodeProp = class {
    /**
    Create a new node prop type.
    */
    constructor(config = {}) {
      this.id = nextPropID++;
      this.perNode = !!config.perNode;
      this.deserialize = config.deserialize || (() => {
        throw new Error("This node type doesn't define a deserialize function");
      });
    }
    /**
    This is meant to be used with
    [\`NodeSet.extend\`](#common.NodeSet.extend) or
    [\`LRParser.configure\`](#lr.ParserConfig.props) to compute
    prop values for each node type in the set. Takes a [match
    object](#common.NodeType^match) or function that returns undefined
    if the node type doesn't get this prop, and the prop's value if
    it does.
    */
    add(match) {
      if (this.perNode)
        throw new RangeError("Can't add per-node props to node types");
      if (typeof match != "function")
        match = NodeType.match(match);
      return (type) => {
        let result = match(type);
        return result === void 0 ? null : [this, result];
      };
    }
  };
  NodeProp.closedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
  NodeProp.openedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
  NodeProp.group = new NodeProp({ deserialize: (str) => str.split(" ") });
  NodeProp.isolate = new NodeProp({ deserialize: (value) => {
    if (value && value != "rtl" && value != "ltr" && value != "auto")
      throw new RangeError("Invalid value for isolate: " + value);
    return value || "auto";
  } });
  NodeProp.contextHash = new NodeProp({ perNode: true });
  NodeProp.lookAhead = new NodeProp({ perNode: true });
  NodeProp.mounted = new NodeProp({ perNode: true });
  var MountedTree = class {
    constructor(tree, overlay, parser) {
      this.tree = tree;
      this.overlay = overlay;
      this.parser = parser;
    }
    /**
    @internal
    */
    static get(tree) {
      return tree && tree.props && tree.props[NodeProp.mounted.id];
    }
  };
  var noProps = /* @__PURE__ */ Object.create(null);
  var NodeType = class _NodeType {
    /**
    @internal
    */
    constructor(name, props, id, flags = 0) {
      this.name = name;
      this.props = props;
      this.id = id;
      this.flags = flags;
    }
    /**
    Define a node type.
    */
    static define(spec) {
      let props = spec.props && spec.props.length ? /* @__PURE__ */ Object.create(null) : noProps;
      let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
      let type = new _NodeType(spec.name || "", props, spec.id, flags);
      if (spec.props)
        for (let src of spec.props) {
          if (!Array.isArray(src))
            src = src(type);
          if (src) {
            if (src[0].perNode)
              throw new RangeError("Can't store a per-node prop on a node type");
            props[src[0].id] = src[1];
          }
        }
      return type;
    }
    /**
    Retrieves a node prop for this type. Will return \`undefined\` if
    the prop isn't present on this node.
    */
    prop(prop) {
      return this.props[prop.id];
    }
    /**
    True when this is the top node of a grammar.
    */
    get isTop() {
      return (this.flags & 1) > 0;
    }
    /**
    True when this node is produced by a skip rule.
    */
    get isSkipped() {
      return (this.flags & 2) > 0;
    }
    /**
    Indicates whether this is an error node.
    */
    get isError() {
      return (this.flags & 4) > 0;
    }
    /**
    When true, this node type doesn't correspond to a user-declared
    named node, for example because it is used to cache repetition.
    */
    get isAnonymous() {
      return (this.flags & 8) > 0;
    }
    /**
    Returns true when this node's name or one of its
    [groups](#common.NodeProp^group) matches the given string.
    */
    is(name) {
      if (typeof name == "string") {
        if (this.name == name)
          return true;
        let group = this.prop(NodeProp.group);
        return group ? group.indexOf(name) > -1 : false;
      }
      return this.id == name;
    }
    /**
    Create a function from node types to arbitrary values by
    specifying an object whose property names are node or
    [group](#common.NodeProp^group) names. Often useful with
    [\`NodeProp.add\`](#common.NodeProp.add). You can put multiple
    names, separated by spaces, in a single property name to map
    multiple node names to a single value.
    */
    static match(map) {
      let direct = /* @__PURE__ */ Object.create(null);
      for (let prop in map)
        for (let name of prop.split(" "))
          direct[name] = map[prop];
      return (node) => {
        for (let groups = node.prop(NodeProp.group), i = -1; i < (groups ? groups.length : 0); i++) {
          let found = direct[i < 0 ? node.name : groups[i]];
          if (found)
            return found;
        }
      };
    }
  };
  NodeType.none = new NodeType(
    "",
    /* @__PURE__ */ Object.create(null),
    0,
    8
    /* NodeFlag.Anonymous */
  );
  var NodeSet = class _NodeSet {
    /**
    Create a set with the given types. The \`id\` property of each
    type should correspond to its position within the array.
    */
    constructor(types) {
      this.types = types;
      for (let i = 0; i < types.length; i++)
        if (types[i].id != i)
          throw new RangeError("Node type ids should correspond to array positions when creating a node set");
    }
    /**
    Create a copy of this set with some node properties added. The
    arguments to this method can be created with
    [\`NodeProp.add\`](#common.NodeProp.add).
    */
    extend(...props) {
      let newTypes = [];
      for (let type of this.types) {
        let newProps = null;
        for (let source of props) {
          let add = source(type);
          if (add) {
            if (!newProps)
              newProps = Object.assign({}, type.props);
            newProps[add[0].id] = add[1];
          }
        }
        newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
      }
      return new _NodeSet(newTypes);
    }
  };
  var CachedNode = /* @__PURE__ */ new WeakMap();
  var CachedInnerNode = /* @__PURE__ */ new WeakMap();
  var IterMode;
  (function(IterMode2) {
    IterMode2[IterMode2["ExcludeBuffers"] = 1] = "ExcludeBuffers";
    IterMode2[IterMode2["IncludeAnonymous"] = 2] = "IncludeAnonymous";
    IterMode2[IterMode2["IgnoreMounts"] = 4] = "IgnoreMounts";
    IterMode2[IterMode2["IgnoreOverlays"] = 8] = "IgnoreOverlays";
  })(IterMode || (IterMode = {}));
  var Tree = class _Tree {
    /**
    Construct a new tree. See also [\`Tree.build\`](#common.Tree^build).
    */
    constructor(type, children, positions, length, props) {
      this.type = type;
      this.children = children;
      this.positions = positions;
      this.length = length;
      this.props = null;
      if (props && props.length) {
        this.props = /* @__PURE__ */ Object.create(null);
        for (let [prop, value] of props)
          this.props[typeof prop == "number" ? prop : prop.id] = value;
      }
    }
    /**
    @internal
    */
    toString() {
      let mounted = MountedTree.get(this);
      if (mounted && !mounted.overlay)
        return mounted.tree.toString();
      let children = "";
      for (let ch of this.children) {
        let str = ch.toString();
        if (str) {
          if (children)
            children += ",";
          children += str;
        }
      }
      return !this.type.name ? children : (/\\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
    }
    /**
    Get a [tree cursor](#common.TreeCursor) positioned at the top of
    the tree. Mode can be used to [control](#common.IterMode) which
    nodes the cursor visits.
    */
    cursor(mode = 0) {
      return new TreeCursor(this.topNode, mode);
    }
    /**
    Get a [tree cursor](#common.TreeCursor) pointing into this tree
    at the given position and side (see
    [\`moveTo\`](#common.TreeCursor.moveTo).
    */
    cursorAt(pos, side = 0, mode = 0) {
      let scope = CachedNode.get(this) || this.topNode;
      let cursor = new TreeCursor(scope);
      cursor.moveTo(pos, side);
      CachedNode.set(this, cursor._tree);
      return cursor;
    }
    /**
    Get a [syntax node](#common.SyntaxNode) object for the top of the
    tree.
    */
    get topNode() {
      return new TreeNode(this, 0, 0, null);
    }
    /**
    Get the [syntax node](#common.SyntaxNode) at the given position.
    If \`side\` is -1, this will move into nodes that end at the
    position. If 1, it'll move into nodes that start at the
    position. With 0, it'll only enter nodes that cover the position
    from both sides.
    
    Note that this will not enter
    [overlays](#common.MountedTree.overlay), and you often want
    [\`resolveInner\`](#common.Tree.resolveInner) instead.
    */
    resolve(pos, side = 0) {
      let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
      CachedNode.set(this, node);
      return node;
    }
    /**
    Like [\`resolve\`](#common.Tree.resolve), but will enter
    [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
    pointing into the innermost overlaid tree at the given position
    (with parent links going through all parent structure, including
    the host trees).
    */
    resolveInner(pos, side = 0) {
      let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
      CachedInnerNode.set(this, node);
      return node;
    }
    /**
    In some situations, it can be useful to iterate through all
    nodes around a position, including those in overlays that don't
    directly cover the position. This method gives you an iterator
    that will produce all nodes, from small to big, around the given
    position.
    */
    resolveStack(pos, side = 0) {
      return stackIterator(this, pos, side);
    }
    /**
    Iterate over the tree and its children, calling \`enter\` for any
    node that touches the \`from\`/\`to\` region (if given) before
    running over such a node's children, and \`leave\` (if given) when
    leaving the node. When \`enter\` returns \`false\`, that node will
    not have its children iterated over (or \`leave\` called).
    */
    iterate(spec) {
      let { enter, leave, from = 0, to = this.length } = spec;
      let mode = spec.mode || 0, anon = (mode & IterMode.IncludeAnonymous) > 0;
      for (let c = this.cursor(mode | IterMode.IncludeAnonymous); ; ) {
        let entered = false;
        if (c.from <= to && c.to >= from && (!anon && c.type.isAnonymous || enter(c) !== false)) {
          if (c.firstChild())
            continue;
          entered = true;
        }
        for (; ; ) {
          if (entered && leave && (anon || !c.type.isAnonymous))
            leave(c);
          if (c.nextSibling())
            break;
          if (!c.parent())
            return;
          entered = true;
        }
      }
    }
    /**
    Get the value of the given [node prop](#common.NodeProp) for this
    node. Works with both per-node and per-type props.
    */
    prop(prop) {
      return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
    }
    /**
    Returns the node's [per-node props](#common.NodeProp.perNode) in a
    format that can be passed to the [\`Tree\`](#common.Tree)
    constructor.
    */
    get propValues() {
      let result = [];
      if (this.props)
        for (let id in this.props)
          result.push([+id, this.props[id]]);
      return result;
    }
    /**
    Balance the direct children of this tree, producing a copy of
    which may have children grouped into subtrees with type
    [\`NodeType.none\`](#common.NodeType^none).
    */
    balance(config = {}) {
      return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new _Tree(this.type, children, positions, length, this.propValues), config.makeTree || ((children, positions, length) => new _Tree(NodeType.none, children, positions, length)));
    }
    /**
    Build a tree from a postfix-ordered buffer of node information,
    or a cursor over such a buffer.
    */
    static build(data) {
      return buildTree(data);
    }
  };
  Tree.empty = new Tree(NodeType.none, [], [], 0);
  var FlatBufferCursor = class _FlatBufferCursor {
    constructor(buffer, index) {
      this.buffer = buffer;
      this.index = index;
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    get pos() {
      return this.index;
    }
    next() {
      this.index -= 4;
    }
    fork() {
      return new _FlatBufferCursor(this.buffer, this.index);
    }
  };
  var TreeBuffer = class _TreeBuffer {
    /**
    Create a tree buffer.
    */
    constructor(buffer, length, set) {
      this.buffer = buffer;
      this.length = length;
      this.set = set;
    }
    /**
    @internal
    */
    get type() {
      return NodeType.none;
    }
    /**
    @internal
    */
    toString() {
      let result = [];
      for (let index = 0; index < this.buffer.length; ) {
        result.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result.join(",");
    }
    /**
    @internal
    */
    childString(index) {
      let id = this.buffer[index], endIndex = this.buffer[index + 3];
      let type = this.set.types[id], result = type.name;
      if (/\\W/.test(result) && !type.isError)
        result = JSON.stringify(result);
      index += 4;
      if (endIndex == index)
        return result;
      let children = [];
      while (index < endIndex) {
        children.push(this.childString(index));
        index = this.buffer[index + 3];
      }
      return result + "(" + children.join(",") + ")";
    }
    /**
    @internal
    */
    findChild(startIndex, endIndex, dir, pos, side) {
      let { buffer } = this, pick = -1;
      for (let i = startIndex; i != endIndex; i = buffer[i + 3]) {
        if (checkSide(side, pos, buffer[i + 1], buffer[i + 2])) {
          pick = i;
          if (dir > 0)
            break;
        }
      }
      return pick;
    }
    /**
    @internal
    */
    slice(startI, endI, from) {
      let b = this.buffer;
      let copy = new Uint16Array(endI - startI), len = 0;
      for (let i = startI, j = 0; i < endI; ) {
        copy[j++] = b[i++];
        copy[j++] = b[i++] - from;
        let to = copy[j++] = b[i++] - from;
        copy[j++] = b[i++] - startI;
        len = Math.max(len, to);
      }
      return new _TreeBuffer(copy, len, this.set);
    }
  };
  function checkSide(side, pos, from, to) {
    switch (side) {
      case -2:
        return from < pos;
      case -1:
        return to >= pos && from < pos;
      case 0:
        return from < pos && to > pos;
      case 1:
        return from <= pos && to > pos;
      case 2:
        return to > pos;
      case 4:
        return true;
    }
  }
  function resolveNode(node, pos, side, overlays) {
    var _a;
    while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
      let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
      if (!parent)
        return node;
      node = parent;
    }
    let mode = overlays ? 0 : IterMode.IgnoreOverlays;
    if (overlays)
      for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) {
        if (scan instanceof TreeNode && scan.index < 0 && ((_a = parent.enter(pos, side, mode)) === null || _a === void 0 ? void 0 : _a.from) != scan.from)
          node = parent;
      }
    for (; ; ) {
      let inner = node.enter(pos, side, mode);
      if (!inner)
        return node;
      node = inner;
    }
  }
  var BaseNode = class {
    cursor(mode = 0) {
      return new TreeCursor(this, mode);
    }
    getChild(type, before = null, after = null) {
      let r = getChildren(this, type, before, after);
      return r.length ? r[0] : null;
    }
    getChildren(type, before = null, after = null) {
      return getChildren(this, type, before, after);
    }
    resolve(pos, side = 0) {
      return resolveNode(this, pos, side, false);
    }
    resolveInner(pos, side = 0) {
      return resolveNode(this, pos, side, true);
    }
    matchContext(context) {
      return matchNodeContext(this.parent, context);
    }
    enterUnfinishedNodesBefore(pos) {
      let scan = this.childBefore(pos), node = this;
      while (scan) {
        let last = scan.lastChild;
        if (!last || last.to != scan.to)
          break;
        if (last.type.isError && last.from == last.to) {
          node = scan;
          scan = last.prevSibling;
        } else {
          scan = last;
        }
      }
      return node;
    }
    get node() {
      return this;
    }
    get next() {
      return this.parent;
    }
  };
  var TreeNode = class _TreeNode extends BaseNode {
    constructor(_tree, from, index, _parent) {
      super();
      this._tree = _tree;
      this.from = from;
      this.index = index;
      this._parent = _parent;
    }
    get type() {
      return this._tree.type;
    }
    get name() {
      return this._tree.type.name;
    }
    get to() {
      return this.from + this._tree.length;
    }
    nextChild(i, dir, pos, side, mode = 0) {
      for (let parent = this; ; ) {
        for (let { children, positions } = parent._tree, e = dir > 0 ? children.length : -1; i != e; i += dir) {
          let next = children[i], start = positions[i] + parent.from;
          if (!checkSide(side, pos, start, start + next.length))
            continue;
          if (next instanceof TreeBuffer) {
            if (mode & IterMode.ExcludeBuffers)
              continue;
            let index = next.findChild(0, next.buffer.length, dir, pos - start, side);
            if (index > -1)
              return new BufferNode(new BufferContext(parent, next, i, start), null, index);
          } else if (mode & IterMode.IncludeAnonymous || (!next.type.isAnonymous || hasChild(next))) {
            let mounted;
            if (!(mode & IterMode.IgnoreMounts) && (mounted = MountedTree.get(next)) && !mounted.overlay)
              return new _TreeNode(mounted.tree, start, i, parent);
            let inner = new _TreeNode(next, start, i, parent);
            return mode & IterMode.IncludeAnonymous || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side);
          }
        }
        if (mode & IterMode.IncludeAnonymous || !parent.type.isAnonymous)
          return null;
        if (parent.index >= 0)
          i = parent.index + dir;
        else
          i = dir < 0 ? -1 : parent._parent._tree.children.length;
        parent = parent._parent;
        if (!parent)
          return null;
      }
    }
    get firstChild() {
      return this.nextChild(
        0,
        1,
        0,
        4
        /* Side.DontCare */
      );
    }
    get lastChild() {
      return this.nextChild(
        this._tree.children.length - 1,
        -1,
        0,
        4
        /* Side.DontCare */
      );
    }
    childAfter(pos) {
      return this.nextChild(
        0,
        1,
        pos,
        2
        /* Side.After */
      );
    }
    childBefore(pos) {
      return this.nextChild(
        this._tree.children.length - 1,
        -1,
        pos,
        -2
        /* Side.Before */
      );
    }
    enter(pos, side, mode = 0) {
      let mounted;
      if (!(mode & IterMode.IgnoreOverlays) && (mounted = MountedTree.get(this._tree)) && mounted.overlay) {
        let rPos = pos - this.from;
        for (let { from, to } of mounted.overlay) {
          if ((side > 0 ? from <= rPos : from < rPos) && (side < 0 ? to >= rPos : to > rPos))
            return new _TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
        }
      }
      return this.nextChild(0, 1, pos, side, mode);
    }
    nextSignificantParent() {
      let val = this;
      while (val.type.isAnonymous && val._parent)
        val = val._parent;
      return val;
    }
    get parent() {
      return this._parent ? this._parent.nextSignificantParent() : null;
    }
    get nextSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(
        this.index + 1,
        1,
        0,
        4
        /* Side.DontCare */
      ) : null;
    }
    get prevSibling() {
      return this._parent && this.index >= 0 ? this._parent.nextChild(
        this.index - 1,
        -1,
        0,
        4
        /* Side.DontCare */
      ) : null;
    }
    get tree() {
      return this._tree;
    }
    toTree() {
      return this._tree;
    }
    /**
    @internal
    */
    toString() {
      return this._tree.toString();
    }
  };
  function getChildren(node, type, before, after) {
    let cur = node.cursor(), result = [];
    if (!cur.firstChild())
      return result;
    if (before != null)
      for (let found = false; !found; ) {
        found = cur.type.is(before);
        if (!cur.nextSibling())
          return result;
      }
    for (; ; ) {
      if (after != null && cur.type.is(after))
        return result;
      if (cur.type.is(type))
        result.push(cur.node);
      if (!cur.nextSibling())
        return after == null ? result : [];
    }
  }
  function matchNodeContext(node, context, i = context.length - 1) {
    for (let p2 = node; i >= 0; p2 = p2.parent) {
      if (!p2)
        return false;
      if (!p2.type.isAnonymous) {
        if (context[i] && context[i] != p2.name)
          return false;
        i--;
      }
    }
    return true;
  }
  var BufferContext = class {
    constructor(parent, buffer, index, start) {
      this.parent = parent;
      this.buffer = buffer;
      this.index = index;
      this.start = start;
    }
  };
  var BufferNode = class _BufferNode extends BaseNode {
    get name() {
      return this.type.name;
    }
    get from() {
      return this.context.start + this.context.buffer.buffer[this.index + 1];
    }
    get to() {
      return this.context.start + this.context.buffer.buffer[this.index + 2];
    }
    constructor(context, _parent, index) {
      super();
      this.context = context;
      this._parent = _parent;
      this.index = index;
      this.type = context.buffer.set.types[context.buffer.buffer[index]];
    }
    child(dir, pos, side) {
      let { buffer } = this.context;
      let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
      return index < 0 ? null : new _BufferNode(this.context, this, index);
    }
    get firstChild() {
      return this.child(
        1,
        0,
        4
        /* Side.DontCare */
      );
    }
    get lastChild() {
      return this.child(
        -1,
        0,
        4
        /* Side.DontCare */
      );
    }
    childAfter(pos) {
      return this.child(
        1,
        pos,
        2
        /* Side.After */
      );
    }
    childBefore(pos) {
      return this.child(
        -1,
        pos,
        -2
        /* Side.Before */
      );
    }
    enter(pos, side, mode = 0) {
      if (mode & IterMode.ExcludeBuffers)
        return null;
      let { buffer } = this.context;
      let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
      return index < 0 ? null : new _BufferNode(this.context, this, index);
    }
    get parent() {
      return this._parent || this.context.parent.nextSignificantParent();
    }
    externalSibling(dir) {
      return this._parent ? null : this.context.parent.nextChild(
        this.context.index + dir,
        dir,
        0,
        4
        /* Side.DontCare */
      );
    }
    get nextSibling() {
      let { buffer } = this.context;
      let after = buffer.buffer[this.index + 3];
      if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
        return new _BufferNode(this.context, this._parent, after);
      return this.externalSibling(1);
    }
    get prevSibling() {
      let { buffer } = this.context;
      let parentStart = this._parent ? this._parent.index + 4 : 0;
      if (this.index == parentStart)
        return this.externalSibling(-1);
      return new _BufferNode(this.context, this._parent, buffer.findChild(
        parentStart,
        this.index,
        -1,
        0,
        4
        /* Side.DontCare */
      ));
    }
    get tree() {
      return null;
    }
    toTree() {
      let children = [], positions = [];
      let { buffer } = this.context;
      let startI = this.index + 4, endI = buffer.buffer[this.index + 3];
      if (endI > startI) {
        let from = buffer.buffer[this.index + 1];
        children.push(buffer.slice(startI, endI, from));
        positions.push(0);
      }
      return new Tree(this.type, children, positions, this.to - this.from);
    }
    /**
    @internal
    */
    toString() {
      return this.context.buffer.childString(this.index);
    }
  };
  function iterStack(heads) {
    if (!heads.length)
      return null;
    let pick = 0, picked = heads[0];
    for (let i = 1; i < heads.length; i++) {
      let node = heads[i];
      if (node.from > picked.from || node.to < picked.to) {
        picked = node;
        pick = i;
      }
    }
    let next = picked instanceof TreeNode && picked.index < 0 ? null : picked.parent;
    let newHeads = heads.slice();
    if (next)
      newHeads[pick] = next;
    else
      newHeads.splice(pick, 1);
    return new StackIterator(newHeads, picked);
  }
  var StackIterator = class {
    constructor(heads, node) {
      this.heads = heads;
      this.node = node;
    }
    get next() {
      return iterStack(this.heads);
    }
  };
  function stackIterator(tree, pos, side) {
    let inner = tree.resolveInner(pos, side), layers = null;
    for (let scan = inner instanceof TreeNode ? inner : inner.context.parent; scan; scan = scan.parent) {
      if (scan.index < 0) {
        let parent = scan.parent;
        (layers || (layers = [inner])).push(parent.resolve(pos, side));
        scan = parent;
      } else {
        let mount = MountedTree.get(scan.tree);
        if (mount && mount.overlay && mount.overlay[0].from <= pos && mount.overlay[mount.overlay.length - 1].to >= pos) {
          let root = new TreeNode(mount.tree, mount.overlay[0].from + scan.from, -1, scan);
          (layers || (layers = [inner])).push(resolveNode(root, pos, side, false));
        }
      }
    }
    return layers ? iterStack(layers) : inner;
  }
  var TreeCursor = class {
    /**
    Shorthand for \`.type.name\`.
    */
    get name() {
      return this.type.name;
    }
    /**
    @internal
    */
    constructor(node, mode = 0) {
      this.mode = mode;
      this.buffer = null;
      this.stack = [];
      this.index = 0;
      this.bufferNode = null;
      if (node instanceof TreeNode) {
        this.yieldNode(node);
      } else {
        this._tree = node.context.parent;
        this.buffer = node.context;
        for (let n = node._parent; n; n = n._parent)
          this.stack.unshift(n.index);
        this.bufferNode = node;
        this.yieldBuf(node.index);
      }
    }
    yieldNode(node) {
      if (!node)
        return false;
      this._tree = node;
      this.type = node.type;
      this.from = node.from;
      this.to = node.to;
      return true;
    }
    yieldBuf(index, type) {
      this.index = index;
      let { start, buffer } = this.buffer;
      this.type = type || buffer.set.types[buffer.buffer[index]];
      this.from = start + buffer.buffer[index + 1];
      this.to = start + buffer.buffer[index + 2];
      return true;
    }
    /**
    @internal
    */
    yield(node) {
      if (!node)
        return false;
      if (node instanceof TreeNode) {
        this.buffer = null;
        return this.yieldNode(node);
      }
      this.buffer = node.context;
      return this.yieldBuf(node.index, node.type);
    }
    /**
    @internal
    */
    toString() {
      return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
    }
    /**
    @internal
    */
    enterChild(dir, pos, side) {
      if (!this.buffer)
        return this.yield(this._tree.nextChild(dir < 0 ? this._tree._tree.children.length - 1 : 0, dir, pos, side, this.mode));
      let { buffer } = this.buffer;
      let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
      if (index < 0)
        return false;
      this.stack.push(this.index);
      return this.yieldBuf(index);
    }
    /**
    Move the cursor to this node's first child. When this returns
    false, the node has no child, and the cursor has not been moved.
    */
    firstChild() {
      return this.enterChild(
        1,
        0,
        4
        /* Side.DontCare */
      );
    }
    /**
    Move the cursor to this node's last child.
    */
    lastChild() {
      return this.enterChild(
        -1,
        0,
        4
        /* Side.DontCare */
      );
    }
    /**
    Move the cursor to the first child that ends after \`pos\`.
    */
    childAfter(pos) {
      return this.enterChild(
        1,
        pos,
        2
        /* Side.After */
      );
    }
    /**
    Move to the last child that starts before \`pos\`.
    */
    childBefore(pos) {
      return this.enterChild(
        -1,
        pos,
        -2
        /* Side.Before */
      );
    }
    /**
    Move the cursor to the child around \`pos\`. If side is -1 the
    child may end at that position, when 1 it may start there. This
    will also enter [overlaid](#common.MountedTree.overlay)
    [mounted](#common.NodeProp^mounted) trees unless \`overlays\` is
    set to false.
    */
    enter(pos, side, mode = this.mode) {
      if (!this.buffer)
        return this.yield(this._tree.enter(pos, side, mode));
      return mode & IterMode.ExcludeBuffers ? false : this.enterChild(1, pos, side);
    }
    /**
    Move to the node's parent node, if this isn't the top node.
    */
    parent() {
      if (!this.buffer)
        return this.yieldNode(this.mode & IterMode.IncludeAnonymous ? this._tree._parent : this._tree.parent);
      if (this.stack.length)
        return this.yieldBuf(this.stack.pop());
      let parent = this.mode & IterMode.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
      this.buffer = null;
      return this.yieldNode(parent);
    }
    /**
    @internal
    */
    sibling(dir) {
      if (!this.buffer)
        return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
      let { buffer } = this.buffer, d = this.stack.length - 1;
      if (dir < 0) {
        let parentStart = d < 0 ? 0 : this.stack[d] + 4;
        if (this.index != parentStart)
          return this.yieldBuf(buffer.findChild(
            parentStart,
            this.index,
            -1,
            0,
            4
            /* Side.DontCare */
          ));
      } else {
        let after = buffer.buffer[this.index + 3];
        if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
          return this.yieldBuf(after);
      }
      return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
    }
    /**
    Move to this node's next sibling, if any.
    */
    nextSibling() {
      return this.sibling(1);
    }
    /**
    Move to this node's previous sibling, if any.
    */
    prevSibling() {
      return this.sibling(-1);
    }
    atLastNode(dir) {
      let index, parent, { buffer } = this;
      if (buffer) {
        if (dir > 0) {
          if (this.index < buffer.buffer.buffer.length)
            return false;
        } else {
          for (let i = 0; i < this.index; i++)
            if (buffer.buffer.buffer[i + 3] < this.index)
              return false;
        }
        ({ index, parent } = buffer);
      } else {
        ({ index, _parent: parent } = this._tree);
      }
      for (; parent; { index, _parent: parent } = parent) {
        if (index > -1)
          for (let i = index + dir, e = dir < 0 ? -1 : parent._tree.children.length; i != e; i += dir) {
            let child = parent._tree.children[i];
            if (this.mode & IterMode.IncludeAnonymous || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child))
              return false;
          }
      }
      return true;
    }
    move(dir, enter) {
      if (enter && this.enterChild(
        dir,
        0,
        4
        /* Side.DontCare */
      ))
        return true;
      for (; ; ) {
        if (this.sibling(dir))
          return true;
        if (this.atLastNode(dir) || !this.parent())
          return false;
      }
    }
    /**
    Move to the next node in a
    [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
    traversal, going from a node to its first child or, if the
    current node is empty or \`enter\` is false, its next sibling or
    the next sibling of the first parent node that has one.
    */
    next(enter = true) {
      return this.move(1, enter);
    }
    /**
    Move to the next node in a last-to-first pre-order traversal. A
    node is followed by its last child or, if it has none, its
    previous sibling or the previous sibling of the first parent
    node that has one.
    */
    prev(enter = true) {
      return this.move(-1, enter);
    }
    /**
    Move the cursor to the innermost node that covers \`pos\`. If
    \`side\` is -1, it will enter nodes that end at \`pos\`. If it is 1,
    it will enter nodes that start at \`pos\`.
    */
    moveTo(pos, side = 0) {
      while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos))
        if (!this.parent())
          break;
      while (this.enterChild(1, pos, side)) {
      }
      return this;
    }
    /**
    Get a [syntax node](#common.SyntaxNode) at the cursor's current
    position.
    */
    get node() {
      if (!this.buffer)
        return this._tree;
      let cache = this.bufferNode, result = null, depth = 0;
      if (cache && cache.context == this.buffer) {
        scan: for (let index = this.index, d = this.stack.length; d >= 0; ) {
          for (let c = cache; c; c = c._parent)
            if (c.index == index) {
              if (index == this.index)
                return c;
              result = c;
              depth = d + 1;
              break scan;
            }
          index = this.stack[--d];
        }
      }
      for (let i = depth; i < this.stack.length; i++)
        result = new BufferNode(this.buffer, result, this.stack[i]);
      return this.bufferNode = new BufferNode(this.buffer, result, this.index);
    }
    /**
    Get the [tree](#common.Tree) that represents the current node, if
    any. Will return null when the node is in a [tree
    buffer](#common.TreeBuffer).
    */
    get tree() {
      return this.buffer ? null : this._tree._tree;
    }
    /**
    Iterate over the current node and all its descendants, calling
    \`enter\` when entering a node and \`leave\`, if given, when leaving
    one. When \`enter\` returns \`false\`, any children of that node are
    skipped, and \`leave\` isn't called for it.
    */
    iterate(enter, leave) {
      for (let depth = 0; ; ) {
        let mustLeave = false;
        if (this.type.isAnonymous || enter(this) !== false) {
          if (this.firstChild()) {
            depth++;
            continue;
          }
          if (!this.type.isAnonymous)
            mustLeave = true;
        }
        for (; ; ) {
          if (mustLeave && leave)
            leave(this);
          mustLeave = this.type.isAnonymous;
          if (!depth)
            return;
          if (this.nextSibling())
            break;
          this.parent();
          depth--;
          mustLeave = true;
        }
      }
    }
    /**
    Test whether the current node matches a given context\u2014a sequence
    of direct parent node names. Empty strings in the context array
    are treated as wildcards.
    */
    matchContext(context) {
      if (!this.buffer)
        return matchNodeContext(this.node.parent, context);
      let { buffer } = this.buffer, { types } = buffer.set;
      for (let i = context.length - 1, d = this.stack.length - 1; i >= 0; d--) {
        if (d < 0)
          return matchNodeContext(this._tree, context, i);
        let type = types[buffer.buffer[this.stack[d]]];
        if (!type.isAnonymous) {
          if (context[i] && context[i] != type.name)
            return false;
          i--;
        }
      }
      return true;
    }
  };
  function hasChild(tree) {
    return tree.children.some((ch) => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
  }
  function buildTree(data) {
    var _a;
    let { buffer, nodeSet, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length } = data;
    let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
    let types = nodeSet.types;
    let contextHash = 0, lookAhead = 0;
    function takeNode(parentStart, minPos, children2, positions2, inRepeat, depth) {
      let { id, start, end, size } = cursor;
      let lookAheadAtStart = lookAhead, contextAtStart = contextHash;
      while (size < 0) {
        cursor.next();
        if (size == -1) {
          let node2 = reused[id];
          children2.push(node2);
          positions2.push(start - parentStart);
          return;
        } else if (size == -3) {
          contextHash = id;
          return;
        } else if (size == -4) {
          lookAhead = id;
          return;
        } else {
          throw new RangeError(\`Unrecognized record size: \${size}\`);
        }
      }
      let type = types[id], node, buffer2;
      let startPos = start - parentStart;
      if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
        let data2 = new Uint16Array(buffer2.size - buffer2.skip);
        let endPos = cursor.pos - buffer2.size, index = data2.length;
        while (cursor.pos > endPos)
          index = copyToBuffer(buffer2.start, data2, index);
        node = new TreeBuffer(data2, end - buffer2.start, nodeSet);
        startPos = buffer2.start - parentStart;
      } else {
        let endPos = cursor.pos - size;
        cursor.next();
        let localChildren = [], localPositions = [];
        let localInRepeat = id >= minRepeatType ? id : -1;
        let lastGroup = 0, lastEnd = end;
        while (cursor.pos > endPos) {
          if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
            if (cursor.end <= lastEnd - maxBufferLength) {
              makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
              lastGroup = localChildren.length;
              lastEnd = cursor.end;
            }
            cursor.next();
          } else if (depth > 2500) {
            takeFlatNode(start, endPos, localChildren, localPositions);
          } else {
            takeNode(start, endPos, localChildren, localPositions, localInRepeat, depth + 1);
          }
        }
        if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length)
          makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
        localChildren.reverse();
        localPositions.reverse();
        if (localInRepeat > -1 && lastGroup > 0) {
          let make = makeBalanced(type, contextAtStart);
          node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
        } else {
          node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end, contextAtStart);
        }
      }
      children2.push(node);
      positions2.push(startPos);
    }
    function takeFlatNode(parentStart, minPos, children2, positions2) {
      let nodes = [];
      let nodeCount = 0, stopAt = -1;
      while (cursor.pos > minPos) {
        let { id, start, end, size } = cursor;
        if (size > 4) {
          cursor.next();
        } else if (stopAt > -1 && start < stopAt) {
          break;
        } else {
          if (stopAt < 0)
            stopAt = end - maxBufferLength;
          nodes.push(id, start, end);
          nodeCount++;
          cursor.next();
        }
      }
      if (nodeCount) {
        let buffer2 = new Uint16Array(nodeCount * 4);
        let start = nodes[nodes.length - 2];
        for (let i = nodes.length - 3, j = 0; i >= 0; i -= 3) {
          buffer2[j++] = nodes[i];
          buffer2[j++] = nodes[i + 1] - start;
          buffer2[j++] = nodes[i + 2] - start;
          buffer2[j++] = j;
        }
        children2.push(new TreeBuffer(buffer2, nodes[2] - start, nodeSet));
        positions2.push(start - parentStart);
      }
    }
    function makeBalanced(type, contextHash2) {
      return (children2, positions2, length2) => {
        let lookAhead2 = 0, lastI = children2.length - 1, last, lookAheadProp;
        if (lastI >= 0 && (last = children2[lastI]) instanceof Tree) {
          if (!lastI && last.type == type && last.length == length2)
            return last;
          if (lookAheadProp = last.prop(NodeProp.lookAhead))
            lookAhead2 = positions2[lastI] + last.length + lookAheadProp;
        }
        return makeTree(type, children2, positions2, length2, lookAhead2, contextHash2);
      };
    }
    function makeRepeatLeaf(children2, positions2, base, i, from, to, type, lookAhead2, contextHash2) {
      let localChildren = [], localPositions = [];
      while (children2.length > i) {
        localChildren.push(children2.pop());
        localPositions.push(positions2.pop() + base - from);
      }
      children2.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead2 - to, contextHash2));
      positions2.push(from - base);
    }
    function makeTree(type, children2, positions2, length2, lookAhead2, contextHash2, props) {
      if (contextHash2) {
        let pair2 = [NodeProp.contextHash, contextHash2];
        props = props ? [pair2].concat(props) : [pair2];
      }
      if (lookAhead2 > 25) {
        let pair2 = [NodeProp.lookAhead, lookAhead2];
        props = props ? [pair2].concat(props) : [pair2];
      }
      return new Tree(type, children2, positions2, length2, props);
    }
    function findBufferSize(maxSize, inRepeat) {
      let fork = cursor.fork();
      let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
      let result = { size: 0, start: 0, skip: 0 };
      scan: for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
        let nodeSize2 = fork.size;
        if (fork.id == inRepeat && nodeSize2 >= 0) {
          result.size = size;
          result.start = start;
          result.skip = skip;
          skip += 4;
          size += 4;
          fork.next();
          continue;
        }
        let startPos = fork.pos - nodeSize2;
        if (nodeSize2 < 0 || startPos < minPos || fork.start < minStart)
          break;
        let localSkipped = fork.id >= minRepeatType ? 4 : 0;
        let nodeStart = fork.start;
        fork.next();
        while (fork.pos > startPos) {
          if (fork.size < 0) {
            if (fork.size == -3)
              localSkipped += 4;
            else
              break scan;
          } else if (fork.id >= minRepeatType) {
            localSkipped += 4;
          }
          fork.next();
        }
        start = nodeStart;
        size += nodeSize2;
        skip += localSkipped;
      }
      if (inRepeat < 0 || size == maxSize) {
        result.size = size;
        result.start = start;
        result.skip = skip;
      }
      return result.size > 4 ? result : void 0;
    }
    function copyToBuffer(bufferStart, buffer2, index) {
      let { id, start, end, size } = cursor;
      cursor.next();
      if (size >= 0 && id < minRepeatType) {
        let startIndex = index;
        if (size > 4) {
          let endPos = cursor.pos - (size - 4);
          while (cursor.pos > endPos)
            index = copyToBuffer(bufferStart, buffer2, index);
        }
        buffer2[--index] = startIndex;
        buffer2[--index] = end - bufferStart;
        buffer2[--index] = start - bufferStart;
        buffer2[--index] = id;
      } else if (size == -3) {
        contextHash = id;
      } else if (size == -4) {
        lookAhead = id;
      }
      return index;
    }
    let children = [], positions = [];
    while (cursor.pos > 0)
      takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1, 0);
    let length = (_a = data.length) !== null && _a !== void 0 ? _a : children.length ? positions[0] + children[0].length : 0;
    return new Tree(types[data.topID], children.reverse(), positions.reverse(), length);
  }
  var nodeSizeCache = /* @__PURE__ */ new WeakMap();
  function nodeSize(balanceType, node) {
    if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType)
      return 1;
    let size = nodeSizeCache.get(node);
    if (size == null) {
      size = 1;
      for (let child of node.children) {
        if (child.type != balanceType || !(child instanceof Tree)) {
          size = 1;
          break;
        }
        size += nodeSize(balanceType, child);
      }
      nodeSizeCache.set(node, size);
    }
    return size;
  }
  function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
    let total = 0;
    for (let i = from; i < to; i++)
      total += nodeSize(balanceType, children[i]);
    let maxChild = Math.ceil(
      total * 1.5 / 8
      /* Balance.BranchFactor */
    );
    let localChildren = [], localPositions = [];
    function divide(children2, positions2, from2, to2, offset) {
      for (let i = from2; i < to2; ) {
        let groupFrom = i, groupStart = positions2[i], groupSize = nodeSize(balanceType, children2[i]);
        i++;
        for (; i < to2; i++) {
          let nextSize = nodeSize(balanceType, children2[i]);
          if (groupSize + nextSize >= maxChild)
            break;
          groupSize += nextSize;
        }
        if (i == groupFrom + 1) {
          if (groupSize > maxChild) {
            let only = children2[groupFrom];
            divide(only.children, only.positions, 0, only.children.length, positions2[groupFrom] + offset);
            continue;
          }
          localChildren.push(children2[groupFrom]);
        } else {
          let length2 = positions2[i - 1] + children2[i - 1].length - groupStart;
          localChildren.push(balanceRange(balanceType, children2, positions2, groupFrom, i, groupStart, length2, null, mkTree));
        }
        localPositions.push(groupStart + offset - start);
      }
    }
    divide(children, positions, from, to, 0);
    return (mkTop || mkTree)(localChildren, localPositions, length);
  }
  var Parser = class {
    /**
    Start a parse, returning a [partial parse](#common.PartialParse)
    object. [\`fragments\`](#common.TreeFragment) can be passed in to
    make the parse incremental.
    
    By default, the entire input is parsed. You can pass \`ranges\`,
    which should be a sorted array of non-empty, non-overlapping
    ranges, to parse only those ranges. The tree returned in that
    case will start at \`ranges[0].from\`.
    */
    startParse(input, fragments, ranges) {
      if (typeof input == "string")
        input = new StringInput(input);
      ranges = !ranges ? [new Range(0, input.length)] : ranges.length ? ranges.map((r) => new Range(r.from, r.to)) : [new Range(0, 0)];
      return this.createParse(input, fragments || [], ranges);
    }
    /**
    Run a full parse, returning the resulting tree.
    */
    parse(input, fragments, ranges) {
      let parse = this.startParse(input, fragments, ranges);
      for (; ; ) {
        let done = parse.advance();
        if (done)
          return done;
      }
    }
  };
  var StringInput = class {
    constructor(string) {
      this.string = string;
    }
    get length() {
      return this.string.length;
    }
    chunk(from) {
      return this.string.slice(from);
    }
    get lineChunks() {
      return false;
    }
    read(from, to) {
      return this.string.slice(from, to);
    }
  };
  var stoppedInner = new NodeProp({ perNode: true });

  // node_modules/@lezer/lr/dist/index.js
  var Stack = class _Stack {
    /**
    @internal
    */
    constructor(p2, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
      this.p = p2;
      this.stack = stack;
      this.state = state;
      this.reducePos = reducePos;
      this.pos = pos;
      this.score = score;
      this.buffer = buffer;
      this.bufferBase = bufferBase;
      this.curContext = curContext;
      this.lookAhead = lookAhead;
      this.parent = parent;
    }
    /**
    @internal
    */
    toString() {
      return \`[\${this.stack.filter((_, i) => i % 3 == 0).concat(this.state)}]@\${this.pos}\${this.score ? "!" + this.score : ""}\`;
    }
    // Start an empty stack
    /**
    @internal
    */
    static start(p2, state, pos = 0) {
      let cx = p2.parser.context;
      return new _Stack(p2, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
    }
    /**
    The stack's current [context](#lr.ContextTracker) value, if
    any. Its type will depend on the context tracker's type
    parameter, or it will be \`null\` if there is no context
    tracker.
    */
    get context() {
      return this.curContext ? this.curContext.context : null;
    }
    // Push a state onto the stack, tracking its start position as well
    // as the buffer base at that point.
    /**
    @internal
    */
    pushState(state, start) {
      this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
      this.state = state;
    }
    // Apply a reduce action
    /**
    @internal
    */
    reduce(action) {
      var _a;
      let depth = action >> 19, type = action & 65535;
      let { parser } = this.p;
      let lookaheadRecord = this.reducePos < this.pos - 25;
      if (lookaheadRecord)
        this.setLookAhead(this.pos);
      let dPrec = parser.dynamicPrecedence(type);
      if (dPrec)
        this.score += dPrec;
      if (depth == 0) {
        this.pushState(parser.getGoto(this.state, type, true), this.reducePos);
        if (type < parser.minRepeatTerm)
          this.storeNode(type, this.reducePos, this.reducePos, lookaheadRecord ? 8 : 4, true);
        this.reduceContext(type, this.reducePos);
        return;
      }
      let base = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
      let start = base ? this.stack[base - 2] : this.p.ranges[0].from, size = this.reducePos - start;
      if (size >= 2e3 && !((_a = this.p.parser.nodeSet.types[type]) === null || _a === void 0 ? void 0 : _a.isAnonymous)) {
        if (start == this.p.lastBigReductionStart) {
          this.p.bigReductionCount++;
          this.p.lastBigReductionSize = size;
        } else if (this.p.lastBigReductionSize < size) {
          this.p.bigReductionCount = 1;
          this.p.lastBigReductionStart = start;
          this.p.lastBigReductionSize = size;
        }
      }
      let bufferBase = base ? this.stack[base - 1] : 0, count = this.bufferBase + this.buffer.length - bufferBase;
      if (type < parser.minRepeatTerm || action & 131072) {
        let pos = parser.stateFlag(
          this.state,
          1
          /* StateFlag.Skipped */
        ) ? this.pos : this.reducePos;
        this.storeNode(type, start, pos, count + 4, true);
      }
      if (action & 262144) {
        this.state = this.stack[base];
      } else {
        let baseStateID = this.stack[base - 3];
        this.state = parser.getGoto(baseStateID, type, true);
      }
      while (this.stack.length > base)
        this.stack.pop();
      this.reduceContext(type, start);
    }
    // Shift a value into the buffer
    /**
    @internal
    */
    storeNode(term, start, end, size = 4, mustSink = false) {
      if (term == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
        let cur = this, top = this.buffer.length;
        if (top == 0 && cur.parent) {
          top = cur.bufferBase - cur.parent.bufferBase;
          cur = cur.parent;
        }
        if (top > 0 && cur.buffer[top - 4] == 0 && cur.buffer[top - 1] > -1) {
          if (start == end)
            return;
          if (cur.buffer[top - 2] >= start) {
            cur.buffer[top - 2] = end;
            return;
          }
        }
      }
      if (!mustSink || this.pos == end) {
        this.buffer.push(term, start, end, size);
      } else {
        let index = this.buffer.length;
        if (index > 0 && this.buffer[index - 4] != 0) {
          let mustMove = false;
          for (let scan = index; scan > 0 && this.buffer[scan - 2] > end; scan -= 4) {
            if (this.buffer[scan - 1] >= 0) {
              mustMove = true;
              break;
            }
          }
          if (mustMove)
            while (index > 0 && this.buffer[index - 2] > end) {
              this.buffer[index] = this.buffer[index - 4];
              this.buffer[index + 1] = this.buffer[index - 3];
              this.buffer[index + 2] = this.buffer[index - 2];
              this.buffer[index + 3] = this.buffer[index - 1];
              index -= 4;
              if (size > 4)
                size -= 4;
            }
        }
        this.buffer[index] = term;
        this.buffer[index + 1] = start;
        this.buffer[index + 2] = end;
        this.buffer[index + 3] = size;
      }
    }
    // Apply a shift action
    /**
    @internal
    */
    shift(action, type, start, end) {
      if (action & 131072) {
        this.pushState(action & 65535, this.pos);
      } else if ((action & 262144) == 0) {
        let nextState = action, { parser } = this.p;
        if (end > this.pos || type <= parser.maxNode) {
          this.pos = end;
          if (!parser.stateFlag(
            nextState,
            1
            /* StateFlag.Skipped */
          ))
            this.reducePos = end;
        }
        this.pushState(nextState, start);
        this.shiftContext(type, start);
        if (type <= parser.maxNode)
          this.buffer.push(type, start, end, 4);
      } else {
        this.pos = end;
        this.shiftContext(type, start);
        if (type <= this.p.parser.maxNode)
          this.buffer.push(type, start, end, 4);
      }
    }
    // Apply an action
    /**
    @internal
    */
    apply(action, next, nextStart, nextEnd) {
      if (action & 65536)
        this.reduce(action);
      else
        this.shift(action, next, nextStart, nextEnd);
    }
    // Add a prebuilt (reused) node into the buffer.
    /**
    @internal
    */
    useNode(value, next) {
      let index = this.p.reused.length - 1;
      if (index < 0 || this.p.reused[index] != value) {
        this.p.reused.push(value);
        index++;
      }
      let start = this.pos;
      this.reducePos = this.pos = start + value.length;
      this.pushState(next, start);
      this.buffer.push(
        index,
        start,
        this.reducePos,
        -1
        /* size == -1 means this is a reused value */
      );
      if (this.curContext)
        this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
    }
    // Split the stack. Due to the buffer sharing and the fact
    // that \`this.stack\` tends to stay quite shallow, this isn't very
    // expensive.
    /**
    @internal
    */
    split() {
      let parent = this;
      let off = parent.buffer.length;
      while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
        off -= 4;
      let buffer = parent.buffer.slice(off), base = parent.bufferBase + off;
      while (parent && base == parent.bufferBase)
        parent = parent.parent;
      return new _Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base, this.curContext, this.lookAhead, parent);
    }
    // Try to recover from an error by 'deleting' (ignoring) one token.
    /**
    @internal
    */
    recoverByDelete(next, nextEnd) {
      let isNode = next <= this.p.parser.maxNode;
      if (isNode)
        this.storeNode(next, this.pos, nextEnd, 4);
      this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
      this.pos = this.reducePos = nextEnd;
      this.score -= 190;
    }
    /**
    Check if the given term would be able to be shifted (optionally
    after some reductions) on this stack. This can be useful for
    external tokenizers that want to make sure they only provide a
    given token when it applies.
    */
    canShift(term) {
      for (let sim = new SimulatedStack(this); ; ) {
        let action = this.p.parser.stateSlot(
          sim.state,
          4
          /* ParseState.DefaultReduce */
        ) || this.p.parser.hasAction(sim.state, term);
        if (action == 0)
          return false;
        if ((action & 65536) == 0)
          return true;
        sim.reduce(action);
      }
    }
    // Apply up to Recover.MaxNext recovery actions that conceptually
    // inserts some missing token or rule.
    /**
    @internal
    */
    recoverByInsert(next) {
      if (this.stack.length >= 300)
        return [];
      let nextStates = this.p.parser.nextStates(this.state);
      if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
        let best = [];
        for (let i = 0, s; i < nextStates.length; i += 2) {
          if ((s = nextStates[i + 1]) != this.state && this.p.parser.hasAction(s, next))
            best.push(nextStates[i], s);
        }
        if (this.stack.length < 120)
          for (let i = 0; best.length < 4 << 1 && i < nextStates.length; i += 2) {
            let s = nextStates[i + 1];
            if (!best.some((v, i2) => i2 & 1 && v == s))
              best.push(nextStates[i], s);
          }
        nextStates = best;
      }
      let result = [];
      for (let i = 0; i < nextStates.length && result.length < 4; i += 2) {
        let s = nextStates[i + 1];
        if (s == this.state)
          continue;
        let stack = this.split();
        stack.pushState(s, this.pos);
        stack.storeNode(0, stack.pos, stack.pos, 4, true);
        stack.shiftContext(nextStates[i], this.pos);
        stack.reducePos = this.pos;
        stack.score -= 200;
        result.push(stack);
      }
      return result;
    }
    // Force a reduce, if possible. Return false if that can't
    // be done.
    /**
    @internal
    */
    forceReduce() {
      let { parser } = this.p;
      let reduce = parser.stateSlot(
        this.state,
        5
        /* ParseState.ForcedReduce */
      );
      if ((reduce & 65536) == 0)
        return false;
      if (!parser.validAction(this.state, reduce)) {
        let depth = reduce >> 19, term = reduce & 65535;
        let target = this.stack.length - depth * 3;
        if (target < 0 || parser.getGoto(this.stack[target], term, false) < 0) {
          let backup = this.findForcedReduction();
          if (backup == null)
            return false;
          reduce = backup;
        }
        this.storeNode(0, this.pos, this.pos, 4, true);
        this.score -= 100;
      }
      this.reducePos = this.pos;
      this.reduce(reduce);
      return true;
    }
    /**
    Try to scan through the automaton to find some kind of reduction
    that can be applied. Used when the regular ForcedReduce field
    isn't a valid action. @internal
    */
    findForcedReduction() {
      let { parser } = this.p, seen = [];
      let explore = (state, depth) => {
        if (seen.includes(state))
          return;
        seen.push(state);
        return parser.allActions(state, (action) => {
          if (action & (262144 | 131072)) ;
          else if (action & 65536) {
            let rDepth = (action >> 19) - depth;
            if (rDepth > 1) {
              let term = action & 65535, target = this.stack.length - rDepth * 3;
              if (target >= 0 && parser.getGoto(this.stack[target], term, false) >= 0)
                return rDepth << 19 | 65536 | term;
            }
          } else {
            let found = explore(action, depth + 1);
            if (found != null)
              return found;
          }
        });
      };
      return explore(this.state, 0);
    }
    /**
    @internal
    */
    forceAll() {
      while (!this.p.parser.stateFlag(
        this.state,
        2
        /* StateFlag.Accepting */
      )) {
        if (!this.forceReduce()) {
          this.storeNode(0, this.pos, this.pos, 4, true);
          break;
        }
      }
      return this;
    }
    /**
    Check whether this state has no further actions (assumed to be a direct descendant of the
    top state, since any other states must be able to continue
    somehow). @internal
    */
    get deadEnd() {
      if (this.stack.length != 3)
        return false;
      let { parser } = this.p;
      return parser.data[parser.stateSlot(
        this.state,
        1
        /* ParseState.Actions */
      )] == 65535 && !parser.stateSlot(
        this.state,
        4
        /* ParseState.DefaultReduce */
      );
    }
    /**
    Restart the stack (put it back in its start state). Only safe
    when this.stack.length == 3 (state is directly below the top
    state). @internal
    */
    restart() {
      this.storeNode(0, this.pos, this.pos, 4, true);
      this.state = this.stack[0];
      this.stack.length = 0;
    }
    /**
    @internal
    */
    sameState(other) {
      if (this.state != other.state || this.stack.length != other.stack.length)
        return false;
      for (let i = 0; i < this.stack.length; i += 3)
        if (this.stack[i] != other.stack[i])
          return false;
      return true;
    }
    /**
    Get the parser used by this stack.
    */
    get parser() {
      return this.p.parser;
    }
    /**
    Test whether a given dialect (by numeric ID, as exported from
    the terms file) is enabled.
    */
    dialectEnabled(dialectID) {
      return this.p.parser.dialect.flags[dialectID];
    }
    shiftContext(term, start) {
      if (this.curContext)
        this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
    }
    reduceContext(term, start) {
      if (this.curContext)
        this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
    }
    /**
    @internal
    */
    emitContext() {
      let last = this.buffer.length - 1;
      if (last < 0 || this.buffer[last] != -3)
        this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
    }
    /**
    @internal
    */
    emitLookAhead() {
      let last = this.buffer.length - 1;
      if (last < 0 || this.buffer[last] != -4)
        this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
    }
    updateContext(context) {
      if (context != this.curContext.context) {
        let newCx = new StackContext(this.curContext.tracker, context);
        if (newCx.hash != this.curContext.hash)
          this.emitContext();
        this.curContext = newCx;
      }
    }
    /**
    @internal
    */
    setLookAhead(lookAhead) {
      if (lookAhead > this.lookAhead) {
        this.emitLookAhead();
        this.lookAhead = lookAhead;
      }
    }
    /**
    @internal
    */
    close() {
      if (this.curContext && this.curContext.tracker.strict)
        this.emitContext();
      if (this.lookAhead > 0)
        this.emitLookAhead();
    }
  };
  var StackContext = class {
    constructor(tracker, context) {
      this.tracker = tracker;
      this.context = context;
      this.hash = tracker.strict ? tracker.hash(context) : 0;
    }
  };
  var SimulatedStack = class {
    constructor(start) {
      this.start = start;
      this.state = start.state;
      this.stack = start.stack;
      this.base = this.stack.length;
    }
    reduce(action) {
      let term = action & 65535, depth = action >> 19;
      if (depth == 0) {
        if (this.stack == this.start.stack)
          this.stack = this.stack.slice();
        this.stack.push(this.state, 0, 0);
        this.base += 3;
      } else {
        this.base -= (depth - 1) * 3;
      }
      let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
      this.state = goto;
    }
  };
  var StackBufferCursor = class _StackBufferCursor {
    constructor(stack, pos, index) {
      this.stack = stack;
      this.pos = pos;
      this.index = index;
      this.buffer = stack.buffer;
      if (this.index == 0)
        this.maybeNext();
    }
    static create(stack, pos = stack.bufferBase + stack.buffer.length) {
      return new _StackBufferCursor(stack, pos, pos - stack.bufferBase);
    }
    maybeNext() {
      let next = this.stack.parent;
      if (next != null) {
        this.index = this.stack.bufferBase - next.bufferBase;
        this.stack = next;
        this.buffer = next.buffer;
      }
    }
    get id() {
      return this.buffer[this.index - 4];
    }
    get start() {
      return this.buffer[this.index - 3];
    }
    get end() {
      return this.buffer[this.index - 2];
    }
    get size() {
      return this.buffer[this.index - 1];
    }
    next() {
      this.index -= 4;
      this.pos -= 4;
      if (this.index == 0)
        this.maybeNext();
    }
    fork() {
      return new _StackBufferCursor(this.stack, this.pos, this.index);
    }
  };
  function decodeArray(input, Type = Uint16Array) {
    if (typeof input != "string")
      return input;
    let array = null;
    for (let pos = 0, out = 0; pos < input.length; ) {
      let value = 0;
      for (; ; ) {
        let next = input.charCodeAt(pos++), stop = false;
        if (next == 126) {
          value = 65535;
          break;
        }
        if (next >= 92)
          next--;
        if (next >= 34)
          next--;
        let digit = next - 32;
        if (digit >= 46) {
          digit -= 46;
          stop = true;
        }
        value += digit;
        if (stop)
          break;
        value *= 46;
      }
      if (array)
        array[out++] = value;
      else
        array = new Type(value);
    }
    return array;
  }
  var CachedToken = class {
    constructor() {
      this.start = -1;
      this.value = -1;
      this.end = -1;
      this.extended = -1;
      this.lookAhead = 0;
      this.mask = 0;
      this.context = 0;
    }
  };
  var nullToken = new CachedToken();
  var InputStream = class {
    /**
    @internal
    */
    constructor(input, ranges) {
      this.input = input;
      this.ranges = ranges;
      this.chunk = "";
      this.chunkOff = 0;
      this.chunk2 = "";
      this.chunk2Pos = 0;
      this.next = -1;
      this.token = nullToken;
      this.rangeIndex = 0;
      this.pos = this.chunkPos = ranges[0].from;
      this.range = ranges[0];
      this.end = ranges[ranges.length - 1].to;
      this.readNext();
    }
    /**
    @internal
    */
    resolveOffset(offset, assoc) {
      let range = this.range, index = this.rangeIndex;
      let pos = this.pos + offset;
      while (pos < range.from) {
        if (!index)
          return null;
        let next = this.ranges[--index];
        pos -= range.from - next.to;
        range = next;
      }
      while (assoc < 0 ? pos > range.to : pos >= range.to) {
        if (index == this.ranges.length - 1)
          return null;
        let next = this.ranges[++index];
        pos += next.from - range.to;
        range = next;
      }
      return pos;
    }
    /**
    @internal
    */
    clipPos(pos) {
      if (pos >= this.range.from && pos < this.range.to)
        return pos;
      for (let range of this.ranges)
        if (range.to > pos)
          return Math.max(pos, range.from);
      return this.end;
    }
    /**
    Look at a code unit near the stream position. \`.peek(0)\` equals
    \`.next\`, \`.peek(-1)\` gives you the previous character, and so
    on.
    
    Note that looking around during tokenizing creates dependencies
    on potentially far-away content, which may reduce the
    effectiveness incremental parsing\u2014when looking forward\u2014or even
    cause invalid reparses when looking backward more than 25 code
    units, since the library does not track lookbehind.
    */
    peek(offset) {
      let idx = this.chunkOff + offset, pos, result;
      if (idx >= 0 && idx < this.chunk.length) {
        pos = this.pos + offset;
        result = this.chunk.charCodeAt(idx);
      } else {
        let resolved = this.resolveOffset(offset, 1);
        if (resolved == null)
          return -1;
        pos = resolved;
        if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
          result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
        } else {
          let i = this.rangeIndex, range = this.range;
          while (range.to <= pos)
            range = this.ranges[++i];
          this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
          if (pos + this.chunk2.length > range.to)
            this.chunk2 = this.chunk2.slice(0, range.to - pos);
          result = this.chunk2.charCodeAt(0);
        }
      }
      if (pos >= this.token.lookAhead)
        this.token.lookAhead = pos + 1;
      return result;
    }
    /**
    Accept a token. By default, the end of the token is set to the
    current stream position, but you can pass an offset (relative to
    the stream position) to change that.
    */
    acceptToken(token, endOffset = 0) {
      let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
      if (end == null || end < this.token.start)
        throw new RangeError("Token end out of bounds");
      this.token.value = token;
      this.token.end = end;
    }
    /**
    Accept a token ending at a specific given position.
    */
    acceptTokenTo(token, endPos) {
      this.token.value = token;
      this.token.end = endPos;
    }
    getChunk() {
      if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
        let { chunk, chunkPos } = this;
        this.chunk = this.chunk2;
        this.chunkPos = this.chunk2Pos;
        this.chunk2 = chunk;
        this.chunk2Pos = chunkPos;
        this.chunkOff = this.pos - this.chunkPos;
      } else {
        this.chunk2 = this.chunk;
        this.chunk2Pos = this.chunkPos;
        let nextChunk = this.input.chunk(this.pos);
        let end = this.pos + nextChunk.length;
        this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
        this.chunkPos = this.pos;
        this.chunkOff = 0;
      }
    }
    readNext() {
      if (this.chunkOff >= this.chunk.length) {
        this.getChunk();
        if (this.chunkOff == this.chunk.length)
          return this.next = -1;
      }
      return this.next = this.chunk.charCodeAt(this.chunkOff);
    }
    /**
    Move the stream forward N (defaults to 1) code units. Returns
    the new value of [\`next\`](#lr.InputStream.next).
    */
    advance(n = 1) {
      this.chunkOff += n;
      while (this.pos + n >= this.range.to) {
        if (this.rangeIndex == this.ranges.length - 1)
          return this.setDone();
        n -= this.range.to - this.pos;
        this.range = this.ranges[++this.rangeIndex];
        this.pos = this.range.from;
      }
      this.pos += n;
      if (this.pos >= this.token.lookAhead)
        this.token.lookAhead = this.pos + 1;
      return this.readNext();
    }
    setDone() {
      this.pos = this.chunkPos = this.end;
      this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
      this.chunk = "";
      return this.next = -1;
    }
    /**
    @internal
    */
    reset(pos, token) {
      if (token) {
        this.token = token;
        token.start = pos;
        token.lookAhead = pos + 1;
        token.value = token.extended = -1;
      } else {
        this.token = nullToken;
      }
      if (this.pos != pos) {
        this.pos = pos;
        if (pos == this.end) {
          this.setDone();
          return this;
        }
        while (pos < this.range.from)
          this.range = this.ranges[--this.rangeIndex];
        while (pos >= this.range.to)
          this.range = this.ranges[++this.rangeIndex];
        if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
          this.chunkOff = pos - this.chunkPos;
        } else {
          this.chunk = "";
          this.chunkOff = 0;
        }
        this.readNext();
      }
      return this;
    }
    /**
    @internal
    */
    read(from, to) {
      if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
        return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
      if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
        return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
      if (from >= this.range.from && to <= this.range.to)
        return this.input.read(from, to);
      let result = "";
      for (let r of this.ranges) {
        if (r.from >= to)
          break;
        if (r.to > from)
          result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
      }
      return result;
    }
  };
  var TokenGroup = class {
    constructor(data, id) {
      this.data = data;
      this.id = id;
    }
    token(input, stack) {
      let { parser } = stack.p;
      readToken(this.data, input, stack, this.id, parser.data, parser.tokenPrecTable);
    }
  };
  TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
  var LocalTokenGroup = class {
    constructor(data, precTable, elseToken) {
      this.precTable = precTable;
      this.elseToken = elseToken;
      this.data = typeof data == "string" ? decodeArray(data) : data;
    }
    token(input, stack) {
      let start = input.pos, skipped = 0;
      for (; ; ) {
        let atEof = input.next < 0, nextPos = input.resolveOffset(1, 1);
        readToken(this.data, input, stack, 0, this.data, this.precTable);
        if (input.token.value > -1)
          break;
        if (this.elseToken == null)
          return;
        if (!atEof)
          skipped++;
        if (nextPos == null)
          break;
        input.reset(nextPos, input.token);
      }
      if (skipped) {
        input.reset(start, input.token);
        input.acceptToken(this.elseToken, skipped);
      }
    }
  };
  LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
  function readToken(data, input, stack, group, precTable, precOffset) {
    let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
    scan: for (; ; ) {
      if ((groupMask & data[state]) == 0)
        break;
      let accEnd = data[state + 1];
      for (let i = state + 3; i < accEnd; i += 2)
        if ((data[i + 1] & groupMask) > 0) {
          let term = data[i];
          if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || overrides(term, input.token.value, precTable, precOffset))) {
            input.acceptToken(term);
            break;
          }
        }
      let next = input.next, low = 0, high = data[state + 2];
      if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535) {
        state = data[accEnd + high * 3 - 1];
        continue scan;
      }
      for (; low < high; ) {
        let mid = low + high >> 1;
        let index = accEnd + mid + (mid << 1);
        let from = data[index], to = data[index + 1] || 65536;
        if (next < from)
          high = mid;
        else if (next >= to)
          low = mid + 1;
        else {
          state = data[index + 2];
          input.advance();
          continue scan;
        }
      }
      break;
    }
  }
  function findOffset(data, start, term) {
    for (let i = start, next; (next = data[i]) != 65535; i++)
      if (next == term)
        return i - start;
    return -1;
  }
  function overrides(token, prev, tableData, tableOffset) {
    let iPrev = findOffset(tableData, tableOffset, prev);
    return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
  }
  var verbose = typeof process != "undefined" && process.env && /\\bparse\\b/.test(process.env.LOG);
  var stackIDs = null;
  function cutAt(tree, pos, side) {
    let cursor = tree.cursor(IterMode.IncludeAnonymous);
    cursor.moveTo(pos);
    for (; ; ) {
      if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
        for (; ; ) {
          if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
            return side < 0 ? Math.max(0, Math.min(
              cursor.to - 1,
              pos - 25
              /* Lookahead.Margin */
            )) : Math.min(tree.length, Math.max(
              cursor.from + 1,
              pos + 25
              /* Lookahead.Margin */
            ));
          if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
            break;
          if (!cursor.parent())
            return side < 0 ? 0 : tree.length;
        }
    }
  }
  var FragmentCursor = class {
    constructor(fragments, nodeSet) {
      this.fragments = fragments;
      this.nodeSet = nodeSet;
      this.i = 0;
      this.fragment = null;
      this.safeFrom = -1;
      this.safeTo = -1;
      this.trees = [];
      this.start = [];
      this.index = [];
      this.nextFragment();
    }
    nextFragment() {
      let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
      if (fr) {
        this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
        this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
        while (this.trees.length) {
          this.trees.pop();
          this.start.pop();
          this.index.pop();
        }
        this.trees.push(fr.tree);
        this.start.push(-fr.offset);
        this.index.push(0);
        this.nextStart = this.safeFrom;
      } else {
        this.nextStart = 1e9;
      }
    }
    // \`pos\` must be >= any previously given \`pos\` for this cursor
    nodeAt(pos) {
      if (pos < this.nextStart)
        return null;
      while (this.fragment && this.safeTo <= pos)
        this.nextFragment();
      if (!this.fragment)
        return null;
      for (; ; ) {
        let last = this.trees.length - 1;
        if (last < 0) {
          this.nextFragment();
          return null;
        }
        let top = this.trees[last], index = this.index[last];
        if (index == top.children.length) {
          this.trees.pop();
          this.start.pop();
          this.index.pop();
          continue;
        }
        let next = top.children[index];
        let start = this.start[last] + top.positions[index];
        if (start > pos) {
          this.nextStart = start;
          return null;
        }
        if (next instanceof Tree) {
          if (start == pos) {
            if (start < this.safeFrom)
              return null;
            let end = start + next.length;
            if (end <= this.safeTo) {
              let lookAhead = next.prop(NodeProp.lookAhead);
              if (!lookAhead || end + lookAhead < this.fragment.to)
                return next;
            }
          }
          this.index[last]++;
          if (start + next.length >= Math.max(this.safeFrom, pos)) {
            this.trees.push(next);
            this.start.push(start);
            this.index.push(0);
          }
        } else {
          this.index[last]++;
          this.nextStart = start + next.length;
        }
      }
    }
  };
  var TokenCache = class {
    constructor(parser, stream) {
      this.stream = stream;
      this.tokens = [];
      this.mainToken = null;
      this.actions = [];
      this.tokens = parser.tokenizers.map((_) => new CachedToken());
    }
    getActions(stack) {
      let actionIndex = 0;
      let main = null;
      let { parser } = stack.p, { tokenizers } = parser;
      let mask = parser.stateSlot(
        stack.state,
        3
        /* ParseState.TokenizerMask */
      );
      let context = stack.curContext ? stack.curContext.hash : 0;
      let lookAhead = 0;
      for (let i = 0; i < tokenizers.length; i++) {
        if ((1 << i & mask) == 0)
          continue;
        let tokenizer = tokenizers[i], token = this.tokens[i];
        if (main && !tokenizer.fallback)
          continue;
        if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
          this.updateCachedToken(token, tokenizer, stack);
          token.mask = mask;
          token.context = context;
        }
        if (token.lookAhead > token.end + 25)
          lookAhead = Math.max(token.lookAhead, lookAhead);
        if (token.value != 0) {
          let startIndex = actionIndex;
          if (token.extended > -1)
            actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
          actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
          if (!tokenizer.extend) {
            main = token;
            if (actionIndex > startIndex)
              break;
          }
        }
      }
      while (this.actions.length > actionIndex)
        this.actions.pop();
      if (lookAhead)
        stack.setLookAhead(lookAhead);
      if (!main && stack.pos == this.stream.end) {
        main = new CachedToken();
        main.value = stack.p.parser.eofTerm;
        main.start = main.end = stack.pos;
        actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
      }
      this.mainToken = main;
      return this.actions;
    }
    getMainToken(stack) {
      if (this.mainToken)
        return this.mainToken;
      let main = new CachedToken(), { pos, p: p2 } = stack;
      main.start = pos;
      main.end = Math.min(pos + 1, p2.stream.end);
      main.value = pos == p2.stream.end ? p2.parser.eofTerm : 0;
      return main;
    }
    updateCachedToken(token, tokenizer, stack) {
      let start = this.stream.clipPos(stack.pos);
      tokenizer.token(this.stream.reset(start, token), stack);
      if (token.value > -1) {
        let { parser } = stack.p;
        for (let i = 0; i < parser.specialized.length; i++)
          if (parser.specialized[i] == token.value) {
            let result = parser.specializers[i](this.stream.read(token.start, token.end), stack);
            if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
              if ((result & 1) == 0)
                token.value = result >> 1;
              else
                token.extended = result >> 1;
              break;
            }
          }
      } else {
        token.value = 0;
        token.end = this.stream.clipPos(start + 1);
      }
    }
    putAction(action, token, end, index) {
      for (let i = 0; i < index; i += 3)
        if (this.actions[i] == action)
          return index;
      this.actions[index++] = action;
      this.actions[index++] = token;
      this.actions[index++] = end;
      return index;
    }
    addActions(stack, token, end, index) {
      let { state } = stack, { parser } = stack.p, { data } = parser;
      for (let set = 0; set < 2; set++) {
        for (let i = parser.stateSlot(
          state,
          set ? 2 : 1
          /* ParseState.Actions */
        ); ; i += 3) {
          if (data[i] == 65535) {
            if (data[i + 1] == 1) {
              i = pair(data, i + 2);
            } else {
              if (index == 0 && data[i + 1] == 2)
                index = this.putAction(pair(data, i + 2), token, end, index);
              break;
            }
          }
          if (data[i] == token)
            index = this.putAction(pair(data, i + 1), token, end, index);
        }
      }
      return index;
    }
  };
  var Parse = class {
    constructor(parser, input, fragments, ranges) {
      this.parser = parser;
      this.input = input;
      this.ranges = ranges;
      this.recovering = 0;
      this.nextStackID = 9812;
      this.minStackPos = 0;
      this.reused = [];
      this.stoppedAt = null;
      this.lastBigReductionStart = -1;
      this.lastBigReductionSize = 0;
      this.bigReductionCount = 0;
      this.stream = new InputStream(input, ranges);
      this.tokens = new TokenCache(parser, this.stream);
      this.topTerm = parser.top[1];
      let { from } = ranges[0];
      this.stacks = [Stack.start(this, parser.top[0], from)];
      this.fragments = fragments.length && this.stream.end - from > parser.bufferLength * 4 ? new FragmentCursor(fragments, parser.nodeSet) : null;
    }
    get parsedPos() {
      return this.minStackPos;
    }
    // Move the parser forward. This will process all parse stacks at
    // \`this.pos\` and try to advance them to a further position. If no
    // stack for such a position is found, it'll start error-recovery.
    //
    // When the parse is finished, this will return a syntax tree. When
    // not, it returns \`null\`.
    advance() {
      let stacks = this.stacks, pos = this.minStackPos;
      let newStacks = this.stacks = [];
      let stopped, stoppedTokens;
      if (this.bigReductionCount > 300 && stacks.length == 1) {
        let [s] = stacks;
        while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart) {
        }
        this.bigReductionCount = this.lastBigReductionSize = 0;
      }
      for (let i = 0; i < stacks.length; i++) {
        let stack = stacks[i];
        for (; ; ) {
          this.tokens.mainToken = null;
          if (stack.pos > pos) {
            newStacks.push(stack);
          } else if (this.advanceStack(stack, newStacks, stacks)) {
            continue;
          } else {
            if (!stopped) {
              stopped = [];
              stoppedTokens = [];
            }
            stopped.push(stack);
            let tok = this.tokens.getMainToken(stack);
            stoppedTokens.push(tok.value, tok.end);
          }
          break;
        }
      }
      if (!newStacks.length) {
        let finished = stopped && findFinished(stopped);
        if (finished) {
          if (verbose)
            console.log("Finish with " + this.stackID(finished));
          return this.stackToTree(finished);
        }
        if (this.parser.strict) {
          if (verbose && stopped)
            console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
          throw new SyntaxError("No parse at " + pos);
        }
        if (!this.recovering)
          this.recovering = 5;
      }
      if (this.recovering && stopped) {
        let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
        if (finished) {
          if (verbose)
            console.log("Force-finish " + this.stackID(finished));
          return this.stackToTree(finished.forceAll());
        }
      }
      if (this.recovering) {
        let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
        if (newStacks.length > maxRemaining) {
          newStacks.sort((a, b) => b.score - a.score);
          while (newStacks.length > maxRemaining)
            newStacks.pop();
        }
        if (newStacks.some((s) => s.reducePos > pos))
          this.recovering--;
      } else if (newStacks.length > 1) {
        outer: for (let i = 0; i < newStacks.length - 1; i++) {
          let stack = newStacks[i];
          for (let j = i + 1; j < newStacks.length; j++) {
            let other = newStacks[j];
            if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
              if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                newStacks.splice(j--, 1);
              } else {
                newStacks.splice(i--, 1);
                continue outer;
              }
            }
          }
        }
        if (newStacks.length > 12)
          newStacks.splice(
            12,
            newStacks.length - 12
            /* Rec.MaxStackCount */
          );
      }
      this.minStackPos = newStacks[0].pos;
      for (let i = 1; i < newStacks.length; i++)
        if (newStacks[i].pos < this.minStackPos)
          this.minStackPos = newStacks[i].pos;
      return null;
    }
    stopAt(pos) {
      if (this.stoppedAt != null && this.stoppedAt < pos)
        throw new RangeError("Can't move stoppedAt forward");
      this.stoppedAt = pos;
    }
    // Returns an updated version of the given stack, or null if the
    // stack can't advance normally. When \`split\` and \`stacks\` are
    // given, stacks split off by ambiguous operations will be pushed to
    // \`split\`, or added to \`stacks\` if they move \`pos\` forward.
    advanceStack(stack, stacks, split) {
      let start = stack.pos, { parser } = this;
      let base = verbose ? this.stackID(stack) + " -> " : "";
      if (this.stoppedAt != null && start > this.stoppedAt)
        return stack.forceReduce() ? stack : null;
      if (this.fragments) {
        let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
        for (let cached = this.fragments.nodeAt(start); cached; ) {
          let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser.getGoto(stack.state, cached.type.id) : -1;
          if (match > -1 && cached.length && (!strictCx || (cached.prop(NodeProp.contextHash) || 0) == cxHash)) {
            stack.useNode(cached, match);
            if (verbose)
              console.log(base + this.stackID(stack) + \` (via reuse of \${parser.getName(cached.type.id)})\`);
            return true;
          }
          if (!(cached instanceof Tree) || cached.children.length == 0 || cached.positions[0] > 0)
            break;
          let inner = cached.children[0];
          if (inner instanceof Tree && cached.positions[0] == 0)
            cached = inner;
          else
            break;
        }
      }
      let defaultReduce = parser.stateSlot(
        stack.state,
        4
        /* ParseState.DefaultReduce */
      );
      if (defaultReduce > 0) {
        stack.reduce(defaultReduce);
        if (verbose)
          console.log(base + this.stackID(stack) + \` (via always-reduce \${parser.getName(
            defaultReduce & 65535
            /* Action.ValueMask */
          )})\`);
        return true;
      }
      if (stack.stack.length >= 8400) {
        while (stack.stack.length > 6e3 && stack.forceReduce()) {
        }
      }
      let actions = this.tokens.getActions(stack);
      for (let i = 0; i < actions.length; ) {
        let action = actions[i++], term = actions[i++], end = actions[i++];
        let last = i == actions.length || !split;
        let localStack = last ? stack : stack.split();
        let main = this.tokens.mainToken;
        localStack.apply(action, term, main ? main.start : localStack.pos, end);
        if (verbose)
          console.log(base + this.stackID(localStack) + \` (via \${(action & 65536) == 0 ? "shift" : \`reduce of \${parser.getName(
            action & 65535
            /* Action.ValueMask */
          )}\`} for \${parser.getName(term)} @ \${start}\${localStack == stack ? "" : ", split"})\`);
        if (last)
          return true;
        else if (localStack.pos > start)
          stacks.push(localStack);
        else
          split.push(localStack);
      }
      return false;
    }
    // Advance a given stack forward as far as it will go. Returns the
    // (possibly updated) stack if it got stuck, or null if it moved
    // forward and was given to \`pushStackDedup\`.
    advanceFully(stack, newStacks) {
      let pos = stack.pos;
      for (; ; ) {
        if (!this.advanceStack(stack, null, null))
          return false;
        if (stack.pos > pos) {
          pushStackDedup(stack, newStacks);
          return true;
        }
      }
    }
    runRecovery(stacks, tokens, newStacks) {
      let finished = null, restarted = false;
      for (let i = 0; i < stacks.length; i++) {
        let stack = stacks[i], token = tokens[i << 1], tokenEnd = tokens[(i << 1) + 1];
        let base = verbose ? this.stackID(stack) + " -> " : "";
        if (stack.deadEnd) {
          if (restarted)
            continue;
          restarted = true;
          stack.restart();
          if (verbose)
            console.log(base + this.stackID(stack) + " (restarted)");
          let done = this.advanceFully(stack, newStacks);
          if (done)
            continue;
        }
        let force = stack.split(), forceBase = base;
        for (let j = 0; force.forceReduce() && j < 10; j++) {
          if (verbose)
            console.log(forceBase + this.stackID(force) + " (via force-reduce)");
          let done = this.advanceFully(force, newStacks);
          if (done)
            break;
          if (verbose)
            forceBase = this.stackID(force) + " -> ";
        }
        for (let insert of stack.recoverByInsert(token)) {
          if (verbose)
            console.log(base + this.stackID(insert) + " (via recover-insert)");
          this.advanceFully(insert, newStacks);
        }
        if (this.stream.end > stack.pos) {
          if (tokenEnd == stack.pos) {
            tokenEnd++;
            token = 0;
          }
          stack.recoverByDelete(token, tokenEnd);
          if (verbose)
            console.log(base + this.stackID(stack) + \` (via recover-delete \${this.parser.getName(token)})\`);
          pushStackDedup(stack, newStacks);
        } else if (!finished || finished.score < stack.score) {
          finished = stack;
        }
      }
      return finished;
    }
    // Convert the stack's buffer to a syntax tree.
    stackToTree(stack) {
      stack.close();
      return Tree.build({
        buffer: StackBufferCursor.create(stack),
        nodeSet: this.parser.nodeSet,
        topID: this.topTerm,
        maxBufferLength: this.parser.bufferLength,
        reused: this.reused,
        start: this.ranges[0].from,
        length: stack.pos - this.ranges[0].from,
        minRepeatType: this.parser.minRepeatTerm
      });
    }
    stackID(stack) {
      let id = (stackIDs || (stackIDs = /* @__PURE__ */ new WeakMap())).get(stack);
      if (!id)
        stackIDs.set(stack, id = String.fromCodePoint(this.nextStackID++));
      return id + stack;
    }
  };
  function pushStackDedup(stack, newStacks) {
    for (let i = 0; i < newStacks.length; i++) {
      let other = newStacks[i];
      if (other.pos == stack.pos && other.sameState(stack)) {
        if (newStacks[i].score < stack.score)
          newStacks[i] = stack;
        return;
      }
    }
    newStacks.push(stack);
  }
  var Dialect = class {
    constructor(source, flags, disabled) {
      this.source = source;
      this.flags = flags;
      this.disabled = disabled;
    }
    allows(term) {
      return !this.disabled || this.disabled[term] == 0;
    }
  };
  var LRParser = class _LRParser extends Parser {
    /**
    @internal
    */
    constructor(spec) {
      super();
      this.wrappers = [];
      if (spec.version != 14)
        throw new RangeError(\`Parser version (\${spec.version}) doesn't match runtime version (\${14})\`);
      let nodeNames = spec.nodeNames.split(" ");
      this.minRepeatTerm = nodeNames.length;
      for (let i = 0; i < spec.repeatNodeCount; i++)
        nodeNames.push("");
      let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
      let nodeProps = [];
      for (let i = 0; i < nodeNames.length; i++)
        nodeProps.push([]);
      function setProp(nodeID, prop, value) {
        nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
      }
      if (spec.nodeProps)
        for (let propSpec of spec.nodeProps) {
          let prop = propSpec[0];
          if (typeof prop == "string")
            prop = NodeProp[prop];
          for (let i = 1; i < propSpec.length; ) {
            let next = propSpec[i++];
            if (next >= 0) {
              setProp(next, prop, propSpec[i++]);
            } else {
              let value = propSpec[i + -next];
              for (let j = -next; j > 0; j--)
                setProp(propSpec[i++], prop, value);
              i++;
            }
          }
        }
      this.nodeSet = new NodeSet(nodeNames.map((name, i) => NodeType.define({
        name: i >= this.minRepeatTerm ? void 0 : name,
        id: i,
        props: nodeProps[i],
        top: topTerms.indexOf(i) > -1,
        error: i == 0,
        skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i) > -1
      })));
      if (spec.propSources)
        this.nodeSet = this.nodeSet.extend(...spec.propSources);
      this.strict = false;
      this.bufferLength = DefaultBufferLength;
      let tokenArray = decodeArray(spec.tokenData);
      this.context = spec.context;
      this.specializerSpecs = spec.specialized || [];
      this.specialized = new Uint16Array(this.specializerSpecs.length);
      for (let i = 0; i < this.specializerSpecs.length; i++)
        this.specialized[i] = this.specializerSpecs[i].term;
      this.specializers = this.specializerSpecs.map(getSpecializer);
      this.states = decodeArray(spec.states, Uint32Array);
      this.data = decodeArray(spec.stateData);
      this.goto = decodeArray(spec.goto);
      this.maxTerm = spec.maxTerm;
      this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
      this.topRules = spec.topRules;
      this.dialects = spec.dialects || {};
      this.dynamicPrecedences = spec.dynamicPrecedences || null;
      this.tokenPrecTable = spec.tokenPrec;
      this.termNames = spec.termNames || null;
      this.maxNode = this.nodeSet.types.length - 1;
      this.dialect = this.parseDialect();
      this.top = this.topRules[Object.keys(this.topRules)[0]];
    }
    createParse(input, fragments, ranges) {
      let parse = new Parse(this, input, fragments, ranges);
      for (let w of this.wrappers)
        parse = w(parse, input, fragments, ranges);
      return parse;
    }
    /**
    Get a goto table entry @internal
    */
    getGoto(state, term, loose = false) {
      let table = this.goto;
      if (term >= table[0])
        return -1;
      for (let pos = table[term + 1]; ; ) {
        let groupTag = table[pos++], last = groupTag & 1;
        let target = table[pos++];
        if (last && loose)
          return target;
        for (let end = pos + (groupTag >> 1); pos < end; pos++)
          if (table[pos] == state)
            return target;
        if (last)
          return -1;
      }
    }
    /**
    Check if this state has an action for a given terminal @internal
    */
    hasAction(state, terminal) {
      let data = this.data;
      for (let set = 0; set < 2; set++) {
        for (let i = this.stateSlot(
          state,
          set ? 2 : 1
          /* ParseState.Actions */
        ), next; ; i += 3) {
          if ((next = data[i]) == 65535) {
            if (data[i + 1] == 1)
              next = data[i = pair(data, i + 2)];
            else if (data[i + 1] == 2)
              return pair(data, i + 2);
            else
              break;
          }
          if (next == terminal || next == 0)
            return pair(data, i + 1);
        }
      }
      return 0;
    }
    /**
    @internal
    */
    stateSlot(state, slot) {
      return this.states[state * 6 + slot];
    }
    /**
    @internal
    */
    stateFlag(state, flag) {
      return (this.stateSlot(
        state,
        0
        /* ParseState.Flags */
      ) & flag) > 0;
    }
    /**
    @internal
    */
    validAction(state, action) {
      return !!this.allActions(state, (a) => a == action ? true : null);
    }
    /**
    @internal
    */
    allActions(state, action) {
      let deflt = this.stateSlot(
        state,
        4
        /* ParseState.DefaultReduce */
      );
      let result = deflt ? action(deflt) : void 0;
      for (let i = this.stateSlot(
        state,
        1
        /* ParseState.Actions */
      ); result == null; i += 3) {
        if (this.data[i] == 65535) {
          if (this.data[i + 1] == 1)
            i = pair(this.data, i + 2);
          else
            break;
        }
        result = action(pair(this.data, i + 1));
      }
      return result;
    }
    /**
    Get the states that can follow this one through shift actions or
    goto jumps. @internal
    */
    nextStates(state) {
      let result = [];
      for (let i = this.stateSlot(
        state,
        1
        /* ParseState.Actions */
      ); ; i += 3) {
        if (this.data[i] == 65535) {
          if (this.data[i + 1] == 1)
            i = pair(this.data, i + 2);
          else
            break;
        }
        if ((this.data[i + 2] & 65536 >> 16) == 0) {
          let value = this.data[i + 1];
          if (!result.some((v, i2) => i2 & 1 && v == value))
            result.push(this.data[i], value);
        }
      }
      return result;
    }
    /**
    Configure the parser. Returns a new parser instance that has the
    given settings modified. Settings not provided in \`config\` are
    kept from the original parser.
    */
    configure(config) {
      let copy = Object.assign(Object.create(_LRParser.prototype), this);
      if (config.props)
        copy.nodeSet = this.nodeSet.extend(...config.props);
      if (config.top) {
        let info = this.topRules[config.top];
        if (!info)
          throw new RangeError(\`Invalid top rule name \${config.top}\`);
        copy.top = info;
      }
      if (config.tokenizers)
        copy.tokenizers = this.tokenizers.map((t) => {
          let found = config.tokenizers.find((r) => r.from == t);
          return found ? found.to : t;
        });
      if (config.specializers) {
        copy.specializers = this.specializers.slice();
        copy.specializerSpecs = this.specializerSpecs.map((s, i) => {
          let found = config.specializers.find((r) => r.from == s.external);
          if (!found)
            return s;
          let spec = Object.assign(Object.assign({}, s), { external: found.to });
          copy.specializers[i] = getSpecializer(spec);
          return spec;
        });
      }
      if (config.contextTracker)
        copy.context = config.contextTracker;
      if (config.dialect)
        copy.dialect = this.parseDialect(config.dialect);
      if (config.strict != null)
        copy.strict = config.strict;
      if (config.wrap)
        copy.wrappers = copy.wrappers.concat(config.wrap);
      if (config.bufferLength != null)
        copy.bufferLength = config.bufferLength;
      return copy;
    }
    /**
    Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
    are registered for this parser.
    */
    hasWrappers() {
      return this.wrappers.length > 0;
    }
    /**
    Returns the name associated with a given term. This will only
    work for all terms when the parser was generated with the
    \`--names\` option. By default, only the names of tagged terms are
    stored.
    */
    getName(term) {
      return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
    }
    /**
    The eof term id is always allocated directly after the node
    types. @internal
    */
    get eofTerm() {
      return this.maxNode + 1;
    }
    /**
    The type of top node produced by the parser.
    */
    get topNode() {
      return this.nodeSet.types[this.top[1]];
    }
    /**
    @internal
    */
    dynamicPrecedence(term) {
      let prec = this.dynamicPrecedences;
      return prec == null ? 0 : prec[term] || 0;
    }
    /**
    @internal
    */
    parseDialect(dialect) {
      let values = Object.keys(this.dialects), flags = values.map(() => false);
      if (dialect)
        for (let part of dialect.split(" ")) {
          let id = values.indexOf(part);
          if (id >= 0)
            flags[id] = true;
        }
      let disabled = null;
      for (let i = 0; i < values.length; i++)
        if (!flags[i]) {
          for (let j = this.dialects[values[i]], id; (id = this.data[j++]) != 65535; )
            (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id] = 1;
        }
      return new Dialect(dialect, flags, disabled);
    }
    /**
    Used by the output of the parser generator. Not available to
    user code. @hide
    */
    static deserialize(spec) {
      return new _LRParser(spec);
    }
  };
  function pair(data, off) {
    return data[off] | data[off + 1] << 16;
  }
  function findFinished(stacks) {
    let best = null;
    for (let stack of stacks) {
      let stopped = stack.p.stoppedAt;
      if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(
        stack.state,
        2
        /* StateFlag.Accepting */
      ) && (!best || best.score < stack.score))
        best = stack;
    }
    return best;
  }
  function getSpecializer(spec) {
    if (spec.external) {
      let mask = spec.extend ? 1 : 0;
      return (value, stack) => spec.external(value, stack) << 1 | mask;
    }
    return spec.get;
  }

  // node_modules/@lezer/generator/dist/index.js
  var Node = class {
    constructor(start) {
      this.start = start;
    }
  };
  var GrammarDeclaration = class extends Node {
    constructor(start, rules, topRules, tokens, localTokens, context, externalTokens, externalSpecializers, externalPropSources, precedences, mainSkip, scopedSkip, dialects, externalProps, autoDelim) {
      super(start);
      this.rules = rules;
      this.topRules = topRules;
      this.tokens = tokens;
      this.localTokens = localTokens;
      this.context = context;
      this.externalTokens = externalTokens;
      this.externalSpecializers = externalSpecializers;
      this.externalPropSources = externalPropSources;
      this.precedences = precedences;
      this.mainSkip = mainSkip;
      this.scopedSkip = scopedSkip;
      this.dialects = dialects;
      this.externalProps = externalProps;
      this.autoDelim = autoDelim;
    }
    toString() {
      return Object.values(this.rules).join("\\n");
    }
  };
  var RuleDeclaration = class extends Node {
    constructor(start, id, props, params, expr) {
      super(start);
      this.id = id;
      this.props = props;
      this.params = params;
      this.expr = expr;
    }
    toString() {
      return this.id.name + (this.params.length ? \`<\${this.params.join()}>\` : "") + " -> " + this.expr;
    }
  };
  var PrecDeclaration = class extends Node {
    constructor(start, items) {
      super(start);
      this.items = items;
    }
  };
  var TokenPrecDeclaration = class extends Node {
    constructor(start, items) {
      super(start);
      this.items = items;
    }
  };
  var TokenConflictDeclaration = class extends Node {
    constructor(start, a, b) {
      super(start);
      this.a = a;
      this.b = b;
    }
  };
  var TokenDeclaration = class extends Node {
    constructor(start, precedences, conflicts, rules, literals) {
      super(start);
      this.precedences = precedences;
      this.conflicts = conflicts;
      this.rules = rules;
      this.literals = literals;
    }
  };
  var LocalTokenDeclaration = class extends Node {
    constructor(start, precedences, rules, fallback) {
      super(start);
      this.precedences = precedences;
      this.rules = rules;
      this.fallback = fallback;
    }
  };
  var LiteralDeclaration = class extends Node {
    constructor(start, literal, props) {
      super(start);
      this.literal = literal;
      this.props = props;
    }
  };
  var ContextDeclaration = class extends Node {
    constructor(start, id, source) {
      super(start);
      this.id = id;
      this.source = source;
    }
  };
  var ExternalTokenDeclaration = class extends Node {
    constructor(start, id, source, tokens, conflicts) {
      super(start);
      this.id = id;
      this.source = source;
      this.tokens = tokens;
      this.conflicts = conflicts;
    }
  };
  var ExternalSpecializeDeclaration = class extends Node {
    constructor(start, type, token, id, source, tokens) {
      super(start);
      this.type = type;
      this.token = token;
      this.id = id;
      this.source = source;
      this.tokens = tokens;
    }
  };
  var ExternalPropSourceDeclaration = class extends Node {
    constructor(start, id, source) {
      super(start);
      this.id = id;
      this.source = source;
    }
  };
  var ExternalPropDeclaration = class extends Node {
    constructor(start, id, externalID, source) {
      super(start);
      this.id = id;
      this.externalID = externalID;
      this.source = source;
    }
  };
  var Identifier = class extends Node {
    constructor(start, name) {
      super(start);
      this.name = name;
    }
    toString() {
      return this.name;
    }
  };
  var Expression = class extends Node {
    walk(f) {
      return f(this);
    }
    eq(_other) {
      return false;
    }
  };
  Expression.prototype.prec = 10;
  var NameExpression = class _NameExpression extends Expression {
    constructor(start, id, args) {
      super(start);
      this.id = id;
      this.args = args;
    }
    toString() {
      return this.id.name + (this.args.length ? \`<\${this.args.join()}>\` : "");
    }
    eq(other) {
      return this.id.name == other.id.name && exprsEq(this.args, other.args);
    }
    walk(f) {
      let args = walkExprs(this.args, f);
      return f(args == this.args ? this : new _NameExpression(this.start, this.id, args));
    }
  };
  var SpecializeExpression = class _SpecializeExpression extends Expression {
    constructor(start, type, props, token, content) {
      super(start);
      this.type = type;
      this.props = props;
      this.token = token;
      this.content = content;
    }
    toString() {
      return \`@\${this.type}[\${this.props.join(",")}]<\${this.token}, \${this.content}>\`;
    }
    eq(other) {
      return this.type == other.type && Prop.eqProps(this.props, other.props) && exprEq(this.token, other.token) && exprEq(this.content, other.content);
    }
    walk(f) {
      let token = this.token.walk(f), content = this.content.walk(f);
      return f(token == this.token && content == this.content ? this : new _SpecializeExpression(this.start, this.type, this.props, token, content));
    }
  };
  var InlineRuleExpression = class _InlineRuleExpression extends Expression {
    constructor(start, rule) {
      super(start);
      this.rule = rule;
    }
    toString() {
      let rule = this.rule;
      return \`\${rule.id}\${rule.props.length ? \`[\${rule.props.join(",")}]\` : ""} { \${rule.expr} }\`;
    }
    eq(other) {
      let rule = this.rule, oRule = other.rule;
      return exprEq(rule.expr, oRule.expr) && rule.id.name == oRule.id.name && Prop.eqProps(rule.props, oRule.props);
    }
    walk(f) {
      let rule = this.rule, expr = rule.expr.walk(f);
      return f(expr == rule.expr ? this : new _InlineRuleExpression(this.start, new RuleDeclaration(rule.start, rule.id, rule.props, [], expr)));
    }
  };
  var ChoiceExpression = class _ChoiceExpression extends Expression {
    constructor(start, exprs) {
      super(start);
      this.exprs = exprs;
    }
    toString() {
      return this.exprs.map((e) => maybeParens(e, this)).join(" | ");
    }
    eq(other) {
      return exprsEq(this.exprs, other.exprs);
    }
    walk(f) {
      let exprs = walkExprs(this.exprs, f);
      return f(exprs == this.exprs ? this : new _ChoiceExpression(this.start, exprs));
    }
  };
  ChoiceExpression.prototype.prec = 1;
  var SequenceExpression = class _SequenceExpression extends Expression {
    constructor(start, exprs, markers, empty = false) {
      super(start);
      this.exprs = exprs;
      this.markers = markers;
      this.empty = empty;
    }
    toString() {
      return this.empty ? "()" : this.exprs.map((e) => maybeParens(e, this)).join(" ");
    }
    eq(other) {
      return exprsEq(this.exprs, other.exprs) && this.markers.every((m, i) => {
        let om = other.markers[i];
        return m.length == om.length && m.every((x, i2) => x.eq(om[i2]));
      });
    }
    walk(f) {
      let exprs = walkExprs(this.exprs, f);
      return f(exprs == this.exprs ? this : new _SequenceExpression(this.start, exprs, this.markers, this.empty && !exprs.length));
    }
  };
  SequenceExpression.prototype.prec = 2;
  var ConflictMarker = class extends Node {
    constructor(start, id, type) {
      super(start);
      this.id = id;
      this.type = type;
    }
    toString() {
      return (this.type == "ambig" ? "~" : "!") + this.id.name;
    }
    eq(other) {
      return this.id.name == other.id.name && this.type == other.type;
    }
  };
  var RepeatExpression = class _RepeatExpression extends Expression {
    constructor(start, expr, kind) {
      super(start);
      this.expr = expr;
      this.kind = kind;
    }
    toString() {
      return maybeParens(this.expr, this) + this.kind;
    }
    eq(other) {
      return exprEq(this.expr, other.expr) && this.kind == other.kind;
    }
    walk(f) {
      let expr = this.expr.walk(f);
      return f(expr == this.expr ? this : new _RepeatExpression(this.start, expr, this.kind));
    }
  };
  RepeatExpression.prototype.prec = 3;
  var LiteralExpression = class extends Expression {
    // value.length is always > 0
    constructor(start, value) {
      super(start);
      this.value = value;
    }
    toString() {
      return JSON.stringify(this.value);
    }
    eq(other) {
      return this.value == other.value;
    }
  };
  var SetExpression = class extends Expression {
    constructor(start, ranges, inverted) {
      super(start);
      this.ranges = ranges;
      this.inverted = inverted;
    }
    toString() {
      return \`[\${this.inverted ? "^" : ""}\${this.ranges.map(([a, b]) => {
        return String.fromCodePoint(a) + (b == a + 1 ? "" : "-" + String.fromCodePoint(b));
      })}]\`;
    }
    eq(other) {
      return this.inverted == other.inverted && this.ranges.length == other.ranges.length && this.ranges.every(([a, b], i) => {
        let [x, y] = other.ranges[i];
        return a == x && b == y;
      });
    }
  };
  var AnyExpression = class extends Expression {
    constructor(start) {
      super(start);
    }
    toString() {
      return "_";
    }
    eq() {
      return true;
    }
  };
  function walkExprs(exprs, f) {
    let result = null;
    for (let i = 0; i < exprs.length; i++) {
      let expr = exprs[i].walk(f);
      if (expr != exprs[i] && !result)
        result = exprs.slice(0, i);
      if (result)
        result.push(expr);
    }
    return result || exprs;
  }
  var CharClasses = {
    asciiLetter: [[65, 91], [97, 123]],
    asciiLowercase: [[97, 123]],
    asciiUppercase: [[65, 91]],
    digit: [[48, 58]],
    whitespace: [
      [9, 14],
      [32, 33],
      [133, 134],
      [160, 161],
      [5760, 5761],
      [8192, 8203],
      [8232, 8234],
      [8239, 8240],
      [8287, 8288],
      [12288, 12289]
    ],
    eof: [[65535, 65535]]
  };
  var CharClass = class extends Expression {
    constructor(start, type) {
      super(start);
      this.type = type;
    }
    toString() {
      return "@" + this.type;
    }
    eq(expr) {
      return this.type == expr.type;
    }
  };
  function exprEq(a, b) {
    return a.constructor == b.constructor && a.eq(b);
  }
  function exprsEq(a, b) {
    return a.length == b.length && a.every((e, i) => exprEq(e, b[i]));
  }
  var Prop = class extends Node {
    constructor(start, at, name, value) {
      super(start);
      this.at = at;
      this.name = name;
      this.value = value;
    }
    eq(other) {
      return this.name == other.name && this.value.length == other.value.length && this.value.every((v, i) => v.value == other.value[i].value && v.name == other.value[i].name);
    }
    toString() {
      let result = (this.at ? "@" : "") + this.name;
      if (this.value.length) {
        result += "=";
        for (let { name, value } of this.value)
          result += name ? \`{\${name}}\` : /[^\\w-]/.test(value) ? JSON.stringify(value) : value;
      }
      return result;
    }
    static eqProps(a, b) {
      return a.length == b.length && a.every((p2, i) => p2.eq(b[i]));
    }
  };
  var PropPart = class extends Node {
    constructor(start, value, name) {
      super(start);
      this.value = value;
      this.name = name;
    }
  };
  function maybeParens(node, parent) {
    return node.prec < parent.prec ? "(" + node.toString() + ")" : node.toString();
  }
  var GenError = class extends Error {
  };
  function hasProps(props) {
    for (let _p in props)
      return true;
    return false;
  }
  var termHash = 0;
  var Term = class {
    constructor(name, flags, nodeName, props = {}) {
      this.name = name;
      this.flags = flags;
      this.nodeName = nodeName;
      this.props = props;
      this.hash = ++termHash;
      this.id = -1;
      this.rules = [];
    }
    toString() {
      return this.name;
    }
    get nodeType() {
      return this.top || this.nodeName != null || hasProps(this.props) || this.repeated;
    }
    get terminal() {
      return (this.flags & 1) > 0;
    }
    get eof() {
      return (this.flags & 4) > 0;
    }
    get error() {
      return "error" in this.props;
    }
    get top() {
      return (this.flags & 2) > 0;
    }
    get interesting() {
      return this.flags > 0 || this.nodeName != null;
    }
    get repeated() {
      return (this.flags & 16) > 0;
    }
    set preserve(value) {
      this.flags = value ? this.flags | 8 : this.flags & ~8;
    }
    get preserve() {
      return (this.flags & 8) > 0;
    }
    set inline(value) {
      this.flags = value ? this.flags | 32 : this.flags & ~32;
    }
    get inline() {
      return (this.flags & 32) > 0;
    }
    cmp(other) {
      return this.hash - other.hash;
    }
  };
  var TermSet = class {
    constructor() {
      this.terms = [];
      this.names = /* @__PURE__ */ Object.create(null);
      this.tops = [];
      this.eof = this.term(
        "\\u2404",
        null,
        1 | 4
        /* TermFlag.Eof */
      );
      this.error = this.term(
        "\\u26A0",
        "\\u26A0",
        8
        /* TermFlag.Preserve */
      );
    }
    term(name, nodeName, flags = 0, props = {}) {
      let term = new Term(name, flags, nodeName, props);
      this.terms.push(term);
      this.names[name] = term;
      return term;
    }
    makeTop(nodeName, props) {
      const term = this.term("@top", nodeName, 2, props);
      this.tops.push(term);
      return term;
    }
    makeTerminal(name, nodeName, props = {}) {
      return this.term(name, nodeName, 1, props);
    }
    makeNonTerminal(name, nodeName, props = {}) {
      return this.term(name, nodeName, 0, props);
    }
    makeRepeat(name) {
      return this.term(
        name,
        null,
        16
        /* TermFlag.Repeated */
      );
    }
    uniqueName(name) {
      for (let i = 0; ; i++) {
        let cur = i ? \`\${name}-\${i}\` : name;
        if (!this.names[cur])
          return cur;
      }
    }
    finish(rules) {
      for (let rule of rules)
        rule.name.rules.push(rule);
      this.terms = this.terms.filter((t) => t.terminal || t.preserve || rules.some((r) => r.name == t || r.parts.includes(t)));
      let names = {};
      let nodeTypes = [this.error];
      this.error.id = 0;
      let nextID = 0 + 1;
      for (let term of this.terms)
        if (term.id < 0 && term.nodeType && !term.repeated) {
          term.id = nextID++;
          nodeTypes.push(term);
        }
      let minRepeatTerm = nextID;
      for (let term of this.terms)
        if (term.repeated) {
          term.id = nextID++;
          nodeTypes.push(term);
        }
      this.eof.id = nextID++;
      for (let term of this.terms) {
        if (term.id < 0)
          term.id = nextID++;
        if (term.name)
          names[term.id] = term.name;
      }
      if (nextID >= 65534)
        throw new GenError("Too many terms");
      return { nodeTypes, names, minRepeatTerm, maxTerm: nextID - 1 };
    }
  };
  function cmpSet(a, b, cmp) {
    if (a.length != b.length)
      return a.length - b.length;
    for (let i = 0; i < a.length; i++) {
      let diff = cmp(a[i], b[i]);
      if (diff)
        return diff;
    }
    return 0;
  }
  var none$3 = [];
  var Conflicts = class _Conflicts {
    constructor(precedence, ambigGroups = none$3, cut = 0) {
      this.precedence = precedence;
      this.ambigGroups = ambigGroups;
      this.cut = cut;
    }
    join(other) {
      if (this == _Conflicts.none || this == other)
        return other;
      if (other == _Conflicts.none)
        return this;
      return new _Conflicts(Math.max(this.precedence, other.precedence), union(this.ambigGroups, other.ambigGroups), Math.max(this.cut, other.cut));
    }
    cmp(other) {
      return this.precedence - other.precedence || cmpSet(this.ambigGroups, other.ambigGroups, (a, b) => a < b ? -1 : a > b ? 1 : 0) || this.cut - other.cut;
    }
  };
  Conflicts.none = new Conflicts(0);
  function union(a, b) {
    if (a.length == 0 || a == b)
      return b;
    if (b.length == 0)
      return a;
    let result = a.slice();
    for (let value of b)
      if (!a.includes(value))
        result.push(value);
    return result.sort();
  }
  var ruleID = 0;
  var Rule = class {
    constructor(name, parts, conflicts, skip) {
      this.name = name;
      this.parts = parts;
      this.conflicts = conflicts;
      this.skip = skip;
      this.id = ruleID++;
    }
    cmp(rule) {
      return this.id - rule.id;
    }
    cmpNoName(rule) {
      return this.parts.length - rule.parts.length || this.skip.hash - rule.skip.hash || this.parts.reduce((r, s, i) => r || s.cmp(rule.parts[i]), 0) || cmpSet(this.conflicts, rule.conflicts, (a, b) => a.cmp(b));
    }
    toString() {
      return this.name + " -> " + this.parts.join(" ");
    }
    get isRepeatWrap() {
      return this.name.repeated && this.parts.length == 2 && this.parts[0] == this.name;
    }
    sameReduce(other) {
      return this.name == other.name && this.parts.length == other.parts.length && this.isRepeatWrap == other.isRepeatWrap;
    }
  };
  var MAX_CHAR = 65535;
  var Edge = class {
    constructor(from, to, target) {
      this.from = from;
      this.to = to;
      this.target = target;
    }
    toString() {
      return \`-> \${this.target.id}[label=\${JSON.stringify(this.from < 0 ? "\\u03B5" : charFor(this.from) + (this.to > this.from + 1 ? "-" + charFor(this.to - 1) : ""))}]\`;
    }
  };
  function charFor(n) {
    return n > MAX_CHAR ? "\\u221E" : n == 10 ? "\\\\n" : n == 13 ? "\\\\r" : n < 32 || n >= 55296 && n < 57343 ? "\\\\u{" + n.toString(16) + "}" : String.fromCharCode(n);
  }
  function minimize(states, start) {
    let partition = /* @__PURE__ */ Object.create(null);
    let byAccepting = /* @__PURE__ */ Object.create(null);
    for (let state of states) {
      let id = ids(state.accepting);
      let group = byAccepting[id] || (byAccepting[id] = []);
      group.push(state);
      partition[state.id] = group;
    }
    for (; ; ) {
      let split = false, newPartition = /* @__PURE__ */ Object.create(null);
      for (let state of states) {
        if (newPartition[state.id])
          continue;
        let group = partition[state.id];
        if (group.length == 1) {
          newPartition[group[0].id] = group;
          continue;
        }
        let parts = [];
        groups: for (let state2 of group) {
          for (let p2 of parts) {
            if (isEquivalent(state2, p2[0], partition)) {
              p2.push(state2);
              continue groups;
            }
          }
          parts.push([state2]);
        }
        if (parts.length > 1)
          split = true;
        for (let p2 of parts)
          for (let s of p2)
            newPartition[s.id] = p2;
      }
      if (!split)
        return applyMinimization(states, start, partition);
      partition = newPartition;
    }
  }
  function isEquivalent(a, b, partition) {
    if (a.edges.length != b.edges.length)
      return false;
    for (let i = 0; i < a.edges.length; i++) {
      let eA = a.edges[i], eB = b.edges[i];
      if (eA.from != eB.from || eA.to != eB.to || partition[eA.target.id] != partition[eB.target.id])
        return false;
    }
    return true;
  }
  function applyMinimization(states, start, partition) {
    for (let state of states) {
      for (let i = 0; i < state.edges.length; i++) {
        let edge = state.edges[i], target = partition[edge.target.id][0];
        if (target != edge.target)
          state.edges[i] = new Edge(edge.from, edge.to, target);
      }
    }
    return partition[start.id][0];
  }
  var stateID = 1;
  var State$1 = class State {
    constructor(accepting = [], id = stateID++) {
      this.accepting = accepting;
      this.id = id;
      this.edges = [];
    }
    edge(from, to, target) {
      this.edges.push(new Edge(from, to, target));
    }
    nullEdge(target) {
      this.edge(-1, -1, target);
    }
    compile() {
      let labeled = /* @__PURE__ */ Object.create(null), localID = 0;
      let startState = explore(this.closure().sort((a, b) => a.id - b.id));
      return minimize(Object.values(labeled), startState);
      function explore(states) {
        let newState = labeled[ids(states)] = new State(states.reduce((a, s) => union(a, s.accepting), []), localID++);
        let out = [];
        for (let state of states)
          for (let edge of state.edges) {
            if (edge.from >= 0)
              out.push(edge);
          }
        let transitions = mergeEdges(out);
        for (let merged of transitions) {
          let targets = merged.targets.sort((a, b) => a.id - b.id);
          newState.edge(merged.from, merged.to, labeled[ids(targets)] || explore(targets));
        }
        return newState;
      }
    }
    closure() {
      let result = [], seen = /* @__PURE__ */ Object.create(null);
      function explore(state) {
        if (seen[state.id])
          return;
        seen[state.id] = true;
        if (state.edges.some((e) => e.from >= 0) || state.accepting.length > 0 && !state.edges.some((e) => sameSet$1(state.accepting, e.target.accepting)))
          result.push(state);
        for (let edge of state.edges)
          if (edge.from < 0)
            explore(edge.target);
      }
      explore(this);
      return result;
    }
    findConflicts(occurTogether) {
      let conflicts = [], cycleTerms = this.cycleTerms();
      function add(a, b, soft, aEdges, bEdges) {
        if (a.id < b.id) {
          [a, b] = [b, a];
          soft = -soft;
        }
        let found = conflicts.find((c) => c.a == a && c.b == b);
        if (!found)
          conflicts.push(new Conflict$1(a, b, soft, exampleFromEdges(aEdges), bEdges && exampleFromEdges(bEdges)));
        else if (found.soft != soft)
          found.soft = 0;
      }
      this.reachable((state, edges) => {
        if (state.accepting.length == 0)
          return;
        for (let i = 0; i < state.accepting.length; i++)
          for (let j = i + 1; j < state.accepting.length; j++)
            add(state.accepting[i], state.accepting[j], 0, edges);
        state.reachable((s, es) => {
          if (s != state)
            for (let term of s.accepting) {
              let hasCycle = cycleTerms.includes(term);
              for (let orig of state.accepting)
                if (term != orig)
                  add(term, orig, hasCycle || cycleTerms.includes(orig) || !occurTogether(term, orig) ? 0 : 1, edges, edges.concat(es));
            }
        });
      });
      return conflicts;
    }
    cycleTerms() {
      let work = [];
      this.reachable((state) => {
        for (let { target } of state.edges)
          work.push(state, target);
      });
      let table = /* @__PURE__ */ new Map();
      let haveCycle = [];
      for (let i = 0; i < work.length; ) {
        let from = work[i++], to = work[i++];
        let entry = table.get(from);
        if (!entry)
          table.set(from, entry = []);
        if (entry.includes(to))
          continue;
        if (from == to) {
          if (!haveCycle.includes(from))
            haveCycle.push(from);
        } else {
          for (let next of entry)
            work.push(from, next);
          entry.push(to);
        }
      }
      let result = [];
      for (let state of haveCycle) {
        for (let term of state.accepting) {
          if (!result.includes(term))
            result.push(term);
        }
      }
      return result;
    }
    reachable(f) {
      let seen = [], edges = [];
      (function explore(s) {
        f(s, edges);
        seen.push(s);
        for (let edge of s.edges)
          if (!seen.includes(edge.target)) {
            edges.push(edge);
            explore(edge.target);
            edges.pop();
          }
      })(this);
    }
    toString() {
      let out = "digraph {\\n";
      this.reachable((state) => {
        if (state.accepting.length)
          out += \`  \${state.id} [label=\${JSON.stringify(state.accepting.join())}];
\`;
        for (let edge of state.edges)
          out += \`  \${state.id} \${edge};
\`;
      });
      return out + "}";
    }
    // Tokenizer data is represented as a single flat array. This
    // contains regions for each tokenizer state. Region offsets are
    // used to identify states.
    //
    // Each state is laid out as:
    //  - Token group mask
    //  - Offset of the end of the accepting data
    //  - Number of outgoing edges in the state
    //  - Pairs of token masks and term ids that indicate the accepting
    //    states, sorted by precedence
    //  - Triples for the edges: each with a low and high bound and the
    //    offset of the next state.
    toArray(groupMasks, precedence) {
      let offsets = [];
      let data = [];
      this.reachable((state) => {
        let start = data.length;
        let acceptEnd = start + 3 + state.accepting.length * 2;
        offsets[state.id] = start;
        data.push(state.stateMask(groupMasks), acceptEnd, state.edges.length);
        state.accepting.sort((a, b) => precedence.indexOf(a.id) - precedence.indexOf(b.id));
        for (let term of state.accepting)
          data.push(term.id, groupMasks[term.id] || 65535);
        for (let edge of state.edges)
          data.push(edge.from, edge.to, -edge.target.id - 1);
      });
      for (let i = 0; i < data.length; i++)
        if (data[i] < 0)
          data[i] = offsets[-data[i] - 1];
      if (data.length > Math.pow(2, 16))
        throw new GenError("Tokenizer tables too big to represent with 16-bit offsets.");
      return Uint16Array.from(data);
    }
    stateMask(groupMasks) {
      let mask = 0;
      this.reachable((state) => {
        for (let term of state.accepting)
          mask |= groupMasks[term.id] || 65535;
      });
      return mask;
    }
  };
  var Conflict$1 = class Conflict {
    constructor(a, b, soft, exampleA, exampleB) {
      this.a = a;
      this.b = b;
      this.soft = soft;
      this.exampleA = exampleA;
      this.exampleB = exampleB;
    }
  };
  function exampleFromEdges(edges) {
    let str = "";
    for (let i = 0; i < edges.length; i++)
      str += String.fromCharCode(edges[i].from);
    return str;
  }
  function ids(elts) {
    let result = "";
    for (let elt of elts) {
      if (result.length)
        result += "-";
      result += elt.id;
    }
    return result;
  }
  function sameSet$1(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (a[i] != b[i])
        return false;
    return true;
  }
  var MergedEdge = class {
    constructor(from, to, targets) {
      this.from = from;
      this.to = to;
      this.targets = targets;
    }
  };
  function mergeEdges(edges) {
    let separate = [], result = [];
    for (let edge of edges) {
      if (!separate.includes(edge.from))
        separate.push(edge.from);
      if (!separate.includes(edge.to))
        separate.push(edge.to);
    }
    separate.sort((a, b) => a - b);
    for (let i = 1; i < separate.length; i++) {
      let from = separate[i - 1], to = separate[i];
      let found = [];
      for (let edge of edges)
        if (edge.to > from && edge.from < to) {
          for (let target of edge.target.closure())
            if (!found.includes(target))
              found.push(target);
        }
      if (found.length)
        result.push(new MergedEdge(from, to, found));
    }
    let eof = edges.filter(
      (e) => e.from == 65535 && e.to == 65535
      /* Seq.End */
    );
    if (eof.length) {
      let found = [];
      for (let edge of eof)
        for (let target of edge.target.closure())
          if (!found.includes(target))
            found.push(target);
      if (found.length)
        result.push(new MergedEdge(65535, 65535, found));
    }
    return result;
  }
  var word = /[\\w_-]+/gy;
  try {
    word = /[\\p{Alphabetic}\\d_-]+/ugy;
  } catch (_) {
  }
  var none$2 = [];
  var Input = class {
    constructor(string, fileName = null) {
      this.string = string;
      this.fileName = fileName;
      this.type = "sof";
      this.value = null;
      this.start = 0;
      this.end = 0;
      this.next();
    }
    lineInfo(pos) {
      for (let line = 1, cur = 0; ; ) {
        let next = this.string.indexOf("\\n", cur);
        if (next > -1 && next < pos) {
          ++line;
          cur = next + 1;
        } else {
          return { line, ch: pos - cur };
        }
      }
    }
    message(msg, pos = -1) {
      let posInfo = this.fileName || "";
      if (pos > -1) {
        let info = this.lineInfo(pos);
        posInfo += (posInfo ? " " : "") + info.line + ":" + info.ch;
      }
      return posInfo ? msg + \` (\${posInfo})\` : msg;
    }
    raise(msg, pos = -1) {
      throw new GenError(this.message(msg, pos));
    }
    match(pos, re) {
      let match = re.exec(this.string.slice(pos));
      return match ? pos + match[0].length : -1;
    }
    next() {
      let start = this.match(this.end, /^(\\s|\\/\\/.*|\\/\\*[^]*?\\*\\/)*/);
      if (start == this.string.length)
        return this.set("eof", null, start, start);
      let next = this.string[start];
      if (next == '"') {
        let end = this.match(start + 1, /^(\\\\.|[^"\\\\])*"/);
        if (end == -1)
          this.raise("Unterminated string literal", start);
        return this.set("string", readString(this.string.slice(start + 1, end - 1)), start, end);
      } else if (next == "'") {
        let end = this.match(start + 1, /^(\\\\.|[^'\\\\])*'/);
        if (end == -1)
          this.raise("Unterminated string literal", start);
        return this.set("string", readString(this.string.slice(start + 1, end - 1)), start, end);
      } else if (next == "@") {
        word.lastIndex = start + 1;
        let m = word.exec(this.string);
        if (!m)
          return this.raise("@ without a name", start);
        return this.set("at", m[0], start, start + 1 + m[0].length);
      } else if ((next == "$" || next == "!") && this.string[start + 1] == "[") {
        let end = this.match(start + 2, /^(?:\\\\.|[^\\]\\\\])*\\]/);
        if (end == -1)
          this.raise("Unterminated character set", start);
        return this.set("set", this.string.slice(start + 2, end - 1), start, end);
      } else if (/[\\[\\]()!~+*?{}<>\\.,|:$=]/.test(next)) {
        return this.set(next, null, start, start + 1);
      } else {
        word.lastIndex = start;
        let m = word.exec(this.string);
        if (!m)
          return this.raise("Unexpected character " + JSON.stringify(next), start);
        return this.set("id", m[0], start, start + m[0].length);
      }
    }
    set(type, value, start, end) {
      this.type = type;
      this.value = value;
      this.start = start;
      this.end = end;
    }
    eat(type, value = null) {
      if (this.type == type && (value == null || this.value === value)) {
        this.next();
        return true;
      } else {
        return false;
      }
    }
    unexpected() {
      return this.raise(\`Unexpected token '\${this.string.slice(this.start, this.end)}'\`, this.start);
    }
    expect(type, value = null) {
      let val = this.value;
      if (this.type != type || !(value == null || val === value))
        this.unexpected();
      this.next();
      return val;
    }
    parse() {
      return parseGrammar(this);
    }
  };
  function parseGrammar(input) {
    let start = input.start;
    let rules = [];
    let prec = null;
    let tokens = null;
    let localTokens = [];
    let mainSkip = null;
    let scopedSkip = [];
    let dialects = [];
    let context = null;
    let external = [];
    let specialized = [];
    let props = [];
    let propSources = [];
    let tops = [];
    let sawTop = false;
    let autoDelim = false;
    while (input.type != "eof") {
      let start2 = input.start;
      if (input.eat("at", "top")) {
        if (input.type != "id")
          input.raise(\`Top rules must have a name\`, input.start);
        tops.push(parseRule(input, parseIdent(input)));
        sawTop = true;
      } else if (input.type == "at" && input.value == "tokens") {
        if (tokens)
          input.raise(\`Multiple @tokens declaractions\`, input.start);
        else
          tokens = parseTokens(input);
      } else if (input.eat("at", "local")) {
        input.expect("id", "tokens");
        localTokens.push(parseLocalTokens(input, start2));
      } else if (input.eat("at", "context")) {
        if (context)
          input.raise(\`Multiple @context declarations\`, start2);
        let id = parseIdent(input);
        input.expect("id", "from");
        let source = input.expect("string");
        context = new ContextDeclaration(start2, id, source);
      } else if (input.eat("at", "external")) {
        if (input.eat("id", "tokens"))
          external.push(parseExternalTokens(input, start2));
        else if (input.eat("id", "prop"))
          props.push(parseExternalProp(input, start2));
        else if (input.eat("id", "extend"))
          specialized.push(parseExternalSpecialize(input, "extend", start2));
        else if (input.eat("id", "specialize"))
          specialized.push(parseExternalSpecialize(input, "specialize", start2));
        else if (input.eat("id", "propSource"))
          propSources.push(parseExternalPropSource(input, start2));
        else
          input.unexpected();
      } else if (input.eat("at", "dialects")) {
        input.expect("{");
        for (let first = true; !input.eat("}"); first = false) {
          if (!first)
            input.eat(",");
          dialects.push(parseIdent(input));
        }
      } else if (input.type == "at" && input.value == "precedence") {
        if (prec)
          input.raise(\`Multiple precedence declarations\`, input.start);
        prec = parsePrecedence(input);
      } else if (input.eat("at", "detectDelim")) {
        autoDelim = true;
      } else if (input.eat("at", "skip")) {
        let skip = parseBracedExpr(input);
        if (input.type == "{") {
          input.next();
          let rules2 = [], topRules = [];
          while (!input.eat("}")) {
            if (input.eat("at", "top")) {
              topRules.push(parseRule(input, parseIdent(input)));
              sawTop = true;
            } else {
              rules2.push(parseRule(input));
            }
          }
          scopedSkip.push({ expr: skip, topRules, rules: rules2 });
        } else {
          if (mainSkip)
            input.raise(\`Multiple top-level skip declarations\`, input.start);
          mainSkip = skip;
        }
      } else {
        rules.push(parseRule(input));
      }
    }
    if (!sawTop)
      return input.raise(\`Missing @top declaration\`);
    return new GrammarDeclaration(start, rules, tops, tokens, localTokens, context, external, specialized, propSources, prec, mainSkip, scopedSkip, dialects, props, autoDelim);
  }
  function parseRule(input, named) {
    let start = named ? named.start : input.start;
    let id = named || parseIdent(input);
    let props = parseProps(input);
    let params = [];
    if (input.eat("<"))
      while (!input.eat(">")) {
        if (params.length)
          input.expect(",");
        params.push(parseIdent(input));
      }
    let expr = parseBracedExpr(input);
    return new RuleDeclaration(start, id, props, params, expr);
  }
  function parseProps(input) {
    if (input.type != "[")
      return none$2;
    let props = [];
    input.expect("[");
    while (!input.eat("]")) {
      if (props.length)
        input.expect(",");
      props.push(parseProp(input));
    }
    return props;
  }
  function parseProp(input) {
    let start = input.start, value = [], name = input.value, at = input.type == "at";
    if (!input.eat("at") && !input.eat("id"))
      input.unexpected();
    if (input.eat("="))
      for (; ; ) {
        if (input.type == "string" || input.type == "id") {
          value.push(new PropPart(input.start, input.value, null));
          input.next();
        } else if (input.eat(".")) {
          value.push(new PropPart(input.start, ".", null));
        } else if (input.eat("{")) {
          value.push(new PropPart(input.start, null, input.expect("id")));
          input.expect("}");
        } else {
          break;
        }
      }
    return new Prop(start, at, name, value);
  }
  function parseBracedExpr(input) {
    input.expect("{");
    let expr = parseExprChoice(input);
    input.expect("}");
    return expr;
  }
  var SET_MARKER = "\\uFDDA";
  function parseExprInner(input) {
    let start = input.start;
    if (input.eat("(")) {
      if (input.eat(")"))
        return new SequenceExpression(start, none$2, [none$2, none$2]);
      let expr = parseExprChoice(input);
      input.expect(")");
      return expr;
    } else if (input.type == "string") {
      let value = input.value;
      input.next();
      if (value.length == 0)
        return new SequenceExpression(start, none$2, [none$2, none$2]);
      return new LiteralExpression(start, value);
    } else if (input.eat("id", "_")) {
      return new AnyExpression(start);
    } else if (input.type == "set") {
      let content = input.value, invert = input.string[input.start] == "!";
      let unescaped = readString(content.replace(/\\\\.|-|"/g, (m) => {
        return m == "-" ? SET_MARKER : m == '"' ? '\\\\"' : m;
      }));
      let ranges = [];
      for (let pos = 0; pos < unescaped.length; ) {
        let code = unescaped.codePointAt(pos);
        pos += code > 65535 ? 2 : 1;
        if (pos < unescaped.length - 1 && unescaped[pos] == SET_MARKER) {
          let end = unescaped.codePointAt(pos + 1);
          pos += end > 65535 ? 3 : 2;
          if (end < code)
            input.raise("Invalid character range", input.start);
          addRange(input, ranges, code, end + 1);
        } else {
          if (code == SET_MARKER.charCodeAt(0))
            code = 45;
          addRange(input, ranges, code, code + 1);
        }
      }
      input.next();
      return new SetExpression(start, ranges.sort((a, b) => a[0] - b[0]), invert);
    } else if (input.type == "at" && (input.value == "specialize" || input.value == "extend")) {
      let { start: start2, value } = input;
      input.next();
      let props = parseProps(input);
      input.expect("<");
      let token = parseExprChoice(input), content;
      if (input.eat(",")) {
        content = parseExprChoice(input);
      } else if (token instanceof LiteralExpression) {
        content = token;
      } else {
        input.raise(\`@\${value} requires two arguments when its first argument isn't a literal string\`);
      }
      input.expect(">");
      return new SpecializeExpression(start2, value, props, token, content);
    } else if (input.type == "at" && CharClasses.hasOwnProperty(input.value)) {
      let cls = new CharClass(input.start, input.value);
      input.next();
      return cls;
    } else if (input.type == "[") {
      let rule = parseRule(input, new Identifier(start, "_anon"));
      if (rule.params.length)
        input.raise(\`Inline rules can't have parameters\`, rule.start);
      return new InlineRuleExpression(start, rule);
    } else {
      let id = parseIdent(input);
      if (input.type == "[" || input.type == "{") {
        let rule = parseRule(input, id);
        if (rule.params.length)
          input.raise(\`Inline rules can't have parameters\`, rule.start);
        return new InlineRuleExpression(start, rule);
      } else {
        if (input.eat(".") && id.name == "std" && CharClasses.hasOwnProperty(input.value)) {
          let cls = new CharClass(start, input.value);
          input.next();
          return cls;
        }
        return new NameExpression(start, id, parseArgs(input));
      }
    }
  }
  function parseArgs(input) {
    let args = [];
    if (input.eat("<"))
      while (!input.eat(">")) {
        if (args.length)
          input.expect(",");
        args.push(parseExprChoice(input));
      }
    return args;
  }
  function addRange(input, ranges, from, to) {
    if (!ranges.every(([a, b]) => b <= from || a >= to))
      input.raise("Overlapping character range", input.start);
    ranges.push([from, to]);
  }
  function parseExprSuffix(input) {
    let start = input.start;
    let expr = parseExprInner(input);
    for (; ; ) {
      let kind = input.type;
      if (input.eat("*") || input.eat("?") || input.eat("+"))
        expr = new RepeatExpression(start, expr, kind);
      else
        return expr;
    }
  }
  function endOfSequence(input) {
    return input.type == "}" || input.type == ")" || input.type == "|" || input.type == "/" || input.type == "/\\\\" || input.type == "{" || input.type == "," || input.type == ">";
  }
  function parseExprSequence(input) {
    let start = input.start, exprs = [], markers = [none$2];
    do {
      for (; ; ) {
        let localStart = input.start, markerType;
        if (input.eat("~"))
          markerType = "ambig";
        else if (input.eat("!"))
          markerType = "prec";
        else
          break;
        markers[markers.length - 1] = markers[markers.length - 1].concat(new ConflictMarker(localStart, parseIdent(input), markerType));
      }
      if (endOfSequence(input))
        break;
      exprs.push(parseExprSuffix(input));
      markers.push(none$2);
    } while (!endOfSequence(input));
    if (exprs.length == 1 && markers.every((ms) => ms.length == 0))
      return exprs[0];
    return new SequenceExpression(start, exprs, markers, !exprs.length);
  }
  function parseExprChoice(input) {
    let start = input.start, left = parseExprSequence(input);
    if (!input.eat("|"))
      return left;
    let exprs = [left];
    do {
      exprs.push(parseExprSequence(input));
    } while (input.eat("|"));
    let empty = exprs.find((s) => s instanceof SequenceExpression && s.empty);
    if (empty)
      input.raise("Empty expression in choice operator. If this is intentional, use () to make it explicit.", empty.start);
    return new ChoiceExpression(start, exprs);
  }
  function parseIdent(input) {
    if (input.type != "id")
      input.unexpected();
    let start = input.start, name = input.value;
    input.next();
    return new Identifier(start, name);
  }
  function parsePrecedence(input) {
    let start = input.start;
    input.next();
    input.expect("{");
    let items = [];
    while (!input.eat("}")) {
      if (items.length)
        input.eat(",");
      items.push({
        id: parseIdent(input),
        type: input.eat("at", "left") ? "left" : input.eat("at", "right") ? "right" : input.eat("at", "cut") ? "cut" : null
      });
    }
    return new PrecDeclaration(start, items);
  }
  function parseTokens(input) {
    let start = input.start;
    input.next();
    input.expect("{");
    let tokenRules = [];
    let literals = [];
    let precedences = [];
    let conflicts = [];
    while (!input.eat("}")) {
      if (input.type == "at" && input.value == "precedence") {
        precedences.push(parseTokenPrecedence(input));
      } else if (input.type == "at" && input.value == "conflict") {
        conflicts.push(parseTokenConflict(input));
      } else if (input.type == "string") {
        literals.push(new LiteralDeclaration(input.start, input.expect("string"), parseProps(input)));
      } else {
        tokenRules.push(parseRule(input));
      }
    }
    return new TokenDeclaration(start, precedences, conflicts, tokenRules, literals);
  }
  function parseLocalTokens(input, start) {
    input.expect("{");
    let tokenRules = [];
    let precedences = [];
    let fallback = null;
    while (!input.eat("}")) {
      if (input.type == "at" && input.value == "precedence") {
        precedences.push(parseTokenPrecedence(input));
      } else if (input.eat("at", "else") && !fallback) {
        fallback = { id: parseIdent(input), props: parseProps(input) };
      } else {
        tokenRules.push(parseRule(input));
      }
    }
    return new LocalTokenDeclaration(start, precedences, tokenRules, fallback);
  }
  function parseTokenPrecedence(input) {
    let start = input.start;
    input.next();
    input.expect("{");
    let tokens = [];
    while (!input.eat("}")) {
      if (tokens.length)
        input.eat(",");
      let expr = parseExprInner(input);
      if (expr instanceof LiteralExpression || expr instanceof NameExpression)
        tokens.push(expr);
      else
        input.raise(\`Invalid expression in token precedences\`, expr.start);
    }
    return new TokenPrecDeclaration(start, tokens);
  }
  function parseTokenConflict(input) {
    let start = input.start;
    input.next();
    input.expect("{");
    let a = parseExprInner(input);
    if (!(a instanceof LiteralExpression || a instanceof NameExpression))
      input.raise(\`Invalid expression in token conflict\`, a.start);
    input.eat(",");
    let b = parseExprInner(input);
    if (!(b instanceof LiteralExpression || b instanceof NameExpression))
      input.raise(\`Invalid expression in token conflict\`, b.start);
    input.expect("}");
    return new TokenConflictDeclaration(start, a, b);
  }
  function parseExternalTokenSet(input, allowConflicts) {
    let tokens = [], conflicts = [];
    input.expect("{");
    for (let first = true; !input.eat("}"); first = false) {
      if (!first)
        input.eat(",");
      if (allowConflicts && input.eat("at", "conflict")) {
        input.expect("{");
        for (let f = true; !input.eat("}"); f = false) {
          if (!f)
            input.eat(",");
          conflicts.push(parseIdent(input));
        }
      } else {
        let id = parseIdent(input);
        let props = parseProps(input);
        tokens.push({ id, props });
      }
    }
    return { tokens, conflicts };
  }
  function parseExternalTokens(input, start) {
    let id = parseIdent(input);
    input.expect("id", "from");
    let from = input.expect("string");
    let { tokens, conflicts } = parseExternalTokenSet(input, true);
    return new ExternalTokenDeclaration(start, id, from, tokens, conflicts);
  }
  function parseExternalSpecialize(input, type, start) {
    let token = parseBracedExpr(input);
    let id = parseIdent(input);
    input.expect("id", "from");
    let from = input.expect("string");
    return new ExternalSpecializeDeclaration(start, type, token, id, from, parseExternalTokenSet(input, false).tokens);
  }
  function parseExternalPropSource(input, start) {
    let id = parseIdent(input);
    input.expect("id", "from");
    return new ExternalPropSourceDeclaration(start, id, input.expect("string"));
  }
  function parseExternalProp(input, start) {
    let externalID = parseIdent(input);
    let id = input.eat("id", "as") ? parseIdent(input) : externalID;
    input.expect("id", "from");
    let from = input.expect("string");
    return new ExternalPropDeclaration(start, id, externalID, from);
  }
  function readString(string) {
    let point = /\\\\(?:u\\{([\\da-f]+)\\}|u([\\da-f]{4})|x([\\da-f]{2})|([ntbrf0])|(.))|[^]/yig;
    let out = "", m;
    while (m = point.exec(string)) {
      let [all, u1, u2, u3, single, unknown] = m;
      if (u1 || u2 || u3)
        out += String.fromCodePoint(parseInt(u1 || u2 || u3, 16));
      else if (single)
        out += single == "n" ? "\\n" : single == "t" ? "	" : single == "0" ? "\\0" : single == "r" ? "\\r" : single == "f" ? "\\f" : "\\b";
      else if (unknown)
        out += unknown;
      else
        out += all;
    }
    return out;
  }
  function hash(a, b) {
    return (a << 5) + a + b;
  }
  function hashString(h, s) {
    for (let i = 0; i < s.length; i++)
      h = hash(h, s.charCodeAt(i));
    return h;
  }
  var verbose2 = typeof process != "undefined" && process.env.LOG || "";
  var timing = /\\btime\\b/.test(verbose2);
  var time = timing ? (label, f) => {
    let t0 = Date.now();
    let result = f();
    console.log(\`\${label} (\${((Date.now() - t0) / 1e3).toFixed(2)}s)\`);
    return result;
  } : (_label, f) => f();
  var Pos = class _Pos {
    constructor(rule, pos, ahead, ambigAhead, skipAhead, via) {
      this.rule = rule;
      this.pos = pos;
      this.ahead = ahead;
      this.ambigAhead = ambigAhead;
      this.skipAhead = skipAhead;
      this.via = via;
      this.hash = 0;
    }
    finish() {
      let h = hash(hash(this.rule.id, this.pos), this.skipAhead.hash);
      for (let a of this.ahead)
        h = hash(h, a.hash);
      for (let group of this.ambigAhead)
        h = hashString(h, group);
      this.hash = h;
      return this;
    }
    get next() {
      return this.pos < this.rule.parts.length ? this.rule.parts[this.pos] : null;
    }
    advance() {
      return new _Pos(this.rule, this.pos + 1, this.ahead, this.ambigAhead, this.skipAhead, this.via).finish();
    }
    get skip() {
      return this.pos == this.rule.parts.length ? this.skipAhead : this.rule.skip;
    }
    cmp(pos) {
      return this.rule.cmp(pos.rule) || this.pos - pos.pos || this.skipAhead.hash - pos.skipAhead.hash || cmpSet(this.ahead, pos.ahead, (a, b) => a.cmp(b)) || cmpSet(this.ambigAhead, pos.ambigAhead, cmpStr);
    }
    eqSimple(pos) {
      return pos.rule == this.rule && pos.pos == this.pos;
    }
    toString() {
      let parts = this.rule.parts.map((t) => t.name);
      parts.splice(this.pos, 0, "\\xB7");
      return \`\${this.rule.name} -> \${parts.join(" ")}\`;
    }
    eq(other) {
      return this == other || this.hash == other.hash && this.rule == other.rule && this.pos == other.pos && this.skipAhead == other.skipAhead && sameSet(this.ahead, other.ahead) && sameSet(this.ambigAhead, other.ambigAhead);
    }
    trail(maxLen = 60) {
      let result = [];
      for (let pos = this; pos; pos = pos.via) {
        for (let i = pos.pos - 1; i >= 0; i--)
          result.push(pos.rule.parts[i]);
      }
      let value = result.reverse().join(" ");
      if (value.length > maxLen)
        value = value.slice(value.length - maxLen).replace(/.*? /, "\\u2026 ");
      return value;
    }
    conflicts(pos = this.pos) {
      let result = this.rule.conflicts[pos];
      if (pos == this.rule.parts.length && this.ambigAhead.length)
        result = result.join(new Conflicts(0, this.ambigAhead));
      return result;
    }
    static addOrigins(group, context) {
      let result = group.slice();
      for (let i = 0; i < result.length; i++) {
        let next = result[i];
        if (next.pos == 0)
          for (let pos of context) {
            if (pos.next == next.rule.name && !result.includes(pos))
              result.push(pos);
          }
      }
      return result;
    }
  };
  function conflictsAt(group) {
    let result = Conflicts.none;
    for (let pos of group)
      result = result.join(pos.conflicts());
    return result;
  }
  function compareRepeatPrec(a, b) {
    for (let pos of a)
      if (pos.rule.name.repeated) {
        for (let posB of b)
          if (posB.rule.name == pos.rule.name) {
            if (pos.rule.isRepeatWrap && pos.pos == 2)
              return 1;
            if (posB.rule.isRepeatWrap && posB.pos == 2)
              return -1;
          }
      }
    return 0;
  }
  function cmpStr(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function termsAhead(rule, pos, after, first) {
    let found = [];
    for (let i = pos + 1; i < rule.parts.length; i++) {
      let next = rule.parts[i], cont = false;
      if (next.terminal) {
        addTo(next, found);
      } else
        for (let term of first[next.name]) {
          if (term == null)
            cont = true;
          else
            addTo(term, found);
        }
      if (!cont)
        return found;
    }
    for (let a of after)
      addTo(a, found);
    return found;
  }
  function eqSet(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!a[i].eq(b[i]))
        return false;
    return true;
  }
  function sameSet(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (a[i] != b[i])
        return false;
    return true;
  }
  var Shift = class _Shift {
    constructor(term, target) {
      this.term = term;
      this.target = target;
    }
    eq(other) {
      return other instanceof _Shift && this.term == other.term && other.target.id == this.target.id;
    }
    cmp(other) {
      return other instanceof Reduce ? -1 : this.term.id - other.term.id || this.target.id - other.target.id;
    }
    matches(other, mapping) {
      return other instanceof _Shift && mapping[other.target.id] == mapping[this.target.id];
    }
    toString() {
      return "s" + this.target.id;
    }
    map(mapping, states) {
      let mapped = states[mapping[this.target.id]];
      return mapped == this.target ? this : new _Shift(this.term, mapped);
    }
  };
  var Reduce = class _Reduce {
    constructor(term, rule) {
      this.term = term;
      this.rule = rule;
    }
    eq(other) {
      return other instanceof _Reduce && this.term == other.term && other.rule.sameReduce(this.rule);
    }
    cmp(other) {
      return other instanceof Shift ? 1 : this.term.id - other.term.id || this.rule.name.id - other.rule.name.id || this.rule.parts.length - other.rule.parts.length;
    }
    matches(other, mapping) {
      return other instanceof _Reduce && other.rule.sameReduce(this.rule);
    }
    toString() {
      return \`\${this.rule.name.name}(\${this.rule.parts.length})\`;
    }
    map() {
      return this;
    }
  };
  function hashPositions(set) {
    let h = 5381;
    for (let pos of set)
      h = hash(h, pos.hash);
    return h;
  }
  var ConflictContext = class {
    constructor(first) {
      this.first = first;
      this.conflicts = [];
    }
  };
  var State2 = class {
    constructor(id, set, flags = 0, skip, hash2 = hashPositions(set), startRule = null) {
      this.id = id;
      this.set = set;
      this.flags = flags;
      this.skip = skip;
      this.hash = hash2;
      this.startRule = startRule;
      this.actions = [];
      this.actionPositions = [];
      this.goto = [];
      this.tokenGroup = -1;
      this.defaultReduce = null;
      this._actionsByTerm = null;
    }
    toString() {
      let actions = this.actions.map((t) => t.term + "=" + t).join(",") + (this.goto.length ? " | " + this.goto.map((g) => g.term + "=" + g).join(",") : "");
      return this.id + ": " + this.set.filter((p2) => p2.pos > 0).join() + (this.defaultReduce ? \`
  always \${this.defaultReduce.name}(\${this.defaultReduce.parts.length})\` : actions.length ? "\\n  " + actions : "");
    }
    addActionInner(value, positions) {
      check: for (let i = 0; i < this.actions.length; i++) {
        let action = this.actions[i];
        if (action.term == value.term) {
          if (action.eq(value))
            return null;
          let fullPos = Pos.addOrigins(positions, this.set), actionFullPos = Pos.addOrigins(this.actionPositions[i], this.set);
          let conflicts = conflictsAt(fullPos), actionConflicts = conflictsAt(actionFullPos);
          let diff = compareRepeatPrec(fullPos, actionFullPos) || conflicts.precedence - actionConflicts.precedence;
          if (diff > 0) {
            this.actions.splice(i, 1);
            this.actionPositions.splice(i, 1);
            i--;
            continue check;
          } else if (diff < 0) {
            return null;
          } else if (conflicts.ambigGroups.some((g) => actionConflicts.ambigGroups.includes(g))) {
            continue check;
          } else {
            return action;
          }
        }
      }
      this.actions.push(value);
      this.actionPositions.push(positions);
      return null;
    }
    addAction(value, positions, context) {
      let conflict = this.addActionInner(value, positions);
      if (conflict) {
        let conflictPos = this.actionPositions[this.actions.indexOf(conflict)][0];
        let rules = [positions[0].rule.name, conflictPos.rule.name];
        if (context.conflicts.some((c) => c.rules.some((r) => rules.includes(r))))
          return;
        let error;
        if (conflict instanceof Shift)
          error = \`shift/reduce conflict between
  \${conflictPos}
and
  \${positions[0].rule}\`;
        else
          error = \`reduce/reduce conflict between
  \${conflictPos.rule}
and
  \${positions[0].rule}\`;
        error += \`
With input:
  \${positions[0].trail(70)} \\xB7 \${value.term} \\u2026\`;
        if (conflict instanceof Shift)
          error += findConflictShiftSource(positions[0], conflict.term, context.first);
        error += findConflictOrigin(conflictPos, positions[0]);
        context.conflicts.push(new Conflict2(error, rules));
      }
    }
    getGoto(term) {
      return this.goto.find((a) => a.term == term);
    }
    hasSet(set) {
      return eqSet(this.set, set);
    }
    actionsByTerm() {
      let result = this._actionsByTerm;
      if (!result) {
        this._actionsByTerm = result = /* @__PURE__ */ Object.create(null);
        for (let action of this.actions)
          (result[action.term.id] || (result[action.term.id] = [])).push(action);
      }
      return result;
    }
    finish() {
      if (this.actions.length) {
        let first = this.actions[0];
        if (first instanceof Reduce) {
          let { rule } = first;
          if (this.actions.every((a) => a instanceof Reduce && a.rule.sameReduce(rule)))
            this.defaultReduce = rule;
        }
      }
      this.actions.sort((a, b) => a.cmp(b));
      this.goto.sort((a, b) => a.cmp(b));
    }
    eq(other) {
      let dThis = this.defaultReduce, dOther = other.defaultReduce;
      if (dThis || dOther)
        return dThis && dOther ? dThis.sameReduce(dOther) : false;
      return this.skip == other.skip && this.tokenGroup == other.tokenGroup && eqSet(this.actions, other.actions) && eqSet(this.goto, other.goto);
    }
  };
  function closure(set, first) {
    let added = [], redo = [];
    function addFor(name, ahead, ambigAhead, skipAhead, via) {
      for (let rule of name.rules) {
        let add = added.find((a) => a.rule == rule);
        if (!add) {
          let existing = set.find((p2) => p2.pos == 0 && p2.rule == rule);
          add = existing ? new Pos(rule, 0, existing.ahead.slice(), existing.ambigAhead, existing.skipAhead, existing.via) : new Pos(rule, 0, [], none$1, skipAhead, via);
          added.push(add);
        }
        if (add.skipAhead != skipAhead)
          throw new GenError("Inconsistent skip sets after " + via.trail());
        add.ambigAhead = union(add.ambigAhead, ambigAhead);
        for (let term of ahead)
          if (!add.ahead.includes(term)) {
            add.ahead.push(term);
            if (add.rule.parts.length && !add.rule.parts[0].terminal)
              addTo(add, redo);
          }
      }
    }
    for (let pos of set) {
      let next = pos.next;
      if (next && !next.terminal)
        addFor(next, termsAhead(pos.rule, pos.pos, pos.ahead, first), pos.conflicts(pos.pos + 1).ambigGroups, pos.pos == pos.rule.parts.length - 1 ? pos.skipAhead : pos.rule.skip, pos);
    }
    while (redo.length) {
      let add = redo.pop();
      addFor(add.rule.parts[0], termsAhead(add.rule, 0, add.ahead, first), union(add.rule.conflicts[1].ambigGroups, add.rule.parts.length == 1 ? add.ambigAhead : none$1), add.rule.parts.length == 1 ? add.skipAhead : add.rule.skip, add);
    }
    let result = set.slice();
    for (let add of added) {
      add.ahead.sort((a, b) => a.hash - b.hash);
      add.finish();
      let origIndex = set.findIndex((p2) => p2.pos == 0 && p2.rule == add.rule);
      if (origIndex > -1)
        result[origIndex] = add;
      else
        result.push(add);
    }
    return result.sort((a, b) => a.cmp(b));
  }
  function addTo(value, array) {
    if (!array.includes(value))
      array.push(value);
  }
  function computeFirstSets(terms) {
    let table = /* @__PURE__ */ Object.create(null);
    for (let t of terms.terms)
      if (!t.terminal)
        table[t.name] = [];
    for (; ; ) {
      let change = false;
      for (let nt of terms.terms)
        if (!nt.terminal)
          for (let rule of nt.rules) {
            let set = table[nt.name];
            let found = false, startLen = set.length;
            for (let part of rule.parts) {
              found = true;
              if (part.terminal) {
                addTo(part, set);
              } else {
                for (let t of table[part.name]) {
                  if (t == null)
                    found = false;
                  else
                    addTo(t, set);
                }
              }
              if (found)
                break;
            }
            if (!found)
              addTo(null, set);
            if (set.length > startLen)
              change = true;
          }
      if (!change)
        return table;
    }
  }
  var Core = class {
    constructor(set, state) {
      this.set = set;
      this.state = state;
    }
  };
  var Conflict2 = class {
    constructor(error, rules) {
      this.error = error;
      this.rules = rules;
    }
  };
  function findConflictOrigin(a, b) {
    if (a.eqSimple(b))
      return "";
    function via(root, start) {
      let hist = [];
      for (let p2 = start.via; !p2.eqSimple(root); p2 = p2.via)
        hist.push(p2);
      if (!hist.length)
        return "";
      hist.unshift(start);
      return hist.reverse().map((p2, i) => "\\n" + "  ".repeat(i + 1) + (p2 == start ? "" : "via ") + p2).join("");
    }
    for (let p2 = a; p2; p2 = p2.via)
      for (let p22 = b; p22; p22 = p22.via) {
        if (p2.eqSimple(p22))
          return "\\nShared origin: " + p2 + via(p2, a) + via(p2, b);
      }
    return "";
  }
  function findConflictShiftSource(conflictPos, termAfter, first) {
    let pos = conflictPos, path = [];
    for (; ; ) {
      for (let i = pos.pos - 1; i >= 0; i--)
        path.push(pos.rule.parts[i]);
      if (!pos.via)
        break;
      pos = pos.via;
    }
    path.reverse();
    let seen = /* @__PURE__ */ new Set();
    function explore(pos2, i, hasMatch) {
      if (i == path.length && hasMatch && !pos2.next)
        return \`
The reduction of \${conflictPos.rule.name} is allowed before \${termAfter} because of this rule:
  \${hasMatch}\`;
      for (let next; next = pos2.next; ) {
        if (i < path.length && next == path[i]) {
          let inner = explore(pos2.advance(), i + 1, hasMatch);
          if (inner)
            return inner;
        }
        let after = pos2.rule.parts[pos2.pos + 1], match = pos2.pos + 1 == pos2.rule.parts.length ? hasMatch : null;
        if (after && (after.terminal ? after == termAfter : first[after.name].includes(termAfter)))
          match = pos2.advance();
        for (let rule of next.rules) {
          let hash2 = (rule.id << 5) + i + (match ? 555 : 0);
          if (!seen.has(hash2)) {
            seen.add(hash2);
            let inner = explore(new Pos(rule, 0, [], [], next, pos2), i, match);
            if (inner)
              return inner;
          }
        }
        if (!next.terminal && first[next.name].includes(null))
          pos2 = pos2.advance();
        else
          break;
      }
      return "";
    }
    return explore(pos, 0, null);
  }
  function buildFullAutomaton(terms, startTerms, first) {
    let states = [], statesBySetHash = {};
    let cores = {};
    let t0 = Date.now();
    function getState(core, top) {
      if (core.length == 0)
        return null;
      let coreHash = hashPositions(core), byHash = cores[coreHash];
      let skip;
      for (let pos of core) {
        if (!skip)
          skip = pos.skip;
        else if (skip != pos.skip)
          throw new GenError("Inconsistent skip sets after " + pos.trail());
      }
      if (byHash) {
        for (let known of byHash)
          if (eqSet(core, known.set)) {
            if (known.state.skip != skip)
              throw new GenError("Inconsistent skip sets after " + known.set[0].trail());
            return known.state;
          }
      }
      let set = closure(core, first);
      let hash2 = hashPositions(set), forHash = statesBySetHash[hash2] || (statesBySetHash[hash2] = []);
      let found;
      if (!top) {
        for (let state of forHash)
          if (state.hasSet(set))
            found = state;
      }
      if (!found) {
        found = new State2(states.length, set, 0, skip, hash2, top);
        forHash.push(found);
        states.push(found);
        if (timing && states.length % 500 == 0)
          console.log(\`\${states.length} states after \${((Date.now() - t0) / 1e3).toFixed(2)}s\`);
      }
      (cores[coreHash] || (cores[coreHash] = [])).push(new Core(core, found));
      return found;
    }
    for (const startTerm of startTerms) {
      const startSkip = startTerm.rules.length ? startTerm.rules[0].skip : terms.names["%noskip"];
      getState(startTerm.rules.map((rule) => new Pos(rule, 0, [terms.eof], none$1, startSkip, null).finish()), startTerm);
    }
    let conflicts = new ConflictContext(first);
    for (let filled = 0; filled < states.length; filled++) {
      let state = states[filled];
      let byTerm = [], byTermPos = [], atEnd = [];
      for (let pos of state.set) {
        if (pos.pos == pos.rule.parts.length) {
          if (!pos.rule.name.top)
            atEnd.push(pos);
        } else {
          let next = pos.rule.parts[pos.pos];
          let index = byTerm.indexOf(next);
          if (index < 0) {
            byTerm.push(next);
            byTermPos.push([pos]);
          } else {
            byTermPos[index].push(pos);
          }
        }
      }
      for (let i = 0; i < byTerm.length; i++) {
        let term = byTerm[i], positions = byTermPos[i].map((p2) => p2.advance());
        if (term.terminal) {
          let set = applyCut(positions);
          let next = getState(set);
          if (next)
            state.addAction(new Shift(term, next), byTermPos[i], conflicts);
        } else {
          let goto = getState(positions);
          if (goto)
            state.goto.push(new Shift(term, goto));
        }
      }
      let replaced = false;
      for (let pos of atEnd)
        for (let ahead of pos.ahead) {
          let count = state.actions.length;
          state.addAction(new Reduce(ahead, pos.rule), [pos], conflicts);
          if (state.actions.length == count)
            replaced = true;
        }
      if (replaced)
        for (let i = 0; i < state.goto.length; i++) {
          let start = first[state.goto[i].term.name];
          if (!start.some((term) => state.actions.some((a) => a.term == term && a instanceof Shift)))
            state.goto.splice(i--, 1);
        }
    }
    if (conflicts.conflicts.length)
      throw new GenError(conflicts.conflicts.map((c) => c.error).join("\\n\\n"));
    for (let state of states)
      state.finish();
    if (timing)
      console.log(\`\${states.length} states total.\`);
    return states;
  }
  function applyCut(set) {
    let found = null, cut = 1;
    for (let pos of set) {
      let value = pos.rule.conflicts[pos.pos - 1].cut;
      if (value < cut)
        continue;
      if (!found || value > cut) {
        cut = value;
        found = [];
      }
      found.push(pos);
    }
    return found || set;
  }
  function canMerge(a, b, mapping) {
    for (let goto of a.goto)
      for (let other of b.goto) {
        if (goto.term == other.term && mapping[goto.target.id] != mapping[other.target.id])
          return false;
      }
    let byTerm = b.actionsByTerm();
    for (let action of a.actions) {
      let setB = byTerm[action.term.id];
      if (setB && setB.some((other) => !other.matches(action, mapping))) {
        if (setB.length == 1)
          return false;
        let setA = a.actionsByTerm()[action.term.id];
        if (setA.length != setB.length || setA.some((a1) => !setB.some((a2) => a1.matches(a2, mapping))))
          return false;
      }
    }
    return true;
  }
  function mergeStates(states, mapping) {
    let newStates = [];
    for (let state of states) {
      let newID = mapping[state.id];
      if (!newStates[newID]) {
        newStates[newID] = new State2(newID, state.set, 0, state.skip, state.hash, state.startRule);
        newStates[newID].tokenGroup = state.tokenGroup;
        newStates[newID].defaultReduce = state.defaultReduce;
      }
    }
    for (let state of states) {
      let newID = mapping[state.id], target = newStates[newID];
      target.flags |= state.flags;
      for (let i = 0; i < state.actions.length; i++) {
        let action = state.actions[i].map(mapping, newStates);
        if (!target.actions.some((a) => a.eq(action))) {
          target.actions.push(action);
          target.actionPositions.push(state.actionPositions[i]);
        }
      }
      for (let goto of state.goto) {
        let mapped = goto.map(mapping, newStates);
        if (!target.goto.some((g) => g.eq(mapped)))
          target.goto.push(mapped);
      }
    }
    return newStates;
  }
  var Group = class {
    constructor(origin, member) {
      this.origin = origin;
      this.members = [member];
    }
  };
  function samePosSet(a, b) {
    if (a.length != b.length)
      return false;
    for (let i = 0; i < a.length; i++)
      if (!a[i].eqSimple(b[i]))
        return false;
    return true;
  }
  function collapseAutomaton(states) {
    let mapping = [], groups = [];
    assignGroups: for (let i = 0; i < states.length; i++) {
      let state = states[i];
      if (!state.startRule)
        for (let j = 0; j < groups.length; j++) {
          let group = groups[j], other = states[group.members[0]];
          if (state.tokenGroup == other.tokenGroup && state.skip == other.skip && !other.startRule && samePosSet(state.set, other.set)) {
            group.members.push(i);
            mapping.push(j);
            continue assignGroups;
          }
        }
      mapping.push(groups.length);
      groups.push(new Group(groups.length, i));
    }
    function spill(groupIndex, index) {
      let group = groups[groupIndex], state = states[group.members[index]];
      let pop = group.members.pop();
      if (index != group.members.length)
        group.members[index] = pop;
      for (let i = groupIndex + 1; i < groups.length; i++) {
        mapping[state.id] = i;
        if (groups[i].origin == group.origin && groups[i].members.every((id) => canMerge(state, states[id], mapping))) {
          groups[i].members.push(state.id);
          return;
        }
      }
      mapping[state.id] = groups.length;
      groups.push(new Group(group.origin, state.id));
    }
    for (let pass = 1; ; pass++) {
      let conflicts = false, t0 = Date.now();
      for (let g = 0, startLen = groups.length; g < startLen; g++) {
        let group = groups[g];
        for (let i = 0; i < group.members.length - 1; i++) {
          for (let j = i + 1; j < group.members.length; j++) {
            let idA = group.members[i], idB = group.members[j];
            if (!canMerge(states[idA], states[idB], mapping)) {
              conflicts = true;
              spill(g, j--);
            }
          }
        }
      }
      if (timing)
        console.log(\`Collapse pass \${pass}\${conflicts ? \`\` : \`, done\`} (\${((Date.now() - t0) / 1e3).toFixed(2)}s)\`);
      if (!conflicts)
        return mergeStates(states, mapping);
    }
  }
  function mergeIdentical(states) {
    for (let pass = 1; ; pass++) {
      let mapping = [], didMerge = false, t0 = Date.now();
      let newStates = [];
      for (let i = 0; i < states.length; i++) {
        let state = states[i];
        let match = newStates.findIndex((s) => state.eq(s));
        if (match < 0) {
          mapping[i] = newStates.length;
          newStates.push(state);
        } else {
          mapping[i] = match;
          didMerge = true;
          let other = newStates[match], add = null;
          for (let pos of state.set)
            if (!other.set.some((p2) => p2.eqSimple(pos)))
              (add || (add = [])).push(pos);
          if (add)
            other.set = add.concat(other.set).sort((a, b) => a.cmp(b));
        }
      }
      if (timing)
        console.log(\`Merge identical pass \${pass}\${didMerge ? "" : ", done"} (\${((Date.now() - t0) / 1e3).toFixed(2)}s)\`);
      if (!didMerge)
        return states;
      for (let state of newStates)
        if (!state.defaultReduce) {
          state.actions = state.actions.map((a) => a.map(mapping, newStates));
          state.goto = state.goto.map((a) => a.map(mapping, newStates));
        }
      for (let i = 0; i < newStates.length; i++)
        newStates[i].id = i;
      states = newStates;
    }
  }
  var none$1 = [];
  function finishAutomaton(full) {
    return mergeIdentical(collapseAutomaton(full));
  }
  function digitToChar(digit) {
    let ch = digit + 32;
    if (ch >= 34)
      ch++;
    if (ch >= 92)
      ch++;
    return String.fromCharCode(ch);
  }
  function encode(value, max = 65535) {
    if (value > max)
      throw new Error("Trying to encode a number that's too big: " + value);
    if (value == 65535)
      return String.fromCharCode(
        126
        /* Encode.BigValCode */
      );
    let result = "";
    for (let first = 46; ; first = 0) {
      let low = value % 46, rest = value - low;
      result = digitToChar(low + first) + result;
      if (rest == 0)
        break;
      value = rest / 46;
    }
    return result;
  }
  function encodeArray(values, max = 65535) {
    let result = '"' + encode(values.length, 4294967295);
    for (let i = 0; i < values.length; i++)
      result += encode(values[i], max);
    result += '"';
    return result;
  }
  var none = [];
  var Parts = class _Parts {
    constructor(terms, conflicts) {
      this.terms = terms;
      this.conflicts = conflicts;
    }
    concat(other) {
      if (this == _Parts.none)
        return other;
      if (other == _Parts.none)
        return this;
      let conflicts = null;
      if (this.conflicts || other.conflicts) {
        conflicts = this.conflicts ? this.conflicts.slice() : this.ensureConflicts();
        let otherConflicts = other.ensureConflicts();
        conflicts[conflicts.length - 1] = conflicts[conflicts.length - 1].join(otherConflicts[0]);
        for (let i = 1; i < otherConflicts.length; i++)
          conflicts.push(otherConflicts[i]);
      }
      return new _Parts(this.terms.concat(other.terms), conflicts);
    }
    withConflicts(pos, conflicts) {
      if (conflicts == Conflicts.none)
        return this;
      let array = this.conflicts ? this.conflicts.slice() : this.ensureConflicts();
      array[pos] = array[pos].join(conflicts);
      return new _Parts(this.terms, array);
    }
    ensureConflicts() {
      if (this.conflicts)
        return this.conflicts;
      let empty = [];
      for (let i = 0; i <= this.terms.length; i++)
        empty.push(Conflicts.none);
      return empty;
    }
  };
  Parts.none = new Parts(none, null);
  function p(...terms) {
    return new Parts(terms, null);
  }
  var BuiltRule = class {
    constructor(id, args, term) {
      this.id = id;
      this.args = args;
      this.term = term;
    }
    matches(expr) {
      return this.id == expr.id.name && exprsEq(expr.args, this.args);
    }
    matchesRepeat(expr) {
      return this.id == "+" && exprEq(expr.expr, this.args[0]);
    }
  };
  var Builder = class {
    constructor(text, options) {
      this.options = options;
      this.terms = new TermSet();
      this.specialized = /* @__PURE__ */ Object.create(null);
      this.tokenOrigins = /* @__PURE__ */ Object.create(null);
      this.rules = [];
      this.built = [];
      this.ruleNames = /* @__PURE__ */ Object.create(null);
      this.namespaces = /* @__PURE__ */ Object.create(null);
      this.namedTerms = /* @__PURE__ */ Object.create(null);
      this.termTable = /* @__PURE__ */ Object.create(null);
      this.knownProps = /* @__PURE__ */ Object.create(null);
      this.dynamicRulePrecedences = [];
      this.definedGroups = [];
      this.astRules = [];
      this.currentSkip = [];
      time("Parse", () => {
        this.input = new Input(text, options.fileName);
        this.ast = this.input.parse();
      });
      let NP = NodeProp;
      for (let prop in NP) {
        if (NP[prop] instanceof NodeProp && !NP[prop].perNode)
          this.knownProps[prop] = { prop: NP[prop], source: { name: prop, from: null } };
      }
      for (let prop of this.ast.externalProps) {
        this.knownProps[prop.id.name] = {
          prop: this.options.externalProp ? this.options.externalProp(prop.id.name) : new NodeProp(),
          source: { name: prop.externalID.name, from: prop.source }
        };
      }
      this.dialects = this.ast.dialects.map((d) => d.name);
      this.tokens = new MainTokenSet(this, this.ast.tokens);
      this.localTokens = this.ast.localTokens.map((g) => new LocalTokenSet(this, g));
      this.externalTokens = this.ast.externalTokens.map((ext) => new ExternalTokenSet(this, ext));
      this.externalSpecializers = this.ast.externalSpecializers.map((decl) => new ExternalSpecializer(this, decl));
      time("Build rules", () => {
        let noSkip = this.newName("%noskip", true);
        this.defineRule(noSkip, []);
        let mainSkip = this.ast.mainSkip ? this.newName("%mainskip", true) : noSkip;
        let scopedSkip = [], topRules = [];
        for (let rule of this.ast.rules)
          this.astRules.push({ skip: mainSkip, rule });
        for (let rule of this.ast.topRules)
          topRules.push({ skip: mainSkip, rule });
        for (let scoped of this.ast.scopedSkip) {
          let skip = noSkip, found = this.ast.scopedSkip.findIndex((sc, i) => i < scopedSkip.length && exprEq(sc.expr, scoped.expr));
          if (found > -1)
            skip = scopedSkip[found];
          else if (this.ast.mainSkip && exprEq(scoped.expr, this.ast.mainSkip))
            skip = mainSkip;
          else if (!isEmpty(scoped.expr))
            skip = this.newName("%skip", true);
          scopedSkip.push(skip);
          for (let rule of scoped.rules)
            this.astRules.push({ skip, rule });
          for (let rule of scoped.topRules)
            topRules.push({ skip, rule });
        }
        for (let { rule } of this.astRules) {
          this.unique(rule.id);
        }
        this.currentSkip.push(noSkip);
        this.skipRules = mainSkip == noSkip ? [mainSkip] : [noSkip, mainSkip];
        if (mainSkip != noSkip)
          this.defineRule(mainSkip, this.normalizeExpr(this.ast.mainSkip));
        for (let i = 0; i < this.ast.scopedSkip.length; i++) {
          let skip = scopedSkip[i];
          if (!this.skipRules.includes(skip)) {
            this.skipRules.push(skip);
            if (skip != noSkip)
              this.defineRule(skip, this.normalizeExpr(this.ast.scopedSkip[i].expr));
          }
        }
        this.currentSkip.pop();
        for (let { rule, skip } of topRules.sort((a, b) => a.rule.start - b.rule.start)) {
          this.unique(rule.id);
          this.used(rule.id.name);
          this.currentSkip.push(skip);
          let { name, props } = this.nodeInfo(rule.props, "a", rule.id.name, none, none, rule.expr);
          let term = this.terms.makeTop(name, props);
          this.namedTerms[name] = term;
          this.defineRule(term, this.normalizeExpr(rule.expr));
          this.currentSkip.pop();
        }
        for (let ext of this.externalSpecializers)
          ext.finish();
        for (let { skip, rule } of this.astRules) {
          if (this.ruleNames[rule.id.name] && isExported(rule) && !rule.params.length) {
            this.buildRule(rule, [], skip, false);
            if (rule.expr instanceof SequenceExpression && rule.expr.exprs.length == 0)
              this.used(rule.id.name);
          }
        }
      });
      for (let name in this.ruleNames) {
        let value = this.ruleNames[name];
        if (value)
          this.warn(\`Unused rule '\${value.name}'\`, value.start);
      }
      this.tokens.takePrecedences();
      this.tokens.takeConflicts();
      for (let lt of this.localTokens)
        lt.takePrecedences();
      for (let { name, group, rule } of this.definedGroups)
        this.defineGroup(name, group, rule);
      this.checkGroups();
    }
    unique(id) {
      if (id.name in this.ruleNames)
        this.raise(\`Duplicate definition of rule '\${id.name}'\`, id.start);
      this.ruleNames[id.name] = id;
    }
    used(name) {
      this.ruleNames[name] = null;
    }
    newName(base, nodeName = null, props = {}) {
      for (let i = nodeName ? 0 : 1; ; i++) {
        let name = i ? \`\${base}-\${i}\` : base;
        if (!this.terms.names[name])
          return this.terms.makeNonTerminal(name, nodeName === true ? null : nodeName, props);
      }
    }
    prepareParser() {
      let rules = time("Simplify rules", () => simplifyRules(this.rules, [
        ...this.skipRules,
        ...this.terms.tops
      ]));
      let { nodeTypes, names: termNames, minRepeatTerm, maxTerm } = this.terms.finish(rules);
      for (let prop in this.namedTerms)
        this.termTable[prop] = this.namedTerms[prop].id;
      if (/\\bgrammar\\b/.test(verbose2))
        console.log(rules.join("\\n"));
      let startTerms = this.terms.tops.slice();
      let first = computeFirstSets(this.terms);
      let skipInfo = this.skipRules.map((name, id) => {
        let skip = [], startTokens = [], rules2 = [];
        for (let rule of name.rules) {
          if (!rule.parts.length)
            continue;
          let start = rule.parts[0];
          for (let t of start.terminal ? [start] : first[start.name] || [])
            if (t && !startTokens.includes(t))
              startTokens.push(t);
          if (start.terminal && rule.parts.length == 1 && !rules2.some((r) => r != rule && r.parts[0] == start))
            skip.push(start);
          else
            rules2.push(rule);
        }
        name.rules = rules2;
        if (rules2.length)
          startTerms.push(name);
        return { skip, rule: rules2.length ? name : null, startTokens, id };
      });
      let fullTable = time("Build full automaton", () => buildFullAutomaton(this.terms, startTerms, first));
      let localTokens = this.localTokens.map((grp, i) => grp.buildLocalGroup(fullTable, skipInfo, i));
      let { tokenGroups, tokenPrec, tokenData } = time("Build token groups", () => this.tokens.buildTokenGroups(fullTable, skipInfo, localTokens.length));
      for (let ext of this.externalTokens)
        ext.checkConflicts(fullTable, skipInfo);
      let table = time("Finish automaton", () => finishAutomaton(fullTable));
      let skipState = findSkipStates(table, this.terms.tops);
      if (/\\blr\\b/.test(verbose2))
        console.log(table.join("\\n"));
      let specialized = [];
      for (let ext of this.externalSpecializers)
        specialized.push(ext);
      for (let name in this.specialized)
        specialized.push({ token: this.terms.names[name], table: buildSpecializeTable(this.specialized[name]) });
      let tokStart = (tokenizer) => {
        if (tokenizer instanceof ExternalTokenSet)
          return tokenizer.ast.start;
        return this.tokens.ast ? this.tokens.ast.start : -1;
      };
      let tokenizers = tokenGroups.concat(this.externalTokens).sort((a, b) => tokStart(a) - tokStart(b)).concat(localTokens);
      let data = new DataBuilder();
      let skipData = skipInfo.map((info) => {
        let actions = [];
        for (let term of info.skip)
          actions.push(term.id, 0, 262144 >> 16);
        if (info.rule) {
          let state = table.find((s) => s.startRule == info.rule);
          for (let action of state.actions)
            actions.push(action.term.id, state.id, 131072 >> 16);
        }
        actions.push(
          65535,
          0
          /* Seq.Done */
        );
        return data.storeArray(actions);
      });
      let states = time("Finish states", () => {
        let states2 = new Uint32Array(
          table.length * 6
          /* ParseState.Size */
        );
        let forceReductions = this.computeForceReductions(table, skipInfo);
        let finishCx = new FinishStateContext(tokenizers, data, states2, skipData, skipInfo, table, this);
        for (let s of table)
          finishCx.finish(s, skipState(s.id), forceReductions[s.id]);
        return states2;
      });
      let dialects = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < this.dialects.length; i++)
        dialects[this.dialects[i]] = data.storeArray((this.tokens.byDialect[i] || none).map((t) => t.id).concat(
          65535
          /* Seq.End */
        ));
      let dynamicPrecedences = null;
      if (this.dynamicRulePrecedences.length) {
        dynamicPrecedences = /* @__PURE__ */ Object.create(null);
        for (let { rule, prec } of this.dynamicRulePrecedences)
          dynamicPrecedences[rule.id] = prec;
      }
      let topRules = /* @__PURE__ */ Object.create(null);
      for (let term of this.terms.tops)
        topRules[term.nodeName] = [table.find((state) => state.startRule == term).id, term.id];
      let precTable = data.storeArray(tokenPrec.concat(
        65535
        /* Seq.End */
      ));
      let { nodeProps, skippedTypes } = this.gatherNodeProps(nodeTypes);
      return {
        states,
        stateData: data.finish(),
        goto: computeGotoTable(table),
        nodeNames: nodeTypes.filter((t) => t.id < minRepeatTerm).map((t) => t.nodeName).join(" "),
        nodeProps,
        skippedTypes,
        maxTerm,
        repeatNodeCount: nodeTypes.length - minRepeatTerm,
        tokenizers,
        tokenData,
        topRules,
        dialects,
        dynamicPrecedences,
        specialized,
        tokenPrec: precTable,
        termNames
      };
    }
    getParser() {
      let { states, stateData, goto, nodeNames, nodeProps: rawNodeProps, skippedTypes, maxTerm, repeatNodeCount, tokenizers, tokenData, topRules, dialects, dynamicPrecedences, specialized: rawSpecialized, tokenPrec, termNames } = this.prepareParser();
      let specialized = rawSpecialized.map((v) => {
        if (v instanceof ExternalSpecializer) {
          let ext = this.options.externalSpecializer(v.ast.id.name, this.termTable);
          return {
            term: v.term.id,
            get: (value, stack) => ext(value, stack) << 1 | (v.ast.type == "extend" ? 1 : 0),
            external: ext,
            extend: v.ast.type == "extend"
          };
        } else {
          return { term: v.token.id, get: (value) => v.table[value] || -1 };
        }
      });
      return LRParser.deserialize({
        version: 14,
        states,
        stateData,
        goto,
        nodeNames,
        maxTerm,
        repeatNodeCount,
        nodeProps: rawNodeProps.map(({ prop, terms }) => [this.knownProps[prop].prop, ...terms]),
        propSources: !this.options.externalPropSource ? void 0 : this.ast.externalPropSources.map((s) => this.options.externalPropSource(s.id.name)),
        skippedNodes: skippedTypes,
        tokenData,
        tokenizers: tokenizers.map((tok) => tok.create()),
        context: !this.ast.context ? void 0 : typeof this.options.contextTracker == "function" ? this.options.contextTracker(this.termTable) : this.options.contextTracker,
        topRules,
        dialects,
        dynamicPrecedences,
        specialized,
        tokenPrec,
        termNames
      });
    }
    getParserFile() {
      let { states, stateData, goto, nodeNames, nodeProps: rawNodeProps, skippedTypes, maxTerm, repeatNodeCount, tokenizers: rawTokenizers, tokenData, topRules, dialects: rawDialects, dynamicPrecedences, specialized: rawSpecialized, tokenPrec, termNames } = this.prepareParser();
      let mod = this.options.moduleStyle || "es";
      let gen = "// This file was generated by lezer-generator. You probably shouldn't edit it.\\n", head = gen;
      let imports = {}, imported = /* @__PURE__ */ Object.create(null);
      let defined = /* @__PURE__ */ Object.create(null);
      for (let word2 of KEYWORDS)
        defined[word2] = true;
      let exportName = this.options.exportName || "parser";
      defined[exportName] = true;
      let getName = (prefix) => {
        for (let i = 0; ; i++) {
          let id = prefix + (i ? "_" + i : "");
          if (!defined[id])
            return id;
        }
      };
      let importName = (name, source, prefix = name) => {
        let spec = name + " from " + source;
        if (imported[spec])
          return imported[spec];
        let src = JSON.stringify(source), varName = name;
        if (name in defined) {
          varName = getName(prefix);
          name += \`\${mod == "cjs" ? ":" : " as"} \${varName}\`;
        }
        defined[varName] = true;
        (imports[src] || (imports[src] = [])).push(name);
        return imported[spec] = varName;
      };
      let lrParser = importName("LRParser", "@lezer/lr");
      let tokenizers = rawTokenizers.map((tok) => tok.createSource(importName));
      let context = this.ast.context ? importName(this.ast.context.id.name, this.ast.context.source) : null;
      let nodeProps = rawNodeProps.map(({ prop, terms: terms2 }) => {
        let { source } = this.knownProps[prop];
        let propID = source.from ? importName(source.name, source.from) : JSON.stringify(source.name);
        return \`[\${propID}, \${terms2.map(serializePropValue).join(",")}]\`;
      });
      function specializationTableString(table) {
        return "{__proto__:null," + Object.keys(table).map((key) => \`\${/^(\\d+|[a-zA-Z_]\\w*)$/.test(key) ? key : JSON.stringify(key)}:\${table[key]}\`).join(", ") + "}";
      }
      let specHead = "";
      let specialized = rawSpecialized.map((v) => {
        if (v instanceof ExternalSpecializer) {
          let name = importName(v.ast.id.name, v.ast.source);
          let ts = this.options.typeScript ? ": any" : "";
          return \`{term: \${v.term.id}, get: (value\${ts}, stack\${ts}) => (\${name}(value, stack) << 1)\${v.ast.type == "extend" ? \` | \${1}\` : ""}, external: \${name}\${v.ast.type == "extend" ? ", extend: true" : ""}}\`;
        } else {
          let tableName = getName("spec_" + v.token.name.replace(/\\W/g, ""));
          defined[tableName] = true;
          specHead += \`const \${tableName} = \${specializationTableString(v.table)}
\`;
          let ts = this.options.typeScript ? \`: keyof typeof \${tableName}\` : "";
          return \`{term: \${v.token.id}, get: (value\${ts}) => \${tableName}[value] || -1}\`;
        }
      });
      let propSources = this.ast.externalPropSources.map((s) => importName(s.id.name, s.source));
      for (let source in imports) {
        if (mod == "cjs")
          head += \`const {\${imports[source].join(", ")}} = require(\${source})
\`;
        else
          head += \`import {\${imports[source].join(", ")}} from \${source}
\`;
      }
      head += specHead;
      function serializePropValue(value) {
        return typeof value != "string" || /^(true|false|\\d+(\\.\\d+)?|\\.\\d+)$/.test(value) ? value : JSON.stringify(value);
      }
      let dialects = Object.keys(rawDialects).map((d) => \`\${d}: \${rawDialects[d]}\`);
      let parserStr = \`\${lrParser}.deserialize({
  version: \${14},
  states: \${encodeArray(states, 4294967295)},
  stateData: \${encodeArray(stateData)},
  goto: \${encodeArray(goto)},
  nodeNames: \${JSON.stringify(nodeNames)},
  maxTerm: \${maxTerm}\${context ? \`,
  context: \${context}\` : ""}\${nodeProps.length ? \`,
  nodeProps: [
    \${nodeProps.join(",\\n    ")}
  ]\` : ""}\${propSources.length ? \`,
  propSources: [\${propSources.join()}]\` : ""}\${skippedTypes.length ? \`,
  skippedNodes: \${JSON.stringify(skippedTypes)}\` : ""},
  repeatNodeCount: \${repeatNodeCount},
  tokenData: \${encodeArray(tokenData)},
  tokenizers: [\${tokenizers.join(", ")}],
  topRules: \${JSON.stringify(topRules)}\${dialects.length ? \`,
  dialects: {\${dialects.join(", ")}}\` : ""}\${dynamicPrecedences ? \`,
  dynamicPrecedences: \${JSON.stringify(dynamicPrecedences)}\` : ""}\${specialized.length ? \`,
  specialized: [\${specialized.join(",")}]\` : ""},
  tokenPrec: \${tokenPrec}\${this.options.includeNames ? \`,
  termNames: \${JSON.stringify(termNames)}\` : ""}
})\`;
      let terms = [];
      for (let name in this.termTable) {
        let id = name;
        if (KEYWORDS.includes(id))
          for (let i = 1; ; i++) {
            id = "_".repeat(i) + name;
            if (!(id in this.termTable))
              break;
          }
        else if (!/^[\\w$]+$/.test(name)) {
          continue;
        }
        terms.push(\`\${id}\${mod == "cjs" ? ":" : " ="} \${this.termTable[name]}\`);
      }
      for (let id = 0; id < this.dialects.length; id++)
        terms.push(\`Dialect_\${this.dialects[id]}\${mod == "cjs" ? ":" : " ="} \${id}\`);
      return {
        parser: head + (mod == "cjs" ? \`exports.\${exportName} = \${parserStr}
\` : \`export const \${exportName} = \${parserStr}
\`),
        terms: mod == "cjs" ? \`\${gen}module.exports = {
  \${terms.join(",\\n  ")}
}\` : \`\${gen}export const
  \${terms.join(",\\n  ")}
\`
      };
    }
    gatherNonSkippedNodes() {
      let seen = /* @__PURE__ */ Object.create(null);
      let work = [];
      let add = (term) => {
        if (!seen[term.id]) {
          seen[term.id] = true;
          work.push(term);
        }
      };
      this.terms.tops.forEach(add);
      for (let i = 0; i < work.length; i++) {
        for (let rule of work[i].rules)
          for (let part of rule.parts)
            add(part);
      }
      return seen;
    }
    gatherNodeProps(nodeTypes) {
      let notSkipped = this.gatherNonSkippedNodes(), skippedTypes = [];
      let nodeProps = [];
      for (let type of nodeTypes) {
        if (!notSkipped[type.id] && !type.error)
          skippedTypes.push(type.id);
        for (let prop in type.props) {
          let known = this.knownProps[prop];
          if (!known)
            throw new GenError("No known prop type for " + prop);
          if (known.source.from == null && (known.source.name == "repeated" || known.source.name == "error"))
            continue;
          let rec = nodeProps.find((r) => r.prop == prop);
          if (!rec)
            nodeProps.push(rec = { prop, values: {} });
          (rec.values[type.props[prop]] || (rec.values[type.props[prop]] = [])).push(type.id);
        }
      }
      return {
        nodeProps: nodeProps.map(({ prop, values }) => {
          let terms = [];
          for (let val in values) {
            let ids2 = values[val];
            if (ids2.length == 1) {
              terms.push(ids2[0], val);
            } else {
              terms.push(-ids2.length);
              for (let id of ids2)
                terms.push(id);
              terms.push(val);
            }
          }
          return { prop, terms };
        }),
        skippedTypes
      };
    }
    makeTerminal(name, tag, props) {
      return this.terms.makeTerminal(this.terms.uniqueName(name), tag, props);
    }
    computeForceReductions(states, skipInfo) {
      let reductions = [];
      let candidates = [];
      let gotoEdges = /* @__PURE__ */ Object.create(null);
      for (let state of states) {
        reductions.push(0);
        for (let edge of state.goto) {
          let array = gotoEdges[edge.term.id] || (gotoEdges[edge.term.id] = []);
          let found = array.find((o) => o.target == edge.target.id);
          if (found)
            found.parents.push(state.id);
          else
            array.push({ parents: [state.id], target: edge.target.id });
        }
        candidates[state.id] = state.set.filter((pos) => pos.pos > 0 && !pos.rule.name.top).sort((a, b) => b.pos - a.pos || a.rule.parts.length - b.rule.parts.length);
      }
      let length1Reductions = /* @__PURE__ */ Object.create(null);
      function createsCycle(term, startState, parents = null) {
        let edges = gotoEdges[term];
        if (!edges)
          return false;
        return edges.some((val) => {
          let parentIntersection = parents ? parents.filter((id) => val.parents.includes(id)) : val.parents;
          if (parentIntersection.length == 0)
            return false;
          if (val.target == startState)
            return true;
          let found = length1Reductions[val.target];
          return found != null && createsCycle(found, startState, parentIntersection);
        });
      }
      for (let state of states) {
        if (state.defaultReduce && state.defaultReduce.parts.length > 0) {
          reductions[state.id] = reduceAction(state.defaultReduce, skipInfo);
          if (state.defaultReduce.parts.length == 1)
            length1Reductions[state.id] = state.defaultReduce.name.id;
        }
      }
      for (let setSize = 1; ; setSize++) {
        let done = true;
        for (let state of states) {
          if (state.defaultReduce)
            continue;
          let set = candidates[state.id];
          if (set.length != setSize) {
            if (set.length > setSize)
              done = false;
            continue;
          }
          for (let pos of set) {
            if (pos.pos != 1 || !createsCycle(pos.rule.name.id, state.id)) {
              reductions[state.id] = reduceAction(pos.rule, skipInfo, pos.pos);
              if (pos.pos == 1)
                length1Reductions[state.id] = pos.rule.name.id;
              break;
            }
          }
        }
        if (done)
          break;
      }
      return reductions;
    }
    substituteArgs(expr, args, params) {
      if (args.length == 0)
        return expr;
      return expr.walk((expr2) => {
        let found;
        if (expr2 instanceof NameExpression && (found = params.findIndex((p2) => p2.name == expr2.id.name)) > -1) {
          let arg = args[found];
          if (expr2.args.length) {
            if (arg instanceof NameExpression && !arg.args.length)
              return new NameExpression(expr2.start, arg.id, expr2.args);
            this.raise(\`Passing arguments to a parameter that already has arguments\`, expr2.start);
          }
          return arg;
        } else if (expr2 instanceof InlineRuleExpression) {
          let r = expr2.rule, props = this.substituteArgsInProps(r.props, args, params);
          return props == r.props ? expr2 : new InlineRuleExpression(expr2.start, new RuleDeclaration(r.start, r.id, props, r.params, r.expr));
        } else if (expr2 instanceof SpecializeExpression) {
          let props = this.substituteArgsInProps(expr2.props, args, params);
          return props == expr2.props ? expr2 : new SpecializeExpression(expr2.start, expr2.type, props, expr2.token, expr2.content);
        }
        return expr2;
      });
    }
    substituteArgsInProps(props, args, params) {
      let substituteInValue = (value) => {
        let result2 = value;
        for (let i = 0; i < value.length; i++) {
          let part = value[i];
          if (!part.name)
            continue;
          let found = params.findIndex((p2) => p2.name == part.name);
          if (found < 0)
            continue;
          if (result2 == value)
            result2 = value.slice();
          let expr = args[found];
          if (expr instanceof NameExpression && !expr.args.length)
            result2[i] = new PropPart(part.start, expr.id.name, null);
          else if (expr instanceof LiteralExpression)
            result2[i] = new PropPart(part.start, expr.value, null);
          else
            this.raise(\`Trying to interpolate expression '\${expr}' into a prop\`, part.start);
        }
        return result2;
      };
      let result = props;
      for (let i = 0; i < props.length; i++) {
        let prop = props[i], value = substituteInValue(prop.value);
        if (value != prop.value) {
          if (result == props)
            result = props.slice();
          result[i] = new Prop(prop.start, prop.at, prop.name, value);
        }
      }
      return result;
    }
    conflictsFor(markers) {
      let here = Conflicts.none, atEnd = Conflicts.none;
      for (let marker of markers) {
        if (marker.type == "ambig") {
          here = here.join(new Conflicts(0, [marker.id.name]));
        } else {
          let precs = this.ast.precedences;
          let index = precs ? precs.items.findIndex((item) => item.id.name == marker.id.name) : -1;
          if (index < 0)
            this.raise(\`Reference to unknown precedence: '\${marker.id.name}'\`, marker.id.start);
          let prec = precs.items[index], value = precs.items.length - index;
          if (prec.type == "cut") {
            here = here.join(new Conflicts(0, none, value));
          } else {
            here = here.join(new Conflicts(value << 2));
            atEnd = atEnd.join(new Conflicts((value << 2) + (prec.type == "left" ? 1 : prec.type == "right" ? -1 : 0)));
          }
        }
      }
      return { here, atEnd };
    }
    raise(message, pos = 1) {
      return this.input.raise(message, pos);
    }
    warn(message, pos = -1) {
      let msg = this.input.message(message, pos);
      if (this.options.warn)
        this.options.warn(msg);
      else
        console.warn(msg);
    }
    defineRule(name, choices) {
      let skip = this.currentSkip[this.currentSkip.length - 1];
      for (let choice of choices)
        this.rules.push(new Rule(name, choice.terms, choice.ensureConflicts(), skip));
    }
    resolve(expr) {
      for (let built of this.built)
        if (built.matches(expr))
          return [p(built.term)];
      let found = this.tokens.getToken(expr);
      if (found)
        return [p(found)];
      for (let grp of this.localTokens) {
        let found2 = grp.getToken(expr);
        if (found2)
          return [p(found2)];
      }
      for (let ext of this.externalTokens) {
        let found2 = ext.getToken(expr);
        if (found2)
          return [p(found2)];
      }
      for (let ext of this.externalSpecializers) {
        let found2 = ext.getToken(expr);
        if (found2)
          return [p(found2)];
      }
      let known = this.astRules.find((r) => r.rule.id.name == expr.id.name);
      if (!known)
        return this.raise(\`Reference to undefined rule '\${expr.id.name}'\`, expr.start);
      if (known.rule.params.length != expr.args.length)
        this.raise(\`Wrong number or arguments for '\${expr.id.name}'\`, expr.start);
      this.used(known.rule.id.name);
      return [p(this.buildRule(known.rule, expr.args, known.skip))];
    }
    // For tree-balancing reasons, repeat expressions X+ have to be
    // normalized to something like
    //
    //     R -> X | R R
    //
    // Returns the \`R\` term.
    normalizeRepeat(expr) {
      let known = this.built.find((b) => b.matchesRepeat(expr));
      if (known)
        return p(known.term);
      let name = expr.expr.prec < expr.prec ? \`(\${expr.expr})+\` : \`\${expr.expr}+\`;
      let term = this.terms.makeRepeat(this.terms.uniqueName(name));
      this.built.push(new BuiltRule("+", [expr.expr], term));
      this.defineRule(term, this.normalizeExpr(expr.expr).concat(p(term, term)));
      return p(term);
    }
    normalizeSequence(expr) {
      let result = expr.exprs.map((e) => this.normalizeExpr(e));
      let builder = this;
      function complete(start, from, endConflicts) {
        let { here, atEnd } = builder.conflictsFor(expr.markers[from]);
        if (from == result.length)
          return [start.withConflicts(start.terms.length, here.join(endConflicts))];
        let choices = [];
        for (let choice of result[from]) {
          for (let full of complete(start.concat(choice).withConflicts(start.terms.length, here), from + 1, endConflicts.join(atEnd)))
            choices.push(full);
        }
        return choices;
      }
      return complete(Parts.none, 0, Conflicts.none);
    }
    normalizeExpr(expr) {
      if (expr instanceof RepeatExpression && expr.kind == "?") {
        return [Parts.none, ...this.normalizeExpr(expr.expr)];
      } else if (expr instanceof RepeatExpression) {
        let repeated = this.normalizeRepeat(expr);
        return expr.kind == "+" ? [repeated] : [Parts.none, repeated];
      } else if (expr instanceof ChoiceExpression) {
        return expr.exprs.reduce((o, e) => o.concat(this.normalizeExpr(e)), []);
      } else if (expr instanceof SequenceExpression) {
        return this.normalizeSequence(expr);
      } else if (expr instanceof LiteralExpression) {
        return [p(this.tokens.getLiteral(expr))];
      } else if (expr instanceof NameExpression) {
        return this.resolve(expr);
      } else if (expr instanceof SpecializeExpression) {
        return [p(this.resolveSpecialization(expr))];
      } else if (expr instanceof InlineRuleExpression) {
        return [p(this.buildRule(expr.rule, none, this.currentSkip[this.currentSkip.length - 1], true))];
      } else {
        return this.raise(\`This type of expression ('\${expr}') may not occur in non-token rules\`, expr.start);
      }
    }
    buildRule(rule, args, skip, inline = false) {
      let expr = this.substituteArgs(rule.expr, args, rule.params);
      let { name: nodeName, props, dynamicPrec, inline: explicitInline, group, exported } = this.nodeInfo(rule.props || none, inline ? "pg" : "pgi", rule.id.name, args, rule.params, rule.expr);
      if (exported && rule.params.length)
        this.warn(\`Can't export parameterized rules\`, rule.start);
      if (exported && inline)
        this.warn(\`Can't export inline rule\`, rule.start);
      let name = this.newName(rule.id.name + (args.length ? "<" + args.join(",") + ">" : ""), nodeName || true, props);
      if (explicitInline)
        name.inline = true;
      if (dynamicPrec)
        this.registerDynamicPrec(name, dynamicPrec);
      if ((name.nodeType || exported) && rule.params.length == 0) {
        if (!nodeName)
          name.preserve = true;
        if (!inline)
          this.namedTerms[exported || rule.id.name] = name;
      }
      if (!inline)
        this.built.push(new BuiltRule(rule.id.name, args, name));
      this.currentSkip.push(skip);
      let parts = this.normalizeExpr(expr);
      if (parts.length > 100 * (expr instanceof ChoiceExpression ? expr.exprs.length : 1))
        this.warn(\`Rule \${rule.id.name} is generating a lot (\${parts.length}) of choices.
  Consider splitting it up or reducing the amount of ? or | operator uses.\`, rule.start);
      if (/\\brulesize\\b/.test(verbose2) && parts.length > 10)
        console.log(\`Rule \${rule.id.name}: \${parts.length} variants\`);
      this.defineRule(name, parts);
      this.currentSkip.pop();
      if (group)
        this.definedGroups.push({ name, group, rule });
      return name;
    }
    nodeInfo(props, allow, defaultName = null, args = none, params = none, expr, defaultProps) {
      let result = {};
      let name = defaultName && (allow.indexOf("a") > -1 || !ignored(defaultName)) && !/ /.test(defaultName) ? defaultName : null;
      let dialect = null, dynamicPrec = 0, inline = false, group = null, exported = null;
      for (let prop of props) {
        if (!prop.at) {
          if (!this.knownProps[prop.name]) {
            let builtin = ["name", "dialect", "dynamicPrecedence", "export", "isGroup"].includes(prop.name) ? \` (did you mean '@\${prop.name}'?)\` : "";
            this.raise(\`Unknown prop name '\${prop.name}'\${builtin}\`, prop.start);
          }
          result[prop.name] = this.finishProp(prop, args, params);
        } else if (prop.name == "name") {
          name = this.finishProp(prop, args, params);
          if (/ /.test(name))
            this.raise(\`Node names cannot have spaces ('\${name}')\`, prop.start);
        } else if (prop.name == "dialect") {
          if (allow.indexOf("d") < 0)
            this.raise("Can't specify a dialect on non-token rules", props[0].start);
          if (prop.value.length != 1 && !prop.value[0].value)
            this.raise("The '@dialect' rule prop must hold a plain string value");
          let dialectID = this.dialects.indexOf(prop.value[0].value);
          if (dialectID < 0)
            this.raise(\`Unknown dialect '\${prop.value[0].value}'\`, prop.value[0].start);
          dialect = dialectID;
        } else if (prop.name == "dynamicPrecedence") {
          if (allow.indexOf("p") < 0)
            this.raise("Dynamic precedence can only be specified on nonterminals");
          if (prop.value.length != 1 || !/^-?(?:10|\\d)$/.test(prop.value[0].value))
            this.raise("The '@dynamicPrecedence' rule prop must hold an integer between -10 and 10");
          dynamicPrec = +prop.value[0].value;
        } else if (prop.name == "inline") {
          if (prop.value.length)
            this.raise("'@inline' doesn't take a value", prop.value[0].start);
          if (allow.indexOf("i") < 0)
            this.raise("Inline can only be specified on nonterminals");
          inline = true;
        } else if (prop.name == "isGroup") {
          if (allow.indexOf("g") < 0)
            this.raise("'@isGroup' can only be specified on nonterminals");
          group = prop.value.length ? this.finishProp(prop, args, params) : defaultName;
        } else if (prop.name == "export") {
          if (prop.value.length)
            exported = this.finishProp(prop, args, params);
          else
            exported = defaultName;
        } else {
          this.raise(\`Unknown built-in prop name '@\${prop.name}'\`, prop.start);
        }
      }
      if (expr && this.ast.autoDelim && (name || hasProps(result))) {
        let delim = this.findDelimiters(expr);
        if (delim) {
          addToProp(delim[0], "closedBy", delim[1].nodeName);
          addToProp(delim[1], "openedBy", delim[0].nodeName);
        }
      }
      if (defaultProps && hasProps(defaultProps)) {
        for (let prop in defaultProps)
          if (!(prop in result))
            result[prop] = defaultProps[prop];
      }
      if (hasProps(result) && !name)
        this.raise(\`Node has properties but no name\`, props.length ? props[0].start : expr.start);
      if (inline && (hasProps(result) || dialect || dynamicPrec))
        this.raise(\`Inline nodes can't have props, dynamic precedence, or a dialect\`, props[0].start);
      if (inline && name)
        name = null;
      return { name, props: result, dialect, dynamicPrec, inline, group, exported };
    }
    finishProp(prop, args, params) {
      return prop.value.map((part) => {
        if (part.value)
          return part.value;
        let pos = params.findIndex((param) => param.name == part.name);
        if (pos < 0)
          this.raise(\`Property refers to '\${part.name}', but no parameter by that name is in scope\`, part.start);
        let expr = args[pos];
        if (expr instanceof NameExpression && !expr.args.length)
          return expr.id.name;
        if (expr instanceof LiteralExpression)
          return expr.value;
        return this.raise(\`Expression '\${expr}' can not be used as part of a property value\`, part.start);
      }).join("");
    }
    resolveSpecialization(expr) {
      let type = expr.type;
      let { name, props, dialect, exported } = this.nodeInfo(expr.props, "d");
      let terminal = this.normalizeExpr(expr.token);
      if (terminal.length != 1 || terminal[0].terms.length != 1 || !terminal[0].terms[0].terminal)
        this.raise(\`The first argument to '\${type}' must resolve to a token\`, expr.token.start);
      let values, lit;
      if ((lit = isLiteralToken(expr.content)) != null)
        values = [lit];
      else if (expr.content instanceof ChoiceExpression && expr.content.exprs.every((e) => isLiteralToken(e) != null))
        values = expr.content.exprs.map(isLiteralToken);
      else
        return this.raise(\`The second argument to '\${expr.type}' must be a literal or choice of literals\`, expr.content.start);
      let term = terminal[0].terms[0], token = null;
      let table = this.specialized[term.name] || (this.specialized[term.name] = []);
      for (let value of values) {
        let known = table.find((sp) => sp.value == value);
        if (known == null) {
          if (!token) {
            token = this.makeTerminal(term.name + "/" + JSON.stringify(value), name, props);
            if (dialect != null)
              (this.tokens.byDialect[dialect] || (this.tokens.byDialect[dialect] = [])).push(token);
          }
          table.push({ value, term: token, type, dialect, name });
          this.tokenOrigins[token.name] = { spec: term };
          if (name || exported) {
            if (!name)
              token.preserve = true;
            this.namedTerms[exported || name] = token;
          }
        } else {
          if (known.type != type)
            this.raise(\`Conflicting specialization types for \${JSON.stringify(value)} of \${term.name} (\${type} vs \${known.type})\`, expr.start);
          if (known.dialect != dialect)
            this.raise(\`Conflicting dialects for specialization \${JSON.stringify(value)} of \${term.name}\`, expr.start);
          if (known.name != name)
            this.raise(\`Conflicting names for specialization \${JSON.stringify(value)} of \${term.name}\`, expr.start);
          if (token && known.term != token)
            this.raise(\`Conflicting specialization tokens for \${JSON.stringify(value)} of \${term.name}\`, expr.start);
          token = known.term;
        }
      }
      return token;
    }
    findDelimiters(expr) {
      if (!(expr instanceof SequenceExpression) || expr.exprs.length < 2)
        return null;
      let findToken = (expr2) => {
        if (expr2 instanceof LiteralExpression)
          return { term: this.tokens.getLiteral(expr2), str: expr2.value };
        if (expr2 instanceof NameExpression && expr2.args.length == 0) {
          let rule = this.ast.rules.find((r) => r.id.name == expr2.id.name);
          if (rule)
            return findToken(rule.expr);
          let token = this.tokens.rules.find((r) => r.id.name == expr2.id.name);
          if (token && token.expr instanceof LiteralExpression)
            return { term: this.tokens.getToken(expr2), str: token.expr.value };
        }
        return null;
      };
      let lastToken = findToken(expr.exprs[expr.exprs.length - 1]);
      if (!lastToken || !lastToken.term.nodeName)
        return null;
      const brackets = ["()", "[]", "{}", "<>"];
      let bracket = brackets.find((b) => lastToken.str.indexOf(b[1]) > -1 && lastToken.str.indexOf(b[0]) < 0);
      if (!bracket)
        return null;
      let firstToken = findToken(expr.exprs[0]);
      if (!firstToken || !firstToken.term.nodeName || firstToken.str.indexOf(bracket[0]) < 0 || firstToken.str.indexOf(bracket[1]) > -1)
        return null;
      return [firstToken.term, lastToken.term];
    }
    registerDynamicPrec(term, prec) {
      this.dynamicRulePrecedences.push({ rule: term, prec });
      term.preserve = true;
    }
    defineGroup(rule, group, ast) {
      var _a;
      let recur = [];
      let getNamed = (rule2) => {
        if (rule2.nodeName)
          return [rule2];
        if (recur.includes(rule2))
          this.raise(\`Rule '\${ast.id.name}' cannot define a group because it contains a non-named recursive rule ('\${rule2.name}')\`, ast.start);
        let result = [];
        recur.push(rule2);
        for (let r of this.rules)
          if (r.name == rule2) {
            let names = r.parts.map(getNamed).filter((x) => x.length);
            if (names.length > 1)
              this.raise(\`Rule '\${ast.id.name}' cannot define a group because some choices produce multiple named nodes\`, ast.start);
            if (names.length == 1)
              for (let n of names[0])
                result.push(n);
          }
        recur.pop();
        return result;
      };
      for (let name of getNamed(rule))
        name.props["group"] = (((_a = name.props["group"]) === null || _a === void 0 ? void 0 : _a.split(" ")) || []).concat(group).sort().join(" ");
    }
    checkGroups() {
      let groups = /* @__PURE__ */ Object.create(null), nodeNames = /* @__PURE__ */ Object.create(null);
      for (let term of this.terms.terms)
        if (term.nodeName) {
          nodeNames[term.nodeName] = true;
          if (term.props["group"])
            for (let group of term.props["group"].split(" ")) {
              (groups[group] || (groups[group] = [])).push(term);
            }
        }
      let names = Object.keys(groups);
      for (let i = 0; i < names.length; i++) {
        let name = names[i], terms = groups[name];
        if (nodeNames[name])
          this.warn(\`Group name '\${name}' conflicts with a node of the same name\`);
        for (let j = i + 1; j < names.length; j++) {
          let other = groups[names[j]];
          if (terms.some((t) => other.includes(t)) && (terms.length > other.length ? other.some((t) => !terms.includes(t)) : terms.some((t) => !other.includes(t))))
            this.warn(\`Groups '\${name}' and '\${names[j]}' overlap without one being a superset of the other\`);
        }
      }
    }
  };
  function isLiteralToken(expr) {
    if (expr instanceof LiteralExpression)
      return expr.value;
    if (expr instanceof SequenceExpression) {
      let result = "";
      for (let sub of expr.exprs) {
        let lit = isLiteralToken(sub);
        if (lit == null)
          return null;
        result += lit;
      }
      return result;
    }
    return null;
  }
  var MinSharedActions = 5;
  var FinishStateContext = class {
    constructor(tokenizers, data, stateArray, skipData, skipInfo, states, builder) {
      this.tokenizers = tokenizers;
      this.data = data;
      this.stateArray = stateArray;
      this.skipData = skipData;
      this.skipInfo = skipInfo;
      this.states = states;
      this.builder = builder;
      this.sharedActions = [];
    }
    findSharedActions(state) {
      if (state.actions.length < MinSharedActions)
        return null;
      let found = null;
      for (let shared of this.sharedActions) {
        if ((!found || shared.actions.length > found.actions.length) && shared.actions.every((a) => state.actions.some((b) => b.eq(a))))
          found = shared;
      }
      if (found)
        return found;
      let max = null, scratch = [];
      for (let i = state.id + 1; i < this.states.length; i++) {
        let other = this.states[i], fill = 0;
        if (other.defaultReduce || other.actions.length < MinSharedActions)
          continue;
        for (let a of state.actions)
          for (let b of other.actions)
            if (a.eq(b))
              scratch[fill++] = a;
        if (fill >= MinSharedActions && (!max || max.length < fill)) {
          max = scratch;
          scratch = [];
        }
      }
      if (!max)
        return null;
      let result = { actions: max, addr: this.storeActions(max, -1, null) };
      this.sharedActions.push(result);
      return result;
    }
    storeActions(actions, skipReduce, shared) {
      if (skipReduce < 0 && shared && shared.actions.length == actions.length)
        return shared.addr;
      let data = [];
      for (let action of actions) {
        if (shared && shared.actions.some((a) => a.eq(action)))
          continue;
        if (action instanceof Shift) {
          data.push(action.term.id, action.target.id, 0);
        } else {
          let code = reduceAction(action.rule, this.skipInfo);
          if (code != skipReduce)
            data.push(action.term.id, code & 65535, code >> 16);
        }
      }
      data.push(
        65535
        /* Seq.End */
      );
      if (skipReduce > -1)
        data.push(2, skipReduce & 65535, skipReduce >> 16);
      else if (shared)
        data.push(1, shared.addr & 65535, shared.addr >> 16);
      else
        data.push(
          0
          /* Seq.Done */
        );
      return this.data.storeArray(data);
    }
    finish(state, isSkip, forcedReduce) {
      let b = this.builder;
      let skipID = b.skipRules.indexOf(state.skip);
      let skipTable = this.skipData[skipID], skipTerms = this.skipInfo[skipID].startTokens;
      let defaultReduce = state.defaultReduce ? reduceAction(state.defaultReduce, this.skipInfo) : 0;
      let flags = isSkip ? 1 : 0;
      let skipReduce = -1, shared = null;
      if (defaultReduce == 0) {
        if (isSkip) {
          for (const action of state.actions)
            if (action instanceof Reduce && action.term.eof)
              skipReduce = reduceAction(action.rule, this.skipInfo);
        }
        if (skipReduce < 0)
          shared = this.findSharedActions(state);
      }
      if (state.set.some((p2) => p2.rule.name.top && p2.pos == p2.rule.parts.length))
        flags |= 2;
      let external = [];
      for (let i = 0; i < state.actions.length + skipTerms.length; i++) {
        let term = i < state.actions.length ? state.actions[i].term : skipTerms[i - state.actions.length];
        for (; ; ) {
          let orig = b.tokenOrigins[term.name];
          if (orig && orig.spec) {
            term = orig.spec;
            continue;
          }
          if (orig && orig.external instanceof ExternalTokenSet)
            addToSet(external, orig.external);
          break;
        }
      }
      let tokenizerMask = 0;
      for (let i = 0; i < this.tokenizers.length; i++) {
        let tok = this.tokenizers[i];
        if (external.includes(tok) || tok.groupID == state.tokenGroup)
          tokenizerMask |= 1 << i;
      }
      let base = state.id * 6;
      this.stateArray[
        base + 0
        /* ParseState.Flags */
      ] = flags;
      this.stateArray[
        base + 1
        /* ParseState.Actions */
      ] = this.storeActions(defaultReduce ? none : state.actions, skipReduce, shared);
      this.stateArray[
        base + 2
        /* ParseState.Skip */
      ] = skipTable;
      this.stateArray[
        base + 3
        /* ParseState.TokenizerMask */
      ] = tokenizerMask;
      this.stateArray[
        base + 4
        /* ParseState.DefaultReduce */
      ] = defaultReduce;
      this.stateArray[
        base + 5
        /* ParseState.ForcedReduce */
      ] = forcedReduce;
    }
  };
  function addToProp(term, prop, value) {
    let cur = term.props[prop];
    if (!cur || cur.split(" ").indexOf(value) < 0)
      term.props[prop] = cur ? cur + " " + value : value;
  }
  function buildSpecializeTable(spec) {
    let table = /* @__PURE__ */ Object.create(null);
    for (let { value, term, type } of spec) {
      let code = type == "specialize" ? 0 : 1;
      table[value] = term.id << 1 | code;
    }
    return table;
  }
  function reduceAction(rule, skipInfo, depth = rule.parts.length) {
    return rule.name.id | 65536 | (rule.isRepeatWrap && depth == rule.parts.length ? 131072 : 0) | (skipInfo.some((i) => i.rule == rule.name) ? 262144 : 0) | depth << 19;
  }
  function findArray(data, value) {
    search: for (let i = 0; ; ) {
      let next = data.indexOf(value[0], i);
      if (next == -1 || next + value.length > data.length)
        break;
      for (let j = 1; j < value.length; j++) {
        if (value[j] != data[next + j]) {
          i = next + 1;
          continue search;
        }
      }
      return next;
    }
    return -1;
  }
  function findSkipStates(table, startRules) {
    let nonSkip = /* @__PURE__ */ Object.create(null);
    let work = [];
    let add = (state) => {
      if (!nonSkip[state.id]) {
        nonSkip[state.id] = true;
        work.push(state);
      }
    };
    for (let state of table)
      if (state.startRule && startRules.includes(state.startRule))
        add(state);
    for (let i = 0; i < work.length; i++) {
      for (let a of work[i].actions)
        if (a instanceof Shift)
          add(a.target);
      for (let a of work[i].goto)
        add(a.target);
    }
    return (id) => !nonSkip[id];
  }
  var DataBuilder = class {
    constructor() {
      this.data = [];
    }
    storeArray(data) {
      let found = findArray(this.data, data);
      if (found > -1)
        return found;
      let pos = this.data.length;
      for (let num of data)
        this.data.push(num);
      return pos;
    }
    finish() {
      return Uint16Array.from(this.data);
    }
  };
  function computeGotoTable(states) {
    let goto = {};
    let maxTerm = 0;
    for (let state of states) {
      for (let entry of state.goto) {
        maxTerm = Math.max(entry.term.id, maxTerm);
        let set = goto[entry.term.id] || (goto[entry.term.id] = {});
        (set[entry.target.id] || (set[entry.target.id] = [])).push(state.id);
      }
    }
    let data = new DataBuilder();
    let index = [];
    let offset = maxTerm + 2;
    for (let term = 0; term <= maxTerm; term++) {
      let entries = goto[term];
      if (!entries) {
        index.push(1);
        continue;
      }
      let termTable = [];
      let keys = Object.keys(entries);
      for (let target of keys) {
        let list = entries[target];
        termTable.push((target == keys[keys.length - 1] ? 1 : 0) + (list.length << 1));
        termTable.push(+target);
        for (let source of list)
          termTable.push(source);
      }
      index.push(data.storeArray(termTable) + offset);
    }
    if (index.some((n) => n > 65535))
      throw new GenError("Goto table too large");
    return Uint16Array.from([maxTerm + 1, ...index, ...data.data]);
  }
  var TokenGroup2 = class {
    constructor(tokens, groupID) {
      this.tokens = tokens;
      this.groupID = groupID;
    }
    create() {
      return this.groupID;
    }
    createSource() {
      return String(this.groupID);
    }
  };
  function addToSet(set, value) {
    if (!set.includes(value))
      set.push(value);
  }
  function buildTokenMasks(groups) {
    let masks = /* @__PURE__ */ Object.create(null);
    for (let group of groups) {
      let groupMask = 1 << group.groupID;
      for (let term of group.tokens) {
        masks[term.id] = (masks[term.id] || 0) | groupMask;
      }
    }
    return masks;
  }
  var TokenArg = class {
    constructor(name, expr, scope) {
      this.name = name;
      this.expr = expr;
      this.scope = scope;
    }
  };
  var BuildingRule = class {
    constructor(name, start, to, args) {
      this.name = name;
      this.start = start;
      this.to = to;
      this.args = args;
    }
  };
  var TokenSet = class {
    constructor(b, ast) {
      this.b = b;
      this.ast = ast;
      this.startState = new State$1();
      this.built = [];
      this.building = [];
      this.byDialect = /* @__PURE__ */ Object.create(null);
      this.precedenceRelations = [];
      this.rules = ast ? ast.rules : none;
      for (let rule of this.rules)
        b.unique(rule.id);
    }
    getToken(expr) {
      for (let built of this.built)
        if (built.matches(expr))
          return built.term;
      let name = expr.id.name;
      let rule = this.rules.find((r) => r.id.name == name);
      if (!rule)
        return null;
      let { name: nodeName, props, dialect, exported } = this.b.nodeInfo(rule.props, "d", name, expr.args, rule.params.length != expr.args.length ? none : rule.params);
      let term = this.b.makeTerminal(expr.toString(), nodeName, props);
      if (dialect != null)
        (this.byDialect[dialect] || (this.byDialect[dialect] = [])).push(term);
      if ((term.nodeType || exported) && rule.params.length == 0) {
        if (!term.nodeType)
          term.preserve = true;
        this.b.namedTerms[exported || name] = term;
      }
      this.buildRule(rule, expr, this.startState, new State$1([term]));
      this.built.push(new BuiltRule(name, expr.args, term));
      return term;
    }
    buildRule(rule, expr, from, to, args = none) {
      let name = expr.id.name;
      if (rule.params.length != expr.args.length)
        this.b.raise(\`Incorrect number of arguments for token '\${name}'\`, expr.start);
      let building = this.building.find((b) => b.name == name && exprsEq(expr.args, b.args));
      if (building) {
        if (building.to == to) {
          from.nullEdge(building.start);
          return;
        }
        let lastIndex = this.building.length - 1;
        while (this.building[lastIndex].name != name)
          lastIndex--;
        this.b.raise(\`Invalid (non-tail) recursion in token rules: \${this.building.slice(lastIndex).map((b) => b.name).join(" -> ")}\`, expr.start);
      }
      this.b.used(rule.id.name);
      let start = new State$1();
      from.nullEdge(start);
      this.building.push(new BuildingRule(name, start, to, expr.args));
      this.build(this.b.substituteArgs(rule.expr, expr.args, rule.params), start, to, expr.args.map((e, i) => new TokenArg(rule.params[i].name, e, args)));
      this.building.pop();
    }
    build(expr, from, to, args) {
      if (expr instanceof NameExpression) {
        let name = expr.id.name, arg = args.find((a) => a.name == name);
        if (arg)
          return this.build(arg.expr, from, to, arg.scope);
        let rule;
        for (let i = 0, lt = this.b.localTokens; i <= lt.length; i++) {
          let set = i == lt.length ? this.b.tokens : lt[i];
          rule = set.rules.find((r) => r.id.name == name);
          if (rule)
            break;
        }
        if (!rule)
          return this.b.raise(\`Reference to token rule '\${name}', which isn't found\`, expr.start);
        this.buildRule(rule, expr, from, to, args);
      } else if (expr instanceof CharClass) {
        for (let [a, b] of CharClasses[expr.type])
          from.edge(a, b, to);
      } else if (expr instanceof ChoiceExpression) {
        for (let choice of expr.exprs)
          this.build(choice, from, to, args);
      } else if (isEmpty(expr)) {
        from.nullEdge(to);
      } else if (expr instanceof SequenceExpression) {
        let conflict = expr.markers.find((c) => c.length > 0);
        if (conflict)
          this.b.raise("Conflict marker in token expression", conflict[0].start);
        for (let i = 0; i < expr.exprs.length; i++) {
          let next = i == expr.exprs.length - 1 ? to : new State$1();
          this.build(expr.exprs[i], from, next, args);
          from = next;
        }
      } else if (expr instanceof RepeatExpression) {
        if (expr.kind == "*") {
          let loop = new State$1();
          from.nullEdge(loop);
          this.build(expr.expr, loop, loop, args);
          loop.nullEdge(to);
        } else if (expr.kind == "+") {
          let loop = new State$1();
          this.build(expr.expr, from, loop, args);
          this.build(expr.expr, loop, loop, args);
          loop.nullEdge(to);
        } else {
          from.nullEdge(to);
          this.build(expr.expr, from, to, args);
        }
      } else if (expr instanceof SetExpression) {
        for (let [a, b] of expr.inverted ? invertRanges(expr.ranges) : expr.ranges)
          rangeEdges(from, to, a, b);
      } else if (expr instanceof LiteralExpression) {
        for (let i = 0; i < expr.value.length; i++) {
          let ch = expr.value.charCodeAt(i);
          let next = i == expr.value.length - 1 ? to : new State$1();
          from.edge(ch, ch + 1, next);
          from = next;
        }
      } else if (expr instanceof AnyExpression) {
        let mid = new State$1();
        from.edge(0, 56320, to);
        from.edge(56320, MAX_CHAR + 1, to);
        from.edge(55296, 56320, mid);
        mid.edge(56320, 57344, to);
      } else {
        return this.b.raise(\`Unrecognized expression type in token\`, expr.start);
      }
    }
    takePrecedences() {
      let rel = this.precedenceRelations = [];
      if (this.ast)
        for (let group of this.ast.precedences) {
          let prev = [];
          for (let item of group.items) {
            let level = [];
            if (item instanceof NameExpression) {
              for (let built of this.built)
                if (item.args.length ? built.matches(item) : built.id == item.id.name)
                  level.push(built.term);
            } else {
              let id = JSON.stringify(item.value), found = this.built.find((b) => b.id == id);
              if (found)
                level.push(found.term);
            }
            if (!level.length)
              this.b.warn(\`Precedence specified for unknown token \${item}\`, item.start);
            for (let term of level)
              addRel(rel, term, prev);
            prev = prev.concat(level);
          }
        }
    }
    precededBy(a, b) {
      let found = this.precedenceRelations.find((r) => r.term == a);
      return found && found.after.includes(b);
    }
    buildPrecTable(softConflicts) {
      let precTable = [], rel = this.precedenceRelations.slice();
      for (let { a, b, soft } of softConflicts)
        if (soft) {
          if (!rel.some((r) => r.term == a) || !rel.some((r) => r.term == b))
            continue;
          if (soft < 0)
            [a, b] = [b, a];
          addRel(rel, b, [a]);
          addRel(rel, a, []);
        }
      add: while (rel.length) {
        for (let i = 0; i < rel.length; i++) {
          let record = rel[i];
          if (record.after.every((t) => precTable.includes(t.id))) {
            precTable.push(record.term.id);
            if (rel.length == 1)
              break add;
            rel[i] = rel.pop();
            continue add;
          }
        }
        this.b.raise(\`Cyclic token precedence relation between \${rel.map((r) => r.term).join(", ")}\`);
      }
      return precTable;
    }
  };
  var MainTokenSet = class extends TokenSet {
    constructor() {
      super(...arguments);
      this.explicitConflicts = [];
    }
    getLiteral(expr) {
      let id = JSON.stringify(expr.value);
      for (let built of this.built)
        if (built.id == id)
          return built.term;
      let name = null, props = {}, dialect = null, exported = null;
      let decl = this.ast ? this.ast.literals.find((l) => l.literal == expr.value) : null;
      if (decl)
        ({ name, props, dialect, exported } = this.b.nodeInfo(decl.props, "da", expr.value));
      let term = this.b.makeTerminal(id, name, props);
      if (dialect != null)
        (this.byDialect[dialect] || (this.byDialect[dialect] = [])).push(term);
      if (exported)
        this.b.namedTerms[exported] = term;
      this.build(expr, this.startState, new State$1([term]), none);
      this.built.push(new BuiltRule(id, none, term));
      return term;
    }
    takeConflicts() {
      var _a;
      let resolve = (expr) => {
        if (expr instanceof NameExpression) {
          for (let built of this.built)
            if (built.matches(expr))
              return built.term;
        } else {
          let id = JSON.stringify(expr.value), found = this.built.find((b) => b.id == id);
          if (found)
            return found.term;
        }
        this.b.warn(\`Conflict specified for unknown token \${expr}\`, expr.start);
        return null;
      };
      for (let c of ((_a = this.ast) === null || _a === void 0 ? void 0 : _a.conflicts) || []) {
        let a = resolve(c.a), b = resolve(c.b);
        if (a && b) {
          if (a.id < b.id)
            [a, b] = [b, a];
          this.explicitConflicts.push({ a, b });
        }
      }
    }
    // Token groups are a mechanism for allowing conflicting (matching
    // overlapping input, without an explicit precedence being given)
    // tokens to exist in a grammar _if_ they don't occur in the same
    // place (aren't used in the same states).
    //
    // States that use tokens that conflict will raise an error when any
    // of the conflicting pairs of tokens both occur in that state.
    // Otherwise, they are assigned a token group, which includes all
    // the potentially-conflicting tokens they use. If there's already a
    // group that doesn't have any conflicts with those tokens, that is
    // reused, otherwise a new group is created.
    //
    // So each state has zero or one token groups, and each conflicting
    // token may belong to one or more groups. Tokens get assigned a
    // 16-bit bitmask with the groups they belong to set to 1 (all-1s
    // for non-conflicting tokens). When tokenizing, that mask is
    // compared to the current state's group (again using all-1s for
    // group-less states) to determine whether a token is applicable for
    // this state.
    //
    // Extended/specialized tokens are treated as their parent token for
    // this purpose.
    buildTokenGroups(states, skipInfo, startID) {
      let tokens = this.startState.compile();
      if (tokens.accepting.length)
        this.b.raise(\`Grammar contains zero-length tokens (in '\${tokens.accepting[0].name}')\`, this.rules.find((r) => r.id.name == tokens.accepting[0].name).start);
      if (/\\btokens\\b/.test(verbose2))
        console.log(tokens.toString());
      let allConflicts = tokens.findConflicts(checkTogether(states, this.b, skipInfo)).filter(({ a, b }) => !this.precededBy(a, b) && !this.precededBy(b, a));
      for (let { a, b } of this.explicitConflicts) {
        if (!allConflicts.some((c) => c.a == a && c.b == b))
          allConflicts.push(new Conflict$1(a, b, 0, "", ""));
      }
      let softConflicts = allConflicts.filter((c) => c.soft), conflicts = allConflicts.filter((c) => !c.soft);
      let errors = [];
      let groups = [];
      for (let state of states) {
        if (state.defaultReduce || state.tokenGroup > -1)
          continue;
        let terms = [], incompatible = [];
        let skip = skipInfo[this.b.skipRules.indexOf(state.skip)].startTokens;
        for (let term of skip)
          if (state.actions.some((a) => a.term == term))
            this.b.raise(\`Use of token \${term.name} conflicts with skip rule\`);
        let stateTerms = [];
        for (let i = 0; i < state.actions.length + (skip ? skip.length : 0); i++) {
          let term = i < state.actions.length ? state.actions[i].term : skip[i - state.actions.length];
          let orig = this.b.tokenOrigins[term.name];
          if (orig && orig.spec)
            term = orig.spec;
          else if (orig && orig.external)
            continue;
          addToSet(stateTerms, term);
        }
        if (stateTerms.length == 0)
          continue;
        for (let term of stateTerms) {
          for (let conflict of conflicts) {
            let conflicting = conflict.a == term ? conflict.b : conflict.b == term ? conflict.a : null;
            if (!conflicting)
              continue;
            if (stateTerms.includes(conflicting) && !errors.some((e) => e.conflict == conflict)) {
              let example = conflict.exampleA ? \` (example: \${JSON.stringify(conflict.exampleA)}\${conflict.exampleB ? \` vs \${JSON.stringify(conflict.exampleB)}\` : ""})\` : "";
              errors.push({
                error: \`Overlapping tokens \${term.name} and \${conflicting.name} used in same context\${example}
After: \${state.set[0].trail()}\`,
                conflict
              });
            }
            addToSet(terms, term);
            addToSet(incompatible, conflicting);
          }
        }
        let tokenGroup = null;
        for (let group of groups) {
          if (incompatible.some((term) => group.tokens.includes(term)))
            continue;
          for (let term of terms)
            addToSet(group.tokens, term);
          tokenGroup = group;
          break;
        }
        if (!tokenGroup) {
          tokenGroup = new TokenGroup2(terms, groups.length + startID);
          groups.push(tokenGroup);
        }
        state.tokenGroup = tokenGroup.groupID;
      }
      if (errors.length)
        this.b.raise(errors.map((e) => e.error).join("\\n\\n"));
      if (groups.length + startID > 16)
        this.b.raise(\`Too many different token groups (\${groups.length}) to represent them as a 16-bit bitfield\`);
      let precTable = this.buildPrecTable(softConflicts);
      return {
        tokenGroups: groups,
        tokenPrec: precTable,
        tokenData: tokens.toArray(buildTokenMasks(groups), precTable)
      };
    }
  };
  var LocalTokenSet = class extends TokenSet {
    constructor(b, ast) {
      super(b, ast);
      this.fallback = null;
      if (ast.fallback)
        b.unique(ast.fallback.id);
    }
    getToken(expr) {
      let term = null;
      if (this.ast.fallback && this.ast.fallback.id.name == expr.id.name) {
        if (expr.args.length)
          this.b.raise(\`Incorrect number of arguments for \${expr.id.name}\`, expr.start);
        if (!this.fallback) {
          let { name: nodeName, props, exported } = this.b.nodeInfo(this.ast.fallback.props, "", expr.id.name, none, none);
          let term2 = this.fallback = this.b.makeTerminal(expr.id.name, nodeName, props);
          if (term2.nodeType || exported) {
            if (!term2.nodeType)
              term2.preserve = true;
            this.b.namedTerms[exported || expr.id.name] = term2;
          }
          this.b.used(expr.id.name);
        }
        term = this.fallback;
      } else {
        term = super.getToken(expr);
      }
      if (term && !this.b.tokenOrigins[term.name])
        this.b.tokenOrigins[term.name] = { group: this };
      return term;
    }
    buildLocalGroup(states, skipInfo, id) {
      let tokens = this.startState.compile();
      if (tokens.accepting.length)
        this.b.raise(\`Grammar contains zero-length tokens (in '\${tokens.accepting[0].name}')\`, this.rules.find((r) => r.id.name == tokens.accepting[0].name).start);
      for (let { a, b, exampleA } of tokens.findConflicts(() => true)) {
        if (!this.precededBy(a, b) && !this.precededBy(b, a))
          this.b.raise(\`Overlapping tokens \${a.name} and \${b.name} in local token group\${exampleA ? \` (example: \${JSON.stringify(exampleA)})\` : ""}\`);
      }
      for (let state of states) {
        if (state.defaultReduce)
          continue;
        let usesThis = null;
        let usesOther = skipInfo[this.b.skipRules.indexOf(state.skip)].startTokens[0];
        for (let { term } of state.actions) {
          let orig = this.b.tokenOrigins[term.name];
          while (orig === null || orig === void 0 ? void 0 : orig.spec)
            orig = this.b.tokenOrigins[orig.spec.name];
          if ((orig === null || orig === void 0 ? void 0 : orig.group) == this)
            usesThis = term;
          else
            usesOther = term;
        }
        if (usesThis) {
          if (usesOther)
            this.b.raise(\`Tokens from a local token group used together with other tokens (\${usesThis.name} with \${usesOther.name})\`);
          state.tokenGroup = id;
        }
      }
      let precTable = this.buildPrecTable(none);
      let tokenData = tokens.toArray({
        [id]: 65535
        /* Seq.End */
      }, precTable);
      let precOffset = tokenData.length;
      let fullData = new Uint16Array(tokenData.length + precTable.length + 1);
      fullData.set(tokenData, 0);
      fullData.set(precTable, precOffset);
      fullData[fullData.length - 1] = 65535;
      return {
        groupID: id,
        create: () => new LocalTokenGroup(fullData, precOffset, this.fallback ? this.fallback.id : void 0),
        createSource: (importName) => \`new \${importName("LocalTokenGroup", "@lezer/lr")}(\${encodeArray(fullData)}, \${precOffset}\${this.fallback ? \`, \${this.fallback.id}\` : ""})\`
      };
    }
  };
  function checkTogether(states, b, skipInfo) {
    let cache = /* @__PURE__ */ Object.create(null);
    function hasTerm(state, term) {
      return state.actions.some((a) => a.term == term) || skipInfo[b.skipRules.indexOf(state.skip)].startTokens.includes(term);
    }
    return (a, b2) => {
      if (a.id < b2.id)
        [a, b2] = [b2, a];
      let key = a.id | b2.id << 16, cached = cache[key];
      if (cached != null)
        return cached;
      return cache[key] = states.some((state) => hasTerm(state, a) && hasTerm(state, b2));
    };
  }
  function invertRanges(ranges) {
    let pos = 0, result = [];
    for (let [a, b] of ranges) {
      if (a > pos)
        result.push([pos, a]);
      pos = b;
    }
    if (pos <= MAX_CODE)
      result.push([pos, MAX_CODE + 1]);
    return result;
  }
  var ASTRAL = 65536;
  var GAP_START = 55296;
  var GAP_END = 57344;
  var MAX_CODE = 1114111;
  var LOW_SURR_B = 56320;
  var HIGH_SURR_B = 57343;
  function rangeEdges(from, to, low, hi) {
    if (low < ASTRAL) {
      if (low < GAP_START)
        from.edge(low, Math.min(hi, GAP_START), to);
      if (hi > GAP_END)
        from.edge(Math.max(low, GAP_END), Math.min(hi, MAX_CHAR + 1), to);
      low = ASTRAL;
    }
    if (hi <= ASTRAL)
      return;
    let lowStr = String.fromCodePoint(low), hiStr = String.fromCodePoint(hi - 1);
    let lowA = lowStr.charCodeAt(0), lowB = lowStr.charCodeAt(1);
    let hiA = hiStr.charCodeAt(0), hiB = hiStr.charCodeAt(1);
    if (lowA == hiA) {
      let hop = new State$1();
      from.edge(lowA, lowA + 1, hop);
      hop.edge(lowB, hiB + 1, to);
    } else {
      let midStart = lowA, midEnd = hiA;
      if (lowB > LOW_SURR_B) {
        midStart++;
        let hop = new State$1();
        from.edge(lowA, lowA + 1, hop);
        hop.edge(lowB, HIGH_SURR_B + 1, to);
      }
      if (hiB < HIGH_SURR_B) {
        midEnd--;
        let hop = new State$1();
        from.edge(hiA, hiA + 1, hop);
        hop.edge(LOW_SURR_B, hiB + 1, to);
      }
      if (midStart <= midEnd) {
        let hop = new State$1();
        from.edge(midStart, midEnd + 1, hop);
        hop.edge(LOW_SURR_B, HIGH_SURR_B + 1, to);
      }
    }
  }
  function isEmpty(expr) {
    return expr instanceof SequenceExpression && expr.exprs.length == 0;
  }
  function gatherExtTokens(b, tokens) {
    let result = /* @__PURE__ */ Object.create(null);
    for (let token of tokens) {
      b.unique(token.id);
      let { name, props, dialect } = b.nodeInfo(token.props, "d", token.id.name);
      let term = b.makeTerminal(token.id.name, name, props);
      if (dialect != null)
        (b.tokens.byDialect[dialect] || (b.tokens.byDialect[dialect] = [])).push(term);
      b.namedTerms[token.id.name] = result[token.id.name] = term;
    }
    return result;
  }
  function findExtToken(b, tokens, expr) {
    let found = tokens[expr.id.name];
    if (!found)
      return null;
    if (expr.args.length)
      b.raise("External tokens cannot take arguments", expr.args[0].start);
    b.used(expr.id.name);
    return found;
  }
  function addRel(rel, term, after) {
    let found = rel.findIndex((r) => r.term == term);
    if (found < 0)
      rel.push({ term, after });
    else
      rel[found] = { term, after: rel[found].after.concat(after) };
  }
  var ExternalTokenSet = class {
    constructor(b, ast) {
      this.b = b;
      this.ast = ast;
      this.tokens = gatherExtTokens(b, ast.tokens);
      for (let name in this.tokens)
        this.b.tokenOrigins[this.tokens[name].name] = { external: this };
    }
    getToken(expr) {
      return findExtToken(this.b, this.tokens, expr);
    }
    checkConflicts(states, skipInfo) {
      let conflicting = [];
      for (let id of this.ast.conflicts) {
        let term = this.b.namedTerms[id.name];
        if (!term) {
          this.b.warn(\`Unknown conflict term '\${id.name}'\`);
        } else if (!term.terminal) {
          this.b.warn(\`Term '\${id.name}' isn't a terminal and cannot be used in a token conflict.\`);
        } else if (this.tokens[id.name]) {
          this.b.warn(\`External token set specifying a conflict with one of its own tokens ('\${id.name}')\`);
        } else {
          conflicting.push(term);
        }
      }
      if (conflicting.length)
        for (let state of states) {
          let skip = skipInfo[this.b.skipRules.indexOf(state.skip)].startTokens, relevant = false, conflict = null;
          for (let i = 0; i < state.actions.length + skip.length; i++) {
            let term = i < state.actions.length ? state.actions[i].term : skip[i - state.actions.length];
            if (term.name in this.tokens) {
              relevant = true;
            } else if (conflicting.indexOf(term) > -1) {
              conflict = term;
            }
          }
          if (relevant && conflict)
            this.b.raise(\`Tokens from external group used together with conflicting token '\${conflict.name}'
After: \${state.set[0].trail()}\`, this.ast.start);
        }
    }
    create() {
      return this.b.options.externalTokenizer(this.ast.id.name, this.b.termTable);
    }
    createSource(importName) {
      let { source, id: { name } } = this.ast;
      return importName(name, source);
    }
  };
  var ExternalSpecializer = class {
    constructor(b, ast) {
      this.b = b;
      this.ast = ast;
      this.term = null;
      this.tokens = gatherExtTokens(b, ast.tokens);
    }
    finish() {
      let terms = this.b.normalizeExpr(this.ast.token);
      if (terms.length != 1 || terms[0].terms.length != 1 || !terms[0].terms[0].terminal)
        this.b.raise(\`The token expression to '@external \${this.ast.type}' must resolve to a token\`, this.ast.token.start);
      this.term = terms[0].terms[0];
      for (let name in this.tokens)
        this.b.tokenOrigins[this.tokens[name].name] = { spec: this.term, external: this };
    }
    getToken(expr) {
      return findExtToken(this.b, this.tokens, expr);
    }
  };
  function inlineRules(rules, preserve) {
    for (let pass = 0; ; pass++) {
      let inlinable = /* @__PURE__ */ Object.create(null), found;
      if (pass == 0)
        for (let rule of rules) {
          if (rule.name.inline && !inlinable[rule.name.name]) {
            let group = rules.filter((r) => r.name == rule.name);
            if (group.some((r) => r.parts.includes(rule.name)))
              continue;
            found = inlinable[rule.name.name] = group;
          }
        }
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (!rule.name.interesting && !rule.parts.includes(rule.name) && rule.parts.length < 3 && !preserve.includes(rule.name) && (rule.parts.length == 1 || rules.every((other) => other.skip == rule.skip || !other.parts.includes(rule.name))) && !rule.parts.some((p2) => !!inlinable[p2.name]) && !rules.some((r, j) => j != i && r.name == rule.name))
          found = inlinable[rule.name.name] = [rule];
      }
      if (!found)
        return rules;
      let newRules = [];
      for (let rule of rules) {
        let expand = function(at, conflicts, parts) {
          if (at == rule.parts.length) {
            newRules.push(new Rule(rule.name, parts, conflicts, rule.skip));
            return;
          }
          let next = rule.parts[at], replace = inlinable[next.name];
          if (!replace) {
            expand(at + 1, conflicts.concat(rule.conflicts[at + 1]), parts.concat(next));
            return;
          }
          for (let r of replace)
            expand(at + 1, conflicts.slice(0, conflicts.length - 1).concat(conflicts[at].join(r.conflicts[0])).concat(r.conflicts.slice(1, r.conflicts.length - 1)).concat(rule.conflicts[at + 1].join(r.conflicts[r.conflicts.length - 1])), parts.concat(r.parts));
        };
        if (inlinable[rule.name.name])
          continue;
        if (!rule.parts.some((p2) => !!inlinable[p2.name])) {
          newRules.push(rule);
          continue;
        }
        expand(0, [rule.conflicts[0]], []);
      }
      rules = newRules;
    }
  }
  function mergeRules(rules) {
    let merged = /* @__PURE__ */ Object.create(null), found;
    for (let i = 0; i < rules.length; ) {
      let groupStart = i;
      let name = rules[i++].name;
      while (i < rules.length && rules[i].name == name)
        i++;
      let size = i - groupStart;
      if (name.interesting)
        continue;
      for (let j = i; j < rules.length; ) {
        let otherStart = j, otherName = rules[j++].name;
        while (j < rules.length && rules[j].name == otherName)
          j++;
        if (j - otherStart != size || otherName.interesting)
          continue;
        let match = true;
        for (let k = 0; k < size && match; k++) {
          let a = rules[groupStart + k], b = rules[otherStart + k];
          if (a.cmpNoName(b) != 0)
            match = false;
        }
        if (match)
          found = merged[name.name] = otherName;
      }
    }
    if (!found)
      return rules;
    let newRules = [];
    for (let rule of rules)
      if (!merged[rule.name.name]) {
        newRules.push(rule.parts.every((p2) => !merged[p2.name]) ? rule : new Rule(rule.name, rule.parts.map((p2) => merged[p2.name] || p2), rule.conflicts, rule.skip));
      }
    return newRules;
  }
  function simplifyRules(rules, preserve) {
    return mergeRules(inlineRules(rules, preserve));
  }
  function buildParser(text, options = {}) {
    let builder = new Builder(text, options), parser = builder.getParser();
    parser.termTable = builder.termTable;
    return parser;
  }
  var KEYWORDS = [
    "arguments",
    "await",
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "eval",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "while",
    "with",
    "null",
    "true",
    "false",
    "instanceof",
    "typeof",
    "void",
    "delete",
    "new",
    "in",
    "this",
    "const",
    "class",
    "extends",
    "export",
    "import",
    "super",
    "enum",
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield",
    "require"
  ];
  function ignored(name) {
    let first = name[0];
    return first == "_" || first.toUpperCase() != first;
  }
  function isExported(rule) {
    return rule.props.some((p2) => p2.at && p2.name == "export");
  }

  // src/better-editor/css-module-parser.ts
  var cssModuleParser = buildParser(\`
        @top Program {
          (CSSModule | HTMLBlock | Anything)+
        }
        
        CSSModule {
          CSSModuleStart CSSModuleContent CSSModuleEnd
        }

        HTMLBlock {
          HTMLBlockStart1 Any* HTMLBlockStart2 HTMLBlockContent HTMLBlockEnd
        }

        CSSModuleContent { 
          Anything+
        }

        HTMLBlockContent { 
          Anything+
        }
        
        Anything {
          Any
        }

        @tokens {
          CSSModuleStart { "[[module css]]" } 
          CSSModuleEnd { "[[/module]]" } 
          HTMLBlockStart1 { "[[html" } 
          HTMLBlockStart2 { "]]" } 
          HTMLBlockEnd { "[[/html]]" } 
          Any { _ }
        }
\`);

  // src/better-editor/better-editor-worker-bridge.ts
  var WorkerBridge = {
    extractStylesheets(document) {
      const parsed = cssModuleParser.parse(document);
      const css = [];
      parsed.iterate({
        enter(node) {
          if (node.name === "CSSModuleContent") {
            css.push(document.slice(node.from, node.to));
          }
        }
      });
      return css;
    }
  };

  // src/better-editor/better-editor-worker.ts
  createWorkerReceiver("w1", WorkerBridge);
})();
`;function jM(t){let e=(0,Ce.useRef)(null);return(0,Ce.useEffect)(()=>{let i=e.current;i&&(async()=>{let n=lQ("w1",`data:application/javascript,${encodeURIComponent(aQ)}`);console.log(n);let s=Av.configure({wrap:Cv([{tag:"script",parser:zv},{tag:"style",parser:Wm}])}),r=rQ.configure({wrap:Rc(o=>o.name==="CSSModuleContent"?{parser:Wm}:o.name==="HTMLBlockContent"?{parser:s}:null)}),l=_c.define({parser:r}),a=new D({doc:(await cQ(window.location.href)).trimStart().replaceAll("\xA0"," "),parent:i,extensions:[D.lineWrapping,ck,em.of([...Jk,Fk,{key:"Ctrl-s",run:()=>(t.save(a.state.sliceDoc(0,a.state.doc.length)),!0)}]),ZS(),l,kk(),D.updateListener.of(o=>{o.docChanged&&(async()=>{let u=await n.extractStylesheets(o.state.sliceDoc(0,o.state.doc.length));t.replaceIframeStylesheets(u)})()})]})})()},[]),Ce.default.createElement("div",{ref:e})}function oQ(){let t=(0,Ce.useRef)(null),[e,i]=(0,Ce.useState)(.5),[n,s]=(0,Ce.useState)(!1);return Ce.default.createElement(Ce.default.Fragment,null,Ce.default.createElement("style",null,".cm-editor { height: 100vh; }"),Ce.default.createElement("div",{style:{display:"flex",width:"100vw",height:"100vh"}},Ce.default.createElement("div",{style:{height:"100vh",width:`${100*e}vw`}},Ce.default.createElement(jM,{save:async r=>{await uQ(window.location.href,r),t.current?.contentWindow?.location.reload(),console.log("refreshed iframe")},replaceIframeStylesheets:r=>{if(!t.current||!t.current.contentWindow)return;HO("iframe",t.current.contentWindow).replaceStylesheets(r)}})),Ce.default.createElement("div",{style:{height:"100vh",cursor:"col-resize",width:"10px",marginLeft:"-5px",marginRight:"-5px",position:"relative",zIndex:2},onMouseDown:()=>{s(!0);let r=a=>{i(o=>o+a.movementX/window.innerWidth)},l=a=>{document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",l),s(!1)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",l)}}),Ce.default.createElement("div",{style:{width:`${100*(1-e)}vw`}},Ce.default.createElement("iframe",{style:{width:"100%",height:"100%",pointerEvents:n?"none":"all"},src:window.location.href,ref:t}))))}var hQ={replaceStylesheets(t){console.log("got here");for(let e of Array.from(document.head?.querySelectorAll("style")))e.innerText.includes("/* modules */")&&e.innerText.includes("cloudfront.net")||e.parentElement?.removeChild(e);for(let e of t){let i=document.createElement("style");i.innerText=e,document.head.appendChild(i)}}};function pQ(t){return WO(t,{maxConcurrentRequests:5,limits:[{duration:5,maxRequests:10}]})}function LM(t,e){return new Promise((i,n)=>{OZONE.ajax.requestModule(t,e,s=>{i(s)})})}var VO=new Map,mQ=pQ(async function(t){if(VO.has(t))return VO.get(t);let e=await(await fetch(t)).text(),n=new DOMParser().parseFromString(e,"text/html").querySelectorAll("head script");for(let s of Array.from(n)){let r=s.innerText.match(/WIKIREQUEST\.info\.pageId\s*\=\s*(\d+)/);if(r)return VO.set(t,r[1]),r[1]}}),GO=pQ(LM);async function uQ(t,e){let i=await mQ(t),n=new URL(t).pathname.slice(1),s=await GO("edit/PageEditModule",{page_id:i,mode:"page",wiki_page:n,force_lock:"yes"}),r=new DOMParser().parseFromString(s.body,"text/html");await GO("Empty",{action:"WikiPageAction",comments:"Antivandalism script: Blanked page.",event:"savePage",lock_id:s.lock_id,lock_secret:s.lock_secret,mode:"page",page_id:i,recaptcha_challenge_field:"",recaptcha_response_field:"",revision_id:s.page_revision_id,source:e,title:r.getElementById("edit-page-title")?.value??"No Title",wiki_page:n})}async function cQ(t){let e=await mQ(t),i=await GO("viewsource/ViewSourceModule",{page_id:e});return new DOMParser().parseFromString(i.body,"text/html").querySelector(".page-source")?.innerText??""}function VM(){document.body.innerHTML="",document.head.innerHTML="",document.body.style.margin="0",document.body.style.padding="0",document.body.style.overflow="hidden",OZONE.utils.addJavascriptUrl=()=>{};let t=document.createElement("div");document.body.appendChild(t),(0,fQ.createRoot)(t).render(dQ.default.createElement(oQ,null))}(async()=>await KO(()=>window?.WIKIDOT?.page?.listeners?.editClick,t=>WIKIDOT.page.listeners.editClick=t,t=>e=>{VM()}))();window.addEventListener("load",()=>{function t(){for(let e of Array.from(document.querySelectorAll("style"))){e.parentElement?.removeChild(e);let i=document.createElement("style");i.innerText=e.innerText,document.head.appendChild(i)}}t()});window.parent!==window&&IO("iframe",hQ,window.parent);})();
/*!
// ==UserScript==
// @name        Better Wikidot Editor
// @namespace   Violentmonkey Scripts
// @grant       none
// @match *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=better-editor.user.js.map
