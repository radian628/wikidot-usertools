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
  
"use strict";
(() => {
  // src/unfuck-all-css/unfuck-all-css.user.ts
  
  window.addEventListener("load", () => {
    setTimeout(() => {
      const styles = Array.from(document.querySelectorAll("style"));
      for (const s of styles) {
        s.parentElement.removeChild(s);
      }
      setTimeout(() => {
        for (const s of styles) {
          s.textContent += "/*force refresh lol*/";
          document.head.appendChild(s);
        }
      }, 200);
      console.log("hi");
    }, 100);
  });
})();
//# sourceMappingURL=unfuck-all-css.user.js.map
 });