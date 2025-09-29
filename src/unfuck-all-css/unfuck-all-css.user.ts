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
*/

window.addEventListener("load", () => {
  setTimeout(() => {
    const styles = Array.from(document.querySelectorAll("style"));
    for (const s of styles) {
      s.parentElement!.removeChild(s);
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
