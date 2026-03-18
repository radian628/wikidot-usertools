/*!
// ==UserScript==
// @name        Change Font on Better Wikidot Editor
// @namespace   Violentmonkey Scripts
// @grant       none
// @match       *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/
"use strict";
import("https://cdn.jsdelivr.net/npm/ses@1.14.0/dist/lockdown.umd.min.js")
.then(() => {
  try {
    lockdown();
  }  catch (e) { console.warn(e); }
  
"use strict";(()=>{async function i(e,t,n){return new Promise((s,a)=>{let o=setInterval(()=>{let r=e();r&&(t(n(r)),clearInterval(o),s())})})}(async()=>window.parent===window&&await i(()=>window?.WIKIDOT?.page?.listeners?.editClick,e=>WIKIDOT.page.listeners.editClick=e,e=>t=>{setTimeout(()=>{let n=document.createElement("style");n.innerText=`
.cm-editor * {
  font-family: 'Courier New', monospace;
}
`},1e3)}))();})();
//# sourceMappingURL=change-better-editor-font.user.js.map
 });