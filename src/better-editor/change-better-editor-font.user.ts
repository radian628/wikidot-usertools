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

import { injectFunction } from "../../r628/src/inject.js";

(async () => {
  if (window.parent !== window) return;
  await injectFunction(
    () => window?.WIKIDOT?.page?.listeners?.editClick,
    (fn) => (WIKIDOT.page.listeners.editClick = fn),
    (fn) => (fn) => {
      setTimeout(() => {
        const style = document.createElement("style");
        style.innerText = `
.cm-editor * {
  font-family: 'Courier New', monospace;
}
`;
      }, 1000);
    },
  );
})();
