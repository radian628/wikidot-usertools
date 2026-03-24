/*!
// ==UserScript==
// @name        Better Wikidot Editor
// @namespace   Violentmonkey Scripts
// @grant       none
// @match       *://*.wikidot.com/*
// @version     1.0
// @author      radian628
// @description 9/13/2025, 12:35:21 PM
// ==/UserScript==
*/

import { injectFunction, throttle, workerifyServerIframe } from "r628";
import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./editor.js";
import { IframeBridge } from "./better-editor-iframe-bridge.js";
import { asyncRequestModule, getPageId } from "../common/wikidot-api-utils.js";

function initializeEditor() {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflow = "hidden";
  // @ts-expect-error
  OZONE.utils.addJavascriptUrl = () => {};
  const domRoot = document.createElement("div");
  document.body.appendChild(domRoot);
  const reactRoot = createRoot(domRoot);
  reactRoot.render(<App></App>);
}

(async () => {
  if (window.parent !== window) return;
  await injectFunction(
    () => window?.WIKIDOT?.page?.listeners?.editClick,
    (fn) => (WIKIDOT.page.listeners.editClick = fn),
    (fn) => (fn) => {
      initializeEditor();
    },
  );
})();

window.addEventListener("load", () => {
  function forceRefreshAllCSS() {
    for (const style of Array.from(document.querySelectorAll("style"))) {
      style.parentElement?.removeChild(style);
      const style2 = document.createElement("style");
      style2.textContent = style.innerText + "/*force refresh lol*/";
      document.head.appendChild(style2);
    }
  }

  setTimeout(() => {
    forceRefreshAllCSS();
  }, 2000);
});

if (window.parent !== window) {
  workerifyServerIframe("iframe", IframeBridge, window.parent);
}
