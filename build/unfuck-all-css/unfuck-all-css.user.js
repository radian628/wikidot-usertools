/*!
// ==UserScript==
// @name        Unfuck All CSS 
// @namespace   Violentmonkey Scripts
// @grant       none
// @match *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/"use strict";(()=>{window.addEventListener("load",()=>{setTimeout(()=>{let o=Array.from(document.querySelectorAll("style"));for(let e of o)e.parentElement.removeChild(e);setTimeout(()=>{for(let e of o)e.textContent+="/*force refresh lol*/",document.head.appendChild(e)},200),console.log("hi")},100)});})();
//# sourceMappingURL=unfuck-all-css.user.js.map
