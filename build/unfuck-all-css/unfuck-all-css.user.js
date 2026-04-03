/*!
// ==UserScript==
// @name        Unfuck All CSS 
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

    "use strict";(()=>{window.addEventListener("load",()=>{let o=Array.from(document.querySelectorAll("style"));for(let e of o)e.parentElement.removeChild(e);for(let e of o)e.textContent+="/*force refresh lol*/",document.head.appendChild(e)});})();
 });